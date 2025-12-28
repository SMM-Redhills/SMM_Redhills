import React, { useEffect, useRef, useState } from 'react';
import { churchAPI } from '../../services/api';
import { HandHeart, Gift, Home, UserPlus, ArrowRight } from 'lucide-react';

const VincentDePaul = ({ onNavigate }) => {
  const observerRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate');
          }
        });
      },
      { threshold: 0.1 }
    );

    const animatedElements = document.querySelectorAll('.scroll-fade-in, .scroll-slide-up');
    animatedElements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const [groupData, setGroupData] = useState(null);
  const [selectedActivity, setSelectedActivity] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await churchAPI.getGroup('vincent');
        setGroupData(response.data);
      } catch (error) {
        console.error("Failed to fetch group data", error);
      }
    };
    fetchData();
  }, []);

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f9fafb', fontFamily: 'sans-serif' }}>
      {/* Hero Section */}
      <section 
        className="scroll-fade-in"
        style={{
          background: 'linear-gradient(135deg, #059669 0%, #10b981 100%)',
          padding: '6rem 1rem 8rem',
          textAlign: 'center',
          color: 'white',
          position: 'relative',
          borderBottomLeftRadius: '2rem',
          borderBottomRightRadius: '2rem',
          overflow: 'hidden'
        }}
      >
        <div style={{ position: 'absolute', inset: 0, opacity: 0.1, backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '32px 32px' }}></div>
        
        <div style={{ position: 'relative', zIndex: 10, maxWidth: '800px', margin: '0 auto' }}>
          <div style={{ marginBottom: '1.5rem' }}>
            {groupData?.logo ? (
                <img src={groupData.logo} alt="Logo" style={{ width: '128px', height: '128px', objectFit: 'contain', filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.2))' }} />
            ) : (
                <div style={{ 
                  display: 'inline-flex', padding: '1rem', 
                  background: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(8px)', 
                  borderRadius: '50%', boxShadow: '0 8px 32px rgba(0,0,0,0.1)'
                }}>
                   <HandHeart size={40} color="white" />
                </div>
            )}
          </div>
          <h1 className="scroll-slide-up" style={{ fontSize: '3rem', fontWeight: '800', marginBottom: '1rem', textShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
            Vincent de Paul Society
          </h1>
          <p className="scroll-slide-up" style={{ fontSize: '1.25rem', opacity: 0.9, maxWidth: '600px', margin: '0 auto' }}>
            Serving the poor, the sick, and the marginalized with love.
          </p>
        </div>
      </section>

      {/* Content Container */}
      <div style={{ maxWidth: '1000px', width: '90%', margin: '-5rem auto 4rem', position: 'relative', zIndex: 20 }}>
        
        {/* Intro Card */}
        <div className="scroll-slide-up" style={{ backgroundColor: 'white', borderRadius: '1.5rem', padding: '3rem', boxShadow: '0 20px 40px -10px rgba(0,0,0,0.1)', marginBottom: '2rem' }}>
          <h2 style={{ fontSize: '1.75rem', fontWeight: '700', color: '#064e3b', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <HandHeart color="#059669" /> Our Mission
          </h2>
          <p style={{ color: '#4b5563', lineHeight: 1.8, fontSize: '1.1rem' }}>
            {groupData?.description || `Following the footsteps of St. Vincent de Paul, we are the charitable arm of our parish. 
            Members dedicate themselves to identifying and serving those in need within our community. 
            Through home visits, financial aid, and provision of essential supplies, we strive to see and serve 
            Christ in the suffering, ensuring no one is left behind.`}
          </p>
        </div>

        {/* What We Have Done Section */}
        {groupData?.activities && groupData.activities.length > 0 && (
             <div style={{ backgroundColor: 'white', borderRadius: '1.5rem', padding: '3rem', boxShadow: '0 20px 40px -10px rgba(0,0,0,0.1)', marginBottom: '3rem' }}>
              <h2 style={{ fontSize: '1.75rem', fontWeight: '700', color: '#0f172a', marginBottom: '1.5rem'}}>
                 What We Have Done
              </h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                  {groupData.activities.map(activity => (
                      <div key={activity.id} style={{ display: 'flex', flexWrap: 'wrap', backgroundColor: 'white', border: '1px solid #e2e8f0', borderRadius: '1rem', overflow: 'hidden', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)' }}>
                          <div style={{ flex: '1 1 300px', minHeight: '250px' }}>
                              {activity.media_url ? (
                                 <img src={activity.media_url} alt={activity.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                              ) : (
                                  <div style={{ width: '100%', height: '100%', backgroundColor: '#f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#cbd5e1' }}>
                                      No Image
                                  </div>
                              )}
                          </div>
                          <div style={{ flex: '2 1 300px', padding: '2rem', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                             <h3 style={{ fontSize: '1.5rem', fontWeight: '700', marginBottom: '1rem', color: '#1e293b' }}>{activity.title}</h3>
                             <p style={{ color: '#475569', fontSize: '1.1rem', lineHeight: '1.75', marginBottom: '1.5rem', display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                                {activity.description}
                             </p>
                             <button 
                                style={{ 
                                    alignSelf: 'flex-start',
                                    padding: '0.75rem 1.5rem', 
                                    backgroundColor: 'transparent', 
                                    color: '#059669', 
                                    border: '1px solid #059669', 
                                    borderRadius: '0.5rem',
                                    fontWeight: '600',
                                    cursor: 'pointer',
                                    transition: 'all 0.2s'
                                }}
                                onMouseEnter={(e) => { e.target.style.backgroundColor = '#059669'; e.target.style.color = 'white'; }}
                                onMouseLeave={(e) => { e.target.style.backgroundColor = 'transparent'; e.target.style.color = '#059669'; }}
                                onClick={() => setSelectedActivity(activity)}
                             >
                                Read More
                             </button>
                          </div>
                      </div>
                  ))}
              </div>
            </div>
        )}

        {/* Feature Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem', marginBottom: '3rem' }}>
           
           <div className="scroll-slide-up" style={{ backgroundColor: 'white', padding: '2rem', borderRadius: '1rem', borderTop: '4px solid #059669', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)' }}>
              <div style={{ backgroundColor: '#ecfdf5', width: '3rem', height: '3rem', borderRadius: '0.75rem', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem' }}>
                <Home size={24} color="#059669" />
              </div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: '700', color: '#1e293b', marginBottom: '0.5rem' }}>Home Visits</h3>
              <p style={{ color: '#64748b', fontSize: '0.95rem', lineHeight: 1.6 }}>Visiting families in distress to offer comfort, prayer, and material support in their own homes.</p>
           </div>

           <div className="scroll-slide-up" style={{ transitionDelay: '100ms', backgroundColor: 'white', padding: '2rem', borderRadius: '1rem', borderTop: '4px solid #10b981', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)' }}>
              <div style={{ backgroundColor: '#d1fae5', width: '3rem', height: '3rem', borderRadius: '0.75rem', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem' }}>
                <Gift size={24} color="#059669" />
              </div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: '700', color: '#1e293b', marginBottom: '0.5rem' }}>Essential Aid</h3>
              <p style={{ color: '#64748b', fontSize: '0.95rem', lineHeight: 1.6 }}>Providing food, clothing, education support, and financial assistance to the less fortunate.</p>
           </div>

           <div className="scroll-slide-up" style={{ transitionDelay: '200ms', backgroundColor: 'white', padding: '2rem', borderRadius: '1rem', borderTop: '4px solid #34d399', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)' }}>
              <div style={{ backgroundColor: '#a7f3d0', width: '3rem', height: '3rem', borderRadius: '0.75rem', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem' }}>
                <UserPlus size={24} color="#047857" />
              </div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: '700', color: '#1e293b', marginBottom: '0.5rem' }}>Join Us</h3>
              <p style={{ color: '#64748b', fontSize: '0.95rem', lineHeight: 1.6 }}>We welcome new members to join us in this act of love and service to humanity.</p>
           </div>
        </div>

        {/* CTA */}
        <div className="scroll-slide-up" style={{ textAlign: 'center', backgroundColor: '#f0fdf4', padding: '3rem', borderRadius: '1.5rem', border: '1px dashed #86efac' }}>
           <h3 style={{ fontSize: '1.5rem', fontWeight: '700', color: '#166534', marginBottom: '1rem' }}>Want to Help?</h3>
           <p style={{ color: '#14532d', marginBottom: '2rem', maxWidth: '500px', margin: '0 auto 2rem' }}>
             Your contribution can change lives. Join us or donate to support our varied charitable activities.
           </p>
           <button 
             onClick={() => onNavigate('contact')}
             style={{ 
               backgroundColor: '#059669', color: 'white', border: 'none', padding: '1rem 2.5rem', 
               borderRadius: '3rem', fontSize: '1.1rem', fontWeight: '600', cursor: 'pointer',
               display: 'inline-flex', alignItems: 'center', gap: '0.5rem', boxShadow: '0 4px 12px rgba(5, 150, 105, 0.3)',
               transition: 'transform 0.2s'
             }}
             onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
             onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}
           >
             Contact Us <ArrowRight size={20} />
           </button>
        </div>

      </div>
      {/* Activity Details Modal */}
      {selectedActivity && (
        <div 
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(0,0,0,0.6)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 9999,
            padding: '1rem',
            backdropFilter: 'blur(4px)'
          }}
          onClick={() => setSelectedActivity(null)}
        >
          <div 
            style={{
              backgroundColor: 'white',
              borderRadius: '1.5rem',
              width: '100%',
              maxWidth: '600px',
              maxHeight: '90vh',
              overflowY: 'auto',
              position: 'relative',
              boxShadow: '0 25px 50px -12px rgba(0,0,0,0.25)'
            }}
            onClick={e => e.stopPropagation()}
          >
            <div style={{ position: 'relative' }}>
              {selectedActivity.media_url && (
                <img 
                  src={selectedActivity.media_url} 
                  alt={selectedActivity.title} 
                  style={{ width: '100%', height: '300px', objectFit: 'cover' }} 
                />
              )}
              <button 
                onClick={() => setSelectedActivity(null)}
                style={{
                  position: 'absolute',
                  top: '1rem',
                  right: '1rem',
                  backgroundColor: 'white',
                  borderRadius: '50%',
                  width: '2.5rem',
                  height: '2.5rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  border: 'none',
                  cursor: 'pointer',
                  boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)',
                  zIndex: 10,
                  fontSize: '1.25rem',
                  color: '#64748b'
                }}
              >
                ✕
              </button>
            </div>
            
            <div style={{ padding: '2rem' }}>
              <h3 style={{ fontSize: '1.75rem', fontWeight: '700', marginBottom: '1rem', color: '#1e293b' }}>
                {selectedActivity.title}
              </h3>
              <p style={{ color: '#475569', lineHeight: '1.8', fontSize: '1.05rem', whiteSpace: 'pre-wrap' }}>
                {selectedActivity.description}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VincentDePaul;
