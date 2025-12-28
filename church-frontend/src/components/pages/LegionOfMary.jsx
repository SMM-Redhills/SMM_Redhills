import React, { useEffect, useRef, useState } from 'react';
import { churchAPI } from '../../services/api';
import { Star, Shield, Users, Heart, ArrowRight } from 'lucide-react';

const LegionOfMary = ({ onNavigate }) => {
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
        const response = await churchAPI.getGroup('legion');
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
          background: 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)',
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
                   <Star size={40} color="white" fill="white" />
                </div>
            )}
          </div>
          <h1 className="scroll-slide-up" style={{ fontSize: '3rem', fontWeight: '800', marginBottom: '1rem', textShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
            Legion of Mary
          </h1>
          <p className="scroll-slide-up" style={{ fontSize: '1.25rem', opacity: 0.9, maxWidth: '600px', margin: '0 auto' }}>
            Mariyin Senai — To Jesus through Mary
          </p>
        </div>
      </section>

      {/* Content Container */}
      <div style={{ maxWidth: '1000px', width: '90%', margin: '-5rem auto 4rem', position: 'relative', zIndex: 20 }}>
        
        {/* Intro Card */}
        <div className="scroll-slide-up" style={{ backgroundColor: 'white', borderRadius: '1.5rem', padding: '3rem', boxShadow: '0 20px 40px -10px rgba(0,0,0,0.1)', marginBottom: '2rem' }}>
          <h2 style={{ fontSize: '1.75rem', fontWeight: '700', color: '#1e3a8a', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <Star className="text-blue-600" /> About The Legion
          </h2>
          <p style={{ color: '#475569', lineHeight: 1.8, fontSize: '1.1rem' }}>
            {groupData?.description || `The Legion of Mary is a lay apostolic association of Catholics who, with the sanction of the Church 
            and under the powerful leadership of Mary Immaculate, serve the Church and their neighbor. 
            We participate in weekly prayer meetings, family visits for rosary recitation, and 
            evangelization efforts to bring souls closer to Jesus through His Blessed Mother.`}
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
                                    color: '#1e40af', 
                                    border: '1px solid #1e40af', 
                                    borderRadius: '0.5rem',
                                    fontWeight: '600',
                                    cursor: 'pointer',
                                    transition: 'all 0.2s'
                                }}
                                onMouseEnter={(e) => { e.target.style.backgroundColor = '#1e40af'; e.target.style.color = 'white'; }}
                                onMouseLeave={(e) => { e.target.style.backgroundColor = 'transparent'; e.target.style.color = '#1e40af'; }}
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
           
           <div className="scroll-slide-up" style={{ backgroundColor: 'white', padding: '2rem', borderRadius: '1rem', borderTop: '4px solid #2563eb', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)' }}>
              <div style={{ backgroundColor: '#eff6ff', width: '3rem', height: '3rem', borderRadius: '0.75rem', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem' }}>
                <Users size={24} color="#2563eb" />
              </div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: '700', color: '#1e293b', marginBottom: '0.5rem' }}>Weekly Meetings</h3>
              <p style={{ color: '#64748b', fontSize: '0.95rem', lineHeight: 1.6 }}>Coming together for prayer, planning apostolic work, and spiritual discussion.</p>
           </div>

           <div className="scroll-slide-up" style={{ transitionDelay: '100ms', backgroundColor: 'white', padding: '2rem', borderRadius: '1rem', borderTop: '4px solid #3b82f6', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)' }}>
              <div style={{ backgroundColor: '#dbeafe', width: '3rem', height: '3rem', borderRadius: '0.75rem', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem' }}>
                <Heart size={24} color="#2563eb" />
              </div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: '700', color: '#1e293b', marginBottom: '0.5rem' }}>Family Visits</h3>
              <p style={{ color: '#64748b', fontSize: '0.95rem', lineHeight: 1.6 }}>Visiting homes to pray the Rosary, consecrate families to Mary, and offer spiritual support.</p>
           </div>

           <div className="scroll-slide-up" style={{ transitionDelay: '200ms', backgroundColor: 'white', padding: '2rem', borderRadius: '1rem', borderTop: '4px solid #60a5fa', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)' }}>
              <div style={{ backgroundColor: '#bfdbfe', width: '3rem', height: '3rem', borderRadius: '0.75rem', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem' }}>
                <Shield size={24} color="#1d4ed8" />
              </div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: '700', color: '#1e293b', marginBottom: '0.5rem' }}>Evangelization</h3>
              <p style={{ color: '#64748b', fontSize: '0.95rem', lineHeight: 1.6 }}>Spreading the Gospel message and inviting others to experience the Catholic faith.</p>
           </div>
        </div>

        {/* CTA */}
        <div className="scroll-slide-up" style={{ textAlign: 'center', backgroundColor: '#eff6ff', padding: '3rem', borderRadius: '1.5rem', border: '1px dashed #bfdbfe' }}>
{/* <h3 style={{ fontSize: '1.5rem', fontWeight: '700', color: '#1eff00', marginBottom: '1rem', color: '#1e40af' }}>Join Our Legion</h3> */}
           <h3 style={{ fontSize: '1.5rem', fontWeight: '700', marginBottom: '1rem', color: '#1e40af' }}>Join Our Legion</h3>
           <p style={{ color: '#1e3a8a', marginBottom: '2rem', maxWidth: '500px', margin: '0 auto 2rem' }}>
             Become an active member in serving the Blessed Mother. All Catholics are welcome to join.
           </p>
           <button 
             onClick={() => onNavigate('contact')}
             style={{ 
               backgroundColor: '#2563eb', color: 'white', border: 'none', padding: '1rem 2.5rem', 
               borderRadius: '3rem', fontSize: '1.1rem', fontWeight: '600', cursor: 'pointer',
               display: 'inline-flex', alignItems: 'center', gap: '0.5rem', boxShadow: '0 4px 12px rgba(37, 99, 235, 0.3)',
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

export default LegionOfMary;
