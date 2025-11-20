import { useState, useEffect } from 'react';
import { X, Calendar, Users, Phone, User, MessageSquare } from 'lucide-react';
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
    roomType: '',
    numberOfGuests: 1,
    specialRequests: ''
  });

  useEffect(() => {
    if (preSelectedRoom) {
      setFormData(prev => ({ ...prev, roomType: preSelectedRoom.type }));
    }
  }, [preSelectedRoom]);

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

      <div className="relative premium-glass-card max-w-2xl w-full max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
        <div className="sticky top-0 bg-gradient-to-br from-gold-premium to-gold-warm text-navy-deepest p-6 flex items-center justify-between rounded-t-3xl z-10">
          <h2 className="text-2xl font-bold font-playfair">{t('booking.title')}</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-black/10 rounded-full transition-colors"
            aria-label={t('common.close')}
          >
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          {/* Full Name */}
          <div>
            <label htmlFor="fullName" className="block text-sm font-semibold text-soft-white/80 mb-2">{t('booking.fullName')} *</label>
            <div className="relative">
              <User size={20} className={inputIconClasses} />
              <input
                type="text"
                id="fullName"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                className={`${inputBaseClasses} pl-10 pr-4 py-3 ${errors.fullName ? 'border-red-500' : ''}`}
                placeholder={t('booking.enterName')}
              />
            </div>
            {errors.fullName && <p className="text-red-500 text-sm mt-1">{errors.fullName}</p>}
          </div>

          {/* Phone Number */}
          <div>
            <label htmlFor="phoneNumber" className="block text-sm font-semibold text-soft-white/80 mb-2">{t('booking.phone')} *</label>
            <div className="relative">
              <Phone size={20} className={inputIconClasses} />
              <input
                type="tel"
                id="phoneNumber"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                className={`${inputBaseClasses} pl-10 pr-4 py-3 ${errors.phoneNumber ? 'border-red-500' : ''}`}
                placeholder={t('booking.enterPhone')}
              />
            </div>
            {errors.phoneNumber && <p className="text-red-500 text-sm mt-1">{errors.phoneNumber}</p>}
          </div>

          {/* Check-in Date */}
          <div>
            <label htmlFor="checkInDate" className="block text-sm font-semibold text-soft-white/80 mb-2">{t('booking.checkIn')} *</label>
            <div className="relative">
              <Calendar size={20} className={inputIconClasses} />
              <input
                type="date"
                id="checkInDate"
                name="checkInDate"
                value={formData.checkInDate}
                onChange={handleChange}
                min={today}
                max={maxDateString}
                className={`${inputBaseClasses} pl-10 pr-4 py-3 ${errors.checkInDate ? 'border-red-500' : ''}`}
              />
            </div>
            {errors.checkInDate && <p className="text-red-500 text-sm mt-1">{errors.checkInDate}</p>}
            <p className="text-xs text-soft-white/60 mt-1">{language === 'so' ? 'Waxaad buugin kartaa ilaa 46 maalmood hore' : 'You can book up to 46 days in advance.'}</p>
          </div>

          {/* Room Type */}
          <div>
            <label htmlFor="roomType" className="block text-sm font-semibold text-soft-white/80 mb-2">{t('booking.roomType')} *</label>
            <select
              id="roomType"
              name="roomType"
              value={formData.roomType}
              onChange={handleChange}
              className={`${inputBaseClasses} px-4 py-3 appearance-none ${errors.roomType ? 'border-red-500' : ''}`}
            >
              <option value="">{t('booking.selectRoom')}</option>
              {rooms.map((room) => (
                <option key={room.id} value={room.type} className="bg-navy-deepest text-soft-white">
                  {room.type} - KES {room.price.toLocaleString()}/{language === 'so' ? 'habeen' : 'night'}
                </option>
              ))}
            </select>
            {errors.roomType && <p className="text-red-500 text-sm mt-1">{errors.roomType}</p>}
          </div>

          {/* Number of Guests */}
          <div>
            <label htmlFor="numberOfGuests" className="block text-sm font-semibold text-soft-white/80 mb-2">{t('booking.guests')} *</label>
            <div className="relative">
              <Users size={20} className={inputIconClasses} />
              <input
                type="number"
                id="numberOfGuests"
                name="numberOfGuests"
                value={formData.numberOfGuests}
                onChange={handleChange}
                min="1"
                max="10"
                className={`${inputBaseClasses} pl-10 pr-4 py-3 ${errors.numberOfGuests ? 'border-red-500' : ''}`}
              />
            </div>
            {errors.numberOfGuests && <p className="text-red-500 text-sm mt-1">{errors.numberOfGuests}</p>}
          </div>

          {/* Special Requests */}
          <div>
            <label htmlFor="specialRequests" className="block text-sm font-semibold text-soft-white/80 mb-2">{t('booking.specialRequests')} ({language === 'so' ? 'Ikhtiyaari' : 'Optional'})</label>
            <div className="relative">
              <MessageSquare size={20} className="absolute left-3 top-3.5 text-soft-white/50" />
              <textarea
                id="specialRequests"
                name="specialRequests"
                value={formData.specialRequests}
                onChange={handleChange}
                rows="4"
                className={`${inputBaseClasses} pl-10 pr-4 py-3`}
                placeholder={t('booking.anySpecialRequests')}
              />
            </div>
          </div>

          {errors.submit && (
            <div className="bg-red-500/10 border border-red-500/30 text-red-300 px-4 py-3 rounded-lg">
              {errors.submit}
            </div>
          )}

          <div className="flex gap-4 pt-4">
            <button type="button" onClick={onClose} className="btn-glass flex-1">
              {t('booking.cancel')}
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className={`btn-gold flex-1 ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              {isSubmitting ? (language === 'so' ? 'Diraya...' : 'Sending...') : t('booking.submit')}
            </button>
          </div>

          <p className="text-sm text-soft-white/60 text-center">
            {language === 'so' ? 'Codsigaaga buugista ayaa loo diri doonaa WhatsApp si loo xaqiijiyo' : 'Your booking request will be sent via WhatsApp for confirmation.'}
          </p>
        </form>
      </div>
    </div>
  );
};

export default BookingForm;
