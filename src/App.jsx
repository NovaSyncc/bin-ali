import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { initScrollObserver } from './utils/scrollObserver';

// Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import BookingForm from './components/BookingForm';
import EventBookingForm from './components/EventBookingForm'; // Import EventBookingForm

// Pages
import Home from './pages/Home';
import RoomsPage from './pages/RoomsPage';
import AboutPage from './pages/AboutPage';
import EventsPage from './pages/EventsPage';
import GalleryPage from './pages/GalleryPage';
import ContactPage from './pages/ContactPage';
import Dashboard from './pages/Dashboard/Dashboard';
import Overview from './pages/Dashboard/Overview';
import Bookings from './pages/Dashboard/Bookings';
// // import BlogPosts from './pages/Dashboard/BlogPosts';
import ContactMessages from './pages/Dashboard/ContactMessages';
import Settings from './pages/Dashboard/Settings';
import BlogListing from './pages/Blog/BlogListing';
import BlogPost from './pages/Blog/BlogPost';

// ScrollObserver wrapper component
function ScrollObserverWrapper({ children }) {
  const location = useLocation();

  useEffect(() => {
    // Scroll to top on route change
    window.scrollTo(0, 0);

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
  const [isEventBookingFormOpen, setIsEventBookingFormOpen] = useState(false);
  const [language, setLanguage] = useState('en'); // New language state

  const handleBookNow = (room = null) => {
    setSelectedRoom(room);
    setIsBookingFormOpen(true);
  };

  const handleCloseBookingForm = () => {
    setIsBookingFormOpen(false);
    setSelectedRoom(null);
  };

  const handleBookEventHall = () => {
    setIsEventBookingFormOpen(true);
  };

  const handleCloseEventBookingForm = () => {
    setIsEventBookingFormOpen(false);
  };

  const handleLanguageChange = (newLanguage) => {
    setLanguage(newLanguage);
  };

  return (
    <BrowserRouter>
      <ScrollObserverWrapper>
        <div className="min-h-screen">
          <Navbar onBookNow={handleBookNow} language={language} onLanguageChange={handleLanguageChange} />

          <AnimatePresence mode="wait">
            <Routes>
              {/* Pass handleBookEventHall to Home component */}
              <Route path="/" element={<Home onBookNow={handleBookNow} onBookEventHall={handleBookEventHall} language={language} />} />
              <Route path="/rooms" element={<RoomsPage onBookNow={handleBookNow} language={language} />} />
              <Route path="/about" element={<AboutPage language={language} />} />
              <Route path="/events" element={<EventsPage language={language} />} />
              <Route path="/gallery" element={<GalleryPage language={language} />} />
              <Route path="/contact" element={<ContactPage language={language} />} />
              <Route path="/blog" element={<BlogListing language={language} />} />
              <Route path="/blog/:slug" element={<BlogPost language={language} />} />

              {/* Dashboard Routes */}
              <Route path="/manager" element={<Dashboard />}>
                <Route index element={<Overview />} /> {/* Default child route for /manager */}
                <Route path="overview" element={<Overview />} />
                <Route path="bookings" element={<Bookings />} />
                {/* <Route path="blog-posts" element={<BlogPosts />} /> */}
                <Route path="contact-messages" element={<ContactMessages />} />
                <Route path="settings" element={<Settings />} />
              </Route>
            </Routes>
          </AnimatePresence>

          <Footer />

          {/* Booking Form Modal */}
          <BookingForm
            isOpen={isBookingFormOpen}
            onClose={handleCloseBookingForm}
            preSelectedRoom={selectedRoom}
            language={language}
          />

          {/* Event Booking Form Modal */}
          <EventBookingForm
            isOpen={isEventBookingFormOpen}
            onClose={handleCloseEventBookingForm}
            language={language}
          />
        </div>
      </ScrollObserverWrapper>
    </BrowserRouter>
  );
}

export default App;
