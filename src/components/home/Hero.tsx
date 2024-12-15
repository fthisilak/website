// src/components/home/Hero.tsx
'use client'
import { useEffect, useRef } from 'react'
import anime from 'animejs'
import './hero.css'

export default function Hero() {
  const gridRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const setupGrid = () => {
      if (gridRef.current) {
        const grid = gridRef.current
        grid.innerHTML = ''
        
        // Create grid elements
        for (let i = 0; i < 300; i++) {
          const el = document.createElement('div')
          el.classList.add('el')
          grid.appendChild(el)
        }

        const centerX = window.innerWidth / 2
        const centerY = window.innerHeight / 2 + 50

        anime({
          targets: '.grid-animation .el',
          scale: [
            {value: 0, duration: 0},
            {value: 1, duration: 800, easing: 'easeOutExpo'}
          ],
          translateX: function() {
            const radius = anime.random(50, Math.max(window.innerWidth, window.innerHeight))
            const angle = anime.random(0, 2 * Math.PI)
            return centerX + radius * Math.cos(angle) - centerX
          },
          translateY: function() {
            const radius = anime.random(50, Math.max(window.innerWidth, window.innerHeight))
            const angle = anime.random(0, 2 * Math.PI)
            return centerY + radius * Math.sin(angle) - centerY
          },
          opacity: {
            value: [1, 0.2],
            duration: 2000,
            easing: 'easeOutExpo'
          },
          delay: anime.stagger(10, {from: 'center'}),
          loop: true,
          direction: 'alternate',
          duration: 2000,
          easing: 'easeInOutQuad'
        })
      }
    }

    setupGrid()

    const handleResize = () => {
      setupGrid()
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <section className="min-h-screen relative overflow-hidden">
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-black to-[#00142D]" />
      
      {/* Animated Grid Container */}
      <div className="absolute inset-0">
        <div 
          ref={gridRef} 
          className="grid-animation w-full h-full"
          style={{ transform: 'translateZ(0)' }}
        />
      </div>
      
      {/* Content */}
      <div className="relative z-10 h-screen flex items-center justify-center">
        <div className="text-center px-4 bg-gradient-to-b from-transparent via-black/50 to-transparent py-20">
          <div className="typing-container">
            <h1 className="typing-text text-4xl md:text-6xl lg:text-7xl font-bold mb-6 font-display">
              <span className="gradient-text">Tasarımda</span>
              <br />
              <span className="gradient-text">Yeni Devir</span>
            </h1>
          </div>
          <p className="text-lg md:text-xl max-w-2xl mx-auto text-white-85 leading-relaxed">
            Modern ve etkileyici web deneyimleri tasarlıyor, 
            markanızın dijital varlığını güçlendiriyoruz.
          </p>
        </div>
      </div>
    </section>
  )
}