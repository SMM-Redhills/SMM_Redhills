import React, { useState } from 'react';
import { MapPin, Phone, Clock, Mail, Users, Heart, Cross } from 'lucide-react';
import { churchAPI } from '../../services/api';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'General Inquiry',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      await churchAPI.submitContact(formData);
      setMessage('Message sent successfully! We will get back to you soon.');
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: 'General Inquiry',
        message: ''
      });
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
      <section style={{position: 'relative', background: 'linear-gradient(135deg, #0ea5e9 0%, #0284c7 50%, #0369a1 100%)', color: 'white', padding: '4rem 1rem', width: '100%', display: 'flex', justifyContent: 'center'}}>
        <div style={{position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(255,255,255,0.1)'}}></div>
        <div style={{position: 'relative', maxWidth: '72rem', margin: '0 auto', textAlign: 'center'}}>
          <div style={{marginBottom: '2rem'}}>
            <Cross style={{width: '3rem', height: '3rem', margin: '0 auto 1rem auto', color: '#ffffff', display: 'block'}} />
          </div>
          <h1 style={{fontSize: '3rem', fontWeight: '700', marginBottom: '1rem', lineHeight: '1.1', textAlign: 'center', fontFamily: 'serif'}}>
            Contact Us
            <span style={{display: 'block', fontSize: '1.5rem', fontWeight: '300', marginTop: '0.5rem', color: '#e0f2fe'}}>Get in Touch with Our Parish Community</span>
          </h1>
          <p style={{fontSize: '1.125rem', marginBottom: '2rem', maxWidth: '48rem', margin: '0 auto 2rem auto', lineHeight: '1.7', textAlign: 'center', color: '#e0f2fe'}}>
            We'd love to hear from you. Reach out for any questions, prayer requests, or to join our community
          </p>
        </div>
      </section>

      {/* Main Content */}
      <div style={{width: '100%', padding: '4rem 1rem', backgroundColor: '#f8fafc', display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
        <div style={{maxWidth: '80rem', width: '100%', margin: '0 auto'}}>

        {/* Contact Information & Form */}
        <section style={{marginBottom: '4rem', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '3rem'}}>
          {/* Contact Information */}
          <div style={{backgroundColor: '#ffffff', padding: '3rem 2rem', borderRadius: '1rem', boxShadow: '0 10px 25px -3px rgba(0, 0, 0, 0.1)'}}>
            <h2 style={{fontSize: '2rem', fontWeight: '700', color: '#0284c7', marginBottom: '2rem', fontFamily: 'serif'}}>Get In Touch</h2>
            <div style={{display: 'flex', flexDirection: 'column', gap: '2rem'}}>
              <div style={{backgroundColor: '#e0f2fe', padding: '1.5rem', borderRadius: '0.75rem', border: '1px solid #0ea5e9', display: 'flex', alignItems: 'flex-start', gap: '1rem'}}>
                <MapPin style={{width: '2rem', height: '2rem', color: '#0284c7', marginTop: '0.25rem', flexShrink: 0}} />
                <div>
                  <h3 style={{fontWeight: '600', color: '#0284c7', marginBottom: '0.5rem'}}>Address</h3>
                  <p style={{color: '#0369a1', fontSize: '1rem', marginBottom: '0.25rem'}}>Saint Mary Magdalene church</p>
                  <p style={{color: '#0369a1', fontSize: '1rem', marginBottom: '0.25rem'}}>Redhills, Chennai - 600052</p>
                  <p style={{color: '#0369a1', fontSize: '1rem'}}>Tamil Nadu, India</p>
                </div>
              </div>
              
              <div style={{backgroundColor: '#e0f2fe', padding: '1.5rem', borderRadius: '0.75rem', border: '1px solid #0ea5e9', display: 'flex', alignItems: 'flex-start', gap: '1rem'}}>
                <Phone style={{width: '2rem', height: '2rem', color: '#0284c7', marginTop: '0.25rem', flexShrink: 0}} />
                <div>
                  <h3 style={{fontWeight: '600', color: '#0284c7', marginBottom: '0.5rem'}}>Phone</h3>
                  <p style={{color: '#0369a1', fontSize: '1rem', marginBottom: '0.25rem'}}>+91 44 2498 4123</p>
                  <p style={{color: '#0369a1', fontSize: '1rem'}}>+91 90030 86057</p>
                </div>
              </div>
              
              <div style={{backgroundColor: '#e0f2fe', padding: '1.5rem', borderRadius: '0.75rem', border: '1px solid #0ea5e9', display: 'flex', alignItems: 'flex-start', gap: '1rem'}}>
                <Mail style={{width: '2rem', height: '2rem', color: '#0284c7', marginTop: '0.25rem', flexShrink: 0}} />
                <div>
                  <h3 style={{fontWeight: '600', color: '#0284c7', marginBottom: '0.5rem'}}>Email</h3>
                  <p style={{color: '#0369a1', fontSize: '1rem'}}>
                    <a href="mailto:info@saintmarymagdelenechurch.org" style={{color: '#0284c7', textDecoration: 'none'}}>
                      info@saintmarymagdelenechurch.org
                    </a>
                  </p>
                </div>
              </div>
              
              <div style={{backgroundColor: '#e0f2fe', padding: '1.5rem', borderRadius: '0.75rem', border: '1px solid #0ea5e9', display: 'flex', alignItems: 'flex-start', gap: '1rem'}}>
                <Clock style={{width: '2rem', height: '2rem', color: '#0284c7', marginTop: '0.25rem', flexShrink: 0}} />
                <div>
                  <h3 style={{fontWeight: '600', color: '#0284c7', marginBottom: '0.5rem'}}>Office Hours</h3>
                  <p style={{color: '#0369a1', fontSize: '1rem', marginBottom: '0.25rem'}}>Monday - Friday: 9:00 AM - 5:00 PM</p>
                  <p style={{color: '#0369a1', fontSize: '1rem', marginBottom: '0.25rem'}}>Saturday: 9:00 AM - 2:00 PM</p>
                  <p style={{color: '#0369a1', fontSize: '1rem'}}>Sunday: After Mass Services</p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div style={{backgroundColor: '#ffffff', padding: '3rem 2rem', borderRadius: '1rem', boxShadow: '0 10px 25px -3px rgba(0, 0, 0, 0.1)'}}>
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
              <button
                type="submit"
                disabled={loading}
                style={{
                  width: '100%',
                  backgroundColor: loading ? '#9ca3af' : '#0284c7',
                  color: 'white',
                  padding: '0.75rem 1.5rem',
                  borderRadius: '0.5rem',
                  fontWeight: '600',
                  border: 'none',
                  cursor: loading ? 'not-allowed' : 'pointer',
                  fontSize: '1rem'
                }}
              >
                {loading ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          </div>
        </section>

        {/* Quick Actions */}
        <section style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem'}}>
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