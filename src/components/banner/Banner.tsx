// src/components/banner/Banner.tsx
'use client'
import { useEffect, useRef, useState } from 'react'
import { useLayoutEffect } from 'react'
import gsap from 'gsap'
import './banner.css'

// Create a safe version of useLayoutEffect
const useSafeLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect

const Banner = () => {
  const bannerRef = useRef<HTMLDivElement>(null)
  const [mounted, setMounted] = useState(false)

  // Wait for mount to prevent hydration mismatch
  useEffect(() => {
    setMounted(true)
  }, [])

  useSafeLayoutEffect(() => {
    if (!mounted || !bannerRef.current) return

    const banner = bannerRef.current
    const word = banner.querySelector('.word') as HTMLElement
    if (!word) return

    const bg = banner.querySelector('.bg') as HTMLElement
    if (!bg) return

    // Clear existing content
    bg.innerHTML = ''

    // Create and setup clones
    const setupClones = () => {
      const nClones = 12
      const clones: HTMLElement[] = []

      for (let i = 0; i < nClones; i++) {
        const clone = word.cloneNode(true) as HTMLElement
        clone.classList.add('clone')
        clone.style.position = 'absolute'
        clone.style.visibility = 'visible'
        bg.appendChild(clone)
        clones.push(clone)
      }

      return clones
    }

    const clones = setupClones()

    // Setup animations after elements are ready
    gsap.context(() => {
      clones.forEach((clone, i) => {
        gsap.timeline({
          repeat: -1,
          onRepeat: () => {
            bg.appendChild(clone)
          }
        })
        .fromTo(clone,
          {
            scaleY: 0.7,
            opacity: 0
          },
          {
            duration: 4,
            y: (i % 2) ? 200 : -200,
            scaleY: 1.2,
            opacity: 0.8,
            ease: 'power3.inOut'
          }
        )
        .play(i / (clones.length * 2) * 4)
      })
    }, banner)

    // Cleanup
    return () => {
      gsap.killTweensOf(clones)
      clones.forEach(clone => clone.remove())
    }
  }, [mounted])

  return (
    <section className="banner-section" ref={bannerRef}>
      <div className="stage">
        <div className="bg"></div>
        <div className="word">SİZ SADECE HAYAL EDİN</div>
      </div>
    </section>
  )
}

export default Banner