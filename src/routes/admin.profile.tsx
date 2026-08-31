// src/routes/admin/profile.tsx
import { createFileRoute } from '@tanstack/react-router';
import Profile from '../components/Profile';

export const Route = createFileRoute('/admin/profile')({
  component: Profile,
});