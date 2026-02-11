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
  getNews: (category = null) => {
    const url = category ? `/news/?category=${category}` : '/news/';
    return api.get(url);
  },
  getEvents: () => api.get('/news/?content_type=event'),
  getLatestUpdates: () => api.get('/news/?category=news&content_type=news'),
  getMassSchedule: () => api.get('/news/?category=mass'),
  getFestivalEvents: () => api.get('/news/?category=festival'),
  getSpecialMass: () => api.get('/news/?category=special%20mass'),
  getLentMass: () => api.get('/news/?category=lent%20mass'),
  getRetreat: () => api.get('/news/?category=retreat'),
  getGallery: () => api.get('/gallery/'),
  getSchedule: () => api.get('/schedule/'),
  getPrayers: () => api.get('/prayers/'),
  getBannerSlides: () => api.get('/banner-slides/'),
  getGroup: (name) => api.get(`/groups/${name}/`),
};

export default api;