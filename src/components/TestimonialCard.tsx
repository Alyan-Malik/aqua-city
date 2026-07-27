import { motion } from "framer-motion";
import { FiStar } from "react-icons/fi";

export interface Testimonial {
  name: string;
  role: string;
  quote: string;
  rating: number;
  avatar: string;
}

export function TestimonialCard({ t, index = 0 }: { t: Testimonial; index?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      className="card-surface p-7 h-full flex flex-col"
    >
      <div className="flex items-center gap-1 text-brand">
        {Array.from({ length: 5 }).map((_, i) => (
          <FiStar
            key={i}
            className={`h-4 w-4 ${i < t.rating ? "fill-current" : "opacity-30"}`}
          />
        ))}
      </div>
      <p className="mt-4 text-[15px] leading-relaxed text-foreground/80 flex-1">
        "{t.quote}"
      </p>
      <div className="mt-6 flex items-center gap-3 pt-6 border-t border-border">
        <img
          src={t.avatar}
          alt={t.name}
          className="h-11 w-11 rounded-full object-cover"
          loading="lazy"
        />
        <div>
          <div className="font-semibold text-sm">{t.name}</div>
          <div className="text-xs text-muted-foreground">{t.role}</div>
        </div>
      </div>
    </motion.div>
  );
}
