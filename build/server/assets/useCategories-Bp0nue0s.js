import { t as apiClient } from "./client-EGeErCso.js";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
//#region src/api/categories.ts
var categoryApi = {
	getAll: () => apiClient.get("/categories"),
	getById: (id) => apiClient.get(`/categories/${id}`),
	create: (data) => apiClient.post("/admin/categories", data),
	update: (id, data) => apiClient.put(`/admin/categories/${id}`, data),
	delete: (id) => apiClient.delete(`/admin/categories/${id}`)
};
//#endregion
//#region src/hooks/useCategories.ts
var useCategories = () => {
	const queryClient = useQueryClient();
	const { data, isLoading } = useQuery({
		queryKey: ["categories"],
		queryFn: categoryApi.getAll
	});
	const createMutation = useMutation({
		mutationFn: categoryApi.create,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["categories"] });
			toast.success("Category created");
		}
	});
	const updateMutation = useMutation({
		mutationFn: ({ id, data }) => categoryApi.update(id, data),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["categories"] });
			toast.success("Category updated");
		}
	});
	const deleteMutation = useMutation({
		mutationFn: categoryApi.delete,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["categories"] });
			toast.success("Category deleted");
		}
	});
	return {
		categories: data?.data.data || [],
		isLoading,
		createCategory: createMutation.mutate,
		updateCategory: updateMutation.mutate,
		deleteCategory: deleteMutation.mutate
	};
};
//#endregion
export { useCategories as t };
