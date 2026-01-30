
// This is a mock supabase client for frontend-only development
// In a real app, this would be a real Supabase client

export const supabase = {
  auth: {
    signInWithPassword: async () => ({
      data: { user: { id: '123', email: 'user@example.com' } },
      error: null
    }),
    signOut: async () => ({ error: null }),
    signUp: async () => ({
      data: { user: { id: '123', email: 'user@example.com' } },
      error: null
    }),
    getUser: async () => ({
      data: { user: { id: '123', email: 'user@example.com' } },
      error: null
    })
  },
  storage: {
    from: () => ({
      upload: async () => ({ data: { path: 'mock/path' }, error: null }),
      getPublicUrl: () => ({ data: { publicUrl: '/placeholder.svg' } })
    })
  },
  from: () => ({
    select: () => ({
      eq: () => ({
        single: async () => ({ data: {}, error: null }),
        data: [{ id: '123', name: 'Mock Data' }],
        error: null
      }),
      data: [{ id: '123', name: 'Mock Data' }],
      error: null
    }),
    insert: async () => ({ data: { id: '123' }, error: null }),
    update: async () => ({ data: {}, error: null }),
    delete: async () => ({ data: {}, error: null })
  })
};
