import React from 'react';

const Overview = () => {
  return (
    <div className="p-4">
      <h2 className="text-3xl font-bold text-white mb-6">Dashboard Overview</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Statistics Cards */}
        <div className="premium-glass-card p-6 rounded-lg shadow-lg bg-gray-800 bg-opacity-75">
          <h3 className="text-xl font-semibold text-gray-200">Total Bookings</h3>
          <p className="text-gold text-4xl mt-2">1200</p>
        </div>
        <div className="premium-glass-card p-6 rounded-lg shadow-lg bg-gray-800 bg-opacity-75">
          <h3 className="text-xl font-semibold text-gray-200">New Bookings (This Week)</h3>
          <p className="text-gold text-4xl mt-2">35</p>
        </div>
        <div className="premium-glass-card p-6 rounded-lg shadow-lg bg-gray-800 bg-opacity-75">
          <h3 className="text-xl font-semibold text-gray-200">Total Blog Posts</h3>
          <p className="text-gold text-4xl mt-2">150</p>
        </div>
        <div className="premium-glass-card p-6 rounded-lg shadow-lg bg-gray-800 bg-opacity-75">
          <h3 className="text-xl font-semibold text-gray-200">Unread Messages</h3>
          <p className="text-gold text-4xl mt-2">8</p>
        </div>
      </div>
      {/* More overview content can go here */}
    </div>
  );
};

export default Overview;