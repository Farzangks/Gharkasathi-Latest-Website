import React, { useState } from 'react';
import { 
  X, 
  Compass, 
  Building2, 
  CheckCircle2, 
  Phone, 
  MessageCircle, 
  FileText, 
  Sparkles,
  Layers
} from 'lucide-react';

interface ArchitectureConsultationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ArchitectureConsultationModal: React.FC<ArchitectureConsultationModalProps> = ({
  isOpen,
  onClose
}) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [plotDimensions, setPlotDimensions] = useState('30x50 (1,500 sq.ft)');
  const [facing, setFacing] = useState('North (Vastu)');
  const [serviceNeeded, setServiceNeeded] = useState('3d-elevation-floorplan');
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const getWhatsAppUrl = () => {
    const text = `Hello Gharkasathi Architecture & Planning Studio:\n\n` +
      `*Client:* ${name}\n` +
      `*Plot Dimensions:* ${plotDimensions}\n` +
      `*Plot Facing:* ${facing}\n` +
      `*Requirement:* ${serviceNeeded}\n\n` +
      `Please connect me with the Chief Architect for 2D Vastu Floor Plan & 3D Elevation design.`;
    return `https://wa.me/917770999122?text=${encodeURIComponent(text)}`;
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-7 shadow-2xl relative space-y-5 animate-in fade-in zoom-in-95">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-stone-100 text-stone-600 flex items-center justify-center hover:bg-stone-200 transition-colors cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>

        {submitted ? (
          <div className="text-center py-6 space-y-4">
            <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-700 mx-auto flex items-center justify-center">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <div>
              <h3 className="text-xl font-black text-stone-900">Consultation Booked!</h3>
              <p className="text-xs text-stone-600 mt-1 max-w-sm mx-auto">
                Thank you, <strong>{name}</strong>. Our Senior Architect will contact you on <strong>{phone}</strong> to review your {plotDimensions} plot specifications and Vastu alignments.
              </p>
            </div>

            <div className="pt-2 flex flex-col gap-2">
              <a
                href={getWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 px-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Connect with Architect on WhatsApp</span>
              </a>

              <button
                onClick={onClose}
                className="w-full py-2.5 px-4 bg-stone-100 hover:bg-stone-200 text-stone-800 rounded-xl text-xs font-bold transition-colors cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <div className="flex items-center gap-2 text-xs font-bold text-red-600 uppercase tracking-wider mb-1">
                <Compass className="w-4 h-4" />
                <span>Vastu Certified &bull; Municipal Sanction Approved</span>
              </div>
              <h3 className="text-lg sm:text-xl font-black text-stone-900 leading-tight">
                Architectural Plans & 3D Elevations
              </h3>
              <p className="text-xs text-stone-500 mt-0.5">
                Get custom 2D floor plans, 3D modern elevations & structural drawings before breaking ground.
              </p>
            </div>

            <div className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-stone-800 mb-1">Your Full Name *</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g., Alok Tiwari"
                  className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-xs sm:text-sm text-stone-900 focus:outline-hidden focus:border-red-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-800 mb-1">Mobile Number *</label>
                <input
                  type="tel"
                  required
                  pattern="[0-9]{10}"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="10-digit mobile number"
                  className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-xs sm:text-sm text-stone-900 focus:outline-hidden focus:border-red-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-stone-800 mb-1">Plot Dimensions</label>
                  <input
                    type="text"
                    value={plotDimensions}
                    onChange={(e) => setPlotDimensions(e.target.value)}
                    placeholder="e.g., 30x50 or 1,500 sq.ft"
                    className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl text-xs text-stone-900 focus:outline-hidden focus:border-red-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-800 mb-1">Plot Facing</label>
                  <select
                    value={facing}
                    onChange={(e) => setFacing(e.target.value)}
                    className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl text-xs text-stone-900 focus:outline-hidden focus:border-red-500 font-medium"
                  >
                    <option value="North (Vastu)">North Facing (Kuber Corner)</option>
                    <option value="East (Vastu)">East Facing (Surya Corner)</option>
                    <option value="North-East (Ishan)">North-East (Ishan Corner)</option>
                    <option value="West Facing">West Facing</option>
                    <option value="South Facing">South Facing (Special Remediation)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-800 mb-1">Select Architecture Package</label>
                <div className="grid grid-cols-1 gap-2">
                  {[
                    { id: '3d-elevation-floorplan', name: '2D Floor Plan + 3D Modern Elevation', price: '₹4,999 onwards' },
                    { id: 'full-structural-set', name: 'Complete Working Drawings (Civil + Plumbing + Electrical)', price: '₹9,999 onwards' },
                    { id: 'municipal-sanction', name: 'Municipal Map Sanction & Nagar Nigam Approval', price: '₹14,999 onwards' },
                  ].map((p) => (
                    <div
                      key={p.id}
                      onClick={() => setServiceNeeded(p.id)}
                      className={`p-2.5 rounded-xl border text-left cursor-pointer transition-all flex items-center justify-between ${
                        serviceNeeded === p.id
                          ? 'bg-red-50 border-red-500 ring-1 ring-red-400'
                          : 'bg-stone-50 border-stone-200 hover:border-stone-300'
                      }`}
                    >
                      <div className="text-xs font-bold text-stone-900">{p.name}</div>
                      <span className="text-[11px] font-bold text-red-600 font-mono">{p.price}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-2 flex items-center justify-between gap-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2.5 rounded-xl border border-stone-200 text-stone-600 text-xs font-bold hover:bg-stone-50 cursor-pointer"
              >
                Cancel
              </button>

              <button
                type="submit"
                className="flex-1 py-2.5 px-4 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-bold shadow-md shadow-red-600/20 transition-all cursor-pointer"
              >
                Book Architectural Consultation
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
