import React, { useState, useEffect, useCallback } from 'react';
import { mediaService, supabase } from '../../services/supabase';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaTrash, FaUpload, FaImage, FaVideo, FaSpinner } from 'react-icons/fa';

// Must match the room types in src/data/rooms.js
const GALLERY_CATEGORIES = [
  'Single Room',
  'Standard Room',
  'Standard Double',
  'Standard Twin',
  'Family Room (2BR)',
  'Studio Apartment',
  'General',
];

const SETUP_SQL = `-- 1. Run this SQL in your Supabase dashboard → SQL Editor

CREATE TABLE IF NOT EXISTS public.media_items (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  type TEXT NOT NULL CHECK (type IN ('image', 'video')),
  category TEXT NOT NULL,
  url TEXT NOT NULL,
  filename TEXT,
  title TEXT,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE public.media_items ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read"  ON public.media_items FOR SELECT USING (true);
CREATE POLICY "Anyone write" ON public.media_items FOR ALL   USING (true);

-- 2. In Supabase → Storage, create a new bucket named: hotel-media
--    Make it PUBLIC, then add these storage policies:

CREATE POLICY "Public view hotel-media"
  ON storage.objects FOR SELECT USING (bucket_id = 'hotel-media');

CREATE POLICY "Anyone upload hotel-media"
  ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'hotel-media');

CREATE POLICY "Anyone delete hotel-media"
  ON storage.objects FOR DELETE USING (bucket_id = 'hotel-media');`;

const MediaManager = () => {
  const [activeTab, setActiveTab] = useState('images');
  const [selectedCategory, setSelectedCategory] = useState(GALLERY_CATEGORIES[0]);
  const [images, setImages] = useState([]);
  const [videos, setVideos] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [deleteModal, setDeleteModal] = useState({ open: false, item: null });

  const fetchImages = useCallback(async (category) => {
    setLoading(true);
    try {
      const data = await mediaService.getMediaItems('image', category);
      setImages(data);
    } catch (err) {
      toast.error('Could not load images: ' + err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchVideos = useCallback(async () => {
    setLoading(true);
    try {
      const data = await mediaService.getMediaItems('video');
      setVideos(data);
    } catch (err) {
      toast.error('Could not load videos: ' + err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!supabase) return;
    if (activeTab === 'images') fetchImages(selectedCategory);
    else fetchVideos();
  }, [activeTab, selectedCategory, fetchImages, fetchVideos]);

  const handleImageUpload = async (e) => {
    const files = Array.from(e.target.files);
    if (!files.length) return;
    setUploading(true);
    try {
      for (const file of files) {
        await mediaService.uploadGalleryImage(file, selectedCategory);
      }
      toast.success(`${files.length} image(s) uploaded!`);
      fetchImages(selectedCategory);
    } catch (err) {
      toast.error('Upload failed: ' + err.message);
    } finally {
      setUploading(false);
      e.target.value = '';
    }
  };

  const handleVideoUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (file.size > 100 * 1024 * 1024) {
      toast.error('Video is too large. Please use a file under 100 MB.');
      return;
    }
    setUploading(true);
    try {
      await mediaService.uploadVideo(file, 'hero_video');
      toast.success('Video uploaded! It will now play on the homepage.');
      fetchVideos();
    } catch (err) {
      toast.error('Upload failed: ' + err.message);
    } finally {
      setUploading(false);
      e.target.value = '';
    }
  };

  const handleDelete = async () => {
    const { item } = deleteModal;
    if (!item) return;
    try {
      await mediaService.deleteMediaItem(item.id, item.url);
      toast.success('Deleted successfully.');
      if (item.type === 'image') fetchImages(selectedCategory);
      else fetchVideos();
    } catch (err) {
      toast.error('Delete failed: ' + err.message);
    } finally {
      setDeleteModal({ open: false, item: null });
    }
  };

  // Show setup instructions if Supabase isn't configured
  if (!supabase) {
    return (
      <div className="p-4">
        <h2 className="text-3xl font-bold text-white mb-4">Media Manager</h2>
        <div className="bg-yellow-900/40 border border-yellow-600 rounded-lg p-6 text-yellow-200">
          <h3 className="text-xl font-bold mb-2">One-time Setup Required</h3>
          <p className="mb-4 text-sm">
            Add your Supabase credentials to the <code className="bg-black/30 px-1 rounded">.env</code> file:
          </p>
          <pre className="bg-black/40 p-3 rounded text-sm mb-4 overflow-x-auto">
{`VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key`}
          </pre>
          <p className="text-sm mb-2">Then run this SQL in Supabase (SQL Editor tab):</p>
          <pre className="bg-black/40 p-3 rounded text-xs overflow-x-auto whitespace-pre-wrap">
            {SETUP_SQL}
          </pre>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4">
      <ToastContainer position="bottom-right" theme="dark" />
      <h2 className="text-3xl font-bold text-white mb-1">Media Manager</h2>
      <p className="text-gray-400 mb-6 text-sm">
        Upload images and videos here — changes appear on the website immediately, no technical skills needed.
      </p>

      {/* Tabs */}
      <div className="flex border-b border-gray-700 mb-6">
        <button
          className={`py-2 px-4 text-sm font-medium flex items-center gap-2 ${activeTab === 'images' ? 'border-b-2 border-gold text-gold' : 'text-gray-400 hover:text-white'}`}
          onClick={() => setActiveTab('images')}
        >
          <FaImage /> Gallery Images
        </button>
        <button
          className={`py-2 px-4 text-sm font-medium flex items-center gap-2 ${activeTab === 'videos' ? 'border-b-2 border-gold text-gold' : 'text-gray-400 hover:text-white'}`}
          onClick={() => setActiveTab('videos')}
        >
          <FaVideo /> Videos
        </button>
      </div>

      {/* ── IMAGES TAB ── */}
      {activeTab === 'images' && (
        <div>
          <p className="text-gray-400 text-sm mb-4">
            Select a room type below, then upload photos for it. Those photos will appear in the Gallery page.
          </p>

          {/* Category pills */}
          <div className="flex flex-wrap gap-2 mb-6">
            {GALLERY_CATEGORIES.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${selectedCategory === cat ? 'bg-gold text-black' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'}`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Upload area */}
          <label className={`cursor-pointer block mb-6 bg-gray-800 rounded-lg p-6 border-2 border-dashed ${uploading ? 'border-gold/50' : 'border-gray-600 hover:border-gold/60'} transition-colors`}>
            <div className="flex flex-col items-center gap-2 text-center">
              {uploading
                ? <><FaSpinner size={28} className="text-gold animate-spin" /><span className="text-gold font-medium">Uploading…</span></>
                : <><FaUpload size={28} className="text-gold" /><span className="text-white font-medium">Click to upload photos for "{selectedCategory}"</span><span className="text-gray-400 text-sm">JPG, PNG, WEBP — you can pick multiple files at once</span></>
              }
            </div>
            <input
              type="file"
              accept="image/*"
              multiple
              className="hidden"
              onChange={handleImageUpload}
              disabled={uploading}
            />
          </label>

          {/* Image grid */}
          {loading ? (
            <div className="text-center py-10 text-gray-400">Loading images…</div>
          ) : images.length === 0 ? (
            <div className="text-center py-14 bg-gray-800 rounded-lg">
              <FaImage size={44} className="text-gray-600 mx-auto mb-3" />
              <p className="text-gray-400 font-medium">No images yet for "{selectedCategory}"</p>
              <p className="text-gray-500 text-sm mt-1">Upload photos above and they will appear here and on the website.</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
              {images.map(img => (
                <div key={img.id} className="relative group aspect-square rounded-lg overflow-hidden bg-gray-700">
                  <img src={img.url} alt={img.filename} className="w-full h-full object-cover" loading="lazy" />
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <button
                      onClick={() => setDeleteModal({ open: true, item: img })}
                      className="bg-red-600 hover:bg-red-700 text-white p-2.5 rounded-full"
                      title="Delete image"
                    >
                      <FaTrash size={13} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* ── VIDEOS TAB ── */}
      {activeTab === 'videos' && (
        <div>
          <div className="bg-blue-900/30 border border-blue-700 rounded-lg p-4 mb-6 text-blue-200 text-sm">
            <strong>How it works:</strong> The most recently uploaded video will automatically play in the homepage hero section. Old videos are kept as backup.
          </div>

          {/* Upload area */}
          <label className={`cursor-pointer block mb-6 bg-gray-800 rounded-lg p-6 border-2 border-dashed ${uploading ? 'border-gold/50' : 'border-gray-600 hover:border-gold/60'} transition-colors`}>
            <div className="flex flex-col items-center gap-2 text-center">
              {uploading
                ? <><FaSpinner size={28} className="text-gold animate-spin" /><span className="text-gold font-medium">Uploading video… please wait</span></>
                : <><FaUpload size={28} className="text-gold" /><span className="text-white font-medium">Click to upload a new video</span><span className="text-gray-400 text-sm">MP4 or MOV — recommended under 50 MB for best speed</span></>
              }
            </div>
            <input
              type="file"
              accept="video/*"
              className="hidden"
              onChange={handleVideoUpload}
              disabled={uploading}
            />
          </label>

          {/* Video list */}
          {loading ? (
            <div className="text-center py-10 text-gray-400">Loading videos…</div>
          ) : videos.length === 0 ? (
            <div className="text-center py-14 bg-gray-800 rounded-lg">
              <FaVideo size={44} className="text-gray-600 mx-auto mb-3" />
              <p className="text-gray-400 font-medium">No videos uploaded yet</p>
              <p className="text-gray-500 text-sm mt-1">The default video will keep playing until you upload one.</p>
            </div>
          ) : (
            <div className="space-y-3">
              {videos.map((video, index) => (
                <div key={video.id} className="bg-gray-800 rounded-lg p-4 flex items-center gap-4">
                  <video
                    src={video.url}
                    className="w-32 h-20 object-cover rounded bg-gray-900 flex-shrink-0"
                    muted
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-white font-medium truncate">{video.filename || 'Video'}</p>
                    <p className="text-gray-400 text-sm">{new Date(video.created_at).toLocaleDateString()}</p>
                    {index === 0 && (
                      <span className="inline-block mt-1 px-2 py-0.5 bg-green-700 text-green-100 text-xs rounded-full font-medium">
                        Active — showing on homepage
                      </span>
                    )}
                  </div>
                  <button
                    onClick={() => setDeleteModal({ open: true, item: video })}
                    className="text-red-500 hover:text-red-400 p-2 flex-shrink-0"
                    title="Delete video"
                  >
                    <FaTrash size={16} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Delete confirmation modal */}
      {deleteModal.open && deleteModal.item && (
        <div className="fixed inset-0 bg-black/75 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-800 rounded-lg p-6 w-full max-w-sm shadow-xl">
            <h3 className="text-xl font-bold text-white mb-3">
              Delete {deleteModal.item.type === 'image' ? 'Image' : 'Video'}?
            </h3>
            <p className="text-gray-300 mb-6">
              This will permanently remove the file. This cannot be undone.
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setDeleteModal({ open: false, item: null })}
                className="px-4 py-2 bg-gray-700 text-white rounded hover:bg-gray-600"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MediaManager;
