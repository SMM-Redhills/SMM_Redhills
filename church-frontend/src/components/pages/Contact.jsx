import React, { useState, useEffect, useRef } from 'react';
import { MapPin, Phone, Clock, Mail, Users, Heart, Cross } from 'lucide-react';
import ReCAPTCHA from 'react-google-recaptcha';
import { churchAPI } from '../../services/api';
import { assignedColors } from '../../utils/sectionColors';

const Contact = () => {
  const observerRef = useRef(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'General Inquiry',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [recaptchaValue, setRecaptchaValue] = useState(null);

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!recaptchaValue) {
      setMessage('Please complete the reCAPTCHA verification.');
      return;
    }
    
    setLoading(true);
    
    try {
      await churchAPI.submitContact({ ...formData, recaptcha: recaptchaValue });
      setMessage('Message sent successfully! We will get back to you soon.');
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: 'General Inquiry',
        message: ''
      });
      setRecaptchaValue(null);
    } catch (error) {
      setMessage('Error sending message. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div style={{minHeight: '100vh', backgroundColor: '#ffffff', width: '100%'}}>
      {/* Hero Section */}
      <section 
        id="contact-hero"
        className="scroll-fade-in smooth-scroll-section"
        style={{position: 'relative', background: 'linear-gradient(135deg, #0ea5e9 0%, #0284c7 50%, #0369a1 100%)', color: 'white', padding: '4rem 1rem', width: '100%', display: 'flex', justifyContent: 'center'}}
      >
        <div style={{position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(255,255,255,0.1)'}}></div>
        <div style={{position: 'relative', maxWidth: '72rem', margin: '0 auto', textAlign: 'center'}}>
          <div className="scroll-scale-in" style={{marginBottom: '2rem'}}>
            <Cross style={{width: '3rem', height: '3rem', margin: '0 auto 1rem auto', color: '#ffffff', display: 'block'}} />
          </div>
          <h1 className="scroll-slide-up" style={{fontSize: '3rem', fontWeight: '700', marginBottom: '1rem', lineHeight: '1.1', textAlign: 'center', fontFamily: 'serif'}}>
            Contact Us
            <span style={{display: 'block', fontSize: '1.5rem', fontWeight: '300', marginTop: '0.5rem', color: '#e0f2fe'}}>Get in Touch with Our Parish Community</span>
          </h1>
          <p className="scroll-slide-up" style={{fontSize: '1.125rem', marginBottom: '2rem', maxWidth: '48rem', margin: '0 auto 2rem auto', lineHeight: '1.7', textAlign: 'center', color: '#e0f2fe'}}>
            We'd love to hear from you. Reach out for any questions, prayer requests, or to join our community
          </p>
        </div>
      </section>

      {/* Main Content */}
      <div style={{width: '100%', padding: '4rem 1rem', backgroundColor: '#f8fafc', display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
        <div style={{maxWidth: '80rem', width: '100%', margin: '0 auto'}}>

        {/* Contact Information & Form */}
        <section 
          id="contact-info"
          className="scroll-fade-in smooth-scroll-section"
          style={{marginBottom: '4rem', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))', gap: 'clamp(1.5rem, 4vw, 3rem)'}}>
          {/* Contact Information */}
          <div className="scroll-slide-left" style={{backgroundColor: assignedColors.lightEmerald, padding: 'clamp(1.5rem, 4vw, 3rem) clamp(1rem, 3vw, 2rem)', borderRadius: '1rem', boxShadow: '0 10px 25px -3px rgba(0, 0, 0, 0.1)'}}>
            <h2 style={{fontSize: 'clamp(1.5rem, 4vw, 2rem)', fontWeight: '700', color: '#0284c7', marginBottom: 'clamp(1rem, 3vw, 2rem)', fontFamily: 'serif'}}>Get In Touch</h2>
            <div style={{display: 'flex', flexDirection: 'column', gap: 'clamp(1rem, 3vw, 2rem)'}}>
              <div style={{backgroundColor: '#e0f2fe', padding: 'clamp(1rem, 3vw, 1.5rem)', borderRadius: '0.75rem', border: '1px solid #0ea5e9', display: 'flex', alignItems: 'flex-start', gap: 'clamp(0.75rem, 2vw, 1rem)'}}>
                <MapPin style={{width: 'clamp(1.5rem, 4vw, 2rem)', height: 'clamp(1.5rem, 4vw, 2rem)', color: '#0284c7', marginTop: '0.25rem', flexShrink: 0}} />
                <div>
                  <h3 style={{fontWeight: '600', color: '#0284c7', marginBottom: '0.5rem', fontSize: 'clamp(0.95rem, 2.5vw, 1.1rem)'}}>Address</h3>
                  <p style={{color: '#0369a1', fontSize: 'clamp(0.875rem, 2vw, 1rem)', marginBottom: '0.25rem', lineHeight: '1.5'}}>Saint Mary Magdalene church</p>
                  <p style={{color: '#0369a1', fontSize: 'clamp(0.875rem, 2vw, 1rem)', marginBottom: '0.25rem', lineHeight: '1.5'}}>Redhills, Chennai - 600052</p>
                  <p style={{color: '#0369a1', fontSize: 'clamp(0.875rem, 2vw, 1rem)', lineHeight: '1.5'}}>Tamil Nadu, India</p>
                </div>
              </div>
              
              <div style={{backgroundColor: '#e0f2fe', padding: 'clamp(1rem, 3vw, 1.5rem)', borderRadius: '0.75rem', border: '1px solid #0ea5e9', display: 'flex', alignItems: 'flex-start', gap: 'clamp(0.75rem, 2vw, 1rem)'}}>
                <Phone style={{width: 'clamp(1.5rem, 4vw, 2rem)', height: 'clamp(1.5rem, 4vw, 2rem)', color: '#0284c7', marginTop: '0.25rem', flexShrink: 0}} />
                <div>
                  <h3 style={{fontWeight: '600', color: '#0284c7', marginBottom: '0.5rem', fontSize: 'clamp(0.95rem, 2.5vw, 1.1rem)'}}>Phone</h3>
                  <p style={{color: '#0369a1', fontSize: 'clamp(0.875rem, 2vw, 1rem)', marginBottom: '0.25rem', lineHeight: '1.5'}}>+91 44 2498 4123</p>
                  <p style={{color: '#0369a1', fontSize: 'clamp(0.875rem, 2vw, 1rem)', lineHeight: '1.5'}}>+91 90030 86057</p>
                </div>
              </div>
              
              <div style={{backgroundColor: '#e0f2fe', padding: '1.5rem', borderRadius: '0.75rem', border: '1px solid #0ea5e9', display: 'flex', alignItems: 'flex-start', gap: '1rem'}}>
                <Mail style={{width: 'clamp(1.5rem, 4vw, 2rem)', height: 'clamp(1.5rem, 4vw, 2rem)', color: '#0284c7', marginTop: '0.25rem', flexShrink: 0}} />
                <div>
                  <h3 style={{fontWeight: '600', color: '#0284c7', marginBottom: '0.5rem', fontSize: 'clamp(0.95rem, 2.5vw, 1.1rem)'}}>Email</h3>
                  <p style={{color: '#0369a1', fontSize: 'clamp(0.875rem, 2vw, 1rem)', lineHeight: '1.5', wordBreak: 'break-word'}}>
                    <a href="mailto:info@saintmarymagdelenechurch.org" style={{color: '#0284c7', textDecoration: 'none', wordBreak: 'break-word'}}>
                      info@saintmarymagdelenechurch.org
                    </a>
                  </p>
                </div>
              </div>
              
              <div style={{backgroundColor: '#e0f2fe', padding: '1.5rem', borderRadius: '0.75rem', border: '1px solid #0ea5e9', display: 'flex', alignItems: 'flex-start', gap: '1rem'}}>
                <Clock style={{width: 'clamp(1.5rem, 4vw, 2rem)', height: 'clamp(1.5rem, 4vw, 2rem)', color: '#0284c7', marginTop: '0.25rem', flexShrink: 0}} />
                <div>
                  <h3 style={{fontWeight: '600', color: '#0284c7', marginBottom: '0.5rem', fontSize: 'clamp(0.95rem, 2.5vw, 1.1rem)'}}>Office Hours</h3>
                  <p style={{color: '#0369a1', fontSize: 'clamp(0.875rem, 2vw, 1rem)', marginBottom: '0.25rem', lineHeight: '1.5'}}>Monday - Friday: 9:00 AM - 5:00 PM</p>
                  <p style={{color: '#0369a1', fontSize: 'clamp(0.875rem, 2vw, 1rem)', marginBottom: '0.25rem', lineHeight: '1.5'}}>Saturday: 9:00 AM - 2:00 PM</p>
                  <p style={{color: '#0369a1', fontSize: 'clamp(0.875rem, 2vw, 1rem)', lineHeight: '1.5'}}>Sunday: After Mass Services</p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="scroll-slide-right" style={{backgroundColor: '#ffffff', padding: 'clamp(1.5rem, 4vw, 3rem) clamp(1rem, 3vw, 2rem)', borderRadius: '1rem', boxShadow: '0 10px 25px -3px rgba(0, 0, 0, 0.1)'}}>
            <h2 style={{fontSize: '2rem', fontWeight: '700', color: '#0284c7', marginBottom: '2rem', fontFamily: 'serif'}}>Send us a Message</h2>
            
            {message && (
              <div style={{padding: '1rem', marginBottom: '1rem', borderRadius: '0.5rem', backgroundColor: message.includes('Error') ? '#fef2f2' : '#f0f9ff', color: message.includes('Error') ? '#dc2626' : '#0284c7'}}>
                {message}
              </div>
            )}

            <form onSubmit={handleSubmit} style={{display: 'flex', flexDirection: 'column', gap: '1.5rem'}}>
              <div>
                <label style={{display: 'block', fontSize: '1rem', fontWeight: '500', color: '#374151', marginBottom: '0.5rem'}}>Full Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  style={{width: '100%', padding: '0.75rem 1rem', border: '1px solid #d1d5db', borderRadius: '0.5rem', fontSize: '1rem'}}
                  placeholder="Your full name"
                />
              </div>
              <div>
                <label style={{display: 'block', fontSize: '1rem', fontWeight: '500', color: '#374151', marginBottom: '0.5rem'}}>Email Address</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  style={{width: '100%', padding: '0.75rem 1rem', border: '1px solid #d1d5db', borderRadius: '0.5rem', fontSize: '1rem'}}
                  placeholder="your.email@example.com"
                />
              </div>
              <div>
                <label style={{display: 'block', fontSize: '1rem', fontWeight: '500', color: '#374151', marginBottom: '0.5rem'}}>Phone Number</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  style={{width: '100%', padding: '0.75rem 1rem', border: '1px solid #d1d5db', borderRadius: '0.5rem', fontSize: '1rem'}}
                  placeholder="+91 XXXXX XXXXX"
                />
              </div>
              <div>
                <label style={{display: 'block', fontSize: '1rem', fontWeight: '500', color: '#374151', marginBottom: '0.5rem'}}>Subject</label>
                <select
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  style={{width: '100%', padding: '0.75rem 1rem', border: '1px solid #d1d5db', borderRadius: '0.5rem', fontSize: '1rem'}}
                >
                  <option>General Inquiry</option>
                  <option>Prayer Request</option>
                  <option>Mass Intentions</option>
                  <option>Wedding/Baptism</option>
                  <option>Volunteer Opportunities</option>
                  <option>Other</option>
                </select>
              </div>
              <div>
                <label style={{display: 'block', fontSize: '1rem', fontWeight: '500', color: '#374151', marginBottom: '0.5rem'}}>Message</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows="4"
                  style={{width: '100%', padding: '0.75rem 1rem', border: '1px solid #d1d5db', borderRadius: '0.5rem', fontSize: '1rem', resize: 'vertical'}}
                  placeholder="Your message..."
                ></textarea>
              </div>

              <div style={{display: 'flex', justifyContent: 'center', marginBottom: '1rem'}}>
                <ReCAPTCHA
                  sitekey={import.meta.env.VITE_RECAPTCHA_SITE_KEY || "6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI"}
                  onChange={setRecaptchaValue}
                  onExpired={() => setRecaptchaValue(null)}
                />
              </div>
              <button
                type="submit"
                disabled={loading || !recaptchaValue}
                style={{
                  width: '100%',
                  backgroundColor: loading || !recaptchaValue ? '#9ca3af' : '#0284c7',
                  color: 'white',
                  padding: '0.75rem 1.5rem',
                  borderRadius: '0.5rem',
                  fontWeight: '600',
                  border: 'none',
                  cursor: loading || !recaptchaValue ? 'not-allowed' : 'pointer',
                  fontSize: '1rem'
                }}
              >
                {loading ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          </div>
        </section>

        {/* Quick Actions */}
        <section 
          id="quick-actions"
          className="scroll-fade-in smooth-scroll-section"
          style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem'}}>
          <div style={{backgroundColor: '#e0f2fe', padding: '2rem', borderRadius: '1rem', border: '1px solid #0ea5e9', textAlign: 'center'}}>
            <Users style={{width: '3rem', height: '3rem', color: '#0284c7', margin: '0 auto 1rem auto', display: 'block'}} />
            <h3 style={{fontSize: '1.25rem', fontWeight: '600', marginBottom: '1rem', color: '#0284c7'}}>Join Our Community</h3>
            <p style={{color: '#0369a1', marginBottom: '1rem'}}>Become part of our parish family</p>
            <button style={{color: '#0284c7', fontWeight: '500', backgroundColor: 'transparent', border: 'none', cursor: 'pointer'}}>Learn More →</button>
          </div>
          
          <div style={{backgroundColor: '#e0f2fe', padding: '2rem', borderRadius: '1rem', border: '1px solid #0ea5e9', textAlign: 'center'}}>
            <Heart style={{width: '3rem', height: '3rem', color: '#0284c7', margin: '0 auto 1rem auto', display: 'block'}} />
            <h3 style={{fontSize: '1.25rem', fontWeight: '600', marginBottom: '1rem', color: '#0284c7'}}>Prayer Requests</h3>
            <p style={{color: '#0369a1', marginBottom: '1rem'}}>Submit your prayer intentions</p>
            <button style={{color: '#0284c7', fontWeight: '500', backgroundColor: 'transparent', border: 'none', cursor: 'pointer'}}>Submit Request →</button>
          </div>
          
          <div style={{backgroundColor: '#e0f2fe', padding: '2rem', borderRadius: '1rem', border: '1px solid #0ea5e9', textAlign: 'center'}}>
            <Clock style={{width: '3rem', height: '3rem', color: '#0284c7', margin: '0 auto 1rem auto', display: 'block'}} />
            <h3 style={{fontSize: '1.25rem', fontWeight: '600', marginBottom: '1rem', color: '#0284c7'}}>Mass Schedule</h3>
            <p style={{color: '#0369a1', marginBottom: '1rem'}}>View our service times</p>
            <button style={{color: '#0284c7', fontWeight: '500', backgroundColor: 'transparent', border: 'none', cursor: 'pointer'}}>View Schedule →</button>
          </div>
        </section>

        </div>
      </div>
    </div>
  );
};

export default Contact;