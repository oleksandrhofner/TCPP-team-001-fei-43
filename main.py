import numpy as np
from flask import Flask, request, jsonify
from flask_cors import CORS
import pandas as pd

app = Flask(__name__)
CORS(app)

# Завантажуємо ваш dataset
medicine_details_df = pd.read_csv('D:/University/GitHub/archive/Medicine_Details.csv')

def format_drug_info(row):
    """Формує словник з інформацією про медикамент."""
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

@app.route('/get_drug_info', methods=['GET'])
def get_drug_info():
    drug_name = request.args.get('drug_name')
    if not drug_name:
        return jsonify({"error": "Drug name is required"}), 400

    # Перевірка, чи починається назва препарату з літери drug_name
    drug_info = medicine_details_df[
        medicine_details_df['Medicine Name'].str.lower().str.startswith(drug_name.lower(), na=False)]

    if not drug_info.empty:
        output = [format_drug_info(row) for _, row in drug_info.iterrows()]
        return jsonify(output)
    else:
        return jsonify({"error": "No results found for the given drug name"}), 404

@app.route('/get_all_drugs', methods=['GET'])
def get_all_drugs():
    output = [format_drug_info(row) for _, row in medicine_details_df.iterrows()]
    return jsonify(output)


from flask import jsonify


@app.route('/get_drug_details', methods=['GET'])
def get_drug_details():
    drug_name = request.args.get('drug_name')
    if not drug_name:
        return jsonify({"error": "Drug name is required"}), 400

    drug_info = medicine_details_df[
        medicine_details_df['Medicine Name'].str.contains(drug_name, case=False, na=False)
    ]

    if not drug_info.empty:
        row = drug_info.iloc[0]  # Selecting the first match
        output = format_drug_info(row)

        # Ensure all values in the output are serializable (convert pandas types to native types)
        output_serializable = {key: convert_to_serializable(value) for key, value in output.items()}
        return jsonify(output_serializable)
    else:
        return jsonify({"error": "No results found for the given drug name"}), 404


def convert_to_serializable(value):
    if isinstance(value, (int, float, str)):
        return value
    elif isinstance(value, pd.Timestamp):
        return value.isoformat()  # Handle date values (if any)
    elif isinstance(value, pd.Series):
        return value.tolist()  # Convert pandas Series to list
    else:
        return str(value)  # Fallback to string conversion for other types


if __name__ == '__main__':
    app.run(debug=True)
