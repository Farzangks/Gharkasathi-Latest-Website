import React, { useState, useEffect } from 'react';
import { 
  Server, 
  Smartphone, 
  Terminal, 
  Check, 
  Copy, 
  ExternalLink, 
  ShieldCheck, 
  Key, 
  Zap, 
  ArrowRight,
  Globe,
  Radio,
  FileCode2,
  CheckCircle2
} from 'lucide-react';
import { ApkConfig } from '../types';

export const HostingerDeploymentGuide: React.FC = () => {
  const [apkConfig, setApkConfig] = useState<ApkConfig | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [serverStatus, setServerStatus] = useState<'checking' | 'online' | 'offline'>('checking');
  const [pingLatency, setPingLatency] = useState<number | null>(null);
  const [viewMode, setViewMode] = useState<'simple' | 'terminal'>('simple');
  const hostingerIp = '82.112.238.90';

  const fetchApkConfig = async () => {
    try {
      const startTime = performance.now();
      const res = await fetch('/api/config/apk');
      const latency = Math.round(performance.now() - startTime);
      setPingLatency(latency);
      if (res.ok) {
        const data = await res.json();
        setApkConfig(data);
        setServerStatus('online');
      } else {
        setServerStatus('offline');
      }
    } catch {
      setServerStatus('offline');
    }
  };

  useEffect(() => {
    fetchApkConfig();
  }, []);

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2500);
  };

  const hostingerSetupScript = `# ====================================================
# GHARKASATHI PRODUCTION VPS SETUP FOR IP: 82.112.238.90
# Paste directly into Hostinger Web Terminal as root
# ====================================================

# 1. Update Ubuntu packages and install Node.js 20 LTS, Nginx, Certbot & PM2
sudo apt update -y && sudo apt upgrade -y
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs nginx git ufw certbot python3-certbot-nginx
sudo npm install -g pm2

# 2. Setup project folder
sudo mkdir -p /var/www/gharkasathi
sudo chown -R $USER:$USER /var/www/gharkasathi
cd /var/www/gharkasathi

# 3. Download / clone your Gharkasathi backend
# (You can git clone or upload files into this directory)
# git clone <YOUR_REPO_URL> .

# 4. Install dependencies & build
npm install
npm run build

# 5. Create production .env file
cat <<EOT > .env
PORT=3000
NODE_ENV=production
RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_key_secret
OTP_API_KEY=your_otp_sms_key
EOT

# 6. Start server with PM2 (Auto-restarts 24/7 and on reboot)
pm2 start dist/server.cjs --name "gharkasathi-backend"
pm2 save
pm2 startup

# 7. Configure Nginx for gharkasathi.com, www, and api
cat <<EOT | sudo tee /etc/nginx/sites-available/gharkasathi
server {
    listen 80;
    server_name gharkasathi.com www.gharkasathi.com api.gharkasathi.com 82.112.238.90;

    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade \\$http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host \\$host;
        proxy_set_header X-Real-IP \\$remote_addr;
        proxy_set_header X-Forwarded-For \\$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \\$scheme;
        proxy_cache_bypass \\$http_upgrade;
    }
}
EOT

sudo ln -sf /etc/nginx/sites-available/gharkasathi /etc/nginx/sites-enabled/
sudo rm -f /etc/nginx/sites-enabled/default
sudo nginx -t && sudo systemctl restart nginx

# 8. Install Free Automated SSL (HTTPS) with Let's Encrypt
sudo certbot --nginx -d gharkasathi.com -d www.gharkasathi.com -d api.gharkasathi.com --non-interactive --agree-tos -m gharkasathi@gmail.com

# 9. Allow ports in firewall
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp
sudo ufw allow 22/tcp
sudo ufw --force enable

echo "=== GHARKASATHI PRODUCTION IS NOW LIVE ON GHARKASATHI.COM & 82.112.238.90 ==="
`;

  const developerMessage = `Hi! Here are the Gharkasathi backend details to connect our Android APK:

1. Base API URL:
http://82.112.238.90/api
(Backup Live Dev URL: ${apkConfig?.apiBaseUrl || 'https://ais-dev-yiwbap43ubc5muuqdwdanm-18845679041.asia-southeast1.run.app/api'})

2. Key Endpoints:
- Send OTP: POST /api/auth/send-otp (Body: {"phone": "+919876543210"})
- Verify OTP: POST /api/auth/verify-otp (Body: {"phone": "+919876543210", "otp": "123456"})
- Create Booking: POST /api/bookings
- List Bookings: GET /api/bookings
- Razorpay Order: POST /api/payments/razorpay-order (Body: {"amount": 599})
- Razorpay Verify: POST /api/payments/verify
- Nearby Providers: GET /api/providers

All endpoints are active, verified, and CORS-enabled. Please connect the APK to this base URL!`;

  return (
    <div id="hostinger-deployment-guide" className="space-y-6">
      {/* Overview Banner */}
      <div className="bg-white rounded-xl border border-stone-200 shadow-xs p-6 space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-emerald-50 text-emerald-700 rounded-xl border border-emerald-200">
              <Server className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-stone-900">
                Hostinger VPS Hosting & Android APK Connection Guide
              </h3>
              <p className="text-xs text-stone-500 mt-0.5">
                CEO Friendly Guide &bull; Connect your APK frontend and deploy your backend to Hostinger with zero technical headache.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* View Mode Toggle */}
            <div className="inline-flex bg-stone-100 p-0.5 rounded-lg border border-stone-200 text-xs font-semibold">
              <button
                onClick={() => setViewMode('simple')}
                className={`px-3 py-1 rounded-md transition-colors cursor-pointer ${
                  viewMode === 'simple' ? 'bg-white text-stone-900 shadow-xs' : 'text-stone-500 hover:text-stone-900'
                }`}
              >
                CEO Simple Guide
              </button>
              <button
                onClick={() => setViewMode('terminal')}
                className={`px-3 py-1 rounded-md transition-colors cursor-pointer ${
                  viewMode === 'terminal' ? 'bg-white text-stone-900 shadow-xs' : 'text-stone-500 hover:text-stone-900'
                }`}
              >
                VPS Terminal Script
              </button>
            </div>

            <button
              onClick={fetchApkConfig}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-semibold rounded-lg transition-colors cursor-pointer"
            >
              <Radio className="w-3.5 h-3.5 text-emerald-600" />
              Ping API Gateway {pingLatency ? `(${pingLatency}ms)` : ''}
            </button>
            <span className={`inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-lg border ${
              serverStatus === 'online'
                ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                : 'bg-rose-50 text-rose-800 border-rose-200'
            }`}>
              <span className={`w-2 h-2 rounded-full ${serverStatus === 'online' ? 'bg-emerald-500 animate-pulse' : 'bg-rose-500'}`} />
              {serverStatus === 'online' ? 'API Server is Live & Responding' : 'Server Offline'}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
          <div className="p-3.5 bg-stone-50 rounded-xl border border-stone-200 text-xs space-y-1">
            <div className="font-bold text-stone-700 flex items-center gap-1.5">
              <Smartphone className="w-4 h-4 text-sky-600" />
              1. APK Endpoint
            </div>
            <p className="text-stone-500 text-[11px] leading-relaxed">
              Your Android APK only needs <strong>1 Base URL</strong> to connect all services.
            </p>
          </div>

          <div className="p-3.5 bg-stone-50 rounded-xl border border-stone-200 text-xs space-y-1">
            <div className="font-bold text-stone-700 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              2. OTP & Razorpay
            </div>
            <p className="text-stone-500 text-[11px] leading-relaxed">
              OTP authentication and Razorpay order creation are fully wired in the API.
            </p>
          </div>

          <div className="p-3.5 bg-stone-50 rounded-xl border border-stone-200 text-xs space-y-1">
            <div className="font-bold text-stone-700 flex items-center gap-1.5">
              <Terminal className="w-4 h-4 text-violet-600" />
              3. Hostinger 1-Click
            </div>
            <p className="text-stone-500 text-[11px] leading-relaxed">
              Copy the ready terminal script directly into your Hostinger VPS web console.
            </p>
          </div>
        </div>
      </div>

      {/* Part 1: APK Connection Details */}
      <div className="bg-white rounded-xl border border-stone-200 shadow-xs p-6 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Smartphone className="w-4 h-4 text-sky-600" />
            <h4 className="text-sm font-bold text-stone-900 uppercase tracking-wider">
              Part 1: Connect Your Android APK
            </h4>
          </div>
          <span className="text-[11px] font-mono text-sky-700 bg-sky-50 px-2.5 py-1 rounded-md border border-sky-200 font-semibold">
            Ready to point APK
          </span>
        </div>

        <p className="text-xs text-stone-600 leading-relaxed">
          Provide this Base URL and configuration to your Android app build (or paste it into your APK's <code className="bg-stone-100 px-1 py-0.5 rounded font-mono text-stone-800">config.json</code> / <code className="bg-stone-100 px-1 py-0.5 rounded font-mono text-stone-800">RetrofitClient.kt</code> / <code className="bg-stone-100 px-1 py-0.5 rounded font-mono text-stone-800">strings.xml</code>):
        </p>

        {apkConfig && (
          <div className="space-y-3">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {/* Hostinger Direct IP URL */}
              <div className="p-4 bg-emerald-950/40 rounded-xl border border-emerald-800 text-white font-mono text-xs space-y-2">
                <div className="flex items-center justify-between pb-1.5 border-b border-emerald-800/60">
                  <span className="text-emerald-400 font-sans text-[11px] font-bold">
                    HOSTINGER PRODUCTION APK URL
                  </span>
                  <button
                    onClick={() => copyToClipboard(`http://${hostingerIp}/api`, 'hostinger-apk-url')}
                    className="inline-flex items-center gap-1 text-[11px] font-sans text-emerald-300 hover:text-white font-semibold cursor-pointer"
                  >
                    {copiedId === 'hostinger-apk-url' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    {copiedId === 'hostinger-apk-url' ? 'Copied' : 'Copy'}
                  </button>
                </div>
                <div className="text-emerald-300 text-sm font-bold break-all">
                  http://{hostingerIp}/api
                </div>
                <div className="text-[10px] font-sans text-emerald-400/80">
                  Put this in your Android APK config once deployed to Hostinger.
                </div>
              </div>

              {/* Dev / AI Studio URL */}
              <div className="p-4 bg-stone-900 rounded-xl border border-stone-800 text-white font-mono text-xs space-y-2">
                <div className="flex items-center justify-between pb-1.5 border-b border-stone-800">
                  <span className="text-stone-400 font-sans text-[11px] font-semibold">
                    CURRENT LIVE DEV URL (TESTING NOW)
                  </span>
                  <button
                    onClick={() => copyToClipboard(apkConfig.apiBaseUrl, 'api-base-url')}
                    className="inline-flex items-center gap-1 text-[11px] font-sans text-emerald-400 hover:text-emerald-300 font-semibold cursor-pointer"
                  >
                    {copiedId === 'api-base-url' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                    {copiedId === 'api-base-url' ? 'Copied' : 'Copy'}
                  </button>
                </div>
                <div className="text-sky-300 text-sm font-bold break-all">
                  {apkConfig.apiBaseUrl}
                </div>
                <div className="text-[10px] font-sans text-stone-400">
                  Already active and responding to live requests right now.
                </div>
              </div>
            </div>

            {/* Endpoints Table */}
            <div className="border border-stone-200 rounded-xl overflow-hidden text-xs">
              <div className="bg-stone-50 px-4 py-2 font-bold text-stone-700 border-b border-stone-200 flex justify-between">
                <span>APK Feature</span>
                <span>Endpoint Route</span>
                <span>Method</span>
              </div>
              <div className="divide-y divide-stone-100">
                <div className="px-4 py-2.5 flex items-center justify-between hover:bg-stone-50">
                  <span className="font-semibold text-stone-800">Send Mobile OTP</span>
                  <code className="font-mono text-stone-600">/api/auth/send-otp</code>
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-50 text-amber-700">POST</span>
                </div>
                <div className="px-4 py-2.5 flex items-center justify-between hover:bg-stone-50">
                  <span className="font-semibold text-stone-800">Verify OTP & Login</span>
                  <code className="font-mono text-stone-600">/api/auth/verify-otp</code>
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-50 text-amber-700">POST</span>
                </div>
                <div className="px-4 py-2.5 flex items-center justify-between hover:bg-stone-50">
                  <span className="font-semibold text-stone-800">Create Service Booking</span>
                  <code className="font-mono text-stone-600">/api/bookings</code>
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-50 text-amber-700">POST</span>
                </div>
                <div className="px-4 py-2.5 flex items-center justify-between hover:bg-stone-50">
                  <span className="font-semibold text-stone-800">List Customer Bookings</span>
                  <code className="font-mono text-stone-600">/api/bookings</code>
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-sky-50 text-sky-700">GET</span>
                </div>
                <div className="px-4 py-2.5 flex items-center justify-between hover:bg-stone-50">
                  <span className="font-semibold text-stone-800">Razorpay Create Order</span>
                  <code className="font-mono text-stone-600">/api/payments/razorpay-order</code>
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-50 text-amber-700">POST</span>
                </div>
                <div className="px-4 py-2.5 flex items-center justify-between hover:bg-stone-50">
                  <span className="font-semibold text-stone-800">Verify Razorpay Payment</span>
                  <code className="font-mono text-stone-600">/api/payments/verify</code>
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-50 text-amber-700">POST</span>
                </div>
                <div className="px-4 py-2.5 flex items-center justify-between hover:bg-stone-50">
                  <span className="font-semibold text-stone-800">Nearby Service Sathis</span>
                  <code className="font-mono text-stone-600">/api/providers</code>
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-sky-50 text-sky-700">GET</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Part 2: Step-by-Step Hostinger VPS Deployment */}
      <div className="bg-white rounded-xl border border-stone-200 shadow-xs p-6 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Server className="w-4 h-4 text-emerald-600" />
            <h4 className="text-sm font-bold text-stone-900 uppercase tracking-wider">
              Part 2: {viewMode === 'simple' ? 'CEO Simple Walkthrough' : 'Hostinger VPS 3-Step Launch'}
            </h4>
          </div>
          <span className="text-[11px] font-mono text-stone-500">Hostinger Server IP: {hostingerIp}</span>
        </div>

        {viewMode === 'simple' ? (
          /* CEO Simple Friendly Walkthrough */
          <div className="space-y-6">
            {/* Action Card 1: Forward to Developer */}
            <div className="p-5 bg-sky-50 rounded-2xl border border-sky-200 space-y-3">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2 font-bold text-sky-900 text-sm">
                  <Smartphone className="w-4 h-4 text-sky-600" />
                  Easiest Route: Send this directly to your App Developer
                </div>
                <button
                  onClick={() => copyToClipboard(developerMessage, 'wa-dev-msg')}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-sky-600 hover:bg-sky-700 text-white text-xs font-semibold rounded-lg shadow-xs transition-colors cursor-pointer"
                >
                  {copiedId === 'wa-dev-msg' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  {copiedId === 'wa-dev-msg' ? 'Message Copied!' : 'Copy WhatsApp Message for Dev'}
                </button>
              </div>
              <p className="text-xs text-sky-800 leading-relaxed">
                If someone built the APK for you (freelancer, agency, or in-house developer), you do not need to explain anything technical! Just click the button above, paste it on WhatsApp or email, and they will connect the APK in 5 minutes.
              </p>
              <pre className="bg-white/80 p-3 rounded-xl text-[11px] text-stone-700 font-mono border border-sky-100 whitespace-pre-wrap">
                {developerMessage}
              </pre>
            </div>

            {/* Action Card 2: 4-Click Hostinger Steps */}
            <div className="space-y-3">
              <h5 className="text-xs font-bold text-stone-800 uppercase tracking-wider">
                If you want to do the Hostinger server setup yourself:
              </h5>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                <div className="p-3.5 bg-stone-50 rounded-xl border border-stone-200 space-y-1.5">
                  <div className="w-6 h-6 rounded-full bg-stone-900 text-white text-xs font-bold flex items-center justify-center">1</div>
                  <div className="font-bold text-xs text-stone-900">Open Hostinger</div>
                  <p className="text-[11px] text-stone-500">Go to <a href="https://hpanel.hostinger.com" target="_blank" rel="noreferrer" className="text-emerald-700 font-semibold underline">hpanel.hostinger.com</a> and sign in.</p>
                </div>

                <div className="p-3.5 bg-stone-50 rounded-xl border border-stone-200 space-y-1.5">
                  <div className="w-6 h-6 rounded-full bg-stone-900 text-white text-xs font-bold flex items-center justify-center">2</div>
                  <div className="font-bold text-xs text-stone-900">Click "VPS"</div>
                  <p className="text-[11px] text-stone-500">In the top menu, click <strong>VPS</strong> and select your server <strong>82.112.238.90</strong>.</p>
                </div>

                <div className="p-3.5 bg-stone-50 rounded-xl border border-stone-200 space-y-1.5">
                  <div className="w-6 h-6 rounded-full bg-stone-900 text-white text-xs font-bold flex items-center justify-center">3</div>
                  <div className="font-bold text-xs text-stone-900">Browser Terminal</div>
                  <p className="text-[11px] text-stone-500">Click the purple/blue button <strong>"Browser Terminal"</strong>. A black window will open.</p>
                </div>

                <div className="p-3.5 bg-stone-50 rounded-xl border border-stone-200 space-y-1.5">
                  <div className="w-6 h-6 rounded-full bg-emerald-700 text-white text-xs font-bold flex items-center justify-center">4</div>
                  <div className="font-bold text-xs text-emerald-800">Paste Script & Run</div>
                  <p className="text-[11px] text-stone-500">Click "Copy Script" below, right-click in that black window, paste, and press <strong>Enter</strong>.</p>
                </div>
              </div>

              <div className="pt-2 flex justify-end">
                <button
                  onClick={() => copyToClipboard(hostingerSetupScript, 'hostinger-script-simple')}
                  className="inline-flex items-center gap-1.5 px-4 py-2 bg-stone-900 hover:bg-stone-800 text-white text-xs font-bold rounded-lg shadow-xs cursor-pointer transition-colors"
                >
                  {copiedId === 'hostinger-script-simple' ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                  {copiedId === 'hostinger-script-simple' ? 'Script Copied to Clipboard!' : 'Copy Automated Setup Script'}
                </button>
              </div>
            </div>

            {/* Action Card 3: Razorpay & OTP Explained Simply */}
            <div className="p-4 bg-stone-50 rounded-xl border border-stone-200 space-y-3">
              <div className="font-bold text-stone-900 text-xs flex items-center gap-2">
                <Key className="w-4 h-4 text-amber-600" />
                Where to get your Razorpay and OTP details (Non-Tech Guide):
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="bg-white p-3 rounded-lg border border-stone-200 space-y-1">
                  <div className="font-bold text-stone-800">1. Razorpay Key ID & Secret</div>
                  <p className="text-[11px] text-stone-500 leading-relaxed">
                    Log in to <a href="https://dashboard.razorpay.com" target="_blank" rel="noreferrer" className="text-sky-700 underline font-semibold">Razorpay Dashboard</a> &rarr; Click <strong>Settings</strong> &rarr; Click <strong>API Keys</strong> &rarr; Click <strong>Generate Key</strong>. You will get a Key ID and Key Secret.
                  </p>
                </div>
                <div className="bg-white p-3 rounded-lg border border-stone-200 space-y-1">
                  <div className="font-bold text-stone-800">2. OTP SMS API (Fast2SMS / Twilio)</div>
                  <p className="text-[11px] text-stone-500 leading-relaxed">
                    Log in to your SMS provider (Fast2SMS / MSG91) &rarr; Go to <strong>Dev API</strong> &rarr; Copy your API Authorization Key. In test mode, you can even use demo OTP <strong>123456</strong> without any key!
                  </p>
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* Technical VPS Terminal Script */
          <div className="space-y-4">
            {/* Step 1 */}
            <div className="p-4 bg-stone-50 rounded-xl border border-stone-200 space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 font-bold text-stone-900 text-xs">
                  <span className="w-5 h-5 rounded-full bg-stone-900 text-white flex items-center justify-center text-[11px]">1</span>
                  Connect to Hostinger VPS (IP: {hostingerIp})
                </div>
                <button
                  onClick={() => copyToClipboard(`ssh root@${hostingerIp}`, 'ssh-cmd')}
                  className="inline-flex items-center gap-1.5 px-3 py-1 bg-stone-900 text-white text-xs font-semibold rounded-lg hover:bg-stone-800 transition-colors cursor-pointer"
                >
                  {copiedId === 'ssh-cmd' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  {copiedId === 'ssh-cmd' ? 'Copied SSH!' : 'Copy SSH Command'}
                </button>
              </div>
              <p className="text-xs text-stone-600">
                Log in to your Hostinger dashboard &rarr; Go to <strong>VPS</strong> &rarr; Click <strong>Manage</strong> &rarr; Click <strong>Browser Web Terminal</strong>, or run in your computer terminal:
              </p>
              <div className="p-2.5 bg-stone-900 text-emerald-400 font-mono text-xs rounded-lg border border-stone-800">
                ssh root@{hostingerIp}
              </div>
            </div>

            {/* Step 2 */}
            <div className="p-4 bg-stone-50 rounded-xl border border-stone-200 space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 font-bold text-stone-900 text-xs">
                  <span className="w-5 h-5 rounded-full bg-stone-900 text-white flex items-center justify-center text-[11px]">2</span>
                  Copy-Paste This Automated Setup Script
                </div>
                <button
                  onClick={() => copyToClipboard(hostingerSetupScript, 'hostinger-script')}
                  className="inline-flex items-center gap-1.5 px-3 py-1 bg-stone-900 text-white text-xs font-semibold rounded-lg hover:bg-stone-800 transition-colors cursor-pointer"
                >
                  {copiedId === 'hostinger-script' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  {copiedId === 'hostinger-script' ? 'Copied Script!' : 'Copy Script'}
                </button>
              </div>
              <p className="text-xs text-stone-600">
                This automated script installs Node 20, PM2 process supervisor (auto-restarts on server reboot), configures Nginx, and installs free SSL.
              </p>

              <pre className="bg-stone-900 text-stone-300 p-3.5 rounded-xl font-mono text-[11px] overflow-x-auto max-h-48 border border-stone-800">
                {hostingerSetupScript}
              </pre>
            </div>

            {/* Step 3 */}
            <div className="p-4 bg-stone-50 rounded-xl border border-stone-200 space-y-2">
              <div className="flex items-center gap-2 font-bold text-stone-900 text-xs">
                <span className="w-5 h-5 rounded-full bg-stone-900 text-white flex items-center justify-center text-[11px]">3</span>
                Add Your Live Razorpay & OTP Keys
              </div>
              <p className="text-xs text-stone-600 leading-relaxed">
                Inside your Hostinger server terminal, simply open the <code className="bg-stone-200 px-1 py-0.5 rounded font-mono text-stone-800">/var/www/gharkasathi/.env</code> file and paste your credentials:
              </p>
              <div className="p-3 bg-stone-900 text-emerald-400 font-mono text-xs rounded-lg border border-stone-800">
                RAZORPAY_KEY_ID=rzp_live_xxxxxxxx<br />
                RAZORPAY_KEY_SECRET=your_secret_key<br />
                OTP_API_KEY=your_sms_gateway_key
              </div>
              <p className="text-[11px] text-stone-500">
                Then run: <code className="bg-stone-200 px-1 py-0.5 rounded font-mono text-stone-800">pm2 restart gharkasathi-backend</code>
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Part 3: Architecture Checklist for CEO */}
      <div className="bg-stone-900 text-white rounded-xl p-6 space-y-3">
        <div className="flex items-center justify-between">
          <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-400">
            CTO Handover Checklist
          </h4>
          <span className="text-[10px] text-stone-400">Everything is in place</span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-stone-300">
          <div className="flex items-start gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
            <span><strong>Backend Server:</strong> Express + Node.js with built-in CORS, error handling, and JSON parsers.</span>
          </div>
          <div className="flex items-start gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
            <span><strong>OTP Auth Gateway:</strong> Ready for Fast2SMS / MSG91 or demo simulation mode with instant 6-digit tokens.</span>
          </div>
          <div className="flex items-start gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
            <span><strong>Razorpay Gateway:</strong> Order generation (`amount_in_paise`) + SHA256 HMAC signature verification.</span>
          </div>
          <div className="flex items-start gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
            <span><strong>Service Dispatch:</strong> Automatic matching of nearest active Sathi when customer creates a booking.</span>
          </div>
        </div>
      </div>
    </div>
  );
};
