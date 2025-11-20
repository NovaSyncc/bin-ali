import React, { useState } from 'react';
import { NavLink, Outlet } from 'react-router-dom';

const Dashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex min-h-screen bg-navy-deepest text-gray-100">
      {/* Sidebar */}
      <aside className={`bg-gray-900 text-gray-200 w-64 space-y-6 py-7 px-2 absolute inset-y-0 left-0 transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:relative md:translate-x-0 transition duration-200 ease-in-out`}>
        <div className="flex items-center justify-between px-4">
          <NavLink to="/" className="text-white text-2xl font-bold">Bin Ali Hotel</NavLink>
          <button onClick={toggleSidebar} className="md:hidden text-gray-400 focus:outline-none">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
          </button>
        </div>

        <nav className="px-4">
          <NavLink
            to="/manager/overview"
            className={({ isActive }) =>
              `block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700 hover:text-white ${isActive ? 'bg-gold text-white' : 'text-gray-400'}`
            }
          >
            📊 Overview
          </NavLink>
          <NavLink
            to="/manager/bookings"
            className={({ isActive }) =>
              `block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700 hover:text-white ${isActive ? 'bg-gold text-white' : 'text-gray-400'}`
            }
          >
            📅 Bookings
          </NavLink>
          <NavLink
            to="/manager/blog-posts"
            className={({ isActive }) =>
              `block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700 hover:text-white ${isActive ? 'bg-gold text-white' : 'text-gray-400'}`
            }
          >
            ✍️ Blog Posts
          </NavLink>
          <NavLink
            to="/manager/contact-messages"
            className={({ isActive }) =>
              `block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700 hover:text-white ${isActive ? 'bg-gold text-white' : 'text-gray-400'}`
            }
          >
            📧 Contact Messages
          </NavLink>
          {/* Settings will be added later */}
          <NavLink
            to="/manager/settings"
            className={({ isActive }) =>
              `block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700 hover:text-white ${isActive ? 'bg-gold text-white' : 'text-gray-400'}`
            }
          >
            ⚙️ Settings
          </NavLink>
        </nav>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col">
        {/* Header for mobile sidebar toggle */}
        <header className="md:hidden flex items-center justify-between p-4 bg-gray-800 shadow-md">
          <button onClick={toggleSidebar} className="text-gray-400 focus:outline-none">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
          </button>
          <h1 className="text-white text-xl font-semibold">Dashboard</h1>
        </header>

        <main className="flex-1 p-6">
          <Outlet /> {/* Renders child routes */}
        </main>
      </div>
    </div>
  );
};

export default Dashboard;