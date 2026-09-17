import React, { useState } from 'react';
import { ArchitectureComponent } from '../types';
import { 
  Server, 
  Database, 
  ShieldCheck, 
  Activity, 
  Cpu, 
  Layers, 
  CheckCircle2, 
  Clock, 
  GitCommit,
  ChevronRight,
  Terminal,
  Zap
} from 'lucide-react';

interface ArchitectureViewerProps {
  components: ArchitectureComponent[];
}

export const ArchitectureViewer: React.FC<ArchitectureViewerProps> = ({ components }) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [selectedId, setSelectedId] = useState<string>(components[0]?.id || '');

  const categories = [
    { id: 'all', label: 'All Modules' },
    { id: 'edge_gateway', label: 'Edge & Ingress' },
    { id: 'core_services', label: 'Core Microservices' },
    { id: 'database_storage', label: 'Database & Cache' },
    { id: 'async_event_stream', label: 'Event Backbone' },
    { id: 'security_compliance', label: 'Security & KMS' },
    { id: 'devops_infra', label: 'K8s Infrastructure' },
  ];

  const filtered = activeCategory === 'all' 
    ? components 
    : components.filter(c => c.category === activeCategory);

  const selected = components.find(c => c.id === selectedId) || components[0];

  const getStatusBadge = (status: ArchitectureComponent['status']) => {
    switch (status) {
      case 'production_ready':
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-medium px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
            <CheckCircle2 className="w-3 h-3" /> Ready for Production
          </span>
        );
      case 'in_development':
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-medium px-2 py-0.5 rounded-full bg-amber-50 text-amber-700 border border-amber-200">
            <Clock className="w-3 h-3" /> In Development
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-medium px-2 py-0.5 rounded-full bg-stone-100 text-stone-600 border border-stone-200">
            <GitCommit className="w-3 h-3" /> Planned
          </span>
        );
    }
  };

  const getCategoryIcon = (cat: string) => {
    switch (cat) {
      case 'edge_gateway': return <Server className="w-4 h-4 text-sky-600" />;
      case 'core_services': return <Cpu className="w-4 h-4 text-emerald-600" />;
      case 'database_storage': return <Database className="w-4 h-4 text-amber-600" />;
      case 'async_event_stream': return <Activity className="w-4 h-4 text-violet-600" />;
      case 'security_compliance': return <ShieldCheck className="w-4 h-4 text-rose-600" />;
      case 'devops_infra': return <Layers className="w-4 h-4 text-indigo-600" />;
      default: return <Server className="w-4 h-4 text-stone-600" />;
    }
  };

  return (
    <div id="architecture-viewer" className="space-y-6">
      {/* Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 border-b border-stone-200">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id)}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
              activeCategory === cat.id
                ? 'bg-stone-900 text-white shadow-xs'
                : 'bg-stone-100 hover:bg-stone-200 text-stone-700'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Main Grid: Component List and Active Detail Inspector */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Component selection list */}
        <div className="lg:col-span-5 space-y-3">
          <div className="text-xs font-semibold text-stone-500 uppercase tracking-wider px-1">
            System Modules ({filtered.length})
          </div>

          <div className="space-y-2">
            {filtered.map((item) => {
              const isSelected = item.id === selectedId;
              return (
                <div
                  key={item.id}
                  id={`module-card-${item.id}`}
                  onClick={() => setSelectedId(item.id)}
                  className={`p-4 rounded-xl border transition-all cursor-pointer text-left ${
                    isSelected
                      ? 'bg-stone-50 border-stone-900 shadow-xs ring-1 ring-stone-900'
                      : 'bg-white border-stone-200 hover:border-stone-300 hover:bg-stone-50/50'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2 mb-1.5">
                    <div className="flex items-center gap-2">
                      <div className="p-1.5 rounded-md bg-stone-100">
                        {getCategoryIcon(item.category)}
                      </div>
                      <h4 className="text-sm font-semibold text-stone-900 leading-snug">
                        {item.name}
                      </h4>
                    </div>
                    <ChevronRight className={`w-4 h-4 transition-transform shrink-0 mt-1 ${isSelected ? 'rotate-90 text-stone-900' : 'text-stone-400'}`} />
                  </div>

                  <p className="text-xs text-stone-600 line-clamp-2 mb-3 leading-relaxed">
                    {item.description}
                  </p>

                  <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-stone-100">
                    <div className="flex flex-wrap gap-1">
                      {item.techStack.slice(0, 2).map((tech, i) => (
                        <span key={i} className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-stone-100 text-stone-700">
                          {tech}
                        </span>
                      ))}
                      {item.techStack.length > 2 && (
                        <span className="text-[10px] font-mono px-1 rounded bg-stone-100 text-stone-500">
                          +{item.techStack.length - 2}
                        </span>
                      )}
                    </div>
                    {getStatusBadge(item.status)}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Deep Architectural Spec & Strategy */}
        <div className="lg:col-span-7">
          {selected && (
            <div id="module-detail-panel" className="bg-white rounded-xl border border-stone-200 shadow-xs p-6 sticky top-6 space-y-6">
              {/* Header */}
              <div className="flex items-start justify-between gap-4 pb-4 border-b border-stone-200">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    {getCategoryIcon(selected.category)}
                    <span className="text-xs font-semibold text-stone-500 uppercase tracking-wider">
                      Module Specification
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-stone-900 leading-tight">
                    {selected.name}
                  </h3>
                </div>
                <div>{getStatusBadge(selected.status)}</div>
              </div>

              {/* Description */}
              <div>
                <h5 className="text-xs font-bold text-stone-700 uppercase tracking-wider mb-1.5">
                  Functional Purpose
                </h5>
                <p className="text-xs text-stone-700 leading-relaxed bg-stone-50 p-3 rounded-lg border border-stone-100">
                  {selected.description}
                </p>
              </div>

              {/* Responsibilities */}
              <div>
                <h5 className="text-xs font-bold text-stone-700 uppercase tracking-wider mb-2">
                  Key Technical Responsibilities
                </h5>
                <ul className="space-y-1.5 text-xs text-stone-700">
                  {selected.responsibilities.map((r, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 mt-1.5 shrink-0" />
                      <span>{r}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Technology Stack Grid */}
              <div>
                <h5 className="text-xs font-bold text-stone-700 uppercase tracking-wider mb-2">
                  Engineered Tech Stack
                </h5>
                <div className="flex flex-wrap gap-1.5">
                  {selected.techStack.map((tech, i) => (
                    <span
                      key={i}
                      className="inline-flex items-center gap-1 text-xs font-mono font-medium px-2.5 py-1 rounded-md bg-stone-100 text-stone-800 border border-stone-200"
                    >
                      <Zap className="w-3 h-3 text-amber-500" />
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Scalability & Latency SLA */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <div className="p-3 bg-stone-50 rounded-lg border border-stone-200">
                  <div className="text-[11px] font-semibold text-stone-500 uppercase tracking-wider mb-1">
                    Latency Target / SLA
                  </div>
                  <div className="text-xs font-bold text-stone-900 font-mono">
                    {selected.latencySLA}
                  </div>
                </div>

                <div className="p-3 bg-stone-50 rounded-lg border border-stone-200">
                  <div className="text-[11px] font-semibold text-stone-500 uppercase tracking-wider mb-1">
                    Fault Resilience Pattern
                  </div>
                  <div className="text-[11px] text-stone-700 font-medium">
                    {selected.resilienceMechanisms.join(', ')}
                  </div>
                </div>
              </div>

              {/* Scalability Strategy */}
              <div>
                <h5 className="text-xs font-bold text-stone-700 uppercase tracking-wider mb-1.5">
                  Horizontal Scalability Strategy
                </h5>
                <p className="text-xs text-stone-600 leading-relaxed">
                  {selected.scalabilityStrategy}
                </p>
              </div>

              {/* Sample API Endpoints */}
              {selected.apiEndpointsSample && selected.apiEndpointsSample.length > 0 && (
                <div>
                  <h5 className="text-xs font-bold text-stone-700 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                    <Terminal className="w-3.5 h-3.5 text-stone-500" />
                    Core API Endpoints
                  </h5>
                  <div className="space-y-1 bg-stone-900 rounded-lg p-3 text-[11px] font-mono text-emerald-400">
                    {selected.apiEndpointsSample.map((ep, i) => (
                      <div key={i} className="flex items-center gap-2">
                        <span className="text-stone-500">$</span>
                        <span>{ep}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
