const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const OpenAI = require('openai');

const app = express();
const port = 5000;

app.use(cors());
app.use(bodyParser.json());

// Ініціалізація OpenAI
const openai = new OpenAI({
    apiKey: "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", // Замініть на ваш API-ключ
});

app.post('/api/analyze-symptoms', async (req, res) => {
    const { symptoms } = req.body;

    if (!symptoms) {
        return res.status(400).json({ error: 'Symptoms are required' });
    }

    try {
        const response = await openai.chat.completions.create({
            model: 'gpt-4', // Використовуйте доступну модель
            messages: [
                {
                    role: 'system',
                    content: `
                        You are a highly advanced and knowledgeable medical assistant with expertise in medical diagnostics, pathology, and treatment protocols. 
                        When analyzing symptoms, provide a highly detailed response that includes:
                        1. A comprehensive list of potential medical conditions, with their likelihood and scientific reasoning.
                        2. Detailed explanations of the pathophysiology and etiology behind each potential condition.
                        3. A breakdown of possible diagnostic procedures to confirm or rule out these conditions (e.g., imaging, blood tests).
                        4. Extensive information on standard treatment options, including pharmacological, surgical, and lifestyle interventions.
                        5. Relevant scientific studies or clinical guidelines to support your explanation.
                        Use structured formatting (headings, paragraphs, bullet points, etc.) to make the response easy to read.
                    `,
                },
                {
                    role: 'user',
                    content: `Analyze these symptoms and provide detailed information in HTML format: ${symptoms}`,
                },
            ],
            max_tokens: 1500,
            temperature: 0.7,
        });

        const message = response.choices[0].message.content.trim();

        // Повертаємо відповідь у форматі HTML
        const formattedMessage = `
            <div>
                <h2>Detailed Analysis</h2>
                ${message
                    .split('\n')
                    .map((line) => `<p>${line.trim()}</p>`)
                    .join('')}
            </div>
        `;

        res.json({ html: formattedMessage });
    } catch (error) {
        console.error('Error:', error.response?.data || error.message);
        res.status(500).json({ error: 'Failed to fetch response from OpenAI' });
    }
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
