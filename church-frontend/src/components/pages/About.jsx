import React, { useEffect, useRef } from 'react';
import { Church, Heart, Users, BookOpen, Calendar, MapPin, Phone, Mail, Cross } from 'lucide-react';

const About = ({ onNavigate, scrollToSection }) => {
  const observerRef = useRef(null);

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
        id="about-hero"
        className="scroll-fade-in smooth-scroll-section"
        style={{position: 'relative', background: 'linear-gradient(135deg, #0ea5e9 0%, #0284c7 50%, #0369a1 100%)', color: 'white', padding: '4rem 1rem', width: '100%', display: 'flex', justifyContent: 'center'}}
      >
        <div style={{position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(255,255,255,0.1)'}}></div>
        <div style={{position: 'relative', maxWidth: '72rem', margin: '0 auto', textAlign: 'center'}}>
          {/* <div className="scroll-scale-in" style={{marginBottom: '2rem'}}>
            <Cross style={{width: '3rem', height: '3rem', margin: '0 auto 1rem auto', color: '#ffffff', display: 'block'}} />
          </div> */}
          <h1 className="scroll-slide-up" style={{fontSize: '3rem', fontWeight: '700', marginBottom: '1rem', lineHeight: '1.1', textAlign: 'center', fontFamily: 'serif'}}>
            About Our church
            <span style={{display: 'block', fontSize: '1.5rem', fontWeight: '300', marginTop: '0.5rem', color: '#e0f2fe'}}>Saint Mary Magdalene church  </span>
          </h1>
          <p className="scroll-slide-up" style={{fontSize: '1.125rem', marginBottom: '2rem', maxWidth: '48rem', margin: '0 auto 2rem auto', lineHeight: '1.7', textAlign: 'center', color: '#e0f2fe'}}>
            A sacred place of worship, pilgrimage, evangelization, and reconciliation in Redhills, Chennai
          </p>
        </div>
      </section>

      {/* Main Content */}
      <div style={{width: '100%', padding: '4rem 1rem', backgroundColor: '#f8fafc', display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
        <div style={{maxWidth: '80rem', width: '100%', margin: '0 auto'}}>
        
        {/* church Story Section */}
        <section 
          id="church-story"
          className="scroll-fade-in smooth-scroll-section"
          style={{marginBottom: '4rem', backgroundColor: '#ffffff', padding: '3rem 2rem', borderRadius: '1rem', boxShadow: '0 10px 25px -3px rgba(0, 0, 0, 0.1)'}}
        >
          <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '3rem', alignItems: 'center'}}>
            <div className="scroll-slide-left">
              <h2 style={{fontSize: '2.5rem', fontWeight: '700', color: '#0284c7', marginBottom: '2rem', fontFamily: 'serif'}}>Our Sacred Heritage</h2>
              <p style={{color: '#64748b', marginBottom: '1.5rem', fontSize: '1.125rem', lineHeight: '1.7'}}>
                Saint Mary Magdalene church is a sacred place of worship dedicated to the beloved disciple who was the first witness to Christ's resurrection. Our church serves as a spiritual home for the faithful community in Redhills, Chennai.
              </p>
              <p style={{color: '#64748b', marginBottom: '2rem', fontSize: '1.125rem', lineHeight: '1.7'}}>
                Built with devotion and faith, our church stands as a testament to the enduring love and redemption that Saint Mary Magdalene represents. We welcome all who seek spiritual guidance, community, and the transformative power of God's love.
              </p>
            </div>
            <div className="scroll-slide-right" style={{textAlign: 'center'}}>
              <img 
                src="/assets/images/SMMCR.jpg" 
                alt="church Interior" 
                style={{width: '100%', maxWidth: '28rem', height: '20rem', objectFit: 'cover', borderRadius: '1rem', boxShadow: '0 10px 25px -3px rgba(0, 0, 0, 0.1)'}}
              />
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section 
          id="church-features"
          className="scroll-fade-in smooth-scroll-section"
          style={{marginBottom: '4rem', backgroundColor: '#ffffff', padding: '3rem 2rem', borderRadius: '1rem', boxShadow: '0 10px 25px -3px rgba(0, 0, 0, 0.1)'}}
        >
          <h2 className="scroll-slide-up" style={{fontSize: '2.5rem', fontWeight: '700', color: '#0284c7', marginBottom: '3rem', textAlign: 'center', fontFamily: 'serif'}}>Our church Features</h2>
          <div className="scroll-stagger-children" style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem'}}>
            <div className="hover-lift" style={{backgroundColor: '#e0f2fe', padding: '2rem', borderRadius: '1rem', border: '1px solid #0ea5e9', textAlign: 'center'}}>
              <Church style={{width: '3rem', height: '3rem', color: '#0284c7', margin: '0 auto 1rem auto', display: 'block'}} />
              <h3 style={{fontSize: '1.25rem', fontWeight: '600', marginBottom: '1rem', color: '#0284c7', fontFamily: 'serif'}}>Sacred Architecture</h3>
              <p style={{color: '#0369a1', lineHeight: '1.6'}}>Beautiful design reflecting our faith and devotion</p>
            </div>
            <div className="hover-lift" style={{backgroundColor: '#e0f2fe', padding: '2rem', borderRadius: '1rem', border: '1px solid #0ea5e9', textAlign: 'center'}}>
              <Heart style={{width: '3rem', height: '3rem', color: '#0284c7', margin: '0 auto 1rem auto', display: 'block'}} />
              <h3 style={{fontSize: '1.25rem', fontWeight: '600', marginBottom: '1rem', color: '#0284c7', fontFamily: 'serif'}}>Prayer Spaces</h3>
              <p style={{color: '#0369a1', lineHeight: '1.6'}}>Dedicated areas for contemplation and worship</p>
            </div>
            <div className="hover-lift" style={{backgroundColor: '#e0f2fe', padding: '2rem', borderRadius: '1rem', border: '1px solid #0ea5e9', textAlign: 'center'}}>
              <Users style={{width: '3rem', height: '3rem', color: '#0284c7', margin: '0 auto 1rem auto', display: 'block'}} />
              <h3 style={{fontSize: '1.25rem', fontWeight: '600', marginBottom: '1rem', color: '#0284c7', fontFamily: 'serif'}}>Community Hall</h3>
              <p style={{color: '#0369a1', lineHeight: '1.6'}}>Space for fellowship and community gatherings</p>
            </div>
            <div className="hover-lift" style={{backgroundColor: '#e0f2fe', padding: '2rem', borderRadius: '1rem', border: '1px solid #0ea5e9', textAlign: 'center'}}>
              <BookOpen style={{width: '3rem', height: '3rem', color: '#0284c7', margin: '0 auto 1rem auto', display: 'block'}} />
              <h3 style={{fontSize: '1.25rem', fontWeight: '600', marginBottom: '1rem', color: '#0284c7', fontFamily: 'serif'}}>Religious Library</h3>
              <p style={{color: '#0369a1', lineHeight: '1.6'}}>Collection of spiritual books and resources</p>
            </div>
          </div>
        </section>

        {/* Mission & Values */}
        <section 
          id="mission-values"
          className="scroll-fade-in smooth-scroll-section"
          style={{marginBottom: '4rem', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '2rem'}}
        >
          <div className="scroll-slide-left hover-lift" style={{backgroundColor: '#ffffff', padding: '3rem 2rem', borderRadius: '1rem', boxShadow: '0 10px 25px -3px rgba(0, 0, 0, 0.1)'}}>
            <h3 style={{fontSize: '2rem', fontWeight: '700', color: '#0284c7', marginBottom: '2rem', fontFamily: 'serif'}}>Our Mission</h3>
            <p style={{color: '#64748b', fontSize: '1.125rem', lineHeight: '1.7'}}>
              To spread the love of Christ through worship, service, and community fellowship. We strive to be a beacon of hope and faith in our neighborhood, following the example of Saint Mary Magdalene's devotion.
            </p>
          </div>
          <div className="scroll-slide-right hover-lift" style={{backgroundColor: '#ffffff', padding: '3rem 2rem', borderRadius: '1rem', boxShadow: '0 10px 25px -3px rgba(0, 0, 0, 0.1)'}}>
            <h3 style={{fontSize: '2rem', fontWeight: '700', color: '#0284c7', marginBottom: '2rem', fontFamily: 'serif'}}>Our Values</h3>
            <p style={{color: '#64748b', fontSize: '1.125rem', lineHeight: '1.7'}}>
              Faith, Love, Service, and Community guide everything we do. We believe in the transformative power of God's grace and the importance of supporting one another in our spiritual journey.
            </p>
          </div>
        </section>

        {/* Contact Information */}
        <section 
          id="contact-info"
          className="scroll-fade-in smooth-scroll-section"
          style={{backgroundColor: '#e0f2fe', padding: '3rem 2rem', borderRadius: '1rem', border: '1px solid #0ea5e9'}}
        >
          <h2 className="scroll-slide-up" style={{fontSize: '2.5rem', fontWeight: '700', color: '#0284c7', marginBottom: '3rem', textAlign: 'center', fontFamily: 'serif'}}>Visit Us</h2>
          <div className="scroll-stagger-children" style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem', marginBottom: '2rem'}}>
            <div className="hover-lift" style={{backgroundColor: '#ffffff', padding: '1.5rem', borderRadius: '0.75rem', display: 'flex', alignItems: 'center', gap: '1rem'}}>
              <MapPin style={{width: '2rem', height: '2rem', color: '#0284c7'}} />
              <div>
                <p style={{fontWeight: '600', color: '#0284c7', marginBottom: '0.25rem'}}>Address</p>
                <p style={{color: '#0369a1', fontSize: '0.875rem'}}>Redhills, Chennai, Tamil Nadu</p>
              </div>
            </div>
            <div className="hover-lift" style={{backgroundColor: '#ffffff', padding: '1.5rem', borderRadius: '0.75rem', display: 'flex', alignItems: 'center', gap: '1rem'}}>
              <Phone style={{width: '2rem', height: '2rem', color: '#0284c7'}} />
              <div>
                <p style={{fontWeight: '600', color: '#0284c7', marginBottom: '0.25rem'}}>Phone</p>
                <p style={{color: '#0369a1', fontSize: '0.875rem'}}>+91 1234567890</p>
              </div>
            </div>
            <div className="hover-lift" style={{backgroundColor: '#ffffff', padding: '1.5rem', borderRadius: '0.75rem', display: 'flex', alignItems: 'center', gap: '1rem'}}>
              <Mail style={{width: '2rem', height: '2rem', color: '#0284c7'}} />
              <div>
                <p style={{fontWeight: '600', color: '#0284c7', marginBottom: '0.25rem'}}>Email</p>
                <p style={{color: '#0369a1', fontSize: '0.875rem'}}>info@smmchurch.org</p>
              </div>
            </div>
            <div className="hover-lift" style={{backgroundColor: '#ffffff', padding: '1.5rem', borderRadius: '0.75rem', display: 'flex', alignItems: 'center', gap: '1rem'}}>
              <Calendar style={{width: '2rem', height: '2rem', color: '#0284c7'}} />
              <div>
                <p style={{fontWeight: '600', color: '#0284c7', marginBottom: '0.25rem'}}>Office Hours</p>
                <p style={{color: '#0369a1', fontSize: '0.875rem'}}>Mon-Sat: 9AM-5PM</p>
              </div>
            </div>
          </div>
          <div className="scroll-slide-up" style={{textAlign: 'center'}}>
            <p style={{fontSize: '1.125rem', color: '#0369a1', marginBottom: '1.5rem'}}>
              Experience faith, community, and the inspiring legacy of Saint Mary Magdalene in our welcoming church.
            </p>
          </div>
        </section>
        
        </div>
      </div>
    </div>
  );
};

export default About;