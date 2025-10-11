import React from 'react';
import { Calendar } from 'lucide-react';
const UpcomingEvents = ({ events, formatDate }) => (
  <div>
    <h2 className="text-3xl font-serif font-bold text-gray-900 mb-8">Upcoming Events</h2>
    <div className="space-y-4">
      {events.map((ev) => (
        <div key={ev.id} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow duration-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">{ev.title}</h3>
          <div className="flex items-center text-gray-600 mb-2">
            <Calendar className="w-4 h-4 mr-2" />
            <span>{formatDate(ev.date)}</span>
          </div>
        </div>
      ))}
    </div>
    <button className="mt-6 w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition-colors duration-200">
      View All Events
    </button>
  </div>
);
export default UpcomingEvents;
