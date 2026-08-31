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
			toast.error(error.response?.data?.message || "Failed to create product");
		}
	});
	const updateMutation = useMutation({
		mutationFn: ({ id, data }) => productApi.update(id, data),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["products"] });
			toast.success("Product updated successfully");
		},
		onError: (error) => {
			toast.error(error.response?.data?.message || "Failed to update product");
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
		createProduct: createMutation.mutate,
		isCreating: createMutation.isPending,
		updateProduct: updateMutation.mutate,
		isUpdating: updateMutation.isPending,
		deleteProduct: deleteMutation.mutate,
		isDeleting: deleteMutation.isPending
	};
};
var useCategories = () => {
	const { data, isLoading, error } = useQuery({
		queryKey: ["categories"],
		queryFn: productApi.getCategories
	});
	return {
		categories: data?.data?.data || [],
		isLoading,
		error
	};
};
//#endregion
export { useProducts as n, productApi as r, useCategories as t };
