"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import gsap from "gsap"
import { useGSAP } from "@gsap/react"

gsap.registerPlugin(useGSAP)

const NAV_LINKS_LEFT = [
  { label: "MENU", href: "/menu" },
  { label: "ABOUT", href: "/about" },
]

const NAV_LINKS_RIGHT = [
  { label: "EVENTS", href: "/events" },
  { label: "CONTACT", href: "/contact" },
]

interface NavbarProps {
  visible: boolean
}

export default function Navbar({ visible }: NavbarProps) {
  const navRef = useRef<HTMLElement>(null)
  const [scrolled, setScrolled] = useState(false)
  const [showNav, setShowNav] = useState(true)
  const lastScrollY = useRef(0)

  useGSAP(
    () => {
      if (visible && navRef.current) {
        // Animate the links into view instead of the entire nav
        gsap.to(".nav-links", {
          opacity: 1,
          duration: 0.8,
          ease: "power2.out",
          stagger: 0.1,
          clearProps: "opacity", // ONLY clear opacity, not the gap or display
        })
      }
    },
    { scope: navRef, dependencies: [visible] }
  )

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY

      setScrolled(currentScrollY > 50)

      // Only apply hide logic if the user has scrolled past a small threshold
      if (currentScrollY > lastScrollY.current && currentScrollY > 100) {
        setShowNav(false)
      } else {
        setShowNav(true)
      }

      lastScrollY.current = currentScrollY
    }

    handleScroll() // run once on mount to initialize state correctly
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <nav
      ref={navRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        // The navbar itself is visible exactly when "visible" is true.
        // Before that it's invisible to avoid overlap during the sweeping loader
        opacity: visible ? 1 : 0,
        transform: `translateY(${showNav ? "0" : "-100%"})`,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "28px 48px",
        transition: "background 0.4s ease, backdrop-filter 0.4s ease, transform 0.4s cubic-bezier(0.165, 0.84, 0.44, 1)",
        background: scrolled ? "rgba(0, 0, 0, 0.7)" : "transparent",
        backdropFilter: scrolled ? "blur(20px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(255,255,255,0.05)" : "none",
        pointerEvents: showNav && visible ? "auto" : "none",
      }}
    >
      {/* Left links */}
      <div className="nav-links" style={{ display: "flex", gap: "64px", opacity: 0 }}>
        {NAV_LINKS_LEFT.map((link) => (
          <Link key={link.label} href={link.href} style={linkStyle}>
            {link.label}
          </Link>
        ))}
      </div>

      {/* Center brand */}
      <div
        style={{
          fontFamily: "var(--font-serif)",
          fontSize: "24px",
          fontWeight: 300,
          letterSpacing: "0.3em",
          color: "#FFFFFF",
          textTransform: "uppercase",
          userSelect: "none",
        }}
      >
        FRESH FACTORY
      </div>

      {/* Right links */}
      <div className="nav-links" style={{ display: "flex", gap: "64px", opacity: 0 }}>
        {NAV_LINKS_RIGHT.map((link) => (
          <Link key={link.label} href={link.href} style={linkStyle}>
            {link.label}
          </Link>
        ))}
      </div>
    </nav>
  )
}

const linkStyle: React.CSSProperties = {
  fontFamily: "var(--font-sans)",
  fontSize: "11px",
  fontWeight: 400,
  letterSpacing: "0.15em",
  color: "#FFFFFF",
  textDecoration: "none",
  textTransform: "uppercase",
  opacity: 0.8,
  transition: "opacity 0.2s ease",
}

