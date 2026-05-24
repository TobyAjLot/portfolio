export interface Project {
  id: string;
  name: string;
  tagline: string;
  description: string;
  stack: string[];
  status: "live" | "building" | "beta";
  liveUrl?: string;
  repoUrl?: string;
  accent: string; // tailwind text color class
}

export const projects: Project[] = [
  {
    id: "lenguax",
    name: "LenguaX",
    tagline:
      "Peer-to-peer language exchange engineered for real-time immersion.",
    description:
      "A real-time and asynchronous language acquisition platform that connects native speakers. Built with a hybrid monolithic Node.js backend using WebSockets (Socket.io) for live matchmaking and P2P WebRTC audio integration, backed by Supabase storage for asynchronous audio exchange.",
    stack: [
      "React",
      "Node.js",
      "Socket.io",
      "WebRTC",
      "Supabase",
      "PostgreSQL",
    ],
    status: "building",
    repoUrl: "https://github.com/TobyAjLot/lenguaX",
    accent: "text-accent",
  },
];
