import axios from 'axios';

const API_URL = 'http://localhost:8080/api';

export const getHelloMessage = async () => {
  try {
    const response = await axios.get(`${API_URL}/home/hello`);
    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    return 'Error: Could not connect to backend.';
  }
};