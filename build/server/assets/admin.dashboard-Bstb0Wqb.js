import { n as useProducts } from "./useProducts-CxPBCS1w.js";
import { t as useCategories } from "./useCategories-Bp0nue0s.js";
import { t as useAuthStore } from "./authStore-CK_b9fs-.js";
import "react";
import { jsx, jsxs } from "react/jsx-runtime";
//#region src/components/Dashboard.tsx
var Dashboard = () => {
	const { admin } = useAuthStore();
	const { products, isLoading: productsLoading } = useProducts();
	const { categories, isLoading: categoriesLoading } = useCategories();
	if (productsLoading || categoriesLoading) return /* @__PURE__ */ jsx("div", {
		className: "text-center py-8",
		children: "Loading dashboard..."
	});
	const totalRevenue = products.reduce((sum, p) => sum + Number(p.price), 0);
	return /* @__PURE__ */ jsxs("div", { children: [
		/* @__PURE__ */ jsxs("h1", {
			className: "text-2xl font-bold text-foreground mb-2",
			children: [
				"Welcome back, ",
				admin?.name,
				"!"
			]
		}),
		/* @__PURE__ */ jsx("p", {
			className: "text-muted-foreground mb-6",
			children: "Here's what's happening with your store today."
		}),
		/* @__PURE__ */ jsxs("div", {
			className: "grid grid-cols-1 md:grid-cols-3 gap-6",
			children: [
				/* @__PURE__ */ jsxs("div", {
					className: "card-surface p-6",
					children: [/* @__PURE__ */ jsx("p", {
						className: "text-sm text-muted-foreground",
						children: "Total Products"
					}), /* @__PURE__ */ jsx("p", {
						className: "text-3xl font-bold text-brand mt-1",
						children: products.length
					})]
				}),
				/* @__PURE__ */ jsxs("div", {
					className: "card-surface p-6",
					children: [/* @__PURE__ */ jsx("p", {
						className: "text-sm text-muted-foreground",
						children: "Categories"
					}), /* @__PURE__ */ jsx("p", {
						className: "text-3xl font-bold text-brand mt-1",
						children: categories.length
					})]
				}),
				/* @__PURE__ */ jsxs("div", {
					className: "card-surface p-6",
					children: [/* @__PURE__ */ jsx("p", {
						className: "text-sm text-muted-foreground",
						children: "Total Revenue"
					}), /* @__PURE__ */ jsxs("p", {
						className: "text-3xl font-bold text-brand mt-1",
						children: ["Rs", totalRevenue.toFixed(2)]
					})]
				})
			]
		})
	] });
};
//#endregion
//#region src/routes/admin.dashboard.tsx?tsr-split=component
var SplitComponent = Dashboard;
//#endregion
export { SplitComponent as component };
