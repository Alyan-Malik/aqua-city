import { motion } from "framer-motion";
import type { IconType } from "react-icons";

interface Props {
  icon: IconType;
  title: string;
  description: string;
  index?: number;
}

export function FeatureCard({ icon: Icon, title, description, index = 0 }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      className="card-surface card-lift p-3.5 sm:p-4"
    >
      <div className="grid h-9 w-9 place-items-center rounded-lg bg-brand-soft text-brand">
        <Icon className="h-4 w-4" />
      </div>
      <h3 className="mt-3 text-sm sm:text-base font-semibold leading-snug">{title}</h3>
      <p className="mt-1.5 text-[11px] sm:text-xs text-muted-foreground leading-relaxed line-clamp-3">{description}</p>
    </motion.div>
  );
}
