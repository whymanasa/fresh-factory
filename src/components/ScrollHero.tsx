"use client"

import { motion } from "motion/react"
import { PAPER_STYLE } from "@/lib/design-tokens"

export default function ScrollHero() {
    return (
        <div style={{ height: "100vh", width: "100%", position: "relative", overflow: "hidden", ...PAPER_STYLE }}>
            {/* Image Wrapper with Wonky Zigzag Edge */}
            <div
                style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "60vh",
                    zIndex: 1,
                    // A highly irregular polygon to simulate a torn/rocky edge:
                    clipPath: "polygon(0 0, 100% 0, 100% 88%, 99% 96%, 97.5% 85%, 96% 93%, 94% 100%, 92.5% 87%, 91% 94%, 89% 84%, 87% 99%, 85% 90%, 83% 95%, 81% 83%, 79% 100%, 78% 92%, 76% 97%, 74% 85%, 72% 94%, 70% 82%, 68% 99%, 67% 90%, 65% 96%, 63% 86%, 61% 100%, 59% 91%, 57% 98%, 55% 84%, 53% 93%, 51% 81%, 49% 100%, 47% 92%, 45% 97%, 43% 86%, 41% 95%, 39% 83%, 37% 99%, 35% 89%, 33% 96%, 31% 85%, 29% 100%, 28% 91%, 26% 98%, 24% 84%, 22% 93%, 20% 82%, 18% 100%, 16% 89%, 14% 96%, 12% 85%, 10% 94%, 8% 81%, 6% 99%, 4% 92%, 2% 97%, 0 88%)"
                }}
            >
                <img
                    src="/landd.JPG.jpeg"
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
                {/* Dark overlay */}
                <div
                    style={{
                        position: "absolute",
                        inset: 0,
                        backgroundColor: "rgba(0, 0, 0, 0.3)", // Not so strong dark overlay
                    }}
                />
            </div>

            {/* Center Logo */}
            <div
                style={{
                    position: "absolute",
                    inset: 0,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    pointerEvents: "none",
                    zIndex: 10
                }}
            >

            </div>
        </div>
    )
}
