import React, { useState, useEffect } from 'react';
import { adminAPI } from '../services/adminApi';

const ReactAdmin = () => {
  const [activeModel, setActiveModel] = useState('contactmessage');
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);
  const [formData, setFormData] = useState({});

  const models = [
    { key: 'contactmessage', name: 'Contact Messages', api: 'contact-messages' },
    { key: 'prayerrequest', name: 'Prayer Requests', api: 'prayer-requests' },
    { key: 'news', name: 'News', api: 'news', canAdd: true },
    { key: 'event', name: 'Events', api: 'events', canAdd: true },
    { key: 'gallery', name: 'Gallery', api: 'gallery', canAdd: true },
    { key: 'schedule', name: 'Schedule', api: 'schedule', canAdd: true },
    { key: 'prayers', name: 'Prayers', api: 'prayers', canAdd: true }
  ];

  useEffect(() => {
    fetchData();
  }, [activeModel]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const model = models.find(m => m.key === activeModel);
      const token = localStorage.getItem('adminToken');
      const response = await fetch(`http://localhost:8000/api/admin/${model.api}/`, {
        headers: {
          'Authorization': `Token ${token}`,
          'Content-Type': 'application/json',
        }
      });
      
      if (response.ok) {
        const result = await response.json();
        setData(result.results || result);
      } else {
        console.error('Error fetching data:', response.status);
        setData([]);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      setData([]);
    } finally {
      setLoading(false);
    }
  };

  const deleteItem = async (id) => {
    if (!confirm('Are you sure you want to delete this item?')) return;
    
    try {
      const model = models.find(m => m.key === activeModel);
      await fetch(`http://localhost:8000/api/admin/${model.api}/${id}/`, {
        method: 'DELETE'
      });
      fetchData();
    } catch (error) {
      console.error('Error deleting item:', error);
    }
  };

  const handleAddItem = async () => {
    try {
      const model = models.find(m => m.key === activeModel);
      const token = localStorage.getItem('adminToken');
      const response = await fetch(`http://localhost:8000/api/admin/${model.api}/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Token ${token}`,
        },
        body: JSON.stringify(formData)
      });
      
      if (response.ok) {
        setShowAddForm(false);
        setFormData({});
        fetchData();
        alert('Item added successfully!');
      } else {
        alert('Error adding item. Please try again.');
      }
    } catch (error) {
      console.error('Error adding item:', error);
      alert('Error adding item. Please try again.');
    }
  };

  const renderAddForm = () => {
    const getFormFields = () => {
      switch(activeModel) {
        case 'news':
          return [
            { name: 'title', type: 'text', placeholder: 'News Title' },
            { name: 'content', type: 'textarea', placeholder: 'News Content' },
            { name: 'image_url', type: 'text', placeholder: 'Image URL' },
            { name: 'is_published', type: 'checkbox', label: 'Published' }
          ];
        case 'event':
          return [
            { name: 'title', type: 'text', placeholder: 'Event Title' },
            { name: 'description', type: 'textarea', placeholder: 'Event Description' },
            { name: 'date', type: 'datetime-local', placeholder: 'Event Date' },
            { name: 'location', type: 'text', placeholder: 'Location' }
          ];
        case 'gallery':
          return [
            { name: 'title', type: 'text', placeholder: 'Gallery Title' },
            { name: 'image_url', type: 'text', placeholder: 'Image URL' },
            { name: 'video_url', type: 'text', placeholder: 'Video URL (optional)' },
            { name: 'description', type: 'textarea', placeholder: 'Description' }
          ];
        case 'schedule':
          return [
            { name: 'service_name', type: 'text', placeholder: 'Service Name' },
            { name: 'time', type: 'time', placeholder: 'Time' },
            { name: 'day', type: 'text', placeholder: 'Day' },
            { name: 'description', type: 'textarea', placeholder: 'Description' }
          ];
        case 'prayers':
          return [
            { name: 'title', type: 'text', placeholder: 'Prayer Title' },
            { name: 'content', type: 'textarea', placeholder: 'Prayer Content' },
            { name: 'category', type: 'text', placeholder: 'Category' },
            { name: 'language', type: 'select', options: ['English', 'Tamil'] }
          ];
        default:
          return [];
      }
    };

    const fields = getFormFields();
    
    return (
      <div style={{position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 50}}>
        <div style={{backgroundColor: 'white', padding: '2rem', borderRadius: '0.5rem', width: '90%', maxWidth: '500px', maxHeight: '80vh', overflowY: 'auto'}}>
          <h3 style={{fontSize: '1.25rem', fontWeight: '600', marginBottom: '1rem', color: '#000000'}}>Add New {models.find(m => m.key === activeModel)?.name}</h3>
          <form onSubmit={handleAddItem}>
            {fields.map(field => (
              <div key={field.name} style={{marginBottom: '1rem'}}>
                {field.type === 'textarea' ? (
                  <textarea
                    placeholder={field.placeholder}
                    value={formData[field.name] || ''}
                    onChange={(e) => setFormData({...formData, [field.name]: e.target.value})}
                    style={{width: '100%', padding: '0.5rem', border: '1px solid #d1d5db', borderRadius: '0.375rem', minHeight: '100px', color: '#000000'}}
                  />
                ) : field.type === 'checkbox' ? (
                  <label style={{display: 'flex', alignItems: 'center', gap: '0.5rem'}}>
                    <input
                      type="checkbox"
                      checked={formData[field.name] || false}
                      onChange={(e) => setFormData({...formData, [field.name]: e.target.checked})}
                    />
                    {field.label}
                  </label>
                ) : field.type === 'select' ? (
                  <select
                    value={formData[field.name] || ''}
                    onChange={(e) => setFormData({...formData, [field.name]: e.target.value})}
                    style={{width: '100%', padding: '0.5rem', border: '1px solid #d1d5db', borderRadius: '0.375rem', color: '#000000'}}
                  >
                    <option value="">Select {field.name}</option>
                    {field.options.map(option => (
                      <option key={option} value={option}>{option}</option>
                    ))}
                  </select>
                ) : (
                  <input
                    type={field.type}
                    placeholder={field.placeholder}
                    value={formData[field.name] || ''}
                    onChange={(e) => setFormData({...formData, [field.name]: e.target.value})}
                    style={{width: '100%', padding: '0.5rem', border: '1px solid #d1d5db', borderRadius: '0.375rem', color: '#000000'}}
                  />
                )}
              </div>
            ))}
            <div style={{display: 'flex', gap: '1rem', justifyContent: 'flex-end'}}>
              <button
                type="button"
                onClick={() => {setShowAddForm(false); setFormData({});}}
                style={{padding: '0.5rem 1rem', backgroundColor: '#6b7280', color: 'white', border: 'none', borderRadius: '0.375rem', cursor: 'pointer'}}
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleAddItem}
                style={{padding: '0.5rem 1rem', backgroundColor: '#2563eb', color: 'white', border: 'none', borderRadius: '0.375rem', cursor: 'pointer'}}
              >
                Add
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  };

  const renderTable = () => {
    if (loading) return <div style={{padding: '1rem'}}>Loading...</div>;
    if (!data.length) return <div style={{padding: '1rem'}}>No data found</div>;

    const firstItem = data[0];
    const columns = Object.keys(firstItem).filter(key => 
      !['created_at', 'updated_at'].includes(key)
    );

    return (
      <div style={{overflowX: 'auto'}}>
        <table style={{minWidth: '100%', backgroundColor: 'white', border: '1px solid #e5e7eb'}}>
          <thead style={{backgroundColor: '#f9fafb'}}>
            <tr>
              {columns.map(col => (
                <th key={col} style={{padding: '0.5rem 1rem', border: '1px solid #e5e7eb', textAlign: 'left', fontSize: '0.75rem', fontWeight: '500', color: '#6b7280', textTransform: 'uppercase'}}>
                  {col.replace('_', ' ')}
                </th>
              ))}
              <th style={{padding: '0.5rem 1rem', border: '1px solid #e5e7eb', textAlign: 'left', fontSize: '0.75rem', fontWeight: '500', color: '#6b7280', textTransform: 'uppercase'}}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {data.map(item => (
              <tr key={item.id} style={{transition: 'background-color 0.2s'}} onMouseEnter={(e) => e.target.parentElement.style.backgroundColor = '#f9fafb'} onMouseLeave={(e) => e.target.parentElement.style.backgroundColor = 'white'}>
                {columns.map(col => (
                  <td key={col} style={{padding: '0.5rem 1rem', border: '1px solid #e5e7eb', fontSize: '0.875rem'}}>
                    {typeof item[col] === 'boolean' ? 
                      (item[col] ? '✓' : '✗') : 
                      String(item[col]).substring(0, 50)
                    }
                  </td>
                ))}
                <td style={{padding: '0.5rem 1rem', border: '1px solid #e5e7eb', fontSize: '0.875rem'}}>
                  <button 
                    onClick={() => deleteItem(item.id)}
                    style={{color: '#dc2626', backgroundColor: 'transparent', border: 'none', cursor: 'pointer', transition: 'color 0.2s'}}
                    onMouseEnter={(e) => e.target.style.color = '#991b1b'}
                    onMouseLeave={(e) => e.target.style.color = '#dc2626'}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  return (
    <div style={{minHeight: '100vh', backgroundColor: '#f3f4f6'}}>
      <div style={{background: 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)', color: 'white', padding: '1rem'}}>
        <h1 style={{fontSize: '1.5rem', fontWeight: '700', fontFamily: 'serif'}}>⛪ Church Administration</h1>
        <p style={{marginTop: '0.25rem', color: '#dbeafe'}}>Manage your church content and community</p>
      </div>

      <div style={{display: 'flex'}}>
        <div style={{width: '16rem', backgroundColor: 'white', boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)', minHeight: 'calc(100vh - 80px)'}}>
          <div style={{padding: '1rem'}}>
            <h2 style={{fontWeight: '600', color: '#1f2937', marginBottom: '1rem'}}>Management</h2>
            {models.map(model => (
              <button
                key={model.key}
                onClick={() => setActiveModel(model.key)}
                style={{
                  display: 'block',
                  width: '100%',
                  textAlign: 'left',
                  padding: '0.5rem',
                  borderRadius: '0.375rem',
                  marginBottom: '0.25rem',
                  border: 'none',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  backgroundColor: activeModel === model.key ? '#dbeafe' : 'transparent',
                  color: activeModel === model.key ? '#1e40af' : '#374151'
                }}
                onMouseEnter={(e) => {
                  if (activeModel !== model.key) {
                    e.target.style.backgroundColor = '#f3f4f6';
                  }
                }}
                onMouseLeave={(e) => {
                  if (activeModel !== model.key) {
                    e.target.style.backgroundColor = 'transparent';
                  }
                }}
              >
                {model.name}
              </button>
            ))}
          </div>
        </div>

        <div style={{flex: 1, padding: '1.5rem'}}>
          <div style={{backgroundColor: 'white', borderRadius: '0.5rem', boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'}}>
            <div style={{padding: '1rem', borderBottom: '1px solid #e5e7eb', display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
              <h2 style={{fontSize: '1.25rem', fontWeight: '600', color: '#1f2937'}}>
                {models.find(m => m.key === activeModel)?.name}
              </h2>
              {models.find(m => m.key === activeModel)?.canAdd && (
                <button
                  onClick={() => setShowAddForm(true)}
                  style={{
                    backgroundColor: '#10b981',
                    color: 'white',
                    border: 'none',
                    borderRadius: '50%',
                    width: '40px',
                    height: '40px',
                    fontSize: '1.5rem',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'all 0.2s'
                  }}
                  onMouseEnter={(e) => e.target.style.backgroundColor = '#059669'}
                  onMouseLeave={(e) => e.target.style.backgroundColor = '#10b981'}
                >
                  +
                </button>
              )}
            </div>
            {renderTable()}
          </div>
        </div>
      </div>
      {showAddForm && renderAddForm()}
    </div>
  );
};

export default ReactAdmin;