// import { Link } from "@tanstack/react-router";
// import { motion } from "framer-motion";
// import { FiArrowRight } from "react-icons/fi";
// import type { Product } from "../data/products";

// export function ProductCard({ product, index = 0 }: { product: Product; index?: number }) {
//   return (
//     <motion.article
//       initial={{ opacity: 0, y: 20 }}
//       whileInView={{ opacity: 1, y: 0 }}
//       viewport={{ once: true, margin: "-60px" }}
//       transition={{ duration: 0.4, delay: (index % 6) * 0.04 }}
//       className="card-surface card-lift group flex flex-col overflow-hidden"
//     >
//       <Link
//         to="/products/$id"
//         params={{ id: product.id }}
//         className="block aspect-[4/3] overflow-hidden bg-muted"
//       >
//         <img
//           src={product.image}
//           alt={product.name}
//           loading="lazy"
//           className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
//         />
//       </Link>
//       <div className="flex flex-1 flex-col p-4">
//         <div className="text-[10px] font-semibold uppercase tracking-wider text-brand">
//           {product.category}
//         </div>
//         <h3 className="mt-1 text-base font-semibold leading-tight">
//           <Link
//             to="/products/$id"
//             params={{ id: product.id }}
//             className="hover:text-brand transition-colors"
//           >
//             {product.name}
//           </Link>
//         </h3>
//         <p className="mt-1 text-[11px] text-muted-foreground">Model: {product.model}</p>
//         <p className="mt-2 text-xs text-muted-foreground line-clamp-2">
//           {product.shortDescription}
//         </p>
//         <div className="mt-4 pt-3 border-t border-border">
//           <Link
//             to="/products/$id"
//             params={{ id: product.id }}
//             className="inline-flex items-center gap-1.5 text-xs font-semibold text-brand group/link"
//           >
//             View Details
//             <FiArrowRight className="transition-transform group-hover/link:translate-x-1" />
//           </Link>
//         </div>
//       </div>
//     </motion.article>
//   );
// }


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
  // Get primary image or first image
  const primaryImage = product.images?.find(img => img.is_primary) || product.images?.[0];
  const imageUrl = primaryImage 
    ? `https://api.aquacityonline.shop/storage/${primaryImage.image}`
    : '/images/placeholder.jpg';

  // Parse key features if it's a string
  const features = Array.isArray(product.key_features) 
    ? product.key_features 
    : product.key_features ? JSON.parse(product.key_features as string) : [];

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
        params={{ id: product.id.toString() }}
        className="block aspect-[16/10] overflow-hidden bg-muted relative"
      >
        <img
          src={imageUrl}
          alt={product.name}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {product.images && product.images.length > 1 && (
          <div className="absolute top-1.5 right-1.5 bg-black/70 text-white text-[10px] px-1.5 py-0.5 rounded-full backdrop-blur">
            +{product.images.length}
          </div>
        )}
      </Link>

      <div className="flex flex-1 flex-col p-3 sm:p-3.5">
        <div className="text-[9px] font-semibold uppercase tracking-wider text-brand">
          {product.category?.name || 'Uncategorized'}
        </div>
        
        <h3 className="mt-0.5 text-sm font-semibold leading-snug line-clamp-2">
          <Link
            to="/products/$id"
            params={{ id: product.id.toString() }}
            className="hover:text-brand transition-colors"
          >
            {product.name}
          </Link>
        </h3>
        
        {product.model_no && (
          <p className="mt-0.5 text-[10px] text-muted-foreground">Model: {product.model_no}</p>
        )}

        {product.description && (
          <p className="mt-1.5 text-[11px] text-muted-foreground line-clamp-2 hidden sm:block">
            {product.description}
          </p>
        )}

        {features.length > 0 && (
          <div className="mt-2 hidden sm:flex flex-wrap gap-1">
            {features.slice(0, 2).map((feature: string, idx: number) => (
              <span
                key={idx}
                className="text-[10px] bg-secondary text-secondary-foreground px-1.5 py-0.5 rounded-full"
              >
                {feature}
              </span>
            ))}
            {features.length > 2 && (
              <span className="text-[10px] text-muted-foreground">
                +{features.length - 2} more
              </span>
            )}
          </div>
        )}

        <div className="mt-auto pt-2.5 border-t border-border flex items-center justify-between gap-2">
          <Link
            to="/products/$id"
            params={{ id: product.id.toString() }}
            className="inline-flex items-center gap-1 text-[11px] font-semibold text-brand group/link"
          >
            Details
            <FiArrowRight className="h-3 w-3 transition-transform group-hover/link:translate-x-1" />
          </Link>
          <span className="text-xs font-bold text-foreground whitespace-nowrap">
            Rs{Number(product.price).toFixed(0)}
          </span>
        </div>
      </div>
    </motion.article>
  );
}