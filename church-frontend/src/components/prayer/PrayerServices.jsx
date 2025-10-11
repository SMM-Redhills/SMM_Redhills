import React from 'react';
import { Clock, Heart } from 'lucide-react';

function PrayerServices({ massTimings, prayerServices }) {
  return (
    <div className="space-y-8">
      {/* Mass Timings */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-xl font-semibold mb-4 flex items-center">
          <Clock className="w-5 h-5 mr-2 text-blue-600" /> Mass Timings
        </h3>
        <div className="space-y-4">
          {massTimings.map((timing, index) => (
            <div key={index} className="border-l-4 border-blue-600 pl-4">
              <h4 className="font-medium text-gray-900">{timing.day}</h4>
              <div className="text-sm text-gray-600 mt-1">{timing.times.join(', ')}</div>
              <div className="text-xs text-gray-500 mt-1">{timing.language}</div>
            </div>
          ))}
        </div>
      </div>
      {/* Prayer Services */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-xl font-semibold mb-4 flex items-center">
          <Heart className="w-5 h-5 mr-2 text-red-600" /> Prayer Services
        </h3>
        <div className="space-y-3">
          {prayerServices.map((service, index) => (
            <div key={index} className="flex justify-between items-start p-3 bg-gray-50 rounded-lg">
              <div className="flex-1">
                <h4 className="font-medium text-gray-900 text-sm">{service.name}</h4>
                <p className="text-xs text-gray-600 mt-1">{service.day}</p>
              </div>
              <span className="text-xs text-blue-600 font-medium">{service.time}</span>
            </div>
          ))}
        </div>
      </div>
      {/* Prayer Guidelines */}
      <div className="bg-blue-50 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-blue-800 mb-4">Prayer Guidelines</h3>
        <ul className="text-sm text-blue-700 space-y-2">
          <li>• All prayer requests are treated with respect and confidentiality</li>
          <li>• Our community prays for all intentions during daily masses</li>
          <li>• Emergency prayer requests are prioritized</li>
          <li>• You may submit multiple requests throughout the year</li>
          <li>• Consider joining our prayer groups for ongoing support</li>
        </ul>
      </div>
    </div>
  );
}

export default PrayerServices;
