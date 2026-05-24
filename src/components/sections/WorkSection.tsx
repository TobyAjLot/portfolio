import { motion } from "framer-motion";
import { ExternalLink, Github, ArrowUpRight } from "lucide-react";
import SectionWrapper, { itemVariants } from "@/components/ui/SectionWrapper";
import { projects, type Project } from "@/data/projects";
import { cn } from "@/lib/utils";

const statusLabel: Record<Project["status"], string> = {
  live: "Live",
  building: "Building",
  beta: "Beta",
};

const statusColors: Record<Project["status"], string> = {
  live: "text-accent border-accent/30 bg-accent/8",
  building: "text-accent2 border-accent2/30 bg-accent2/8",
  beta: "text-foreground border-border-col bg-surface",
};

function ProjectCard({ project, index }: { project: Project; index: number }) {
  return (
    <motion.article
      variants={itemVariants}
      className="group relative p-6 md:p-8 rounded-xl border border-border-col 
                 bg-surface hover:border-accent/30 transition-all duration-300
                 hover:shadow-[0_0_40px_rgb(var(--accent)/0.05)]"
    >
      {/* Index */}
      <span className="absolute top-6 right-6 font-mono text-xs text-muted/30 select-none">
        {String(index + 1).padStart(2, "0")}
      </span>

      {/* Status pill */}
      <div className="flex items-center gap-3 mb-5">
        <span
          className={cn(
            "font-mono text-[10px] uppercase tracking-wider px-2 py-0.5 rounded border",
            statusColors[project.status],
          )}
        >
          {statusLabel[project.status]}
        </span>
      </div>

      {/* Name */}
      <h3
        className="font-display text-2xl font-bold text-foreground group-hover:text-accent 
                     transition-colors duration-300 mb-2"
      >
        {project.name}
      </h3>

      {/* Tagline */}
      <p className="font-body text-sm text-muted mb-4 leading-relaxed">
        {project.tagline}
      </p>

      {/* Description */}
      <p className="font-body text-sm text-foreground/70 leading-relaxed mb-6">
        {project.description}
      </p>

      {/* Stack tags */}
      <div className="flex flex-wrap gap-2 mb-6">
        {project.stack.map((tech) => (
          <span
            key={tech}
            className="font-mono text-[10px] text-muted border border-border-col 
                       rounded px-2 py-0.5"
          >
            {tech}
          </span>
        ))}
      </div>

      {/* Links */}
      <div className="flex items-center gap-4">
        {project.liveUrl && (
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 font-mono text-xs text-muted 
                       hover:text-accent transition-colors"
          >
            <ExternalLink size={12} />
            Live site
          </a>
        )}
        {project.repoUrl && (
          <a
            href={project.repoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 font-mono text-xs text-muted 
                       hover:text-accent transition-colors"
          >
            <Github size={12} />
            Repository
          </a>
        )}
        <span className="ml-auto text-muted/0 group-hover:text-accent transition-colors duration-300">
          <ArrowUpRight size={16} />
        </span>
      </div>
    </motion.article>
  );
}

export default function WorkSection() {
  return (
    <SectionWrapper id="work">
      {/* Header */}
      <motion.div variants={itemVariants} className="mb-14">
        <div className="flex items-center gap-3 mb-4">
          <span className="h-px w-8 bg-accent" />
          <span className="font-mono text-xs text-muted uppercase tracking-widest">
            Selected Work
          </span>
        </div>
        <h2 className="font-display text-4xl md:text-5xl font-extrabold text-foreground">
          What I'm Building
        </h2>
        <p className="mt-4 text-muted max-w-xl leading-relaxed">
          Putting architectural principles into production. Here is a look at
          what I'm currently engineering.
        </p>
      </motion.div>

      {/* Project grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((project, i) => (
          <ProjectCard key={project.id} project={project} index={i} />
        ))}
      </div>
    </SectionWrapper>
  );
}
