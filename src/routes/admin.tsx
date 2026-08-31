// src/routes/admin.tsx
import { createFileRoute, Outlet, redirect } from '@tanstack/react-router';
import AdminLayout from '../components/AdminLayout';

export const Route = createFileRoute('/admin')({
  beforeLoad: () => {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('admin_token');
      if (!token) {
        throw redirect({ to: '/login' });
      }
    }
  },
  component: AdminLayoutWrapper,
});

function AdminLayoutWrapper() {
  return <AdminLayout />;
}