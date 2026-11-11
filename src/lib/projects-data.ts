export interface TechDecision {
  title: string;
  rationale: string;
  tradeoff: string;
}

export interface ArchitectureNode {
  layer: string;
  component: string;
  description: string;
}

export interface ProjectCaseStudy {
  slug: string;
  name: string;
  tagline: string;
  status?: "Active" | "Live" | "Archived";
  year: string;
  category: "Full Stack" | "Backend" | "Frontend";
  github?: string;
  live?: string;
  technologies: string[];
  highlights: string[];
  hasArchitecturePlayground?: boolean;
  // Deep-dive specific fields
  overview: {
    problem: string;
    solution: string;
    role: string;
    timeline: string;
  };
  architecture: {
    summary: string;
    asciiFlow: string;
    nodes: ArchitectureNode[];
  };
  decisions: TechDecision[];
  metricsAndOutcomes: string[];
  retrospective: {
    lessonsLearned: string;
    futureRoadmap: string[];
  };
}

export const TECH_ICONS: Record<string, string> = {
  "Next.js":
    "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nextjs/nextjs-original.svg",
  React:
    "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg",
  TypeScript:
    "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg",
  "Tailwind CSS":
    "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg",
  "Spring Boot":
    "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/spring/spring-original.svg",
  PostgreSQL:
    "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postgresql/postgresql-original.svg",
  Redis:
    "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/redis/redis-original.svg",
  RabbitMQ:
    "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/rabbitmq/rabbitmq-original.svg",
  Docker:
    "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/docker/docker-original.svg",
  "Node.js":
    "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg",
  MongoDB:
    "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mongodb/mongodb-original.svg",
};

export const PROJECTS_DATA: ProjectCaseStudy[] = [
  {
    slug: "carecircle",
    name: "CareCircle",
    tagline:
      "Multi-tenant elder-care coordination and real-time alert platform.",
    status: "Active",
    year: "2026",
    category: "Full Stack",
    github: "https://github.com/yourusername/carecircle",
    live: "https://carecircle.yashn.me",
    hasArchitecturePlayground: true,
    technologies: [
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "Spring Boot",
      "PostgreSQL",
      "Redis",
      "RabbitMQ",
      "Docker",
    ],
    highlights: [
      "Architected a modular monolith backend in Spring Boot 3 with PostgreSQL persistence and strict RBAC security.",
      "Implemented distributed rate limiting using Bucket4j backed by Redis to protect critical care-alert endpoints.",
      "Engineered reliable asynchronous event dispatching via the transactional outbox pattern with RabbitMQ.",
    ],
    overview: {
      problem:
        "Coordinating daily medication schedules, emergency alerts, and vital logs across family members and professional caregivers often relies on fragmented messaging apps, resulting in missed doses and delayed emergency responses.",
      solution:
        "CareCircle unifies care circles under a strict role-based coordination hub, guaranteeing delivery of critical health alerts via an asynchronous transactional outbox pipeline and real-time status tracking.",
      role: "Lead Full Stack Architect",
      timeline: "Mar 2026 – Present",
    },
    architecture: {
      summary:
        "The system decouples synchronous user mutations from slow third-party notification dispatches. Incoming requests pass through a Redis-backed Bucket4j rate limiter before hitting the Spring Boot domain layer.",
      asciiFlow: `[Next.js 16 Client] 
       │ (HTTPS / JWT in HttpOnly Cookie)
       ▼
[API Gateway / Bucket4j + Redis Rate Limiter]
       │
       ▼
[Spring Boot 3 Modular Monolith]
  ├── Auth & RBAC Module
  ├── Care Schedule Module ──► [PostgreSQL 16 (Primary Data + Outbox Table)]
  └── Outbox Relay Poller  ──► [RabbitMQ Exchange] ──► [Notification Workers]`,
      nodes: [
        {
          layer: "Edge & Rate Limiting",
          component: "Redis + Bucket4j",
          description:
            "Token-bucket rate limiting per tenant IP and user ID to prevent alert-spamming and DDoS vectors.",
        },
        {
          layer: "Core Application",
          component: "Spring Boot 3 (JDK 21)",
          description:
            "Structured as a modular monolith with strict package boundaries between Care, Identity, and Notification domains.",
        },
        {
          layer: "Persistence & Outbox",
          component: "PostgreSQL + Hibernate",
          description:
            "Stores relational care graphs and persists domain events atomically in an outbox table within the same ACID transaction.",
        },
        {
          layer: "Async Messaging",
          component: "RabbitMQ",
          description:
            "Consumes polled outbox events with dead-letter queues (DLQ) and exponential backoff for guaranteed alert delivery.",
        },
      ],
    },
    decisions: [
      {
        title: "Modular Monolith over Microservices",
        rationale:
          "Allowed shared ACID transactions across care schedules and outbox events without the operational overhead of distributed two-phase commits.",
        tradeoff:
          "Requires strict discipline and ArchUnit tests to prevent cross-module repository leakage.",
      },
      {
        title: "Transactional Outbox Pattern for Alerts",
        rationale:
          "Directly publishing to RabbitMQ inside a database transaction risks dual-write inconsistencies if the broker drops connection.",
        tradeoff:
          "Introduces slight polling latency (100ms–500ms) and extra database write amplification for the outbox table.",
      },
    ],
    metricsAndOutcomes: [
      "Zero lost emergency alerts during simulated broker downtime via PostgreSQL outbox replay.",
      "Sub-45ms p95 API response time on schedule mutations by offloading notification fan-out to RabbitMQ.",
      "100% protection against brute-force OTP and alert endpoints via distributed Redis token buckets.",
    ],
    retrospective: {
      lessonsLearned:
        "Initially used standard cron polling for the outbox table, which caused lock contention under high concurrency. Migrating the query to use `FOR UPDATE SKIP LOCKED` immediately eliminated worker thread blocking.",
      futureRoadmap: [
        "Replace polling outbox relay with Debezium Change Data Capture (CDC) reading Postgres WAL logs.",
        "Add WebPush API integration for offline mobile browser emergency alerts.",
      ],
    },
  },
  {
    slug: "lanos",
    name: "Lanos Web Platform",
    tagline:
      "Multi-tenant corporate portal unifying EdTech, IT Solutions, and R&D divisions.",
    status: "Live",
    year: "2026",
    category: "Frontend",
    live: "https://lanos-beta.vercel.app",
    technologies: ["Next.js", "React", "TypeScript", "Tailwind CSS"],
    highlights: [
      "Built a multi-tenant web platform unifying EdTech, IT Solutions, and R&D portals under a cohesive design system.",
      "Crafted custom scroll-bound micro-animations and interactive timeline sequences using GSAP.",
      "Optimized Core Web Vitals and initial server render payloads utilizing Next.js 16 App Router and React Compiler.",
    ],
    overview: {
      problem:
        "Lanos IT Solutions operated three distinct business verticals (software consultancy, student training bootcamps, and internal R&D) across disconnected landing pages, hurting brand authority and lead conversion.",
      solution:
        "Engineered a unified Next.js 16 multi-portal platform that dynamically adapts navigation, theming, and lead-capture workflows per division while maintaining 98+ Lighthouse performance scores.",
      role: "Frontend & Motion Engineer",
      timeline: "Feb 2026 – Apr 2026",
    },
    architecture: {
      summary:
        "Built on the Next.js 16 App Router utilizing Server Components for zero-bundle static content and isolated Client Component islands for GSAP ScrollTrigger timelines.",
      asciiFlow: `[Vercel Edge Network (CDN)]
       │
       ▼
[Next.js 16 App Router (Server Components)]
  ├── / (Corporate Hub)
  ├── /edtech (Course Catalog & Enrollment)
  └── /rnd (Experimental Labs Showcase)
       │
       ▼
[Isolated Client Islands ("use client")]
  └── @gsap/react useGSAP() Scoped Timelines`,
      nodes: [
        {
          layer: "Rendering Engine",
          component: "Next.js 16 + React Compiler",
          description:
            "Static and hybrid server rendering with automatic build-time memoization via the React Compiler.",
        },
        {
          layer: "Motion Layer",
          component: "GSAP + ScrollTrigger",
          description:
            "Scoped timeline animations wrapped inside dedicated client boundaries to avoid hydrating static layout trees.",
        },
      ],
    },
    decisions: [
      {
        title: "Leaf-Node GSAP Wrapper Architecture",
        rationale:
          "Marking entire route pages with 'use client' for animations would destroy SSR SEO benefits and inflate the JS bundle.",
        tradeoff:
          "Required designing composable animation wrapper components that accept Server Component children as ReactNodes.",
      },
    ],
    metricsAndOutcomes: [
      "Achieved 99 Performance and 100 SEO scores on Chrome Lighthouse across all three tenant portals.",
      "Reduced client-side JavaScript bundle size by 38% by isolating GSAP plugins to dynamic client islands.",
    ],
    retrospective: {
      lessonsLearned:
        "Early GSAP ScrollTrigger instances caused layout shifts on mobile browsers when the address bar resized. Configuring `ScrollTrigger.config({ ignoreMobileResize: true })` stabilized scroll positions.",
      futureRoadmap: [
        "Integrate automated enrollment webhook pipelines into the EdTech portal.",
        "Add interactive WebGL shader backgrounds for the R&D division.",
      ],
    },
  },
  {
    slug: "samriddhi-travels",
    name: "Samriddhi Travels",
    tagline:
      "High-conversion intercity vehicle rental and fleet booking platform.",
    status: "Live",
    year: "2026",
    category: "Full Stack",
    live: "https://samriddhitravelsindore.vercel.app",
    technologies: ["Next.js", "TypeScript", "Tailwind CSS"],
    highlights: [
      "Designed and deployed a high-conversion vehicle booking platform with instant WhatsApp itinerary integration.",
      "Structured SEO-optimized dynamic route pages and transparent pricing tiers for intercity travel packages.",
    ],
    overview: {
      problem:
        "Local fleet operators in Indore relied on phone inquiries and manual rate calculations, losing high-intent travellers to aggregator apps with opaque surge pricing.",
      solution:
        "Created a fast, mobile-first booking storefront featuring transparent per-kilometer tariff calculators and one-click pre-filled WhatsApp booking dispatches.",
      role: "Full Stack Developer",
      timeline: "Feb 2026",
    },
    architecture: {
      summary:
        "Statically generated route and fleet pages served from Vercel's edge CDN, paired with a client-side tariff estimator and deep-link WhatsApp payload generator.",
      asciiFlow: `[Mobile User Search (Local SEO)]
       │
       ▼
[Next.js SSG Fleet & Route Pages]
       │
       ▼
[Interactive Tariff Calculator] ──► [WhatsApp Deep-Link API Dispatch]`,
      nodes: [
        {
          layer: "SEO & Discovery",
          component: "Next.js Static Generation + JSON-LD",
          description:
            "Pre-rendered regional route pages injected with LocalBusiness schema markup for regional search dominance.",
        },
        {
          layer: "Conversion Engine",
          component: "WhatsApp URI State Builder",
          description:
            "Serializes selected vehicle class, pickup dates, and route distance into a structured dispatch message.",
        },
      ],
    },
    decisions: [
      {
        title: "Direct WhatsApp Dispatch over Custom Payment Gateway",
        rationale:
          "Regional travel customers strongly prefer confirming driver availability and custom pickup points via chat before paying an advance.",
        tradeoff:
          "Final payment reconciliation remains manual on the operator's end.",
      },
    ],
    metricsAndOutcomes: [
      "Sub-1.0s First Contentful Paint (FCP) on 4G mobile networks.",
      "Direct increase in qualified inbound booking inquiries within the first month of deployment.",
    ],
    retrospective: {
      lessonsLearned:
        "Real-world onboarding in Indore showed that customers compare per-km rates vs. toll inclusions immediately—moving that breakdown above the fold doubled engagement.",
      futureRoadmap: [
        "Build a lightweight admin availability toggle for peak wedding and holiday seasons.",
      ],
    },
  },
  {
    slug: "forever",
    name: "Forever E-Commerce",
    tagline: "Production-grade e-commerce engine with RBAC and JWT security.",
    year: "2025",
    category: "Backend",
    github: "https://github.com/yourusername/forever",
    technologies: [
      "React",
      "Node.js",
      "MongoDB",
      "Tailwind CSS",
      "Spring Boot",
      "PostgreSQL",
    ],
    highlights: [
      "Developed complete storefront, cart management, and admin inventory control workflows.",
      "Secured API routes with stateless JWT authentication, HttpOnly cookies, and role-based access control.",
    ],
    overview: {
      problem:
        "Standard tutorial e-commerce builds lack proper inventory concurrency controls, role separation, and token refresh rotation.",
      solution:
        "Engineered a full-stack commerce architecture available in both MERN and Spring Boot 3 + PostgreSQL implementations with production-grade security filters.",
      role: "Full Stack Developer",
      timeline: "May 2025 – Nov 2025",
    },
    architecture: {
      summary:
        "RESTful API layer protected by custom Spring Security filter chains, interfacing with normalized PostgreSQL product catalogs and transactional order processing.",
      asciiFlow: `[React Storefront / Admin Panel]
       │
       ▼
[Spring Security Filter Chain (JWT + RBAC)]
       │
       ▼
[Order & Inventory Service] ──► [PostgreSQL Relational Schema]`,
      nodes: [
        {
          layer: "Security Layer",
          component: "Spring Security 6 + JWT",
          description:
            "Custom OncePerRequestFilter validating access tokens and enforcing @PreAuthorize role annotations.",
        },
        {
          layer: "Data Layer",
          component: "Spring Data JPA + PostgreSQL",
          description:
            "Normalized schema handling product variants, user carts, and atomic stock decrements.",
        },
      ],
    },
    decisions: [
      {
        title: "Re-architecting Backend from Express to Spring Boot 3",
        rationale:
          "Migrated the core commerce logic to Spring Boot and PostgreSQL to enforce compile-time type safety and strict ACID transactions on inventory deductions.",
        tradeoff:
          "Higher initial boilerplate compared to Express/MongoDB, paid off in zero race-condition bugs during checkout.",
      },
    ],
    metricsAndOutcomes: [
      "Eliminated overselling race conditions using pessimistic locking on high-demand SKU rows.",
      "Clean separation between CUSTOMER and ADMIN security contexts.",
    ],
    retrospective: {
      lessonsLearned:
        "Storing cart state purely in local storage caused sync issues across devices; moving authenticated carts to server-side persistence unified the UX.",
      futureRoadmap: [
        "Add Redis caching for high-read product category listings.",
      ],
    },
  },
];

export function getProjectBySlug(slug: string): ProjectCaseStudy | undefined {
  return PROJECTS_DATA.find((p) => p.slug === slug);
}
