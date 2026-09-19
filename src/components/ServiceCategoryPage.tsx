import React, { useState, useMemo } from 'react';
import { 
  Star, 
  Clock, 
  Search, 
  Check, 
  Plus, 
  Minus, 
  ShieldCheck, 
  ChevronDown, 
  ChevronRight, 
  MapPin, 
  ShoppingBag, 
  SlidersHorizontal,
  X,
  ArrowRight,
  Sparkles,
  Award,
  Zap,
  Hammer,
  Wrench,
  Paintbrush,
  Refrigerator,
  Truck,
  ShieldAlert,
  Trees
} from 'lucide-react';
import { 
  ServiceCategoryMeta, 
  ServiceDetail, 
  ALL_SERVICE_CATEGORIES_REGISTRY,
  ELECTRICIAN_CATEGORY_DATA
} from '../data/servicesMarketplaceData';
import { CartItem } from '../data/cleaningCatalog';
import { ServiceDetailModal } from './ServiceDetailModal';

interface ServiceCategoryPageProps {
  categorySlug?: string;
  cart: CartItem[];
  onAddToCart: (item: CartItem) => void;
  onUpdateQuantity: (cartItemId: string, newQty: number) => void;
  onRemoveFromCart: (cartItemId: string) => void;
  onOpenCartDrawer: () => void;
  onSelectCategory?: (slug: string) => void;
  onBackToHome?: () => void;
}

export const ServiceCategoryPage: React.FC<ServiceCategoryPageProps> = ({
  categorySlug = 'electrician',
  cart,
  onAddToCart,
  onUpdateQuantity,
  onRemoveFromCart,
  onOpenCartDrawer,
  onSelectCategory,
  onBackToHome
}) => {
  // Active Category Data (dynamic lookup, fallback to Electrician)
  const categoryData: ServiceCategoryMeta = useMemo(() => {
    return ALL_SERVICE_CATEGORIES_REGISTRY[categorySlug] || ELECTRICIAN_CATEGORY_DATA;
  }, [categorySlug]);

  // Filter & Search states
  const [activeSubcategory, setActiveSubcategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [expandedFaqIndex, setExpandedFaqIndex] = useState<number | null>(0);
  const [selectedServiceDetail, setSelectedServiceDetail] = useState<ServiceDetail | null>(null);

  // Smooth Animated Scroll Handler with custom easing and sticky header offset
  const scrollToSubcategory = (subSlug: string) => {
    setActiveSubcategory(subSlug);

    if (subSlug === 'all') {
      const topSection = document.getElementById('marketplace-services-container');
      if (topSection) {
        const headerOffset = 135; // combined height of fixed navbar + sticky subcategory bar
        const elementPosition = topSection.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: Math.max(0, offsetPosition),
          behavior: 'smooth'
        });
      }
      return;
    }

    // Try finding the specific section matching the subgroup or subcategory slug
    setTimeout(() => {
      const targetElement = document.getElementById(`subgroup-section-${subSlug}`) ||
                            document.getElementById(`subgroup-section-sofa`) ||
                            document.getElementById(`subgroup-section-${categoryData.subgroups[0]?.slug}`);

      if (targetElement) {
        const headerOffset = 140; // sticky header offset
        const elementPosition = targetElement.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    }, 50);
  };

  // Cart Totals
  const totalCartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const cartSubtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const convenienceFee = Number((cartSubtotal * 0.03).toFixed(2));
  const grandTotal = Number((cartSubtotal + convenienceFee).toFixed(2));

  // Category Icon Resolver
  const renderCategoryIcon = (iconName: string) => {
    switch (iconName) {
      case 'Zap': return <Zap className="w-5 h-5 shrink-0" />;
      case 'Hammer': return <Hammer className="w-5 h-5 shrink-0" />;
      case 'Wrench': return <Wrench className="w-5 h-5 shrink-0" />;
      case 'Paintbrush': return <Paintbrush className="w-5 h-5 shrink-0" />;
      case 'Refrigerator': return <Refrigerator className="w-5 h-5 shrink-0" />;
      case 'Truck': return <Truck className="w-5 h-5 shrink-0" />;
      case 'ShieldAlert': return <ShieldAlert className="w-5 h-5 shrink-0" />;
      case 'Trees': return <Trees className="w-5 h-5 shrink-0" />;
      default: return <Sparkles className="w-5 h-5 shrink-0" />;
    }
  };

  // Filter services by active subcategory pill and search query
  const filteredSubgroups = useMemo(() => {
    return categoryData.subgroups.map(group => {
      const matchingServices = group.services.filter(service => {
        const matchesSearch = searchQuery.trim() === '' || 
          service.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          service.shortDesc.toLowerCase().includes(searchQuery.toLowerCase());

        const matchesSubcategory = activeSubcategory === 'all' || 
          service.subcategorySlug === activeSubcategory ||
          (activeSubcategory === 'popular' && service.isPopular);

        return matchesSearch && matchesSubcategory;
      });

      return {
        ...group,
        services: matchingServices
      };
    }).filter(group => group.services.length > 0);
  }, [categoryData, activeSubcategory, searchQuery]);

  // Handle adding service to cart from card or modal
  const handleAddServiceToCart = (service: ServiceDetail, optionId?: string) => {
    const selectedOption = optionId && service.options 
      ? service.options.find(o => o.id === optionId)
      : service.options && service.options.length > 0
        ? service.options[0]
        : null;

    const finalPrice = selectedOption ? selectedOption.price : service.startingPrice;
    const optionTitle = selectedOption ? selectedOption.name : 'Standard Service';

    const cartItem: CartItem = {
      id: `${service.id}-${selectedOption ? selectedOption.id : 'std'}-${Date.now()}`,
      serviceId: service.id,
      serviceName: service.name,
      categoryId: service.categorySlug,
      categoryName: categoryData.shortTitle,
      optionId: selectedOption ? selectedOption.id : 'opt-default',
      optionName: optionTitle,
      price: finalPrice,
      convenienceFee: Number((finalPrice * 0.03).toFixed(2)),
      totalPrice: Number((finalPrice * 1.03).toFixed(2)),
      quantity: 1,
      imageUrl: service.imageUrl || 'https://images.unsplash.com/photo-1621905252507-b35492cc74b4?auto=format&fit=crop&w=600&q=80'
    };

    onAddToCart(cartItem);
    setSelectedServiceDetail(null);
  };

  // Find if service is already in cart to show counter
  const getCartQuantityForService = (serviceId: string): { quantity: number; cartItemId?: string } => {
    const found = cart.find(c => c.serviceId === serviceId);
    return {
      quantity: found ? found.quantity : 0,
      cartItemId: found ? found.id : undefined
    };
  };

  return (
    <div className="min-h-screen bg-[#FAFAFA] text-stone-900 flex flex-col font-sans pb-24 lg:pb-12">
      
      {/* 1. COMPACT SERVICE PAGE HERO (180–220px max, Clean, No oversized banners) */}
      <section className="bg-white border-b border-stone-200/80 pt-4 sm:pt-5 pb-5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          
          {/* Top Bar: Breadcrumbs + Explore Main Categories Strip */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pb-3 border-b border-stone-100">
            {/* Breadcrumb Navigation */}
            <div className="flex items-center gap-1.5 text-xs text-stone-500 shrink-0">
              <button 
                onClick={onBackToHome}
                className="hover:text-red-600 transition-colors cursor-pointer font-medium"
              >
                Home
              </button>
              <ChevronRight className="w-3 h-3 text-stone-400" />
              <span className="text-stone-500">Services</span>
              <ChevronRight className="w-3 h-3 text-stone-400" />
              <span className="font-bold text-stone-900">{categoryData.shortTitle}</span>
            </div>

            {/* Main Categories Explorer Strip (Upper side of Category Page) */}
            <div className="flex items-center gap-2.5 overflow-x-auto no-scrollbar py-1">
              <span className="text-xs font-bold uppercase tracking-wider text-stone-500 shrink-0 hidden sm:inline-block">
                Explore Services:
              </span>
              <div className="flex items-center gap-2 shrink-0">
                {Object.keys(ALL_SERVICE_CATEGORIES_REGISTRY).map((slug) => {
                  const item = ALL_SERVICE_CATEGORIES_REGISTRY[slug];
                  const isCurrent = slug === categorySlug;
                  return (
                    <button
                      key={slug}
                      onClick={() => onSelectCategory && onSelectCategory(slug)}
                      className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all cursor-pointer shadow-xs whitespace-nowrap ${
                        isCurrent
                          ? 'bg-red-600 text-white font-black shadow-sm ring-2 ring-red-600/30'
                          : 'bg-stone-100 hover:bg-stone-200/90 text-stone-800'
                      }`}
                    >
                      {renderCategoryIcon(item.iconName)}
                      <span>{item.shortTitle}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            {/* Title & Micro Stats */}
            <div className="space-y-1.5 max-w-2xl">
              <h1 className="text-2xl sm:text-3xl font-black text-stone-900 tracking-tight">
                {categoryData.name}
              </h1>
              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                {categoryData.tagline}
              </p>

              {/* Verified Trust Strip Badges */}
              <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-xs pt-1">
                <div className="flex items-center gap-1 font-bold text-stone-800 bg-amber-50 border border-amber-200/70 px-2 py-0.5 rounded-md">
                  <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                  <span>★ {categoryData.rating}</span>
                  <span className="text-stone-400 font-normal">({categoryData.reviewCount} Reviews)</span>
                </div>

                <div className="flex items-center gap-1 font-bold text-stone-700 bg-stone-100 border border-stone-200 px-2 py-0.5 rounded-md">
                  <span>{categoryData.completedJobs}</span>
                </div>

                <div className="flex items-center gap-1 font-bold text-emerald-800 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-md">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Verified Gharkasathi Partners</span>
                </div>

                <div className="flex items-center gap-1 text-stone-500 font-medium ml-1">
                  <MapPin className="w-3.5 h-3.5 text-red-600" />
                  <span>{categoryData.city}</span>
                </div>
              </div>
            </div>

            {/* Quick In-Category Search Box */}
            <div className="w-full md:w-72 relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={`Search in ${categoryData.shortTitle}...`}
                className="w-full pl-9 pr-8 py-2.5 bg-stone-50 hover:bg-white focus:bg-white rounded-xl border border-stone-200 focus:border-red-600 text-xs text-stone-900 placeholder-stone-400 shadow-2xs focus:outline-hidden transition-all"
              />
              <Search className="w-4 h-4 text-stone-400 absolute left-3 top-3 pointer-events-none" />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2.5 top-2.5 text-stone-400 hover:text-stone-700 cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* 2. COMPACT SERVICE CATEGORY NAVIGATION (Mini Pic Cards & Smooth Scroll Navigation) */}
      <div className="sticky top-[72px] z-30 bg-white/95 backdrop-blur-md border-b border-stone-200/80 shadow-2xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2.5 py-3 overflow-x-auto no-scrollbar scroll-smooth">
            {categoryData.subcategories.map((sub) => {
              const isSelected = activeSubcategory === sub.slug;
              const hasImage = Boolean(sub.image);

              return (
                <button
                  key={sub.id}
                  id={`subcat-btn-${sub.slug}`}
                  onClick={() => scrollToSubcategory(sub.slug)}
                  className={`group flex items-center gap-2.5 px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-xl text-xs font-bold transition-all duration-200 cursor-pointer whitespace-nowrap shrink-0 border ${
                    isSelected
                      ? 'bg-red-600 text-white border-red-600 shadow-sm'
                      : 'bg-white text-stone-700 border-stone-200 hover:border-red-300 hover:bg-stone-50/80 shadow-2xs'
                  }`}
                  title={`View ${sub.name}`}
                >
                  {/* Mini Pic Card Thumbnail / Icon Avatar */}
                  {hasImage ? (
                    <div className="relative w-8 h-8 rounded-lg overflow-hidden shrink-0 border border-stone-200/70 group-hover:scale-105 transition-transform duration-200">
                      <img 
                        src={sub.image} 
                        alt={sub.name}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ) : (
                    <div className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 text-xs ${
                      isSelected 
                        ? 'bg-white/20 text-white' 
                        : 'bg-red-50 text-red-600 group-hover:bg-red-100'
                    }`}>
                      <Sparkles className="w-3.5 h-3.5" />
                    </div>
                  )}

                  {/* Subcategory Label & Micro Count */}
                  <div className="text-left flex flex-col justify-center">
                    <span className="leading-tight tracking-tight">{sub.name}</span>
                    {sub.itemCount && (
                      <span className={`text-[10px] font-normal leading-none mt-0.5 ${
                        isSelected ? 'text-red-100' : 'text-stone-400'
                      }`}>
                        {sub.itemCount} options
                      </span>
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* 3. MAIN SERVICE LIST + STICKY BOOKING CART LAYOUT (70% List / 30% Sticky Cart) */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-12 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* CENTER & LEFT: Compact Marketplace-Style Service List */}
          <div id="marketplace-services-container" className="lg:col-span-8 space-y-8">
            {/* Zero Results State */}
            {filteredSubgroups.length === 0 && (
              <div className="bg-white rounded-2xl p-10 text-center border border-stone-200 max-w-md mx-auto space-y-3">
                <div className="w-10 h-10 rounded-full bg-stone-100 text-stone-400 mx-auto flex items-center justify-center">
                  <Search className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-stone-900">No Services Found</h3>
                <p className="text-xs text-stone-500">
                  We couldn't find any services matching "{searchQuery}" in {categoryData.shortTitle}.
                </p>
                <button
                  onClick={() => { setSearchQuery(''); setActiveSubcategory('all'); }}
                  className="px-4 py-2 rounded-xl bg-red-600 text-white text-xs font-bold hover:bg-red-700 transition-all cursor-pointer"
                >
                  Reset Filters
                </button>
              </div>
            )}

            {/* Service Subgroups & Compact Service Cards */}
            {filteredSubgroups.map((group) => (
              <section 
                key={group.id} 
                id={`subgroup-section-${group.slug}`}
                className="space-y-3 scroll-mt-36"
              >
                {/* Group Heading */}
                <div className="border-b border-stone-200 pb-2 flex items-center justify-between">
                  <div>
                    <h2 className="text-base sm:text-lg font-bold text-stone-900">
                      {group.name}
                    </h2>
                    {group.description && (
                      <p className="text-xs text-stone-500">{group.description}</p>
                    )}
                  </div>
                  <span className="text-xs text-stone-400 font-mono">
                    {group.services.length} services
                  </span>
                </div>

                {/* Vertical Stack of Compact Cards (Clean, 1-column list with mini pic cards) */}
                <div className="space-y-3">
                  {group.services.map((service) => {
                    const cartInfo = getCartQuantityForService(service.id);
                    return (
                      <div
                        key={service.id}
                        id={`service-card-${service.slug}`}
                        className="bg-white rounded-xl border border-[#EAEAEA] hover:border-red-600/30 p-3.5 sm:p-4.5 transition-all shadow-2xs hover:shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4 group"
                      >
                        {/* Service Media Thumbnail & Info (Primary Focus) */}
                        <div className="flex items-start gap-3.5 flex-1 min-w-0 pr-2">
                          {/* Mini Pic Card for the Service itself */}
                          {service.imageUrl ? (
                            <div 
                              onClick={() => setSelectedServiceDetail(service)}
                              className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl overflow-hidden shrink-0 border border-stone-200/80 bg-stone-100 cursor-pointer relative group-hover:border-red-300 transition-all"
                            >
                              <img
                                src={service.imageUrl}
                                alt={service.name}
                                referrerPolicy="no-referrer"
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                              />
                            </div>
                          ) : null}

                          <div className="space-y-1 flex-1 min-w-0">
                            <div className="flex items-center gap-2 flex-wrap">
                              <h3 
                                onClick={() => setSelectedServiceDetail(service)}
                                className="text-sm sm:text-base font-bold text-stone-900 hover:text-red-600 transition-colors cursor-pointer leading-snug"
                              >
                                {service.name}
                              </h3>
                              {service.badge && (
                                <span className="text-[10px] font-bold text-red-600 bg-red-50 border border-red-200 px-1.5 py-0.2 rounded shrink-0">
                                  {service.badge}
                                </span>
                              )}
                            </div>

                            <p className="text-xs text-stone-500 line-clamp-2 leading-relaxed">
                              {service.shortDesc}
                            </p>

                            {/* Ratings, Duration & Inclusions Trigger */}
                            <div className="flex items-center gap-2.5 text-xs text-stone-500 pt-0.5 flex-wrap">
                              <div className="flex items-center gap-1 font-bold text-stone-800">
                                <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                                <span>{service.rating}</span>
                                <span className="font-normal text-stone-400">({service.reviewsCount})</span>
                              </div>
                              <span>&bull;</span>
                              <div className="flex items-center gap-1 text-stone-600 font-medium">
                                <Clock className="w-3 h-3 text-stone-400" />
                                <span>{service.duration}</span>
                              </div>
                              <span>&bull;</span>
                              <button
                                onClick={() => setSelectedServiceDetail(service)}
                                className="text-red-600 hover:text-red-700 font-semibold cursor-pointer underline text-xs"
                              >
                                View details
                              </button>
                            </div>
                          </div>
                        </div>

                        {/* Price & Action Area (Compact, Non-bulky) */}
                        <div className="flex items-center sm:flex-col sm:items-end justify-between sm:justify-center gap-2 pt-2 sm:pt-0 border-t sm:border-t-0 border-stone-100 shrink-0">
                          <div className="text-left sm:text-right">
                            <span className="text-[11px] text-stone-500 block leading-none">Starting at</span>
                            <span className="text-lg sm:text-xl font-black text-stone-900 leading-tight">
                              ₹{service.startingPrice}
                            </span>
                          </div>

                          {/* Add / Quantity Button */}
                          {cartInfo.quantity > 0 && cartInfo.cartItemId ? (
                            <div className="flex items-center gap-2 bg-red-50 border border-red-200 rounded-xl p-1">
                              <button
                                onClick={() => onUpdateQuantity(cartInfo.cartItemId!, cartInfo.quantity - 1)}
                                className="w-7 h-7 rounded-lg bg-white text-stone-700 hover:bg-stone-100 flex items-center justify-center font-bold text-xs cursor-pointer shadow-2xs"
                                aria-label="Decrease quantity"
                              >
                                <Minus className="w-3 h-3" />
                              </button>
                              <span className="font-bold text-stone-900 text-xs px-1">
                                {cartInfo.quantity}
                              </span>
                              <button
                                onClick={() => onUpdateQuantity(cartInfo.cartItemId!, cartInfo.quantity + 1)}
                                className="w-7 h-7 rounded-lg bg-red-600 text-white hover:bg-red-700 flex items-center justify-center font-bold text-xs cursor-pointer shadow-2xs"
                                aria-label="Increase quantity"
                              >
                                <Plus className="w-3 h-3" />
                              </button>
                            </div>
                          ) : (
                            <button
                              onClick={() => {
                                if (service.options && service.options.length > 1) {
                                  setSelectedServiceDetail(service);
                                } else {
                                  handleAddServiceToCart(service);
                                }
                              }}
                              className="px-4 py-2 rounded-xl bg-white hover:bg-red-600 text-red-600 hover:text-white border-2 border-red-600 font-black text-xs transition-all shadow-2xs flex items-center gap-1.5 cursor-pointer"
                            >
                              <span>Add</span>
                              <Plus className="w-3.5 h-3.5" />
                            </button>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </section>
            ))}

            {/* 4. GHARKASATHI VERIFIED TRUST SYSTEM STRIP */}
            <div className="bg-white rounded-2xl border border-stone-200 p-5 shadow-2xs">
              <div className="flex items-center gap-2 mb-3">
                <ShieldCheck className="w-5 h-5 text-red-600" />
                <h3 className="text-sm font-black uppercase tracking-wider text-stone-900">
                  Trained &amp; Certified Gharkasathi Service Partners
                </h3>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 text-xs text-stone-700">
                <div className="flex items-center gap-1.5">
                  <span className="text-red-600 font-bold">✓</span>
                  <span>Verified Professionals</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="text-red-600 font-bold">✓</span>
                  <span>Trained &amp; Certified</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="text-red-600 font-bold">✓</span>
                  <span>Background Checked</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="text-red-600 font-bold">✓</span>
                  <span>Transparent Pricing</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="text-red-600 font-bold">✓</span>
                  <span>Post-Service Support</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="text-red-600 font-bold">✓</span>
                  <span>Genuine Branded Parts</span>
                </div>
              </div>
            </div>

            {/* 5. WHY GHARKASATHI (Compact 4 Columns) */}
            <div className="space-y-3">
              <h3 className="text-sm font-black uppercase tracking-wider text-stone-900">
                Why Choose Gharkasathi?
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                <div className="p-3.5 bg-white rounded-xl border border-stone-200 space-y-1">
                  <h4 className="text-xs font-bold text-stone-900">Verified Partners</h4>
                  <p className="text-[11px] text-stone-500 leading-relaxed">
                    Professionally trained &amp; police-verified service partners.
                  </p>
                </div>
                <div className="p-3.5 bg-white rounded-xl border border-stone-200 space-y-1">
                  <h4 className="text-xs font-bold text-stone-900">Transparent Pricing</h4>
                  <p className="text-[11px] text-stone-500 leading-relaxed">
                    Clear standard starting rates before booking starts.
                  </p>
                </div>
                <div className="p-3.5 bg-white rounded-xl border border-stone-200 space-y-1">
                  <h4 className="text-xs font-bold text-stone-900">Quality Assurance</h4>
                  <p className="text-[11px] text-stone-500 leading-relaxed">
                    Every service follows standardized SOP checklists.
                  </p>
                </div>
                <div className="p-3.5 bg-white rounded-xl border border-stone-200 space-y-1">
                  <h4 className="text-xs font-bold text-stone-900">One Platform</h4>
                  <p className="text-[11px] text-stone-500 leading-relaxed">
                    Home services, repairs &amp; property care under one roof.
                  </p>
                </div>
              </div>
            </div>

            {/* 6. COMPACT REVIEWS (Horizontal Scroller) */}
            <div className="bg-white rounded-2xl border border-stone-200 p-5 space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-black uppercase tracking-wider text-stone-900">
                    Customer Reviews
                  </h3>
                  <div className="flex items-center gap-1.5 text-xs text-stone-500">
                    <span className="font-bold text-stone-900">★ {categoryData.rating}</span>
                    <span>&bull;</span>
                    <span>{categoryData.reviewCount}+ Verified Ratings</span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="p-3 rounded-xl bg-stone-50 border border-stone-200/80 space-y-1.5">
                  <div className="flex items-center text-amber-500 text-xs">
                    ★★★★★
                  </div>
                  <p className="text-xs text-stone-700 italic">
                    "Quick service and professional electrician in Shankar Nagar. Replaced 3 burned switchboards cleanly within 40 mins."
                  </p>
                  <span className="text-[11px] font-bold text-stone-500 block">
                    — Rajesh Sharma, Shankar Nagar
                  </span>
                </div>

                <div className="p-3 rounded-xl bg-stone-50 border border-stone-200/80 space-y-1.5">
                  <div className="flex items-center text-amber-500 text-xs">
                    ★★★★★
                  </div>
                  <p className="text-xs text-stone-700 italic">
                    "Genuine pricing without bargaining. The inverter wiring bypass was fixed smoothly."
                  </p>
                  <span className="text-[11px] font-bold text-stone-500 block">
                    — Sunita Verma, VIP Road
                  </span>
                </div>
              </div>
            </div>

            {/* 7. CATEGORY FAQ (Accordion UI) */}
            <div className="bg-white rounded-2xl border border-stone-200 p-5 space-y-3">
              <h3 className="text-sm font-black uppercase tracking-wider text-stone-900">
                Frequently Asked Questions
              </h3>
              <div className="divide-y divide-stone-100">
                {categoryData.faqs.map((faq, idx) => {
                  const isOpen = expandedFaqIndex === idx;
                  return (
                    <div key={idx} className="py-2.5">
                      <button
                        onClick={() => setExpandedFaqIndex(isOpen ? null : idx)}
                        className="w-full flex items-center justify-between text-left text-xs sm:text-sm font-bold text-stone-900 hover:text-red-600 transition-colors cursor-pointer py-1"
                      >
                        <span>{faq.question}</span>
                        <ChevronDown className={`w-4 h-4 text-stone-400 transition-transform ${isOpen ? 'rotate-180 text-red-600' : ''}`} />
                      </button>
                      {isOpen && (
                        <p className="text-xs text-stone-600 leading-relaxed pt-1.5 pb-1">
                          {faq.answer}
                        </p>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* 8. SEO CONTENT & LOCAL AREAS */}
            <div className="bg-white rounded-2xl border border-stone-200 p-5 space-y-3">
              <h3 className="text-sm font-black text-stone-900">
                {categoryData.seoMeta.heading}
              </h3>
              <div className="space-y-2 text-xs text-stone-600 leading-relaxed">
                {categoryData.seoMeta.paragraphs.map((p, idx) => (
                  <p key={idx}>{p}</p>
                ))}
              </div>

              <div className="pt-2 border-t border-stone-100">
                <span className="text-[11px] font-bold uppercase tracking-wider text-stone-500 block mb-1.5">
                  Popular Service Areas in Raipur:
                </span>
                <div className="flex flex-wrap gap-1.5 text-xs text-stone-600">
                  {categoryData.seoMeta.serviceAreas.map((area, idx) => (
                    <span key={idx} className="px-2 py-0.5 rounded-md bg-stone-100 border border-stone-200 text-[11px]">
                      {area}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT: Sticky Booking & Cart Summary (Desktop Sticky 30% Width) */}
          <div className="hidden lg:block lg:col-span-4 sticky top-[130px] space-y-4">
            <div className="bg-white rounded-2xl border border-stone-200 p-5 shadow-sm space-y-4">
              
              {/* Header */}
              <div className="flex items-center justify-between pb-3 border-b border-stone-100">
                <div className="flex items-center gap-2">
                  <ShoppingBag className="w-4 h-4 text-red-600" />
                  <h3 className="text-sm font-bold text-stone-900">Your Booking</h3>
                </div>
                <span className="text-xs font-bold text-stone-500 font-mono">
                  {totalCartCount} {totalCartCount === 1 ? 'Item' : 'Items'}
                </span>
              </div>

              {/* Items List or Empty Prompt */}
              {cart.length === 0 ? (
                <div className="py-8 text-center space-y-2">
                  <div className="w-10 h-10 rounded-full bg-stone-50 text-stone-400 mx-auto flex items-center justify-center">
                    <ShoppingBag className="w-5 h-5" />
                  </div>
                  <p className="text-xs font-semibold text-stone-800">Your cart is empty</p>
                  <p className="text-[11px] text-stone-500">
                    Click 'Add' on any service to configure your booking slot &amp; address.
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  <div className="max-h-60 overflow-y-auto space-y-2.5 pr-1">
                    {cart.map((item) => (
                      <div key={item.id} className="p-2.5 rounded-xl bg-stone-50 border border-stone-200/80 flex items-center justify-between text-xs">
                        <div className="pr-2 min-w-0">
                          <h4 className="font-bold text-stone-900 truncate">{item.serviceName}</h4>
                          <span className="text-[10px] text-stone-500 block truncate">{item.optionName}</span>
                          <span className="text-xs font-bold text-stone-800">₹{item.price}</span>
                        </div>

                        {/* Quantity Counter */}
                        <div className="flex items-center gap-1.5 bg-white border border-stone-200 rounded-lg p-0.5 shrink-0">
                          <button
                            onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                            className="w-5 h-5 rounded flex items-center justify-center text-stone-600 hover:bg-stone-100 cursor-pointer"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="text-xs font-bold px-1 font-mono">{item.quantity}</span>
                          <button
                            onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                            className="w-5 h-5 rounded flex items-center justify-center text-stone-600 hover:bg-stone-100 cursor-pointer"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Pricing Breakdown */}
                  <div className="pt-3 border-t border-stone-100 space-y-1.5 text-xs text-stone-600">
                    <div className="flex justify-between">
                      <span>Service Items Subtotal</span>
                      <span className="font-bold text-stone-900 font-mono">₹{cartSubtotal}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Convenience &amp; Safety</span>
                      <span className="font-mono text-stone-700">₹{convenienceFee}</span>
                    </div>
                    <div className="pt-2 border-t border-stone-200 flex justify-between text-sm font-bold text-stone-900">
                      <span>Total Pay</span>
                      <span className="text-red-600 font-mono text-base">₹{grandTotal}</span>
                    </div>
                  </div>

                  {/* Checkout Button */}
                  <button
                    onClick={onOpenCartDrawer}
                    className="w-full py-3 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-xs shadow-sm flex items-center justify-center gap-2 cursor-pointer transition-colors"
                  >
                    <span>Proceed to Book ({totalCartCount})</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              )}

              {/* Trust Badge */}
              <div className="pt-3 border-t border-stone-100 flex items-center gap-2 text-[11px] text-stone-500">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>30-Min Instant Dispatch Guarantee in Raipur</span>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* 4. MOBILE STICKY BOTTOM BOOKING BAR (When cart has items or for fast booking) */}
      <div className="fixed bottom-0 inset-x-0 z-40 lg:hidden bg-white/95 backdrop-blur-md border-t border-stone-200 p-3 shadow-lg flex items-center justify-between gap-3">
        <div>
          <span className="text-[10px] text-stone-500 uppercase tracking-wider font-bold block">
            {totalCartCount > 0 ? `${totalCartCount} Service(s) Added` : 'Starting at'}
          </span>
          <span className="text-base font-black text-stone-900 font-mono">
            {totalCartCount > 0 ? `₹${grandTotal}` : `₹${categoryData.subgroups[0]?.services[0]?.startingPrice || 199}`}
          </span>
        </div>

        <button
          onClick={onOpenCartDrawer}
          className="px-5 py-2.5 rounded-xl bg-red-600 text-white text-xs font-bold shadow-sm flex items-center gap-2 cursor-pointer active:scale-95 transition-transform"
        >
          <span>{totalCartCount > 0 ? 'View Cart & Book' : 'Book a Service'}</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {/* 5. SERVICE DETAIL MODAL (Inclusions, Exclusions, Options) */}
      <ServiceDetailModal
        service={selectedServiceDetail}
        onClose={() => setSelectedServiceDetail(null)}
        onSelectOptionAndBook={handleAddServiceToCart}
      />
    </div>
  );
};
