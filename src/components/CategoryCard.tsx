// src/components/CategoryCard.tsx
import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { FiArrowRight } from "react-icons/fi";
import type { Category } from "../data/products";

export interface CategoryCardProps {
  category: Category;
  description: string;
  image: string;
  index?: number;
}

export function CategoryCard({ category, description, image, index = 0 }: CategoryCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.35, delay: index * 0.04 }}
      className="group"
    >
      <Link
        to="/products"
        search={{ category } as never}
        className="card-surface card-lift block overflow-hidden h-full"
      >
        <div className="relative aspect-[4/3] overflow-hidden bg-muted">
          <img
            src={image}
            alt={category}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>
        <div className="p-2.5 sm:p-3">
          <h3 className="text-xs sm:text-sm font-semibold leading-snug line-clamp-1">{category}</h3>
          <p className="mt-0.5 text-[10px] sm:text-[11px] text-muted-foreground line-clamp-2 leading-relaxed">
            {description}
          </p>
          <span className="mt-1.5 inline-flex items-center gap-1 text-[10px] sm:text-[11px] font-semibold text-brand">
            Explore
            <FiArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5" />
          </span>
        </div>
      </Link>
    </motion.div>
  );
}
