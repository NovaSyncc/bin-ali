import { MapPin, Phone, Mail, Clock, MessageCircle } from 'lucide-react';
import PageTransition from '../components/shared/PageTransition';
import GlassCard from '../components/shared/GlassCard';
import receptionImage from '../assets/images/cover/reception.jpg';

const ContactPage = () => {
  const handleWhatsAppClick = () => {
    const whatsappNumber = import.meta.env.VITE_WHATSAPP_NUMBER || '254745386007';
    const message = encodeURIComponent('السلام عليكم, I would like to get more information about Bin Ali Hotel.');
    window.open(`https://wa.me/${whatsappNumber}?text=${message}`, '_blank');
  };

  const contactInfo = [
    {
      icon: MapPin,
      title: 'Location',
      details: ['Eighth St, Nairobi', 'Eastleigh, Kenya'],
      action: null,
      color: 'bg-primary-green'
    },
    {
      icon: Phone,
      title: 'Phone',
      details: ['0745 386007', '+254 745 386007'],
      action: 'tel:+254745386007',
      color: 'bg-accent-gold'
    },
    {
      icon: Mail,
      title: 'Email',
      details: ['info@binalihotel.com'],
      action: 'mailto:info@binalihotel.com',
      color: 'bg-primary-green'
    },
    {
      icon: Clock,
      title: 'Reception Hours',
      details: ['24/7 Available'],
      action: null,
      color: 'bg-accent-gold'
    }
  ];

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
            Get In Touch
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto font-light" style={{ animationDelay: '0.2s' }}>
            We're here to help with any questions or bookings
          </p>
        </div>
      </section>

      {/* Contact Cards Section */}
      <section className="section-padding bg-cream-100">
        <div className="container-custom">
          {/* Contact Info Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {contactInfo.map((info, index) => (
              <GlassCard
                key={index}
                className="bg-white/80 p-8 text-center scroll-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className={`w-16 h-16 ${info.color} rounded-2xl flex items-center justify-center mx-auto mb-4 float-animation`}>
                  <info.icon size={28} className="text-white" />
                </div>
                <h3 className="font-bold text-xl text-primary-dark-green mb-3">
                  {info.title}
                </h3>
                {info.details.map((detail, idx) => (
                  <p key={idx} className="text-gray-600 mb-1">
                    {info.action ? (
                      <a
                        href={info.action}
                        className="hover:text-accent-gold transition-colors font-medium"
                      >
                        {detail}
                      </a>
                    ) : (
                      detail
                    )}
                  </p>
                ))}
              </GlassCard>
            ))}
          </div>

          {/* Main Contact Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Left Column - WhatsApp & Rating */}
            <div className="space-y-8">
              {/* WhatsApp Quick Contact */}
              <div className="scroll-fade-in">
                <GlassCard className="bg-gradient-to-br from-green-500 to-green-600 p-8 text-white border-none">
                  <div className="flex items-center gap-4 mb-4">
                    <MessageCircle size={36} />
                    <h3 className="text-2xl font-bold">WhatsApp Contact</h3>
                  </div>
                  <p className="mb-6 text-white/90 text-lg">
                    Get instant responses to your questions. Chat with us on WhatsApp for immediate assistance!
                  </p>
                  <button
                    onClick={handleWhatsAppClick}
                    className="bg-white text-green-600 px-8 py-4 rounded-full font-semibold hover:bg-cream-100 transition-all duration-300 hover:scale-105 w-full"
                  >
                    Start WhatsApp Chat
                  </button>
                </GlassCard>
              </div>

              {/* Google Rating */}
              <div className="scroll-fade-in">
                <div className="premium-card p-8">
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <p className="text-sm text-gray-600 mb-2">Google Rating</p>
                      <div className="flex items-center gap-3">
                        <span className="text-5xl font-bold text-primary-dark-green">4.0</span>
                        <span className="text-accent-gold text-3xl">⭐⭐⭐⭐</span>
                      </div>
                      <p className="text-sm text-gray-600 mt-2">Based on 400+ reviews</p>
                    </div>
                  </div>
                  <a
                    href="https://maps.google.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="cta-outline w-full inline-block text-center"
                  >
                    View on Google Maps →
                  </a>
                </div>
              </div>

              {/* Additional Info */}
              <div className="scroll-fade-in">
                <GlassCard className="bg-primary-green/10 p-8">
                  <h3 className="font-bold text-2xl text-primary-dark-green mb-4">
                    Why Contact Us?
                  </h3>
                  <ul className="space-y-3 text-gray-700">
                    <li className="flex items-start gap-2">
                      <span className="text-accent-gold mt-1">✓</span>
                      <span>Book your stay with special offers</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-accent-gold mt-1">✓</span>
                      <span>Plan your event or wedding</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-accent-gold mt-1">✓</span>
                      <span>Reserve a table at our restaurant</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-accent-gold mt-1">✓</span>
                      <span>Get answers to any questions</span>
                    </li>
                  </ul>
                </GlassCard>
              </div>
            </div>

            {/* Right Column - Map */}
            <div className="scroll-fade-in">
              <div className="premium-card overflow-hidden h-full min-h-[600px]">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3988.8176449742574!2d36.8373!3d-1.2833!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMcKwMTYnNTkuOSJTIDM2wrA1MCcxNC4zIkU!5e0!3m2!1sen!2ske!4v1234567890"
                  width="100%"
                  height="100%"
                  style={{ border: 0, minHeight: '600px' }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Bin Ali Hotel Location"
                />
              </div>
              <p className="text-center text-gray-600 mt-4">
                Located in the heart of Eastleigh, easily accessible from all major routes in Nairobi
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding gold-gradient-bg">
        <div className="container-custom text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-primary-dark-green mb-6">
            Ready to Experience Bin Ali Hotel?
          </h2>
          <p className="text-xl text-gray-700 mb-8 max-w-2xl mx-auto">
            Contact us today to book your stay or plan your special event
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <button
              onClick={handleWhatsAppClick}
              className="cta-gold"
            >
              Contact via WhatsApp
            </button>
            <a href="tel:+254745386007" className="inline-block">
              <button className="cta-outline border-primary-dark-green text-primary-dark-green hover:bg-primary-dark-green hover:text-accent-gold">
                Call Us Now
              </button>
            </a>
          </div>
        </div>
      </section>
    </PageTransition>
  );
};

export default ContactPage;
