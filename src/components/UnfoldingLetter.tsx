"use client"

import { motion, useScroll, useTransform, useMotionValueEvent } from "motion/react"
import { useRef, useState } from "react"
import WaxSeal from "./WaxSeal"

const GRAIN_BG = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='5' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23n)' opacity='0.12'/%3E%3C/svg%3E")`
const DUST_BG = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='400'%3E%3Ccircle cx='40' cy='60' r='0.4' fill='%236B6560' opacity='0.22'/%3E%3Ccircle cx='180' cy='20' r='0.6' fill='%236B6560' opacity='0.16'/%3E%3Ccircle cx='320' cy='150' r='0.5' fill='%236B6560' opacity='0.18'/%3E%3Ccircle cx='90' cy='280' r='0.7' fill='%236B6560' opacity='0.14'/%3E%3Ccircle cx='380' cy='360' r='0.5' fill='%236B6560' opacity='0.2'/%3E%3Cpath d='M250,250 Q252,252 251,254' stroke='%236B6560' stroke-width='0.4' opacity='0.15' fill='none'/%3E%3Cpath d='M100,100 Q103,101 101,104' stroke='%236B6560' stroke-width='0.3' opacity='0.12' fill='none'/%3E%3C/svg%3E")`
const FIBER_BG = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100%25' height='100%25'%3E%3Cfilter id='f'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.04' numOctaves='5' result='n'/%3E%3CfeDisplacementMap in='SourceGraphic' in2='n' scale='2'/%3E%3C/filter%3E%3C/svg%3E")`

const INK = "#000000"
const INK_MUTED = "#111111"

// ── Refined Dried Flowers (Gypsophila) ──────────────────────────────────────

function DriedFlowers() {
    return (
      <svg width="140" height="180" viewBox="0 0 140 180" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
            <filter id="flowerTexture">
                <feTurbulence type="fractalNoise" baseFrequency="0.5" numOctaves="2" />
                <feDisplacementMap in="SourceGraphic" scale="1" />
            </filter>
        </defs>
        <g filter="url(#flowerTexture)" opacity="0.85">
            {/* Stem 1 */}
            <path d="M70 160Q65 110 45 70" stroke="#726D64" strokeWidth="1.8" strokeLinecap="round" />
            <path d="M50 90L40 75" stroke="#726D64" strokeWidth="1" />
            <circle cx="43" cy="72" r="4.5" fill="#F4EFE7" stroke="#9A9488" strokeWidth="0.5" />
            <circle cx="52" cy="65" r="3" fill="#E8E2D9" stroke="#9A9488" strokeWidth="0.5" />
            <circle cx="36" cy="58" r="3.5" fill="#DED8CC" stroke="#9A9488" strokeWidth="0.5" />
            
            {/* Stem 2 */}
            <path d="M70 160Q75 100 95 60" stroke="#726D64" strokeWidth="1.8" strokeLinecap="round" />
            <path d="M78 100L85 85" stroke="#726D64" strokeWidth="1" />
            <circle cx="98" cy="55" r="5" fill="#FBF7F0" stroke="#9A9488" strokeWidth="0.5" />
            <circle cx="85" cy="48" r="3.5" fill="#EAE4DA" stroke="#9A9488" strokeWidth="0.5" />
            <circle cx="105" cy="42" r="3.5" fill="#DED8CC" stroke="#9A9488" strokeWidth="0.5" />

            {/* Tiny dried leaf bits */}
            <path d="M62 120Q60 115 58 122" fill="#7A756D" />
            <path d="M78 130Q80 125 82 132" fill="#7A756D" />
        </g>
      </svg>
    )
}

export default function UnfoldingLetter() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [hasOpened, setHasOpened] = useState(false)
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  })

  // Binary trigger for high-reliability reveal
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    // If we've scrolled even 12% into the container, show the text.
    // 12% of 140vh scroll (for a 240vh section) is approx 16.8vh - VERY snappy.
    if (latest >= 0.12 && !hasOpened) setHasOpened(true)
    if (latest < 0.12 && hasOpened) setHasOpened(false)
  })

  // Flap Opening (0 -> 180 degrees)
  const flapRotateX = useTransform(scrollYProgress, [0.02, 0.4], [0, -180])
  const flapShadowOpacity = useTransform(scrollYProgress, [0.02, 0.2, 0.4], [0.15, 0.3, 0])
  const bodyShadowOpacity = useTransform(scrollYProgress, [0.02, 0.4], [0.2, 0])
  
  // Seal Travel Logic - ULTRA FAST arrival at 10%
  const sealX = useTransform(scrollYProgress, [0.02, 0.1], ["0%", "38vw"])
  const sealY = useTransform(scrollYProgress, [0.02, 0.1], ["0%", "-40vh"])
  const sealScale = useTransform(scrollYProgress, [0.02, 0.1], [1.25, 1])
  
  // Vertical Slide Sync
  const contentY = useTransform(scrollYProgress, [0.12, 0.22], [20, 0])

  return (
    <div 
      ref={containerRef} 
      style={{ 
        height: "240vh", 
        position: "relative",
        zIndex: 50
      }}
    >
      {/* Sticky Content Wrapper */}
      <div 
        style={{ 
          position: "sticky", 
          top: 0, 
          height: "100vh", 
          backgroundColor: "#F7F3EC",
          backgroundImage: `${DUST_BG}, ${GRAIN_BG}`,
          backgroundBlendMode: "multiply",
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          perspective: "2000px"
        }}
      >
        {/* Cardstock Overlay for real texture */}
        <div style={{ position: "absolute", inset: 0, backgroundImage: FIBER_BG, opacity: 0.05, pointerEvents: "none", zIndex: 1 }} />

        {/* ── Main content (The reveals) ── */}
        <motion.div 
            initial={false}
            animate={{ 
                opacity: hasOpened ? 1 : 0,
            }}
            transition={{ duration: 0.1, ease: "easeOut" }}
            style={{ 
                maxWidth: "720px", 
                width: "100%", 
                textAlign: "center", 
                visibility: hasOpened ? "visible" : "hidden",
                y: contentY,
                zIndex: 60,
            }}
        >
          <div style={{ marginBottom: "64px" }}>
            {[
              { text: "AN", indent: "-18%" },
              { text: "INGREDIENT-", indent: "2%" },
              { text: "FIRST", indent: "24%" },
              { text: "DINING", indent: "-10%" },
              { text: "DESTINATION", indent: "33%" },
            ].map(({ text, indent }) => (
              <span
                key={text}
                style={{
                  fontFamily: "var(--font-serif)",
                  fontSize: "clamp(34px, 6.5vw, 82px)",
                  fontWeight: 300,
                  letterSpacing: "0.08em",
                  color: INK,
                  lineHeight: 1.05,
                  display: "block",
                  marginLeft: indent,
                  textTransform: "uppercase",
                }}
              >
                {text}
              </span>
            ))}
          </div>

          <div style={{ maxWidth: "520px", margin: "0 auto 96px" }}>
            <p style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(15px, 1.4vw, 17px)", fontWeight: 300, lineHeight: 1.85, color: INK_MUTED, letterSpacing: "0.02em", marginBottom: "32px", opacity: 1 }}>
              Where ingredient precision meets modern indulgence. The Fresh Factory transforms a market basket into a seasonal dining destination, alive from first morning light to the final cold brew.
            </p>
            <p style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(15px, 1.4vw, 17px)", fontWeight: 300, lineHeight: 1.85, color: INK_MUTED, letterSpacing: "0.02em", opacity: 1 }}>
              Curated breakfast service, vibrant midday bowls and elevated evening sips set the tempo for an experience that feels both honest and intimate.
            </p>
          </div>

          <nav style={{ display: "flex", justifyContent: "center", gap: "56px" }}>
            {["MENU", "RESERVATIONS", "VISIT"].map((label) => (
              <a key={label} href="#" style={{ fontFamily: "var(--font-sans)", fontSize: "11px", letterSpacing: "0.22em", color: INK, textDecoration: "none", textTransform: "uppercase", paddingBottom: "10px", borderBottom: `1px solid rgba(0, 0, 0, 0.45)`, opacity: 0.8 }}>
                {label}
              </a>
            ))}
          </nav>
        </motion.div>

        {/* ── Envelope Flap (Triangular) ── */}
        <motion.div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "50%",
            backgroundColor: "#F2EBE1",
            backgroundImage: GRAIN_BG,
            clipPath: "polygon(0 0, 100% 0, 50% 100%)",
            transformOrigin: "top",
            rotateX: flapRotateX,
            zIndex: 10,
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "center",
            pointerEvents: useTransform(scrollYProgress, v => v > 0.4 ? "none" : "auto") as any
          }}
        >
            {/* Flap Shading */}
            <motion.div style={{ position: "absolute", inset: 0, backgroundColor: "black", opacity: flapShadowOpacity }} />
            {/* The "Crease" line at the bottom of the flap */}
            <div style={{ width: "100%", height: "2px", backgroundColor: "rgba(0,0,0,0.1)", filter: "blur(1px)" }} />
        </motion.div>

        {/* Body Crease Shadow (visible when closed) */}
        <motion.div
            style={{
                position: "absolute",
                top: "50%",
                left: 0,
                right: 0,
                height: "60px",
                background: "linear-gradient(to bottom, rgba(0,0,0,0.08), transparent)",
                zIndex: 1,
                opacity: bodyShadowOpacity
            }}
        />

        {/* ── Interactive Wax Seal & Flowers ── */}
        <motion.div
          style={{
            position: "absolute",
            zIndex: 15,
            x: sealX,
            y: sealY,
            scale: sealScale,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            filter: "drop-shadow(0 12px 32px rgba(0,0,0,0.2))"
          }}
        >
          {/* Dried Flowers Sprig (anchored to seal position) */}
          <motion.div 
            style={{ 
                position: "absolute", 
                bottom: "60px", 
                opacity: useTransform(scrollYProgress, [0, 0.4], [1, 0]),
                scale: useTransform(scrollYProgress, [0, 0.4], [1, 0.8]),
                filter: "drop-shadow(0 4px 8px rgba(0,0,0,0.1))"
            }}
          >
            <DriedFlowers />
          </motion.div>
          
          <WaxSeal standalone={false} progress={scrollYProgress} />
        </motion.div>
      </div>
    </div>
  )
}
