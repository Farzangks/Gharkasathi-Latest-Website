import React from 'react';
import { 
  X, 
  Star, 
  Clock, 
  Check, 
  AlertCircle, 
  Wrench, 
  ShieldCheck, 
  ChevronRight,
  Sparkles,
  HelpCircle
} from 'lucide-react';
import { CleaningServiceSubItem } from '../data/cleaningCatalog';

interface ServiceDetailsModalProps {
  service: CleaningServiceSubItem;
  onClose: () => void;
  onOpenOptions: (service: CleaningServiceSubItem) => void;
}

export const ServiceDetailsModal: React.FC<ServiceDetailsModalProps> = ({
  service,
  onClose,
  onOpenOptions,
}) => {
  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-end sm:items-center justify-center p-0 sm:p-4 animate-in fade-in duration-200">
      <div 
        className="bg-white w-full sm:max-w-xl rounded-t-3xl sm:rounded-3xl max-h-[92vh] flex flex-col shadow-2xl overflow-hidden border border-stone-100"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Mobile Pull Bar */}
        <div className="w-12 h-1.5 bg-stone-200 rounded-full mx-auto mt-3 sm:hidden" />

        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 pt-4 pb-3 border-b border-stone-100">
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded bg-red-100 text-red-700 text-[10px] font-black uppercase tracking-wider">
              {service.categoryName}
            </span>
            <span className="text-xs text-stone-400 font-mono">Urban Company Grade</span>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-500 hover:text-stone-800 flex items-center justify-center transition-colors cursor-pointer"
            aria-label="Close"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto px-6 py-5 space-y-6">
          {/* Hero Banner */}
          <div className="relative aspect-16/9 rounded-2xl overflow-hidden bg-stone-900 shadow-xs">
            <img
              src={service.imageUrl}
              alt={service.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-4">
              <div className="flex items-center gap-2 mb-1">
                <div className="flex items-center gap-1 px-2 py-0.5 rounded-md bg-white/90 text-stone-900 text-xs font-bold">
                  <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                  <span>{service.rating}</span>
                  <span className="text-stone-400 text-[10px]">({service.reviewsCount})</span>
                </div>
                <div className="flex items-center gap-1 px-2 py-0.5 rounded-md bg-stone-900/80 text-white text-xs font-medium">
                  <Clock className="w-3.5 h-3.5 text-stone-300" />
                  <span>{service.duration}</span>
                </div>
              </div>
              <h2 className="text-lg sm:text-xl font-black text-white leading-tight">
                {service.name}
              </h2>
            </div>
          </div>

          {/* Pricing & Tagline Strip */}
          <div className="flex flex-wrap items-center justify-between gap-3 p-4 bg-stone-50 rounded-2xl border border-stone-200/80">
            <div>
              <span className="text-[11px] text-stone-500 uppercase tracking-wider font-semibold block">
                Standard Rate Card
              </span>
              <div className="flex items-baseline gap-1.5 mt-0.5">
                <span className="text-xl font-black text-stone-900 font-mono">
                  Starting at ₹{service.basePrice}
                </span>
                <span className="text-xs text-stone-400">+ 3% safety fee</span>
              </div>
            </div>
            <button
              onClick={() => {
                onClose();
                onOpenOptions(service);
              }}
              className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-bold text-xs rounded-xl shadow-xs transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <span>Select Options</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Description */}
          <div>
            <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
              {service.tagline}
            </p>
          </div>

          {/* What's Included */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center">
                <Check className="w-3.5 h-3.5 stroke-[3]" />
              </div>
              <h3 className="text-sm font-bold text-stone-900">What's Included</h3>
            </div>
            <div className="space-y-2 pl-2">
              {service.whatsIncluded.map((item, i) => (
                <div key={i} className="flex items-start gap-2.5 text-xs text-stone-700 leading-relaxed">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 shrink-0 mt-1.5" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* What's Excluded */}
          {service.whatsExcluded && service.whatsExcluded.length > 0 && (
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-lg bg-rose-100 text-rose-700 flex items-center justify-center">
                  <AlertCircle className="w-3.5 h-3.5" />
                </div>
                <h3 className="text-sm font-bold text-stone-900">What's Excluded</h3>
              </div>
              <div className="space-y-2 pl-2">
                {service.whatsExcluded.map((item, i) => (
                  <div key={i} className="flex items-start gap-2.5 text-xs text-stone-500 leading-relaxed">
                    <span className="w-1.5 h-1.5 rounded-full bg-rose-400 shrink-0 mt-1.5" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Certified Process Protocol */}
          {service.processSteps && service.processSteps.length > 0 && (
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center">
                  <Sparkles className="w-3.5 h-3.5" />
                </div>
                <h3 className="text-sm font-bold text-stone-900">Standardized Process Protocol</h3>
              </div>
              <div className="grid grid-cols-1 gap-2.5">
                {service.processSteps.map((step) => (
                  <div key={step.step} className="p-3 bg-stone-50 rounded-xl border border-stone-200/80 flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-stone-900 text-white text-xs font-bold flex items-center justify-center shrink-0 mt-0.5 font-mono">
                      {step.step}
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-stone-900">{step.title}</h4>
                      <p className="text-[11px] text-stone-500 mt-0.5 leading-relaxed">{step.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Machinery & Eco Chemicals Used */}
          {service.equipmentUsed && service.equipmentUsed.length > 0 && (
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-lg bg-amber-100 text-amber-700 flex items-center justify-center">
                  <Wrench className="w-3.5 h-3.5" />
                </div>
                <h3 className="text-sm font-bold text-stone-900">Certified Machinery & Chemicals</h3>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {service.equipmentUsed.map((equip, idx) => (
                  <div key={idx} className="p-2.5 bg-stone-50 rounded-xl border border-stone-200/70 text-xs text-stone-700 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-red-600 shrink-0" />
                    <span className="font-medium">{equip}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* FAQs */}
          {service.faqs && service.faqs.length > 0 && (
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-lg bg-purple-100 text-purple-700 flex items-center justify-center">
                  <HelpCircle className="w-3.5 h-3.5" />
                </div>
                <h3 className="text-sm font-bold text-stone-900">Frequently Asked Questions</h3>
              </div>
              <div className="space-y-2">
                {service.faqs.map((faq, idx) => (
                  <div key={idx} className="p-3 bg-stone-50/70 rounded-xl border border-stone-200/60 space-y-1">
                    <div className="text-xs font-bold text-stone-900">Q: {faq.q}</div>
                    <div className="text-[11px] text-stone-600 leading-relaxed">A: {faq.a}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Safety Guarantee */}
          <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-200 flex items-start gap-3">
            <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
            <div className="text-xs text-emerald-900">
              <div className="font-bold">Gharkasathi Verified Standard Guarantee</div>
              <p className="mt-0.5 text-emerald-700 leading-relaxed">
                If you are not 100% satisfied with the cleanliness, our team returns within 24 hours for a complimentary touch-up scrub.
              </p>
            </div>
          </div>
        </div>

        {/* Modal Action Footer */}
        <div className="p-4 border-t border-stone-100 bg-white flex items-center gap-3">
          <button
            onClick={onClose}
            className="w-1/3 py-3 px-4 rounded-xl border border-stone-200 text-stone-700 font-bold text-xs hover:bg-stone-50 transition-colors cursor-pointer"
          >
            Close
          </button>
          <button
            onClick={() => {
              onClose();
              onOpenOptions(service);
            }}
            className="w-2/3 py-3 px-4 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-xs shadow-md transition-all flex items-center justify-center gap-1.5 cursor-pointer active:scale-98"
          >
            <span>Configure & Book Now</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
