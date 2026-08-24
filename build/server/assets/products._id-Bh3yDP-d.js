import { i as relatedProducts } from "./products-B9kQzlJc.js";
import { t as Route } from "./products._id-D9beHLN3.js";
import { t as ProductCard } from "./ProductCard-DdCqCB5b.js";
import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
import { FiCheckCircle, FiChevronRight, FiDownload, FiLoader, FiMail, FiPhone, FiX } from "react-icons/fi";
import { motion } from "framer-motion";
//#region src/routes/products.$id.tsx?tsr-split=component
function ProductDetail() {
	const { product } = Route.useLoaderData();
	const [active, setActive] = useState(0);
	const [lightboxOpen, setLightboxOpen] = useState(false);
	const [downloading, setDownloading] = useState(false);
	const [downloaded, setDownloaded] = useState(false);
	const related = relatedProducts(product.id, product.category, 3);
	useEffect(() => {
		if (!lightboxOpen) return;
		const handleKeyDown = (event) => {
			if (event.key === "Escape") setLightboxOpen(false);
		};
		document.addEventListener("keydown", handleKeyDown);
		return () => document.removeEventListener("keydown", handleKeyDown);
	}, [lightboxOpen]);
	const handleDownloadPDF = async () => {
		setDownloading(true);
		const pdfUrl = "/documents/Aqua_City_Installation_Guide.pdf";
		const fileName = `${product.name.replace(/\s+/g, "_")}_Installation_Guide.pdf`;
		try {
			const response = await fetch(pdfUrl);
			if (!response.ok) throw new Error("PDF file not found");
			const blob = await response.blob();
			const blobUrl = window.URL.createObjectURL(blob);
			const link = document.createElement("a");
			link.href = blobUrl;
			link.download = fileName;
			document.body.appendChild(link);
			link.click();
			document.body.removeChild(link);
			window.URL.revokeObjectURL(blobUrl);
			setDownloaded(true);
			setTimeout(() => setDownloaded(false), 3e3);
		} catch {
			const link = document.createElement("a");
			link.href = pdfUrl;
			link.download = fileName;
			link.target = "_blank";
			document.body.appendChild(link);
			link.click();
			document.body.removeChild(link);
			setDownloaded(true);
			setTimeout(() => setDownloaded(false), 3e3);
		} finally {
			setDownloading(false);
		}
	};
	return /* @__PURE__ */ jsxs(Fragment, { children: [
		/* @__PURE__ */ jsx("section", {
			className: "border-b border-border bg-secondary/40 mt-12",
			children: /* @__PURE__ */ jsxs("div", {
				className: "container-x py-4 text-xs sm:text-sm text-muted-foreground flex items-center gap-2 flex-wrap",
				children: [
					/* @__PURE__ */ jsx(Link, {
						to: "/",
						className: "hover:text-brand",
						children: "Home"
					}),
					/* @__PURE__ */ jsx(FiChevronRight, { className: "h-3.5 w-3.5" }),
					/* @__PURE__ */ jsx(Link, {
						to: "/products",
						className: "hover:text-brand",
						children: "Products"
					}),
					/* @__PURE__ */ jsx(FiChevronRight, { className: "h-3.5 w-3.5" }),
					/* @__PURE__ */ jsx("span", {
						className: "text-foreground font-medium truncate",
						children: product.name
					})
				]
			})
		}),
		/* @__PURE__ */ jsx("section", {
			className: "py-16",
			children: /* @__PURE__ */ jsxs("div", {
				className: "container-x grid gap-12 lg:grid-cols-[1.1fr_1fr]",
				children: [
					/* @__PURE__ */ jsxs(motion.div, {
						initial: {
							opacity: 0,
							y: 20
						},
						animate: {
							opacity: 1,
							y: 0
						},
						transition: { duration: .4 },
						children: [/* @__PURE__ */ jsx("button", {
							type: "button",
							onClick: () => setLightboxOpen(true),
							"aria-label": `Open ${product.name} image in full size`,
							className: "card-surface block w-full overflow-hidden aspect-[4/3] bg-muted cursor-zoom-in",
							children: /* @__PURE__ */ jsx("img", {
								src: product.gallery[active],
								alt: product.name,
								className: "h-full w-full object-cover"
							})
						}), /* @__PURE__ */ jsx("div", {
							className: "mt-4 grid grid-cols-4 gap-3",
							children: product.gallery.map((g, i) => /* @__PURE__ */ jsx("button", {
								onClick: () => setActive(i),
								className: `aspect-square overflow-hidden rounded-xl border-2 transition ${active === i ? "border-brand" : "border-transparent opacity-70 hover:opacity-100"}`,
								children: /* @__PURE__ */ jsx("img", {
									src: g,
									alt: "",
									className: "h-full w-full object-cover"
								})
							}, i))
						})]
					}),
					lightboxOpen && /* @__PURE__ */ jsxs("div", {
						role: "dialog",
						"aria-modal": "true",
						"aria-label": `${product.name} full-size image`,
						onClick: () => setLightboxOpen(false),
						className: "fixed inset-0 z-50 grid place-items-center bg-black/80 p-4 sm:p-8",
						children: [/* @__PURE__ */ jsx("button", {
							type: "button",
							onClick: () => setLightboxOpen(false),
							"aria-label": "Close full-size image",
							className: "absolute right-4 top-4 grid h-11 w-11 place-items-center rounded-full bg-white/90 text-foreground shadow-lg transition hover:bg-white",
							children: /* @__PURE__ */ jsx(FiX, { className: "h-5 w-5" })
						}), /* @__PURE__ */ jsx("img", {
							src: product.gallery[active],
							alt: product.name,
							onClick: (event) => event.stopPropagation(),
							className: "max-h-[90vh] max-w-full object-contain"
						})]
					}),
					/* @__PURE__ */ jsxs(motion.div, {
						initial: {
							opacity: 0,
							y: 20
						},
						animate: {
							opacity: 1,
							y: 0
						},
						transition: {
							duration: .4,
							delay: .1
						},
						children: [
							/* @__PURE__ */ jsx("span", {
								className: "eyebrow",
								children: product.category
							}),
							/* @__PURE__ */ jsx("h1", {
								className: "mt-4 text-3xl sm:text-4xl lg:text-5xl font-bold text-balance",
								children: product.name
							}),
							/* @__PURE__ */ jsxs("p", {
								className: "mt-3 text-sm text-muted-foreground",
								children: ["Model No: ", product.model]
							}),
							/* @__PURE__ */ jsx("p", {
								className: "mt-6 text-base leading-relaxed text-foreground/80",
								children: product.overview
							}),
							/* @__PURE__ */ jsxs("div", {
								className: "mt-8",
								children: [/* @__PURE__ */ jsx("h3", {
									className: "text-sm font-semibold uppercase tracking-[0.18em] text-muted-foreground",
									children: "Key Features"
								}), /* @__PURE__ */ jsx("ul", {
									className: "mt-4 grid gap-3 sm:grid-cols-2",
									children: product.features.map((f) => /* @__PURE__ */ jsxs("li", {
										className: "flex items-start gap-3 text-sm",
										children: [/* @__PURE__ */ jsx(FiCheckCircle, { className: "mt-0.5 h-4 w-4 shrink-0 text-brand" }), /* @__PURE__ */ jsx("span", { children: f })]
									}, f))
								})]
							}),
							/* @__PURE__ */ jsxs("div", {
								className: "mt-10 flex flex-wrap gap-3",
								children: [/* @__PURE__ */ jsxs(Link, {
									to: "/contact",
									className: "btn-primary",
									children: [/* @__PURE__ */ jsx(FiMail, {}), " Contact Us"]
								}), /* @__PURE__ */ jsx(Link, {
									to: "/contact",
									className: "btn-outline",
									children: "Request Information"
								})]
							}),
							/* @__PURE__ */ jsxs("div", {
								className: "mt-8 card-surface p-5 flex items-center gap-4 bg-brand-soft border-brand/20 rounded-2xl",
								children: [
									/* @__PURE__ */ jsx("div", {
										className: "grid h-11 w-11 place-items-center rounded-full bg-white text-brand shrink-0 shadow-sm",
										children: /* @__PURE__ */ jsx(FiDownload, { className: "text-lg" })
									}),
									/* @__PURE__ */ jsxs("div", {
										className: "flex-1 min-w-0",
										children: [/* @__PURE__ */ jsx("div", {
											className: "text-sm font-semibold",
											children: "Product Brochure & Manual"
										}), /* @__PURE__ */ jsx("div", {
											className: "text-xs text-muted-foreground",
											children: "Download datasheet & universal installation guide (PDF)"
										})]
									}),
									/* @__PURE__ */ jsx("button", {
										onClick: handleDownloadPDF,
										disabled: downloading,
										className: "inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold text-brand border border-brand/30 bg-white hover:bg-brand hover:text-white transition-all disabled:opacity-50",
										children: downloading ? /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsx(FiLoader, { className: "animate-spin" }), /* @__PURE__ */ jsx("span", { children: "Downloading..." })] }) : downloaded ? /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsx(FiCheckCircle, { className: "text-green-500" }), /* @__PURE__ */ jsx("span", { children: "Downloaded" })] }) : /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsx(FiDownload, {}), /* @__PURE__ */ jsx("span", { children: "Download PDF" })] })
									})
								]
							})
						]
					})
				]
			})
		}),
		/* @__PURE__ */ jsx("section", {
			className: "pb-20",
			children: /* @__PURE__ */ jsxs("div", {
				className: "container-x grid gap-10 lg:grid-cols-3",
				children: [
					/* @__PURE__ */ jsxs("div", {
						className: "card-surface p-7 lg:col-span-1",
						children: [/* @__PURE__ */ jsx("h3", {
							className: "text-lg font-semibold",
							children: "Technical Specifications"
						}), /* @__PURE__ */ jsx("dl", {
							className: "mt-5 divide-y divide-border text-sm",
							children: product.specs.map((s) => /* @__PURE__ */ jsxs("div", {
								className: "flex items-start justify-between gap-4 py-3",
								children: [/* @__PURE__ */ jsx("dt", {
									className: "text-muted-foreground",
									children: s.label
								}), /* @__PURE__ */ jsx("dd", {
									className: "font-medium text-right",
									children: s.value
								})]
							}, s.label))
						})]
					}),
					/* @__PURE__ */ jsxs("div", {
						className: "card-surface p-7",
						children: [/* @__PURE__ */ jsx("h3", {
							className: "text-lg font-semibold",
							children: "Applications"
						}), /* @__PURE__ */ jsx("ul", {
							className: "mt-5 space-y-3 text-sm",
							children: product.applications.map((a) => /* @__PURE__ */ jsxs("li", {
								className: "flex items-start gap-3",
								children: [/* @__PURE__ */ jsx(FiCheckCircle, { className: "mt-0.5 h-4 w-4 shrink-0 text-brand" }), /* @__PURE__ */ jsx("span", { children: a })]
							}, a))
						})]
					}),
					/* @__PURE__ */ jsxs("div", {
						className: "card-surface p-7",
						children: [/* @__PURE__ */ jsx("h3", {
							className: "text-lg font-semibold",
							children: "Benefits"
						}), /* @__PURE__ */ jsx("ul", {
							className: "mt-5 space-y-3 text-sm",
							children: product.benefits.map((b) => /* @__PURE__ */ jsxs("li", {
								className: "flex items-start gap-3",
								children: [/* @__PURE__ */ jsx(FiCheckCircle, { className: "mt-0.5 h-4 w-4 shrink-0 text-brand" }), /* @__PURE__ */ jsx("span", { children: b })]
							}, b))
						})]
					})
				]
			})
		}),
		related.length > 0 && /* @__PURE__ */ jsx("section", {
			className: "pb-24 bg-secondary/50 py-20",
			children: /* @__PURE__ */ jsxs("div", {
				className: "container-x",
				children: [
					/* @__PURE__ */ jsx("h2", {
						className: "text-2xl sm:text-3xl font-bold",
						children: "Related products"
					}),
					/* @__PURE__ */ jsxs("p", {
						className: "mt-2 text-muted-foreground",
						children: ["More from ", product.category]
					}),
					/* @__PURE__ */ jsx("div", {
						className: "mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3",
						children: related.map((p, i) => /* @__PURE__ */ jsx(ProductCard, {
							product: p,
							index: i
						}, p.id))
					})
				]
			})
		}),
		/* @__PURE__ */ jsx("section", {
			className: "pb-24",
			children: /* @__PURE__ */ jsx("div", {
				className: "container-x",
				children: /* @__PURE__ */ jsxs("div", {
					className: "rounded-3xl grad-brand text-white p-10 sm:p-14 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6",
					children: [/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("h3", {
						className: "text-2xl sm:text-3xl font-bold",
						children: "Need help choosing?"
					}), /* @__PURE__ */ jsx("p", {
						className: "mt-2 text-white/80 max-w-xl",
						children: "Our engineers will recommend the right system for your water and site."
					})] }), /* @__PURE__ */ jsxs("div", {
						className: "flex flex-wrap gap-3",
						children: [/* @__PURE__ */ jsx(Link, {
							to: "/contact",
							className: "btn-primary bg-white !text-brand hover:!bg-white/90",
							children: "Get Free Consultation"
						}), /* @__PURE__ */ jsxs("a", {
							href: "tel:+18001234567",
							className: "btn-ghost-light",
							children: [/* @__PURE__ */ jsx(FiPhone, {}), " Call Now"]
						})]
					})]
				})
			})
		})
	] });
}
//#endregion
export { ProductDetail as component };
