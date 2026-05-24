import { useEffect, useRef } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

export default function CustomCursor() {
  const cursorX = useMotionValue(-100)
  const cursorY = useMotionValue(-100)
  const trailX = useMotionValue(-100)
  const trailY = useMotionValue(-100)

  const springX = useSpring(trailX, { stiffness: 120, damping: 18 })
  const springY = useSpring(trailY, { stiffness: 120, damping: 18 })

  const isHoveringRef = useRef(false)
  const dotRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function onMove(e: MouseEvent) {
      cursorX.set(e.clientX)
      cursorY.set(e.clientY)
      trailX.set(e.clientX)
      trailY.set(e.clientY)
    }

    function onEnterInteractive() {
      isHoveringRef.current = true
      dotRef.current?.classList.add('scale-[3]', 'bg-accent/20', 'border-accent')
    }

    function onLeaveInteractive() {
      isHoveringRef.current = false
      dotRef.current?.classList.remove('scale-[3]', 'bg-accent/20', 'border-accent')
    }

    window.addEventListener('mousemove', onMove)

    const interactives = document.querySelectorAll('a, button, [role="button"], input, textarea')
    interactives.forEach(el => {
      el.addEventListener('mouseenter', onEnterInteractive)
      el.addEventListener('mouseleave', onLeaveInteractive)
    })

    return () => {
      window.removeEventListener('mousemove', onMove)
      interactives.forEach(el => {
        el.removeEventListener('mouseenter', onEnterInteractive)
        el.removeEventListener('mouseleave', onLeaveInteractive)
      })
    }
  }, [cursorX, cursorY, trailX, trailY])

  return (
    <>
      {/* Dot cursor */}
      <motion.div
        ref={dotRef}
        className="fixed top-0 left-0 z-[9999] pointer-events-none
                   h-2 w-2 rounded-full bg-accent border border-accent
                   transition-transform duration-150 ease-out
                   hidden md:block"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: '-50%',
          translateY: '-50%',
        }}
      />

      {/* Trailing ring */}
      <motion.div
        className="fixed top-0 left-0 z-[9998] pointer-events-none
                   h-7 w-7 rounded-full border border-accent/30
                   hidden md:block"
        style={{
          x: springX,
          y: springY,
          translateX: '-50%',
          translateY: '-50%',
        }}
      />
    </>
  )
}
