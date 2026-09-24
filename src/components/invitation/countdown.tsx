"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Reveal, Arabesque, Corners, SectionHeading } from "./atmosphere";
import { wedding } from "@/lib/wedding";

const target = new Date(wedding.dateISO).getTime();

function diff() {
  const ms = Math.max(0, target - Date.now());
  return {
    Days: Math.floor(ms / 86400000),
    Hours: Math.floor(ms / 3600000) % 24,
    Minutes: Math.floor(ms / 60000) % 60,
    Seconds: Math.floor(ms / 1000) % 60,
  };
}

function Tile({ label, value }: { label: string; value: number }) {
  const text = String(value).padStart(2, "0");
  return (
    <motion.div
      whileHover={{ y: -3 }}
      transition={{ type: "spring", stiffness: 280, damping: 20 }}
      className="gilded-card relative flex flex-col items-center overflow-hidden rounded-2xl px-2 py-5"
    >
      <Corners className="opacity-70" />
      <span
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/60 to-transparent"
      />
      <div className="relative h-10 w-full [perspective:400px]">
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.span
            key={text}
            initial={{ rotateX: -80, y: 12, opacity: 0 }}
            animate={{ rotateX: 0, y: 0, opacity: 1 }}
            exit={{ rotateX: 80, y: -12, opacity: 0 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-0 flex items-center justify-center font-display text-3xl tabular-nums text-foreground"
          >
            {text}
          </motion.span>
        </AnimatePresence>
      </div>
      <span className="mt-1 text-[0.6rem] uppercase tracking-[0.2em] text-muted-foreground">
        {label}
      </span>
    </motion.div>
  );
}

export function Countdown() {
  const [time, setTime] = useState(diff);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const id = setInterval(() => setTime(diff()), 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <section className="surface-dawn relative overflow-hidden px-6 py-20">
      <Arabesque opacity={0.08} size={160} />
      <div className="relative mx-auto max-w-md">
        <SectionHeading kicker="Counting every moment" title="Until We Say Yes" />

        <Reveal delay={0.1} className="mt-10 grid grid-cols-4 gap-3">
          {Object.entries(time).map(([label, value]) => (
            <Tile key={label} label={label} value={mounted ? value : 0} />
          ))}
        </Reveal>

        <Reveal delay={0.2}>
          <p className="mt-8 text-center text-xs uppercase tracking-[0.32em] text-gold">
            {wedding.timeLabel}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
