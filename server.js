const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();
const port = 5500;

app.use(cors());
app.use(bodyParser.json());

const apiKey = '';

async function makeRequest(prompt) {
  try {
    const response = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: 'gpt-3.5-turbo',
        messages: [
          { role: 'system', content: 'You are a helpful assistant.' },
          { role: 'user', content: prompt }
        ],
        max_tokens: 100,
        temperature: 0.7
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${apiKey}`
        }
      }
    );
    return response.data.choices[0].message.content;
  } catch (error) {
    if (error.response && error.response.status === 429) {
      console.log('Rate limit exceeded. Retrying after a delay...');
      await new Promise(res => setTimeout(res, 3000)); 
      return makeRequest(prompt); 
    } else {
      throw error;
    }
  }
}

app.post('/api/chatgpt', async (req, res) => {
  try {
    const response = await makeRequest(req.body.prompt);
    res.json({ response });
  } catch (error) {
    console.error('Error communicating with the server:', error.message);
    res.status(500).json({ error: 'Error communicating with the server' });
  }
});

app.listen(port, () => {
  console.log(`Servidor ejecutando http://localhost:${port}`);
});
