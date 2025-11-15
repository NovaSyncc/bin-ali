import { useState } from 'react';
import { Users, Utensils, Music, Camera, Heart, PartyPopper, CalendarCheck, Sparkles } from 'lucide-react';
import PageTransition from '../components/shared/PageTransition';
import GlassCard from '../components/shared/GlassCard';
import EventBookingForm from '../components/EventBookingForm';
import receptionImage from '../assets/images/cover/reception.jpg';

const EventsPage = () => {
  const [isEventFormOpen, setIsEventFormOpen] = useState(false);

  const venueFeatures = [
    {
      icon: Users,
      title: '300-350 Guest Capacity',
      description: 'Each of our two spacious halls comfortably accommodates 300-350 guests with flexible seating arrangements.'
    },
    {
      icon: Utensils,
      title: 'Full Catering Services',
      description: 'Authentic Somali and international cuisine prepared by our expert culinary team.'
    },
    {
      icon: Music,
      title: 'Sound & Entertainment',
      description: 'Professional audio-visual equipment and space for live entertainment or DJ services.'
    },
    {
      icon: Camera,
      title: 'Photo-Perfect Spaces',
      description: 'Beautiful indoor and outdoor areas ideal for photography and memorable moments.'
    },
    {
      icon: Sparkles,
      title: 'Custom Decoration',
      description: 'Work with our team to create the perfect ambiance with custom decoration packages.'
    },
    {
      icon: CalendarCheck,
      title: 'Flexible Scheduling',
      description: 'Book your event for half-day or full-day sessions to suit your needs.'
    }
  ];

  const eventTypes = [
    {
      icon: Heart,
      title: 'Weddings',
      description: 'Create unforgettable memories on your special day. We specialize in traditional Somali weddings with authentic customs and modern elegance.',
      popular: true
    },
    {
      icon: Users,
      title: 'Corporate Events',
      description: 'Host professional conferences, seminars, and corporate gatherings in our well-equipped event space.'
    },
    {
      icon: PartyPopper,
      title: 'Celebrations',
      description: 'From birthdays to anniversaries, make every milestone celebration extraordinary.'
    }
  ];

  const galleryImages = [
    'https://images.unsplash.com/photo-1519167758481-83f29da8c8b0?auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1478146896981-b80fe463b330?auto=format&fit=crop&w=600&q=80'
  ];

  return (
    <PageTransition>
      {/* Hero Section */}
      <section className="relative h-[80vh] flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-fixed"
          style={{
            backgroundImage: `url(${receptionImage})`
          }}
        />
        {/* Hero Overlay */}
        <div className="absolute inset-0 hero-overlay" />

        {/* Hero Content */}
        <div className="relative z-10 text-center text-white px-4 animate-fade-in max-w-4xl">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 animate-slide-up">
            Host Your Event at Bin Ali Hotel
          </h1>
          <p className="text-lg md:text-xl mb-8" style={{ animationDelay: '0.2s' }}>
            Venue for weddings, corporate events, and celebrations in Eastleigh
          </p>
          <button
            onClick={() => setIsEventFormOpen(true)}
            className="cta-gold"
          >
            Book Your Event
          </button>
        </div>
      </section>

      {/* YouTube Video Section - Past Events */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="text-center mb-12 scroll-fade-in">
            <h2 className="text-3xl md:text-4xl font-bold text-primary-800 mb-4">
              See Our Past Events
            </h2>
            <p className="text-base text-gray-600 max-w-2xl mx-auto mb-8">
              Watch highlights from weddings and celebrations we've hosted
            </p>
          </div>

          <div className="max-w-4xl mx-auto scroll-fade-in">
            <div className="relative rounded-xl overflow-hidden shadow-lg" style={{ paddingBottom: '56.25%' }}>
              <iframe
                className="absolute top-0 left-0 w-full h-full"
                src="https://www.youtube.com/embed/YOUR_VIDEO_ID_HERE"
                title="Bin Ali Hotel Past Events"
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

      {/* Our Event Halls Section */}
      <section className="section-padding bg-cream-100">
        <div className="container-custom">
          <div className="text-center mb-12 scroll-fade-in">
            <h2 className="text-3xl md:text-4xl font-bold text-primary-800 mb-4">
              Our Event Halls
            </h2>
            <p className="text-base text-gray-600 max-w-2xl mx-auto mb-8">
              We have two spacious halls, each designed to host your special events with comfort and style
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Bin-Ali Hall One */}
            <div className="premium-card p-6 scroll-fade-in">
              <h3 className="text-2xl font-bold text-primary-dark-green mb-4">Bin-Ali Hall One</h3>
              <p className="text-gray-600 mb-4">
                Our first hall features modern amenities and elegant design, perfect for weddings, corporate events, and celebrations.
              </p>
              <div className="flex items-center gap-2 mb-4">
                <Users size={20} className="text-accent-gold" />
                <span className="font-semibold text-gray-700">Capacity: 300-350 guests</span>
              </div>
              <div className="relative rounded-xl overflow-hidden shadow-lg" style={{ paddingBottom: '56.25%' }}>
                <iframe
                  className="absolute top-0 left-0 w-full h-full"
                  src="https://www.youtube.com/embed/YOUR_HALL_ONE_VIDEO_ID"
                  title="Bin-Ali Hall One Virtual Tour"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
              <p className="text-center text-sm text-gray-500 mt-3">
                * Replace YOUR_HALL_ONE_VIDEO_ID with actual YouTube video ID
              </p>
            </div>

            {/* Bin-Ali Hall Two */}
            <div className="premium-card p-6 scroll-fade-in" style={{ animationDelay: '0.1s' }}>
              <h3 className="text-2xl font-bold text-primary-dark-green mb-4">Bin-Ali Hall Two</h3>
              <p className="text-gray-600 mb-4">
                Our second hall offers the same exceptional facilities with versatile space configuration for any event type.
              </p>
              <div className="flex items-center gap-2 mb-4">
                <Users size={20} className="text-accent-gold" />
                <span className="font-semibold text-gray-700">Capacity: 300-350 guests</span>
              </div>
              <div className="relative rounded-xl overflow-hidden shadow-lg" style={{ paddingBottom: '56.25%' }}>
                <iframe
                  className="absolute top-0 left-0 w-full h-full"
                  src="https://www.youtube.com/embed/YOUR_HALL_TWO_VIDEO_ID"
                  title="Bin-Ali Hall Two Virtual Tour"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
              <p className="text-center text-sm text-gray-500 mt-3">
                * Replace YOUR_HALL_TWO_VIDEO_ID with actual YouTube video ID
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Event Types Section */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="text-center mb-16 scroll-fade-in">
            <h2 className="text-3xl md:text-4xl font-bold text-primary-800 mb-4">
              Events We Host
            </h2>
            <p className="text-base text-gray-600 max-w-2xl mx-auto">
              We can accommodate various types of celebrations and gatherings
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {eventTypes.map((event, index) => (
              <div
                key={index}
                className={`premium-card p-8 scroll-fade-in ${event.popular ? 'border-2 border-accent-gold' : ''}`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {event.popular && (
                  <div className="inline-block px-4 py-1 gold-gradient-bg text-primary-dark-green rounded-full text-sm font-semibold mb-4">
                    Most Popular
                  </div>
                )}
                <div className="w-20 h-20 gold-gradient-bg rounded-full flex items-center justify-center mx-auto mb-6">
                  <event.icon size={36} className="text-primary-dark-green" />
                </div>
                <h3 className="text-2xl font-bold text-primary-dark-green mb-4 text-center">
                  {event.title}
                </h3>
                <p className="text-gray-600 text-center">
                  {event.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Wedding Spotlight Section */}
      <section className="section-padding bg-cream-100">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Content Section */}
            <div className="scroll-fade-in">
              <h2 className="text-4xl md:text-5xl font-bold text-primary-dark-green mb-6">
                Your Dream Wedding Venue
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed mb-6">
                At Bin Ali Hotel, we understand the significance of your wedding day. Our dedicated events team specializes in creating authentic Somali wedding experiences that honor tradition while embracing modern elegance.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed mb-8">
                From the initial planning to the last dance, we handle every detail with care and precision. Our venue has hosted countless joyful celebrations, and we're honored to be part of your love story.
              </p>
              <button
                onClick={() => setIsEventFormOpen(true)}
                className="cta-gold inline-flex items-center gap-2"
              >
                <Heart size={20} />
                Plan Your Wedding
              </button>
            </div>

            {/* Image Section */}
            <div className="relative scroll-fade-in">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1519167758481-83f29da8c7c9?auto=format&fit=crop&w=1200&q=80"
                  alt="Wedding at Bin Ali Hotel"
                  className="w-full h-[500px] object-cover"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Venue Features Section */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="text-center mb-16 scroll-fade-in">
            <h2 className="text-4xl md:text-5xl font-bold text-primary-dark-green mb-4">
              World-Class Venue Features
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Everything you need for a successful event under one roof
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {venueFeatures.map((feature, index) => (
              <GlassCard
                key={index}
                className="bg-white/60 p-6 scroll-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 gold-gradient-bg rounded-xl flex items-center justify-center flex-shrink-0 float-animation">
                    <feature.icon size={24} className="text-primary-dark-green" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-primary-dark-green mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600 text-sm">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Preview Section */}
      <section className="section-padding bg-cream-100">
        <div className="container-custom">
          <div className="text-center mb-12 scroll-fade-in">
            <h2 className="text-4xl md:text-5xl font-bold text-primary-dark-green mb-4">
              Event Gallery
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
              A glimpse of the memorable celebrations we've hosted
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-8">
            {/* First image */}
            <div className="rounded-3xl overflow-hidden shadow-lg scroll-fade-in">
              <img
                src={galleryImages[0]}
                alt="Wedding Event 1"
                className="w-full h-64 object-cover hover:scale-110 transition-transform duration-500"
                loading="lazy"
              />
            </div>
            {/* Second image with offset */}
            <div className="rounded-3xl overflow-hidden shadow-lg mt-8 scroll-fade-in" style={{ animationDelay: '0.1s' }}>
              <img
                src={galleryImages[1]}
                alt="Wedding Event 2"
                className="w-full h-64 object-cover hover:scale-110 transition-transform duration-500"
                loading="lazy"
              />
            </div>
            {/* Third image with negative offset */}
            <div className="rounded-3xl overflow-hidden shadow-lg -mt-8 scroll-fade-in" style={{ animationDelay: '0.2s' }}>
              <img
                src={galleryImages[2]}
                alt="Event Setup"
                className="w-full h-64 object-cover hover:scale-110 transition-transform duration-500"
                loading="lazy"
              />
            </div>
            {/* Fourth image */}
            <div className="rounded-3xl overflow-hidden shadow-lg scroll-fade-in" style={{ animationDelay: '0.3s' }}>
              <img
                src={galleryImages[3]}
                alt="Dining Setup"
                className="w-full h-64 object-cover hover:scale-110 transition-transform duration-500"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="section-padding gold-gradient-bg">
        <div className="container-custom text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-primary-dark-green mb-6">
            Ready to Plan Your Event?
          </h2>
          <p className="text-xl text-gray-700 mb-8 max-w-2xl mx-auto">
            Let's work together to create an unforgettable experience for you and your guests
          </p>
          <button
            onClick={() => setIsEventFormOpen(true)}
            className="cta-outline border-primary-dark-green text-primary-dark-green hover:bg-primary-dark-green hover:text-accent-gold"
          >
            Book Your Event Now
          </button>
        </div>
      </section>

      {/* Event Booking Form Modal */}
      <EventBookingForm
        isOpen={isEventFormOpen}
        onClose={() => setIsEventFormOpen(false)}
      />
    </PageTransition>
  );
};

export default EventsPage;
