import React, { useState, useEffect, useRef } from 'react';
import { Camera, Video, Heart, Users } from 'lucide-react';

const sampleGalleryItems = [
  { id: 1, title: 'church Front View', image: '/assets/images/smm.jpg', media_type: 'image', category: 'Architecture' },
  { id: 2, title: 'Saint Mary Magdalene Feast', image: 'https://images.unsplash.com/photo-1545558014-8692077e9b5c?w=600', media_type: 'image', category: 'Celebrations' },
  { id: 3, title: 'Sunday Mass Service', image: 'https://images.unsplash.com/photo-1507692049790-de58290a4334?w=600', media_type: 'image', category: 'Worship' },
  { id: 4, title: 'Community Gathering', image: 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=600', media_type: 'image', category: 'Community' },
  { id: 5, title: 'Prayer Meeting', image: 'https://images.unsplash.com/photo-1438232992991-995b7058bbb3?w=600', media_type: 'image', category: 'Prayer' },
  { id: 6, title: 'Youth Ministry', image: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=600', media_type: 'image', category: 'Youth' }
];

const Gallery = ({ onNavigate, scrollToSection }) => {
  const [activeCategory, setActiveCategory] = useState('All');
  const observerRef = useRef(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    image: '',
    video_url: '',
    category: 'Community',
    media_type: 'image'
  });
  const [galleryItems, setGalleryItems] = useState(sampleGalleryItems);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const adminToken = localStorage.getItem('adminToken');
    setIsAdmin(!!adminToken);
  }, []);

  const categories = ['All', 'Architecture', 'Celebrations', 'Worship', 'Community', 'Prayer', 'Youth'];

  const filteredItems = activeCategory === 'All'
    ? galleryItems
    : galleryItems.filter(item => item.category === activeCategory);

  // Initialize scroll animations
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

  useEffect(() => {
    if (observerRef.current) {
      const newElements = document.querySelectorAll('.gallery-item');
      newElements.forEach((el) => {
        el.classList.remove('animate');
        observerRef.current.observe(el);
      });
    }
  }, [filteredItems]);

  return (
    <section
      id="gallery-section"
      className="scroll-fade-in smooth-scroll-section"
      style={{
        padding: '4rem 0',
        background: 'linear-gradient(135deg, #0ea5e9 0%, #0284c7 50%, #0369a1 100%)',
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        minHeight: '100vh'
      }}
    >
      <div
        style={{
          color: 'white', // Sets all text to white by default
          maxWidth: '80rem',
          margin: '0 auto',
          padding: '0 1rem',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          width: '100%'
        }}
      >
        <div className="scroll-slide-up" style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem', marginBottom: '1rem'}}>
            <h1 style={{ fontSize: '3rem', fontFamily: 'serif', fontWeight: '700' }}>
              Our Gallery
            </h1>
            {isAdmin && (
              <button
                onClick={() => setShowAddForm(true)}
                style={{
                  backgroundColor: '#10b981',
                  color: 'white',
                  border: 'none',
                  borderRadius: '50%',
                  width: '50px',
                  height: '50px',
                  fontSize: '1.5rem',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'all 0.2s'
                }}
                onMouseEnter={(e) => e.target.style.backgroundColor = '#059669'}
                onMouseLeave={(e) => e.target.style.backgroundColor = '#10b981'}
              >
                +
              </button>
            )}
          </div>
          <p style={{ fontSize: '1.125rem' }}>
            Capturing moments of faith, fellowship, and community
          </p>
        </div>

        {/* Category Filter */}
        <div
          className="scroll-fade-in"
          style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '0.5rem', marginBottom: '2rem' }}
        >
          {categories.map((category, index) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className="hover-lift focus-smooth"
              style={{
                padding: '0.5rem 1rem',
                borderRadius: '9999px',
                fontSize: '0.875rem',
                fontWeight: '500',
                transition: 'all 0.3s ease',
                backgroundColor: activeCategory === category ? '#0ea5e9' : 'rgba(255, 255, 255, 0.1)',
                color: 'white', // ensures white font always
                border: '1px solid rgba(255, 255, 255, 0.2)',
                cursor: 'pointer',
                animationDelay: `${index * 0.1}s`
              }}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div
          id="gallery-grid"
          className="scroll-stagger-children"
          style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem', marginBottom: '3rem', width: '100%' }}
        >
          {filteredItems.map((item, index) => (
            <div
              key={item.id}
              className="gallery-item scroll-scale-in hover-lift"
              style={{
                backgroundColor: 'rgba(0, 0, 0, 0.3)',
                borderRadius: '1rem',
                overflow: 'hidden',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                backdropFilter: 'blur(10px)',
                transition: 'all 0.3s ease',
                animationDelay: `${index * 0.1}s`
              }}
            >
              <div style={{ position: 'relative', overflow: 'hidden' }}>
                <img
                  src={item.image}
                  alt={item.title}
                  style={{ width: '100%', height: '16rem', objectFit: 'cover', transition: 'transform 0.3s ease' }}
                />
                <div style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(0, 0, 0, 0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: 0, transition: 'opacity 0.3s ease' }} className="hover-overlay">
                  <div>
                    {item.media_type === 'video' ? (
                      <Video style={{ width: '3rem', height: '3rem', color: 'white' }} />
                    ) : (
                      <Camera style={{ width: '3rem', height: '3rem', color: 'white' }} />
                    )}
                  </div>
                </div>
              </div>
              <div style={{ padding: '1rem' }}>
                <div className="scroll-fade-in" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                  <span style={{ fontSize: '0.75rem', fontWeight: '500', color: '#0ea5e9', backgroundColor: 'rgba(14, 165, 233, 0.1)', padding: '0.25rem 0.5rem', borderRadius: '0.25rem' }}>
                    {item.category}
                  </span>
                  <span style={{ fontSize: '0.75rem' }}>
                    {item.media_type === 'video' ? 'Video' : 'Photo'}
                  </span>
                </div>
                <h3 className="scroll-slide-up" style={{ fontWeight: '600', margin: 0 }}>
                  {item.title}
                </h3>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div
          className="scroll-stagger-children"
          style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', width: '100%', maxWidth: '60rem' }}
        >
          <div className="hover-lift" style={{ backgroundColor: 'rgba(255, 255, 255, 0.05)', borderRadius: '1rem', padding: '2rem', textAlign: 'center', border: '1px solid rgba(255, 255, 255, 0.1)', backdropFilter: 'blur(10px)', transition: 'all 0.3s ease' }}>
            <Heart className="scroll-scale-in" style={{ width: '4rem', height: '4rem', color: '#0ea5e9', margin: '0 auto 1rem auto', display: 'block' }} />
            <h2 className="scroll-slide-up" style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '1rem', fontFamily: 'serif' }}>
              Share Your Moments
            </h2>
            <p className="scroll-slide-up" style={{ marginBottom: '1.5rem', lineHeight: '1.6' }}>
              Have photos from our events? We'd love to feature them in our gallery.
            </p>
            <button
              className="hover-lift focus-smooth"
              style={{ backgroundColor: '#0ea5e9', color: 'white', padding: '0.75rem 1.5rem', borderRadius: '0.75rem', fontWeight: '600', border: 'none', cursor: 'pointer', transition: 'all 0.3s ease' }}
            >
              Submit Photos
            </button>
          </div>

          <div className="hover-lift" style={{ backgroundColor: 'rgba(255, 255, 255, 0.05)', borderRadius: '1rem', padding: '2rem', textAlign: 'center', border: '1px solid rgba(255, 255, 255, 0.1)', backdropFilter: 'blur(10px)', transition: 'all 0.3s ease' }}>
            <Users className="scroll-scale-in" style={{ width: '4rem', height: '4rem', color: '#0ea5e9', margin: '0 auto 1rem auto', display: 'block' }} />
            <h2 className="scroll-slide-up" style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '1rem', fontFamily: 'serif' }}>
              Join Our Events
            </h2>
            <p className="scroll-slide-up" style={{ marginBottom: '1.5rem', lineHeight: '1.6' }}>
              Be part of these memorable moments. Check out our upcoming events.
            </p>
            <button
              className="hover-lift focus-smooth"
              style={{ backgroundColor: '#0ea5e9', color: 'white', padding: '0.75rem 1.5rem', borderRadius: '0.75rem', fontWeight: '600', border: 'none', cursor: 'pointer', transition: 'all 0.3s ease' }}
            >
              View Events
            </button>
          </div>
        </div>
      </div>

      {/* Add Gallery Item Modal */}
      {showAddForm && (
        <div style={{position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 50}}>
          <div style={{backgroundColor: 'white', padding: '2rem', borderRadius: '0.5rem', width: '90%', maxWidth: '500px', maxHeight: '80vh', overflowY: 'auto'}}>
            <h3 style={{fontSize: '1.25rem', fontWeight: '600', marginBottom: '1rem', color: '#1f2937'}}>Add Gallery Item</h3>
            <form onSubmit={(e) => {
              e.preventDefault();
              const newItem = {
                id: Date.now(),
                ...formData,
                image: formData.media_type === 'image' ? formData.image : 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=600'
              };
              setGalleryItems([newItem, ...galleryItems]);
              setShowAddForm(false);
              setFormData({ title: '', image: '', video_url: '', category: 'Community', media_type: 'image' });
            }}>
              <div style={{marginBottom: '1rem'}}>
                <input
                  type="text"
                  placeholder="Title"
                  value={formData.title}
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                  required
                  style={{width: '100%', padding: '0.5rem', border: '1px solid #d1d5db', borderRadius: '0.375rem', color: '#1f2937'}}
                />
              </div>
              <div style={{marginBottom: '1rem'}}>
                <select
                  value={formData.media_type}
                  onChange={(e) => setFormData({...formData, media_type: e.target.value})}
                  style={{width: '100%', padding: '0.5rem', border: '1px solid #d1d5db', borderRadius: '0.375rem', color: '#1f2937'}}
                >
                  <option value="image">Photo</option>
                  <option value="video">Video</option>
                </select>
              </div>
              <div style={{marginBottom: '1rem'}}>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({...formData, category: e.target.value})}
                  style={{width: '100%', padding: '0.5rem', border: '1px solid #d1d5db', borderRadius: '0.375rem', color: '#1f2937'}}
                >
                  <option value="Community">Community</option>
                  <option value="Architecture">Architecture</option>
                  <option value="Celebrations">Celebrations</option>
                  <option value="Worship">Worship</option>
                  <option value="Prayer">Prayer</option>
                  <option value="Youth">Youth</option>
                </select>
              </div>
              {formData.media_type === 'image' ? (
                <div style={{marginBottom: '1rem'}}>
                  <input
                    type="url"
                    placeholder="Image URL"
                    value={formData.image}
                    onChange={(e) => setFormData({...formData, image: e.target.value})}
                    required
                    style={{width: '100%', padding: '0.5rem', border: '1px solid #d1d5db', borderRadius: '0.375rem', color: '#1f2937'}}
                  />
                </div>
              ) : (
                <div style={{marginBottom: '1rem'}}>
                  <input
                    type="url"
                    placeholder="Video URL"
                    value={formData.video_url}
                    onChange={(e) => setFormData({...formData, video_url: e.target.value})}
                    required
                    style={{width: '100%', padding: '0.5rem', border: '1px solid #d1d5db', borderRadius: '0.375rem', color: '#1f2937'}}
                  />
                </div>
              )}
              <div style={{display: 'flex', gap: '1rem', justifyContent: 'flex-end'}}>
                <button
                  type="button"
                  onClick={() => {setShowAddForm(false); setFormData({ title: '', image: '', video_url: '', category: 'Community', media_type: 'image' });}}
                  style={{padding: '0.5rem 1rem', backgroundColor: '#6b7280', color: 'white', border: 'none', borderRadius: '0.375rem', cursor: 'pointer'}}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={async () => {
                    if (formData.title && (formData.image || formData.video_url)) {
                      try {
                        const response = await fetch('http://localhost:8000/api/gallery/', {
                          method: 'POST',
                          headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Token ${localStorage.getItem('adminToken')}`,
                          },
                          body: JSON.stringify({
                            ...formData,
                            image_url: formData.media_type === 'image' ? formData.image : null,
                            video_url: formData.media_type === 'video' ? formData.video_url : null
                          })
                        });
                        
                        if (response.ok) {
                          const newItem = {
                            id: Date.now(),
                            ...formData,
                            image: formData.media_type === 'image' ? formData.image : 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=600'
                          };
                          setGalleryItems([newItem, ...galleryItems]);
                          setShowAddForm(false);
                          setFormData({ title: '', image: '', video_url: '', category: 'Community', media_type: 'image' });
                          alert('Gallery item added successfully!');
                        } else {
                          alert('Error adding gallery item. Please try again.');
                        }
                      } catch (error) {
                        console.error('Error:', error);
                        alert('Error adding gallery item. Please try again.');
                      }
                    }
                  }}
                  style={{padding: '0.5rem 1rem', backgroundColor: '#2563eb', color: 'white', border: 'none', borderRadius: '0.375rem', cursor: 'pointer'}}
                >
                  Add Item
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Custom styles for hover effects */}
      <style jsx>{`
        .gallery-item:hover .hover-overlay {
          opacity: 1;
        }

        .gallery-item:hover img {
          transform: scale(1.05);
        }
      `}</style>
    </section>
  );
};

export default Gallery;
