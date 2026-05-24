/* ─────────────────────────────────────────────────────────────────────────────
   Chat Engine
   ─────────────────────────────────────────────────────────────────────────────
   Abstracts the AI backend so swapping from pre-scripted → Groq/Claude
   is a single function change: use your live engine
   in ChatWidget.tsx.
───────────────────────────────────────────────────────────────────────────── */

export interface ChatEngine {
  sendMessage(userInput: string): Promise<string>;
}

// ─── Response Bank ────────────────────────────────────────────────────────────

interface ResponseRule {
  keywords: string[];
  response: string;
}

const rules: ResponseRule[] = [
  {
    keywords: ["who", "tobi", "toby", "you", "yourself", "about"],
    response:
      "I'm Tobi Ajasa-Lot — a Full-Stack Software Engineer and Startup Founder based in Nigeria. I operate at the intersection of robust backend systems, hyper-optimized frontends, and emerging technologies. I don't just write code; I build ecosystems. Right now, I'm the CEO and Co-Founder of TekBreed.",
  },
  {
    keywords: [
      "tekbreed",
      "tektchat",
      "tekfchat",
      "education",
      "learning",
      "course",
      "developer",
      "engineer",
      "senior",
    ],
    response:
      "TekBreed is an interactive developer learning platform I co-founded. My focus there is entirely on driving growth, strategy, and operational execution, while my co-founder leads the core engine architecture.",
  },
  {
    keywords: [
      "tekchat",
      "ai",
      "chat",
      "artificial intelligence",
      "machine learning",
    ],
    response:
      "TekChat is TekBreed's AI-powered learning workspace. The key differentiator isn't just that it's AI — it's the mastery tracking layer. It remembers where a developer struggles, adapts, and builds a persistent picture of their growth. Currently the flagship feature of TekBreed.",
  },
  {
    keywords: [
      "lenguax",
      "spanish",
      "language",
      "p2p",
      "peer",
      "webrtc",
      "websocket",
    ],
    response:
      "LenguaX is a peer-to-peer language exchange platform I'm currently architecting. It's engineered as a hybrid monolith using a Node.js backend with WebSockets (Socket.io) for real-time matchmaking, P2P WebRTC for live audio interaction, and Supabase storage to handle asynchronous voice notes.",
  },
  {
    keywords: [
      "stack",
      "tech",
      "technology",
      "tools",
      "language",
      "framework",
      "use",
    ],
    response:
      "Core stack: React, TypeScript, Node.js, Express.js, PostgreSQL (Neon), Tailwind CSS, Framer Motion. For infra: Fly.io, Vercel, Cloudinary. For payments: Paystack, Flutterwave, Polar. I lean strongly toward TypeScript-first, component-driven architectures with a clean separation between UI, data, and business logic.",
  },
  {
    keywords: [
      "available",
      "hire",
      "freelance",
      "work",
      "contract",
      "collaborate",
      "project",
    ],
    response:
      "I'm always open to meaningful collaborations, technical conversations, and high-quality opportunities that align with my trajectory. The best way to start a conversation is via LinkedIn or email, links are right in the contact section.",
  },
  {
    keywords: ["contact", "reach", "email", "linkedin", "github", "connect"],
    response:
      "Scroll to the bottom of this page — all contact links are there. LinkedIn and GitHub are the fastest ways to connect. Email if it's serious.",
  },
  {
    keywords: [
      "location",
      "based",
      "where",
      "live",
      "country",
      "city",
      "lagos",
      "africa",
    ],
    response:
      "Based in Nigeria. Operating out of the local ecosystem while engineering platforms and tools designed to scale globally.",
  },
];

const fallbacks = [
  "I don't have a scripted answer for that — but Tobi's contact links are at the bottom of the page. He responds.",
  "Hmm, I'm not sure about that one. Try asking about TekBreed, BBM, or his stack.",
  "That's outside what I know. Check the projects section or reach out directly via the contact links.",
];

// ─── Pre-scripted Engine ──────────────────────────────────────────────────────

function matchResponse(input: string): string {
  const normalized = input.toLowerCase();
  for (const rule of rules) {
    if (rule.keywords.some((kw) => normalized.includes(kw))) {
      return rule.response;
    }
  }
  return fallbacks[Math.floor(Math.random() * fallbacks.length)];
}

export const prescriptedEngine: ChatEngine = {
  async sendMessage(userInput: string): Promise<string> {
    // Simulate a brief "thinking" delay for realism
    await new Promise((r) => setTimeout(r, 600 + Math.random() * 400));
    return matchResponse(userInput);
  },
};

// ─── Live Groq Engine with Graceful Fallback ────────────────────────────────
import Groq from "groq-sdk";
import { SYSTEM_PROMPT } from "./systemPrompt";

const groq = new Groq({
  apiKey: import.meta.env.VITE_GROQ_API_KEY || "",
  dangerouslyAllowBrowser: true,
});

export const groqEngine: ChatEngine = {
  async sendMessage(userInput: string): Promise<string> {
    // If the API key isn't loaded, instantly fall back to the pre-scripted bank
    if (!import.meta.env.VITE_GROQ_API_KEY) {
      return prescriptedEngine.sendMessage(userInput);
    }

    try {
      const res = await groq.chat.completions.create({
        model: "llama-3.3-70b-versatile",
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          { role: "user", content: userInput },
        ],
        max_tokens: 150,
      });
      return res.choices[0]?.message?.content ?? "No response.";
    } catch (error) {
      console.warn("Groq API error, failing over to local engine:", error);
      // Seamlessly answer via the fallback engine if network or limits fail
      return prescriptedEngine.sendMessage(userInput);
    }
  },
};
