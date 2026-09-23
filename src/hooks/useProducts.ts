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
      const message = error.response?.data?.message || 'Failed to create product';
      // Show validation errors if they exist
      if (error.response?.data?.errors) {
        const errors = error.response.data.errors;
        const firstError = Object.values(errors)[0];
        toast.error(Array.isArray(firstError) ? firstError[0] : String(firstError));
      } else {
        toast.error(message);
      }
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
      const message = error.response?.data?.message || 'Failed to update product';
      if (error.response?.data?.errors) {
        const errors = error.response.data.errors;
        const firstError = Object.values(errors)[0];
        toast.error(Array.isArray(firstError) ? firstError[0] : String(firstError));
      } else {
        toast.error(message);
      }
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
    createProduct: createMutation.mutateAsync,
    isCreating: createMutation.isPending,
    updateProduct: updateMutation.mutateAsync,
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
  const queryClient = useQueryClient();

  const { data, isLoading, error } = useQuery({
    queryKey: ['categories'],
    queryFn: () => productApi.getCategories(),
  });

  const createMutation = useMutation({
    mutationFn: (data: any) =>
      (productApi as typeof productApi & {
        createCategory: (data: any) => Promise<any>;
      }).createCategory(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories'] });
      toast.success('Category created successfully');
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Failed to create category');
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: number; data: any }) =>
      (productApi as typeof productApi & {
        updateCategory: (id: number, data: any) => Promise<any>;
      }).updateCategory(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories'] });
      toast.success('Category updated successfully');
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Failed to update category');
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: number) =>
      (productApi as typeof productApi & {
        deleteCategory: (id: number) => Promise<any>;
      }).deleteCategory(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories'] });
      toast.success('Category deleted successfully');
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Failed to delete category');
    },
  });

  return {
    categories: data?.data?.data || [],
    isLoading,
    error,
    createCategory: createMutation.mutateAsync,
    isCreating: createMutation.isPending,
    updateCategory: updateMutation.mutateAsync,
    isUpdating: updateMutation.isPending,
    deleteCategory: deleteMutation.mutate,
    isDeleting: deleteMutation.isPending,
  };
};