import { MapPin, Star, Users, Wifi, Car, Shield } from 'lucide-react';
import receptionImage from '../assets/images/cover/reception.jpg';

const About = () => {
  const features = [
    {
      icon: MapPin,
      title: 'Prime Location',
      description: 'Located in the heart of Eastleigh on Eighth Street, easily accessible from all major routes.'
    },
    {
      icon: Star,
      title: '4.0 Star Rated',
      description: 'Rated by over 400 guests for our friendly service and comfortable rooms.'
    },
    {
      icon: Users,
      title: 'Event Venue',
      description: 'Host your weddings and special events in our spacious venue.'
    },
    {
      icon: Wifi,
      title: 'Free WiFi',
      description: 'Stay connected with complimentary high-speed internet throughout the property.'
    },
    {
      icon: Car,
      title: 'Parking Available',
      description: 'Secure parking facilities for all our guests.'
    },
    {
      icon: Shield,
      title: '24/7 Security',
      description: 'Round-the-clock security to ensure your safety and peace of mind.'
    }
  ];

  return (
    <section id="about" className="section-padding bg-white">
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Image Section */}
          <div className="relative">
            <div className="relative rounded-lg overflow-hidden shadow-lg">
              <img
                src={receptionImage}
                alt="Bin Ali Hotel Reception"
                className="w-full h-[500px] object-cover"
                loading="lazy"
              />
              {/* Overlay Badge */}
              <div className="absolute bottom-6 left-6 bg-white/95 backdrop-blur-sm rounded-lg p-4 shadow-lg">
                <p className="text-3xl font-bold text-primary-600">400+</p>
                <p className="text-sm text-gray-600">Happy Guests</p>
              </div>
            </div>
          </div>

          {/* Content Section */}
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              About Bin Ali Hotel
            </h2>
            <p className="text-base text-gray-600 mb-6 leading-relaxed">
              Welcome to Bin Ali Hotel, a friendly and comfortable place to stay in Eastleigh, Nairobi. We offer clean, cozy rooms and warm hospitality.
            </p>
            <p className="text-base text-gray-600 mb-8 leading-relaxed">
              Whether you're here for business, visiting family, or attending a special event, our small hotel provides a welcoming atmosphere. Our team is here to help make your stay pleasant and comfortable.
            </p>

            {/* Features Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {features.map((feature, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center">
                      <feature.icon size={20} className="text-primary-600" />
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">
                      {feature.title}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
