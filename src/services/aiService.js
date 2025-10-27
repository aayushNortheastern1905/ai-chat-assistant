import axios from 'axios';

const OPENAI_API_URL = 'https://api.openai.com/v1/chat/completions';
const API_KEY = process.env.REACT_APP_OPENAI_API_KEY;

export const sendMessageToAI = async (message) => {
  try {
    const response = await axios.post(
      OPENAI_API_URL,
      {
        model: 'gpt-3.5-turbo',
        messages: [{ role: 'user', content: message }],
        max_tokens: 500,
        temperature: 0.7
      },
      {
        headers: {
          'Authorization': `Bearer ${API_KEY}`,
          'Content-Type': 'application/json'
        }
      }
    );

    return response.data.choices[0].message.content;
  } catch (error) {
    console.error('AI Service Error:', error);
    throw new Error('Failed to get response from AI. Please try again.');
  }
};