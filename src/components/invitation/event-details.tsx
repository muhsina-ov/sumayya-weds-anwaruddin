"use client";

import { motion } from "framer-motion";
import { CalendarPlus, Clock, MapPin, Navigation } from "lucide-react";
import { toast } from "sonner";
import { Reveal, Arabesque, Corners, SectionHeading, Skyline } from "./atmosphere";
import { Button } from "@/components/ui/button";
import { openGoogleCalendar } from "@/lib/calendar";
import { wedding } from "@/lib/wedding";

export function EventDetails() {
  const addToCalendar = (type: "wedding" | "reception", title: string, date: string) => {
    openGoogleCalendar(type);
    toast.success("Opening Google Calendar...", {
      description: `${title} · ${date}`,
    });
  };

  return (
    <section className="surface-dawn relative overflow-hidden px-6 py-20">
      <Arabesque opacity={0.07} size={140} />
      <div className="relative mx-auto max-w-md">
        <SectionHeading kicker="Join the auspicious celebration" title="Event Schedule" />

        <div className="mt-10 space-y-8">
          {wedding.events.map((ev, index) => (
            <Reveal key={ev.id} delay={0.08 * (index + 1)}>
              <motion.div
                whileHover={{ y: -4 }}
                transition={{ type: "spring", stiffness: 260, damping: 22 }}
                className="gilded-card relative rounded-3xl p-7 text-center shadow-soft"
              >
                <Corners />
                
                {/* Event Category Badge */}
                <div className="mb-4">
                  <span className="inline-block rounded-full border border-gold/40 bg-gold/10 px-3.5 py-1 text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-gold">
                    {ev.badge}
                  </span>
                </div>

                <h3 className="font-display text-2xl font-bold text-foreground">
                  {ev.title}
                </h3>
                <p className="mt-1 text-xs uppercase tracking-[0.2em] text-gold">
                  {ev.subtitle}
                </p>

                <div className="my-5 h-px bg-gold/20" />

                <p className="font-display text-3xl text-gilded">{ev.dateLabel}</p>
                <p className="mt-3 flex items-center justify-center gap-2 text-sm text-muted-foreground">
                  <Clock className="h-4 w-4 text-gold shrink-0" />
                  {ev.timeLabel}
                </p>

                <div className="my-5 h-px bg-gold/20" />

                <p className="flex items-center justify-center gap-2 font-display text-xl text-foreground font-semibold">
                  <MapPin className="h-4 w-4 text-gold shrink-0" />
                  {ev.venueName}
                </p>
                <p className="mt-1.5 text-xs text-muted-foreground">
                  {ev.address}
                </p>

                {/* Actions: Add to Calendar & Get Directions */}
                <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <motion.div whileTap={{ scale: 0.97 }}>
                    <Button
                      onClick={() => addToCalendar(ev.id as "wedding" | "reception", ev.title, ev.dateLabel)}
                      className="group relative h-11 w-full overflow-hidden rounded-full bg-gold text-xs font-semibold text-gold-foreground shadow-soft hover:bg-gold/90"
                    >
                      <span
                        aria-hidden
                        className="absolute inset-y-0 -left-1/3 w-1/3 -skew-x-12 bg-gold-foreground/25 transition-all duration-700 group-hover:left-[110%]"
                      />
                      <CalendarPlus className="mr-1.5 h-4 w-4 shrink-0" />
                      Add to Calendar
                    </Button>
                  </motion.div>

                  <motion.div whileTap={{ scale: 0.97 }}>
                    <Button
                      asChild
                      variant="outline"
                      className="h-11 w-full rounded-full border-gold/45 text-xs font-semibold text-foreground hover:bg-gold/10"
                    >
                      <a href={ev.mapsUrl} target="_blank" rel="noreferrer noopener">
                        <Navigation className="mr-1.5 h-4 w-4 text-gold shrink-0" />
                        Get Directions
                      </a>
                    </Button>
                  </motion.div>
                </div>
              </motion.div>
            </Reveal>
          ))}
        </div>

        {/* Directions Quick Summary Note */}
        <Reveal delay={0.25} className="mt-8">
          <div className="rounded-2xl border border-gold/30 bg-card/60 p-5 text-center backdrop-blur-sm">
            <p className="font-display text-base text-foreground font-medium">Warm Reception</p>
            <p className="mt-1 text-xs text-muted-foreground leading-relaxed">
              We look forward to welcoming you and celebrating together. Please tap &ldquo;Get Directions&rdquo; on either event above to navigate directly via Google Maps.
            </p>
          </div>
        </Reveal>
      </div>

      <div className="absolute inset-x-0 bottom-0">
        <Skyline />
      </div>
    </section>
  );
}
