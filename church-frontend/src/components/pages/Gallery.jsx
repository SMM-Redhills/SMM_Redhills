import React, { useState, useEffect, useRef } from 'react';
import { Camera, Video, Heart, Users } from 'lucide-react';
import { assignedColors } from '../../utils/sectionColors';

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

  const handleSubmit = async (e) => {
    e.preventDefault();
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
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <>
      <style jsx>{`
          .gallery-section {
            width: 100%;
            display: flex;
            flex-direction: column;
            min-height: 100vh;
          }
          
          /* Hero Section */
          .gallery-hero {
            position: relative;
            background: linear-gradient(135deg, #0ea5e9 0%, #0284c7 50%, #0369a1 100%);
            color: white;
            padding: 4rem 1rem;
            width: 100%;
            display: flex;
            justify-content: center;
          }
          
          .hero-container {
            position: relative;
            max-width: 72rem;
            margin: 0 auto;
            text-align: center;
          }
          
          .hero-header {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 1rem;
            margin-bottom: 1rem;
          }
          
          .hero-title {
            font-size: 3rem;
            font-weight: 700;
            line-height: 1.1;
            text-align: center;
            font-family: serif;
            color: white;
          }
          
          .hero-subtitle {
            display: block;
            font-size: 1.5rem;
            font-weight: 300;
            color: white;
          }
          
          .hero-description {
            font-size: 1.125rem;
            margin-bottom: 2rem;
            max-width: 48rem;
            margin: 0 auto 2rem auto;
            line-height: 1.7;
            text-align: center;
            color: white;
          }
          
          /* Gallery Container */
          .gallery-container {
            width: 100%;
            padding: 4rem 1rem;
            background-color: rgb(254, 243, 199);
            display: flex;
            flex-direction: column;
            align-items: center;
          }
          
          .content-container {
            max-width: 80rem;
            width: 100%;
            margin: 0 auto;
            display: flex;
            flex-direction: column;
            align-items: center;
          }
          
          .category-filter {
            display: flex;
            flex-wrap: wrap;
            justify-content: center;
            gap: 0.5rem;
            margin-bottom: 2rem;
          }
          
          .category-button {
            padding: 0.5rem 1rem;
            border-radius: 9999px;
            font-size: 0.875rem;
            font-weight: 500;
            transition: all 0.3s ease;
            color: #0284c7;
            border: 2px solid #0284c7;
            cursor: pointer;
            background-color: #ffffff;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
          }
          
          .category-button:hover {
            background-color: #0284c7;
            color: #ffffff;
            transform: translateY(-2px);
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
          }
          
          .category-button.active {
            background-color: #0284c7;
            color: #ffffff;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
          }
          
          .gallery-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 1.5rem;
            margin-bottom: 3rem;
            width: 100%;
          }
          
          .gallery-item {
            background-color: #ffffff;
            border-radius: 1rem;
            overflow: hidden;
            border: 1px solid #e2e8f0;
            transition: all 0.3s ease;
          }
          
          .gallery-item-image-container {
            position: relative;
            overflow: hidden;
          }
          
          .gallery-item-image {
            width: 100%;
            height: 16rem;
            object-fit: cover;
            transition: transform 0.3s ease;
          }
          
          .gallery-item-overlay {
            position: absolute;
            inset: 0;
            background-color: rgba(159, 150, 150, 0.3);
            display: flex;
            align-items: center;
            justify-content: center;
            opacity: 0;
            transition: opacity 0.3s ease;
          }
          
          .gallery-item:hover .gallery-item-overlay {
            opacity: 1;
          }
          
          .gallery-item:hover .gallery-item-image {
            transform: scale(1.05);
          }
          
          .gallery-item-content {
            padding: 1rem;
          }
          
          .gallery-item-meta {
            display: flex;
            align-items: center;
            justify-content: space-between;
            margin-bottom: 0.5rem;
          }
          
          .gallery-item-category {
            font-size: 0.75rem;
            font-weight: 500;
            color: #0ea5e9;
            background-color: rgba(14, 165, 233, 0.1);
            padding: 0.25rem 0.5rem;
            border-radius: 0.25rem;
          }
          
          .gallery-item-type {
            font-size: 0.75rem;
            color: #020a15ff;
            font-weight: 500;
          }
          
          .gallery-item-title {
            font-weight: 600;
            margin: 0;
            color: #1e293b;
            font-size: 1rem;
          }
          
          /* CTA Section */
          .cta-section {
            width: 100%;
            padding: 4rem 1rem;
            background-color: #f0fdf4;
            display: flex;
            justify-content: center;
          }
          
          .cta-container {
            max-width: 80rem;
            width: 100%;
            margin: 0 auto;
          }
          
          .cta-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 2rem;
            width: 100%;
          }
          
          .cta-card {
            background-color: #ffffff;
            border-radius: 1rem;
            padding: 2rem;
            text-align: center;
            border: 1px solid #e2e8f0;
            transition: all 0.3s ease;
          }
          
          .cta-icon {
            width: 4rem;
            height: 4rem;
            color: #0ea5e9;
            margin: 0 auto 1rem auto;
            display: block;
          }
          
          .cta-title {
            font-size: 1.5rem;
            font-weight: 600;
            margin-bottom: 1rem;
            font-family: serif;
            color: #1e293b;
          }
          
          .cta-description {
            margin-bottom: 1.5rem;
            line-height: 1.6;
            color: #475569;
            font-size: 1rem;
          }
          
          .cta-button {
            background-color: #0ea5e9;
            color: white;
            padding: 0.75rem 1.5rem;
            border-radius: 0.75rem;
            font-weight: 600;
            border: none;
            cursor: pointer;
            transition: all 0.3s ease;
          }
          
          .modal-overlay {
            position: fixed;
            inset: 0;
            background-color: rgba(0,0,0,0.5);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 50;
          }
          
          .modal-content {
            background-color: white;
            padding: 2rem;
            border-radius: 0.5rem;
            width: 90%;
            max-width: 500px;
            max-height: 80vh;
            overflow-y: auto;
          }
          
          .modal-title {
            font-size: 1.25rem;
            font-weight: 600;
            margin-bottom: 1rem;
            color: #1f2937;
          }
          
          .form-group {
            margin-bottom: 1rem;
          }
          
          .form-input, .form-select {
            width: 100%;
            padding: 0.5rem;
            border: 1px solid #d1d5db;
            border-radius: 0.375rem;
            color: #1f2937;
          }
          
          .form-actions {
            display: flex;
            gap: 1rem;
            justify-content: flex-end;
          }
          
          .btn-cancel {
            padding: 0.5rem 1rem;
            background-color: #6b7280;
            color: white;
            border: none;
            border-radius: 0.375rem;
            cursor: pointer;
          }
          
          .btn-submit {
            padding: 0.5rem 1rem;
            background-color: #2563eb;
            color: white;
            border: none;
            border-radius: 0.375rem;
            cursor: pointer;
          }
          
          /* Animation classes */
          .scroll-fade-in {
            opacity: 0;
            transition: opacity 0.6s ease;
          }
          
          .scroll-fade-in.animate {
            opacity: 1;
          }
          
          .scroll-slide-up {
            transform: translateY(20px);
            opacity: 0;
            transition: transform 0.6s ease, opacity 0.6s ease;
          }
          
          .scroll-slide-up.animate {
            transform: translateY(0);
            opacity: 1;
          }
          
          .scroll-slide-left {
            transform: translateX(-20px);
            opacity: 0;
            transition: transform 0.6s ease, opacity 0.6s ease;
          }
          
          .scroll-slide-left.animate {
            transform: translateX(0);
            opacity: 1;
          }
          
          .scroll-slide-right {
            transform: translateX(20px);
            opacity: 0;
            transition: transform 0.6s ease, opacity 0.6s ease;
          }
          
          .scroll-slide-right.animate {
            transform: translateX(0);
            opacity: 1;
          }
          
          .scroll-scale-in {
            transform: scale(0.9);
            opacity: 0;
            transition: transform 0.6s ease, opacity 0.6s ease;
          }
          
          .scroll-scale-in.animate {
            transform: scale(1);
            opacity: 1;
          }
          
          .scroll-stagger-children > * {
            opacity: 0;
            transition: all 0.6s ease;
          }
          
          .scroll-stagger-children.animate > * {
            opacity: 1;
          }
          
          /* Hover effects */
          .hover-lift {
            transition: transform 0.3s ease, box-shadow 0.3s ease;
          }
          
          .hover-lift:hover {
            transform: translateY(-5px);
            box-shadow: 0 10px 20px rgba(0,0,0,0.2);
          }
          
          .focus-smooth:focus {
            outline: none;
            box-shadow: 0 0 0 3px rgba(14, 165, 233, 0.5);
          }
        `}
      </style>
      
      <section id="gallery-section" className="gallery-section">
        {/* Hero Section */}
        <div className="gallery-hero scroll-fade-in smooth-scroll-section">
          <div className="hero-container">
            <div className="hero-header scroll-slide-up">
              <h1 className="hero-title">Our Gallery</h1>
            </div>
            <p className="hero-subtitle scroll-slide-up">
              Capturing moments of faith, fellowship, and community
            </p>
          </div>
        </div>

        {/* Gallery Container */}
        <div className="gallery-container">
          <div className="content-container">
            {/* Category Filter */}
            <div className="category-filter scroll-fade-in">
              {categories.map((category, index) => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`category-button hover-lift focus-smooth ${activeCategory === category ? 'active' : ''}`}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  {category}
                </button>
              ))}
            </div>

            {/* Gallery Grid */}
            <div className="gallery-grid scroll-stagger-children">
              {filteredItems.map((item, index) => (
                <div
                  key={item.id}
                  className="gallery-item scroll-scale-in hover-lift"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="gallery-item-image-container">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="gallery-item-image"
                    />
                    <div className="gallery-item-overlay">
                      <div>
                        {item.media_type === 'video' ? (
                          <Video style={{ width: '3rem', height: '3rem', color: 'white' }} />
                        ) : (
                          <Camera style={{ width: '3rem', height: '3rem', color: 'white' }} />
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="gallery-item-content">
                    <div className="gallery-item-meta">
                      <span className="gallery-item-category">
                        {item.category}
                      </span>
                      <span className="gallery-item-type">
                        {item.media_type === 'video' ? 'Video' : 'Photo'}
                      </span>
                    </div>
                    <h3 className="gallery-item-title">
                      {item.title}
                    </h3>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="cta-section scroll-fade-in smooth-scroll-section">
          <div className="cta-container">
            <div className="cta-grid scroll-stagger-children">
              <div className="cta-card hover-lift">
                <Heart className="cta-icon scroll-scale-in" />
                <h2 className="cta-title scroll-slide-up">
                  Share Your Moments
                </h2>
                <p className="cta-description scroll-slide-up">
                  Have photos from our events? We'd love to feature them in our gallery.
                </p>
                <button className="cta-button hover-lift focus-smooth">
                  Submit Photos
                </button>
              </div>

              <div className="cta-card hover-lift">
                <Users className="cta-icon scroll-scale-in" />
                <h2 className="cta-title scroll-slide-up">
                  Join Our Events
                </h2>
                <p className="cta-description scroll-slide-up">
                  Be part of these memorable moments. Check out our upcoming events.
                </p>
                <button className="cta-button hover-lift focus-smooth">
                  View Events
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Add Gallery Item Modal */}
        {showAddForm && (
          <div className="modal-overlay">
            <div className="modal-content">
              <h3 className="modal-title">Add Gallery Item</h3>
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <input
                    type="text"
                    name="title"
                    placeholder="Title"
                    value={formData.title}
                    onChange={handleInputChange}
                    required
                    className="form-input"
                  />
                </div>
                <div className="form-group">
                  <select
                    name="media_type"
                    value={formData.media_type}
                    onChange={handleInputChange}
                    className="form-select"
                  >
                    <option value="image">Photo</option>
                    <option value="video">Video</option>
                  </select>
                </div>
                <div className="form-group">
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    className="form-select"
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
                  <div className="form-group">
                    <input
                      type="url"
                      name="image"
                      placeholder="Image URL"
                      value={formData.image}
                      onChange={handleInputChange}
                      required
                      className="form-input"
                    />
                  </div>
                ) : (
                  <div className="form-group">
                    <input
                      type="url"
                      name="video_url"
                      placeholder="Video URL"
                      value={formData.video_url}
                      onChange={handleInputChange}
                      required
                      className="form-input"
                    />
                  </div>
                )}
                <div className="form-actions">
                  <button
                    type="button"
                    onClick={() => {
                      setShowAddForm(false);
                      setFormData({ title: '', image: '', video_url: '', category: 'Community', media_type: 'image' });
                    }}
                    className="btn-cancel"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="btn-submit"
                  >
                    Add Item
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </section>
    </>
  );
};

export default Gallery;