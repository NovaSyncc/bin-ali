import React, { useState, useEffect } from 'react';
import { supabase } from '../../services/supabase';
import { startOfWeek } from 'date-fns';

const Overview = () => {
  const [stats, setStats] = useState({
    totalBookings: 0,
    newBookingsThisWeek: 0,
    totalBlogPosts: 0,
    unreadMessages: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const weekStart = startOfWeek(new Date()).toISOString();

        const [
          { count: totalBookings },
          { count: newBookingsThisWeek },
          { count: totalBlogPosts },
          { count: unreadMessages },
        ] = await Promise.all([
          supabase.from('bookings').select('*', { count: 'exact', head: true }),
          supabase.from('bookings').select('*', { count: 'exact', head: true }).gte('created_at', weekStart),
          supabase.from('blog_posts').select('*', { count: 'exact', head: true }),
          supabase.from('contact_submissions').select('*', { count: 'exact', head: true }).eq('is_read', false),
        ]);

        setStats({
          totalBookings: totalBookings ?? 0,
          newBookingsThisWeek: newBookingsThisWeek ?? 0,
          totalBlogPosts: totalBlogPosts ?? 0,
          unreadMessages: unreadMessages ?? 0,
        });
      } catch (err) {
        console.error('Failed to load overview stats:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  const cards = [
    { label: 'Total Bookings', value: stats.totalBookings },
    { label: 'New Bookings (This Week)', value: stats.newBookingsThisWeek },
    { label: 'Total Blog Posts', value: stats.totalBlogPosts },
    { label: 'Unread Messages', value: stats.unreadMessages },
  ];

  return (
    <div className="p-4">
      <h2 className="text-3xl font-bold text-white mb-6">Dashboard Overview</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {cards.map((card) => (
          <div key={card.label} className="premium-glass-card p-6 rounded-lg shadow-lg bg-gray-800 bg-opacity-75">
            <h3 className="text-xl font-semibold text-gray-200">{card.label}</h3>
            <p className="text-gold text-4xl mt-2">
              {loading ? '—' : card.value}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Overview;
