// src/api/auth.ts
import { apiClient } from './client';

export const authApi = {
  login: (data: { email: string; password: string }) =>
    apiClient.post('/admin/login', data),

  logout: () => apiClient.post('/admin/logout'),

  getProfile: () => apiClient.get('/admin/profile'),

  updateProfile: (data: { name?: string; email?: string }) =>
    apiClient.put('/admin/profile', data),

  updatePassword: (data: { current_password: string; new_password: string; new_password_confirmation: string }) =>
    apiClient.put('/admin/password', data),
};