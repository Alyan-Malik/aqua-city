// src/routes/admin/categories.tsx
import { createFileRoute } from '@tanstack/react-router';
import Categories from '../components/Categories';

export const Route = createFileRoute('/admin/categories')({
  component: Categories,
});