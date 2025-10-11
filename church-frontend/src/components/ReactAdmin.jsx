import React, { useState, useEffect } from 'react';
import { adminAPI } from '../services/adminApi';

const ReactAdmin = () => {
  const [activeModel, setActiveModel] = useState('contactmessage');
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const models = [
    { key: 'contactmessage', name: 'Contact Messages', api: 'contact-messages' },
    { key: 'prayerrequest', name: 'Prayer Requests', api: 'prayer-requests' },
    { key: 'news', name: 'News', api: 'news' },
    { key: 'event', name: 'Events', api: 'events' },
    { key: 'gallery', name: 'Gallery', api: 'gallery' },
    { key: 'schedule', name: 'Schedule', api: 'schedule' }
  ];

  useEffect(() => {
    fetchData();
  }, [activeModel]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const model = models.find(m => m.key === activeModel);
      const response = await fetch(`http://localhost:8000/api/admin/${model.api}/`);
      const result = await response.json();
      setData(result.results || result);
    } catch (error) {
      console.error('Error fetching data:', error);
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

  const renderTable = () => {
    if (loading) return <div className="p-4">Loading...</div>;
    if (!data.length) return <div className="p-4">No data found</div>;

    const firstItem = data[0];
    const columns = Object.keys(firstItem).filter(key => 
      !['created_at', 'updated_at'].includes(key)
    );

    return (
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border">
          <thead className="bg-gray-50">
            <tr>
              {columns.map(col => (
                <th key={col} className="px-4 py-2 border text-left text-xs font-medium text-gray-500 uppercase">
                  {col.replace('_', ' ')}
                </th>
              ))}
              <th className="px-4 py-2 border text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody>
            {data.map(item => (
              <tr key={item.id} className="hover:bg-gray-50">
                {columns.map(col => (
                  <td key={col} className="px-4 py-2 border text-sm">
                    {typeof item[col] === 'boolean' ? 
                      (item[col] ? '✓' : '✗') : 
                      String(item[col]).substring(0, 50)
                    }
                  </td>
                ))}
                <td className="px-4 py-2 border text-sm">
                  <button 
                    onClick={() => deleteItem(item.id)}
                    className="text-red-600 hover:text-red-800"
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
    <div className="min-h-screen bg-gray-100">
      <div className="bg-blue-600 text-white p-4">
        <h1 className="text-2xl font-bold">Church Administration</h1>
        <p>Django-style admin interface</p>
      </div>

      <div className="flex">
        <div className="w-64 bg-white shadow-sm min-h-screen">
          <div className="p-4">
            <h2 className="font-semibold text-gray-800 mb-4">Models</h2>
            {models.map(model => (
              <button
                key={model.key}
                onClick={() => setActiveModel(model.key)}
                className={`block w-full text-left p-2 rounded mb-1 ${
                  activeModel === model.key 
                    ? 'bg-blue-100 text-blue-800' 
                    : 'hover:bg-gray-100'
                }`}
              >
                {model.name}
              </button>
            ))}
          </div>
        </div>

        <div className="flex-1 p-6">
          <div className="bg-white rounded-lg shadow">
            <div className="p-4 border-b">
              <h2 className="text-xl font-semibold">
                {models.find(m => m.key === activeModel)?.name}
              </h2>
            </div>
            {renderTable()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReactAdmin;