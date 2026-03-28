"use client"

import { BentoCell, BentoGrid, ContainerScale, ContainerScroll } from "@/components/blocks/hero-gallery-scroll-animation"
import { Button } from "@/components/ui/button"

const IMAGES = [
  "/tomatoes.png",
  "/sourdough.png",
  "/coffee-beans.png",
  "/salt.png",
  "/olive-oil.png"
]

export function IngredientsGallery() {
  return (
    <ContainerScroll className="h-[400vh] bg-black relative z-[100]">
      <BentoGrid className="sticky left-0 top-0 z-0 h-screen w-full p-8 md:p-12">
        {IMAGES.map((imageUrl, index) => (
          <BentoCell
            key={index}
            className="overflow-hidden rounded-2xl shadow-2xl"
          >
            <img
              className="size-full object-cover object-center"
              src={imageUrl}
              alt="Fresh Ingredient"
            />
          </BentoCell>
        ))}
      </BentoGrid>

      <ContainerScale className="relative z-10 text-center px-4">
        <h1 className="max-w-4xl mx-auto text-6xl md:text-9xl font-serif italic tracking-tighter text-white opacity-90 uppercase">
          Our Ingredients.
        </h1>
      </ContainerScale>
    </ContainerScroll>
  )
}
