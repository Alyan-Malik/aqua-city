import { motion } from "framer-motion";
import type { ReactNode } from "react";

interface Props {
  eyebrow?: string;
  title: ReactNode;
  subtitle?: ReactNode;
  align?: "left" | "center";
}

export function SectionTitle({ eyebrow, title, subtitle, align = "center" }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5 }}
      className={`max-w-2xl ${align === "center" ? "mx-auto text-center" : ""}`}
    >
      {eyebrow && <span className="eyebrow">{eyebrow}</span>}
      <h2 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-bold text-balance">{title}</h2>
      {subtitle && (
        <p className="mt-4 text-base sm:text-lg text-muted-foreground text-balance leading-relaxed">
          {subtitle}
        </p>
      )}
    </motion.div>
  );
}
