import React, { useState } from 'react';
import { User, Mail, Phone, Check, Send } from 'lucide-react';

const prayerTypes = [
  { value: 'health', label: 'Health & Healing', icon: '🙏', color: 'bg-green-100 text-green-800' },
  { value: 'family', label: 'Family & Relationships', icon: '👨‍👩‍👧‍👦', color: 'bg-blue-100 text-blue-800' },
  { value: 'finance', label: 'Financial Blessing', icon: '💰', color: 'bg-yellow-100 text-yellow-800' },
  { value: 'career', label: 'Career & Education', icon: '📚', color: 'bg-purple-100 text-purple-800' },
  { value: 'spiritual', label: 'Spiritual Growth', icon: '✨', color: 'bg-indigo-100 text-indigo-800' },
  { value: 'thanksgiving', label: 'Thanksgiving', icon: '🙌', color: 'bg-orange-100 text-orange-800' },
  { value: 'other', label: 'Other', icon: '💝', color: 'bg-pink-100 text-pink-800' }
];

const initialForm = {
  name: '',
  email: '',
  phone: '',
  prayer_type: 'health',
  intention: '',
  is_public: false
};

function PrayerForm({ onSubmit, isSubmitting, submitted }) {
  const [formData, setFormData] = useState(initialForm);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData, setFormData, initialForm);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-8">
      <h2 className="text-2xl font-semibold mb-6">Submit Your Prayer Request</h2>
      {submitted ? (
        <div className="text-center py-12">
          <Check className="w-16 h-16 text-green-600 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-green-800 mb-2">
            Prayer Request Submitted
          </h3>
          <p className="text-gray-600">
            Thank you for sharing your intention. Our community will pray for you.
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Personal Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <User className="w-4 h-4 inline mr-1" /> Full Name *
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter your full name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Mail className="w-4 h-4 inline mr-1" /> Email Address *
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter your email"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <Phone className="w-4 h-4 inline mr-1" /> Phone Number (Optional)
            </label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter your phone number"
            />
          </div>
          {/* Prayer Types */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-4">Prayer Category *</label>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {prayerTypes.map(type => (
                <label
                  key={type.value}
                  className={`relative flex items-center p-4 border-2 rounded-lg cursor-pointer transition-all duration-200 ${
                    formData.prayer_type === type.value
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <input
                    type="radio"
                    name="prayer_type"
                    value={type.value}
                    checked={formData.prayer_type === type.value}
                    onChange={handleInputChange}
                    className="sr-only"
                  />
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl">{type.icon}</span>
                    <div>
                      <div className="font-medium text-gray-900">{type.label}</div>
                    </div>
                  </div>
                  {formData.prayer_type === type.value && (
                    <Check className="absolute top-2 right-2 w-5 h-5 text-blue-600" />
                  )}
                </label>
              ))}
            </div>
          </div>
          {/* Intention */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Prayer Intention *
            </label>
            <textarea
              name="intention"
              value={formData.intention}
              onChange={handleInputChange}
              required
              rows={4}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
              placeholder="Please share your prayer intention... Remember that our community will pray with you."
            />
          </div>
          {/* Privacy */}
          <div className="flex items-center">
            <input
              type="checkbox"
              name="is_public"
              checked={formData.is_public}
              onChange={handleInputChange}
              className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
            <label className="ml-2 text-sm text-gray-700">
              Allow this prayer request to be shared publicly (name will be kept private)
            </label>
          </div>
          {/* Submit */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white py-3 px-6 rounded-lg font-semibold transition-colors duration-200 flex items-center justify-center space-x-2"
          >
            {isSubmitting ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                <span>Submitting...</span>
              </>
            ) : (
              <>
                <Send className="w-5 h-5" />
                <span>Submit Prayer Request</span>
              </>
            )}
          </button>
        </form>
      )}
    </div>
  );
}

export default PrayerForm;
