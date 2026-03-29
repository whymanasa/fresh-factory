"use client"

import { motion } from "motion/react"
import Image from "next/image"
import { PAPER_STYLE, GRAIN_FINE } from "@/lib/design-tokens"

export default function ContactSection() {
  return (
    <section 
      style={{
        ...PAPER_STYLE, // Background floor using centralized paper style
        minHeight: "100vh",
        position: "relative",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "80px 24px"
      }}
    >
      {/* THE MAIN CONTACT CARD */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, ease: [0.19, 1, 0.22, 1] }}
        style={{
          width: "calc(100% - 80px)",
          maxWidth: "1280px",
          height: "auto",
          minHeight: "82vh",
          background: "#FFFFFF",
          borderRadius: "2px",
          boxShadow: "0 60px 140px rgba(0,0,0,0.12)",
          overflow: "hidden",
          display: "grid",
          gridTemplateColumns: "1fr 1.15fr", // Information on Left, Image on Right
          position: "relative",
        }}
      >
        {/* Left: Information/Form Block with Enhanced Character */}
        <div 
          style={{ 
            padding: "8% 10%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            position: "relative",
            backgroundColor: "#FDFDFD"
          }}
        >
          {/* Subtle Localized Paper Texture layer for Character */}
          <div style={{ position: "absolute", inset: 0, backgroundImage: GRAIN_FINE, opacity: 0.12, pointerEvents: "none" }} />

            <div style={{ position: "relative" }}>
              <h2
                style={{
                  fontFamily: "var(--font-serif)",
                  fontSize: "clamp(34px, 4vw, 58px)",
                  fontWeight: 300,
                  color: "#1A1714",
                  marginBottom: "56px",
                  lineHeight: 1.1,
                  letterSpacing: "-0.01em",
                }}
              >
                Let&apos;s start a <br/> conversation.
              </h2>

              {/* ROTATING BRAND SEAL - Relocated to the right of the heading */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 24, repeat: Infinity, ease: "linear" }}
                style={{
                  position: "absolute",
                  top: "-10px",
                  right: "-50px",
                  width: "120px",
                  height: "120px",
                  zIndex: 10,
                  pointerEvents: "none",
                  opacity: 0.9,
                  filter: "drop-shadow(0 4px 12px rgba(0,0,0,0.15))"
                }}
              >
                <Image
                  src="/wax-seal.png"
                  alt="Fresh Factory Seal"
                  fill
                  style={{ objectFit: "contain" }}
                />
              </motion.div>
            </div>

            <form style={{ display: "flex", flexDirection: "column", gap: "38px" }}>
              {[
                { label: "Your Name", placeholder: "E.g. Julian Wright" },
                { label: "Email Address", placeholder: "hello@freshfactory.com" },
              ].map((field) => (
                <div key={field.label} style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                  <label style={{ fontSize: "9px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.22em", color: "rgba(0,0,0,0.35)" }}>{field.label}</label>
                  <input 
                    type="text" 
                    placeholder={field.placeholder}
                    style={{
                      background: "transparent",
                      border: "none",
                      borderBottom: "1px solid rgba(0,0,0,0.15)",
                      paddingBottom: "10px",
                      fontSize: "15px",
                      outline: "none",
                      fontFamily: "var(--font-sans)",
                      borderRadius: 0,
                    }}
                  />
                </div>
              ))}
              
              <button
                type="submit"
                style={{
                  marginTop: "12px",
                  padding: "20px 56px",
                  background: "#1A1714",
                  color: "#FFFFFF",
                  border: "none",
                  fontFamily: "var(--font-sans)",
                  fontSize: "11px",
                  fontWeight: 600,
                  letterSpacing: "0.28em",
                  textTransform: "uppercase",
                  cursor: "pointer",
                  alignSelf: "flex-start",
                  boxShadow: "0 10px 30px rgba(0,0,0,0.15)"
                }}
              >
                Send Message
              </button>
            </form>

            {/* Character Detail: Footer HUD / Metadata */}
            <div 
              style={{ 
                marginTop: "72px",
                paddingTop: "32px",
                borderTop: "1px solid rgba(0,0,0,0.06)",
                display: "flex",
                justifyContent: "space-between",
                fontFamily: "var(--font-sans)",
                fontSize: "9px",
                letterSpacing: "0.18em",
                color: "rgba(0,0,0,0.3)",
                textTransform: "uppercase"
              }}
            >
              <div>Est. 2024 — Artisanal Sourcing</div>
              <div>40.7128° N, 74.0060° W</div>
          </div>
        </div>

        {/* Right: Cinematic Atmosphere Image */}
        <div style={{ position: "relative", height: "100%", overflow: "hidden" }}>
          <Image
            src="/contact.jpeg"
            alt="Fresh Factory Atmosphere"
            fill
            style={{ objectFit: "cover" }}
            priority
          />
          <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.1)" }} />
        </div>
      </motion.div>
    </section>
  )
}
