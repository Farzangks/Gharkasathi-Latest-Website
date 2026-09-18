import React, { useState, useEffect } from 'react';
import { 
  X, 
  Building2, 
  Home, 
  Briefcase, 
  Sparkles, 
  ShieldCheck, 
  Clock, 
  CheckCircle2, 
  ArrowRight, 
  Calculator, 
  FileText, 
  Wrench, 
  AlertTriangle, 
  Plus, 
  Calendar, 
  Layers, 
  Download, 
  RotateCw, 
  Phone, 
  Mail, 
  MapPin, 
  Sliders, 
  ChevronRight,
  Tv,
  Zap,
  Hammer,
  Wind,
  ShieldAlert,
  Paintbrush,
  Flower2,
  Globe2,
  Search
} from 'lucide-react';

import { 
  MaintenancePlan, 
  MaintenanceContract, 
  MaintenanceServiceRequest, 
  CustomPlanBuilderState,
  QuotationSummary,
  CommercialAsset,
  BusinessLocation,
  MaintenanceCategoryKey,
  MaintenanceFrequency,
  ResidentialPropertyType,
  CommercialBusinessType
} from '../../types/maintenance';
import { 
  DEFAULT_MAINTENANCE_PLANS, 
  MAINTENANCE_CATEGORIES, 
  MAINTENANCE_SERVICES_CATALOG,
  DEFAULT_PRICING_RULES
} from '../../data/maintenanceCatalog';
import { calculateCustomPlanPricing, createContractFromQuote } from '../../utils/maintenancePricing';
import { getMaintenanceText, LanguageCode } from '../../utils/maintenanceTranslations';
import { MaintenanceQuotationModal } from './MaintenanceQuotationModal';
import { RaiseServiceRequestModal } from './RaiseServiceRequestModal';
import { GharkasathiLogo, GharkasathiEmblem } from '../GharkasathiLogo';

interface CareMaintenanceModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialTab?: 'explore' | 'builder' | 'dashboard' | 'assets';
  initialTarget?: 'residential' | 'commercial';
}

export const CareMaintenanceModal: React.FC<CareMaintenanceModalProps> = ({
  isOpen,
  onClose,
  initialTab = 'explore',
  initialTarget = 'residential'
}) => {
  const [lang, setLang] = useState<LanguageCode>('en');
  const [activeTab, setActiveTab] = useState<'explore' | 'builder' | 'dashboard' | 'assets'>(initialTab);
  const [targetType, setTargetType] = useState<'residential' | 'commercial'>(initialTarget);
  
  // Custom Plan Builder State
  const [builderState, setBuilderState] = useState<CustomPlanBuilderState>({
    target: initialTarget,
    propertyType: initialTarget === 'residential' ? 'Apartment' : 'Restaurant',
    bedrooms: 3,
    bathrooms: 2,
    floors: 1,
    occupants: 4,
    areaSqft: initialTarget === 'residential' ? 1450 : 2200,
    businessName: '',
    kitchensCount: 1,
    washroomsCount: 2,
    operatingHours: '10:00 AM - 11:00 PM',
    contactPerson: '',
    phone: '',
    email: '',
    address: 'Raipur, Chhattisgarh',
    city: 'Raipur',
    selectedPlanType: initialTarget === 'residential' ? 'HMC' : 'AMC',
    selectedCategories: ['plumbing', 'electrical', 'appliances', 'pest_control'],
    selectedServices: ['plumb_tap_repair', 'elec_switch_socket', 'app_ac_service', 'pest_cockroach_ant'],
    categoryFrequencies: {
      plumbing: 'monthly',
      electrical: 'quarterly',
      carpentry: 'quarterly',
      appliances: 'quarterly',
      hvac: 'monthly',
      cleaning: 'quarterly',
      pest_control: 'monthly',
      painting_civil: 'half-yearly',
      gardening: 'fortnightly'
    },
    contractDurationMonths: 12,
    emergencySupport: true,
    priorityResponse: 'express_4hr',
    paymentFrequency: 'annual'
  });

  // Quotation & Contract state
  const [currentQuote, setCurrentQuote] = useState<QuotationSummary | null>(null);
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);
  const [isRequestModalOpen, setIsRequestModalOpen] = useState(false);
  const [activeContractForRequest, setActiveContractForRequest] = useState<MaintenanceContract | null>(null);

  // Active Contracts in LocalStorage
  const [userContracts, setUserContracts] = useState<MaintenanceContract[]>(() => {
    const saved = localStorage.getItem('gks_user_maintenance_contracts');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { }
    }
    // Seed one starter active contract for immediate demonstration
    return [
      {
        id: 'contract_smart_01',
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
        servicesCovered: [
          'AC Jet-Wash Servicing (2 visits)',
          'Plumbing & Tap Overhaul',
          'Electrical MCB Audit',
          'Quarterly Pest Control',
          'Water Tank UV Cleaning'
        ],
        categoriesCovered: ['plumbing', 'electrical', 'appliances', 'pest_control'],
        visitsTotal: 36,
        visitsUsed: 14,
        emergencySupport: true,
        responseSlaHours: 4,
        digitalAcceptedByCustomer: true,
        adminApproved: true,
        autoRenewal: true,
        createdAt: '2026-03-01T10:00:00Z'
      }
    ];
  });

  // Save contracts to localStorage
  useEffect(() => {
    localStorage.setItem('gks_user_maintenance_contracts', JSON.stringify(userContracts));
  }, [userContracts]);

  // Commercial Assets
  const [assets, setAssets] = useState<CommercialAsset[]>([
    {
      id: 'ast_01',
      businessName: 'The Urban Bistro & Café',
      branchLocation: 'VIP Road, Raipur',
      category: 'AC Cassette',
      brand: 'Daikin 3.0 Ton',
      model: 'FCQ-100',
      serialNumber: 'DK-2024-9982-C',
      installationDate: '2024-05-10',
      warrantyStatus: 'extended_amc',
      nextServiceDue: '2026-10-15',
      serviceHistoryCount: 6
    },
    {
      id: 'ast_02',
      businessName: 'The Urban Bistro & Café',
      branchLocation: 'VIP Road, Raipur',
      category: 'Deep Freezer',
      brand: 'Blue Star 500L',
      model: 'CHF-500',
      serialNumber: 'BS-FRZ-8819',
      installationDate: '2023-11-20',
      warrantyStatus: 'extended_amc',
      nextServiceDue: '2026-09-30',
      serviceHistoryCount: 8
    },
    {
      id: 'ast_03',
      businessName: 'The Urban Bistro & Café',
      branchLocation: 'VIP Road, Raipur',
      category: 'Commercial RO System',
      brand: 'Kent Commercial 50 LPH',
      model: 'Elite Plus',
      serialNumber: 'KT-RO-4421',
      installationDate: '2024-01-15',
      warrantyStatus: 'extended_amc',
      nextServiceDue: '2026-10-05',
      serviceHistoryCount: 5
    }
  ]);

  // Live calculation of builder quote
  const liveQuote = calculateCustomPlanPricing(builderState);

  // Sync builder target when toggled
  const handleToggleTarget = (target: 'residential' | 'commercial') => {
    setTargetType(target);
    setBuilderState(prev => ({
      ...prev,
      target,
      selectedPlanType: target === 'residential' ? 'HMC' : 'AMC',
      propertyType: target === 'residential' ? 'Apartment' : 'Restaurant'
    }));
  };

  const handleGenerateProposal = () => {
    const quote = calculateCustomPlanPricing(builderState);
    setCurrentQuote(quote);
    setIsQuoteModalOpen(true);
  };

  const handleProceedToContractFromQuote = (quote: QuotationSummary) => {
    const contract = createContractFromQuote(quote, builderState);
    setUserContracts(prev => [contract, ...prev]);
    setIsQuoteModalOpen(false);
    setActiveTab('dashboard');
  };

  const handleSelectPrePackagedPlan = (plan: MaintenancePlan) => {
    // Populate builder state with this plan
    setBuilderState(prev => ({
      ...prev,
      target: plan.target,
      selectedPlanType: plan.planType,
      selectedCategories: plan.categoriesIncluded,
      emergencySupport: plan.emergencySupport,
      priorityResponse: plan.priorityResponseHours <= 2 ? 'rapid_2hr' : (plan.priorityResponseHours <= 4 ? 'express_4hr' : 'standard')
    }));
    setActiveTab('builder');
  };

  const handleOpenRaiseRequest = (contract: MaintenanceContract) => {
    setActiveContractForRequest(contract);
    setIsRequestModalOpen(true);
  };

  const handleSubmitServiceRequest = (req: Partial<MaintenanceServiceRequest>) => {
    // Deduct 1 visit from active contract
    if (activeContractForRequest) {
      setUserContracts(prev => prev.map(c => {
        if (c.id === activeContractForRequest.id) {
          return {
            ...c,
            visitsUsed: Math.min(c.visitsTotal, c.visitsUsed + 1)
          };
        }
        return c;
      }));
    }
  };

  const t = (key: Parameters<typeof getMaintenanceText>[0]) => getMaintenanceText(key, lang);

  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 bg-black/80 backdrop-blur-xs overflow-y-auto animate-fadeIn">
        <div className="bg-white rounded-3xl shadow-2xl max-w-6xl w-full my-auto overflow-hidden border border-stone-200 text-stone-900 flex flex-col max-h-[96vh]">
          {/* Top Bar: Brand, Language Toggle & Tabs */}
          <div className="bg-stone-950 text-white px-6 py-4 flex flex-wrap items-center justify-between gap-4 border-b border-stone-800 shrink-0">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-red-600 flex items-center justify-center p-1 shadow-xs">
                <GharkasathiEmblem className="w-5 h-5 text-white" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-black text-sm text-white tracking-tight">
                    GHARKASATHI CARE &amp; MAINTENANCE
                  </span>
                  <span className="text-[10px] bg-red-950 text-red-400 font-extrabold px-2 py-0.5 rounded border border-red-800">
                    {targetType === 'residential' ? 'HMC PORTAL' : 'AMC & QMC PORTAL'}
                  </span>
                </div>
                <p className="text-[11px] text-stone-400 hidden sm:block">
                  {t('protect_subtitle')}
                </p>
              </div>
            </div>

            {/* Language & Actions */}
            <div className="flex items-center gap-2">
              {/* Language Switcher */}
              <div className="flex items-center bg-stone-900 p-1 rounded-xl border border-stone-800 text-xs">
                <button
                  onClick={() => setLang('en')}
                  className={`px-2.5 py-1 rounded-lg font-bold transition-colors cursor-pointer ${
                    lang === 'en' ? 'bg-red-600 text-white' : 'text-stone-400 hover:text-white'
                  }`}
                >
                  English
                </button>
                <button
                  onClick={() => setLang('hi')}
                  className={`px-2.5 py-1 rounded-lg font-bold transition-colors cursor-pointer ${
                    lang === 'hi' ? 'bg-red-600 text-white' : 'text-stone-400 hover:text-white'
                  }`}
                >
                  हिंदी
                </button>
              </div>

              <button
                onClick={onClose}
                className="p-2 rounded-xl hover:bg-stone-800 text-stone-400 hover:text-white transition-colors cursor-pointer"
                title="Close Modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Sub-Navigation Navigation Bar */}
          <div className="bg-stone-100 border-b border-stone-200 px-6 py-2.5 flex flex-wrap items-center justify-between gap-3 text-xs shrink-0">
            {/* Main Tabs */}
            <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
              <button
                onClick={() => setActiveTab('explore')}
                className={`px-3.5 py-2 rounded-xl font-bold flex items-center gap-1.5 transition-all cursor-pointer whitespace-nowrap ${
                  activeTab === 'explore'
                    ? 'bg-white text-red-600 shadow-xs border border-stone-200'
                    : 'text-stone-600 hover:text-stone-900 hover:bg-stone-200/60'
                }`}
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>{t('explore_plans')}</span>
              </button>

              <button
                onClick={() => setActiveTab('builder')}
                className={`px-3.5 py-2 rounded-xl font-bold flex items-center gap-1.5 transition-all cursor-pointer whitespace-nowrap ${
                  activeTab === 'builder'
                    ? 'bg-red-600 text-white shadow-xs'
                    : 'text-stone-600 hover:text-stone-900 hover:bg-stone-200/60'
                }`}
              >
                <Calculator className="w-3.5 h-3.5" />
                <span>{t('build_your_plan')}</span>
              </button>

              <button
                onClick={() => setActiveTab('dashboard')}
                className={`px-3.5 py-2 rounded-xl font-bold flex items-center gap-1.5 transition-all cursor-pointer whitespace-nowrap ${
                  activeTab === 'dashboard'
                    ? 'bg-white text-stone-900 shadow-xs border border-stone-200'
                    : 'text-stone-600 hover:text-stone-900 hover:bg-stone-200/60'
                }`}
              >
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>{t('my_plans')}</span>
                {userContracts.length > 0 && (
                  <span className="w-4 h-4 rounded-full bg-emerald-600 text-white text-[10px] flex items-center justify-center font-bold">
                    {userContracts.length}
                  </span>
                )}
              </button>

              <button
                onClick={() => setActiveTab('assets')}
                className={`px-3.5 py-2 rounded-xl font-bold flex items-center gap-1.5 transition-all cursor-pointer whitespace-nowrap ${
                  activeTab === 'assets'
                    ? 'bg-white text-stone-900 shadow-xs border border-stone-200'
                    : 'text-stone-600 hover:text-stone-900 hover:bg-stone-200/60'
                }`}
              >
                <Layers className="w-3.5 h-3.5 text-stone-700" />
                <span>Commercial Assets &amp; Branches</span>
              </button>
            </div>

            {/* Target Switcher (Residential vs Commercial) */}
            <div className="flex items-center bg-stone-200/80 p-1 rounded-xl border border-stone-300/60">
              <button
                onClick={() => handleToggleTarget('residential')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-bold text-xs transition-all cursor-pointer ${
                  targetType === 'residential'
                    ? 'bg-white text-red-600 shadow-xs'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                <Home className="w-3.5 h-3.5" />
                <span>{t('residential')} (HMC)</span>
              </button>
              <button
                onClick={() => handleToggleTarget('commercial')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-bold text-xs transition-all cursor-pointer ${
                  targetType === 'commercial'
                    ? 'bg-white text-red-600 shadow-xs'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                <Briefcase className="w-3.5 h-3.5" />
                <span>{t('commercial')} (AMC / QMC)</span>
              </button>
            </div>
          </div>

          {/* Modal Content Body */}
          <div className="p-6 sm:p-8 overflow-y-auto space-y-8 flex-1 bg-stone-50/40">
            {/* ========================================================================= */}
            {/* TAB 1: EXPLORE PRE-PACKAGED PLANS */}
            {/* ========================================================================= */}
            {activeTab === 'explore' && (
              <div className="space-y-8">
                {/* Section Hero Banner */}
                <div className="bg-stone-900 text-white rounded-3xl p-6 sm:p-8 relative overflow-hidden shadow-md">
                  <div className="max-w-2xl space-y-2 relative z-10">
                    <span className="text-[11px] font-bold text-red-400 uppercase tracking-wider block">
                      {targetType === 'residential' ? 'Home Maintenance Contract (HMC)' : 'Commercial Facility Management'}
                    </span>
                    <h2 className="text-xl sm:text-3xl font-black tracking-tight text-white">
                      {targetType === 'residential'
                        ? 'One Partner for All Your Home Repairs & Upkeep.'
                        : 'One Partner. Multiple Commercial Maintenance Services.'}
                    </h2>
                    <p className="text-xs sm:text-sm text-stone-300 leading-relaxed">
                      {targetType === 'residential'
                        ? 'Say goodbye to chasing random handymen. Get verified technicians, scheduled seasonal servicing and guaranteed emergency response under a single subscription.'
                        : 'Eliminate the headache of managing 10 different contractors for HVAC, plumbing, kitchen grease, deep freezers, pest control and electrical. Gharkasathi coordinates it all.'}
                    </p>

                    <div className="pt-2 flex flex-wrap items-center gap-3">
                      <button
                        onClick={() => setActiveTab('builder')}
                        className="px-5 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-xs shadow-md shadow-red-600/30 flex items-center gap-2 cursor-pointer transition-colors"
                      >
                        <Calculator className="w-4 h-4" />
                        <span>{t('build_your_plan')}</span>
                      </button>

                      <div className="text-[11px] text-stone-400 flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                        <span>Certified Gharkasathi Partners &bull; 100% Labour Warranty</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Plan Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {DEFAULT_MAINTENANCE_PLANS
                    .filter(p => p.target === targetType)
                    .map(plan => {
                      return (
                        <div
                          key={plan.id}
                          className={`bg-white rounded-3xl p-6 border transition-all flex flex-col justify-between relative shadow-xs hover:shadow-md ${
                            plan.popular 
                              ? 'border-red-500 ring-2 ring-red-500/20' 
                              : 'border-stone-200'
                          }`}
                        >
                          {plan.badge && (
                            <span className="absolute -top-3 left-6 px-3 py-0.5 rounded-full bg-red-600 text-white text-[10px] font-black uppercase tracking-wider shadow-sm">
                              {plan.badge}
                            </span>
                          )}

                          <div className="space-y-4">
                            <div>
                              <span className="text-[10px] font-bold text-stone-400 uppercase tracking-wider block">
                                {plan.planType} Plan
                              </span>
                              <h3 className="text-lg font-black text-stone-900 mt-0.5">
                                {lang === 'hi' ? plan.titleHi : plan.title}
                              </h3>
                              <p className="text-xs text-stone-500 mt-1 leading-relaxed">
                                {lang === 'hi' ? plan.descriptionHi : plan.description}
                              </p>
                            </div>

                            {/* Pricing */}
                            <div className="p-4 rounded-2xl bg-stone-50 border border-stone-100">
                              <div className="flex items-baseline gap-1">
                                <span className="text-2xl font-black text-stone-900 font-mono">
                                  ₹{plan.priceMonthly.toLocaleString('en-IN')}
                                </span>
                                <span className="text-xs text-stone-500 font-medium">{t('per_month')}</span>
                              </div>
                              <div className="text-[11px] text-emerald-700 font-semibold mt-1">
                                ₹{plan.priceAnnual.toLocaleString('en-IN')}{t('per_year')} ({t('save_15_percent')})
                              </div>
                            </div>

                            {/* Key Highlights */}
                            <div className="space-y-2">
                              <span className="text-[11px] font-bold text-stone-700 block">
                                {t('included_features')}
                              </span>
                              <ul className="space-y-2 text-xs text-stone-600">
                                {(lang === 'hi' ? plan.featuresHi : plan.features).map((feat, idx) => (
                                  <li key={idx} className="flex items-start gap-2">
                                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                                    <span>{feat}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>

                          {/* Action Button */}
                          <div className="pt-6 mt-4 border-t border-stone-100">
                            <button
                              onClick={() => handleSelectPrePackagedPlan(plan)}
                              className={`w-full py-2.5 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                                plan.popular
                                  ? 'bg-red-600 hover:bg-red-700 text-white shadow-sm shadow-red-600/30'
                                  : 'bg-stone-900 hover:bg-black text-white'
                              }`}
                            >
                              <span>Customize &amp; Book</span>
                              <ArrowRight className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      );
                    })}
                </div>

                {/* Custom Builder Banner */}
                <div className="bg-red-50 border border-red-200 rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Sliders className="w-5 h-5 text-red-600" />
                      <h3 className="text-base sm:text-lg font-black text-red-950">
                        Need Custom Frequencies for Pest Control, AC or Deep Cleaning?
                      </h3>
                    </div>
                    <p className="text-xs text-red-900/80 max-w-2xl leading-relaxed">
                      Every property is unique. Use our dynamic multi-category Plan Builder to choose monthly pest control, quarterly AC servicing, bi-weekly gardening, and rapid 2-hour breakdown support with automated pricing.
                    </p>
                  </div>

                  <button
                    onClick={() => setActiveTab('builder')}
                    className="px-6 py-3 rounded-2xl bg-red-600 hover:bg-red-700 text-white font-black text-xs shadow-md shadow-red-600/30 shrink-0 cursor-pointer flex items-center gap-2"
                  >
                    <span>Open Custom Plan Builder</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* ========================================================================= */}
            {/* TAB 2: INTERACTIVE CUSTOM PLAN BUILDER */}
            {/* ========================================================================= */}
            {activeTab === 'builder' && (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left 2 Columns: Multi-step Configuration Controls */}
                <div className="lg:col-span-2 space-y-6">
                  {/* Step 1: Target & Property Type */}
                  <div className="bg-white p-6 rounded-3xl border border-stone-200 shadow-xs space-y-4">
                    <div className="flex items-center justify-between border-b border-stone-100 pb-3">
                      <span className="text-xs font-bold text-stone-800 uppercase tracking-wider flex items-center gap-1.5">
                        <Building2 className="w-4 h-4 text-red-600" />
                        <span>Step 1: Property Type &amp; Specifications</span>
                      </span>
                      <span className="text-[11px] text-stone-500 font-mono">
                        Target: {targetType.toUpperCase()}
                      </span>
                    </div>

                    {/* Property Type Grid */}
                    <div>
                      <label className="block text-xs font-bold text-stone-700 mb-2">
                        {targetType === 'residential' ? 'Select Home Architecture:' : 'Select Business Category:'}
                      </label>
                      <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                        {(targetType === 'residential'
                          ? ['Apartment', 'Flat', 'Independent House', 'Villa', 'Duplex', 'Bungalow', 'Other']
                          : ['Café', 'Restaurant', 'Cloud Kitchen', 'Hotel', 'Office', 'Gym', 'Hospital', 'School', 'Housing Society', 'Warehouse', 'Commercial Building', 'Other']
                        ).map((typeStr) => (
                          <button
                            key={typeStr}
                            onClick={() => setBuilderState(prev => ({ ...prev, propertyType: typeStr as any }))}
                            className={`p-2.5 rounded-xl border text-xs font-bold text-left transition-all cursor-pointer ${
                              builderState.propertyType === typeStr
                                ? 'bg-red-50 border-red-600 text-red-950 shadow-xs'
                                : 'bg-white border-stone-200 text-stone-700 hover:border-stone-300'
                            }`}
                          >
                            {typeStr}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Property Quantitative Metrics */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
                      <div>
                        <label className="block text-[11px] font-bold text-stone-600 mb-1">
                          Built-up Area (Sq.Ft):
                        </label>
                        <input
                          type="number"
                          value={builderState.areaSqft}
                          onChange={(e) => setBuilderState(prev => ({ ...prev, areaSqft: Number(e.target.value) || 1000 }))}
                          className="w-full p-2 bg-stone-50 border border-stone-300 rounded-xl text-xs font-mono text-stone-900 outline-none"
                        />
                      </div>

                      {targetType === 'residential' ? (
                        <>
                          <div>
                            <label className="block text-[11px] font-bold text-stone-600 mb-1">
                              Bedrooms (BHK):
                            </label>
                            <select
                              value={builderState.bedrooms}
                              onChange={(e) => setBuilderState(prev => ({ ...prev, bedrooms: Number(e.target.value) }))}
                              className="w-full p-2 bg-stone-50 border border-stone-300 rounded-xl text-xs text-stone-900 outline-none"
                            >
                              {[1, 2, 3, 4, 5, 6].map(n => (
                                <option key={n} value={n}>{n} BHK</option>
                              ))}
                            </select>
                          </div>

                          <div>
                            <label className="block text-[11px] font-bold text-stone-600 mb-1">
                              Bathrooms:
                            </label>
                            <select
                              value={builderState.bathrooms}
                              onChange={(e) => setBuilderState(prev => ({ ...prev, bathrooms: Number(e.target.value) }))}
                              className="w-full p-2 bg-stone-50 border border-stone-300 rounded-xl text-xs text-stone-900 outline-none"
                            >
                              {[1, 2, 3, 4, 5, 6, 8].map(n => (
                                <option key={n} value={n}>{n} Baths</option>
                              ))}
                            </select>
                          </div>

                          <div>
                            <label className="block text-[11px] font-bold text-stone-600 mb-1">
                              Floors:
                            </label>
                            <select
                              value={builderState.floors}
                              onChange={(e) => setBuilderState(prev => ({ ...prev, floors: Number(e.target.value) }))}
                              className="w-full p-2 bg-stone-50 border border-stone-300 rounded-xl text-xs text-stone-900 outline-none"
                            >
                              {[1, 2, 3, 4].map(n => (
                                <option key={n} value={n}>{n} Floor(s)</option>
                              ))}
                            </select>
                          </div>
                        </>
                      ) : (
                        <>
                          <div>
                            <label className="block text-[11px] font-bold text-stone-600 mb-1">
                              Commercial Kitchens:
                            </label>
                            <select
                              value={builderState.kitchensCount}
                              onChange={(e) => setBuilderState(prev => ({ ...prev, kitchensCount: Number(e.target.value) }))}
                              className="w-full p-2 bg-stone-50 border border-stone-300 rounded-xl text-xs text-stone-900 outline-none"
                            >
                              {[0, 1, 2, 3, 4].map(n => (
                                <option key={n} value={n}>{n} Kitchen(s)</option>
                              ))}
                            </select>
                          </div>

                          <div>
                            <label className="block text-[11px] font-bold text-stone-600 mb-1">
                              Restrooms / Washrooms:
                            </label>
                            <select
                              value={builderState.washroomsCount}
                              onChange={(e) => setBuilderState(prev => ({ ...prev, washroomsCount: Number(e.target.value) }))}
                              className="w-full p-2 bg-stone-50 border border-stone-300 rounded-xl text-xs text-stone-900 outline-none"
                            >
                              {[1, 2, 3, 4, 6, 8, 12].map(n => (
                                <option key={n} value={n}>{n} Washrooms</option>
                              ))}
                            </select>
                          </div>

                          <div>
                            <label className="block text-[11px] font-bold text-stone-600 mb-1">
                              Floors:
                            </label>
                            <select
                              value={builderState.floors}
                              onChange={(e) => setBuilderState(prev => ({ ...prev, floors: Number(e.target.value) }))}
                              className="w-full p-2 bg-stone-50 border border-stone-300 rounded-xl text-xs text-stone-900 outline-none"
                            >
                              {[1, 2, 3, 5, 10].map(n => (
                                <option key={n} value={n}>{n} Floor(s)</option>
                              ))}
                            </select>
                          </div>
                        </>
                      )}
                    </div>
                  </div>

                  {/* Step 2: Select Service Categories & Independent Frequencies */}
                  <div className="bg-white p-6 rounded-3xl border border-stone-200 shadow-xs space-y-4">
                    <div className="flex items-center justify-between border-b border-stone-100 pb-3">
                      <span className="text-xs font-bold text-stone-800 uppercase tracking-wider flex items-center gap-1.5">
                        <Wrench className="w-4 h-4 text-red-600" />
                        <span>Step 2: Service Categories &amp; Custom Frequencies</span>
                      </span>
                      <span className="text-[11px] text-emerald-700 font-bold">
                        {builderState.selectedCategories.length} Categories Selected
                      </span>
                    </div>

                    <p className="text-xs text-stone-500">
                      Configure different visit frequencies for each category. For example: Pest Control monthly, AC quarterly, and Electrical quarterly.
                    </p>

                    <div className="space-y-3">
                      {MAINTENANCE_CATEGORIES.map((cat) => {
                        const isSelected = builderState.selectedCategories.includes(cat.key);
                        const currentFreq = builderState.categoryFrequencies[cat.key] || 'quarterly';

                        return (
                          <div
                            key={cat.key}
                            className={`p-4 rounded-2xl border transition-all ${
                              isSelected 
                                ? 'bg-white border-red-300 shadow-xs' 
                                : 'bg-stone-50/60 border-stone-200 opacity-80'
                            }`}
                          >
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                              <div className="flex items-center gap-3">
                                <input
                                  type="checkbox"
                                  checked={isSelected}
                                  onChange={(e) => {
                                    if (e.target.checked) {
                                      setBuilderState(prev => ({
                                        ...prev,
                                        selectedCategories: [...prev.selectedCategories, cat.key]
                                      }));
                                    } else {
                                      setBuilderState(prev => ({
                                        ...prev,
                                        selectedCategories: prev.selectedCategories.filter(k => k !== cat.key)
                                      }));
                                    }
                                  }}
                                  className="w-4 h-4 text-red-600 rounded border-stone-300 focus:ring-red-500 cursor-pointer"
                                />
                                <div>
                                  <span className="font-bold text-xs text-stone-900 block">
                                    {cat.label}
                                  </span>
                                  <span className="text-[11px] text-stone-500 line-clamp-1">
                                    {cat.description}
                                  </span>
                                </div>
                              </div>

                              {/* Category Frequency Dropdown */}
                              {isSelected && (
                                <div className="flex items-center gap-2 pl-7 sm:pl-0">
                                  <span className="text-[11px] text-stone-500 font-medium">Frequency:</span>
                                  <select
                                    value={currentFreq}
                                    onChange={(e) => {
                                      const newFreq = e.target.value as MaintenanceFrequency;
                                      setBuilderState(prev => ({
                                        ...prev,
                                        categoryFrequencies: {
                                          ...prev.categoryFrequencies,
                                          [cat.key]: newFreq
                                        }
                                      }));
                                    }}
                                    className="p-1.5 bg-stone-100 border border-stone-300 rounded-lg text-xs font-bold text-stone-800 outline-none"
                                  >
                                    <option value="weekly">Weekly (52 visits/yr)</option>
                                    <option value="fortnightly">Fortnightly (24 visits/yr)</option>
                                    <option value="monthly">Monthly (12 visits/yr)</option>
                                    <option value="bi-monthly">Bi-Monthly (6 visits/yr)</option>
                                    <option value="quarterly">Quarterly (4 visits/yr)</option>
                                    <option value="half-yearly">Half-Yearly (2 visits/yr)</option>
                                    <option value="annual">Annual (1 visit/yr)</option>
                                  </select>
                                </div>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Step 3: Emergency Breakdown SLA & Duration */}
                  <div className="bg-white p-6 rounded-3xl border border-stone-200 shadow-xs space-y-4">
                    <span className="text-xs font-bold text-stone-800 uppercase tracking-wider flex items-center gap-1.5 border-b border-stone-100 pb-3">
                      <ShieldAlert className="w-4 h-4 text-red-600" />
                      <span>Step 3: Response SLA &amp; Contract Duration</span>
                    </span>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      {/* Emergency Breakdown Support */}
                      <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200 flex flex-col justify-between">
                        <div>
                          <span className="font-bold text-xs text-stone-900 block">
                            24/7 Emergency Support
                          </span>
                          <p className="text-[11px] text-stone-500 mt-1">
                            Critical breakdowns for pipelines, main MCBs or AC compressors.
                          </p>
                        </div>
                        <div className="mt-3 flex items-center gap-2">
                          <input
                            type="checkbox"
                            checked={builderState.emergencySupport}
                            onChange={(e) => setBuilderState(prev => ({ ...prev, emergencySupport: e.target.checked }))}
                            className="w-4 h-4 text-red-600 rounded border-stone-300 focus:ring-red-500 cursor-pointer"
                          />
                          <span className="text-xs font-bold text-stone-800">
                            {builderState.emergencySupport ? 'Active (Included)' : 'Disabled'}
                          </span>
                        </div>
                      </div>

                      {/* Response Time SLA */}
                      <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200 flex flex-col justify-between">
                        <div>
                          <span className="font-bold text-xs text-stone-900 block">
                            Priority Response Speed
                          </span>
                          <p className="text-[11px] text-stone-500 mt-1">
                            Guaranteed engineer arrival SLA window.
                          </p>
                        </div>
                        <select
                          value={builderState.priorityResponse}
                          onChange={(e) => setBuilderState(prev => ({ ...prev, priorityResponse: e.target.value as any }))}
                          className="w-full mt-3 p-1.5 bg-white border border-stone-300 rounded-lg text-xs font-bold text-stone-800 outline-none"
                        >
                          <option value="standard">Standard (8-12 Hours)</option>
                          <option value="express_4hr">Express (4 Hours SLA)</option>
                          <option value="rapid_2hr">Rapid Emergency (2 Hours SLA)</option>
                        </select>
                      </div>

                      {/* Duration */}
                      <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200 flex flex-col justify-between">
                        <div>
                          <span className="font-bold text-xs text-stone-900 block">
                            Contract Term
                          </span>
                          <p className="text-[11px] text-stone-500 mt-1">
                            Longer contracts lock in price freezes.
                          </p>
                        </div>
                        <select
                          value={builderState.contractDurationMonths}
                          onChange={(e) => setBuilderState(prev => ({ ...prev, contractDurationMonths: Number(e.target.value) }))}
                          className="w-full mt-3 p-1.5 bg-white border border-stone-300 rounded-lg text-xs font-bold text-stone-800 outline-none"
                        >
                          <option value={3}>3 Months (Quarterly Trial)</option>
                          <option value={6}>6 Months (Half-Yearly)</option>
                          <option value={12}>12 Months (1 Year Standard)</option>
                          <option value={24}>24 Months (2 Year Enterprise)</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Column: Live Sticky Quotation Engine */}
                <div className="space-y-6">
                  <div className="bg-stone-900 text-white p-6 rounded-3xl shadow-xl border border-stone-800 sticky top-4 space-y-5">
                    <div className="flex items-center justify-between border-b border-stone-800 pb-3">
                      <div>
                        <span className="text-[10px] font-bold text-red-400 uppercase tracking-wider block">
                          Dynamic Pricing Engine
                        </span>
                        <h4 className="text-base font-black text-white">
                          Live Plan Valuation
                        </h4>
                      </div>
                      <span className="text-[10px] bg-stone-800 text-stone-300 font-mono px-2 py-0.5 rounded">
                        18% GST Compliant
                      </span>
                    </div>

                    {/* Summary Metrics */}
                    <div className="space-y-2 text-xs">
                      <div className="flex justify-between text-stone-400">
                        <span>Allocated Annual Visits</span>
                        <strong className="text-white font-mono">{liveQuote.totalVisits} visits</strong>
                      </div>
                      <div className="flex justify-between text-stone-400">
                        <span>Contract Duration</span>
                        <strong className="text-white">{liveQuote.durationMonths} Months</strong>
                      </div>
                      <div className="flex justify-between text-stone-400">
                        <span>Emergency SLA</span>
                        <strong className="text-emerald-400">
                          {builderState.priorityResponse === 'rapid_2hr' ? '2-Hour SLA' : (builderState.priorityResponse === 'express_4hr' ? '4-Hour SLA' : 'Standard')}
                        </strong>
                      </div>
                      <div className="flex justify-between text-stone-400">
                        <span>Selected Categories</span>
                        <strong className="text-white">{builderState.selectedCategories.length} categories</strong>
                      </div>
                    </div>

                    {/* Cost Breakdown */}
                    <div className="p-4 rounded-2xl bg-stone-800/80 border border-stone-700/60 space-y-2 text-xs">
                      <div className="flex justify-between text-stone-300">
                        <span>Base Multi-Service Total</span>
                        <span className="font-mono">₹{liveQuote.baseAmount.toLocaleString('en-IN')}</span>
                      </div>
                      {liveQuote.emergencySurcharge > 0 && (
                        <div className="flex justify-between text-emerald-400">
                          <span>Emergency Breakdown Support</span>
                          <span className="font-mono">+₹{liveQuote.emergencySurcharge.toLocaleString('en-IN')}</span>
                        </div>
                      )}
                      {liveQuote.discountAmount > 0 && (
                        <div className="flex justify-between text-emerald-400 font-bold">
                          <span>Advance Payment Discount</span>
                          <span className="font-mono">-₹{liveQuote.discountAmount.toLocaleString('en-IN')}</span>
                        </div>
                      )}
                      <div className="flex justify-between text-stone-400 text-[11px] pt-1 border-t border-stone-700">
                        <span>GST (18% CGST + SGST)</span>
                        <span className="font-mono">₹{liveQuote.gstAmount.toLocaleString('en-IN')}</span>
                      </div>
                    </div>

                    {/* Grand Total */}
                    <div className="border-t border-stone-800 pt-3">
                      <div className="text-[11px] text-stone-400">Total Contract Value (incl. GST):</div>
                      <div className="text-2xl sm:text-3xl font-black text-red-500 font-mono mt-0.5">
                        ₹{liveQuote.grandTotal.toLocaleString('en-IN')}
                      </div>
                      <div className="text-[11px] text-stone-400 mt-1 font-mono">
                        ≈ ₹{liveQuote.monthlyEquivalent.toLocaleString('en-IN')}/month
                      </div>
                    </div>

                    {/* Primary CTA */}
                    <div className="space-y-2 pt-2">
                      <button
                        onClick={handleGenerateProposal}
                        className="w-full py-3 rounded-2xl bg-red-600 hover:bg-red-700 text-white font-bold text-xs shadow-lg shadow-red-600/30 flex items-center justify-center gap-2 cursor-pointer transition-colors"
                      >
                        <FileText className="w-4 h-4" />
                        <span>Generate Quotation &amp; Contract</span>
                      </button>

                      <p className="text-[10px] text-stone-500 text-center">
                        Instant digital contract generation with pre-filled scope of work.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* ========================================================================= */}
            {/* TAB 3: CUSTOMER DASHBOARD ("MY MAINTENANCE PLANS") */}
            {/* ========================================================================= */}
            {activeTab === 'dashboard' && (
              <div className="space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <h3 className="text-lg font-black text-stone-900">
                      My Active Maintenance Contracts
                    </h3>
                    <p className="text-xs text-stone-500">
                      Track upcoming visits, remaining visit entitlements, and raise service requests.
                    </p>
                  </div>

                  <button
                    onClick={() => setActiveTab('builder')}
                    className="px-4 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-bold flex items-center gap-1.5 cursor-pointer shadow-xs"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add Another Property Plan</span>
                  </button>
                </div>

                {userContracts.length === 0 ? (
                  <div className="bg-white rounded-3xl p-12 text-center border border-stone-200 space-y-4">
                    <ShieldCheck className="w-12 h-12 text-stone-400 mx-auto" />
                    <h4 className="text-base font-bold text-stone-800">No Active Maintenance Plans Yet</h4>
                    <p className="text-xs text-stone-500 max-w-sm mx-auto">
                      Protect your property against unexpected plumbing leaks, electrical shorts, and AC failures with a recurring Gharkasathi plan.
                    </p>
                    <button
                      onClick={() => setActiveTab('explore')}
                      className="px-6 py-2.5 rounded-xl bg-red-600 text-white text-xs font-bold cursor-pointer"
                    >
                      Explore Available Plans
                    </button>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {userContracts.map(contract => {
                      const visitsLeft = Math.max(0, contract.visitsTotal - contract.visitsUsed);
                      const percentUsed = Math.min(100, Math.round((contract.visitsUsed / Math.max(1, contract.visitsTotal)) * 100));

                      return (
                        <div
                          key={contract.id}
                          className="bg-white rounded-3xl border border-stone-200 p-6 sm:p-8 shadow-xs space-y-6 relative overflow-hidden"
                        >
                          {/* Card Header */}
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-stone-100 pb-4">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 rounded-2xl bg-red-50 border border-red-200 flex items-center justify-center p-2 text-red-600">
                                <Building2 className="w-5 h-5" />
                              </div>
                              <div>
                                <div className="flex items-center gap-2">
                                  <h4 className="text-base font-black text-stone-900">
                                    {contract.planTitle}
                                  </h4>
                                  <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                                    ACTIVE
                                  </span>
                                </div>
                                <span className="text-xs text-stone-500">
                                  Contract: <strong className="text-stone-800 font-mono">{contract.contractNumber}</strong> &bull; {contract.propertyType}
                                </span>
                              </div>
                            </div>

                            <div className="flex items-center gap-2">
                              <button
                                onClick={() => handleOpenRaiseRequest(contract)}
                                className="px-4 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-xs shadow-xs flex items-center gap-1.5 cursor-pointer"
                              >
                                <Wrench className="w-3.5 h-3.5" />
                                <span>{t('request_service')}</span>
                              </button>
                            </div>
                          </div>

                          {/* Health Utilization & Visits Metric Bar */}
                          <div className="bg-stone-50 p-5 rounded-2xl border border-stone-100 space-y-3">
                            <div className="flex items-center justify-between text-xs">
                              <div>
                                <span className="font-bold text-stone-900">
                                  Contract Utilization &amp; Visits Entitlement
                                </span>
                                <span className="text-[11px] text-emerald-700 block mt-0.5">
                                  ✓ {t('plan_utilization_healthy')}
                                </span>
                              </div>

                              <div className="text-right">
                                <span className="text-sm font-black font-mono text-stone-900">
                                  {contract.visitsUsed} / {contract.visitsTotal} Visits Used
                                </span>
                                <span className="text-[11px] text-stone-500 block">
                                  ({visitsLeft} remaining)
                                </span>
                              </div>
                            </div>

                            {/* Progress bar */}
                            <div className="w-full bg-stone-200 rounded-full h-2.5 overflow-hidden">
                              <div 
                                className="bg-red-600 h-2.5 rounded-full transition-all duration-500" 
                                style={{ width: `${percentUsed}%` }}
                              />
                            </div>
                          </div>

                          {/* Grid info: Next service, SLA, Dates */}
                          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
                            <div className="p-3 bg-stone-50 rounded-xl border border-stone-100">
                              <span className="text-[10px] text-stone-400 font-bold block mb-1 uppercase">
                                Next Scheduled Inspection:
                              </span>
                              <span className="font-bold text-stone-900 flex items-center gap-1">
                                <Calendar className="w-3.5 h-3.5 text-red-600" />
                                <span>25 September 2026</span>
                              </span>
                              <span className="text-[11px] text-stone-500">HVAC &amp; Electrical Audit</span>
                            </div>

                            <div className="p-3 bg-stone-50 rounded-xl border border-stone-100">
                              <span className="text-[10px] text-stone-400 font-bold block mb-1 uppercase">
                                Emergency Support:
                              </span>
                              <span className="font-bold text-emerald-700 flex items-center gap-1">
                                <ShieldCheck className="w-3.5 h-3.5" />
                                <span>Active (24/7)</span>
                              </span>
                              <span className="text-[11px] text-stone-500">{contract.responseSlaHours || 4}h SLA Guaranteed</span>
                            </div>

                            <div className="p-3 bg-stone-50 rounded-xl border border-stone-100">
                              <span className="text-[10px] text-stone-400 font-bold block mb-1 uppercase">
                                Contract Period:
                              </span>
                              <span className="font-bold text-stone-900">
                                {contract.startDate} to {contract.endDate}
                              </span>
                              <span className="text-[11px] text-stone-500">12 Months Term</span>
                            </div>

                            <div className="p-3 bg-stone-50 rounded-xl border border-stone-100">
                              <span className="text-[10px] text-stone-400 font-bold block mb-1 uppercase">
                                Renewal Notice:
                              </span>
                              <span className="font-bold text-stone-900">
                                {contract.renewalDate}
                              </span>
                              <span className="text-[11px] text-emerald-700">Price Freeze Guaranteed</span>
                            </div>
                          </div>

                          {/* Covered Services Pills */}
                          <div>
                            <span className="text-[11px] font-bold text-stone-500 block mb-2">
                              Covered Scope of Work:
                            </span>
                            <div className="flex flex-wrap gap-1.5">
                              {contract.servicesCovered.map((srv, idx) => (
                                <span key={idx} className="px-2.5 py-1 rounded-lg bg-stone-100 text-stone-800 text-[11px] font-medium border border-stone-200">
                                  ✓ {srv}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            )}

            {/* ========================================================================= */}
            {/* TAB 4: COMMERCIAL ASSETS & MULTI-BRANCH LOCATIONS */}
            {/* ========================================================================= */}
            {activeTab === 'assets' && (
              <div className="space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <h3 className="text-lg font-black text-stone-900">
                      Commercial Machinery &amp; Asset Management
                    </h3>
                    <p className="text-xs text-stone-500">
                      Tag and track commercial ACs, deep freezers, RO purifiers and heavy machinery with digital maintenance histories.
                    </p>
                  </div>

                  <button
                    onClick={() => {
                      const newAsset: CommercialAsset = {
                        id: `ast_${Date.now()}`,
                        businessName: 'The Urban Bistro & Café',
                        branchLocation: 'VIP Road, Raipur',
                        category: 'Commercial Kitchen Exhaust',
                        brand: 'VentPro Heavy Duty',
                        model: 'VP-2000',
                        serialNumber: `VP-${Math.floor(1000 + Math.random() * 9000)}`,
                        installationDate: '2025-02-10',
                        warrantyStatus: 'extended_amc',
                        nextServiceDue: '2026-10-20',
                        serviceHistoryCount: 3
                      };
                      setAssets(prev => [newAsset, ...prev]);
                    }}
                    className="px-4 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-bold flex items-center gap-1.5 cursor-pointer shadow-xs"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Register New Equipment</span>
                  </button>
                </div>

                {/* Asset Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {assets.map(ast => (
                    <div key={ast.id} className="bg-white p-5 rounded-2xl border border-stone-200 shadow-xs space-y-3">
                      <div className="flex items-start justify-between">
                        <div>
                          <span className="text-[10px] font-bold text-red-600 uppercase tracking-wider block">
                            {ast.category}
                          </span>
                          <h4 className="text-sm font-bold text-stone-900 mt-0.5">
                            {ast.brand}
                          </h4>
                          <span className="text-[11px] text-stone-500 font-mono">
                            SN: {ast.serialNumber}
                          </span>
                        </div>

                        <span className="px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-800 text-[10px] font-bold border border-emerald-200">
                          AMC Covered
                        </span>
                      </div>

                      <div className="text-xs text-stone-600 space-y-1 bg-stone-50 p-2.5 rounded-xl">
                        <div className="flex justify-between">
                          <span className="text-stone-400">Branch:</span>
                          <strong>{ast.branchLocation}</strong>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-stone-400">Next Service Due:</span>
                          <strong className="text-red-700">{ast.nextServiceDue}</strong>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-stone-400">Total Servicing Log:</span>
                          <span>{ast.serviceHistoryCount} inspections</span>
                        </div>
                      </div>

                      <button
                        onClick={() => {
                          if (userContracts.length > 0) {
                            handleOpenRaiseRequest(userContracts[0]);
                          }
                        }}
                        className="w-full py-1.5 rounded-lg border border-stone-300 text-xs font-bold text-stone-700 hover:bg-stone-50 cursor-pointer"
                      >
                        Request Asset Service
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Sub-Modals */}
      <MaintenanceQuotationModal
        isOpen={isQuoteModalOpen}
        onClose={() => setIsQuoteModalOpen(false)}
        quotation={currentQuote}
        onProceedToContract={handleProceedToContractFromQuote}
        lang={lang}
      />

      <RaiseServiceRequestModal
        isOpen={isRequestModalOpen}
        onClose={() => setIsRequestModalOpen(false)}
        activeContract={activeContractForRequest}
        onSubmitRequest={handleSubmitServiceRequest}
        lang={lang}
      />
    </>
  );
};
