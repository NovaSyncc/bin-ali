import { MapPin, Star, Coffee, Wifi, Car, Shield, Award, Heart, Users as UsersIcon } from 'lucide-react';
import PageTransition from '../components/shared/PageTransition';
import GlassCard from '../components/shared/GlassCard';
import receptionImage from '../assets/images/cover/reception.jpg';

const AboutPage = () => {
  const features = [
    {
      icon: MapPin,
      title: 'Prime Location',
      description: 'Located in the heart of Eastleigh on Eighth Street, easily accessible from all major routes in Nairobi.'
    },
    {
      icon: Star,
      title: '4.0 Star Rated',
      description: 'Highly rated by over 400 guests for our exceptional service and comfortable accommodations.'
    },
    {
      icon: Coffee,
      title: 'On-site Restaurant',
      description: 'Enjoy delicious meals at our restaurant serving authentic Somali and international cuisine.'
    },
    {
      icon: Wifi,
      title: 'Free WiFi',
      description: 'Stay connected with complimentary high-speed internet throughout the property.'
    },
    {
      icon: Car,
      title: 'Secure Parking',
      description: 'Safe and convenient parking facilities for all our guests.'
    },
    {
      icon: Shield,
      title: '24/7 Security',
      description: 'Round-the-clock security to ensure your safety and peace of mind.'
    }
  ];

  const values = [
    {
      icon: Heart,
      title: 'Hospitality First',
      description: 'We treat every guest like family, ensuring a warm and welcoming experience from check-in to check-out.'
    },
    {
      icon: Award,
      title: 'Quality Service',
      description: 'We maintain good standards in cleanliness, service, and comfort across all our facilities.'
    },
    {
      icon: UsersIcon,
      title: 'Community',
      description: 'As a proud part of the Eastleigh community, we celebrate and serve the diverse cultures of Nairobi.'
    }
  ];

  return (
    <PageTransition>
      {/* Hero Section */}
      <section className="relative h-[70vh] flex items-center justify-center overflow-hidden">
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
        <div className="relative z-10 text-center text-white px-4 animate-fade-in">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 animate-slide-up">
            About Us
          </h1>
          <p className="text-lg md:text-xl mb-8 max-w-3xl mx-auto" style={{ animationDelay: '0.2s' }}>
            Serving Eastleigh since 2015
          </p>
        </div>
      </section>

      {/* History Section */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Image Section */}
            <div className="relative scroll-fade-in">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                <img
                  src={receptionImage}
                  alt="Bin Ali Hotel Interior"
                  className="w-full h-[500px] object-cover"
                  loading="lazy"
                />
                {/* Overlay Badge */}
                <div className="absolute bottom-6 left-6 glass-effect bg-white/95 rounded-2xl p-6 shadow-lg">
                  <p className="text-4xl font-bold text-accent-gold">2015</p>
                  <p className="text-sm text-gray-700 font-semibold">Founded</p>
                </div>
                <div className="absolute top-6 right-6 glass-effect bg-white/95 rounded-2xl p-6 shadow-lg">
                  <p className="text-4xl font-bold text-primary-green">400+</p>
                  <p className="text-sm text-gray-700 font-semibold">Happy Guests</p>
                </div>
              </div>
            </div>

            {/* Content Section */}
            <div className="scroll-fade-in">
              <h2 className="text-4xl md:text-5xl font-bold text-primary-dark-green mb-6">
                Bin Ali Hotel
              </h2>
              <div className="space-y-4 text-lg text-gray-600 leading-relaxed">
                <p>
                  <span className="font-semibold text-primary-green">Founded in 2015</span>, Bin Ali Hotel has been a cornerstone of hospitality in Eastleigh, Nairobi. From our humble beginnings, we set out with a clear mission: to provide exceptional comfort, authentic service, and a welcoming atmosphere for every guest.
                </p>
                <p>
                  Over the past decade, we have grown to become one of Eastleigh's premier destinations for accommodation, events, and dining. Our success is built on the trust and satisfaction of the hundreds of guests who have made Bin Ali Hotel their home away from home.
                </p>
                <p>
                  Whether you're visiting for business, leisure, or celebrating life's special moments, we combine modern amenities with traditional Somali hospitality to create an unforgettable experience. Our dedicated team takes pride in ensuring every detail of your stay exceeds expectations.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid Section */}
      <section className="section-padding bg-cream-100">
        <div className="container-custom">
          <div className="text-center mb-16 scroll-fade-in">
            <h2 className="text-4xl md:text-5xl font-bold text-primary-dark-green mb-4">
              Why Choose Us
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Experience the perfect blend of comfort, convenience, and exceptional service
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <GlassCard
                key={index}
                className="bg-white/60 p-8 scroll-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex flex-col items-center text-center">
                  <div className="w-16 h-16 gold-gradient-bg rounded-2xl flex items-center justify-center mb-4 float-animation">
                    <feature.icon size={28} className="text-primary-dark-green" />
                  </div>
                  <h3 className="text-xl font-bold text-primary-dark-green mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600">
                    {feature.description}
                  </p>
                </div>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="text-center mb-16 scroll-fade-in">
            <h2 className="text-4xl md:text-5xl font-bold text-primary-dark-green mb-4">
              Our Values
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              The principles that guide everything we do
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <div
                key={index}
                className="premium-card p-8 text-center scroll-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="w-20 h-20 gold-gradient-bg rounded-full flex items-center justify-center mx-auto mb-6">
                  <value.icon size={32} className="text-primary-dark-green" />
                </div>
                <h3 className="text-2xl font-bold text-primary-dark-green mb-4">
                  {value.title}
                </h3>
                <p className="text-gray-600">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding gold-gradient-bg">
        <div className="container-custom text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-primary-dark-green mb-6">
            Experience the Bin Ali Difference
          </h2>
          <p className="text-xl text-gray-700 mb-8 max-w-2xl mx-auto">
            Join the hundreds of satisfied guests who have made us their preferred choice in Eastleigh
          </p>
          <button className="cta-outline border-primary-dark-green text-primary-dark-green hover:bg-primary-dark-green hover:text-accent-gold">
            Book Your Stay Today
          </button>
        </div>
      </section>
    </PageTransition>
  );
};

export default AboutPage;
