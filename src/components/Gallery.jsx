import { useState, useEffect } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { rooms } from '../data/rooms';
import { mediaService, supabase } from '../services/supabase';

const Gallery = () => {
  const [selectedRoomType, setSelectedRoomType] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [currentImages, setCurrentImages] = useState([]);
  const [loadingImages, setLoadingImages] = useState(false);

  // When a room type is selected, try Supabase first then fall back to local assets
  useEffect(() => {
    if (!selectedRoomType) {
      setCurrentImages([]);
      return;
    }

    const load = async () => {
      setLoadingImages(true);
      try {
        if (supabase) {
          const data = await mediaService.getMediaItems('image', selectedRoomType);
          if (data && data.length > 0) {
            setCurrentImages(data.map((item, i) => ({
              id: item.id,
              url: item.url,
              alt: `${selectedRoomType} - Photo ${i + 1}`,
            })));
            return;
          }
        }
      } catch (_) {
        // fall through to local images
      } finally {
        setLoadingImages(false);
      }

      // Fallback: use the locally imported images from rooms.js
      const room = rooms.find(r => r.type === selectedRoomType);
      if (room?.images) {
        setCurrentImages(
          room.images.map((img, i) => ({
            id: i,
            url: img,
            alt: `${selectedRoomType} - Photo ${i + 1}`,
          }))
        );
      }
    };

    load();
  }, [selectedRoomType]);

  const openLightbox = (index) => {
    setLightboxIndex(index);
    setSelectedImage(currentImages[index]);
  };

  const closeLightbox = () => setSelectedImage(null);

  const goToPrevious = () => {
    const newIndex = lightboxIndex > 0 ? lightboxIndex - 1 : currentImages.length - 1;
    setLightboxIndex(newIndex);
    setSelectedImage(currentImages[newIndex]);
  };

  const goToNext = () => {
    const newIndex = lightboxIndex < currentImages.length - 1 ? lightboxIndex + 1 : 0;
    setLightboxIndex(newIndex);
    setSelectedImage(currentImages[newIndex]);
  };

  const handleKeyDown = (e) => {
    if (!selectedImage) return;
    if (e.key === 'ArrowLeft') goToPrevious();
    if (e.key === 'ArrowRight') goToNext();
    if (e.key === 'Escape') closeLightbox();
  };

  return (
    <section id="gallery" className="section-padding bg-gray-50">
      <div className="container-custom">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Photo Gallery</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Explore our beautiful rooms by selecting a room type below to view detailed photos.
          </p>
        </div>

        {/* Room Type Selection */}
        {!selectedRoomType ? (
          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">Select a Room Type</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {rooms.map((room) => (
                <button
                  key={room.id}
                  onClick={() => setSelectedRoomType(room.type)}
                  className="card overflow-hidden group hover:scale-105 transition-transform duration-300 text-left"
                >
                  <div className="relative h-48 overflow-hidden bg-gray-200">
                    <img
                      src={room.image}
                      alt={room.type}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      loading="lazy"
                    />
                  </div>
                  <div className="p-4">
                    <h4 className="text-lg font-bold text-gray-900 mb-1">{room.type}</h4>
                    <p className="text-primary-600 font-semibold">View Gallery →</p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        ) : (
          /* Gallery Detail View */
          <div>
            <div className="mb-8">
              <button onClick={() => setSelectedRoomType(null)} className="btn-secondary mb-4">
                ← Back to Room Types
              </button>
              <h3 className="text-3xl font-bold text-gray-900">{selectedRoomType}</h3>
              {!loadingImages && (
                <p className="text-gray-600 mt-2">{currentImages.length} photos available</p>
              )}
            </div>

            {loadingImages ? (
              <div className="text-center py-16 text-gray-500">Loading photos…</div>
            ) : currentImages.length === 0 ? (
              <div className="text-center py-16 text-gray-500">No photos available for this room type yet.</div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {currentImages.map((image, index) => (
                  <div
                    key={image.id}
                    className="relative group overflow-hidden rounded-lg cursor-pointer aspect-square"
                    onClick={() => openLightbox(index)}
                  >
                    <img
                      src={image.url}
                      alt={image.alt}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-300 flex items-center justify-center">
                      <span className="text-white font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        Click to enlarge
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        <div className="mt-8 text-center">
          <p className="text-sm text-gray-500">
            View more photos on our{' '}
            <a href="https://maps.google.com" target="_blank" rel="noopener noreferrer" className="text-primary-600 hover:underline">
              Google Maps listing
            </a>
          </p>
        </div>
      </div>

      {/* Lightbox */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4"
          onClick={closeLightbox}
          onKeyDown={handleKeyDown}
          tabIndex={0}
        >
          <button onClick={closeLightbox} className="absolute top-4 right-4 text-white hover:text-gray-300 z-50" aria-label="Close">
            <X size={32} />
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); goToPrevious(); }}
            className="absolute left-4 text-white hover:text-gray-300 z-50"
            aria-label="Previous"
          >
            <ChevronLeft size={48} />
          </button>
          <div className="max-w-5xl max-h-[90vh]" onClick={(e) => e.stopPropagation()}>
            <img
              src={selectedImage.url}
              alt={selectedImage.alt}
              className="max-w-full max-h-[90vh] object-contain"
            />
            <p className="text-white text-center mt-4 text-lg">
              {selectedRoomType} — {lightboxIndex + 1} / {currentImages.length}
            </p>
          </div>
          <button
            onClick={(e) => { e.stopPropagation(); goToNext(); }}
            className="absolute right-4 text-white hover:text-gray-300 z-50"
            aria-label="Next"
          >
            <ChevronRight size={48} />
          </button>
        </div>
      )}
    </section>
  );
};

export default Gallery;
