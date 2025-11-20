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

export const bookingService = {
  // All existing functions from Hyat's supabase.js
  // Add search/filter functions:
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
  }
}