from flask import Flask, request, jsonify
from flask_cors import CORS
import openai
import os

# Ініціалізація Flask
app = Flask(__name__)
CORS(app)

# Завантаження OpenAI API Key з оточення
openai.api_key = os.getenv("OPENAI_API_KEY")

@app.route('/api/analyze-symptoms', methods=['POST'])
def analyze_symptoms():
    # Отримання даних із запиту
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
                    "content": """
                        You are a specialized medical assistant with expertise in analyzing symptoms and providing medically sound advice. 

                        When analyzing symptoms provided by the user:
                        1. Identify potential medical conditions that could be associated with the symptoms. List them in order of likelihood, explaining the reasoning behind each condition briefly.
                        2. Provide recommendations for over-the-counter medications or remedies that may alleviate symptoms. Always include a clear disclaimer that the user must consult a healthcare professional before taking any medications.
                        3. Suggest practical advice or actions that the user can take before seeing a doctor, such as hydration, rest, or specific precautions.
                        4. Emphasize that this information is not a substitute for professional medical advice and that visiting a licensed healthcare provider is necessary for accurate diagnosis and treatment.
                            
                        Note: Only respond to queries that describe symptoms. If the input does not relate to symptoms, politely inform the user that you can only assist with symptom analysis.
                    """
                },
                {
                    "role": "user",
                    "content": f"Analyze these symptoms and provide detailed information in HTML format: {symptoms}"
                }
            ],
            max_tokens=1500,
            temperature=0.7
        )

        # Форматування відповіді
        message = response['choices'][0]['message']['content'].strip()
        formatted_message = f"""
            <div>
                <h2>Detailed Analysis</h2>
                {''.join(f'<p>{line.strip()}</p>' for line in message.splitlines() if line.strip())}
            </div>
        """

        return jsonify({"html": formatted_message})
    except Exception as e:
        print(f"Error: {str(e)}")
        return jsonify({"error": "Failed to fetch response from OpenAI"}), 500

# Запуск сервера
if __name__ == "__main__":
    app.run(port=5000, debug=True)
