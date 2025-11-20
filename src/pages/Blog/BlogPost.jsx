import React, { useState, useEffect, useCallback } from 'react';
import { useParams, Link } from 'react-router-dom';
import { blogService } from '../../services/supabase';
import { format } from 'date-fns';
import PageHeader from '../../components/shared/PageHeader';
import { FaShareAlt, FaWhatsapp, FaFacebook, FaTwitter } from 'react-icons/fa';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const BlogPost = () => {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Assuming a global language context or default
  const language = 'en'; // Placeholder for language, will be integrated later

  const fetchBlogPost = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const fetchedPost = await blogService.getBlogPostBySlug(slug);
      setPost(fetchedPost);
      // Increment view count
      await blogService.incrementViews(fetchedPost.id);
    } catch (err) {
      setError('Failed to fetch blog post. It might not exist or an error occurred.');
      console.error('Error fetching blog post:', err);
    } finally {
      setLoading(false);
    }
  }, [slug]);

  useEffect(() => {
    fetchBlogPost();
  }, [fetchBlogPost]);

  if (loading) {
    return (
      <div className="min-h-screen bg-navy-deepest text-gray-100 flex items-center justify-center">
        <p className="text-gray-300">Loading blog post...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-navy-deepest text-gray-100 flex items-center justify-center">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-navy-deepest text-gray-100 flex items-center justify-center">
        <p className="text-gray-300">Blog post not found.</p>
      </div>
    );
  }

  const shareUrl = window.location.href;
  const shareTitle = post.title;

  const handleShare = (platform) => {
    let url = '';
    switch (platform) {
      case 'whatsapp':
        url = `https://wa.me/?text=${encodeURIComponent(shareTitle + ' ' + shareUrl)}`;
        break;
      case 'facebook':
        url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`;
        break;
      case 'twitter':
        url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareTitle)}&url=${encodeURIComponent(shareUrl)}`;
        break;
      default:
        break;
    }
    if (url) {
      window.open(url, '_blank');
    }
  };

  return (
    <div className="min-h-screen bg-navy-deepest text-gray-100">
      <ToastContainer position="bottom-right" theme="dark" />
      <PageHeader title={post.title} breadcrumbs={[{ name: 'Home', link: '/' }, { name: 'Blog', link: '/blog' }, { name: post.title, link: `/blog/${post.slug}` }]} />

      <div className="container mx-auto px-4 py-8">
        <article className="max-w-4xl mx-auto premium-glass-card p-6 rounded-lg shadow-lg bg-gray-800 bg-opacity-75">
          {post.featured_image && (
            <img src={post.featured_image} alt={post.title} className="w-full h-96 object-cover rounded-lg mb-6" />
          )}

          <h1 className="text-4xl font-bold text-white mb-4">{post.title}</h1>
          <div className="flex items-center text-gray-400 text-sm mb-6 space-x-4">
            <span>By <span className="text-gold">{post.author}</span></span>
            <span>{post.published_at ? format(new Date(post.published_at), 'MMM d, yyyy') : 'N/A'}</span>
            <span>Category: <Link to={`/blog?category=${post.category}`} className="text-gold hover:underline">{post.category}</Link></span>
            <span>Views: {post.views}</span>
          </div>

          <div
            className="prose prose-invert max-w-none text-gray-300 leading-relaxed"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          {post.tags && post.tags.length > 0 && (
            <div className="mt-8">
              <h3 className="text-xl font-bold text-white mb-3">Tags:</h3>
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag, index) => (
                  <span key={index} className="bg-gray-700 text-gray-300 px-3 py-1 rounded-full text-sm">#{tag}</span>
                ))}
              </div>
            </div>
          )}

          <div className="mt-8 border-t border-gray-700 pt-6 flex items-center justify-between">
            <h3 className="text-xl font-bold text-white">Share this post:</h3>
            <div className="flex gap-4">
              <button onClick={() => handleShare('whatsapp')} className="text-green-500 hover:text-green-600">
                <FaWhatsapp size={24} />
              </button>
              <button onClick={() => handleShare('facebook')} className="text-blue-600 hover:text-blue-700">
                <FaFacebook size={24} />
              </button>
              <button onClick={() => handleShare('twitter')} className="text-blue-400 hover:text-blue-500">
                <FaTwitter size={24} />
              </button>
            </div>
          </div>
        </article>

        {/* Related Posts Section - Future Implementation */}
        <div className="mt-12">
          <h2 className="text-3xl font-bold text-white mb-6 text-center">Related Posts</h2>
          <p className="text-center text-gray-300">Related posts will appear here.</p>
        </div>
      </div>
    </div>
  );
};

export default BlogPost;