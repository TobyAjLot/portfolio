import { motion } from "framer-motion";
import SectionWrapper, { itemVariants } from "@/components/ui/SectionWrapper";
import { timeline } from "@/data/timeline";
import { cn } from "@/lib/utils";

const typeColors = {
  build: "bg-accent/10 border-accent/30 text-accent",
  found: "bg-accent2/10 border-accent2/30 text-accent2",
  learn: "bg-foreground/5 border-border-col text-muted",
  ship: "bg-accent/15 border-accent/40 text-accent",
};

const typeLabel = {
  build: "Build",
  found: "Found",
  learn: "Learn",
  ship: "Ship",
};

export default function AboutSection() {
  return (
    <SectionWrapper id="about">
      <div className="grid gap-16 lg:grid-cols-2 lg:gap-24">
        {/* Left — narrative */}
        <div>
          <motion.div variants={itemVariants} className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <span className="h-px w-8 bg-accent" />
              <span className="font-mono text-xs text-muted uppercase tracking-widest">
                About
              </span>
            </div>
            <h2 className="font-display text-4xl md:text-5xl font-extrabold text-foreground">
              The Builder
            </h2>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="space-y-4 text-foreground/80 leading-relaxed"
          >
            <p>
              I'm Tobi Ajasa-Lot — a fullstack developer and founder based in
              Lagos, Nigeria. I operate at the intersection of robust backend
              systems, hyper-optimized frontends, and emerging AI technologies.
              I don’t just write code; I build ecosystems.
            </p>
            <p>
              My expertise lies in designing scalable full-stack applications,
              mastering performance tools, and exploring the frontiers of
              intelligent software. From managing technical growth and
              operational strategy to shipping high-performance web
              applications, I focus on turning complex technical challenges into
              seamless digital products.
            </p>
            <p>
              Driven by a mindset of continuous learning, I thrive on execution
              at the highest level. Whether architecting system infrastructure
              or steering product strategy, my goal is always to build
              high-impact technology that scales.
            </p>
          </motion.div>

          <motion.div variants={itemVariants} className="mt-8">
            <a
              href="#contact"
              className="inline-flex items-center gap-2 font-mono text-sm text-accent 
                         border-b border-accent/30 hover:border-accent pb-0.5 transition-colors"
            >
              Let's build something together
              <span>→</span>
            </a>
          </motion.div>
        </div>

        {/* Right — timeline */}
        <div>
          <motion.div variants={itemVariants} className="mb-6">
            <span className="font-mono text-xs text-muted uppercase tracking-widest">
              Timeline
            </span>
          </motion.div>

          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-[52px] top-2 bottom-2 w-px bg-border-col" />

            <div className="space-y-8">
              {timeline.map((event, i) => (
                <motion.div
                  key={event.year}
                  variants={itemVariants}
                  className="flex gap-5 items-start"
                >
                  {/* Year */}
                  <div className="shrink-0 w-12 text-right">
                    <span className="font-mono text-xs text-muted">
                      {event.year}
                    </span>
                  </div>

                  {/* Dot */}
                  <div className="relative shrink-0 mt-0.5">
                    <div
                      className={cn(
                        "h-2 w-2 rounded-full border z-10 relative",
                        i === timeline.length - 1
                          ? "bg-accent border-accent"
                          : "bg-background border-border-col",
                      )}
                    />
                  </div>

                  {/* Content */}
                  <div className="pb-2 min-w-0">
                    <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                      <h3 className="font-display font-semibold text-foreground text-sm">
                        {event.title}
                      </h3>
                      <span
                        className={cn(
                          "font-mono text-[9px] uppercase tracking-wider px-1.5 py-0.5 rounded border",
                          typeColors[event.type],
                        )}
                      >
                        {typeLabel[event.type]}
                      </span>
                    </div>
                    <p className="text-sm text-muted leading-relaxed">
                      {event.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}
