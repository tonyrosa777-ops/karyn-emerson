"use client"

import Image from "next/image"
import { useEffect, useState } from "react"
import { useReducedMotion } from "framer-motion"

interface CrossDissolveImage {
  src: string
  alt: string
}

interface CrossDissolveProps {
  images: CrossDissolveImage[]
  interval?: number
  className?: string
  priority?: boolean
  sizes?: string
}

export const CrossDissolve = ({
  images,
  interval = 8000,
  className = "",
  priority,
  sizes = "100vw",
}: CrossDissolveProps) => {
  const prefersReducedMotion = useReducedMotion()
  const [activeIndex, setActiveIndex] = useState(0)

  useEffect(() => {
    if (prefersReducedMotion) return
    if (images.length < 2) return

    const id = window.setInterval(() => {
      if (typeof document !== "undefined" && document.hidden) return
      setActiveIndex((i) => (i + 1) % images.length)
    }, interval)

    return () => {
      window.clearInterval(id)
    }
  }, [images.length, interval, prefersReducedMotion])

  const visibleImages = prefersReducedMotion ? images.slice(0, 1) : images

  return (
    <div
      className={`absolute inset-0 ${className}`}
      style={{ pointerEvents: "none" }}
      aria-hidden="true"
    >
      {visibleImages.map((image, index) => {
        const isActive = prefersReducedMotion ? index === 0 : index === activeIndex
        return (
          <div
            key={`${image.src}-${index}`}
            className="absolute inset-0"
            style={{
              opacity: isActive ? 1 : 0,
              transition: "opacity 1s ease-in-out",
            }}
          >
            <Image
              src={image.src}
              alt={image.alt}
              fill
              sizes={sizes}
              priority={index === 0 ? (priority ?? true) : false}
              className="object-cover"
            />
          </div>
        )
      })}
    </div>
  )
}

export default CrossDissolve
