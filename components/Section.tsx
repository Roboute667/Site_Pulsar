'use client'

import { motion } from 'framer-motion'
import { fadeInUp, staggerContainer } from '@/lib/motion'
import { cn } from '@/lib/utils'

interface SectionProps {
  children: React.ReactNode
  className?: string
  id?: string
  title?: string
  subtitle?: string
  centered?: boolean
}

export function Section({ 
  children, 
  className, 
  id, 
  title, 
  subtitle, 
  centered = false 
}: SectionProps) {
  return (
    <motion.section
      id={id}
      className={cn('py-16 lg:py-24', className)}
      variants={staggerContainer}
      initial="initial"
      whileInView="animate"
      viewport={{ once: true, margin: "-100px" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {(title || subtitle) && (
          <motion.div 
            className={cn(
              'mb-16',
              centered ? 'text-center' : ''
            )}
            variants={fadeInUp}
          >
            {title && (
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-tight font-bold mb-4">
                {title}
              </h2>
            )}
            {subtitle && (
              <p className="text-lg text-muted max-w-3xl mx-auto">
                {subtitle}
              </p>
            )}
          </motion.div>
        )}
        
        <motion.div variants={staggerContainer}>
          {children}
        </motion.div>
      </div>
    </motion.section>
  )
}
