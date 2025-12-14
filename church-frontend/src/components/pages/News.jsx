import React, { useState, useEffect, useRef } from 'react';
import { Calendar, Clock, Users, Cross } from 'lucide-react';
import { assignedColors } from '../../utils/sectionColors';

const sampleNews = [
  { id: 1, title: "Saint Mary Magdalene Feast Day Celebration", date: "22/07/2025", content: "Join us for the annual feast day of Saint Mary Magdalene with special masses, procession, and community celebration.", category: "Celebration" },
  { id: 2, title: "church Renovation Completed", date: "10/06/2025", content: "Major renovation and restoration works on stained glass windows and altar have been completed, enhancing our worship space.", category: "Updates" },
  { id: 3, title: "New Prayer Group Formation", date: "15/05/2025", content: "We are forming a new prayer group dedicated to Saint Mary Magdalene. All parishioners are welcome to join.", category: "Community" }
];

const News = ({ onNavigate, scrollToSection }) => {
  const [news, setNews] = useState([]);
  const observerRef = useRef(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    category: 'Updates',
    image_url: ''
  });
  const [isAdmin, setIsAdmin] = useState(false);
  const [selectedNews, setSelectedNews] = useState(null);

  useEffect(() => {
    const adminToken = localStorage.getItem('adminToken');
    setIsAdmin(!!adminToken);
  }, []);

  useEffect(() => {
    // Sort news by creation date (newest first)
    const sortedNews = [...sampleNews].sort((a, b) => {
      const dateA = new Date(a.created_at || a.date);
      const dateB = new Date(b.created_at || b.date);
      return dateB - dateA;
    });
    setNews(sortedNews);
  }, []);

  // Initialize scroll animations
  useEffect(() => {
    // Create intersection observer for scroll animations
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

    // Observe all elements with scroll animation classes
    const animatedElements = document.querySelectorAll(
      '.scroll-fade-in, .scroll-slide-up, .scroll-slide-left, .scroll-slide-right, .scroll-scale-in, .scroll-stagger-children'
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
  }, [news]);
  
  const getCategoryIcon = (category) => {
    switch(category) {
      case 'Celebration': return <Calendar style={{width: '1.25rem', height: '1.25rem'}} />;
      case 'Updates': return <Clock style={{width: '1.25rem', height: '1.25rem'}} />;
      case 'Community': return <Users style={{width: '1.25rem', height: '1.25rem'}} />;
      default: return <Calendar style={{width: '1.25rem', height: '1.25rem'}} />;
    }
  };

  const handleAddButtonHover = (e) => {
    e.target.style.backgroundColor = '#059669';
  };

  const handleAddButtonLeave = (e) => {
    e.target.style.backgroundColor = '#10b981';
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const newNews = {
      id: Date.now(),
      ...formData,
      date: new Date().toLocaleDateString('en-GB'),
      created_at: new Date().toISOString()
    };
    setNews([newNews, ...news]);
    setShowAddForm(false);
    setFormData({ title: '', content: '', category: 'Updates', image_url: '' });
  };

  const handleCancelClick = () => {
    setShowAddForm(false);
    setFormData({ title: '', content: '', category: 'Updates', image_url: '' });
  };

  const handleAddNewsClick = async () => {
    if (formData.title && formData.content) {
      try {
        const response = await fetch('http://localhost:8001/api/church_app/news/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token ${localStorage.getItem('adminToken')}`,
          },
          body: JSON.stringify({
            ...formData,
            is_published: true
          })
        });
        
        if (response.ok) {
          const newNews = {
            id: Date.now(),
            ...formData,
            date: new Date().toLocaleDateString('en-GB'),
            created_at: new Date().toISOString()
          };
          setNews([newNews, ...news]);
          setShowAddForm(false);
          setFormData({ title: '', content: '', category: 'Updates', image_url: '' });
          alert('News added successfully!');
        } else {
          alert('Error adding news. Please try again.');
        }
      } catch (error) {
        console.error('Error:', error);
        alert('Error adding news. Please try again.');
      }
    }
  };

  return (
    <>
      <style>{`
        .news-container {
          min-height: 100vh;
          background-color: #ffffff;
          width: 100%;
        }
        .news-hero {
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
        .add-button {
          background-color: #10b981;
          color: white;
          border: none;
          border-radius: 50%;
          width: 50px;
          height: 50px;
          font-size: 1.5rem;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.2s;
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
        .main-content {
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
        }
        .news-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 2rem;
          width: 100%;
        }
        .news-card {
          background-color: #ffffff;
          border-radius: 1rem;
          padding: 2rem;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
          border: 1px solid #e2e8f0;
          text-align: center;
          transition: all 0.3s ease;
        }
        .news-card-header {
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 1rem;
          gap: 0.5rem;
        }
        .category-icon {
          color: #0ea5e9;
        }
        .category-badge {
          color: #0ea5e9;
          font-size: 0.875rem;
          font-weight: 500;
          background-color: #e0f2fe;
          padding: 0.25rem 0.75rem;
          border-radius: 1rem;
        }
        .news-date {
          color: #64748b;
          font-size: 0.875rem;
          margin-bottom: 1rem;
        }
        .news-title {
          font-size: 1.25rem;
          font-weight: 600;
          margin-bottom: 1rem;
          color: #1e293b;
        }
        .news-content {
          color: #64748b;
          margin-bottom: 1.5rem;
          line-height: 1.6;
        }
        .read-more-btn {
          color: #0ea5e9;
          font-weight: 500;
          background-color: transparent;
          border: none;
          cursor: pointer;
        }
        .view-all-container {
          text-align: center;
          margin-top: 3rem;
        }
        .view-all-btn {
          background-color: #0284c7;
          color: white;
          padding: 0.75rem 2rem;
          border-radius: 0.5rem;
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
          color: #000000;
        }
        .form-group {
          margin-bottom: 1rem;
        }
        .form-input {
          width: 100%;
          padding: 0.5rem;
          border: 1px solid #d1d5db;
          border-radius: 0.375rem;
          color: #000000;
        }
        .form-textarea {
          width: 100%;
          padding: 0.5rem;
          border: 1px solid #d1d5db;
          border-radius: 0.375rem;
          color: #000000;
        }
        .button-group {
          display: flex;
          gap: 1rem;
          justify-content: flex-end;
        }
        .cancel-btn {
          padding: 0.5rem 1rem;
          background-color: #6b7280;
          color: white;
          border: none;
          border-radius: 0.375rem;
          cursor: pointer;
        }
        .submit-btn {
          padding: 0.5rem 1rem;
          background-color: #2563eb;
          color: white;
          border: none;
          border-radius: 0.375rem;
          cursor: pointer;
        }
        .detail-modal-overlay {
          position: fixed;
          inset: 0;
          background-color: rgba(0,0,0,0.8);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 50;
          padding: 1rem;
        }
        .detail-modal-content {
          background-color: white;
          border-radius: 1rem;
          padding: 2rem;
          max-width: 40rem;
          width: 100%;
          max-height: 80vh;
          overflow-y: auto;
        }
        .detail-category-container {
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 1rem;
          gap: 0.5rem;
        }
        .detail-category-badge {
          color: #0284c7;
          font-size: 0.875rem;
          font-weight: 500;
          background-color: #e0f2fe;
          padding: 0.25rem 0.75rem;
          border-radius: 1rem;
        }
        .detail-date {
          color: #64748b;
          font-size: 0.875rem;
          margin-bottom: 1rem;
          text-align: center;
        }
        .detail-title {
          font-size: 1.5rem;
          font-weight: 600;
          margin-bottom: 1.5rem;
          color: #0284c7;
          font-family: serif;
          text-align: center;
        }
        .detail-image {
          width: 100%;
          height: 200px;
          object-fit: cover;
          border-radius: 0.5rem;
          margin-bottom: 1.5rem;
        }
        .detail-content {
          color: #64748b;
          line-height: 1.6;
          margin-bottom: 2rem;
          white-space: pre-line;
        }
        .close-btn {
          width: 100%;
          background-color: #0284c7;
          color: white;
          padding: 0.75rem;
          border-radius: 0.5rem;
          font-weight: 600;
          border: none;
          cursor: pointer;
        }
      `}</style>

      <div className="news-container">
        {/* Hero Section */}
        <section 
          id="news-hero"
          className="scroll-fade-in smooth-scroll-section news-hero"
        >
          <div className="hero-container">
            <div className="hero-header">
              <h1 className="scroll-slide-up hero-title">
                Latest News
              </h1>
             
            </div>
            <span className="hero-subtitle">Parish Community Updates</span>
            <p className="scroll-slide-up hero-description">
              Stay updated with our parish community news and announcements
            </p>
          </div>
        </section>

        {/* Main Content */}
        <div className="main-content">
          <div className="content-container">
            <div 
              id="news-content"
              className="scroll-stagger-children smooth-scroll-section news-grid"
            >
              {news.map((n, index) => (
                <div 
                  key={n.id} 
                  className="hover-lift news-card"
                  style={{animationDelay: `${index * 0.1}s`}}
                >
                  <div className="news-card-header">
                    <div className="category-icon">
                      {getCategoryIcon(n.category)}
                    </div>
                    <span className="category-badge">{n.category}</span>
                  </div>
                  <div className="news-date">{n.date}</div>
                  <h3 className="news-title">{n.title}</h3>
                  <p className="news-content">
                    {n.content.length > 100 ? `${n.content.substring(0, 100)}...` : n.content}
                  </p>
                  <button 
                    onClick={() => setSelectedNews(n)}
                    className="read-more-btn"
                  >
                    Read More →
                  </button>
                </div>
              ))}
            </div>

            <div className="scroll-fade-in view-all-container">
              <button className="hover-lift focus-smooth view-all-btn">
                View All News
              </button>
            </div>
          </div>
        </div>
        
        {/* Add News Modal */}
        {showAddForm && (
          <div className="modal-overlay">
            <div className="modal-content">
              <h3 className="modal-title">Add News</h3>
              <form onSubmit={handleFormSubmit}>
                <div className="form-group">
                  <input
                    type="text"
                    placeholder="News Title"
                    value={formData.title}
                    onChange={(e) => setFormData({...formData, title: e.target.value})}
                    required
                    className="form-input"
                  />
                </div>
                <div className="form-group">
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({...formData, category: e.target.value})}
                    className="form-input"
                  >
                    <option value="Updates">Updates</option>
                    <option value="Celebration">Celebration</option>
                    <option value="Community">Community</option>
                  </select>
                </div>
                <div className="form-group">
                  <input
                    type="url"
                    placeholder="Image URL (optional)"
                    value={formData.image_url}
                    onChange={(e) => setFormData({...formData, image_url: e.target.value})}
                    className="form-input"
                  />
                </div>
                <div className="form-group">
                  <textarea
                    placeholder="News Content"
                    value={formData.content}
                    onChange={(e) => setFormData({...formData, content: e.target.value})}
                    required
                    rows="4"
                    className="form-textarea"
                  />
                </div>
                <div className="button-group">
                  <button
                    type="button"
                    onClick={handleCancelClick}
                    className="cancel-btn"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={handleAddNewsClick}
                    className="submit-btn"
                  >
                    Add News
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
        
        {/* News Detail Modal */}
        {selectedNews && (
          <div className="detail-modal-overlay" onClick={() => setSelectedNews(null)}>
            <div className="detail-modal-content" onClick={(e) => e.stopPropagation()}>
              <div className="detail-category-container">
                <span className="detail-category-badge">{selectedNews.category}</span>
              </div>
              <div className="detail-date">{selectedNews.date}</div>
              <h2 className="detail-title">{selectedNews.title}</h2>
              {selectedNews.image_url && (
                <img src={selectedNews.image_url} alt={selectedNews.title} className="detail-image" />
              )}
              <div className="detail-content">
                {selectedNews.content}
              </div>
              <button 
                onClick={() => setSelectedNews(null)}
                className="close-btn"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );

  
};

export default News;