// Urban Company Style Comprehensive Cleaning Catalog & Pricing Matrix
// Directly aligned with the Gharkasathi App Screenshots

export interface ServiceOptionItem {
  id: string;
  name: string;
  price: number;
  duration?: string;
  description?: string;
  popular?: boolean;
}

export interface CleaningServiceSubItem {
  id: string;
  name: string;
  categoryId: string;
  categoryName: string;
  rating: number;
  reviewsCount: number;
  basePrice: number;
  imageUrl: string;
  tagline: string;
  duration: string;
  optionsLabel: string; // e.g. "Select Sofa Size:", "Select Mattress Size:", etc.
  options: ServiceOptionItem[];
  whatsIncluded: string[];
  whatsExcluded: string[];
  equipmentUsed: string[];
  processSteps: { step: number; title: string; desc: string }[];
  faqs: { q: string; a: string }[];
}

export interface CleaningCategory {
  id: string;
  name: string;
  hindiName?: string;
  iconName: string;
  imageUrl: string;
  count: number;
  description: string;
  badge?: string;
}

export const CLEANING_CATEGORIES: CleaningCategory[] = [
  {
    id: 'furnished-apartment',
    name: 'Furnished Apartment',
    iconName: 'Home',
    imageUrl: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=600&q=80',
    count: 2,
    description: 'Complete deep cleaning of occupied furnished flats with furniture & appliance care'
  },
  {
    id: 'unfurnished-apartment',
    name: 'Unfurnished Apartment',
    iconName: 'Building',
    imageUrl: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=600&q=80',
    count: 2,
    description: 'Move-in / Move-out vacant flat deep scrubbing, grout restoration & paint marks removal'
  },
  {
    id: 'furnished-independent',
    name: 'Furnished Independent',
    iconName: 'Building2',
    imageUrl: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=600&q=80',
    count: 2,
    description: 'Multi-floor villas, duplexes & kothis with terrace & porch pressure washing'
  },
  {
    id: 'unfurnished-independent',
    name: 'Unfurnished Independent',
    iconName: 'Home',
    imageUrl: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=600&q=80',
    count: 2,
    description: 'Vacant kothis, newly purchased duplexes & handover renovation scrub'
  },
  {
    id: 'room-cleaning',
    name: 'Room Cleaning',
    iconName: 'Bed',
    imageUrl: 'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=600&q=80',
    count: 4,
    description: 'Single bedroom, master bedroom, living hall or study room targeted sanitization'
  },
  {
    id: 'bathroom',
    name: 'Bathroom',
    iconName: 'Bath',
    imageUrl: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=600&q=80',
    count: 3,
    description: 'Hard water salt descaling, ceramic shine, taps buffing & drain deodorization'
  },
  {
    id: 'sofa-cleaning',
    name: 'Sofa Cleaning',
    iconName: 'Armchair',
    imageUrl: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=600&q=80',
    count: 2,
    badge: 'Popular',
    description: 'Fabric shampoo extraction & leather luxury conditioning with zero moisture'
  },
  {
    id: 'carpet-cleaning',
    name: 'Carpet Cleaning',
    iconName: 'Sparkles',
    imageUrl: 'https://images.unsplash.com/photo-1600121848594-d8644e57abab?auto=format&fit=crop&w=600&q=80',
    count: 1,
    description: 'High-pile rugs, Persian carpets & living room floor runners deep extraction'
  },
  {
    id: 'mattress-cleaning',
    name: 'Mattress Cleaning',
    iconName: 'Bed',
    imageUrl: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?auto=format&fit=crop&w=600&q=80',
    count: 1,
    description: 'Anti-dust mite UV-C sanitization, sweat stain treatment & allergen extraction'
  },
  {
    id: 'water-tank-cleaning',
    name: 'Water Tank Cleaning',
    iconName: 'Droplets',
    imageUrl: 'https://images.unsplash.com/photo-1541888946425-d0fbb18086f6?auto=format&fit=crop&w=600&q=80',
    count: 2,
    badge: 'Essential',
    description: '6-Stage scientific cleaning for overhead Sintex tanks and underground sumps'
  },
  {
    id: 'kitchen-cleaning',
    name: 'Kitchen Cleaning',
    iconName: 'ChefHat',
    imageUrl: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=600&q=80',
    count: 2,
    description: 'Oil grease degreasing, modular cabinet wiping, slab buffing & sink descaling'
  },
  {
    id: 'move-in-kitchen',
    name: 'Move In Kitchen Cleaning',
    iconName: 'Utensils',
    imageUrl: 'https://images.unsplash.com/photo-1507089947368-19c1da9775ae?auto=format&fit=crop&w=600&q=80',
    count: 1,
    description: 'Interior shelf sanitization, cockroach repellent treatment & food-grade wipe'
  },
  {
    id: 'commercial-cleaning',
    name: 'Commercial Cleaning',
    iconName: 'Building',
    imageUrl: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=600&q=80',
    count: 1,
    description: 'Shops, clinics, coaching institutes, corporate offices & retail showrooms'
  },
  {
    id: 'chimney-cleaning',
    name: 'Chimney Cleaning',
    iconName: 'Flame',
    imageUrl: 'https://images.unsplash.com/photo-1585704032915-c3400ca199e7?auto=format&fit=crop&w=600&q=80',
    count: 2,
    description: 'Baffle filter chemical dip, motor blower grease degreasing & exterior buffing'
  }
];

export const CLEANING_SERVICES_DATA: CleaningServiceSubItem[] = [
  // 1. SOFA CLEANING
  {
    id: 'srv-fabric-sofa',
    name: 'Fabric Sofa Cleaning',
    categoryId: 'sofa-cleaning',
    categoryName: 'Sofa Cleaning',
    rating: 4.8,
    reviewsCount: 1420,
    basePrice: 549,
    imageUrl: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=800&q=80',
    tagline: 'Deep injection-extraction shampooing for velvet, linen, suede, and microfiber sofas.',
    duration: '45-90 mins',
    optionsLabel: 'Select Sofa Size:',
    options: [
      { id: 'opt-sofa-2', name: '2 Seater', price: 449, duration: '40 mins', description: 'Compact loveseat or 2-seater couch' },
      { id: 'opt-sofa-3', name: '3 Seater', price: 549, duration: '50 mins', description: 'Standard 3-seater living room couch', popular: true },
      { id: 'opt-sofa-4', name: '4 Seater', price: 679, duration: '60 mins', description: '3+1 or 2+2 layout' },
      { id: 'opt-sofa-5', name: '5 Seater', price: 849, duration: '75 mins', description: '3+1+1 or 5-seater L-Shape arrangement' },
      { id: 'opt-sofa-6', name: '6 Seater', price: 979, duration: '85 mins', description: '3+2+1 or L-shape with chaise' },
      { id: 'opt-sofa-7', name: '7 Seater', price: 1049, duration: '95 mins', description: 'Large sectional or 3+2+2' },
      { id: 'opt-sofa-8', name: '8 Seater', price: 1199, duration: '110 mins', description: 'Extended sectional sofa' },
      { id: 'opt-sofa-9', name: '9 Seater', price: 1349, duration: '120 mins', description: 'Large living hall U-shape sectional' },
      { id: 'opt-sofa-10', name: '10 Seater', price: 1499, duration: '135 mins', description: 'Grand luxury palace sectional' }
    ],
    whatsIncluded: [
      'High-power dry vacuuming to remove deep-seated dust, crumbs, and pet hair',
      'Targeted enzyme spot treatment for tea, coffee, oil, and sauce stains',
      'German mechanized rotary soft brush scrub with non-toxic Taski TR101 foam',
      'High-suction moisture extraction ensuring 90% dry on completion',
      'Anti-dust mite sanitization and fresh organic lavender mist'
    ],
    whatsExcluded: [
      'Stitching, cushion sponge replacement or torn upholstery repairs',
      'Bleached discoloration or acid stain reversal (fabric fibers permanently altered)',
      'Dry cleaning of loose throw cushions (can be added as add-on)'
    ],
    equipmentUsed: [
      'Kärcher Puzzi 10/1 Professional Spray-Extraction Cleaner',
      'Taski TR101 Crystallizing Dry Foam Upholstery Shampoo',
      'Soft-bristled non-abrasive rotary agitation heads',
      'Industrial HEPA air-filtered vacuum'
    ],
    processSteps: [
      { step: 1, title: 'Inspection & Dry Vacuum', desc: 'Fabric texture test followed by industrial vacuuming of all cracks and seams.' },
      { step: 2, title: 'Spot Pre-Treatment', desc: 'Application of enzyme stain lifter on tough coffee, grease, and ink spots.' },
      { step: 3, title: 'Mechanized Foam Scrub', desc: 'Gentle rotary agitation generating dense foam that encapsulates dirt.' },
      { step: 4, title: 'High-Vacuum Extraction', desc: 'Powerful 220 mbar suction removes 95% of dirty foam and liquid.' },
      { step: 5, title: 'Sanitization & Grooming', desc: 'UV wand wave, fiber alignment, and anti-bacterial scenting.' }
    ],
    faqs: [
      { q: 'How long does it take for the sofa to dry completely?', a: 'Our high-extraction German machines pull out 90-95% of moisture. With a ceiling fan running, it will be 100% dry and ready to sit in 2 to 3 hours.' },
      { q: 'Are the cleaning chemicals safe for infants and pets?', a: 'Yes, we use eco-certified, non-toxic, and hypoallergenic Taski solutions with zero caustic soda or bleach.' }
    ]
  },
  {
    id: 'srv-leather-sofa',
    name: 'Leather Sofa Cleaning',
    categoryId: 'sofa-cleaning',
    categoryName: 'Sofa Cleaning',
    rating: 4.9,
    reviewsCount: 890,
    basePrice: 899,
    imageUrl: 'https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?auto=format&fit=crop&w=800&q=80',
    tagline: 'Specialized pH-balanced conditioning, dirt lift, and beeswax buffing for genuine & faux leather.',
    duration: '50-100 mins',
    optionsLabel: 'Select Sofa Size:',
    options: [
      { id: 'opt-leather-2', name: '2 Seater', price: 699, duration: '45 mins', description: 'Loveseat leather sofa' },
      { id: 'opt-leather-3', name: '3 Seater', price: 899, duration: '60 mins', description: 'Standard 3-seater genuine/PU leather sofa', popular: true },
      { id: 'opt-leather-4', name: '4 Seater', price: 1099, duration: '70 mins', description: '3+1 or 2+2 leather sofa' },
      { id: 'opt-leather-5', name: '5 Seater', price: 1349, duration: '85 mins', description: '3+1+1 or 5-seater L-shape leather sofa' },
      { id: 'opt-leather-6', name: '6 Seater', price: 1599, duration: '100 mins', description: '6-Seater leather sectional' },
      { id: 'opt-leather-7', name: '7 Seater', price: 1799, duration: '110 mins', description: '7-Seater large sectional' },
      { id: 'opt-leather-8', name: '8 Seater', price: 1999, duration: '120 mins', description: '8-Seater executive leather sofa' },
      { id: 'opt-leather-9', name: '9 Seater', price: 2199, duration: '135 mins', description: 'Grand lounge sectional' },
      { id: 'opt-leather-10', name: '10 Seater', price: 2399, duration: '150 mins', description: 'Luxury boardroom or mansion leather suite' }
    ],
    whatsIncluded: [
      'pH-balanced micro-scrubbing to lift deep grime from leather grains',
      'Crevice extraction for hidden dust and food residue',
      'Leather nourishing balm application with natural beeswax and essential oils',
      'Microfiber high-speed buffing for a rich, supple, non-sticky matte sheen',
      'Protection against cracking, peeling, and UV discoloration'
    ],
    whatsExcluded: [
      'Leather tear stitching, peeling repaint or panel re-upholstery',
      'Deep ink burns or pet claw scratch repair'
    ],
    equipmentUsed: [
      'Microfiber lint-free buffing pads',
      'Diversey Leather Care pH-Neutral Formulation',
      'Horsehair soft grain-lifting brushes',
      'Low-speed orbital polisher'
    ],
    processSteps: [
      { step: 1, title: 'Dry Dusting', desc: 'Removal of all grit and crumbs using soft microfiber cloths.' },
      { step: 2, title: 'Grain Cleansing', desc: 'Mild foaming agent worked into leather pores to release ingrained sweat and sebum.' },
      { step: 3, title: 'Soil Extraction', desc: 'Gentle wiping to remove dirt without scratching the coating.' },
      { step: 4, title: 'Conditioning Balm', desc: 'Penetrating natural oils massaged to restore leather flexibility.' },
      { step: 5, title: 'Hand Buffing', desc: 'Hand-buffed to achieve an OEM showroom luster.' }
    ],
    faqs: [
      { q: 'Will the leather feel slippery or sticky after service?', a: 'Not at all. We use quick-absorbing conditioning waxes that leave a smooth, dry, and luxurious matte texture.' }
    ]
  },

  // 2. MATTRESS CLEANING
  {
    id: 'srv-mattress-cleaning',
    name: 'Mattress Cleaning',
    categoryId: 'mattress-cleaning',
    categoryName: 'Mattress Cleaning',
    rating: 4.8,
    reviewsCount: 750,
    basePrice: 450,
    imageUrl: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?auto=format&fit=crop&w=800&q=80',
    tagline: 'High-frequency vibratory dust mite extraction, steam sanitization, and sweat stain lift.',
    duration: '35-65 mins',
    optionsLabel: 'Select Mattress Size:',
    options: [
      { id: 'opt-mat-single', name: 'Single Bed Mattress', price: 450, duration: '35 mins', description: '3ft x 6ft single cot mattress', popular: true },
      { id: 'opt-mat-double', name: 'Double / Queen Size Bed', price: 699, duration: '50 mins', description: '5ft x 6.5ft queen bed (Both sides)' },
      { id: 'opt-mat-king', name: 'King Size Mattress', price: 899, duration: '65 mins', description: '6ft x 6.5ft large master bed (Both sides)' },
      { id: 'opt-mat-baby', name: 'Baby Cot / Crib Mattress', price: 349, duration: '25 mins', description: 'Infant crib organic steam sanitization' }
    ],
    whatsIncluded: [
      'High-frequency vibratory beating head to dislodge deep dust mites and dead skin',
      'Medical-grade HEPA vacuuming with 99.97% microscopic particle capture',
      'Targeted sweat and urine yellow stain enzyme treatment',
      'UV-C germicidal wand sterilization killing 99.9% of bacteria and allergens',
      'Deodorizing botanical misting for fresh hygienic sleep'
    ],
    whatsExcluded: [
      'Permanent fabric aging stains older than 2 years',
      'Spring repair or internal foam collapse'
    ],
    equipmentUsed: [
      'Raycop Anti-Allergen UV Bed Vacuum with Agitator',
      'Enzymatic Protein Stain Remover',
      'Kärcher High-Temp Steam Wand'
    ],
    processSteps: [
      { step: 1, title: 'Vibratory Agitation', desc: '12,000 vibrations/min shakes loose deeply trapped dust mites.' },
      { step: 2, title: 'HEPA Vacuuming', desc: 'Industrial suction captures dead skin cells and allergens.' },
      { step: 3, title: 'Stain Treatment', desc: 'Biodegradable spot treatment for yellow stains.' },
      { step: 4, title: 'UV-C Sterilization', desc: 'Laboratory tested UV wand destroys bacteria DNA.' }
    ],
    faqs: [
      { q: 'Can I sleep on the mattress the same night?', a: 'Yes! Our dry vibratory and steam-wand system uses minimal surface liquid, leaving the mattress dry within 1-2 hours.' }
    ]
  },

  // 3. CARPET CLEANING
  {
    id: 'srv-carpet-cleaning',
    name: 'Carpet Cleaning',
    categoryId: 'carpet-cleaning',
    categoryName: 'Carpet Cleaning',
    rating: 4.8,
    reviewsCount: 620,
    basePrice: 450,
    imageUrl: 'https://images.unsplash.com/photo-1600121848594-d8644e57abab?auto=format&fit=crop&w=800&q=80',
    tagline: 'Deep injection-extraction shampooing for shaggy rugs, wool carpets, and living room carpets.',
    duration: '30-60 mins',
    optionsLabel: 'Select Carpet Size:',
    options: [
      { id: 'opt-carpet-small', name: 'Small Rug (< 25 sq.ft)', price: 450, duration: '30 mins', description: 'Bedside rug or entryway runner' },
      { id: 'opt-carpet-med', name: 'Medium Carpet (25 - 50 sq.ft)', price: 749, duration: '45 mins', description: 'Center coffee table carpet (e.g. 5x7 ft)', popular: true },
      { id: 'opt-carpet-large', name: 'Large Carpet (50 - 100 sq.ft)', price: 1149, duration: '60 mins', description: 'Full living room area carpet (e.g. 8x10 ft)' },
      { id: 'opt-carpet-extra', name: 'Extra Large / Hall (> 100 sq.ft)', price: 1699, duration: '90 mins', description: 'Oversized wall-to-wall or dining carpet' }
    ],
    whatsIncluded: [
      'Rotary dry soil agitation and industrial vacuum extraction',
      'Active foam shampoo application lifting dirt trapped inside fibers',
      'High-pressure moisture extraction',
      'Fiber grooming to restore natural pile fluffiness'
    ],
    whatsExcluded: ['Fringe thread repair or border stitching'],
    equipmentUsed: ['Kärcher Puzzi 10/1', 'Taski TR103 Carpet Shampoo'],
    processSteps: [
      { step: 1, title: 'Dry Soil Agitation', desc: 'Lifts grit that wears down carpet fibers.' },
      { step: 2, title: 'Foam Application', desc: 'Foam dissolves bonded oil and food stains.' },
      { step: 3, title: 'Hot Water Extraction', desc: 'Pulls out all dissolved contaminants.' }
    ],
    faqs: [
      { q: 'Will this affect silk or delicate hand-knotted rugs?', a: 'Our specialists perform a pH color-fastness patch test prior to starting to guarantee 100% safety.' }
    ]
  },

  // 4. WATER TANK CLEANING
  {
    id: 'srv-water-tank-cleaning',
    name: 'Water Tank Cleaning',
    categoryId: 'water-tank-cleaning',
    categoryName: 'Water Tank Cleaning',
    rating: 4.9,
    reviewsCount: 1840,
    basePrice: 499,
    imageUrl: 'https://images.unsplash.com/photo-1541888946425-d0fbb18086f6?auto=format&fit=crop&w=800&q=80',
    tagline: 'Scientific 6-stage mechanized cleaning: sludge dewatering, high pressure jet, and UV sterilization.',
    duration: '45-90 mins',
    optionsLabel: 'Select Tank Capacity / Type:',
    options: [
      { id: 'opt-tank-500', name: 'Overhead Tank (Up to 500L)', price: 399, duration: '35 mins', description: 'Small rooftop plastic/PVC tank' },
      { id: 'opt-tank-1000', name: 'Overhead Tank (Up to 1000L)', price: 499, duration: '45 mins', description: 'Standard Sintex rooftop tank', popular: true },
      { id: 'opt-tank-1500', name: 'Overhead Tank (1500L - 2000L)', price: 749, duration: '60 mins', description: 'Large overhead residential tank' },
      { id: 'opt-tank-underground', name: 'Underground Sump (Up to 3000L)', price: 999, duration: '75 mins', description: 'RCC cement underground sump' },
      { id: 'opt-tank-combo', name: 'Combo: 1 Overhead (1000L) + 1 Sump', price: 1299, duration: '90 mins', description: 'Complete home water purity bundle' }
    ],
    whatsIncluded: [
      'Stage 1: Mechanized submersible dewatering of dirty water',
      'Stage 2: Heavy-duty sludge removal pump extracting bottom mud and sand',
      'Stage 3: 130-bar high-pressure rotary rotary jet wash on internal walls',
      'Stage 4: Industrial vacuum slurry extraction leaving zero puddle',
      'Stage 5: Non-toxic, food-grade anti-bacterial disinfectant spray',
      'Stage 6: UV-C germicidal radiation destroys suspended pathogens and algae'
    ],
    whatsExcluded: ['Plumbing pipe replacement or float ball valve replacement'],
    equipmentUsed: [
      'Submersible Sludge Dewatering Pump',
      '130-Bar High Pressure Jet Washer',
      'Industrial Wet Slurry Vacuum',
      'Ultraviolet Germicidal Radiator Lamp'
    ],
    processSteps: [
      { step: 1, title: 'Dewatering', desc: 'Fast pumping of old water without flooding your roof.' },
      { step: 2, title: 'Sludge Extraction', desc: 'Bottom sediment and rust sucked out completely.' },
      { step: 3, title: 'High-Pressure Jet', desc: '130-bar jet strips away green biofilm and lime.' },
      { step: 4, title: 'Vacuuming', desc: 'Slurry vacuum cleans out the final droplets.' },
      { step: 5, title: 'Food-Grade Spray', desc: 'Safe chlorine-free anti-bacterial coating.' },
      { step: 6, title: 'UV Sterilization', desc: 'UV wand eliminates all micro-organisms.' }
    ],
    faqs: [
      { q: 'Is the water safe for cooking and drinking immediately after?', a: 'Yes! We do not use harsh bleach or acids. The tank is food-grade sanitized and ready for fresh refill immediately.' }
    ]
  },

  // 5. FURNISHED APARTMENT
  {
    id: 'srv-furnished-apt-basic',
    name: 'Basic Full Home Cleaning',
    categoryId: 'furnished-apartment',
    categoryName: 'Furnished Apartment',
    rating: 4.7,
    reviewsCount: 910,
    basePrice: 3299,
    imageUrl: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80',
    tagline: 'Standard essential cleaning: dry vacuuming, manual floor mopping, bathroom scrub & kitchen wipe.',
    duration: '2-3 hours',
    optionsLabel: 'Select Apartment Size:',
    options: [
      { id: 'opt-fapt-b-1bhk', name: '1 BHK Furnished Flat', price: 2200, duration: '2 hours', description: '1 Room + 1 Hall + 1 Kitchen + 1 Bath' },
      { id: 'opt-fapt-b-2bhk', name: '2 BHK Furnished Flat', price: 3299, duration: '3 hours', description: '2 Rooms + Hall + Kitchen + 2 Baths', popular: true },
      { id: 'opt-fapt-b-3bhk', name: '3 BHK Furnished Flat', price: 4299, duration: '4 hours', description: '3 Rooms + Hall + Kitchen + 3 Baths' },
      { id: 'opt-fapt-b-4bhk', name: '4 BHK / Penthouse', price: 5499, duration: '5 hours', description: 'Large luxury apartment' }
    ],
    whatsIncluded: [
      'Complete dry dusting and cobweb removal from ceilings and fans',
      'Dry vacuuming of all rugs, sofas, and mattresses',
      'Tile floor scrubbing with German disinfectants',
      'Bathrooms wall tile wiping and toilet bowl sanitization',
      'Kitchen platform, sink, and exterior cabinet wipe down'
    ],
    whatsExcluded: ['Interior cabinet clearing', 'Sofa shampoo extraction machine (available as add-on)'],
    equipmentUsed: ['Industrial HEPA Vacuum', 'Taski R-Series Formulations', 'Microfiber Glass Polishers'],
    processSteps: [
      { step: 1, title: 'Cobweb & Dry Dusting', desc: 'Ceiling to floor dry dusting.' },
      { step: 2, title: 'Bathrooms & Kitchen', desc: 'Descaling taps and degreasing counters.' },
      { step: 3, title: 'Floor Sanitization', desc: 'High-grade chemical floor mop.' }
    ],
    faqs: [
      { q: 'Do I need to supply any buckets or ladders?', a: 'No, Gharkasathi teams arrive with complete kitbags including step stools, buckets, machines, and chemicals.' }
    ]
  },
  {
    id: 'srv-furnished-apt-deep',
    name: 'Deep Full Home Cleaning',
    categoryId: 'furnished-apartment',
    categoryName: 'Furnished Apartment',
    rating: 4.9,
    reviewsCount: 1680,
    basePrice: 4499,
    imageUrl: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=800&q=80',
    tagline: 'Heavy-duty single-disc machine floor scrubbing, window slider cleaning, appliance degreasing.',
    duration: '4-6 hours',
    optionsLabel: 'Select Apartment Size:',
    options: [
      { id: 'opt-fapt-d-1bhk', name: '1 BHK Deep Cleaning', price: 3299, duration: '3 hours', description: 'Thorough intensive scrub' },
      { id: 'opt-fapt-d-2bhk', name: '2 BHK Deep Cleaning', price: 4499, duration: '4.5 hours', description: 'Single disc machine + window tracks', popular: true },
      { id: 'opt-fapt-d-3bhk', name: '3 BHK Deep Cleaning', price: 5699, duration: '5.5 hours', description: 'Full apartment deep detailing' },
      { id: 'opt-fapt-d-4bhk', name: '4 BHK / Penthouse Deep', price: 6999, duration: '7 hours', description: 'Team of 4 technicians' }
    ],
    whatsIncluded: [
      'Single-disc rotary floor buffing machine on vitrified tiles/marble',
      'Window track vacuuming, glass streak-free squeegee polishing',
      'Kitchen exhaust and chimney grease lifting with food-grade degreasers',
      'Bathroom hard-water scale removal and grout brightening',
      'Balcony pressure jet wash and railing detailing'
    ],
    whatsExcluded: ['Chandelier delicate crystal dismantling'],
    equipmentUsed: ['Single-Disc Rotary Floor Machine', 'Wet & Dry Industrial Vacuum', 'Taski R1 to R9'],
    processSteps: [
      { step: 1, title: 'Deep Prep', desc: 'Move light furniture and vacuum all perimeter edges.' },
      { step: 2, title: 'Mechanized Scrubbing', desc: 'Machine removes embedded grout stains.' },
      { step: 3, title: 'Detailed Finish', desc: 'Glass, mirrors, switches, and woodwork.' }
    ],
    faqs: [
      { q: 'How many people come for deep cleaning?', a: 'Depending on BHK size, a team of 2 to 4 uniformed technicians is deployed.' }
    ]
  },

  // 6. UNFURNISHED APARTMENT
  {
    id: 'srv-unfurnished-apt-basic',
    name: 'Basic Full Home Cleaning',
    categoryId: 'unfurnished-apartment',
    categoryName: 'Unfurnished Apartment',
    rating: 4.8,
    reviewsCount: 540,
    basePrice: 4499,
    imageUrl: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=800&q=80',
    tagline: 'Ideal for post-tenancy or new possession vacant flats before moving furniture.',
    duration: '3-4 hours',
    optionsLabel: 'Select Apartment Size:',
    options: [
      { id: 'opt-unf-b-1bhk', name: '1 BHK Unfurnished', price: 2499, duration: '2.5 hours', description: 'Complete empty flat sweep & scrub' },
      { id: 'opt-unf-b-2bhk', name: '2 BHK Unfurnished', price: 3499, duration: '3.5 hours', description: 'Standard 2 BHK vacant flat' },
      { id: 'opt-unf-b-3bhk', name: '3 BHK Unfurnished', price: 4499, duration: '4.5 hours', description: 'Spacious 3 BHK vacant flat', popular: true },
      { id: 'opt-unf-b-4bhk', name: '4 BHK Unfurnished', price: 5499, duration: '5.5 hours', description: 'Large luxury empty flat' }
    ],
    whatsIncluded: [
      'Paint splatters and cement residue removal from floors and tiles',
      'All internal empty shelves, wardrobes and modular cabinets wiped',
      'Ceiling fan, switchboards and light fixtures scrubbed',
      'Washrooms and balcony deep pressurized wash'
    ],
    whatsExcluded: ['Fresh wall painting or structural putty'],
    equipmentUsed: ['Floor Scrubber', 'Paint Scrapers', 'Kärcher High Pressure Wand'],
    processSteps: [
      { step: 1, title: 'Paint & Cement Prep', desc: 'Safe scraping of renovation marks.' },
      { step: 2, title: 'Cabinet Interiors', desc: 'Vacuuming sawdust and insect droppings.' },
      { step: 3, title: 'Wet Machine Scrub', desc: 'Polished squeegee dry.' }
    ],
    faqs: [
      { q: 'Is this suitable right after interior woodwork is done?', a: 'Yes! It removes 100% of fine carpenter sawdust and adhesive marks.' }
    ]
  },
  {
    id: 'srv-unfurnished-apt-deep',
    name: 'Deep Full Home Cleaning',
    categoryId: 'unfurnished-apartment',
    categoryName: 'Unfurnished Apartment',
    rating: 4.9,
    reviewsCount: 780,
    basePrice: 4499,
    imageUrl: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=800&q=80',
    tagline: 'Rigorous mechanized scrub for long-neglected or post-civil construction vacant flats.',
    duration: '4-5 hours',
    optionsLabel: 'Select Apartment Size:',
    options: [
      { id: 'opt-unf-d-2bhk', name: '2 BHK Deep Unfurnished', price: 3999, duration: '3.5 hours', description: 'Intensive mechanized scrub' },
      { id: 'opt-unf-d-3bhk', name: '3 BHK Deep Unfurnished', price: 4499, duration: '4.5 hours', description: 'Most popular for new home handovers', popular: true },
      { id: 'opt-unf-d-4bhk', name: '4 BHK Deep Unfurnished', price: 5999, duration: '6 hours', description: 'Full apartment deep detailing' }
    ],
    whatsIncluded: [
      'Mechanized tile floor scrub with rotary machine',
      'Window sliding channels deep vacuum and chemical wash',
      'Bathroom tile chemical descaling and sanitization'
    ],
    whatsExcluded: ['External building facade rappelling'],
    equipmentUsed: ['Rotary Scrubber', 'HEPA Vacuum', 'Acid-Free Descaler'],
    processSteps: [
      { step: 1, title: 'Heavy Debris Clearing', desc: 'Removal of fine construction dust.' },
      { step: 2, title: 'Mechanized Wash', desc: 'Tile grout deep brightening.' }
    ],
    faqs: [
      { q: 'Will the floors be dry when we walk in?', a: 'Yes, our wet vacuum extracts all slurry immediately.' }
    ]
  },

  // 7. FURNISHED INDEPENDENT HOME
  {
    id: 'srv-furn-ind-basic',
    name: 'Basic Full Furnished Independent Home Cleaning',
    categoryId: 'furnished-independent',
    categoryName: 'Furnished Independent',
    rating: 4.8,
    reviewsCount: 380,
    basePrice: 4699,
    imageUrl: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80',
    tagline: 'Multi-level bungalow & kothi cleaning including staircase, porch & common halls.',
    duration: '4-5 hours',
    optionsLabel: 'Select Villa / Plot Built-Up Area:',
    options: [
      { id: 'opt-f-ind-1500', name: 'Up to 1,500 sq.ft (G or G+1)', price: 4699, duration: '4 hours', description: 'Small independent kothi / duplex', popular: true },
      { id: 'opt-f-ind-2500', name: '1,500 - 2,500 sq.ft (G+1)', price: 5999, duration: '5.5 hours', description: 'Standard independent villa' },
      { id: 'opt-f-ind-3500', name: '2,500 - 3,500 sq.ft (G+2)', price: 7499, duration: '7 hours', description: 'Large family bungalow' }
    ],
    whatsIncluded: [
      'Staircase marble cleaning and SS/wood railing wiping',
      'Car porch and entrance gate high-pressure sweep',
      'Living rooms, bedrooms, and modular kitchen clean',
      'All attached bathrooms deep chemical wash'
    ],
    whatsExcluded: ['Terrace garden soil shifting'],
    equipmentUsed: ['High Pressure Jet', 'Commercial Dual-Motor Vacuum'],
    processSteps: [
      { step: 1, title: 'Porch & Exterior', desc: 'Pressure jetting driveway.' },
      { step: 2, title: 'Internal Rooms', desc: 'Floors, fans, and woodwork.' }
    ],
    faqs: [
      { q: 'Do you cover rooftop terrace?', a: 'Yes, light terrace sweep is included; pressure wash can be added.' }
    ]
  },
  {
    id: 'srv-furn-ind-deep',
    name: 'Deep Full Furnished Independent',
    categoryId: 'furnished-independent',
    categoryName: 'Furnished Independent',
    rating: 4.9,
    reviewsCount: 520,
    basePrice: 7199,
    imageUrl: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80',
    tagline: 'The ultimate luxury spa for large bungalows: mechanized floor scrubbing and terrace pressure wash.',
    duration: '6-8 hours',
    optionsLabel: 'Select Villa Built-Up Area:',
    options: [
      { id: 'opt-f-ind-d-1500', name: 'Up to 1,500 sq.ft Deep', price: 5899, duration: '5 hours', description: 'Compact duplex deep clean' },
      { id: 'opt-f-ind-d-2500', name: '1,500 - 2,500 sq.ft Deep', price: 7199, duration: '7 hours', description: 'Multi-floor complete spa', popular: true },
      { id: 'opt-f-ind-d-3500', name: '2,500 - 3,500 sq.ft Deep', price: 8999, duration: '8.5 hours', description: 'Bungalow with dedicated crew of 5' }
    ],
    whatsIncluded: [
      'Mechanized rotary machine scrubbing on all floor levels',
      'Terrace and car porch pressure washer blast',
      'Window glass and frame intensive detailing',
      'Complete bathroom tile descaling and kitchen degrease'
    ],
    whatsExcluded: ['Lawn mowing'],
    equipmentUsed: ['Rotary Scrubber', 'Kärcher K5 Pressure Washer', 'Taski chemicals'],
    processSteps: [
      { step: 1, title: 'Top to Bottom', desc: 'Start at rooftop and work down through living areas.' }
    ],
    faqs: [
      { q: 'How early do the technicians arrive?', a: 'We schedule starting slots at 8:30 AM or 9:00 AM for full-day bungalow deep cleaning.' }
    ]
  },

  // 8. UNFURNISHED INDEPENDENT
  {
    id: 'srv-unfurn-ind-basic',
    name: 'Basic Full Unfurnished Independent',
    categoryId: 'unfurnished-independent',
    categoryName: 'Unfurnished Independent',
    rating: 4.8,
    reviewsCount: 290,
    basePrice: 6199,
    imageUrl: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=800&q=80',
    tagline: 'Vacant bungalow cleaning before moving in your furniture and personal items.',
    duration: '5-6 hours',
    optionsLabel: 'Select Built-Up Size:',
    options: [
      { id: 'opt-u-ind-1500', name: 'Up to 1,500 sq.ft', price: 4999, duration: '4 hours', description: 'Single or two-floor duplex' },
      { id: 'opt-u-ind-2500', name: '1,500 - 2,500 sq.ft', price: 6199, duration: '6 hours', description: 'Standard kothi', popular: true },
      { id: 'opt-u-ind-3500', name: '2,500 - 3,500 sq.ft', price: 7999, duration: '7.5 hours', description: 'Large vacant mansion' }
    ],
    whatsIncluded: [
      'Floor scrubbing to remove white cement and renovation marks',
      'All internal shelves and wardrobe compartments wiped',
      'Bathrooms and kitchen scrubbed',
      'Car porch washed'
    ],
    whatsExcluded: ['Painting'],
    equipmentUsed: ['Floor Scrubber', 'Wet Vacuum'],
    processSteps: [
      { step: 1, title: 'Dust Vacuum', desc: 'Sawdust and debris removal.' }
    ],
    faqs: [
      { q: 'Is water and electricity needed?', a: 'Yes, continuous power and water supply is required for mechanized scrubbing.' }
    ]
  },
  {
    id: 'srv-unfurn-ind-deep',
    name: 'Deep Full Unfurnished Independent',
    categoryId: 'unfurnished-independent',
    categoryName: 'Unfurnished Independent',
    rating: 4.9,
    reviewsCount: 410,
    basePrice: 6199,
    imageUrl: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=800&q=80',
    tagline: 'Deep restoration scrub for newly constructed independent bungalows prior to Griha Pravesh.',
    duration: '6-8 hours',
    optionsLabel: 'Select Built-Up Size:',
    options: [
      { id: 'opt-u-ind-d-1500', name: 'Up to 1,500 sq.ft Deep', price: 5499, duration: '5 hours', description: 'Duplex Griha Pravesh prep' },
      { id: 'opt-u-ind-d-2500', name: '1,500 - 2,500 sq.ft Deep', price: 6199, duration: '7 hours', description: 'Full villa deep scrub', popular: true },
      { id: 'opt-u-ind-d-3500', name: '2,500 - 3,500 sq.ft Deep', price: 8499, duration: '8 hours', description: 'Grand estate deep clean' }
    ],
    whatsIncluded: [
      'Grout brightening with mechanized machine',
      'Window frame adhesive and tape mark removal',
      'Deep terrace, balcony, and porch pressure wash'
    ],
    whatsExcluded: ['Gardening work'],
    equipmentUsed: ['Heavy Industrial Scrubber', 'Kärcher Pressure Jet'],
    processSteps: [{ step: 1, title: 'Full Scrub', desc: 'End-to-end sanitization.' }],
    faqs: [{ q: 'Do you clean the overhead tank?', a: 'Water tank can be added directly with one click.' }]
  },

  // 9. ROOM CLEANING
  {
    id: 'srv-room-unfurnished',
    name: 'Unfurnished BedRoom Cleaning',
    categoryId: 'room-cleaning',
    categoryName: 'Room Cleaning',
    rating: 4.8,
    reviewsCount: 320,
    basePrice: 899,
    imageUrl: 'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=800&q=80',
    tagline: 'Empty bedroom floor scrub, wardrobe interior wipe, window glass polishing and fan dusting.',
    duration: '45 mins',
    optionsLabel: 'Select Number of Bedrooms:',
    options: [
      { id: 'opt-room-1', name: '1 Bedroom', price: 899, duration: '45 mins', description: 'Single bedroom complete scrub', popular: true },
      { id: 'opt-room-2', name: '2 Bedrooms Combo', price: 1599, duration: '80 mins', description: 'Save ₹200 on 2 bedrooms' },
      { id: 'opt-room-3', name: '3 Bedrooms Combo', price: 2199, duration: '120 mins', description: 'Save ₹500 on 3 bedrooms' }
    ],
    whatsIncluded: [
      'Wardrobe inside and outside cleaning',
      'Floor scrubbing and tile grout cleaning',
      'Ceiling fan and switchboard wiping',
      'Window glass and sliding track vacuuming'
    ],
    whatsExcluded: ['Bathroom cleaning (book bathroom separately or combo)'],
    equipmentUsed: ['HEPA Vacuum', 'Taski R2 All-Purpose Cleaner'],
    processSteps: [{ step: 1, title: 'Dry Dusting', desc: 'Ceilings to floors.' }],
    faqs: [{ q: 'Does it take long?', a: 'Around 45 minutes per room.' }]
  },

  // 10. BATHROOM CLEANING
  {
    id: 'srv-bathroom-standard',
    name: 'Standard Bathroom Cleaning',
    categoryId: 'bathroom',
    categoryName: 'Bathroom',
    rating: 4.8,
    reviewsCount: 1980,
    basePrice: 399,
    imageUrl: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=800&q=80',
    tagline: 'Hard water stain removal from tiles, toilet pot descaling, and chrome fixture buffing.',
    duration: '40 mins',
    optionsLabel: 'Select Number of Bathrooms:',
    options: [
      { id: 'opt-bath-1', name: '1 Bathroom', price: 399, duration: '40 mins', description: 'Single bathroom intensive scrub', popular: true },
      { id: 'opt-bath-2', name: '2 Bathrooms Combo', price: 749, duration: '75 mins', description: 'Save ₹50 on combo' },
      { id: 'opt-bath-3', name: '3 Bathrooms Combo', price: 1049, duration: '110 mins', description: 'Save ₹150 on 3 bathrooms' }
    ],
    whatsIncluded: [
      'Hard water scale removal from shower head, taps, and health faucet',
      'Ceramic toilet bowl descaling with specialized acid-free gel',
      'Wall tile and floor grout scrubbing',
      'Mirror streak-free polish and exhaust fan dusting'
    ],
    whatsExcluded: ['Tile regrouting or silicone sealant application'],
    equipmentUsed: ['Diversey Taski R1 & R6', 'Non-Scratch Scouring Pads'],
    processSteps: [
      { step: 1, title: 'Chemical Soak', desc: 'Enzymatic descaling solution applied.' },
      { step: 2, title: 'Scrub & Buff', desc: 'Tile and chrome buffing.' }
    ],
    faqs: [{ q: 'Will my Jaquar chrome fittings lose their shine?', a: 'No, we never use muriatic acid. We use chrome-safe Taski solutions.' }]
  },

  // 11. KITCHEN CLEANING
  {
    id: 'srv-kitchen-deep',
    name: 'Kitchen Deep Cleaning',
    categoryId: 'kitchen-cleaning',
    categoryName: 'Kitchen Cleaning',
    rating: 4.8,
    reviewsCount: 1120,
    basePrice: 900,
    imageUrl: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=800&q=80',
    tagline: 'Countertop degreasing, backsplash tile scrub, modular cabinet exterior wipe, sink descaling.',
    duration: '60-90 mins',
    optionsLabel: 'Select Kitchen Type:',
    options: [
      { id: 'opt-kit-standard', name: 'Standard Kitchen (Up to 80 sq.ft)', price: 900, duration: '60 mins', description: 'L-shape or straight counter', popular: true },
      { id: 'opt-kit-large', name: 'Large / Island Kitchen (> 80 sq.ft)', price: 1299, duration: '90 mins', description: 'Island counter with dual sinks' }
    ],
    whatsIncluded: [
      'Heavy oil and tadka grease removal from tiles above stove',
      'Gas stove burners, knobs, and drip trays descaling',
      'Sink and faucet hard water stain buffing',
      'Floor scrubbing and grease removal'
    ],
    whatsExcluded: ['Inside refrigerator (available as add-on)'],
    equipmentUsed: ['Industrial Degreaser', 'Steam Nozzle'],
    processSteps: [{ step: 1, title: 'Degreasing', desc: 'Warm degreasing spray.' }],
    faqs: [{ q: 'Is it safe for utensils?', a: 'We ask to move exposed foodstuffs; solutions are food-grade.' }]
  },

  // 12. MOVE IN KITCHEN CLEANING
  {
    id: 'srv-movein-kitchen',
    name: 'Move In Kitchen Cleaning',
    categoryId: 'move-in-kitchen',
    categoryName: 'Move In Kitchen Cleaning',
    rating: 4.9,
    reviewsCount: 460,
    basePrice: 900,
    imageUrl: 'https://images.unsplash.com/photo-1507089947368-19c1da9775ae?auto=format&fit=crop&w=800&q=80',
    tagline: 'Interior cabinet sanitization, cockroach gel application, food-grade wipe down before stocking groceries.',
    duration: '75 mins',
    optionsLabel: 'Select Package:',
    options: [
      { id: 'opt-mikit-std', name: 'Move In Kitchen Deep Clean', price: 900, duration: '75 mins', description: 'Every internal drawer, trolley & cabinet', popular: true },
      { id: 'opt-mikit-chimney', name: 'Move In Kitchen + Chimney Combo', price: 1399, duration: '110 mins', description: 'Includes complete chimney degreasing' }
    ],
    whatsIncluded: [
      'Internal cleaning of every drawer, wire basket, and cutlery tray',
      'Exhaust fan, light fixtures, and ceiling fan scrubbing',
      'Slab and backsplash tile buffing',
      'Anti-bacterial wipe ensuring zero chemical residue before grocery placement'
    ],
    whatsExcluded: ['Plumbing changes'],
    equipmentUsed: ['Food-Grade Disinfectant', 'Steam Sanitizer'],
    processSteps: [{ step: 1, title: 'Cabinet Interior', desc: 'Vacuum and wipe each trolley.' }],
    faqs: [{ q: 'Can I put spice boxes immediately?', a: 'Yes, shelves are bone dry and non-toxic sanitized.' }]
  },

  // 13. CHIMNEY CLEANING
  {
    id: 'srv-chimney-basic',
    name: 'Chimney Basic Cleaning',
    categoryId: 'chimney-cleaning',
    categoryName: 'Chimney Cleaning',
    rating: 4.7,
    reviewsCount: 810,
    basePrice: 599,
    imageUrl: 'https://images.unsplash.com/photo-1585704032915-c3400ca199e7?auto=format&fit=crop&w=800&q=80',
    tagline: 'Baffle filter removal and hot chemical dip, outer hood degreasing, and stainless steel polish.',
    duration: '45 mins',
    optionsLabel: 'Select Chimney Type:',
    options: [
      { id: 'opt-chim-b-baffle', name: 'Baffle Filter Chimney (Basic)', price: 599, duration: '45 mins', description: 'Faber, Hindware, Elica, Glen, etc.', popular: true },
      { id: 'opt-chim-b-filterless', name: 'Filterless Chimney Basic', price: 649, duration: '45 mins', description: 'Outer hood and oil collector cup' }
    ],
    whatsIncluded: [
      'Baffle filters unmounted and immersed in hot degreaser dip',
      'Oil collector tray emptied and scrubbed',
      'Exterior hood and control panel streak-free polish'
    ],
    whatsExcluded: ['Motor dismantling or carbon filter replacement'],
    equipmentUsed: ['Thermal Degreaser Bath', 'Stainless Steel Polish'],
    processSteps: [{ step: 1, title: 'Filter Dip', desc: '100% oil dissolves.' }],
    faqs: [{ q: 'How often should chimney be cleaned?', a: 'In Indian cooking with tadka, every 3 to 4 months is recommended.' }]
  },
  {
    id: 'srv-chimney-deep',
    name: 'Chimney Deep Cleaning',
    categoryId: 'chimney-cleaning',
    categoryName: 'Chimney Cleaning',
    rating: 4.9,
    reviewsCount: 940,
    basePrice: 999,
    imageUrl: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=800&q=80',
    tagline: 'Complete disassembly: motor blower degreasing, internal casing scraping, and duct pipe inspection.',
    duration: '75 mins',
    optionsLabel: 'Select Deep Cleaning Option:',
    options: [
      { id: 'opt-chim-d-std', name: 'Chimney Deep Cleaning (With Blower)', price: 999, duration: '75 mins', description: 'Complete internal disassembly & degrease', popular: true },
      { id: 'opt-chim-d-duct', name: 'Deep Cleaning + Duct Pipe Replacement', price: 1499, duration: '90 mins', description: 'Includes heavy-duty aluminum duct pipe' }
    ],
    whatsIncluded: [
      'Blower fan blades scrubbed clean of hardened oil sludge',
      'Internal motor housing wiped',
      'Baffle filters chemical boiling dip',
      'Airflow suction speed test'
    ],
    whatsExcluded: ['Motor coil rewinding'],
    equipmentUsed: ['Motor Blower Degreaser', 'Steam Jet'],
    processSteps: [{ step: 1, title: 'Disassembly', desc: 'Blower unmounted safely.' }],
    faqs: [{ q: 'Will this increase suction power?', a: 'Yes, removing sticky grease from blower fan blades restores up to 40% more suction airflow.' }]
  },

  // 14. COMMERCIAL CLEANING
  {
    id: 'srv-commercial-std',
    name: 'Commercial Cleaning',
    categoryId: 'commercial-cleaning',
    categoryName: 'Commercial Cleaning',
    rating: 4.8,
    reviewsCount: 390,
    basePrice: 599,
    imageUrl: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80',
    tagline: 'Professional janitorial scrub for offices, dental clinics, boutique stores, and showrooms.',
    duration: '60-180 mins',
    optionsLabel: 'Select Office / Shop Area:',
    options: [
      { id: 'opt-comm-500', name: 'Up to 500 sq.ft (Small Office / Clinic)', price: 599, duration: '60 mins', description: 'Workstations, reception & washroom' },
      { id: 'opt-comm-1000', name: '500 - 1,000 sq.ft Office', price: 1199, duration: '120 mins', description: 'Single disc floor scrubbing included', popular: true },
      { id: 'opt-comm-2000', name: '1,000 - 2,000 sq.ft Floor', price: 2199, duration: '180 mins', description: 'Complete corporate office deep clean' }
    ],
    whatsIncluded: [
      'Workstation keyboard and desktop sanitization',
      'Conference table and executive chair vacuuming',
      'Pantry and washroom deep chemical descaling',
      'Main entrance glass streak-free shine'
    ],
    whatsExcluded: ['Server room internal wiring'],
    equipmentUsed: ['Commercial Backpack Vacuum', 'Single-Disc Buffer'],
    processSteps: [{ step: 1, title: 'Desk to Floor', desc: 'Sanitizing all high-touch surfaces.' }],
    faqs: [{ q: 'Can you work on Sundays or after office hours?', a: 'Yes, we offer late evening and weekend corporate slots.' }]
  }
];

export interface CartItem {
  id: string; // unique cart item id
  serviceId: string;
  serviceName: string;
  categoryId: string;
  categoryName: string;
  optionId: string;
  optionName: string;
  price: number;
  convenienceFee: number;
  totalPrice: number;
  quantity: number;
  imageUrl: string;
}
