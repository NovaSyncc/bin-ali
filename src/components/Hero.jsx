import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ChevronRight, MapPin } from 'lucide-react';
import receptionImage from '../assets/images/newreception.png';
import receptionImage2 from '../assets/images/newreception2.png';
import { getTranslation } from '../utils/translations';

const receptionImages = [receptionImage, receptionImage2];

const Hero = ({ onBookEventHall, language = 'en' }) => {
  const t = (key) => getTranslation(language, key);
  const [isVisible, setIsVisible] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex(prev => (prev + 1) % receptionImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const scrollToRooms = () => {
    const element = document.getElementById('rooms');
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
    }
  };

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
          <div className="max-w-lg w-full" style={{ pointerEvents: 'auto' }}>
            {/* Breadcrumb */}
            <motion.nav
              className="flex items-center gap-2 text-sm text-gold-premium/80 mb-6"
              variants={itemVariants}
            >
              <span>{language === 'so' ? 'Guriga' : 'Home'}</span>
              <ChevronRight size={14} />
              <span className="text-soft-white">{language === 'so' ? 'Soo dhawayn' : 'Welcome'}</span>
            </motion.nav>

            {/* Main Heading */}
            <motion.h1
              className="text-3xl md:text-4xl lg:text-5xl font-playfair font-bold mb-4 leading-tight"
              variants={itemVariants}
            >
              {language === 'so' ? 'Hoteelka Qaaliga ah & ' : 'Luxury Hotel & '}
              <span className="bg-gradient-to-r from-gold-premium via-gold-warm to-gold-premium bg-clip-text text-transparent">
                {language === 'so' ? 'Goobaha Xafladaha Heer Sare ah' : 'Premium Event Venues'}
              </span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              className="text-base md:text-lg text-soft-white mb-6 leading-relaxed text-shadow-lg"
              variants={itemVariants}
            >
              {language === 'so'
                ? 'Qolal casri ah, hoolal qurux badan, iyo adeeg heer sare ah — wax kasta oo aad u baahan tahay dhexda Eastleigh, Nairobi'
                : 'Elegantly appointed rooms, stunning wedding halls, and world-class service — all under one roof in the heart of Eastleigh, Nairobi'}
            </motion.p>

            {/* Location */}
            <motion.div
              className="flex items-center gap-2 text-gold-premium font-semibold mb-6 text-shadow"
              variants={itemVariants}
            >
              <MapPin size={18} />
              <span>Eastleigh, Nairobi</span>
            </motion.div>

            {/* Stats Row */}
            <motion.div
              className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8"
              variants={itemVariants}
            >
              <div className="text-center premium-glass-card p-4">
                <div className="text-3xl font-bold text-gold-premium mb-1 text-shadow">70+</div>
                <div className="text-sm font-semibold text-white mb-1 text-shadow-sm">{language === 'so' ? 'Qolal La Heli Karo' : 'Rooms Available'}</div>
                <div className="text-xs text-soft-white/80 font-medium text-shadow-sm">{language === 'so' ? '5 Nooc Qaaliya ah' : '5 Luxury Types'}</div>
              </div>
              <div className="text-center premium-glass-card p-4">
                <div className="text-3xl font-bold text-gold-premium mb-1 text-shadow">2</div>
                <div className="text-sm font-semibold text-white mb-1 text-shadow-sm">{language === 'so' ? 'Hoolasha Arooska' : 'Wedding Halls'}</div>
                <div className="text-xs text-soft-white/80 font-medium text-shadow-sm">{language === 'so' ? 'Awood 300-350' : '300-350 Capacity'}</div>
              </div>
              <div className="text-center premium-glass-card p-4">
                <div className="text-3xl font-bold text-gold-premium mb-1 text-shadow">14+</div>
                <div className="text-sm font-semibold text-white mb-1 text-shadow-sm">{language === 'so' ? 'Adeegyo Heer Sare ah' : 'Premium Amenities'}</div>
                <div className="text-xs text-soft-white/80 font-medium text-shadow-sm">{language === 'so' ? 'Xarumaha Casriga ah' : 'Modern Facilities'}</div>
              </div>
              <div className="text-center premium-glass-card p-4">
                <div className="text-3xl font-bold text-gold-premium mb-1 text-shadow">4.0★</div>
                <div className="text-sm font-semibold text-white mb-1 text-shadow-sm">{language === 'so' ? 'Qiimeynta Martida' : 'Guest Rating'}</div>
                <div className="text-xs text-soft-white/80 font-medium text-shadow-sm">{language === 'so' ? '400+ Faallo' : '400+ Reviews'}</div>
              </div>
            </motion.div>

            {/* Action Buttons */}
            <motion.div
              className="flex flex-col sm:flex-row gap-4"
              variants={itemVariants}
            >
              <motion.a
                href="https://wa.me/254791110089?text=Hello%2C%20I%20would%20like%20to%20inquire%20about%20booking%20a%20hall%20at%20Bin%20Ali%20Hotel.%20Could%20you%20please%20share%20availability%20and%20pricing%3F"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-gold"
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
              >
                {language === 'so' ? 'Xiriir Buugista Hoolka' : 'Contact for Hall Booking'}
              </motion.a>
              <motion.button
                onClick={scrollToRooms}
                className="btn-glass"
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
              >
                {language === 'so' ? 'Eeg Qolalka' : 'View Rooms'}
              </motion.button>
            </motion.div>
          </div>
        </motion.div>

        {/* Video Panel - Right Side */}
        <motion.div
          className="hero-image-panel"
          variants={imagePanelVariants}
        >
          <div className="hero-image-container">
            <div className="hero-slideshow">
              {/* Fallback images shown while video loads */}
              {receptionImages.map((src, index) => (
                <img
                  key={index}
                  src={src}
                  alt="Bin Ali Hotel - Reception"
                  className={`hero-slideshow-image ${index === currentImageIndex ? 'active' : ''}`}
                  loading={index === 0 ? 'eager' : 'lazy'}
                />
              ))}

              {/* Video — plays over the fallback images */}
              <div className="absolute inset-0 z-[1]">
                <video
                  autoPlay
                  loop
                  muted
                  playsInline
                  poster={receptionImage}
                  className="absolute inset-0 w-full h-full pointer-events-none"
                  style={{ objectFit: 'cover', objectPosition: 'center' }}
                >
                  <source src="https://pub-f156a8ea433d411abe69e341cc2b5977.r2.dev/videos/0422(1).mp4" type="video/mp4" />
                </video>
              </div>

              {/* Dark overlay for readability */}
              <div className="hero-image-overlay"></div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
