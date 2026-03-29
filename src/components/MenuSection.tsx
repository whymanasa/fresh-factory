"use client"

import { useRef } from "react"
import Image from "next/image"
import gsap from "gsap"
import { motion } from "motion/react"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useGSAP } from "@gsap/react"

gsap.registerPlugin(ScrollTrigger, useGSAP)

const MENU_DATA = [
  { name: "Mango Chilli Avo Toast",   image: "/Mango Chilli Avo Toast.png",   tagline: "Hand-smashed avocado, Alphonso mango, chilli." },
  { name: "Tropical Mango Bowl",       image: "/mango smoothie bowl.png",       tagline: "Pure mango, toasted coconut, pumpkin seeds." },
  { name: "Wild Blueberry Smoothie",   image: "/Blueberry Smoothie.png",        tagline: "Forest blueberries, Greek yogurt, honey." },
  { name: "The Odyssey Bowl",          image: "/The Odyssey Bowl.png",          tagline: "Ancient grains, spiced chickpeas, tahini." },
  { name: "Watermelon & Persian Feta", image: "/watermelon-feta combo.png",     tagline: "Compressed watermelon, feta, purple basil." },
  { name: "Vanilla Truffle Gelato",    image: "/Vanilla Truffle Gelato.png",    tagline: "Tahitian vanilla, shaved black truffle, salt." },
]

const TAPE_COLORS = [
  "rgba(240, 230, 210, 0.45)",
  "rgba(210, 230, 240, 0.45)",
  "rgba(220, 240, 210, 0.45)",
  "rgba(240, 210, 220, 0.45)",
  "rgba(230, 210, 240, 0.45)",
  "rgba(210, 235, 215, 0.45)",
]

function Tape({ color, rotation }: { color: string; rotation: number }) {
  return (
    <div
      style={{
        position: "absolute",
        top: "-15px",
        left: "50%",
        transform: `translateX(-50%) rotate(${rotation}deg)`,
        width: "120px",
        height: "30px",
        background: color,
        backdropFilter: "blur(1px)",
        boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
        zIndex: 10,
        pointerEvents: "none",
        clipPath: "polygon(2% 0%, 98% 0%, 100% 100%, 0% 100%)",
      }}
    >
      <div style={{ position: "absolute", inset: 0, opacity: 0.1, backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100'%3E%3Cfilter id='f'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8'/%3E%3C/filter%3E%3Crect width='100' height='100' filter='url(%23f)'/%3E%3C/svg%3E\")" }} />
    </div>
  )
}

interface MenuSectionProps {
  outerRef?: React.RefObject<HTMLDivElement | null>
  onWatermelonPin?: (rect: DOMRect) => void
}

export default function MenuSection({ outerRef: externalOuterRef, onWatermelonPin }: MenuSectionProps) {
  const internalOuterRef = useRef<HTMLDivElement>(null)
  const stickyRef        = useRef<HTMLDivElement>(null)
  const cardStripRef     = useRef<HTMLDivElement>(null)
  const cardRefs         = useRef<(HTMLDivElement | null)[]>([])
  const pinnedFiredRef   = useRef(false)

  // Callback ref: sets both internal and external refs on the same element
  const setOuterRef = (el: HTMLDivElement | null) => {
    (internalOuterRef as { current: HTMLDivElement | null }).current = el
    if (externalOuterRef) {
      (externalOuterRef as { current: HTMLDivElement | null }).current = el
    }
  }

  useGSAP(
    () => {
      const strip  = cardStripRef.current
      const outer  = internalOuterRef.current
      const sticky = stickyRef.current
      const cards  = cardRefs.current.filter(Boolean) as HTMLDivElement[]

      if (!strip || !outer || !sticky || cards.length === 0) return

      // x-offset at which watermelon card (index 4) is centered in the viewport
      const getXAtPin = () => {
        const cardW    = cards[0].offsetWidth
        const paddingL = window.innerWidth * 0.15
        const center4  = paddingL + (4 * (cardW + 120)) + cardW / 2
        return center4 - window.innerWidth / 2
      }

      // Card entrance — stagger up from below
      gsap.from(cards, {
        y: "120%",
        stagger: 0.08,
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sticky,
          start: "top 80%",
          once: true,
        },
      })

      // Horizontal scroll — strip moves from 0 to -xAtPin over 180vh of scroll.
      // After that, the outer container (380vh) has 100vh of pinned dwell
      // which is the tight runway for the ghost frame to peel + drop.
      gsap.to(strip, {
        x: () => -getXAtPin(),
        ease: "none",
        scrollTrigger: {
          trigger: outer,
          start: "top top",
          end: "+=180vh",
          scrub: 1.2,
          invalidateOnRefresh: true,
          onLeave: () => {
            if (!pinnedFiredRef.current) {
              pinnedFiredRef.current = true
              // Card[4] is now centered — capture its viewport rect
              onWatermelonPin?.(cards[4].getBoundingClientRect())
            }
          },
          onEnterBack: () => {
            pinnedFiredRef.current = false
          },
        },
      })
    },
    { scope: internalOuterRef }
  )

  return (
    // 280vh = 180vh horizontal scroll + 100vh sticky height (no extra ghost-frame dwell lag)
    <div ref={setOuterRef} style={{ height: "280vh", position: "relative" }}>
      {/* Sticky viewport */}
      <div
        ref={stickyRef}
        style={{
          position: "sticky",
          top: 0,
          height: "100vh",
          overflow: "hidden",
          background: "#1a1a1a",
          display: "flex",
          alignItems: "center",
        }}
      >
        {/* Dual looping marquee background */}
        <div
          aria-hidden
          style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none", userSelect: "none", zIndex: 0 }}
        >
          <div style={{ position: "absolute", top: "3%", width: "100%", whiteSpace: "nowrap" }}>
            <motion.div
              animate={{ x: ["-50%", "0%"] }}
              transition={{ duration: 30, ease: "linear", repeat: Infinity }}
              style={{ display: "inline-flex", fontFamily: "var(--font-sans)", fontSize: "clamp(80px, 14vw, 220px)", fontWeight: 800, textTransform: "uppercase", color: "rgba(255,255,255,0.08)", letterSpacing: "-0.03em" }}
            >
              <span>WHAT WE MAKE &nbsp; · &nbsp; WHAT WE MAKE &nbsp; · &nbsp; </span>
              <span>WHAT WE MAKE &nbsp; · &nbsp; WHAT WE MAKE &nbsp; · &nbsp; </span>
            </motion.div>
          </div>
          <div style={{ position: "absolute", bottom: "3%", width: "100%", whiteSpace: "nowrap" }}>
            <motion.div
              animate={{ x: ["0%", "-50%"] }}
              transition={{ duration: 35, ease: "linear", repeat: Infinity }}
              style={{ display: "inline-flex", fontFamily: "var(--font-sans)", fontSize: "clamp(80px, 14vw, 220px)", fontWeight: 800, textTransform: "uppercase", color: "rgba(255,255,255,0.08)", letterSpacing: "-0.03em" }}
            >
              <span>WHAT WE MAKE &nbsp; · &nbsp; WHAT WE MAKE &nbsp; · &nbsp; </span>
              <span>WHAT WE MAKE &nbsp; · &nbsp; WHAT WE MAKE &nbsp; · &nbsp; </span>
            </motion.div>
          </div>
        </div>

        {/* Card strip */}
        <div
          ref={cardStripRef}
          style={{
            position: "absolute",
            display: "flex",
            gap: "120px",
            paddingLeft: "15vw",
            paddingRight: "15vw",
            alignItems: "center",
            height: "100%",
            willChange: "transform",
            zIndex: 5,
          }}
        >
          {MENU_DATA.map((item, i) => (
            <div
              key={item.name}
              ref={(el) => { cardRefs.current[i] = el }}
              style={{
                flexShrink: 0,
                width: "clamp(280px, 22vw, 360px)",
                height: "clamp(420px, 58vh, 540px)",
                background: "#FFFFFF",
                borderRadius: "2px",
                boxShadow: "0 25px 50px -12px rgba(0,0,0,0.5)",
                display: "flex",
                flexDirection: "column",
                position: "relative",
                padding: "16px",
                paddingBottom: "48px",
              }}
            >
              <Tape color={TAPE_COLORS[i % TAPE_COLORS.length]} rotation={(i % 2 === 0 ? -2.5 : 2) + (i % 3) * 0.5} />
              <div style={{ position: "relative", flex: "0 0 75%", overflow: "hidden", boxShadow: "inset 0 0 10px rgba(0,0,0,0.1)" }}>
                <Image src={item.image} alt={item.name} fill style={{ objectFit: "cover" }} sizes="(max-width: 768px) 280px, 22vw" />
              </div>
              <div style={{ flex: 1, paddingTop: "24px", display: "flex", flexDirection: "column", justifyContent: "flex-start", gap: "6px" }}>
                <div style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(16px, 1.4vw, 20px)", fontWeight: 300, color: "#1A1714", lineHeight: 1.2 }}>{item.name}</div>
                <div style={{ fontFamily: "var(--font-sans)", fontSize: "11px", letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(26,23,20,0.5)", lineHeight: 1.6 }}>{item.tagline}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
