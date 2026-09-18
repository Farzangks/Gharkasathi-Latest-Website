import React, { useState } from 'react';
import { 
  X, 
  CheckCircle2, 
  AlertTriangle, 
  Clock, 
  Calendar, 
  Camera, 
  Wrench, 
  ShieldAlert, 
  UserCheck,
  Send,
  UploadCloud,
  FileCheck,
  ThumbsUp,
  ThumbsDown
} from 'lucide-react';
import { 
  MaintenanceContract, 
  MaintenanceServiceRequest, 
  MaintenanceCategoryKey 
} from '../../types/maintenance';
import { MAINTENANCE_CATEGORIES, MAINTENANCE_SERVICES_CATALOG } from '../../data/maintenanceCatalog';

interface RaiseServiceRequestModalProps {
  isOpen: boolean;
  onClose: () => void;
  activeContract: MaintenanceContract | null;
  onSubmitRequest: (request: Partial<MaintenanceServiceRequest>) => void;
  lang?: 'en' | 'hi';
}

export const RaiseServiceRequestModal: React.FC<RaiseServiceRequestModalProps> = ({
  isOpen,
  onClose,
  activeContract,
  onSubmitRequest,
  lang = 'en'
}) => {
  const [selectedCategory, setSelectedCategory] = useState<MaintenanceCategoryKey>('plumbing');
  const [selectedServiceName, setSelectedServiceName] = useState('');
  const [problemDescription, setProblemDescription] = useState('');
  const [preferredDate, setPreferredDate] = useState('');
  const [preferredTimeSlot, setPreferredTimeSlot] = useState('10:00 AM - 01:00 PM');
  const [isEmergency, setIsEmergency] = useState(false);
  const [photos, setPhotos] = useState<string[]>([]);
  const [submittedSuccess, setSubmittedSuccess] = useState(false);

  if (!isOpen || !activeContract) return null;

  // Filter available services for category
  const availableServices = MAINTENANCE_SERVICES_CATALOG.filter(
    s => s.category === selectedCategory && (s.target === 'all' || s.target === activeContract.target)
  );

  // Check if active plan covers category
  const isCategoryCovered = activeContract.categoriesCovered.includes(selectedCategory);
  const visitsRemaining = Math.max(0, activeContract.visitsTotal - activeContract.visitsUsed);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!problemDescription.trim()) return;

    const newRequest: Partial<MaintenanceServiceRequest> = {
      contractId: activeContract.id,
      contractNumber: activeContract.contractNumber,
      customerName: activeContract.customerName,
      customerPhone: activeContract.customerPhone,
      propertyAddress: activeContract.address,
      category: selectedCategory,
      serviceName: selectedServiceName || `${selectedCategory.toUpperCase()} Service Request`,
      problemDescription,
      preferredDate: preferredDate || new Date().toISOString().slice(0, 10),
      preferredTimeSlot,
      isEmergency,
      status: 'scheduled',
      beforePhotos: photos,
      createdAt: new Date().toISOString()
    };

    onSubmitRequest(newRequest);
    setSubmittedSuccess(true);
    setTimeout(() => {
      setSubmittedSuccess(false);
      onClose();
    }, 1800);
  };

  const handleSimulatePhotoUpload = () => {
    // Simulated photo proof upload
    const dummyPhoto = 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=300&auto=format&fit=crop&q=60';
    setPhotos(prev => [...prev, dummyPhoto]);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/75 backdrop-blur-xs overflow-y-auto animate-fadeIn">
      <div className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full my-auto overflow-hidden border border-stone-200 text-stone-900 flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="px-6 py-4 bg-stone-900 text-white flex items-center justify-between border-b border-stone-800">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-red-600 flex items-center justify-center p-1">
              <Wrench className="w-4 h-4 text-white" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white">
                Raise Service Request Under Plan
              </h3>
              <p className="text-[11px] text-stone-400">
                {activeContract.planTitle} &bull; {activeContract.contractNumber}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg hover:bg-stone-800 text-stone-400 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {submittedSuccess ? (
          <div className="p-12 text-center space-y-4">
            <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto text-emerald-600">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h4 className="text-lg font-bold text-stone-900">
              Service Request Dispatched Successfully!
            </h4>
            <p className="text-xs text-stone-600 max-w-md mx-auto">
              A certified Gharkasathi Service Partner has been notified. You will receive real-time technician tracking and updates via SMS &amp; WhatsApp.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-5 text-xs sm:text-sm">
            {/* Plan Entitlement Banner */}
            <div className={`p-4 rounded-2xl border flex items-center justify-between ${
              isCategoryCovered 
                ? 'bg-emerald-50 border-emerald-200 text-emerald-900' 
                : 'bg-amber-50 border-amber-200 text-amber-900'
            }`}>
              <div className="flex items-center gap-3">
                {isCategoryCovered ? (
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                ) : (
                  <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0" />
                )}
                <div>
                  <div className="font-bold text-xs">
                    {isCategoryCovered ? 'Covered Under Your Maintenance Plan' : 'Out-of-Routine Plan Category'}
                  </div>
                  <div className="text-[11px] opacity-80">
                    {isCategoryCovered 
                      ? `₹0 Labour Charges &bull; ${visitsRemaining} of ${activeContract.visitsTotal} visits remaining`
                      : 'You may still request service; technician will provide an estimate before starting.'}
                  </div>
                </div>
              </div>

              {activeContract.emergencySupport && (
                <span className="text-[10px] bg-red-600 text-white font-bold px-2 py-1 rounded-md shrink-0">
                  {activeContract.responseSlaHours}h SLA Active
                </span>
              )}
            </div>

            {/* Select Category */}
            <div>
              <label className="block text-xs font-bold text-stone-700 mb-2">
                1. Select Service Category:
              </label>
              <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                {MAINTENANCE_CATEGORIES.map(cat => {
                  const isCovered = activeContract.categoriesCovered.includes(cat.key);
                  const isSelected = selectedCategory === cat.key;
                  return (
                    <button
                      type="button"
                      key={cat.key}
                      onClick={() => {
                        setSelectedCategory(cat.key);
                        setSelectedServiceName('');
                      }}
                      className={`p-2.5 rounded-xl border text-left flex flex-col justify-between transition-all cursor-pointer ${
                        isSelected 
                          ? 'border-red-600 bg-red-50 text-red-950 font-bold shadow-xs' 
                          : 'border-stone-200 bg-white text-stone-700 hover:border-stone-300'
                      }`}
                    >
                      <span className="text-xs truncate">{cat.label}</span>
                      <span className={`text-[10px] mt-1 ${isCovered ? 'text-emerald-700 font-bold' : 'text-stone-400'}`}>
                        {isCovered ? '✓ Covered' : 'Additional'}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Select Specific Task */}
            {availableServices.length > 0 && (
              <div>
                <label className="block text-xs font-bold text-stone-700 mb-2">
                  2. Choose Specific Service / Inspection:
                </label>
                <select
                  value={selectedServiceName}
                  onChange={(e) => setSelectedServiceName(e.target.value)}
                  className="w-full p-2.5 bg-stone-50 border border-stone-300 rounded-xl text-xs font-medium text-stone-900 focus:ring-2 focus:ring-red-600 outline-none"
                >
                  <option value="">General {selectedCategory} Inspection / Repair</option>
                  {availableServices.map(s => (
                    <option key={s.id} value={s.name}>
                      {s.name} {s.emergencyEligible ? '(Emergency Eligible)' : ''}
                    </option>
                  ))}
                </select>
              </div>
            )}

            {/* Problem Description */}
            <div>
              <label className="block text-xs font-bold text-stone-700 mb-1">
                3. Describe the Issue / Maintenance Needs: *
              </label>
              <textarea
                required
                rows={3}
                value={problemDescription}
                onChange={(e) => setProblemDescription(e.target.value)}
                placeholder="E.g., Master bedroom AC cooling coil seems weak and making slight vibration, or leaking angle valve under kitchen sink."
                className="w-full p-3 bg-stone-50 border border-stone-300 rounded-xl text-xs font-sans text-stone-900 focus:ring-2 focus:ring-red-600 outline-none"
              />
            </div>

            {/* Preferred Date & Slot */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">
                  Preferred Date:
                </label>
                <input
                  type="date"
                  value={preferredDate}
                  onChange={(e) => setPreferredDate(e.target.value)}
                  className="w-full p-2.5 bg-stone-50 border border-stone-300 rounded-xl text-xs text-stone-900 outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">
                  Preferred Time Window:
                </label>
                <select
                  value={preferredTimeSlot}
                  onChange={(e) => setPreferredTimeSlot(e.target.value)}
                  className="w-full p-2.5 bg-stone-50 border border-stone-300 rounded-xl text-xs text-stone-900 outline-none"
                >
                  <option value="09:00 AM - 12:00 PM">09:00 AM - 12:00 PM (Morning)</option>
                  <option value="12:00 PM - 03:00 PM">12:00 PM - 03:00 PM (Afternoon)</option>
                  <option value="03:00 PM - 06:00 PM">03:00 PM - 06:00 PM (Evening)</option>
                  <option value="Immediate Emergency">Immediate Emergency (As per SLA)</option>
                </select>
              </div>
            </div>

            {/* Emergency Breakdown Toggle */}
            <div className="p-3.5 bg-red-50 border border-red-200 rounded-2xl flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <ShieldAlert className="w-5 h-5 text-red-600" />
                <div>
                  <span className="font-bold text-xs text-red-950 block">
                    Is this an Urgent Breakdown?
                  </span>
                  <span className="text-[11px] text-red-700">
                    Triggers high-priority engineer dispatch under your guaranteed {activeContract.responseSlaHours || 4}-hour SLA.
                  </span>
                </div>
              </div>

              <input
                type="checkbox"
                checked={isEmergency}
                onChange={(e) => setIsEmergency(e.target.checked)}
                className="w-5 h-5 text-red-600 rounded border-red-300 focus:ring-red-500 cursor-pointer"
              />
            </div>

            {/* Photos Upload */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-bold text-stone-700 flex items-center gap-1.5">
                  <Camera className="w-3.5 h-3.5 text-stone-500" />
                  <span>Attach Photos / Videos (Optional):</span>
                </label>
                <button
                  type="button"
                  onClick={handleSimulatePhotoUpload}
                  className="text-[11px] text-red-600 font-bold hover:underline cursor-pointer"
                >
                  + Add Sample Photo
                </button>
              </div>

              {photos.length > 0 ? (
                <div className="flex items-center gap-2">
                  {photos.map((p, i) => (
                    <div key={i} className="w-14 h-14 rounded-lg overflow-hidden border border-stone-200 relative">
                      <img src={p} alt="proof" className="w-full h-full object-cover" />
                    </div>
                  ))}
                </div>
              ) : (
                <div 
                  onClick={handleSimulatePhotoUpload}
                  className="border-2 border-dashed border-stone-200 rounded-xl p-4 text-center cursor-pointer hover:border-stone-400 transition-colors"
                >
                  <UploadCloud className="w-6 h-6 text-stone-400 mx-auto mb-1" />
                  <span className="text-[11px] text-stone-500 block">
                    Tap to attach or drag photos of damaged pipe, circuit breaker or AC unit
                  </span>
                </div>
              )}
            </div>

            {/* Submit CTA */}
            <div className="pt-2 flex items-center justify-end gap-3 border-t border-stone-200">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2.5 rounded-xl border border-stone-300 text-xs font-bold text-stone-700 hover:bg-stone-50 cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-bold shadow-md shadow-red-600/30 flex items-center gap-2 cursor-pointer transition-colors"
              >
                <Send className="w-4 h-4" />
                <span>Confirm &amp; Dispatch Certified Partner</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
