import React, { useState, useEffect } from 'react';
import { 
  Users, 
  UserPlus, 
  ShieldCheck, 
  Clock, 
  AlertCircle, 
  CheckCircle2, 
  XCircle, 
  IndianRupee, 
  Phone, 
  Search, 
  Filter, 
  Wrench, 
  MapPin, 
  Sparkles, 
  Plus, 
  Edit3, 
  MessageCircle,
  Smartphone,
  Check,
  RefreshCw,
  TrendingUp,
  Award
} from 'lucide-react';
import { LiveProvider } from '../types';

interface AdminPartnerManagerProps {
  onRefreshStats?: () => void;
  onOpenCompanion?: (partnerId: string) => void;
}

const RAIPUR_ZONES = [
  'Currency Tower & VIP Road Hub',
  'Shankar Nagar & Pandri Hub',
  'Telibandha & Magneto Mall Hub',
  'Samta Colony & Choubey Colony',
  'Tatibandh & AIIMS Hub',
  'Bhilai Sector 6 & Civic Centre',
  'Bhilai Nehru Nagar & Junwani',
  'Durg Mohan Nagar & Station Road',
  'Bilaspur Vyapar Vihar'
];

const SKILL_OPTIONS = [
  'Electrician',
  'Plumbing',
  'AC Repair & Jet Cleaning',
  'Carpentry',
  'Modular Kitchen',
  'Civil Masonry',
  'Painting & Waterproofing',
  'Deep Cleaning',
  'Appliance Repair',
  'CCTV & Security'
];

export const AdminPartnerManager: React.FC<AdminPartnerManagerProps> = ({
  onRefreshStats,
  onOpenCompanion
}) => {
  const [providers, setProviders] = useState<LiveProvider[]>([]);
  const [loading, setLoading] = useState(false);
  const [statusFilter, setStatusFilter] = useState<'all' | 'pending_verification' | 'verified' | 'suspended'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  // Manual Add Modal State
  const [showAddModal, setShowAddModal] = useState(false);
  const [addName, setAddName] = useState('');
  const [addPhone, setAddPhone] = useState('');
  const [addWhatsapp, setAddWhatsapp] = useState('');
  const [addCity, setAddCity] = useState('Raipur');
  const [addZone, setAddZone] = useState('Currency Tower & VIP Road Hub');
  const [addSkills, setAddSkills] = useState<string[]>(['Electrician']);
  const [addExperience, setAddExperience] = useState('4');
  const [addAadhar, setAddAadhar] = useState('XXXX-XXXX-8921');
  const [addUpi, setAddUpi] = useState('');
  const [addInitialWallet, setAddInitialWallet] = useState('500');
  const [addLoading, setAddLoading] = useState(false);

  // Wallet Adjust Modal State
  const [selectedProviderForWallet, setSelectedProviderForWallet] = useState<LiveProvider | null>(null);
  const [walletAmount, setWalletAmount] = useState('500');
  const [walletAction, setWalletAction] = useState<'credit' | 'debit'>('credit');
  const [walletReason, setWalletReason] = useState('Starter incentive bonus');
  const [walletLoading, setWalletLoading] = useState(false);

  const fetchProviders = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/providers');
      const data = await res.json();
      if (data.providers) {
        setProviders(data.providers);
      }
    } catch (err) {
      console.error('Error fetching providers:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProviders();
  }, []);

  const handleVerify = async (id: string, newStatus: 'verified' | 'rejected' | 'suspended') => {
    try {
      const res = await fetch(`/api/partners/${id}/verify`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ verificationStatus: newStatus })
      });
      const data = await res.json();
      if (res.ok) {
        setStatusMessage(data.message || `Partner status updated to ${newStatus}`);
        fetchProviders();
        if (onRefreshStats) onRefreshStats();
        setTimeout(() => setStatusMessage(null), 4000);
      }
    } catch (err) {
      console.error('Error updating verification:', err);
    }
  };

  const handleToggleDuty = async (id: string, currentStatus: string) => {
    const nextStatus = currentStatus === 'online' ? 'offline' : 'online';
    try {
      const res = await fetch(`/api/providers/${id}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: nextStatus })
      });
      if (res.ok) {
        fetchProviders();
        if (onRefreshStats) onRefreshStats();
      }
    } catch (err) {
      console.error('Error toggling duty:', err);
    }
  };

  const handleAddPartnerSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!addName.trim() || !addPhone.trim()) {
      alert('Please fill at least Partner Name and Phone Number');
      return;
    }

    setAddLoading(true);
    try {
      const res = await fetch('/api/partners/manual-add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: addName.trim(),
          phone: addPhone.trim().startsWith('+91') ? addPhone.trim() : `+91 ${addPhone.trim()}`,
          whatsapp: addWhatsapp ? (addWhatsapp.startsWith('+91') ? addWhatsapp : `+91 ${addWhatsapp}`) : addPhone.trim(),
          skills: addSkills,
          city: addCity,
          zone: addZone,
          experienceYears: Number(addExperience) || 3,
          aadharNumber: addAadhar.trim() || 'VERIFIED_OFFICE_KYC',
          upiId: addUpi.trim() || `${addPhone.trim()}@upi`,
          initialWallet: Number(addInitialWallet) || 500,
          verificationStatus: 'verified',
          status: 'online'
        })
      });

      const data = await res.json();
      if (res.ok) {
        setStatusMessage(`Partner "${addName}" added and enrolled directly into active dispatch!`);
        setShowAddModal(false);
        setAddName('');
        setAddPhone('');
        setAddWhatsapp('');
        fetchProviders();
        if (onRefreshStats) onRefreshStats();
        setTimeout(() => setStatusMessage(null), 4000);
      } else {
        alert(data.error || 'Failed to add partner.');
      }
    } catch (err) {
      console.error('Add partner error:', err);
    } finally {
      setAddLoading(false);
    }
  };

  const handleWalletSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedProviderForWallet) return;

    setWalletLoading(true);
    try {
      const res = await fetch(`/api/partners/${selectedProviderForWallet.id}/wallet`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount: Number(walletAmount),
          action: walletAction,
          reason: walletReason
        })
      });

      const data = await res.json();
      if (res.ok) {
        setStatusMessage(data.message);
        setSelectedProviderForWallet(null);
        fetchProviders();
        setTimeout(() => setStatusMessage(null), 4000);
      } else {
        alert(data.error || 'Failed to update wallet.');
      }
    } catch (err) {
      console.error('Wallet error:', err);
    } finally {
      setWalletLoading(false);
    }
  };

  // Filter providers based on search and status tabs
  const filteredProviders = providers.filter(p => {
    const matchesStatus = statusFilter === 'all' || p.verificationStatus === statusFilter;
    const query = searchQuery.toLowerCase().trim();
    const matchesSearch = !query || 
      p.name.toLowerCase().includes(query) ||
      p.phone.includes(query) ||
      p.id.toLowerCase().includes(query) ||
      (p.city && p.city.toLowerCase().includes(query)) ||
      p.zone.toLowerCase().includes(query) ||
      p.skills.some(s => s.toLowerCase().includes(query));
    
    return matchesStatus && matchesSearch;
  });

  const pendingCount = providers.filter(p => p.verificationStatus === 'pending_verification').length;
  const verifiedCount = providers.filter(p => p.verificationStatus === 'verified').length;
  const onlineCount = providers.filter(p => p.status === 'online').length;

  return (
    <div className="space-y-4">
      {/* Top Banner & Fast Actions */}
      <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-base font-bold text-stone-900 flex items-center gap-2">
              <Users className="w-5 h-5 text-emerald-700" />
              Service Partner KYC &amp; Verification Center
            </h3>
            {pendingCount > 0 && (
              <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-amber-100 text-amber-800 border border-amber-300 animate-pulse">
                {pendingCount} Pending Verification
              </span>
            )}
          </div>
          <p className="text-xs text-stone-500 mt-1">
            Manage field technicians across Raipur, Bhilai, Durg &amp; Bilaspur. Verify KYC documents, adjust wallet balances, and onboard walk-in partners.
          </p>
        </div>

        <div className="flex items-center gap-2.5 shrink-0">
          <button
            onClick={fetchProviders}
            className="p-2 rounded-xl border border-stone-200 hover:bg-stone-50 text-stone-600 transition-colors"
            title="Refresh Partners"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
          </button>

          <button
            onClick={() => setShowAddModal(true)}
            className="px-4 py-2 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold shadow-xs transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <UserPlus className="w-4 h-4" />
            <span>Manual Add Partner (Walk-in)</span>
          </button>
        </div>
      </div>

      {statusMessage && (
        <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-900 rounded-xl text-xs flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>{statusMessage}</span>
          </div>
          <button onClick={() => setStatusMessage(null)} className="text-emerald-700 font-bold ml-3 cursor-pointer">
            Dismiss
          </button>
        </div>
      )}

      {/* KPI Counters */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="p-3.5 bg-white rounded-xl border border-stone-200">
          <div className="text-[11px] font-bold text-stone-500 uppercase">Total Enrolled</div>
          <div className="text-xl font-bold font-mono text-stone-900 mt-0.5">{providers.length}</div>
          <div className="text-[10px] text-stone-400 mt-0.5">Raipur Metro Hub</div>
        </div>

        <div className="p-3.5 bg-white rounded-xl border border-stone-200">
          <div className="text-[11px] font-bold text-stone-500 uppercase">Verified &bull; Active</div>
          <div className="text-xl font-bold font-mono text-emerald-700 mt-0.5">{verifiedCount}</div>
          <div className="text-[10px] text-emerald-600 mt-0.5">KYC Approved</div>
        </div>

        <div className="p-3.5 bg-white rounded-xl border border-stone-200">
          <div className="text-[11px] font-bold text-stone-500 uppercase">Pending KYC</div>
          <div className="text-xl font-bold font-mono text-amber-600 mt-0.5">{pendingCount}</div>
          <div className="text-[10px] text-amber-700 mt-0.5">Requires Verification</div>
        </div>

        <div className="p-3.5 bg-white rounded-xl border border-stone-200">
          <div className="text-[11px] font-bold text-stone-500 uppercase">Live on Duty</div>
          <div className="text-xl font-bold font-mono text-indigo-700 mt-0.5">{onlineCount}</div>
          <div className="text-[10px] text-indigo-600 mt-0.5">Ready for instant dispatch</div>
        </div>
      </div>

      {/* Filter Bar & Search */}
      <div className="bg-white p-3.5 rounded-xl border border-stone-200 flex flex-col sm:flex-row items-center justify-between gap-3">
        {/* Sub-status filter pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto">
          <button
            onClick={() => setStatusFilter('all')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors whitespace-nowrap cursor-pointer ${
              statusFilter === 'all'
                ? 'bg-stone-900 text-white'
                : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
            }`}
          >
            All Partners ({providers.length})
          </button>

          <button
            onClick={() => setStatusFilter('pending_verification')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors whitespace-nowrap cursor-pointer flex items-center gap-1 ${
              statusFilter === 'pending_verification'
                ? 'bg-amber-700 text-white'
                : 'bg-amber-50 text-amber-800 hover:bg-amber-100 border border-amber-200'
            }`}
          >
            <Clock className="w-3.5 h-3.5" />
            <span>Pending KYC ({pendingCount})</span>
          </button>

          <button
            onClick={() => setStatusFilter('verified')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors whitespace-nowrap cursor-pointer flex items-center gap-1 ${
              statusFilter === 'verified'
                ? 'bg-emerald-700 text-white'
                : 'bg-emerald-50 text-emerald-800 hover:bg-emerald-100 border border-emerald-200'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Verified Sathis ({verifiedCount})</span>
          </button>

          <button
            onClick={() => setStatusFilter('suspended')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors whitespace-nowrap cursor-pointer ${
              statusFilter === 'suspended'
                ? 'bg-rose-700 text-white'
                : 'bg-rose-50 text-rose-800 hover:bg-rose-100 border border-rose-200'
            }`}
          >
            Suspended
          </button>
        </div>

        {/* Search Field */}
        <div className="relative w-full sm:w-64">
          <Search className="w-3.5 h-3.5 text-stone-400 absolute left-3 top-2.5" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search partner, phone, skill..."
            className="w-full pl-8 pr-3 py-1.5 text-xs rounded-lg border border-stone-300 focus:outline-none focus:ring-1 focus:ring-emerald-600"
          />
        </div>
      </div>

      {/* Partners List / Table */}
      <div className="space-y-3">
        {filteredProviders.length === 0 ? (
          <div className="bg-white p-8 rounded-2xl border border-stone-200 text-center text-xs text-stone-500">
            No partners found matching the filter criteria.
          </div>
        ) : (
          filteredProviders.map(partner => (
            <div
              key={partner.id}
              className={`bg-white rounded-xl border p-4 shadow-xs space-y-3 transition-all hover:border-stone-300 ${
                partner.verificationStatus === 'pending_verification'
                  ? 'border-amber-300 bg-amber-50/20'
                  : 'border-stone-200'
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full bg-stone-100 border border-stone-200 flex items-center justify-center font-bold text-stone-700 shrink-0">
                    {partner.name.charAt(0)}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="text-sm font-bold text-stone-900">{partner.name}</h4>
                      <span className="text-xs font-mono font-bold text-stone-400">({partner.id})</span>
                      
                      {/* Verification Status Badge */}
                      {partner.verificationStatus === 'verified' && (
                        <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300">
                          <ShieldCheck className="w-3 h-3" />
                          VERIFIED
                        </span>
                      )}
                      {partner.verificationStatus === 'pending_verification' && (
                        <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 border border-amber-300">
                          <Clock className="w-3 h-3" />
                          KYC PENDING
                        </span>
                      )}
                      {partner.verificationStatus === 'suspended' && (
                        <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-rose-100 text-rose-800 border border-rose-300">
                          <XCircle className="w-3 h-3" />
                          SUSPENDED
                        </span>
                      )}

                      {/* Onboarding Source */}
                      {partner.onboardingSource && (
                        <span className="text-[9px] font-medium text-stone-400 bg-stone-100 px-1.5 py-0.5 rounded">
                          {partner.onboardingSource === 'manual_admin' ? 'Direct Admin Entry' : 'Self-Registered'}
                        </span>
                      )}
                    </div>

                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-stone-500 mt-1">
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 text-stone-400" />
                        <strong>{partner.zone}</strong> ({partner.city || 'Raipur'})
                      </span>
                      <span>&bull;</span>
                      <span>Rating: <strong className="text-amber-600">★ {partner.rating}</strong></span>
                      <span>&bull;</span>
                      <span>Jobs: <strong>{partner.completedJobs}</strong></span>
                      {partner.experienceYears && (
                        <>
                          <span>&bull;</span>
                          <span>Exp: <strong>{partner.experienceYears} yrs</strong></span>
                        </>
                      )}
                    </div>
                  </div>
                </div>

                {/* Duty Toggle & Wallet Quick Actions */}
                <div className="flex items-center gap-2 self-end sm:self-auto shrink-0">
                  <div className="text-right mr-2 hidden sm:block">
                    <div className="text-[10px] text-stone-400">Wallet Balance</div>
                    <div className="text-sm font-bold font-mono text-emerald-700">₹{partner.walletBalance}</div>
                  </div>

                  {/* Toggle Online Duty */}
                  <button
                    onClick={() => handleToggleDuty(partner.id, partner.status)}
                    className={`px-2.5 py-1 rounded-lg text-xs font-bold border transition-colors cursor-pointer flex items-center gap-1.5 ${
                      partner.status === 'online'
                        ? 'bg-emerald-50 text-emerald-700 border-emerald-300 hover:bg-emerald-100'
                        : partner.status === 'on_job'
                        ? 'bg-amber-50 text-amber-700 border-amber-300'
                        : 'bg-stone-100 text-stone-600 border-stone-300 hover:bg-stone-200'
                    }`}
                  >
                    <span className={`w-2 h-2 rounded-full ${partner.status === 'online' ? 'bg-emerald-500' : partner.status === 'on_job' ? 'bg-amber-500 animate-ping' : 'bg-stone-400'}`} />
                    <span>{partner.status.toUpperCase()}</span>
                  </button>

                  {/* Open Companion Test */}
                  {onOpenCompanion && (
                    <button
                      onClick={() => onOpenCompanion(partner.id)}
                      className="p-1.5 rounded-lg border border-stone-200 hover:bg-stone-100 text-stone-600 transition-colors"
                      title="Test inside Partner App Simulator"
                    >
                      <Smartphone className="w-4 h-4 text-emerald-700" />
                    </button>
                  )}
                </div>
              </div>

              {/* Skills and KYC Breakdown */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs bg-stone-50 p-2.5 rounded-lg border border-stone-100">
                <div>
                  <span className="text-stone-400 text-[11px] block">Skills / Trade:</span>
                  <span className="font-medium text-stone-800">{partner.skills.join(', ')}</span>
                </div>
                <div>
                  <span className="text-stone-400 text-[11px] block">Phone &amp; WhatsApp:</span>
                  <div className="flex items-center gap-2">
                    <a href={`tel:${partner.phone}`} className="font-mono text-stone-800 font-semibold hover:underline">
                      {partner.phone}
                    </a>
                    <a
                      href={`https://wa.me/${partner.phone.replace(/[^0-9]/g, '')}?text=Hello%20${encodeURIComponent(partner.name)}%2C%20Gharkasathi%20Operations%20team%20here.`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-emerald-600 hover:text-emerald-700"
                      title="Chat on WhatsApp"
                    >
                      <MessageCircle className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
                <div>
                  <span className="text-stone-400 text-[11px] block">UPI &amp; Payout Account:</span>
                  <span className="font-mono text-stone-700 font-semibold">{partner.upiId || 'Not set'}</span>
                </div>
              </div>

              {/* Action Toolbar */}
              <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-stone-100">
                <div className="flex items-center gap-2 text-[11px] text-stone-500">
                  <span>Aadhar KYC: <strong className="text-stone-700 font-mono">{partner.aadharNumber || 'Pending'}</strong></span>
                  {partner.vehicleType && (
                    <>
                      <span>&bull;</span>
                      <span>Vehicle: <strong>{partner.vehicleType}</strong></span>
                    </>
                  )}
                </div>

                <div className="flex items-center gap-2">
                  {/* Wallet Adjust */}
                  <button
                    onClick={() => {
                      setSelectedProviderForWallet(partner);
                      setWalletAmount('500');
                    }}
                    className="px-2.5 py-1 text-xs font-semibold text-stone-700 bg-stone-100 hover:bg-stone-200 rounded-lg transition-colors flex items-center gap-1 cursor-pointer"
                  >
                    <IndianRupee className="w-3 h-3 text-emerald-600" />
                    <span>Adjust Wallet</span>
                  </button>

                  {/* Verification Actions */}
                  {partner.verificationStatus === 'pending_verification' ? (
                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => handleVerify(partner.id, 'verified')}
                        className="px-3 py-1 rounded-lg text-xs font-bold text-white bg-emerald-700 hover:bg-emerald-800 shadow-xs transition-colors flex items-center gap-1 cursor-pointer"
                      >
                        <ShieldCheck className="w-3.5 h-3.5" />
                        <span>Approve &amp; Verify Sathi</span>
                      </button>
                      <button
                        onClick={() => handleVerify(partner.id, 'rejected')}
                        className="px-2.5 py-1 rounded-lg text-xs font-semibold text-rose-700 bg-rose-50 hover:bg-rose-100 border border-rose-200 transition-colors cursor-pointer"
                      >
                        Reject
                      </button>
                    </div>
                  ) : partner.verificationStatus === 'verified' ? (
                    <button
                      onClick={() => handleVerify(partner.id, 'suspended')}
                      className="px-2.5 py-1 rounded-lg text-xs font-semibold text-stone-500 hover:text-rose-700 hover:bg-rose-50 border border-stone-200 transition-colors cursor-pointer"
                    >
                      Suspend Access
                    </button>
                  ) : (
                    <button
                      onClick={() => handleVerify(partner.id, 'verified')}
                      className="px-2.5 py-1 rounded-lg text-xs font-semibold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 transition-colors cursor-pointer"
                    >
                      Re-activate Sathi
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* MODAL 1: MANUAL ADD SERVICE PARTNER */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-xs overflow-y-auto">
          <div className="bg-white rounded-2xl border border-stone-200 shadow-2xl w-full max-w-xl p-6 space-y-4 my-8 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between pb-3 border-b border-stone-200">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold">
                  <UserPlus className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-base font-bold text-stone-900">Manual Partner Enrollment</h4>
                  <p className="text-xs text-stone-500">Add walk-in technician directly into active dispatch</p>
                </div>
              </div>
              <button
                onClick={() => setShowAddModal(false)}
                className="p-1 rounded-lg hover:bg-stone-100 text-stone-400 hover:text-stone-700 cursor-pointer"
              >
                &times;
              </button>
            </div>

            <form onSubmit={handleAddPartnerSubmit} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-stone-700 mb-1">Full Name *</label>
                  <input
                    type="text"
                    required
                    value={addName}
                    onChange={(e) => setAddName(e.target.value)}
                    placeholder="e.g. Ramesh Kumar Verma"
                    className="w-full px-3 py-2 rounded-lg border border-stone-300 focus:outline-none focus:ring-1 focus:ring-emerald-600"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-stone-700 mb-1">Mobile Phone *</label>
                  <input
                    type="tel"
                    required
                    value={addPhone}
                    onChange={(e) => setAddPhone(e.target.value)}
                    placeholder="e.g. 98261XXXXX"
                    className="w-full px-3 py-2 rounded-lg border border-stone-300 focus:outline-none focus:ring-1 focus:ring-emerald-600"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-stone-700 mb-1">City Hub</label>
                  <select
                    value={addCity}
                    onChange={(e) => setAddCity(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-stone-300 focus:outline-none focus:ring-1 focus:ring-emerald-600 bg-white"
                  >
                    <option value="Raipur">Raipur</option>
                    <option value="Bhilai">Bhilai</option>
                    <option value="Durg">Durg</option>
                    <option value="Bilaspur">Bilaspur</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-stone-700 mb-1">Territory / Zone</label>
                  <select
                    value={addZone}
                    onChange={(e) => setAddZone(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-stone-300 focus:outline-none focus:ring-1 focus:ring-emerald-600 bg-white"
                  >
                    {RAIPUR_ZONES.map(z => (
                      <option key={z} value={z}>{z}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-stone-700 mb-1">Experience (Years)</label>
                  <input
                    type="number"
                    value={addExperience}
                    onChange={(e) => setAddExperience(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-stone-300 focus:outline-none focus:ring-1 focus:ring-emerald-600"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-stone-700 mb-1">Starter Wallet Credit (₹)</label>
                  <input
                    type="number"
                    value={addInitialWallet}
                    onChange={(e) => setAddInitialWallet(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-stone-300 focus:outline-none focus:ring-1 focus:ring-emerald-600 font-mono"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-stone-700 mb-1">Aadhar Verification Number</label>
                  <input
                    type="text"
                    value={addAadhar}
                    onChange={(e) => setAddAadhar(e.target.value)}
                    placeholder="XXXX-XXXX-8921"
                    className="w-full px-3 py-2 rounded-lg border border-stone-300 focus:outline-none focus:ring-1 focus:ring-emerald-600 font-mono"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-stone-700 mb-1">UPI ID for Payouts</label>
                  <input
                    type="text"
                    value={addUpi}
                    onChange={(e) => setAddUpi(e.target.value)}
                    placeholder="name@okaxis"
                    className="w-full px-3 py-2 rounded-lg border border-stone-300 focus:outline-none focus:ring-1 focus:ring-emerald-600 font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-stone-700 mb-1.5">Trade Skills</label>
                <div className="flex flex-wrap gap-1.5">
                  {SKILL_OPTIONS.map(skill => {
                    const isSelected = addSkills.includes(skill);
                    return (
                      <button
                        type="button"
                        key={skill}
                        onClick={() => {
                          setAddSkills(prev => 
                            prev.includes(skill)
                              ? prev.length > 1 ? prev.filter(s => s !== skill) : prev
                              : [...prev, skill]
                          );
                        }}
                        className={`px-2.5 py-1 rounded-md text-[11px] font-medium transition-colors cursor-pointer ${
                          isSelected
                            ? 'bg-emerald-800 text-white'
                            : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                        }`}
                      >
                        {skill}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="pt-3 border-t border-stone-200 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 border border-stone-300 hover:bg-stone-50 rounded-lg text-stone-600 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={addLoading}
                  className="px-5 py-2 bg-emerald-700 hover:bg-emerald-800 text-white font-bold rounded-lg shadow-sm cursor-pointer disabled:opacity-50"
                >
                  {addLoading ? 'Enrolling...' : 'Enroll & Verify Partner'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 2: ADJUST WALLET */}
      {selectedProviderForWallet && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-xs">
          <div className="bg-white rounded-2xl border border-stone-200 shadow-2xl w-full max-w-sm p-5 space-y-4 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between pb-2 border-b border-stone-200">
              <h4 className="text-sm font-bold text-stone-900 flex items-center gap-2">
                <IndianRupee className="w-4 h-4 text-emerald-600" />
                Adjust Sathi Wallet
              </h4>
              <button
                onClick={() => setSelectedProviderForWallet(null)}
                className="p-1 rounded-lg hover:bg-stone-100 text-stone-400 hover:text-stone-700 cursor-pointer"
              >
                &times;
              </button>
            </div>

            <div className="bg-stone-50 p-2.5 rounded-lg text-xs space-y-1">
              <div>Partner: <strong>{selectedProviderForWallet.name}</strong></div>
              <div>Current Balance: <strong className="text-emerald-700 font-mono">₹{selectedProviderForWallet.walletBalance}</strong></div>
            </div>

            <form onSubmit={handleWalletSubmit} className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold text-stone-700 mb-1">Action</label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setWalletAction('credit')}
                    className={`py-1.5 rounded-lg font-bold border transition-colors cursor-pointer ${
                      walletAction === 'credit'
                        ? 'bg-emerald-700 text-white border-emerald-800'
                        : 'bg-stone-100 text-stone-600 border-stone-200'
                    }`}
                  >
                    Credit (+)
                  </button>
                  <button
                    type="button"
                    onClick={() => setWalletAction('debit')}
                    className={`py-1.5 rounded-lg font-bold border transition-colors cursor-pointer ${
                      walletAction === 'debit'
                        ? 'bg-rose-700 text-white border-rose-800'
                        : 'bg-stone-100 text-stone-600 border-stone-200'
                    }`}
                  >
                    Debit (-)
                  </button>
                </div>
              </div>

              <div>
                <label className="block font-semibold text-stone-700 mb-1">Amount (₹)</label>
                <input
                  type="number"
                  required
                  min="1"
                  value={walletAmount}
                  onChange={(e) => setWalletAmount(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-stone-300 font-mono text-sm font-bold"
                />
              </div>

              <div>
                <label className="block font-semibold text-stone-700 mb-1">Reason / Note</label>
                <input
                  type="text"
                  value={walletReason}
                  onChange={(e) => setWalletReason(e.target.value)}
                  placeholder="e.g. Welcome bonus, manual cash adjustment"
                  className="w-full px-3 py-2 rounded-lg border border-stone-300"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setSelectedProviderForWallet(null)}
                  className="px-3 py-1.5 border border-stone-300 rounded-lg text-stone-600"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={walletLoading}
                  className="px-4 py-1.5 bg-emerald-700 hover:bg-emerald-800 text-white font-bold rounded-lg cursor-pointer"
                >
                  {walletLoading ? 'Saving...' : 'Apply Wallet Change'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
