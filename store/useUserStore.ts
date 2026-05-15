import { create } from 'zustand';
import { userApi, PetType, UpdateUserProfileRequest } from '../api/userApi';

interface Pet {
  id: string;
  name: string;
  type: PetType;
  breed: string;
  age: number;
  imageUri: string;
  birthday: string;
}

interface UserState {
  fullName: string;
  email: string;
  phone: string;
  birthday: string;
  avatar: string | null;
  pets: Pet[];
  isLoading: boolean;
  setFullName: (name: string) => void;
  setEmail: (email: string) => void;
  setPhone: (phone: string) => void;
  setAvatar: (uri: string) => void;
  addPet: (pet: Omit<Pet, 'id'>) => void;
  removePet: (id: string) => void;
  updatePetImage: (id: string, uri: string) => void;
  fetchProfile: () => Promise<void>;
  updateProfile: (data: UpdateUserProfileRequest) => Promise<void>;
}

export const useUserStore = create<UserState>((set, get) => ({
  fullName: 'Alex Pawsome',
  email: 'alex@example.com',
  phone: '(555) 123-4567',
  birthday: '',
  avatar: null,
  isLoading: false,
  pets: [],
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
    pets: state.pets.map(p => p.id === id ? { ...p, imageUri: uri } : p)
  })),
  fetchProfile: async () => {
    set({ isLoading: true });
    try {
      const profile = await userApi.getProfile();
      set({
        fullName: profile.name,
        email: profile.email,
        phone: profile.phoneNumber || '',
        birthday: profile.birthday || '',
        avatar: profile.profilePicture,
        pets: profile.pets.map(p => ({
          id: p.id,
          name: p.name,
          type: p.type,
          breed: p.breed,
          age: p.age,
          imageUri: p.imageUri || '🐾',
          birthday: p.birthday || 'Unknown',
        })),
        isLoading: false
      });
    } catch (e) {
      console.warn('Failed to fetch profile:', e);
      set({ isLoading: false });
    }
  },
  updateProfile: async (data: UpdateUserProfileRequest) => {
    set({ isLoading: true });
    try {
      await userApi.updateProfile(data);
      // Refresh profile after successful update
      const updatedProfile = await userApi.getProfile();
      set({
        fullName: updatedProfile.name,
        email: updatedProfile.email,
        phone: updatedProfile.phoneNumber || '',
        birthday: updatedProfile.birthday || '',
        avatar: updatedProfile.profilePicture,
        pets: updatedProfile.pets.map(p => ({
          id: p.id,
          name: p.name,
          type: p.type,
          breed: p.breed,
          age: p.age,
          imageUri: p.imageUri || '🐾',
          birthday: p.birthday || 'Unknown',
        })),
        isLoading: false
      });
    } catch (e) {
      console.error('Failed to update profile:', e);
      set({ isLoading: false });
      throw e;
    }
  }
}));
