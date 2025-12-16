import React, { useState, useEffect, useRef } from 'react';
import './App.css'; 
// Common components
import Header from './components/common/Header.jsx';
import Footer from './components/common/Footer.jsx';
import Loading from './components/common/Loading.jsx';

// Home components
import Homepage from './components/home/Homepage.jsx';
import BannerSlider from './components/home/BannerSlider.jsx';

// Page components (in src/components/pages/)
import About from './components/pages/About.jsx';
import Contact from './components/pages/Contact.jsx';
import Donate from './components/pages/Donate.jsx';
import Events from './components/pages/Events.jsx';
import Gallery from './components/pages/Gallery.jsx';
import News from './components/pages/News.jsx';
import STMaryMagdelene from './components/pages/ST_mary_magdelene.jsx';
import Schedule from './components/pages/Schedule.jsx';
// Prayer components
import Prayer from './components/pages/Prayer.jsx';
import PrayerForm from './components/prayer/PrayerForm.jsx';
import PrayerRequest from './components/prayer/PrayerRequest.jsx';
import PrayerServices from './components/prayer/PrayerServices.jsx';

// Admin component
import AdminDashboard from './components/AdminDashboard.jsx';
import ReactAdmin from './components/ReactAdmin.jsx';
import AdminLogin from './components/AdminLogin.jsx';

const App = () => {
  const [currentPage, setCurrentPage] = useState(() => {
    // Initialize with current URL path on app load
    const path = window.location.pathname.slice(1);
    return path || 'home';
  });
  const [isLoading, setIsLoading] = useState(false);
  const [modalData, setModalData] = useState({ isOpen: false, title: '', content: '' });
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);
  const mainContentRef = useRef(null);
  const scrollTimeoutRef = useRef(null);

  const handleOpenModal = (title, content) => {
    setModalData({ isOpen: true, title, content });
  };

  const handleCloseModal = () => {
    setModalData({ ...modalData, isOpen: false });
  };

  // Scroll progress tracking
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = scrollTop / docHeight;
      setScrollProgress(progress);
      
      // Set scrolling state
      setIsScrolling(true);
      clearTimeout(scrollTimeoutRef.current);
      scrollTimeoutRef.current = setTimeout(() => {
        setIsScrolling(false);
      }, 150);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(scrollTimeoutRef.current);
    };
  }, []);

  // Update URL when page changes
  useEffect(() => {
    const url = currentPage === 'home' ? '/' : `/${currentPage}`;
    window.history.pushState({}, '', url);
  }, [currentPage]);

  // Handle browser back/forward buttons
  useEffect(() => {
    const handlePopState = (event) => {
      const path = window.location.pathname.slice(1);
      const page = path || 'home';
      setCurrentPage(page);
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Enhanced navigation with smooth scroll
  const handleNavigation = (pageId, options = {}) => {
    const { smooth = true, scrollToTop = true } = options;
    
    // Immediately scroll to top and set page
    if (scrollToTop) {
      window.scrollTo(0, 0);
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    }
    
    setCurrentPage(pageId);
    setIsLoading(true);
    
    // Brief loading state
    setTimeout(() => {
      setIsLoading(false);
    }, 100);
  };

  // Scroll to section within a page
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  // Scroll to top with smooth animation
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  };

  // Page rendering based on current page state
  const renderPage = () => {
    if (isLoading) {
      return <Loading />;
    }

    switch (currentPage) {
      case 'home':
        return <Homepage onNavigate={handleNavigation} scrollToSection={scrollToSection} openModal={handleOpenModal} />;
      
      // church   pages
      case 'church':
      case 'mission':
      case 'history':
      case 'st-thomas':
      case 'tomb-chapel':
      case 'mylai-madha':
      case 'papal-visit':
      case 'museum':
      case 'parish-team':
      case 'parish':
      case 'archdiocese':
        return <About onNavigate={handleNavigation} scrollToSection={scrollToSection} />;
      
      case 'news-events':
        return <News onNavigate={handleNavigation} scrollToSection={scrollToSection} />;
      
      // Gallery pages
      case 'gallery':
      case 'photos':
        return <Gallery onNavigate={handleNavigation} scrollToSection={scrollToSection} />;
      case 'videos':
        return (
          <div className="container mx-auto px-4 py-8 scroll-fade-in">
            <div className="text-center">
              <h1 className="text-4xl font-bold text-gray-800 mb-8 scroll-slide-up">Videos</h1>
              <div className="bg-white rounded-lg shadow-md p-8 scroll-slide-up">
                <p className="text-lg text-gray-600 mb-4">
                  Watch our church services and spiritual content.
                </p>
                <p className="text-gray-500">Video gallery coming soon...</p>
              </div>
            </div>
          </div>
        );
      
      // Prayer pages
      case 'prayers':
      case 'english-prayers':
      case 'tamil-prayers':
        return <Prayer onNavigate={handleNavigation} scrollToSection={scrollToSection} />;
      
      case 'schedule':
        return <Schedule onNavigate={handleNavigation} scrollToSection={scrollToSection} />;
      
      case 'contact':
        return <Contact onNavigate={handleNavigation} scrollToSection={scrollToSection} />;
      
      case 'donate':
        return <Donate onNavigate={handleNavigation} />;

      case 'st-mary-magdalene':
        return <STMaryMagdelene onNavigate={handleNavigation} scrollToSection={scrollToSection} />;
      
      case 'admin':
      case 'react-admin':
        const adminToken = localStorage.getItem('adminToken');
        if (!adminToken) {
          return <AdminLogin onLoginSuccess={(userData) => {
            localStorage.setItem('adminToken', userData.token || 'admin-token');
            localStorage.setItem('adminUser', JSON.stringify(userData));
            window.location.reload();
          }} />;
        }
        return <ReactAdmin />;
      
      default:
        return <Homepage onNavigate={handleNavigation} scrollToSection={scrollToSection} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Scroll Progress Bar */}
      <div className="fixed top-0 left-0 w-full h-1 bg-gray-200 z-50">
        <div 
          className="h-full bg-gradient-to-r from-blue-500 to-purple-600 transition-all duration-300 ease-out"
          style={{ width: `${scrollProgress * 100}%` }}
        />
      </div>

      <Header 
        currentPage={currentPage} 
        onNavigate={handleNavigation}
        scrollToSection={scrollToSection}
        isScrolling={isScrolling}
      />
      
      <main 
        ref={mainContentRef}
        className={`flex-1 transition-all duration-500 ease-in-out ${
          isLoading ? 'opacity-0 transform translate-y-4' : 'opacity-100 transform translate-y-0'
        }`}
      >
        {renderPage()}
      </main>
      
      <Footer onNavigate={handleNavigation} scrollToSection={scrollToSection} />

      {/* Scroll to Top Button */}
      {scrollProgress > 0.2 && (
        <button
          onClick={scrollToTop}
          className={`fixed bottom-6 right-6 z-40 bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-full shadow-lg transition-all duration-300 transform hover:scale-110 ${
            isScrolling ? 'opacity-100 translate-y-0' : 'opacity-70 hover:opacity-100'
          }`}
          aria-label="Scroll to top"
        >
          <svg 
            className="w-6 h-6" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M5 10l7-7m0 0l7 7m-7-7v18" 
            />
          </svg>
        </button>
      )}

      {/* Smooth scroll indicator for long pages */}
      {isScrolling && (
        <div className="fixed top-20 right-6 z-30 bg-black bg-opacity-50 text-white px-3 py-1 rounded-full text-sm transition-opacity duration-300">
          {Math.round(scrollProgress * 100)}%
        </div>
      )}
      {/* Modal */}
      {modalData.isOpen && (
        <div className="modal-overlay" onClick={handleCloseModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={handleCloseModal}>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
            </button>
            <h3 className="modal-title">{modalData.title}</h3>
            <p className="modal-text">{modalData.content}</p>
          </div>
        </div>
      )}

      <style>{`
        .modal-overlay {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background-color: rgba(0, 0, 0, 0.7);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 9999;
            padding: 1rem;
            animation: fadeIn 0.3s ease;
        }

        .modal-content {
            background-color: white;
            padding: 2rem;
            border-radius: 1rem;
            max-width: 600px;
            width: 100%;
            position: relative;
            box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
            animation: slideUp 0.3s ease;
        }

        .modal-close {
            position: absolute;
            top: 1rem;
            right: 1rem;
            background: none;
            border: none;
            cursor: pointer;
            color: #64748b;
            padding: 0.5rem;
            border-radius: 50%;
            transition: all 0.2s;
            display: flex;
            align-items: center;
            justify-content: center;
        }

        .modal-close:hover {
            background-color: #f1f5f9;
            color: #ef4444;
        }

        .modal-title {
            font-size: 1.5rem;
            font-weight: 700;
            color: #0284c7;
            margin-bottom: 1rem;
            font-family: serif;
            padding-right: 2rem;
        }

        .modal-text {
            color: #334155;
            line-height: 1.8;
            font-size: 1.1rem;
        }
        
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
};

export default App;