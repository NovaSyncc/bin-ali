import { motion } from 'framer-motion';
import { useEffect } from 'react';

const PageTransition = ({ children }) => {
  useEffect(() => {
    // Scroll to top on mount
    window.scrollTo(0, 0);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="page-transition"
    >
      {children}
    </motion.div>
  );
};

export default PageTransition;
