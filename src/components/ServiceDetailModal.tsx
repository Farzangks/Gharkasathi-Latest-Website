import React from 'react';
import { X, Star, Clock, CheckCircle2, XCircle, ShieldCheck, ArrowRight, Sparkles } from 'lucide-react';
import { ServiceDetail } from '../data/servicesMarketplaceData';

interface ServiceDetailModalProps {
  service: ServiceDetail | null;
  onClose: () => void;
  onSelectOptionAndBook: (service: ServiceDetail, optionId?: string) => void;
}

export const ServiceDetailModal: React.FC<ServiceDetailModalProps> = ({
  service,
  onClose,
  onSelectOptionAndBook,
}) => {
  if (!service) return null;

  return (
    <div 
      className="fixed inset-0 z-50 bg-stone-900/60 backdrop-blur-xs flex items-end sm:items-center justify-center p-0 sm:p-4 animate-in fade-in duration-150"
      onClick={onClose}
    >
      <div
        className="bg-white w-full sm:max-w-lg rounded-t-2xl sm:rounded-2xl max-h-[90vh] flex flex-col shadow-xl border border-stone-200 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Mobile Pull Handle */}
        <div className="w-10 h-1 bg-stone-300 rounded-full mx-auto mt-2.5 sm:hidden" />

        {/* Modal Top Bar */}
        <div className="flex items-start justify-between p-5 border-b border-stone-100">
          <div className="pr-4 space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-red-600 bg-red-50 px-2 py-0.5 rounded">
                {service.subgroupName}
              </span>
              {service.badge && (
                <span className="text-[11px] font-bold text-white bg-red-600 px-2 py-0.5 rounded">
                  {service.badge}
                </span>
              )}
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-stone-900 leading-snug">
              {service.name}
            </h3>
            <div className="flex items-center gap-3 text-xs text-stone-500 pt-0.5">
              <div className="flex items-center gap-1 font-bold text-stone-800">
                <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                <span>{service.rating}</span>
                <span className="font-normal text-stone-400">({service.reviewsCount}+)</span>
              </div>
              <span>&bull;</span>
              <div className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-stone-400" />
                <span>{service.duration}</span>
              </div>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-500 hover:text-stone-900 flex items-center justify-center transition-colors cursor-pointer shrink-0"
            aria-label="Close"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-5 space-y-5 text-stone-800 text-xs sm:text-sm">
          {/* Service Photo / Thumbnail Banner if available */}
          {service.imageUrl && (
            <div className="w-full h-44 sm:h-52 rounded-2xl overflow-hidden border border-stone-200/80 bg-stone-100 relative shadow-2xs">
              <img 
                src={service.imageUrl} 
                alt={service.name}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-linear-to-t from-stone-900/60 via-transparent to-transparent flex items-end p-3.5">
                <span className="text-white text-xs font-semibold drop-shadow-sm flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  Official Gharkasathi Standard Process
                </span>
              </div>
            </div>
          )}

          {/* Price & Summary */}
          <div className="p-3.5 bg-stone-50 rounded-xl border border-stone-200 flex items-center justify-between">
            <div>
              <span className="text-[11px] text-stone-500 font-medium block">Starting Price</span>
              <span className="text-xl font-bold text-stone-900">₹{service.startingPrice}</span>
              <span className="text-[11px] text-stone-500 ml-1 font-normal">onwards</span>
            </div>
            <div className="text-right">
              <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                <ShieldCheck className="w-3 h-3" />
                Trained &amp; Certified
              </span>
              <span className="block text-[10px] text-stone-500 mt-0.5">Transparent Rate Card</span>
            </div>
          </div>

          {/* Description */}
          <div className="space-y-1.5">
            <h4 className="font-bold text-stone-900 text-xs uppercase tracking-wider">Service Overview</h4>
            <p className="text-stone-600 leading-relaxed text-xs sm:text-sm">
              {service.shortDesc}
            </p>
          </div>

          {/* What's Included */}
          {service.inclusions && service.inclusions.length > 0 && (
            <div className="space-y-2">
              <h4 className="font-bold text-stone-900 text-xs uppercase tracking-wider flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>What's Included:</span>
              </h4>
              <ul className="space-y-1.5 pl-1">
                {service.inclusions.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-stone-700 text-xs">
                    <span className="text-emerald-600 font-bold shrink-0 mt-0.5">✓</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* What's Excluded */}
          {service.exclusions && service.exclusions.length > 0 && (
            <div className="space-y-2">
              <h4 className="font-bold text-stone-900 text-xs uppercase tracking-wider flex items-center gap-1.5">
                <XCircle className="w-4 h-4 text-rose-500" />
                <span>What's Not Included:</span>
              </h4>
              <ul className="space-y-1.5 pl-1">
                {service.exclusions.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-stone-600 text-xs">
                    <span className="text-rose-500 font-bold shrink-0 mt-0.5">✕</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Options / Variants */}
          {service.options && service.options.length > 0 && (
            <div className="space-y-2.5 pt-2 border-t border-stone-100">
              <h4 className="font-bold text-stone-900 text-xs uppercase tracking-wider">
                Select Option to Book:
              </h4>
              <div className="space-y-2">
                {service.options.map((opt) => (
                  <div 
                    key={opt.id}
                    className="p-3 rounded-xl border border-stone-200 hover:border-red-300 hover:bg-red-50/20 transition-all flex items-center justify-between"
                  >
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="font-bold text-stone-900 text-xs">{opt.name}</span>
                        {opt.popular && (
                          <span className="text-[10px] font-bold text-red-600 bg-red-50 px-1.5 py-0.2 rounded">
                            Popular
                          </span>
                        )}
                      </div>
                      {opt.duration && (
                        <span className="text-[10px] text-stone-500">{opt.duration}</span>
                      )}
                    </div>

                    <div className="flex items-center gap-2.5">
                      <span className="font-bold text-stone-900 text-sm">₹{opt.price}</span>
                      <button
                        onClick={() => onSelectOptionAndBook(service, opt.id)}
                        className="px-3 py-1.5 rounded-lg bg-red-600 hover:bg-red-700 text-white font-bold text-xs shadow-2xs transition-colors cursor-pointer"
                      >
                        Add +
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Modal Action Footer */}
        <div className="p-4 border-t border-stone-200 bg-stone-50 flex items-center justify-between gap-3">
          <div>
            <span className="text-[11px] text-stone-500 block">Estimated Cost</span>
            <span className="text-lg font-bold text-stone-900">₹{service.startingPrice}</span>
          </div>

          <button
            onClick={() => onSelectOptionAndBook(service)}
            className="flex-1 max-w-[200px] py-2.5 px-4 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-xs shadow-sm flex items-center justify-center gap-2 cursor-pointer transition-colors"
          >
            <span>Continue to Book</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
