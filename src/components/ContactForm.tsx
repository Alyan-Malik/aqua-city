import { motion, AnimatePresence } from "framer-motion";
import { useState, type FormEvent } from "react";
import { FiCheckCircle, FiSend } from "react-icons/fi";

export function ContactForm() {
  const [sent, setSent] = useState(false);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSent(true);
    (e.currentTarget as HTMLFormElement).reset();
    setTimeout(() => setSent(false), 5000);
  };

  const inputCls =
    "w-full rounded-xl border border-border bg-white px-4 py-3 text-sm outline-none transition focus:border-brand focus:ring-4 focus:ring-brand/10";

  return (
    <form onSubmit={onSubmit} className="card-surface p-6 sm:p-8 space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <label className="block">
          <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Full Name
          </span>
          <input required type="text" name="name" className={`${inputCls} mt-2`} placeholder="Jane Doe" />
        </label>
        <label className="block">
          <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Email
          </span>
          <input required type="email" name="email" className={`${inputCls} mt-2`} placeholder="you@company.com" />
        </label>
        <label className="block">
          <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Phone
          </span>
          <input type="tel" name="phone" className={`${inputCls} mt-2`} placeholder="+1 555 123 4567" />
        </label>
        <label className="block">
          <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Subject
          </span>
          <input required type="text" name="subject" className={`${inputCls} mt-2`} placeholder="How can we help?" />
        </label>
      </div>
      <label className="block">
        <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Message
        </span>
        <textarea
          required
          name="message"
          rows={5}
          className={`${inputCls} mt-2 resize-none`}
          placeholder="Tell us about your requirements..."
        />
      </label>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <p className="text-xs text-muted-foreground">
          We typically respond within one business day.
        </p>
        <button type="submit" className="btn-primary">
          <FiSend className="h-4 w-4" />
          Send Message
        </button>
      </div>
      <AnimatePresence>
        {sent && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            className="flex items-center gap-3 rounded-xl bg-brand-soft px-4 py-3 text-sm text-brand"
          >
            <FiCheckCircle className="h-5 w-5" />
            Thanks! Your message has been received. Our team will contact you shortly.
          </motion.div>
        )}
      </AnimatePresence>
    </form>
  );
}
