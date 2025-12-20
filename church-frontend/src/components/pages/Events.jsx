import React, { useEffect, useState, useRef } from 'react';
import { Calendar, MapPin, Clock, Users } from 'lucide-react';
import { churchAPI } from '../../services/api';
import { adminAPI } from '../../services/adminApi';

const Events = ({ onNavigate, scrollToSection }) => {
  const [events, setEvents] = useState([]);
  const observerRef = useRef(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    date: '',
    time: '',
    location: '',
    type: 'Celebration'
  });
  const [isAdmin, setIsAdmin] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);

  useEffect(() => {
    const adminToken = localStorage.getItem('adminToken');
    setIsAdmin(!!adminToken);
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const response = await churchAPI.getEvents();
      const data = response.data.results || response.data;
      setEvents(data);
    } catch (error) {
      console.error('Error fetching events:', error);
    }
  };

  // Initialize scroll animations
  useEffect(() => {
    // Create intersection observer for scroll animations
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate');
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px',
      }
    );

    // Observe all elements with scroll animation classes
    const animatedElements = document.querySelectorAll(
      '.scroll-fade-in, .scroll-slide-up, .scroll-slide-left, .scroll-slide-right, .scroll-scale-in, .scroll-stagger-children'
    );

    animatedElements.forEach((el) => {
      observerRef.current.observe(el);
    });

    // Cleanup function
    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [events]);

  const getEventTypeIcon = (type) => {
    switch(type) {
      case 'Celebration': return <Calendar style={{width: '1.25rem', height: '1.25rem'}} />;
      case 'Mass': return <Users style={{width: '1.25rem', height: '1.25rem'}} />;
      case 'Service': return <MapPin style={{width: '1.25rem', height: '1.25rem'}} />;
      case 'Prayer': return <Clock style={{width: '1.25rem', height: '1.25rem'}} />;
      default: return <Calendar style={{width: '1.25rem', height: '1.25rem'}} />;
    }
  };

  return (
    <section 
      id="events-section"
      className="scroll-fade-in smooth-scroll-section"
      style={{padding: '4rem 0', backgroundColor: assignedColors.events, width: '100%', display: 'flex', justifyContent: 'center', minHeight: '100vh'}}
    >
      <div style={{maxWidth: '80rem', margin: '0 auto', padding: '0 1rem', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', width: '100%'}}>
        <div className="scroll-slide-up" style={{textAlign: 'center', marginBottom: '3rem'}}>
          <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem', marginBottom: '1rem'}}>
            <h1 style={{fontSize: '3rem', fontFamily: 'serif', fontWeight: '700', color: 'white'}}>Parish Events</h1>
            {isAdmin && (
              <button
                onClick={() => setShowAddForm(true)}
                style={{
                  backgroundColor: '#10b981',
                  color: 'white',
                  border: 'none',
                  borderRadius: '50%',
                  width: '50px',
                  height: '50px',
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
          <p style={{fontSize: '1.125rem', color: '#94a3b8'}}>Join us in worship, fellowship, and community service</p>
        </div>
        
        <div 
          id="events-grid"
          className="scroll-stagger-children"
          style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '2rem', width: '100%', maxWidth: '80rem'}}
        >
          {events.map((ev, index) => (
            <div 
              key={ev.id} 
              className="hover-lift"
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.05)', 
                borderRadius: '1rem', 
                padding: '2rem', 
                border: '1px solid rgba(255, 255, 255, 0.1)', 
                backdropFilter: 'blur(10px)', 
                transition: 'all 0.3s ease',
                animationDelay: `${index * 0.15}s`
              }}
            >
              <div className="scroll-fade-in" style={{display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem', gap: '0.5rem'}}>
                <div style={{color: '#0ea5e9'}}>
                  {getEventTypeIcon(ev.type)}
                </div>
                <span style={{color: '#0ea5e9', fontSize: '0.875rem', fontWeight: '500'}}>{ev.type}</span>
              </div>
              
              <h2 className="scroll-slide-up" style={{fontSize: '1.5rem', fontWeight: '600', marginBottom: '1rem', color: 'white', fontFamily: 'serif'}}>{ev.title}</h2>
              <p className="scroll-slide-up" style={{color: '#cbd5e1', lineHeight: '1.6', marginBottom: '1.5rem'}}>{ev.description}</p>
              
              <div className="scroll-fade-in" style={{display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '1.5rem'}}>
                <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem'}}>
                  <Calendar style={{width: '1rem', height: '1rem', color: '#0ea5e9'}} />
                  <span style={{color: '#94a3b8', fontSize: '0.875rem'}}>{ev.date} at {ev.time}</span>
                </div>
                <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem'}}>
                  <MapPin style={{width: '1rem', height: '1rem', color: '#0ea5e9'}} />
                  <span style={{color: '#94a3b8', fontSize: '0.875rem'}}>{ev.location}</span>
                </div>
              </div>
              
              <button 
                className="hover-lift focus-smooth"
                onClick={() => setSelectedEvent(ev)}
                style={{width: '100%', backgroundColor: '#0ea5e9', color: 'white', padding: '0.75rem 1rem', borderRadius: '0.75rem', fontWeight: '500', border: 'none', cursor: 'pointer', transition: 'all 0.3s ease'}}
              >
                Learn More
              </button>
            </div>
          ))}
        </div>

        <div className="scroll-scale-in" style={{textAlign: 'center', marginTop: '3rem'}}>
          <div className="hover-lift" style={{backgroundColor: 'rgba(255, 255, 255, 0.05)', borderRadius: '1rem', padding: '2rem', border: '1px solid rgba(255, 255, 255, 0.1)', backdropFilter: 'blur(10px)', maxWidth: '40rem', transition: 'all 0.3s ease'}}>
            <Users className="scroll-scale-in" style={{width: '4rem', height: '4rem', color: '#0ea5e9', margin: '0 auto 1rem auto', display: 'block'}} />
            <h2 className="scroll-slide-up" style={{fontSize: '1.5rem', fontWeight: '600', marginBottom: '1rem', color: 'white', fontFamily: 'serif'}}>Join Our Community</h2>
            <p className="scroll-slide-up" style={{color: '#cbd5e1', marginBottom: '1.5rem', lineHeight: '1.6'}}>
              Be part of our vibrant parish community. All are welcome to participate in our events and activities.
            </p>
            <button 
              className="hover-lift focus-smooth"
              style={{backgroundColor: '#0ea5e9', color: 'white', padding: '0.75rem 2rem', borderRadius: '0.75rem', fontWeight: '600', border: 'none', cursor: 'pointer', transition: 'all 0.3s ease'}}
            >
              Get Involved
            </button>
          </div>
        </div>
      </div>
      
      {/* Add Event Modal */}
      {showAddForm && (
        <div style={{position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 50}}>
          <div style={{backgroundColor: 'white', padding: '2rem', borderRadius: '0.5rem', width: '90%', maxWidth: '500px', maxHeight: '80vh', overflowY: 'auto'}}>
            <h3 style={{fontSize: '1.25rem', fontWeight: '600', marginBottom: '1rem', color: '#000000'}}>Add Event</h3>
            <form onSubmit={(e) => {
              e.preventDefault();
              const newEvent = {
                id: Date.now(),
                ...formData,
                date: new Date(formData.date).toLocaleDateString('en-GB')
              };
              setEvents([newEvent, ...events]);
              setShowAddForm(false);
              setFormData({ title: '', description: '', date: '', time: '', location: '', type: 'Celebration' });
            }}>
              <div style={{marginBottom: '1rem'}}>
                <input
                  type="text"
                  placeholder="Event Title"
                  value={formData.title}
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                  required
                  style={{width: '100%', padding: '0.5rem', border: '1px solid #d1d5db', borderRadius: '0.375rem'}}
                />
              </div>
              <div style={{marginBottom: '1rem'}}>
                <select
                  value={formData.type}
                  onChange={(e) => setFormData({...formData, type: e.target.value})}
                  style={{width: '100%', padding: '0.5rem', border: '1px solid #d1d5db', borderRadius: '0.375rem'}}
                >
                  <option value="Celebration">Celebration</option>
                  <option value="Mass">Mass</option>
                  <option value="Service">Service</option>
                  <option value="Prayer">Prayer</option>
                </select>
              </div>
              <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem'}}>
                <input
                  type="date"
                  value={formData.date}
                  onChange={(e) => setFormData({...formData, date: e.target.value})}
                  required
                  style={{padding: '0.5rem', border: '1px solid #d1d5db', borderRadius: '0.375rem'}}
                />
                <input
                  type="time"
                  value={formData.time}
                  onChange={(e) => setFormData({...formData, time: e.target.value})}
                  required
                  style={{padding: '0.5rem', border: '1px solid #d1d5db', borderRadius: '0.375rem'}}
                />
              </div>
              <div style={{marginBottom: '1rem'}}>
                <input
                  type="text"
                  placeholder="Location"
                  value={formData.location}
                  onChange={(e) => setFormData({...formData, location: e.target.value})}
                  required
                  style={{width: '100%', padding: '0.5rem', border: '1px solid #d1d5db', borderRadius: '0.375rem'}}
                />
              </div>
              <div style={{marginBottom: '1rem'}}>
                <textarea
                  placeholder="Event Description"
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  required
                  rows="3"
                  style={{width: '100%', padding: '0.5rem', border: '1px solid #d1d5db', borderRadius: '0.375rem'}}
                />
              </div>
              <div style={{display: 'flex', gap: '1rem', justifyContent: 'flex-end'}}>
                <button
                  type="button"
                  onClick={() => {setShowAddForm(false); setFormData({ title: '', description: '', date: '', time: '', location: '', type: 'Celebration' });}}
                  style={{padding: '0.5rem 1rem', backgroundColor: '#6b7280', color: 'white', border: 'none', borderRadius: '0.375rem', cursor: 'pointer'}}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={async () => {
                    if (formData.title && formData.description && formData.date && formData.time && formData.location) {
                      try {
                        const response = await fetch('http://localhost:8000/api/events/', {
                          method: 'POST',
                          headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Token ${localStorage.getItem('adminToken')}`,
                          },
                          body: JSON.stringify({
                            ...formData,
                            datetime: `${formData.date}T${formData.time}`
                          })
                        });
                        
                        if (response.ok) {
                          const newEvent = {
                            id: Date.now(),
                            ...formData,
                            date: new Date(formData.date).toLocaleDateString('en-GB')
                          };
                          setEvents([newEvent, ...events]);
                          setShowAddForm(false);
                          setFormData({ title: '', description: '', date: '', time: '', location: '', type: 'Celebration' });
                          alert('Event added successfully!');
                        } else {
                          alert('Error adding event. Please try again.');
                        }
                      } catch (error) {
                        console.error('Error:', error);
                        alert('Error adding event. Please try again.');
                      }
                    }
                  }}
                  style={{padding: '0.5rem 1rem', backgroundColor: '#2563eb', color: 'white', border: 'none', borderRadius: '0.375rem', cursor: 'pointer'}}
                >
                  Add Event
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      
      {/* Event Detail Modal */}
      {selectedEvent && (
        <div style={{position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.8)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 50, padding: '1rem'}} onClick={() => setSelectedEvent(null)}>
          <div style={{backgroundColor: 'white', borderRadius: '1rem', padding: '2rem', maxWidth: '40rem', width: '100%', maxHeight: '80vh', overflowY: 'auto'}} onClick={(e) => e.stopPropagation()}>
            <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem', gap: '0.5rem'}}>
              <span style={{color: '#0ea5e9', fontSize: '0.875rem', fontWeight: '500', backgroundColor: '#e0f2fe', padding: '0.25rem 0.75rem', borderRadius: '1rem'}}>{selectedEvent.type}</span>
            </div>
            <h2 style={{fontSize: '1.5rem', fontWeight: '600', marginBottom: '1.5rem', color: '#0284c7', fontFamily: 'serif', textAlign: 'center'}}>{selectedEvent.title}</h2>
            {(selectedEvent.media_url || selectedEvent.image_url || selectedEvent.image) && (
              <div style={{ marginBottom: '1.5rem', textAlign: 'center' }}>
                <img 
                  src={selectedEvent.media_url || selectedEvent.image_url || selectedEvent.image} 
                  alt={selectedEvent.title} 
                  style={{ width: '100%', maxHeight: '400px', objectFit: 'cover', borderRadius: '0.5rem' }} 
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = 'https://via.placeholder.com/600x400?text=Event+Image+Not+Found';
                  }}
                />
              </div>
            )}
            <div style={{display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '1.5rem', textAlign: 'center'}}>
              <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem'}}>
                <span style={{color: '#64748b', fontSize: '0.875rem'}}>📅 {selectedEvent.date} at {selectedEvent.time}</span>
              </div>
              <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem'}}>
                <span style={{color: '#64748b', fontSize: '0.875rem'}}>📍 {selectedEvent.location}</span>
              </div>
            </div>
            <div style={{color: '#64748b', lineHeight: '1.6', marginBottom: '2rem'}}>
              {selectedEvent.description}
            </div>
            <button 
              onClick={() => setSelectedEvent(null)}
              style={{width: '100%', backgroundColor: '#0ea5e9', color: 'white', padding: '0.75rem', borderRadius: '0.5rem', fontWeight: '600', border: 'none', cursor: 'pointer'}}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

export default Events;