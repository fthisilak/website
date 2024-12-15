// src/app/page.tsx
import Hero from '../components/home/Hero'
import ServicesSection from '../components/services/ServiceCard'
import PortfolioGrid from '../components/portfolio/PortfolioGrid'
import AboutSection from '../components/about/AboutSection'

export default function Home() {
  return (
    <main>
    <section id="hero">
      <Hero />
    </section>
    <section id="services">
      <ServicesSection />
    </section>
    <section id="portfolio">
      <PortfolioGrid />
    </section>
    <section id="about">
      <AboutSection />
    </section>
  </main>
  )
}