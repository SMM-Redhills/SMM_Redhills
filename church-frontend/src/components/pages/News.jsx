import React, { useState, useEffect, useRef } from 'react';
import { Calendar, Clock, Users, Cross } from 'lucide-react';

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
    setNews(sampleNews);
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

  return (
    <div style={{minHeight: '100vh', backgroundColor: '#ffffff', width: '100%'}}>
      {/* Hero Section */}
      <section 
        id="news-hero"
        className="scroll-fade-in smooth-scroll-section"
        style={{position: 'relative', background: 'linear-gradient(135deg, #0ea5e9 0%, #0284c7 50%, #0369a1 100%)', color: 'white', padding: '4rem 1rem', width: '100%', display: 'flex', justifyContent: 'center'}}
      >
        <div style={{position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(255,255,255,0.1)'}}></div>
        <div style={{position: 'relative', maxWidth: '72rem', margin: '0 auto', textAlign: 'center'}}>
          {/* <div className="scroll-scale-in" style={{marginBottom: '2rem'}}>
            <Cross style={{width: '3rem', height: '3rem', margin: '0 auto 1rem auto', color: '#ffffff', display: 'block'}} />
          </div> */}
          <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem', marginBottom: '1rem'}}>
            <h1 className="scroll-slide-up" style={{fontSize: '3rem', fontWeight: '700', lineHeight: '1.1', textAlign: 'center', fontFamily: 'serif'}}>
              Latest News
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
          <span style={{display: 'block', fontSize: '1.5rem', fontWeight: '300', color: '#e0f2fe'}}>Parish Community Updates</span>
          <p className="scroll-slide-up" style={{fontSize: '1.125rem', marginBottom: '2rem', maxWidth: '48rem', margin: '0 auto 2rem auto', lineHeight: '1.7', textAlign: 'center', color: '#e0f2fe'}}>
            Stay updated with our parish community news and announcements
          </p>
        </div>
      </section>

      {/* Main Content */}
      <div style={{width: '100%', padding: '4rem 1rem', backgroundColor: '#f8fafc', display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
        <div style={{maxWidth: '80rem', width: '100%', margin: '0 auto'}}>
          <div 
            id="news-content"
            className="scroll-fade-in smooth-scroll-section"
            style={{display: 'flex', flexDirection: 'column', gap: '2rem', width: '100%', maxWidth: '60rem', margin: '0 auto'}}
          >
            {news.map((n, index) => (
              <div 
                key={n.id} 
                className="scroll-slide-up hover-lift"
                style={{
                  backgroundColor: '#ffffff', 
                  borderRadius: '1rem', 
                  padding: '2rem', 
                  boxShadow: '0 10px 25px -3px rgba(0, 0, 0, 0.1)',
                  animationDelay: `${index * 0.2}s`,
                  transition: 'all 0.3s ease'
                }}
              >
                <div className="scroll-fade-in" style={{display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem', gap: '0.5rem'}}>
                  <div style={{color: '#0284c7'}}>
                    {getCategoryIcon(n.category)}
                  </div>
                  <span style={{color: '#0284c7', fontSize: '0.875rem', fontWeight: '500', backgroundColor: '#e0f2fe', padding: '0.25rem 0.75rem', borderRadius: '1rem'}}>{n.category}</span>
                </div>
                <div className="scroll-fade-in" style={{color: '#64748b', fontSize: '0.875rem', marginBottom: '1rem', textAlign: 'center'}}>{n.date}</div>
                <h2 className="scroll-slide-up" style={{fontSize: '1.5rem', fontWeight: '600', marginBottom: '1rem', color: '#0284c7', fontFamily: 'serif', textAlign: 'center'}}>{n.title}</h2>
                <p className="scroll-slide-up" style={{color: '#64748b', lineHeight: '1.6', marginBottom: '1.5rem', textAlign: 'center'}}>{n.content}</p>
                <div className="scroll-scale-in" style={{textAlign: 'center'}}>
                  <button 
                    className="hover-lift focus-smooth"
                    onClick={() => setSelectedNews(n)}
                    style={{color: '#0284c7', fontWeight: '500', backgroundColor: 'transparent', border: 'none', cursor: 'pointer', fontSize: '0.875rem', transition: 'all 0.2s ease'}}
                  >
                    Read More →
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="scroll-fade-in" style={{textAlign: 'center', marginTop: '3rem'}}>
            <button 
              className="hover-lift focus-smooth"
              style={{backgroundColor: '#0284c7', color: 'white', padding: '0.75rem 2rem', borderRadius: '0.5rem', fontWeight: '600', border: 'none', cursor: 'pointer', transition: 'all 0.3s ease'}}
            >
              View All News
            </button>
          </div>
        </div>
      </div>
      
      {/* Add News Modal */}
      {showAddForm && (
        <div style={{position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 50}}>
          <div style={{backgroundColor: 'white', padding: '2rem', borderRadius: '0.5rem', width: '90%', maxWidth: '500px', maxHeight: '80vh', overflowY: 'auto'}}>
            <h3 style={{fontSize: '1.25rem', fontWeight: '600', marginBottom: '1rem', color: '#000000'}}>Add News</h3>
            <form onSubmit={(e) => {
              e.preventDefault();
              e.stopPropagation();
              const newNews = {
                id: Date.now(),
                ...formData,
                date: new Date().toLocaleDateString('en-GB')
              };
              setNews([newNews, ...news]);
              setShowAddForm(false);
              setFormData({ title: '', content: '', category: 'Updates', image_url: '' });
            }}>
              <div style={{marginBottom: '1rem'}}>
                <input
                  type="text"
                  placeholder="News Title"
                  value={formData.title}
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                  required
                  style={{width: '100%', padding: '0.5rem', border: '1px solid #d1d5db', borderRadius: '0.375rem', color: '#000000'}}
                />
              </div>
              <div style={{marginBottom: '1rem'}}>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({...formData, category: e.target.value})}
                  style={{width: '100%', padding: '0.5rem', border: '1px solid #d1d5db', borderRadius: '0.375rem', color: '#000000'}}
                >
                  <option value="Updates">Updates</option>
                  <option value="Celebration">Celebration</option>
                  <option value="Community">Community</option>
                </select>
              </div>
              <div style={{marginBottom: '1rem'}}>
                <input
                  type="url"
                  placeholder="Image URL (optional)"
                  value={formData.image_url}
                  onChange={(e) => setFormData({...formData, image_url: e.target.value})}
                  style={{width: '100%', padding: '0.5rem', border: '1px solid #d1d5db', borderRadius: '0.375rem', color: '#000000'}}
                />
              </div>
              <div style={{marginBottom: '1rem'}}>
                <textarea
                  placeholder="News Content"
                  value={formData.content}
                  onChange={(e) => setFormData({...formData, content: e.target.value})}
                  required
                  rows="4"
                  style={{width: '100%', padding: '0.5rem', border: '1px solid #d1d5db', borderRadius: '0.375rem', color: '#000000'}}
                />
              </div>
              <div style={{display: 'flex', gap: '1rem', justifyContent: 'flex-end'}}>
                <button
                  type="button"
                  onClick={() => {setShowAddForm(false); setFormData({ title: '', content: '', category: 'Updates', image_url: '' });}}
                  style={{padding: '0.5rem 1rem', backgroundColor: '#6b7280', color: 'white', border: 'none', borderRadius: '0.375rem', cursor: 'pointer'}}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={async () => {
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
                            date: new Date().toLocaleDateString('en-GB')
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
                  }}
                  style={{padding: '0.5rem 1rem', backgroundColor: '#2563eb', color: 'white', border: 'none', borderRadius: '0.375rem', cursor: 'pointer'}}
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
        <div style={{position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.8)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 50, padding: '1rem'}} onClick={() => setSelectedNews(null)}>
          <div style={{backgroundColor: 'white', borderRadius: '1rem', padding: '2rem', maxWidth: '40rem', width: '100%', maxHeight: '80vh', overflowY: 'auto'}} onClick={(e) => e.stopPropagation()}>
            <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem', gap: '0.5rem'}}>
              <span style={{color: '#0284c7', fontSize: '0.875rem', fontWeight: '500', backgroundColor: '#e0f2fe', padding: '0.25rem 0.75rem', borderRadius: '1rem'}}>{selectedNews.category}</span>
            </div>
            <div style={{color: '#64748b', fontSize: '0.875rem', marginBottom: '1rem', textAlign: 'center'}}>{selectedNews.date}</div>
            <h2 style={{fontSize: '1.5rem', fontWeight: '600', marginBottom: '1.5rem', color: '#0284c7', fontFamily: 'serif', textAlign: 'center'}}>{selectedNews.title}</h2>
            {selectedNews.image_url && (
              <img src={selectedNews.image_url} alt={selectedNews.title} style={{width: '100%', height: '200px', objectFit: 'cover', borderRadius: '0.5rem', marginBottom: '1.5rem'}} />
            )}
            <div style={{color: '#64748b', lineHeight: '1.6', marginBottom: '2rem', whiteSpace: 'pre-line'}}>
              {selectedNews.content}
            </div>
            <button 
              onClick={() => setSelectedNews(null)}
              style={{width: '100%', backgroundColor: '#0284c7', color: 'white', padding: '0.75rem', borderRadius: '0.5rem', fontWeight: '600', border: 'none', cursor: 'pointer'}}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default News;