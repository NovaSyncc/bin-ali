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
    <section id="contact" className="section-padding bg-gray-50">
      <div className="container-custom">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Get In Touch
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Have questions or ready to book? Contact us today and our friendly team will be happy to assist you.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div>
            <div className="space-y-6 mb-8">
              {contactInfo.map((info, index) => (
                <div key={index} className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-primary-600 rounded-lg flex items-center justify-center">
                      <info.icon size={24} className="text-white" />
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2 text-lg">
                      {info.title}
                    </h3>
                    {info.details.map((detail, idx) => (
                      <p key={idx} className="text-gray-600">
                        {info.action ? (
                          <a
                            href={info.action}
                            className="hover:text-primary-600 transition-colors"
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
              ))}
            </div>

            {/* WhatsApp Quick Contact */}
            <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-lg p-6 text-white shadow-lg">
              <div className="flex items-center space-x-3 mb-3">
                <MessageCircle size={28} />
                <h3 className="text-xl font-bold">Quick Contact via WhatsApp</h3>
              </div>
              <p className="mb-4 text-white/90">
                Get instant responses to your questions. Chat with us on WhatsApp now!
              </p>
              <button
                onClick={handleWhatsAppClick}
                className="bg-white text-green-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors w-full sm:w-auto"
              >
                Start WhatsApp Chat
              </button>
            </div>

            {/* Rating */}
            <div className="mt-8 bg-white rounded-lg p-6 shadow-md">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Google Rating</p>
                  <div className="flex items-center space-x-2">
                    <span className="text-3xl font-bold text-gray-900">4.0</span>
                    <span className="text-yellow-400 text-2xl">⭐⭐⭐⭐</span>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">Based on 400+ reviews</p>
                </div>
                <a
                  href="https://maps.google.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary-600 hover:text-primary-700 font-semibold text-sm"
                >
                  View on Google Maps →
                </a>
              </div>
            </div>
          </div>

          {/* Map Section */}
          <div>
            <div className="bg-white rounded-lg shadow-lg overflow-hidden h-full min-h-[500px]">
              {/* TODO: Replace with actual Google Maps embed for Eighth St, Nairobi, Eastleigh */}
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3988.8176449742574!2d36.8373!3d-1.2833!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMcKwMTYnNTkuOSJTIDM2wrA1MCcxNC4zIkU!5e0!3m2!1sen!2ske!4v1234567890"
                width="100%"
                height="100%"
                style={{ border: 0, minHeight: '500px' }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Bin Ali Hotel Location"
              />
            </div>
            <p className="text-sm text-gray-600 mt-4 text-center">
              Located in the heart of Eastleigh, easily accessible from all major routes
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
