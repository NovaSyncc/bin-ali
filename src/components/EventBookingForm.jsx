import React, { useState } from 'react';
import { X } from 'lucide-react';

const EventBookingForm = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    eventType: '',
    date: '',
    guests: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Logic to handle event booking
    console.log('Event Booking Form Data:', formData);
    onClose();
  };

  if (!isOpen) return null;

  const inputBaseClasses = 'w-full bg-navy-deepest/50 border border-royal-blue/30 rounded-lg text-soft-white focus:ring-2 focus:ring-gold-premium transition-all duration-300 px-4 py-3';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-sm" onClick={onClose}>
      <div className="absolute inset-0 bg-slate-black/70" />

      <div className="relative premium-glass-card max-w-2xl w-full max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
        <div className="sticky top-0 bg-gradient-to-br from-royal-blue to-sky-blue text-white p-6 flex items-center justify-between rounded-t-3xl z-10">
          <h2 className="text-2xl font-bold font-playfair">Book an Event Hall</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-black/10 rounded-full transition-colors"
            aria-label="Close"
          >
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          {/* Form Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="name" className="block text-sm font-semibold text-soft-white/80 mb-2">Full Name</label>
              <input type="text" name="name" id="name" value={formData.name} onChange={handleChange} className={inputBaseClasses} required />
            </div>
            <div>
              <label htmlFor="phone" className="block text-sm font-semibold text-soft-white/80 mb-2">Phone</label>
              <input type="tel" name="phone" id="phone" value={formData.phone} onChange={handleChange} className={inputBaseClasses} required />
            </div>
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-semibold text-soft-white/80 mb-2">Email</label>
            <input type="email" name="email" id="email" value={formData.email} onChange={handleChange} className={inputBaseClasses} required />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="eventType" className="block text-sm font-semibold text-soft-white/80 mb-2">Event Type</label>
              <input type="text" name="eventType" id="eventType" value={formData.eventType} onChange={handleChange} className={inputBaseClasses} placeholder="e.g., Wedding, Conference" required />
            </div>
            <div>
              <label htmlFor="date" className="block text-sm font-semibold text-soft-white/80 mb-2">Event Date</label>
              <input type="date" name="date" id="date" value={formData.date} onChange={handleChange} className={inputBaseClasses} required />
            </div>
          </div>
          
          <div>
            <label htmlFor="guests" className="block text-sm font-semibold text-soft-white/80 mb-2">Number of Guests</label>
            <input type="number" name="guests" id="guests" value={formData.guests} onChange={handleChange} className={inputBaseClasses} min="1" placeholder="e.g., 150" required />
          </div>

          <div>
            <label htmlFor="message" className="block text-sm font-semibold text-soft-white/80 mb-2">Message (optional)</label>
            <textarea name="message" id="message" value={formData.message} onChange={handleChange} rows="4" className={inputBaseClasses} placeholder="Tell us more about your event..."></textarea>
          </div>

          {/* Actions */}
          <div className="flex gap-4 pt-4">
            <button type="button" onClick={onClose} className="btn-glass flex-1">Cancel</button>
            <button type="submit" className="btn-blue flex-1">Submit Booking</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EventBookingForm;