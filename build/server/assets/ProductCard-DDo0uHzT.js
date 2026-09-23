import { Link } from "@tanstack/react-router";
import { jsx, jsxs } from "react/jsx-runtime";
import { FiArrowRight } from "react-icons/fi";
import { motion } from "framer-motion";
//#region src/components/ProductCard.tsx
function ProductCard({ product, index }) {
	const primaryImage = product.images?.find((img) => img.is_primary) || product.images?.[0];
	const imageUrl = primaryImage ? `https://api.aquacityonline.shop/storage/${primaryImage.image}` : "/images/placeholder.jpg";
	return /* @__PURE__ */ jsxs(motion.article, {
		initial: {
			opacity: 0,
			y: 16
		},
		whileInView: {
			opacity: 1,
			y: 0
		},
		viewport: {
			once: true,
			margin: "-40px"
		},
		transition: {
			duration: .35,
			delay: index % 4 * .05
		},
		className: "card-surface card-lift group flex flex-col overflow-hidden",
		children: [/* @__PURE__ */ jsxs(Link, {
			to: "/products/$id",
			params: { id: product.id.toString() },
			className: "relative block aspect-[4/3] overflow-hidden bg-muted",
			children: [/* @__PURE__ */ jsx("img", {
				src: imageUrl,
				alt: product.name,
				loading: "lazy",
				className: "h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
			}), product.images && product.images.length > 1 && /* @__PURE__ */ jsxs("span", {
				className: "absolute top-2 right-2 bg-brand/90 text-white text-[10px] font-semibold px-1.5 py-0.5 rounded-full",
				children: ["+", product.images.length - 1]
			})]
		}), /* @__PURE__ */ jsxs("div", {
			className: "flex flex-1 flex-col gap-1 p-3 sm:p-3.5",
			children: [
				/* @__PURE__ */ jsx("span", {
					className: "text-[9px] sm:text-[10px] font-semibold uppercase tracking-wider text-brand line-clamp-1",
					children: product.category?.name || "Uncategorized"
				}),
				/* @__PURE__ */ jsx("h3", {
					className: "text-xs sm:text-sm font-semibold leading-snug line-clamp-2 min-h-[2.4em]",
					children: /* @__PURE__ */ jsx(Link, {
						to: "/products/$id",
						params: { id: product.id.toString() },
						className: "hover:text-brand transition-colors",
						children: product.name
					})
				}),
				/* @__PURE__ */ jsxs("div", {
					className: "mt-auto pt-2 flex items-center justify-between gap-2",
					children: [/* @__PURE__ */ jsxs(Link, {
						to: "/products/$id",
						params: { id: product.id.toString() },
						className: "inline-flex items-center gap-1 text-[11px] font-semibold text-brand group/link",
						children: ["Details", /* @__PURE__ */ jsx(FiArrowRight, { className: "h-3 w-3 transition-transform group-hover/link:translate-x-0.5" })]
					}), /* @__PURE__ */ jsxs("span", {
						className: "text-xs sm:text-sm font-bold text-foreground whitespace-nowrap",
						children: ["Rs ", Number(product.price).toLocaleString("en-PK")]
					})]
				})
			]
		})]
	});
}
//#endregion
export { ProductCard as t };
