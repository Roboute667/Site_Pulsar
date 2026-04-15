'use client'

import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface BadgeProps {
  children: React.ReactNode
  variant?: 'default' | 'violet' | 'outline'
  size?: 'sm' | 'md' | 'lg'
  className?: string
  animate?: boolean
}

export function Badge({ 
  children, 
  variant = 'default', 
  size = 'md', 
  className,
  animate = false 
}: BadgeProps) {
  const baseClasses = 'inline-flex items-center font-medium rounded-full'
  
  const variantClasses = {
    default: 'bg-card text-fg shadow-md shadow-violet/5',
    violet: 'bg-gradient-violet text-white',
    outline: 'border border-violet text-violet bg-transparent',
  }
  
  const sizeClasses = {
    sm: 'px-2 py-1 text-xs',
    md: 'px-3 py-1.5 text-sm',
    lg: 'px-4 py-2 text-base',
  }

  const badgeClasses = cn(
    baseClasses,
    variantClasses[variant],
    sizeClasses[size],
    className
  )

  if (animate) {
    return (
      <motion.span
        className={badgeClasses}
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
        whileHover={{ scale: 1.05 }}
      >
        {children}
      </motion.span>
    )
  }

  return <span className={badgeClasses}>{children}</span>
}

interface StatusBadgeProps {
  status: 'active' | 'inactive' | 'pending'
  className?: string
}

export function StatusBadge({ status, className }: StatusBadgeProps) {
  const statusConfig = {
    active: {
      label: 'Active',
      color: 'bg-green-500',
    },
    inactive: {
      label: 'Inactive',
      color: 'bg-red-500',
    },
    pending: {
      label: 'Pending',
      color: 'bg-yellow-500',
    },
  }

  const config = statusConfig[status]

  return (
    <Badge variant="outline" size="sm" className={className}>
      <div className={cn('w-2 h-2 rounded-full mr-2', config.color)} />
      {config.label}
    </Badge>
  )
}
