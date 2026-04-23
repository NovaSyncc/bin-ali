import React, { useState, useEffect, useRef } from 'react';
import { bookingService } from '../../services/supabase';
import { format } from 'date-fns';
import { FaWhatsapp, FaTimes, FaSearch, FaTrash } from 'react-icons/fa';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import logoSrc from '../../assets/images/logo.png';

// ── Helpers ───────────────────────────────────────────────────────────────────

function fmt(n) {
  return Number(n || 0).toLocaleString('en-US', { minimumFractionDigits: 0 });
}

function fmtDate(iso) {
  if (!iso) return '—';
  try { return format(new Date(iso), 'dd MMM yyyy'); } catch { return iso; }
}

function fmtDateTime(iso) {
  if (!iso) return '—';
  try { return format(new Date(iso), 'dd MMM yyyy, h:mm a'); } catch { return iso; }
}

function toWhatsApp(phone) {
  const clean = (phone || '').replace(/\D/g, '');
  if (clean.startsWith('254')) return clean;
  if (clean.startsWith('0') && clean.length >= 9) return '254' + clean.slice(1);
  return clean;
}

const STATUS = {
  pending:     { label: 'Pending',     bg: 'bg-amber-500/20 text-amber-400 border-amber-500/30' },
  confirmed:   { label: 'Confirmed',   bg: 'bg-blue-500/20 text-blue-400 border-blue-500/30' },
  checked_in:  { label: 'Checked In',  bg: 'bg-green-500/20 text-green-400 border-green-500/30' },
  checked_out: { label: 'Checked Out', bg: 'bg-gray-500/20 text-gray-400 border-gray-500/30' },
};

// ── Receipt doc ───────────────────────────────────────────────────────────────

function ReceiptDoc({ booking, logoDataUrl }) {
  const balance = Number(booking.total_amount || 0) - Number(booking.amount_paid || 0);
  return (
    <div style={{ fontFamily: "'Segoe UI', Arial, sans-serif", fontSize: 12, color: '#111', background: '#fff' }}>
      <div style={{ height: 5, background: '#1a237e', marginBottom: 14 }} />
      <div style={{ display: 'flex', alignItems: 'center', gap: 14, paddingBottom: 12, marginBottom: 12, borderBottom: '2px solid #1a237e' }}>
        <img src={logoDataUrl} alt="Bin Ali Hotel" style={{ width: 72, height: 72, objectFit: 'contain', flexShrink: 0 }} />
        <div style={{ flex: 1 }}>
          <div style={{ fontWeight: 800, fontSize: 16, color: '#1a237e' }}>BIN ALI HOTEL</div>
          <div style={{ fontSize: 10, color: '#555', marginTop: 2 }}>Eastleigh, Nairobi, Kenya</div>
          <div style={{ fontSize: 10, color: '#555' }}>Tel: +254 791 110 089</div>
        </div>
        <div style={{ textAlign: 'right', flexShrink: 0 }}>
          <div style={{ background: '#1a237e', color: '#fff', fontWeight: 800, fontSize: 13, letterSpacing: 2, padding: '5px 14px', borderRadius: 6, display: 'inline-block' }}>
            BOOKING CONFIRMATION
          </div>
          <div style={{ fontWeight: 700, fontSize: 12, marginTop: 6, color: '#1a237e' }}>{booking.booking_ref || '—'}</div>
          <div style={{ fontSize: 10, color: '#888', marginTop: 2 }}>Issued: {format(new Date(), 'dd MMM yyyy')}</div>
        </div>
      </div>

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

      <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 14 }}>
        <div style={{ minWidth: 220, background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: 8, padding: '10px 14px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, marginBottom: 5 }}>
            <span style={{ color: '#555' }}>Total Amount</span>
            <span style={{ fontWeight: 700 }}>KES {fmt(booking.total_amount)}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, marginBottom: 5 }}>
            <span style={{ color: '#16a34a' }}>Deposit Paid</span>
            <span style={{ fontWeight: 700, color: '#16a34a' }}>KES {fmt(booking.amount_paid)}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '2px solid #1a237e', paddingTop: 6, marginTop: 4 }}>
            <span style={{ fontWeight: 800, fontSize: 13, color: balance > 0 ? '#dc2626' : '#16a34a' }}>
              {balance > 0 ? 'Balance Due' : 'Fully Paid'}
            </span>
            <span style={{ fontWeight: 800, fontSize: 13, color: balance > 0 ? '#dc2626' : '#16a34a' }}>
              KES {fmt(balance)}
            </span>
          </div>
        </div>
      </div>

      {booking.receptionist_note && (
        <div style={{ background: '#fffbeb', border: '1px solid #fcd34d', borderRadius: 6, padding: '8px 12px', marginBottom: 14 }}>
          <div style={{ fontSize: 9, textTransform: 'uppercase', color: '#92400e', marginBottom: 3 }}>Note</div>
          <div style={{ fontSize: 11, color: '#78350f' }}>{booking.receptionist_note}</div>
        </div>
      )}

      <hr style={{ border: 'none', borderTop: '1px dashed #ccc', margin: '10px 0' }} />

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginTop: 8 }}>
        <div style={{ fontSize: 10, color: '#555' }}>
          <div style={{ fontWeight: 600, marginBottom: 2 }}>Status</div>
          <div style={{
            display: 'inline-block', background: '#1d4ed8', color: '#fff',
            fontWeight: 700, fontSize: 10, padding: '2px 10px', borderRadius: 4,
            textTransform: 'uppercase', letterSpacing: 1,
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
  const [bookings, setBookings]     = useState([]);
  const [loading, setLoading]       = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  // Modals
  const [selectedBooking, setSelectedBooking]     = useState(null);
  const [isDetailsOpen, setIsDetailsOpen]         = useState(false);
  const [isDeleteOpen, setIsDeleteOpen]           = useState(false);
  const [bookingToDelete, setBookingToDelete]     = useState(null);
  const [isConfirmOpen, setIsConfirmOpen]         = useState(false);
  const [bookingToConfirm, setBookingToConfirm]   = useState(null);
  const [isReceiptOpen, setIsReceiptOpen]         = useState(false);
  const [receiptBooking, setReceiptBooking]       = useState(null);

  // Confirm form
  const [roomNumber, setRoomNumber]   = useState('');
  const [totalAmount, setTotalAmount] = useState('');
  const [amountPaid, setAmountPaid]   = useState('');
  const [note, setNote]               = useState('');
  const [confirming, setConfirming]   = useState(false);

  // PDF
  const [logoDataUrl, setLogoDataUrl]     = useState(logoSrc);
  const [generatingPdf, setGeneratingPdf] = useState(false);
  const receiptRef = useRef(null);

  useEffect(() => {
    fetch(logoSrc).then(r => r.blob()).then(blob => new Promise(res => {
      const reader = new FileReader();
      reader.onload = () => res(reader.result);
      reader.readAsDataURL(blob);
    })).then(setLogoDataUrl).catch(() => {});
  }, []);

  useEffect(() => { fetchBookings(); }, []);

  const fetchBookings = async ({ search = searchTerm, status = statusFilter } = {}) => {
    setLoading(true);
    try {
      let data;
      if (search) {
        data = await bookingService.searchBookings(search);
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

  // ── Confirm ──────────────────────────────────────────────────────────────
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

  // ── Check In / Out ───────────────────────────────────────────────────────
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

  // ── Receipt / PDF / WhatsApp ─────────────────────────────────────────────
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
      const canvas = await html2canvas(receiptRef.current, { scale: 2, useCORS: true, backgroundColor: '#ffffff', logging: false });
      const pdf  = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a5' });
      const pdfW = pdf.internal.pageSize.getWidth();
      const pdfH = (canvas.height * pdfW) / canvas.width;
      pdf.addImage(canvas.toDataURL('image/png'), 'PNG', 0, 0, pdfW, pdfH);
      const fileName = `BinAli-${receiptBooking.booking_ref || receiptBooking.id}.pdf`;

      if (typeof navigator.canShare === 'function') {
        const blob = pdf.output('blob');
        const file = new File([blob], fileName, { type: 'application/pdf' });
        if (navigator.canShare({ files: [file] })) {
          await navigator.share({ title: `Booking Confirmation — ${receiptBooking.booking_ref}`, files: [file] });
          return;
        }
      }

      pdf.save(fileName);
      const phone = toWhatsApp(receiptBooking.phone);
      const text  = encodeURIComponent(
        `Dear ${receiptBooking.customer_name},\n\n` +
        `*BIN ALI HOTEL* — Booking Confirmation\n` +
        `Ref: *${receiptBooking.booking_ref || '—'}*\n` +
        `Room: *${receiptBooking.room_number || '—'}* (${receiptBooking.rooms})\n` +
        `Check-in: *${fmtDate(receiptBooking.check_in_date)}*\n` +
        `Check-out: *${fmtDate(receiptBooking.check_out_date)}*\n\n` +
        `Please find your booking confirmation PDF attached.\n\nThank you 🌟`
      );
      window.open(`https://wa.me/${phone}?text=${text}`, '_blank');
    } catch (err) {
      toast.error('Failed to generate PDF.');
    } finally {
      setGeneratingPdf(false);
    }
  };

  const filtered = bookings.filter(b => {
    if (statusFilter !== 'all' && b.status !== statusFilter) return false;
    if (searchTerm) {
      const q = searchTerm.toLowerCase();
      return b.customer_name?.toLowerCase().includes(q) || b.phone?.includes(q);
    }
    return true;
  });

  // ── Render ────────────────────────────────────────────────────────────────
  return (
    <div className="space-y-6">
      <ToastContainer position="bottom-right" theme="dark" />

      {/* ── Header ── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white font-playfair">Bookings</h2>
          <p className="text-sm text-gray-400 mt-0.5">{bookings.length} total booking{bookings.length !== 1 ? 's' : ''}</p>
        </div>
        <button
          onClick={() => fetchBookings()}
          className="flex items-center gap-2 px-4 py-2 bg-gold-premium/10 border border-gold-premium/30 text-gold-premium rounded-lg hover:bg-gold-premium/20 transition-colors text-sm font-semibold"
        >
          ↻ Refresh
        </button>
      </div>

      {/* ── Filters ── */}
      <div className="bg-gray-900/60 border border-white/5 rounded-xl p-4 flex flex-col sm:flex-row gap-3">
        {/* Search */}
        <div className="relative flex-1">
          <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-sm" />
          <input
            type="text"
            placeholder="Search by name or phone…"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && fetchBookings()}
            className="w-full pl-9 pr-4 py-2.5 bg-gray-800 border border-white/10 rounded-lg text-white text-sm placeholder-gray-500 focus:outline-none focus:border-gold-premium/50"
          />
        </div>
        {/* Status filter */}
        <select
          value={statusFilter}
          onChange={e => { setStatusFilter(e.target.value); fetchBookings({ status: e.target.value }); }}
          className="px-4 py-2.5 bg-gray-800 border border-white/10 rounded-lg text-white text-sm focus:outline-none focus:border-gold-premium/50"
        >
          <option value="all">All Statuses</option>
          <option value="pending">Pending</option>
          <option value="confirmed">Confirmed</option>
          <option value="checked_in">Checked In</option>
          <option value="checked_out">Checked Out</option>
        </select>
        <button
          onClick={() => fetchBookings()}
          className="px-5 py-2.5 bg-gold-premium text-navy-deepest font-bold rounded-lg text-sm hover:bg-gold-warm transition-colors"
        >
          Search
        </button>
      </div>

      {/* ── Booking Cards ── */}
      {loading ? (
        <div className="text-center py-16 text-gray-400">Loading bookings…</div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-16 text-gray-400 bg-gray-900/40 rounded-xl border border-white/5">
          <div className="text-4xl mb-3">📋</div>
          <p className="font-semibold text-white">No bookings found</p>
          <p className="text-sm mt-1">Bookings submitted from the hotel website will appear here.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {filtered.map(booking => (
            <div
              key={booking.id}
              className="bg-gray-900/60 border border-white/5 rounded-xl p-5 hover:border-white/10 transition-colors"
            >
              {/* Top row */}
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 mb-4">
                <div className="flex items-start gap-3">
                  {/* Avatar */}
                  <div className="w-10 h-10 rounded-full bg-gold-premium/20 border border-gold-premium/30 flex items-center justify-center text-gold-premium font-bold text-sm shrink-0">
                    {booking.customer_name?.[0]?.toUpperCase() || '?'}
                  </div>
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-semibold text-white">{booking.customer_name}</span>
                      {booking.booking_ref && (
                        <span className="text-xs font-mono text-gold-premium bg-gold-premium/10 px-2 py-0.5 rounded">
                          {booking.booking_ref}
                        </span>
                      )}
                    </div>
                    <div className="text-sm text-gray-400 mt-0.5">{booking.phone}</div>
                  </div>
                </div>
                <span className={`text-xs font-semibold px-3 py-1 rounded-full border ${STATUS[booking.status]?.bg || 'bg-gray-500/20 text-gray-400 border-gray-500/30'}`}>
                  {STATUS[booking.status]?.label || booking.status}
                </span>
              </div>

              {/* Details grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4 bg-black/20 rounded-lg p-3">
                <div>
                  <div className="text-xs text-gray-500 mb-0.5">Room Type</div>
                  <div className="text-sm text-white font-medium">{booking.rooms || '—'}</div>
                </div>
                <div>
                  <div className="text-xs text-gray-500 mb-0.5">Room No.</div>
                  <div className="text-sm text-white font-medium">{booking.room_number || '—'}</div>
                </div>
                <div>
                  <div className="text-xs text-gray-500 mb-0.5">Check-in</div>
                  <div className="text-sm text-white font-medium">{fmtDate(booking.check_in_date)}</div>
                </div>
                <div>
                  <div className="text-xs text-gray-500 mb-0.5">Check-out</div>
                  <div className="text-sm text-white font-medium">{fmtDate(booking.check_out_date)}</div>
                </div>
                <div>
                  <div className="text-xs text-gray-500 mb-0.5">Guests</div>
                  <div className="text-sm text-white font-medium">{booking.guests}</div>
                </div>
                <div>
                  <div className="text-xs text-gray-500 mb-0.5">Nights</div>
                  <div className="text-sm text-white font-medium">{booking.duration}</div>
                </div>
                <div>
                  <div className="text-xs text-gray-500 mb-0.5">Total</div>
                  <div className="text-sm text-white font-medium">KES {fmt(booking.total_amount)}</div>
                </div>
                <div>
                  <div className="text-xs text-gray-500 mb-0.5">Deposit Paid</div>
                  <div className="text-sm text-green-400 font-medium">KES {fmt(booking.amount_paid)}</div>
                </div>
              </div>

              {/* Action buttons */}
              <div className="flex flex-wrap gap-2">
                {/* View */}
                <button
                  onClick={() => { setSelectedBooking(booking); setIsDetailsOpen(true); }}
                  className="px-4 py-2 rounded-lg text-sm font-semibold bg-white/5 hover:bg-white/10 text-gray-300 border border-white/10 transition-colors"
                >
                  View Details
                </button>

                {/* Confirm (pending only) */}
                {(!booking.status || booking.status === 'pending') && (
                  <button
                    onClick={() => openConfirmModal(booking)}
                    className="px-4 py-2 rounded-lg text-sm font-semibold bg-blue-600 hover:bg-blue-700 text-white transition-colors"
                  >
                    ✓ Confirm & Assign Room
                  </button>
                )}

                {/* Check In (confirmed only) */}
                {booking.status === 'confirmed' && (
                  <button
                    onClick={() => handleCheckIn(booking)}
                    className="px-4 py-2 rounded-lg text-sm font-semibold bg-green-600 hover:bg-green-700 text-white transition-colors"
                  >
                    → Check In
                  </button>
                )}

                {/* Check Out (checked_in only) */}
                {booking.status === 'checked_in' && (
                  <button
                    onClick={() => handleCheckOut(booking)}
                    className="px-4 py-2 rounded-lg text-sm font-semibold bg-orange-600 hover:bg-orange-700 text-white transition-colors"
                  >
                    ← Check Out
                  </button>
                )}

                {/* Receipt */}
                {['confirmed', 'checked_in', 'checked_out'].includes(booking.status) && (
                  <button
                    onClick={() => openReceipt(booking)}
                    className="px-4 py-2 rounded-lg text-sm font-semibold bg-gold-premium/20 hover:bg-gold-premium/30 text-gold-premium border border-gold-premium/30 transition-colors flex items-center gap-2"
                  >
                    🧾 Receipt & WhatsApp
                  </button>
                )}

                {/* WhatsApp quick contact */}
                <a
                  href={`https://wa.me/${toWhatsApp(booking.phone)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 rounded-lg text-sm font-semibold bg-green-500/10 hover:bg-green-500/20 text-green-400 border border-green-500/20 transition-colors flex items-center gap-2"
                >
                  <FaWhatsapp /> Chat
                </a>

                {/* Delete */}
                <button
                  onClick={() => { setBookingToDelete(booking); setIsDeleteOpen(true); }}
                  className="ml-auto px-4 py-2 rounded-lg text-sm font-semibold bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20 transition-colors"
                >
                  <FaTrash />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ── Details Modal ──────────────────────────────────────────────────── */}
      {isDetailsOpen && selectedBooking && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-900 border border-white/10 rounded-2xl p-6 w-full max-w-md shadow-2xl relative">
            <button onClick={() => setIsDetailsOpen(false)} className="absolute top-4 right-4 text-gray-500 hover:text-white">
              <FaTimes />
            </button>
            <h3 className="text-xl font-bold text-white font-playfair mb-4">Booking Details</h3>
            <div className="space-y-2 text-sm">
              {[
                ['Ref', selectedBooking.booking_ref || '—'],
                ['Status', STATUS[selectedBooking.status]?.label || 'Pending'],
                ['Guest', selectedBooking.customer_name],
                ['Phone', selectedBooking.phone],
                ['Room Type', selectedBooking.rooms],
                ['Assigned Room', selectedBooking.room_number || '—'],
                ['Check-in', fmtDate(selectedBooking.check_in_date)],
                ['Check-out', fmtDate(selectedBooking.check_out_date)],
                ['Duration', `${selectedBooking.duration} night(s)`],
                ['Guests', selectedBooking.guests],
                ['Total', `KES ${fmt(selectedBooking.total_amount)}`],
                ['Deposit Paid', `KES ${fmt(selectedBooking.amount_paid)}`],
                ['Balance Due', `KES ${fmt(Number(selectedBooking.total_amount || 0) - Number(selectedBooking.amount_paid || 0))}`],
                ['Booked On', fmtDateTime(selectedBooking.created_at)],
              ].map(([label, value]) => (
                <div key={label} className="flex justify-between py-1.5 border-b border-white/5">
                  <span className="text-gray-400">{label}</span>
                  <span className="text-white font-medium">{value}</span>
                </div>
              ))}
              {selectedBooking.special_requests && (
                <div className="py-1.5">
                  <span className="text-gray-400 block mb-1">Special Requests</span>
                  <span className="text-white text-xs">{selectedBooking.special_requests}</span>
                </div>
              )}
              {selectedBooking.receptionist_note && (
                <div className="py-1.5">
                  <span className="text-gray-400 block mb-1">Note</span>
                  <span className="text-white text-xs">{selectedBooking.receptionist_note}</span>
                </div>
              )}
            </div>
            <div className="mt-5 flex gap-2">
              <a
                href={`https://wa.me/${toWhatsApp(selectedBooking.phone)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-green-600 hover:bg-green-700 text-white rounded-lg text-sm font-semibold transition-colors"
              >
                <FaWhatsapp /> WhatsApp
              </a>
              <button onClick={() => setIsDetailsOpen(false)} className="px-5 py-2.5 bg-white/5 hover:bg-white/10 text-gray-300 rounded-lg text-sm font-semibold transition-colors">
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── Confirm Modal ──────────────────────────────────────────────────── */}
      {isConfirmOpen && bookingToConfirm && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-900 border border-white/10 rounded-2xl p-6 w-full max-w-md shadow-2xl relative">
            <button onClick={() => setIsConfirmOpen(false)} className="absolute top-4 right-4 text-gray-500 hover:text-white">
              <FaTimes />
            </button>
            <h3 className="text-xl font-bold text-white font-playfair mb-1">Confirm Booking</h3>
            <p className="text-sm text-gray-400 mb-5">
              {bookingToConfirm.customer_name} · {bookingToConfirm.rooms} · {fmtDate(bookingToConfirm.check_in_date)}
            </p>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1.5">
                  Room Number <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  placeholder="e.g. 101"
                  value={roomNumber}
                  onChange={e => setRoomNumber(e.target.value)}
                  className="w-full px-4 py-3 bg-gray-800 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-gold-premium/60 text-sm"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1.5">
                    Total Amount (KES) <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="number"
                    min="0"
                    placeholder="0"
                    value={totalAmount}
                    onChange={e => setTotalAmount(e.target.value)}
                    className="w-full px-4 py-3 bg-gray-800 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-gold-premium/60 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1.5">
                    Deposit Paid (KES)
                  </label>
                  <input
                    type="number"
                    min="0"
                    placeholder="0"
                    value={amountPaid}
                    onChange={e => setAmountPaid(e.target.value)}
                    className="w-full px-4 py-3 bg-gray-800 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-gold-premium/60 text-sm"
                  />
                </div>
              </div>
              {totalAmount && amountPaid && (
                <div className="flex justify-between items-center bg-black/30 rounded-lg px-4 py-3 text-sm">
                  <span className="text-gray-400">Balance Due</span>
                  <span className={`font-bold ${Number(totalAmount) - Number(amountPaid) > 0 ? 'text-red-400' : 'text-green-400'}`}>
                    KES {fmt(Number(totalAmount) - Number(amountPaid))}
                  </span>
                </div>
              )}
              <div>
                <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1.5">
                  Note (optional)
                </label>
                <textarea
                  rows={2}
                  placeholder="Any notes for the guest…"
                  value={note}
                  onChange={e => setNote(e.target.value)}
                  className="w-full px-4 py-3 bg-gray-800 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-gold-premium/60 text-sm resize-none"
                />
              </div>
            </div>

            <div className="mt-6 flex gap-3">
              <button
                onClick={() => setIsConfirmOpen(false)}
                className="flex-1 py-3 bg-white/5 hover:bg-white/10 text-gray-300 rounded-lg text-sm font-semibold transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirm}
                disabled={confirming}
                className="flex-1 py-3 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white rounded-lg text-sm font-bold transition-colors"
              >
                {confirming ? 'Saving…' : '✓ Confirm Booking'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── Receipt Modal ──────────────────────────────────────────────────── */}
      {isReceiptOpen && receiptBooking && (
        <div className="fixed inset-0 bg-black/90 flex items-start justify-center z-50 p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl my-6 overflow-hidden">
            <div className="flex items-center justify-between bg-gray-900 px-5 py-4">
              <div>
                <p className="text-white font-bold text-sm">{receiptBooking.booking_ref || 'Receipt'}</p>
                <p className="text-gray-400 text-xs">{receiptBooking.customer_name}</p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={handleSendWhatsApp}
                  disabled={generatingPdf}
                  className="flex items-center gap-2 bg-green-500 hover:bg-green-600 disabled:opacity-50 text-white px-4 py-2 rounded-lg text-sm font-bold transition-colors"
                >
                  <FaWhatsapp />
                  {generatingPdf ? 'Generating…' : 'Send via WhatsApp'}
                </button>
                <button onClick={() => setIsReceiptOpen(false)} className="text-gray-400 hover:text-white p-2 rounded-lg transition-colors">
                  <FaTimes />
                </button>
              </div>
            </div>
            <div className="p-6 bg-gray-100">
              <div ref={receiptRef} style={{ width: 520, background: '#fff', padding: '32px 36px', margin: '0 auto', borderRadius: 4 }}>
                <ReceiptDoc booking={receiptBooking} logoDataUrl={logoDataUrl} />
              </div>
              <p className="text-center text-xs text-gray-500 mt-3">PDF will be downloaded and WhatsApp will open to send it to the guest</p>
            </div>
          </div>
        </div>
      )}

      {/* ── Delete Modal ───────────────────────────────────────────────────── */}
      {isDeleteOpen && bookingToDelete && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-900 border border-white/10 rounded-2xl p-6 w-full max-w-sm shadow-2xl relative">
            <button onClick={() => setIsDeleteOpen(false)} className="absolute top-4 right-4 text-gray-500 hover:text-white">
              <FaTimes />
            </button>
            <div className="text-3xl mb-3">🗑️</div>
            <h3 className="text-lg font-bold text-white mb-2">Delete Booking?</h3>
            <p className="text-gray-400 text-sm mb-6">
              This will permanently delete the booking for <strong className="text-white">{bookingToDelete.customer_name}</strong>. This cannot be undone.
            </p>
            <div className="flex gap-3">
              <button onClick={() => setIsDeleteOpen(false)} className="flex-1 py-2.5 bg-white/5 hover:bg-white/10 text-gray-300 rounded-lg text-sm font-semibold transition-colors">
                Cancel
              </button>
              <button onClick={handleDeleteBooking} className="flex-1 py-2.5 bg-red-600 hover:bg-red-700 text-white rounded-lg text-sm font-bold transition-colors">
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Bookings;
