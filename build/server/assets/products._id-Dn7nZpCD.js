import { Link } from "@tanstack/react-router";
import { jsx, jsxs } from "react/jsx-runtime";
//#region src/routes/products.$id.tsx?tsr-split=notFoundComponent
var SplitNotFoundComponent = () => /* @__PURE__ */ jsxs("div", {
	className: "container-x py-32 text-center",
	children: [
		/* @__PURE__ */ jsx("h1", {
			className: "text-3xl font-bold",
			children: "Product not found"
		}),
		/* @__PURE__ */ jsx("p", {
			className: "mt-3 text-muted-foreground",
			children: "The item you're looking for isn't in our catalog."
		}),
		/* @__PURE__ */ jsx(Link, {
			to: "/products",
			className: "btn-primary mt-8",
			children: "Back to catalog"
		})
	]
});
//#endregion
export { SplitNotFoundComponent as notFoundComponent };
