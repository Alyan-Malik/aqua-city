import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { FiArrowRight } from "react-icons/fi";
import type { Product } from "../data/products";

export function ProductCard({ product, index = 0 }: { product: Product; index?: number }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.4, delay: (index % 6) * 0.04 }}
      className="card-surface card-lift group flex flex-col overflow-hidden"
    >
      <Link
        to="/products/$id"
        params={{ id: product.id }}
        className="block aspect-[4/3] overflow-hidden bg-muted"
      >
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </Link>
      <div className="flex flex-1 flex-col p-4">
        <div className="text-[10px] font-semibold uppercase tracking-wider text-brand">
          {product.category}
        </div>
        <h3 className="mt-1 text-base font-semibold leading-tight">
          <Link
            to="/products/$id"
            params={{ id: product.id }}
            className="hover:text-brand transition-colors"
          >
            {product.name}
          </Link>
        </h3>
        <p className="mt-1 text-[11px] text-muted-foreground">Model: {product.model}</p>
        <p className="mt-2 text-xs text-muted-foreground line-clamp-2">
          {product.shortDescription}
        </p>
        <div className="mt-4 pt-3 border-t border-border">
          <Link
            to="/products/$id"
            params={{ id: product.id }}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-brand group/link"
          >
            View Details
            <FiArrowRight className="transition-transform group-hover/link:translate-x-1" />
          </Link>
        </div>
      </div>
    </motion.article>
  );
}