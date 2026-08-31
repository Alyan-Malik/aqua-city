// src/types/index.ts
export interface Category {
  id: number;
  name: string;
  description?: string;
  created_at?: string;
  updated_at?: string;
}

export interface ProductImage {
  id: number;
  product_id: number;
  image: string;
  is_primary: boolean;
  sort_order: number;
}

export interface Product {
  id: number;
  name: string;
  model_no?: string;
  description?: string;
  key_features?: string[] | string;
  price: string | number;
  category_id: number;
  category?: Category;
  images?: ProductImage[];
  stock: number;
  created_at?: string;
  updated_at?: string;
}

export interface ApiResponse<T = any> {
  status: boolean;
  message?: string;
  data: T;
}