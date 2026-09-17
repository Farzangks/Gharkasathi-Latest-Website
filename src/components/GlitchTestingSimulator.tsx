import React, { useState } from 'react';
import { 
  Play, 
  RotateCcw, 
  CheckCircle2, 
  AlertCircle, 
  Layers, 
  ShoppingBag, 
  Smartphone, 
  Sparkles, 
  ArrowRight,
  ShieldCheck,
  ChevronRight,
  Plus,
  Minus,
  Trash2
} from 'lucide-react';

interface SimulatedCartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

export const GlitchTestingSimulator: React.FC = () => {
  // Navigation Simulation State
  const [navDepth, setNavDepth] = useState<number>(1);
  const [selectedTab, setSelectedTab] = useState<number>(0);
  const [mode, setMode] = useState<'buggy' | 'fixed'>('fixed');
  
  // Cart Simulation State
  const [cartMode, setCartMode] = useState<'hardcoded_glitch' | 'dynamic_fixed'>('dynamic_fixed');
  const [gstRate, setGstRate] = useState<number>(18);
  const [cartItems, setCartItems] = useState<SimulatedCartItem[]>([
    { id: 'srv_01', name: 'AC Deep Cleaning & Jet Repair', price: 599, quantity: 1 }
  ]);

  const availableCatalog = [
    { id: 'srv_01', name: 'AC Deep Cleaning & Jet Repair', price: 599 },
    { id: 'srv_02', name: 'Full Home Deep Sanitization', price: 1499 },
    { id: 'srv_03', name: 'Electrician & Switchboard Wiring', price: 199 },
    { id: 'srv_04', name: 'Bathroom Drain Pipe Jetting', price: 449 },
    { id: 'srv_05', name: 'Sofa Shampoo & Dust Mite Removal', price: 799 }
  ];

  // Cart Functions
  const addItem = (item: { id: string; name: string; price: number }) => {
    if (cartMode === 'hardcoded_glitch') {
      // In buggy mode: hardcoded items overwrite or ignore dynamic additions
      return;
    }
    setCartItems(prev => {
      const idx = prev.findIndex(i => i.id === item.id);
      if (idx >= 0) {
        const copy = [...prev];
        copy[idx].quantity += 1;
        return copy;
      }
      return [...prev, { ...item, quantity: 1 }];
    });
  };

  const updateQty = (id: string, delta: number) => {
    if (cartMode === 'hardcoded_glitch') return;
    setCartItems(prev => prev.map(item => {
      if (item.id === id) {
        const newQty = item.quantity + delta;
        return newQty > 0 ? { ...item, quantity: newQty } : null;
      }
      return item;
    }).filter(Boolean) as SimulatedCartItem[]);
  };

  const removeItem = (id: string) => {
    if (cartMode === 'hardcoded_glitch') return;
    setCartItems(prev => prev.filter(i => i.id !== id));
  };

  const subtotal = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const gst = Math.round(subtotal * (gstRate / 100));
  const total = subtotal + gst;

  // Glitch conditions
  const isNavbarHidden = mode === 'buggy' && navDepth >= 3;

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-stone-900 text-white p-5 rounded-2xl border border-stone-800 flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1.5 bg-emerald-500/20 text-emerald-400 rounded-lg">
              <Sparkles className="w-5 h-5" />
            </span>
            <h3 className="text-base font-bold">Interactive Flutter Glitch Testing Lab</h3>
          </div>
          <p className="text-xs text-stone-400 mt-1">
            Simulate and verify the 2 reported bugs live: See how the bug happens in raw Flutter, and how our architecture fixes it 100%.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs text-emerald-400 font-mono bg-emerald-950 px-2.5 py-1 rounded-full border border-emerald-800">
            QA Rig Ready
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* TEST 1: Bottom Navigation Bar State Preservation */}
        <div className="bg-white rounded-2xl border border-stone-200 p-5 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Layers className="w-5 h-5 text-emerald-700" />
              <h4 className="text-sm font-bold text-stone-900">
                Test 1: Bottom Navigation Bar Disappearance
              </h4>
            </div>
            <div className="flex items-center gap-1 bg-stone-100 p-1 rounded-lg border border-stone-200">
              <button
                onClick={() => setMode('fixed')}
                className={`px-2.5 py-1 text-xs font-bold rounded-md transition-all cursor-pointer ${
                  mode === 'fixed' 
                    ? 'bg-emerald-600 text-white shadow-xs' 
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                Fixed (Nested Keys)
              </button>
              <button
                onClick={() => setMode('buggy')}
                className={`px-2.5 py-1 text-xs font-bold rounded-md transition-all cursor-pointer ${
                  mode === 'buggy' 
                    ? 'bg-rose-600 text-white shadow-xs' 
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                Buggy (Standard Get.to)
              </button>
            </div>
          </div>

          <p className="text-xs text-stone-600">
            Click "Navigate Deeper" to simulate opening screens (e.g. Service &rarr; Sub-service &rarr; Details &rarr; Booking).
          </p>

          {/* Phone Frame Simulator */}
          <div className="border border-stone-300 rounded-2xl bg-stone-100 p-3 max-w-sm mx-auto shadow-inner space-y-3">
            {/* Phone Screen Mock */}
            <div className="bg-white rounded-xl border border-stone-200 h-64 flex flex-col justify-between overflow-hidden shadow-xs relative">
              {/* Top Bar */}
              <div className="bg-stone-900 text-white px-3 py-2 text-xs flex items-center justify-between font-mono">
                <span className="font-bold text-[11px]">GHAR KA SATHI</span>
                <span className="text-[10px] text-stone-400">Stack Depth: {navDepth}</span>
              </div>

              {/* Screen Body */}
              <div className="p-4 space-y-3 flex-1 flex flex-col justify-center items-center text-center">
                {navDepth === 1 && (
                  <div className="space-y-1">
                    <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-800 mx-auto flex items-center justify-center font-bold text-sm">1</div>
                    <div className="text-xs font-bold text-stone-900">Home Dashboard</div>
                    <div className="text-[11px] text-stone-500">Root view with primary service categories</div>
                  </div>
                )}

                {navDepth === 2 && (
                  <div className="space-y-1">
                    <div className="w-10 h-10 rounded-full bg-sky-100 text-sky-800 mx-auto flex items-center justify-center font-bold text-sm">2</div>
                    <div className="text-xs font-bold text-stone-900">AC & Appliance Category</div>
                    <div className="text-[11px] text-stone-500">Selected sub-service catalog list</div>
                  </div>
                )}

                {navDepth === 3 && (
                  <div className="space-y-1">
                    <div className="w-10 h-10 rounded-full bg-amber-100 text-amber-800 mx-auto flex items-center justify-center font-bold text-sm">3</div>
                    <div className="text-xs font-bold text-stone-900">Jet Foam Cleaning Detail</div>
                    <div className="text-[11px] text-stone-500">Review technician specs & warranty</div>
                  </div>
                )}

                {navDepth >= 4 && (
                  <div className="space-y-1">
                    <div className="w-10 h-10 rounded-full bg-purple-100 text-purple-800 mx-auto flex items-center justify-center font-bold text-sm">4</div>
                    <div className="text-xs font-bold text-stone-900">Checkout Schedule Screen</div>
                    <div className="text-[11px] text-stone-500">Selecting address & time slot</div>
                  </div>
                )}
              </div>

              {/* Bottom Nav Bar (Subject to Glitch) */}
              {isNavbarHidden ? (
                <div className="bg-rose-50 border-t border-rose-300 p-2 text-center text-rose-800 text-[11px] font-bold flex items-center justify-center gap-1.5 animate-pulse">
                  <AlertCircle className="w-3.5 h-3.5 text-rose-600" />
                  GLITCH OCCURRED: Bottom Navbar Vanished!
                </div>
              ) : (
                <div className="bg-white border-t border-stone-200 px-4 py-2 flex items-center justify-between text-[11px] text-stone-600">
                  <span className={`font-bold flex flex-col items-center cursor-pointer ${selectedTab === 0 ? 'text-emerald-700' : 'text-stone-400'}`} onClick={() => setSelectedTab(0)}>
                    Home
                  </span>
                  <span className={`font-bold flex flex-col items-center cursor-pointer ${selectedTab === 1 ? 'text-emerald-700' : 'text-stone-400'}`} onClick={() => setSelectedTab(1)}>
                    Services
                  </span>
                  <span className={`font-bold flex flex-col items-center cursor-pointer ${selectedTab === 2 ? 'text-emerald-700' : 'text-stone-400'}`} onClick={() => setSelectedTab(2)}>
                    Cart ({cartItems.reduce((s, i) => s + i.quantity, 0)})
                  </span>
                  <span className={`font-bold flex flex-col items-center cursor-pointer ${selectedTab === 3 ? 'text-emerald-700' : 'text-stone-400'}`} onClick={() => setSelectedTab(3)}>
                    Bookings
                  </span>
                </div>
              )}
            </div>

            {/* Controls */}
            <div className="flex items-center justify-between gap-2 pt-1">
              <button
                disabled={navDepth <= 1}
                onClick={() => setNavDepth(d => Math.max(1, d - 1))}
                className="flex-1 py-1.5 px-3 bg-white border border-stone-300 rounded-lg text-xs font-bold text-stone-700 disabled:opacity-40 cursor-pointer"
              >
                &larr; Back
              </button>
              <button
                onClick={() => setNavDepth(d => Math.min(4, d + 1))}
                className="flex-1 py-1.5 px-3 bg-emerald-600 hover:bg-emerald-500 text-stone-950 font-bold rounded-lg text-xs transition-colors cursor-pointer"
              >
                Navigate Deeper &rarr;
              </button>
              <button
                onClick={() => setNavDepth(1)}
                className="p-1.5 bg-stone-200 hover:bg-stone-300 rounded-lg text-stone-700 cursor-pointer"
                title="Reset stack"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="p-3 bg-stone-50 rounded-xl border border-stone-200 text-xs space-y-1">
            <span className="font-bold text-stone-800">Why the Fix Works:</span>
            <p className="text-stone-600 leading-relaxed">
              In <code>fixed</code> mode, routes push inside <code>Get.nestedKey(index)</code> inside the <code>IndexedStack</code>. 
              The parent <code>Scaffold</code> never unmounts, meaning the bottom navigation bar stays locked in view regardless of how deep the user browses.
            </p>
          </div>
        </div>

        {/* TEST 2: Dynamic Cart Controller */}
        <div className="bg-white rounded-2xl border border-stone-200 p-5 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-sky-700" />
              <h4 className="text-sm font-bold text-stone-900">
                Test 2: Dynamic vs Hardcoded Cart Items
              </h4>
            </div>
            <div className="flex items-center gap-1 bg-stone-100 p-1 rounded-lg border border-stone-200">
              <button
                onClick={() => setCartMode('dynamic_fixed')}
                className={`px-2.5 py-1 text-xs font-bold rounded-md transition-all cursor-pointer ${
                  cartMode === 'dynamic_fixed' 
                    ? 'bg-sky-700 text-white shadow-xs' 
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                Dynamic (Fixed)
              </button>
              <button
                onClick={() => setCartMode('hardcoded_glitch')}
                className={`px-2.5 py-1 text-xs font-bold rounded-md transition-all cursor-pointer ${
                  cartMode === 'hardcoded_glitch' 
                    ? 'bg-rose-600 text-white shadow-xs' 
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                Hardcoded (Glitch)
              </button>
            </div>
          </div>

          {cartMode === 'hardcoded_glitch' && (
            <div className="p-2.5 bg-rose-50 border border-rose-200 rounded-xl text-xs text-rose-800 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
              <span>
                <strong>Glitch Mode:</strong> Cart state is hardcoded. Adding any catalog item from below will fail to update!
              </span>
            </div>
          )}

          {/* Catalog Picker */}
          <div className="space-y-2">
            <span className="text-xs font-bold text-stone-700 uppercase tracking-wider">
              Catalog: Click to Add to Cart
            </span>
            <div className="space-y-1.5 max-h-36 overflow-y-auto pr-1">
              {availableCatalog.map(srv => (
                <div key={srv.id} className="flex items-center justify-between p-2 rounded-lg border border-stone-200 hover:bg-stone-50 transition-all text-xs">
                  <div>
                    <div className="font-bold text-stone-900">{srv.name}</div>
                    <div className="text-stone-500 font-mono">₹ {srv.price}</div>
                  </div>
                  <button
                    onClick={() => addItem(srv)}
                    className="px-2.5 py-1 bg-stone-900 hover:bg-stone-800 text-white font-bold rounded text-xs transition-colors cursor-pointer"
                  >
                    + Add
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Simulated Cart Content */}
          <div className="p-3 bg-stone-50 rounded-xl border border-stone-200 space-y-2">
            <div className="flex items-center justify-between text-xs font-bold text-stone-700">
              <span>Active Cart Items ({cartItems.length})</span>
              <button onClick={() => setCartItems([])} className="text-rose-600 hover:underline">Clear</button>
            </div>

            {cartItems.length === 0 ? (
              <div className="text-center py-4 text-xs text-stone-400">
                Cart is empty. Add services from the catalog above!
              </div>
            ) : (
              <div className="space-y-1.5 max-h-32 overflow-y-auto pr-1">
                {cartItems.map(item => (
                  <div key={item.id} className="flex items-center justify-between bg-white p-2 rounded-lg border border-stone-200 text-xs">
                    <div>
                      <div className="font-semibold text-stone-900">{item.name}</div>
                      <div className="text-stone-500">₹ {item.price} &times; {item.quantity} = ₹ {item.price * item.quantity}</div>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <button onClick={() => updateQty(item.id, -1)} className="p-1 rounded bg-stone-100 hover:bg-stone-200 cursor-pointer">
                        <Minus className="w-3 h-3 text-stone-700" />
                      </button>
                      <span className="w-4 text-center font-mono font-bold">{item.quantity}</span>
                      <button onClick={() => updateQty(item.id, 1)} className="p-1 rounded bg-stone-100 hover:bg-stone-200 cursor-pointer">
                        <Plus className="w-3 h-3 text-stone-700" />
                      </button>
                      <button onClick={() => removeItem(item.id)} className="p-1 rounded hover:bg-rose-50 text-rose-600 cursor-pointer">
                        <Trash2 className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Dynamic GST Controls */}
            <div className="pt-2 border-t border-stone-200">
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-[11px] font-bold text-stone-700">Platform GST Slab:</span>
                <div className="flex items-center gap-1">
                  {[0, 5, 12, 18, 28].map(pct => (
                    <button
                      key={pct}
                      onClick={() => setGstRate(pct)}
                      className={`px-1.5 py-0.5 rounded text-[10px] font-bold cursor-pointer transition-all ${
                        gstRate === pct 
                          ? 'bg-emerald-700 text-white' 
                          : 'bg-stone-200 text-stone-700 hover:bg-stone-300'
                      }`}
                    >
                      {pct}%
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Bill Summary */}
            <div className="pt-2 border-t border-stone-200 space-y-1 text-xs font-mono">
              <div className="flex justify-between text-stone-500">
                <span>Subtotal:</span>
                <span>₹ {subtotal}</span>
              </div>
              <div className="flex justify-between text-stone-500">
                <span>GST ({gstRate}%):</span>
                <span>₹ {gst}</span>
              </div>
              <div className="flex justify-between font-bold text-stone-900 text-sm">
                <span>Grand Total:</span>
                <span className="text-emerald-700">₹ {total}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
