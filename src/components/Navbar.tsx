import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { FiMenu, FiX, FiPhone, FiChevronDown } from "react-icons/fi";
import { AnimatePresence, motion } from "framer-motion";

// Categories definition
const categories = [
  { label: "Domestic Water Filters", slug: "Domestic Water Filters" },
  { label: "Commercial RO Systems", slug: "Commercial RO Systems" },
  { label: "Industrial Water Treatment", slug: "Industrial Water Treatment" },
  { label: "Water Softeners", slug: "Water Softeners" },
  { label: "RO Spare Parts", slug: "RO Spare Parts" },
  { label: "Filter Cartridges", slug: "Filter Cartridges" },
] as const;

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileCategoriesOpen, setMobileCategoriesOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50 bg-white/95 backdrop-blur-md shadow-[0_4px_20px_-8px_rgba(9,36,96,0.15)] transition-all duration-300">
      <div className="container-x flex items-center justify-between py-4">
        <Link to="/" className="flex items-center gap-2.5 group">
          <img
            src="/images/logo2.png"
            alt="Aqua City Logo"
            className="h-23 w-auto object-contain transition-transform group-hover:scale-105"
          />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-1">
          <Link
            to="/"
            activeOptions={{ exact: true }}
            activeProps={{ className: "text-brand font-semibold" }}
            inactiveProps={{ className: "text-foreground/70 hover:text-brand" }}
            className="px-4 py-2 text-sm font-medium transition-colors"
          >
            Home
          </Link>

          <Link
            to="/about"
            activeProps={{ className: "text-brand font-semibold" }}
            inactiveProps={{ className: "text-foreground/70 hover:text-brand" }}
            className="px-4 py-2 text-sm font-medium transition-colors"
          >
            About
          </Link>

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
                  className="absolute left-0 top-full pt-2 w-64 z-50"
                >
                  <div className="bg-white rounded-2xl shadow-xl border border-border/60 p-2 grid gap-0.5">
                    {categories.map((cat) => (
                      <Link
                        key={cat.slug}
                        to="/products"
                        search={{ category: cat.slug }}
                        onClick={() => setDropdownOpen(false)}
                        className="rounded-xl px-3.5 py-2.5 text-sm text-foreground/80 hover:text-brand hover:bg-accent/60 transition-colors"
                      >
                        {cat.label}
                      </Link>
                    ))}
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

          <Link
            to="/contact"
            activeProps={{ className: "text-brand font-semibold" }}
            inactiveProps={{ className: "text-foreground/70 hover:text-brand" }}
            className="px-4 py-2 text-sm font-medium transition-colors"
          >
            Contact
          </Link>
        </nav>

        <div className="hidden lg:flex items-center gap-3">
          <a href="tel:+18001234567" className="btn-primary text-sm">
            <FiPhone className="h-4 w-4" />
            Call Now
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
              <Link
                to="/"
                onClick={() => setOpen(false)}
                activeOptions={{ exact: true }}
                activeProps={{ className: "bg-accent text-brand" }}
                inactiveProps={{ className: "text-foreground/80" }}
                className="rounded-xl px-4 py-3 text-sm font-medium"
              >
                Home
              </Link>

              <Link
                to="/about"
                onClick={() => setOpen(false)}
                activeProps={{ className: "bg-accent text-brand" }}
                inactiveProps={{ className: "text-foreground/80" }}
                className="rounded-xl px-4 py-3 text-sm font-medium"
              >
                About
              </Link>

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
                      {categories.map((cat) => (
                        <Link
                          key={cat.slug}
                          to="/products"
                          search={{ category: cat.slug }}
                          onClick={() => setOpen(false)}
                          className="rounded-lg px-3 py-2 text-sm text-foreground/70 hover:text-brand hover:bg-accent/50 transition-colors"
                        >
                          {cat.label}
                        </Link>
                      ))}
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

              <Link
                to="/contact"
                onClick={() => setOpen(false)}
                activeProps={{ className: "bg-accent text-brand" }}
                inactiveProps={{ className: "text-foreground/80" }}
                className="rounded-xl px-4 py-3 text-sm font-medium"
              >
                Contact
              </Link>

              <a href="tel:+18001234567" className="btn-primary mt-2 text-sm">
                <FiPhone className="h-4 w-4" />
                Call Now
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}