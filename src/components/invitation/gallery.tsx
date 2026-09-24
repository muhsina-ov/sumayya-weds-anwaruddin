"use client";

import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { useEffect, useState } from "react";
import { Reveal, Arabesque, SectionHeading } from "./atmosphere";
import { wedding } from "@/lib/wedding";

export function Gallery() {
  const [active, setActive] = useState<number | null>(null);
  const photos = wedding.gallery;

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (active === null) return;
      if (e.key === "Escape") setActive(null);
      if (e.key === "ArrowRight") setActive((i) => ((i ?? 0) + 1) % photos.length);
      if (e.key === "ArrowLeft") setActive((i) => ((i ?? 0) - 1 + photos.length) % photos.length);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [active, photos.length]);

  return (
    <section className="surface-parchment relative overflow-hidden px-6 py-20">
      <Arabesque opacity={0.05} size={200} />
      <div className="relative mx-auto max-w-md">
        <SectionHeading kicker="Moments before forever" title="Our Gallery" />

        <div className="mt-10 grid grid-cols-2 gap-3">
          {photos.map((src, i) => (
            <Reveal key={src} delay={0.05 * i} className={i % 3 === 0 ? "col-span-2" : ""}>
              <motion.button
                type="button"
                onClick={() => setActive(i)}
                whileTap={{ scale: 0.97 }}
                className="group relative block w-full overflow-hidden rounded-2xl shadow-soft ring-1 ring-gold/30"
                aria-label={`Open photograph ${i + 1}`}
              >
                <motion.img
                  layoutId={`photo-${i}`}
                  src={src}
                  alt={`Pre-wedding photograph ${i + 1}`}
                  loading="lazy"
                  className={`w-full object-cover transition-transform duration-700 group-hover:scale-[1.06] ${
                    i % 3 === 0 ? "aspect-[16/10]" : "aspect-[3/4]"
                  }`}
                />
                <span
                  aria-hidden
                  className="pointer-events-none absolute inset-0 bg-gradient-to-t from-foreground/35 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                />
                <span
                  aria-hidden
                  className="pointer-events-none absolute inset-2 rounded-xl border border-gold-foreground/35 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                />
              </motion.button>
            </Reveal>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {active !== null && (
          <motion.div
            className="fixed inset-0 z-[80] flex items-center justify-center bg-foreground/80 p-5 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActive(null)}
          >
            <motion.img
              layoutId={`photo-${active}`}
              key={photos[active]}
              src={photos[active]}
              alt={`Pre-wedding photograph ${active + 1}`}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.25}
              onDragEnd={(_, info) => {
                if (info.offset.x < -70) setActive((i) => ((i ?? 0) + 1) % photos.length);
                else if (info.offset.x > 70)
                  setActive((i) => ((i ?? 0) - 1 + photos.length) % photos.length);
              }}
              onClick={(e) => e.stopPropagation()}
              className="max-h-[80vh] w-full max-w-md cursor-grab rounded-3xl object-contain shadow-soft active:cursor-grabbing"
            />
            <button
              type="button"
              aria-label="Close photograph"
              onClick={() => setActive(null)}
              className="absolute right-5 top-5 rounded-full bg-card/85 p-2.5 text-foreground shadow-soft"
            >
              <X className="h-5 w-5" />
            </button>
            <div className="absolute bottom-8 left-1/2 flex -translate-x-1/2 gap-1.5">
              {photos.map((_, i) => (
                <span
                  key={i}
                  className={`h-1.5 rounded-full transition-all ${
                    i === active ? "w-5 bg-gold" : "w-1.5 bg-card/60"
                  }`}
                />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
