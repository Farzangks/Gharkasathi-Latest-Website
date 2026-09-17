import React, { useState } from 'react';
import { X, ShoppingCart, Check, Sparkles, ShieldCheck } from 'lucide-react';
import { ServiceOptionItem, CartItem } from '../data/cleaningCatalog';

export interface ServiceWithOptions {
  id: string;
  name: string;
  categoryId: string;
  categoryName: string;
  basePrice?: number;
  imageUrl: string;
  optionsLabel?: string;
  options?: ServiceOptionItem[];
}

interface ServiceOptionsModalProps {
  service: ServiceWithOptions;
  onClose: () => void;
  onAddToCart: (item: CartItem) => void;
}

export const ServiceOptionsModal: React.FC<ServiceOptionsModalProps> = ({
  service,
  onClose,
  onAddToCart,
}) => {
  const optionsList: ServiceOptionItem[] = (service.options && service.options.length > 0)
    ? service.options
    : [{ id: 'opt-standard', name: 'Standard Service Pack', price: service.basePrice || 299, popular: true }];

  // Default to the first popular option, or simply the first option
  const initialOption = optionsList.find(o => o.popular) || optionsList[0];
  const [selectedOption, setSelectedOption] = useState<ServiceOptionItem>(initialOption);
  const [isAdded, setIsAdded] = useState(false);

  const serviceCharge = selectedOption.price;
  const convenienceFee = Number((serviceCharge * 0.03).toFixed(2));
  const totalAmount = Number((serviceCharge + convenienceFee).toFixed(2));

  const handleAdd = () => {
    const cartItem: CartItem = {
      id: `${service.id}-${selectedOption.id}-${Date.now()}`,
      serviceId: service.id,
      serviceName: service.name,
      categoryId: service.categoryId,
      categoryName: service.categoryName,
      optionId: selectedOption.id,
      optionName: selectedOption.name,
      price: serviceCharge,
      convenienceFee: convenienceFee,
      totalPrice: totalAmount,
      quantity: 1,
      imageUrl: service.imageUrl
    };

    setIsAdded(true);
    setTimeout(() => {
      onAddToCart(cartItem);
      onClose();
    }, 400);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-end sm:items-center justify-center p-0 sm:p-4 animate-in fade-in duration-200">
      <div 
        className="bg-white w-full sm:max-w-md rounded-t-3xl sm:rounded-3xl max-h-[92vh] flex flex-col shadow-2xl overflow-hidden border border-stone-100"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Mobile Pull Bar Indicator */}
        <div className="w-12 h-1.5 bg-stone-200 rounded-full mx-auto mt-3 sm:hidden" />

        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 pt-4 pb-3 border-b border-stone-100">
          <div>
            <h2 className="text-lg font-bold text-stone-900 tracking-tight">Service Options</h2>
            <p className="text-xs text-stone-500 truncate max-w-[280px]">{service.name}</p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-500 hover:text-stone-800 flex items-center justify-center transition-colors cursor-pointer"
            aria-label="Close"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Scrollable Options List */}
        <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
          <div>
            <h3 className="text-sm font-bold text-stone-800 mb-3">
              {service.optionsLabel || 'Select Sofa Size:'}
            </h3>

            <div className="space-y-2.5">
              {optionsList.map((option) => {
                const isSelected = selectedOption.id === option.id;
                return (
                  <label
                    key={option.id}
                    onClick={() => setSelectedOption(option)}
                    className={`flex items-center justify-between p-3.5 rounded-2xl border transition-all cursor-pointer select-none ${
                      isSelected
                        ? 'border-red-600 bg-red-50/40 ring-1 ring-red-600/30'
                        : 'border-stone-200 hover:border-stone-300 bg-white'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      {/* Radio Circle */}
                      <div
                        className={`w-5 h-5 rounded-full flex items-center justify-center transition-all ${
                          isSelected
                            ? 'bg-red-600 text-white'
                            : 'border-2 border-stone-300 bg-white'
                        }`}
                      >
                        {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                      </div>

                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-semibold text-stone-900">
                            {option.name}
                          </span>
                          {option.popular && (
                            <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-amber-100 text-amber-800 border border-amber-200">
                              Popular
                            </span>
                          )}
                        </div>
                        {option.description && (
                          <p className="text-[11px] text-stone-500 mt-0.5 leading-tight">
                            {option.description}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="text-right">
                      <span className="text-sm font-bold text-stone-900 font-mono">
                        ₹{option.price}
                      </span>
                      {option.duration && (
                        <span className="block text-[10px] text-stone-400">
                          {option.duration}
                        </span>
                      )}
                    </div>
                  </label>
                );
              })}
            </div>
          </div>

          {/* Price Details Box (Exact match to Screenshots 6 & 7) */}
          <div className="pt-2">
            <div className="p-4 bg-stone-50/80 rounded-2xl border border-stone-200/80 space-y-2.5">
              <h4 className="text-xs font-bold text-stone-800 uppercase tracking-wider">
                Price Details
              </h4>

              <div className="space-y-1.5 text-xs">
                <div className="flex items-center justify-between text-stone-600">
                  <span>Service Charge</span>
                  <span className="font-mono font-medium text-stone-900">₹ {serviceCharge}</span>
                </div>

                <div className="flex items-center justify-between text-stone-600">
                  <div className="flex items-center gap-1">
                    <span>Convenience Fee (3%)</span>
                    <span className="text-[10px] text-stone-400">(Safety & Kit)</span>
                  </div>
                  <span className="font-mono font-medium text-stone-900">₹ {convenienceFee.toFixed(2)}</span>
                </div>

                <div className="pt-2 border-t border-stone-200/80 flex items-center justify-between font-bold text-sm">
                  <span className="text-stone-900">Total Amount</span>
                  <span className="text-stone-900 font-mono text-base">₹ {totalAmount.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Urban Company Assurance Note */}
          <div className="flex items-center gap-2 p-2.5 bg-emerald-50/60 rounded-xl border border-emerald-100 text-[11px] text-emerald-800">
            <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>Includes 100% German Kärcher extraction & verified safety standard.</span>
          </div>
        </div>

        {/* Sticky Action Footer */}
        <div className="p-4 border-t border-stone-100 bg-white">
          <button
            onClick={handleAdd}
            disabled={isAdded}
            className={`w-full py-3.5 px-4 rounded-xl text-white font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-98 ${
              isAdded
                ? 'bg-emerald-600 shadow-emerald-500/20'
                : 'bg-red-600 hover:bg-red-700 active:bg-red-800 shadow-red-500/20'
            }`}
          >
            {isAdded ? (
              <>
                <Check className="w-4 h-4 stroke-[3]" />
                <span>Added to Cart!</span>
              </>
            ) : (
              <>
                <ShoppingCart className="w-4 h-4" />
                <span>Add to Cart &bull; ₹{totalAmount.toFixed(2)}</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
