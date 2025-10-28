import axios from 'axios';
import { VALIDATION_RULES, isOnline } from '../utils/validation';

const OPENAI_API_URL = 'https://api.openai.com/v1/chat/completions';
const API_KEY = process.env.REACT_APP_OPENAI_API_KEY;

// Retry logic
const retryRequest = async (fn, retries = 2) => {
  for (let i = 0; i < retries; i++) {
    try {
      return await fn();
    } catch (error) {
      if (i === retries - 1) throw error;
      await new Promise(resolve => setTimeout(resolve, 1000 * (i + 1)));
    }
  }
};

export const sendMessageToAI = async (message) => {
  // Check if online
  if (!isOnline()) {
    throw new Error('No internet connection. Please check your network and try again.');
  }

  // Validate API key
  if (!API_KEY || API_KEY.trim() === '') {
    throw new Error('API key is missing. Please configure your OpenAI API key.');
  }

  // Validate message
  if (!message || message.trim().length === 0) {
    throw new Error('Cannot send empty message.');
  }

  try {
    const response = await retryRequest(async () => {
      return await axios.post(
        OPENAI_API_URL,
        {
          model: 'gpt-3.5-turbo',
          messages: [{ role: 'user', content: message.trim() }],
          max_tokens: 500,
          temperature: 0.7
        },
        {
          headers: {
            'Authorization': `Bearer ${API_KEY}`,
            'Content-Type': 'application/json'
          },
          timeout: VALIDATION_RULES.API_TIMEOUT
        }
      );
    });

    // Validate response
    if (!response.data || !response.data.choices || !response.data.choices[0]) {
      throw new Error('Invalid response from AI service.');
    }

    const content = response.data.choices[0].message?.content;
    
    if (!content || content.trim().length === 0) {
      throw new Error('AI returned an empty response. Please try again.');
    }

    return content.trim();

  } catch (error) {
    console.error('AI Service Error:', error);

    // Handle specific error types
    if (error.code === 'ECONNABORTED') {
      throw new Error('Request timeout. The AI is taking too long to respond. Please try again.');
    }

    if (error.response) {
      const status = error.response.status;
      
      switch (status) {
        case 401:
          throw new Error('Invalid API key. Please check your OpenAI API key configuration.');
        case 429:
          throw new Error('Rate limit exceeded. Please wait a moment and try again.');
        case 500:
        case 502:
        case 503:
          throw new Error('AI service is temporarily unavailable. Please try again in a moment.');
        case 400:
          const errorMsg = error.response.data?.error?.message;
          throw new Error(errorMsg || 'Invalid request. Please try a different message.');
        default:
          throw new Error(`Service error (${status}). Please try again.`);
      }
    }

    if (error.request) {
      throw new Error('Unable to reach AI service. Please check your internet connection.');
    }

    throw new Error(error.message || 'Failed to get response from AI. Please try again.');
  }
};