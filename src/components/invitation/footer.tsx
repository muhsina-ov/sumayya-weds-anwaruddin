"use client";

import { Heart } from "lucide-react";
import { Aurora, Reveal, FloralDivider } from "./atmosphere";
import { wedding } from "@/lib/wedding";

// Islamic geometric eight-point star lattice
const arabesque =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160' viewBox='0 0 160 160'%3E%3Cg fill='none' stroke='%23b98b3f' stroke-width='1.1'%3E%3Crect x='30' y='30' width='100' height='100'/%3E%3Crect x='30' y='30' width='100' height='100' transform='rotate(45 80 80)'/%3E%3Ccircle cx='80' cy='80' r='50'/%3E%3Ccircle cx='80' cy='80' r='18'/%3E%3Cpath d='M0 80h160M80 0v160'/%3E%3C/g%3E%3C/svg%3E\")";

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-background px-6 py-24">
      <Aurora className="opacity-70" />
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.22]"
        style={{ backgroundImage: arabesque, backgroundSize: "160px 160px" }}
      />
      <div className="absolute inset-0 bg-background/55" />

      <div className="relative z-10 mx-auto max-w-md text-center">
        <Reveal>
          <FloralDivider />
          <p className="mt-8 font-display text-xl italic leading-relaxed text-foreground/90">
            &ldquo;{wedding.ayah}&rdquo;
          </p>
          <p className="mt-3 text-[0.65rem] uppercase tracking-[0.3em] text-gold">
            {wedding.ayahRef}
          </p>
          <p className="mt-8 font-display text-2xl leading-relaxed text-foreground">
            {wedding.closing}
          </p>
        </Reveal>

        <Reveal delay={0.12}>
          <h2 className="mt-10 font-display text-5xl text-gilded">
            {wedding.bride.name} <span className="italic text-gold">&amp;</span>{" "}
            {wedding.groom.name}
          </h2>
          <p className="mt-3 text-[0.7rem] uppercase tracking-[0.35em] text-muted-foreground">
            1 &amp; 3 October 2026
          </p>
          <p className="mt-3 text-xs tracking-wider text-gold font-medium">
            With warmest wishes from Baji Sheik, Jareena Sheik &amp; Family
          </p>
        </Reveal>

        <Reveal delay={0.2}>
          <p className="mt-12 flex items-center justify-center gap-1.5 text-xs text-muted-foreground">
            Made with <Heart className="h-3.5 w-3.5 fill-blossom text-blossom" /> for our loved ones
          </p>
        </Reveal>
      </div>
      <a
        href="https://www.instagram.com/invitestory.in/"
        target="_blank"
        rel="noreferrer"
        className="mt-3 inline-block text-[10px] uppercase tracking-[0.35em] text-current opacity-70 transition-opacity hover:opacity-100"
      >
        Follow @invitestory.in on Instagram
      </a>
    </footer>
  );
}
