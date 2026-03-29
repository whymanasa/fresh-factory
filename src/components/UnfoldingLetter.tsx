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
        boxShadow: "inset 0 40px 80px rgba(0,0,0,0.055)",
        borderTop: "1px solid rgba(0,0,0,0.06)",
        padding: "100px 48px 120px",
        overflow: "hidden",
        ...PAPER_STYLE
      }}
    >
      {/* Wax seal — top-right, rotates on scroll via WaxSeal's own logic */}
      <WaxSeal standalone={true} />

      {/* Letter body */}
      <div
        style={{
          maxWidth: "680px",
          margin: "0 auto",
        }}
      >
        {/* Staggered heading */}
        <div style={{ marginBottom: "72px" }}>
          {[
            { text: "AN", indent: "-18%" },
            { text: "INGREDIENT-", indent: "2%" },
            { text: "FIRST", indent: "24%" },
            { text: "DINING", indent: "-10%" },
            { text: "DESTINATION", indent: "33%" },
          ].map(({ text, indent }) => (
            <span
              key={text}
              style={{
                fontFamily: "var(--font-serif)",
                fontSize: "clamp(34px, 6.5vw, 82px)",
                fontWeight: 300,
                letterSpacing: "0.08em",
                color: INK,
                lineHeight: 1.05,
                display: "block",
                marginLeft: indent,
                textTransform: "uppercase",
              }}
            >
              {text}
            </span>
          ))}
        </div>

        {/* Body copy */}
        <div style={{ maxWidth: "520px", marginBottom: "96px" }}>
          <p
            style={{
              fontFamily: "var(--font-serif)",
              fontSize: "clamp(15px, 1.4vw, 17px)",
              fontWeight: 300,
              lineHeight: 1.85,
              color: INK_MUTED,
              letterSpacing: "0.02em",
              marginBottom: "32px",
            }}
          >
            Where ingredient precision meets modern indulgence. The Fresh Factory
            transforms a market basket into a seasonal dining destination, alive
            from first morning light to the final cold brew.
          </p>
          <p
            style={{
              fontFamily: "var(--font-serif)",
              fontSize: "clamp(15px, 1.4vw, 17px)",
              fontWeight: 300,
              lineHeight: 1.85,
              color: INK_MUTED,
              letterSpacing: "0.02em",
            }}
          >
            Curated breakfast service, vibrant midday bowls and elevated evening
            sips set the tempo for an experience that feels both honest and intimate.
          </p>
        </div>

        {/* Nav links */}
        <nav style={{ display: "flex", gap: "56px" }}>
          {["MENU", "RESERVATIONS", "VISIT"].map((label) => (
            <a
              key={label}
              href="#"
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: "11px",
                letterSpacing: "0.22em",
                color: INK,
                textDecoration: "none",
                textTransform: "uppercase",
                paddingBottom: "10px",
                borderBottom: "1px solid rgba(26,23,20,0.45)",
                opacity: 0.8,
              }}
            >
              {label}
            </a>
          ))}
        </nav>
      </div>
    </section>
  )
}
