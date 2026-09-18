import React, { useState } from 'react';
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
  ArrowRight
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

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cart,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
}) => {
  const [selectedSlot, setSelectedSlot] = useState<'express' | 'morning' | 'afternoon'>('express');
  const [address, setAddress] = useState('Flat 402, Royal Palms, Shankar Nagar, Raipur');
  const [customerName, setCustomerName] = useState('Pooja Agrawal');
  const [customerPhone, setCustomerPhone] = useState('7770999122');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [confirmedBooking, setConfirmedBooking] = useState<{
    bookingId: string;
    technicianName: string;
    otp: string;
    slotTime: string;
    total: number;
  } | null>(null);

  if (!isOpen) return null;

  const itemTotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const totalConvenienceFee = Number((itemTotal * 0.03).toFixed(2));
  const grandTotal = Number((itemTotal + totalConvenienceFee).toFixed(2));

  const handleCheckout = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      const bookingId = `GK-${Math.floor(100000 + Math.random() * 900000)}`;
      const otp = Math.floor(1000 + Math.random() * 9000).toString();
      const slotTime = selectedSlot === 'express' 
        ? 'Today (Within 30 Mins Express Dispatch)' 
        : selectedSlot === 'morning' 
          ? 'Tomorrow (10:00 AM - 12:00 PM)' 
          : 'Tomorrow (02:00 PM - 04:00 PM)';

      setConfirmedBooking({
        bookingId,
        technicianName: 'Vikram Sahu (Lead Certified Cleaning Specialist)',
        otp,
        slotTime,
        total: grandTotal,
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
        <div className="flex items-center justify-between px-6 py-4 border-b border-stone-100 bg-white">
          <div className="flex items-center gap-2">
            <h2 className="text-base font-bold text-stone-900 tracking-tight">Your Cleaning Cart</h2>
            {cart.length > 0 && (
              <span className="px-2 py-0.5 rounded-full bg-red-100 text-red-700 text-xs font-black">
                {cart.reduce((a, b) => a + b.quantity, 0)} items
              </span>
            )}
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-500 hover:text-stone-800 flex items-center justify-center transition-colors cursor-pointer"
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
                <span className="text-stone-500">Scheduled Slot</span>
                <span className="font-medium text-stone-900 text-right">{confirmedBooking.slotTime}</span>
              </div>
              <div className="flex items-start justify-between pt-2 border-t border-stone-200 font-bold">
                <span className="text-stone-800">Total Payable</span>
                <span className="text-stone-900 font-mono text-sm">₹{confirmedBooking.total.toFixed(2)}</span>
              </div>
            </div>

            <div className="p-3 bg-red-50 text-red-800 text-[11px] rounded-xl border border-red-200 flex items-start gap-2 text-left">
              <ShieldCheck className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
              <span>
                Our Sathi will wear verified Gharkasathi red uniform, carry sanitized German Kärcher kitbag, and verify OTP before beginning.
              </span>
            </div>

            <button
              onClick={() => {
                setConfirmedBooking(null);
                onClose();
              }}
              className="w-full py-3 bg-stone-900 hover:bg-black text-white rounded-xl font-bold text-xs transition-colors"
            >
              Done &bull; Back to Services
            </button>
          </div>
        ) : cart.length === 0 ? (
          // Empty State
          <div className="flex-1 flex flex-col items-center justify-center p-6 text-center space-y-3">
            <div className="w-16 h-16 rounded-full bg-stone-100 text-stone-400 flex items-center justify-center">
              <Sparkles className="w-8 h-8" />
            </div>
            <h3 className="text-sm font-bold text-stone-800">Your Cart is Empty</h3>
            <p className="text-xs text-stone-500 max-w-xs">
              Explore our Urban Company grade cleaning services like Sofa Shampooing, Water Tank 6-Stage, or Full Home Deep Cleaning.
            </p>
            <button
              onClick={onClose}
              className="px-4 py-2 bg-red-600 text-white rounded-xl text-xs font-bold shadow-xs hover:bg-red-700 transition-colors"
            >
              Browse Cleaning Services
            </button>
          </div>
        ) : (
          // Active Cart Items & Checkout Form
          <form onSubmit={handleCheckout} className="flex-1 flex flex-col justify-between overflow-hidden">
            <div className="flex-1 overflow-y-auto p-6 space-y-5">
              {/* Items List */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-stone-700 uppercase tracking-wider">
                    Selected Services
                  </span>
                  <button
                    type="button"
                    onClick={onClearCart}
                    className="text-[11px] text-stone-400 hover:text-red-600 transition-colors cursor-pointer"
                  >
                    Clear All
                  </button>
                </div>

                <div className="space-y-2.5">
                  {cart.map((item) => (
                    <div
                      key={item.id}
                      className="p-3.5 bg-stone-50 rounded-2xl border border-stone-200 flex items-center justify-between gap-3"
                    >
                      <div className="flex items-center gap-3">
                        <img
                          src={item.imageUrl}
                          alt={item.serviceName}
                          className="w-12 h-12 rounded-xl object-cover shrink-0 border border-stone-200"
                        />
                        <div>
                          <h4 className="text-xs font-bold text-stone-900 leading-tight">
                            {item.serviceName}
                          </h4>
                          <span className="inline-block mt-0.5 px-2 py-0.5 rounded bg-red-100 text-red-700 text-[10px] font-bold">
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
                            className="w-7 h-7 flex items-center justify-center text-stone-600 hover:text-red-600 hover:bg-stone-50 rounded-l-xl transition-colors"
                          >
                            <Minus className="w-3.5 h-3.5" />
                          </button>
                          <span className="w-6 text-center text-xs font-bold text-stone-900">
                            {item.quantity}
                          </span>
                          <button
                            type="button"
                            onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                            className="w-7 h-7 flex items-center justify-center text-stone-600 hover:text-red-600 hover:bg-stone-50 rounded-r-xl transition-colors"
                          >
                            <Plus className="w-3.5 h-3.5" />
                          </button>
                        </div>
                        <button
                          type="button"
                          onClick={() => onRemoveItem(item.id)}
                          className="w-7 h-7 rounded-lg text-stone-400 hover:text-red-600 flex items-center justify-center transition-colors"
                          title="Remove item"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Slot Selection */}
              <div className="space-y-2.5">
                <label className="block text-xs font-bold text-stone-800">
                  Select Dispatch Slot
                </label>
                <div className="grid grid-cols-1 gap-2">
                  <label
                    onClick={() => setSelectedSlot('express')}
                    className={`p-3 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
                      selectedSlot === 'express'
                        ? 'border-red-600 bg-red-50/50 ring-1 ring-red-600/30'
                        : 'border-stone-200 bg-white hover:border-stone-300'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <Clock className="w-4 h-4 text-red-600" />
                      <div>
                        <div className="text-xs font-bold text-stone-900 flex items-center gap-1.5">
                          <span>30-Min Express Dispatch</span>
                          <span className="text-[10px] px-1.5 py-0.2 rounded bg-red-600 text-white font-bold">Fastest</span>
                        </div>
                        <p className="text-[11px] text-stone-500">Technician reaches today within 30 minutes</p>
                      </div>
                    </div>
                    <span className="text-xs font-bold text-stone-800 font-mono">Free</span>
                  </label>

                  <label
                    onClick={() => setSelectedSlot('morning')}
                    className={`p-3 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
                      selectedSlot === 'morning'
                        ? 'border-red-600 bg-red-50/50 ring-1 ring-red-600/30'
                        : 'border-stone-200 bg-white hover:border-stone-300'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <Calendar className="w-4 h-4 text-stone-600" />
                      <div>
                        <div className="text-xs font-bold text-stone-900">Tomorrow Morning</div>
                        <p className="text-[11px] text-stone-500">10:00 AM - 12:00 PM</p>
                      </div>
                    </div>
                    <span className="text-xs font-bold text-stone-800 font-mono">Free</span>
                  </label>

                  <label
                    onClick={() => setSelectedSlot('afternoon')}
                    className={`p-3 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
                      selectedSlot === 'afternoon'
                        ? 'border-red-600 bg-red-50/50 ring-1 ring-red-600/30'
                        : 'border-stone-200 bg-white hover:border-stone-300'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <Calendar className="w-4 h-4 text-stone-600" />
                      <div>
                        <div className="text-xs font-bold text-stone-900">Tomorrow Afternoon</div>
                        <p className="text-[11px] text-stone-500">02:00 PM - 04:00 PM</p>
                      </div>
                    </div>
                    <span className="text-xs font-bold text-stone-800 font-mono">Free</span>
                  </label>
                </div>
              </div>

              {/* Service Address */}
              <div className="space-y-2">
                <label className="block text-xs font-bold text-stone-800">
                  Delivery Address & Contact
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
                <div className="flex items-center justify-between text-stone-600">
                  <span>Safety & Equipment Surcharge</span>
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
                  <span>Securing Technician & OTP...</span>
                ) : (
                  <>
                    <span>Book Cleaning &bull; ₹{grandTotal.toFixed(2)}</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
              <div className="text-center text-[10px] text-stone-400 mt-2">
                Pay after service completion via UPI, Cash or Card. Zero cancellation fee.
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
