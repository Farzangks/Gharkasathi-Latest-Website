import React, { useState } from 'react';
import { 
  Briefcase, 
  CheckCircle2, 
  Flame, 
  Layers, 
  Calendar, 
  GitBranch, 
  Cpu, 
  Database,
  ArrowRight,
  Sparkles,
  Sliders
} from 'lucide-react';

interface Milestone {
  phase: string;
  title: string;
  timeline: string;
  status: 'completed' | 'in_progress' | 'upcoming';
  objectives: string[];
  deliverables: string[];
  kpis: string;
}

export const CtoRoadmap: React.FC = () => {
  const [selectedPhase, setSelectedPhase] = useState<number>(1);

  const milestones: Milestone[] = [
    {
      phase: 'Phase 1: Foundation',
      title: 'Monolith Decoupling & Ingress Gateway Setup',
      timeline: 'Q1 2025 (Weeks 1 - 6)',
      status: 'completed',
      objectives: [
        'Establish Traefik Ingress Gateway with TLS 1.3 termination and CORS rules',
        'Deploy centralized OAuth2/OIDC Auth Service with Google Workspace SSO & phone OTP',
        'Configure PostgreSQL Multi-AZ cluster with PgBouncer connection pooling',
      ],
      deliverables: [
        'Production Traefik Helm chart configuration',
        'JWT token validation middleware library',
        'PostgreSQL automated WAL archiving & backup runbook',
      ],
      kpis: 'Auth latency < 35ms; 100% idempotent authentication endpoints',
    },
    {
      phase: 'Phase 2: Scale Core Services',
      title: 'Geospatial Dispatch Engine & Booking State Machine',
      timeline: 'Q2 2025 (Weeks 7 - 14)',
      status: 'in_progress',
      objectives: [
        'Implement Uber H3 spatial index for 85ms partner-to-consumer matching',
        'Build ACID-compliant booking state machine with optimistic locking on timeslots',
        'Deploy Redis Cluster for real-time provider location telemetry tracking',
      ],
      deliverables: [
        'Spatial Dispatch microservice with PostGIS and Redis GEO API',
        'Finite State Machine order engine preventing double reservations',
        'Real-time WebSocket cluster for live provider dispatch status',
      ],
      kpis: 'P99 match latency < 85ms; Zero double-booking concurrency defects',
    },
    {
      phase: 'Phase 3: Event-Driven Scale',
      title: 'Kafka Event Bus, Async Workers & Data Lake',
      timeline: 'Q3 2025 (Weeks 15 - 22)',
      status: 'upcoming',
      objectives: [
        'Set up Apache Kafka / Cloud Pub-Sub cluster for domain event streaming',
        'Deploy BullMQ worker pools for WhatsApp notifications and automated invoice generation',
        'Establish BigQuery data ingestion pipeline for cohort retention analytics',
      ],
      deliverables: [
        'Event bus producer/consumer standard library with DLQ retries',
        'Automated billing, GST tax invoice generation pipeline',
        'Operational Grafana dashboards for 4 Golden Signals',
      ],
      kpis: 'Throughput capacity of 25,000 req/sec; Zero message loss in DLQ',
    },
    {
      phase: 'Phase 4: Multi-Region & AI Optimization',
      title: 'Dynamic Surge Pricing & Zero-Trust Security Hardening',
      timeline: 'Q4 2025 (Weeks 23 - 32)',
      status: 'upcoming',
      objectives: [
        'Integrate AI dispatch optimization & demand forecasting engine',
        'Execute SOC2 Type II audit readiness & DPDP data compliance certification',
        'Multi-region warm standby disaster recovery drills',
      ],
      deliverables: [
        'AI demand forecasting API for dynamic partner incentives',
        'Column-level envelope encryption with Google Cloud KMS',
        'Automated multi-region failover pipeline (RTO < 30min)',
      ],
      kpis: '99.995% uptime SLA; 100% compliance with India DPDP Act',
    },
  ];

  return (
    <div id="cto-roadmap-section" className="bg-white rounded-xl border border-stone-200 shadow-xs p-6 space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h3 className="text-base font-bold text-stone-900 flex items-center gap-2">
            Gharkasathi CTO Technical Execution Roadmap
            <span className="text-[11px] font-medium px-2 py-0.5 rounded-full bg-amber-50 text-amber-700 border border-amber-200">
              Executive Engineering Plan
            </span>
          </h3>
          <p className="text-xs text-stone-500">
            Strategic quarterly engineering deliverables transitioning Gharkasathi from early-stage to high-throughput enterprise scale.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {milestones.map((m, idx) => (
            <button
              key={idx}
              onClick={() => setSelectedPhase(idx)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                selectedPhase === idx
                  ? 'bg-stone-900 text-white shadow-xs'
                  : 'bg-stone-100 hover:bg-stone-200 text-stone-600'
              }`}
            >
              Phase {idx + 1}
            </button>
          ))}
        </div>
      </div>

      {/* Selected Phase Detail */}
      {milestones[selectedPhase] && (
        <div className="bg-stone-50 rounded-xl p-6 border border-stone-200 space-y-6">
          <div className="flex flex-wrap items-start justify-between gap-4 pb-4 border-b border-stone-200">
            <div>
              <span className="text-xs font-semibold text-emerald-700 uppercase tracking-wider">
                {milestones[selectedPhase].phase} &bull; {milestones[selectedPhase].timeline}
              </span>
              <h4 className="text-lg font-bold text-stone-900 mt-0.5">
                {milestones[selectedPhase].title}
              </h4>
            </div>

            <div>
              {milestones[selectedPhase].status === 'completed' && (
                <span className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Phase Complete
                </span>
              )}
              {milestones[selectedPhase].status === 'in_progress' && (
                <span className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1 rounded-full bg-amber-100 text-amber-800 border border-amber-300">
                  <Flame className="w-3.5 h-3.5 animate-pulse" /> Active CTO Sprint
                </span>
              )}
              {milestones[selectedPhase].status === 'upcoming' && (
                <span className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1 rounded-full bg-stone-200 text-stone-700 border border-stone-300">
                  <Calendar className="w-3.5 h-3.5" /> Next in Pipeline
                </span>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h5 className="text-xs font-bold text-stone-800 uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
                <GitBranch className="w-3.5 h-3.5 text-emerald-600" />
                Strategic Architectural Objectives
              </h5>
              <ul className="space-y-2 text-xs text-stone-700">
                {milestones[selectedPhase].objectives.map((obj, i) => (
                  <li key={i} className="flex items-start gap-2 bg-white p-2.5 rounded-lg border border-stone-200">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 mt-1.5 shrink-0" />
                    <span>{obj}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h5 className="text-xs font-bold text-stone-800 uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
                <Briefcase className="w-3.5 h-3.5 text-indigo-600" />
                Key Engineering Deliverables
              </h5>
              <ul className="space-y-2 text-xs text-stone-700">
                {milestones[selectedPhase].deliverables.map((del, i) => (
                  <li key={i} className="flex items-start gap-2 bg-white p-2.5 rounded-lg border border-stone-200">
                    <span className="w-1.5 h-1.5 rounded-full bg-indigo-600 mt-1.5 shrink-0" />
                    <span>{del}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="p-3 bg-white rounded-lg border border-stone-200 flex items-center justify-between gap-4">
            <div className="text-xs text-stone-500">
              <strong className="text-stone-800 font-semibold">Success KPI / SLA:</strong> {milestones[selectedPhase].kpis}
            </div>
            <span className="text-[11px] font-mono text-emerald-700 font-semibold px-2 py-0.5 rounded bg-emerald-50 border border-emerald-200">
              Verified by CTO
            </span>
          </div>
        </div>
      )}
    </div>
  );
};
