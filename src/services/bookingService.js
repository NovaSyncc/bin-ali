/**
 * Booking Service
 * Handles booking requests via WhatsApp integration
 *
 * FUTURE: When dashboard is requested (Phase 2), add Supabase integration here
 * SUPABASE_INTEGRATION: Will include handleDatabaseBooking() function
 */

/**
 * Formats booking data into a WhatsApp message
 * @param {Object} bookingData - The booking information
 * @returns {string} - Formatted message for WhatsApp
 */
export const formatWhatsAppMessage = (bookingData) => {
  const {
    fullName,
    phoneNumber,
    checkInDate,
    roomType,
    numberOfGuests,
    specialRequests
  } = bookingData;

  // Format dates to readable format
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  // Create the WhatsApp message with Arabic greeting and closing
  const message = `السلام عليكم Bin Ali Hotel,

I would like to make a booking:

*Name:* ${fullName}
*Phone:* ${phoneNumber}
*Check-in Date:* ${formatDate(checkInDate)}
*Room Type:* ${roomType}
*Number of Guests:* ${numberOfGuests}${specialRequests ? `\n*Special Requests:* ${specialRequests}` : ''}

Please confirm availability and total price.

جزاك الله خيرا`;

  return message;
};

/**
 * Redirects to WhatsApp with pre-filled booking message
 * @param {Object} bookingData - The booking information
 * @returns {boolean} - Success status
 */
export const handleWhatsAppBooking = (bookingData) => {
  try {
    // Get WhatsApp number from environment variable
    const whatsappNumber = import.meta.env.VITE_WHATSAPP_NUMBER || '254745386007';

    // Format the booking message
    const message = formatWhatsAppMessage(bookingData);

    // Encode the message for URL
    const encodedMessage = encodeURIComponent(message);

    // Create WhatsApp URL
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;

    // Open WhatsApp in new tab
    window.open(whatsappUrl, '_blank');

    return true;
  } catch (error) {
    console.error('Error sending WhatsApp booking:', error);
    return false;
  }
};

/**
 * Validates booking data before submission
 * @param {Object} bookingData - The booking information to validate
 * @returns {Object} - Validation result with isValid and errors
 */
export const validateBookingData = (bookingData) => {
  const errors = {};

  // Validate full name
  if (!bookingData.fullName || bookingData.fullName.trim().length < 2) {
    errors.fullName = 'Please enter your full name';
  }

  // Validate phone number (Kenya format)
  const phoneRegex = /^(\+254|0)[17]\d{8}$/;
  if (!bookingData.phoneNumber || !phoneRegex.test(bookingData.phoneNumber.replace(/\s/g, ''))) {
    errors.phoneNumber = 'Please enter a valid Kenya phone number';
  }

  // Validate check-in date
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const checkIn = new Date(bookingData.checkInDate);
  const maxDate = new Date();
  maxDate.setDate(maxDate.getDate() + 46);

  if (!bookingData.checkInDate) {
    errors.checkInDate = 'Please select check-in date';
  } else if (checkIn < today) {
    errors.checkInDate = 'Check-in date cannot be in the past';
  } else if (checkIn > maxDate) {
    errors.checkInDate = 'Check-in date cannot be more than 46 days in advance';
  }

  // Validate room type
  if (!bookingData.roomType) {
    errors.roomType = 'Please select a room type';
  }

  // Validate number of guests
  if (!bookingData.numberOfGuests || bookingData.numberOfGuests < 1) {
    errors.numberOfGuests = 'Please enter number of guests';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};

// TODO: Phase 2 - Add Supabase integration
// export const handleDatabaseBooking = async (bookingData) => {
//   // SUPABASE_INTEGRATION: Save booking to database
//   // const { data, error } = await supabase
//   //   .from('bookings')
//   //   .insert([bookingData]);
//   //
//   // if (error) throw error;
//   // return data;
// };
