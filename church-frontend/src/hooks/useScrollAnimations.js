// src/hooks/useScrollAnimations.js

import { useEffect, useRef } from 'react';

export const useScrollAnimations = () => {
  const observerRef = useRef(null);

  useEffect(() => {
    // Create intersection observer for scroll animations
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate');
          } else {
            // Optional: Remove animation class when element goes out of view
            // entry.target.classList.remove('animate');
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px', // Trigger animation 50px before element enters viewport
      }
    );

    // Observe all elements with scroll animation classes
    const animatedElements = document.querySelectorAll(
      '.scroll-fade-in, .scroll-slide-up, .scroll-slide-left, .scroll-slide-right, .scroll-scale-in, .scroll-rotate-in, .scroll-stagger-children'
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

  // Function to manually trigger animations
  const triggerAnimation = (elementSelector) => {
    const element = document.querySelector(elementSelector);
    if (element) {
      element.classList.add('animate');
    }
  };

  // Function to reset animations
  const resetAnimation = (elementSelector) => {
    const element = document.querySelector(elementSelector);
    if (element) {
      element.classList.remove('animate');
    }
  };

  return {
    triggerAnimation,
    resetAnimation,
  };
};

// Parallax scrolling hook
export const useParallax = () => {
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset;
      
      // Update CSS custom properties for parallax elements
      document.documentElement.style.setProperty('--parallax-offset-slow', `${scrollTop * 0.3}px`);
      document.documentElement.style.setProperty('--parallax-offset-fast', `${scrollTop * 0.6}px`);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
};

// Smooth scroll to element
export const smoothScrollTo = (elementId, offset = 80) => {
  const element = document.getElementById(elementId);
  if (element) {
    const elementPosition = element.offsetTop - offset;
    window.scrollTo({
      top: elementPosition,
      behavior: 'smooth'
    });
  }
};

// Check if element is in viewport
export const isInViewport = (element, threshold = 0.1) => {
  const rect = element.getBoundingClientRect();
  const viewHeight = Math.max(document.documentElement.clientHeight, window.innerHeight);
  const viewWidth = Math.max(document.documentElement.clientWidth, window.innerWidth);
  
  return (
    rect.bottom >= (viewHeight * threshold) &&
    rect.right >= (viewWidth * threshold) &&
    rect.top <= (viewHeight * (1 - threshold)) &&
    rect.left <= (viewWidth * (1 - threshold))
  );
};

// Custom hook for scroll progress
export const useScrollProgress = () => {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = Math.max(0, Math.min(1, scrollTop / docHeight));
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Set initial value
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return scrollProgress;
};

// Animation variants for different effects
export const animationVariants = {
  fadeIn: 'scroll-fade-in',
  slideUp: 'scroll-slide-up',
  slideLeft: 'scroll-slide-left',
  slideRight: 'scroll-slide-right',
  scaleIn: 'scroll-scale-in',
  rotateIn: 'scroll-rotate-in',
  stagger: 'scroll-stagger-children'
};