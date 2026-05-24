import { useRef } from 'react'
import { useInView } from 'framer-motion'

interface UseScrollAnimationOptions {
  once?: boolean
  margin?: string
  amount?: number | 'some' | 'all'
}

export function useScrollAnimation(options: UseScrollAnimationOptions = {}) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, {
    once: options.once ?? true,
    margin: (options.margin ?? '0px 0px -80px 0px') as never,
    amount: options.amount ?? 0.1,
  })

  return { ref, isInView }
}
