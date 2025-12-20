import React, { useState, useEffect, useRef } from 'react';
import { churchAPI } from '../../services/api';
import { MapPin } from 'lucide-react';

const BannerSlider = () => {
  const DEFAULT_SLIDES = [
    {
      id: 1,
      image: 'https://images.unsplash.com/photo-1548625149-fc4a29cf7092?w=1920&h=800&fit=crop',
      title: 'Welcome to Saint Mary Magdalene Church',
      subtitle: 'A place of faith, hope, and love in Redhills'
    },
    {
      id: 2,
      image: 'https://images.unsplash.com/photo-1519491050282-cf00c82424cf?w=1920&h=800&fit=crop',
      title: 'Holy Mass & Worship',
      subtitle: 'Join us for daily Mass and Sunday celebrations'
    },
    {
      id: 3,
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1920&h=800&fit=crop',
      title: 'Prayer & Devotion',
      subtitle: 'Find peace and spiritual guidance in our community'
    },
    {
      id: 4,
      image: 'https://images.unsplash.com/photo-1445445290350-18a3b86e0b5a?w=1920&h=800&fit=crop',
      title: 'Community & Fellowship',
      subtitle: 'Be part of our vibrant parish family'
    },
    {
      id: 5,
      image: 'https://images.unsplash.com/photo-1508185159346-bb1c7fc1d2c7?w=1920&h=800&fit=crop',
      title: 'Sacraments & Blessings',
      subtitle: 'Experience the grace of God through our sacraments'
    },
    {
      id: 6,
      image: 'https://images.unsplash.com/photo-1543465077-db45d34b88a5?w=1920&h=800&fit=crop',
      title: 'Youth & Family Ministry',
      subtitle: 'Growing together in faith across generations'
    }
  ];

  const [slides, setSlides] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const slideInterval = useRef(null);

  useEffect(() => {
    const fetchSlides = async () => {
      try {
        const response = await churchAPI.getBannerSlides();
        const data = response.data.results || response.data;
        if (data && data.length > 0) {
          setSlides(data);
        } else {
            setSlides(DEFAULT_SLIDES); 
        }
      } catch (error) {
        console.error('Error fetching banner slides:', error);
        setSlides(DEFAULT_SLIDES);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSlides();
  }, []);

  useEffect(() => {
    if (isPlaying && slides.length > 1) {
      slideInterval.current = setInterval(() => {
        setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
      }, 5000);
    }

    return () => {
      if (slideInterval.current) {
        clearInterval(slideInterval.current);
      }
    };
  }, [isPlaying, slides.length]);

  const goToSlide = (index) => {
    setCurrentSlide(index);
    if (isPlaying) {
      setIsPlaying(false);
      setTimeout(() => setIsPlaying(true), 10000);
    }
  };

  const goToNext = () => {
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    if (isPlaying) {
      setIsPlaying(false);
      setTimeout(() => setIsPlaying(true), 10000);
    }
  };

  const goToPrev = () => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
    if (isPlaying) {
      setIsPlaying(false);
      setTimeout(() => setIsPlaying(true), 10000);
    }
  };

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  if (isLoading) {
    return (
      <div style={{
        width: '100%', 
        height: '400px', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center', 
        backgroundColor: '#e0f2fe'
      }}>
        Loading slides...
      </div>
    );
  }



  return (
    <div style={{position: 'relative', width: '100%', minHeight: '400px', overflow: 'hidden', backgroundColor: '#1f2937'}}>
      {/* Slides */}
      <div style={{position: 'relative', width: '100%', height: '100%', minHeight: '400px'}}>
        {slides.map((slide, index) => {
           const getFullImageUrl = (slide) => {
             const url = slide.media_url || slide.image_url || slide.image;
             if (!url) return '';
             if (typeof url !== 'string') return '';
             if (url.startsWith('http')) return url;
             return `http://localhost:8000${url}`;
           };
           const imageUrl = getFullImageUrl(slide);
           
           return (
          <div
            key={slide.id}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              opacity: index === currentSlide ? 1 : 0,
              transition: 'opacity 1s ease-in-out',
              zIndex: index === currentSlide ? 1 : 0
            }}
          >
            <img
              src={imageUrl}
              alt={slide.title}
              style={{width: '100%', height: '100%', objectFit: 'cover', minHeight: '400px'}}
            />
            <div style={{
                position: 'absolute', 
                top: 0, 
                left: 0, 
                width: '100%', 
                height: '100%', 
                backgroundColor: 'rgba(0, 0, 0, 0.4)', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center'
            }}>
              <div style={{textAlign: 'center', color: 'white', padding: '0 1rem', maxWidth: '800px'}}>
                <h1 className="hero-title" style={{marginBottom: '1rem', textShadow: '2px 2px 4px rgba(0,0,0,0.5)'}}>{slide.title}</h1>
                <p className="hero-subtitle" style={{marginBottom: '1.5rem', textShadow: '1px 1px 2px rgba(0,0,0,0.5)'}}>{slide.subtitle}</p>
                {/* We include the address button only if it's the specific saint mary magdalene slide/layout, OR we keep it generic? 
                    The user asked to "make THIS section ... a slider". 
                    So the content of the slider usually replaces the content of the section.
                    The original section had "View Location". 
                    We can add a button if description has a link or just always have "View Location" if desired, 
                    but usually sliders have different Call to Actions.
                    For now, I'll assume the slider content (title/subtitle) comes from backend.
                */}
                 <div className="hero-address" style={{justifyContent: 'center'}}>
                    {/* Optionally rendering location if it's relevant, or maybe just a generic button if needed 
                        For now, preserving the visual style of the text.
                    */}
                  </div>
              </div>
            </div>
          </div>
        )})}
      </div>

      {/* Previous Arrow */}
      {slides.length > 1 && (
        <button
          onClick={goToPrev}
          style={{position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', backgroundColor: 'rgba(255, 255, 255, 0.3)', color: 'white', padding: '0.75rem', borderRadius: '50%', border: 'none', cursor: 'pointer', zIndex: 10, transition: 'background-color 0.3s'}}
          aria-label="Previous slide"
        >
          <svg xmlns="http://www.w3.org/2000/svg" style={{width: '1.5rem', height: '1.5rem'}} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6"></polyline>
          </svg>
        </button>
      )}

      {/* Next Arrow */}
      {slides.length > 1 && (
        <button
          onClick={goToNext}
          style={{position: 'absolute', right: '1rem', top: '50%', transform: 'translateY(-50%)', backgroundColor: 'rgba(255, 255, 255, 0.3)', color: 'white', padding: '0.75rem', borderRadius: '50%', border: 'none', cursor: 'pointer', zIndex: 10, transition: 'background-color 0.3s'}}
          aria-label="Next slide"
        >
          <svg xmlns="http://www.w3.org/2000/svg" style={{width: '1.5rem', height: '1.5rem'}} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="9 18 15 12 9 6"></polyline>
          </svg>
        </button>
      )}

      {/* Slide Indicators */}
      {slides.length > 1 && (
        <div style={{position: 'absolute', bottom: '1rem', left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: '0.5rem', zIndex: 10}}>
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              style={{
                width: index === currentSlide ? '2rem' : '0.75rem',
                height: '0.75rem',
                borderRadius: '9999px',
                backgroundColor: index === currentSlide ? 'white' : 'rgba(255, 255, 255, 0.5)',
                border: 'none',
                cursor: 'pointer',
                transition: 'all 0.3s'
              }}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default BannerSlider;
