import axios from 'axios';

// Use VITE_API_URL if it exists (production), otherwise fallback to relative /api (local dev proxy)
const API_URL = import.meta.env.VITE_API_URL || '';

const api = axios.create({
  baseURL: API_URL,
});

export default api;
