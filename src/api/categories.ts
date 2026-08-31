// src/api/categories.ts
import { apiClient } from './client';

export const categoryApi = {
  getAll: () => apiClient.get('/categories'),
  getById: (id: number) => apiClient.get(`/categories/${id}`),
  create: (data: { name: string; description?: string }) =>
    apiClient.post('/admin/categories', data),
  update: (id: number, data: { name: string; description?: string }) =>
    apiClient.put(`/admin/categories/${id}`, data),
  delete: (id: number) => apiClient.delete(`/admin/categories/${id}`),
};