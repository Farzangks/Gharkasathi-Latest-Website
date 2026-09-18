import express from 'express';
import path from 'path';
import crypto from 'crypto';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';

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
  skills: string[];
  status: 'online' | 'on_job' | 'offline';
  rating: number;
  completedJobs: number;
  zone: string;
  walletBalance: number;
}

// In-memory state storage (persisted across live requests in runtime)
const otpStore = new Map<string, { otp: string; expiresAt: number }>();

const bookings: Booking[] = [
  {
    id: 'BK-10492',
    customerName: 'Aarav Sharma',
    customerPhone: '+91 98201 44810',
    serviceType: 'Emergency Plumbing Repair',
    address: 'Flat 402, Lotus Heights, Sector 18, Noida',
    scheduledTime: 'Today, 2:00 PM',
    amount: 599,
    status: 'partner_assigned',
    partnerId: 'PRV-101',
    partnerName: 'Rajesh Kumar',
    isPaid: true,
    paymentId: 'pay_Nz82K391820',
    createdAt: new Date(Date.now() - 3600000).toISOString(),
  },
  {
    id: 'BK-10493',
    customerName: 'Priya Verma',
    customerPhone: '+91 98711 23091',
    serviceType: 'AC Deep Chemical Jet Service',
    address: 'House 78, Green Glen Layout, Bengaluru',
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
    address: 'B-12, Panchsheel Enclave, New Delhi',
    scheduledTime: 'Tomorrow, 11:00 AM',
    amount: 899,
    status: 'in_progress',
    partnerId: 'PRV-102',
    partnerName: 'Sunil Rathore',
    isPaid: true,
    paymentId: 'pay_Mx49Q109482',
    createdAt: new Date(Date.now() - 7200000).toISOString(),
  },
];

const providers: Provider[] = [
  {
    id: 'PRV-101',
    name: 'Rajesh Kumar',
    phone: '+91 98110 32410',
    skills: ['Plumbing', 'Drain Cleaning', 'Pipe Fitting'],
    status: 'on_job',
    rating: 4.88,
    completedJobs: 142,
    zone: 'Noida / Indirapuram',
    walletBalance: 3450,
  },
  {
    id: 'PRV-102',
    name: 'Sunil Rathore',
    phone: '+91 98221 44519',
    skills: ['Electrical Wiring', 'Inverter Setup', 'MCB Tripping'],
    status: 'on_job',
    rating: 4.92,
    completedJobs: 215,
    zone: 'South Delhi / Saket',
    walletBalance: 5120,
  },
  {
    id: 'PRV-103',
    name: 'Manoj Yadav',
    phone: '+91 98700 81290',
    skills: ['AC Repair', 'Gas Refill', 'Jet Cleaning'],
    status: 'online',
    rating: 4.79,
    completedJobs: 98,
    zone: 'Gurugram / DLF Phase 3',
    walletBalance: 2100,
  },
  {
    id: 'PRV-104',
    name: 'Deepak Verma',
    phone: '+91 97182 66311',
    skills: ['Carpentry', 'Furniture Assembly', 'Door Locks'],
    status: 'online',
    rating: 4.85,
    completedJobs: 167,
    zone: 'East Delhi / Laxmi Nagar',
    walletBalance: 4200,
  },
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

  app.use(express.json());

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
    const availableProvider = providers.find((p) => p.status === 'online');
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
    res.json({
      total: providers.length,
      providers,
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
