import React, { useEffect, useRef, useState } from 'react';
import { churchAPI } from '../../services/api';
import { Sparkles, Calendar, Users, Heart, Music, ArrowRight } from 'lucide-react';

const YouthGroup = ({ onNavigate }) => {
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
        const response = await churchAPI.getGroup('youth');
        console.log("Youth Group Data:", response.data);
        if (response.data && response.data.results && response.data.results.length > 0) {
             setGroupData(response.data.results[0]); 
        } else if (response.data && !Array.isArray(response.data)) {
             setGroupData(response.data);
        }
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
          background: 'linear-gradient(135deg, #0ea5e9 0%, #2563eb 100%)',
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
                   <Sparkles size={40} color="white" />
                </div>
            )}
          </div>
          <h1 className="scroll-slide-up" style={{ fontSize: '3rem', fontWeight: '800', marginBottom: '1rem', textShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
            Youth Group
          </h1>
          <p className="scroll-slide-up" style={{ fontSize: '1.25rem', opacity: 0.9, maxWidth: '600px', margin: '0 auto' }}>
            Illaignar Ani — The Energetic Heartbeat of Our Parish
          </p>
        </div>
      </section>

      {/* Content Container */}
      <div style={{ maxWidth: '1000px', width: '90%', margin: '-5rem auto 4rem', position: 'relative', zIndex: 20 }}>
        
        {/* Intro Card */}
        <div className="scroll-slide-up" style={{ backgroundColor: 'white', borderRadius: '1.5rem', padding: '3rem', boxShadow: '0 20px 40px -10px rgba(0,0,0,0.1)', marginBottom: '2rem' }}>
          <h2 style={{ fontSize: '1.75rem', fontWeight: '700', color: '#0f172a', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <Users color="#0284c7" /> Who We Are
          </h2>
          <p style={{ color: '#475569', lineHeight: 1.8, fontSize: '1.1rem' }}>
            {groupData?.description || `Our Youth Group comprises young men and women dedicated to spiritual growth and social service. 
            Actively involved in liturgy, choir, and community outreach, we organize retreats, cultural events, 
            and charitable drives, empowering the next generation to be leaders in faith and society.`}
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
           
           <div className="scroll-slide-up" style={{ backgroundColor: 'white', padding: '2rem', borderRadius: '1rem', borderTop: '4px solid #0ea5e9', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)' }}>
              <div style={{ backgroundColor: '#e0f2fe', width: '3rem', height: '3rem', borderRadius: '0.75rem', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem' }}>
                <Heart size={24} color="#0284c7" />
              </div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: '700', color: '#1e293b', marginBottom: '0.5rem' }}>Service</h3>
              <p style={{ color: '#64748b', fontSize: '0.95rem', lineHeight: 1.6 }}>Engaging in charitable acts and helping those in need within our community.</p>
           </div>

           <div className="scroll-slide-up" style={{ transitionDelay: '100ms', backgroundColor: 'white', padding: '2rem', borderRadius: '1rem', borderTop: '4px solid #2563eb', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)' }}>
              <div style={{ backgroundColor: '#dbeafe', width: '3rem', height: '3rem', borderRadius: '0.75rem', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem' }}>
                <Calendar size={24} color="#2563eb" />
              </div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: '700', color: '#1e293b', marginBottom: '0.5rem' }}>Events</h3>
              <p style={{ color: '#64748b', fontSize: '0.95rem', lineHeight: 1.6 }}>Organizing cultural programs, retreats, festivals, and sports meets.</p>
           </div>

           <div className="scroll-slide-up" style={{ transitionDelay: '200ms', backgroundColor: 'white', padding: '2rem', borderRadius: '1rem', borderTop: '4px solid #6366f1', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)' }}>
              <div style={{ backgroundColor: '#e0e7ff', width: '3rem', height: '3rem', borderRadius: '0.75rem', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem' }}>
                <Music size={24} color="#4f46e5" />
              </div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: '700', color: '#1e293b', marginBottom: '0.5rem' }}>Worship</h3>
              <p style={{ color: '#64748b', fontSize: '0.95rem', lineHeight: 1.6 }}>Leading the choir and participating actively in the Holy Liturgy.</p>
           </div>
        </div>

        {/* CTA */}
        <div className="scroll-slide-up" style={{ textAlign: 'center', backgroundColor: '#f0f9ff', padding: '3rem', borderRadius: '1.5rem', border: '1px dashed #bae6fd' }}>
           <h3 style={{ fontSize: '1.5rem', fontWeight: '700', color: '#0369a1', marginBottom: '1rem' }}>Want to Join Us?</h3>
           <p style={{ color: '#0c4a6e', marginBottom: '2rem', maxWidth: '500px', margin: '0 auto 2rem' }}>
             We welcome all young parishioners to join our vibrant community. Grow in faith and make lifelong friends.
           </p>
           <button 
             onClick={() => onNavigate('contact')}
             style={{ 
               backgroundColor: '#0284c7', color: 'white', border: 'none', padding: '1rem 2.5rem', 
               borderRadius: '3rem', fontSize: '1.1rem', fontWeight: '600', cursor: 'pointer',
               display: 'inline-flex', alignItems: 'center', gap: '0.5rem', boxShadow: '0 4px 12px rgba(2, 132, 199, 0.3)',
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

export default YouthGroup;
