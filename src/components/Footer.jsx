import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, Heart } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { label: 'Home', path: '/' },
    { label: 'Rooms', path: '/rooms' },
    { label: 'About', path: '/about' },
    { label: 'Events', path: '/events' },
    { label: 'Contact', path: '/contact' }
  ];

  return (
    <footer className="bg-gray-900 text-white">
      <div className="container-custom px-4 py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* About Section */}
          <div>
            <h3 className="text-xl font-bold mb-3">Bin Ali Hotel</h3>
            <p className="text-gray-400 mb-3 text-sm">
              Comfortable accommodation in Eastleigh, Nairobi since 2015.
            </p>
            <div className="flex items-center space-x-2">
              <span className="text-lg">⭐</span>
              <span className="font-semibold">4.0</span>
              <span className="text-gray-400 text-xs">(400+ reviews)</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-3">Quick Links</h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-gray-400 hover:text-white transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-3">Contact</h4>
            <ul className="space-y-2">
              <li className="flex items-start space-x-2">
                <MapPin size={16} className="flex-shrink-0 mt-1 text-gray-400" />
                <span className="text-gray-400 text-sm">
                  Eighth St, Eastleigh<br />Nairobi, Kenya
                </span>
              </li>
              <li className="flex items-center space-x-2">
                <Phone size={16} className="flex-shrink-0 text-gray-400" />
                <a href="tel:+254745386007" className="text-gray-400 hover:text-white transition-colors text-sm">
                  0745 386007
                </a>
              </li>
              <li className="flex items-center space-x-2">
                <Mail size={16} className="flex-shrink-0 text-gray-400" />
                <a href="mailto:info@binalihotel.com" className="text-gray-400 hover:text-white transition-colors text-sm">
                  info@binalihotel.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-700 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-3 md:space-y-0">
            <p className="text-gray-400 text-sm text-center md:text-left">
              © {currentYear} Bin Ali Hotel. All rights reserved.
            </p>
            <a
              href="https://www.deegaanriyo.online"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition-colors text-sm"
            >
              Built by Deegaan Riyo
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
