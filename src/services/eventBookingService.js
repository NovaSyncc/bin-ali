/**
 * Event Booking Service
 * Handles event booking requests via WhatsApp integration
 */

/**
 * Formats event booking data into a WhatsApp message
 * @param {Object} eventData - The event booking information
 * @returns {string} - Formatted message for WhatsApp
 */
export const formatEventWhatsAppMessage = (eventData) => {
  const {
    fullName,
    email,
    phoneNumber,
    eventType,
    eventDate,
    numberOfGuests,
    specialRequirements
  } = eventData;

  // Format date to readable format
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  // Create the WhatsApp message with Arabic greeting and closing
  const message = `🎉 EVENT BOOKING INQUIRY

السلام عليكم Bin Ali Hotel,

I would like to inquire about booking your venue for an event:

*Name:* ${fullName}
*Email:* ${email}
*Phone:* ${phoneNumber}

*Event Type:* ${eventType}
*Event Date:* ${formatDate(eventDate)}
*Number of Guests:* ${numberOfGuests}${specialRequirements ? `\n*Special Requirements:* ${specialRequirements}` : ''}

Please confirm availability and provide pricing details for this event.

جزاك الله خيرا`;

  return message;
};

/**
 * Redirects to WhatsApp with pre-filled event booking message
 * @param {Object} eventData - The event booking information
 * @returns {boolean} - Success status
 */
export const handleEventWhatsAppBooking = (eventData) => {
  try {
    // Get WhatsApp number from environment variable
    const whatsappNumber = import.meta.env.VITE_WHATSAPP_NUMBER || '254745386007';

    // Format the event booking message
    const message = formatEventWhatsAppMessage(eventData);

    // Encode the message for URL
    const encodedMessage = encodeURIComponent(message);

    // Create WhatsApp URL
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;

    // Open WhatsApp in new tab
    window.open(whatsappUrl, '_blank');

    return true;
  } catch (error) {
    console.error('Error sending event WhatsApp booking:', error);
    return false;
  }
};

/**
 * Validates event booking data before submission
 * @param {Object} eventData - The event booking information to validate
 * @returns {Object} - Validation result with isValid and errors
 */
export const validateEventBookingData = (eventData) => {
  const errors = {};

  // Validate full name
  if (!eventData.fullName || eventData.fullName.trim().length < 2) {
    errors.fullName = 'Please enter your full name';
  }

  // Validate email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!eventData.email || !emailRegex.test(eventData.email)) {
    errors.email = 'Please enter a valid email address';
  }

  // Validate phone number (Kenya format)
  const phoneRegex = /^(\+254|0)[17]\d{8}$/;
  if (!eventData.phoneNumber || !phoneRegex.test(eventData.phoneNumber.replace(/\s/g, ''))) {
    errors.phoneNumber = 'Please enter a valid Kenya phone number';
  }

  // Validate event type
  if (!eventData.eventType) {
    errors.eventType = 'Please select an event type';
  }

  // Validate event date
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const eventDate = new Date(eventData.eventDate);

  if (!eventData.eventDate) {
    errors.eventDate = 'Please select event date';
  } else if (eventDate < today) {
    errors.eventDate = 'Event date cannot be in the past';
  }

  // Validate number of guests
  if (!eventData.numberOfGuests || eventData.numberOfGuests < 1) {
    errors.numberOfGuests = 'Please enter number of guests';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};
