import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import clsx from 'clsx';
import logo from '../assets/images/logo.png';
import { getTranslation } from '../utils/translations';

const Navbar = ({ onBookNow, language = 'en', onLanguageChange }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const t = (key) => getTranslation(language, key);

  // Debug: Log language changes
  console.log('Navbar language:', language);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const menuItems = [
    { label: t('nav.home'), path: '/' },
    { label: t('nav.rooms'), path: '/rooms' },
    { label: t('nav.blog'), path: '/blog' },
    { label: t('nav.about'), path: '/about' },
    { label: t('nav.events'), path: '/events' },
    { label: t('nav.gallery'), path: '/gallery' },
    { label: t('nav.contact'), path: '/contact' },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <nav
      className={clsx(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out',
        'bg-navy-deepest/95 backdrop-blur-xl border-b border-royal-blue/20'
      )}
    >
      <div className="container-custom">
        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center justify-between h-20 px-4">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3">
            <img
              src={logo}
              alt="Bin Ali Hotel Logo"
              className="h-12 w-auto object-contain p-1 border-2 border-gold-premium rounded-lg"
            />
            <div className="flex flex-col">
              <span className="font-playfair text-xl font-bold text-white leading-tight">
                BIN ALI
              </span>
              <span className="text-xs text-gold-premium tracking-widest font-semibold">
                HOTEL
              </span>
            </div>
          </Link>

          {/* Desktop Menu - Center */}
          <div className="flex items-center space-x-2">
            {menuItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={clsx(
                  'relative px-4 py-2 rounded-lg transition-colors duration-300 text-soft-white hover:text-sky-blue hover:bg-royal-blue/10',
                  { 'text-sky-blue font-semibold': isActive(item.path) }
                )}
              >
                {item.label}
                {isActive(item.path) && (
                  <span className="absolute bottom-0 left-4 right-4 h-0.5 bg-royal-blue rounded-full" />
                )}
              </Link>
            ))}
          </div>

          {/* Desktop Right Side - Language + Book Now */}
          <div className="flex items-center gap-4">
            {/* Language Toggle Desktop */}
            <div className="flex items-center">
              <button
                onClick={() => onLanguageChange('en')}
                className={clsx(
                  'px-3 py-1 rounded-l-md border border-royal-blue/30 text-sm font-semibold transition-all',
                  language === 'en' ? 'bg-gold-premium text-navy-deepest' : 'bg-royal-blue/10 text-soft-white hover:bg-royal-blue/20'
                )}
              >
                EN
              </button>
              <button
                onClick={() => onLanguageChange('so')}
                className={clsx(
                  'px-3 py-1 rounded-r-md border border-royal-blue/30 text-sm font-semibold transition-all',
                  language === 'so' ? 'bg-gold-premium text-navy-deepest' : 'bg-royal-blue/10 text-soft-white hover:bg-royal-blue/20'
                )}
              >
                SO
              </button>
            </div>
            <button
              onClick={() => onBookNow && onBookNow()}
              className="btn-gold py-3 px-6 text-sm"
            >
              {t('nav.bookNow')}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className="lg:hidden flex items-center justify-between h-20 px-4">
          {/* Mobile Logo - Left */}
          <Link to="/" className="flex items-center">
            <img
              src={logo}
              alt="Bin Ali Hotel Logo"
              className="h-10 w-auto object-contain p-1 border-2 border-gold-premium rounded-lg"
            />
          </Link>

          {/* Mobile Brand Name - Center */}
          <Link to="/" className="flex flex-col items-center">
            <span className="font-playfair text-base font-bold text-white leading-tight">
              BIN ALI
            </span>
            <span className="text-[10px] text-gold-premium tracking-wider font-semibold">
              HOTEL
            </span>
          </Link>

          {/* Mobile Menu Button - Right */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 text-soft-white"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden bg-navy-deepest/95 backdrop-blur-xl border-t border-royal-blue/20 shadow-lg">
            <div className="px-4 pt-2 pb-4 space-y-2">
              {menuItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={clsx(
                    'block w-full text-left px-4 py-3 rounded-lg text-lg transition-colors duration-300 min-h-[44px]',
                    {
                      'bg-royal-blue/20 text-sky-blue font-semibold': isActive(item.path),
                      'text-soft-white hover:bg-royal-blue/10 hover:text-sky-blue': !isActive(item.path),
                    }
                  )}
                >
                  {item.label}
                </Link>
              ))}
              {/* Language Toggle Mobile */}
              <div className="flex justify-center mt-4">
                <button
                  onClick={() => { onLanguageChange('en'); setIsMobileMenuOpen(false); }}
                  className={clsx(
                    'px-4 py-2 rounded-l-md border border-royal-blue/30 text-base font-semibold',
                    language === 'en' ? 'bg-gold-premium text-navy-deepest' : 'bg-royal-blue/10 text-soft-white hover:bg-royal-blue/20'
                  )}
                >
                  EN
                </button>
                <button
                  onClick={() => { onLanguageChange('so'); setIsMobileMenuOpen(false); }}
                  className={clsx(
                    'px-4 py-2 rounded-r-md border border-royal-blue/30 text-base font-semibold',
                    language === 'so' ? 'bg-gold-premium text-navy-deepest' : 'bg-royal-blue/10 text-soft-white hover:bg-royal-blue/20'
                  )}
                >
                  SO
                </button>
              </div>
              <button
                onClick={() => {
                  onBookNow && onBookNow();
                  setIsMobileMenuOpen(false);
                }}
                className="btn-gold w-full mt-2 py-3"
              >
                {t('nav.bookNow')}
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
