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
    { key: 'prayers', name: 'Prayers', api: 'prayers', canAdd: true },
    { key: 'banner-slides', name: 'Banner Slides', api: 'banner-slides', canAdd: true }
  ];

  useEffect(() => {
    fetchData();
  }, [activeModel]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const model = models.find(m => m.key === activeModel);
      const response = await adminAPI.listItems(model.api);
      const result = response.data;
      setData(result.results || result);
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
      await adminAPI.deleteItem(model.api, id);
      fetchData();
      alert('Item deleted successfully!');
    } catch (error) {
      console.error('Error deleting item:', error);
      alert('Error deleting item. Please try again.');
    }
  };

  const handleAddItem = async (e) => {
    if (e) e.preventDefault();
    try {
      const model = models.find(m => m.key === activeModel);
      
      let dataToSend;
      const hasFile = Object.values(formData).some(val => val instanceof File);
      
      if (hasFile) {
        dataToSend = new FormData();
        Object.keys(formData).forEach(key => {
          if (formData[key] !== undefined && formData[key] !== null) {
            dataToSend.append(key, formData[key]);
          }
        });
      } else {
        dataToSend = formData;
      }

      const response = await adminAPI.createItem(model.api, dataToSend);
      
      if (response.status === 201 || response.status === 200) {
        setShowAddForm(false);
        setFormData({});
        fetchData();
        alert('Item added successfully!');
      } else {
        alert('Error adding item. Please try again.');
      }
    } catch (error) {
      console.error('Error adding item:', error);
      const errorMessage = error.response?.data 
        ? JSON.stringify(error.response.data) 
        : 'Unknown error occurred';
      alert(`Error adding item: ${errorMessage}`);
    }
  };

  const renderAddForm = () => {
    const getFormFields = () => {
      switch(activeModel) {
        case 'news':
          return [
            { name: 'title', type: 'text', placeholder: 'News Title', required: true },
            { name: 'content', type: 'textarea', placeholder: 'News Content', required: true },
            { name: 'image', type: 'file', label: 'Upload Image' },
            { name: 'image_url', type: 'text', placeholder: 'Or Image URL' },
            { name: 'date', type: 'date', placeholder: 'Date', required: true },
            { name: 'category', type: 'text', placeholder: 'Category' },
            { name: 'is_published', type: 'checkbox', label: 'Published' }
          ];
        case 'event':
          return [
            { name: 'title', type: 'text', placeholder: 'Event Title', required: true },
            { name: 'description', type: 'textarea', placeholder: 'Event Description', required: true },
            { name: 'image', type: 'file', label: 'Upload Image' },
            { name: 'image_url', type: 'text', placeholder: 'Or Image URL' },
            { name: 'date', type: 'datetime-local', placeholder: 'Event Date', required: true },
            { name: 'location', type: 'text', placeholder: 'Location' },
            { name: 'category', type: 'text', placeholder: 'Category' }
          ];
        case 'gallery':
          return [
            { name: 'title', type: 'text', placeholder: 'Gallery Title', required: true },
            { name: 'description', type: 'textarea', placeholder: 'Description' },
            { name: 'media_type', type: 'select', options: ['image', 'video'], required: true },
            { name: 'image', type: 'file', label: 'Upload Image', condition: (data) => data.media_type === 'image' },
            { name: 'image_url', type: 'text', placeholder: 'Image URL', condition: (data) => data.media_type === 'image' },
            { name: 'video_url', type: 'text', placeholder: 'Video URL', condition: (data) => data.media_type === 'video', required: true },
            { name: 'category', type: 'select', options: ['Architecture', 'Celebrations', 'Worship', 'Community', 'Prayer', 'Youth', 'General'], required: true }
          ];
        case 'schedule':
          return [
            { name: 'title', type: 'text', placeholder: 'Service Title', required: true },
            { name: 'day', type: 'select', options: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday', 'daily'], required: true },
            { name: 'time', type: 'time', placeholder: 'Time', required: true },
            { name: 'description', type: 'textarea', placeholder: 'Description' },
            { name: 'location', type: 'text', placeholder: 'Location' }
          ];
        case 'prayers':
          return [
            { name: 'title', type: 'text', placeholder: 'Prayer Title', required: true },
            { name: 'content', type: 'textarea', placeholder: 'Prayer Content', required: true },
            { name: 'category', type: 'text', placeholder: 'Category', required: true },
            { name: 'language', type: 'select', options: ['English', 'Tamil'], required: true }
          ];
        case 'banner-slides':
          return [
            { name: 'title', type: 'text', placeholder: 'Slide Title', required: true },
            { name: 'subtitle', type: 'text', placeholder: 'Subtitle' },
            { name: 'description', type: 'textarea', placeholder: 'Description' },
            { name: 'image', type: 'file', label: 'Upload Image' },
            { name: 'image_url', type: 'text', placeholder: 'Or Image URL' },
            { name: 'order', type: 'number', placeholder: 'Display Order' },
            { name: 'is_active', type: 'checkbox', label: 'Is Active' }
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
            {fields.map(field => {
              if (field.condition && !field.condition(formData)) return null;

              const isImageUpload = field.name === 'image';
              const isImageUrl = field.name === 'image_url';
              const isVideoUrl = field.name === 'video_url';

              // Disable logic
              const isDisabled = 
                (isImageUrl && formData.image) || 
                (isImageUpload && formData.image_url);

              return (
                <div key={field.name} style={{marginBottom: '1.5rem'}}>
                  <label style={{display: 'block', fontSize: '0.875rem', fontWeight: '500', color: '#374151', marginBottom: '0.25rem'}}>
                    {field.label || field.placeholder}
                    {field.required && <span style={{color: '#dc2626', marginLeft: '4px'}}>*</span>}
                  </label>
                  
                  {field.type === 'textarea' ? (
                    <textarea
                      placeholder={field.placeholder}
                      value={formData[field.name] || ''}
                      onChange={(e) => setFormData({...formData, [field.name]: e.target.value})}
                      style={{width: '100%', padding: '0.5rem', border: '1px solid #d1d5db', borderRadius: '0.375rem', minHeight: '100px'}}
                    />
                  ) : field.type === 'file' ? (
                    <div>
                      <input
                        type="file"
                        disabled={isDisabled}
                        onChange={(e) => {
                          const file = e.target.files[0];
                          setFormData({...formData, [field.name]: file});
                        }}
                        style={{width: '100%', padding: '0.5rem', border: '1px solid #d1d5db', borderRadius: '0.375rem', opacity: isDisabled ? 0.5 : 1}}
                      />
                      {formData[field.name] && formData[field.name] instanceof File && (
                        <div style={{marginTop: '0.5rem'}}>
                          <p style={{fontSize: '0.75rem', color: '#6b7280'}}>Preview:</p>
                          <img 
                            src={URL.createObjectURL(formData[field.name])} 
                            alt="Preview" 
                            style={{maxWidth: '100%', maxHeight: '200px', borderRadius: '0.375rem', marginTop: '0.25rem'}} 
                          />
                        </div>
                      )}
                    </div>
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
                      style={{width: '100%', padding: '0.5rem', border: '1px solid #d1d5db', borderRadius: '0.375rem'}}
                    >
                      <option value="">Select {field.name}</option>
                      {field.options.map(option => (
                        <option key={option} value={option}>{option}</option>
                      ))}
                    </select>
                  ) : (
                    <div>
                      <input
                        type={field.type}
                        placeholder={field.placeholder}
                        disabled={isDisabled}
                        value={formData[field.name] || ''}
                        onChange={(e) => setFormData({...formData, [field.name]: e.target.value})}
                        style={{width: '100%', padding: '0.5rem', border: '1px solid #d1d5db', borderRadius: '0.375rem', opacity: isDisabled ? 0.5 : 1}}
                      />
                      {(isImageUrl || isVideoUrl) && formData[field.name] && !formData.image && (
                        <div style={{marginTop: '0.5rem'}}>
                          <p style={{fontSize: '0.75rem', color: '#6b7280'}}>Preview:</p>
                          {isImageUrl ? (
                            <img 
                              src={formData[field.name]} 
                              alt="Preview" 
                              style={{maxWidth: '100%', maxHeight: '200px', borderRadius: '0.375rem', marginTop: '0.25rem'}} 
                              onError={(e) => e.target.style.display = 'none'}
                            />
                          ) : (
                            <div style={{marginTop: '0.25rem', padding: '0.5rem', background: '#f3f4f6', borderRadius: '0.375rem', fontSize: '0.75rem'}}>
                              Video URL provided: {formData[field.name]}
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
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
    if (loading) return (
      <div style={{padding: '3rem', textAlign: 'center', color: '#6b7280'}}>
        <div style={{fontSize: '2rem', marginBottom: '0.5rem'}}>⏳</div>
        Loading...
      </div>
    );
    if (!data.length) return (
      <div style={{padding: '3rem', textAlign: 'center', color: '#6b7280'}}>
        <div style={{fontSize: '2rem', marginBottom: '0.5rem'}}>📭</div>
        No data found
      </div>
    );

    const firstItem = data[0];
    const columns = Object.keys(firstItem).filter(key => 
      !['created_at', 'updated_at'].includes(key)
    );

    // Column width configurations
    const getColumnStyle = (col) => {
      const baseStyle = {
        padding: '0.75rem 1rem',
        borderBottom: '1px solid #e5e7eb',
        fontSize: '0.875rem',
        color: '#374151',
        verticalAlign: 'middle'
      };
      
      if (col === 'id') return { ...baseStyle, width: '60px', textAlign: 'center', fontWeight: '600', color: '#6b7280' };
      if (col === 'title') return { ...baseStyle, minWidth: '150px', maxWidth: '200px', fontWeight: '500' };
      if (col === 'subtitle' || col === 'description' || col === 'content') return { ...baseStyle, maxWidth: '180px' };
      if (col === 'image' || col === 'image_url' || col === 'media_url' || col === 'video_url') return { ...baseStyle, maxWidth: '200px' };
      if (col === 'order') return { ...baseStyle, width: '80px', textAlign: 'center' };
      if (col === 'is_active' || col === 'is_published' || col === 'is_read' || col === 'is_public') return { ...baseStyle, width: '80px', textAlign: 'center' };
      return baseStyle;
    };

    // Render cell content based on column type
    const renderCellContent = (col, value) => {
      if (value === null || value === undefined) return <span style={{color: '#9ca3af', fontStyle: 'italic'}}>—</span>;
      
      // Boolean fields
      if (typeof value === 'boolean') {
        return value ? 
          <span style={{color: '#10b981', fontWeight: '600'}}>✓ Yes</span> : 
          <span style={{color: '#ef4444'}}>✗ No</span>;
      }
      
      // Image/URL fields - show thumbnail or truncated URL
      if (col === 'image' || col === 'media_url') {
        if (!value) return <span style={{color: '#9ca3af', fontStyle: 'italic'}}>—</span>;
        const imageUrl = typeof value === 'string' && value.startsWith('http') ? value : `http://localhost:8000${value}`;
        return (
          <div style={{display: 'flex', alignItems: 'center', gap: '0.5rem'}}>
            <img 
              src={imageUrl} 
              alt="Preview" 
              style={{width: '40px', height: '40px', objectFit: 'cover', borderRadius: '4px', border: '1px solid #e5e7eb'}}
              onError={(e) => { e.target.style.display = 'none'; }}
            />
            <span style={{fontSize: '0.75rem', color: '#6b7280', maxWidth: '120px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap'}}>
              {String(value).split('/').pop()}
            </span>
          </div>
        );
      }
      
      // URL fields - truncate and show as link
      if (col === 'image_url' || col === 'video_url') {
        if (!value) return <span style={{color: '#9ca3af', fontStyle: 'italic'}}>—</span>;
        return (
          <a 
            href={value} 
            target="_blank" 
            rel="noopener noreferrer"
            style={{color: '#2563eb', fontSize: '0.75rem', maxWidth: '150px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', display: 'block', textDecoration: 'none'}}
            title={value}
          >
            🔗 {String(value).substring(0, 30)}...
          </a>
        );
      }
      
      // Text fields - truncate long text
      const strValue = String(value);
      if (strValue.length > 50) {
        return (
          <span title={strValue} style={{cursor: 'help'}}>
            {strValue.substring(0, 50)}...
          </span>
        );
      }
      
      return strValue;
    };

    return (
      <div style={{overflowX: 'auto', borderRadius: '0.5rem'}}>
        <table style={{width: '100%', backgroundColor: 'white', borderCollapse: 'collapse'}}>
          <thead>
            <tr style={{backgroundColor: '#1e40af'}}>
              {columns.map(col => (
                <th key={col} style={{
                  padding: '0.75rem 1rem',
                  textAlign: 'left',
                  fontSize: '0.75rem',
                  fontWeight: '600',
                  color: 'white',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                  borderBottom: '2px solid #1e3a8a',
                  whiteSpace: 'nowrap'
                }}>
                  {col.replace(/_/g, ' ')}
                </th>
              ))}
              <th style={{
                padding: '0.75rem 1rem',
                textAlign: 'center',
                fontSize: '0.75rem',
                fontWeight: '600',
                color: 'white',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                borderBottom: '2px solid #1e3a8a',
                width: '100px'
              }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr 
                key={item.id} 
                style={{
                  backgroundColor: index % 2 === 0 ? '#ffffff' : '#f8fafc',
                  transition: 'background-color 0.15s'
                }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#eff6ff'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = index % 2 === 0 ? '#ffffff' : '#f8fafc'}
              >
                {columns.map(col => (
                  <td key={col} style={getColumnStyle(col)}>
                    {renderCellContent(col, item[col])}
                  </td>
                ))}
                <td style={{padding: '0.75rem 1rem', borderBottom: '1px solid #e5e7eb', textAlign: 'center'}}>
                  <button 
                    onClick={() => deleteItem(item.id)}
                    style={{
                      color: 'white',
                      backgroundColor: '#ef4444',
                      border: 'none',
                      borderRadius: '0.375rem',
                      padding: '0.375rem 0.75rem',
                      fontSize: '0.75rem',
                      fontWeight: '500',
                      cursor: 'pointer',
                      transition: 'all 0.15s'
                    }}
                    onMouseEnter={(e) => e.target.style.backgroundColor = '#dc2626'}
                    onMouseLeave={(e) => e.target.style.backgroundColor = '#ef4444'}
                  >
                    🗑️ Delete
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
      <div style={{background: 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)', color: 'white', padding: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
        <div style={{display: 'flex', alignItems: 'center', gap: '1rem'}}>
          <img 
            src="/assets/images/smm_logo.png" 
            alt="Church Logo" 
            style={{width: '100px', height: '100px'}}
          />
          <div>
            <h1 style={{fontSize: '1.5rem', fontWeight: '700', fontFamily: 'serif'}}>Church Administration</h1>
            <p style={{marginTop: '0.25rem', color: '#dbeafe'}}>Manage your church content and community</p>
          </div>
        </div>
        <button 
          onClick={() => {
            localStorage.removeItem('adminToken');
            localStorage.removeItem('adminUser');
            window.location.reload();
          }}
          style={{
            backgroundColor: 'rgba(255,255,255,0.2)',
            color: 'white',
            border: '1px solid rgba(255,255,255,0.4)',
            padding: '0.5rem 1rem',
            borderRadius: '0.375rem',
            cursor: 'pointer',
            fontSize: '0.875rem',
            fontWeight: '600',
            transition: 'all 0.2s'
          }}
          onMouseEnter={(e) => e.target.style.backgroundColor = 'rgba(255,255,255,0.3)'}
          onMouseLeave={(e) => e.target.style.backgroundColor = 'rgba(255,255,255,0.2)'}
        >
          Logout
        </button>
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