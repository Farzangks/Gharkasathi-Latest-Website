import React, { useState } from 'react';
import { 
  X, 
  ChefHat, 
  Sparkles, 
  CheckCircle2, 
  Phone, 
  MessageCircle, 
  ShieldCheck, 
  Layers 
} from 'lucide-react';

interface ModularKitchenModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ModularKitchenModal: React.FC<ModularKitchenModalProps> = ({
  isOpen,
  onClose
}) => {
  const [layout, setLayout] = useState('l-shaped');
  const [finish, setFinish] = useState('acrylic');
  const [lengthFeet, setLengthFeet] = useState(12);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [isBooked, setIsBooked] = useState(false);

  if (!isOpen) return null;

  const layouts = [
    { id: 'l-shaped', name: 'L-Shaped Kitchen', multiplier: 1.0, desc: 'Ideal for most 2BHK/3BHK flats' },
    { id: 'u-shaped', name: 'U-Shaped Kitchen', multiplier: 1.3, desc: 'Maximum counter space & storage' },
    { id: 'parallel', name: 'Parallel Galley', multiplier: 1.15, desc: 'Dual working counters' },
    { id: 'island', name: 'Kitchen with Breakfast Island', multiplier: 1.5, desc: 'Luxury open layout' },
  ];

  const finishes = [
    { id: 'laminate', name: 'Anti-Scratch Matte Laminate', ratePerRft: 1450, desc: 'Merino / Century laminate' },
    { id: 'acrylic', name: 'High-Gloss Glass-Look Acrylic', ratePerRft: 1850, desc: 'Seamless mirror finish, easy clean' },
    { id: 'pu-paint', name: 'Italian PU Lacquered Paint', ratePerRft: 2400, desc: 'Ultra luxury seamless finish' },
  ];

  const selectedLayout = layouts.find(l => l.id === layout) || layouts[0];
  const selectedFinish = finishes.find(f => f.id === finish) || finishes[1];

  const estimatedCost = Math.round(lengthFeet * selectedFinish.ratePerRft * selectedLayout.multiplier);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsBooked(true);
  };

  const getWhatsAppUrl = () => {
    const text = `Hello Gharkasathi Modular Interiors Studio:\n\n` +
      `*Layout:* ${selectedLayout.name}\n` +
      `*Finish:* ${selectedFinish.name}\n` +
      `*Approx Running Feet:* ${lengthFeet} Rft\n` +
      `*Estimated Cost:* ₹${estimatedCost.toLocaleString('en-IN')}\n` +
      `*Customer:* ${name}\n\n` +
      `Please arrange an on-site laser measurement and free 3D CAD design.`;
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

        {isBooked ? (
          <div className="text-center py-6 space-y-4">
            <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-700 mx-auto flex items-center justify-center">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <div>
              <h3 className="text-xl font-black text-stone-900">3D Design Consultation Confirmed!</h3>
              <p className="text-xs text-stone-600 mt-1 max-w-sm mx-auto">
                Thank you, <strong>{name}</strong>. Our Interior Designer will visit with material finish swatches and a laser measurement kit on <strong>{phone}</strong>.
              </p>
            </div>

            <div className="p-3.5 bg-stone-50 rounded-2xl border border-stone-200 text-left text-xs space-y-1.5">
              <div className="flex justify-between text-stone-600">
                <span>Layout:</span>
                <span className="font-bold text-stone-900">{selectedLayout.name}</span>
              </div>
              <div className="flex justify-between text-stone-600">
                <span>Finish:</span>
                <span className="font-bold text-stone-900">{selectedFinish.name}</span>
              </div>
              <div className="flex justify-between text-stone-600">
                <span>Estimated Investment:</span>
                <span className="font-black text-emerald-600 font-mono">₹{estimatedCost.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between text-stone-600">
                <span>Hardware:</span>
                <span className="font-bold text-stone-900">Blum / Hettich Soft-Close (10-Yr Warranty)</span>
              </div>
            </div>

            <div className="pt-2 flex flex-col gap-2">
              <a
                href={getWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 px-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Receive 3D Designs on WhatsApp</span>
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
                <ChefHat className="w-4 h-4" />
                <span>Factory-Crafted Waterproof Modular Units</span>
              </div>
              <h3 className="text-lg sm:text-xl font-black text-stone-900 leading-tight">
                Modular Kitchen & Wardrobes Studio
              </h3>
              <p className="text-xs text-stone-500 mt-0.5">
                German Blum & Hettich fittings, waterproof HDHMR boards & 10-year termite warranty.
              </p>
            </div>

            {/* Layout Options */}
            <div>
              <label className="block text-xs font-bold text-stone-800 mb-1">Select Kitchen Shape</label>
              <div className="grid grid-cols-2 gap-2">
                {layouts.map((l) => (
                  <div
                    key={l.id}
                    onClick={() => setLayout(l.id)}
                    className={`p-2.5 rounded-xl border text-left cursor-pointer transition-all ${
                      layout === l.id
                        ? 'bg-red-50 border-red-500 ring-1 ring-red-400'
                        : 'bg-stone-50 border-stone-200 hover:border-stone-300'
                    }`}
                  >
                    <div className="text-xs font-bold text-stone-900">{l.name}</div>
                    <div className="text-[10px] text-stone-500">{l.desc}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Finish Options */}
            <div>
              <label className="block text-xs font-bold text-stone-800 mb-1">Surface Finish</label>
              <div className="grid grid-cols-1 gap-1.5">
                {finishes.map((f) => (
                  <div
                    key={f.id}
                    onClick={() => setFinish(f.id)}
                    className={`p-2.5 rounded-xl border text-left cursor-pointer transition-all flex items-center justify-between ${
                      finish === f.id
                        ? 'bg-red-50 border-red-500 ring-1 ring-red-400'
                        : 'bg-stone-50 border-stone-200 hover:border-stone-300'
                    }`}
                  >
                    <div>
                      <div className="text-xs font-bold text-stone-900">{f.name}</div>
                      <div className="text-[10px] text-stone-500">{f.desc}</div>
                    </div>
                    <span className="text-xs font-bold text-red-600 font-mono">₹{f.ratePerRft}/rft</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Counter Running Feet Slider & Cost */}
            <div className="p-3.5 bg-stone-50 rounded-2xl border border-stone-200 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-stone-800">Total Counter Length:</span>
                <span className="font-black text-stone-900 font-mono">{lengthFeet} Running Feet</span>
              </div>
              <input
                type="range"
                min="8"
                max="28"
                value={lengthFeet}
                onChange={(e) => setLengthFeet(Number(e.target.value))}
                className="w-full accent-red-600 cursor-pointer"
              />
              <div className="flex justify-between items-center pt-2 border-t border-stone-200 text-xs">
                <span className="text-stone-500">Estimated Turnkey Cost:</span>
                <span className="text-base font-black text-red-600 font-mono">
                  ₹{estimatedCost.toLocaleString('en-IN')}*
                </span>
              </div>
            </div>

            {/* Inputs */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-stone-800 mb-1">Your Name *</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g., Pooja Sharma"
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
                  placeholder="10-digit number"
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
                Book Free 3D Design Consultation
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
