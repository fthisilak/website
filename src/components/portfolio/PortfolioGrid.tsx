// src/components/portfolio/PortfolioGrid.tsx
'use client'
import { useEffect, useState } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { IconArrowLeft, IconArrowRight } from '@tabler/icons-react'
import { cn } from '@/lib/utils'
import './portfolio-grid.css'

type Portfolio = {
  title: string;
  image: string;
  link: string;
  description: string;
}

export default function PortfolioSlider() {
  const [active, setActive] = useState(0)
  const [mounted, setMounted] = useState(false)

  const portfolioItems: Portfolio[] = [
    {
      title: "Diyetisyen Uygulaması",
      image: "/images/portfolio/diyetisya.jpg",
      link: "https://www.diyetisya.com/",
      description: "Modern bir platform deneyimi"
    },
    {
      title: "Eğitim Platformu",
      image: "/images/portfolio/devrim.jpg",
      link: "https://devrim.vercel.app/",
      description: "Öğrencilerin eğitim alanında kendi alanlarını geliştirmeleri"
    },
    {
      title: "Psikolog Tanıtımı Platformu",
      image: "/images/portfolio/psy.jpg",
      link: "https://psychology-amber.vercel.app/",
      description: "Psikologların kendi yaşam alanları"
    }
  ]

  const handleNext = () => {
    setActive((prev) => (prev + 1) % portfolioItems.length)
  }

  const handlePrev = () => {
    setActive((prev) => (prev - 1 + portfolioItems.length) % portfolioItems.length)
  }

  const isActive = (index: number) => {
    return index === active;
  }

  useEffect(() => {
    setMounted(true)
    const interval = setInterval(handleNext, 7000) // Daha uzun süre
    return () => clearInterval(interval)
  }, [])

  if (!mounted) return null;

  const rotations = [-8, -5, -3, 3, 5, 8] // Sabit rotasyon değerleri

  return (
    <section className="portfolio-section py-20 bg-gradient-to-b from-black to-[#00142D]">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-16 text-white">Portfolyo</h2>
        
        <div className="relative max-w-4xl mx-auto">
          <div className="relative h-[500px] w-full">
            <AnimatePresence mode="wait">
              {portfolioItems.map((item, index) => (
                <motion.div
                  key={item.image}
                  initial={{
                    opacity: 0,
                    scale: 0.9,
                    z: -100,
                    rotate: rotations[index % rotations.length],
                  }}
                  animate={{
                    opacity: isActive(index) ? 1 : 0,
                    scale: isActive(index) ? 1 : 0.9,
                    z: isActive(index) ? 0 : -100,
                    rotate: isActive(index) ? 0 : rotations[index % rotations.length],
                    zIndex: isActive(index) ? 999 : portfolioItems.length + 2 - index,
                  }}
                  exit={{
                    opacity: 0,
                    scale: 0.9,
                    z: -100,
                    rotate: rotations[index % rotations.length],
                  }}
                  transition={{
                    duration: 1.2, // Daha uzun animasyon süresi
                    ease: [0.22, 1, 0.36, 1], // Custom easing
                  }}
                  className="absolute inset-0 origin-center"
                >
                  <a 
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full h-full"
                  >
                    <div className="relative w-full h-full rounded-3xl overflow-hidden shadow-2xl">
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        priority
                        className="object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-500">
                        <div className="absolute bottom-0 left-0 right-0 p-8">
                          <h3 className="text-2xl font-bold text-white mb-2">{item.title}</h3>
                          <p className="text-white/80">{item.description}</p>
                        </div>
                      </div>
                    </div>
                  </a>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          <div className="flex justify-center gap-4 mt-8">
            <button
              onClick={handlePrev}
              className={cn(
                "h-10 w-10 rounded-full bg-white/10 backdrop-blur-sm",
                "flex items-center justify-center group/button",
                "transition-all duration-300 hover:bg-white/20"
              )}
            >
              <IconArrowLeft className="h-5 w-5 text-white group-hover/button:scale-110 transition-transform duration-300" />
            </button>
            <button
              onClick={handleNext}
              className={cn(
                "h-10 w-10 rounded-full bg-white/10 backdrop-blur-sm",
                "flex items-center justify-center group/button",
                "transition-all duration-300 hover:bg-white/20"
              )}
            >
              <IconArrowRight className="h-5 w-5 text-white group-hover/button:scale-110 transition-transform duration-300" />
            </button>
          </div>

          <div className="flex justify-center gap-2 mt-4">
            {portfolioItems.map((_, index) => (
              <button
                key={index}
                onClick={() => setActive(index)}
                className={cn(
                  "w-2 h-2 rounded-full transition-all duration-500",
                  index === active ? "bg-white w-4" : "bg-white/30"
                )}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}