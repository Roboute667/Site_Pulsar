'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'

const navItems = [
  { href: '/about', label: 'About' },
  { href: '/team', label: 'Team' },
  { href: '/faq', label: 'FAQ' },
  { href: '/disclosures', label: 'Disclosures' },
]

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <motion.nav
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        isScrolled
          ? 'bg-bg/90 backdrop-blur-md'
          : 'bg-transparent'
      )}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.6, -0.05, 0.01, 0.99] }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3">
            <div className="relative w-10 h-10 flex items-center justify-center">
              <Image
                src="/images/logo.png"
                alt="Pulsar Logo"
                width={40}
                height={40}
                className="drop-shadow-lg object-contain"
                priority
              />
            </div>
            <span className="font-tight font-semibold text-lg">Pulsar</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="font-medium text-muted hover:text-fg transition-colors duration-200 relative group"
                style={{ fontSize: '16px' }}
              >
                {item.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-violet transition-all duration-200 group-hover:w-full" />
              </Link>
            ))}
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden flex flex-col justify-center items-center w-8 h-8 relative"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <motion.span
              className="w-5 h-0.5 bg-fg absolute"
              animate={
                isMobileMenuOpen
                  ? { rotate: 45, y: 0 }
                  : { rotate: 0, y: -4 }
              }
              transition={{ duration: 0.2 }}
            />
            <motion.span
              className="w-5 h-0.5 bg-fg absolute"
              animate={isMobileMenuOpen ? { opacity: 0 } : { opacity: 1 }}
              transition={{ duration: 0.2 }}
            />
            <motion.span
              className="w-5 h-0.5 bg-fg absolute"
              animate={
                isMobileMenuOpen
                  ? { rotate: -45, y: 0 }
                  : { rotate: 0, y: 4 }
              }
              transition={{ duration: 0.2 }}
            />
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className="md:hidden bg-card/95 backdrop-blur-md shadow-lg shadow-violet/5"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
          >
            <div className="px-4 py-4 space-y-4">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="block font-medium text-muted hover:text-fg transition-colors duration-200"
                  style={{ fontSize: '16px' }}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}
