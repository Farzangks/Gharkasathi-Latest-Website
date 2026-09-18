import { 
  MaintenanceServiceItem, 
  MaintenancePlan, 
  PricingRuleConfig,
  MaintenanceCategoryKey
} from '../types/maintenance';

export const MAINTENANCE_CATEGORIES: {
  key: MaintenanceCategoryKey;
  label: string;
  labelHi: string;
  iconName: string;
  description: string;
  descriptionHi: string;
}[] = [
  {
    key: 'plumbing',
    label: 'Plumbing',
    labelHi: 'प्लंबिंग (नल व पाइप)',
    iconName: 'Wrench',
    description: 'Taps, pipelines, leakages, drainage, washroom fittings & pressure maintenance.',
    descriptionHi: 'नल, पाइपलाइन, रिसाव, ड्रेनेज, बाथरूम फिटिंग और प्रेशर रखरखाव।'
  },
  {
    key: 'electrical',
    label: 'Electrical',
    labelHi: 'इलेक्ट्रिकल (बिजली)',
    iconName: 'Zap',
    description: 'Switches, wiring, MCB/DB panels, lighting, earthing & preventive thermal inspection.',
    descriptionHi: 'स्विच, वायरिंग, एमसीबी/डीबी पैनल, लाइटिंग, अर्थिंग और थर्मल निरीक्षण।'
  },
  {
    key: 'carpentry',
    label: 'Carpentry',
    labelHi: 'कारपेंटरी (बढ़ईगीरी)',
    iconName: 'Hammer',
    description: 'Doors, windows, locks, hinges, furniture adjustments & minor woodwork.',
    descriptionHi: 'दरवाजे, खिड़कियां, ताले, हिंज, फर्नीचर समायोजन और लकड़ी का काम।'
  },
  {
    key: 'appliances',
    label: 'Appliances',
    labelHi: 'घरेलू उपकरण',
    iconName: 'Tv',
    description: 'ACs, washing machines, RO purifiers, geysers, refrigerators, microwaves & chimneys.',
    descriptionHi: 'एसी, वॉशिंग मशीन, आरओ, गीज़र, फ्रिज, माइक्रोवेव और चिमनी रखरखाव।'
  },
  {
    key: 'hvac',
    label: 'HVAC & Commercial Cooling',
    labelHi: 'एचवीएसी और कूलिंग',
    iconName: 'Wind',
    description: 'Commercial AC cassettes, chillers, deep freezers, ventilation & duct cleaning.',
    descriptionHi: 'कमर्शियल कैसेट एसी, चिलर्स, डीप फ्रीजर, वेंटिलेशन और डक्ट सफाई।'
  },
  {
    key: 'cleaning',
    label: 'Deep Cleaning',
    labelHi: 'डीप क्लीनिंग (गहन सफाई)',
    iconName: 'Sparkles',
    description: 'Water tank cleaning, sofa & carpet shampooing, commercial kitchen & washroom sanitation.',
    descriptionHi: 'पानी की टंकी की सफाई, सोफा-कालीन शैम्पू, किचन और वॉशरूम सैनिटाइजेशन।'
  },
  {
    key: 'pest_control',
    label: 'Pest Control',
    labelHi: 'पेस्ट कंट्रोल (कीट नियंत्रण)',
    iconName: 'ShieldAlert',
    description: 'Cockroach, ant, rodent, termite & general insect protection treatments.',
    descriptionHi: 'कॉकरोच, चींटी, चूहे, दीमक और सामान्य कीट नियंत्रण उपचार।'
  },
  {
    key: 'painting_civil',
    label: 'Civil & Painting',
    labelHi: 'सिविल एवं पेंटिंग',
    iconName: 'Paintbrush',
    description: 'Wall cracks, tile repairs, touch-up painting, masonry & waterproofing touch-ups.',
    descriptionHi: 'दीवार की दरारें, टाइल रिपेयर, टच-अप पेंटिंग, चुनाई और वाटरप्रूफिंग।'
  },
  {
    key: 'gardening',
    label: 'Gardening & Landscaping',
    labelHi: 'बागवानी और हरियाली',
    iconName: 'Flower2',
    description: 'Lawn trimming, plant maintenance, fertilizing, weeding & landscape care.',
    descriptionHi: 'लॉन की कटाई, पौधों की देखभाल, खाद, निराई और बगीचे का रखरखाव।'
  }
];

export const MAINTENANCE_SERVICES_CATALOG: MaintenanceServiceItem[] = [
  // Plumbing
  {
    id: 'plumb_tap_repair',
    category: 'plumbing',
    name: 'Tap & Mixer Repair / Replacement',
    nameHi: 'नल और मिक्सर रिपेयर / बदलना',
    description: 'Repair leaking or stuck taps, spindle replacement & pressure balancing.',
    defaultFrequency: 'monthly',
    estimatedVisitsPerYear: 12,
    emergencyEligible: true,
    standardSlaHours: 4,
    target: 'all'
  },
  {
    id: 'plumb_leakage',
    category: 'plumbing',
    name: 'Pipe Leakage & Joint Sealing',
    nameHi: 'पाइप लीकेज और जोड़ सीलिंग',
    description: 'Concealed or exposed pipeline leak detection, sealing & clamp repair.',
    defaultFrequency: 'monthly',
    estimatedVisitsPerYear: 12,
    emergencyEligible: true,
    standardSlaHours: 3,
    target: 'all'
  },
  {
    id: 'plumb_drainage',
    category: 'plumbing',
    name: 'Drainage & Clog Clearance',
    nameHi: 'ड्रेनेज और नाली ब्लॉकेज हटाना',
    description: 'Sink, bathroom and kitchen waste line clog clearance using specialized spring wire.',
    defaultFrequency: 'monthly',
    estimatedVisitsPerYear: 12,
    emergencyEligible: true,
    standardSlaHours: 3,
    target: 'all'
  },
  {
    id: 'plumb_washroom_fittings',
    category: 'plumbing',
    name: 'Washroom & Flush Tank Maintenance',
    nameHi: 'वॉशरूम और फ्लश टैंक मेंटेनेंस',
    description: 'Syphon replacement, ball valve, health faucet and angle valve servicing.',
    defaultFrequency: 'quarterly',
    estimatedVisitsPerYear: 4,
    emergencyEligible: false,
    standardSlaHours: 6,
    target: 'all'
  },
  {
    id: 'plumb_water_line_preventive',
    category: 'plumbing',
    name: 'Commercial Water Line Preventive Check',
    nameHi: 'कमर्शियल वाटर लाइन प्रिवेंटिव चेक',
    description: 'Comprehensive pressure check, overhead tank pump line inspect & valve testing.',
    defaultFrequency: 'monthly',
    estimatedVisitsPerYear: 12,
    emergencyEligible: false,
    standardSlaHours: 12,
    target: 'commercial'
  },

  // Electrical
  {
    id: 'elec_switch_socket',
    category: 'electrical',
    name: 'Switch & Socket Repair',
    nameHi: 'स्विच और सॉकेट रिपेयर',
    description: 'Sparking switches, burned sockets replacement, modular board troubleshooting.',
    defaultFrequency: 'quarterly',
    estimatedVisitsPerYear: 4,
    emergencyEligible: true,
    standardSlaHours: 3,
    target: 'all'
  },
  {
    id: 'elec_mcb_db',
    category: 'electrical',
    name: 'MCB & Distribution Board Inspection',
    nameHi: 'एमसीबी और डीबी पैनल जांच',
    description: 'Load balancing, phase check, tripping inspection and terminal tightening.',
    defaultFrequency: 'quarterly',
    estimatedVisitsPerYear: 4,
    emergencyEligible: true,
    standardSlaHours: 3,
    target: 'all'
  },
  {
    id: 'elec_lighting',
    category: 'electrical',
    name: 'Light Fixture & LED Driver Servicing',
    nameHi: 'लाइट फिक्सचर और एलईडी ड्राइवर सर्विस',
    description: 'Spotlight, panel light, tube light replacement & driver unit testing.',
    defaultFrequency: 'monthly',
    estimatedVisitsPerYear: 12,
    emergencyEligible: false,
    standardSlaHours: 8,
    target: 'all'
  },
  {
    id: 'elec_earthing_thermal',
    category: 'electrical',
    name: 'Earthing & Commercial Electrical Audit',
    nameHi: 'अर्थिंग और कमर्शियल इलेक्ट्रिकल ऑडिट',
    description: 'Earth pit resistance check, thermal camera inspection for overheated lines.',
    defaultFrequency: 'half-yearly',
    estimatedVisitsPerYear: 2,
    emergencyEligible: false,
    standardSlaHours: 24,
    target: 'commercial'
  },

  // Carpentry
  {
    id: 'carp_door_window',
    category: 'carpentry',
    name: 'Door & Window Alignment / Hinges',
    nameHi: 'दरवाजा और खिड़की अलाइनमेंट / कब्जे',
    description: 'Fix dragging doors, loose window frames, lubricate and align heavy hinges.',
    defaultFrequency: 'quarterly',
    estimatedVisitsPerYear: 4,
    emergencyEligible: false,
    standardSlaHours: 8,
    target: 'all'
  },
  {
    id: 'carp_locks',
    category: 'carpentry',
    name: 'Lock Repair & Mortise Replacement',
    nameHi: 'ताला रिपेयर और मोर्टिस बदलना',
    description: 'Deadbolt alignment, cylinder change, handle tightening & latch adjustment.',
    defaultFrequency: 'quarterly',
    estimatedVisitsPerYear: 4,
    emergencyEligible: true,
    standardSlaHours: 4,
    target: 'all'
  },
  {
    id: 'carp_furniture',
    category: 'carpentry',
    name: 'Modular Furniture & Cabinet Adjustment',
    nameHi: 'मॉड्यूलर फर्नीचर और कैबिनेट समायोजन',
    description: 'Kitchen drawer channels, wardrobe hinges, workstation adjustments.',
    defaultFrequency: 'quarterly',
    estimatedVisitsPerYear: 4,
    emergencyEligible: false,
    standardSlaHours: 12,
    target: 'all'
  },

  // Appliances
  {
    id: 'app_ac_service',
    category: 'appliances',
    name: 'AC Filter Cleaning & Jet Wash Servicing',
    nameHi: 'एसी फिल्टर सफाई और जेट वॉश सर्विस',
    description: 'Indoor coil cleaning, blower wash, outdoor fin flush, gas pressure check & drain tray.',
    defaultFrequency: 'quarterly',
    estimatedVisitsPerYear: 4,
    emergencyEligible: true,
    standardSlaHours: 6,
    target: 'all'
  },
  {
    id: 'app_ro_purifier',
    category: 'appliances',
    name: 'RO Water Purifier Preventive Service',
    nameHi: 'आरओ वाटर प्यूरीफायर प्रिवेंटिव सर्विस',
    description: 'TDS testing, sediment filter replacement, membrane flush & pump pressure check.',
    defaultFrequency: 'quarterly',
    estimatedVisitsPerYear: 4,
    emergencyEligible: false,
    standardSlaHours: 8,
    target: 'all'
  },
  {
    id: 'app_washing_machine',
    category: 'appliances',
    name: 'Washing Machine Drum & Drain Check',
    nameHi: 'वॉशिंग मशीन ड्रम और ड्रेन चेक',
    description: 'Descaling, inlet valve filter clean, vibration dampening & belt check.',
    defaultFrequency: 'quarterly',
    estimatedVisitsPerYear: 4,
    emergencyEligible: false,
    standardSlaHours: 12,
    target: 'residential'
  },
  {
    id: 'app_geyser_microwave',
    category: 'appliances',
    name: 'Geyser & Microwave Electrical Check',
    nameHi: 'गीज़र और माइक्रोवेव इलेक्ट्रिकल चेक',
    description: 'Thermostat safety check, anode inspection, magnetron & fuse check.',
    defaultFrequency: 'half-yearly',
    estimatedVisitsPerYear: 2,
    emergencyEligible: false,
    standardSlaHours: 12,
    target: 'all'
  },

  // HVAC (Commercial)
  {
    id: 'hvac_commercial_ac',
    category: 'hvac',
    name: 'Commercial Cassette / Ductable AC Servicing',
    nameHi: 'कमर्शियल कैसेट / डक्टेबल एसी सर्विसिंग',
    description: 'Airflow cfm calibration, chilled water line check, electrical contactors & gas top-up.',
    defaultFrequency: 'monthly',
    estimatedVisitsPerYear: 12,
    emergencyEligible: true,
    standardSlaHours: 4,
    target: 'commercial'
  },
  {
    id: 'hvac_refrigeration',
    category: 'hvac',
    name: 'Commercial Refrigerator & Deep Freezer Maintenance',
    nameHi: 'कमर्शियल फ्रिज एवं डीप फ्रीजर मेंटेनेंस',
    description: 'Condenser fan motor lubrication, thermostat calibration, door gasket seal check.',
    defaultFrequency: 'monthly',
    estimatedVisitsPerYear: 12,
    emergencyEligible: true,
    standardSlaHours: 3,
    target: 'commercial'
  },

  // Cleaning
  {
    id: 'clean_water_tank',
    category: 'cleaning',
    name: 'Overhead & Underground Water Tank Cleaning',
    nameHi: 'पानी की टंकी की मशीनीकृत सफाई',
    description: 'Sludge draining, high-pressure rotary jetting, anti-bacterial UV & chemical disinfection.',
    defaultFrequency: 'half-yearly',
    estimatedVisitsPerYear: 2,
    emergencyEligible: false,
    standardSlaHours: 24,
    target: 'all'
  },
  {
    id: 'clean_sofa_carpet',
    category: 'cleaning',
    name: 'Sofa & Carpet Foam Shampooing',
    nameHi: 'सोफा और कालीन फोम शैम्पू सफाई',
    description: 'Deep extraction vacuuming, spot stain treatment and fabric sanitization.',
    defaultFrequency: 'half-yearly',
    estimatedVisitsPerYear: 2,
    emergencyEligible: false,
    standardSlaHours: 24,
    target: 'all'
  },
  {
    id: 'clean_commercial_kitchen',
    category: 'cleaning',
    name: 'Commercial Kitchen & Exhaust Degreasing',
    nameHi: 'कमर्शियल किचन और एग्जॉस्ट डीग्रीजिंग',
    description: 'Heavy grease baffle filter wash, chimney hood scrubbing, food-grade counter disinfection.',
    defaultFrequency: 'monthly',
    estimatedVisitsPerYear: 12,
    emergencyEligible: false,
    standardSlaHours: 12,
    target: 'commercial'
  },
  {
    id: 'clean_deep_home',
    category: 'cleaning',
    name: 'Full Home Seasonal Deep Clean',
    nameHi: 'पूरे घर की मौसमी डीप क्लीनिंग',
    description: 'Kitchen degreasing, bathroom descaling, balcony scrubbing & floor buffing.',
    defaultFrequency: 'half-yearly',
    estimatedVisitsPerYear: 2,
    emergencyEligible: false,
    standardSlaHours: 24,
    target: 'residential'
  },

  // Pest Control
  {
    id: 'pest_cockroach_ant',
    category: 'pest_control',
    name: 'Cockroach & Ant Gel Treatment',
    nameHi: 'कॉकरोच और चींटी जेल ट्रीटमेंट',
    description: 'Odorless herbal gel baiting in kitchen cabinets, drain edges & electrical conduits.',
    defaultFrequency: 'quarterly',
    estimatedVisitsPerYear: 4,
    emergencyEligible: false,
    standardSlaHours: 12,
    target: 'all'
  },
  {
    id: 'pest_rodent',
    category: 'pest_control',
    name: 'Commercial Rodent & Trap Management',
    nameHi: 'कमर्शियल चूहा व रैट ट्रैप मैनेजमेंट',
    description: 'Bait station inspection, glue board rotation & entry point survey.',
    defaultFrequency: 'monthly',
    estimatedVisitsPerYear: 12,
    emergencyEligible: false,
    standardSlaHours: 12,
    target: 'commercial'
  },
  {
    id: 'pest_general',
    category: 'pest_control',
    name: 'General Insect & Drain Fly Treatment',
    nameHi: 'सामान्य कीट और नाली मक्खी नियंत्रण',
    description: 'Spray treatment for silverfish, spiders, drain flies and wall corners.',
    defaultFrequency: 'quarterly',
    estimatedVisitsPerYear: 4,
    emergencyEligible: false,
    standardSlaHours: 12,
    target: 'all'
  },

  // Painting & Civil
  {
    id: 'civil_tile_wall',
    category: 'painting_civil',
    name: 'Tile Grouting & Minor Masonry Repair',
    nameHi: 'टाइल ग्राउटिंग और मामूली मरम्मत',
    description: 'Epoxy regrouting, loose floor tile re-fixing, skirting and threshold repair.',
    defaultFrequency: 'quarterly',
    estimatedVisitsPerYear: 4,
    emergencyEligible: false,
    standardSlaHours: 24,
    target: 'all'
  },
  {
    id: 'civil_touchup_paint',
    category: 'painting_civil',
    name: 'Seasonal Wall Crack & Touch-up Painting',
    nameHi: 'दीवार दरारें व टच-अप पेंटिंग',
    description: 'Patch putty application, primer touch-up, water seepage spot rectification.',
    defaultFrequency: 'half-yearly',
    estimatedVisitsPerYear: 2,
    emergencyEligible: false,
    standardSlaHours: 48,
    target: 'all'
  },

  // Gardening
  {
    id: 'garden_routine',
    category: 'gardening',
    name: 'Lawn Mowing & Plant Health Check',
    nameHi: 'लॉन कटाई और पौधों की जांच',
    description: 'Hedge trimming, soil aeration, organic vermicompost addition & pest inspection.',
    defaultFrequency: 'fortnightly',
    estimatedVisitsPerYear: 24,
    emergencyEligible: false,
    standardSlaHours: 24,
    target: 'all'
  }
];

// Configurable pre-packaged plans
export const DEFAULT_MAINTENANCE_PLANS: MaintenancePlan[] = [
  // 1. Basic Care (HMC)
  {
    id: 'plan_hmc_basic',
    title: 'Basic Care',
    titleHi: 'बेसिक केयर (मूल सुरक्षा)',
    planType: 'HMC',
    target: 'residential',
    tier: 'basic',
    priceMonthly: 1999,
    priceAnnual: 19990,
    visitLimitAnnual: 18,
    emergencySupport: false,
    priorityResponseHours: 8,
    description: 'Essential preventive checkups for plumbing and electrical to avoid unexpected home breakdowns.',
    descriptionHi: 'प्लंबिंग और बिजली के जरूरी चेकअप ताकि घर में कोई अचानक खराबी न आए।',
    features: [
      'Quarterly electrical health inspection',
      'Quarterly plumbing & leak inspection',
      'Free minor labour on 12 callout visits',
      'Water purifier (RO) filter check',
      'Standard 8-hour response guarantee'
    ],
    featuresHi: [
      'त्रैमासिक इलेक्ट्रिकल स्वास्थ्य निरीक्षण',
      'त्रैमासिक प्लंबिंग व लीकेज जांच',
      '12 कॉलबैक विज़िट्स पर फ्री लेबर',
      'आरओ वाटर प्यूरीफायर फिल्टर जांच',
      '8 घंटे में रिस्पॉन्स गारंटी'
    ],
    categoriesIncluded: ['plumbing', 'electrical'],
    popular: false,
    active: true
  },

  // 2. Smart Care (HMC) - MOST POPULAR
  {
    id: 'plan_hmc_smart',
    title: 'Smart Care',
    titleHi: 'स्मार्ट केयर (सर्वाधिक लोकप्रिय)',
    planType: 'HMC',
    target: 'residential',
    tier: 'smart',
    priceMonthly: 3999,
    priceAnnual: 39990,
    visitLimitAnnual: 36,
    emergencySupport: true,
    priorityResponseHours: 4,
    description: 'Comprehensive all-in-one residential maintenance with appliances, pest control and emergency response.',
    descriptionHi: 'घर की संपूर्ण देखभाल - प्लंबिंग, बिजली, एसी सर्विस, पेस्ट कंट्रोल और 4 घंटे की आपातकालीन सेवा।',
    features: [
      '2 Comprehensive Jet-Wash AC services/year',
      'Quarterly odorless herbal pest control',
      'Bi-annual water tank machine cleaning',
      'Unlimited minor plumbing & electrical repairs',
      'Door locks, hinges & window adjustments',
      '4-Hour Emergency Breakdown SLA',
      'Dedicated Gharkasathi certified engineer'
    ],
    featuresHi: [
      'साल में 2 जेट-वॉश एसी सर्विस',
      'त्रैमासिक गंधहीन हर्बल पेस्ट कंट्रोल',
      'साल में 2 बार वाटर टैंक मशीनीकृत सफाई',
      'प्लंबिंग और बिजली की असीमित छोटी मरम्मत',
      'दरवाजे, खिड़कियां और ताले की मरम्मत',
      '4 घंटे में इमरजेंसी रिस्पॉन्स',
      'समर्पित घड़कासाथी प्रमाणित इंजीनियर'
    ],
    categoriesIncluded: ['plumbing', 'electrical', 'appliances', 'pest_control', 'carpentry'],
    popular: true,
    badge: 'Most Popular',
    active: true
  },

  // 3. Premium Care (HMC Villa & Luxury)
  {
    id: 'plan_hmc_premium',
    title: 'Premium Villa Care',
    titleHi: 'प्रीमियम विला केयर (शाही सुरक्षा)',
    planType: 'HMC',
    target: 'residential',
    tier: 'premium',
    priceMonthly: 6999,
    priceAnnual: 69990,
    visitLimitAnnual: 60,
    emergencySupport: true,
    priorityResponseHours: 2,
    description: 'White-glove maintenance for villas, duplexes & large homes including gardening and deep sanitation.',
    descriptionHi: 'विला, डुप्लेक्स और बड़े घरों के लिए विशेष केयर जिसमें बागवानी और डीप सैनिटेशन शामिल है।',
    features: [
      'Up to 5 AC jet-wash services + gas check',
      'Quarterly whole-house pest control',
      'Water tank cleaning & pipe descaling',
      'Fortnightly lawn & garden maintenance',
      'Annual sofa & carpet shampooing',
      'Rapid 2-Hour VIP Emergency Dispatch',
      'Free minor hardware consumables under ₹500'
    ],
    featuresHi: [
      '5 एसी तक जेट-वॉश सर्विस + गैस चेक',
      'त्रैमासिक पूरे घर का पेस्ट कंट्रोल',
      'पानी की टंकी की सफाई और पाइप डीस्केलिंग',
      'हर 15 दिन में बगीचे व लॉन की देखभाल',
      'वार्षिक सोफा व कालीन शैम्पू सफाई',
      '2 घंटे का वीआईपी इमरजेंसी डिस्पैच',
      '₹500 तक का छोटा हार्डवेयर मटेरियल फ्री'
    ],
    categoriesIncluded: ['plumbing', 'electrical', 'appliances', 'pest_control', 'carpentry', 'cleaning', 'gardening', 'painting_civil'],
    popular: false,
    badge: 'VIP White-Glove',
    active: true
  },

  // 4. Commercial QMC (Quarterly Maintenance Contract)
  {
    id: 'plan_qmc_commercial',
    title: 'Quarterly Business Care (QMC)',
    titleHi: 'कमर्शियल क्यूएमसी (त्रैमासिक अनुबंध)',
    planType: 'QMC',
    target: 'commercial',
    tier: 'smart',
    priceMonthly: 4499,
    priceAnnual: 51990,
    visitLimitAnnual: 48,
    emergencySupport: true,
    priorityResponseHours: 4,
    description: 'Structured seasonal inspections every quarter: Q1 Preventive, Q2 Deep Clean, Q3 Repair, Q4 Comprehensive.',
    descriptionHi: 'व्यावसायिक प्रतिष्ठानों के लिए हर 3 महीने में संरचित निरीक्षण एवं रखरखाव।',
    features: [
      'Q1: Full Electrical & HVAC safety audit',
      'Q2: Deep kitchen/washroom sanitization',
      'Q3: Plumbing lines & drainage overhaul',
      'Q4: Complete annual compliance inspection',
      '4-Hour emergency breakdown coverage'
    ],
    featuresHi: [
      'Q1: संपूर्ण इलेक्ट्रिकल व एसी सुरक्षा ऑडिट',
      'Q2: डीप किचन व वॉशरूम सैनिटाइजेशन',
      'Q3: प्लंबिंग व ड्रेनेज ओवरहाल',
      'Q4: वार्षिक अनुपालन एवं उपकरण निरीक्षण',
      '4 घंटे में आपातकालीन ब्रेकडाउन सपोर्ट'
    ],
    categoriesIncluded: ['plumbing', 'electrical', 'hvac', 'cleaning', 'pest_control'],
    popular: false,
    active: true
  },

  // 5. Commercial AMC (Annual Maintenance Contract)
  {
    id: 'plan_amc_commercial',
    title: 'Enterprise AMC',
    titleHi: 'एंटरप्राइज एएमसी (वार्षिक अनुबंध)',
    planType: 'AMC',
    target: 'commercial',
    tier: 'premium',
    priceMonthly: 7999,
    priceAnnual: 89990,
    visitLimitAnnual: 96,
    emergencySupport: true,
    priorityResponseHours: 2,
    description: 'Full facility management for restaurants, hotels, clinics, gyms, offices & retail complexes.',
    descriptionHi: 'रेस्तरां, होटल, अस्पताल, जिम, ऑफिस और मॉल के लिए पूर्ण सुविधा प्रबंधन।',
    features: [
      'Monthly kitchen degreasing & grease trap clear',
      'Monthly HVAC & deep freezer temperature audit',
      'Monthly rodent & cockroach pest management',
      'Bi-weekly electrical & lighting checks',
      '2-Hour Business Emergency SLA',
      'Asset tagging & digital machinery QR log'
    ],
    featuresHi: [
      'मासिक किचन डीग्रीजिंग और ग्रीस ट्रैप सफाई',
      'मासिक एचवीएसी व डीप फ्रीजर तापमान ऑडिट',
      'मासिक चूहा व कॉकरोच नियंत्रण',
      'पाक्षिक इलेक्ट्रिकल व लाइटिंग जांच',
      '2 घंटे का बिजनेस इमरजेंसी एसएलए',
      'मशीनरी क्यूआर कोड डिजिटल ट्रैकिंग'
    ],
    categoriesIncluded: ['plumbing', 'electrical', 'appliances', 'hvac', 'cleaning', 'pest_control', 'carpentry', 'painting_civil'],
    popular: true,
    badge: 'Commercial Choice',
    active: true
  }
];

export const DEFAULT_PRICING_RULES: PricingRuleConfig = {
  baseResidentialMonthly: 1499,
  baseCommercialPerSqftAnnual: 18,
  categoryMonthlyRates: {
    plumbing: 400,
    electrical: 450,
    carpentry: 350,
    appliances: 750,
    hvac: 1200,
    cleaning: 850,
    pest_control: 600,
    painting_civil: 500,
    gardening: 650
  },
  frequencyMultiplierAnnual: {
    weekly: 52,
    fortnightly: 24,
    monthly: 12,
    'bi-monthly': 6,
    quarterly: 4,
    'half-yearly': 2,
    annual: 1,
    custom: 12
  },
  emergencySupportAnnualSurcharge: 4999,
  priorityResponseMultipliers: {
    standard: 1.0,
    express_4hr: 1.15,
    rapid_2hr: 1.30
  },
  gstRatePercent: 18,
  annualAdvanceDiscountPercent: 15,
  emergencySlaHours: 3
};
