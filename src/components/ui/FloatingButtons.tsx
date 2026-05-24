import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Gamepad2, MessageCircle, X } from "lucide-react";
import { cn } from "@/lib/utils";
import GameModal from "@/components/game/GameModal";
import ChatWidget from "@/components/chat/ChatWidget";

export default function FloatingButtons() {
  const [gameOpen, setGameOpen] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);

  function openGame() {
    setChatOpen(false);
    setGameOpen(true);
  }

  function openChat() {
    setGameOpen(false);
    setChatOpen(true);
  }

  return (
    <>
      {/* Floating button group — bottom right */}
      <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-3">
        {/* Chat button */}
        <motion.button
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1.2 }}
          onClick={chatOpen ? () => setChatOpen(false) : openChat}
          className={cn(
            "group relative h-11 w-11 rounded-full border transition-all duration-200",
            "flex items-center justify-center shadow-lg",
            chatOpen
              ? "bg-accent border-accent text-background"
              : "bg-surface border-border-col text-muted hover:border-accent/50 hover:text-accent",
          )}
          aria-label="Ask Tobi anything"
        >
          <AnimatePresence mode="wait">
            {chatOpen ? (
              <motion.span
                key="x"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.15 }}
              >
                <X size={16} />
              </motion.span>
            ) : (
              <motion.span
                key="chat"
                initial={{ rotate: 90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: -90, opacity: 0 }}
                transition={{ duration: 0.15 }}
              >
                <MessageCircle size={16} />
              </motion.span>
            )}
          </AnimatePresence>
          <span
            className="absolute right-14 whitespace-nowrap font-mono text-[10px] text-muted 
                           opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
          >
            ask me anything
          </span>
        </motion.button>

        {/* Game button */}
        <motion.button
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1.0 }}
          onClick={gameOpen ? () => setGameOpen(false) : openGame}
          className={cn(
            "group relative h-11 w-11 rounded-full border transition-all duration-200",
            "flex items-center justify-center shadow-lg",
            gameOpen
              ? "bg-accent border-accent text-background"
              : "bg-surface border-border-col text-muted hover:border-accent/50 hover:text-accent",
          )}
          aria-label="Play Signal Catch"
        >
          {/* Signal ring effect when idle */}
          {!gameOpen && (
            <span className="signal-ring absolute inset-0 rounded-full border border-accent/30 pointer-events-none" />
          )}
          <AnimatePresence mode="wait">
            {gameOpen ? (
              <motion.span
                key="x"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.15 }}
              >
                <X size={16} />
              </motion.span>
            ) : (
              <motion.span
                key="game"
                initial={{ rotate: 90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: -90, opacity: 0 }}
                transition={{ duration: 0.15 }}
              >
                <Gamepad2 size={16} />
              </motion.span>
            )}
          </AnimatePresence>
          <span
            className="absolute right-14 whitespace-nowrap font-mono text-[10px] text-muted 
                           opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
          >
            play signal catch
          </span>
        </motion.button>
      </div>

      {/* Modals */}
      <AnimatePresence>
        {gameOpen && <GameModal onClose={() => setGameOpen(false)} />}
      </AnimatePresence>

      <AnimatePresence>
        {chatOpen && <ChatWidget onClose={() => setChatOpen(false)} />}
      </AnimatePresence>
    </>
  );
}
