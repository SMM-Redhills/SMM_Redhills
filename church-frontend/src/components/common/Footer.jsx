import React from 'react';
import { Phone, Mail, MapPin, Clock, Facebook, Instagram, Youtube } from 'lucide-react';
import smmLogo from '../../assets/img/smm_logo.png';

const Footer = ({ onNavigate = () => {} }) => {
  const quickLinks = [
    { name: 'About Us', id: 'about' },
    { name: 'News & Updates', id: 'news' },
    { name: 'Events', id: 'events' },
    { name: 'Prayer Request', id: 'prayer-request' },
    { name: 'Contact Us', id: 'contact' },
  ];

  const handleLinkClick = (pageId) => {
    onNavigate(pageId);
  };

  return (
    <footer style={{backgroundColor: '#1e293b', color: 'white', width: '100%'}}>
      <div style={{maxWidth: '80rem', margin: '0 auto', padding: '3rem 1rem', display: 'flex', justifyContent: 'center'}}>
        <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem', justifyItems: 'center', textAlign: 'center', width: '100%'}}>
          
          {/* Church Info */}
          <div style={{display: 'flex', flexDirection: 'column', gap: '1rem'}}>
            <div style={{display: 'flex', alignItems: 'center', gap: '0.75rem', justifyContent: 'center'}}>
              <img 
                src={smmLogo} 
                alt="Church Logo" 
                style={{width: '4rem', height: '4rem', objectFit: 'contain'}} 
              />
              <div>
                <h3 style={{fontSize: '1.125rem', fontFamily: 'serif', fontWeight: 'bold', color: 'white', margin: 0}}>Saint Mary Magdalene</h3>
                <p style={{fontSize: '0.875rem', color: '#94a3b8', margin: 0}}>church of St. Thomas</p>
              </div>
            </div>
            <p style={{color: '#94a3b8', fontSize: '0.875rem', lineHeight: '1.6', textAlign: 'center'}}>
              A welcoming Catholic community in Chennai, dedicated to worship, fellowship, 
              and service. Join us in faith, hope, and love.
            </p>
            <div style={{display: 'flex', gap: '1rem', justifyContent: 'center'}}>
              <a href="#" style={{color: '#94a3b8', transition: 'color 0.3s ease', textDecoration: 'none'}}>
                <Facebook style={{width: '1.25rem', height: '1.25rem'}} />
              </a>
              <a href="#" style={{color: '#94a3b8', transition: 'color 0.3s ease', textDecoration: 'none'}}>
                <Instagram style={{width: '1.25rem', height: '1.25rem'}} />
              </a>
              <a href="#" style={{color: '#94a3b8', transition: 'color 0.3s ease', textDecoration: 'none'}}>
                <Youtube style={{width: '1.25rem', height: '1.25rem'}} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div style={{display: 'flex', flexDirection: 'column', gap: '1rem', textAlign: 'center'}}>
            <h4 style={{fontSize: '1.125rem', fontWeight: '600', color: 'white', margin: 0}}>Quick Links</h4>
            <ul style={{listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.5rem'}}>
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <button
                    onClick={() => handleLinkClick(link.id)}
                    style={{
                      color: '#94a3b8',
                      fontSize: '0.875rem',
                      backgroundColor: 'transparent',
                      border: 'none',
                      cursor: 'pointer',
                      transition: 'color 0.3s ease'
                    }}
                    onMouseOver={(e) => e.target.style.color = 'white'}
                    onMouseOut={(e) => e.target.style.color = '#94a3b8'}
                  >
                    {link.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div style={{display: 'flex', flexDirection: 'column', gap: '1rem', textAlign: 'center'}}>
            <h4 style={{fontSize: '1.125rem', fontWeight: '600', color: 'white', margin: 0}}>Contact Us</h4>
            <div style={{display: 'flex', flexDirection: 'column', gap: '0.75rem'}}>
              <div style={{display: 'flex', alignItems: 'center', gap: '0.75rem', justifyContent: 'center'}}>
                <MapPin style={{width: '1.25rem', height: '1.25rem', color: '#0ea5e9'}} />
                <div style={{textAlign: 'left'}}>
                  <p style={{color: 'white', fontSize: '0.875rem', margin: 0}}>Saint Mary Magdalene Church</p>
                  <p style={{color: '#94a3b8', fontSize: '0.875rem', margin: 0}}>Redhills, Chennai - 600052</p>
                  <p style={{color: '#94a3b8', fontSize: '0.875rem', margin: 0}}>Tamil Nadu, India</p>
                </div>
              </div>
              <div style={{display: 'flex', alignItems: 'center', gap: '0.75rem', justifyContent: 'center'}}>
                <Phone style={{width: '1.25rem', height: '1.25rem', color: '#0ea5e9'}} />
                <span style={{color: 'white', fontSize: '0.875rem'}}>+91 44 2498 4123</span>
              </div>
              <div style={{display: 'flex', alignItems: 'center', gap: '0.75rem', justifyContent: 'center'}}>
                <Mail style={{width: '1.25rem', height: '1.25rem', color: '#0ea5e9'}} />
                <span style={{color: 'white', fontSize: '0.875rem'}}>info@saintmarymagdelenechurch.org</span>
              </div>
              <div style={{display: 'flex', alignItems: 'center', gap: '0.75rem', justifyContent: 'center'}}>
                <Clock style={{width: '1.25rem', height: '1.25rem', color: '#0ea5e9'}} />
                <span style={{color: 'white', fontSize: '0.875rem'}}>Office Hours: Mon-Fri 9 AM - 5 PM</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div style={{borderTop: '1px solid #374151', padding: '1rem 0'}}>
        <div style={{maxWidth: '80rem', margin: '0 auto', padding: '0 1rem', textAlign: 'center'}}>
          <p style={{color: '#94a3b8', fontSize: '0.875rem', margin: 0}}>
            © 2024 Saint Mary Magdalene Church. All rights reserved. Created and developed by Roosso P.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
