import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
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
import { CategoryCard } from "../components/CategoryCard";
import { ProductCard } from "../components/ProductCard";
import { TestimonialCard, type Testimonial } from "../components/TestimonialCard";
import { FAQAccordion } from "../components/FAQAccordion";
import { PRODUCTS, CATEGORIES } from "../data/products";

const HERO_BG_PATTERN =
  "https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=1800&q=80";

// Pre-calculate bubbles distributed across the height immediately on mount
const BUBBLES = Array.from({ length: 24 }, (_, i) => ({
  id: i,
  size: Math.floor(Math.random() * 55) + 20, // 20px to 75px
  left: `${Math.random() * 95}%`,
  startY: `${Math.random() * 100}%`,
  duration: Math.random() * 8 + 7,
  blur: Math.random() > 0.65 ? "blur-sm" : "blur-none",
}));

const CATEGORY_META: Record<
  string,
  { description: string; image: string }
> = {
  "Domestic Water Filters": {
    description: "Under-sink, countertop and whole-home purifiers for everyday drinking water.",
    image: "/images/13.jpeg",
  },
  "Commercial RO Systems": {
    description: "Reliable RO units for cafes, restaurants, hotels and offices.",
    image: "/images/9.jpeg",
  },
  "Industrial Water Treatment": {
    description: "High-capacity RO, DM and UF plants engineered for industrial process water.",
    image: "https://nuwater.com/wp-content/uploads/Untitled-design-35.png",
  },
  "Water Softeners": {
    description: "Ion-exchange softeners that eliminate scale and protect your plumbing.",
    image: "/images/5.jpeg",
  },
  "RO Spare Parts": {
    description: "Genuine membranes, pumps, tanks and accessories for every system.",
    image: "https://images.jdmagicbox.com/quickquotes/images_main/domestic-water-purifier-spare-parts-2213130807-kjs1ekva.png",
  },
  "Filter Cartridges": {
    description: "Sediment, carbon, UF and mineral cartridges with standard fittings.",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQSIFBElaw7depL6ENtKEFsFTBFruJ1gKBXZDER1A9wLqeWqEkIfm54RMwj&s=10",
  },
};

const FEATURES = [
  { icon: FiAward, title: "Premium Water Filters", description: "Industry-leading systems certified to NSF and WQA standards." },
  { icon: FiTool, title: "Expert Installation", description: "Trained technicians handle setup, testing and calibration for every install." },
  { icon: FiShield, title: "Trusted Quality", description: "15+ years of clean-water expertise across residential and industrial projects." },
  { icon: FiZap, title: "Energy Efficient", description: "Low-power pumps and smart valves keep operating costs low." },
  { icon: FiTrendingUp, title: "Affordable Solutions", description: "Flexible plans and long-life cartridges reduce total cost of ownership." },
  { icon: FiHeadphones, title: "After-Sales Support", description: "Annual maintenance contracts and priority service on every unit we install." },
];

const SERVICES = [
  { icon: FiSettings, title: "Installation", description: "Professional setup for homes, offices and industrial facilities." },
  { icon: FiTool, title: "Maintenance", description: "Scheduled servicing to keep systems performing at peak efficiency." },
  { icon: FiDroplet, title: "Filter Replacement", description: "Genuine cartridges, membranes and consumables replaced on time." },
  { icon: FiCheckCircle, title: "Water Quality Testing", description: "Comprehensive lab-grade analysis with actionable recommendations." },
  { icon: FiShield, title: "Annual Maintenance", description: "AMC plans that cover parts, labor and priority emergency support." },
  { icon: FiHeadphones, title: "Consultation", description: "Free site surveys and system sizing for your unique requirements." },
];

const PROCESS = [
  { step: "01", title: "Consultation", text: "We discuss your water needs, usage and space." },
  { step: "02", title: "Water Analysis", text: "On-site testing determines the right filtration path." },
  { step: "03", title: "Recommendation", text: "We propose a system tuned to your water and budget." },
  { step: "04", title: "Installation", text: "Certified technicians install with zero disruption." },
  { step: "05", title: "Testing", text: "Every unit is commissioned and quality-tested." },
  { step: "06", title: "Support", text: "Ongoing maintenance keeps your water pure for years." },
];

const TESTIMONIALS: Testimonial[] = [
  {
    name: "Ahmed Khan",
    role: "Homeowner",
    quote: "Aqua City transformed our home water. The install was clean and the water tastes incredible.",
    rating: 5,
    avatar: "https://uxwing.com/wp-content/themes/uxwing/download/peoples-avatars/default-avatar-profile-picture-male-icon.png",
  },
  {
    name: "Iftikhar Malik",
    role: "Restaurant Owner",
    quote: "Our commercial RO has run flawlessly for two years. Support team is always a call away.",
    rating: 5,
    avatar: "https://uxwing.com/wp-content/themes/uxwing/download/peoples-avatars/default-avatar-profile-picture-male-icon.png",
  },
  {
    name: "Mariyum Ali",
    role: "Facility Manager",
    quote: "Rock-solid industrial plant. They handled everything from design to commissioning.",
    rating: 5,
    avatar: "https://uxwing.com/wp-content/themes/uxwing/download/peoples-avatars/default-avatar-profile-picture-female-icon.png",
  },
  {
    name: "Muhammad Mehmood",
    role: "Hotel GM",
    quote: "The softener eliminated our scale headaches overnight. Highly recommended.",
    rating: 5,
    avatar: "https://uxwing.com/wp-content/themes/uxwing/download/peoples-avatars/default-avatar-profile-picture-male-icon.png",
  },
  {
    name: "Fatima Hussain",
    role: "Homeowner",
    quote: "Professional, punctual, and priced fairly. The mineral cartridge makes a real difference.",
    rating: 4,
    avatar: "https://uxwing.com/wp-content/themes/uxwing/download/peoples-avatars/default-avatar-profile-picture-female-icon.png",
  },
  {
    name: "Saad Rao",
    role: "Cafe Owner",
    quote: "Our espresso quality jumped after installing their commercial RO. Zero downtime since.",
    rating: 5,
    avatar: "https://uxwing.com/wp-content/themes/uxwing/download/peoples-avatars/default-avatar-profile-picture-male-icon.png",
  },
];

const FAQS = [
  { q: "How often should filter cartridges be replaced?", a: "Sediment and carbon cartridges are typically replaced every 6–12 months, RO membranes every 2–3 years. Our AMC plans handle this for you automatically." },
  { q: "Do you install in apartments and rental properties?", a: "Yes. We offer non-invasive countertop and under-sink systems that install without permanent plumbing changes." },
  { q: "Is a booster pump required?", a: "It depends on your inlet pressure. If pressure is below 40 PSI, we recommend adding our AquaCity booster pump." },
  { q: "Do you provide water testing?", a: "Absolutely. Every consultation includes free on-site TDS and hardness testing, plus lab analysis on request." },
  { q: "What warranties do you offer?", a: "All systems ship with a 2-year limited warranty. Extended plans and AMC options are available at installation." },
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
      { property: "og:description", content: "Premium water filtration systems for homes, businesses and industries." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Home,
});

function Home() {
  const featured = PRODUCTS.slice(0, 6);

  return (
    <>
      {/* HERO */}
     <section className="relative overflow-hidden -mt-20 pt-20 bg-gradient-to-br from-brand via-brand/90 to-brand-hover min-h-[90vh] flex items-center">
      {/* 1. Cinematic Background Texture (Macro Pure Water Surface) */}
      <div className="absolute inset-0 z-0 opacity-40 mix-blend-overlay">
        <img
          src={HERO_BG_PATTERN}
          alt="Pure clean water refraction pattern"
          className="h-full w-full object-cover scale-105"
        />
      </div>
      
      
      {/* 3D Dynamic Animated Bubbles Overlay */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        {BUBBLES.map((bubble) => (
          <motion.div
            key={bubble.id}
            className={`absolute rounded-full border border-white/45 bg-gradient-to-tr from-white/35 via-white/10 to-transparent shadow-[inset_0_0_12px_rgba(255,255,255,0.7),0_8px_20px_rgba(0,0,0,0.12)] backdrop-blur-[2px] ${bubble.blur}`}
            style={{
              width: bubble.size,
              height: bubble.size,
              left: bubble.left,
              top: bubble.startY, // Placed instantly on screen
            }}
            animate={{
              // Float up from initial position to off-screen top, then loop from bottom to top endlessly
              y: ["0vh", "-110vh"],
              x: [0, Math.sin(bubble.id) * 35, 0],
              scale: [1, 1.12, 0.92, 1],
            }}
            transition={{
              duration: bubble.duration,
              repeat: Infinity,
              ease: "linear",
            }}
          >
            {/* Glossy 3D Reflection Dot */}
            <div className="absolute top-2 left-2 w-1.5 h-1.5 rounded-full bg-white/90 blur-[0.3px]" />
          </motion.div>
        ))}
      </div>

      {/* Background Ambient Glows */}
      <motion.div
        aria-hidden
        className="absolute -top-24 -right-24 h-96 w-96 rounded-full bg-cyan-400/20 blur-3xl pointer-events-none"
        animate={{ y: [0, 25, 0], scale: [1, 1.05, 1] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        aria-hidden
        className="absolute bottom-0 -left-24 h-80 w-80 rounded-full bg-blue-300/20 blur-3xl pointer-events-none"
        animate={{ y: [0, -25, 0], scale: [1, 1.1, 1] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="container-x py-24 sm:py-32 lg:py-40 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="max-w-3xl text-white"
        >
          <span className="inline-flex items-center gap-2 rounded-full bg-white/15 backdrop-blur px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] border border-white/20">
            <FiDroplet /> Trusted water experts since 2008
          </span>
          <h1 className="mt-6 text-4xl sm:text-5xl lg:text-7xl font-bold leading-[1.05] text-balance">
            Pure Water.<br />Healthier Living.
          </h1>
          <p className="mt-6 text-lg sm:text-xl text-white/85 max-w-2xl leading-relaxed">
            Aqua City engineers, installs and maintains premium water filtration systems for
            homes, businesses and industries — delivering safe, great-tasting water for over
            a decade.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <Link to="/products" className="btn-primary bg-white !text-brand hover:!bg-white/90 shadow-lg">
              View Products
            </Link>
            <Link to="/contact" className="btn-ghost-light border border-white/30 hover:bg-white/10">
              Contact Us
            </Link>
          </div>

          <div className="mt-14 grid grid-cols-2 sm:grid-cols-4 gap-6 max-w-2xl">
            {[
              ["15+", "Years Experience"],
              ["25k+", "Installations"],
              ["6", "Product Categories"],
              ["24/7", "Support"],
            ].map(([v, l]) => (
              <div key={l}>
                <div className="text-3xl sm:text-4xl font-bold">{v}</div>
                <div className="mt-1 text-xs uppercase tracking-widest text-white/70">{l}</div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>

      {/* WHY CHOOSE */}
      <section className="py-24">
        <div className="container-x">
          <SectionTitle
            eyebrow="Why Aqua City"
            title="Engineered for clean water. Built for peace of mind."
            subtitle="Every system we install is backed by certified quality, transparent pricing and lifetime support."
          />
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {FEATURES.map((f, i) => (
              <FeatureCard key={f.title} {...f} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* CATEGORIES */}
      <section className="py-24 bg-secondary/50">
        <div className="container-x">
          <SectionTitle
            eyebrow="Our Range"
            title="Product Categories"
            subtitle="From compact countertop purifiers to large-scale industrial plants."
          />
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {CATEGORIES.map((c, i) => (
              <CategoryCard
                key={c}
                category={c}
                description={CATEGORY_META[c].description}
                image={CATEGORY_META[c].image}
                index={i}
              />
            ))}
          </div>
        </div>
      </section>

      {/* FEATURED PRODUCTS */}
      <section className="py-24">
        <div className="container-x">
          <SectionTitle
            eyebrow="Featured"
            title="Bestselling systems"
            subtitle="Handpicked units our customers rely on every day."
          />
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featured.map((p, i) => (
              <ProductCard key={p.id} product={p} index={i} />
            ))}
          </div>
          <div className="mt-12 text-center">
            <Link to="/products" className="btn-primary">Browse full catalog</Link>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section className="py-24 bg-secondary/50">
        <div className="container-x">
          <SectionTitle
            eyebrow="Services"
            title="End-to-end water solutions"
            subtitle="From first consultation to long-term support — we handle every step."
          />
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {SERVICES.map((s, i) => (
              <FeatureCard key={s.title} {...s} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section className="py-24">
        <div className="container-x">
          <SectionTitle
            eyebrow="Our Process"
            title="A proven six-step approach"
            subtitle="A structured method that guarantees consistent, reliable results."
          />
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {PROCESS.map((p, i) => (
              <motion.div
                key={p.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                className="card-surface card-lift p-7 relative overflow-hidden"
              >
                <span className="absolute -top-2 -right-2 text-7xl font-bold text-brand-soft select-none">
                  {p.step}
                </span>
                <h3 className="relative text-lg font-semibold">{p.title}</h3>
                <p className="relative mt-2 text-sm text-muted-foreground leading-relaxed">
                  {p.text}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-24 bg-secondary/50">
        <div className="container-x">
          <SectionTitle
            eyebrow="Testimonials"
            title="Trusted by families and businesses"
            subtitle="Real stories from customers who chose Aqua City for their water."
          />
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {TESTIMONIALS.map((t, i) => (
              <TestimonialCard key={t.name} t={t} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24">
        <div className="container-x">
          <SectionTitle
            eyebrow="FAQ"
            title="Answers to common questions"
            subtitle="Still curious? Get in touch — we love talking water."
          />
          <div className="mt-14">
            <FAQAccordion items={FAQS} />
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="pb-24">
        <div className="container-x">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5 }}
            className="relative overflow-hidden rounded-3xl grad-brand text-white p-10 sm:p-16"
          >
            <div className="absolute -top-16 -right-16 h-72 w-72 rounded-full bg-white/10 blur-3xl" />
            <div className="absolute -bottom-20 -left-16 h-72 w-72 rounded-full bg-white/10 blur-3xl" />
            <div className="relative max-w-3xl">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-balance">
                Ready for cleaner, healthier water at home or work?
              </h2>
              <p className="mt-4 text-white/85 text-lg max-w-2xl">
                Talk to our water experts today. Free consultation, free water testing and a
                custom recommendation — no pressure, no obligation.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <Link to="/contact" className="btn-primary bg-white !text-brand hover:!bg-white/90">
                  Book a Free Consultation
                </Link>
                <a href="tel:+923005254953" className="btn-ghost-light">
                  <FiPhone /> Call&nbsp; 03005254953
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
