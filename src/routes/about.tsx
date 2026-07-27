import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import {
  FiAward,
  FiEye,
  FiHeart,
  FiTarget,
  FiUsers,
} from "react-icons/fi";
import { SectionTitle } from "../components/SectionTitle";
import { FeatureCard } from "../components/FeatureCard";

const TEAM = [
  { name: "Aisha Rahman", role: "Founder & CEO", img: "https://i.pravatar.cc/240?img=45" },
  { name: "Michael Torres", role: "Head of Engineering", img: "https://i.pravatar.cc/240?img=13" },
  { name: "Lena Park", role: "Water Quality Lead", img: "https://i.pravatar.cc/240?img=48" },
  { name: "James Whitaker", role: "Service Director", img: "https://i.pravatar.cc/240?img=11" },
];

const STATS = [
  { v: "15+", l: "Years Experience" },
  { v: "25,000+", l: "Happy Customers" },
  { v: "30,000+", l: "Installations" },
  { v: "40+", l: "Cities Served" },
];

const VALUES = [
  { icon: FiAward, title: "Quality First", description: "Every component is tested to global certification standards." },
  { icon: FiHeart, title: "Customer Care", description: "We treat every install as if it were in our own home." },
  { icon: FiTarget, title: "Precision", description: "Systems sized and tuned to each site's exact water profile." },
  { icon: FiUsers, title: "Community", description: "Investing in local training, jobs and water education." },
];

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Aqua City — Our Story, Mission & Team" },
      { name: "description", content: "Learn about Aqua City Water Filters — 15+ years engineering premium filtration systems for homes, businesses and industries." },
      { property: "og:title", content: "About Aqua City Water Filters" },
      { property: "og:description", content: "Our mission, values and the team behind every install." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: About,
});

function About() {
  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden -mt-20 pt-20 grad-brand text-white">
        <div className="absolute inset-0 opacity-20">
          <img
            src="https://images.unsplash.com/photo-1439405326854-014607f694d7?w=1600&q=80"
            alt=""
            className="h-full w-full object-cover"
          />
        </div>
        <div className="container-x py-24 sm:py-32 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl"
          >
            <span className="inline-flex rounded-full bg-white/15 backdrop-blur px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em]">
              About Aqua City
            </span>
            <h1 className="mt-6 text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.05] text-balance">
              We believe clean water should be a given, not a luxury.
            </h1>
            <p className="mt-6 text-lg text-white/85 max-w-2xl leading-relaxed">
              For over 15 years, Aqua City has engineered water filtration systems that families,
              businesses and industries trust every day.
            </p>
          </motion.div>
        </div>
      </section>

      {/* STORY */}
      <section className="py-24">
        <div className="container-x grid gap-16 lg:grid-cols-2 lg:items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5 }}
            className="relative"
          >
            <img
              src="https://aquaclearws.com/wp-content/uploads/2022/11/water-filtration-system.jpg"
              alt="Aqua City engineers at work"
              className="rounded-3xl w-full aspect-[4/5] object-cover"
            />
            <div className="absolute -bottom-6 -right-6 hidden sm:block card-surface p-6 max-w-[220px] shadow-soft">
              <div className="text-3xl font-bold text-brand">15+</div>
              <div className="text-xs uppercase tracking-widest text-muted-foreground mt-1">
                Years Perfecting Water
              </div>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5 }}
          >
            <span className="eyebrow">Our Story</span>
            <h2 className="mt-4 text-3xl sm:text-4xl font-bold text-balance">
              A commitment to pure water — for every home and industry.
            </h2>
            <div className="mt-6 space-y-4 text-muted-foreground leading-relaxed">
              <p>
                Aqua City was founded in 2008 with a simple idea: no household or business should
                worry about the safety of its water. We started with a single under-sink system
                and a promise to over-engineer everything we build.
              </p>
              <p>
                Today, our team designs, installs and maintains water treatment systems across 40+
                cities — from studio apartments to industrial process water plants.
              </p>
              <p>
                We're proud of the trust we've earned, but even prouder of the millions of glasses
                of clean water our systems produce every day.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* MISSION / VISION */}
      <section className="py-24 bg-secondary/50">
        <div className="container-x grid gap-6 lg:grid-cols-2">
          {[
            {
              icon: FiTarget,
              title: "Our Mission",
              text: "To make premium water filtration accessible, affordable and reliable — engineered locally, supported for life.",
            },
            {
              icon: FiEye,
              title: "Our Vision",
              text: "A world where every home, business and industry has instant access to safe, great-tasting water — free of doubt and free of waste.",
            },
          ].map(({ icon: Icon, title, text }, i) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="card-surface p-10 relative overflow-hidden"
            >
              <div className="grid h-14 w-14 place-items-center rounded-2xl bg-brand-soft text-brand">
                <Icon className="h-7 w-7" />
              </div>
              <h3 className="mt-6 text-2xl font-semibold">{title}</h3>
              <p className="mt-3 text-muted-foreground leading-relaxed">{text}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* VALUES */}
      <section className="py-24">
        <div className="container-x">
          <SectionTitle
            eyebrow="Core Values"
            title="What guides every install"
            subtitle="Four principles that shape how we design, deliver and support every system."
          />
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {VALUES.map((v, i) => (
              <FeatureCard key={v.title} {...v} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="pb-24">
        <div className="container-x">
          <div className="rounded-3xl grad-brand text-white p-10 sm:p-14">
            <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4 text-center">
              {STATS.map((s, i) => (
                <motion.div
                  key={s.l}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.4, delay: i * 0.08 }}
                >
                  <div className="text-4xl sm:text-5xl font-bold">{s.v}</div>
                  <div className="mt-2 text-xs uppercase tracking-[0.2em] text-white/70">
                    {s.l}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* TEAM */}
      {/* <section className="pb-24 bg-secondary/50 py-24">
        <div className="container-x">
          <SectionTitle
            eyebrow="Our Team"
            title="The people behind the water"
            subtitle="Engineers, technicians and support specialists dedicated to your water quality."
          />
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {TEAM.map((m, i) => (
              <motion.div
                key={m.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.4, delay: i * 0.06 }}
                className="card-surface card-lift overflow-hidden"
              >
                <div className="aspect-square overflow-hidden bg-muted">
                  <img src={m.img} alt={m.name} className="h-full w-full object-cover" />
                </div>
                <div className="p-5">
                  <div className="font-semibold">{m.name}</div>
                  <div className="mt-1 text-xs uppercase tracking-widest text-muted-foreground">
                    {m.role}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section> */}

      {/* CTA */}
      <section className="pb-24">
        <div className="container-x">
          <div className="rounded-3xl bg-brand-soft p-10 sm:p-14 text-center">
            <h2 className="text-3xl sm:text-4xl font-bold text-balance">
              Ready to work with our team?
            </h2>
            <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
              Get a personalized recommendation from a certified Aqua City engineer.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Link to="/contact" className="btn-primary">Contact Us</Link>
              <Link to="/products" className="btn-outline">View Products</Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
