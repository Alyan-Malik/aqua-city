import { n as useProducts, t as useCategories } from "./useProducts-CxPBCS1w.js";
import { t as Route } from "./products.index-DoziiU-H.js";
import { t as ProductCard } from "./ProductCard-ITx3ej0B.js";
import { useMemo, useState } from "react";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
import { FiFilter, FiSearch, FiX } from "react-icons/fi";
import { motion } from "framer-motion";
//#region src/routes/products.index.tsx?tsr-split=component
function ProductsPage() {
	const search = Route.useSearch();
	const { products, isLoading: productsLoading } = useProducts();
	const { categories, isLoading: categoriesLoading } = useCategories();
	const [activeCat, setActiveCat] = useState("All");
	const [query, setQuery] = useState("");
	const [sort, setSort] = useState("featured");
	const [mobileOpen, setMobileOpen] = useState(false);
	const categoryList = useMemo(() => {
		return ["All", ...categories.map((cat) => cat.name)];
	}, [categories]);
	const filtered = useMemo(() => {
		let list = [...products];
		if (activeCat !== "All") list = list.filter((p) => p.category?.name === activeCat);
		const q = query.trim().toLowerCase();
		if (q) list = list.filter((p) => {
			return [
				p.name,
				p.model_no || "",
				p.description || "",
				...Array.isArray(p.key_features) ? p.key_features : []
			].some((field) => field.toLowerCase().includes(q));
		});
		if (sort === "az") list.sort((a, b) => a.name.localeCompare(b.name));
		if (sort === "za") list.sort((a, b) => b.name.localeCompare(a.name));
		return list;
	}, [
		products,
		activeCat,
		query,
		sort
	]);
	const counts = useMemo(() => {
		const c = { All: products.length };
		categories.forEach((cat) => {
			c[cat.name] = products.filter((p) => p.category?.name === cat.name).length;
		});
		return c;
	}, [products, categories]);
	useMemo(() => {
		if (search.category) {
			if (categories.find((cat) => cat.name === search.category)) setActiveCat(search.category);
		}
	}, [search.category, categories]);
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
	const FilterPanel = /* @__PURE__ */ jsx("div", {
		className: "space-y-8",
		children: /* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("h3", {
			className: "text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground",
			children: "Categories"
		}), /* @__PURE__ */ jsx("ul", {
			className: "mt-4 space-y-1.5",
			children: categoryList.map((cat) => {
				const active = activeCat === cat;
				return /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsxs("button", {
					onClick: () => {
						setActiveCat(cat);
						setMobileOpen(false);
					},
					className: `w-full flex items-center justify-between rounded-xl px-4 py-2.5 text-sm text-left transition-colors ${active ? "bg-brand text-white font-semibold" : "hover:bg-secondary text-foreground/80"}`,
					children: [/* @__PURE__ */ jsx("span", { children: cat }), /* @__PURE__ */ jsx("span", {
						className: `text-xs px-2 py-0.5 rounded-full ${active ? "bg-white/20" : "bg-secondary text-muted-foreground"}`,
						children: counts[cat] || 0
					})]
				}) }, cat);
			})
		})] })
	});
	return /* @__PURE__ */ jsxs(Fragment, { children: [
		/* @__PURE__ */ jsx("section", {
			className: "grad-brand text-white -mt-10 pt-20",
			children: /* @__PURE__ */ jsx("div", {
				className: "container-x py-20",
				children: /* @__PURE__ */ jsxs(motion.div, {
					initial: {
						opacity: 0,
						y: 20
					},
					animate: {
						opacity: 1,
						y: 0
					},
					transition: { duration: .5 },
					className: "max-w-3xl",
					children: [
						/* @__PURE__ */ jsx("span", {
							className: "inline-flex rounded-full bg-white/15 backdrop-blur px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em]",
							children: "Product Catalog"
						}),
						/* @__PURE__ */ jsx("h1", {
							className: "mt-5 text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.05] text-balance",
							children: "Every system we build, in one place."
						}),
						/* @__PURE__ */ jsx("p", {
							className: "mt-5 text-white/85 text-lg max-w-2xl",
							children: "Browse residential filters, commercial RO systems, industrial plants, softeners, spares and cartridges."
						})
					]
				})
			})
		}),
		/* @__PURE__ */ jsx("section", {
			className: "border-b border-border bg-white sticky top-20 z-30",
			children: /* @__PURE__ */ jsxs("div", {
				className: "container-x py-4 flex flex-wrap items-center gap-3",
				children: [
					/* @__PURE__ */ jsxs("div", {
						className: "relative flex-1 min-w-[220px]",
						children: [/* @__PURE__ */ jsx(FiSearch, { className: "absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" }), /* @__PURE__ */ jsx("input", {
							value: query,
							onChange: (e) => setQuery(e.target.value),
							type: "search",
							placeholder: "Search by name, model or keyword...",
							className: "w-full rounded-full border border-border bg-white pl-10 pr-4 py-2.5 text-sm outline-none focus:border-brand focus:ring-4 focus:ring-brand/10"
						})]
					}),
					/* @__PURE__ */ jsxs("select", {
						value: sort,
						onChange: (e) => setSort(e.target.value),
						className: "rounded-full border border-border bg-white px-4 py-2.5 text-sm outline-none focus:border-brand",
						children: [
							/* @__PURE__ */ jsx("option", {
								value: "featured",
								children: "Featured"
							}),
							/* @__PURE__ */ jsx("option", {
								value: "az",
								children: "Name: A–Z"
							}),
							/* @__PURE__ */ jsx("option", {
								value: "za",
								children: "Name: Z–A"
							})
						]
					}),
					/* @__PURE__ */ jsxs("button", {
						className: "lg:hidden inline-flex items-center gap-2 rounded-full border border-border bg-white px-4 py-2.5 text-sm font-medium",
						onClick: () => setMobileOpen(true),
						children: [/* @__PURE__ */ jsx(FiFilter, {}), " Filters"]
					})
				]
			})
		}),
		/* @__PURE__ */ jsx("section", {
			className: "py-16",
			children: /* @__PURE__ */ jsxs("div", {
				className: "container-x grid gap-10 lg:grid-cols-[260px_1fr]",
				children: [/* @__PURE__ */ jsx("aside", {
					className: "hidden lg:block",
					children: /* @__PURE__ */ jsx("div", {
						className: "sticky top-40",
						children: FilterPanel
					})
				}), /* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsxs("div", {
					className: "mb-6 flex items-baseline justify-between",
					children: [/* @__PURE__ */ jsxs("p", {
						className: "text-sm text-muted-foreground",
						children: [
							"Showing ",
							/* @__PURE__ */ jsx("strong", {
								className: "text-foreground",
								children: filtered.length
							}),
							" of",
							" ",
							products.length,
							" products",
							activeCat !== "All" && /* @__PURE__ */ jsxs(Fragment, { children: [" in ", /* @__PURE__ */ jsx("strong", {
								className: "text-foreground",
								children: activeCat
							})] })
						]
					}), (activeCat !== "All" || query) && /* @__PURE__ */ jsx("button", {
						onClick: () => {
							setActiveCat("All");
							setQuery("");
						},
						className: "text-xs font-semibold text-brand hover:underline",
						children: "Reset filters"
					})]
				}), filtered.length === 0 ? /* @__PURE__ */ jsxs("div", {
					className: "card-surface p-16 text-center",
					children: [/* @__PURE__ */ jsx("p", {
						className: "text-lg font-semibold",
						children: "No products match your search."
					}), /* @__PURE__ */ jsx("p", {
						className: "mt-2 text-sm text-muted-foreground",
						children: "Try a different keyword or clear the filters."
					})]
				}) : /* @__PURE__ */ jsx("div", {
					className: "grid grid-cols-2 gap-3 sm:gap-4 xl:grid-cols-3",
					children: filtered.map((p, i) => /* @__PURE__ */ jsx(ProductCard, {
						product: p,
						index: i
					}, p.id))
				})] })]
			})
		}),
		mobileOpen && /* @__PURE__ */ jsxs("div", {
			className: "fixed inset-0 z-50 lg:hidden",
			children: [/* @__PURE__ */ jsx("div", {
				className: "absolute inset-0 bg-black/40",
				onClick: () => setMobileOpen(false)
			}), /* @__PURE__ */ jsxs(motion.div, {
				initial: { x: "100%" },
				animate: { x: 0 },
				transition: {
					type: "spring",
					stiffness: 260,
					damping: 30
				},
				className: "absolute right-0 top-0 h-full w-[85%] max-w-sm bg-white p-6 overflow-y-auto",
				children: [/* @__PURE__ */ jsxs("div", {
					className: "flex items-center justify-between",
					children: [/* @__PURE__ */ jsx("h3", {
						className: "text-lg font-semibold",
						children: "Filters"
					}), /* @__PURE__ */ jsx("button", {
						onClick: () => setMobileOpen(false),
						className: "grid h-9 w-9 place-items-center rounded-full border border-border",
						children: /* @__PURE__ */ jsx(FiX, {})
					})]
				}), /* @__PURE__ */ jsx("div", {
					className: "mt-6",
					children: FilterPanel
				})]
			})]
		})
	] });
}
//#endregion
export { ProductsPage as component };
