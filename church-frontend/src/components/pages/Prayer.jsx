import React, { useState, useEffect, useRef } from 'react';
import { Book, Heart, Cross, Star, Clock, Users } from 'lucide-react';
import ReCAPTCHA from 'react-google-recaptcha';
import { churchAPI } from '../../services/api';
import { adminAPI } from '../../services/adminApi';
import { assignedColors } from '../../utils/sectionColors';

const prayers = [
  {
    id: 1,
    title: "Our Father",
    category: "Traditional",
    language: "english",
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
    language: "english",
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
    language: "english",
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
    language: "english",
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
    language: "english",
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
    language: "english",
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
    language: "english",
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
    language: "english",
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
  },
  {
    id: 't1',
    title: "சிலுவை அடையாளம்",
    category: "Traditional",
    language: 'tamil',
    content: "தந்தை மகன் தூய ஆவியாரின் பெயராலே. ஆமென்."
  },
  {
    id: 't2',
    title: "இயேசு கற்றுத்தந்த இறை வேந்தல்",
    category: "Traditional",
    language: 'tamil',
    content: `விண்ணுலகில் இருக்கின்ற எங்கள் தந்தையே, உமது பெயர் தூயது எனப் போற்றப்பெறுக! உமது ஆட்சி வருக! உமது திருவுளம் விண்ணுலகில் நிறைவேறுவது போல, மண்ணுலகிலும் நிறைவேறுக!
எங்கள் அன்றாட உணவை இன்று எங்களுக்குத் தாரும். எங்களுக்கு எதிராகக் குற்றம் செய்வோரை நாங்கள் மன்னிப்பது போல எங்கள் குற்றங்களை மன்னியும். எங்களைச் சோதனைக்கு உட்படுத்தாதேயும். தீமையிலிருந்து எங்களை விடுவித்தருளும். ஆமென்.`
  },
  {
    id: 't3',
    title: "நம்பிக்கை அறிக்கை",
    category: "Traditional",
    language: 'tamil',
    content: `விண்ணகத்தையும் மண்ணகத்தையும் படைத்த எல்லாம் வல்ல தந்தையாகிய கடவுளை நம்புகின்றேன். அவருடைய ஒரே மகனாகிய நம் ஆண்டவர் இயேசு கிறிஸ்துவை நம்புகின்றேன். இவர் தூய ஆவியால் கருவுற்று, கன்னி மரியாவிடமிருந்து பிறந்தார். பொந்தியு பிலாத்துவின் அதிகாரத்தில் பாடுபட்டுச் சிலுவையில் அறையப்பட்டு, இறந்து, அடக்கம் செய்யப்பட்டார். பாதாளத்தில் இறங்கி, மூன்றாம் நாள் இறந்தோரிடமிருந்து உயிர்த்தெழுந்தார். விண்ணகத்துக்கு எழுந்தருளி, எல்லாம் வல்ல தந்தையாகிய கடவுளின் வலப் பக்கத்தில் வீற்றிருக்கின்றார். அங்கிருந்து வாழ்வோருக்கும் இறந்தோருக்கும் தீர்ப்பு வழங்க வருவார். தூய ஆவியாரை நம்புகின்றேன். புனித, கத்தோலிக்கத் திரு அவையை நம்புகின்றேன். புனிதர்களின் உறவு ஒன்றிப்பை நம்புகின்றேன். பாவ மன்னிப்பை நம்புகின்றேன். உடலின் உயிர்ப்பை நம்புகின்றேன். நிலைவாழ்வை நம்புகின்றேன். ஆமென்.`
  },
  {
    id: 't4',
    title: "மங்கள வார்த்தை மன்றாட்டு",
    category: "Traditional",
    language: 'tamil',
    content: `அருள் மிகப் பெற்ற மரியே வாழ்க ஆண்டவர் உம்முடனே பெண்களுக்குள் ஆசி பெற்றவர் நீரே. உம்முடைய திருவயிற்றின் கனியாகிய இயேசுவும் ஆசி பெற்றவரே. தூய மரியே இறைவனின் தாயே பாவிகளாய் இருக்கிற எங்களுக்காக இப்பொழுதும் எங்கள் இறப்பின் வேளையிலும் வேண்டிக்கொள்ளும். ஆமென்.`
  },
  {
    id: 't5',
    title: "பத்துக்கட்டளைகள்",
    category: "Traditional",
    language: 'tamil',
    content: `1. நாமே உன் கடவுளாகிய ஆண்டவர் எம்மைத் தவிர வேறு தெய்வங்கள் உனக்கு இருத்தல் ஆகாது.
2. உன் கடவுளாகிய ஆண்டவரின் பெயரை வீணாக பயன்படுத்தாதே.
3. ஓய்வு நாளை தூயதாக கடைபிடிப்பதில் கருத்தாய் இரு.
4. உன் தந்தையையும் தாயையும் மதித்து நட. 
5. கொலை செய்யாதே. 
6. விபச்சாரம் செய்யாதே. 
7.களவு செய்யாதே. 
8. பிறருக்கு எதிராக பொய் சான்று சொல்லாதே. 
9. பிறர் மனைவி மீது ஆசை கொள்ளாதே. 
10. பிறருக்கு உரியது எதையும் கவர்ந்திட விரும்பாதே.`
  },
  {
    id: 't6',
    title: "திருச்சபையின் ஒழுங்கு முறைகள்",
    category: "Traditional",
    language: 'tamil',
    content: `1. ஞாயிற்றுக்கிழமைகளிலும் கடன் திரு நாட்களிலும் திருப்பலியில் முழுமையாய் பங்கேற்க வேண்டும் இந்நாட்களின் புனிதத்தை பாதிக்க கூடிய செயல்பாடுகளை தவிர்க்க வேண்டும்.
2. ஆண்டிற்கு ஒரு முறையாவது தகுந்த தயாரிப்புடன் ஒப்புரவு அருள் சாதனத்தில் பங்கேற்க வேண்டும்.
3. பாஸ்கா காலத்தில் ஒப்புரவு அருள்சாதனத்தில் பங்கேற்று நற்கருணை உட்கொள்ள வேண்டும்.
4. திருச்சபை குறிப்பிட்டுள்ள நாட்களில் இறைச்சி உண்ணாதிருக்க வேண்டும்; நோன்பு நாட்களில் ஒருவேளை மட்டும் முழு உணவு உண்ணலாம்.
5. குறைந்த வயதிலும் திருமண தடை உள்ள உறவினரோடும் திருமணம் செய்யாதிருக்க வேண்டும்.
6. திருச்சபையின் தேவைகளை நிறைவேற்ற நம்மால் முடிந்த உதவி செய்ய வேண்டும்.`
  }
];

const Prayer = () => {
  const observerRef = useRef(null);
  const [activeCategory, setActiveCategory] = useState('All');
  const [language, setLanguage] = useState('english');
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
  const [recaptchaValue, setRecaptchaValue] = useState(null);
  const [showAddPrayerForm, setShowAddPrayerForm] = useState(false);
  const [prayerFormData, setPrayerFormData] = useState({
    title: '',
    content: '',
    category: 'Traditional',
    language: 'english'
  });
  const [prayersList, setPrayersList] = useState(prayers);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const adminToken = localStorage.getItem('adminToken');
    setIsAdmin(!!adminToken);
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
  }, []);
  
  const categories = ['All', 'Traditional', 'Saint Devotion', 'Daily Prayers', 'Special Intentions'];
  
  const filteredPrayers = activeCategory === 'All' 
    ? prayers 
    : prayers.filter(prayer => prayer.category === activeCategory);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!recaptchaValue) {
      setMessage('Please complete the reCAPTCHA verification.');
      return;
    }
    
    setLoading(true);
    setMessage('');
    
    try {
      const submitData = { ...formData, recaptcha: recaptchaValue };
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
      setRecaptchaValue(null);
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

  const handlePrayerFormChange = (e) => {
    const { name, value } = e.target;
    setPrayerFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // In your Prayer component's handleAddPrayerSubmit function
const handleAddPrayerSubmit = async (e) => {
  e.preventDefault();
  if (prayerFormData.title && prayerFormData.content) {
    try {
      const response = await adminAPI.createPrayer(prayerFormData);
      const newPrayer = response.data;
      setPrayersList([newPrayer, ...prayersList]);
      setShowAddPrayerForm(false);
      setPrayerFormData({ title: '', content: '', category: 'Traditional', language: 'english' });
      alert('Prayer added successfully!');
    } catch (error) {
      console.error('Error adding prayer:', error.response?.data || error.message);
      // Log the detailed error response
      console.log('Error response:', error.response);
      alert(`Error: ${JSON.stringify(error.response?.data) || 'Please try again'}`);
    }
  }
};
  const closeAddPrayerForm = () => {
    setShowAddPrayerForm(false);
    setPrayerFormData({ title: '', content: '', category: 'Traditional', language: 'english' });
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
    <>
      <style>
        {`
          #prayer-hero {
            padding: clamp(2rem, 6vw, 4rem) 0;
            width: 100%;
            display: flex;
            justify-content: center;
            min-height: 100vh;
            background: linear-gradient(135deg, #f5f3ff 0%, #ede9fe 50%, #ddd6fe 100%);
          }
          
          .prayer-container {
            max-width: 80rem;
            margin: 0 auto;
            padding: 0 clamp(1rem, 4vw, 2rem);
            display: flex;
            flex-direction: column;
            align-items: center;
            text-align: center;
            width: 100%;
          }
          
          .header-container {
            text-align: center;
            margin-bottom: clamp(2rem, 5vw, 3rem);
            position: relative;
            padding-bottom: 1.5rem;
          }
          
          .header-container::after {
            content: '';
            position: absolute;
            bottom: 0;
            left: 50%;
            transform: translateX(-50%);
            width: 100px;
            height: 3px;
            background: linear-gradient(90deg, transparent, #d4af37, transparent);
            border-radius: 3px;
          }
          
          .header-title-container {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 1rem;
            margin-bottom: 1rem;
          }
          
          .header-icon {
            width: clamp(2.5rem, 5vw, 3rem);
            height: clamp(2.5rem, 5vw, 3rem);
            color: #d4af37;
            opacity: 0.9;
          }
          
          .header-title {
            font-size: clamp(2rem, 6vw, 3rem);
            font-family: 'Georgia', serif;
            font-weight: 700;
            color: #6d28d9;
            text-shadow: 0 2px 10px rgba(109,40,217,0.1);
            letter-spacing: 0.05em;
            margin: 0;
          }
          
          .header-subtitle {
            font-size: clamp(1rem, 3vw, 1.25rem);
            color: #475569;
            max-width: 600px;
            margin: 0 auto;
            line-height: 1.6;
            font-weight: 550;
            letter-spacing: 0.02em;

          }
          
          .category-buttons {
            display: flex;
            flex-wrap: wrap;
            justify-content: center;
            gap: 0.75rem;
            margin-bottom: 2.5rem;
            padding: 1rem;
            // background-color: rgba(0, 0, 0, 0);
            // border-radius: 12px;
            // border: 2px solid rgba(130, 0, 251, 0.2);
            // box-shadow: 0 0 15px rgba(243, 201, 64, 0.46);
            width: 100%;
            max-width: 800px;
          }
          
          .category-button {
            padding: 0.6rem 1.25rem;
            border-radius: 50px;
            font-size: 0.875rem;
            font-weight: 500;
            transition: all 0.3s ease;
            background-color: rgba(139, 92, 246, 0.1);
            color: #6d28d9;
            border: 1px solid rgba(139, 92, 246, 0.3);
            cursor: pointer;
            position: relative;
            overflow: hidden;
            z-index: 1;
            min-width: 120px;
          }
          
          .category-button::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: linear-gradient(135deg, #d4af37, #b8860b);
            opacity: 0;
            transition: opacity 0.3s ease;
            z-index: -1;
          }
          
          .category-button:hover {
            color: #ffffff;
            transform: translateY(-2px);
            box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
          }
          
          .category-button:hover::before {
            opacity: 1;
          }
          
          .category-button.active {
            background: linear-gradient(135deg, #d4af37, #b8860b);
            color: #ffffff;
            border-color: transparent;
            box-shadow: 0 4px 12px rgba(212, 175, 55, 0.3);
          }
          
          .language-toggle {
            display: flex;
            justify-content: center;
            gap: 1rem;
            margin-bottom: 2rem;
            background: white;
            padding: 0.5rem;
            border-radius: 50px;
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
            width: fit-content;
            margin-left: auto;
            margin-right: auto;
          }

          .language-button {
            padding: 0.5rem 1.5rem;
            border-radius: 25px;
            border: none;
            background: transparent;
            color: #64748b;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.3s ease;
          }

          .language-button.active {
            background: linear-gradient(135deg, #8b5cf6, #6d28d9);
            color: white;
            box-shadow: 0 4px 12px rgba(139, 92, 246, 0.3);
          }

          .prayer-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 2rem;
            margin-bottom: clamp(2rem, 5vw, 3rem);
            width: 100%;
            max-width: 80rem;
          }
          
          .prayer-card {
            background-color: rgba(255, 255, 255, 0.95);
            border-radius: 1rem;
            padding: 2rem;
            border: 1px solid rgba(255, 255, 255, 0.2);
            backdrop-filter: blur(10px);
            transition: all 0.3s ease;
            cursor: pointer;
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
            color: #1e293b;
            display: flex;
            flex-direction: column;
            height: 100%;
          }
          
          .prayer-card:hover {
            transform: translateY(-5px);
            box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
            background-color: rgba(255, 255, 255, 1);
          }
          
          .prayer-category {
            display: flex;
            align-items: center;
            justify-content: center;
            margin-bottom: 0.5rem;
            gap: 0.5rem;
          }
          
          .prayer-category-icon {
            color: #8b5cf6;
          }
          
          .prayer-category-text {
            color: #8b5cf6;
            font-size: 0.75rem;
            font-weight: 500;
          }
          
          .prayer-title {
            font-size: 1rem;
            font-weight: 600;
            margin-bottom: 0.5rem;
            color: #6d28d9;
            font-family: serif;
          }
          
          .prayer-preview {
            color: #334155;
            font-size: 0.8rem;
            line-height: 1.5;
            margin-bottom: 0.75rem;
            flex-grow: 1;
            /* Limit to 3 lines visually if supported, else height will restrict */
            display: -webkit-box;
            -webkit-line-clamp: 3;
            -webkit-box-orient: vertical;
            overflow: hidden;
          }
          
          .prayer-read-more {
            color: #8b5cf6;
            font-weight: 500;
            background-color: transparent;
            border: none;
            cursor: pointer;
            font-size: 0.75rem;
            margin-top: auto;
          }
          
          .prayer-read-more:hover {
            color: #7c3aed;
            text-decoration: underline;
          }
          
          .prayer-request-form {
            background-color: rgba(255, 255, 255, 0.95);
            border-radius: 1rem;
            padding: clamp(1.5rem, 4vw, 2rem);
            margin-bottom: clamp(2rem, 5vw, 3rem);
            border: 1px solid rgba(255, 255, 255, 0.2);
            backdrop-filter: blur(10px);
            width: 100%;
            max-width: 48rem;
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
            color: #1e293b;
          }
          
          .form-header {
            text-align: center;
            margin-bottom: 2rem;
          }
          
          .form-icon {
            width: 4rem;
            height: 4rem;
            color: #d4af37;
            margin: 0 auto 1rem auto;
            display: block;
          }
          
          .form-title {
            font-size: clamp(1.25rem, 4vw, 1.5rem);
            font-weight: 600;
            margin-bottom: 0.5rem;
            color: #6d28d9;
            font-family: serif;
          }
          
          .form-subtitle {
            color: #475569;
            font-size: 0.875rem;
          }
          
          .form-group {
            display: flex;
            flex-direction: column;
            gap: 1rem;
          }
          
          .form-row {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(min(100%, 200px), 1fr));
            gap: 1rem;
          }
          
          .form-input, .form-select, .form-textarea {
            padding: 0.75rem;
            border-radius: 0.5rem;
            background-color: white;
            border: 1px solid #d1d5db;
            color: #1e293b;
            font-size: 0.875rem;
            width: 100%;
            box-sizing: border-box;
          }
          
          .form-input:focus, .form-select:focus, .form-textarea:focus {
            outline: none;
            border-color: #8b5cf6;
            box-shadow: 0 0 0 3px rgba(139, 92, 246, 0.2);
          }
          
          .form-textarea {
            resize: vertical;
            font-family: inherit;
            min-height: 100px;
          }
          
          .form-checkbox-group {
            display: flex;
            align-items: center;
            gap: 0.5rem;
          }
          
          .form-checkbox {
            accent-color: #8b5cf6;
          }
          
          .form-checkbox-label {
            color: #475569;
            font-size: 0.875rem;
          }
          
          .form-message {
            padding: 1rem;
            border-radius: 0.5rem;
            font-size: 0.875rem;
          }
          
          .form-message.success {
            background-color: #f0fdf4;
            color: #166534;
          }
          
          .form-message.error {
            background-color: #fef2f2;
            color: #dc2626;
          }
          
          .recaptcha-container {
            display: flex;
            justify-content: center;
            margin-bottom: 1rem;
          }
          
          .form-button {
            background-color: #8b5cf6;
            color: white;
            padding: 0.75rem 2rem;
            border-radius: 0.5rem;
            font-weight: 600;
            border: none;
            cursor: pointer;
            transition: all 0.3s ease;
            font-size: 0.875rem;
            width: 100%;
          }
          
          .form-button:hover:not(:disabled) {
            background-color: #7c3aed;
          }
          
          .form-button:disabled {
            background-color: #9ca3af;
            cursor: not-allowed;
          }
          
          .cta-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(min(100%, 280px), 1fr));
            gap: clamp(1rem, 4vw, 2rem);
            width: 100%;
            max-width: 60rem;
          }
          
          .cta-card {
            background-color: rgba(139, 92, 246, 0.1);
            border-radius: 1rem;
            padding: clamp(1.5rem, 4vw, 2rem);
            text-align: center;
            border: 1px solid rgba(139, 92, 246, 0.2);
            backdrop-filter: blur(10px);
            transition: all 0.3s ease;
            color: #1e293b;
            display: flex;
            flex-direction: column;
            align-items: center;
          }
          
          .cta-card:hover {
            transform: translateY(-5px);
            background-color: rgba(139, 92, 246, 0.15);
            border-color: rgba(139, 92, 246, 0.3);
          }
          
          .cta-icon {
            width: 3rem;
            height: 3rem;
            color: #d4af37;
            margin: 0 auto 1rem auto;
            display: block;
          }
          
          .cta-title {
            font-size: clamp(1.125rem, 3vw, 1.25rem);
            font-weight: 600;
            margin-bottom: 1rem;
            color: #6d28d9;
            font-family: serif;
          }
          
          .cta-description {
            color: #475569;
            margin-bottom: 1.5rem;
            line-height: 1.6;
            font-size: clamp(0.8rem, 2vw, 0.875rem);
            flex-grow: 1;
          }
          
          .cta-button {
            background-color: #8b5cf6;
            color: white;
            padding: 0.75rem 1.5rem;
            border-radius: 0.75rem;
            font-weight: 600;
            border: none;
            cursor: pointer;
            transition: all 0.3s ease;
            font-size: clamp(0.8rem, 2vw, 0.875rem);
            width: 100%;
          }
          
          .cta-button:hover {
            background-color: #7c3aed;
          }
          
          .modal-overlay {
            position: fixed;
            inset: 0;
            background-color: rgba(0,0,0,0.5);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 50;
            padding: 1rem;
          }
          
          .modal-content {
            background-color: white;
            padding: 2rem;
            border-radius: 0.5rem;
            width: 100%;
            max-width: 500px;
            max-height: 80vh;
            overflow-y: auto;
            color: #1e293b;
          }
          
          .modal-title {
            font-size: 1.25rem;
            font-weight: 600;
            margin-bottom: 1rem;
            color: #6d28d9;
          }
          
          .modal-form-group {
            margin-bottom: 1rem;
          }
          
          .modal-form-input, .modal-form-select, .modal-form-textarea {
            width: 100%;
            padding: 0.5rem;
            border: 1px solid #d1d5db;
            border-radius: 0.375rem;
            color: #1e293b;
            box-sizing: border-box;
          }
          
          .modal-form-textarea {
            resize: vertical;
            font-family: inherit;
            min-height: 100px;
          }
          
          .modal-form-actions {
            display: flex;
            gap: 1rem;
            justify-content: flex-end;
            margin-top: 1.5rem;
          }
          
          .modal-button-cancel {
            padding: 0.5rem 1rem;
            background-color: #6b7280;
            color: white;
            border: none;
            border-radius: 0.375rem;
            cursor: pointer;
          }
          
          .modal-button-submit {
            padding: 0.5rem 1rem;
            background-color: #9a75f2ff;
            color: white;
            border: none;
            border-radius: 0.375rem;
            cursor: pointer;
          }
          
          .prayer-modal-overlay {
            position: fixed;
            inset: 0;
            background-color: rgba(0, 0, 0, 0.8);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 50;
            padding: 1rem;
          }
          
          .prayer-modal-content {
            background-color: rgba(30, 41, 59, 0.95);
            border-radius: 1rem;
            padding: 2rem;
            max-width: 32rem;
            width: 100%;
            border: 1px solid rgba(255, 255, 255, 0.2);
            backdrop-filter: blur(20px);
            color: #f8fafc;
          }
          
          .prayer-modal-category {
            display: flex;
            align-items: center;
            justify-content: center;
            margin-bottom: 1rem;
            gap: 0.5rem;
          }
          
          .prayer-modal-category-icon {
            color: #d4af37;
          }
          
          .prayer-modal-category-text {
            color: #d4af37;
            font-size: 0.875rem;
            font-weight: 500;
          }
          
          .prayer-modal-title {
            font-size: 1.5rem;
            font-weight: 600;
            margin-bottom: 1.5rem;
            color: #ffffff;
            font-family: serif;
            text-align: center;
          }
          
          .prayer-modal-content-text {
            color: #e2e8f0;
            line-height: 1.8;
            margin-bottom: 2rem;
            white-space: pre-line;
            text-align: center;
          }
          
          .prayer-modal-close-button {
            width: 100%;
            background-color: #8b5cf6;
            color: white;
            padding: 0.75rem;
            border-radius: 0.5rem;
            font-weight: 600;
            border: none;
            cursor: pointer;
          }
          
          .prayer-modal-close-button:hover {
            background-color: #7c3aed;
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
        `}
      </style>
      
      <section 
        id="prayer-hero"
        className="scroll-fade-in smooth-scroll-section"
      >
        <div className="prayer-container">
          <div className="header-container scroll-slide-up">
            <div className="header-title-container">
              {/* <Book className="header-icon" /> */}
              <h1 className="header-title">Our Prayers</h1>
            </div>
            <p className="header-subtitle">
              Find comfort and strength in these sacred prayers and devotions
            </p>
          </div>

          {/* Language Toggle */}
          <div className="language-toggle">
            <button
              onClick={() => setLanguage('english')}
              className={`language-button ${language === 'english' ? 'active' : ''}`}
            >
              English
            </button>
            <button
              onClick={() => setLanguage('tamil')}
              className={`language-button ${language === 'tamil' ? 'active' : ''}`}
            >
              தமிழ்
            </button>
          </div>

          {/* Category Filter */}
          <div className="category-buttons">
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`category-button ${activeCategory === category ? 'active' : ''}`}
              >
                {category}
              </button>
            ))}
          </div>

          <div 
            id="prayer-grid"
            className="prayer-grid scroll-stagger-children smooth-scroll-section"
          >
            {prayersList
              .filter(prayer => prayer.language === language)
              .filter(prayer => activeCategory === 'All' ? true : prayer.category === activeCategory)
              .map(prayer => (
              <div key={prayer.id} className="prayer-card" onClick={() => setSelectedPrayer(prayer)}>
                <div className="prayer-category">
                  <div className="prayer-category-icon">
                    {getCategoryIcon(prayer.category)}
                  </div>
                  <span className="prayer-category-text">{prayer.category}</span>
                </div>
                
                <h3 className="prayer-title">{prayer.title}</h3>
                <p className="prayer-preview">
                  {prayer.content.length > 50 
                    ? prayer.content.substring(0, 50) + '...' 
                    : prayer.content}
                </p>
                <button className="prayer-read-more">
                  Read Full Prayer →
                </button>
              </div>
            ))}
          </div>

          {/* Prayer Request Form */}
          <div className="prayer-request-form">
            <div className="form-header">
              <Heart className="form-icon" />
              <h2 className="form-title">Submit Prayer Request</h2>
              <p className="form-subtitle">Share your intentions with our prayer community</p>
            </div>
            
            <form onSubmit={handleSubmit} className="form-group">
              <div className="form-row">
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your Name"
                  required
                  className="form-input"
                />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Email (Optional)"
                  className="form-input"
                />
              </div>
              
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Phone (Optional)"
                className="form-input"
              />
              
              <select
                name="prayer_type"
                value={formData.prayer_type}
                onChange={handleChange}
                required
                className="form-select"
              >
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
                className="form-textarea"
              />
              
              <div className="form-checkbox-group">
                <input
                  type="checkbox"
                  id="is_public"
                  name="is_public"
                  checked={formData.is_public}
                  onChange={handleChange}
                  className="form-checkbox"
                />
                <label htmlFor="is_public" className="form-checkbox-label">Make this prayer request public</label>
              </div>
              
              {message && (
                <div className={`form-message ${message.includes('Error') ? 'error' : 'success'}`}>
                  {message}
                </div>
              )}
              
              <div className="recaptcha-container">
                <ReCAPTCHA
                  sitekey={import.meta.env.VITE_RECAPTCHA_SITE_KEY || "6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI"}
                  onChange={setRecaptchaValue}
                  onExpired={() => setRecaptchaValue(null)}
                />
              </div>
              
              <button 
                type="submit"
                disabled={loading || !recaptchaValue}
                className="form-button"
              >
                {loading ? 'Submitting...' : 'Submit Prayer Request'}
              </button>
            </form>
          </div>

          {/* Call to Action */}
          <div className="cta-grid">
            <div className="cta-card">
              <Heart className="cta-icon" />
              <h2 className="cta-title">Prayer Chain</h2>
              <p className="cta-description">
                Join our prayer chain to receive and pray for community intentions.
              </p>
              <button className="cta-button">
                Join Prayer Chain
              </button>
            </div>
            
            <div className="cta-card">
              <Users className="cta-icon" />
              <h2 className="cta-title">Prayer Groups</h2>
              <p className="cta-description">
                Join our prayer groups and grow in faith with fellow parishioners.
              </p>
              <button className="cta-button">
                Join Group
              </button>
            </div>
          </div>
        </div>

        {/* Add Prayer Modal */}
        {showAddPrayerForm && (
          <div className="modal-overlay">
            <div className="modal-content">
              <h3 className="modal-title">Add New Prayer</h3>
              <form onSubmit={handleAddPrayerSubmit}>
                <div className="modal-form-group">
                  <input
                    type="text"
                    name="title"
                    placeholder="Prayer Title"
                    value={prayerFormData.title}
                    onChange={handlePrayerFormChange}
                    required
                    className="modal-form-input"
                  />
                </div>
                <div className="modal-form-group">
                  <select
                    name="category"
                    value={prayerFormData.category}
                    onChange={handlePrayerFormChange}
                    className="modal-form-select"
                  >
                    <option value="Traditional">Traditional</option>
                    <option value="Saint Devotion">Saint Devotion</option>
                    <option value="Daily Prayers">Daily Prayers</option>
                    <option value="Special Intentions">Special Intentions</option>
                  </select>
                </div>
                <div className="modal-form-group">
                  <select
                    name="language"
                    value={prayerFormData.language}
                    onChange={handlePrayerFormChange}
                    className="modal-form-select"
                  >
                    <option value="english">English</option>
                    <option value="tamil">Tamil</option>
                  </select>
                </div>
                <div className="modal-form-group">
                  <textarea
                    name="content"
                    placeholder="Prayer Content"
                    value={prayerFormData.content}
                    onChange={handlePrayerFormChange}
                    required
                    rows="6"
                    className="modal-form-textarea"
                  />
                </div>
                <div className="modal-form-actions">
                  <button
                    type="button"
                    onClick={closeAddPrayerForm}
                    className="modal-button-cancel"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="modal-button-submit"
                  >
                    Add Prayer
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Prayer Modal */}
        {selectedPrayer && (
          <div className="prayer-modal-overlay" onClick={() => setSelectedPrayer(null)}>
            <div className="prayer-modal-content" onClick={(e) => e.stopPropagation()}>
              <div className="prayer-modal-category">
                <div className="prayer-modal-category-icon">
                  {getCategoryIcon(selectedPrayer.category)}
                </div>
                <span className="prayer-modal-category-text">{selectedPrayer.category}</span>
              </div>
              <h3 className="prayer-modal-title">{selectedPrayer.title}</h3>
              <div className="prayer-modal-content-text">
                {selectedPrayer.content}
              </div>
              <button 
                onClick={() => setSelectedPrayer(null)}
                className="prayer-modal-close-button"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </section>
    </>
  );
};

export default Prayer;