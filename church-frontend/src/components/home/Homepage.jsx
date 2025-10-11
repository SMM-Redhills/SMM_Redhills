import React, { useEffect, useRef } from 'react';
import { Calendar, Clock, Users, Book, Heart, Youtube, Camera, Cross } from 'lucide-react';

const Homepage = ({ onNavigate, scrollToSection }) => {
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
        id="hero"
        className="scroll-fade-in smooth-scroll-section"
        style={{position: 'relative', background: 'linear-gradient(135deg, #0ea5e9 0%, #0284c7 50%, #0369a1 100%)', color: 'white', padding: '6rem 1rem', width: '100%', display: 'flex', justifyContent: 'center'}}
      >
        <div style={{position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(255,255,255,0.1)'}}></div>
        <div style={{position: 'relative', maxWidth: '72rem', margin: '0 auto', textAlign: 'center'}}>
          {/* <div className="scroll-scale-in" style={{marginBottom: '2rem'}}>
            <Cross style={{width: '4rem', height: '4rem', margin: '0 auto 1rem auto', color: '#ffffff', display: 'block'}} />
          </div> */}
          <h1 className="scroll-slide-up" style={{fontSize: '3.5rem', fontWeight: '700', marginBottom: '1.5rem', lineHeight: '1.1', textAlign: 'center', fontFamily: 'serif'}}>
            Welcome to
            <span style={{display: 'block', color: '#ffffff', marginTop: '0.5rem'}}>Saint Mary Magdalene</span>
            <span style={{display: 'block', fontSize: '2rem', fontWeight: '300', marginTop: '0.5rem', color: '#e0f2fe'}}>church  </span>
          </h1>
          <p className="scroll-slide-up" style={{fontSize: '1.25rem', marginBottom: '2.5rem', maxWidth: '48rem', margin: '0 auto 2.5rem auto', lineHeight: '1.7', textAlign: 'center', color: '#e0f2fe'}}>
            A sacred place of worship, pilgrimage, evangelization, and reconciliation in Redhills, Chennai
          </p>
          


        </div>
      </section>

      {/* Main Content */}
      <div style={{width: '100%', padding: '4rem 1rem', backgroundColor: '#f8fafc', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center'}}>
        <div style={{maxWidth: '80rem', width: '100%', margin: '0 auto', textAlign: 'center'}}>
        
        {/* church   Section */}
        <section 
          id="church-section"
          className="scroll-fade-in smooth-scroll-section"
          style={{marginBottom: '5rem', textAlign: 'center', width: '100%', backgroundColor: '#ffffff', padding: '3rem 2rem', borderRadius: '1rem', boxShadow: '0 10px 25px -3px rgba(0, 0, 0, 0.1)'}}
        >
          <h2 className="scroll-slide-up" style={{fontSize: '2.5rem', fontWeight: '700', color: '#0284c7', marginBottom: '2rem', textAlign: 'center', fontFamily: 'serif'}}>Saint Mary Magdalene </h2>
          <div style={{display: 'grid', gridTemplateColumns: '1fr', gap: '3rem', alignItems: 'center', justifyItems: 'center', maxWidth: '70rem', margin: '0 auto'}}>
            <div className="scroll-slide-left" style={{textAlign: 'center', maxWidth: '50rem', width: '100%'}}>
              <p style={{color: '#64748b', marginBottom: '1.5rem', fontSize: '1.125rem', lineHeight: '1.7'}}>
                The church serves as a sacred place of worship, pilgrimage, evangelization, and reconciliation, 
                fulfilling its mission with great dedication. We trust that you will find the information on this 
                site valuable, especially if you are planning a pilgrimage to our church.
              </p>
              <p style={{color: '#64748b', marginBottom: '1.5rem', fontSize: '1.125rem', lineHeight: '1.7'}}>
                As the heart of our parish, the church serves as the spiritual home to nearly 1,600 families. 
                It is a vibrant community of faith, welcoming over 200,000 visitors each year.
              </p>
              <p style={{color: '#64748b', marginBottom: '2rem', fontSize: '1.125rem', lineHeight: '1.7'}}>
                We offer three daily Masses and more than five hours of confessions each day, along with a 
                Catholic bookstore to serve the needs of our visitors.
              </p>
              <div style={{backgroundColor: '#e0f2fe', padding: '2rem', borderRadius: '1rem', marginTop: '2rem', border: '1px solid #0ea5e9'}}>
                <h4 style={{fontWeight: '600', color: '#0284c7', marginBottom: '1rem', fontSize: '1.25rem'}}>About Saint Mary Magdalene</h4>
                <p style={{fontSize: '1rem', color: '#0369a1', lineHeight: '1.6'}}>
                  Saint Mary Magdalene was a devoted follower of Jesus Christ and is often called the "Apostle to the Apostles" 
                  because she was the first to witness and announce Christ's resurrection. She represents redemption, 
                  devotion, and the transformative power of divine love.
                </p>
              </div>
            </div>
            <div className="scroll-slide-right" style={{backgroundColor: '#f8fafc', borderRadius: '1rem', padding: '2rem', border: '1px solid #e2e8f0'}}>
              <img 
                src="/assets/images/smm.jpg" 
                alt="church Interior" 
                style={{width: '100%', height: '20rem', objectFit: 'cover', borderRadius: '0.75rem', marginBottom: '1rem'}}
              />
            </div>
          </div>
        </section>

        {/* Quick Links Section */}
        <section 
          id="quick-links"
          className="scroll-fade-in smooth-scroll-section"
          style={{marginBottom: '5rem', textAlign: 'center', width: '100%'}}
        >
          <h2 className="scroll-slide-up" style={{fontSize: '2.5rem', fontWeight: '700', color: '#0284c7', marginBottom: '3rem', textAlign: 'center', fontFamily: 'serif'}}>Quick Links</h2>
          <div className="scroll-stagger-children" style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem', justifyItems: 'center'}}>
            <div className="hover-lift" style={{backgroundColor: '#ffffff', padding: '2rem', borderRadius: '1rem', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)', border: '1px solid #e2e8f0', textAlign: 'center', width: '100%', maxWidth: '20rem', transition: 'all 0.3s ease'}}>
              <Calendar style={{width: '3rem', height: '3rem', color: '#0ea5e9', margin: '0 auto 1.5rem auto', display: 'block'}} />
              <h3 style={{fontSize: '1.25rem', fontWeight: '600', marginBottom: '1rem', color: '#1e293b'}}>News & Events</h3>
              <p style={{color: '#64748b', marginBottom: '1.5rem', lineHeight: '1.6'}}>Stay updated with our latest news and upcoming events</p>
              <button 
                style={{color: '#0ea5e9', fontWeight: '500', backgroundColor: 'transparent', border: 'none', cursor: 'pointer'}}
                onClick={() => onNavigate && onNavigate('news-events')}
              >
                Read More →
              </button>
            </div>
            
            <div className="hover-lift" style={{backgroundColor: '#ffffff', padding: '2rem', borderRadius: '1rem', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)', border: '1px solid #e2e8f0', textAlign: 'center', width: '100%', maxWidth: '20rem', transition: 'all 0.3s ease'}}>
              <Youtube style={{width: '3rem', height: '3rem', color: '#0ea5e9', margin: '0 auto 1.5rem auto', display: 'block'}} />
              <h3 style={{fontSize: '1.25rem', fontWeight: '600', marginBottom: '1rem', color: '#1e293b'}}>YouTube Channel</h3>
              <p style={{color: '#64748b', marginBottom: '1.5rem', lineHeight: '1.6'}}>Watch our services and spiritual content online</p>
              <button 
                style={{color: '#0ea5e9', fontWeight: '500', backgroundColor: 'transparent', border: 'none', cursor: 'pointer'}}
                onClick={() => window.open('https://www.youtube.com/@KORKAITV', '_blank')}
              >
                View Channel →
              </button>
            </div>
            
            <div className="hover-lift" style={{backgroundColor: '#ffffff', padding: '2rem', borderRadius: '1rem', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)', border: '1px solid #e2e8f0', textAlign: 'center', width: '100%', maxWidth: '20rem', transition: 'all 0.3s ease'}}>
              <Camera style={{width: '3rem', height: '3rem', color: '#0ea5e9', margin: '0 auto 1.5rem auto', display: 'block'}} />
              <h3 style={{fontSize: '1.25rem', fontWeight: '600', marginBottom: '1rem', color: '#1e293b'}}>Our Gallery</h3>
              <p style={{color: '#64748b', marginBottom: '1.5rem', lineHeight: '1.6'}}>Explore photos and videos from our church community</p>
              <button 
                style={{color: '#0ea5e9', fontWeight: '500', backgroundColor: 'transparent', border: 'none', cursor: 'pointer'}}
                onClick={() => onNavigate && onNavigate('gallery')}
              >
                View Gallery →
              </button>
            </div>
            
            <div className="hover-lift" style={{backgroundColor: '#ffffff', padding: '2rem', borderRadius: '1rem', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)', border: '1px solid #e2e8f0', textAlign: 'center', width: '100%', maxWidth: '20rem', transition: 'all 0.3s ease'}}>
              <Book style={{width: '3rem', height: '3rem', color: '#0ea5e9', margin: '0 auto 1.5rem auto', display: 'block'}} />
              <h3 style={{fontSize: '1.25rem', fontWeight: '600', marginBottom: '1rem', color: '#1e293b'}}>Our Prayers</h3>
              <p style={{color: '#64748b', marginBottom: '1.5rem', lineHeight: '1.6'}}>Find prayers in English and Tamil for your spiritual journey</p>
              <button 
                style={{color: '#0ea5e9', fontWeight: '500', backgroundColor: 'transparent', border: 'none', cursor: 'pointer'}}
                onClick={() => onNavigate && onNavigate('prayers')}
              >
                View Prayers →
              </button>
            </div>
          </div>
        </section>

        {/* History Section */}
        <section 
          id="history"
          className="scroll-fade-in smooth-scroll-section"
          style={{marginBottom: '5rem', textAlign: 'center', width: '100%'}}
        >
          <h2 className="scroll-slide-up" style={{fontSize: '2.5rem', fontWeight: '700', color: '#0284c7', marginBottom: '3rem', textAlign: 'center', fontFamily: 'serif'}}>Our History & Heritage</h2>
          <div className="scroll-stagger-children" style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', justifyItems: 'center'}}>
            
            <div className="hover-lift" style={{backgroundColor: '#ffffff', padding: '2rem', borderRadius: '1rem', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)', border: '1px solid #e2e8f0', textAlign: 'center', width: '100%', maxWidth: '22rem', transition: 'all 0.3s ease'}}>
              <img 
                src="public/assets/images/sain_mm.jpeg" 
                alt="Saint Mary Magdalene" 
                style={{width: '100%', height: '12rem', objectFit: 'cover', borderRadius: '0.75rem', marginBottom: '1rem'}}
              />
              <h3 style={{fontSize: '1.25rem', fontWeight: '600', marginBottom: '1rem', color: '#1e293b'}}>Saint Mary Magdalene</h3>
              <p style={{color: '#64748b', marginBottom: '1.5rem', lineHeight: '1.6'}}>
                Known as the "Apostle to the Apostles," she was the first witness to Christ's resurrection and a symbol of redemption and unwavering faith.
              </p>
              <button 
                style={{color: '#0ea5e9', fontWeight: '500', backgroundColor: 'transparent', border: 'none', cursor: 'pointer'}}
                onClick={() => onNavigate && onNavigate('st-mary-magdalene')}
              >
                Read More →
              </button>
            </div>
            
            <div className="hover-lift" style={{backgroundColor: '#ffffff', padding: '2rem', borderRadius: '1rem', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)', border: '1px solid #e2e8f0', textAlign: 'center', width: '100%', maxWidth: '22rem', transition: 'all 0.3s ease'}}>
              <img 
                src="/assets/images/smm.jpg" 
                alt="church Heritage" 
                style={{width: '100%', height: '12rem', objectFit: 'cover', borderRadius: '0.75rem', marginBottom: '1rem'}}
              />
              <h3 style={{fontSize: '1.25rem', fontWeight: '600', marginBottom: '1rem', color: '#1e293b'}}>church Heritage</h3>
              <p style={{color: '#64748b', marginBottom: '1.5rem', lineHeight: '1.6'}}>
                Our church stands as a testament to faith, serving the community of Redhills with devotion, prayer, and spiritual guidance for generations.
              </p>
              <button style={{color: '#0ea5e9', fontWeight: '500', backgroundColor: 'transparent', border: 'none', cursor: 'pointer'}}>Read More →</button>
            </div>
          </div>
        </section>

        {/* Schedule Section */}
        <section 
          id="schedule"
          className="scroll-fade-in smooth-scroll-section"
          style={{marginBottom: '5rem', backgroundColor: '#e0f2fe', borderRadius: '1rem', padding: '3rem', textAlign: 'center', width: '100%'}}
        >
          <h2 className="scroll-slide-up" style={{fontSize: '2.5rem', fontWeight: '700', color: '#0284c7', marginBottom: '3rem', textAlign: 'center', fontFamily: 'serif'}}>Our Schedule</h2>
          <div className="scroll-stagger-children" style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem', justifyItems: 'center'}}>
            <div className="hover-lift" style={{backgroundColor: '#ffffff', padding: '2rem', borderRadius: '1rem', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)', textAlign: 'center', width: '100%', maxWidth: '18rem'}}>
              <Clock style={{width: '2rem', height: '2rem', color: '#0ea5e9', margin: '0 auto 1rem auto', display: 'block'}} />
              <h3 style={{fontSize: '1.125rem', fontWeight: '600', marginBottom: '0.5rem', color: '#1e293b'}}>Visiting Hours</h3>
              <p style={{color: '#64748b', marginBottom: '1rem'}}>Daily: 6:00 AM - 8:00 PM</p>
              <button style={{color: '#0ea5e9', fontWeight: '500', backgroundColor: 'transparent', border: 'none', cursor: 'pointer'}}>More details...</button>
            </div>
            
            <div className="hover-lift" style={{backgroundColor: '#ffffff', padding: '2rem', borderRadius: '1rem', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)', textAlign: 'center', width: '100%', maxWidth: '18rem'}}>
              <Heart style={{width: '2rem', height: '2rem', color: '#0ea5e9', margin: '0 auto 1rem auto', display: 'block'}} />
              <h3 style={{fontSize: '1.125rem', fontWeight: '600', marginBottom: '0.5rem', color: '#1e293b'}}>Special Devotions</h3>
              <p style={{color: '#64748b', marginBottom: '1rem'}}>Various times throughout the week</p>
              <button style={{color: '#0ea5e9', fontWeight: '500', backgroundColor: 'transparent', border: 'none', cursor: 'pointer'}}>More details...</button>
            </div>
            
            <div className="hover-lift" style={{backgroundColor: '#ffffff', padding: '2rem', borderRadius: '1rem', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)', textAlign: 'center', width: '100%', maxWidth: '18rem'}}>
              <Users style={{width: '2rem', height: '2rem', color: '#0ea5e9', margin: '0 auto 1rem auto', display: 'block'}} />
              <h3 style={{fontSize: '1.125rem', fontWeight: '600', marginBottom: '0.5rem', color: '#1e293b'}}>Mass Schedule</h3>
              <p style={{color: '#64748b', marginBottom: '1rem', fontSize: '0.875rem', lineHeight: '1.4'}}>
                Sunday: 8:00 AM - 10:00 AM<br/>
                Evening: 6:00 PM - 7:30 PM<br/>
                Weekdays: 6:00 AM
              </p>
              <button style={{color: '#0ea5e9', fontWeight: '500', backgroundColor: 'transparent', border: 'none', cursor: 'pointer'}}>More details...</button>
            </div>
            
            <div className="hover-lift" style={{backgroundColor: '#ffffff', padding: '2rem', borderRadius: '1rem', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)', textAlign: 'center', width: '100%', maxWidth: '18rem'}}>
              <Book style={{width: '2rem', height: '2rem', color: '#0ea5e9', margin: '0 auto 1rem auto', display: 'block'}} />
              <h3 style={{fontSize: '1.125rem', fontWeight: '600', marginBottom: '0.5rem', color: '#1e293b'}}>Eucharistic Adoration</h3>
              <p style={{color: '#64748b', marginBottom: '1rem'}}>Special hours for prayer and reflection</p>
              <button style={{color: '#0ea5e9', fontWeight: '500', backgroundColor: 'transparent', border: 'none', cursor: 'pointer'}}>More details...</button>
            </div>
          </div>
        </section>

        {/* Saint Mary Magdalene Facts Section */}
        <section 
          id="about-saint"
          className="scroll-fade-in smooth-scroll-section"
          style={{marginBottom: '5rem', background: 'linear-gradient(to right, #f0f9ff, #e0f2fe)', borderRadius: '1rem', padding: '3rem', textAlign: 'center', width: '100%'}}
        >
          <h2 className="scroll-slide-up" style={{fontSize: '2.5rem', fontWeight: '700', color: '#0284c7', marginBottom: '3rem', textAlign: 'center', fontFamily: 'serif'}}>About Saint Mary Magdalene</h2>
          <div style={{maxWidth: '64rem', margin: '0 auto'}}>
            <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', alignItems: 'center', justifyItems: 'center'}}>
              <div className="scroll-slide-left">
                <img 
                  src="public/assets/images/sain_mm.jpeg" 
                  alt="Saint Mary Magdalene" 
                  style={{width: '100%', height: '20rem', objectFit: 'cover', borderRadius: '0.75rem', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)'}}
                />
              </div>
              <div className="scroll-stagger-children" style={{display: 'flex', flexDirection: 'column', gap: '1rem'}}>
                <div className="hover-lift" style={{backgroundColor: '#ffffff', padding: '1.5rem', borderRadius: '0.75rem', boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)'}}>
                  <h4 style={{fontWeight: '600', color: '#0284c7', marginBottom: '0.5rem', fontSize: '1rem'}}>✨ The Apostle to the Apostles</h4>
                  <p style={{color: '#64748b', fontSize: '0.875rem', lineHeight: '1.5', margin: 0}}>
                    Saint Mary Magdalene was the first person to witness Christ's resurrection and was commissioned by Jesus to announce this good news to the apostles.
                  </p>
                </div>
                <div className="hover-lift" style={{backgroundColor: '#ffffff', padding: '1.5rem', borderRadius: '0.75rem', boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)'}}>
                  <h4 style={{fontWeight: '600', color: '#0284c7', marginBottom: '0.5rem', fontSize: '1rem'}}>💝 Symbol of Redemption</h4>
                  <p style={{color: '#64748b', fontSize: '0.875rem', lineHeight: '1.5', margin: 0}}>
                    Her life represents the transformative power of God's love and forgiveness, showing that no one is beyond redemption.
                  </p>
                </div>
                <div className="hover-lift" style={{backgroundColor: '#ffffff', padding: '1.5rem', borderRadius: '0.75rem', boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)'}}>
                  <h4 style={{fontWeight: '600', color: '#0284c7', marginBottom: '0.5rem', fontSize: '1rem'}}>🙏 Devoted Follower</h4>
                  <p style={{color: '#64748b', fontSize: '0.875rem', lineHeight: '1.5', margin: 0}}>
                    She followed Jesus throughout his ministry, supported him financially, and remained faithful even at the cross when others fled.
                  </p>
                </div>
                <div className="hover-lift" style={{backgroundColor: '#ffffff', padding: '1.5rem', borderRadius: '0.75rem', boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)'}}>
                  <h4 style={{fontWeight: '600', color: '#0284c7', marginBottom: '0.5rem', fontSize: '1rem'}}>📅 Feast Day: July 22</h4>
                  <p style={{color: '#64748b', fontSize: '0.875rem', lineHeight: '1.5', margin: 0}}>
                    The Catholic Church celebrates her feast day on July 22nd, recognizing her as a saint and model of faith.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
        </div>
      </div>

      {/* Add custom styles for animations */}
      <style jsx>{`
        @keyframes bounce {
          0%, 20%, 53%, 80%, 100% {
            transform: translate3d(0, 0, 0);
          }
          40%, 43% {
            transform: translate3d(0, -30px, 0);
          }
          70% {
            transform: translate3d(0, -15px, 0);
          }
          90% {
            transform: translate3d(0, -4px, 0);
          }
        }
      `}</style>
    </div>
  );
};

export default Homepage;