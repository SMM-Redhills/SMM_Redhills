import React, { useState } from 'react';
import { Book, Heart, Cross, Star, Clock, Users } from 'lucide-react';
import { churchAPI } from '../../services/api';

const prayers = [
  {
    id: 1,
    title: "Our Father",
    category: "Traditional",
    content: `Our Father, who art in heaven,
hallowed be thy name.
Thy kingdom come,
thy will be done,
on earth as it is in heaven.
Give us this day our daily bread,
and forgive us our trespasses,
as we forgive those who trespass against us.
And lead us not into temptation,
but deliver us from evil.
Amen.`
  },
  {
    id: 2,
    title: "Hail Mary",
    category: "Traditional",
    content: `Hail Mary, full of grace,
the Lord is with thee.
Blessed art thou among women,
and blessed is the fruit of thy womb, Jesus.
Holy Mary, Mother of God,
pray for us sinners,
now and at the hour of our death.
Amen.`
  },
  {
    id: 3,
    title: "Glory Be",
    category: "Traditional",
    content: `Glory be to the Father,
and to the Son,
and to the Holy Spirit.
As it was in the beginning,
is now, and ever shall be,
world without end.
Amen.`
  },
  {
    id: 4,
    title: "Prayer to Saint Mary Magdalene",
    category: "Saint Devotion",
    content: `Saint Mary Magdalene,
woman of many sins, who by conversion
became the beloved of Jesus,
you were the first to see the risen Christ.
You announced the joyful news to the apostles
and became the apostle to the apostles.
Intercede for us that we may love Jesus
as you loved Him, follow Him as closely as you did,
and serve Him as faithfully as you served Him.
Help us to be always ready to spread
the Good News of God's mercy and love.
Amen.`
  },
  {
    id: 5,
    title: "Morning Prayer",
    category: "Daily Prayers",
    content: `Heavenly Father,
as I begin this new day,
I offer You my heart, my mind, and my soul.
Guide my steps, guard my words,
and help me to serve You faithfully.
May Your love shine through me
to touch the lives of others.
Bless my family, my work, and my community.
Keep us safe under Your protection.
Through Christ our Lord.
Amen.`
  },
  {
    id: 6,
    title: "Evening Prayer",
    category: "Daily Prayers",
    content: `Lord Jesus Christ,
as this day comes to an end,
I thank You for Your countless blessings.
Forgive me for any wrongs I have committed,
and help me to forgive others.
Watch over my loved ones through the night,
and grant us peaceful rest.
Prepare our hearts for tomorrow's service.
May Your angels guard us while we sleep.
In Your holy name.
Amen.`
  },
  {
    id: 7,
    title: "Prayer for Peace",
    category: "Special Intentions",
    content: `Prince of Peace,
in a world filled with conflict and division,
we turn to You for hope and healing.
Soften the hearts of those who harbor hatred,
open the minds of those who are closed to understanding,
and strengthen the hands of those who work for justice.
Grant peace to our families, our community,
our nation, and our world.
Let Your peace begin with me.
Amen.`
  },
  {
    id: 8,
    title: "Prayer for the Sick",
    category: "Special Intentions",
    content: `Loving God, Divine Physician,
we lift up to You all who are suffering
from illness, pain, or distress.
Grant them healing according to Your will,
comfort in their trials,
and strength to bear their crosses.
Bless the doctors, nurses, and caregivers
who tend to the sick.
Give hope to families and friends
who watch and wait with love.
Through Christ our Healer.
Amen.`
  }
];

const Prayer = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedPrayer, setSelectedPrayer] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    prayer_type: '',
    intention: '',
    is_public: false
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  
  const categories = ['All', 'Traditional', 'Saint Devotion', 'Daily Prayers', 'Special Intentions'];
  
  const filteredPrayers = activeCategory === 'All' 
    ? prayers 
    : prayers.filter(prayer => prayer.category === activeCategory);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    
    try {
      const submitData = { ...formData };
      if (!submitData.email) {
        delete submitData.email;
      }
      await churchAPI.submitPrayerRequest(submitData);
      setMessage('Prayer request submitted successfully! We will pray for your intentions.');
      setFormData({
        name: '',
        email: '',
        phone: '',
        prayer_type: '',
        intention: '',
        is_public: false
      });
    } catch (error) {
      console.error('Prayer request error:', error.response?.data || error.message);
      setMessage('Error submitting prayer request. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const getCategoryIcon = (category) => {
    switch(category) {
      case 'Traditional': return <Cross style={{width: '1.25rem', height: '1.25rem'}} />;
      case 'Saint Devotion': return <Star style={{width: '1.25rem', height: '1.25rem'}} />;
      case 'Daily Prayers': return <Clock style={{width: '1.25rem', height: '1.25rem'}} />;
      case 'Special Intentions': return <Heart style={{width: '1.25rem', height: '1.25rem'}} />;
      default: return <Book style={{width: '1.25rem', height: '1.25rem'}} />;
    }
  };

  return (
    <section style={{padding: '4rem 0', background: 'linear-gradient(135deg, #0ea5e9 0%, #0284c7 50%, #0369a1 100%)', width: '100%', display: 'flex', justifyContent: 'center', minHeight: '100vh'}}>
      <div style={{maxWidth: '80rem', margin: '0 auto', padding: '0 1rem', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', width: '100%'}}>
        <div style={{textAlign: 'center', marginBottom: '3rem'}}>
          <h1 style={{fontSize: '3rem', fontFamily: 'serif', fontWeight: '700', marginBottom: '1rem', color: 'white'}}>Our Prayers</h1>
          <p style={{fontSize: '1.125rem', color: '#e0f2fe'}}>Find comfort and strength in these sacred prayers and devotions</p>
        </div>

        {/* Category Filter */}
        <div style={{display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '0.5rem', marginBottom: '2rem'}}>
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              style={{
                padding: '0.5rem 1rem',
                borderRadius: '9999px',
                fontSize: '0.875rem',
                fontWeight: '500',
                transition: 'all 0.3s ease',
                backgroundColor: activeCategory === category ? '#0ea5e9' : 'rgba(255, 255, 255, 0.1)',
                color: activeCategory === category ? '#0284c7' : '#e0f2fe',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                cursor: 'pointer'
              }}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Prayer Grid */}
        <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '1.5rem', marginBottom: '3rem', width: '100%'}}>
          {filteredPrayers.map(prayer => (
            <div key={prayer.id} style={{backgroundColor: 'rgba(255, 255, 255, 0.95)', borderRadius: '1rem', padding: '1.5rem', border: '1px solid rgba(255, 255, 255, 0.2)', backdropFilter: 'blur(10px)', transition: 'all 0.3s ease', cursor: 'pointer', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'}} onClick={() => setSelectedPrayer(prayer)}>
              <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem', gap: '0.5rem'}}>
                <div style={{color: '#0ea5e9'}}>
                  {getCategoryIcon(prayer.category)}
                </div>
                <span style={{color: '#0ea5e9', fontSize: '0.875rem', fontWeight: '500'}}>{prayer.category}</span>
              </div>
              
              <h3 style={{fontSize: '1.25rem', fontWeight: '600', marginBottom: '1rem', color: '#0284c7', fontFamily: 'serif'}}>{prayer.title}</h3>
              <p style={{color: '#0369a1', fontSize: '0.875rem', lineHeight: '1.6', marginBottom: '1rem'}}>
                {prayer.content.split('\n').slice(0, 3).join('\n')}
                {prayer.content.split('\n').length > 3 && '...'}
              </p>
              <button style={{color: '#0ea5e9', fontWeight: '500', backgroundColor: 'transparent', border: 'none', cursor: 'pointer', fontSize: '0.875rem'}}>
                Read Full Prayer →
              </button>
            </div>
          ))}
        </div>

        {/* Prayer Request Form */}
        <div style={{backgroundColor: 'rgba(255, 255, 255, 0.95)', borderRadius: '1rem', padding: '2rem', marginBottom: '3rem', border: '1px solid rgba(255, 255, 255, 0.2)', backdropFilter: 'blur(10px)', width: '100%', maxWidth: '48rem', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'}}>
          <div style={{textAlign: 'center', marginBottom: '2rem'}}>
            <Heart style={{width: '4rem', height: '4rem', color: '#0ea5e9', margin: '0 auto 1rem auto', display: 'block'}} />
            <h2 style={{fontSize: '1.5rem', fontWeight: '600', marginBottom: '0.5rem', color: '#0284c7', fontFamily: 'serif'}}>Submit Prayer Request</h2>
            <p style={{color: '#0369a1', fontSize: '0.875rem'}}>Share your intentions with our prayer community</p>
          </div>
          
          <form onSubmit={handleSubmit} style={{display: 'flex', flexDirection: 'column', gap: '1rem'}}>
            <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem'}}>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Your Name"
                required
                style={{
                  padding: '0.75rem',
                  borderRadius: '0.5rem',
                  backgroundColor: 'white',
                  border: '1px solid #d1d5db',
                  color: '#374151',
                  fontSize: '0.875rem'
                }}
              />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email (Optional)"
                style={{
                  padding: '0.75rem',
                  borderRadius: '0.5rem',
                  backgroundColor: 'white',
                  border: '1px solid #d1d5db',
                  color: '#374151',
                  fontSize: '0.875rem'
                }}
              />
            </div>
            
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Phone (Optional)"
              style={{
                padding: '0.75rem',
                borderRadius: '0.5rem',
                backgroundColor: 'white',
                border: '1px solid #d1d5db',
                color: '#374151',
                fontSize: '0.875rem'
              }}
            />
            
            <select
              name="prayer_type"
              value={formData.prayer_type}
              onChange={handleChange}
              required
              style={{
                padding: '0.75rem',
                borderRadius: '0.5rem',
                backgroundColor: 'white',
                border: '1px solid #d1d5db',
                color: '#374151',
                fontSize: '0.875rem'
              }}>
              <option value="">Prayer Type</option>
              <option value="health">Health & Healing</option>
              <option value="family">Family & Relationships</option>
              <option value="finance">Financial Blessing</option>
              <option value="career">Career & Education</option>
              <option value="spiritual">Spiritual Growth</option>
              <option value="thanksgiving">Thanksgiving</option>
              <option value="other">Other</option>
            </select>
            
            <textarea
              name="intention"
              value={formData.intention}
              onChange={handleChange}
              placeholder="Share your prayer request..."
              rows="4"
              required
              style={{
                padding: '0.75rem',
                borderRadius: '0.5rem',
                backgroundColor: 'white',
                border: '1px solid #d1d5db',
                color: '#374151',
                fontSize: '0.875rem',
                resize: 'vertical',
                fontFamily: 'inherit'
              }}
            />
            
            <div style={{display: 'flex', alignItems: 'center', gap: '0.5rem'}}>
              <input
                type="checkbox"
                id="is_public"
                name="is_public"
                checked={formData.is_public}
                onChange={handleChange}
                style={{accentColor: '#0ea5e9'}}
              />
              <label htmlFor="is_public" style={{color: '#374151', fontSize: '0.875rem'}}>Make this prayer request public</label>
            </div>
            
            {message && (
              <div style={{padding: '1rem', borderRadius: '0.5rem', backgroundColor: message.includes('Error') ? '#fef2f2' : '#f0f9ff', color: message.includes('Error') ? '#dc2626' : '#0284c7'}}>
                {message}
              </div>
            )}
            
            <button 
              type="submit"
              disabled={loading}
              style={{
                backgroundColor: loading ? '#9ca3af' : '#0ea5e9',
                color: 'white',
                padding: '0.75rem 2rem',
                borderRadius: '0.5rem',
                fontWeight: '600',
                border: 'none',
                cursor: loading ? 'not-allowed' : 'pointer',
                transition: 'all 0.3s ease',
                fontSize: '0.875rem'
              }}
            >
              {loading ? 'Submitting...' : 'Submit Prayer Request'}
            </button>
          </form>
        </div>

        {/* Call to Action */}
        <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', width: '100%', maxWidth: '60rem'}}>
          <div style={{backgroundColor: 'rgba(255, 255, 255, 0.05)', borderRadius: '1rem', padding: '2rem', textAlign: 'center', border: '1px solid rgba(255, 255, 255, 0.1)', backdropFilter: 'blur(10px)'}}>
            <Heart style={{width: '3rem', height: '3rem', color: '#0ea5e9', margin: '0 auto 1rem auto', display: 'block'}} />
            <h2 style={{fontSize: '1.25rem', fontWeight: '600', marginBottom: '1rem', color: 'white', fontFamily: 'serif'}}>Prayer Chain</h2>
            <p style={{color: '#cbd5e1', marginBottom: '1.5rem', lineHeight: '1.6', fontSize: '0.875rem'}}>
              Join our prayer chain to receive and pray for community intentions.
            </p>
            <button style={{backgroundColor: '#0ea5e9', color: 'white', padding: '0.75rem 1.5rem', borderRadius: '0.75rem', fontWeight: '600', border: 'none', cursor: 'pointer', transition: 'all 0.3s ease', fontSize: '0.875rem'}}>
              Join Prayer Chain
            </button>
          </div>
          
          <div style={{backgroundColor: 'rgba(255, 255, 255, 0.05)', borderRadius: '1rem', padding: '2rem', textAlign: 'center', border: '1px solid rgba(255, 255, 255, 0.1)', backdropFilter: 'blur(10px)'}}>
            <Users style={{width: '3rem', height: '3rem', color: '#0ea5e9', margin: '0 auto 1rem auto', display: 'block'}} />
            <h2 style={{fontSize: '1.25rem', fontWeight: '600', marginBottom: '1rem', color: 'white', fontFamily: 'serif'}}>Prayer Groups</h2>
            <p style={{color: '#cbd5e1', marginBottom: '1.5rem', lineHeight: '1.6', fontSize: '0.875rem'}}>
              Join our prayer groups and grow in faith with fellow parishioners.
            </p>
            <button style={{backgroundColor: '#0ea5e9', color: 'white', padding: '0.75rem 1.5rem', borderRadius: '0.75rem', fontWeight: '600', border: 'none', cursor: 'pointer', transition: 'all 0.3s ease', fontSize: '0.875rem'}}>
              Join Group
            </button>
          </div>
        </div>

        {/* Prayer Modal */}
        {selectedPrayer && (
          <div style={{position: 'fixed', inset: 0, backgroundColor: 'rgba(0, 0, 0, 0.8)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 50, padding: '1rem'}} onClick={() => setSelectedPrayer(null)}>
            <div style={{backgroundColor: 'rgba(30, 41, 59, 0.95)', borderRadius: '1rem', padding: '2rem', maxWidth: '32rem', width: '100%', border: '1px solid rgba(255, 255, 255, 0.2)', backdropFilter: 'blur(20px)'}} onClick={(e) => e.stopPropagation()}>
              <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem', gap: '0.5rem'}}>
                <div style={{color: '#0ea5e9'}}>
                  {getCategoryIcon(selectedPrayer.category)}
                </div>
                <span style={{color: '#0ea5e9', fontSize: '0.875rem', fontWeight: '500'}}>{selectedPrayer.category}</span>
              </div>
              <h3 style={{fontSize: '1.5rem', fontWeight: '600', marginBottom: '1.5rem', color: 'white', fontFamily: 'serif', textAlign: 'center'}}>{selectedPrayer.title}</h3>
              <div style={{color: '#cbd5e1', lineHeight: '1.8', marginBottom: '2rem', whiteSpace: 'pre-line', textAlign: 'center'}}>
                {selectedPrayer.content}
              </div>
              <button 
                onClick={() => setSelectedPrayer(null)}
                style={{width: '100%', backgroundColor: '#0ea5e9', color: 'white', padding: '0.75rem', borderRadius: '0.5rem', fontWeight: '600', border: 'none', cursor: 'pointer'}}
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Prayer;
