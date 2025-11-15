import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Bed, Calendar, Utensils, Wifi, Car, Shield, Coffee, Users, Wind, Droplet, Tv, Refrigerator, BellRing, Laptop, Armchair, ArrowRight, Images } from 'lucide-react';
import PageTransition from '../components/shared/PageTransition';
import GlassCard from '../components/shared/GlassCard';
import Lightbox from '../components/shared/Lightbox';
import { rooms } from '../data/rooms';
import receptionImage from '../assets/images/cover/reception.jpg';

const Home = ({ onBookNow }) => {
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
      'Premium Bedding': Bed,
      'Seating Area': Armchair
    };
    const IconComponent = icons[amenity] || BellRing;
    return <IconComponent size={18} className="text-accent-gold" />;
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
  const quickIntroCards = [
    {
      title: 'Comfortable Rooms',
      description: 'Clean accommodations at affordable prices',
      link: '/rooms',
      icon: Bed,
      color: 'bg-primary-600'
    },
    {
      title: 'Event Venue',
      description: 'Host unforgettable weddings and celebrations',
      link: '/events',
      icon: Calendar,
      color: 'bg-accent-gold'
    },
    {
      title: 'Fine Dining',
      description: 'Authentic Somali and international cuisine',
      link: '/restaurant',
      icon: Utensils,
      color: 'bg-primary-green'
    }
  ];

  const amenities = [
    { icon: Wifi, title: 'Free WiFi', description: 'High-speed internet throughout' },
    { icon: Car, title: 'Free Parking', description: 'Secure parking for guests' },
    { icon: Utensils, title: 'Restaurant', description: 'On-site halal dining' },
    { icon: Calendar, title: 'Event Space', description: 'Professional venue services' },
    { icon: Shield, title: '24/7 Security', description: 'Round-the-clock safety' },
    { icon: Coffee, title: 'Room Service', description: 'Convenient in-room dining' },
    { icon: Users, title: 'Wedding Venue', description: 'Traditional celebrations' },
    { icon: Bed, title: 'Comfortable Rooms', description: 'Modern amenities' }
  ];

  return (
    <PageTransition>
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image with Parallax */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-fixed"
          style={{
            backgroundImage: `url(${receptionImage})`
          }}
        />

        {/* Hero Overlay */}
        <div className="absolute inset-0 hero-overlay" />

        {/* Hero Content */}
        <div className="relative z-10 text-center text-white px-4 max-w-5xl animate-fade-in">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 animate-slide-up">
            Welcome to Bin Ali Hotel
          </h1>
          <p className="text-xl md:text-2xl mb-4" style={{ animationDelay: '0.2s' }}>
            Clean, Comfort and Affordable at the Heart of Eastleigh
          </p>
          <p className="text-base md:text-lg mb-8 text-gray-200 max-w-3xl mx-auto" style={{ animationDelay: '0.3s' }}>
            Cozy Rooms • Event Venue • Somali Weddings
          </p>

          {/* Rating */}
          <div className="flex items-center justify-center mb-8 space-x-2" style={{ animationDelay: '0.35s' }}>
            <div className="flex items-center glass-effect bg-white/20 rounded-2xl px-6 py-3">
              <span className="text-yellow-400 text-2xl">⭐</span>
              <span className="text-white font-bold text-xl ml-2">4.0</span>
              <span className="text-white/90 ml-2">(400+ reviews)</span>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-wrap gap-6 justify-center" style={{ animationDelay: '0.4s' }}>
            <button
              onClick={() => onBookNow && onBookNow()}
              className="cta-gold"
            >
              Book Your Stay
            </button>
            <Link to="/rooms">
              <button className="cta-outline">
                Explore Rooms
              </button>
            </Link>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/50 rounded-full flex items-start justify-center p-2">
            <div className="w-1 h-3 bg-white/50 rounded-full" />
          </div>
        </div>
      </section>

      {/* Our Rooms Section */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          {/* Section Header */}
          <div className="text-center mb-16 scroll-fade-in">
            <h2 className="text-3xl md:text-4xl font-bold text-primary-800 mb-4">
              Our Rooms
            </h2>
            <p className="text-base text-gray-600 max-w-2xl mx-auto">
              Simple, comfortable rooms at affordable prices for your stay in Eastleigh.
            </p>
          </div>

          {/* Rooms Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 mb-12">
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
                    className="absolute bottom-4 right-4 glass-effect px-4 py-2 rounded-full flex items-center space-x-2 text-white hover:bg-accent-gold hover:text-primary-dark-green transition-all duration-300 group"
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
                          className="flex items-center space-x-1.5 glass-effect px-3 py-2 rounded-full hover:border-accent-gold transition-all duration-300"
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

          {/* View All Rooms Button */}
          <div className="text-center scroll-fade-in">
            <Link to="/rooms">
              <button className="cta-outline inline-flex items-center gap-2">
                View All Rooms
                <ArrowRight size={20} />
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* Quick Intro Cards */}
      <section className="section-padding bg-cream-100">
        <div className="container-custom">
          <div className="text-center mb-16 scroll-fade-in">
            <h2 className="text-4xl md:text-5xl font-bold text-primary-dark-green mb-4">
              Why Choose Bin Ali Hotel
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Discover what makes us Eastleigh's preferred destination for accommodation, events, and dining
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {quickIntroCards.map((card, index) => (
              <Link key={index} to={card.link}>
                <GlassCard
                  className="bg-white/80 p-8 text-center h-full scroll-fade-in group"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className={`w-20 h-20 ${card.color} rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <card.icon size={36} className="text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-primary-800 mb-4">
                    {card.title}
                  </h3>
                  <p className="text-gray-600 mb-4">
                    {card.description}
                  </p>
                  <span className="text-accent-gold font-semibold group-hover:underline">
                    Learn More →
                  </span>
                </GlassCard>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Amenities */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="text-center mb-16 scroll-fade-in">
            <h2 className="text-3xl md:text-4xl font-bold text-primary-800 mb-4">
              Hotel Amenities
            </h2>
            <p className="text-base text-gray-600 max-w-2xl mx-auto">
              Everything you need for a comfortable and memorable stay
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {amenities.map((amenity, index) => (
              <GlassCard
                key={index}
                className="bg-cream-100/60 p-6 text-center scroll-fade-in"
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                <div className="w-14 h-14 gold-gradient-bg rounded-2xl flex items-center justify-center mx-auto mb-4 float-animation">
                  <amenity.icon size={24} className="text-primary-dark-green" />
                </div>
                <h3 className="font-bold text-lg text-primary-dark-green mb-2">
                  {amenity.title}
                </h3>
                <p className="text-gray-600 text-sm">
                  {amenity.description}
                </p>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>

      {/* About Preview Section */}
      <section className="section-padding bg-cream-100">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Image */}
            <div className="scroll-fade-in">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                <img
                  src={receptionImage}
                  alt="Bin Ali Hotel Reception"
                  className="w-full h-[500px] object-cover"
                  loading="lazy"
                />
                <div className="absolute bottom-6 right-6 glass-effect bg-white/95 rounded-2xl p-6 shadow-lg">
                  <p className="text-4xl font-bold text-accent-gold">2015</p>
                  <p className="text-sm text-gray-700 font-semibold">Since</p>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="scroll-fade-in">
              <h2 className="text-3xl md:text-4xl font-bold text-primary-800 mb-6">
                Serving Eastleigh Since 2015
              </h2>
              <p className="text-base text-gray-600 mb-6 leading-relaxed">
                Since 2015, Bin Ali Hotel has been serving travelers in Eastleigh with friendly hospitality and comfortable accommodations.
              </p>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                Located in the heart of Nairobi, we pride ourselves on offering exceptional service, comfortable accommodations, and a warm welcome to all our guests.
              </p>
              <Link to="/about">
                <button className="cta-gold">
                  Discover Our Story
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding gold-gradient-bg">
        <div className="container-custom text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-primary-dark-green mb-6">
            Ready for an Unforgettable Stay?
          </h2>
          <p className="text-xl text-gray-700 mb-8 max-w-2xl mx-auto">
            Book your room today and experience the finest hospitality in Eastleigh
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <button
              onClick={() => onBookNow && onBookNow()}
              className="cta-outline border-primary-dark-green text-primary-dark-green hover:bg-primary-dark-green hover:text-accent-gold"
            >
              Book Now
            </button>
            <Link to="/contact">
              <button className="cta-outline border-primary-dark-green text-primary-dark-green hover:bg-primary-dark-green hover:text-accent-gold">
                Contact Us
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

export default Home;
