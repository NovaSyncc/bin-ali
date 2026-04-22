import React, { useState, useEffect, useRef } from 'react';
import { bookingService } from '../../services/supabase';
import { format } from 'date-fns';
import {
  FaTrash, FaEye, FaSearch, FaTimes, FaCheckCircle,
  FaSignInAlt, FaSignOutAlt, FaFileInvoice, FaWhatsapp,
} from 'react-icons/fa';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import logoSrc from '../../assets/images/logo.png';

// ── Helpers ──────────────────────────────────────────────────────────────────

function fmt(n) {
  return Number(n || 0).toLocaleString('en-SO', { minimumFractionDigits: 0 });
}

function fmtDate(iso) {
  if (!iso) return '—';
  try { return format(new Date(iso), 'PPP'); } catch { return iso; }
}

function fmtDateTime(iso) {
  if (!iso) return '—';
  try { return format(new Date(iso), 'PPP p'); } catch { return iso; }
}

function toWhatsApp(phone) {
  const clean = (phone || '').replace(/\D/g, '');
  if (clean.startsWith('252')) return clean;
  if (clean.startsWith('0') && clean.length >= 9) return '252' + clean.slice(1);
  return clean;
}

// ── Status config ─────────────────────────────────────────────────────────────

const STATUS = {
  pending:     { label: 'Pending',     color: 'bg-yellow-500 text-black' },
  confirmed:   { label: 'Confirmed',   color: 'bg-blue-500 text-white'   },
  checked_in:  { label: 'Checked In',  color: 'bg-green-500 text-white'  },
  checked_out: { label: 'Checked Out', color: 'bg-gray-500 text-white'   },
};

// ── Receipt preview (rendered off-screen, captured by html2canvas) ────────────

function ReceiptDoc({ booking, logoDataUrl }) {
  const balance = Number(booking.total_amount || 0) - Number(booking.amount_paid || 0);

  return (
    <div style={{ fontFamily: "'Segoe UI', Arial, sans-serif", fontSize: 12, color: '#111', background: '#fff' }}>

      {/* Navy top bar */}
      <div style={{ height: 5, background: '#1a237e', marginBottom: 14 }} />

      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 14, paddingBottom: 12, marginBottom: 12, borderBottom: '2px solid #1a237e' }}>
        <img src={logoDataUrl} alt="Bin Ali Hotel" style={{ width: 72, height: 72, objectFit: 'contain', flexShrink: 0 }} />
        <div style={{ flex: 1 }}>
          <div style={{ fontWeight: 800, fontSize: 16, color: '#1a237e', letterSpacing: 0.5 }}>BIN ALI HOTEL</div>
          <div style={{ fontSize: 10, color: '#555', marginTop: 2 }}>Benghadzi, Somalia</div>
          <div style={{ fontSize: 10, color: '#555' }}>Tel: +252 745 386 007</div>
        </div>
        <div style={{ textAlign: 'right', flexShrink: 0 }}>
          <div style={{ background: '#1a237e', color: '#fff', fontWeight: 800, fontSize: 13, letterSpacing: 2, padding: '5px 14px', borderRadius: 6, display: 'inline-block' }}>
            BOOKING CONFIRMATION
          </div>
          <div style={{ fontWeight: 700, fontSize: 12, marginTop: 6, color: '#1a237e' }}>{booking.booking_ref || '—'}</div>
          <div style={{ fontSize: 10, color: '#888', marginTop: 2 }}>Issued: {format(new Date(), 'PPP')}</div>
        </div>
      </div>

      {/* Guest info */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6px 20px', marginBottom: 14 }}>
        {[
          ['Guest Name', booking.customer_name],
          ['Phone', booking.phone],
          ['Check-in', fmtDate(booking.check_in_date)],
          ['Check-out', fmtDate(booking.check_out_date)],
          ['Duration', `${booking.duration || '—'} night(s)`],
          ['Guests', booking.guests],
          ['Room Type', booking.rooms],
          ['Assigned Room', booking.room_number || '—'],
        ].map(([label, value]) => (
          <div key={label}>
            <div style={{ fontSize: 9, textTransform: 'uppercase', letterSpacing: 0.6, color: '#888', marginBottom: 1 }}>{label}</div>
            <div style={{ fontWeight: 600, fontSize: 11 }}>{value || '—'}</div>
          </div>
        ))}
      </div>

      <hr style={{ border: 'none', borderTop: '1px dashed #ccc', margin: '10px 0' }} />

      {/* Payment summary */}
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 14 }}>
        <div style={{ minWidth: 220, background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: 8, padding: '10px 14px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, marginBottom: 5 }}>
            <span style={{ color: '#555' }}>Total Amount</span>
            <span style={{ fontWeight: 700 }}>USD {fmt(booking.total_amount)}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, marginBottom: 5 }}>
            <span style={{ color: '#16a34a' }}>Deposit Paid</span>
            <span style={{ fontWeight: 700, color: '#16a34a' }}>USD {fmt(booking.amount_paid)}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '2px solid #1a237e', paddingTop: 6, marginTop: 4 }}>
            <span style={{ fontWeight: 800, fontSize: 13, color: balance > 0 ? '#dc2626' : '#16a34a' }}>
              {balance > 0 ? 'Balance Due' : 'Fully Paid'}
            </span>
            <span style={{ fontWeight: 800, fontSize: 13, color: balance > 0 ? '#dc2626' : '#16a34a' }}>
              USD {fmt(balance)}
            </span>
          </div>
        </div>
      </div>

      {/* Note */}
      {booking.receptionist_note && (
        <div style={{ background: '#fffbeb', border: '1px solid #fcd34d', borderRadius: 6, padding: '8px 12px', marginBottom: 14 }}>
          <div style={{ fontSize: 9, textTransform: 'uppercase', color: '#92400e', letterSpacing: 0.5, marginBottom: 3 }}>Note</div>
          <div style={{ fontSize: 11, color: '#78350f' }}>{booking.receptionist_note}</div>
        </div>
      )}

      <hr style={{ border: 'none', borderTop: '1px dashed #ccc', margin: '10px 0' }} />

      {/* Footer */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginTop: 8 }}>
        <div style={{ fontSize: 10, color: '#555' }}>
          <div style={{ fontWeight: 600, marginBottom: 2 }}>Status</div>
          <div style={{
            display: 'inline-block',
            background: booking.status === 'confirmed' ? '#1d4ed8' : '#16a34a',
            color: '#fff', fontWeight: 700, fontSize: 10,
            padding: '2px 10px', borderRadius: 4, letterSpacing: 1,
            textTransform: 'uppercase',
          }}>
            {STATUS[booking.status]?.label || booking.status}
          </div>
        </div>
        <div style={{ textAlign: 'right', fontSize: 10, color: '#555' }}>
          <div>Thank you for choosing</div>
          <div style={{ fontWeight: 800, fontSize: 12, color: '#1a237e' }}>Bin Ali Hotel</div>
          <div style={{ marginTop: 2, color: '#888' }}>★ ★ ★ ★</div>
        </div>
      </div>

    </div>
  );
}

// ── Main component ────────────────────────────────────────────────────────────

const Bookings = () => {
  const [bookings, setBookings]               = useState([]);
  const [loading, setLoading]                 = useState(true);
  const [searchTerm, setSearchTerm]           = useState('');
  const [startDate, setStartDate]             = useState('');
  const [endDate, setEndDate]                 = useState('');
  const [statusFilter, setStatusFilter]       = useState('all');

  // Modals
  const [selectedBooking, setSelectedBooking]   = useState(null);
  const [isDetailsOpen, setIsDetailsOpen]       = useState(false);
  const [isDeleteOpen, setIsDeleteOpen]         = useState(false);
  const [bookingToDelete, setBookingToDelete]   = useState(null);
  const [isConfirmOpen, setIsConfirmOpen]       = useState(false);
  const [bookingToConfirm, setBookingToConfirm] = useState(null);
  const [isReceiptOpen, setIsReceiptOpen]       = useState(false);
  const [receiptBooking, setReceiptBooking]     = useState(null);

  // Confirm form
  const [roomNumber, setRoomNumber]     = useState('');
  const [totalAmount, setTotalAmount]   = useState('');
  const [amountPaid, setAmountPaid]     = useState('');
  const [note, setNote]                 = useState('');
  const [confirming, setConfirming]     = useState(false);

  // PDF
  const [logoDataUrl, setLogoDataUrl]   = useState(logoSrc);
  const [generatingPdf, setGeneratingPdf] = useState(false);
  const receiptRef = useRef(null);

  // Preload logo as base64 so html2canvas captures it reliably
  useEffect(() => {
    fetch(logoSrc)
      .then(r => r.blob())
      .then(blob => new Promise(res => {
        const reader = new FileReader();
        reader.onload = () => res(reader.result);
        reader.readAsDataURL(blob);
      }))
      .then(setLogoDataUrl)
      .catch(() => {});
  }, []);

  useEffect(() => { fetchBookings(); }, []);

  const fetchBookings = async ({ search = searchTerm, start = startDate, end = endDate, status = statusFilter } = {}) => {
    setLoading(true);
    try {
      let data;
      if (search) {
        data = await bookingService.searchBookings(search);
      } else if (start && end) {
        data = await bookingService.filterBookingsByDate(start, end);
      } else if (status !== 'all') {
        data = await bookingService.filterBookingsByStatus(status);
      } else {
        data = await bookingService.getAllBookings();
      }
      setBookings(data);
    } catch (err) {
      toast.error('Error fetching bookings: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleClearFilters = () => {
    setSearchTerm(''); setStartDate(''); setEndDate(''); setStatusFilter('all');
    fetchBookings({ search: '', start: '', end: '', status: 'all' });
  };

  // ── Confirm booking ──────────────────────────────────────────────────────
  const openConfirmModal = (booking) => {
    setBookingToConfirm(booking);
    setRoomNumber(''); setTotalAmount(''); setAmountPaid(''); setNote('');
    setIsConfirmOpen(true);
  };

  const handleConfirm = async () => {
    if (!roomNumber || !totalAmount) {
      toast.warn('Room number and total amount are required.');
      return;
    }
    setConfirming(true);
    try {
      await bookingService.confirmBooking(bookingToConfirm.id, {
        roomNumber, totalAmount: Number(totalAmount),
        amountPaid: Number(amountPaid) || 0, note,
      });
      toast.success('Booking confirmed!');
      setIsConfirmOpen(false);
      fetchBookings();
    } catch (err) {
      toast.error('Error: ' + err.message);
    } finally {
      setConfirming(false);
    }
  };

  // ── Stage transitions ────────────────────────────────────────────────────
  const handleCheckIn = async (booking) => {
    try {
      await bookingService.checkIn(booking.id);
      toast.success(`${booking.customer_name} checked in!`);
      fetchBookings();
    } catch (err) {
      toast.error('Error: ' + err.message);
    }
  };

  const handleCheckOut = async (booking) => {
    try {
      await bookingService.checkOut(booking.id);
      toast.success(`${booking.customer_name} checked out!`);
      fetchBookings();
    } catch (err) {
      toast.error('Error: ' + err.message);
    }
  };

  // ── Delete ───────────────────────────────────────────────────────────────
  const handleDeleteBooking = async () => {
    try {
      await bookingService.deleteBooking(bookingToDelete.id);
      toast.success('Booking deleted.');
      setIsDeleteOpen(false);
      fetchBookings();
    } catch (err) {
      toast.error('Error: ' + err.message);
    }
  };

  // ── Receipt PDF + WhatsApp ───────────────────────────────────────────────
  const openReceipt = (booking) => {
    setReceiptBooking(booking);
    setIsReceiptOpen(true);
  };

  const handleSendWhatsApp = async () => {
    if (!receiptRef.current || !receiptBooking) return;
    setGeneratingPdf(true);
    try {
      const html2canvas = (await import('html2canvas')).default;
      const { jsPDF }   = await import('jspdf');

      const canvas = await html2canvas(receiptRef.current, {
        scale: 2, useCORS: true, backgroundColor: '#ffffff', logging: false,
      });

      const pdf  = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a5' });
      const pdfW = pdf.internal.pageSize.getWidth();
      const pdfH = (canvas.height * pdfW) / canvas.width;
      pdf.addImage(canvas.toDataURL('image/png'), 'PNG', 0, 0, pdfW, pdfH);

      const fileName = `BinAli-${receiptBooking.booking_ref || receiptBooking.id}.pdf`;

      // Mobile: Web Share API
      if (typeof navigator.canShare === 'function') {
        const blob = pdf.output('blob');
        const file = new File([blob], fileName, { type: 'application/pdf' });
        if (navigator.canShare({ files: [file] })) {
          await navigator.share({ title: `Booking Confirmation — ${receiptBooking.booking_ref}`, files: [file] });
          return;
        }
      }

      // Desktop: download + open WhatsApp
      pdf.save(fileName);
      const phone = toWhatsApp(receiptBooking.phone);
      const text  = encodeURIComponent(
        `السلام عليكم ${receiptBooking.customer_name},\n\n` +
        `*BIN ALI HOTEL* — Booking Confirmation\n` +
        `Ref: *${receiptBooking.booking_ref || '—'}*\n` +
        `Room: *${receiptBooking.room_number || '—'}* (${receiptBooking.rooms})\n` +
        `Check-in: *${fmtDate(receiptBooking.check_in_date)}*\n` +
        `Check-out: *${fmtDate(receiptBooking.check_out_date)}*\n\n` +
        `Please find your booking confirmation PDF attached.\n\n` +
        `جزاك الله خيرا 🌟`
      );
      const waUrl = phone
        ? `https://wa.me/${phone}?text=${text}`
        : `https://wa.me/?text=${text}`;
      window.open(waUrl, '_blank');
    } catch (err) {
      console.error('PDF error:', err);
      toast.error('Failed to generate PDF.');
    } finally {
      setGeneratingPdf(false);
    }
  };

  // ── Render ───────────────────────────────────────────────────────────────
  return (
    <div className="p-4">
      <ToastContainer position="bottom-right" theme="dark" />
      <h2 className="text-3xl font-bold text-white mb-6">Booking Management</h2>

      {/* Filters */}
      <div className="premium-glass-card p-6 rounded-lg bg-gray-800 bg-opacity-75 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
          {/* Search */}
          <div>
            <label className="block text-gray-300 text-sm font-bold mb-2">Search</label>
            <div className="flex">
              <input
                type="text"
                className="shadow border rounded w-full py-2 px-3 text-gray-700 bg-gray-200 focus:outline-none"
                placeholder="Name or Phone"
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && fetchBookings()}
              />
              <button onClick={() => fetchBookings()} className="ml-2 btn-gold px-4 py-2 rounded">
                <FaSearch />
              </button>
            </div>
          </div>
          {/* Check-in */}
          <div>
            <label className="block text-gray-300 text-sm font-bold mb-2">Check-in From</label>
            <input type="date" className="shadow border rounded w-full py-2 px-3 text-gray-700 bg-gray-200 focus:outline-none"
              value={startDate} onChange={e => setStartDate(e.target.value)} />
          </div>
          {/* Check-out */}
          <div>
            <label className="block text-gray-300 text-sm font-bold mb-2">Check-out To</label>
            <input type="date" className="shadow border rounded w-full py-2 px-3 text-gray-700 bg-gray-200 focus:outline-none"
              value={endDate} onChange={e => setEndDate(e.target.value)} />
          </div>
          {/* Status filter */}
          <div>
            <label className="block text-gray-300 text-sm font-bold mb-2">Status</label>
            <select
              className="shadow border rounded w-full py-2 px-3 text-gray-700 bg-gray-200 focus:outline-none"
              value={statusFilter}
              onChange={e => { setStatusFilter(e.target.value); fetchBookings({ status: e.target.value }); }}
            >
              <option value="all">All</option>
              <option value="pending">Pending</option>
              <option value="confirmed">Confirmed</option>
              <option value="checked_in">Checked In</option>
              <option value="checked_out">Checked Out</option>
            </select>
          </div>
        </div>
        <div className="flex justify-end gap-2">
          <button onClick={() => fetchBookings()} className="btn-gold px-4 py-2 rounded">Apply Filters</button>
          <button onClick={handleClearFilters} className="btn-glass px-4 py-2 rounded">Clear</button>
        </div>
      </div>

      {/* Table */}
      {loading ? (
        <p className="text-gray-300">Loading bookings…</p>
      ) : bookings.length === 0 ? (
        <p className="text-gray-300">No bookings found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-gray-900 bg-opacity-75 rounded-lg shadow-lg">
            <thead>
              <tr className="bg-gray-800 text-gold uppercase text-sm leading-normal">
                <th className="py-3 px-4 text-left">Ref</th>
                <th className="py-3 px-4 text-left">Guest</th>
                <th className="py-3 px-4 text-left">Phone</th>
                <th className="py-3 px-4 text-left">Check-in</th>
                <th className="py-3 px-4 text-left">Check-out</th>
                <th className="py-3 px-4 text-left">Room</th>
                <th className="py-3 px-4 text-left">Status</th>
                <th className="py-3 px-4 text-left">Actions</th>
              </tr>
            </thead>
            <tbody className="text-gray-300 text-sm">
              {bookings.map(booking => (
                <tr key={booking.id} className="border-b border-gray-700 hover:bg-gray-700">
                  <td className="py-3 px-4 text-xs text-gold font-mono">{booking.booking_ref || '—'}</td>
                  <td className="py-3 px-4 whitespace-nowrap">{booking.customer_name}</td>
                  <td className="py-3 px-4">{booking.phone}</td>
                  <td className="py-3 px-4 whitespace-nowrap">{fmtDate(booking.check_in_date)}</td>
                  <td className="py-3 px-4 whitespace-nowrap">{fmtDate(booking.check_out_date)}</td>
                  <td className="py-3 px-4">{booking.room_number || booking.rooms}</td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${STATUS[booking.status]?.color || 'bg-gray-600 text-white'}`}>
                      {STATUS[booking.status]?.label || booking.status || 'Pending'}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2">
                      {/* View */}
                      <button title="View Details" onClick={() => { setSelectedBooking(booking); setIsDetailsOpen(true); }}
                        className="hover:text-gold hover:scale-110 transition-transform">
                        <FaEye />
                      </button>
                      {/* Confirm — only for pending */}
                      {(!booking.status || booking.status === 'pending') && (
                        <button title="Confirm & Assign Room" onClick={() => openConfirmModal(booking)}
                          className="hover:text-blue-400 hover:scale-110 transition-transform">
                          <FaCheckCircle />
                        </button>
                      )}
                      {/* Check In — only for confirmed */}
                      {booking.status === 'confirmed' && (
                        <button title="Check In" onClick={() => handleCheckIn(booking)}
                          className="hover:text-green-400 hover:scale-110 transition-transform">
                          <FaSignInAlt />
                        </button>
                      )}
                      {/* Check Out — only for checked_in */}
                      {booking.status === 'checked_in' && (
                        <button title="Check Out" onClick={() => handleCheckOut(booking)}
                          className="hover:text-orange-400 hover:scale-110 transition-transform">
                          <FaSignOutAlt />
                        </button>
                      )}
                      {/* Receipt — confirmed, checked_in, checked_out */}
                      {['confirmed', 'checked_in', 'checked_out'].includes(booking.status) && (
                        <button title="Generate & Send Receipt" onClick={() => openReceipt(booking)}
                          className="hover:text-gold hover:scale-110 transition-transform">
                          <FaFileInvoice />
                        </button>
                      )}
                      {/* Delete */}
                      <button title="Delete" onClick={() => { setBookingToDelete(booking); setIsDeleteOpen(true); }}
                        className="hover:text-red-500 hover:scale-110 transition-transform">
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

      {/* ── Details Modal ─────────────────────────────────────────────────── */}
      {isDetailsOpen && selectedBooking && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
          <div className="premium-glass-card p-6 rounded-lg shadow-lg w-full max-w-lg relative">
            <button onClick={() => setIsDetailsOpen(false)} className="absolute top-3 right-3 text-gray-400 hover:text-white"><FaTimes size={20} /></button>
            <h3 className="text-2xl font-bold text-white mb-4">Booking Details</h3>
            <div className="text-gray-300 space-y-2 text-sm">
              <p><strong>Ref:</strong> <span className="font-mono text-gold">{selectedBooking.booking_ref || '—'}</span></p>
              <p><strong>Status:</strong> <span className={`ml-1 px-2 py-0.5 rounded-full text-xs font-semibold ${STATUS[selectedBooking.status]?.color || 'bg-gray-600 text-white'}`}>{STATUS[selectedBooking.status]?.label || 'Pending'}</span></p>
              <p><strong>Guest:</strong> {selectedBooking.customer_name}</p>
              <p><strong>Phone:</strong> {selectedBooking.phone}</p>
              <p><strong>Room Type:</strong> {selectedBooking.rooms}</p>
              <p><strong>Assigned Room:</strong> {selectedBooking.room_number || '—'}</p>
              <p><strong>Check-in:</strong> {fmtDate(selectedBooking.check_in_date)}</p>
              <p><strong>Check-out:</strong> {fmtDate(selectedBooking.check_out_date)}</p>
              <p><strong>Duration:</strong> {selectedBooking.duration} night(s)</p>
              <p><strong>Guests:</strong> {selectedBooking.guests}</p>
              <p><strong>Total Amount:</strong> USD {fmt(selectedBooking.total_amount)}</p>
              <p><strong>Deposit Paid:</strong> USD {fmt(selectedBooking.amount_paid)}</p>
              <p><strong>Balance:</strong> USD {fmt(Number(selectedBooking.total_amount || 0) - Number(selectedBooking.amount_paid || 0))}</p>
              {selectedBooking.receptionist_note && <p><strong>Note:</strong> {selectedBooking.receptionist_note}</p>}
              {selectedBooking.special_requests && <p><strong>Special Requests:</strong> {selectedBooking.special_requests}</p>}
              <p><strong>Booked On:</strong> {fmtDateTime(selectedBooking.created_at)}</p>
              {selectedBooking.confirmed_at && <p><strong>Confirmed At:</strong> {fmtDateTime(selectedBooking.confirmed_at)}</p>}
              {selectedBooking.checked_in_at && <p><strong>Checked In At:</strong> {fmtDateTime(selectedBooking.checked_in_at)}</p>}
              {selectedBooking.checked_out_at && <p><strong>Checked Out At:</strong> {fmtDateTime(selectedBooking.checked_out_at)}</p>}
            </div>
            <div className="mt-6 flex justify-end gap-2">
              <button onClick={() => { setIsDetailsOpen(false); window.open(`https://wa.me/${toWhatsApp(selectedBooking.phone)}`, '_blank'); }}
                className="btn-gold px-4 py-2 rounded flex items-center gap-2">
                <FaWhatsapp /> WhatsApp
              </button>
              <button onClick={() => setIsDetailsOpen(false)} className="btn-glass px-4 py-2 rounded">Close</button>
            </div>
          </div>
        </div>
      )}

      {/* ── Confirm Modal ─────────────────────────────────────────────────── */}
      {isConfirmOpen && bookingToConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
          <div className="premium-glass-card p-6 rounded-lg shadow-lg w-full max-w-md relative">
            <button onClick={() => setIsConfirmOpen(false)} className="absolute top-3 right-3 text-gray-400 hover:text-white"><FaTimes size={20} /></button>
            <h3 className="text-2xl font-bold text-white mb-1">Confirm Booking</h3>
            <p className="text-gray-400 text-sm mb-5">{bookingToConfirm.customer_name} — {bookingToConfirm.rooms}</p>
            <div className="space-y-4">
              <div>
                <label className="block text-gray-300 text-sm font-bold mb-1">Room Number <span className="text-red-400">*</span></label>
                <input type="text" className="w-full py-2 px-3 rounded bg-gray-200 text-gray-800 focus:outline-none"
                  placeholder="e.g. 101" value={roomNumber} onChange={e => setRoomNumber(e.target.value)} />
              </div>
              <div>
                <label className="block text-gray-300 text-sm font-bold mb-1">Total Amount (USD) <span className="text-red-400">*</span></label>
                <input type="number" min="0" className="w-full py-2 px-3 rounded bg-gray-200 text-gray-800 focus:outline-none"
                  placeholder="0" value={totalAmount} onChange={e => setTotalAmount(e.target.value)} />
              </div>
              <div>
                <label className="block text-gray-300 text-sm font-bold mb-1">Deposit / Amount Paid (USD)</label>
                <input type="number" min="0" className="w-full py-2 px-3 rounded bg-gray-200 text-gray-800 focus:outline-none"
                  placeholder="0" value={amountPaid} onChange={e => setAmountPaid(e.target.value)} />
              </div>
              <div>
                <label className="block text-gray-300 text-sm font-bold mb-1">Note (optional)</label>
                <textarea rows={2} className="w-full py-2 px-3 rounded bg-gray-200 text-gray-800 focus:outline-none resize-none"
                  placeholder="Any notes for the guest…" value={note} onChange={e => setNote(e.target.value)} />
              </div>
            </div>
            <div className="mt-6 flex justify-end gap-2">
              <button onClick={() => setIsConfirmOpen(false)} className="btn-glass px-4 py-2 rounded">Cancel</button>
              <button onClick={handleConfirm} disabled={confirming}
                className="btn-gold px-6 py-2 rounded font-bold disabled:opacity-50">
                {confirming ? 'Confirming…' : 'Confirm Booking'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── Receipt Modal ─────────────────────────────────────────────────── */}
      {isReceiptOpen && receiptBooking && (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex items-start justify-center z-50 p-4 overflow-y-auto">
          <div className="bg-white rounded-lg shadow-2xl w-full max-w-2xl my-8">
            {/* Controls bar */}
            <div className="flex items-center justify-between bg-gray-900 px-5 py-3 rounded-t-lg">
              <span className="text-gray-300 text-sm font-mono">{receiptBooking.booking_ref || 'Booking Confirmation'}</span>
              <div className="flex gap-2">
                <button
                  onClick={handleSendWhatsApp}
                  disabled={generatingPdf}
                  className="flex items-center gap-2 bg-green-500 hover:bg-green-600 disabled:opacity-50 text-white px-4 py-2 rounded text-sm font-bold transition-colors"
                >
                  {generatingPdf ? 'Generating PDF…' : <><FaWhatsapp /> Send via WhatsApp</>}
                </button>
                <button onClick={() => setIsReceiptOpen(false)}
                  className="text-gray-400 hover:text-white px-3 py-2 rounded transition-colors">
                  <FaTimes />
                </button>
              </div>
            </div>

            {/* Receipt preview */}
            <div className="p-6 bg-gray-100 min-h-32">
              <div ref={receiptRef} style={{ width: 520, background: '#fff', padding: '32px 36px', margin: '0 auto', borderRadius: 4, boxShadow: '0 2px 12px rgba(0,0,0,0.1)' }}>
                <ReceiptDoc booking={receiptBooking} logoDataUrl={logoDataUrl} />
              </div>
              <p className="text-center text-xs text-gray-500 mt-3">Click "Send via WhatsApp" to generate PDF and share with guest</p>
            </div>
          </div>
        </div>
      )}

      {/* ── Delete Modal ──────────────────────────────────────────────────── */}
      {isDeleteOpen && bookingToDelete && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
          <div className="premium-glass-card p-6 rounded-lg shadow-lg w-full max-w-sm relative">
            <button onClick={() => setIsDeleteOpen(false)} className="absolute top-3 right-3 text-gray-400 hover:text-white"><FaTimes size={20} /></button>
            <h3 className="text-xl font-bold text-white mb-4">Confirm Deletion</h3>
            <p className="text-gray-300 mb-6">Delete booking for <strong>{bookingToDelete.customer_name}</strong>?</p>
            <div className="flex justify-end gap-3">
              <button onClick={() => setIsDeleteOpen(false)} className="btn-glass px-4 py-2 rounded">Cancel</button>
              <button onClick={handleDeleteBooking} className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700">Delete</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Bookings;
