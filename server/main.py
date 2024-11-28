from flask import Flask, request, jsonify
from flask_cors import CORS
import openai
import os
import pandas as pd

# Ініціалізація Flask
app = Flask(__name__)
CORS(app)

# Завантаження OpenAI API Key з оточення
openai.api_key = os.getenv("OPENAI_API_KEY")

# Завантаження dataset з перевіркою
try:
    medicine_details_df = pd.read_csv('Medicine_Details.csv')
except FileNotFoundError:
    print("Error: 'Medicine_Details.csv' not found. Please ensure the file is in the correct directory.")
    exit(1)

# Функція для форматування інформації про ліки
def format_drug_info(row):
    return {
        'medicine_name': row['Medicine Name'],
        'composition': row['Composition'],
        'uses': row['Uses'],
        'side_effects': row['Side_effects'],
        'image_url': row['Image URL'],
        'manufacturer': row['Manufacturer'],
        'excellent_review_percent': row['Excellent Review %'],
        'average_review_percent': row['Average Review %'],
        'poor_review_percent': row['Poor Review %']
    }

# Універсальна функція для перетворення даних у серіалізований формат
def convert_to_serializable(value):
    if isinstance(value, (int, float, str)):
        return value
    elif isinstance(value, pd.Timestamp):
        return value.isoformat()
    elif isinstance(value, pd.Series):
        return value.tolist()
    else:
        return str(value)

# Маршрут для аналізу симптомів
@app.route('/api/analyze-symptoms', methods=['POST'])
def analyze_symptoms():
    data = request.get_json()
    symptoms = data.get("symptoms")

    if not symptoms:
        return jsonify({"error": "Symptoms are required"}), 400

    try:
        # Виклик OpenAI API
        response = openai.ChatCompletion.create(
            model="gpt-4",
            messages=[
                {
                    "role": "system",
                    "content":  """
                        You are a specialized medical assistant with expertise in analyzing symptoms and providing medically sound advice. 

                        When analyzing symptoms provided by the user:
                        1. Identify potential medical conditions that could be associated with the symptoms. List them in order of likelihood, explaining the reasoning behind each condition briefly.
                        2. Provide recommendations for over-the-counter medications or remedies that may alleviate symptoms. Always include a clear disclaimer that the user must consult a healthcare professional before taking any medications.
                        3. Suggest practical advice or actions that the user can take before seeing a doctor, such as hydration, rest, or specific precautions.
                        4. Emphasize that this information is not a substitute for professional medical advice and that visiting a licensed healthcare provider is necessary for accurate diagnosis and treatment.
                    """
                },
                {
                    "role": "user",
                    "content": f"Analyze these symptoms and provide detailed information: {symptoms}"
                }
            ],
            max_tokens=1500,
            temperature=0.7
        )

        # Форматування відповіді
        message = response['choices'][0]['message']['content'].strip()
        formatted_message = f"""
            <div style='border:1px solid #ddd; padding:20px; border-radius:10px; background-color:#f9f9f9;'>
                <h2>Detailed Analysis</h2>
                {''.join(f'<p>{line.strip()}</p>' for line in message.splitlines() if line.strip())}
            </div>
        """

        return jsonify({"html": formatted_message})
    except Exception as e:
        print(f"Error: {str(e)}")
        return jsonify({"error": "Failed to fetch response from OpenAI"}), 500

# Маршрут для отримання інформації про конкретні ліки
@app.route('/get_drug_info', methods=['GET'])
def get_drug_info():
    drug_name = request.args.get('drug_name')
    if not drug_name:
        return jsonify({"error": "Drug name is required"}), 400

    drug_info = medicine_details_df[
        medicine_details_df['Medicine Name'].str.lower().str.startswith(drug_name.lower(), na=False)
    ]

    if not drug_info.empty:
        output = [format_drug_info(row) for _, row in drug_info.iterrows()]
        return jsonify(output)
    else:
        return jsonify({"error": "No results found for the given drug name"}), 404

# Маршрут для отримання деталей про конкретний препарат
@app.route('/get_drug_details', methods=['GET'])
def get_drug_details():
    drug_name = request.args.get('drug_name')
    if not drug_name:
        return jsonify({"error": "Drug name is required"}), 400

    drug_info = medicine_details_df[
        medicine_details_df['Medicine Name'].str.contains(drug_name, case=False, na=False)
    ]

    if not drug_info.empty:
        row = drug_info.iloc[0]
        output = format_drug_info(row)
        output_serializable = {key: convert_to_serializable(value) for key, value in output.items()}
        return jsonify(output_serializable)
    else:
        return jsonify({"error": "No results found for the given drug name"}), 404

# Маршрут для отримання всіх ліків
@app.route('/get_all_drugs', methods=['GET'])
def get_all_drugs():
    output = [format_drug_info(row) for _, row in medicine_details_df.iterrows()]
    return jsonify(output)

# Маршрут для отримання популярних ліків
@app.route('/get_popular_drugs', methods=['GET'])
def get_popular_drugs():
    top_drugs = medicine_details_df.nlargest(10, 'Excellent Review %')
    popular_drugs = top_drugs['Medicine Name'].tolist()
    return jsonify(popular_drugs)

# Запуск сервера
if __name__ == "__main__":
    app.run(port=5000, debug=True)
