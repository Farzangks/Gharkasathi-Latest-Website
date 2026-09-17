// Gharkasathi System Architecture Specification & Data Types

export type SystemLayer = 
  | 'edge_gateway' 
  | 'core_services' 
  | 'database_storage' 
  | 'async_event_stream' 
  | 'security_compliance' 
  | 'devops_infra';

export interface ArchitectureComponent {
  id: string;
  name: string;
  category: SystemLayer;
  techStack: string[];
  status: 'production_ready' | 'in_development' | 'proposed' | 'planned';
  description: string;
  responsibilities: string[];
  scalabilityStrategy: string;
  apiEndpointsSample?: string[];
  resilienceMechanisms: string[];
  latencySLA: string;
}

export interface SystemMetric {
  label: string;
  target: string;
  current: string;
  status: 'optimal' | 'healthy' | 'warning';
  detail: string;
}

export interface DriveDocumentItem {
  id: string;
  name: string;
  mimeType: string;
  modifiedTime?: string;
  size?: string;
  webViewLink?: string;
  iconLink?: string;
}

export interface ArchitectureDocExport {
  title: string;
  timestamp: string;
  version: string;
  executiveSummary: string;
  layers: {
    layer: string;
    services: string[];
    scalability: string;
  }[];
  databaseSchema: string[];
  securityMatrix: string[];
  ctoRecommendations: string[];
}

export interface LiveBooking {
  id: string;
  customerName: string;
  customerPhone: string;
  serviceType: string;
  address: string;
  scheduledTime: string;
  amount: number;
  status: 'pending_match' | 'partner_assigned' | 'in_progress' | 'completed' | 'cancelled';
  partnerId?: string;
  partnerName?: string;
  isPaid: boolean;
  paymentId?: string;
  createdAt: string;
}

export interface LiveProvider {
  id: string;
  name: string;
  phone: string;
  skills: string[];
  status: 'online' | 'on_job' | 'offline';
  rating: number;
  completedJobs: number;
  zone: string;
  walletBalance: number;
}

export interface AdminMetrics {
  totalBookings: number;
  completedBookings: number;
  activeBookings: number;
  totalRevenue: number;
  platformCommission: number;
  activePartners: number;
  totalPartners: number;
  systemHealth: string;
}

export interface ApkConfig {
  appName: string;
  version: string;
  apiBaseUrl: string;
  razorpayKeyId: string;
  isOtpSimulationMode: boolean;
  endpoints: {
    sendOtp: string;
    verifyOtp: string;
    createBooking: string;
    listBookings: string;
    createRazorpayOrder: string;
    verifyPayment: string;
    nearbyProviders: string;
  };
}

export interface ServicePriceItem {
  _id: string;
  name: string;
  category: string;
  price: string;
  rating: number;
  image: string;
  badge?: string;
  discountPrice?: string;
}

export interface PropertyEnquiryItem {
  id: string;
  propertyTitle: string;
  userName: string;
  userPhone: string;
  message: string;
  status: 'new' | 'contacted' | 'closed';
  createdAt: string;
}

export interface SellPropertyItem {
  id: string;
  ownerName: string;
  phone: string;
  propertyType: string;
  location: string;
  expectedPrice: string;
  status: 'pending_review' | 'verified' | 'listed' | 'rejected';
  createdAt: string;
}

export interface BroadcastNotification {
  id: string;
  title: string;
  message: string;
  targetAudience: 'all' | 'customers' | 'partners';
  sentAt: string;
  status: 'delivered';
}

export interface PlatformTaxConfig {
  gstPercentage: number;
  gstNumber: string;
  legalEntityName: string;
  isGstApplicable: boolean;
  taxInclusivePricing: boolean;
  updatedAt: string;
}
