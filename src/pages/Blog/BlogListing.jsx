import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { blogService } from '../../services/supabase';
import { format } from 'date-fns';
import PageHeader from '../../components/shared/PageHeader';

const BlogListing = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(10); // 10 posts per page as per guide

  // Assuming a global language context or default
  const language = 'en'; // Placeholder for language, will be integrated later

  const fetchPublishedPosts = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      // In a real scenario, you'd implement pagination in the service layer
      const allPosts = await blogService.getPublishedBlogPosts(language);
      setPosts(allPosts);
    } catch (err) {
      setError('Failed to fetch blog posts. Please try again later.');
      console.error('Error fetching published blog posts:', err);
    } finally {
      setLoading(false);
    }
  }, [language]);

  useEffect(() => {
    fetchPublishedPosts();
  }, [fetchPublishedPosts]);

  // Get current posts for pagination
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="min-h-screen bg-navy-deepest text-gray-100">
      <PageHeader title="Our Blog" breadcrumbs={[{ name: 'Home', link: '/' }, { name: 'Blog', link: '/blog' }]} />

      <div className="container mx-auto px-4 py-8">
        {loading && <p className="text-center text-gray-300">Loading blog posts...</p>}
        {error && <p className="text-center text-red-500">{error}</p>}

        {!loading && !error && posts.length === 0 && (
          <p className="text-center text-gray-300">No blog posts published yet.</p>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {currentPosts.map((post) => (
            <div key={post.id} className="premium-glass-card rounded-lg shadow-lg overflow-hidden transition-transform duration-300 hover:scale-105">
              {post.featured_image && (
                <img src={post.featured_image} alt={post.title} className="w-full h-48 object-cover" />
              )}
              <div className="p-6">
                <span className="text-gold text-xs uppercase font-semibold">{post.category}</span>
                <h3 className="text-xl font-bold text-white mt-2 mb-2">{post.title}</h3>
                <p className="text-gray-300 text-sm mb-4 line-clamp-3">{post.excerpt}</p>
                <div className="flex justify-between items-center text-gray-400 text-xs">
                  <span>{post.author}</span>
                  <span>{post.published_at ? format(new Date(post.published_at), 'MMM d, yyyy') : 'N/A'}</span>
                </div>
                <Link to={`/blog/${post.slug}`} className="mt-4 inline-block text-gold hover:underline">Read More &rarr;</Link>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        {posts.length > postsPerPage && (
          <div className="flex justify-center mt-8">
            <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
              {Array.from({ length: Math.ceil(posts.length / postsPerPage) }, (_, i) => (
                <button
                  key={i + 1}
                  onClick={() => paginate(i + 1)}
                  className={`relative inline-flex items-center px-4 py-2 border border-gray-700 bg-gray-800 text-sm font-medium ${
                    currentPage === i + 1 ? 'text-gold bg-gray-700' : 'text-gray-400 hover:bg-gray-700'
                  }`}
                >
                  {i + 1}
                </button>
              ))}
            </nav>
          </div>
        )}
      </div>
    </div>
  );
};

export default BlogListing;