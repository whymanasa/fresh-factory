"use client"

import { useState, useRef, useEffect, useCallback } from "react"
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "motion/react"
import Image from "next/image"

const GRAIN_BG = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23n)' opacity='0.09'/%3E%3C/svg%3E")`
const DUST_BG = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='400'%3E%3Ccircle cx='40' cy='60' r='0.4' fill='%236B6560' opacity='0.22'/%3E%3Ccircle cx='180' cy='20' r='0.6' fill='%236B6560' opacity='0.16'/%3E%3Ccircle cx='320' cy='150' r='0.5' fill='%236B6560' opacity='0.18'/%3E%3Ccircle cx='90' cy='280' r='0.7' fill='%236B6560' opacity='0.14'/%3E%3Ccircle cx='380' cy='360' r='0.5' fill='%236B6560' opacity='0.2'/%3E%3C/svg%3E")`

const MENU_DATA = [
  { 
    id: "avo-toast",
    name: "Mango Chilli Avo Toast", 
    category: "Morning", 
    price: "620", 
    image: "/Mango Chilli Avo Toast.png",
    desc: "Hand-smashed avocado, sliced Alphonso mango, bird's eye chilli." 
  },
  { 
    id: "smoothie-bowl",
    name: "Tropical Mango Bowl", 
    category: "Morning", 
    price: "540", 
    image: "/mango smoothie bowl.png",
    desc: "Pure mango base, toasted coconut flakes, pumpkin seeds, mint." 
  },
  { 
    id: "blueberry",
    name: "Wild Blueberry Smoothie", 
    category: "Morning", 
    price: "480", 
    image: "/Blueberry Smoothie.png",
    desc: "Organic forest blueberries, Greek yogurt, flax seeds, honey." 
  },
  { 
    id: "odyssey",
    name: "The Odyssey Bowl", 
    category: "Midday", 
    price: "780", 
    image: "/The Odyssey Bowl.png",
    desc: "Ancient grains, spiced chickpeas, kale, tahini-lemon emulsion." 
  },
  { 
    id: "watermelon",
    name: "Watermelon & Persian Feta", 
    category: "Midday", 
    price: "580", 
    image: "/watermelon-feta combo.png",
    desc: "Compressed watermelon, crumbled feta, purple basil, lime zest." 
  },
  { 
    id: "gelato",
    name: "Vanilla Truffle Gelato", 
    category: "Evening", 
    price: "650", 
    image: "/Vanilla Truffle Gelato.png",
    desc: "Tahitian vanilla bean, shaved black truffle, honey, sea salt." 
  }
]

export default function MenuSection() {
    const [activeRowId, setActiveRowId] = useState<string | null>(null)
    const containerRef = useRef<HTMLElement>(null)
    const rowRefs = useRef<{ [key: string]: HTMLDivElement | null }>({})
    const lastMouseY = useRef<number | null>(null)

    const { scrollY } = useScroll()

    // Global Hit-Test: Evaluate which row is under the cursor
    const performHitTest = useCallback(() => {
        if (lastMouseY.current === null) return
        
        let foundId: string | null = null
        for (const item of MENU_DATA) {
            const el = rowRefs.current[item.id]
            if (el) {
                const rect = el.getBoundingClientRect()
                if (lastMouseY.current >= rect.top && lastMouseY.current <= rect.bottom) {
                    foundId = item.id
                    break
                }
            }
        }
        
        if (foundId !== activeRowId) {
            setActiveRowId(foundId)
        }
    }, [activeRowId])

    // Update mouse position on move
    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            lastMouseY.current = e.clientY
            performHitTest()
        }
        window.addEventListener("mousemove", handleMouseMove)
        return () => window.removeEventListener("mousemove", handleMouseMove)
    }, [performHitTest])

    // Force re-evaluation on scroll (Solves stationary cursor issue)
    useMotionValueEvent(scrollY, "change", () => {
        performHitTest()
    })

    return (
        <section
            ref={containerRef}
            style={{
                backgroundColor: "#F7F3EC",
                backgroundImage: `${DUST_BG}, ${GRAIN_BG}`,
                backgroundBlendMode: "multiply",
                minHeight: "100vh",
                padding: "100px 0 80px", 
                position: "relative",
                zIndex: 100
            }}
            onMouseLeave={() => setActiveRowId(null)}
        >
            <div style={{ maxWidth: "1200px", width: "90%", margin: "0 auto" }}>
                <header style={{ marginBottom: "60px" }}>
                    <span style={{ fontSize: "11px", letterSpacing: "0.4em", textTransform: "uppercase", opacity: 0.4, color: "#2A2724" }}>Current Proposals</span>
                    <h2 style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(36px, 6vw, 64px)", fontWeight: 300, color: "#2A2724", marginTop: "12px" }}>The Seasonal List</h2>
                </header>

                <div style={{ position: "relative", zIndex: 10 }}>
                    <div style={{ borderTop: "1px solid rgba(42, 39, 36, 0.15)" }}>
                        {MENU_DATA.map((item) => (
                            <MenuRow 
                                key={item.id} 
                                item={item} 
                                isActive={activeRowId === item.id}
                                setRef={(el) => (rowRefs.current[item.id] = el)}
                            />
                        ))}
                    </div>
                </div>

                <footer style={{ marginTop: "60px", display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
                    <p style={{ maxWidth: "340px", fontFamily: "var(--font-serif)", fontSize: "13px", lineHeight: 1.6, opacity: 0.5, fontStyle: "italic" }}>
                        Our daily board reflects the bounty of seasonal partners.
                    </p>
                    <nav style={{ display: "flex", gap: "40px" }}>
                        {["MORNING", "MIDDAY", "EVENING"].map(l => (
                            <span key={l} style={{ fontSize: "10px", letterSpacing: "0.2em", opacity: 0.3 }}>{l}</span>
                        ))}
                    </nav>
                </footer>
            </div>
        </section>
    )
}

function MenuRow({ item, isActive, setRef }: { item: any; isActive: boolean; setRef: (el: HTMLDivElement | null) => void }) {
    return (
        <div
            ref={setRef}
            style={{ 
                padding: "20px 0", 
                borderBottom: "1px solid rgba(42, 39, 36, 0.15)", 
                cursor: "pointer",
                position: "relative",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center"
            }}
        >
            <motion.div 
                animate={{ backgroundColor: isActive ? "rgba(255,255,255,0.4)" : "rgba(255,255,255,0)" }}
                style={{ position: "absolute", inset: 0, zIndex: 0 }} 
                transition={{ duration: 0 }}
            />

            <div style={{ flex: 1, zIndex: 2 }}>
                <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "4px" }}>
                    <span style={{ 
                        fontSize: "9px", 
                        padding: "3px 8px", 
                        border: "1px solid rgba(42, 39, 36, 0.25)", 
                        borderRadius: "50px", 
                        letterSpacing: "0.1em",
                        opacity: 0.5
                    }}>
                        {item.category.toUpperCase()}
                    </span>
                    <h3 style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(20px, 3.5vw, 34px)", fontWeight: 300, color: "#2A2724" }}>
                        {item.name}
                    </h3>
                </div>
                <p style={{ fontSize: "12px", opacity: 0.4, maxWidth: "480px", letterSpacing: "0.02em" }}>{item.desc}</p>
            </div>
            
            <div style={{ textAlign: "right", zIndex: 2 }}>
                <span style={{ fontFamily: "var(--font-sans)", fontSize: "14px", letterSpacing: "0.1em", fontWeight: 300, opacity: 0.8 }}>₹{item.price}</span>
            </div>

            <AnimatePresence>
                {isActive && (
                    <motion.div
                        initial={{ opacity: 1, scale: 1, x: "46vw" }}
                        animate={{ opacity: 1, scale: 1, x: "46vw" }}
                        exit={{ opacity: 1, scale: 1, x: "46vw" }}
                        transition={{ duration: 0 }} 
                        style={{
                            position: "absolute",
                            left: 0,
                            top: "50%",
                            y: "-50%",
                            width: "240px",
                            height: "320px",
                            pointerEvents: "none",
                            zIndex: 100,
                            border: "1px solid #000000",
                            backgroundColor: "#FFF",
                            filter: "drop-shadow(0 15px 40px rgba(0,0,0,0.15))"
                        }}
                    >
                        <div style={{ position: "relative", width: "100%", height: "100%", overflow: "hidden" }}>
                            <Image
                                src={item.image}
                                alt={item.name}
                                fill
                                sizes="240px"
                                style={{ objectFit: "cover" }}
                            />
                            <div style={{ position: "absolute", inset: 0, backgroundImage: GRAIN_BG, opacity: 0.2, mixBlendMode: "overlay" }} />
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}
