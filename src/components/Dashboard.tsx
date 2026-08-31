// src/components/Dashboard.tsx
import React from 'react';
import { useProducts } from '../hooks/useProducts';
import { useCategories } from '../hooks/useCategories';
import { useAuthStore } from '../store/authStore';

const Dashboard: React.FC = () => {
  const { admin } = useAuthStore();
  const { products, isLoading: productsLoading } = useProducts();
  const { categories, isLoading: categoriesLoading } = useCategories();

  if (productsLoading || categoriesLoading) {
    return <div className="text-center py-8">Loading dashboard...</div>;
  }

  const totalRevenue = products.reduce(
    (sum: number, p: (typeof products)[number]) => sum + Number(p.price),
    0,
  );

  return (
    <div>
      <h1 className="text-2xl font-bold text-foreground mb-2">
        Welcome back, {admin?.name}!
      </h1>
      <p className="text-muted-foreground mb-6">
        Here's what's happening with your store today.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="card-surface p-6">
          <p className="text-sm text-muted-foreground">Total Products</p>
          <p className="text-3xl font-bold text-brand mt-1">{products.length}</p>
        </div>
        <div className="card-surface p-6">
          <p className="text-sm text-muted-foreground">Categories</p>
          <p className="text-3xl font-bold text-brand mt-1">{categories.length}</p>
        </div>
        <div className="card-surface p-6">
          <p className="text-sm text-muted-foreground">Total Revenue</p>
          <p className="text-3xl font-bold text-brand mt-1">
            Rs{totalRevenue.toFixed(2)}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;