"use client";

import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

import { Hero } from "@/components/invitation/hero";
import { Couple } from "@/components/invitation/couple";
import { Countdown } from "@/components/invitation/countdown";
import { Gallery } from "@/components/invitation/gallery";
import { EventDetails } from "@/components/invitation/event-details";
import { Footer } from "@/components/invitation/footer";
import { EnvelopeIntro } from "@/components/invitation/envelope";
import { ActionDock } from "@/components/invitation/action-dock";
import { Petals, ScrollProgress } from "@/components/invitation/ambience";
import { Toaster } from "@/components/ui/sonner";
import { wedding } from "@/lib/wedding";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: wedding.meta.title },
      { name: "description", content: wedding.meta.description },
      { property: "og:title", content: wedding.meta.ogTitle },
      { property: "og:description", content: wedding.meta.ogDescription },
      { property: "og:type", content: "website" },
      { property: "og:image", content: wedding.meta.ogImage },
      { property: "og:image:secure_url", content: wedding.meta.ogImage },
      { property: "og:image:type", content: wedding.meta.ogImageType },
      { property: "og:image:alt", content: wedding.meta.ogImageAlt },
      { property: "og:site_name", content: wedding.meta.ogSiteName },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: wedding.meta.ogTitle },
      { name: "twitter:description", content: wedding.meta.ogDescription },
      { name: "twitter:image", content: wedding.meta.ogImage },
      { name: "twitter:image:alt", content: wedding.meta.ogImageAlt },
    ],
  }),
  component: Invitation,
});

function Invitation() {
  const [opened, setOpened] = useState(false);

  return (
    <>
      <EnvelopeIntro open={opened} onOpen={() => setOpened(true)} />
      <ScrollProgress />
      <Petals />
      <ActionDock enabled={opened} />

      <main className="mx-auto min-h-screen w-full max-w-2xl overflow-x-hidden bg-background">
        <Hero start={opened} />
        <Couple />
        <Countdown />
        <Gallery />
        <EventDetails />
        <Footer />
      </main>

      <Toaster position="top-center" />
    </>
  );
}
