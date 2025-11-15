import { useEffect } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

const Lightbox = ({ images, currentIndex, onClose, onNext, onPrevious }) => {
  useEffect(() => {
    // Prevent body scroll when lightbox is open
    document.body.style.overflow = 'hidden';

    // Handle keyboard navigation
    const handleKeyDown = (e) => {
      switch (e.key) {
        case 'Escape':
          onClose();
          break;
        case 'ArrowLeft':
          onPrevious();
          break;
        case 'ArrowRight':
          onNext();
          break;
        default:
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = 'auto';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose, onNext, onPrevious]);

  if (!images || images.length === 0) return null;

  const currentImage = images[currentIndex];

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center">
      {/* Dark overlay backdrop */}
      <div
        className="absolute inset-0 bg-black bg-opacity-95"
        onClick={onClose}
      />

      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 z-[102] p-2 text-white hover:text-accent-gold transition-colors duration-200"
        aria-label="Close lightbox"
      >
        <X size={32} />
      </button>

      {/* Image counter */}
      <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-[102] text-white text-lg font-semibold">
        {currentIndex + 1} / {images.length}
      </div>

      {/* Previous button */}
      {images.length > 1 && (
        <button
          onClick={onPrevious}
          className="absolute left-4 z-[102] p-3 text-white hover:text-accent-gold transition-colors duration-200 bg-black bg-opacity-50 rounded-full"
          aria-label="Previous image"
        >
          <ChevronLeft size={32} />
        </button>
      )}

      {/* Current image */}
      <div className="relative z-[101] max-w-7xl max-h-[90vh] mx-4">
        <img
          src={currentImage.url || currentImage}
          alt={currentImage.alt || `Image ${currentIndex + 1}`}
          className="max-w-full max-h-[90vh] object-contain"
        />
        {currentImage.caption && (
          <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-70 text-white p-4 text-center">
            {currentImage.caption}
          </div>
        )}
      </div>

      {/* Next button */}
      {images.length > 1 && (
        <button
          onClick={onNext}
          className="absolute right-4 z-[102] p-3 text-white hover:text-accent-gold transition-colors duration-200 bg-black bg-opacity-50 rounded-full"
          aria-label="Next image"
        >
          <ChevronRight size={32} />
        </button>
      )}
    </div>
  );
};

export default Lightbox;
