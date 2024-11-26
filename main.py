from flask import Flask, request, jsonify, render_template
import requests
import numpy as np
import pandas as pd
from sklearn.preprocessing import StandardScaler
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score
from flask_marshmallow import Marshmallow
from marshmallow import Schema, fields, ValidationError

app = Flask(__name__)
ma = Marshmallow(app)

# Ініціалізація масштабувальника та моделі
scaler = StandardScaler()
model = RandomForestClassifier(n_estimators=100, random_state=42)

# Функція для отримання даних з OpenFDA
OPENFDA_URL = 'https://api.fda.gov/drug/event.json'

def get_openfda_data(query_params):
    try:
        response = requests.get(OPENFDA_URL, params=query_params)
        response.raise_for_status()  # Викидає помилку, якщо статус-код не 200
        return response.json()
    except requests.exceptions.RequestException as e:
        return {'error': f'Failed to fetch data from OpenFDA: {str(e)}'}

# Схема для валідації JSON
class PatientDataSchema(Schema):
    fever = fields.Int(required=True, validate=lambda n: n in (0, 1))
    cough = fields.Int(required=True, validate=lambda n: n in (0, 1))
    fatigue = fields.Int(required=True, validate=lambda n: n in (0, 1))
    difficulty_breathing = fields.Int(required=True, validate=lambda n: n in (0, 1))
    age = fields.Int(required=True)
    gender = fields.Int(required=True, validate=lambda n: n in (0, 1))  # 0: Male, 1: Female
    blood_pressure = fields.Int(required=True)
    cholesterol_level = fields.Int(required=True)
    outcome = fields.Int(required=True, validate=lambda n: n in (0, 1))  # 0: No Disease, 1: Disease

# Маршрут для навчання моделі
@app.route('/train_model', methods=['POST'])
def train_model():
    training_data = request.get_json()

    # Валідація даних
    try:
        PatientDataSchema(many=True).load(training_data)
    except ValidationError as err:
        return jsonify(err.messages), 400

    df = pd.DataFrame(training_data)

    # Обробка даних: перетворення категоріальних змінних у числові
    X = df[['fever', 'cough', 'fatigue', 'difficulty_breathing', 'age', 'gender', 'blood_pressure', 'cholesterol_level']]
    y = df['outcome']  # Outcome — залежна змінна

    # Масштабування даних
    X_scaled = scaler.fit_transform(X)

    # Розділення на навчальну та тестову вибірки
    X_train, X_test, y_train, y_test = train_test_split(X_scaled, y, test_size=0.2, random_state=42)

    # Навчання моделі
    model.fit(X_train, y_train)

    # Перевірка точності на тестовій вибірці
    y_pred = model.predict(X_test)
    accuracy = accuracy_score(y_test, y_pred)

    return jsonify({'message': 'Model trained successfully', 'accuracy': accuracy})

# Маршрут для передбачення результатів
@app.route('/predict', methods=['POST'])
def predict():
    try:
        data = request.get_json()
        if not data:
            return jsonify({"error": "No data provided"}), 400

        features = np.array([[data['fever'], data['cough'], data['fatigue'], data['difficulty_breathing'],
                              data['age'], data['gender'], data['blood_pressure'], data['cholesterol_level']]])
        features_scaled = scaler.transform(features)

        prediction = model.predict(features_scaled)
        response = {'prediction': prediction.tolist()[0]}  # Convert to list for convenience
        return jsonify(response)

    except Exception as e:
        return jsonify({"error": str(e)}), 500  # Return any error message


# Маршрут для гнучкого пошуку в OpenFDA
@app.route('/fetch_openfda', methods=['GET'])
def fetch_openfda_data():
    query_params = {
        'search': 'patient.drug.medicinalproduct:TYVASO',  # Example search query for a specific drug
        'limit': 5  # Limit to 5 results
    }

    data = get_openfda_data(query_params)

    if 'results' in data:
        output = []
        for result in data['results']:
            company_number = result.get('companynumb', 'N/A')
            safety_report_id = result.get('safetyreportid', 'N/A')
            patient_sex = result.get('patient', {}).get('patientsex', 'N/A')
            reactions = [reaction['reactionmeddrapt'] for reaction in result.get('patient', {}).get('reaction', [])]

            output.append({
                'company_number': company_number,
                'safety_report_id': safety_report_id,
                'patient_sex': patient_sex,
                'reactions': reactions
            })

        return jsonify(output)  # Return the results in JSON format
    else:
        return jsonify({"error": "No results found"})


@app.route('/')
def home():
    return render_template('index.html')

if __name__ == '__main__':
    app.run(debug=True)

