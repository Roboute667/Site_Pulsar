'use client'

import { Suspense, useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { PulsarCanvas } from './PulsarCanvas'
import { fadeInUp } from '@/lib/motion'

export function Hero() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 })
  const [isInHeroSection, setIsInHeroSection] = useState(false)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // For 3D canvas (normalized coordinates)
      const x = (e.clientX / window.innerWidth) * 2 - 1
      const y = -(e.clientY / window.innerHeight) * 2 + 1
      setMousePosition({ x, y })
      
      // For cursor halo (pixel coordinates) - only in hero section
      const heroSection = document.querySelector('.hero-section')
      if (heroSection) {
        const rect = heroSection.getBoundingClientRect()
        const isInHero = e.clientX >= rect.left && 
                        e.clientX <= rect.right && 
                        e.clientY >= rect.top && 
                        e.clientY <= rect.bottom
        setIsInHeroSection(isInHero)
        
        if (isInHero) {
          setCursorPosition({ x: e.clientX, y: e.clientY })
        }
      }
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return (
    <section className="hero-section relative h-screen flex flex-col overflow-hidden">
      {/* Space Background - Static */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-bg via-g4/10 to-bg" />
        <div className="absolute inset-0 bg-gradient-radial from-violet/5 via-transparent to-transparent" />
      </div>

      {/* Universe Canvas - Interactive */}
      <Suspense fallback={null}>
        <PulsarCanvas className="absolute inset-0 z-10" mousePosition={mousePosition} />
      </Suspense>

      {/* Cursor Halo Effect - Only in Hero Section */}
      {isInHeroSection && (
        <div 
          className="fixed pointer-events-none z-15"
          style={{
            left: cursorPosition.x - 50,
            top: cursorPosition.y - 50,
            width: '100px',
            height: '100px',
            background: 'radial-gradient(circle, rgba(116, 42, 169, 0.15) 0%, rgba(116, 42, 169, 0.08) 40%, transparent 70%)',
            borderRadius: '50%',
            filter: 'blur(8px)',
            transform: 'translate3d(0, 0, 0)',
            transition: 'opacity 0.2s ease-out'
          }}
        />
      )}

      {/* Main Content Container */}
      <div className="relative z-20 flex-1 flex flex-col justify-between py-20">
        
        {/* Content Section - Centered */}
        <div className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl text-center space-y-6">
            {/* Main Headline */}
            <motion.div
              variants={fadeInUp}
              initial="initial"
              animate="animate"
              className="space-y-4"
            >
              <motion.h1 
                className="text-2xl sm:text-3xl lg:text-4xl font-tight font-bold leading-tight"
                variants={fadeInUp}
              >
                Alternative Multi-Strategy
                <br />
                <span className="gradient-text">Investment Fund</span>
              </motion.h1>
              
              <motion.p 
                className="text-base sm:text-lg text-muted max-w-2xl mx-auto leading-relaxed"
                variants={fadeInUp}
              >
                Robust, agile, and innovative approach to alternative investment.
                <br />Performing across all market conditions.
              </motion.p>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div 
              className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-2"
              variants={fadeInUp}
              initial="initial"
              animate="animate"
              transition={{ delay: 0.6, duration: 0.8 }}
            >
              <button 
                onClick={() => document.getElementById('strategies')?.scrollIntoView({ behavior: 'smooth' })}
                className="px-6 py-3 bg-gradient-violet text-white font-medium text-base rounded-lg hover:opacity-90 hover:scale-105 transition-all duration-300 shadow-xl shadow-violet/25"
              >
                Learn More
              </button>
            </motion.div>

            {/* FCA Badge */}
            <motion.div 
              className="inline-flex items-center space-x-3 text-sm text-muted pt-3"
              variants={fadeInUp}
              initial="initial"
              animate="animate"
              transition={{ delay: 0.9, duration: 0.8 }}
            >
              <span className="font-medium">FCA-regulated in London</span>
            </motion.div>
          </div>
        </div>

        {/* Scroll Indicator - Fixed Bottom */}
        <motion.div
          className="flex justify-center pb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.5, duration: 0.8 }}
        >
          <div className="flex flex-col items-center space-y-2">
            <span className="text-xs text-muted font-medium tracking-wide">Scroll to explore</span>
            <div className="w-5 h-8 rounded-full flex justify-center bg-bg/10 backdrop-blur-sm shadow-lg shadow-violet/10">
              <motion.div
                className="w-1 h-2 bg-gradient-violet rounded-full mt-1.5"
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              />
            </div>
          </div>
        </motion.div>
        
      </div>
    </section>
  )
}
