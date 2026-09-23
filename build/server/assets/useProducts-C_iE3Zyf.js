import { t as apiClient } from "./client-EGeErCso.js";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
//#region src/api/products.ts
var productApi = {
	getAll: () => apiClient.get("/products"),
	getById: (id) => apiClient.get(`/products/${id}`),
	getCategories: () => apiClient.get("/categories"),
	create: (data) => apiClient.post("/admin/products", data, { headers: { "Content-Type": "multipart/form-data" } }),
	update: (id, data) => apiClient.post(`/admin/products/${id}?_method=PUT`, data, { headers: { "Content-Type": "multipart/form-data" } }),
	delete: (id) => apiClient.delete(`/admin/products/${id}`)
};
//#endregion
//#region src/hooks/useProducts.ts
var useProducts = () => {
	const queryClient = useQueryClient();
	const { data, isLoading, error } = useQuery({
		queryKey: ["products"],
		queryFn: productApi.getAll
	});
	const createMutation = useMutation({
		mutationFn: productApi.create,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["products"] });
			toast.success("Product created successfully");
		},
		onError: (error) => {
			const message = error.response?.data?.message || "Failed to create product";
			if (error.response?.data?.errors) {
				const errors = error.response.data.errors;
				const firstError = Object.values(errors)[0];
				toast.error(Array.isArray(firstError) ? firstError[0] : String(firstError));
			} else toast.error(message);
		}
	});
	const updateMutation = useMutation({
		mutationFn: ({ id, data }) => productApi.update(id, data),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["products"] });
			toast.success("Product updated successfully");
		},
		onError: (error) => {
			const message = error.response?.data?.message || "Failed to update product";
			if (error.response?.data?.errors) {
				const errors = error.response.data.errors;
				const firstError = Object.values(errors)[0];
				toast.error(Array.isArray(firstError) ? firstError[0] : String(firstError));
			} else toast.error(message);
		}
	});
	const deleteMutation = useMutation({
		mutationFn: productApi.delete,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["products"] });
			toast.success("Product deleted successfully");
		},
		onError: (error) => {
			toast.error(error.response?.data?.message || "Failed to delete product");
		}
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
		isDeleting: deleteMutation.isPending
	};
};
var useCategories = () => {
	const queryClient = useQueryClient();
	const { data, isLoading, error } = useQuery({
		queryKey: ["categories"],
		queryFn: () => productApi.getCategories()
	});
	const createMutation = useMutation({
		mutationFn: (data) => productApi.createCategory(data),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["categories"] });
			toast.success("Category created successfully");
		},
		onError: (error) => {
			toast.error(error.response?.data?.message || "Failed to create category");
		}
	});
	const updateMutation = useMutation({
		mutationFn: ({ id, data }) => productApi.updateCategory(id, data),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["categories"] });
			toast.success("Category updated successfully");
		},
		onError: (error) => {
			toast.error(error.response?.data?.message || "Failed to update category");
		}
	});
	const deleteMutation = useMutation({
		mutationFn: (id) => productApi.deleteCategory(id),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["categories"] });
			toast.success("Category deleted successfully");
		},
		onError: (error) => {
			toast.error(error.response?.data?.message || "Failed to delete category");
		}
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
		isDeleting: deleteMutation.isPending
	};
};
//#endregion
export { useProducts as n, productApi as r, useCategories as t };
