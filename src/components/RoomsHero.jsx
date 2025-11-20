import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ChevronRight, ChevronLeft, MapPin, Bed } from 'lucide-react';
import { rooms } from '../data/rooms';

const RoomsHero = ({ onBookNow, language = 'en' }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [activeFilter, setActiveFilter] = useState('all');

  // Select 5 hero images from different room types
  const heroRooms = [
    { ...rooms[0], label: language === 'so' ? 'La Awoodi Karo' : 'Affordable' }, // Single
    { ...rooms[1], label: language === 'so' ? 'Ugu Caansan' : 'Most Popular' }, // Standard
    { ...rooms[3], label: language === 'so' ? 'Laba Sariir' : 'Twin Beds' }, // Twin
    { ...rooms[4], label: language === 'so' ? 'Qolka Qoyska' : 'Family Suite' }, // Family
    { ...rooms[5], label: language === 'so' ? 'Qaaliga ah' : 'Premium' }, // Studio
  ];

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  // Auto-rotate slideshow
  useEffect(() => {
    const slideInterval = setInterval(() => {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === heroRooms.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000); // Change image every 5 seconds

    return () => clearInterval(slideInterval);
  }, [heroRooms.length]);

  const handleSlideClick = (index) => {
    setCurrentImageIndex(index);
  };

  const handlePrevSlide = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? heroRooms.length - 1 : prevIndex - 1
    );
  };

  const handleNextSlide = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === heroRooms.length - 1 ? 0 : prevIndex + 1
    );
  };

  const scrollToRoomList = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: 'smooth'
    });
  };

  const currentRoom = heroRooms[currentImageIndex];

  // Filter options
  const filters = [
    { id: 'all', label: language === 'so' ? 'Dhammaan Qolalka' : 'All Rooms' },
    { id: 'single', label: language === 'so' ? 'Hal Qof' : 'Single' },
    { id: 'double', label: language === 'so' ? 'Laba Qof' : 'Double' },
    { id: 'suite', label: language === 'so' ? 'Suites' : 'Suites' },
    { id: 'family', label: language === 'so' ? 'Qoys' : 'Family' },
  ];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 1,
        staggerChildren: 0.15,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    }
  };

  const contentPanelVariants = {
    hidden: { opacity: 0, x: -60 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 1.2, ease: [0.25, 0.46, 0.45, 0.94] }
    }
  };

  const imagePanelVariants = {
    hidden: { opacity: 0, x: 60 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 1.2, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }
    }
  };

  const buttonVariants = {
    hover: {
      scale: 1.05,
      y: -3,
      transition: { duration: 0.3, ease: "easeOut" }
    },
    tap: { scale: 0.98, y: 0 }
  };

  return (
    <section className="hero-diagonal-section">
      <motion.div
        className="hero-diagonal-container"
        variants={containerVariants}
        initial="hidden"
        animate={isVisible ? "visible" : "hidden"}
      >
        {/* Content Panel - Left Side */}
        <motion.div
          className="hero-content-panel"
          variants={contentPanelVariants}
        >
          <div className="max-w-lg w-full">
            {/* Breadcrumb */}
            <motion.nav
              className="flex items-center gap-2 text-sm text-gold-premium/80 mb-6"
              variants={itemVariants}
            >
              <span>{language === 'so' ? 'Guriga' : 'Home'}</span>
              <ChevronRight size={14} />
              <span className="text-soft-white">{language === 'so' ? 'Qolalka' : 'Rooms'}</span>
            </motion.nav>

            {/* Main Heading */}
            <motion.h1
              className="text-3xl md:text-4xl lg:text-5xl font-playfair font-bold mb-4 leading-tight"
              variants={itemVariants}
            >
              {language === 'so' ? 'Hel Qolkaaga Ku Habboon ' : 'Discover Your Perfect '}
              <span className="bg-gradient-to-r from-gold-premium via-gold-warm to-gold-premium bg-clip-text text-transparent">
                {language === 'so' ? 'Qaaliga ah' : 'Luxury Accommodation'}
              </span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              className="text-base md:text-lg text-soft-white/90 mb-6 leading-relaxed"
              variants={itemVariants}
            >
              {language === 'so'
                ? 'Laga bilaabo qolal hal qof oo raaxo badan ilaa qolal ballaaran oo qoys, hel qolka ku habboon fasaxa'
                : 'From cozy singles to spacious family suites, find the perfect room for your stay'}
            </motion.p>

            {/* Location */}
            <motion.div
              className="flex items-center gap-2 text-gold-premium font-semibold mb-6"
              variants={itemVariants}
            >
              <MapPin size={18} />
              <span>Eastleigh, Nairobi</span>
            </motion.div>

            {/* Stats Row */}
            <motion.div
              className="grid grid-cols-3 gap-3 mb-8"
              variants={itemVariants}
            >
              <div className="text-center premium-glass-card p-4">
                <div className="text-3xl font-bold text-gold-premium mb-1">70+</div>
                <div className="text-sm font-semibold text-white mb-1">{language === 'so' ? 'Qolal La Heli Karo' : 'Rooms Available'}</div>
                <div className="text-xs text-soft-white/60">{language === 'so' ? '6 Nooc Qaaliya ah' : '6 Luxury Types'}</div>
              </div>
              <div className="text-center premium-glass-card p-4">
                <div className="text-3xl font-bold text-gold-premium mb-1">2</div>
                <div className="text-sm font-semibold text-white mb-1">{language === 'so' ? 'Hoolasha Arooska' : 'Wedding Halls'}</div>
                <div className="text-xs text-soft-white/60">{language === 'so' ? 'Awood 300-350' : '300-350 Capacity'}</div>
              </div>
              <div className="text-center premium-glass-card p-4">
                <div className="text-3xl font-bold text-gold-premium mb-1">14+</div>
                <div className="text-sm font-semibold text-white mb-1">{language === 'so' ? 'Adeegyo Heer Sare ah' : 'Premium Amenities'}</div>
                <div className="text-xs text-soft-white/60">{language === 'so' ? 'Xarumaha Casriga ah' : 'Modern Facilities'}</div>
              </div>
            </motion.div>

            {/* Filter Bar */}
            <motion.div
              className="mb-8"
              variants={itemVariants}
            >
              <div className="flex items-center gap-2 mb-3">
                <Bed size={18} className="text-gold-premium" />
                <span className="text-sm font-semibold text-soft-white">{language === 'so' ? 'Hel Qolkaaga Ku Habboon' : 'Find Your Ideal Room'}</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {filters.map((filter) => (
                  <button
                    key={filter.id}
                    onClick={() => setActiveFilter(filter.id)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                      activeFilter === filter.id
                        ? 'bg-gradient-to-r from-gold-premium to-gold-warm text-navy-deepest'
                        : 'bg-white/10 text-soft-white hover:bg-white/20 border border-white/10'
                    }`}
                  >
                    {filter.label}
                  </button>
                ))}
              </div>
            </motion.div>

            {/* Action Buttons */}
            <motion.div
              className="flex flex-col sm:flex-row gap-4"
              variants={itemVariants}
            >
              <motion.button
                onClick={() => onBookNow && onBookNow(currentRoom)}
                className="btn-gold"
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
              >
                {language === 'so' ? 'Buugi Qolkan' : 'Book This Room'}
              </motion.button>
              <motion.button
                onClick={scrollToRoomList}
                className="btn-glass"
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
              >
                {language === 'so' ? 'Eeg Dhammaan Qolalka' : 'View All Rooms'}
              </motion.button>
            </motion.div>
          </div>
        </motion.div>

        {/* Image Panel - Right Side with Slideshow */}
        <motion.div
          className="hero-image-panel"
          variants={imagePanelVariants}
        >
          <div className="hero-image-container">
            <div className="hero-slideshow">
              <div className="hero-image-overlay"></div>

              {/* Slideshow Images */}
              {heroRooms.map((room, index) => (
                <img
                  key={index}
                  src={room.image}
                  alt={room.type}
                  className={`hero-slideshow-image ${index === currentImageIndex ? 'active' : ''}`}
                  loading={index === 0 ? 'eager' : 'lazy'}
                />
              ))}

              {/* Room Info Overlay (Bottom Left) */}
              <motion.div
                className="absolute bottom-8 left-8 z-[3] bg-navy-deepest/90 backdrop-blur-xl rounded-2xl px-6 py-4 border border-gold-premium/30"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1 }}
                key={currentImageIndex}
              >
                <h3 className="text-xl md:text-2xl font-playfair font-bold text-white mb-1">
                  {currentRoom.type}
                </h3>
                <p className="text-sm text-soft-white/80 mb-2">
                  {language === 'so' ? 'Ilaa ' : 'Up to '}{currentRoom.capacity} {language === 'so' ? 'Qof' : `Guest${currentRoom.capacity > 1 ? 's' : ''}`}
                </p>
                <div className="text-2xl font-bold text-gold-premium">
                  KES {currentRoom.price.toLocaleString()}/{language === 'so' ? 'habeen' : 'night'}
                </div>
              </motion.div>

              {/* Badge Label (Top Right) */}
              <motion.div
                className="absolute top-8 right-8 z-[3] bg-gradient-to-r from-gold-premium to-gold-warm text-navy-deepest px-5 py-2 rounded-full font-bold text-sm"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.2 }}
                key={`badge-${currentImageIndex}`}
              >
                {currentRoom.label}
              </motion.div>

              {/* Slideshow Indicators */}
              <div className="hero-slideshow-indicators">
                {heroRooms.map((_, index) => (
                  <button
                    key={index}
                    className={`hero-slideshow-indicator ${index === currentImageIndex ? 'active' : ''}`}
                    onClick={() => handleSlideClick(index)}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>

              {/* Slideshow Navigation Arrows */}
              <button
                className="hero-slideshow-nav prev"
                onClick={handlePrevSlide}
                aria-label="Previous slide"
              >
                <ChevronLeft size={24} />
              </button>

              <button
                className="hero-slideshow-nav next"
                onClick={handleNextSlide}
                aria-label="Next slide"
              >
                <ChevronRight size={24} />
              </button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default RoomsHero;
