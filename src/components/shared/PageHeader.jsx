import React from 'react';
import { motion } from 'framer-motion';
import defaultBg from '../../assets/images/cover/herobackground.webp';

const PageHeader = ({ title, subtitle, backgroundImage }) => {
  const bgImage = backgroundImage || defaultBg;

  return (
    <div
      className="relative bg-cover bg-center py-24 md:py-32"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <div className="absolute inset-0 bg-navy-deepest/90" />
      <div className="absolute inset-0 bg-gradient-to-t from-navy-deepest to-transparent" />
      <div className="relative container-custom text-center">
        <motion.h1
          className="text-4xl md:text-6xl font-bold text-white text-shadow-lg font-playfair"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {title}
        </motion.h1>
        {subtitle && (
          <motion.p
            className="mt-4 text-lg md:text-xl text-soft-white max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {subtitle}
          </motion.p>
        )}
      </div>
    </div>
  );
};

export default PageHeader;
