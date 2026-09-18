import React, { useState, useEffect } from 'react';
import { 
  Smartphone, 
  Power, 
  MapPin, 
  Navigation, 
  Phone, 
  CheckCircle2, 
  Clock, 
  IndianRupee, 
  ShieldCheck, 
  AlertCircle, 
  Sparkles, 
  RefreshCw, 
  KeyRound, 
  Check, 
  Volume2, 
  ArrowRight,
  User,
  Star,
  Compass,
  CreditCard,
  ChevronRight,
  Bell,
  Award,
  GraduationCap,
  BadgeCheck,
  QrCode,
  BookOpen
} from 'lucide-react';
import { LiveProvider, LiveBooking, PartnerCertificationItem } from '../types';
import { GharkasathiEmblem } from './GharkasathiLogo';
import { PartnerAcademyView } from './PartnerAcademyView';
import { CsgspCertificateModal } from './CsgspCertificateModal';

interface PartnerAppCompanionProps {
  onClose?: () => void;
  defaultPartnerId?: string;
}

export const PartnerAppCompanion: React.FC<PartnerAppCompanionProps> = ({
  onClose,
  defaultPartnerId = 'PRV-101'
}) => {
  const [partner, setPartner] = useState<LiveProvider | null>(null);
  const [allPartners, setAllPartners] = useState<LiveProvider[]>([]);
  const [selectedPartnerId, setSelectedPartnerId] = useState<string>(defaultPartnerId);
  const [activeJob, setActiveJob] = useState<LiveBooking | null>(null);
  const [availableJobs, setAvailableJobs] = useState<LiveBooking[]>([]);
  const [loading, setLoading] = useState(false);
  const [isOnline, setIsOnline] = useState<boolean>(true);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  // Phone simulator navigation & Console tabs
  const [phoneTab, setPhoneTab] = useState<'duty' | 'academy' | 'earnings' | 'profile'>('duty');
  const [consoleTab, setConsoleTab] = useState<'dispatch' | 'academy'>('dispatch');
  const [viewingCertificate, setViewingCertificate] = useState<PartnerCertificationItem | null>(null);

  // Job alert simulation modal
  const [incomingJobAlert, setIncomingJobAlert] = useState<LiveBooking | null>(null);
  const [alertCountdown, setAlertCountdown] = useState<number>(30);

  // OTP inputs for starting and completing job
  const [startOtp, setStartOtp] = useState<string>('');
  const [endOtp, setEndOtp] = useState<string>('');
  const [actionLoading, setActionLoading] = useState<boolean>(false);
  const [payoutSuccess, setPayoutSuccess] = useState<string | null>(null);

  const fetchPartnerDashboard = async () => {
    setLoading(true);
    try {
      // 1. Fetch partner list
      const provRes = await fetch('/api/providers');
      const provData = await provRes.json();
      if (provData.providers) {
        setAllPartners(provData.providers);
        const current = provData.providers.find((p: LiveProvider) => p.id === selectedPartnerId) || provData.providers[0];
        if (current) {
          setPartner(current);
          setIsOnline(current.status !== 'offline');
        }
      }

      // 2. Fetch partner dashboard data
      const dashRes = await fetch(`/api/partner/dashboard/${selectedPartnerId}`);
      const dashData = await dashRes.json();
      if (dashData.activeJob) {
        setActiveJob(dashData.activeJob);
      } else {
        setActiveJob(null);
      }
      if (dashData.availableJobs) {
        setAvailableJobs(dashData.availableJobs);
      }
    } catch (err) {
      console.error('Error fetching partner companion data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPartnerDashboard();
  }, [selectedPartnerId]);

  // Countdown timer for job alert
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (incomingJobAlert && alertCountdown > 0) {
      timer = setTimeout(() => {
        setAlertCountdown(prev => prev - 1);
      }, 1000);
    } else if (incomingJobAlert && alertCountdown === 0) {
      setIncomingJobAlert(null); // Alert expired
    }
    return () => clearTimeout(timer);
  }, [incomingJobAlert, alertCountdown]);

  const handleToggleOnline = async () => {
    if (!partner) return;
    const newStatus = isOnline ? 'offline' : 'online';
    try {
      const res = await fetch(`/api/providers/${partner.id}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus })
      });
      const data = await res.json();
      if (res.ok) {
        setIsOnline(newStatus === 'online');
        setPartner(prev => prev ? { ...prev, status: newStatus } : null);
        setStatusMessage(newStatus === 'online' ? 'You are ONLINE. Ready to receive job alerts in Raipur.' : 'You are OFFLINE. No job requests will be dispatched.');
        setTimeout(() => setStatusMessage(null), 3000);
      }
    } catch (err) {
      console.error('Status toggle failed:', err);
    }
  };

  const handleAcceptJob = async (jobId: string) => {
    if (!partner) return;
    setActionLoading(true);
    try {
      const res = await fetch(`/api/partner/jobs/${jobId}/accept`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ partnerId: partner.id })
      });
      const data = await res.json();
      if (res.ok) {
        setActiveJob(data.booking);
        setIncomingJobAlert(null);
        setStatusMessage('Job Accepted! Please navigate to customer address and ask for Start OTP.');
        fetchPartnerDashboard();
      }
    } catch (err) {
      console.error('Job accept failed:', err);
    } finally {
      setActionLoading(false);
    }
  };

  const handleStartJob = async () => {
    if (!activeJob) return;
    setActionLoading(true);
    try {
      const res = await fetch(`/api/partner/jobs/${activeJob.id}/start`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ otp: startOtp || '1234' })
      });
      const data = await res.json();
      if (res.ok) {
        setActiveJob(data.booking);
        setStatusMessage('Job in progress! Ensure 100% quality and customer satisfaction.');
      }
    } catch (err) {
      console.error('Start job error:', err);
    } finally {
      setActionLoading(false);
    }
  };

  const handleCompleteJob = async () => {
    if (!activeJob) return;
    setActionLoading(true);
    try {
      const res = await fetch(`/api/partner/jobs/${activeJob.id}/complete`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ paymentMethod: 'online' })
      });
      const data = await res.json();
      if (res.ok) {
        setStatusMessage(`Job completed successfully! ₹${Math.round(activeJob.amount * 0.85)} credited to your wallet balance.`);
        setActiveJob(null);
        fetchPartnerDashboard();
      }
    } catch (err) {
      console.error('Complete job error:', err);
    } finally {
      setActionLoading(false);
    }
  };

  const handleInstantPayout = () => {
    if (!partner || partner.walletBalance <= 0) return;
    const payoutAmt = partner.walletBalance;
    setPayoutSuccess(`₹${payoutAmt} successfully initiated for instant transfer to ${partner.upiId || 'registered UPI ID'} via IMPS/UPI.`);
    setPartner(prev => prev ? { ...prev, walletBalance: 0 } : null);
    setTimeout(() => setPayoutSuccess(null), 5000);
  };

  const simulateIncomingJob = () => {
    const mockJob: LiveBooking = {
      id: `BK-${Math.floor(10500 + Math.random() * 500)}`,
      customerName: 'Sanjay Agrawal',
      customerPhone: '+91 94252 88190',
      serviceType: partner?.skills[0] || 'AC Chemical Jet Servicing',
      address: 'Near Magneto Mall, Labhandi, Raipur',
      scheduledTime: 'Immediate (Urgent 30-min Dispatch)',
      amount: 699,
      status: 'pending_match',
      isPaid: true,
      createdAt: new Date().toISOString()
    };
    setIncomingJobAlert(mockJob);
    setAlertCountdown(30);
  };

  return (
    <div className="bg-stone-900 text-white rounded-2xl border border-stone-800 p-4 sm:p-6 shadow-xl relative overflow-hidden">
      {/* Top Header & Partner Switcher */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-stone-800">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-red-600 border border-red-500 flex items-center justify-center p-1.5 shadow-md">
            <GharkasathiEmblem className="w-7 h-7 text-white" src="/emblem.svg" />
          </div>
          <div>
            <div className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-emerald-400">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
              Gharkasathi Partner App &bull; साथी ऐप
            </div>
            <h2 className="text-lg font-bold text-white">
              Field Technician &amp; Partner Companion
            </h2>
          </div>
        </div>

        {/* Switch Active Partner View */}
        <div className="flex items-center gap-3">
          <div className="text-right hidden sm:block">
            <span className="text-[11px] text-stone-400 block">Switch Active Sathi:</span>
          </div>
          <select
            value={selectedPartnerId}
            onChange={(e) => setSelectedPartnerId(e.target.value)}
            className="px-3 py-1.5 text-xs rounded-lg bg-stone-800 border border-stone-700 text-white font-medium focus:outline-none focus:ring-1 focus:ring-emerald-500"
          >
            {allPartners.map(p => (
              <option key={p.id} value={p.id}>
                {p.name} &bull; {p.skills[0]} ({p.city || 'Raipur'})
              </option>
            ))}
          </select>

          <button
            onClick={fetchPartnerDashboard}
            className="p-1.5 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-300 transition-colors"
            title="Refresh Partner App State"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
          </button>
        </div>
      </div>

      {statusMessage && (
        <div className="mt-4 p-3 bg-emerald-950/80 border border-emerald-700/60 rounded-xl text-xs text-emerald-200 flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{statusMessage}</span>
        </div>
      )}

      {payoutSuccess && (
        <div className="mt-4 p-3 bg-sky-950/80 border border-sky-700/60 rounded-xl text-xs text-sky-200 flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-sky-400 shrink-0" />
          <span>{payoutSuccess}</span>
        </div>
      )}

      {/* Main Companion Layout: Mobile Device Mockup & Operations */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mt-6">
        
        {/* LEFT / CENTER: Mobile App Simulator Shell (380px phone UI) */}
        <div className="lg:col-span-6 flex justify-center">
          <div className="w-full max-w-[390px] bg-stone-950 rounded-3xl border-4 border-stone-700 shadow-2xl p-4 overflow-hidden flex flex-col min-h-[640px] text-stone-100">
            
            {/* Phone Status Bar */}
            <div className="flex items-center justify-between text-[11px] text-stone-400 pb-2 border-b border-stone-800 px-1">
              <span className="font-mono">9:41 AM</span>
              <div className="flex items-center gap-1.5">
                <span className="text-[10px] text-emerald-400 font-bold">5G Jio Raipur</span>
                <span className="text-[10px]">100%</span>
              </div>
            </div>

            {/* Partner Header Strip inside App */}
            {partner && (
              <div className="py-3 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-10 h-10 rounded-full bg-emerald-900 border border-emerald-600 text-emerald-300 font-bold flex items-center justify-center text-sm shadow-xs">
                    {partner.name.charAt(0)}
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="text-xs font-bold text-white">{partner.name}</span>
                      {partner.verificationStatus === 'verified' && (
                        <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" title="Verified Sathi" />
                      )}
                    </div>
                    <div className="flex items-center gap-2 text-[10px] text-stone-400">
                      <span className="flex items-center gap-0.5 text-amber-400">
                        <Star className="w-3 h-3 fill-amber-400" />
                        {partner.rating}
                      </span>
                      <span>&bull;</span>
                      <span>{partner.completedJobs} Jobs</span>
                    </div>
                  </div>
                </div>

                {/* Duty Toggle Switch */}
                <button
                  onClick={handleToggleOnline}
                  className={`px-3 py-1.5 rounded-full text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                    isOnline 
                      ? 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-xs'
                      : 'bg-stone-800 hover:bg-stone-700 text-stone-400 border border-stone-700'
                  }`}
                >
                  <Power className="w-3 h-3" />
                  <span>{isOnline ? 'ONLINE' : 'OFFLINE'}</span>
                </button>
              </div>
            )}

            {/* Location & GPS Badge */}
            {partner && (
              <div className="bg-stone-900/90 rounded-xl p-2.5 border border-stone-800 flex items-center justify-between text-[11px] mb-3">
                <div className="flex items-center gap-1.5 text-stone-300 truncate">
                  <MapPin className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span className="truncate">{partner.zone} ({partner.city || 'Raipur'})</span>
                </div>
                <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded-md border border-emerald-800/40">
                  GPS Active
                </span>
              </div>
            )}

            {/* Wallet & Today's Earnings Card */}
            {partner && (
              <div className="bg-gradient-to-br from-emerald-950 to-stone-900 border border-emerald-800/60 rounded-2xl p-3.5 mb-4 shadow-sm">
                <div className="flex items-center justify-between text-xs text-stone-400 mb-1">
                  <span>Available Wallet Balance</span>
                  <span className="text-[10px] text-emerald-400 font-semibold">Daily Auto-Settlement</span>
                </div>
                <div className="flex items-baseline justify-between">
                  <div className="text-2xl font-bold text-white font-mono flex items-center">
                    <IndianRupee className="w-5 h-5 text-emerald-400 mr-0.5" />
                    <span>{partner.walletBalance.toLocaleString('en-IN')}</span>
                  </div>

                  <button
                    onClick={handleInstantPayout}
                    disabled={partner.walletBalance <= 0}
                    className="px-2.5 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-500 disabled:opacity-40 text-white text-[10px] font-bold transition-colors cursor-pointer flex items-center gap-1"
                  >
                    <CreditCard className="w-3 h-3" />
                    <span>Payout to UPI</span>
                  </button>
                </div>
                <div className="mt-2 pt-2 border-t border-emerald-900/60 flex items-center justify-between text-[10px] text-stone-400">
                  <span>UPI ID: <strong className="text-stone-300 font-mono">{partner.upiId || `${partner.phone}@upi`}</strong></span>
                  <span className="text-emerald-400 font-medium">85% Share</span>
                </div>
              </div>
            )}

            {/* PHONE MAIN BODY: SWITCHED BY TAB */}
            {phoneTab === 'duty' && (
              activeJob ? (
                <div className="flex-1 bg-stone-900 rounded-2xl p-4 border border-emerald-700/50 space-y-3 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-emerald-400 bg-emerald-950 px-2 py-0.5 rounded-md border border-emerald-800">
                        <Clock className="w-3 h-3" />
                        {activeJob.status === 'in_progress' ? 'Job In Progress' : 'Dispatched / On The Way'}
                      </span>
                      <span className="text-xs font-mono font-bold text-stone-300">{activeJob.id}</span>
                    </div>

                    <h3 className="text-sm font-bold text-white">
                      {activeJob.serviceType}
                    </h3>

                    <div className="mt-3 space-y-2 text-xs text-stone-300">
                      <div className="flex items-start gap-2 bg-stone-950/60 p-2.5 rounded-xl border border-stone-800">
                        <MapPin className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                        <div>
                          <div className="font-semibold text-white">Customer Location</div>
                          <div className="text-[11px] text-stone-400 leading-tight">{activeJob.address}</div>
                        </div>
                      </div>

                      <div className="flex items-center justify-between bg-stone-950/60 p-2.5 rounded-xl border border-stone-800">
                        <div className="flex items-center gap-2">
                          <User className="w-4 h-4 text-emerald-400" />
                          <span className="text-white font-medium">{activeJob.customerName}</span>
                        </div>
                        <a
                          href={`tel:${activeJob.customerPhone}`}
                          className="px-2.5 py-1 rounded-lg bg-emerald-700 text-white font-semibold text-[11px] flex items-center gap-1 hover:bg-emerald-600 transition-colors"
                        >
                          <Phone className="w-3 h-3" />
                          <span>Call</span>
                        </a>
                      </div>
                    </div>
                  </div>

                  {/* Job Action Controls (Start OTP / Complete OTP) */}
                  <div className="pt-2 border-t border-stone-800 space-y-2">
                    {activeJob.status === 'partner_assigned' ? (
                      <div>
                        <label className="block text-[11px] text-stone-400 mb-1">
                          Enter Customer Start OTP (ग्राहक OTP पूछें):
                        </label>
                        <div className="flex gap-2">
                          <input
                            type="text"
                            value={startOtp}
                            onChange={(e) => setStartOtp(e.target.value)}
                            placeholder="e.g. 1234"
                            maxLength={6}
                            className="flex-1 px-3 py-1.5 text-xs rounded-lg bg-stone-950 border border-stone-700 text-center font-mono font-bold tracking-widest text-white focus:outline-none focus:ring-1 focus:ring-emerald-500"
                          />
                          <button
                            onClick={handleStartJob}
                            disabled={actionLoading}
                            className="px-4 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-colors cursor-pointer"
                          >
                            Start Job
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div>
                        <div className="flex items-center justify-between text-xs mb-2">
                          <span className="text-stone-400">Total Bill Amount:</span>
                          <span className="font-bold text-emerald-400 font-mono">₹{activeJob.amount}</span>
                        </div>
                        <button
                          onClick={handleCompleteJob}
                          disabled={actionLoading}
                          className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center justify-center gap-2 shadow-sm transition-colors cursor-pointer"
                        >
                          <CheckCircle2 className="w-4 h-4" />
                          <span>Complete Service &amp; Collect Payment</span>
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                /* IDLE / WAITING FOR JOB SCREEN */
                <div className="flex-1 flex flex-col items-center justify-center p-6 text-center space-y-3 bg-stone-900/50 rounded-2xl border border-stone-800/80">
                  <div className={`w-14 h-14 rounded-full flex items-center justify-center ${isOnline ? 'bg-emerald-950 text-emerald-400 animate-pulse' : 'bg-stone-800 text-stone-500'}`}>
                    <Navigation className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white">
                      {isOnline ? 'Radar Active &bull; Searching Jobs' : 'You are currently Offline'}
                    </h4>
                    <p className="text-xs text-stone-400 max-w-[240px] mt-1 leading-relaxed">
                      {isOnline 
                        ? 'Listening for high-priority dispatch requests across Raipur & Bhilai hubs.' 
                        : 'Toggle the switch to ONLINE to start receiving job calls and earning.'}
                    </p>
                  </div>

                  {isOnline && (
                    <button
                      onClick={simulateIncomingJob}
                      className="mt-3 px-3.5 py-1.5 rounded-lg bg-stone-800 hover:bg-stone-700 text-emerald-300 text-xs font-semibold border border-emerald-800/50 flex items-center gap-1.5 transition-colors cursor-pointer shadow-xs"
                    >
                      <Volume2 className="w-3.5 h-3.5" />
                      <span>Test Incoming Job Alert</span>
                    </button>
                  )}
                </div>
              )
            )}

            {/* TAB: ACADEMY IN PHONE */}
            {phoneTab === 'academy' && partner && (
              <div className="flex-1 bg-stone-900 rounded-2xl p-4 border border-amber-800/50 space-y-3 flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1">
                      <Award className="w-3.5 h-3.5" />
                      Gharkasathi Academy
                    </span>
                    <span className={`text-[9px] font-mono px-2 py-0.5 rounded ${
                      partner.isCsgspCertified 
                        ? 'bg-amber-950 text-amber-300 border border-amber-700' 
                        : 'bg-stone-800 text-stone-400'
                    }`}>
                      {partner.isCsgspCertified ? 'CSGSP CERTIFIED' : partner.journeyStatus.toUpperCase()}
                    </span>
                  </div>

                  <div className="p-3 bg-stone-950 rounded-xl border border-stone-800 space-y-1.5">
                    <div className="text-xs font-bold text-white">
                      {partner.isCsgspCertified ? 'Certified Skilled Partner (CSGSP)' : 'Skill Verification & Training'}
                    </div>
                    <p className="text-[11px] text-stone-400 leading-relaxed">
                      {partner.isCsgspCertified
                        ? `Official credential issued for ${partner.certifiedCategories.join(', ') || partner.skills[0]}. Priority dispatch active.`
                        : 'Complete standard SOP modules and pass the trade assessment to become a Certified Skilled Gharkasathi Service Partner.'}
                    </p>
                  </div>

                  <div className="p-3 bg-stone-950 rounded-xl border border-stone-800 text-xs space-y-1">
                    <div className="flex justify-between text-stone-400">
                      <span>Assigned Trade:</span>
                      <span className="font-semibold text-white">{partner.skills[0]}</span>
                    </div>
                    <div className="flex justify-between text-stone-400">
                      <span>Passing Mark:</span>
                      <span className="text-emerald-400 font-mono font-bold">80% Threshold</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-2 pt-2 border-t border-stone-800">
                  <button
                    onClick={() => setConsoleTab('academy')}
                    className="w-full py-2.5 rounded-xl bg-amber-600 hover:bg-amber-500 text-white text-xs font-bold flex items-center justify-center gap-2 cursor-pointer shadow-sm"
                  >
                    <BookOpen className="w-4 h-4" />
                    <span>Open Full Training &amp; Exam Console &rarr;</span>
                  </button>
                  {partner.isCsgspCertified && partner.certifications && partner.certifications[0] && (
                    <button
                      onClick={() => setViewingCertificate(partner.certifications![0])}
                      className="w-full py-2 rounded-xl bg-stone-800 hover:bg-stone-700 text-amber-300 text-xs font-semibold flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <Award className="w-3.5 h-3.5" />
                      <span>View CSGSP Certificate</span>
                    </button>
                  )}
                </div>
              </div>
            )}

            {/* TAB: EARNINGS IN PHONE */}
            {phoneTab === 'earnings' && partner && (
              <div className="flex-1 bg-stone-900 rounded-2xl p-4 border border-stone-800 space-y-3">
                <h4 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
                  <IndianRupee className="w-4 h-4 text-emerald-400" />
                  Partner Earnings &amp; Ledger
                </h4>

                <div className="p-3.5 bg-stone-950 rounded-xl border border-stone-800 space-y-2">
                  <div className="flex justify-between text-xs text-stone-400">
                    <span>Wallet Balance:</span>
                    <span className="font-bold text-white font-mono">₹{partner.walletBalance.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex justify-between text-xs text-stone-400">
                    <span>Partner Share:</span>
                    <span className="text-emerald-400 font-bold font-mono">85% Guaranteed</span>
                  </div>
                  <div className="flex justify-between text-xs text-stone-400">
                    <span>Platform Tech Fee:</span>
                    <span className="text-stone-300 font-mono">15%</span>
                  </div>
                  <div className="flex justify-between text-xs text-stone-400 border-t border-stone-800/80 pt-1.5">
                    <span>Completed Jobs:</span>
                    <span className="text-amber-400 font-bold font-mono">{partner.completedJobs} Jobs Done</span>
                  </div>
                </div>

                <div className="p-3 bg-stone-950 rounded-xl border border-stone-800 text-[11px] text-stone-400 space-y-1">
                  <div className="font-bold text-stone-200">Daily UPI Settlement</div>
                  <p>Daily earnings are settled directly to {partner.upiId || `${partner.phone}@upi`} at 11:30 PM every night.</p>
                </div>
              </div>
            )}

            {/* TAB: PROFILE IN PHONE */}
            {phoneTab === 'profile' && partner && (
              <div className="flex-1 bg-stone-900 rounded-2xl p-4 border border-stone-800 space-y-3">
                <div className="text-center py-2">
                  <div className="w-14 h-14 rounded-full bg-stone-800 border-2 border-amber-500/50 mx-auto flex items-center justify-center text-lg font-bold text-white">
                    {partner.name.charAt(0)}
                  </div>
                  <h4 className="font-bold text-white text-sm mt-2 flex items-center justify-center gap-1">
                    <span>{partner.name}</span>
                    {partner.isCsgspCertified && <Award className="w-3.5 h-3.5 text-amber-400" />}
                  </h4>
                  <div className="text-[11px] text-stone-400">{partner.id} &bull; {partner.zone}</div>
                </div>

                <div className="p-3 bg-stone-950 rounded-xl border border-stone-800 space-y-2 text-xs">
                  <div className="flex justify-between">
                    <span className="text-stone-400">CSGSP Status:</span>
                    <strong className={partner.isCsgspCertified ? 'text-amber-400' : 'text-stone-400'}>
                      {partner.isCsgspCertified ? 'CERTIFIED SKILLED' : partner.journeyStatus.toUpperCase()}
                    </strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-stone-400">Trade:</span>
                    <span className="text-stone-200">{partner.skills.join(', ')}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-stone-400">Aadhar KYC:</span>
                    <span className="font-mono text-emerald-400">VERIFIED</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-stone-400">Performance Tier:</span>
                    <span className="font-bold text-stone-200 uppercase">{partner.performanceTier || 'standard'}</span>
                  </div>
                </div>

                {partner.isCsgspCertified && partner.certifications && partner.certifications[0] && (
                  <button
                    onClick={() => setViewingCertificate(partner.certifications![0])}
                    className="w-full py-2.5 rounded-xl bg-amber-600 hover:bg-amber-500 text-white text-xs font-bold flex items-center justify-center gap-1.5 cursor-pointer shadow-sm"
                  >
                    <Award className="w-4 h-4" />
                    <span>View Official Certificate &amp; QR</span>
                  </button>
                )}
              </div>
            )}

            {/* Bottom Nav Bar of Phone */}
            <div className="pt-2.5 mt-3 border-t border-stone-800 grid grid-cols-4 text-center text-[10px] text-stone-400">
              <button
                type="button"
                onClick={() => setPhoneTab('duty')}
                className={`flex flex-col items-center gap-0.5 cursor-pointer transition-colors ${
                  phoneTab === 'duty' ? 'text-emerald-400 font-bold' : 'hover:text-stone-200'
                }`}
              >
                <Navigation className="w-4 h-4" />
                <span>Duty</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  setPhoneTab('academy');
                  setConsoleTab('academy');
                }}
                className={`flex flex-col items-center gap-0.5 cursor-pointer transition-colors relative ${
                  phoneTab === 'academy' ? 'text-amber-400 font-bold' : 'hover:text-stone-200'
                }`}
              >
                <Award className="w-4 h-4" />
                <span>Academy</span>
                {partner?.isCsgspCertified && (
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400 absolute -top-0.5 right-3" />
                )}
              </button>
              <button
                type="button"
                onClick={() => setPhoneTab('earnings')}
                className={`flex flex-col items-center gap-0.5 cursor-pointer transition-colors ${
                  phoneTab === 'earnings' ? 'text-emerald-400 font-bold' : 'hover:text-stone-200'
                }`}
              >
                <IndianRupee className="w-4 h-4" />
                <span>Earnings</span>
              </button>
              <button
                type="button"
                onClick={() => setPhoneTab('profile')}
                className={`flex flex-col items-center gap-0.5 cursor-pointer transition-colors ${
                  phoneTab === 'profile' ? 'text-sky-400 font-bold' : 'hover:text-stone-200'
                }`}
              >
                <User className="w-4 h-4" />
                <span>Profile</span>
              </button>
            </div>

          </div>
        </div>

        {/* RIGHT: Architecture Specs & Sathi Operations Console */}
        <div className="lg:col-span-6 space-y-4">
          
          {/* Console Tab Bar */}
          <div className="flex items-center gap-2 border-b border-stone-700/60 pb-2">
            <button
              onClick={() => setConsoleTab('dispatch')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                consoleTab === 'dispatch'
                  ? 'bg-stone-800 text-emerald-400 border border-emerald-800/60 shadow-xs'
                  : 'text-stone-400 hover:text-white'
              }`}
            >
              Partner Dispatch Engine
            </button>
            <button
              onClick={() => setConsoleTab('academy')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                consoleTab === 'academy'
                  ? 'bg-stone-800 text-amber-400 border border-amber-800/60 shadow-xs'
                  : 'text-stone-400 hover:text-white'
              }`}
            >
              <Award className="w-3.5 h-3.5 text-amber-400" />
              <span>Academy &amp; Skill Assessment ({partner?.isCsgspCertified ? 'Certified' : 'Training'})</span>
            </button>
          </div>

          {consoleTab === 'academy' && partner ? (
            <div className="bg-stone-800/60 rounded-xl p-5 border border-stone-700/60">
              <PartnerAcademyView partner={partner} onPartnerUpdated={fetchPartnerDashboard} />
            </div>
          ) : (
            <>
              <div className="bg-stone-800/60 rounded-xl p-5 border border-stone-700/60 space-y-3">
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-emerald-400" />
                  Gharkasathi Partner Dispatch Engine Specification
                </h3>
                <p className="text-xs text-stone-300 leading-relaxed">
                  The Partner App operates on a <strong>sub-85ms geospatial dispatch loop</strong>. When a customer in Shankar Nagar or VIP Road places a booking, the backend calculates the geodesic distance to all verified partners with matching trade skills within a 6km radius.
                </p>

                <div className="grid grid-cols-2 gap-3 pt-2">
                  <div className="bg-stone-900 p-3 rounded-lg border border-stone-800">
                    <div className="text-[11px] text-stone-400">Partner Commission Model</div>
                    <div className="text-sm font-bold text-white font-mono mt-0.5">85% to Partner</div>
                    <div className="text-[10px] text-emerald-400 mt-0.5">15% platform fee</div>
                  </div>

                  <div className="bg-stone-900 p-3 rounded-lg border border-stone-800">
                    <div className="text-[11px] text-stone-400">Dispatch Ring Timeout</div>
                    <div className="text-sm font-bold text-white font-mono mt-0.5">30 Seconds</div>
                    <div className="text-[10px] text-amber-400 mt-0.5">Auto-fallback to next Sathi</div>
                  </div>
                </div>
              </div>

              {/* Quick Partner Dispatch Controls */}
              <div className="bg-stone-800/60 rounded-xl p-5 border border-stone-700/60 space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-stone-400">
                  Live Partner Details &amp; KYC File
                </h4>

                {partner ? (
                  <div className="space-y-2 text-xs">
                    <div className="flex justify-between py-1 border-b border-stone-700/60">
                      <span className="text-stone-400">Registered Name:</span>
                      <span className="font-semibold text-white">{partner.name}</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-stone-700/60">
                      <span className="text-stone-400">Phone &amp; WhatsApp:</span>
                      <span className="font-mono text-white">{partner.phone}</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-stone-700/60">
                      <span className="text-stone-400">Assigned Territory:</span>
                      <span className="text-emerald-300 font-semibold">{partner.zone}</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-stone-700/60">
                      <span className="text-stone-400">Registered Skills:</span>
                      <span className="text-stone-200">{partner.skills.join(', ')}</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-stone-700/60">
                      <span className="text-stone-400">CSGSP Status:</span>
                      <span className={`font-bold uppercase tracking-wide ${partner.isCsgspCertified ? 'text-amber-400' : 'text-stone-400'}`}>
                        {partner.isCsgspCertified ? 'CERTIFIED SKILLED PARTNER' : partner.journeyStatus.toUpperCase()}
                      </span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-stone-700/60">
                      <span className="text-stone-400">Verification Status:</span>
                      <span className="font-bold text-emerald-400 uppercase tracking-wide">
                        {partner.verificationStatus}
                      </span>
                    </div>
                    <div className="flex justify-between py-1">
                      <span className="text-stone-400">Aadhar KYC Hash:</span>
                      <span className="font-mono text-stone-300">{partner.aadharNumber || 'VERIFIED_RAIPUR_HQ'}</span>
                    </div>
                  </div>
                ) : (
                  <div className="text-xs text-stone-500">No partner selected.</div>
                )}
              </div>
            </>
          )}

          {viewingCertificate && (
            <CsgspCertificateModal
              certificate={viewingCertificate}
              onClose={() => setViewingCertificate(null)}
            />
          )}

          <div className="p-4 bg-emerald-950/40 rounded-xl border border-emerald-800/40 flex items-center justify-between">
            <div>
              <div className="text-xs font-bold text-emerald-300">Ready to build the Flutter Partner APK?</div>
              <div className="text-[11px] text-stone-400 mt-0.5">Complete Dart &amp; Flutter codebase is ready for Android compilation.</div>
            </div>
          </div>
        </div>

      </div>

      {/* INCOMING JOB ALERT POPUP MODAL (30s COUNTDOWN) */}
      {incomingJobAlert && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs">
          <div className="bg-stone-900 border-2 border-emerald-500 w-full max-w-md rounded-2xl p-6 shadow-2xl space-y-4 animate-in zoom-in-95 duration-200">
            
            <div className="flex items-center justify-between">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-rose-500/20 text-rose-400 border border-rose-500/40 animate-pulse">
                <Volume2 className="w-3.5 h-3.5" />
                <span>NEW JOB DISPATCH ALERT</span>
              </div>

              {/* Countdown circle */}
              <div className="w-9 h-9 rounded-full bg-emerald-950 border border-emerald-600 text-emerald-300 font-mono font-bold text-xs flex items-center justify-center shadow-xs">
                {alertCountdown}s
              </div>
            </div>

            <div>
              <h3 className="text-lg font-bold text-white">
                {incomingJobAlert.serviceType}
              </h3>
              <p className="text-xs text-stone-400 mt-0.5">
                Immediate customer booking in your assigned sector.
              </p>
            </div>

            <div className="bg-stone-950 p-3.5 rounded-xl border border-stone-800 space-y-2 text-xs">
              <div className="flex justify-between items-center py-0.5">
                <span className="text-stone-400">Customer:</span>
                <span className="font-semibold text-white">{incomingJobAlert.customerName}</span>
              </div>
              <div className="flex justify-between items-start py-0.5">
                <span className="text-stone-400">Address:</span>
                <span className="font-semibold text-stone-200 text-right max-w-[220px] truncate">{incomingJobAlert.address}</span>
              </div>
              <div className="flex justify-between items-center py-0.5 border-t border-stone-800/80 pt-1.5">
                <span className="text-stone-400">Your Earning (85%):</span>
                <span className="font-bold text-emerald-400 font-mono text-sm">
                  ₹{Math.round(incomingJobAlert.amount * 0.85)} (Total: ₹{incomingJobAlert.amount})
                </span>
              </div>
            </div>

            <div className="flex gap-3 pt-2">
              <button
                onClick={() => setIncomingJobAlert(null)}
                className="w-1/3 py-2.5 rounded-xl border border-stone-700 hover:bg-stone-800 text-stone-300 text-xs font-semibold transition-colors cursor-pointer"
              >
                Decline
              </button>
              <button
                onClick={() => handleAcceptJob(incomingJobAlert.id)}
                disabled={actionLoading}
                className="w-2/3 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow-lg shadow-emerald-900/30 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Check className="w-4 h-4" />
                <span>ACCEPT JOB NOW ({alertCountdown}s)</span>
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
