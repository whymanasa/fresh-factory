"use client"

import { useRef, useEffect } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { ScrollToPlugin } from "gsap/ScrollToPlugin"

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin)

interface PolaroidTransitionProps {
  menuSectionRef: React.RefObject<HTMLDivElement | null>
  farmersSectionRef: React.RefObject<HTMLDivElement | null>
}

export default function PolaroidTransition({ menuSectionRef, farmersSectionRef }: PolaroidTransitionProps) {
  const frameRef = useRef<HTMLDivElement>(null)
  const tapeRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const frame = frameRef.current
    const tape = tapeRef.current
    if (!frame || !tape) return

    const triggers: ScrollTrigger[] = []

    const setup = () => {
      triggers.forEach((t) => t.kill())
      triggers.length = 0

      const menuOuter = menuSectionRef.current
      const farmersEl = farmersSectionRef.current
      if (!menuOuter || !farmersEl) return

      const vw = window.innerWidth
      const vh = window.innerHeight

      const menuTop = menuOuter.getBoundingClientRect().top + window.scrollY
      const farmersTop = farmersEl.getBoundingClientRect().top + window.scrollY

      // Card dimensions (match MenuSection)
      const cardW = Math.min(Math.max(280, vw * 0.22), 360)
      const cardH = Math.min(Math.max(420, vh * 0.58), 540)
      const pinLeft = (vw - cardW) / 2
      const pinTop = (vh - cardH) / 2

      // Final video dimensions (must match FarmersSection)
      const finalW = Math.min(vw * 0.5, 720)
      const finalH = Math.min(finalW * 1.25, vh * 0.78)
      const finalLeft = (vw - finalW) / 2
      const finalTop = (vh - finalH) / 2

      const finalBorderSide = Math.round((16 / cardW) * finalW)
      const finalBorderBottom = Math.round((48 / cardH) * finalH)

      // ── INITIAL STATE ──────────────────────────────────────────────────────
      gsap.set(frame, {
        opacity: 0, left: pinLeft, top: pinTop,
        width: cardW, height: cardH, rotation: 0,
        borderTopWidth: 16, borderLeftWidth: 16,
        borderRightWidth: 16, borderBottomWidth: 48,
      })
      gsap.set(tape, { opacity: 1 })

      // ── PHASE 1: PEEL & FALL ─────────────────────────────────────────
      // Tween-based (no scrub). Frame appears automatically the instant the
      // watermelon card centres — no extra scrolling required.
      const t1 = ScrollTrigger.create({
        trigger: menuOuter,
        start: `top+=${1.8 * vh}px top`,
        onEnter: () => {
          gsap.to(frame, {
            opacity: 1, top: finalTop, rotation: -1.5,
            duration: 0.65, ease: "power2.out", overwrite: "auto",
          })
          gsap.to(tape, { opacity: 0.4, duration: 0.4, overwrite: "auto" })
        },
        onLeaveBack: () => {
          gsap.to(frame, {
            opacity: 0, top: pinTop, rotation: 0,
            duration: 0.4, ease: "power2.in", overwrite: "auto",
          })
          gsap.to(tape, { opacity: 0, duration: 0.3, overwrite: "auto" })
        },
      })
      triggers.push(t1)

      // ── PHASE 3: GROW WITH VIDEO ───────────────────────────────────────────
      // Triggers directly on FarmersSection. 
      // FarmersSection height is 200vh, so scroll distance is 1.0vh
      const t3 = ScrollTrigger.create({
        trigger: farmersEl,
        start: `top top`,
        end: `top+=${0.30 * vh}px top`,
        scrub: true,
        onUpdate: (self) => {
          const p = self.progress
          gsap.set(frame, {
            opacity: 1,
            width: cardW + (finalW - cardW) * p,
            height: cardH + (finalH - cardH) * p,
            left: pinLeft + (finalLeft - pinLeft) * p,
            top: finalTop,
            rotation: -1.5 * (1 - p),
            borderTopWidth: 16 + (finalBorderSide - 16) * p,
            borderLeftWidth: 16 + (finalBorderSide - 16) * p,
            borderRightWidth: 16 + (finalBorderSide - 16) * p,
            borderBottomWidth: 48 + (finalBorderBottom - 48) * p,
          })
          gsap.set(tape, { opacity: (1 - p) * 0.4 + p * 0.5 })
        },
        onLeaveBack: () => {
          gsap.set(frame, {
            top: finalTop, left: pinLeft, width: cardW, height: cardH,
            borderTopWidth: 16, borderLeftWidth: 16,
            borderRightWidth: 16, borderBottomWidth: 48,
            rotation: -1.5,
          })
          gsap.set(tape, { opacity: 0.4 })
        },
      })
      triggers.push(t3)

      // ── PHASE 4: FADE OUT ──────────────────────────────────────────────────
      const t4 = ScrollTrigger.create({
        trigger: farmersEl,
        start: `top+=${0.35 * vh}px top`,
        end: `top+=${0.50 * vh}px top`,
        scrub: true,
        onUpdate: (self) => {
          const p = self.progress
          gsap.set(frame, { opacity: 1 - p })
          gsap.set(tape, { opacity: 0.5 * (1 - p) })
        },
        onLeave: () => {
          gsap.set(frame, { opacity: 0 })
          gsap.set(tape, { opacity: 0 })
        },
        onEnterBack: () => {
          gsap.set(frame, { opacity: 1 })
          gsap.set(tape, { opacity: 0.5 })
        },
      })
      triggers.push(t4)

    }

    // Run after layout is painted; re-run on ScrollTrigger refresh (resize)
    const timer = setTimeout(setup, 150)
    ScrollTrigger.addEventListener("refresh", setup)

    return () => {
      clearTimeout(timer)
      triggers.forEach((t) => t.kill())
      ScrollTrigger.removeEventListener("refresh", setup)
    }
  }, [menuSectionRef, farmersSectionRef])

  // Watermelon card tape color (index 4 in TAPE_COLORS)
  const tapeColor = "rgba(230, 210, 240, 0.45)"
  // index 4: (4 % 2 === 0 ? -2.5 : 2) + (4 % 3) * 0.5 = -2.5 + 0.5 = -2
  const tapeRotation = -2

  return (
    <>
      {/*
        Ghost polaroid frame — transparent center (background: transparent),
        white border only. Fixed-position so it travels above all page content.
      */}
      <div
        ref={frameRef}
        style={{
          position: "fixed",
          zIndex: 9998,
          pointerEvents: "none",

          /* The frame: white borders only, transparent center */
          background: "transparent",
          borderStyle: "solid",
          borderColor: "#FFFFFF",
          borderTopWidth: 16,
          borderLeftWidth: 16,
          borderRightWidth: 16,
          borderBottomWidth: 48,
          borderRadius: "2px",
          boxShadow: "0 25px 50px -12px rgba(0,0,0,0.5)",

          /* initial state — GSAP will override */
          opacity: 0,
          top: 0,
          left: 0,
          width: "clamp(280px, 22vw, 360px)",
          height: "clamp(420px, 58vh, 540px)",
        }}
      >
        {/* Tape strip — peels off with the frame */}
        <div
          ref={tapeRef}
          style={{
            position: "absolute",
            top: "-15px",
            left: "50%",
            transform: `translateX(-50%) rotate(${tapeRotation}deg)`,
            width: "120px",
            height: "30px",
            background: tapeColor,
            backdropFilter: "blur(1px)",
            boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
            zIndex: 10,
            pointerEvents: "none",
            clipPath: "polygon(2% 0%, 98% 0%, 100% 100%, 0% 100%)",
          }}
        />
      </div>
    </>
  )
}
