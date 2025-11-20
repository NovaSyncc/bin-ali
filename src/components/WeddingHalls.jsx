import React from 'react';
import { motion } from 'framer-motion';
import clsx from 'clsx';
import PageTransition from './shared/PageTransition';

// Placeholder video/image paths - REPLACE WITH ACTUAL
import hallVideo1 from '../assets/videos/hall1.mp4';
import hallImage1 from '../assets/images/cover/reception.jpg';
import hallImage2 from '../assets/images/cover/herobackground.webp';

const weddingHallsData = [
  {
    id: 1,
    name: "Grand Classic Hall",
    somaliName: "Qolka Weyn ee Classic",
    capacity: "300 Guests",
    somaliCapacity: "300 Qof",
    description: "Our largest wedding hall featuring traditional Somali décor, premium lighting, and spacious dance floor. Perfect for grand celebrations with family and friends.",
    features: [
      "Premium stage setup",
      "Professional sound system",
      "Customizable lighting",
      "Dedicated bridal suite",
      "Ample parking space",
      "Air conditioning"
    ],
    media: {
      type: "video",
      src: hallVideo1,
      poster: hallImage1 // Fallback image for video
    }
  },
  {
    id: 2,
    name: "Elegant Boutique Hall",
    somaliName: "Qolka Yar ee Elegant",
    capacity: "150 Guests",
    somaliCapacity: "150 Qof",
    description: "Intimate and refined space ideal for smaller, elegant celebrations. Features modern amenities with traditional Somali warmth and hospitality.",
    features: [
      "Intimate atmosphere",
      "Modern AV equipment",
      "Flexible seating",
      "Private entrance",
      "Catering prep area",
      "Climate controlled"
    ],
    media: {
      type: "image",
      src: hallImage2,
      alt: "Elegant Boutique Hall"
    }
  }
];

const WeddingHalls = ({ language = 'en' }) => {
  const fadeInUp = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3
      }
    }
  };

  return (
    <PageTransition>
      <section className="relative overflow-hidden py-20 md:py-32 bg-gradient-to-br from-navy-deepest via-midnight-blue to-navy-deepest">
        <div className="container-custom">
          {/* Section Header */}
          <motion.div
            className="text-center mb-16"
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4 font-playfair">
              {language === 'so' ? 'Qurux badan ' : 'Elegant '}
              <span className="text-royal-blue">
                {language === 'so' ? 'Hoolasha Arooska' : 'Wedding Halls'}
              </span>
            </h2>
            <p className="text-lg text-soft-white max-w-3xl mx-auto">
              {language === 'so'
                ? 'Laba hool oo si qurux badan loo qaabeeyey oo ku habboon arroosyada iyo xafladaha dhaqameed ee Soomaalida'
                : 'Two beautifully designed halls perfect for traditional Somali weddings and celebrations'}
            </p>
          </motion.div>

          {/* Diagonal Layout Grid */}
          <motion.div
            className="grid grid-cols-1 lg:grid-cols-2 gap-12 relative z-10"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            {weddingHallsData.map((hall, index) => (
              <motion.div
                key={hall.id}
                className={clsx(
                  'premium-glass-card overflow-hidden',
                  // Apply diagonal transform only on desktop
                  'lg:transition-transform lg:duration-500 lg:ease-in-out',
                  {
                    'lg:-rotate-2 lg:-translate-y-5': index % 2 === 0,
                    'lg:rotate-2 lg:translate-y-5': index % 2 !== 0,
                  }
                )}
                variants={fadeInUp}
                whileHover={{
                  rotate: 0, // Reset rotation
                  y: 0,      // Reset translateY
                  scale: 1.05, // Apply scale
                  transition: { duration: 0.3, ease: "easeOut" } // Add transition for Framer Motion
                }}
              >
                {/* Media Container */}
                <div className="h-[300px] md:h-[400px] relative overflow-hidden">
                  {hall.media.type === "video" ? (
                    <>
                      <video
                        src={hall.media.src}
                        poster={hall.media.poster}
                        autoPlay
                        loop
                        muted
                        playsInline
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-black/70 to-transparent"></div>
                    </>
                  ) : (
                    <img
                      src={hall.media.src}
                      alt={hall.media.alt}
                      className="w-full h-full object-cover"
                    />
                  )}
                  {/* Capacity Badge */}
                  <div className="absolute top-6 right-6 bg-gold-premium/95 backdrop-blur-sm text-navy-deepest px-4 py-2 rounded-full font-bold text-sm">
                    {language === 'so' ? 'Awood: ' : 'Capacity: '}
                    {language === 'so' ? hall.somaliCapacity : hall.capacity}
                  </div>
                </div>

                {/* Content Section */}
                <div className="p-8">
                  <h3 className="text-3xl font-bold text-white mb-3 font-playfair">
                    {language === 'so' ? hall.somaliName : hall.name}
                  </h3>
                  <p className="text-soft-white mb-6 leading-relaxed">
                    {hall.description}
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                    {hall.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center text-soft-white">
                        <svg className="w-5 h-5 text-gold-premium mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                  <button className="w-full btn-blue">
                    {language === 'so' ? 'Buugi Hoolkan' : 'Book This Hall'}
                  </button>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </PageTransition>
  );
};

export default WeddingHalls;