"use client"

import { useRef } from "react"
import Image from "next/image"
import gsap from "gsap"
import { useGSAP } from "@gsap/react"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(useGSAP, ScrollTrigger)

import { PAPER_STYLE } from "@/lib/design-tokens"
import IndiaPostStamp from "./IndiaPostStamp"

const INK = "#2A2724"
const INK_MUTED = "#3D3935"

// ── Postmark ────────────────────────────────────────────────────────────────

function Postmark() {
  return (
    <svg width="68" height="68" viewBox="0 0 68 68" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ opacity: 0.22 }}>
      <circle cx="34" cy="34" r="30" stroke={INK} strokeWidth="1.2" />
      <circle cx="34" cy="34" r="23" stroke={INK} strokeWidth="0.6" />
      <path d="M15 30 Q22 26 29 30 Q36 34 43 30 Q50 26 57 30" stroke={INK} strokeWidth="1" fill="none" />
      <path d="M15 34 Q22 30 29 34 Q36 38 43 34 Q50 30 57 34" stroke={INK} strokeWidth="1" fill="none" />
      <path d="M15 38 Q22 34 29 38 Q36 42 43 38 Q50 34 57 38" stroke={INK} strokeWidth="1" fill="none" />
      <text x="34" y="18" textAnchor="middle" fill={INK} fontFamily="sans-serif" fontSize="5" letterSpacing="0.6">BENGALURU</text>
      <text x="34" y="56" textAnchor="middle" fill={INK} fontFamily="sans-serif" fontSize="4.5" letterSpacing="0.4">560001</text>
    </svg>
  )
}

// ── Text panel (shared) ─────────────────────────────────────────────────────

function TextPanel({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        position: "relative",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: "clamp(40px,5vw,72px)",
        height: "100%",
        overflow: "hidden",
        ...PAPER_STYLE
      }}
    >
      {children}
    </div>
  )
}

// ── Space card (image left, text right) ─────────────────────────────────────

function SpaceCard() {
  return (
    <div style={{ position: "sticky", top: 0, height: "100vh", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1 }}>
      <div
        className="card-content"
        style={{
          width: "calc(100% - clamp(40px, 8vw, 120px))",
          height: "calc(100vh - clamp(40px, 8vw, 120px))",
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          boxShadow: "0 4px 24px rgba(0,0,0,0.10), 0 24px 64px rgba(0,0,0,0.14)",
          borderRadius: "2px",
          overflow: "hidden",
          backgroundColor: "#FFFFFF",
        }}
      >
        {/* Left — image */}
        <div style={{ position: "relative", height: "100%" }}>
          <Image
            src="/cafe.png"
            alt="The Fresh Factory space"
            fill
            sizes="50vw"
            style={{ objectFit: "cover" }}
          />
        </div>

        {/* Right — text */}
        <TextPanel>
          <div style={{ position: "absolute", top: "clamp(16px,2vw,28px)", right: "clamp(16px,2vw,28px)", zIndex: 1 }}>
            <IndiaPostStamp variant="space" />
          </div>

          <span style={labelStyle}>The Philosophy</span>

          <h2 style={headingStyle}>
            Trust the process.<br />Not the processed.
          </h2>

          <p style={bodyStyle}>
            We believe in complete transparency across all verticals. Our cafe and adjoining retail store highlight the very ingredients we use, offering conscious choices you can trace back to the farm.
          </p>

          <div style={{ position: "absolute", bottom: "clamp(12px,2vw,24px)", left: "clamp(12px,2vw,24px)" }}>
            <Postmark />
          </div>
        </TextPanel>
      </div>
    </div>
  )
}

// ── Menu card (text left, image right) ──────────────────────────────────────

function MenuCard() {
  const items = [
    { time: "SOURCING", dish: "Bioavailable Nutrition", note: "Ingredients that your body can easily absorb and utilize." },
    { time: "STANDARDS", dish: "Ethical Poultry", note: "Cruelty-free, consciously raised, and full of honest flavor." },
    { time: "PROMISE", dish: "Enhance, Never Mask", note: "Every dish is meticulously created to highlight its natural ingredients." },
  ]

  return (
    <div style={{ position: "sticky", top: 0, height: "100vh", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 2 }}>
      <div
        className="card-content"
        style={{
          width: "calc(100% - clamp(40px, 8vw, 120px))",
          height: "calc(100vh - clamp(40px, 8vw, 120px))",
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          boxShadow: "0 4px 24px rgba(0,0,0,0.12), 0 32px 80px rgba(0,0,0,0.18)",
          borderRadius: "2px",
          overflow: "hidden",
          backgroundColor: "#FFFFFF",
        }}
      >
        {/* Left — text */}
        <TextPanel>
          <div style={{ position: "absolute", top: "clamp(16px,2vw,28px)", right: "clamp(16px,2vw,28px)", zIndex: 1 }}>
            <IndiaPostStamp variant="menu" />
          </div>

          <span style={labelStyle}>Our Commitment</span>

          <div style={{ display: "flex", flexDirection: "column", gap: "clamp(18px,2.5vw,28px)", marginBottom: "clamp(24px,3vw,36px)" }}>
            {items.map(({ time, dish, note }) => (
              <div key={time} style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
                <span style={menuTimeStyle}>{time}</span>
                <span style={menuDishStyle}>{dish}</span>
                <span style={menuNoteStyle}>{note}</span>
              </div>
            ))}
          </div>

          <div style={{ height: "1px", backgroundColor: "#6B6560", opacity: 0.2, marginBottom: "16px" }} />
          <p style={footerStyle}>
            Serving nutrition. Every ingredient is a conscious choice.
          </p>

          <div style={{ position: "absolute", bottom: "clamp(12px,2vw,24px)", left: "clamp(12px,2vw,24px)" }}>
            <Postmark />
          </div>
        </TextPanel>

        {/* Right — image */}
        <div style={{ position: "relative", height: "100%" }}>
          <Image
            src="/bowl.png"
            alt="The Fresh Factory bakery"
            fill
            sizes="50vw"
            style={{ objectFit: "cover" }}
          />
          <div style={{ position: "absolute", inset: 0, backgroundColor: "rgba(28,22,18,0.20)" }} />
        </div>
      </div>
    </div>
  )
}

// ── Shared styles ───────────────────────────────────────────────────────────

const labelStyle: React.CSSProperties = {
  fontFamily: "var(--font-sans)",
  fontSize: "9px",
  letterSpacing: "0.24em",
  color: INK,
  textTransform: "uppercase",
  opacity: 0.4,
  marginBottom: "clamp(20px,3vw,32px)",
  display: "block",
}

const headingStyle: React.CSSProperties = {
  fontFamily: "var(--font-serif)",
  fontSize: "clamp(22px,3.2vw,42px)",
  fontWeight: 300,
  letterSpacing: "0.04em",
  color: INK,
  lineHeight: 1.2,
  marginBottom: "clamp(20px,3vw,32px)",
  fontStyle: "italic",
}

const bodyStyle: React.CSSProperties = {
  fontFamily: "var(--font-serif)",
  fontSize: "clamp(13px,1.3vw,16px)",
  fontWeight: 300,
  lineHeight: 1.85,
  color: INK_MUTED,
  letterSpacing: "0.02em",
}

const menuTimeStyle: React.CSSProperties = {
  fontFamily: "var(--font-sans)",
  fontSize: "9px",
  letterSpacing: "0.2em",
  color: INK,
  textTransform: "uppercase",
  opacity: 0.4,
}

const menuDishStyle: React.CSSProperties = {
  fontFamily: "var(--font-serif)",
  fontSize: "clamp(13px,1.4vw,17px)",
  fontStyle: "italic",
  fontWeight: 400,
  color: INK,
  lineHeight: 1.3,
}

const menuNoteStyle: React.CSSProperties = {
  fontFamily: "var(--font-serif)",
  fontSize: "clamp(11px,1.1vw,14px)",
  fontWeight: 300,
  color: INK_MUTED,
  lineHeight: 1.65,
  opacity: 0.75,
}

const footerStyle: React.CSSProperties = {
  fontFamily: "var(--font-serif)",
  fontSize: "clamp(12px,1.1vw,14px)",
  fontStyle: "italic",
  fontWeight: 300,
  color: INK_MUTED,
  opacity: 0.6,
  letterSpacing: "0.03em",
}

// ── Main component ───────────────────────────────────────────────────────────

export default function StackingCards() {
  const containerRef = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      const cards = gsap.utils.toArray<HTMLElement>(".card-content")

      cards.forEach((card, i) => {
        if (i === cards.length - 1) return // Don't animate the last card

        ScrollTrigger.create({
          trigger: card,
          start: "top top",
          endTrigger: containerRef.current,
          end: "bottom bottom",
          scrub: true,
          onUpdate: (self) => {
            gsap.set(card, {
              scale: 1 - self.progress * 0.05,
              opacity: 1 - self.progress * 0.1,
            })
          }
        })
      })
    },
    { scope: containerRef }
  )

  return (
    <div
      ref={containerRef}
      style={{
        position: "relative",
        height: "300vh",
        zIndex: 100,
        marginTop: "-150vh"
      }}
    >
      {/* 100vh spacer — transparent, lets envelope show through while SpaceCard scrolls in */}
      <div style={{ height: "100vh" }} />
      <SpaceCard />
      <MenuCard />
    </div>
  )
}
