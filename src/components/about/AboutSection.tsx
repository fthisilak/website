// src/components/about/AboutSection.tsx
'use client'
import { useEffect, useRef } from 'react'
import Script from 'next/script'
import './about-section.css'

export default function AboutSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const cleanup = useRef<(() => void) | null>(null)

  useEffect(() => {
    let isMounted = true

    const initScene = () => {
      if (!containerRef.current || !window.THREE) return

      const THREE = window.THREE
      const scene = new THREE.Scene()
      
      // Camera setup
      const camera = new THREE.PerspectiveCamera(
        75,
        containerRef.current.clientWidth / containerRef.current.clientHeight,
        0.1,
        1000
      )
      camera.position.set(0, 0, 2.5)

      // Renderer setup
      const renderer = new THREE.WebGLRenderer({ 
        antialias: true,
        alpha: true
      })
      renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight)
      containerRef.current.appendChild(renderer.domElement)

      // Lighting
      const ambientLight = new THREE.AmbientLight(0xffffff, 0.5)
      scene.add(ambientLight)

      const pointLight = new THREE.PointLight(0xffffff, 1)
      pointLight.position.set(5, 5, 5)
      scene.add(pointLight)

      // Sphere setup
      const geometry = new THREE.SphereGeometry(1, 32, 32)
      const material = new THREE.MeshPhongMaterial({
        color: 0xffffff,
        wireframe: true,
        transparent: true,
        opacity: 0.8
      })

      const sphere = new THREE.Mesh(geometry, material)
      scene.add(sphere)

      // Animation loop
      let animationFrameId: number
      const animate = () => {
        if (!isMounted) return

        animationFrameId = requestAnimationFrame(animate)
        sphere.rotation.x += 0.001
        sphere.rotation.y += 0.001
        renderer.render(scene, camera)
      }

      // Start animation
      animate()

      // Resize handler
      const handleResize = () => {
        if (!containerRef.current) return

        const width = containerRef.current.clientWidth
        const height = containerRef.current.clientHeight

        camera.aspect = width / height
        camera.updateProjectionMatrix()
        renderer.setSize(width, height)
      }

      window.addEventListener('resize', handleResize)

      // Cleanup function
      cleanup.current = () => {
        isMounted = false
        cancelAnimationFrame(animationFrameId)
        window.removeEventListener('resize', handleResize)
        
        if (containerRef.current?.contains(renderer.domElement)) {
          containerRef.current.removeChild(renderer.domElement)
        }

        geometry.dispose()
        material.dispose()
        renderer.dispose()
      }
    }

    // Load Three.js
    const script = document.createElement('script')
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/three.js/0.160.0/three.min.js'
    script.onload = initScene
    document.body.appendChild(script)

    return () => {
      cleanup.current?.()
    }
  }, [])

  return (
    <section className="about-section">
      <div className="about-container">
        <div ref={containerRef} className="sphere-container" />
        <div className="content-container">
          <h2 className="about-title">Hakkımızda</h2>
          <p className="about-text">
            Modern ve yenilikçi tasarım yaklaşımımızla, dijital dünyada 
            markanızın benzersiz hikayesini anlatıyoruz. Her projede en son 
            teknolojileri kullanarak, etkileyici ve akılda kalıcı web deneyimleri 
            yaratıyoruz.
          </p>
          <p className="about-text">
            Yaratıcı ekibimiz ve teknik uzmanlığımızla, vizyonunuzu dijital 
            dünyada hayata geçiriyoruz. Size özel çözümler sunarak, markanızın 
            online varlığını güçlendiriyoruz.
          </p>
        </div>
      </div>
    </section>
  )
}

declare global {
  interface Window {
    THREE: any
  }
}