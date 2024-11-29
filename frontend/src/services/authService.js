import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

const login = async (credentials) => {
  const response = await axios.post(`${API_URL}/login`, credentials);
  return response.data.token;
};

const signup = async (userData) => {
  await axios.post(`${API_URL}/signup`, userData);
};

const authService = { login, signup };
export default authService;
