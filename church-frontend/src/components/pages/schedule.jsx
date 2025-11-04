import React, { useEffect, useRef, useState } from 'react';
import { Clock, Heart, Users, Book, Cross, Calendar, Bell, Star } from 'lucide-react';

const Schedule = () => {
  const observerRef = useRef(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [formData, setFormData] = useState({
    service_name: '',
    time: '',
    day: '',
    description: '',
    type: 'Mass'
  });
  const [scheduleItems, setScheduleItems] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const adminToken = localStorage.getItem('adminToken');
    setIsAdmin(!!adminToken);
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
  }, []);

  return (
    <div style={{minHeight: '100vh', backgroundColor: '#ffffff', width: '100%'}}>
      {/* Hero Section */}
      <section 
        className="scroll-fade-in"
        style={{position: 'relative', background: 'linear-gradient(135deg, #0ea5e9 0%, #0284c7 50%, #0369a1 100%)', color: 'white', padding: '4rem 1rem', width: '100%', display: 'flex', justifyContent: 'center'}}
      >
        <div style={{position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(255,255,255,0.1)'}}></div>
        <div style={{position: 'relative', maxWidth: '72rem', margin: '0 auto', textAlign: 'center'}}>

          <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem', marginBottom: '1rem'}}>
            <h1 className="scroll-slide-up" style={{fontSize: '3rem', fontWeight: '700', lineHeight: '1.1', textAlign: 'center', fontFamily: 'serif'}}>
              Our Schedule
            </h1>
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
          <span style={{display: 'block', fontSize: '1.5rem', fontWeight: '300', color: '#e0f2fe'}}>Mass Times & church Services</span>
          <p className="scroll-slide-up" style={{fontSize: '1.125rem', marginBottom: '2rem', maxWidth: '48rem', margin: '0 auto 2rem auto', lineHeight: '1.7', textAlign: 'center', color: '#e0f2fe'}}>
            Join us for worship, prayer, and spiritual growth throughout the week
          </p>
        </div>
      </section>

      {/* Main Content */}
      <div style={{width: '100%', padding: '4rem 1rem', backgroundColor: '#f8fafc', display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
        <div style={{maxWidth: '80rem', width: '100%', margin: '0 auto'}}>

        {/* Quick Schedule Overview */}
        <section 
          className="scroll-fade-in"
          style={{marginBottom: '5rem', backgroundColor: '#e0f2fe', borderRadius: '1rem', padding: '3rem', textAlign: 'center', width: '100%'}}
        >
          <h2 className="scroll-slide-up" style={{fontSize: '2.5rem', fontWeight: '700', color: '#0284c7', marginBottom: '3rem', textAlign: 'center', fontFamily: 'serif'}}>Schedule Overview</h2>
          <div className="scroll-stagger-children" style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem', justifyItems: 'center'}}>
            <div className="hover-lift" style={{backgroundColor: '#ffffff', padding: '2rem', borderRadius: '1rem', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)', textAlign: 'center', width: '100%', maxWidth: '18rem', transition: 'all 0.3s ease'}}>
              <Clock style={{width: '2rem', height: '2rem', color: '#0ea5e9', margin: '0 auto 1rem auto', display: 'block'}} />
              <h3 style={{fontSize: '1.125rem', fontWeight: '600', marginBottom: '0.5rem', color: '#1e293b'}}>Visiting Hours</h3>
              <p style={{color: '#64748b', marginBottom: '1rem'}}>Daily: 6:00 AM - 8:00 PM</p>
              <div style={{color: '#0ea5e9', fontWeight: '500', backgroundColor: 'transparent', border: 'none', cursor: 'pointer'}}>Open daily for prayer</div>
            </div>
            
            <div className="hover-lift" style={{backgroundColor: '#ffffff', padding: '2rem', borderRadius: '1rem', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)', textAlign: 'center', width: '100%', maxWidth: '18rem', transition: 'all 0.3s ease'}}>
              <Heart style={{width: '2rem', height: '2rem', color: '#0ea5e9', margin: '0 auto 1rem auto', display: 'block'}} />
              <h3 style={{fontSize: '1.125rem', fontWeight: '600', marginBottom: '0.5rem', color: '#1e293b'}}>Special Devotions</h3>
              <p style={{color: '#64748b', marginBottom: '1rem'}}>Various times throughout the week</p>
              <div style={{color: '#0ea5e9', fontWeight: '500', backgroundColor: 'transparent', border: 'none', cursor: 'pointer'}}>See details below</div>
            </div>
            
            <div className="hover-lift" style={{backgroundColor: '#ffffff', padding: '2rem', borderRadius: '1rem', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)', textAlign: 'center', width: '100%', maxWidth: '18rem', transition: 'all 0.3s ease'}}>
              <Users style={{width: '2rem', height: '2rem', color: '#0ea5e9', margin: '0 auto 1rem auto', display: 'block'}} />
              <h3 style={{fontSize: '1.125rem', fontWeight: '600', marginBottom: '0.5rem', color: '#1e293b'}}>Mass Schedule</h3>
              <p style={{color: '#64748b', marginBottom: '1rem', fontSize: '0.875rem', lineHeight: '1.4'}}>
                Sunday: 8:00 AM - 10:00 AM<br/>
                Evening: 6:00 PM - 7:30 PM<br/>
                Weekdays: 6:00 AM
              </p>
              <div style={{color: '#0ea5e9', fontWeight: '500', backgroundColor: 'transparent', border: 'none', cursor: 'pointer'}}>Full schedule below</div>
            </div>
            
            <div className="hover-lift" style={{backgroundColor: '#ffffff', padding: '2rem', borderRadius: '1rem', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)', textAlign: 'center', width: '100%', maxWidth: '18rem', transition: 'all 0.3s ease'}}>
              <Book style={{width: '2rem', height: '2rem', color: '#0ea5e9', margin: '0 auto 1rem auto', display: 'block'}} />
              <h3 style={{fontSize: '1.125rem', fontWeight: '600', marginBottom: '0.5rem', color: '#1e293b'}}>Eucharistic Adoration</h3>
              <p style={{color: '#64748b', marginBottom: '1rem'}}>Special hours for prayer and reflection</p>
              <div style={{color: '#0ea5e9', fontWeight: '500', backgroundColor: 'transparent', border: 'none', cursor: 'pointer'}}>View times below</div>
            </div>
          </div>
        </section>

        {/* Detailed Mass Schedule */}
        <section 
          className="scroll-fade-in"
          style={{marginBottom: '5rem', backgroundColor: '#ffffff', padding: '3rem 2rem', borderRadius: '1rem', boxShadow: '0 10px 25px -3px rgba(0, 0, 0, 0.1)', width: '100%'}}
        >
          <h2 className="scroll-slide-up" style={{fontSize: '2.5rem', fontWeight: '700', color: '#0284c7', marginBottom: '3rem', textAlign: 'center', fontFamily: 'serif'}}>Mass Schedule</h2>
          <div className="scroll-stagger-children" style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem'}}>
            
            {/* Sunday Schedule */}
            <div className="hover-lift" style={{backgroundColor: '#f0f9ff', padding: '2rem', borderRadius: '1rem', border: '2px solid #0ea5e9', transition: 'all 0.3s ease'}}>
              <div style={{display: 'flex', alignItems: 'center', marginBottom: '1.5rem'}}>
                <Star style={{width: '2rem', height: '2rem', color: '#0284c7', marginRight: '1rem'}} />
                <h3 style={{fontSize: '1.5rem', fontWeight: '700', color: '#0284c7', margin: 0}}>Sunday</h3>
              </div>
              <div style={{display: 'flex', flexDirection: 'column', gap: '1rem'}}>
                <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.75rem', backgroundColor: '#ffffff', borderRadius: '0.5rem', boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'}}>
                  <span style={{fontWeight: '600', color: '#1e293b'}}>Morning Mass</span>
                  <span style={{color: '#0284c7', fontWeight: '500'}}>8:00 AM - 10:00 AM</span>
                </div>
                <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.75rem', backgroundColor: '#ffffff', borderRadius: '0.5rem', boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'}}>
                  <span style={{fontWeight: '600', color: '#1e293b'}}>Evening Mass</span>
                  <span style={{color: '#0284c7', fontWeight: '500'}}>6:00 PM - 7:30 PM</span>
                </div>
              </div>
            </div>

            {/* Weekday Schedule */}
            <div className="hover-lift" style={{backgroundColor: '#e0f2fe', padding: '2rem', borderRadius: '1rem', border: '1px solid #0ea5e9', transition: 'all 0.3s ease'}}>
              <div style={{display: 'flex', alignItems: 'center', marginBottom: '1.5rem'}}>
                <Calendar style={{width: '2rem', height: '2rem', color: '#0284c7', marginRight: '1rem'}} />
                <h3 style={{fontSize: '1.5rem', fontWeight: '700', color: '#0284c7', margin: 0}}>Weekdays</h3>
              </div>
              <div style={{display: 'flex', flexDirection: 'column', gap: '1rem'}}>
                <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.75rem', backgroundColor: '#ffffff', borderRadius: '0.5rem', boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'}}>
                  <span style={{fontWeight: '600', color: '#1e293b'}}>Monday - Friday</span>
                  <span style={{color: '#0284c7', fontWeight: '500'}}>6:00 AM</span>
                </div>
                <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.75rem', backgroundColor: '#ffffff', borderRadius: '0.5rem', boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'}}>
                  <span style={{fontWeight: '600', color: '#1e293b'}}>Saturday</span>
                  <span style={{color: '#0284c7', fontWeight: '500'}}>6:00 AM</span>
                </div>
              </div>
            </div>

            {/* Special Occasions */}
            <div className="hover-lift" style={{backgroundColor: '#fef3c7', padding: '2rem', borderRadius: '1rem', border: '1px solid #f59e0b', transition: 'all 0.3s ease'}}>
              <div style={{display: 'flex', alignItems: 'center', marginBottom: '1.5rem'}}>
                <Bell style={{width: '2rem', height: '2rem', color: '#d97706', marginRight: '1rem'}} />
                <h3 style={{fontSize: '1.5rem', fontWeight: '700', color: '#d97706', margin: 0}}>Special Occasions</h3>
              </div>
              <div style={{display: 'flex', flexDirection: 'column', gap: '1rem'}}>
                <div style={{padding: '0.75rem', backgroundColor: '#ffffff', borderRadius: '0.5rem', boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'}}>
                  <div style={{fontWeight: '600', color: '#1e293b', marginBottom: '0.25rem'}}>Feast Days & Holy Days</div>
                  <div style={{color: '#d97706', fontSize: '0.875rem'}}>Additional Masses as announced</div>
                </div>
                <div style={{padding: '0.75rem', backgroundColor: '#ffffff', borderRadius: '0.5rem', boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'}}>
                  <div style={{fontWeight: '600', color: '#1e293b', marginBottom: '0.25rem'}}>Christmas & Easter</div>
                  <div style={{color: '#d97706', fontSize: '0.875rem'}}>Special schedule published</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Special Services & Devotions */}
        <section 
          className="scroll-fade-in"
          style={{marginBottom: '5rem', backgroundColor: '#ffffff', padding: '3rem 2rem', borderRadius: '1rem', boxShadow: '0 10px 25px -3px rgba(0, 0, 0, 0.1)', width: '100%'}}
        >
          <h2 className="scroll-slide-up" style={{fontSize: '2.5rem', fontWeight: '700', color: '#0284c7', marginBottom: '3rem', textAlign: 'center', fontFamily: 'serif'}}>Special Services & Devotions</h2>
          <div className="scroll-stagger-children" style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem'}}>
            
            <div className="hover-lift" style={{backgroundColor: '#f0f9ff', padding: '2rem', borderRadius: '1rem', border: '1px solid #0ea5e9', transition: 'all 0.3s ease'}}>
              <Heart style={{width: '3rem', height: '3rem', color: '#0ea5e9', margin: '0 auto 1rem auto', display: 'block'}} />
              <h3 style={{fontSize: '1.25rem', fontWeight: '600', marginBottom: '1rem', color: '#0284c7', textAlign: 'center'}}>Eucharistic Adoration</h3>
              <div style={{textAlign: 'center', marginBottom: '1rem'}}>
                <div style={{color: '#64748b', marginBottom: '0.5rem'}}>Every Friday</div>
                <div style={{color: '#0284c7', fontWeight: '600', fontSize: '1.125rem'}}>7:00 PM - 8:00 PM</div>
              </div>
              <p style={{color: '#64748b', textAlign: 'center', fontSize: '0.875rem'}}>
                Join us for an hour of prayer and reflection before the Blessed Sacrament
              </p>
            </div>

            <div className="hover-lift" style={{backgroundColor: '#f0f9ff', padding: '2rem', borderRadius: '1rem', border: '1px solid #0ea5e9', transition: 'all 0.3s ease'}}>
              <Book style={{width: '3rem', height: '3rem', color: '#0ea5e9', margin: '0 auto 1rem auto', display: 'block'}} />
              <h3 style={{fontSize: '1.25rem', fontWeight: '600', marginBottom: '1rem', color: '#0284c7', textAlign: 'center'}}>Rosary Prayer</h3>
              <div style={{textAlign: 'center', marginBottom: '1rem'}}>
                <div style={{color: '#64748b', marginBottom: '0.5rem'}}>Daily</div>
                <div style={{color: '#0284c7', fontWeight: '600', fontSize: '1.125rem'}}>5:30 PM</div>
              </div>
              <p style={{color: '#64748b', textAlign: 'center', fontSize: '0.875rem'}}>
                Daily recitation of the Holy Rosary before evening activities
              </p>
            </div>

         

            <div className="hover-lift" style={{backgroundColor: '#f0f9ff', padding: '2rem', borderRadius: '1rem', border: '1px solid #0ea5e9', transition: 'all 0.3s ease'}}>
              <Users style={{width: '3rem', height: '3rem', color: '#0ea5e9', margin: '0 auto 1rem auto', display: 'block'}} />
              <h3 style={{fontSize: '1.25rem', fontWeight: '600', marginBottom: '1rem', color: '#0284c7', textAlign: 'center'}}>Novena Prayers</h3>
              <div style={{textAlign: 'center', marginBottom: '1rem'}}>
                <div style={{color: '#64748b', marginBottom: '0.5rem'}}>Tuesdays</div>
                <div style={{color: '#0284c7', fontWeight: '600', fontSize: '1.125rem'}}>7:00 PM</div>
              </div>
              <p style={{color: '#64748b', textAlign: 'center', fontSize: '0.875rem'}}>
                Special devotional prayers to Saint Mary Magdalene
              </p>
            </div>

            <div className="hover-lift" style={{backgroundColor: '#f0f9ff', padding: '2rem', borderRadius: '1rem', border: '1px solid #0ea5e9', transition: 'all 0.3s ease'}}>
              <Bell style={{width: '3rem', height: '3rem', color: '#0ea5e9', margin: '0 auto 1rem auto', display: 'block'}} />
              <h3 style={{fontSize: '1.25rem', fontWeight: '600', marginBottom: '1rem', color: '#0284c7', textAlign: 'center'}}>Confession</h3>
              <div style={{textAlign: 'center', marginBottom: '1rem'}}>
                <div style={{color: '#64748b', marginBottom: '0.5rem'}}>Daily Available</div>
                <div style={{color: '#0284c7', fontWeight: '600', fontSize: '1.125rem'}}>5+ Hours Daily</div>
              </div>
              <p style={{color: '#64748b', textAlign: 'center', fontSize: '0.875rem'}}>
                Sacrament of Reconciliation available throughout the day
              </p>
            </div>

            <div className="hover-lift" style={{backgroundColor: '#f0f9ff', padding: '2rem', borderRadius: '1rem', border: '1px solid #0ea5e9', transition: 'all 0.3s ease'}}>
              <Star style={{width: '3rem', height: '3rem', color: '#0ea5e9', margin: '0 auto 1rem auto', display: 'block'}} />
              <h3 style={{fontSize: '1.25rem', fontWeight: '600', marginBottom: '1rem', color: '#0284c7', textAlign: 'center'}}>First Friday Devotion</h3>
              <div style={{textAlign: 'center', marginBottom: '1rem'}}>
                <div style={{color: '#64748b', marginBottom: '0.5rem'}}>First Friday of Month</div>
                <div style={{color: '#0284c7', fontWeight: '600', fontSize: '1.125rem'}}>After 6:00 AM Mass</div>
              </div>
              <p style={{color: '#64748b', textAlign: 'center', fontSize: '0.875rem'}}>
                Special devotion to the Sacred Heart of Jesus
              </p>
            </div>
          </div>
        </section>

        {/* Important Notes */}
        <section 
          className="scroll-fade-in"
          style={{backgroundColor: '#fef3c7', borderRadius: '1rem', padding: '2rem', border: '1px solid #f59e0b', width: '100%'}}
        >
          <h3 style={{fontSize: '1.5rem', fontWeight: '700', color: '#d97706', marginBottom: '1rem', textAlign: 'center'}}>Important Notes</h3>
          <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem'}}>
            <div style={{backgroundColor: '#ffffff', padding: '1.5rem', borderRadius: '0.75rem', boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'}}>
              <h4 style={{fontWeight: '600', color: '#d97706', marginBottom: '0.5rem'}}>⏰ Arrival Time</h4>
              <p style={{color: '#92400e', fontSize: '0.875rem', margin: 0}}>Please arrive 10-15 minutes before Mass begins</p>
            </div>
            <div style={{backgroundColor: '#ffffff', padding: '1.5rem', borderRadius: '0.75rem', boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'}}>
              <h4 style={{fontWeight: '600', color: '#d97706', marginBottom: '0.5rem'}}>📱 Updates</h4>
              <p style={{color: '#92400e', fontSize: '0.875rem', margin: 0}}>Schedule changes are announced during services and online</p>
            </div>
            <div style={{backgroundColor: '#ffffff', padding: '1.5rem', borderRadius: '0.75rem', boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'}}>
              <h4 style={{fontWeight: '600', color: '#d97706', marginBottom: '0.5rem'}}>🎄 Special Seasons</h4>
              <p style={{color: '#92400e', fontSize: '0.875rem', margin: 0}}>Christmas and Easter may have modified schedules</p>
            </div>
          </div>
        </section>

        </div>
      </div>

      {/* Add custom styles for animations */}
      <style jsx>{`
        /* Scroll Animation Base Styles */
        .scroll-fade-in,
        .scroll-slide-up,
        .scroll-slide-left,
        .scroll-slide-right,
        .scroll-scale-in {
          opacity: 0;
          transition: all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }

        .scroll-fade-in {
          transform: translateY(30px);
        }

        .scroll-slide-up {
          transform: translateY(50px);
        }

        .scroll-slide-left {
          transform: translateX(-50px);
        }

        .scroll-slide-right {
          transform: translateX(50px);
        }

        .scroll-scale-in {
          transform: scale(0.9);
        }

        /* Animated state */
        .scroll-fade-in.animate,
        .scroll-slide-up.animate,
        .scroll-slide-left.animate,
        .scroll-slide-right.animate,
        .scroll-scale-in.animate {
          opacity: 1;
          transform: translateY(0) translateX(0) scale(1);
        }

        /* Stagger children animation */
        .scroll-stagger-children.animate > *:nth-child(1) { animation-delay: 0.1s; }
        .scroll-stagger-children.animate > *:nth-child(2) { animation-delay: 0.2s; }
        .scroll-stagger-children.animate > *:nth-child(3) { animation-delay: 0.3s; }
        .scroll-stagger-children.animate > *:nth-child(4) { animation-delay: 0.4s; }
        .scroll-stagger-children.animate > *:nth-child(5) { animation-delay: 0.5s; }
        .scroll-stagger-children.animate > *:nth-child(6) { animation-delay: 0.6s; }

        .scroll-stagger-children.animate > * {
          animation: staggerFadeIn 0.6s ease forwards;
          opacity: 0;
          transform: translateY(20px);
        }

        @keyframes staggerFadeIn {
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        /* Hover effects */
        .hover-lift:hover {
          transform: translateY(-4px);
          box-shadow: 0 20px 40px -5px rgba(0, 0, 0, 0.15);
        }

        /* Smooth scroll for sections */
        .smooth-scroll-section {
          scroll-margin-top: 80px;
        }
      `}</style>
      
      {/* Add Schedule Modal */}
      {showAddForm && (
        <div style={{position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 50}}>
          <div style={{backgroundColor: 'white', padding: '2rem', borderRadius: '0.5rem', width: '90%', maxWidth: '500px', maxHeight: '80vh', overflowY: 'auto'}}>
            <h3 style={{fontSize: '1.25rem', fontWeight: '600', marginBottom: '1rem', color: '#1f2937'}}>Add Schedule Item</h3>
            <form onSubmit={(e) => {
              e.preventDefault();
              const newItem = {
                id: Date.now(),
                ...formData
              };
              setScheduleItems([newItem, ...scheduleItems]);
              setShowAddForm(false);
              setFormData({ service_name: '', time: '', day: '', description: '', type: 'Mass' });
              alert('Schedule item added successfully!');
            }}>
              <div style={{marginBottom: '1rem'}}>
                <input
                  type="text"
                  placeholder="Service Name"
                  value={formData.service_name}
                  onChange={(e) => setFormData({...formData, service_name: e.target.value})}
                  required
                  style={{width: '100%', padding: '0.5rem', border: '1px solid #d1d5db', borderRadius: '0.375rem', color: '#1f2937'}}
                />
              </div>
              <div style={{marginBottom: '1rem'}}>
                <select
                  value={formData.type}
                  onChange={(e) => setFormData({...formData, type: e.target.value})}
                  style={{width: '100%', padding: '0.5rem', border: '1px solid #d1d5db', borderRadius: '0.375rem', color: '#1f2937'}}
                >
                  <option value="Mass">Mass</option>
                  <option value="Prayer">Prayer</option>
                  <option value="Devotion">Devotion</option>
                  <option value="Service">Service</option>
                </select>
              </div>
              <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem'}}>
                <input
                  type="text"
                  placeholder="Day (e.g., Sunday, Daily)"
                  value={formData.day}
                  onChange={(e) => setFormData({...formData, day: e.target.value})}
                  required
                  style={{padding: '0.5rem', border: '1px solid #d1d5db', borderRadius: '0.375rem', color: '#1f2937'}}
                />
                <input
                  type="time"
                  value={formData.time}
                  onChange={(e) => setFormData({...formData, time: e.target.value})}
                  required
                  style={{padding: '0.5rem', border: '1px solid #d1d5db', borderRadius: '0.375rem', color: '#1f2937'}}
                />
              </div>
              <div style={{marginBottom: '1rem'}}>
                <textarea
                  placeholder="Description (optional)"
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  rows="3"
                  style={{width: '100%', padding: '0.5rem', border: '1px solid #d1d5db', borderRadius: '0.375rem', color: '#1f2937'}}
                />
              </div>
              <div style={{display: 'flex', gap: '1rem', justifyContent: 'flex-end'}}>
                <button
                  type="button"
                  onClick={() => {setShowAddForm(false); setFormData({ service_name: '', time: '', day: '', description: '', type: 'Mass' });}}
                  style={{padding: '0.5rem 1rem', backgroundColor: '#6b7280', color: 'white', border: 'none', borderRadius: '0.375rem', cursor: 'pointer'}}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={async () => {
                    if (formData.service_name && formData.time && formData.day) {
                      try {
                        const response = await fetch('http://localhost:8000/api/schedule/', {
                          method: 'POST',
                          headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Token ${localStorage.getItem('adminToken')}`,
                          },
                          body: JSON.stringify(formData)
                        });
                        
                        if (response.ok) {
                          const newItem = {
                            id: Date.now(),
                            ...formData
                          };
                          setScheduleItems([newItem, ...scheduleItems]);
                          setShowAddForm(false);
                          setFormData({ service_name: '', time: '', day: '', description: '', type: 'Mass' });
                          alert('Schedule item added successfully!');
                        } else {
                          alert('Error adding schedule item. Please try again.');
                        }
                      } catch (error) {
                        console.error('Error:', error);
                        alert('Error adding schedule item. Please try again.');
                      }
                    }
                  }}
                  style={{padding: '0.5rem 1rem', backgroundColor: '#2563eb', color: 'white', border: 'none', borderRadius: '0.375rem', cursor: 'pointer'}}
                >
                  Add Schedule
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Schedule;