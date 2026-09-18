import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { 
  Search, 
  X, 
  Sparkles, 
  ArrowRight, 
  Clock, 
  Wrench, 
  Building2, 
  Hammer, 
  Compass, 
  Home, 
  TrendingUp, 
  CheckCircle2, 
  ShieldCheck,
  ChevronRight,
  ExternalLink,
  MapPin,
  IndianRupee
} from 'lucide-react';
import { CATALOG_SERVICES, ServiceItem, CORE_SERVICE_CATEGORIES } from '../data/homeServicesCatalog';
import { AUTHENTIC_PROPERTIES, AuthenticRealEstate } from '../data/teamImages';

export interface UnifiedSearchBarProps {
  onSelectService?: (service: ServiceItem) => void;
  onSelectProperty?: (property: AuthenticRealEstate) => void;
  onOpenBoq?: () => void;
  onOpenModularKitchen?: () => void;
  onSearchSubmit?: (query: string) => void;
  variant?: 'hero' | 'header' | 'compact';
  className?: string;
  isMobileMode?: boolean;
}

// 10 Official Phrases specified by user
const ROTATING_PHRASES_DESKTOP = [
  'Search for Sofa Cleaning',
  'Search for Plumbing Service',
  'Search for AC Repair',
  'Search for Home Painting',
  'Search for Deep Cleaning',
  'Search for Residential Property',
  'Search for Property for Rent',
  'Search for Property for Sale',
  'Search for Interior Designer',
  'Search for Construction Services'
];

const ROTATING_PHRASES_MOBILE = [
  'Find Sofa Cleaning',
  'Find a Plumber',
  'Find AC Repair',
  'Find Home Painting',
  'Search Residential Property',
  'Search Property for Rent',
  'Find an Interior Designer',
  'Search Construction Services'
];

// Popular searches requested in prompt
const POPULAR_SEARCH_TAGS = [
  { label: 'Sofa Cleaning', type: 'service', query: 'Sofa Cleaning' },
  { label: 'Plumbing Service', type: 'service', query: 'Plumbing' },
  { label: 'AC Repair', type: 'service', query: 'AC' },
  { label: 'Home Painting', type: 'service', query: 'Painting' },
  { label: 'Residential Property', type: 'property', query: 'Residential' },
  { label: 'Property for Rent', type: 'property', query: 'Rent' }
];

export const UnifiedSearchBar: React.FC<UnifiedSearchBarProps> = ({
  onSelectService,
  onSelectProperty,
  onOpenBoq,
  onOpenModularKitchen,
  onSearchSubmit,
  variant = 'hero',
  className = '',
  isMobileMode = false
}) => {
  const [query, setQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [activeCategoryFilter, setActiveCategoryFilter] = useState<'all' | 'services' | 'real-estate'>('all');
  const [selectedIndex, setSelectedIndex] = useState<number>(-1);
  const [recentSearches, setRecentSearches] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('gharkasathi_recent_searches');
      return saved ? JSON.parse(saved) : ['Sofa Cleaning', 'Residential Plot', 'Modular Kitchen'];
    } catch {
      return ['Sofa Cleaning', 'Residential Plot', 'Modular Kitchen'];
    }
  });

  // Typewriter animation state
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [isVisibleOnScreen, setIsVisibleOnScreen] = useState(true);
  const [reducedMotion, setReducedMotion] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Check prefers-reduced-motion
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mediaQuery.matches);
    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  // Pause animation when off-screen via IntersectionObserver
  useEffect(() => {
    if (!containerRef.current || typeof IntersectionObserver === 'undefined') return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisibleOnScreen(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );
    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  // Determine active phrases based on viewport / mode
  const phrases = useMemo(() => {
    return isMobileMode ? ROTATING_PHRASES_MOBILE : ROTATING_PHRASES_DESKTOP;
  }, [isMobileMode]);

  // Typewriter loop
  useEffect(() => {
    if (reducedMotion) {
      setDisplayText('What are you looking for? Search services & properties...');
      return;
    }

    // Pause typewriter if user has focused the search or is typing, or if offscreen
    if (isFocused || query.length > 0 || !isVisibleOnScreen) {
      return;
    }

    const currentFullPhrase = phrases[phraseIndex % phrases.length];

    let timer: NodeJS.Timeout;

    if (isPaused) {
      // 1.5s pause when phrase typing completes
      timer = setTimeout(() => {
        setIsPaused(false);
        setIsDeleting(true);
      }, 1500);
    } else if (isDeleting) {
      // Deleting character by character
      timer = setTimeout(() => {
        setDisplayText(prev => prev.slice(0, -1));
        if (displayText.length <= 0) {
          setIsDeleting(false);
          setPhraseIndex(prev => (prev + 1) % phrases.length);
        }
      }, 30);
    } else {
      // Typing character by character
      timer = setTimeout(() => {
        setDisplayText(currentFullPhrase.slice(0, displayText.length + 1));
        if (displayText.length + 1 >= currentFullPhrase.length) {
          setIsPaused(true);
        }
      }, 50);
    }

    return () => clearTimeout(timer);
  }, [displayText, isDeleting, isPaused, phraseIndex, isFocused, query, isVisibleOnScreen, phrases, reducedMotion]);

  // Save to recent searches
  const addRecentSearch = (text: string) => {
    const trimmed = text.trim();
    if (!trimmed) return;
    const updated = [trimmed, ...recentSearches.filter(s => s.toLowerCase() !== trimmed.toLowerCase())].slice(0, 5);
    setRecentSearches(updated);
    try {
      localStorage.setItem('gharkasathi_recent_searches', JSON.stringify(updated));
    } catch (e) {
      // ignore storage error
    }
  };

  const clearRecentSearches = () => {
    setRecentSearches([]);
    try {
      localStorage.removeItem('gharkasathi_recent_searches');
    } catch (e) {}
  };

  // Live filtered search results
  const searchResults = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) {
      return { services: [], properties: [], hasResults: false };
    }

    // 1. Match Home Services
    const matchedServices = CATALOG_SERVICES.filter(service => {
      return (
        service.name.toLowerCase().includes(q) ||
        service.categoryName.toLowerCase().includes(q) ||
        service.description.toLowerCase().includes(q) ||
        (service.whatsIncluded && service.whatsIncluded.some(item => item.toLowerCase().includes(q)))
      );
    }).slice(0, 5);

    // 2. Match Real Estate / Properties
    const matchedProperties = AUTHENTIC_PROPERTIES.filter(prop => {
      return (
        prop.title.toLowerCase().includes(q) ||
        prop.type.toLowerCase().includes(q) ||
        prop.location.toLowerCase().includes(q) ||
        (prop.highlights && prop.highlights.some(h => h.toLowerCase().includes(q)))
      );
    }).slice(0, 4);

    return {
      services: matchedServices,
      properties: matchedProperties,
      hasResults: matchedServices.length > 0 || matchedProperties.length > 0
    };
  }, [query]);

  // Flat list for keyboard navigation
  const flatItems = useMemo(() => {
    const items: Array<{ type: 'service' | 'property' | 'action'; data: any }> = [];
    if (searchResults.hasResults) {
      searchResults.services.forEach(s => items.push({ type: 'service', data: s }));
      searchResults.properties.forEach(p => items.push({ type: 'property', data: p }));
    }
    return items;
  }, [searchResults]);

  // Click outside to close suggestion panel
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        containerRef.current && 
        !containerRef.current.contains(e.target as Node)
      ) {
        setIsFocused(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Escape') {
      setIsFocused(false);
      inputRef.current?.blur();
      return;
    }

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (flatItems.length === 0) return;
      setSelectedIndex(prev => (prev < flatItems.length - 1 ? prev + 1 : 0));
      return;
    }

    if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (flatItems.length === 0) return;
      setSelectedIndex(prev => (prev > 0 ? prev - 1 : flatItems.length - 1));
      return;
    }

    if (e.key === 'Enter') {
      e.preventDefault();
      if (selectedIndex >= 0 && selectedIndex < flatItems.length) {
        const selected = flatItems[selectedIndex];
        if (selected.type === 'service') {
          handleSelectService(selected.data);
        } else if (selected.type === 'property') {
          handleSelectProperty(selected.data);
        }
      } else if (query.trim()) {
        addRecentSearch(query);
        setIsFocused(false);
        if (onSearchSubmit) {
          onSearchSubmit(query.trim());
        }
      }
    }
  };

  const handleSelectService = (service: ServiceItem) => {
    addRecentSearch(service.name);
    setIsFocused(false);
    if (onSelectService) {
      onSelectService(service);
    }
  };

  const handleSelectProperty = (property: AuthenticRealEstate) => {
    addRecentSearch(property.title);
    setIsFocused(false);
    if (onSelectProperty) {
      onSelectProperty(property);
    }
  };

  const handleSelectTag = (tagQuery: string) => {
    setQuery(tagQuery);
    addRecentSearch(tagQuery);
    inputRef.current?.focus();
  };

  const clearInput = () => {
    setQuery('');
    setSelectedIndex(-1);
    inputRef.current?.focus();
  };

  return (
    <div 
      ref={containerRef} 
      className={`relative w-full ${className}`}
      id="gharkasathi-unified-search"
    >
      {/* Search Input Container */}
      <div 
        className={`
          relative flex items-center w-full transition-all duration-200
          bg-white rounded-2xl sm:rounded-full border 
          ${isFocused 
            ? 'border-red-600 ring-3 ring-red-600/15 shadow-lg' 
            : 'border-stone-300 hover:border-stone-400 shadow-sm'
          }
          ${variant === 'hero' ? 'py-1.5 sm:py-2 px-3 sm:px-4' : 'py-1 px-3'}
        `}
      >
        {/* Fixed Left Search Icon with Gharkasathi Accent */}
        <div className="flex items-center justify-center w-8 h-8 rounded-full bg-stone-50 text-stone-500 mr-2 shrink-0 group-hover:text-red-600 transition-colors">
          <Search className={`w-4 h-4 ${isFocused ? 'text-red-600' : 'text-stone-500'}`} />
        </div>

        {/* Dynamic Typewriter / Active Input */}
        <div className="relative flex-1 flex items-center min-w-0 h-9 sm:h-10">
          <input
            ref={inputRef}
            type="text"
            role="combobox"
            aria-expanded={isFocused}
            aria-autocomplete="list"
            aria-controls="gharkasathi-search-dropdown"
            aria-label="Search Gharkasathi Home Services and Real Estate"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIndex(-1);
            }}
            onFocus={() => setIsFocused(true)}
            onKeyDown={handleKeyDown}
            className="w-full h-full bg-transparent text-xs sm:text-sm md:text-base text-stone-900 font-medium placeholder-transparent focus:outline-hidden"
          />

          {/* Typewriter Animated Overlay (visible when input is empty) */}
          {query.length === 0 && (
            <div 
              onClick={() => inputRef.current?.focus()}
              className="absolute inset-0 flex items-center pointer-events-none select-none text-stone-400 text-xs sm:text-sm md:text-base font-normal tracking-normal truncate"
            >
              <span className="text-stone-600 font-medium">{displayText}</span>
              {!reducedMotion && (
                <span className="inline-block w-0.5 h-4 ml-0.5 bg-red-600 animate-pulse" />
              )}
            </div>
          )}
        </div>

        {/* Right Controls: Clear or Search Badge */}
        <div className="flex items-center gap-1 ml-2 shrink-0">
          {query ? (
            <button
              type="button"
              onClick={clearInput}
              aria-label="Clear search"
              className="p-1.5 rounded-full hover:bg-stone-100 text-stone-400 hover:text-stone-700 transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          ) : (
            <span className="hidden sm:inline-flex items-center gap-1 text-[11px] font-semibold text-stone-600 bg-stone-100/90 px-2.5 py-1 rounded-full border border-stone-200/80">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block" />
              <span>Services & Property</span>
            </span>
          )}

          <button
            type="button"
            onClick={() => {
              if (query.trim()) {
                addRecentSearch(query);
                setIsFocused(false);
                if (onSearchSubmit) onSearchSubmit(query.trim());
              } else {
                setIsFocused(true);
                inputRef.current?.focus();
              }
            }}
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 bg-red-600 hover:bg-red-700 active:bg-red-800 text-white rounded-full text-xs font-bold transition-all shadow-xs cursor-pointer ml-1"
          >
            <span>Search</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* DROPDOWN SUGGESTION PANEL */}
      {isFocused && (
        <div 
          ref={dropdownRef}
          id="gharkasathi-search-dropdown"
          className="absolute left-0 right-0 top-full mt-2 bg-white rounded-2xl border border-stone-200 shadow-2xl z-50 overflow-hidden text-left animate-in fade-in slide-in-from-top-1 duration-150"
        >
          {/* Top Filter Chips */}
          <div className="flex items-center justify-between px-4 py-2.5 bg-stone-50/80 border-b border-stone-200 text-xs">
            <div className="flex items-center gap-1.5">
              <span className="font-bold text-stone-800">Filter:</span>
              <button
                type="button"
                onClick={() => setActiveCategoryFilter('all')}
                className={`px-2.5 py-1 rounded-lg font-medium transition-all ${
                  activeCategoryFilter === 'all' 
                    ? 'bg-red-600 text-white shadow-xs font-bold' 
                    : 'bg-stone-200/60 text-stone-600 hover:bg-stone-200'
                }`}
              >
                All
              </button>
              <button
                type="button"
                onClick={() => setActiveCategoryFilter('services')}
                className={`px-2.5 py-1 rounded-lg font-medium transition-all ${
                  activeCategoryFilter === 'services' 
                    ? 'bg-red-600 text-white shadow-xs font-bold' 
                    : 'bg-stone-200/60 text-stone-600 hover:bg-stone-200'
                }`}
              >
                Home Services
              </button>
              <button
                type="button"
                onClick={() => setActiveCategoryFilter('real-estate')}
                className={`px-2.5 py-1 rounded-lg font-medium transition-all ${
                  activeCategoryFilter === 'real-estate' 
                    ? 'bg-red-600 text-white shadow-xs font-bold' 
                    : 'bg-stone-200/60 text-stone-600 hover:bg-stone-200'
                }`}
              >
                Real Estate
              </button>
            </div>

            <span className="hidden md:inline text-[11px] text-stone-600">
              Press <kbd className="px-1.5 py-0.5 bg-white border border-stone-300 rounded text-[10px] font-mono text-stone-700">↑</kbd> <kbd className="px-1.5 py-0.5 bg-white border border-stone-300 rounded text-[10px] font-mono text-stone-700">↓</kbd> to navigate, <kbd className="px-1.5 py-0.5 bg-white border border-stone-300 rounded text-[10px] font-mono text-stone-700">Enter</kbd> to select
            </span>
          </div>

          <div className="max-h-[70vh] overflow-y-auto divide-y divide-stone-100 p-2 sm:p-3 space-y-3">
            {/* EMPTY QUERY STATE */}
            {!query.trim() && (
              <div className="space-y-4 py-1">
                {/* Popular Searches as explicitly requested in Section 8 */}
                <div>
                  <div className="flex items-center gap-1.5 text-xs font-bold text-stone-500 uppercase tracking-wider px-2 mb-2">
                    <Sparkles className="w-3.5 h-3.5 text-red-600" />
                    <span>Popular Searches</span>
                  </div>
                  <div className="flex flex-wrap gap-1.5 px-2">
                    {POPULAR_SEARCH_TAGS.map((tag) => (
                      <button
                        key={tag.label}
                        type="button"
                        onClick={() => handleSelectTag(tag.query)}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-stone-100 hover:bg-red-50 hover:text-red-700 text-stone-700 text-xs font-medium transition-colors cursor-pointer border border-stone-200/60"
                      >
                        <Search className="w-3 h-3 text-stone-400" />
                        <span>{tag.label}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Quick Portals: All Services & Real Estate Discovery */}
                <div>
                  <div className="flex items-center gap-1.5 text-xs font-bold text-stone-500 uppercase tracking-wider px-2 mb-2">
                    <Building2 className="w-3.5 h-3.5 text-red-600" />
                    <span>Explore Gharkasathi Ecosystem</span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 px-1">
                    <button
                      type="button"
                      onClick={() => {
                        setIsFocused(false);
                        if (onSearchSubmit) onSearchSubmit('');
                        document.getElementById('explore-verticals')?.scrollIntoView({ behavior: 'smooth' });
                      }}
                      className="flex items-center justify-between p-2.5 rounded-xl border border-stone-200 bg-stone-50/60 hover:bg-red-50/50 hover:border-red-200 transition-all text-left cursor-pointer group"
                    >
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-lg bg-red-100 text-red-700 flex items-center justify-center shrink-0">
                          <Wrench className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="text-xs font-bold text-stone-900 group-hover:text-red-600">View All Home Services</div>
                          <div className="text-[11px] text-stone-500">Plumbing, electrical, AC, cleaning & more</div>
                        </div>
                      </div>
                      <ChevronRight className="w-4 h-4 text-stone-400 group-hover:text-red-600" />
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        setIsFocused(false);
                        document.getElementById('authentic-properties-section')?.scrollIntoView({ behavior: 'smooth' });
                      }}
                      className="flex items-center justify-between p-2.5 rounded-xl border border-stone-200 bg-stone-50/60 hover:bg-red-50/50 hover:border-red-200 transition-all text-left cursor-pointer group"
                    >
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-lg bg-red-100 text-red-700 flex items-center justify-center shrink-0">
                          <Building2 className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="text-xs font-bold text-stone-900 group-hover:text-red-600">Explore Properties</div>
                          <div className="text-[11px] text-stone-500">Residential plots, villas, flats & rent</div>
                        </div>
                      </div>
                      <ChevronRight className="w-4 h-4 text-stone-400 group-hover:text-red-600" />
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        setIsFocused(false);
                        if (onOpenBoq) onOpenBoq();
                      }}
                      className="flex items-center justify-between p-2.5 rounded-xl border border-stone-200 bg-stone-50/60 hover:bg-red-50/50 hover:border-red-200 transition-all text-left cursor-pointer group"
                    >
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-800 flex items-center justify-center shrink-0">
                          <Hammer className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="text-xs font-bold text-stone-900 group-hover:text-amber-800">Turnkey Construction BOQ</div>
                          <div className="text-[11px] text-stone-500">Live ₹/sq.ft structural cost estimator</div>
                        </div>
                      </div>
                      <ChevronRight className="w-4 h-4 text-stone-400 group-hover:text-amber-800" />
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        setIsFocused(false);
                        if (onOpenModularKitchen) onOpenModularKitchen();
                      }}
                      className="flex items-center justify-between p-2.5 rounded-xl border border-stone-200 bg-stone-50/60 hover:bg-red-50/50 hover:border-red-200 transition-all text-left cursor-pointer group"
                    >
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-lg bg-rose-100 text-rose-800 flex items-center justify-center shrink-0">
                          <Compass className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="text-xs font-bold text-stone-900 group-hover:text-rose-800">Modular Kitchen & Interior</div>
                          <div className="text-[11px] text-stone-500">L-shape, Island, acrylic & marine ply 3D</div>
                        </div>
                      </div>
                      <ChevronRight className="w-4 h-4 text-stone-400 group-hover:text-rose-800" />
                    </button>
                  </div>
                </div>

                {/* Recent Searches */}
                {recentSearches.length > 0 && (
                  <div>
                    <div className="flex items-center justify-between px-2 mb-1.5">
                      <span className="text-xs font-bold text-stone-500 uppercase tracking-wider flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 text-stone-400" />
                        Recent Searches
                      </span>
                      <button
                        type="button"
                        onClick={clearRecentSearches}
                        className="text-[11px] text-stone-600 hover:text-stone-800 cursor-pointer"
                      >
                        Clear
                      </button>
                    </div>
                    <div className="flex flex-wrap gap-1 px-2">
                      {recentSearches.map((term) => (
                        <button
                          key={term}
                          type="button"
                          onClick={() => handleSelectTag(term)}
                          className="px-2.5 py-1 rounded-lg bg-stone-100 text-stone-600 hover:bg-stone-200 text-xs transition-colors cursor-pointer"
                        >
                          {term}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* LIVE RESULTS (WHEN TYPING) */}
            {query.trim() && (
              <div className="space-y-4 py-1">
                {/* 1. SERVICES SECTION */}
                {(activeCategoryFilter === 'all' || activeCategoryFilter === 'services') && (
                  <div>
                    <div className="flex items-center justify-between px-2 mb-2">
                      <span className="text-xs font-bold text-red-600 uppercase tracking-wider flex items-center gap-1.5">
                        <Wrench className="w-3.5 h-3.5" />
                        HOME SERVICES
                      </span>
                      <span className="text-[11px] text-stone-600">
                        {searchResults.services.length} found
                      </span>
                    </div>

                    {searchResults.services.length > 0 ? (
                      <div className="space-y-1">
                        {searchResults.services.map((service, idx) => {
                          const isHighlighted = selectedIndex === idx;
                          return (
                            <div
                              key={service.id}
                              onClick={() => handleSelectService(service)}
                              className={`flex items-center justify-between p-2 rounded-xl transition-all cursor-pointer ${
                                isHighlighted ? 'bg-red-50 border border-red-200' : 'hover:bg-stone-50'
                              }`}
                            >
                              <div className="flex items-center gap-3 min-w-0">
                                <img
                                  src={service.imageUrl}
                                  alt={service.name}
                                  className="w-10 h-10 rounded-lg object-cover shrink-0 border border-stone-200"
                                />
                                <div className="min-w-0">
                                  <div className="text-xs sm:text-sm font-bold text-stone-900 truncate">
                                    {service.name}
                                  </div>
                                  <div className="flex items-center gap-2 text-[11px] text-stone-500">
                                    <span className="bg-stone-100 px-1.5 py-0.5 rounded font-medium text-stone-700">
                                      {service.categoryName}
                                    </span>
                                    <span>&bull;</span>
                                    <span className="text-emerald-700 font-bold">
                                      {service.priceDisplay}
                                    </span>
                                    <span>&bull;</span>
                                    <span>{service.duration}</span>
                                  </div>
                                </div>
                              </div>

                              <button
                                type="button"
                                className="px-3 py-1 bg-red-600 text-white rounded-lg text-xs font-bold shrink-0 hover:bg-red-700 transition-colors cursor-pointer"
                              >
                                Book
                              </button>
                            </div>
                          );
                        })}
                      </div>
                    ) : (
                      activeCategoryFilter === 'services' && (
                        <div className="text-xs text-stone-600 px-2 py-2">
                          No home services match "{query}".
                        </div>
                      )
                    )}
                  </div>
                )}

                {/* 2. REAL ESTATE & PROPERTY SERVICES SECTION */}
                {(activeCategoryFilter === 'all' || activeCategoryFilter === 'real-estate') && (
                  <div>
                    <div className="flex items-center justify-between px-2 mb-2">
                      <span className="text-xs font-bold text-red-600 uppercase tracking-wider flex items-center gap-1.5">
                        <Building2 className="w-3.5 h-3.5" />
                        PROPERTY & REAL ESTATE
                      </span>
                      <span className="text-[11px] text-stone-600">
                        {searchResults.properties.length} found
                      </span>
                    </div>

                    {searchResults.properties.length > 0 ? (
                      <div className="space-y-1">
                        {searchResults.properties.map((property, idx) => {
                          const flatIdx = searchResults.services.length + idx;
                          const isHighlighted = selectedIndex === flatIdx;
                          return (
                            <div
                              key={property.id}
                              onClick={() => handleSelectProperty(property)}
                              className={`flex items-center justify-between p-2 rounded-xl transition-all cursor-pointer ${
                                isHighlighted ? 'bg-red-50 border border-red-200' : 'hover:bg-stone-50'
                              }`}
                            >
                              <div className="flex items-center gap-3 min-w-0">
                                <img
                                  src={property.imageUrl}
                                  alt={property.title}
                                  className="w-10 h-10 rounded-lg object-cover shrink-0 border border-stone-200"
                                />
                                <div className="min-w-0">
                                  <div className="text-xs sm:text-sm font-bold text-stone-900 truncate">
                                    {property.title}
                                  </div>
                                  <div className="flex items-center gap-2 text-[11px] text-stone-500 truncate">
                                    <span className="bg-stone-100 px-1.5 py-0.5 rounded font-medium text-stone-700">
                                      {property.type}
                                    </span>
                                    <span className="flex items-center gap-0.5 text-stone-700">
                                      <MapPin className="w-3 h-3 text-red-600" />
                                      {property.location}
                                    </span>
                                    <span>&bull;</span>
                                    <span className="text-red-700 font-bold">{property.price}</span>
                                  </div>
                                </div>
                              </div>

                              <button
                                type="button"
                                className="px-2.5 py-1 bg-stone-900 text-white rounded-lg text-xs font-bold shrink-0 hover:bg-stone-800 transition-colors cursor-pointer"
                              >
                                View Details
                              </button>
                            </div>
                          );
                        })}
                      </div>
                    ) : (
                      activeCategoryFilter === 'real-estate' && (
                        <div className="text-xs text-stone-600 px-2 py-2">
                          No property listings match "{query}".
                        </div>
                      )
                    )}
                  </div>
                )}

                {/* NO RESULTS FOUND STATE */}
                {!searchResults.hasResults && (
                  <div className="text-center py-6 px-4 space-y-2">
                    <div className="w-10 h-10 rounded-full bg-stone-100 flex items-center justify-center mx-auto text-stone-400">
                      <Search className="w-5 h-5" />
                    </div>
                    <div className="text-sm font-bold text-stone-900">
                      No direct matches for "{query}"
                    </div>
                    <p className="text-xs text-stone-500 max-w-sm mx-auto">
                      Gharkasathi covers 90+ services across Raipur and Delhi-NCR. Try searching "plumber", "sofa", "plot", "rent", or click below to talk to Sathi AI.
                    </p>
                    <div className="pt-2 flex flex-wrap justify-center gap-2">
                      <button
                        type="button"
                        onClick={() => {
                          setQuery('Cleaning');
                          inputRef.current?.focus();
                        }}
                        className="px-3 py-1 bg-stone-100 hover:bg-stone-200 text-stone-700 rounded-lg text-xs font-bold cursor-pointer"
                      >
                        Try "Cleaning"
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setQuery('Plumbing');
                          inputRef.current?.focus();
                        }}
                        className="px-3 py-1 bg-stone-100 hover:bg-stone-200 text-stone-700 rounded-lg text-xs font-bold cursor-pointer"
                      >
                        Try "Plumbing"
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setQuery('Plot');
                          inputRef.current?.focus();
                        }}
                        className="px-3 py-1 bg-stone-100 hover:bg-stone-200 text-stone-700 rounded-lg text-xs font-bold cursor-pointer"
                      >
                        Try "Plot"
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Bottom Footer Info Bar */}
          <div className="px-4 py-2.5 bg-stone-50 border-t border-stone-200 flex items-center justify-between text-[11px] text-stone-500">
            <span className="flex items-center gap-1 text-stone-600 font-medium">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              Verified In-House Partners &bull; 30-Min Rapid Dispatch &bull; CSGSP Certified
            </span>
            <button
              type="button"
              onClick={() => {
                setIsFocused(false);
                if (onSearchSubmit) onSearchSubmit(query);
              }}
              className="font-bold text-red-600 hover:text-red-700 cursor-pointer"
            >
              Search All &rarr;
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
