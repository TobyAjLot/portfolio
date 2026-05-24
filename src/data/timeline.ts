export interface TimelineEvent {
  year: string;
  title: string;
  description: string;
  type: "build" | "found" | "learn" | "ship";
}

export const timeline: TimelineEvent[] = [
  {
    year: "2023",
    title: "Deep Dive into API Architecture",
    description:
      "Went deep on server-side development and building robust APIs, while mastering React to bridge the gap between frontend and backend.",
    type: "learn",
  },
  {
    year: "2024",
    title: "First Production Systems",
    description:
      "Shipped real-world backend services, managed production databases, and learned how architectural decisions compound over time.",
    type: "build",
  },
  {
    year: "2025",
    title: "Co-founded TekBreed",
    description:
      "Stepped into the executive role to steer growth, operations, and strategy for an interactive developer learning platform.",
    type: "found",
  },
  {
    year: "2026",
    title: "Architecting LenguaX",
    description:
      "Designing a peer-to-peer language exchange platform, engineering real-time matching and asynchronous voice architecture using WebRTC and WebSockets.",
    type: "ship",
  },
];
