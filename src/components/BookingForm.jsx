import { useState, useEffect } from 'react';
import { X, Calendar, Users, Phone, User, MessageSquare } from 'lucide-react';
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css';
import { handleWhatsAppBooking, validateBookingData } from '../services/bookingService';
import { rooms } from '../data/rooms';
import { getTranslation } from '../utils/translations';

const BookingForm = ({ isOpen, onClose, preSelectedRoom = null, language = 'en' }) => {
  const t = (key) => getTranslation(language, key);
  const today = new Date().toISOString().split('T')[0];
  const maxDate = new Date();
  maxDate.setDate(maxDate.getDate() + 46);
  const maxDateString = maxDate.toISOString().split('T')[0];

  const [formData, setFormData] = useState({
    fullName: '',
    phoneNumber: '',
    checkInDate: today,
    numberOfDays: 1,
    checkOutDate: new Date(new Date(today).getTime() + 86400000).toISOString().split('T')[0],
    roomType: '',
    numberOfGuests: 1,
    specialRequests: ''
  });

  useEffect(() => {
    if (preSelectedRoom) {
      setFormData(prev => ({ ...prev, roomType: preSelectedRoom.type }));
    }
  }, [preSelectedRoom]);

  // Calculate checkout date when check-in date or number of days changes
  useEffect(() => {
    if (formData.checkInDate && formData.numberOfDays) {
      const checkIn = new Date(formData.checkInDate);
      const checkOut = new Date(checkIn.getTime() + (formData.numberOfDays * 86400000));
      const checkOutString = checkOut.toISOString().split('T')[0];
      setFormData(prev => ({ ...prev, checkOutDate: checkOutString }));
    }
  }, [formData.checkInDate, formData.numberOfDays]);

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validation = validateBookingData(formData);
    if (!validation.isValid) {
      setErrors(validation.errors);
      return;
    }
    setIsSubmitting(true);
    const success = handleWhatsAppBooking(formData);
    if (success) {
      resetForm();
      onClose();
    } else {
      setErrors({ submit: 'Failed to open WhatsApp. Please try again.' });
    }
    setIsSubmitting(false);
  };

  const resetForm = () => {
    setFormData({
      fullName: '',
      phoneNumber: '',
      checkInDate: today,
      numberOfDays: 1,
      checkOutDate: new Date(new Date(today).getTime() + 86400000).toISOString().split('T')[0],
      roomType: preSelectedRoom?.type || '',
      numberOfGuests: 1,
      specialRequests: ''
    });
    setErrors({});
  };

  if (!isOpen) return null;

  const inputBaseClasses = 'w-full bg-navy-deepest/50 border border-royal-blue/30 rounded-lg text-soft-white focus:ring-2 focus:ring-gold-premium transition-all duration-300';
  const inputIconClasses = 'absolute left-3 top-1/2 transform -translate-y-1/2 text-soft-white/50';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-sm" onClick={onClose}>
      <div className="absolute inset-0 bg-slate-black/70" />

      <div className="relative premium-glass-card max-w-xl w-full max-h-[95vh] flex flex-col" onClick={e => e.stopPropagation()}>
        <div className="sticky top-0 bg-gradient-to-br from-gold-premium to-gold-warm text-navy-deepest p-5 flex items-center justify-between rounded-t-3xl z-10 shrink-0 shadow-lg">
          <h2 className="text-xl md:text-2xl font-bold font-playfair">{t('booking.title')}</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-black/10 rounded-full transition-colors"
            aria-label={t('common.close')}
          >
            <X size={22} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-5 md:p-6 space-y-4 overflow-y-auto custom-scrollbar">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Full Name */}
            <div>
              <label htmlFor="fullName" className="block text-xs md:text-sm font-semibold text-soft-white/80 mb-1.5">{t('booking.fullName')} *</label>
              <div className="relative">
                <User size={18} className={inputIconClasses} />
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  className={`${inputBaseClasses} pl-10 pr-4 py-2.5 text-sm ${errors.fullName ? 'border-red-500' : ''}`}
                  placeholder={t('booking.enterName')}
                />
              </div>
              {errors.fullName && <p className="text-red-500 text-[10px] mt-1">{errors.fullName}</p>}
            </div>

            {/* Phone Number */}
            <div>
              <label htmlFor="phoneNumber" className="block text-xs md:text-sm font-semibold text-soft-white/80 mb-1.5">{t('booking.phone')} *</label>
              <PhoneInput
                international
                defaultCountry="KE"
                value={formData.phoneNumber}
                onChange={(value) => {
                  setFormData(prev => ({ ...prev, phoneNumber: value || '' }));
                  if (errors.phoneNumber) {
                    setErrors(prev => ({ ...prev, phoneNumber: '' }));
                  }
                }}
                className={`phone-input-custom text-sm ${errors.phoneNumber ? 'phone-input-error' : ''}`}
                placeholder={t('booking.enterPhone')}
              />
              {errors.phoneNumber && <p className="text-red-500 text-[10px] mt-1">{errors.phoneNumber}</p>}
            </div>

            {/* Check-in Date */}
            <div>
              <label htmlFor="checkInDate" className="block text-xs md:text-sm font-semibold text-soft-white/80 mb-1.5">{t('booking.checkIn')} *</label>
              <div className="relative">
                <Calendar size={18} className={inputIconClasses} />
                <input
                  type="date"
                  id="checkInDate"
                  name="checkInDate"
                  value={formData.checkInDate}
                  onChange={handleChange}
                  min={today}
                  max={maxDateString}
                  className={`${inputBaseClasses} pl-10 pr-4 py-2.5 text-sm ${errors.checkInDate ? 'border-red-500' : ''}`}
                />
              </div>
              {errors.checkInDate && <p className="text-red-500 text-[10px] mt-1">{errors.checkInDate}</p>}
            </div>

            {/* Number of Days */}
            <div>
              <label htmlFor="numberOfDays" className="block text-xs md:text-sm font-semibold text-soft-white/80 mb-1.5">{language === 'so' ? 'Tirada Maalmaha' : 'Number of Days'} *</label>
              <div className="relative">
                <Calendar size={18} className={inputIconClasses} />
                <input
                  type="number"
                  id="numberOfDays"
                  name="numberOfDays"
                  value={formData.numberOfDays}
                  onChange={handleChange}
                  min="1"
                  max="46"
                  className={`${inputBaseClasses} pl-10 pr-4 py-2.5 text-sm ${errors.numberOfDays ? 'border-red-500' : ''}`}
                />
              </div>
              {errors.numberOfDays && <p className="text-red-500 text-[10px] mt-1">{errors.numberOfDays}</p>}
            </div>

            {/* Room Type */}
            <div>
              <label htmlFor="roomType" className="block text-xs md:text-sm font-semibold text-soft-white/80 mb-1.5">{t('booking.roomType')} *</label>
              <div className="relative">
                <select
                  id="roomType"
                  name="roomType"
                  value={formData.roomType}
                  onChange={handleChange}
                  className={`${inputBaseClasses} px-4 py-2.5 pr-10 text-sm cursor-pointer ${errors.roomType ? 'border-red-500' : ''}`}
                  style={{ backgroundImage: 'none' }}
                >
                  <option value="">{t('booking.selectRoom')}</option>
                  {rooms.map((room) => (
                    <option key={room.id} value={room.type} className="bg-navy-deepest text-soft-white">
                      {room.type} - KES {room.price.toLocaleString()}
                    </option>
                  ))}
                </select>
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                  <svg className="w-4 h-4 text-soft-white/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
              {errors.roomType && <p className="text-red-500 text-[10px] mt-1">{errors.roomType}</p>}
            </div>

            {/* Number of Guests */}
            <div>
              <label htmlFor="numberOfGuests" className="block text-xs md:text-sm font-semibold text-soft-white/80 mb-1.5">{t('booking.guests')} *</label>
              <div className="relative">
                <Users size={18} className={inputIconClasses} />
                <input
                  type="number"
                  id="numberOfGuests"
                  name="numberOfGuests"
                  value={formData.numberOfGuests}
                  onChange={handleChange}
                  min="1"
                  max="10"
                  className={`${inputBaseClasses} pl-10 pr-4 py-2.5 text-sm ${errors.numberOfGuests ? 'border-red-500' : ''}`}
                />
              </div>
              {errors.numberOfGuests && <p className="text-red-500 text-[10px] mt-1">{errors.numberOfGuests}</p>}
            </div>
          </div>

          {/* Special Requests */}
          <div>
            <label htmlFor="specialRequests" className="block text-xs md:text-sm font-semibold text-soft-white/80 mb-1.5">{t('booking.specialRequests')} ({language === 'so' ? 'Ikhtiyaari' : 'Optional'})</label>
            <div className="relative">
              <MessageSquare size={18} className="absolute left-3 top-3 text-soft-white/50" />
              <textarea
                id="specialRequests"
                name="specialRequests"
                value={formData.specialRequests}
                onChange={handleChange}
                rows="2"
                className={`${inputBaseClasses} pl-10 pr-4 py-2.5 text-sm`}
                placeholder={t('booking.anySpecialRequests')}
              />
            </div>
          </div>

          {errors.submit && (
            <div className="bg-red-500/10 border border-red-500/30 text-red-300 px-4 py-2 rounded-lg text-xs">
              {errors.submit}
            </div>
          )}

          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <button type="button" onClick={onClose} className="btn-glass flex-1 py-3 text-sm cursor-pointer order-2 sm:order-1">
              {t('booking.cancel')}
            </button>
            <button
              type="submit"
              className="btn-gold flex-1 py-3 text-sm cursor-pointer order-1 sm:order-2"
            >
              {isSubmitting ? (language === 'so' ? 'Diraya...' : 'Sending...') : t('booking.submit')}
            </button>
          </div>

          <p className="text-[10px] md:text-xs text-soft-white/60 text-center">
            {language === 'so' ? 'Codsigaaga buugista ayaa loo diri doonaa WhatsApp si loo xaqiijiyo' : 'Your booking request will be sent via WhatsApp for confirmation.'}
          </p>
        </form>
      </div>
      </div>
    </div>
  );
};

export default BookingForm;
