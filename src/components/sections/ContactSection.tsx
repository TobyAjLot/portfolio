import { motion } from "framer-motion";
import { Github, Linkedin, Mail, ArrowUpRight } from "lucide-react";
import SectionWrapper, { itemVariants } from "@/components/ui/SectionWrapper";

const LINKS = [
  {
    icon: Mail,
    label: "Email",
    value: "tobyajlot@gmail.com",
    href: "mailto:tobyajlot@gmail.com",
  },
  {
    icon: Linkedin,
    label: "LinkedIn",
    value: "/in/tobi-ajasa-lot-bb05701a7",
    href: "https://www.linkedin.com/in/tobi-ajasa-lot-bb05701a7/",
  },
  {
    icon: Github,
    label: "GitHub",
    value: "github.com/TobyAjLot",
    href: "https://github.com/TobyAjLot",
  },
];

export default function ContactSection() {
  return (
    <SectionWrapper id="contact">
      {/* Big CTA */}
      <motion.div
        variants={itemVariants}
        className="mb-16 text-center lg:text-left"
      >
        <div className="flex items-center gap-3 mb-4 justify-center lg:justify-start">
          <span className="h-px w-8 bg-accent" />
          <span className="font-mono text-xs text-muted uppercase tracking-widest">
            Contact
          </span>
        </div>
        <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-extrabold text-foreground leading-tight">
          Let's build
          <br />
          <span className="text-accent">something real.</span>
        </h2>
        <p className="mt-6 text-muted max-w-md mx-auto lg:mx-0 leading-relaxed">
          Open to meaningful collaborations, technical conversations, and
          opportunities that push the boundaries of what we can build.
        </p>
      </motion.div>

      {/* Contact links */}
      <div className="grid gap-4 sm:grid-cols-3 max-w-2xl">
        {LINKS.map((link) => {
          const Icon = link.icon;
          return (
            <motion.a
              key={link.label}
              variants={itemVariants}
              href={link.href}
              target={link.label !== "Email" ? "_blank" : undefined}
              rel="noopener noreferrer"
              className="group flex items-start gap-4 p-5 rounded-xl border border-border-col 
                         bg-surface hover:border-accent/30 transition-all duration-300"
            >
              <div
                className="h-8 w-8 rounded-lg border border-border-col bg-background 
                              flex items-center justify-center shrink-0 
                              group-hover:border-accent/30 group-hover:text-accent transition-colors"
              >
                <Icon size={15} />
              </div>
              <div className="min-w-0">
                <p className="font-mono text-[10px] text-muted uppercase tracking-wider mb-0.5">
                  {link.label}
                </p>
                <p
                  className="font-body text-sm text-foreground group-hover:text-accent 
                               transition-colors truncate"
                >
                  {link.value}
                </p>
              </div>
              <ArrowUpRight
                size={14}
                className="ml-auto text-muted/0 group-hover:text-accent transition-colors shrink-0 mt-0.5"
              />
            </motion.a>
          );
        })}
      </div>

      {/* Footer */}
      <motion.div
        variants={itemVariants}
        className="mt-24 pt-8 border-t border-border-col flex flex-col sm:flex-row 
                   items-center justify-between gap-4"
      >
        <p className="font-mono text-xs text-muted/50">
          © {new Date().getFullYear()} Tobi Ajasa-Lot. Built with intent.
        </p>
        <p className="font-mono text-xs text-muted/30">
          React · Vite · Tailwind · Framer Motion
        </p>
      </motion.div>
    </SectionWrapper>
  );
}
