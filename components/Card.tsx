'use client'

import { motion } from 'framer-motion'
import { fadeInUp } from '@/lib/motion'
import { cn } from '@/lib/utils'

interface CardProps {
  children: React.ReactNode
  className?: string
  glowBorder?: boolean
  hover?: boolean
}

export function Card({ children, className, glowBorder = false, hover = true }: CardProps) {
  return (
    <motion.div
      className={cn(
        'bg-card rounded-xl p-6 transition-all duration-300',
        glowBorder && 'glow-border',
        hover && 'hover:bg-card/80 hover:scale-105',
        className
      )}
      variants={fadeInUp}
      whileHover={hover ? { y: -5 } : undefined}
    >
      {children}
    </motion.div>
  )
}

interface FeatureCardProps {
  icon: React.ReactNode
  title: string
  description: string
  className?: string
}

export function FeatureCard({ icon, title, description, className }: FeatureCardProps) {
  return (
    <Card className={className} glowBorder>
      <div className="space-y-4">
        <div className="w-12 h-12 bg-gradient-violet rounded-lg flex items-center justify-center">
          {icon}
        </div>
        <div>
          <h3 className="text-xl font-semibold mb-2">{title}</h3>
          <p className="text-muted leading-relaxed">{description}</p>
        </div>
      </div>
    </Card>
  )
}

interface StatCardProps {
  label: string
  value: string
  change?: string
  positive?: boolean
  className?: string
}

export function StatCard({ label, value, change, positive, className }: StatCardProps) {
  return (
    <Card className={className}>
      <div className="text-center space-y-2">
        <div className="text-2xl sm:text-3xl font-bold font-mono gradient-text">
          {value}
        </div>
        <div className="text-sm text-muted">{label}</div>
        {change && (
          <div className={cn(
            'text-xs font-medium',
            positive ? 'text-green-400' : 'text-red-400'
          )}>
            {change}
          </div>
        )}
      </div>
    </Card>
  )
}
