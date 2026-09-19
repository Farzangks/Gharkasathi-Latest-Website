import React, { useState } from 'react';
import { 
  Building2, 
  Calculator, 
  Layers, 
  CheckCircle2, 
  Send, 
  Phone, 
  MessageCircle, 
  Calendar, 
  ShieldCheck, 
  TrendingUp, 
  FileText, 
  Sparkles,
  ChevronRight,
  Info,
  X
} from 'lucide-react';

export interface ConstructionBoqCalculatorProps {
  isOpen?: boolean;
  onClose?: () => void;
  selectedCity?: string;
}

interface BoqPackage {
  id: string;
  name: string;
  rate: number;
  badge: string;
  description: string;
  cement: string;
  steel: string;
  bricks: string;
  flooring: string;
  sanitary: string;
  electrical: string;
  paint: string;
  warranty: string;
}

const PACKAGES: Record<string, BoqPackage> = {
  standard: {
    id: 'standard',
    name: 'Standard Turnkey',
    rate: 1600,
    badge: 'Popular for Rentals & First Homes',
    description: 'High-strength structural civil engineering with durable branded fittings.',
    cement: 'UltraTech / Ambuja PPC (Grade 43/53)',
    steel: 'Jindal Panther / Prime Fe550D TMT',
    bricks: 'Kiln-fired red clay bricks (Class 1)',
    flooring: 'Kajaria / Somany Vitrified Tiles (2x2 ft)',
    sanitary: 'Jaquar Basic / Cera CP & Sanitaryware',
    electrical: 'Finolex / Havells FR wiring & Anchor Roma switches',
    paint: 'Asian Paints Tractor Emulsion (Internal) & Apex (External)',
    warranty: '3-Year Complete Structural Guarantee'
  },
  executive: {
    id: 'executive',
    name: 'Executive Premium',
    rate: 1800,
    badge: 'Best Value for Modern Families',
    description: 'Upgraded large-format tiles, modular kitchen carcass, and architectural false ceilings.',
    cement: 'UltraTech Super / ACC Concrete+',
    steel: 'Tata Tiscon / Jindal Panther Fe550D TMT',
    bricks: 'Autoclaved Aerated Concrete (AAC) Blocks or Red Bricks',
    flooring: 'Kajaria / Nitco GVT Vitrified Slabs (4x2 ft)',
    sanitary: 'Jaquar Florentine / Hindware Italian Collection',
    electrical: 'Havells / Polycab FRLS wiring & Legrand modular switches',
    paint: 'Asian Paints Royale Luxury Emulsion & Ultima Protek',
    warranty: '5-Year Structural & Waterproofing Warranty'
  },
  luxury: {
    id: 'luxury',
    name: 'Luxury Villa',
    rate: 2099,
    badge: 'Bespoke Architectural Residence',
    description: 'Italian marble, premium Kohler fittings, full modular interiors, and smart automation.',
    cement: 'UltraTech Weather Plus / Birla A1 Premium',
    steel: 'Tata Tiscon 550SD Super Ductile Earthquake-Resistant',
    bricks: 'Wire-cut high-density bricks & thermal AAC blocks',
    flooring: 'Italian Botticino / Nexion High-End Glazed Slabs (6x4 ft)',
    sanitary: 'Kohler / Grohe Thermostatic Diverters & Wall-Hung WCs',
    electrical: 'Schneider / Crabtree Smart Home Automation ready',
    paint: 'Asian Paints Royale Aspira & PU Italian Wood Polish',
    warranty: '10-Year Structural, Anti-Termite & RCC Guarantee'
  }
};

export const ConstructionBoqCalculator: React.FC<ConstructionBoqCalculatorProps> = ({
  isOpen = true,
  onClose,
  selectedCity = 'Raipur'
}) => {
  const [selectedPackageKey, setSelectedPackageKey] = useState<string>('standard');
  const [plotArea, setPlotArea] = useState<number>(1500);
  const [floorType, setFloorType] = useState<string>('g1'); // 'g', 'g1', 'g2', 'g3'
  const [groundCoverage, setGroundCoverage] = useState<number>(80); // percentage
  const [leadName, setLeadName] = useState('');
  const [leadPhone, setLeadPhone] = useState('');
  const [leadCity, setLeadCity] = useState(selectedCity);
  const [bookingSubmitted, setBookingSubmitted] = useState(false);

  // If used as a modal and closed, return null
  if (!isOpen) return null;


  // Multiplier for floors
  const floorMultipliers: Record<string, { label: string; count: number; name: string }> = {
    g: { label: 'Ground Floor Only (G)', count: 1, name: 'Single Level Bungalow' },
    g1: { label: 'Duplex (Ground + 1st Floor)', count: 2, name: 'Most Popular Duplex' },
    g2: { label: 'Triplex (Ground + 2 Floors)', count: 3, name: 'Large Joint Family Triplex' },
    g3: { label: 'G + 3 Floors (Rental / Builder)', count: 4, name: 'Multi-Unit Builder Floor' },
  };

  const currentFloor = floorMultipliers[floorType] || floorMultipliers.g1;
  const pkg = PACKAGES[selectedPackageKey] || PACKAGES.standard;

  // Calculations
  const groundBuiltup = Math.round(plotArea * (groundCoverage / 100));
  const upperFloorBuiltup = Math.round(groundBuiltup * 0.95); // slightly smaller or equal upper floors
  const totalBuiltupArea = groundBuiltup + upperFloorBuiltup * (currentFloor.count - 1);
  const totalCost = totalBuiltupArea * pkg.rate;

  // Material BOQ Estimates (Civil Engineering standard rules of thumb)
  const cementBags = Math.round(totalBuiltupArea * 0.40); // 0.40 bags / sq.ft
  const steelTonnes = Number((totalBuiltupArea * 0.0038).toFixed(2)); // ~3.8 kg / sq.ft = 0.0038 MT
  const bricksCount = Math.round(totalBuiltupArea * 19); // ~19 bricks / sq.ft
  const sandCuFt = Math.round(totalBuiltupArea * 1.8);
  const tileSqFt = Math.round(totalBuiltupArea * 1.25); // flooring + skirting + bathroom dados

  // Cost breakdowns
  const rccStructureCost = Math.round(totalCost * 0.54);
  const finishingCost = Math.round(totalCost * 0.32);
  const servicesPlumbingCost = Math.round(totalCost * 0.14);

  // Timeline
  const timelineMonths = currentFloor.count === 1 ? '5 - 6 Months' : currentFloor.count === 2 ? '7 - 9 Months' : '10 - 12 Months';

  const generateWhatsAppMessage = () => {
    const text = `Hello Gharkasathi Engineering Office, I am interested in Turnkey Construction:\n\n` +
      `*Package:* ${pkg.name} (@ ₹${pkg.rate}/sq.ft)\n` +
      `*Plot Area:* ${plotArea} Sq.Ft (${Math.round(plotArea / 9)} Gaj)\n` +
      `*Floors:* ${currentFloor.label}\n` +
      `*Estimated Built-up:* ${totalBuiltupArea.toLocaleString('en-IN')} Sq.Ft\n` +
      `*Total Estimated Cost:* ₹${totalCost.toLocaleString('en-IN')}\n` +
      `*City:* ${leadCity}\n\n` +
      `Please arrange a free soil test and 3D architectural plan consultation.`;
    return `https://wa.me/917770999122?text=${encodeURIComponent(text)}`;
  };

  const handleLeadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!leadPhone || leadPhone.length < 10) return;
    setBookingSubmitted(true);
  };

  const content = (
    <div className="bg-white rounded-3xl border border-stone-200 shadow-xl overflow-hidden">
      {/* Modal / Section Header */}
      <div className="p-6 sm:p-8 bg-stone-50 border-b border-stone-200 flex items-start justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-50 border border-red-200 text-red-700 text-xs font-bold mb-2">
            <Calculator className="w-3.5 h-3.5" />
            <span>Interactive Civil Engineering Cost Engine &amp; Bill of Quantities (BOQ)</span>
          </div>
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-black text-stone-900 tracking-tight">
            Calculate Exact Plot Construction Cost in {leadCity}
          </h2>
          <p className="text-xs sm:text-sm text-stone-600 mt-1 leading-relaxed">
            Transparent pricing per square foot with itemized cement, steel, bricks, and milestone schedules. Backed by Gharkasathi structural warranty.
          </p>
        </div>
        {onClose && (
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-stone-200/80 hover:bg-red-600 hover:text-white text-stone-600 flex items-center justify-center transition-colors cursor-pointer shrink-0"
            title="Close"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Main 2-Column Calculator Box */}
      <div className="overflow-hidden grid grid-cols-1 lg:grid-cols-12">

          {/* Left Column: Inputs & Package Selector */}
          <div className="lg:col-span-7 p-6 sm:p-8 space-y-6">
            {/* Step 1: Select Package */}
            <div>
              <label className="block text-xs font-black uppercase tracking-wider text-stone-700 mb-2.5">
                Step 1: Choose Specification Package & Rate
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {Object.values(PACKAGES).map((p) => {
                  const isSelected = selectedPackageKey === p.id;
                  return (
                    <div
                      key={p.id}
                      onClick={() => setSelectedPackageKey(p.id)}
                      className={`p-3.5 rounded-2xl border text-left cursor-pointer transition-all flex flex-col justify-between ${
                        isSelected
                          ? 'bg-red-50/70 border-red-600 ring-2 ring-red-500/20 shadow-xs'
                          : 'bg-stone-50 border-stone-200 hover:border-stone-300'
                      }`}
                    >
                      <div>
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-xs text-stone-900">{p.name}</span>
                          {isSelected && <CheckCircle2 className="w-4 h-4 text-red-600" />}
                        </div>
                        <div className="text-lg font-black text-red-600 font-mono mt-1">
                          ₹{p.rate}
                          <span className="text-[10px] text-stone-500 font-normal"> / sq.ft</span>
                        </div>
                        <p className="text-[10px] text-stone-500 mt-1 line-clamp-2 leading-relaxed">
                          {p.description}
                        </p>
                      </div>
                      <div className="mt-2 pt-2 border-t border-stone-200/60 text-[10px] text-stone-600 font-medium">
                        🛡️ {p.warranty}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Step 2: Plot Area & Dimensions */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-xs font-black uppercase tracking-wider text-stone-700">
                  Step 2: Total Plot Size (Land Registry Area)
                </label>
                <div className="text-right">
                  <span className="text-base font-black text-red-600 font-mono">
                    {plotArea.toLocaleString('en-IN')} Sq.Ft
                  </span>
                  <span className="text-[11px] text-stone-500 block">
                    (~{Math.round(plotArea / 9)} Gaj / Sq.Yards)
                  </span>
                </div>
              </div>

              {/* Quick Dimension Chips */}
              <div className="flex flex-wrap items-center gap-2">
                {[
                  { label: '30×40 (1,200 sq.ft)', val: 1200 },
                  { label: '30×50 (1,500 sq.ft)', val: 1500 },
                  { label: '40×50 (2,000 sq.ft)', val: 2000 },
                  { label: '40×60 (2,400 sq.ft)', val: 2400 },
                  { label: '50×60 (3,000 sq.ft)', val: 3000 },
                ].map((chip) => (
                  <button
                    key={chip.val}
                    type="button"
                    onClick={() => setPlotArea(chip.val)}
                    className={`px-3 py-1 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                      plotArea === chip.val
                        ? 'bg-stone-900 text-white'
                        : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                    }`}
                  >
                    {chip.label}
                  </button>
                ))}
              </div>

              <input
                type="range"
                min="600"
                max="5000"
                step="50"
                value={plotArea}
                onChange={(e) => setPlotArea(Number(e.target.value))}
                className="w-full accent-red-600 cursor-pointer"
              />

              <div className="flex justify-between text-[10px] text-stone-400 font-mono">
                <span>600 Sq.Ft (Gaj 66)</span>
                <span>1,500 Sq.Ft (Gaj 166)</span>
                <span>2,500 Sq.Ft (Gaj 277)</span>
                <span>5,000 Sq.Ft (Gaj 555)</span>
              </div>
            </div>

            {/* Step 3: Number of Floors */}
            <div>
              <label className="block text-xs font-black uppercase tracking-wider text-stone-700 mb-2">
                Step 3: Number of Floors to Construct
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                {Object.entries(floorMultipliers).map(([key, f]) => (
                  <button
                    key={key}
                    type="button"
                    onClick={() => setFloorType(key)}
                    className={`p-3 rounded-xl border text-center transition-all cursor-pointer ${
                      floorType === key
                        ? 'bg-stone-900 text-white border-stone-900 shadow-xs'
                        : 'bg-stone-50 text-stone-800 border-stone-200 hover:bg-stone-100'
                    }`}
                  >
                    <div className="text-xs font-bold">{f.label}</div>
                    <div className={`text-[10px] mt-0.5 ${floorType === key ? 'text-stone-300' : 'text-stone-500'}`}>
                      {f.count} Floor{f.count > 1 ? 's' : ''}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Package Specifications Accordion/Box */}
            <div className="p-4 bg-stone-50 rounded-2xl border border-stone-200 space-y-2">
              <span className="text-[11px] font-bold text-stone-800 uppercase tracking-wider block">
                Brand Specifications Included in {pkg.name} (₹{pkg.rate}/sq.ft):
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-stone-700">
                <div className="flex items-start gap-1.5">
                  <span className="font-bold text-stone-900 shrink-0">Cement:</span>
                  <span className="text-stone-600">{pkg.cement}</span>
                </div>
                <div className="flex items-start gap-1.5">
                  <span className="font-bold text-stone-900 shrink-0">Steel (TMT):</span>
                  <span className="text-stone-600">{pkg.steel}</span>
                </div>
                <div className="flex items-start gap-1.5">
                  <span className="font-bold text-stone-900 shrink-0">Flooring:</span>
                  <span className="text-stone-600">{pkg.flooring}</span>
                </div>
                <div className="flex items-start gap-1.5">
                  <span className="font-bold text-stone-900 shrink-0">Sanitaryware:</span>
                  <span className="text-stone-600">{pkg.sanitary}</span>
                </div>
                <div className="flex items-start gap-1.5">
                  <span className="font-bold text-stone-900 shrink-0">Wiring:</span>
                  <span className="text-stone-600">{pkg.electrical}</span>
                </div>
                <div className="flex items-start gap-1.5">
                  <span className="font-bold text-stone-900 shrink-0">Painting:</span>
                  <span className="text-stone-600">{pkg.paint}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Live BOQ Breakdown & Instant Export in Greyish / Red-White Theme */}
          <div className="lg:col-span-5 bg-gradient-to-b from-stone-50 via-white to-red-50/30 text-stone-900 p-6 sm:p-8 flex flex-col justify-between space-y-6 border-t lg:border-t-0 lg:border-l border-stone-200">
            <div>
              {/* Card Header */}
              <div className="flex items-center justify-between pb-3 border-b border-stone-200">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-black uppercase tracking-wider text-red-700">
                    Engineering BOQ Summary
                  </span>
                </div>
                <span className="text-[10px] font-bold font-mono text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                  Fixed Rate Lock
                </span>
              </div>

              {/* Total Area & Investment */}
              <div className="mt-4 p-4 bg-white rounded-2xl border-2 border-red-100 shadow-xs space-y-2">
                <div className="flex items-center justify-between text-xs text-stone-600">
                  <span>Total Built-Up Area:</span>
                  <span className="font-mono font-bold text-stone-900 text-sm">
                    {totalBuiltupArea.toLocaleString('en-IN')} Sq.Ft
                  </span>
                </div>
                <div className="flex items-center justify-between text-xs text-stone-600">
                  <span>Base Package Rate:</span>
                  <span className="font-mono font-bold text-stone-900">
                    ₹{pkg.rate} / Sq.Ft
                  </span>
                </div>
                <div className="flex items-center justify-between text-xs text-stone-600">
                  <span>Estimated Completion:</span>
                  <span className="font-bold text-amber-700">
                    {timelineMonths}
                  </span>
                </div>

                <div className="pt-3 border-t border-stone-100">
                  <span className="text-[11px] font-bold text-stone-500 uppercase tracking-wider block">Total Turnkey Budget:</span>
                  <span className="text-3xl font-black text-red-600 font-mono tracking-tight">
                    ₹{totalCost.toLocaleString('en-IN')}
                  </span>
                  <span className="text-[11px] text-stone-500 font-medium block mt-0.5">
                    (₹{(totalCost / 100000).toFixed(2)} Lakhs All-Inclusive)
                  </span>
                </div>
              </div>

              {/* Material Quantification BOQ */}
              <div className="mt-4 space-y-2">
                <span className="text-[11px] font-bold text-stone-600 uppercase tracking-wider block">
                  Key Material Quantities (Estimated):
                </span>

                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="p-2.5 bg-white rounded-xl border border-stone-200 shadow-2xs">
                    <span className="text-stone-500 block text-[10px] font-medium">Cement Bags</span>
                    <span className="font-bold text-stone-900 font-mono">{cementBags.toLocaleString()} Bags</span>
                  </div>
                  <div className="p-2.5 bg-white rounded-xl border border-stone-200 shadow-2xs">
                    <span className="text-stone-500 block text-[10px] font-medium">TMT Steel (Fe550D)</span>
                    <span className="font-bold text-stone-900 font-mono">{steelTonnes} Metric Ton</span>
                  </div>
                  <div className="p-2.5 bg-white rounded-xl border border-stone-200 shadow-2xs">
                    <span className="text-stone-500 block text-[10px] font-medium">Bricks / Blocks</span>
                    <span className="font-bold text-stone-900 font-mono">{bricksCount.toLocaleString()} Nos</span>
                  </div>
                  <div className="p-2.5 bg-white rounded-xl border border-stone-200 shadow-2xs">
                    <span className="text-stone-500 block text-[10px] font-medium">Tiles & Dados</span>
                    <span className="font-bold text-stone-900 font-mono">{tileSqFt.toLocaleString()} Sq.Ft</span>
                  </div>
                </div>
              </div>

              {/* Milestone Schedule */}
              <div className="mt-4 p-3 bg-stone-100/80 rounded-xl border border-stone-200 text-[11px] space-y-1.5 text-stone-700">
                <span className="font-bold text-stone-900 block text-xs">Milestone Payment Schedule:</span>
                <div className="flex justify-between"><span>1. Plinth / Foundation:</span> <span className="font-mono text-stone-900 font-semibold">15%</span></div>
                <div className="flex justify-between"><span>2. Ground Floor Slab:</span> <span className="font-mono text-stone-900 font-semibold">20%</span></div>
                <div className="flex justify-between"><span>3. Upper Slab & Roof:</span> <span className="font-mono text-stone-900 font-semibold">20%</span></div>
                <div className="flex justify-between"><span>4. Brickwork & Plaster:</span> <span className="font-mono text-stone-900 font-semibold">15%</span></div>
                <div className="flex justify-between"><span>5. Flooring & Finishing:</span> <span className="font-mono text-stone-900 font-semibold">15%</span></div>
                <div className="flex justify-between"><span>6. Griha Pravesh & Handover:</span> <span className="font-mono text-emerald-700 font-bold">15%</span></div>
              </div>
            </div>

            {/* Actions: Send to WhatsApp & Direct Booking */}
            <div className="space-y-3 pt-2">
              <a
                href={generateWhatsAppMessage()}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Share BOQ Estimate on WhatsApp</span>
              </a>

              {bookingSubmitted ? (
                <div className="p-3 bg-emerald-50 border border-emerald-300 rounded-xl text-xs text-emerald-800 text-center font-medium">
                  ✅ Consultation requested! Chief Civil Engineer will call {leadPhone} within 30 mins.
                </div>
              ) : (
                <form onSubmit={handleLeadSubmit} className="flex gap-2">
                  <input
                    type="tel"
                    required
                    pattern="[0-9]{10}"
                    value={leadPhone}
                    onChange={(e) => setLeadPhone(e.target.value)}
                    placeholder="Enter 10-digit mobile number"
                    className="flex-1 px-3 py-2 bg-white border border-stone-300 rounded-xl text-xs text-stone-900 placeholder-stone-400 focus:outline-hidden focus:border-red-500"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-xl text-xs font-bold transition-colors cursor-pointer shrink-0 shadow-xs"
                  >
                    Lock Estimate
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
  );

  if (onClose) {
    return (
      <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-in fade-in overflow-y-auto">
        <div className="w-full max-w-6xl max-h-[92vh] overflow-y-auto rounded-3xl">
          {content}
        </div>
      </div>
    );
  }

  return (
    <section id="turnkey-boq-calculator" className="py-12 bg-stone-100 border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {content}
      </div>
    </section>
  );
};

