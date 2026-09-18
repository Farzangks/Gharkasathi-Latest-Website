import React, { useState } from 'react';
import { 
  ShieldCheck, 
  DollarSign, 
  TrendingUp, 
  Users, 
  Clock, 
  AlertCircle, 
  CheckCircle2, 
  Calendar, 
  Wrench, 
  Edit3, 
  Plus, 
  Search, 
  Filter, 
  FileText, 
  Layers, 
  Send, 
  Phone, 
  MapPin,
  Sparkles,
  RefreshCw,
  Eye,
  Sliders
} from 'lucide-react';
import { 
  MaintenancePlan, 
  MaintenanceContract, 
  MaintenanceServiceRequest, 
  CrmMaintenanceLead,
  PricingRuleConfig
} from '../../types/maintenance';
import { DEFAULT_MAINTENANCE_PLANS, DEFAULT_PRICING_RULES } from '../../data/maintenanceCatalog';

export const AdminCareMaintenancePanel: React.FC = () => {
  const [activeAdminTab, setActiveAdminTab] = useState<'overview' | 'contracts' | 'requests' | 'plans' | 'crm' | 'pricing'>('overview');

  // Admin Configurable Plans State
  const [plans, setPlans] = useState<MaintenancePlan[]>(() => {
    const saved = localStorage.getItem('gks_admin_maintenance_plans');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { }
    }
    return DEFAULT_MAINTENANCE_PLANS;
  });

  // Admin Configurable Pricing Rules
  const [pricingRules, setPricingRules] = useState<PricingRuleConfig>(() => {
    const saved = localStorage.getItem('gks_admin_pricing_rules');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { }
    }
    return DEFAULT_PRICING_RULES;
  });

  // Sample Active Contracts
  const [contracts, setContracts] = useState<MaintenanceContract[]>([
    {
      id: 'ctr_01',
      contractNumber: 'GKS-AMC-2026-1194',
      target: 'commercial',
      planType: 'AMC',
      planTitle: 'The Grand Raipur Hotel - Facility AMC',
      customerName: 'Rohit Singhania',
      customerPhone: '+91 98271 88990',
      customerEmail: 'rohit@grandhotel.com',
      businessName: 'The Grand Raipur Hotel',
      propertyType: 'Hotel & Banquets',
      address: 'GE Road, Raipur, CG',
      city: 'Raipur',
      startDate: '2026-01-15',
      endDate: '2027-01-15',
      renewalDate: '2026-12-15',
      status: 'active',
      totalValue: 145000,
      monthlyEquivalent: 12083,
      paymentFrequency: 'annual',
      paymentStatus: 'paid',
      servicesCovered: ['HVAC Chillers Monthly', 'Pest Control Monthly', 'Commercial Kitchen Degreasing Monthly', 'Electrical DB Bi-Weekly'],
      categoriesCovered: ['hvac', 'pest_control', 'cleaning', 'electrical'],
      visitsTotal: 96,
      visitsUsed: 62,
      emergencySupport: true,
      responseSlaHours: 2,
      digitalAcceptedByCustomer: true,
      adminApproved: true,
      autoRenewal: true,
      createdAt: '2026-01-15T09:00:00Z'
    },
    {
      id: 'ctr_02',
      contractNumber: 'GKS-HMC-2026-0842',
      target: 'residential',
      planType: 'HMC',
      planTitle: 'Smart Care Home Plan',
      customerName: 'Aakash Verma',
      customerPhone: '+91 98271 23456',
      customerEmail: 'aakash@example.com',
      propertyType: 'Independent House',
      address: 'Shankar Nagar, Raipur, CG',
      city: 'Raipur',
      startDate: '2026-03-01',
      endDate: '2027-03-01',
      renewalDate: '2027-02-01',
      status: 'active',
      totalValue: 39990,
      monthlyEquivalent: 3332,
      paymentFrequency: 'annual',
      paymentStatus: 'paid',
      servicesCovered: ['AC Jet Wash (2)', 'Plumbing Leaks', 'Electrical Audit', 'Pest Control Gel'],
      categoriesCovered: ['appliances', 'plumbing', 'electrical', 'pest_control'],
      visitsTotal: 36,
      visitsUsed: 14,
      emergencySupport: true,
      responseSlaHours: 4,
      digitalAcceptedByCustomer: true,
      adminApproved: true,
      autoRenewal: true,
      createdAt: '2026-03-01T10:00:00Z'
    }
  ]);

  // Sample Service Requests
  const [serviceRequests, setServiceRequests] = useState<MaintenanceServiceRequest[]>([
    {
      id: 'req_01',
      contractId: 'ctr_01',
      contractNumber: 'GKS-AMC-2026-1194',
      customerName: 'The Grand Raipur Hotel (Rohit)',
      customerPhone: '+91 98271 88990',
      propertyAddress: 'GE Road, Raipur, CG',
      category: 'hvac',
      serviceName: 'Commercial Cassette AC 3.0 Ton Chilling Issue',
      problemDescription: 'Main dining hall cassette AC tripping circuit breaker after 15 mins of operation.',
      preferredDate: '2026-09-18',
      preferredTimeSlot: 'Immediate Emergency',
      isEmergency: true,
      status: 'assigned',
      assignedPartnerId: 'prt_401',
      assignedPartnerName: 'Manoj Sahu (Certified HVAC Specialist)',
      assignedPartnerPhone: '+91 97555 12345',
      assignedPartnerRating: 4.9,
      createdAt: '2026-09-18T04:30:00Z'
    },
    {
      id: 'req_02',
      contractId: 'ctr_02',
      contractNumber: 'GKS-HMC-2026-0842',
      customerName: 'Aakash Verma',
      customerPhone: '+91 98271 23456',
      propertyAddress: 'Shankar Nagar, Raipur',
      category: 'plumbing',
      serviceName: 'Bathroom Concealed Diverter Leakage',
      problemDescription: 'Slight seepage around shower diverter valve wall tile.',
      preferredDate: '2026-09-19',
      preferredTimeSlot: '10:00 AM - 01:00 PM',
      isEmergency: false,
      status: 'scheduled',
      createdAt: '2026-09-18T05:10:00Z'
    }
  ]);

  // CRM Leads
  const [crmLeads, setCrmLeads] = useState<CrmMaintenanceLead[]>([
    {
      id: 'lead_01',
      name: 'Dr. Vivek Sharma',
      phone: '+91 94252 77889',
      email: 'dr.sharma@sanctuaryclinic.com',
      propertyOrBusiness: 'Sanctuary Multispeciality Clinic (4,500 sq.ft.)',
      target: 'commercial',
      planType: 'AMC',
      estimatedValue: 88000,
      stage: 'quotation_sent',
      assignedAgent: 'Pooja (Key Accounts)',
      notes: 'Requested medical-grade clean room AC servicing and monthly pest audit. Proposal sent via WhatsApp.',
      createdAt: '2026-09-17T11:00:00Z'
    },
    {
      id: 'lead_02',
      name: 'Siddharth Agrawal',
      phone: '+91 98261 44556',
      email: 'siddharth@avalonvillas.com',
      propertyOrBusiness: 'Avalon Villas - 4BHK Duplex',
      target: 'residential',
      planType: 'HMC',
      estimatedValue: 69990,
      stage: 'contacted',
      assignedAgent: 'Deepak (Raipur North)',
      notes: 'Interested in Premium Villa Care with lawn maintenance and 5 AC services.',
      createdAt: '2026-09-18T02:15:00Z'
    }
  ]);

  // Editing plan modal state
  const [editingPlan, setEditingPlan] = useState<MaintenancePlan | null>(null);

  // Financial KPIs
  const totalMrr = contracts.reduce((acc, c) => acc + c.monthlyEquivalent, 0);
  const totalAcv = contracts.reduce((acc, c) => acc + c.totalValue, 0);
  const openRequestsCount = serviceRequests.filter(r => r.status !== 'completed' && r.status !== 'cancelled').length;
  const emergencyCount = serviceRequests.filter(r => r.isEmergency && r.status !== 'completed').length;

  const handleSavePlanEdits = (updatedPlan: MaintenancePlan) => {
    const updated = plans.map(p => p.id === updatedPlan.id ? updatedPlan : p);
    setPlans(updated);
    localStorage.setItem('gks_admin_maintenance_plans', JSON.stringify(updated));
    setEditingPlan(null);
  };

  const handleAssignPartner = (requestId: string, partnerName: string, partnerPhone: string) => {
    setServiceRequests(prev => prev.map(req => {
      if (req.id === requestId) {
        return {
          ...req,
          status: 'assigned',
          assignedPartnerName: partnerName,
          assignedPartnerPhone: partnerPhone
        };
      }
      return req;
    }));
  };

  const handleUpdateStatus = (requestId: string, status: MaintenanceServiceRequest['status']) => {
    setServiceRequests(prev => prev.map(req => {
      if (req.id === requestId) {
        return {
          ...req,
          status,
          completedAt: status === 'completed' ? new Date().toISOString() : undefined
        };
      }
      return req;
    }));
  };

  return (
    <div className="bg-white rounded-3xl border border-stone-200 shadow-sm overflow-hidden text-stone-900 space-y-6">
      {/* Top Command Bar */}
      <div className="bg-stone-900 text-white p-6 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-[11px] font-bold text-red-400 uppercase tracking-wider">
              Care &amp; Maintenance Command Center
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-white mt-1">
            HMC, AMC &amp; QMC Operational Dashboard
          </h2>
          <p className="text-xs text-stone-400 mt-1">
            Real-time subscriber metrics, dynamic plan pricing engine, and certified field partner dispatch.
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center bg-stone-800 p-1 rounded-xl text-xs overflow-x-auto no-scrollbar">
          {(['overview', 'contracts', 'requests', 'plans', 'crm', 'pricing'] as const).map(tab => (
            <button
              key={tab}
              onClick={() => setActiveAdminTab(tab)}
              className={`px-3 py-1.5 rounded-lg font-bold capitalize transition-colors cursor-pointer whitespace-nowrap ${
                activeAdminTab === tab ? 'bg-red-600 text-white shadow-xs' : 'text-stone-300 hover:text-white'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Admin Body */}
      <div className="p-6 sm:p-8 space-y-6">
        {/* ========================================================================= */}
        {/* TAB 1: OVERVIEW & KPIS */}
        {/* ========================================================================= */}
        {activeAdminTab === 'overview' && (
          <div className="space-y-6">
            {/* KPI Cards Strip */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200">
                <span className="text-[11px] font-bold text-stone-400 uppercase block">Monthly Recurring Revenue</span>
                <div className="text-xl sm:text-2xl font-black text-stone-900 font-mono mt-1">
                  ₹{totalMrr.toLocaleString('en-IN')}
                </div>
                <span className="text-[10px] text-emerald-600 font-bold mt-0.5 block">
                  ↑ 24% vs last month
                </span>
              </div>

              <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200">
                <span className="text-[11px] font-bold text-stone-400 uppercase block">Annual Contract Value (ACV)</span>
                <div className="text-xl sm:text-2xl font-black text-stone-900 font-mono mt-1">
                  ₹{totalAcv.toLocaleString('en-IN')}
                </div>
                <span className="text-[10px] text-stone-500 font-mono mt-0.5 block">
                  Across {contracts.length} active facilities
                </span>
              </div>

              <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200">
                <span className="text-[11px] font-bold text-stone-400 uppercase block">Open Service Tickets</span>
                <div className="text-xl sm:text-2xl font-black text-stone-900 font-mono mt-1">
                  {openRequestsCount}
                </div>
                <span className="text-[10px] text-stone-500 mt-0.5 block">
                  {emergencyCount > 0 ? `${emergencyCount} Emergency SLA Active` : 'All SLAs on schedule'}
                </span>
              </div>

              <div className="p-4 rounded-2xl bg-red-50 border border-red-200">
                <span className="text-[11px] font-bold text-red-600 uppercase block">Emergency SLA Requests</span>
                <div className="text-xl sm:text-2xl font-black text-red-700 font-mono mt-1">
                  {emergencyCount}
                </div>
                <span className="text-[10px] text-red-600 font-bold mt-0.5 block">
                  Sub-4hr SLA Dispatch
                </span>
              </div>
            </div>

            {/* Live Operational Dispatch Alert */}
            <div className="bg-white rounded-2xl border border-stone-200 p-5 shadow-xs space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Wrench className="w-4 h-4 text-red-600" />
                  <h4 className="text-sm font-bold text-stone-900">
                    Live Dispatch Queue
                  </h4>
                </div>
                <button
                  onClick={() => setActiveAdminTab('requests')}
                  className="text-xs text-red-600 font-bold hover:underline"
                >
                  View All Tickets →
                </button>
              </div>

              <div className="divide-y divide-stone-100 text-xs">
                {serviceRequests.map(req => (
                  <div key={req.id} className="py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-stone-900">{req.serviceName}</span>
                        {req.isEmergency && (
                          <span className="px-2 py-0.5 rounded-full bg-red-600 text-white font-bold text-[10px]">
                            EMERGENCY
                          </span>
                        )}
                        <span className="px-2 py-0.5 rounded-full bg-stone-100 text-stone-700 font-mono text-[10px] uppercase">
                          {req.status}
                        </span>
                      </div>
                      <p className="text-stone-500 text-[11px] mt-0.5">
                        {req.customerName} &bull; {req.propertyAddress} &bull; Preferred: {req.preferredDate} ({req.preferredTimeSlot})
                      </p>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-[11px] text-stone-600">
                        {req.assignedPartnerName || 'Unassigned'}
                      </span>
                      {req.status !== 'completed' && (
                        <button
                          onClick={() => handleUpdateStatus(req.id, 'completed')}
                          className="px-2.5 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-[10px] cursor-pointer"
                        >
                          Mark Completed
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 2: ACTIVE CONTRACTS */}
        {/* ========================================================================= */}
        {activeAdminTab === 'contracts' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-stone-900">
                Registered Maintenance Contracts ({contracts.length})
              </h3>
              <span className="text-xs text-stone-500">
                Auto-renewable digital agreements
              </span>
            </div>

            <div className="bg-white rounded-2xl border border-stone-200 overflow-hidden text-xs">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-stone-100 text-stone-700 font-bold border-b border-stone-200">
                    <th className="p-3">Contract #</th>
                    <th className="p-3">Client / Business</th>
                    <th className="p-3">Type</th>
                    <th className="p-3">Value</th>
                    <th className="p-3">Visits Used</th>
                    <th className="p-3">SLA</th>
                    <th className="p-3">Expiry</th>
                    <th className="p-3">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-100">
                  {contracts.map(c => (
                    <tr key={c.id} className="hover:bg-stone-50/80 transition-colors">
                      <td className="p-3 font-mono font-bold text-red-600">{c.contractNumber}</td>
                      <td className="p-3">
                        <div className="font-bold text-stone-900">{c.customerName}</div>
                        <div className="text-[11px] text-stone-500">{c.propertyType}</div>
                      </td>
                      <td className="p-3 font-bold">{c.planType}</td>
                      <td className="p-3 font-mono font-bold">₹{c.totalValue.toLocaleString('en-IN')}</td>
                      <td className="p-3 font-mono">{c.visitsUsed} / {c.visitsTotal}</td>
                      <td className="p-3 text-emerald-700 font-bold">{c.responseSlaHours}h SLA</td>
                      <td className="p-3 text-stone-600">{c.endDate}</td>
                      <td className="p-3">
                        <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                          ACTIVE
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 3: SERVICE REQUEST TICKETS */}
        {/* ========================================================================= */}
        {activeAdminTab === 'requests' && (
          <div className="space-y-4">
            <h3 className="text-base font-bold text-stone-900">
              Service Request Dispatch Board
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {serviceRequests.map(req => (
                <div key={req.id} className="bg-white p-5 rounded-2xl border border-stone-200 shadow-xs space-y-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <span className="text-[10px] font-bold text-stone-400 uppercase tracking-wider block">
                        Ticket: {req.id} &bull; {req.contractNumber}
                      </span>
                      <h4 className="text-sm font-bold text-stone-900 mt-0.5">
                        {req.serviceName}
                      </h4>
                      <p className="text-xs text-stone-600 mt-1">
                        {req.problemDescription}
                      </p>
                    </div>

                    {req.isEmergency && (
                      <span className="px-2 py-0.5 rounded-md bg-red-600 text-white text-[10px] font-bold">
                        EMERGENCY
                      </span>
                    )}
                  </div>

                  <div className="bg-stone-50 p-3 rounded-xl text-xs space-y-1 text-stone-600">
                    <div><strong>Customer:</strong> {req.customerName} ({req.customerPhone})</div>
                    <div><strong>Location:</strong> {req.propertyAddress}</div>
                    <div><strong>Slot:</strong> {req.preferredDate} ({req.preferredTimeSlot})</div>
                    <div><strong>Assigned Partner:</strong> {req.assignedPartnerName || 'Pending Assignment'}</div>
                  </div>

                  <div className="flex items-center justify-between pt-2">
                    <div className="flex items-center gap-1.5">
                      <span className="text-[11px] text-stone-500">Status:</span>
                      <select
                        value={req.status}
                        onChange={(e) => handleUpdateStatus(req.id, e.target.value as any)}
                        className="p-1 bg-white border border-stone-300 rounded text-xs font-bold text-stone-800"
                      >
                        <option value="scheduled">Scheduled</option>
                        <option value="assigned">Assigned</option>
                        <option value="on_the_way">On The Way</option>
                        <option value="in_progress">In Progress</option>
                        <option value="completed">Completed</option>
                      </select>
                    </div>

                    {!req.assignedPartnerName && (
                      <button
                        onClick={() => handleAssignPartner(req.id, 'Ramesh Sahu (Certified Lead Tech)', '+91 98270 11223')}
                        className="px-3 py-1 bg-red-600 text-white rounded-lg text-xs font-bold hover:bg-red-700 cursor-pointer"
                      >
                        Auto-Assign Certified Partner
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 4: CONFIGURABLE PLANS MANAGER */}
        {/* ========================================================================= */}
        {activeAdminTab === 'plans' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-stone-900">
                  Care &amp; Maintenance Plans Catalog
                </h3>
                <p className="text-xs text-stone-500">
                  Edit prices, visit limits, and descriptions live without code modifications.
                </p>
              </div>

              <button
                onClick={() => {
                  const newP: MaintenancePlan = {
                    id: `plan_custom_${Date.now()}`,
                    title: 'New Commercial Package',
                    titleHi: 'नया पैकेज',
                    planType: 'AMC',
                    target: 'commercial',
                    tier: 'smart',
                    priceMonthly: 5999,
                    priceAnnual: 64990,
                    visitLimitAnnual: 50,
                    emergencySupport: true,
                    priorityResponseHours: 4,
                    description: 'Custom facility package.',
                    descriptionHi: 'कस्टम पैकेज',
                    features: ['Preventive inspection', 'Quarterly servicing'],
                    featuresHi: ['प्रिवेंटिव निरीक्षण'],
                    categoriesIncluded: ['plumbing', 'electrical'],
                    active: true
                  };
                  setPlans([...plans, newP]);
                }}
                className="px-3.5 py-1.5 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-bold flex items-center gap-1.5 cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Create New Plan</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {plans.map(p => (
                <div key={p.id} className="bg-white p-5 rounded-2xl border border-stone-200 shadow-xs space-y-3 flex flex-col justify-between">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold text-red-600 uppercase tracking-wider">
                        {p.planType} &bull; {p.target}
                      </span>
                      <span className="text-[10px] bg-stone-100 text-stone-700 px-2 py-0.5 rounded font-bold">
                        {p.visitLimitAnnual} visits/yr
                      </span>
                    </div>

                    <h4 className="text-sm font-bold text-stone-900">{p.title}</h4>
                    <p className="text-xs text-stone-500 line-clamp-2">{p.description}</p>

                    <div className="bg-stone-50 p-2.5 rounded-xl font-mono text-xs text-stone-800 space-y-0.5">
                      <div>Monthly: <strong>₹{p.priceMonthly}</strong></div>
                      <div>Annual: <strong>₹{p.priceAnnual}</strong></div>
                      <div className="text-[11px] text-emerald-700 font-sans">
                        {p.emergencySupport ? `✓ ${p.priorityResponseHours}h Emergency SLA` : 'Standard SLA'}
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => setEditingPlan(p)}
                    className="w-full py-2 bg-stone-100 hover:bg-stone-200 text-stone-800 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 cursor-pointer transition-colors"
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                    <span>Edit Plan &amp; Pricing</span>
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 5: CRM LEADS */}
        {/* ========================================================================= */}
        {activeAdminTab === 'crm' && (
          <div className="space-y-4">
            <h3 className="text-base font-bold text-stone-900">
              Maintenance Plan Inbound Leads ({crmLeads.length})
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {crmLeads.map(lead => (
                <div key={lead.id} className="bg-white p-5 rounded-2xl border border-stone-200 shadow-xs space-y-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="text-sm font-bold text-stone-900">{lead.name}</h4>
                      <p className="text-xs text-stone-600">{lead.propertyOrBusiness}</p>
                      <span className="text-[11px] text-stone-500">{lead.phone} &bull; {lead.email}</span>
                    </div>

                    <span className="px-2 py-0.5 rounded-full bg-red-100 text-red-800 text-[10px] font-bold uppercase">
                      {lead.stage.replace('_', ' ')}
                    </span>
                  </div>

                  <div className="p-3 bg-stone-50 rounded-xl text-xs text-stone-600 space-y-1">
                    <div><strong>Estimated Value:</strong> ₹{lead.estimatedValue.toLocaleString('en-IN')}</div>
                    <div><strong>Assigned Agent:</strong> {lead.assignedAgent}</div>
                    <div className="text-[11px] text-stone-500 italic mt-1">"{lead.notes}"</div>
                  </div>

                  <div className="flex items-center gap-2 pt-1">
                    <button
                      onClick={() => {
                        window.open(`https://wa.me/${lead.phone.replace(/[^0-9]/g, '')}?text=Hello%20${encodeURIComponent(lead.name)},%20this%20is%20Gharkasathi%20regarding%20your%20property%20maintenance%20proposal.`, '_blank');
                      }}
                      className="px-3 py-1.5 rounded-lg bg-emerald-600 text-white text-xs font-bold hover:bg-emerald-700 cursor-pointer"
                    >
                      Follow up on WhatsApp
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 6: DYNAMIC PRICING RULES */}
        {/* ========================================================================= */}
        {activeAdminTab === 'pricing' && (
          <div className="space-y-6 max-w-2xl">
            <div>
              <h3 className="text-base font-bold text-stone-900">
                Dynamic Pricing Engine Configuration
              </h3>
              <p className="text-xs text-stone-500">
                These rules calculate live proposals in the customer-facing builder.
              </p>
            </div>

            <div className="bg-stone-50 p-6 rounded-3xl border border-stone-200 space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-stone-700 mb-1">
                    Base Residential Monthly Fee (₹):
                  </label>
                  <input
                    type="number"
                    value={pricingRules.baseResidentialMonthly}
                    onChange={(e) => setPricingRules({ ...pricingRules, baseResidentialMonthly: Number(e.target.value) })}
                    className="w-full p-2 bg-white border border-stone-300 rounded-xl text-stone-900"
                  />
                </div>

                <div>
                  <label className="block font-bold text-stone-700 mb-1">
                    Base Commercial Sq.Ft Annual Rate (₹):
                  </label>
                  <input
                    type="number"
                    value={pricingRules.baseCommercialPerSqftAnnual}
                    onChange={(e) => setPricingRules({ ...pricingRules, baseCommercialPerSqftAnnual: Number(e.target.value) })}
                    className="w-full p-2 bg-white border border-stone-300 rounded-xl text-stone-900"
                  />
                </div>

                <div>
                  <label className="block font-bold text-stone-700 mb-1">
                    GST Rate (%):
                  </label>
                  <input
                    type="number"
                    value={pricingRules.gstRatePercent}
                    onChange={(e) => setPricingRules({ ...pricingRules, gstRatePercent: Number(e.target.value) })}
                    className="w-full p-2 bg-white border border-stone-300 rounded-xl text-stone-900"
                  />
                </div>

                <div>
                  <label className="block font-bold text-stone-700 mb-1">
                    Annual Advance Discount (%):
                  </label>
                  <input
                    type="number"
                    value={pricingRules.annualAdvanceDiscountPercent}
                    onChange={(e) => setPricingRules({ ...pricingRules, annualAdvanceDiscountPercent: Number(e.target.value) })}
                    className="w-full p-2 bg-white border border-stone-300 rounded-xl text-stone-900"
                  />
                </div>
              </div>

              <div className="pt-4 border-t border-stone-200 flex justify-end">
                <button
                  onClick={() => {
                    localStorage.setItem('gks_admin_pricing_rules', JSON.stringify(pricingRules));
                    alert('Pricing rules updated successfully!');
                  }}
                  className="px-5 py-2.5 bg-red-600 hover:bg-red-700 text-white rounded-xl font-bold cursor-pointer shadow-xs"
                >
                  Save Global Pricing Rules
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Edit Plan Modal */}
      {editingPlan && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white rounded-3xl p-6 max-w-lg w-full space-y-4 border border-stone-200">
            <h4 className="text-base font-bold text-stone-900">
              Edit Plan: {editingPlan.title}
            </h4>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-stone-700 mb-1">Plan Title:</label>
                <input
                  type="text"
                  value={editingPlan.title}
                  onChange={(e) => setEditingPlan({ ...editingPlan, title: e.target.value })}
                  className="w-full p-2 border border-stone-300 rounded-lg"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block font-bold text-stone-700 mb-1">Monthly Price (₹):</label>
                  <input
                    type="number"
                    value={editingPlan.priceMonthly}
                    onChange={(e) => setEditingPlan({ ...editingPlan, priceMonthly: Number(e.target.value) })}
                    className="w-full p-2 border border-stone-300 rounded-lg"
                  />
                </div>

                <div>
                  <label className="block font-bold text-stone-700 mb-1">Annual Price (₹):</label>
                  <input
                    type="number"
                    value={editingPlan.priceAnnual}
                    onChange={(e) => setEditingPlan({ ...editingPlan, priceAnnual: Number(e.target.value) })}
                    className="w-full p-2 border border-stone-300 rounded-lg"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-stone-700 mb-1">Annual Visit Limit:</label>
                <input
                  type="number"
                  value={editingPlan.visitLimitAnnual}
                  onChange={(e) => setEditingPlan({ ...editingPlan, visitLimitAnnual: Number(e.target.value) })}
                  className="w-full p-2 border border-stone-300 rounded-lg"
                />
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => setEditingPlan(null)}
                className="px-4 py-2 border rounded-xl font-bold text-xs"
              >
                Cancel
              </button>
              <button
                onClick={() => handleSavePlanEdits(editingPlan)}
                className="px-5 py-2 bg-red-600 text-white rounded-xl font-bold text-xs"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
