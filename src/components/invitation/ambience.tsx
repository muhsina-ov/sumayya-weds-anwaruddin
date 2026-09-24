"use client";

import { motion, useReducedMotion, useScroll, useSpring } from "framer-motion";
import { useMemo } from "react";

/** Thin gold reading-progress line pinned to the top of the viewport. */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.3 });

  return (
    <motion.div
      aria-hidden
      style={{ scaleX }}
      className="fixed inset-x-0 top-0 z-[60] h-[3px] origin-left bg-gradient-to-r from-blossom via-gold to-sky"
    />
  );
}

/** Gentle drifting blossom petals over the whole page. */
export function Petals({ count = 14 }: { count?: number }) {
  const reduce = useReducedMotion();

  const petals = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        left: (i * 97) % 100,
        size: 7 + ((i * 13) % 9),
        delay: (i * 1.7) % 14,
        duration: 16 + ((i * 5) % 12),
        drift: ((i % 5) - 2) * 26,
        tone: i % 3,
      })),
    [count],
  );

  if (reduce) return null;

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-[55] overflow-hidden">
      {petals.map((p, i) => (
        <motion.span
          key={i}
          className={`absolute -top-8 block rounded-[100%_0_100%_0] ${
            p.tone === 0 ? "bg-blossom/70" : p.tone === 1 ? "bg-gold/40" : "bg-sky/50"
          }`}
          style={{ left: `${p.left}%`, width: p.size, height: p.size }}
          initial={{ y: -40, opacity: 0 }}
          animate={{
            y: ["-5vh", "105vh"],
            x: [0, p.drift, -p.drift / 2, 0],
            rotate: [0, 180, 360],
            opacity: [0, 0.9, 0.9, 0],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      ))}
    </div>
  );
}
