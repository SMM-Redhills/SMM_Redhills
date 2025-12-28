import axios from 'axios';

// Detect production environment by hostname
const isProduction = typeof window !== 'undefined' && 
  (window.location.hostname.includes('netlify.app') || 
   window.location.hostname.includes('smmc') ||
   window.location.hostname.includes('smmcredhills') ||
   window.location.hostname.includes('marymagdeleneredhills.in'));

// Use Render backend in production, environment variable, or localhost fallback
const API_BASE_URL = isProduction 
  ? 'https://smm-redhills-1.onrender.com/api'
  : (import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api');

const adminApi = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add auth token to requests
adminApi.interceptors.request.use((config) => {
  const token = localStorage.getItem('adminToken');
  if (token) {
    config.headers.Authorization = `Token ${token}`;
  }
  return config;
});

// Force logout on token error
adminApi.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401 && error.response.data.detail === 'Invalid token.') {
      localStorage.removeItem('adminToken');
      window.location.href = '/admin/login';
    }
    return Promise.reject(error);
  }
);

export const adminAPI = {
  // Auth
  login: (credentials) => adminApi.post('/auth/login/', credentials),
  
  // Stats
  getStats: () => adminApi.get('/admin/stats/'),
  
  // Contact Messages
  getContactMessages: () => adminApi.get('/admin/contact-messages/'),
  markMessageRead: (id) => adminApi.patch(`/admin/mark-message-read/${id}/`),
  deleteMessage: (id) => adminApi.delete(`/admin/contact-messages/${id}/`),
  
  // Prayer Requests
  getPrayerRequests: () => adminApi.get('/admin/prayer-requests/'),
  deletePrayerRequest: (id) => adminApi.delete(`/admin/prayer-requests/${id}/`),
  
  // News
  getNews: () => adminApi.get('/admin/news/'),
  createNews: (data) => adminApi.post('/admin/news/', data),
  updateNews: (id, data) => adminApi.put(`/admin/news/${id}/`, data),
  deleteNews: (id) => adminApi.delete(`/admin/news/${id}/`),
  
  // Events
  getEvents: () => adminApi.get('/admin/events/'),
  createEvent: (data) => adminApi.post('/admin/events/', data),
  updateEvent: (id, data) => adminApi.put(`/admin/events/${id}/`, data),
  deleteEvent: (id) => adminApi.delete(`/admin/events/${id}/`),
  
  // Gallery
  getGallery: () => adminApi.get('/admin/gallery/'),
  createGalleryItem: (data) => adminApi.post('/admin/gallery/', data),
  updateGalleryItem: (id, data) => adminApi.put(`/admin/gallery/${id}/`, data),
  deleteGalleryItem: (id) => adminApi.delete(`/admin/gallery/${id}/`),
  
  // Schedule
  getSchedule: () => adminApi.get('/admin/schedule/'),
  createSchedule: (data) => adminApi.post('/admin/schedule/', data),
  updateSchedule: (id, data) => adminApi.put(`/admin/schedule/${id}/`, data),
  deleteSchedule: (id) => adminApi.delete(`/admin/schedule/${id}/`),
  
  // Prayers
  getPrayers: () => adminApi.get('/admin/prayers/'),
  createPrayer: (data) => adminApi.post('/admin/prayers/', data),
  updatePrayer: (id, data) => adminApi.put(`/admin/prayers/${id}/`, data),
  deletePrayer: (id) => adminApi.delete(`/admin/prayers/${id}/`),
  
  // Banner Slides
  getBannerSlides: () => adminApi.get('/admin/banner-slides/'),
  createBannerSlide: (data) => adminApi.post('/admin/banner-slides/', data),
  updateBannerSlide: (id, data) => adminApi.put(`/admin/banner-slides/${id}/`, data),
  deleteBannerSlide: (id) => adminApi.delete(`/admin/banner-slides/${id}/`),

  // Parish Groups
  getGroups: () => adminApi.get('/admin/groups/'),
  getGroup: (id) => adminApi.get(`/admin/groups/${id}/`),
  createGroup: (data) => adminApi.post('/admin/groups/', data),
  updateGroup: (id, data) => adminApi.put(`/admin/groups/${id}/`, data),
  deleteGroup: (id) => adminApi.delete(`/admin/groups/${id}/`),

  // Group Activities
  getGroupActivities: (groupId) => adminApi.get(`/admin/groups/${groupId}/activities/`),
  createGroupActivity: (groupId, data) => adminApi.post(`/admin/groups/${groupId}/activities/`, data),
  updateGroupActivity: (groupId, activityId, data) => adminApi.put(`/admin/groups/${groupId}/activities/${activityId}/`, data),
  deleteGroupActivity: (groupId, activityId) => adminApi.delete(`/admin/groups/${groupId}/activities/${activityId}/`),

  // Generic methods
  listItems: (endpoint) => adminApi.get(`/admin/${endpoint}/`),
  createItem: (endpoint, data) => {
    const isFormData = data instanceof FormData;
    return adminApi.post(`/admin/${endpoint}/`, data, {
      headers: isFormData ? { 'Content-Type': undefined } : { 'Content-Type': 'application/json' }
    });
  },
  updateItem: (endpoint, id, data) => {
    const isFormData = data instanceof FormData;
    return adminApi.put(`/admin/${endpoint}/${id}/`, data, {
      headers: isFormData ? { 'Content-Type': undefined } : { 'Content-Type': 'application/json' }
    });
  },
  deleteItem: (endpoint, id) => adminApi.delete(`/admin/${endpoint}/${id}/`),
};

export default adminApi;
