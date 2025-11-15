import { Wifi, Wind, Droplet, Tv, Refrigerator, BellRing, Laptop, Bed, Armchair, Users, ChefHat } from 'lucide-react';
import { rooms } from '../data/rooms';

const Rooms = ({ onBookNow }) => {
  // Icon mapping for amenities
  const getAmenityIcon = (amenity) => {
    const icons = {
      'WiFi': Wifi,
      'AC': Wind,
      'Hot Water': Droplet,
      'TV': Tv,
      'Mini Fridge': Refrigerator,
      'Room Service': BellRing,
      'Work Desk': Laptop,
      'Kitchenette': ChefHat,
      'Seating Area': Armchair
    };
    const IconComponent = icons[amenity] || BellRing;
    return <IconComponent size={18} className="text-primary-600" />;
  };

  return (
    <section id="rooms" className="section-padding bg-gray-50">
      <div className="container-custom">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Our Rooms
          </h2>
          <p className="text-base text-gray-600 max-w-2xl mx-auto">
            Simple, comfortable rooms at affordable prices for your stay in Eastleigh.
          </p>
        </div>

        {/* Rooms Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {rooms.map((room) => (
            <div
              key={room.id}
              className="card overflow-hidden group transition-all duration-200"
            >
              {/* Room Image */}
              <div className="relative h-64 overflow-hidden bg-gray-200">
                <img
                  src={room.image}
                  alt={room.type}
                  className="w-full h-full object-cover transition-transform duration-300"
                  loading="lazy"
                />
                {/* Capacity Badge */}
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 flex items-center space-x-1">
                  <Users size={16} className="text-primary-600" />
                  <span className="text-sm font-semibold">{room.capacity} Guest{room.capacity > 1 ? 's' : ''}</span>
                </div>
              </div>

              {/* Room Details */}
              <div className="p-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  {room.type}
                </h3>
                <p className="text-gray-600 mb-4">
                  {room.description}
                </p>

                {/* Amenities */}
                <div className="mb-4">
                  <p className="text-sm font-semibold text-gray-700 mb-2">Amenities:</p>
                  <div className="flex flex-wrap gap-2">
                    {room.amenities.map((amenity) => (
                      <div
                        key={amenity}
                        className="flex items-center space-x-1 bg-primary-50 px-3 py-1 rounded-full"
                        title={amenity}
                      >
                        {getAmenityIcon(amenity)}
                        <span className="text-xs text-gray-700">{amenity}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Price and Book Button */}
                <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                  <div>
                    <p className="text-sm text-gray-600">Starting from</p>
                    <p className="text-2xl font-bold text-primary-600">
                      KES {room.price.toLocaleString()}
                      <span className="text-sm text-gray-600 font-normal">/night</span>
                    </p>
                  </div>
                  <button
                    onClick={() => onBookNow && onBookNow(room)}
                    className="btn-primary"
                  >
                    Book Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Note for Client */}
        <div className="mt-12 text-center">
          <p className="text-sm text-gray-500 italic">
            * Prices are indicative and subject to availability. Contact us for current rates and special offers.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Rooms;
