import { useState } from 'react';
import { Users, Utensils, Music, Camera, Heart, PartyPopper, CalendarCheck, Sparkles } from 'lucide-react';
import PageTransition from '../components/shared/PageTransition';
import GlassCard from '../components/shared/GlassCard';
import ScrollReveal from '../components/shared/ScrollReveal';
import EventBookingForm from '../components/EventBookingForm';
import PageHeader from '../components/shared/PageHeader';
import receptionImage from '../assets/images/cover/reception.jpg'; // Using for default background

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
      <PageHeader
        title="Host Your Event at Bin Ali Hotel"
        subtitle="Venue for weddings, corporate events, and celebrations in Eastleigh"
        backgroundImage={receptionImage}
      />

      {/* YouTube Video Section - Past Events */}
      <section className="animated-gradient-luxury py-24">
        <div className="container-custom">
          <ScrollReveal direction="fade">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 font-playfair">
                See Our Past Events
              </h2>
              <p className="text-lg text-soft-white/80 max-w-2xl mx-auto mb-8">
                Watch highlights from weddings and celebrations we've hosted
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={200}>
            <div className="max-w-4xl mx-auto premium-glass-card p-6">
              <div className="relative overflow-hidden rounded-xl shadow-lg aspect-video">
                <iframe
                  className="absolute top-0 left-0 w-full h-full"
                  src="https://www.youtube.com/embed/1LDM66mgDFI"
                  title="Bin Ali Hotel Past Events"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Our Event Halls Section */}
      <section className="animated-gradient-premium py-24">
        <div className="container-custom">
          <ScrollReveal direction="fade">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 font-playfair">
                Our Event Halls
              </h2>
              <p className="text-lg text-soft-white/80 max-w-2xl mx-auto mb-8">
                We have two spacious halls, each designed to host your special events with comfort and style
              </p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Bin-Ali Hall One */}
            <ScrollReveal direction="left" delay={100}>
              <GlassCard className="p-6">
                <h3 className="text-2xl font-bold text-white mb-4">Bin-Ali Hall One</h3>
                <p className="text-soft-white/80 mb-4">
                  Our first hall features modern amenities and elegant design, perfect for weddings, corporate events, and celebrations.
                </p>
                <div className="flex items-center gap-2 mb-4">
                  <Users size={20} className="text-gold-premium" />
                  <span className="font-semibold text-soft-white">Capacity: 300-350 guests</span>
                </div>
                <div className="relative rounded-xl overflow-hidden shadow-lg aspect-video">
                  <iframe
                    className="absolute top-0 left-0 w-full h-full"
                    src="https://www.youtube.com/embed/1LDM66mgDFI"
                    title="Bin-Ali Hall One Virtual Tour"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>
              </GlassCard>
            </ScrollReveal>

            {/* Bin-Ali Hall Two */}
            <ScrollReveal direction="right" delay={100}>
              <GlassCard className="p-6">
                <h3 className="text-2xl font-bold text-white mb-4">Bin-Ali Hall Two</h3>
                <p className="text-soft-white/80 mb-4">
                  Our second hall offers the same exceptional facilities with versatile space configuration for any event type.
                </p>
                <div className="flex items-center gap-2 mb-4">
                  <Users size={20} className="text-gold-premium" />
                  <span className="font-semibold text-soft-white">Capacity: 300-350 guests</span>
                </div>
                <div className="relative rounded-xl overflow-hidden shadow-lg aspect-video">
                  <iframe
                    className="absolute top-0 left-0 w-full h-full"
                    src="https://www.youtube.com/embed/1LDM66mgDFI"
                    title="Bin-Ali Hall Two Virtual Tour"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>
              </GlassCard>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Event Types Section */}
      <section className="animated-gradient-luxury py-24">
        <div className="container-custom">
          <ScrollReveal direction="fade">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 font-playfair">
                Events We Host
              </h2>
              <p className="text-lg text-soft-white/80 max-w-2xl mx-auto">
                We can accommodate various types of celebrations and gatherings
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal direction="stagger" delay={100}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {eventTypes.map((event, index) => (
                <GlassCard key={index} className={event.popular ? 'border-2 border-gold-premium' : ''}>
                  {event.popular && (
                    <div className="inline-block px-4 py-1 bg-gold-premium text-navy-deepest rounded-full text-sm font-semibold mb-4">
                      Most Popular
                    </div>
                  )}
                  <div className="w-20 h-20 bg-gradient-to-br from-gold-premium to-gold-warm rounded-full flex items-center justify-center mx-auto mb-6 transition-transform duration-300 group-hover:scale-110">
                    <event.icon size={36} className="text-navy-deepest" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-4 text-center">
                    {event.title}
                  </h3>
                  <p className="text-soft-white/80 text-center">
                    {event.description}
                  </p>
                </GlassCard>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Wedding Spotlight Section */}
      <section className="animated-gradient-premium py-24">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Content Section */}
            <ScrollReveal direction="left">
              <div>
                <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 font-playfair">
                  Your Dream Wedding Venue
                </h2>
                <p className="text-lg text-soft-white/80 leading-relaxed mb-6">
                  At Bin Ali Hotel, we understand the significance of your wedding day. Our dedicated events team specializes in creating authentic Somali wedding experiences that honor tradition while embracing modern elegance.
                </p>
                <p className="text-lg text-soft-white/80 leading-relaxed mb-8">
                  From the initial planning to the last dance, we handle every detail with care and precision. Our venue has hosted countless joyful celebrations, and we're honored to be part of your love story.
                </p>
                <button
                  onClick={() => setIsEventFormOpen(true)}
                  className="btn-gold inline-flex items-center gap-2"
                >
                  <Heart size={20} />
                  Plan Your Wedding
                </button>
              </div>
            </ScrollReveal>

            {/* Image Section */}
            <ScrollReveal direction="right" delay={200}>
              <div className="relative premium-glass-card p-6">
                <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                  <img
                    src="https://images.unsplash.com/photo-1519167758481-83f29da8c7c9?auto=format&fit=crop&w=1200&q=80"
                    alt="Wedding at Bin Ali Hotel"
                    className="w-full h-[500px] object-cover"
                    loading="lazy"
                  />
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Venue Features Section */}
      <section className="animated-gradient-luxury py-24">
        <div className="container-custom">
          <ScrollReveal direction="fade">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 font-playfair">
                World-Class Venue Features
              </h2>
              <p className="text-lg text-soft-white/80 max-w-2xl mx-auto">
                Everything you need for a successful event under one roof
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal direction="stagger" delay={100}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {venueFeatures.map((feature, index) => (
                <GlassCard key={index} className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-gold-premium to-gold-warm rounded-xl flex items-center justify-center flex-shrink-0">
                      <feature.icon size={24} className="text-navy-deepest" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-white mb-2">
                        {feature.title}
                      </h3>
                      <p className="text-soft-white/80 text-sm">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </GlassCard>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Gallery Preview Section */}
      <section className="animated-gradient-premium py-24">
        <div className="container-custom">
          <ScrollReveal direction="fade">
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 font-playfair">
                Event Gallery
              </h2>
              <p className="text-lg text-soft-white/80 max-w-2xl mx-auto mb-8">
                A glimpse of the memorable celebrations we've hosted
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={200}>
            <div className="grid grid-cols-2 gap-4 mb-8">
            {/* First image */}
            <div className="rounded-3xl overflow-hidden shadow-lg">
              <img
                src={galleryImages[0]}
                alt="Wedding Event 1"
                className="w-full h-64 object-cover hover:scale-110 transition-transform duration-500"
                loading="lazy"
              />
            </div>
            {/* Second image with offset */}
            <div className="rounded-3xl overflow-hidden shadow-lg mt-8">
              <img
                src={galleryImages[1]}
                alt="Wedding Event 2"
                className="w-full h-64 object-cover hover:scale-110 transition-transform duration-500"
                loading="lazy"
              />
            </div>
            {/* Third image with negative offset */}
            <div className="rounded-3xl overflow-hidden shadow-lg -mt-8">
              <img
                src={galleryImages[2]}
                alt="Event Setup"
                className="w-full h-64 object-cover hover:scale-110 transition-transform duration-500"
                loading="lazy"
              />
            </div>
            {/* Fourth image */}
            <div className="rounded-3xl overflow-hidden shadow-lg">
              <img
                src={galleryImages[3]}
                alt="Dining Setup"
                className="w-full h-64 object-cover hover:scale-110 transition-transform duration-500"
                loading="lazy"
              />
            </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="animated-gradient-hero py-24">
        <div className="container-custom text-center">
          <ScrollReveal direction="fade">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 font-playfair">
              Ready to Plan Your Event?
            </h2>
            <p className="text-xl text-soft-white/90 mb-8 max-w-2xl mx-auto">
              Let's work together to create an unforgettable experience for you and your guests
            </p>
            <button
              onClick={() => setIsEventFormOpen(true)}
              className="btn-glass inline-flex items-center gap-2"
            >
              Book Your Event Now
            </button>
          </ScrollReveal>
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
