import axios from 'axios';

const API = import.meta.env.VITE_API_BASE_URL + '/admin';


export const loginAdmin = async (credentials) => {
  const res = await axios.post(`${API}/login`, credentials);
  return res.data;
};

export const signupAdmin = async (details) => {
  const res = await axios.post(`${API}/signup`, details);
  return res.data;
};
