import React, { useState, useEffect } from 'react';
import { Menu, X, Phone, Mail, MapPin, Clock, ChevronDown } from 'lucide-react';

const Header = ({ currentPage = 'home', onNavigate = () => {} }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navigation = [
    { name: 'Home', id: 'home' },
    { 
      name: 'About Us', 
      id: 'church',
      submenu: [
        { name: 'Our Mission', id: 'mission' },
        { name: 'Our History', id: 'history' },
        { name: 'St.Thomas in Santhome', id: 'st-thomas' },
        { name: 'Tomb Chapel', id: 'tomb-chapel' },
        { name: 'Mylai Madha', id: 'mylai-madha' },
        { name: 'Papal Visit', id: 'papal-visit' },
        { name: 'Our Museum', id: 'museum' },
        { name: 'Parish Team', id: 'parish-team' },
        { name: 'Our Parish', id: 'parish' },
        { name: 'Our Archdiocese', id: 'archdiocese' }
      ]
    },
    { name: 'News & Events', id: 'news-events' },
    { 
      name: 'Gallery', 
      id: 'gallery',
      submenu: [
        { name: 'Photos', id: 'photos' },
        { name: 'Videos', id: 'videos' }
      ]
    },
    { 
      name: 'Prayers', 
      id: 'prayers',
      submenu: [
        { name: 'English Prayers', id: 'english-prayers' },
        { name: 'Tamil Prayers', id: 'tamil-prayers' }
      ]
    },
    { name: 'Schedule', id: 'schedule' },
    { name: 'Contact', id: 'contact' },
  ];

  const handleNavClick = (pageId) => {
    onNavigate(pageId);
    setIsMenuOpen(false);
  };

  const isActive = (pageId) => currentPage === pageId;

  return (
    <>
      {/* Top Info Bar */}
      <div style={{backgroundColor: '#0ea5e9', color: 'white', padding: '0.75rem 1rem', fontSize: '0.875rem'}}>
        <div style={{maxWidth: '80rem', margin: '0 auto', display: 'flex', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center', textAlign: 'center'}}>
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-2">
              <Phone className="w-4 h-4" />
              <span>+91 44 2498 4123</span>
            </div>
            <div className="hidden md:flex items-center space-x-2">
              <Mail className="w-4 h-4" />
              <span>info@saintmarymagdelenechurch.org</span>
            </div>
          </div>
          <div className="hidden lg:flex items-center space-x-6">
            <div className="flex items-center space-x-2">
              <Clock className="w-4 h-4" />
              <span>Sunday Mass:  8:30 AM - 10:00 AM</span>
            </div>
            <div className="flex items-center space-x-2">
              <MapPin className="w-4 h-4" />
              <span>Redhills, Chennai</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header style={{position: 'sticky', top: 0, zIndex: 50, backgroundColor: '#ffffff', boxShadow: isScrolled ? '0 4px 6px -1px rgba(0, 0, 0, 0.1)' : 'none', transition: 'all 0.3s ease'}}>
        <div style={{maxWidth: '80rem', margin: '0 auto', padding: '0 1rem', display: 'flex', justifyContent: 'center'}}>
          <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem 0', textAlign: 'center', width: '100%'}}>
            {/* Logo */}
            <button
              onClick={() => handleNavClick('home')}
              style={{display: 'flex', alignItems: 'center', gap: '0.75rem', backgroundColor: 'transparent', border: 'none', cursor: 'pointer', transition: 'opacity 0.3s ease'}}
            >
              <div style={{width: '3rem', height: '3rem', backgroundColor: '#0ea5e9', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                <div style={{color: 'white', fontWeight: 'bold', fontSize: '1.25rem'}}>✞</div>
              </div>
              <div>
                <h1 style={{fontSize: '1.25rem', fontFamily: 'serif', fontWeight: '700', color: '#1e293b', margin: 0}}>
                  Saint Mary Magdalene
                </h1>
                <p style={{fontSize: '0.875rem', color: '#64748b', margin: 0}}>church of St. Mary Magdelene </p>
              </div>
            </button>

            {/* Desktop Navigation */}
            <nav style={{display: 'none', gap: '2rem'}} className="lg:flex">
              {navigation.map((item) => (
                <div key={item.name} style={{position: 'relative'}}>
                  <button
                    onClick={() => item.submenu ? setActiveDropdown(activeDropdown === item.id ? null : item.id) : handleNavClick(item.id)}
                    onMouseEnter={() => item.submenu && setActiveDropdown(item.id)}
                    onMouseLeave={() => item.submenu && setTimeout(() => setActiveDropdown(null), 150)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      fontWeight: '500',
                      transition: 'all 0.2s ease',
                      paddingBottom: '0.25rem',
                      color: isActive(item.id) ? '#0ea5e9' : '#64748b',
                      borderBottom: isActive(item.id) ? '2px solid #0ea5e9' : 'none',
                      backgroundColor: 'transparent',
                      border: 'none',
                      cursor: 'pointer'
                    }}
                  >
                    {item.name}
                    {item.submenu && <ChevronDown style={{width: '1rem', height: '1rem', marginLeft: '0.25rem'}} />}
                  </button>
                  
                  {/* Dropdown Menu */}
                  {item.submenu && activeDropdown === item.id && (
                    <div 
                      className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 w-64 bg-white rounded-md shadow-lg py-2 z-50 text-center"
                      onMouseEnter={() => setActiveDropdown(item.id)}
                      onMouseLeave={() => setActiveDropdown(null)}
                    >
                      {item.submenu.map((subItem) => (
                        <button
                          key={subItem.name}
                          onClick={() => handleNavClick(subItem.id)}
                          className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                        >
                          {subItem.name}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </nav>

            {/* Mobile menu button */}
            <button
              className="lg:hidden p-2 rounded-md text-gray-700 hover:text-blue-600"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Sidebar Overlay */}
      {isMenuOpen && (
        <div 
          style={{position: 'fixed', inset: 0, backgroundColor: 'rgba(0, 0, 0, 0.5)', zIndex: 60}}
          onClick={() => setIsMenuOpen(false)}
        />
      )}

      {/* Mobile Sidebar */}
      <div 
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          height: '100vh',
          width: '280px',
          backgroundColor: '#ffffff',
          transform: isMenuOpen ? 'translateX(0)' : 'translateX(-100%)',
          transition: 'transform 0.3s ease',
          zIndex: 70,
          boxShadow: '2px 0 10px rgba(0, 0, 0, 0.1)',
          display: 'flex',
          flexDirection: 'column'
        }}
        className="lg:hidden"
      >
        {/* Sidebar Header */}
        <div style={{padding: '1.5rem', borderBottom: '1px solid #e5e7eb', display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
          <div style={{display: 'flex', alignItems: 'center', gap: '0.75rem'}}>
            <div style={{width: '2.5rem', height: '2.5rem', backgroundColor: '#0ea5e9', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
              <div style={{color: 'white', fontWeight: 'bold', fontSize: '1rem'}}>✞</div>
            </div>
            <div>
              <h2 style={{fontSize: '1rem', fontFamily: 'serif', fontWeight: '700', color: '#1e293b', margin: 0}}>SMM Church</h2>
            </div>
          </div>
          <button
            onClick={() => setIsMenuOpen(false)}
            style={{padding: '0.5rem', backgroundColor: 'transparent', border: 'none', cursor: 'pointer', color: '#64748b'}}
          >
            <X style={{width: '1.5rem', height: '1.5rem'}} />
          </button>
        </div>

        {/* Sidebar Navigation */}
        <nav style={{flex: 1, padding: '1rem', overflowY: 'auto'}}>
          {navigation.map((item) => (
            <div key={item.name} style={{marginBottom: '0.5rem'}}>
              <button
                onClick={() => item.submenu ? setActiveDropdown(activeDropdown === item.id ? null : item.id) : handleNavClick(item.id)}
                style={{
                  width: '100%',
                  textAlign: 'left',
                  padding: '0.75rem 1rem',
                  borderRadius: '0.5rem',
                  fontWeight: '500',
                  transition: 'all 0.2s ease',
                  backgroundColor: isActive(item.id) ? '#e0f2fe' : 'transparent',
                  color: isActive(item.id) ? '#0284c7' : '#64748b',
                  border: 'none',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}
              >
                {item.name}
                {item.submenu && (
                  <ChevronDown 
                    style={{
                      width: '1rem', 
                      height: '1rem',
                      transform: activeDropdown === item.id ? 'rotate(180deg)' : 'rotate(0deg)',
                      transition: 'transform 0.2s ease'
                    }} 
                  />
                )}
              </button>
              
              {/* Submenu */}
              {item.submenu && activeDropdown === item.id && (
                <div style={{marginTop: '0.5rem', marginLeft: '1rem'}}>
                  {item.submenu.map((subItem) => (
                    <button
                      key={subItem.name}
                      onClick={() => handleNavClick(subItem.id)}
                      style={{
                        width: '100%',
                        textAlign: 'left',
                        padding: '0.5rem 1rem',
                        borderRadius: '0.375rem',
                        fontSize: '0.875rem',
                        color: '#64748b',
                        backgroundColor: 'transparent',
                        border: 'none',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease'
                      }}
                      onMouseEnter={(e) => e.target.style.backgroundColor = '#f8fafc'}
                      onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
                    >
                      {subItem.name}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>
      </div>
    </>
  );
};

export default Header;