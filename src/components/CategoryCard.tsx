import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { FiArrowRight } from "react-icons/fi";
import type { Category } from "../data/products";

interface Props {
  category: Category;
  description: string;
  image: string;
  index?: number;
}

export function CategoryCard({ category, description, image, index = 0 }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.45, delay: index * 0.05 }}
      className="group"
    >
      <Link
        to="/products"
        search={{ category } as never}
        className="card-surface card-lift block overflow-hidden"
      >
        <div className="aspect-[4/3] overflow-hidden bg-muted">
          <img
            src={image}
            alt={category}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>
        <div className="p-6">
          <h3 className="text-lg font-semibold">{category}</h3>
          <p className="mt-1.5 text-sm text-muted-foreground line-clamp-2">{description}</p>
          <div className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-brand">
            Explore range
            <FiArrowRight className="transition-transform group-hover:translate-x-1" />
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
