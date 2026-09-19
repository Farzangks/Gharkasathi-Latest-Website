import React, { useState, useEffect } from 'react';
import { 
  Tag, 
  Plus, 
  Trash2, 
  Percent, 
  IndianRupee, 
  CheckCircle2, 
  AlertCircle, 
  Clock, 
  ToggleLeft, 
  ToggleRight,
  Sparkles,
  Calendar,
  Gift
} from 'lucide-react';
import { CouponOffer } from '../types';

export const AdminCouponManager: React.FC = () => {
  const [coupons, setCoupons] = useState<CouponOffer[]>([]);
  const [loading, setLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Form State for New Coupon
  const [showAddModal, setShowAddModal] = useState(false);
  const [code, setCode] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [discountType, setDiscountType] = useState<'PERCENTAGE' | 'FLAT'>('PERCENTAGE');
  const [discountValue, setDiscountValue] = useState<number>(20);
  const [minCartValue, setMinCartValue] = useState<number>(299);
  const [maxDiscount, setMaxDiscount] = useState<number>(250);
  const [expiryDate, setExpiryDate] = useState<string>('2026-12-31');

  const fetchCoupons = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/coupons');
      if (res.ok) {
        const data = await res.json();
        setCoupons(data.coupons || []);
      }
    } catch (err: any) {
      console.error('Failed to fetch coupons', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCoupons();
  }, []);

  const handleCreateCoupon = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setStatusMessage(null);

    try {
      const res = await fetch('/api/admin/coupons', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          code: code.trim().toUpperCase(),
          title,
          description,
          discountType,
          discountValue: Number(discountValue),
          minCartValue: Number(minCartValue),
          maxDiscount: discountType === 'PERCENTAGE' ? Number(maxDiscount) : undefined,
          expiryDate: expiryDate ? `${expiryDate}T23:59:59.000Z` : undefined,
        }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setStatusMessage(`Coupon "${data.coupon.code}" created successfully and live in checkout cart!`);
        setShowAddModal(false);
        setCode('');
        setTitle('');
        setDescription('');
        setDiscountValue(20);
        setMinCartValue(299);
        fetchCoupons();
      } else {
        setErrorMessage(data.error || 'Failed to create coupon');
      }
    } catch (err: any) {
      setErrorMessage(err.message || 'Error creating coupon');
    }
  };

  const handleToggleActive = async (id: string, currentStatus: boolean) => {
    try {
      const res = await fetch(`/api/admin/coupons/${id}/toggle`, {
        method: 'PATCH',
      });
      if (res.ok) {
        setStatusMessage(`Coupon status updated!`);
        fetchCoupons();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteCoupon = async (id: string, couponCode: string) => {
    if (!confirm(`Are you sure you want to permanently delete coupon "${couponCode}"?`)) return;
    try {
      const res = await fetch(`/api/admin/coupons/${id}`, {
        method: 'DELETE',
      });
      if (res.ok) {
        setStatusMessage(`Deleted coupon "${couponCode}"`);
        fetchCoupons();
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-white rounded-2xl border border-stone-200 p-6 shadow-xs flex flex-wrap items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl bg-red-50 text-red-600 flex items-center justify-center font-bold">
              <Tag className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-stone-900">
                Coupons, Promo Codes &amp; Campaign Offers
              </h3>
              <p className="text-xs text-stone-500">
                Manage discounts applied directly by customers in the checkout cart drawer or mobile app.
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowAddModal(true)}
            className="inline-flex items-center gap-1.5 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-xl text-xs font-bold shadow-xs transition-all cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Create New Promo Code</span>
          </button>
        </div>
      </div>

      {statusMessage && (
        <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs rounded-xl flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>{statusMessage}</span>
          </div>
          <button onClick={() => setStatusMessage(null)} className="text-emerald-700 font-bold hover:underline cursor-pointer">
            Dismiss
          </button>
        </div>
      )}

      {errorMessage && (
        <div className="p-3 bg-red-50 border border-red-200 text-red-800 text-xs rounded-xl flex items-center justify-between">
          <div className="flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
            <span>{errorMessage}</span>
          </div>
          <button onClick={() => setErrorMessage(null)} className="text-red-700 font-bold hover:underline cursor-pointer">
            Dismiss
          </button>
        </div>
      )}

      {/* Coupons Table Grid */}
      <div className="bg-white rounded-2xl border border-stone-200 shadow-xs overflow-hidden">
        <div className="px-6 py-4 border-b border-stone-200 flex items-center justify-between">
          <h4 className="text-xs font-bold text-stone-900 uppercase tracking-wider">
            Active &amp; Scheduled Offers ({coupons.length})
          </h4>
          <span className="text-[11px] text-stone-500">
            Real-time synchronization with checkout cart
          </span>
        </div>

        {loading ? (
          <div className="p-12 text-center text-xs text-stone-500">Loading coupons...</div>
        ) : coupons.length === 0 ? (
          <div className="p-12 text-center space-y-3">
            <div className="w-12 h-12 rounded-full bg-red-50 text-red-500 flex items-center justify-center mx-auto">
              <Gift className="w-6 h-6" />
            </div>
            <p className="text-xs font-bold text-stone-700">No coupons active right now</p>
            <p className="text-[11px] text-stone-500">Create your first offer to incentivize customer bookings.</p>
            <button
              onClick={() => setShowAddModal(true)}
              className="px-3 py-1.5 bg-red-600 text-white text-xs font-bold rounded-lg cursor-pointer hover:bg-red-700"
            >
              + Add First Coupon
            </button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-stone-50 text-stone-500 font-semibold border-b border-stone-200">
                <tr>
                  <th className="py-3 px-4">Coupon Code</th>
                  <th className="py-3 px-4">Campaign Title</th>
                  <th className="py-3 px-4">Discount</th>
                  <th className="py-3 px-4">Min Order</th>
                  <th className="py-3 px-4">Usage Stats</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-200">
                {coupons.map((c) => (
                  <tr key={c.id} className="hover:bg-stone-50/70 transition-colors">
                    <td className="py-3.5 px-4 font-mono font-bold text-stone-900">
                      <span className="px-2.5 py-1 rounded-md bg-red-50 text-red-700 border border-red-200">
                        {c.code}
                      </span>
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="font-bold text-stone-900">{c.title}</div>
                      <div className="text-[11px] text-stone-500">{c.description}</div>
                    </td>
                    <td className="py-3.5 px-4 font-bold text-stone-900">
                      {c.discountType === 'PERCENTAGE' ? (
                        <span className="flex items-center gap-1 text-emerald-700">
                          <Percent className="w-3.5 h-3.5" />
                          {c.discountValue}% Off {c.maxDiscount ? `(Upto ₹${c.maxDiscount})` : ''}
                        </span>
                      ) : (
                        <span className="flex items-center gap-0.5 text-emerald-700">
                          Flat ₹{c.discountValue} Off
                        </span>
                      )}
                    </td>
                    <td className="py-3.5 px-4 font-mono text-stone-700">
                      ₹{c.minCartValue}
                    </td>
                    <td className="py-3.5 px-4 text-stone-600 font-mono">
                      {c.timesUsed || 0} times
                    </td>
                    <td className="py-3.5 px-4">
                      <button
                        onClick={() => handleToggleActive(c.id, c.isActive)}
                        className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold cursor-pointer transition-colors ${
                          c.isActive
                            ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                            : 'bg-stone-100 text-stone-500 border border-stone-200'
                        }`}
                      >
                        {c.isActive ? 'Active' : 'Disabled'}
                      </button>
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <button
                        onClick={() => handleDeleteCoupon(c.id, c.code)}
                        className="text-stone-400 hover:text-red-600 p-1 rounded-lg hover:bg-stone-100 transition-colors cursor-pointer"
                        title="Delete Coupon"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* CREATE MODAL */}
      {showAddModal && (
        <div className="fixed inset-0 bg-stone-900/60 backdrop-blur-xs z-50 flex items-center justify-center p-4 animate-in fade-in">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-stone-200 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-stone-200">
              <div className="flex items-center gap-2">
                <Tag className="w-5 h-5 text-red-600" />
                <h4 className="text-base font-bold text-stone-900">
                  Create Promotional Coupon
                </h4>
              </div>
              <button
                onClick={() => setShowAddModal(false)}
                className="w-7 h-7 rounded-full bg-stone-100 text-stone-500 hover:bg-stone-200 flex items-center justify-center cursor-pointer"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateCoupon} className="space-y-3.5">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">
                    Coupon Code (Uppercase) *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. WELCOME100"
                    value={code}
                    onChange={(e) => setCode(e.target.value.toUpperCase())}
                    className="w-full px-3 py-2 border border-stone-300 rounded-xl text-xs font-mono font-bold uppercase focus:outline-hidden focus:border-red-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">
                    Campaign Display Title *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Flat ₹100 Welcome Offer"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full px-3 py-2 border border-stone-300 rounded-xl text-xs focus:outline-hidden focus:border-red-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">
                  Offer Description
                </label>
                <input
                  type="text"
                  placeholder="e.g. Valid on first booking for all residential cleaning & repairs"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full px-3 py-2 border border-stone-300 rounded-xl text-xs focus:outline-hidden focus:border-red-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">
                    Discount Type
                  </label>
                  <select
                    value={discountType}
                    onChange={(e) => setDiscountType(e.target.value as 'PERCENTAGE' | 'FLAT')}
                    className="w-full px-3 py-2 border border-stone-300 rounded-xl text-xs font-bold bg-white focus:outline-hidden focus:border-red-500"
                  >
                    <option value="PERCENTAGE">Percentage (%) Off</option>
                    <option value="FLAT">Flat Cash Discount (₹)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">
                    {discountType === 'PERCENTAGE' ? 'Discount % (e.g. 20)' : 'Flat Discount (₹)'} *
                  </label>
                  <input
                    type="number"
                    required
                    min={1}
                    max={discountType === 'PERCENTAGE' ? 90 : 5000}
                    value={discountValue}
                    onChange={(e) => setDiscountValue(Number(e.target.value))}
                    className="w-full px-3 py-2 border border-stone-300 rounded-xl text-xs font-bold focus:outline-hidden focus:border-red-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">
                    Min Order Value (₹)
                  </label>
                  <input
                    type="number"
                    min={0}
                    value={minCartValue}
                    onChange={(e) => setMinCartValue(Number(e.target.value))}
                    className="w-full px-3 py-2 border border-stone-300 rounded-xl text-xs focus:outline-hidden focus:border-red-500"
                  />
                </div>

                {discountType === 'PERCENTAGE' ? (
                  <div>
                    <label className="block text-xs font-bold text-stone-700 mb-1">
                      Max Discount Cap (₹)
                    </label>
                    <input
                      type="number"
                      min={10}
                      value={maxDiscount}
                      onChange={(e) => setMaxDiscount(Number(e.target.value))}
                      className="w-full px-3 py-2 border border-stone-300 rounded-xl text-xs focus:outline-hidden focus:border-red-500"
                    />
                  </div>
                ) : (
                  <div>
                    <label className="block text-xs font-bold text-stone-700 mb-1">
                      Expiry Date
                    </label>
                    <input
                      type="date"
                      value={expiryDate}
                      onChange={(e) => setExpiryDate(e.target.value)}
                      className="w-full px-3 py-2 border border-stone-300 rounded-xl text-xs focus:outline-hidden focus:border-red-500"
                    />
                  </div>
                )}
              </div>

              <div className="pt-3 border-t border-stone-200 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 border border-stone-300 text-stone-700 rounded-xl text-xs font-bold hover:bg-stone-50 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-red-600 hover:bg-red-700 text-white rounded-xl text-xs font-bold shadow-xs cursor-pointer"
                >
                  Publish Coupon
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
