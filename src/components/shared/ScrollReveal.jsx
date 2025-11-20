import { useEffect, useRef, useState } from 'react';

const ScrollReveal = ({
  children,
  direction = 'up', // 'up', 'left', 'right', 'fade', 'stagger'
  delay = 0,
  className = '',
  threshold = 0.1,
  triggerOnce = true
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            if (triggerOnce) {
              observer.unobserve(entry.target);
            }
          } else if (!triggerOnce) {
            setIsVisible(false);
          }
        });
      },
      {
        threshold,
        rootMargin: '0px 0px -50px 0px'
      }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => {
      if (elementRef.current) {
        observer.unobserve(elementRef.current);
      }
    };
  }, [threshold, triggerOnce]);

  const getAnimationClass = () => {
    switch (direction) {
      case 'left':
        return 'scroll-reveal-left';
      case 'right':
        return 'scroll-reveal-right';
      case 'fade':
        return 'scroll-reveal-fade';
      case 'stagger':
        return 'scroll-reveal-stagger';
      default:
        return 'scroll-reveal';
    }
  };

  return (
    <div
      ref={elementRef}
      className={`${getAnimationClass()} ${isVisible ? 'revealed' : ''} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

export default ScrollReveal;
