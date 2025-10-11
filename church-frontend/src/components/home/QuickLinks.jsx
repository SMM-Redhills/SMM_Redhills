import React from 'react';
import { Clock, Heart, Camera, Users } from 'lucide-react';
const QuickLinks = () => (
  <section className="py-16 bg-white">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="text-center group cursor-pointer">
          <div className="w-16 h-16 bg-blue-100 group-hover:bg-blue-200 rounded-full flex items-center justify-center mx-auto mb-4 transition-colors duration-200">
            <Clock className="w-8 h-8 text-blue-600" />
          </div>
          <h3 className="text-lg font-semibold mb-2">Mass Timings</h3>
          <p className="text-gray-600">Daily masses and special services</p>
        </div>
        <div className="text-center group cursor-pointer">
          <div className="w-16 h-16 bg-green-100 group-hover:bg-green-200 rounded-full flex items-center justify-center mx-auto mb-4 transition-colors duration-200">
            <Heart className="w-8 h-8 text-green-600" />
          </div>
          <h3 className="text-lg font-semibold mb-2">Prayer Services</h3>
          <p className="text-gray-600">Submit your prayer intentions</p>
        </div>
        <div className="text-center group cursor-pointer">
          <div className="w-16 h-16 bg-purple-100 group-hover:bg-purple-200 rounded-full flex items-center justify-center mx-auto mb-4 transition-colors duration-200">
            <Camera className="w-8 h-8 text-purple-600" />
          </div>
          <h3 className="text-lg font-semibold mb-2">Virtual Tour</h3>
          <p className="text-gray-600">Explore our beautiful  </p>
        </div>
        <div className="text-center group cursor-pointer">
          <div className="w-16 h-16 bg-orange-100 group-hover:bg-orange-200 rounded-full flex items-center justify-center mx-auto mb-4 transition-colors duration-200">
            <Users className="w-8 h-8 text-orange-600" />
          </div>
          <h3 className="text-lg font-semibold mb-2">Community</h3>
          <p className="text-gray-600">Join our parish family</p>
        </div>
      </div>
    </div>
  </section>
);
export default QuickLinks;
