"use client";

import Image from "next/image";
import StackingCards from "@/components/StackingCards";
import MenuSection from "@/components/MenuSection";
import FarmersSection from "@/components/FarmersSection";
import RetailSection from "@/components/RetailSection";
import UnfoldingLetter from "@/components/UnfoldingLetter";

const GRAIN_BG = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23n)' opacity='0.09'/%3E%3C/svg%3E")`;

const DUST_BG = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='400'%3E%3Ccircle cx='40' cy='60' r='0.4' fill='%236B6560' opacity='0.22'/%3E%3Ccircle cx='180' cy='20' r='0.6' fill='%236B6560' opacity='0.16'/%3E%3Ccircle cx='320' cy='150' r='0.5' fill='%236B6560' opacity='0.18'/%3E%3Ccircle cx='90' cy='280' r='0.7' fill='%236B6560' opacity='0.14'/%3E%3Ccircle cx='380' cy='360' r='0.5' fill='%236B6560' opacity='0.2'/%3E%3Cpath d='M250,250 Q252,252 251,254' stroke='%236B6560' stroke-width='0.4' opacity='0.15' fill='none'/%3E%3Cpath d='M100,100 Q103,101 101,104' stroke='%236B6560' stroke-width='0.3' opacity='0.12' fill='none'/%3E%3C/svg%3E")`;

const INK = "#2A2724";
const INK_MUTED = "#3D3935";

export default function Home() {
  return (
    <>
      {/* ── HERO ── */}
      <main
        style={{
          minHeight: "100vh",
          position: "relative",
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "24px",
          backgroundImage: "url('/land.jpeg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* Dark vignette overlay */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(ellipse at 50% 50%, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.55) 100%)",
            pointerEvents: "none",
          }}
        />

        {/* Logo emblem */}
        <div style={{ position: "relative", width: 420, height: 420, zIndex: 1, filter: "drop-shadow(0 4px 12px rgba(0,0,0,0.2))" }}>
          <Image
            src="/logo.png"
            alt="The Fresh Factory Logo"
            fill
            sizes="420px"
            priority
            style={{ objectFit: "contain", filter: "brightness(0) invert(1)" }}
          />
        </div>
      </main>

      {/* ── CINEMATIC UNFOLDING LETTER ── */}
      <UnfoldingLetter />

      <StackingCards />

      {/* ── NEW SEQUENCE: MENU -> FARMERS -> RETAIL ── */}
      <MenuSection />
      
      <FarmersSection />
      

      <RetailSection />

    </>
  );
}
