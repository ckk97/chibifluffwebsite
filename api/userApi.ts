import { fetchApi } from './client';

export enum PetType {
  Dog = 0,
  Cat = 1,
  Rabbit = 2,
  Other = 3,
}

export interface PetResponse {
  id: string;
  name: string;
  type: PetType;
  breed: string;
  age: number;
  imageUri: string;
  birthday: string | null;
}

export interface UserProfileResponse {
  name: string;
  email: string;
  phoneNumber: string | null;
  birthday: string | null;
  profilePicture: string | null;
  pets: PetResponse[];
}

export interface UpdatePetRequest {
  id?: string;
  name: string;
  type: PetType;
  breed: string;
  age: number;
  imageUri: string;
  birthday?: string;
}

export interface UpdateUserProfileRequest {
  displayName?: string;
  birthday?: string;
  phoneNumber?: string;
  profilePicture?: string;
  pets?: UpdatePetRequest[];
}

export const userApi = {
  getProfile: () => fetchApi<UserProfileResponse>('/api/users/me', { method: 'GET' }),
  updateProfile: (data: UpdateUserProfileRequest) => 
    fetchApi<void>('/api/users/profile', { 
      method: 'PUT',
      body: JSON.stringify(data)
    }),
};
