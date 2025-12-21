import React from 'react';
import smmLogo from '../../assets/img/smm_logo.png';
import './Loading.css'; // Import the CSS file for dot-spinner

const Loading = ({ 
  message = "Loading...", 
  size = "medium", 
  fullScreen = false,
  variant = "dotspinner" // Changed default to dotspinner
}) => {
  // Size variants
  const sizeClasses = {
    small: "w-6 h-6",
    medium: "w-10 h-10", 
    large: "w-16 h-16"
  };

  // Dot Spinner Component (Premium Uiverse.io loader)
  const DotSpinner = () => (
    <div className="dot-spinner">
      <div className="dot-spinner__dot"></div>
      <div className="dot-spinner__dot"></div>
      <div className="dot-spinner__dot"></div>
      <div className="dot-spinner__dot"></div>
      <div className="dot-spinner__dot"></div>
      <div className="dot-spinner__dot"></div>
      <div className="dot-spinner__dot"></div>
      <div className="dot-spinner__dot"></div>
    </div>
  );

  // Spinner Component
  const Spinner = ({ className }) => (
    <div className={`animate-spin rounded-full border-4 border-gray-200 border-t-blue-600 ${className}`}></div>
  );

  // Cross Spinner Component (Church themed)
  const CrossSpinner = ({ className }) => (
    <div className={`animate-pulse ${className} flex items-center justify-center`}>
      <div className="text-blue-600 font-bold text-4xl animate-bounce"></div>
    </div>
  );

  // Dots Loading Component
  const DotsLoader = () => (
    <div className="flex space-x-2">
      <div className="w-3 h-3 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
      <div className="w-3 h-3 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
      <div className="w-3 h-3 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
    </div>
  );

  // Pulse Loading Component
  const PulseLoader = () => (
    <div className="flex space-x-2">
      <div className="w-4 h-4 bg-blue-600 rounded-full animate-pulse"></div>
      <div className="w-4 h-4 bg-blue-500 rounded-full animate-pulse" style={{ animationDelay: '200ms' }}></div>
      <div className="w-4 h-4 bg-blue-400 rounded-full animate-pulse" style={{ animationDelay: '400ms' }}></div>
    </div>
  );

  // Loading Bar Component
  const LoadingBar = () => (
    <div className="w-48 h-2 bg-gray-200 rounded-full overflow-hidden">
      <div className="h-full bg-gradient-to-r from-blue-400 to-blue-600 rounded-full animate-pulse"></div>
    </div>
  );

  const renderLoader = () => {
    switch (variant) {
      case 'dotspinner':
        return <DotSpinner />;
      case 'cross':
        return <CrossSpinner className={sizeClasses[size]} />;
      case 'dots':
        return <DotsLoader />;
      case 'pulse':
        return <PulseLoader />;
      case 'bar':
        return <LoadingBar />;
      case 'spinner':
        return <Spinner className={sizeClasses[size]} />;
      default:
        return <DotSpinner />;
    }
  };

  if (fullScreen) {
    return (
      <div 
        className="loading-fullscreen-overlay"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          width: '100vw',
          height: '100vh',
          backgroundColor: 'rgba(255, 255, 255, 0.95)',
          backdropFilter: 'blur(8px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 9999,
          overflow: 'hidden'
        }}
      >
        <div 
          className="flex flex-col items-center space-y-6"
          style={{
            textAlign: 'center',
            maxWidth: '90%'
          }}
        >
          {renderLoader()}
          <p className="text-gray-600 font-medium">{message}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center p-8">
      <div className="flex flex-col items-center space-y-4">
        {renderLoader()}
        {message && <p className="text-gray-600 font-medium text-center">{message}</p>}
      </div>
    </div>
  );
};

// Loading Skeleton Components
export const LoadingSkeleton = ({ lines = 3, className = "" }) => (
  <div className={`animate-pulse ${className}`}>
    {Array.from({ length: lines }).map((_, i) => (
      <div
        key={i}
        className={`h-4 bg-gray-200 rounded mb-3 ${
          i === lines - 1 ? 'w-3/4' : 'w-full'
        }`}
      ></div>
    ))}
  </div>
);

export const CardSkeleton = ({ className = "" }) => (
  <div className={`animate-pulse ${className}`}>
    <div className="bg-gray-200 h-48 rounded-t-lg mb-4"></div>
    <div className="px-4 pb-4">
      <div className="h-4 bg-gray-200 rounded mb-2"></div>
      <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
      <div className="h-3 bg-gray-200 rounded w-1/2"></div>
    </div>
  </div>
);

export const ListSkeleton = ({ items = 5, className = "" }) => (
  <div className={`space-y-4 ${className}`}>
    {Array.from({ length: items }).map((_, i) => (
      <div key={i} className="animate-pulse flex items-center space-x-4">
        <div className="w-12 h-12 bg-gray-200 rounded-full"></div>
        <div className="flex-1">
          <div className="h-4 bg-gray-200 rounded mb-2"></div>
          <div className="h-3 bg-gray-200 rounded w-3/4"></div>
        </div>
      </div>
    ))}
  </div>
);

export default Loading;