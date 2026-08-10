import { Link } from "@tanstack/react-router";
import { FiDroplet, FiMail, FiMapPin, FiPhone } from "react-icons/fi";
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaWhatsapp } from "react-icons/fa";
import { CATEGORIES } from "../data/products";

export function Footer() {
  return (
    <footer className="mt-24 bg-brand text-white">
      <div className="container-x py-16 grid gap-12 md:grid-cols-2 lg:grid-cols-4">
        <div>
         <div className="flex items-center">
  <img
    src="/images/logo2.png"
    alt="Aqua City Logo"
    className="h-30 w-auto object-contain brightness-0 invert" 
    /* Tip: Remove 'brightness-0 invert' if your logo image is already visible on dark backgrounds */
  />
</div>
          <p className="mt-5 text-sm text-white/70 leading-relaxed">
            Premium water filtration systems for homes, businesses and industries. Trusted for
            clean, safe and healthy water since 2008.
          </p>
         <div className="mt-5 flex items-center gap-3">
  {[
    { icon: FaFacebookF, href: "#", label: "Facebook" },
    { icon: FaInstagram, href: "#", label: "Instagram" },
    { icon: FaLinkedinIn, href: "#", label: "LinkedIn" },
    { icon: FaWhatsapp, href: "https://wa.me/923005254953", label: "WhatsApp" },
  ].map(({ icon: Icon, href, label }, i) => (
    <a
      key={i}
      href={href}
      target={href.startsWith("http") ? "_blank" : undefined}
      rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
      aria-label={label}
      className="grid h-9 w-9 place-items-center rounded-full bg-white/10 hover:bg-white hover:text-brand transition-colors"
    >
      <Icon className="h-4 w-4" />
    </a>
  ))}
</div>
        </div>

        <div>
          <h4 className="text-sm font-semibold uppercase tracking-[0.18em] text-white/80">
            Quick Links
          </h4>
          <ul className="mt-5 space-y-3 text-sm text-white/70">
            {[
              { to: "/", label: "Home" },
              { to: "/about", label: "About" },
              { to: "/products", label: "Products" },
              { to: "/contact", label: "Contact" },
            ].map((l) => (
              <li key={l.to}>
                <Link to={l.to} className="hover:text-white transition-colors">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-semibold uppercase tracking-[0.18em] text-white/80">
            Categories
          </h4>
          <ul className="mt-5 space-y-3 text-sm text-white/70">
            {CATEGORIES.map((c) => (
              <li key={c}>
                <Link
                  to="/products"
                  search={{ category: c } as never}
                  className="hover:text-white transition-colors"
                >
                  {c}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-semibold uppercase tracking-[0.18em] text-white/80">
            Contact
          </h4>
          <ul className="mt-5 space-y-4 text-sm text-white/70">
            <li className="flex items-start gap-3">
              <FiMapPin className="mt-0.5 h-4 w-4 shrink-0" />
              <span>AQUACITY WATER FILTERS
K-25 MAIN MURREE ROAD RAWALPINDI</span>
            </li>
            <li className="flex items-start gap-3">
              <FiPhone className="mt-0.5 h-4 w-4 shrink-0" />
              <span>03005254953</span>
            </li>
            <li className="flex items-start gap-3">
              <FiMail className="mt-0.5 h-4 w-4 shrink-0" />
              <span>aquacity@gmail.com</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-x py-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-white/60">
          <p>© {new Date().getFullYear()} Aqua City Water Filters. All rights reserved.</p>
          <p>Designed for pure, healthier living.</p>
        </div>
      </div>
    </footer>
  );
}
