// src/api/products.ts
import { apiClient } from './client';
import { Product, Category } from '../types';

export const productApi = {
  getAll: () => apiClient.get('/products'),
  getById: (id: number) => apiClient.get(`/products/${id}`),
  getCategories: () => apiClient.get('/categories'),
  create: (data: FormData) => apiClient.post('/admin/products', data, {
    headers: { 'Content-Type': 'multipart/form-data' },
  }),
  update: (id: number, data: FormData) => apiClient.post(`/admin/products/${id}?_method=PUT`, data, {
    headers: { 'Content-Type': 'multipart/form-data' },
  }),
  delete: (id: number) => apiClient.delete(`/admin/products/${id}`),
};