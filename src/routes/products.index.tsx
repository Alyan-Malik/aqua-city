import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useMemo, useState } from "react";
import { FiFilter, FiSearch, FiX } from "react-icons/fi";
import { z } from "zod";
import { ProductCard } from "../components/ProductCard";
import { CATEGORIES, PRODUCTS, type Category } from "../data/products";

const searchSchema = z.object({
  category: z.string().optional(),
});

export const Route = createFileRoute("/products/")({
  validateSearch: searchSchema,
  head: () => ({
    meta: [
      { title: "Products — Aqua City Water Filters" },
      {
        name: "description",
        content:
          "Explore the full Aqua City catalog: domestic filters, commercial RO systems, industrial plants, softeners, spare parts and cartridges.",
      },
      { property: "og:title", content: "Products — Aqua City Water Filters" },
      { property: "og:description", content: "Explore our complete water filtration catalog." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ProductsPage,
});

type SortKey = "featured" | "az" | "za";

function ProductsPage() {
  const search = Route.useSearch();
  const initial = (search.category as Category | undefined) ?? "All";

  const [activeCat, setActiveCat] = useState<Category | "All">(initial);
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState<SortKey>("featured");
  const [mobileOpen, setMobileOpen] = useState(false);

  const filtered = useMemo(() => {
    let list = [...PRODUCTS];
    if (activeCat !== "All") list = list.filter((p) => p.category === activeCat);
    const q = query.trim().toLowerCase();
    if (q) {
      list = list.filter((p) =>
        [p.name, p.model, ...p.keywords].some((f) => f.toLowerCase().includes(q)),
      );
    }
    if (sort === "az") list.sort((a, b) => a.name.localeCompare(b.name));
    if (sort === "za") list.sort((a, b) => b.name.localeCompare(a.name));
    return list;
  }, [activeCat, query, sort]);

  const counts = useMemo(() => {
    const c: Record<string, number> = { All: PRODUCTS.length };
    for (const cat of CATEGORIES) c[cat] = PRODUCTS.filter((p) => p.category === cat).length;
    return c;
  }, []);

  const FilterPanel = (
    <div className="space-y-8">
      <div>
        <h3 className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
          Categories
        </h3>
        <ul className="mt-4 space-y-1.5">
          {(["All", ...CATEGORIES] as const).map((c) => {
            const active = activeCat === c;
            return (
              <li key={c}>
                <button
                  onClick={() => {
                    setActiveCat(c);
                    setMobileOpen(false);
                  }}
                  className={`w-full flex items-center justify-between rounded-xl px-4 py-2.5 text-sm text-left transition-colors ${
                    active
                      ? "bg-brand text-white font-semibold"
                      : "hover:bg-secondary text-foreground/80"
                  }`}
                >
                  <span>{c}</span>
                  <span
                    className={`text-xs px-2 py-0.5 rounded-full ${
                      active ? "bg-white/20" : "bg-secondary text-muted-foreground"
                    }`}
                  >
                    {counts[c]}
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );

  return (
    <>
      {/* Hero */}
      <section className="grad-brand text-white -mt-10 pt-20">
        <div className="container-x py-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl"
          >
            <span className="inline-flex rounded-full bg-white/15 backdrop-blur px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em]">
              Product Catalog
            </span>
            <h1 className="mt-5 text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.05] text-balance">
              Every system we build, in one place.
            </h1>
            <p className="mt-5 text-white/85 text-lg max-w-2xl">
              Browse residential filters, commercial RO systems, industrial plants, softeners,
              spares and cartridges.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Toolbar */}
      <section className="border-b border-border bg-white sticky top-20 z-30">
        <div className="container-x py-4 flex flex-wrap items-center gap-3">
          <div className="relative flex-1 min-w-[220px]">
            <FiSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              type="search"
              placeholder="Search by name, model or keyword..."
              className="w-full rounded-full border border-border bg-white pl-10 pr-4 py-2.5 text-sm outline-none focus:border-brand focus:ring-4 focus:ring-brand/10"
            />
          </div>
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value as SortKey)}
            className="rounded-full border border-border bg-white px-4 py-2.5 text-sm outline-none focus:border-brand"
          >
            <option value="featured">Featured</option>
            <option value="az">Name: A–Z</option>
            <option value="za">Name: Z–A</option>
          </select>
          <button
            className="lg:hidden inline-flex items-center gap-2 rounded-full border border-border bg-white px-4 py-2.5 text-sm font-medium"
            onClick={() => setMobileOpen(true)}
          >
            <FiFilter /> Filters
          </button>
        </div>
      </section>

      {/* Grid */}
      <section className="py-16">
        <div className="container-x grid gap-10 lg:grid-cols-[260px_1fr]">
          <aside className="hidden lg:block">
            <div className="sticky top-40">{FilterPanel}</div>
          </aside>

          <div>
            <div className="mb-6 flex items-baseline justify-between">
              <p className="text-sm text-muted-foreground">
                Showing <strong className="text-foreground">{filtered.length}</strong> of{" "}
                {PRODUCTS.length} products
                {activeCat !== "All" && <> in <strong className="text-foreground">{activeCat}</strong></>}
              </p>
              {(activeCat !== "All" || query) && (
                <button
                  onClick={() => { setActiveCat("All"); setQuery(""); }}
                  className="text-xs font-semibold text-brand hover:underline"
                >
                  Reset filters
                </button>
              )}
            </div>

            {filtered.length === 0 ? (
              <div className="card-surface p-16 text-center">
                <p className="text-lg font-semibold">No products match your search.</p>
                <p className="mt-2 text-sm text-muted-foreground">Try a different keyword or clear the filters.</p>
              </div>
            ) : (
              <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
                {filtered.map((p, i) => (
                  <ProductCard key={p.id} product={p} index={i} />
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Mobile filter drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-black/40" onClick={() => setMobileOpen(false)} />
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            transition={{ type: "spring", stiffness: 260, damping: 30 }}
            className="absolute right-0 top-0 h-full w-[85%] max-w-sm bg-white p-6 overflow-y-auto"
          >
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">Filters</h3>
              <button
                onClick={() => setMobileOpen(false)}
                className="grid h-9 w-9 place-items-center rounded-full border border-border"
              >
                <FiX />
              </button>
            </div>
            <div className="mt-6">{FilterPanel}</div>
          </motion.div>
        </div>
      )}
    </>
  );
}
