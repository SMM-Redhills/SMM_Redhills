import React, { useState, useEffect } from 'react';
import { churchAPI } from '../../services/api';

const NewsEvents = () => {
  const [news, setNews] = useState([]);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [newsRes, eventsRes] = await Promise.all([
          churchAPI.getFeaturedNews(),
          churchAPI.getUpcomingEvents()
        ]);
        setNews(newsRes.data);
        setEvents(eventsRes.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div style={{padding: '2rem', backgroundColor: '#f8fafc'}}>
      <h2 style={{fontSize: '2rem', fontWeight: '700', color: '#0284c7', marginBottom: '2rem', textAlign: 'center'}}>
        Latest News & Events
      </h2>
      
      <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem'}}>
        {news.map(item => (
          <div key={item.id} style={{backgroundColor: '#ffffff', padding: '1.5rem', borderRadius: '1rem', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'}}>
            <h3 style={{fontSize: '1.25rem', fontWeight: '600', marginBottom: '1rem', color: '#1e293b'}}>{item.title}</h3>
            <p style={{color: '#64748b', marginBottom: '1rem'}}>{item.content.substring(0, 150)}...</p>
            <span style={{color: '#0ea5e9', fontSize: '0.875rem'}}>{item.category_name}</span>
          </div>
        ))}
        
        {events.map(event => (
          <div key={event.id} style={{backgroundColor: '#ffffff', padding: '1.5rem', borderRadius: '1rem', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'}}>
            <h3 style={{fontSize: '1.25rem', fontWeight: '600', marginBottom: '1rem', color: '#1e293b'}}>{event.title}</h3>
            <p style={{color: '#64748b', marginBottom: '1rem'}}>{event.description.substring(0, 150)}...</p>
            <div style={{display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem', color: '#0ea5e9'}}>
              <span>{new Date(event.date).toLocaleDateString()}</span>
              <span>{event.location}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NewsEvents;