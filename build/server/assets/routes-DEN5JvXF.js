import { n as PRODUCTS, t as CATEGORIES } from "./products-BGlbXMd-.js";
import { n as SectionTitle, t as FeatureCard } from "./FeatureCard-D6UWeYNW.js";
import { t as ProductCard } from "./ProductCard-DdCqCB5b.js";
import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
import { FiArrowRight, FiAward, FiCheckCircle, FiDroplet, FiHeadphones, FiPhone, FiPlus, FiSettings, FiShield, FiStar, FiTool, FiTrendingUp, FiZap } from "react-icons/fi";
import { AnimatePresence, motion } from "framer-motion";
//#region src/components/CategoryCard.tsx
function CategoryCard({ category, description, image, index = 0 }) {
	return /* @__PURE__ */ jsx(motion.div, {
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
			duration: .45,
			delay: index * .05
		},
		className: "group",
		children: /* @__PURE__ */ jsxs(Link, {
			to: "/products",
			search: { category },
			className: "card-surface card-lift block overflow-hidden",
			children: [/* @__PURE__ */ jsx("div", {
				className: "aspect-[4/3] overflow-hidden bg-muted",
				children: /* @__PURE__ */ jsx("img", {
					src: image,
					alt: category,
					loading: "lazy",
					className: "h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
				})
			}), /* @__PURE__ */ jsxs("div", {
				className: "p-6",
				children: [
					/* @__PURE__ */ jsx("h3", {
						className: "text-lg font-semibold",
						children: category
					}),
					/* @__PURE__ */ jsx("p", {
						className: "mt-1.5 text-sm text-muted-foreground line-clamp-2",
						children: description
					}),
					/* @__PURE__ */ jsxs("div", {
						className: "mt-4 inline-flex items-center gap-2 text-sm font-semibold text-brand",
						children: ["Explore range", /* @__PURE__ */ jsx(FiArrowRight, { className: "transition-transform group-hover:translate-x-1" })]
					})
				]
			})]
		})
	});
}
//#endregion
//#region src/components/TestimonialCard.tsx
function TestimonialCard({ t, index = 0 }) {
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
		className: "card-surface p-7 h-full flex flex-col",
		children: [
			/* @__PURE__ */ jsx("div", {
				className: "flex items-center gap-1 text-brand",
				children: Array.from({ length: 5 }).map((_, i) => /* @__PURE__ */ jsx(FiStar, { className: `h-4 w-4 ${i < t.rating ? "fill-current" : "opacity-30"}` }, i))
			}),
			/* @__PURE__ */ jsxs("p", {
				className: "mt-4 text-[15px] leading-relaxed text-foreground/80 flex-1",
				children: [
					"\"",
					t.quote,
					"\""
				]
			}),
			/* @__PURE__ */ jsxs("div", {
				className: "mt-6 flex items-center gap-3 pt-6 border-t border-border",
				children: [/* @__PURE__ */ jsx("img", {
					src: t.avatar,
					alt: t.name,
					className: "h-11 w-11 rounded-full object-cover",
					loading: "lazy"
				}), /* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("div", {
					className: "font-semibold text-sm",
					children: t.name
				}), /* @__PURE__ */ jsx("div", {
					className: "text-xs text-muted-foreground",
					children: t.role
				})] })]
			})
		]
	});
}
//#endregion
//#region src/components/FAQAccordion.tsx
function FAQAccordion({ items }) {
	const [open, setOpen] = useState(0);
	return /* @__PURE__ */ jsx("div", {
		className: "max-w-3xl mx-auto space-y-3",
		children: items.map((item, i) => {
			const isOpen = open === i;
			return /* @__PURE__ */ jsxs("div", {
				className: `card-surface overflow-hidden transition-colors ${isOpen ? "border-brand/40" : ""}`,
				children: [/* @__PURE__ */ jsxs("button", {
					className: "w-full flex items-center justify-between gap-4 p-5 text-left",
					onClick: () => setOpen(isOpen ? null : i),
					"aria-expanded": isOpen,
					children: [/* @__PURE__ */ jsx("span", {
						className: "font-semibold text-[15px]",
						children: item.q
					}), /* @__PURE__ */ jsx("span", {
						className: `grid h-8 w-8 shrink-0 place-items-center rounded-full bg-brand-soft text-brand transition-transform ${isOpen ? "rotate-45" : ""}`,
						children: /* @__PURE__ */ jsx(FiPlus, { className: "h-4 w-4" })
					})]
				}), /* @__PURE__ */ jsx(AnimatePresence, {
					initial: false,
					children: isOpen && /* @__PURE__ */ jsx(motion.div, {
						initial: {
							height: 0,
							opacity: 0
						},
						animate: {
							height: "auto",
							opacity: 1
						},
						exit: {
							height: 0,
							opacity: 0
						},
						transition: { duration: .25 },
						className: "overflow-hidden",
						children: /* @__PURE__ */ jsx("div", {
							className: "px-5 pb-5 text-sm text-muted-foreground leading-relaxed",
							children: item.a
						})
					})
				})]
			}, i);
		})
	});
}
//#endregion
//#region src/routes/index.tsx?tsr-split=component
var HERO_BG_PATTERN = "https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=1800&q=80";
var BUBBLES = Array.from({ length: 24 }, (_, i) => ({
	id: i,
	size: Math.floor(Math.random() * 55) + 20,
	left: `${Math.random() * 95}%`,
	startY: `${Math.random() * 100}%`,
	duration: Math.random() * 8 + 7,
	blur: Math.random() > .65 ? "blur-sm" : "blur-none"
}));
var CATEGORY_META = {
	"Domestic Water Filters": {
		description: "Under-sink, countertop and whole-home purifiers for everyday drinking water.",
		image: "/images/13.jpeg"
	},
	"Commercial RO Systems": {
		description: "Reliable RO units for cafes, restaurants, hotels and offices.",
		image: "/images/9.jpeg"
	},
	"Industrial Water Treatment": {
		description: "High-capacity RO, DM and UF plants engineered for industrial process water.",
		image: "https://nuwater.com/wp-content/uploads/Untitled-design-35.png"
	},
	"Water Softeners": {
		description: "Ion-exchange softeners that eliminate scale and protect your plumbing.",
		image: "/images/5.jpeg"
	},
	"RO Spare Parts": {
		description: "Genuine membranes, pumps, tanks and accessories for every system.",
		image: "https://images.jdmagicbox.com/quickquotes/images_main/domestic-water-purifier-spare-parts-2213130807-kjs1ekva.png"
	},
	"Filter Cartridges": {
		description: "Sediment, carbon, UF and mineral cartridges with standard fittings.",
		image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQSIFBElaw7depL6ENtKEFsFTBFruJ1gKBXZDER1A9wLqeWqEkIfm54RMwj&s=10"
	}
};
var FEATURES = [
	{
		icon: FiAward,
		title: "Premium Water Filters",
		description: "Industry-leading systems certified to NSF and WQA standards."
	},
	{
		icon: FiTool,
		title: "Expert Installation",
		description: "Trained technicians handle setup, testing and calibration for every install."
	},
	{
		icon: FiShield,
		title: "Trusted Quality",
		description: "15+ years of clean-water expertise across residential and industrial projects."
	},
	{
		icon: FiZap,
		title: "Energy Efficient",
		description: "Low-power pumps and smart valves keep operating costs low."
	},
	{
		icon: FiTrendingUp,
		title: "Affordable Solutions",
		description: "Flexible plans and long-life cartridges reduce total cost of ownership."
	},
	{
		icon: FiHeadphones,
		title: "After-Sales Support",
		description: "Annual maintenance contracts and priority service on every unit we install."
	}
];
var SERVICES = [
	{
		icon: FiSettings,
		title: "Installation",
		description: "Professional setup for homes, offices and industrial facilities."
	},
	{
		icon: FiTool,
		title: "Maintenance",
		description: "Scheduled servicing to keep systems performing at peak efficiency."
	},
	{
		icon: FiDroplet,
		title: "Filter Replacement",
		description: "Genuine cartridges, membranes and consumables replaced on time."
	},
	{
		icon: FiCheckCircle,
		title: "Water Quality Testing",
		description: "Comprehensive lab-grade analysis with actionable recommendations."
	},
	{
		icon: FiShield,
		title: "Annual Maintenance",
		description: "AMC plans that cover parts, labor and priority emergency support."
	},
	{
		icon: FiHeadphones,
		title: "Consultation",
		description: "Free site surveys and system sizing for your unique requirements."
	}
];
var PROCESS = [
	{
		step: "01",
		title: "Consultation",
		text: "We discuss your water needs, usage and space."
	},
	{
		step: "02",
		title: "Water Analysis",
		text: "On-site testing determines the right filtration path."
	},
	{
		step: "03",
		title: "Recommendation",
		text: "We propose a system tuned to your water and budget."
	},
	{
		step: "04",
		title: "Installation",
		text: "Certified technicians install with zero disruption."
	},
	{
		step: "05",
		title: "Testing",
		text: "Every unit is commissioned and quality-tested."
	},
	{
		step: "06",
		title: "Support",
		text: "Ongoing maintenance keeps your water pure for years."
	}
];
var TESTIMONIALS = [
	{
		name: "Ahmed Khan",
		role: "Homeowner",
		quote: "Aqua City transformed our home water. The install was clean and the water tastes incredible.",
		rating: 5,
		avatar: "https://uxwing.com/wp-content/themes/uxwing/download/peoples-avatars/default-avatar-profile-picture-male-icon.png"
	},
	{
		name: "Iftikhar Malik",
		role: "Restaurant Owner",
		quote: "Our commercial RO has run flawlessly for two years. Support team is always a call away.",
		rating: 5,
		avatar: "https://uxwing.com/wp-content/themes/uxwing/download/peoples-avatars/default-avatar-profile-picture-male-icon.png"
	},
	{
		name: "Mariyum Ali",
		role: "Facility Manager",
		quote: "Rock-solid industrial plant. They handled everything from design to commissioning.",
		rating: 5,
		avatar: "https://uxwing.com/wp-content/themes/uxwing/download/peoples-avatars/default-avatar-profile-picture-female-icon.png"
	},
	{
		name: "Muhammad Mehmood",
		role: "Hotel GM",
		quote: "The softener eliminated our scale headaches overnight. Highly recommended.",
		rating: 5,
		avatar: "https://uxwing.com/wp-content/themes/uxwing/download/peoples-avatars/default-avatar-profile-picture-male-icon.png"
	},
	{
		name: "Fatima Hussain",
		role: "Homeowner",
		quote: "Professional, punctual, and priced fairly. The mineral cartridge makes a real difference.",
		rating: 4,
		avatar: "https://uxwing.com/wp-content/themes/uxwing/download/peoples-avatars/default-avatar-profile-picture-female-icon.png"
	},
	{
		name: "Saad Rao",
		role: "Cafe Owner",
		quote: "Our espresso quality jumped after installing their commercial RO. Zero downtime since.",
		rating: 5,
		avatar: "https://uxwing.com/wp-content/themes/uxwing/download/peoples-avatars/default-avatar-profile-picture-male-icon.png"
	}
];
var FAQS = [
	{
		q: "How often should filter cartridges be replaced?",
		a: "Sediment and carbon cartridges are typically replaced every 6–12 months, RO membranes every 2–3 years. Our AMC plans handle this for you automatically."
	},
	{
		q: "Do you install in apartments and rental properties?",
		a: "Yes. We offer non-invasive countertop and under-sink systems that install without permanent plumbing changes."
	},
	{
		q: "Is a booster pump required?",
		a: "It depends on your inlet pressure. If pressure is below 40 PSI, we recommend adding our AquaCity booster pump."
	},
	{
		q: "Do you provide water testing?",
		a: "Absolutely. Every consultation includes free on-site TDS and hardness testing, plus lab analysis on request."
	},
	{
		q: "What warranties do you offer?",
		a: "All systems ship with a 2-year limited warranty. Extended plans and AMC options are available at installation."
	}
];
function Home() {
	const featured = PRODUCTS.slice(0, 6);
	return /* @__PURE__ */ jsxs(Fragment, { children: [
		/* @__PURE__ */ jsxs("section", {
			className: "relative overflow-hidden -mt-20 pt-20 bg-gradient-to-br from-brand via-brand/90 to-brand-hover min-h-[90vh] flex items-center",
			children: [
				/* @__PURE__ */ jsx("div", {
					className: "absolute inset-0 z-0 opacity-40 mix-blend-overlay",
					children: /* @__PURE__ */ jsx("img", {
						src: HERO_BG_PATTERN,
						alt: "Pure clean water refraction pattern",
						className: "h-full w-full object-cover scale-105"
					})
				}),
				/* @__PURE__ */ jsx("div", {
					className: "absolute inset-0 z-0 overflow-hidden pointer-events-none",
					children: BUBBLES.map((bubble) => /* @__PURE__ */ jsx(motion.div, {
						className: `absolute rounded-full border border-white/45 bg-gradient-to-tr from-white/35 via-white/10 to-transparent shadow-[inset_0_0_12px_rgba(255,255,255,0.7),0_8px_20px_rgba(0,0,0,0.12)] backdrop-blur-[2px] ${bubble.blur}`,
						style: {
							width: bubble.size,
							height: bubble.size,
							left: bubble.left,
							top: bubble.startY
						},
						animate: {
							y: ["0vh", "-110vh"],
							x: [
								0,
								Math.sin(bubble.id) * 35,
								0
							],
							scale: [
								1,
								1.12,
								.92,
								1
							]
						},
						transition: {
							duration: bubble.duration,
							repeat: Infinity,
							ease: "linear"
						},
						children: /* @__PURE__ */ jsx("div", { className: "absolute top-2 left-2 w-1.5 h-1.5 rounded-full bg-white/90 blur-[0.3px]" })
					}, bubble.id))
				}),
				/* @__PURE__ */ jsx(motion.div, {
					"aria-hidden": true,
					className: "absolute -top-24 -right-24 h-96 w-96 rounded-full bg-cyan-400/20 blur-3xl pointer-events-none",
					animate: {
						y: [
							0,
							25,
							0
						],
						scale: [
							1,
							1.05,
							1
						]
					},
					transition: {
						duration: 8,
						repeat: Infinity,
						ease: "easeInOut"
					}
				}),
				/* @__PURE__ */ jsx(motion.div, {
					"aria-hidden": true,
					className: "absolute bottom-0 -left-24 h-80 w-80 rounded-full bg-blue-300/20 blur-3xl pointer-events-none",
					animate: {
						y: [
							0,
							-25,
							0
						],
						scale: [
							1,
							1.1,
							1
						]
					},
					transition: {
						duration: 10,
						repeat: Infinity,
						ease: "easeInOut"
					}
				}),
				/* @__PURE__ */ jsx("div", {
					className: "container-x py-24 sm:py-32 lg:py-40 relative z-10",
					children: /* @__PURE__ */ jsxs(motion.div, {
						initial: {
							opacity: 0,
							y: 30
						},
						animate: {
							opacity: 1,
							y: 0
						},
						transition: { duration: .7 },
						className: "max-w-3xl text-white",
						children: [
							/* @__PURE__ */ jsxs("span", {
								className: "inline-flex items-center gap-2 rounded-full bg-white/15 backdrop-blur px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] border border-white/20",
								children: [/* @__PURE__ */ jsx(FiDroplet, {}), " Trusted water experts since 2008"]
							}),
							/* @__PURE__ */ jsxs("h1", {
								className: "mt-6 text-4xl sm:text-5xl lg:text-7xl font-bold leading-[1.05] text-balance",
								children: [
									"Pure Water.",
									/* @__PURE__ */ jsx("br", {}),
									"Healthier Living."
								]
							}),
							/* @__PURE__ */ jsx("p", {
								className: "mt-6 text-lg sm:text-xl text-white/85 max-w-2xl leading-relaxed",
								children: "Aqua City engineers, installs and maintains premium water filtration systems for homes, businesses and industries — delivering safe, great-tasting water for over a decade."
							}),
							/* @__PURE__ */ jsxs("div", {
								className: "mt-10 flex flex-wrap gap-4",
								children: [/* @__PURE__ */ jsx(Link, {
									to: "/products",
									className: "btn-primary bg-white !text-brand hover:!bg-white/90 shadow-lg",
									children: "View Products"
								}), /* @__PURE__ */ jsx(Link, {
									to: "/contact",
									className: "btn-ghost-light border border-white/30 hover:bg-white/10",
									children: "Contact Us"
								})]
							}),
							/* @__PURE__ */ jsx("div", {
								className: "mt-14 grid grid-cols-2 sm:grid-cols-4 gap-6 max-w-2xl",
								children: [
									["15+", "Years Experience"],
									["25k+", "Installations"],
									["6", "Product Categories"],
									["24/7", "Support"]
								].map(([v, l]) => /* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("div", {
									className: "text-3xl sm:text-4xl font-bold",
									children: v
								}), /* @__PURE__ */ jsx("div", {
									className: "mt-1 text-xs uppercase tracking-widest text-white/70",
									children: l
								})] }, l))
							})
						]
					})
				})
			]
		}),
		/* @__PURE__ */ jsx("section", {
			className: "py-24",
			children: /* @__PURE__ */ jsxs("div", {
				className: "container-x",
				children: [/* @__PURE__ */ jsx(SectionTitle, {
					eyebrow: "Why Aqua City",
					title: "Engineered for clean water. Built for peace of mind.",
					subtitle: "Every system we install is backed by certified quality, transparent pricing and lifetime support."
				}), /* @__PURE__ */ jsx("div", {
					className: "mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3",
					children: FEATURES.map((f, i) => /* @__PURE__ */ jsx(FeatureCard, {
						...f,
						index: i
					}, f.title))
				})]
			})
		}),
		/* @__PURE__ */ jsx("section", {
			className: "py-24 bg-secondary/50",
			children: /* @__PURE__ */ jsxs("div", {
				className: "container-x",
				children: [/* @__PURE__ */ jsx(SectionTitle, {
					eyebrow: "Our Range",
					title: "Product Categories",
					subtitle: "From compact countertop purifiers to large-scale industrial plants."
				}), /* @__PURE__ */ jsx("div", {
					className: "mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3",
					children: CATEGORIES.map((c, i) => /* @__PURE__ */ jsx(CategoryCard, {
						category: c,
						description: CATEGORY_META[c].description,
						image: CATEGORY_META[c].image,
						index: i
					}, c))
				})]
			})
		}),
		/* @__PURE__ */ jsx("section", {
			className: "py-24",
			children: /* @__PURE__ */ jsxs("div", {
				className: "container-x",
				children: [
					/* @__PURE__ */ jsx(SectionTitle, {
						eyebrow: "Featured",
						title: "Bestselling systems",
						subtitle: "Handpicked units our customers rely on every day."
					}),
					/* @__PURE__ */ jsx("div", {
						className: "mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3",
						children: featured.map((p, i) => /* @__PURE__ */ jsx(ProductCard, {
							product: p,
							index: i
						}, p.id))
					}),
					/* @__PURE__ */ jsx("div", {
						className: "mt-12 text-center",
						children: /* @__PURE__ */ jsx(Link, {
							to: "/products",
							className: "btn-primary",
							children: "Browse full catalog"
						})
					})
				]
			})
		}),
		/* @__PURE__ */ jsx("section", {
			className: "py-24 bg-secondary/50",
			children: /* @__PURE__ */ jsxs("div", {
				className: "container-x",
				children: [/* @__PURE__ */ jsx(SectionTitle, {
					eyebrow: "Services",
					title: "End-to-end water solutions",
					subtitle: "From first consultation to long-term support — we handle every step."
				}), /* @__PURE__ */ jsx("div", {
					className: "mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3",
					children: SERVICES.map((s, i) => /* @__PURE__ */ jsx(FeatureCard, {
						...s,
						index: i
					}, s.title))
				})]
			})
		}),
		/* @__PURE__ */ jsx("section", {
			className: "py-24",
			children: /* @__PURE__ */ jsxs("div", {
				className: "container-x",
				children: [/* @__PURE__ */ jsx(SectionTitle, {
					eyebrow: "Our Process",
					title: "A proven six-step approach",
					subtitle: "A structured method that guarantees consistent, reliable results."
				}), /* @__PURE__ */ jsx("div", {
					className: "mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3",
					children: PROCESS.map((p, i) => /* @__PURE__ */ jsxs(motion.div, {
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
							delay: i * .05
						},
						className: "card-surface card-lift p-7 relative overflow-hidden",
						children: [
							/* @__PURE__ */ jsx("span", {
								className: "absolute -top-2 -right-2 text-7xl font-bold text-brand-soft select-none",
								children: p.step
							}),
							/* @__PURE__ */ jsx("h3", {
								className: "relative text-lg font-semibold",
								children: p.title
							}),
							/* @__PURE__ */ jsx("p", {
								className: "relative mt-2 text-sm text-muted-foreground leading-relaxed",
								children: p.text
							})
						]
					}, p.step))
				})]
			})
		}),
		/* @__PURE__ */ jsx("section", {
			className: "py-24 bg-secondary/50",
			children: /* @__PURE__ */ jsxs("div", {
				className: "container-x",
				children: [/* @__PURE__ */ jsx(SectionTitle, {
					eyebrow: "Testimonials",
					title: "Trusted by families and businesses",
					subtitle: "Real stories from customers who chose Aqua City for their water."
				}), /* @__PURE__ */ jsx("div", {
					className: "mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3",
					children: TESTIMONIALS.map((t, i) => /* @__PURE__ */ jsx(TestimonialCard, {
						t,
						index: i
					}, t.name))
				})]
			})
		}),
		/* @__PURE__ */ jsx("section", {
			className: "py-24",
			children: /* @__PURE__ */ jsxs("div", {
				className: "container-x",
				children: [/* @__PURE__ */ jsx(SectionTitle, {
					eyebrow: "FAQ",
					title: "Answers to common questions",
					subtitle: "Still curious? Get in touch — we love talking water."
				}), /* @__PURE__ */ jsx("div", {
					className: "mt-14",
					children: /* @__PURE__ */ jsx(FAQAccordion, { items: FAQS })
				})]
			})
		}),
		/* @__PURE__ */ jsx("section", {
			className: "pb-24",
			children: /* @__PURE__ */ jsx("div", {
				className: "container-x",
				children: /* @__PURE__ */ jsxs(motion.div, {
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
					className: "relative overflow-hidden rounded-3xl grad-brand text-white p-10 sm:p-16",
					children: [
						/* @__PURE__ */ jsx("div", { className: "absolute -top-16 -right-16 h-72 w-72 rounded-full bg-white/10 blur-3xl" }),
						/* @__PURE__ */ jsx("div", { className: "absolute -bottom-20 -left-16 h-72 w-72 rounded-full bg-white/10 blur-3xl" }),
						/* @__PURE__ */ jsxs("div", {
							className: "relative max-w-3xl",
							children: [
								/* @__PURE__ */ jsx("h2", {
									className: "text-3xl sm:text-4xl lg:text-5xl font-bold text-balance",
									children: "Ready for cleaner, healthier water at home or work?"
								}),
								/* @__PURE__ */ jsx("p", {
									className: "mt-4 text-white/85 text-lg max-w-2xl",
									children: "Talk to our water experts today. Free consultation, free water testing and a custom recommendation — no pressure, no obligation."
								}),
								/* @__PURE__ */ jsxs("div", {
									className: "mt-8 flex flex-wrap gap-4",
									children: [/* @__PURE__ */ jsx(Link, {
										to: "/contact",
										className: "btn-primary bg-white !text-brand hover:!bg-white/90",
										children: "Book a Free Consultation"
									}), /* @__PURE__ */ jsxs("a", {
										href: "tel:+923005254953",
										className: "btn-ghost-light",
										children: [/* @__PURE__ */ jsx(FiPhone, {}), " Call\xA0 03005254953"]
									})]
								})
							]
						})
					]
				})
			})
		})
	] });
}
//#endregion
export { Home as component };
