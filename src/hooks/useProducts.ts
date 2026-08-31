// src/hooks/useProducts.ts
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { productApi } from '../api/products';
import { Product } from '../types';

export const useProducts = () => {
  const queryClient = useQueryClient();

  const { data, isLoading, error } = useQuery({
    queryKey: ['products'],
    queryFn: productApi.getAll,
  });

  const createMutation = useMutation({
    mutationFn: productApi.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
      toast.success('Product created successfully');
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Failed to create product');
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: number; data: FormData }) =>
      productApi.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
      toast.success('Product updated successfully');
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Failed to update product');
    },
  });

  const deleteMutation = useMutation({
    mutationFn: productApi.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
      toast.success('Product deleted successfully');
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Failed to delete product');
    },
  });

  return {
    products: data?.data?.data || [],
    isLoading,
    error,
    createProduct: createMutation.mutate,
    isCreating: createMutation.isPending,
    updateProduct: updateMutation.mutate,
    isUpdating: updateMutation.isPending,
    deleteProduct: deleteMutation.mutate,
    isDeleting: deleteMutation.isPending,
  };
};

export const useProduct = (id: number) => {
  return useQuery({
    queryKey: ['product', id],
    queryFn: () => productApi.getById(id),
    enabled: !!id,
  });
};

export const useCategories = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ['categories'],
    queryFn: productApi.getCategories,
  });

  return {
    categories: data?.data?.data || [],
    isLoading,
    error,
  };
};