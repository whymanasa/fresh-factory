"use client"

import Image from "next/image"
import Link from "next/link"

const GRAIN_BG = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23n)' opacity='0.09'/%3E%3C/svg%3E")`

export default function Footer() {
  return (
    <footer
      style={{
        backgroundColor: "#111111",
        backgroundImage: GRAIN_BG,
        padding: "100px 48px 60px",
        fontFamily: "var(--font-sans)",
        color: "#FFFFFF",
        position: "relative",
        zIndex: 1000,
        textAlign: "center"
      }}
    >
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        
        {/* ── Centered Logo ── */}
        <div style={{ position: "relative", width: "240px", height: "120px", margin: "0 auto 80px" }}>
          <Image
            src="/logo.png"
            alt="The Fresh Factory"
            fill
            sizes="240px"
            style={{ objectFit: "contain", filter: "brightness(0) invert(1)" }}
          />
        </div>

        {/* ── Main Footer Grid ── */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr 1fr",
            gap: "40px",
            alignItems: "start",
            marginBottom: "120px"
          }}
        >
          {/* Left: Opening Hours */}
          <div style={{ textAlign: "left" }}>
            <h4 style={labelStyle}>Opening Hours</h4>
            <div style={{ marginTop: "20px" }}>
              <p style={detailStyle}>MON TO THURS — 7AM - 4PM</p>
              <p style={detailStyle}>FRI TO SUN — 7AM - 5PM</p>
            </div>
          </div>

          {/* Center: Contact & Address */}
          <div>
            <p style={detailStyle}>NO. 42, 10TH MAIN ROAD,</p>
            <p style={detailStyle}>INDIRANAGAR, BENGALURU 560038</p>
            
            <div style={{ marginTop: "24px" }}>
              <p style={detailStyle}>HELLO@FRESHFACTORY.COM</p>
              <p style={detailStyle}>+91 80 4567 8901</p>
            </div>
          </div>

          {/* Right: Socials */}
          <div style={{ textAlign: "right" }}>
            <h4 style={labelStyle}>Socials</h4>
            <div style={{ display: "flex", justifyContent: "flex-end", gap: "24px", marginTop: "20px" }}>
              <Link href="#" style={linkStyle}>Instagram</Link>
              <Link href="#" style={linkStyle}>Facebook</Link>
            </div>
          </div>
        </div>

        {/* ── Bottom Bar ── */}
        <div
          style={{
            paddingTop: "40px",
            borderTop: "1px solid rgba(255, 255, 255, 0.1)",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <p style={{ fontSize: "10px", letterSpacing: "0.15em", opacity: 0.4, textTransform: "uppercase" }}>
            © 2026 THE FRESH FACTORY.
          </p>
          <div style={{ display: "flex", gap: "32px" }}>
            {["CHIEF", "CULTURE", "COLLECTIVE", "PRIVACY", "TERMS"].map(item => (
                <Link 
                    key={item} 
                    href="#" 
                    style={{ fontSize: "10px", letterSpacing: "0.15em", opacity: 0.4, textTransform: "uppercase", textDecoration: "none", color: "white" }}
                >
                    {item}
                </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}

const labelStyle: React.CSSProperties = {
  fontSize: "10px",
  letterSpacing: "0.25em",
  textTransform: "uppercase",
  opacity: 0.5,
  fontWeight: 500
}

const detailStyle: React.CSSProperties = {
  fontSize: "12px",
  letterSpacing: "0.12em",
  lineHeight: 2,
  opacity: 0.8,
  textTransform: "uppercase",
  margin: "4px 0"
}

const linkStyle: React.CSSProperties = {
  fontSize: "12px",
  letterSpacing: "0.12em",
  color: "inherit",
  textDecoration: "none",
  opacity: 0.8,
  borderBottom: "1px solid rgba(255,255,255,0.2)",
  paddingBottom: "4px",
  transition: "opacity 0.2s ease"
}
