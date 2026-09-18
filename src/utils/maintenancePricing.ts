import { 
  CustomPlanBuilderState, 
  QuotationSummary, 
  PricingRuleConfig, 
  MaintenanceCategoryKey,
  MaintenanceFrequency,
  MaintenanceContract
} from '../types/maintenance';
import { DEFAULT_PRICING_RULES, MAINTENANCE_CATEGORIES } from '../data/maintenanceCatalog';

export function calculateCustomPlanPricing(
  state: CustomPlanBuilderState,
  rules: PricingRuleConfig = DEFAULT_PRICING_RULES
): QuotationSummary {
  const isResidential = state.target === 'residential';
  let baseCategoryTotal = 0;
  let totalAnnualVisits = 0;

  const categoryBreakdown: QuotationSummary['categoryBreakdown'] = [];

  state.selectedCategories.forEach((catKey) => {
    const categoryInfo = MAINTENANCE_CATEGORIES.find(c => c.key === catKey);
    const catName = categoryInfo ? categoryInfo.label : catKey;
    
    // Services selected in this category
    const servicesInCat = state.selectedServices.filter(sId => sId.startsWith(catKey.slice(0, 4)) || sId.includes(catKey));
    const servicesCount = Math.max(1, servicesInCat.length || 1);

    const freq: MaintenanceFrequency = state.categoryFrequencies[catKey] || 'quarterly';
    const visitsPerYear = rules.frequencyMultiplierAnnual[freq] || 4;
    totalAnnualVisits += visitsPerYear;

    // Monthly rate for this category
    const monthlyRate = rules.categoryMonthlyRates[catKey] || 400;
    
    // Size multiplier
    let scaleMultiplier = 1.0;
    if (isResidential) {
      // Scale by bedrooms & bathrooms
      scaleMultiplier = 1.0 + Math.max(0, (state.bedrooms - 2) * 0.15) + Math.max(0, (state.bathrooms - 2) * 0.1);
      if (state.areaSqft > 1500) {
        scaleMultiplier += ((state.areaSqft - 1500) / 1000) * 0.1;
      }
    } else {
      // Commercial: scale by area and kitchens/washrooms
      const baseSqft = Math.max(500, state.areaSqft || 1000);
      scaleMultiplier = (baseSqft / 1000) * 0.9;
      if (state.kitchensCount > 1) scaleMultiplier += (state.kitchensCount - 1) * 0.25;
      if (state.washroomsCount > 2) scaleMultiplier += (state.washroomsCount - 2) * 0.15;
    }

    // Annual category cost based on frequency visits
    const annualCatCost = Math.round((monthlyRate * (visitsPerYear / 12) * 12) * scaleMultiplier);
    baseCategoryTotal += annualCatCost;

    categoryBreakdown.push({
      category: catKey,
      categoryName: catName,
      servicesCount,
      frequency: freq,
      visits: visitsPerYear,
      annualCost: annualCatCost
    });
  });

  // Base platform & engineer allocation fee
  const baseAllocation = isResidential 
    ? rules.baseResidentialMonthly * 6 
    : (Math.max(500, state.areaSqft || 1000) * rules.baseCommercialPerSqftAnnual);

  let rawAnnualSubtotal = baseAllocation + baseCategoryTotal;

  // Emergency surcharge
  const emergencySurcharge = state.emergencySupport ? rules.emergencySupportAnnualSurcharge : 0;

  // Priority response multiplier
  const priorityMultiplier = rules.priorityResponseMultipliers[state.priorityResponse] || 1.0;
  const prioritySurcharge = Math.round(rawAnnualSubtotal * (priorityMultiplier - 1.0));

  let preDiscountSubtotal = rawAnnualSubtotal + emergencySurcharge + prioritySurcharge;

  // Annual advance payment discount (15%)
  let discountAmount = 0;
  if (state.paymentFrequency === 'annual') {
    discountAmount = Math.round(preDiscountSubtotal * (rules.annualAdvanceDiscountPercent / 100));
  } else if (state.paymentFrequency === 'quarterly') {
    discountAmount = Math.round(preDiscountSubtotal * 0.05); // 5% discount
  }

  const taxableSubtotal = Math.max(1000, preDiscountSubtotal - discountAmount);
  const gstRatePercent = rules.gstRatePercent || 18;
  const gstAmount = Math.round(taxableSubtotal * (gstRatePercent / 100));
  const grandTotal = taxableSubtotal + gstAmount;

  const durationMonths = state.contractDurationMonths || 12;
  const normalizedDurationRatio = durationMonths / 12;
  const durationAdjustedGrandTotal = Math.round(grandTotal * normalizedDurationRatio);

  const monthlyEquivalent = Math.round(durationAdjustedGrandTotal / durationMonths);
  const quarterlyEquivalent = Math.round(durationAdjustedGrandTotal / Math.max(1, durationMonths / 3));

  // Generate unique Quote Number
  const now = new Date();
  const dateStr = now.toISOString().slice(0, 10).replace(/-/g, '');
  const randomSuffix = Math.floor(1000 + Math.random() * 9000);
  const quoteNumber = `GKS-QTE-${dateStr}-${randomSuffix}`;

  const validUntil = new Date(now.getTime() + 15 * 24 * 60 * 60 * 1000).toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  });

  return {
    quoteNumber,
    createdAt: now.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }),
    validUntil,
    customerName: state.contactPerson || state.businessName || 'Valued Gharkasathi Client',
    customerPhone: state.phone || '+91 98765 43210',
    customerEmail: state.email || 'client@gharkasathi.com',
    propertyTitle: state.businessName || `${state.propertyType} (${state.areaSqft || 1200} sq.ft.)`,
    propertyType: state.propertyType,
    target: state.target,
    planType: state.selectedPlanType,
    durationMonths,
    totalVisits: Math.round(totalAnnualVisits * normalizedDurationRatio),
    categoryBreakdown,
    baseAmount: rawAnnualSubtotal,
    emergencySurcharge,
    prioritySurcharge,
    discountAmount,
    subtotal: taxableSubtotal,
    gstRatePercent,
    gstAmount,
    grandTotal: durationAdjustedGrandTotal,
    monthlyEquivalent,
    quarterlyEquivalent,
    terms: [
      'Covers free labour for all scheduled preventive maintenance visits and eligible emergency breakdown callouts.',
      'Spare parts, hardware replacements and chemical consumables exceeding ₹250 require customer approval prior to procurement.',
      'Emergency SLA timer starts immediately upon automated assignment to a certified Gharkasathi Service Partner.',
      'All payments are 100% GST compliant under Gharkasathi Innoventure Private Limited (CIN: U45200CT2026PTC018290).',
      'Digital contract renewal notification is initiated 30 days prior to expiration with guaranteed price freeze.'
    ]
  };
}

export function createContractFromQuote(
  quote: QuotationSummary,
  state: CustomPlanBuilderState
): MaintenanceContract {
  const now = new Date();
  const startDate = now.toISOString().slice(0, 10);
  
  const end = new Date(now);
  end.setMonth(end.getMonth() + quote.durationMonths);
  const endDate = end.toISOString().slice(0, 10);

  const renewal = new Date(end);
  renewal.setDate(renewal.getDate() - 30);
  const renewalDate = renewal.toISOString().slice(0, 10);

  const prefix = quote.planType === 'HMC' ? 'HMC' : (quote.planType === 'AMC' ? 'AMC' : 'QMC');
  const contractNumber = `GKS-${prefix}-${now.getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;

  return {
    id: `contract_${Date.now()}_${Math.random().toString(36).substr(2, 5)}`,
    contractNumber,
    target: quote.target,
    planType: quote.planType,
    planTitle: state.businessName ? `${state.businessName} ${quote.planType}` : `Gharkasathi Custom ${quote.planType}`,
    customerName: quote.customerName,
    customerPhone: quote.customerPhone,
    customerEmail: quote.customerEmail,
    businessName: state.businessName,
    propertyType: quote.propertyType,
    address: state.address || 'Civil Lines, Raipur, Chhattisgarh',
    city: state.city || 'Raipur',
    startDate,
    endDate,
    renewalDate,
    status: 'active',
    totalValue: quote.grandTotal,
    monthlyEquivalent: quote.monthlyEquivalent,
    paymentFrequency: state.paymentFrequency,
    paymentStatus: 'paid',
    servicesCovered: quote.categoryBreakdown.map(c => `${c.categoryName} (${c.frequency})`),
    categoriesCovered: quote.categoryBreakdown.map(c => c.category),
    visitsTotal: quote.totalVisits,
    visitsUsed: 0,
    emergencySupport: state.emergencySupport,
    responseSlaHours: state.priorityResponse === 'rapid_2hr' ? 2 : (state.priorityResponse === 'express_4hr' ? 4 : 8),
    digitalAcceptedByCustomer: true,
    digitalAcceptedAt: now.toISOString(),
    adminApproved: true,
    autoRenewal: true,
    createdAt: now.toISOString()
  };
}
