import React, { useEffect, useRef } from 'react';
import { Calendar, Clock, Users, Book, Heart, Youtube, Camera, MapPin } from 'lucide-react';
import BannerSlider from './BannerSlider';

const Homepage = ({ openModal }) => {
  const observerRef = useRef(null);

  const tamilHistory = "இந்த திருச்சபை மாதவரத்திலிருந்து பிரிக்கப்பட்டு 1978 இல் கட்டப்பட்டது. இது பிரான்சிஸ்கன் மிஷனரிகளிடம் ஒப்படைக்கப்பட்டது. இந்த திருச்சபைக்கான நிலம் 1983 ஆம் ஆண்டு திருச்சபை ஜான் கொட்டாரம் அவர்களால் வாங்கப்பட்டது. புனித மேரி மகதலேனாவின் நினைவாக திருச்சபை தேவாலயம் 18 02 1985 அன்று பேராயர் மேதகு டாக்டர் ஆர் அருளப்பா அவர்களால் புனிதப்படுத்தப்பட்டது. இந்த தேவாலயத்தின் முதல் திருச்சபை பாதிரியார் அருட்தந்தை தாமஸ் முண்டக்கல் ஆவார்.";

  const handleReadMore = (type) => {
    if (type === 'heritage') {
      openModal('Church History', tamilHistory);
    } else if (type === 'saint') {
      openModal(
        'புனித மேரி மகதலேனா', 
        'புனித மரிய மகதலேனா இயேசுவின் தீவிர சீடர்களில் ஒருவர். இயேசுவால் ஏழு பேய்களிலிருந்து விடுவிக்கப்பட்டவர். இயேசுவின் சிலுவைப்பாடுகளின் போதும், அடக்கத்தின் போதும் உடனிருந்தவர். இயேசுவின் உயிர்ப்பை முதன்முதலில் கண்டவரும், அதைச் சீடர்களுக்கு அறிவித்தவரும் இவரே. எனவே இவர் "திருத்தூதர்களுக்கெல்லாம் திருத்தூதர்" என்று அழைக்கப்படுகிறார். இவர் மனந்திரும்புதலுக்கும், இறை அன்புக்கும் சிறந்த எடுத்துக்காட்டாவார்.'
      );
    }
  };



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

  const assignedColors = {
    church: '#f0f9ff',
    quickLinks: '#f8fafc',
    history: '#e0f2fe',
    schedule: '#f5f3ff',
    aboutSaint: '#fef3c7'
  };

  return (
    <div className="homepage-container">
      {/* Hero Section - Banner */}
      {/* Hero Section - Banner */}
      <BannerSlider />

      {/* Main Content */}
      <div className="main-content">
        <div className="content-wrapper">
          {/* Church Section */}
          <section
            id="church-section"
            className="scroll-fade-in smooth-scroll-section church-section"
            style={{ backgroundColor: assignedColors.church }}
          >
            <h2 className="scroll-slide-up section-title">
              Saint Mary Magdalene Church
            </h2>
            <div className="church-grid">
              <div className="scroll-slide-left church-image-container">
                <img
                  src="public/assets/images/smm.jpg"
                  className="church-image"
                />
              </div>
              <div className="scroll-slide-right church-text">
                <p className="church-paragraph">
                  The church serves as a sacred place of worship, pilgrimage, evangelization, and reconciliation,
                  fulfilling its mission with great dedication. We trust that you will find the information on this
                  site valuable, especially if you are planning a pilgrimage to our church.
                </p>
                <p className="church-paragraph">
                  As the heart of our parish, the church serves as the spiritual home to nearly 1,600 families.
                  It is a vibrant community of faith, welcoming over 200,000 visitors each year.
                </p>
                <p className="church-paragraph">
                  We offer three daily Masses and more than five hours of confessions each day, along with a
                  Catholic bookstore to serve the needs of our visitors.
                </p>
              </div>
            </div>
          </section>

          
          {/* About Saint Mary Magdalene Section */}
          <section
            id="about-saint"
            className="scroll-fade-in smooth-scroll-section about-saint-section"
            style={{ backgroundColor: assignedColors.aboutSaint }}
          >
            <h2 className="scroll-slide-up section-title">About Saint Mary Magdalene</h2>
            <div className="about-content">
              <div className="scroll-slide-left about-image-container">
                <img
                  src="public/assets/images/mary2.jpg"
                  alt="Saint Mary Magdalene"
                  className="about-image"
                />
              </div>
              <div className="scroll-stagger-children about-features">
                <div className="hover-lift feature-box">
                  <h4 className="feature-title">✨ The Apostle to the Apostles</h4>
                  <p className="feature-text">
                    The first to witness Christ's resurrection, she was entrusted with sharing the joyous news with the apostles.
                  </p>
                </div>
                <div className="hover-lift feature-box">
                  <h4 className="feature-title"> Symbol of Redemption</h4>
                  <p className="feature-text">
                    Her life shows how God's love can transform and heal, inspiring hope for all who seek forgiveness.
                  </p>
                </div>
                <div className="hover-lift feature-box">
                  <h4 className="feature-title"> Devoted Follower</h4>
                  <p className="feature-text">
                    Mary Magdalene stayed by Jesus through his ministry and at the cross, remaining faithful to the end.
                  </p>
                </div>
                <div className="hover-lift feature-box">
                  <h4 className="feature-title"> Feast Day: July 22</h4>
                  <p className="feature-text">
                    Celebrated by the Church on July 22nd, she remains a shining example of faith and devotion.
                  </p>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
          {/* History Section */}
          <section
            id="history"
            className="scroll-fade-in smooth-scroll-section history-section"
            style={{ backgroundColor: assignedColors.history }}
          >
            <h2 className="scroll-slide-up section-title">Our History & Heritage</h2>
            <div className="scroll-stagger-children history-grid">
              <div className="hover-lift history-card" onClick={() => handleReadMore('saint')}>
                <img
                  src="public/assets/images/mary1.jpg"
                  alt="Saint Mary Magdalene"
                  className="history-image"
                />
                <h3 className="history-card-title">Saint Mary Magdalene</h3>
                <p className="history-card-text">
                  Known as the "Apostle to the Apostles," she was the first witness to Christ's resurrection and a symbol of redemption and unwavering faith.
                </p>
                <span className="read-more-button">Read More →</span>
              </div>
              <div className="hover-lift history-card" onClick={() => handleReadMore('heritage')}>
                <img
                  src="public/assets/images/smm.jpg"
                  alt="church Heritage"
                  className="history-image"
                />
                <h3 className="history-card-title">Church Heritage</h3>
                <p className="history-card-text">
                  Our church stands as a testament to faith, serving the community of Redhills with devotion, prayer, and spiritual guidance for generations.
                </p>
                <span className="read-more-button">Read More →</span>
              </div>
            </div>
          </section>

          {/* Schedule Section */}
          <section
            id="schedule"
            className="scroll-fade-in smooth-scroll-section schedule-section"
            style={{ backgroundColor: assignedColors.schedule }}
          >
            <h2 className="scroll-slide-up section-title">Our Schedule</h2>
            <div className="scroll-stagger-children schedule-grid">
              <div className="hover-lift schedule-card">
                <Clock className="schedule-icon" />
                <h3 className="schedule-card-title">Visiting Hours</h3>
                <p className="schedule-card-time">Daily: 6:00 AM - 8:00 PM</p>
                <button className="schedule-button">More details...</button>
              </div>
              <div className="hover-lift schedule-card">
                <Users className="schedule-icon" />
                <h3 className="schedule-card-title">Mass Schedule</h3>
                <div className="mass-times">
                  <p>Sunday: 8:00 AM - 10:00 AM</p>
                  <p>Evening: 6:00 PM - 7:30 PM</p>
                  <p>Weekdays: 6:00 AM</p>
                </div>
                <button className="schedule-button">More details...</button>
              </div>
              <div className="hover-lift schedule-card">
                <Heart className="schedule-icon" />
                <h3 className="schedule-card-title">Special Devotions</h3>
                <p className="schedule-card-time">Various times throughout the week</p>
                <button className="schedule-button">More details...</button>
              </div>
              <div className="hover-lift schedule-card">
                <Book className="schedule-icon" />
                <h3 className="schedule-card-title">Eucharistic Adoration</h3>
                <p className="schedule-card-time">Special hours for prayer and reflection</p>
                <button className="schedule-button">More details...</button>
              </div>
            </div>
          </section>

      {/* Quick Links Section */}
          <section
            id="quick-links"
            className="scroll-fade-in smooth-scroll-section quick-links-section"
            style={{ backgroundColor: assignedColors.quickLinks }}
          >
            <h2 className="scroll-slide-up section-title">Quick Links</h2>
            <div className="scroll-stagger-children quick-links-grid">
              <div className="hover-lift quick-link-card">
                <Calendar className="quick-link-icon" />
                <h3 className="quick-link-title">News & Events</h3>
                <p className="quick-link-description">Stay updated with our latest news and upcoming events</p>
                <button className="quick-link-button">Read More →</button>
              </div>
              <div className="hover-lift quick-link-card">
                <Youtube className="quick-link-icon" />
                <h3 className="quick-link-title">YouTube Channel</h3>
                <p className="quick-link-description">Watch our services and spiritual content online</p>
                <button className="quick-link-button" onClick={() => window.open('https://www.youtube.com', '_blank')}>View Channel →</button>
              </div>
              <div className="hover-lift quick-link-card">
                <Camera className="quick-link-icon" />
                <h3 className="quick-link-title">Our Gallery</h3>
                <p className="quick-link-description">Explore photos and videos from our church community</p>
                <button className="quick-link-button">View Gallery →</button>
              </div>
              <div className="hover-lift quick-link-card">
                <Book className="quick-link-icon" />
                <h3 className="quick-link-title">Our Prayers</h3>
                <p className="quick-link-description">Find prayers in English and Tamil for your spiritual journey</p>
                <button className="quick-link-button">View Prayers →</button>
              </div>
              <div className="hover-lift quick-link-card">
                <MapPin className="quick-link-icon" />
                <h3 className="quick-link-title">Our Location</h3>
                <p className="quick-link-description">Visit us at Redhills, Chennai - Find directions</p>
                <button className="quick-link-button" onClick={() => window.open('https://maps.app.goo.gl/4zitN6vtu4G89oXz6', '_blank')}>View Location →</button>
              </div>
              <div className="hover-lift quick-link-card">
                <Heart className="quick-link-icon" />
                <h3 className="quick-link-title">Contact Us</h3>
                <p className="quick-link-description">Get in touch with us for any queries or support</p>
                <button className="quick-link-button">Contact →</button>
              </div>
            </div>
          </section>



      <style>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        /* Hero Section */
        .hero-section {
          width: 100%;
          background: linear-gradient(135deg, #0284c7 0%, #0ea5e9 100%);
          color: white;
          padding: 4rem 2rem;
          text-align: center;
          min-height: 400px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .hero-content {
          max-width: 700px;
        }

        .hero-title {
          font-size: clamp(2rem, 5vw, 3.5rem);
          font-weight: 700;
          margin-bottom: 1rem;
          font-family: serif;
        }

        .hero-subtitle {
          font-size: clamp(1rem, 3vw, 1.5rem);
          margin-bottom: 2rem;
          opacity: 0.95;
          line-height: 1.6;
        }

        .hero-address {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          font-size: 1.1rem;
        }

        /* Main Layout */
        .homepage-container {
          min-height: 100vh;
          background-color: #ffffff;
          width: 100%;
        }

        .main-content {
          width: 100%;
          padding: clamp(2rem, 5vw, 4rem) clamp(1rem, 3vw, 2rem);
          background-color: #f8fafc;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .content-wrapper {
          max-width: 1200px;
          width: 100%;
          margin: 0 auto;
        }

        /* Section Styles */
        .smooth-scroll-section {
          margin-bottom: clamp(2rem, 5vw, 5rem);
          width: 100%;
          border-radius: 1rem;
          padding: clamp(2rem, 4vw, 3rem);
          overflow: hidden;
        }

        .section-title {
          font-size: clamp(1.75rem, 4vw, 2.5rem);
          font-weight: 700;
          color: #0284c7;
          margin-bottom: clamp(1.5rem, 3vw, 3rem);
          text-align: center;
          font-family: serif;
        }

        /* Church Section */
        .church-section {
          box-shadow: 0 10px 25px -3px rgba(0, 0, 0, 0.1);
        }

        .church-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: clamp(1.5rem, 3vw, 3rem);
          align-items: center;
        }

        .church-image-container {
          background-color: #f8fafc;
          border-radius: 1rem;
          padding: clamp(1rem, 2vw, 2rem);
          border: 1px solid #e2e8f0;
        }

        .church-image {
          width: 100%;
          height: clamp(200px, 40vw, 350px);
          object-fit: cover;
          border-radius: 0.75rem;
        }

        .church-text {
          text-align: left;
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .church-paragraph {
          color: #64748b;
          font-size: clamp(0.95rem, 2vw, 1.125rem);
          line-height: 1.7;
        }

        /* Quick Links Section */
        .quick-links-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: clamp(1.5rem, 3vw, 2rem);
          justify-items: center;
        }

        .quick-link-card {
          background-color: #ffffff;
          padding: clamp(1.5rem, 3vw, 2rem);
          border-radius: 1rem;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
          border: 1px solid #e2e8f0;
          text-align: center;
          width: 100%;
          transition: all 0.3s ease;
        }

        .quick-link-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.15);
        }

        .quick-link-icon {
          width: clamp(2.5rem, 5vw, 3rem);
          height: clamp(2.5rem, 5vw, 3rem);
          color: #0ea5e9;
          margin: 0 auto 1rem;
          display: block;
        }

        .quick-link-title {
          font-size: clamp(1rem, 2vw, 1.25rem);
          font-weight: 600;
          margin-bottom: 0.75rem;
          color: #1e293b;
        }

        .quick-link-description {
          color: #64748b;
          margin-bottom: 1rem;
          line-height: 1.6;
          font-size: clamp(0.875rem, 1.5vw, 1rem);
        }

        .quick-link-button {
          color: #0ea5e9;
          font-weight: 500;
          background-color: transparent;
          border: none;
          cursor: pointer;
          transition: color 0.3s;
        }

        .quick-link-button:hover {
          color: #0284c7;
        }

        /* History Section */
        .history-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: clamp(1.5rem, 3vw, 2rem);
          justify-items: center;
          margin: 0 auto;
        }

        .history-card {
          background-color: #ffffff;
          border-radius: 1rem;
          overflow: hidden;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
          border: 1px solid #e2e8f0;
          text-align: center;
          width: 100%;
          max-width: 350px;
          transition: all 0.3s ease;
          cursor: pointer;
        }

        .history-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.15);
        }

        .history-image {
          width: 100%;
          height: 200px;
          object-fit: cover;
        }

        .history-card-title {
          font-size: clamp(1.1rem, 2vw, 1.25rem);
          font-weight: 600;
          margin-bottom: 0.75rem;
          color: #1e293b;
          padding: 1rem 1rem 0;
        }

        .history-card-text {
          color: #64748b;
          line-height: 1.6;
          margin-bottom: 1rem;
          padding: 0 1rem;
          font-size: clamp(0.875rem, 1.5vw, 1rem);
        }

        .read-more-button {
          color: #0ea5e9;
          font-weight: 500;
          background-color: transparent;
          border: none;
          cursor: pointer;
          padding: 0 1rem 1rem;
          transition: color 0.3s;
        }

        .read-more-button:hover {
          color: #0284c7;
        }

        /* Schedule Section */
        .schedule-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
          gap: clamp(1.5rem, 3vw, 2rem);
          justify-items: center;
        }

        .schedule-card {
          background-color: #ffffff;
          padding: clamp(1.5rem, 3vw, 2rem);
          border-radius: 1rem;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
          text-align: center;
          width: 100%;
          max-width: 250px;
          transition: all 0.3s ease;
        }

        .schedule-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.15);
        }

        .schedule-icon {
          width: clamp(2rem, 4vw, 2.5rem);
          height: clamp(2rem, 4vw, 2.5rem);
          color: #0ea5e9;
          margin: 0 auto 1rem;
          display: block;
        }

        .schedule-card-title {
          font-size: clamp(1rem, 1.8vw, 1.125rem);
          font-weight: 600;
          margin-bottom: 0.75rem;
          color: #1e293b;
        }

        .schedule-card-time {
          color: #64748b;
          margin-bottom: 0.75rem;
          font-size: clamp(0.875rem, 1.5vw, 1rem);
        }

        .mass-times {
          color: #64748b;
          margin-bottom: 1rem;
          font-size: clamp(0.8rem, 1.3vw, 0.9rem);
          line-height: 1.5;
        }

        .mass-times p {
          margin: 0.25rem 0;
        }

        .schedule-button {
          color: #0ea5e9;
          font-weight: 500;
          background-color: transparent;
          border: none;
          cursor: pointer;
          font-size: clamp(0.875rem, 1.5vw, 1rem);
        }

        /* About Section */
        .about-content {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: clamp(2rem, 4vw, 3rem);
          align-items: start;
          max-width: 1000px;
          margin: 0 auto;
        }

        .about-image-container {
          display: flex;
          justify-content: center;
        }

        .about-image {
          width: 100%;
          max-width: 350px;
          height: auto;
          border-radius: 0.75rem;
          box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
        }

        .about-features {
          display: flex;
          flex-direction: column;
          gap: clamp(1rem, 2vw, 1.5rem);
        }

        .feature-box {
          background-color: #ffffff;
          padding: clamp(1.25rem, 2.5vw, 1.5rem);
          border-radius: 0.75rem;
          box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1);
          transition: all 0.3s ease;
        }

        .feature-box:hover {
          transform: translateX(5px);
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.15);
        }

        .feature-title {
          font-weight: 600;
          color: #0284c7;
          margin-bottom: 0.5rem;
          font-size: clamp(0.95rem, 1.8vw, 1.1rem);
        }

        .feature-text {
          color: #64748b;
          font-size: clamp(0.85rem, 1.5vw, 0.95rem);
          line-height: 1.5;
          margin: 0;
        }

        /* Animations */
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slideLeft {
          from {
            opacity: 0;
            transform: translateX(-30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes slideRight {
          from {
            opacity: 0;
            transform: translateX(30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        .scroll-fade-in.animate,
        .scroll-slide-up.animate,
        .scroll-slide-left.animate,
        .scroll-slide-right.animate {
          opacity: 1;
          transform: none;
        }

        .scroll-fade-in {
          opacity: 0;
          animation: fadeIn 0.6s ease-out forwards;
        }

        .scroll-slide-up {
          opacity: 0;
          animation: slideUp 0.6s ease-out forwards;
        }

        .scroll-slide-left {
          opacity: 0;
          animation: slideLeft 0.6s ease-out forwards;
        }

        .scroll-slide-right {
          opacity: 0;
          animation: slideRight 0.6s ease-out forwards;
        }

        .hover-lift {
          transition: all 0.3s ease;
        }

        .hover-lift:hover {
          transform: translateY(-5px);
        }

        /* Tablet Responsive */
        @media (max-width: 768px) {
          .hero-section {
            padding: 3rem 1.5rem;
            min-height: 300px;
          }

          .main-content {
            padding: 1.5rem 1rem;
          }

          .church-grid {
            grid-template-columns: 1fr;
          }

          .church-text {
            text-align: left;
          }

          .quick-links-grid {
            grid-template-columns: 1fr;
          }

          .quick-link-card {
            max-width: 100%;
          }

          .history-grid {
            grid-template-columns: 1fr;
          }

          .history-card {
            max-width: 100%;
          }

          .schedule-grid {
            grid-template-columns: repeat(2, 1fr);
          }

          .schedule-card {
            max-width: 100%;
          }

          .about-content {
            grid-template-columns: 1fr;
          }

          .about-image {
            max-width: 100%;
          }
        }

        /* Mobile Responsive */
        @media (max-width: 480px) {
          .hero-section {
            padding: 2rem 1rem;
            min-height: 250px;
          }

          .main-content {
            padding: 1rem 0.75rem;
          }

          .smooth-scroll-section {
            padding: 1.5rem 1rem;
            margin-bottom: 2rem;
            border-radius: 0.75rem;
          }

          .section-title {
            font-size: 1.5rem;
            margin-bottom: 1.5rem;
          }

          .quick-links-grid {
            grid-template-columns: 1fr;
          }

          .history-grid {
            grid-template-columns: 1fr;
          }

          .history-image {
            height: 150px;
          }

          .schedule-grid {
            grid-template-columns: 1fr;
          }

          .schedule-card {
            max-width: 100%;
            padding: 1.25rem;
          }



          .about-features {
            gap: 1rem;
          }

          .feature-box {
            padding: 1rem;
          }

          .hero-address {
            font-size: 1rem;
          }
        }

        /* Small Mobile */
        @media (max-width: 360px) {
          .hero-title {
            font-size: 1.5rem;
          }

          .hero-subtitle {
            font-size: 0.9rem;
          }

          .section-title {
            font-size: 1.3rem;
          }

          .quick-link-title {
            font-size: 1rem;
          }

          .schedule-card {
            padding: 1rem;
          }
        }
      `}</style>
    </div>
  );
};

export default Homepage;