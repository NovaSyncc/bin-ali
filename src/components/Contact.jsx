import { MapPin, Phone, Mail, Clock, MessageCircle } from 'lucide-react';

const Contact = () => {
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
      action: null
    },
    {
      icon: Phone,
      title: 'Phone',
      details: ['0745 386007', '+254 745 386007'],
      action: 'tel:+254745386007'
    },
    {
      icon: Mail,
      title: 'Email',
      details: ['info@binalihotel.com'],
      action: 'mailto:info@binalihotel.com'
    },
    {
      icon: Clock,
      title: 'Reception Hours',
      details: ['24/7 Available'],
      action: null
    }
  ];

  return (
    <section
      id="contact"
      style={{
        background: 'linear-gradient(135deg, #0f172a 0%, #1e3a8a 50%, #0f172a 100%)',
        padding: '6rem 0',
      }}
    >
      <div className="container-custom">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2
            style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontSize: 'clamp(2rem, 4vw, 3rem)',
              fontWeight: 600,
              color: '#ffffff',
              textShadow: '0 2px 12px rgba(0, 0, 0, 0.4)',
              marginBottom: '1rem',
            }}
          >
            Get In Touch
          </h2>
          <p
            style={{
              fontSize: '1.125rem',
              color: 'rgba(255, 255, 255, 0.85)',
              maxWidth: '800px',
              margin: '0 auto',
            }}
          >
            Have questions or ready to book? Contact us today and our friendly team will be happy to assist you.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div>
            <div className="space-y-6 mb-8">
              {contactInfo.map((info, index) => (
                <div
                  key={index}
                  style={{
                    background: 'rgba(255, 255, 255, 0.08)',
                    backdropFilter: 'blur(20px)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    borderRadius: '16px',
                    padding: '1.5rem',
                    transition: 'all 0.3s ease',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.border = '1px solid rgba(37, 99, 235, 0.3)';
                    e.currentTarget.style.transform = 'translateY(-4px)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.border = '1px solid rgba(255, 255, 255, 0.1)';
                    e.currentTarget.style.transform = 'translateY(0)';
                  }}
                >
                  <div className="flex items-start space-x-4">
                    <div
                      style={{
                        width: '48px',
                        height: '48px',
                        background: 'linear-gradient(135deg, #2563eb, #3b82f6)',
                        borderRadius: '12px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                      }}
                    >
                      <info.icon size={24} style={{ color: '#ffffff' }} />
                    </div>
                    <div>
                      <h3
                        style={{
                          fontWeight: 600,
                          color: '#ffffff',
                          marginBottom: '0.5rem',
                          fontSize: '1.125rem',
                        }}
                      >
                        {info.title}
                      </h3>
                      {info.details.map((detail, idx) => (
                        <p
                          key={idx}
                          style={{
                            color: 'rgba(255, 255, 255, 0.85)',
                            fontSize: '0.95rem',
                          }}
                        >
                          {info.action ? (
                            <a
                              href={info.action}
                              style={{
                                color: 'rgba(255, 255, 255, 0.85)',
                                textDecoration: 'none',
                                transition: 'color 0.3s ease',
                              }}
                              onMouseEnter={(e) => {
                                e.currentTarget.style.color = '#3b82f6';
                              }}
                              onMouseLeave={(e) => {
                                e.currentTarget.style.color = 'rgba(255, 255, 255, 0.85)';
                              }}
                            >
                              {detail}
                            </a>
                          ) : (
                            detail
                          )}
                        </p>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* WhatsApp Quick Contact */}
            <div
              style={{
                background: 'linear-gradient(135deg, #10b981, #059669)',
                borderRadius: '16px',
                padding: '1.5rem',
                color: '#ffffff',
                boxShadow: '0 8px 24px rgba(16, 185, 129, 0.3)',
                marginBottom: '2rem',
              }}
            >
              <div className="flex items-center space-x-3 mb-3">
                <MessageCircle size={28} />
                <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold' }}>
                  Quick Contact via WhatsApp
                </h3>
              </div>
              <p style={{ marginBottom: '1rem', opacity: 0.95 }}>
                Get instant responses to your questions. Chat with us on WhatsApp now!
              </p>
              <button
                onClick={handleWhatsAppClick}
                style={{
                  background: '#ffffff',
                  color: '#059669',
                  padding: '0.75rem 1.5rem',
                  borderRadius: '12px',
                  fontWeight: 600,
                  border: 'none',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  width: '100%',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = '#f0fdf4';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = '#ffffff';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                Start WhatsApp Chat
              </button>
            </div>

            {/* Rating */}
            <div
              style={{
                background: 'rgba(255, 255, 255, 0.08)',
                backdropFilter: 'blur(20px)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: '16px',
                padding: '1.5rem',
              }}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p
                    style={{
                      fontSize: '0.875rem',
                      color: 'rgba(255, 255, 255, 0.7)',
                      marginBottom: '0.25rem',
                    }}
                  >
                    Google Rating
                  </p>
                  <div className="flex items-center space-x-2">
                    <span
                      style={{
                        fontSize: '2rem',
                        fontWeight: 'bold',
                        color: '#ffffff',
                      }}
                    >
                      4.0
                    </span>
                    <span style={{ fontSize: '1.5rem' }}>⭐⭐⭐⭐</span>
                  </div>
                  <p
                    style={{
                      fontSize: '0.875rem',
                      color: 'rgba(255, 255, 255, 0.7)',
                      marginTop: '0.25rem',
                    }}
                  >
                    Based on 400+ reviews
                  </p>
                </div>
                <a
                  href="https://maps.app.goo.gl/h8TjWypRjA7kG8bg8"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    color: '#3b82f6',
                    fontWeight: 600,
                    fontSize: '0.875rem',
                    textDecoration: 'none',
                    transition: 'color 0.3s ease',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = '#60a5fa';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = '#3b82f6';
                  }}
                >
                  View on Google Maps →
                </a>
              </div>
            </div>
          </div>

          {/* Map Section */}
          <div>
            <div
              style={{
                background: 'rgba(255, 255, 255, 0.08)',
                backdropFilter: 'blur(20px)',
                border: '1px solid rgba(37, 99, 235, 0.2)',
                borderRadius: '16px',
                overflow: 'hidden',
                height: '100%',
                minHeight: '500px',
                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
              }}
            >
              {/* Google Maps Embed - Bin Ali Hotel & Restaurant, Eastleigh */}
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3988.817644974!2d36.847878!3d-1.2755184!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x182f16b4246e261d%3A0xb01368ac3008de6!2sBin%20Ali%20Hotel%20%26%20Restaurant!5e0!3m2!1sen!2ske!4v1732113600000!5m2!1sen!2ske"
                width="100%"
                height="100%"
                style={{ border: 0, minHeight: '500px' }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Bin Ali Hotel & Restaurant - Eighth St, Eastleigh, Nairobi"
              />
            </div>
            <p
              style={{
                fontSize: '0.875rem',
                color: 'rgba(255, 255, 255, 0.7)',
                marginTop: '1rem',
                textAlign: 'center',
              }}
            >
              Located in the heart of Eastleigh, easily accessible from all major routes
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
