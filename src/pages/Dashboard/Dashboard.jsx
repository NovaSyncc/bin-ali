import React, { useState, useEffect } from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import Login from './Login';

const Dashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const session = localStorage.getItem('bin_ali_session');
    if (session === 'true') {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('bin_ali_session');
    setIsLoggedIn(false);
    navigate('/');
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  if (!isLoggedIn) {
    return <Login onLogin={() => setIsLoggedIn(true)} />;
  }

  return (
    <div className="flex min-h-screen bg-navy-deepest text-gray-100 font-inter">
      {/* Sidebar */}
      <aside className={`bg-gray-900 text-gray-200 w-64 space-y-6 py-7 px-2 absolute inset-y-0 left-0 transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:relative md:translate-x-0 transition duration-200 ease-in-out z-50 border-r border-white/5`}>
        <div className="flex items-center justify-between px-4 mb-6">
          <NavLink to="/" className="text-gold-premium text-xl font-bold font-playfair uppercase tracking-widest">
            Bin Ali Hotel
          </NavLink>
          <button onClick={toggleSidebar} className="md:hidden text-gray-400 focus:outline-none hover:text-white">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
          </button>
        </div>

        <div className="px-4 mb-8">
          <p className="text-[10px] text-gray-500 uppercase tracking-widest mb-4">Reception Portal</p>
          <nav className="space-y-1">
            <NavLink
              to="/manager/bookings"
              className={({ isActive }) =>
                `flex items-center gap-3 py-3 px-4 rounded-xl transition duration-300 font-medium ${isActive ? 'bg-gold-premium text-navy-deepest shadow-lg shadow-gold/20' : 'text-gray-400 hover:bg-white/5 hover:text-white'}`
              }
            >
              <span className="text-lg">📅</span> Bookings
            </NavLink>
          </nav>
        </div>

        <div className="absolute bottom-6 left-0 w-full px-6">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 py-3 px-4 text-red-400 hover:bg-red-500/10 rounded-xl transition-all duration-300 border border-red-500/20"
          >
            <span>🚪</span> Logout
          </button>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0">
        <header className="flex items-center justify-between p-4 bg-gray-900/50 backdrop-blur-md border-b border-white/5 shadow-sm">
          <div className="flex items-center gap-4">
            <button onClick={toggleSidebar} className="md:hidden text-gray-400 focus:outline-none hover:text-white">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
            </button>
            <h1 className="text-white text-lg font-semibold font-playfair">Management Panel</h1>
          </div>
          <div className="flex items-center gap-2">
            <span className="hidden sm:block text-xs text-gray-400">Receptionist:</span>
            <span className="text-xs font-bold text-gold-premium bg-gold/10 px-2 py-1 rounded">RE-binALI</span>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-4 md:p-8 bg-navy-deepest">
          <div className="max-w-[1400px] mx-auto">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;