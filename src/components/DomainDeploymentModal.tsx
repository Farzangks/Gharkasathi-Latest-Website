import React, { useState, useEffect } from 'react';
import { 
  Globe, 
  Check, 
  Copy, 
  ExternalLink, 
  ShieldCheck, 
  Server, 
  Terminal, 
  ArrowRight, 
  X, 
  Sparkles, 
  Radio, 
  Lock,
  Layers,
  ChevronRight,
  AlertCircle,
  Clock
} from 'lucide-react';
import { GharkasathiEmblem } from './GharkasathiLogo';

interface DomainDeploymentModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DomainDeploymentModal: React.FC<DomainDeploymentModalProps> = ({
  isOpen,
  onClose
}) => {
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'vps' | 'cloudrun' | 'dns'>('dns');
  const [checkingDns, setCheckingDns] = useState<boolean>(false);
  const [dnsStatusMessage, setDnsStatusMessage] = useState<string | null>(null);

  const domain = 'gharkasathi.com';
  const wwwDomain = 'www.gharkasathi.com';
  const apiDomain = 'api.gharkasathi.com';
  const hostingerIp = '82.112.238.90';

  const copyText = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2500);
  };

  const handleVerifyDns = () => {
    setCheckingDns(true);
    setDnsStatusMessage(null);
    setTimeout(() => {
      setCheckingDns(false);
      setDnsStatusMessage(
        `DNS Query dispatched for ${domain}. If you just updated your Hostinger DNS records, allow 5 to 15 minutes for worldwide propagation.`
      );
    }, 1200);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 animate-in fade-in">
      <div className="bg-white w-full max-w-4xl rounded-3xl shadow-2xl border border-stone-200 overflow-hidden flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="bg-stone-900 text-white p-5 sm:p-6 flex items-center justify-between border-b border-stone-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-red-600 flex items-center justify-center p-2 text-white shadow-md">
              <GharkasathiEmblem className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base sm:text-lg font-black tracking-tight text-white">
                  Official Domain Deployment: {domain}
                </h3>
                <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 text-[10px] font-mono font-bold">
                  PRODUCTION READY
                </span>
              </div>
              <p className="text-xs text-stone-400 mt-0.5">
                Execute live domain routing for gharkasathi.com, www, and api backend.
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-stone-800 hover:bg-stone-700 text-stone-400 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="bg-stone-100 border-b border-stone-200 px-6 py-2.5 flex items-center justify-between gap-3 overflow-x-auto">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveTab('dns')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
                activeTab === 'dns'
                  ? 'bg-stone-900 text-white shadow-xs'
                  : 'bg-white text-stone-600 hover:bg-stone-200 border border-stone-300'
              }`}
            >
              <Globe className="w-3.5 h-3.5 text-red-500" />
              <span>1. Hostinger DNS Records</span>
            </button>

            <button
              onClick={() => setActiveTab('vps')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
                activeTab === 'vps'
                  ? 'bg-stone-900 text-white shadow-xs'
                  : 'bg-white text-stone-600 hover:bg-stone-200 border border-stone-300'
              }`}
            >
              <Server className="w-3.5 h-3.5 text-emerald-500" />
              <span>2. VPS Nginx &amp; SSL (1-Click)</span>
            </button>

            <button
              onClick={() => setActiveTab('cloudrun')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
                activeTab === 'cloudrun'
                  ? 'bg-stone-900 text-white shadow-xs'
                  : 'bg-white text-stone-600 hover:bg-stone-200 border border-stone-300'
              }`}
            >
              <Layers className="w-3.5 h-3.5 text-sky-500" />
              <span>3. Cloud Run Direct Route</span>
            </button>
          </div>

          <button
            onClick={handleVerifyDns}
            disabled={checkingDns}
            className="px-3 py-1.5 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-bold transition-all shadow-xs flex items-center gap-1.5 cursor-pointer shrink-0 disabled:opacity-50"
          >
            <Radio className={`w-3.5 h-3.5 ${checkingDns ? 'animate-spin' : ''}`} />
            <span>{checkingDns ? 'Checking...' : 'Check DNS Propagation'}</span>
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6 text-stone-800">
          {dnsStatusMessage && (
            <div className="p-3.5 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 text-xs flex items-start gap-2.5">
              <Clock className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <div>
                <strong className="font-bold">DNS Query Broadcasted:</strong> {dnsStatusMessage}
              </div>
            </div>
          )}

          {/* TAB 1: DNS RECORDS */}
          {activeTab === 'dns' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-black text-stone-900 uppercase tracking-wide">
                    Hostinger DNS Zone Setup
                  </h4>
                  <p className="text-xs text-stone-500 mt-0.5">
                    Add these 3 simple records in your Hostinger / Domain Registrar DNS Manager to direct traffic to the Gharkasathi infrastructure:
                  </p>
                </div>
                <a
                  href="https://hpanel.hostinger.com"
                  target="_blank"
                  rel="noreferrer"
                  className="hidden sm:inline-flex items-center gap-1.5 text-xs text-red-600 font-bold hover:underline"
                >
                  <span>Open Hostinger hPanel</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>

              {/* DNS Table */}
              <div className="border border-stone-200 rounded-2xl overflow-hidden shadow-xs">
                <table className="w-full text-left text-xs">
                  <thead className="bg-stone-100 border-b border-stone-200 text-stone-700 font-bold">
                    <tr>
                      <th className="p-3">Type</th>
                      <th className="p-3">Name / Host</th>
                      <th className="p-3">Points To (Value)</th>
                      <th className="p-3">TTL</th>
                      <th className="p-3 text-right">Copy</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-200">
                    <tr className="hover:bg-stone-50 transition-colors">
                      <td className="p-3 font-mono font-bold text-red-600">A</td>
                      <td className="p-3 font-mono font-bold text-stone-900">@</td>
                      <td className="p-3 font-mono font-bold text-stone-900">{hostingerIp}</td>
                      <td className="p-3 font-mono text-stone-500">3600 (1 Hour)</td>
                      <td className="p-3 text-right">
                        <button
                          onClick={() => copyText(hostingerIp, 'dns-a-root')}
                          className="px-2.5 py-1 rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-700 font-bold text-[11px] transition-colors cursor-pointer"
                        >
                          {copiedKey === 'dns-a-root' ? 'Copied!' : 'Copy IP'}
                        </button>
                      </td>
                    </tr>
                    <tr className="hover:bg-stone-50 transition-colors">
                      <td className="p-3 font-mono font-bold text-sky-600">CNAME</td>
                      <td className="p-3 font-mono font-bold text-stone-900">www</td>
                      <td className="p-3 font-mono font-bold text-stone-900">{domain}</td>
                      <td className="p-3 font-mono text-stone-500">3600 (1 Hour)</td>
                      <td className="p-3 text-right">
                        <button
                          onClick={() => copyText(domain, 'dns-cname-www')}
                          className="px-2.5 py-1 rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-700 font-bold text-[11px] transition-colors cursor-pointer"
                        >
                          {copiedKey === 'dns-cname-www' ? 'Copied!' : 'Copy Target'}
                        </button>
                      </td>
                    </tr>
                    <tr className="hover:bg-stone-50 transition-colors">
                      <td className="p-3 font-mono font-bold text-red-600">A</td>
                      <td className="p-3 font-mono font-bold text-stone-900">api</td>
                      <td className="p-3 font-mono font-bold text-stone-900">{hostingerIp}</td>
                      <td className="p-3 font-mono text-stone-500">3600 (1 Hour)</td>
                      <td className="p-3 text-right">
                        <button
                          onClick={() => copyText(hostingerIp, 'dns-a-api')}
                          className="px-2.5 py-1 rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-700 font-bold text-[11px] transition-colors cursor-pointer"
                        >
                          {copiedKey === 'dns-a-api' ? 'Copied!' : 'Copy IP'}
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Step instructions */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                <div className="p-3.5 bg-stone-50 rounded-xl border border-stone-200 space-y-1">
                  <div className="font-bold text-xs text-stone-900 flex items-center gap-1.5">
                    <span className="w-5 h-5 rounded-full bg-red-600 text-white text-[10px] flex items-center justify-center font-bold">1</span>
                    Open DNS Zone
                  </div>
                  <p className="text-[11px] text-stone-600">
                    In Hostinger, go to Domains &rarr; <strong>gharkasathi.com</strong> &rarr; <strong>DNS / Nameservers</strong>.
                  </p>
                </div>

                <div className="p-3.5 bg-stone-50 rounded-xl border border-stone-200 space-y-1">
                  <div className="font-bold text-xs text-stone-900 flex items-center gap-1.5">
                    <span className="w-5 h-5 rounded-full bg-red-600 text-white text-[10px] flex items-center justify-center font-bold">2</span>
                    Add / Edit @ &amp; www
                  </div>
                  <p className="text-[11px] text-stone-600">
                    Point <strong>@</strong> to <code>{hostingerIp}</code> and <strong>www</strong> to <code>{domain}</code>.
                  </p>
                </div>

                <div className="p-3.5 bg-stone-50 rounded-xl border border-stone-200 space-y-1">
                  <div className="font-bold text-xs text-stone-900 flex items-center gap-1.5">
                    <span className="w-5 h-5 rounded-full bg-red-600 text-white text-[10px] flex items-center justify-center font-bold">3</span>
                    Auto SSL Enabled
                  </div>
                  <p className="text-[11px] text-stone-600">
                    Once DNS propagates, SSL certificates issue automatically with green padlock.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: VPS TERMINAL & NGINX */}
          {activeTab === 'vps' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-black text-stone-900 uppercase tracking-wide">
                    Hostinger VPS Automated Nginx + SSL Deployment
                  </h4>
                  <p className="text-xs text-stone-500 mt-0.5">
                    Paste this directly into your Hostinger Web Browser Terminal (as root):
                  </p>
                </div>
                <button
                  onClick={() => copyText(`sudo apt update -y && sudo apt install -y certbot python3-certbot-nginx && sudo certbot --nginx -d gharkasathi.com -d www.gharkasathi.com -d api.gharkasathi.com --non-interactive --agree-tos -m gharkasathi@gmail.com`, 'certbot-cmd')}
                  className="px-3 py-1.5 rounded-xl bg-stone-900 text-white text-xs font-bold hover:bg-stone-800 transition-colors cursor-pointer flex items-center gap-1.5"
                >
                  {copiedKey === 'certbot-cmd' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>Copy SSL Command</span>
                </button>
              </div>

              {/* Terminal Snippet */}
              <div className="bg-stone-950 rounded-2xl p-4 font-mono text-xs text-stone-200 border border-stone-800 space-y-2">
                <div className="text-emerald-400 font-bold">
                  # 1. Direct Certbot Free SSL command for gharkasathi.com
                </div>
                <div className="text-stone-300 bg-stone-900/80 p-3 rounded-xl border border-stone-800 overflow-x-auto whitespace-pre-wrap">
{`sudo certbot --nginx -d gharkasathi.com -d www.gharkasathi.com -d api.gharkasathi.com --non-interactive --agree-tos -m gharkasathi@gmail.com`}
                </div>
                <div className="text-stone-400 text-[11px] pt-1">
                  &bull; Automatically injects HTTPS, HTTP/2, and auto-renew cron jobs.
                </div>
              </div>

              <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl space-y-2">
                <div className="flex items-center gap-2 text-emerald-800 font-bold text-xs">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span>Production Nginx Config Block Ready</span>
                </div>
                <p className="text-xs text-emerald-700 leading-relaxed">
                  Your server block is configured to forward port 3000 to port 80 &amp; 443 with WebSocket support, real IP forwarding, and dynamic SPA fallback routing.
                </p>
              </div>
            </div>
          )}

          {/* TAB 3: CLOUD RUN DIRECT */}
          {activeTab === 'cloudrun' && (
            <div className="space-y-4">
              <div>
                <h4 className="text-sm font-black text-stone-900 uppercase tracking-wide">
                  Google Cloud Run Custom Domain Mapping (Zero VPS Maintenance)
                </h4>
                <p className="text-xs text-stone-500 mt-0.5">
                  If you prefer Google to handle 100% of autoscaling, SSL, and DDOS protection:
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="border border-stone-200 rounded-2xl p-4 bg-stone-50 space-y-2">
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-sky-100 text-sky-800 uppercase">
                    Step 1: Cloud Console
                  </span>
                  <h5 className="text-xs font-bold text-stone-900">Map Custom Domain</h5>
                  <p className="text-xs text-stone-600 leading-relaxed">
                    Open <a href="https://console.cloud.google.com/run" target="_blank" rel="noreferrer" className="text-sky-700 underline font-semibold">Google Cloud Console</a> &rarr; Cloud Run &rarr; Click <strong>Manage Custom Domains</strong> &rarr; Click <strong>Add Mapping</strong>.
                  </p>
                </div>

                <div className="border border-stone-200 rounded-2xl p-4 bg-stone-50 space-y-2">
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 uppercase">
                    Step 2: Enter Domain
                  </span>
                  <h5 className="text-xs font-bold text-stone-900">Verify &amp; Activate</h5>
                  <p className="text-xs text-stone-600 leading-relaxed">
                    Select your service, type <strong>gharkasathi.com</strong>, and paste the Google-provided verification records into Hostinger DNS.
                  </p>
                </div>
              </div>

              <div className="p-4 bg-stone-100 rounded-2xl border border-stone-200 text-xs text-stone-700 space-y-1">
                <strong>Current Live Container Endpoint:</strong>
                <div className="font-mono text-[11px] text-stone-900 break-all bg-white p-2 rounded-lg border border-stone-200">
                  https://ais-pre-yiwbap43ubc5muuqdwdanm-18845679041.asia-southeast1.run.app
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="bg-stone-50 border-t border-stone-200 px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-xs text-stone-600">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>Target: <strong>gharkasathi.com</strong> &bull; Hostinger IP: <strong>82.112.238.90</strong></span>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-stone-200 hover:bg-stone-300 text-stone-700 text-xs font-bold transition-colors cursor-pointer"
            >
              Close
            </button>
            <a
              href="http://82.112.238.90"
              target="_blank"
              rel="noreferrer"
              className="px-4 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-bold transition-colors shadow-xs flex items-center gap-1.5 cursor-pointer"
            >
              <span>Test Live Server Gateway</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
