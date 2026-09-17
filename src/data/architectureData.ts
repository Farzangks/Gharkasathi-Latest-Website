import { ArchitectureComponent, SystemMetric } from '../types';

export const GHARKASATHI_METRICS: SystemMetric[] = [
  {
    label: 'Target Peak Throughput',
    target: '25,000 req/sec',
    current: '28,400 benchmarked',
    status: 'optimal',
    detail: 'Autoscaling cluster via K8s HPA with warm standby pods',
  },
  {
    label: 'P99 Service Latency',
    target: '< 65 ms',
    current: '42 ms (Edge + Cache)',
    status: 'optimal',
    detail: 'Distributed CDN edge points + Redis cluster L1 caching',
  },
  {
    label: 'Database Availability',
    target: '99.99% Multi-AZ',
    current: '99.995% SLA',
    status: 'optimal',
    detail: 'Primary-Replica PostgreSQL cluster with automated failover in <10s',
  },
  {
    label: 'End-to-End Encryption',
    target: 'TLS 1.3 + AES-256-GCM',
    current: 'Compliant',
    status: 'healthy',
    detail: 'Strict mTLS internal service-to-service communication via Envoy mesh',
  },
];

export const ARCHITECTURE_COMPONENTS: ArchitectureComponent[] = [
  {
    id: 'api-gateway',
    name: 'Cloud Edge API Gateway & Ingress Router',
    category: 'edge_gateway',
    techStack: ['Traefik / Kong Gateway', 'Cloudflare Edge CDN', 'OAuth2 / OIDC', 'Envoy Sidecar'],
    status: 'production_ready',
    description: 'Reverse proxy and intelligent edge routing layer handling SSL termination, global rate limiting, DDoS mitigation, and JWT verification before routing to internal microservices.',
    responsibilities: [
      'SSL/TLS 1.3 termination and HTTP/2 + HTTP/3 multiplexing',
      'Distributed rate limiting (Token Bucket algorithm via Redis)',
      'Cross-Origin Resource Sharing (CORS) and security headers injection',
      'Dynamic routing & canary deployments (weighted splitting)',
    ],
    scalabilityStrategy: 'Globally distributed edge Anycast IPs with stateless gateway instances scaled horizontally based on CPU & connection thresholds.',
    apiEndpointsSample: [
      'POST /api/v1/auth/exchange-session',
      'GET /api/v1/user/profile',
      'POST /api/v1/service-requests/dispatch',
    ],
    resilienceMechanisms: ['Circuit breaker pattern', 'Automatic retry on idempotent GETs with jitter', 'Fallback static page response'],
    latencySLA: '< 8ms overhead',
  },
  {
    id: 'identity-service',
    name: 'Identity, RBAC & Session Manager',
    category: 'core_services',
    techStack: ['Node.js / Go', 'Firebase Auth / Keycloak', 'Argon2id', 'JWT (RS256)'],
    status: 'production_ready',
    description: 'Centralized authentication authority enforcing strict Role-Based Access Control (RBAC) across Gharkasathi customers, verified service partners, internal ops, and admin teams.',
    responsibilities: [
      'Dual-token architecture (short-lived 15m access token + encrypted refresh token)',
      'Multi-factor authentication (SMS OTP, TOTP, and Google Workspace SSO)',
      'Granular permission checking and claims minting',
      'Real-time token revocation and audit logging',
    ],
    scalabilityStrategy: 'Stateless session verification using public key caching (JWKS endpoint) avoiding database hits per microservice request.',
    apiEndpointsSample: [
      'POST /api/v1/auth/phone-login',
      'POST /api/v1/auth/verify-otp',
      'POST /api/v1/auth/refresh',
    ],
    resilienceMechanisms: ['In-memory JWKS cache', 'Rate-limited authentication retry shields', 'Dead-letter queue on audit writes'],
    latencySLA: '< 30ms auth verification',
  },
  {
    id: 'matching-dispatch-engine',
    name: 'Real-Time Geo-Matching & Dispatch Engine',
    category: 'core_services',
    techStack: ['Go / Node.js Microservice', 'PostGIS', 'H3 Spatial Index (Uber)', 'WebSockets / gRPC'],
    status: 'in_development',
    description: 'High-speed spatial dispatch engine that pairs home-service requests (plumbing, cleaning, repairs, electrical) with nearby verified service providers based on distance, rating, and availability.',
    responsibilities: [
      'Hexagonal spatial indexing (Uber H3) for sub-millisecond proximity lookup',
      'Provider status tracking (Online, Busy, En Route, On-site)',
      'Dynamic surge pricing and provider dispatch scoring algorithm',
      'Real-time WebSocket event emission for live provider dispatch updates',
    ],
    scalabilityStrategy: 'Geographic partitioning (sharded by city/metro cell clusters) running on distributed worker pools.',
    apiEndpointsSample: [
      'POST /api/v1/dispatch/match',
      'GET /api/v1/providers/live-nearby',
      'POST /api/v1/dispatch/accept-job',
    ],
    resilienceMechanisms: ['Cascading timeout fallbacks with secondary broadcast rings', 'State recovery from Redis snapshot'],
    latencySLA: '< 85ms dispatch match compute',
  },
  {
    id: 'booking-order-core',
    name: 'Booking, Order State Machine & Ledger',
    category: 'core_services',
    techStack: ['TypeScript', 'Express / NestJS', 'PostgreSQL (ACID)', 'Prisma / Drizzle'],
    status: 'production_ready',
    description: 'Guarantees transaction consistency for service reservations, scheduling windows, invoice line items, and audit histories without double-booking risk.',
    responsibilities: [
      'Strict finite state machine (Created -> Confirmed -> Assigned -> In Progress -> Completed -> Paid)',
      'Optimistic locking on provider timeslots to eliminate race conditions',
      'Immutable audit event generation for dispute resolution',
      'Tax calculation, coupon redemption, and platform commission split',
    ],
    scalabilityStrategy: 'Read replicas for customer history queries; read-write split with connection pooling (PgBouncer).',
    apiEndpointsSample: [
      'POST /api/v1/bookings/create',
      'PATCH /api/v1/bookings/:id/reschedule',
      'POST /api/v1/bookings/:id/complete',
    ],
    resilienceMechanisms: ['Distributed locks via Redlock', 'Idempotency keys on all financial mutations', 'Two-phase commit safeguards'],
    latencySLA: '< 55ms transactional commit',
  },
  {
    id: 'database-storage-layer',
    name: 'Primary Relational & Hot Cache Data Tier',
    category: 'database_storage',
    techStack: ['PostgreSQL 16 Multi-AZ', 'Redis 7 Cluster', 'PgBouncer', 'Google Cloud Storage'],
    status: 'production_ready',
    description: 'Dual-tier storage combining ACID-compliant relational storage for financial & booking data with ultra-low latency Redis caching for user sessions and geospatial telemetry.',
    responsibilities: [
      'PostgreSQL cluster with primary write master and 3 read replicas with streaming replication',
      'Automated nightly incremental snapshots and continuous WAL archiving (Point-In-Time-Recovery)',
      'Redis cluster for transient session state, rate limit token buckets, and pub/sub channels',
      'Encrypted object storage bucket for user receipts, KYC verification documents, and invoices',
    ],
    scalabilityStrategy: 'PgBouncer connection pooling supporting 10,000+ client connections; partition tables by year/month for historical orders.',
    resilienceMechanisms: ['Automatic health-check failover under 15s', 'Circuit breaker on cache miss stampede', 'Encrypted backups'],
    latencySLA: 'Postgres: < 12ms | Redis: < 2ms',
  },
  {
    id: 'kafka-event-streaming',
    name: 'Asynchronous Event Bus & Message Queue',
    category: 'async_event_stream',
    techStack: ['Apache Kafka / RabbitMQ', 'BullMQ (Redis workers)', 'Google Cloud Pub/Sub'],
    status: 'in_development',
    description: 'Decoupled event backbone enabling event-driven architecture across notifications, analytical telemetry, partner payout generation, and fraud heuristics.',
    responsibilities: [
      'Publishing domain events: `OrderCreated`, `ProviderAssigned`, `PaymentSettled`',
      'Asynchronous background job dispatching (SMS/WhatsApp notifications, PDF invoice generation)',
      'Real-time streaming ingestion into analytical data warehouse (BigQuery / ClickHouse)',
      'Guaranteed at-least-once message delivery with dead-letter queue (DLQ) retry policies',
    ],
    scalabilityStrategy: 'Partitioned topic architecture allowing horizontal scaling of consumer groups without lock contention.',
    resilienceMechanisms: ['Exponential backoff retries with maximum retry caps', 'Dead-letter queues with automated ops alerting'],
    latencySLA: '< 20ms publish acknowledgement',
  },
  {
    id: 'security-compliance-vault',
    name: 'Zero-Trust Security, KMS & Compliance Shield',
    category: 'security_compliance',
    techStack: ['Google Cloud KMS', 'Vault by HashiCorp', 'OWASP WAF Rules', 'mTLS Service Mesh'],
    status: 'production_ready',
    description: 'Protects customer PII, addresses, and partner financial KYC data under ISO 27001, SOC2, and Indian DPDP (Digital Personal Data Protection) compliance standards.',
    responsibilities: [
      'Column-level envelope encryption for Aadhaar/PAN, phone numbers, and home addresses',
      'Automated secret rotation (DB credentials, API keys) every 30 days',
      'Comprehensive SIEM audit log stream with tamper-evident cryptographic hashing',
      'Sanitization pipeline preventing SQLi, XSS, and Server-Side Request Forgery (SSRF)',
    ],
    scalabilityStrategy: 'Dedicated hardware security modules (HSM) and distributed envelope caching for high-speed decrypts.',
    resilienceMechanisms: ['Dual-region key replication', 'Emergency token invalidation kill-switch'],
    latencySLA: '< 5ms envelope decrypt',
  },
  {
    id: 'devops-infrastructure-k8s',
    name: 'Cloud-Native Container Orchestration & CI/CD',
    category: 'devops_infra',
    techStack: ['Kubernetes (GKE / EKS)', 'Terraform (IaC)', 'ArgoCD (GitOps)', 'Prometheus & Grafana'],
    status: 'production_ready',
    description: 'Zero-downtime deployment pipelines with continuous observability, automated pod scaling, and multi-zone disaster recovery.',
    responsibilities: [
      'GitOps-driven continuous deployment with automated rollbacks on health check degradation',
      'Prometheus alerting on 4 Golden Signals: Latency, Traffic, Errors, Saturation',
      'Distributed OpenTelemetry tracing across all API calls',
      'Infrastructure as Code (Terraform) guaranteeing reproducible cloud environments',
    ],
    scalabilityStrategy: 'Horizontal Pod Autoscaler (HPA) triggering at 70% CPU/Memory + Cluster Autoscaler provisioning cloud nodes dynamically.',
    resilienceMechanisms: ['Multi-AZ node distribution', 'Disaster recovery RPO < 15m, RTO < 30m'],
    latencySLA: 'Zero-downtime rolling deploys',
  }
];

export const ARCHITECTURE_MARKDOWN_EXPORT = `# Gharkasathi Backend Architecture Strategy & Technical Blueprint
**Author:** Chief Technology Officer (CTO) Office, Gharkasathi
**Confidentiality:** Proprietary Enterprise Architecture
**Target Scale:** 5,000,000 Monthly Active Users (MAU) | 50,000 Daily Completed Service Orders
**Date:** March 2025

---

## 1. Executive Summary & Architectural Philosophy
Gharkasathi is built on an asynchronous, event-driven, micro-modular architecture designed for high availability (99.99%), zero data loss, sub-65ms P99 latency, and rapid geographical expansion across tiered cities.

### Core Architectural Pillars:
1. **Domain Isolation**: Separation of Edge Routing, Spatial Matching, Order Lifecycle, and Financial Reconciliation.
2. **ACID Guarantees Where Money Matters**: Financials, invoice ledgers, and booking reservations leverage strict PostgreSQL transactional isolation.
3. **High-Performance Geospatial Dispatch**: Uber H3 spatial indexing with PostGIS enables immediate provider-to-customer matching in <85ms.
4. **Zero-Trust Security & DPDP Compliance**: Field-level encryption for customer addresses and phone numbers; strict role-based token validation.

---

## 2. Layer-by-Layer Architectural Breakdown

### 2.1 Edge & Ingress Layer
- **Components**: Cloud Edge CDN, Anycast DNS, Traefik API Gateway.
- **Responsibilities**: DDoS mitigation, SSL 1.3 termination, rate limiting via Redis token buckets, JWT public key validation.
- **SLA**: < 8ms overhead.

### 2.2 Core Application Microservices
1. **Identity & RBAC Service**: Dual-token pattern (15m JWT + encrypted refresh token).
2. **Spatial Dispatch Engine**: PostGIS + H3 Hexagonal Grid for dynamic provider matching.
3. **Booking & Order State Machine**: Finite state machine with optimistic locking preventing double reservations.
4. **Partner Payout & Invoicing Ledger**: Double-entry ledger with cryptographic idempotency keys.

### 2.3 Data & Storage Tier
- **PostgreSQL 16**: Primary-Replica cluster with PgBouncer connection pooling.
- **Redis 7 Cluster**: Real-time provider location telemetry, rate limiting, and pub/sub channels.
- **Cloud Storage**: AES-256 encrypted bucket for KYC documents, receipts, and invoices.

### 2.4 Asynchronous Event Backbone
- **Kafka / Cloud Pub/Sub**: Topics for \`OrderCreated\`, \`ProviderAssigned\`, \`PaymentSettled\`.
- **Worker Pools**: BullMQ background processors for WhatsApp notifications, tax calculations, and analytics ingestion.

---

## 3. Disaster Recovery & Scalability Matrix
- **Recovery Point Objective (RPO)**: < 15 minutes (continuous WAL archiving).
- **Recovery Time Objective (RTO)**: < 30 minutes (Terraform automated spin-up).
- **Autoscaling Thresholds**: Pod autoscaling triggers at 70% CPU / Memory utilization.

---
*Generated by the Gharkasathi CTO Console and synchronized with Google Drive.*
`;
