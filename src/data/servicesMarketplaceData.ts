// Gharkasathi Universal Marketplace Service Category Data Models & Structured Content
// Supports dynamic rendering for Electrician, Plumber, Carpenter, Painting, Cleaning, Appliances, AC, Pest Control, Gardening, etc.

export interface ServiceDetail {
  id: string;
  slug: string;
  name: string;
  categorySlug: string;
  subcategorySlug: string;
  subgroupName: string;
  shortDesc: string;
  rating: number;
  reviewsCount: number;
  duration: string;
  startingPrice: number;
  priceDisplay?: string;
  badge?: string;
  imageUrl?: string;
  inclusions: string[];
  exclusions?: string[];
  options?: {
    id: string;
    name: string;
    price: number;
    duration?: string;
    popular?: boolean;
  }[];
  emergencyAvailable?: boolean;
  isPopular?: boolean;
}

export interface ServiceSubgroup {
  id: string;
  name: string;
  slug: string;
  description?: string;
  services: ServiceDetail[];
}

export interface ServiceCategoryMeta {
  id: string;
  slug: string;
  name: string;
  shortTitle: string;
  tagline: string;
  description: string;
  city: string;
  rating: number;
  reviewCount: number;
  completedJobs: string;
  iconName: string;
  subcategories: { 
    id: string; 
    name: string; 
    slug: string; 
    image?: string; 
    iconName?: string;
    itemCount?: number;
  }[];
  subgroups: ServiceSubgroup[];
  faqs: { question: string; answer: string }[];
  seoMeta: {
    heading: string;
    paragraphs: string[];
    serviceAreas: string[];
    relatedCategories: { name: string; slug: string }[];
  };
}

// 1. ELECTRICIAN (Benchmark data matching HomeTriangle UX IA principle)
export const ELECTRICIAN_CATEGORY_DATA: ServiceCategoryMeta = {
  id: 'electrician',
  slug: 'electrician',
  name: 'Electrician Services in Raipur',
  shortTitle: 'Electrician',
  tagline: 'Verified electricians for repairs, installations & electrical work',
  description: 'Book police-verified, certified electricians for switches, wiring, ceiling fans, inverters, lights and emergency power tripping in Raipur, Bhilai & Durg.',
  city: 'Raipur, Chhattisgarh',
  rating: 4.92,
  reviewCount: 684,
  completedJobs: '500+ Services Completed',
  iconName: 'Zap',
  subcategories: [
    { id: 'all', name: 'All Services', slug: 'all', iconName: 'Zap' },
    { 
      id: 'popular', 
      name: 'Popular Fixes', 
      slug: 'popular', 
      image: 'https://images.unsplash.com/photo-1621905252507-b35492cc74b4?auto=format&fit=crop&w=400&q=80',
      iconName: 'Zap',
      itemCount: 3
    },
    { 
      id: 'repairs', 
      name: 'Repairs & Switch', 
      slug: 'repairs', 
      image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=400&q=80',
      iconName: 'Zap',
      itemCount: 2
    },
    { 
      id: 'installation', 
      name: 'Installation & Fan', 
      slug: 'installation', 
      image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=400&q=80',
      iconName: 'Zap',
      itemCount: 2
    },
    { 
      id: 'wiring', 
      name: 'Wiring & MCB', 
      slug: 'wiring', 
      image: 'https://images.unsplash.com/photo-1544724569-5f546fd6f2b5?auto=format&fit=crop&w=400&q=80',
      iconName: 'Zap',
      itemCount: 1
    }
  ],
  subgroups: [
    {
      id: 'group-popular',
      name: 'Popular Services',
      slug: 'popular',
      description: 'Frequently booked electrical solutions with instant dispatch',
      services: [
        {
          id: 'elec-switch-board-repair',
          slug: 'switch-board-repair-installation',
          name: 'Switch Board Repair & Installation',
          categorySlug: 'electrician',
          subcategorySlug: 'repairs',
          subgroupName: 'Popular Services',
          shortDesc: 'Fix faulty switches, sparking modular sockets and switchboards with voltage stability test.',
          rating: 4.91,
          reviewsCount: 640,
          duration: '30–45 mins',
          startingPrice: 199,
          badge: 'Most Booked',
          isPopular: true,
          inclusions: ['Visual inspection & diagnosis', 'Switch / socket replacement', 'Tightening loose connection & earthing check'],
          exclusions: ['Cost of replacement hardware (switches/boards)', 'New concealed wall grooving'],
          options: [
            { id: 'opt-sw-1', name: '1 Switch Board Repair / Fix', price: 199, popular: true },
            { id: 'opt-sw-3', name: 'Up to 3 Switch Boards Check & Fix', price: 399 },
            { id: 'opt-sw-box', name: 'New Modular Box Surface Installation', price: 349 }
          ]
        },
        {
          id: 'elec-ceiling-fan-install',
          slug: 'ceiling-fan-installation',
          name: 'Ceiling Fan Installation & Mounting',
          categorySlug: 'electrician',
          subcategorySlug: 'installation',
          subgroupName: 'Popular Services',
          shortDesc: 'Expert fan installation, blade balancing, rod mounting and speed regulator connection.',
          rating: 4.89,
          reviewsCount: 420,
          duration: '45–60 mins',
          startingPrice: 229,
          isPopular: true,
          inclusions: ['Assembly of motor, downrod and blades', 'Ceiling hook anchoring & wiring', 'Regulator calibration & test run'],
          exclusions: ['Supply of step downrod if ceiling is extra tall', 'Ceiling anchor hook civil installation'],
          options: [
            { id: 'opt-fan-1', name: 'Ceiling Fan Installation (1 Unit)', price: 229, popular: true },
            { id: 'opt-fan-repair', name: 'Fan Bearing / Capacitor Replacement', price: 199 },
            { id: 'opt-fan-chandelier', name: 'Designer Fan / Chandelier Fitting', price: 499 }
          ]
        },
        {
          id: 'elec-led-light-install',
          slug: 'led-light-fitting',
          name: 'LED Light & False Ceiling Spotlight Fitting',
          categorySlug: 'electrician',
          subcategorySlug: 'fans-lights',
          subgroupName: 'Popular Services',
          shortDesc: 'Installation of ceiling battens, profile lights, COB spotlights and hanging pendant lights.',
          rating: 4.88,
          reviewsCount: 310,
          duration: '30 mins',
          startingPrice: 149,
          isPopular: true,
          inclusions: ['Drilling & mounting', 'Safe polarity connection', 'Testing illumination with driver'],
          exclusions: ['Cost of LED fixtures or drivers', 'False ceiling gypsum cutout']
        }
      ]
    },
    {
      id: 'group-repairs',
      name: 'Repairs & Troubleshooting',
      slug: 'repairs',
      description: 'Quick diagnosis of electrical short circuits, sparks & burnouts',
      services: [
        {
          id: 'elec-short-circuit-fix',
          slug: 'short-circuit-diagnosis',
          name: 'Short Circuit Diagnosis & Tripping Fix',
          categorySlug: 'electrician',
          subcategorySlug: 'repairs',
          subgroupName: 'Repairs & Troubleshooting',
          shortDesc: 'Complete line checking for neutral fault, phase leakage and high-voltage trip issues.',
          rating: 4.93,
          reviewsCount: 280,
          duration: '45–60 mins',
          startingPrice: 349,
          badge: 'Emergency 30m',
          emergencyAvailable: true,
          inclusions: ['Multimeter load and neutral continuity check', 'Locating burned joints', 'Restoring circuit load safely'],
          exclusions: ['Replacing entire main sub-meter wire']
        },
        {
          id: 'elec-fuse-replacement',
          slug: 'main-fuse-replacement',
          name: 'Main Cut-out Fuse & Neutral Link Repair',
          categorySlug: 'electrician',
          subcategorySlug: 'repairs',
          subgroupName: 'Repairs & Troubleshooting',
          shortDesc: 'Heavy-duty porcelain kit-kat fuse rewiring and phase balancing.',
          rating: 4.85,
          reviewsCount: 140,
          duration: '30 mins',
          startingPrice: 199,
          inclusions: ['Correct gauge copper fuse wire rewiring', 'Base cleaning & testing']
        }
      ]
    },
    {
      id: 'group-installation',
      name: 'Installation & Fittings',
      slug: 'installation',
      description: 'Certified electrical fittings for new homes, rooms and offices',
      services: [
        {
          id: 'elec-chandelier-install',
          slug: 'chandelier-hanging-light',
          name: 'Chandelier & Decorative Hanging Light',
          categorySlug: 'electrician',
          subcategorySlug: 'installation',
          subgroupName: 'Installation & Fittings',
          shortDesc: 'Heavy chandelier ceiling anchor hook mount, chain adjustment and safe balancing.',
          rating: 4.94,
          reviewsCount: 195,
          duration: '60–90 mins',
          startingPrice: 499,
          inclusions: ['Heavy-duty fastner mounting', 'Safe wiring & testing all bulbs'],
          exclusions: ['Scaffolding for double-height ceilings above 14ft']
        },
        {
          id: 'elec-doorbell-install',
          slug: 'doorbell-installation',
          name: 'Smart Doorbell / Traditional Bell Installation',
          categorySlug: 'electrician',
          subcategorySlug: 'installation',
          subgroupName: 'Installation & Fittings',
          shortDesc: 'Door chime mounting, transformer connection and exterior push button setup.',
          rating: 4.87,
          reviewsCount: 160,
          duration: '30 mins',
          startingPrice: 179,
          inclusions: ['Mounting chime unit', 'Surface clip wiring up to 5 meters', 'Testing chime tone']
        }
      ]
    },
    {
      id: 'group-wiring',
      name: 'Wiring & MCB Distribution Box',
      slug: 'wiring',
      description: 'Distribution board overhaul, RCCB shock protector and circuit load splitting',
      services: [
        {
          id: 'elec-mcb-replacement',
          slug: 'mcb-rccb-replacement',
          name: 'MCB / RCCB Distribution Box Repair',
          categorySlug: 'electrician',
          subcategorySlug: 'wiring',
          subgroupName: 'Wiring & MCB Distribution Box',
          shortDesc: 'Replace buzzing, stuck or constantly tripping MCBs with Havells/Schneider breakers.',
          rating: 4.92,
          reviewsCount: 310,
          duration: '45 mins',
          startingPrice: 299,
          inclusions: ['Trip load analysis', 'Busbar phase tightening', 'MCB replacement & test trip'],
          exclusions: ['Cost of new MCB/ELCB breaker unit']
        },
        {
          id: 'elec-internal-rewiring',
          slug: 'internal-circuit-rewiring',
          name: 'Internal Conduit / Surface Rewiring (Per Point)',
          categorySlug: 'electrician',
          subcategorySlug: 'wiring',
          subgroupName: 'Wiring & MCB Distribution Box',
          shortDesc: 'Pulling flame-retardant FRLS copper wire through conduit pipes with fish tape.',
          rating: 4.89,
          reviewsCount: 220,
          duration: '45–90 mins',
          startingPrice: 249,
          inclusions: ['Wire pulling through conduit', 'Terminal connection & sleeve insulation']
        }
      ]
    },
    {
      id: 'group-inverter',
      name: 'Inverter & Power Backup',
      slug: 'inverter',
      description: 'Keep your home powered during load shedding and grid outages',
      services: [
        {
          id: 'elec-inverter-setup',
          slug: 'new-inverter-battery-setup',
          name: 'New Inverter & Battery Installation',
          categorySlug: 'electrician',
          subcategorySlug: 'inverter',
          subgroupName: 'Inverter & Power Backup',
          shortDesc: 'Dual battery terminal connection, bypass switch wiring, and dedicated sub-circuit link.',
          rating: 4.90,
          reviewsCount: 340,
          duration: '60 mins',
          startingPrice: 599,
          inclusions: ['Heavy-gauge battery terminal cabling', 'Bypass switch wiring', 'Earthing check and load test'],
          exclusions: ['Inverter / Battery trolley']
        },
        {
          id: 'elec-inverter-service',
          slug: 'inverter-health-check-water-topup',
          name: 'Inverter Health Check & Terminal Cleaning',
          categorySlug: 'electrician',
          subcategorySlug: 'inverter',
          subgroupName: 'Inverter & Power Backup',
          shortDesc: 'Sulphation removal, petroleum jelly application, distilled water top-up and charging voltage calibration.',
          rating: 4.88,
          reviewsCount: 215,
          duration: '30–45 mins',
          startingPrice: 299,
          inclusions: ['Terminal cleaning & anti-corrosion coat', 'Specific gravity hydrometer check', 'Output inverter voltage check']
        }
      ]
    },
    {
      id: 'group-appliances',
      name: 'Appliance Electrical Connections',
      slug: 'appliances',
      description: 'Heavy 16A/20A power outlets for Geysers, ACs and Kitchen Appliances',
      services: [
        {
          id: 'elec-geyser-power-point',
          slug: 'geyser-16a-power-point',
          name: 'Geyser / AC 16A/20A Power Point Setup',
          categorySlug: 'electrician',
          subcategorySlug: 'appliances',
          subgroupName: 'Appliance Electrical Connections',
          shortDesc: 'High-amperage dedicated circuit point with 2.5mm wire and heavy-duty socket to prevent burnout.',
          rating: 4.91,
          reviewsCount: 380,
          duration: '45 mins',
          startingPrice: 349,
          inclusions: ['Dedicated 16A switch + socket board', 'Testing line resistance', 'Full load thermal check']
        },
        {
          id: 'elec-ro-microwave-point',
          slug: 'ro-microwave-electrical-point',
          name: 'RO / Microwave / Chimney Power Point',
          categorySlug: 'electrician',
          subcategorySlug: 'appliances',
          subgroupName: 'Appliance Electrical Connections',
          shortDesc: 'Kitchen appliance electrical point with safety earthing.',
          rating: 4.86,
          reviewsCount: 190,
          duration: '35 mins',
          startingPrice: 249,
          inclusions: ['Surface conduit wiring up to 3m', 'Socket & faceplate install']
        }
      ]
    }
  ],
  faqs: [
    {
      question: 'What electrical services does Gharkasathi provide?',
      answer: 'Gharkasathi offers end-to-end electrical solutions in Raipur including switchboard repair, ceiling fan installation, internal circuit rewiring, MCB trip troubleshooting, chandelier fitting, inverter setup, and 16A appliance point connections.'
    },
    {
      question: 'Do you provide emergency same-day electrician services in Raipur?',
      answer: 'Yes! We have dedicated Sathis stationed across Currency Tower, Shankar Nagar, VIP Road, Telibandha, Devendra Nagar, and Tatibandh offering 30-minute doorstep dispatch for critical faults and power outages.'
    },
    {
      question: 'Are spare parts (switches, wires, MCBs) included in the service cost?',
      answer: 'Our standard pricing covers professional diagnostic labor, precision testing tools, and installation. If replacement switches, MCBs, or cables are needed, you can provide them yourself or purchase authentic branded parts via our partner with a genuine bill.'
    },
    {
      question: 'How are service charges calculated?',
      answer: 'We maintain 100% transparent standard rate cards starting at ₹149. No hidden charges or arbitrary post-job quotes. You see the exact rate before booking.'
    },
    {
      question: 'Are Gharkasathi electricians certified and verified?',
      answer: 'Every Gharkasathi electrician partner is background-checked, police-verified, and certified through our technical skill evaluation module in Raipur.'
    }
  ],
  seoMeta: {
    heading: 'Professional Electrician Services in Raipur & Durg',
    paragraphs: [
      'Gharkasathi provides certified, background-checked electricians for residential apartments, independent bungalows, offices, and commercial establishments throughout Raipur.',
      'From emergency short-circuit resolution to complete modular switchboard revamps and power backup inverter installations, our uniformed Sathis carry professional insulated tools and digital multimeters for guaranteed safety.'
    ],
    serviceAreas: ['Shankar Nagar', 'Telibandha / VIP Road', 'Devendra Nagar', 'Samta Colony', 'Tatibandh', 'Pandri', 'Civil Lines', 'Bhilai', 'Durg'],
    relatedCategories: [
      { name: 'Plumber Services', slug: 'plumber' },
      { name: 'Carpenter Services', slug: 'carpenter' },
      { name: 'Home Appliances Repair', slug: 'home-appliances' },
      { name: 'Care & Maintenance AMC', slug: 'care-and-amc' }
    ]
  }
};

// 2. PLUMBER
export const PLUMBER_CATEGORY_DATA: ServiceCategoryMeta = {
  id: 'plumber',
  slug: 'plumber',
  name: 'Plumber Services in Raipur',
  shortTitle: 'Plumber',
  tagline: 'Verified plumbers for tap leakage, blockages, toilet & bathroom fittings',
  description: 'Book certified plumbers for bathroom fittings, pipe leakages, washbasin blockages, and water tank overflows in Raipur.',
  city: 'Raipur, Chhattisgarh',
  rating: 4.90,
  reviewCount: 530,
  completedJobs: '450+ Services Completed',
  iconName: 'Wrench',
  subcategories: [
    { id: 'all', name: 'All Services', slug: 'all', iconName: 'Wrench' },
    { 
      id: 'popular', 
      name: 'Popular Fixes', 
      slug: 'popular', 
      image: 'https://images.unsplash.com/photo-1581244277943-fe4a9c777189?auto=format&fit=crop&w=400&q=80',
      iconName: 'Wrench',
      itemCount: 2
    },
    { 
      id: 'leakage', 
      name: 'Tap & Leakage', 
      slug: 'leakage', 
      image: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=400&q=80',
      iconName: 'Wrench',
      itemCount: 2
    },
    { 
      id: 'blockage', 
      name: 'Drain Blockage', 
      slug: 'blockage', 
      image: 'https://images.unsplash.com/photo-1542013936693-884638332954?auto=format&fit=crop&w=400&q=80',
      iconName: 'Wrench',
      itemCount: 1
    },
    { 
      id: 'toilet', 
      name: 'Toilet & Flush', 
      slug: 'toilet', 
      image: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=400&q=80',
      iconName: 'Wrench',
      itemCount: 1
    }
  ],
  subgroups: [
    {
      id: 'plumb-group-popular',
      name: 'Popular Plumbing Services',
      slug: 'popular',
      description: 'Frequently requested plumbing fixes with instant dispatch',
      services: [
        {
          id: 'plumb-tap-leakage-fix',
          slug: 'tap-repair-leakage-fix',
          name: 'Tap Repair & Dripping Leakage Fix',
          categorySlug: 'plumber',
          subcategorySlug: 'leakage',
          subgroupName: 'Popular Plumbing Services',
          shortDesc: 'Replace worn spindle, teflon washer, ceramic cartridge, or angle valve to stop constant dripping.',
          rating: 4.90,
          reviewsCount: 530,
          duration: '30 mins',
          startingPrice: 199,
          badge: 'Express 30m',
          isPopular: true,
          inclusions: ['Dismantling tap assembly', 'Washer / cartridge replacement', 'Water pressure test'],
          exclusions: ['Cost of replacement tap body'],
          options: [
            { id: 'opt-tap-1', name: '1 Tap Repair / Leakage Stop', price: 199, popular: true },
            { id: 'opt-tap-3', name: 'Up to 3 Taps / Angle Valves', price: 399 },
            { id: 'opt-tap-mixer', name: 'Wall Mixer / Diverter Cartridge Replacement', price: 449 }
          ]
        },
        {
          id: 'plumb-drain-clearing',
          slug: 'washbasin-drain-blockage',
          name: 'Washbasin & Kitchen Sink Unclogging',
          categorySlug: 'plumber',
          subcategorySlug: 'blockage',
          subgroupName: 'Popular Plumbing Services',
          shortDesc: 'Mechanical drain auger snake clearing for clogged food scraps, grease, and hair in waste pipes.',
          rating: 4.88,
          reviewsCount: 410,
          duration: '40 mins',
          startingPrice: 249,
          isPopular: true,
          inclusions: ['Bottle trap dismantling & chemical degreaser flush', 'Drain auger snake pipe cleaning', 'Flow check with running water']
        },
        {
          id: 'plumb-flush-tank-repair',
          slug: 'flush-tank-repair',
          name: 'Toilet Flush Tank / Cistern Repair',
          categorySlug: 'plumber',
          subcategorySlug: 'toilet',
          subgroupName: 'Popular Plumbing Services',
          shortDesc: 'Fix continuous water running, faulty siphon, dual flush buttons, or inlet float valve in commodes.',
          rating: 4.86,
          reviewsCount: 290,
          duration: '40 mins',
          startingPrice: 249,
          isPopular: true,
          inclusions: ['Float valve calibration', 'Siphon ballcock adjustment & leak sealing', 'Testing flush pressure']
        }
      ]
    },
    {
      id: 'plumb-group-fittings',
      name: 'Bathroom & Sanitary Fittings',
      slug: 'fittings',
      description: 'Precision sanitary ware installation with leak-proof seals',
      services: [
        {
          id: 'plumb-shower-install',
          slug: 'shower-head-arm-install',
          name: 'Overhead Rain Shower & Arm Fitting',
          categorySlug: 'plumber',
          subcategorySlug: 'fittings',
          subgroupName: 'Bathroom & Sanitary Fittings',
          shortDesc: 'Mounting designer rain shower, arm extension, and nozzle descaling.',
          rating: 4.89,
          reviewsCount: 180,
          duration: '30 mins',
          startingPrice: 229,
          inclusions: ['Teflon sealing', 'Nozzle spray alignment']
        },
        {
          id: 'plumb-health-faucet',
          slug: 'health-faucet-jet-spray',
          name: 'Health Faucet (Jet Spray) Replacement',
          categorySlug: 'plumber',
          subcategorySlug: 'fittings',
          subgroupName: 'Bathroom & Sanitary Fittings',
          shortDesc: 'Replacing leaking spray pipe, brass hook, and 2-in-1 bib cock.',
          rating: 4.91,
          reviewsCount: 240,
          duration: '20 mins',
          startingPrice: 179,
          inclusions: ['Removing old spray', 'Connecting SS braided hose with rubber seals', 'Testing spray shut-off']
        }
      ]
    }
  ],
  faqs: [
    {
      question: 'What plumbing services are covered in Raipur?',
      answer: 'We cover tap repairs, flush tank servicing, drain unblocking, shower installation, water motor pump connection, geyser inlet/outlet piping, and overhead water tank overflow repairs.'
    },
    {
      question: 'Do your plumbers bring replacement parts?',
      answer: 'Yes, our plumbers carry standard rubber washers, O-rings, teflon tapes, and standard angle valves. Branded fixtures can be provided on actual store bill.'
    }
  ],
  seoMeta: {
    heading: 'Trusted Plumbing Services in Raipur & Bhilai',
    paragraphs: [
      'Stop annoying tap drips and sudden toilet leaks with verified Gharkasathi plumbers across Raipur.',
      'Our team uses precision pipe wrenches and electronic drain snakes for clean, mess-free work.'
    ],
    serviceAreas: ['VIP Road', 'Telibandha', 'Shankar Nagar', 'Pandri', 'Tatibandh', 'Bhilai Sector 6'],
    relatedCategories: [
      { name: 'Electrician Services', slug: 'electrician' },
      { name: 'Carpenter Services', slug: 'carpenter' },
      { name: 'Deep Cleaning', slug: 'cleaning' }
    ]
  }
};

// 3. CARPENTER
export const CARPENTER_CATEGORY_DATA: ServiceCategoryMeta = {
  id: 'carpenter',
  slug: 'carpenter',
  name: 'Carpenter Services in Raipur',
  shortTitle: 'Carpenter',
  tagline: 'Door locks, bed assembly, hydraulic hinges & drill and hang services',
  description: 'Verified carpenters in Raipur for lock changes, modular furniture assembly, curtain rod drilling, and window repairs.',
  city: 'Raipur, Chhattisgarh',
  rating: 4.88,
  reviewCount: 430,
  completedJobs: '400+ Services Completed',
  iconName: 'Hammer',
  subcategories: [
    { id: 'all', name: 'All Services', slug: 'all', iconName: 'Hammer' },
    { 
      id: 'popular', 
      name: 'Popular Woodwork', 
      slug: 'popular', 
      image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=400&q=80',
      iconName: 'Hammer',
      itemCount: 3
    },
    { 
      id: 'locks', 
      name: 'Locks & Latches', 
      slug: 'locks', 
      image: 'https://images.unsplash.com/photo-1558002038-1055907df827?auto=format&fit=crop&w=400&q=80',
      iconName: 'Hammer',
      itemCount: 1
    },
    { 
      id: 'drill-hang', 
      name: 'Drill & Hang', 
      slug: 'drill-hang', 
      image: 'https://images.unsplash.com/photo-1504148455328-c376907d081c?auto=format&fit=crop&w=400&q=80',
      iconName: 'Hammer',
      itemCount: 1
    },
    { 
      id: 'furniture', 
      name: 'Furniture Assembly', 
      slug: 'furniture', 
      image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=400&q=80',
      iconName: 'Hammer',
      itemCount: 1
    }
  ],
  subgroups: [
    {
      id: 'carp-group-popular',
      name: 'Popular Carpentry Services',
      slug: 'popular',
      description: 'Essential woodwork, assembly and fixing solutions',
      services: [
        {
          id: 'carp-drill-hang-service',
          slug: 'drill-and-hang-frames-curtains',
          name: 'Drill & Hang (Frames, Curtains & Shelves)',
          categorySlug: 'carpenter',
          subcategorySlug: 'drill-hang',
          subgroupName: 'Popular Carpentry Services',
          shortDesc: 'Safe rotary hammer drilling with rawlplugs for wall hangings, mirrors, curtains & TV mounts.',
          rating: 4.92,
          reviewsCount: 512,
          duration: '30 mins',
          startingPrice: 199,
          badge: 'Top Rated',
          isPopular: true,
          inclusions: ['Laser level leveling', 'Dust containment while drilling', 'Heavy duty wall rawlplugs included'],
          options: [
            { id: 'opt-drill-3', name: 'Up to 3 Items (Frames / Mirrors)', price: 199, popular: true },
            { id: 'opt-drill-6', name: 'Up to 6 Items (Frames / Curtains)', price: 349 },
            { id: 'opt-drill-tv', name: 'TV Wall Mount Installation (Up to 55")', price: 449 }
          ]
        },
        {
          id: 'carp-lock-replacement',
          slug: 'door-lock-handle-replacement',
          name: 'Door Lock & Handle Replacement',
          categorySlug: 'carpenter',
          subcategorySlug: 'locks',
          subgroupName: 'Popular Carpentry Services',
          shortDesc: 'Repair or installation of main door cylindrical locks, mortise handles and tower bolts.',
          rating: 4.88,
          reviewsCount: 320,
          duration: '45 mins',
          startingPrice: 249,
          isPopular: true,
          inclusions: ['Precision chiseling and alignment', 'Testing mechanism with 3 keys', 'Cleanup of sawdust'],
          options: [
            { id: 'opt-lock-repair', name: 'Lock Repair / Jamming Fix', price: 249, popular: true },
            { id: 'opt-lock-install', name: 'New Mortise Lock Installation', price: 399 },
            { id: 'opt-digital-lock', name: 'Smart Digital Lock Installation', price: 699 }
          ]
        },
        {
          id: 'carp-bed-assembly',
          slug: 'bed-wardrobe-assembly',
          name: 'Bed & Wardrobe Assembly / Repair',
          categorySlug: 'carpenter',
          subcategorySlug: 'furniture',
          subgroupName: 'Popular Carpentry Services',
          shortDesc: 'Assembly, soft-close hinge replacement, hydraulic lift repair for king/queen beds and modular wardrobes.',
          rating: 4.84,
          reviewsCount: 240,
          duration: '60 mins',
          startingPrice: 449,
          isPopular: true,
          inclusions: ['Aligning side panels and headboard', 'Tightening Allen bolts', 'Hydraulic shock pump testing'],
          options: [
            { id: 'opt-bed-single', name: 'Single Bed Assembly / Repair', price: 449 },
            { id: 'opt-bed-queen', name: 'Queen / King Bed Assembly (Non-hydraulic)', price: 649, popular: true },
            { id: 'opt-bed-hydraulic', name: 'Hydraulic Bed Assembly / Lift Gas Pump Fix', price: 899 }
          ]
        }
      ]
    }
  ],
  faqs: [
    {
      question: 'Can your carpenters assemble IKEA or Urban Ladder furniture?',
      answer: 'Yes, our carpenters are experienced with flat-pack assembly manuals from IKEA, Pepperfry, Urban Ladder, and Amazon.'
    }
  ],
  seoMeta: {
    heading: 'Experienced Carpenters in Raipur',
    paragraphs: ['Get quick, reliable carpentry and drill work done with zero hassle.'],
    serviceAreas: ['Raipur', 'Bhilai', 'Durg'],
    relatedCategories: [
      { name: 'Electrician', slug: 'electrician' },
      { name: 'Modular Kitchen Interior', slug: 'interior' }
    ]
  }
};

// Map of all service categories to enable ONE dynamic universal template
export const ALL_SERVICE_CATEGORIES_REGISTRY: Record<string, ServiceCategoryMeta> = {
  electrician: ELECTRICIAN_CATEGORY_DATA,
  plumber: PLUMBER_CATEGORY_DATA,
  carpenter: CARPENTER_CATEGORY_DATA,
  painting: {
    ...ELECTRICIAN_CATEGORY_DATA,
    id: 'painting',
    slug: 'painting',
    name: 'Painting Services in Raipur',
    shortTitle: 'Painting',
    tagline: 'Interior, exterior, texture walls & waterproof primer painting',
    iconName: 'Paintbrush',
    rating: 4.93,
    reviewCount: 310,
    subcategories: [
      { id: 'all', name: 'All Services', slug: 'all' },
      { id: 'interior', name: 'Interior Wall Painting', slug: 'interior' },
      { id: 'waterproof', name: 'Waterproofing & Primer', slug: 'waterproof' }
    ],
    subgroups: [
      {
        id: 'paint-popular',
        name: 'Popular Painting Services',
        slug: 'popular',
        services: [
          {
            id: 'paint-room-touchup',
            slug: 'single-room-touchup',
            name: 'Single Room / Accent Wall Painting',
            categorySlug: 'painting',
            subcategorySlug: 'interior',
            subgroupName: 'Popular Painting Services',
            shortDesc: 'Putty touch-up, sanding, double-coat Asian Paints Royale or Tractor Emulsion.',
            rating: 4.93,
            reviewsCount: 310,
            duration: '2-4 hours',
            startingPrice: 1499,
            isPopular: true,
            inclusions: ['Floor masking with plastic sheet', 'Double coat application', 'Post-paint cleanup']
          }
        ]
      }
    ]
  },
  cleaning: {
    ...ELECTRICIAN_CATEGORY_DATA,
    id: 'cleaning',
    slug: 'cleaning',
    name: 'Cleaning Services in Raipur',
    shortTitle: 'Cleaning',
    tagline: 'Deep home cleaning, sofa sanitization & bathroom descaling',
    iconName: 'Sparkles',
    rating: 4.95,
    reviewCount: 720,
    subcategories: [
      { id: 'all', name: 'All Services', slug: 'all', iconName: 'Sparkles' },
      { 
        id: 'sofa', 
        name: 'Sofa & Carpet', 
        slug: 'sofa', 
        image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=400&q=80',
        iconName: 'Sparkles',
        itemCount: 3
      },
      { 
        id: 'deep-clean', 
        name: 'Full Home Deep Clean', 
        slug: 'deep-clean', 
        image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=400&q=80',
        iconName: 'Sparkles',
        itemCount: 2
      },
      { 
        id: 'bathroom', 
        name: 'Bathroom & Kitchen', 
        slug: 'bathroom', 
        image: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=400&q=80',
        iconName: 'Sparkles',
        itemCount: 2
      },
      { 
        id: 'water-tank', 
        name: 'Water Tank Cleaning', 
        slug: 'water-tank', 
        image: 'https://images.unsplash.com/photo-1541888946425-d0fbb18086f6?auto=format&fit=crop&w=400&q=80',
        iconName: 'Sparkles',
        itemCount: 1
      }
    ],
    subgroups: [
      {
        id: 'clean-sofa-group',
        name: 'Sofa & Upholstery Cleaning',
        slug: 'sofa',
        description: 'German spray-extraction machine wash with eco-friendly chemical foam',
        services: [
          {
            id: 'clean-sofa-shampoo',
            slug: 'sofa-deep-cleaning',
            name: 'Fabric Sofa Shampoo & Extraction',
            categorySlug: 'cleaning',
            subcategorySlug: 'sofa',
            subgroupName: 'Sofa & Upholstery Cleaning',
            shortDesc: 'High-suction German extraction machine, biodegradable chemical foam, stain removal & anti-mite spray.',
            rating: 4.95,
            reviewsCount: 720,
            duration: '45–60 mins',
            startingPrice: 549,
            isPopular: true,
            badge: 'Bestseller',
            imageUrl: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=600&q=80',
            inclusions: ['Deep dry vacuuming', 'Enzymatic shampoo scrubbing', 'Moisture extraction (90% dry)', 'Anti-mite sanitization mist'],
            exclusions: ['Fabric tear repair', 'Permanent bleached acid burn reversal'],
            options: [
              { id: 'opt-sofa-3', name: '3 Seater Fabric Sofa', price: 549, popular: true },
              { id: 'opt-sofa-5', name: '5 Seater (3+1+1 or L-shape)', price: 849 },
              { id: 'opt-sofa-l', name: 'L-Shaped 6-7 Seater Sectional', price: 1199 }
            ]
          },
          {
            id: 'clean-leather-sofa',
            slug: 'leather-sofa-spa-polish',
            name: 'Leather Sofa Polish & Nourishing Spa',
            categorySlug: 'cleaning',
            subcategorySlug: 'sofa',
            subgroupName: 'Sofa & Upholstery Cleaning',
            shortDesc: 'Gentle pH-balanced leather cleansing, deep dirt lift, beeswax conditioning balm & machine buffing.',
            rating: 4.91,
            reviewsCount: 310,
            duration: '45–60 mins',
            startingPrice: 699,
            imageUrl: 'https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?auto=format&fit=crop&w=600&q=80',
            inclusions: ['Microfiber dry wipe', 'Leather foam dirt extraction', 'Natural beeswax conditioning balm', 'High-speed lint-free buffing'],
            exclusions: ['Leather peeling repair or re-dyeing'],
            options: [
              { id: 'opt-lsofa-3', name: '3 Seater Leather Sofa', price: 899, popular: true },
              { id: 'opt-lsofa-5', name: '5 Seater Leather Sofa', price: 1349 },
              { id: 'opt-lsofa-l', name: 'Luxury Sectional Suite', price: 1799 }
            ]
          },
          {
            id: 'clean-carpet-shampoo',
            slug: 'carpet-rug-deep-shampoo',
            name: 'Carpet & Area Rug Deep Shampoo',
            categorySlug: 'cleaning',
            subcategorySlug: 'sofa',
            subgroupName: 'Sofa & Upholstery Cleaning',
            shortDesc: 'High-power rotary agitation and hot extraction for shaggy, woolen and living room carpets.',
            rating: 4.88,
            reviewsCount: 420,
            duration: '35–50 mins',
            startingPrice: 450,
            imageUrl: 'https://images.unsplash.com/photo-1600121848594-d8644e57abab?auto=format&fit=crop&w=600&q=80',
            inclusions: ['Rotary dry soil agitation', 'Active foam shampooing', 'High-pressure moisture extraction', 'Pile grooming'],
            options: [
              { id: 'opt-crp-sm', name: 'Small Rug (< 25 sq.ft)', price: 450 },
              { id: 'opt-crp-med', name: 'Medium Living Room Carpet (up to 50 sq.ft)', price: 749, popular: true },
              { id: 'opt-crp-lg', name: 'Large Carpet (up to 100 sq.ft)', price: 1149 }
            ]
          }
        ]
      },
      {
        id: 'clean-deep-clean-group',
        name: 'Full Home Deep Cleaning',
        slug: 'deep-clean',
        description: 'Comprehensive mechanized deep cleaning for occupied flats and independent villas',
        services: [
          {
            id: 'clean-full-home-deep',
            slug: 'full-home-mechanized-deep-cleaning',
            name: 'Complete Home Deep Cleaning (Furnished)',
            categorySlug: 'cleaning',
            subcategorySlug: 'deep-clean',
            subgroupName: 'Full Home Deep Cleaning',
            shortDesc: 'Single-disc floor scrubbing, window channels, balcony descaling, cobweb suction & door wiping.',
            rating: 4.96,
            reviewsCount: 880,
            duration: '4–6 hours',
            startingPrice: 2499,
            isPopular: true,
            badge: 'Most Popular',
            imageUrl: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=600&q=80',
            inclusions: ['Mechanized floor scrubbing', 'Kitchen grease & exhaust degreasing', 'Bathrooms descaling & tile grout cleaning', 'Window tracks & fan dusting'],
            options: [
              { id: 'opt-home-1bhk', name: '1 BHK Complete Home', price: 2499 },
              { id: 'opt-home-2bhk', name: '2 BHK Complete Home', price: 3499, popular: true },
              { id: 'opt-home-3bhk', name: '3 BHK Complete Home', price: 4699 }
            ]
          },
          {
            id: 'clean-unfurnished-flat',
            slug: 'move-in-move-out-vacant-cleaning',
            name: 'Move-in / Move-out Vacant Flat Cleaning',
            categorySlug: 'cleaning',
            subcategorySlug: 'deep-clean',
            subgroupName: 'Full Home Deep Cleaning',
            shortDesc: 'Paint-spot removal, heavy acid-free floor buffing, cabinet sanitization before shifting.',
            rating: 4.92,
            reviewsCount: 340,
            duration: '3–5 hours',
            startingPrice: 1999,
            imageUrl: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=600&q=80',
            inclusions: ['Paint and plaster splatter removal', 'Inside/outside cabinet sanitizing', 'Floor scrub with Taski R2', 'Bathroom descaling'],
            options: [
              { id: 'opt-vac-1bhk', name: '1 BHK Vacant Flat', price: 1999 },
              { id: 'opt-vac-2bhk', name: '2 BHK Vacant Flat', price: 2899, popular: true },
              { id: 'opt-vac-3bhk', name: '3 BHK Vacant Flat', price: 3799 }
            ]
          }
        ]
      },
      {
        id: 'clean-bathroom-group',
        name: 'Bathroom & Kitchen Cleaning',
        slug: 'bathroom',
        description: 'Hard water stain removal, tile descaling and kitchen chimney degreasing',
        services: [
          {
            id: 'clean-bath-descaling',
            slug: 'bathroom-deep-cleaning-descaling',
            name: 'Intense Bathroom Descaling & Tile Scrubbing',
            categorySlug: 'cleaning',
            subcategorySlug: 'bathroom',
            subgroupName: 'Bathroom & Kitchen Cleaning',
            shortDesc: 'Removes stubborn yellow hard water scale from taps, tiles, toilet pot, shower glass and washbasins.',
            rating: 4.93,
            reviewsCount: 650,
            duration: '45–60 mins',
            startingPrice: 399,
            isPopular: true,
            imageUrl: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=600&q=80',
            inclusions: ['Non-caustic descaling compound', 'Chrome tap & shower descaling', 'Mirror & glass partition clearing', 'Toilet pot deep sanitized scrub'],
            options: [
              { id: 'opt-bath-1', name: '1 Bathroom Deep Scrub', price: 399, popular: true },
              { id: 'opt-bath-2', name: '2 Bathrooms Combo Scrub', price: 699 },
              { id: 'opt-bath-3', name: '3 Bathrooms Deep Scrub', price: 949 }
            ]
          },
          {
            id: 'clean-kitchen-degrease',
            slug: 'modular-kitchen-degrease-cleaning',
            name: 'Modular Kitchen Degreasing & Oil Clean',
            categorySlug: 'cleaning',
            subcategorySlug: 'bathroom',
            subgroupName: 'Bathroom & Kitchen Cleaning',
            shortDesc: 'Heavy-duty degreaser on tile backsplash, countertop, cabinet exteriors and chimney mesh.',
            rating: 4.89,
            reviewsCount: 390,
            duration: '60–90 mins',
            startingPrice: 999,
            imageUrl: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=600&q=80',
            inclusions: ['Chimney baffle filter soak & clean', 'Gas stove & burner unclogging', 'Countertop & tile degreasing', 'Sink sanitization'],
            options: [
              { id: 'opt-kitch-std', name: 'Standard Kitchen Degrease', price: 999, popular: true },
              { id: 'opt-kitch-deep', name: 'Deep Kitchen + Inner Cabinets', price: 1499 }
            ]
          }
        ]
      },
      {
        id: 'clean-watertank-group',
        name: 'Water Tank Cleaning',
        slug: 'water-tank',
        description: 'Mechanized 6-stage overhead Sintex tank and underground RCC sump cleaning',
        services: [
          {
            id: 'clean-tank-sintex',
            slug: 'overhead-water-tank-cleaning',
            name: '6-Stage Mechanized Water Tank Cleaning',
            categorySlug: 'cleaning',
            subcategorySlug: 'water-tank',
            subgroupName: 'Water Tank Cleaning',
            shortDesc: 'Submersible sludge dewatering, 130-bar pressure jetting, vacuum slurry removal & UV sterilization.',
            rating: 4.94,
            reviewsCount: 510,
            duration: '45–60 mins',
            startingPrice: 499,
            isPopular: true,
            imageUrl: 'https://images.unsplash.com/photo-1541888946425-d0fbb18086f6?auto=format&fit=crop&w=600&q=80',
            inclusions: ['Sludge dewatering pump', '130-bar rotary pressure jet wash', 'Slurry vacuuming (zero puddle left)', 'UV antibacterial radiation sweep'],
            options: [
              { id: 'opt-tank-1000', name: 'Overhead Sintex (Up to 1000L)', price: 499, popular: true },
              { id: 'opt-tank-2000', name: 'Large Overhead Tank (Up to 2000L)', price: 749 },
              { id: 'opt-tank-combo', name: '1 Overhead (1000L) + 1 Sump Combo', price: 1299 }
            ]
          }
        ]
      }
    ]
  },
  'home-appliances': {
    ...ELECTRICIAN_CATEGORY_DATA,
    id: 'home-appliances',
    slug: 'home-appliances',
    name: 'Home Appliance Repair in Raipur',
    shortTitle: 'Home Appliances',
    tagline: 'Split & window AC servicing, washing machine, microwave & refrigerator repairs',
    iconName: 'Refrigerator',
    rating: 4.88,
    reviewCount: 420,
    completedJobs: '3,800+ Repaired',
    subcategories: [
      { id: 'all', name: 'All Services', slug: 'all' },
      { id: 'ac', name: 'Air Conditioner (AC)', slug: 'ac' },
      { id: 'wm', name: 'Washing Machine', slug: 'wm' },
      { id: 'fridge', name: 'Refrigerator', slug: 'fridge' }
    ],
    subgroups: [
      {
        id: 'app-popular',
        name: 'Popular Appliance Repairs',
        slug: 'popular',
        services: [
          {
            id: 'app-ac-jet-service',
            slug: 'ac-jet-cleaning-gas-check',
            name: 'AC Jet Cleaning & Gas Check',
            categorySlug: 'home-appliances',
            subcategorySlug: 'ac',
            subgroupName: 'Popular Appliance Repairs',
            shortDesc: 'Indoor coil high-pressure wash with water jacket, blower cleaning, outdoor condenser jet spray & amp test.',
            rating: 4.91,
            reviewsCount: 780,
            duration: '45 mins',
            startingPrice: 499,
            badge: 'Summer Essential',
            isPopular: true,
            inclusions: ['Waterproof protection jacket bag setup', 'Indoor filter & coil anti-fungal foam', 'Gas pressure & current draw check'],
            exclusions: ['Spare parts (copper pipe, capacitor, sensor)'],
            options: [
              { id: 'opt-ac-1', name: '1 Split AC Jet Servicing', price: 499, popular: true },
              { id: 'opt-ac-2', name: '2 Split ACs Combo Jet Service', price: 899 },
              { id: 'opt-ac-gas', name: 'AC Gas Refill (R32 / R410A Complete)', price: 1899 }
            ]
          },
          {
            id: 'app-wm-repair',
            slug: 'washing-machine-repair',
            name: 'Washing Machine Repair & Descaling',
            categorySlug: 'home-appliances',
            subcategorySlug: 'wm',
            subgroupName: 'Popular Appliance Repairs',
            shortDesc: 'Drum descaling, unbalance spin vibration check, PCB controller diagnostics, water inlet valve clearing.',
            rating: 4.86,
            reviewsCount: 340,
            duration: '45 mins',
            startingPrice: 299,
            isPopular: true,
            inclusions: ['Complete 25-point mechanical inspection', 'Drain filter clean', 'Vibration damper balance check'],
            options: [
              { id: 'opt-wm-top', name: 'Top Load Washing Machine Checkup', price: 299, popular: true },
              { id: 'opt-wm-front', name: 'Front Load Washing Machine Checkup', price: 399 },
              { id: 'opt-wm-semi', name: 'Semi-Automatic Spin/Wash Fix', price: 249 }
            ]
          },
          {
            id: 'app-fridge-service',
            slug: 'refrigerator-cooling-gas-refill',
            name: 'Refrigerator Cooling & Gas Refill',
            categorySlug: 'home-appliances',
            subcategorySlug: 'fridge',
            subgroupName: 'Popular Appliance Repairs',
            shortDesc: 'Compressor relay check, thermostat sensor calibration, defrost heater fix and refrigerant gas top-up.',
            rating: 4.88,
            reviewsCount: 290,
            duration: '45 mins',
            startingPrice: 299,
            isPopular: true,
            inclusions: ['Cooling coil inspection', 'Thermostat sensor testing', 'Door magnetic gasket seal check'],
            options: [
              { id: 'opt-fridge-single', name: 'Single Door Refrigerator Service', price: 299 },
              { id: 'opt-fridge-double', name: 'Double Door / Frost Free Service', price: 399, popular: true },
              { id: 'opt-fridge-side', name: 'Side-by-Side Inverter Refrigerator', price: 549 }
            ]
          }
        ]
      }
    ],
    faqs: [
      {
        question: 'Do your AC technicians carry genuine gas cylinders and manifold gauges?',
        answer: 'Yes, our technicians carry certified R32, R410A, and R22 cylinders with digital manifold pressure gauges.'
      },
      {
        question: 'Is there a warranty on appliance repairs?',
        answer: 'Gharkasathi offers a 30-day service warranty on repairs and replaces genuine brand-compatible spares.'
      }
    ],
    seoMeta: {
      heading: 'Home Appliance & AC Repair Services in Raipur',
      paragraphs: ['Fast doorstep appliance repair for ACs, washing machines, and refrigerators in Raipur.'],
      serviceAreas: ['Raipur', 'Bhilai', 'Durg', 'Naya Raipur'],
      relatedCategories: [
        { name: 'Electrician', slug: 'electrician' },
        { name: 'Plumber', slug: 'plumber' }
      ]
    }
  },
  'pest-control': {
    ...ELECTRICIAN_CATEGORY_DATA,
    id: 'pest-control',
    slug: 'pest-control',
    name: 'Pest Control Services in Raipur',
    shortTitle: 'Pest Control',
    tagline: 'Odorless cockroach gel baiting, anti-termite drill-fill-seal & mosquito fogging',
    iconName: 'ShieldAlert',
    rating: 4.91,
    reviewCount: 490,
    completedJobs: '2,900+ Treated',
    subcategories: [
      { id: 'all', name: 'All Treatments', slug: 'all' },
      { id: 'cockroach', name: 'Cockroach & Ants', slug: 'cockroach' },
      { id: 'termite', name: 'Termite Protection', slug: 'termite' },
      { id: 'mosquito', name: 'Mosquito & Bedbugs', slug: 'mosquito' }
    ],
    subgroups: [
      {
        id: 'pest-popular',
        name: 'Popular Pest Control Treatments',
        slug: 'popular',
        services: [
          {
            id: 'pest-cockroach-bait',
            slug: 'cockroach-ant-gel-treatment',
            name: 'Cockroach & Ant Bayer Gel Treatment',
            categorySlug: 'pest-control',
            subcategorySlug: 'cockroach',
            subgroupName: 'Popular Pest Control Treatments',
            shortDesc: '100% odorless Bayer Maxforce gel baiting in kitchen cabinets, cracks, conduits. 90-day warranty.',
            rating: 4.91,
            reviewsCount: 490,
            duration: '30 mins',
            startingPrice: 599,
            badge: '100% Odorless',
            isPopular: true,
            inclusions: ['No need to empty kitchen cabinets', 'Safe for children, senior citizens and pets', '90-day re-service guarantee'],
            options: [
              { id: 'opt-pest-1bhk', name: '1 BHK Anti-Cockroach Treatment', price: 599 },
              { id: 'opt-pest-2bhk', name: '2 BHK Anti-Cockroach Treatment', price: 799, popular: true },
              { id: 'opt-pest-3bhk', name: '3 BHK Anti-Cockroach Treatment', price: 999 }
            ]
          },
          {
            id: 'pest-termite-seal',
            slug: 'termite-drill-fill-seal',
            name: 'Anti-Termite Drill-Fill-Seal Treatment',
            categorySlug: 'pest-control',
            subcategorySlug: 'termite',
            subgroupName: 'Popular Pest Control Treatments',
            shortDesc: 'Precision drilling at skirtings/doorframes, high-pressure chlorpyrifos/fipronil injection & color-matched seal.',
            rating: 4.93,
            reviewsCount: 310,
            duration: '2-3 hours',
            startingPrice: 1499,
            isPopular: true,
            inclusions: ['Drilling along skirting edges & wooden frames', 'Chemical pressure emulsion injection', 'Color matching chalk sealing'],
            options: [
              { id: 'opt-termite-1room', name: 'Single Room / Kitchen Infestation', price: 1499 },
              { id: 'opt-termite-2bhk', name: 'Complete 2 BHK Termite Defense (1 Yr Warranty)', price: 3499, popular: true },
              { id: 'opt-termite-3bhk', name: 'Complete 3 BHK Termite Defense (2 Yr Warranty)', price: 4999 }
            ]
          }
        ]
      }
    ],
    faqs: [
      {
        question: 'Do we have to vacate our house during pest control?',
        answer: 'Not at all. We use 100% odorless, hospital-grade gel baits and microencapsulated sprays that are completely safe for humans and pets.'
      }
    ],
    seoMeta: {
      heading: 'Odorless Pest Control & Termite Treatment in Raipur',
      paragraphs: ['Govt-approved pest management solutions for homes and offices in Raipur.'],
      serviceAreas: ['Raipur', 'Bhilai', 'Durg', 'Naya Raipur'],
      relatedCategories: [
        { name: 'Cleaning', slug: 'cleaning' },
        { name: 'Painting', slug: 'painting' }
      ]
    }
  },
  gardening: {
    ...ELECTRICIAN_CATEGORY_DATA,
    id: 'gardening',
    slug: 'gardening',
    name: 'Gardening & Landscaping in Raipur',
    shortTitle: 'Gardening',
    tagline: 'Balcony garden maintenance, lawn mowing, tree pruning & organic vermicompost',
    iconName: 'Trees',
    rating: 4.87,
    reviewCount: 160,
    completedJobs: '1,200+ Gardens',
    subcategories: [
      { id: 'all', name: 'All Services', slug: 'all' },
      { id: 'balcony', name: 'Balcony Gardening', slug: 'balcony' },
      { id: 'lawn', name: 'Lawn Mowing & Trimming', slug: 'lawn' }
    ],
    subgroups: [
      {
        id: 'gard-popular',
        name: 'Popular Gardening Services',
        slug: 'popular',
        services: [
          {
            id: 'gard-care-lawn',
            slug: 'garden-care-lawn-trimming',
            name: 'Garden Care & Lawn Trimming',
            categorySlug: 'gardening',
            subcategorySlug: 'balcony',
            subgroupName: 'Popular Gardening Services',
            shortDesc: 'Hedge trimming, weeding, soil aerating, vermicompost application, and bio-pesticide spraying for balconies & lawns.',
            rating: 4.87,
            reviewsCount: 160,
            duration: '60 mins',
            startingPrice: 499,
            isPopular: true,
            inclusions: ['Pruning dried stems & shaping hedges', 'Organic neem cake + vermicompost top dressing', 'Pot weeding and garden cleanup'],
            options: [
              { id: 'opt-gard-balcony', name: 'Balcony Garden (Up to 15 Pots)', price: 499, popular: true },
              { id: 'opt-gard-lawn', name: 'Lawn Mowing & Edge Trimming (Up to 500 sq.ft)', price: 899 },
              { id: 'opt-gard-villa', name: 'Large Villa Garden Deep Revamp', price: 1499 }
            ]
          }
        ]
      }
    ],
    faqs: [
      {
        question: 'Do your gardeners bring their own tools and organic fertilizers?',
        answer: 'Yes, our gardeners arrive with hedge shears, grass cutters, trowels, and premium vermicompost packets.'
      }
    ],
    seoMeta: {
      heading: 'Professional Gardeners & Landscape Maintenance in Raipur',
      paragraphs: ['Keep your terrace, balcony, and villa gardens green and blooming all year round.'],
      serviceAreas: ['Raipur', 'Bhilai', 'Durg', 'Kumhari'],
      relatedCategories: [
        { name: 'Cleaning', slug: 'cleaning' },
        { name: 'Plumber', slug: 'plumber' }
      ]
    }
  },
  'movers-packers': {
    ...ELECTRICIAN_CATEGORY_DATA,
    id: 'movers-packers',
    slug: 'movers-packers',
    name: 'Movers & Packers in Raipur',
    shortTitle: 'Movers & Packers',
    tagline: 'Local 1 BHK/2 BHK household shifting, multi-layer packing & GPS covered vehicle',
    iconName: 'Truck',
    rating: 4.90,
    reviewCount: 380,
    completedJobs: '2,400+ Relocations',
    subcategories: [
      { id: 'all', name: 'All Relocations', slug: 'all' },
      { id: 'local', name: 'Local Raipur Shifting', slug: 'local' },
      { id: 'intercity', name: 'Intercity Chhattisgarh', slug: 'intercity' }
    ],
    subgroups: [
      {
        id: 'move-popular',
        name: 'Popular Relocation Packages',
        slug: 'popular',
        services: [
          {
            id: 'move-local-package',
            slug: 'local-home-relocation-shifting',
            name: 'Local Home Relocation & Shifting',
            categorySlug: 'movers-packers',
            subcategorySlug: 'local',
            subgroupName: 'Popular Relocation Packages',
            shortDesc: 'Bubble wrap & corrugated packaging, professional loading, covered GPS vehicle & doorstep placement.',
            rating: 4.90,
            reviewsCount: 380,
            duration: '3-6 hours',
            startingPrice: 2999,
            isPopular: true,
            inclusions: ['Multi-layer bubble wrap & stretch film', 'Disassembly of basic beds/tables', 'Covered weather-proof carrier vehicle'],
            options: [
              { id: 'opt-move-1rk', name: 'Few Items / 1 RK (Mini Truck)', price: 2999 },
              { id: 'opt-move-1bhk', name: '1 BHK Complete Shifting (14 ft Truck)', price: 4999, popular: true },
              { id: 'opt-move-2bhk', name: '2 BHK Shifting (Heavy Furniture Pack)', price: 7499 },
              { id: 'opt-move-3bhk', name: '3 BHK / Villa Shifting', price: 10999 }
            ]
          }
        ]
      }
    ],
    faqs: [
      {
        question: 'Is transit insurance included with Gharkasathi Movers & Packers?',
        answer: 'Yes, all our local and intercity moves are backed by optional comprehensive transit coverage with itemized inventory checklists.'
      }
    ],
    seoMeta: {
      heading: 'Trusted Movers and Packers in Raipur & Durg-Bhilai',
      paragraphs: ['Stress-free household and office shifting with experienced loaders and zero damage.'],
      serviceAreas: ['Raipur', 'Bhilai', 'Durg', 'Bilaspur', 'Rajnandgaon'],
      relatedCategories: [
        { name: 'Carpenter', slug: 'carpenter' },
        { name: 'Cleaning', slug: 'cleaning' }
      ]
    }
  }
};
