import React, { useState, useMemo, useEffect } from 'react';
import { Saree, CartItem, BlouseOption, Currency, FilterState, PaymentVerificationResult, ThemeMode } from './types';
import { SAREES_DATA, BLOUSE_STITCHING_OPTIONS } from './data/sareesData';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { SareeCard } from './components/SareeCard';
import { SareeFilters } from './components/SareeFilters';
import { SareeDetailModal } from './components/SareeDetailModal';
import { CartDrawer } from './components/CartDrawer';
import { WishlistDrawer } from './components/WishlistDrawer';
import { SareeFinderQuiz } from './components/SareeFinderQuiz';
import { DrapeGuideModal } from './components/DrapeGuideModal';
import { HeritageSection } from './components/HeritageSection';
import { PatronsGallery } from './components/PatronsGallery';
import { BridalTrousseauModal } from './components/BridalTrousseauModal';
import { OrderSuccessModal } from './components/OrderSuccessModal';
import { OrderTrackingModal } from './components/OrderTrackingModal';
import { SilkCareGuideModal } from './components/SilkCareGuideModal';
import { PaymentGatewayModal } from './components/PaymentGatewayModal';
import { Footer } from './components/Footer';
import { formatPrice } from './utils/formatters';
import { Sparkles, SlidersHorizontal, Check, Heart, ShoppingBag, ArrowUpDown, Filter } from 'lucide-react';

export default function App() {
  // State
  const [currency, setCurrency] = useState<Currency>('INR');
  const [theme, setTheme] = useState<ThemeMode>(() => {
    try {
      const saved = localStorage.getItem('varnam_theme') as ThemeMode;
      if (saved === 'midnight' || saved === 'ivory') return saved;
      if (typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) {
        return 'ivory';
      }
    } catch {
      // fallback
    }
    return 'midnight';
  });

  useEffect(() => {
    try {
      localStorage.setItem('varnam_theme', theme);
    } catch {
      // fallback
    }
  }, [theme]);

  const [filters, setFilters] = useState<FilterState>({
    search: '',
    fabric: 'all',
    occasion: 'all',
    craft: 'all',
    color: 'all',
    priceRange: [0, 60000],
    sortBy: 'featured'
  });

  // Modals & Drawers
  const [selectedSaree, setSelectedSaree] = useState<Saree | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isFinderOpen, setIsFinderOpen] = useState(false);
  const [isDrapeGuideOpen, setIsDrapeGuideOpen] = useState(false);
  const [isTrousseauOpen, setIsTrousseauOpen] = useState(false);
  const [isTrackingOpen, setIsTrackingOpen] = useState(false);
  const [isSilkCareOpen, setIsSilkCareOpen] = useState(false);
  const [isPaymentGatewayOpen, setIsPaymentGatewayOpen] = useState(false);
  const [appliedPromo, setAppliedPromo] = useState<string | null>(null);
  const [paymentResult, setPaymentResult] = useState<PaymentVerificationResult | null>(null);
  const [trackingOrderNumber, setTrackingOrderNumber] = useState('VRN-84920');
  const [orderSuccessModalData, setOrderSuccessModalData] = useState<{
    isOpen: boolean;
    orderNumber: string;
    items: CartItem[];
  }>({
    isOpen: false,
    orderNumber: '',
    items: []
  });

  // Toast Notification
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'info' } | null>(null);

  // Cart & Wishlist persistence with state
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('varnam_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [wishlist, setWishlist] = useState<Saree[]>(() => {
    try {
      const saved = localStorage.getItem('varnam_wishlist');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem('varnam_cart', JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    localStorage.setItem('varnam_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  const showToast = (message: string, type: 'success' | 'info' = 'success') => {
    setToast({ message, type });
    setTimeout(() => {
      setToast(null);
    }, 2800);
  };

  const handleToggleTheme = () => {
    setTheme(prev => {
      const nextTheme = prev === 'midnight' ? 'ivory' : 'midnight';
      showToast(
        nextTheme === 'midnight'
          ? 'Switched to Dark Display (Midnight Atelier)'
          : 'Switched to Light Display (Ivory Palace)',
        'info'
      );
      return nextTheme;
    });
  };

  // Filter and Sort Saree Data
  const filteredSarees = useMemo(() => {
    return SAREES_DATA.filter((saree) => {
      // Search
      if (filters.search.trim()) {
        const query = filters.search.toLowerCase();
        const matchesName = saree.name.toLowerCase().includes(query);
        const matchesFabric = saree.fabric.toLowerCase().includes(query);
        const matchesCraft = saree.craft.toLowerCase().includes(query);
        const matchesRegion = saree.originRegion.toLowerCase().includes(query);
        if (!matchesName && !matchesFabric && !matchesCraft && !matchesRegion) return false;
      }

      // Fabric
      if (filters.fabric !== 'all' && saree.fabric !== filters.fabric) {
        return false;
      }

      // Occasion
      if (filters.occasion !== 'all' && saree.occasion !== filters.occasion) {
        return false;
      }

      // Craft
      if (filters.craft !== 'all' && saree.craft !== filters.craft) {
        return false;
      }

      // Color
      if (filters.color !== 'all' && saree.color !== filters.color) {
        return false;
      }

      // Price Range
      if (saree.price > filters.priceRange[1]) {
        return false;
      }

      return true;
    }).sort((a, b) => {
      if (filters.sortBy === 'price-low') return a.price - b.price;
      if (filters.sortBy === 'price-high') return b.price - a.price;
      if (filters.sortBy === 'rating') return b.rating - a.rating;
      if (filters.sortBy === 'newest') return b.weaveDays - a.weaveDays;
      return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
    });
  }, [filters]);

  // Wishlist handlers
  const handleToggleWishlist = (saree: Saree) => {
    const exists = wishlist.some((item) => item.id === saree.id);
    if (exists) {
      setWishlist((prev) => prev.filter((item) => item.id !== saree.id));
      showToast(`Removed "${saree.name.slice(0, 24)}..." from Wishlist`, 'info');
    } else {
      setWishlist((prev) => [...prev, saree]);
      showToast(`Saved "${saree.name.slice(0, 24)}..." to Wishlist!`, 'success');
    }
  };

  const handleRemoveFromWishlist = (sareeId: string) => {
    setWishlist((prev) => prev.filter((item) => item.id !== sareeId));
  };

  // Cart handlers
  const handleAddToCart = (saree: Saree) => {
    handleAddToCartWithOptions(saree, BLOUSE_STITCHING_OPTIONS[0], '', true, false);
  };

  const handleAddToCartWithOptions = (
    saree: Saree,
    blouse: BlouseOption,
    bustSize: string,
    fallPico: boolean,
    giftWrap: boolean
  ) => {
    const cartId = `${saree.id}-${blouse.id}-${bustSize || 'unstitched'}-${giftWrap ? 'gift' : 'std'}`;
    
    setCartItems((prev) => {
      const existing = prev.find((item) => item.cartId === cartId);
      if (existing) {
        return prev.map((item) =>
          item.cartId === cartId ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [
        ...prev,
        {
          cartId,
          saree,
          quantity: 1,
          blouseOption: blouse,
          bustSize,
          fallPico,
          giftWrap,
          giftNote: ''
        }
      ];
    });

    showToast(`Added "${saree.name.slice(0, 24)}..." with ${blouse.name.split('(')[0]} to your Bag!`, 'success');
  };

  const handleToggleGiftWrap = (cartId: string, giftWrap: boolean) => {
    setCartItems((prev) =>
      prev.map((item) => (item.cartId === cartId ? { ...item, giftWrap } : item))
    );
  };

  const handleUpdateGiftNote = (cartId: string, giftNote: string) => {
    setCartItems((prev) =>
      prev.map((item) => (item.cartId === cartId ? { ...item, giftNote } : item))
    );
  };

  const handleUpdateQuantity = (cartId: string, qty: number) => {
    if (qty <= 0) {
      handleRemoveItem(cartId);
      return;
    }
    setCartItems((prev) =>
      prev.map((item) => (item.cartId === cartId ? { ...item, quantity: qty } : item))
    );
  };

  const handleRemoveItem = (cartId: string) => {
    setCartItems((prev) => prev.filter((item) => item.cartId !== cartId));
    showToast('Item removed from Bag', 'info');
  };

  const handleBuyNow = (
    saree: Saree,
    blouse: BlouseOption,
    bustSize: string,
    fallPico: boolean,
    giftWrap: boolean
  ) => {
    handleAddToCartWithOptions(saree, blouse, bustSize, fallPico, giftWrap);
    setIsCartOpen(true);
  };

  const cartSubtotal = useMemo(() => {
    return cartItems.reduce((acc, item) => {
      const isGift = Boolean(item.giftWrap);
      const itemUnitTotal = item.saree.price + item.blouseOption.price + (isGift ? 250 : 0);
      return acc + (itemUnitTotal * item.quantity);
    }, 0);
  }, [cartItems]);

  const discountAmount = appliedPromo === 'UTSAV20' ? Math.round(cartSubtotal * 0.2) : 0;
  const shipping = cartSubtotal > 15000 || cartItems.length === 0 ? 0 : 500;
  const grandTotal = Math.max(0, cartSubtotal - discountAmount + shipping);

  const handleInitiateCheckout = (promo?: string | null) => {
    if (promo !== undefined) setAppliedPromo(promo);
    setIsCartOpen(false);
    setIsPaymentGatewayOpen(true);
  };

  const handlePaymentSuccess = (result: PaymentVerificationResult) => {
    setPaymentResult(result);
    setIsPaymentGatewayOpen(false);
    setOrderSuccessModalData({
      isOpen: true,
      orderNumber: result.orderNumber,
      items: [...cartItems]
    });
    setCartItems([]);
    showToast(`Payment of ${formatPrice(result.amountPaid, currency)} verified via ${result.paymentMethod.toUpperCase()}!`, 'success');
  };

  const isWishlisted = (sareeId: string) => wishlist.some((item) => item.id === sareeId);

  const handleAddTrousseauToCart = (sarees: Saree[]) => {
    const defaultBlouse = BLOUSE_STITCHING_OPTIONS[0];
    const newItems: CartItem[] = sarees.map((saree) => ({
      cartId: `${saree.id}-${defaultBlouse.id}-trousseau-${Date.now()}-${Math.random()}`,
      saree,
      quantity: 1,
      blouseOption: defaultBlouse,
      bustSize: '36" (Medium)',
      fallPico: true,
      giftWrap: true,
      giftNote: 'Royal Bridal Trousseau Edition'
    }));

    setCartItems(prev => [...prev, ...newItems]);
    setIsTrousseauOpen(false);
    setIsCartOpen(true);
    showToast(`Added ${sarees.length} Bridal Trousseau heirlooms to your bag with Trunk privilege!`, 'success');
  };

  return (
    <div className={`min-h-screen flex flex-col font-sans selection:bg-[#c5a059] selection:text-black transition-colors duration-300 ${
      theme === 'ivory' ? 'theme-ivory bg-[#fbf9f5] text-[#1c1917]' : 'bg-[#0a0a0a] text-[#e5e5e5]'
    }`}>
      
      {/* Toast Notification */}
      {toast && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#121212] text-[#e5e5e5] px-4 py-3 rounded-2xl shadow-2xl border border-[#c5a059]/40 flex items-center gap-3 animate-in fade-in slide-in-from-bottom-3 duration-300">
          <div className="w-6 h-6 rounded-full bg-[#c5a059] text-black flex items-center justify-center shrink-0 font-bold">
            <Check className="w-3.5 h-3.5" />
          </div>
          <p className="text-xs font-medium">{toast.message}</p>
        </div>
      )}

      {/* Top Navbar */}
      <Navbar
        cartCount={cartItems.reduce((acc, item) => acc + item.quantity, 0)}
        wishlistCount={wishlist.length}
        currency={currency}
        theme={theme}
        onToggleTheme={handleToggleTheme}
        onCurrencyChange={setCurrency}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenWishlist={() => setIsWishlistOpen(true)}
        onOpenDrapeGuide={() => setIsDrapeGuideOpen(true)}
        onOpenFinder={() => setIsFinderOpen(true)}
        onOpenOrderTracking={() => setIsTrackingOpen(true)}
        onSelectSaree={(saree) => setSelectedSaree(saree)}
        onFilterCategory={(fabric) => setFilters({ ...filters, fabric })}
        onOpenTrousseauTrunk={() => setIsTrousseauOpen(true)}
      />

      {/* Hero Showcase */}
      <HeroSection
        onExploreClick={() => {
          document.getElementById('collection-section')?.scrollIntoView({ behavior: 'smooth' });
        }}
        onOpenFinder={() => setIsFinderOpen(true)}
        onOpenDrapeGuide={() => setIsDrapeGuideOpen(true)}
        onSelectCategory={(fabric) => setFilters({ ...filters, fabric })}
        onOpenTrousseauTrunk={() => setIsTrousseauOpen(true)}
      />

      {/* Main Saree Collection Catalog Section */}
      <main id="collection-section" className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16 w-full">
        
        {/* Section Heading & Sort Bar */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-8 border-b border-[#262626]">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.2em] text-[#c5a059] bg-[#1a1a1a] px-3 py-1 rounded-full border border-[#333333] mb-2">
              <Sparkles className="w-3.5 h-3.5 text-[#c5a059]" />
              The Handloom Catalog
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl font-light text-white tracking-wide">
              {filters.fabric === 'all' ? 'All Handcrafted Sarees' : `${filters.fabric} Collection`}
            </h2>
            <p className="text-xs sm:text-sm text-[#a1a1aa] mt-1">
              Showing {filteredSarees.length} pure silk and handloom drapes certified with Silk Mark holograms
            </p>
          </div>

          {/* Sort selector */}
          <div className="flex items-center gap-3">
            <span className="text-xs font-medium text-[#a1a1aa] uppercase tracking-[0.2em] hidden sm:inline-block">
              Sort By:
            </span>
            <div className="relative">
              <select
                id="sort-by-selector"
                value={filters.sortBy}
                onChange={(e) => setFilters({ ...filters, sortBy: e.target.value as any })}
                className="bg-[#121212] border border-[#262626] text-[#e5e5e5] rounded-xl px-3.5 py-2 text-xs font-medium focus:outline-none focus:border-[#c5a059] shadow-2xs cursor-pointer"
              >
                <option value="featured">Featured & Curated</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
                <option value="newest">Weave Craftsmanship (Loom Days)</option>
              </select>
            </div>
          </div>
        </div>

        {/* 2-Column Layout: Left Filters + Right Product Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-8">
          
          {/* Filters Sidebar */}
          <aside className="lg:col-span-4 xl:col-span-3">
            <SareeFilters
              filters={filters}
              onFilterChange={setFilters}
              totalCount={filteredSarees.length}
            />

            {/* Saree Stylist Callout Box */}
            <div className="mt-6 p-5 bg-[#0d0d0d] rounded-2xl border border-[#262626] space-y-3 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-[#c5a059]/5 rounded-full blur-xl pointer-events-none"></div>
              <div className="flex items-center gap-2 text-[#c5a059]">
                <Sparkles className="w-4 h-4 text-[#c5a059]" />
                <h4 className="font-serif text-sm font-semibold tracking-wide text-[#e5e5e5]">Confused which silk suits you?</h4>
              </div>
              <p className="text-xs text-[#a1a1aa] leading-relaxed">
                Take our 30-second Saree Style Matcher quiz for personalized occasion & drape recommendations.
              </p>
              <button
                onClick={() => setIsFinderOpen(true)}
                className="w-full py-2.5 bg-[#c5a059] hover:bg-[#d4b476] text-black text-xs font-bold uppercase tracking-[0.15em] rounded-xl transition-colors cursor-pointer shadow-2xs"
              >
                Start Saree Finder Quiz
              </button>
            </div>
          </aside>

          {/* Saree Products Grid */}
          <section className="lg:col-span-8 xl:col-span-9">
            {filteredSarees.length === 0 ? (
              <div className="p-12 text-center bg-[#0d0d0d] rounded-3xl border border-[#262626] space-y-4">
                <div className="w-16 h-16 rounded-full bg-[#171717] border border-[#333333] flex items-center justify-center mx-auto text-[#c5a059]">
                  <Filter className="w-8 h-8 opacity-60" />
                </div>
                <div>
                  <h3 className="font-serif text-lg font-light text-white">No sarees matched your filters</h3>
                  <p className="text-xs text-[#71717a] mt-1 max-w-sm mx-auto">
                    Try adjusting the fabric selection, color palette, or price range slider.
                  </p>
                </div>
                <button
                  onClick={() => setFilters({
                    search: '',
                    fabric: 'all',
                    occasion: 'all',
                    craft: 'all',
                    color: 'all',
                    priceRange: [0, 60000],
                    sortBy: 'featured'
                  })}
                  className="px-5 py-2.5 bg-[#c5a059] text-black text-xs font-bold uppercase tracking-wider rounded-xl hover:bg-[#d4b476] cursor-pointer"
                >
                  Clear All Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredSarees.map((saree) => (
                  <SareeCard
                    key={saree.id}
                    saree={saree}
                    currency={currency}
                    isWishlisted={isWishlisted(saree.id)}
                    onToggleWishlist={handleToggleWishlist}
                    onQuickView={(s) => setSelectedSaree(s)}
                    onAddToCart={handleAddToCart}
                  />
                ))}
              </div>
            )}
          </section>

        </div>
      </main>

      {/* Heritage & Weaver Craft Section */}
      <HeritageSection
        onSelectRegion={(fabric) => setFilters({ ...filters, fabric })}
      />

      {/* Patrons of Varnam - Real Brides & Celebrations Gallery */}
      <PatronsGallery
        currency={currency}
        onSelectSaree={(s) => setSelectedSaree(s)}
        onQuickAddToCart={handleAddToCart}
      />

      {/* Footer */}
      <Footer
        onOpenDrapeGuide={() => setIsDrapeGuideOpen(true)}
        onOpenFinder={() => setIsFinderOpen(true)}
        onOpenOrderTracking={() => setIsTrackingOpen(true)}
        onOpenSilkCare={() => setIsSilkCareOpen(true)}
        onSelectCategory={(fabric) => setFilters({ ...filters, fabric })}
        theme={theme}
        onToggleTheme={handleToggleTheme}
      />

      {/* Saree Detail Modal */}
      <SareeDetailModal
        saree={selectedSaree}
        currency={currency}
        isWishlisted={selectedSaree ? isWishlisted(selectedSaree.id) : false}
        onClose={() => setSelectedSaree(null)}
        onToggleWishlist={handleToggleWishlist}
        onAddToCartWithOptions={handleAddToCartWithOptions}
        onBuyNow={handleBuyNow}
        onOpenDrapeGuide={() => {
          setSelectedSaree(null);
          setIsDrapeGuideOpen(true);
        }}
        onOpenSilkCare={() => {
          setIsSilkCareOpen(true);
        }}
      />

      {/* Shopping Bag Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        currency={currency}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onCheckout={handleInitiateCheckout}
        onToggleGiftWrap={handleToggleGiftWrap}
        onUpdateGiftNote={handleUpdateGiftNote}
      />

      {/* Saved Sarees Wishlist Drawer */}
      <WishlistDrawer
        isOpen={isWishlistOpen}
        onClose={() => setIsWishlistOpen(false)}
        wishlist={wishlist}
        currency={currency}
        onRemoveFromWishlist={handleRemoveFromWishlist}
        onMoveToBag={handleAddToCart}
        onQuickView={(s) => setSelectedSaree(s)}
      />

      {/* Saree Style Finder Quiz */}
      <SareeFinderQuiz
        isOpen={isFinderOpen}
        onClose={() => setIsFinderOpen(false)}
        currency={currency}
        onSelectSaree={(s) => setSelectedSaree(s)}
        onAddToCart={handleAddToCart}
      />

      {/* Saree Draping Masterclass */}
      <DrapeGuideModal
        isOpen={isDrapeGuideOpen}
        onClose={() => setIsDrapeGuideOpen(false)}
      />

      {/* Interactive Bridal Trousseau Trunk Builder Modal */}
      <BridalTrousseauModal
        isOpen={isTrousseauOpen}
        onClose={() => setIsTrousseauOpen(false)}
        currency={currency}
        onSelectSaree={(saree) => setSelectedSaree(saree)}
        onAddTrousseauToCart={handleAddTrousseauToCart}
      />

      {/* Heirloom Silk & Zari Care Guide Modal */}
      <SilkCareGuideModal
        isOpen={isSilkCareOpen}
        onClose={() => setIsSilkCareOpen(false)}
      />

      {/* Order Tracking Modal */}
      <OrderTrackingModal
        isOpen={isTrackingOpen}
        onClose={() => setIsTrackingOpen(false)}
        initialOrderNumber={trackingOrderNumber}
      />

      {/* Atelier Payment Gateway Modal */}
      <PaymentGatewayModal
        isOpen={isPaymentGatewayOpen}
        onClose={() => setIsPaymentGatewayOpen(false)}
        cartItems={cartItems}
        currency={currency}
        subtotal={cartSubtotal}
        discountAmount={discountAmount}
        shipping={shipping}
        grandTotal={grandTotal}
        appliedPromo={appliedPromo}
        onPaymentSuccess={handlePaymentSuccess}
      />

      {/* Order Success Confirmation Modal */}
      <OrderSuccessModal
        isOpen={orderSuccessModalData.isOpen}
        onClose={() => setOrderSuccessModalData({ isOpen: false, orderNumber: '', items: [] })}
        orderNumber={orderSuccessModalData.orderNumber}
        cartItems={orderSuccessModalData.items}
        currency={currency}
        transactionId={paymentResult?.transactionId}
        paymentMethod={paymentResult?.paymentMethod}
        gateway={paymentResult?.gateway}
        recipientName={paymentResult?.shippingAddress.fullName}
        destinationCity={paymentResult?.shippingAddress.city}
        onContinueShopping={() => setOrderSuccessModalData({ isOpen: false, orderNumber: '', items: [] })}
        onTrackOrder={(orderNum) => {
          setOrderSuccessModalData({ isOpen: false, orderNumber: '', items: [] });
          setTrackingOrderNumber(orderNum);
          setIsTrackingOpen(true);
        }}
      />

    </div>
  );
}
