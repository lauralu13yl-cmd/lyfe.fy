const SUPA_URL = 'https://bcvhlkncezqzzzrrbkum.supabase.co';
const SUPA_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJjdmhsa25jZXpxenp6cnJia3VtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzU1OTMyMDUsImV4cCI6MjA5MTE2OTIwNX0.XdE2d56_txfbnw24kLT7vj1AMMemb0SCA_H_WtUavN4';

const { createClient } = supabase;
const db = createClient(SUPA_URL, SUPA_KEY);

const Auth = {
  async getUser() {
    const { data: { session } } = await db.auth.getSession();
    return session?.user || null;
  },
  async getProfile() {
    const user = await this.getUser();
    if (!user) return null;
    const { data } = await db.from('profiles').select('*').eq('id', user.id).single();
    return data;
  },
  async requireAuth() {
    const user = await this.getUser();
    if (!user) { window.location.href = '/index.html'; return null; }
    return user;
  },
  async signOut() {
    await db.auth.signOut();
    window.location.href = '/index.html';
  }
};

const Sessions = {
  async create(formData) {
    const user = await Auth.requireAuth();
    if (!user) return;
    const { error } = await db.from('sessions').insert({
      host_id:      user.id,
      title:        formData.title,
      sport:        formData.sport,
      format:       formData.format,
      session_date: formData.date,
      session_time: formData.time,
      location:     formData.location,
      price:        parseFloat(formData.price) || 0,
      spots_total:  parseInt(formData.spots) || 8,
      spots_taken:  0,
      skill_level:  formData.skillLevel,
      session_type: formData.type,
      description:  formData.description,
      status:       'active'
    });
    if (error) throw error;
    return true;
  },
  async getAll(filters = {}) {
    let query = db
      .from('sessions')
      .select('*, profiles(first_name, last_name, rating, avatar_url)')
      .eq('status', 'active')
      .order('session_date', { ascending: true });
    if (filters.sport) query = query.eq('sport', filters.sport);
    if (filters.level) query = query.eq('skill_level', filters.level);
    const { data, error } = await query;
    if (error) throw error;
    return data;
  },
  async getMine(userId) {
    const { data } = await db
      .from('sessions')
      .select('*, bookings(count)')
      .eq('host_id', userId)
      .order('session_date', { ascending: true });
    return data || [];
  }
};

const Bookings = {
  async create(sessionId, price) {
    const user = await Auth.requireAuth();
    if (!user) return;
    const { error } = await db.from('bookings').insert({
      session_id:  sessionId,
      player_id:   user.id,
      paid_amount: price
    });
    if (error) throw error;
    await db.rpc('increment_spots', { sid: sessionId });
    return true;
  },
  async getMine() {
    const user = await Auth.getUser();
    if (!user) return [];
    const { data } = await db
      .from('bookings')
      .select('*, sessions(*, profiles(first_name, last_name))')
      .eq('player_id', user.id)
      .eq('status', 'confirmed')
      .order('created_at', { ascending: false });
    return data || [];
  }
};

const Live = {
  onNewSession(callback) {
    db.channel('public-sessions')
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'sessions' },
        payload => callback(payload.new))
      .subscribe();
  },
  onSpotTaken(sessionId, callback) {
    db.channel('session-' + sessionId)
      .on('postgres_changes', { event: 'UPDATE', schema: 'public', table: 'sessions',
        filter: `id=eq.${sessionId}` },
        payload => callback(payload.new))
      .subscribe();
  }
};

window.db       = db;
window.Auth     = Auth;
window.Sessions = Sessions;
window.Bookings = Bookings;
window.Live     = Live;
