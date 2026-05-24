import { useState, useEffect, useCallback, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface Node {
  id: number
  x: number      // percent
  y: number      // percent
  size: number   // px
  createdAt: number
  lifespan: number // ms
  caught: boolean
  opacity: number
}

type GameState = 'idle' | 'playing' | 'over'

const GAME_DURATION = 30_000 // 30 seconds
const BASE_SPAWN_INTERVAL = 900
const MIN_SPAWN_INTERVAL = 350

export default function SignalCatch() {
  const [gameState, setGameState] = useState<GameState>('idle')
  const [nodes, setNodes] = useState<Node[]>([])
  const [score, setScore] = useState(0)
  const [highScore, setHighScore] = useState(() => {
    return parseInt(localStorage.getItem('signal-catch-high') ?? '0', 10)
  })
  const [timeLeft, setTimeLeft] = useState(GAME_DURATION)
  const [multiplier, setMultiplier] = useState(1)
  const [combo, setCombo] = useState(0)

  const nodeIdRef = useRef(0)
  const startTimeRef = useRef<number>(0)
  const comboTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const rafRef = useRef<number>(0)
  const spawnRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const spawnNode = useCallback(() => {
    const id = ++nodeIdRef.current
    const elapsed = Date.now() - startTimeRef.current
    const progress = Math.min(elapsed / GAME_DURATION, 1)
    const lifespan = Math.max(1200 - progress * 600, 600)
    const size = Math.random() * 28 + 18

    setNodes(prev => [
      ...prev,
      {
        id,
        x: Math.random() * 84 + 8,
        y: Math.random() * 84 + 8,
        size,
        createdAt: Date.now(),
        lifespan,
        caught: false,
        opacity: 1,
      },
    ])
  }, [])

  const clearTimers = useCallback(() => {
    if (spawnRef.current) clearTimeout(spawnRef.current)
    if (comboTimerRef.current) clearTimeout(comboTimerRef.current)
    cancelAnimationFrame(rafRef.current)
  }, [])

  const scheduleSpawn = useCallback(() => {
    if (gameState !== 'playing') return
    const elapsed = Date.now() - startTimeRef.current
    const progress = Math.min(elapsed / GAME_DURATION, 1)
    const interval = Math.max(
      MIN_SPAWN_INTERVAL,
      BASE_SPAWN_INTERVAL - progress * (BASE_SPAWN_INTERVAL - MIN_SPAWN_INTERVAL)
    )
    spawnRef.current = setTimeout(() => {
      spawnNode()
      scheduleSpawn()
    }, interval)
  }, [gameState, spawnNode])

  // Game tick — updates opacity and removes expired nodes
  const tick = useCallback(() => {
    const now = Date.now()
    setNodes(prev =>
      prev
        .filter(n => n.caught || now - n.createdAt < n.lifespan)
        .map(n => {
          if (n.caught) return n
          const age = now - n.createdAt
          return { ...n, opacity: Math.max(0, 1 - age / n.lifespan) }
        })
    )
    setTimeLeft(Math.max(0, GAME_DURATION - (now - startTimeRef.current)))
    rafRef.current = requestAnimationFrame(tick)
  }, [])

  function startGame() {
    clearTimers()
    nodeIdRef.current = 0
    startTimeRef.current = Date.now()
    setNodes([])
    setScore(0)
    setMultiplier(1)
    setCombo(0)
    setTimeLeft(GAME_DURATION)
    setGameState('playing')
  }

  useEffect(() => {
    if (gameState === 'playing') {
      spawnNode()
      scheduleSpawn()
      rafRef.current = requestAnimationFrame(tick)
    }
    return clearTimers
  }, [gameState, scheduleSpawn, spawnNode, tick, clearTimers])

  useEffect(() => {
    if (timeLeft <= 0 && gameState === 'playing') {
      clearTimers()
      setGameState('over')
      setHighScore(prev => {
        const next = Math.max(prev, score)
        localStorage.setItem('signal-catch-high', String(next))
        return next
      })
    }
  }, [timeLeft, gameState, score, clearTimers])

  function catchNode(id: number) {
    setNodes(prev => prev.map(n => (n.id === id ? { ...n, caught: true } : n)))

    const newCombo = combo + 1
    const m = newCombo >= 5 ? 3 : newCombo >= 3 ? 2 : 1
    setCombo(newCombo)
    setMultiplier(m)
    setScore(s => s + 10 * m)

    if (comboTimerRef.current) clearTimeout(comboTimerRef.current)
    comboTimerRef.current = setTimeout(() => {
      setCombo(0)
      setMultiplier(1)
    }, 1500)
  }

  const progressPct = (timeLeft / GAME_DURATION) * 100

  return (
    <div className="flex flex-col h-full select-none">
      {/* HUD */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-border-col shrink-0">
        <div className="flex items-center gap-4">
          <div>
            <p className="font-mono text-[10px] text-muted uppercase tracking-wider">Score</p>
            <p className="font-display text-xl font-bold text-foreground">{score}</p>
          </div>
          <div>
            <p className="font-mono text-[10px] text-muted uppercase tracking-wider">Best</p>
            <p className="font-display text-xl font-bold text-muted">{highScore}</p>
          </div>
        </div>

        {gameState === 'playing' && (
          <div className="text-center">
            <p className="font-mono text-[10px] text-muted uppercase tracking-wider">Time</p>
            <p className="font-display text-xl font-bold text-foreground">
              {Math.ceil(timeLeft / 1000)}s
            </p>
          </div>
        )}

        {multiplier > 1 && (
          <motion.div
            key={multiplier}
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-accent/10 border border-accent/30 rounded px-2 py-1"
          >
            <p className="font-mono text-xs text-accent font-bold">{multiplier}× COMBO</p>
          </motion.div>
        )}
      </div>

      {/* Timer bar */}
      {gameState === 'playing' && (
        <div className="h-0.5 bg-border-col shrink-0">
          <motion.div
            className="h-full bg-accent"
            style={{ width: `${progressPct}%` }}
            transition={{ duration: 0.1 }}
          />
        </div>
      )}

      {/* Arena */}
      <div className="relative flex-1 overflow-hidden">
        {/* Idle screen */}
        <AnimatePresence>
          {gameState === 'idle' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 flex flex-col items-center justify-center gap-6 p-6 text-center"
            >
              <div>
                <h3 className="font-display text-2xl font-bold text-foreground">
                  Signal Catch
                </h3>
                <p className="mt-2 text-sm text-muted max-w-[260px]">
                  Nodes appear and fade. Click them before they vanish.
                  Build combos for score multipliers.
                </p>
              </div>
              <div className="font-mono text-xs text-muted space-y-1 text-left">
                <p>⚡ Fast catches = combos</p>
                <p>🔥 3 combo = 2× multiplier</p>
                <p>💥 5 combo = 3× multiplier</p>
              </div>
              <button
                onClick={startGame}
                className="px-6 py-2.5 bg-accent text-background font-display font-bold 
                           text-sm rounded hover:bg-accent/90 transition-colors"
              >
                Start Game
              </button>
            </motion.div>
          )}

          {/* Game over screen */}
          {gameState === 'over' && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 flex flex-col items-center justify-center gap-5 p-6 text-center"
            >
              <div>
                <p className="font-mono text-xs text-muted uppercase tracking-widest">Game Over</p>
                <p className="font-display text-4xl font-bold text-foreground mt-1">{score}</p>
                {score >= highScore && score > 0 && (
                  <motion.p
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="font-mono text-xs text-accent mt-1"
                  >
                    ✦ New high score
                  </motion.p>
                )}
                <p className="text-sm text-muted mt-2">Best: {highScore}</p>
              </div>
              <button
                onClick={startGame}
                className="px-6 py-2.5 bg-accent text-background font-display font-bold 
                           text-sm rounded hover:bg-accent/90 transition-colors"
              >
                Play Again
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Nodes */}
        <AnimatePresence>
          {gameState === 'playing' &&
            nodes.map(node => (
              <motion.button
                key={node.id}
                initial={{ scale: 0, opacity: 0 }}
                animate={
                  node.caught
                    ? { scale: 2, opacity: 0 }
                    : { scale: 1, opacity: node.opacity }
                }
                exit={{ scale: 0, opacity: 0 }}
                transition={
                  node.caught
                    ? { duration: 0.25 }
                    : { type: 'spring', stiffness: 500, damping: 25 }
                }
                onClick={() => !node.caught && catchNode(node.id)}
                className="absolute rounded-full border-2 border-accent/70 
                           bg-accent/15 hover:bg-accent/30 transition-colors
                           focus:outline-none"
                style={{
                  left: `${node.x}%`,
                  top: `${node.y}%`,
                  width: node.size,
                  height: node.size,
                  transform: 'translate(-50%, -50%)',
                  boxShadow: '0 0 12px rgb(var(--accent) / 0.4)',
                }}
                aria-label="Catch signal"
              >
                <span
                  className="absolute inset-0 rounded-full border border-accent/30"
                  style={{
                    animation: 'signal-pulse 1.4s ease-out infinite',
                    transformOrigin: 'center',
                  }}
                />
              </motion.button>
            ))}
        </AnimatePresence>

        {/* Idle grid hint */}
        {gameState === 'idle' && (
          <div className="absolute inset-0 dot-grid opacity-30 pointer-events-none" />
        )}
      </div>
    </div>
  )
}
