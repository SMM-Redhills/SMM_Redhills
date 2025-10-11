import React, { useState, useEffect, useRef } from 'react';
import './App.css'; 
// Common components
import Header from './components/common/Header.jsx';
import Footer from './components/common/Footer.jsx';
import Loading from './components/common/Loading.jsx';

// Home components
import Homepage from './components/home/Homepage.jsx';

// Page components (in src/components/pages/)
import About from './components/pages/About.jsx';
import Contact from './components/pages/Contact.jsx';
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

const App = () => {
  const [currentPage, setCurrentPage] = useState(() => {
    // Initialize with current URL path on app load
    const path = window.location.pathname.slice(1);
    return path || 'home';
  });
  const [isLoading, setIsLoading] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);
  const mainContentRef = useRef(null);
  const scrollTimeoutRef = useRef(null);

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
    
    setIsLoading(true);
    
    // Simulate loading for better UX
    setTimeout(() => {
      setCurrentPage(pageId);
      setIsLoading(false);
      
      if (scrollToTop) {
        if (smooth) {
          window.scrollTo({
            top: 0,
            left: 0,
            behavior: 'smooth'
          });
        } else {
          window.scrollTo(0, 0);
        }
      }
    }, 300);
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
        return <Homepage onNavigate={handleNavigation} scrollToSection={scrollToSection} />;
      
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
      
      case 'st-mary-magdalene':
        return <STMaryMagdelene onNavigate={handleNavigation} scrollToSection={scrollToSection} />;
      
      case 'admin':
        return <ReactAdmin />;
      
      case 'react-admin':
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
    </div>
  );
};

export default App;