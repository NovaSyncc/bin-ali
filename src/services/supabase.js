import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY

// Only initialize Supabase if credentials are provided
export const supabase = supabaseUrl && supabaseKey
  ? createClient(supabaseUrl, supabaseKey)
  : null

export const blogService = {
  // Create new blog post
  async createBlogPost(postData) { 
    const { data, error } = await supabase
      .from('blog_posts')
      .insert([postData])
      .select();
    if (error) throw error;
    return data;
  },
  
  // Get all blog posts (for dashboard)
  async getAllBlogPosts() { 
    const { data, error } = await supabase
      .from('blog_posts')
      .select('*')
      .order('created_at', { ascending: false });
    if (error) throw error;
    return data;
  },
  
  // Get published blog posts (for public blog page)
  async getPublishedBlogPosts(language) { 
    const { data, error } = await supabase
      .from('blog_posts')
      .select('*')
      .eq('status', 'published')
      .eq('language', language)
      .order('published_at', { ascending: false });
    if (error) throw error;
    return data;
  },
  
  // Get single blog post by slug
  async getBlogPostBySlug(slug) { 
    const { data, error } = await supabase
      .from('blog_posts')
      .select('*')
      .eq('slug', slug)
      .single();
    if (error) throw error;
    return data;
  },
  
  // Update blog post
  async updateBlogPost(postId, updateData) { 
    const { data, error } = await supabase
      .from('blog_posts')
      .update(updateData)
      .eq('id', postId)
      .select();
    if (error) throw error;
    return data;
  },
  
  // Delete blog post
  async deleteBlogPost(postId) { 
    const { error } = await supabase
      .from('blog_posts')
      .delete()
      .eq('id', postId);
    if (error) throw error;
    return true;
  },
  
  // Toggle publish status
  async togglePublishStatus(postId, currentStatus) { 
    const newStatus = currentStatus === 'published' ? 'draft' : 'published';
    const { data, error } = await supabase
      .from('blog_posts')
      .update({ status: newStatus, published_at: newStatus === 'published' ? new Date().toISOString() : null })
      .eq('id', postId)
      .select();
    if (error) throw error;
    return data;
  },
  
  // Increment view count
  async incrementViews(postId) { 
    const { data, error } = await supabase.rpc('increment_post_views', { post_id: postId });
    if (error) throw error;
    return data;
  },
  
  // Upload featured image to Supabase Storage
  async uploadBlogImage(file) { 
    const fileExt = file.name.split('.').pop();
    const fileName = `${Math.random()}.${fileExt}`;
    const filePath = `${fileName}`;

    const { data, error } = await supabase.storage
      .from('blog-images')
      .upload(filePath, file);

    if (error) throw error;

    const { data: publicUrlData } = supabase.storage
      .from('blog-images')
      .getPublicUrl(filePath);

    return publicUrlData.publicUrl;
  },
  
  // Subscribe to real-time blog post changes
  subscribeToBlogPosts(callback) { 
    return supabase
      .channel('public:blog_posts')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'blog_posts' }, payload => {
        callback(payload);
      })
      .subscribe();
  }
}

export const mediaService = {
  // Upload a gallery image under a room-type category
  async uploadGalleryImage(file, category) {
    if (!supabase) throw new Error('Supabase is not configured');
    const safeCat = category.replace(/[^a-zA-Z0-9-_]/g, '_');
    const ext = file.name.split('.').pop();
    const filePath = `images/${safeCat}/${Date.now()}-${Math.random().toString(36).substr(2, 6)}.${ext}`;

    const { error: uploadError } = await supabase.storage
      .from('hotel-media')
      .upload(filePath, file);
    if (uploadError) throw uploadError;

    const { data: { publicUrl } } = supabase.storage
      .from('hotel-media')
      .getPublicUrl(filePath);

    const { data, error } = await supabase
      .from('media_items')
      .insert([{ type: 'image', category, url: publicUrl, filename: file.name }])
      .select();
    if (error) throw error;
    return data[0];
  },

  // Upload a video (category: 'hero_video' for the homepage hero)
  async uploadVideo(file, category = 'hero_video') {
    if (!supabase) throw new Error('Supabase is not configured');
    const ext = file.name.split('.').pop();
    const filePath = `videos/${category}/${Date.now()}.${ext}`;

    const { error: uploadError } = await supabase.storage
      .from('hotel-media')
      .upload(filePath, file, { upsert: false });
    if (uploadError) throw uploadError;

    const { data: { publicUrl } } = supabase.storage
      .from('hotel-media')
      .getPublicUrl(filePath);

    const { data, error } = await supabase
      .from('media_items')
      .insert([{ type: 'video', category, url: publicUrl, filename: file.name }])
      .select();
    if (error) throw error;
    return data[0];
  },

  // Fetch media items by type; optionally filter by category
  async getMediaItems(type, category = null) {
    if (!supabase) return [];
    let query = supabase
      .from('media_items')
      .select('*')
      .eq('type', type)
      .order('created_at', { ascending: false });
    if (category) query = query.eq('category', category);
    const { data, error } = await query;
    if (error) throw error;
    return data || [];
  },

  // Get the most recently uploaded hero video
  async getHeroVideo() {
    if (!supabase) return null;
    const { data, error } = await supabase
      .from('media_items')
      .select('*')
      .eq('type', 'video')
      .eq('category', 'hero_video')
      .order('created_at', { ascending: false })
      .limit(1);
    if (error || !data?.length) return null;
    return data[0];
  },

  // Delete a media item (removes from storage and database)
  async deleteMediaItem(id, url) {
    if (!supabase) throw new Error('Supabase is not configured');
    const parts = url.split('/object/public/hotel-media/');
    if (parts.length > 1) {
      const filePath = decodeURIComponent(parts[1]);
      await supabase.storage.from('hotel-media').remove([filePath]);
    }
    const { error } = await supabase.from('media_items').delete().eq('id', id);
    if (error) throw error;
    return true;
  },
};

export const bookingService = {
  async getAllBookings() {
    const { data, error } = await supabase
      .from('bookings')
      .select('*')
      .order('created_at', { ascending: false });
    if (error) throw error;
    return data;
  },
  async deleteBooking(id) {
    const { error } = await supabase
      .from('bookings')
      .delete()
      .eq('id', id);
    if (error) throw error;
    return true;
  },
  async searchBookings(searchTerm) {
    const { data, error } = await supabase
      .from('bookings')
      .select('*')
      .or(`customer_name.ilike.%${searchTerm}%,phone.ilike.%${searchTerm}%`);
    if (error) throw error;
    return data;
  },
  async filterBookingsByDate(startDate, endDate) {
    const { data, error } = await supabase
      .from('bookings')
      .select('*')
      .gte('check_in_date', startDate)
      .lte('check_out_date', endDate);
    if (error) throw error;
    return data;
  },
  async filterBookingsByStatus(status) {
    const { data, error } = await supabase
      .from('bookings')
      .select('*')
      .eq('status', status)
      .order('created_at', { ascending: false });
    if (error) throw error;
    return data;
  },
  async confirmBooking(id, { roomNumber, totalAmount, amountPaid, note }) {
    // Generate booking ref: BA-YYYY-XXXX
    const year = new Date().getFullYear();
    const { count } = await supabase
      .from('bookings')
      .select('*', { count: 'exact', head: true })
      .not('booking_ref', 'is', null);
    const seq = String((count ?? 0) + 1).padStart(4, '0');
    const bookingRef = `BA-${year}-${seq}`;

    const { data, error } = await supabase
      .from('bookings')
      .update({
        status: 'confirmed',
        room_number: roomNumber,
        total_amount: totalAmount,
        amount_paid: amountPaid,
        booking_ref: bookingRef,
        receptionist_note: note || null,
        confirmed_at: new Date().toISOString(),
      })
      .eq('id', id)
      .select()
      .single();
    if (error) throw error;
    return data;
  },
  async checkIn(id) {
    const { data, error } = await supabase
      .from('bookings')
      .update({ status: 'checked_in', checked_in_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single();
    if (error) throw error;
    return data;
  },
  async checkOut(id) {
    const { data, error } = await supabase
      .from('bookings')
      .update({ status: 'checked_out', checked_out_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single();
    if (error) throw error;
    return data;
  },
}