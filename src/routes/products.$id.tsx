import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useState } from "react";
import {
  FiCheckCircle,
  FiChevronRight,
  FiDownload,
  FiMail,
  FiPhone,
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
  const related = relatedProducts(product.id, product.category, 3);

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
            <div className="card-surface overflow-hidden aspect-[4/3] bg-muted">
              <img
                src={product.gallery[active]}
                alt={product.name}
                className="h-full w-full object-cover"
              />
            </div>
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

            <div className="mt-8 card-surface p-5 flex items-center gap-4 bg-brand-soft border-brand/20">
              <div className="grid h-11 w-11 place-items-center rounded-full bg-white text-brand shrink-0">
                <FiDownload />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-semibold">Product Brochure</div>
                <div className="text-xs text-muted-foreground">
                  Download the datasheet & installation guide (PDF)
                </div>
              </div>
              <button
                onClick={(e) => e.preventDefault()}
                className="text-sm font-semibold text-brand hover:underline"
              >
                Download
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
