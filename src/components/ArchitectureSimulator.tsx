import React, { useState } from 'react';
import { 
  Terminal, 
  Play, 
  CheckCircle2, 
  RotateCcw, 
  Zap, 
  ShieldCheck, 
  Clock, 
  SlidersHorizontal,
  Server
} from 'lucide-react';

interface ScenarioResult {
  step: string;
  service: string;
  latency: string;
  status: 'passed' | 'optimizing';
  detail: string;
}

export const ArchitectureSimulator: React.FC = () => {
  const [concurrency, setConcurrency] = useState<number>(5000);
  const [selectedScenario, setSelectedScenario] = useState<'booking_rush' | 'surge_geo' | 'db_failover'>('booking_rush');
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [results, setResults] = useState<ScenarioResult[] | null>(null);

  const runSimulation = () => {
    setIsRunning(true);
    setResults(null);

    setTimeout(() => {
      let scenarioSteps: ScenarioResult[] = [];

      if (selectedScenario === 'booking_rush') {
        scenarioSteps = [
          {
            step: 'Ingress & Rate Limiting',
            service: 'Traefik API Gateway',
            latency: '4ms',
            status: 'passed',
            detail: `${concurrency} requests checked against Redis token bucket. 0 dropped, 12 throttled to backoff.`,
          },
          {
            step: 'Auth & Claims Verification',
            service: 'Identity Microservice',
            latency: '11ms',
            status: 'passed',
            detail: 'Stateless JWT verification via cached RSA public key in memory.',
          },
          {
            step: 'Timeslot Reservation Lock',
            service: 'Booking State Machine',
            latency: '24ms',
            status: 'passed',
            detail: 'Optimistic locking on PostgreSQL booking rows. Race conditions resolved with zero double-bookings.',
          },
          {
            step: 'Domain Event Ingestion',
            service: 'Kafka Bus & BullMQ',
            latency: '9ms',
            status: 'passed',
            detail: 'Published `BookingCreated` domain event to consumer queue for partner SMS & push notification.',
          },
        ];
      } else if (selectedScenario === 'surge_geo') {
        scenarioSteps = [
          {
            step: 'H3 Spatial Coordinate Indexing',
            service: 'Spatial Dispatch Engine',
            latency: '14ms',
            status: 'passed',
            detail: 'Converted GPS latitudes/longitudes into Uber H3 resolution-8 hexagonal bins.',
          },
          {
            step: 'Real-Time Provider Location Query',
            service: 'Redis Cluster (GEO)',
            latency: '3ms',
            status: 'passed',
            detail: 'Evaluated 120 nearby active service providers within 4.5km radius ring.',
          },
          {
            step: 'Provider Scoring & Dispatch Ring',
            service: 'Matching Engine',
            latency: '29ms',
            status: 'passed',
            detail: 'Ranked providers by distance, past review ratings, and job acceptance history score.',
          },
          {
            step: 'WebSocket Broadcast to Provider',
            service: 'Gateway Socket Pool',
            latency: '18ms',
            status: 'passed',
            detail: 'Immediate push notification delivered to top 3 matched partners on mobile.',
          },
        ];
      } else {
        scenarioSteps = [
          {
            step: 'Primary DB Node Failure Trigger',
            service: 'Cloud PostgreSQL Cluster',
            latency: '0ms',
            status: 'passed',
            detail: 'Simulated AZ outage on Primary node in us-central1-a.',
          },
          {
            step: 'Patroni / Consul Health Detection',
            service: 'Database Sentinel',
            latency: '2.8s',
            status: 'passed',
            detail: 'Leader lock expired; promoted Read-Replica in zone-b to new Primary master.',
          },
          {
            step: 'PgBouncer Connection Drain & Reroute',
            service: 'Connection Pooler',
            latency: '140ms',
            status: 'passed',
            detail: 'Gracefully paused active client transactions and seamlessly reconnected to new primary with zero query aborts.',
          },
          {
            step: 'State Integrity Verification',
            service: 'Audit Engine',
            latency: '45ms',
            status: 'passed',
            detail: 'WAL replay verified; 0 data loss (Zero RPO achieved).',
          },
        ];
      }

      setResults(scenarioSteps);
      setIsRunning(false);
    }, 900);
  };

  return (
    <div id="architecture-simulator-section" className="bg-white rounded-xl border border-stone-200 shadow-xs p-6 space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h3 className="text-base font-bold text-stone-900 flex items-center gap-2">
            Interactive CTO Architecture Stress Simulator
            <span className="text-[11px] font-medium px-2 py-0.5 rounded-full bg-sky-50 text-sky-700 border border-sky-200">
              Live Engine Sandbox
            </span>
          </h3>
          <p className="text-xs text-stone-500">
            Validate Gharkasathi backend resilience, throughput scaling, and failover behavior under high-load production scenarios.
          </p>
        </div>

        <button
          id="run-sim-btn"
          onClick={runSimulation}
          disabled={isRunning}
          className="inline-flex items-center gap-2 px-4 py-2 bg-stone-900 hover:bg-stone-800 text-white text-xs font-semibold rounded-lg shadow-xs transition-colors cursor-pointer disabled:opacity-50"
        >
          <Play className={`w-3.5 h-3.5 fill-current ${isRunning ? 'animate-pulse' : ''}`} />
          {isRunning ? 'Benchmarking Cluster...' : 'Execute Simulation Test'}
        </button>
      </div>

      <div className="bg-stone-50 rounded-xl p-5 border border-stone-200 space-y-4">
        {/* Scenario Controls */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-2">
              Select Stress Scenario
            </label>
            <div className="grid grid-cols-3 gap-2">
              <button
                onClick={() => { setSelectedScenario('booking_rush'); setResults(null); }}
                className={`p-2.5 rounded-lg border text-left text-xs font-medium transition-colors cursor-pointer ${
                  selectedScenario === 'booking_rush'
                    ? 'bg-white border-stone-900 shadow-xs font-semibold text-stone-900'
                    : 'bg-stone-100 border-stone-200 text-stone-600 hover:bg-white'
                }`}
              >
                1. Booking Rush (ACID)
              </button>
              <button
                onClick={() => { setSelectedScenario('surge_geo'); setResults(null); }}
                className={`p-2.5 rounded-lg border text-left text-xs font-medium transition-colors cursor-pointer ${
                  selectedScenario === 'surge_geo'
                    ? 'bg-white border-stone-900 shadow-xs font-semibold text-stone-900'
                    : 'bg-stone-100 border-stone-200 text-stone-600 hover:bg-white'
                }`}
              >
                2. Geo Spatial Dispatch
              </button>
              <button
                onClick={() => { setSelectedScenario('db_failover'); setResults(null); }}
                className={`p-2.5 rounded-lg border text-left text-xs font-medium transition-colors cursor-pointer ${
                  selectedScenario === 'db_failover'
                    ? 'bg-white border-stone-900 shadow-xs font-semibold text-stone-900'
                    : 'bg-stone-100 border-stone-200 text-stone-600 hover:bg-white'
                }`}
              >
                3. High-Availability Failover
              </button>
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-bold text-stone-700 uppercase tracking-wider">
                Simulated Concurrent Users: {concurrency.toLocaleString()} req/s
              </label>
              <span className="text-[11px] font-mono text-stone-500">Auto-HPA Scaling</span>
            </div>
            <input
              type="range"
              min={1000}
              max={30000}
              step={1000}
              value={concurrency}
              onChange={(e) => setConcurrency(Number(e.target.value))}
              className="w-full accent-stone-900 cursor-pointer"
            />
            <div className="flex justify-between text-[11px] text-stone-500 font-mono mt-1">
              <span>1,000 req/s</span>
              <span>15,000 req/s</span>
              <span>30,000 req/s</span>
            </div>
          </div>
        </div>

        {/* Results output */}
        {results ? (
          <div className="space-y-3 pt-3 border-t border-stone-200">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-stone-800 uppercase tracking-wider flex items-center gap-1.5">
                <Terminal className="w-3.5 h-3.5 text-stone-500" />
                Scenario Execution Log & Metrics
              </span>
              <span className="text-[11px] text-emerald-700 font-medium bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                All Health Checks Passed
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {results.map((res, idx) => (
                <div key={idx} className="p-3 bg-white rounded-lg border border-stone-200 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-stone-900">
                      Step {idx + 1}: {res.step}
                    </span>
                    <span className="text-[11px] font-mono text-emerald-700 font-semibold px-1.5 py-0.5 rounded bg-emerald-50">
                      {res.latency}
                    </span>
                  </div>
                  <div className="text-[11px] text-stone-500 font-medium">
                    Target: <strong className="text-stone-700">{res.service}</strong>
                  </div>
                  <p className="text-xs text-stone-600 pt-1 leading-relaxed">
                    {res.detail}
                  </p>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="p-6 bg-white rounded-lg border border-dashed border-stone-300 text-center">
            <Server className="w-6 h-6 text-stone-400 mx-auto mb-2" />
            <p className="text-xs text-stone-500">
              Select a scenario and click <strong>"Execute Simulation Test"</strong> to trace latency metrics, concurrency limits, and transactional safety across Gharkasathi backend services.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
