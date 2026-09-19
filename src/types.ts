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

export type PartnerJourneyStatus = 
  | 'registered'
  | 'kyc_verified'
  | 'professionally_verified'
  | 'training_assigned'
  | 'training_completed'
  | 'assessment_passed'
  | 'certified'
  | 'suspended';

export type PartnerPerformanceTier = 'standard' | 'pro' | 'elite';

export interface PartnerCertificationItem {
  id: string;
  partnerId: string;
  partnerName: string;
  category: string; // e.g. 'Plumbing', 'Electrical', 'Appliance Repair', etc.
  certificateId: string; // e.g. 'GK-CERT-PL-2026-000123'
  issueDate: string;
  validUntil: string;
  status: 'ACTIVE' | 'EXPIRED' | 'SUSPENDED' | 'REVOKED';
  quizScore: number;
  practicalScore?: number;
  evaluatorName?: string;
  authorizedBy: string;
  qrPayload: string;
}

export interface LiveProvider {
  id: string;
  name: string;
  phone: string;
  whatsapp?: string;
  skills: string[];
  status: 'online' | 'on_job' | 'offline';
  rating: number;
  completedJobs: number;
  zone: string;
  city?: string;
  walletBalance: number;
  verificationStatus: 'verified' | 'pending_verification' | 'rejected' | 'suspended';
  journeyStatus: PartnerJourneyStatus;
  performanceTier?: PartnerPerformanceTier;
  isCsgspCertified: boolean;
  certifiedCategories: string[]; // e.g. ['Plumbing', 'Electrical']
  certifications?: PartnerCertificationItem[];
  experienceYears?: number;
  aadharNumber?: string;
  upiId?: string;
  vehicleType?: string;
  toolsOwned?: boolean;
  appliedAt?: string;
  verifiedAt?: string;
  verifiedBy?: string;
  onboardingSource?: 'manual_admin' | 'self_registered' | 'walk_in';
  gharkasathiScore?: number;
}

export interface TrainingLesson {
  id: string;
  titleEn: string;
  titleHi: string;
  type: 'video' | 'reading' | 'images' | 'practical';
  duration: string;
  contentEn: string;
  contentHi: string;
  videoUrl?: string;
  imageUrl?: string;
}

export interface TrainingModule {
  id: string;
  titleEn: string;
  titleHi: string;
  descriptionEn: string;
  descriptionHi: string;
  lessons: TrainingLesson[];
}

export interface QuizQuestion {
  id: string;
  questionEn: string;
  questionHi: string;
  optionsEn: string[];
  optionsHi: string[];
  correctIndex: number;
  explanationEn: string;
  explanationHi: string;
  categoryTag: string;
}

export interface TrainingCourse {
  id: string;
  category: string; // 'Standard SOP' | 'Plumbing' | 'Electrical' | 'Carpentry' | 'Appliance Repair' | 'Cleaning' | 'Painting'
  isCommonStandard?: boolean; // Gharkasathi Professional Standards
  titleEn: string;
  titleHi: string;
  descriptionEn: string;
  descriptionHi: string;
  thumbnail: string;
  passingScore: number; // e.g. 80
  maxAttempts: number; // e.g. 3
  cooldownHours: number; // e.g. 12
  practicalRequired: boolean;
  validityMonths: number; // e.g. 24 (0 for no expiry)
  modules: TrainingModule[];
  quiz: QuizQuestion[];
}

export interface TrainingProgress {
  partnerId: string;
  courseId: string;
  status: 'enrolled' | 'in_progress' | 'completed' | 'assessment_passed' | 'failed';
  completedLessonIds: string[];
  quizAttempts: number;
  bestQuizScore: number;
  lastAttemptAt?: string;
  practicalPassed?: boolean;
  practicalScore?: number;
  practicalComments?: string;
  evaluatorName?: string;
  assessmentDate?: string;
}

export interface PracticalAssessmentRecord {
  id: string;
  partnerId: string;
  partnerName: string;
  category: string;
  evaluatorName: string;
  evaluatorRole: 'Gharkasathi Trainer' | 'Gharkasathi Skill Evaluator' | 'Super Admin';
  assessmentDate: string;
  scores: {
    toolHandling: number; // 1-5
    diagnosis: number; // 1-5
    installation: number; // 1-5
    safety: number; // 1-5
    finishing: number; // 1-5
    cleanliness: number; // 1-5
  };
  totalScore: number; // max 30
  passed: boolean;
  comments: string;
}

export interface AcademyAnalytics {
  totalEnrolled: number;
  trainingStarted: number;
  trainingCompleted: number;
  assessmentAttempts: number;
  passedCount: number;
  failedCount: number;
  passRate: number;
  certifiedPartnersCount: number;
  certificationsByCategory: Record<string, number>;
  expiringSoonCount: number;
  averageCompletionDays: number;
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

export interface CouponOffer {
  id: string;
  code: string;
  title: string;
  description: string;
  discountType: 'percentage' | 'flat';
  discountValue: number;
  minOrderValue: number;
  maxDiscount?: number;
  isActive: boolean;
  validTill?: string;
  categoryRestriction?: string; // 'all' or category slug
}

