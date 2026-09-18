// Care & Maintenance Module Types for Gharkasathi Innoventure Private Limited
// "All Your Property Needs. Under One Roof."

export type MaintenanceTarget = 'residential' | 'commercial';
export type MaintenancePlanType = 'HMC' | 'AMC' | 'QMC' | 'CUSTOM';
export type MaintenancePlanTier = 'basic' | 'smart' | 'premium' | 'custom';

export type ResidentialPropertyType = 
  | 'Apartment'
  | 'Flat'
  | 'Independent House'
  | 'Villa'
  | 'Duplex'
  | 'Bungalow'
  | 'Other';

export type CommercialBusinessType = 
  | 'Café'
  | 'Restaurant'
  | 'Cloud Kitchen'
  | 'Hotel'
  | 'Office'
  | 'Gym'
  | 'Hospital'
  | 'School'
  | 'College'
  | 'Retail Store'
  | 'Shopping Complex'
  | 'Housing Society'
  | 'Warehouse'
  | 'Factory'
  | 'Commercial Building'
  | 'Other';

export type MaintenanceFrequency = 
  | 'weekly'
  | 'fortnightly'
  | 'monthly'
  | 'bi-monthly'
  | 'quarterly'
  | 'half-yearly'
  | 'annual'
  | 'custom';

export type MaintenanceCategoryKey = 
  | 'plumbing'
  | 'electrical'
  | 'carpentry'
  | 'appliances'
  | 'hvac'
  | 'cleaning'
  | 'pest_control'
  | 'painting_civil'
  | 'gardening';

export interface MaintenanceServiceItem {
  id: string;
  category: MaintenanceCategoryKey;
  name: string;
  nameHi: string;
  description: string;
  defaultFrequency: MaintenanceFrequency;
  estimatedVisitsPerYear: number;
  emergencyEligible: boolean;
  standardSlaHours: number;
  target: 'all' | 'residential' | 'commercial';
}

export interface MaintenancePlan {
  id: string;
  title: string;
  titleHi: string;
  planType: MaintenancePlanType;
  target: MaintenanceTarget;
  tier: MaintenancePlanTier;
  priceMonthly: number;
  priceAnnual: number;
  visitLimitAnnual: number;
  emergencySupport: boolean;
  priorityResponseHours: number;
  description: string;
  descriptionHi: string;
  features: string[];
  featuresHi: string[];
  categoriesIncluded: MaintenanceCategoryKey[];
  popular?: boolean;
  badge?: string;
  active: boolean;
}

export interface CustomPlanBuilderState {
  target: MaintenanceTarget;
  propertyType: ResidentialPropertyType | CommercialBusinessType;
  // Residential details
  bedrooms: number;
  bathrooms: number;
  floors: number;
  occupants: number;
  areaSqft: number;
  // Commercial details
  businessName: string;
  kitchensCount: number;
  washroomsCount: number;
  operatingHours: string;
  contactPerson: string;
  phone: string;
  email: string;
  address: string;
  city: string;
  // Selection
  selectedPlanType: MaintenancePlanType;
  selectedCategories: MaintenanceCategoryKey[];
  selectedServices: string[]; // service item IDs
  categoryFrequencies: Record<MaintenanceCategoryKey, MaintenanceFrequency>;
  contractDurationMonths: number; // 3, 6, 12, 24
  emergencySupport: boolean;
  priorityResponse: 'standard' | 'express_4hr' | 'rapid_2hr';
  paymentFrequency: 'monthly' | 'quarterly' | 'annual';
}

export interface QuotationSummary {
  quoteNumber: string;
  createdAt: string;
  validUntil: string;
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  propertyTitle: string;
  propertyType: string;
  target: MaintenanceTarget;
  planType: MaintenancePlanType;
  durationMonths: number;
  totalVisits: number;
  categoryBreakdown: {
    category: MaintenanceCategoryKey;
    categoryName: string;
    servicesCount: number;
    frequency: MaintenanceFrequency;
    visits: number;
    annualCost: number;
  }[];
  baseAmount: number;
  emergencySurcharge: number;
  prioritySurcharge: number;
  discountAmount: number;
  subtotal: number;
  gstRatePercent: number;
  gstAmount: number;
  grandTotal: number;
  monthlyEquivalent: number;
  quarterlyEquivalent: number;
  terms: string[];
}

export interface MaintenanceContract {
  id: string;
  contractNumber: string;
  target: MaintenanceTarget;
  planType: MaintenancePlanType;
  planTitle: string;
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  businessName?: string;
  propertyType: string;
  address: string;
  city: string;
  startDate: string;
  endDate: string;
  renewalDate: string;
  status: 'active' | 'pending_payment' | 'expired' | 'cancelled';
  totalValue: number;
  monthlyEquivalent: number;
  paymentFrequency: 'monthly' | 'quarterly' | 'annual';
  paymentStatus: 'paid' | 'partial' | 'due';
  servicesCovered: string[]; // service names
  categoriesCovered: MaintenanceCategoryKey[];
  visitsTotal: number;
  visitsUsed: number;
  emergencySupport: boolean;
  responseSlaHours: number;
  digitalAcceptedByCustomer: boolean;
  digitalAcceptedAt?: string;
  adminApproved: boolean;
  autoRenewal: boolean;
  createdAt: string;
}

export interface MaintenanceServiceRequest {
  id: string;
  contractId: string;
  contractNumber: string;
  customerName: string;
  customerPhone: string;
  propertyAddress: string;
  category: MaintenanceCategoryKey;
  serviceName: string;
  problemDescription: string;
  preferredDate: string;
  preferredTimeSlot: string;
  isEmergency: boolean;
  status: 'scheduled' | 'assigned' | 'on_the_way' | 'in_progress' | 'completed' | 'cancelled';
  assignedPartnerId?: string;
  assignedPartnerName?: string;
  assignedPartnerPhone?: string;
  assignedPartnerRating?: number;
  beforePhotos?: string[];
  afterPhotos?: string[];
  materialsUsed?: { item: string; quantity: string; cost: number }[];
  additionalWorkRequest?: {
    description: string;
    labourCost: number;
    materialCost: number;
    totalAdditionalCost: number;
    status: 'pending_customer_approval' | 'approved' | 'rejected';
    requestedAt: string;
  };
  completionNotes?: string;
  completedAt?: string;
  createdAt: string;
}

export interface CommercialAsset {
  id: string;
  businessName: string;
  branchLocation: string;
  category: string; // 'AC' | 'Refrigerator' | 'Deep Freezer' | 'RO' | 'Chimney' | 'Exhaust' | 'Generator' | 'Other';
  brand: string;
  model: string;
  serialNumber: string;
  installationDate: string;
  warrantyStatus: 'in_warranty' | 'out_of_warranty' | 'extended_amc';
  lastServiceDate?: string;
  nextServiceDue: string;
  serviceHistoryCount: number;
  notes?: string;
}

export interface BusinessLocation {
  id: string;
  businessName: string;
  branchName: string;
  address: string;
  city: string;
  managerName: string;
  managerPhone: string;
  activeContractId?: string;
  assetsCount: number;
}

export interface CrmMaintenanceLead {
  id: string;
  name: string;
  phone: string;
  email: string;
  propertyOrBusiness: string;
  target: MaintenanceTarget;
  planType: MaintenancePlanType;
  estimatedValue: number;
  stage: 
    | 'new'
    | 'contacted'
    | 'requirement_collected'
    | 'quotation_sent'
    | 'negotiation'
    | 'contract_generated'
    | 'active'
    | 'lost';
  assignedAgent: string;
  notes: string;
  createdAt: string;
  lastContactedAt?: string;
}

export interface PricingRuleConfig {
  baseResidentialMonthly: number;
  baseCommercialPerSqftAnnual: number;
  categoryMonthlyRates: Record<MaintenanceCategoryKey, number>;
  frequencyMultiplierAnnual: Record<MaintenanceFrequency, number>;
  emergencySupportAnnualSurcharge: number;
  priorityResponseMultipliers: {
    standard: number;
    express_4hr: number;
    rapid_2hr: number;
  };
  gstRatePercent: number;
  annualAdvanceDiscountPercent: number;
  emergencySlaHours: number;
}
