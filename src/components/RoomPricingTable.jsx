import { Link } from 'react-router-dom';
import { Phone, MessageCircle, Wifi, Wind, Droplet, Tv, Refrigerator } from 'lucide-react';
import { rooms } from '../data/rooms';

const amenityIcons = {
  WiFi: <Wifi size={13} />,
  AC: <Wind size={13} />,
  'Hot Water': <Droplet size={13} />,
  TV: <Tv size={13} />,
  'Mini Fridge': <Refrigerator size={13} />,
};

const RECEPTION_PHONE = import.meta.env.VITE_HOTEL_PHONE || '0745386007';
const WHATSAPP_NUMBER = import.meta.env.VITE_WHATSAPP_NUMBER || '254745386007';

const RoomPricingTable = ({ onBookNow }) => {
  const handleWhatsApp = (roomType) => {
    const msg = encodeURIComponent(
      `Hello Bin Ali Hotel, I'd like to book a ${roomType}. Please assist me.`
    );
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${msg}`, '_blank');
  };

  return (
    <section className="bg-gradient-to-br from-navy-deepest via-midnight-blue to-navy-deepest py-20">
      <div className="container-custom px-4">
        {/* Heading */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold mb-4">
            Room Rates
          </h2>
          <p className="text-soft-white/75 max-w-2xl mx-auto">
            Simple, transparent pricing — no hidden fees. All rates are per night in KES.
          </p>
        </div>

        {/* Table — desktop */}
        <div className="hidden md:block overflow-x-auto rounded-2xl border border-white/10 shadow-2xl">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-white/5 border-b border-white/10 text-gold-premium uppercase tracking-wide text-xs">
                <th className="text-left py-4 px-6 font-semibold">Room Type</th>
                <th className="text-center py-4 px-4 font-semibold">Guests</th>
                <th className="text-left py-4 px-4 font-semibold">Amenities</th>
                <th className="text-right py-4 px-6 font-semibold">Price / Night</th>
                <th className="text-center py-4 px-6 font-semibold">Book</th>
              </tr>
            </thead>
            <tbody>
              {rooms.map((room, idx) => (
                <tr
                  key={room.id}
                  className={`border-b border-white/5 transition-colors duration-200 hover:bg-white/5 ${
                    idx % 2 === 0 ? 'bg-white/[0.02]' : 'bg-transparent'
                  }`}
                >
                  <td className="py-4 px-6 font-semibold text-white">{room.type}</td>
                  <td className="py-4 px-4 text-center text-soft-white/70">
                    {room.capacity === 1 ? '1 guest' : `Up to ${room.capacity}`}
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex flex-wrap gap-1.5">
                      {room.amenities.map((a) => (
                        <span
                          key={a}
                          className="inline-flex items-center gap-1 bg-white/10 text-soft-white/80 text-xs px-2 py-0.5 rounded-full"
                        >
                          {amenityIcons[a] ?? null}
                          {a}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="py-4 px-6 text-right">
                    <span className="text-gold-premium font-bold text-lg">
                      KES {room.price.toLocaleString()}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-center">
                    <div className="flex items-center justify-center gap-2">
                      <button
                        onClick={() => onBookNow && onBookNow(room)}
                        className="btn-gold py-1.5 px-4 text-xs rounded-lg"
                      >
                        Book
                      </button>
                      <button
                        onClick={() => handleWhatsApp(room.type)}
                        title="WhatsApp"
                        className="w-8 h-8 flex items-center justify-center rounded-full bg-green-600/20 border border-green-500/30 text-green-400 hover:bg-green-600/40 transition-colors"
                      >
                        <MessageCircle size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Cards — mobile */}
        <div className="md:hidden space-y-4">
          {rooms.map((room) => (
            <div
              key={room.id}
              className="premium-glass-card rounded-xl p-5 flex flex-col gap-3"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-bold text-white text-base">{room.type}</h3>
                  <p className="text-soft-white/60 text-xs mt-0.5">
                    {room.capacity === 1 ? '1 guest' : `Up to ${room.capacity} guests`}
                  </p>
                </div>
                <span className="text-gold-premium font-bold text-xl">
                  KES {room.price.toLocaleString()}
                  <span className="text-xs font-normal text-soft-white/50"> /night</span>
                </span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {room.amenities.map((a) => (
                  <span
                    key={a}
                    className="inline-flex items-center gap-1 bg-white/10 text-soft-white/70 text-xs px-2 py-0.5 rounded-full"
                  >
                    {amenityIcons[a] ?? null}
                    {a}
                  </span>
                ))}
              </div>
              <div className="flex gap-2 mt-1">
                <button
                  onClick={() => onBookNow && onBookNow(room)}
                  className="btn-gold flex-1 py-2 text-sm rounded-lg"
                >
                  Book Now
                </button>
                <button
                  onClick={() => handleWhatsApp(room.type)}
                  className="flex items-center justify-center gap-1.5 flex-1 py-2 text-sm rounded-lg bg-green-600/20 border border-green-500/30 text-green-400 hover:bg-green-600/40 transition-colors"
                >
                  <MessageCircle size={14} />
                  WhatsApp
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Contact strip */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 text-sm text-soft-white/70">
          <span>Need help choosing?</span>
          <a
            href={`tel:${RECEPTION_PHONE}`}
            className="inline-flex items-center gap-2 text-white hover:text-gold-premium transition-colors font-medium"
          >
            <Phone size={15} className="text-gold-premium" />
            Reception: {RECEPTION_PHONE}
          </a>
          <span className="hidden sm:inline text-white/20">|</span>
          <button
            onClick={() => handleWhatsApp('a room')}
            className="inline-flex items-center gap-2 text-white hover:text-green-400 transition-colors font-medium"
          >
            <MessageCircle size={15} className="text-green-400" />
            WhatsApp us
          </button>
          <span className="hidden sm:inline text-white/20">|</span>
          <Link to="/rooms" className="text-gold-premium hover:underline">
            View full room details →
          </Link>
        </div>
      </div>
    </section>
  );
};

export default RoomPricingTable;
