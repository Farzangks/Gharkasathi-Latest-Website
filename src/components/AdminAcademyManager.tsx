import React, { useState, useEffect } from 'react';
import { 
  Award, 
  BookOpen, 
  GraduationCap, 
  CheckCircle2, 
  Clock, 
  AlertCircle, 
  Search, 
  ShieldCheck, 
  UserCheck, 
  RefreshCw, 
  ChevronRight, 
  Sparkles, 
  Sliders, 
  Check, 
  X, 
  ExternalLink, 
  Calendar, 
  Filter, 
  FileText, 
  BadgeCheck, 
  QrCode,
  Layers,
  ArrowRight,
  TrendingUp,
  AlertTriangle
} from 'lucide-react';
import { 
  LiveProvider, 
  TrainingCourse, 
  PartnerCertificationItem, 
  PartnerJourneyStatus, 
  PracticalAssessmentRecord,
  AcademyAnalytics
} from '../types';
import { ACADEMY_COURSES } from '../data/academyCourses';
import { CsgspCertificateModal } from './CsgspCertificateModal';

interface AdminAcademyManagerProps {
  providers: LiveProvider[];
  onRefreshProviders?: () => void;
}

export const AdminAcademyManager: React.FC<AdminAcademyManagerProps> = ({
  providers,
  onRefreshProviders
}) => {
  const [activeTab, setActiveTab] = useState<'pipeline' | 'courses' | 'evaluator' | 'registry'>('pipeline');
  const [lang, setLang] = useState<'en' | 'hi'>('en');
  const [analytics, setAnalytics] = useState<AcademyAnalytics | null>(null);
  const [loadingAnalytics, setLoadingAnalytics] = useState(false);
  const [certificates, setCertificates] = useState<PartnerCertificationItem[]>([]);
  const [loadingCerts, setLoadingCerts] = useState(false);

  // Filter states for Partner Pipeline
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Course explorer state
  const [selectedCourseId, setSelectedCourseId] = useState<string>(ACADEMY_COURSES[0].id);

  // Practical Assessment Form State
  const [evalCandidateId, setEvalCandidateId] = useState<string>(providers[0]?.id || 'PRV-103');
  const [evalCategory, setEvalCategory] = useState<string>('Plumbing');
  const [evaluatorName, setEvaluatorName] = useState<string>('Er. Sandeep Baghel');
  const [evaluatorRole, setEvaluatorRole] = useState<string>('Gharkasathi Skill Evaluator');
  const [evalComments, setEvalComments] = useState<string>('Demonstrated high dexterity with tools, excellent PPE compliance and clean site handover.');
  const [scores, setScores] = useState({
    toolHandling: 5,
    diagnosis: 5,
    installation: 4,
    safety: 5,
    finishing: 4,
    cleanliness: 5
  });
  const [submittingEval, setSubmittingEval] = useState(false);
  const [evalSuccessMessage, setEvalSuccessMessage] = useState<string | null>(null);

  // Certificate Modal State
  const [viewingCertificate, setViewingCertificate] = useState<PartnerCertificationItem | null>(null);

  // Public QR Verify Dialog State
  const [qrVerifyPayload, setQrVerifyPayload] = useState<any | null>(null);
  const [verifyingQr, setVerifyingQr] = useState(false);

  // Status message
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  const fetchAnalytics = async () => {
    setLoadingAnalytics(true);
    try {
      const res = await fetch('/api/admin/academy/analytics');
      if (res.ok) {
        const data = await res.json();
        setAnalytics(data);
      }
    } catch (err) {
      console.error('Failed to load academy analytics:', err);
    } finally {
      setLoadingAnalytics(false);
    }
  };

  const fetchCertificates = async () => {
    setLoadingCerts(true);
    try {
      const res = await fetch('/api/certificates');
      if (res.ok) {
        const data = await res.json();
        setCertificates(data.certificates || []);
      }
    } catch (err) {
      console.error('Failed to load certificates:', err);
    } finally {
      setLoadingCerts(false);
    }
  };

  useEffect(() => {
    fetchAnalytics();
    fetchCertificates();
  }, []);

  const totalPracticalScore = 
    scores.toolHandling + 
    scores.diagnosis + 
    scores.installation + 
    scores.safety + 
    scores.finishing + 
    scores.cleanliness;
  const isPracticalPassed = totalPracticalScore >= 24;

  const handleScoreChange = (rubricKey: keyof typeof scores, value: number) => {
    setScores(prev => ({
      ...prev,
      [rubricKey]: value
    }));
  };

  const handleSubmitPracticalAssessment = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmittingEval(true);
    setEvalSuccessMessage(null);
    try {
      const res = await fetch('/api/academy/practical-assessment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          partnerId: evalCandidateId,
          category: evalCategory,
          scores,
          evaluatorName,
          evaluatorRole,
          comments: evalComments
        })
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setEvalSuccessMessage(data.message);
        if (data.certificate) {
          setViewingCertificate(data.certificate);
        }
        fetchCertificates();
        fetchAnalytics();
        if (onRefreshProviders) onRefreshProviders();
      } else {
        setStatusMessage(`Error: ${data.error || 'Failed to submit evaluation'}`);
      }
    } catch (err: any) {
      setStatusMessage(`Error: ${err?.message || 'Failed to submit evaluation'}`);
    } finally {
      setSubmittingEval(false);
    }
  };

  const handleUpdatePartnerJourneyStatus = async (partnerId: string, newStatus: PartnerJourneyStatus) => {
    try {
      const res = await fetch(`/api/admin/partners/${partnerId}/journey-status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ journeyStatus: newStatus })
      });
      if (res.ok) {
        setStatusMessage(`Partner ${partnerId} journey milestone updated to: ${newStatus.replace('_', ' ').toUpperCase()}`);
        if (onRefreshProviders) onRefreshProviders();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleUpdateCertStatus = async (certId: string, newStatus: 'ACTIVE' | 'SUSPENDED' | 'REVOKED' | 'EXPIRED') => {
    try {
      const res = await fetch(`/api/admin/certifications/${certId}/status`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus })
      });
      if (res.ok) {
        setStatusMessage(`Certificate ${certId} status updated to ${newStatus}`);
        fetchCertificates();
        if (onRefreshProviders) onRefreshProviders();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleVerifyQrOnline = async (certId: string) => {
    setVerifyingQr(true);
    try {
      const res = await fetch(`/api/certificates/verify/${certId}`);
      const data = await res.json();
      setQrVerifyPayload(data);
    } catch (err) {
      console.error(err);
    } finally {
      setVerifyingQr(false);
    }
  };

  // Filtered partners
  const filteredPartners = providers.filter(p => {
    const matchesStatus = statusFilter === 'all' || p.journeyStatus === statusFilter;
    const matchesSearch = 
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.skills.some(s => s.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesStatus && matchesSearch;
  });

  const selectedCourse = ACADEMY_COURSES.find(c => c.id === selectedCourseId) || ACADEMY_COURSES[0];

  return (
    <div className="space-y-6">
      
      {/* Academy Top Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 bg-gradient-to-r from-amber-950/40 via-stone-900 to-stone-900 border border-amber-800/40 rounded-2xl shadow-sm">
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-xl bg-amber-900/60 border border-amber-600/50 flex items-center justify-center text-amber-400 shadow-xs">
            <GraduationCap className="w-6 h-6" />
          </div>
          <div>
            <div className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-amber-400">
              <Sparkles className="w-3 h-3 text-amber-400" />
              Gharkasathi National Skill Registry &bull; ट्रेनिंग व प्रमाणन
            </div>
            <h2 className="text-lg font-bold text-white">
              Skill Training, Assessment &amp; CSGSP Certification Command
            </h2>
            <p className="text-xs text-stone-400 mt-0.5">
              Gharkasathi trains, verifies, and certifies service professionals before granting full <strong>Certified Skilled Gharkasathi Service Partner (CSGSP)</strong> status.
            </p>
          </div>
        </div>

        {/* Global Controls & Bilingual Switch */}
        <div className="flex items-center gap-2.5">
          <div className="inline-flex p-1 rounded-xl bg-stone-950 border border-stone-800">
            <button
              onClick={() => setLang('en')}
              className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                lang === 'en' ? 'bg-amber-600 text-white shadow-xs' : 'text-stone-400 hover:text-white'
              }`}
            >
              English
            </button>
            <button
              onClick={() => setLang('hi')}
              className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                lang === 'hi' ? 'bg-amber-600 text-white shadow-xs' : 'text-stone-400 hover:text-white'
              }`}
            >
              हिन्दी (Hindi)
            </button>
          </div>

          <button
            onClick={() => {
              fetchAnalytics();
              fetchCertificates();
              if (onRefreshProviders) onRefreshProviders();
            }}
            className="p-2 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-300 transition-colors cursor-pointer"
            title="Refresh Academy Data"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {statusMessage && (
        <div className="p-3 bg-emerald-950/80 border border-emerald-700/60 rounded-xl text-xs text-emerald-200 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>{statusMessage}</span>
          </div>
          <button onClick={() => setStatusMessage(null)} className="text-emerald-400 font-bold ml-2">Dismiss</button>
        </div>
      )}

      {/* Analytics KPI Bar */}
      <div className="grid grid-cols-2 lg:grid-cols-6 gap-3">
        <div className="p-3.5 bg-stone-900/80 rounded-xl border border-stone-800">
          <div className="text-[10px] font-bold uppercase tracking-wider text-stone-400">Total Enrolled</div>
          <div className="text-xl font-bold text-white font-mono mt-0.5">
            {analytics?.totalEnrolled ?? 6}
          </div>
          <div className="text-[10px] text-stone-500 mt-0.5">Across all 6 trades</div>
        </div>

        <div className="p-3.5 bg-stone-900/80 rounded-xl border border-stone-800">
          <div className="text-[10px] font-bold uppercase tracking-wider text-amber-400">In Training</div>
          <div className="text-xl font-bold text-amber-400 font-mono mt-0.5">
            {analytics?.trainingStarted ?? 2}
          </div>
          <div className="text-[10px] text-stone-500 mt-0.5">Modules in progress</div>
        </div>

        <div className="p-3.5 bg-stone-900/80 rounded-xl border border-stone-800">
          <div className="text-[10px] font-bold uppercase tracking-wider text-sky-400">Assessment Taken</div>
          <div className="text-xl font-bold text-sky-400 font-mono mt-0.5">
            {analytics?.assessmentAttempts ?? 5}
          </div>
          <div className="text-[10px] text-stone-500 mt-0.5">Quiz submissions</div>
        </div>

        <div className="p-3.5 bg-stone-900/80 rounded-xl border border-stone-800">
          <div className="text-[10px] font-bold uppercase tracking-wider text-emerald-400">Pass Rate</div>
          <div className="text-xl font-bold text-emerald-400 font-mono mt-0.5">
            {analytics?.passRate ?? 95}%
          </div>
          <div className="text-[10px] text-stone-500 mt-0.5">80% passing threshold</div>
        </div>

        <div className="p-3.5 bg-amber-950/40 rounded-xl border border-amber-800/50">
          <div className="text-[10px] font-bold uppercase tracking-wider text-amber-300">CSGSP Certified</div>
          <div className="text-xl font-bold text-amber-200 font-mono mt-0.5 flex items-center gap-1.5">
            <Award className="w-4 h-4 text-amber-400" />
            <span>{analytics?.certifiedPartnersCount ?? 2}</span>
          </div>
          <div className="text-[10px] text-amber-400/80 mt-0.5">Licensed &amp; Verified</div>
        </div>

        <div className="p-3.5 bg-stone-900/80 rounded-xl border border-stone-800">
          <div className="text-[10px] font-bold uppercase tracking-wider text-rose-400">Expiring Soon</div>
          <div className="text-xl font-bold text-rose-400 font-mono mt-0.5">
            {analytics?.expiringSoonCount ?? 0}
          </div>
          <div className="text-[10px] text-stone-500 mt-0.5">Within next 30 days</div>
        </div>
      </div>

      {/* Sub-Navigation Tabs */}
      <div className="flex items-center gap-2 border-b border-stone-800 overflow-x-auto pb-px">
        <button
          onClick={() => setActiveTab('pipeline')}
          className={`flex items-center gap-1.5 px-4 py-2.5 text-xs font-bold border-b-2 transition-all cursor-pointer whitespace-nowrap ${
            activeTab === 'pipeline'
              ? 'border-amber-500 text-amber-400 bg-stone-900/60 rounded-t-lg'
              : 'border-transparent text-stone-400 hover:text-stone-200'
          }`}
        >
          <UserCheck className="w-4 h-4" />
          <span>Partner Certification Lifecycle ({filteredPartners.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('evaluator')}
          className={`flex items-center gap-1.5 px-4 py-2.5 text-xs font-bold border-b-2 transition-all cursor-pointer whitespace-nowrap ${
            activeTab === 'evaluator'
              ? 'border-amber-500 text-amber-400 bg-stone-900/60 rounded-t-lg'
              : 'border-transparent text-stone-400 hover:text-stone-200'
          }`}
        >
          <Award className="w-4 h-4 text-amber-400" />
          <span>Practical Assessment Evaluator</span>
          <span className="px-1.5 py-0.2 rounded text-[9px] bg-amber-950 text-amber-300 font-extrabold border border-amber-700/60">
            6 Rubrics
          </span>
        </button>

        <button
          onClick={() => setActiveTab('courses')}
          className={`flex items-center gap-1.5 px-4 py-2.5 text-xs font-bold border-b-2 transition-all cursor-pointer whitespace-nowrap ${
            activeTab === 'courses'
              ? 'border-amber-500 text-amber-400 bg-stone-900/60 rounded-t-lg'
              : 'border-transparent text-stone-400 hover:text-stone-200'
          }`}
        >
          <BookOpen className="w-4 h-4" />
          <span>Academy Curriculum &amp; Quizzes (6 Trades)</span>
        </button>

        <button
          onClick={() => setActiveTab('registry')}
          className={`flex items-center gap-1.5 px-4 py-2.5 text-xs font-bold border-b-2 transition-all cursor-pointer whitespace-nowrap ${
            activeTab === 'registry'
              ? 'border-amber-500 text-amber-400 bg-stone-900/60 rounded-t-lg'
              : 'border-transparent text-stone-400 hover:text-stone-200'
          }`}
        >
          <BadgeCheck className="w-4 h-4" />
          <span>National Registry &amp; QR Credentials ({certificates.length})</span>
        </button>
      </div>

      {/* =================================================================== */}
      {/* TAB 1: PARTNER CERTIFICATION PIPELINE & LIFECYCLE */}
      {/* =================================================================== */}
      {activeTab === 'pipeline' && (
        <div className="space-y-4">
          
          {/* Journey Steps Diagram */}
          <div className="p-4 bg-stone-900/80 rounded-2xl border border-stone-800">
            <div className="text-xs font-bold text-stone-400 uppercase tracking-wider mb-3">
              Standard Gharkasathi Partner Journey &bull; मानक साथी यात्रा क्रम
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-2 text-center text-xs">
              <div className="p-2.5 rounded-xl bg-stone-950 border border-stone-800">
                <div className="text-[10px] font-mono text-stone-500 font-bold">STAGE 1</div>
                <div className="font-bold text-stone-300 mt-0.5">REGISTERED</div>
                <div className="text-[10px] text-stone-500">Account created</div>
              </div>

              <div className="p-2.5 rounded-xl bg-stone-950 border border-stone-800">
                <div className="text-[10px] font-mono text-stone-500 font-bold">STAGE 2</div>
                <div className="font-bold text-stone-300 mt-0.5">KYC VERIFIED</div>
                <div className="text-[10px] text-stone-500">Aadhar &amp; Police check</div>
              </div>

              <div className="p-2.5 rounded-xl bg-stone-950 border border-stone-800">
                <div className="text-[10px] font-mono text-stone-500 font-bold">STAGE 3</div>
                <div className="font-bold text-stone-300 mt-0.5">SKILL VERIFIED</div>
                <div className="text-[10px] text-stone-500">Trade experience</div>
              </div>

              <div className="p-2.5 rounded-xl bg-stone-950 border border-stone-800">
                <div className="text-[10px] font-mono text-stone-500 font-bold">STAGE 4</div>
                <div className="font-bold text-stone-300 mt-0.5">TRAINING</div>
                <div className="text-[10px] text-stone-500">Core SOP &amp; Modules</div>
              </div>

              <div className="p-2.5 rounded-xl bg-stone-950 border border-stone-800">
                <div className="text-[10px] font-mono text-stone-500 font-bold">STAGE 5</div>
                <div className="font-bold text-stone-300 mt-0.5">ASSESSMENT</div>
                <div className="text-[10px] text-stone-500">Theory &amp; Practical</div>
              </div>

              <div className="p-2.5 rounded-xl bg-stone-950 border border-amber-800/40">
                <div className="text-[10px] font-mono text-amber-500 font-bold">STAGE 6</div>
                <div className="font-bold text-amber-400 mt-0.5">CSGSP BADGE</div>
                <div className="text-[10px] text-stone-400">Certified Partner</div>
              </div>

              <div className="p-2.5 rounded-xl bg-emerald-950/60 border border-emerald-700/60 text-emerald-300">
                <div className="text-[10px] font-mono text-emerald-400 font-bold">STAGE 7</div>
                <div className="font-bold mt-0.5">ACTIVE DISPATCH</div>
                <div className="text-[10px] text-emerald-400/80">Full Job Access</div>
              </div>
            </div>
          </div>

          {/* Search & Milestone Filter Controls */}
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-stone-400 absolute left-3 top-3" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by partner name, trade or phone..."
                className="w-full pl-9 pr-4 py-2 text-xs rounded-xl bg-stone-900 border border-stone-800 text-white placeholder-stone-500 focus:outline-none focus:ring-1 focus:ring-amber-500"
              />
            </div>

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-2 text-xs rounded-xl bg-stone-900 border border-stone-800 text-stone-200 font-medium focus:outline-none focus:ring-1 focus:ring-amber-500"
            >
              <option value="all">All Stages ({providers.length})</option>
              <option value="registered">Registered Only</option>
              <option value="kyc_verified">KYC Verified</option>
              <option value="professionally_verified">Professionally Verified</option>
              <option value="training_assigned">In Training</option>
              <option value="assessment_passed">Assessment Passed</option>
              <option value="certified">Certified Skilled (CSGSP)</option>
              <option value="suspended">Suspended</option>
            </select>
          </div>

          {/* Partner Roster Table */}
          <div className="bg-stone-900 rounded-2xl border border-stone-800 overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-stone-300">
                <thead className="bg-stone-950/80 text-stone-400 uppercase tracking-wider font-semibold border-b border-stone-800 text-[10px]">
                  <tr>
                    <th className="py-3 px-4">Partner Profile</th>
                    <th className="py-3 px-4">Trade &amp; Territory</th>
                    <th className="py-3 px-4">Current Milestone</th>
                    <th className="py-3 px-4">CSGSP Status</th>
                    <th className="py-3 px-4">Performance Tier</th>
                    <th className="py-3 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-800/60">
                  {filteredPartners.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="py-8 text-center text-stone-500">
                        No service partners match the selected filter.
                      </td>
                    </tr>
                  ) : (
                    filteredPartners.map(p => {
                      const isCertified = p.isCsgspCertified;
                      return (
                        <tr key={p.id} className="hover:bg-stone-800/40 transition-colors">
                          
                          {/* Partner Profile */}
                          <td className="py-3.5 px-4">
                            <div className="flex items-center gap-3">
                              <div className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-xs ${
                                isCertified 
                                  ? 'bg-amber-900/60 text-amber-300 border border-amber-600' 
                                  : 'bg-stone-800 text-stone-400'
                              }`}>
                                {p.name.charAt(0)}
                              </div>
                              <div>
                                <div className="font-bold text-white flex items-center gap-1.5">
                                  <span>{p.name}</span>
                                  {isCertified && (
                                    <Award className="w-3.5 h-3.5 text-amber-400" title="Certified CSGSP Partner" />
                                  )}
                                </div>
                                <div className="text-[11px] text-stone-400 font-mono">{p.phone} &bull; {p.id}</div>
                              </div>
                            </div>
                          </td>

                          {/* Trade & Territory */}
                          <td className="py-3.5 px-4">
                            <div className="font-medium text-stone-200">{p.skills[0] || 'General Maintenance'}</div>
                            <div className="text-[10px] text-stone-400">{p.zone} ({p.city || 'Raipur'})</div>
                          </td>

                          {/* Milestone */}
                          <td className="py-3.5 px-4">
                            <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                              p.journeyStatus === 'certified'
                                ? 'bg-amber-950 text-amber-300 border border-amber-800'
                                : p.journeyStatus === 'assessment_passed'
                                  ? 'bg-sky-950 text-sky-300 border border-sky-800'
                                  : p.journeyStatus === 'training_assigned'
                                    ? 'bg-indigo-950 text-indigo-300 border border-indigo-800'
                                    : p.journeyStatus === 'kyc_verified'
                                      ? 'bg-emerald-950 text-emerald-300 border border-emerald-800'
                                      : 'bg-stone-800 text-stone-400 border border-stone-700'
                            }`}>
                              {p.journeyStatus ? p.journeyStatus.replace('_', ' ') : 'REGISTERED'}
                            </span>
                          </td>

                          {/* CSGSP Status */}
                          <td className="py-3.5 px-4">
                            {isCertified ? (
                              <div>
                                <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-400">
                                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                                  CSGSP Certified
                                </span>
                                {p.certifications && p.certifications[0] && (
                                  <div className="text-[9px] font-mono text-stone-500 truncate max-w-[140px]">
                                    {p.certifications[0].certificateId}
                                  </div>
                                )}
                              </div>
                            ) : (
                              <span className="text-[11px] text-stone-500 italic">
                                Regular Partner (Not Certified)
                              </span>
                            )}
                          </td>

                          {/* Performance Tier */}
                          <td className="py-3.5 px-4">
                            <span className="font-mono text-xs font-bold text-stone-300 uppercase">
                              {p.performanceTier || 'standard'}
                            </span>
                            <div className="text-[10px] text-stone-500">Score: {p.gharkasathiScore || 70}/100</div>
                          </td>

                          {/* Actions */}
                          <td className="py-3.5 px-4 text-right">
                            <div className="inline-flex items-center gap-2">
                              {isCertified && p.certifications && p.certifications[0] && (
                                <button
                                  onClick={() => setViewingCertificate(p.certifications![0])}
                                  className="px-2.5 py-1 rounded-lg bg-amber-950 hover:bg-amber-900 border border-amber-800 text-amber-300 text-[11px] font-semibold transition-colors cursor-pointer flex items-center gap-1"
                                >
                                  <Award className="w-3 h-3" />
                                  <span>View Cert</span>
                                </button>
                              )}

                              <select
                                value={p.journeyStatus || 'registered'}
                                onChange={(e) => handleUpdatePartnerJourneyStatus(p.id, e.target.value as PartnerJourneyStatus)}
                                className="px-2 py-1 text-[11px] rounded-lg bg-stone-950 border border-stone-700 text-stone-300 font-medium focus:outline-none"
                              >
                                <option value="registered">Registered</option>
                                <option value="kyc_verified">KYC Verified</option>
                                <option value="professionally_verified">Skill Verified</option>
                                <option value="training_assigned">In Training</option>
                                <option value="assessment_passed">Assessment Passed</option>
                                <option value="certified">Certified (CSGSP)</option>
                                <option value="suspended">Suspended</option>
                              </select>
                            </div>
                          </td>

                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>
          </div>

        </div>
      )}

      {/* =================================================================== */}
      {/* TAB 2: PRACTICAL ASSESSMENT EVALUATOR TOOL */}
      {/* =================================================================== */}
      {activeTab === 'evaluator' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Left: Evaluation Form */}
          <div className="lg:col-span-7 bg-stone-900 rounded-2xl border border-stone-800 p-5 sm:p-6 space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-stone-800">
              <div>
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <Award className="w-5 h-5 text-amber-400" />
                  Hands-On Practical Skill Evaluation &bull; व्यावहारिक मूल्यांकन
                </h3>
                <p className="text-xs text-stone-400 mt-0.5">
                  Conducted by Gharkasathi Technical Evaluators. Score candidate across 6 rubrics (Total 30 Marks, 80% passing threshold).
                </p>
              </div>
            </div>

            {evalSuccessMessage && (
              <div className="p-3.5 bg-emerald-950/90 border border-emerald-700 rounded-xl text-xs text-emerald-200 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>{evalSuccessMessage}</span>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmitPracticalAssessment} className="space-y-4">
              
              {/* Candidate & Trade Select */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold text-stone-400 uppercase mb-1">
                    Select Candidate / Partner:
                  </label>
                  <select
                    value={evalCandidateId}
                    onChange={(e) => setEvalCandidateId(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-xl bg-stone-950 border border-stone-700 text-white font-medium focus:outline-none focus:ring-1 focus:ring-amber-500"
                  >
                    {providers.map(p => (
                      <option key={p.id} value={p.id}>
                        {p.name} ({p.id}) &bull; {p.skills[0]}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-stone-400 uppercase mb-1">
                    Certification Trade Category:
                  </label>
                  <select
                    value={evalCategory}
                    onChange={(e) => setEvalCategory(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-xl bg-stone-950 border border-stone-700 text-white font-medium focus:outline-none focus:ring-1 focus:ring-amber-500"
                  >
                    <option value="Plumbing">Plumbing &amp; Sanitary</option>
                    <option value="Electrical">Electrical &amp; Inverter</option>
                    <option value="Appliance Repair">Appliance &amp; HVAC Repair</option>
                    <option value="Carpentry">Carpentry &amp; Modular Woodwork</option>
                    <option value="Cleaning">Deep Sanitization &amp; Hygiene</option>
                  </select>
                </div>
              </div>

              {/* Rubric Sliders / Ratings */}
              <div className="space-y-3 pt-2">
                <div className="text-xs font-bold text-stone-300 uppercase tracking-wider flex items-center justify-between">
                  <span>Evaluation Rubrics (1 to 5 Points Each)</span>
                  <span className="font-mono text-amber-400">Total: {totalPracticalScore} / 30</span>
                </div>

                {/* 1. Tool Handling */}
                <div className="p-3 bg-stone-950 rounded-xl border border-stone-800 space-y-1">
                  <div className="flex justify-between text-xs font-semibold text-stone-200">
                    <span>1. Tool Handling &amp; Equipment Mastery</span>
                    <span className="font-mono text-amber-400">{scores.toolHandling} / 5</span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="5"
                    value={scores.toolHandling}
                    onChange={(e) => handleScoreChange('toolHandling', Number(e.target.value))}
                    className="w-full accent-amber-500 cursor-pointer"
                  />
                  <div className="text-[10px] text-stone-500">Multimeter, pipe cutters, power drills, proper insulation tools.</div>
                </div>

                {/* 2. Diagnosis */}
                <div className="p-3 bg-stone-950 rounded-xl border border-stone-800 space-y-1">
                  <div className="flex justify-between text-xs font-semibold text-stone-200">
                    <span>2. Diagnostic Accuracy &amp; Fault Finding</span>
                    <span className="font-mono text-amber-400">{scores.diagnosis} / 5</span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="5"
                    value={scores.diagnosis}
                    onChange={(e) => handleScoreChange('diagnosis', Number(e.target.value))}
                    className="w-full accent-amber-500 cursor-pointer"
                  />
                  <div className="text-[10px] text-stone-500">Root-cause identification without guesswork or unnecessary part replacements.</div>
                </div>

                {/* 3. Execution */}
                <div className="p-3 bg-stone-950 rounded-xl border border-stone-800 space-y-1">
                  <div className="flex justify-between text-xs font-semibold text-stone-200">
                    <span>3. Execution Quality &amp; Code Adherence</span>
                    <span className="font-mono text-amber-400">{scores.installation} / 5</span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="5"
                    value={scores.installation}
                    onChange={(e) => handleScoreChange('installation', Number(e.target.value))}
                    className="w-full accent-amber-500 cursor-pointer"
                  />
                  <div className="text-[10px] text-stone-500">Correct solvent welding, torque specs, phase/neutral polarity, leveling.</div>
                </div>

                {/* 4. Safety */}
                <div className="p-3 bg-stone-950 rounded-xl border border-stone-800 space-y-1">
                  <div className="flex justify-between text-xs font-semibold text-stone-200">
                    <span>4. Safety Protocols &amp; PPE Obedience</span>
                    <span className="font-mono text-amber-400">{scores.safety} / 5</span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="5"
                    value={scores.safety}
                    onChange={(e) => handleScoreChange('safety', Number(e.target.value))}
                    className="w-full accent-amber-500 cursor-pointer"
                  />
                  <div className="text-[10px] text-stone-500">Insulated shoes, goggles, Main switch cut-off &amp; Lockout-Tagout procedure.</div>
                </div>

                {/* 5. Finishing */}
                <div className="p-3 bg-stone-950 rounded-xl border border-stone-800 space-y-1">
                  <div className="flex justify-between text-xs font-semibold text-stone-200">
                    <span>5. Aesthetic Finishing &amp; Leak/Pressure Check</span>
                    <span className="font-mono text-amber-400">{scores.finishing} / 5</span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="5"
                    value={scores.finishing}
                    onChange={(e) => handleScoreChange('finishing', Number(e.target.value))}
                    className="w-full accent-amber-500 cursor-pointer"
                  />
                  <div className="text-[10px] text-stone-500">Clean silicone bead, straight conduit lines, 15-minute pressure hold.</div>
                </div>

                {/* 6. Cleanliness */}
                <div className="p-3 bg-stone-950 rounded-xl border border-stone-800 space-y-1">
                  <div className="flex justify-between text-xs font-semibold text-stone-200">
                    <span>6. Cleanliness, Debris Disposal &amp; Handover</span>
                    <span className="font-mono text-amber-400">{scores.cleanliness} / 5</span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="5"
                    value={scores.cleanliness}
                    onChange={(e) => handleScoreChange('cleanliness', Number(e.target.value))}
                    className="w-full accent-amber-500 cursor-pointer"
                  />
                  <div className="text-[10px] text-stone-500">Floor wiped, old parts neatly bagged, customer demo given courteously.</div>
                </div>
              </div>

              {/* Evaluator Metadata */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <div>
                  <label className="block text-[11px] font-bold text-stone-400 uppercase mb-1">
                    Evaluator Name:
                  </label>
                  <input
                    type="text"
                    value={evaluatorName}
                    onChange={(e) => setEvaluatorName(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-xl bg-stone-950 border border-stone-700 text-white font-medium focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-stone-400 uppercase mb-1">
                    Evaluator Designation:
                  </label>
                  <input
                    type="text"
                    value={evaluatorRole}
                    onChange={(e) => setEvaluatorRole(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-xl bg-stone-950 border border-stone-700 text-white font-medium focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-stone-400 uppercase mb-1">
                  Evaluator Technical Notes &amp; Observations:
                </label>
                <textarea
                  rows={2}
                  value={evalComments}
                  onChange={(e) => setEvalComments(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-xl bg-stone-950 border border-stone-700 text-white font-medium focus:outline-none"
                />
              </div>

              {/* Submit Button */}
              <div className="pt-3 border-t border-stone-800 flex items-center justify-between">
                <div className="text-xs">
                  <span className="text-stone-400">Result: </span>
                  <strong className={isPracticalPassed ? 'text-emerald-400' : 'text-rose-400'}>
                    {isPracticalPassed ? 'PASSED (>=24 Marks)' : 'FAILED (<24 Marks)'}
                  </strong>
                </div>

                <button
                  type="submit"
                  disabled={submittingEval}
                  className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
                    isPracticalPassed
                      ? 'bg-amber-600 hover:bg-amber-500 text-white shadow-lg shadow-amber-900/40'
                      : 'bg-stone-800 hover:bg-stone-700 text-stone-300'
                  }`}
                >
                  <Award className="w-4 h-4" />
                  <span>{submittingEval ? 'Submitting...' : isPracticalPassed ? 'Certify as CSGSP Partner' : 'Record Reassessment'}</span>
                </button>
              </div>

            </form>
          </div>

          {/* Right: Evaluator Guidelines & Standards */}
          <div className="lg:col-span-5 space-y-4">
            <div className="p-5 bg-stone-900 rounded-2xl border border-stone-800 space-y-3">
              <h4 className="text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4" />
                Gharkasathi Technical Assessment Philosophy
              </h4>
              <p className="text-xs text-stone-300 leading-relaxed">
                Gharkasathi certification is a <strong>guarantee of trust and competence</strong> to our customers across Raipur, Bhilai, and Chhattisgarh.
              </p>
              <div className="space-y-2 text-xs text-stone-400 pt-1">
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span><strong>Zero Safety Tolerance:</strong> Working on live 230V lines without lockout or handling refrigerants without leak detectors is an immediate fail.</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span><strong>Clean Site Handover:</strong> A technician who leaves debris or soiled walls will not receive the CSGSP badge.</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span><strong>2-Year Validity:</strong> Certifications are valid for 24 months, after which a mandatory refresher course is triggered.</span>
                </div>
              </div>
            </div>

            {/* Candidate Quick Lookup Card */}
            {providers.find(p => p.id === evalCandidateId) && (
              <div className="p-5 bg-stone-950 rounded-2xl border border-stone-800 space-y-2 text-xs">
                <div className="text-[10px] font-bold text-stone-400 uppercase tracking-wider">Candidate Dossier</div>
                {(() => {
                  const c = providers.find(p => p.id === evalCandidateId)!;
                  return (
                    <div className="space-y-1.5 pt-1">
                      <div className="flex justify-between py-1 border-b border-stone-800">
                        <span className="text-stone-400">Name:</span>
                        <span className="font-bold text-white">{c.name}</span>
                      </div>
                      <div className="flex justify-between py-1 border-b border-stone-800">
                        <span className="text-stone-400">Phone:</span>
                        <span className="font-mono text-stone-200">{c.phone}</span>
                      </div>
                      <div className="flex justify-between py-1 border-b border-stone-800">
                        <span className="text-stone-400">Experience:</span>
                        <span className="text-stone-200">{c.experienceYears || 3} Years in Trade</span>
                      </div>
                      <div className="flex justify-between py-1 border-b border-stone-800">
                        <span className="text-stone-400">Current Status:</span>
                        <span className="font-bold text-amber-400 uppercase">{c.journeyStatus}</span>
                      </div>
                      <div className="flex justify-between py-1">
                        <span className="text-stone-400">Aadhar KYC:</span>
                        <span className="font-mono text-emerald-400">{c.aadharNumber || 'VERIFIED_OFFICE'}</span>
                      </div>
                    </div>
                  );
                })()}
              </div>
            )}
          </div>

        </div>
      )}

      {/* =================================================================== */}
      {/* TAB 3: ACADEMY CURRICULUM & QUIZZES */}
      {/* =================================================================== */}
      {activeTab === 'courses' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Left: Course List */}
          <div className="lg:col-span-4 space-y-2.5">
            <div className="text-xs font-bold text-stone-400 uppercase tracking-wider px-1">
              Available Trade Curricula ({ACADEMY_COURSES.length})
            </div>

            {ACADEMY_COURSES.map(course => {
              const isSelected = course.id === selectedCourseId;
              return (
                <div
                  key={course.id}
                  onClick={() => setSelectedCourseId(course.id)}
                  className={`p-3.5 rounded-2xl border transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-amber-950/40 border-amber-600 text-white shadow-sm'
                      : 'bg-stone-900 border-stone-800 hover:border-stone-700 text-stone-300'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono text-amber-400 font-bold">
                      {course.category.toUpperCase()}
                    </span>
                    <span className="text-[10px] text-stone-400">
                      {course.modules.length} Modules &bull; {course.validityMonths > 0 ? `${course.validityMonths}m Validity` : 'Permanent'}
                    </span>
                  </div>

                  <div className="font-bold text-sm mt-1 text-white">
                    {lang === 'hi' ? course.titleHi : course.titleEn}
                  </div>

                  <div className="text-xs text-stone-400 mt-1 line-clamp-2 leading-relaxed">
                    {lang === 'hi' ? course.descriptionHi : course.descriptionEn}
                  </div>

                  <div className="flex items-center gap-3 text-[10px] text-stone-500 mt-2.5 pt-2 border-t border-stone-800/80">
                    <span>{course.modules.length} Modules</span>
                    <span>&bull;</span>
                    <span>{course.quiz.length} Quiz Questions</span>
                    <span>&bull;</span>
                    <span className="text-emerald-400">{course.passingScore}% Pass Mark</span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right: Course Detail & Modules */}
          <div className="lg:col-span-8 bg-stone-900 rounded-2xl border border-stone-800 p-6 space-y-6">
            <div>
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-amber-400 uppercase">
                  COURSE CODE: {selectedCourse.id}
                </span>
                <span className="text-xs text-stone-400">
                  Validity: <strong>{selectedCourse.validityMonths} Months</strong>
                </span>
              </div>
              <h3 className="text-xl font-bold text-white mt-1">
                {lang === 'hi' ? selectedCourse.titleHi : selectedCourse.titleEn}
              </h3>
              <p className="text-xs text-stone-300 mt-1.5 leading-relaxed">
                {lang === 'hi' ? selectedCourse.descriptionHi : selectedCourse.descriptionEn}
              </p>
            </div>

            {/* Modules List */}
            <div className="space-y-4">
              <h4 className="text-xs font-bold text-stone-400 uppercase tracking-wider">
                Course Modules &bull; पाठ्यक्रम मॉड्यूल
              </h4>

              {selectedCourse.modules.map((mod, idx) => (
                <div key={mod.id} className="p-4 bg-stone-950 rounded-xl border border-stone-800 space-y-2.5">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-sm text-stone-100">
                      Module {idx + 1}: {lang === 'hi' ? mod.titleHi : mod.titleEn}
                    </span>
                    <span className="text-[10px] text-amber-400 font-mono">
                      {mod.lessons.length} Lessons
                    </span>
                  </div>

                  <p className="text-xs text-stone-400">
                    {lang === 'hi' ? mod.descriptionHi : mod.descriptionEn}
                  </p>

                  <div className="space-y-1.5 pt-1">
                    {mod.lessons.map(les => (
                      <div key={les.id} className="p-2.5 bg-stone-900/90 rounded-lg border border-stone-800/80 text-xs flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <BookOpen className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                          <span className="font-medium text-stone-200">
                            {lang === 'hi' ? les.titleHi : les.titleEn}
                          </span>
                        </div>
                        <span className="text-[10px] text-stone-500 font-mono">
                          {les.duration}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Sample Assessment Questions */}
            <div className="space-y-3 pt-4 border-t border-stone-800">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-bold text-stone-400 uppercase tracking-wider">
                  Assessment Question Bank ({selectedCourse.quiz.length} Questions)
                </h4>
                <span className="text-[11px] text-amber-400 font-bold">Passing: {selectedCourse.passingScore}%</span>
              </div>

              {selectedCourse.quiz.map((q, idx) => (
                <div key={q.id} className="p-3.5 bg-stone-950 rounded-xl border border-stone-800 space-y-2 text-xs">
                  <div className="font-bold text-stone-200">
                    Q{idx + 1}. {lang === 'hi' ? q.questionHi : q.questionEn}
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 pt-1">
                    {(lang === 'hi' ? q.optionsHi : q.optionsEn).map((opt, optIdx) => (
                      <div
                        key={optIdx}
                        className={`p-2 rounded-lg border text-[11px] ${
                          optIdx === q.correctIndex
                            ? 'bg-emerald-950/80 border-emerald-700 text-emerald-300 font-bold'
                            : 'bg-stone-900 border-stone-800 text-stone-400'
                        }`}
                      >
                        {opt} {optIdx === q.correctIndex && '✓ (Correct)'}
                      </div>
                    ))}
                  </div>
                  <div className="text-[10px] text-stone-500 pt-1 border-t border-stone-800/80">
                    <strong>Explanation:</strong> {lang === 'hi' ? q.explanationHi : q.explanationEn}
                  </div>
                </div>
              ))}
            </div>

          </div>

        </div>
      )}

      {/* =================================================================== */}
      {/* TAB 4: NATIONAL REGISTRY & QR CREDENTIALS */}
      {/* =================================================================== */}
      {activeTab === 'registry' && (
        <div className="space-y-4">
          <div className="p-4 bg-stone-900/80 rounded-2xl border border-stone-800 flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <BadgeCheck className="w-4 h-4 text-amber-400" />
                Gharkasathi National Skill Registry Directory
              </h3>
              <p className="text-xs text-stone-400 mt-0.5">
                Publicly verifiable credentials issued to Certified Skilled Gharkasathi Service Partners.
              </p>
            </div>
            <button
              onClick={fetchCertificates}
              className="px-3 py-1.5 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${loadingCerts ? 'animate-spin' : ''}`} />
              <span>Refresh Registry</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {certificates.map(cert => (
              <div
                key={cert.id}
                className="bg-stone-900 rounded-2xl border border-amber-800/50 p-5 space-y-3.5 relative overflow-hidden shadow-sm hover:border-amber-600 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-amber-950 text-amber-300 border border-amber-800">
                    {cert.category}
                  </span>
                  <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-md ${
                    cert.status === 'ACTIVE' 
                      ? 'bg-emerald-950 text-emerald-400 border border-emerald-800' 
                      : 'bg-rose-950 text-rose-400 border border-rose-800'
                  }`}>
                    {cert.status}
                  </span>
                </div>

                <div>
                  <h4 className="text-base font-bold text-white">
                    {cert.partnerName}
                  </h4>
                  <div className="text-[11px] font-mono text-amber-400 mt-0.5">
                    {cert.certificateId}
                  </div>
                </div>

                <div className="space-y-1 text-xs text-stone-400 pt-1 border-t border-stone-800">
                  <div className="flex justify-between">
                    <span>Issued Date:</span>
                    <span className="text-stone-200 font-mono">{new Date(cert.issueDate).toLocaleDateString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Valid Until:</span>
                    <span className="text-stone-200 font-mono">{new Date(cert.validUntil).toLocaleDateString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Theory Score:</span>
                    <span className="text-emerald-400 font-mono font-bold">{cert.quizScore}%</span>
                  </div>
                </div>

                <div className="flex gap-2 pt-2 border-t border-stone-800">
                  <button
                    onClick={() => setViewingCertificate(cert)}
                    className="flex-1 py-2 rounded-xl bg-amber-600 hover:bg-amber-500 text-white text-xs font-bold transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
                  >
                    <Award className="w-3.5 h-3.5" />
                    <span>View &amp; Print</span>
                  </button>

                  <button
                    onClick={() => handleVerifyQrOnline(cert.certificateId)}
                    className="p-2 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-300 text-xs font-semibold transition-colors cursor-pointer"
                    title="Audit QR Endpoint"
                  >
                    <QrCode className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() => handleUpdateCertStatus(cert.certificateId, cert.status === 'ACTIVE' ? 'SUSPENDED' : 'ACTIVE')}
                    className="p-2 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-300 text-xs font-semibold transition-colors cursor-pointer"
                    title="Toggle Suspension"
                  >
                    <Sliders className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* PRINTABLE / VERIFIABLE CSGSP CERTIFICATE MODAL */}
      {viewingCertificate && (
        <CsgspCertificateModal
          certificate={viewingCertificate}
          onClose={() => setViewingCertificate(null)}
          lang={lang}
        />
      )}

      {/* QR VERIFICATION AUDIT DIALOG */}
      {qrVerifyPayload && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs">
          <div className="bg-stone-900 border border-emerald-500/50 rounded-2xl max-w-md w-full p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-emerald-400">
                <CheckCircle2 className="w-5 h-5" />
                <span className="font-bold text-sm">QR Code Verification Success</span>
              </div>
              <button
                onClick={() => setQrVerifyPayload(null)}
                className="text-stone-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-4 bg-stone-950 rounded-xl border border-stone-800 space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-stone-400">Candidate:</span>
                <strong className="text-white">{qrVerifyPayload.partnerName}</strong>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-400">Trade:</span>
                <span className="text-amber-400 font-bold">{qrVerifyPayload.tradeCategory}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-400">Credential:</span>
                <span className="text-stone-200">{qrVerifyPayload.credentialTitle}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-400">Status:</span>
                <span className="text-emerald-400 font-bold">{qrVerifyPayload.status}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-400">Certificate ID:</span>
                <span className="font-mono text-stone-300">{qrVerifyPayload.certificateId}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-400">Issuing Entity:</span>
                <span className="text-stone-300">{qrVerifyPayload.company}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-400">CIN:</span>
                <span className="font-mono text-stone-300">{qrVerifyPayload.cin}</span>
              </div>
            </div>

            <p className="text-[11px] text-stone-400 leading-relaxed">
              This response is identical to what a customer sees when scanning the technician's QR card on site in Raipur or Bhilai. Notice that no sensitive personal phone number or Aadhar ID is leaked.
            </p>

            <button
              onClick={() => setQrVerifyPayload(null)}
              className="w-full py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-colors cursor-pointer"
            >
              Done
            </button>
          </div>
        </div>
      )}

    </div>
  );
};
