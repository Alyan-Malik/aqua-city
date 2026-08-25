import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import {
  FiCheckCircle,
  FiChevronRight,
  FiDownload,
  FiLoader,
  FiMail,
  FiPhone,
  FiX,
} from "react-icons/fi";
import { ProductCard } from "../components/ProductCard";
import { getProduct, relatedProducts, type Product } from "../data/products";

export const Route = createFileRoute("/products/$id")({
  loader: ({ params }) => {
    const product = getProduct(params.id);
    if (!product) throw notFound();
    return { product };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return {
        meta: [
          { title: "Product not found — Aqua City" },
          { name: "robots", content: "noindex" },
        ],
      };
    }
    const p = loaderData.product;
    return {
      meta: [
        { title: `${p.name} — Aqua City` },
        { name: "description", content: p.shortDescription },
        { property: "og:title", content: `${p.name} — Aqua City` },
        { property: "og:description", content: p.shortDescription },
        { property: "og:type", content: "website" },
        { property: "og:image", content: p.image },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:image", content: p.image },
      ],
    };
  },
  component: ProductDetail,
  notFoundComponent: () => (
    <div className="container-x py-32 text-center">
      <h1 className="text-3xl font-bold">Product not found</h1>
      <p className="mt-3 text-muted-foreground">The item you're looking for isn't in our catalog.</p>
      <Link to="/products" className="btn-primary mt-8">Back to catalog</Link>
    </div>
  ),
});

function ProductDetail() {
  const { product } = Route.useLoaderData() as { product: Product };
  const [active, setActive] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [downloading, setDownloading] = useState(false);
  const [downloaded, setDownloaded] = useState(false);
  const related = relatedProducts(product.id, product.category, 3);

  useEffect(() => {
    if (!lightboxOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setLightboxOpen(false);
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [lightboxOpen]);

  // Direct PDF Download Handler
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
      
      // Clean up
      document.body.removeChild(link);
      window.URL.revokeObjectURL(blobUrl);

      setDownloaded(true);
      setTimeout(() => setDownloaded(false), 3000);
    } catch {
      // Direct anchor link fallback if fetch is blocked
      const link = document.createElement("a");
      link.href = pdfUrl;
      link.download = fileName;
      link.target = "_blank";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      setDownloaded(true);
      setTimeout(() => setDownloaded(false), 3000);
    } finally {
      setDownloading(false);
    }
  };

  return (
    <>
      {/* Breadcrumb */}
      <section className="border-b border-border bg-secondary/40 mt-12">
        <div className="container-x py-4 text-xs sm:text-sm text-muted-foreground flex items-center gap-2 flex-wrap">
          <Link to="/" className="hover:text-brand">Home</Link>
          <FiChevronRight className="h-3.5 w-3.5" />
          <Link to="/products" className="hover:text-brand">Products</Link>
          <FiChevronRight className="h-3.5 w-3.5" />
          <span className="text-foreground font-medium truncate">{product.name}</span>
        </div>
      </section>

      {/* Main */}
      <section className="py-16">
        <div className="container-x grid gap-12 lg:grid-cols-[1.1fr_1fr]">
          {/* Gallery */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <button
              type="button"
              onClick={() => setLightboxOpen(true)}
              aria-label={`Open ${product.name} image in full size`}
              className="card-surface block w-full overflow-hidden aspect-[4/3] bg-muted cursor-zoom-in"
            >
              <img
                src={product.gallery[active]}
                alt={product.name}
                className="h-full w-full object-cover"
              />
            </button>
            <div className="mt-4 grid grid-cols-4 gap-3">
              {product.gallery.map((g, i) => (
                <button
                  key={i}
                  onClick={() => setActive(i)}
                  className={`aspect-square overflow-hidden rounded-xl border-2 transition ${
                    active === i ? "border-brand" : "border-transparent opacity-70 hover:opacity-100"
                  }`}
                >
                  <img src={g} alt="" className="h-full w-full object-cover" />
                </button>
              ))}
            </div>
          </motion.div>

          {lightboxOpen && (
            <div
              role="dialog"
              aria-modal="true"
              aria-label={`${product.name} full-size image`}
              onClick={() => setLightboxOpen(false)}
              className="fixed inset-0 z-50 grid place-items-center bg-black/80 p-4 sm:p-8"
            >
              <button
                type="button"
                onClick={() => setLightboxOpen(false)}
                aria-label="Close full-size image"
                className="absolute right-4 top-4 grid h-11 w-11 place-items-center rounded-full bg-white/90 text-foreground shadow-lg transition hover:bg-white"
              >
                <FiX className="h-5 w-5" />
              </button>
              <img
                src={product.gallery[active]}
                alt={product.name}
                onClick={(event) => event.stopPropagation()}
                className="max-h-[90vh] max-w-full object-contain"
              />
            </div>
          )}

          {/* Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
          >
            <span className="eyebrow">{product.category}</span>
            <h1 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-bold text-balance">
              {product.name}
            </h1>
            <p className="mt-3 text-sm text-muted-foreground">Model No: {product.model}</p>
            <p className="mt-6 text-base leading-relaxed text-foreground/80">
              {product.overview}
            </p>

            <div className="mt-8">
              <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                Key Features
              </h3>
              <ul className="mt-4 grid gap-3 sm:grid-cols-2">
                {product.features.map((f) => (
                  <li key={f} className="flex items-start gap-3 text-sm">
                    <FiCheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-brand" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-10 flex flex-wrap gap-3">
              <Link to="/contact" className="btn-primary">
                <FiMail /> Contact Us
              </Link>
              <Link to="/contact" className="btn-outline">
                Request Information
              </Link>
            </div>

           {/* Direct PDF Download Card */}
<div className="mt-8 card-surface p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center gap-3.5 sm:gap-4 bg-brand-soft border-brand/20 rounded-2xl">
  <div className="flex items-center gap-3 sm:gap-4 w-full sm:w-auto">
    <div className="grid h-10 w-10 sm:h-11 sm:w-11 place-items-center rounded-full bg-white text-brand shrink-0 shadow-sm">
      <FiDownload className="text-base sm:text-lg" />
    </div>
    <div className="flex-1 min-w-0 sm:hidden">
      <div className="text-sm font-semibold leading-snug">Product Brochure & Manual</div>
      <div className="text-xs text-muted-foreground mt-0.5">
        Download datasheet & universal installation guide (PDF)
      </div>
    </div>
  </div>

  <div className="hidden sm:block flex-1 min-w-0">
    <div className="text-sm font-semibold">Product Brochure & Manual</div>
    <div className="text-xs text-muted-foreground">
      Download datasheet & universal installation guide (PDF)
    </div>
  </div>

  <button
    onClick={handleDownloadPDF}
    disabled={downloading}
    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2.5 sm:py-2 rounded-xl text-xs sm:text-sm font-semibold text-brand border border-brand/30 bg-white hover:bg-brand hover:text-white transition-all disabled:opacity-50"
  >
    {downloading ? (
      <>
        <FiLoader className="animate-spin" />
        <span>Downloading...</span>
      </>
    ) : downloaded ? (
      <>
        <FiCheckCircle className="text-green-500" />
        <span>Downloaded</span>
      </>
    ) : (
      <>
        <FiDownload />
        <span>Download PDF</span>
      </>
    )}
  </button>
</div>
          </motion.div>
        </div>
      </section>

      {/* Specs + Applications + Benefits */}
      <section className="pb-20">
        <div className="container-x grid gap-10 lg:grid-cols-3">
          <div className="card-surface p-7 lg:col-span-1">
            <h3 className="text-lg font-semibold">Technical Specifications</h3>
            <dl className="mt-5 divide-y divide-border text-sm">
              {product.specs.map((s) => (
                <div key={s.label} className="flex items-start justify-between gap-4 py-3">
                  <dt className="text-muted-foreground">{s.label}</dt>
                  <dd className="font-medium text-right">{s.value}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="card-surface p-7">
            <h3 className="text-lg font-semibold">Applications</h3>
            <ul className="mt-5 space-y-3 text-sm">
              {product.applications.map((a) => (
                <li key={a} className="flex items-start gap-3">
                  <FiCheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-brand" />
                  <span>{a}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="card-surface p-7">
            <h3 className="text-lg font-semibold">Benefits</h3>
            <ul className="mt-5 space-y-3 text-sm">
              {product.benefits.map((b) => (
                <li key={b} className="flex items-start gap-3">
                  <FiCheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-brand" />
                  <span>{b}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Related */}
      {related.length > 0 && (
        <section className="pb-24 bg-secondary/50 py-20">
          <div className="container-x">
            <h2 className="text-2xl sm:text-3xl font-bold">Related products</h2>
            <p className="mt-2 text-muted-foreground">More from {product.category}</p>
            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((p, i) => (
                <ProductCard key={p.id} product={p} index={i} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="pb-24">
        <div className="container-x">
          <div className="rounded-3xl grad-brand text-white p-10 sm:p-14 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div>
              <h3 className="text-2xl sm:text-3xl font-bold">Need help choosing?</h3>
              <p className="mt-2 text-white/80 max-w-xl">
                Our engineers will recommend the right system for your water and site.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link to="/contact" className="btn-primary bg-white !text-brand hover:!bg-white/90">
                Get Free Consultation
              </Link>
              <a href="tel:+18001234567" className="btn-ghost-light">
                <FiPhone /> Call Now
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}