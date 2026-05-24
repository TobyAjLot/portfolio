import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";

const WORDS_LINE1 = ["I", "ARCHITECT", "PERFORMANCE."];
const WORDS_LINE2 = ["I", "ENGINEER", "GROWTH."];

const ROLES = [
  "Fullstack Developer",
  "Platform Founder",
  "System Architect",
  "Builder",
];

function RotatingRole() {
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setIndex((i) => (i + 1) % ROLES.length);
        setVisible(true);
      }, 300);
    }, 2800);
    return () => clearInterval(interval);
  }, []);

  return (
    <span
      className={`text-accent transition-opacity duration-300 ${visible ? "opacity-100" : "opacity-0"}`}
    >
      {ROLES[index]}
    </span>
  );
}

export default function HeroSection() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col justify-center 
                 px-6 md:px-12 lg:px-20 overflow-hidden"
    >
      {/* Dot grid background */}
      <div className="absolute inset-0 dot-grid opacity-100 pointer-events-none" />

      {/* Glowing gradient — top left */}
      <div
        className="absolute -top-40 -left-40 h-96 w-96 rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgb(var(--accent) / 0.08) 0%, transparent 70%)",
        }}
      />
      {/* Glowing gradient — bottom right */}
      <div
        className="absolute -bottom-40 -right-40 h-96 w-96 rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgb(var(--accent2) / 0.06) 0%, transparent 70%)",
        }}
      />

      {/* Coordinate decorations */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute top-28 right-8 md:right-20 font-mono text-[10px] text-muted/40 
                   select-none hidden md:block"
      >
        <p>6.6500° N</p>
        <p>3.3100° E</p>
        <p>LAGOS, NG</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.2, duration: 1 }}
        className="absolute bottom-28 left-8 md:left-20 font-mono text-[10px] text-muted/40 
                   select-none hidden md:block"
      >
        <p>SYS_ARCH_v2.5</p>
        <p>STATUS: BUILDING</p>
      </motion.div>

      {/* Main content */}
      <div className="relative z-10 max-w-6xl mx-auto w-full pt-20">
        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="flex items-center gap-3 mb-8"
        >
          <span className="h-px w-12 bg-accent" />
          <span className="font-mono text-xs text-muted uppercase tracking-widest">
            TobI Ajasa-Lot
          </span>
        </motion.div>

        {/* Headline — staggered word reveal */}
        <div className="mb-4">
          <div className="flex flex-wrap gap-x-4 gap-y-1 mb-1">
            {WORDS_LINE1.map((word, i) => (
              <motion.span
                key={word}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: 0.4 + i * 0.1,
                  duration: 0.6,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className={`font-display font-extrabold leading-none tracking-tight
                  text-5xl sm:text-6xl md:text-7xl lg:text-8xl
                  ${word === "PERFORMANCE." ? "text-accent" : "text-foreground"}`}
              >
                {word}
              </motion.span>
            ))}
          </div>
          <div className="flex flex-wrap gap-x-4 gap-y-1">
            {WORDS_LINE2.map((word, i) => (
              <motion.span
                key={word + "2"}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: 0.7 + i * 0.1,
                  duration: 0.6,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className={`font-display font-extrabold leading-none tracking-tight
                  text-5xl sm:text-6xl md:text-7xl lg:text-8xl
                  ${word === "GROWTH." ? "text-foreground/30" : "text-foreground"}`}
              >
                {word}
              </motion.span>
            ))}
          </div>
        </div>

        {/* Rotating role */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.5 }}
          className="font-mono text-sm text-muted mt-6 mb-10"
        >
          <RotatingRole /> — Lagos, Nigeria
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4, duration: 0.5 }}
          className="flex items-center gap-4 flex-wrap"
        >
          <a
            href="#work"
            className="px-5 py-2.5 bg-accent text-background font-display font-bold 
                       text-sm rounded hover:bg-accent/90 transition-colors"
          >
            View My Work
          </a>
          <a
            href="#contact"
            className="px-5 py-2.5 border border-border-col text-muted font-display font-bold 
                       text-sm rounded hover:border-accent/50 hover:text-accent transition-colors"
          >
            Get in Touch
          </a>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 0.5 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="font-mono text-[10px] text-muted/50 uppercase tracking-widest">
          scroll
        </span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <ArrowDown size={14} className="text-muted/40" />
        </motion.div>
      </motion.div>
    </section>
  );
}
