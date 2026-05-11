import { create } from 'zustand';

interface Pet {
  id: string;
  name: string;
  birthday: string;
  icon: string;
}

interface UserState {
  fullName: string;
  email: string;
  phone: string;
  avatar: string | null;
  pets: Pet[];
  setFullName: (name: string) => void;
  setEmail: (email: string) => void;
  setPhone: (phone: string) => void;
  setAvatar: (uri: string) => void;
  addPet: (pet: Omit<Pet, 'id'>) => void;
  removePet: (id: string) => void;
  updatePetImage: (id: string, uri: string) => void;
}

export const useUserStore = create<UserState>((set) => ({
  fullName: 'Alex Pawsome',
  email: 'alex@example.com',
  phone: '(555) 123-4567',
  avatar: null,
  pets: [
    { id: '1', name: 'Barnaby', birthday: 'May 12, 2020', icon: '🐶' }
  ],
  setFullName: (name) => set({ fullName: name }),
  setEmail: (email) => set({ email: email }),
  setPhone: (phone) => set({ phone: phone }),
  setAvatar: (uri) => set({ avatar: uri }),
  addPet: (pet) => set((state) => ({ 
    pets: [...state.pets, { ...pet, id: Math.random().toString(36).substr(2, 9) }] 
  })),
  removePet: (id) => set((state) => ({ 
    pets: state.pets.filter((p) => p.id !== id) 
  })),
  updatePetImage: (id, uri) => set((state) => ({
    pets: state.pets.map(p => p.id === id ? { ...p, icon: uri } : p)
  })),
}));
