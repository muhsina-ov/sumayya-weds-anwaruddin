"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { ChevronDown, MapPin } from "lucide-react";
import { useRef } from "react";
import { Aurora, FloralDivider } from "./atmosphere";
import { wedding } from "@/lib/wedding";

export function Hero({ start = true }: { start?: boolean }) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  // Layered parallax: text drifts up and fades, artwork lags behind.
  const textY = useTransform(scrollYProgress, [0, 1], [0, -90]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.65], [1, 0]);
  const artY = useTransform(scrollYProgress, [0, 1], [0, 60]);
  const artScale = useTransform(scrollYProgress, [0, 1], [1, 1.12]);

  const rise = (delay: number) => ({
    initial: reduce ? {} : { opacity: 0, y: 20 },
    animate: start ? { opacity: 1, y: 0 } : {},
    transition: { duration: 0.9, delay, ease: [0.22, 1, 0.36, 1] as const },
  });

  return (
    <section
      ref={ref}
      className="relative flex min-h-[100svh] flex-col overflow-hidden bg-sky-mist"
    >
      <Aurora className="opacity-40" />

      {/* Background illustration */}
      <motion.img
        src={wedding.heroArt}
        alt={`Wedding of ${wedding.groom.fullName} and ${wedding.bride.fullName}`}
        width={1024}
        height={1536}
        style={{
          y: reduce ? 0 : artY,
          scale: reduce ? 1 : artScale,
          maskImage: "linear-gradient(to bottom, transparent 0%, black 26%)",
          WebkitMaskImage: "linear-gradient(to bottom, transparent 0%, black 26%)",
        }}
        initial={reduce ? {} : { opacity: 0, scale: 1.08 }}
        animate={start ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
        className="pointer-events-none absolute inset-x-0 bottom-0 h-[62%] w-full object-cover object-bottom"
      />

      <motion.div
        style={{ y: reduce ? 0 : textY, opacity: reduce ? 1 : textOpacity }}
        className="relative z-10 mx-auto w-full max-w-md px-7 pt-[12vh] text-center flex flex-col items-center"
      >
        <motion.p {...rise(0.05)} className="font-display text-xl text-gold" dir="rtl" lang="ar">
          {wedding.bismillah}
        </motion.p>

        <motion.p
          {...rise(0.12)}
          className="mt-2 text-xs italic text-foreground/80 font-display"
        >
          {wedding.bismillahLatin}
        </motion.p>

        {/* Groom parents invitation kicker */}
        <motion.div
          {...rise(0.18)}
          className="mt-4 rounded-full border border-gold/35 bg-card/80 px-4 py-1.5 backdrop-blur-sm"
        >
          <p className="text-[0.68rem] font-medium tracking-[0.2em] uppercase text-gold">
            {wedding.parentsInvite.message}
          </p>
        </motion.div>

        <motion.h1 {...rise(0.3)} className="mt-4 font-display text-foreground">
          <span className="block text-5xl leading-tight">{wedding.groom.name}</span>
          <motion.span
            className="my-1 block text-3xl italic text-gold"
            animate={reduce || !start ? {} : { scale: [1, 1.12, 1] }}
            transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
          >
            &amp;
          </motion.span>
          <span className="block text-5xl leading-tight">{wedding.bride.name}</span>
        </motion.h1>

        <motion.div {...rise(0.45)}>
          <FloralDivider className="mt-5" />
        </motion.div>

        <motion.div
          {...rise(0.6)}
          className="mt-5 inline-flex flex-col items-center gap-1.5 rounded-2xl border border-gold/40 bg-card/90 px-6 py-3.5 shadow-soft backdrop-blur-md"
        >
          <p className="font-display text-base font-semibold tracking-[0.16em] uppercase text-foreground">
            {wedding.dateLabel} · 10:30 AM
          </p>
          <div className="h-px w-10 bg-gold/30" />
          <p className="flex items-center justify-center gap-1.5 text-xs font-medium text-foreground/85">
            <MapPin className="h-3.5 w-3.5 text-gold shrink-0" />
            {wedding.venue.name}
          </p>
        </motion.div>
      </motion.div>

      <motion.div
        aria-hidden
        className="absolute bottom-6 left-1/2 z-10 -translate-x-1/2 text-foreground/60"
        animate={reduce ? {} : { y: [0, 8, 0] }}
        transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
      >
        <ChevronDown className="h-5 w-5" />
      </motion.div>
    </section>
  );
}
