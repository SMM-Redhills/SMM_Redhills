import React, { useEffect, useState, useRef } from 'react';
import { Calendar, MapPin, Clock, Users } from 'lucide-react';

const sampleEvents = [
  { id: 1, title: 'Saint Mary Magdalene Feast Day', date: '22/07/2025', time: '07:00 AM', location: 'Main church', description: 'Annual celebration with special masses and procession', type: 'Celebration' },
  { id: 2, title: 'Easter Sunday Mass', date: '20/04/2025', time: '07:00 AM', location: 'Main church', description: 'Celebrate the resurrection of our Lord Jesus Christ', type: 'Mass' },
  { id: 3, title: 'Community Outreach Program', date: '15/09/2025', time: '10:00 AM', location: 'Community Center', description: 'Serving the local community with food and support', type: 'Service' },
  { id: 4, title: 'Youth Prayer Meeting', date: '10/08/2025', time: '06:00 PM', location: 'Parish Hall', description: 'Monthly gathering for young adults in faith', type: 'Prayer' }
];

const Events = ({ onNavigate, scrollToSection }) => {
  const [events, setEvents] = useState([]);
  const observerRef = useRef(null);

  useEffect(() => {
    setEvents(sampleEvents);
  }, []);

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
      style={{padding: '4rem 0', background: 'linear-gradient(135deg, #1e293b 0%, #334155 100%)', width: '100%', display: 'flex', justifyContent: 'center', minHeight: '100vh'}}
    >
      <div style={{maxWidth: '80rem', margin: '0 auto', padding: '0 1rem', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', width: '100%'}}>
        <div className="scroll-slide-up" style={{textAlign: 'center', marginBottom: '3rem'}}>
          <h1 style={{fontSize: '3rem', fontFamily: 'serif', fontWeight: '700', marginBottom: '1rem', color: 'white'}}>Parish Events</h1>
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
    </section>
  );
};

export default Events;