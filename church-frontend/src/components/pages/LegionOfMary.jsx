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
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '2rem' }}>
                  {groupData.activities.map(activity => (
                      <div key={activity.id} style={{ border: '1px solid #e2e8f0', borderRadius: '1rem', overflow: 'hidden' }}>
                          {activity.media_url && (
                             <img src={activity.media_url} alt={activity.title} style={{ width: '100%', height: '180px', objectFit: 'cover' }} />
                          )}
                          <div style={{ padding: '1.5rem' }}>
                             <h3 style={{ fontSize: '1.2rem', fontWeight: '600', marginBottom: '0.5rem', color: '#334155' }}>{activity.title}</h3>
                             <p style={{ color: '#475569', fontSize: '0.95rem' }}>{activity.description}</p>
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
    </div>
  );
};

export default LegionOfMary;
