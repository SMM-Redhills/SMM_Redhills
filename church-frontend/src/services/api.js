// src/services/api.js
import axios from 'axios';
// const API_BASE_URL = 'http://localhost:8000/api
export const BASE_URL = import.meta.env.VITE_BASE_URL || 'http://localhost:8000' || 'https://raise-stating-accessory-higher.trycloudflare.com';
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