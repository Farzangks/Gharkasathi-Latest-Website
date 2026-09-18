import React, { useState } from 'react';
import { 
  X, 
  Wrench, 
  Zap, 
  Flame, 
  Hammer, 
  ShieldCheck, 
  Clock, 
  CheckCircle2, 
  Phone, 
  MessageCircle,
  MapPin
} from 'lucide-react';

interface RapidHandymanModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialCategory?: string;
  selectedCity?: string;
}

export const RapidHandymanModal: React.FC<RapidHandymanModalProps> = ({
  isOpen,
  onClose,
  initialCategory = 'electrician',
  selectedCity = 'Raipur'
}) => {
  const [category, setCategory] = useState(initialCategory);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [issueDescription, setIssueDescription] = useState('');
  const [isDispatched, setIsDispatched] = useState(false);

  if (!isOpen) return null;

  const categories = [
    { id: 'electrician', name: '⚡ Electrician (Switch, MCB, Fan)', price: '₹199', icon: Zap },
    { id: 'plumber', name: '🚰 Plumber (Leakage, Tap, Pipe)', price: '₹249', icon: Wrench },
    { id: 'ac', name: '❄️ AC Jet Wash & Gas Refill', price: '₹499', icon: Flame },
    { id: 'carpenter', name: '🪚 Carpenter (Door, Lock, Channel)', price: '₹299', icon: Hammer },
    { id: 'pest-control', name: '🐜 Pest & Termite Spray', price: '₹899', icon: ShieldCheck },
  ];

  const currentCat = categories.find(c => c.id === category) || categories[0];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsDispatched(true);
  };

  const getWhatsAppDispatchUrl = () => {
    const text = `🚨 *URGENT SATHI HANDYMAN DISPATCH* 🚨\n\n` +
      `*Service:* ${currentCat.name}\n` +
      `*Rate:* Starting ${currentCat.price}\n` +
      `*Customer:* ${name}\n` +
      `*City:* ${selectedCity}\n` +
      `*Address:* ${address}\n` +
      `*Problem:* ${issueDescription || 'General breakdown / repair'}\n\n` +
      `Please dispatch the nearest active Gharkasathi technician in uniform.`;
    return `https://wa.me/917770999122?text=${encodeURIComponent(text)}`;
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-7 shadow-2xl relative space-y-5 animate-in fade-in zoom-in-95">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-stone-100 text-stone-600 flex items-center justify-center hover:bg-stone-200 transition-colors cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>

        {isDispatched ? (
          <div className="text-center py-6 space-y-4">
            <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-700 mx-auto flex items-center justify-center">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <div>
              <span className="text-[10px] bg-red-100 text-red-700 font-extrabold px-2 py-0.5 rounded-full uppercase">
                30-Min Rapid Sathi SLA
              </span>
              <h3 className="text-xl font-black text-stone-900 mt-2">Technician Dispatched!</h3>
              <p className="text-xs text-stone-600 mt-1">
                A verified Gharkasathi partner in red uniform is en route to <strong>{address || selectedCity}</strong>.
              </p>
            </div>

            <div className="p-3.5 bg-stone-50 rounded-2xl border border-stone-200 text-left text-xs space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-stone-500">Assigned Sathi:</span>
                <span className="font-bold text-stone-900">Ramesh Kumar (ID: GKS-412)</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-stone-500">ETA Arrival:</span>
                <span className="font-bold text-emerald-600 font-mono">24 Minutes</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-stone-500">Inspection Charge:</span>
                <span className="font-black text-stone-900 font-mono">{currentCat.price} (Adjusted in bill)</span>
              </div>
            </div>

            <div className="pt-2 flex flex-col gap-2">
              <a
                href={getWhatsAppDispatchUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 px-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Track on WhatsApp Live</span>
              </a>

              <button
                onClick={onClose}
                className="w-full py-2.5 px-4 bg-stone-100 hover:bg-stone-200 text-stone-800 rounded-xl text-xs font-bold transition-colors cursor-pointer"
              >
                Done
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <div className="flex items-center gap-2 text-xs font-bold text-red-600 uppercase tracking-wider mb-1">
                <Clock className="w-4 h-4" />
                <span>30-Min Rapid Doorstep Dispatch</span>
              </div>
              <h3 className="text-lg sm:text-xl font-black text-stone-900 leading-tight">
                Book Verified Sathi Handyman
              </h3>
              <p className="text-xs text-stone-500 mt-0.5">
                Police-verified technicians in official Gharkasathi red uniform with calibrated diagnostic tools.
              </p>
            </div>

            {/* Service Selection */}
            <div>
              <label className="block text-xs font-bold text-stone-800 mb-1.5">Select Service</label>
              <div className="grid grid-cols-1 gap-1.5">
                {categories.map((c) => (
                  <div
                    key={c.id}
                    onClick={() => setCategory(c.id)}
                    className={`p-2.5 rounded-xl border text-left cursor-pointer transition-all flex items-center justify-between ${
                      category === c.id
                        ? 'bg-red-50 border-red-500 ring-1 ring-red-400'
                        : 'bg-stone-50 border-stone-200 hover:border-stone-300'
                    }`}
                  >
                    <span className="text-xs font-bold text-stone-900">{c.name}</span>
                    <span className="text-xs font-black text-red-600 font-mono">{c.price}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Customer Inputs */}
            <div className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-stone-800 mb-1">Full Name *</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g., Suman Verma"
                  className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl text-xs text-stone-900 focus:outline-hidden focus:border-red-500"
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
                  className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl text-xs text-stone-900 focus:outline-hidden focus:border-red-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-800 mb-1">Service Address ({selectedCity}) *</label>
                <input
                  type="text"
                  required
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="House No, Apartment, Street & Landmark"
                  className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl text-xs text-stone-900 focus:outline-hidden focus:border-red-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-800 mb-1">Brief Description of Issue</label>
                <input
                  type="text"
                  value={issueDescription}
                  onChange={(e) => setIssueDescription(e.target.value)}
                  placeholder="e.g., MCB tripping repeatedly in kitchen"
                  className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl text-xs text-stone-900 focus:outline-hidden focus:border-red-500"
                />
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
                Dispatch Sathi Now ({currentCat.price})
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
