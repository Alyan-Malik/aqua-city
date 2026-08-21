import { Link } from "@tanstack/react-router";
import { jsx, jsxs } from "react/jsx-runtime";
import { FiArrowRight } from "react-icons/fi";
import { motion } from "framer-motion";
//#region src/components/ProductCard.tsx
function ProductCard({ product, index = 0 }) {
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
		children: [/* @__PURE__ */ jsx(Link, {
			to: "/products/$id",
			params: { id: product.id },
			className: "block aspect-[4/3] overflow-hidden bg-muted",
			children: /* @__PURE__ */ jsx("img", {
				src: product.image,
				alt: product.name,
				loading: "lazy",
				className: "h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
			})
		}), /* @__PURE__ */ jsxs("div", {
			className: "flex flex-1 flex-col p-6",
			children: [
				/* @__PURE__ */ jsx("div", {
					className: "text-xs font-semibold uppercase tracking-[0.16em] text-brand",
					children: product.category
				}),
				/* @__PURE__ */ jsx("h3", {
					className: "mt-2 text-lg font-semibold leading-snug",
					children: /* @__PURE__ */ jsx(Link, {
						to: "/products/$id",
						params: { id: product.id },
						className: "hover:text-brand transition-colors",
						children: product.name
					})
				}),
				/* @__PURE__ */ jsxs("p", {
					className: "mt-1 text-xs text-muted-foreground",
					children: ["Model: ", product.model]
				}),
				/* @__PURE__ */ jsx("p", {
					className: "mt-3 text-sm text-muted-foreground line-clamp-2",
					children: product.shortDescription
				}),
				/* @__PURE__ */ jsx("div", {
					className: "mt-5 pt-5 border-t border-border",
					children: /* @__PURE__ */ jsxs(Link, {
						to: "/products/$id",
						params: { id: product.id },
						className: "inline-flex items-center gap-2 text-sm font-semibold text-brand group/link",
						children: ["View Details", /* @__PURE__ */ jsx(FiArrowRight, { className: "transition-transform group-hover/link:translate-x-1" })]
					})
				})
			]
		})]
	});
}
//#endregion
export { ProductCard as t };
