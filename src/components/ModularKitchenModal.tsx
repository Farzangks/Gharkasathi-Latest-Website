import React, { useState } from 'react';
import { 
  X, 
  ChefHat, 
  Sparkles, 
  CheckCircle2, 
  Building2,
  Home,
  Briefcase,
  Layers, 
  ShieldCheck,
  Phone,
  MessageCircle,
  FileCheck,
  Clock,
  ArrowRight
} from 'lucide-react';

interface ModularKitchenModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedCity?: string;
}

type InteriorTab = 'full-residential' | 'full-commercial' | 'modular-kitchen';

export const ModularKitchenModal: React.FC<ModularKitchenModalProps> = ({
  isOpen,
  onClose,
  selectedCity = 'Raipur'
}) => {
  const [activeTab, setActiveTab] = useState<InteriorTab>('full-residential');

  // Modular Kitchen State
  const [kitchenLayout, setKitchenLayout] = useState('l-shaped');
  const [kitchenFinish, setKitchenFinish] = useState('acrylic');
  const [kitchenLengthFeet, setKitchenLengthFeet] = useState(12);

  // Full Residential Interior State
  const [resBhkType, setResBhkType] = useState('3bhk');
  const [resPackage, setResPackage] = useState('luxury');
  const [resCarpetArea, setResCarpetArea] = useState(1350);

  // Full Commercial Interior State
  const [commType, setCommType] = useState('office');
  const [commAreaSqft, setCommAreaSqft] = useState(2000);
  const [commGrade, setCommGrade] = useState('premium');

  // Contact Form State
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [isBooked, setIsBooked] = useState(false);

  if (!isOpen) return null;

  // Kitchen Presets
  const kitchenLayouts = [
    { id: 'l-shaped', name: 'L-Shaped Kitchen', multiplier: 1.0, desc: 'Ideal for most 2BHK/3BHK flats' },
    { id: 'u-shaped', name: 'U-Shaped Kitchen', multiplier: 1.3, desc: 'Maximum counter space & storage' },
    { id: 'parallel', name: 'Parallel Galley', multiplier: 1.15, desc: 'Dual working counters' },
    { id: 'island', name: 'Kitchen with Breakfast Island', multiplier: 1.5, desc: 'Luxury open layout' },
  ];

  const kitchenFinishes = [
    { id: 'laminate', name: 'Anti-Scratch Matte Laminate', ratePerRft: 1450, desc: 'Merino / Century laminate' },
    { id: 'acrylic', name: 'High-Gloss Glass-Look Acrylic', ratePerRft: 1850, desc: 'Seamless mirror finish, easy clean' },
    { id: 'pu-paint', name: 'Italian PU Lacquered Paint', ratePerRft: 2400, desc: 'Ultra luxury seamless finish' },
  ];

  // Full Residential Interior Packages (Turnkey per sq.ft carpet or flat rate)
  const resPackages: Record<string, { name: string; ratePerSqft: number; badge: string; includes: string[] }> = {
    essential: {
      name: 'Essential Home Interior',
      ratePerSqft: 950,
      badge: 'Budget Friendly',
      includes: [
        'Modular Kitchen in HDHMR with SS304 baskets',
        'Master & Guest Bedroom 7-ft Wardrobes (Commercial Ply)',
        'Living Room TV Unit & Entrance Shoe Rack',
        'Basic False Ceiling with Warm White LED Coves',
        'Asian Paints Royale Emulsion on all walls'
      ]
    },
    luxury: {
      name: 'Luxury Turnkey Residential',
      ratePerSqft: 1450,
      badge: 'Most Popular',
      includes: [
        'Premium Acrylic Modular Kitchen with Blum Soft-Close Hinges',
        'Floor-to-Ceiling 9-ft Wardrobes with Fluted Paneling & Profile LED',
        'Designer Gyproc Gypsum False Ceiling in all rooms',
        'Accent Wall Charcoal Louvers / Veneer Paneling in Living Area',
        'Italian PU Polish Door Finishes & Quartz Kitchen Countertop',
        '10-Year Comprehensive Anti-Termite & Hardware Warranty'
      ]
    },
    ultra: {
      name: 'Ultra Elite Signature Villa Interior',
      ratePerSqft: 2100,
      badge: 'Bespoke Craftsmanship',
      includes: [
        'Italian PU Lacquered Glass-front Modular Kitchen with Pantry Pullout',
        'Walk-in Closets with Sensor Lighting and Tinted Glass Shutters',
        'Full Automation & Smart Ambient Lighting integration',
        'Curated Italian Marble Cladding & Onyx Stone Backlit Features',
        'Custom High-Density Foam Upholstery & Bespoke Furniture Handcrafted',
        'Dedicated Senior Architect & Daily WhatsApp Progress Log'
      ]
    }
  };

  // Commercial Interior Packages
  const commPackages: Record<string, { name: string; ratePerSqft: number; desc: string; deliverables: string[] }> = {
    standard: {
      name: 'Standard Retail & Clinic Interior',
      ratePerSqft: 850,
      desc: 'Optimized for doctor clinics, grocery shops, and retail showrooms.',
      deliverables: ['Commercial grade vitrified flooring', 'Modular cash counter & display racks', 'Grid acoustic ceiling & 40W panel lights', 'Brand logo wall and acrylic glow sign facade']
    },
    premium: {
      name: 'Corporate Office & Coworking Fit-Out',
      ratePerSqft: 1350,
      desc: 'Full turnkey office with manager cabins, workstations, conference room & pantry.',
      deliverables: ['12mm toughened glass partitions with acoustic seals', 'Modular ergonomic workstations with wire management', 'Executive cabin desk with credenza & leatherette finishes', 'Boardroom video-conferencing acoustics & magnetic whiteboard wall', 'HVAC ducting & fire sprinkler compliance layout']
    },
    lounge: {
      name: 'Fine Dining Restaurant / Cafe Lounge',
      ratePerSqft: 1750,
      desc: 'Instagrammable aesthetic themes, acoustic dampening, commercial kitchen ventilation.',
      deliverables: ['Theme lighting, warm neo-bistro pendants & track lights', 'Heavy-duty industrial grease-trap commercial kitchen civil setup', 'Custom booth seating, banquettes, and terrazzo bar counter', 'Audio-visual cable routing & client restroom luxury sanitary fittings']
    }
  };

  const selectedKitchenLayout = kitchenLayouts.find(l => l.id === kitchenLayout) || kitchenLayouts[0];
  const selectedKitchenFinish = kitchenFinishes.find(f => f.id === kitchenFinish) || kitchenFinishes[1];
  const kitchenEstimatedCost = Math.round(kitchenLengthFeet * selectedKitchenFinish.ratePerRft * selectedKitchenLayout.multiplier);

  const activeResPkg = resPackages[resPackage] || resPackages.luxury;
  const resEstimatedCost = Math.round(resCarpetArea * activeResPkg.ratePerSqft);

  const activeCommPkg = commPackages[commGrade] || commPackages.premium;
  const commEstimatedCost = Math.round(commAreaSqft * activeCommPkg.ratePerSqft);

  const getActiveEstimatedCost = () => {
    if (activeTab === 'modular-kitchen') return kitchenEstimatedCost;
    if (activeTab === 'full-residential') return resEstimatedCost;
    return commEstimatedCost;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!phone || phone.length < 10) return;
    setIsBooked(true);
  };

  const getWhatsAppUrl = () => {
    let details = '';
    if (activeTab === 'modular-kitchen') {
      details = `*Category:* Modular Kitchen Studio\n*Layout:* ${selectedKitchenLayout.name}\n*Finish:* ${selectedKitchenFinish.name}\n*Size:* ${kitchenLengthFeet} Running Feet\n*Estimated Cost:* ₹${kitchenEstimatedCost.toLocaleString('en-IN')}`;
    } else if (activeTab === 'full-residential') {
      details = `*Category:* Full Home Residential Interior\n*Package:* ${activeResPkg.name}\n*BHK:* ${resBhkType.toUpperCase()} (~${resCarpetArea} sq.ft)\n*Estimated Cost:* ₹${resEstimatedCost.toLocaleString('en-IN')}`;
    } else {
      details = `*Category:* Full Commercial Fit-Out\n*Type:* ${commType.toUpperCase()}\n*Package:* ${activeCommPkg.name} (${commAreaSqft} sq.ft)\n*Estimated Cost:* ₹${commEstimatedCost.toLocaleString('en-IN')}`;
    }

    const text = `Hello Gharkasathi Interior & Architecture Studio:\n\n${details}\n*Customer:* ${name || 'Customer'}\n*Phone:* ${phone}\n*City:* ${selectedCity}\n\nPlease arrange a free site inspection, laser measurement & 3D layout consultation.`;
    return `https://wa.me/917770999122?text=${encodeURIComponent(text)}`;
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-4xl w-full p-5 sm:p-7 shadow-2xl relative space-y-5 animate-in fade-in zoom-in-95 max-h-[94vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-9 h-9 rounded-full bg-stone-100 text-stone-600 flex items-center justify-center hover:bg-red-600 hover:text-white transition-colors cursor-pointer z-10"
          title="Close"
        >
          <X className="w-5 h-5" />
        </button>

        {isBooked ? (
          <div className="text-center py-8 space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 mx-auto flex items-center justify-center">
              <CheckCircle2 className="w-9 h-9" />
            </div>

            <div>
              <h3 className="text-2xl font-black text-stone-900">Interior Consultation Confirmed!</h3>
              <p className="text-sm text-stone-600 mt-1 max-w-md mx-auto">
                Thank you, <strong>{name}</strong>. Our Senior Interior Designer will contact you at <strong>{phone}</strong> to schedule a site laser measurement and 3D architectural plan session in <strong>{selectedCity}</strong>.
              </p>
            </div>

            <div className="p-4 bg-stone-50 rounded-2xl border border-stone-200 text-left text-xs sm:text-sm space-y-2 max-w-lg mx-auto">
              <div className="flex justify-between text-stone-600">
                <span>Selected Service:</span>
                <span className="font-bold text-stone-900">
                  {activeTab === 'modular-kitchen' ? 'Modular Kitchen Studio' : activeTab === 'full-residential' ? activeResPkg.name : activeCommPkg.name}
                </span>
              </div>
              <div className="flex justify-between text-stone-600">
                <span>Estimated Investment:</span>
                <span className="font-black text-emerald-600 font-mono text-base">₹{getActiveEstimatedCost().toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between text-stone-600">
                <span>Warranty & Quality:</span>
                <span className="font-bold text-stone-900">10-Yr Termite & Blum Hardware Warranty</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
              <a
                href={getWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto py-2.5 px-6 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-all flex items-center justify-center gap-2 shadow-sm"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Chat with Interior Designer on WhatsApp</span>
              </a>
              <button
                onClick={onClose}
                className="w-full sm:w-auto py-2.5 px-6 bg-stone-100 hover:bg-stone-200 text-stone-800 rounded-xl text-xs font-bold transition-colors cursor-pointer"
              >
                Done
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Modal Header */}
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-50 border border-red-200 text-red-700 text-xs font-bold mb-2">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Turnkey Interior Architecture Studio &bull; {selectedCity}</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-stone-900 leading-tight">
                Design Your Space: Full Interior & Modular Packages
              </h3>
              <p className="text-xs sm:text-sm text-stone-500 mt-1">
                From complete residential home interiors to corporate commercial fit-outs and factory-crafted modular kitchens.
              </p>
            </div>

            {/* Top Interior Mode Tabs */}
            <div className="grid grid-cols-3 gap-2 bg-stone-100 p-1.5 rounded-2xl border border-stone-200">
              <button
                type="button"
                onClick={() => setActiveTab('full-residential')}
                className={`py-2 px-2.5 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-all cursor-pointer ${
                  activeTab === 'full-residential'
                    ? 'bg-red-600 text-white shadow-sm font-black'
                    : 'text-stone-700 hover:text-stone-900 hover:bg-stone-200/60'
                }`}
              >
                <Home className="w-4 h-4 shrink-0" />
                <span className="truncate">Full Home Residential</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('full-commercial')}
                className={`py-2 px-2.5 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-all cursor-pointer ${
                  activeTab === 'full-commercial'
                    ? 'bg-red-600 text-white shadow-sm font-black'
                    : 'text-stone-700 hover:text-stone-900 hover:bg-stone-200/60'
                }`}
              >
                <Briefcase className="w-4 h-4 shrink-0" />
                <span className="truncate">Full Commercial Fit-Out</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('modular-kitchen')}
                className={`py-2 px-2.5 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-all cursor-pointer ${
                  activeTab === 'modular-kitchen'
                    ? 'bg-red-600 text-white shadow-sm font-black'
                    : 'text-stone-700 hover:text-stone-900 hover:bg-stone-200/60'
                }`}
              >
                <ChefHat className="w-4 h-4 shrink-0" />
                <span className="truncate">Modular Kitchen Only</span>
              </button>
            </div>

            {/* TAB 1: FULL HOME RESIDENTIAL INTERIOR */}
            {activeTab === 'full-residential' && (
              <div className="space-y-4 animate-in fade-in">
                {/* Step 1: Apartment/Villa Size */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-stone-800 mb-1.5">Apartment / House Size</label>
                    <div className="grid grid-cols-4 gap-1.5">
                      {[
                        { id: '1bhk', name: '1 BHK', defaultArea: 650 },
                        { id: '2bhk', name: '2 BHK', defaultArea: 1050 },
                        { id: '3bhk', name: '3 BHK', defaultArea: 1450 },
                        { id: '4bhk-villa', name: '4BHK / Villa', defaultArea: 2400 },
                      ].map(bhk => (
                        <button
                          type="button"
                          key={bhk.id}
                          onClick={() => {
                            setResBhkType(bhk.id);
                            setResCarpetArea(bhk.defaultArea);
                          }}
                          className={`py-2 px-1 text-center rounded-xl border text-xs font-bold cursor-pointer transition-all ${
                            resBhkType === bhk.id
                              ? 'bg-red-50 border-red-600 text-red-600 ring-1 ring-red-500'
                              : 'bg-stone-50 border-stone-200 text-stone-700 hover:border-stone-300'
                          }`}
                        >
                          {bhk.name}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <label className="text-xs font-bold text-stone-800">Carpet Area:</label>
                      <span className="text-xs font-black text-stone-900 font-mono">{resCarpetArea} Sq.Ft</span>
                    </div>
                    <input
                      type="range"
                      min="500"
                      max="4000"
                      step="50"
                      value={resCarpetArea}
                      onChange={(e) => setResCarpetArea(Number(e.target.value))}
                      className="w-full accent-red-600 cursor-pointer"
                    />
                    <div className="flex justify-between text-[10px] text-stone-400 mt-1">
                      <span>500 sq.ft</span>
                      <span>4,000 sq.ft</span>
                    </div>
                  </div>
                </div>

                {/* Step 2: Choose Residential Interior Package (Just like civil packages) */}
                <div>
                  <label className="block text-xs font-bold text-stone-800 mb-1.5">Select Residential Turnkey Package</label>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    {Object.entries(resPackages).map(([key, pkg]) => {
                      const isSelected = resPackage === key;
                      const pkgCost = Math.round(resCarpetArea * pkg.ratePerSqft);
                      return (
                        <div
                          key={key}
                          onClick={() => setResPackage(key)}
                          className={`p-3.5 rounded-2xl border cursor-pointer transition-all flex flex-col justify-between ${
                            isSelected
                              ? 'bg-red-50/50 border-red-600 ring-1 ring-red-500 shadow-xs'
                              : 'bg-stone-50 border-stone-200 hover:border-stone-300'
                          }`}
                        >
                          <div>
                            <div className="flex items-center justify-between mb-1">
                              <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-red-100 text-red-700">
                                {pkg.badge}
                              </span>
                              <span className="text-xs font-mono font-bold text-stone-700">₹{pkg.ratePerSqft}/sq.ft</span>
                            </div>
                            <h4 className="text-sm font-black text-stone-900 mt-1">{pkg.name}</h4>
                            <div className="text-base font-black text-red-600 font-mono mt-1">
                              ₹{pkgCost.toLocaleString('en-IN')}*
                            </div>
                            <ul className="mt-2.5 space-y-1 text-[11px] text-stone-600">
                              {pkg.includes.map((inc, i) => (
                                <li key={i} className="flex items-start gap-1.5">
                                  <span className="text-red-500 font-bold mt-0.5">•</span>
                                  <span>{inc}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}

            {/* TAB 2: FULL COMMERCIAL INTERIOR FIT-OUT */}
            {activeTab === 'full-commercial' && (
              <div className="space-y-4 animate-in fade-in">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-stone-800 mb-1.5">Commercial Establishment Type</label>
                    <div className="grid grid-cols-3 gap-1.5">
                      {[
                        { id: 'office', name: 'Corporate Office' },
                        { id: 'retail', name: 'Retail / Showroom' },
                        { id: 'restaurant', name: 'Cafe / Restaurant' },
                      ].map(t => (
                        <button
                          type="button"
                          key={t.id}
                          onClick={() => setCommType(t.id)}
                          className={`py-2 px-1 text-center rounded-xl border text-xs font-bold cursor-pointer transition-all ${
                            commType === t.id
                              ? 'bg-red-50 border-red-600 text-red-600 ring-1 ring-red-500'
                              : 'bg-stone-50 border-stone-200 text-stone-700 hover:border-stone-300'
                          }`}
                        >
                          {t.name}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <label className="text-xs font-bold text-stone-800">Commercial Built-Up Area:</label>
                      <span className="text-xs font-black text-stone-900 font-mono">{commAreaSqft} Sq.Ft</span>
                    </div>
                    <input
                      type="range"
                      min="500"
                      max="10000"
                      step="100"
                      value={commAreaSqft}
                      onChange={(e) => setCommAreaSqft(Number(e.target.value))}
                      className="w-full accent-red-600 cursor-pointer"
                    />
                    <div className="flex justify-between text-[10px] text-stone-400 mt-1">
                      <span>500 sq.ft</span>
                      <span>10,000 sq.ft</span>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-800 mb-1.5">Select Commercial Fit-Out Grade</label>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    {Object.entries(commPackages).map(([key, pkg]) => {
                      const isSelected = commGrade === key;
                      const pkgCost = Math.round(commAreaSqft * pkg.ratePerSqft);
                      return (
                        <div
                          key={key}
                          onClick={() => setCommGrade(key)}
                          className={`p-3.5 rounded-2xl border cursor-pointer transition-all flex flex-col justify-between ${
                            isSelected
                              ? 'bg-red-50/50 border-red-600 ring-1 ring-red-500 shadow-xs'
                              : 'bg-stone-50 border-stone-200 hover:border-stone-300'
                          }`}
                        >
                          <div>
                            <div className="flex items-center justify-between mb-1">
                              <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-stone-200 text-stone-800">
                                Commercial
                              </span>
                              <span className="text-xs font-mono font-bold text-stone-700">₹{pkg.ratePerSqft}/sq.ft</span>
                            </div>
                            <h4 className="text-sm font-black text-stone-900 mt-1">{pkg.name}</h4>
                            <p className="text-[11px] text-stone-500 mt-1">{pkg.desc}</p>
                            <div className="text-base font-black text-red-600 font-mono mt-1">
                              ₹{pkgCost.toLocaleString('en-IN')}*
                            </div>
                            <ul className="mt-2.5 space-y-1 text-[11px] text-stone-600">
                              {pkg.deliverables.map((item, i) => (
                                <li key={i} className="flex items-start gap-1.5">
                                  <span className="text-red-500 font-bold mt-0.5">•</span>
                                  <span>{item}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}

            {/* TAB 3: MODULAR KITCHEN STUDIO */}
            {activeTab === 'modular-kitchen' && (
              <div className="space-y-4 animate-in fade-in">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Layout */}
                  <div>
                    <label className="block text-xs font-bold text-stone-800 mb-1.5">Kitchen Layout</label>
                    <div className="grid grid-cols-2 gap-2">
                      {kitchenLayouts.map((l) => (
                        <div
                          key={l.id}
                          onClick={() => setKitchenLayout(l.id)}
                          className={`p-2.5 rounded-xl border text-left cursor-pointer transition-all ${
                            kitchenLayout === l.id
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

                  {/* Finishes */}
                  <div>
                    <label className="block text-xs font-bold text-stone-800 mb-1.5">Surface Finish Material</label>
                    <div className="grid grid-cols-1 gap-1.5">
                      {kitchenFinishes.map((f) => (
                        <div
                          key={f.id}
                          onClick={() => setKitchenFinish(f.id)}
                          className={`p-2.5 rounded-xl border text-left cursor-pointer transition-all flex items-center justify-between ${
                            kitchenFinish === f.id
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
                </div>

                {/* Running feet slider */}
                <div className="p-3.5 bg-stone-50 rounded-2xl border border-stone-200 space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-stone-800">Counter Length:</span>
                    <span className="font-black text-stone-900 font-mono">{kitchenLengthFeet} Running Feet</span>
                  </div>
                  <input
                    type="range"
                    min="8"
                    max="28"
                    value={kitchenLengthFeet}
                    onChange={(e) => setKitchenLengthFeet(Number(e.target.value))}
                    className="w-full accent-red-600 cursor-pointer"
                  />
                  <div className="flex justify-between items-center pt-2 border-t border-stone-200 text-xs">
                    <span className="text-stone-500">Estimated Turnkey Modular Kitchen Cost:</span>
                    <span className="text-base font-black text-red-600 font-mono">
                      ₹{kitchenEstimatedCost.toLocaleString('en-IN')}*
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* Estimated Total Bar */}
            <div className="p-4 bg-stone-900 text-white rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-3">
              <div>
                <div className="text-[11px] text-stone-400 uppercase tracking-wider font-semibold">
                  Estimated Investment ({activeTab === 'modular-kitchen' ? 'Modular Kitchen' : activeTab === 'full-residential' ? 'Full Residential' : 'Full Commercial'})
                </div>
                <div className="text-2xl font-black text-red-500 font-mono">
                  ₹{getActiveEstimatedCost().toLocaleString('en-IN')}*
                </div>
              </div>
              <div className="text-left sm:text-right text-[11px] text-stone-400">
                <span>Includes 3D elevation, material sourcing &amp; 10-Yr warranty</span>
              </div>
            </div>

            {/* Contact Input Form */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              <div>
                <label className="block text-xs font-bold text-stone-800 mb-1">Your Name *</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g., Pooja Sharma"
                  className="w-full px-3 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-xs text-stone-900 focus:outline-hidden focus:border-red-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-800 mb-1">Mobile Number (WhatsApp) *</label>
                <input
                  type="tel"
                  required
                  pattern="[0-9]{10}"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="10-digit mobile number"
                  className="w-full px-3 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-xs text-stone-900 focus:outline-hidden focus:border-red-500"
                />
              </div>
            </div>

            {/* Action Buttons */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3">
              <button
                type="button"
                onClick={onClose}
                className="w-full sm:w-auto px-5 py-2.5 rounded-xl border border-stone-200 text-stone-600 text-xs font-bold hover:bg-stone-50 cursor-pointer"
              >
                Cancel
              </button>

              <button
                type="submit"
                className="w-full sm:flex-1 py-3 px-5 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs sm:text-sm font-bold shadow-md shadow-red-600/20 transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                <span>Book Free 3D Design &amp; Site Laser Consultation</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
