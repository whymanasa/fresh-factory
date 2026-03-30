"use client"

import { useRef } from "react"
import gsap from "gsap"
import { useGSAP } from "@gsap/react"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { PAPER_STYLE } from "@/lib/design-tokens"

gsap.registerPlugin(useGSAP, ScrollTrigger)

const INK = "#2A2724"

export default function LetterToCardsTransition() {
  const containerRef = useRef<HTMLDivElement>(null)
  const postmarkRef = useRef<SVGSVGElement>(null)

  useGSAP(
    () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        },
      })

      // Sweeps in from right with slight rotation
      tl.fromTo(
        postmarkRef.current,
        { x: 200, rotation: -18, opacity: 0 },
        { x: 0, rotation: 6, opacity: 1, duration: 0.55, ease: "none" },
        0
      )

      // Fades out as section leaves
      tl.to(
        postmarkRef.current,
        { opacity: 0.12, scale: 0.88, duration: 0.35, ease: "none" },
        0.62
      )
    },
    { scope: containerRef }
  )

  return (
    <section
      ref={containerRef}
      style={{
        height: "70vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        overflow: "hidden",
        ...PAPER_STYLE,
      }}
    >
      {/* Thin rule at top — visual separator from envelope section */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: "clamp(48px, 8vw, 120px)",
          right: "clamp(48px, 8vw, 120px)",
          height: "1px",
          backgroundColor: INK,
          opacity: 0.08,
        }}
      />

      {/* Large postmark — sweeps in on scroll */}
      <svg
        ref={postmarkRef}
        width="260"
        height="260"
        viewBox="0 0 260 260"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ opacity: 0 }}
      >
        {/* Outer circle */}
        <circle cx="130" cy="130" r="118" stroke={INK} strokeWidth="1.8" opacity="0.55" />
        {/* Inner circle */}
        <circle cx="130" cy="130" r="90" stroke={INK} strokeWidth="0.8" opacity="0.25" />

        {/* "FRESH FACTORY" on top arc */}
        <path id="pmTopArc" d="M 20,130 A 110,110 0 0,1 240,130" fill="none" />
        <text fill={INK} fontFamily="sans-serif" fontSize="13" letterSpacing="5.5" opacity="0.6">
          <textPath href="#pmTopArc" startOffset="8%">FRESH FACTORY</textPath>
        </text>

        {/* "EST. 2024" on bottom arc */}
        <path id="pmBottomArc" d="M 20,130 A 110,110 0 0,0 240,130" fill="none" />
        <text fill={INK} fontFamily="sans-serif" fontSize="10" letterSpacing="4" opacity="0.38">
          <textPath href="#pmBottomArc" startOffset="30%">EST. 2024</textPath>
        </text>

        {/* Cancellation wavy lines */}
        <path d="M48 108 Q68 102 88 108 Q108 114 128 108 Q148 102 168 108 Q188 114 208 108" stroke={INK} strokeWidth="1.4" fill="none" opacity="0.35" />
        <path d="M48 122 Q68 116 88 122 Q108 128 128 122 Q148 116 168 122 Q188 128 208 122" stroke={INK} strokeWidth="1.4" fill="none" opacity="0.35" />
        <path d="M48 136 Q68 130 88 136 Q108 142 128 136 Q148 130 168 136 Q188 142 208 136" stroke={INK} strokeWidth="1.4" fill="none" opacity="0.35" />
        <path d="M48 150 Q68 144 88 150 Q108 156 128 150 Q148 144 168 150 Q188 156 208 150" stroke={INK} strokeWidth="1.4" fill="none" opacity="0.35" />

        {/* City name */}
        <text x="130" y="134" textAnchor="middle" fill={INK} fontFamily="sans-serif" fontSize="10" letterSpacing="2" opacity="0.55">BENGALURU</text>
        <text x="130" y="150" textAnchor="middle" fill={INK} fontFamily="sans-serif" fontSize="8" letterSpacing="1.5" opacity="0.35">560 034</text>
      </svg>

      {/* Thin rule at bottom */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: "clamp(48px, 8vw, 120px)",
          right: "clamp(48px, 8vw, 120px)",
          height: "1px",
          backgroundColor: INK,
          opacity: 0.08,
        }}
      />
    </section>
  )
}
