// Centralized Multi-Language Translation Dictionary for Care & Maintenance
// Supports English ('en') and Hindi ('hi') with extensible structure.

export type LanguageCode = 'en' | 'hi';

export const MAINTENANCE_TRANSLATIONS = {
  en: {
    // Brand & Top bar
    care_and_maintenance: 'Care & Maintenance',
    protect_subtitle: 'Protect your property with a maintenance plan built around your needs.',
    tagline: 'All Your Property Needs. Under One Roof.',
    hero_headline: 'Maintenance Made Simple.',
    hero_subheading: 'From your home to your business, create a recurring maintenance plan engineered around your exact property.',
    
    // CTAs
    build_your_plan: 'Build Your Plan',
    explore_plans: 'Explore Maintenance Plans',
    create_maintenance_plan: 'Create Maintenance Plan',
    explore_hmc: 'Explore HMC (Homes)',
    explore_amc: 'Explore AMC (Commercial)',
    request_proposal: 'Generate Official Quotation',
    proceed_to_contract: 'Proceed to Digital Contract',
    request_service: 'Request Service',
    view_plan: 'View Plan Details',
    renew_plan: 'Renew / Upgrade Plan',
    my_plans: 'My Maintenance Plans',
    download_contract: 'Download Contract (PDF)',
    download_invoice: 'Download Tax Invoice',
    contact_support: '24/7 Priority Helpline',
    
    // Core Types
    residential: 'Residential',
    commercial: 'Commercial',
    hmc_title: 'Home Maintenance Contract (HMC)',
    hmc_desc: 'Recurring maintenance for your home with trusted technicians and multi-category coverage under one predictable subscription.',
    amc_title: 'Annual Maintenance Contract (AMC)',
    amc_desc: 'End-to-end multi-vendor consolidation for restaurants, offices, gyms, schools, societies and commercial facilities.',
    qmc_title: 'Quarterly Maintenance Contract (QMC)',
    qmc_desc: 'Structured seasonal deep maintenance visits every quarter to maintain peak operational reliability.',
    custom_plan_title: 'Custom Maintenance Plan',
    custom_plan_desc: 'Pick your property size, exact service categories, visit frequency, and emergency response speed.',

    // Steps
    step_property_type: '1. Property Type',
    step_property_specs: '2. Property Specifications',
    step_service_categories: '3. Service Categories',
    step_frequencies: '4. Frequencies & SLA',
    step_proposal: '5. Proposal & Contract',

    // Frequencies
    freq_weekly: 'Weekly (52 visits/yr)',
    freq_fortnightly: 'Fortnightly (24 visits/yr)',
    freq_monthly: 'Monthly (12 visits/yr)',
    freq_bimonthly: 'Bi-Monthly (6 visits/yr)',
    freq_quarterly: 'Quarterly (4 visits/yr)',
    freq_halfyearly: 'Half-Yearly (2 visits/yr)',
    freq_annual: 'Annual (1 visit/yr)',
    freq_custom: 'Custom Frequency',

    // Response Times
    resp_standard: 'Standard (8-12 hours)',
    resp_express: 'Express (4 hours SLA)',
    resp_rapid: 'Rapid Emergency (2 hours SLA)',

    // Plan Card Details
    per_month: '/month',
    per_year: '/year',
    billed_annually: 'Billed Annually',
    save_15_percent: 'Save 15% on Annual Pay',
    included_features: 'What is Included:',
    emergency_support: 'Emergency Breakdown Support',
    priority_sla: 'Guaranteed SLA',
    annual_visits: 'Allocated Annual Visits',

    // Dashboard & Contract
    contract_number: 'Contract #',
    contract_status: 'Contract Status',
    status_active: 'Active',
    status_pending: 'Pending Activation',
    status_expired: 'Expired',
    status_renewal_due: 'Renewal Due',
    visits_remaining: 'Visits Remaining',
    visits_used: 'Visits Used',
    next_scheduled_service: 'Next Scheduled Visit',
    plan_utilization_healthy: 'Your maintenance plan is being utilized efficiently.',
    emergency_active: 'Emergency Support: Active 24/7',

    // Service Request
    raise_request: 'Raise Service Request',
    select_service: 'Select Service Needed',
    problem_description: 'Describe the Problem',
    preferred_slot: 'Preferred Date & Time',
    covered_under_plan: 'Covered Under Your Plan (₹0 Extra Labour)',
    out_of_plan_scope: 'Out of Routine Plan Scope (Estimate will be provided)',
    emergency_dispatch: 'Mark as Urgent Emergency (Rapid SLA)',
    submit_request: 'Confirm & Dispatch Engineer',

    // Admin & Metrics
    admin_mrr: 'Monthly Recurring Revenue (MRR)',
    admin_acv: 'Annual Contract Value (ACV)',
    admin_active_contracts: 'Total Active Contracts',
    admin_open_requests: 'Open Service Tickets',
    admin_emergency_requests: 'Emergency SLA Tickets',
    admin_renewals_due: 'Renewals Due in 30 Days'
  },
  hi: {
    // Brand & Top bar
    care_and_maintenance: 'केयर एवं मेंटेनेंस (रखरखाव)',
    protect_subtitle: 'अपनी संपत्ति की सुरक्षा करें - आपकी जरूरत अनुसार तैयार मेंटेनेंस प्लान के साथ।',
    tagline: 'ऑल योर प्रॉपर्टी नीड्स. अंडर वन रूफ।',
    hero_headline: 'प्रॉपर्टी मेंटेनेंस हुआ बेहद आसान।',
    hero_subheading: 'घर से लेकर व्यावसायिक प्रतिष्ठान तक - अपनी संपत्ति के अनुसार कस्टमाइज्ड रखरखाव योजना बनाएं।',
    
    // CTAs
    build_your_plan: 'अपना प्लान बनाएं',
    explore_plans: 'मेंटेनेंस प्लान्स देखें',
    create_maintenance_plan: 'नया प्लान शुरू करें',
    explore_hmc: 'घर के प्लान देखें (HMC)',
    explore_amc: 'कमर्शियल एएमसी देखें',
    request_proposal: 'आधिकारिक कोटेशन प्राप्त करें',
    proceed_to_contract: 'डिजिटल अनुबंध की ओर बढ़ें',
    request_service: 'सर्विस रिक्वेस्ट दर्ज करें',
    view_plan: 'प्लान का विवरण देखें',
    renew_plan: 'प्लान रिन्यू / अपग्रेड करें',
    my_plans: 'मेरे एक्टिव मेंटेनेंस प्लान्स',
    download_contract: 'अनुबंध पत्र डाउनलोड करें (PDF)',
    download_invoice: 'टैक्स इनवॉइस डाउनलोड करें',
    contact_support: '24/7 प्राथमिक हेल्पलाइन',
    
    // Core Types
    residential: 'आवासीय (घर / विला)',
    commercial: 'व्यावसायिक (दुकान / दफ्तर)',
    hmc_title: 'होम मेंटेनेंस कॉन्ट्रैक्ट (HMC)',
    hmc_desc: 'घर की नियमित देखभाल - विश्वसनीय तकनीशियन, मुफ्त लेबर और कई सेवाएं एक ही मासिक प्लान में।',
    amc_title: 'एनुअल मेंटेनेंस कॉन्ट्रैक्ट (AMC)',
    amc_desc: 'होटल, रेस्तरां, ऑफिस, जिम और सोसायटियों के लिए एक ही प्लेटफॉर्म पर मल्टी-सर्विस सुविधा प्रबंधन।',
    qmc_title: 'क्वार्टरली मेंटेनेंस कॉन्ट्रैक्ट (QMC)',
    qmc_desc: 'हर 3 महीने में मौसमी प्रिवेंटिव और डीप मेंटेनेंस निरीक्षण ताकि मशीनें कभी बंद न हों।',
    custom_plan_title: 'कस्टम मेंटेनेंस प्लान',
    custom_plan_desc: 'अपनी संपत्ति का आकार, जरूरी सेवाएं, विज़िट की आवृत्ति और इमरजेंसी रिस्पॉन्स खुद चुनें।',

    // Steps
    step_property_type: '1. संपत्ति का प्रकार',
    step_property_specs: '2. संपत्ति का विवरण',
    step_service_categories: '3. सर्विस कैटेगरी का चयन',
    step_frequencies: '4. विज़िट की आवृत्ति एवं एसएलए',
    step_proposal: '5. कोटेशन एवं अनुबंध',

    // Frequencies
    freq_weekly: 'साप्ताहिक (52 विज़िट/वर्ष)',
    freq_fortnightly: 'पाक्षिक (24 विज़िट/वर्ष)',
    freq_monthly: 'मासिक (12 विज़िट/वर्ष)',
    freq_bimonthly: 'द्विमासिक (6 विज़िट/वर्ष)',
    freq_quarterly: 'त्रैमासिक (4 विज़िट/वर्ष)',
    freq_halfyearly: 'अर्धवार्षिक (2 विज़िट/वर्ष)',
    freq_annual: 'वार्षिक (1 विज़िट/वर्ष)',
    freq_custom: 'कस्टम आवृत्ति',

    // Response Times
    resp_standard: 'मानक (8-12 घंटे)',
    resp_express: 'एक्सप्रेस (4 घंटे एसएलए)',
    resp_rapid: 'रैपिड इमरजेंसी (2 घंटे एसएलए)',

    // Plan Card Details
    per_month: '/माह',
    per_year: '/वर्ष',
    billed_annually: 'वार्षिक बिलिंग',
    save_15_percent: 'वार्षिक भुगतान पर 15% छूट',
    included_features: 'शामिल विशेषताएं:',
    emergency_support: 'आपातकालीन ब्रेकडाउन सपोर्ट',
    priority_sla: 'गारंटीड रिस्पॉन्स एसएलए',
    annual_visits: 'आवंटित वार्षिक विज़िट्स',

    // Dashboard & Contract
    contract_number: 'अनुबंध क्रमांक #',
    contract_status: 'अनुबंध स्थिति',
    status_active: 'सक्रिय (Active)',
    status_pending: 'सक्रियता लंबित',
    status_expired: 'समाप्त',
    status_renewal_due: 'नवीनीकरण देय',
    visits_remaining: 'शेष विज़िट्स',
    visits_used: 'उपयोग की गई विज़िट्स',
    next_scheduled_service: 'अगली निर्धारित विज़िट',
    plan_utilization_healthy: 'आपका प्लान कुशलतापूर्वक उपयोग किया जा रहा है।',
    emergency_active: 'इमरजेंसी सपोर्ट: सक्रिय 24/7',

    // Service Request
    raise_request: 'सर्विस रिक्वेस्ट दर्ज करें',
    select_service: 'जरूरी सर्विस चुनें',
    problem_description: 'समस्या का संक्षिप्त विवरण',
    preferred_slot: 'पसंदीदा तारीख व समय',
    covered_under_plan: 'प्लान के तहत कवर्ड (₹0 अतिरिक्त लेबर शुल्क)',
    out_of_plan_scope: 'प्लान के बाहर (कार्य से पहले अनुमानित खर्च दिखाया जाएगा)',
    emergency_dispatch: 'अति आवश्यक इमरजेंसी (त्वरित एसएलए)',
    submit_request: 'पुष्टि करें और इंजीनियर बुलाएं',

    // Admin & Metrics
    admin_mrr: 'मासिक आवर्ती राजस्व (MRR)',
    admin_acv: 'वार्षिक अनुबंध मूल्य (ACV)',
    admin_active_contracts: 'कुल सक्रिय अनुबंध',
    admin_open_requests: 'ओपन सर्विस टिकट्स',
    admin_emergency_requests: 'इमरजेंसी एसएलए टिकट्स',
    admin_renewals_due: '30 दिनों में नवीनीकरण देय'
  }
};

export function getMaintenanceText(key: keyof typeof MAINTENANCE_TRANSLATIONS['en'], lang: LanguageCode = 'en'): string {
  const dict = MAINTENANCE_TRANSLATIONS[lang] || MAINTENANCE_TRANSLATIONS.en;
  return dict[key] || MAINTENANCE_TRANSLATIONS.en[key] || key;
}
