// src/lib/api.ts
import axios from 'axios';
import { useAuthStore } from '@/store/auth.store';

const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
});

console.log(
  "Initializing API client with base URL:",
  process.env.NEXT_PUBLIC_API_BASE_URL
);

// This is an Axios interceptor. It's a piece of code that runs
// BEFORE every single API request is sent.
apiClient.interceptors.request.use(
  (config) => {
    // We get the token from our Zustand store.
    const token = useAuthStore.getState().token;
    if (token) {
      // If the token exists, we add it to the Authorization header.
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

export default apiClient;
