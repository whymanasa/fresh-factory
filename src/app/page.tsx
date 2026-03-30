"use client";

import { useRef } from "react";
import StackingCards from "@/components/StackingCards";
import MenuSection from "@/components/MenuSection";
import FarmersSection from "@/components/FarmersSection";
import PolaroidTransition from "@/components/PolaroidTransition";
import RetailSection from "@/components/RetailSection";
import EnvelopeLetter from "@/components/EnvelopeLetter";
import ScrollHero from "@/components/ScrollHero";
import ContactSection from "@/components/ContactSection";

export default function Home() {
  const menuSectionRef = useRef<HTMLDivElement>(null)
  const farmersSectionRef = useRef<HTMLDivElement>(null)

  return (
    <>
      <ScrollHero />

      <EnvelopeLetter />

      <StackingCards />

      {/* ── MENU + POLAROID TRANSITION + FARMERS ── */}
      <MenuSection
        outerRef={menuSectionRef}
      />

      {/*
        Ghost polaroid frame that peels off the watermelon card and
        descends to wrap around the growing farmers video.
        Renders as a fixed-position overlay — no layout impact.
      */}
      <PolaroidTransition
        menuSectionRef={menuSectionRef}
        farmersSectionRef={farmersSectionRef}
      />

      <FarmersSection containerRef={farmersSectionRef} />

      <ContactSection />
    </>
  );
}
