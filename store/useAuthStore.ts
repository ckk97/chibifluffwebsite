import { create } from 'zustand';

export interface User {
  id: string;
  email: string;
  fullName: string;
  profilePicture: string;
}

interface AuthState {
  isAuthenticated: boolean;
  token: string | null;
  user: User | null;
  login: (token: string, user?: User) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  isAuthenticated: false,
  token: null,
  user: null,
  login: (token, user) => set({
    isAuthenticated: true,
    token,
    user: user || {
      id: 'mock-id',
      email: 'user@example.com',
      fullName: 'Chibi Friend',
      profilePicture: 'https://ui-avatars.com/api/?name=Chibi+Friend&background=F9D6D8&color=3E2723'
    }
  }),
  logout: () => set({ isAuthenticated: false, token: null, user: null }),
}));
