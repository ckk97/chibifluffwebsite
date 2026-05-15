import { fetchApi } from './client';

export interface UserProfileResponse {
  name: string;
  email: string;
  phoneNumber: string | null;
  pets: PetResponse[];
}

export interface PetResponse {
  id: string;
  name: string;
  type: number;
  breed: string;
  age: number;
  imageUri: string;
  birthday: string | null;
}

export const userApi = {
  getProfile: () => fetchApi<UserProfileResponse>('/api/users/me', { method: 'GET' }),
};
