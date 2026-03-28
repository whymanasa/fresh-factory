"use client"

import { useRef } from "react"
import gsap from "gsap"
import { useGSAP } from "@gsap/react"

gsap.registerPlugin(useGSAP)

interface LoaderProps {
  onComplete: () => void
}

export default function Loader({ onComplete }: LoaderProps) {
  const overlayRef = useRef<HTMLDivElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const fillRef = useRef<HTMLSpanElement>(null)
  const hasCompleted = useRef(false)

  useGSAP(
    () => {
      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches

      if (prefersReducedMotion) {
        onComplete()
        return
      }

      const safeComplete = () => {
        if (!hasCompleted.current) {
          hasCompleted.current = true
          onComplete()
        }
      }

      gsap
        .timeline()
        // Step 1: Sweep fill left → right
        .to(fillRef.current, {
          clipPath: "inset(0 0% 0 0)",
          duration: 1.4,
          ease: "power2.inOut",
          delay: 0.5,
        })
        // Step 2: Scale down + slide overlay up
        .to(containerRef.current, {
          y: () => {
             const targetSize = 24; 
             const targetCenterY = 28 + (targetSize / 2);
             // We want it to land at targetCenterY in the viewport.
             // The overlay is moving to yPercent: -100.
             // At the end, the parent center is at -innerHeight / 2.
             // So we need to be (innerHeight / 2 + targetCenterY) below that center.
             return window.innerHeight / 2 + targetCenterY;
          },
          scale: () => 24 / parseFloat(window.getComputedStyle(fillRef.current!).fontSize),
          duration: 1.1,
          ease: "power3.inOut",
        })
        .to(overlayRef.current, {
          yPercent: -100,
          duration: 1.1,
          ease: "power3.inOut",
          onComplete: safeComplete,
        }, "<")
    },
    { scope: overlayRef }
  )

  return (
    <div
      ref={overlayRef}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        backgroundColor: "#000000",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        ref={containerRef}
        style={{ position: "relative", display: "inline-block" }}
      >
        {/* Outline-only text */}
        <span
          style={{
            fontFamily: "var(--font-serif)",
            fontSize: "clamp(36px, 7vw, 88px)",
            fontWeight: 300,
            letterSpacing: "0.3em",
            color: "transparent",
            WebkitTextStroke: "1px #FFFFFF",
            display: "block",
            whiteSpace: "nowrap",
            userSelect: "none",
          }}
        >
          FRESH FACTORY
        </span>

        {/* Filled text revealed by clip-path */}
        <span
          ref={fillRef}
          style={{
            fontFamily: "var(--font-serif)",
            fontSize: "clamp(36px, 7vw, 88px)",
            fontWeight: 300,
            letterSpacing: "0.3em",
            color: "#FFFFFF",
            display: "block",
            whiteSpace: "nowrap",
            position: "absolute",
            top: 0,
            left: 0,
            clipPath: "inset(0 100% 0 0)",
            userSelect: "none",
          }}
        >
          FRESH FACTORY
        </span>
      </div>
    </div>
  )
}
