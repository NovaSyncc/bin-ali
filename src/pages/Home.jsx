import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Bed, Calendar, Utensils, Wifi, Car, Shield, Coffee, Users } from 'lucide-react';
import PageTransition from '../components/shared/PageTransition';
import Lightbox from '../components/shared/Lightbox';
import Hero from '../components/Hero';
import WeddingHalls from '../components/WeddingHalls';
import Rooms from '../components/Rooms';
import receptionImage from '../assets/images/cover/reception.jpg';
import { blogService } from '../services/supabase';
import { format } from 'date-fns';
import { getTranslation } from '../utils/translations';

const Home = ({ onBookNow, onBookEventHall, language = 'en' }) => {
  const t = (key) => getTranslation(language, key);

  // Debug: Log language changes
  console.log('Home page language:', language);

  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxImages, setLightboxImages] = useState([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [latestBlogPosts, setLatestBlogPosts] = useState([]);
  const [loadingBlogPosts, setLoadingBlogPosts] = useState(true);

  // Fetch latest blog posts
  useEffect(() => {
    const fetchLatestBlogPosts = async () => {
      try {
        setLoadingBlogPosts(true);
        // Assuming 'en' for now, will integrate bilingual support later
        const posts = await blogService.getPublishedBlogPosts('en');
        // Get the latest 3 posts
        setLatestBlogPosts(posts.slice(0, 3)); 
      } catch (error) {
        console.error('Error fetching latest blog posts:', error);
      } finally {
        setLoadingBlogPosts(false);
      }
    };
    fetchLatestBlogPosts();
  }, []);

  // Lightbox handlers
  const handleNext = () => setCurrentImageIndex((prev) => (prev + 1) % lightboxImages.length);
  const handlePrevious = () => setCurrentImageIndex((prev) => (prev - 1 + lightboxImages.length) % lightboxImages.length);
  const handleClose = () => setLightboxOpen(false);

  const quickIntroCards = [
    { title: t('home.weddingHalls'), description: t('home.weddingHallsDesc'), link: '/events', icon: Calendar },
    { title: t('home.comfortableRooms'), description: t('home.comfortableRoomsDesc'), link: '/rooms', icon: Bed },
    { title: t('home.fineDining'), description: t('home.fineDiningDesc'), link: '/contact', icon: Utensils },
  ];

  const amenities = [
    { icon: Wifi, title: t('home.freeWifi'), description: t('home.freeWifiDesc') },
    { icon: Car, title: t('home.freeParking'), description: t('home.freeParkingDesc') },
    { icon: Utensils, title: t('home.restaurant'), description: t('home.restaurantDesc') },
    { icon: Calendar, title: t('home.eventSpace'), description: t('home.eventSpaceDesc') },
    { icon: Shield, title: t('home.security'), description: t('home.securityDesc') },
    { icon: Coffee, title: t('home.roomService'), description: t('home.roomServiceDesc') },
  ];

  return (
    <PageTransition>
      <Hero onBookEventHall={onBookEventHall} language={language} />
      <WeddingHalls language={language} />
      <Rooms onBookNow={onBookNow} language={language} />

      {/* Latest Blog Posts Section */}
      <section className="bg-navy-deepest py-24">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold mb-4">
              {t('home.latestStories')}
            </h2>
            <p className="text-lg text-soft-white/80 max-w-3xl mx-auto">
              {t('home.latestStoriesDesc')}
            </p>
          </div>
          {loadingBlogPosts ? (
            <p className="text-center text-gray-300">{t('home.loadingPosts')}</p>
          ) : latestBlogPosts.length === 0 ? (
            <p className="text-center text-gray-300">{t('home.noPosts')}</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {latestBlogPosts.map((post) => (
                <Link to={`/blog/${post.slug}`} key={post.id} className="group">
                  <div className="premium-glass-card rounded-lg shadow-lg overflow-hidden h-full flex flex-col">
                    {post.featured_image && (
                      <img src={post.featured_image} alt={post.title} className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105" />
                    )}
                    <div className="p-6 flex-1 flex flex-col">
                      <span className="text-gold text-xs uppercase font-semibold">{post.category}</span>
                      <h3 className="text-xl font-bold text-white mt-2 mb-2 group-hover:text-gold-premium transition-colors duration-300">{post.title}</h3>
                      <p className="text-gray-300 text-sm mb-4 line-clamp-3 flex-1">{post.excerpt}</p>
                      <div className="flex justify-between items-center text-gray-400 text-xs mt-auto">
                        <span>{post.author}</span>
                        <span>{post.published_at ? format(new Date(post.published_at), 'MMM d, yyyy') : 'N/A'}</span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
          <div className="text-center mt-12">
            <Link to="/blog">
              <button className="btn-gold py-3 px-8 text-base">
                {t('home.viewAllPosts')}
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Bin Ali Hotel Section */}
      <section className="bg-gradient-to-br from-navy-deepest via-midnight-blue to-navy-deepest py-24">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold mb-4">
              {t('home.whyChoose')}
            </h2>
            <p className="text-lg text-soft-white/80 max-w-3xl mx-auto">
              {t('home.whyChooseDesc')}
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {quickIntroCards.map((card, index) => (
              <Link key={index} to={card.link} className="group">
                <div className="premium-glass-card p-8 text-center h-full">
                  <div className="w-20 h-20 bg-gradient-to-br from-royal-blue to-sky-blue rounded-full flex items-center justify-center mx-auto mb-6 transition-transform duration-300 group-hover:scale-110">
                    <card.icon size={36} className="text-white" />
                  </div>
                  <h3 className="text-xl font-bold mb-4">{card.title}</h3>
                  <p className="text-soft-white/80 mb-4">{card.description}</p>
                  <span className="text-gold-premium font-semibold group-hover:underline">
                    {t('home.learnMore')}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Amenities Section */}
      <section className="bg-navy-deepest py-24">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold mb-4">
              {t('home.amenities')}
            </h2>
            <p className="text-lg text-soft-white/80 max-w-3xl mx-auto">
              {t('home.amenitiesDesc')}
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {amenities.map((amenity, index) => (
              <div key={index} className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 text-center transition-all duration-300 hover:-translate-y-1 hover:border-royal-blue/30">
                <div className="w-14 h-14 bg-gradient-to-br from-gold-premium to-gold-warm rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <amenity.icon size={24} className="text-navy-deepest" />
                </div>
                <h3 className="text-md font-bold mb-1">{amenity.title}</h3>
                <p className="text-sm text-soft-white/80">{amenity.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Preview Section */}
      <section className="bg-gradient-to-br from-navy-deepest via-midnight-blue to-navy-deepest py-24">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl">
              <img src={receptionImage} alt="Bin Ali Hotel Reception" className="w-full h-[500px] object-cover" loading="lazy" />
              <div className="absolute bottom-6 right-6 bg-gold-premium/95 backdrop-blur-md rounded-2xl p-6 shadow-lg text-navy-deepest text-center">
                <p className="text-5xl font-bold">2015</p>
                <p className="text-sm font-semibold">SINCE</p>
              </div>
            </div>
            <div>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold mb-6">
                {t('home.since2015')}
              </h2>
              <p className="text-soft-white/80 mb-6 leading-relaxed">
                {t('home.since2015Desc1')}
              </p>
              <p className="text-lg text-white mb-8 leading-relaxed">
                {t('home.since2015Desc2')}
              </p>
              <Link to="/about">
                <button className="btn-gold py-3 px-8 text-base">
                  {t('home.discoverStory')}
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-br from-midnight-blue via-royal-blue to-midnight-blue py-24">
        <div className="container-custom text-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-shadow-lg mb-4">
            {t('home.readyForStay')}
          </h2>
          <p className="text-lg text-white/95 max-w-3xl mx-auto mb-8">
            {t('home.readyForStayDesc')}
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <button onClick={() => onBookNow && onBookNow()} className="btn-gold">
              {t('home.bookRoom')}
            </button>
            <Link to="/contact">
              <button className="btn-glass">
                {t('home.contactUs')}
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* Mobile Sticky Book Now Button */}
      <div className="fixed bottom-0 left-0 right-0 p-4 md:hidden z-40 bg-navy-deepest/80 backdrop-blur-xl border-t border-royal-blue/20 shadow-lg">
        <button onClick={() => onBookNow && onBookNow()} className="btn-gold w-full py-3">
          {t('home.bookYourStay')}
        </button>
      </div>

      {lightboxOpen && (
        <Lightbox images={lightboxImages} currentIndex={currentImageIndex} onClose={handleClose} onNext={handleNext} onPrevious={handlePrevious} />
      )}
    </PageTransition>
  );
};

export default Home;
