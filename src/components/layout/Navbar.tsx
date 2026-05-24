import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import ThemeToggle from "@/components/ui/ThemeToggle";

const NAV_LINKS = [
  { href: "#work", label: "Work" },
  { href: "#stack", label: "Stack" },
  { href: "#about", label: "About" },
  { href: "#contact", label: "Contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("");

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 40);

      // Update active section based on scroll position
      const sections = ["work", "stack", "about", "contact"];
      const current = sections.find((id) => {
        const el = document.getElementById(id);
        if (!el) return false;
        const rect = el.getBoundingClientRect();
        return rect.top <= 120 && rect.bottom >= 120;
      });
      setActive(current ? `#${current}` : "");
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed top-0 left-0 right-0 z-30 transition-all duration-300 ${
        scrolled
          ? "bg-background/80 border-b border-border-col"
          : "bg-transparent border-b border-transparent"
      }`}
      style={{ backdropFilter: scrolled ? "blur(12px)" : "none" }}
    >
      <div className="max-w-6xl mx-auto px-6 md:px-12 lg:px-20 h-14 flex items-center justify-between">
        {/* Logo */}
        <a
          href="#"
          className="font-display font-bold text-sm text-foreground hover:text-accent transition-colors"
        >
          <span className="text-accent">T.</span>Ajasa-Lot
        </a>

        {/* Nav links */}
        <nav className="hidden md:flex items-center gap-1">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={`relative px-3 py-1.5 font-mono text-xs uppercase tracking-wider transition-colors ${
                active === link.href
                  ? "text-accent"
                  : "text-muted hover:text-foreground"
              }`}
            >
              {active === link.href && (
                <motion.span
                  layoutId="nav-indicator"
                  className="absolute inset-0 bg-accent/8 rounded"
                />
              )}
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <ThemeToggle />
          <a
            href="#contact"
            className="hidden md:flex items-center gap-1.5 px-3 py-1.5 
                       border border-border-col rounded font-mono text-xs text-muted 
                       hover:border-accent/50 hover:text-accent transition-colors"
          >
            Let's talk
            <span className="text-accent">→</span>
          </a>
        </div>
      </div>
    </motion.header>
  );
}
