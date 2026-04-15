'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface CTAProps {
  href?: string
  onClick?: () => void
  children: React.ReactNode
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  className?: string
  disabled?: boolean
  external?: boolean
}

export function CTA({
  href,
  onClick,
  children,
  variant = 'primary',
  size = 'md',
  className,
  disabled = false,
  external = false,
}: CTAProps) {
  const baseClasses = 'inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-violet focus:ring-offset-2 focus:ring-offset-bg'
  
  const variantClasses = {
    primary: 'bg-gradient-violet text-white hover:opacity-90 shadow-lg hover:shadow-violet/25',
    secondary: 'bg-card text-fg hover:bg-g4/20 shadow-lg shadow-violet/10 hover:shadow-violet/20',
    outline: 'border border-violet text-violet bg-transparent hover:bg-violet hover:text-white',
    ghost: 'text-violet hover:bg-violet/10',
  }
  
  const sizeClasses = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  }

  const disabledClasses = 'opacity-50 cursor-not-allowed hover:opacity-50'

  const buttonClasses = cn(
    baseClasses,
    variantClasses[variant],
    sizeClasses[size],
    disabled && disabledClasses,
    className
  )

  const MotionComponent = motion.button
  const MotionLink = motion.create(Link)

  if (href && !disabled) {
    return (
      <MotionLink
        href={href}
        className={buttonClasses}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        target={external ? '_blank' : undefined}
        rel={external ? 'noopener noreferrer' : undefined}
      >
        {children}
        {external && (
          <ExternalLinkIcon className="ml-2 w-4 h-4" />
        )}
      </MotionLink>
    )
  }

  return (
    <MotionComponent
      className={buttonClasses}
      onClick={onClick}
      disabled={disabled}
      whileHover={disabled ? undefined : { scale: 1.02 }}
      whileTap={disabled ? undefined : { scale: 0.98 }}
    >
      {children}
    </MotionComponent>
  )
}

interface CTAGroupProps {
  children: React.ReactNode
  className?: string
  direction?: 'row' | 'column'
  align?: 'start' | 'center' | 'end'
}

export function CTAGroup({ 
  children, 
  className, 
  direction = 'row',
  align = 'center' 
}: CTAGroupProps) {
  return (
    <div className={cn(
      'flex gap-4',
      direction === 'column' ? 'flex-col' : 'flex-col sm:flex-row',
      align === 'start' && 'justify-start items-start',
      align === 'center' && 'justify-center items-center',
      align === 'end' && 'justify-end items-end',
      className
    )}>
      {children}
    </div>
  )
}

function ExternalLinkIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"
      />
    </svg>
  )
}
