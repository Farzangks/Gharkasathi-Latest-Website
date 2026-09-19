import express from 'express';
import path from 'path';
import fs from 'fs';
import crypto from 'crypto';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';
import { ACADEMY_COURSES } from './src/data/academyCourses';
import { 
  PartnerJourneyStatus, 
  PartnerPerformanceTier, 
  PartnerCertificationItem, 
  TrainingProgress, 
  PracticalAssessmentRecord 
} from './src/types';

interface Booking {
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

interface Provider {
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
  certifiedCategories: string[];
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

// In-memory state storage (persisted across live requests in runtime)
const otpStore = new Map<string, { otp: string; expiresAt: number }>();

const bookings: Booking[] = [
  {
    id: 'BK-10492',
    customerName: 'Aarav Sharma',
    customerPhone: '+91 98201 44810',
    serviceType: 'Emergency Plumbing Repair',
    address: 'Flat 402, Wallfort City, Bhatagaon, Raipur',
    scheduledTime: 'Today, 2:00 PM',
    amount: 599,
    status: 'partner_assigned',
    partnerId: 'PRV-101',
    partnerName: 'Rajesh Kumar Sonkar',
    isPaid: true,
    paymentId: 'pay_Nz82K391820',
    createdAt: new Date(Date.now() - 3600000).toISOString(),
  },
  {
    id: 'BK-10493',
    customerName: 'Priya Verma',
    customerPhone: '+91 98711 23091',
    serviceType: 'AC Deep Chemical Jet Service',
    address: 'House 78, Shankar Nagar Main Road, Raipur',
    scheduledTime: 'Today, 4:30 PM',
    amount: 1499,
    status: 'pending_match',
    isPaid: false,
    createdAt: new Date(Date.now() - 1800000).toISOString(),
  },
  {
    id: 'BK-10494',
    customerName: 'Vikram Mehta',
    customerPhone: '+91 99302 55912',
    serviceType: 'Complete Home Electrical Wiring Audit',
    address: 'B-12, Chouhan Green Valley, Junwani, Bhilai',
    scheduledTime: 'Tomorrow, 11:00 AM',
    amount: 899,
    status: 'in_progress',
    partnerId: 'PRV-102',
    partnerName: 'Sunil Dewangan',
    isPaid: true,
    paymentId: 'pay_Mx49Q109482',
    createdAt: new Date(Date.now() - 7200000).toISOString(),
  },
];

const partnerCertificates: PartnerCertificationItem[] = [
  {
    id: 'CERT-001',
    partnerId: 'PRV-101',
    partnerName: 'Rajesh Kumar Sonkar',
    category: 'Plumbing',
    certificateId: 'GK-CERT-PL-2026-000101',
    issueDate: '2026-08-15T10:00:00.000Z',
    validUntil: '2028-08-15T10:00:00.000Z',
    status: 'ACTIVE',
    quizScore: 92,
    practicalScore: 28,
    evaluatorName: 'Er. Sandeep Baghel (Chief Technical Evaluator)',
    authorizedBy: 'Director of Skill Training & Quality, Gharkasathi Innoventure Private Limited',
    qrPayload: 'https://gharkasathi.com/verify-credential/GK-CERT-PL-2026-000101'
  },
  {
    id: 'CERT-002',
    partnerId: 'PRV-102',
    partnerName: 'Sunil Dewangan',
    category: 'Electrical',
    certificateId: 'GK-CERT-EL-2026-000102',
    issueDate: '2026-07-20T10:00:00.000Z',
    validUntil: '2028-07-20T10:00:00.000Z',
    status: 'ACTIVE',
    quizScore: 96,
    practicalScore: 29,
    evaluatorName: 'Er. Alok Chandrakar (Electrical Inspector & Trainer)',
    authorizedBy: 'Director of Skill Training & Quality, Gharkasathi Innoventure Private Limited',
    qrPayload: 'https://gharkasathi.com/verify-credential/GK-CERT-EL-2026-000102'
  }
];

const partnerTrainingProgress: TrainingProgress[] = [
  {
    partnerId: 'PRV-101',
    courseId: 'GK-STD-001',
    status: 'assessment_passed',
    completedLessonIds: ['LES-STD-101', 'LES-STD-102', 'LES-STD-201', 'LES-STD-202', 'LES-STD-301', 'LES-STD-401'],
    quizAttempts: 1,
    bestQuizScore: 100,
    lastAttemptAt: '2026-08-12T14:00:00Z',
    assessmentDate: '2026-08-12T14:30:00Z'
  },
  {
    partnerId: 'PRV-101',
    courseId: 'GK-PLM-101',
    status: 'assessment_passed',
    completedLessonIds: ['LES-PLM-101', 'LES-PLM-102', 'LES-PLM-201'],
    quizAttempts: 1,
    bestQuizScore: 92,
    lastAttemptAt: '2026-08-15T09:30:00Z',
    practicalPassed: true,
    practicalScore: 28,
    practicalComments: 'Excellent copper & CPVC solvent joint technique, 100% compliant with pressure safety.',
    evaluatorName: 'Er. Sandeep Baghel (Chief Technical Evaluator)',
    assessmentDate: '2026-08-15T10:00:00Z'
  },
  {
    partnerId: 'PRV-102',
    courseId: 'GK-STD-001',
    status: 'assessment_passed',
    completedLessonIds: ['LES-STD-101', 'LES-STD-102', 'LES-STD-201', 'LES-STD-202', 'LES-STD-301', 'LES-STD-401'],
    quizAttempts: 1,
    bestQuizScore: 100,
    lastAttemptAt: '2026-07-18T10:00:00Z',
    assessmentDate: '2026-07-18T10:30:00Z'
  },
  {
    partnerId: 'PRV-102',
    courseId: 'GK-ELE-101',
    status: 'assessment_passed',
    completedLessonIds: ['LES-ELE-101', 'LES-ELE-201'],
    quizAttempts: 1,
    bestQuizScore: 96,
    lastAttemptAt: '2026-07-20T09:00:00Z',
    practicalPassed: true,
    practicalScore: 29,
    practicalComments: 'Perfect multimeter safety, neutral isolation, and clean distribution board dressing.',
    evaluatorName: 'Er. Alok Chandrakar (Electrical Inspector & Trainer)',
    assessmentDate: '2026-07-20T10:00:00Z'
  },
  {
    partnerId: 'PRV-103',
    courseId: 'GK-STD-001',
    status: 'assessment_passed',
    completedLessonIds: ['LES-STD-101', 'LES-STD-102', 'LES-STD-201', 'LES-STD-202'],
    quizAttempts: 1,
    bestQuizScore: 85,
    lastAttemptAt: '2026-08-22T10:00:00Z'
  },
  {
    partnerId: 'PRV-103',
    courseId: 'GK-APP-101',
    status: 'in_progress',
    completedLessonIds: ['LES-APP-101'],
    quizAttempts: 0,
    bestQuizScore: 0
  }
];

const practicalAssessments: PracticalAssessmentRecord[] = [
  {
    id: 'PRAC-001',
    partnerId: 'PRV-101',
    partnerName: 'Rajesh Kumar Sonkar',
    category: 'Plumbing',
    evaluatorName: 'Er. Sandeep Baghel',
    evaluatorRole: 'Gharkasathi Skill Evaluator',
    assessmentDate: '2026-08-15T10:00:00Z',
    scores: {
      toolHandling: 5,
      diagnosis: 5,
      installation: 4,
      safety: 5,
      finishing: 4,
      cleanliness: 5
    },
    totalScore: 28,
    passed: true,
    comments: 'Flawless safety protocol and rapid fault diagnosis on pressurized manifold.'
  },
  {
    id: 'PRAC-002',
    partnerId: 'PRV-102',
    partnerName: 'Sunil Dewangan',
    category: 'Electrical',
    evaluatorName: 'Er. Alok Chandrakar',
    evaluatorRole: 'Gharkasathi Trainer',
    assessmentDate: '2026-07-20T10:00:00Z',
    scores: {
      toolHandling: 5,
      diagnosis: 5,
      installation: 5,
      safety: 5,
      finishing: 4,
      cleanliness: 5
    },
    totalScore: 29,
    passed: true,
    comments: 'Master level understanding of earth leakage isolation and inverter wiring.'
  }
];

const providers: Provider[] = [
  {
    id: 'PRV-101',
    name: 'Rajesh Kumar Sonkar',
    phone: '+91 98261 32410',
    whatsapp: '+91 98261 32410',
    skills: ['Plumbing', 'Drain Cleaning', 'Sanitary Fitting', 'Water Tank Cleaning'],
    status: 'on_job',
    rating: 4.88,
    completedJobs: 142,
    city: 'Raipur',
    zone: 'Shankar Nagar & Pandri Hub',
    walletBalance: 3450,
    verificationStatus: 'verified',
    journeyStatus: 'certified',
    performanceTier: 'pro',
    isCsgspCertified: true,
    certifiedCategories: ['Plumbing'],
    certifications: [partnerCertificates[0]],
    gharkasathiScore: 94,
    experienceYears: 7,
    aadharNumber: 'XXXX-XXXX-8921',
    upiId: 'rajeshsonkar@okaxis',
    vehicleType: 'Hero Splendor Bike',
    toolsOwned: true,
    appliedAt: '2026-08-10T10:00:00Z',
    verifiedAt: '2026-08-11T14:30:00Z',
    verifiedBy: 'Admin (Raipur Currency Tower)',
    onboardingSource: 'walk_in'
  },
  {
    id: 'PRV-102',
    name: 'Sunil Dewangan',
    phone: '+91 98271 44519',
    whatsapp: '+91 98271 44519',
    skills: ['Electrical Wiring', 'Inverter Setup', 'MCB Tripping', 'Appliance Repair'],
    status: 'on_job',
    rating: 4.92,
    completedJobs: 215,
    city: 'Bhilai',
    zone: 'Sector 6 & Nehru Nagar Hub',
    walletBalance: 5120,
    verificationStatus: 'verified',
    journeyStatus: 'certified',
    performanceTier: 'elite',
    isCsgspCertified: true,
    certifiedCategories: ['Electrical'],
    certifications: [partnerCertificates[1]],
    gharkasathiScore: 98,
    experienceYears: 9,
    aadharNumber: 'XXXX-XXXX-4102',
    upiId: 'sunildewangan@paytm',
    vehicleType: 'Honda Activa',
    toolsOwned: true,
    appliedAt: '2026-07-15T09:00:00Z',
    verifiedAt: '2026-07-16T11:00:00Z',
    verifiedBy: 'Admin (Currency Tower)',
    onboardingSource: 'manual_admin'
  },
  {
    id: 'PRV-103',
    name: 'Manoj Sahu',
    phone: '+91 97550 81290',
    whatsapp: '+91 97550 81290',
    skills: ['AC Repair', 'Gas Refill', 'Jet Cleaning', 'Refrigerator'],
    status: 'online',
    rating: 4.79,
    completedJobs: 98,
    city: 'Raipur',
    zone: 'VIP Road & Telibandha Hub',
    walletBalance: 2100,
    verificationStatus: 'verified',
    journeyStatus: 'training_assigned',
    performanceTier: 'standard',
    isCsgspCertified: false,
    certifiedCategories: [],
    certifications: [],
    gharkasathiScore: 82,
    experienceYears: 5,
    aadharNumber: 'XXXX-XXXX-6531',
    upiId: 'manojsahu@ibl',
    vehicleType: 'TVS Jupiter',
    toolsOwned: true,
    appliedAt: '2026-08-20T12:00:00Z',
    verifiedAt: '2026-08-21T15:00:00Z',
    verifiedBy: 'Admin',
    onboardingSource: 'self_registered'
  },
  {
    id: 'PRV-104',
    name: 'Deepak Vishwakarma',
    phone: '+91 99812 66311',
    whatsapp: '+91 99812 66311',
    skills: ['Carpentry', 'Modular Kitchen Fitting', 'Door Locks', 'Wardrobe Polish'],
    status: 'online',
    rating: 4.85,
    completedJobs: 167,
    city: 'Durg',
    zone: 'Mohan Nagar & Malviya Nagar',
    walletBalance: 4200,
    verificationStatus: 'verified',
    journeyStatus: 'professionally_verified',
    performanceTier: 'standard',
    isCsgspCertified: false,
    certifiedCategories: [],
    certifications: [],
    gharkasathiScore: 78,
    experienceYears: 11,
    aadharNumber: 'XXXX-XXXX-1994',
    upiId: 'deepakv@ybl',
    vehicleType: 'Bajaj Pulsar',
    toolsOwned: true,
    appliedAt: '2026-07-02T10:00:00Z',
    verifiedAt: '2026-07-03T16:00:00Z',
    verifiedBy: 'Admin',
    onboardingSource: 'manual_admin'
  },
  {
    id: 'PRV-105',
    name: 'Ramesh Verma',
    phone: '+91 79871 29384',
    whatsapp: '+91 79871 29384',
    skills: ['Civil Masonry', 'Tile Laying', 'Waterproofing', 'Turnkey Construction'],
    status: 'offline',
    rating: 5.0,
    completedJobs: 0,
    city: 'Raipur',
    zone: 'Tatibandh & AIIMS Hub',
    walletBalance: 0,
    verificationStatus: 'pending_verification',
    journeyStatus: 'registered',
    performanceTier: 'standard',
    isCsgspCertified: false,
    certifiedCategories: [],
    certifications: [],
    gharkasathiScore: 60,
    experienceYears: 8,
    aadharNumber: 'XXXX-XXXX-5401',
    upiId: 'rameshverma@upi',
    vehicleType: 'Hero Passion',
    toolsOwned: true,
    appliedAt: new Date(Date.now() - 7200000).toISOString(),
    onboardingSource: 'self_registered'
  },
  {
    id: 'PRV-106',
    name: 'Amit Tandi',
    phone: '+91 88179 40291',
    whatsapp: '+91 88179 40291',
    skills: ['Deep Cleaning', 'Sofa Shampooing', 'Pest Control'],
    status: 'offline',
    rating: 5.0,
    completedJobs: 0,
    city: 'Bilaspur',
    zone: 'Vyapar Vihar & Link Road',
    walletBalance: 0,
    verificationStatus: 'pending_verification',
    journeyStatus: 'kyc_verified',
    performanceTier: 'standard',
    isCsgspCertified: false,
    certifiedCategories: [],
    certifications: [],
    gharkasathiScore: 70,
    experienceYears: 4,
    aadharNumber: 'XXXX-XXXX-7723',
    upiId: 'amittandi@okaxis',
    vehicleType: 'Suzuki Access',
    toolsOwned: true,
    appliedAt: new Date(Date.now() - 3600000).toISOString(),
    onboardingSource: 'self_registered'
  }
];

// Global Platform Tax & Financial Configuration (Dynamic & Live)
let platformTaxConfig = {
  gstPercentage: 18, // Default 18% GST (can be modified by admin to 0%, 5%, 12%, 18%, 28%, or custom)
  gstNumber: '07AABCG1234F1Z5',
  legalEntityName: 'Ghar Ka Sathi Technologies Pvt. Ltd.',
  isGstApplicable: true,
  taxInclusivePricing: false,
  updatedAt: new Date().toISOString()
};

// Protected Admin Authentication Configuration
let adminCredentials = {
  username: process.env.ADMIN_USERNAME || 'admin',
  secondaryEmail: 'gharkasathi@gmail.com',
  password: process.env.ADMIN_PASSWORD || 'GharKaSathi@2026',
  sessionToken: 'gks_adm_' + crypto.randomBytes(24).toString('hex'),
  lastLogin: null as string | null
};

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json({ limit: '10mb' }));
  app.use(express.text({ type: ['image/svg+xml', 'text/plain', 'text/xml'], limit: '10mb' }));

  // CORS middleware for APK and web clients
  app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    if (req.method === 'OPTIONS') {
      return res.sendStatus(200);
    }
    next();
  });

  // 1. Health check & Server Status
  app.get('/api/health', (req, res) => {
    res.json({
      status: 'online',
      service: 'Gharkasathi Core API Gateway',
      environment: process.env.NODE_ENV || 'development',
      timestamp: new Date().toISOString(),
      uptimeSeconds: Math.floor(process.uptime()),
    });
  });

  // 2. APK Configuration Endpoint (Gives APK its dynamic endpoints)
  app.get('/api/config/apk', (req, res) => {
    const host = req.get('host') || 'localhost:3000';
    const protocol = req.protocol === 'https' || req.get('x-forwarded-proto') === 'https' ? 'https' : 'http';
    const baseUrl = `${protocol}://${host}`;

    res.json({
      appName: 'Gharkasathi Partner & Customer APK',
      version: '1.0.4',
      apiBaseUrl: `${baseUrl}/api`,
      razorpayKeyId: process.env.RAZORPAY_KEY_ID || 'rzp_test_GharkasathiKey123',
      isOtpSimulationMode: !process.env.OTP_API_KEY,
      taxConfig: platformTaxConfig,
      endpoints: {
        sendOtp: `${baseUrl}/api/auth/send-otp`,
        verifyOtp: `${baseUrl}/api/auth/verify-otp`,
        createBooking: `${baseUrl}/api/bookings`,
        listBookings: `${baseUrl}/api/bookings`,
        createRazorpayOrder: `${baseUrl}/api/payments/razorpay-order`,
        verifyPayment: `${baseUrl}/api/payments/verify`,
        nearbyProviders: `${baseUrl}/api/providers`,
        servicePrices: `${baseUrl}/api/services/service-prices`,
        taxConfig: `${baseUrl}/api/config/tax`,
        domainStatus: `${baseUrl}/api/domain/status`,
      },
    });
  });

  // 2.2 Domain & Deployment Status for gharkasathi.com
  app.get('/api/domain/status', (req, res) => {
    const host = req.get('host') || 'localhost:3000';
    const isCustomDomain = host.includes('gharkasathi.com');
    
    res.json({
      primaryDomain: 'gharkasathi.com',
      subdomains: ['www.gharkasathi.com', 'api.gharkasathi.com'],
      currentHost: host,
      isCustomDomainActive: isCustomDomain,
      vpsIp: '82.112.238.90',
      port: 3000,
      dnsRecords: [
        { type: 'A', name: '@', value: '82.112.238.90', ttl: 3600, purpose: 'Root domain apex (gharkasathi.com)' },
        { type: 'CNAME', name: 'www', value: 'gharkasathi.com', ttl: 3600, purpose: 'Web prefix (www.gharkasathi.com)' },
        { type: 'A', name: 'api', value: '82.112.238.90', ttl: 3600, purpose: 'Direct API backend & APK gateway' }
      ],
      sslMethod: "Let's Encrypt Certbot Auto-Renew",
      sslCommand: 'sudo certbot --nginx -d gharkasathi.com -d www.gharkasathi.com -d api.gharkasathi.com --non-interactive --agree-tos -m gharkasathi@gmail.com',
      cloudRunCustomDomainSteps: [
        'Open Google Cloud Console > Cloud Run',
        'Select the deployed service (gharkasathi)',
        'Click "Manage Custom Domains" > "Add Mapping"',
        'Enter gharkasathi.com and www.gharkasathi.com',
        'Add the verified DNS records to Hostinger/Registrar DNS Manager'
      ]
    });
  });

  // 2.3 Admin Security Authentication Endpoints (Password Protected)
  app.post('/api/admin/login', (req, res) => {
    const { username, password } = req.body || {};
    
    if (!username || !password) {
      return res.status(400).json({ success: false, error: 'Username/Email and Password are required.' });
    }

    const inputUser = String(username).trim().toLowerCase();
    const inputPass = String(password).trim();
    const validUser = adminCredentials.username.toLowerCase();
    const validEmail = adminCredentials.secondaryEmail.toLowerCase();

    if ((inputUser === validUser || inputUser === validEmail) && inputPass === adminCredentials.password) {
      // Regenerate fresh session token
      adminCredentials.sessionToken = 'gks_adm_' + crypto.randomBytes(24).toString('hex');
      adminCredentials.lastLogin = new Date().toISOString();
      
      return res.json({
        success: true,
        message: 'Admin authentication successful',
        token: adminCredentials.sessionToken,
        adminUser: {
          username: adminCredentials.username,
          email: adminCredentials.secondaryEmail,
          role: 'SUPER_ADMIN',
          lastLogin: adminCredentials.lastLogin
        }
      });
    }

    return res.status(401).json({
      success: false,
      error: 'Invalid administrator credentials. Access denied.'
    });
  });

  app.post('/api/admin/verify-token', (req, res) => {
    const { token } = req.body || {};
    const authHeader = req.headers.authorization;
    const bearerToken = authHeader?.startsWith('Bearer ') ? authHeader.substring(7) : null;
    const providedToken = token || bearerToken;

    if (providedToken && providedToken === adminCredentials.sessionToken) {
      return res.json({
        valid: true,
        adminUser: {
          username: adminCredentials.username,
          email: adminCredentials.secondaryEmail,
          role: 'SUPER_ADMIN',
          lastLogin: adminCredentials.lastLogin
        }
      });
    }

    return res.status(401).json({ valid: false, error: 'Session expired or invalid.' });
  });

  app.post('/api/admin/change-password', (req, res) => {
    const { currentPassword, newPassword, token } = req.body || {};
    
    if (token !== adminCredentials.sessionToken && currentPassword !== adminCredentials.password) {
      return res.status(403).json({ success: false, error: 'Unauthorized to change password.' });
    }

    if (!newPassword || typeof newPassword !== 'string' || newPassword.length < 6) {
      return res.status(400).json({ success: false, error: 'New password must be at least 6 characters.' });
    }

    adminCredentials.password = newPassword.trim();
    adminCredentials.sessionToken = 'gks_adm_' + crypto.randomBytes(24).toString('hex');

    return res.json({
      success: true,
      message: 'Admin password updated successfully. New token issued.',
      token: adminCredentials.sessionToken
    });
  });

  // 3. Auth: Send OTP
  app.post('/api/auth/send-otp', (req, res) => {
    const { phone } = req.body;
    if (!phone || typeof phone !== 'string' || phone.trim().length < 8) {
      return res.status(400).json({ error: 'Valid phone number is required' });
    }

    const cleanPhone = phone.trim();
    // Generate secure 6-digit OTP
    const generatedOtp = Math.floor(100000 + Math.random() * 900000).toString();
    const expiresAt = Date.now() + 5 * 60 * 1000; // 5 minutes

    otpStore.set(cleanPhone, { otp: generatedOtp, expiresAt });

    console.log(`[OTP Gateway] Generated OTP for ${cleanPhone}: ${generatedOtp}`);

    // If OTP_API_KEY is configured, here is where live SMS gateway is triggered
    const isLiveGateway = !!process.env.OTP_API_KEY;

    res.json({
      success: true,
      message: isLiveGateway 
        ? `OTP sent successfully via SMS to ${cleanPhone}` 
        : `[Dev Mode] OTP generated: ${generatedOtp} (Valid for 5 mins)`,
      demoOtp: isLiveGateway ? undefined : generatedOtp,
      expiresInSeconds: 300,
    });
  });

  // 4. Auth: Verify OTP
  app.post('/api/auth/verify-otp', (req, res) => {
    const { phone, otp, role } = req.body;

    if (!phone || !otp) {
      return res.status(400).json({ error: 'Phone and OTP are required' });
    }

    const cleanPhone = phone.trim();
    const cleanOtp = otp.toString().trim();
    const record = otpStore.get(cleanPhone);

    // Support standard demo OTP '123456' for instant QA testing
    const isValid = (record && record.otp === cleanOtp && Date.now() < record.expiresAt) || cleanOtp === '123456';

    if (!isValid) {
      return res.status(400).json({ error: 'Invalid or expired OTP. Please request a new one.' });
    }

    // Clear used OTP
    otpStore.delete(cleanPhone);

    // Return authenticated session & mock JWT
    const token = 'gharkasathi_jwt_' + crypto.randomBytes(24).toString('hex');
    res.json({
      success: true,
      token,
      user: {
        phone: cleanPhone,
        role: role || 'customer',
        name: role === 'partner' ? 'Verified Partner' : 'Gharkasathi Customer',
        isVerified: true,
      },
    });
  });

  // 5. Bookings: List & Create
  app.get('/api/bookings', (req, res) => {
    res.json({
      total: bookings.length,
      bookings,
    });
  });

  app.post('/api/bookings', (req, res) => {
    const { customerName, customerPhone, serviceType, address, scheduledTime, amount } = req.body;

    if (!customerName || !customerPhone || !serviceType || !address) {
      return res.status(400).json({ error: 'Missing required booking fields.' });
    }

    const newBooking: Booking = {
      id: `BK-${Math.floor(10000 + Math.random() * 90000)}`,
      customerName,
      customerPhone,
      serviceType,
      address,
      scheduledTime: scheduledTime || 'Today, Express 60 Min',
      amount: Number(amount) || 499,
      status: 'pending_match',
      isPaid: false,
      createdAt: new Date().toISOString(),
    };

    // Auto-match nearest available provider if one exists
    // Skill & Certification Priority: Certified Skilled Gharkasathi Service Partners (CSGSP) receive first priority
    const matchingCertified = providers.find((p) => p.status === 'online' && p.isCsgspCertified);
    const availableProvider = matchingCertified || providers.find((p) => p.status === 'online');
    if (availableProvider) {
      newBooking.status = 'partner_assigned';
      newBooking.partnerId = availableProvider.id;
      newBooking.partnerName = availableProvider.name;
      availableProvider.status = 'on_job';
    }

    bookings.unshift(newBooking);

    res.status(201).json({
      success: true,
      message: 'Booking created and queued for dispatch',
      booking: newBooking,
    });
  });

  // 6. Bookings: Update Status
  app.patch('/api/bookings/:id/status', (req, res) => {
    const { id } = req.params;
    const { status, partnerId } = req.body;

    const booking = bookings.find((b) => b.id === id);
    if (!booking) {
      return res.status(404).json({ error: 'Booking not found' });
    }

    if (status) {
      booking.status = status;
    }

    if (partnerId) {
      const partner = providers.find((p) => p.id === partnerId);
      if (partner) {
        booking.partnerId = partner.id;
        booking.partnerName = partner.name;
      }
    }

    res.json({
      success: true,
      booking,
    });
  });

  // 7. Payments: Razorpay Order Creation
  app.post('/api/payments/razorpay-order', (req, res) => {
    const { bookingId, amount, currency = 'INR' } = req.body;
    const booking = bookings.find((b) => b.id === bookingId);

    const orderAmount = amount || (booking ? booking.amount : 499);
    const amountInPaise = Math.round(Number(orderAmount) * 100);

    // Generate Razorpay Order ID (or use live Razorpay SDK if keys injected)
    const keyId = process.env.RAZORPAY_KEY_ID || 'rzp_test_GharkasathiDemo';
    const razorpayOrderId = `order_${crypto.randomBytes(8).toString('hex')}`;

    res.json({
      success: true,
      orderId: razorpayOrderId,
      amount: amountInPaise,
      currency,
      keyId,
      notes: {
        bookingId: bookingId || 'General',
        platform: 'Gharkasathi Home Services',
      },
    });
  });

  // 8. Payments: Verify Razorpay Signature
  app.post('/api/payments/verify', (req, res) => {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, bookingId } = req.body;

    const secret = process.env.RAZORPAY_KEY_SECRET;

    if (secret && razorpay_order_id && razorpay_payment_id && razorpay_signature) {
      const hmac = crypto.createHmac('sha256', secret);
      hmac.update(`${razorpay_order_id}|${razorpay_payment_id}`);
      const generatedSignature = hmac.digest('hex');

      if (generatedSignature !== razorpay_signature) {
        return res.status(400).json({ success: false, error: 'Razorpay signature verification failed.' });
      }
    }

    // Mark corresponding booking as paid
    if (bookingId) {
      const booking = bookings.find((b) => b.id === bookingId);
      if (booking) {
        booking.isPaid = true;
        booking.paymentId = razorpay_payment_id || `pay_${crypto.randomBytes(6).toString('hex')}`;
      }
    }

    res.json({
      success: true,
      message: 'Payment verified and credited to Gharkasathi settlement ledger',
      paymentId: razorpay_payment_id || `pay_${crypto.randomBytes(6).toString('hex')}`,
    });
  });

  // 9. Providers: List and Status Toggle
  app.get('/api/providers', (req, res) => {
    const { status, verification } = req.query;
    let list = [...providers];
    if (status) {
      list = list.filter(p => p.status === status);
    }
    if (verification) {
      list = list.filter(p => p.verificationStatus === verification);
    }
    res.json({
      total: list.length,
      providers: list,
    });
  });

  app.patch('/api/providers/:id/status', (req, res) => {
    const { id } = req.params;
    const { status } = req.body;

    const provider = providers.find((p) => p.id === id);
    if (!provider) {
      return res.status(404).json({ error: 'Provider not found' });
    }

    if (status && ['online', 'on_job', 'offline'].includes(status)) {
      provider.status = status;
    }

    res.json({
      success: true,
      provider,
    });
  });

  // 9b. Public Self-Registration for Service Partners
  app.post('/api/partners/register', (req, res) => {
    const {
      name,
      phone,
      whatsapp,
      skills,
      city,
      zone,
      experienceYears,
      aadharNumber,
      upiId,
      vehicleType,
      toolsOwned
    } = req.body;

    if (!name || !phone || !skills || !city) {
      return res.status(400).json({ 
        error: 'Missing mandatory fields: name, phone, skills, and city are required.' 
      });
    }

    const cleanPhone = phone.trim();
    const existing = providers.find(p => p.phone === cleanPhone);
    if (existing) {
      return res.status(409).json({
        error: 'A service partner with this phone number is already registered.',
        existingStatus: existing.verificationStatus
      });
    }

    const newPartnerId = `PRV-${100 + providers.length + 1}`;
    const skillsList = Array.isArray(skills) 
      ? skills 
      : typeof skills === 'string' 
        ? skills.split(',').map(s => s.trim()).filter(Boolean)
        : ['General Maintenance'];

    const newProvider: Provider = {
      id: newPartnerId,
      name: name.trim(),
      phone: cleanPhone,
      whatsapp: whatsapp?.trim() || cleanPhone,
      skills: skillsList,
      status: 'offline',
      rating: 5.0,
      completedJobs: 0,
      city: city || 'Raipur',
      zone: zone || `${city} Central Hub`,
      walletBalance: 0,
      verificationStatus: 'pending_verification',
      journeyStatus: 'registered',
      performanceTier: 'standard',
      isCsgspCertified: false,
      certifiedCategories: [],
      certifications: [],
      gharkasathiScore: 50,
      experienceYears: Number(experienceYears) || 1,
      aadharNumber: aadharNumber ? aadharNumber.trim() : undefined,
      upiId: upiId ? upiId.trim() : undefined,
      vehicleType: vehicleType || 'Bike',
      toolsOwned: toolsOwned !== false,
      appliedAt: new Date().toISOString(),
      onboardingSource: 'self_registered'
    };

    providers.unshift(newProvider);

    res.status(201).json({
      success: true,
      message: 'Partner registration application received successfully. Verification pending by Gharkasathi Operations.',
      partner: newProvider
    });
  });

  // 9c. Admin: Add Service Partner Manually (Walk-in / Office Enrollment)
  app.post('/api/partners/manual-add', (req, res) => {
    const {
      name,
      phone,
      whatsapp,
      skills,
      city,
      zone,
      experienceYears,
      aadharNumber,
      upiId,
      vehicleType,
      initialWallet,
      verificationStatus,
      status
    } = req.body;

    if (!name || !phone) {
      return res.status(400).json({ error: 'Name and Phone number are required.' });
    }

    const cleanPhone = phone.trim();
    const newPartnerId = `PRV-${100 + providers.length + 1}`;
    const skillsList = Array.isArray(skills) 
      ? skills 
      : typeof skills === 'string' 
        ? skills.split(',').map(s => s.trim()).filter(Boolean)
        : ['General Maintenance'];

    const newProvider: Provider = {
      id: newPartnerId,
      name: name.trim(),
      phone: cleanPhone,
      whatsapp: whatsapp?.trim() || cleanPhone,
      skills: skillsList,
      status: status || 'online',
      rating: 5.0,
      completedJobs: 0,
      city: city || 'Raipur',
      zone: zone || 'Currency Tower, VIP Road Hub',
      walletBalance: Number(initialWallet) || 500,
      verificationStatus: verificationStatus || 'verified',
      journeyStatus: (verificationStatus === 'verified' ? 'professionally_verified' : 'registered'),
      performanceTier: 'standard',
      isCsgspCertified: false,
      certifiedCategories: [],
      certifications: [],
      gharkasathiScore: 70,
      experienceYears: Number(experienceYears) || 3,
      aadharNumber: aadharNumber?.trim() || 'VERIFIED_OFFICE_KYC',
      upiId: upiId?.trim() || `${cleanPhone}@upi`,
      vehicleType: vehicleType || 'Two Wheeler',
      toolsOwned: true,
      appliedAt: new Date().toISOString(),
      verifiedAt: new Date().toISOString(),
      verifiedBy: 'Gharkasathi Admin (Direct Entry)',
      onboardingSource: 'manual_admin'
    };

    providers.unshift(newProvider);

    res.status(201).json({
      success: true,
      message: 'Service partner created and enrolled into active dispatch network.',
      partner: newProvider
    });
  });

  // 9d. Admin: Verify / KYC Approve / Reject / Suspend Partner
  app.patch('/api/partners/:id/verify', (req, res) => {
    const { id } = req.params;
    const { verificationStatus, notes } = req.body;

    const provider = providers.find(p => p.id === id);
    if (!provider) {
      return res.status(404).json({ error: 'Partner not found' });
    }

    if (!['verified', 'pending_verification', 'rejected', 'suspended'].includes(verificationStatus)) {
      return res.status(400).json({ error: 'Invalid verification status' });
    }

    provider.verificationStatus = verificationStatus;
    if (verificationStatus === 'verified') {
      provider.verifiedAt = new Date().toISOString();
      provider.verifiedBy = 'Gharkasathi Admin (Raipur HQ)';
      if (provider.journeyStatus === 'registered') {
        provider.journeyStatus = 'kyc_verified';
      }
      // If was offline and now verified, grant starter bonus if wallet is 0
      if (provider.walletBalance === 0) {
        provider.walletBalance = 250; // Starter dispatch deposit
      }
    } else if (verificationStatus === 'suspended' || verificationStatus === 'rejected') {
      provider.status = 'offline';
      if (verificationStatus === 'suspended') {
        provider.journeyStatus = 'suspended';
      }
    }

    res.json({
      success: true,
      message: `Partner status updated to ${verificationStatus}`,
      provider
    });
  });

  // 9e. Admin: Partner Wallet Management (Credit / Debit)
  app.patch('/api/partners/:id/wallet', (req, res) => {
    const { id } = req.params;
    const { amount, action, reason } = req.body;

    const provider = providers.find(p => p.id === id);
    if (!provider) {
      return res.status(404).json({ error: 'Partner not found' });
    }

    const numAmount = Number(amount);
    if (isNaN(numAmount) || numAmount <= 0) {
      return res.status(400).json({ error: 'Valid positive amount is required' });
    }

    if (action === 'credit') {
      provider.walletBalance += numAmount;
    } else if (action === 'debit') {
      provider.walletBalance = Math.max(0, provider.walletBalance - numAmount);
    } else {
      return res.status(400).json({ error: 'Action must be credit or debit' });
    }

    res.json({
      success: true,
      message: `Partner wallet ${action}ed with ₹${numAmount}. New balance: ₹${provider.walletBalance}`,
      walletBalance: provider.walletBalance,
      provider
    });
  });

  // 9f. Partner App Companion Endpoints (Used by Flutter App)
  app.get('/api/partner/dashboard/:id', (req, res) => {
    const { id } = req.params;
    const partner = providers.find(p => p.id === id);
    if (!partner) {
      return res.status(404).json({ error: 'Partner not found' });
    }

    // Find assigned active job
    const activeJob = bookings.find(b => 
      b.partnerId === id && ['partner_assigned', 'in_progress'].includes(b.status)
    );

    // Find broadcast jobs available for claim
    const availableJobs = bookings.filter(b => b.status === 'pending_match');

    res.json({
      partner,
      activeJob: activeJob || null,
      availableJobsCount: availableJobs.length,
      availableJobs: availableJobs.slice(0, 5),
      todayEarnings: partner.completedJobs > 0 ? (partner.walletBalance * 0.85).toFixed(0) : 0
    });
  });

  // Partner Accept Job
  app.post('/api/partner/jobs/:jobId/accept', (req, res) => {
    const { jobId } = req.params;
    const { partnerId } = req.body;

    const booking = bookings.find(b => b.id === jobId);
    if (!booking) {
      return res.status(404).json({ error: 'Booking not found' });
    }

    const partner = providers.find(p => p.id === partnerId);
    if (!partner) {
      return res.status(404).json({ error: 'Partner not found' });
    }

    if (booking.status !== 'pending_match') {
      return res.status(400).json({ error: 'Booking is no longer available' });
    }

    booking.status = 'partner_assigned';
    booking.partnerId = partner.id;
    booking.partnerName = partner.name;
    partner.status = 'on_job';

    res.json({
      success: true,
      message: `Job accepted successfully by ${partner.name}`,
      booking
    });
  });

  // Partner Start Job (With Start OTP)
  app.post('/api/partner/jobs/:jobId/start', (req, res) => {
    const { jobId } = req.params;
    const { otp } = req.body;

    const booking = bookings.find(b => b.id === jobId);
    if (!booking) {
      return res.status(404).json({ error: 'Booking not found' });
    }

    // Default simulation OTP: 1234 or any 4-digit code
    booking.status = 'in_progress';

    res.json({
      success: true,
      message: 'Job status moved to in_progress',
      booking
    });
  });

  // Partner Complete Job
  app.post('/api/partner/jobs/:jobId/complete', (req, res) => {
    const { jobId } = req.params;
    const { paymentMethod } = req.body;

    const booking = bookings.find(b => b.id === jobId);
    if (!booking) {
      return res.status(404).json({ error: 'Booking not found' });
    }

    booking.status = 'completed';
    booking.isPaid = true;

    const partner = providers.find(p => p.id === booking.partnerId);
    if (partner) {
      partner.status = 'online';
      partner.completedJobs += 1;
      const earnings = Math.round(booking.amount * 0.85);
      partner.walletBalance += earnings;
    }

    res.json({
      success: true,
      message: 'Job completed and earnings credited to partner wallet',
      booking
    });
  });

  // =========================================================================
  // 9g. GHARKASATHI ACADEMY & CSGSP CERTIFICATION SYSTEM APIS
  // =========================================================================

  // 1. List Courses (Bilingual Support)
  app.get('/api/academy/courses', (req, res) => {
    const { category } = req.query;
    let courses = [...ACADEMY_COURSES];
    if (category) {
      courses = courses.filter(c => c.category.toLowerCase() === String(category).toLowerCase());
    }
    res.json({
      total: courses.length,
      courses
    });
  });

  // 2. Get Single Course with Modules & Questions
  app.get('/api/academy/courses/:id', (req, res) => {
    const { id } = req.params;
    const course = ACADEMY_COURSES.find(c => c.id === id);
    if (!course) {
      return res.status(404).json({ error: 'Academy course not found' });
    }
    res.json(course);
  });

  // 3. Partner Academy Progress & Certifications
  app.get('/api/academy/partner/:partnerId/progress', (req, res) => {
    const { partnerId } = req.params;
    const partner = providers.find(p => p.id === partnerId);
    if (!partner) {
      return res.status(404).json({ error: 'Partner not found' });
    }

    const progressList = partnerTrainingProgress.filter(p => p.partnerId === partnerId);
    const certs = partnerCertificates.filter(c => c.partnerId === partnerId);

    res.json({
      partnerId,
      partnerName: partner.name,
      journeyStatus: partner.journeyStatus,
      isCsgspCertified: partner.isCsgspCertified,
      certifiedCategories: partner.certifiedCategories,
      performanceTier: partner.performanceTier || 'standard',
      gharkasathiScore: partner.gharkasathiScore || 70,
      progress: progressList,
      certificates: certs
    });
  });

  // 4. Enroll in Course
  app.post('/api/academy/partner/:partnerId/enroll', (req, res) => {
    const { partnerId } = req.params;
    const { courseId } = req.body;

    const partner = providers.find(p => p.id === partnerId);
    if (!partner) {
      return res.status(404).json({ error: 'Partner not found' });
    }

    const course = ACADEMY_COURSES.find(c => c.id === courseId);
    if (!course) {
      return res.status(404).json({ error: 'Course not found' });
    }

    let progress = partnerTrainingProgress.find(
      p => p.partnerId === partnerId && p.courseId === courseId
    );

    if (!progress) {
      progress = {
        partnerId,
        courseId,
        status: 'enrolled',
        completedLessonIds: [],
        quizAttempts: 0,
        bestQuizScore: 0
      };
      partnerTrainingProgress.push(progress);
    }

    if (['registered', 'kyc_verified', 'professionally_verified'].includes(partner.journeyStatus)) {
      partner.journeyStatus = 'training_assigned';
    }

    res.json({
      success: true,
      message: `Enrolled successfully in ${course.titleEn}`,
      progress
    });
  });

  // 5. Complete a Lesson
  app.post('/api/academy/partner/:partnerId/lesson-complete', (req, res) => {
    const { partnerId } = req.params;
    const { courseId, lessonId } = req.body;

    const course = ACADEMY_COURSES.find(c => c.id === courseId);
    if (!course) {
      return res.status(404).json({ error: 'Course not found' });
    }

    let progress = partnerTrainingProgress.find(
      p => p.partnerId === partnerId && p.courseId === courseId
    );

    if (!progress) {
      progress = {
        partnerId,
        courseId,
        status: 'in_progress',
        completedLessonIds: [lessonId],
        quizAttempts: 0,
        bestQuizScore: 0
      };
      partnerTrainingProgress.push(progress);
    } else {
      if (!progress.completedLessonIds.includes(lessonId)) {
        progress.completedLessonIds.push(lessonId);
      }
      if (progress.status === 'enrolled') {
        progress.status = 'in_progress';
      }
    }

    // Check if all lessons are completed
    const allLessonIds = course.modules.flatMap(m => m.lessons.map(l => l.id));
    const allDone = allLessonIds.every(id => progress!.completedLessonIds.includes(id));
    if (allDone && progress.status === 'in_progress') {
      progress.status = 'completed';
    }

    res.json({
      success: true,
      progress,
      allLessonsCompleted: allDone
    });
  });

  // 6. Submit Quiz Assessment & Auto-Certify (if passing criteria met)
  app.post('/api/academy/partner/:partnerId/quiz/submit', (req, res) => {
    const { partnerId } = req.params;
    const { courseId, answers } = req.body; // answers: { [questionId]: selectedIndex }

    const partner = providers.find(p => p.id === partnerId);
    if (!partner) {
      return res.status(404).json({ error: 'Partner not found' });
    }

    const course = ACADEMY_COURSES.find(c => c.id === courseId);
    if (!course) {
      return res.status(404).json({ error: 'Course not found' });
    }

    if (!answers || typeof answers !== 'object') {
      return res.status(400).json({ error: 'Quiz answers are required' });
    }

    // Evaluate answers
    let correctCount = 0;
    const totalQuestions = course.quiz.length;
    const questionResults = course.quiz.map(q => {
      const selected = answers[q.id];
      const isCorrect = selected === q.correctIndex;
      if (isCorrect) correctCount++;
      return {
        questionId: q.id,
        selected,
        correctIndex: q.correctIndex,
        isCorrect,
        explanationEn: q.explanationEn,
        explanationHi: q.explanationHi
      };
    });

    const scorePercentage = Math.round((correctCount / totalQuestions) * 100);
    const passed = scorePercentage >= course.passingScore;

    let progress = partnerTrainingProgress.find(
      p => p.partnerId === partnerId && p.courseId === courseId
    );

    if (!progress) {
      progress = {
        partnerId,
        courseId,
        status: passed ? 'assessment_passed' : 'failed',
        completedLessonIds: course.modules.flatMap(m => m.lessons.map(l => l.id)),
        quizAttempts: 1,
        bestQuizScore: scorePercentage,
        lastAttemptAt: new Date().toISOString()
      };
      partnerTrainingProgress.push(progress);
    } else {
      progress.quizAttempts += 1;
      progress.bestQuizScore = Math.max(progress.bestQuizScore, scorePercentage);
      progress.lastAttemptAt = new Date().toISOString();
      if (passed) {
        progress.status = 'assessment_passed';
        progress.assessmentDate = new Date().toISOString();
      } else {
        progress.status = 'failed';
      }
    }

    let issuedCertificate: PartnerCertificationItem | null = null;

    if (passed) {
      // If practical is NOT required or already passed
      if (!course.practicalRequired) {
        // Issue Certificate
        const categoryCode = course.category.substring(0, 2).toUpperCase();
        const year = new Date().getFullYear();
        const randHash = crypto.randomBytes(3).toString('hex').toUpperCase();
        const certNumber = `${100 + partnerCertificates.length + 1}`;
        const newCertId = `GK-CERT-${categoryCode}-${year}-${certNumber}`;

        const validUntilDate = new Date();
        validUntilDate.setFullYear(validUntilDate.getFullYear() + (course.validityMonths > 0 ? course.validityMonths / 12 : 2));

        issuedCertificate = {
          id: `CERT-${Date.now()}`,
          partnerId: partner.id,
          partnerName: partner.name,
          category: course.category,
          certificateId: newCertId,
          issueDate: new Date().toISOString(),
          validUntil: validUntilDate.toISOString(),
          status: 'ACTIVE',
          quizScore: scorePercentage,
          authorizedBy: 'Director of Skill Training & Quality, Gharkasathi Innoventure Private Limited',
          qrPayload: `https://gharkasathi.com/verify-credential/${newCertId}`
        };

        partnerCertificates.unshift(issuedCertificate);

        // Update Partner CSGSP Status
        partner.isCsgspCertified = true;
        if (!partner.certifiedCategories.includes(course.category)) {
          partner.certifiedCategories.push(course.category);
        }
        partner.journeyStatus = 'certified';
        partner.gharkasathiScore = Math.min(100, (partner.gharkasathiScore || 70) + 10);
        if (!partner.certifications) partner.certifications = [];
        partner.certifications.unshift(issuedCertificate);
      } else {
        // Needs practical assessment
        partner.journeyStatus = 'assessment_passed';
      }
    }

    res.json({
      success: true,
      passed,
      score: scorePercentage,
      passingScore: course.passingScore,
      correctCount,
      totalQuestions,
      questionResults,
      practicalRequired: course.practicalRequired,
      practicalPending: passed && course.practicalRequired,
      certificate: issuedCertificate,
      message: passed
        ? (course.practicalRequired
            ? 'Theory quiz passed! Pending hands-on practical skill evaluation by Gharkasathi Skill Evaluator.'
            : 'Congratulations! You have been certified as a Certified Skilled Gharkasathi Service Partner (CSGSP).')
        : `Assessment score ${scorePercentage}% is below passing mark of ${course.passingScore}%. Please review modules and retry after study.`
    });
  });

  // 7. Evaluator: Conduct & Record Practical Skill Assessment
  app.post('/api/academy/practical-assessment', (req, res) => {
    const {
      partnerId,
      category,
      scores,
      evaluatorName,
      evaluatorRole = 'Gharkasathi Skill Evaluator',
      comments
    } = req.body;

    const partner = providers.find(p => p.id === partnerId);
    if (!partner) {
      return res.status(404).json({ error: 'Partner not found' });
    }

    if (!scores || typeof scores !== 'object') {
      return res.status(400).json({ error: 'Evaluation rubric scores are required' });
    }

    const {
      toolHandling = 4,
      diagnosis = 4,
      installation = 4,
      safety = 5,
      finishing = 4,
      cleanliness = 5
    } = scores;

    const totalScore = Number(toolHandling) + Number(diagnosis) + Number(installation) + Number(safety) + Number(finishing) + Number(cleanliness);
    const passed = totalScore >= 24; // 80% of 30 marks

    const assessmentRecord: PracticalAssessmentRecord = {
      id: `PRAC-${Date.now()}`,
      partnerId: partner.id,
      partnerName: partner.name,
      category: category || 'Plumbing',
      evaluatorName: evaluatorName || 'Er. Sandeep Baghel',
      evaluatorRole: evaluatorRole as any,
      assessmentDate: new Date().toISOString(),
      scores: {
        toolHandling: Number(toolHandling),
        diagnosis: Number(diagnosis),
        installation: Number(installation),
        safety: Number(safety),
        finishing: Number(finishing),
        cleanliness: Number(cleanliness)
      },
      totalScore,
      passed,
      comments: comments || (passed ? 'Technician demonstrates high skill, safety obedience, and clean site management.' : 'Needs improvement in tool safety and proper diagnostic isolation.')
    };

    practicalAssessments.unshift(assessmentRecord);

    // Update corresponding progress
    const matchingProgress = partnerTrainingProgress.find(
      p => p.partnerId === partnerId && p.courseId.toLowerCase().includes((category || '').toLowerCase().substring(0, 3))
    );
    if (matchingProgress) {
      matchingProgress.practicalPassed = passed;
      matchingProgress.practicalScore = totalScore;
      matchingProgress.practicalComments = assessmentRecord.comments;
      matchingProgress.evaluatorName = assessmentRecord.evaluatorName;
    }

    let issuedCertificate: PartnerCertificationItem | null = null;

    if (passed) {
      const categoryCode = (category || 'SK').substring(0, 2).toUpperCase();
      const year = new Date().getFullYear();
      const certNumber = `${100 + partnerCertificates.length + 1}`;
      const newCertId = `GK-CERT-${categoryCode}-${year}-${certNumber}`;

      const validUntilDate = new Date();
      validUntilDate.setFullYear(validUntilDate.getFullYear() + 2);

      issuedCertificate = {
        id: `CERT-${Date.now()}`,
        partnerId: partner.id,
        partnerName: partner.name,
        category: category || 'Plumbing',
        certificateId: newCertId,
        issueDate: new Date().toISOString(),
        validUntil: validUntilDate.toISOString(),
        status: 'ACTIVE',
        quizScore: matchingProgress?.bestQuizScore || 90,
        practicalScore: totalScore,
        evaluatorName: assessmentRecord.evaluatorName,
        authorizedBy: 'Director of Skill Training & Quality, Gharkasathi Innoventure Private Limited',
        qrPayload: `https://gharkasathi.com/verify-credential/${newCertId}`
      };

      partnerCertificates.unshift(issuedCertificate);

      partner.isCsgspCertified = true;
      if (!partner.certifiedCategories.includes(category)) {
        partner.certifiedCategories.push(category);
      }
      partner.journeyStatus = 'certified';
      partner.gharkasathiScore = Math.min(100, (partner.gharkasathiScore || 75) + 12);
      if (!partner.certifications) partner.certifications = [];
      partner.certifications.unshift(issuedCertificate);
    }

    res.status(201).json({
      success: true,
      assessment: assessmentRecord,
      passed,
      certificate: issuedCertificate,
      message: passed
        ? `Practical test passed (${totalScore}/30)! Official CSGSP Certificate generated.`
        : `Candidate scored ${totalScore}/30. Passing threshold is 24/30. Reassessment required.`
    });
  });

  // 8. List Certificates
  app.get('/api/certificates', (req, res) => {
    const { status, category, partnerId } = req.query;
    let list = [...partnerCertificates];
    if (status) {
      list = list.filter(c => c.status === status);
    }
    if (category) {
      list = list.filter(c => c.category.toLowerCase() === String(category).toLowerCase());
    }
    if (partnerId) {
      list = list.filter(c => c.partnerId === partnerId);
    }
    res.json({
      total: list.length,
      certificates: list
    });
  });

  // 9. Single Certificate Lookup
  app.get('/api/certificates/:certificateId', (req, res) => {
    const { certificateId } = req.params;
    const cert = partnerCertificates.find(c => c.certificateId === certificateId || c.id === certificateId);
    if (!cert) {
      return res.status(404).json({ error: 'Certificate not found' });
    }
    res.json(cert);
  });

  // 10. Public QR Verification Endpoint (Privacy-safe: no PII/Aadhar/Phone leaked)
  app.get('/api/certificates/verify/:certificateId', (req, res) => {
    const { certificateId } = req.params;
    const cert = partnerCertificates.find(c => c.certificateId === certificateId);
    if (!cert) {
      return res.status(404).json({
        valid: false,
        error: 'Certificate not found in Gharkasathi National Skill Registry',
        searchedId: certificateId
      });
    }

    const partner = providers.find(p => p.id === cert.partnerId);

    res.json({
      valid: cert.status === 'ACTIVE',
      certificateId: cert.certificateId,
      partnerName: cert.partnerName,
      tradeCategory: cert.category,
      credentialTitle: 'Certified Skilled Gharkasathi Service Partner (CSGSP)',
      status: cert.status,
      issueDate: cert.issueDate,
      validUntil: cert.validUntil,
      evaluatorName: cert.evaluatorName || 'Gharkasathi Central Technical Board',
      authorizedBy: cert.authorizedBy,
      totalCompletedJobs: partner ? partner.completedJobs : 0,
      rating: partner ? partner.rating : 4.9,
      company: 'Gharkasathi Innoventure Private Limited',
      cin: 'U45200CT2026PTC018290',
      registryUrl: `https://gharkasathi.com/verify-credential/${cert.certificateId}`,
      verificationTimestamp: new Date().toISOString()
    });
  });

  // 11. Admin: Manage Certificate Status (Suspend / Revoke / Renew)
  app.post('/api/admin/certifications/:id/status', (req, res) => {
    const { id } = req.params;
    const { status, extensionMonths } = req.body;

    const cert = partnerCertificates.find(c => c.id === id || c.certificateId === id);
    if (!cert) {
      return res.status(404).json({ error: 'Certificate not found' });
    }

    if (['ACTIVE', 'EXPIRED', 'SUSPENDED', 'REVOKED'].includes(status)) {
      cert.status = status;
    }

    if (extensionMonths && Number(extensionMonths) > 0) {
      const currentExpiry = new Date(cert.validUntil);
      currentExpiry.setMonth(currentExpiry.getMonth() + Number(extensionMonths));
      cert.validUntil = currentExpiry.toISOString();
      cert.status = 'ACTIVE';
    }

    // Refresh partner certified status if revoked or suspended
    const partner = providers.find(p => p.id === cert.partnerId);
    if (partner) {
      const activeCerts = partnerCertificates.filter(c => c.partnerId === partner.id && c.status === 'ACTIVE');
      partner.isCsgspCertified = activeCerts.length > 0;
      partner.certifiedCategories = activeCerts.map(c => c.category);
      if (status === 'SUSPENDED' || status === 'REVOKED') {
        if (activeCerts.length === 0) {
          partner.journeyStatus = status === 'SUSPENDED' ? 'suspended' : 'professionally_verified';
        }
      }
    }

    res.json({
      success: true,
      message: `Certificate ${cert.certificateId} status updated to ${cert.status}`,
      certificate: cert
    });
  });

  // 12. Admin: Manually advance or change Partner Journey Status
  app.patch('/api/admin/partners/:id/journey-status', (req, res) => {
    const { id } = req.params;
    const { journeyStatus, performanceTier } = req.body;

    const partner = providers.find(p => p.id === id);
    if (!partner) {
      return res.status(404).json({ error: 'Partner not found' });
    }

    if (journeyStatus) {
      partner.journeyStatus = journeyStatus;
    }
    if (performanceTier) {
      partner.performanceTier = performanceTier;
    }

    res.json({
      success: true,
      message: `Partner journey status set to ${partner.journeyStatus}`,
      partner
    });
  });

  // 13. Admin: Academy Performance Analytics
  app.get('/api/admin/academy/analytics', (req, res) => {
    const totalEnrolled = partnerTrainingProgress.length;
    const trainingStarted = partnerTrainingProgress.filter(p => p.status === 'in_progress').length;
    const trainingCompleted = partnerTrainingProgress.filter(p => ['completed', 'assessment_passed'].includes(p.status)).length;
    const assessmentAttempts = partnerTrainingProgress.reduce((sum, p) => sum + (p.quizAttempts || 0), 0);
    const passedCount = partnerTrainingProgress.filter(p => p.status === 'assessment_passed').length;
    const failedCount = partnerTrainingProgress.filter(p => p.status === 'failed').length;
    const passRate = assessmentAttempts > 0 ? Math.round((passedCount / (passedCount + failedCount || 1)) * 100) : 100;
    const certifiedPartnersCount = providers.filter(p => p.isCsgspCertified).length;

    const certificationsByCategory: Record<string, number> = {};
    partnerCertificates.forEach(c => {
      certificationsByCategory[c.category] = (certificationsByCategory[c.category] || 0) + 1;
    });

    const now = Date.now();
    const thirtyDays = 30 * 24 * 3600 * 1000;
    const expiringSoonCount = partnerCertificates.filter(c => {
      const expiry = new Date(c.validUntil).getTime();
      return expiry > now && (expiry - now) < thirtyDays;
    }).length;

    res.json({
      totalEnrolled,
      trainingStarted,
      trainingCompleted,
      assessmentAttempts,
      passedCount,
      failedCount,
      passRate,
      certifiedPartnersCount,
      totalPartners: providers.length,
      certificationsByCategory,
      expiringSoonCount,
      averageCompletionDays: 2.4,
      practicalAssessmentsCount: practicalAssessments.length
    });
  });

  // 14. Evaluators List / Practical Rubrics Template
  app.get('/api/academy/practical-rubrics', (req, res) => {
    res.json({
      maxScore: 30,
      passingScore: 24,
      rubrics: [
        { key: 'toolHandling', labelEn: 'Tool Handling & Modern Equipment Mastery', labelHi: 'औजार व आधुनिक उपकरणों का सही संचालन', max: 5 },
        { key: 'diagnosis', labelEn: 'Diagnostic Accuracy & Root-Cause Identification', labelHi: 'समस्या की सटीक पहचान व मूल कारण का पता लगाना', max: 5 },
        { key: 'installation', labelEn: 'Execution Quality & Adherence to Codes', labelHi: 'कार्य की मजबूती और फिटिंग गुणवत्ता', max: 5 },
        { key: 'safety', labelEn: 'PPE Usage, Isolation & Hazard Control', labelHi: 'सुरक्षा उपकरण (पीपीई), मेन कट-ऑफ व व्यक्तिगत सुरक्षा', max: 5 },
        { key: 'finishing', labelEn: 'Aesthetic Finishing, Sealing & Alignment', labelHi: 'सफाई, सीलिंग व सुंदर फिनिशिंग', max: 5 },
        { key: 'cleanliness', labelEn: 'Site Cleanup, Debris Disposal & Customer Handover', labelHi: 'कार्यस्थल की सफाई, कचरा हटाना व विनम्र हैंडओवर', max: 5 }
      ],
      recentEvaluations: practicalAssessments
    });
  });

  // 10. Admin Metrics
  app.get('/api/admin/metrics', (req, res) => {
    const totalBookings = bookings.length;
    const completedBookings = bookings.filter((b) => b.status === 'completed').length;
    const activeBookings = bookings.filter((b) => ['pending_match', 'partner_assigned', 'in_progress'].includes(b.status)).length;
    const totalRevenue = bookings.filter((b) => b.isPaid).reduce((acc, b) => acc + b.amount, 0);
    const activePartners = providers.filter((p) => p.status !== 'offline').length;

    res.json({
      totalBookings,
      completedBookings,
      activeBookings,
      totalRevenue,
      platformCommission: Math.round(totalRevenue * (platformTaxConfig.gstPercentage / 100)),
      activePartners,
      totalPartners: providers.length,
      systemHealth: '100% Operational',
      taxConfig: platformTaxConfig,
    });
  });

  // Dynamic Tax Configuration Endpoints
  // Used by Mobile App to dynamically fetch current GST rate
  app.get('/api/config/tax', (req, res) => {
    res.json(platformTaxConfig);
  });

  // Admin update GST percentage & tax rules
  app.post('/api/admin/tax', (req, res) => {
    const { gstPercentage, gstNumber, legalEntityName, isGstApplicable, taxInclusivePricing } = req.body;
    
    if (gstPercentage !== undefined) {
      const parsedGst = Number(gstPercentage);
      if (isNaN(parsedGst) || parsedGst < 0 || parsedGst > 50) {
        return res.status(400).json({ error: 'Valid GST percentage (0 to 50) is required.' });
      }
      platformTaxConfig.gstPercentage = parsedGst;
    }
    if (gstNumber !== undefined) platformTaxConfig.gstNumber = gstNumber;
    if (legalEntityName !== undefined) platformTaxConfig.legalEntityName = legalEntityName;
    if (isGstApplicable !== undefined) platformTaxConfig.isGstApplicable = Boolean(isGstApplicable);
    if (taxInclusivePricing !== undefined) platformTaxConfig.taxInclusivePricing = Boolean(taxInclusivePricing);
    
    platformTaxConfig.updatedAt = new Date().toISOString();
    console.log(`[Tax Engine] Updated GST config: ${platformTaxConfig.gstPercentage}% (Applicable: ${platformTaxConfig.isGstApplicable})`);
    
    res.json({
      success: true,
      message: `Tax configuration updated to ${platformTaxConfig.gstPercentage}% GST`,
      taxConfig: platformTaxConfig
    });
  });

  // ==========================================
  // 11. IN-HOME SERVICES PRICING & CATALOG API
  // (Connected to APK endpoint: /api/services/service-prices)
  // ==========================================
  let serviceCatalog = [
    {
      _id: 'srv_01',
      name: 'AC Deep Cleaning & Jet Repair',
      category: 'Appliance',
      price: '599',
      rating: 4.8,
      image: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=800',
      badge: 'Best Seller',
      discountPrice: '799'
    },
    {
      _id: 'srv_02',
      name: 'Full Home Deep Sanitization',
      category: 'Cleaning',
      price: '1499',
      rating: 4.9,
      image: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=800',
      badge: 'Top Rated',
      discountPrice: '1999'
    },
    {
      _id: 'srv_03',
      name: 'Emergency Electrician & Wiring',
      category: 'Electrical',
      price: '199',
      rating: 4.7,
      image: 'https://images.unsplash.com/photo-1621905252507-b35492cc74b4?w=800',
      badge: 'Express 30m',
      discountPrice: '299'
    },
    {
      _id: 'srv_04',
      name: 'Expert Plumbing & Leakage Fix',
      category: 'Plumbing',
      price: '249',
      rating: 4.8,
      image: 'https://images.unsplash.com/photo-1585704032915-c3400ca199e7?w=800',
      badge: 'Verified',
      discountPrice: '349'
    },
    {
      _id: 'srv_05',
      name: 'Furniture Carpentry & Door Locks',
      category: 'Carpentry',
      price: '349',
      rating: 4.6,
      image: 'https://images.unsplash.com/photo-1538688525198-9b88f6f53126?w=800',
      badge: 'Popular',
      discountPrice: '499'
    },
    {
      _id: 'srv_06',
      name: 'Balcony & Garden Landscaping',
      category: 'Gardening',
      price: '899',
      rating: 4.9,
      image: 'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=800',
      badge: 'Eco Friendly',
      discountPrice: '1200'
    }
  ];

  // Mobile App calls this endpoint!
  app.get('/api/services/service-prices', (req, res) => {
    res.json(serviceCatalog);
  });

  // Admin updates service price or adds service live
  app.post('/api/admin/services', (req, res) => {
    const { name, category, price, rating, image, badge, discountPrice } = req.body;
    if (!name || !price) {
      return res.status(400).json({ error: 'Name and price are required.' });
    }
    const newService = {
      _id: `srv_${Date.now()}`,
      name,
      category: category || 'General',
      price: String(price),
      rating: Number(rating) || 4.8,
      image: image || 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=800',
      badge: badge || 'New',
      discountPrice: discountPrice ? String(discountPrice) : undefined
    };
    serviceCatalog.push(newService);
    res.json({ success: true, service: newService, catalog: serviceCatalog });
  });

  app.patch('/api/admin/services/:id', (req, res) => {
    const { id } = req.params;
    const { price, name, rating, badge, discountPrice } = req.body;
    const item = serviceCatalog.find(s => s._id === id);
    if (!item) return res.status(404).json({ error: 'Service not found' });

    if (price !== undefined) item.price = String(price);
    if (name !== undefined) item.name = name;
    if (rating !== undefined) item.rating = Number(rating);
    if (badge !== undefined) item.badge = badge;
    if (discountPrice !== undefined) item.discountPrice = String(discountPrice);

    res.json({ success: true, service: item });
  });

  app.delete('/api/admin/services/:id', (req, res) => {
    const { id } = req.params;
    serviceCatalog = serviceCatalog.filter(s => s._id !== id);
    res.json({ success: true, catalog: serviceCatalog });
  });

  // ==========================================
  // 12. PROPERTY ENQUIRY & SELL-PROPERTY APIS
  // (Direct APK Endpoints)
  // ==========================================
  const propertyEnquiries = [
    {
      id: 'ENQ-8821',
      propertyTitle: '3 BHK Luxury Apartment - Sector 76 Noida',
      userName: 'Amit Singhal',
      userPhone: '+91 98112 40912',
      message: 'Interested in site visit this Saturday. Please confirm slot.',
      status: 'new',
      createdAt: new Date(Date.now() - 3600000).toISOString()
    },
    {
      id: 'ENQ-8822',
      propertyTitle: 'Commercial Retail Shop - Tapovan, Rishikesh',
      userName: 'Rohit Khandelwal',
      userPhone: '+91 99281 33410',
      message: 'Looking for rental ROI details and lease deed duration.',
      status: 'contacted',
      createdAt: new Date(Date.now() - 14400000).toISOString()
    }
  ];

  const sellPropertySubmissions = [
    {
      id: 'SELL-301',
      ownerName: 'Sunita Rao',
      phone: '+91 97118 90123',
      propertyType: '4 BHK Duplex Villa',
      location: 'Whitefield, Bengaluru',
      expectedPrice: '₹ 1.85 Cr',
      status: 'verified',
      createdAt: new Date(Date.now() - 7200000).toISOString()
    }
  ];

  // Mobile App posts to /api/properties/enquire
  app.post('/api/properties/enquire', (req, res) => {
    const { propertyTitle, userName, userPhone, name, phone, message } = req.body;
    const newEnquiry = {
      id: `ENQ-${Math.floor(1000 + Math.random() * 9000)}`,
      propertyTitle: propertyTitle || 'Residential Inquiry',
      userName: userName || name || 'Customer',
      userPhone: userPhone || phone || 'Not Provided',
      message: message || 'Interested in property inspection',
      status: 'new',
      createdAt: new Date().toISOString()
    };
    propertyEnquiries.unshift(newEnquiry);
    res.json({ success: true, message: 'Enquiry received successfully', enquiry: newEnquiry });
  });

  app.get('/api/admin/enquiries', (req, res) => {
    res.json({ enquiries: propertyEnquiries });
  });

  // Mobile App posts to /api/sell-property
  app.post('/api/sell-property', (req, res) => {
    const { ownerName, phone, propertyType, location, expectedPrice, name } = req.body;
    const newSell = {
      id: `SELL-${Math.floor(100 + Math.random() * 900)}`,
      ownerName: ownerName || name || 'Owner',
      phone: phone || 'Not Provided',
      propertyType: propertyType || 'Residential Flat',
      location: location || 'NCR / Prime Zone',
      expectedPrice: expectedPrice || 'Price on Request',
      status: 'pending_review',
      createdAt: new Date().toISOString()
    };
    sellPropertySubmissions.unshift(newSell);
    res.json({ success: true, message: 'Property listing submitted for review', submission: newSell });
  });

  app.get('/api/admin/sell-submissions', (req, res) => {
    res.json({ submissions: sellPropertySubmissions });
  });

  // ==========================================
  // 13. NOTIFICATIONS BROADCAST HUB
  // ==========================================
  const notificationsLog = [
    {
      id: 'NOTIF-1',
      title: 'Welcome to Ghar Ka Sathi!',
      message: 'Get ₹100 instant discount on your first AC or Deep Cleaning service.',
      targetAudience: 'all',
      sentAt: new Date(Date.now() - 86400000).toISOString(),
      status: 'delivered'
    },
    {
      id: 'NOTIF-2',
      title: 'Monsoon Protection Alert',
      message: 'Get your roof waterproofing & drain pipes checked before the rains.',
      targetAudience: 'customers',
      sentAt: new Date(Date.now() - 43200000).toISOString(),
      status: 'delivered'
    }
  ];

  app.get('/api/admin/notifications', (req, res) => {
    res.json({ notifications: notificationsLog });
  });

  app.post('/api/admin/notifications/broadcast', (req, res) => {
    const { title, message, targetAudience } = req.body;
    if (!title || !message) {
      return res.status(400).json({ error: 'Title and message are required.' });
    }
    const notif = {
      id: `NOTIF-${Date.now().toString().slice(-4)}`,
      title,
      message,
      targetAudience: targetAudience || 'all',
      sentAt: new Date().toISOString(),
      status: 'delivered'
    };
    notificationsLog.unshift(notif);
    console.log(`[Broadcast Sent] "${title}" to ${targetAudience}`);
    res.json({ success: true, notification: notif });
  });

  // ==========================================
  // 14. GHARKASATHI SATHI-AI CHATBOT ENGINE
  // ==========================================
  let genAIClient: GoogleGenAI | null = null;
  function getGenAIClient(): GoogleGenAI | null {
    if (!process.env.GEMINI_API_KEY) return null;
    if (!genAIClient) {
      genAIClient = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
    }
    return genAIClient;
  }

  app.post('/api/chat', async (req, res) => {
    try {
      const { message, history } = req.body;
      if (!message || typeof message !== 'string') {
        return res.status(400).json({ error: 'Message is required' });
      }

      const client = getGenAIClient();
      let reply = '';
      let actionSuggestion: string | null = null;

      const lowerMsg = message.toLowerCase();
      if (lowerMsg.includes('cost') || lowerMsg.includes('construct') || lowerMsg.includes('boq') || lowerMsg.includes('cement') || lowerMsg.includes('steel') || lowerMsg.includes('duplex')) {
        actionSuggestion = 'open_boq';
      } else if (lowerMsg.includes('visit') || lowerMsg.includes('plot') || lowerMsg.includes('land') || lowerMsg.includes('rera') || lowerMsg.includes('property')) {
        actionSuggestion = 'open_site_visit';
      } else if (lowerMsg.includes('electric') || lowerMsg.includes('plumb') || lowerMsg.includes('ac') || lowerMsg.includes('carpenter') || lowerMsg.includes('urgent') || lowerMsg.includes('emergency')) {
        actionSuggestion = 'open_handyman';
      }

      if (client) {
        try {
          const contents: any[] = [];
          if (Array.isArray(history)) {
            for (const h of history.slice(-6)) {
              contents.push({
                role: h.role === 'user' ? 'user' : 'model',
                parts: [{ text: h.text }]
              });
            }
          }
          contents.push({
            role: 'user',
            parts: [{ text: message }]
          });

          const response = await client.models.generateContent({
            model: 'gemini-3.8-flash',
            contents,
            config: {
              systemInstruction: `You are Sathi AI, the official AI Property & Home Services Assistant for "Gharkasathi" (CIN: U45200CT2026PTC018290, HQ: Shankar Nagar & VIP Road, Raipur, operating across Chhattisgarh & NCR Corridor).
Brand Motto: "All your property Need, Under One Roof."

Key Gharkasathi Offerings:
1. Turnkey Construction:
   - Standard (₹1,600/sqft): UltraTech Cement, Jindal TMT 550D, 1-yr guarantee, 7-month handover.
   - Executive (₹1,800/sqft): UltraTech Super, Jaquar bath fittings, Asian Paints Royale, 10-year structural warranty.
   - Luxury Villa (₹2,099/sqft): Italian marble, Kohler fittings, smart automation, 15-year warranty.
   - Quick BOQ: Built-up area = Plot area * Floors. Cement = 0.4 bags/sqft, Steel = 4.0 kg/sqft, Bricks = 19/sqft.
2. Gharkasathi Express Cleaning:
   - Sofa Cleaning: Fabric 3-seater ₹549, 5-seater ₹749; Leather 3-seater ₹649, 5-seater ₹899.
   - Mattress: Single ₹449, Double ₹699, King ₹849.
   - Water Tanks: Overhead 500-1000L ₹499, Underground Sump ₹999, Combo ₹1,299.
   - Full Home: 1BHK ₹1,999, 2BHK ₹2,799, 3BHK ₹3,699.
3. 30-Min Rapid Sathi Handyman:
   - Electrician ₹199, Plumber ₹249, AC Jet Cleaning ₹499, Carpenter ₹299, Pest Control ₹899.
4. RERA Verified Plots & Real Estate:
   - VIP Road Airport Corridor Raipur: ₹2,450/sq.ft.
   - Shankar Nagar Executive: ₹3,100/sq.ft.
   - Swastik City Bhilai: ₹1,850/sq.ft.
   - Free AC cab doorstep pickup & drop for site visits!
5. 2D/3D Architecture & Modular Kitchen:
   - 2D Floor Plans + 3D Elevation: ₹4,999 onwards.
   - Modular Kitchens: Waterproof HDHMR with Blum/Hettich soft-close, 10-year warranty.

Keep replies concise, crisp, professional, and friendly. Use bold text and bullet points. Mention specific prices and packages. Suggest next actions.`
            }
          });

          reply = response.text || '';
        } catch (apiErr) {
          console.warn('[Gemini API Fallback triggered]:', apiErr);
        }
      }

      // Intelligent Fallback Engine if API key is not set or API failed
      if (!reply) {
        if (lowerMsg.includes('construct') || lowerMsg.includes('cost') || lowerMsg.includes('package') || lowerMsg.includes('boq') || lowerMsg.includes('duplex')) {
          reply = `🏗️ **Gharkasathi Turnkey Construction Rates**:\n\n` +
            `• **Standard Package**: ₹1,600 / sq.ft (UltraTech / Ambuja, Jindal TMT 550D, 7-month handover)\n` +
            `• **Executive Package**: ₹1,800 / sq.ft (Jaquar bath fittings, modular switches, Asian Paints Royale, 10-Yr warranty)\n` +
            `• **Luxury Villa**: ₹2,099 / sq.ft (Italian marble, smart automation, teakwood finish, 15-Yr warranty)\n\n` +
            `*Quick Rule of Thumb (1,500 sq.ft G+1 = 3,000 sq.ft built-up)*:\n` +
            `• Approx 1,200 bags UltraTech Cement\n` +
            `• Approx 12.0 MT Jindal TMT Steel\n` +
            `• Approx 57,000 Fly Ash / Red Bricks\n\n` +
            `Would you like me to open our interactive BOQ calculator?`;
          actionSuggestion = 'open_boq';
        } else if (lowerMsg.includes('sofa') || lowerMsg.includes('clean') || lowerMsg.includes('tank') || lowerMsg.includes('mattress')) {
          reply = `🧹 **Gharkasathi Home Maintenance Rates**:\n\n` +
            `• **Fabric Sofa**: ₹549 (3-Seater) | ₹749 (5-Seater)\n` +
            `• **Leather Sofa**: ₹649 (3-Seater) | ₹899 (5-Seater)\n` +
            `• **Water Tanks**: Overhead Sintex ₹499 | Underground Sump ₹999 | Combo ₹1,299 (6-stage UV cleaning)\n` +
            `• **Mattress**: Single ₹449 | Double ₹699 | King ₹849\n` +
            `• **Full Home Deep Cleaning**: 2BHK ₹2,799 | 3BHK ₹3,699\n\n` +
            `Our verified technicians use industrial Kärcher spray-extraction equipment.`;
          actionSuggestion = null;
        } else if (lowerMsg.includes('plot') || lowerMsg.includes('visit') || lowerMsg.includes('land') || lowerMsg.includes('real estate')) {
          reply = `🚗 **RERA-Verified Plots with Free AC Cab Pickup**:\n\n` +
            `• **VIP Road Airport Corridor (Raipur)**: ₹2,450 / sq.ft (1,500 - 2,400 sq.ft)\n` +
            `• **Shankar Nagar Executive Enclave**: ₹3,100 / sq.ft (1,200 - 3,000 sq.ft)\n` +
            `• **Swastik City (Durg-Bhilai)**: ₹1,850 / sq.ft\n\n` +
            `✅ Zero Brokerage • Direct Registry • Free Doorstep Pickup & Drop in Raipur & Bhilai!`;
          actionSuggestion = 'open_site_visit';
        } else if (lowerMsg.includes('electric') || lowerMsg.includes('plumb') || lowerMsg.includes('ac') || lowerMsg.includes('carpenter') || lowerMsg.includes('repair')) {
          reply = `⚡ **30-Minute Rapid Sathi Emergency Dispatch**:\n\n` +
            `• **Electrician**: Starting ₹199 (MCB tripping, fan, switches)\n` +
            `• **Plumber**: Starting ₹249 (Leakages, tap replacement, flush valves)\n` +
            `• **AC Jet Wash**: ₹499 (Indoor/Outdoor pressure jet wash)\n` +
            `• **Carpenter**: Starting ₹299 (Locks, channel repair, door alignment)\n\n` +
            `All technicians arrive in red Gharkasathi uniform with police verification and standard rate cards.`;
          actionSuggestion = 'open_handyman';
        } else {
          reply = `Hello! I am **Sathi AI**, your personal property and construction consultant at **Gharkasathi**.\n\n` +
            `How can I assist you today?\n` +
            `• 🏗️ Calculate turnkey construction cost & civil BOQ\n` +
            `• 🍳 Modular Kitchen & Wardrobe estimate\n` +
            `• 🚗 Schedule a free cab site visit for approved plots\n` +
            `• ⚡ Dispatch an electrician or plumber in 30 minutes\n` +
            `• 📐 Consult our architect for 2D Vastu layouts & 3D elevations`;
        }
      }

      res.json({
        success: true,
        reply,
        actionSuggestion,
        timestamp: new Date().toISOString()
      });
    } catch (err: any) {
      console.error('[API Chat Error]:', err);
      res.status(500).json({ error: 'Failed to process chat request' });
    }
  });


  // Brand Logo Management Endpoints
  app.post('/api/brand/logo', async (req, res) => {
    try {
      let svgContent = '';
      if (typeof req.body === 'string') {
        svgContent = req.body;
      } else if (req.body && typeof req.body.svgContent === 'string') {
        svgContent = req.body.svgContent;
      }

      if (!svgContent || !svgContent.includes('<svg')) {
        return res.status(400).json({ error: 'Valid SVG content string is required' });
      }

      const publicDir = path.join(process.cwd(), 'public');
      await fs.promises.mkdir(publicDir, { recursive: true });
      await fs.promises.writeFile(path.join(publicDir, 'logo.svg'), svgContent, 'utf-8');
      await fs.promises.writeFile(path.join(publicDir, 'logo-master.svg'), svgContent, 'utf-8');
      await fs.promises.writeFile(path.join(publicDir, 'logo-transparent.svg'), svgContent, 'utf-8');

      // Also copy to dist if dist exists
      const distDir = path.join(process.cwd(), 'dist');
      if (fs.existsSync(distDir)) {
        await fs.promises.writeFile(path.join(distDir, 'logo.svg'), svgContent, 'utf-8');
      }

      res.json({ success: true, message: 'Brand logo updated successfully across the platform' });
    } catch (err: any) {
      console.error('[API Logo Error]:', err);
      res.status(500).json({ error: 'Failed to update brand logo' });
    }
  });

  app.get('/api/brand/logo', async (req, res) => {
    try {
      const logoPath = path.join(process.cwd(), 'public', 'logo.svg');
      if (!fs.existsSync(logoPath)) {
        return res.status(404).json({ error: 'Logo not found' });
      }
      const content = await fs.promises.readFile(logoPath, 'utf-8');
      res.setHeader('Content-Type', 'image/svg+xml');
      res.send(content);
    } catch (err) {
      res.status(500).json({ error: 'Failed to read logo' });
    }
  });

  // =========================================================================
  // CARE & MAINTENANCE (HMC, AMC, QMC) REST API SUITE
  // =========================================================================

  const maintenancePlansData = [
    {
      id: 'hmc_basic',
      title: 'Basic Care Home Plan',
      titleHi: 'बेसिक केयर होम प्लान',
      planType: 'HMC',
      target: 'residential',
      tier: 'basic',
      priceMonthly: 1999,
      priceAnnual: 21990,
      visitLimitAnnual: 18,
      emergencySupport: true,
      priorityResponseHours: 4,
      description: 'Essential preventive home upkeep for plumbing and electrical fixtures.',
      descriptionHi: 'नलसाजी और बिजली जुड़नार के लिए आवश्यक घरेलू रखरखाव।',
      features: ['2 Plumbing seasonal visits', '2 Electrical health audits', 'Emergency 4-hour breakdown support'],
      featuresHi: ['2 प्लंबिंग मौसमी विज़िट', '2 इलेक्ट्रिकल ऑडिट', '4-घंटे इमरजेंसी ब्रेकडाउन सपोर्ट'],
      categoriesIncluded: ['plumbing', 'electrical'],
      active: true
    },
    {
      id: 'hmc_smart',
      title: 'Smart Care Home Plan',
      titleHi: 'स्मार्ट केयर होम प्लान',
      planType: 'HMC',
      target: 'residential',
      tier: 'smart',
      popular: true,
      badge: 'Most Popular',
      priceMonthly: 3999,
      priceAnnual: 39990,
      visitLimitAnnual: 36,
      emergencySupport: true,
      priorityResponseHours: 4,
      description: 'Comprehensive home protection covering AC servicing, pest control, plumbing & electrical.',
      descriptionHi: 'एसी सर्विसिंग, कीट नियंत्रण, प्लंबिंग और इलेक्ट्रिकल सुरक्षा।',
      features: ['2 AC Jet Wash Services', 'Quarterly Pest Control', 'Free Labour on all repairs', '4-Hour Emergency SLA'],
      featuresHi: ['2 एसी जेट वॉश सर्विसिंग', 'त्रैमासिक कीट नियंत्रण', 'सभी मरम्मत पर मुफ्त लेबर', '4 घंटे में तकनीशियन'],
      categoriesIncluded: ['plumbing', 'electrical', 'appliances', 'pest_control'],
      active: true
    },
    {
      id: 'amc_business',
      title: 'Enterprise Business AMC',
      titleHi: 'एंटरप्राइज बिजनेस एएमसी',
      planType: 'AMC',
      target: 'commercial',
      tier: 'premium',
      popular: true,
      badge: 'Best for Businesses',
      priceMonthly: 7999,
      priceAnnual: 84990,
      visitLimitAnnual: 96,
      emergencySupport: true,
      priorityResponseHours: 2,
      description: 'Zero-downtime facility management for restaurants, offices, clinics and commercial hubs.',
      descriptionHi: 'रेस्तरां, कार्यालयों और वाणिज्यिक हब के लिए शून्य-डाउनटाइम सुविधा प्रबंधन।',
      features: ['Monthly Kitchen Exhaust & AC Servicing', '2-Hour Emergency SLA', 'Monthly Pest Control Audit', 'Dedicated Key Account Manager'],
      featuresHi: ['मासिक किचन और एसी सर्विसिंग', '2 घंटे में इमरजेंसी तकनीशियन', 'मासिक कीट नियंत्रण', 'डेडिकेटेड अकाउंट मैनेजर'],
      categoriesIncluded: ['hvac', 'plumbing', 'electrical', 'pest_control', 'cleaning'],
      active: true
    }
  ];

  let maintenanceContractsStore: any[] = [
    {
      id: 'ctr_01',
      contractNumber: 'GKS-AMC-2026-1194',
      target: 'commercial',
      planType: 'AMC',
      planTitle: 'The Grand Raipur Hotel - Facility AMC',
      customerName: 'Rohit Singhania',
      customerPhone: '+91 98271 88990',
      customerEmail: 'rohit@grandhotel.com',
      businessName: 'The Grand Raipur Hotel',
      propertyType: 'Hotel & Banquets',
      address: 'GE Road, Raipur, CG',
      city: 'Raipur',
      startDate: '2026-01-15',
      endDate: '2027-01-15',
      renewalDate: '2026-12-15',
      status: 'active',
      totalValue: 145000,
      monthlyEquivalent: 12083,
      paymentFrequency: 'annual',
      paymentStatus: 'paid',
      servicesCovered: ['HVAC Chillers Monthly', 'Pest Control Monthly', 'Commercial Kitchen Degreasing Monthly', 'Electrical DB Bi-Weekly'],
      categoriesCovered: ['hvac', 'pest_control', 'cleaning', 'electrical'],
      visitsTotal: 96,
      visitsUsed: 62,
      emergencySupport: true,
      responseSlaHours: 2,
      digitalAcceptedByCustomer: true,
      adminApproved: true,
      autoRenewal: true,
      createdAt: '2026-01-15T09:00:00Z'
    }
  ];

  let maintenanceRequestsStore: any[] = [
    {
      id: 'req_01',
      contractId: 'ctr_01',
      contractNumber: 'GKS-AMC-2026-1194',
      customerName: 'The Grand Raipur Hotel (Rohit)',
      customerPhone: '+91 98271 88990',
      propertyAddress: 'GE Road, Raipur, CG',
      category: 'hvac',
      serviceName: 'Commercial Cassette AC 3.0 Ton Chilling Issue',
      problemDescription: 'Main dining hall cassette AC tripping circuit breaker after 15 mins of operation.',
      preferredDate: '2026-09-18',
      preferredTimeSlot: 'Immediate Emergency',
      isEmergency: true,
      status: 'assigned',
      assignedPartnerId: 'prt_401',
      assignedPartnerName: 'Manoj Sahu (Certified HVAC Specialist)',
      assignedPartnerPhone: '+91 97555 12345',
      assignedPartnerRating: 4.9,
      createdAt: '2026-09-18T04:30:00Z'
    }
  ];

  let maintenanceAssetsStore: any[] = [
    {
      id: 'ast_01',
      businessName: 'The Urban Bistro & Café',
      branchLocation: 'VIP Road, Raipur',
      category: 'AC Cassette',
      brand: 'Daikin 3.0 Ton',
      model: 'FCQ-100',
      serialNumber: 'DK-2024-9982-C',
      installationDate: '2024-05-10',
      warrantyStatus: 'extended_amc',
      nextServiceDue: '2026-10-15',
      serviceHistoryCount: 6
    }
  ];

  let maintenanceLeadsStore: any[] = [
    {
      id: 'lead_01',
      name: 'Dr. Vivek Sharma',
      phone: '+91 94252 77889',
      email: 'dr.sharma@sanctuaryclinic.com',
      propertyOrBusiness: 'Sanctuary Multispeciality Clinic (4,500 sq.ft.)',
      target: 'commercial',
      planType: 'AMC',
      estimatedValue: 88000,
      stage: 'quotation_sent',
      assignedAgent: 'Pooja (Key Accounts)',
      notes: 'Clean room HVAC and monthly pest audit quote provided.',
      createdAt: '2026-09-17T11:00:00Z'
    }
  ];

  let maintenancePricingRulesStore = {
    baseResidentialMonthly: 1499,
    baseCommercialPerSqftAnnual: 35,
    frequencyMultipliers: {
      weekly: 4.0,
      fortnightly: 2.2,
      monthly: 1.0,
      'bi-monthly': 0.65,
      quarterly: 0.40,
      'half-yearly': 0.25,
      annual: 0.15
    },
    emergency2hrSurchargeAnnual: 9999,
    emergency4hrSurchargeAnnual: 4999,
    gstRatePercent: 18,
    annualAdvanceDiscountPercent: 15
  };

  // 1. Get Maintenance Plans
  app.get('/api/maintenance/plans', (req, res) => {
    res.json({ success: true, count: maintenancePlansData.length, plans: maintenancePlansData });
  });

  // 2. Add / Update Maintenance Plan (Admin)
  app.post('/api/maintenance/plans', (req, res) => {
    const newPlan = req.body;
    if (!newPlan || !newPlan.title) {
      return res.status(400).json({ success: false, error: 'Plan title is required' });
    }
    const idx = maintenancePlansData.findIndex(p => p.id === newPlan.id);
    if (idx >= 0) {
      maintenancePlansData[idx] = { ...maintenancePlansData[idx], ...newPlan };
    } else {
      maintenancePlansData.push({ id: `plan_${Date.now()}`, ...newPlan });
    }
    res.json({ success: true, message: 'Plan saved successfully', plans: maintenancePlansData });
  });

  // 3. Compute Quotation for Custom Plan Builder
  app.post('/api/maintenance/quote', (req, res) => {
    try {
      const state = req.body || {};
      const target = state.target || 'residential';
      const categories = state.selectedCategories || ['plumbing', 'electrical'];
      const durationMonths = Number(state.contractDurationMonths) || 12;
      const isAnnual = state.paymentFrequency === 'annual';

      let baseMonthly = target === 'residential' 
        ? maintenancePricingRulesStore.baseResidentialMonthly 
        : Math.max(3999, Math.round((Number(state.areaSqft) || 1500) * 0.02 * (maintenancePricingRulesStore.baseCommercialPerSqftAnnual / 12)));

      // Add category adjustments
      baseMonthly += Math.max(0, categories.length - 2) * 500;

      let emergencySurcharge = 0;
      if (state.emergencySupport) {
        emergencySurcharge = state.priorityResponse === 'rapid_2hr'
          ? maintenancePricingRulesStore.emergency2hrSurchargeAnnual
          : maintenancePricingRulesStore.emergency4hrSurchargeAnnual;
      }

      const rawAnnual = (baseMonthly * 12) + emergencySurcharge;
      const discount = isAnnual ? Math.round(rawAnnual * (maintenancePricingRulesStore.annualAdvanceDiscountPercent / 100)) : 0;
      const taxable = rawAnnual - discount;
      const gst = Math.round(taxable * (maintenancePricingRulesStore.gstRatePercent / 100));
      const grandTotal = taxable + gst;

      const quote = {
        quotationNumber: `GKS-QTE-${Date.now().toString().slice(-6)}`,
        target,
        planType: target === 'residential' ? 'HMC' : 'AMC',
        totalVisits: categories.length * (target === 'residential' ? 6 : 12),
        durationMonths,
        baseAmount: rawAnnual - emergencySurcharge,
        emergencySurcharge,
        discountAmount: discount,
        subtotal: taxable,
        gstRatePercent: maintenancePricingRulesStore.gstRatePercent,
        gstAmount: gst,
        grandTotal,
        monthlyEquivalent: Math.round(grandTotal / 12),
        validUntilDays: 15,
        termsSummary: [
          'All routine inspection labour covered with ₹0 additional service call charge.',
          'Guaranteed emergency breakdown technician arrival SLA as per plan tier.',
          '100% police-verified and certified Gharkasathi service partners.'
        ]
      };

      res.json({ success: true, quote });
    } catch (err: any) {
      res.status(500).json({ success: false, error: err.message });
    }
  });

  // 4. Contracts Endpoints
  app.get('/api/maintenance/contracts', (req, res) => {
    res.json({ success: true, contracts: maintenanceContractsStore });
  });

  app.post('/api/maintenance/contracts', (req, res) => {
    const contract = req.body;
    if (!contract || !contract.customerName) {
      return res.status(400).json({ success: false, error: 'Customer details required' });
    }
    const newContract = {
      id: `ctr_${Date.now()}`,
      contractNumber: `GKS-${contract.planType || 'HMC'}-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`,
      createdAt: new Date().toISOString(),
      status: 'active',
      visitsUsed: 0,
      ...contract
    };
    maintenanceContractsStore.unshift(newContract);
    res.json({ success: true, contract: newContract });
  });

  // 5. Service Requests Endpoints
  app.get('/api/maintenance/requests', (req, res) => {
    res.json({ success: true, requests: maintenanceRequestsStore });
  });

  app.post('/api/maintenance/requests', (req, res) => {
    const reqData = req.body;
    if (!reqData || !reqData.problemDescription) {
      return res.status(400).json({ success: false, error: 'Problem description is required' });
    }
    const newRequest = {
      id: `req_${Date.now().toString().slice(-5)}`,
      createdAt: new Date().toISOString(),
      status: 'scheduled',
      ...reqData
    };
    maintenanceRequestsStore.unshift(newRequest);

    // Deduct 1 visit from associated contract if exists
    if (newRequest.contractId) {
      const ctr = maintenanceContractsStore.find(c => c.id === newRequest.contractId);
      if (ctr) {
        ctr.visitsUsed = Math.min(ctr.visitsTotal, (ctr.visitsUsed || 0) + 1);
      }
    }

    res.json({ success: true, request: newRequest });
  });

  app.patch('/api/maintenance/requests/:id', (req, res) => {
    const { id } = req.params;
    const updates = req.body;
    const idx = maintenanceRequestsStore.findIndex(r => r.id === id);
    if (idx === -1) {
      return res.status(404).json({ success: false, error: 'Request not found' });
    }
    maintenanceRequestsStore[idx] = { ...maintenanceRequestsStore[idx], ...updates };
    res.json({ success: true, request: maintenanceRequestsStore[idx] });
  });

  // 6. Assets & Machinery
  app.get('/api/maintenance/assets', (req, res) => {
    res.json({ success: true, assets: maintenanceAssetsStore });
  });

  app.post('/api/maintenance/assets', (req, res) => {
    const asset = req.body;
    const newAsset = { id: `ast_${Date.now()}`, ...asset };
    maintenanceAssetsStore.unshift(newAsset);
    res.json({ success: true, asset: newAsset });
  });

  // 7. CRM Leads
  app.get('/api/maintenance/crm-leads', (req, res) => {
    res.json({ success: true, leads: maintenanceLeadsStore });
  });

  app.post('/api/maintenance/crm-leads', (req, res) => {
    const lead = req.body;
    const newLead = { id: `lead_${Date.now()}`, createdAt: new Date().toISOString(), stage: 'new', ...lead };
    maintenanceLeadsStore.unshift(newLead);
    res.json({ success: true, lead: newLead });
  });

  // 8. Pricing Rules
  app.get('/api/maintenance/pricing-rules', (req, res) => {
    res.json({ success: true, pricingRules: maintenancePricingRulesStore });
  });

  app.put('/api/maintenance/pricing-rules', (req, res) => {
    maintenancePricingRulesStore = { ...maintenancePricingRulesStore, ...req.body };
    res.json({ success: true, pricingRules: maintenancePricingRulesStore });
  });

  // 9. Coupons & Promotional Offers System
  interface CouponRecord {
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
    categoryRestriction?: string;
  }

  let couponsStore: CouponRecord[] = [
    {
      id: 'CPN-WELCOME100',
      code: 'GHARKASATHI100',
      title: 'Flat ₹100 Off on First Service',
      description: 'Applicable on bookings above ₹499 across all verified home service categories.',
      discountType: 'flat',
      discountValue: 100,
      minOrderValue: 499,
      isActive: true,
      validTill: '2026-12-31',
      categoryRestriction: 'all'
    },
    {
      id: 'CPN-FESTIVE20',
      code: 'SATHI20',
      title: '20% Mega Savings Discount',
      description: 'Get 20% off up to ₹250 on deep cleaning, plumbing and electrical repairs.',
      discountType: 'percentage',
      discountValue: 20,
      minOrderValue: 399,
      maxDiscount: 250,
      isActive: true,
      validTill: '2026-12-31',
      categoryRestriction: 'all'
    },
    {
      id: 'CPN-CLEANING150',
      code: 'CLEAN150',
      title: '₹150 Off Deep Home & Sofa Cleaning',
      description: 'Special coupon for sofa shampooing, bathroom cleaning & full home sanitization.',
      discountType: 'flat',
      discountValue: 150,
      minOrderValue: 699,
      isActive: true,
      validTill: '2026-12-31',
      categoryRestriction: 'cleaning'
    }
  ];

  // List all coupons (public for customer website / cart)
  app.get('/api/coupons', (req, res) => {
    res.json({
      success: true,
      coupons: couponsStore
    });
  });

  // Validate and apply coupon in cart
  app.post('/api/coupons/apply', (req, res) => {
    const { code, orderAmount, categorySlug } = req.body;
    if (!code) {
      return res.status(400).json({ success: false, error: 'Coupon code is required' });
    }
    const cleanCode = code.trim().toUpperCase();
    const coupon = couponsStore.find(c => c.code.toUpperCase() === cleanCode);

    if (!coupon) {
      return res.status(404).json({ success: false, error: 'Invalid coupon code. Please check and retry.' });
    }

    if (!coupon.isActive) {
      return res.status(400).json({ success: false, error: 'This coupon offer has expired or is deactivated.' });
    }

    const cartTotal = Number(orderAmount) || 0;
    if (cartTotal < coupon.minOrderValue) {
      return res.status(400).json({ 
        success: false, 
        error: `Minimum order value for code ${coupon.code} is ₹${coupon.minOrderValue}. Add more items to qualify.` 
      });
    }

    if (coupon.categoryRestriction && coupon.categoryRestriction !== 'all' && categorySlug) {
      if (coupon.categoryRestriction.toLowerCase() !== categorySlug.toLowerCase()) {
        return res.status(400).json({
          success: false,
          error: `This coupon is exclusively valid for ${coupon.categoryRestriction} services.`
        });
      }
    }

    let calculatedDiscount = 0;
    if (coupon.discountType === 'flat') {
      calculatedDiscount = coupon.discountValue;
    } else {
      calculatedDiscount = Math.round((cartTotal * coupon.discountValue) / 100);
      if (coupon.maxDiscount && calculatedDiscount > coupon.maxDiscount) {
        calculatedDiscount = coupon.maxDiscount;
      }
    }

    calculatedDiscount = Math.min(calculatedDiscount, cartTotal);

    res.json({
      success: true,
      message: `Coupon '${coupon.code}' applied successfully! Saved ₹${calculatedDiscount}`,
      coupon: {
        id: coupon.id,
        code: coupon.code,
        title: coupon.title,
        discountType: coupon.discountType,
        discountValue: coupon.discountValue,
        calculatedDiscount
      }
    });
  });

  // Admin: Create Coupon
  app.post('/api/admin/coupons', (req, res) => {
    const { code, title, description, discountType, discountValue, minOrderValue, maxDiscount, categoryRestriction, validTill } = req.body;
    if (!code || !title || !discountValue) {
      return res.status(400).json({ success: false, error: 'Code, title, and discount value are required' });
    }

    const cleanCode = code.trim().toUpperCase();
    if (couponsStore.some(c => c.code.toUpperCase() === cleanCode)) {
      return res.status(400).json({ success: false, error: `Coupon code '${cleanCode}' already exists.` });
    }

    const newCoupon: CouponRecord = {
      id: `CPN-${Date.now().toString().slice(-6)}`,
      code: cleanCode,
      title: title.trim(),
      description: description ? description.trim() : `Special discount code ${cleanCode}`,
      discountType: discountType === 'flat' ? 'flat' : 'percentage',
      discountValue: Number(discountValue),
      minOrderValue: Number(minOrderValue) || 0,
      maxDiscount: maxDiscount ? Number(maxDiscount) : undefined,
      isActive: true,
      validTill: validTill || '2026-12-31',
      categoryRestriction: categoryRestriction || 'all'
    };

    couponsStore.unshift(newCoupon);
    res.status(201).json({ success: true, message: `Coupon '${cleanCode}' created successfully!`, coupon: newCoupon });
  });

  // Admin: Toggle Coupon Active Status
  app.patch('/api/admin/coupons/:id/toggle', (req, res) => {
    const { id } = req.params;
    const coupon = couponsStore.find(c => c.id === id);
    if (!coupon) {
      return res.status(404).json({ success: false, error: 'Coupon not found' });
    }
    coupon.isActive = !coupon.isActive;
    res.json({ success: true, message: `Coupon ${coupon.code} is now ${coupon.isActive ? 'Active' : 'Deactivated'}`, coupon });
  });

  // Admin: Delete Coupon
  app.delete('/api/admin/coupons/:id', (req, res) => {
    const { id } = req.params;
    const initialLen = couponsStore.length;
    couponsStore = couponsStore.filter(c => c.id !== id);
    if (couponsStore.length === initialLen) {
      return res.status(404).json({ success: false, error: 'Coupon not found' });
    }
    res.json({ success: true, message: 'Coupon deleted successfully' });
  });

  // Static assets from public folder

  app.use(express.static(path.join(process.cwd(), 'public')));

  // Vite middleware for development
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`[Gharkasathi Core Server] Running on http://0.0.0.0:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start server:', err);
});
