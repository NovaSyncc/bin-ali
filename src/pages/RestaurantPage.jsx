import { Utensils, Clock, Coffee, Users, ChefHat, Leaf } from 'lucide-react';
import PageTransition from '../components/shared/PageTransition';
import GlassCard from '../components/shared/GlassCard';
import receptionImage from '../assets/images/cover/reception.jpg';

const RestaurantPage = () => {
  const services = [
    {
      icon: ChefHat,
      title: 'Authentic Cuisine',
      description: 'Traditional Somali dishes prepared by expert chefs using family recipes passed down through generations.'
    },
    {
      icon: Leaf,
      title: '100% Halal',
      description: 'All our ingredients are certified halal, prepared according to Islamic dietary guidelines.'
    },
    {
      icon: Coffee,
      title: 'All Day Dining',
      description: 'Fresh breakfast, lunch, and dinner served throughout the day in a welcoming atmosphere.'
    },
    {
      icon: Users,
      title: 'Room Service',
      description: 'Enjoy our delicious meals delivered directly to your room at your convenience.'
    },
    {
      icon: Utensils,
      title: 'International Menu',
      description: 'Beyond Somali specialties, we offer a selection of international favorites.'
    },
    {
      icon: Clock,
      title: 'Flexible Hours',
      description: 'Extended operating hours to accommodate your schedule, from early morning to late evening.'
    }
  ];

  const highlights = [
    'Sambusa - Crispy pastries filled with spiced meat or vegetables',
    'Suqaar - Tender diced meat with aromatic spices',
    'Bariis Iskukaris - Fragrant Somali rice with meat',
    'Muufo - Traditional Somali flatbread',
    'Hilib Ari - Grilled lamb with traditional seasonings',
    'Fresh Juices - Made daily from seasonal fruits'
  ];

  const restaurantImages = [
    'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&w=800&q=80'
  ];

  return (
    <PageTransition>
      {/* Hero Section */}
      <section className="relative h-[70vh] flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-fixed"
          style={{
            backgroundImage: `url(${receptionImage})`
          }}
        />
        <div className="absolute inset-0 hero-overlay" />

        <div className="relative z-10 text-center text-white px-4 animate-fade-in">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 animate-slide-up">
            Savor Authentic Flavors
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto font-light" style={{ animationDelay: '0.2s' }}>
            Experience the rich culinary heritage of Somalia
          </p>
        </div>
      </section>

      {/* Main Content Section */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
            {/* Content Section */}
            <div className="scroll-fade-in">
              <h2 className="text-4xl md:text-5xl font-bold text-primary-dark-green mb-6">
                On-Site Restaurant
              </h2>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                Embark on a culinary journey at our on-site restaurant, where traditional Somali hospitality meets exceptional cuisine. Our skilled chefs prepare each dish with care, using only the finest halal ingredients to ensure authenticity and quality.
              </p>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                Whether you're starting your day with a hearty breakfast, enjoying a leisurely lunch, or gathering with family for dinner, our restaurant provides a warm, inviting atmosphere perfect for any occasion.
              </p>

              {/* Operating Hours */}
              <GlassCard className="bg-primary-green/5 border-accent-gold/30">
                <h4 className="font-bold text-xl text-primary-dark-green mb-4">Operating Hours</h4>
                <div className="space-y-3 text-gray-700">
                  <div className="flex justify-between items-center">
                    <span className="font-semibold">Breakfast:</span>
                    <span>6:00 AM - 10:30 AM</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-semibold">Lunch:</span>
                    <span>12:00 PM - 3:00 PM</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-semibold">Dinner:</span>
                    <span>6:00 PM - 10:00 PM</span>
                  </div>
                </div>
                <p className="text-sm text-gray-600 mt-4 italic">
                  * Hours subject to change. Contact us for reservations.
                </p>
              </GlassCard>
            </div>

            {/* Image Grid Section */}
            <div className="relative scroll-fade-in">
              <div className="grid grid-cols-2 gap-4">
                <div className="rounded-3xl overflow-hidden shadow-lg">
                  <img
                    src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=600&q=80"
                    alt="Restaurant Dining Area"
                    className="w-full h-64 object-cover hover:scale-110 transition-transform duration-500"
                    loading="lazy"
                  />
                </div>
                <div className="rounded-3xl overflow-hidden shadow-lg mt-8">
                  <img
                    src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=600&q=80"
                    alt="Restaurant Food"
                    className="w-full h-64 object-cover hover:scale-110 transition-transform duration-500"
                    loading="lazy"
                  />
                </div>
                <div className="rounded-3xl overflow-hidden shadow-lg -mt-8">
                  <img
                    src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=600&q=80"
                    alt="Restaurant Interior"
                    className="w-full h-64 object-cover hover:scale-110 transition-transform duration-500"
                    loading="lazy"
                  />
                </div>
                <div className="rounded-3xl overflow-hidden shadow-lg">
                  <img
                    src="https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&w=600&q=80"
                    alt="Traditional Cuisine"
                    className="w-full h-64 object-cover hover:scale-110 transition-transform duration-500"
                    loading="lazy"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Services Grid */}
          <div className="mb-20">
            <div className="text-center mb-12 scroll-fade-in">
              <h2 className="text-4xl md:text-5xl font-bold text-primary-dark-green mb-4">
                Dining Experience
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Every detail designed for your comfort and enjoyment
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.map((service, index) => (
                <GlassCard
                  key={index}
                  className="bg-cream-100/60 p-6 scroll-fade-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="flex flex-col items-center text-center">
                    <div className="w-16 h-16 gold-gradient-bg rounded-2xl flex items-center justify-center mb-4 float-animation">
                      <service.icon size={28} className="text-primary-dark-green" />
                    </div>
                    <h3 className="text-xl font-bold text-primary-dark-green mb-3">
                      {service.title}
                    </h3>
                    <p className="text-gray-600 text-sm">
                      {service.description}
                    </p>
                  </div>
                </GlassCard>
              ))}
            </div>
          </div>

          {/* Menu Highlights */}
          <div className="scroll-fade-in">
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-bold text-primary-dark-green mb-4">
                Signature Dishes
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                A taste of our most beloved specialties
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {highlights.map((item, index) => (
                <div
                  key={index}
                  className="premium-card p-6 text-center scroll-fade-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <p className="text-lg font-sans font-semibold text-primary-dark-green">
                    {item}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding gold-gradient-bg">
        <div className="container-custom text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-primary-dark-green mb-6">
            Reserve Your Table
          </h2>
          <p className="text-xl text-gray-700 mb-8 max-w-2xl mx-auto">
            Join us for an unforgettable dining experience
          </p>
          <a
            href="https://wa.me/254745386007?text=I%20would%20like%20to%20reserve%20a%20table%20at%20Bin%20Ali%20Hotel%20Restaurant"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block"
          >
            <button className="cta-outline border-primary-dark-green text-primary-dark-green hover:bg-primary-dark-green hover:text-accent-gold">
              Contact Us on WhatsApp
            </button>
          </a>
        </div>
      </section>
    </PageTransition>
  );
};

export default RestaurantPage;
