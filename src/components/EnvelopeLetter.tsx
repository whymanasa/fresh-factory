"use client"

import { useRef } from "react"
import gsap from "gsap"
import { useGSAP } from "@gsap/react"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { PAPER_STYLE, GRAIN_COARSE } from "@/lib/design-tokens"
import WaxSeal from "./WaxSeal"

gsap.registerPlugin(useGSAP, ScrollTrigger)

const INK = "#1A1714"
const INK_MUTED = "#3A3530"

export default function EnvelopeLetter() {
  const containerRef = useRef<HTMLDivElement>(null)
  const groupRef = useRef<HTMLDivElement>(null)
  const flapRef = useRef<HTMLDivElement>(null)
  const sealRef = useRef<HTMLDivElement>(null)
  const envelopeFrontRef = useRef<HTMLDivElement>(null)
  const letterRef = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=180vh", // Letter opens faster (180vh scroll)
          scrub: 1.2, // More responsive, less "lag"
        },
      })

      // Phase 0: Slight scale-up anticipation
      tl.fromTo(groupRef.current, { scale: 0.98 }, { scale: 1, duration: 0.25, ease: "power1.out" }, 0)

      // Phase 1 (0–38%): Flap lifts up and fades
      tl.to(flapRef.current, { rotateX: -90, duration: 0.32, ease: "power2.inOut" }, 0.05)
      tl.to(sealRef.current, { opacity: 0, scale: 0.72, duration: 0.28, ease: "power1.out" }, 0.05)
      tl.to(flapRef.current, { opacity: 0, duration: 0.1, ease: "none" }, 0.26)

      // Phase 2 (28–72%): Envelope front dissolves, letter rises from within
      tl.to(envelopeFrontRef.current, { opacity: 0, duration: 0.35, ease: "power1.in" }, 0.28)
      tl.fromTo(
        letterRef.current,
        { y: 600, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, ease: "power2.out" },
        0.30
      )

      // Phase 3 (72–92%): Group settles slightly
      tl.to(groupRef.current, { scale: 0.985, y: 5, duration: 0.25, ease: "power1.inOut" }, 0.75)

      // Scale-down as StackingCards slides in on top (slightly faster exit)
      gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "bottom 120%",
          end: "bottom 90%",
          scrub: 1.4, // Snappier exit
        },
      }).to(groupRef.current, { scale: 0.94, opacity: 0.8, ease: "power1.inOut" })
    },
    { scope: containerRef }
  )

  return (
    <div ref={containerRef} style={{ height: "250vh", position: "relative" }}>
      <div
        style={{
          position: "sticky",
          top: 0,
          height: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
          ...PAPER_STYLE,
        }}
      >
        {/* Envelope + letter group */}
        <div
          ref={groupRef}
          style={{
            position: "relative",
            width: "calc(100% - clamp(40px, 8vw, 120px))",
            height: "calc(100vh - clamp(40px, 8vw, 120px))",
            perspective: "1200px",
            overflow: "hidden",
          }}
        >
          {/* ── Layer 1: Envelope interior (kraft paper, always visible behind flap) */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: "linear-gradient(160deg, #D0C3A4 0%, #BAA882 100%)",
              borderRadius: 2,
              zIndex: 1,
              boxShadow: "0 24px 72px rgba(0,0,0,0.20), 0 4px 16px rgba(0,0,0,0.10)",
            }}
          >
            {/* V-crease lines on envelope interior */}
            <svg
              style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 0.3 }}
              viewBox="0 0 600 410"
              preserveAspectRatio="none"
            >
              <line x1="0" y1="410" x2="300" y2="200" stroke="#8A7A60" strokeWidth="1" />
              <line x1="600" y1="410" x2="300" y2="200" stroke="#8A7A60" strokeWidth="1" />
              <line x1="0" y1="0" x2="300" y2="200" stroke="#8A7A60" strokeWidth="0.8" />
              <line x1="600" y1="0" x2="300" y2="200" stroke="#8A7A60" strokeWidth="0.8" />
            </svg>
          </div>

          {/* ── Layer 2: Letter paper (slides up from inside envelope) */}
          <div
            ref={letterRef}
            style={{
              position: "absolute",
              left: 10,
              right: 10,
              top: 10,
              bottom: 10,
              zIndex: 2,
              opacity: 0,
              backgroundColor: "#F4EFE6", // Cream paper for realism
              boxShadow: "0 -8px 24px rgba(0,0,0,0.15)",
              borderRadius: 1,
              padding: "clamp(24px, 4vh, 60px) clamp(22px, 3.5vw, 52px)", // Vertical padding using vh
              overflowY: "auto", // Allow scroll but hide "ugly" bar
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              scrollbarWidth: "thin", // For Firefox
              scrollbarColor: "rgba(26,23,20,0.15) transparent", // For Firefox
            }}
            className="letter-paper-scroll"
          >
            {/* Custom scrollbar styles for Webkit (Chrome/Safari) */}
            <style>{`
              .letter-paper-scroll::-webkit-scrollbar {
                width: 4px;
              }
              .letter-paper-scroll::-webkit-scrollbar-track {
                background: transparent;
              }
              .letter-paper-scroll::-webkit-scrollbar-thumb {
                background: rgba(26,23,20,0.15);
                border-radius: 20px;
              }
              .letter-paper-scroll::-webkit-scrollbar-thumb:hover {
                background: rgba(26,23,20,0.25);
              }
            `}</style>

            {/* Subtle Crease Lines on Inner Letter */}
            <svg
              style={{
                position: "absolute",
                inset: 0,
                width: "100%",
                height: "100%",
                pointerEvents: "none",
                opacity: 0.05,
              }}
              preserveAspectRatio="none"
              viewBox="0 0 100 100"
            >
              <line x1="0" y1="0" x2="100" y2="100" stroke="#000" strokeWidth="0.1" />
              <line x1="100" y1="0" x2="0" y2="100" stroke="#000" strokeWidth="0.1" />
              <line x1="0" y1="50" x2="100" y2="50" stroke="#000" strokeWidth="0.15" />
              <line x1="50" y1="0" x2="50" y2="100" stroke="#000" strokeWidth="0.15" />
            </svg>

            {/* Heading — Significantly larger and centered for better space usage */}
            <div style={{ marginBottom: "clamp(28px, 5.5vh, 75px)", textAlign: "center", zIndex: 2 }}>
              <h1 style={{
                fontFamily: "var(--font-serif)",
                fontSize: "clamp(30px, 7.5vh, 58px)", // Reduced from 64px for refinement
                fontWeight: 300,
                letterSpacing: "0.15em",
                color: INK,
                lineHeight: 1.05, // Added tiny bit more leading
                textTransform: "uppercase",
                textWrap: "balance",
                maxWidth: "780px",
                margin: "0 auto",
              }}>
                AN INGREDIENT-FIRST<br />DINING DESTINATION
              </h1>
            </div>

            {/* Body — Larger and better spaced */}
            <div style={{ maxWidth: "620px", textAlign: "center", zIndex: 2 }}>
              <p style={{
                fontFamily: "var(--font-serif)",
                fontSize: "clamp(15.5px, 2.1vh, 20px)", // Reduced slightly from 22px
                fontWeight: 300,
                lineHeight: 1.85,
                color: INK_MUTED,
                marginBottom: "30px",
                letterSpacing: "0.03em"
              }}>
                Where ingredient precision meets modern indulgence. The Fresh Factory transforms a market basket into a seasonal dining destination, alive from first morning light to the final cold brew.
              </p>
              <p style={{
                fontFamily: "var(--font-serif)",
                fontSize: "clamp(15.5px, 2.1vh, 20px)",
                fontWeight: 300,
                lineHeight: 1.85,
                color: INK_MUTED,
                letterSpacing: "0.03em"
              }}>
                Curated breakfast service, vibrant midday bowls and elevated evening sips set the tempo for an experience that feels both honest and intimate.
              </p>
            </div>
          </div>

          {/* ── Layer 3: Envelope front face (stamp + address + border — dissolves away) */}
          <div
            ref={envelopeFrontRef}
            style={{
              position: "absolute",
              inset: 0,
              zIndex: 3,
              ...PAPER_STYLE, // Add base grain
              backgroundColor: "#D9C69D", // Darker, richer kraft/paper color
              boxShadow: "0 15px 40px rgba(0,0,0,0.25), inset 0 0 60px rgba(0,0,0,0.12)", // Stronger 3D edges
              borderRadius: 3,
              border: "1px solid rgba(26,23,20,0.25)",
              pointerEvents: "none",
            }}
          >
            {/* Additional dedicated texture overlay for the envelope specifically */}
            <div style={{
              position: "absolute",
              inset: 0,
              backgroundImage: GRAIN_COARSE,
              opacity: 0.15, // Extra grain for that "raw paper" feel
              pointerEvents: "none",
              borderRadius: "inherit"
            }} />
            {/* Recipient address */}
            <div
              style={{
                position: "absolute",
                bottom: "clamp(24px, 4vw, 40px)",
                left: "clamp(24px, 4.5vw, 48px)",
              }}
            >
              {["The Fresh Factory", "Koramangala, Bengaluru", "India — 560 034"].map((line, i) => (
                <div
                  key={line}
                  style={{
                    fontFamily: "var(--font-serif)",
                    fontSize: i === 0 ? "clamp(12px, 1.5vw, 16px)" : "clamp(10px, 1.3vw, 14px)",
                    letterSpacing: "0.08em",
                    color: INK,
                    opacity: i === 0 ? 0.9 : 0.6,
                    marginBottom: 4,
                    fontStyle: i === 0 ? "italic" : "normal",
                  }}
                >
                  {line}
                </div>
              ))}
            </div>

            {/* Postmark stamp on envelope cover */}
            <div style={{
              position: "absolute",
              top: "clamp(24px, 4.5vw, 48px)",
              right: "clamp(24px, 5vw, 48px)",
              opacity: 0.45,
            }}>
              <svg width="80" height="80" viewBox="0 0 68 68" fill="none">
                <circle cx="34" cy="34" r="30" stroke={INK} strokeWidth="1.2" />
                <circle cx="34" cy="34" r="23" stroke={INK} strokeWidth="0.6" />
                <path d="M15 30 Q22 26 29 30 Q36 34 43 30 Q50 26 57 30" stroke={INK} strokeWidth="1" fill="none" />
                <path d="M15 34 Q22 30 29 34 Q36 38 43 34 Q50 30 57 34" stroke={INK} strokeWidth="1" fill="none" />
                <path d="M15 38 Q22 34 29 38 Q36 42 43 38 Q50 34 57 38" stroke={INK} strokeWidth="1" fill="none" />
                <text x="34" y="18" textAnchor="middle" fill={INK} fontFamily="sans-serif" fontSize="5" letterSpacing="0.6">BENGALURU</text>
                <text x="34" y="56" textAnchor="middle" fill={INK} fontFamily="sans-serif" fontSize="4.5" letterSpacing="0.4">560001</text>
              </svg>
            </div>

            {/* Bottom V crease lines (decorative) */}
            <svg
              style={{
                position: "absolute",
                bottom: 0,
                left: 0,
                right: 0,
                width: "100%",
                opacity: 0.25, // Darker creases
              }}
              viewBox="0 0 600 60"
              preserveAspectRatio="none"
              height="40"
            >
              <line x1="0" y1="60" x2="300" y2="0" stroke={INK} strokeWidth="1" />
              <line x1="600" y1="60" x2="300" y2="0" stroke={INK} strokeWidth="1" />
            </svg>
          </div>

          {/* ── Layer 4: Flap (triangular, folds open in 3D) */}
          <div
            ref={flapRef}
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              height: "56%",
              zIndex: 5,
              transformOrigin: "top center",
              clipPath: "polygon(0% 0%, 100% 0%, 50% 100%)",
              ...PAPER_STYLE,
              backgroundColor: "#CDB889", // Darker kraft for the flap
              filter: "drop-shadow(0 15px 30px rgba(0,0,0,0.4)) drop-shadow(0 5px 12px rgba(0,0,0,0.25))", // Dramatic 3D shadow for the edge
            }}
          >
            {/* Wax seal at flap tip */}
            <div
              ref={sealRef}
              style={{
                position: "absolute",
                bottom: "10%",
                left: "50%",
                transform: "translateX(-50%)",
              }}
            >
              <WaxSeal standalone={false} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
