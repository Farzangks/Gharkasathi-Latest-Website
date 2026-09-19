import React, { useState } from 'react';
import { 
  Bot, 
  Sparkles, 
  Send, 
  RefreshCw, 
  TrendingUp, 
  Users, 
  Clock, 
  ShieldCheck, 
  CheckCircle2, 
  AlertTriangle,
  Lightbulb,
  FileText,
  DollarSign
} from 'lucide-react';
import { AdminMetrics, LiveBooking, LiveProvider } from '../types';

interface SathiAiAssistPanelProps {
  metrics: AdminMetrics | null;
  bookings: LiveBooking[];
  providers: LiveProvider[];
}

export const SathiAiAssistPanel: React.FC<SathiAiAssistPanelProps> = ({
  metrics,
  bookings,
  providers
}) => {
  const [messages, setMessages] = useState<Array<{ sender: 'ai' | 'user'; text: string; time: string }>>([
    {
      sender: 'ai',
      text: 'Namaste Admin! I am Sathi AI Operations Co-Pilot. I monitor real-time bookings across Raipur, Bhilai & Bilaspur, predict surge demand, suggest technician dispatch routes, and optimize customer coupons. How can I assist you right now?',
      time: 'Just now'
    }
  ]);
  const [inputQuery, setInputQuery] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  // Quick Action Prompts
  const quickActions = [
    { label: 'Dispatch Risk Analysis', query: 'Analyze current pending bookings and flag any technician delays or dispatch risks.' },
    { label: 'Coupon & Revenue Advice', query: 'What promo campaigns or coupon discounts should we run this weekend in Raipur?' },
    { label: 'Partner Allocation Report', query: 'Which service categories have shortage of verified partners right now?' },
    { label: 'Summarize Today\'s GMV', query: 'Summarize today\'s gross bookings, commission revenue, and completion rates.' },
  ];

  const handleSend = (textToSend?: string) => {
    const q = textToSend || inputQuery;
    if (!q.trim()) return;

    const userMsg = { sender: 'user' as const, text: q, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) };
    setMessages(prev => [...prev, userMsg]);
    setInputQuery('');
    setIsAnalyzing(true);

    setTimeout(() => {
      let aiResponse = '';
      const lower = q.toLowerCase();

      if (lower.includes('risk') || lower.includes('delay') || lower.includes('dispatch')) {
        const pending = bookings.filter(b => b.status === 'pending_match' || b.status === 'dispatched');
        aiResponse = `📊 **Dispatch Optimization Report:**\n• Active in-flight bookings: ${pending.length}\n• Average doorstep arrival time: 24 minutes.\n• Technician supply in Telibandha & Shankar Nagar is high (6 active Sathis).\n• Recommended: Auto-assign Electrician ticket #BK-8821 to nearest partner PRV-101 to maintain 30-min guarantee.`;
      } else if (lower.includes('coupon') || lower.includes('promo') || lower.includes('weekend') || lower.includes('revenue')) {
        aiResponse = `💡 **Campaign Growth Strategy:**\n• Recommended Promo: Run "WEEKEND15" (15% off up to ₹200) on Deep Home Cleaning & AC Maintenance.\n• Historical data shows 42% higher basket size on Saturday mornings in VIP Road and Civil Lines.\n• Current active coupon FIRST100 has an 86% redemption satisfaction rate.`;
      } else if (lower.includes('partner') || lower.includes('shortage') || lower.includes('fleet')) {
        const activeCount = providers.filter(p => p.status === 'available').length;
        aiResponse = `👷 **Fleet Readiness Summary:**\n• Available partners: ${activeCount} of ${providers.length}.\n• Category Coverage: Carpenters & Plumbers have 100% immediate coverage.\n• Opportunity: Onboard 2 additional Appliance Specialists in Bhilai & Durg to prepare for summer AC maintenance rush.`;
      } else if (lower.includes('gmv') || lower.includes('revenue') || lower.includes('summarize')) {
        aiResponse = `📈 **Executive Financial Summary:**\n• Total Bookings to date: ${metrics?.totalBookings || bookings.length}\n• Gross Merchandise Value (GMV): ₹${(metrics?.totalRevenue || 0).toLocaleString()}\n• Platform Cut (18%): ₹${(metrics?.platformCommission || 0).toLocaleString()}\n• Service Success Rate: 98.4% with zero unresolved safety escalations.`;
      } else {
        aiResponse = `I've analyzed your operations data. We currently have ${bookings.length} tracked customer bookings and ${providers.length} verified service partners. What specific metric, partner dispatch, or marketing campaign would you like me to analyze?`;
      }

      setMessages(prev => [...prev, {
        sender: 'ai',
        text: aiResponse,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }]);
      setIsAnalyzing(false);
    }, 800);
  };

  return (
    <div className="space-y-6">
      {/* Sathi AI Banner in Red & White Theme */}
      <div className="bg-white rounded-2xl border-2 border-red-600/20 p-6 shadow-sm flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-red-600 text-white flex items-center justify-center shadow-md shadow-red-600/20">
            <Bot className="w-7 h-7" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-lg font-black text-stone-900 tracking-tight">
                Sathi AI Operations Assist
              </h3>
              <span className="px-2.5 py-0.5 rounded-full bg-red-100 text-red-700 text-[10px] font-black uppercase tracking-wider flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-red-600" />
                Live Co-Pilot
              </span>
            </div>
            <p className="text-xs text-stone-500 mt-0.5">
              Autonomous AI intelligence tracking fleet allocation, customer retention, ticket risk, and dynamic dispatch.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs">
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-red-50 text-red-700 border border-red-200 font-bold">
            <span className="w-2 h-2 rounded-full bg-red-600 animate-ping" />
            Active Fleet AI: Optimal
          </span>
        </div>
      </div>

      {/* 3 AI Automated Insight Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-4 bg-white rounded-2xl border border-stone-200 shadow-2xs space-y-2">
          <div className="flex items-center justify-between text-stone-500">
            <span className="text-xs font-bold text-stone-900">Doorstep Arrival Predictor</span>
            <Clock className="w-4 h-4 text-red-600" />
          </div>
          <div className="text-2xl font-black text-stone-900 font-mono">
            ~24 Mins
          </div>
          <p className="text-[11px] text-stone-500">
            Well within 30-min express dispatch SLA across all active Raipur pin codes.
          </p>
        </div>

        <div className="p-4 bg-white rounded-2xl border border-stone-200 shadow-2xs space-y-2">
          <div className="flex items-center justify-between text-stone-500">
            <span className="text-xs font-bold text-stone-900">Customer Rebook Probability</span>
            <TrendingUp className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-2xl font-black text-emerald-700 font-mono">
            87.4%
          </div>
          <p className="text-[11px] text-stone-500">
            High satisfaction driven by uniform dress code &amp; verified OTP validation.
          </p>
        </div>

        <div className="p-4 bg-white rounded-2xl border border-stone-200 shadow-2xs space-y-2">
          <div className="flex items-center justify-between text-stone-500">
            <span className="text-xs font-bold text-stone-900">Recommended Coupon Action</span>
            <Lightbulb className="w-4 h-4 text-amber-600" />
          </div>
          <div className="text-sm font-bold text-stone-900">
            Push "SUMMER50" AC Care
          </div>
          <p className="text-[11px] text-stone-500">
            Predicted +32% increase in appliance servicing conversions over next 7 days.
          </p>
        </div>
      </div>

      {/* Interactive AI Chat & Query Terminal */}
      <div className="bg-white rounded-2xl border border-stone-200 shadow-xs flex flex-col h-[460px] overflow-hidden">
        <div className="px-5 py-3.5 border-b border-stone-200 bg-stone-50 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Bot className="w-4 h-4 text-red-600" />
            <span className="text-xs font-bold text-stone-900">
              Interactive Sathi AI Operational Terminal
            </span>
          </div>
          <button
            onClick={() => setMessages([messages[0]])}
            className="text-[11px] text-stone-500 hover:text-red-600 font-semibold flex items-center gap-1 cursor-pointer"
          >
            <RefreshCw className="w-3 h-3" />
            Clear Chat
          </button>
        </div>

        {/* Chat Stream */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3.5 bg-stone-50/40">
          {messages.map((m, idx) => (
            <div
              key={idx}
              className={`flex items-start gap-2.5 ${m.sender === 'user' ? 'flex-row-reverse' : ''}`}
            >
              <div
                className={`w-7 h-7 rounded-xl flex items-center justify-center shrink-0 text-xs font-bold ${
                  m.sender === 'user'
                    ? 'bg-stone-900 text-white'
                    : 'bg-red-600 text-white'
                }`}
              >
                {m.sender === 'user' ? 'AD' : <Bot className="w-4 h-4" />}
              </div>

              <div
                className={`max-w-[80%] rounded-2xl p-3.5 text-xs leading-relaxed shadow-2xs whitespace-pre-line ${
                  m.sender === 'user'
                    ? 'bg-stone-900 text-white rounded-tr-none'
                    : 'bg-white border border-stone-200 text-stone-800 rounded-tl-none'
                }`}
              >
                <div>{m.text}</div>
                <div
                  className={`text-[9px] mt-1.5 ${
                    m.sender === 'user' ? 'text-stone-400 text-right' : 'text-stone-400'
                  }`}
                >
                  {m.time}
                </div>
              </div>
            </div>
          ))}

          {isAnalyzing && (
            <div className="flex items-center gap-2 text-xs text-stone-500 pl-9 animate-pulse">
              <Sparkles className="w-3.5 h-3.5 text-red-600 animate-spin" />
              <span>Sathi AI analyzing real-time fleet &amp; catalog telemetry...</span>
            </div>
          )}
        </div>

        {/* Quick Action Chips */}
        <div className="px-4 py-2 bg-white border-t border-stone-100 flex flex-wrap gap-1.5">
          {quickActions.map((qa, i) => (
            <button
              key={i}
              onClick={() => handleSend(qa.query)}
              className="px-2.5 py-1 rounded-lg bg-stone-100 hover:bg-red-50 hover:text-red-700 text-stone-700 text-[11px] font-medium transition-colors cursor-pointer border border-stone-200"
            >
              {qa.label}
            </button>
          ))}
        </div>

        {/* Input Bar */}
        <div className="p-3 bg-white border-t border-stone-200 flex gap-2">
          <input
            type="text"
            value={inputQuery}
            onChange={(e) => setInputQuery(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Ask Sathi AI: e.g. 'Show me delayed bookings', 'Optimize coupon budget'..."
            className="flex-1 px-3.5 py-2.5 bg-stone-50 border border-stone-300 rounded-xl text-xs text-stone-900 focus:outline-hidden focus:border-red-500"
          />
          <button
            onClick={() => handleSend()}
            disabled={!inputQuery.trim() || isAnalyzing}
            className="px-4 py-2.5 bg-red-600 hover:bg-red-700 disabled:opacity-50 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer shrink-0 shadow-xs"
          >
            <Send className="w-3.5 h-3.5" />
            <span>Ask Sathi</span>
          </button>
        </div>
      </div>
    </div>
  );
};
