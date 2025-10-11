import React, { useState } from 'react';
import { churchAPI } from '../../services/api';

const PrayerForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    prayer_type: 'health',
    intention: '',
    is_public: false
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      await churchAPI.submitPrayerRequest(formData);
      setMessage('Prayer request submitted successfully!');
      setFormData({
        name: '',
        email: '',
        phone: '',
        prayer_type: 'health',
        intention: '',
        is_public: false
      });
    } catch (error) {
      setMessage('Error submitting prayer request. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  return (
    <div style={{maxWidth: '600px', margin: '0 auto', padding: '2rem', backgroundColor: '#ffffff', borderRadius: '1rem', boxShadow: '0 10px 25px -3px rgba(0, 0, 0, 0.1)'}}>
      <h2 style={{fontSize: '2rem', fontWeight: '700', color: '#0284c7', marginBottom: '2rem', textAlign: 'center'}}>
        Submit Prayer Request
      </h2>
      
      {message && (
        <div style={{padding: '1rem', marginBottom: '1rem', borderRadius: '0.5rem', backgroundColor: message.includes('Error') ? '#fef2f2' : '#f0f9ff', color: message.includes('Error') ? '#dc2626' : '#0284c7'}}>
          {message}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div style={{marginBottom: '1rem'}}>
          <label style={{display: 'block', marginBottom: '0.5rem', fontWeight: '500', color: '#374151'}}>Name *</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            style={{width: '100%', padding: '0.75rem', border: '1px solid #d1d5db', borderRadius: '0.5rem', fontSize: '1rem'}}
          />
        </div>

        <div style={{marginBottom: '1rem'}}>
          <label style={{display: 'block', marginBottom: '0.5rem', fontWeight: '500', color: '#374151'}}>Email *</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            style={{width: '100%', padding: '0.75rem', border: '1px solid #d1d5db', borderRadius: '0.5rem', fontSize: '1rem'}}
          />
        </div>

        <div style={{marginBottom: '1rem'}}>
          <label style={{display: 'block', marginBottom: '0.5rem', fontWeight: '500', color: '#374151'}}>Phone</label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            style={{width: '100%', padding: '0.75rem', border: '1px solid #d1d5db', borderRadius: '0.5rem', fontSize: '1rem'}}
          />
        </div>

        <div style={{marginBottom: '1rem'}}>
          <label style={{display: 'block', marginBottom: '0.5rem', fontWeight: '500', color: '#374151'}}>Prayer Type</label>
          <select
            name="prayer_type"
            value={formData.prayer_type}
            onChange={handleChange}
            style={{width: '100%', padding: '0.75rem', border: '1px solid #d1d5db', borderRadius: '0.5rem', fontSize: '1rem'}}
          >
            <option value="health">Health & Healing</option>
            <option value="family">Family & Relationships</option>
            <option value="finance">Financial Blessing</option>
            <option value="career">Career & Education</option>
            <option value="spiritual">Spiritual Growth</option>
            <option value="thanksgiving">Thanksgiving</option>
            <option value="other">Other</option>
          </select>
        </div>

        <div style={{marginBottom: '1rem'}}>
          <label style={{display: 'block', marginBottom: '0.5rem', fontWeight: '500', color: '#374151'}}>Prayer Intention *</label>
          <textarea
            name="intention"
            value={formData.intention}
            onChange={handleChange}
            required
            rows="4"
            style={{width: '100%', padding: '0.75rem', border: '1px solid #d1d5db', borderRadius: '0.5rem', fontSize: '1rem', resize: 'vertical'}}
          />
        </div>

        <div style={{marginBottom: '1.5rem'}}>
          <label style={{display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer'}}>
            <input
              type="checkbox"
              name="is_public"
              checked={formData.is_public}
              onChange={handleChange}
            />
            <span style={{fontSize: '0.875rem', color: '#6b7280'}}>
              Allow this prayer request to be shared publicly (name will be kept private)
            </span>
          </label>
        </div>

        <button
          type="submit"
          disabled={loading}
          style={{
            width: '100%',
            padding: '0.75rem',
            backgroundColor: loading ? '#9ca3af' : '#0284c7',
            color: '#ffffff',
            border: 'none',
            borderRadius: '0.5rem',
            fontSize: '1rem',
            fontWeight: '600',
            cursor: loading ? 'not-allowed' : 'pointer'
          }}
        >
          {loading ? 'Submitting...' : 'Submit Prayer Request'}
        </button>
      </form>
    </div>
  );
};

export default PrayerForm;