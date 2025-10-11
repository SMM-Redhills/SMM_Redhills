import React from 'react';
const MassTimings = ({ timings }) => (
  <div>
    <h2 className="text-3xl font-serif font-bold text-gray-900 mb-8">Mass Timings</h2>
    <div className="space-y-6">
      {timings.map((timing, index) => (
        <div key={index} className="bg-blue-50 rounded-lg p-6">
          <h3 className="text-xl font-semibold text-blue-800 mb-3">{timing.day}</h3>
          <div className="flex items-center justify-between">
            <span className="text-lg font-medium">{timing.time}</span>
          </div>
        </div>
      ))}
    </div>
  </div>
);
export default MassTimings;
