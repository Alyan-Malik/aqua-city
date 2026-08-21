import { jsx, jsxs } from "react/jsx-runtime";
import { motion } from "framer-motion";
//#region src/components/SectionTitle.tsx
function SectionTitle({ eyebrow, title, subtitle, align = "center" }) {
	return /* @__PURE__ */ jsxs(motion.div, {
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
			margin: "-80px"
		},
		transition: { duration: .5 },
		className: `max-w-2xl ${align === "center" ? "mx-auto text-center" : ""}`,
		children: [
			eyebrow && /* @__PURE__ */ jsx("span", {
				className: "eyebrow",
				children: eyebrow
			}),
			/* @__PURE__ */ jsx("h2", {
				className: "mt-4 text-3xl sm:text-4xl lg:text-5xl font-bold text-balance",
				children: title
			}),
			subtitle && /* @__PURE__ */ jsx("p", {
				className: "mt-4 text-base sm:text-lg text-muted-foreground text-balance leading-relaxed",
				children: subtitle
			})
		]
	});
}
//#endregion
//#region src/components/FeatureCard.tsx
function FeatureCard({ icon: Icon, title, description, index = 0 }) {
	return /* @__PURE__ */ jsxs(motion.div, {
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
			delay: index * .05
		},
		className: "card-surface card-lift p-7",
		children: [
			/* @__PURE__ */ jsx("div", {
				className: "grid h-12 w-12 place-items-center rounded-xl bg-brand-soft text-brand",
				children: /* @__PURE__ */ jsx(Icon, { className: "h-6 w-6" })
			}),
			/* @__PURE__ */ jsx("h3", {
				className: "mt-5 text-lg font-semibold",
				children: title
			}),
			/* @__PURE__ */ jsx("p", {
				className: "mt-2 text-sm text-muted-foreground leading-relaxed",
				children: description
			})
		]
	});
}
//#endregion
export { SectionTitle as n, FeatureCard as t };
