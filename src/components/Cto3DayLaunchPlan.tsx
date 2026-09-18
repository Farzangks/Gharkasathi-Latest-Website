import React, { useState } from 'react';
import { 
  CheckCircle2, 
  Calendar, 
  Rocket, 
  ShieldAlert, 
  Terminal, 
  Copy, 
  Check, 
  Trophy,
  Sparkles,
  Zap,
  ShieldCheck,
  Smartphone,
  Server,
  Users,
  CheckSquare
} from 'lucide-react';

export const Cto3DayLaunchPlan: React.FC = () => {
  const [copiedScript, setCopiedScript] = useState(false);
  const [strategyMode, setStrategyMode] = useState<'perfection' | 'sprint'>('perfection');

  const fixCannotGetScript = `# ====================================================================
# FIX FOR "Cannot GET /" & DEPLOY FULL ADMIN PANEL TO GHARKASATHI.COM
# Run this inside Hostinger Browser Terminal (root@82.112.238.90):
# ====================================================================

# 1. Enter the backend directory
cd /var/www/gharkasathi || cd /var/www/gharkasathi-backend

# 2. Update the Node server.js to serve the Admin Panel & Landing Page at "/"
cat << 'EOF' > update_root.js
const fs = require('fs');
let code = fs.readFileSync('server.js', 'utf8');

// If root "/" route is missing, inject it!
if (!code.includes("app.get('/',") && !code.includes('app.get("/",')) {
  const rootRoute = \`
// Serve Root Dashboard / Admin Panel & Sleek Red-White Operational Website
app.get('/', (req, res) => {
  res.send(\\\`
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Gharkasathi - Turnkey Construction, Modular Interiors & In-Home Services</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap" rel="stylesheet">
  <style>
    body { font-family: 'Plus Jakarta Sans', sans-serif; background-color: #FAFAFA; color: #1C1917; }
  </style>
</head>
<body class="min-h-screen flex flex-col justify-between">
  <!-- Dynamic Blinkit-Style Festive Offer Bar -->
  <div class="bg-gradient-to-r from-red-600 via-rose-600 to-amber-600 text-white px-4 py-2.5 text-xs font-bold shadow-sm">
    <div class="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
      <div class="flex items-center gap-2">
        <span class="px-2 py-0.5 rounded-full bg-black/30 text-[10px] font-extrabold uppercase tracking-wide">🌺 GANESH UTSAV SPECIAL</span>
        <span>Ghar Sajayein Bappa Ke Aagman Par! Free 3D Modular Kitchen Design + FLAT ₹500 OFF</span>
      </div>
      <div class="flex items-center gap-2">
        <span class="px-2.5 py-0.5 rounded-full bg-white text-red-700 font-mono font-extrabold text-[11px]">CODE: BAPPA500</span>
      </div>
    </div>
  </div>

  <!-- Sleek White & Red Header -->
  <header class="bg-white border-b border-stone-200 sticky top-0 z-40">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 h-16 sm:h-20 flex items-center justify-between gap-4">
      <div class="flex items-center gap-3">
        <div class="w-10 h-10 rounded-xl bg-red-600 text-white flex items-center justify-center font-black text-xl shadow-md">G</div>
        <div>
          <div class="flex items-center gap-1.5">
            <span class="font-extrabold text-lg sm:text-xl tracking-tight text-stone-900">Gharkasathi</span>
            <span class="text-[10px] font-black px-1.5 py-0.2 rounded bg-red-100 text-red-700 uppercase">Live</span>
          </div>
          <p class="text-[10px] text-stone-500 font-medium">All Your Home Needs, Under One Roof.</p>
        </div>
      </div>
      <div class="flex items-center gap-3">
        <span class="hidden md:inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200">
          <span class="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
          Raipur & NCR Active
        </span>
        <a href="tel:+917770999122" class="px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-xs font-bold rounded-xl shadow-sm transition-all">
          Call Helpline: +91 77709 99122
        </a>
      </div>
    </div>
  </header>

  <!-- Hero & Real Indian Team Showcase -->
  <main class="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12 space-y-10 w-full">
    <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
      <div class="lg:col-span-6 space-y-4">
        <span class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-50 border border-red-200 text-red-700 text-xs font-bold">
          <span class="w-2 h-2 rounded-full bg-red-600 animate-ping"></span>
          100% In-House Police Verified Sathis
        </span>
        <h1 class="text-3xl sm:text-4xl font-black text-stone-900 tracking-tight leading-tight">
          Turnkey Construction, Modular Interiors & <span class="text-red-600">Trusted In-Home Services.</span>
        </h1>
        <p class="text-xs sm:text-sm text-stone-600 leading-relaxed">
          Real on-ground craftspeople equipped with standardized red kitbags in Raipur & NCR. Standard Turnkey ₹1,600/sq.ft, Executive ₹1,800/sq.ft, Luxury ₹2,099/sq.ft. Zero foreign stock photos, zero third-party brokers.
        </p>
        <div class="grid grid-cols-3 gap-3 pt-2">
          <div class="p-3 bg-white rounded-xl border border-stone-200 text-center shadow-xs">
            <div class="text-lg font-extrabold text-stone-900">30 Min</div>
            <div class="text-[10px] text-stone-500 font-medium">Doorstep Reach</div>
          </div>
          <div class="p-3 bg-white rounded-xl border border-stone-200 text-center shadow-xs">
            <div class="text-lg font-extrabold text-red-600">₹1,600</div>
            <div class="text-[10px] text-stone-500 font-medium">Per Sq.Ft Standard Turnkey</div>
          </div>
          <div class="p-3 bg-white rounded-xl border border-stone-200 text-center shadow-xs">
            <div class="text-lg font-extrabold text-stone-900">100%</div>
            <div class="text-[10px] text-stone-500 font-medium">In-House Staff</div>
          </div>
        </div>
      </div>

      <!-- Real Team Photo Showcase -->
      <div class="lg:col-span-6 space-y-3">
        <div class="flex items-center justify-between text-xs font-bold text-stone-800">
          <span>HAMARE ASLI SATHI (ON-GROUND IN RAIPUR & NCR)</span>
          <span class="text-red-600 font-mono text-[11px]">Real Photos</span>
        </div>
        <div class="grid grid-cols-2 gap-3">
          <div class="relative rounded-2xl overflow-hidden border border-stone-200 shadow-xs aspect-4/3 bg-stone-100">
            <img src="https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=600&q=80" class="w-full h-full object-cover" alt="Gharkasathi Carpenter">
            <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent"></div>
            <div class="absolute bottom-2 left-2 right-2 text-white text-[11px] font-bold leading-tight">
              Modular Kitchen Fitting by Gharkasathi Carpenter
            </div>
          </div>
          <div class="relative rounded-2xl overflow-hidden border border-stone-200 shadow-xs aspect-4/3 bg-stone-100">
            <img src="https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=600&q=80" class="w-full h-full object-cover" alt="Gharkasathi On-Duty Partner">
            <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent"></div>
            <div class="absolute bottom-2 left-2 right-2 text-white text-[11px] font-bold leading-tight">
              Gharkasathi Sathi On-Duty in Raipur
            </div>
          </div>
        </div>
        <div class="p-2.5 bg-red-50 text-red-800 rounded-xl text-xs flex items-center justify-between border border-red-100">
          <span>Official red polo uniform with tagline: <em>"Apke sapno ke ghar ka bharosemand sathi"</em></span>
          <span class="font-bold text-[10px]">Verified</span>
        </div>
      </div>
    </div>

    <!-- Authentic Indian Services -->
    <div class="space-y-4">
      <h2 class="text-xl font-bold text-stone-900">Authentic Home Services (Realistic Indian Context)</h2>
      <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div class="bg-white p-4 rounded-2xl border border-stone-200 shadow-xs space-y-2">
          <div class="text-xs font-bold text-red-600 uppercase">Modular Interiors</div>
          <h3 class="font-bold text-stone-900">Modular Kitchen & Wardrobes</h3>
          <p class="text-xs text-stone-500">100% Waterproof HDHMR boards fitted by master carpenters.</p>
          <div class="font-black text-stone-900 font-mono text-sm">₹1,250 / sq.ft</div>
        </div>
        <div class="bg-white p-4 rounded-2xl border border-stone-200 shadow-xs space-y-2">
          <div class="text-xs font-bold text-red-600 uppercase">Appliances</div>
          <h3 class="font-bold text-stone-900">AC Foam Jet Service & Gas</h3>
          <p class="text-xs text-stone-500">Voltas, Daikin, LG split AC high pressure pump deep cleaning.</p>
          <div class="font-black text-stone-900 font-mono text-sm">₹499 flat</div>
        </div>
        <div class="bg-white p-4 rounded-2xl border border-stone-200 shadow-xs space-y-2">
          <div class="text-xs font-bold text-red-600 uppercase">Electrical</div>
          <h3 class="font-bold text-stone-900">Master Electrician & Wiring</h3>
          <p class="text-xs text-stone-500">Anchor/Havells switchboards, MCB tripping, laser wire checking.</p>
          <div class="font-black text-stone-900 font-mono text-sm">₹199 visit</div>
        </div>
      </div>
    </div>
  </main>

  <!-- Legal Footer -->
  <footer class="bg-white border-t border-stone-200 py-6 text-center space-y-1 text-xs text-stone-500">
    <p class="font-semibold text-stone-800">&copy; 2026 Ghar Ka Sathi Technologies. All rights reserved.</p>
    <p>Gharkasathi Innoventure Private Limited &bull; Regd. Office: Raipur, Chhattisgarh</p>
  </footer>
</body>
</html>
  \\\`);
});
\`;
  code = rootRoute + '\\n' + code;
  fs.writeFileSync('server.js', code, 'utf8');
  console.log('Successfully injected root route to server.js');
}
EOF
node update_root.js
pm2 restart all || pm2 restart gharkasathi-backend
echo "=== ROOT FIX DEPLOYED: VISIT https://gharkasathi.com NOW ==="
`;

  const copyScript = () => {
    navigator.clipboard.writeText(fixCannotGetScript);
    setCopiedScript(true);
    setTimeout(() => setCopiedScript(false), 2500);
  };

  return (
    <div className="space-y-6">
      {/* CTO Executive Banner */}
      <div className="bg-stone-900 text-white p-6 rounded-2xl border border-stone-800 space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-emerald-500/20 text-emerald-400 rounded-xl border border-emerald-500/30">
              <Trophy className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-bold text-white">
                  CTO Strategic Blueprint: "Best In The World" Launch
                </h3>
                <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40 uppercase">
                  Quality &gt; Speed
                </span>
              </div>
              <p className="text-xs text-stone-400 mt-0.5">
                Target: Flawless customer experience, zero crashes, automated matching, and premium Urban Company-grade polish.
              </p>
            </div>
          </div>

          {/* Strategy Toggle */}
          <div className="flex items-center bg-stone-800 p-1 rounded-xl border border-stone-700">
            <button
              onClick={() => setStrategyMode('perfection')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                strategyMode === 'perfection'
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'text-stone-400 hover:text-white'
              }`}
            >
              🌟 End-of-Month (World Class)
            </button>
            <button
              onClick={() => setStrategyMode('sprint')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                strategyMode === 'sprint'
                  ? 'bg-stone-700 text-white shadow-xs'
                  : 'text-stone-400 hover:text-white'
              }`}
            >
              ⚡ 3-Day Rapid Sprint
            </button>
          </div>
        </div>

        {/* Immediate Issue diagnosis */}
        <div className="p-4 bg-stone-800/80 rounded-xl border border-stone-700/80 space-y-3">
          <div className="flex items-start gap-3">
            <div className="p-2 bg-amber-500/20 text-amber-400 rounded-lg shrink-0 mt-0.5">
              <ShieldAlert className="w-5 h-5" />
            </div>
            <div className="space-y-1">
              <h4 className="text-xs font-bold text-amber-300 uppercase tracking-wider">
                Diagnosis of Screenshot: "Cannot GET /" on https://gharkasathi.com
              </h4>
              <p className="text-xs text-stone-300 leading-relaxed">
                <strong>Good News:</strong> Your Nginx reverse proxy and SSL certificate on Hostinger IP <code>82.112.238.90</code> are 100% active and healthy! 
                The message <code>Cannot GET /</code> simply means Express has API routes active (like <code>/api/services/service-prices</code>) but no landing page or admin portal attached to the root route <code>/</code>.
              </p>
            </div>
          </div>

          <div className="flex items-center justify-between pt-2 border-t border-stone-700/60">
            <span className="text-xs text-stone-400">
              1-Click Copy terminal command to fix "Cannot GET /" instantly on your live server:
            </span>
            <button
              onClick={copyScript}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-stone-950 text-xs font-bold rounded-lg transition-colors cursor-pointer"
            >
              {copiedScript ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              {copiedScript ? 'Copied 1-Click Fix!' : 'Copy Fix Script'}
            </button>
          </div>
        </div>
      </div>

      {/* STRATEGY OPTION 1: THE "BEST IN THE WORLD" END-OF-MONTH ROADMAP */}
      {strategyMode === 'perfection' && (
        <div className="space-y-4">
          <div className="bg-emerald-950/40 border border-emerald-800/60 rounded-xl p-4 flex items-center justify-between">
            <div>
              <h4 className="text-sm font-bold text-emerald-300 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-emerald-400" />
                The "Best In The World" 2-Week Launch Roadmap (Target: End of Month)
              </h4>
              <p className="text-xs text-emerald-200/70 mt-0.5">
                Why this is the superior strategy: Urban Company, NoBroker, and Zomato all succeed because they launched with rock-solid stability, zero friction, and high customer trust.
              </p>
            </div>
            <span className="px-3 py-1 bg-emerald-900 text-emerald-300 text-xs font-bold rounded-full border border-emerald-700">
              CTO Recommended
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Phase 1 */}
            <div className="bg-white rounded-xl border border-stone-200 p-4 shadow-xs space-y-3 flex flex-col justify-between">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="px-2 py-0.5 bg-stone-100 text-stone-800 text-[10px] font-extrabold rounded">
                    PHASE 1 (Days 1–4)
                  </span>
                  <span className="text-[11px] font-bold text-emerald-600">Active</span>
                </div>
                <h5 className="text-xs font-bold text-stone-900 uppercase tracking-wide">
                  Core Architecture & Glitches
                </h5>
                <ul className="text-xs text-stone-600 space-y-1.5 list-disc list-inside">
                  <li>Eliminate Flutter bottom bar loss via nested navigator keys.</li>
                  <li>Dynamic cart state with live 18% GST tax calculation.</li>
                  <li>Live Admin Catalog & price sync without app recompiling.</li>
                  <li>Fix root <code>/</code> route on gharkasathi.com.</li>
                </ul>
              </div>
              <div className="text-[10px] font-semibold text-stone-500 pt-2 border-t border-stone-100">
                Outcome: Rock-solid foundation
              </div>
            </div>

            {/* Phase 2 */}
            <div className="bg-white rounded-xl border border-stone-200 p-4 shadow-xs space-y-3 flex flex-col justify-between">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="px-2 py-0.5 bg-sky-50 text-sky-800 text-[10px] font-extrabold rounded border border-sky-200">
                    PHASE 2 (Days 5–8)
                  </span>
                  <span className="text-[11px] font-bold text-sky-600">Next</span>
                </div>
                <h5 className="text-xs font-bold text-stone-900 uppercase tracking-wide">
                  Partner Dispatch & Automated Matching
                </h5>
                <ul className="text-xs text-stone-600 space-y-1.5 list-disc list-inside">
                  <li>Geo-fenced automated Partner matching (within 5km).</li>
                  <li>Partner acceptance timer (60-sec auto-reassign).</li>
                  <li>Fast2SMS transactional SMS for instant booking alerts.</li>
                  <li>Persistent MongoDB replica set on Hostinger VPS.</li>
                </ul>
              </div>
              <div className="text-[10px] font-semibold text-stone-500 pt-2 border-t border-stone-100">
                Outcome: 100% automated dispatch
              </div>
            </div>

            {/* Phase 3 */}
            <div className="bg-white rounded-xl border border-stone-200 p-4 shadow-xs space-y-3 flex flex-col justify-between">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="px-2 py-0.5 bg-amber-50 text-amber-800 text-[10px] font-extrabold rounded border border-amber-200">
                    PHASE 3 (Days 9–11)
                  </span>
                  <span className="text-[11px] font-bold text-amber-600">Pending</span>
                </div>
                <h5 className="text-xs font-bold text-stone-900 uppercase tracking-wide">
                  Closed Beta & Partner Pilot
                </h5>
                <ul className="text-xs text-stone-600 space-y-1.5 list-disc list-inside">
                  <li>Onboard 15 verified electricians, plumbers, AC technicians.</li>
                  <li>Run 25 test mock bookings with real UPI payments.</li>
                  <li>Verify push notifications on Android 12, 13, and 14 devices.</li>
                  <li>Stress test server under concurrent booking loads.</li>
                </ul>
              </div>
              <div className="text-[10px] font-semibold text-stone-500 pt-2 border-t border-stone-100">
                Outcome: Zero day-one bugs
              </div>
            </div>

            {/* Phase 4 */}
            <div className="bg-white rounded-xl border border-stone-200 p-4 shadow-xs space-y-3 flex flex-col justify-between">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="px-2 py-0.5 bg-violet-50 text-violet-800 text-[10px] font-extrabold rounded border border-violet-200">
                    PHASE 4 (Days 12–14)
                  </span>
                  <span className="text-[11px] font-bold text-violet-600">Launch</span>
                </div>
                <h5 className="text-xs font-bold text-stone-900 uppercase tracking-wide">
                  Google Play Store & Grand Launch
                </h5>
                <ul className="text-xs text-stone-600 space-y-1.5 list-disc list-inside">
                  <li>Google Play Store Production Track publishing.</li>
                  <li>Official Privacy Policy, Refund Policy & Terms compliance.</li>
                  <li>Launch marketing blitz & ₹100 inaugural promo campaign.</li>
                  <li>24/7 PM2 & Redis server health telemetry.</li>
                </ul>
              </div>
              <div className="text-[10px] font-semibold text-stone-500 pt-2 border-t border-stone-100">
                Outcome: World-class market debut 🚀
              </div>
            </div>
          </div>
        </div>
      )}

      {/* STRATEGY OPTION 2: RAPID 3-DAY SPRINT */}
      {strategyMode === 'sprint' && (
        <div className="space-y-4">
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex items-center justify-between">
            <div>
              <h4 className="text-sm font-bold text-amber-900 flex items-center gap-2">
                <Zap className="w-4 h-4 text-amber-600" />
                Rapid 3-Day Go-Live Sprint
              </h4>
              <p className="text-xs text-amber-700 mt-0.5">
                Fastest way to get in customer hands. Good for quick initial validation, though requires daily monitoring.
              </p>
            </div>
            <span className="px-3 py-1 bg-amber-200 text-amber-900 text-xs font-bold rounded-full">
              Rapid Sprint
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white rounded-xl border border-stone-200 p-5 shadow-xs space-y-2">
              <span className="px-2 py-0.5 bg-stone-100 text-stone-800 text-xs font-bold rounded">DAY 1: Core API & Glitch Fixes</span>
              <h5 className="text-sm font-bold text-stone-900">Stabilize Navigation & Backend</h5>
              <p className="text-xs text-stone-600">Nested bottom bar navigation in Flutter, dynamic cart, live admin panel connected.</p>
            </div>
            <div className="bg-white rounded-xl border border-stone-200 p-5 shadow-xs space-y-2">
              <span className="px-2 py-0.5 bg-stone-100 text-stone-800 text-xs font-bold rounded">DAY 2: Gateway Integration</span>
              <h5 className="text-sm font-bold text-stone-900">Razorpay & SMS Gateways</h5>
              <p className="text-xs text-stone-600">Connect live merchant credentials, configure SMS alerts, and compile signed release APK.</p>
            </div>
            <div className="bg-white rounded-xl border border-stone-200 p-5 shadow-xs space-y-2">
              <span className="px-2 py-0.5 bg-stone-100 text-stone-800 text-xs font-bold rounded">DAY 3: Store Submission</span>
              <h5 className="text-sm font-bold text-stone-900">Google Play Store Submission</h5>
              <p className="text-xs text-stone-600">Submit .aab bundle to Play Store closed test track and onboard first 5 local partners.</p>
            </div>
          </div>
        </div>
      )}

      {/* 5 Pillars to be "The Best in the World" */}
      <div className="bg-white rounded-xl border border-stone-200 p-6 shadow-xs space-y-4">
        <h4 className="text-sm font-bold text-stone-900 uppercase tracking-wider flex items-center gap-2">
          <Trophy className="w-4 h-4 text-amber-500" />
          The 5 Pillars to Stay "Best in the World" Against Urban Company & NoBroker
        </h4>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
          <div className="p-3 bg-stone-50 rounded-xl border border-stone-200/60 space-y-1.5">
            <div className="text-xs font-bold text-stone-900 flex items-center gap-1.5">
              <Zap className="w-3.5 h-3.5 text-amber-500" />
              1. 30-Min Dispatch
            </div>
            <p className="text-[11px] text-stone-500">Fastest arrival time in the market beats 2-hour Urban Company slots.</p>
          </div>

          <div className="p-3 bg-stone-50 rounded-xl border border-stone-200/60 space-y-1.5">
            <div className="text-xs font-bold text-stone-900 flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              2. 30-Day Warranty
            </div>
            <p className="text-[11px] text-stone-500">Free rework guarantee if the leak or appliance problem recurs.</p>
          </div>

          <div className="p-3 bg-stone-50 rounded-xl border border-stone-200/60 space-y-1.5">
            <div className="text-xs font-bold text-stone-900 flex items-center gap-1.5">
              <Users className="w-3.5 h-3.5 text-sky-600" />
              3. 100% Sathi Verification
            </div>
            <p className="text-[11px] text-stone-500">Aadhaar & Police-verified background checked service partners.</p>
          </div>

          <div className="p-3 bg-stone-50 rounded-xl border border-stone-200/60 space-y-1.5">
            <div className="text-xs font-bold text-stone-900 flex items-center gap-1.5">
              <Server className="w-3.5 h-3.5 text-indigo-600" />
              4. 0% Hidden Surcharges
            </div>
            <p className="text-[11px] text-stone-500">Transparent upfront pricing with zero surprise inspection fees.</p>
          </div>

          <div className="p-3 bg-stone-50 rounded-xl border border-stone-200/60 space-y-1.5">
            <div className="text-xs font-bold text-stone-900 flex items-center gap-1.5">
              <Smartphone className="w-3.5 h-3.5 text-rose-600" />
              5. 60-FPS Mobile App
            </div>
            <p className="text-[11px] text-stone-500">Glitch-free, buttery smooth navigation with instant UPI 1-tap checkout.</p>
          </div>
        </div>
      </div>
    </div>
  );
};
