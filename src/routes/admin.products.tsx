// src/routes/admin/products.tsx
import { createFileRoute } from '@tanstack/react-router';
import Products from '../components/Products';

export const Route = createFileRoute('/admin/products')({
  component: Products,
});