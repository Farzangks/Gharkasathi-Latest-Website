import React from 'react';
import { 
  X, 
  Printer, 
  Share2, 
  CheckCircle2, 
  ShieldCheck, 
  FileText, 
  ArrowRight,
  Clock,
  Sparkles,
  Download,
  Building2,
  Calendar,
  AlertCircle
} from 'lucide-react';
import { QuotationSummary, MaintenanceContract } from '../../types/maintenance';
import { GharkasathiLogo, GharkasathiEmblem } from '../GharkasathiLogo';

interface MaintenanceQuotationModalProps {
  isOpen: boolean;
  onClose: () => void;
  quotation: QuotationSummary | null;
  onProceedToContract?: (quotation: QuotationSummary) => void;
  lang?: 'en' | 'hi';
}

export const MaintenanceQuotationModal: React.FC<MaintenanceQuotationModalProps> = ({
  isOpen,
  onClose,
  quotation,
  onProceedToContract,
  lang = 'en'
}) => {
  if (!isOpen || !quotation) return null;

  const handlePrint = () => {
    window.print();
  };

  const handleShareWhatsApp = () => {
    const text = encodeURIComponent(
      `*Gharkasathi Maintenance Quotation*\nQuote #: ${quotation.quoteNumber}\nPlan: ${quotation.planType} - ${quotation.propertyTitle}\nTotal Visits: ${quotation.totalVisits}\nGrand Total: ₹${quotation.grandTotal.toLocaleString('en-IN')} (incl. 18% GST)\n\nGenerated for ${quotation.customerName}. View your contract at gharkasathi.com`
    );
    window.open(`https://wa.me/?text=${text}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/75 backdrop-blur-xs overflow-y-auto animate-fadeIn">
      <div className="bg-white rounded-3xl shadow-2xl max-w-4xl w-full my-auto overflow-hidden border border-stone-200 text-stone-900 flex flex-col max-h-[92vh]">
        {/* Header Bar */}
        <div className="px-6 py-4 bg-stone-900 text-white flex items-center justify-between border-b border-stone-800">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-red-600 flex items-center justify-center p-1">
              <GharkasathiEmblem className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-black tracking-wide text-white">
                  GHARKASATHI PROPOSAL &amp; QUOTATION
                </span>
                <span className="text-[10px] bg-red-950 text-red-400 font-mono px-2 py-0.5 rounded border border-red-800">
                  {quotation.quoteNumber}
                </span>
              </div>
              <p className="text-[11px] text-stone-400">
                Official Estimate &bull; Gharkasathi Innoventure Private Limited
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="p-2 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-200 hover:text-white transition-colors cursor-pointer text-xs flex items-center gap-1.5"
              title="Print / Save as PDF"
            >
              <Printer className="w-4 h-4" />
              <span className="hidden sm:inline">Print / PDF</span>
            </button>
            <button
              onClick={handleShareWhatsApp}
              className="p-2 rounded-xl bg-emerald-700 hover:bg-emerald-600 text-white transition-colors cursor-pointer text-xs flex items-center gap-1.5"
              title="Share on WhatsApp"
            >
              <Share2 className="w-4 h-4" />
              <span className="hidden sm:inline">WhatsApp</span>
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-xl hover:bg-stone-800 text-stone-400 hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Printable Document Body */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6 text-xs sm:text-sm bg-stone-50/50 print:p-0 print:bg-white">
          {/* Company Branding & Meta */}
          <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-xs flex flex-col sm:flex-row justify-between items-start gap-4">
            <div>
              <GharkasathiLogo size="md" variant="light" />
              <div className="text-[11px] text-stone-500 mt-2 space-y-0.5 font-sans">
                <p className="font-bold text-stone-800">Gharkasathi Innoventure Private Limited</p>
                <p>CIN: U45200CT2026PTC018290 &bull; GSTIN: 22AABCG1234F1Z8</p>
                <p>Corporate Office: Civil Lines, Raipur, Chhattisgarh - 492001</p>
                <p>Email: care@gharkasathi.com &bull; Support: +91 91790 00000</p>
              </div>
            </div>

            <div className="sm:text-right text-stone-600 text-[11px] space-y-1 bg-stone-50 sm:bg-transparent p-3 sm:p-0 rounded-xl w-full sm:w-auto">
              <div className="text-xs font-bold text-stone-900">QUOTATION SUMMARY</div>
              <p><strong>Date:</strong> {quotation.createdAt}</p>
              <p><strong>Valid Until:</strong> {quotation.validUntil}</p>
              <p><strong>Contract Duration:</strong> {quotation.durationMonths} Months</p>
              <span className="inline-block px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold text-[10px]">
                Pre-Approved Estimate
              </span>
            </div>
          </div>

          {/* Client & Property Details */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-white p-4 rounded-xl border border-stone-200">
              <span className="text-[10px] font-bold text-stone-400 uppercase tracking-wider block mb-1">
                Prepared For:
              </span>
              <div className="font-bold text-stone-900 text-sm">{quotation.customerName}</div>
              <div className="text-stone-600 text-xs mt-0.5">{quotation.customerPhone}</div>
              <div className="text-stone-600 text-xs">{quotation.customerEmail}</div>
            </div>

            <div className="bg-white p-4 rounded-xl border border-stone-200">
              <span className="text-[10px] font-bold text-stone-400 uppercase tracking-wider block mb-1">
                Property / Facility Scope:
              </span>
              <div className="font-bold text-stone-900 text-sm flex items-center gap-1.5">
                <Building2 className="w-3.5 h-3.5 text-red-600" />
                <span>{quotation.propertyTitle}</span>
              </div>
              <div className="text-stone-600 text-xs mt-0.5">
                Plan Type: <strong className="text-red-700">{quotation.planType}</strong> ({quotation.target.toUpperCase()})
              </div>
              <div className="text-stone-600 text-xs">
                Total Visits Included: <strong>{quotation.totalVisits} scheduled visits</strong>
              </div>
            </div>
          </div>

          {/* Service Scope Table */}
          <div className="bg-white rounded-xl border border-stone-200 overflow-hidden">
            <div className="px-4 py-3 bg-stone-100 border-b border-stone-200 flex items-center justify-between font-bold text-stone-800 text-xs">
              <span>Included Service Category</span>
              <span>Frequency &amp; Annual Visits</span>
            </div>

            <div className="divide-y divide-stone-100">
              {quotation.categoryBreakdown.map((item, idx) => (
                <div key={idx} className="px-4 py-3 flex items-center justify-between hover:bg-stone-50/80 transition-colors">
                  <div>
                    <div className="font-bold text-stone-900 text-xs sm:text-sm">
                      {item.categoryName}
                    </div>
                    <div className="text-[11px] text-stone-500">
                      Standard preventive inspections, minor repairs &amp; free labour allocation
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="inline-block px-2 py-0.5 rounded-md bg-stone-100 font-bold text-stone-800 text-xs capitalize">
                      {item.frequency}
                    </span>
                    <div className="text-[11px] font-mono text-stone-500 mt-0.5">
                      {item.visits} visits/yr
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Pricing Calculation Breakdown */}
          <div className="bg-white p-5 rounded-2xl border border-stone-200 space-y-2.5">
            <div className="flex justify-between text-stone-600 text-xs">
              <span>Base Multi-Service Facility Fee</span>
              <span className="font-mono">₹{quotation.baseAmount.toLocaleString('en-IN')}</span>
            </div>

            {quotation.emergencySurcharge > 0 && (
              <div className="flex justify-between text-stone-600 text-xs">
                <span className="flex items-center gap-1 text-emerald-700">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  24/7 Priority Emergency Breakdown Dispatch
                </span>
                <span className="font-mono text-emerald-700">+₹{quotation.emergencySurcharge.toLocaleString('en-IN')}</span>
              </div>
            )}

            {quotation.prioritySurcharge > 0 && (
              <div className="flex justify-between text-stone-600 text-xs">
                <span>Rapid SLA Response Guarantee</span>
                <span className="font-mono">+₹{quotation.prioritySurcharge.toLocaleString('en-IN')}</span>
              </div>
            )}

            {quotation.discountAmount > 0 && (
              <div className="flex justify-between text-emerald-700 text-xs font-bold">
                <span>Annual Payment Discount</span>
                <span className="font-mono">-₹{quotation.discountAmount.toLocaleString('en-IN')}</span>
              </div>
            )}

            <div className="border-t border-stone-200 pt-2 flex justify-between text-xs text-stone-800">
              <span>Taxable Value (Subtotal)</span>
              <span className="font-mono font-bold">₹{quotation.subtotal.toLocaleString('en-IN')}</span>
            </div>

            <div className="flex justify-between text-xs text-stone-500">
              <span>GST ({quotation.gstRatePercent}% CGST+SGST / IGST)</span>
              <span className="font-mono">₹{quotation.gstAmount.toLocaleString('en-IN')}</span>
            </div>

            <div className="border-t-2 border-stone-900 pt-3 flex items-baseline justify-between">
              <div>
                <span className="text-sm sm:text-base font-black text-stone-900 block">
                  Total Contract Value (incl. GST)
                </span>
                <span className="text-[11px] text-stone-500">
                  Equivalent to ~₹{quotation.monthlyEquivalent.toLocaleString('en-IN')}/month
                </span>
              </div>
              <div className="text-right">
                <span className="text-xl sm:text-2xl font-black text-red-600 font-mono">
                  ₹{quotation.grandTotal.toLocaleString('en-IN')}
                </span>
              </div>
            </div>
          </div>

          {/* Terms & Conditions */}
          <div className="bg-stone-100 p-4 rounded-xl text-[11px] text-stone-600 space-y-1.5">
            <span className="font-bold text-stone-800 uppercase tracking-wide block">
              Contract Terms &amp; Conditions:
            </span>
            <ul className="list-disc pl-4 space-y-1">
              {quotation.terms.map((t, idx) => (
                <li key={idx}>{t}</li>
              ))}
            </ul>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-4 sm:p-5 bg-white border-t border-stone-200 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="text-xs text-stone-500 flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>Instant Digital Activation &bull; Certified Service Partner Guaranteed</span>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              onClick={onClose}
              className="w-1/2 sm:w-auto px-4 py-2.5 rounded-xl border border-stone-300 text-xs font-bold text-stone-700 hover:bg-stone-50 cursor-pointer"
            >
              Close
            </button>
            {onProceedToContract && (
              <button
                onClick={() => onProceedToContract(quotation)}
                className="w-1/2 sm:w-auto px-6 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-bold shadow-md shadow-red-600/30 flex items-center justify-center gap-2 cursor-pointer transition-colors"
              >
                <span>Proceed to Digital Contract</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
