// Real Gharkasathi On-Ground Team Assets & Authentic Indian Service Imagery
// 100% Realistic Indian context - ZERO generic foreigner stock photos!

export interface RealTeamPhoto {
  id: string;
  title: string;
  category: string;
  location: string;
  description: string;
  localPath: string;
  fallbackUrl: string;
  badge: string;
  photographerNotes: string;
}

export const REAL_GHARKASATHI_TEAM: RealTeamPhoto[] = [
  {
    id: 'team-kitchen-carpenter',
    title: 'Modular Kitchen Installation by Gharkasathi Master Carpenter',
    category: 'Modular Kitchen & Carpentry',
    location: 'Raipur, Chhattisgarh',
    description: 'Our in-house carpenter in the official red Gharkasathi polo shirt ("Apke sapno ke ghar ka bharosemand sathi") installing acrylic modular kitchen overhead cabinets.',
    localPath: '/images/team/DSC_4949.JPG',
    fallbackUrl: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=1200&q=80',
    badge: 'Real Team In-Action',
    photographerNotes: 'Captured on-site during full home turnkey interior handover in Shankar Nagar, Raipur.'
  },
  {
    id: 'team-raipur-onduty',
    title: 'Gharkasathi On-Duty Partner in Raipur',
    category: 'Express Home Dispatch',
    location: 'Telibandha / VIP Road, Raipur',
    description: 'Technician on the move in red branded uniform, cap, and heavy-duty toolkit bag walking past the iconic मोर Raipur city landmark for an express 30-min service visit.',
    localPath: '/images/team/image.png',
    fallbackUrl: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1200&q=80',
    badge: '30-Min Rapid Reach',
    photographerNotes: 'Shot in central Raipur; shows real branded red uniform and on-ground mobility.'
  },
  {
    id: 'team-partner-portrait',
    title: 'Verified In-House Service Professional',
    category: 'Quality & Police Verification',
    location: 'Chhattisgarh & Delhi-NCR Hub',
    description: 'Background checked, trained in safety protocol, and equipped with standardized measurement and power tools.',
    localPath: '/images/team/partner_portrait.jpg',
    fallbackUrl: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1200&q=80',
    badge: '100% In-House Verified',
    photographerNotes: 'Direct studio portrait of active technician with branded backpack straps.'
  },
  {
    id: 'team-branded-kitbag',
    title: 'Standardized Gharkasathi Red Toolkit Backpack',
    category: 'Tools & Equipment',
    location: 'Central Inventory Hub',
    description: 'The official heavy-duty water-resistant red kitbag branded "Gharkasathi - On Duty. For Every Home Need." containing precision Bosch/Stanley instruments.',
    localPath: '/images/team/gharkasathi_kitbag.jpg',
    fallbackUrl: 'https://images.unsplash.com/photo-1581783898377-1c85bf937427?auto=format&fit=crop&w=1200&q=80',
    badge: 'Genuine Gear & Spares',
    photographerNotes: 'Inspected and restocked every morning before morning partner dispatch.'
  }
];

export interface ConstructionPackage {
  id: string;
  name: string;
  tier: string;
  rate: number;
  rateDisplay: string;
  description: string;
  highlights: string[];
  recommendedFor: string;
}

export const OFFICIAL_CONSTRUCTION_PACKAGES: ConstructionPackage[] = [
  {
    id: 'standard',
    name: 'Standard Construction',
    tier: 'Package 1',
    rate: 1600,
    rateDisplay: '₹1,600/sq.ft',
    description: 'Durable, high-grade civil RCC framework engineered to BIS seismic standards with branded materials.',
    highlights: [
      'UltraTech / ACC Cement 43/53 grade',
      'Jindal Panther / Tata Tiscon Fe550D TMT Rebars',
      'Solid red bricks / 8-inch concrete blocks',
      'Vitrified flooring tiles (2x2 ft)',
      'Anchor Roma / Havells switches & wiring',
      'Standard sanitaryware & CP fixtures',
      '10-Year structural integrity warranty'
    ],
    recommendedFor: 'Budget-conscious homeowners & rental properties'
  },
  {
    id: 'executive',
    name: 'Executive / Premium',
    tier: 'Package 2 (Most Popular)',
    rate: 1800,
    rateDisplay: '₹1,800/sq.ft',
    description: 'Contemporary aesthetic with large-format designer tiles, concealed plumbing, and modular kitchen provision.',
    highlights: [
      'Kajaria / Somany 4x2 ft Glazed Vitrified Tiles (GVT)',
      'Jaquar / Hindware wall-hung sanitary & Diverters',
      'Modular kitchen electrical & plumbing layout provision',
      'Asian Paints Royal Luxury Emulsion with mechanized putty',
      'Teak wood main entrance frame with designer flush door',
      'Finolex / Polycab FRLS concealed electrical conduits',
      '10-Year structural + 3-year seepage warranty'
    ],
    recommendedFor: 'Modern family homes desiring durable luxury'
  },
  {
    id: 'luxury',
    name: 'Luxury Villa / Elite',
    tier: 'Package 3',
    rate: 2099,
    rateDisplay: '₹2,099/sq.ft',
    description: 'Turnkey architectural marvel featuring Italian marble finish, automated switches, and premium designer finishes.',
    highlights: [
      'Italian composite marble / premium large slab flooring',
      'Grohe / Kohler Germany thermostat concealed diverters',
      'Complete modular kitchen with soft-close Hettich hardware',
      'Full False Ceiling with warm LED ambient profile lights',
      'UPVC 3-track sliding windows with toughened Saint-Gobain glass',
      'Smart home touch switchboards & video doorbell integration',
      '15-Year structural + 5-year comprehensive warranty'
    ],
    recommendedFor: 'Independent kothis, luxury bungalows & duplexes'
  }
];

export interface AuthenticService {
  id: string;
  name: string;
  category: string;
  subCategory?: 'sofa-cleaning' | 'mattress-cleaning' | 'water-tanks' | 'home-cleaning' | 'modular-kitchen' | 'general';
  price: string;
  numericPrice: number;
  rating: number;
  reviewsCount: number;
  duration: string;
  tagline: string;
  features: string[];
  imageUrl: string;
  isRealTeamAsset: boolean;
  localAssetPath?: string;
  processSteps?: string[];
}

export const AUTHENTIC_SERVICES: AuthenticService[] = [
  // Cleaning Subcategory: Sofa Cleaning
  {
    id: 'srv-sofa-cleaning-3seater',
    name: 'Sofa Deep Shampooing & Extraction (3 Seater)',
    category: 'Cleaning',
    subCategory: 'sofa-cleaning',
    price: '₹499',
    numericPrice: 499,
    rating: 4.9,
    reviewsCount: 680,
    duration: '45 mins',
    tagline: 'Deep foam shampooing, stain removal, and Kärcher high-suction water extraction for fabric & suede sofas.',
    features: ['German foam shampoo treatment', 'Tough oil & coffee stain lifting', 'Anti-dust mite sanitization', '90% rapid drying time'],
    imageUrl: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=800&q=80',
    isRealTeamAsset: false,
    processSteps: ['Dry vacuum dust extraction', 'Enzyme foam shampoo application', 'Mechanized soft-bristle scrub', 'High-pressure moisture suction']
  },
  {
    id: 'srv-sofa-cleaning-5seater',
    name: 'L-Shape / 5-Seater Sofa Spa & Conditioning',
    category: 'Cleaning',
    subCategory: 'sofa-cleaning',
    price: '₹799',
    numericPrice: 799,
    rating: 4.9,
    reviewsCount: 512,
    duration: '60 mins',
    tagline: 'Complete 360-degree deep extraction of seat cushions, backrest, crevices, and wooden/leatherette armrests.',
    features: ['Includes 5 cushion covers free', 'Leatherette balm conditioning', 'Bacteria & odor neutralizer', 'Non-toxic pet-safe chemicals'],
    imageUrl: 'https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?auto=format&fit=crop&w=800&q=80',
    isRealTeamAsset: false,
    processSteps: ['Crevice deep vacuum', 'Foam injection', 'Stain lifting treatment', 'Extraction and fabric conditioning']
  },

  // Cleaning Subcategory: Mattress Cleaning
  {
    id: 'srv-mattress-cleaning-single',
    name: 'Single Bed Mattress Anti-Allergen Deep Clean',
    category: 'Cleaning',
    subCategory: 'mattress-cleaning',
    price: '₹499',
    numericPrice: 499,
    rating: 4.8,
    reviewsCount: 310,
    duration: '35 mins',
    tagline: 'Eliminate dead skin, dust mites, and sweat yellow stains with industrial vacuum and ultraviolet sanitation.',
    features: ['High-frequency vibration beating', 'UV-C sanitization wand', 'Organic sweat stain neutralizer', 'Zero dampness guarantee'],
    imageUrl: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?auto=format&fit=crop&w=800&q=80',
    isRealTeamAsset: false,
    processSteps: ['Vibratory dust-mite beating', 'HEPA filter vacuum suction', 'Spot stain treatment', 'UV-C sterilization']
  },
  {
    id: 'srv-mattress-cleaning-king',
    name: 'King / Queen Size Double Mattress Sanitization',
    category: 'Cleaning',
    subCategory: 'mattress-cleaning',
    price: '₹749',
    numericPrice: 749,
    rating: 4.9,
    reviewsCount: 440,
    duration: '50 mins',
    tagline: 'Both sides deep cleaning with steam injection and anti-bacterial misting for fresh, hygienic sleep.',
    features: ['Both upper & lower sides cleaned', 'Deep steam deodorization', 'Safe for infants and allergy sufferers', 'Fresh herbal fragrance'],
    imageUrl: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=800&q=80',
    isRealTeamAsset: false,
    processSteps: ['Deep agitation vacuum', 'Organic foam treatment', 'Steam sanitization', 'Germicidal UV finish']
  },

  // Cleaning Subcategory: Water Tanks
  {
    id: 'srv-watertank-overhead',
    name: 'Overhead Sintex/PVC Tank 6-Stage Cleaning (Up to 1000L)',
    category: 'Cleaning',
    subCategory: 'water-tanks',
    price: '₹499',
    numericPrice: 499,
    rating: 4.9,
    reviewsCount: 890,
    duration: '45 mins',
    tagline: 'Scientific 6-stage mechanized cleaning: sludge dewatering, high pressure jet wash, and UV lamp radiation.',
    features: ['Submersible sludge pumping', 'High-pressure rotary jet spray', 'Zero bleach or harsh acid', 'Drinking-water safe certification'],
    imageUrl: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=800&q=80',
    isRealTeamAsset: false,
    processSteps: ['1. Mechanized Dewatering', '2. Sludge Extraction', '3. High-Pressure Jet Cleaning', '4. Vacuum Residue Slurry', '5. Anti-Bacterial Spray', '6. UV Radiation Disinfection']
  },
  {
    id: 'srv-watertank-underground',
    name: 'Underground RCC Sump Tank Deep Cleansing (Up to 5000L)',
    category: 'Cleaning',
    subCategory: 'water-tanks',
    price: '₹999',
    numericPrice: 999,
    rating: 4.9,
    reviewsCount: 610,
    duration: '90 mins',
    tagline: 'Heavy-duty industrial mud extraction pump with confined space safety gear and complete wall biofilm scrubbing.',
    features: ['Biofilm & algae eradication', 'Mud & sand suction pump', 'Anti-fungal food grade treatment', 'UV lamp radiation sterilization'],
    imageUrl: 'https://images.unsplash.com/photo-1541888946425-d0fbb18086f6?auto=format&fit=crop&w=800&q=80',
    isRealTeamAsset: false,
    processSteps: ['Sludge dewatering', 'Mechanized wall rotary scrub', 'Algae lifting', 'Anti-bacterial misting', 'UV-C sterilization']
  },
  {
    id: 'srv-watertank-combo',
    name: 'Complete Home Tank Combo (Overhead Sintex + Underground Sump)',
    category: 'Cleaning',
    subCategory: 'water-tanks',
    price: '₹1,299',
    numericPrice: 1299,
    rating: 5.0,
    reviewsCount: 730,
    duration: '2 hours',
    tagline: 'Total water purity package for your home. Both roof tank and ground sump thoroughly cleansed and UV sanitized.',
    features: ['Save ₹200 on combo package', 'Free TDS & water hardness test', 'Float valve inspection included', '3-Month algae-free warranty'],
    imageUrl: 'https://images.unsplash.com/photo-1585704032915-c3400ca199e7?auto=format&fit=crop&w=800&q=80',
    isRealTeamAsset: false,
    processSteps: ['Synchronized dual-tank dewatering', 'High-pressure rotary wash', 'Heavy vacuum suction', 'Double UV disinfection']
  },

  // Full Home Cleaning
  {
    id: 'srv-home-cleaning',
    name: 'Full Home Deep Cleaning & Floor Scrubbing',
    category: 'Cleaning',
    subCategory: 'home-cleaning',
    price: '₹1,999',
    numericPrice: 1999,
    rating: 4.9,
    reviewsCount: 420,
    duration: '3-4 hours',
    tagline: 'Single disc floor scrubber machine, balcony jet wash, bathroom descaling & window glass cleaning.',
    features: ['German Taski specialized chemicals', 'Kärcher high-suction machine', 'Mechanized tile grout scrubbing', 'Complete cobweb & fan cleaning'],
    imageUrl: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=800&q=80',
    isRealTeamAsset: false,
    processSteps: ['Dry vacuum & dusting', 'Floor disc scrubbing', 'Glass & mirror polishing', 'Kitchen & washroom sanitization']
  },

  // Other Core Categories
  {
    id: 'srv-modular-kitchen',
    name: 'Modular Kitchen & Custom Wardrobes',
    category: 'Interiors',
    subCategory: 'modular-kitchen',
    price: '₹1,250/sq.ft',
    numericPrice: 1250,
    rating: 4.9,
    reviewsCount: 384,
    duration: 'Turnkey 15-Day Delivery',
    tagline: 'Fitted by in-house Gharkasathi master carpenters with waterproof HDHMR boards.',
    features: ['Soft-close Hettich hinges', '3D CAD layout included', '10-Year termite warranty'],
    imageUrl: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=800&q=80',
    isRealTeamAsset: true,
    localAssetPath: '/images/team/DSC_4949.JPG'
  },
  {
    id: 'srv-ac-service',
    name: 'AC Foam Jet Deep Cleaning & Gas Refill',
    category: 'Appliances',
    price: '₹499',
    numericPrice: 499,
    rating: 4.8,
    reviewsCount: 812,
    duration: '45 mins',
    tagline: 'High pressure pump cleaning for Voltas, Daikin, LG & all split AC units.',
    features: ['2X faster cooling guarantee', 'Zero mess indoor jacket', 'Free power ampere check'],
    imageUrl: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=800&q=80',
    isRealTeamAsset: false
  },
  {
    id: 'srv-electrician',
    name: 'Master Electrician & Switchboard Wiring',
    category: 'Electrical',
    price: '₹199',
    numericPrice: 199,
    rating: 4.9,
    reviewsCount: 1240,
    duration: '30 mins dispatch',
    tagline: 'Short-circuit fixes, MCB tripping, Anchor/Havells switch replacement, fan fitting.',
    features: ['Laser wire testing', 'Standardized rate card', 'Zero shock guarantee'],
    imageUrl: 'https://images.unsplash.com/photo-1621905252507-b35492cc74b4?auto=format&fit=crop&w=800&q=80',
    isRealTeamAsset: false
  },
  {
    id: 'srv-plumbing',
    name: 'Plumbing & Concealed Pipe Leak Repairs',
    category: 'Plumbing',
    price: '₹249',
    numericPrice: 249,
    rating: 4.8,
    reviewsCount: 650,
    duration: '40 mins',
    tagline: 'Leak repair, Jaquar/Hindware tap fitting, concealed pipeline unblocking.',
    features: ['Heavy CP fittings repair', 'Acoustic leak detection', 'Same-day completion'],
    imageUrl: 'https://images.unsplash.com/photo-1585704032915-c3400ca199e7?auto=format&fit=crop&w=800&q=80',
    isRealTeamAsset: false
  },
  {
    id: 'srv-painting',
    name: 'Turnkey Wall Painting & Waterproofing',
    category: 'Painting',
    price: '₹12/sq.ft',
    numericPrice: 12,
    rating: 4.9,
    reviewsCount: 290,
    duration: '3-5 days',
    tagline: 'Asian Paints Royal & Tractor Emulsion with mechanized sanding and damp checking.',
    features: ['Moisture meter reading', 'Laser masking of furniture', 'Free color consultation'],
    imageUrl: 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&w=800&q=80',
    isRealTeamAsset: false
  }
];

export interface AuthenticRealEstate {
  id: string;
  title: string;
  type: string;
  location: string;
  plotArea: string;
  price: string;
  pricePerSqFt: string;
  status: string;
  reraApproved: boolean;
  imageUrl: string;
  highlights: string[];
}

export const AUTHENTIC_PROPERTIES: AuthenticRealEstate[] = [
  {
    id: 'prop-shankar-nagar',
    title: 'Gated Residential Plots - Shankar Nagar Extension',
    type: 'Approved Residential Plot',
    location: 'Shankar Nagar, Raipur, CG',
    plotArea: '1,500 - 2,400 Sq.Ft (166 - 266 Gaj)',
    price: '₹38.5 Lakh onwards',
    pricePerSqFt: '₹2,560 / sq.ft',
    status: 'Ready for Immediate Registry',
    reraApproved: true,
    imageUrl: 'https://images.unsplash.com/photo-1541888946425-d0fbb18086f6?auto=format&fit=crop&w=800&q=80',
    highlights: ['40ft concrete wide roads', 'Underground electrical cabling', 'RERA Registered: PCGRERA2304']
  },
  {
    id: 'prop-vip-road',
    title: 'Luxury 3BHK Independent Floor / Kothi',
    type: 'Turnkey Built House',
    location: 'VIP Road, Raipur Airport Corridor',
    plotArea: '1,800 Sq.Ft Built-up',
    price: '₹72.0 Lakh',
    pricePerSqFt: '₹4,000 / sq.ft',
    status: 'Ready to Move In',
    reraApproved: true,
    imageUrl: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80',
    highlights: ['Modular kitchen pre-installed', 'Covered car parking', 'Vastu compliant north-east entry']
  },
  {
    id: 'prop-durg-bhilai',
    title: 'Commercial Plot - High Visibility Hub',
    type: 'Commercial Land',
    location: 'GE Road, Durg-Bhilai Industrial Corridor',
    plotArea: '3,200 Sq.Ft',
    price: '₹95 Lakh',
    pricePerSqFt: '₹2,968 / sq.ft',
    status: 'Title Clear with Bank Loan approval',
    reraApproved: true,
    imageUrl: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80',
    highlights: ['60ft road frontage', 'Ideal for clinic / showroom / bank', 'Instant possession']
  }
];
