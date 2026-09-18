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
  Twitter
} from 'lucide-react';
import { GharkasathiLogo, GharkasathiEmblem } from './GharkasathiLogo';
import { 
  CORE_SERVICE_CATEGORIES, 
  CATALOG_SERVICES, 
  ServiceItem, 
  ServiceCategory 
} from '../data/homeServicesCatalog';
import { AUTHENTIC_PROPERTIES, AuthenticRealEstate } from '../data/teamImages';
import { CartItem } from '../data/cleaningCatalog';
import { ServiceOptionsModal, ServiceWithOptions } from './ServiceOptionsModal';
import { CartDrawer } from './CartDrawer';
import { ConstructionBoqCalculator } from './ConstructionBoqCalculator';
import { ScheduleSiteVisitModal } from './ScheduleSiteVisitModal';
import { ModularKitchenModal } from './ModularKitchenModal';
import { GharkasathiAiAssistant } from './GharkasathiAiAssistant';

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

      {/* 2. Global Sleek Header */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-stone-200 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20 gap-3">
            {/* Logo & Tagline */}
            <div className="flex items-center gap-4">
              <GharkasathiLogo 
                size="md" 
                variant="light" 
                sloganText="All your property Need, Under One Roof." 
              />
            </div>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center gap-6 text-xs font-bold text-stone-700">
              <a href="#explore-verticals" className="hover:text-red-600 transition-colors">
                Explore Verticals
              </a>
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
                className="text-red-600 hover:text-red-700 font-extrabold transition-colors cursor-pointer"
              >
                Home Services
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

          <h1 className="text-2xl sm:text-4xl md:text-5xl font-black text-stone-900 tracking-tight max-w-3xl mx-auto leading-tight">
            Everything Your Property Needs.
          </h1>

          <p className="text-stone-600 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            <strong className="text-stone-900">Buy. Build. Design. Maintain.</strong> — From finding verified land to turnkey construction, custom interiors, and 30-minute verified home maintenance.
          </p>

          {/* Instant Global Search Bar */}
          <div className="max-w-xl mx-auto pt-2">
            <div className="relative flex items-center">
              <Search className="w-4 h-4 text-stone-400 absolute left-4 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search 'Sofa Cleaning', 'Electrician', 'Plumber', 'Duplex BOQ'..."
                className="w-full pl-11 pr-24 py-3 bg-white border border-stone-300 rounded-2xl text-xs sm:text-sm text-stone-900 shadow-sm focus:outline-hidden focus:border-red-600 focus:ring-2 focus:ring-red-600/20 transition-all"
              />
              {searchQuery ? (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 px-2 py-1 text-xs text-stone-400 hover:text-stone-700 cursor-pointer"
                >
                  Clear
                </button>
              ) : (
                <button
                  onClick={() => scrollToServices()}
                  className="absolute right-2 px-3 py-1.5 bg-stone-100 hover:bg-stone-200 text-stone-700 rounded-xl text-xs font-bold transition-all cursor-pointer"
                >
                  Search
                </button>
              )}
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
                  <span className="text-[10px] uppercase font-bold text-red-600 tracking-wider">Vertical 1</span>
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
                  <span className="text-[10px] uppercase font-bold text-red-600 tracking-wider">Vertical 2</span>
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
                  <span className="text-[10px] uppercase font-bold text-red-600 tracking-wider">Vertical 3</span>
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
                  <span className="text-[10px] uppercase font-bold text-red-600 tracking-wider">Vertical 4</span>
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

      {/* 5. OUR SERVICES: The 9 Requested Categories Grid & Filterable Listing */}
      <section id="our-services-section" className="py-10 sm:py-14 bg-[#F7F8FA]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          {/* Section Header */}
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-red-600 bg-red-50 border border-red-200 px-2.5 py-1 rounded-full">
              Standardized Rate Cards &bull; Police Verified
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-stone-900 tracking-tight">
              Our Services
            </h2>
            <p className="text-xs sm:text-sm text-stone-600">
              Select any category to view transparent rates, customize service options &amp; book instant doorstep dispatch.
            </p>
          </div>

          {/* 9 Category Quick Selection Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-9 gap-2.5 sm:gap-3">
            {CORE_SERVICE_CATEGORIES.map((cat) => {
              const isSelected = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`p-3 rounded-2xl border text-center transition-all flex flex-col items-center justify-center gap-2 cursor-pointer select-none ${
                    isSelected
                      ? 'bg-red-600 text-white border-red-600 shadow-md shadow-red-600/20 scale-102'
                      : 'bg-white hover:bg-stone-50 border-stone-200/80 text-stone-800'
                  }`}
                >
                  <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${
                    isSelected ? 'bg-white/20 text-white' : 'bg-red-50 text-red-600'
                  }`}>
                    {getCategoryIcon(cat.icon)}
                  </div>
                  <span className="text-[11px] font-bold leading-tight line-clamp-1">
                    {cat.name}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Filter Chips Bar */}
          <div className="flex items-center justify-between gap-3 border-b border-stone-200 pb-3 overflow-x-auto">
            <div className="flex items-center gap-1.5">
              <button
                onClick={() => setActiveCategory('all')}
                className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                  activeCategory === 'all'
                    ? 'bg-stone-900 text-white'
                    : 'bg-white text-stone-600 border border-stone-200 hover:bg-stone-100'
                }`}
              >
                All Services ({CATALOG_SERVICES.length})
              </button>
              {CORE_SERVICE_CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                    activeCategory === cat.id
                      ? 'bg-red-600 text-white'
                      : 'bg-white text-stone-600 border border-stone-200 hover:bg-stone-100'
                  }`}
                >
                  {cat.name}
                </button>
              ))}
            </div>

            <span className="text-xs text-stone-500 font-medium whitespace-nowrap hidden sm:inline">
              Showing {filteredServices.length} verified services
            </span>
          </div>

          {/* Services Cards Listing */}
          {filteredServices.length === 0 ? (
            <div className="bg-white rounded-3xl p-10 text-center border border-stone-200 max-w-md mx-auto space-y-3">
              <div className="w-12 h-12 rounded-full bg-stone-100 text-stone-400 mx-auto flex items-center justify-center">
                <Search className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-stone-900">No Services Found</h3>
              <p className="text-xs text-stone-500">
                We couldn't find any services matching "{searchQuery}". Try selecting another category or clear your search.
              </p>
              <button
                onClick={() => { setSearchQuery(''); setActiveCategory('all'); }}
                className="px-4 py-2 rounded-xl bg-red-600 text-white text-xs font-bold hover:bg-red-700 transition-all cursor-pointer"
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {filteredServices.map((service) => (
                <div
                  key={service.id}
                  className="bg-white rounded-2xl border border-stone-200/90 overflow-hidden shadow-xs hover:shadow-md hover:border-red-600/30 transition-all flex flex-col justify-between"
                >
                  <div>
                    {/* Image & Badge */}
                    <div className="relative aspect-16/9 bg-stone-100 overflow-hidden">
                      <img
                        src={service.imageUrl}
                        alt={service.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        loading="lazy"
                      />
                      <div className="absolute top-3 left-3 flex items-center gap-1.5">
                        <span className="px-2 py-0.5 rounded-full bg-white/90 backdrop-blur-xs text-[10px] font-black text-stone-800 shadow-xs uppercase tracking-wider">
                          {service.categoryName}
                        </span>
                        {service.badge && (
                          <span className="px-2 py-0.5 rounded-full bg-red-600 text-white text-[10px] font-black shadow-xs">
                            {service.badge}
                          </span>
                        )}
                      </div>

                      <div className="absolute bottom-3 right-3 px-2 py-0.5 rounded-md bg-black/75 text-white text-[10px] font-mono flex items-center gap-1 backdrop-blur-xs">
                        <Clock className="w-3 h-3 text-red-400" />
                        <span>{service.duration}</span>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-4 sm:p-5 space-y-2">
                      <div className="flex items-center justify-between gap-2">
                        <h3 className="text-base font-bold text-stone-900 line-clamp-1">
                          {service.name}
                        </h3>
                        <div className="flex items-center gap-1 text-xs font-black text-stone-800 bg-amber-50 border border-amber-200/80 px-1.5 py-0.5 rounded-md shrink-0">
                          <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                          <span>{service.rating}</span>
                        </div>
                      </div>

                      <p className="text-xs text-stone-600 line-clamp-2 leading-relaxed">
                        {service.description}
                      </p>

                      {/* Options Preview Pill */}
                      {service.options && service.options.length > 0 && (
                        <div className="pt-1 flex items-center gap-1.5 text-[11px] text-stone-500">
                          <SlidersHorizontal className="w-3 h-3 text-red-600 shrink-0" />
                          <span className="truncate">
                            {service.options.length} options available ({service.options[0].name}...)
                          </span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Pricing & Booking CTA */}
                  <div className="px-4 pb-4 sm:px-5 sm:pb-5 pt-2 border-t border-stone-100 flex items-center justify-between gap-3">
                    <div>
                      <span className="text-[10px] text-stone-400 font-semibold block uppercase">
                        Starting At
                      </span>
                      <span className="text-base font-black text-stone-900">
                        {service.priceDisplay}
                      </span>
                    </div>

                    <button
                      onClick={() => setSelectedServiceForOptions(service)}
                      className="px-4 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-bold transition-all shadow-xs hover:shadow-md cursor-pointer flex items-center gap-1.5 active:scale-95"
                    >
                      <span>Book Now</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

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

      {/* 13. SATHI AI ASSISTANT (FLOATING) */}
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

      {/* 14. MINIMAL, OFFICIAL CORPORATE FOOTER */}
      <footer className="bg-stone-900 text-stone-300 pt-12 pb-8 border-t border-stone-800 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Column 1: Brand */}
            <div className="space-y-3 md:col-span-1">
              <GharkasathiLogo 
                size="md" 
                variant="dark" 
                sloganText="All your property Need, Under One Roof." 
              />
              <p className="text-xs text-stone-400 leading-relaxed pt-1">
                India's unified property ecosystem — from land purchase to turnkey construction, custom modular interiors, and 30-minute verified home maintenance.
              </p>
              <div className="text-[11px] text-stone-400 font-mono pt-1">
                CIN: U45200CT2026PTC018290
              </div>

              {/* Official Social Media Channels */}
              <div className="pt-2">
                <p className="text-[11px] uppercase tracking-wider font-semibold text-stone-400 mb-2">
                  Follow Us Online
                </p>
                <div className="flex items-center gap-2">
                  <a
                    href="https://www.instagram.com/gharkasathi?stkn=bWJxcHJyNG93M2Rp&utm_source=qr"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-8 h-8 rounded-lg bg-stone-800 hover:bg-[#E4405F] text-stone-300 hover:text-white flex items-center justify-center transition-all duration-200 shadow-xs group"
                    title="Follow @gharkasathi on Instagram"
                    aria-label="Instagram"
                  >
                    <Instagram className="w-4 h-4 group-hover:scale-110 transition-transform" />
                  </a>
                  <a
                    href="https://youtube.com/@gharkasathi?si=OY1QA5jOUFpAhXoP"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-8 h-8 rounded-lg bg-stone-800 hover:bg-[#FF0000] text-stone-300 hover:text-white flex items-center justify-center transition-all duration-200 shadow-xs group"
                    title="Subscribe to @gharkasathi on YouTube"
                    aria-label="YouTube"
                  >
                    <Youtube className="w-4 h-4 group-hover:scale-110 transition-transform" />
                  </a>
                  <a
                    href="https://www.linkedin.com/company/gharkasathi/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-8 h-8 rounded-lg bg-stone-800 hover:bg-[#0A66C2] text-stone-300 hover:text-white flex items-center justify-center transition-all duration-200 shadow-xs group"
                    title="Connect with Gharkasathi on LinkedIn"
                    aria-label="LinkedIn"
                  >
                    <Linkedin className="w-4 h-4 group-hover:scale-110 transition-transform" />
                  </a>
                  <a
                    href="https://x.com/gharkasathi?s=11"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-8 h-8 rounded-lg bg-stone-800 hover:bg-black text-stone-300 hover:text-white flex items-center justify-center transition-all duration-200 shadow-xs group border border-transparent hover:border-stone-700"
                    title="Follow @gharkasathi on X (Twitter)"
                    aria-label="X (Twitter)"
                  >
                    <Twitter className="w-4 h-4 group-hover:scale-110 transition-transform" />
                  </a>
                </div>
              </div>
            </div>

            {/* Column 2: The 4 Verticals */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold text-white uppercase tracking-wider">Explore Verticals</h4>
              <ul className="space-y-2 text-xs text-stone-400">
                <li>
                  <button onClick={() => setIsRealEstateModalOpen(true)} className="hover:text-white cursor-pointer">
                    1. Real Estate (Buy, Sell, Plots)
                  </button>
                </li>
                <li>
                  <button onClick={() => setIsBoqModalOpen(true)} className="hover:text-white cursor-pointer">
                    2. Construction (Turnkey Civil &amp; BOQ)
                  </button>
                </li>
                <li>
                  <button onClick={() => setIsModularKitchenModalOpen(true)} className="hover:text-white cursor-pointer">
                    3. Interior (Modular Kitchens &amp; 3D)
                  </button>
                </li>
                <li>
                  <button onClick={() => scrollToServices('all')} className="hover:text-white cursor-pointer">
                    4. Home Services (9 Categories)
                  </button>
                </li>
              </ul>
            </div>

            {/* Column 3: 9 Service Categories */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold text-white uppercase tracking-wider">9 Home Services</h4>
              <ul className="grid grid-cols-2 gap-x-2 gap-y-1.5 text-xs text-stone-400">
                {CORE_SERVICE_CATEGORIES.map(cat => (
                  <li key={cat.id}>
                    <button onClick={() => scrollToServices(cat.id)} className="hover:text-white cursor-pointer text-left">
                      {cat.name}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 4: Contact & Operations */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold text-white uppercase tracking-wider">Headquarters &amp; Support</h4>
              <div className="text-xs text-stone-400 leading-relaxed">
                <a 
                  href="https://share.google/zXAKoT57h4zm1cYxi"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white flex items-start gap-1.5 group transition-colors"
                  title="Open Gharkasathi HQ in Google Maps"
                >
                  <MapPin className="w-3.5 h-3.5 text-red-500 shrink-0 mt-0.5 group-hover:scale-110 transition-transform" />
                  <span>
                    4th Floor, Currency Tower, Telibandha, VIP Road, Raipur, Chhattisgarh 492001
                    <span className="block text-[11px] text-red-400 group-hover:text-red-300 font-medium mt-0.5 underline">
                      View on Google Maps &rarr;
                    </span>
                  </span>
                </a>
              </div>
              <div className="space-y-1.5 text-xs text-stone-300">
                <p>
                  📞 Phone:{' '}
                  <a href="tel:+917770999122" className="hover:text-white font-medium underline">
                    +91 77709 99122
                  </a>
                  <span className="text-stone-500 mx-1">|</span>
                  <a href="tel:+917477244487" className="hover:text-white font-medium underline">
                    +91 74772 44487
                  </a>
                </p>
                <p>
                  💬 WhatsApp:{' '}
                  <a 
                    href="https://wa.me/917770999122?text=Hello%20Gharkasathi%20Support" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="hover:text-emerald-400 font-medium underline"
                  >
                    +91 77709 99122
                  </a>
                </p>
                <p>
                  ✉️ Email:{' '}
                  <a href="mailto:support@gharkasathi.com" className="hover:text-white font-medium underline">
                    support@gharkasathi.com
                  </a>
                </p>
                <div className="pt-2 border-t border-stone-800">
                  <p className="text-[11px] text-stone-400 font-medium mb-1.5">Official Social Channels:</p>
                  <div className="flex flex-wrap gap-1.5 text-[11px]">
                    <a 
                      href="https://www.instagram.com/gharkasathi?stkn=bWJxcHJyNG93M2Rp&utm_source=qr" 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="px-2 py-1 rounded-md bg-stone-800/90 hover:bg-[#E4405F]/20 text-stone-300 hover:text-[#E4405F] transition-colors flex items-center gap-1 border border-stone-800 hover:border-[#E4405F]/40"
                    >
                      <Instagram className="w-3 h-3 text-[#E4405F]" />
                      <span>Instagram</span>
                    </a>
                    <a 
                      href="https://youtube.com/@gharkasathi?si=OY1QA5jOUFpAhXoP" 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="px-2 py-1 rounded-md bg-stone-800/90 hover:bg-[#FF0000]/20 text-stone-300 hover:text-[#FF0000] transition-colors flex items-center gap-1 border border-stone-800 hover:border-[#FF0000]/40"
                    >
                      <Youtube className="w-3 h-3 text-[#FF0000]" />
                      <span>YouTube</span>
                    </a>
                    <a 
                      href="https://www.linkedin.com/company/gharkasathi/" 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="px-2 py-1 rounded-md bg-stone-800/90 hover:bg-[#0A66C2]/20 text-stone-300 hover:text-[#0A66C2] transition-colors flex items-center gap-1 border border-stone-800 hover:border-[#0A66C2]/40"
                    >
                      <Linkedin className="w-3 h-3 text-[#0A66C2]" />
                      <span>LinkedIn</span>
                    </a>
                    <a 
                      href="https://x.com/gharkasathi?s=11" 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="px-2 py-1 rounded-md bg-stone-800/90 hover:bg-stone-700 text-stone-300 hover:text-white transition-colors flex items-center gap-1 border border-stone-800 hover:border-stone-600"
                    >
                      <Twitter className="w-3 h-3 text-stone-300" />
                      <span>X</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-6 border-t border-stone-800 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-stone-500">
            <p>&copy; {new Date().getFullYear()} Gharkasathi Innoventure Private Limited. All rights reserved.</p>
            <div className="flex items-center gap-4">
              <span>Raipur &bull; Bhilai &bull; Durg &bull; Bilaspur</span>
              {onOpenAdmin && (
                <button
                  onClick={onOpenAdmin}
                  className="text-stone-500 hover:text-stone-300 transition-colors cursor-pointer text-[11px] flex items-center gap-1.5"
                  title="Authorized Staff & Administration Portal"
                >
                  <Lock className="w-3 h-3 text-stone-500" />
                  <span>Admin &amp; Staff Login</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};
