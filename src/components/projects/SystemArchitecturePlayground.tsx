"use client";

import React, { useState, useEffect } from "react";
import {
  ShieldCheck,
  Database,
  Layers,
  Zap,
  Server,
  Play,
  RotateCcw,
  CheckCircle2,
  AlertTriangle,
} from "lucide-react";

type NodeKey = "client" | "gateway" | "spring" | "redis" | "postgres";

interface NodeDetails {
  title: string;
  badge: string;
  tech: string;
  description: string;
  tradeoffs: string[];
  specs: Record<string, string>;
}

const ARCHITECTURE_DATA: Record<NodeKey, NodeDetails> = {
  client: {
    title: "Next.js Edge Client",
    badge: "Presentation Tier",
    tech: "Next.js 16 (App Router), TypeScript, Server Actions",
    description:
      "Performs client-side payload validation, handles secure HTTP-only session cookies, and dispatches authenticated REST requests with automatic exponential backoff retry logic.",
    tradeoffs: [
      "Server Actions used for mutations to eliminate intermediate client-side API boilerplate",
      "Route handlers cache static lookups while proxying sensitive elder-care data directly to backend",
    ],
    specs: {
      SSR: "Streaming via Suspense",
      AuthStorage: "HTTP-Only Strict Cookies",
      Transport: "TLS 1.3 / HTTP/2",
    },
  },
  gateway: {
    title: "API Gateway & Security Filter",
    badge: "Perimeter Defense",
    tech: "Spring Cloud Gateway / Spring Security Filter Chain",
    description:
      "Intercepts incoming requests, validates JWT digital signatures against custom claims, enforces Role-Based Access Control (RBAC: Admin, Caregiver, Family Member), and attaches request tracing IDs.",
    tradeoffs: [
      "Stateless JWT validation offloads DB lookups during high-traffic reads",
      "Immediate 401/403 rejection before hitting downstream service threads",
    ],
    specs: {
      AuthMechanism: "HMAC-SHA256 / RSA Signatures",
      TokenLifecycle: "15m Access Token / 7d Refresh Token",
      RBACEnforcement: "Custom OncePerRequestFilter",
    },
  },
  spring: {
    title: "Spring Boot Microservices",
    badge: "Core Domain Logic",
    tech: "Java 21, Spring Boot 3, Spring Data JPA, Hibernate",
    description:
      "Handles business constraints, elder-care event scheduling, notification dispatching, and audit logging with transactional boundaries (`@Transactional`).",
    tradeoffs: [
      "Modular monolith design pattern prevents premature distributed network overhead",
      "Optimistic locking (`@Version`) avoids race conditions during double-booking care shifts",
    ],
    specs: {
      Runtime: "Java 21 Virtual Threads (Project Loom)",
      ORM: "Hibernate 6 with Lazy Fetching",
      Validation: "Jakarta Bean Validation",
    },
  },
  redis: {
    title: "Redis Distributed Cache & Rate Limiter",
    badge: "Low-Latency Tier",
    tech: "Redis 7, Jedis / Redisson",
    description:
      "Enforces a sliding-window token bucket algorithm to mitigate API scraping and spam. Additionally serves as a L2 cache for high-frequency doctor and emergency contact lookups.",
    tradeoffs: [
      "In-memory atomic increments (`INCR`, `EXPIRE`) guarantee sub-millisecond rate checks",
      "Eviction policy configured to `allkeys-lru` with 30-minute TTLs on cached queries",
    ],
    specs: {
      RateLimitRate: "5 requests / window",
      Algorithm: "Sliding-Window Token Bucket",
      LatencyTarget: "< 2ms read",
    },
  },
  postgres: {
    title: "PostgreSQL Primary Storage",
    badge: "Persistence Tier",
    tech: "PostgreSQL 16, Connection Pooling via HikariCP",
    description:
      "ACID-compliant storage for patient vitals, shift assignments, and encrypted audit trails. Uses composite indexes on `(user_id, timestamp)` for rapid time-series dashboard queries.",
    tradeoffs: [
      "Normalized schema 3NF with JSONB columns for flexible medical telemetry data",
      "Connection pooling tuned to 20 maximum connections to prevent pool starvation",
    ],
    specs: {
      Pooler: "HikariCP (20 pool size)",
      Isolation: "Read Committed",
      Indexes: "B-Tree on Foreign Keys & Temporal Logs",
    },
  },
};

export function SystemArchitecturePlayground() {
  const [selectedNode, setSelectedNode] = useState<NodeKey>("postgres");

  // Benchmark Simulator State
  const [requestCount, setRequestCount] = useState(0);
  const [rateLimitExceeded, setRateLimitExceeded] = useState(false);
  const [activeRequest, setActiveRequest] = useState(false);
  const [latestLatency, setLatestLatency] = useState<number | null>(null);
  const [responseLog, setResponseLog] = useState<
    {
      id: number;
      status: number;
      latency: number;
      tokenRemaining: number;
      timestamp: string;
    }[]
  >([]);

  // Auto-reset rate limit after 6 seconds of inactivity
  useEffect(() => {
    if (requestCount === 0) return;
    const timer = setTimeout(() => {
      setRequestCount(0);
      setRateLimitExceeded(false);
    }, 6000);
    return () => clearTimeout(timer);
  }, [requestCount]);

  const fireApiCall = () => {
    if (activeRequest) return;
    setActiveRequest(true);

    const now = new Date();
    const timeStr =
      now.toTimeString().split(" ")[0] + "." + now.getMilliseconds();
    const newCount = requestCount + 1;
    setRequestCount(newCount);

    const simulatedLatency = Math.floor(Math.random() * 28) + 14; // 14ms - 42ms

    setTimeout(() => {
      if (newCount > 5) {
        setRateLimitExceeded(true);
        setLatestLatency(simulatedLatency);
        setResponseLog((prev) => [
          {
            id: Date.now(),
            status: 429,
            latency: simulatedLatency,
            tokenRemaining: 0,
            timestamp: timeStr,
          },
          ...prev.slice(0, 3),
        ]);
      } else {
        setLatestLatency(simulatedLatency);
        setResponseLog((prev) => [
          {
            id: Date.now(),
            status: 200,
            latency: simulatedLatency,
            tokenRemaining: 5 - newCount,
            timestamp: timeStr,
          },
          ...prev.slice(0, 3),
        ]);
      }
      setActiveRequest(false);
    }, simulatedLatency + 40);
  };

  const resetBucket = () => {
    setRequestCount(0);
    setRateLimitExceeded(false);
    setLatestLatency(null);
    setResponseLog([]);
  };

  const current = ARCHITECTURE_DATA[selectedNode];

  return (
    <div className="w-full rounded-2xl border border-border bg-card p-6 md:p-8 text-foreground transition-colors shadow-sm">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between pb-6 border-b border-border gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-mono font-medium text-emerald-700 dark:text-emerald-400 bg-emerald-500/10 dark:bg-emerald-950/50 border border-emerald-500/20 dark:border-emerald-800/60 px-2.5 py-1 rounded-full mb-2">
            <Zap className="w-3.5 h-3.5" />
            System Architecture & Live Sandbox
          </div>
          <h3 className="text-xl md:text-2xl font-bold tracking-tight text-foreground">
            CareCircle Production Pipeline
          </h3>
          <p className="text-sm text-muted-foreground mt-1">
            Click any node along the network edge to inspect engineering
            trade-offs, or fire authenticated calls against the mock
            rate-limiter.
          </p>
        </div>

        <button
          onClick={resetBucket}
          className="inline-flex items-center gap-1.5 self-start md:self-auto text-xs font-mono text-muted-foreground hover:text-foreground bg-muted/60 hover:bg-muted border border-border px-3 py-1.5 rounded-lg transition-colors"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          Reset Metrics
        </button>
      </div>

      {/* Interactive Visual Architecture Pipeline */}
      <div className="py-6">
        <div className="text-xs font-mono text-muted-foreground uppercase tracking-wider mb-3 flex items-center justify-between">
          <span>Pipeline Nodes (Click to Inspect)</span>
          <span className="hidden sm:inline">
            Selected:{" "}
            <strong className="text-foreground">{current.title}</strong>
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
          {(
            [
              {
                key: "client",
                label: "Edge Client",
                sub: "Next.js 16",
                icon: Layers,
              },
              {
                key: "gateway",
                label: "Security Gateway",
                sub: "JWT / RBAC",
                icon: ShieldCheck,
              },
              {
                key: "spring",
                label: "Core Service",
                sub: "Spring Boot 3",
                icon: Server,
              },
              {
                key: "redis",
                label: "Cache / Limiter",
                sub: "Redis 7",
                icon: Zap,
              },
              {
                key: "postgres",
                label: "Database",
                sub: "PostgreSQL 16",
                icon: Database,
              },
            ] as const
          ).map((item) => {
            const Icon = item.icon;
            const isSelected = selectedNode === item.key;
            return (
              <button
                key={item.key}
                onClick={() => setSelectedNode(item.key)}
                className={`relative flex flex-col items-start p-4 rounded-xl border text-left transition-all duration-200 ${
                  isSelected
                    ? "border-emerald-500 bg-emerald-500/5 dark:bg-emerald-950/20 shadow-sm ring-1 ring-emerald-500/50"
                    : "border-border bg-card hover:bg-muted/50 hover:border-foreground/20"
                }`}
              >
                {isSelected && (
                  <span className="absolute top-2.5 right-2.5 w-2 h-2 rounded-full bg-emerald-500" />
                )}
                <div
                  className={`p-2 rounded-lg mb-2.5 transition-colors ${
                    isSelected
                      ? "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400"
                      : "bg-muted text-muted-foreground"
                  }`}
                >
                  <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
                </div>
                <div className="font-semibold text-xs sm:text-sm text-foreground">
                  {item.label}
                </div>
                <div className="text-[11px] font-mono text-muted-foreground mt-0.5">
                  {item.sub}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Deep-Dive Inspection Panel */}
      <div className="rounded-xl border border-border bg-muted/30 p-5 mb-6 transition-colors">
        <div className="flex flex-wrap items-center justify-between gap-3 pb-3 mb-4 border-b border-border">
          <div>
            <span className="text-xs font-mono font-medium text-emerald-700 dark:text-emerald-400 bg-emerald-500/10 dark:bg-emerald-950/60 border border-emerald-500/20 dark:border-emerald-800/50 px-2 py-0.5 rounded">
              {current.badge}
            </span>
            <h4 className="text-lg font-bold text-foreground mt-1.5">
              {current.title}
            </h4>
            <p className="text-xs font-mono text-muted-foreground mt-0.5">
              {current.tech}
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            {Object.entries(current.specs).map(([specKey, specVal]) => (
              <div
                key={specKey}
                className="text-right bg-card border border-border px-3 py-1.5 rounded-lg"
              >
                <div className="text-[10px] font-mono text-muted-foreground uppercase">
                  {specKey}
                </div>
                <div className="text-xs font-mono font-semibold text-foreground">
                  {specVal}
                </div>
              </div>
            ))}
          </div>
        </div>

        <p className="text-sm text-foreground/90 leading-relaxed mb-4">
          {current.description}
        </p>

        <div>
          <div className="text-xs font-mono uppercase tracking-wider text-muted-foreground mb-2">
            Engineering Decisions & Trade-Offs
          </div>
          <ul className="space-y-1.5 text-xs text-muted-foreground">
            {current.tradeoffs.map((point, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="text-emerald-600 dark:text-emerald-400 mt-0.5">
                  ▹
                </span>
                <span className="text-foreground/80">{point}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Live API Rate-Limiter Sandbox */}
      <div className="pt-6 border-t border-border">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
          <div>
            <div className="text-xs font-mono uppercase tracking-wider text-muted-foreground">
              Interactive Micro-Benchmark
            </div>
            <h4 className="text-sm font-semibold text-foreground mt-0.5">
              Simulate Redis Sliding-Window Rate Limiting (Limit: 5 req / 6s)
            </h4>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={fireApiCall}
              disabled={activeRequest}
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg font-mono text-xs font-medium transition-all ${
                activeRequest
                  ? "bg-muted text-muted-foreground cursor-not-allowed"
                  : "bg-foreground text-background hover:bg-foreground/90 shadow-sm active:scale-95"
              }`}
            >
              <Play className="w-3.5 h-3.5 fill-current" />
              {activeRequest ? "Dispatching..." : "Send GET /api/v1/patients"}
            </button>
          </div>
        </div>

        {/* Console / Response Dashboard */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Status Metric Cards */}
          <div className="space-y-3">
            <div className="p-3.5 rounded-xl border border-border bg-card">
              <div className="text-[11px] font-mono text-muted-foreground">
                BUCKET STATUS
              </div>
              <div className="flex items-center justify-between mt-1">
                <span className="text-lg font-mono font-bold text-foreground">
                  {Math.max(0, 5 - requestCount)} / 5
                </span>
                <span className="text-xs font-mono text-muted-foreground">
                  Tokens Left
                </span>
              </div>
              <div className="w-full bg-muted h-1.5 rounded-full mt-2 overflow-hidden">
                <div
                  className={`h-full transition-all duration-300 ${
                    rateLimitExceeded ? "bg-rose-500 w-full" : "bg-emerald-500"
                  }`}
                  style={{
                    width: rateLimitExceeded
                      ? "100%"
                      : `${Math.max(0, (5 - requestCount) / 5) * 100}%`,
                  }}
                />
              </div>
            </div>

            <div className="p-3.5 rounded-xl border border-border bg-card">
              <div className="text-[11px] font-mono text-muted-foreground">
                EDGE ROUND-TRIP LATENCY
              </div>
              <div className="text-lg font-mono font-bold text-emerald-600 dark:text-emerald-400 mt-1">
                {latestLatency ? `${latestLatency} ms` : "—"}
              </div>
              <div className="text-[11px] text-muted-foreground mt-0.5">
                TLS 1.3 handshake + Redis check
              </div>
            </div>
          </div>

          {/* Real-time Response Terminal */}
          <div className="md:col-span-2 rounded-xl border border-border bg-muted/40 p-4 font-mono text-xs flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between border-b border-border pb-2 mb-2 text-muted-foreground text-[11px]">
                <div className="flex items-center gap-1.5">
                  <div className="w-2 h-2 rounded-full bg-muted-foreground/40" />
                  <span>RESPONSE STREAM</span>
                </div>
                <span>HTTP HEADERS PREVIEW</span>
              </div>

              {responseLog.length === 0 ? (
                <div className="py-7 text-center text-muted-foreground text-xs">
                  Hit{" "}
                  <span className="text-emerald-600 dark:text-emerald-400 font-semibold">
                    &ldquo;Send GET&rdquo;
                  </span>{" "}
                  to observe pipeline latency and Redis header throttles.
                </div>
              ) : (
                <div className="space-y-2">
                  {responseLog.map((log) => (
                    <div
                      key={log.id}
                      className="flex items-center justify-between p-2 rounded bg-card border border-border text-foreground"
                    >
                      <div className="flex items-center gap-2">
                        {log.status === 200 ? (
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                        ) : (
                          <AlertTriangle className="w-3.5 h-3.5 text-rose-500" />
                        )}
                        <span
                          className={`font-bold ${
                            log.status === 200
                              ? "text-emerald-600 dark:text-emerald-400"
                              : "text-rose-500"
                          }`}
                        >
                          HTTP {log.status}
                        </span>
                        <span className="text-muted-foreground">
                          [{log.timestamp}]
                        </span>
                      </div>
                      <div className="flex items-center gap-3 text-muted-foreground">
                        <span>X-RateLimit-Remaining: {log.tokenRemaining}</span>
                        <span className="text-foreground font-medium">
                          {log.latency}ms
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {rateLimitExceeded && (
              <div className="mt-3 p-2 rounded bg-rose-500/10 border border-rose-500/30 text-rose-700 dark:text-rose-300 text-[11px] flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 shrink-0 text-rose-500" />
                <span>
                  <strong>HTTP 429 Too Many Requests:</strong> Sliding window
                  limit breached. Tokens will automatically refill.
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
