import axios from 'axios';
// place to manage backend URL
const API = axios.create({
  baseURL: '/api',
});

API.interceptors.request.use((config) => {
  const user = JSON.parse(localStorage.getItem('user'));
  if (user?.token) {
    config.headers.Authorization = `Bearer ${user.token}`;
  }
  return config;
});

// Auth API
export const registerUser = (userData) => API.post('/auth/register', userData);
export const loginUser = (userData) => API.post('/auth/login', userData);

// Shipment API
export const getShipments = (params) => API.get('/shipments', { params });
export const getShipmentById = (id) => API.get(`/shipments/${id}`);
export const createShipment = (data) => API.post('/shipments', data);
export const updateShipment = (id, data) => API.put(`/shipments/${id}`, data);
export const deleteShipment = (id) => API.delete(`/shipments/${id}`);

export default API;