import React, { useState } from 'react';
import GalleryGrid from './GalleryGrid';
import { Camera, X, ChevronLeft, ChevronRight } from 'lucide-react';

function PhotoGallery({ items }) {
  const imageItems = items.filter(item => item.media_type === 'image');
  const [selectedImage, setSelectedImage] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const openImageModal = (item, index) => {
    setSelectedImage(item);
    setCurrentImageIndex(index);
  };

  const closeImageModal = () => setSelectedImage(null);

  const navigateImage = (direction) => {
    if (!imageItems.length) return;
    let newIndex = currentImageIndex;
    if (direction === 'next') {
      newIndex = (currentImageIndex + 1) % imageItems.length;
    } else {
      newIndex = (currentImageIndex - 1 + imageItems.length) % imageItems.length;
    }
    setCurrentImageIndex(newIndex);
    setSelectedImage(imageItems[newIndex]);
  };

  return (
    <>
      <GalleryGrid items={imageItems} onImageClick={openImageModal} />
      {selectedImage && (
        <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4">
          <div className="relative max-w-4xl max-h-full">
            <img src={selectedImage.image} alt={selectedImage.title} className="max-w-full max-h-full object-contain" />
            {/* Modal Controls */}
            <button onClick={closeImageModal}
              className="absolute top-4 right-4 text-white bg-black bg-opacity-50 rounded-full p-2 hover:bg-opacity-75 transition-all">
              <X className="w-6 h-6" />
            </button>
            <button onClick={() => navigateImage('prev')}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white bg-black bg-opacity-50 rounded-full p-2 hover:bg-opacity-75 transition-all">
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button onClick={() => navigateImage('next')}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white bg-black bg-opacity-50 rounded-full p-2 hover:bg-opacity-75 transition-all">
              <ChevronRight className="w-6 h-6" />
            </button>
            {/* Image Info */}
            <div className="absolute bottom-4 left-4 right-4 bg-black bg-opacity-75 text-white rounded-lg p-4">
              <h3 className="text-lg font-semibold mb-1">{selectedImage.title}</h3>
              <p className="text-sm opacity-90 mb-2">{selectedImage.description}</p>
              <div className="flex justify-between items-center text-xs">
                <span className="bg-blue-600 px-2 py-1 rounded">{selectedImage.category}</span>
                <span>{new Date(selectedImage.created_at).toLocaleDateString()}</span>
              </div>
            </div>
          </div>
        </div>
      )}
      {imageItems.length === 0 && (
        <div className="text-center py-12">
          <Camera className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No photos found</h3>
          <p className="text-gray-600">Try adjusting your search or filter criteria</p>
        </div>
      )}
    </>
  );
}
export default PhotoGallery;
