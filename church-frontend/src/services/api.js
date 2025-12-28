// src/services/api.js
import axios from 'axios';

// Detect production environment by hostname
const isProduction = typeof window !== 'undefined' && 
  (window.location.hostname.includes('netlify.app') || 
   window.location.hostname.includes('smmc') ||
   window.location.hostname.includes('smmcredhills') ||
   window.location.hostname.includes('marymagdeleneredhills.in'));

// Use Render backend in production, environment variable, or localhost fallback
export const BASE_URL = isProduction 
  ? 'https://smm-redhills-1.onrender.com'
  : (import.meta.env.VITE_API_BASE_URL ? import.meta.env.VITE_API_BASE_URL.replace('/api', '') : 'http://localhost:8000');

const API_BASE_URL = `${BASE_URL}/api`;

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const churchAPI = {
  // Form submissions
  submitContact: (data) => api.post('/submit-contact/', data),
  submitPrayerRequest: (data) => api.post('/submit-prayer/', data),

  // Content APIs
  getNews: () => api.get('/news/'),
  getEvents: () => api.get('/events/'),
  getGallery: () => api.get('/gallery/'),
  getSchedule: () => api.get('/schedule/'),
  getPrayers: () => api.get('/prayers/'),
  getBannerSlides: () => api.get('/banner-slides/'),
  getGroup: (name) => api.get(`/groups/${name}/`),
};

export default api;