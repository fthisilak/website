// components/navigation/Navbar.tsx
'use client'

import { cn } from "@/lib/utils"
import { motion, useMotionValue, useSpring, useTransform, MotionValue } from "framer-motion"
import Link from "next/link"
import { useRef, useState, useEffect } from "react"
import { Home, Briefcase, Settings, Users, Mail } from "lucide-react"
import Image from "next/image"
import { usePathname } from 'next/navigation'

const navigationItems = [
  {
    title: "Ana Sayfa",
    icon: (
      <svg 
        viewBox="0 0 24 24" 
        className="h-full w-full"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path 
          d="M3 9.5L12 4L21 9.5" 
          stroke="currentColor" 
          strokeWidth="1.5" 
          strokeLinecap="round" 
          strokeLinejoin="round"
        />
        <path 
          d="M19 13V19.4C19 19.7314 18.7314 20 18.4 20H5.6C5.26863 20 5 19.7314 5 19.4V13" 
          stroke="currentColor" 
          strokeWidth="1.5" 
          strokeLinecap="round" 
          strokeLinejoin="round"
        />
        <path 
          d="M10 20V14H14V20" 
          stroke="currentColor" 
          strokeWidth="1.5" 
          strokeLinecap="round" 
          strokeLinejoin="round"
        />
      </svg>
    ),
    href: "/",
    sectionId: "hero"
  },
  {
    title: "Hizmetler",
    icon: (
      <svg 
        viewBox="0 0 24 24" 
        className="h-full w-full"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path 
          d="M9 12L11 14L15 10" 
          stroke="currentColor" 
          strokeWidth="1.5" 
          strokeLinecap="round" 
          strokeLinejoin="round"
        />
        <path 
          d="M20 6L17 3H7L4 6" 
          stroke="currentColor" 
          strokeWidth="1.5" 
          strokeLinecap="round" 
          strokeLinejoin="round"
        />
        <path 
          d="M21 6V17C21 18.1046 20.1046 19 19 19H5C3.89543 19 3 18.1046 3 17V6C3 4.89543 3.89543 4 5 4H19C20.1046 4 21 4.89543 21 6Z" 
          stroke="currentColor" 
          strokeWidth="1.5" 
          strokeLinecap="round" 
        />
      </svg>
    ),
    href: "/#services",
    sectionId: "services"
  },
  {
    title: "Portfolyo",
    icon: (
      <svg 
        viewBox="0 0 24 24" 
        className="h-full w-full"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path 
          d="M20 7H4C3.44772 7 3 7.44772 3 8V18C3 18.5523 3.44772 19 4 19H20C20.5523 19 21 18.5523 21 18V8C21 7.44772 20.5523 7 20 7Z" 
          stroke="currentColor" 
          strokeWidth="1.5"
        />
        <path 
          d="M16 7V5C16 4.44772 15.5523 4 15 4H9C8.44772 4 8 4.44772 8 5V7" 
          stroke="currentColor" 
          strokeWidth="1.5"
        />
        <path 
          d="M12 12H12.01" 
          stroke="currentColor" 
          strokeWidth="2" 
          strokeLinecap="round"
        />
      </svg>
    ),
    href: "/#portfolio",
    sectionId: "portfolio"
  },
  {
    title: "Hakkımızda",
    icon: (
      <svg 
        viewBox="0 0 24 24" 
        className="h-full w-full"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path 
          d="M16 7C16 9.20914 14.2091 11 12 11C9.79086 11 8 9.20914 8 7C8 4.79086 9.79086 3 12 3C14.2091 3 16 4.79086 16 7Z" 
          stroke="currentColor" 
          strokeWidth="1.5"
        />
        <path 
          d="M4 18C4 15.7909 6.79086 14 10 14H14C17.2091 14 20 15.7909 20 18" 
          stroke="currentColor" 
          strokeWidth="1.5" 
          strokeLinecap="round"
        />
      </svg>
    ),
    href: "/#about",
    sectionId: "about"
  },
  {
    title: "İletişim",
    icon: (
      <svg 
        viewBox="0 0 24 24" 
        className="h-full w-full"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path 
          d="M3 8L10.7666 13.8451C11.4972 14.4001 12.5028 14.4001 13.2334 13.8451L21 8M5 19H19C20.1046 19 21 18.1046 21 17V7C21 5.89543 20.1046 5 19 5H5C3.89543 5 3 5.89543 3 7V17C3 18.1046 3.89543 19 5 19Z" 
          stroke="currentColor" 
          strokeWidth="1.5" 
          strokeLinecap="round" 
          strokeLinejoin="round"
        />
      </svg>
    ),
    href: "/#contact",
    sectionId: "contact"
  }
]

const Navbar = () => {
  const mouseX = useMotionValue(Infinity)
  const [scrolled, setScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState("")
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true)
      } else {
        setScrolled(false)
      }

      // Check which section is in view
      const sections = navigationItems.map(item => item.sectionId)
      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const rect = element.getBoundingClientRect()
          if (rect.top <= 100 && rect.bottom >= 100) {
            setActiveSection(section)
            break
          }
        }
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, sectionId: string) => {
    e.preventDefault()
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
        inline: 'nearest'
      })
    }
  }

  return (
    <header className="fixed top-0 inset-x-0 z-50">
      <motion.nav
        onMouseMove={(e) => mouseX.set(e.pageX)}
        onMouseLeave={() => mouseX.set(Infinity)}
        className={cn(
          "w-full flex h-20 items-center px-8 transition-all duration-300",
          scrolled 
            ? "bg-white/80 backdrop-blur-sm dark:bg-neutral-900/80" 
            : "bg-black dark:bg-black"
        )}
      >
        <div className="max-w-7xl mx-auto w-full flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex-shrink-0">
            <div className="relative w-[60px] h-[60px]">
              <Image
                src="/images/navigation/logo.svg"
                alt="Logo"
                fill
                className="object-contain"
                priority
              />
            </div>
          </Link>

          {/* Navigation Items */}
          <div className="flex items-center gap-4">
            {navigationItems.map((item) => (
              <NavItem 
                key={item.title} 
                mouseX={mouseX} 
                {...item}
                isActive={activeSection === item.sectionId}
                isScrolled={scrolled}
                onClick={(e) => handleNavClick(e, item.sectionId)}
              />
            ))}
          </div>
        </div>
      </motion.nav>
    </header>
  )
}

interface NavItemProps {
  mouseX: MotionValue<number>
  title: string
  icon: React.ReactNode
  href: string
  isActive: boolean
  isScrolled: boolean
  onClick: (e: React.MouseEvent<HTMLAnchorElement>) => void
}

const NavItem = ({ mouseX, title, icon, href, isActive, isScrolled, onClick }: NavItemProps) => {
  const ref = useRef<HTMLDivElement>(null)
  const [hovered, setHovered] = useState(false)

  const distance = useTransform(mouseX, (val: number) => {
    const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 }
    return val - bounds.x - bounds.width / 2
  })

  const widthTransform = useTransform(distance, [-100, 0, 100], [50, 70, 50])
  const heightTransform = useTransform(distance, [-100, 0, 100], [50, 70, 50])

  const width = useSpring(widthTransform, {
    mass: 0.1,
    stiffness: 150,
    damping: 12
  })

  const height = useSpring(heightTransform, {
    mass: 0.1,
    stiffness: 150,
    damping: 12
  })

  return (
    <Link href={href} onClick={onClick}>
      <motion.div
        ref={ref}
        style={{ width, height }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className={cn(
          "relative flex aspect-square items-center justify-center rounded-xl transition-colors",
          isActive 
            ? "bg-white/20 dark:bg-white/20" 
            : "bg-white/10 dark:bg-white/10",
          !isScrolled && "bg-opacity-20 dark:bg-opacity-20"
        )}
      >
        {hovered && (
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 2 }}
            className="absolute -bottom-8 whitespace-nowrap rounded-md bg-white/10 backdrop-blur-sm px-2 py-1 text-xs text-white"
          >
            {title}
          </motion.span>
        )}
        <motion.div className="h-6 w-6 text-white">
          {icon}
        </motion.div>
      </motion.div>
    </Link>
  )
}
export default Navbar