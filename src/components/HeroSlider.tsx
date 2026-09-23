// src/components/HeroSlider.tsx
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "@tanstack/react-router";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

interface Slide {
  image: string;
  subtitle?: string;
}

interface Props {
  slides: Slide[];
  interval?: number;
}

export function HeroSlider({ slides, interval = 6000 }: Props) {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused || slides.length <= 1) return;
    const id = setInterval(() => setCurrent((c) => (c + 1) % slides.length), interval);
    return () => clearInterval(id);
  }, [paused, slides.length, interval]);

  const prev = () => setCurrent((c) => (c - 1 + slides.length) % slides.length);
  const next = () => setCurrent((c) => (c + 1) % slides.length);

  const slide = slides[current];

  return (
    <section
      className="relative -mt-[117px] pt-[117px] sm:-mt-[126px] sm:pt-[126px] lg:-mt-[94px] lg:pt-[134px] overflow-hidden"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* The image IS the section — natural ratio, full width, edge to edge.
          No background color, no padding, no panels: zero spaces on any side, zero crop. */}
      <div className="relative w-full">
        {/* Natural-ratio sizer — defines exact image height, full image always visible */}
        <img src={slide.image} alt="" aria-hidden className="block w-full h-auto" />

        {/* Crossfading slide layers — box matches image ratio exactly, so no crop, no gaps */}
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.div
            key={current}
            initial={{ opacity: 0, scale: 1.04 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.1, ease: "easeOut" }}
            className="absolute inset-0"
          >
            <img
              src={slide.image}
              alt={`Banner ${current + 1}`}
              className="h-full w-full object-cover"
            />
          </motion.div>
        </AnimatePresence>

        {/* Readability overlays (restored) — left gradient + bottom gradient over the banner */}
        <div className="absolute inset-0 bg-gradient-to-r from-brand/60 via-brand/25 to-transparent pointer-events-none" />
        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-brand/70 to-transparent pointer-events-none" />

        {/* Desktop / tablet content — subtitle + buttons stuck to bottom-left */}
        <div className="hidden sm:flex container-x absolute inset-0 items-end z-10 pb-7 lg:pb-9">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -14 }}
              transition={{ duration: 0.55, ease: "easeOut" }}
              className="max-w-2xl text-white"
            >
              {slide.subtitle && (
                <p className="text-sm lg:text-lg text-white max-w-xl leading-relaxed drop-shadow-[0_2px_8px_rgba(0,0,0,0.45)]">
                  {slide.subtitle}
                </p>
              )}
              <div className="mt-4 flex flex-wrap gap-3">
                <Link
                  to="/products"
                  className="btn-primary bg-white !text-brand hover:!bg-white/90 shadow-lg !py-2.5 !px-6 text-sm"
                >
                  View Products
                </Link>
                <Link
                  to="/contact"
                  className="btn-ghost-light border border-white/40 hover:bg-white/10 !py-2.5 !px-6 text-sm"
                >
                  Contact Us
                </Link>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Mobile — small buttons on bottom-LEFT, only when a slide opts in (has subtitle = slide 2) */}
        {slide.subtitle && (
          <div className="sm:hidden absolute inset-x-0 bottom-0 z-10 flex justify-start p-2.5">
            <AnimatePresence mode="wait">
              <motion.div
                key={current}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="flex flex-wrap gap-1.5"
              >
              <Link
  to="/products"
  className="btn-primary bg-white !text-brand hover:!bg-white/90 shadow-lg !py-1 !px-2.5 !text-[10px]"
>
  View Products
</Link>
<Link
  to="/contact"
  className="btn-ghost-light border border-white/40 hover:bg-white/10 !py-1 !px-2.5 !text-[10px]"
>
  Contact Us
</Link>
              </motion.div>
            </AnimatePresence>
          </div>
        )}

        {/* Arrows — desktop/tablet only */}
        {slides.length > 1 && (
          <>
            <button
              onClick={prev}
              aria-label="Previous slide"
              className="hidden sm:grid absolute left-4 lg:left-8 top-1/2 -translate-y-1/2 z-20 h-11 w-11 place-items-center rounded-full border border-white/25 bg-white/10 backdrop-blur text-white transition-colors hover:bg-white hover:text-brand"
            >
              <FiChevronLeft className="h-5 w-5" />
            </button>
            <button
              onClick={next}
              aria-label="Next slide"
              className="hidden sm:grid absolute right-4 lg:right-8 top-1/2 -translate-y-1/2 z-20 h-11 w-11 place-items-center rounded-full border border-white/25 bg-white/10 backdrop-blur text-white transition-colors hover:bg-white hover:text-brand"
            >
              <FiChevronRight className="h-5 w-5" />
            </button>
          </>
        )}
      </div>

      {/* Dots — bottom center, over the image, all screens */}
      {slides.length > 1 && (
        <div className="absolute bottom-2 sm:bottom-3 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              aria-label={`Go to slide ${i + 1}`}
              className={`h-1.5 sm:h-2 rounded-full transition-all duration-300 ${
                i === current ? "w-6 sm:w-7 bg-white" : "w-1.5 sm:w-2 bg-white/45 hover:bg-white/70"
              }`}
            />
          ))}
        </div>
      )}
    </section>
  );
}
