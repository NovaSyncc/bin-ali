import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Wifi, Wind, Droplet, Tv, Refrigerator, BellRing, Laptop, Bed, Armchair, Users, ArrowRight, Images, ChefHat } from 'lucide-react';
import PageTransition from '../components/shared/PageTransition';
import Lightbox from '../components/shared/Lightbox';
import { rooms } from '../data/rooms';
import receptionImage from '../assets/images/cover/reception.jpg';

const RoomsPage = ({ onBookNow }) => {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxImages, setLightboxImages] = useState([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Icon mapping for amenities
  const getAmenityIcon = (amenity) => {
    const icons = {
      'WiFi': Wifi,
      'AC': Wind,
      'Hot Water': Droplet,
      'TV': Tv,
      'Mini Fridge': Refrigerator,
      'Room Service': BellRing,
      'Work Desk': Laptop,
      'Kitchenette': ChefHat,
      'Seating Area': Armchair
    };
    const IconComponent = icons[amenity] || BellRing;
    return <IconComponent size={18} className="text-primary-600" />;
  };

  // Open lightbox with room images
  const openRoomGallery = (room) => {
    setLightboxImages(room.images || [room.image]);
    setCurrentImageIndex(0);
    setLightboxOpen(true);
  };

  // Lightbox navigation handlers
  const handleNext = () => {
    setCurrentImageIndex((prev) => (prev + 1) % lightboxImages.length);
  };

  const handlePrevious = () => {
    setCurrentImageIndex((prev) => (prev - 1 + lightboxImages.length) % lightboxImages.length);
  };

  const handleClose = () => {
    setLightboxOpen(false);
  };

  return (
    <PageTransition>
      {/* Hero Section */}
      <section className="relative h-[70vh] flex items-center justify-center overflow-hidden">
        {/* Background Image with Parallax Effect */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-fixed"
          style={{
            backgroundImage: `url(${receptionImage})`
          }}
        />

        {/* Hero Overlay */}
        <div className="absolute inset-0 hero-overlay" />

        {/* Hero Content */}
        <div className="relative z-10 text-center text-white px-4 animate-fade-in">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 animate-slide-up">
            Our Rooms
          </h1>
          <p className="text-lg md:text-xl mb-8 max-w-3xl mx-auto" style={{ animationDelay: '0.2s' }}>
            Simple, comfortable rooms for your stay
          </p>
        </div>
      </section>

      {/* Rooms Section */}
      <section className="section-padding bg-cream-100">
        <div className="container-custom">
          {/* Section Header */}
          <div className="text-center mb-16 scroll-fade-in">
            <h2 className="text-3xl md:text-4xl font-bold text-primary-800 mb-4">
              Room Options
            </h2>
            <p className="text-base text-gray-600 max-w-2xl mx-auto">
              Choose from our selection of clean, comfortable rooms at affordable prices.
            </p>
          </div>

          {/* Rooms Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 mb-16">
            {rooms.map((room, index) => (
              <div
                key={room.id}
                className="room-card scroll-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* Room Image */}
                <div className="image-container relative">
                  <img
                    src={room.image}
                    alt={room.type}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                  <div className="overlay-gradient" />

                  {/* Price Badge */}
                  <div className="price-badge">
                    KES {room.price.toLocaleString()}/night
                  </div>

                  {/* Capacity Badge */}
                  <div className="absolute bottom-4 left-4 glass-effect px-3 py-1.5 rounded-full flex items-center space-x-1 text-white">
                    <Users size={16} />
                    <span className="text-sm font-semibold">{room.capacity} Guest{room.capacity > 1 ? 's' : ''}</span>
                  </div>

                  {/* View More Images Button */}
                  <button
                    onClick={() => openRoomGallery(room)}
                    className="absolute bottom-4 right-4 glass-effect px-4 py-2 rounded-full flex items-center space-x-2 text-white hover:bg-primary-600 transition-all duration-300 group"
                  >
                    <Images size={18} className="group-hover:scale-110 transition-transform" />
                    <span className="text-sm font-semibold">{room.images?.length || 1} Photos</span>
                  </button>
                </div>

                {/* Room Details */}
                <div className="p-8">
                  <h3 className="text-2xl font-bold text-primary-800 mb-3">
                    {room.type}
                  </h3>
                  <p className="text-gray-600 mb-6">
                    {room.description}
                  </p>

                  {/* Amenities */}
                  <div className="mb-6">
                    <p className="text-sm font-semibold text-gray-700 mb-3">Amenities:</p>
                    <div className="flex flex-wrap gap-2">
                      {room.amenities.map((amenity) => (
                        <div
                          key={amenity}
                          className="flex items-center space-x-1.5 glass-effect px-3 py-2 rounded-full hover:border-primary-400 transition-all duration-300"
                          title={amenity}
                        >
                          {getAmenityIcon(amenity)}
                          <span className="text-xs font-medium text-gray-700">{amenity}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Book Button */}
                  <button
                    onClick={() => onBookNow && onBookNow(room)}
                    className="cta-gold w-full"
                  >
                    Book This Room
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Gallery CTA */}
          <div className="text-center">
            <Link to="/gallery">
              <button className="cta-outline inline-flex items-center gap-2">
                View Full Gallery
                <ArrowRight size={20} />
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* Mobile Sticky Book Now Button */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-white shadow-lg md:hidden z-40">
        <button
          onClick={() => onBookNow && onBookNow()}
          className="cta-gold w-full"
        >
          Book Your Stay Now
        </button>
      </div>

      {/* Lightbox for Room Images */}
      {lightboxOpen && (
        <Lightbox
          images={lightboxImages}
          currentIndex={currentImageIndex}
          onClose={handleClose}
          onNext={handleNext}
          onPrevious={handlePrevious}
        />
      )}
    </PageTransition>
  );
};

export default RoomsPage;
