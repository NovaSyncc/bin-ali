import { Utensils, Clock, Coffee, Users, ChefHat, Leaf } from 'lucide-react';
import PageTransition from '../components/shared/PageTransition';
import GlassCard from '../components/shared/GlassCard';
import PageHeader from '../components/shared/PageHeader';
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

  const handleReserveTable = () => {
    const whatsappNumber = '254745386007';
    const message = encodeURIComponent('I would like to reserve a table at Bin Ali Hotel Restaurant');
    window.open(`https://wa.me/${whatsappNumber}?text=${message}`, '_blank');
  };

  return (
    <PageTransition>
      <PageHeader
        title="Savor Authentic Flavors"
        subtitle="Experience the rich culinary heritage of Somalia at our on-site restaurant"
        backgroundImage={receptionImage}
      />

      {/* Main Content Section */}
      <section className="bg-gradient-to-br from-navy-deepest via-midnight-blue to-navy-deepest py-24">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
            {/* Content Section */}
            <div>
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 font-playfair">
                On-Site Restaurant
              </h2>
              <p className="text-lg text-soft-white/80 mb-6 leading-relaxed">
                Embark on a culinary journey at our on-site restaurant, where traditional Somali hospitality meets exceptional cuisine. Our skilled chefs prepare each dish with care, using only the finest halal ingredients to ensure authenticity and quality.
              </p>
              <p className="text-lg text-soft-white/80 mb-8 leading-relaxed">
                Whether you're starting your day with a hearty breakfast, enjoying a leisurely lunch, or gathering with family for dinner, our restaurant provides a warm, inviting atmosphere perfect for any occasion.
              </p>

              {/* Operating Hours */}
              <GlassCard className="p-6">
                <h4 className="font-bold text-xl text-white mb-4 font-playfair">Operating Hours</h4>
                <div className="space-y-3 text-soft-white/80">
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
                <p className="text-sm text-soft-white/60 mt-4 italic">
                  * Hours subject to change. Contact us for reservations.
                </p>
              </GlassCard>
            </div>

            {/* Image Grid Section */}
            <div className="relative">
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
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 font-playfair">
                Dining Experience
              </h2>
              <p className="text-lg text-soft-white/80 max-w-2xl mx-auto">
                Every detail designed for your comfort and enjoyment
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.map((service, index) => (
                <GlassCard key={index} className="p-6">
                  <div className="flex flex-col items-center text-center">
                    <div className="w-16 h-16 bg-gradient-to-br from-gold-premium to-gold-warm rounded-2xl flex items-center justify-center mb-4">
                      <service.icon size={28} className="text-navy-deepest" />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-3">
                      {service.title}
                    </h3>
                    <p className="text-soft-white/80 text-sm">
                      {service.description}
                    </p>
                  </div>
                </GlassCard>
              ))}
            </div>
          </div>

          {/* Menu Highlights */}
          <div>
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 font-playfair">
                Signature Dishes
              </h2>
              <p className="text-lg text-soft-white/80 max-w-2xl mx-auto">
                A taste of our most beloved specialties
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {highlights.map((item, index) => (
                <GlassCard key={index} className="p-6 text-center">
                  <p className="text-lg font-semibold text-white">
                    {item}
                  </p>
                </GlassCard>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-br from-royal-blue via-midnight-blue to-royal-blue py-24">
        <div className="container-custom text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 font-playfair">
            Reserve Your Table
          </h2>
          <p className="text-xl text-soft-white/90 mb-8 max-w-2xl mx-auto">
            Join us for an unforgettable dining experience
          </p>
          <button
            onClick={handleReserveTable}
            className="btn-glass"
          >
            Contact Us on WhatsApp
          </button>
        </div>
      </section>
    </PageTransition>
  );
};

export default RestaurantPage;
