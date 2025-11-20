import React, { useState, useEffect, useCallback } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // ES6
import { blogService } from '../../services/supabase';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaEdit, FaTrash, FaEye, FaToggleOn, FaToggleOff, FaUpload } from 'react-icons/fa';
import { supabase } from '../../services/supabase'; // Import supabase client for direct storage upload

const modules = {
  toolbar: [
    [{ 'header': [2, 3, 4, false] }],
    ['bold', 'italic', 'underline'],
    [{ 'list': 'ordered'}, { 'list': 'bullet' }],
    ['link', 'image'],
    ['clean']
  ],
};

const BlogPosts = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [currentPost, setCurrentPost] = useState(null);
  const [form, setForm] = useState({
    title: '',
    slug: '',
    content: '',
    excerpt: '',
    featured_image: '',
    category: '',
    status: 'draft',
    meta_title: '',
    meta_description: '',
  });
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState('');
  const [activeTab, setActiveTab] = useState('list'); // 'list' or 'form'
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [postToDelete, setPostToDelete] = useState(null);

  const fetchPosts = useCallback(async () => {
    setLoading(true);
    try {
      const data = await blogService.getAllBlogPosts();
      setPosts(data);
    } catch (error) {
      toast.error('Error fetching blog posts: ' + error.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm(prevForm => ({ ...prevForm, [name]: value }));
  };

  const handleContentChange = (value) => {
    setForm(prevForm => ({ ...prevForm, content: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    } else {
      setImageFile(null);
      setImagePreview('');
    }
  };

  const generateSlug = (title) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '') // Remove non-alphanumeric characters
      .replace(/\s+/g, '-')        // Replace spaces with hyphens
      .replace(/-+/g, '-')         // Replace multiple hyphens with single hyphen
      .trim();
  };

  const handleTitleChange = (e) => {
    const { value } = e.target;
    setForm(prevForm => ({
      ...prevForm,
      title: value,
      slug: generateSlug(value)
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      let imageUrl = form.featured_image;
      if (imageFile) {
        imageUrl = await blogService.uploadBlogImage(imageFile);
      }

      const postData = { ...form, featured_image: imageUrl };

      if (isEditing) {
        await blogService.updateBlogPost(currentPost.id, postData);
        toast.success('Blog post updated successfully!');
      } else {
        await blogService.createBlogPost(postData);
        toast.success('Blog post created successfully!');
      }
      resetForm();
      fetchPosts();
      setActiveTab('list');
    } catch (error) {
      toast.error('Error saving blog post: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (post) => {
    setCurrentPost(post);
    setForm({
      title: post.title,
      slug: post.slug,
      content: post.content,
      excerpt: post.excerpt,
      featured_image: post.featured_image,
      category: post.category,
      status: post.status,
      meta_title: post.meta_title,
      meta_description: post.meta_description,
    });
    setImagePreview(post.featured_image);
    setIsEditing(true);
    setActiveTab('form');
  };

  const handleTogglePublishStatus = async (post) => {
    try {
      await blogService.togglePublishStatus(post.id, post.status);
      toast.success('Publish status updated!');
      fetchPosts();
    } catch (error) {
      toast.error('Error updating publish status: ' + error.message);
    }
  };

  const openDeleteModal = (post) => {
    setPostToDelete(post);
    setDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setDeleteModalOpen(false);
    setPostToDelete(null);
  };

  const handleDelete = async () => {
    if (!postToDelete) return;
    setLoading(true);
    try {
      // Also delete featured image from storage if it exists
      if (postToDelete.featured_image) {
        const filePath = postToDelete.featured_image.split('/').pop();
        const { error: storageError } = await supabase.storage.from('blog-images').remove([filePath]);
        if (storageError) console.error('Error deleting image from storage:', storageError.message);
      }
      await blogService.deleteBlogPost(postToDelete.id);
      toast.success('Blog post deleted successfully!');
      fetchPosts();
      closeDeleteModal();
    } catch (error) {
      toast.error('Error deleting blog post: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setForm({
      title: '',
      slug: '',
      content: '',
      excerpt: '',
      featured_image: '',
      category: '',
      status: 'draft',
      meta_title: '',
      meta_description: '',
    });
    setImageFile(null);
    setImagePreview('');
    setIsEditing(false);
    setCurrentPost(null);
  };

  const categories = ['Events', 'News', 'Tips', 'Updates', 'Weddings', 'Rooms'];

  return (
    <div className="p-4">
      <ToastContainer position="bottom-right" theme="dark" />
      <h2 className="text-3xl font-bold text-white mb-6">Blog Post CMS</h2>

      <div className="flex border-b border-gray-700 mb-6">
        <button
          className={`py-2 px-4 text-sm font-medium ${activeTab === 'list' ? 'border-b-2 border-gold text-gold' : 'text-gray-400 hover:text-white'}`}
          onClick={() => { setActiveTab('list'); resetForm(); }}
        >
          All Blog Posts
        </button>
        <button
          className={`py-2 px-4 text-sm font-medium ${activeTab === 'form' ? 'border-b-2 border-gold text-gold' : 'text-gray-400 hover:text-white'}`}
          onClick={() => { setActiveTab('form'); resetForm(); }}
        >
          {isEditing ? 'Edit Blog Post' : 'Create New Blog Post'}
        </button>
      </div>

      {activeTab === 'list' && (
        <div className="premium-glass-card p-6 rounded-lg shadow-lg bg-gray-800 bg-opacity-75">
          {loading ? (
            <p className="text-gray-300">Loading blog posts...</p>
          ) : posts.length === 0 ? (
            <p className="text-gray-300">No blog posts found.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full bg-gray-900 bg-opacity-75 rounded-lg shadow-lg">
                <thead>
                  <tr className="bg-gray-800 text-gold uppercase text-sm leading-normal">
                    <th className="py-3 px-6 text-left">Title</th>
                    <th className="py-3 px-6 text-left">Category</th>
                    <th className="py-3 px-6 text-left">Status</th>
                    <th className="py-3 px-6 text-left">Views</th>
                    <th className="py-3 px-6 text-left">Published Date</th>
                    <th className="py-3 px-6 text-left">Actions</th>
                  </tr>
                </thead>
                <tbody className="text-gray-300 text-sm font-light">
                  {posts.map((post) => (
                    <tr key={post.id} className="border-b border-gray-700 hover:bg-gray-700">
                      <td className="py-3 px-6 text-left whitespace-nowrap">{post.title}</td>
                      <td className="py-3 px-6 text-left">{post.category}</td>
                      <td className="py-3 px-6 text-left">
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${post.status === 'published' ? 'bg-green-500' : 'bg-yellow-500'}`}>
                          {post.status}
                        </span>
                      </td>
                      <td className="py-3 px-6 text-left">{post.views}</td>
                      <td className="py-3 px-6 text-left">{post.published_at ? new Date(post.published_at).toLocaleDateString() : 'N/A'}</td>
                      <td className="py-3 px-6 text-left">
                        <div className="flex item-center justify-start">
                          <button onClick={() => handleEdit(post)} className="w-4 mr-2 transform hover:text-gold hover:scale-110">
                            <FaEdit />
                          </button>
                          <button onClick={() => openDeleteModal(post)} className="w-4 mr-2 transform hover:text-red-500 hover:scale-110">
                            <FaTrash />
                          </button>
                          <button onClick={() => handleTogglePublishStatus(post)} className="w-4 mr-2 transform hover:text-blue-500 hover:scale-110">
                            {post.status === 'published' ? <FaToggleOn /> : <FaToggleOff />}
                          </button>
                          {/* Future: Add View on Site button */}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {activeTab === 'form' && (
        <div className="premium-glass-card p-6 rounded-lg shadow-lg bg-gray-800 bg-opacity-75">
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label htmlFor="title" className="block text-gray-300 text-sm font-bold mb-2">Title:</label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-200"
                  value={form.title}
                  onChange={handleTitleChange}
                  required
                />
              </div>
              <div>
                <label htmlFor="slug" className="block text-gray-300 text-sm font-bold mb-2">Slug:</label>
                <input
                  type="text"
                  id="slug"
                  name="slug"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-200"
                  value={form.slug}
                  onChange={handleInputChange}
                  readOnly // Slug is auto-generated but can be manually edited if needed
                />
              </div>
            </div>

            <div className="mb-4">
              <label htmlFor="image-upload" className="block text-gray-300 text-sm font-bold mb-2">Featured Image:</label>
              <div className="flex items-center space-x-4">
                <input
                  type="file"
                  id="image-upload"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="block w-full text-sm text-gray-500
                    file:mr-4 file:py-2 file:px-4
                    file:rounded-full file:border-0
                    file:text-sm file:font-semibold
                    file:bg-gold file:text-white
                    hover:file:bg-yellow-600"
                />
                {imagePreview && (
                  <img src={imagePreview} alt="Featured Preview" className="h-20 w-20 object-cover rounded-md" />
                )}
              </div>
              {form.featured_image && !imageFile && (
                <p className="text-gray-400 text-xs mt-1">Current image: <a href={form.featured_image} target="_blank" rel="noopener noreferrer" className="text-blue-400 break-all">{form.featured_image}</a></p>
              )}
            </div>

            <div className="mb-4">
              <label htmlFor="excerpt" className="block text-gray-300 text-sm font-bold mb-2">Excerpt:</label>
              <textarea
                id="excerpt"
                name="excerpt"
                rows="3"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-200"
                value={form.excerpt}
                onChange={handleInputChange}
              ></textarea>
            </div>

            <div className="mb-4">
              <label htmlFor="content" className="block text-gray-300 text-sm font-bold mb-2">Content:</label>
              <ReactQuill 
                theme="snow" 
                value={form.content} 
                onChange={handleContentChange} 
                modules={modules}
                className="bg-gray-200 text-gray-800 rounded"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4 mt-16">
              <div>
                <label htmlFor="category" className="block text-gray-300 text-sm font-bold mb-2">Category:</label>
                <select
                  id="category"
                  name="category"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-200"
                  value={form.category}
                  onChange={handleInputChange}
                >
                  <option value="">Select a category</option>
                  {categories.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="status" className="block text-gray-300 text-sm font-bold mb-2">Status:</label>
                <select
                  id="status"
                  name="status"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-200"
                  value={form.status}
                  onChange={handleInputChange}
                >
                  <option value="draft">Draft</option>
                  <option value="published">Published</option>
                </select>
              </div>
            </div>

            {/* SEO Fields */}
            <div className="mb-4">
              <h3 className="text-lg font-bold text-gray-200 mb-2">SEO Fields (Optional)</h3>
              <div className="premium-glass-card p-4 rounded-lg bg-gray-700 bg-opacity-50">
                <div className="mb-2">
                  <label htmlFor="meta_title" className="block text-gray-300 text-sm font-bold mb-1">Meta Title:</label>
                  <input
                    type="text"
                    id="meta_title"
                    name="meta_title"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-200"
                    value={form.meta_title}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <label htmlFor="meta_description" className="block text-gray-300 text-sm font-bold mb-1">Meta Description:</label>
                  <textarea
                    id="meta_description"
                    name="meta_description"
                    rows="2"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-200"
                    value={form.meta_description}
                    onChange={handleInputChange}
                  ></textarea>
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-3 mt-6">
              <button
                type="button"
                onClick={resetForm}
                className="btn-glass px-4 py-2 rounded"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="btn-gold px-4 py-2 rounded"
                disabled={loading}
              >
                {loading ? 'Saving...' : (isEditing ? 'Update Post' : 'Create Post')}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteModalOpen && postToDelete && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
          <div className="premium-glass-card p-6 rounded-lg shadow-lg w-full max-w-sm relative">
            <button onClick={closeDeleteModal} className="absolute top-3 right-3 text-gray-400 hover:text-white">
              <FaTimes size={20} />
            </button>
            <h3 className="text-xl font-bold text-white mb-4">Confirm Deletion</h3>
            <p className="text-gray-300 mb-6">Are you sure you want to delete the blog post titled "<strong>{postToDelete.title}</strong>"? This action cannot be undone.</p>
            <div className="flex justify-end gap-3">
              <button onClick={closeDeleteModal} className="btn-glass px-4 py-2 rounded">Cancel</button>
              <button onClick={handleDelete} className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700">Delete</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BlogPosts;