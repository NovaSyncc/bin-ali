import { ChevronDown } from 'lucide-react';
import receptionImage from '../assets/images/cover/reception.jpg';

const Hero = () => {
  const scrollToGallery = () => {
    const element = document.getElementById('gallery');
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  const scrollToRooms = () => {
    const element = document.getElementById('rooms');
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section
      id="hero"
      className="relative h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-r from-primary-900/80 to-primary-600/60 z-10" />
        <img
          src={receptionImage}
          alt="Bin Ali Hotel Reception"
          className="w-full h-full object-cover"
          loading="eager"
        />
      </div>

      {/* Content */}
      <div className="relative z-20 text-center px-4 max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
          Welcome to Bin Ali Hotel
        </h1>
        <p className="text-lg md:text-xl text-white/95 mb-4 font-normal">
          Comfortable Stay in the Heart of Eastleigh
        </p>
        <p className="text-base md:text-lg text-white/90 mb-8">
          Cozy Rooms • Events • Somali Weddings
        </p>

        {/* Rating */}
        <div className="flex items-center justify-center mb-8 space-x-2">
          <div className="flex items-center bg-white/20 backdrop-blur-sm rounded-lg px-4 py-2">
            <span className="text-yellow-400 text-2xl">⭐</span>
            <span className="text-white font-semibold ml-2">4.0</span>
            <span className="text-white/80 ml-2">(400+ reviews)</span>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={scrollToGallery}
            className="btn-primary px-6 py-3 w-full sm:w-auto"
          >
            Book a Room
          </button>
          <button
            onClick={scrollToRooms}
            className="btn-secondary px-6 py-3 w-full sm:w-auto bg-white/10 backdrop-blur-sm border-white text-white hover:bg-white/20"
          >
            View Rooms
          </button>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 animate-bounce">
        <ChevronDown size={32} className="text-white" />
      </div>
    </section>
  );
};

export default Hero;
