"use client"

import { useRef, useEffect } from "react"
import { motion, useScroll, useTransform } from "motion/react"

import { PAPER_STYLE } from "@/lib/design-tokens"

interface FarmersSectionProps {
  containerRef?: React.RefObject<HTMLDivElement | null>
}

export default function FarmersSection({ containerRef: externalRef }: FarmersSectionProps) {
  const internalRef = useRef<HTMLDivElement>(null)

  // Merge internal and external refs onto the same element
  const setContainerRef = (el: HTMLDivElement | null) => {
    (internalRef as { current: HTMLDivElement | null }).current = el
    if (externalRef) {
      (externalRef as { current: HTMLDivElement | null }).current = el
    }
  }

  const { scrollYProgress } = useScroll({
    target: internalRef,
    offset: ["start start", "end end"],
  })

  // Text split — unchanged
  const leftX  = useTransform(scrollYProgress, [0.05, 0.45], [-20, -700])
  const rightX = useTransform(scrollYProgress, [0.05, 0.45], [20, 700])


  // Viewfinder & quote — revealed after video is fully grown
  const uiOpacity = useTransform(scrollYProgress, [0.5, 0.7], [0, 1])
  const quoteY    = useTransform(scrollYProgress, [0.5, 0.7], [20, 0])

  // Story intro bridge fades out early
  const bridgeOpacity = useTransform(scrollYProgress, [0, 0.12], [1, 0])

  // Video dimensions: grow from polaroid size → large comfortable view
  // Stored in a ref so we read window once on mount and reuse every frame
  const dimsRef = useRef({ startW: 320, startH: 480, endW: 680, endH: 510 })
  useEffect(() => {
    const update = () => {
      const vw = window.innerWidth
      const vh = window.innerHeight
      dimsRef.current = {
        startW: Math.min(Math.max(280, vw * 0.22), 360),
        startH: Math.min(Math.max(420, vh * 0.58), 540),
        endW:   Math.min(vw * 0.5, 720),
        // keep portrait-ish proportions that look like a grown polaroid
        endH:   Math.min(Math.min(vw * 0.5, 720) * 1.25, vh * 0.78),
      }
    }
    update()
    window.addEventListener("resize", update)
    return () => window.removeEventListener("resize", update)
  }, [])

  const videoWidth = useTransform(scrollYProgress, (p) => {
    const { startW, endW } = dimsRef.current
    const t = Math.max(0, Math.min(1, (p - 0.05) / 0.40))
    return `${startW + (endW - startW) * t}px`
  })

  const videoHeight = useTransform(scrollYProgress, (p) => {
    const { startH, endH } = dimsRef.current
    const t = Math.max(0, Math.min(1, (p - 0.05) / 0.40))
    return `${startH + (endH - startH) * t}px`
  })

  return (
    <section
      ref={setContainerRef}
      style={{
        height: "350vh",
        position: "relative",
        zIndex: 100,
        ...PAPER_STYLE,
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
          overflow: "hidden",
        }}
      >
        {/* Story intro */}
        <motion.div
          style={{
            opacity: bridgeOpacity,
            position: "absolute",
            top: "15vh",
            textAlign: "center",
            pointerEvents: "none",
          }}
        >
          <span style={{ fontSize: "11px", letterSpacing: "0.5em", textTransform: "uppercase", opacity: 0.4, color: "#2A2724" }}>
            Part Two: The Harvest
          </span>
        </motion.div>

        {/* Center stage */}
        <div
          style={{
            position: "relative",
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {/* Left header */}
          <motion.h2
            style={{
              fontFamily: "var(--font-serif)",
              fontSize: "clamp(24px, 5.5vw, 64px)",
              fontWeight: 300,
              color: "#2A2724",
              position: "absolute",
              x: leftX,
              left: "50%",
              translateX: "-100%",
              whiteSpace: "nowrap",
              zIndex: 20,
            }}
          >
            The hands behind
          </motion.h2>

          {/* Bare video — no polaroid wrapper.
              Starts at polaroid size, grows to a larger comfortable view.
              The ghost polaroid frame (PolaroidTransition) descends and wraps it. */}
          <motion.div
            style={{
              width: videoWidth,
              height: videoHeight,
              position: "absolute",
              left: "50%",
              top: "50%",
              x: "-50%",
              y: "-50%",
              overflow: "hidden",
              borderRadius: "2px",
              boxShadow: "0 25px 60px rgba(0,0,0,0.45)",
              backgroundColor: "#000",
              zIndex: 10,
              flexShrink: 0,
            }}
          >
            <video
              autoPlay
              muted
              loop
              playsInline
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                display: "block",
                filter: "grayscale(100%)",
              }}
            >
              <source src="/farmer.mp4" type="video/mp4" />
            </video>
          </motion.div>

          {/* Right header */}
          <motion.h2
            style={{
              fontFamily: "var(--font-serif)",
              fontSize: "clamp(24px, 5.5vw, 64px)",
              fontWeight: 300,
              color: "#2A2724",
              position: "absolute",
              x: rightX,
              left: "50%",
              translateX: "0%",
              whiteSpace: "nowrap",
              zIndex: 20,
            }}
          >
            the list.
          </motion.h2>
        </div>

        {/* Narrative quote */}
        <motion.div
          style={{
            opacity: uiOpacity,
            y: quoteY,
            position: "absolute",
            bottom: "15vh",
            width: "100%",
            maxWidth: "600px",
            textAlign: "center",
          }}
        >
          <p style={{ fontFamily: "var(--font-serif)", fontSize: "22px", fontStyle: "italic", opacity: 0.85, lineHeight: 1.4, color: "#2A2724" }}>
            "None of this exists without them."
          </p>
        </motion.div>
      </div>
    </section>
  )
}
