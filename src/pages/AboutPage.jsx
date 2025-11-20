import { MapPin, Star, Coffee, Wifi, Car, Shield, Award, Heart, Users as UsersIcon } from 'lucide-react';
import PageTransition from '../components/shared/PageTransition';
import GlassCard from '../components/shared/GlassCard';
import PageHeader from '../components/shared/PageHeader';
import receptionImage from '../assets/images/cover/reception.jpg';
import { getTranslation } from '../utils/translations';

const AboutPage = ({ language = 'en' }) => {
  const t = (key) => getTranslation(language, key);

  const features = [
    {
      icon: MapPin,
      title: t('about.location'),
      description: t('about.locationDesc')
    },
    {
      icon: Star,
      title: language === 'so' ? '4.0 Xiddig Qiimeyn' : '4.0 Star Rated',
      description: language === 'so' ? 'Qiimeyn sare oo ka badan 400 marti adeegayaga cajiibka ah iyo dejinta raaxada leh' : 'Highly rated by over 400 guests for our exceptional service and comfortable accommodations.'
    },
    {
      icon: Coffee,
      title: language === 'so' ? 'Maqaayadda Goobta' : 'On-site Restaurant',
      description: language === 'so' ? 'Ku raaxayso cuntooyinka macaan maqaayadayada oo soo bandhigaya cunto Soomaali iyo caalami ah oo dhabta ah' : 'Enjoy delicious meals at our restaurant serving authentic Somali and international cuisine.'
    },
    {
      icon: Wifi,
      title: language === 'so' ? 'WiFi Bilaash ah' : 'Free WiFi',
      description: language === 'so' ? 'Ku sii xiriir internet dhaqso sare ah oo bilaash ah meel walba' : 'Stay connected with complimentary high-speed internet throughout the property.'
    },
    {
      icon: Car,
      title: language === 'so' ? 'Baarkiin Ammaan ah' : 'Secure Parking',
      description: language === 'so' ? 'Xarumaha baarkiin ammaan ah oo fudud oo martida oo dhan' : 'Safe and convenient parking facilities for all our guests.'
    },
    {
      icon: Shield,
      title: language === 'so' ? 'Amniga 24/7' : '24/7 Security',
      description: language === 'so' ? 'Amaan 24/7 si loo hubiyo amnikaaga iyo nabad gal maskaxda' : 'Round-the-clock security to ensure your safety and peace of mind.'
    }
  ];

  const values = [
    {
      icon: Heart,
      title: language === 'so' ? 'Martiqaad Marka Hore' : 'Hospitality First',
      description: language === 'so' ? 'Waxaan u dhignaa marti walba sida qoys, hubinaya waayo kulmis diiran iyo soo dhawayn laga bilaabo diiwaan galka ilaa ka bixitaanka' : 'We treat every guest like family, ensuring a warm and welcoming experience from check-in to check-out.'
    },
    {
      icon: Award,
      title: language === 'so' ? 'Adeeg Tayada Leh' : 'Quality Service',
      description: language === 'so' ? 'Waxaan ilaalinaa halbeegyada wanaagsan ee nadiifinta, adeega, iyo raaxada dhammaan xarumahayaga' : 'We maintain good standards in cleanliness, service, and comfort across all our facilities.'
    },
    {
      icon: UsersIcon,
      title: language === 'so' ? 'Bulshada' : 'Community',
      description: language === 'so' ? 'Qaybta aan ku faano ee bulshada Eastleigh, waxaan dabaaldegeynaa oo u adeegnaa dhaqannada kala duwan ee Nairobi' : 'As a proud part of the Eastleigh community, we celebrate and serve the diverse cultures of Nairobi.'
    }
  ];

  return (
    <PageTransition>
      <PageHeader
        title={t('about.title')}
        subtitle={t('about.subtitle')}
        backgroundImage={receptionImage}
      />

      {/* History Section */}
      <section className="bg-gradient-to-br from-navy-deepest via-midnight-blue to-navy-deepest py-24">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Image Section */}
            <div className="relative premium-glass-card p-6">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                <img
                  src={receptionImage}
                  alt="Bin Ali Hotel Interior"
                  className="w-full h-[500px] object-cover"
                  loading="lazy"
                />
                {/* Overlay Badges */}
                <div className="absolute bottom-6 left-6 bg-gold-premium/95 backdrop-blur-xl rounded-2xl p-6 shadow-lg text-navy-deepest text-center">
                  <p className="text-4xl font-bold">2015</p>
                  <p className="text-sm font-semibold">{language === 'so' ? 'La Aasaasay' : 'Founded'}</p>
                </div>
                <div className="absolute top-6 right-6 bg-gold-premium/95 backdrop-blur-xl rounded-2xl p-6 shadow-lg text-navy-deepest text-center">
                  <p className="text-4xl font-bold">400+</p>
                  <p className="text-sm font-semibold">{language === 'so' ? 'Marti Farxad leh' : 'Happy Guests'}</p>
                </div>
              </div>
            </div>

            {/* Content Section */}
            <div>
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 font-playfair">
                Bin Ali Hotel
              </h2>
              <div className="space-y-4 text-lg text-soft-white/80 leading-relaxed">
                <p>
                  <span className="font-semibold text-gold-premium">{language === 'so' ? 'La Aasaasay 2015' : 'Founded in 2015'}</span>, {language === 'so' ? 'Bin Ali Hotel waxay ahayd saldhig martiqaad Eastleigh, Nairobi. Laga bilaabo bilawgii fudud, waxaan u soconnay ujeeddo cad: in aan bixinno raaxo heer sare ah, adeeg dhab ah, iyo jawi soo dhawayn ah marti walba' : 'Bin Ali Hotel has been a cornerstone of hospitality in Eastleigh, Nairobi. From our humble beginnings, we set out with a clear mission: to provide exceptional comfort, authentic service, and a welcoming atmosphere for every guest'}.
                </p>
                <p>
                  {language === 'so' ? 'Tobankii sano ee la soo dhaafay, waxaan u koray mid ka mid ah goobaha ugu muhiimsan Eastleigh dejinta, xafladaha, iyo cuntada. Guusheenna waxay ku dhisan tahay kalsoonida iyo qanacsanaanta boqollada martida ah ee Bin Ali Hotel gurigooda ka fog guriga ka dhigtay' : 'Over the past decade, we have grown to become one of Eastleigh\'s premier destinations for accommodation, events, and dining. Our success is built on the trust and satisfaction of the hundreds of guests who have made Bin Ali Hotel their home away from home'}.
                </p>
                <p>
                  {language === 'so' ? 'Haddii aad u imaanaysid ganacsi, nasasho, ama dabaaldeg daqiiqooyinka gaarka ah ee nolosha, waxaan isku darnaynaa adeegyada casriga ah iyo martiqaadka Soomaaliyeed ee dhaqanka ah si aan u abuurno waayo aragti aan la ilaawan. Kooxdayada u heellan waxay ku faantaa hubinta in faah-faahinta kasta ee joogitaankaaga ay ka baxaan filasho' : 'Whether you\'re visiting for business, leisure, or celebrating life\'s special moments, we combine modern amenities with traditional Somali hospitality to create an unforgettable experience. Our dedicated team takes pride in ensuring every detail of your stay exceeds expectations'}.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid Section */}
      <section className="bg-gradient-to-br from-navy-deepest via-midnight-blue to-navy-deepest py-24">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 font-playfair">
              {t('about.whyChooseUs')}
            </h2>
            <p className="text-lg text-soft-white/80 max-w-2xl mx-auto">
              {language === 'so' ? 'La kulaan isku dhafka quruxda badan ee raaxada, fududaynta, iyo adeegga cajiibka ah' : 'Experience the perfect blend of comfort, convenience, and exceptional service'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <GlassCard key={index} className="p-8 text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-gold-premium to-gold-warm rounded-2xl flex items-center justify-center mx-auto mb-4 transition-transform duration-300 group-hover:scale-110">
                  <feature.icon size={28} className="text-navy-deepest" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">
                  {feature.title}
                </h3>
                <p className="text-soft-white/80">
                  {feature.description}
                </p>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="bg-gradient-to-br from-navy-deepest via-midnight-blue to-navy-deepest py-24">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 font-playfair">
              {language === 'so' ? 'Qiyamkayaga' : 'Our Values'}
            </h2>
            <p className="text-lg text-soft-white/80 max-w-2xl mx-auto">
              {language === 'so' ? 'Mabaadi\'da hagaysa waxa aan sameyno oo dhan' : 'The principles that guide everything we do'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <GlassCard key={index} className="p-8 text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-gold-premium to-gold-warm rounded-full flex items-center justify-center mx-auto mb-6 transition-transform duration-300 group-hover:scale-110">
                  <value.icon size={32} className="text-navy-deepest" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">
                  {value.title}
                </h3>
                <p className="text-soft-white/80">
                  {value.description}
                </p>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-br from-royal-blue via-midnight-blue to-royal-blue py-24">
        <div className="container-custom text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 font-playfair">
            {language === 'so' ? 'La kulaan Farqiga Bin Ali' : 'Experience the Bin Ali Difference'}
          </h2>
          <p className="text-xl text-soft-white/90 mb-8 max-w-2xl mx-auto">
            {language === 'so' ? 'Ku soo biir boqollada martida qanacsanaanta ah kuwaas oo naga dhigtay doorashadooda Eastleigh' : 'Join the hundreds of satisfied guests who have made us their preferred choice in Eastleigh'}
          </p>
          <button className="btn-glass">
            {language === 'so' ? 'Buugi Joogitaankaaga Maanta' : 'Book Your Stay Today'}
          </button>
        </div>
      </section>
    </PageTransition>
  );
};

export default AboutPage;
