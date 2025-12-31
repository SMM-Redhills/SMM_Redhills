import React, { useEffect, useRef, useState } from 'react';
import { Heart, Users, CreditCard, Landmark, MapPin, Banknote, Copy, CheckCircle } from 'lucide-react';

const Donate = ({ onNavigate }) => {
  const observerRef = useRef(null);
  const [copiedField, setCopiedField] = useState(null);

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

    const animatedElements = document.querySelectorAll(
      '.scroll-fade-in, .scroll-slide-up, .scroll-scale-in'
    );

    animatedElements.forEach((el) => observer.observe(el));
    observerRef.current = observer;

    return () => {
      if (observerRef.current) observerRef.current.disconnect();
    };
  }, []);

  const copyToClipboard = (text, field) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f9fafb', display: 'flex', flexDirection: 'column' }}>
      
      {/* Hero Section */}
      <section 
        className="scroll-fade-in"
        style={{
            background: 'linear-gradient(135deg, #833ab4 0%, #fd1d1d 50%, #fcb045 100%)',
            position: 'relative',
            padding: '4rem 1rem 6rem',
            textAlign: 'center',
            color: 'white',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center'
        }}
      >
        <div style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(0,0,0,0.2)' }}></div>
        <div style={{ position: 'relative', zIndex: 10, maxWidth: '800px', margin: '0 auto' }}>
          <h1 className="scroll-slide-up" style={{ 
            fontSize: '2.5rem', 
            fontWeight: 'bold', 
            marginBottom: '0.5rem', 
            textShadow: '0 4px 6px rgba(0,0,0,0.1)' 
          }}>
            Support Our Mission
          </h1>
        </div>
      </section>

      {/* Main Content Container - Centered */}
      <div style={{ 
        maxWidth: '1000px', 
        width: '90%', 
        margin: '-4rem auto 4rem', 
        position: 'relative', 
        zIndex: 20 
      }}>
        
        {/* Card Container */ }
        <div className="scroll-slide-up" style={{ 
          backgroundColor: 'white', 
          borderRadius: '1.5rem', 
          boxShadow: '0 20px 40px -10px rgba(0, 0, 0, 0.15)', 
          overflow: 'hidden',
          display: 'grid',
          gridTemplateColumns: '1fr 1fr', // Force 2 columns
          minHeight: '500px'
        }}>
            
            {/* Left Column: 2 Rows of Pictures */}
            <div style={{ 
              backgroundColor: '#f8fafc', 
              borderRight: '1px solid #e2e8f0',
              padding: '2rem',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              gap: '2rem' // Gap between the 2 rows/pics
            }}>
                {/* Row 1: Pic 1 */}
                <div style={{ width: '100%', maxWidth: '320px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                     <div style={{ 
                        width: '100%', 
                        height: '180px', 
                        borderRadius: '1rem', 
                        overflow: 'hidden', 
                        boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
                        marginBottom: '0.5rem'
                     }}>
                        <img 
                            src="/assets/images/solac.jpeg" 
                            alt="Church" 
                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        />
                     </div>
                     <span style={{ fontSize: '0.85rem', fontWeight: '600', color: '#64748b' }}>St. Mother Theresa Church</span>
                </div>

                {/* Row 2: Pic 2 */}
                <div style={{ width: '100%', maxWidth: '320px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                     <div style={{ 
                        width: '100%', 
                        height: '180px', 
                        borderRadius: '1rem', 
                        overflow: 'hidden', 
                        boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
                        marginBottom: '0.5rem'
                     }}>
                        <img 
                            src="/assets/images/solac1.jpeg" 
                            alt="Community" 
                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        />
                     </div>
                     <span style={{ fontSize: '0.85rem', fontWeight: '600', color: '#64748b' }}>Our Community</span>
                </div>
            </div>

            {/* Right Column: Account Details */}
            <div style={{ 
              padding: '3rem', 
              display: 'flex', 
              flexDirection: 'column', 
              justifyContent: 'center',
              alignItems: 'center' 
            }}>
                 <div style={{ width: '100%', maxWidth: '400px' }}>
                    
                    <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                         <h2 style={{ 
                           fontSize: '1.75rem', 
                           fontWeight: 'bold', 
                           color: '#1e293b', 
                           display: 'flex', 
                           alignItems: 'center', 
                           justifyContent: 'center', 
                           gap: '0.75rem'
                         }}>
                            <Landmark className="text-pink-600" />
                            Bank Details
                        </h2>
                    </div>

                    {/* Bank Card Widget */}
                    <div style={{ 
                      background: 'linear-gradient(145deg, #1e293b, #0f172a)', 
                      borderRadius: '1.25rem', 
                      padding: '2rem', 
                      color: 'white', 
                      boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.3)',
                      position: 'relative'
                    }}>
                        {/* Account Holder */}
                        <div style={{ marginBottom: '1.5rem', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '1rem' }}>
                            <p style={{ fontSize: '0.7rem', textTransform: 'uppercase', color: '#94a3b8', letterSpacing: '0.05em' }}>Account Holder</p>
                            <p style={{ fontSize: '1rem', fontWeight: '600', fontFamily: 'serif', marginTop: '0.25rem' }}>St. Mary Magdalene Church Redhills</p>
                        </div>

                        {/* Account Number */}
                        <div style={{ marginBottom: '1.5rem' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.25rem' }}>
                                <p style={{ fontSize: '0.7rem', textTransform: 'uppercase', color: '#94a3b8', letterSpacing: '0.05em' }}>Account Number</p>
                                {copiedField === 'account' ? (
                                    <span style={{ fontSize: '0.7rem', color: '#4ade80', display: 'flex', alignItems: 'center', gap: '4px' }}><CheckCircle size={12}/> Copied</span>
                                ) : (
                                    <button onClick={() => copyToClipboard('123010011000760', 'account')} style={{ background: 'none', border: 'none', color: '#f472b6', fontSize: '0.7rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}>
                                        <Copy size={12}/> Copy
                                    </button>
                                )}
                            </div>
                            <p style={{ fontSize: '1.25rem', fontFamily: 'monospace', fontWeight: 'bold', letterSpacing: '0.1em' }}>123010011000760</p>
                        </div>

                        {/* Footer Details */}
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                            <div>
                                <p style={{ fontSize: '0.7rem', textTransform: 'uppercase', color: '#94a3b8', letterSpacing: '0.05em' }}>Bank</p>
                                <p style={{ fontSize: '0.85rem', fontWeight: '600' }}>Union Bank of India</p>
                            </div>
                            <div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.25rem' }}>
                                    <p style={{ fontSize: '0.7rem', textTransform: 'uppercase', color: '#94a3b8', letterSpacing: '0.05em' }}>IFSC Code</p>
                                    {copiedField === 'ifsc' ? (
                                        <CheckCircle size={12} color="#4ade80" />
                                    ) : (
                                        <button onClick={() => copyToClipboard('UBIN0812307', 'ifsc')} style={{ background: 'none', border: 'none', color: '#f472b6', fontSize: '0.7rem', cursor: 'pointer' }}>
                                            <Copy size={12}/>
                                        </button>
                                    )}
                                </div>
                                <p style={{ fontSize: '0.85rem', fontWeight: '600', fontFamily: 'monospace' }}>UBIN0812307</p>
                            </div>
                        </div>
                    </div>

                    <div style={{ marginTop: '2rem', textAlign: 'center', backgroundColor: '#fdf2f8', padding: '1.5rem', borderRadius: '1rem', border: '1px solid #fce7f3' }}>
                         <h3 style={{ fontSize: '1rem', fontWeight: '700', color: '#be185d', marginBottom: '1rem' }}>Contact for Support</h3>
                         
                         <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.9rem', color: '#4b5563' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', justifyContent: 'center' }}>
                                <Users size={18} className="text-pink-600" />
                                <span style={{ fontWeight: '600' }}>Rev. Fr. Sandiyagu E</span>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', justifyContent: 'center' }}>
                                <p style={{ fontWeight: '500', color: '#6b7280', fontSize: '0.85rem' }}>Parish Priest</p>
                            </div>
                             <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', justifyContent: 'center' }}>
                                {/* Using phone icon explicitly or text */}
                                <span style={{ fontWeight: '600', color: '#db2777' }}>Mobile: 9444277932</span>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'start', gap: '0.75rem', justifyContent: 'center', marginTop: '0.5rem' }}>
                                <MapPin size={18} className="text-pink-600 shrink-0" style={{ marginTop: '2px' }} />
                                <span style={{ textAlign: 'left', maxWidth: '200px' }}>St Mary Magdalene Church<br/>Redhills, Chennai - 52</span>
                            </div>
                         </div>
                    </div>

                 </div>
            </div>

        </div>
      </div>

       {/* Mobile Responsive Style Injection */}
       <style>{`
        @media (max-width: 768px) {
            .scroll-slide-up[style*="grid-template-columns"] {
                grid-template-columns: 1fr !important;
            }
            .scroll-slide-up[style*="display: grid"] {
                display: flex !important;
                flex-direction: column !important;
            }
            div[style*="border-right"] {
                border-right: none !important;
                border-bottom: 1px solid #e2e8f0 !important;
            }
        }
      `}</style>
    </div>
  );
};

export default Donate;
