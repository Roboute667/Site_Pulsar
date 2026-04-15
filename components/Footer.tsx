'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'

interface FooterLink {
  href: string
  label: string
  external?: boolean
}

const footerLinks: Record<string, FooterLink[]> = {
  Company: [
    { href: '/about', label: 'About' },
    { href: '/team', label: 'Team' },
    { href: '/faq', label: 'FAQ' },
    { href: 'mailto:contact@pulsarfund.com', label: 'Contact', external: true },
  ],
  Legal: [
    { href: '/legal', label: 'Terms & Privacy' },
    { href: '/disclosures', label: 'Risk Disclosures' },
  ],
}

export function Footer() {
  return (
    <footer className="relative bg-gradient-to-br from-gray-950 via-black to-gray-900 overflow-hidden">
      {/* Glassmorphism Background with Intense Violet Halo */}
      <div className="absolute inset-0">
        <div className="absolute top-0 right-0 w-96 h-96 bg-violet/20 rounded-full blur-3xl transform translate-x-32 -translate-y-32" />
        <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500/15 rounded-full blur-2xl transform translate-x-16 -translate-y-16" />
        <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
      </div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <Link href="/" className="flex items-center space-x-3 mb-4">
              <div className="relative w-10 h-10 flex items-center justify-center">
                <Image
                  src="/images/logo.png"
                  alt="Pulsar Logo"
                  width={40}
                  height={40}
                  className="drop-shadow-lg object-contain"
                />
              </div>
              <span className="font-tight font-semibold text-lg">Pulsar</span>
            </Link>
            <p className="text-muted text-sm max-w-md mb-4">
              Systematic options strategies with Bitcoin allocation overlay. 
              FCA-regulated in London.
            </p>
            <div className="text-xs text-muted">
              <p>© 2025 Pulsar Fund Management Ltd.</p>
              <p>Last updated: September 2025</p>
              <p>Authorised and regulated by the Financial Conduct Authority.</p>
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h3 className="font-medium text-fg mb-4">{category}</h3>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted hover:text-fg transition-colors duration-200"
                      target={link.external ? '_blank' : undefined}
                      rel={link.external ? 'noopener noreferrer' : undefined}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-8 border-t border-violet/20 shadow-lg shadow-violet/5">
          <div className="flex flex-col sm:flex-row justify-between items-center">
            <p className="text-xs text-muted">
              Risk Warning: Past performance is not indicative of future results. 
              Capital at risk.
            </p>
            <div className="flex items-center space-x-4 mt-4 sm:mt-0">
              <span className="text-xs text-muted">London, UK</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
