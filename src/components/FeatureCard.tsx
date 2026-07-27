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
      className="card-surface card-lift p-7"
    >
      <div className="grid h-12 w-12 place-items-center rounded-xl bg-brand-soft text-brand">
        <Icon className="h-6 w-6" />
      </div>
      <h3 className="mt-5 text-lg font-semibold">{title}</h3>
      <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{description}</p>
    </motion.div>
  );
}
