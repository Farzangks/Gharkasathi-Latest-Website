import React, { useState, useEffect } from 'react';
import { User } from 'firebase/auth';
import { 
  Building2, 
  Terminal, 
  HardDrive, 
  Layers, 
  ShieldCheck, 
  TrendingUp, 
  FileText, 
  Sparkles,
  Server,
  Zap
} from 'lucide-react';
import { initAuth, googleSignIn, logout } from './services/auth';
import { Header } from './components/Header';
import { ArchitectureViewer } from './components/ArchitectureViewer';
import { ArchitectureDiagram } from './components/ArchitectureDiagram';
import { CtoRoadmap } from './components/CtoRoadmap';
import { ArchitectureSimulator } from './components/ArchitectureSimulator';
import { GoogleDriveSync } from './components/GoogleDriveSync';
import { LiveAdminPanel } from './components/LiveAdminPanel';
import { HostingerDeploymentGuide } from './components/HostingerDeploymentGuide';
import { FlutterGlitchFixGuide } from './components/FlutterGlitchFixGuide';
import { Cto3DayLaunchPlan } from './components/Cto3DayLaunchPlan';
import { CustomerWebsite } from './components/CustomerWebsite';
import { ExecutiveTopBar } from './components/ExecutiveTopBar';
import { GharkasathiAiAssistant } from './components/GharkasathiAiAssistant';
import { DomainDeploymentModal } from './components/DomainDeploymentModal';
import { ARCHITECTURE_COMPONENTS, GHARKASATHI_METRICS } from './data/architectureData';
import { Bug, Rocket } from 'lucide-react';

export default function App() {
  const [user, setUser] = useState<User | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [needsAuth, setNeedsAuth] = useState<boolean>(true);
  const [viewMode, setViewMode] = useState<'website' | 'cto'>('website');
  const [isDomainModalOpen, setIsDomainModalOpen] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<'launch' | 'admin' | 'glitches' | 'hostinger' | 'architecture' | 'topology' | 'roadmap' | 'simulator' | 'drive'>('launch');
  const [authError, setAuthError] = useState<string | null>(null);

  // Initialize Firebase Auth listener
  useEffect(() => {
    const unsubscribe = initAuth(
      (currentUser: User, token: string) => {
        setUser(currentUser);
        setAccessToken(token);
        setNeedsAuth(false);
      },
      () => {
        setUser(null);
        setAccessToken(null);
        setNeedsAuth(true);
      }
    );

    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, []);

  const handleLogin = async () => {
    setAuthError(null);
    try {
      const result = await googleSignIn();
      if (result) {
        setUser(result.user);
        setAccessToken(result.accessToken);
        setNeedsAuth(false);
      }
    } catch (err: any) {
      console.error('Login failed:', err);
      setAuthError(err?.message || 'Authentication with Google failed. Please try again.');
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      setUser(null);
      setAccessToken(null);
      setNeedsAuth(true);
    } catch (err) {
      console.error('Logout error:', err);
    }
  };

  if (viewMode === 'website') {
    return (
      <div className="relative">
        <CustomerWebsite 
          onOpenAdmin={() => setViewMode('cto')} 
        />
        
        {/* Floating Quick Action: Switch to CTO Console */}
        <div className="fixed bottom-4 left-4 z-40 hidden sm:flex items-center gap-2">
          <button
            onClick={() => setViewMode('cto')}
            className="flex items-center gap-2 px-3.5 py-2 bg-stone-900/95 hover:bg-black text-white text-[11px] font-bold rounded-full shadow-2xl border border-stone-700/80 backdrop-blur-md transition-all active:scale-95 cursor-pointer"
            title="Open CTO Architecture & Operations Console"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>CTO Console</span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-stone-100 text-stone-900 font-sans antialiased flex flex-col">
      {/* Top Navigation */}
      <ExecutiveTopBar 
        currentMode="cto"
        onSelectMode={(mode) => setViewMode(mode)}
        onOpenDomainModal={() => setIsDomainModalOpen(true)}
      />
      <Header 
        user={user}
        needsAuth={needsAuth}
        onLoginClick={handleLogin}
        onLogoutClick={handleLogout}
        viewMode={viewMode}
        onToggleViewMode={() => setViewMode('website')}
      />

      {/* Auth error notification */}
      {authError && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-4 w-full">
          <div className="p-3 bg-rose-50 border border-rose-200 text-rose-800 text-xs rounded-lg flex items-center justify-between">
            <span>{authError}</span>
            <button onClick={() => setAuthError(null)} className="text-rose-600 font-bold ml-2">Dismiss</button>
          </div>
        </div>
      )}

      {/* Main Executive Summary Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 w-full">
        <div className="bg-stone-900 text-white rounded-2xl p-6 shadow-sm border border-stone-800 relative overflow-hidden">
          <div className="relative z-10">
            <div className="flex flex-wrap items-center justify-between gap-4 mb-3">
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full bg-emerald-950 text-emerald-300 border border-emerald-800">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                  CTO Strategy & Engineering Command
                </span>
                <span className="text-xs text-stone-400 font-mono">
                  v2.4.0 &bull; Enterprise Micro-Modular
                </span>
              </div>

              <div className="text-xs text-stone-400">
                Authorized for: <strong className="text-white">Gharkasathi CEO Office</strong>
              </div>
            </div>

            <h2 className="text-xl sm:text-2xl font-bold tracking-tight mb-2">
              Gharkasathi Backend Architecture Strategy
            </h2>
            <p className="text-xs sm:text-sm text-stone-300 max-w-3xl leading-relaxed">
              As your Chief Technology Officer, here is the complete, production-grade technical strategy for Gharkasathi: high-concurrency event-driven microservices, sub-85ms geospatial dispatch, ACID-guaranteed booking state machines, and real-time synchronization with Google Drive for engineering blueprints.
            </p>
          </div>

          {/* Key System Metrics Strip */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6 pt-6 border-t border-stone-800">
            {GHARKASATHI_METRICS.map((metric, i) => (
              <div key={i} className="bg-stone-800/60 p-3 rounded-lg border border-stone-700/50">
                <div className="text-[11px] text-stone-400 font-medium">{metric.label}</div>
                <div className="text-sm sm:text-base font-bold text-white font-mono mt-0.5">{metric.current}</div>
                <div className="text-[10px] text-emerald-400 font-medium truncate mt-0.5">{metric.target}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Console Navigation Tabs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6 w-full">
        <div className="flex items-center gap-2 border-b border-stone-200 overflow-x-auto pb-px">
          <button
            id="tab-launch"
            onClick={() => setActiveTab('launch')}
            className={`flex items-center gap-2 px-4 py-2.5 text-xs font-bold border-b-2 transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'launch'
                ? 'border-emerald-600 text-emerald-900 bg-white rounded-t-lg'
                : 'border-transparent text-stone-600 hover:text-stone-900'
            }`}
          >
            <Rocket className="w-4 h-4 text-emerald-600" />
            CTO 3-Day Go-Live Plan
            <span className="px-1.5 py-0.2 rounded text-[9px] bg-emerald-100 text-emerald-800 font-extrabold animate-pulse">Go-Live</span>
          </button>

          <button
            id="tab-admin"
            onClick={() => setActiveTab('admin')}
            className={`flex items-center gap-2 px-4 py-2.5 text-xs font-bold border-b-2 transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'admin'
                ? 'border-emerald-700 text-emerald-800 bg-white rounded-t-lg'
                : 'border-transparent text-stone-600 hover:text-stone-900'
            }`}
          >
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            Live Admin & Ops Panel
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          </button>

          <button
            id="tab-glitches"
            onClick={() => setActiveTab('glitches')}
            className={`flex items-center gap-2 px-4 py-2.5 text-xs font-bold border-b-2 transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'glitches'
                ? 'border-amber-600 text-amber-800 bg-white rounded-t-lg'
                : 'border-transparent text-stone-600 hover:text-stone-900'
            }`}
          >
            <Bug className="w-4 h-4 text-amber-600" />
            Flutter Glitch Fixes (Navbar & Cart)
            <span className="px-1.5 py-0.2 rounded text-[9px] bg-amber-100 text-amber-800 font-extrabold">Patches</span>
          </button>

          <button
            id="tab-hostinger"
            onClick={() => setActiveTab('hostinger')}
            className={`flex items-center gap-2 px-4 py-2.5 text-xs font-bold border-b-2 transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'hostinger'
                ? 'border-sky-700 text-sky-800 bg-white rounded-t-lg'
                : 'border-transparent text-stone-600 hover:text-stone-900'
            }`}
          >
            <Server className="w-4 h-4 text-sky-600" />
            Hostinger & APK Guide
          </button>

          <button
            id="tab-architecture"
            onClick={() => setActiveTab('architecture')}
            className={`flex items-center gap-2 px-4 py-2.5 text-xs font-bold border-b-2 transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'architecture'
                ? 'border-stone-900 text-stone-900 bg-white rounded-t-lg'
                : 'border-transparent text-stone-600 hover:text-stone-900'
            }`}
          >
            <FileText className="w-4 h-4 text-stone-600" />
            Microservice Blueprint ({ARCHITECTURE_COMPONENTS.length})
          </button>

          <button
            id="tab-topology"
            onClick={() => setActiveTab('topology')}
            className={`flex items-center gap-2 px-4 py-2.5 text-xs font-bold border-b-2 transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'topology'
                ? 'border-stone-900 text-stone-900 bg-white rounded-t-lg'
                : 'border-transparent text-stone-600 hover:text-stone-900'
            }`}
          >
            <Layers className="w-4 h-4 text-indigo-600" />
            System Topology
          </button>

          <button
            id="tab-roadmap"
            onClick={() => setActiveTab('roadmap')}
            className={`flex items-center gap-2 px-4 py-2.5 text-xs font-bold border-b-2 transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'roadmap'
                ? 'border-stone-900 text-stone-900 bg-white rounded-t-lg'
                : 'border-transparent text-stone-600 hover:text-stone-900'
            }`}
          >
            <TrendingUp className="w-4 h-4 text-amber-600" />
            CTO Execution Roadmap
          </button>

          <button
            id="tab-simulator"
            onClick={() => setActiveTab('simulator')}
            className={`flex items-center gap-2 px-4 py-2.5 text-xs font-bold border-b-2 transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'simulator'
                ? 'border-stone-900 text-stone-900 bg-white rounded-t-lg'
                : 'border-transparent text-stone-600 hover:text-stone-900'
            }`}
          >
            <Zap className="w-4 h-4 text-sky-600" />
            Stress Simulator
          </button>

          <button
            id="tab-drive"
            onClick={() => setActiveTab('drive')}
            className={`flex items-center gap-2 px-4 py-2.5 text-xs font-bold border-b-2 transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'drive'
                ? 'border-stone-900 text-stone-900 bg-white rounded-t-lg'
                : 'border-transparent text-stone-600 hover:text-stone-900'
            }`}
          >
            <HardDrive className="w-4 h-4 text-emerald-600" />
            Google Drive Storage
          </button>
        </div>
      </div>

      {/* Main Workspace Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 w-full flex-1 space-y-6">
        {/* Google Drive Status Bar if user is connected */}
        <div className="mb-2">
          <GoogleDriveSync
            user={user}
            accessToken={accessToken}
            needsAuth={needsAuth}
            onLoginClick={handleLogin}
          />
        </div>

        {/* Tab Specific Content */}
        {activeTab === 'launch' && (
          <Cto3DayLaunchPlan />
        )}

        {activeTab === 'admin' && (
          <LiveAdminPanel />
        )}

        {activeTab === 'glitches' && (
          <FlutterGlitchFixGuide />
        )}

        {activeTab === 'hostinger' && (
          <HostingerDeploymentGuide />
        )}

        {activeTab === 'architecture' && (
          <ArchitectureViewer components={ARCHITECTURE_COMPONENTS} />
        )}

        {activeTab === 'topology' && (
          <ArchitectureDiagram />
        )}

        {activeTab === 'roadmap' && (
          <CtoRoadmap />
        )}

        {activeTab === 'simulator' && (
          <ArchitectureSimulator />
        )}

        {activeTab === 'drive' && (
          <div className="bg-white rounded-xl border border-stone-200 p-6 space-y-4">
            <h3 className="text-base font-bold text-stone-900">
              Google Drive Architecture File Hub
            </h3>
            <p className="text-xs text-stone-600 leading-relaxed">
              Use this section to archive versioned Markdown blueprints, schema documents, and service SLA contracts directly to Google Drive. Once uploaded, files can be reviewed in Google Docs or shared with the engineering squad.
            </p>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-stone-200 py-4 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-wrap items-center justify-between gap-2 text-xs text-stone-500">
          <div className="flex items-center gap-2">
            <Building2 className="w-4 h-4 text-emerald-600" />
            <span>Gharkasathi Engineering Office &bull; CTO Architecture Portal</span>
          </div>
          <div>Integrated with Google Workspace Drive API & Firebase Auth</div>
        </div>
      </footer>

      {/* Sathi AI Assistant in CTO Console */}
      <GharkasathiAiAssistant 
        onOpenBoq={() => setViewMode('website')}
      />

      {/* Official Domain Deployment Modal */}
      <DomainDeploymentModal 
        isOpen={isDomainModalOpen}
        onClose={() => setIsDomainModalOpen(false)}
      />
    </div>
  );
}
