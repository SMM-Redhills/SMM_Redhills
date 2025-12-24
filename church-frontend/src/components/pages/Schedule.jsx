import React, { useEffect, useRef, useState } from 'react';
import { Clock, Heart, Users, Book, Cross, Calendar, Bell, Star, Plus, Trash2 } from 'lucide-react';
import { churchAPI } from '../../services/api';
import { adminAPI } from '../../services/adminApi';

const Schedule = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [scheduleItems, setScheduleItems] = useState([]);
  const observerRef = useRef(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    time: '',
    day: '',
    description: '',
    location: '',
    type: 'Mass'
  });

  useEffect(() => {
    const adminToken = localStorage.getItem('adminToken');
    setIsAdmin(!!adminToken);
    fetchSchedules();
  }, []);

  const fetchSchedules = async () => {
    try {
      const response = await churchAPI.getSchedule();
      const data = response.data.results || response.data;
      setScheduleItems(data);
    } catch (error) {
      console.error('Error fetching schedules:', error);
    }
  };

  const formatTime = (timeStr) => {
    if (!timeStr) return '';
    const [hours, minutes] = timeStr.split(':');
    const date = new Date();
    date.setHours(parseInt(hours));
    date.setMinutes(parseInt(minutes));
    return date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      try {
        await adminAPI.deleteItem('schedule', id);
        fetchSchedules(); // Refresh list
      } catch (error) {
        console.error('Error deleting item:', error);
        alert('Failed to delete item');
      }
    }
  };

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
  }, []);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.title && formData.time && formData.day) {
      try {
        const response = await adminAPI.createItem('schedule', formData);
        
        if (response.status === 201) {
          fetchSchedules(); // Refresh from backend
          setShowAddForm(false);
          setFormData({ title: '', time: '', day: '', description: '', location: '', type: 'Mass' });
          alert('Schedule item added successfully!');
        } else {
          alert('Error adding schedule item. Please try again.');
        }
      } catch (error) {
        console.error('Error:', error);
        alert('Error adding schedule item. Please try again.');
      }
    }
  };

  // Cancel form submission
  const handleCancel = () => {
    setShowAddForm(false);
    setFormData({ service_name: '', time: '', day: '', description: '', type: 'Mass' });
  };

  return (
    <div className="schedule-container">
      {/* Hero Section */}
      <section className="hero-section scroll-fade-in">
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <div className="hero-title-container">
            <h1 className="hero-title scroll-slide-up">Our Schedule</h1>
          </div>
          <span className="hero-subtitle">Mass Times & church Services</span>
          <p className="hero-description scroll-slide-up">
            Join us for worship, prayer, and spiritual growth throughout the week
          </p>
        </div>
      </section>

      {/* Main Content */}
      <div className="main-content">
        <div className="content-container">

        {/* Quick Schedule Overview */}
        <section className="overview-section scroll-fade-in">
          <h2 className="section-title scroll-slide-up">Schedule Overview</h2>
          <div className="overview-grid scroll-stagger-children">
            <div className="overview-card hover-lift">
              <Clock className="card-icon" />
              <h3 className="card-title">Visiting Hours</h3>
              <p className="card-text">Daily: 6:00 AM - 8:00 PM</p>
              <div className="card-link">Open daily for prayer</div>
            </div>
            
            <div className="overview-card hover-lift">
              <Heart className="card-icon" />
              <h3 className="card-title">Special Devotions</h3>
              <p className="card-text">Various times throughout the week</p>
              <div className="card-link">See details below</div>
            </div>
            
            <div className="overview-card hover-lift">
              <Users className="card-icon" />
              <h3 className="card-title">Schedules</h3>
              <p className="card-text">
                Sunday: 8:00 AM - 10:00 AM<br/>
                Evening: 6:00 PM - 7:30 PM<br/>
                Weekdays: 6:00 AM
              </p>
              <div className="card-link">Full schedule below</div>
            </div>
            
            <div className="overview-card hover-lift">
              <Book className="card-icon" />
              <h3 className="card-title">Eucharistic Adoration</h3>
              <p className="card-text">Special hours for prayer and reflection</p>
              <div className="card-link">View times below</div>
            </div>
          </div>
        </section>

        {/* Detailed Mass Schedule */}
        <section className="mass-schedule-section scroll-fade-in">
          <h2 className="section-title scroll-slide-up">Schedules</h2>
          <div className="mass-schedule-grid scroll-stagger-children">
            
            {/* Sunday Schedule */}
            <div className="schedule-card sunday-card hover-lift">
              <div className="card-header">
                <Star className="header-icon" />
                <h3 className="card-heading">Sunday</h3>
              </div>
              <div className="schedule-list">
                {scheduleItems.filter(i => i.day === 'sunday').length > 0 ? (
                  scheduleItems.filter(i => i.day === 'sunday').map(item => (
                    <div key={item.id} className="schedule-item">
                      <div>
                        <span className="item-name block">{item.title}</span>
                        {item.description && <span className="text-sm text-gray-500">{item.description}</span>}
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="item-time">{formatTime(item.time)}</span>
                        {isAdmin && (
                          <button 
                            onClick={() => handleDelete(item.id)}
                            className="text-red-500 hover:text-red-700 p-1"
                          >
                            <Trash2 size={16} />
                          </button>
                        )}
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500 italic text-center py-2">No Sunday services scheduled</p>
                )}
              </div>
            </div>

            {/* Weekday Schedule */}
            <div className="schedule-card weekday-card hover-lift">
              <div className="card-header">
                <Calendar className="header-icon" />
                <h3 className="card-heading">Weekdays</h3>
              </div>
              <div className="schedule-list">
                 {scheduleItems.filter(i => i.day !== 'sunday').length > 0 ? (
                  scheduleItems.filter(i => i.day !== 'sunday').map(item => (
                    <div key={item.id} className="schedule-item">
                       <div>
                        <span className="item-name block">{item.title} 
                          <span className="text-xs font-normal text-gray-500 ml-2">({item.day})</span>
                        </span>
                        {item.description && <span className="text-sm text-gray-500">{item.description}</span>}
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="item-time">{formatTime(item.time)}</span>
                        {isAdmin && (
                          <button 
                            onClick={() => handleDelete(item.id)}
                            className="text-red-500 hover:text-red-700 p-1"
                          >
                            <Trash2 size={16} />
                          </button>
                        )}
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500 italic text-center py-2">No Weekday services scheduled</p>
                )}
              </div>
            </div>

            {/* Special Occasions */}
            <div className="schedule-card special-card hover-lift">
              <div className="card-header">
                <Bell className="header-icon special-icon" />
                <h3 className="card-heading special-heading">Special Occasions</h3>
              </div>
              <div className="schedule-list">
                <div className="schedule-item">
                  <div className="item-name">Feast Days & Holy Days</div>
                  <div className="item-time special-time">Additional Masses as announced</div>
                </div>
                <div className="schedule-item">
                  <div className="item-name">Christmas & Easter</div>
                  <div className="item-time special-time">Special schedule published</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Special Services & Devotions */}
        <section className="services-section scroll-fade-in">
          <h2 className="section-title scroll-slide-up">Special Services & Devotions</h2>
          <div className="services-grid scroll-stagger-children">
            
            <div className="service-card hover-lift">
              <Heart className="service-icon" />
              <h3 className="service-title">Eucharistic Adoration</h3>
              <div className="service-time">
                <div className="service-day">Every Sunday</div>
                <div className="service-hour">8:00 AM</div>
              </div>
              <p className="service-description">
                Join us for an hour of prayer and reflection before the Blessed Sacrament
              </p>
            </div>

            {/* <div className="service-card hover-lift">
              <Book className="service-icon" />
              <h3 className="service-title">Rosary Prayer</h3>
              <div className="service-time">
                <div className="service-day">Daily</div>
                <div className="service-hour">5:30 PM</div>
              </div>
              <p className="service-description">
                Daily recitation of the Holy Rosary before evening activities
              </p>
            </div> */}

            {/* <div className="service-card hover-lift">
              <Users className="service-icon" />
              <h3 className="service-title">Novena Prayers</h3>
              <div className="service-time">
                <div className="service-day">Tuesdays</div>
                <div className="service-hour">7:00 PM</div>
              </div>
              <p className="service-description">
                Special devotional prayers to Saint Mary Magdalene
              </p>
            </div> */}

            {/* <div className="service-card hover-lift">
              <Bell className="service-icon" />
              <h3 className="service-title">Confession</h3>
              <div className="service-time">
                <div className="service-day">Daily Available</div>
                <div className="service-hour">5+ Hours Daily</div>
              </div>
              <p className="service-description">
                Sacrament of Reconciliation available throughout the day
              </p>
            </div> */}

            {/* <div className="service-card hover-lift">
              <Star className="service-icon" />
              <h3 className="service-title">First Friday Devotion</h3>
              <div className="service-time">
                <div className="service-day">First Friday of Month</div>
                <div className="service-hour">After 6:00 AM Mass</div>
              </div>
              <p className="service-description">
                Special devotion to the Sacred Heart of Jesus
              </p>
            </div> */}
          </div>
        </section>

        {/* Important Notes */}
        <section className="notes-section scroll-fade-in">
          <h3 className="notes-title">Important Notes</h3>
          <div className="notes-grid">
            <div className="note-card">
              <h4 className="note-title">⏰ Arrival Time</h4>
              <p className="note-text">Please arrive 10-15 minutes before Mass begins</p>
            </div>
            <div className="note-card">
              <h4 className="note-title">📱 Updates</h4>
              <p className="note-text">Schedule changes are announced during services and online</p>
            </div>
            <div className="note-card">
              <h4 className="note-title">🎄 Special Seasons</h4>
              <p className="note-text">Christmas and Easter may have modified schedules</p>
            </div>
          </div>
        </section>

        </div>
      </div>



      {/* Add Schedule Modal */}
      {showAddForm && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3 className="modal-title">Add Schedule Item</h3>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <input
                  type="text"
                  name="title"
                  placeholder="Service Name"
                  value={formData.title}
                  onChange={handleInputChange}
                  required
                  className="form-input"
                />
              </div>
              <div className="form-group">
                <select
                  name="type"
                  value={formData.type}
                  onChange={handleInputChange}
                  className="form-select"
                >
                  <option value="Mass">Mass</option>
                  <option value="Prayer">Prayer</option>
                  <option value="Devotion">Devotion</option>
                  <option value="Service">Service</option>
                </select>
              </div>
              <div className="form-row">
                <select
                  name="day"
                  value={formData.day}
                  onChange={handleInputChange}
                  required
                  className="form-input"
                >
                  <option value="">Select Day</option>
                  <option value="sunday">Sunday</option>
                  <option value="monday">Monday</option>
                  <option value="tuesday">Tuesday</option>
                  <option value="wednesday">Wednesday</option>
                  <option value="thursday">Thursday</option>
                  <option value="friday">Friday</option>
                  <option value="saturday">Saturday</option>
                  <option value="daily">Daily</option>
                </select>
                <input
                  type="time"
                  name="time"
                  value={formData.time}
                  onChange={handleInputChange}
                  required
                  className="form-input"
                />
              </div>
              <div className="form-group">
                <textarea
                  name="description"
                  placeholder="Description (optional)"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows="3"
                  className="form-textarea"
                />
              </div>
              <div className="form-actions">
                <button
                  type="button"
                  onClick={handleCancel}
                  className="btn-cancel"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn-submit"
                >
                  Add Schedule
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Add custom styles for animations */}
      <style jsx>{`
        /* Container and Layout Styles */
        .schedule-container {
          min-height: 100vh;
          background-color: #ffffff;
          width: 100%;
        }

        .main-content {
          width: 100%;
          padding: 4rem 1rem;
          background-color: #f8fafc;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .content-container {
          max-width: 80rem;
          width: 100%;
          margin: 0 auto;
        }

        /* Hero Section Styles */
        .hero-section {
          position: relative;
          background: linear-gradient(135deg, #0ea5e9 0%, #0284c7 50%, #0369a1 100%);
          color: white;
          padding: 4rem 1rem;
          width: 100%;
          display: flex;
          justify-content: center;
        }

        .hero-overlay {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: rgba(255,255,255,0.1);
        }

        .hero-content {
          position: relative;
          max-width: 72rem;
          margin: 0 auto;
          text-align: center;
        }

        .hero-title-container {
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
        }

        .hero-subtitle {
          display: block;
          font-size: 1.5rem;
          font-weight: 300;
          color: #e0f2fe;
        }

        .hero-description {
          font-size: 1.125rem;
          margin-bottom: 2rem;
          max-width: 48rem;
          margin: 0 auto 2rem auto;
          line-height: 1.7;
          text-align: center;
          color: #e0f2fe;
        }

        /* Section Styles */
        .overview-section {
          margin-bottom: 5rem;
          background-color: #e0f2fe;
          border-radius: 1rem;
          padding: 3rem;
          text-align: center;
          width: 100%;
        }

        .mass-schedule-section {
          margin-bottom: 5rem;
          background-color: #ffffff;
          padding: 3rem 2rem;
          border-radius: 1rem;
          box-shadow: 0 10px 25px -3px rgba(0, 0, 0, 0.1);
          width: 100%;
        }

        .services-section {
          margin-bottom: 5rem;
          background-color: #ffffff;
          padding: 3rem 2rem;
          border-radius: 1rem;
          box-shadow: 0 10px 25px -3px rgba(0, 0, 0, 0.1);
          width: 100%;
        }

        .notes-section {
          background-color: #fef3c7;
          border-radius: 1rem;
          padding: 2rem;
          border: 1px solid #f59e0b;
          width: 100%;
        }

        .section-title {
          font-size: 2.5rem;
          font-weight: 700;
          color: #0284c7;
          margin-bottom: 3rem;
          text-align: center;
          font-family: serif;
        }

        /* Grid Styles */
        .overview-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 2rem;
          justify-items: center;
        }

        .mass-schedule-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 2rem;
        }

        .services-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 2rem;
        }

        .notes-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 1rem;
        }

        /* Card Styles */
        .overview-card {
          background-color: #ffffff;
          padding: 2rem;
          border-radius: 1rem;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
          text-align: center;
          width: 100%;
          max-width: 18rem;
          transition: all 0.3s ease;
        }

        .schedule-card {
          padding: 2rem;
          border-radius: 1rem;
          transition: all 0.3s ease;
        }

        .sunday-card {
          background-color: #f0f9ff;
          border: 2px solid #0ea5e9;
        }

        .weekday-card {
          background-color: #e0f2fe;
          border: 1px solid #0ea5e9;
        }

        .special-card {
          background-color: #fef3c7;
          border: 1px solid #f59e0b;
        }

        .service-card {
          background-color: #f0f9ff;
          padding: 2rem;
          border-radius: 1rem;
          border: 1px solid #0ea5e9;
          transition: all 0.3s ease;
        }

        .note-card {
          background-color: #ffffff;
          padding: 1.5rem;
          border-radius: 0.75rem;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
        }

        /* Card Content Styles */
        .card-icon {
          width: 2rem;
          height: 2rem;
          color: #0ea5e9;
          margin: 0 auto 1rem auto;
          display: block;
        }

        .card-title {
          font-size: 1.125rem;
          font-weight: 600;
          margin-bottom: 0.5rem;
          color: #1e293b;
        }

        .card-text {
          color: #64748b;
          margin-bottom: 1rem;
        }

        .card-link {
          color: #0ea5e9;
          font-weight: 500;
          background-color: transparent;
          border: none;
          cursor: pointer;
        }

        .card-header {
          display: flex;
          align-items: center;
          margin-bottom: 1.5rem;
        }

        .header-icon {
          width: 2rem;
          height: 2rem;
          color: #0284c7;
          margin-right: 1rem;
        }

        .special-icon {
          color: #d97706;
        }

        .card-heading {
          font-size: 1.5rem;
          font-weight: 700;
          color: #0284c7;
          margin: 0;
        }

        .special-heading {
          color: #d97706;
        }

        .schedule-list {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .schedule-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 0.75rem;
          background-color: #ffffff;
          border-radius: 0.5rem;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
        }

        .item-name {
          font-weight: 600;
          color: #1e293b;
        }

        .item-time {
          color: #0284c7;
          font-weight: 500;
        }

        .special-time {
          color: #d97706;
          font-size: 0.875rem;
        }

        .service-icon {
          width: 3rem;
          height: 3rem;
          color: #0ea5e9;
          margin: 0 auto 1rem auto;
          display: block;
        }

        .service-title {
          font-size: 1.25rem;
          font-weight: 600;
          margin-bottom: 1rem;
          color: #0284c7;
          text-align: center;
        }

        .service-time {
          text-align: center;
          margin-bottom: 1rem;
        }

        .service-day {
          color: #64748b;
          margin-bottom: 0.5rem;
        }

        .service-hour {
          color: #0284c7;
          font-weight: 600;
          font-size: 1.125rem;
        }

        .service-description {
          color: #64748b;
          text-align: center;
          font-size: 0.875rem;
        }

        .notes-title {
          font-size: 1.5rem;
          font-weight: 700;
          color: #d97706;
          margin-bottom: 1rem;
          text-align: center;
        }

        .note-title {
          font-weight: 600;
          color: #d97706;
          margin-bottom: 0.5rem;
        }

        .note-text {
          color: #92400e;
          font-size: 0.875rem;
          margin: 0;
        }

        /* Modal Styles */
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

        .form-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1rem;
          margin-bottom: 1rem;
        }

        .form-input, .form-select, .form-textarea {
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

        /* Scroll Animation Base Styles */
        .scroll-fade-in,
        .scroll-slide-up,
        .scroll-slide-left,
        .scroll-slide-right,
        .scroll-scale-in {
          opacity: 0;
          transition: all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }

        .scroll-fade-in {
          transform: translateY(30px);
        }

        .scroll-slide-up {
          transform: translateY(50px);
        }

        .scroll-slide-left {
          transform: translateX(-50px);
        }

        .scroll-slide-right {
          transform: translateX(50px);
        }

        .scroll-scale-in {
          transform: scale(0.9);
        }

        /* Animated state */
        .scroll-fade-in.animate,
        .scroll-slide-up.animate,
        .scroll-slide-left.animate,
        .scroll-slide-right.animate,
        .scroll-scale-in.animate {
          opacity: 1;
          transform: translateY(0) translateX(0) scale(1);
        }

        /* Stagger children animation */
        .scroll-stagger-children.animate > *:nth-child(1) { animation-delay: 0.1s; }
        .scroll-stagger-children.animate > *:nth-child(2) { animation-delay: 0.2s; }
        .scroll-stagger-children.animate > *:nth-child(3) { animation-delay: 0.3s; }
        .scroll-stagger-children.animate > *:nth-child(4) { animation-delay: 0.4s; }
        .scroll-stagger-children.animate > *:nth-child(5) { animation-delay: 0.5s; }
        .scroll-stagger-children.animate > *:nth-child(6) { animation-delay: 0.6s; }

        .scroll-stagger-children.animate > * {
          animation: staggerFadeIn 0.6s ease forwards;
          opacity: 0;
          transform: translateY(20px);
        }

        @keyframes staggerFadeIn {
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        /* Hover effects */
        .hover-lift:hover {
          transform: translateY(-4px);
          box-shadow: 0 20px 40px -5px rgba(0, 0, 0, 0.15);
        }

        /* Smooth scroll for sections */
        .smooth-scroll-section {
          scroll-margin-top: 80px;
        }
      `}</style>
    </div>
  );
};

export default Schedule;