import { createFileRoute, lazyRouteComponent } from "@tanstack/react-router";
import { z } from "zod";
//#region src/routes/products.index.tsx
var $$splitComponentImporter = () => import("./products.index-DxVkG-_Q.js");
var searchSchema = z.object({ category: z.string().optional() });
var Route = createFileRoute("/products/")({
	validateSearch: searchSchema,
	head: () => ({ meta: [
		{ title: "Products — Aqua City Water Filters" },
		{
			name: "description",
			content: "Explore the full Aqua City catalog: domestic filters, commercial RO systems, industrial plants, softeners, spare parts and cartridges."
		},
		{
			property: "og:title",
			content: "Products — Aqua City Water Filters"
		},
		{
			property: "og:description",
			content: "Explore our complete water filtration catalog."
		},
		{
			property: "og:type",
			content: "website"
		},
		{
			name: "twitter:card",
			content: "summary_large_image"
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
//#endregion
export { Route as t };
