import { useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { MapPin, Phone, Mail, Facebook, Instagram, Twitter } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const [clickCount, setClickCount] = useState(0);
  const navigate = useNavigate();
  const timerRef = useRef(null);

  const quickLinks = [
    { label: 'Home', path: '/' },
    { label: 'Rooms', path: '/rooms' },
    { label: 'About', path: '/about' },
    { label: 'Events', path: '/events' },
    { label: 'Gallery', path: '/gallery' },
    { label: 'Contact', path: '/contact' }
  ];

  const socialLinks = [
    { icon: Facebook, label: 'Facebook', url: '#' },
    { icon: Instagram, label: 'Instagram', url: '#' },
    { icon: Twitter, label: 'Twitter', url: '#' },
  ];

  const handleLogoClick = () => {
    // Clear any existing timer
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    const newClickCount = clickCount + 1;
    setClickCount(newClickCount);

    if (newClickCount === 4) {
      setClickCount(0);
      navigate('/manager');
    } else {
      // Set a timer to reset the count after 2 seconds
      timerRef.current = setTimeout(() => {
        setClickCount(0);
      }, 2000);
    }
  };

  return (
    <footer className="bg-gradient-to-135 from-navy-deepest via-midnight-blue to-navy-deepest border-t border-royal-blue/20 text-white">
      <div className="container-custom px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-10">
          {/* About Section */}
          <div>
            {/* Logo Text */}
            <div className="mb-4 relative" onClick={handleLogoClick} style={{ cursor: 'pointer' }}>
              <h3 className="font-playfair text-3xl font-bold text-white mb-1">
                BIN ALI{' '}
                <span className="text-base text-gold-premium">
                  HOTEL
                </span>
              </h3>
              {clickCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-gold-premium text-navy-deepest text-xs font-bold w-6 h-6 flex items-center justify-center rounded-full animate-bounce">
                  {4 - clickCount}
                </span>
              )}
            </div>

            <p className="mb-4 text-soft-white/85 text-sm leading-relaxed">
              Comfortable accommodation and elegant wedding venues in Eastleigh, Nairobi since 2015.
            </p>

            {/* Rating */}
            <div className="flex items-center gap-2 mb-4">
              <span className="text-xl">⭐</span>
              <span className="font-semibold">4.0</span>
              <span className="text-soft-white/70 text-sm">
                (400+ reviews)
              </span>
            </div>

            {/* Social Icons */}
            <div className="flex items-center gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.url}
                  aria-label={social.label}
                  className="w-10 h-10 flex items-center justify-center bg-white/10 border border-white/20 rounded-full text-white transition-all duration-300 hover:bg-royal-blue/20 hover:border-royal-blue/40 hover:-translate-y-0.5"
                >
                  <social.icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="mb-4 text-lg font-semibold text-white">
              Quick Links
            </h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-soft-white/90 text-sm hover:text-sky-blue transition-colors duration-300"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="mb-4 text-lg font-semibold text-white">
              Contact
            </h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <MapPin
                  size={16}
                  className="flex-shrink-0 mt-1 text-soft-white/70"
                />
                <span className="text-soft-white/90 text-sm leading-relaxed">
                  Eighth St, Eastleigh<br />Nairobi, Kenya
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone
                  size={16}
                  className="flex-shrink-0 text-soft-white/70"
                />
                <a
                  href="tel:+254745386007"
                  className="text-soft-white/90 text-sm hover:text-sky-blue transition-colors duration-300"
                >
                  0745 386007
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail
                  size={16}
                  className="flex-shrink-0 text-soft-white/70"
                />
                <a
                  href="mailto:info@binalihotel.com"
                  className="text-soft-white/90 text-sm hover:text-sky-blue transition-colors duration-300"
                >
                  info@binalihotel.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-3">
            <p className="text-soft-white/70 text-sm text-center">
              © {currentYear} Bin Ali Hotel. All rights reserved.
            </p>
            <a
              href="https://www.deegaanriyo.online"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gold-premium text-sm hover:text-gold-warm transition-colors duration-300"
            >
              Developed by Deegaan Riyo Digital Solutions
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
