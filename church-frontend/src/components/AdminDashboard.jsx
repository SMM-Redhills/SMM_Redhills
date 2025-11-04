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
      <div style={{minHeight: '100vh', backgroundColor: '#f8fafc', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
        <div style={{fontSize: '1.25rem', color: '#64748b'}}>Loading admin dashboard...</div>
      </div>
    );
  }

  return (
    <div style={{minHeight: '100vh', backgroundColor: '#f8fafc'}}>
      <div style={{background: 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)', color: 'white'}}>
        <div style={{maxWidth: '80rem', margin: '0 auto', padding: '0 1rem'}}>
          <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1.5rem 0'}}>
            <div>
              <h1 style={{fontSize: '1.875rem', fontWeight: '700', fontFamily: 'serif'}}>🏛️ Church Admin Dashboard</h1>
              <p style={{color: '#dbeafe', marginTop: '0.5rem'}}>Welcome, {user?.username}! Manage your church content and community</p>
            </div>
            <button
              onClick={handleLogout}
              style={{
                backgroundColor: '#1e40af',
                color: 'white',
                padding: '0.5rem 1rem',
                borderRadius: '0.375rem',
                border: 'none',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                fontWeight: '500'
              }}
              onMouseEnter={(e) => e.target.style.backgroundColor = '#1e3a8a'}
              onMouseLeave={(e) => e.target.style.backgroundColor = '#1e40af'}
            >
              Logout
            </button>
          </div>
        </div>
      </div>

      <div style={{maxWidth: '80rem', margin: '0 auto', padding: '2rem 1rem'}}>
        <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem', marginBottom: '2rem'}}>
          <div style={{backgroundColor: 'white', padding: '1.5rem', borderRadius: '0.5rem', boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)', borderLeft: '4px solid #3b82f6'}}>
            <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
              <div>
                <p style={{fontSize: '0.875rem', fontWeight: '500', color: '#64748b'}}>Unread Messages</p>
                <p style={{fontSize: '1.875rem', fontWeight: '700', color: '#3b82f6'}}>{stats.unread_messages || 0}</p>
              </div>
              <div style={{fontSize: '1.875rem'}}>📧</div>
            </div>
          </div>
          
          <div style={{backgroundColor: 'white', padding: '1.5rem', borderRadius: '0.5rem', boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)', borderLeft: '4px solid #8b5cf6'}}>
            <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
              <div>
                <p style={{fontSize: '0.875rem', fontWeight: '500', color: '#64748b'}}>Prayer Requests</p>
                <p style={{fontSize: '1.875rem', fontWeight: '700', color: '#8b5cf6'}}>{stats.prayer_requests || 0}</p>
              </div>
              <div style={{fontSize: '1.875rem'}}>🙏</div>
            </div>
          </div>
          
          <div style={{backgroundColor: 'white', padding: '1.5rem', borderRadius: '0.5rem', boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)', borderLeft: '4px solid #10b981'}}>
            <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
              <div>
                <p style={{fontSize: '0.875rem', fontWeight: '500', color: '#64748b'}}>Published News</p>
                <p style={{fontSize: '1.875rem', fontWeight: '700', color: '#10b981'}}>{stats.published_news || 0}</p>
              </div>
              <div style={{fontSize: '1.875rem'}}>📰</div>
            </div>
          </div>
          
          <div style={{backgroundColor: 'white', padding: '1.5rem', borderRadius: '0.5rem', boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)', borderLeft: '4px solid #f59e0b'}}>
            <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
              <div>
                <p style={{fontSize: '0.875rem', fontWeight: '500', color: '#64748b'}}>Upcoming Events</p>
                <p style={{fontSize: '1.875rem', fontWeight: '700', color: '#f59e0b'}}>{stats.upcoming_events || 0}</p>
              </div>
              <div style={{fontSize: '1.875rem'}}>📅</div>
            </div>
          </div>
        </div>

        <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem'}}>
          <div style={{backgroundColor: 'white', padding: '1.5rem', borderRadius: '0.5rem', boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)', transition: 'all 0.3s ease', cursor: 'pointer'}} onMouseEnter={(e) => e.target.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)'} onMouseLeave={(e) => e.target.style.boxShadow = '0 1px 3px rgba(0, 0, 0, 0.1)'}>
            <div style={{display: 'flex', alignItems: 'center', marginBottom: '1rem'}}>
              <div style={{fontSize: '1.5rem', marginRight: '0.75rem'}}>📧</div>
              <h3 style={{fontSize: '1.125rem', fontWeight: '600', color: '#111827'}}>Contact Messages</h3>
            </div>
            <p style={{color: '#64748b', marginBottom: '1rem'}}>View and respond to contact form submissions</p>
            <a href="http://localhost:8001/admin/church_app/contactmessage/" target="_blank" rel="noopener noreferrer" style={{backgroundColor: '#2563eb', color: 'white', padding: '0.5rem 1rem', borderRadius: '0.375rem', textDecoration: 'none', display: 'inline-block', transition: 'all 0.3s ease'}} onMouseEnter={(e) => e.target.style.backgroundColor = '#1d4ed8'} onMouseLeave={(e) => e.target.style.backgroundColor = '#2563eb'}>
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