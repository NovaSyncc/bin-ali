import { useState } from 'react';
import PageTransition from '../components/shared/PageTransition';
import Lightbox from '../components/shared/Lightbox';
import receptionImage from '../assets/images/cover/reception.jpg';
import { rooms } from '../data/rooms';

const GalleryPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const categories = ['All', 'Rooms'];

  // Generate gallery images from actual room images
  const galleryImages = rooms.flatMap((room) =>
    room.images.map((imageUrl, index) => ({
      id: `${room.id}-${index}`,
      url: imageUrl,
      category: 'Rooms',
      alt: `${room.type} - View ${index + 1}`
    }))
  );

  // Filter images based on selected category
  const filteredImages = selectedCategory === 'All'
    ? galleryImages
    : galleryImages.filter(img => img.category === selectedCategory);

  const openLightbox = (index) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
  };

  const nextImage = () => {
    setLightboxIndex((prevIndex) =>
      prevIndex === filteredImages.length - 1 ? 0 : prevIndex + 1
    );
  };

  const previousImage = () => {
    setLightboxIndex((prevIndex) =>
      prevIndex === 0 ? filteredImages.length - 1 : prevIndex - 1
    );
  };

  return (
    <PageTransition>
      {/* Hero Section */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-fixed"
          style={{
            backgroundImage: `url(${receptionImage})`
          }}
        />
        <div className="absolute inset-0 hero-overlay" />

        <div className="relative z-10 text-center text-white px-4 animate-fade-in">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 animate-slide-up">
            Our Gallery
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto font-light" style={{ animationDelay: '0.2s' }}>
            Explore our spaces through beautiful imagery
          </p>
        </div>
      </section>

      {/* YouTube Video Section */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="text-center mb-12 scroll-fade-in">
            <h2 className="text-3xl md:text-4xl font-bold text-primary-800 mb-4">
              Virtual Tour
            </h2>
            <p className="text-base text-gray-600 max-w-2xl mx-auto mb-8">
              Take a video tour of our hotel and facilities
            </p>
          </div>

          <div className="max-w-4xl mx-auto scroll-fade-in">
            <div className="relative rounded-xl overflow-hidden shadow-lg" style={{ paddingBottom: '56.25%' }}>
              <iframe
                className="absolute top-0 left-0 w-full h-full"
                src="https://www.youtube.com/embed/YOUR_VIDEO_ID_HERE"
                title="Bin Ali Hotel Virtual Tour"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
            <p className="text-center text-sm text-gray-500 mt-4">
              * Replace YOUR_VIDEO_ID_HERE with your actual YouTube video ID
            </p>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="section-padding bg-cream-100">
        <div className="container-custom">
          {/* Filter Tabs */}
          <div className="flex flex-wrap justify-center gap-4 mb-12 scroll-fade-in">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
                  selectedCategory === category
                    ? 'cta-gold'
                    : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-300'
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Masonry Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredImages.map((image, index) => (
              <div
                key={image.id}
                className="relative rounded-3xl overflow-hidden shadow-lg group cursor-pointer scroll-fade-in"
                style={{
                  animationDelay: `${index * 0.05}s`,
                  height: index % 3 === 0 ? '400px' : '320px'
                }}
                onClick={() => openLightbox(index)}
              >
                <img
                  src={image.url}
                  alt={image.alt}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  loading="lazy"
                />

                {/* Glass Overlay on Hover */}
                <div className="absolute inset-0 glass-effect opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <div className="text-center text-white">
                    <p className="text-lg font-bold mb-2">{image.alt}</p>
                    <p className="text-sm">{image.category}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* No Results */}
          {filteredImages.length === 0 && (
            <div className="text-center py-20">
              <p className="text-xl text-gray-600">No images found for this category.</p>
            </div>
          )}
        </div>
      </section>

      {/* Lightbox */}
      {lightboxOpen && (
        <Lightbox
          images={filteredImages}
          currentIndex={lightboxIndex}
          onClose={closeLightbox}
          onNext={nextImage}
          onPrevious={previousImage}
        />
      )}
    </PageTransition>
  );
};

export default GalleryPage;
