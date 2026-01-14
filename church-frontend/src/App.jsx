import React, { useState, useEffect, useRef, Suspense, lazy } from 'react';
import ReactDOM from 'react-dom';
import './App.css'; 
// Common components
import Header from './components/common/Header.jsx';
import Footer from './components/common/Footer.jsx';
import Loading from './components/common/Loading.jsx';
import PongalDecorations from './components/common/PongalDecorations.jsx';
// Home components - Keep Homepage eager loaded for immediate First Contentful Paint
import Homepage from './components/home/Homepage.jsx';

// Lazy Load Page components
const About = lazy(() => import('./components/pages/About.jsx'));
const Contact = lazy(() => import('./components/pages/Contact.jsx'));
const Donate = lazy(() => import('./components/pages/Donate.jsx'));
const Events = lazy(() => import('./components/pages/Events.jsx')); // Kept for safety if reference exists
const Gallery = lazy(() => import('./components/pages/Gallery.jsx'));
const News = lazy(() => import('./components/pages/News.jsx'));
const STMaryMagdelene = lazy(() => import('./components/pages/ST_mary_magdelene.jsx'));
const ChurchSchedule = lazy(() => import('./components/pages/ChurchSchedule.jsx'));

// Prayer components
const Prayer = lazy(() => import('./components/pages/Prayer.jsx'));
// These seem to be sub-components or form components, often loaded with Prayer page or separately? 
// If they are pages, lazy load. If strictly components used inside Prayer, no need to lazy load here separately unless they are routes.
// Based on previous code they are unused in main switch or used inside Prayer. checking... 
// They are NOT used in the switch statement in the original code, only imported. I will remove unused imports or keep them if I missed something.
// Actually, looking at the original code, `PrayerForm`, `PrayerRequest`, `PrayerServices` were imported but not used in the `renderPage` switch!
// I will comment them out to be safe and clean up.

// Church Group components
const YouthGroup = lazy(() => import('./components/pages/YouthGroup.jsx'));
const VincentDePaul = lazy(() => import('./components/pages/VincentDePaul.jsx'));
const LegionOfMary = lazy(() => import('./components/pages/LegionOfMary.jsx'));
const StJosephGroup = lazy(() => import('./components/pages/StJosephGroup.jsx'));

// Admin component
const AdminDashboard = lazy(() => import('./components/AdminDashboard.jsx'));
const ReactAdmin = lazy(() => import('./components/ReactAdmin.jsx'));
const AdminLogin = lazy(() => import('./components/AdminLogin.jsx'));

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
      const totalScroll = document.documentElement.scrollTop;
      const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scroll = `${totalScroll / windowHeight}`;
      setScrollProgress(Number(scroll));

      setIsScrolling(true);
      clearTimeout(scrollTimeoutRef.current);
      scrollTimeoutRef.current = setTimeout(() => {
        setIsScrolling(false);
      }, 150);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Simple Router Logic
  useEffect(() => {
    const handlePopState = () => {
      const path = window.location.pathname.slice(1);
      setCurrentPage(path || 'home');
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const handleNavigation = (page) => {
    setIsLoading(true);
    // Smooth scroll to top before transition
    window.scrollTo({ top: 0, behavior: 'smooth' });
    
    setTimeout(() => {
      setCurrentPage(page);
      window.history.pushState({}, '', `/${page === 'home' ? '' : page}`);
      setIsLoading(false);
    }, 500); // Wait for scroll/fade out
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
      return <Loading fullScreen={true} message="Loading..." />;
    }

    // Suspense wrapper for lazy loading
    return (
      <Suspense fallback={<Loading fullScreen={true} message="Loading..." />}>
        {renderContent()}
      </Suspense>
    );
  };

  const renderContent = () => {
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
      
      // Group pages
      case 'youth-group':
        return <YouthGroup onNavigate={handleNavigation} />;
      case 'vincent-de-paul':
        return <VincentDePaul onNavigate={handleNavigation} />;
      case 'legion-of-mary':
        return <LegionOfMary onNavigate={handleNavigation} />;
      case 'st-joseph-group':
        return <StJosephGroup onNavigate={handleNavigation} />;
      
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
        return <ChurchSchedule onNavigate={handleNavigation} scrollToSection={scrollToSection} />;
      
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

  // Check if current page is admin
  const isAdminPage = currentPage === 'admin' || currentPage === 'react-admin';

  return (
    <>
      <div className="min-h-screen bg-gray-50 flex flex-col">
        {/* Scroll Progress Bar - hide on admin */}
        {!isAdminPage && (
          <div className="fixed top-0 left-0 w-full h-1 bg-gray-200 z-50">
            <div 
              className="h-full bg-gradient-to-r from-blue-500 to-purple-600 transition-all duration-300 ease-out"
              style={{ width: `${scrollProgress * 100}%` }}
            />
          </div>
        )}

        {/* Header - hide on admin */}
        {!isAdminPage && (
          <Header 
            currentPage={currentPage} 
            onNavigate={handleNavigation}
            scrollToSection={scrollToSection}
            isScrolling={isScrolling}
          />
        )}
        {!isAdminPage && <PongalDecorations />}
        <main 
          ref={mainContentRef}
          className={`flex-1 transition-all duration-500 ease-in-out ${
            isLoading ? 'opacity-0 transform translate-y-4' : 'opacity-100 transform translate-y-0'
          }`}
        >
          {renderPage()}
        </main>
        
        {/* Footer - hide on admin */}
        {!isAdminPage && (
          <Footer onNavigate={handleNavigation} scrollToSection={scrollToSection} />
        )}

        {/* Scroll to Top Button - hide on admin */}
        {!isAdminPage && scrollProgress > 0.2 && (
          <button
            onClick={scrollToTop}
            className="fixed bottom-8 right-8 bg-blue-600 text-white p-3 rounded-full shadow-lg hover:bg-blue-700 transition-all duration-300 z-40 animate-bounce cursor-pointer flex items-center justify-center"
            aria-label="Scroll to top"
            style={{ border: 'none' }}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 10l7-7m0 0l7 7m-7-7v18" />
            </svg>
          </button>
        )}
      </div>

      {/* Global Modal - Outside flex container for proper overlay positioning */}

      {modalData.isOpen && (
        <div className="custom-modal-overlay" onClick={handleCloseModal}>
          <div className="custom-modal-container" onClick={e => e.stopPropagation()}>
            <div className="custom-modal-header">
              <h2 className="custom-modal-title">{modalData.title}</h2>
              <button 
                onClick={handleCloseModal}
                className="custom-modal-close-icon"
                aria-label="Close modal"
              >
                <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="custom-modal-body">
              {modalData.content}
            </div>
            <div className="custom-modal-footer">
              <button 
                onClick={handleCloseModal}
                className="custom-modal-close-btn"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default App;