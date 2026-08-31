import { t as useAuthStore } from "./authStore-CK_b9fs-.js";
import { t as useAuth } from "./useAuth-Bcoy-596.js";
import { useState } from "react";
import { Link, Outlet, useNavigate } from "@tanstack/react-router";
import { jsx, jsxs } from "react/jsx-runtime";
import { FiChevronLeft, FiChevronRight, FiFolder, FiHome, FiLogOut, FiMenu, FiPackage, FiUser, FiX } from "react-icons/fi";
//#region src/components/AdminLayout.tsx
var AdminLayout = () => {
	const { admin } = useAuthStore();
	const { logout } = useAuth();
	const navigate = useNavigate();
	const [isSidebarOpen, setIsSidebarOpen] = useState(true);
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
	const menuItems = [
		{
			path: "/admin/dashboard",
			label: "Dashboard",
			icon: FiHome
		},
		{
			path: "/admin/products",
			label: "Products",
			icon: FiPackage
		},
		{
			path: "/admin/categories",
			label: "Categories",
			icon: FiFolder
		},
		{
			path: "/admin/profile",
			label: "Profile",
			icon: FiUser
		}
	];
	const handleLogout = async () => {
		await logout();
		navigate({ to: "/login" });
	};
	const toggleSidebar = () => {
		setIsSidebarOpen(!isSidebarOpen);
	};
	return /* @__PURE__ */ jsxs("div", {
		className: "min-h-screen bg-gray-50",
		children: [
			/* @__PURE__ */ jsx("div", {
				className: "lg:hidden fixed top-4 left-4 z-50",
				children: /* @__PURE__ */ jsx("button", {
					onClick: () => setIsMobileMenuOpen(!isMobileMenuOpen),
					className: "p-2 bg-white rounded-lg shadow-lg hover:bg-gray-50 transition-colors",
					children: isMobileMenuOpen ? /* @__PURE__ */ jsx(FiX, { className: "w-6 h-6" }) : /* @__PURE__ */ jsx(FiMenu, { className: "w-6 h-6" })
				})
			}),
			/* @__PURE__ */ jsxs("aside", {
				className: `
          fixed top-0 left-0 h-full bg-white border-r border-border transition-all duration-300 z-40
          ${isSidebarOpen ? "w-64" : "w-20"}
          ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
        `,
				children: [
					/* @__PURE__ */ jsxs("div", {
						className: "flex items-center justify-between h-16 px-4 border-b border-border",
						children: [/* @__PURE__ */ jsxs("div", {
							className: "flex items-center gap-2",
							children: [/* @__PURE__ */ jsx("img", {
								src: "/images/logo2.png",
								alt: "Aqua City",
								className: `h-10 w-auto object-contain ${!isSidebarOpen && "lg:hidden"}`
							}), isSidebarOpen && /* @__PURE__ */ jsx("span", {
								className: "text-lg font-bold text-brand",
								children: "Admin Panel"
							})]
						}), /* @__PURE__ */ jsx("button", {
							onClick: toggleSidebar,
							className: "hidden lg:flex p-1 rounded-lg hover:bg-gray-100 transition-colors",
							children: isSidebarOpen ? /* @__PURE__ */ jsx(FiChevronLeft, { className: "w-5 h-5" }) : /* @__PURE__ */ jsx(FiChevronRight, { className: "w-5 h-5" })
						})]
					}),
					/* @__PURE__ */ jsx("nav", {
						className: "p-4 space-y-1",
						children: menuItems.map((item) => {
							const Icon = item.icon;
							return /* @__PURE__ */ jsxs(Link, {
								to: item.path,
								className: `
                  flex items-center gap-3 px-4 py-3 rounded-lg transition-colors
                  hover:bg-gray-100 text-gray-700 hover:text-brand
                  [&.active]:bg-brand [&.active]:text-white
                `,
								activeProps: { className: "bg-brand text-white hover:bg-brand hover:text-white" },
								onClick: () => setIsMobileMenuOpen(false),
								children: [/* @__PURE__ */ jsx(Icon, { className: "w-5 h-5 flex-shrink-0" }), isSidebarOpen && /* @__PURE__ */ jsx("span", {
									className: "text-sm font-medium",
									children: item.label
								})]
							}, item.path);
						})
					}),
					/* @__PURE__ */ jsx("div", {
						className: "absolute bottom-0 left-0 right-0 p-4 border-t border-border",
						children: /* @__PURE__ */ jsxs("button", {
							onClick: handleLogout,
							className: `
              flex items-center gap-3 w-full px-4 py-3 rounded-lg transition-colors
              text-red-600 hover:bg-red-50
            `,
							children: [/* @__PURE__ */ jsx(FiLogOut, { className: "w-5 h-5 flex-shrink-0" }), isSidebarOpen && /* @__PURE__ */ jsx("span", {
								className: "text-sm font-medium",
								children: "Logout"
							})]
						})
					})
				]
			}),
			isMobileMenuOpen && /* @__PURE__ */ jsx("div", {
				className: "fixed inset-0 bg-black/50 z-30 lg:hidden",
				onClick: () => setIsMobileMenuOpen(false)
			}),
			/* @__PURE__ */ jsxs("div", {
				className: `${isSidebarOpen ? "lg:ml-64" : "lg:ml-20"} transition-all duration-300`,
				children: [/* @__PURE__ */ jsx("header", {
					className: "bg-white border-b border-border sticky top-0 z-30",
					children: /* @__PURE__ */ jsxs("div", {
						className: "flex items-center justify-between px-6 py-4",
						children: [/* @__PURE__ */ jsx("div", {
							className: "flex items-center gap-3",
							children: /* @__PURE__ */ jsx("h1", {
								className: "text-xl font-semibold text-foreground",
								children: menuItems.find((item) => window.location.pathname.startsWith(item.path))?.label || "Dashboard"
							})
						}), /* @__PURE__ */ jsxs("div", {
							className: "flex items-center gap-4",
							children: [/* @__PURE__ */ jsx("span", {
								className: "text-sm text-gray-600 hidden sm:block",
								children: admin?.name
							}), /* @__PURE__ */ jsx("div", {
								className: "w-8 h-8 rounded-full bg-brand text-white flex items-center justify-center font-semibold",
								children: admin?.name?.charAt(0)?.toUpperCase() || "A"
							})]
						})]
					})
				}), /* @__PURE__ */ jsx("main", {
					className: "p-6",
					children: /* @__PURE__ */ jsx(Outlet, {})
				})]
			})
		]
	});
};
//#endregion
//#region src/routes/admin.tsx?tsr-split=component
function AdminLayoutWrapper() {
	return /* @__PURE__ */ jsx(AdminLayout, {});
}
//#endregion
export { AdminLayoutWrapper as component };
