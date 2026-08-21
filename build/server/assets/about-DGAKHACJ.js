import { n as SectionTitle, t as FeatureCard } from "./FeatureCard-D6UWeYNW.js";
import { Link } from "@tanstack/react-router";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
import { FiAward, FiEye, FiHeart, FiTarget, FiUsers } from "react-icons/fi";
import { motion } from "framer-motion";
//#region src/routes/about.tsx?tsr-split=component
var STATS = [
	{
		v: "15+",
		l: "Years Experience"
	},
	{
		v: "25,000+",
		l: "Happy Customers"
	},
	{
		v: "30,000+",
		l: "Installations"
	},
	{
		v: "40+",
		l: "Cities Served"
	}
];
var VALUES = [
	{
		icon: FiAward,
		title: "Quality First",
		description: "Every component is tested to global certification standards."
	},
	{
		icon: FiHeart,
		title: "Customer Care",
		description: "We treat every install as if it were in our own home."
	},
	{
		icon: FiTarget,
		title: "Precision",
		description: "Systems sized and tuned to each site's exact water profile."
	},
	{
		icon: FiUsers,
		title: "Community",
		description: "Investing in local training, jobs and water education."
	}
];
function About() {
	return /* @__PURE__ */ jsxs(Fragment, { children: [
		/* @__PURE__ */ jsxs("section", {
			className: "relative overflow-hidden -mt-20 pt-20 grad-brand text-white",
			children: [/* @__PURE__ */ jsx("div", {
				className: "absolute inset-0 opacity-20",
				children: /* @__PURE__ */ jsx("img", {
					src: "https://images.unsplash.com/photo-1439405326854-014607f694d7?w=1600&q=80",
					alt: "",
					className: "h-full w-full object-cover"
				})
			}), /* @__PURE__ */ jsx("div", {
				className: "container-x py-24 sm:py-32 relative",
				children: /* @__PURE__ */ jsxs(motion.div, {
					initial: {
						opacity: 0,
						y: 20
					},
					animate: {
						opacity: 1,
						y: 0
					},
					transition: { duration: .6 },
					className: "max-w-3xl",
					children: [
						/* @__PURE__ */ jsx("span", {
							className: "inline-flex rounded-full bg-white/15 backdrop-blur px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em]",
							children: "About Aqua City"
						}),
						/* @__PURE__ */ jsx("h1", {
							className: "mt-6 text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.05] text-balance",
							children: "We believe clean water should be a given, not a luxury."
						}),
						/* @__PURE__ */ jsx("p", {
							className: "mt-6 text-lg text-white/85 max-w-2xl leading-relaxed",
							children: "For over 15 years, Aqua City has engineered water filtration systems that families, businesses and industries trust every day."
						})
					]
				})
			})]
		}),
		/* @__PURE__ */ jsx("section", {
			className: "py-24",
			children: /* @__PURE__ */ jsxs("div", {
				className: "container-x grid gap-16 lg:grid-cols-2 lg:items-center",
				children: [/* @__PURE__ */ jsxs(motion.div, {
					initial: {
						opacity: 0,
						x: -20
					},
					whileInView: {
						opacity: 1,
						x: 0
					},
					viewport: {
						once: true,
						margin: "-80px"
					},
					transition: { duration: .5 },
					className: "relative",
					children: [/* @__PURE__ */ jsx("img", {
						src: "https://aquaclearws.com/wp-content/uploads/2022/11/water-filtration-system.jpg",
						alt: "Aqua City engineers at work",
						className: "rounded-3xl w-full aspect-[4/5] object-cover"
					}), /* @__PURE__ */ jsxs("div", {
						className: "absolute -bottom-6 -right-6 hidden sm:block card-surface p-6 max-w-[220px] shadow-soft",
						children: [/* @__PURE__ */ jsx("div", {
							className: "text-3xl font-bold text-brand",
							children: "15+"
						}), /* @__PURE__ */ jsx("div", {
							className: "text-xs uppercase tracking-widest text-muted-foreground mt-1",
							children: "Years Perfecting Water"
						})]
					})]
				}), /* @__PURE__ */ jsxs(motion.div, {
					initial: {
						opacity: 0,
						x: 20
					},
					whileInView: {
						opacity: 1,
						x: 0
					},
					viewport: {
						once: true,
						margin: "-80px"
					},
					transition: { duration: .5 },
					children: [
						/* @__PURE__ */ jsx("span", {
							className: "eyebrow",
							children: "Our Story"
						}),
						/* @__PURE__ */ jsx("h2", {
							className: "mt-4 text-3xl sm:text-4xl font-bold text-balance",
							children: "A commitment to pure water — for every home and industry."
						}),
						/* @__PURE__ */ jsxs("div", {
							className: "mt-6 space-y-4 text-muted-foreground leading-relaxed",
							children: [
								/* @__PURE__ */ jsx("p", { children: "Aqua City was founded in 2008 with a simple idea: no household or business should worry about the safety of its water. We started with a single under-sink system and a promise to over-engineer everything we build." }),
								/* @__PURE__ */ jsx("p", { children: "Today, our team designs, installs and maintains water treatment systems across 40+ cities — from studio apartments to industrial process water plants." }),
								/* @__PURE__ */ jsx("p", { children: "We're proud of the trust we've earned, but even prouder of the millions of glasses of clean water our systems produce every day." })
							]
						})
					]
				})]
			})
		}),
		/* @__PURE__ */ jsx("section", {
			className: "py-24 bg-secondary/50",
			children: /* @__PURE__ */ jsx("div", {
				className: "container-x grid gap-6 lg:grid-cols-2",
				children: [{
					icon: FiTarget,
					title: "Our Mission",
					text: "To make premium water filtration accessible, affordable and reliable — engineered locally, supported for life."
				}, {
					icon: FiEye,
					title: "Our Vision",
					text: "A world where every home, business and industry has instant access to safe, great-tasting water — free of doubt and free of waste."
				}].map(({ icon: Icon, title, text }, i) => /* @__PURE__ */ jsxs(motion.div, {
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
					transition: {
						duration: .5,
						delay: i * .1
					},
					className: "card-surface p-10 relative overflow-hidden",
					children: [
						/* @__PURE__ */ jsx("div", {
							className: "grid h-14 w-14 place-items-center rounded-2xl bg-brand-soft text-brand",
							children: /* @__PURE__ */ jsx(Icon, { className: "h-7 w-7" })
						}),
						/* @__PURE__ */ jsx("h3", {
							className: "mt-6 text-2xl font-semibold",
							children: title
						}),
						/* @__PURE__ */ jsx("p", {
							className: "mt-3 text-muted-foreground leading-relaxed",
							children: text
						})
					]
				}, title))
			})
		}),
		/* @__PURE__ */ jsx("section", {
			className: "py-24",
			children: /* @__PURE__ */ jsxs("div", {
				className: "container-x",
				children: [/* @__PURE__ */ jsx(SectionTitle, {
					eyebrow: "Core Values",
					title: "What guides every install",
					subtitle: "Four principles that shape how we design, deliver and support every system."
				}), /* @__PURE__ */ jsx("div", {
					className: "mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4",
					children: VALUES.map((v, i) => /* @__PURE__ */ jsx(FeatureCard, {
						...v,
						index: i
					}, v.title))
				})]
			})
		}),
		/* @__PURE__ */ jsx("section", {
			className: "pb-24",
			children: /* @__PURE__ */ jsx("div", {
				className: "container-x",
				children: /* @__PURE__ */ jsx("div", {
					className: "rounded-3xl grad-brand text-white p-10 sm:p-14",
					children: /* @__PURE__ */ jsx("div", {
						className: "grid gap-10 sm:grid-cols-2 lg:grid-cols-4 text-center",
						children: STATS.map((s, i) => /* @__PURE__ */ jsxs(motion.div, {
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
								delay: i * .08
							},
							children: [/* @__PURE__ */ jsx("div", {
								className: "text-4xl sm:text-5xl font-bold",
								children: s.v
							}), /* @__PURE__ */ jsx("div", {
								className: "mt-2 text-xs uppercase tracking-[0.2em] text-white/70",
								children: s.l
							})]
						}, s.l))
					})
				})
			})
		}),
		/* @__PURE__ */ jsx("section", {
			className: "pb-24",
			children: /* @__PURE__ */ jsx("div", {
				className: "container-x",
				children: /* @__PURE__ */ jsxs("div", {
					className: "rounded-3xl bg-brand-soft p-10 sm:p-14 text-center",
					children: [
						/* @__PURE__ */ jsx("h2", {
							className: "text-3xl sm:text-4xl font-bold text-balance",
							children: "Ready to work with our team?"
						}),
						/* @__PURE__ */ jsx("p", {
							className: "mt-4 text-muted-foreground max-w-2xl mx-auto",
							children: "Get a personalized recommendation from a certified Aqua City engineer."
						}),
						/* @__PURE__ */ jsxs("div", {
							className: "mt-8 flex flex-wrap justify-center gap-4",
							children: [/* @__PURE__ */ jsx(Link, {
								to: "/contact",
								className: "btn-primary",
								children: "Contact Us"
							}), /* @__PURE__ */ jsx(Link, {
								to: "/products",
								className: "btn-outline",
								children: "View Products"
							})]
						})
					]
				})
			})
		})
	] });
}
//#endregion
export { About as component };
