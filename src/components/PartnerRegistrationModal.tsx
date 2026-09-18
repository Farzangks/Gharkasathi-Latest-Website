import React, { useState, useEffect } from 'react';
import { 
  X, 
  CheckCircle2, 
  ShieldCheck, 
  Phone, 
  MapPin, 
  Briefcase, 
  Wrench, 
  IndianRupee, 
  FileText, 
  Sparkles, 
  Send, 
  AlertCircle,
  Clock,
  Car,
  BookOpen,
  AlertTriangle,
  Hammer,
  Droplets,
  Zap,
  Wind,
  ArrowRight,
  ChevronRight,
  ChevronDown
} from 'lucide-react';
import { GharkasathiEmblem } from './GharkasathiLogo';

interface PartnerRegistrationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
  selectedCity?: string;
  initialTab?: 'partner' | 'diy';
  onBookService?: (category?: string) => void;
}

interface DiyGuide {
  id: string;
  title: string;
  titleHi: string;
  category: 'plumbing' | 'electrical' | 'ac' | 'carpentry';
  difficulty: 'Easy' | 'Moderate' | 'Pro Caution';
  timeMinutes: string;
  toolsNeeded: string[];
  materialsNeeded: string[];
  safetyWarning: string;
  steps: string[];
  proTip: string;
}

const DIY_GUIDES: DiyGuide[] = [
  {
    id: 'diy-tap-leak',
    title: 'Fix a Dripping or Leaking Tap / Faucet',
    titleHi: 'टपकता हुआ नल खुद कैसे ठीक करें',
    category: 'plumbing',
    difficulty: 'Easy',
    timeMinutes: '10–15 Mins',
    toolsNeeded: ['Adjustable Wrench / Spanner', 'Flat-head Screwdriver', 'Plumber PTFE Teflon Tape'],
    materialsNeeded: ['Replacement Rubber Washer (1/2" or 3/4")', 'O-ring gasket'],
    safetyWarning: 'Always close the local angle stop valve or overhead water tank supply before opening any faucet.',
    steps: [
      'Shut off the local angle stop valve situated directly under the washbasin or kitchen sink.',
      'Pry off the decorative plastic index cap (hot/cold label) using a flat-head screwdriver to expose the handle retaining screw.',
      'Unscrew the handle retaining screw and lift the handle off the brass cartridge stem.',
      'Use an adjustable wrench to turn the brass cartridge counter-clockwise and extract it.',
      'Inspect the rubber washer at the base. If hardened, split, or cracked, swap it for a new matching size rubber washer.',
      'Wrap 3-4 neat turns of PTFE tape clockwise around the cartridge threads and screw it back snugly without over-tightening.',
      'Reinstall the handle and turn the water supply back on to verify zero dripping.'
    ],
    proTip: 'Never over-tighten faucet handles when turning off water. Squeezing hard tears the rubber washer 3x faster.'
  },
  {
    id: 'diy-mcb-reset',
    title: 'Troubleshoot a Tripped Circuit Breaker (MCB)',
    titleHi: 'ट्रिप हुए MCB को सुरक्षित रीसेट और फॉल्ट ढूंढें',
    category: 'electrical',
    difficulty: 'Easy',
    timeMinutes: '5–10 Mins',
    toolsNeeded: ['Flashlight / Mobile Torch', 'Neon Voltage Tester Pen'],
    materialsNeeded: ['None'],
    safetyWarning: 'Never touch electrical distribution boxes with wet hands or while barefoot. Stand on dry rubber or wooden footwear.',
    steps: [
      'Locate the distribution board (DB) and find the toggle switch that has dropped halfway or completely down.',
      'Before pushing it back up, visit the room controlled by that circuit and unplug the last heavy appliance plugged in (e.g. iron, geyser, induction, power drill).',
      'Push the tripped breaker lever completely DOWN to the reset position first with a firm click.',
      'Flick the lever straight UP into the ON position.',
      'If it stays up, reconnect appliances one by one to isolate the faulty device. If it immediately trips with a flash, leave it OFF and call a certified technician.'
    ],
    proTip: 'If an MCB trips only when two high-draw appliances run simultaneously, your circuit is overloaded rather than short-circuited.'
  },
  {
    id: 'diy-ac-filter',
    title: 'Clean AC Indoor Air Filters & Boost Cooling',
    titleHi: 'एसी फिल्टर साफ करके 20% कूलिंग और बिजली बचाएं',
    category: 'ac',
    difficulty: 'Easy',
    timeMinutes: '15 Mins',
    toolsNeeded: ['Clean dry microfiber cloth', 'Soft nylon brush'],
    materialsNeeded: ['Lukewarm water', 'Mild liquid soap'],
    safetyWarning: 'Turn off the dedicated AC power stabilizer or wall switch before opening the front evaporator grille.',
    steps: [
      'Turn off the AC remote and switch off the dedicated wall power plug or voltage stabilizer.',
      'Grip the indentations on both sides of the indoor unit cover and lift the front panel upward until it clicks open.',
      'Gently push the lower tab of each mesh filter upward to unlatch, then slide the filters downward and out.',
      'Tap heavy dust into a waste bin, then hold the filters under running water so the water flows backward against dust accumulation.',
      'Gently clean stubborn grease with a soft brush and mild soapy water.',
      'Air-dry the mesh completely in the shade (never in direct harsh sun or with a hot hair dryer).',
      'Slide the dry filters back into their guide tracks until they lock, close the panel, and power on.'
    ],
    proTip: 'Clean your AC mesh filters every 15-20 days during peak summer to prevent coil icing, compressor strain, and high electricity bills.'
  },
  {
    id: 'diy-drain-unclog',
    title: 'Clear Clogged Kitchen Sink or Bathroom Drain',
    titleHi: 'जाम हुआ सिंक या ड्रेन पाइप केमिकल-फ्री खोलें',
    category: 'plumbing',
    difficulty: 'Moderate',
    timeMinutes: '20 Mins',
    toolsNeeded: ['Small bucket or basin', 'Rubber plunger', 'Drain snake / wire hook'],
    materialsNeeded: ['1/2 cup Baking Soda', '1 cup White Vinegar', '1 kettle boiling water'],
    safetyWarning: 'Wear rubber gloves. Do NOT pour boiling water onto PVC pipes if you have already poured chemical acid drain cleaners.',
    steps: [
      'Remove standing surface water from the sink with a small mug.',
      'Pour 1/2 cup of dry baking soda directly down the drain opening.',
      'Pour 1 cup of white vinegar immediately after. It will fizz violently — cover the drain hole with a wet cloth for 15 minutes to force bubbling downward.',
      'Flush with 1 kettle of hot/boiling water to melt dissolved kitchen grease and soap scum.',
      'If still sluggish, place a bucket under the curved P-trap beneath the sink, unscrew the plastic slip nuts by hand, clean trapped food/hair into the bucket, and reassemble.'
    ],
    proTip: 'Never dispose of warm cooking oil or ghee directly down the kitchen sink. It solidifies in cold underground pipes and causes rock-hard blockages.'
  },
  {
    id: 'diy-fan-regulator',
    title: 'Identify Faulty Ceiling Fan Capacitor / Speed Loss',
    titleHi: 'पंखा धीमा चलने पर कैपेसिटर जांच और उपाय',
    category: 'electrical',
    difficulty: 'Moderate',
    timeMinutes: '15 Mins',
    toolsNeeded: ['Ladder / Sturdy Stool', 'Insulated Screwdriver', 'Neon Tester'],
    materialsNeeded: ['2.25µF or 2.50µF Fan Capacitor (if replacement needed)'],
    safetyWarning: 'Turn off the main room switch and test with a tester pen before touching any fan wires. A charged capacitor can give a minor jolt; short its two leads with an insulated screwdriver first.',
    steps: [
      'Turn off the fan wall switch and main room circuit breaker.',
      'Climb safely and slide the upper fan canopy bell up the downrod to expose the cylindrical white capacitor clamped to the motor body.',
      'Notice if the capacitor body is bulging, leaking oil, or has black burn marks — these are clear signs of failure.',
      'Take a clear smartphone photo of the wiring connections (auxiliary, main winding, and common terminal).',
      'Replace only with the manufacturer-rated value (normally 2.25µF or 2.5µF in India). Installing an oversized capacitor can burn out the motor winding.'
    ],
    proTip: 'Spin the fan blades with your hand when switched off. If they feel stiff or screech, the ball bearings need greasing rather than a capacitor change.'
  },
  {
    id: 'diy-door-hinge',
    title: 'Silence Squeaky Door Hinges & Sticky Locks',
    titleHi: 'आवाज करने वाले दरवाजे के कब्जे और जाम ताले ठीक करें',
    category: 'carpentry',
    difficulty: 'Easy',
    timeMinutes: '10 Mins',
    toolsNeeded: ['Clean rag', 'Precision lubricant nozzle'],
    materialsNeeded: ['Multi-purpose lubricant spray (WD-40 or silicone spray)', 'Graphite powder for keyholes'],
    safetyWarning: 'Do not use cooking oil on locks or hinges; it turns sticky, oxidizes, and attracts abrasive dust over time.',
    steps: [
      'Wipe dirt and black metal dust from the outer hinge knuckles with a dry rag.',
      'Attach the precision straw to a multi-purpose lubricating spray and spray sparingly directly into the gaps between the hinge knuckles.',
      'Swing the door back and forth 10 to 15 times to work the lubricant through the inner hinge pin cylinder.',
      'Wipe away any excess run-off immediately to protect wall paint and wooden door frames.',
      'For sticky keyholes, puff dry powdered graphite into the cylinder rather than liquid oil.'
    ],
    proTip: 'A dry bar of bathing soap rubbed along the rubbing edges of a swollen wooden monsoon door eliminates sticking without planing the wood.'
  }
];

const AVAILABLE_SKILLS = [
  'Electrician & Inverter',
  'Plumbing & Sanitation',
  'AC Repair & Chemical Jet',
  'Carpentry & Furniture',
  'Modular Kitchen Fitting',
  'Civil Masonry & Tiles',
  'Waterproofing & Painting',
  'Deep House Cleaning',
  'Appliance & Refrigerator',
  'CCTV & Smart Home'
];

const CITIES = [
  'Raipur',
  'Bhilai',
  'Durg',
  'Bilaspur',
  'Rajnandgaon',
  'Korba'
];

export const PartnerRegistrationModal: React.FC<PartnerRegistrationModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
  selectedCity = 'Raipur',
  initialTab = 'partner',
  onBookService
}) => {
  const [activeTab, setActiveTab] = useState<'partner' | 'diy'>(initialTab);
  const [diyCategory, setDiyCategory] = useState<'all' | 'plumbing' | 'electrical' | 'ac' | 'carpentry'>('all');
  const [expandedGuideId, setExpandedGuideId] = useState<string | null>('diy-tap-leak');

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [city, setCity] = useState(selectedCity);
  const [zone, setZone] = useState('');
  const [selectedSkills, setSelectedSkills] = useState<string[]>(['Electrician & Inverter']);
  const [experienceYears, setExperienceYears] = useState('4');
  const [toolsOwned, setToolsOwned] = useState(true);
  const [vehicleType, setVehicleType] = useState('Bike / Two Wheeler');
  const [aadharNumber, setAadharNumber] = useState('');
  const [upiId, setUpiId] = useState('');
  const [agreedToTerms, setAgreedToTerms] = useState(true);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [registeredSuccessData, setRegisteredSuccessData] = useState<{
    partnerId: string;
    message: string;
  } | null>(null);

  useEffect(() => {
    if (initialTab) {
      setActiveTab(initialTab);
    }
  }, [initialTab, isOpen]);

  useEffect(() => {
    if (selectedCity) {
      setCity(selectedCity);
    }
  }, [selectedCity]);

  if (!isOpen) return null;

  const toggleSkill = (skill: string) => {
    setSelectedSkills(prev => 
      prev.includes(skill)
        ? prev.length > 1 ? prev.filter(s => s !== skill) : prev
        : [...prev, skill]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const cleanName = name.trim();
    const cleanPhone = phone.trim();

    if (!cleanName) {
      setError('Please enter your full name (पूरा नाम दर्ज करें).');
      return;
    }

    if (!cleanPhone || cleanPhone.length < 10) {
      setError('Please enter a valid 10-digit mobile number (मान्य 10 अंकों का मोबाइल नंबर दर्ज करें).');
      return;
    }

    if (selectedSkills.length === 0) {
      setError('Please select at least one skill or trade.');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('/api/partners/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: cleanName,
          phone: cleanPhone.startsWith('+91') ? cleanPhone : `+91 ${cleanPhone}`,
          whatsapp: whatsapp ? (whatsapp.startsWith('+91') ? whatsapp : `+91 ${whatsapp}`) : cleanPhone,
          city,
          zone: zone.trim() || `${city} Main Hub`,
          skills: selectedSkills,
          experienceYears: Number(experienceYears) || 2,
          toolsOwned,
          vehicleType,
          aadharNumber: aadharNumber.trim() || undefined,
          upiId: upiId.trim() || undefined
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to submit registration application.');
      }

      setRegisteredSuccessData({
        partnerId: data.partner?.id || 'PRV-NEW',
        message: data.message || 'Registration received successfully.'
      });

      if (onSuccess) {
        onSuccess();
      }
    } catch (err: any) {
      console.error('Partner registration error:', err);
      setError(err?.message || 'Server error during submission. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/75 backdrop-blur-xs overflow-y-auto">
      <div 
        className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl border border-stone-200 overflow-hidden my-8 animate-in fade-in zoom-in-95 duration-200"
        role="dialog"
        aria-modal="true"
      >
        {/* Header Strip */}
        <div className={`p-6 relative text-white transition-colors ${
          activeTab === 'partner' 
            ? 'bg-gradient-to-r from-emerald-900 via-stone-900 to-emerald-950' 
            : 'bg-gradient-to-r from-amber-950 via-stone-900 to-amber-900'
        }`}>
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full text-stone-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-3">
            <GharkasathiEmblem className="w-12 h-12" />
            <div>
              <div className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-bold tracking-wider uppercase border mb-1 ${
                activeTab === 'partner'
                  ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                  : 'bg-amber-500/20 text-amber-300 border-amber-500/40'
              }`}>
                {activeTab === 'partner' ? (
                  <>
                    <ShieldCheck className="w-3 h-3" />
                    <span>Gharkasathi Partner Network &bull; Register as a Service Partner</span>
                  </>
                ) : (
                  <>
                    <Wrench className="w-3 h-3" />
                    <span>Do It On Your Own &bull; DIY Home Maintenance Hub</span>
                  </>
                )}
              </div>
              <h2 className="text-xl font-bold tracking-tight text-white">
                {activeTab === 'partner' ? 'Register as a Service Partner' : 'Do It On Your Own (DIY Home Care)'}
              </h2>
              <p className="text-xs text-stone-300 mt-0.5">
                {activeTab === 'partner'
                  ? 'Earn ₹25,000 – ₹75,000/month with daily UPI payouts & zero commission in your first 30 days!'
                  : 'Free step-by-step DIY troubleshooting guides, tools checklist & safety advice for property owners.'}
              </p>
            </div>
          </div>
        </div>

        {/* Tab Switcher: Register as Service Partner vs Do It On Your Own */}
        <div className="flex border-b border-stone-200 bg-stone-50 px-4 sm:px-6 pt-3 gap-2 sm:gap-4">
          <button
            type="button"
            onClick={() => setActiveTab('partner')}
            className={`flex items-center gap-2 pb-3 px-3 text-xs font-bold border-b-2 transition-all cursor-pointer ${
              activeTab === 'partner'
                ? 'border-emerald-700 text-emerald-900 bg-white rounded-t-lg shadow-xs'
                : 'border-transparent text-stone-500 hover:text-stone-900'
            }`}
          >
            <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>Register as Service Partner</span>
            <span className="hidden sm:inline-block text-[10px] px-1.5 py-0.2 bg-emerald-100 text-emerald-800 rounded-full font-extrabold">
              Earn ₹25k–₹75k
            </span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('diy')}
            className={`flex items-center gap-2 pb-3 px-3 text-xs font-bold border-b-2 transition-all cursor-pointer ${
              activeTab === 'diy'
                ? 'border-amber-600 text-amber-950 bg-white rounded-t-lg shadow-xs'
                : 'border-transparent text-stone-500 hover:text-stone-900'
            }`}
          >
            <Wrench className="w-4 h-4 text-amber-600 shrink-0" />
            <span>Do It On Your Own (DIY Hub)</span>
            <span className="hidden sm:inline-block text-[10px] px-1.5 py-0.2 bg-amber-100 text-amber-900 rounded-full font-extrabold">
              Free Guides
            </span>
          </button>
        </div>

        {/* ==================================================== */}
        {/* TAB 1: REGISTER AS SERVICE PARTNER                   */}
        {/* ==================================================== */}
        {activeTab === 'partner' && (
          <>
            {/* Modal Body */}
            {registeredSuccessData ? (
              <div className="p-8 text-center space-y-6">
                <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 mx-auto flex items-center justify-center shadow-inner">
                  <CheckCircle2 className="w-10 h-10" />
                </div>

                <div className="space-y-2">
                  <h3 className="text-2xl font-bold text-stone-900">
                    Application Submitted Successfully!
                  </h3>
                  <p className="text-sm text-stone-600 max-w-md mx-auto">
                    Congratulations! Your Service Partner registration application has been received. Our partner onboarding desk will contact you within 24 hours.
                  </p>
                </div>

                <div className="bg-stone-50 border border-stone-200 rounded-xl p-4 max-w-md mx-auto text-left space-y-2 text-xs">
                  <div className="flex justify-between items-center py-1 border-b border-stone-200">
                    <span className="text-stone-500">Partner Reference ID:</span>
                    <span className="font-mono font-bold text-emerald-800 text-sm">{registeredSuccessData.partnerId}</span>
                  </div>
                  <div className="flex justify-between items-center py-1 border-b border-stone-200">
                    <span className="text-stone-500">Registered Name:</span>
                    <span className="font-semibold text-stone-900">{name}</span>
                  </div>
                  <div className="flex justify-between items-center py-1 border-b border-stone-200">
                    <span className="text-stone-500">Selected Hub:</span>
                    <span className="font-semibold text-stone-900">{city} &bull; {zone || 'Central Hub'}</span>
                  </div>
                  <div className="flex justify-between items-center py-1">
                    <span className="text-stone-500">Status:</span>
                    <span className="inline-flex items-center gap-1 font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200">
                      <Clock className="w-3 h-3" />
                      Verification Pending (सत्यापन प्रक्रियाधीन)
                    </span>
                  </div>
                </div>

                <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 max-w-md mx-auto text-left">
                  <p className="text-xs font-semibold text-emerald-900 flex items-center gap-1.5 mb-1">
                    <Sparkles className="w-4 h-4 text-emerald-600" />
                    Want Instant Walk-In Activation?
                  </p>
                  <p className="text-[11px] text-emerald-800 leading-relaxed">
                    Visit our Raipur Central Office: <strong>Currency Tower, VIP Road, Raipur</strong> with your Aadhar Card & Tools for on-the-spot verification and welcome kit collection!
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
                  <a
                    href={`https://wa.me/917770999122?text=Hello%20Gharkasathi%20Team%2C%20I%20have%20registered%20as%20Service%20Partner.%20My%20Name%3A%20${encodeURIComponent(name)}%2C%20ID%3A%20${registeredSuccessData.partnerId}.%20Please%20verify%20my%20profile.`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-sm transition-colors"
                  >
                    <Phone className="w-4 h-4" />
                    <span>Contact Operations on WhatsApp</span>
                  </a>

                  <button
                    onClick={onClose}
                    className="px-6 py-2.5 rounded-xl border border-stone-300 hover:bg-stone-100 text-stone-700 font-semibold text-xs transition-colors"
                  >
                    Close
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="p-6 space-y-6">
            {error && (
              <div className="p-3 bg-rose-50 border border-rose-200 text-rose-800 text-xs rounded-xl flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
                <span>{error}</span>
              </div>
            )}

            {/* Section 1: Basic Info */}
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-stone-500 mb-3 flex items-center gap-1.5">
                <Briefcase className="w-3.5 h-3.5 text-emerald-600" />
                1. Personal & Contact Information (व्यक्तिगत जानकारी)
              </h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    Full Name (पूरा नाम) *
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Rajesh Kumar Sonkar"
                    className="w-full px-3 py-2 text-xs rounded-lg border border-stone-300 focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    Mobile Number (मोबाइल नंबर) *
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="e.g. 98261XXXXX"
                    className="w-full px-3 py-2 text-xs rounded-lg border border-stone-300 focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    City / Operating Hub (शहर) *
                  </label>
                  <select
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-lg border border-stone-300 focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:border-transparent bg-white"
                  >
                    {CITIES.map(c => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    Preferred Local Area / Colony (कार्य क्षेत्र)
                  </label>
                  <input
                    type="text"
                    value={zone}
                    onChange={(e) => setZone(e.target.value)}
                    placeholder="e.g. Shankar Nagar, Telibandha, Pandri"
                    className="w-full px-3 py-2 text-xs rounded-lg border border-stone-300 focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:border-transparent"
                  />
                </div>
              </div>
            </div>

            {/* Section 2: Skills & Experience */}
            <div className="pt-2 border-t border-stone-200">
              <h3 className="text-xs font-bold uppercase tracking-wider text-stone-500 mb-3 flex items-center gap-1.5">
                <Wrench className="w-3.5 h-3.5 text-emerald-600" />
                2. Select Your Trades & Skills (आपका कौशल / काम) *
              </h3>

              <div className="flex flex-wrap gap-2 mb-4">
                {AVAILABLE_SKILLS.map(skill => {
                  const isSelected = selectedSkills.includes(skill);
                  return (
                    <button
                      type="button"
                      key={skill}
                      onClick={() => toggleSkill(skill)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer flex items-center gap-1.5 ${
                        isSelected 
                          ? 'bg-emerald-900 text-white shadow-xs border border-emerald-800' 
                          : 'bg-stone-100 text-stone-700 hover:bg-stone-200 border border-stone-200'
                      }`}
                    >
                      {isSelected ? (
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                      ) : (
                        <span className="w-1.5 h-1.5 rounded-full bg-stone-400" />
                      )}
                      <span>{skill}</span>
                    </button>
                  );
                })}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    Years of Experience (अनुभव)
                  </label>
                  <select
                    value={experienceYears}
                    onChange={(e) => setExperienceYears(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-lg border border-stone-300 focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:border-transparent bg-white"
                  >
                    <option value="1">1 Year</option>
                    <option value="2">2 Years</option>
                    <option value="3">3-4 Years</option>
                    <option value="5">5-7 Years</option>
                    <option value="10">8-10+ Years</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    Do you have toolkit? (औजार हैं?)
                  </label>
                  <select
                    value={toolsOwned ? 'yes' : 'no'}
                    onChange={(e) => setToolsOwned(e.target.value === 'yes')}
                    className="w-full px-3 py-2 text-xs rounded-lg border border-stone-300 focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:border-transparent bg-white"
                  >
                    <option value="yes">Yes, I have complete tools (हाँ, पूरे औजार हैं)</option>
                    <option value="no">Need Gharkasathi tool kit support</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    Vehicle for travel (वाहन)
                  </label>
                  <select
                    value={vehicleType}
                    onChange={(e) => setVehicleType(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-lg border border-stone-300 focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:border-transparent bg-white"
                  >
                    <option value="Bike / Two Wheeler">Bike / Scooter (बाइक / स्कूटी)</option>
                    <option value="Auto / Pickup Van">Auto / Pickup Van (बड़ा वाहन)</option>
                    <option value="Bicycle / Public Transport">Bicycle / Local Transport</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Section 3: KYC & UPI Details */}
            <div className="pt-2 border-t border-stone-200">
              <h3 className="text-xs font-bold uppercase tracking-wider text-stone-500 mb-3 flex items-center gap-1.5">
                <IndianRupee className="w-3.5 h-3.5 text-emerald-600" />
                3. Verification & Daily Payout Bank/UPI (भुगतान खाता)
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    Aadhar Card Number (आधार नंबर - वैकल्पिक)
                  </label>
                  <input
                    type="text"
                    value={aadharNumber}
                    onChange={(e) => setAadharNumber(e.target.value)}
                    placeholder="12-digit Aadhar number"
                    maxLength={14}
                    className="w-full px-3 py-2 text-xs rounded-lg border border-stone-300 focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:border-transparent font-mono"
                  />
                  <span className="text-[10px] text-stone-400">Used strictly for background verification & trust badge.</span>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    UPI ID for Daily Payouts (पेमेंट पाने के लिए UPI ID)
                  </label>
                  <input
                    type="text"
                    value={upiId}
                    onChange={(e) => setUpiId(e.target.value)}
                    placeholder="e.g. 98261XXXXX@paytm, name@okaxis"
                    className="w-full px-3 py-2 text-xs rounded-lg border border-stone-300 focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:border-transparent font-mono"
                  />
                  <span className="text-[10px] text-stone-400">Your job earnings are credited directly to this UPI ID every evening.</span>
                </div>
              </div>
            </div>

            {/* Terms checkbox */}
            <div className="pt-2">
              <label className="flex items-start gap-2.5 cursor-pointer text-xs text-stone-600 select-none">
                <input
                  type="checkbox"
                  checked={agreedToTerms}
                  onChange={(e) => setAgreedToTerms(e.target.checked)}
                  className="mt-0.5 rounded text-emerald-600 focus:ring-emerald-500 border-stone-300"
                />
                <span>
                  I confirm that I provide genuine, skilled workmanship and agree to follow Gharkasathi safety standards and code of conduct. (मैं गुणवत्तापूर्ण कार्य और ईमानदारी से सेवा देने की पुष्टि करता हूँ।)
                </span>
              </label>
            </div>

            {/* Submit Action */}
            <div className="pt-4 border-t border-stone-200 flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="text-[11px] text-stone-500 flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>Zero registration fee &bull; 100% Verified Customer Leads</span>
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto">
                <button
                  type="button"
                  onClick={onClose}
                  className="w-1/2 sm:w-auto px-4 py-2 text-xs font-semibold text-stone-600 hover:text-stone-900 border border-stone-300 rounded-lg hover:bg-stone-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading || !agreedToTerms}
                  className="w-1/2 sm:w-auto px-6 py-2 text-xs font-bold text-white bg-emerald-700 hover:bg-emerald-800 disabled:opacity-50 rounded-lg shadow-sm transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  {loading ? (
                    <span className="inline-flex items-center gap-1.5">
                      <span className="w-3 h-3 rounded-full border-2 border-white border-t-transparent animate-spin" />
                      Submitting...
                    </span>
                  ) : (
                    <>
                      <Send className="w-3.5 h-3.5" />
                      <span>Submit Application (आवेदन जमा करें)</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </form>
        )}
        </>
      )}

      {/* ==================================================== */}
      {/* TAB 2: DO IT ON YOUR OWN (DIY HOME MAINTENANCE HUB) */}
      {/* ==================================================== */}
      {activeTab === 'diy' && (
        <div className="p-6 space-y-6 max-h-[75vh] overflow-y-auto">
          {/* Category Filter Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar text-xs font-bold">
            {[
              { id: 'all', label: 'All DIY Fixes (सभी गाइड)', icon: BookOpen },
              { id: 'plumbing', label: 'Plumbing (नल और पाइप)', icon: Droplets },
              { id: 'electrical', label: 'Electrical (बिजली)', icon: Zap },
              { id: 'ac', label: 'AC & Cooling (एसी)', icon: Wind },
              { id: 'carpentry', label: 'Doors & Wood (दरवाजे)', icon: Hammer },
            ].map(cat => {
              const Icon = cat.icon;
              const isSelected = diyCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setDiyCategory(cat.id as any)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full whitespace-nowrap transition-colors cursor-pointer ${
                    isSelected
                      ? 'bg-amber-600 text-white shadow-xs'
                      : 'bg-stone-100 text-stone-700 hover:bg-stone-200 border border-stone-200'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{cat.label}</span>
                </button>
              );
            })}
          </div>

          {/* Safety Alert Banner */}
          <div className="p-3.5 bg-amber-50 border border-amber-200 rounded-xl flex items-start gap-2.5 text-xs text-amber-900">
            <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            <div>
              <strong className="font-bold">Golden Safety Rule for DIY Home Repairs:</strong>
              <p className="mt-0.5 text-[11px] text-amber-800 leading-relaxed">
                Always shut off the main water tank supply / angle stop valve before plumbing work, and trip the room MCB before touching switches or wires. If you detect burning smell, arcing sparks, or gas leaks &mdash; stop immediately and book a certified partner.
              </p>
            </div>
          </div>

          {/* DIY Guide Cards */}
          <div className="space-y-3">
            {DIY_GUIDES.filter(g => diyCategory === 'all' || g.category === diyCategory).map(guide => {
              const isExpanded = expandedGuideId === guide.id;
              return (
                <div
                  key={guide.id}
                  className="border border-stone-200 rounded-xl overflow-hidden bg-white shadow-xs hover:border-amber-400 transition-colors"
                >
                  <button
                    type="button"
                    onClick={() => setExpandedGuideId(isExpanded ? null : guide.id)}
                    className="w-full p-4 text-left flex items-start justify-between gap-3 cursor-pointer bg-stone-50/50 hover:bg-stone-50 transition-colors"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-extrabold uppercase ${
                          guide.difficulty === 'Easy' 
                            ? 'bg-emerald-100 text-emerald-800' 
                            : guide.difficulty === 'Moderate'
                            ? 'bg-amber-100 text-amber-900'
                            : 'bg-rose-100 text-rose-800'
                        }`}>
                          {guide.difficulty}
                        </span>
                        <span className="text-[11px] text-stone-500 font-mono flex items-center gap-1">
                          <Clock className="w-3 h-3 text-stone-400" />
                          {guide.timeMinutes}
                        </span>
                      </div>
                      <h4 className="text-sm font-bold text-stone-900">
                        {guide.title}
                      </h4>
                      <p className="text-xs text-stone-500 font-medium">
                        {guide.titleHi}
                      </p>
                    </div>

                    <div className="p-1 rounded-lg text-stone-400 hover:text-stone-700 shrink-0">
                      {isExpanded ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
                    </div>
                  </button>

                  {isExpanded && (
                    <div className="p-4 border-t border-stone-100 space-y-4 text-xs bg-white">
                      {/* Tools & Materials Required */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-3 bg-stone-50 rounded-xl border border-stone-200">
                        <div>
                          <span className="font-bold text-stone-700 flex items-center gap-1 mb-1">
                            <Wrench className="w-3.5 h-3.5 text-stone-500" />
                            Tools Needed:
                          </span>
                          <ul className="list-disc list-inside text-stone-600 space-y-0.5 text-[11px]">
                            {guide.toolsNeeded.map((t, idx) => (
                              <li key={idx}>{t}</li>
                            ))}
                          </ul>
                        </div>

                        <div>
                          <span className="font-bold text-stone-700 flex items-center gap-1 mb-1">
                            <FileText className="w-3.5 h-3.5 text-stone-500" />
                            Materials / Consumables:
                          </span>
                          <ul className="list-disc list-inside text-stone-600 space-y-0.5 text-[11px]">
                            {guide.materialsNeeded.map((m, idx) => (
                              <li key={idx}>{m}</li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      {/* Step by step */}
                      <div className="space-y-2">
                        <h5 className="font-bold text-stone-900 uppercase text-[11px] tracking-wider flex items-center gap-1.5">
                          <BookOpen className="w-3.5 h-3.5 text-amber-600" />
                          Step-by-Step Instructions:
                        </h5>
                        <ol className="space-y-2">
                          {guide.steps.map((step, idx) => (
                            <li key={idx} className="flex items-start gap-2.5 text-stone-700">
                              <span className="w-5 h-5 rounded-full bg-amber-100 text-amber-900 font-bold text-[11px] flex items-center justify-center shrink-0 mt-0.5">
                                {idx + 1}
                              </span>
                              <span className="text-[12px] leading-relaxed">{step}</span>
                            </li>
                          ))}
                        </ol>
                      </div>

                      {/* Pro Tip */}
                      <div className="p-3 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-900">
                        <strong className="font-bold flex items-center gap-1 text-[11px]">
                          <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                          Gharkasathi Expert Pro Tip:
                        </strong>
                        <p className="mt-0.5 text-[11px] text-emerald-800 leading-relaxed">
                          {guide.proTip}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Need Professional Bottom Strip */}
          <div className="p-4 bg-stone-900 text-white rounded-xl flex flex-col sm:flex-row items-center justify-between gap-3">
            <div>
              <p className="text-xs font-bold text-white flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                Prefer an expert to do it for you?
              </p>
              <p className="text-[11px] text-stone-400 mt-0.5">
                Gharkasathi verified CSGSP partners arrive in 30 mins with standardized pricing & 30-day rework warranty.
              </p>
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto shrink-0">
              <button
                type="button"
                onClick={() => {
                  onClose();
                  if (onBookService) {
                    onBookService();
                  }
                }}
                className="w-full sm:w-auto px-4 py-2 text-xs font-bold bg-red-600 hover:bg-red-700 text-white rounded-lg shadow-sm transition-colors cursor-pointer text-center"
              >
                Book Verified Partner
              </button>
            </div>
          </div>
        </div>
      )}
      </div>
    </div>
  );
};
