"use client"

import { motion } from "motion/react"
import { useState, useEffect } from "react"
import { PAPER_STYLE } from "@/lib/design-tokens"

function TypewriterText({ strings, delay = 0 }: { strings: string[], delay?: number }) {
    const [text, setText] = useState("")
    const [index, setIndex] = useState(0)
    const [isDeleting, setIsDeleting] = useState(false)
    const [hasStarted, setHasStarted] = useState(false)

    useEffect(() => {
        let timeout: NodeJS.Timeout

        if (!hasStarted) {
            timeout = setTimeout(() => setHasStarted(true), delay)
            return () => clearTimeout(timeout)
        }

        const currentString = strings[index]

        if (isDeleting) {
            timeout = setTimeout(() => {
                setText(currentString.substring(0, text.length - 1))
                if (text.length === 1) {
                    setIsDeleting(false)
                    setIndex((prev) => (prev + 1) % strings.length)
                }
            }, 30)
        } else {
            if (text === currentString) {
                timeout = setTimeout(() => setIsDeleting(true), 4000)
            } else {
                timeout = setTimeout(() => {
                    setText(currentString.substring(0, text.length + 1))
                }, Math.random() * 40 + 40)
            }
        }

        return () => clearTimeout(timeout)
    }, [text, isDeleting, hasStarted, index, strings, delay])

    return (
        <span>
            {text}
            <motion.span
                animate={{ opacity: [1, 0] }}
                transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
            >
                |
            </motion.span>
        </span>
    )
}

export default function ScrollHero() {
    return (
        <div style={{ height: "100vh", width: "100%", position: "relative", overflow: "hidden", ...PAPER_STYLE }}>
            {/* Image Wrapper without Zigzag Edge, full viewport height */}
            <div
                style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100vh", // Full viewport height
                    zIndex: 1,
                }}
            >
                <img
                    src="/landd.png"
                    alt="The Fresh Factory storefront"
                    style={{
                        position: "absolute",
                        inset: 0,
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        objectPosition: "30% center",
                    }}
                />
            </div>

            {/* Editorial Footer on the Paper Texture at bottom of Landing Page */}
            <div
                style={{
                    position: "absolute",
                    bottom: "5vh",
                    left: "48px",
                    right: "48px",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-end",
                    zIndex: 10,
                }}
            >
                <div style={{ maxWidth: "850px" }}>
                    <div style={{
                        fontFamily: "'Courier New', Courier, monospace", // Typewriter style
                        fontSize: "clamp(18px, 2.4vw, 32px)", // Slightly bigger, yet responsive
                        lineHeight: 1.3,
                        margin: 0,
                        fontWeight: 600, // Bold
                        color: "#000000",
                        textTransform: "uppercase",
                        letterSpacing: "0.04em",
                    }}>
                        A clean eating ecosystem.<br />
                        <div style={{ whiteSpace: "nowrap", overflow: "hidden", display: "inline-block", width: "100%" }}>
                            <TypewriterText
                                strings={["Constantly seeking fresh energies!!", "Trust the process, not the processed.", "Pure fuel for peak performance."]}
                                delay={3000}
                            />
                        </div>
                    </div>
                    <div style={{
                        marginTop: "24px",
                        fontFamily: "'Courier New', Courier, monospace",
                        fontSize: "clamp(14px, 1.2vw, 18px)",
                        fontWeight: 600,
                        color: "#000000",
                        textTransform: "uppercase",
                        letterSpacing: "0.15em",
                    }}>
                        Bangalore | Indiranagar
                    </div>
                </div>
                <motion.div
                    initial={{ opacity: 0, x: 60 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 1.4, delay: 3.2, ease: [0.16, 1, 0.3, 1] }}
                >
                    <img
                        src="/logo.png"
                        alt="The Fresh Factory"
                        style={{
                            height: "clamp(75px, 9vw, 120px)", // Reduced logo size slightly
                            width: "auto",
                            filter: "brightness(0)",
                            objectFit: "contain",
                            marginBottom: "10px"
                        }}
                    />
                </motion.div>
            </div>


        </div>
    )
}
