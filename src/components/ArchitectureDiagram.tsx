import React from 'react';
import { 
  Server, 
  Database, 
  Radio, 
  ArrowRight, 
  ArrowDown, 
  Globe, 
  ShieldCheck, 
  Smartphone, 
  Users, 
  Bell, 
  Cpu
} from 'lucide-react';

export const ArchitectureDiagram: React.FC = () => {
  return (
    <div id="architecture-diagram-section" className="bg-white rounded-xl border border-stone-200 shadow-xs p-6 space-y-6">
      <div>
        <h3 className="text-base font-bold text-stone-900 flex items-center gap-2">
          End-to-End System Topology Diagram
          <span className="text-[11px] font-medium px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200">
            Microservice Topology
          </span>
        </h3>
        <p className="text-xs text-stone-500">
          Visual representation of traffic flow from Gharkasathi clients down to transactional persistence and event workers.
        </p>
      </div>

      <div className="bg-stone-50 rounded-xl p-6 border border-stone-200 space-y-6">
        {/* Tier 1: Clients */}
        <div>
          <div className="text-[11px] font-bold text-stone-400 uppercase tracking-wider mb-2">
            Tier 1: Client Interfaces
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div className="p-3 bg-white rounded-lg border border-stone-200 flex items-center gap-3">
              <Smartphone className="w-5 h-5 text-emerald-600" />
              <div>
                <div className="text-xs font-semibold text-stone-900">Consumer Mobile App</div>
                <div className="text-[11px] text-stone-500">React Native / Flutter &bull; iOS & Android</div>
              </div>
            </div>

            <div className="p-3 bg-white rounded-lg border border-stone-200 flex items-center gap-3">
              <Users className="w-5 h-5 text-sky-600" />
              <div>
                <div className="text-xs font-semibold text-stone-900">Partner / Provider App</div>
                <div className="text-[11px] text-stone-500">Real-time GPS Telemetry & Job Acceptance</div>
              </div>
            </div>

            <div className="p-3 bg-white rounded-lg border border-stone-200 flex items-center gap-3">
              <Globe className="w-5 h-5 text-violet-600" />
              <div>
                <div className="text-xs font-semibold text-stone-900">Operations & Admin Portal</div>
                <div className="text-[11px] text-stone-500">Next.js / Vite Internal Backoffice</div>
              </div>
            </div>
          </div>
        </div>

        {/* Down Arrow */}
        <div className="flex justify-center text-stone-400">
          <ArrowDown className="w-5 h-5 animate-bounce" />
        </div>

        {/* Tier 2: Edge & Security */}
        <div>
          <div className="text-[11px] font-bold text-stone-400 uppercase tracking-wider mb-2">
            Tier 2: Ingress & Edge Protection
          </div>
          <div className="p-4 bg-white rounded-lg border-2 border-dashed border-sky-300 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <Server className="w-6 h-6 text-sky-600" />
              <div>
                <div className="text-xs font-bold text-stone-900">Cloudflare Edge CDN + Traefik API Gateway</div>
                <div className="text-[11px] text-stone-600">DDoS Mitigation &bull; SSL 1.3 Termination &bull; Rate Limiting (Token Bucket) &bull; JWT Validation</div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono font-semibold px-2 py-1 bg-sky-50 text-sky-700 rounded border border-sky-200">
                Anycast IP
              </span>
              <span className="text-[10px] font-mono font-semibold px-2 py-1 bg-sky-50 text-sky-700 rounded border border-sky-200">
                mTLS Mesh
              </span>
            </div>
          </div>
        </div>

        {/* Down Arrow */}
        <div className="flex justify-center text-stone-400">
          <ArrowDown className="w-5 h-5" />
        </div>

        {/* Tier 3: Core Microservices */}
        <div>
          <div className="text-[11px] font-bold text-stone-400 uppercase tracking-wider mb-2">
            Tier 3: Core Domain Microservices (Kubernetes Cluster)
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
            <div className="p-3 bg-white rounded-lg border border-stone-200">
              <div className="flex items-center gap-2 mb-1">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span className="text-xs font-bold text-stone-900">Auth & RBAC</span>
              </div>
              <p className="text-[11px] text-stone-500">OAuth2/OIDC, claims minting, multi-tenant roles</p>
            </div>

            <div className="p-3 bg-white rounded-lg border border-stone-200">
              <div className="flex items-center gap-2 mb-1">
                <Radio className="w-4 h-4 text-amber-600" />
                <span className="text-xs font-bold text-stone-900">Spatial Dispatch</span>
              </div>
              <p className="text-[11px] text-stone-500">Uber H3 hexagons, dynamic match scoring</p>
            </div>

            <div className="p-3 bg-white rounded-lg border border-stone-200">
              <div className="flex items-center gap-2 mb-1">
                <Cpu className="w-4 h-4 text-violet-600" />
                <span className="text-xs font-bold text-stone-900">Order FSM</span>
              </div>
              <p className="text-[11px] text-stone-500">Optimistic lock timeslot booking, audit trails</p>
            </div>

            <div className="p-3 bg-white rounded-lg border border-stone-200">
              <div className="flex items-center gap-2 mb-1">
                <Bell className="w-4 h-4 text-indigo-600" />
                <span className="text-xs font-bold text-stone-900">Notification Engine</span>
              </div>
              <p className="text-[11px] text-stone-500">WhatsApp / SMS / Push alerts routing</p>
            </div>
          </div>
        </div>

        {/* Split Arrows */}
        <div className="flex justify-around text-stone-400">
          <ArrowDown className="w-5 h-5" />
          <ArrowDown className="w-5 h-5" />
        </div>

        {/* Tier 4: Storage & Asynchronous Backbone */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 bg-white rounded-lg border border-stone-200">
            <div className="flex items-center gap-2 mb-2">
              <Database className="w-5 h-5 text-amber-600" />
              <div className="text-xs font-bold text-stone-900">State & Storage Tier</div>
            </div>
            <ul className="text-xs text-stone-600 space-y-1 font-mono text-[11px]">
              <li>&bull; PostgreSQL 16 (Primary + 3 Multi-AZ Replicas)</li>
              <li>&bull; Redis 7 (Hot cache, rate limits, spatial indexes)</li>
              <li>&bull; Google Cloud Storage (KYC docs & receipts)</li>
            </ul>
          </div>

          <div className="p-4 bg-white rounded-lg border border-stone-200">
            <div className="flex items-center gap-2 mb-2">
              <Radio className="w-5 h-5 text-violet-600" />
              <div className="text-xs font-bold text-stone-900">Async Event Backbone</div>
            </div>
            <ul className="text-xs text-stone-600 space-y-1 font-mono text-[11px]">
              <li>&bull; Apache Kafka / Cloud Pub/Sub (Order domain events)</li>
              <li>&bull; BullMQ Worker Pools (Invoice PDF generation)</li>
              <li>&bull; BigQuery Data Warehouse (Operational analytics)</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
