import axios from 'axios';


// const API_URL = 'http://localhost:8080/api';
const API_URL = `${import.meta.env.VITE_API_BASE_URL}/api`;


export const registerUser = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/register`, userData);
    return response;
  } catch (error) {
    console.error('Error registering user:', error);
    throw error;
  }
}

export const loginUser = async (credentials) => {
  try {
    const response = await axios.post(`${API_URL}/login`, credentials);
    return response;
  } catch (error) {
    console.error('Error logging in user:', error);
    throw error;
  }
}