import React, { useEffect, useRef } from 'react';
import { Church, Heart, Users, BookOpen, Calendar, MapPin, Phone, Mail, Sparkles, HandHeart, Star, Shield } from 'lucide-react';
import { assignedColors, sectionColors } from '../../utils/sectionColors';

const About = ({ onNavigate, scrollToSection }) => {
  const observerRef = useRef(null);

  // Initialize scroll animations
  useEffect(() => {
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

    const animatedElements = document.querySelectorAll(
      '.scroll-fade-in, .scroll-slide-up, .scroll-slide-left, .scroll-slide-right, .scroll-scale-in, .scroll-stagger-children'
    );

    animatedElements.forEach((el) => {
      observerRef.current.observe(el);
    });

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, []);

  return (
    <div className="about-main">
      {/* Hero Section */}
      <section id="about-hero" className="scroll-fade-in smooth-scroll-section about-hero">
        <div className="about-hero-overlay"></div>
        <div className="about-hero-content">
          <h1 className="scroll-slide-up about-hero-title">
            About Our church
            <span className="about-hero-subtitle">Saint Mary Magdalene church</span>
          </h1>
          <p className="scroll-slide-up about-hero-description">
            A sacred place of worship, pilgrimage, evangelization, and reconciliation in Redhills, Chennai
          </p>
        </div>
      </section>

      {/* Main Content */}
      <div className="about-main-content">
        <div className="about-container">
        
          {/* About the Church Section (New) */}
          <section id="about-us-intro" className="scroll-fade-in smooth-scroll-section about-intro" style={{backgroundColor: assignedColors.about}}>
            <div className="about-intro-content scroll-slide-up">
              <h2>Who We Are</h2>
              <p>
                Saint Mary Magdalene Church is more than just a building; it is a vibrant family of believers in Redhills, Chennai. We are united by our faith in Christ and our dedication to serving one another. Our community is a tapestry of different ages and backgrounds, woven together by love, prayer, and a shared mission to spread the Gospel. Whether you are a long-time parishioner or a first-time visitor, you will find a warm welcome and a spiritual home here.
              </p>
            </div>
          </section>

          {/* Church Story Section */}
          <section id="church-story" className="scroll-fade-in smooth-scroll-section church-story" style={{backgroundColor: assignedColors.church}}>
            <div className="church-story-grid">
              <div className="scroll-slide-left church-story-text">
                <h2>Our History</h2>
                {/* <p>
                  Saint Mary Magdalene church is a sacred place of worship dedicated to the beloved disciple who was the first witness to Christ's resurrection. Our church serves as a spiritual home for the faithful community in Redhills, Chennai.
                </p>
                <p>
                  Built with devotion and faith, our church stands as a testament to the enduring love and redemption that Saint Mary Magdalene represents. We welcome all who seek spiritual guidance, community, and the transformative power of God's love.
                </p> */}
                <p style={{ marginTop: '1rem', fontStyle: 'italic', color: '#475569' }}>
                  "இந்த திருச்சபை மாதவரத்திலிருந்து பிரிக்கப்பட்டு 1978 இல் கட்டப்பட்டது. இது பிரான்சிஸ்கன் மிஷனரிகளிடம் ஒப்படைக்கப்பட்டது. இந்த திருச்சபைக்கான நிலம் 1983 ஆம் ஆண்டு திருச்சபை ஜான் கொட்டாரம் அவர்களால் வாங்கப்பட்டது. புனித மேரி மகதலேனாவின் நினைவாக திருச்சபை தேவாலயம் 18 02 1985 அன்று பேராயர் மேதகு டாக்டர் ஆர் அருளப்பா அவர்களால் புனிதப்படுத்தப்பட்டது. இந்த தேவாலயத்தின் முதல் திருச்சபை பாதிரியார் அருட்தந்தை தாமஸ் முண்டக்கல் ஆவார்."
                </p>
              </div>
              <div className="scroll-slide-right church-story-image">
                <img src="/assets/images/SMMCR.jpg" alt="church Interior" />
              </div>
            </div>
          </section>

          {/* Parish Groups Sections */}
          <div className="parish-groups-container">
            <h2 className="section-header-title scroll-fade-in">Our Parish Groups</h2>
            
            {/* Youth Group */}
            <section id="group-youth" className="scroll-fade-in smooth-scroll-section group-section" style={{backgroundColor: sectionColors.lightCyan}}>
              <div className="group-content">
                <div className="group-icon-wrapper">
                  <Sparkles className="group-icon" />
                </div>
                <div className="group-text scroll-slide-right">
                  <h3>Youth Group (Illaignar Ani)</h3>
                  <p>
                    Our Youth Group is the energetic heartbeat of the parish, dedicated to spiritual growth and social service.
                  </p>
                  <button 
                    onClick={() => onNavigate('youth-group')} 
                    style={{
                      marginTop: '1rem',
                      padding: '0.75rem 1.5rem',
                      backgroundColor: '#0284c7',
                      color: 'white',
                      fontWeight: '600',
                      borderRadius: '0.5rem',
                      border: 'none',
                      cursor: 'pointer',
                      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                    }}
                  >
                    Learn More
                  </button>
                </div>
              </div>
            </section>

            {/* Vincent de Paul */}
            <section id="group-svp" className="scroll-fade-in smooth-scroll-section group-section" style={{backgroundColor: sectionColors.lightEmerald}}>
              <div className="group-content reverse">
                <div className="group-icon-wrapper">
                  <HandHeart className="group-icon" />
                </div>
                <div className="group-text scroll-slide-left">
                  <h3>Vincent de Paul Society</h3>
                  <p>
                    The charitable arm of our parish, serving the poor, the sick, and the marginalized within our community.
                  </p>
                  <button 
                    onClick={() => onNavigate('vincent-de-paul')} 
                    style={{
                      marginTop: '1rem',
                      padding: '0.75rem 1.5rem',
                      backgroundColor: '#059669',
                      color: 'white',
                      fontWeight: '600',
                      borderRadius: '0.5rem',
                      border: 'none',
                      cursor: 'pointer',
                      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                    }}
                  >
                    Learn More
                  </button>
                </div>
              </div>
            </section>

            {/* Mariyin Senai */}
            <section id="group-mary" className="scroll-fade-in smooth-scroll-section group-section" style={{backgroundColor: sectionColors.lightBlue}}>
              <div className="group-content">
                <div className="group-icon-wrapper">
                  <Star className="group-icon" />
                </div>
                <div className="group-text scroll-slide-right">
                  <h3>Mariyin Senai (Legion of Mary)</h3>
                  <p>
                    A lay apostolic association serving the Church and neighbor under the leadership of Mary Immaculate.
                  </p>
                  <button 
                    onClick={() => onNavigate('legion-of-mary')} 
                    style={{
                      marginTop: '1rem',
                      padding: '0.75rem 1.5rem',
                      backgroundColor: '#2563eb',
                      color: 'white',
                      fontWeight: '600',
                      borderRadius: '0.5rem',
                      border: 'none',
                      cursor: 'pointer',
                      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                    }}
                  >
                    Learn More
                  </button>
                </div>
              </div>
            </section>

            {/* Valanar */}
            <section id="group-valanar" className="scroll-fade-in smooth-scroll-section group-section" style={{backgroundColor: sectionColors.lightOrange}}>
              <div className="group-content reverse">
                <div className="group-icon-wrapper">
                  <Shield className="group-icon" />
                </div>
                <div className="group-text scroll-slide-left">
                  <h3>Valanar Sabai (St. Joseph's Group)</h3>
                  <p>
                    Fostering spirituality and brotherhood among men, emulating the virtues of St. Joseph.
                  </p>
                  <button 
                    onClick={() => onNavigate('st-joseph-group')} 
                    style={{
                      marginTop: '1rem',
                      padding: '0.75rem 1.5rem',
                      backgroundColor: '#ca8a04',
                      color: 'white',
                      fontWeight: '600',
                      borderRadius: '0.5rem',
                      border: 'none',
                      cursor: 'pointer',
                      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                    }}
                  >
                    Learn More
                  </button>
                </div>
              </div>
            </section>
          </div>

          {/* Features Section */}
          <section id="church-features" className="scroll-fade-in smooth-scroll-section church-features" style={{backgroundColor: assignedColors.quickLinks}}>
            <h2 className="scroll-slide-up church-features-title">Our church Features</h2>
            <div className="scroll-stagger-children features-grid">
              <div className="feature-card">
                <Church className="feature-icon" />
                <h3>Sacred Architecture</h3>
                <p>Beautiful design reflecting our faith and devotion</p>
              </div>
              <div className="feature-card">
                <Heart className="feature-icon" />
                <h3>Prayer Spaces</h3>
                <p>Dedicated areas for contemplation and worship</p>
              </div>
              <div className="feature-card">
                <Users className="feature-icon" />
                <h3>Community Hall</h3>
                <p>Space for fellowship and community gatherings</p>
              </div>
              <div className="feature-card">
                <BookOpen className="feature-icon" />
                <h3>Religious Library</h3>
                <p>Collection of spiritual books and resources</p>
              </div>
            </div>
          </section>

          {/* Mission & Values */}
          <section id="mission-values" className="scroll-fade-in smooth-scroll-section mission-values">
            <div className="mission-card scroll-slide-left hover-lift" style={{backgroundColor: assignedColors.history}}>
              <h3>Our Mission</h3>
              <p>To spread the love of Christ through worship, service, and community fellowship. We strive to be a beacon of hope and faith in our neighborhood, following the example of Saint Mary Magdalene's devotion.</p>
            </div>
            <div className="values-card scroll-slide-right hover-lift" style={{backgroundColor: assignedColors.schedule}}>
              <h3>Our Values</h3>
              <p>Faith, Love, Service, and Community guide everything we do. We believe in the transformative power of God's grace and the importance of supporting one another in our spiritual journey.</p>
            </div>
          </section>

          {/* Contact Information */}
          <section id="contact-info" className="scroll-fade-in smooth-scroll-section contact-info" style={{backgroundColor: assignedColors.aboutSaint}}>
            <h2 className="scroll-slide-up contact-title">Visit Us</h2>
            <div className="scroll-stagger-children contact-grid">
              <div className="contact-card hover-lift">
                <MapPin className="contact-icon"/>
                <div>
                  <p className="contact-label">Address</p>
                  <p className="contact-info">
                    <a 
                      href="https://maps.app.goo.gl/4zitN6vtu4G89oXz6" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      style={{color: 'inherit', textDecoration: 'none'}}
                    >
                      Saint Mary Magdalene Church, Redhills, Chennai, Tamil Nadu
                    </a>
                  </p>
                </div>
              </div>
              <div className="contact-card hover-lift">
                <Phone className="contact-icon"/>
                <div>
                  <p className="contact-label">Phone</p>
                  <p className="contact-info">+91 1234567890</p>
                </div>
              </div>
              <div className="contact-card hover-lift">
                <Mail className="contact-icon"/>
                <div>
                  <p className="contact-label">Email</p>
                  <p className="contact-info">info@smmchurch.org</p>
                </div>
              </div>
              <div className="contact-card hover-lift">
                <Calendar className="contact-icon"/>
                <div>
                  <p className="contact-label">Office Hours</p>
                  <p className="contact-info">Mon-Sat: 9AM-5PM</p>
                </div>
              </div>
            </div>
            <div className="scroll-slide-up contact-footer-text">
              <p>Experience faith, community, and the inspiring legacy of Saint Mary Magdalene in our welcoming church.</p>
            </div>
          </section>

        </div>
      </div>

      <style>{`
        .about-main {
          min-height: 100vh;
          background-color: #ffffff;
          width: 100%;
        }
        /* Hero */
        .about-hero {
          position: relative;
          background: linear-gradient(135deg, #0ea5e9 0%, #0284c7 50%, #0369a1 100%);
          color: white;
          padding: 4rem 1rem;
          width: 100%;
          display: flex;
          justify-content: center;
          overflow: hidden;
        }
        .about-hero-overlay {
          position: absolute; top: 0; left: 0; right: 0; bottom: 0;
          background-color: rgba(255, 255, 255, 0.1);
          pointer-events: none;
        }
        .about-hero-content {
          position: relative;
          max-width: 72rem;
          margin: 0 auto;
          text-align: center;
        }
        .about-hero-title {
          font-size: 3rem;
          font-weight: 700;
          margin-bottom: 1rem;
          line-height: 1.1;
          font-family: serif;
        }
        .about-hero-subtitle {
          display: block;
          font-size: 1.5rem;
          font-weight: 300;
          margin-top: 0.5rem;
          color: #e0f2fe;
        }
        .about-hero-description {
          font-size: 1.125rem;
          margin-bottom: 2rem;
          max-width: 48rem;
          margin-left: auto;
          margin-right: auto;
          line-height: 1.7;
          text-align: center;
          color: #e0f2fe;
        }
        /* Main Content */
        .about-main-content {
          width: 100%;
          padding: 4rem 1rem;
          background-color: #f8fafc;
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        .about-container {
          max-width: 80rem;
          width: 100%;
          margin: 0 auto;
        }
        /* Church Story */
        .church-story {
          margin-bottom: 4rem;
          padding: clamp(1.5rem, 4vw, 3rem) clamp(1rem, 3vw, 2rem);
          border-radius: 1rem;
          box-shadow: 0 10px 25px -3px rgba(0,0,0,0.1);
          display: block;
        }
        .church-story-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(min(100%, 300px), 1fr));
          gap: clamp(1.5rem, 4vw, 3rem);
          align-items: center;
        }
        .church-story-text h2 {
          font-size: clamp(1.75rem, 4vw, 2.5rem);
          font-weight: 700;
          color: #0284c7;
          margin-bottom: 2rem;
          font-family: serif;
        }
        .church-story-text p {
          color: #64748b;
          margin-bottom: 1.5rem;
          font-size: clamp(1rem, 2.5vw, 1.125rem);
          line-height: 1.7;
        }
        .church-story-text p:last-child {
          margin-bottom: 2rem;
        }
        .church-story-image {
          text-align: center;
        }
        .church-story-image img {
          width: 100%;
          max-width: 28rem;
          height: clamp(15rem, 40vw, 20rem);
          object-fit: cover;
          border-radius: 1rem;
          box-shadow: 0 10px 25px -3px rgba(0,0,0,0.1);
        }
        /* Features Section */
        .church-features {
          margin-bottom: 4rem;
          padding: 3rem 2rem;
          border-radius: 1rem;
          box-shadow: 0 10px 25px -3px rgba(0,0,0,0.1);
        }
        .church-features-title {
          font-size: 2.5rem;
          font-weight: 700;
          color: #0284c7;
          margin-bottom: 3rem;
          text-align: center;
          font-family: serif;
        }
        .features-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 2rem;
        }
        .feature-card {
          background-color: #e0f2fe;
          padding: 2rem;
          border-radius: 1rem;
          border: 1px solid #0ea5e9;
          text-align: center;
        }
        .feature-icon {
          width: 3rem;
          height: 3rem;
          color: #0284c7;
          margin: 0 auto 1rem auto;
          display: block;
        }
        .feature-card h3 {
          font-size: 1.25rem;
          font-weight: 600;
          margin-bottom: 1rem;
          color: #0284c7;
          font-family: serif;
        }
        .feature-card p {
          color: #0369a1;
          line-height: 1.6;
        }
        /* Mission & Values */
        .mission-values {
          margin-bottom: 4rem;
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(min(100%, 280px), 1fr));
          gap: clamp(1rem, 3vw, 2rem);
        }
        .mission-card, .values-card {
          padding: clamp(1.5rem, 4vw, 3rem) clamp(1rem, 3vw, 2rem);
          border-radius: 1rem;
          box-shadow: 0 10px 25px -3px rgba(0,0,0,0.1);
          word-wrap: break-word;
        }
        .mission-card {
          border: 1px solid #0ea5e9;
        }
        .values-card {
          border: 1px solid #0ea5e9;
        }
        .mission-card h3, .values-card h3 {
          font-size: clamp(1.5rem, 4vw, 2rem);
          font-weight: 700;
          color: #0284c7;
          margin-bottom: clamp(1rem, 3vw, 2rem);
          font-family: serif;
        }
        .mission-card p, .values-card p {
          color: #64748b;
          font-size: clamp(1rem, 2.5vw, 1.125rem);
          line-height: 1.7;
        }
        /* Contact Information */
        .contact-info {
          padding: clamp(1.5rem, 4vw, 3rem) clamp(1rem, 3vw, 2rem);
          border-radius: 1rem;
          border: 1px solid #0ea5e9;
          box-shadow: 0 10px 25px -3px rgba(0,0,0,0.1);
        }
        .contact-title {
          font-size: clamp(1.75rem, 5vw, 2.5rem);
          font-weight: 700;
          color: #0284c7;
          margin-bottom: clamp(1.5rem, 4vw, 3rem);
          text-align: center;
          font-family: serif;
        }
        .contact-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(min(100%, 220px), 1fr));
          gap: clamp(1rem, 3vw, 2rem);
          margin-bottom: clamp(1rem, 3vw, 2rem);
        }
        .contact-card {
          background-color: #ffffff;
          padding: clamp(1rem, 3vw, 1.5rem);
          border-radius: 0.75rem;
          display: flex;
          align-items: center;
          gap: 1rem;
          word-wrap: break-word;
          overflow-wrap: break-word;
        }
        .contact-icon {
          width: 2rem;
          height: 2rem;
          color: #0284c7;
          flex-shrink: 0;
          min-width: 2rem;
        }
        .contact-label {
          font-weight: 600;
          color: #0284c7;
          margin-bottom: 0.25rem;
          font-size: clamp(0.875rem, 2vw, 1rem);
        }
        .contact-info {
          color: #0369a1;
          font-size: clamp(0.813rem, 2vw, 0.875rem);
          word-break: break-word;
        }
        .contact-info a {
          transition: all 0.2s ease;
          display: inline-block;
        }
        .contact-info a:hover {
          color: #0284c7;
          text-decoration: underline;
          transform: translateX(2px);
        }
        .contact-footer-text {
          text-align: center;
          padding: 0 1rem;
        }
        .contact-footer-text p {
          font-size: clamp(1rem, 2.5vw, 1.125rem);
          color: #0369a1;
          margin-bottom: 1.5rem;
          line-height: 1.6;
        }

        /* About Intro New Section */
        .about-intro {
          margin-bottom: 4rem;
          padding: 4rem 2rem;
          border-radius: 1rem;
          box-shadow: 0 10px 25px -3px rgba(0,0,0,0.1);
          text-align: center;
        }
        .about-intro h2 {
          font-size: clamp(2rem, 4vw, 2.5rem);
          font-weight: 700;
          color: #d97706; /* Amber-600 */
          margin-bottom: 1.5rem;
          font-family: serif;
        }
        .about-intro p {
          color: #4b5563;
          max-width: 60rem;
          margin: 0 auto;
          font-size: 1.125rem;
          line-height: 1.8;
        }

        /* Parish Groups */
        .parish-groups-container {
          width: 100%;
          margin-bottom: 4rem;
        }
        .section-header-title {
          font-size: 2.5rem;
          font-weight: 700;
          color: #0f172a;
          text-align: center;
          margin-bottom: 3rem;
          font-family: serif;
        }
        .group-section {
          margin-bottom: 2rem;
          padding: 3rem 2rem;
          border-radius: 1rem;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
          transition: transform 0.3s ease;
        }
        .group-section:hover {
          transform: translateY(-5px);
        }
        .group-content {
          display: flex;
          align-items: center;
          gap: 3rem;
          max-width: 70rem;
          margin: 0 auto;
        }
        .group-content.reverse {
          flex-direction: row-reverse;
        }
        .group-icon-wrapper {
          flex-shrink: 0;
          width: 80px;
          height: 80px;
          background: white;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
        }
        .group-icon {
          width: 40px;
          height: 40px;
          color: #0284c7;
        }
        .group-text {
          flex: 1;
        }
        .group-text h3 {
          font-size: 1.75rem;
          font-weight: 700;
          color: #1e293b;
          margin-bottom: 1rem;
          font-family: serif;
        }
        .group-text p {
          color: #475569;
          font-size: 1.1rem;
          line-height: 1.7;
        }
        @media (max-width: 768px) {
          .group-content, .group-content.reverse {
            flex-direction: column;
            text-align: center;
            gap: 1.5rem;
          }
        }
      `}</style>
    </div>
  );
};

export default About;
