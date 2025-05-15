import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

export const evaluateOutcome = async (classes) => {
  try {
    const response = await axios.post(`${API_URL}/evaluate`, { classes });
    return response.data;
  } catch (error) {
    console.error('Error evaluating outcome:', error);
    throw error;
  }
};

export const checkHealth = async () => {
  try {
    const response = await axios.get(`${API_URL}/health`);
    return response.data;
  } catch (error) {
    console.error('Error checking API health:', error);
    throw error;
  }
}; 