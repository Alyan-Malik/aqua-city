import { create } from "zustand";
import { persist } from "zustand/middleware";
//#region src/store/authStore.ts
var useAuthStore = create()(persist((set) => ({
	admin: null,
	token: null,
	isAuthenticated: false,
	login: (admin, token) => {
		localStorage.setItem("admin_token", token);
		set({
			admin,
			token,
			isAuthenticated: true
		});
	},
	logout: () => {
		localStorage.removeItem("admin_token");
		set({
			admin: null,
			token: null,
			isAuthenticated: false
		});
	},
	updateAdmin: (admin) => set({ admin })
}), { name: "auth-storage" }));
//#endregion
export { useAuthStore as t };
