import { MapPin, Phone, Mail, Clock, MessageCircle, Star } from 'lucide-react';
import PageTransition from '../components/shared/PageTransition';
import GlassCard from '../components/shared/GlassCard';
import PageHeader from '../components/shared/PageHeader';
import receptionImage from '../assets/images/cover/reception.jpg';
import { getTranslation } from '../utils/translations';

const ContactPage = ({ language = 'en' }) => {
  const t = (key) => getTranslation(language, key);
  const handleWhatsAppClick = () => {
    const whatsappNumber = import.meta.env.VITE_WHATSAPP_NUMBER || '254745386007';
    const message = encodeURIComponent('السلام عليكم, I would like to get more information about Bin Ali Hotel.');
    window.open(`https://wa.me/${whatsappNumber}?text=${message}`, '_blank');
  };

  const contactInfo = [
    {
      icon: MapPin,
      title: t('contact.address'),
      details: ['Eighth St, Nairobi', 'Eastleigh, Kenya'],
      action: null,
      colorClass: 'bg-royal-blue'
    },
    {
      icon: Phone,
      title: t('contact.phone'),
      details: ['0745 386007', '+254 745 386007'],
      action: 'tel:+254745386007',
      colorClass: 'bg-gold-premium'
    },
    {
      icon: Mail,
      title: t('contact.email'),
      details: ['info@binalihotel.com'],
      action: 'mailto:info@binalihotel.com',
      colorClass: 'bg-royal-blue'
    },
    {
      icon: Clock,
      title: t('contact.businessHours'),
      details: [t('contact.reception247')],
      action: null,
      colorClass: 'bg-gold-premium'
    }
  ];

  return (
    <PageTransition>
      <PageHeader
        title={t('contact.getInTouch')}
        subtitle={t('contact.getInTouchDesc')}
        backgroundImage={receptionImage}
      />

      {/* Contact Cards Section */}
      <section className="bg-gradient-to-br from-navy-deepest via-midnight-blue to-navy-deepest py-24">
        <div className="container-custom">
          {/* Contact Info Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {contactInfo.map((info, index) => (
              <GlassCard
                key={index}
                className="p-8 text-center"
              >
                <div className={`w-16 h-16 ${info.colorClass} rounded-2xl flex items-center justify-center mx-auto mb-4`}>
                  <info.icon size={28} className="text-white" />
                </div>
                <h3 className="font-bold text-xl text-white mb-3">
                  {info.title}
                </h3>
                {info.details.map((detail, idx) => (
                  <p key={idx} className="text-soft-white/80 mb-1">
                    {info.action ? (
                      <a
                        href={info.action}
                        className="hover:text-gold-premium transition-colors font-medium"
                      >
                        {detail}
                      </a>
                    ) : (
                      detail
                    )}
                  </p>
                ))}
              </GlassCard>
            ))}
          </div>

          {/* Main Contact Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Left Column - WhatsApp & Rating */}
            <div className="space-y-8">
              {/* WhatsApp Quick Contact */}
              <GlassCard className="p-8 text-white">
                <div className="flex items-center gap-4 mb-4">
                  <MessageCircle size={36} className="text-green-400" />
                  <h3 className="text-2xl font-bold">{language === 'so' ? 'Xiriir WhatsApp' : 'WhatsApp Contact'}</h3>
                </div>
                <p className="mb-6 text-soft-white text-lg">
                  {language === 'so' ? 'Hel jawaabaha degdegga ah su\'aalaha aad qabtid. Nala sheekayso WhatsApp si aad u hesho caawimaad degdeg ah!' : 'Get instant responses to your questions. Chat with us on WhatsApp for immediate assistance!'}
                </p>
                <button
                  onClick={handleWhatsAppClick}
                  className="btn-gold w-full"
                >
                  {language === 'so' ? 'Bilow Sheeko WhatsApp' : 'Start WhatsApp Chat'}
                </button>
              </GlassCard>

              {/* Google Rating */}
              <GlassCard className="p-8">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <p className="text-sm text-soft-white/80 mb-2">{language === 'so' ? 'Qiimeynta Google' : 'Google Rating'}</p>
                    <div className="flex items-center gap-3">
                      <span className="text-5xl font-bold text-royal-blue">4.0</span>
                      <span className="text-gold-premium text-3xl">⭐⭐⭐⭐</span>
                    </div>
                    <p className="text-sm text-soft-white/80 mt-2">{language === 'so' ? 'Ku salaysan 400+ faallo' : 'Based on 400+ reviews'}</p>
                  </div>
                </div>
                <a
                  href="https://maps.google.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <button className="btn-glass w-full inline-flex justify-center items-center gap-2">
                    {language === 'so' ? 'Eeg Google Maps' : 'View on Google Maps'}
                  </button>
                </a>
              </GlassCard>

              {/* Additional Info */}
              <GlassCard className="p-8">
                <h3 className="font-bold text-2xl text-white mb-4">
                  {language === 'so' ? 'Maxaad Noogu Soo Xiriiri Lahayd?' : 'Why Contact Us?'}
                </h3>
                <ul className="space-y-3 text-soft-white/80">
                  <li className="flex items-start gap-2">
                    <span className="text-gold-premium mt-1">✓</span>
                    <span>{language === 'so' ? 'Buugi joogitaankaaga oo leh soo bandhigyo gaara ah' : 'Book your stay with special offers'}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-gold-premium mt-1">✓</span>
                    <span>{language === 'so' ? 'Qorshe xafladaada ama arooska' : 'Plan your event or wedding'}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-gold-premium mt-1">✓</span>
                    <span>{language === 'so' ? 'Kaydso miis maqaayadayada' : 'Reserve a table at our restaurant'}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-gold-premium mt-1">✓</span>
                    <span>{language === 'so' ? 'Hel jawaabaha su\'aalaha kasta' : 'Get answers to any questions'}</span>
                  </li>
                </ul>
              </GlassCard>
            </div>

            {/* Right Column - Map */}
            <div>
              <GlassCard className="p-0 overflow-hidden h-full min-h-[600px]">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3988.8176449742574!2d36.8373!3d-1.2833!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMcKwMTYnNTkuOSJTIDM2wrA1MCcxNC4zIkU!5e0!3m2!1sen!2ske!4v1234567890"
                  width="100%"
                  height="100%"
                  style={{ border: 0, minHeight: '600px' }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Bin Ali Hotel Location"
                />
              </GlassCard>
              <p className="text-center text-soft-white/80 mt-4">
                {language === 'so' ? 'Ku yaalla dhexda Eastleigh, si fudud looga heli karo dhammaan waddooyinka waaweyn ee Nairobi' : 'Located in the heart of Eastleigh, easily accessible from all major routes in Nairobi'}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="bg-gradient-to-br from-royal-blue via-midnight-blue to-royal-blue py-24">
        <div className="container-custom text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 font-playfair">
            {language === 'so' ? 'Diyaar ma u tahay inaad la kulanto Bin Ali Hotel?' : 'Ready to Experience Bin Ali Hotel?'}
          </h2>
          <p className="text-xl text-soft-white/90 mb-8 max-w-2xl mx-auto">
            {language === 'so' ? 'Nala soo xiriir maanta si aad u buugiso joogitaankaaga ama u qorsheysid xafladaada gaarka ah' : 'Contact us today to book your stay or plan your special event'}
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <button
              onClick={handleWhatsAppClick}
              className="btn-gold"
            >
              {language === 'so' ? 'Xiriir WhatsApp' : 'Contact via WhatsApp'}
            </button>
            <a href="tel:+254745386007" className="inline-block">
              <button className="btn-glass">
                {language === 'so' ? 'Na Wac Hadda' : 'Call Us Now'}
              </button>
            </a>
          </div>
        </div>
      </section>
    </PageTransition>
  );
};

export default ContactPage;