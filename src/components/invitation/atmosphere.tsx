"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

/**
 * Ambient aurora backdrop in the invitation's sky / meadow / blossom palette.
 * Pure CSS + Framer Motion (no WebGL) so it stays smooth on low-end phones.
 */
export function Aurora({ className = "" }: { className?: string }) {
  const reduce = useReducedMotion();

  const blobs = [
    {
      style: "left-[-20%] top-[-10%] h-[70vh] w-[70vh] bg-aurora-sky",
      anim: { x: [0, 40, 0], y: [0, 30, 0] },
      duration: 18,
    },
    {
      style: "right-[-25%] top-[10%] h-[60vh] w-[60vh] bg-aurora-blossom",
      anim: { x: [0, -35, 0], y: [0, 45, 0] },
      duration: 22,
    },
    {
      style: "left-[10%] bottom-[-25%] h-[65vh] w-[65vh] bg-aurora-meadow",
      anim: { x: [0, 30, 0], y: [0, -35, 0] },
      duration: 26,
    },
    {
      style: "right-[5%] bottom-[-10%] h-[45vh] w-[45vh] bg-aurora-gold",
      anim: { x: [0, -25, 0], y: [0, -20, 0] },
      duration: 30,
    },
  ];

  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
    >
      {blobs.map((b, i) => (
        <motion.div
          key={i}
          className={`absolute rounded-full opacity-60 blur-[80px] ${b.style}`}
          animate={reduce ? {} : b.anim}
          transition={{
            duration: b.duration,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

/** Scroll-triggered fade + gentle rise. */
export function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const reduce = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial={reduce ? false : { opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

/** Small hand-drawn style floral divider. */
export function FloralDivider({ className = "" }: { className?: string }) {
  return (
    <div aria-hidden className={`flex items-center justify-center gap-3 text-gold ${className}`}>
      <span className="h-px w-14 bg-gradient-to-r from-transparent to-gold/60" />
      <svg width="34" height="20" viewBox="0 0 34 20" fill="none">
        <path
          d="M17 3c2.6 0 4.4 1.9 4.4 4.2 0 2.7-2.4 4.6-4.4 6.8-2-2.2-4.4-4.1-4.4-6.8C12.6 4.9 14.4 3 17 3Z"
          stroke="currentColor"
          strokeWidth="1.1"
        />
        <path d="M3 10h7M24 10h7" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" />
        <circle cx="17" cy="17" r="1.4" fill="currentColor" />
      </svg>
      <span className="h-px w-14 bg-gradient-to-l from-transparent to-gold/60" />
    </div>
  );
}

/** Islamic eight-point lattice, tiled as a faint texture over a section. */
const lattice =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120' viewBox='0 0 120 120'%3E%3Cg fill='none' stroke='%23b98b3f' stroke-width='0.9'%3E%3Crect x='24' y='24' width='72' height='72'/%3E%3Crect x='24' y='24' width='72' height='72' transform='rotate(45 60 60)'/%3E%3Ccircle cx='60' cy='60' r='36'/%3E%3Ccircle cx='60' cy='60' r='12'/%3E%3C/g%3E%3C/svg%3E\")";

export function Arabesque({
  className = "",
  opacity = 0.07,
  size = 120,
}: {
  className?: string;
  opacity?: number;
  size?: number;
}) {
  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute inset-0 ${className}`}
      style={{
        backgroundImage: lattice,
        backgroundSize: `${size}px ${size}px`,
        opacity,
        maskImage: "radial-gradient(120% 80% at 50% 50%, black, transparent 78%)",
        WebkitMaskImage: "radial-gradient(120% 80% at 50% 50%, black, transparent 78%)",
      }}
    />
  );
}

/** Ornate gold corner brackets for framed sections. */
export function Corners({ className = "" }: { className?: string }) {
  const corner = (extra: string) => (
    <span aria-hidden className={`pointer-events-none absolute h-6 w-6 border-gold/45 ${extra}`} />
  );
  return (
    <span aria-hidden className={`pointer-events-none absolute inset-0 ${className}`}>
      {corner("left-0 top-0 rounded-tl-2xl border-l border-t")}
      {corner("right-0 top-0 rounded-tr-2xl border-r border-t")}
      {corner("bottom-0 left-0 rounded-bl-2xl border-b border-l")}
      {corner("bottom-0 right-0 rounded-br-2xl border-b border-r")}
    </span>
  );
}

/** Painted mosque-and-hills silhouette used to seam two sections together. */
export function Skyline({ flip = false }: { flip?: boolean }) {
  return (
    <div aria-hidden className={`relative -mt-px h-16 w-full ${flip ? "rotate-180" : ""}`}>
      <svg
        viewBox="0 0 800 120"
        preserveAspectRatio="none"
        className="h-full w-full text-gold/25"
        fill="none"
      >
        <path
          d="M0 108h800V96c-40-4-70-16-104-26-30-9-52-4-80 4-24 7-42 2-60-8"
          stroke="currentColor"
          strokeWidth="1.5"
        />
        <path
          d="M0 120V92c46-2 78 8 112 18 34 10 62 6 96-4 40-12 76-8 112 6 30 12 58 12 88 2 34-11 66-16 100-8 38 9 72 22 112 20 32-2 58-10 80-18v32z"
          fill="currentColor"
          opacity="0.28"
        />
        <g stroke="currentColor" strokeWidth="1.4" opacity="0.75">
          <path d="M362 96V72c0-16 14-26 30-26s30 10 30 26v24" />
          <path d="M392 46c10-8 12-16 0-24-12 8-10 16 0 24Z" />
          <path d="M348 96V64M436 96V64" />
          <path d="M348 64c0-6 4-8 4-14M436 64c0-6-4-8-4-14" />
        </g>
      </svg>
    </div>
  );
}

/** Gilded section heading: kicker, gradient title, floral rule. */
export function SectionHeading({
  kicker,
  title,
  className = "",
}: {
  kicker: string;
  title: string;
  className?: string;
}) {
  return (
    <Reveal className={`text-center ${className}`}>
      <p className="text-[0.62rem] uppercase tracking-[0.46em] text-muted-foreground">{kicker}</p>
      <h2 className="mt-3 font-display text-[2.6rem] leading-none text-gilded">{title}</h2>
      <FloralDivider className="mt-5" />
    </Reveal>
  );
}
