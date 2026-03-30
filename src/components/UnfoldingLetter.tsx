"use client"

import { PAPER_STYLE } from "@/lib/design-tokens"
import WaxSeal from "./WaxSeal"

const INK = "#1A1714"
const INK_MUTED = "#3A3530"

export default function UnfoldingLetter() {
  return (
    <section
      style={{
        position: "relative",
        minHeight: "100vh",
        padding: "140px 24px 120px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
        ...PAPER_STYLE
      }}
    >
      {/* 
        The Realistic 3D Letter Card 
        Rests inside the main paper-styled section, giving it physical depth.
      */}
      <div
        style={{
          position: "relative",
          width: "100%",
          maxWidth: "840px",
          backgroundColor: "#F4EFE6", // Cream, distinct from the pure white PAPER_STYLE
          boxShadow: "0 40px 80px -20px rgba(0,0,0,0.25), 0 10px 24px -5px rgba(0,0,0,0.08)",
          padding: "clamp(60px, 8vw, 120px) clamp(40px, 6vw, 80px)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
          zIndex: 10,
        }}
      >
        {/* Subtle Crease Lines (X-fold and cross fold) */}
        <svg
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            pointerEvents: "none",
            opacity: 0.05, // Very faint shadow line
          }}
          preserveAspectRatio="none"
          viewBox="0 0 100 100"
        >
          <line x1="0" y1="0" x2="100" y2="100" stroke="#000" strokeWidth="0.1" />
          <line x1="100" y1="0" x2="0" y2="100" stroke="#000" strokeWidth="0.1" />
          <line x1="0" y1="50" x2="100" y2="50" stroke="#000" strokeWidth="0.15" />
          <line x1="50" y1="0" x2="50" y2="100" stroke="#000" strokeWidth="0.15" />
        </svg>

        {/* Wax seal - Pinned perfectly to the top center of the card */}
        <div style={{ position: "absolute", top: "0", left: "50%", transform: "translate(-50%, -50%)", zIndex: 20 }}>
            <WaxSeal standalone={true} />
        </div>

        {/* Simplified Typography - Stacked and Centered */}
        <div style={{ marginBottom: "50px", marginTop: "10px", zIndex: 2 }}>
            <h2 style={{
                fontFamily: "var(--font-serif)",
                fontSize: "clamp(20px, 3.5vw, 36px)", // Much smaller, manageable layout
                fontWeight: 300,
                letterSpacing: "0.15em",
                color: INK,
                lineHeight: 1.4,
                textTransform: "uppercase",
                whiteSpace: "pre-line"
            }}>
                AN{"\n"}INGREDIENT-{"\n"}FIRST{"\n"}DINING{"\n"}DESTINATION
            </h2>
        </div>

        {/* Single condensed paragraph focusing on ethos */}
        <div style={{ maxWidth: "500px", marginBottom: "60px", zIndex: 2 }}>
            <p style={{
                fontFamily: "var(--font-serif)",
                fontSize: "13px",
                fontWeight: 300,
                lineHeight: 2.1,
                color: INK_MUTED,
                marginBottom: "24px",
                letterSpacing: "0.03em"
            }}>
                Where ingredient precision meets modern indulgence. The Fresh Factory transforms a market basket into a seasonal dining destination, alive from first morning light to the final cold brew.
            </p>
            <p style={{
                fontFamily: "var(--font-serif)",
                fontSize: "13px",
                fontWeight: 300,
                lineHeight: 2.1,
                color: INK_MUTED,
                letterSpacing: "0.03em"
            }}>
                Curated breakfast service, vibrant midday bowls and elevated evening sips set the tempo for an experience that feels both honest and intimate.
            </p>
        </div>

        {/* Nav Links */}
        <nav style={{ display: "flex", gap: "50px", marginBottom: "20px", zIndex: 2 }}>
            {["MENU", "RESERVATIONS", "VISIT"].map((label) => (
            <a
                key={label}
                href="#"
                style={{
                fontFamily: "var(--font-sans)",
                fontSize: "10px",
                letterSpacing: "0.3em",
                color: INK,
                textDecoration: "none",
                textTransform: "uppercase",
                paddingBottom: "8px",
                borderBottom: "1px solid rgba(26,23,20,0.3)",
                opacity: 0.8,
                transition: "opacity 0.2s"
                }}
                onMouseEnter={(e) => e.currentTarget.style.opacity = "1"}
                onMouseLeave={(e) => e.currentTarget.style.opacity = "0.8"}
            >
                {label}
            </a>
            ))}
        </nav>

        {/* Sender Address Details (Bottom Left) */}
        <div style={{
            position: "absolute",
            bottom: "clamp(20px, 4vw, 40px)",
            left: "clamp(24px, 5vw, 48px)",
            textAlign: "left",
            zIndex: 2
        }}>
            <p style={{ 
                fontFamily: "var(--font-serif)", 
                fontStyle: "italic", 
                fontSize: "11px", 
                color: INK,
                lineHeight: 1.8,
                opacity: 0.6
            }}>
                The Fresh Factory<br />
                Koramangala, Bengaluru<br />
                India — 560 034
            </p>
        </div>

        {/* Postmark Details (Bottom Right) */}
        <div style={{
            position: "absolute",
            bottom: "clamp(24px, 4.5vw, 44px)",
            right: "clamp(24px, 5vw, 48px)",
            opacity: 0.25,
            zIndex: 1,
            pointerEvents: "none"
        }}>
            <svg width="68" height="68" viewBox="0 0 68 68" fill="none">
                <circle cx="34" cy="34" r="30" stroke={INK} strokeWidth="1.2" />
                <circle cx="34" cy="34" r="23" stroke={INK} strokeWidth="0.6" />
                <path d="M15 30 Q22 26 29 30 Q36 34 43 30 Q50 26 57 30" stroke={INK} strokeWidth="1" fill="none" />
                <path d="M15 34 Q22 30 29 34 Q36 38 43 34 Q50 30 57 34" stroke={INK} strokeWidth="1" fill="none" />
                <path d="M15 38 Q22 34 29 38 Q36 42 43 38 Q50 34 57 38" stroke={INK} strokeWidth="1" fill="none" />
                <text x="34" y="18" textAnchor="middle" fill={INK} fontFamily="sans-serif" fontSize="5" letterSpacing="0.6">BENGALURU</text>
                <text x="34" y="56" textAnchor="middle" fill={INK} fontFamily="sans-serif" fontSize="4.5" letterSpacing="0.4">560001</text>
            </svg>
        </div>

      </div>
    </section>
  )
}
