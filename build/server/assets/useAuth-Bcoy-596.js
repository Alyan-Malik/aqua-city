import { t as apiClient } from "./client-EGeErCso.js";
import { t as useAuthStore } from "./authStore-CK_b9fs-.js";
import { useNavigate } from "@tanstack/react-router";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
//#region src/api/auth.ts
var authApi = {
	login: (data) => apiClient.post("/admin/login", data),
	logout: () => apiClient.post("/admin/logout"),
	getProfile: () => apiClient.get("/admin/profile"),
	updateProfile: (data) => apiClient.put("/admin/profile", data),
	updatePassword: (data) => apiClient.put("/admin/password", data)
};
//#endregion
//#region src/hooks/useAuth.ts
var useAuth = () => {
	const navigate = useNavigate();
	const queryClient = useQueryClient();
	const { login: storeLogin, logout: storeLogout, updateAdmin } = useAuthStore();
	const loginMutation = useMutation({
		mutationFn: async (credentials) => {
			console.log("Attempting login with:", credentials.email);
			const response = await authApi.login(credentials);
			console.log("Login API response:", response);
			return response;
		},
		onSuccess: (response) => {
			console.log("Login success, response data:", response.data);
			const { admin, token } = response.data.data;
			if (!admin || !token) {
				toast.error("Invalid response from server");
				return;
			}
			storeLogin(admin, token);
			toast.success("Login successful!");
			navigate({ to: "/admin/dashboard" });
		},
		onError: (error) => {
			console.error("Login mutation error:", error);
			let errorMessage = "Login failed. Please try again.";
			if (error.response) {
				console.error("Error response:", error.response);
				errorMessage = error.response.data?.message || error.response.statusText || "Invalid credentials";
			} else if (error.request) {
				console.error("No response received:", error.request);
				errorMessage = "No response from server. Please check your connection.";
			} else {
				console.error("Request error:", error.message);
				errorMessage = error.message || "An error occurred";
			}
			toast.error(errorMessage);
		}
	});
	const logoutMutation = useMutation({
		mutationFn: () => authApi.logout(),
		onSuccess: () => {
			storeLogout();
			queryClient.clear();
			toast.success("Logged out successfully");
			navigate({ to: "/login" });
		},
		onError: (error) => {
			console.error("Logout error:", error);
			storeLogout();
			queryClient.clear();
			navigate({ to: "/login" });
		}
	});
	const updateProfileMutation = useMutation({
		mutationFn: (data) => authApi.updateProfile(data),
		onSuccess: (response) => {
			updateAdmin(response.data.data);
			toast.success("Profile updated successfully");
		},
		onError: (error) => {
			toast.error(error.response?.data?.message || "Update failed");
		}
	});
	const updatePasswordMutation = useMutation({
		mutationFn: (data) => authApi.updatePassword(data),
		onSuccess: () => {
			toast.success("Password updated successfully");
		},
		onError: (error) => {
			toast.error(error.response?.data?.message || "Password update failed");
		}
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
		updatePasswordLoading: updatePasswordMutation.isPending
	};
};
//#endregion
export { useAuth as t };
