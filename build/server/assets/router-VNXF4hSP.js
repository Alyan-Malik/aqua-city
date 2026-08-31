import { t as useCategories } from "./useProducts-CxPBCS1w.js";
import { n as PRODUCTS, t as Route$11 } from "./products._id-CGy9JrM1.js";
import { t as Route$12 } from "./products.index-DoziiU-H.js";
import { useEffect, useState } from "react";
import { HeadContent, Link, Outlet, Scripts, createFileRoute, createRootRouteWithContext, createRouter, lazyRouteComponent, redirect, useRouter } from "@tanstack/react-router";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { FiArrowUp, FiChevronDown, FiMail, FiMapPin, FiMenu, FiPhone, FiX } from "react-icons/fi";
import { BsWhatsapp } from "react-icons/bs";
import { AnimatePresence, motion } from "framer-motion";
import { Toaster } from "sonner";
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaWhatsapp } from "react-icons/fa";
//#region src/styles.css?url
var styles_default = "./assets/styles-BAlvaZ_F.css";
//#endregion
//#region src/components/Navbar.tsx
function Navbar() {
	const [open, setOpen] = useState(false);
	const [dropdownOpen, setDropdownOpen] = useState(false);
	const [mobileCategoriesOpen, setMobileCategoriesOpen] = useState(false);
	const { categories, isLoading: categoriesLoading } = useCategories();
	const categoryList = categories.map((cat) => ({
		label: cat.name,
		slug: cat.name
	}));
	const displayCategories = categoriesLoading ? [] : categoryList;
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
									children: categoriesLoading ? Array.from({ length: 6 }).map((_, i) => /* @__PURE__ */ jsx("div", { className: "h-10 bg-muted rounded-xl animate-pulse" }, i)) : displayCategories.length > 0 ? displayCategories.map((cat) => /* @__PURE__ */ jsx(Link, {
										to: "/products",
										search: { category: cat.slug },
										onClick: () => setDropdownOpen(false),
										className: "rounded-xl px-3.5 py-2.5 text-sm text-foreground/80 hover:text-brand hover:bg-accent/60 transition-colors",
										children: cat.label
									}, cat.slug)) : /* @__PURE__ */ jsx("div", {
										className: "px-3.5 py-2.5 text-sm text-muted-foreground",
										children: "No categories available"
									})
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
				/* @__PURE__ */ jsxs("div", {
					className: "hidden lg:flex items-center gap-2.5",
					children: [/* @__PURE__ */ jsxs("a", {
						href: "tel:03340503503",
						className: "inline-flex items-center gap-2 rounded-xl border border-border bg-white px-4 py-2.5 text-sm font-semibold text-foreground hover:bg-accent hover:text-brand transition-colors shadow-xs",
						children: [/* @__PURE__ */ jsx(FiPhone, { className: "h-4 w-4 text-brand" }), /* @__PURE__ */ jsx("span", { children: "Call Now" })]
					}), /* @__PURE__ */ jsxs("a", {
						href: "https://wa.me/03340503503",
						target: "_blank",
						rel: "noopener noreferrer",
						className: "btn-primary text-sm",
						children: [/* @__PURE__ */ jsx(BsWhatsapp, { className: "h-4 w-4" }), /* @__PURE__ */ jsx("span", { children: "WhatsApp" })]
					})]
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
						children: categoriesLoading ? Array.from({ length: 6 }).map((_, i) => /* @__PURE__ */ jsx("div", { className: "h-8 bg-muted rounded-lg animate-pulse" }, i)) : displayCategories.length > 0 ? displayCategories.map((cat) => /* @__PURE__ */ jsx(Link, {
							to: "/products",
							search: { category: cat.slug },
							onClick: () => setOpen(false),
							className: "rounded-lg px-3 py-2 text-sm text-foreground/70 hover:text-brand hover:bg-accent/50 transition-colors",
							children: cat.label
						}, cat.slug)) : /* @__PURE__ */ jsx("div", {
							className: "px-3 py-2 text-sm text-muted-foreground",
							children: "No categories available"
						})
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
					/* @__PURE__ */ jsxs("div", {
						className: "grid grid-cols-2 gap-2 pt-2",
						children: [/* @__PURE__ */ jsxs("a", {
							href: "tel:03340503503",
							className: "inline-flex items-center justify-center gap-2 rounded-xl border border-border bg-white px-3 py-3 text-sm font-semibold text-foreground hover:bg-accent transition-colors",
							children: [/* @__PURE__ */ jsx(FiPhone, { className: "h-4 w-4 text-brand" }), /* @__PURE__ */ jsx("span", { children: "Call Now" })]
						}), /* @__PURE__ */ jsxs("a", {
							href: "https://wa.me/03340503503",
							target: "_blank",
							rel: "noopener noreferrer",
							className: "btn-primary text-sm justify-center",
							children: [/* @__PURE__ */ jsx(BsWhatsapp, { className: "h-4 w-4" }), /* @__PURE__ */ jsx("span", { children: "WhatsApp" })]
						})]
					})
				]
			})
		}) })]
	});
}
//#endregion
//#region src/components/Footer.tsx
function Footer() {
	const { categories, isLoading: categoriesLoading } = useCategories();
	const categoryList = categories.map((cat) => ({ name: cat.name }));
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
					children: categoriesLoading ? Array.from({ length: 6 }).map((_, i) => /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx("div", { className: "h-4 bg-white/10 rounded animate-pulse" }) }, i)) : categoryList.length > 0 ? categoryList.map((cat) => /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(Link, {
						to: "/products",
						search: { category: cat.name },
						className: "hover:text-white transition-colors",
						children: cat.name
					}) }, cat.name)) : /* @__PURE__ */ jsx("li", {
						className: "text-white/50",
						children: "No categories available"
					})
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
							children: [/* @__PURE__ */ jsx(FiPhone, { className: "mt-0.5 h-4 w-4 shrink-0" }), /* @__PURE__ */ jsx("span", { children: "03340503503" })]
						}),
						/* @__PURE__ */ jsxs("li", {
							className: "flex items-start gap-3",
							children: [/* @__PURE__ */ jsx(FiMail, { className: "mt-0.5 h-4 w-4 shrink-0" }), /* @__PURE__ */ jsx("span", { children: "aquacityrwp1@gmail.com" })]
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
	useEffect(() => {}, [error]);
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
var Route$10 = createRootRouteWithContext()({
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
	beforeLoad: async () => {
		if (typeof window !== "undefined") {
			const isAdminRoute = window.location.pathname.startsWith("/admin");
			const isLoginRoute = window.location.pathname === "/login";
			const token = localStorage.getItem("admin_token");
			if (isAdminRoute && !token) throw redirect({ to: "/login" });
			if (token && isLoginRoute) throw redirect({ to: "/admin/dashboard" });
		}
	},
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
	const { queryClient } = Route$10.useRouteContext();
	return /* @__PURE__ */ jsx(QueryClientProvider, {
		client: queryClient,
		children: typeof window !== "undefined" && (window.location.pathname.startsWith("/admin") || window.location.pathname === "/login") ? /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsx(Outlet, {}), /* @__PURE__ */ jsx(Toaster, {
			position: "top-right",
			richColors: true
		})] }) : /* @__PURE__ */ jsxs("div", {
			className: "flex min-h-screen flex-col bg-background",
			children: [
				/* @__PURE__ */ jsx(Navbar, {}),
				/* @__PURE__ */ jsx("main", {
					className: "flex-1 pt-20",
					children: /* @__PURE__ */ jsx(Outlet, {})
				}),
				/* @__PURE__ */ jsx(Footer, {}),
				/* @__PURE__ */ jsx(BackToTop, {}),
				/* @__PURE__ */ jsx(Toaster, {
					position: "top-right",
					richColors: true
				})
			]
		})
	});
}
//#endregion
//#region src/routes/index.tsx
var $$splitComponentImporter$8 = () => import("./routes-BaGpNbJY.js");
var Route$9 = createFileRoute("/")({
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
	component: lazyRouteComponent($$splitComponentImporter$8, "component")
});
//#endregion
//#region src/routes/about.tsx
var $$splitComponentImporter$7 = () => import("./about-qyxB6ofL.js");
var Route$8 = createFileRoute("/about")({
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
	component: lazyRouteComponent($$splitComponentImporter$7, "component")
});
//#endregion
//#region src/routes/admin.tsx
var $$splitComponentImporter$6 = () => import("./admin-tX8dLCxz.js");
var Route$7 = createFileRoute("/admin")({
	beforeLoad: () => {
		if (typeof window !== "undefined") {
			if (!localStorage.getItem("admin_token")) throw redirect({ to: "/login" });
		}
	},
	component: lazyRouteComponent($$splitComponentImporter$6, "component")
});
//#endregion
//#region src/routes/contact.tsx
var $$splitComponentImporter$5 = () => import("./contact-DFyofhLv.js");
var Route$6 = createFileRoute("/contact")({
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
	component: lazyRouteComponent($$splitComponentImporter$5, "component")
});
//#endregion
//#region src/routes/login.tsx
var $$splitComponentImporter$4 = () => import("./login-BekM2glJ.js");
var Route$5 = createFileRoute("/login")({ component: lazyRouteComponent($$splitComponentImporter$4, "component") });
//#endregion
//#region src/routes/sitemap[.]xml.ts
var BASE_URL = "";
var Route$4 = createFileRoute("/sitemap.xml")({ server: { handlers: { GET: async () => {
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
//#region src/routes/admin.categories.tsx
var $$splitComponentImporter$3 = () => import("./admin.categories-CpRHBtP7.js");
var Route$3 = createFileRoute("/admin/categories")({ component: lazyRouteComponent($$splitComponentImporter$3, "component") });
//#endregion
//#region src/routes/admin.dashboard.tsx
var $$splitComponentImporter$2 = () => import("./admin.dashboard-Bstb0Wqb.js");
var Route$2 = createFileRoute("/admin/dashboard")({ component: lazyRouteComponent($$splitComponentImporter$2, "component") });
//#endregion
//#region src/routes/admin.products.tsx
var $$splitComponentImporter$1 = () => import("./admin.products-C_LHiY9t.js");
var Route$1 = createFileRoute("/admin/products")({ component: lazyRouteComponent($$splitComponentImporter$1, "component") });
//#endregion
//#region src/routes/admin.profile.tsx
var $$splitComponentImporter = () => import("./admin.profile-FczQ_Qbe.js");
var Route = createFileRoute("/admin/profile")({ component: lazyRouteComponent($$splitComponentImporter, "component") });
//#endregion
//#region src/routeTree.gen.ts
var IndexRoute = Route$9.update({
	id: "/",
	path: "/",
	getParentRoute: () => Route$10
});
var AboutRoute = Route$8.update({
	id: "/about",
	path: "/about",
	getParentRoute: () => Route$10
});
var AdminRoute = Route$7.update({
	id: "/admin",
	path: "/admin",
	getParentRoute: () => Route$10
});
var ContactRoute = Route$6.update({
	id: "/contact",
	path: "/contact",
	getParentRoute: () => Route$10
});
var LoginRoute = Route$5.update({
	id: "/login",
	path: "/login",
	getParentRoute: () => Route$10
});
var SitemapDotxmlRoute = Route$4.update({
	id: "/sitemap.xml",
	path: "/sitemap.xml",
	getParentRoute: () => Route$10
});
var AdminCategoriesRoute = Route$3.update({
	id: "/categories",
	path: "/categories",
	getParentRoute: () => AdminRoute
});
var AdminDashboardRoute = Route$2.update({
	id: "/dashboard",
	path: "/dashboard",
	getParentRoute: () => AdminRoute
});
var AdminProductsRoute = Route$1.update({
	id: "/products",
	path: "/products",
	getParentRoute: () => AdminRoute
});
var AdminProfileRoute = Route.update({
	id: "/profile",
	path: "/profile",
	getParentRoute: () => AdminRoute
});
var ProductsIndexRoute = Route$12.update({
	id: "/products/",
	path: "/products/",
	getParentRoute: () => Route$10
});
var ProductsIdRoute = Route$11.update({
	id: "/products/$id",
	path: "/products/$id",
	getParentRoute: () => Route$10
});
var AdminRouteChildren = {
	AdminCategoriesRoute,
	AdminDashboardRoute,
	AdminProductsRoute,
	AdminProfileRoute
};
var rootRouteChildren = {
	IndexRoute,
	AboutRoute,
	AdminRoute: AdminRoute._addFileChildren(AdminRouteChildren),
	ContactRoute,
	LoginRoute,
	SitemapDotxmlRoute,
	ProductsIdRoute,
	ProductsIndexRoute
};
var routeTree = Route$10._addFileChildren(rootRouteChildren)._addFileTypes();
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
