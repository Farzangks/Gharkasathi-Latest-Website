import React, { useState } from 'react';
import { 
  X, 
  Calendar, 
  Clock, 
  MapPin, 
  Car, 
  Phone, 
  CheckCircle2, 
  MessageCircle, 
  ShieldCheck 
} from 'lucide-react';
import { AuthenticRealEstate } from '../data/teamImages';

interface ScheduleSiteVisitModalProps {
  property: AuthenticRealEstate | null;
  onClose: () => void;
}

export const ScheduleSiteVisitModal: React.FC<ScheduleSiteVisitModalProps> = ({
  property,
  onClose
}) => {
  const [visitorName, setVisitorName] = useState('');
  const [visitorPhone, setVisitorPhone] = useState('');
  const [visitDate, setVisitDate] = useState('');
  const [visitSlot, setVisitSlot] = useState('morning');
  const [needCabPickup, setNeedCabPickup] = useState(true);
  const [pickupAddress, setPickupAddress] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  if (!property) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSuccess(true);
  };

  const getWhatsAppConfirmationUrl = () => {
    const text = `Hello Gharkasathi Real Estate Desk, I want to schedule a Site Visit:\n\n` +
      `*Property:* ${property.title}\n` +
      `*Location:* ${property.location}\n` +
      `*Plot Area / Type:* ${property.plotArea} (${property.type})\n` +
      `*Preferred Date:* ${visitDate || 'Tomorrow'}\n` +
      `*Time Slot:* ${visitSlot === 'morning' ? '10:00 AM - 1:00 PM' : '3:00 PM - 6:00 PM'}\n` +
      `*Cab Pickup Needed:* ${needCabPickup ? `Yes (Address: ${pickupAddress || 'Provided on call'})` : 'No (Self Drive)'}\n\n` +
      `Please assign a senior property advisor.`;
    return `https://wa.me/919111100000?text=${encodeURIComponent(text)}`;
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-7 shadow-2xl relative space-y-5 animate-in fade-in zoom-in-95">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-stone-100 text-stone-600 flex items-center justify-center hover:bg-stone-200 transition-colors cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>

        {isSuccess ? (
          <div className="text-center py-6 space-y-4">
            <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-700 mx-auto flex items-center justify-center">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <div>
              <h3 className="text-xl font-black text-stone-900">Site Visit Scheduled!</h3>
              <p className="text-xs text-stone-600 mt-1 max-w-sm mx-auto">
                Thank you, <strong>{visitorName}</strong>. Our Property Relationship Manager will reach out on <strong>{visitorPhone}</strong> to confirm your complimentary pickup.
              </p>
            </div>

            <div className="p-3 bg-stone-50 rounded-2xl border border-stone-200 text-left text-xs space-y-1">
              <div className="flex justify-between text-stone-600">
                <span>Property:</span>
                <span className="font-bold text-stone-900 line-clamp-1">{property.title}</span>
              </div>
              <div className="flex justify-between text-stone-600">
                <span>Location:</span>
                <span className="font-bold text-stone-900">{property.location}</span>
              </div>
              <div className="flex justify-between text-stone-600">
                <span>Slot:</span>
                <span className="font-bold text-stone-900">{visitSlot === 'morning' ? '10 AM - 1 PM' : '3 PM - 6 PM'}</span>
              </div>
            </div>

            <div className="pt-2 flex flex-col gap-2">
              <a
                href={getWhatsAppConfirmationUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 px-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Get Instant WhatsApp Pass</span>
              </a>

              <button
                onClick={onClose}
                className="w-full py-2.5 px-4 bg-stone-100 hover:bg-stone-200 text-stone-800 rounded-xl text-xs font-bold transition-colors cursor-pointer"
              >
                Done
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Header */}
            <div>
              <div className="flex items-center gap-2 text-xs font-bold text-red-600 uppercase tracking-wider mb-1">
                <ShieldCheck className="w-4 h-4" />
                <span>RERA Verified Property &bull; Zero Brokerage</span>
              </div>
              <h3 className="text-lg sm:text-xl font-black text-stone-900 leading-tight">
                Schedule Free Site Visit
              </h3>
              <p className="text-xs text-stone-500 mt-0.5">
                {property.title} ({property.location})
              </p>
            </div>

            {/* Inputs */}
            <div className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-stone-800 mb-1">Your Full Name *</label>
                <input
                  type="text"
                  required
                  value={visitorName}
                  onChange={(e) => setVisitorName(e.target.value)}
                  placeholder="e.g., Manish Agrawal"
                  className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-xs sm:text-sm text-stone-900 focus:outline-hidden focus:border-red-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-800 mb-1">Mobile Number *</label>
                <input
                  type="tel"
                  required
                  pattern="[0-9]{10}"
                  value={visitorPhone}
                  onChange={(e) => setVisitorPhone(e.target.value)}
                  placeholder="10-digit mobile number"
                  className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-xs sm:text-sm text-stone-900 focus:outline-hidden focus:border-red-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-stone-800 mb-1">Preferred Date</label>
                  <input
                    type="date"
                    required
                    value={visitDate}
                    onChange={(e) => setVisitDate(e.target.value)}
                    className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl text-xs text-stone-900 focus:outline-hidden focus:border-red-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-800 mb-1">Time Window</label>
                  <select
                    value={visitSlot}
                    onChange={(e) => setVisitSlot(e.target.value)}
                    className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl text-xs text-stone-900 focus:outline-hidden focus:border-red-500 font-medium"
                  >
                    <option value="morning">Morning (10:00 AM - 1:00 PM)</option>
                    <option value="evening">Afternoon (3:00 PM - 6:00 PM)</option>
                  </select>
                </div>
              </div>

              {/* Free AC Cab Pickup Toggle */}
              <div className="p-3 bg-stone-50 rounded-2xl border border-stone-200 space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Car className="w-4 h-4 text-red-600" />
                    <div>
                      <span className="text-xs font-bold text-stone-900 block">Complimentary AC Cab Pickup</span>
                      <span className="text-[10px] text-stone-500">Free doorstep pickup and drop in Raipur & Bhilai</span>
                    </div>
                  </div>
                  <input
                    type="checkbox"
                    checked={needCabPickup}
                    onChange={(e) => setNeedCabPickup(e.target.checked)}
                    className="w-4 h-4 accent-red-600 cursor-pointer"
                  />
                </div>

                {needCabPickup && (
                  <input
                    type="text"
                    value={pickupAddress}
                    onChange={(e) => setPickupAddress(e.target.value)}
                    placeholder="Enter pickup address / landmark in Raipur/Bhilai"
                    className="w-full px-3 py-2 bg-white border border-stone-200 rounded-xl text-xs text-stone-900 focus:outline-hidden focus:border-red-500"
                  />
                )}
              </div>
            </div>

            <div className="pt-2 flex items-center justify-between gap-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2.5 rounded-xl border border-stone-200 text-stone-600 text-xs font-bold hover:bg-stone-50 cursor-pointer"
              >
                Cancel
              </button>

              <button
                type="submit"
                className="flex-1 py-2.5 px-4 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-bold shadow-md shadow-red-600/20 transition-all cursor-pointer"
              >
                Confirm Site Visit Booking
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
