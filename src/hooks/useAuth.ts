// src/hooks/useAuth.ts
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from '@tanstack/react-router';
import { toast } from 'sonner';
import { authApi } from '../api/auth';
import { useAuthStore } from '../store/authStore';

type LoginCredentials = {
  email: string;
  password: string;
};

export const useAuth = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { login: storeLogin, logout: storeLogout, updateAdmin } = useAuthStore();

  const loginMutation = useMutation({
    mutationFn: async (credentials: LoginCredentials) => {
      console.log('Attempting login with:', credentials.email);
      const response = await authApi.login(credentials);
      console.log('Login API response:', response);
      return response;
    },
    onSuccess: (response) => {
      console.log('Login success, response data:', response.data);
      const { admin, token } = response.data.data;
      
      if (!admin || !token) {
        toast.error('Invalid response from server');
        return;
      }
      
      storeLogin(admin, token);
      toast.success('Login successful!');
      navigate({ to: '/admin/dashboard' });
    },
    onError: (error: any) => {
      console.error('Login mutation error:', error);
      
      let errorMessage = 'Login failed. Please try again.';
      
      if (error.response) {
        // The request was made and the server responded with a status code
        console.error('Error response:', error.response);
        errorMessage = error.response.data?.message || 
                      error.response.statusText || 
                      'Invalid credentials';
      } else if (error.request) {
        // The request was made but no response was received
        console.error('No response received:', error.request);
        errorMessage = 'No response from server. Please check your connection.';
      } else {
        // Something happened in setting up the request
        console.error('Request error:', error.message);
        errorMessage = error.message || 'An error occurred';
      }
      
      toast.error(errorMessage);
    },
  });

  const logoutMutation = useMutation({
    mutationFn: () => authApi.logout(),
    onSuccess: () => {
      storeLogout();
      queryClient.clear();
      toast.success('Logged out successfully');
      navigate({ to: '/login' });
    },
    onError: (error: any) => {
      console.error('Logout error:', error);
      // Still logout locally even if API fails
      storeLogout();
      queryClient.clear();
      navigate({ to: '/login' });
    },
  });

  const updateProfileMutation = useMutation({
    mutationFn: (data: any) => authApi.updateProfile(data),
    onSuccess: (response) => {
      updateAdmin(response.data.data);
      toast.success('Profile updated successfully');
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Update failed');
    },
  });

  const updatePasswordMutation = useMutation({
    mutationFn: (data: any) => authApi.updatePassword(data),
    onSuccess: () => {
      toast.success('Password updated successfully');
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Password update failed');
    },
  });

  return {
    login: loginMutation.mutateAsync,
    loginLoading: loginMutation.isPending,
    loginError: loginMutation.error,
    logout: logoutMutation.mutateAsync,
    logoutLoading: logoutMutation.isPending,
    updateProfile: updateProfileMutation.mutate,
    updateProfileLoading: updateProfileMutation.isPending,
    updatePassword: updatePasswordMutation.mutate,
    updatePasswordLoading: updatePasswordMutation.isPending,
  };
};