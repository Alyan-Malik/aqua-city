import { n as useProducts, t as useCategories } from "./useProducts-C_iE3Zyf.js";
import { n as SectionTitle, t as FeatureCard } from "./FeatureCard-BIX2bQFy.js";
import { t as ProductCard } from "./ProductCard-DDo0uHzT.js";
import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
import { FiArrowRight, FiAward, FiCheckCircle, FiChevronLeft, FiChevronRight, FiDroplet, FiHeadphones, FiPhone, FiPlus, FiSettings, FiShield, FiStar, FiTool, FiTrendingUp, FiZap } from "react-icons/fi";
import { AnimatePresence, motion } from "framer-motion";
//#region src/components/CategoryCard.tsx
function CategoryCard({ category, description, image, index = 0 }) {
	return /* @__PURE__ */ jsx(motion.div, {
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
			delay: index * .04
		},
		className: "group",
		children: /* @__PURE__ */ jsxs(Link, {
			to: "/products",
			search: { category },
			className: "card-surface card-lift block overflow-hidden h-full",
			children: [/* @__PURE__ */ jsx("div", {
				className: "relative aspect-[4/3] overflow-hidden bg-muted",
				children: /* @__PURE__ */ jsx("img", {
					src: image,
					alt: category,
					loading: "lazy",
					className: "h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
				})
			}), /* @__PURE__ */ jsxs("div", {
				className: "p-2.5 sm:p-3",
				children: [
					/* @__PURE__ */ jsx("h3", {
						className: "text-xs sm:text-sm font-semibold leading-snug line-clamp-1",
						children: category
					}),
					/* @__PURE__ */ jsx("p", {
						className: "mt-0.5 text-[10px] sm:text-[11px] text-muted-foreground line-clamp-2 leading-relaxed",
						children: description
					}),
					/* @__PURE__ */ jsxs("span", {
						className: "mt-1.5 inline-flex items-center gap-1 text-[10px] sm:text-[11px] font-semibold text-brand",
						children: ["Explore", /* @__PURE__ */ jsx(FiArrowRight, { className: "h-3 w-3 transition-transform group-hover:translate-x-0.5" })]
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
//#region src/components/HeroSlider.tsx
function HeroSlider({ slides, interval = 6e3 }) {
	const [current, setCurrent] = useState(0);
	const [paused, setPaused] = useState(false);
	useEffect(() => {
		if (paused || slides.length <= 1) return;
		const id = setInterval(() => setCurrent((c) => (c + 1) % slides.length), interval);
		return () => clearInterval(id);
	}, [
		paused,
		slides.length,
		interval
	]);
	const prev = () => setCurrent((c) => (c - 1 + slides.length) % slides.length);
	const next = () => setCurrent((c) => (c + 1) % slides.length);
	const slide = slides[current];
	return /* @__PURE__ */ jsxs("section", {
		className: "relative -mt-[117px] pt-[117px] sm:-mt-[126px] sm:pt-[126px] lg:-mt-[94px] lg:pt-[134px] overflow-hidden",
		onMouseEnter: () => setPaused(true),
		onMouseLeave: () => setPaused(false),
		children: [/* @__PURE__ */ jsxs("div", {
			className: "relative w-full",
			children: [
				/* @__PURE__ */ jsx("img", {
					src: slide.image,
					alt: "",
					"aria-hidden": true,
					className: "block w-full h-auto"
				}),
				/* @__PURE__ */ jsx(AnimatePresence, {
					mode: "popLayout",
					initial: false,
					children: /* @__PURE__ */ jsx(motion.div, {
						initial: {
							opacity: 0,
							scale: 1.04
						},
						animate: {
							opacity: 1,
							scale: 1
						},
						exit: { opacity: 0 },
						transition: {
							duration: 1.1,
							ease: "easeOut"
						},
						className: "absolute inset-0",
						children: /* @__PURE__ */ jsx("img", {
							src: slide.image,
							alt: `Banner ${current + 1}`,
							className: "h-full w-full object-cover"
						})
					}, current)
				}),
				/* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gradient-to-r from-brand/60 via-brand/25 to-transparent pointer-events-none" }),
				/* @__PURE__ */ jsx("div", { className: "absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-brand/70 to-transparent pointer-events-none" }),
				/* @__PURE__ */ jsx("div", {
					className: "hidden sm:flex container-x absolute inset-0 items-end z-10 pb-7 lg:pb-9",
					children: /* @__PURE__ */ jsx(AnimatePresence, {
						mode: "wait",
						children: /* @__PURE__ */ jsxs(motion.div, {
							initial: {
								opacity: 0,
								y: 24
							},
							animate: {
								opacity: 1,
								y: 0
							},
							exit: {
								opacity: 0,
								y: -14
							},
							transition: {
								duration: .55,
								ease: "easeOut"
							},
							className: "max-w-2xl text-white",
							children: [slide.subtitle && /* @__PURE__ */ jsx("p", {
								className: "text-sm lg:text-lg text-white max-w-xl leading-relaxed drop-shadow-[0_2px_8px_rgba(0,0,0,0.45)]",
								children: slide.subtitle
							}), /* @__PURE__ */ jsxs("div", {
								className: "mt-4 flex flex-wrap gap-3",
								children: [/* @__PURE__ */ jsx(Link, {
									to: "/products",
									className: "btn-primary bg-white !text-brand hover:!bg-white/90 shadow-lg !py-2.5 !px-6 text-sm",
									children: "View Products"
								}), /* @__PURE__ */ jsx(Link, {
									to: "/contact",
									className: "btn-ghost-light border border-white/40 hover:bg-white/10 !py-2.5 !px-6 text-sm",
									children: "Contact Us"
								})]
							})]
						}, current)
					})
				}),
				slide.subtitle && /* @__PURE__ */ jsx("div", {
					className: "sm:hidden absolute inset-x-0 bottom-0 z-10 flex justify-start p-2.5",
					children: /* @__PURE__ */ jsx(AnimatePresence, {
						mode: "wait",
						children: /* @__PURE__ */ jsxs(motion.div, {
							initial: {
								opacity: 0,
								y: 12
							},
							animate: {
								opacity: 1,
								y: 0
							},
							exit: {
								opacity: 0,
								y: -8
							},
							transition: {
								duration: .4,
								ease: "easeOut"
							},
							className: "flex flex-wrap gap-1.5",
							children: [/* @__PURE__ */ jsx(Link, {
								to: "/products",
								className: "btn-primary bg-white !text-brand hover:!bg-white/90 shadow-lg !py-1 !px-2.5 !text-[10px]",
								children: "View Products"
							}), /* @__PURE__ */ jsx(Link, {
								to: "/contact",
								className: "btn-ghost-light border border-white/40 hover:bg-white/10 !py-1 !px-2.5 !text-[10px]",
								children: "Contact Us"
							})]
						}, current)
					})
				}),
				slides.length > 1 && /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsx("button", {
					onClick: prev,
					"aria-label": "Previous slide",
					className: "hidden sm:grid absolute left-4 lg:left-8 top-1/2 -translate-y-1/2 z-20 h-11 w-11 place-items-center rounded-full border border-white/25 bg-white/10 backdrop-blur text-white transition-colors hover:bg-white hover:text-brand",
					children: /* @__PURE__ */ jsx(FiChevronLeft, { className: "h-5 w-5" })
				}), /* @__PURE__ */ jsx("button", {
					onClick: next,
					"aria-label": "Next slide",
					className: "hidden sm:grid absolute right-4 lg:right-8 top-1/2 -translate-y-1/2 z-20 h-11 w-11 place-items-center rounded-full border border-white/25 bg-white/10 backdrop-blur text-white transition-colors hover:bg-white hover:text-brand",
					children: /* @__PURE__ */ jsx(FiChevronRight, { className: "h-5 w-5" })
				})] })
			]
		}), slides.length > 1 && /* @__PURE__ */ jsx("div", {
			className: "absolute bottom-2 sm:bottom-3 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2",
			children: slides.map((_, i) => /* @__PURE__ */ jsx("button", {
				onClick: () => setCurrent(i),
				"aria-label": `Go to slide ${i + 1}`,
				className: `h-1.5 sm:h-2 rounded-full transition-all duration-300 ${i === current ? "w-6 sm:w-7 bg-white" : "w-1.5 sm:w-2 bg-white/45 hover:bg-white/70"}`
			}, i))
		})]
	});
}
//#endregion
//#region src/routes/index.tsx?tsr-split=component
var HERO_SLIDES = [{ image: "/images/banner1-new.jpeg" }, {
	image: "/images/banner2-new.jpeg",
	subtitle: "Aqua City engineers, installs and maintains premium water filtration systems for homes, businesses and industries delivering safe, great-tasting water for over a decade."
}];
var CATEGORY_META = {
	"Domestic Water Filters": {
		description: "Under-sink, countertop and whole-home purifiers for everyday drinking water.",
		image: "https://i.pinimg.com/736x/8a/db/e9/8adbe9a128083904562a43a0afe0d581.jpg"
	},
	"Commercial RO Systems": {
		description: "Reliable RO units for cafes, restaurants, hotels and offices.",
		image: "https://i.pinimg.com/736x/29/57/8d/29578dd75c4c3acae76ec7fb09cf9a5c.jpg"
	},
	"Industrial Water Treatment": {
		description: "High-capacity RO, DM and UF plants engineered for industrial process water.",
		image: "https://i.pinimg.com/736x/da/bb/c0/dabbc0ff5c0dc475bd81b1ffb1d33b30.jpg"
	},
	"Water Softeners": {
		description: "Ion-exchange softeners that eliminate scale and protect your plumbing.",
		image: "https://i.pinimg.com/736x/e4/06/93/e406931103b209b0282acc1449cef95f.jpg"
	},
	"RO Spare Parts": {
		description: "Genuine membranes, pumps, tanks and accessories for every system.",
		image: "https://images.jdmagicbox.com/quickquotes/images_main/domestic-water-purifier-spare-parts-2213130807-kjs1ekva.png"
	},
	"Filter Cartridges": {
		description: "Sediment, carbon, UF and mineral cartridges with standard fittings.",
		image: "https://i.pinimg.com/736x/13/0a/72/130a729a249230f3f4cc487e8ab0c887.jpg"
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
	const { products, isLoading: productsLoading } = useProducts();
	const { categories, isLoading: categoriesLoading } = useCategories();
	const featured = products.slice(0, 8);
	const transformedCategories = categories.map((category) => {
		const meta = CATEGORY_META[category.name];
		return {
			name: category.name,
			description: meta?.description || "Water filtration solutions",
			image: meta?.image || "/images/placeholder.jpg"
		};
	});
	if (productsLoading || categoriesLoading) return /* @__PURE__ */ jsx("div", {
		className: "min-h-screen flex items-center justify-center",
		children: /* @__PURE__ */ jsxs("div", {
			className: "text-center",
			children: [/* @__PURE__ */ jsx("div", {
				className: "text-2xl mb-4",
				children: "🔄"
			}), /* @__PURE__ */ jsx("p", {
				className: "text-muted-foreground",
				children: "Loading products..."
			})]
		})
	});
	return /* @__PURE__ */ jsxs(Fragment, { children: [
		/* @__PURE__ */ jsx(HeroSlider, { slides: HERO_SLIDES }),
		/* @__PURE__ */ jsx("section", {
			className: "border-b border-border bg-secondary/60",
			children: /* @__PURE__ */ jsx("div", {
				className: "container-x",
				children: /* @__PURE__ */ jsx("div", {
					className: "grid grid-cols-2 sm:grid-cols-4 gap-4 py-5",
					children: [
						{
							Icon: FiShield,
							title: "Certified Quality",
							sub: "NSF / WQA standards"
						},
						{
							Icon: FiTool,
							title: "Free Installation",
							sub: "On every system"
						},
						{
							Icon: FiHeadphones,
							title: "Lifetime Support",
							sub: "Priority servicing"
						},
						{
							Icon: FiZap,
							title: "Genuine Parts",
							sub: "Full warranty cover"
						}
					].map(({ Icon, title, sub }, i) => /* @__PURE__ */ jsxs("div", {
						className: "flex items-center gap-3",
						children: [/* @__PURE__ */ jsx("span", {
							className: "grid h-10 w-10 shrink-0 place-items-center rounded-full bg-brand-soft text-brand",
							children: /* @__PURE__ */ jsx(Icon, { className: "h-5 w-5" })
						}), /* @__PURE__ */ jsxs("div", {
							className: "min-w-0",
							children: [/* @__PURE__ */ jsx("div", {
								className: "text-xs sm:text-sm font-semibold leading-tight truncate",
								children: title
							}), /* @__PURE__ */ jsx("div", {
								className: "text-[10px] sm:text-[11px] text-muted-foreground truncate",
								children: sub
							})]
						})]
					}, i))
				})
			})
		}),
		/* @__PURE__ */ jsx("section", {
			className: "py-16 sm:py-20",
			children: /* @__PURE__ */ jsxs("div", {
				className: "container-x",
				children: [/* @__PURE__ */ jsx(SectionTitle, {
					eyebrow: "Our Range",
					title: "Shop by category",
					subtitle: "From compact countertop purifiers to large-scale industrial plants."
				}), /* @__PURE__ */ jsx("div", {
					className: "mt-8 sm:mt-10 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5 sm:gap-4",
					children: transformedCategories.length > 0 ? transformedCategories.map((cat, i) => /* @__PURE__ */ jsx(CategoryCard, {
						category: cat.name,
						description: cat.description,
						image: cat.image,
						index: i
					}, cat.name)) : Array.from({ length: 6 }).map((_, i) => /* @__PURE__ */ jsxs("div", {
						className: "card-surface p-2.5 animate-pulse",
						children: [
							/* @__PURE__ */ jsx("div", { className: "aspect-[4/3] bg-muted rounded-lg" }),
							/* @__PURE__ */ jsx("div", { className: "h-3.5 bg-muted rounded mt-2.5" }),
							/* @__PURE__ */ jsx("div", { className: "h-2.5 bg-muted rounded mt-1.5" })
						]
					}, i))
				})]
			})
		}),
		/* @__PURE__ */ jsx("section", {
			className: "py-16 sm:py-20 bg-secondary/50",
			children: /* @__PURE__ */ jsxs("div", {
				className: "container-x",
				children: [
					/* @__PURE__ */ jsx(SectionTitle, {
						eyebrow: "Featured",
						title: "Bestselling systems",
						subtitle: "Handpicked units our customers rely on every day."
					}),
					/* @__PURE__ */ jsx("div", {
						className: "mt-8 sm:mt-10 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2.5 sm:gap-4",
						children: featured.length > 0 ? featured.map((product, i) => /* @__PURE__ */ jsx(ProductCard, {
							product,
							index: i
						}, product.id)) : Array.from({ length: 8 }).map((_, i) => /* @__PURE__ */ jsxs("div", {
							className: "card-surface p-2.5 animate-pulse",
							children: [
								/* @__PURE__ */ jsx("div", { className: "aspect-square bg-muted rounded-lg" }),
								/* @__PURE__ */ jsx("div", { className: "h-3.5 bg-muted rounded mt-2.5" }),
								/* @__PURE__ */ jsx("div", { className: "h-2.5 bg-muted rounded mt-1.5 w-2/3" })
							]
						}, i))
					}),
					/* @__PURE__ */ jsx("div", {
						className: "mt-10 sm:mt-12 text-center",
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
			className: "py-16 sm:py-20",
			children: /* @__PURE__ */ jsxs("div", {
				className: "container-x",
				children: [/* @__PURE__ */ jsx(SectionTitle, {
					eyebrow: "Why Aqua City",
					title: "Engineered for clean water. Built for peace of mind.",
					subtitle: "Every system we install is backed by certified quality, transparent pricing and lifetime support."
				}), /* @__PURE__ */ jsx("div", {
					className: "mt-8 sm:mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5 sm:gap-4",
					children: FEATURES.map((f, i) => /* @__PURE__ */ jsx(FeatureCard, {
						...f,
						index: i
					}, f.title))
				})]
			})
		}),
		/* @__PURE__ */ jsx("section", {
			className: "py-16 sm:py-20 bg-secondary/50",
			children: /* @__PURE__ */ jsxs("div", {
				className: "container-x",
				children: [/* @__PURE__ */ jsx(SectionTitle, {
					eyebrow: "Services",
					title: "End-to-end water solutions",
					subtitle: "From first consultation to long-term support — we handle every step."
				}), /* @__PURE__ */ jsx("div", {
					className: "mt-8 sm:mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5 sm:gap-4",
					children: SERVICES.map((s, i) => /* @__PURE__ */ jsx(FeatureCard, {
						...s,
						index: i
					}, s.title))
				})]
			})
		}),
		/* @__PURE__ */ jsx("section", {
			className: "py-16 sm:py-20",
			children: /* @__PURE__ */ jsxs("div", {
				className: "container-x",
				children: [/* @__PURE__ */ jsx(SectionTitle, {
					eyebrow: "Our Process",
					title: "A proven six-step approach",
					subtitle: "A structured method that guarantees consistent, reliable results."
				}), /* @__PURE__ */ jsx("div", {
					className: "mt-8 sm:mt-12 grid gap-3 sm:gap-4 sm:grid-cols-2 lg:grid-cols-3",
					children: PROCESS.map((p, i) => /* @__PURE__ */ jsxs(motion.div, {
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
							margin: "-60px"
						},
						transition: {
							duration: .4,
							delay: i * .05
						},
						className: "card-surface card-lift p-5 sm:p-6 relative overflow-hidden",
						children: [
							/* @__PURE__ */ jsx("span", {
								className: "absolute -top-2 -right-2 text-6xl sm:text-7xl font-bold text-brand-soft select-none",
								children: p.step
							}),
							/* @__PURE__ */ jsx("h3", {
								className: "relative text-base font-semibold",
								children: p.title
							}),
							/* @__PURE__ */ jsx("p", {
								className: "relative mt-1.5 text-xs sm:text-sm text-muted-foreground leading-relaxed",
								children: p.text
							})
						]
					}, p.step))
				})]
			})
		}),
		/* @__PURE__ */ jsx("section", {
			className: "py-16 sm:py-20 bg-secondary/50",
			children: /* @__PURE__ */ jsxs("div", {
				className: "container-x",
				children: [/* @__PURE__ */ jsx(SectionTitle, {
					eyebrow: "Testimonials",
					title: "Trusted by families and businesses",
					subtitle: "Real stories from customers who chose Aqua City for their water."
				}), /* @__PURE__ */ jsx("div", {
					className: "mt-8 sm:mt-12 grid gap-3 sm:gap-4 sm:grid-cols-2 lg:grid-cols-3",
					children: TESTIMONIALS.map((t, i) => /* @__PURE__ */ jsx(TestimonialCard, {
						t,
						index: i
					}, t.name))
				})]
			})
		}),
		/* @__PURE__ */ jsx("section", {
			className: "py-16 sm:py-20",
			children: /* @__PURE__ */ jsxs("div", {
				className: "container-x",
				children: [/* @__PURE__ */ jsx(SectionTitle, {
					eyebrow: "FAQ",
					title: "Answers to common questions",
					subtitle: "Still curious? Get in touch — we love talking water."
				}), /* @__PURE__ */ jsx("div", {
					className: "mt-8 sm:mt-12",
					children: /* @__PURE__ */ jsx(FAQAccordion, { items: FAQS })
				})]
			})
		}),
		/* @__PURE__ */ jsx("section", {
			className: "pb-16 sm:pb-24",
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
					className: "relative overflow-hidden rounded-3xl grad-brand text-white p-8 sm:p-14",
					children: [
						/* @__PURE__ */ jsx("div", { className: "absolute -top-16 -right-16 h-72 w-72 rounded-full bg-white/10 blur-3xl" }),
						/* @__PURE__ */ jsx("div", { className: "absolute -bottom-20 -left-16 h-72 w-72 rounded-full bg-white/10 blur-3xl" }),
						/* @__PURE__ */ jsxs("div", {
							className: "relative max-w-3xl",
							children: [
								/* @__PURE__ */ jsx("h2", {
									className: "text-2xl sm:text-3xl lg:text-4xl font-bold text-balance",
									children: "Ready for cleaner, healthier water at home or work?"
								}),
								/* @__PURE__ */ jsx("p", {
									className: "mt-4 text-white/85 text-base sm:text-lg max-w-2xl",
									children: "Talk to our water experts today. Free consultation, free water testing and a custom recommendation — no pressure, no obligation."
								}),
								/* @__PURE__ */ jsxs("div", {
									className: "mt-7 flex flex-wrap gap-3 sm:gap-4",
									children: [/* @__PURE__ */ jsx(Link, {
										to: "/contact",
										className: "btn-primary bg-white !text-brand hover:!bg-white/90",
										children: "Book a Free Consultation"
									}), /* @__PURE__ */ jsxs("a", {
										href: "tel:03340503503",
										className: "btn-ghost-light",
										children: [/* @__PURE__ */ jsx(FiPhone, {}), " Call 0334 0503503"]
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
