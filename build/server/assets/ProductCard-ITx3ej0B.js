import { Link } from "@tanstack/react-router";
import { jsx, jsxs } from "react/jsx-runtime";
import { FiArrowRight } from "react-icons/fi";
import { motion } from "framer-motion";
//#region src/components/ProductCard.tsx
function ProductCard({ product, index }) {
	const primaryImage = product.images?.find((img) => img.is_primary) || product.images?.[0];
	const imageUrl = primaryImage ? `https://api.aquacityonline.shop/storage/${primaryImage.image}` : "/images/placeholder.jpg";
	const features = Array.isArray(product.key_features) ? product.key_features : product.key_features ? JSON.parse(product.key_features) : [];
	return /* @__PURE__ */ jsxs(motion.article, {
		initial: {
			opacity: 0,
			y: 20
		},
		whileInView: {
			opacity: 1,
			y: 0
		},
		viewport: {
			once: true,
			margin: "-60px"
		},
		transition: {
			duration: .4,
			delay: index % 6 * .04
		},
		className: "card-surface card-lift group flex flex-col overflow-hidden",
		children: [/* @__PURE__ */ jsxs(Link, {
			to: "/products/$id",
			params: { id: product.id.toString() },
			className: "block aspect-[16/10] overflow-hidden bg-muted relative",
			children: [/* @__PURE__ */ jsx("img", {
				src: imageUrl,
				alt: product.name,
				loading: "lazy",
				className: "h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
			}), product.images && product.images.length > 1 && /* @__PURE__ */ jsxs("div", {
				className: "absolute top-1.5 right-1.5 bg-black/70 text-white text-[10px] px-1.5 py-0.5 rounded-full backdrop-blur",
				children: ["+", product.images.length]
			})]
		}), /* @__PURE__ */ jsxs("div", {
			className: "flex flex-1 flex-col p-3 sm:p-3.5",
			children: [
				/* @__PURE__ */ jsx("div", {
					className: "text-[9px] font-semibold uppercase tracking-wider text-brand",
					children: product.category?.name || "Uncategorized"
				}),
				/* @__PURE__ */ jsx("h3", {
					className: "mt-0.5 text-sm font-semibold leading-snug line-clamp-2",
					children: /* @__PURE__ */ jsx(Link, {
						to: "/products/$id",
						params: { id: product.id.toString() },
						className: "hover:text-brand transition-colors",
						children: product.name
					})
				}),
				product.model_no && /* @__PURE__ */ jsxs("p", {
					className: "mt-0.5 text-[10px] text-muted-foreground",
					children: ["Model: ", product.model_no]
				}),
				product.description && /* @__PURE__ */ jsx("p", {
					className: "mt-1.5 text-[11px] text-muted-foreground line-clamp-2 hidden sm:block",
					children: product.description
				}),
				features.length > 0 && /* @__PURE__ */ jsxs("div", {
					className: "mt-2 hidden sm:flex flex-wrap gap-1",
					children: [features.slice(0, 2).map((feature, idx) => /* @__PURE__ */ jsx("span", {
						className: "text-[10px] bg-secondary text-secondary-foreground px-1.5 py-0.5 rounded-full",
						children: feature
					}, idx)), features.length > 2 && /* @__PURE__ */ jsxs("span", {
						className: "text-[10px] text-muted-foreground",
						children: [
							"+",
							features.length - 2,
							" more"
						]
					})]
				}),
				/* @__PURE__ */ jsxs("div", {
					className: "mt-auto pt-2.5 border-t border-border flex items-center justify-between gap-2",
					children: [/* @__PURE__ */ jsxs(Link, {
						to: "/products/$id",
						params: { id: product.id.toString() },
						className: "inline-flex items-center gap-1 text-[11px] font-semibold text-brand group/link",
						children: ["Details", /* @__PURE__ */ jsx(FiArrowRight, { className: "h-3 w-3 transition-transform group-hover/link:translate-x-1" })]
					}), /* @__PURE__ */ jsxs("span", {
						className: "text-xs font-bold text-foreground whitespace-nowrap",
						children: ["Rs", Number(product.price).toFixed(0)]
					})]
				})
			]
		})]
	});
}
//#endregion
export { ProductCard as t };
