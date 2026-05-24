export interface StackItem {
  name: string;
  category: "frontend" | "backend" | "infra" | "tooling";
  /** Orbital tier: 1 = inner, 2 = middle, 3 = outer */
  tier: 1 | 2 | 3;
  /** Angle offset in degrees for initial orbital position */
  angle: number;
}

export const stackItems: StackItem[] = [
  // Tier 1 — core
  { name: "React", category: "frontend", tier: 1, angle: 0 },
  { name: "TypeScript", category: "frontend", tier: 1, angle: 90 },
  { name: "Node.js", category: "backend", tier: 1, angle: 180 },
  { name: "PostgreSQL", category: "backend", tier: 1, angle: 270 },

  // Tier 2 — strong
  { name: "Vite", category: "tooling", tier: 2, angle: 45 },
  { name: "Tailwind", category: "frontend", tier: 2, angle: 135 },
  { name: "Express.js", category: "backend", tier: 2, angle: 90 },
  { name: "Supabase", category: "infra", tier: 2, angle: 270 },
  { name: "Framer", category: "frontend", tier: 2, angle: 225 },
  { name: "React Router", category: "frontend", tier: 2, angle: 315 },
  { name: "Fly.io", category: "infra", tier: 2, angle: 0 },
  { name: "Neon", category: "infra", tier: 2, angle: 180 },

  // Tier 3 — supporting
  { name: "Cloudinary", category: "infra", tier: 3, angle: 20 },
  { name: "Nest.js", category: "backend", tier: 3, angle: 60 },
  { name: "Paystack", category: "backend", tier: 3, angle: 80 },
  { name: "Vercel", category: "infra", tier: 3, angle: 140 },
  { name: "Git", category: "tooling", tier: 3, angle: 200 },
  { name: "Resend", category: "backend", tier: 3, angle: 260 },
  { name: "Docker", category: "infra", tier: 3, angle: 320 },
  { name: "MongoDB", category: "backend", tier: 3, angle: 300 },
];

export const categoryColor: Record<StackItem["category"], string> = {
  frontend: "text-accent",
  backend: "text-accent2",
  infra: "text-foreground",
  tooling: "text-muted",
};
