// Scroll Observer Utility for fade-in animations
export const initScrollObserver = () => {
  // Check if we're in browser environment
  if (typeof window === 'undefined') return;

  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        // Optional: unobserve after animation to improve performance
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Observe all elements with scroll-fade-in class
  const elements = document.querySelectorAll('.scroll-fade-in');
  elements.forEach(el => observer.observe(el));

  return observer;
};
