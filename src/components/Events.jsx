import { Heart, Users, Utensils, Music, Camera, Sparkles } from 'lucide-react';

const Events = ({ onBookEvent }) => {
  const eventFeatures = [
    {
      icon: Heart,
      title: 'Wedding Ceremonies',
      description: 'Specialized in hosting beautiful Somali weddings with culturally appropriate settings and services.'
    },
    {
      icon: Users,
      title: 'Large Capacity',
      description: 'Spacious event halls that can accommodate your guests comfortably.'
    },
    {
      icon: Utensils,
      title: 'Catering Services',
      description: 'Delicious halal cuisine prepared by our experienced culinary team.'
    },
    {
      icon: Music,
      title: 'Audio & Visual',
      description: 'Modern sound systems and equipment for your entertainment needs.'
    },
    {
      icon: Camera,
      title: 'Photography Ready',
      description: 'Beautiful backdrops and well-lit spaces perfect for capturing memories.'
    },
    {
      icon: Sparkles,
      title: 'Event Planning',
      description: 'Our team assists with planning and coordination to make your event seamless.'
    }
  ];

  const scrollToBooking = () => {
    const element = document.getElementById('booking');
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section id="events" className="section-padding bg-gradient-to-br from-primary-50 to-white">
      <div className="container-custom">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Events & Celebrations
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Host your special occasions at Bin Ali Hotel. We specialize in Somali weddings and provide a perfect venue for all your celebratory events.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-12">
          {/* Image Gallery */}
          <div className="grid grid-cols-2 gap-4">
            {/* TODO: Replace with actual event photos from Google Maps */}
            <div className="rounded-lg overflow-hidden shadow-lg">
              <img
                src="https://images.unsplash.com/photo-1519167758481-83f29da8c8b0?auto=format&fit=crop&w=600&q=80"
                alt="Wedding Event 1"
                className="w-full h-64 object-cover hover:scale-110 transition-transform duration-500"
                loading="lazy"
              />
            </div>
            <div className="rounded-lg overflow-hidden shadow-lg mt-8">
              <img
                src="https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?auto=format&fit=crop&w=600&q=80"
                alt="Wedding Event 2"
                className="w-full h-64 object-cover hover:scale-110 transition-transform duration-500"
                loading="lazy"
              />
            </div>
            <div className="rounded-lg overflow-hidden shadow-lg -mt-8">
              <img
                src="https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=600&q=80"
                alt="Event Setup"
                className="w-full h-64 object-cover hover:scale-110 transition-transform duration-500"
                loading="lazy"
              />
            </div>
            <div className="rounded-lg overflow-hidden shadow-lg">
              <img
                src="https://images.unsplash.com/photo-1478146896981-b80fe463b330?auto=format&fit=crop&w=600&q=80"
                alt="Dining Setup"
                className="w-full h-64 object-cover hover:scale-110 transition-transform duration-500"
                loading="lazy"
              />
            </div>
          </div>

          {/* Features List */}
          <div>
            <h3 className="text-3xl font-bold text-gray-900 mb-6">
              Why Choose Us for Your Event
            </h3>
            <div className="space-y-6">
              {eventFeatures.map((feature, index) => (
                <div key={index} className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-primary-600 rounded-lg flex items-center justify-center">
                      <feature.icon size={24} className="text-white" />
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1 text-lg">
                      {feature.title}
                    </h4>
                    <p className="text-gray-600">
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-primary-600 rounded-2xl p-8 md:p-12 text-center text-white shadow-xl">
          <h3 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Plan Your Event?
          </h3>
          <p className="text-lg mb-8 max-w-2xl mx-auto text-white/90">
            Contact us today to discuss your event requirements and let us help you create an unforgettable celebration.
          </p>
          <button
            onClick={scrollToBooking}
            className="bg-white text-primary-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors shadow-lg"
          >
            Book Your Event
          </button>
        </div>
      </div>
    </section>
  );
};

export default Events;
