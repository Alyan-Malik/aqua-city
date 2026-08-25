import { r as getProduct } from "./products-B9kQzlJc.js";
import { createFileRoute, lazyRouteComponent, notFound } from "@tanstack/react-router";
//#region src/routes/products.$id.tsx
var $$splitNotFoundComponentImporter = () => import("./products._id-Dn7nZpCD.js");
var $$splitComponentImporter = () => import("./products._id-DeY_PUXp.js");
var Route = createFileRoute("/products/$id")({
	loader: ({ params }) => {
		const product = getProduct(params.id);
		if (!product) throw notFound();
		return { product };
	},
	head: ({ loaderData }) => {
		if (!loaderData) return { meta: [{ title: "Product not found — Aqua City" }, {
			name: "robots",
			content: "noindex"
		}] };
		const p = loaderData.product;
		return { meta: [
			{ title: `${p.name} — Aqua City` },
			{
				name: "description",
				content: p.shortDescription
			},
			{
				property: "og:title",
				content: `${p.name} — Aqua City`
			},
			{
				property: "og:description",
				content: p.shortDescription
			},
			{
				property: "og:type",
				content: "website"
			},
			{
				property: "og:image",
				content: p.image
			},
			{
				name: "twitter:card",
				content: "summary_large_image"
			},
			{
				name: "twitter:image",
				content: p.image
			}
		] };
	},
	component: lazyRouteComponent($$splitComponentImporter, "component"),
	notFoundComponent: lazyRouteComponent($$splitNotFoundComponentImporter, "notFoundComponent")
});
//#endregion
export { Route as t };
