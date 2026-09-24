"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Reveal, Arabesque, SectionHeading, Skyline, Corners } from "./atmosphere";
import { wedding } from "@/lib/wedding";

function Portrait({
  photo,
  name,
  fullName,
  line,
  blurb,
  delay,
  from,
}: {
  photo: string;
  name: string;
  fullName: string;
  line: string;
  blurb: string;
  delay: number;
  from: number;
}) {
  const reduce = useReducedMotion();

  return (
    <Reveal delay={delay} className="text-center">
      <motion.div
        className="relative mx-auto w-full max-w-[16rem]"
        initial={reduce ? false : { x: from, rotate: from > 0 ? 4 : -4, opacity: 0 }}
        whileInView={{ x: 0, rotate: 0, opacity: 1 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        whileHover={{ scale: 1.03, rotate: from > 0 ? 1.2 : -1.2 }}
      >
        <motion.div
          aria-hidden
          className="arch absolute -inset-3 bg-gradient-to-b from-blossom/50 via-sky/35 to-meadow/35 blur-lg"
          animate={reduce ? {} : { scale: [1, 1.05, 1], opacity: [0.75, 1, 0.75] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        />
        <span
          aria-hidden
          className="arch pointer-events-none absolute -inset-1 border border-gold/40"
        />
        <img
          src={photo}
          alt={`Portrait of ${fullName}`}
          loading="lazy"
          className="arch relative aspect-[3/4] w-full object-cover shadow-soft ring-1 ring-gold/40"
        />
      </motion.div>
      <h3 className="mt-6 font-display text-3xl text-foreground">{name}</h3>
      {fullName && fullName !== name && (
        <p className="mt-1 text-xs uppercase tracking-[0.24em] text-gold">{fullName}</p>
      )}
      <p className="mt-3 text-sm text-muted-foreground">{line}</p>
      <p className="mx-auto mt-3 max-w-xs text-sm leading-relaxed text-foreground/70">{blurb}</p>
    </Reveal>
  );
}

export function Couple() {
  const reduce = useReducedMotion();

  return (
    <section className="surface-parchment relative overflow-hidden px-6 py-20">
      <Arabesque opacity={0.06} />
      <div className="relative mx-auto max-w-md">
        <SectionHeading kicker="Two hearts, one journey" title="The Couple" />

        {/* Groom's Parents Special Invitation Card */}
        <Reveal delay={0.08} className="mt-8 mb-12">
          <div className="gilded-card relative overflow-hidden rounded-3xl p-6 text-center shadow-soft">
            <Corners className="opacity-75" />
            <span className="inline-block rounded-full border border-gold/40 bg-gold/10 px-3.5 py-1 text-[0.68rem] font-semibold uppercase tracking-[0.24em] text-gold">
              {wedding.parentsInvite.badge}
            </span>
            <h4 className="mt-3 font-display text-2xl font-bold text-foreground">
              {wedding.parentsInvite.parents}
            </h4>
            <p className="mt-2 font-display text-lg italic text-gold">
              &ldquo;{wedding.parentsInvite.message}&rdquo;
            </p>
            <p className="mx-auto mt-2.5 max-w-xs text-xs leading-relaxed text-muted-foreground">
              {wedding.parentsInvite.subtext}
            </p>
          </div>
        </Reveal>

        <div className="mt-10 space-y-14">
          <Portrait {...wedding.groom} delay={0.05} from={-40} />
          <motion.div
            className="text-center font-display text-4xl italic text-gold"
            initial={reduce ? false : { scale: 0.6, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true, amount: 0.8 }}
            transition={{ type: "spring", stiffness: 220, damping: 14 }}
          >
            &amp;
          </motion.div>
          <Portrait {...wedding.bride} delay={0.15} from={40} />
        </div>
      </div>
      <div className="absolute inset-x-0 bottom-0">
        <Skyline />
      </div>
    </section>
  );
}
