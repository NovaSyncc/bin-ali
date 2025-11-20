import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Wifi, Wind, Droplets, Tv, Refrigerator, BellRing, Users, Images, Sparkles } from 'lucide-react';
import PageTransition from '../components/shared/PageTransition';
import Lightbox from '../components/shared/Lightbox';
import RoomsHero from '../components/RoomsHero';
import { rooms } from '../data/rooms';
import { getTranslation } from '../utils/translations';

const RoomsPage = ({ onBookNow, language = 'en' }) => {
  const t = (key) => getTranslation(language, key);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxImages, setLightboxImages] = useState([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const getAmenityIcon = (amenity) => {
    const icons = {
      'WiFi': Wifi,
      'AC': Wind,
      'Hot Water': Droplets,
      'TV': Tv,
      'Mini Fridge': Refrigerator,
      'Room Service': BellRing,
    };
    const IconComponent = icons[amenity] || Sparkles;
    return <IconComponent size={16} className="text-sky-blue" />;
  };

  const openRoomGallery = (room) => {
    setLightboxImages(room.images || [room.image]);
    setCurrentImageIndex(0);
    setLightboxOpen(true);
  };

  const handleNext = () => setCurrentImageIndex((prev) => (prev + 1) % lightboxImages.length);
  const handlePrevious = () => setCurrentImageIndex((prev) => (prev - 1 + lightboxImages.length) % lightboxImages.length);
  const handleClose = () => setLightboxOpen(false);

  return (
    <PageTransition>
      <RoomsHero onBookNow={onBookNow} language={language} />

      <section id="room-list" className="bg-navy-deepest py-24">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {rooms.map((room) => (
              <div key={room.id} className="premium-glass-card flex flex-col overflow-hidden">
                {/* Image Top */}
                <div className="relative group">
                  <img
                    src={room.image}
                    alt={room.type}
                    className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-black/60 to-transparent"></div>
                  <div className="absolute top-4 right-4 bg-gold-premium/95 text-navy-deepest px-4 py-2 rounded-full font-bold text-sm backdrop-blur-sm">
                    KES {room.price.toLocaleString()}/night
                  </div>
                  <button
                    onClick={() => openRoomGallery(room)}
                    className="absolute bottom-4 right-4 flex items-center gap-2 text-white bg-white/10 backdrop-blur-xl border border-white/20 px-3 py-1.5 rounded-full text-xs font-semibold hover:bg-white/20 transition-colors"
                  >
                    <Images size={14} />
                    <span>{room.images?.length || 1} {language === 'so' ? 'Sawir' : 'Photos'}</span>
                  </button>
                </div>

                {/* Content Below */}
                <div className="p-6 flex flex-col flex-grow">
                  <h3 className="text-xl font-bold mb-2">{room.type}</h3>
                  <div className="flex items-center gap-2 text-soft-white/80 mb-3 text-sm">
                    <Users size={16} />
                    <span>{language === 'so' ? 'Ilaa' : 'Up to'} {room.capacity} {room.capacity > 1 ? t('rooms.guests') : (language === 'so' ? 'marti' : 'guest')}</span>
                  </div>
                  <p className="text-soft-white/80 text-sm mb-4 flex-grow leading-relaxed">
                    {room.description}
                  </p>

                  <div className="flex flex-wrap gap-x-3 gap-y-2 mb-6">
                    {room.amenities.slice(0, 4).map((amenity) => (
                      <div key={amenity} className="flex items-center gap-1.5" title={amenity}>
                        {getAmenityIcon(amenity)}
                        <span className="text-xs text-soft-white">{amenity}</span>
                      </div>
                    ))}
                    {room.amenities.length > 4 && (
                      <span className="text-xs text-gold-premium">+{room.amenities.length - 4} {language === 'so' ? 'dheeraad ah' : 'more'}</span>
                    )}
                  </div>

                  <button
                    onClick={() => onBookNow && onBookNow(room)}
                    className="btn-blue w-full"
                  >
                    {language === 'so' ? 'Buugi Qolkan' : 'Book This Room'}
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-16">
            <Link to="/gallery">
              <button className="btn-glass px-8 py-3 text-base">
                {language === 'so' ? 'Eeg Sawirka Oo Dhan' : 'View Full Gallery'}
              </button>
            </Link>
          </div>
        </div>
      </section>

      {lightboxOpen && (
        <Lightbox images={lightboxImages} currentIndex={currentImageIndex} onClose={handleClose} onNext={handleNext} onPrevious={handlePrevious} />
      )}
    </PageTransition>
  );
};

export default RoomsPage;
