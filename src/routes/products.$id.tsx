// src/routes/products.$id.tsx
import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
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
  FiShoppingCart,
} from "react-icons/fi";
import { BsWhatsapp } from "react-icons/bs";
import { ProductCard } from "../components/ProductCard";
import { productApi } from "../api/products";
import { useProducts } from "../hooks/useProducts";
import { ProductImage, Product } from "../types";

// Import static data for fallback
import {
  getProduct as getStaticProduct,
  relatedProducts as getStaticRelated,
  type Product as StaticProduct,
} from "../data/products";

export const Route = createFileRoute("/products/$id")({
  loader: async ({ params, context }) => {
    const { queryClient } = context;
    try {
      const response = await queryClient.ensureQueryData({
        queryKey: ["product", params.id],
        queryFn: () => productApi.getById(Number(params.id)),
      });

      if (!response?.data?.data) {
        // If not found in API, try static data as fallback
        const staticProduct = getStaticProduct(params.id);
        if (staticProduct) {
          return { product: staticProduct, isStatic: true };
        }
        throw notFound();
      }

      return { product: response.data.data, isStatic: false };
    } catch (error) {
      // Try static data as fallback
      const staticProduct = getStaticProduct(params.id);
      if (staticProduct) {
        return { product: staticProduct, isStatic: true };
      }
      throw notFound();
    }
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return {
        meta: [{ title: "Product not found — Aqua City" }, { name: "robots", content: "noindex" }],
      };
    }
    const p = loaderData.product;
    const productName = p.name || "Product";
    const productDesc = p.shortDescription || p.description || "Water filtration product";
    const productImage = p.image || p.images?.[0]?.image || "/images/placeholder.jpg";

    return {
      meta: [
        { title: `${productName} — Aqua City` },
        { name: "description", content: productDesc },
        { property: "og:title", content: `${productName} — Aqua City` },
        { property: "og:description", content: productDesc },
        { property: "og:type", content: "website" },
        { property: "og:image", content: productImage },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:image", content: productImage },
      ],
    };
  },
  component: ProductDetail,
  notFoundComponent: () => (
    <div className="container-x py-32 text-center">
      <h1 className="text-3xl font-bold">Product not found</h1>
      <p className="mt-3 text-muted-foreground">
        The item you're looking for isn't in our catalog.
      </p>
      <Link to="/products" className="btn-primary mt-8">
        Back to catalog
      </Link>
    </div>
  ),
});

function ProductDetail() {
  const { product, isStatic } = Route.useLoaderData() as {
    product: StaticProduct & Product;
    isStatic: boolean;
  };

  const [active, setActive] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [downloading, setDownloading] = useState(false);
  const [downloaded, setDownloaded] = useState(false);

  // Get related products from API or static
  const { products: apiProducts } = useProducts();
  const staticRelated = isStatic ? getStaticRelated(product.id, product.category, 3) : [];

  // Get related products from API
  const related = isStatic
    ? staticRelated
    : apiProducts
        .filter((p: Product) => p.id !== product.id && p.category?.name === product.category?.name)
        .slice(0, 3);

  // Build gallery images
  const galleryImages = product.images
    ? product.images.map((img: ProductImage) => `https://api.aquacityonline.shop/storage/${img.image}`)
    : product.gallery || [product.image || "/images/placeholder.jpg"];

  // Get key features
  const features = Array.isArray(product.key_features)
    ? product.key_features
    : product.key_features
      ? JSON.parse(product.key_features as string)
      : product.features || [];

  // Get specs - use API data if available, otherwise static
  const specs = product.specs || [
    { label: "Certifications", value: "NSF / WQA / ISO 9001" },
    { label: "Warranty", value: "2 Years Limited" },
    { label: "Operating Pressure", value: "40 – 80 PSI" },
    { label: "Operating Temperature", value: "4°C – 40°C" },
  ];

  // Get applications - use API data if available, otherwise static
  const applications = product.applications || [
    "Residential kitchens & drinking water lines",
    "Restaurants, cafes and hospitality",
    "Offices and small commercial spaces",
    "Schools, clinics and community facilities",
  ];

  // Get benefits - use API data if available, otherwise static
  const benefits = product.benefits || [
    "Removes chlorine, heavy metals and sediments",
    "Improves taste, clarity and odor",
    "Reduces plastic bottle waste",
    "Low maintenance with long cartridge life",
  ];

  // Build WhatsApp order link with product info
  const buildWhatsAppOrderLink = () => {
    const phoneNumber = "923005254953"; // WhatsApp number without +
    const productName = product.name;
    const modelNo = product.model || product.model_no || "N/A";
    const price = product.price ? `Rs ${Number(product.price).toFixed(2)}` : "Price on request";
    const category = product.category?.name || product.category || "Product";
    
    const message = encodeURIComponent(
      `Hello Aqua City! 👋\n\n` +
      `I would like to order the following product:\n\n` +
      `📦 *Product:* ${productName}\n` +
      `🔖 *Model:* ${modelNo}\n` +
      `📂 *Category:* ${category}\n` +
      `💰 *Price:* ${price}\n\n` +
      `Please provide me with more details and ordering information.\n\n` +
      `Thank you!`
    );

    return `https://wa.me/${phoneNumber}?text=${message}`;
  };

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

      document.body.removeChild(link);
      window.URL.revokeObjectURL(blobUrl);

      setDownloaded(true);
      setTimeout(() => setDownloaded(false), 3000);
    } catch {
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
          <Link to="/" className="hover:text-brand">
            Home
          </Link>
          <FiChevronRight className="h-3.5 w-3.5" />
          <Link to="/products" className="hover:text-brand">
            Products
          </Link>
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
              className="card-surface block w-full overflow-hidden bg-white cursor-zoom-in"
            >
              {/* Natural-ratio image: full photo visible, no bars, no crop */}
              <img
                src={galleryImages[active] || "/images/placeholder.jpg"}
                alt={product.name}
                className="w-full h-auto max-h-[70vh] object-contain"
              />
            </button>
            <div className="mt-4 grid grid-cols-4 sm:grid-cols-5 gap-2 sm:gap-3">
              {galleryImages.map((g: string, i: number) => (
                <button
                  key={i}
                  onClick={() => setActive(i)}
                  className={`aspect-square overflow-hidden rounded-xl border-2 bg-white transition ${
                    active === i ? "border-brand" : "border-border opacity-70 hover:opacity-100"
                  }`}
                >
                  <img src={g} alt="" className="h-full w-full object-contain" />
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
                src={galleryImages[active] || "/images/placeholder.jpg"}
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
            <span className="eyebrow">
              {product.category?.name || product.category || "Uncategorized"}
            </span>
            <h1 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-bold text-balance">
              {product.name}
            </h1>
            <p className="mt-3 text-sm text-muted-foreground">
              Model No: {product.model || product.model_no || "N/A"}
            </p>
            <p className="mt-6 text-base leading-relaxed text-foreground/80">
              {product.overview || product.description || "No description available."}
            </p>

            {features.length > 0 && (
              <div className="mt-8">
                <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                  Key Features
                </h3>
                <ul className="mt-4 grid gap-3 sm:grid-cols-2">
                  {features.map((f: string) => (
                    <li key={f} className="flex items-start gap-3 text-sm">
                      <FiCheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-brand" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Order Now & Contact Buttons */}
            <div className="mt-10 flex flex-wrap gap-3">
              <a
                href={buildWhatsAppOrderLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary bg-[#25D366] hover:bg-[#1ebe5b] !text-white"
              >
                <BsWhatsapp className="h-4 w-4" /> Order Now
              </a>
              <Link to="/contact" className="btn-outline">
                <FiMail /> Contact Us
              </Link>
            </div>

            {/* Direct PDF Download Card */}
            <div className="mt-8 card-surface p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center gap-3.5 sm:gap-4 bg-brand-soft border-brand/20 rounded-2xl">
              <div className="flex items-center gap-3 sm:gap-4 w-full sm:w-auto">
                <div className="grid h-10 w-10 sm:h-11 sm:w-11 place-items-center rounded-full bg-white text-brand shrink-0 shadow-sm">
                  <FiDownload className="text-base sm:text-lg" />
                </div>
                <div className="flex-1 min-w-0 sm:hidden">
                  <div className="text-sm font-semibold leading-snug">
                    Product Brochure & Manual
                  </div>
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
              {specs.map((s: { label: string; value: string }) => (
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
              {applications.map((a: string) => (
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
              {benefits.map((b: string) => (
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
      {related && related.length > 0 && (
        <section className="pb-24 bg-secondary/50 py-20">
          <div className="container-x">
            <h2 className="text-2xl sm:text-3xl font-bold">Related products</h2>
            <p className="mt-2 text-muted-foreground">
              More from {product.category?.name || product.category || "this category"}
            </p>
            <div className="mt-8 grid grid-cols-2 gap-2.5 sm:gap-4 lg:grid-cols-4">
              {related.map((p: Product, i: number) => (
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