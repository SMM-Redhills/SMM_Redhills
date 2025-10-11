import React, { useState, useEffect } from 'react';
import { Heart } from 'lucide-react';
import PrayerForm from './PrayerForm';
import PrayerServices from './PrayerServices';

const massTimingsSample = [
  { day: 'Sunday', times: ['7:00 AM', '8:30 AM', '10:00 AM', '6:00 PM'], language: 'Tamil & English' },
  { day: 'Monday - Friday', times: ['6:00 AM', '7:00 AM', '6:00 PM'], language: 'Tamil' },
  { day: 'Saturday', times: ['6:00 AM', '7:00 AM', '6:00 PM'], language: 'Tamil & English' }
];

const prayerServicesSample = [
  { name: 'Novena to St. Thomas', day: 'Every Tuesday', time: '6:30 PM' },
  { name: 'Adoration of the Blessed Sacrament', day: 'First Friday', time: '7:00 PM - 8:00 PM' },
  { name: 'Rosary Prayer', day: 'Daily', time: '5:30 PM' },
  { name: 'Way of the Cross', day: 'Friday', time: '6:30 PM' },
  { name: 'Divine Mercy Chaplet', day: 'Sunday', time: '3:00 PM' }
];

const PrayerRequest = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [massTimings, setMassTimings] = useState([]);
  const [prayerServices, setPrayerServices] = useState([]);

  // Load timings/services
  useEffect(() => {
    setMassTimings(massTimingsSample);
    setPrayerServices(prayerServicesSample);
  }, []);

  const handleSubmit = (formData, setFormData, initialForm) => {
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
        setFormData(initialForm);
      }, 3000);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <Heart className="w-16 h-16 text-blue-600 mx-auto mb-4" />
          <h1 className="text-4xl font-serif font-bold text-gray-900 mb-4">Prayer Requests</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Submit your prayer intentions and join our community in faith. 
            Our parish prays together for all submitted requests during our masses.
          </p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <PrayerForm 
              onSubmit={handleSubmit}
              isSubmitting={isSubmitting}
              submitted={submitted}
            />
          </div>
          <PrayerServices
            massTimings={massTimings}
            prayerServices={prayerServices}
          />
        </div>
        {/* Community Prayer Section */}
        <div className="mt-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg p-8 text-white text-center">
          <h2 className="text-2xl font-serif font-bold mb-4">Join Our Prayer Community</h2>
          <p className="text-lg mb-6 opacity-90">
            "For where two or three gather in my name, there am I with them." - Matthew 18:20
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            <div className="text-center"><div className="text-3xl font-bold">500+</div><div className="text-sm opacity-80">Prayer Requests This Month</div></div>
            <div className="text-center"><div className="text-3xl font-bold">50+</div><div className="text-sm opacity-80">Prayer Warriors</div></div>
            <div className="text-center"><div className="text-3xl font-bold">24/7</div><div className="text-sm opacity-80">Continuous Prayer</div></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrayerRequest;
