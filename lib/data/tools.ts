import { Tool } from '../types';

export const TOOLS: Tool[] = [
  // --- CODING & DEV ---
  {
    id: 'tool-cursor',
    name: 'Cursor',
    slug: 'cursor',
    tagline: 'The AI-first code editor built for engineer velocity',
    description: 'An AI-powered fork of VS Code engineered from the ground up for deep codebase indexing, multi-file edits, and inline agentic completions.',
    longDescription: 'Cursor is an advanced code editor built specifically for software engineering with artificial intelligence. Built on top of VS Code, it indexes your entire local and remote repository to provide context-aware chat, multi-file refactoring, autonomous bug fixing, and predictive cursor tab completions that anticipate your next line of code.',
    websiteUrl: 'https://cursor.com',
    pricing: 'Freemium',
    startingPrice: '$20/month',
    priceNote: 'Free tier with monthly completions; Pro at $20/mo',
    categoryId: 'coding',
    category: 'Coding & Dev',
    categorySlug: 'coding',
    tags: ['IDE', 'Code Generation', 'Agentic Edit', 'Developer Velocity'],
    features: [
      'Full codebase indexing and semantic symbol graph',
      'Multi-file editing via Composer agent',
      'Inline predictive Tab autocompletions',
      'One-click terminal command and error debugging',
      'Support for Claude 3.7 Sonnet, GPT-4o, and custom API keys'
    ],
    pros: [
      'Direct fork of VS Code preserving all existing extensions and keybindings',
      'Unmatched multi-file context comprehension and diff generation',
      'Rapid feedback loop directly in your workspace'
    ],
    cons: [
      'Requires downloading a dedicated editor instead of a standard extension',
      'Pro plan usage limits during peak server load'
    ],
    bestFor: ['Software engineers', 'Full-stack developers', 'Technical founders'],
    platforms: ['macOS', 'Windows', 'Linux'],
    isFeatured: true,
    isTrending: true,
    isVerified: true,
    isPublished: true,
    curatedRank: 1,
    editorialBadge: 'Editor Choice',
    accentColor: '#6366f1',
    faq: [
      {
        question: 'Does Cursor work with existing VS Code extensions?',
        answer: 'Yes, Cursor is a fork of VS Code and imports your extensions, themes, settings, and keybindings with one click during setup.'
      },
      {
        question: 'Can I use my own OpenAI or Anthropic API keys?',
        answer: 'Yes, Cursor allows users to input their own API keys for model calls without extra platform markup.'
      }
    ],
    createdAt: '2024-01-15T00:00:00.000Z',
    updatedAt: '2026-10-01T00:00:00.000Z'
  },
  {
    id: 'tool-github-copilot',
    name: 'GitHub Copilot',
    slug: 'github-copilot',
    tagline: 'Your AI pair programmer integrated across major IDEs',
    description: 'The industry-standard AI pair programmer providing contextual code suggestions, doc generation, and test scaffolding directly in your editor.',
    longDescription: 'GitHub Copilot is Microsoft and GitHub’s flagship AI pair programming tool. Powered by OpenAI models and specialized coding fine-tunes, Copilot suggests whole lines, functions, tests, and documentation inside Visual Studio Code, Visual Studio, JetBrains IDEs, and Neovim.',
    websiteUrl: 'https://github.com/features/copilot',
    pricing: 'Paid',
    startingPrice: '$10/month',
    priceNote: 'Free for verified students and popular open source maintainers',
    categoryId: 'coding',
    category: 'Coding & Dev',
    categorySlug: 'coding',
    tags: ['IDE Extension', 'Pair Programming', 'GitHub', 'Autocompletion'],
    features: [
      'Inline suggestions across 30+ programming languages',
      'Copilot Chat inside sidebar and editor canvas',
      'Copilot Workspace for issue-to-pull-request workflows',
      'Pull request summaries and automated commit message generation'
    ],
    pros: [
      'Native integration with GitHub pull requests and issues',
      'Runs as an extension in VS Code, JetBrains, and Neovim',
      'Enterprise-grade IP indemnity and privacy controls'
    ],
    cons: [
      'Whole-codebase context is more conservative than dedicated AI IDEs',
      'No permanent free tier for individual professionals'
    ],
    bestFor: ['Enterprise engineering teams', 'JetBrains users', 'GitHub-centric workflows'],
    platforms: ['macOS', 'Windows', 'Linux', 'Web'],
    isFeatured: true,
    isTrending: false,
    isVerified: true,
    isPublished: true,
    curatedRank: 4,
    editorialBadge: 'Enterprise Standard',
    accentColor: '#24292f',
    faq: [
      {
        question: 'Which IDEs does GitHub Copilot support?',
        answer: 'GitHub Copilot supports VS Code, Visual Studio, JetBrains IDE suite (IntelliJ, PyCharm, WebStorm), and Neovim.'
      }
    ],
    createdAt: '2022-06-21T00:00:00.000Z',
    updatedAt: '2026-09-15T00:00:00.000Z'
  },
  {
    id: 'tool-v0',
    name: 'v0 by Vercel',
    slug: 'v0',
    tagline: 'Generative UI system crafting clean React and Tailwind code',
    description: 'A prompt-driven UI generation engine that produces accessible React components and full responsive views ready to copy into your Next.js project.',
    longDescription: 'v0 by Vercel uses generative AI to convert natural language prompts and design screenshots into production-quality, accessible React code styled with Tailwind CSS and Radix UI primitives. It lets developers iterate on frontend designs collaboratively and copy clean code straight into their repos.',
    websiteUrl: 'https://v0.dev',
    pricing: 'Freemium',
    startingPrice: '$20/month',
    priceNote: 'Free monthly credits; Premium at $20/mo',
    categoryId: 'coding',
    category: 'Coding & Dev',
    categorySlug: 'coding',
    tags: ['React', 'Next.js', 'Tailwind CSS', 'UI Generation', 'Frontend'],
    features: [
      'Interactive visual preview with hot code editing',
      'One-click export to Next.js via shadcn/ui CLI',
      'Vision input allowing image or wireframe reproduction',
      'Figma import support and version history branching'
    ],
    pros: [
      'Clean, accessible semantic HTML and Radix UI foundations',
      'Seamless deployment to Vercel preview environments',
      'Dramatically accelerates frontend prototyping'
    ],
    cons: [
      'Primarily focused on React and Tailwind ecosystems',
      'Complex custom state management still requires manual refinement'
    ],
    bestFor: ['Frontend engineers', 'Product designers', 'Founders building MVPs'],
    platforms: ['Web'],
    isFeatured: true,
    isTrending: false,
    isVerified: true,
    isPublished: true,
    curatedRank: 5,
    editorialBadge: 'Top UI Builder',
    accentColor: '#000000',
    faq: [
      {
        question: 'What libraries does v0 generate code for?',
        answer: 'v0 generates standard React and Next.js components utilizing Tailwind CSS and shadcn/ui accessible primitives.'
      }
    ],
    createdAt: '2023-10-01T00:00:00.000Z',
    updatedAt: '2026-09-20T00:00:00.000Z'
  },
  {
    id: 'tool-lovable',
    name: 'Lovable',
    slug: 'lovable',
    tagline: 'Autonomous full-stack web software engineer in your browser',
    description: 'Prompt-driven full stack development platform that plans, builds, connects Supabase databases, and deploys scalable web applications in minutes.',
    longDescription: 'Lovable is an autonomous AI software engineer designed to build complete web applications from conversational specs. It provisions backends, integrates Supabase authentication and databases, renders interactive interfaces, and synchronizes with GitHub repositories.',
    websiteUrl: 'https://lovable.dev',
    pricing: 'Freemium',
    startingPrice: '$20/month',
    priceNote: 'Free tier with daily edits; Pro from $20/mo',
    categoryId: 'coding',
    category: 'Coding & Dev',
    categorySlug: 'coding',
    tags: ['Full-stack', 'Autonomous', 'Supabase', 'No-code to Code'],
    features: [
      'End-to-end full stack web application generation',
      'Automated Supabase database schema setup & auth',
      'Bi-directional GitHub sync with clean commits',
      'In-browser instant live staging preview'
    ],
    pros: [
      'Builds working full-stack apps with auth and database in minutes',
      'No vendor lock-in with standard Vite/React GitHub export',
      'Intuitive visual feedback loops'
    ],
    cons: [
      'High token usage on complex refactors',
      'Large enterprise codebases are better suited for dedicated IDEs'
    ],
    bestFor: ['Solopreneurs', 'Growth marketers', 'Rapid prototype engineers'],
    platforms: ['Web'],
    isFeatured: false,
    isTrending: true,
    isVerified: true,
    isPublished: true,
    curatedRank: 6,
    editorialBadge: 'Trending',
    accentColor: '#f43f5e',
    faq: [
      {
        question: 'Do I own the code generated by Lovable?',
        answer: 'Yes, Lovable syncs with your GitHub repository and exports standard React/TypeScript and Supabase code with zero runtime lock-in.'
      }
    ],
    createdAt: '2024-08-01T00:00:00.000Z',
    updatedAt: '2026-10-05T00:00:00.000Z'
  },
  {
    id: 'tool-bolt',
    name: 'Bolt.new',
    slug: 'bolt-new',
    tagline: 'In-browser AI development environment powered by WebContainers',
    description: 'An AI-driven in-browser IDE that runs Node.js environments inside the browser to build, run, and deploy full-stack apps.',
    longDescription: 'Bolt.new by StackBlitz leverages WebContainers technology to bring an entire Node.js development server and terminal into the browser. Users prompt for features or bug fixes, and Bolt plans changes, installs NPM packages, and executes code directly inside client sandbox.',
    websiteUrl: 'https://bolt.new',
    pricing: 'Freemium',
    startingPrice: '$20/month',
    priceNote: 'Free tier with token quota; Pro tier from $20/mo',
    categoryId: 'coding',
    category: 'Coding & Dev',
    categorySlug: 'coding',
    tags: ['WebContainers', 'In-browser IDE', 'Full-stack', 'NPM'],
    features: [
      'Runs Node.js, Next.js, Remix, and Vite inside the browser',
      'Installs real NPM dependencies with no remote container lag',
      'Integrated web preview and live terminal output',
      'One-click Netlify and GitHub deployment'
    ],
    pros: [
      'Zero local setup required; works on Chromebooks and tablets',
      'Executes real server-side JavaScript in browser memory',
      'Fast iteration for prototypes and micro-tools'
    ],
    cons: [
      'Memory constraints on very large node_modules trees',
      'Browser tab reload can interrupt unsaved sessions'
    ],
    bestFor: ['Educators', 'Prototype engineers', 'Hackathon builders'],
    platforms: ['Web'],
    isFeatured: false,
    isTrending: true,
    isVerified: true,
    isPublished: true,
    curatedRank: 7,
    editorialBadge: 'Trending',
    accentColor: '#0ea5e9',
    faq: [
      {
        question: 'Can Bolt install any NPM package?',
        answer: 'Bolt supports most Node.js compatible NPM packages running within StackBlitz WebContainer architecture.'
      }
    ],
    createdAt: '2024-09-10T00:00:00.000Z',
    updatedAt: '2026-10-02T00:00:00.000Z'
  },

  // --- WRITING & CONTENT ---
  {
    id: 'tool-claude',
    name: 'Claude',
    slug: 'claude',
    tagline: 'Deep reasoning, nuanced writing, and complex system coding',
    description: 'Anthropic’s flagship frontier model built for long-form contextual comprehension, safe reasoning, high-precision code, and document analysis.',
    longDescription: 'Claude is an AI assistant developed by Anthropic, engineered around constitutional AI principles. Renowned for natural and nuanced writing, rigorous technical reasoning, and a massive 200k+ context window, Claude excels at analyzing vast documents, synthesizing research, and generating robust application code with interactive Artifacts.',
    websiteUrl: 'https://claude.ai',
    pricing: 'Freemium',
    startingPrice: '$20/month',
    priceNote: 'Free tier available; Pro at $20/mo; Team plan at $30/user/mo',
    categoryId: 'writing',
    category: 'Writing & Content',
    categorySlug: 'writing',
    tags: ['Long Context', 'Artifacts', 'Reasoning', 'Technical Writing'],
    features: [
      '200,000 token context window for book-length documents',
      'Interactive Artifacts canvas for code, SVG, and markdown',
      'Projects workspace with persistent grounding documents',
      'Claude 3.7 Sonnet hybrid reasoning capabilities'
    ],
    pros: [
      'Best-in-class natural tone and long-form prose coherence',
      'Superb mathematical and code architectural comprehension',
      'Safe and helpful constitutional alignment'
    ],
    cons: [
      'Free tier message limits can be strict during high traffic',
      'No native internet search integration in basic consumer interface'
    ],
    bestFor: ['Researchers', 'Writers & editors', 'Senior engineers'],
    platforms: ['Web', 'iOS', 'Android', 'API'],
    isFeatured: true,
    isTrending: true,
    isVerified: true,
    isPublished: true,
    curatedRank: 2,
    editorialBadge: 'Top Frontier Model',
    accentColor: '#d97706',
    faq: [
      {
        question: 'What are Claude Artifacts?',
        answer: 'Artifacts are dedicated side-by-side UI panels that render standalone code, interactive web components, SVG graphics, and long documents created by Claude.'
      }
    ],
    createdAt: '2023-03-14T00:00:00.000Z',
    updatedAt: '2026-10-06T00:00:00.000Z'
  },
  {
    id: 'tool-chatgpt',
    name: 'ChatGPT',
    slug: 'chatgpt',
    tagline: 'Conversational AI, frontier reasoning, and multimodal assistant',
    description: 'Leading conversational LLM by OpenAI capable of reasoning, writing, coding analysis, voice interaction, and data interpretation.',
    longDescription: 'ChatGPT is OpenAI’s renowned conversational AI platform. Powered by GPT-4o and advanced reasoning models (o1/o3), it provides natural voice dialogues, image analysis, Python data execution via Advanced Data Analysis, web browsing, and custom GPTs for specialized domain assistance.',
    websiteUrl: 'https://chatgpt.com',
    pricing: 'Freemium',
    startingPrice: '$20/month',
    priceNote: 'Free tier with GPT-4o mini; Plus at $20/mo; Pro at $200/mo',
    categoryId: 'writing',
    category: 'Writing & Content',
    categorySlug: 'writing',
    tags: ['Conversational', 'Reasoning', 'Vision', 'Voice Mode'],
    features: [
      'Advanced Voice Mode with real-time inflection and cadence',
      'Python sandbox for data science and visualization',
      'Web search with inline links and source attributions',
      'Custom GPTs marketplace and personal workspace memories'
    ],
    pros: [
      'Extremely versatile across writing, coding, math, and analysis',
      'Native mobile voice conversations feel remarkably human',
      'Expansive ecosystem of integrations and custom GPTs'
    ],
    cons: [
      'Can occasionally hallucinate citations without web search active',
      'Output style can feel formulaic without tailored custom instructions'
    ],
    bestFor: ['General consumers', 'Product managers', 'Data analysts', 'Students'],
    platforms: ['Web', 'macOS', 'Windows', 'iOS', 'Android', 'API'],
    isFeatured: true,
    isTrending: false,
    isVerified: true,
    isPublished: true,
    curatedRank: 3,
    editorialBadge: 'Top Pick',
    accentColor: '#10a37f',
    faq: [
      {
        question: 'Can ChatGPT analyze uploaded spreadsheets and PDFs?',
        answer: 'Yes, ChatGPT can inspect, execute Python calculations on, and visualize CSVs, Excel files, and PDF documents.'
      }
    ],
    createdAt: '2022-11-30T00:00:00.000Z',
    updatedAt: '2026-10-04T00:00:00.000Z'
  },
  {
    id: 'tool-grammarly',
    name: 'Grammarly',
    slug: 'grammarly',
    tagline: 'AI communication assistant for clarity, tone, and grammar',
    description: 'Real-time writing companion that analyzes sentence structure, tone, grammatical accuracy, and generates context-aware revisions.',
    longDescription: 'Grammarly is an established writing assistance platform enhanced with generative AI. Working seamlessly across web browsers, desktop apps, and mobile keyboards, Grammarly highlights spelling and syntax flaws, adjusts formal tone, and generates rewrites tailored to your audience.',
    websiteUrl: 'https://grammarly.com',
    pricing: 'Freemium',
    startingPrice: '$12/month',
    priceNote: 'Free basic plan; Premium from $12/mo billed annually',
    categoryId: 'writing',
    category: 'Writing & Content',
    categorySlug: 'writing',
    tags: ['Grammar', 'Tone Adjustment', 'Proofreading', 'Desktop Companion'],
    features: [
      'Real-time grammar, punctuation, and clarity corrections',
      'Tone detector and audience alignment slider',
      'Generative rewrite suggestions and paragraph summarization',
      'Plagiarism checking across billions of web pages'
    ],
    pros: [
      'Unobtrusive desktop and browser extension presence',
      'High accuracy on professional and academic conventions',
      'Team style guides for enterprise brand consistency'
    ],
    cons: [
      'Premium pricing required for advanced style suggestions',
      'Can occasionally over-simplify creative literary writing'
    ],
    bestFor: ['Corporate communicators', 'Students', 'Non-native English writers'],
    platforms: ['Web', 'macOS', 'Windows', 'iOS', 'Android'],
    isFeatured: false,
    isTrending: false,
    isVerified: true,
    isPublished: true,
    curatedRank: 12,
    editorialBadge: 'Communication Standard',
    accentColor: '#15c39a',
    faq: [
      {
        question: 'Does Grammarly work across Google Docs and Microsoft Word?',
        answer: 'Yes, Grammarly provides dedicated add-ins for Google Docs, Word, and desktop operating systems.'
      }
    ],
    createdAt: '2020-01-01T00:00:00.000Z',
    updatedAt: '2026-08-10T00:00:00.000Z'
  },
  {
    id: 'tool-jasper',
    name: 'Jasper AI',
    slug: 'jasper',
    tagline: 'Enterprise marketing and brand-voice content platform',
    description: 'AI content platform built for marketing teams to generate on-brand copy, campaigns, blog posts, and multi-channel marketing collateral.',
    longDescription: 'Jasper is an AI marketing copilot designed to help marketing organizations generate high-converting campaigns at scale. It ingests company style guides, brand knowledge, and audience personas to ensure all generated blogs, social posts, and ad copy match your distinct corporate tone.',
    websiteUrl: 'https://jasper.ai',
    pricing: 'Paid',
    startingPrice: '$39/month',
    priceNote: '7-day free trial; Creator from $39/mo; Pro from $59/mo',
    categoryId: 'marketing',
    category: 'Marketing & SEO',
    categorySlug: 'marketing',
    tags: ['Copywriting', 'Brand Voice', 'Content Marketing', 'Campaigns'],
    features: [
      'Company brand voice training on URLs and documents',
      'Multi-channel marketing campaign generation with 1-click',
      'SEO mode integrated with Surfer SEO audits',
      'Enterprise security and SOC2 compliance'
    ],
    pros: [
      'Ensures consistent tone across large marketing teams',
      'Robust library of 50+ battle-tested marketing templates',
      'Direct integrations with CMS and social channels'
    ],
    cons: [
      'No permanent free tier',
      'Can feel heavy for solo individuals needing basic writing'
    ],
    bestFor: ['Marketing departments', 'Content agencies', 'Brand managers'],
    platforms: ['Web'],
    isFeatured: false,
    isTrending: false,
    isVerified: true,
    isPublished: true,
    curatedRank: 15,
    editorialBadge: 'Marketing Standard',
    accentColor: '#ff5722',
    faq: [
      {
        question: 'How does Jasper learn our brand voice?',
        answer: 'You upload existing company content, whitepapers, or provide website links, and Jasper extracts your stylistic vocabulary and syntax rules.'
      }
    ],
    createdAt: '2021-02-01T00:00:00.000Z',
    updatedAt: '2026-07-15T00:00:00.000Z'
  },

  // --- IMAGE GENERATION ---
  {
    id: 'tool-midjourney',
    name: 'Midjourney',
    slug: 'midjourney',
    tagline: 'State-of-the-art generative visual artistry and concept design',
    description: 'An independent research lab model generating photorealistic, stylistic, and artistic imagery through natural language prompts and web editor.',
    longDescription: 'Midjourney is widely regarded as the gold standard for artistic and photorealistic image synthesis. Supporting intricate prompt parameters, camera angles, lighting conditions, inpainting, outpainting, and character consistency, Midjourney powers concept art, marketing visuals, and creative moodboards globally.',
    websiteUrl: 'https://midjourney.com',
    pricing: 'Paid',
    startingPrice: '$10/month',
    priceNote: 'Basic tier at $10/mo; Standard at $30/mo; Pro at $60/mo',
    categoryId: 'image',
    category: 'Image Generation',
    categorySlug: 'image',
    tags: ['Generative Art', 'Photorealism', 'Concept Design', 'Visual Aesthetics'],
    features: [
      'Exceptional photorealism, textures, and lighting simulation',
      'Web-based canvas editor with pan, zoom, and regional inpainting',
      'Character and style reference matching (--cref / --sref)',
      'Community explorer showcasing millions of curated prompt recipes'
    ],
    pros: [
      'Unsurpassed aesthetic quality and artistic nuance',
      'Rich prompt syntax for aspect ratios, seeds, and styling',
      'Dedicated web interface eliminates previous Discord-only workflow'
    ],
    cons: [
      'No free tier available',
      'Text rendering inside complex graphics can still take multiple iterations'
    ],
    bestFor: ['Digital artists', 'Creative directors', 'Architects & concept designers'],
    platforms: ['Web'],
    isFeatured: true,
    isTrending: false,
    isVerified: true,
    isPublished: true,
    curatedRank: 8,
    editorialBadge: 'Top Visual Model',
    accentColor: '#8b5cf6',
    faq: [
      {
        question: 'Do I still need Discord to use Midjourney?',
        answer: 'No, Midjourney now offers a dedicated web application for generating, organizing, and inpainting images directly in your browser.'
      }
    ],
    createdAt: '2022-07-12T00:00:00.000Z',
    updatedAt: '2026-09-28T00:00:00.000Z'
  },
  {
    id: 'tool-flux',
    name: 'FLUX.1 by Black Forest Labs',
    slug: 'flux-1',
    tagline: 'Open-weights frontier image generator with superb typography',
    description: 'Next-generation image foundation model delivering prompt adherence, photorealistic anatomy, and crisp typography rendering.',
    longDescription: 'FLUX.1 is a state-of-the-art 12-billion parameter text-to-image suite created by Black Forest Labs. Built with a hybrid diffusion-transformer architecture, FLUX.1 excels at complex spatial relationships, rendered in-image text typography, realistic human anatomy, and open-weights accessibility.',
    websiteUrl: 'https://blackforestlabs.ai',
    pricing: 'Freemium',
    startingPrice: 'Free / API credits',
    priceNote: 'Open-weights (Schnell / Dev) free for local use; Pro via API',
    categoryId: 'image',
    category: 'Image Generation',
    categorySlug: 'image',
    tags: ['Open Weights', 'Typography', 'Photorealism', 'Transformer Diffusion'],
    features: [
      'Flawless in-image typography and poster text rendering',
      'Accurate human fingers, joints, and micro-expressions',
      'Available as open-weights for local GPU inference or cloud API',
      'Fast 4-step generation with FLUX.1 Schnell model'
    ],
    pros: [
      'Highest fidelity text rendering among contemporary diffusion models',
      'Can be hosted privately on your own local infrastructure',
      'Strong open-source ecosystem support across ComfyUI'
    ],
    cons: [
      'Local Dev/Pro models demand high VRAM (16GB+ recommended)',
      'Official web interface relies on third-party cloud aggregators'
    ],
    bestFor: ['AI researchers', 'Graphic designers', 'Open-source AI enthusiasts'],
    platforms: ['Web', 'API', 'Linux', 'Windows'],
    isFeatured: false,
    isTrending: true,
    isVerified: true,
    isPublished: true,
    curatedRank: 10,
    editorialBadge: 'Top Open Model',
    accentColor: '#000000',
    faq: [
      {
        question: 'Can FLUX.1 render text inside images accurately?',
        answer: 'Yes, FLUX.1 is widely recognized for rendering complex, multi-word typography and signage inside generated imagery.'
      }
    ],
    createdAt: '2024-08-01T00:00:00.000Z',
    updatedAt: '2026-10-01T00:00:00.000Z'
  },
  {
    id: 'tool-leonardo',
    name: 'Leonardo.ai',
    slug: 'leonardo-ai',
    tagline: 'Generative creative suite for game assets, marketing, and concept art',
    description: 'Full-featured creative canvas offering fine-tuned visual models, real-time canvas generation, and 3D texture mapping.',
    longDescription: 'Leonardo.ai is a comprehensive generative art platform tailored for creative studios, game asset developers, and digital illustrators. It provides real-time generation (Canvas Editor), fine-tuned community models, custom model training on your own assets, and motion generation.',
    websiteUrl: 'https://leonardo.ai',
    pricing: 'Freemium',
    startingPrice: '$12/month',
    priceNote: 'Free daily tokens; Paid tiers from $12/mo',
    categoryId: 'image',
    category: 'Image Generation',
    categorySlug: 'image',
    tags: ['Game Assets', 'Realtime Canvas', 'Texture Mapping', 'Custom Models'],
    features: [
      'Realtime Canvas with instant sketch-to-image synthesis',
      'Train custom models on your own visual IP and characters',
      'Universal Upscaler with detail and sharpness sliders',
      'Motion tool turning static images into micro-animations'
    ],
    pros: [
      'Generous daily free token allowance that resets daily',
      'Great control over specific game and illustration aesthetics',
      'Intuitive web canvas UI'
    ],
    cons: [
      'Photorealism can require fine-tuning compared to Midjourney',
      'Heavy feature set can feel overwhelming to beginners'
    ],
    bestFor: ['Game developers', 'Indie creators', 'Concept artists'],
    platforms: ['Web', 'iOS'],
    isFeatured: false,
    isTrending: false,
    isVerified: true,
    isPublished: true,
    curatedRank: 16,
    accentColor: '#ec4899',
    faq: [
      {
        question: 'Can I train models on my own artwork with Leonardo?',
        answer: 'Yes, Leonardo allows you to upload as few as 10–20 images to train a custom fine-tuned model for consistent style reproduction.'
      }
    ],
    createdAt: '2022-12-01T00:00:00.000Z',
    updatedAt: '2026-08-20T00:00:00.000Z'
  },

  // --- VIDEO & MOTION ---
  {
    id: 'tool-runway',
    name: 'Runway',
    slug: 'runway',
    tagline: 'Next-generation video synthesis and creative world models',
    description: 'Gen-3 Alpha generative video model suite delivering cinematic motion, camera control, character animation, and video-to-video transformations.',
    longDescription: 'Runway is an applied AI research company building generative world models for filmmaking and creative expression. Its flagship Gen-3 Alpha model delivers high-fidelity motion graphics, cinematic camera choreography, lipsync capabilities, and video-to-video stylistic transformations used by studios and indie filmmakers.',
    websiteUrl: 'https://runwayml.com',
    pricing: 'Freemium',
    startingPrice: '$12/month',
    priceNote: 'Free trial credits; Standard at $12/mo; Pro at $28/mo',
    categoryId: 'video',
    category: 'Video & Motion',
    categorySlug: 'video',
    tags: ['Video Generation', 'Gen-3 Alpha', 'Cinematic Motion', 'VFX'],
    features: [
      'Text-to-video and image-to-video with Gen-3 Alpha',
      'Precise camera controls (pan, tilt, zoom, dolly, orbit)',
      'Motion Brush for animating specific regions of an image',
      'Video-to-video stylistic transformations and audio lipsync'
    ],
    pros: [
      'Industry-leading cinematic consistency and lighting fidelity',
      'Granular control over motion vectors and camera physics',
      'Modern web video editing suite alongside generation tools'
    ],
    cons: [
      'High credit consumption per second of 4K video generation',
      'Fast action sequences occasionally exhibit physics artifacts'
    ],
    bestFor: ['Filmmakers', 'VFX artists', 'Video editors', 'Advertising agencies'],
    platforms: ['Web', 'iOS'],
    isFeatured: true,
    isTrending: true,
    isVerified: true,
    isPublished: true,
    curatedRank: 9,
    editorialBadge: 'Top Video Model',
    accentColor: '#ec4899',
    faq: [
      {
        question: 'Can Runway animate an existing still photo?',
        answer: 'Yes, Runway’s Image-to-Video feature allows you to upload any still photograph and prescribe camera motion or regional animations.'
      }
    ],
    createdAt: '2021-01-01T00:00:00.000Z',
    updatedAt: '2026-09-18T00:00:00.000Z'
  },
  {
    id: 'tool-heygen',
    name: 'HeyGen',
    slug: 'heygen',
    tagline: 'AI video generation and realistic avatar translation platform',
    description: 'Enterprise AI video platform converting scripts into realistic presenter videos with multilingual voice cloning and accurate lip synchronization.',
    longDescription: 'HeyGen transforms corporate communication, training videos, and marketing outreach through AI digital avatars. Users type a script, select a photorealistic or custom avatar, and receive a completed video presentation with natural expressions, gestures, and voice synthesis in 40+ languages.',
    websiteUrl: 'https://heygen.com',
    pricing: 'Freemium',
    startingPrice: '$29/month',
    priceNote: 'Free 1-credit trial; Creator from $29/mo; Business from $89/mo',
    categoryId: 'video',
    category: 'Video & Motion',
    categorySlug: 'video',
    tags: ['AI Avatars', 'Video Translation', 'Lip Sync', 'Corporate Training'],
    features: [
      'Photorealistic studio avatars and personalized custom digital twins',
      'Voice cloning and video translation preserving original speaker tone',
      'Interactive streaming avatars for real-time video chatbots',
      'Zapier and Canva video automation integrations'
    ],
    pros: [
      'Remarkable facial animation and natural mouth movement synchronization',
      'Translates existing videos into other languages while matching lips',
      'Saves thousands in physical studio production costs'
    ],
    cons: [
      'High-tier custom digital twin creation carries a setup fee',
      'Best suited for presentation style rather than dynamic action'
    ],
    bestFor: ['Corporate L&D', 'Sales outreach teams', 'Global localization agencies'],
    platforms: ['Web'],
    isFeatured: false,
    isTrending: false,
    isVerified: true,
    isPublished: true,
    curatedRank: 17,
    editorialBadge: 'Avatar Leader',
    accentColor: '#6366f1',
    faq: [
      {
        question: 'Does HeyGen clone my own voice and face?',
        answer: 'Yes, HeyGen supports creating custom personal avatars and cloning your authentic voice with appropriate verification consents.'
      }
    ],
    createdAt: '2022-11-01T00:00:00.000Z',
    updatedAt: '2026-08-15T00:00:00.000Z'
  },

  // --- AUDIO & VOICE ---
  {
    id: 'tool-elevenlabs',
    name: 'ElevenLabs',
    slug: 'elevenlabs',
    tagline: 'Hyper-realistic voice synthesis and multilingual speech AI',
    description: 'Leading voice AI platform offering context-aware text-to-speech, instant voice cloning, emotional inflection, and dubbing in 29+ languages.',
    longDescription: 'ElevenLabs is the industry pioneer in contextual, emotionally nuanced speech synthesis. Its proprietary generative voice models understand the emotional undertone of dialogue, adjusting pacing, breathiness, cadence, and drama automatically. It powers audiobooks, gaming NPCs, and global dubbing.',
    websiteUrl: 'https://elevenlabs.io',
    pricing: 'Freemium',
    startingPrice: '$5/month',
    priceNote: 'Free tier with 10k characters/mo; Starter at $5/mo; Creator at $22/mo',
    categoryId: 'audio',
    category: 'Audio & Voice',
    categorySlug: 'audio',
    tags: ['Voice Synthesis', 'Speech-to-Speech', 'Dubbing', 'Audiobooks'],
    features: [
      'Text-to-speech with contextual emotional inflection',
      'Instant voice cloning with a 1-minute audio sample',
      'Automated video dubbing preserving the original speaker voice',
      'Voice isolator and sound effects generator'
    ],
    pros: [
      'Most convincing and natural human inflection currently available',
      'Extensive voice library with thousands of community-verified voices',
      'Robust API with sub-200ms latency for conversational agents'
    ],
    cons: [
      'High usage character limits can scale quickly for long podcasts',
      'Voice cloning requires strict ethical verification'
    ],
    bestFor: ['Podcast producers', 'Game audio directors', 'Developers building voice bots'],
    platforms: ['Web', 'API', 'iOS', 'Android'],
    isFeatured: true,
    isTrending: true,
    isVerified: true,
    isPublished: true,
    curatedRank: 11,
    editorialBadge: 'Voice Leader',
    accentColor: '#14b8a6',
    faq: [
      {
        question: 'How fast is ElevenLabs conversational voice API?',
        answer: 'ElevenLabs provides ultra-low latency streaming APIs suitable for sub-second conversational voice agent interactions.'
      }
    ],
    createdAt: '2022-09-01T00:00:00.000Z',
    updatedAt: '2026-10-02T00:00:00.000Z'
  },
  {
    id: 'tool-suno',
    name: 'Suno',
    slug: 'suno',
    tagline: 'Make radio-quality songs with vocals and instrumentation in seconds',
    description: 'Generative music platform creating full compositions across genres with realistic singing vocals, harmonies, and dynamic arrangements.',
    longDescription: 'Suno enables anyone to generate full-length songs with vocals, instruments, and lyrics across any musical genre from a simple text description. Powered by v3/v4 models, Suno produces clean audio fidelity with verse-chorus-bridge structures across jazz, EDM, rock, pop, and acoustic styles.',
    websiteUrl: 'https://suno.com',
    pricing: 'Freemium',
    startingPrice: '$10/month',
    priceNote: 'Free 50 daily credits; Pro at $10/mo; Premier at $30/mo',
    categoryId: 'audio',
    category: 'Audio & Voice',
    categorySlug: 'audio',
    tags: ['Music Generation', 'Vocals', 'Songwriting', 'Composition'],
    features: [
      'Full song generation with vocals, instruments, and lyrics',
      'Custom lyrics mode for setting your own poetry to music',
      'Song extension and cover remix capabilities',
      'High-fidelity stems separation on Pro tiers'
    ],
    pros: [
      'Shockingly musical song structures and vocal harmonies',
      'Supports almost any conceivable genre and fusion style',
      'Generous free credits every single day'
    ],
    cons: [
      'Commercial rights require an active paid subscription during generation',
      'Mixing master cannot be tweaked by individual track without stem export'
    ],
    bestFor: ['Songwriters', 'Video creators', 'Game developers', 'Hobbyists'],
    platforms: ['Web', 'iOS', 'Android'],
    isFeatured: false,
    isTrending: true,
    isVerified: true,
    isPublished: true,
    curatedRank: 14,
    editorialBadge: 'Music Leader',
    accentColor: '#f97316',
    faq: [
      {
        question: 'Do I own the commercial rights to songs created on Suno?',
        answer: 'Subscribers on Pro or Premier plans own the commercial rights to songs generated during their active subscription.'
      }
    ],
    createdAt: '2023-12-01T00:00:00.000Z',
    updatedAt: '2026-09-10T00:00:00.000Z'
  },

  // --- RESEARCH & DATA ---
  {
    id: 'tool-perplexity',
    name: 'Perplexity AI',
    slug: 'perplexity',
    tagline: 'Conversational answer engine with real-time academic citations',
    description: 'AI-powered answer engine combining web indexing and neural search to deliver sourced answers with direct citations and follow-up threads.',
    longDescription: 'Perplexity AI is a conversational search engine that replaces blue links with direct, comprehensive answers grounded in verified web sources. Every claim includes clickable footnote citations. Users can scope searches to Academic papers, YouTube, Reddit, or the entire live web, and organize deep research into collaborative Collections.',
    websiteUrl: 'https://perplexity.ai',
    pricing: 'Freemium',
    startingPrice: '$20/month',
    priceNote: 'Free tier with standard search; Pro at $20/mo',
    categoryId: 'research',
    category: 'Research & Data',
    categorySlug: 'research',
    tags: ['Search Engine', 'Citations', 'Research', 'Real-time Web'],
    features: [
      'Real-time web browsing with interactive footnote citations',
      'Pro Search for multi-step reasoning and mathematical queries',
      'Focus modes: Academic, Writing, WolframAlpha, YouTube, Reddit',
      'Collections for sharing research threads with colleagues'
    ],
    pros: [
      'Transparent attribution prevents hidden hallucinations',
      'Saves hours compared to reading through ten individual web search results',
      'Choice between leading models: Claude 3.7, GPT-4o, and Sonar'
    ],
    cons: [
      'Free tier limits daily Pro multi-step search queries',
      'Occasionally quotes outdated blog articles if top-ranked in SEO'
    ],
    bestFor: ['Knowledge workers', 'Academics', 'Founders', 'Journalists'],
    platforms: ['Web', 'macOS', 'Windows', 'iOS', 'Android', 'API'],
    isFeatured: true,
    isTrending: false,
    isVerified: true,
    isPublished: true,
    curatedRank: 13,
    editorialBadge: 'Search Leader',
    accentColor: '#0ea5e9',
    faq: [
      {
        question: 'How does Perplexity verify facts?',
        answer: 'Perplexity crawls live web and academic sources in real-time, extracting quotes and linking each statement to a primary reference link.'
      }
    ],
    createdAt: '2022-08-01T00:00:00.000Z',
    updatedAt: '2026-10-03T00:00:00.000Z'
  },
  {
    id: 'tool-notebooklm',
    name: 'NotebookLM',
    slug: 'notebooklm',
    tagline: 'Personalized source-grounded research notebook & audio summaries',
    description: 'Google’s experimental research companion that grounds responses strictly in your uploaded documents and synthesizes dynamic conversational podcasts.',
    longDescription: 'NotebookLM is a personalized AI research assistant built by Google. Unlike general chatbots, NotebookLM grounds all responses strictly within your uploaded sources (PDFs, Google Docs, slides, web URLs, YouTube videos). Its groundbreaking Audio Overview feature synthesizes your notes into a natural two-host conversational podcast breakdown.',
    websiteUrl: 'https://notebooklm.google.com',
    pricing: 'Free',
    startingPrice: 'Free',
    priceNote: 'Completely free with standard Google account',
    categoryId: 'research',
    category: 'Research & Data',
    categorySlug: 'research',
    tags: ['Document Grounding', 'Audio Overview', 'Google', 'Citations', 'Notebook'],
    features: [
      'Grounds answers strictly in up to 50 sources per notebook',
      'Audio Overview generates a two-person conversational podcast from notes',
      'Direct inline citation markers linking to exact page quotes',
      'Supports PDFs, Google Docs, web links, and YouTube video transcripts'
    ],
    pros: [
      'Completely free with no subscription barriers',
      'Zero hallucination drift outside your provided source materials',
      'Audio Overview is unmatched for absorbing dense research on commutes'
    ],
    cons: [
      'Cannot browse the general web independently without provided sources',
      'Audio Overview script cannot be edited line-by-line prior to generation'
    ],
    bestFor: ['Students', 'Scholars', 'Biotech researchers', 'Legal professionals'],
    platforms: ['Web'],
    isFeatured: false,
    isTrending: true,
    isVerified: true,
    isPublished: true,
    curatedRank: 18,
    editorialBadge: 'Top Free Tool',
    accentColor: '#3b82f6',
    faq: [
      {
        question: 'Does Google train its models on my NotebookLM uploads?',
        answer: 'Google states that personal data uploaded to NotebookLM is not used to train foundation models.'
      }
    ],
    createdAt: '2023-07-01T00:00:00.000Z',
    updatedAt: '2026-09-30T00:00:00.000Z'
  },
  {
    id: 'tool-consensus',
    name: 'Consensus',
    slug: 'consensus',
    tagline: 'AI search engine for peer-reviewed scientific research',
    description: 'Academic search engine querying over 200M research papers to synthesize scientific consensus and extract evidence-based findings.',
    longDescription: 'Consensus is an AI search engine purpose-built for scientific discovery. By indexing over 200 million peer-reviewed studies across PubMed and Semantic Scholar, Consensus extracts key findings, calculates the Consensus Meter (percentage of studies agreeing vs disagreeing), and delivers audit-proof citations.',
    websiteUrl: 'https://consensus.app',
    pricing: 'Freemium',
    startingPrice: '$8.99/month',
    priceNote: 'Free tier with unlimited search; Premium from $8.99/mo',
    categoryId: 'research',
    category: 'Research & Data',
    categorySlug: 'research',
    tags: ['Academic Search', 'Scientific Consensus', 'PubMed', 'Peer Reviewed'],
    features: [
      'Consensus Meter displaying scientific agreement percentages',
      'Synthesis summary extracted across top 10 relevant studies',
      'Filters for study design (RCTs, systematic reviews, sample size)',
      'Direct export to Zotero and reference managers'
    ],
    pros: [
      'Protects researchers from fabricated or non-peer-reviewed blog posts',
      'Quantifies scientific consensus on contested health and scientific queries',
      'High speed compared to manual literature review'
    ],
    cons: [
      'Limited to scientific and biomedical domains',
      'Full-text access dependent on open-access publishing rights'
    ],
    bestFor: ['Medical professionals', 'Bio-hackers', 'Graduate students', 'Science writers'],
    platforms: ['Web'],
    isFeatured: false,
    isTrending: false,
    isVerified: true,
    isPublished: true,
    curatedRank: 22,
    accentColor: '#10b981',
    faq: [
      {
        question: 'What database does Consensus search?',
        answer: 'Consensus searches over 200 million papers indexed via the Semantic Scholar academic database and PubMed.'
      }
    ],
    createdAt: '2022-09-01T00:00:00.000Z',
    updatedAt: '2026-07-10T00:00:00.000Z'
  },

  // --- PRODUCTIVITY ---
  {
    id: 'tool-notion-ai',
    name: 'Notion AI',
    slug: 'notion-ai',
    tagline: 'Connected assistant embedded across your workspace notes & docs',
    description: 'Integrated intelligence inside Notion to draft docs, summarize meeting notes, auto-fill database properties, and answer workspace questions.',
    longDescription: 'Notion AI is an embedded productivity assistant that lives directly inside your Notion workspace. It can answer questions about your team’s internal documentation, auto-populate relational database properties, draft project specs, summarize meeting transcripts, and perform real-time writing polish.',
    websiteUrl: 'https://notion.so/product/ai',
    pricing: 'Paid',
    startingPrice: '$10/member/month',
    priceNote: 'Add-on to any Notion plan for $10/member/mo ($8 billed annually)',
    categoryId: 'productivity',
    category: 'Productivity',
    categorySlug: 'productivity',
    tags: ['Knowledge Base', 'Workspace', 'Database Autofill', 'Q&A'],
    features: [
      'Q&A searching across all team docs, databases, and meeting notes',
      'AI Autofill for database properties (summaries, tags, action items)',
      'Inline text generation, translation, and tone polish',
      'Connected search across Slack, Google Drive, and GitHub'
    ],
    pros: [
      'Zero context switching away from your active team workspace',
      'Database autofill eliminates hours of manual status tagging',
      'Enterprise workspace permission inheritance'
    ],
    cons: [
      'Requires an active Notion user subscription plus the AI add-on',
      'Can only answer questions about content stored inside your workspace'
    ],
    bestFor: ['Product teams', 'Startups', 'Operations managers'],
    platforms: ['Web', 'macOS', 'Windows', 'iOS', 'Android'],
    isFeatured: false,
    isTrending: false,
    isVerified: true,
    isPublished: true,
    curatedRank: 19,
    accentColor: '#000000',
    faq: [
      {
        question: 'Can Notion AI answer questions about external web pages?',
        answer: 'Notion AI is optimized for your internal workspace data, though it can also query connected services like Google Drive and Slack.'
      }
    ],
    createdAt: '2023-02-22T00:00:00.000Z',
    updatedAt: '2026-08-14T00:00:00.000Z'
  },
  {
    id: 'tool-otter',
    name: 'Otter.ai',
    slug: 'otter-ai',
    tagline: 'Automated AI meeting assistant for real-time transcription and action items',
    description: 'AI meeting notes taker that joins Zoom, Google Meet, and Teams to transcribe speech, capture slides, and generate automated summaries.',
    longDescription: 'Otter.ai automates meeting documentation by recording audio, writing real-time transcripts, capturing presentation slides, and generating concise summaries with assigned action items. Its OtterPilot joins scheduled calendar meetings automatically so teams can stay present.',
    websiteUrl: 'https://otter.ai',
    pricing: 'Freemium',
    startingPrice: '$10/month',
    priceNote: 'Free tier with 300 monthly minutes; Pro from $10/mo billed annually',
    categoryId: 'productivity',
    category: 'Productivity',
    categorySlug: 'productivity',
    tags: ['Meeting Notes', 'Transcription', 'Zoom', 'Action Items'],
    features: [
      'OtterPilot auto-joins Zoom, Google Meet, and Microsoft Teams',
      'Real-time automated transcription with speaker identification',
      'Automated meeting takeaway summaries and action item assignments',
      'Searchable audio archive synced with calendar'
    ],
    pros: [
      'Eliminates manual meeting minutes taking completely',
      'Accurate speaker separation and time-stamped playback',
      'Automated email summaries sent immediately after meetings conclude'
    ],
    cons: [
      'Heavy technical jargon or accents can require occasional manual review',
      'Meeting bot presence requires team notification'
    ],
    bestFor: ['Remote teams', 'Client account managers', 'Recruiters'],
    platforms: ['Web', 'iOS', 'Android'],
    isFeatured: false,
    isTrending: false,
    isVerified: true,
    isPublished: true,
    curatedRank: 20,
    accentColor: '#2563eb',
    faq: [
      {
        question: 'Does Otter.ai integrate with Google Meet and Zoom?',
        answer: 'Yes, Otter connects with your Google or Outlook calendar and joins Zoom, Meet, and Teams calls automatically.'
      }
    ],
    createdAt: '2021-01-01T00:00:00.000Z',
    updatedAt: '2026-08-01T00:00:00.000Z'
  },

  // --- DESIGN & UI/UX ---
  {
    id: 'tool-canva',
    name: 'Canva Magic Studio',
    slug: 'canva-magic-studio',
    tagline: 'All-in-one AI design tools for marketing graphics and presentations',
    description: 'AI-powered creative suite featuring Magic Expand, Magic Eraser, Magic Switch, and text-to-design templates for rapid brand assets.',
    longDescription: 'Canva Magic Studio embeds artificial intelligence across its entire design ecosystem. From generating complete slide decks with a prompt to resizing and translating assets across 20 social formats with Magic Switch, Canva empowers non-designers to produce professional marketing visual collateral.',
    websiteUrl: 'https://canva.com',
    pricing: 'Freemium',
    startingPrice: '$15/month',
    priceNote: 'Free tier with standard templates; Canva Pro at $15/mo',
    categoryId: 'design',
    category: 'Design & UI/UX',
    categorySlug: 'design',
    tags: ['Graphic Design', 'Presentations', 'Magic Studio', 'Social Media'],
    features: [
      'Magic Design: generate branded slides and social banners from text',
      'Magic Switch: instant multi-format resize and language translation',
      'Magic Eraser and Magic Expand for image editing',
      'Brand Kit integration for automated color and typography compliance'
    ],
    pros: [
      'Extremely friendly learning curve for non-technical creators',
      'Huge library of stock assets, fonts, and vector elements',
      'Real-time collaborative editing for distributed teams'
    ],
    cons: [
      'Less precision than professional tools like Figma or Illustrator',
      'Templates can appear recognizable without substantial customization'
    ],
    bestFor: ['Social media managers', 'Solopreneurs', 'Educators', 'Small businesses'],
    platforms: ['Web', 'macOS', 'Windows', 'iOS', 'Android'],
    isFeatured: true,
    isTrending: false,
    isVerified: true,
    isPublished: true,
    curatedRank: 21,
    accentColor: '#00c4cc',
    faq: [
      {
        question: 'Are Canva Magic Studio features available on the free plan?',
        answer: 'Basic Magic tools have limited free uses, while unlimited Magic Switch and generative features require Canva Pro.'
      }
    ],
    createdAt: '2023-10-04T00:00:00.000Z',
    updatedAt: '2026-09-01T00:00:00.000Z'
  },
  {
    id: 'tool-uizard',
    name: 'Uizard',
    slug: 'uizard',
    tagline: 'AI design tool for rapid wireframing, mockups, and UI prototypes',
    description: 'Transform hand-drawn sketches, screenshots, and text prompts into editable digital wireframes and interactive UI prototypes.',
    longDescription: 'Uizard uses computer vision and generative AI to accelerate UI/UX design. You can snap a photo of a whiteboard wireframe sketch to convert it into editable Figma-like vector components, generate UI flows from a prompt with Autodesigner, and extract theme styles from screenshots.',
    websiteUrl: 'https://uizard.io',
    pricing: 'Freemium',
    startingPrice: '$12/month',
    priceNote: 'Free tier with 2 projects; Pro from $12/mo billed annually',
    categoryId: 'design',
    category: 'Design & UI/UX',
    categorySlug: 'design',
    tags: ['Wireframing', 'UI Design', 'Sketch to UI', 'Prototypes'],
    features: [
      'Sketch to Wireframe conversion via camera photo',
      'Autodesigner: generates multi-screen UI flows from text prompts',
      'Theme generator extracting color palettes from URLs or images',
      'Interactive clickable prototype preview with stakeholder comments'
    ],
    pros: [
      'Turns rough whiteboard drawings into editable UI in seconds',
      'No design tool expertise required',
      'Fast validation for early startup concepts'
    ],
    cons: [
      'Less suited for complex production design systems than Figma',
      'Generated UI sometimes requires manual alignment adjustments'
    ],
    bestFor: ['Product managers', 'Founders', 'Workshop facilitators'],
    platforms: ['Web'],
    isFeatured: false,
    isTrending: false,
    isVerified: true,
    isPublished: true,
    curatedRank: 24,
    accentColor: '#0052ff',
    faq: [
      {
        question: 'Can I export Uizard designs to Figma?',
        answer: 'Yes, Uizard designs can be exported to Figma and standard graphics formats.'
      }
    ],
    createdAt: '2021-08-01T00:00:00.000Z',
    updatedAt: '2026-07-01T00:00:00.000Z'
  },

  // --- AUTOMATION & WORKFLOWS ---
  {
    id: 'tool-make',
    name: 'Make',
    slug: 'make',
    tagline: 'Visual workflow automation platform with native AI assistant and integrations',
    description: 'Visual integration platform connecting thousands of apps with custom conditional branches, error handlers, and AI routing.',
    longDescription: 'Make (formerly Integromat) allows teams to visually design, build, and automate complex multi-app workflows. With native AI modules connecting OpenAI, Anthropic, and custom LLM endpoints, Make orchestrates data transformation, email routing, CRM updates, and autonomous pipelines without code.',
    websiteUrl: 'https://make.com',
    pricing: 'Freemium',
    startingPrice: '$9/month',
    priceNote: 'Free tier with 1,000 operations/mo; Core plan from $9/mo',
    categoryId: 'automation',
    category: 'Workflows & Automation',
    categorySlug: 'automation',
    tags: ['Visual Automation', 'No-code', 'Webhooks', 'LLM Routing'],
    features: [
      'Interactive visual canvas with drag-and-drop execution nodes',
      'Built-in AI Assistant to build and troubleshoot scenarios',
      'Native connectors for OpenAI, Anthropic, Google AI, and vector stores',
      'Real-time execution debugging and data payload inspection'
    ],
    pros: [
      'Significantly more visual and cost-effective than Zapier for complex flows',
      'Powerful data manipulation, array mapping, and error-handling tools',
      'Generous free operation tier for testing'
    ],
    cons: [
      'Steeper learning curve for users without programming logic experience',
      'Some advanced app webhooks require custom webhook setup'
    ],
    bestFor: ['Automation engineers', 'Growth teams', 'Technical operations'],
    platforms: ['Web', 'API'],
    isFeatured: false,
    isTrending: true,
    isVerified: true,
    isPublished: true,
    curatedRank: 23,
    editorialBadge: 'Automation Choice',
    accentColor: '#6f2dbd',
    faq: [
      {
        question: 'Can Make connect to private AI models via REST API?',
        answer: 'Yes, Make features native HTTP and webhook modules that can authenticate with any custom or private REST API endpoint.'
      }
    ],
    createdAt: '2022-02-01T00:00:00.000Z',
    updatedAt: '2026-09-12T00:00:00.000Z'
  },
  {
    id: 'tool-zapier-central',
    name: 'Zapier Central',
    slug: 'zapier-central',
    tagline: 'AI workspace to teach bots how to act across your 6,000+ business apps',
    description: 'An AI orchestration environment that lets you build intelligent assistants that execute live actions across Zapier’s application ecosystem.',
    longDescription: 'Zapier Central is an AI workspace where you build and train experimental AI bots. You give your bot instructions, connect it to live data sources (Google Sheets, Notion, CRM), and authorize it to take concrete actions across 6,000+ cloud applications with natural language triggers.',
    websiteUrl: 'https://zapier.com/central',
    pricing: 'Freemium',
    startingPrice: 'Free during preview',
    priceNote: 'Free tier included with Zapier accounts',
    categoryId: 'automation',
    category: 'Workflows & Automation',
    categorySlug: 'automation',
    tags: ['Autonomous Bots', 'Zapier', 'Tool Calling', 'Action Execution'],
    features: [
      'Natural language bot creation with step-by-step guidance',
      'Connects bots to live cloud spreadsheets and knowledge documents',
      'Triggers multi-step Zapier actions directly through chat',
      'Configurable human-in-the-loop confirmation before sensitive actions'
    ],
    pros: [
      'Leverages Zapier’s unmatched catalog of 6,000+ app integrations',
      'Human-in-the-loop guardrails prevent unauthorized writes',
      'Easy to configure without knowing JSON schemas'
    ],
    cons: [
      'Complex decision routing can take trial and error to calibrate',
      'Tied directly to the Zapier pricing ecosystem'
    ],
    bestFor: ['Small business owners', 'Operations specialists', 'Executive assistants'],
    platforms: ['Web'],
    isFeatured: false,
    isTrending: false,
    isVerified: true,
    isPublished: true,
    curatedRank: 25,
    accentColor: '#ff4f00',
    faq: [
      {
        question: 'Can Zapier Central bots ask for confirmation before sending emails?',
        answer: 'Yes, you can enable human-in-the-loop confirmation so the bot pauses and asks for your approval before executing actions.'
      }
    ],
    createdAt: '2024-03-01T00:00:00.000Z',
    updatedAt: '2026-08-25T00:00:00.000Z'
  },

  // --- BUSINESS OPERATIONS ---
  {
    id: 'tool-julius',
    name: 'Julius AI',
    slug: 'julius-ai',
    tagline: 'Your AI data analyst for spreadsheets, visualizations, and modeling',
    description: 'Conversational data science assistant that cleans spreadsheets, creates interactive charts, and executes statistical models in Python.',
    longDescription: 'Julius AI acts as an autonomous data analyst on demand. Users connect Excel sheets, CSVs, or SQL databases, and chat with Julius in plain English to uncover statistical correlations, clean messy columns, generate publication-ready plots, and run predictive forecasting models.',
    websiteUrl: 'https://julius.ai',
    pricing: 'Freemium',
    startingPrice: '$17.99/month',
    priceNote: 'Free 15 messages/mo; Basic plan at $17.99/mo; Pro at $37.99/mo',
    categoryId: 'business',
    category: 'Business Operations',
    categorySlug: 'business',
    tags: ['Data Analysis', 'Python Execution', 'Spreadsheets', 'Visualizations'],
    features: [
      'Instant chart and graph generation (seaborn, matplotlib, plotly)',
      'Cleans messy spreadsheets and handles missing data values',
      'Performs linear regressions, forecasting, and hypothesis testing',
      'Exports clean Python code alongside data outputs'
    ],
    pros: [
      'Delivers data science capabilities to non-programmers',
      'Transparently shows the underlying Python code and math',
      'Connects with Google Sheets and SQL connections'
    ],
    cons: [
      'Very large files (>100MB) can experience upload limits on basic tiers',
      'Requires fundamental understanding of data statistics to interpret outliers'
    ],
    bestFor: ['Financial analysts', 'Growth marketers', 'Business consultants'],
    platforms: ['Web', 'iOS', 'Android'],
    isFeatured: false,
    isTrending: true,
    isVerified: true,
    isPublished: true,
    curatedRank: 26,
    editorialBadge: 'Analytics Leader',
    accentColor: '#10b981',
    faq: [
      {
        question: 'Does Julius show the code it used to generate graphs?',
        answer: 'Yes, Julius displays the full executable Python script behind every calculation and visualization.'
      }
    ],
    createdAt: '2023-05-01T00:00:00.000Z',
    updatedAt: '2026-09-22T00:00:00.000Z'
  },

  // --- EDUCATION & LEARNING ---
  {
    id: 'tool-khanmigo',
    name: 'Khanmigo by Khan Academy',
    slug: 'khanmigo',
    tagline: 'Personalized AI tutor and teaching assistant built on Khan Academy',
    description: 'Socratic AI tutor that guides students to solve problems without giving away the answers, and assists teachers with lesson planning.',
    longDescription: 'Khanmigo is an educational AI tutor developed by Khan Academy. Built with a Socratic methodology, Khanmigo encourages students to think through math, science, and humanities questions step-by-step rather than simply providing direct answers. It also helps teachers generate rubric assessments and lesson plans.',
    websiteUrl: 'https://khanacademy.org/khanmigo',
    pricing: 'Freemium',
    startingPrice: '$4/month or free for US teachers',
    priceNote: 'Free for US teachers; $4/mo or $44/yr for learners',
    categoryId: 'education',
    category: 'Education & Learning',
    categorySlug: 'education',
    tags: ['Socratic Tutor', 'Education', 'Khan Academy', 'Lesson Planning'],
    features: [
      'Socratic guidance that prompts students with hints instead of answers',
      'Interactive historical figure dialogues (chat with George Washington)',
      'Teacher tools for creating lesson plans, rubrics, and discussion prompts',
      'Integrated with Khan Academy curriculum tracking'
    ],
    pros: [
      'Designed by educators with child safety and academic integrity safeguards',
      'Builds genuine critical thinking rather than homework cheating',
      'Very affordable mission-driven subscription pricing'
    ],
    cons: [
      'Primarily aligned to K-12 and early college curriculum',
      'Requires student willingness to engage with Socratic hints'
    ],
    bestFor: ['Students', 'K-12 teachers', 'Homeschooling parents'],
    platforms: ['Web'],
    isFeatured: false,
    isTrending: false,
    isVerified: true,
    isPublished: true,
    curatedRank: 27,
    editorialBadge: 'Education Standard',
    accentColor: '#14b8a6',
    faq: [
      {
        question: 'Does Khanmigo simply do my homework for me?',
        answer: 'No, Khanmigo is intentionally programmed to use the Socratic method, offering hints and asking guiding questions so you learn the solution yourself.'
      }
    ],
    createdAt: '2023-03-14T00:00:00.000Z',
    updatedAt: '2026-06-30T00:00:00.000Z'
  }
];

export const FEATURED_TOOLS = TOOLS.filter((t) => t.isFeatured);
export const TRENDING_TOOLS = TOOLS.filter((t) => t.isTrending);
