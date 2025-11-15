import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { initScrollObserver } from './utils/scrollObserver';

// Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import BookingForm from './components/BookingForm';

// Pages
import Home from './pages/Home';
import RoomsPage from './pages/RoomsPage';
import AboutPage from './pages/AboutPage';
import EventsPage from './pages/EventsPage';
import GalleryPage from './pages/GalleryPage';
import ContactPage from './pages/ContactPage';

// ScrollObserver wrapper component
function ScrollObserverWrapper({ children }) {
  const location = useLocation();

  useEffect(() => {
    // Re-initialize scroll observer on route change
    const timer = setTimeout(() => {
      initScrollObserver();
    }, 100);

    return () => clearTimeout(timer);
  }, [location.pathname]);

  return children;
}

function App() {
  const [isBookingFormOpen, setIsBookingFormOpen] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState(null);

  const handleBookNow = (room = null) => {
    setSelectedRoom(room);
    setIsBookingFormOpen(true);
  };

  const handleCloseBookingForm = () => {
    setIsBookingFormOpen(false);
    setSelectedRoom(null);
  };

  return (
    <BrowserRouter>
      <ScrollObserverWrapper>
        <div className="min-h-screen">
          <Navbar onBookNow={handleBookNow} />

          <AnimatePresence mode="wait">
            <Routes>
              <Route path="/" element={<Home onBookNow={handleBookNow} />} />
              <Route path="/rooms" element={<RoomsPage onBookNow={handleBookNow} />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/events" element={<EventsPage />} />
              <Route path="/gallery" element={<GalleryPage />} />
              <Route path="/contact" element={<ContactPage />} />
            </Routes>
          </AnimatePresence>

          <Footer />

          {/* Booking Form Modal */}
          <BookingForm
            isOpen={isBookingFormOpen}
            onClose={handleCloseBookingForm}
            preSelectedRoom={selectedRoom}
          />
        </div>
      </ScrollObserverWrapper>
    </BrowserRouter>
  );
}

export default App;
