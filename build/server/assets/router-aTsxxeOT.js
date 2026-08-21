import { n as PRODUCTS, t as CATEGORIES } from "./products-BGlbXMd-.js";
import { t as Route$5 } from "./products.index-Cjtqz5xi.js";
import { t as Route$6 } from "./products._id-BtR3we73.js";
import { useEffect, useState } from "react";
import { HeadContent, Link, Outlet, Scripts, createFileRoute, createRootRouteWithContext, createRouter, lazyRouteComponent, useRouter } from "@tanstack/react-router";
import { jsx, jsxs } from "react/jsx-runtime";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { FiArrowUp, FiChevronDown, FiMail, FiMapPin, FiMenu, FiPhone, FiX } from "react-icons/fi";
import { BsWhatsapp } from "react-icons/bs";
import { AnimatePresence, motion } from "framer-motion";
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaWhatsapp } from "react-icons/fa";
//#region src/styles.css?url
var styles_default = "./assets/styles-BPnteb8x.css";
//#endregion
//#region src/lib/lovable-error-reporting.ts
function reportLovableError(error, context = {}) {
	if (typeof window === "undefined") return;
	window.__lovableEvents?.captureException?.(error, {
		source: "react_error_boundary",
		route: window.location.pathname,
		...context
	}, {
		mechanism: "react_error_boundary",
		handled: false,
		severity: "error"
	});
	const message = error instanceof Response ? `Response ${error.status}${error.url ? ` at ${error.url}` : ""}` : error instanceof Error ? error.message : String(error);
	window.__lovableReportRuntimeError?.({
		message,
		stack: error instanceof Error ? error.stack : void 0,
		filename: window.location.pathname
	});
}
//#endregion
//#region src/components/Navbar.tsx
var categories = [
	{
		label: "Domestic Water Filters",
		slug: "Domestic Water Filters"
	},
	{
		label: "Commercial RO Systems",
		slug: "Commercial RO Systems"
	},
	{
		label: "Industrial Water Treatment",
		slug: "Industrial Water Treatment"
	},
	{
		label: "Water Softeners",
		slug: "Water Softeners"
	},
	{
		label: "RO Spare Parts",
		slug: "RO Spare Parts"
	},
	{
		label: "Filter Cartridges",
		slug: "Filter Cartridges"
	}
];
function Navbar() {
	const [open, setOpen] = useState(false);
	const [dropdownOpen, setDropdownOpen] = useState(false);
	const [mobileCategoriesOpen, setMobileCategoriesOpen] = useState(false);
	return /* @__PURE__ */ jsxs("header", {
		className: "fixed inset-x-0 top-0 z-50 bg-white/95 backdrop-blur-md shadow-[0_4px_20px_-8px_rgba(9,36,96,0.15)] transition-all duration-300",
		children: [/* @__PURE__ */ jsxs("div", {
			className: "container-x flex items-center justify-between py-4",
			children: [
				/* @__PURE__ */ jsx(Link, {
					to: "/",
					className: "flex items-center gap-2.5 group",
					children: /* @__PURE__ */ jsx("img", {
						src: "/images/logo2.png",
						alt: "Aqua City Logo",
						className: "h-23 w-auto object-contain transition-transform group-hover:scale-105"
					})
				}),
				/* @__PURE__ */ jsxs("nav", {
					className: "hidden lg:flex items-center gap-1",
					children: [
						/* @__PURE__ */ jsx(Link, {
							to: "/",
							activeOptions: { exact: true },
							activeProps: { className: "text-brand font-semibold" },
							inactiveProps: { className: "text-foreground/70 hover:text-brand" },
							className: "px-4 py-2 text-sm font-medium transition-colors",
							children: "Home"
						}),
						/* @__PURE__ */ jsx(Link, {
							to: "/about",
							activeProps: { className: "text-brand font-semibold" },
							inactiveProps: { className: "text-foreground/70 hover:text-brand" },
							className: "px-4 py-2 text-sm font-medium transition-colors",
							children: "About"
						}),
						/* @__PURE__ */ jsxs("div", {
							className: "relative",
							onMouseEnter: () => setDropdownOpen(true),
							onMouseLeave: () => setDropdownOpen(false),
							children: [/* @__PURE__ */ jsxs("button", {
								onClick: () => setDropdownOpen((v) => !v),
								className: "flex items-center gap-1.5 px-4 py-2 text-sm font-medium text-foreground/70 hover:text-brand transition-colors cursor-pointer",
								children: ["Categories", /* @__PURE__ */ jsx(FiChevronDown, { className: `h-4 w-4 transition-transform duration-200 ${dropdownOpen ? "rotate-180 text-brand" : ""}` })]
							}), /* @__PURE__ */ jsx(AnimatePresence, { children: dropdownOpen && /* @__PURE__ */ jsx(motion.div, {
								initial: {
									opacity: 0,
									y: 8
								},
								animate: {
									opacity: 1,
									y: 0
								},
								exit: {
									opacity: 0,
									y: 8
								},
								transition: { duration: .15 },
								className: "absolute left-0 top-full pt-2 w-64 z-50",
								children: /* @__PURE__ */ jsx("div", {
									className: "bg-white rounded-2xl shadow-xl border border-border/60 p-2 grid gap-0.5",
									children: categories.map((cat) => /* @__PURE__ */ jsx(Link, {
										to: "/products",
										search: { category: cat.slug },
										onClick: () => setDropdownOpen(false),
										className: "rounded-xl px-3.5 py-2.5 text-sm text-foreground/80 hover:text-brand hover:bg-accent/60 transition-colors",
										children: cat.label
									}, cat.slug))
								})
							}) })]
						}),
						/* @__PURE__ */ jsx(Link, {
							to: "/products",
							activeOptions: { exact: true },
							activeProps: { className: "text-brand font-semibold" },
							inactiveProps: { className: "text-foreground/70 hover:text-brand" },
							className: "px-4 py-2 text-sm font-medium transition-colors",
							children: "Products"
						}),
						/* @__PURE__ */ jsx(Link, {
							to: "/contact",
							activeProps: { className: "text-brand font-semibold" },
							inactiveProps: { className: "text-foreground/70 hover:text-brand" },
							className: "px-4 py-2 text-sm font-medium transition-colors",
							children: "Contact"
						})
					]
				}),
				/* @__PURE__ */ jsx("div", {
					className: "hidden lg:flex items-center gap-3",
					children: /* @__PURE__ */ jsxs("a", {
						href: "https://wa.me/03340503503",
						target: "_blank",
						rel: "noopener noreferrer",
						className: "btn-primary text-sm",
						children: [/* @__PURE__ */ jsx(BsWhatsapp, { className: "h-4 w-4" }), "WhatsApp"]
					})
				}),
				/* @__PURE__ */ jsx("button", {
					className: "lg:hidden grid h-11 w-11 place-items-center rounded-xl border border-border bg-white text-brand transition-colors",
					"aria-label": "Toggle menu",
					onClick: () => setOpen((v) => !v),
					children: open ? /* @__PURE__ */ jsx(FiX, { className: "h-5 w-5" }) : /* @__PURE__ */ jsx(FiMenu, { className: "h-5 w-5" })
				})
			]
		}), /* @__PURE__ */ jsx(AnimatePresence, { children: open && /* @__PURE__ */ jsx(motion.div, {
			initial: {
				opacity: 0,
				y: -8
			},
			animate: {
				opacity: 1,
				y: 0
			},
			exit: {
				opacity: 0,
				y: -8
			},
			transition: { duration: .2 },
			className: "lg:hidden bg-white border-t border-border shadow-lg max-h-[85vh] overflow-y-auto",
			children: /* @__PURE__ */ jsxs("div", {
				className: "container-x py-4 flex flex-col gap-1",
				children: [
					/* @__PURE__ */ jsx(Link, {
						to: "/",
						onClick: () => setOpen(false),
						activeOptions: { exact: true },
						activeProps: { className: "bg-accent text-brand" },
						inactiveProps: { className: "text-foreground/80" },
						className: "rounded-xl px-4 py-3 text-sm font-medium",
						children: "Home"
					}),
					/* @__PURE__ */ jsx(Link, {
						to: "/about",
						onClick: () => setOpen(false),
						activeProps: { className: "bg-accent text-brand" },
						inactiveProps: { className: "text-foreground/80" },
						className: "rounded-xl px-4 py-3 text-sm font-medium",
						children: "About"
					}),
					/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsxs("button", {
						onClick: () => setMobileCategoriesOpen((v) => !v),
						className: "w-full flex items-center justify-between rounded-xl px-4 py-3 text-sm font-medium text-foreground/80 hover:bg-accent/50 transition-colors",
						children: ["Categories", /* @__PURE__ */ jsx(FiChevronDown, { className: `h-4 w-4 transition-transform duration-200 ${mobileCategoriesOpen ? "rotate-180 text-brand" : ""}` })]
					}), /* @__PURE__ */ jsx(AnimatePresence, { children: mobileCategoriesOpen && /* @__PURE__ */ jsx(motion.div, {
						initial: {
							opacity: 0,
							height: 0
						},
						animate: {
							opacity: 1,
							height: "auto"
						},
						exit: {
							opacity: 0,
							height: 0
						},
						className: "overflow-hidden pl-4 pr-2 flex flex-col gap-1 border-l-2 border-brand/20 my-1 ml-4",
						children: categories.map((cat) => /* @__PURE__ */ jsx(Link, {
							to: "/products",
							search: { category: cat.slug },
							onClick: () => setOpen(false),
							className: "rounded-lg px-3 py-2 text-sm text-foreground/70 hover:text-brand hover:bg-accent/50 transition-colors",
							children: cat.label
						}, cat.slug))
					}) })] }),
					/* @__PURE__ */ jsx(Link, {
						to: "/products",
						onClick: () => setOpen(false),
						activeOptions: { exact: true },
						activeProps: { className: "bg-accent text-brand" },
						inactiveProps: { className: "text-foreground/80" },
						className: "rounded-xl px-4 py-3 text-sm font-medium",
						children: "Products"
					}),
					/* @__PURE__ */ jsx(Link, {
						to: "/contact",
						onClick: () => setOpen(false),
						activeProps: { className: "bg-accent text-brand" },
						inactiveProps: { className: "text-foreground/80" },
						className: "rounded-xl px-4 py-3 text-sm font-medium",
						children: "Contact"
					}),
					/* @__PURE__ */ jsxs("a", {
						href: "tel:+18001234567",
						className: "btn-primary mt-2 text-sm",
						children: [/* @__PURE__ */ jsx(FiPhone, { className: "h-4 w-4" }), "Call Now"]
					})
				]
			})
		}) })]
	});
}
//#endregion
//#region src/components/Footer.tsx
function Footer() {
	return /* @__PURE__ */ jsxs("footer", {
		className: "mt-24 bg-brand text-white",
		children: [/* @__PURE__ */ jsxs("div", {
			className: "container-x py-16 grid gap-12 md:grid-cols-2 lg:grid-cols-4",
			children: [
				/* @__PURE__ */ jsxs("div", { children: [
					/* @__PURE__ */ jsx("div", {
						className: "flex items-center",
						children: /* @__PURE__ */ jsx("img", {
							src: "/images/logo2.png",
							alt: "Aqua City Logo",
							className: "h-30 w-auto object-contain brightness-0 invert"
						})
					}),
					/* @__PURE__ */ jsx("p", {
						className: "mt-5 text-sm text-white/70 leading-relaxed",
						children: "Premium water filtration systems for homes, businesses and industries. Trusted for clean, safe and healthy water since 2008."
					}),
					/* @__PURE__ */ jsx("div", {
						className: "mt-5 flex items-center gap-3",
						children: [
							{
								icon: FaFacebookF,
								href: "#",
								label: "Facebook"
							},
							{
								icon: FaInstagram,
								href: "#",
								label: "Instagram"
							},
							{
								icon: FaLinkedinIn,
								href: "#",
								label: "LinkedIn"
							},
							{
								icon: FaWhatsapp,
								href: "https://wa.me/923005254953",
								label: "WhatsApp"
							}
						].map(({ icon: Icon, href, label }, i) => /* @__PURE__ */ jsx("a", {
							href,
							target: href.startsWith("http") ? "_blank" : void 0,
							rel: href.startsWith("http") ? "noopener noreferrer" : void 0,
							"aria-label": label,
							className: "grid h-9 w-9 place-items-center rounded-full bg-white/10 hover:bg-white hover:text-brand transition-colors",
							children: /* @__PURE__ */ jsx(Icon, { className: "h-4 w-4" })
						}, i))
					})
				] }),
				/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("h4", {
					className: "text-sm font-semibold uppercase tracking-[0.18em] text-white/80",
					children: "Quick Links"
				}), /* @__PURE__ */ jsx("ul", {
					className: "mt-5 space-y-3 text-sm text-white/70",
					children: [
						{
							to: "/",
							label: "Home"
						},
						{
							to: "/about",
							label: "About"
						},
						{
							to: "/products",
							label: "Products"
						},
						{
							to: "/contact",
							label: "Contact"
						}
					].map((l) => /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(Link, {
						to: l.to,
						className: "hover:text-white transition-colors",
						children: l.label
					}) }, l.to))
				})] }),
				/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("h4", {
					className: "text-sm font-semibold uppercase tracking-[0.18em] text-white/80",
					children: "Categories"
				}), /* @__PURE__ */ jsx("ul", {
					className: "mt-5 space-y-3 text-sm text-white/70",
					children: CATEGORIES.map((c) => /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(Link, {
						to: "/products",
						search: { category: c },
						className: "hover:text-white transition-colors",
						children: c
					}) }, c))
				})] }),
				/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("h4", {
					className: "text-sm font-semibold uppercase tracking-[0.18em] text-white/80",
					children: "Contact"
				}), /* @__PURE__ */ jsxs("ul", {
					className: "mt-5 space-y-4 text-sm text-white/70",
					children: [
						/* @__PURE__ */ jsxs("li", {
							className: "flex items-start gap-3",
							children: [/* @__PURE__ */ jsx(FiMapPin, { className: "mt-0.5 h-4 w-4 shrink-0" }), /* @__PURE__ */ jsx("span", { children: "AQUACITY WATER FILTERS K-25 MAIN MURREE ROAD RAWALPINDI" })]
						}),
						/* @__PURE__ */ jsxs("li", {
							className: "flex items-start gap-3",
							children: [/* @__PURE__ */ jsx(FiPhone, { className: "mt-0.5 h-4 w-4 shrink-0" }), /* @__PURE__ */ jsx("span", { children: "03005254953" })]
						}),
						/* @__PURE__ */ jsxs("li", {
							className: "flex items-start gap-3",
							children: [/* @__PURE__ */ jsx(FiMail, { className: "mt-0.5 h-4 w-4 shrink-0" }), /* @__PURE__ */ jsx("span", { children: "aquacity@gmail.com" })]
						})
					]
				})] })
			]
		}), /* @__PURE__ */ jsx("div", {
			className: "border-t border-white/10",
			children: /* @__PURE__ */ jsxs("div", {
				className: "container-x py-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-white/60",
				children: [/* @__PURE__ */ jsxs("p", { children: [
					"© ",
					(/* @__PURE__ */ new Date()).getFullYear(),
					" Aqua City Water Filters. All rights reserved."
				] }), /* @__PURE__ */ jsx("p", { children: "Designed for pure, healthier living." })]
			})
		})]
	});
}
//#endregion
//#region src/components/BackToTop.tsx
function BackToTop() {
	const [show, setShow] = useState(false);
	useEffect(() => {
		const onScroll = () => setShow(window.scrollY > 400);
		window.addEventListener("scroll", onScroll, { passive: true });
		return () => window.removeEventListener("scroll", onScroll);
	}, []);
	return /* @__PURE__ */ jsx(AnimatePresence, { children: show && /* @__PURE__ */ jsx(motion.button, {
		initial: {
			opacity: 0,
			scale: .8,
			y: 10
		},
		animate: {
			opacity: 1,
			scale: 1,
			y: 0
		},
		exit: {
			opacity: 0,
			scale: .8,
			y: 10
		},
		onClick: () => window.scrollTo({
			top: 0,
			behavior: "smooth"
		}),
		className: "fixed bottom-6 right-6 z-40 grid h-12 w-12 place-items-center rounded-full grad-brand text-white shadow-brand hover:scale-105 transition-transform",
		"aria-label": "Back to top",
		children: /* @__PURE__ */ jsx(FiArrowUp, { className: "h-5 w-5" })
	}) });
}
//#endregion
//#region src/routes/__root.tsx
function NotFoundComponent() {
	return /* @__PURE__ */ jsx("div", {
		className: "flex min-h-screen items-center justify-center bg-background px-4",
		children: /* @__PURE__ */ jsxs("div", {
			className: "max-w-md text-center",
			children: [
				/* @__PURE__ */ jsx("h1", {
					className: "text-7xl font-bold text-brand",
					children: "404"
				}),
				/* @__PURE__ */ jsx("h2", {
					className: "mt-4 text-xl font-semibold",
					children: "Page not found"
				}),
				/* @__PURE__ */ jsx("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: "The page you're looking for doesn't exist or has been moved."
				}),
				/* @__PURE__ */ jsx("div", {
					className: "mt-6",
					children: /* @__PURE__ */ jsx(Link, {
						to: "/",
						className: "btn-primary",
						children: "Go home"
					})
				})
			]
		})
	});
}
function ErrorComponent({ error, reset }) {
	console.error(error);
	const router = useRouter();
	useEffect(() => {
		reportLovableError(error, { boundary: "tanstack_root_error_component" });
	}, [error]);
	return /* @__PURE__ */ jsx("div", {
		className: "flex min-h-screen items-center justify-center bg-background px-4",
		children: /* @__PURE__ */ jsxs("div", {
			className: "max-w-md text-center",
			children: [
				/* @__PURE__ */ jsx("h1", {
					className: "text-xl font-semibold tracking-tight",
					children: "This page didn't load"
				}),
				/* @__PURE__ */ jsx("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: "Something went wrong on our end. Try refreshing or head back home."
				}),
				/* @__PURE__ */ jsxs("div", {
					className: "mt-6 flex flex-wrap justify-center gap-2",
					children: [/* @__PURE__ */ jsx("button", {
						onClick: () => {
							router.invalidate();
							reset();
						},
						className: "btn-primary",
						children: "Try again"
					}), /* @__PURE__ */ jsx("a", {
						href: "/",
						className: "btn-outline",
						children: "Go home"
					})]
				})
			]
		})
	});
}
var Route$4 = createRootRouteWithContext()({
	head: () => ({
		meta: [
			{ charSet: "utf-8" },
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1"
			},
			{
				name: "theme-color",
				content: "#092460"
			},
			{
				name: "author",
				content: "Aqua City Water Filters"
			}
		],
		links: [
			{
				rel: "stylesheet",
				href: styles_default
			},
			{
				rel: "icon",
				href: "/favicon.ico",
				type: "image/x-icon"
			},
			{
				rel: "preconnect",
				href: "https://fonts.googleapis.com"
			},
			{
				rel: "preconnect",
				href: "https://fonts.gstatic.com",
				crossOrigin: ""
			},
			{
				rel: "stylesheet",
				href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Plus+Jakarta+Sans:wght@500;600;700;800&display=swap"
			}
		]
	}),
	shellComponent: RootShell,
	component: RootComponent,
	notFoundComponent: NotFoundComponent,
	errorComponent: ErrorComponent
});
function RootShell({ children }) {
	return /* @__PURE__ */ jsxs("html", {
		lang: "en",
		children: [/* @__PURE__ */ jsx("head", { children: /* @__PURE__ */ jsx(HeadContent, {}) }), /* @__PURE__ */ jsxs("body", { children: [children, /* @__PURE__ */ jsx(Scripts, {})] })]
	});
}
function RootComponent() {
	const { queryClient } = Route$4.useRouteContext();
	return /* @__PURE__ */ jsx(QueryClientProvider, {
		client: queryClient,
		children: /* @__PURE__ */ jsxs("div", {
			className: "flex min-h-screen flex-col bg-background",
			children: [
				/* @__PURE__ */ jsx(Navbar, {}),
				/* @__PURE__ */ jsx("main", {
					className: "flex-1 pt-20",
					children: /* @__PURE__ */ jsx(Outlet, {})
				}),
				/* @__PURE__ */ jsx(Footer, {}),
				/* @__PURE__ */ jsx(BackToTop, {})
			]
		})
	});
}
//#endregion
//#region src/routes/index.tsx
var $$splitComponentImporter$2 = () => import("./routes-DEN5JvXF.js");
var Route$3 = createFileRoute("/")({
	head: () => ({ meta: [
		{ title: "Aqua City Water Filters — Pure Water. Healthier Living." },
		{
			name: "description",
			content: "Premium water filtration systems, RO plants, softeners and cartridges for homes, businesses and industries. Certified installation & lifetime support."
		},
		{
			property: "og:title",
			content: "Aqua City Water Filters — Pure Water. Healthier Living."
		},
		{
			property: "og:description",
			content: "Premium water filtration systems for homes, businesses and industries."
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
	component: lazyRouteComponent($$splitComponentImporter$2, "component")
});
//#endregion
//#region src/routes/about.tsx
var $$splitComponentImporter$1 = () => import("./about-DGAKHACJ.js");
var Route$2 = createFileRoute("/about")({
	head: () => ({ meta: [
		{ title: "About Aqua City — Our Story, Mission & Team" },
		{
			name: "description",
			content: "Learn about Aqua City Water Filters — 15+ years engineering premium filtration systems for homes, businesses and industries."
		},
		{
			property: "og:title",
			content: "About Aqua City Water Filters"
		},
		{
			property: "og:description",
			content: "Our mission, values and the team behind every install."
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
	component: lazyRouteComponent($$splitComponentImporter$1, "component")
});
//#endregion
//#region src/routes/contact.tsx
var $$splitComponentImporter = () => import("./contact-BeIe7-BJ.js");
var Route$1 = createFileRoute("/contact")({
	head: () => ({ meta: [
		{ title: "Contact Aquacity Water Filters — Free Consultation & Water Testing" },
		{
			name: "description",
			content: "Get in touch with the Aquacity Water Filters team in Rawalpindi. Free consultation, on-site water testing, and expert recommendations."
		},
		{
			property: "og:title",
			content: "Contact Aquacity Water Filters"
		},
		{
			property: "og:description",
			content: "Book a free consultation with our water experts."
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
//#region src/routes/sitemap[.]xml.ts
var BASE_URL = "";
var Route = createFileRoute("/sitemap.xml")({ server: { handlers: { GET: async () => {
	const xml = [
		`<?xml version="1.0" encoding="UTF-8"?>`,
		`<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`,
		...[
			{
				path: "/",
				changefreq: "weekly",
				priority: "1.0"
			},
			{
				path: "/about",
				changefreq: "monthly",
				priority: "0.7"
			},
			{
				path: "/products",
				changefreq: "weekly",
				priority: "0.9"
			},
			{
				path: "/contact",
				changefreq: "monthly",
				priority: "0.7"
			},
			...PRODUCTS.map((p) => ({
				path: `/products/${p.id}`,
				changefreq: "monthly",
				priority: "0.6"
			}))
		].map((e) => [
			`  <url>`,
			`    <loc>${BASE_URL}${e.path}</loc>`,
			e.changefreq ? `    <changefreq>${e.changefreq}</changefreq>` : null,
			e.priority ? `    <priority>${e.priority}</priority>` : null,
			`  </url>`
		].filter(Boolean).join("\n")),
		`</urlset>`
	].join("\n");
	return new Response(xml, { headers: {
		"Content-Type": "application/xml",
		"Cache-Control": "public, max-age=3600"
	} });
} } } });
//#endregion
//#region src/routeTree.gen.ts
var IndexRoute = Route$3.update({
	id: "/",
	path: "/",
	getParentRoute: () => Route$4
});
var AboutRoute = Route$2.update({
	id: "/about",
	path: "/about",
	getParentRoute: () => Route$4
});
var ContactRoute = Route$1.update({
	id: "/contact",
	path: "/contact",
	getParentRoute: () => Route$4
});
var SitemapDotxmlRoute = Route.update({
	id: "/sitemap.xml",
	path: "/sitemap.xml",
	getParentRoute: () => Route$4
});
var ProductsIndexRoute = Route$5.update({
	id: "/products/",
	path: "/products/",
	getParentRoute: () => Route$4
});
var rootRouteChildren = {
	IndexRoute,
	AboutRoute,
	ContactRoute,
	SitemapDotxmlRoute,
	ProductsIdRoute: Route$6.update({
		id: "/products/$id",
		path: "/products/$id",
		getParentRoute: () => Route$4
	}),
	ProductsIndexRoute
};
var routeTree = Route$4._addFileChildren(rootRouteChildren)._addFileTypes();
//#endregion
//#region src/router.tsx
var getRouter = () => {
	return createRouter({
		routeTree,
		context: { queryClient: new QueryClient() },
		scrollRestoration: true,
		defaultPreloadStaleTime: 0
	});
};
//#endregion
export { getRouter };
