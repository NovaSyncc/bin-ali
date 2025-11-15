import { useState } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { rooms } from '../data/rooms';

const Gallery = () => {
  const [selectedRoomType, setSelectedRoomType] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  // TODO: Replace with actual photos from Google Maps (67+ available)
  // Organized by room types - add more images for each room type
  const galleryImagesByRoom = {
    "Standard Single Room": [
      {
        id: 1,
        url: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=800&q=80',
        alt: 'Standard Single Room - View 1'
      },
      {
        id: 2,
        url: 'https://images.unsplash.com/photo-1611892440504-42a792e24d32?auto=format&fit=crop&w=800&q=80',
        alt: 'Standard Single Room - View 2'
      },
      {
        id: 3,
        url: 'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&w=800&q=80',
        alt: 'Standard Single Room - View 3'
      },
      {
        id: 4,
        url: 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=800&q=80',
        alt: 'Standard Single Room - View 4'
      }
    ],
    "Deluxe Double Room": [
      {
        id: 5,
        url: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?auto=format&fit=crop&w=800&q=80',
        alt: 'Deluxe Double Room - View 1'
      },
      {
        id: 6,
        url: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=800&q=80',
        alt: 'Deluxe Double Room - View 2'
      },
      {
        id: 7,
        url: 'https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&w=800&q=80',
        alt: 'Deluxe Double Room - View 3'
      },
      {
        id: 8,
        url: 'https://images.unsplash.com/photo-1591088398332-8a7791972843?auto=format&fit=crop&w=800&q=80',
        alt: 'Deluxe Double Room - View 4'
      }
    ],
    "Family Suite": [
      {
        id: 9,
        url: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80',
        alt: 'Family Suite - View 1'
      },
      {
        id: 10,
        url: 'https://images.unsplash.com/photo-1595576508898-0ad5c879a061?auto=format&fit=crop&w=800&q=80',
        alt: 'Family Suite - View 2'
      },
      {
        id: 11,
        url: 'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&w=800&q=80',
        alt: 'Family Suite - View 3'
      },
      {
        id: 12,
        url: 'https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&w=800&q=80',
        alt: 'Family Suite - View 4'
      }
    ],
    "Executive Suite": [
      {
        id: 13,
        url: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=800&q=80',
        alt: 'Executive Suite - View 1'
      },
      {
        id: 14,
        url: 'https://images.unsplash.com/photo-1591088398332-8a7791972843?auto=format&fit=crop&w=800&q=80',
        alt: 'Executive Suite - View 2'
      },
      {
        id: 15,
        url: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=800&q=80',
        alt: 'Executive Suite - View 3'
      },
      {
        id: 16,
        url: 'https://images.unsplash.com/photo-1594560913095-8cf34bfd0d4d?auto=format&fit=crop&w=800&q=80',
        alt: 'Executive Suite - View 4'
      }
    ]
  };

  // Get all images for the selected room type
  const getCurrentImages = () => {
    if (!selectedRoomType) return [];
    return galleryImagesByRoom[selectedRoomType] || [];
  };

  const openLightbox = (index) => {
    const images = getCurrentImages();
    setLightboxIndex(index);
    setSelectedImage(images[index]);
  };

  const closeLightbox = () => {
    setSelectedImage(null);
  };

  const goToPrevious = () => {
    const images = getCurrentImages();
    const newIndex = lightboxIndex > 0 ? lightboxIndex - 1 : images.length - 1;
    setLightboxIndex(newIndex);
    setSelectedImage(images[newIndex]);
  };

  const goToNext = () => {
    const images = getCurrentImages();
    const newIndex = lightboxIndex < images.length - 1 ? lightboxIndex + 1 : 0;
    setLightboxIndex(newIndex);
    setSelectedImage(images[newIndex]);
  };

  // Handle keyboard navigation
  const handleKeyDown = (e) => {
    if (selectedImage) {
      if (e.key === 'ArrowLeft') goToPrevious();
      if (e.key === 'ArrowRight') goToNext();
      if (e.key === 'Escape') closeLightbox();
    }
  };

  // Handle room type selection
  const handleRoomTypeClick = (roomType) => {
    setSelectedRoomType(roomType);
  };

  const handleBackToRoomTypes = () => {
    setSelectedRoomType(null);
  };

  const currentImages = getCurrentImages();

  return (
    <section id="gallery" className="section-padding bg-gray-50">
      <div className="container-custom">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Photo Gallery
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Explore our beautiful rooms by selecting a room type below to view detailed photos.
          </p>
        </div>

        {/* Room Type Selection View */}
        {!selectedRoomType ? (
          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
              Select a Room Type
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {rooms.map((room) => (
                <button
                  key={room.id}
                  onClick={() => handleRoomTypeClick(room.type)}
                  className="card overflow-hidden group hover:scale-105 transition-transform duration-300 text-left"
                >
                  {/* Room Type Image */}
                  <div className="relative h-48 overflow-hidden bg-gray-200">
                    <img
                      src={galleryImagesByRoom[room.type]?.[0]?.url || 'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=800&q=80'}
                      alt={room.type}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      loading="lazy"
                    />
                    {/* Image Count Badge */}
                    <div className="absolute top-4 right-4 bg-primary-600 text-white rounded-full px-3 py-1 text-sm font-semibold">
                      {galleryImagesByRoom[room.type]?.length || 0} Photos
                    </div>
                  </div>

                  {/* Room Type Info */}
                  <div className="p-4">
                    <h4 className="text-lg font-bold text-gray-900 mb-1">
                      {room.type}
                    </h4>
                    <p className="text-sm text-gray-600 mb-2">
                      Click to view photos
                    </p>
                    <p className="text-primary-600 font-semibold">
                      View Gallery →
                    </p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        ) : (
          /* Selected Room Type Gallery View */
          <div>
            {/* Back Button and Title */}
            <div className="mb-8">
              <button
                onClick={handleBackToRoomTypes}
                className="btn-secondary mb-4"
              >
                ← Back to Room Types
              </button>
              <h3 className="text-3xl font-bold text-gray-900">
                {selectedRoomType}
              </h3>
              <p className="text-gray-600 mt-2">
                {currentImages.length} photos available
              </p>
            </div>

            {/* Image Grid */}
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
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-300 flex items-center justify-center">
                    <span className="text-white font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      Click to enlarge
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Note */}
        <div className="mt-8 text-center">
          <p className="text-sm text-gray-500">
            View more photos on our <a href="https://maps.google.com" target="_blank" rel="noopener noreferrer" className="text-primary-600 hover:underline">Google Maps listing</a>
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
          {/* Close Button */}
          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 text-white hover:text-gray-300 z-50"
            aria-label="Close"
          >
            <X size={32} />
          </button>

          {/* Previous Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              goToPrevious();
            }}
            className="absolute left-4 text-white hover:text-gray-300 z-50"
            aria-label="Previous"
          >
            <ChevronLeft size={48} />
          </button>

          {/* Image */}
          <div className="max-w-5xl max-h-[90vh]" onClick={(e) => e.stopPropagation()}>
            <img
              src={selectedImage.url}
              alt={selectedImage.alt}
              className="max-w-full max-h-[90vh] object-contain"
            />
            <p className="text-white text-center mt-4 text-lg">
              {selectedRoomType} - {selectedImage.alt}
            </p>
          </div>

          {/* Next Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              goToNext();
            }}
            className="absolute right-4 text-white hover:text-gray-300 z-50"
            aria-label="Next"
          >
            <ChevronRight size={48} />
          </button>

          {/* Counter */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white">
            {lightboxIndex + 1} / {currentImages.length}
          </div>
        </div>
      )}
    </section>
  );
};

export default Gallery;
