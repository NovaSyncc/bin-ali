import { useState } from 'react';
import { X, Calendar, Users, Phone, User, MessageSquare } from 'lucide-react';
import { handleWhatsAppBooking, validateBookingData } from '../services/bookingService';
import { rooms } from '../data/rooms';

const BookingForm = ({ isOpen, onClose, preSelectedRoom = null }) => {
  // Get today's date in YYYY-MM-DD format
  const today = new Date().toISOString().split('T')[0];

  // Calculate max date (today + 46 days)
  const maxDate = new Date();
  maxDate.setDate(maxDate.getDate() + 46);
  const maxDateString = maxDate.toISOString().split('T')[0];

  const [formData, setFormData] = useState({
    fullName: '',
    phoneNumber: '',
    checkInDate: today,
    roomType: preSelectedRoom?.type || '',
    numberOfGuests: 1,
    specialRequests: ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error for this field
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate form data
    const validation = validateBookingData(formData);

    if (!validation.isValid) {
      setErrors(validation.errors);
      return;
    }

    setIsSubmitting(true);

    // Send to WhatsApp - opens directly
    const success = handleWhatsAppBooking(formData);

    if (success) {
      // Close modal and reset form immediately
      resetForm();
      onClose();
    } else {
      setErrors({ submit: 'Failed to open WhatsApp. Please try again.' });
    }

    setIsSubmitting(false);
  };

  // Reset form
  const resetForm = () => {
    setFormData({
      fullName: '',
      phoneNumber: '',
      checkInDate: today,
      roomType: '',
      numberOfGuests: 1,
      specialRequests: ''
    });
    setErrors({});
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />

      <div className="relative glass-effect bg-white/95 rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-accent-gold/30">
        {/* Header */}
        <div className="sticky top-0 gold-gradient-bg text-primary-dark-green p-6 flex items-center justify-between rounded-t-3xl">
          <h2 className="text-2xl font-bold">Book Your Stay</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white/20 rounded-full transition-colors"
            aria-label="Close"
          >
            <X size={24} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Full Name */}
          <div>
            <label htmlFor="fullName" className="block text-sm font-semibold text-gray-700 mb-2">
              Full Name *
            </label>
            <div className="relative">
              <User size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                id="fullName"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                className={`w-full pl-10 pr-4 py-3 border rounded-xl focus:ring-2 focus:ring-accent-gold focus:border-transparent ${
                  errors.fullName ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Enter your full name"
              />
            </div>
            {errors.fullName && <p className="text-red-500 text-sm mt-1">{errors.fullName}</p>}
          </div>

          {/* Phone Number */}
          <div>
            <label htmlFor="phoneNumber" className="block text-sm font-semibold text-gray-700 mb-2">
              Phone Number *
            </label>
            <div className="relative">
              <Phone size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="tel"
                id="phoneNumber"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                className={`w-full pl-10 pr-4 py-3 border rounded-xl focus:ring-2 focus:ring-accent-gold focus:border-transparent ${
                  errors.phoneNumber ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="0745 386007 or +254745386007"
              />
            </div>
            {errors.phoneNumber && <p className="text-red-500 text-sm mt-1">{errors.phoneNumber}</p>}
          </div>

          {/* Check-in Date */}
          <div>
            <label htmlFor="checkInDate" className="block text-sm font-semibold text-gray-700 mb-2">
              Check-in Date *
            </label>
            <div className="relative">
              <Calendar size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="date"
                id="checkInDate"
                name="checkInDate"
                value={formData.checkInDate}
                onChange={handleChange}
                min={today}
                max={maxDateString}
                className={`w-full pl-10 pr-4 py-3 border rounded-xl focus:ring-2 focus:ring-accent-gold focus:border-transparent ${
                  errors.checkInDate ? 'border-red-500' : 'border-gray-300'
                }`}
              />
            </div>
            {errors.checkInDate && <p className="text-red-500 text-sm mt-1">{errors.checkInDate}</p>}
            <p className="text-xs text-gray-500 mt-1">You can book up to 46 days in advance</p>
          </div>

          {/* Room Type */}
          <div>
            <label htmlFor="roomType" className="block text-sm font-semibold text-gray-700 mb-2">
              Room Type *
            </label>
            <select
              id="roomType"
              name="roomType"
              value={formData.roomType}
              onChange={handleChange}
              className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-accent-gold focus:border-transparent ${
                errors.roomType ? 'border-red-500' : 'border-gray-300'
              }`}
            >
              <option value="">Select a room type</option>
              {rooms.map((room) => (
                <option key={room.id} value={room.type}>
                  {room.type} - KES {room.price.toLocaleString()}/night
                </option>
              ))}
            </select>
            {errors.roomType && <p className="text-red-500 text-sm mt-1">{errors.roomType}</p>}
          </div>

          {/* Number of Guests */}
          <div>
            <label htmlFor="numberOfGuests" className="block text-sm font-semibold text-gray-700 mb-2">
              Number of Guests *
            </label>
            <div className="relative">
              <Users size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="number"
                id="numberOfGuests"
                name="numberOfGuests"
                value={formData.numberOfGuests}
                onChange={handleChange}
                min="1"
                max="10"
                className={`w-full pl-10 pr-4 py-3 border rounded-xl focus:ring-2 focus:ring-accent-gold focus:border-transparent ${
                  errors.numberOfGuests ? 'border-red-500' : 'border-gray-300'
                }`}
              />
            </div>
            {errors.numberOfGuests && <p className="text-red-500 text-sm mt-1">{errors.numberOfGuests}</p>}
          </div>

          {/* Special Requests */}
          <div>
            <label htmlFor="specialRequests" className="block text-sm font-semibold text-gray-700 mb-2">
              Special Requests (Optional)
            </label>
            <div className="relative">
              <MessageSquare size={20} className="absolute left-3 top-3 text-gray-400" />
              <textarea
                id="specialRequests"
                name="specialRequests"
                value={formData.specialRequests}
                onChange={handleChange}
                rows="4"
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-accent-gold focus:border-transparent"
                placeholder="Any special requests or requirements..."
              />
            </div>
          </div>

          {/* Submit Error */}
          {errors.submit && (
            <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-xl">
              {errors.submit}
            </div>
          )}

          {/* Submit Button */}
          <div className="flex gap-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 cta-outline"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className={`flex-1 cta-gold ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              {isSubmitting ? 'Sending...' : 'Send Booking Request'}
            </button>
          </div>

          {/* Info Text */}
          <p className="text-sm text-gray-600 text-center">
            Your booking request will be sent via WhatsApp. Our team will confirm availability and pricing shortly.
          </p>
        </form>
      </div>
    </div>
  );
};

export default BookingForm;
