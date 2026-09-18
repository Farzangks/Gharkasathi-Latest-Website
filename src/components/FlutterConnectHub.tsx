import React, { useState } from 'react';
import { 
  Smartphone, 
  Code2, 
  Copy, 
  Check, 
  Server, 
  Layers, 
  Sparkles, 
  Terminal, 
  Wifi, 
  CheckCircle2, 
  ArrowRight,
  ExternalLink,
  Zap,
  Globe
} from 'lucide-react';

export const FlutterConnectHub: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'connect_guide' | 'partner_flutter' | 'customer_flutter' | 'endpoints'>('connect_guide');
  const [copiedSection, setCopiedSection] = useState<string | null>(null);

  const handleCopy = (text: string, sectionId: string) => {
    navigator.clipboard.writeText(text);
    setCopiedSection(sectionId);
    setTimeout(() => setCopiedSection(null), 2500);
  };

  const API_BASE_URL_PRODUCTION = 'https://gharkasathi.com/api';
  const API_BASE_URL_LOCAL = 'http://10.0.2.2:3000/api';

  const FLUTTER_PARTNER_MAIN = `// ==========================================
// GHARKASATHI PARTNER APP - lib/main.dart
// Production Flutter Entry Point
// ==========================================
import 'package:flutter/material.dart';
import 'package:dio/dio.dart';

void main() {
  runApp(const GharkasathiPartnerApp());
}

class GharkasathiPartnerApp extends StatelessWidget {
  const GharkasathiPartnerApp({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Gharkasathi Partner',
      debugShowCheckedModeBanner: false,
      theme: ThemeData(
        primaryColor: const Color(0xFF064E3B), // Emerald-900
        scaffoldBackgroundColor: const Color(0xFF1C1917), // Stone-900
        colorScheme: ColorScheme.fromSeed(
          seedColor: const Color(0xFF059669),
          brightness: Brightness.dark,
        ),
      ),
      home: const PartnerDutyScreen(partnerId: 'PRV-101'),
    );
  }
}

class PartnerDutyScreen extends StatefulWidget {
  final String partnerId;
  const PartnerDutyScreen({Key? key, required this.partnerId}) : super(key: key);

  @override
  State<PartnerDutyScreen> createState() => _PartnerDutyScreenState();
}

class _PartnerDutyScreenState extends State<PartnerDutyScreen> {
  final Dio _dio = Dio(BaseOptions(
    baseUrl: 'https://gharkasathi.com/api',
    connectTimeout: const Duration(seconds: 10),
    receiveTimeout: const Duration(seconds: 10),
  ));

  bool isOnline = true;
  Map<String, dynamic>? partnerData;
  Map<String, dynamic>? activeJob;
  bool isLoading = true;

  @override
  void initState() {
    super.initState();
    fetchDashboard();
  }

  Future<void> fetchDashboard() async {
    try {
      final response = await _dio.get('/partner/dashboard/\${widget.partnerId}');
      setState(() {
        partnerData = response.data['partner'];
        activeJob = response.data['activeJob'];
        isOnline = partnerData?['status'] != 'offline';
        isLoading = false;
      });
    } catch (e) {
      debugPrint('Error fetching partner dashboard: \$e');
      setState(() => isLoading = false);
    }
  }

  Future<void> toggleDuty() async {
    final nextStatus = isOnline ? 'offline' : 'online';
    try {
      await _dio.patch('/providers/\${widget.partnerId}/status', data: {
        'status': nextStatus,
      });
      setState(() {
        isOnline = !isOnline;
      });
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(
          content: Text(isOnline ? 'You are now ONLINE in Raipur.' : 'You are now OFFLINE.'),
          backgroundColor: isOnline ? Colors.green : Colors.grey,
        ),
      );
    } catch (e) {
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(content: Text('Failed to update status: \$e')),
      );
    }
  }

  @override
  Widget build(BuildContext context) {
    if (isLoading) {
      return const Scaffold(
        body: Center(child: CircularProgressIndicator(color: Color(0xFF10B981))),
      );
    }

    return Scaffold(
      appBar: AppBar(
        backgroundColor: const Color(0xFF1C1917),
        elevation: 0,
        title: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text(partnerData?['name'] ?? 'Gharkasathi Sathi', style: const TextStyle(fontSize: 16, fontWeight: FontWeight.bold)),
            Text(partnerData?['zone'] ?? 'Raipur Hub', style: const TextStyle(fontSize: 11, color: Colors.grey)),
          ],
        ),
        actions: [
          Switch(
            value: isOnline,
            onChanged: (val) => toggleDuty(),
            activeColor: const Color(0xFF10B981),
          ),
        ],
      ),
      body: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          children: [
            // Wallet Card
            Container(
              padding: const EdgeInsets.all(16),
              decoration: BoxDecoration(
                color: const Color(0xFF064E3B),
                borderRadius: BorderRadius.circular(16),
              ),
              child: Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      const Text('Wallet Balance', style: TextStyle(color: Colors.white70, fontSize: 12)),
                      Text(
                        '₹\${partnerData?['walletBalance'] ?? 0}',
                        style: const TextStyle(color: Colors.white, fontSize: 24, fontWeight: FontWeight.bold),
                      ),
                    ],
                  ),
                  ElevatedButton(
                    onPressed: () {},
                    style: ElevatedButton.styleFrom(backgroundColor: const Color(0xFF10B981)),
                    child: const Text('Instant Payout'),
                  ),
                ],
              ),
            ),
            const SizedBox(height: 20),

            // Active Job or Waiting State
            Expanded(
              child: activeJob != null
                  ? Card(
                      color: const Color(0xFF292524),
                      child: Padding(
                        padding: const EdgeInsets.all(16.0),
                        child: Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            Text('Active Job: \${activeJob!['id']}', style: const TextStyle(color: Color(0xFF10B981), fontWeight: FontWeight.bold)),
                            const SizedBox(height: 8),
                            Text(activeJob!['serviceType'], style: const TextStyle(fontSize: 18, fontWeight: FontWeight.bold)),
                            const SizedBox(height: 8),
                            Text('Customer: \${activeJob!['customerName']}'),
                            Text('Address: \${activeJob!['address']}'),
                            const Spacer(),
                            ElevatedButton(
                              onPressed: () {},
                              style: ElevatedButton.styleFrom(
                                backgroundColor: const Color(0xFF10B981),
                                minimumSize: const Size.fromHeight(48),
                              ),
                              child: const Text('Start Service (Ask OTP)'),
                            ),
                          ],
                        ),
                      ),
                    )
                  : Center(
                      child: Text(
                        isOnline ? 'Radar Active... Waiting for customer jobs in Raipur' : 'You are Offline. Go online to receive calls.',
                        textAlign: TextAlign.center,
                        style: const TextStyle(color: Colors.grey),
                      ),
                    ),
            ),
          ],
        ),
      ),
    );
  }
}
`;

  const FLUTTER_API_SERVICE = `// ==========================================
// GHARKASATHI CUSTOMER APP - lib/services/api_service.dart
// Production REST & Dio Client for Customer Mobile App
// ==========================================
import 'package:dio/dio.dart';

class GharkasathiApiService {
  static const String baseUrl = 'https://gharkasathi.com/api';
  final Dio _dio = Dio(BaseOptions(
    baseUrl: baseUrl,
    connectTimeout: const Duration(seconds: 10),
    receiveTimeout: const Duration(seconds: 10),
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
  ));

  // 1. Send OTP for Mobile Login
  Future<Map<String, dynamic>> sendOtp(String phone) async {
    final response = await _dio.post('/auth/send-otp', data: {'phone': phone});
    return response.data;
  }

  // 2. Verify OTP
  Future<Map<String, dynamic>> verifyOtp(String phone, String otp) async {
    final response = await _dio.post('/auth/verify-otp', data: {
      'phone': phone,
      'otp': otp,
    });
    return response.data;
  }

  // 3. Create Home Service Booking
  Future<Map<String, dynamic>> createBooking({
    required String customerName,
    required String customerPhone,
    required String serviceType,
    required String address,
    required double amount,
  }) async {
    final response = await _dio.post('/bookings', data: {
      'customerName': customerName,
      'customerPhone': customerPhone,
      'serviceType': serviceType,
      'address': address,
      'amount': amount,
      'scheduledTime': 'Immediate Dispatch',
    });
    return response.data;
  }

  // 4. Create Razorpay Payment Order
  Future<Map<String, dynamic>> createPaymentOrder(double amount) async {
    final response = await _dio.post('/payments/create-order', data: {
      'amount': amount,
      'currency': 'INR',
    });
    return response.data;
  }

  // 5. Verify Razorpay Payment
  Future<Map<String, dynamic>> verifyPayment({
    required String orderId,
    required String paymentId,
    required String bookingId,
  }) async {
    final response = await _dio.post('/payments/verify', data: {
      'razorpay_order_id': orderId,
      'razorpay_payment_id': paymentId,
      'bookingId': bookingId,
    });
    return response.data;
  }

  // 6. Submit BOQ Construction Enquiry
  Future<Map<String, dynamic>> submitBoqEnquiry({
    required String name,
    required String phone,
    required String propertyType,
    required double plotArea,
    required double estimatedCost,
  }) async {
    final response = await _dio.post('/property/enquiry', data: {
      'name': name,
      'phone': phone,
      'message': 'BOQ Construction Estimate for $plotArea sq.ft ($propertyType). Total: ₹$estimatedCost',
      'propertyType': propertyType,
    });
    return response.data;
  }

  // 7. Care & Maintenance: Fetch Active AMC/HMC Plans
  Future<List<dynamic>> fetchMaintenancePlans({String? target}) async {
    final response = await _dio.get('/maintenance/plans', queryParameters: {
      if (target != null) 'target': target,
    });
    return response.data['plans'] ?? [];
  }

  // 8. Care & Maintenance: Calculate Custom AMC Quote
  Future<Map<String, dynamic>> calculateMaintenanceQuote(Map<String, dynamic> builderState) async {
    final response = await _dio.post('/maintenance/quote', data: builderState);
    return response.data;
  }

  // 9. Care & Maintenance: Get Customer Contracts
  Future<List<dynamic>> fetchCustomerContracts(String customerPhone) async {
    final response = await _dio.get('/maintenance/contracts', queryParameters: {
      'phone': customerPhone,
    });
    return response.data['contracts'] ?? [];
  }

  // 10. Care & Maintenance: Raise Service Request / Ticket
  Future<Map<String, dynamic>> raiseMaintenanceRequest({
    required String contractId,
    required String customerName,
    required String customerPhone,
    required String issueCategory,
    required String description,
    required String priority,
    required String address,
  }) async {
    final response = await _dio.post('/maintenance/requests', data: {
      'contractId': contractId,
      'customerName': customerName,
      'customerPhone': customerPhone,
      'issueCategory': issueCategory,
      'description': description,
      'priority': priority,
      'address': address,
    });
    return response.data;
  }
}
`;

  return (
    <div className="bg-white rounded-2xl border border-stone-200 shadow-sm overflow-hidden">
      {/* Header Banner */}
      <div className="bg-stone-900 text-white p-6 relative overflow-hidden">
        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-sky-500/20 text-sky-300 border border-sky-500/40 mb-3">
            <Smartphone className="w-3.5 h-3.5" />
            Flutter Mobile App &bull; Backend Connectivity Architecture
          </div>
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight">
            Connect Flutter Mobile Apps to Gharkasathi Backend
          </h2>
          <p className="text-xs sm:text-sm text-stone-300 max-w-3xl mt-1 leading-relaxed">
            The Node/Express backend at <strong>https://gharkasathi.com</strong> is configured with open CORS, REST endpoints, and instant JSON state machines for both the <strong>Customer App</strong> and the <strong>Partner App</strong>.
          </p>

          <div className="flex flex-wrap items-center gap-3 mt-4 pt-4 border-t border-stone-800 text-xs">
            <div className="flex items-center gap-2 bg-stone-800/80 px-3 py-1.5 rounded-lg border border-stone-700">
              <Globe className="w-4 h-4 text-emerald-400" />
              <span className="text-stone-400">Production Base URL:</span>
              <code className="text-emerald-300 font-mono font-bold">{API_BASE_URL_PRODUCTION}</code>
            </div>
            <div className="flex items-center gap-2 bg-stone-800/80 px-3 py-1.5 rounded-lg border border-stone-700">
              <Server className="w-4 h-4 text-amber-400" />
              <span className="text-stone-400">Android Emulator Loopback:</span>
              <code className="text-amber-300 font-mono font-bold">{API_BASE_URL_LOCAL}</code>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Sub-Tabs */}
      <div className="border-b border-stone-200 px-6 pt-3 bg-stone-50 flex items-center gap-2 overflow-x-auto">
        <button
          onClick={() => setActiveTab('connect_guide')}
          className={`px-4 py-2 text-xs font-bold border-b-2 transition-all cursor-pointer whitespace-nowrap ${
            activeTab === 'connect_guide'
              ? 'border-emerald-700 text-emerald-900 bg-white rounded-t-lg'
              : 'border-transparent text-stone-600 hover:text-stone-900'
          }`}
        >
          <div className="flex items-center gap-1.5">
            <Wifi className="w-3.5 h-3.5 text-emerald-600" />
            <span>Connection &amp; Android Setup</span>
          </div>
        </button>

        <button
          onClick={() => setActiveTab('partner_flutter')}
          className={`px-4 py-2 text-xs font-bold border-b-2 transition-all cursor-pointer whitespace-nowrap ${
            activeTab === 'partner_flutter'
              ? 'border-emerald-700 text-emerald-900 bg-white rounded-t-lg'
              : 'border-transparent text-stone-600 hover:text-stone-900'
          }`}
        >
          <div className="flex items-center gap-1.5">
            <Smartphone className="w-3.5 h-3.5 text-emerald-600" />
            <span>Gharkasathi Partner App (Dart/Flutter)</span>
            <span className="px-1.5 py-0.2 rounded text-[9px] bg-emerald-100 text-emerald-800 font-extrabold">Ready</span>
          </div>
        </button>

        <button
          onClick={() => setActiveTab('customer_flutter')}
          className={`px-4 py-2 text-xs font-bold border-b-2 transition-all cursor-pointer whitespace-nowrap ${
            activeTab === 'customer_flutter'
              ? 'border-emerald-700 text-emerald-900 bg-white rounded-t-lg'
              : 'border-transparent text-stone-600 hover:text-stone-900'
          }`}
        >
          <div className="flex items-center gap-1.5">
            <Code2 className="w-3.5 h-3.5 text-sky-600" />
            <span>Customer App ApiService.dart</span>
          </div>
        </button>

        <button
          onClick={() => setActiveTab('endpoints')}
          className={`px-4 py-2 text-xs font-bold border-b-2 transition-all cursor-pointer whitespace-nowrap ${
            activeTab === 'endpoints'
              ? 'border-emerald-700 text-emerald-900 bg-white rounded-t-lg'
              : 'border-transparent text-stone-600 hover:text-stone-900'
          }`}
        >
          <div className="flex items-center gap-1.5">
            <Terminal className="w-3.5 h-3.5 text-amber-600" />
            <span>All Live REST Endpoints Matrix</span>
          </div>
        </button>
      </div>

      {/* Tab Content */}
      <div className="p-6">
        
        {/* TAB 1: HOW TO CONNECT GUIDE */}
        {activeTab === 'connect_guide' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-stone-50 p-4 rounded-xl border border-stone-200 space-y-2">
                <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-800 font-bold flex items-center justify-center text-xs">
                  1
                </div>
                <h4 className="text-sm font-bold text-stone-900">Add dio / http to pubspec.yaml</h4>
                <p className="text-xs text-stone-600 leading-relaxed">
                  In your Flutter root directory, run <code>flutter pub add dio</code> to install the high-performance HTTP client.
                </p>
                <div className="bg-stone-900 text-stone-200 p-2.5 rounded-lg text-[11px] font-mono">
                  dependencies:<br />
                  &nbsp;&nbsp;dio: ^5.4.0<br />
                  &nbsp;&nbsp;flutter_secure_storage: ^9.0.0
                </div>
              </div>

              <div className="bg-stone-50 p-4 rounded-xl border border-stone-200 space-y-2">
                <div className="w-8 h-8 rounded-lg bg-sky-100 text-sky-800 font-bold flex items-center justify-center text-xs">
                  2
                </div>
                <h4 className="text-sm font-bold text-stone-900">Configure Base URL</h4>
                <p className="text-xs text-stone-600 leading-relaxed">
                  Set Base URL to <strong>https://gharkasathi.com/api</strong> for release APKs or <strong>http://10.0.2.2:3000/api</strong> for local Android Studio emulator.
                </p>
                <div className="bg-stone-900 text-stone-200 p-2.5 rounded-lg text-[11px] font-mono">
                  const kBaseUrl = bool.fromEnvironment('dart.vm.product')<br />
                  &nbsp;&nbsp;? 'https://gharkasathi.com/api'<br />
                  &nbsp;&nbsp;: 'http://10.0.2.2:3000/api';
                </div>
              </div>

              <div className="bg-stone-50 p-4 rounded-xl border border-stone-200 space-y-2">
                <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-800 font-bold flex items-center justify-center text-xs">
                  3
                </div>
                <h4 className="text-sm font-bold text-stone-900">Android Internet Permission</h4>
                <p className="text-xs text-stone-600 leading-relaxed">
                  Ensure <code>android/app/src/main/AndroidManifest.xml</code> includes internet permissions.
                </p>
                <div className="bg-stone-900 text-stone-200 p-2.5 rounded-lg text-[11px] font-mono">
                  &lt;uses-permission android:name="android.permission.INTERNET" /&gt;<br />
                  &lt;uses-permission android:name="android.permission.ACCESS_NETWORK_STATE" /&gt;
                </div>
              </div>
            </div>

            <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div>
                <h4 className="text-xs font-bold text-emerald-900 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  CORS &amp; REST Headers Verified
                </h4>
                <p className="text-[11px] text-emerald-800 mt-0.5">
                  The Gharkasathi backend already responds with <code>Access-Control-Allow-Origin: *</code> and standard JSON schemas for all Flutter requests.
                </p>
              </div>
              <button
                onClick={() => setActiveTab('partner_flutter')}
                className="px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white rounded-lg text-xs font-bold transition-colors cursor-pointer shrink-0"
              >
                View Partner App Code &rarr;
              </button>
            </div>
          </div>
        )}

        {/* TAB 2: PARTNER APP FLUTTER CODE */}
        {activeTab === 'partner_flutter' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-stone-900">
                  Gharkasathi Partner App &bull; Ready-to-Run Flutter Code (lib/main.dart)
                </h3>
                <p className="text-xs text-stone-500 mt-0.5">
                  Includes duty toggle (Online/Offline), live wallet balance, and instant job alert card.
                </p>
              </div>

              <button
                onClick={() => handleCopy(FLUTTER_PARTNER_MAIN, 'partner_code')}
                className="px-3 py-1.5 rounded-lg bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer shadow-xs"
              >
                {copiedSection === 'partner_code' ? (
                  <>
                    <Check className="w-3.5 h-3.5" />
                    <span>Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy Full Flutter Code</span>
                  </>
                )}
              </button>
            </div>

            <div className="bg-stone-900 rounded-xl p-4 overflow-x-auto text-xs font-mono text-stone-200 max-h-[480px]">
              <pre>{FLUTTER_PARTNER_MAIN}</pre>
            </div>
          </div>
        )}

        {/* TAB 3: CUSTOMER APP FLUTTER API SERVICE */}
        {activeTab === 'customer_flutter' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-stone-900">
                  Customer App ApiService.dart &bull; Complete API SDK
                </h3>
                <p className="text-xs text-stone-500 mt-0.5">
                  Handles OTP authentication, service booking, Razorpay payment verification, and BOQ submission.
                </p>
              </div>

              <button
                onClick={() => handleCopy(FLUTTER_API_SERVICE, 'customer_service')}
                className="px-3 py-1.5 rounded-lg bg-sky-700 hover:bg-sky-800 text-white text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer shadow-xs"
              >
                {copiedSection === 'customer_service' ? (
                  <>
                    <Check className="w-3.5 h-3.5" />
                    <span>Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy ApiService.dart</span>
                  </>
                )}
              </button>
            </div>

            <div className="bg-stone-900 rounded-xl p-4 overflow-x-auto text-xs font-mono text-stone-200 max-h-[480px]">
              <pre>{FLUTTER_API_SERVICE}</pre>
            </div>
          </div>
        )}

        {/* TAB 4: ENDPOINT MATRIX */}
        {activeTab === 'endpoints' && (
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-stone-900">
              Live API Endpoints for Mobile Apps
            </h3>
            
            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left border border-stone-200 rounded-xl overflow-hidden">
                <thead className="bg-stone-100 text-stone-700 font-bold uppercase text-[10px] tracking-wider">
                  <tr>
                    <th className="p-3">Method</th>
                    <th className="p-3">Endpoint</th>
                    <th className="p-3">Target App</th>
                    <th className="p-3">Description</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-200">
                  <tr className="hover:bg-stone-50">
                    <td className="p-3 font-mono font-bold text-emerald-700">POST</td>
                    <td className="p-3 font-mono font-bold">/api/partners/register</td>
                    <td className="p-3"><span className="px-2 py-0.5 rounded text-[10px] bg-emerald-100 text-emerald-800 font-bold">Partner</span></td>
                    <td className="p-3 text-stone-600">Public technician self-registration with skills, city, aadhar &amp; UPI.</td>
                  </tr>
                  <tr className="hover:bg-stone-50">
                    <td className="p-3 font-mono font-bold text-sky-700">GET</td>
                    <td className="p-3 font-mono font-bold">/api/partner/dashboard/:id</td>
                    <td className="p-3"><span className="px-2 py-0.5 rounded text-[10px] bg-emerald-100 text-emerald-800 font-bold">Partner</span></td>
                    <td className="p-3 text-stone-600">Returns partner details, active dispatched job, and available jobs.</td>
                  </tr>
                  <tr className="hover:bg-stone-50">
                    <td className="p-3 font-mono font-bold text-amber-700">PATCH</td>
                    <td className="p-3 font-mono font-bold">/api/providers/:id/status</td>
                    <td className="p-3"><span className="px-2 py-0.5 rounded text-[10px] bg-emerald-100 text-emerald-800 font-bold">Partner</span></td>
                    <td className="p-3 text-stone-600">Toggles partner Online / Offline / On-Job status.</td>
                  </tr>
                  <tr className="hover:bg-stone-50">
                    <td className="p-3 font-mono font-bold text-emerald-700">POST</td>
                    <td className="p-3 font-mono font-bold">/api/partner/jobs/:jobId/accept</td>
                    <td className="p-3"><span className="px-2 py-0.5 rounded text-[10px] bg-emerald-100 text-emerald-800 font-bold">Partner</span></td>
                    <td className="p-3 text-stone-600">Partner accepts an incoming dispatched job from the 30s alert.</td>
                  </tr>
                  <tr className="hover:bg-stone-50">
                    <td className="p-3 font-mono font-bold text-emerald-700">POST</td>
                    <td className="p-3 font-mono font-bold">/api/partner/jobs/:jobId/start</td>
                    <td className="p-3"><span className="px-2 py-0.5 rounded text-[10px] bg-emerald-100 text-emerald-800 font-bold">Partner</span></td>
                    <td className="p-3 text-stone-600">Verifies Start OTP and sets booking status to in_progress.</td>
                  </tr>
                  <tr className="hover:bg-stone-50">
                    <td className="p-3 font-mono font-bold text-emerald-700">POST</td>
                    <td className="p-3 font-mono font-bold">/api/partner/jobs/:jobId/complete</td>
                    <td className="p-3"><span className="px-2 py-0.5 rounded text-[10px] bg-emerald-100 text-emerald-800 font-bold">Partner</span></td>
                    <td className="p-3 text-stone-600">Marks job completed and automatically credits 85% share to wallet.</td>
                  </tr>
                  <tr className="hover:bg-stone-50">
                    <td className="p-3 font-mono font-bold text-emerald-700">POST</td>
                    <td className="p-3 font-mono font-bold">/api/bookings</td>
                    <td className="p-3"><span className="px-2 py-0.5 rounded text-[10px] bg-sky-100 text-sky-800 font-bold">Customer</span></td>
                    <td className="p-3 text-stone-600">Creates new customer booking and triggers partner dispatch radar.</td>
                  </tr>
                  <tr className="hover:bg-stone-50">
                    <td className="p-3 font-mono font-bold text-sky-700">GET</td>
                    <td className="p-3 font-mono font-bold">/api/providers</td>
                    <td className="p-3"><span className="px-2 py-0.5 rounded text-[10px] bg-stone-100 text-stone-800 font-bold">Admin/Both</span></td>
                    <td className="p-3 text-stone-600">List all partners, filter by status or verification status.</td>
                  </tr>
                  <tr className="hover:bg-stone-50 bg-red-50/30">
                    <td className="p-3 font-mono font-bold text-sky-700">GET</td>
                    <td className="p-3 font-mono font-bold">/api/maintenance/plans</td>
                    <td className="p-3"><span className="px-2 py-0.5 rounded text-[10px] bg-red-100 text-red-800 font-bold">Customer</span></td>
                    <td className="p-3 text-stone-600">Fetch active catalog of Care &amp; Maintenance plans (HMC, QMC, AMC, Villa, Office).</td>
                  </tr>
                  <tr className="hover:bg-stone-50 bg-red-50/30">
                    <td className="p-3 font-mono font-bold text-emerald-700">POST</td>
                    <td className="p-3 font-mono font-bold">/api/maintenance/quote</td>
                    <td className="p-3"><span className="px-2 py-0.5 rounded text-[10px] bg-red-100 text-red-800 font-bold">Customer</span></td>
                    <td className="p-3 text-stone-600">Real-time dynamic pricing engine for custom modular maintenance contracts.</td>
                  </tr>
                  <tr className="hover:bg-stone-50 bg-red-50/30">
                    <td className="p-3 font-mono font-bold text-sky-700">GET</td>
                    <td className="p-3 font-mono font-bold">/api/maintenance/contracts</td>
                    <td className="p-3"><span className="px-2 py-0.5 rounded text-[10px] bg-red-100 text-red-800 font-bold">Both</span></td>
                    <td className="p-3 text-stone-600">Fetch customer active AMC contracts with service balances, validity &amp; renewal info.</td>
                  </tr>
                  <tr className="hover:bg-stone-50 bg-red-50/30">
                    <td className="p-3 font-mono font-bold text-emerald-700">POST</td>
                    <td className="p-3 font-mono font-bold">/api/maintenance/requests</td>
                    <td className="p-3"><span className="px-2 py-0.5 rounded text-[10px] bg-red-100 text-red-800 font-bold">Both</span></td>
                    <td className="p-3 text-stone-600">Submit new service ticket/request under contract with photo upload &amp; priority level.</td>
                  </tr>
                  <tr className="hover:bg-stone-50 bg-red-50/30">
                    <td className="p-3 font-mono font-bold text-sky-700">GET</td>
                    <td className="p-3 font-mono font-bold">/api/maintenance/assets</td>
                    <td className="p-3"><span className="px-2 py-0.5 rounded text-[10px] bg-red-100 text-red-800 font-bold">Customer</span></td>
                    <td className="p-3 text-stone-600">Asset lifecycle tracking (ACs, RO, geysers, inverters) with service history logs.</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
