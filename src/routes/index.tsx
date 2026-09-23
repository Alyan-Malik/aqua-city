// src/routes/index.tsx
import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import type { IconType } from "react-icons";
import {
  FiAward,
  FiCheckCircle,
  FiDroplet,
  FiHeadphones,
  FiPhone,
  FiSettings,
  FiShield,
  FiTool,
  FiTrendingUp,
  FiZap,
} from "react-icons/fi";
import { SectionTitle } from "../components/SectionTitle";
import { FeatureCard } from "../components/FeatureCard";
import { CategoryCard, type CategoryCardProps } from "../components/CategoryCard";
import { ProductCard } from "../components/ProductCard";
import { TestimonialCard, type Testimonial } from "../components/TestimonialCard";
import { FAQAccordion } from "../components/FAQAccordion";
import { HeroSlider } from "../components/HeroSlider";
import { useProducts, useCategories } from "../hooks/useProducts";
import type { Category, Product } from "../types";

const HERO_SLIDES = [
  {
    image: "/images/banner1-new.jpeg",
  },
  {
    image: "/images/banner2-new.jpeg",
    subtitle:
      "Aqua City engineers, installs and maintains premium water filtration systems for homes, businesses and industries delivering safe, great-tasting water for over a decade.",
  },
];

// Static category metadata (descriptions and images) - keep this
const CATEGORY_META: Record<string, { description: string; image: string }> = {
  "Domestic Water Filters": {
    description: "Under-sink, countertop and whole-home purifiers for everyday drinking water.",
    image: "https://i.pinimg.com/736x/8a/db/e9/8adbe9a128083904562a43a0afe0d581.jpg",
  },
  "Commercial RO Systems": {
    description: "Reliable RO units for cafes, restaurants, hotels and offices.",
    image: "https://i.pinimg.com/736x/29/57/8d/29578dd75c4c3acae76ec7fb09cf9a5c.jpg",
  },
  "Industrial Water Treatment": {
    description: "High-capacity RO, DM and UF plants engineered for industrial process water.",
    image: "https://i.pinimg.com/736x/da/bb/c0/dabbc0ff5c0dc475bd81b1ffb1d33b30.jpg",
  },
  "Water Softeners": {
    description: "Ion-exchange softeners that eliminate scale and protect your plumbing.",
    image: "https://i.pinimg.com/736x/e4/06/93/e406931103b209b0282acc1449cef95f.jpg",
  },
  "RO Spare Parts": {
    description: "Genuine membranes, pumps, tanks and accessories for every system.",
    image:
      "https://images.jdmagicbox.com/quickquotes/images_main/domestic-water-purifier-spare-parts-2213130807-kjs1ekva.png",
  },
  "Filter Cartridges": {
    description: "Sediment, carbon, UF and mineral cartridges with standard fittings.",
    image:
      "https://i.pinimg.com/736x/13/0a/72/130a729a249230f3f4cc487e8ab0c887.jpg",
  },
};

const FEATURES = [
  {
    icon: FiAward,
    title: "Premium Water Filters",
    description: "Industry-leading systems certified to NSF and WQA standards.",
  },
  {
    icon: FiTool,
    title: "Expert Installation",
    description: "Trained technicians handle setup, testing and calibration for every install.",
  },
  {
    icon: FiShield,
    title: "Trusted Quality",
    description: "15+ years of clean-water expertise across residential and industrial projects.",
  },
  {
    icon: FiZap,
    title: "Energy Efficient",
    description: "Low-power pumps and smart valves keep operating costs low.",
  },
  {
    icon: FiTrendingUp,
    title: "Affordable Solutions",
    description: "Flexible plans and long-life cartridges reduce total cost of ownership.",
  },
  {
    icon: FiHeadphones,
    title: "After-Sales Support",
    description: "Annual maintenance contracts and priority service on every unit we install.",
  },
];

const SERVICES = [
  {
    icon: FiSettings,
    title: "Installation",
    description: "Professional setup for homes, offices and industrial facilities.",
  },
  {
    icon: FiTool,
    title: "Maintenance",
    description: "Scheduled servicing to keep systems performing at peak efficiency.",
  },
  {
    icon: FiDroplet,
    title: "Filter Replacement",
    description: "Genuine cartridges, membranes and consumables replaced on time.",
  },
  {
    icon: FiCheckCircle,
    title: "Water Quality Testing",
    description: "Comprehensive lab-grade analysis with actionable recommendations.",
  },
  {
    icon: FiShield,
    title: "Annual Maintenance",
    description: "AMC plans that cover parts, labor and priority emergency support.",
  },
  {
    icon: FiHeadphones,
    title: "Consultation",
    description: "Free site surveys and system sizing for your unique requirements.",
  },
];

const PROCESS = [
  { step: "01", title: "Consultation", text: "We discuss your water needs, usage and space." },
  {
    step: "02",
    title: "Water Analysis",
    text: "On-site testing determines the right filtration path.",
  },
  {
    step: "03",
    title: "Recommendation",
    text: "We propose a system tuned to your water and budget.",
  },
  {
    step: "04",
    title: "Installation",
    text: "Certified technicians install with zero disruption.",
  },
  { step: "05", title: "Testing", text: "Every unit is commissioned and quality-tested." },
  { step: "06", title: "Support", text: "Ongoing maintenance keeps your water pure for years." },
];

const TESTIMONIALS: Testimonial[] = [
  {
    name: "Ahmed Khan",
    role: "Homeowner",
    quote:
      "Aqua City transformed our home water. The install was clean and the water tastes incredible.",
    rating: 5,
    avatar:
      "https://uxwing.com/wp-content/themes/uxwing/download/peoples-avatars/default-avatar-profile-picture-male-icon.png",
  },
  {
    name: "Iftikhar Malik",
    role: "Restaurant Owner",
    quote:
      "Our commercial RO has run flawlessly for two years. Support team is always a call away.",
    rating: 5,
    avatar:
      "https://uxwing.com/wp-content/themes/uxwing/download/peoples-avatars/default-avatar-profile-picture-male-icon.png",
  },
  {
    name: "Mariyum Ali",
    role: "Facility Manager",
    quote: "Rock-solid industrial plant. They handled everything from design to commissioning.",
    rating: 5,
    avatar:
      "https://uxwing.com/wp-content/themes/uxwing/download/peoples-avatars/default-avatar-profile-picture-female-icon.png",
  },
  {
    name: "Muhammad Mehmood",
    role: "Hotel GM",
    quote: "The softener eliminated our scale headaches overnight. Highly recommended.",
    rating: 5,
    avatar:
      "https://uxwing.com/wp-content/themes/uxwing/download/peoples-avatars/default-avatar-profile-picture-male-icon.png",
  },
  {
    name: "Fatima Hussain",
    role: "Homeowner",
    quote:
      "Professional, punctual, and priced fairly. The mineral cartridge makes a real difference.",
    rating: 4,
    avatar:
      "https://uxwing.com/wp-content/themes/uxwing/download/peoples-avatars/default-avatar-profile-picture-female-icon.png",
  },
  {
    name: "Saad Rao",
    role: "Cafe Owner",
    quote: "Our espresso quality jumped after installing their commercial RO. Zero downtime since.",
    rating: 5,
    avatar:
      "https://uxwing.com/wp-content/themes/uxwing/download/peoples-avatars/default-avatar-profile-picture-male-icon.png",
  },
];

const FAQS = [
  {
    q: "How often should filter cartridges be replaced?",
    a: "Sediment and carbon cartridges are typically replaced every 6–12 months, RO membranes every 2–3 years. Our AMC plans handle this for you automatically.",
  },
  {
    q: "Do you install in apartments and rental properties?",
    a: "Yes. We offer non-invasive countertop and under-sink systems that install without permanent plumbing changes.",
  },
  {
    q: "Is a booster pump required?",
    a: "It depends on your inlet pressure. If pressure is below 40 PSI, we recommend adding our AquaCity booster pump.",
  },
  {
    q: "Do you provide water testing?",
    a: "Absolutely. Every consultation includes free on-site TDS and hardness testing, plus lab analysis on request.",
  },
  {
    q: "What warranties do you offer?",
    a: "All systems ship with a 2-year limited warranty. Extended plans and AMC options are available at installation.",
  },
];

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Aqua City Water Filters — Pure Water. Healthier Living." },
      {
        name: "description",
        content:
          "Premium water filtration systems, RO plants, softeners and cartridges for homes, businesses and industries. Certified installation & lifetime support.",
      },
      { property: "og:title", content: "Aqua City Water Filters — Pure Water. Healthier Living." },
      {
        property: "og:description",
        content: "Premium water filtration systems for homes, businesses and industries.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Home,
});

function Home() {
  const { products, isLoading: productsLoading } = useProducts();
  const { categories, isLoading: categoriesLoading } = useCategories();

  const featured = products.slice(0, 8);

  const transformedCategories = categories.map((category: Category) => {
    const meta = CATEGORY_META[category.name];
    return {
      name: category.name,
      description: meta?.description || "Water filtration solutions",
      image: meta?.image || "/images/placeholder.jpg",
    };
  });

  const isLoading = productsLoading || categoriesLoading;

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-2xl mb-4">🔄</div>
          <p className="text-muted-foreground">Loading products...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* HERO SLIDER */}
      <HeroSlider slides={HERO_SLIDES} />

      {/* TRUST BADGE STRIP */}
      <section className="border-b border-border bg-secondary/60">
        <div className="container-x">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 py-5">
            {(
              [
                { Icon: FiShield, title: "Certified Quality", sub: "NSF / WQA standards" },
                { Icon: FiTool, title: "Free Installation", sub: "On every system" },
                { Icon: FiHeadphones, title: "Lifetime Support", sub: "Priority servicing" },
                { Icon: FiZap, title: "Genuine Parts", sub: "Full warranty cover" },
              ] as { Icon: IconType; title: string; sub: string }[]
            ).map(({ Icon, title, sub }, i) => (
              <div key={i} className="flex items-center gap-3">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-brand-soft text-brand">
                  <Icon className="h-5 w-5" />
                </span>
                <div className="min-w-0">
                  <div className="text-xs sm:text-sm font-semibold leading-tight truncate">
                    {title}
                  </div>
                  <div className="text-[10px] sm:text-[11px] text-muted-foreground truncate">
                    {sub}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CATEGORIES */}
      <section className="py-16 sm:py-20">
        <div className="container-x">
          <SectionTitle
            eyebrow="Our Range"
            title="Shop by category"
            subtitle="From compact countertop purifiers to large-scale industrial plants."
          />
          <div className="mt-8 sm:mt-10 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5 sm:gap-4">
            {transformedCategories.length > 0
              ? transformedCategories.map(
                  (cat: { name: string; description: string; image: string }, i: number) => (
                    <CategoryCard
                      key={cat.name}
                      category={cat.name as CategoryCardProps["category"]}
                      description={cat.description}
                      image={cat.image}
                      index={i}
                    />
                  ),
                )
              : Array.from({ length: 6 }).map((_, i) => (
                  <div key={i} className="card-surface p-2.5 animate-pulse">
                    <div className="aspect-[4/3] bg-muted rounded-lg"></div>
                    <div className="h-3.5 bg-muted rounded mt-2.5"></div>
                    <div className="h-2.5 bg-muted rounded mt-1.5"></div>
                  </div>
                ))}
          </div>
        </div>
      </section>

      {/* FEATURED PRODUCTS */}
      <section className="py-16 sm:py-20 bg-secondary/50">
        <div className="container-x">
          <SectionTitle
            eyebrow="Featured"
            title="Bestselling systems"
            subtitle="Handpicked units our customers rely on every day."
          />
          <div className="mt-8 sm:mt-10 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2.5 sm:gap-4">
            {featured.length > 0
              ? featured.map((product: Product, i: number) => (
                  <ProductCard key={product.id} product={product} index={i} />
                ))
              : Array.from({ length: 8 }).map((_, i) => (
                  <div key={i} className="card-surface p-2.5 animate-pulse">
                    <div className="aspect-square bg-muted rounded-lg"></div>
                    <div className="h-3.5 bg-muted rounded mt-2.5"></div>
                    <div className="h-2.5 bg-muted rounded mt-1.5 w-2/3"></div>
                  </div>
                ))}
          </div>
          <div className="mt-10 sm:mt-12 text-center">
            <Link to="/products" className="btn-primary">
              Browse full catalog
            </Link>
          </div>
        </div>
      </section>

      {/* WHY CHOOSE */}
      <section className="py-16 sm:py-20">
        <div className="container-x">
          <SectionTitle
            eyebrow="Why Aqua City"
            title="Engineered for clean water. Built for peace of mind."
            subtitle="Every system we install is backed by certified quality, transparent pricing and lifetime support."
          />
          <div className="mt-8 sm:mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5 sm:gap-4">
            {FEATURES.map((f, i) => (
              <FeatureCard key={f.title} {...f} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section className="py-16 sm:py-20 bg-secondary/50">
        <div className="container-x">
          <SectionTitle
            eyebrow="Services"
            title="End-to-end water solutions"
            subtitle="From first consultation to long-term support — we handle every step."
          />
          <div className="mt-8 sm:mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5 sm:gap-4">
            {SERVICES.map((s, i) => (
              <FeatureCard key={s.title} {...s} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section className="py-16 sm:py-20">
        <div className="container-x">
          <SectionTitle
            eyebrow="Our Process"
            title="A proven six-step approach"
            subtitle="A structured method that guarantees consistent, reliable results."
          />
          <div className="mt-8 sm:mt-12 grid gap-3 sm:gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {PROCESS.map((p, i) => (
              <motion.div
                key={p.step}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                className="card-surface card-lift p-5 sm:p-6 relative overflow-hidden"
              >
                <span className="absolute -top-2 -right-2 text-6xl sm:text-7xl font-bold text-brand-soft select-none">
                  {p.step}
                </span>
                <h3 className="relative text-base font-semibold">{p.title}</h3>
                <p className="relative mt-1.5 text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  {p.text}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-16 sm:py-20 bg-secondary/50">
        <div className="container-x">
          <SectionTitle
            eyebrow="Testimonials"
            title="Trusted by families and businesses"
            subtitle="Real stories from customers who chose Aqua City for their water."
          />
          <div className="mt-8 sm:mt-12 grid gap-3 sm:gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {TESTIMONIALS.map((t, i) => (
              <TestimonialCard key={t.name} t={t} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 sm:py-20">
        <div className="container-x">
          <SectionTitle
            eyebrow="FAQ"
            title="Answers to common questions"
            subtitle="Still curious? Get in touch — we love talking water."
          />
          <div className="mt-8 sm:mt-12">
            <FAQAccordion items={FAQS} />
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="pb-16 sm:pb-24">
        <div className="container-x">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5 }}
            className="relative overflow-hidden rounded-3xl grad-brand text-white p-8 sm:p-14"
          >
            <div className="absolute -top-16 -right-16 h-72 w-72 rounded-full bg-white/10 blur-3xl" />
            <div className="absolute -bottom-20 -left-16 h-72 w-72 rounded-full bg-white/10 blur-3xl" />
            <div className="relative max-w-3xl">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-balance">
                Ready for cleaner, healthier water at home or work?
              </h2>
              <p className="mt-4 text-white/85 text-base sm:text-lg max-w-2xl">
                Talk to our water experts today. Free consultation, free water testing and a custom
                recommendation — no pressure, no obligation.
              </p>
              <div className="mt-7 flex flex-wrap gap-3 sm:gap-4">
                <Link to="/contact" className="btn-primary bg-white !text-brand hover:!bg-white/90">
                  Book a Free Consultation
                </Link>
                <a href="tel:03340503503" className="btn-ghost-light">
                  <FiPhone /> Call 0334 0503503
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
