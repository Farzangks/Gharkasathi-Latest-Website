import React, { useState, useEffect } from 'react';
import { 
  X, 
  Trash2, 
  Plus, 
  Minus, 
  Clock, 
  MapPin, 
  ShieldCheck, 
  CheckCircle2, 
  Phone, 
  Calendar,
  Sparkles,
  ArrowRight,
  Tag,
  Check,
  AlertCircle
} from 'lucide-react';
import { CartItem } from '../data/cleaningCatalog';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  onUpdateQuantity: (cartItemId: string, newQty: number) => void;
  onRemoveItem: (cartItemId: string) => void;
  onClearCart: () => void;
}

interface AvailableCoupon {
  code: string;
  title: string;
  description: string;
  discountType: 'PERCENTAGE' | 'FLAT';
  discountValue: number;
  minCartValue: number;
  maxDiscount?: number;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cart,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
}) => {
  // Slot selection mode: 'express' | 'schedule'
  const [slotType, setSlotType] = useState<'express' | 'schedule'>('express');
  
  // Custom Date & Time selection for scheduled bookings (e.g. 10 days out)
  const todayStr = new Date().toISOString().split('T')[0];
  const maxDate = new Date();
  maxDate.setDate(maxDate.getDate() + 30); // Allow booking up to 30 days ahead
  const maxDateStr = maxDate.toISOString().split('T')[0];

  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const tomorrowStr = tomorrow.toISOString().split('T')[0];

  const [bookingDate, setBookingDate] = useState<string>(tomorrowStr);
  const [bookingTimeSlot, setBookingTimeSlot] = useState<string>('10:00 AM - 12:00 PM');

  // Customer contact info
  const [address, setAddress] = useState('Flat 402, Royal Palms, Shankar Nagar, Raipur');
  const [customerName, setCustomerName] = useState('Pooja Agrawal');
  const [customerPhone, setCustomerPhone] = useState('7770999122');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Coupon state
  const [couponCode, setCouponCode] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState<{
    code: string;
    title: string;
    discountAmount: number;
  } | null>(null);
  const [couponError, setCouponError] = useState('');
  const [couponSuccess, setCouponSuccess] = useState('');
  const [isApplyingCoupon, setIsApplyingCoupon] = useState(false);
  const [availableCoupons, setAvailableCoupons] = useState<AvailableCoupon[]>([]);

  // Confirmed booking state
  const [confirmedBooking, setConfirmedBooking] = useState<{
    bookingId: string;
    technicianName: string;
    otp: string;
    slotTime: string;
    total: number;
    discount: number;
  } | null>(null);

  // Fetch available coupons from API
  useEffect(() => {
    if (!isOpen) return;
    fetch('/api/coupons')
      .then(res => res.json())
      .then(data => {
        if (data.success && Array.isArray(data.coupons)) {
          setAvailableCoupons(data.coupons);
        }
      })
      .catch(() => {
        // Fallback default coupons if server not yet started
        setAvailableCoupons([
          { code: 'FIRST100', title: 'Flat ₹100 Off', description: 'Flat ₹100 off on your first home service order', discountType: 'FLAT', discountValue: 100, minCartValue: 299 },
          { code: 'SATHI20', title: '20% Off Festive', description: 'Get 20% off up to ₹250 on all maintenance services', discountType: 'PERCENTAGE', discountValue: 20, minCartValue: 499, maxDiscount: 250 },
          { code: 'SUMMER50', title: 'Flat ₹50 Off AC & Appliances', description: 'Applicable on AC, Deep cleaning & repairs', discountType: 'FLAT', discountValue: 50, minCartValue: 199 }
        ]);
      });
  }, [isOpen]);

  if (!isOpen) return null;

  const itemTotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const totalConvenienceFee = Number((itemTotal * 0.03).toFixed(2));
  const discountAmount = appliedCoupon ? appliedCoupon.discountAmount : 0;
  const grandTotal = Math.max(0, Number((itemTotal + totalConvenienceFee - discountAmount).toFixed(2)));

  const handleApplyCoupon = async (codeToApply?: string) => {
    const code = (codeToApply || couponCode).trim().toUpperCase();
    if (!code) {
      setCouponError('Please enter a coupon code.');
      return;
    }

    setCouponError('');
    setCouponSuccess('');
    setIsApplyingCoupon(true);

    try {
      const res = await fetch('/api/coupons/apply', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code, cartTotal: itemTotal })
      });
      const data = await res.json();

      if (data.success) {
        setAppliedCoupon({
          code: data.coupon.code,
          title: data.coupon.title,
          discountAmount: data.discountAmount
        });
        setCouponCode(data.coupon.code);
        setCouponSuccess(`Coupon ${data.coupon.code} applied! Saved ₹${data.discountAmount}`);
      } else {
        setCouponError(data.message || 'Invalid coupon code or cart minimum not met.');
      }
    } catch {
      // Local fallback calculation if offline
      const found = availableCoupons.find(c => c.code.toUpperCase() === code);
      if (found) {
        if (itemTotal < found.minCartValue) {
          setCouponError(`Min order value of ₹${found.minCartValue} required for this coupon.`);
        } else {
          let disc = found.discountType === 'FLAT' 
            ? found.discountValue 
            : Math.round((itemTotal * found.discountValue) / 100);
          if (found.maxDiscount && disc > found.maxDiscount) disc = found.maxDiscount;
          disc = Math.min(disc, itemTotal);
          setAppliedCoupon({ code: found.code, title: found.title, discountAmount: disc });
          setCouponSuccess(`Applied! Saved ₹${disc}`);
        }
      } else {
        setCouponError('Coupon code not found or expired.');
      }
    } finally {
      setIsApplyingCoupon(false);
    }
  };

  const handleRemoveCoupon = () => {
    setAppliedCoupon(null);
    setCouponCode('');
    setCouponSuccess('');
    setCouponError('');
  };

  const handleCheckout = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      const bookingId = `GK-${Math.floor(100000 + Math.random() * 900000)}`;
      const otp = Math.floor(1000 + Math.random() * 9000).toString();
      
      let slotTime = 'Today (Within 30 Mins Express Dispatch)';
      if (slotType === 'schedule') {
        const formattedDate = new Date(bookingDate).toLocaleDateString('en-IN', {
          weekday: 'short',
          month: 'short',
          day: 'numeric',
          year: 'numeric'
        });
        slotTime = `${formattedDate} (${bookingTimeSlot})`;
      }

      setConfirmedBooking({
        bookingId,
        technicianName: 'Vikram Sahu (Lead Certified Gharkasathi Specialist)',
        otp,
        slotTime,
        total: grandTotal,
        discount: discountAmount
      });
      onClearCart();
    }, 900);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex justify-end animate-in fade-in duration-200">
      <div 
        className="bg-white w-full sm:max-w-md h-full flex flex-col shadow-2xl overflow-hidden animate-in slide-in-from-right duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 sm:px-6 py-4 border-b border-stone-100 bg-white">
          <div className="flex items-center gap-2">
            <h2 className="text-base font-bold text-stone-900 tracking-tight">Your Service Cart</h2>
            {cart.length > 0 && (
              <span className="px-2 py-0.5 rounded-full bg-red-100 text-red-700 text-xs font-black">
                {cart.reduce((a, b) => a + b.quantity, 0)} items
              </span>
            )}
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-500 hover:text-stone-800 flex items-center justify-center transition-colors cursor-pointer"
            title="Close"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content Body */}
        {confirmedBooking ? (
          // Success State
          <div className="flex-1 overflow-y-auto p-6 flex flex-col items-center justify-center text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center animate-bounce">
              <CheckCircle2 className="w-9 h-9" />
            </div>

            <div>
              <span className="text-[11px] font-black uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                Booking Confirmed
              </span>
              <h3 className="text-xl font-black text-stone-900 mt-2">
                Technician Dispatched!
              </h3>
              <p className="text-xs text-stone-500 mt-1">
                Booking ID: <strong className="font-mono text-stone-900">{confirmedBooking.bookingId}</strong>
              </p>
            </div>

            <div className="w-full p-4 bg-stone-50 rounded-2xl border border-stone-200 text-left space-y-2.5 text-xs">
              <div className="flex items-center justify-between pb-2 border-b border-stone-200">
                <span className="text-stone-500">Security OTP on Arrival</span>
                <span className="text-base font-black font-mono text-red-600 tracking-widest bg-red-50 px-2 py-0.5 rounded border border-red-200">
                  {confirmedBooking.otp}
                </span>
              </div>
              <div className="flex items-start justify-between">
                <span className="text-stone-500">Assigned Professional</span>
                <span className="font-bold text-stone-900 text-right">{confirmedBooking.technicianName}</span>
              </div>
              <div className="flex items-start justify-between">
                <span className="text-stone-500">Scheduled Date &amp; Slot</span>
                <span className="font-medium text-stone-900 text-right">{confirmedBooking.slotTime}</span>
              </div>
              {confirmedBooking.discount > 0 && (
                <div className="flex items-start justify-between text-emerald-700 font-semibold">
                  <span>Coupon Discount Applied</span>
                  <span>-₹{confirmedBooking.discount.toFixed(2)}</span>
                </div>
              )}
              <div className="flex items-start justify-between pt-2 border-t border-stone-200 font-bold">
                <span className="text-stone-800">Total Payable at Doorstep</span>
                <span className="text-stone-900 font-mono text-base">₹{confirmedBooking.total.toFixed(2)}</span>
              </div>
            </div>

            <div className="p-3 bg-red-50 text-red-800 text-[11px] rounded-xl border border-red-200 flex items-start gap-2 text-left">
              <ShieldCheck className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
              <span>
                Our Sathi will wear verified Gharkasathi red uniform, carry sanitized equipment, and verify OTP before beginning.
              </span>
            </div>

            <button
              onClick={() => {
                setConfirmedBooking(null);
                onClose();
              }}
              className="w-full py-3 bg-stone-900 hover:bg-black text-white rounded-xl font-bold text-xs transition-colors cursor-pointer"
            >
              Done &bull; Back to Services
            </button>
          </div>
        ) : cart.length === 0 ? (
          // Empty State
          <div className="flex-1 overflow-y-auto p-6 flex flex-col items-center justify-center text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-stone-100 text-stone-400 flex items-center justify-center">
              <Sparkles className="w-8 h-8" />
            </div>
            <div>
              <h3 className="text-base font-bold text-stone-900">Your cart is empty</h3>
              <p className="text-xs text-stone-500 mt-1 max-w-xs mx-auto">
                Explore our 9 service categories and add verified home services or maintenance packages.
              </p>
            </div>
            <button
              onClick={onClose}
              className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-xl font-bold text-xs shadow-xs transition-colors cursor-pointer"
            >
              Browse Services
            </button>
          </div>
        ) : (
          // Checkout Form
          <form onSubmit={handleCheckout} className="flex-1 flex flex-col justify-between overflow-hidden">
            <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-5">
              {/* Cart Items List */}
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-stone-800 uppercase tracking-wider text-[11px]">
                    Service Summary ({cart.length})
                  </span>
                  <button
                    type="button"
                    onClick={onClearCart}
                    className="text-stone-400 hover:text-red-600 text-[11px] font-semibold cursor-pointer"
                  >
                    Clear All
                  </button>
                </div>

                <div className="space-y-2">
                  {cart.map((item) => (
                    <div
                      key={item.id}
                      className="p-3 bg-stone-50 rounded-2xl border border-stone-200 flex items-center justify-between gap-3"
                    >
                      <div className="flex items-center gap-3">
                        <img
                          src={item.imageUrl}
                          alt={item.serviceName}
                          className="w-11 h-11 rounded-xl object-cover shrink-0 border border-stone-200"
                        />
                        <div>
                          <h4 className="text-xs font-bold text-stone-900 leading-tight">
                            {item.serviceName}
                          </h4>
                          <span className="inline-block mt-0.5 px-2 py-0.2 rounded bg-red-100 text-red-700 text-[10px] font-bold">
                            {item.optionName}
                          </span>
                          <div className="text-xs font-mono font-bold text-stone-900 mt-1">
                            ₹{item.price * item.quantity}
                          </div>
                        </div>
                      </div>

                      {/* Quantity Stepper */}
                      <div className="flex items-center gap-2">
                        <div className="flex items-center border border-stone-300 rounded-xl bg-white shadow-2xs">
                          <button
                            type="button"
                            onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                            className="w-7 h-7 flex items-center justify-center text-stone-600 hover:text-red-600 hover:bg-stone-50 rounded-l-xl transition-colors cursor-pointer"
                          >
                            <Minus className="w-3.5 h-3.5" />
                          </button>
                          <span className="w-6 text-center text-xs font-bold text-stone-900">
                            {item.quantity}
                          </span>
                          <button
                            type="button"
                            onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                            className="w-7 h-7 flex items-center justify-center text-stone-600 hover:text-red-600 hover:bg-stone-50 rounded-r-xl transition-colors cursor-pointer"
                          >
                            <Plus className="w-3.5 h-3.5" />
                          </button>
                        </div>
                        <button
                          type="button"
                          onClick={() => onRemoveItem(item.id)}
                          className="w-7 h-7 rounded-lg text-stone-400 hover:text-red-600 flex items-center justify-center transition-colors cursor-pointer"
                          title="Remove item"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* DATE & TIME SELECTION (Supports 30-Min Express or Advance Booking up to 30 Days) */}
              <div className="space-y-3 bg-stone-50/70 p-3.5 rounded-2xl border border-stone-200">
                <div className="flex items-center justify-between">
                  <label className="block text-xs font-bold text-stone-800">
                    When Do You Need The Service?
                  </label>
                  <span className="text-[10px] text-stone-500 font-semibold">Doorstep Guarantee</span>
                </div>

                {/* Toggle: Express vs Advance Booking */}
                <div className="grid grid-cols-2 gap-2 bg-stone-200/60 p-1 rounded-xl">
                  <button
                    type="button"
                    onClick={() => setSlotType('express')}
                    className={`py-1.5 px-2 rounded-lg text-xs font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                      slotType === 'express'
                        ? 'bg-red-600 text-white shadow-xs font-black'
                        : 'text-stone-700 hover:text-stone-900'
                    }`}
                  >
                    <Clock className="w-3.5 h-3.5" />
                    <span>30-Min Express</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setSlotType('schedule')}
                    className={`py-1.5 px-2 rounded-lg text-xs font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                      slotType === 'schedule'
                        ? 'bg-red-600 text-white shadow-xs font-black'
                        : 'text-stone-700 hover:text-stone-900'
                    }`}
                  >
                    <Calendar className="w-3.5 h-3.5" />
                    <span>Schedule Date &amp; Time</span>
                  </button>
                </div>

                {slotType === 'express' ? (
                  <div className="p-3 bg-white rounded-xl border border-stone-200 flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-lg bg-red-50 text-red-600 flex items-center justify-center font-bold">
                        <Clock className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-xs font-bold text-stone-900 flex items-center gap-1.5">
                          <span>Express Dispatch (30 Mins)</span>
                          <span className="text-[10px] px-1.5 py-0.2 rounded bg-emerald-600 text-white font-bold">Active</span>
                        </div>
                        <p className="text-[11px] text-stone-500">Technician dispatched immediately to your address</p>
                      </div>
                    </div>
                    <span className="text-xs font-bold text-emerald-600 font-mono">FREE</span>
                  </div>
                ) : (
                  <div className="space-y-3 pt-1 animate-in fade-in">
                    {/* Date Picker Input */}
                    <div>
                      <label className="block text-[11px] font-bold text-stone-700 mb-1">
                        Select Preferred Service Date (Book for today, next week, or up to 30 days):
                      </label>
                      <input
                        type="date"
                        min={todayStr}
                        max={maxDateStr}
                        value={bookingDate}
                        onChange={(e) => setBookingDate(e.target.value)}
                        className="w-full px-3 py-2 bg-white border border-stone-300 rounded-xl text-xs font-semibold text-stone-900 focus:outline-hidden focus:border-red-500 shadow-2xs"
                      />
                    </div>

                    {/* Time Slot Picker */}
                    <div>
                      <label className="block text-[11px] font-bold text-stone-700 mb-1.5">
                        Select Preferred Time Slot:
                      </label>
                      <div className="grid grid-cols-2 gap-2">
                        {[
                          '08:00 AM - 10:00 AM',
                          '10:00 AM - 12:00 PM',
                          '01:00 PM - 03:00 PM',
                          '03:00 PM - 05:00 PM',
                          '05:00 PM - 07:00 PM',
                          '07:00 PM - 09:00 PM'
                        ].map((slot) => (
                          <button
                            type="button"
                            key={slot}
                            onClick={() => setBookingTimeSlot(slot)}
                            className={`py-2 px-2 text-center rounded-xl border text-[11px] font-bold cursor-pointer transition-all ${
                              bookingTimeSlot === slot
                                ? 'bg-red-50 border-red-600 text-red-600 ring-1 ring-red-500'
                                : 'bg-white border-stone-200 text-stone-700 hover:border-stone-300'
                            }`}
                          >
                            {slot}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* COUPONS & OFFERS SECTION */}
              <div className="space-y-2.5 bg-stone-50/70 p-3.5 rounded-2xl border border-stone-200">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-stone-800">
                    <Tag className="w-3.5 h-3.5 text-red-600" />
                    <span>Apply Coupon &amp; Offers</span>
                  </div>
                  {appliedCoupon && (
                    <button
                      type="button"
                      onClick={handleRemoveCoupon}
                      className="text-[11px] text-red-600 font-bold hover:underline cursor-pointer"
                    >
                      Remove
                    </button>
                  )}
                </div>

                {appliedCoupon ? (
                  <div className="p-2.5 bg-emerald-50 border border-emerald-300 rounded-xl flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                      <div>
                        <div className="text-xs font-black text-emerald-800 font-mono tracking-wider">
                          {appliedCoupon.code}
                        </div>
                        <div className="text-[10px] text-emerald-700">{appliedCoupon.title}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="text-xs font-black text-emerald-700 font-mono">
                        -₹{appliedCoupon.discountAmount}
                      </span>
                    </div>
                  </div>
                ) : (
                  <div>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={couponCode}
                        onChange={(e) => {
                          setCouponCode(e.target.value.toUpperCase());
                          setCouponError('');
                        }}
                        placeholder="ENTER PROMO CODE (e.g. FIRST100)"
                        className="flex-1 px-3 py-2 bg-white border border-stone-300 rounded-xl text-xs font-mono font-bold text-stone-900 placeholder-stone-400 uppercase focus:outline-hidden focus:border-red-500"
                      />
                      <button
                        type="button"
                        onClick={() => handleApplyCoupon()}
                        disabled={isApplyingCoupon || !couponCode.trim()}
                        className="px-4 py-2 bg-stone-900 hover:bg-black disabled:opacity-50 text-white rounded-xl text-xs font-bold transition-all cursor-pointer shrink-0"
                      >
                        {isApplyingCoupon ? 'Applying...' : 'Apply'}
                      </button>
                    </div>

                    {couponError && (
                      <p className="text-[11px] text-red-600 flex items-center gap-1 mt-1.5 font-medium">
                        <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                        <span>{couponError}</span>
                      </p>
                    )}

                    {couponSuccess && (
                      <p className="text-[11px] text-emerald-600 flex items-center gap-1 mt-1.5 font-medium">
                        <Check className="w-3.5 h-3.5 shrink-0" />
                        <span>{couponSuccess}</span>
                      </p>
                    )}

                    {/* Quick Available Coupon Chips */}
                    {availableCoupons.length > 0 && (
                      <div className="pt-2 space-y-1.5">
                        <span className="text-[10px] uppercase font-bold text-stone-400 tracking-wider">
                          Tap to Apply Offer:
                        </span>
                        <div className="flex flex-wrap gap-1.5">
                          {availableCoupons.map((c) => (
                            <button
                              type="button"
                              key={c.code}
                              onClick={() => {
                                setCouponCode(c.code);
                                handleApplyCoupon(c.code);
                              }}
                              className="px-2.5 py-1 rounded-lg bg-white hover:bg-red-50 hover:border-red-300 border border-dashed border-stone-300 text-[11px] font-mono font-bold text-stone-800 transition-colors flex items-center gap-1 cursor-pointer"
                            >
                              <Tag className="w-3 h-3 text-red-600" />
                              <span>{c.code}</span>
                              <span className="text-[10px] text-emerald-600 font-sans font-semibold">
                                ({c.discountType === 'FLAT' ? `₹${c.discountValue} off` : `${c.discountValue}% off`})
                              </span>
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Service Address & Contact */}
              <div className="space-y-2">
                <label className="block text-xs font-bold text-stone-800">
                  Doorstep Delivery Address &amp; Contact
                </label>
                <div className="space-y-2">
                  <div className="relative">
                    <MapPin className="w-4 h-4 text-stone-400 absolute left-3 top-2.5" />
                    <input
                      type="text"
                      required
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      placeholder="Enter full address, landmark, city"
                      className="w-full pl-9 pr-3 py-2 bg-stone-50 border border-stone-200 rounded-xl text-xs text-stone-900 focus:outline-hidden focus:border-red-500"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="text"
                      required
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      placeholder="Your Name"
                      className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl text-xs text-stone-900 focus:outline-hidden focus:border-red-500"
                    />
                    <div className="relative">
                      <Phone className="w-3.5 h-3.5 text-stone-400 absolute left-3 top-2.5" />
                      <input
                        type="tel"
                        required
                        pattern="[0-9]{10}"
                        value={customerPhone}
                        onChange={(e) => setCustomerPhone(e.target.value)}
                        placeholder="10-digit phone"
                        className="w-full pl-8 pr-3 py-2 bg-stone-50 border border-stone-200 rounded-xl text-xs text-stone-900 focus:outline-hidden focus:border-red-500"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Price Details Summary */}
              <div className="p-4 bg-stone-50 rounded-2xl border border-stone-200/80 space-y-2 text-xs">
                <h4 className="font-bold text-stone-900 uppercase tracking-wider text-[11px]">
                  Payment Summary
                </h4>
                <div className="flex items-center justify-between text-stone-600">
                  <span>Item Total</span>
                  <span className="font-mono text-stone-900">₹{itemTotal.toFixed(2)}</span>
                </div>
                <div className="flex items-center justify-between text-stone-600">
                  <span>Convenience Fee (3%)</span>
                  <span className="font-mono text-stone-900">₹{totalConvenienceFee.toFixed(2)}</span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex items-center justify-between text-emerald-700 font-semibold">
                    <span>Offer Discount ({appliedCoupon?.code})</span>
                    <span className="font-mono">-₹{discountAmount.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex items-center justify-between text-stone-600">
                  <span>Safety &amp; Verified Professional Kit</span>
                  <span className="font-mono text-emerald-600 font-bold">FREE</span>
                </div>
                <div className="pt-2 border-t border-stone-200 flex items-center justify-between text-sm font-black">
                  <span className="text-stone-900">Total Payable</span>
                  <span className="text-stone-900 font-mono text-base">₹{grandTotal.toFixed(2)}</span>
                </div>
              </div>
            </div>

            {/* Bottom Checkout CTA */}
            <div className="p-4 border-t border-stone-100 bg-white">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 px-4 bg-red-600 hover:bg-red-700 active:bg-red-800 text-white font-bold text-sm rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-98 disabled:opacity-75"
              >
                {isSubmitting ? (
                  <span>Securing Verified Sathi &amp; OTP...</span>
                ) : (
                  <>
                    <span>
                      {slotType === 'express' ? 'Book Express' : 'Schedule Booking'} &bull; ₹{grandTotal.toFixed(2)}
                    </span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
              <div className="text-center text-[10px] text-stone-400 mt-2">
                Pay after service completion via UPI, Cash or Card. 100% Satisfaction Guarantee.
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
