import React, { useState } from 'react';
import { adminAPI } from '../services/adminApi';

const AdminLogin = ({ onLoginSuccess }) => {
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch('http://localhost:8000/api/auth/login/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials)
      });
      
      if (response.ok) {
        const data = await response.json();
        const userData = { username: credentials.username, token: data.token || data.access };
        localStorage.setItem('adminToken', data.token || data.access);
        localStorage.setItem('adminUser', JSON.stringify(userData));
        onLoginSuccess(userData);
      } else {
        const errorData = await response.json();
        setError(errorData.error || 'Invalid username or password');
      }
    } catch (error) {
      setError('Login failed. Please check your connection.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{minHeight: '100vh', backgroundColor: '#f8fafc', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
      <div style={{maxWidth: '28rem', width: '100%', padding: '2rem'}}>
        <div style={{textAlign: 'center', marginBottom: '2rem'}}>
          <h2 style={{fontSize: '1.875rem', fontWeight: '800', color: '#1f2937', marginBottom: '0.5rem'}}>
            🏛️ Church Admin Login
          </h2>
          <p style={{fontSize: '0.875rem', color: '#6b7280'}}>
            Sign in to manage church content
          </p>
        </div>
        <form onSubmit={handleSubmit} style={{backgroundColor: 'white', padding: '2rem', borderRadius: '0.5rem', boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'}}>
          <div style={{marginBottom: '1rem'}}>
            <input
              type="text"
              required
              style={{
                width: '100%',
                padding: '0.75rem',
                border: '1px solid #d1d5db',
                borderRadius: '0.375rem 0.375rem 0 0',
                fontSize: '0.875rem',
                color: '#1f2937'
              }}
              placeholder="Username"
              value={credentials.username}
              onChange={(e) => setCredentials({...credentials, username: e.target.value})}
            />
            <input
              type="password"
              required
              style={{
                width: '100%',
                padding: '0.75rem',
                border: '1px solid #d1d5db',
                borderTop: 'none',
                borderRadius: '0 0 0.375rem 0.375rem',
                fontSize: '0.875rem',
                color: '#1f2937'
              }}
              placeholder="Password"
              value={credentials.password}
              onChange={(e) => setCredentials({...credentials, password: e.target.value})}
            />
          </div>

          {error && (
            <div style={{color: '#dc2626', fontSize: '0.875rem', textAlign: 'center', marginBottom: '1rem'}}>{error}</div>
          )}

          <button
            type="submit"
            disabled={loading}
            style={{
              width: '100%',
              padding: '0.75rem 1rem',
              backgroundColor: loading ? '#9ca3af' : '#2563eb',
              color: 'white',
              border: 'none',
              borderRadius: '0.375rem',
              fontSize: '0.875rem',
              fontWeight: '500',
              cursor: loading ? 'not-allowed' : 'pointer',
              transition: 'background-color 0.2s'
            }}
            onMouseEnter={(e) => !loading && (e.target.style.backgroundColor = '#1d4ed8')}
            onMouseLeave={(e) => !loading && (e.target.style.backgroundColor = '#2563eb')}
          >
            {loading ? 'Signing in...' : 'Sign in'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;