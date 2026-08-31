// src/components/AdminLayout.tsx
import React, { useState } from 'react';
import { Link, Outlet, useNavigate } from '@tanstack/react-router';
import { useAuthStore } from '../store/authStore';
import { useAuth } from '../hooks/useAuth';
import { 
  FiHome, 
  FiPackage, 
  FiFolder, 
  FiUser, 
  FiLogOut,
  FiMenu,
  FiX,
  FiChevronLeft,
  FiChevronRight
} from 'react-icons/fi';

const AdminLayout: React.FC = () => {
  const { admin } = useAuthStore();
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const menuItems = [
    { path: '/admin/dashboard', label: 'Dashboard', icon: FiHome },
    { path: '/admin/products', label: 'Products', icon: FiPackage },
    { path: '/admin/categories', label: 'Categories', icon: FiFolder },
    { path: '/admin/profile', label: 'Profile', icon: FiUser },
  ];

  const handleLogout = async () => {
    await logout();
    navigate({ to: '/login' });
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile Menu Toggle */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="p-2 bg-white rounded-lg shadow-lg hover:bg-gray-50 transition-colors"
        >
          {isMobileMenuOpen ? <FiX className="w-6 h-6" /> : <FiMenu className="w-6 h-6" />}
        </button>
      </div>

      {/* Sidebar */}
      <aside
        className={`
          fixed top-0 left-0 h-full bg-white border-r border-border transition-all duration-300 z-40
          ${isSidebarOpen ? 'w-64' : 'w-20'}
          ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}
      >
        {/* Logo */}
        <div className="flex items-center justify-between h-16 px-4 border-b border-border">
          <div className="flex items-center gap-2">
            <img
              src="/images/logo2.png"
              alt="Aqua City"
              className={`h-10 w-auto object-contain ${!isSidebarOpen && 'lg:hidden'}`}
            />
            {isSidebarOpen && (
              <span className="text-lg font-bold text-brand">Admin Panel</span>
            )}
          </div>
          <button
            onClick={toggleSidebar}
            className="hidden lg:flex p-1 rounded-lg hover:bg-gray-100 transition-colors"
          >
            {isSidebarOpen ? <FiChevronLeft className="w-5 h-5" /> : <FiChevronRight className="w-5 h-5" />}
          </button>
        </div>

        {/* Navigation */}
        <nav className="p-4 space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`
                  flex items-center gap-3 px-4 py-3 rounded-lg transition-colors
                  hover:bg-gray-100 text-gray-700 hover:text-brand
                  [&.active]:bg-brand [&.active]:text-white
                `}
                activeProps={{
                  className: 'bg-brand text-white hover:bg-brand hover:text-white',
                }}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <Icon className="w-5 h-5 flex-shrink-0" />
                {isSidebarOpen && <span className="text-sm font-medium">{item.label}</span>}
              </Link>
            );
          })}
        </nav>

        {/* Logout Button */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-border">
          <button
            onClick={handleLogout}
            className={`
              flex items-center gap-3 w-full px-4 py-3 rounded-lg transition-colors
              text-red-600 hover:bg-red-50
            `}
          >
            <FiLogOut className="w-5 h-5 flex-shrink-0" />
            {isSidebarOpen && <span className="text-sm font-medium">Logout</span>}
          </button>
        </div>
      </aside>

      {/* Overlay for mobile */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Main Content */}
      <div className={`${isSidebarOpen ? 'lg:ml-64' : 'lg:ml-20'} transition-all duration-300`}>
        {/* Top Header */}
        <header className="bg-white border-b border-border sticky top-0 z-30">
          <div className="flex items-center justify-between px-6 py-4">
            <div className="flex items-center gap-3">
              <h1 className="text-xl font-semibold text-foreground">
                {menuItems.find(item => window.location.pathname.startsWith(item.path))?.label || 'Dashboard'}
              </h1>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-600 hidden sm:block">
                {admin?.name}
              </span>
              <div className="w-8 h-8 rounded-full bg-brand text-white flex items-center justify-center font-semibold">
                {admin?.name?.charAt(0)?.toUpperCase() || 'A'}
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;