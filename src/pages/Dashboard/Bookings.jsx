import React, { useState, useEffect } from 'react';
import { bookingService } from '../../services/supabase';
import { format } from 'date-fns';
import { FaTrash, FaEye, FaSearch, FaTimes } from 'react-icons/fa';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Bookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [bookingToDelete, setBookingToDelete] = useState(null);

  useEffect(() => {
    fetchBookings();
    // No real-time subscription for bookings yet. Will add later if bookingService has it.
  }, []);

  const fetchBookings = async () => {
    setLoading(true);
    try {
      let fetchedBookings = [];
      if (searchTerm) {
        fetchedBookings = await bookingService.searchBookings(searchTerm);
      } else if (startDate && endDate) {
        fetchedBookings = await bookingService.filterBookingsByDate(startDate, endDate);
      } else {
        // Assuming there's a getAllBookings in bookingService or similar
        // For now, let's just get all bookings and sort by created_at
        const { data, error } = await bookingService.supabase
          .from('bookings')
          .select('*')
          .order('created_at', { ascending: false });
        if (error) throw error;
        fetchedBookings = data;
      }
      setBookings(fetchedBookings);
    } catch (error) {
      toast.error('Error fetching bookings: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = () => {
    fetchBookings();
  };

  const handleFilterByDate = () => {
    if (startDate && endDate) {
      fetchBookings();
    } else {
      toast.warn('Please select both start and end dates for filtering.');
    }
  };

  const handleClearFilters = () => {
    setSearchTerm('');
    setStartDate('');
    setEndDate('');
    fetchBookings();
  };

  const openDetailsModal = (booking) => {
    setSelectedBooking(booking);
    setIsDetailsModalOpen(true);
  };

  const closeDetailsModal = () => {
    setIsDetailsModalOpen(false);
    setSelectedBooking(null);
  };

  const openDeleteModal = (booking) => {
    setBookingToDelete(booking);
    setIsDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setBookingToDelete(null);
  };

  const handleDeleteBooking = async () => {
    if (!bookingToDelete) return;
    try {
      const { error } = await bookingService.supabase
        .from('bookings')
        .delete()
        .eq('id', bookingToDelete.id);
      if (error) throw error;
      toast.success('Booking deleted successfully!');
      fetchBookings(); // Refresh the list
      closeDeleteModal();
    } catch (error) {
      toast.error('Error deleting booking: ' + error.message);
    }
  };

  const handleWhatsAppClick = (phone) => {
    const message = encodeURIComponent("Hello, regarding your booking at Bin Ali Hotel...");
    window.open(`https://wa.me/${phone}?text=${message}`, '_blank');
  };

  return (
    <div className="p-4">
      <ToastContainer position="bottom-right" theme="dark" />
      <h2 className="text-3xl font-bold text-white mb-6">Booking Management</h2>

      <div className="premium-glass-card p-6 rounded-lg shadow-lg bg-gray-800 bg-opacity-75 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <div>
            <label htmlFor="search" className="block text-gray-300 text-sm font-bold mb-2">Search Customer/Phone:</label>
            <div className="flex">
              <input
                type="text"
                id="search"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-200"
                placeholder="Name or Phone"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <button
                onClick={handleSearch}
                className="ml-2 btn-gold px-4 py-2 rounded focus:outline-none focus:shadow-outline"
              >
                <FaSearch />
              </button>
            </div>
          </div>
          <div>
            <label htmlFor="startDate" className="block text-gray-300 text-sm font-bold mb-2">Check-in Date:</label>
            <input
              type="date"
              id="startDate"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-200"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="endDate" className="block text-gray-300 text-sm font-bold mb-2">Check-out Date:</label>
            <input
              type="date"
              id="endDate"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-200"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
            />
          </div>
        </div>
        <div className="flex justify-end gap-2">
          <button
            onClick={handleFilterByDate}
            className="btn-gold px-4 py-2 rounded focus:outline-none focus:shadow-outline"
          >
            Filter by Date
          </button>
          <button
            onClick={handleClearFilters}
            className="btn-glass px-4 py-2 rounded focus:outline-none focus:shadow-outline"
          >
            Clear Filters
          </button>
        </div>
      </div>

      {loading ? (
        <p className="text-gray-300">Loading bookings...</p>
      ) : bookings.length === 0 ? (
        <p className="text-gray-300">No bookings found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-gray-900 bg-opacity-75 rounded-lg shadow-lg">
            <thead>
              <tr className="bg-gray-800 text-gold uppercase text-sm leading-normal">
                <th className="py-3 px-6 text-left">Customer Name</th>
                <th className="py-3 px-6 text-left">Phone</th>
                <th className="py-3 px-6 text-left">Check-in</th>
                <th className="py-3 px-6 text-left">Check-out</th>
                <th className="py-3 px-6 text-left">Rooms</th>
                <th className="py-3 px-6 text-left">Guests</th>
                <th className="py-3 px-6 text-left">Actions</th>
              </tr>
            </thead>
            <tbody className="text-gray-300 text-sm font-light">
              {bookings.map((booking) => (
                <tr key={booking.id} className="border-b border-gray-700 hover:bg-gray-700">
                  <td className="py-3 px-6 text-left whitespace-nowrap">{booking.customer_name}</td>
                  <td className="py-3 px-6 text-left">{booking.phone}</td>
                  <td className="py-3 px-6 text-left">{format(new Date(booking.check_in_date), 'PPP')}</td>
                  <td className="py-3 px-6 text-left">{format(new Date(booking.check_out_date), 'PPP')}</td>
                  <td className="py-3 px-6 text-left">{booking.rooms}</td>
                  <td className="py-3 px-6 text-left">{booking.guests}</td>
                  <td className="py-3 px-6 text-left">
                    <div className="flex item-center justify-start">
                      <button onClick={() => openDetailsModal(booking)} className="w-4 mr-2 transform hover:text-gold hover:scale-110">
                        <FaEye />
                      </button>
                      <button onClick={() => openDeleteModal(booking)} className="w-4 mr-2 transform hover:text-red-500 hover:scale-110">
                        <FaTrash />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Booking Details Modal */}
      {isDetailsModalOpen && selectedBooking && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
          <div className="premium-glass-card p-6 rounded-lg shadow-lg w-full max-w-lg relative">
            <button onClick={closeDetailsModal} className="absolute top-3 right-3 text-gray-400 hover:text-white">
              <FaTimes size={20} />
            </button>
            <h3 className="text-2xl font-bold text-white mb-4">Booking Details</h3>
            <div className="text-gray-300 space-y-2">
              <p><strong>Customer Name:</strong> {selectedBooking.customer_name}</p>
              <p><strong>Phone:</strong> {selectedBooking.phone} <button onClick={() => handleWhatsAppClick(selectedBooking.phone)} className="ml-2 text-green-500 hover:underline">WhatsApp</button></p>
              <p><strong>Check-in:</strong> {format(new Date(selectedBooking.check_in_date), 'PPP')}</p>
              <p><strong>Check-out:</strong> {format(new Date(selectedBooking.check_out_date), 'PPP')}</p>
              <p><strong>Duration:</strong> {selectedBooking.duration} nights</p>
              <p><strong>Guests:</strong> {selectedBooking.guests}</p>
              <p><strong>Rooms:</strong> {selectedBooking.rooms}</p>
              <p><strong>Special Requests:</strong> {selectedBooking.special_requests || 'N/A'}</p>
              <p><strong>Booked On:</strong> {format(new Date(selectedBooking.created_at), 'Pp')}</p>
              <p><strong>Language:</strong> {selectedBooking.language}</p>
            </div>
            <div className="mt-6 flex justify-end">
              <button onClick={closeDetailsModal} className="btn-glass px-4 py-2 rounded">Close</button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {isDeleteModalOpen && bookingToDelete && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
          <div className="premium-glass-card p-6 rounded-lg shadow-lg w-full max-w-sm relative">
            <button onClick={closeDeleteModal} className="absolute top-3 right-3 text-gray-400 hover:text-white">
              <FaTimes size={20} />
            </button>
            <h3 className="text-xl font-bold text-white mb-4">Confirm Deletion</h3>
            <p className="text-gray-300 mb-6">Are you sure you want to delete the booking for <strong>{bookingToDelete.customer_name}</strong>?</p>
            <div className="flex justify-end gap-3">
              <button onClick={closeDeleteModal} className="btn-glass px-4 py-2 rounded">Cancel</button>
              <button onClick={handleDeleteBooking} className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700">Delete</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Bookings;