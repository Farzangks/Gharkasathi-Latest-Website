import React, { useState } from 'react';
import { 
  X, 
  Upload, 
  Check, 
  Code, 
  Image as ImageIcon, 
  RefreshCw, 
  Download,
  AlertCircle,
  ShieldCheck,
  Eye,
  Play
} from 'lucide-react';
import { GharkasathiLogo, GharkasathiEmblem } from './GharkasathiLogo';

interface BrandLogoModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogoUpdated?: () => void;
}

export const BrandLogoModal: React.FC<BrandLogoModalProps> = ({
  isOpen,
  onClose,
  onLogoUpdated,
}) => {
  const [activeTab, setActiveTab] = useState<'preview' | 'upload' | 'paste-code'>('preview');
  const [svgInput, setSvgInput] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [statusMessage, setStatusMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.name.endsWith('.svg') && file.type !== 'image/svg+xml') {
      setStatusMessage({ type: 'error', text: 'Please select an official vector SVG file (.svg).' });
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      if (content && content.includes('<svg')) {
        setSvgInput(content);
        setActiveTab('paste-code');
        setStatusMessage({ type: 'success', text: `Loaded ${file.name} successfully. Review below and click Apply.` });
      } else {
        setStatusMessage({ type: 'error', text: 'Selected file is not a valid SVG.' });
      }
    };
    reader.readAsText(file);
  };

  const handleResetToDefault = () => {
    localStorage.removeItem('gharkasathi_custom_logo_svg');
    window.dispatchEvent(new Event('gharkasathi_logo_updated'));
    setStatusMessage({ type: 'success', text: 'Restored default Gharkasathi™ trademark emblem & wordmark.' });
    if (onLogoUpdated) onLogoUpdated();
  };

  const handleSaveSvg = async () => {
    if (!svgInput.trim() || !svgInput.includes('<svg')) {
      setStatusMessage({ type: 'error', text: 'Please paste valid SVG code starting with <svg>.' });
      return;
    }

    setIsSubmitting(true);
    setStatusMessage(null);

    try {
      // 1. Immediately store to browser localStorage for instantaneous reactive UI update
      localStorage.setItem('gharkasathi_custom_logo_svg', svgInput.trim());
      window.dispatchEvent(new Event('gharkasathi_logo_updated'));

      // 2. Persist to project server /public/logo.svg
      const res = await fetch('/api/brand/logo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ svgContent: svgInput.trim() }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setStatusMessage({ type: 'success', text: 'Brand logo updated and saved directly to the project!' });
        if (onLogoUpdated) onLogoUpdated();
        setTimeout(() => {
          onClose();
        }, 1500);
      } else {
        // Even if server file write fails, client-side is updated
        setStatusMessage({ type: 'success', text: 'Logo applied to website preview!' });
        if (onLogoUpdated) onLogoUpdated();
      }
    } catch (err: any) {
      // Still applied via localStorage
      setStatusMessage({ type: 'success', text: 'Logo applied to website preview!' });
      if (onLogoUpdated) onLogoUpdated();
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fade-in">
      <div className="bg-white w-full max-w-3xl rounded-3xl shadow-2xl border border-stone-200 overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="bg-stone-900 text-white p-5 sm:p-6 flex items-center justify-between border-b border-stone-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-red-600 flex items-center justify-center p-1.5 shadow-md">
              <GharkasathiEmblem className="w-7 h-7 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-black tracking-tight text-white">
                  Gharkasathi™ Brand Identity &amp; Logo Center
                </h3>
                <span className="text-[10px] bg-red-950 text-red-400 font-extrabold px-2 py-0.5 rounded border border-red-800">
                  CTO Level
                </span>
              </div>
              <p className="text-xs text-stone-400">
                Official master vector lockup, emblem geometry, and font styling
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleResetToDefault}
              className="text-stone-400 hover:text-white text-xs px-2.5 py-1.5 rounded-lg border border-stone-800 hover:border-stone-700 transition-colors"
              title="Reset to default Gharkasathi™ vector logo"
            >
              Reset Default
            </button>
            <button
              onClick={onClose}
              className="p-2 text-stone-400 hover:text-white rounded-full hover:bg-stone-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-stone-200 bg-stone-50 px-6 pt-3 gap-2">
          <button
            onClick={() => setActiveTab('preview')}
            className={`px-4 py-2.5 text-xs font-bold rounded-t-xl transition-colors flex items-center gap-2 ${
              activeTab === 'preview'
                ? 'bg-white text-stone-900 border-t border-x border-stone-200 shadow-xs'
                : 'text-stone-500 hover:text-stone-900'
            }`}
          >
            <Eye className="w-3.5 h-3.5" />
            Live Brand Previews
          </button>
          <button
            onClick={() => setActiveTab('upload')}
            className={`px-4 py-2.5 text-xs font-bold rounded-t-xl transition-colors flex items-center gap-2 ${
              activeTab === 'upload'
                ? 'bg-white text-stone-900 border-t border-x border-stone-200 shadow-xs'
                : 'text-stone-500 hover:text-stone-900'
            }`}
          >
            <Upload className="w-3.5 h-3.5" />
            Upload .SVG File
          </button>
          <button
            onClick={() => setActiveTab('paste-code')}
            className={`px-4 py-2.5 text-xs font-bold rounded-t-xl transition-colors flex items-center gap-2 ${
              activeTab === 'paste-code'
                ? 'bg-white text-stone-900 border-t border-x border-stone-200 shadow-xs'
                : 'text-stone-500 hover:text-stone-900'
            }`}
          >
            <Code className="w-3.5 h-3.5" />
            Paste SVG Code
          </button>
        </div>

        {/* Body */}
        <div className="p-6 overflow-y-auto space-y-6">
          {statusMessage && (
            <div className={`p-3.5 rounded-xl text-xs flex items-center gap-2 ${
              statusMessage.type === 'success' 
                ? 'bg-emerald-50 text-emerald-800 border border-emerald-200' 
                : 'bg-red-50 text-red-800 border border-red-200'
            }`}>
              {statusMessage.type === 'success' ? <Check className="w-4 h-4 text-emerald-600 shrink-0" /> : <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />}
              <span>{statusMessage.text}</span>
            </div>
          )}

          {activeTab === 'preview' && (
            <div className="space-y-6">
              <div>
                <h4 className="text-xs font-bold text-stone-500 uppercase tracking-wider mb-2">
                  1. Brand Red Canvas (Matches SVG Logo.svg master)
                </h4>
                <div className="bg-[#CE0B15] p-8 rounded-2xl flex items-center justify-center shadow-inner">
                  <GharkasathiLogo size="lg" variant="white-on-red" />
                </div>
              </div>

              <div>
                <h4 className="text-xs font-bold text-stone-500 uppercase tracking-wider mb-2">
                  2. Light Website Header Canvas (With Brand Red Accent Emblem)
                </h4>
                <div className="bg-white p-6 rounded-2xl border border-stone-200 flex items-center justify-between shadow-xs">
                  <GharkasathiLogo size="md" variant="light" />
                  <span className="text-[11px] text-stone-400 font-semibold hidden sm:inline">
                    Navbar Rendering
                  </span>
                </div>
              </div>

              <div>
                <h4 className="text-xs font-bold text-stone-500 uppercase tracking-wider mb-2">
                  3. Dark Mode / Partner App Companion Canvas
                </h4>
                <div className="bg-stone-900 p-6 rounded-2xl border border-stone-800 flex items-center justify-center">
                  <GharkasathiLogo size="md" variant="dark" />
                </div>
              </div>

              {/* Brand Specs Sheet */}
              <div className="bg-stone-50 p-4 rounded-xl border border-stone-200 text-xs text-stone-600 space-y-2">
                <div className="flex items-center gap-2 text-stone-900 font-bold">
                  <ShieldCheck className="w-4 h-4 text-red-600" />
                  Official Trademark Specifications
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px]">
                  <div>• <strong>Primary Brand Color:</strong> #CE0B15 (Crimson Red)</div>
                  <div>• <strong>Wordmark Typography:</strong> Outfit Bold / ExtraBold (800)</div>
                  <div>• <strong>Emblem Geometry:</strong> Cupped Hands Cradling House + TM</div>
                  <div>• <strong>Trademark Slogan:</strong> "All Your Home Needs, Under One Roof."</div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'upload' && (
            <div className="space-y-4">
              <div 
                onClick={() => fileInputRef.current?.click()}
                className="border-2 border-dashed border-stone-300 hover:border-red-500 rounded-2xl p-8 text-center cursor-pointer bg-stone-50 hover:bg-red-50/20 transition-all"
              >
                <input 
                  type="file" 
                  ref={fileInputRef} 
                  onChange={handleFileUpload} 
                  accept=".svg,image/svg+xml" 
                  className="hidden" 
                />
                <div className="w-14 h-14 rounded-2xl bg-red-100 text-red-600 flex items-center justify-center mx-auto mb-3">
                  <Upload className="w-6 h-6" />
                </div>
                <h4 className="text-sm font-bold text-stone-900">
                  Click to select or drop your SVG Logo file
                </h4>
                <p className="text-xs text-stone-500 mt-1">
                  Supports .svg vector files directly (e.g. SVG Logo.svg, SVG Logo Transparent.svg)
                </p>
              </div>

              <div className="bg-amber-50 p-4 rounded-xl border border-amber-200 text-xs text-amber-900">
                <p className="font-semibold mb-1">CTO Quality Promise:</p>
                <p>When you select your .svg file, the server saves it directly to <code>/public/logo.svg</code> so the entire platform renders your exact original vector curves with zero rasterization.</p>
              </div>
            </div>
          )}

          {activeTab === 'paste-code' && (
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-2">
                  Paste Raw SVG Code (Starting with &lt;svg&gt; and ending with &lt;/svg&gt;)
                </label>
                <textarea
                  value={svgInput}
                  onChange={(e) => setSvgInput(e.target.value)}
                  placeholder="<svg xmlns=&quot;http://www.w3.org/2000/svg&quot; viewBox=&quot;0 0 ...&quot;>&#10;  ...&#10;</svg>"
                  rows={8}
                  className="w-full font-mono text-xs p-3 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-red-600 bg-stone-50"
                />
              </div>

              {svgInput.includes('<svg') && (
                <div>
                  <h4 className="text-xs font-bold text-stone-500 uppercase tracking-wider mb-2">
                    Live SVG Code Preview
                  </h4>
                  <div 
                    className="p-6 rounded-2xl bg-stone-100 border border-stone-200 flex items-center justify-center max-h-48 overflow-hidden"
                    dangerouslySetInnerHTML={{ __html: svgInput }}
                  />
                </div>
              )}

              <button
                onClick={handleSaveSvg}
                disabled={isSubmitting || !svgInput.trim()}
                className="w-full py-3 bg-red-600 hover:bg-red-700 disabled:opacity-50 text-white font-bold text-xs rounded-xl shadow-md transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                {isSubmitting ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    Saving Logo to Project...
                  </>
                ) : (
                  <>
                    <Check className="w-4 h-4" />
                    Apply &amp; Save Master Logo to Project
                  </>
                )}
              </button>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 bg-stone-50 border-t border-stone-200 flex items-center justify-between">
          <span className="text-xs text-stone-500 font-medium">
            Brand Assets live at <code>/public/logo-master.svg</code>
          </span>
          <button
            onClick={onClose}
            className="px-5 py-2 bg-stone-200 hover:bg-stone-300 text-stone-800 text-xs font-bold rounded-xl transition-colors cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
