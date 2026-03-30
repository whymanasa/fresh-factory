"use client"

import { motion, MotionValue, useScroll, useSpring, useTransform } from "motion/react"
import { useRef } from "react"

interface WaxSealProps {
  standalone?: boolean
  progress?: MotionValue<number> // Optional external progress
}

export default function WaxSeal({ standalone = true, progress }: WaxSealProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  
  // Use external progress if provided, otherwise track scroll
  const { scrollYProgress: localProgress } = useScroll({
    target: standalone ? containerRef : undefined,
    offset: ["start end", "end start"]
  })

  const activeProgress = progress || localProgress

  // Rotate based on progress — wrapped in a spring for "buttery" smoothness
  const rotateTransform = useTransform(activeProgress, [0, 1], [-20, 45])
  const rotate = useSpring(rotateTransform, { damping: 20, stiffness: 80, mass: 0.5 })

  const containerStyle: React.CSSProperties = standalone ? {
    position: "absolute",
    top: "clamp(40px, 6vw, 100px)",
    right: "clamp(40px, 8vw, 140px)",
    zIndex: 5,
    pointerEvents: "none"
  } : {
    pointerEvents: "none",
    position: "relative"
  }

  return (
    <div ref={containerRef} style={containerStyle}>
      <motion.div
        style={{
          rotate,
          width: "clamp(120px, 15vw, 190px)",
          height: "clamp(120px, 15vw, 190px)",
          filter: "drop-shadow(0 8px 24px rgba(0,0,0,0.4))",
          position: "relative",
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
        }}
      >
        <img 
          src="/wax-seal.png" 
          alt="Fresh Factory Wax Seal"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "contain",
            userSelect: "none"
          }}
        />
      </motion.div>
    </div>
  )
}
