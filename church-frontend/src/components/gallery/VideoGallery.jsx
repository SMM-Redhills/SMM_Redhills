import React from 'react';
import { Video, Play } from 'lucide-react';
function VideoGallery({ items }) {
  const videoItems = items.filter(item => item.media_type === 'video');
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {videoItems.map(item => (
        <div key={item.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-200">
          <div className="relative">
            <img
              src={item.image}
              alt={item.title}
              className="w-full h-48 object-cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
              <Play className="w-12 h-12 text-white" />
            </div>
            <div className="absolute top-2 right-2">
              <Video className="w-5 h-5 text-white" />
            </div>
          </div>
          <div className="p-4">
            <h3 className="font-semibold text-gray-900 mb-1">{item.title}</h3>
            <p className="text-sm text-gray-600 mb-2 line-clamp-2">{item.description}</p>
            <div className="flex justify-between items-center">
              <span className="text-xs text-blue-600 bg-blue-100 px-2 py-1 rounded">{item.category}</span>
              <span className="text-xs text-gray-500">{new Date(item.created_at).toLocaleDateString()}</span>
            </div>
          </div>
        </div>
      ))}
      {videoItems.length === 0 && (
        <div className="text-center py-12">
          <Video className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No videos found</h3>
          <p className="text-gray-600">Try adjusting your search or filter criteria</p>
        </div>
      )}
    </div>
  );
}
export default VideoGallery;
