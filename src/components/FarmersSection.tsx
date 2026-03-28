"use client"

import { useRef, useState, useEffect } from "react"
import { motion, useScroll, useTransform } from "motion/react"

const GRAIN_BG = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23n)' opacity='0.09'/%3E%3C/svg%3E")`
const DUST_BG = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='400'%3E%3Ccircle cx='40' cy='60' r='0.4' fill='%236B6560' opacity='0.22'/%3E%3Ccircle cx='180' cy='20' r='0.6' fill='%236B6560' opacity='0.16'/%3E%3Ccircle cx='320' cy='150' r='0.5' fill='%236B6560' opacity='0.18'/%3E%3Ccircle cx='90' cy='280' r='0.7' fill='%236B6560' opacity='0.14'/%3E%3Ccircle cx='380' cy='360' r='0.5' fill='%236B6560' opacity='0.2'/%3E%3C/svg%3E")`

export default function FarmersSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  })

  // ── RECALIBRATED 'ROC-SOLID' CENTER MAPPINGS ──
  // Sequence begins IMMEDIATELY and completes by 0.45.
  // Section Height: 350vh (approx 250vh of sticky dwell)

  // Part Two Title Fade (Starts closed, parts laterally)
  const leftX = useTransform(scrollYProgress, [0.05, 0.45], [-20, -700])
  const rightX = useTransform(scrollYProgress, [0.05, 0.45], [20, 700])

  // Video Wedge Reveal
  const wedgeWidth = useTransform(scrollYProgress, [0.05, 0.45], ["0px", "1300px"])
  const wedgeOpacity = useTransform(scrollYProgress, [0.05, 0.25], [0, 1])
  const wedgeScale = useTransform(scrollYProgress, [0.05, 0.45], [0.1, 1])
  
  // Viewfinder & Motivational Quote (Revealed after big)
  const uiOpacity = useTransform(scrollYProgress, [0.45, 0.65], [0, 1])
  const quoteY = useTransform(scrollYProgress, [0.45, 0.65], [20, 0])

  // Story Introduction Bridge (Fades out almost immediately)
  const bridgeOpacity = useTransform(scrollYProgress, [0, 0.12], [1, 0])

  const [time, setTime] = useState("00:04:12:08")
  useEffect(() => {
    const interval = setInterval(() => {
        const frames = Math.floor(Math.random() * 24).toString().padStart(2, '0')
        setTime(`00:04:12:${frames}`)
    }, 40)
    return () => clearInterval(interval)
  }, [])

  return (
    <section
      ref={containerRef}
      style={{
        height: "350vh", // Deep runway for cinematic stability
        position: "relative",
        backgroundColor: "#F7F3EC",
        backgroundImage: `${DUST_BG}, ${GRAIN_BG}`,
        backgroundBlendMode: "multiply",
        zIndex: 100,
      }}
    >
      <div
        style={{
          position: "sticky",
          top: 0,
          height: "100vh",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "0 24px",
          overflow: "hidden"
        }}
      >
        {/* Story Intro (Locked at the top zone) */}
        <motion.div style={{ opacity: bridgeOpacity, position: "absolute", top: "15vh", textAlign: "center", pointerEvents: "none" }}>
            <span style={{ fontSize: "11px", letterSpacing: "0.5em", textTransform: "uppercase", opacity: 0.4, color: "#2A2724" }}>Part Two: The Harvest</span>
        </motion.div>

        {/* ── FAIL-PROOF ABSOLUTE CENTER STAGE ── */}
        <div style={{ position: "relative", width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
            
            {/* Left Header Drift Segment */}
            <motion.h2 
                style={{ 
                    fontFamily: "var(--font-serif)", 
                    fontSize: "clamp(24px, 5.5vw, 64px)", 
                    fontWeight: 300, 
                    color: "#2A2724",
                    position: "absolute",
                    x: leftX,
                    left: "50%",
                    translateX: "-100%", // Anchored right, moving left
                    whiteSpace: "nowrap",
                    zIndex: 20
                }}
            >
                The hands behind
            </motion.h2>

            {/* THE CENTRAL VIDEO WEDGE */}
            <motion.div
                style={{
                    width: wedgeWidth,
                    height: "clamp(240px, 45vh, 480px)",
                    opacity: wedgeOpacity,
                    scale: wedgeScale,
                    position: "relative",
                    overflow: "hidden",
                    borderRadius: "2px",
                    boxShadow: "0 60px 140px rgba(0,0,0,0.3)",
                    backgroundColor: "#000",
                    flexShrink: 0,
                    zIndex: 10
                }}
            >
                <video
                    autoPlay
                    muted
                    loop
                    playsInline
                    style={{
                        position: "absolute",
                        inset: 0,
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        filter: "grayscale(100%) brightness(1.05) contrast(1.4)",
                    }}
                >
                    <source src="/farmer.mp4" type="video/mp4" />
                </video>

                {/* Viewfinder UI */}
                <motion.div style={{ position: "absolute", inset: 0, pointerEvents: "none", zIndex: 10, opacity: uiOpacity }}>
                    <div style={{ position: "absolute", top: 32, left: 32, width: 24, height: 24, borderLeft: "1.5px solid white", borderTop: "1.5px solid white", opacity: 0.6 }} />
                    <div style={{ position: "absolute", top: 32, right: 32, width: 24, height: 24, borderRight: "1.5px solid white", borderTop: "1.5px solid white", opacity: 0.6 }} />
                    <div style={{ position: "absolute", bottom: 32, left: 32, width: 24, height: 24, borderLeft: "1.5px solid white", borderBottom: "1.5px solid white", opacity: 0.6 }} />
                    <div style={{ position: "absolute", bottom: 32, right: 32, width: 24, height: 24, borderRight: "1.5px solid white", borderBottom: "1.5px solid white", opacity: 0.6 }} />
                    
                    <div style={{ position: "absolute", top: 36, left: 80, display: "flex", alignItems: "center", gap: "10px" }}>
                        <motion.div animate={{ opacity: [1, 0, 1] }} transition={{ repeat: Infinity, duration: 1 }} style={{ width: 8, height: 8, backgroundColor: "#FF0000", borderRadius: "50%" }} />
                        <span style={{ color: "white", fontFamily: "var(--font-sans)", fontSize: "10px", letterSpacing: "0.2em", fontWeight: 500 }}>REC</span>
                    </div>
                </motion.div>

                {/* Film Texture */}
                <div style={{ position: "absolute", inset: 0, opacity: 0.2, pointerEvents: "none", background: GRAIN_BG }} />
            </motion.div>

            {/* Right Header Drift Segment */}
            <motion.h2 
                style={{ 
                    fontFamily: "var(--font-serif)", 
                    fontSize: "clamp(24px, 5.5vw, 64px)", 
                    fontWeight: 300, 
                    color: "#2A2724",
                    position: "absolute",
                    x: rightX,
                    left: "50%",
                    translateX: "0%", // Anchored left, moving right
                    whiteSpace: "nowrap",
                    zIndex: 20
                }}
            >
                the list.
            </motion.h2>
        </div>

        {/* Narrative Quote Bottom Anchor */}
        <motion.div 
            style={{ 
                opacity: uiOpacity, 
                y: quoteY,
                position: "absolute",
                bottom: "15vh",
                width: "100%",
                maxWidth: "600px",
                textAlign: "center"
            }}
        >
            <p style={{ fontFamily: "var(--font-serif)", fontSize: "22px", fontStyle: "italic", opacity: 0.5, lineHeight: 1.4 }}>
                "None of this exists without them."
            </p>
        </motion.div>
      </div>
    </section>
  )
}
