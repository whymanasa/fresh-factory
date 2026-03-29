"use client"

import Image from "next/image"

import { PAPER_STYLE } from "@/lib/design-tokens"

const PRODUCTS = [
  { name: "Sourdough Boule", price: "₹ 450", src: "/sourdough.png", desc: "Stone-milled, 24hr ferment." },
  { name: "Cold Pressed Olive Oil", price: "₹ 1,250", src: "/olive-oil.png", desc: "Single-origin, unfiltered." },
  { name: "Heirloom Tomato Box", price: "₹ 800", src: "/tomatoes.png", desc: "Selected varietals, farm-direct." },
  { name: "Signature Arabica", price: "₹ 1,100", src: "/coffee-beans.png", desc: "Micro-lot, medium roast." },
]

export default function RetailSection() {
  return (
    <section
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "80px 24px",
        position: "relative",
        zIndex: 100,
        ...PAPER_STYLE
      }}
    >
      <div style={{ maxWidth: "1200px", width: "100%" }}>
        {/* ── Header ── */}
        <div style={{ textAlign: "center", marginBottom: "80px" }}>
          <span
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: "10px",
              letterSpacing: "0.4em",
              color: "#2A2724",
              opacity: 0.5,
              textTransform: "uppercase",
            }}
          >
            Product / Retail
          </span>
          <h2
            style={{
              fontFamily: "var(--font-serif)",
              fontSize: "clamp(32px, 5vw, 64px)",
              fontStyle: "italic",
              fontWeight: 300,
              color: "#2A2724",
              marginTop: "16px",
            }}
          >
            Take the Factory Home.
          </h2>
          <p
            style={{
              fontFamily: "var(--font-serif)",
              fontSize: "clamp(15px, 1.2vw, 18px)",
              fontWeight: 300,
              color: "#3D3935",
              maxWidth: "500px",
              margin: "24px auto 0",
              lineHeight: 1.7,
              opacity: 0.8,
            }}
          >
            The same high-integrity ingredients we use in our kitchens—from our stone-milled flour to our single-origin oils—available for your own counter.
          </p>
        </div>

        {/* ── Grid ── */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
            gap: "40px",
            width: "100%",
          }}
        >
          {PRODUCTS.map((product) => (
            <div
              key={product.name}
              style={{
                display: "flex",
                flexDirection: "column",
                border: "1px solid rgba(42, 39, 36, 0.1)",
                padding: "24px",
                backgroundColor: "rgba(255,255,255,0.2)",
                transition: "transform 0.3s ease, box-shadow 0.3s ease",
                cursor: "pointer",
              }}
              onMouseEnter={(e) => {
                const target = e.currentTarget as HTMLDivElement
                target.style.transform = "translateY(-5px)"
                target.style.boxShadow = "0 20px 40px rgba(0,0,0,0.05)"
              }}
              onMouseLeave={(e) => {
                const target = e.currentTarget as HTMLDivElement
                target.style.transform = "translateY(0)"
                target.style.boxShadow = "none"
              }}
            >
              <div style={{ position: "relative", width: "100%", aspectRatio: "1/1", overflow: "hidden", marginBottom: "20px" }}>
                <Image
                  src={product.src}
                  alt={product.name}
                  fill
                  sizes="(max-width: 768px) 100vw, 25vw"
                  style={{ objectFit: "cover" }}
                />
              </div>
              <h3
                style={{
                  fontFamily: "var(--font-serif)",
                  fontSize: "18px",
                  color: "#2A2724",
                  marginBottom: "8px",
                }}
              >
                {product.name}
              </h3>
              <p
                style={{
                  fontFamily: "var(--font-sans)",
                  fontSize: "10px",
                  color: "#3D3935",
                  opacity: 0.6,
                  marginBottom: "16px",
                  flexGrow: 1,
                }}
              >
                {product.desc}
              </p>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  borderTop: "1px solid rgba(42, 39, 36, 0.08)",
                  paddingTop: "16px",
                }}
              >
                <span style={{ fontFamily: "var(--font-sans)", fontSize: "12px", fontWeight: 500, color: "#2A2724" }}>
                  {product.price}
                </span>
                <span
                  style={{
                    fontFamily: "var(--font-sans)",
                    fontSize: "9px",
                    letterSpacing: "0.1em",
                    color: "#2A2724",
                    textTransform: "uppercase",
                    borderBottom: "1px solid #2A2724",
                    paddingBottom: "2px",
                  }}
                >
                  Purchase
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
