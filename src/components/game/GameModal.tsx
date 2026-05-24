import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'
import SignalCatch from './SignalCatch'

interface GameModalProps {
  onClose: () => void
}

export default function GameModal({ onClose }: GameModalProps) {
  return (
    <AnimatePresence>
      <motion.div
        key="overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
        style={{ backgroundColor: 'rgb(0 0 0 / 0.7)', backdropFilter: 'blur(4px)' }}
        onClick={onClose}
      >
        <motion.div
          key="modal"
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ type: 'spring', stiffness: 400, damping: 30 }}
          onClick={e => e.stopPropagation()}
          className="bg-surface border border-border-col rounded-xl shadow-2xl 
                     w-full max-w-sm overflow-hidden"
          style={{ height: '520px', display: 'flex', flexDirection: 'column' }}
        >
          {/* Modal header */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-border-col shrink-0">
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-accent animate-pulse" />
              <span className="font-mono text-xs text-muted uppercase tracking-wider">
                signal_catch.exe
              </span>
            </div>
            <button
              onClick={onClose}
              className="text-muted hover:text-foreground transition-colors"
              aria-label="Close game"
            >
              <X size={16} />
            </button>
          </div>

          {/* Game */}
          <div className="flex-1 min-h-0">
            <SignalCatch />
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
