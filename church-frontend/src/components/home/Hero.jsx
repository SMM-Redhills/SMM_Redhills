import React from 'react';
const Hero = ({ slides, currentSlide, setCurrentSlide }) => (
  <section className="relative h-screen overflow-hidden">
    {slides.map((slide, index) => (
      <div
        key={index}
        className={`absolute inset-0 transition-opacity duration-1000 ${index === currentSlide ? 'opacity-100' : 'opacity-0'}`}
      >
        <div
          className="w-full h-full bg-cover bg-center"
          style={{ backgroundImage: `url(${slide.image})` }}
        >
          <div className="absolute inset-0 bg-black bg-opacity-50" />
        </div>
      </div>
    ))}
    <div className="relative z-10 flex items-center justify-center h-full text-center text-white px-4">
      <div className="max-w-4xl">
        <h1 className="text-5xl md:text-7xl font-serif font-bold mb-6 animate-fade-in">
          {slides[currentSlide].title}
        </h1>
        <p className="text-xl md:text-2xl mb-4 opacity-90">{slides[currentSlide].subtitle}</p>
        <div className="space-x-4">
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors duration-200">
            Visit Virtual Tour
          </button>
          <button className="border-2 border-white text-white hover:bg-white hover:text-blue-600 px-8 py-3 rounded-lg font-semibold transition-all duration-200">
            Prayer Request
          </button>
        </div>
      </div>
    </div>
    {/* Slide Indicators */}
    <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2">
      {slides.map((_, index) => (
        <button
          key={index}
          onClick={() => setCurrentSlide(index)}
          className={`w-3 h-3 rounded-full transition-all duration-200 ${index === currentSlide ? 'bg-white' : 'bg-white bg-opacity-50'}`}
        />
      ))}
    </div>
  </section>
);

export default Hero;
