import { useState } from 'react'
import { motion } from 'framer-motion'
import SectionWrapper, { itemVariants } from '@/components/ui/SectionWrapper'
import { stackItems, categoryColor, type StackItem } from '@/data/stack'
import { cn } from '@/lib/utils'

const TIER_RADIUS = { 1: 90, 2: 160, 3: 230 }
const ORBIT_DURATION = { 1: 22, 2: 35, 3: 50 }

function OrbitalView() {
  const [hovered, setHovered] = useState<string | null>(null)

  return (
    <div className="relative flex items-center justify-center" style={{ height: 520 }}>
      {/* Orbital rings */}
      {[1, 2, 3].map(tier => (
        <div
          key={tier}
          className="absolute rounded-full border border-border-col/40"
          style={{
            width: TIER_RADIUS[tier as 1 | 2 | 3] * 2,
            height: TIER_RADIUS[tier as 1 | 2 | 3] * 2,
          }}
        />
      ))}

      {/* Center node */}
      <div
        className="absolute z-10 h-16 w-16 rounded-full border border-accent/30 
                   bg-surface flex items-center justify-center"
        style={{ boxShadow: '0 0 24px rgb(var(--accent) / 0.15)' }}
      >
        <span className="font-mono text-[9px] text-accent text-center leading-tight">
          FULL<br />STACK
        </span>
      </div>

      {/* Orbiting nodes */}
      {stackItems.map(item => {
        const r = TIER_RADIUS[item.tier]
        const duration = ORBIT_DURATION[item.tier]

        return (
          <motion.div
            key={item.name}
            className="absolute"
            animate={{ rotate: 360 }}
            transition={{
              duration,
              repeat: Infinity,
              ease: 'linear',
              delay: -(item.angle / 360) * duration,
            }}
            style={{ width: r * 2, height: r * 2 }}
          >
            {/* Counter-rotate the label so it stays upright */}
            <motion.div
              animate={{ rotate: -360 }}
              transition={{
                duration,
                repeat: Infinity,
                ease: 'linear',
                delay: -(item.angle / 360) * duration,
              }}
              className="absolute"
              style={{
                top: 0,
                left: '50%',
                translateX: '-50%',
                translateY: '-50%',
              }}
            >
              <button
                onMouseEnter={() => setHovered(item.name)}
                onMouseLeave={() => setHovered(null)}
                className={cn(
                  'font-mono text-[10px] px-2 py-1 rounded border transition-all duration-200',
                  hovered === item.name
                    ? 'border-accent/50 bg-accent/10 text-accent scale-110'
                    : `border-border-col bg-surface ${categoryColor[item.category]} opacity-80 hover:opacity-100`
                )}
              >
                {item.name}
              </button>
            </motion.div>
          </motion.div>
        )
      })}
    </div>
  )
}

function GridView() {
  const categories: StackItem['category'][] = ['frontend', 'backend', 'infra', 'tooling']
  const categoryLabel = {
    frontend: 'Frontend',
    backend:  'Backend',
    infra:    'Infrastructure',
    tooling:  'Tooling',
  }

  return (
    <div className="grid grid-cols-2 gap-6">
      {categories.map(cat => (
        <div key={cat}>
          <p className={cn('font-mono text-[10px] uppercase tracking-widest mb-3', categoryColor[cat])}>
            {categoryLabel[cat]}
          </p>
          <div className="flex flex-wrap gap-2">
            {stackItems
              .filter(item => item.category === cat)
              .map(item => (
                <span
                  key={item.name}
                  className="font-mono text-xs text-muted border border-border-col 
                             bg-surface rounded px-2 py-1"
                >
                  {item.name}
                </span>
              ))}
          </div>
        </div>
      ))}
    </div>
  )
}

export default function StackSection() {
  return (
    <SectionWrapper id="stack" className="overflow-hidden">
      <motion.div variants={itemVariants} className="mb-12">
        <div className="flex items-center gap-3 mb-4">
          <span className="h-px w-8 bg-accent" />
          <span className="font-mono text-xs text-muted uppercase tracking-widest">
            Tech Stack
          </span>
        </div>
        <h2 className="font-display text-4xl md:text-5xl font-extrabold text-foreground">
          The Orbit
        </h2>
        <p className="mt-4 text-muted max-w-lg leading-relaxed">
          Tools I reach for by default. Every node earns its place.
        </p>
      </motion.div>

      <motion.div variants={itemVariants}>
        {/* Orbital on md+, grid on mobile */}
        <div className="hidden md:block">
          <OrbitalView />
        </div>
        <div className="md:hidden">
          <GridView />
        </div>
      </motion.div>
    </SectionWrapper>
  )
}
