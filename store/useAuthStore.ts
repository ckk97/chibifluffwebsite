import { create } from 'zustand';
import { fetchApi } from '../api/client';

export interface User {
  id: string;
  email: string;
  fullName: string;
  profilePicture: string;
}

interface AuthState {
  isAuthenticated: boolean;
  isHydrating: boolean;
  token: string | null;
  user: User | null;
  login: (token: string, user?: User) => void;
  logout: () => void;
  checkSession: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  isAuthenticated: false,
  isHydrating: true,
  token: null,
  user: null,

  login: (token, user = null) => {
    const userData = user || {
      id: 'mock-id',
      email: 'user@example.com',
      fullName: 'Chibi Friend',
      profilePicture: 'https://ui-avatars.com/api/?name=Chibi+Friend&background=F9D6D8&color=3E2723'
    };
    
    set({ isAuthenticated: true, token, user: userData });
  },

  logout: async () => {
    try {
      await fetchApi('/api/auth/logout', { method: 'POST' });
    } catch {}
    set({ isAuthenticated: false, token: null, user: null });
  },

  checkSession: async () => {
    try {
      const data = await fetchApi<any>('/api/auth/session');
      if (data.token) {
        set({ isAuthenticated: true, token: data.token, user: data.user, isHydrating: false });
      } else {
        set({ isHydrating: false });
      }
    } catch (e) {
      set({ isAuthenticated: false, token: null, user: null, isHydrating: false });
    }
  }
}));
