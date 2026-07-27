import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { FiPlus } from "react-icons/fi";

export interface FAQItem {
  q: string;
  a: string;
}

export function FAQAccordion({ items }: { items: FAQItem[] }) {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <div className="max-w-3xl mx-auto space-y-3">
      {items.map((item, i) => {
        const isOpen = open === i;
        return (
          <div
            key={i}
            className={`card-surface overflow-hidden transition-colors ${
              isOpen ? "border-brand/40" : ""
            }`}
          >
            <button
              className="w-full flex items-center justify-between gap-4 p-5 text-left"
              onClick={() => setOpen(isOpen ? null : i)}
              aria-expanded={isOpen}
            >
              <span className="font-semibold text-[15px]">{item.q}</span>
              <span
                className={`grid h-8 w-8 shrink-0 place-items-center rounded-full bg-brand-soft text-brand transition-transform ${
                  isOpen ? "rotate-45" : ""
                }`}
              >
                <FiPlus className="h-4 w-4" />
              </span>
            </button>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  className="overflow-hidden"
                >
                  <div className="px-5 pb-5 text-sm text-muted-foreground leading-relaxed">
                    {item.a}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
