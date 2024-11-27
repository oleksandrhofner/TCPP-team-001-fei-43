from flask import Flask, request, jsonify
from flask_cors import CORS
import pandas as pd

app = Flask(__name__)
CORS(app)

# Load your Medicine_Details dataset
medicine_details_df = pd.read_csv('D:/University/GitHub/archive/Medicine_Details.csv')

@app.route('/get_drug_info', methods=['GET'])
def get_drug_info():
    drug_name = request.args.get('drug_name')
    if not drug_name:
        return jsonify({"error": "Drug name is required"}), 400

    drug_info = medicine_details_df[medicine_details_df['Medicine Name'].str.contains(drug_name, case=False, na=False)]

    if not drug_info.empty:
        output = []
        for _, row in drug_info.iterrows():
            output.append({
                'medicine_name': row['Medicine Name'],
                'composition': row['Composition'],
                'uses': row['Uses'],
                'side_effects': row['Side_effects'],
                'image_url': row['Image URL'],
                'manufacturer': row['Manufacturer'],
                'excellent_review_percent': row['Excellent Review %'],
                'average_review_percent': row['Average Review %'],
                'poor_review_percent': row['Poor Review %']
            })
        return jsonify(output)
    else:
        return jsonify({"error": "No results found for the given drug name"}), 404
@app.route('/get_all_drugs', methods=['GET'])
def get_all_drugs():
    output = []
    for _, row in medicine_details_df.iterrows():
        output.append({
            'medicine_name': row['Medicine Name'],
            'composition': row['Composition'],
            'uses': row['Uses'],
            'side_effects': row['Side_effects'],
            'image_url': row['Image URL'],
            'manufacturer': row['Manufacturer'],
            'excellent_review_percent': row['Excellent Review %'],
            'average_review_percent': row['Average Review %'],
            'poor_review_percent': row['Poor Review %']
        })
    return jsonify(output)
@app.route('/get_drug_details', methods=['GET'])
def get_drug_details():
    drug_name = request.args.get('drug_name')
    if not drug_name:
        return jsonify({"error": "Drug name is required"}), 400

    drug_info = medicine_details_df[medicine_details_df['Medicine Name'].str.contains(drug_name, case=False, na=False)]

    if not drug_info.empty:
        row = drug_info.iloc[0]  # Вибираємо перший результат, якщо знайдено
        output = {
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
        return jsonify(output)
    else:
        return jsonify({"error": "No results found for the given drug name"}), 404

if __name__ == '__main__':
    app.run(debug=True)
