import React, { useState, useEffect } from 'react';
import { adminAPI } from '../services/adminApi';
import AdminLogin from './AdminLogin';

const AdminDashboard = () => {
  const [stats, setStats] = useState({});
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = () => {
    const token = localStorage.getItem('adminToken');
    const userData = localStorage.getItem('adminUser');
    
    if (token && userData) {
      setUser(JSON.parse(userData));
      setIsAuthenticated(true);
      fetchStats();
    } else {
      setLoading(false);
    }
  };

  const fetchStats = async () => {
    try {
      const response = await adminAPI.getStats();
      setStats(response.data);
    } catch (error) {
      console.error('Error fetching stats:', error);
      if (error.response?.status === 401) {
        handleLogout();
      }
    } finally {
      setLoading(false);
    }
  };

  const handleLoginSuccess = (userData) => {
    setUser(userData);
    setIsAuthenticated(true);
    fetchStats();
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminUser');
    setUser(null);
    setIsAuthenticated(false);
  };

  if (!isAuthenticated) {
    return <AdminLogin onLoginSuccess={handleLoginSuccess} />;
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-xl">Loading admin dashboard...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold">🏛️ Church Admin Dashboard</h1>
              <p className="text-blue-100 mt-2">Welcome, {user?.username}! Manage your church content and community</p>
            </div>
            <button
              onClick={handleLogout}
              className="bg-blue-800 hover:bg-blue-900 px-4 py-2 rounded-md transition-colors"
            >
              Logout
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-sm border-l-4 border-blue-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Unread Messages</p>
                <p className="text-3xl font-bold text-blue-600">{stats.unread_messages || 0}</p>
              </div>
              <div className="text-3xl">📧</div>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-sm border-l-4 border-purple-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Prayer Requests</p>
                <p className="text-3xl font-bold text-purple-600">{stats.prayer_requests || 0}</p>
              </div>
              <div className="text-3xl">🙏</div>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-sm border-l-4 border-green-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Published News</p>
                <p className="text-3xl font-bold text-green-600">{stats.published_news || 0}</p>
              </div>
              <div className="text-3xl">📰</div>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-sm border-l-4 border-orange-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Upcoming Events</p>
                <p className="text-3xl font-bold text-orange-600">{stats.upcoming_events || 0}</p>
              </div>
              <div className="text-3xl">📅</div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center mb-4">
              <div className="text-2xl mr-3">📧</div>
              <h3 className="text-lg font-semibold text-gray-900">Contact Messages</h3>
            </div>
            <p className="text-gray-600 mb-4">View and respond to contact form submissions</p>
            <a href="http://localhost:8001/admin/church_app/contactmessage/" target="_blank" rel="noopener noreferrer" className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors inline-block">
              Manage
            </a>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center mb-4">
              <div className="text-2xl mr-3">🙏</div>
              <h3 className="text-lg font-semibold text-gray-900">Prayer Requests</h3>
            </div>
            <p className="text-gray-600 mb-4">Review prayer requests from community</p>
            <a href="http://localhost:8001/admin/church_app/prayerrequest/" target="_blank" rel="noopener noreferrer" className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors inline-block">
              Manage
            </a>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center mb-4">
              <div className="text-2xl mr-3">📰</div>
              <h3 className="text-lg font-semibold text-gray-900">News Management</h3>
            </div>
            <p className="text-gray-600 mb-4">Add and manage news articles</p>
            <a href="http://localhost:8001/admin/church_app/news/" target="_blank" rel="noopener noreferrer" className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors inline-block">
              Manage
            </a>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center mb-4">
              <div className="text-2xl mr-3">📅</div>
              <h3 className="text-lg font-semibold text-gray-900">Events Management</h3>
            </div>
            <p className="text-gray-600 mb-4">Add and manage church events</p>
            <a href="http://localhost:8001/admin/church_app/event/" target="_blank" rel="noopener noreferrer" className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors inline-block">
              Manage
            </a>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center mb-4">
              <div className="text-2xl mr-3">📸</div>
              <h3 className="text-lg font-semibold text-gray-900">Gallery Management</h3>
            </div>
            <p className="text-gray-600 mb-4">Upload and organize photos and videos</p>
            <a href="http://localhost:8001/admin/church_app/gallery/" target="_blank" rel="noopener noreferrer" className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors inline-block">
              Manage
            </a>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center mb-4">
              <div className="text-2xl mr-3">⏰</div>
              <h3 className="text-lg font-semibold text-gray-900">Schedule Management</h3>
            </div>
            <p className="text-gray-600 mb-4">Update mass times and church schedule</p>
            <a href="http://localhost:8001/admin/church_app/schedule/" target="_blank" rel="noopener noreferrer" className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors inline-block">
              Manage
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;