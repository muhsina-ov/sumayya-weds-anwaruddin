"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Play, SkipForward, Volume2, VolumeX } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { wedding } from "@/lib/wedding";

/** Ornate gilded corner flourish for the outer frame. */
function FrameCorner({ className = "" }: { className?: string }) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 64 64"
      className={`pointer-events-none absolute h-16 w-16 text-gold/70 ${className}`}
      fill="none"
      stroke="currentColor"
      strokeWidth="1"
    >
      <path d="M2 62V22C2 11 11 2 22 2h40" />
      <path d="M8 62V24c0-9 7-16 16-16h38" opacity="0.55" />
      <path d="M14 30c8 0 14-6 14-14" opacity="0.8" />
      <circle cx="21" cy="21" r="2.4" fill="currentColor" stroke="none" />
      <path d="M28 16c5-4 11-4 16 0-5 4-11 4-16 0Z" opacity="0.9" />
      <path d="M16 28c-4 5-4 11 0 16 4-5 4-11 0-16Z" opacity="0.9" />
    </svg>
  );
}

/**
 * Full-screen Interactive Invitation Intro:
 * 1. Shows cover image (ChatGPT Image) with Bismillah plaque & invitation title.
 * 2. On clicking cover/button, plays the invitation video with audio.
 * 3. Upon video completion (or skip), smoothly fades out to reveal the main wedding page.
 */
export function EnvelopeIntro({ open, onOpen }: { open: boolean; onOpen: () => void }) {
  const reduce = useReducedMotion();
  const [isPlayingVideo, setIsPlayingVideo] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isFading, setIsFading] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    document.body.style.overflow = open ? "" : "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const handleStartVideo = () => {
    if (reduce) {
      onOpen();
      return;
    }
    setIsPlayingVideo(true);
  };

  useEffect(() => {
    if (isPlayingVideo && videoRef.current) {
      const vid = videoRef.current;
      vid.muted = isMuted;
      const playPromise = vid.play();
      if (playPromise !== undefined) {
        playPromise.catch((err) => {
          console.warn("Video play error:", err);
        });
      }
    }
  }, [isPlayingVideo, isMuted]);

  const handleVideoEnded = () => {
    if (isFading) return;
    setIsFading(true);
    setTimeout(() => {
      onOpen();
    }, 600);
  };

  const handleSkip = () => {
    if (isFading) return;
    setIsFading(true);
    setTimeout(() => {
      onOpen();
    }, 400);
  };

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  return (
    <AnimatePresence>
      {!open && (
        <motion.div
          key="intro-overlay"
          className="fixed inset-0 z-[70] flex flex-col items-center justify-center overflow-hidden bg-black px-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: isFading ? 0 : 1 }}
          exit={{ opacity: 0, scale: 1.05, filter: "blur(12px)" }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          {!isPlayingVideo ? (
            /* STAGE 1: COVER IMAGE & INTERACTIVE OPEN TRIGGER */
            <motion.button
              type="button"
              onClick={handleStartVideo}
              aria-label="Click anywhere to play wedding invitation video"
              className="relative flex h-full w-full max-w-4xl flex-col items-center justify-between py-10 px-4 cursor-pointer outline-none group select-none overflow-hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1 }}
            >
              {/* Full-bleed background cover image showing envelope & sunset field artwork */}
              <motion.img
                src={wedding.introCover}
                alt="Wedding Invitation Cover"
                className="pointer-events-none absolute inset-0 h-full w-full object-cover object-center filter brightness-[0.92] contrast-[1.03] transition-transform duration-1000 ease-out group-hover:scale-[1.02]"
                initial={reduce ? {} : { scale: 1.08 }}
                animate={{ scale: 1 }}
                transition={{ duration: 3, ease: [0.22, 1, 0.36, 1] }}
              />

              {/* Gentle subtle top & bottom gradients for legible gold text */}
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/55 via-transparent to-black/60"
              />

              {/* Gilded outer border frame */}
              <motion.div
                aria-hidden
                className="pointer-events-none absolute inset-4 rounded-3xl border border-gold/45 shadow-2xl"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2, duration: 1.2 }}
              >
                <span className="absolute inset-[6px] rounded-[1.25rem] border border-gold/25" />
                <FrameCorner className="-left-1 -top-1" />
                <FrameCorner className="-right-1 -top-1 scale-x-[-1]" />
                <FrameCorner className="-bottom-1 -left-1 scale-y-[-1]" />
                <FrameCorner className="-bottom-1 -right-1 scale-[-1]" />
              </motion.div>

              {/* Drifting light motes */}
              {!reduce &&
                Array.from({ length: 16 }, (_, i) => (
                  <motion.span
                    key={i}
                    aria-hidden
                    className="pointer-events-none absolute rounded-full bg-gold/70 blur-[1px]"
                    style={{
                      left: `${(i * 67) % 100}%`,
                      top: `${(i * 41) % 100}%`,
                      width: 3 + (i % 3),
                      height: 3 + (i % 3),
                    }}
                    animate={{ y: [0, -30, 0], opacity: [0.2, 0.9, 0.2] }}
                    transition={{
                      duration: 6 + (i % 4),
                      delay: (i * 0.5) % 5,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  />
                ))}

              {/* Top: Bismillah Plaque */}
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.8 }}
                className="relative z-10 flex flex-col items-center text-center mt-2"
              >
                <p
                  className="font-display text-2xl sm:text-4xl leading-relaxed text-gold drop-shadow-[0_2px_14px_rgba(0,0,0,0.95)]"
                  dir="rtl"
                  lang="ar"
                >
                  {wedding.bismillah}
                </p>
                <span className="mt-2 flex items-center gap-3 text-gold/80">
                  <span className="h-px w-14 bg-gradient-to-r from-transparent via-gold/80 to-transparent" />
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 16 16"
                    fill="none"
                    aria-hidden
                    className="text-gold drop-shadow"
                  >
                    <path
                      d="M8 1.5 9.6 6.4 14.5 8 9.6 9.6 8 14.5 6.4 9.6 1.5 8 6.4 6.4Z"
                      stroke="currentColor"
                      strokeWidth="1.2"
                    />
                  </svg>
                  <span className="h-px w-14 bg-gradient-to-l from-transparent via-gold/80 to-transparent" />
                </span>
              </motion.div>

              {/* Spacer so bottom content stays pinned at bottom */}
              <div className="my-auto" />

              {/* Bottom: Couple Names, Date & Interactive Prompt Pill */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.8 }}
                className="relative z-10 flex flex-col items-center text-center mb-2 px-3"
              >
                <p className="mb-2 text-xs sm:text-sm font-medium tracking-[0.18em] text-gold drop-shadow-[0_2px_10px_rgba(0,0,0,0.95)]">
                  {wedding.parentsInvite.message}
                </p>
                <h2 className="font-display text-3xl sm:text-5xl font-bold tracking-wide text-white drop-shadow-[0_3px_16px_rgba(0,0,0,0.95)]">
                  {wedding.bride.name} <span className="italic text-gold">&amp;</span>{" "}
                  {wedding.groom.name}
                </h2>
                <p className="mt-1 text-xs sm:text-sm font-medium uppercase tracking-[0.38em] text-white/90 drop-shadow-[0_2px_10px_rgba(0,0,0,0.9)]">
                  {wedding.dateLabel}
                </p>

                <div className="mt-5 flex items-center gap-2.5 rounded-full border border-gold/60 bg-black/60 px-7 py-3 backdrop-blur-md shadow-2xl transition-all duration-300 group-hover:border-gold group-hover:bg-black/75 group-hover:shadow-[0_0_20px_rgba(234,179,8,0.3)]">
                  <span className="text-xs font-semibold uppercase tracking-[0.32em] text-white">
                    Tap to Open Invitation
                  </span>
                  <motion.svg
                    width="14"
                    height="14"
                    viewBox="0 0 18 10"
                    fill="none"
                    aria-hidden
                    className="text-gold"
                    animate={reduce ? {} : { y: [0, 3, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                  >
                    <path
                      d="M1 1l8 7 8-7"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                  </motion.svg>
                </div>
              </motion.div>
            </motion.button>
          ) : (
            /* STAGE 2: FULL SCREEN VIDEO PLAYBACK WITH CONTROLS & SKIP */
            <div className="relative flex h-full w-full items-center justify-center">
              <video
                ref={videoRef}
                src={wedding.introVideo}
                playsInline
                onEnded={handleVideoEnded}
                onError={() => handleVideoEnded()}
                className="h-full w-full max-h-screen max-w-4xl object-contain shadow-2xl rounded-lg"
              />

              {/* Floating top bar with sound toggle & skip button */}
              <div className="absolute top-6 inset-x-6 z-20 flex items-center justify-between pointer-events-auto">
                <button
                  type="button"
                  onClick={toggleMute}
                  className="flex items-center gap-2 rounded-full border border-white/20 bg-black/60 px-4 py-2 text-xs font-medium text-white backdrop-blur-md transition hover:bg-black/80 hover:border-gold/50"
                  aria-label={isMuted ? "Unmute audio" : "Mute audio"}
                >
                  {isMuted ? (
                    <>
                      <VolumeX className="h-4 w-4 text-gold" />
                      <span>Unmute</span>
                    </>
                  ) : (
                    <>
                      <Volume2 className="h-4 w-4 text-gold" />
                      <span>Sound On</span>
                    </>
                  )}
                </button>

                <button
                  type="button"
                  onClick={handleSkip}
                  className="flex items-center gap-2 rounded-full border border-white/20 bg-black/60 px-5 py-2 text-xs font-medium text-white backdrop-blur-md transition hover:bg-black/80 hover:border-gold/50"
                  aria-label="Skip video"
                >
                  <span>Skip Intro</span>
                  <SkipForward className="h-4 w-4 text-gold" />
                </button>
              </div>
            </div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
