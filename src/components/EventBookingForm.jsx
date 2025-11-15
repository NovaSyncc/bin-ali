import { useState } from 'react';
import { X, Calendar, Users, Phone, User, Mail, MessageSquare, PartyPopper } from 'lucide-react';
import { handleEventWhatsAppBooking, validateEventBookingData } from '../services/eventBookingService';

const EventBookingForm = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phoneNumber: '',
    eventType: '',
    eventDate: '',
    numberOfGuests: '',
    specialRequirements: ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  // Get today's date in YYYY-MM-DD format for min date validation
  const today = new Date().toISOString().split('T')[0];

  const eventTypes = [
    'Wedding',
    'Conference',
    'Birthday Party',
    'Corporate Event',
    'Anniversary',
    'Other'
  ];

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
    const validation = validateEventBookingData(formData);

    if (!validation.isValid) {
      setErrors(validation.errors);
      return;
    }

    setIsSubmitting(true);

    // Send to WhatsApp
    const success = handleEventWhatsAppBooking(formData);

    if (success) {
      setShowSuccess(true);
      // Reset form after 2 seconds
      setTimeout(() => {
        resetForm();
        setShowSuccess(false);
        onClose();
      }, 2000);
    } else {
      setErrors({ submit: 'Failed to open WhatsApp. Please try again.' });
    }

    setIsSubmitting(false);
  };

  // Reset form
  const resetForm = () => {
    setFormData({
      fullName: '',
      email: '',
      phoneNumber: '',
      eventType: '',
      eventDate: '',
      numberOfGuests: '',
      specialRequirements: ''
    });
    setErrors({});
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
      {/* Dark overlay with glassmorphism */}
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />

      <div className="relative glass-effect bg-white/95 rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-accent-gold/30">
        {/* Header */}
        <div className="sticky top-0 gold-gradient-bg text-primary-dark-green p-6 flex items-center justify-between rounded-t-3xl">
          <div className="flex items-center gap-3">
            <PartyPopper size={28} className="text-primary-dark-green" />
            <h2 className="text-2xl font-bold">Book Your Event</h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white/20 rounded-full transition-colors"
            aria-label="Close"
          >
            <X size={24} />
          </button>
        </div>

        {/* Success Message */}
        {showSuccess && (
          <div className="bg-green-50 border border-green-200 text-green-800 px-6 py-4 m-6 rounded-2xl">
            <p className="font-semibold">Event inquiry sent successfully!</p>
            <p className="text-sm">You will be redirected to WhatsApp to complete your event booking.</p>
          </div>
        )}

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

          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
              Email Address *
            </label>
            <div className="relative">
              <Mail size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={`w-full pl-10 pr-4 py-3 border rounded-xl focus:ring-2 focus:ring-accent-gold focus:border-transparent ${
                  errors.email ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="your.email@example.com"
              />
            </div>
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
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

          {/* Event Type and Date */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="eventType" className="block text-sm font-semibold text-gray-700 mb-2">
                Event Type *
              </label>
              <select
                id="eventType"
                name="eventType"
                value={formData.eventType}
                onChange={handleChange}
                className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-accent-gold focus:border-transparent ${
                  errors.eventType ? 'border-red-500' : 'border-gray-300'
                }`}
              >
                <option value="">Select event type</option>
                {eventTypes.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
              {errors.eventType && <p className="text-red-500 text-sm mt-1">{errors.eventType}</p>}
            </div>

            <div>
              <label htmlFor="eventDate" className="block text-sm font-semibold text-gray-700 mb-2">
                Preferred Date *
              </label>
              <div className="relative">
                <Calendar size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="date"
                  id="eventDate"
                  name="eventDate"
                  value={formData.eventDate}
                  onChange={handleChange}
                  min={today}
                  className={`w-full pl-10 pr-4 py-3 border rounded-xl focus:ring-2 focus:ring-accent-gold focus:border-transparent ${
                    errors.eventDate ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
              </div>
              {errors.eventDate && <p className="text-red-500 text-sm mt-1">{errors.eventDate}</p>}
            </div>
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
                className={`w-full pl-10 pr-4 py-3 border rounded-xl focus:ring-2 focus:ring-accent-gold focus:border-transparent ${
                  errors.numberOfGuests ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Expected number of guests"
              />
            </div>
            {errors.numberOfGuests && <p className="text-red-500 text-sm mt-1">{errors.numberOfGuests}</p>}
          </div>

          {/* Special Requirements */}
          <div>
            <label htmlFor="specialRequirements" className="block text-sm font-semibold text-gray-700 mb-2">
              Special Requirements (Optional)
            </label>
            <div className="relative">
              <MessageSquare size={20} className="absolute left-3 top-3 text-gray-400" />
              <textarea
                id="specialRequirements"
                name="specialRequirements"
                value={formData.specialRequirements}
                onChange={handleChange}
                rows="4"
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-accent-gold focus:border-transparent"
                placeholder="Any special requirements or requests for your event..."
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
              {isSubmitting ? 'Sending...' : 'Send Event Inquiry'}
            </button>
          </div>

          {/* Info Text */}
          <p className="text-sm text-gray-600 text-center">
            Your event inquiry will be sent via WhatsApp. Our events team will contact you shortly with availability and pricing details.
          </p>
        </form>
      </div>
    </div>
  );
};

export default EventBookingForm;
