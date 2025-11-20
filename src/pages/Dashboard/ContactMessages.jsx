import React, { useState, useEffect, useCallback } from 'react';
import { supabase } from '../../services/supabase'; // Assuming direct supabase client for contact submissions
import { format } from 'date-fns';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaEye, FaTrash, FaCheckCircle, FaEnvelopeOpen, FaReply, FaSearch, FaTimes } from 'react-icons/fa'; // Added FaReply for WhatsApp

const ContactMessages = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState('all'); // 'all', 'unread', 'read', 'responded'
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [messageToDelete, setMessageToDelete] = useState(null);

  const fetchMessages = useCallback(async () => {
    setLoading(true);
    try {
      let query = supabase.from('contact_submissions').select('*').order('created_at', { ascending: false });

      if (filterStatus !== 'all') {
        query = query.eq('status', filterStatus);
      }

      if (searchTerm) {
        query = query.or(`name.ilike.%${searchTerm}%,email.ilike.%${searchTerm}%`);
      }

      const { data, error } = await query;
      if (error) throw error;
      setMessages(data);
    } catch (error) {
      toast.error('Error fetching contact messages: ' + error.message);
    } finally {
      setLoading(false);
    }
  }, [filterStatus, searchTerm]);

  useEffect(() => {
    fetchMessages();

    const channel = supabase
      .channel('public:contact_submissions')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'contact_submissions' }, payload => {
        toast.info('New contact message received!');
        fetchMessages();
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [fetchMessages]);

  const openDetailsModal = (message) => {
    setSelectedMessage(message);
    setIsDetailsModalOpen(true);
  };

  const closeDetailsModal = () => {
    setIsDetailsModalOpen(false);
    setSelectedMessage(null);
  };

  const openDeleteModal = (message) => {
    setMessageToDelete(message);
    setIsDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setMessageToDelete(null);
  };

  const handleDeleteMessage = async () => {
    if (!messageToDelete) return;
    try {
      const { error } = await supabase
        .from('contact_submissions')
        .delete()
        .eq('id', messageToDelete.id);
      if (error) throw error;
      toast.success('Message deleted successfully!');
      fetchMessages();
      closeDeleteModal();
    } catch (error) {
      toast.error('Error deleting message: ' + error.message);
    }
  };

  const updateMessageStatus = async (id, newStatus) => {
    try {
      const { error } = await supabase
        .from('contact_submissions')
        .update({ status: newStatus })
        .eq('id', id);
      if (error) throw error;
      toast.success('Message status updated!');
      fetchMessages();
      if (selectedMessage && selectedMessage.id === id) {
        setSelectedMessage(prev => ({ ...prev, status: newStatus }));
      }
    } catch (error) {
      toast.error('Error updating status: ' + error.message);
    }
  };

  const handleWhatsAppReply = (phone, message) => {
    const formattedMessage = encodeURIComponent(`Regarding your contact message: "${message}"\n\n`);
    window.open(`https://wa.me/${phone}?text=${formattedMessage}`, '_blank');
  };

  return (
    <div className="p-4">
      <ToastContainer position="bottom-right" theme="dark" />
      <h2 className="text-3xl font-bold text-white mb-6">Contact Messages Management</h2>

      <div className="premium-glass-card p-6 rounded-lg shadow-lg bg-gray-800 bg-opacity-75 mb-6">
        <div className="flex flex-col md:flex-row justify-between items-center mb-4 gap-4">
          <div className="flex-1 w-full md:w-auto">
            <label htmlFor="search" className="sr-only">Search Messages</label>
            <div className="relative">
              <input
                type="text"
                id="search"
                className="shadow appearance-none border rounded w-full py-2 px-3 pl-10 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-200"
                placeholder="Search by name or email"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
            </div>
          </div>
          <div className="w-full md:w-auto flex items-center justify-end gap-2">
            <label htmlFor="filterStatus" className="text-gray-300 text-sm font-bold">Status:</label>
            <select
              id="filterStatus"
              className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-200"
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
            >
              <option value="all">All</option>
              <option value="unread">Unread</option>
              <option value="read">Read</option>
              <option value="responded">Responded</option>
            </select>
          </div>
        </div>
      </div>

      {loading ? (
        <p className="text-gray-300">Loading messages...</p>
      ) : messages.length === 0 ? (
        <p className="text-gray-300">No contact messages found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-gray-900 bg-opacity-75 rounded-lg shadow-lg">
            <thead>
              <tr className="bg-gray-800 text-gold uppercase text-sm leading-normal">
                <th className="py-3 px-6 text-left">Name</th>
                <th className="py-3 px-6 text-left">Email</th>
                <th className="py-3 px-6 text-left">Subject</th>
                <th className="py-3 px-6 text-left">Status</th>
                <th className="py-3 px-6 text-left">Date</th>
                <th className="py-3 px-6 text-left">Actions</th>
              </tr>
            </thead>
            <tbody className="text-gray-300 text-sm font-light">
              {messages.map((message) => (
                <tr key={message.id} className="border-b border-gray-700 hover:bg-gray-700">
                  <td className="py-3 px-6 text-left whitespace-nowrap">{message.name}</td>
                  <td className="py-3 px-6 text-left">{message.email}</td>
                  <td className="py-3 px-6 text-left">{message.subject}</td>
                  <td className="py-3 px-6 text-left">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      message.status === 'unread' ? 'bg-red-500' : message.status === 'read' ? 'bg-blue-500' : 'bg-green-500'
                    }`}>
                      {message.status}
                    </span>
                  </td>
                  <td className="py-3 px-6 text-left">{format(new Date(message.created_at), 'Pp')}</td>
                  <td className="py-3 px-6 text-left">
                    <div className="flex item-center justify-start">
                      <button onClick={() => openDetailsModal(message)} className="w-4 mr-2 transform hover:text-gold hover:scale-110">
                        <FaEye />
                      </button>
                      <button onClick={() => updateMessageStatus(message.id, 'read')} className="w-4 mr-2 transform hover:text-blue-400 hover:scale-110" title="Mark as Read">
                        <FaEnvelopeOpen />
                      </button>
                      <button onClick={() => updateMessageStatus(message.id, 'responded')} className="w-4 mr-2 transform hover:text-green-500 hover:scale-110" title="Mark as Responded">
                        <FaCheckCircle />
                      </button>
                      <button onClick={() => openDeleteModal(message)} className="w-4 mr-2 transform hover:text-red-500 hover:scale-110" title="Delete Message">
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

      {/* Message Details Modal */}
      {isDetailsModalOpen && selectedMessage && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
          <div className="premium-glass-card p-6 rounded-lg shadow-lg w-full max-w-lg relative">
            <button onClick={closeDetailsModal} className="absolute top-3 right-3 text-gray-400 hover:text-white">
              <FaTimes size={20} />
            </button>
            <h3 className="text-2xl font-bold text-white mb-4">Contact Message Details</h3>
            <div className="text-gray-300 space-y-2">
              <p><strong>Name:</strong> {selectedMessage.name}</p>
              <p><strong>Email:</strong> {selectedMessage.email}</p>
              <p><strong>Subject:</strong> {selectedMessage.subject}</p>
              <p><strong>Message:</strong> {selectedMessage.message}</p>
              <p><strong>Status:</strong> <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                      selectedMessage.status === 'unread' ? 'bg-red-500' : selectedMessage.status === 'read' ? 'bg-blue-500' : 'bg-green-500'
                    }`}>
                      {selectedMessage.status}
                    </span>
              </p>
              <p><strong>Received On:</strong> {format(new Date(selectedMessage.created_at), 'Pp')}</p>
            </div>
            <div className="mt-6 flex justify-end gap-3">
              <button onClick={() => handleWhatsAppReply(selectedMessage.phone || selectedMessage.email, selectedMessage.message)} className="btn-gold px-4 py-2 rounded flex items-center gap-1">
                <FaReply /> Reply via WhatsApp
              </button>
              <button onClick={closeDetailsModal} className="btn-glass px-4 py-2 rounded">Close</button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {isDeleteModalOpen && messageToDelete && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
          <div className="premium-glass-card p-6 rounded-lg shadow-lg w-full max-w-sm relative">
            <button onClick={closeDeleteModal} className="absolute top-3 right-3 text-gray-400 hover:text-white">
              <FaTimes size={20} />
            </button>
            <h3 className="text-xl font-bold text-white mb-4">Confirm Deletion</h3>
            <p className="text-gray-300 mb-6">Are you sure you want to delete the message from <strong>{messageToDelete.name}</strong>?</p>
            <div className="flex justify-end gap-3">
              <button onClick={closeDeleteModal} className="btn-glass px-4 py-2 rounded">Cancel</button>
              <button onClick={handleDeleteMessage} className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700">Delete</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ContactMessages;