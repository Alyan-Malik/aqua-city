// src/routes/admin/dashboard.tsx
import { createFileRoute } from '@tanstack/react-router';
import Dashboard from '../components/Dashboard';

export const Route = createFileRoute('/admin/dashboard')({
  component: Dashboard,
});