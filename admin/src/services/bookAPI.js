import axios from 'axios';

// Use your base URL from .env
const API = import.meta.env.VITE_API_BASE_URL + '/books';
const API2 = import.meta.env.VITE_API_BASE_URL + '/admin';

// Helper to get the token from localStorage
// const token = () => localStorage.getItem('adminToken');
const token = localStorage.getItem('adminToken');
console.log('token', token);


// Add a new book
export const addBook = async (bookData) => {
  const token = localStorage.getItem('token'); // or however you store it

  const response = await axios.post(`${API}`, bookData, {
    headers: {
      Authorization: token ? `Bearer ${token}` : '',
      // ❌ DO NOT manually set Content-Type
    },
  });

  return response.data;
};

// Fetch all books
export const getBooks = async () => {
//   const token = token;
  const res = await axios.get(`${API}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};

// Get sales report
export const getSalesReport = async () => {
  // const token = token();
  // const res = await axios.get(`${API2}/sales`, {
  //   headers: {
  //     Authorization: `Bearer ${token}`,
  //   },
  // });
  // console.log(res.data)
  const response = await axios.get(`${API2}/sales`);  // backend sales report endpoint
  return response.data;
  return res.data;
};
