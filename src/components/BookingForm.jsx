import { useState, useEffect } from 'react';
import { X, Calendar, Users, Phone, User, MessageSquare, BedDouble, ChevronDown } from 'lucide-react';
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css';
import { handleWhatsAppBooking, validateBookingData } from '../services/bookingService';
import { bookingService } from '../services/supabase';
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
    specialRequests: '',
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (preSelectedRoom) {
      setFormData(prev => ({ ...prev, roomType: preSelectedRoom.type }));
    }
  }, [preSelectedRoom]);

  useEffect(() => {
    if (formData.checkInDate && formData.numberOfDays) {
      const checkIn = new Date(formData.checkInDate);
      const checkOut = new Date(checkIn.getTime() + formData.numberOfDays * 86400000);
      setFormData(prev => ({ ...prev, checkOutDate: checkOut.toISOString().split('T')[0] }));
    }
  }, [formData.checkInDate, formData.numberOfDays]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validation = validateBookingData(formData);
    if (!validation.isValid) {
      setErrors(validation.errors);
      return;
    }
    setIsSubmitting(true);
    try {
      await bookingService.createBooking(formData);
    } catch (err) {
      console.error('Failed to save booking to database:', err);
    }
    const success = handleWhatsAppBooking(formData);
    if (success) {
      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
        resetForm();
        onClose();
      }, 1800);
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
      specialRequests: '',
    });
    setErrors({});
  };

  if (!isOpen) return null;

  const field = 'w-full bg-white/5 border border-white/15 rounded-lg text-white placeholder-white/30 focus:outline-none focus:ring-1 focus:ring-gold-premium focus:border-gold-premium transition-colors duration-200 text-sm py-2 px-3';
  const label = 'block text-[11px] font-semibold text-white/50 uppercase tracking-wider mb-1';
  const icon  = 'absolute left-2.5 top-1/2 -translate-y-1/2 text-white/30 pointer-events-none';

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />

      {/* Modal */}
      <div
        className="relative w-full max-w-lg max-h-[95dvh] flex flex-col rounded-2xl overflow-hidden shadow-2xl"
        style={{ background: 'linear-gradient(145deg, #0d1b3e 0%, #0a1628 60%, #07111f 100%)', border: '1px solid rgba(212,175,55,0.25)' }}
        onClick={e => e.stopPropagation()}
      >
        {/* ── Header ── */}
        <div
          className="shrink-0 flex items-center justify-between px-4 py-3"
          style={{ background: 'linear-gradient(90deg, #c9a227, #f0c040, #c9a227)', borderBottom: '1px solid rgba(212,175,55,0.3)' }}
        >
          <div>
            <h2 className="text-base font-bold font-playfair text-navy-deepest leading-none">
              {t('booking.title')}
            </h2>
            <p className="text-[10px] text-navy-deepest/60 mt-0.5">Bin Ali Hotel · Benghadzi</p>
          </div>
          <button
            onClick={onClose}
            className="w-7 h-7 flex items-center justify-center rounded-full bg-black/15 hover:bg-black/25 transition-colors text-navy-deepest"
          >
            <X size={14} />
          </button>
        </div>

        {/* ── Success state ── */}
        {submitted ? (
          <div className="flex-1 flex flex-col items-center justify-center gap-3 p-8 text-center">
            <div className="w-14 h-14 rounded-full bg-green-500/15 flex items-center justify-center">
              <svg className="w-7 h-7 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <p className="text-white font-semibold text-sm">Booking sent via WhatsApp!</p>
            <p className="text-white/40 text-xs">We will confirm your reservation shortly.</p>
          </div>
        ) : (
          /* ── Form ── */
          <form
            onSubmit={handleSubmit}
            className="flex-1 overflow-y-auto custom-scrollbar"
            style={{ padding: '14px 16px 16px' }}
          >
            <div className="space-y-3">

              {/* Row 1 — Name + Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {/* Full Name */}
                <div>
                  <label className={label}>{t('booking.fullName')} <span className="text-gold-premium">*</span></label>
                  <div className="relative">
                    <User size={13} className={icon} />
                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      placeholder={t('booking.enterName')}
                      className={`${field} pl-8 ${errors.fullName ? 'border-red-500' : ''}`}
                    />
                  </div>
                  {errors.fullName && <p className="text-red-400 text-[10px] mt-0.5">{errors.fullName}</p>}
                </div>

                {/* Phone */}
                <div>
                  <label className={label}>{t('booking.phone')} <span className="text-gold-premium">*</span></label>
                  <PhoneInput
                    international
                    defaultCountry="SO"
                    value={formData.phoneNumber}
                    onChange={(value) => {
                      setFormData(prev => ({ ...prev, phoneNumber: value || '' }));
                      if (errors.phoneNumber) setErrors(prev => ({ ...prev, phoneNumber: '' }));
                    }}
                    className={`phone-input-custom text-sm ${errors.phoneNumber ? 'phone-input-error' : ''}`}
                    placeholder={t('booking.enterPhone')}
                  />
                  {errors.phoneNumber && <p className="text-red-400 text-[10px] mt-0.5">{errors.phoneNumber}</p>}
                </div>
              </div>

              {/* Row 2 — Check-in + Days */}
              <div className="grid grid-cols-2 gap-3">
                {/* Check-in */}
                <div>
                  <label className={label}>{t('booking.checkIn')} <span className="text-gold-premium">*</span></label>
                  <div className="relative">
                    <Calendar size={13} className={icon} />
                    <input
                      type="date"
                      name="checkInDate"
                      value={formData.checkInDate}
                      onChange={handleChange}
                      min={today}
                      max={maxDateString}
                      className={`${field} pl-8 ${errors.checkInDate ? 'border-red-500' : ''}`}
                    />
                  </div>
                  {errors.checkInDate && <p className="text-red-400 text-[10px] mt-0.5">{errors.checkInDate}</p>}
                </div>

                {/* Nights */}
                <div>
                  <label className={label}>{language === 'so' ? 'Tirada Habeenaha' : 'Nights'} <span className="text-gold-premium">*</span></label>
                  <div className="relative">
                    <Calendar size={13} className={icon} />
                    <input
                      type="number"
                      name="numberOfDays"
                      value={formData.numberOfDays}
                      onChange={handleChange}
                      min="1"
                      max="46"
                      className={`${field} pl-8 ${errors.numberOfDays ? 'border-red-500' : ''}`}
                    />
                  </div>
                  {errors.numberOfDays && <p className="text-red-400 text-[10px] mt-0.5">{errors.numberOfDays}</p>}
                </div>
              </div>

              {/* Check-out display (read-only) */}
              <div
                className="flex items-center gap-2 px-3 py-2 rounded-lg text-xs"
                style={{ background: 'rgba(212,175,55,0.07)', border: '1px solid rgba(212,175,55,0.2)' }}
              >
                <Calendar size={12} className="text-gold-premium shrink-0" />
                <span className="text-white/50">Check-out:</span>
                <span className="text-gold-premium font-semibold ml-1">
                  {new Date(formData.checkOutDate).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
                </span>
                <span className="ml-auto text-white/30">{formData.numberOfDays} night{formData.numberOfDays !== 1 ? 's' : ''}</span>
              </div>

              {/* Row 3 — Room + Guests */}
              <div className="grid grid-cols-2 gap-3">
                {/* Room Type */}
                <div>
                  <label className={label}>{t('booking.roomType')} <span className="text-gold-premium">*</span></label>
                  <div className="relative">
                    <BedDouble size={13} className={icon} />
                    <select
                      name="roomType"
                      value={formData.roomType}
                      onChange={handleChange}
                      className={`${field} pl-8 pr-7 appearance-none cursor-pointer ${errors.roomType ? 'border-red-500' : ''}`}
                    >
                      <option value="" className="bg-navy-deepest">{t('booking.selectRoom')}</option>
                      {rooms.map(room => (
                        <option key={room.id} value={room.type} className="bg-navy-deepest">
                          {room.type}
                        </option>
                      ))}
                    </select>
                    <ChevronDown size={12} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-white/30 pointer-events-none" />
                  </div>
                  {errors.roomType && <p className="text-red-400 text-[10px] mt-0.5">{errors.roomType}</p>}
                </div>

                {/* Guests */}
                <div>
                  <label className={label}>{t('booking.guests')} <span className="text-gold-premium">*</span></label>
                  <div className="relative">
                    <Users size={13} className={icon} />
                    <input
                      type="number"
                      name="numberOfGuests"
                      value={formData.numberOfGuests}
                      onChange={handleChange}
                      min="1"
                      max="10"
                      className={`${field} pl-8 ${errors.numberOfGuests ? 'border-red-500' : ''}`}
                    />
                  </div>
                  {errors.numberOfGuests && <p className="text-red-400 text-[10px] mt-0.5">{errors.numberOfGuests}</p>}
                </div>
              </div>

              {/* Special Requests */}
              <div>
                <label className={label}>
                  {t('booking.specialRequests')}
                  <span className="normal-case ml-1 text-white/30 font-normal">({language === 'so' ? 'Ikhtiyaari' : 'Optional'})</span>
                </label>
                <div className="relative">
                  <MessageSquare size={13} className="absolute left-2.5 top-2.5 text-white/30 pointer-events-none" />
                  <textarea
                    name="specialRequests"
                    value={formData.specialRequests}
                    onChange={handleChange}
                    rows={2}
                    placeholder={t('booking.anySpecialRequests')}
                    className={`${field} pl-8 resize-none`}
                  />
                </div>
              </div>

              {errors.submit && (
                <p className="text-red-400 text-xs bg-red-500/10 border border-red-500/20 rounded-lg px-3 py-2">
                  {errors.submit}
                </p>
              )}

            </div>

            {/* ── Footer ── */}
            <div className="mt-4 flex gap-2">
              <button
                type="button"
                onClick={onClose}
                className="flex-none px-4 py-2.5 rounded-xl text-sm font-semibold text-white/60 border border-white/10 hover:border-white/20 hover:text-white/80 transition-colors"
              >
                {t('booking.cancel')}
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex-1 py-2.5 rounded-xl text-sm font-bold text-navy-deepest disabled:opacity-60 transition-all active:scale-95 flex items-center justify-center gap-2"
                style={{ background: 'linear-gradient(135deg, #c9a227, #f0c040, #c9a227)', boxShadow: '0 4px 16px rgba(212,175,55,0.35)' }}
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
                    </svg>
                    {language === 'so' ? 'Diraya…' : 'Sending…'}
                  </>
                ) : (
                  <>
                    <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current shrink-0">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                      <path d="M12 0C5.373 0 0 5.373 0 12c0 2.124.554 4.118 1.528 5.845L.057 23.083a.75.75 0 00.932.932l5.238-1.471A11.943 11.943 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.907 0-3.694-.51-5.23-1.4l-.374-.22-3.886 1.09 1.09-3.885-.22-.375A9.955 9.955 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/>
                    </svg>
                    {t('booking.submit')}
                  </>
                )}
              </button>
            </div>

            <p className="text-center text-[10px] text-white/25 mt-3">
              {language === 'so'
                ? 'Codsigaaga waxaa loo diri doonaa WhatsApp si loo xaqiijiyo'
                : 'Your request will be sent via WhatsApp for confirmation'}
            </p>
          </form>
        )}
      </div>
    </div>
  );
};

export default BookingForm;
