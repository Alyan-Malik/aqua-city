// src/components/ProductCard.tsx
import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { FiArrowRight } from "react-icons/fi";
import { Product } from "../types";

interface ProductCardProps {
  product: Product;
  index: number;
}

export function ProductCard({ product, index }: ProductCardProps) {
  const primaryImage = product.images?.find((img) => img.is_primary) || product.images?.[0];
  const imageUrl = primaryImage
    ? `https://api.aquacityonline.shop/storage/${primaryImage.image}`
    : "/images/placeholder.jpg";

  return (
    <motion.article
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.35, delay: (index % 4) * 0.05 }}
      className="card-surface card-lift group flex flex-col overflow-hidden"
    >
      {/* Image area — same fill behavior as CategoryCard, no gaps or bars */}
      <Link
        to="/products/$id"
        params={{ id: product.id.toString() }}
        className="relative block aspect-[4/3] overflow-hidden bg-muted"
      >
        <img
          src={imageUrl}
          alt={product.name}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {product.images && product.images.length > 1 && (
          <span className="absolute top-2 right-2 bg-brand/90 text-white text-[10px] font-semibold px-1.5 py-0.5 rounded-full">
            +{product.images.length - 1}
          </span>
        )}
      </Link>

      <div className="flex flex-1 flex-col gap-1 p-3 sm:p-3.5">
        <span className="text-[9px] sm:text-[10px] font-semibold uppercase tracking-wider text-brand line-clamp-1">
          {product.category?.name || "Uncategorized"}
        </span>

        <h3 className="text-xs sm:text-sm font-semibold leading-snug line-clamp-2 min-h-[2.4em]">
          <Link
            to="/products/$id"
            params={{ id: product.id.toString() }}
            className="hover:text-brand transition-colors"
          >
            {product.name}
          </Link>
        </h3>

        <div className="mt-auto pt-2 flex items-center justify-between gap-2">
          <Link
            to="/products/$id"
            params={{ id: product.id.toString() }}
            className="inline-flex items-center gap-1 text-[11px] font-semibold text-brand group/link"
          >
            Details
            <FiArrowRight className="h-3 w-3 transition-transform group-hover/link:translate-x-0.5" />
          </Link>
          <span className="text-xs sm:text-sm font-bold text-foreground whitespace-nowrap">
            Rs {Number(product.price).toLocaleString("en-PK")}
          </span>
        </div>
      </div>
    </motion.article>
  );
}
