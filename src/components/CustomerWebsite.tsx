import React, { useState, useMemo } from 'react';
import { 
  MapPin, 
  Search, 
  Phone, 
  ShieldCheck, 
  Sparkles, 
  CheckCircle2, 
  ArrowRight, 
  Star, 
  Building2, 
  Hammer, 
  Clock, 
  ChevronRight, 
  Check, 
  X, 
  Calendar,
  Send,
  Wrench,
  Zap,
  Paintbrush,
  Refrigerator,
  Truck,
  ShieldAlert,
  Trees,
  ShoppingCart,
  PhoneCall,
  MessageCircle,
  ExternalLink,
  SlidersHorizontal,
  Home as HomeIcon,
  Compass,
  Lock,
  Instagram,
  Youtube,
  Linkedin,
  Twitter,
  Play
} from 'lucide-react';
import { GharkasathiLogo, GharkasathiEmblem } from './GharkasathiLogo';
import { BrandLogoModal } from './BrandLogoModal';
import { UnifiedSearchBar } from './UnifiedSearchBar';
import { 
  CORE_SERVICE_CATEGORIES, 
  CATALOG_SERVICES, 
  ServiceItem, 
  ServiceCategory 
} from '../data/homeServicesCatalog';
import { AUTHENTIC_PROPERTIES, AuthenticRealEstate } from '../data/teamImages';
import { CartItem } from '../data/cleaningCatalog';
import { ServiceOptionsModal, ServiceWithOptions } from './ServiceOptionsModal';
import { ServiceCategoryPage } from './ServiceCategoryPage';
import { CartDrawer } from './CartDrawer';
import { ConstructionBoqCalculator } from './ConstructionBoqCalculator';
import { ScheduleSiteVisitModal } from './ScheduleSiteVisitModal';
import { ModularKitchenModal } from './ModularKitchenModal';
import { GharkasathiAiAssistant } from './GharkasathiAiAssistant';
import { PartnerRegistrationModal } from './PartnerRegistrationModal';
import { CareAndMaintenanceSection } from './maintenance/CareAndMaintenanceSection';
import { CareMaintenanceModal } from './maintenance/CareMaintenanceModal';
import { FestiveBanner } from './FestiveBanner';

interface CustomerWebsiteProps {
  onOpenAdmin?: () => void;
}

export const CustomerWebsite: React.FC<CustomerWebsiteProps> = ({ onOpenAdmin }) => {
  // Location detection state
  const [selectedCity, setSelectedCity] = useState<string>('Raipur');
  const [userAddress, setUserAddress] = useState<string>('Shankar Nagar, Raipur (Auto-detected)');
  
  // Category & Search filter state
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Modals & Drawers
  const [selectedServiceForOptions, setSelectedServiceForOptions] = useState<ServiceItem | null>(null);
  const [selectedPropertyForVisit, setSelectedPropertyForVisit] = useState<AuthenticRealEstate | null>(null);
  const [isBoqModalOpen, setIsBoqModalOpen] = useState<boolean>(false);
  const [isModularKitchenModalOpen, setIsModularKitchenModalOpen] = useState<boolean>(false);
  const [isRealEstateModalOpen, setIsRealEstateModalOpen] = useState<boolean>(false);
  const [isCartDrawerOpen, setIsCartDrawerOpen] = useState<boolean>(false);
  const [isPartnerModalOpen, setIsPartnerModalOpen] = useState<boolean>(false);
  const [isLogoModalOpen, setIsLogoModalOpen] = useState<boolean>(false);
  const [partnerModalTab, setPartnerModalTab] = useState<'partner' | 'diy'>('partner');

  // Care & Maintenance Modal state
  const [isCareModalOpen, setIsCareModalOpen] = useState<boolean>(false);
  const [careModalTab, setCareModalTab] = useState<'explore' | 'builder' | 'dashboard' | 'assets'>('explore');
  const [careModalTarget, setCareModalTarget] = useState<'residential' | 'commercial'>('residential');

  const handleOpenCareModal = (
    tab: 'explore' | 'builder' | 'dashboard' | 'assets' = 'explore', 
    target: 'residential' | 'commercial' = 'residential'
  ) => {
    setCareModalTab(tab);
    setCareModalTarget(target);
    setIsCareModalOpen(true);
  };

  const openPartnerRegistration = () => {
    setPartnerModalTab('partner');
    setIsPartnerModalOpen(true);
  };

  const openDiyGuides = () => {
    setPartnerModalTab('diy');
    setIsPartnerModalOpen(true);
  };

  // Cart State with initial authentic item
  const [cart, setCart] = useState<CartItem[]>([
    {
      id: 'demo-cart-sofa',
      serviceId: 'clean-fabric-sofa',
      serviceName: 'Fabric Sofa Cleaning',
      categoryId: 'cleaning',
      categoryName: 'Cleaning',
      optionId: 'opt-sofa-3',
      optionName: '3 Seater Sofa',
      price: 549,
      convenienceFee: 16.47,
      totalPrice: 565.47,
      quantity: 1,
      imageUrl: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=800&q=80'
    }
  ]);

  // Handle adding service to cart
  const handleAddToCart = (newItem: CartItem) => {
    setCart(prev => {
      const existing = prev.find(item => item.optionId === newItem.optionId && item.serviceId === newItem.serviceId);
      if (existing) {
        return prev.map(item => 
          item.id === existing.id 
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, newItem];
    });
    setIsCartDrawerOpen(true);
  };

  const handleUpdateQuantity = (cartItemId: string, newQty: number) => {
    if (newQty <= 0) {
      handleRemoveFromCart(cartItemId);
      return;
    }
    setCart(prev => prev.map(item => item.id === cartItemId ? { ...item, quantity: newQty } : item));
  };

  const handleRemoveFromCart = (cartItemId: string) => {
    setCart(prev => prev.filter(item => item.id !== cartItemId));
  };

  const handleClearCart = () => {
    setCart([]);
  };

  // Icon mapper for the 9 categories
  const getCategoryIcon = (iconName: string) => {
    switch (iconName) {
      case 'Hammer': return <Hammer className="w-5 h-5 text-red-600" />;
      case 'Zap': return <Zap className="w-5 h-5 text-red-600" />;
      case 'Wrench': return <Wrench className="w-5 h-5 text-red-600" />;
      case 'Paintbrush': return <Paintbrush className="w-5 h-5 text-red-600" />;
      case 'Sparkles': return <Sparkles className="w-5 h-5 text-red-600" />;
      case 'Refrigerator': return <Refrigerator className="w-5 h-5 text-red-600" />;
      case 'Truck': return <Truck className="w-5 h-5 text-red-600" />;
      case 'ShieldAlert': return <ShieldAlert className="w-5 h-5 text-red-600" />;
      case 'Trees': return <Trees className="w-5 h-5 text-red-600" />;
      default: return <Wrench className="w-5 h-5 text-red-600" />;
    }
  };

  // Filter services based on activeCategory and searchQuery
  const filteredServices = useMemo(() => {
    return CATALOG_SERVICES.filter(service => {
      const matchesCategory = activeCategory === 'all' || service.categoryId === activeCategory;
      const matchesSearch = !searchQuery.trim() || 
        service.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        service.categoryName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        service.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  // Smooth scroll to services section
  const scrollToServices = (catId?: string) => {
    if (catId) setActiveCategory(catId);
    const element = document.getElementById('our-services-section');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#F7F8FA] text-[#151515] font-sans selection:bg-red-600 selection:text-white flex flex-col">
      {/* 1. Customer Top Contact & HQ Strip */}
      <div className="bg-stone-900 text-stone-300 text-[11px] py-2 px-4 border-b border-stone-800">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-1.5 sm:gap-4">
          <div className="flex items-center gap-1.5 text-stone-400">
            <MapPin className="w-3 h-3 text-red-500 shrink-0" />
            <a 
              href="https://share.google/zXAKoT57h4zm1cYxi" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hover:text-white transition-colors underline decoration-stone-600 underline-offset-2 flex items-center gap-1"
              title="Open Gharkasathi HQ on Google Maps"
            >
              <span>4th Floor, Currency Tower, Telibandha, VIP Road, Raipur (HQ)</span>
              <ExternalLink className="w-2.5 h-2.5 text-stone-400" />
            </a>
          </div>
          <div className="flex items-center flex-wrap justify-center gap-3 text-stone-300 font-medium">
            <a href="tel:+917770999122" className="hover:text-white flex items-center gap-1 transition-colors">
              <Phone className="w-3 h-3 text-red-500" />
              <span>+91 77709 99122</span>
            </a>
            <span className="text-stone-600">|</span>
            <a href="tel:+917477244487" className="hover:text-white transition-colors">
              <span>+91 74772 44487</span>
            </a>
            <span className="text-stone-600 hidden md:inline">|</span>
            <a href="mailto:support@gharkasathi.com" className="hover:text-white transition-colors hidden md:inline">
              <span>support@gharkasathi.com</span>
            </a>
            <span className="text-stone-700 hidden sm:inline">|</span>
            {/* Official Social Links in Header */}
            <div className="flex items-center gap-2">
              <a 
                href="https://www.instagram.com/gharkasathi?stkn=bWJxcHJyNG93M2Rp&utm_source=qr" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-stone-400 hover:text-[#E4405F] transition-colors p-0.5" 
                title="Follow Gharkasathi on Instagram"
                aria-label="Instagram"
              >
                <Instagram className="w-3.5 h-3.5" />
              </a>
              <a 
                href="https://youtube.com/@gharkasathi?si=OY1QA5jOUFpAhXoP" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-stone-400 hover:text-[#FF0000] transition-colors p-0.5" 
                title="Subscribe to Gharkasathi on YouTube"
                aria-label="YouTube"
              >
                <Youtube className="w-3.5 h-3.5" />
              </a>
              <a 
                href="https://www.linkedin.com/company/gharkasathi/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-stone-400 hover:text-[#0A66C2] transition-colors p-0.5" 
                title="Connect with Gharkasathi on LinkedIn"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-3.5 h-3.5" />
              </a>
              <a 
                href="https://x.com/gharkasathi?s=11" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-stone-400 hover:text-white transition-colors p-0.5" 
                title="Follow Gharkasathi on X (Twitter)"
                aria-label="X (Twitter)"
              >
                <Twitter className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Festive Dynamic Offer Ticker */}
      <FestiveBanner />

      {/* 2. Global Sleek Header */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-stone-200 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20 gap-3">
            {/* Logo & Tagline (Clickable to open official Brand Logo Center) */}
            <div className="flex items-center gap-4">
              <button
                onClick={() => setIsLogoModalOpen(true)}
                title="Gharkasathi™ Official Brand Identity (Click to view or upload SVG)"
                className="text-left group cursor-pointer hover:opacity-95 transition-opacity"
              >
                <GharkasathiLogo 
                  size="md" 
                  variant="light" 
                  layout="master-lockup"
                  sloganText="All Your Home Needs, Under One Roof." 
                />
              </button>
            </div>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center gap-6 text-xs font-bold text-stone-700">
              <button 
                onClick={() => setIsRealEstateModalOpen(true)}
                className="hover:text-red-600 transition-colors cursor-pointer"
              >
                Real Estate
              </button>
              <button 
                onClick={() => setIsBoqModalOpen(true)}
                className="hover:text-red-600 transition-colors cursor-pointer"
              >
                Construction
              </button>
              <button 
                onClick={() => setIsModularKitchenModalOpen(true)}
                className="hover:text-red-600 transition-colors cursor-pointer"
              >
                Interior
              </button>
              <button 
                onClick={() => scrollToServices('all')}
                className="text-stone-700 hover:text-red-600 font-bold transition-colors cursor-pointer"
              >
                Home Services
              </button>
              <button 
                onClick={() => handleOpenCareModal('explore', 'residential')}
                className="hover:text-red-600 transition-colors cursor-pointer"
              >
                Care &amp; AMC
              </button>
            </nav>

            {/* Search, Location, Cart & Quick Action */}
            <div className="flex items-center gap-2 sm:gap-3">
              {/* Location Selector */}
              <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1.5 rounded-full bg-stone-100 border border-stone-200 text-xs text-stone-700">
                <MapPin className="w-3.5 h-3.5 text-red-600 shrink-0" />
                <select 
                  value={selectedCity} 
                  onChange={(e) => setSelectedCity(e.target.value)}
                  className="bg-transparent border-none text-xs font-semibold focus:outline-hidden cursor-pointer"
                >
                  <option value="Raipur">Raipur, CG</option>
                  <option value="Bhilai">Bhilai, CG</option>
                  <option value="Durg">Durg, CG</option>
                  <option value="Bilaspur">Bilaspur, CG</option>
                </select>
              </div>

              {/* Cart Drawer Trigger */}
              <button
                onClick={() => setIsCartDrawerOpen(true)}
                className="relative p-2.5 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-700 transition-colors cursor-pointer"
                title="View Service Cart"
                aria-label="View Cart"
              >
                <ShoppingCart className="w-4 h-4" />
                {cart.length > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-red-600 text-white text-[10px] font-black flex items-center justify-center">
                    {cart.reduce((a, b) => a + b.quantity, 0)}
                  </span>
                )}
              </button>

              {/* Register as Service Partner CTA */}
              <button
                onClick={openPartnerRegistration}
                className="hidden md:inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white text-xs font-bold border border-emerald-700 shadow-xs transition-colors cursor-pointer"
                title="Earn ₹25,000 - ₹75,000/mo with daily payouts & zero onboarding fee"
              >
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-300" />
                <span>Register as Service Partner</span>
              </button>

              {/* Primary Header CTA */}
              <button
                onClick={() => scrollToServices('all')}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-bold shadow-sm shadow-red-600/30 transition-all cursor-pointer"
              >
                <span>Book a Service</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* 3. Hero Section: Minimal, High-Impact & Direct */}
      <section className="bg-linear-to-b from-white to-[#F7F8FA] border-b border-stone-200/80 pt-8 pb-10 sm:pt-12 sm:pb-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-5">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-50 border border-red-200 text-red-700 text-xs font-bold">
            <Sparkles className="w-3.5 h-3.5 text-red-600" />
            <span>Official Gharkasathi Platform &bull; All Property Needs Under One Roof</span>
          </div>

          {/* Main Headline with High-Impact Red and White Highlights */}
          <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tight max-w-4xl mx-auto flex flex-col items-center justify-center gap-2 sm:gap-3">
            <span className="inline-block bg-red-600 text-white px-4 sm:px-6 py-1.5 sm:py-2 rounded-xl sm:rounded-2xl shadow-sm tracking-tight leading-tight">
              Everything Your Property
            </span>
            <span className="inline-block bg-red-600 text-white px-5 sm:px-8 py-1.5 sm:py-2 rounded-xl sm:rounded-2xl shadow-sm tracking-tight leading-tight">
              Needs.
            </span>
          </h1>

          <p className="text-stone-600 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            <strong className="text-stone-900">Buy. Build. Design. Maintain.</strong> — From finding verified land to turnkey construction, custom interiors, and 30-minute verified home maintenance.
          </p>

          {/* Instant Global Dynamic Animated Unified Search Bar */}
          <div className="max-w-2xl mx-auto pt-2">
            <UnifiedSearchBar
              variant="hero"
              onSelectService={(service) => {
                setSelectedServiceForOptions(service);
              }}
              onSelectProperty={(property) => {
                setSelectedPropertyForVisit(property);
              }}
              onOpenBoq={() => setIsBoqModalOpen(true)}
              onOpenModularKitchen={() => setIsModularKitchenModalOpen(true)}
              onSearchSubmit={(queryStr) => {
                setSearchQuery(queryStr);
                scrollToServices();
              }}
            />
          </div>

          {/* Quick Primary Service Categories Strip */}
          <div className="max-w-4xl mx-auto pt-4">
            <div className="flex items-center justify-center flex-wrap gap-2.5 sm:gap-3">
              {[
                { id: 'carpenter', name: 'Carpenter', icon: Hammer },
                { id: 'electrician', name: 'Electrician', icon: Zap },
                { id: 'plumber', name: 'Plumber', icon: Wrench },
                { id: 'painting', name: 'Painting', icon: Paintbrush },
                { id: 'cleaning', name: 'Cleaning', icon: Sparkles },
                { id: 'home-appliances', name: 'Appliances', icon: Refrigerator },
                { id: 'movers-packers', name: 'Movers & Packers', icon: Truck },
                { id: 'pest-control', name: 'Pest Control', icon: ShieldAlert },
                { id: 'gardening', name: 'Gardening', icon: Trees },
              ].map((cat) => {
                const IconComp = cat.icon;
                return (
                  <button
                    key={cat.id}
                    onClick={() => scrollToServices(cat.id)}
                    className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white hover:bg-red-50 hover:border-red-300 border border-stone-200/90 shadow-2xs hover:shadow-xs transition-all text-stone-800 hover:text-red-600 text-xs sm:text-sm font-bold cursor-pointer group"
                  >
                    <IconComp className="w-4 h-4 text-red-600 group-hover:scale-110 transition-transform" />
                    <span>{cat.name}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* 4. EXPLORE OUR SERVICES: The 4 Primary Verticals */}
      <section id="explore-verticals" className="py-10 sm:py-14 bg-white border-b border-stone-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 border-b border-stone-200 pb-4">
            <div>
              <div className="flex items-center gap-2 text-red-600 text-xs font-bold uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Core Ecosystem</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-stone-900 tracking-tight mt-1">
                Explore Our Services
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-stone-500 max-w-md">
              Gharkasathi covers your entire property journey across 4 unified verticals.
            </p>
          </div>

          {/* 4 Verticals Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {/* 1. Real Estate */}
            <div className="group bg-[#F7F8FA] hover:bg-white rounded-2xl border border-stone-200 hover:border-red-600/40 p-5 shadow-xs hover:shadow-md transition-all flex flex-col justify-between">
              <div className="space-y-3">
                <div className="w-12 h-12 rounded-xl bg-red-50 text-red-600 flex items-center justify-center font-bold">
                  <Building2 className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-black text-stone-900">Real Estate</h3>
                  <p className="text-xs font-semibold text-stone-500 mt-0.5">Find Your Next Property</p>
                </div>
                <p className="text-xs text-stone-600 leading-relaxed">
                  Buy, sell, rent RERA-verified residential plots, duplexes, commercial spaces &amp; luxury villas in {selectedCity}.
                </p>
                <div className="pt-1 flex flex-wrap gap-1.5 text-[11px] text-stone-500 font-medium">
                  <span className="px-2 py-0.5 rounded-md bg-stone-200/60">Residential</span>
                  <span className="px-2 py-0.5 rounded-md bg-stone-200/60">Plots</span>
                  <span className="px-2 py-0.5 rounded-md bg-stone-200/60">Free Cab Visit</span>
                </div>
              </div>

              <div className="pt-5 mt-4 border-t border-stone-200/60">
                <button
                  onClick={() => setIsRealEstateModalOpen(true)}
                  className="w-full py-2.5 px-3 rounded-xl bg-white group-hover:bg-red-600 text-stone-900 group-hover:text-white border border-stone-300 group-hover:border-red-600 text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <span>Explore Properties</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* 2. Construction */}
            <div className="group bg-[#F7F8FA] hover:bg-white rounded-2xl border border-stone-200 hover:border-red-600/40 p-5 shadow-xs hover:shadow-md transition-all flex flex-col justify-between">
              <div className="space-y-3">
                <div className="w-12 h-12 rounded-xl bg-red-50 text-red-600 flex items-center justify-center font-bold">
                  <Hammer className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-black text-stone-900">Construction</h3>
                  <p className="text-xs font-semibold text-stone-500 mt-0.5">Build With Confidence</p>
                </div>
                <p className="text-xs text-stone-600 leading-relaxed">
                  Turnkey residential &amp; commercial contracts from ₹1,600/sq.ft with Jindal TMT, UltraTech Cement &amp; 10-Yr warranty.
                </p>
                <div className="pt-1 flex flex-wrap gap-1.5 text-[11px] text-stone-500 font-medium">
                  <span className="px-2 py-0.5 rounded-md bg-stone-200/60">Turnkey Civil</span>
                  <span className="px-2 py-0.5 rounded-md bg-stone-200/60">Live BOQ</span>
                  <span className="px-2 py-0.5 rounded-md bg-stone-200/60">7-Mo Handover</span>
                </div>
              </div>

              <div className="pt-5 mt-4 border-t border-stone-200/60">
                <button
                  onClick={() => setIsBoqModalOpen(true)}
                  className="w-full py-2.5 px-3 rounded-xl bg-white group-hover:bg-red-600 text-stone-900 group-hover:text-white border border-stone-300 group-hover:border-red-600 text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <span>Start Your Project</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* 3. Interior */}
            <div className="group bg-[#F7F8FA] hover:bg-white rounded-2xl border border-stone-200 hover:border-red-600/40 p-5 shadow-xs hover:shadow-md transition-all flex flex-col justify-between">
              <div className="space-y-3">
                <div className="w-12 h-12 rounded-xl bg-red-50 text-red-600 flex items-center justify-center font-bold">
                  <Sparkles className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-black text-stone-900">Interior</h3>
                  <p className="text-xs font-semibold text-stone-500 mt-0.5">Design Your Space</p>
                </div>
                <p className="text-xs text-stone-600 leading-relaxed">
                  Waterproof HDHMR modular kitchens, German Blum/Hettich fittings, designer wardrobes &amp; false ceilings.
                </p>
                <div className="pt-1 flex flex-wrap gap-1.5 text-[11px] text-stone-500 font-medium">
                  <span className="px-2 py-0.5 rounded-md bg-stone-200/60">Modular Kitchen</span>
                  <span className="px-2 py-0.5 rounded-md bg-stone-200/60">Wardrobes</span>
                  <span className="px-2 py-0.5 rounded-md bg-stone-200/60">3D Elevation</span>
                </div>
              </div>

              <div className="pt-5 mt-4 border-t border-stone-200/60">
                <button
                  onClick={() => setIsModularKitchenModalOpen(true)}
                  className="w-full py-2.5 px-3 rounded-xl bg-white group-hover:bg-red-600 text-stone-900 group-hover:text-white border border-stone-300 group-hover:border-red-600 text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <span>Explore Interiors</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* 4. Home Services */}
            <div className="group bg-[#F7F8FA] hover:bg-white rounded-2xl border border-stone-200 hover:border-red-600/40 p-5 shadow-xs hover:shadow-md transition-all flex flex-col justify-between">
              <div className="space-y-3">
                <div className="w-12 h-12 rounded-xl bg-red-50 text-red-600 flex items-center justify-center font-bold">
                  <Wrench className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-black text-stone-900">Home Services</h3>
                  <p className="text-xs font-semibold text-stone-500 mt-0.5">Professional Care For Your Home</p>
                </div>
                <p className="text-xs text-stone-600 leading-relaxed">
                  9 on-demand home categories: Carpenter, Electrician, Plumber, Cleaning, Appliances, Movers &amp; more in 30 mins.
                </p>
                <div className="pt-1 flex flex-wrap gap-1.5 text-[11px] text-stone-500 font-medium">
                  <span className="px-2 py-0.5 rounded-md bg-stone-200/60">9 Categories</span>
                  <span className="px-2 py-0.5 rounded-md bg-stone-200/60">30-Min Dispatch</span>
                  <span className="px-2 py-0.5 rounded-md bg-stone-200/60">Uniformed Sathis</span>
                </div>
              </div>

              <div className="pt-5 mt-4 border-t border-stone-200/60">
                <button
                  onClick={() => scrollToServices('all')}
                  className="w-full py-2.5 px-3 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-bold shadow-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <span>Book a Service</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. OUR SERVICES: Universal Data-Driven Service Category Experience */}
      <section id="our-services-section" className="border-t border-stone-200">
        <ServiceCategoryPage
          categorySlug={activeCategory === 'all' ? 'electrician' : activeCategory}
          cart={cart}
          onAddToCart={handleAddToCart}
          onUpdateQuantity={handleUpdateQuantity}
          onRemoveFromCart={handleRemoveFromCart}
          onOpenCartDrawer={() => setIsCartDrawerOpen(true)}
          onSelectCategory={(slug) => {
            setActiveCategory(slug);
            const el = document.getElementById('our-services-section');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }}
          onBackToHome={() => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
        />
      </section>

      {/* 5.5 CARE & MAINTENANCE (HMC, QMC, AMC & CUSTOM BUILDER) */}
      <CareAndMaintenanceSection onOpenModal={handleOpenCareModal} />

      {/* 6. TRUST & BRAND ASSURANCE (Minimal 4-Pillar Row) */}
      <section className="py-10 bg-white border-y border-stone-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div className="space-y-1.5">
              <div className="w-10 h-10 rounded-xl bg-red-50 text-red-600 flex items-center justify-center mx-auto">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h4 className="text-xs font-bold text-stone-900 uppercase tracking-wider">Police Verified</h4>
              <p className="text-[11px] text-stone-500">All technicians background checked with Aadhaar KYC</p>
            </div>

            <div className="space-y-1.5">
              <div className="w-10 h-10 rounded-xl bg-red-50 text-red-600 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <h4 className="text-xs font-bold text-stone-900 uppercase tracking-wider">Fixed Rate Card</h4>
              <p className="text-[11px] text-stone-500">Zero on-spot bargaining. Transparent app pricing</p>
            </div>

            <div className="space-y-1.5">
              <div className="w-10 h-10 rounded-xl bg-red-50 text-red-600 flex items-center justify-center mx-auto">
                <Clock className="w-5 h-5" />
              </div>
              <h4 className="text-xs font-bold text-stone-900 uppercase tracking-wider">30-Min Dispatch</h4>
              <p className="text-[11px] text-stone-500">Emergency plumbers &amp; electricians on prompt standby</p>
            </div>

            <div className="space-y-1.5">
              <div className="w-10 h-10 rounded-xl bg-red-50 text-red-600 flex items-center justify-center mx-auto">
                <Building2 className="w-5 h-5" />
              </div>
              <h4 className="text-xs font-bold text-stone-900 uppercase tracking-wider">Under One Roof</h4>
              <p className="text-[11px] text-stone-500">From land &amp; building to repairs &amp; cleaning</p>
            </div>
          </div>
        </div>
      </section>

      {/* 7. REAL ESTATE MODAL (Properties & Free AC Cab Site Visit) */}
      {isRealEstateModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in">
          <div className="bg-white w-full max-w-3xl rounded-3xl p-6 shadow-2xl space-y-6 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-stone-200 pb-4">
              <div>
                <div className="flex items-center gap-2">
                  <Building2 className="w-5 h-5 text-red-600" />
                  <h3 className="text-lg font-bold text-stone-900">RERA-Approved Plots &amp; Real Estate</h3>
                </div>
                <p className="text-xs text-stone-500 mt-0.5">
                  Direct registry, zero brokerage &amp; complimentary AC cab doorstep pickup in {selectedCity}.
                </p>
              </div>
              <button
                onClick={() => setIsRealEstateModalOpen(false)}
                className="w-8 h-8 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-500 flex items-center justify-center cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {AUTHENTIC_PROPERTIES.map((prop) => (
                <div key={prop.id} className="border border-stone-200 rounded-2xl p-4 bg-stone-50 space-y-3">
                  <div className="aspect-16/10 rounded-xl overflow-hidden bg-stone-200">
                    <img src={prop.imageUrl} alt={prop.title} className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 uppercase">
                      {prop.reraApproved ? 'RERA Approved' : prop.status}
                    </span>
                    <h4 className="text-sm font-bold text-stone-900 mt-1">{prop.title}</h4>
                    <p className="text-xs text-stone-500 flex items-center gap-1 mt-0.5">
                      <MapPin className="w-3 h-3 text-red-600" /> {prop.location}
                    </p>
                  </div>
                  <div className="flex items-center justify-between text-xs pt-2 border-t border-stone-200">
                    <div>
                      <span className="text-stone-400 block text-[10px]">Price</span>
                      <strong className="text-stone-900">{prop.price}</strong>
                    </div>
                    <button
                      onClick={() => {
                        setSelectedPropertyForVisit(prop);
                        setIsRealEstateModalOpen(false);
                      }}
                      className="px-3 py-1.5 rounded-xl bg-red-600 text-white text-xs font-bold hover:bg-red-700 cursor-pointer"
                    >
                      Book Free Cab Visit
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 8. SERVICE OPTIONS BOTTOM SHEET / MODAL */}
      {selectedServiceForOptions && (
        <ServiceOptionsModal
          service={{
            id: selectedServiceForOptions.id,
            name: selectedServiceForOptions.name,
            categoryId: selectedServiceForOptions.categoryId,
            categoryName: selectedServiceForOptions.categoryName,
            basePrice: selectedServiceForOptions.basePrice,
            imageUrl: selectedServiceForOptions.imageUrl,
            optionsLabel: selectedServiceForOptions.optionsLabel,
            options: selectedServiceForOptions.options
          }}
          onClose={() => setSelectedServiceForOptions(null)}
          onAddToCart={handleAddToCart}
        />
      )}

      {/* 9. CART DRAWER */}
      <CartDrawer
        isOpen={isCartDrawerOpen}
        onClose={() => setIsCartDrawerOpen(false)}
        cart={cart}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveFromCart}
        onClearCart={handleClearCart}
      />

      {/* 10. TURNKEY CONSTRUCTION BOQ ESTIMATOR MODAL */}
      <ConstructionBoqCalculator
        isOpen={isBoqModalOpen}
        onClose={() => setIsBoqModalOpen(false)}
        selectedCity={selectedCity}
      />

      {/* 11. MODULAR KITCHEN & INTERIOR MODAL */}
      <ModularKitchenModal
        isOpen={isModularKitchenModalOpen}
        onClose={() => setIsModularKitchenModalOpen(false)}
        selectedCity={selectedCity}
      />

      {/* 12. FREE AC CAB SITE VISIT MODAL */}
      <ScheduleSiteVisitModal
        isOpen={Boolean(selectedPropertyForVisit)}
        onClose={() => setSelectedPropertyForVisit(null)}
        property={selectedPropertyForVisit}
        selectedCity={selectedCity}
      />

      {/* 13. PARTNER SELF-ONBOARDING & DIY HUB MODAL */}
      <PartnerRegistrationModal
        isOpen={isPartnerModalOpen}
        onClose={() => setIsPartnerModalOpen(false)}
        selectedCity={selectedCity}
        initialTab={partnerModalTab}
        onBookService={(cat) => scrollToServices(cat)}
      />

      {/* Brand Identity & Official SVG Logo Center Modal */}
      <BrandLogoModal
        isOpen={isLogoModalOpen}
        onClose={() => setIsLogoModalOpen(false)}
      />

      {/* Care & Maintenance Master Portal Modal */}
      <CareMaintenanceModal
        isOpen={isCareModalOpen}
        onClose={() => setIsCareModalOpen(false)}
        initialTab={careModalTab}
        initialTarget={careModalTarget}
      />

      {/* 14. SATHI AI ASSISTANT (FLOATING) */}
      <GharkasathiAiAssistant
        onOpenBoq={() => setIsBoqModalOpen(true)}
        onOpenSiteVisit={() => {
          if (AUTHENTIC_PROPERTIES.length > 0) {
            setSelectedPropertyForVisit(AUTHENTIC_PROPERTIES[0]);
          }
        }}
        onOpenHandyman={() => scrollToServices('electrician')}
        selectedCity={selectedCity}
      />

      {/* DIY Self-Help & Free Home Guides Callout (Down Bar) */}
      <section className="bg-stone-950 border-t border-b border-stone-800 py-4 px-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 shrink-0">
              <Wrench className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs font-bold text-amber-400 block">Do It On Your Own (DIY Home Care Hub)</span>
              <p className="text-xs text-stone-400">Step-by-step self-repair guides, circuit safety rules, tool checklists &amp; quick plumbing fixes.</p>
            </div>
          </div>
          <button
            onClick={openDiyGuides}
            className="px-4 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-stone-950 text-xs font-black transition-all flex items-center justify-center gap-2 cursor-pointer shrink-0 shadow-md active:scale-95"
          >
            <Wrench className="w-3.5 h-3.5 text-stone-950" />
            <span>Do It On Your Own (DIY)</span>
            <ArrowRight className="w-3.5 h-3.5 text-stone-950" />
          </button>
        </div>
      </section>

      {/* 14. REFINED GREYISH & LIGHT RED HIGHLIGHT CORPORATE FOOTER */}
      <footer className="bg-stone-100 text-stone-700 pt-12 pb-8 border-t-2 border-red-100 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Column 1: Brand */}
            <div className="space-y-3 md:col-span-1">
              <button
                onClick={() => setIsLogoModalOpen(true)}
                title="Gharkasathi™ Official Brand Identity"
                className="text-left cursor-pointer hover:opacity-90 transition-opacity"
              >
                <GharkasathiLogo 
                  size="md" 
                  variant="light" 
                  layout="master-lockup"
                  sloganText="All Your Home Needs, Under One Roof." 
                />
              </button>
              <p className="text-xs text-stone-600 leading-relaxed pt-1">
                India's unified property ecosystem — from land purchase to turnkey construction, custom modular interiors, and 30-minute verified home maintenance.
              </p>

              {/* Official Social Media Channels */}
              <div className="pt-2">
                <p className="text-[11px] uppercase tracking-wider font-bold text-stone-500 mb-2">
                  Follow Us Online
                </p>
                <div className="flex items-center gap-2">
                  <a
                    href="https://www.instagram.com/gharkasathi?stkn=bWJxcHJyNG93M2Rp&utm_source=qr"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-8 h-8 rounded-lg bg-white hover:bg-[#E4405F] text-stone-600 hover:text-white flex items-center justify-center transition-all duration-200 shadow-2xs border border-stone-200 group"
                    title="Follow @gharkasathi on Instagram"
                    aria-label="Instagram"
                  >
                    <Instagram className="w-4 h-4 group-hover:scale-110 transition-transform" />
                  </a>
                  <a
                    href="https://youtube.com/@gharkasathi?si=OY1QA5jOUFpAhXoP"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-8 h-8 rounded-lg bg-white hover:bg-[#FF0000] text-stone-600 hover:text-white flex items-center justify-center transition-all duration-200 shadow-2xs border border-stone-200 group"
                    title="Subscribe to @gharkasathi on YouTube"
                    aria-label="YouTube"
                  >
                    <Youtube className="w-4 h-4 group-hover:scale-110 transition-transform" />
                  </a>
                  <a
                    href="https://www.linkedin.com/company/gharkasathi/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-8 h-8 rounded-lg bg-white hover:bg-[#0A66C2] text-stone-600 hover:text-white flex items-center justify-center transition-all duration-200 shadow-2xs border border-stone-200 group"
                    title="Connect with Gharkasathi on LinkedIn"
                    aria-label="LinkedIn"
                  >
                    <Linkedin className="w-4 h-4 group-hover:scale-110 transition-transform" />
                  </a>
                  <a
                    href="https://x.com/gharkasathi?s=11"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-8 h-8 rounded-lg bg-white hover:bg-stone-900 text-stone-600 hover:text-white flex items-center justify-center transition-all duration-200 shadow-2xs border border-stone-200 group"
                    title="Follow @gharkasathi on X (Twitter)"
                    aria-label="X (Twitter)"
                  >
                    <Twitter className="w-4 h-4 group-hover:scale-110 transition-transform" />
                  </a>
                </div>
              </div>
            </div>

            {/* Column 2: Explore Verticals */}
            <div className="space-y-3">
              <h4 className="text-xs font-black text-stone-900 uppercase tracking-wider">Explore Verticals</h4>
              <ul className="space-y-2 text-xs text-stone-600">
                <li>
                  <button onClick={() => setIsRealEstateModalOpen(true)} className="hover:text-red-600 cursor-pointer">
                    Real Estate (Buy, Sell, Plots)
                  </button>
                </li>
                <li>
                  <button onClick={() => setIsBoqModalOpen(true)} className="hover:text-red-600 cursor-pointer">
                    Construction (Turnkey Civil &amp; BOQ)
                  </button>
                </li>
                <li>
                  <button onClick={() => setIsModularKitchenModalOpen(true)} className="hover:text-red-600 cursor-pointer">
                    Interior (Residential &amp; Commercial)
                  </button>
                </li>
                <li>
                  <button onClick={() => scrollToServices('all')} className="hover:text-red-600 cursor-pointer">
                    Home Services (9 Categories)
                  </button>
                </li>
                <li>
                  <button onClick={() => handleOpenCareModal('explore', 'residential')} className="text-red-600 hover:text-red-700 font-bold cursor-pointer flex items-center gap-1 text-left">
                    <span>Care &amp; Maintenance (HMC, AMC, QMC)</span>
                  </button>
                </li>
                <li className="pt-2 border-t border-stone-200 space-y-1.5">
                  <button 
                    onClick={openPartnerRegistration} 
                    className="text-emerald-700 hover:text-emerald-800 font-bold flex items-center gap-1.5 cursor-pointer text-left"
                  >
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>★ Register as a Service Partner</span>
                  </button>
                  <button 
                    onClick={openDiyGuides} 
                    className="text-amber-700 hover:text-amber-800 font-semibold flex items-center gap-1.5 cursor-pointer text-left text-[11px]"
                  >
                    <Wrench className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                    <span>★ Do It On Your Own (DIY Hub)</span>
                  </button>
                </li>
              </ul>
            </div>

            {/* Column 3: 9 Service Categories */}
            <div className="space-y-3">
              <h4 className="text-xs font-black text-stone-900 uppercase tracking-wider">9 Home Services</h4>
              <ul className="grid grid-cols-2 gap-x-2 gap-y-1.5 text-xs text-stone-600">
                {CORE_SERVICE_CATEGORIES.map(cat => (
                  <li key={cat.id}>
                    <button onClick={() => scrollToServices(cat.id)} className="hover:text-red-600 cursor-pointer text-left">
                      {cat.name}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 4: Contact & Operations */}
            <div className="space-y-3">
              <h4 className="text-xs font-black text-stone-900 uppercase tracking-wider">Headquarters &amp; Support</h4>
              <div className="text-xs text-stone-600 leading-relaxed">
                <a 
                  href="https://share.google/zXAKoT57h4zm1cYxi"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-stone-900 flex items-start gap-1.5 group transition-colors"
                  title="Open Gharkasathi HQ in Google Maps"
                >
                  <MapPin className="w-3.5 h-3.5 text-red-600 shrink-0 mt-0.5 group-hover:scale-110 transition-transform" />
                  <span>
                    4th Floor, Currency Tower, Telibandha, VIP Road, Raipur, Chhattisgarh 492001
                    <span className="block text-[11px] text-red-600 group-hover:text-red-700 font-semibold mt-0.5 underline">
                      View on Google Maps &rarr;
                    </span>
                  </span>
                </a>
              </div>
              <div className="space-y-1.5 text-xs text-stone-700">
                <p>
                  📞 Phone:{' '}
                  <a href="tel:+917770999122" className="hover:text-red-600 font-semibold underline">
                    +91 77709 99122
                  </a>
                  <span className="text-stone-400 mx-1">|</span>
                  <a href="tel:+917477244487" className="hover:text-red-600 font-semibold underline">
                    +91 74772 44487
                  </a>
                </p>
                <p>
                  💬 WhatsApp:{' '}
                  <a 
                    href="https://wa.me/917770999122?text=Hello%20Gharkasathi%20Support" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="hover:text-emerald-700 text-emerald-800 font-semibold underline"
                  >
                    +91 77709 99122
                  </a>
                </p>
                <p>
                  ✉️ Email:{' '}
                  <a href="mailto:support@gharkasathi.com" className="hover:text-red-600 font-medium underline">
                    support@gharkasathi.com
                  </a>
                </p>
                <div className="pt-2 border-t border-stone-200">
                  <p className="text-[11px] text-stone-500 font-medium mb-1.5">Official Social Channels:</p>
                  <div className="flex flex-wrap gap-1.5 text-[11px]">
                    <a 
                      href="https://www.instagram.com/gharkasathi?stkn=bWJxcHJyNG93M2Rp&utm_source=qr" 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="px-2 py-1 rounded-md bg-white hover:bg-[#E4405F]/10 text-stone-700 hover:text-[#E4405F] transition-colors flex items-center gap-1 border border-stone-200 hover:border-[#E4405F]/40 shadow-2xs"
                    >
                      <Instagram className="w-3 h-3 text-[#E4405F]" />
                      <span>Instagram</span>
                    </a>
                    <a 
                      href="https://youtube.com/@gharkasathi?si=OY1QA5jOUFpAhXoP" 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="px-2 py-1 rounded-md bg-white hover:bg-[#FF0000]/10 text-stone-700 hover:text-[#FF0000] transition-colors flex items-center gap-1 border border-stone-200 hover:border-[#FF0000]/40 shadow-2xs"
                    >
                      <Youtube className="w-3 h-3 text-[#FF0000]" />
                      <span>YouTube</span>
                    </a>
                    <a 
                      href="https://www.linkedin.com/company/gharkasathi/" 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="px-2 py-1 rounded-md bg-white hover:bg-[#0A66C2]/10 text-stone-700 hover:text-[#0A66C2] transition-colors flex items-center gap-1 border border-stone-200 hover:border-[#0A66C2]/40 shadow-2xs"
                    >
                      <Linkedin className="w-3 h-3 text-[#0A66C2]" />
                      <span>LinkedIn</span>
                    </a>
                    <a 
                      href="https://x.com/gharkasathi?s=11" 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="px-2 py-1 rounded-md bg-white hover:bg-stone-200 text-stone-700 hover:text-stone-900 transition-colors flex items-center gap-1 border border-stone-200 hover:border-stone-400 shadow-2xs"
                    >
                      <Twitter className="w-3 h-3 text-stone-700" />
                      <span>X</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-6 border-t border-stone-200 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-500">
            <p>&copy; {new Date().getFullYear()} Gharkasathi Innoventure Private Limited. All rights reserved.</p>
            
            {/* Last Down Bar: DIY Quick Access & Locations & Admin */}
            <div className="flex items-center flex-wrap gap-3">
              <button
                onClick={openDiyGuides}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-300 text-xs font-bold transition-all cursor-pointer shadow-2xs"
                title="Free DIY home troubleshooting guides, tool lists & maintenance safety"
              >
                <Wrench className="w-3.5 h-3.5 text-amber-600" />
                <span>Do It On Your Own (DIY)</span>
              </button>

              <span className="hidden sm:inline text-stone-300">|</span>
              <span className="text-stone-600 font-medium">Raipur &bull; Bhilai &bull; Durg &bull; Bilaspur</span>
              
              {onOpenAdmin && (
                <button
                  onClick={onOpenAdmin}
                  className="text-stone-500 hover:text-red-600 transition-colors cursor-pointer text-[11px] flex items-center gap-1.5 ml-1"
                  title="Authorized Staff & Administration Portal"
                >
                  <Lock className="w-3 h-3 text-stone-400" />
                  <span>Admin Login</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};
