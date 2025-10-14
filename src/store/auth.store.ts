// src/store/auth.store.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type AuthState = {
  token: string | null;
  user: { email: string; id: number } | null;
  setAuth: (token: string, user: { email: string; id: number }) => void;
  logout: () => void;
};

export const useAuthStore = create<AuthState>()(
  // The `persist` middleware automatically saves the store's state to localStorage.
  // This means the user will stay logged in even after refreshing the page.
  persist(
    (set) => ({
      token: null,
      user: null,
      setAuth: (token, user) => set({ token, user }),
      logout: () => set({ token: null, user: null }),
    }),
    {
      name: 'auth-storage', // The key to use for storing the data in localStorage
    },
  ),
);

