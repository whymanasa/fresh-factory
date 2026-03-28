"use client"

import { motion, MotionValue, useScroll, useTransform } from "motion/react"
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

  // Rotate based on progress
  const rotate = useTransform(activeProgress, [0, 1], [-20, 45])

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
          filter: "drop-shadow(0 8px 24px rgba(0,0,0,0.5))"
        }}
      >
        <svg viewBox="0 0 160 160" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <filter id="waxTexture" x="-20%" y="-20%" width="140%" height="140%">
              <feTurbulence type="fractalNoise" baseFrequency="0.6" numOctaves="3" result="noise" />
              <feDiffuseLighting in="noise" lightingColor="#921416" surfaceScale="2" result="diffuse">
                <feDistantLight azimuth="45" elevation="35" />
              </feDiffuseLighting>
              <feComposite operator="in" in="diffuse" in2="SourceGraphic" />
            </filter>

            <radialGradient id="waxGradient" cx="80" cy="80" r="70" gradientUnits="userSpaceOnUse">
              <stop offset="0.5" stopColor="#921416" />
              <stop offset="0.85" stopColor="#7A1012" />
              <stop offset="1" stopColor="#5A0B0C" />
            </radialGradient>
            
            <filter id="innerShadow">
              <feOffset dx="2" dy="2" />
              <feGaussianBlur stdDeviation="3" result="offset-blur" />
              <feComposite operator="out" in="SourceGraphic" in2="offset-blur" result="inverse" />
              <feFlood floodColor="black" floodOpacity="0.7" result="color" />
              <feComposite operator="in" in="color" in2="inverse" result="shadow" />
              <feComposite operator="over" in="shadow" in2="SourceGraphic" />
            </filter>
          </defs>

          {/* Main Wax Blob */}
          <path
            d="M80 15C45 10 8 38 12 78C10 115 32 148 78 152C120 155 155 120 152 75C148 35 115 18 80 15Z"
            fill="url(#waxGradient)"
            filter="url(#waxTexture)"
          />

          {/* Pressed Inner Area */}
          <circle cx="80" cy="80" r="50" fill="#821113" stroke="#921416" strokeWidth="1.5" filter="url(#innerShadow)" />
          
          {/* ── Embossed Leaf Logo (Bigger & Points UP) ── */}
          <g transform="translate(80, 80) scale(0.7) translate(-50, -50)" filter="url(#innerShadow)">
            <path
                d="M50 10V90M50 10C50 10 75 25 75 50C75 75 50 100 50 100M50 10C50 10 25 25 25 50C25 75 50 100 50 100M50 35C50 35 65 45 65 65C65 85 50 100 50 100M50 35C50 35 35 45 35 65C35 85 50 100 50 100M50 60C50 60 55 65 55 80C55 95 50 100 50 100M50 60C50 60 45 65 45 80C45 95 50 100 50 100"
                stroke="#5A0B0C"
                strokeWidth="7"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="#7E1113"
                opacity="1"
            />
          </g>

          {/* Highlights */}
          <path d="M35 45Q32 70 42 90" stroke="white" strokeWidth="5" opacity="0.1" strokeLinecap="round" />
          <path d="M125 115Q135 95 120 75" stroke="black" strokeWidth="5" opacity="0.1" strokeLinecap="round" />
        </svg>
      </motion.div>
    </div>
  )
}
