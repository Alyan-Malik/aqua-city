// src/hooks/useCategories.ts
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { categoryApi } from '../api/categories';

export const useCategories = () => {
  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: ['categories'],
    queryFn: categoryApi.getAll,
  });

  const createMutation = useMutation({
    mutationFn: categoryApi.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories'] });
      toast.success('Category created');
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: number; data: { name: string; description?: string } }) =>
      categoryApi.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories'] });
      toast.success('Category updated');
    },
  });

  const deleteMutation = useMutation({
    mutationFn: categoryApi.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories'] });
      toast.success('Category deleted');
    },
  });

  return {
    categories: data?.data.data || [],
    isLoading,
    createCategory: createMutation.mutate,
    updateCategory: updateMutation.mutate,
    deleteCategory: deleteMutation.mutate,
  };
};