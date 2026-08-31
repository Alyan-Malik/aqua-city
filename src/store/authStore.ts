// src/store/authStore.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface Admin {
  id?: string | number;
  email?: string;
  name?: string;
  [key: string]: unknown;
}

interface AuthState {
  admin: Admin | null;
  token: string | null;
  isAuthenticated: boolean;
  login: (admin: Admin, token: string) => void;
  logout: () => void;
  updateAdmin: (admin: Admin) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      admin: null,
      token: null,
      isAuthenticated: false,

      login: (admin, token) => {
        localStorage.setItem('admin_token', token);
        set({ admin, token, isAuthenticated: true });
      },

      logout: () => {
        localStorage.removeItem('admin_token');
        set({ admin: null, token: null, isAuthenticated: false });
      },

      updateAdmin: (admin) => set({ admin }),
    }),
    { name: 'auth-storage' }
  )
);