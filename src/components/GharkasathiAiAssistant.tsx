import React, { useState, useEffect, useRef } from 'react';
import { 
  Bot, 
  Send, 
  X, 
  Minus, 
  Sparkles, 
  Calculator, 
  Building2, 
  MapPin, 
  Wrench, 
  RotateCcw,
  Maximize2
} from 'lucide-react';

interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  actionSuggestion?: 'open_boq' | 'open_site_visit' | 'open_handyman' | null;
  timestamp: string;
}

interface GharkasathiAiAssistantProps {
  onOpenBoq?: () => void;
  onOpenSiteVisit?: () => void;
  onOpenHandyman?: () => void;
  selectedCity?: string;
}

export const GharkasathiAiAssistant: React.FC<GharkasathiAiAssistantProps> = ({
  onOpenBoq,
  onOpenSiteVisit,
  onOpenHandyman,
  selectedCity = 'Raipur'
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'msg-welcome',
      sender: 'assistant',
      text: `Namaste! 🙏 I am **Sathi AI**, your official property & construction consultant for **Gharkasathi** (${selectedCity}).\n\nHow can I help you today? I can calculate turnkey construction costs, calculate material BOQ, schedule free AC cab site visits for RERA-approved plots, consult on modular kitchens, or dispatch an emergency handyman in 30 minutes.`,
      timestamp: 'Just now'
    }
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen && !isMinimized) {
      scrollToBottom();
      inputRef.current?.focus();
    }
  }, [messages, isOpen, isMinimized]);

  const quickPrompts = [
    { label: '🏗️ Duplex Construction BOQ', prompt: 'Calculate construction cost and material BOQ for a 1,500 sq.ft G+1 duplex in ' + selectedCity },
    { label: '🚗 Free Plot Visit with Cab', prompt: 'I want to schedule a free AC cab site visit for RERA approved plots in ' + selectedCity },
    { label: '🍳 Modular Kitchen & Interior', prompt: 'What are the pricing and materials for waterproof HDHMR modular kitchen and wardrobes?' },
    { label: '⚡ Emergency Electrician / Plumber', prompt: 'I need an emergency technician dispatch for leakage and MCB wiring fix' },
    { label: '📐 2D Vastu & 3D Elevation', prompt: 'How much does architectural 2D Vastu planning and 3D elevation cost?' }
  ];

  const handleSendMessage = async (textToSend?: string) => {
    const query = (textToSend || inputMessage).trim();
    if (!query || isLoading) return;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputMessage('');
    setIsLoading(true);

    try {
      const historyPayload = messages.slice(-6).map((m) => ({
        role: m.sender === 'user' ? 'user' : 'model',
        text: m.text
      }));

      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: query,
          history: historyPayload
        })
      });

      if (!res.ok) {
        throw new Error(`HTTP error ${res.status}`);
      }

      const data = await res.json();
      const assistantMsg: ChatMessage = {
        id: `assistant-${Date.now()}`,
        sender: 'assistant',
        text: data.reply || 'Thank you for your message. How else may I assist you with your home or property?',
        actionSuggestion: data.actionSuggestion,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages((prev) => [...prev, assistantMsg]);
    } catch (err) {
      console.warn('Fallback response for Sathi AI:', err);
      // Client-side fallback if server connection times out
      const fallbackMsg: ChatMessage = {
        id: `assistant-${Date.now()}`,
        sender: 'assistant',
        text: `**Gharkasathi Turnkey Services**:\n\n• **Standard Turnkey**: ₹1,600/sq.ft (UltraTech / Jindal TMT)\n• **Executive**: ₹1,800/sq.ft (Jaquar / Asian Paints, 10-Yr warranty)\n• **Luxury Villa**: ₹2,099/sq.ft\n• **Express Cleaning**: Fabric Sofa (₹549), Water Tank UV (₹499)\n• **Handyman Dispatch**: Electrician (₹199), Plumber (₹249)\n\nFeel free to ask for detailed material quantities or bookings!`,
        actionSuggestion: 'open_boq',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages((prev) => [...prev, fallbackMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleActionClick = (action: string) => {
    if (action === 'open_boq' && onOpenBoq) {
      onOpenBoq();
      setIsOpen(false);
    } else if (action === 'open_site_visit' && onOpenSiteVisit) {
      onOpenSiteVisit();
      setIsOpen(false);
    } else if (action === 'open_handyman' && onOpenHandyman) {
      onOpenHandyman();
      setIsOpen(false);
    }
  };

  const formatMessageText = (content: string) => {
    return content.split('\n').map((line, idx) => {
      let formatted = line.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
      return (
        <span 
          key={idx} 
          className="block mb-1" 
          dangerouslySetInnerHTML={{ __html: formatted }} 
        />
      );
    });
  };

  return (
    <>
      {/* Floating Launcher Trigger (Replaces old WhatsApp/dial desk) */}
      {!isOpen && (
        <div className="fixed bottom-5 right-5 z-50 flex items-center gap-2">
          <div className="hidden sm:flex flex-col items-end bg-stone-900/90 text-white px-3 py-1.5 rounded-2xl shadow-xl border border-stone-700 backdrop-blur-md text-[11px] animate-fade-in">
            <span className="font-bold flex items-center gap-1.5 text-red-400">
              <Sparkles className="w-3 h-3 text-red-400" /> Sathi AI Assistant
            </span>
            <span className="text-stone-300 text-[10px]">Instant BOQ, Plots & Handyman Advice</span>
          </div>

          <button
            onClick={() => {
              setIsOpen(true);
              setIsMinimized(false);
            }}
            className="group relative flex items-center justify-center w-14 h-14 rounded-full bg-linear-to-tr from-red-700 via-red-600 to-amber-500 text-white shadow-2xl shadow-red-600/40 hover:scale-105 active:scale-95 transition-all cursor-pointer border-2 border-white/30"
            title="Open Sathi AI Assistant"
            aria-label="Open Gharkasathi AI Assistant"
          >
            <Bot className="w-7 h-7 transition-transform group-hover:rotate-6" />
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-emerald-500 rounded-full border-2 border-white flex items-center justify-center">
              <span className="w-1.5 h-1.5 bg-white rounded-full animate-ping" />
            </span>
          </button>
        </div>
      )}

      {/* Floating Chat Modal / Drawer */}
      {isOpen && (
        <div 
          className={`fixed z-50 transition-all duration-300 shadow-2xl flex flex-col ${
            isMinimized 
              ? 'bottom-5 right-5 w-72 h-14 rounded-2xl bg-stone-900 border border-stone-700' 
              : 'bottom-4 right-4 sm:bottom-6 sm:right-6 w-[calc(100vw-2rem)] sm:w-105 h-[580px] max-h-[85vh] rounded-2xl sm:rounded-3xl bg-white border border-stone-200 overflow-hidden'
          }`}
        >
          {/* Header */}
          <div className="bg-linear-to-r from-stone-900 via-red-950 to-stone-900 text-white px-4 py-3 flex items-center justify-between select-none shrink-0 border-b border-white/10">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-red-600/30 border border-red-500/50 flex items-center justify-center text-red-400">
                <Bot className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <h3 className="text-sm font-black text-white tracking-wide">Sathi AI</h3>
                  <span className="text-[9px] bg-red-600/80 text-white px-1.5 py-0.2 rounded font-mono font-bold">
                    Official
                  </span>
                </div>
                <div className="flex items-center gap-1.5 text-[11px] text-stone-300">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span>Gharkasathi Intelligence ({selectedCity})</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-1 text-stone-400">
              <button
                onClick={() => setMessages([
                  {
                    id: 'msg-reset',
                    sender: 'assistant',
                    text: `Chat reset. Hello! I am **Sathi AI**. Ask me any construction BOQ calculation, cleaning service rates, plot consultation, or emergency repair needs.`,
                    timestamp: 'Just now'
                  }
                ])}
                className="p-1.5 hover:bg-white/10 hover:text-white rounded-lg transition-colors cursor-pointer"
                title="Reset Conversation"
              >
                <RotateCcw className="w-4 h-4" />
              </button>

              <button
                onClick={() => setIsMinimized(!isMinimized)}
                className="p-1.5 hover:bg-white/10 hover:text-white rounded-lg transition-colors cursor-pointer"
                title={isMinimized ? 'Expand' : 'Minimize'}
              >
                {isMinimized ? <Maximize2 className="w-4 h-4" /> : <Minus className="w-4 h-4" />}
              </button>

              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 hover:bg-white/10 hover:text-white rounded-lg transition-colors cursor-pointer"
                title="Close Assistant"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Body when expanded */}
          {!isMinimized && (
            <>
              {/* Message List */}
              <div className="flex-1 overflow-y-auto p-4 space-y-3.5 bg-stone-50 text-xs sm:text-sm">
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
                  >
                    <div
                      className={`max-w-[88%] rounded-2xl px-3.5 py-2.5 shadow-xs leading-relaxed ${
                        msg.sender === 'user'
                          ? 'bg-red-600 text-white rounded-tr-xs font-medium'
                          : 'bg-white text-stone-800 border border-stone-200/90 rounded-tl-xs'
                      }`}
                    >
                      {formatMessageText(msg.text)}

                      {/* Interactive Action Chips recommended by Assistant */}
                      {msg.actionSuggestion && (
                        <div className="mt-3 pt-2.5 border-t border-stone-100 flex flex-wrap gap-1.5">
                          {msg.actionSuggestion === 'open_boq' && onOpenBoq && (
                            <button
                              onClick={() => handleActionClick('open_boq')}
                              className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-red-50 hover:bg-red-100 text-red-700 text-xs font-bold transition-all cursor-pointer border border-red-200"
                            >
                              <Calculator className="w-3.5 h-3.5" />
                              <span>Open BOQ Calculator</span>
                            </button>
                          )}
                          {msg.actionSuggestion === 'open_site_visit' && onOpenSiteVisit && (
                            <button
                              onClick={() => handleActionClick('open_site_visit')}
                              className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-800 text-xs font-bold transition-all cursor-pointer border border-emerald-200"
                            >
                              <MapPin className="w-3.5 h-3.5 text-emerald-600" />
                              <span>Book Free AC Cab Visit</span>
                            </button>
                          )}
                          {msg.actionSuggestion === 'open_handyman' && onOpenHandyman && (
                            <button
                              onClick={() => handleActionClick('open_handyman')}
                              className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-amber-50 hover:bg-amber-100 text-amber-800 text-xs font-bold transition-all cursor-pointer border border-amber-200"
                            >
                              <Wrench className="w-3.5 h-3.5 text-amber-600" />
                              <span>Dispatch Handyman (30m)</span>
                            </button>
                          )}
                        </div>
                      )}
                    </div>
                    <span className="text-[10px] text-stone-400 mt-1 px-1">
                      {msg.timestamp}
                    </span>
                  </div>
                ))}

                {isLoading && (
                  <div className="flex items-center gap-2 text-xs text-stone-500 bg-white border border-stone-200 w-fit px-3 py-2 rounded-2xl rounded-tl-xs">
                    <span className="w-2 h-2 rounded-full bg-red-600 animate-bounce" />
                    <span className="w-2 h-2 rounded-full bg-red-600 animate-bounce [animation-delay:0.2s]" />
                    <span className="w-2 h-2 rounded-full bg-red-600 animate-bounce [animation-delay:0.4s]" />
                    <span className="text-[11px] font-medium text-stone-600 pl-1">Sathi AI is analyzing rates & specifications...</span>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Quick Suggestion Prompts */}
              <div className="px-3 py-2 bg-stone-100 border-t border-stone-200 overflow-x-auto whitespace-nowrap flex gap-1.5 scrollbar-none">
                {quickPrompts.map((qp, i) => (
                  <button
                    key={i}
                    onClick={() => handleSendMessage(qp.prompt)}
                    disabled={isLoading}
                    className="px-2.5 py-1 rounded-full bg-white hover:bg-stone-200 text-stone-700 text-[11px] font-semibold border border-stone-200/80 transition-colors shrink-0 cursor-pointer"
                  >
                    {qp.label}
                  </button>
                ))}
              </div>

              {/* Input Area */}
              <div className="p-3 bg-white border-t border-stone-200 flex items-center gap-2">
                <input
                  ref={inputRef}
                  type="text"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') handleSendMessage();
                  }}
                  placeholder="Ask construction cost, sofa cleaning rates, plots..."
                  className="flex-1 px-3.5 py-2 bg-stone-50 border border-stone-200 rounded-xl text-xs sm:text-sm text-stone-800 placeholder-stone-400 focus:outline-hidden focus:border-red-500 focus:bg-white transition-all"
                  disabled={isLoading}
                />

                <button
                  onClick={() => handleSendMessage()}
                  disabled={!inputMessage.trim() || isLoading}
                  className="p-2.5 bg-red-600 hover:bg-red-700 disabled:bg-stone-300 text-white rounded-xl transition-all cursor-pointer shrink-0 active:scale-95 shadow-xs"
                  title="Send Question"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </>
          )}
        </div>
      )}
    </>
  );
};
