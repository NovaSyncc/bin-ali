import { Utensils, Clock, Coffee, Users } from 'lucide-react';

const Restaurant = () => {
  const services = [
    {
      icon: Utensils,
      title: 'Halal Cuisine',
      description: 'Authentic Somali and international dishes prepared with the finest halal ingredients.'
    },
    {
      icon: Coffee,
      title: 'All Day Dining',
      description: 'Breakfast, lunch, and dinner served fresh throughout the day.'
    },
    {
      icon: Users,
      title: 'Room Service',
      description: 'Enjoy our delicious meals in the comfort of your room.'
    },
    {
      icon: Clock,
      title: 'Flexible Hours',
      description: 'Open from early morning to late evening for your convenience.'
    }
  ];

  return (
    <section id="restaurant" className="section-padding bg-white">
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Content Section */}
          <div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              On-Site Restaurant
            </h2>
            <p className="text-lg text-gray-600 mb-6 leading-relaxed">
              Indulge in a culinary journey at our on-site restaurant. We serve a variety of delicious Somali and international dishes, all prepared with authentic halal ingredients.
            </p>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              Whether you're starting your day with a hearty breakfast, enjoying a business lunch, or savoring a family dinner, our restaurant offers a welcoming atmosphere and exceptional service.
            </p>

            {/* Services Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {services.map((service, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
                      <service.icon size={24} className="text-primary-600" />
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">
                      {service.title}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {service.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Operating Hours - TODO: Confirm with client */}
            <div className="mt-8 p-6 bg-primary-50 rounded-lg">
              <h4 className="font-semibold text-gray-900 mb-3">Operating Hours</h4>
              <div className="space-y-2 text-gray-700">
                <p><span className="font-medium">Breakfast:</span> 6:00 AM - 10:30 AM</p>
                <p><span className="font-medium">Lunch:</span> 12:00 PM - 3:00 PM</p>
                <p><span className="font-medium">Dinner:</span> 6:00 PM - 10:00 PM</p>
              </div>
              <p className="text-sm text-gray-600 mt-3 italic">
                * Hours subject to change. Contact us for current timings.
              </p>
            </div>
          </div>

          {/* Image Section */}
          <div className="relative">
            <div className="grid grid-cols-2 gap-4">
              {/* TODO: Replace with actual restaurant photos from Google Maps */}
              <div className="rounded-lg overflow-hidden shadow-lg">
                <img
                  src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=600&q=80"
                  alt="Restaurant Dining Area"
                  className="w-full h-64 object-cover hover:scale-110 transition-transform duration-500"
                  loading="lazy"
                />
              </div>
              <div className="rounded-lg overflow-hidden shadow-lg mt-8">
                <img
                  src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=600&q=80"
                  alt="Restaurant Food"
                  className="w-full h-64 object-cover hover:scale-110 transition-transform duration-500"
                  loading="lazy"
                />
              </div>
              <div className="rounded-lg overflow-hidden shadow-lg -mt-8">
                <img
                  src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=600&q=80"
                  alt="Restaurant Interior"
                  className="w-full h-64 object-cover hover:scale-110 transition-transform duration-500"
                  loading="lazy"
                />
              </div>
              <div className="rounded-lg overflow-hidden shadow-lg">
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
      </div>
    </section>
  );
};

export default Restaurant;
