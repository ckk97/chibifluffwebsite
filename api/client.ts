import { useAuthStore } from '../store/useAuthStore';

const BASE_URL = 'http://localhost:8080';

interface RequestOptions extends RequestInit {
  params?: Record<string, string>;
}

export const fetchApi = async <T>(endpoint: string, options: RequestOptions = {}): Promise<T> => {
  const { token } = useAuthStore.getState();
  
  const headers = new Headers(options.headers);
  if (token) {
    headers.set('Authorization', `Bearer ${token}`);
  }
  headers.set('Accept', 'application/json');
  
  // Default to JSON if not specified
  if (!headers.has('Content-Type') && options.method && options.method !== 'GET') {
    headers.set('Content-Type', 'application/json');
  }

  let url = `${BASE_URL}${endpoint}`;
  if (options.params) {
    const searchParams = new URLSearchParams(options.params);
    url += `?${searchParams.toString()}`;
  }

  const response = await fetch(url, {
    ...options,
    headers,
    credentials: 'include',
  });

  if (!response.ok) {
    // Optionally parse error details
    const errorText = await response.text();
    throw new Error(`API Error ${response.status}: ${errorText}`);
  }

  // Support empty responses
  const text = await response.text();
  return (text ? JSON.parse(text) : {}) as T;
};
