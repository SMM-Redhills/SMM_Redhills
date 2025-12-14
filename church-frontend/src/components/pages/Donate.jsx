import React, { useEffect, useRef } from 'react';
import { Heart, Users } from 'lucide-react'; 

const Donate = ({ onNavigate }) => {
  const observerRef = useRef(null);

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
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

    animatedElements.forEach((el) => observerRef.current.observe(el));

    return () => {
      if (observerRef.current) observerRef.current.disconnect();
    };
  }, []);

  const donationOptions = [
    { amount: '₹500', label: 'Supporter' },
    { amount: '₹1,000', label: 'Contributor' },
    { amount: '₹5,000', label: 'Partner' },
    { amount: 'Custom', label: 'Any Amount' },
  ];

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f9fafb', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      {/* Hero Section */}
      <section 
        className="scroll-fade-in"
        style={{
          width: '100%',
          position: 'relative',
          padding: '5rem 1rem',
          color: 'white',
          textAlign: 'center',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
          background: 'linear-gradient(135deg, #ec4899 0%, #db2777 50%, #be185d 100%)',
        }}
      >
        <div style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(0,0,0,0.1)' }}></div>
        <div style={{ position: 'relative', zIndex: 10, maxWidth: '56rem', margin: '0 auto' }}>
          <div className="scroll-scale-in" style={{ marginBottom: '1.5rem', display: 'inline-block', padding: '1rem', borderRadius: '50%', backgroundColor: 'rgba(255,255,255,0.2)', backdropFilter: 'blur(4px)' }}>
             <Heart style={{ width: '3rem', height: '3rem', color: 'white', fill: 'currentColor' }} />
          </div>
          <h1 className="scroll-slide-up" style={{ fontSize: '2.5rem', md: { fontSize: '3.75rem' }, fontWeight: '700', fontFamily: 'serif', marginBottom: '1.5rem' }}>
            Support Our Mission
          </h1>
          <p className="scroll-slide-up" style={{ fontSize: '1.125rem', md: { fontSize: '1.25rem' }, color: '#fbcfe8', maxWidth: '42rem', margin: '0 auto', lineHeight: '1.625' }}>
            Your generous contributions help us sustain our church, support meaningful community programs, and spread love and hope to those in need.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <div style={{ width: '100%', maxWidth: '80rem', margin: '0 auto', padding: '4rem 1rem', marginTop: '-2.5rem', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(100%, 1fr))', gap: '3rem' }} className="lg:grid-cols-2">
        
        {/* Donation Form / Card */}
        <div className="scroll-slide-up" style={{ backgroundColor: 'white', borderRadius: '1rem', boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)', overflow: 'hidden', zIndex: 10 }}>
          <div style={{ padding: '2rem', md: { padding: '2.5rem' } }}>
            <h2 style={{ fontSize: '1.5rem', fontWeight: '700', color: '#1f2937', marginBottom: '1.5rem', fontFamily: 'serif', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <Heart style={{ width: '1.5rem', height: '1.5rem', color: '#db2777' }} />
              Make a Donation
            </h2>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem', marginBottom: '2rem' }}>
              {donationOptions.map((option) => (
                <button
                  key={option.amount}
                  className="group"
                  style={{ position: 'relative', padding: '1rem', borderRadius: '0.75rem', border: '2px solid #fce7f3', backgroundColor: 'rgba(253, 242, 248, 0.5)', textAlign: 'left', transition: 'all 0.3s ease', cursor: 'pointer' }}
                  onMouseEnter={(e) => { e.currentTarget.style.borderColor = '#ec4899'; e.currentTarget.style.backgroundColor = '#fdf2f8'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.borderColor = '#fce7f3'; e.currentTarget.style.backgroundColor = 'rgba(253, 242, 248, 0.5)'; }}
                >
                  <p style={{ fontSize: '1.25rem', fontWeight: '700', color: '#1f2937' }}>
                    {option.amount}
                  </p>
                  <p style={{ fontSize: '0.875rem', color: '#6b7280', fontWeight: '500' }}>
                    {option.label}
                  </p>
                </button>
              ))}
            </div>

            <form style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
               <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <label style={{ fontSize: '0.875rem', fontWeight: '600', color: '#374151' }}>Select Cause</label>
                <select style={{ width: '100%', padding: '0.75rem', backgroundColor: '#f9fafb', border: '1px solid #e5e7eb', borderRadius: '0.5rem', outline: 'none' }}>
                  <option>General Church Fund</option>
                  <option>Charity & Outreach</option>
                  <option>Building Maintenance</option>
                  <option>Youth Ministry</option>
                </select>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  <label style={{ fontSize: '0.875rem', fontWeight: '600', color: '#374151' }}>First Name</label>
                  <input type="text" style={{ width: '100%', padding: '0.75rem', backgroundColor: '#f9fafb', border: '1px solid #e5e7eb', borderRadius: '0.5rem', outline: 'none' }} placeholder="John" />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  <label style={{ fontSize: '0.875rem', fontWeight: '600', color: '#374151' }}>Last Name</label>
                  <input type="text" style={{ width: '100%', padding: '0.75rem', backgroundColor: '#f9fafb', border: '1px solid #e5e7eb', borderRadius: '0.5rem', outline: 'none' }} placeholder="Doe" />
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  <label style={{ fontSize: '0.875rem', fontWeight: '600', color: '#374151' }}>Email Address</label>
                  <input type="email" style={{ width: '100%', padding: '0.75rem', backgroundColor: '#f9fafb', border: '1px solid #e5e7eb', borderRadius: '0.5rem', outline: 'none' }} placeholder="john@example.com" />
              </div>

              <button style={{ width: '100%', padding: '1rem', background: 'linear-gradient(to right, #db2777, #e11d48)', color: 'white', borderRadius: '0.75rem', fontWeight: '700', fontSize: '1.125rem', border: 'none', cursor: 'pointer', boxShadow: '0 10px 15px -3px rgba(236, 72, 153, 0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
                Proceed to Pay
              </button>
              
              <p style={{ fontSize: '0.75rem', textAlign: 'center', color: '#9ca3af', marginTop: '1rem' }}>
                Secure payment processing via our trusted payment gateway.
              </p>
            </form>
          </div>
        </div>

        {/* Info Section */}
        <div className="scroll-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '2rem', padding: '1rem 0' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <h3 style={{ fontSize: '1.875rem', fontWeight: '700', color: '#1f2937', fontFamily: 'serif' }}>
              Why We Need Your Support
            </h3>
            <p style={{ color: '#4b5563', lineHeight: '1.625', fontSize: '1.125rem' }}>
              Saint Mary Magdalene Church relies on the generosity of our faithful community to maintain our historic sanctuary, fund vital ministries, and extend a helping hand to those in need within Redhills and beyond.
            </p>
          </div>

          <div style={{ display: 'grid', gap: '1.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem', padding: '1.5rem', backgroundColor: 'white', borderRadius: '0.75rem', boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)', border: '1px solid #f3f4f6' }}>
              <div style={{ padding: '0.75rem', borderRadius: '0.5rem', backgroundColor: '#eff6ff', color: '#2563eb', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Heart style={{ width: '1.5rem', height: '1.5rem' }} />
              </div>
              <div>
                <h4 style={{ fontSize: '1.125rem', fontWeight: '700', color: '#1f2937', marginBottom: '0.5rem' }}>Community Outreach</h4>
                <p style={{ color: '#4b5563', fontSize: '0.875rem', lineHeight: '1.5' }}>
                  Funding for food drives, educational support, and medical assistance for underprivileged families.
                </p>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem', padding: '1.5rem', backgroundColor: 'white', borderRadius: '0.75rem', boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)', border: '1px solid #f3f4f6' }}>
              <div style={{ padding: '0.75rem', borderRadius: '0.5rem', backgroundColor: '#ecfdf5', color: '#059669', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Heart style={{ width: '1.5rem', height: '1.5rem' }} />
              </div>
              <div>
                <h4 style={{ fontSize: '1.125rem', fontWeight: '700', color: '#1f2937', marginBottom: '0.5rem' }}>Church Maintenance</h4>
                <p style={{ color: '#4b5563', fontSize: '0.875rem', lineHeight: '1.5' }}>
                  Preserving our beautiful church building and ensuring a welcoming environment for worship.
                </p>
              </div>
            </div>
            
             <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem', padding: '1.5rem', backgroundColor: 'white', borderRadius: '0.75rem', boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)', border: '1px solid #f3f4f6' }}>
              <div style={{ padding: '0.75rem', borderRadius: '0.5rem', backgroundColor: '#f5f3ff', color: '#7c3aed', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Users style={{ width: '1.5rem', height: '1.5rem' }} />
              </div>
              <div>
                <h4 style={{ fontSize: '1.125rem', fontWeight: '700', color: '#1f2937', marginBottom: '0.5rem' }}>Ministry Programs</h4>
                <p style={{ color: '#4b5563', fontSize: '0.875rem', lineHeight: '1.5' }}>
                  Supporting youth groups, choir, catechism classes, and spiritual retreats.
                </p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Donate;
