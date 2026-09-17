// Gharkasathi 9 Core Service Categories & Dynamic Options Catalog
// Aligned with the official Gharkasathi Master Specification

export interface ServiceOptionItem {
  id: string;
  name: string;
  price: number;
  duration?: string;
  description?: string;
  popular?: boolean;
}

export interface ServiceItem {
  id: string;
  categoryId: string;
  categoryName: string;
  name: string;
  rating: number;
  reviewsCount: number;
  basePrice: number;
  priceDisplay: string;
  imageUrl: string;
  description: string;
  duration: string;
  badge?: string;
  optionsLabel?: string;
  options?: ServiceOptionItem[];
  whatsIncluded?: string[];
  whatsExcluded?: string[];
}

export interface ServiceCategory {
  id: string;
  name: string;
  shortDesc: string;
  icon: string; // Lucide icon identifier
  imageUrl: string;
  serviceCount: number;
}

export const CORE_SERVICE_CATEGORIES: ServiceCategory[] = [
  {
    id: 'carpenter',
    name: 'Carpenter',
    shortDesc: 'Door, Window, Curtains, Bed, Drill & Hang Services',
    icon: 'Hammer',
    imageUrl: 'https://images.unsplash.com/photo-1538688525198-9b88f6f53126?auto=format&fit=crop&w=600&q=80',
    serviceCount: 4
  },
  {
    id: 'electrician',
    name: 'Electrician',
    shortDesc: 'Switch & Socket, Lights, Fans & Electrical Repairs',
    icon: 'Zap',
    imageUrl: 'https://images.unsplash.com/photo-1621905252507-b35492cc74b4?auto=format&fit=crop&w=600&q=80',
    serviceCount: 5
  },
  {
    id: 'plumber',
    name: 'Plumber',
    shortDesc: 'Bath Fitting, Basin, Sink, Leakage & Plumbing',
    icon: 'Wrench',
    imageUrl: 'https://images.unsplash.com/photo-1585704032915-c3400ca199e7?auto=format&fit=crop&w=600&q=80',
    serviceCount: 5
  },
  {
    id: 'painting',
    name: 'Painting',
    shortDesc: 'Interior Painting, Exterior Painting & Wall Finishing',
    icon: 'Paintbrush',
    imageUrl: 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&w=600&q=80',
    serviceCount: 3
  },
  {
    id: 'cleaning',
    name: 'Cleaning',
    shortDesc: 'Home Cleaning, Sofa, Carpet, Mattress & Specialized Cleaning',
    icon: 'Sparkles',
    imageUrl: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=600&q=80',
    serviceCount: 5
  },
  {
    id: 'home-appliances',
    name: 'Home Appliances',
    shortDesc: 'AC, Refrigerator, Washing Machine, Microwave & Appliance Services',
    icon: 'Refrigerator',
    imageUrl: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=600&q=80',
    serviceCount: 4
  },
  {
    id: 'movers-packers',
    name: 'Movers and Packers',
    shortDesc: 'Packing, Moving, Loading & Unloading',
    icon: 'Truck',
    imageUrl: 'https://images.unsplash.com/photo-1600585152220-90363fe7e115?auto=format&fit=crop&w=600&q=80',
    serviceCount: 3
  },
  {
    id: 'pest-control',
    name: 'Pest Control',
    shortDesc: 'Cockroach, Termite, Mosquito & General Pest Control',
    icon: 'ShieldAlert',
    imageUrl: 'https://images.unsplash.com/photo-1632778149955-e80f8ceca2e8?auto=format&fit=crop&w=600&q=80',
    serviceCount: 3
  },
  {
    id: 'gardening',
    name: 'Gardening',
    shortDesc: 'Garden Maintenance, Plants, Trimming & Landscaping',
    icon: 'Trees',
    imageUrl: 'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?auto=format&fit=crop&w=600&q=80',
    serviceCount: 3
  }
];

export const CATALOG_SERVICES: ServiceItem[] = [
  // 1. CARPENTER
  {
    id: 'carp-door-lock',
    categoryId: 'carpenter',
    categoryName: 'Carpenter',
    name: 'Door Lock & Handle Replacement',
    rating: 4.88,
    reviewsCount: 320,
    basePrice: 249,
    priceDisplay: '₹249',
    imageUrl: 'https://images.unsplash.com/photo-1538688525198-9b88f6f53126?auto=format&fit=crop&w=600&q=80',
    description: 'Repair or installation of main door cylindrical locks, mortise handles and tower bolts.',
    duration: '45 mins',
    badge: 'Express 30m',
    optionsLabel: 'Select Lock / Service Type:',
    options: [
      { id: 'opt-lock-repair', name: 'Lock Repair / Jamming Fix', price: 249, popular: true },
      { id: 'opt-lock-install', name: 'New Mortise Lock Installation', price: 399 },
      { id: 'opt-digital-lock', name: 'Smart Digital Lock Installation', price: 699 }
    ],
    whatsIncluded: ['Precision chiseling and alignment', 'Testing mechanism with 3 keys', 'Cleanup of sawdust'],
    whatsExcluded: ['Cost of new lock hardware if purchased by customer']
  },
  {
    id: 'carp-drill-hang',
    categoryId: 'carpenter',
    categoryName: 'Carpenter',
    name: 'Drill & Hang (Frames, Curtains & Shelves)',
    rating: 4.92,
    reviewsCount: 512,
    basePrice: 199,
    priceDisplay: '₹199',
    imageUrl: 'https://images.unsplash.com/photo-1504148455328-c376907d081c?auto=format&fit=crop&w=600&q=80',
    description: 'Safe rotary hammer drilling with rawlplugs for wall hangings, mirrors, curtains & TV mount.',
    duration: '30 mins',
    optionsLabel: 'Select Number of Drill Points:',
    options: [
      { id: 'opt-drill-3', name: 'Up to 3 Items (Frames / Mirrors)', price: 199, popular: true },
      { id: 'opt-drill-6', name: 'Up to 6 Items (Frames / Curtains)', price: 349 },
      { id: 'opt-drill-tv', name: 'TV Wall Mount Installation (Up to 55")', price: 449 }
    ]
  },
  {
    id: 'carp-furniture-assembly',
    categoryId: 'carpenter',
    categoryName: 'Carpenter',
    name: 'Bed & Wardrobe Assembly / Repair',
    rating: 4.84,
    reviewsCount: 240,
    basePrice: 449,
    priceDisplay: '₹449',
    imageUrl: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=600&q=80',
    description: 'Expert assembly, hinge replacement, hydraulic lift repair for king/queen beds and wardrobes.',
    duration: '60 mins',
    optionsLabel: 'Select Furniture Size:',
    options: [
      { id: 'opt-bed-single', name: 'Single Bed Assembly / Repair', price: 449 },
      { id: 'opt-bed-queen', name: 'Queen / King Bed Assembly (Non-hydraulic)', price: 649, popular: true },
      { id: 'opt-bed-hydraulic', name: 'Hydraulic Bed Assembly / Lift Gas Pump Fix', price: 899 }
    ]
  },

  // 2. ELECTRICIAN
  {
    id: 'elec-switch-board',
    categoryId: 'electrician',
    categoryName: 'Electrician',
    name: 'Switch Board Repair & Installation',
    rating: 4.91,
    reviewsCount: 640,
    basePrice: 199,
    priceDisplay: '₹199',
    imageUrl: 'https://images.unsplash.com/photo-1621905252507-b35492cc74b4?auto=format&fit=crop&w=600&q=80',
    description: 'Diagnosis and replacement of burned switches, modular sockets, dimmers, and earthing checks.',
    duration: '30 mins',
    badge: 'Express 30m',
    optionsLabel: 'Select Number of Switch Boards:',
    options: [
      { id: 'opt-sw-1', name: '1 Switch Board Repair / Fix', price: 199, popular: true },
      { id: 'opt-sw-3', name: 'Up to 3 Switch Boards', price: 399 },
      { id: 'opt-sw-mcb', name: 'MCB / Main Trip Box Repair', price: 349 }
    ]
  },
  {
    id: 'elec-fan-light',
    categoryId: 'electrician',
    categoryName: 'Electrician',
    name: 'Ceiling Fan & Chandelier Installation',
    rating: 4.89,
    reviewsCount: 420,
    basePrice: 229,
    priceDisplay: '₹229',
    imageUrl: 'https://images.unsplash.com/photo-1540932239986-30128078f3c5?auto=format&fit=crop&w=600&q=80',
    description: 'Ceiling fan mounting, blade balancing, regulator fix, and designer hanging light installations.',
    duration: '40 mins',
    optionsLabel: 'Select Item Type:',
    options: [
      { id: 'opt-fan-install', name: 'Ceiling Fan Installation (1 Unit)', price: 229, popular: true },
      { id: 'opt-fan-repair', name: 'Fan Bearing / Capacitor Replacement', price: 199 },
      { id: 'opt-chandelier', name: 'Chandelier / Decorative Light Fitting', price: 499 }
    ]
  },
  {
    id: 'elec-inverter',
    categoryId: 'electrician',
    categoryName: 'Electrician',
    name: 'Inverter & Battery Setup / Repair',
    rating: 4.86,
    reviewsCount: 180,
    basePrice: 349,
    priceDisplay: '₹349',
    imageUrl: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=600&q=80',
    description: 'Inverter wiring, distilled water top-up, battery terminal cleaning and bypass troubleshooting.',
    duration: '45 mins',
    optionsLabel: 'Select Service Type:',
    options: [
      { id: 'opt-inv-check', name: 'General Health Check & Terminal Cleaning', price: 349, popular: true },
      { id: 'opt-inv-install', name: 'New Inverter + Battery Dual Setup', price: 599 }
    ]
  },

  // 3. PLUMBER
  {
    id: 'plumb-tap-leakage',
    categoryId: 'plumber',
    categoryName: 'Plumber',
    name: 'Tap Repair & Leakage Fix',
    rating: 4.90,
    reviewsCount: 530,
    basePrice: 199,
    priceDisplay: '₹199',
    imageUrl: 'https://images.unsplash.com/photo-1585704032915-c3400ca199e7?auto=format&fit=crop&w=600&q=80',
    description: 'Washer replacement, cartridge fix, dripping bibcock repair, and angle valve installation.',
    duration: '30 mins',
    badge: 'Express 30m',
    optionsLabel: 'Select Number of Taps / Points:',
    options: [
      { id: 'opt-tap-1', name: '1 Tap Repair / Leakage Stop', price: 199, popular: true },
      { id: 'opt-tap-3', name: 'Up to 3 Taps / Angle Valves', price: 399 },
      { id: 'opt-tap-mixer', name: 'Wall Mixer / Diverter Cartridge Replacement', price: 449 }
    ]
  },
  {
    id: 'plumb-drain-blockage',
    categoryId: 'plumber',
    categoryName: 'Plumber',
    name: 'Sink & Bathroom Drain Blockage Clearing',
    rating: 4.94,
    reviewsCount: 460,
    basePrice: 299,
    priceDisplay: '₹299',
    imageUrl: 'https://images.unsplash.com/photo-1507652313519-d4e9174996dd?auto=format&fit=crop&w=600&q=80',
    description: 'Manual snake tool and high-pressure chemical unblocking for choked kitchen sinks and bathroom drains.',
    duration: '45 mins',
    optionsLabel: 'Select Choke Severity / Area:',
    options: [
      { id: 'opt-drain-sink', name: 'Kitchen Sink Drain Pipe Unclogging', price: 299, popular: true },
      { id: 'opt-drain-bath', name: 'Bathroom Floor Trap Blockage', price: 399 },
      { id: 'opt-drain-wc', name: 'Western Toilet Flush / Commode Unchoke', price: 549 }
    ]
  },
  {
    id: 'plumb-geyser-install',
    categoryId: 'plumber',
    categoryName: 'Plumber',
    name: 'Water Heater / Geyser Installation',
    rating: 4.87,
    reviewsCount: 215,
    basePrice: 399,
    priceDisplay: '₹399',
    imageUrl: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=600&q=80',
    description: 'Mounting, inlet/outlet braided connection pipes and safety relief valve setup.',
    duration: '45 mins',
    optionsLabel: 'Select Geyser Type:',
    options: [
      { id: 'opt-geyser-instant', name: 'Instant Geyser (Up to 3 Litres)', price: 399 },
      { id: 'opt-geyser-storage', name: 'Storage Geyser (10L - 25L)', price: 499, popular: true }
    ]
  },

  // 4. PAINTING
  {
    id: 'paint-touchup',
    categoryId: 'painting',
    categoryName: 'Painting',
    name: 'Wall Touch-Up & Waterproof Seepage Fix',
    rating: 4.85,
    reviewsCount: 190,
    basePrice: 999,
    priceDisplay: '₹999',
    imageUrl: 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&w=600&q=80',
    description: 'Putty touch-up, anti-fungal primer coating and Asian Paints Royale matching for damaged spots.',
    duration: '2-3 hours',
    optionsLabel: 'Select Area Scope:',
    options: [
      { id: 'opt-paint-spot', name: 'Single Wall Seepage Treatment & Touch-up', price: 999, popular: true },
      { id: 'opt-paint-room', name: '1 Full Room Repainting (Walls + Ceiling)', price: 2999 },
      { id: 'opt-paint-waterproof', name: 'Dr. Fixit 2-Coat Balcony Waterproofing', price: 1899 }
    ]
  },
  {
    id: 'paint-full-home',
    categoryId: 'painting',
    categoryName: 'Painting',
    name: 'Full Home Fresh Painting (with Materials)',
    rating: 4.93,
    reviewsCount: 310,
    basePrice: 6999,
    priceDisplay: 'Starting ₹6,999',
    imageUrl: 'https://images.unsplash.com/photo-1562259949-e8e7689d7828?auto=format&fit=crop&w=600&q=80',
    description: 'Complete sanding, primer, 2 coats of Asian Paints / Berger, furniture masking & post-job cleanup.',
    duration: '1-3 days',
    optionsLabel: 'Select Home Configuration:',
    options: [
      { id: 'opt-paint-1bhk', name: '1 BHK Complete Painting', price: 6999 },
      { id: 'opt-paint-2bhk', name: '2 BHK Complete Painting', price: 11999, popular: true },
      { id: 'opt-paint-3bhk', name: '3 BHK Complete Painting', price: 16999 }
    ]
  },

  // 5. CLEANING
  {
    id: 'clean-fabric-sofa',
    categoryId: 'cleaning',
    categoryName: 'Cleaning',
    name: 'Fabric Sofa Cleaning (Shampoo & Extraction)',
    rating: 4.92,
    reviewsCount: 840,
    basePrice: 549,
    priceDisplay: '₹549',
    imageUrl: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=800&q=80',
    description: 'Industrial Kärcher injection-extraction, stain treatment with organic eco-friendly foaming chemicals.',
    duration: '45 mins',
    badge: 'Bestseller',
    optionsLabel: 'Select Sofa Size:',
    options: [
      { id: 'opt-sofa-3', name: '3 Seater Sofa', price: 549, popular: true },
      { id: 'opt-sofa-4', name: '4 Seater Sofa', price: 679 },
      { id: 'opt-sofa-5', name: '5 Seater Sofa (3+1+1 or L-Shape)', price: 849 },
      { id: 'opt-sofa-6', name: '6 Seater Sofa', price: 979 },
      { id: 'opt-sofa-7', name: '7 Seater Sofa', price: 1049 },
      { id: 'opt-sofa-8', name: '8 Seater Sofa', price: 1199 },
      { id: 'opt-sofa-10', name: '10 Seater Large Sectional', price: 1499 }
    ]
  },
  {
    id: 'clean-deep-home',
    categoryId: 'cleaning',
    categoryName: 'Cleaning',
    name: 'Full Home Deep Cleaning',
    rating: 4.90,
    reviewsCount: 650,
    basePrice: 1999,
    priceDisplay: '₹1,999',
    imageUrl: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=800&q=80',
    description: 'Single-disc floor scrubbing, kitchen degreasing, bathroom tile descaling, balcony wash, vacuuming.',
    duration: '4-6 hours',
    badge: 'Popular',
    optionsLabel: 'Select Number of Rooms / BHK:',
    options: [
      { id: 'opt-home-1bhk', name: '1 BHK Full Home Deep Clean', price: 1999 },
      { id: 'opt-home-2bhk', name: '2 BHK Full Home Deep Clean', price: 2799, popular: true },
      { id: 'opt-home-3bhk', name: '3 BHK Full Home Deep Clean', price: 3699 },
      { id: 'opt-home-4bhk', name: '4 BHK / Duplex Deep Clean', price: 4799 }
    ]
  },
  {
    id: 'clean-water-tank',
    categoryId: 'cleaning',
    categoryName: 'Cleaning',
    name: 'Water Tank Cleaning (6-Stage UV Sanitization)',
    rating: 4.95,
    reviewsCount: 410,
    basePrice: 499,
    priceDisplay: '₹499',
    imageUrl: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=800&q=80',
    description: 'Sludge pump out, rotary pressure jet scrubbing, anti-bacterial spray, and UV germicidal lamp treatment.',
    duration: '45 mins',
    optionsLabel: 'Select Tank Capacity:',
    options: [
      { id: 'opt-tank-500', name: 'Overhead Sintex (500L - 1,000L)', price: 499, popular: true },
      { id: 'opt-tank-2000', name: 'Overhead Tank (1,500L - 2,000L)', price: 799 },
      { id: 'opt-tank-underground', name: 'Underground Sump (Up to 5,000L)', price: 999 },
      { id: 'opt-tank-combo', name: 'Combo (1 Overhead + 1 Sump)', price: 1299 }
    ]
  },

  // 6. HOME APPLIANCES
  {
    id: 'app-ac-service',
    categoryId: 'home-appliances',
    categoryName: 'Home Appliances',
    name: 'AC Jet Cleaning & Gas Check',
    rating: 4.91,
    reviewsCount: 780,
    basePrice: 499,
    priceDisplay: '₹499',
    imageUrl: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=800&q=80',
    description: 'Indoor coil pressure wash with water jacket bag, blower cleanup, outdoor condenser wash & cooling check.',
    duration: '45 mins',
    badge: 'Summer Essential',
    optionsLabel: 'Select AC Count & Type:',
    options: [
      { id: 'opt-ac-1', name: '1 Split AC Jet Servicing', price: 499, popular: true },
      { id: 'opt-ac-2', name: '2 Split ACs Combo Service', price: 899 },
      { id: 'opt-ac-window', name: 'Window AC Deep Servicing', price: 449 },
      { id: 'opt-ac-gas', name: 'AC Gas Charging (R32 / R410A)', price: 1899 }
    ]
  },
  {
    id: 'app-washing-machine',
    categoryId: 'home-appliances',
    categoryName: 'Home Appliances',
    name: 'Washing Machine Repair / Servicing',
    rating: 4.86,
    reviewsCount: 340,
    basePrice: 299,
    priceDisplay: '₹299',
    imageUrl: 'https://images.unsplash.com/photo-1626806787461-102c1bfaaea1?auto=format&fit=crop&w=800&q=80',
    description: 'Drum descaling, motor vibration check, PCB error diagnosis, drain pump clearing.',
    duration: '45 mins',
    optionsLabel: 'Select Machine Type:',
    options: [
      { id: 'opt-wm-top', name: 'Top Load Washing Machine Checkup', price: 299, popular: true },
      { id: 'opt-wm-front', name: 'Front Load Washing Machine Checkup', price: 399 },
      { id: 'opt-wm-semi', name: 'Semi-Automatic Spin / Wash Fix', price: 249 }
    ]
  },
  {
    id: 'app-refrigerator',
    categoryId: 'home-appliances',
    categoryName: 'Home Appliances',
    name: 'Refrigerator Cooling & Gas Refill',
    rating: 4.88,
    reviewsCount: 290,
    basePrice: 299,
    priceDisplay: '₹299',
    imageUrl: 'https://images.unsplash.com/photo-1571175443880-49e1d25b2bc5?auto=format&fit=crop&w=800&q=80',
    description: 'Compressor check, thermostat sensor calibration, defrost heater fix and refrigerant gas top-up.',
    duration: '45 mins',
    optionsLabel: 'Select Refrigerator Size:',
    options: [
      { id: 'opt-fridge-single', name: 'Single Door Refrigerator Service', price: 299 },
      { id: 'opt-fridge-double', name: 'Double Door / Frost Free Service', price: 399, popular: true },
      { id: 'opt-fridge-side', name: 'Side-by-Side French Door Service', price: 549 }
    ]
  },

  // 7. MOVERS AND PACKERS
  {
    id: 'move-local-shifting',
    categoryId: 'movers-packers',
    categoryName: 'Movers and Packers',
    name: 'Local Home Relocation & Shifting',
    rating: 4.90,
    reviewsCount: 380,
    basePrice: 2999,
    priceDisplay: 'Starting ₹2,999',
    imageUrl: 'https://images.unsplash.com/photo-1600585152220-90363fe7e115?auto=format&fit=crop&w=800&q=80',
    description: 'Bubble wrap & corrugated packaging, professional loading, covered GPS vehicle & doorstep unboxing.',
    duration: '3-6 hours',
    optionsLabel: 'Select House Size:',
    options: [
      { id: 'opt-move-1rk', name: 'Few Items / 1 RK (Mini Truck)', price: 2999 },
      { id: 'opt-move-1bhk', name: '1 BHK Complete Shifting (14 ft Truck)', price: 4999, popular: true },
      { id: 'opt-move-2bhk', name: '2 BHK Shifting (Multi-layer Pack)', price: 7499 },
      { id: 'opt-move-3bhk', name: '3 BHK / Villa Shifting', price: 10999 }
    ]
  },

  // 8. PEST CONTROL
  {
    id: 'pest-general',
    categoryId: 'pest-control',
    categoryName: 'Pest Control',
    name: 'Cockroach & Ant Gel Treatment',
    rating: 4.91,
    reviewsCount: 490,
    basePrice: 599,
    priceDisplay: '₹599',
    imageUrl: 'https://images.unsplash.com/photo-1632778149955-e80f8ceca2e8?auto=format&fit=crop&w=800&q=80',
    description: 'Odorless Bayer Maxforce gel baiting in kitchen cabinets, drains, and electrical conduits. 90-day warranty.',
    duration: '30 mins',
    badge: '100% Odorless',
    optionsLabel: 'Select Apartment Size:',
    options: [
      { id: 'opt-pest-1bhk', name: '1 BHK Anti-Cockroach Treatment', price: 599 },
      { id: 'opt-pest-2bhk', name: '2 BHK Anti-Cockroach Treatment', price: 799, popular: true },
      { id: 'opt-pest-3bhk', name: '3 BHK Anti-Cockroach Treatment', price: 999 },
      { id: 'opt-pest-termite', name: 'Termite Drill-Fill-Seal (Per Room)', price: 1499 }
    ]
  },

  // 9. GARDENING
  {
    id: 'garden-maintenance',
    categoryId: 'gardening',
    categoryName: 'Gardening',
    name: 'Garden Care & Lawn Trimming',
    rating: 4.87,
    reviewsCount: 160,
    basePrice: 499,
    priceDisplay: '₹499',
    imageUrl: 'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?auto=format&fit=crop&w=800&q=80',
    description: 'Hedge trimming, weeding, soil aerating, vermicompost application, and pesticide spraying for balconies & lawns.',
    duration: '60 mins',
    optionsLabel: 'Select Garden Area:',
    options: [
      { id: 'opt-gard-balcony', name: 'Balcony Garden (Up to 15 Pots)', price: 499, popular: true },
      { id: 'opt-gard-lawn', name: 'Lawn Trimming (Up to 500 sq.ft)', price: 899 },
      { id: 'opt-gard-villa', name: 'Large Villa Garden Deep Care', price: 1499 }
    ]
  }
];
