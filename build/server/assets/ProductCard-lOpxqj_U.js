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
			className: "flex flex-1 flex-col p-4",
			children: [
				/* @__PURE__ */ jsx("div", {
					className: "text-[10px] font-semibold uppercase tracking-wider text-brand",
					children: product.category
				}),
				/* @__PURE__ */ jsx("h3", {
					className: "mt-1 text-base font-semibold leading-tight",
					children: /* @__PURE__ */ jsx(Link, {
						to: "/products/$id",
						params: { id: product.id },
						className: "hover:text-brand transition-colors",
						children: product.name
					})
				}),
				/* @__PURE__ */ jsxs("p", {
					className: "mt-1 text-[11px] text-muted-foreground",
					children: ["Model: ", product.model]
				}),
				/* @__PURE__ */ jsx("p", {
					className: "mt-2 text-xs text-muted-foreground line-clamp-2",
					children: product.shortDescription
				}),
				/* @__PURE__ */ jsx("div", {
					className: "mt-4 pt-3 border-t border-border",
					children: /* @__PURE__ */ jsxs(Link, {
						to: "/products/$id",
						params: { id: product.id },
						className: "inline-flex items-center gap-1.5 text-xs font-semibold text-brand group/link",
						children: ["View Details", /* @__PURE__ */ jsx(FiArrowRight, { className: "transition-transform group-hover/link:translate-x-1" })]
					})
				})
			]
		})]
	});
}
//#endregion
export { ProductCard as t };
