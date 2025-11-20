import { useState } from 'react';
import PageTransition from '../components/shared/PageTransition';
import Lightbox from '../components/shared/Lightbox';
import PageHeader from '../components/shared/PageHeader';
import receptionImage from '../assets/images/cover/reception.jpg';
import { rooms } from '../data/rooms';

const GalleryPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const categories = ['All', 'Rooms']; // Add more categories if needed for Events/Halls etc.

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
      <PageHeader
        title="Our Gallery"
        subtitle="Explore our spaces through beautiful imagery and virtual tours."
        backgroundImage={receptionImage}
      />

      {/* YouTube Video Section */}
      <section className="bg-gradient-to-br from-navy-deepest via-midnight-blue to-navy-deepest py-24">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 font-playfair">
              Virtual Tour
            </h2>
            <p className="text-lg text-soft-white/80 max-w-2xl mx-auto mb-8">
              Take a video tour of our hotel and facilities
            </p>
          </div>

          <div className="max-w-4xl mx-auto premium-glass-card p-6">
            <div className="relative rounded-xl overflow-hidden shadow-xl aspect-video">
              <iframe
                className="absolute top-0 left-0 w-full h-full"
                src="https://www.youtube.com/embed/1LDM66mgDFI"
                title="Bin Ali Hotel Virtual Tour"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="bg-gradient-to-br from-navy-deepest via-midnight-blue to-navy-deepest py-24">
        <div className="container-custom">
          {/* Filter Tabs */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-3 rounded-full font-semibold transition-all duration-300
                  ${selectedCategory === category
                    ? 'btn-blue'
                    : 'btn-glass text-soft-white hover:bg-white/10'
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
                className={`relative rounded-3xl overflow-hidden shadow-lg group cursor-pointer ${
                  index % 3 === 0 ? 'h-[400px]' : 'h-80'
                }`}
                onClick={() => openLightbox(index)}
              >
                <img
                  src={image.url}
                  alt={image.alt}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  loading="lazy"
                />

                {/* Overlay on Hover */}
                <div className="absolute inset-0 bg-navy-deepest/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <div className="text-center text-white p-4">
                    <p className="text-lg font-bold mb-2">{image.alt}</p>
                    <p className="text-sm text-soft-white/80">{image.category}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* No Results */}
          {filteredImages.length === 0 && (
            <div className="text-center py-20">
              <p className="text-xl text-soft-white/80">No images found for this category.</p>
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
