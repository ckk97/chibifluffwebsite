import { create } from 'zustand';

interface AuthState {
  isAuthenticated: boolean;
  token: string | null;
  registrationEmail: string | null;
  login: (token: string) => void;
  logout: () => void;
  setRegistrationEmail: (email: string) => void;
  clearRegistration: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  isAuthenticated: false,
  token: null,
  registrationEmail: null,
  login: (token) => set({ isAuthenticated: true, token }),
  logout: () => set({ isAuthenticated: false, token: null }),
  setRegistrationEmail: (email) => set({ registrationEmail: email }),
  clearRegistration: () => set({ registrationEmail: null }),
}));
