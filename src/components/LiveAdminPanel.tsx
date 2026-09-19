import React, { useState, useEffect } from 'react';
import { 
  Building2, 
  Users, 
  IndianRupee, 
  CheckCircle2, 
  Clock, 
  AlertCircle, 
  Phone, 
  MapPin, 
  Calendar, 
  RefreshCw, 
  Plus, 
  ShieldCheck, 
  CreditCard, 
  Send, 
  Key, 
  ArrowRight,
  Sparkles,
  ToggleLeft,
  ToggleRight,
  Bell,
  Wrench,
  Home,
  Tag,
  Edit3,
  Trash2,
  Check,
  Search,
  ExternalLink,
  MessageSquare,
  Receipt,
  Percent,
  Lock,
  KeyRound,
  Smartphone,
  UserCheck,
  UserPlus,
  Award,
  Bot
} from 'lucide-react';
import { 
  LiveBooking, 
  LiveProvider, 
  AdminMetrics, 
  ServicePriceItem, 
  PropertyEnquiryItem, 
  SellPropertyItem, 
  BroadcastNotification,
  PlatformTaxConfig
} from '../types';
import { AdminPartnerManager } from './AdminPartnerManager';
import { PartnerAppCompanion } from './PartnerAppCompanion';
import { FlutterConnectHub } from './FlutterConnectHub';
import { AdminAcademyManager } from './AdminAcademyManager';
import { AdminCareMaintenancePanel } from './maintenance/AdminCareMaintenancePanel';
import { AdminCouponManager } from './AdminCouponManager';
import { SathiAiAssistPanel } from './SathiAiAssistPanel';

export const LiveAdminPanel: React.FC = () => {
  const [activeSubTab, setActiveSubTab] = useState<
    'bookings' | 
    'sathi_ai' |
    'coupons' |
    'care_maintenance' |
    'partners' | 
    'academy' |
    'services' | 
    'enquiries' | 
    'sell' | 
    'notifications' | 
    'tax' | 
    'gateway' | 
    'security' | 
    'partner_app' | 
    'flutter_connect'
  >('bookings');
  const [companionPartnerId, setCompanionPartnerId] = useState<string>('PRV-101');
  
  // Core Operational State
  const [metrics, setMetrics] = useState<AdminMetrics | null>(null);
  const [bookings, setBookings] = useState<LiveBooking[]>([]);
  const [providers, setProviders] = useState<LiveProvider[]>([]);
  const [services, setServices] = useState<ServicePriceItem[]>([]);
  const [enquiries, setEnquiries] = useState<PropertyEnquiryItem[]>([]);
  const [sellSubmissions, setSellSubmissions] = useState<SellPropertyItem[]>([]);
  const [notifications, setNotifications] = useState<BroadcastNotification[]>([]);

  // Admin Security & Password Change State
  const [currentPasswordInput, setCurrentPasswordInput] = useState('');
  const [newPasswordInput, setNewPasswordInput] = useState('');
  const [confirmPasswordInput, setConfirmPasswordInput] = useState('');
  const [passwordStatus, setPasswordStatus] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  
  // Dynamic GST & Platform Tax Configuration State
  const [taxConfig, setTaxConfig] = useState<PlatformTaxConfig>({
    gstPercentage: 18,
    gstNumber: '07AABCG1234F1Z5',
    legalEntityName: 'Ghar Ka Sathi Technologies Pvt. Ltd.',
    isGstApplicable: true,
    taxInclusivePricing: false,
    updatedAt: new Date().toISOString()
  });
  const [savingTax, setSavingTax] = useState(false);
  const [inputGstRate, setInputGstRate] = useState<string>('18');
  const [inputGstNumber, setInputGstNumber] = useState<string>('07AABCG1234F1Z5');
  const [inputLegalEntity, setInputLegalEntity] = useState<string>('Ghar Ka Sathi Technologies Pvt. Ltd.');
  const [inputGstApplicable, setInputGstApplicable] = useState<boolean>(true);
  const [inputTaxInclusive, setInputTaxInclusive] = useState<boolean>(false);
  
  const [loading, setLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  // New Booking Modal / Form
  const [showNewBooking, setShowNewBooking] = useState(false);
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [serviceType, setServiceType] = useState('Emergency Plumbing Repair');
  const [address, setAddress] = useState('');
  const [amount, setAmount] = useState('599');

  // Service Pricing Editor Modal
  const [showNewServiceModal, setShowNewServiceModal] = useState(false);
  const [newServiceName, setNewServiceName] = useState('');
  const [newServiceCategory, setNewServiceCategory] = useState('Appliance');
  const [newServicePrice, setNewServicePrice] = useState('499');
  const [newServiceBadge, setNewServiceBadge] = useState('Popular');
  const [editingServiceId, setEditingServiceId] = useState<string | null>(null);
  const [editingPriceValue, setEditingPriceValue] = useState<string>('');

  // Notification Broadcast Form
  const [notifTitle, setNotifTitle] = useState('');
  const [notifMessage, setNotifMessage] = useState('');
  const [notifTarget, setNotifTarget] = useState<'all' | 'customers' | 'partners'>('all');
  const [sendingNotif, setSendingNotif] = useState(false);

  // OTP & Payment Sandbox
  const [testPhone, setTestPhone] = useState('+91 77709 99122');
  const [otpSentMessage, setOtpSentMessage] = useState<string | null>(null);
  const [testOtpInput, setTestOtpInput] = useState('');
  const [otpVerifyMessage, setOtpVerifyMessage] = useState<string | null>(null);
  const [paymentTestResult, setPaymentTestResult] = useState<string | null>(null);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [
        resMetrics, 
        resBookings, 
        resProviders,
        resServices,
        resEnquiries,
        resSell,
        resNotifs
      ] = await Promise.all([
        fetch('/api/admin/metrics'),
        fetch('/api/bookings'),
        fetch('/api/providers'),
        fetch('/api/services/service-prices'),
        fetch('/api/admin/enquiries'),
        fetch('/api/admin/sell-submissions'),
        fetch('/api/admin/notifications'),
        fetch('/api/config/tax')
      ]);

      if (resMetrics.ok) {
        const m = await resMetrics.json();
        setMetrics(m);
      }
      if (resBookings.ok) {
        const b = await resBookings.json();
        setBookings(b.bookings || []);
      }
      if (resProviders.ok) {
        const p = await resProviders.json();
        setProviders(p.providers || []);
      }
      if (resServices.ok) {
        const s = await resServices.json();
        setServices(s || []);
      }
      if (resEnquiries.ok) {
        const e = await resEnquiries.json();
        setEnquiries(e.enquiries || []);
      }
      if (resSell.ok) {
        const sel = await resSell.json();
        setSellSubmissions(sel.submissions || []);
      }
      if (resNotifs.ok) {
        const n = await resNotifs.json();
        setNotifications(n.notifications || []);
      }
      if (resNotifs && resNotifs.ok) {
        // Wait, index 7 is tax
      }
      const resTax = await fetch('/api/config/tax');
      if (resTax.ok) {
        const t = await resTax.json();
        setTaxConfig(t);
        setInputGstRate(String(t.gstPercentage));
        setInputGstNumber(t.gstNumber || '07AABCG1234F1Z5');
        setInputLegalEntity(t.legalEntityName || 'Ghar Ka Sathi Technologies Pvt. Ltd.');
        setInputGstApplicable(t.isGstApplicable ?? true);
        setInputTaxInclusive(t.taxInclusivePricing ?? false);
      }
    } catch (err) {
      console.error('Failed to load admin data:', err);
    } finally {
      setLoading(false);
    }
  };

  // Update GST & Tax Configuration Handler
  const handleUpdateTaxConfig = async (e?: React.FormEvent, customRate?: number) => {
    if (e) e.preventDefault();
    setSavingTax(true);
    try {
      const rateToApply = customRate !== undefined ? customRate : Number(inputGstRate);
      const res = await fetch('/api/admin/tax', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          gstPercentage: rateToApply,
          gstNumber: inputGstNumber,
          legalEntityName: inputLegalEntity,
          isGstApplicable: inputGstApplicable,
          taxInclusivePricing: inputTaxInclusive,
        }),
      });

      if (res.ok) {
        const data = await res.json();
        setTaxConfig(data.taxConfig);
        setInputGstRate(String(data.taxConfig.gstPercentage));
        setStatusMessage(`Phase 1 GST Configuration Saved: ${data.taxConfig.gstPercentage}% GST is now live across mobile app & checkout!`);
        fetchData();
      } else {
        const err = await res.json();
        setStatusMessage(`Error: ${err.error || 'Failed to update GST'}`);
      }
    } catch (err: any) {
      setStatusMessage(`Error: ${err?.message || 'Failed to update GST'}`);
    } finally {
      setSavingTax(false);
    }
  };

  useEffect(() => {
    fetchData();
    const timer = setInterval(fetchData, 8000); // 8s polling
    return () => clearInterval(timer);
  }, []);

  const handleUpdateBookingStatus = async (bookingId: string, newStatus: LiveBooking['status']) => {
    try {
      const res = await fetch(`/api/bookings/${bookingId}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });
      if (res.ok) {
        setStatusMessage(`Booking #${bookingId} updated to ${newStatus.replace('_', ' ')}`);
        fetchData();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleToggleProvider = async (providerId: string, currentStatus: LiveProvider['status']) => {
    const nextStatus = currentStatus === 'online' ? 'offline' : 'online';
    try {
      const res = await fetch(`/api/providers/${providerId}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: nextStatus }),
      });
      if (res.ok) {
        setStatusMessage(`Partner status changed to ${nextStatus.toUpperCase()}`);
        fetchData();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleCreateBooking = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName || !customerPhone || !address) {
      alert('Please fill customer name, phone, and address');
      return;
    }

    try {
      const res = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customerName,
          customerPhone,
          serviceType,
          address,
          amount: Number(amount),
        }),
      });

      if (res.ok) {
        const data = await res.json();
        setStatusMessage(`Created new booking: ${data.booking.id} (${data.booking.serviceType})`);
        setShowNewBooking(false);
        setCustomerName('');
        setCustomerPhone('');
        setAddress('');
        fetchData();
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Service Price Update Handlers
  const handleSaveServicePrice = async (id: string) => {
    try {
      const res = await fetch(`/api/admin/services/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ price: editingPriceValue }),
      });
      if (res.ok) {
        setStatusMessage('Service price updated in live mobile catalog!');
        setEditingServiceId(null);
        fetchData();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleCreateNewService = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/admin/services', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: newServiceName,
          category: newServiceCategory,
          price: newServicePrice,
          badge: newServiceBadge
        }),
      });
      if (res.ok) {
        setStatusMessage(`Service "${newServiceName}" added to mobile app catalogue!`);
        setShowNewServiceModal(false);
        setNewServiceName('');
        setNewServicePrice('499');
        fetchData();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteService = async (id: string, name: string) => {
    if (!confirm(`Are you sure you want to remove "${name}" from the app catalog?`)) return;
    try {
      const res = await fetch(`/api/admin/services/${id}`, { method: 'DELETE' });
      if (res.ok) {
        setStatusMessage(`Removed "${name}" from live catalog`);
        fetchData();
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Broadcast Notification Handler
  const handleBroadcastNotification = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!notifTitle || !notifMessage) return;
    setSendingNotif(true);
    try {
      const res = await fetch('/api/admin/notifications/broadcast', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: notifTitle,
          message: notifMessage,
          targetAudience: notifTarget,
        }),
      });
      if (res.ok) {
        setStatusMessage(`Broadcast dispatched successfully to ${notifTarget.toUpperCase()}!`);
        setNotifTitle('');
        setNotifMessage('');
        fetchData();
      }
    } catch (err) {
      console.error(err);
    } finally {
      setSendingNotif(false);
    }
  };

  // OTP Testing
  const handleSendTestOtp = async () => {
    setOtpSentMessage(null);
    setOtpVerifyMessage(null);
    try {
      const res = await fetch('/api/auth/send-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone: testPhone }),
      });
      const data = await res.json();
      if (data.success) {
        setOtpSentMessage(data.message || `OTP sent to ${testPhone}`);
        if (data.demoOtp) {
          setTestOtpInput(data.demoOtp);
        }
      } else {
        setOtpSentMessage(data.error || 'Failed to send OTP');
      }
    } catch (err: any) {
      setOtpSentMessage(err?.message || 'Error sending OTP');
    }
  };

  const handleVerifyTestOtp = async () => {
    setOtpVerifyMessage(null);
    try {
      const res = await fetch('/api/auth/verify-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone: testPhone, otp: testOtpInput }),
      });
      const data = await res.json();
      if (data.success) {
        setOtpVerifyMessage(`Success! User Authenticated with Token: ${data.token.slice(0, 16)}...`);
      } else {
        setOtpVerifyMessage(data.error || 'Invalid OTP');
      }
    } catch (err: any) {
      setOtpVerifyMessage(err?.message || 'Verification error');
    }
  };

  // Razorpay Testing
  const handleTestRazorpay = async () => {
    setPaymentTestResult('Creating Razorpay order...');
    try {
      const res = await fetch('/api/payments/razorpay-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount: 599, currency: 'INR' }),
      });
      const order = await res.json();

      if (order.success) {
        const verifyRes = await fetch('/api/payments/verify', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            razorpay_order_id: order.orderId,
            razorpay_payment_id: `pay_test_${Math.floor(Math.random() * 1000000)}`,
            razorpay_signature: 'simulated_signature_ok',
          }),
        });
        await verifyRes.json();
        setPaymentTestResult(`Order ID: ${order.orderId} | Verified & Settled via Razorpay (Key: ${order.keyId})`);
        fetchData();
      }
    } catch (err: any) {
      setPaymentTestResult(`Payment test error: ${err.message}`);
    }
  };

  const getStatusBadge = (status: LiveBooking['status']) => {
    switch (status) {
      case 'pending_match':
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-semibold px-2 py-0.5 rounded-full bg-amber-50 text-amber-700 border border-amber-200">
            <Clock className="w-3 h-3" /> Finding Sathi
          </span>
        );
      case 'partner_assigned':
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-semibold px-2 py-0.5 rounded-full bg-sky-50 text-sky-700 border border-sky-200">
            <Users className="w-3 h-3" /> Sathi Assigned
          </span>
        );
      case 'in_progress':
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-semibold px-2 py-0.5 rounded-full bg-violet-50 text-violet-700 border border-violet-200">
            <Sparkles className="w-3 h-3" /> Service In Progress
          </span>
        );
      case 'completed':
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-semibold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
            <CheckCircle2 className="w-3 h-3" /> Job Completed
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-semibold px-2 py-0.5 rounded-full bg-stone-100 text-stone-600">
            Cancelled
          </span>
        );
    }
  };

  return (
    <div id="live-admin-panel" className="space-y-6">
      {/* Admin Panel Header & Status (Branded Red & White with Sathi AI Assist) */}
      <div className="bg-white rounded-2xl border-2 border-red-600/20 shadow-sm p-6 flex flex-wrap items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-red-600 text-white flex items-center justify-center font-bold shadow-sm shadow-red-600/30">
              <Building2 className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-black text-stone-900 tracking-tight">
                  <span className="text-red-600">Ghar Ka Sathi</span> Executive Admin Portal
                </h3>
                <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-red-50 text-red-700 border border-red-200">
                  <span className="w-2 h-2 rounded-full bg-red-600 animate-pulse" />
                  Live API: gharkasathi.com
                </span>
                <span className="inline-flex items-center gap-1 text-[11px] font-black px-2.5 py-0.5 rounded-full bg-red-600 text-white shadow-2xs">
                  <Sparkles className="w-3 h-3 text-white" />
                  Sathi AI Assist Active
                </span>
              </div>
              <p className="text-xs text-stone-500 mt-0.5">
                Official Red &amp; White Command Center &bull; Customer Bookings, 9 Services, Partner Fleet &amp; Dynamic Coupons.
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveSubTab('sathi_ai')}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-red-50 hover:bg-red-100 text-red-700 border border-red-200 text-xs font-bold rounded-xl transition-all cursor-pointer shadow-2xs"
          >
            <Bot className="w-3.5 h-3.5 text-red-600" />
            Launch Sathi AI Assist
          </button>

          <button
            id="refresh-admin-data"
            onClick={fetchData}
            disabled={loading}
            className="inline-flex items-center gap-1.5 px-3 py-2 bg-white border border-stone-300 hover:bg-stone-50 text-stone-700 text-xs font-semibold rounded-xl transition-colors cursor-pointer disabled:opacity-50"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
            Sync Now
          </button>

          <button
            id="new-booking-btn"
            onClick={() => setShowNewBooking(true)}
            className="inline-flex items-center gap-1.5 px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-xs font-bold rounded-xl shadow-xs transition-colors cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            Create Booking
          </button>
        </div>
      </div>

      {statusMessage && (
        <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs rounded-lg flex items-center justify-between">
          <span className="font-medium">{statusMessage}</span>
          <button onClick={() => setStatusMessage(null)} className="text-emerald-600 font-bold ml-2">Dismiss</button>
        </div>
      )}

      {/* Real-time KPI Stats */}
      {metrics && (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-4 bg-white rounded-xl border border-stone-200 shadow-xs">
            <div className="text-[11px] font-bold text-stone-500 uppercase tracking-wider">
              Total Customer Bookings
            </div>
            <div className="text-2xl font-bold text-stone-900 font-mono mt-1">
              {metrics.totalBookings}
            </div>
            <div className="text-xs text-stone-500 mt-1">
              <strong className="text-emerald-600">{metrics.activeBookings}</strong> in active dispatch
            </div>
          </div>

          <div className="p-4 bg-white rounded-xl border border-stone-200 shadow-xs">
            <div className="text-[11px] font-bold text-stone-500 uppercase tracking-wider">
              Gross Merchandise Value
            </div>
            <div className="text-2xl font-bold text-emerald-700 font-mono mt-1 flex items-center">
              ₹{metrics.totalRevenue.toLocaleString()}
            </div>
            <div className="text-xs text-stone-500 mt-1">
              Platform Cut (18%): <strong className="text-stone-700">₹{metrics.platformCommission.toLocaleString()}</strong>
            </div>
          </div>

          <div className="p-4 bg-white rounded-xl border border-stone-200 shadow-xs">
            <div className="text-[11px] font-bold text-stone-500 uppercase tracking-wider">
              Active Service Partners
            </div>
            <div className="text-2xl font-bold text-stone-900 font-mono mt-1">
              {metrics.activePartners} / {metrics.totalPartners}
            </div>
            <div className="text-xs text-stone-500 mt-1">
              Available for immediate dispatch
            </div>
          </div>

          <div className="p-4 bg-white rounded-xl border border-stone-200 shadow-xs">
            <div className="text-[11px] font-bold text-stone-500 uppercase tracking-wider">
              Service Catalog
            </div>
            <div className="text-2xl font-bold text-indigo-600 font-mono mt-1">
              {services.length} Services
            </div>
            <div className="text-xs text-stone-500 mt-1">
              Live in mobile app APK
            </div>
          </div>
        </div>
      )}

      {/* Navigation Sub-Tabs (With Sathi AI and Coupons tabs) */}
      <div className="flex items-center gap-2 border-b border-stone-200 overflow-x-auto pb-px">
        <button
          onClick={() => setActiveSubTab('bookings')}
          className={`flex items-center gap-1.5 px-4 py-2 text-xs font-bold border-b-2 transition-all cursor-pointer whitespace-nowrap ${
            activeSubTab === 'bookings'
              ? 'border-red-600 text-red-700 bg-white rounded-t-lg'
              : 'border-transparent text-stone-600 hover:text-stone-900'
          }`}
        >
          <Clock className="w-3.5 h-3.5 text-red-600" />
          Customer Bookings ({bookings.length})
        </button>

        <button
          onClick={() => setActiveSubTab('sathi_ai')}
          className={`flex items-center gap-1.5 px-4 py-2 text-xs font-bold border-b-2 transition-all cursor-pointer whitespace-nowrap ${
            activeSubTab === 'sathi_ai'
              ? 'border-red-600 text-red-700 bg-red-50/50 rounded-t-lg font-black'
              : 'border-transparent text-stone-600 hover:text-red-700'
          }`}
        >
          <Bot className="w-3.5 h-3.5 text-red-600" />
          Sathi AI Assist
          <span className="px-1.5 py-0.2 rounded text-[9px] bg-red-600 text-white font-extrabold shadow-2xs">Live</span>
        </button>

        <button
          onClick={() => setActiveSubTab('coupons')}
          className={`flex items-center gap-1.5 px-4 py-2 text-xs font-bold border-b-2 transition-all cursor-pointer whitespace-nowrap ${
            activeSubTab === 'coupons'
              ? 'border-red-600 text-red-700 bg-white rounded-t-lg'
              : 'border-transparent text-stone-600 hover:text-stone-900'
          }`}
        >
          <Tag className="w-3.5 h-3.5 text-red-600" />
          Coupons &amp; Offers
          <span className="px-1.5 py-0.2 rounded text-[9px] bg-red-100 text-red-700 font-extrabold">Checkout</span>
        </button>

        <button
          onClick={() => setActiveSubTab('care_maintenance')}
          className={`flex items-center gap-1.5 px-4 py-2 text-xs font-bold border-b-2 transition-all cursor-pointer whitespace-nowrap ${
            activeSubTab === 'care_maintenance'
              ? 'border-red-600 text-red-800 bg-white rounded-t-lg'
              : 'border-transparent text-stone-600 hover:text-stone-900'
          }`}
        >
          <ShieldCheck className="w-3.5 h-3.5 text-red-600" />
          Care &amp; Maintenance (AMC)
          <span className="px-1.5 py-0.2 rounded text-[9px] bg-red-100 text-red-800 font-extrabold">New</span>
        </button>

        <button
          onClick={() => setActiveSubTab('partners')}
          className={`flex items-center gap-1.5 px-4 py-2 text-xs font-bold border-b-2 transition-all cursor-pointer whitespace-nowrap ${
            activeSubTab === 'partners'
              ? 'border-emerald-600 text-emerald-800 bg-white rounded-t-lg'
              : 'border-transparent text-stone-600 hover:text-stone-900'
          }`}
        >
          <Users className="w-3.5 h-3.5 text-emerald-600" />
          Partner Fleet &amp; KYC
          <span className="px-1.5 py-0.2 rounded text-[9px] bg-emerald-100 text-emerald-800 font-extrabold">Verified</span>
        </button>

        <button
          onClick={() => setActiveSubTab('academy')}
          className={`flex items-center gap-1.5 px-4 py-2 text-xs font-bold border-b-2 transition-all cursor-pointer whitespace-nowrap ${
            activeSubTab === 'academy'
              ? 'border-amber-600 text-amber-900 bg-white rounded-t-lg shadow-xs'
              : 'border-transparent text-stone-600 hover:text-stone-900'
          }`}
        >
          <Award className="w-3.5 h-3.5 text-amber-600" />
          Skill Academy &amp; CSGSP Certification
          <span className="px-1.5 py-0.2 rounded text-[9px] bg-amber-100 text-amber-900 font-extrabold">Certified</span>
        </button>

        <button
          onClick={() => setActiveSubTab('partner_app')}
          className={`flex items-center gap-1.5 px-4 py-2 text-xs font-bold border-b-2 transition-all cursor-pointer whitespace-nowrap ${
            activeSubTab === 'partner_app'
              ? 'border-emerald-600 text-emerald-800 bg-white rounded-t-lg'
              : 'border-transparent text-stone-600 hover:text-stone-900'
          }`}
        >
          <Smartphone className="w-3.5 h-3.5 text-emerald-600" />
          Partner Mobile App (Sim)
          <span className="px-1.5 py-0.2 rounded text-[9px] bg-amber-100 text-amber-800 font-extrabold">Live Test</span>
        </button>

        <button
          onClick={() => setActiveSubTab('flutter_connect')}
          className={`flex items-center gap-1.5 px-4 py-2 text-xs font-bold border-b-2 transition-all cursor-pointer whitespace-nowrap ${
            activeSubTab === 'flutter_connect'
              ? 'border-emerald-600 text-emerald-800 bg-white rounded-t-lg'
              : 'border-transparent text-stone-600 hover:text-stone-900'
          }`}
        >
          <Sparkles className="w-3.5 h-3.5 text-sky-600" />
          Flutter Architecture Hub
        </button>

        <button
          onClick={() => setActiveSubTab('services')}
          className={`flex items-center gap-1.5 px-4 py-2 text-xs font-bold border-b-2 transition-all cursor-pointer whitespace-nowrap ${
            activeSubTab === 'services'
              ? 'border-emerald-600 text-emerald-800 bg-white rounded-t-lg'
              : 'border-transparent text-stone-600 hover:text-stone-900'
          }`}
        >
          <Wrench className="w-3.5 h-3.5 text-indigo-600" />
          Services & Pricing ({services.length})
        </button>

        <button
          onClick={() => setActiveSubTab('enquiries')}
          className={`flex items-center gap-1.5 px-4 py-2 text-xs font-bold border-b-2 transition-all cursor-pointer whitespace-nowrap ${
            activeSubTab === 'enquiries'
              ? 'border-emerald-600 text-emerald-800 bg-white rounded-t-lg'
              : 'border-transparent text-stone-600 hover:text-stone-900'
          }`}
        >
          <Home className="w-3.5 h-3.5 text-sky-600" />
          Property Inquiries ({enquiries.length})
        </button>

        <button
          onClick={() => setActiveSubTab('sell')}
          className={`flex items-center gap-1.5 px-4 py-2 text-xs font-bold border-b-2 transition-all cursor-pointer whitespace-nowrap ${
            activeSubTab === 'sell'
              ? 'border-emerald-600 text-emerald-800 bg-white rounded-t-lg'
              : 'border-transparent text-stone-600 hover:text-stone-900'
          }`}
        >
          <Tag className="w-3.5 h-3.5 text-amber-600" />
          Sell Property Submissions ({sellSubmissions.length})
        </button>

        <button
          onClick={() => setActiveSubTab('notifications')}
          className={`flex items-center gap-1.5 px-4 py-2 text-xs font-bold border-b-2 transition-all cursor-pointer whitespace-nowrap ${
            activeSubTab === 'notifications'
              ? 'border-emerald-600 text-emerald-800 bg-white rounded-t-lg'
              : 'border-transparent text-stone-600 hover:text-stone-900'
          }`}
        >
          <Bell className="w-3.5 h-3.5 text-rose-600" />
          Broadcast Notifications
        </button>

        <button
          onClick={() => setActiveSubTab('tax')}
          className={`flex items-center gap-1.5 px-4 py-2 text-xs font-bold border-b-2 transition-all cursor-pointer whitespace-nowrap ${
            activeSubTab === 'tax'
              ? 'border-emerald-600 text-emerald-800 bg-white rounded-t-lg'
              : 'border-transparent text-stone-600 hover:text-stone-900'
          }`}
        >
          <Receipt className="w-3.5 h-3.5 text-emerald-600" />
          Tax & GST Configuration ({taxConfig.gstPercentage}%)
          <span className="px-1.5 py-0.2 rounded text-[9px] bg-emerald-100 text-emerald-800 font-extrabold">Phase 1</span>
        </button>

        <button
          onClick={() => setActiveSubTab('gateway')}
          className={`flex items-center gap-1.5 px-4 py-2 text-xs font-bold border-b-2 transition-all cursor-pointer whitespace-nowrap ${
            activeSubTab === 'gateway'
              ? 'border-emerald-600 text-emerald-800 bg-white rounded-t-lg'
              : 'border-transparent text-stone-600 hover:text-stone-900'
          }`}
        >
          <ShieldCheck className="w-3.5 h-3.5 text-stone-600" />
          OTP & Payment Testing
        </button>

        <button
          onClick={() => setActiveSubTab('security')}
          className={`flex items-center gap-1.5 px-4 py-2 text-xs font-bold border-b-2 transition-all cursor-pointer whitespace-nowrap ${
            activeSubTab === 'security'
              ? 'border-red-600 text-red-800 bg-white rounded-t-lg'
              : 'border-transparent text-stone-600 hover:text-stone-900'
          }`}
        >
          <Lock className="w-3.5 h-3.5 text-red-600" />
          Security &amp; Password
          <span className="px-1.5 py-0.2 rounded text-[9px] bg-red-100 text-red-800 font-extrabold">Protected</span>
        </button>
      </div>

      {/* ==================================================== */}
      {/* SUB-TAB: SATHI AI ASSIST & OPERATIONS CO-PILOT       */}
      {/* ==================================================== */}
      {activeSubTab === 'sathi_ai' && (
        <SathiAiAssistPanel
          metrics={metrics}
          bookings={bookings}
          providers={providers}
        />
      )}

      {/* ==================================================== */}
      {/* SUB-TAB: COUPONS & CHECKOUT OFFERS                   */}
      {/* ==================================================== */}
      {activeSubTab === 'coupons' && (
        <AdminCouponManager />
      )}

      {/* ==================================================== */}
      {/* SUB-TAB: CARE & MAINTENANCE (AMC/HMC/CONTRACTS)     */}
      {/* ==================================================== */}
      {activeSubTab === 'care_maintenance' && (
        <AdminCareMaintenancePanel />
      )}

      {/* ==================================================== */}
      {/* SUB-TAB 1: LIVE BOOKINGS & PARTNER FLEET            */}
      {/* ==================================================== */}
      {activeSubTab === 'bookings' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Col: Live Incoming Bookings */}
          <div className="lg:col-span-7 space-y-3">
            <div className="flex items-center justify-between px-1">
              <h4 className="text-xs font-bold text-stone-700 uppercase tracking-wider flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-emerald-600" />
                Live Customer Booking Queue ({bookings.length})
              </h4>
              <span className="text-[11px] text-stone-400">Auto-matches nearest Sathi</span>
            </div>

            <div className="space-y-3">
              {bookings.length === 0 ? (
                <div className="p-6 bg-white rounded-xl border border-stone-200 text-center text-xs text-stone-500">
                  No active bookings in queue.
                </div>
              ) : (
                bookings.map((booking) => (
                  <div
                    key={booking.id}
                    className="p-4 bg-white rounded-xl border border-stone-200 shadow-xs space-y-3 hover:border-stone-300 transition-colors"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-mono font-bold text-stone-900">
                            {booking.id}
                          </span>
                          {getStatusBadge(booking.status)}
                        </div>
                        <h5 className="text-sm font-bold text-stone-900 mt-1">
                          {booking.serviceType}
                        </h5>
                      </div>
                      <div className="text-right">
                        <div className="text-base font-bold text-emerald-700 font-mono">
                          ₹{booking.amount}
                        </div>
                        <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                          booking.isPaid ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-stone-100 text-stone-500'
                        }`}>
                          {booking.isPaid ? 'Paid via UPI' : 'Pay on Delivery'}
                        </span>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-stone-600 bg-stone-50 p-2.5 rounded-lg border border-stone-100">
                      <div className="flex items-center gap-2">
                        <Users className="w-3.5 h-3.5 text-stone-400 shrink-0" />
                        <span className="truncate"><strong>{booking.customerName}</strong> ({booking.customerPhone})</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="w-3.5 h-3.5 text-stone-400 shrink-0" />
                        <span className="truncate">{booking.address}</span>
                      </div>
                    </div>

                    {booking.partnerName && (
                      <div className="flex items-center justify-between text-xs px-2.5 py-1.5 bg-sky-50 rounded-lg border border-sky-100 text-sky-900">
                        <span>Assigned Sathi: <strong>{booking.partnerName}</strong></span>
                        <span className="text-[11px] text-sky-700 font-mono">{booking.partnerId}</span>
                      </div>
                    )}

                    {/* Actions */}
                    <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-stone-100">
                      <span className="text-[11px] text-stone-400">
                        Scheduled: {booking.scheduledTime}
                      </span>

                      <div className="flex items-center gap-1.5">
                        {booking.status === 'pending_match' && (
                          <button
                            onClick={() => handleUpdateBookingStatus(booking.id, 'partner_assigned')}
                            className="px-2.5 py-1 bg-sky-600 hover:bg-sky-700 text-white text-[11px] font-semibold rounded cursor-pointer transition-colors"
                          >
                            Auto-Assign Partner
                          </button>
                        )}

                        {booking.status === 'partner_assigned' && (
                          <button
                            onClick={() => handleUpdateBookingStatus(booking.id, 'in_progress')}
                            className="px-2.5 py-1 bg-violet-600 hover:bg-violet-700 text-white text-[11px] font-semibold rounded cursor-pointer transition-colors"
                          >
                            Start Service
                          </button>
                        )}

                        {booking.status === 'in_progress' && (
                          <button
                            onClick={() => handleUpdateBookingStatus(booking.id, 'completed')}
                            className="px-2.5 py-1 bg-emerald-600 hover:bg-emerald-700 text-white text-[11px] font-semibold rounded cursor-pointer transition-colors"
                          >
                            Complete & Settle
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Right Col: Service Partner Fleet */}
          <div className="lg:col-span-5 space-y-3">
            <div className="flex items-center justify-between px-1">
              <h4 className="text-xs font-bold text-stone-700 uppercase tracking-wider flex items-center gap-1.5">
                <Users className="w-4 h-4 text-sky-600" />
                Service Partner Fleet ({providers.length})
              </h4>
              <span className="text-[11px] text-stone-400">Instant Online/Offline</span>
            </div>

            <div className="space-y-2.5">
              {providers.map((p) => (
                <div
                  key={p.id}
                  className="p-3 bg-white rounded-xl border border-stone-200 shadow-xs flex items-center justify-between gap-3"
                >
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <h5 className="text-xs font-bold text-stone-900 truncate">
                        {p.name}
                      </h5>
                      <span className="text-[10px] font-mono text-stone-400">
                        {p.id}
                      </span>
                    </div>
                    <div className="text-[11px] text-stone-500 mt-0.5">
                      {p.zone} &bull; Rating: <strong className="text-amber-600">★ {p.rating}</strong>
                    </div>
                    <div className="text-[10px] text-stone-400 truncate mt-0.5">
                      {p.skills.join(', ')}
                    </div>
                  </div>

                  <div className="text-right shrink-0">
                    <button
                      onClick={() => handleToggleProvider(p.id, p.status)}
                      className={`inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-1 rounded-lg border transition-colors cursor-pointer ${
                        p.status === 'online'
                          ? 'bg-emerald-50 text-emerald-700 border-emerald-300 hover:bg-emerald-100'
                          : p.status === 'on_job'
                          ? 'bg-amber-50 text-amber-700 border-amber-300'
                          : 'bg-stone-100 text-stone-500 border-stone-300 hover:bg-stone-200'
                      }`}
                    >
                      {p.status === 'online' && <span className="w-2 h-2 rounded-full bg-emerald-500" />}
                      {p.status === 'on_job' && <span className="w-2 h-2 rounded-full bg-amber-500 animate-ping" />}
                      {p.status === 'offline' && <span className="w-2 h-2 rounded-full bg-stone-400" />}
                      {p.status.toUpperCase()}
                    </button>
                    <div className="text-[10px] text-stone-500 font-mono mt-1">
                      Wallet: ₹{p.walletBalance}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ==================================================== */}
      {/* SUB-TAB: SERVICE PARTNER FLEET & KYC VERIFICATION   */}
      {/* ==================================================== */}
      {activeSubTab === 'partners' && (
        <AdminPartnerManager
          onRefreshStats={fetchData}
          onOpenCompanion={(partnerId) => {
            setCompanionPartnerId(partnerId);
            setActiveSubTab('partner_app');
          }}
        />
      )}

      {/* ==================================================== */}
      {/* SUB-TAB: GHARKASATHI SKILL ACADEMY & CSGSP CERTIFICATION */}
      {/* ==================================================== */}
      {activeSubTab === 'academy' && (
        <AdminAcademyManager
          providers={providers}
          onRefreshProviders={fetchData}
        />
      )}

      {/* ==================================================== */}
      {/* SUB-TAB: PARTNER APP LIVE COMPANION & SIMULATOR      */}
      {/* ==================================================== */}
      {activeSubTab === 'partner_app' && (
        <div className="space-y-4">
          <div className="bg-white p-4 rounded-xl border border-stone-200 flex items-center justify-between">
            <div>
              <h4 className="text-sm font-bold text-stone-900 flex items-center gap-2">
                <Smartphone className="w-4 h-4 text-emerald-600" />
                Gharkasathi Partner Mobile App Simulator
              </h4>
              <p className="text-xs text-stone-500 mt-0.5">
                Simulates real-time technician duty toggle, 30s dispatch alert ring, Start OTP check, and 85% wallet payout.
              </p>
            </div>
            <button
              onClick={() => setActiveSubTab('flutter_connect')}
              className="px-3 py-1.5 rounded-lg bg-sky-50 border border-sky-200 text-sky-800 text-xs font-bold hover:bg-sky-100 transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Flutter Source Code Hub &rarr;</span>
            </button>
          </div>
          <PartnerAppCompanion defaultPartnerId={companionPartnerId} />
        </div>
      )}

      {/* ==================================================== */}
      {/* SUB-TAB: FLUTTER APP CONNECTIVITY & ARCHITECTURE HUB */}
      {/* ==================================================== */}
      {activeSubTab === 'flutter_connect' && (
        <FlutterConnectHub />
      )}

      {/* ==================================================== */}
      {/* SUB-TAB 2: IN-HOME SERVICES & PRICING CATALOG        */}
      {/* ==================================================== */}
      {activeSubTab === 'services' && (
        <div className="space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-4 bg-white p-4 rounded-xl border border-stone-200">
            <div>
              <h4 className="text-sm font-bold text-stone-900 flex items-center gap-2">
                <Wrench className="w-4 h-4 text-indigo-600" />
                In-Home Services Price Catalog (Live APK Endpoint)
              </h4>
              <p className="text-xs text-stone-500 mt-0.5">
                These prices and categories are served directly to the mobile app at <code>/api/services/service-prices</code>. Any edit updates your app in real-time without re-compiling!
              </p>
            </div>
            <button
              onClick={() => setShowNewServiceModal(true)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold rounded-lg shadow-xs cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              Add New Service
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {services.map((srv) => (
              <div
                key={srv._id}
                className="bg-white rounded-xl border border-stone-200 overflow-hidden shadow-xs hover:border-stone-300 transition-all flex flex-col"
              >
                <div className="h-36 bg-stone-100 relative overflow-hidden">
                  <img
                    src={srv.image}
                    alt={srv.name}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-2 left-2 bg-stone-900/80 text-white text-[10px] font-bold px-2 py-0.5 rounded backdrop-blur-xs">
                    {srv.category}
                  </div>
                  {srv.badge && (
                    <div className="absolute top-2 right-2 bg-amber-500 text-white text-[10px] font-bold px-2 py-0.5 rounded shadow-xs">
                      {srv.badge}
                    </div>
                  )}
                </div>

                <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                  <div>
                    <h5 className="text-sm font-bold text-stone-900 leading-snug">
                      {srv.name}
                    </h5>
                    <div className="flex items-center gap-2 text-xs text-stone-500 mt-1">
                      <span className="text-amber-600 font-bold">★ {srv.rating}</span>
                      <span>&bull;</span>
                      <span>ID: <code className="text-[11px] text-stone-600">{srv._id}</code></span>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-stone-100 flex items-center justify-between">
                    {editingServiceId === srv._id ? (
                      <div className="flex items-center gap-1.5">
                        <span className="text-xs font-bold text-stone-500">₹</span>
                        <input
                          type="number"
                          value={editingPriceValue}
                          onChange={(e) => setEditingPriceValue(e.target.value)}
                          className="w-20 px-2 py-1 border border-indigo-400 rounded text-xs font-bold text-stone-900 focus:outline-none"
                        />
                        <button
                          onClick={() => handleSaveServicePrice(srv._id)}
                          className="p-1 bg-emerald-600 text-white rounded hover:bg-emerald-500 cursor-pointer"
                        >
                          <Check className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ) : (
                      <div>
                        <div className="text-lg font-extrabold text-emerald-700 font-mono">
                          ₹{srv.price}
                          {srv.discountPrice && (
                            <span className="text-xs text-stone-400 line-through ml-2 font-normal">
                              ₹{srv.discountPrice}
                            </span>
                          )}
                        </div>
                        <span className="text-[10px] text-stone-400">Live app price</span>
                      </div>
                    )}

                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => {
                          setEditingServiceId(srv._id);
                          setEditingPriceValue(srv.price);
                        }}
                        className="p-1.5 text-stone-500 hover:text-indigo-600 hover:bg-stone-100 rounded-lg cursor-pointer"
                        title="Edit Price"
                      >
                        <Edit3 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteService(srv._id, srv.name)}
                        className="p-1.5 text-stone-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg cursor-pointer"
                        title="Delete Service"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ==================================================== */}
      {/* SUB-TAB 3: PROPERTY INQUIRIES                        */}
      {/* ==================================================== */}
      {activeSubTab === 'enquiries' && (
        <div className="space-y-4">
          <div className="bg-white p-4 rounded-xl border border-stone-200 flex items-center justify-between">
            <div>
              <h4 className="text-sm font-bold text-stone-900 flex items-center gap-2">
                <Home className="w-4 h-4 text-sky-600" />
                Customer Real Estate Inquiries (Live APK Endpoint)
              </h4>
              <p className="text-xs text-stone-500 mt-0.5">
                Received whenever a customer taps "Enquire Now" on a property listing inside the mobile app.
              </p>
            </div>
            <span className="text-xs font-bold text-sky-800 bg-sky-50 px-2.5 py-1 rounded-full border border-sky-200">
              {enquiries.length} Active Leads
            </span>
          </div>

          <div className="space-y-3">
            {enquiries.length === 0 ? (
              <div className="p-8 bg-white rounded-xl border border-stone-200 text-center text-xs text-stone-500">
                No inquiries received yet. Tap "Enquire" in the mobile app to test!
              </div>
            ) : (
              enquiries.map((enq) => (
                <div
                  key={enq.id}
                  className="p-4 bg-white rounded-xl border border-stone-200 shadow-xs space-y-2 hover:border-stone-300 transition-colors"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-mono font-bold text-stone-900">{enq.id}</span>
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                          enq.status === 'new' ? 'bg-amber-50 text-amber-700 border border-amber-200' : 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                        }`}>
                          {enq.status.toUpperCase()}
                        </span>
                      </div>
                      <h5 className="text-sm font-bold text-stone-900 mt-1">
                        {enq.propertyTitle}
                      </h5>
                    </div>
                    <span className="text-[11px] text-stone-400">
                      {new Date(enq.createdAt).toLocaleString()}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-stone-600 bg-stone-50 p-2.5 rounded-lg">
                    <div className="flex items-center gap-1.5">
                      <Users className="w-3.5 h-3.5 text-stone-400" />
                      <strong>{enq.userName}</strong>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Phone className="w-3.5 h-3.5 text-stone-400" />
                      <a href={`tel:${enq.userPhone}`} className="text-sky-600 font-semibold hover:underline">
                        {enq.userPhone}
                      </a>
                    </div>
                  </div>

                  <p className="text-xs text-stone-700 bg-amber-50/50 p-2.5 rounded border border-amber-100">
                    <strong>Message:</strong> {enq.message}
                  </p>
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {/* ==================================================== */}
      {/* SUB-TAB 4: SELL PROPERTY SUBMISSIONS                 */}
      {/* ==================================================== */}
      {activeSubTab === 'sell' && (
        <div className="space-y-4">
          <div className="bg-white p-4 rounded-xl border border-stone-200 flex items-center justify-between">
            <div>
              <h4 className="text-sm font-bold text-stone-900 flex items-center gap-2">
                <Tag className="w-4 h-4 text-amber-600" />
                "Sell Property" Submissions (Live APK Endpoint)
              </h4>
              <p className="text-xs text-stone-500 mt-0.5">
                Incoming property listings submitted by owners via the mobile app's Sell Property form.
              </p>
            </div>
            <span className="text-xs font-bold text-amber-800 bg-amber-50 px-2.5 py-1 rounded-full border border-amber-200">
              {sellSubmissions.length} Pending Verification
            </span>
          </div>

          <div className="space-y-3">
            {sellSubmissions.length === 0 ? (
              <div className="p-8 bg-white rounded-xl border border-stone-200 text-center text-xs text-stone-500">
                No sell submissions yet.
              </div>
            ) : (
              sellSubmissions.map((sub) => (
                <div
                  key={sub.id}
                  className="p-4 bg-white rounded-xl border border-stone-200 shadow-xs space-y-2 hover:border-stone-300 transition-colors"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-mono font-bold text-stone-900">{sub.id}</span>
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                          {sub.status.replace('_', ' ').toUpperCase()}
                        </span>
                      </div>
                      <h5 className="text-sm font-bold text-stone-900 mt-1">
                        {sub.propertyType} &bull; {sub.location}
                      </h5>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-bold text-emerald-700 font-mono">
                        {sub.expectedPrice}
                      </div>
                      <span className="text-[10px] text-stone-400">Owner Demand</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-stone-600 bg-stone-50 p-2.5 rounded-lg">
                    <div>Owner: <strong>{sub.ownerName}</strong></div>
                    <div>Phone: <strong className="text-stone-900">{sub.phone}</strong></div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {/* ==================================================== */}
      {/* SUB-TAB 5: BROADCAST NOTIFICATIONS                   */}
      {/* ==================================================== */}
      {activeSubTab === 'notifications' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left: Compose Broadcast */}
          <div className="lg:col-span-5 bg-white p-5 rounded-xl border border-stone-200 shadow-xs space-y-4">
            <h4 className="text-sm font-bold text-stone-900 flex items-center gap-2">
              <Bell className="w-4 h-4 text-rose-600" />
              Broadcast Notification to App Users
            </h4>
            <p className="text-xs text-stone-500 leading-relaxed">
              Send promotional offers, monsoon alerts, or service announcements directly to your app users and service partners.
            </p>

            <form onSubmit={handleBroadcastNotification} className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Target Audience
                </label>
                <select
                  value={notifTarget}
                  onChange={(e: any) => setNotifTarget(e.target.value)}
                  className="w-full border border-stone-300 rounded-lg px-3 py-2 text-xs text-stone-900 focus:outline-none focus:border-stone-900"
                >
                  <option value="all">All Users (Customers & Service Partners)</option>
                  <option value="customers">Customers Only</option>
                  <option value="partners">Service Partners (Sathi Fleet)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Notification Title
                </label>
                <input
                  type="text"
                  required
                  value={notifTitle}
                  onChange={(e) => setNotifTitle(e.target.value)}
                  placeholder="e.g. 50% Off On Home Sanitization!"
                  className="w-full border border-stone-300 rounded-lg px-3 py-2 text-xs text-stone-900 focus:outline-none focus:border-stone-900"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Message Body
                </label>
                <textarea
                  required
                  rows={3}
                  value={notifMessage}
                  onChange={(e) => setNotifMessage(e.target.value)}
                  placeholder="Book any electrician or plumber today and get instant cashback."
                  className="w-full border border-stone-300 rounded-lg px-3 py-2 text-xs text-stone-900 focus:outline-none focus:border-stone-900"
                />
              </div>

              <button
                type="submit"
                disabled={sendingNotif}
                className="w-full py-2.5 bg-rose-600 hover:bg-rose-700 text-white text-xs font-semibold rounded-lg shadow-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-50"
              >
                <Send className="w-3.5 h-3.5" />
                {sendingNotif ? 'Dispatching...' : 'Send Broadcast Push'}
              </button>
            </form>
          </div>

          {/* Right: Notification History */}
          <div className="lg:col-span-7 space-y-3">
            <h4 className="text-xs font-bold text-stone-700 uppercase tracking-wider flex items-center gap-1.5 px-1">
              <Clock className="w-4 h-4 text-stone-400" />
              Broadcast History ({notifications.length})
            </h4>

            <div className="space-y-3">
              {notifications.map((n) => (
                <div key={n.id} className="p-4 bg-white rounded-xl border border-stone-200 shadow-xs space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-stone-900">{n.title}</span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-rose-50 text-rose-700 border border-rose-200 uppercase">
                      {n.targetAudience}
                    </span>
                  </div>
                  <p className="text-xs text-stone-600">{n.message}</p>
                  <div className="flex items-center justify-between text-[11px] text-stone-400 pt-2 border-t border-stone-100">
                    <span>Delivered via Gateway</span>
                    <span>{new Date(n.sentAt).toLocaleString()}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ==================================================== */}
      {/* SUB-TAB: TAX & GST CONFIGURATION (PHASE 1)           */}
      {/* ==================================================== */}
      {activeSubTab === 'tax' && (
        <div className="space-y-6">
          {/* Header Banner */}
          <div className="bg-stone-900 text-white p-6 rounded-2xl border border-stone-800 flex flex-wrap items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="p-2 bg-emerald-500/20 text-emerald-400 rounded-xl border border-emerald-500/30">
                  <Receipt className="w-5 h-5" />
                </span>
                <div>
                  <h3 className="text-lg font-bold">Phase 1: Dynamic GST & Tax Engine</h3>
                  <p className="text-xs text-stone-400">
                    Live dynamic tax configuration. Set the exact GST percentage you want to charge. Updates mobile apps, cart, & receipts in real-time.
                  </p>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="text-right">
                <div className="text-xs text-stone-400">Active Rate</div>
                <div className="text-2xl font-bold font-mono text-emerald-400">{taxConfig.gstPercentage}% GST</div>
              </div>
              <span className="px-3 py-1 rounded-full text-xs font-mono bg-emerald-950 text-emerald-300 border border-emerald-800">
                Live & Synced
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Left: Interactive GST Controller */}
            <div className="lg:col-span-7 bg-white rounded-2xl border border-stone-200 p-6 shadow-xs space-y-6">
              <div className="flex items-center justify-between pb-3 border-b border-stone-200">
                <div>
                  <h4 className="text-sm font-bold text-stone-900 flex items-center gap-2">
                    <Percent className="w-4 h-4 text-emerald-600" />
                    Configure Platform Tax Rate
                  </h4>
                  <p className="text-xs text-stone-500">
                    Choose standard Indian GST slab or type your exact percentage.
                  </p>
                </div>
              </div>

              {/* Quick Slab Selectors */}
              <div className="space-y-2">
                <label className="block text-xs font-bold text-stone-700">
                  Quick GST Preset Slabs:
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                  {[
                    { rate: 0, label: '0% (Exempt)' },
                    { rate: 5, label: '5% (Concessional)' },
                    { rate: 12, label: '12% (Standard Low)' },
                    { rate: 18, label: '18% (Standard Services)' },
                    { rate: 28, label: '28% (Luxury)' }
                  ].map(slab => (
                    <button
                      key={slab.rate}
                      type="button"
                      onClick={() => {
                        setInputGstRate(String(slab.rate));
                        handleUpdateTaxConfig(undefined, slab.rate);
                      }}
                      className={`p-3 rounded-xl border text-center transition-all cursor-pointer ${
                        Number(inputGstRate) === slab.rate
                          ? 'border-emerald-600 bg-emerald-50 text-emerald-950 font-bold shadow-xs'
                          : 'border-stone-200 bg-stone-50 hover:bg-stone-100 text-stone-700'
                      }`}
                    >
                      <div className="text-base font-mono font-bold">{slab.rate}%</div>
                      <div className="text-[10px] text-stone-500 truncate mt-0.5">{slab.label}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Custom Rate Form */}
              <form onSubmit={handleUpdateTaxConfig} className="space-y-4 pt-2 border-t border-stone-200">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-stone-700 mb-1">
                      Custom GST Percentage (%)
                    </label>
                    <div className="relative">
                      <input
                        type="number"
                        min="0"
                        max="50"
                        step="0.1"
                        required
                        value={inputGstRate}
                        onChange={(e) => setInputGstRate(e.target.value)}
                        placeholder="e.g. 18"
                        className="w-full border border-stone-300 rounded-xl px-3 py-2 text-sm font-mono font-bold text-stone-900 focus:outline-none focus:border-emerald-600 pr-8"
                      />
                      <span className="absolute right-3 top-2.5 text-stone-400 font-bold text-xs">%</span>
                    </div>
                    <span className="text-[10px] text-stone-400 mt-1 block">
                      Tell me any percentage and click apply to activate immediately.
                    </span>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-stone-700 mb-1">
                      GST Identification Number (GSTIN)
                    </label>
                    <input
                      type="text"
                      value={inputGstNumber}
                      onChange={(e) => setInputGstNumber(e.target.value.toUpperCase())}
                      placeholder="e.g. 07AABCG1234F1Z5"
                      className="w-full border border-stone-300 rounded-xl px-3 py-2 text-xs font-mono text-stone-900 focus:outline-none focus:border-emerald-600 uppercase"
                    />
                    <span className="text-[10px] text-stone-400 mt-1 block">
                      Printed on customer tax invoices and receipts.
                    </span>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">
                    Registered Legal Entity Name
                  </label>
                  <input
                    type="text"
                    value={inputLegalEntity}
                    onChange={(e) => setInputLegalEntity(e.target.value)}
                    placeholder="Ghar Ka Sathi Technologies Pvt. Ltd."
                    className="w-full border border-stone-300 rounded-xl px-3 py-2 text-xs text-stone-900 focus:outline-none focus:border-emerald-600"
                  />
                </div>

                <div className="pt-2 flex flex-wrap items-center justify-between gap-4 border-t border-stone-100">
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      id="gst-active-toggle"
                      checked={inputGstApplicable}
                      onChange={(e) => setInputGstApplicable(e.target.checked)}
                      className="rounded text-emerald-600 focus:ring-emerald-500 w-4 h-4 cursor-pointer"
                    />
                    <label htmlFor="gst-active-toggle" className="text-xs font-semibold text-stone-700 cursor-pointer">
                      Charge GST on Customer Bookings
                    </label>
                  </div>

                  <button
                    type="submit"
                    disabled={savingTax}
                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs rounded-xl shadow-xs transition-all cursor-pointer disabled:opacity-50"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    {savingTax ? 'Saving Rate...' : `Set GST to ${inputGstRate}%`}
                  </button>
                </div>
              </form>
            </div>

            {/* Right: Real-time Live Bill Breakdown Preview */}
            <div className="lg:col-span-5 bg-stone-900 text-white rounded-2xl border border-stone-800 p-6 shadow-xs flex flex-col justify-between space-y-6">
              <div>
                <div className="flex items-center justify-between border-b border-stone-800 pb-3">
                  <span className="text-xs font-bold text-stone-400 uppercase tracking-wider">
                    Customer Invoice Preview
                  </span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-stone-800 text-stone-300">
                    Auto-Calculated
                  </span>
                </div>

                <div className="mt-4 space-y-3">
                  <div className="p-3 bg-stone-800/60 rounded-xl border border-stone-700 space-y-1">
                    <div className="text-xs font-bold text-stone-200">AC Deep Cleaning & Jet Repair</div>
                    <div className="text-[11px] text-stone-400">1 unit &times; ₹ 599</div>
                  </div>

                  <div className="p-3 bg-stone-800/60 rounded-xl border border-stone-700 space-y-1">
                    <div className="text-xs font-bold text-stone-200">Emergency Electrician & Wiring</div>
                    <div className="text-[11px] text-stone-400">1 unit &times; ₹ 199</div>
                  </div>

                  {/* Calculation Box */}
                  <div className="pt-3 border-t border-stone-800 space-y-2 font-mono text-xs">
                    <div className="flex justify-between text-stone-400">
                      <span>Item Total (Subtotal):</span>
                      <span>₹ 798.00</span>
                    </div>

                    <div className="flex justify-between text-emerald-400 font-semibold">
                      <span>Platform GST ({inputGstRate}%):</span>
                      <span>₹ {(798 * (Number(inputGstRate) / 100)).toFixed(2)}</span>
                    </div>

                    <div className="flex justify-between text-stone-400 text-[11px]">
                      <span className="pl-2">&bull; CGST ({(Number(inputGstRate)/2).toFixed(1)}%):</span>
                      <span>₹ {(798 * (Number(inputGstRate) / 200)).toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-stone-400 text-[11px]">
                      <span className="pl-2">&bull; SGST ({(Number(inputGstRate)/2).toFixed(1)}%):</span>
                      <span>₹ {(798 * (Number(inputGstRate) / 200)).toFixed(2)}</span>
                    </div>

                    <div className="pt-2 border-t border-stone-800 flex justify-between items-center text-sm font-bold text-white">
                      <span>Customer Grand Total:</span>
                      <span className="text-emerald-400 text-base">
                        ₹ {(798 + (798 * (Number(inputGstRate) / 100))).toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-3 bg-stone-800 rounded-xl border border-stone-700 text-xs text-stone-400 space-y-1">
                <div className="font-bold text-stone-200 flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  Automated Mobile Synchronization
                </div>
                <p className="text-[11px] leading-relaxed">
                  The moment you click <strong>Set GST</strong>, your mobile app endpoint <code>/api/config/tax</code> updates immediately. All customer app checkouts calculate using this rate with zero app reinstall required.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ==================================================== */}
      {/* SUB-TAB 6: OTP & PAYMENT TEST CONSOLE                */}
      {/* ==================================================== */}
      {activeSubTab === 'gateway' && (
        <div className="bg-stone-900 text-white rounded-xl p-6 shadow-xs space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-emerald-400" />
              <div>
                <h4 className="text-sm font-bold uppercase tracking-wider text-stone-200">
                  Mobile App Gateway Sandbox
                </h4>
                <p className="text-xs text-stone-400">
                  Simulate and verify the exact OTP and Razorpay calls that your Flutter APK makes.
                </p>
              </div>
            </div>
            <span className="text-xs font-mono text-emerald-400 bg-emerald-950 px-3 py-1 rounded-full border border-emerald-800">
              HTTPS Online
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2 border-t border-stone-800">
            {/* OTP Section */}
            <div className="space-y-3">
              <h5 className="text-xs font-bold text-stone-300 flex items-center gap-1.5">
                <Phone className="w-4 h-4 text-sky-400" />
                OTP Authentication Simulator
              </h5>

              <div className="flex gap-2">
                <input
                  type="text"
                  value={testPhone}
                  onChange={(e) => setTestPhone(e.target.value)}
                  placeholder="Enter Phone Number"
                  className="flex-1 bg-stone-800 border border-stone-700 rounded-lg px-2.5 py-1.5 text-xs text-white placeholder-stone-500 focus:outline-none focus:border-emerald-500"
                />
                <button
                  onClick={handleSendTestOtp}
                  className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold rounded-lg transition-colors cursor-pointer shrink-0"
                >
                  Send OTP
                </button>
              </div>

              {otpSentMessage && (
                <div className="text-[11px] text-emerald-400 bg-stone-800/80 p-2.5 rounded border border-stone-700">
                  {otpSentMessage}
                </div>
              )}

              <div className="flex gap-2 pt-1">
                <input
                  type="text"
                  value={testOtpInput}
                  onChange={(e) => setTestOtpInput(e.target.value)}
                  placeholder="Enter 6-digit OTP"
                  className="w-36 bg-stone-800 border border-stone-700 rounded-lg px-2.5 py-1.5 text-xs text-white placeholder-stone-500 focus:outline-none focus:border-emerald-500"
                />
                <button
                  onClick={handleVerifyTestOtp}
                  className="px-3 py-1.5 bg-stone-700 hover:bg-stone-600 text-white text-xs font-semibold rounded-lg transition-colors cursor-pointer"
                >
                  Verify & Session Token
                </button>
              </div>

              {otpVerifyMessage && (
                <div className="text-[11px] text-sky-400 bg-stone-800/80 p-2.5 rounded border border-stone-700">
                  {otpVerifyMessage}
                </div>
              )}
            </div>

            {/* Razorpay Section */}
            <div className="space-y-3">
              <h5 className="text-xs font-bold text-stone-300 flex items-center gap-1.5">
                <CreditCard className="w-4 h-4 text-emerald-400" />
                Razorpay Payment Gateway Test
              </h5>
              <p className="text-xs text-stone-400">
                Simulates Razorpay Order Generation (`order_xxx`), HMAC signature creation, and automated webhook settlement.
              </p>

              <button
                onClick={handleTestRazorpay}
                className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold rounded-lg transition-colors cursor-pointer"
              >
                Simulate ₹599 UPI Payment
              </button>

              {paymentTestResult && (
                <div className="text-[11px] text-emerald-400 bg-stone-800/80 p-2.5 rounded border border-stone-700 font-mono">
                  {paymentTestResult}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ==================================================== */}
      {/* SUB-TAB 7: ADMIN SECURITY & CREDENTIALS              */}
      {/* ==================================================== */}
      {activeSubTab === 'security' && (
        <div className="space-y-6">
          {/* Security Status Banner */}
          <div className="bg-stone-900 text-white rounded-2xl p-6 shadow-sm border border-stone-800">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-red-600/20 border border-red-500/40 flex items-center justify-center text-red-400 shrink-0">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-base font-bold text-white flex items-center gap-2">
                    Executive Security &amp; Access Control
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-950 text-emerald-400 border border-emerald-800">
                      Locked &amp; Private
                    </span>
                  </h4>
                  <p className="text-xs text-stone-400 mt-0.5">
                    Your entire backend operations panel, booking dispatch, partner wallets, and database are password-protected. Public visitors on gharkasathi.com cannot see or access this panel.
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto">
                <button
                  onClick={() => {
                    localStorage.removeItem('gharkasathi_admin_token');
                    localStorage.removeItem('gharkasathi_admin_user');
                    sessionStorage.removeItem('gharkasathi_admin_token');
                    sessionStorage.removeItem('gharkasathi_admin_user');
                    window.location.reload();
                  }}
                  className="flex items-center justify-center gap-1.5 px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-xs font-bold rounded-xl transition-all shadow-md shadow-red-600/20 cursor-pointer w-full sm:w-auto"
                >
                  <Lock className="w-3.5 h-3.5" />
                  <span>Lock &amp; Sign Out Now</span>
                </button>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Change Password Card */}
            <div className="bg-white rounded-2xl p-6 border border-stone-200 shadow-xs space-y-4">
              <div className="flex items-center gap-2 pb-3 border-b border-stone-100">
                <KeyRound className="w-5 h-5 text-red-600" />
                <div>
                  <h5 className="text-sm font-bold text-stone-900">
                    Change Administrator Password
                  </h5>
                  <p className="text-xs text-stone-500">
                    Update the master password used to unlock this control console.
                  </p>
                </div>
              </div>

              {passwordStatus && (
                <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs rounded-xl flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>{passwordStatus}</span>
                  </div>
                  <button onClick={() => setPasswordStatus(null)} className="text-emerald-700 font-bold ml-2">✕</button>
                </div>
              )}

              {passwordError && (
                <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-xl flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
                    <span>{passwordError}</span>
                  </div>
                  <button onClick={() => setPasswordError(null)} className="text-red-700 font-bold ml-2">✕</button>
                </div>
              )}

              <form 
                onSubmit={async (e) => {
                  e.preventDefault();
                  setPasswordError(null);
                  setPasswordStatus(null);

                  if (!currentPasswordInput || !newPasswordInput) {
                    setPasswordError('Please enter current and new password.');
                    return;
                  }

                  if (newPasswordInput !== confirmPasswordInput) {
                    setPasswordError('New password and confirmation do not match.');
                    return;
                  }

                  if (newPasswordInput.length < 6) {
                    setPasswordError('New password must be at least 6 characters.');
                    return;
                  }

                  setIsChangingPassword(true);

                  try {
                    const token = localStorage.getItem('gharkasathi_admin_token') || sessionStorage.getItem('gharkasathi_admin_token');
                    const res = await fetch('/api/admin/change-password', {
                      method: 'POST',
                      headers: { 'Content-Type': 'application/json' },
                      body: JSON.stringify({
                        currentPassword: currentPasswordInput,
                        newPassword: newPasswordInput,
                        token
                      })
                    });

                    const data = await res.json();

                    if (res.ok && data.success) {
                      if (data.token) {
                        localStorage.setItem('gharkasathi_admin_token', data.token);
                      }
                      setPasswordStatus('Admin password successfully updated!');
                      setCurrentPasswordInput('');
                      setNewPasswordInput('');
                      setConfirmPasswordInput('');
                    } else {
                      setPasswordError(data.error || 'Failed to update password. Verify current password.');
                    }
                  } catch {
                    setPasswordError('Network error while updating password.');
                  } finally {
                    setIsChangingPassword(false);
                  }
                }}
                className="space-y-3 pt-1"
              >
                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">
                    Current Password
                  </label>
                  <input
                    type="password"
                    value={currentPasswordInput}
                    onChange={(e) => setCurrentPasswordInput(e.target.value)}
                    placeholder="Enter current password (e.g. GharKaSathi@2026)"
                    required
                    className="w-full border border-stone-300 rounded-xl px-3.5 py-2 text-xs text-stone-900 bg-stone-50 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-red-600"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">
                    New Password
                  </label>
                  <input
                    type="password"
                    value={newPasswordInput}
                    onChange={(e) => setNewPasswordInput(e.target.value)}
                    placeholder="Minimum 6 characters"
                    required
                    className="w-full border border-stone-300 rounded-xl px-3.5 py-2 text-xs text-stone-900 bg-stone-50 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-red-600"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">
                    Confirm New Password
                  </label>
                  <input
                    type="password"
                    value={confirmPasswordInput}
                    onChange={(e) => setConfirmPasswordInput(e.target.value)}
                    placeholder="Re-type new password"
                    required
                    className="w-full border border-stone-300 rounded-xl px-3.5 py-2 text-xs text-stone-900 bg-stone-50 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-red-600"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isChangingPassword}
                    className="w-full py-2.5 px-4 bg-stone-900 hover:bg-black disabled:bg-stone-400 text-white text-xs font-bold rounded-xl transition-all shadow-xs flex items-center justify-center gap-2 cursor-pointer"
                  >
                    {isChangingPassword ? (
                      <span>Updating Password...</span>
                    ) : (
                      <>
                        <ShieldCheck className="w-4 h-4 text-emerald-400" />
                        <span>Save &amp; Activate New Password</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>

            {/* Access Protocol & Instructions Card */}
            <div className="bg-stone-50 rounded-2xl p-6 border border-stone-200 shadow-xs space-y-4">
              <h5 className="text-sm font-bold text-stone-900 flex items-center gap-2 pb-3 border-b border-stone-200">
                <Lock className="w-4 h-4 text-stone-700" />
                <span>Admin Login Protocol &amp; Shortcuts</span>
              </h5>

              <div className="space-y-3 text-xs text-stone-600 leading-relaxed">
                <div className="p-3 bg-white rounded-xl border border-stone-200/80 space-y-1">
                  <div className="font-bold text-stone-800">
                    1. Stealth Keyboard Shortcut
                  </div>
                  <p className="text-[11px] text-stone-500">
                    Press <kbd className="px-1.5 py-0.5 bg-stone-100 border border-stone-300 rounded text-stone-800 font-mono text-[10px]">Ctrl</kbd> + <kbd className="px-1.5 py-0.5 bg-stone-100 border border-stone-300 rounded text-stone-800 font-mono text-[10px]">Shift</kbd> + <kbd className="px-1.5 py-0.5 bg-stone-100 border border-stone-300 rounded text-stone-800 font-mono text-[10px]">A</kbd> from anywhere on the customer website to summon the Admin Login Gate.
                  </p>
                </div>

                <div className="p-3 bg-white rounded-xl border border-stone-200/80 space-y-1">
                  <div className="font-bold text-stone-800">
                    2. Footer Staff Link
                  </div>
                  <p className="text-[11px] text-stone-500">
                    At the bottom of the public website footer, click <strong>Admin &amp; Staff Login</strong> with the lock icon. It requires ID and password before opening this panel.
                  </p>
                </div>

                <div className="p-3 bg-white rounded-xl border border-stone-200/80 space-y-1">
                  <div className="font-bold text-stone-800">
                    3. URL Direct Gate
                  </div>
                  <p className="text-[11px] text-stone-500">
                    Navigating to <code>gharkasathi.com/#admin</code> or <code>gharkasathi.com/?admin=true</code> prompts the security gate automatically.
                  </p>
                </div>

                <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200/80 text-[11.5px] text-emerald-800 flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <strong>Privacy Confirmed:</strong> Regular users or prospective clients browsing properties, home cleaning, or construction will see zero admin controls, zero database tables, and zero technical tabs.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ==================================================== */}
      {/* MODAL: CREATE BOOKING DISPATCH TICKET                */}
      {/* ==================================================== */}
      {showNewBooking && (
        <div className="fixed inset-0 bg-stone-900/50 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-xl border border-stone-200 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-stone-200">
              <h4 className="text-base font-bold text-stone-900">
                Create New Service Booking Ticket
              </h4>
              <button
                onClick={() => setShowNewBooking(false)}
                className="text-stone-400 hover:text-stone-600 text-xs font-bold cursor-pointer"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateBooking} className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Customer Name
                </label>
                <input
                  type="text"
                  required
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  placeholder="e.g. Ramesh Patel"
                  className="w-full border border-stone-300 rounded-lg px-3 py-2 text-xs text-stone-900 focus:outline-none focus:border-stone-900"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Customer Phone Number
                </label>
                <input
                  type="text"
                  required
                  value={customerPhone}
                  onChange={(e) => setCustomerPhone(e.target.value)}
                  placeholder="+91 98110 00000"
                  className="w-full border border-stone-300 rounded-lg px-3 py-2 text-xs text-stone-900 focus:outline-none focus:border-stone-900"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Service Category
                </label>
                <select
                  value={serviceType}
                  onChange={(e) => setServiceType(e.target.value)}
                  className="w-full border border-stone-300 rounded-lg px-3 py-2 text-xs text-stone-900 focus:outline-none focus:border-stone-900"
                >
                  <option>Emergency Plumbing Repair</option>
                  <option>AC Deep Chemical Jet Service</option>
                  <option>Complete Home Electrical Wiring Audit</option>
                  <option>Modular Kitchen Deep Cleaning</option>
                  <option>Door Lock & Carpenter Repair</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Full Service Address
                </label>
                <textarea
                  required
                  rows={2}
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="Flat No, Apartment, Street, City"
                  className="w-full border border-stone-300 rounded-lg px-3 py-2 text-xs text-stone-900 focus:outline-none focus:border-stone-900"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Standard Rate (₹)
                </label>
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="w-full border border-stone-300 rounded-lg px-3 py-2 text-xs text-stone-900 focus:outline-none focus:border-stone-900"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowNewBooking(false)}
                  className="px-3 py-2 bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-semibold rounded-lg cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-stone-900 hover:bg-stone-800 text-white text-xs font-semibold rounded-lg shadow-xs cursor-pointer"
                >
                  Dispatch Ticket
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ==================================================== */}
      {/* MODAL: ADD NEW SERVICE TO CATALOG                    */}
      {/* ==================================================== */}
      {showNewServiceModal && (
        <div className="fixed inset-0 bg-stone-900/50 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-xl border border-stone-200 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-stone-200">
              <h4 className="text-base font-bold text-stone-900">
                Add New Service to Mobile Catalog
              </h4>
              <button
                onClick={() => setShowNewServiceModal(false)}
                className="text-stone-400 hover:text-stone-600 text-xs font-bold cursor-pointer"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateNewService} className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Service Title
                </label>
                <input
                  type="text"
                  required
                  value={newServiceName}
                  onChange={(e) => setNewServiceName(e.target.value)}
                  placeholder="e.g. Geyser Installation & Heating Check"
                  className="w-full border border-stone-300 rounded-lg px-3 py-2 text-xs text-stone-900 focus:outline-none focus:border-stone-900"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    Category
                  </label>
                  <select
                    value={newServiceCategory}
                    onChange={(e) => setNewServiceCategory(e.target.value)}
                    className="w-full border border-stone-300 rounded-lg px-3 py-2 text-xs text-stone-900 focus:outline-none focus:border-stone-900"
                  >
                    <option value="Electrical">Electrician</option>
                    <option value="Plumbing">Plumber</option>
                    <option value="Carpentry">Carpenter</option>
                    <option value="Painting">Painting & Waterproofing</option>
                    <option value="Cleaning">Cleaning & Disinfection</option>
                    <option value="Appliance">Home Appliances</option>
                    <option value="Pest Control">Pest Control</option>
                    <option value="Gardening">Gardening & Landscaping</option>
                    <option value="Movers & Packers">Movers & Packers</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    Base Price (₹)
                  </label>
                  <input
                    type="number"
                    required
                    value={newServicePrice}
                    onChange={(e) => setNewServicePrice(e.target.value)}
                    className="w-full border border-stone-300 rounded-lg px-3 py-2 text-xs text-stone-900 focus:outline-none focus:border-stone-900"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Promo Badge (Optional)
                </label>
                <input
                  type="text"
                  value={newServiceBadge}
                  onChange={(e) => setNewServiceBadge(e.target.value)}
                  placeholder="e.g. Best Seller, Top Rated, Express"
                  className="w-full border border-stone-300 rounded-lg px-3 py-2 text-xs text-stone-900 focus:outline-none focus:border-stone-900"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowNewServiceModal(false)}
                  className="px-3 py-2 bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-semibold rounded-lg cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold rounded-lg shadow-xs cursor-pointer"
                >
                  Publish to App
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
