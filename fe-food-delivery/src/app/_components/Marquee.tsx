'use client'

import * as React from 'react'
import { motion } from 'framer-motion'

interface MarqueeProps {
  text?: string
  speed?: number
  spacing?: number
}

export const Marquee: React.FC<MarqueeProps> = ({
  text = 'Fresh fast delivered',
  speed = 10,
  spacing = 6,
}) => {
  const space = '\u00A0'.repeat(spacing)
  const spacedText = text + space

  return (
    <div className="overflow-hidden bg-red-500 py-3">
      <motion.div
        className="flex whitespace-nowrap text-white text-lg font-semibold"
        animate={{ x: ['0%', '-50%'] }}
        transition={{ repeat: Infinity, duration: speed, ease: 'linear' }}
      >
        <span>{spacedText.repeat(10)}</span>
        <span>{spacedText.repeat(10)}</span>
      </motion.div>
    </div>
  )
}
