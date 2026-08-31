// src/components/Profile.tsx
import React, { useState } from 'react';
import { useAuthStore } from '../store/authStore';
import { useAuth } from '../hooks/useAuth';

const Profile: React.FC = () => {
  const { admin } = useAuthStore();
  const { updateProfile, updatePassword } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(admin?.name || '');
  const [email, setEmail] = useState(admin?.email || '');
  const [passwordData, setPasswordData] = useState({
    current_password: '',
    new_password: '',
    new_password_confirmation: '',
  });

  const handleProfileUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile({ name, email });
    setIsEditing(false);
  };

  const handlePasswordUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    updatePassword(passwordData);
    setPasswordData({
      current_password: '',
      new_password: '',
      new_password_confirmation: '',
    });
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold text-foreground">Profile Settings</h1>

      <div className="card-surface p-6">
        <h2 className="text-lg font-semibold text-foreground mb-4">
          Personal Information
        </h2>
        {!isEditing ? (
          <div className="space-y-3">
            <div>
              <label className="text-sm text-muted-foreground">Name</label>
              <p className="text-foreground font-medium">{admin?.name}</p>
            </div>
            <div>
              <label className="text-sm text-muted-foreground">Email</label>
              <p className="text-foreground font-medium">{admin?.email}</p>
            </div>
            <button onClick={() => setIsEditing(true)} className="btn-primary mt-2">
              Edit Profile
            </button>
          </div>
        ) : (
          <form onSubmit={handleProfileUpdate} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-1">
                Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-2 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-brand"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-1">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-brand"
                required
              />
            </div>
            <div className="flex gap-3">
              <button type="submit" className="btn-primary">
                Save Changes
              </button>
              <button
                type="button"
                onClick={() => {
                  setIsEditing(false);
                  setName(admin?.name || '');
                  setEmail(admin?.email || '');
                }}
                className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted rounded-lg transition-colors"
              >
                Cancel
              </button>
            </div>
          </form>
        )}
      </div>

      <div className="card-surface p-6">
        <h2 className="text-lg font-semibold text-foreground mb-4">
          Change Password
        </h2>
        <form onSubmit={handlePasswordUpdate} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-1">
              Current Password
            </label>
            <input
              type="password"
              value={passwordData.current_password}
              onChange={(e) =>
                setPasswordData({ ...passwordData, current_password: e.target.value })
              }
              className="w-full px-4 py-2 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-brand"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-1">
              New Password
            </label>
            <input
              type="password"
              value={passwordData.new_password}
              onChange={(e) =>
                setPasswordData({ ...passwordData, new_password: e.target.value })
              }
              className="w-full px-4 py-2 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-brand"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-1">
              Confirm New Password
            </label>
            <input
              type="password"
              value={passwordData.new_password_confirmation}
              onChange={(e) =>
                setPasswordData({
                  ...passwordData,
                  new_password_confirmation: e.target.value,
                })
              }
              className="w-full px-4 py-2 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-brand"
              required
            />
          </div>
          <button type="submit" className="btn-primary">
            Update Password
          </button>
        </form>
      </div>
    </div>
  );
};

export default Profile;