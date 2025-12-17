import React, { useEffect, useRef } from 'react';
import { Shield, Hammer, Users, Heart, ArrowRight } from 'lucide-react';

const StJosephGroup = ({ onNavigate }) => {
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

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f9fafb', fontFamily: 'sans-serif' }}>
      {/* Hero Section */}
      <section 
        className="scroll-fade-in"
        style={{
          background: 'linear-gradient(135deg, #d97706 0%, #b45309 100%)',
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
          <div style={{ 
            display: 'inline-flex', padding: '1rem', 
            background: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(8px)', 
            borderRadius: '50%', marginBottom: '1.5rem', boxShadow: '0 8px 32px rgba(0,0,0,0.1)'
          }}>
            <Shield size={40} color="white" />
          </div>
          <h1 className="scroll-slide-up" style={{ fontSize: '3rem', fontWeight: '800', marginBottom: '1rem', textShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
            Valanar Sabai
          </h1>
          <p className="scroll-slide-up" style={{ fontSize: '1.25rem', opacity: 0.9, maxWidth: '600px', margin: '0 auto' }}>
            St. Joseph's Group — Fostering Spirituality and Brotherhood
          </p>
        </div>
      </section>

      {/* Content Container */}
      <div style={{ maxWidth: '1000px', width: '90%', margin: '-5rem auto 4rem', position: 'relative', zIndex: 20 }}>
        
        {/* Intro Card */}
        <div className="scroll-slide-up" style={{ backgroundColor: 'white', borderRadius: '1.5rem', padding: '3rem', boxShadow: '0 20px 40px -10px rgba(0,0,0,0.1)', marginBottom: '2rem' }}>
          <h2 style={{ fontSize: '1.75rem', fontWeight: '700', color: '#78350f', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <Shield className="text-amber-700" /> Who We Are
          </h2>
          <p style={{ color: '#4b5563', lineHeight: 1.8, fontSize: '1.1rem' }}>
            Dedicated to St. Joseph (Punitha Valanar), this group encourages men in the parish to emulate his virtues. 
            Focusing on humility, hard work, and protection of the family, members act as pillars of support for the church. 
            We organize the annual Feast of St. Joseph, handle church maintenance, and assist in parish developmental activities.
          </p>
        </div>

        {/* Feature Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem', marginBottom: '3rem' }}>
           
           <div className="scroll-slide-up" style={{ backgroundColor: 'white', padding: '2rem', borderRadius: '1rem', borderTop: '4px solid #d97706', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)' }}>
              <div style={{ backgroundColor: '#fef3c7', width: '3rem', height: '3rem', borderRadius: '0.75rem', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem' }}>
                <Users size={24} color="#d97706" />
              </div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: '700', color: '#1e293b', marginBottom: '0.5rem' }}>Brotherhood</h3>
              <p style={{ color: '#64748b', fontSize: '0.95rem', lineHeight: 1.6 }}>Uniting men of faith to support one another, their families, and the church community.</p>
           </div>

           <div className="scroll-slide-up" style={{ transitionDelay: '100ms', backgroundColor: 'white', padding: '2rem', borderRadius: '1rem', borderTop: '4px solid #f59e0b', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)' }}>
              <div style={{ backgroundColor: '#fde68a', width: '3rem', height: '3rem', borderRadius: '0.75rem', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem' }}>
                <Hammer size={24} color="#d97706" />
              </div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: '700', color: '#1e293b', marginBottom: '0.5rem' }}>Service</h3>
              <p style={{ color: '#64748b', fontSize: '0.95rem', lineHeight: 1.6 }}>Assisting with church maintenance, manual labor projects, and logistics for events.</p>
           </div>

           <div className="scroll-slide-up" style={{ transitionDelay: '200ms', backgroundColor: 'white', padding: '2rem', borderRadius: '1rem', borderTop: '4px solid #fbbf24', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)' }}>
              <div style={{ backgroundColor: '#fef08a', width: '3rem', height: '3rem', borderRadius: '0.75rem', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem' }}>
                <Heart size={24} color="#b45309" />
              </div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: '700', color: '#1e293b', marginBottom: '0.5rem' }}>Faith</h3>
              <p style={{ color: '#64748b', fontSize: '0.95rem', lineHeight: 1.6 }}>Living out the quiet, steadfast faith of St. Joseph in daily life and family leadership.</p>
           </div>
        </div>

        {/* CTA */}
        <div className="scroll-slide-up" style={{ textAlign: 'center', backgroundColor: '#fffbeb', padding: '3rem', borderRadius: '1.5rem', border: '1px dashed #fde68a' }}>
           <h3 style={{ fontSize: '1.5rem', fontWeight: '700', color: '#92400e', marginBottom: '1rem' }}>Join the Brotherhood</h3>
           <p style={{ color: '#78350f', marginBottom: '2rem', maxWidth: '500px', margin: '0 auto 2rem' }}>
             We invite all men of the parish to join us in fellowship and service.
           </p>
           <button 
             onClick={() => onNavigate('contact')}
             style={{ 
               backgroundColor: '#d97706', color: 'white', border: 'none', padding: '1rem 2.5rem', 
               borderRadius: '3rem', fontSize: '1.1rem', fontWeight: '600', cursor: 'pointer',
               display: 'inline-flex', alignItems: 'center', gap: '0.5rem', boxShadow: '0 4px 12px rgba(217, 119, 6, 0.3)',
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

export default StJosephGroup;
