"use client"

import { useEffect } from "react"
import { motion, useMotionValue, useTransform } from "motion/react"

const THRESHOLD = 300 // px of scroll = sticky zone travel

export default function ScrollHero() {
  const scrollY = useMotionValue(0)

  useEffect(() => {
    const onScroll = () => scrollY.set(window.scrollY)
    window.addEventListener("scroll", onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener("scroll", onScroll)
  }, [scrollY])

  const clipPath = useTransform(
    scrollY,
    [0, THRESHOLD],
    ["inset(55% 43% 5% 15%)", "inset(0% 0% 0% 0%)"],
    { clamp: true }
  )

  const textOpacity = useTransform(scrollY, [0, 80], [1, 0], { clamp: true })
  
  // Parallax effect: image slowly translates downwards as the user scrolls
  const imageY = useTransform(scrollY, [0, THRESHOLD * 2], ["0%", "7%"])

  return (
    // Normal-flow container — height creates the scroll travel for the sticky child
    <div style={{ height: `calc(100vh + ${THRESHOLD}px)`, position: "relative" }}>
      {/* Sticky child — stays pinned while scrollY is 0 → THRESHOLD, then scrolls away */}
      <div
        style={{
          position: "sticky",
          top: 0,
          height: "100vh",
          overflow: "hidden",
          background: "#1a1a1a",
        }}
      >
        {/* Full-bleed image with scroll-driven clip-path reveal */}
        <motion.img
          src="/landd.JPG.jpeg"
          alt="The Fresh Factory storefront"
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "30% center",
            scale: 1.15,
            y: imageY,
            clipPath,
          }}
        />

        {/* Title text — fades out on first scroll */}
        <motion.div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "flex-start",
            paddingTop: "6vh",
            pointerEvents: "none",
            opacity: textOpacity,
          }}
        >
          <div
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: "clamp(42px, 8.5vw, 160px)",
              fontWeight: 700,
              letterSpacing: "-0.03em",
              lineHeight: 1,
              textTransform: "uppercase",
              color: "#FFFFFF",
              textAlign: "center",
              userSelect: "none",
            }}
          >
            The &nbsp; Fresh &nbsp; Factory
          </div>
          <div
            style={{
              marginTop: "12px",
              fontFamily: "var(--font-sans)",
              fontSize: "13px",
              fontWeight: 400,
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.55)",
              textAlign: "center",
              maxWidth: "480px",
              userSelect: "none",
            }}
          >
            A clean eating ecosystem. Constantly seeking fresh energies!
          </div>
        </motion.div>
      </div>
    </div>
  )
}
