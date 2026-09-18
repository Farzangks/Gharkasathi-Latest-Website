import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Sparkles, 
  Home, 
  Building2, 
  ArrowRight, 
  CheckCircle2, 
  Wrench, 
  Clock, 
  PhoneCall, 
  Sliders,
  Calendar,
  Layers,
  FileCheck
} from 'lucide-react';
import { CareMaintenanceModal } from './CareMaintenanceModal';
import { GharkasathiEmblem } from '../GharkasathiLogo';

interface CareAndMaintenanceSectionProps {
  onOpenModal?: (tab?: 'explore' | 'builder' | 'dashboard' | 'assets', target?: 'residential' | 'commercial') => void;
}

export const CareAndMaintenanceSection: React.FC<CareAndMaintenanceSectionProps> = ({
  onOpenModal
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalTab, setModalTab] = useState<'explore' | 'builder' | 'dashboard' | 'assets'>('explore');
  const [modalTarget, setModalTarget] = useState<'residential' | 'commercial'>('residential');

  const handleOpen = (tab: 'explore' | 'builder' | 'dashboard' | 'assets' = 'explore', target: 'residential' | 'commercial' = 'residential') => {
    if (onOpenModal) {
      onOpenModal(tab, target);
    } else {
      setModalTab(tab);
      setModalTarget(target);
      setIsModalOpen(true);
    }
  };

  return (
    <section id="care-and-maintenance" className="py-16 sm:py-24 bg-stone-50 border-t border-stone-200 relative overflow-hidden">
      {/* Background Accent Graphics */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-red-100/40 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-stone-200/40 rounded-full blur-3xl pointer-events-none -ml-20 -mb-20" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-stone-200 pb-8">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-100 text-red-700 text-xs font-bold uppercase tracking-wider">
              <span className="w-2 h-2 rounded-full bg-red-600 animate-pulse" />
              <span>Care &amp; Maintenance</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-stone-900 tracking-tight leading-tight">
              Maintenance Made Simple.
            </h2>
            <p className="text-sm sm:text-base text-stone-600 leading-relaxed">
              From your home to your business, create a maintenance plan built around your property. Trusted technicians, scheduled seasonal servicing, and guaranteed emergency response under one roof.
            </p>
          </div>

          {/* Quick Action CTAs */}
          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => handleOpen('builder', 'residential')}
              className="px-6 py-3 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-xs shadow-md shadow-red-600/30 flex items-center gap-2 cursor-pointer transition-all hover:translate-y-[-1px]"
            >
              <Sliders className="w-4 h-4" />
              <span>Build Your Plan</span>
            </button>
            <button
              onClick={() => handleOpen('explore', 'residential')}
              className="px-5 py-3 rounded-xl bg-white hover:bg-stone-100 text-stone-800 font-bold text-xs border border-stone-300 shadow-xs flex items-center gap-1.5 cursor-pointer transition-colors"
            >
              <span>Explore HMC (Homes)</span>
            </button>
            <button
              onClick={() => handleOpen('explore', 'commercial')}
              className="px-5 py-3 rounded-xl bg-white hover:bg-stone-100 text-stone-800 font-bold text-xs border border-stone-300 shadow-xs flex items-center gap-1.5 cursor-pointer transition-colors"
            >
              <span>Explore AMC (Commercial)</span>
            </button>
          </div>
        </div>

        {/* 3 Core Contract Cards: HMC, QMC, AMC */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1: HMC */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-red-50 text-red-600 flex items-center justify-center p-2.5">
                <Home className="w-7 h-7" />
              </div>

              <div>
                <span className="text-[10px] font-bold text-stone-400 uppercase tracking-wider block">
                  Residential Care
                </span>
                <h3 className="text-xl font-black text-stone-900 mt-0.5 group-hover:text-red-600 transition-colors">
                  HMC
                </h3>
                <div className="text-xs font-bold text-stone-700">Home Maintenance Contract</div>
              </div>

              <div className="text-[11px] text-stone-400 font-medium">
                For: Homes | Apartments | Villas | Duplexes
              </div>

              <p className="text-xs text-stone-600 leading-relaxed">
                Regular plumbing, electrical, AC servicing and pest control visits with trusted technicians under one predictable subscription.
              </p>

              <div className="pt-2 border-t border-stone-100 space-y-2 text-xs text-stone-600">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Basic Care from ₹1,999/mo</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Smart Care with AC &amp; Pest Control</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>4-Hour Emergency Breakdown SLA</span>
                </div>
              </div>
            </div>

            <div className="pt-6 mt-4 border-t border-stone-100">
              <button
                onClick={() => handleOpen('explore', 'residential')}
                className="w-full py-2.5 rounded-xl bg-stone-900 hover:bg-black text-white text-xs font-bold flex items-center justify-center gap-2 cursor-pointer transition-colors"
              >
                <span>View Home Plans</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Card 2: QMC */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-700 flex items-center justify-center p-2.5">
                <Calendar className="w-7 h-7" />
              </div>

              <div>
                <span className="text-[10px] font-bold text-stone-400 uppercase tracking-wider block">
                  Quarterly Maintenance
                </span>
                <h3 className="text-xl font-black text-stone-900 mt-0.5 group-hover:text-amber-700 transition-colors">
                  QMC
                </h3>
                <div className="text-xs font-bold text-stone-700">Quarterly Maintenance Contract</div>
              </div>

              <div className="text-[11px] text-stone-400 font-medium">
                For: Businesses | Offices | Restaurants | Commercial
              </div>

              <p className="text-xs text-stone-600 leading-relaxed">
                Structured seasonal deep maintenance visits: Q1 Preventive, Q2 Deep Clean, Q3 Repair overhaul, Q4 Comprehensive inspection.
              </p>

              <div className="pt-2 border-t border-stone-100 space-y-2 text-xs text-stone-600">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Scheduled 4 Comprehensive Audits/Yr</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>HVAC &amp; Commercial Cooling Tuning</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Detailed Compliance &amp; Safety Report</span>
                </div>
              </div>
            </div>

            <div className="pt-6 mt-4 border-t border-stone-100">
              <button
                onClick={() => handleOpen('explore', 'commercial')}
                className="w-full py-2.5 rounded-xl bg-stone-900 hover:bg-black text-white text-xs font-bold flex items-center justify-center gap-2 cursor-pointer transition-colors"
              >
                <span>View Quarterly Plans</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Card 3: AMC */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-red-500 shadow-md transition-all flex flex-col justify-between relative group">
            <span className="absolute -top-3 right-6 px-3 py-0.5 rounded-full bg-red-600 text-white text-[10px] font-black uppercase tracking-wider shadow-sm">
              Enterprise Choice
            </span>

            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-red-600 text-white flex items-center justify-center p-2.5">
                <Building2 className="w-7 h-7" />
              </div>

              <div>
                <span className="text-[10px] font-bold text-red-600 uppercase tracking-wider block">
                  Commercial Facility Care
                </span>
                <h3 className="text-xl font-black text-stone-900 mt-0.5 group-hover:text-red-600 transition-colors">
                  AMC
                </h3>
                <div className="text-xs font-bold text-stone-700">Annual Maintenance Contract</div>
              </div>

              <div className="text-[11px] text-stone-400 font-medium">
                For: Restaurants | Cafés | Offices | Gyms | Hospitals | Societies
              </div>

              <p className="text-xs text-stone-600 leading-relaxed">
                Full vendor consolidation. Coordinate kitchen degreasing, chillers, pest control, plumbing and electrical under one contract with rapid SLA.
              </p>

              <div className="pt-2 border-t border-stone-100 space-y-2 text-xs text-stone-600">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Up to 96 Multi-Category Annual Visits</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>2-Hour Business Emergency Dispatch</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Machinery QR Asset Tagging &amp; History</span>
                </div>
              </div>
            </div>

            <div className="pt-6 mt-4 border-t border-stone-100">
              <button
                onClick={() => handleOpen('explore', 'commercial')}
                className="w-full py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-bold flex items-center justify-center gap-2 cursor-pointer shadow-sm shadow-red-600/30 transition-colors"
              >
                <span>View Enterprise AMC</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* Powerful "Build Your Own Plan" Interactive Callout */}
        <div className="bg-stone-900 text-white rounded-3xl p-8 sm:p-12 relative overflow-hidden shadow-xl border border-stone-800">
          <div className="relative z-10 max-w-3xl space-y-4">
            <span className="text-xs font-bold text-red-400 uppercase tracking-wider block">
              Dynamic Proposal &amp; Contract Engine
            </span>
            <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              Build Your Own Maintenance Plan
            </h3>
            <p className="text-xs sm:text-sm text-stone-300 leading-relaxed">
              Configure different visit frequencies for each category — e.g. monthly pest control, quarterly deep cleaning, and fortnightly electrical inspections. Select your square footage, emergency support and response speed to generate a compliant quotation and digital contract instantly.
            </p>

            <div className="pt-4 flex flex-wrap items-center gap-4">
              <button
                onClick={() => handleOpen('builder', 'residential')}
                className="px-6 py-3.5 rounded-2xl bg-red-600 hover:bg-red-700 text-white font-black text-xs shadow-lg shadow-red-600/30 flex items-center gap-2 cursor-pointer transition-all hover:scale-102"
              >
                <Sliders className="w-4 h-4" />
                <span>Launch Custom Plan Builder</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => handleOpen('dashboard')}
                className="px-5 py-3.5 rounded-2xl bg-stone-800 hover:bg-stone-700 text-stone-200 font-bold text-xs border border-stone-700 flex items-center gap-2 cursor-pointer transition-colors"
              >
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>My Active Contracts &amp; Raise Request</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <CareMaintenanceModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        initialTab={modalTab}
        initialTarget={modalTarget}
      />
    </section>
  );
};
