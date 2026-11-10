export interface BlogSection {
  id: string;
  heading: string;
  paragraphs: string[];
  codeOrFlow?: string;
  diagramCaption?: string;
}

export interface BlogPost {
  slug: string;
  title: string;
  summary: string;
  publishedAt: string;
  readingTime: string;
  tags: ("Engineering" | "Architecture" | "Next.js" | "Backend" | "Personal")[];
  coverSubtitle: string;
  sections: BlogSection[];
}

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: "transactional-outbox-spring-boot",
    title:
      "Why Dual-Writes Fail: Implementing the Outbox Pattern in Spring Boot",
    summary:
      "How to guarantee zero lost domain events between PostgreSQL and RabbitMQ without distributed two-phase commits.",
    publishedAt: "October 18, 2026",
    readingTime: "6 min read",
    tags: ["Engineering", "Backend", "Architecture"],
    coverSubtitle: "PostgreSQL ACID + RabbitMQ Relay",
    sections: [
      {
        id: "the-dual-write-trap",
        heading: "The dual-write trap in production",
        paragraphs: [
          "When building CareCircle's emergency alert pipeline, the naive approach was tempting: save the alert record in PostgreSQL, and immediately call rabbitTemplate.convertAndSend() inside the same @Transactional method.",
          "The flaw only surfaces under network partition or broker restarts. If the PostgreSQL commit succeeds but the RabbitMQ TCP connection drops milliseconds later, the user sees a success state while the downstream notification worker never receives the payload.",
        ],
      },
      {
        id: "the-outbox-architecture",
        heading: "Atomic persistence via an Outbox table",
        paragraphs: [
          "Instead of publishing over the network during the user request, we serialize the domain event as a JSONB payload into an outbox_events table within the exact same PostgreSQL transaction.",
          "Because both inserts share a single ACID boundary, either both the care schedule mutation and the outbox row persist, or neither does.",
        ],
        codeOrFlow: `[Client Request] ──► [@Transactional Service]
                           ├──► INSERT INTO care_alerts
                           └──► INSERT INTO outbox_events (status = PENDING)
                                       │
                        [Poller: FOR UPDATE SKIP LOCKED]
                                       │
                                       ▼
                              [RabbitMQ Exchange]`,
        diagramCaption:
          "Decoupling synchronous ACID mutations from asynchronous broker dispatch.",
      },
      {
        id: "skip-locked-polling",
        heading: "Eliminating worker lock contention",
        paragraphs: [
          "A naive background poller running every 200ms will quickly bottleneck if multiple application instances pull the same rows. By using SELECT ... FOR UPDATE SKIP LOCKED, concurrent relay threads safely bypass locked rows without blocking.",
        ],
      },
    ],
  },
  {
    slug: "react-compiler-gsap-boundaries",
    title: "Isolating GSAP Timelines in Next.js 16 with the React Compiler",
    summary:
      "Architecting leaf-node client boundaries so scroll animations never hydrate your entire Server Component tree.",
    publishedAt: "August 22, 2026",
    readingTime: "5 min read",
    tags: ["Next.js", "Engineering"],
    coverSubtitle: "Server Components + Scoped Motion",
    sections: [
      {
        id: "the-hydration-cost",
        heading: "The hidden cost of top-level 'use client'",
        paragraphs: [
          "When adding scroll-triggered reveals to a Next.js App Router page, slapping 'use client' at the top of page.tsx is the fastest route to a bloated JavaScript bundle. Every static paragraph and SVG inside that file gets dragged into the client hydration graph.",
          "With Next.js 16 and the React Compiler enabled, the cleaner pattern is to keep route segments strictly server-rendered and pass static JSX as children into thin animation wrappers.",
        ],
      },
      {
        id: "scoped-usegsap",
        heading: "Deterministic cleanup with useGSAP",
        paragraphs: [
          "Combining @gsap/react's useGSAP hook with a scoped container ref ensures ScrollTrigger instances are garbage-collected cleanly during route transitions, preventing pinned-element ghosting.",
        ],
        codeOrFlow: `[page.tsx (Server Component - 0 KB Client JS)]
       │
       └──► <RevealWrapper> ("use client" leaf boundary)
                 │
                 └──► {children} (Pre-rendered RSC HTML payload)`,
        diagramCaption:
          "Passing Server Component children through a Client animation wrapper.",
      },
    ],
  },
  {
    slug: "redis-rate-limiting-bucket4j",
    title: "Distributed Token Buckets with Redis and Bucket4j",
    summary:
      "Protecting multi-tenant authentication and OTP endpoints against burst traffic without penalizing legitimate users.",
    publishedAt: "June 18, 2026",
    readingTime: "4 min read",
    tags: ["Backend", "Engineering"],
    coverSubtitle: "Token Bucket Algorithm at the Edge",
    sections: [
      {
        id: "why-fixed-windows-fail",
        heading: "Why fixed-window counters fail at the boundary",
        paragraphs: [
          "A simple Redis INCR with a 60-second TTL suffers from boundary burst attacks: a client can fire 100 requests at 00:59 and another 100 requests at 01:01, doubling the intended throughput.",
          "By integrating Bucket4j with Redis atomic CAS operations, tokens refill smoothly at a constant rate while still permitting controlled short bursts.",
        ],
      },
    ],
  },
];

export function getBlogBySlug(slug: string): BlogPost | undefined {
  return BLOG_POSTS.find((post) => post.slug === slug);
}
