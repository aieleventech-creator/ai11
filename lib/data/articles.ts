import { Article } from '../types';

export const ARTICLES: Article[] = [
  {
    id: 'article-cursor-vs-copilot',
    title: 'Cursor vs GitHub Copilot: Which AI Code Editor Boosts Engineering Velocity?',
    slug: 'cursor-vs-github-copilot',
    excerpt: 'An in-depth architecture comparison of whole-codebase indexing, multi-file agentic edits, and real-world developer workflows in 2026.',
    category: 'Coding & Dev',
    author: {
      name: 'Alex Rivera',
      role: 'Staff Systems Architect',
    },
    publishedAt: 'Oct 04, 2026',
    readTime: '6 min read',
    tags: ['Coding', 'Developer Tools', 'Cursor', 'Copilot'],
  },
  {
    id: 'article-reasoning-models',
    title: 'Reasoning Models in Production: Where Test-Time Compute Actually Delivers ROI',
    slug: 'reasoning-models-in-production',
    excerpt: 'When to route tasks to heavy reasoning architectures versus fast latent inference for enterprise pipelines and structured data extraction.',
    category: 'Research & Data',
    author: {
      name: 'Elena Rostova',
      role: 'AI Infrastructure Lead',
    },
    publishedAt: 'Oct 01, 2026',
    readTime: '8 min read',
    tags: ['Reasoning', 'LLMs', 'Benchmarking'],
  },
  {
    id: 'article-voice-agents-future',
    title: 'The Sub-500ms Voice Agent Stack: Real-Time Audio Synthesis Breakdown',
    slug: 'sub-500ms-voice-agent-stack',
    excerpt: 'Examining speech-to-speech architectures, turn detection heuristics, and ultra-low latency pipelines transforming conversational automation.',
    category: 'Audio & Voice',
    author: {
      name: 'Marcus Vance',
      role: 'Voice AI Specialist',
    },
    publishedAt: 'Sep 27, 2026',
    readTime: '5 min read',
    tags: ['Voice AI', 'Latency', 'Real-time'],
  },
  {
    id: 'article-evaluating-ai-tools',
    title: 'The AI Stack Evaluation Framework: How Technical Teams Avoid Tool Sprawl',
    slug: 'ai-stack-evaluation-framework',
    excerpt: 'A pragmatic decision matrix for evaluating enterprise privacy, model lock-in, seat economics, and security across emerging AI tools.',
    category: 'Productivity',
    author: {
      name: 'Sarah Chen',
      role: 'VP of Technology',
    },
    publishedAt: 'Sep 22, 2026',
    readTime: '7 min read',
    tags: ['Strategy', 'Enterprise', 'Tooling'],
  },
];
