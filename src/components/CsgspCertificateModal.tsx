import React, { useRef } from 'react';
import { 
  Award, 
  ShieldCheck, 
  CheckCircle2, 
  Download, 
  Share2, 
  ExternalLink, 
  X, 
  Calendar, 
  User, 
  Building, 
  QrCode, 
  Check, 
  Sparkles,
  FileBadge
} from 'lucide-react';
import { PartnerCertificationItem } from '../types';
import { GharkasathiEmblem } from './GharkasathiLogo';

interface CsgspCertificateModalProps {
  certificate: PartnerCertificationItem;
  onClose: () => void;
  lang?: 'en' | 'hi';
}

export const CsgspCertificateModal: React.FC<CsgspCertificateModalProps> = ({
  certificate,
  onClose,
  lang = 'en'
}) => {
  const [copied, setCopied] = React.useState(false);

  const formattedIssueDate = new Date(certificate.issueDate).toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });

  const formattedValidUntil = new Date(certificate.validUntil).toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });

  const verifyUrl = `https://gharkasathi.com/verify-credential/${certificate.certificateId}`;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(verifyUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-sm overflow-y-auto">
      <div className="bg-stone-900 border border-amber-500/40 w-full max-w-3xl rounded-2xl shadow-2xl overflow-hidden flex flex-col my-auto max-h-[92vh]">
        
        {/* Modal Top Bar */}
        <div className="flex items-center justify-between px-5 py-3.5 bg-stone-950 border-b border-stone-800">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-400">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
                <span>CSGSP Verified Digital Credential</span>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                <span className="text-[10px] text-emerald-400 font-mono">ACTIVE</span>
              </div>
              <div className="text-[11px] text-stone-400">
                Official Gharkasathi National Skill Registry Certificate
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopyLink}
              className="px-3 py-1.5 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs font-medium transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Share2 className="w-3.5 h-3.5" />}
              <span>{copied ? 'Link Copied' : 'Share QR'}</span>
            </button>

            <button
              onClick={handlePrint}
              className="px-3 py-1.5 rounded-lg bg-amber-600 hover:bg-amber-500 text-white text-xs font-bold transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Print / PDF</span>
            </button>

            <button
              onClick={onClose}
              className="p-1.5 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-400 hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Scrollable Certificate Frame */}
        <div className="p-4 sm:p-6 overflow-y-auto bg-stone-950/60 flex justify-center">
          
          {/* THE OFFICIAL PHYSICAL-GRADE CERTIFICATE CONTAINER */}
          <div className="w-full max-w-2xl bg-amber-50/95 text-stone-900 rounded-xl p-6 sm:p-10 border-8 border-double border-amber-800/60 shadow-2xl relative overflow-hidden font-serif">
            
            {/* Elegant Corner Filigree Accents */}
            <div className="absolute top-2 left-2 w-12 h-12 border-t-2 border-l-2 border-amber-900/50" />
            <div className="absolute top-2 right-2 w-12 h-12 border-t-2 border-r-2 border-amber-900/50" />
            <div className="absolute bottom-2 left-2 w-12 h-12 border-b-2 border-l-2 border-amber-900/50" />
            <div className="absolute bottom-2 right-2 w-12 h-12 border-b-2 border-r-2 border-amber-900/50" />

            {/* Subtle Watermark Emblem in Background */}
            <div className="absolute inset-0 flex items-center justify-center opacity-5 pointer-events-none select-none">
              <Award className="w-96 h-96 text-amber-950" />
            </div>

            {/* Certificate Header */}
            <div className="text-center relative z-10 space-y-2">
              <div className="flex items-center justify-center gap-3 mb-2">
                <div className="w-12 h-12 rounded-xl bg-red-600 text-white flex items-center justify-center p-1.5 shadow-md border border-red-700">
                  <GharkasathiEmblem className="w-9 h-9 text-white" src="/emblem.svg" />
                </div>
                <div className="text-left font-sans">
                  <div className="text-base font-extrabold text-amber-950 tracking-tight leading-none">
                    Gharkasathi™
                  </div>
                  <div className="text-[10px] uppercase font-bold tracking-widest text-amber-800 leading-tight">
                    Academy of Skilled Trades &amp; Quality Standards
                  </div>
                  <div className="text-[8px] text-stone-600 font-mono">
                    Gharkasathi Innoventure Private Limited &bull; CIN: U45200CT2026PTC018290
                  </div>
                </div>
              </div>

              <div className="py-2 border-y border-amber-800/30 inline-block px-8">
                <h1 className="text-2xl sm:text-3xl font-extrabold text-amber-950 tracking-wide uppercase font-serif">
                  Certificate of Competence
                </h1>
                <div className="text-xs sm:text-sm font-sans uppercase font-bold tracking-widest text-amber-800 mt-0.5">
                  Certified Skilled Gharkasathi Service Partner (CSGSP)
                </div>
              </div>
            </div>

            {/* Recipient Declaration */}
            <div className="text-center relative z-10 mt-6 space-y-3 font-sans">
              <p className="text-xs text-stone-600 italic">
                This is to officially certify that the skilled service professional
              </p>

              <div className="text-2xl sm:text-3xl font-bold text-stone-900 font-serif tracking-tight border-b-2 border-amber-900/40 inline-block px-6 pb-1">
                {certificate.partnerName}
              </div>

              <p className="text-xs text-stone-700 max-w-lg mx-auto leading-relaxed pt-2">
                has successfully undergone rigorous background verification, demonstrated exemplary mastery in standard operating procedures, hazard isolation, and passed the official theoretical examination &amp; hands-on technical assessment in:
              </p>

              <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-amber-900 text-amber-50 font-bold text-sm tracking-wide shadow-sm">
                <Sparkles className="w-4 h-4 text-amber-300" />
                <span>TRADE: {certificate.category.toUpperCase()} ENGINEERING</span>
              </div>

              <div className="flex justify-center gap-6 text-[11px] text-stone-600 pt-2 font-mono">
                <div>Theory Exam Score: <strong className="text-stone-900">{certificate.quizScore}%</strong></div>
                {certificate.practicalScore !== undefined && (
                  <div>Practical Evaluation: <strong className="text-stone-900">{certificate.practicalScore}/30</strong></div>
                )}
                <div>Credential Status: <strong className="text-emerald-700">VERIFIED ACTIVE</strong></div>
              </div>
            </div>

            {/* Signatures, Seal & QR Code */}
            <div className="mt-8 pt-6 border-t border-amber-900/30 flex flex-col sm:flex-row items-center justify-between gap-6 relative z-10 font-sans">
              
              {/* Left Signature */}
              <div className="text-center sm:text-left space-y-1">
                <div className="font-serif italic text-sm text-stone-800 font-bold tracking-wide">
                  Er. Sandeep Baghel
                </div>
                <div className="w-36 h-0.5 bg-amber-900/50 mx-auto sm:mx-0" />
                <div className="text-[10px] text-stone-600 uppercase font-semibold">
                  Chief Technical Evaluator
                </div>
                <div className="text-[9px] text-stone-500">
                  Gharkasathi Skill Assessment Board
                </div>
              </div>

              {/* Center Official Gold Seal */}
              <div className="flex flex-col items-center">
                <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-amber-700 via-amber-500 to-amber-600 p-1 shadow-lg border-2 border-amber-900 flex items-center justify-center text-center">
                  <div className="w-full h-full rounded-full border border-dashed border-amber-950/60 flex flex-col items-center justify-center p-1 bg-amber-400/90 text-amber-950">
                    <ShieldCheck className="w-5 h-5 text-amber-950" />
                    <span className="text-[7px] font-black uppercase tracking-tighter leading-tight mt-0.5">
                      SEAL OF EXCELLENCE
                    </span>
                    <span className="text-[6px] font-bold font-mono">
                      CSGSP &bull; 2026
                    </span>
                  </div>
                </div>
              </div>

              {/* Right QR Code & Registrar */}
              <div className="text-center sm:text-right space-y-1 flex flex-col items-center sm:items-end">
                <div className="w-16 h-16 bg-white p-1 rounded-lg border border-amber-900/30 shadow-xs flex items-center justify-center">
                  {/* Visual SVG QR representation */}
                  <div className="w-full h-full bg-stone-900 rounded p-1 flex flex-col justify-between">
                    <div className="flex justify-between">
                      <div className="w-3.5 h-3.5 bg-white rounded-xs" />
                      <div className="w-3.5 h-3.5 bg-white rounded-xs" />
                    </div>
                    <div className="text-[6px] font-mono text-white text-center font-bold">QR OK</div>
                    <div className="flex justify-between">
                      <div className="w-3.5 h-3.5 bg-white rounded-xs" />
                      <div className="w-1.5 h-1.5 bg-amber-400 rounded-full" />
                    </div>
                  </div>
                </div>
                <div className="text-[9px] font-mono text-stone-600 pt-0.5">
                  Scan to Verify Online
                </div>
                <div className="text-[8px] text-stone-500 font-mono">
                  ID: {certificate.certificateId}
                </div>
              </div>

            </div>

            {/* Bottom Security Footer */}
            <div className="mt-6 pt-3 border-t border-amber-900/20 flex flex-col sm:flex-row items-center justify-between text-[9px] text-stone-500 font-mono relative z-10">
              <div>Issued On: {formattedIssueDate}</div>
              <div>Valid Through: {formattedValidUntil}</div>
              <div>Registry: gharkasathi.com/verify</div>
            </div>

          </div>

        </div>

        {/* Modal Bottom Metadata info */}
        <div className="px-5 py-3 bg-stone-950 border-t border-stone-800 text-xs text-stone-400 flex flex-col sm:flex-row items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Cryptographically sealed record. Registered in Gharkasathi Partner Directory.</span>
          </div>
          <div className="font-mono text-[11px] text-stone-400">
            Certificate ID: <strong className="text-amber-400">{certificate.certificateId}</strong>
          </div>
        </div>

      </div>
    </div>
  );
};
