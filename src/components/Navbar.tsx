// src/components/Navbar.tsx
import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { FiMenu, FiX, FiPhone, FiChevronDown, FiMail, FiMapPin, FiClock } from "react-icons/fi";
import { BsWhatsapp } from "react-icons/bs";
import { AnimatePresence, motion } from "framer-motion";
import { useCategories } from "../hooks/useProducts";
import type { Category } from "../types";

const NAV_LINKS = [
  { to: "/", label: "Home", exact: true },
  { to: "/about", label: "About", exact: false },
  { to: "/products", label: "Products", exact: true },
  { to: "/contact", label: "Contact", exact: false },
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileCategoriesOpen, setMobileCategoriesOpen] = useState(false);

  const { categories, isLoading: categoriesLoading } = useCategories();

  const categoryList = categories.map((cat: Category) => ({
    label: cat.name,
    slug: cat.name,
  }));
  const displayCategories = categoriesLoading ? [] : categoryList;

  return (
    <header className="fixed inset-x-0 top-0 z-50 bg-white/95 backdrop-blur-md shadow-[0_4px_24px_-8px_rgba(9,36,96,0.18)] transition-all duration-300">
      {/* ── Top Info Bar ─────────────────────────────── */}
      <div className="bg-brand text-white">
        <div className="container-x flex items-center justify-between gap-4 py-1.5 text-[11px] sm:text-xs">
          <div className="hidden md:flex items-center gap-5 text-white/80">
            <span className="inline-flex items-center gap-1.5">
              <FiMapPin className="h-3 w-3 text-cyan-300" />
              K-25 Main Murree Road, Rawalpindi
            </span>
            <span className="inline-flex items-center gap-1.5">
              <FiClock className="h-3 w-3 text-cyan-300" />
              Mon – Sat: 9:00 AM – 8:00 PM
            </span>
            <span className="inline-flex items-center gap-1.5">
              <FiMail className="h-3 w-3 text-cyan-300" />
              aquacityrwp1@gmail.com
            </span>
          </div>

          <span className="md:hidden inline-flex items-center gap-1.5 text-white/80">
            <FiMapPin className="h-3 w-3 text-cyan-300" />
            Main Murree Road, Rawalpindi
          </span>

          <div className="flex items-center gap-4 text-white/80">
            <span className="hidden sm:inline">Free installation on all systems</span>
            <a
              href="tel:03340503503"
              className="inline-flex items-center gap-1.5 font-semibold text-white hover:text-cyan-300 transition-colors"
            >
              <FiPhone className="h-3 w-3" />
              0334 0503503
            </a>
          </div>
        </div>
      </div>

      {/* ── Main Bar ────────────────────────────────── */}
      <div className="container-x flex items-center justify-between py-3">
        <Link to="/" className="flex items-center gap-2.5 group">
          <img
            src="/images/logo2.png"
            alt="Aqua City Logo"
            className="h-16 sm:h-18 lg:h-30 w-auto object-contain transition-transform group-hover:scale-105"
          />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-1">
          {NAV_LINKS.filter((l) => l.to !== "/products").map((l) => (
            <Link
              key={l.to}
              to={l.to}
              activeOptions={{ exact: l.exact }}
              activeProps={{ className: "text-brand font-semibold" }}
              inactiveProps={{ className: "text-foreground/70 hover:text-brand" }}
              className="px-4 py-2 text-sm font-medium transition-colors"
            >
              {l.label}
            </Link>
          ))}

          {/* Dropdown Menu for Categories */}
          <div
            className="relative"
            onMouseEnter={() => setDropdownOpen(true)}
            onMouseLeave={() => setDropdownOpen(false)}
          >
            <button
              onClick={() => setDropdownOpen((v) => !v)}
              className="flex items-center gap-1.5 px-4 py-2 text-sm font-medium text-foreground/70 hover:text-brand transition-colors cursor-pointer"
            >
              Categories
              <FiChevronDown
                className={`h-4 w-4 transition-transform duration-200 ${
                  dropdownOpen ? "rotate-180 text-brand" : ""
                }`}
              />
            </button>

            <AnimatePresence>
              {dropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 8 }}
                  transition={{ duration: 0.15 }}
                  className="absolute left-0 top-full pt-2 w-72 z-50"
                >
                  <div className="bg-white rounded-2xl shadow-xl border border-border/60 p-2 grid gap-0.5">
                    {categoriesLoading ? (
                      Array.from({ length: 6 }).map((_, i) => (
                        <div key={i} className="h-10 bg-muted rounded-xl animate-pulse"></div>
                      ))
                    ) : displayCategories.length > 0 ? (
                      displayCategories.map((cat: { label: string; slug: string }) => (
                        <Link
                          key={cat.slug}
                          to="/products"
                          search={{ category: cat.slug }}
                          onClick={() => setDropdownOpen(false)}
                          className="rounded-xl px-3.5 py-2.5 text-sm text-foreground/80 hover:text-brand hover:bg-accent/60 transition-colors"
                        >
                          {cat.label}
                        </Link>
                      ))
                    ) : (
                      <div className="px-3.5 py-2.5 text-sm text-muted-foreground">
                        No categories available
                      </div>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <Link
            to="/products"
            activeOptions={{ exact: true }}
            activeProps={{ className: "text-brand font-semibold" }}
            inactiveProps={{ className: "text-foreground/70 hover:text-brand" }}
            className="px-4 py-2 text-sm font-medium transition-colors"
          >
            Products
          </Link>
        </nav>

        {/* Desktop Action Buttons */}
        <div className="hidden lg:flex items-center gap-2.5">
          <a
            href="tel:03340503503"
            className="inline-flex items-center gap-2 rounded-xl border border-border bg-white px-4 py-2.5 text-sm font-semibold text-foreground hover:bg-accent hover:text-brand transition-colors shadow-xs"
          >
            <FiPhone className="h-4 w-4 text-brand" />
            <span>Call Now</span>
          </a>

          <a
            href="https://wa.me/03340503503"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary text-sm"
          >
            <BsWhatsapp className="h-4 w-4" />
            <span>WhatsApp</span>
          </a>
        </div>

        {/* Mobile Hamburger Toggle */}
        <button
          className="lg:hidden grid h-11 w-11 place-items-center rounded-xl border border-border bg-white text-brand transition-colors"
          aria-label="Toggle menu"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <FiX className="h-5 w-5" /> : <FiMenu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="lg:hidden bg-white border-t border-border shadow-lg max-h-[85vh] overflow-y-auto"
          >
            <div className="container-x py-4 flex flex-col gap-1">
              {/* Quick info for mobile */}
              <div className="rounded-xl bg-secondary/70 p-3 mb-1 grid gap-2 text-xs text-muted-foreground">
                <span className="inline-flex items-center gap-2">
                  <FiClock className="h-3.5 w-3.5 text-brand shrink-0" />
                  Mon – Sat: 9:00 AM – 8:00 PM
                </span>
                <a
                  href="mailto:aquacityrwp1@gmail.com"
                  className="inline-flex items-center gap-2 hover:text-brand transition-colors"
                >
                  <FiMail className="h-3.5 w-3.5 text-brand shrink-0" />
                  aquacityrwp1@gmail.com
                </a>
              </div>

              {NAV_LINKS.filter((l) => l.label !== "Products").map((l) => (
                <Link
                  key={l.to}
                  to={l.to}
                  onClick={() => setOpen(false)}
                  activeOptions={{ exact: l.exact }}
                  activeProps={{ className: "bg-accent text-brand" }}
                  inactiveProps={{ className: "text-foreground/80" }}
                  className="rounded-xl px-4 py-3 text-sm font-medium"
                >
                  {l.label}
                </Link>
              ))}

              {/* Mobile Accordion for Categories */}
              <div>
                <button
                  onClick={() => setMobileCategoriesOpen((v) => !v)}
                  className="w-full flex items-center justify-between rounded-xl px-4 py-3 text-sm font-medium text-foreground/80 hover:bg-accent/50 transition-colors"
                >
                  Categories
                  <FiChevronDown
                    className={`h-4 w-4 transition-transform duration-200 ${
                      mobileCategoriesOpen ? "rotate-180 text-brand" : ""
                    }`}
                  />
                </button>

                <AnimatePresence>
                  {mobileCategoriesOpen && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="overflow-hidden pl-4 pr-2 flex flex-col gap-1 border-l-2 border-brand/20 my-1 ml-4"
                    >
                      {categoriesLoading ? (
                        Array.from({ length: 6 }).map((_, i) => (
                          <div key={i} className="h-8 bg-muted rounded-lg animate-pulse"></div>
                        ))
                      ) : displayCategories.length > 0 ? (
                        displayCategories.map((cat: { label: string; slug: string }) => (
                          <Link
                            key={cat.slug}
                            to="/products"
                            search={{ category: cat.slug }}
                            onClick={() => setOpen(false)}
                            className="rounded-lg px-3 py-2 text-sm text-foreground/70 hover:text-brand hover:bg-accent/50 transition-colors"
                          >
                            {cat.label}
                          </Link>
                        ))
                      ) : (
                        <div className="px-3 py-2 text-sm text-muted-foreground">
                          No categories available
                        </div>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <Link
                to="/products"
                onClick={() => setOpen(false)}
                activeOptions={{ exact: true }}
                activeProps={{ className: "bg-accent text-brand" }}
                inactiveProps={{ className: "text-foreground/80" }}
                className="rounded-xl px-4 py-3 text-sm font-medium"
              >
                Products
              </Link>

              {/* Mobile Action Buttons */}
              <div className="grid grid-cols-2 gap-2 pt-2">
                <a
                  href="tel:03340503503"
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-border bg-white px-3 py-3 text-sm font-semibold text-foreground hover:bg-accent transition-colors"
                >
                  <FiPhone className="h-4 w-4 text-brand" />
                  <span>Call Now</span>
                </a>

                <a
                  href="https://wa.me/03340503503"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary text-sm justify-center"
                >
                  <BsWhatsapp className="h-4 w-4" />
                  <span>WhatsApp</span>
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
