import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api', // Uses env var in prod, localhost in dev
});

export const getSummary = () => api.get('/transactions/summary');
export const getTransactions = (filters = {}) => api.get('/transactions', { params: filters });
export const createTransaction = (data) => api.post('/transactions', data);
export const deleteTransaction = (id) => api.delete(`/transactions/${id}`);

export default api;
