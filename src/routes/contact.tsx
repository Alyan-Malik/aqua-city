import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { FiClock, FiMail, FiMapPin, FiPhone } from "react-icons/fi";
import { ContactForm } from "../components/ContactForm";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact Aqua City — Free Consultation & Water Testing" },
      {
        name: "description",
        content:
          "Get in touch with the Aqua City team. Free consultation, on-site water testing and expert recommendations.",
      },
      { property: "og:title", content: "Contact Aqua City Water Filters" },
      {
        property: "og:description",
        content: "Book a free consultation with our water experts.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Contact,
});

const INFO = [
  {
    icon: FiMapPin,
    title: "Visit Us",
    lines: ["Main Boulevard, Blue Area,", "Islamabad, Pakistan"],
  },
  {
    icon: FiPhone,
    title: "Call Us",
    lines: ["+92 (51) 123-4567", "+92 (300) 987-6543"],
  },
  {
    icon: FiMail,
    title: "Email Us",
    lines: ["hello@aquacity.example", "sales@aquacity.example"],
  },
  {
    icon: FiClock,
    title: "Working Hours",
    lines: ["Mon – Sat: 8:00 – 20:00", "Sun: 10:00 – 16:00"],
  },
];

function Contact() {
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
              Contact
            </span>
            <h1 className="mt-5 text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.05] text-balance">
              Let's talk about your water.
            </h1>
            <p className="mt-5 text-lg text-white/85 max-w-2xl">
              Tell us about your space and requirements — we'll design the right
              system, source it, install it and support it.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Info cards */}
      <section className="py-16">
        <div className="container-x grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {INFO.map((i, idx) => (
            <motion.div
              key={i.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.4, delay: idx * 0.06 }}
              className="card-surface card-lift p-6"
            >
              <div className="grid h-11 w-11 place-items-center rounded-xl bg-brand-soft text-brand">
                <i.icon className="h-5 w-5" />
              </div>
              <div className="mt-4 text-sm font-semibold uppercase tracking-widest text-muted-foreground">
                {i.title}
              </div>
              <div className="mt-2 space-y-0.5 text-[15px] leading-relaxed">
                {i.lines.map((l) => (
                  <div key={l}>{l}</div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Form + Map */}
      <section className="pb-24">
        <div className="container-x grid gap-8 lg:grid-cols-[1.1fr_1fr]">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5 }}
          >
            <span className="eyebrow">Send a message</span>
            <h2 className="mt-4 text-3xl sm:text-4xl font-bold">
              Request a free consultation
            </h2>
            <p className="mt-3 text-muted-foreground">
              Fill out the form and our team will get back to you within one
              business day.
            </p>
            <div className="mt-8">
              <ContactForm />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5 }}
            className="card-surface overflow-hidden rounded-2xl border border-border min-h-[400px] lg:min-h-full"
          >
            <iframe
              title="Aqua City Islamabad Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d106198.24357335688!2d72.98188168270502!3d33.68442018861966!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38dfbfd07891722f%3A0x6059515c3bdb02b6!2sIslamabad%2C%20Islamabad%20Capital%20Territory%2C%20Pakistan!5e0!3m2!1sen!2s!4v1710000000000!5m2!1sen!2s"
              className="h-full w-full min-h-[400px] border-0"
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </motion.div>
        </div>
      </section>
    </>
  );
}