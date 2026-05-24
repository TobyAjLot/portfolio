import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { X, Send, Terminal } from "lucide-react";
import { groqEngine } from "./chatEngine";

const engine = groqEngine;

interface Message {
  id: number;
  role: "user" | "assistant";
  content: string;
}

const SUGGESTIONS = [
  "Who is Tobi?",
  "What is TekBreed?",
  "What stack does he use?",
  "Is he available for work?",
];

interface ChatWidgetProps {
  onClose: () => void;
}

export default function ChatWidget({ onClose }: ChatWidgetProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 0,
      role: "assistant",
      content:
        "Hey. I'm Tobi's AI assistant — ask me anything about him, his projects, or his work.",
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  async function handleSend(text?: string) {
    const content = (text ?? input).trim();
    if (!content || isTyping) return;

    const userMsg: Message = { id: Date.now(), role: "user", content };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);

    try {
      const response = await engine.sendMessage(content);
      setMessages((prev) => [
        ...prev,
        { id: Date.now() + 1, role: "assistant", content: response },
      ]);
    } finally {
      setIsTyping(false);
    }
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 20, scale: 0.95 }}
      transition={{ type: "spring", stiffness: 400, damping: 30 }}
      className="fixed bottom-24 right-6 z-50 w-[360px] max-w-[calc(100vw-24px)] 
                 rounded-xl border border-border-col bg-surface shadow-2xl 
                 flex flex-col overflow-hidden"
      style={{ maxHeight: "480px" }}
    >
      {/* Header */}
      <div className="flex items-center gap-3 border-b border-border-col px-4 py-3 shrink-0">
        <div className="flex items-center gap-2">
          <Terminal size={15} className="text-accent" />
          <span className="font-mono text-xs text-muted uppercase tracking-wider">
            ask tobi
          </span>
        </div>
        <div className="ml-auto flex items-center gap-2">
          <span className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse" />
          <span className="font-mono text-[10px] text-muted">online</span>
          <button
            onClick={onClose}
            className="ml-2 text-muted hover:text-foreground transition-colors"
            aria-label="Close chat"
          >
            <X size={15} />
          </button>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3 min-h-0">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
          >
            {msg.role === "assistant" && (
              <span className="font-mono text-[10px] text-accent mr-2 mt-1 shrink-0 leading-5">
                &gt;_
              </span>
            )}
            <p
              className={`max-w-[82%] text-sm leading-relaxed ${
                msg.role === "user"
                  ? "bg-accent/10 border border-accent/20 text-foreground rounded-lg rounded-br-sm px-3 py-2"
                  : "text-foreground/90"
              }`}
            >
              {msg.content}
            </p>
          </div>
        ))}

        {isTyping && (
          <div className="flex items-center gap-2">
            <span className="font-mono text-[10px] text-accent">&gt;_</span>
            <div className="flex gap-1">
              {[0, 1, 2].map((i) => (
                <span
                  key={i}
                  className="h-1 w-1 rounded-full bg-muted animate-bounce"
                  style={{ animationDelay: `${i * 150}ms` }}
                />
              ))}
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Suggestions */}
      {messages.length <= 1 && (
        <div className="px-4 pb-2 flex flex-wrap gap-1.5 shrink-0">
          {SUGGESTIONS.map((s) => (
            <button
              key={s}
              onClick={() => handleSend(s)}
              className="font-mono text-[10px] text-muted border border-border-col 
                         rounded px-2 py-1 hover:border-accent/50 hover:text-accent 
                         transition-colors"
            >
              {s}
            </button>
          ))}
        </div>
      )}

      {/* Input */}
      <div className="border-t border-border-col px-3 py-2.5 flex items-center gap-2 shrink-0">
        <span className="font-mono text-xs text-accent shrink-0">&gt;</span>
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="ask me anything..."
          className="flex-1 bg-transparent font-mono text-xs text-foreground 
                     placeholder:text-muted outline-none"
        />
        <button
          onClick={() => handleSend()}
          disabled={!input.trim() || isTyping}
          className="text-muted hover:text-accent disabled:opacity-30 
                     transition-colors shrink-0"
          aria-label="Send"
        >
          <Send size={13} />
        </button>
      </div>
    </motion.div>
  );
}
