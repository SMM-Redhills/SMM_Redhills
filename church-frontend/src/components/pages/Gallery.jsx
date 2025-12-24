import React, { useState, useEffect, useRef } from 'react';
import { Camera, Video, Heart, Users, X } from 'lucide-react';
import { churchAPI } from '../../services/api';
import { adminAPI } from '../../services/adminApi';

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
  const [galleryItems, setGalleryItems] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const [selectedMedia, setSelectedMedia] = useState(null);

  useEffect(() => {
    const adminToken = localStorage.getItem('adminToken');
    setIsAdmin(!!adminToken);
    fetchGallery();
  }, []);

  const fetchGallery = async () => {
    try {
      const response = await churchAPI.getGallery();
      const data = response.data.results || response.data;
      setGalleryItems(data);
    } catch (error) {
      console.error('Error fetching gallery:', error);
    }
  };

  const categories = [
    'All', 
    'Architecture', 
    'Celebrations', 
    'Worship', 
    'Community', 
    'Prayer', 
    'Youth',
    'General',
    ...new Set(galleryItems.map(item => item.category).filter(cat => ![
      'All', 'Architecture', 'Celebrations', 'Worship', 'Community', 'Prayer', 'Youth', 'General'
    ].includes(cat)))
  ];

  const filteredItems = activeCategory === 'All'
    ? galleryItems
    : galleryItems.filter(item => item.category === activeCategory);

  useEffect(() => {
    // Basic visibility ensure
    const elements = document.querySelectorAll('.gallery-item');
    elements.forEach(el => el.style.opacity = '1');
  }, [filteredItems]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.title && (formData.image || formData.video_url)) {
      try {
        const payload = {
          ...formData,
          image: formData.media_type === 'image' ? formData.image : null,
          video_url: formData.media_type === 'video' ? formData.video_url : null
        };
        const response = await adminAPI.createItem('gallery', payload);
        
        if (response.status === 201) {
          fetchGallery();
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
      <style>{`
        .gallery-section {
          width: 100%;
          display: flex;
          flex-direction: column;
          background-color: #ffffff;
        }
        
        .gallery-hero {
          position: relative;
          background: linear-gradient(135deg, #0ea5e9 0%, #0284c7 50%, #0369a1 100%);
          color: white;
          padding: 4rem 1rem;
          text-align: center;
        }
        
        .hero-container {
          max-width: 72rem;
          margin: 0 auto;
        }
        
        .hero-title {
          font-size: 3.5rem;
          font-weight: 700;
          margin-bottom: 1rem;
          font-family: serif;
        }
        
        .hero-subtitle {
          font-size: 1.5rem;
          font-weight: 300;
          opacity: 0.9;
        }
        
        .gallery-container {
          padding: 4rem 1rem;
          background-color: #fef3c7;
        }
        
        .content-container {
          max-width: 80rem;
          margin: 0 auto;
        }
        
        .category-filter {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 0.75rem;
          margin-bottom: 3rem;
        }
        
        .category-button {
          padding: 0.6rem 1.25rem;
          border-radius: 9999px;
          font-weight: 600;
          transition: all 0.3s ease;
          background: white;
          color: #0284c7;
          border: 2px solid #0284c7;
          cursor: pointer;
        }
        
        .category-button:hover, .category-button.active {
          background: #0284c7;
          color: white;
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(2, 132, 199, 0.3);
        }
        
        .gallery-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
          gap: 2rem;
        }
        
        .gallery-item {
          background: white;
          border-radius: 1.25rem;
          overflow: hidden;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          position: relative;
        }
        
        .gallery-item:hover {
          transform: translateY(-8px);
          box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
        }
        
        .gallery-item-image-container {
          position: relative;
          aspect-ratio: 16/9;
          overflow: hidden;
          background: #f1f5f9;
        }
        
        .gallery-item-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.6s ease;
        }
        
        .gallery-item:hover .gallery-item-image {
          transform: scale(1.1);
        }
        
        .gallery-item-overlay {
          position: absolute;
          inset: 0;
          background: rgba(0, 0, 0, 0.4);
          display: flex;
          align-items: center;
          justify-content: center;
          opacity: 0;
          transition: all 0.3s ease;
          cursor: pointer;
          backdrop-filter: blur(2px);
        }
        
        .gallery-item:hover .gallery-item-overlay {
          opacity: 1;
        }
        
        .gallery-item-content {
          padding: 1.25rem;
        }
        
        .gallery-item-meta {
          display: flex;
          justify-content: space-between;
          margin-bottom: 0.5rem;
        }
        
        .gallery-item-category {
          font-size: 0.75rem;
          font-weight: 700;
          color: #0284c7;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }
        
        .gallery-item-title {
          font-size: 1.125rem;
          font-weight: 600;
          color: #1e293b;
          margin: 0;
        }

        /* --- Media Viewer Modal --- */
        .viewer-overlay {
          position: fixed;
          inset: 0;
          background: rgba(0, 0, 0, 0.95);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 9999;
          padding: 2rem;
          backdrop-filter: blur(8px);
          animation: fadeIn 0.3s ease;
        }

        .viewer-container {
          position: relative;
          max-width: 90vw;
          max-height: 90vh;
          width: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          animation: scaleIn 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
        }

        .viewer-close {
          position: absolute;
          top: -3.5rem;
          right: 0;
          background: #ef4444;
          color: white;
          border: none;
          width: 3rem;
          height: 3rem;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.3s ease;
          box-shadow: 0 4px 12px rgba(0,0,0,0.3);
        }

        .viewer-close:hover {
          transform: scale(1.1) rotate(90deg);
          background: #dc2626;
        }

        .viewer-media {
          max-width: 100%;
          max-height: 80vh;
          border-radius: 1rem;
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
          object-fit: contain;
          background: black;
        }

        .viewer-title {
          color: white;
          margin-top: 1.5rem;
          font-size: 1.5rem;
          font-weight: 600;
          font-family: serif;
          text-align: center;
          text-shadow: 0 2px 4px rgba(0,0,0,0.5);
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes scaleIn {
          from { transform: scale(0.9); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }

        /* --- Animations --- */
        .scroll-fade-in { animation: fadeIn 0.8s ease-out forwards; }
        .scroll-slide-up { animation: slideUp 0.8s ease-out forwards; }
        .scroll-scale-in { animation: scaleIn 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) forwards; }

        @keyframes slideUp {
          from { transform: translateY(30px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }

        @media (max-width: 768px) {
          .hero-title { font-size: 2.5rem; }
          .viewer-overlay { padding: 1rem; }
          .viewer-close { top: 0.5rem; right: 0.5rem; width: 2.5rem; height: 2.5rem; }
          .viewer-title { font-size: 1.1rem; margin-top: 1rem; }
        }
      `}</style>

      <section className="gallery-section">
        <div className="gallery-hero">
          <div className="hero-container">
            <h1 className="hero-title">Our Gallery</h1>
            <p className="hero-subtitle">Capturing moments of faith, fellowship, and community</p>
          </div>
        </div>

        <div className="gallery-container">
          <div className="content-container">
            <div className="category-filter">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`category-button ${activeCategory === cat ? 'active' : ''}`}
                >
                  {cat}
                </button>
              ))}
            </div>

            <div className="gallery-grid">
              {filteredItems.map((item, idx) => (
                <div
                  key={item.id}
                  className="gallery-item"
                  style={{ opacity: 1 }}
                >
                  <div className="gallery-item-image-container">
                    {item.media_type === 'video' ? (
                      <div className="gallery-item-image" style={{ background: '#0f172a', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Video size={48} color="white" />
                      </div>
                    ) : (
                      <img
                        src={item.media_url || item.image_url || (item.image ? (item.image.startsWith('http') ? item.image : `http://${window.location.hostname}:8000${item.image.startsWith('/') ? '' : '/'}${item.image}`) : '')}
                        alt={item.title}
                        className="gallery-item-image"
                        style={{ opacity: 1 }}
                        onError={(e) => { 
                          console.log('Image load error:', e.target.src);
                          if (!e.target.src.includes('placeholder')) {
                            e.target.src = 'https://via.placeholder.com/400x300?text=Image+Not+Found'; 
                          }
                        }}
                      />
                    )}
                    <div className="gallery-item-overlay" onClick={() => setSelectedMedia(item)}>
                      {item.media_type === 'video' ? <Video size={48} color="white" /> : <Camera size={48} color="white" />}
                    </div>
                  </div>
                  <div className="gallery-item-content">
                    <div className="gallery-item-meta">
                      <span className="gallery-item-category">{item.category}</span>
                    </div>
                    <h3 className="gallery-item-title">{item.title}</h3>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Media Viewer Modal */}
        {selectedMedia && (
          <div className="viewer-overlay" onClick={() => setSelectedMedia(null)}>
            <div className="viewer-container" onClick={(e) => e.stopPropagation()}>
              <button className="viewer-close" onClick={() => setSelectedMedia(null)}>
                <X size={24} />
              </button>
              
              {selectedMedia.media_type === 'video' ? (
                <video 
                  className="viewer-media"
                  src={selectedMedia.media_url || selectedMedia.video_url || (selectedMedia.video ? (selectedMedia.video.startsWith('http') ? selectedMedia.video : `http://${window.location.hostname}:8000${selectedMedia.video.startsWith('/') ? '' : '/'}${selectedMedia.video}`) : '')}
                  autoPlay
                  controls
                  playsInline
                />
              ) : (
                <img 
                  className="viewer-media"
                  src={selectedMedia.image ? (selectedMedia.image.startsWith('http') ? selectedMedia.image : `http://localhost:8000${selectedMedia.image.startsWith('/') ? '' : '/'}${selectedMedia.image}`) : (selectedMedia.image_url || selectedMedia.media_url)}
                  alt={selectedMedia.title}
                />
              )}
              
              <h3 className="viewer-title">{selectedMedia.title}</h3>
            </div>
          </div>
        )}
      </section>
    </>
  );
};

export default Gallery;