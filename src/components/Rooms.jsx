import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Wifi, Wind, Droplet, Tv, Refrigerator, BellRing, Laptop, Bed, Armchair, Users, ChefHat } from 'lucide-react';
import { rooms } from '../data/rooms';

const Rooms = ({ onBookNow, language = 'en' }) => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -100px 0px' }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  // Icon mapping for amenities
  const getAmenityIcon = (amenity) => {
    const icons = {
      'WiFi': Wifi,
      'AC': Wind,
      'Hot Water': Droplet,
      'TV': Tv,
      'Mini Fridge': Refrigerator,
      'Room Service': BellRing,
      'Work Desk': Laptop,
      'Premium Bedding': Bed,
      'Kitchenette': ChefHat,
      'Seating Area': Armchair
    };
    const IconComponent = icons[amenity] || BellRing;
    return <IconComponent size={14} style={{ color: '#3b82f6' }} />;
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <section
      ref={sectionRef}
      id="rooms"
      className="relative w-full overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, #0f172a 0%, #1e3a8a 50%, #0f172a 100%)',
        padding: '6rem 0',
      }}
    >
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial="hidden"
          animate={isVisible ? 'visible' : 'hidden'}
          variants={fadeInUp}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <h2
            className="text-4xl md:text-5xl font-bold text-white mb-4"
            style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              textShadow: '0 2px 12px rgba(0, 0, 0, 0.4)',
            }}
          >
            {language === 'so' ? 'Qolal Raaxo badan' : 'Comfortable Rooms'}
          </h2>
          <p
            className="text-lg md:text-xl mx-auto"
            style={{
              color: 'rgba(255, 255, 255, 0.85)',
              maxWidth: '800px',
            }}
          >
            {language === 'so'
              ? 'Ka naso raaxo gudaha ka dib xafladahaaga'
              : 'Rest in comfort after your celebrations'}
          </p>
        </motion.div>

        {/* Rooms Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {rooms.map((room, index) => (
            <motion.div
              key={room.id}
              className="room-card-premium"
              initial="hidden"
              animate={isVisible ? 'visible' : 'hidden'}
              variants={fadeInUp}
              transition={{ duration: 0.8, delay: 0.3 + index * 0.1 }}
            >
              {/* Card Container */}
              <div
                style={{
                  background: 'rgba(255, 255, 255, 0.08)',
                  backdropFilter: 'blur(20px)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  borderRadius: '20px',
                  overflow: 'hidden',
                  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
                  transition: 'all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-8px) scale(1.02)';
                  e.currentTarget.style.boxShadow = '0 16px 48px rgba(37, 99, 235, 0.3)';
                  e.currentTarget.style.border = '1px solid rgba(37, 99, 235, 0.3)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0) scale(1)';
                  e.currentTarget.style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.3)';
                  e.currentTarget.style.border = '1px solid rgba(255, 255, 255, 0.1)';
                }}
              >
                {/* Image Container */}
                <div
                  className="relative overflow-hidden"
                  style={{ height: '280px' }}
                >
                  {/* Room Image */}
                  <img
                    src={room.image}
                    alt={room.type}
                    className="w-full h-full object-cover transition-transform duration-600"
                    loading="lazy"
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'scale(1.1)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'scale(1)';
                    }}
                  />

                  {/* Dark Overlay - Always Visible */}
                  <div
                    className="absolute inset-0"
                    style={{
                      background: 'linear-gradient(180deg, rgba(15, 23, 42, 0.2) 0%, rgba(15, 23, 42, 0.7) 100%)',
                    }}
                  />

                  {/* Price Badge - Top Right (Gold) */}
                  <div
                    className="absolute top-4 right-4"
                    style={{
                      background: 'rgba(212, 175, 55, 0.95)',
                      backdropFilter: 'blur(10px)',
                      color: '#0f172a',
                      padding: '0.5rem 1rem',
                      borderRadius: '50px',
                      fontWeight: 700,
                      fontSize: '1rem',
                    }}
                  >
                    KES {room.price.toLocaleString()}/{language === 'so' ? 'habeen' : 'night'}
                  </div>

                  {/* Room Type Badge - Top Left (Glass) */}
                  <div
                    className="absolute top-4 left-4"
                    style={{
                      background: 'rgba(255, 255, 255, 0.15)',
                      backdropFilter: 'blur(10px)',
                      color: 'white',
                      padding: '0.4rem 0.875rem',
                      borderRadius: '50px',
                      fontSize: '0.85rem',
                    }}
                  >
                    {room.capacity} {language === 'so' ? 'Qof' : `Guest${room.capacity > 1 ? 's' : ''}`}
                  </div>
                </div>

                {/* Content Section */}
                <div style={{ padding: '1.5rem' }}>
                  {/* Room Name */}
                  <h3
                    className="mb-3"
                    style={{
                      fontSize: '1.5rem',
                      fontWeight: 700,
                      color: '#ffffff',
                    }}
                  >
                    {room.type}
                  </h3>

                  {/* Room Description */}
                  <p
                    className="mb-5"
                    style={{
                      fontSize: '1rem',
                      color: 'rgba(255, 255, 255, 0.85)',
                      lineHeight: '1.6',
                      display: '-webkit-box',
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden',
                    }}
                  >
                    {room.description}
                  </p>

                  {/* Features Row */}
                  <div
                    className="flex flex-wrap gap-4 mb-5"
                  >
                    {room.amenities.slice(0, 6).map((amenity) => (
                      <div
                        key={amenity}
                        className="flex items-center gap-1.5"
                        style={{
                          color: 'rgba(255, 255, 255, 0.9)',
                          fontSize: '0.9rem',
                        }}
                      >
                        {getAmenityIcon(amenity)}
                        <span>{amenity}</span>
                      </div>
                    ))}
                  </div>

                  {/* CTA Button */}
                  <button
                    onClick={() => onBookNow && onBookNow(room)}
                    className="w-full font-semibold transition-all duration-300"
                    style={{
                      background: 'linear-gradient(135deg, #2563eb, #3b82f6)',
                      color: 'white',
                      padding: '0.875rem',
                      border: 'none',
                      borderRadius: '12px',
                      fontWeight: 600,
                      cursor: 'pointer',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'translateY(-2px)';
                      e.currentTarget.style.boxShadow = '0 8px 20px rgba(37, 99, 235, 0.4)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.boxShadow = 'none';
                    }}
                  >
                    {language === 'so' ? 'Buugi Hadda' : 'Book Now'}
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Note for Client */}
        <motion.div
          className="mt-12 text-center"
          initial="hidden"
          animate={isVisible ? 'visible' : 'hidden'}
          variants={fadeInUp}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <p
            className="text-sm italic"
            style={{ color: 'rgba(255, 255, 255, 0.6)' }}
          >
            {language === 'so'
              ? '* Qiimaha waa tusaale waxayna ku xiran tahay heli kara. Nagala soo xiriir qiimaha hadda jira iyo soo bandhigyo khaas ah.'
              : '* Prices are indicative and subject to availability. Contact us for current rates and special offers.'}
          </p>
        </motion.div>
      </div>

      {/* Responsive Styles */}
      <style jsx>{`
        @media (max-width: 1024px) {
          section {
            padding: 4rem 0 !important;
          }
        }
        @media (max-width: 768px) {
          section {
            padding: 3rem 0 !important;
          }
        }
      `}</style>
    </section>
  );
};

export default Rooms;
