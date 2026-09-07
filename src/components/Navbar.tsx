import React, { useState, useRef, useEffect } from 'react';
import { Search, Heart, ShoppingBag, Sparkles, BookOpen, ChevronDown, X, ShieldCheck, Truck, Sun, Moon, Gift, Users } from 'lucide-react';
import { Currency, Saree, ThemeMode } from '../types';
import { SAREES_DATA } from '../data/sareesData';
import { formatPrice } from '../utils/formatters';

interface NavbarProps {
  cartCount: number;
  wishlistCount: number;
  currency: Currency;
  theme?: ThemeMode;
  onToggleTheme?: () => void;
  onCurrencyChange: (c: Currency) => void;
  onOpenCart: () => void;
  onOpenWishlist: () => void;
  onOpenDrapeGuide: () => void;
  onOpenFinder: () => void;
  onOpenOrderTracking: () => void;
  onSelectSaree: (saree: Saree) => void;
  onFilterCategory: (fabric: string) => void;
  onOpenTrousseauTrunk?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  cartCount,
  wishlistCount,
  currency,
  theme = 'midnight',
  onToggleTheme,
  onCurrencyChange,
  onOpenCart,
  onOpenWishlist,
  onOpenDrapeGuide,
  onOpenFinder,
  onOpenOrderTracking,
  onSelectSaree,
  onFilterCategory,
  onOpenTrousseauTrunk
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isCurrencyDropdownOpen, setIsCurrencyDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const currencyRef = useRef<HTMLDivElement>(null);

  const searchResults = searchQuery.trim() === ''
    ? []
    : SAREES_DATA.filter(s => 
        s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.fabric.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.craft.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.originRegion.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.occasion.toLowerCase().includes(searchQuery.toLowerCase())
      ).slice(0, 4);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      const target = event.target as Node;
      if (searchRef.current && !searchRef.current.contains(target)) {
        setIsSearchOpen(false);
      }
      if (currencyRef.current && !currencyRef.current.contains(target)) {
        setIsCurrencyDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="sticky top-0 z-40 bg-[#0d0d0d]/95 backdrop-blur-md border-b border-[#262626] shadow-md">
      {/* Top Announcement Bar */}
      <div className="bg-[#0a0a0a] text-[#e5e5e5] text-xs py-1.5 px-4 font-normal border-b border-[#1f1f1f]">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="bg-[#c5a059]/20 text-[#c5a059] border border-[#c5a059]/40 text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-[0.2em]">
              Festive Edit
            </span>
            <span className="text-[#a1a1aa] text-xs">
              Flat 20% Off on Heritage Silks with code <strong className="text-[#c5a059]">UTSAV20</strong> | Free Fall & Pico Hemming
            </span>
          </div>
          
          <div className="hidden md:flex items-center gap-4 text-xs text-[#a1a1aa]">
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-[#c5a059]" />
              100% Silk Mark Certified
            </span>
            <span className="text-[#333333]">|</span>
            <button
              id="announcement-track-shipment-btn"
              onClick={onOpenOrderTracking}
              className="flex items-center gap-1.5 hover:text-[#c5a059] transition-colors cursor-pointer"
            >
              <Truck className="w-3.5 h-3.5 text-[#c5a059]" />
              <span>Track Shipment</span>
            </button>
            <span className="text-[#333333]">|</span>
            <span>Worldwide Atelier Shipping</span>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16 sm:h-[72px] gap-2 sm:gap-4">
          
          {/* Mobile Menu Button */}
          <div className="flex items-center lg:hidden">
            <button 
              id="mobile-menu-toggle"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-lg text-[#a1a1aa] hover:bg-[#1a1a1a] hover:text-[#c5a059] focus:outline-none cursor-pointer"
              aria-label="Toggle menu"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isMobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>

          {/* Brand Logo & Tagline */}
          <div 
            className="flex flex-col items-center lg:items-start cursor-pointer shrink-0 group" 
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            <div className="flex items-center gap-2">
              <span className="font-royal text-2xl sm:text-[26px] font-light tracking-[0.28em] text-[#c5a059] transition-colors group-hover:text-[#dfbe7e]">
                VARNAM
              </span>
              <span className="hidden sm:inline-flex items-center text-[8.5px] uppercase font-semibold text-[#c5a059] border border-[#c5a059]/30 px-2 py-0.5 rounded-full tracking-[0.2em] bg-[#1a150b]/90 shadow-2xs">
                Kashi • Kanchi • Patan
              </span>
            </div>
            <span className="text-[9px] font-light tracking-[0.28em] text-[#8e8e93] uppercase mt-0.5">
              The Handloom Saree Guild
            </span>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-3 xl:gap-5 text-[11px] uppercase tracking-[0.14em] font-medium text-[#a1a1aa]">
            <button 
              onClick={() => {
                onFilterCategory('all');
                document.getElementById('collection-section')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="hover:text-[#c5a059] transition-colors py-1 relative group cursor-pointer whitespace-nowrap"
            >
              All Sarees
              <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-[#c5a059] transition-all duration-300 group-hover:w-full"></span>
            </button>

            <button 
              onClick={() => {
                onFilterCategory('Kanjivaram Silk');
                document.getElementById('collection-section')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="hover:text-[#c5a059] transition-colors py-1 relative group cursor-pointer whitespace-nowrap"
            >
              Kanjivaram
              <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-[#c5a059] transition-all duration-300 group-hover:w-full"></span>
            </button>

            <button 
              onClick={() => {
                onFilterCategory('Banarasi Silk');
                document.getElementById('collection-section')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="hover:text-[#c5a059] transition-colors py-1 relative group cursor-pointer whitespace-nowrap"
            >
              Banarasi Zari
              <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-[#c5a059] transition-all duration-300 group-hover:w-full"></span>
            </button>

            <button 
              onClick={() => {
                onFilterCategory('Organza');
                document.getElementById('collection-section')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="hover:text-[#c5a059] transition-colors py-1 relative group cursor-pointer whitespace-nowrap"
            >
              Organza
              <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-[#c5a059] transition-all duration-300 group-hover:w-full"></span>
            </button>

            {/* Bridal Trousseau Trunk Builder */}
            {onOpenTrousseauTrunk && (
              <button 
                id="nav-trousseau-trunk-btn"
                onClick={onOpenTrousseauTrunk}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#1c160c] text-[#c5a059] hover:bg-[#281f10] border border-[#c5a059]/50 hover:border-[#c5a059] transition-all text-[10px] uppercase tracking-[0.14em] font-semibold cursor-pointer shadow-xs whitespace-nowrap"
              >
                <Gift className="w-3.5 h-3.5 text-[#c5a059]" />
                <span>Bridal Trunk</span>
              </button>
            )}

            {/* Saree Finder */}
            <button 
              onClick={onOpenFinder}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#161616] text-[#c5a059] hover:bg-[#202020] border border-[#333333] hover:border-[#c5a059]/40 transition-colors text-[10px] uppercase tracking-[0.14em] font-medium cursor-pointer shadow-2xs whitespace-nowrap"
            >
              <Sparkles className="w-3 h-3 text-[#c5a059]" />
              <span>Finder</span>
            </button>

            {/* Drape Masterclass */}
            <button
              onClick={onOpenDrapeGuide}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#161616] text-[#a1a1aa] hover:text-[#c5a059] hover:bg-[#202020] border border-[#333333] hover:border-[#c5a059]/40 transition-colors text-[10px] uppercase tracking-[0.14em] font-medium cursor-pointer shadow-2xs whitespace-nowrap"
            >
              <BookOpen className="w-3 h-3 text-[#c5a059]" />
              <span>Drape Guide</span>
            </button>

            {/* Real Brides */}
            <button 
              onClick={() => {
                document.getElementById('patrons-gallery-section')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="hidden xl:inline-flex items-center gap-1.5 text-[10px] text-[#a1a1aa] hover:text-[#c5a059] uppercase tracking-[0.14em] transition-colors font-medium cursor-pointer whitespace-nowrap px-1"
            >
              <Users className="w-3.5 h-3.5 text-[#c5a059]" />
              <span>Real Brides</span>
            </button>
          </nav>

          {/* Right Action Icons: Search, Display Setting, Currency, Wishlist, Cart */}
          <div className="flex items-center space-x-1.5 sm:space-x-2.5">
            
            {/* Search Trigger / Input */}
            <div className="relative" ref={searchRef}>
              <div className="flex items-center">
                {isSearchOpen ? (
                  <div className="flex items-center bg-[#171717] border border-[#333333] rounded-full px-3 py-1.5 w-44 sm:w-60 transition-all">
                    <Search className="w-4 h-4 text-[#c5a059] mr-2 shrink-0" />
                    <input
                      type="text"
                      placeholder="Search silks, zari..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      autoFocus
                      className="bg-transparent text-xs w-full text-[#e5e5e5] focus:outline-none placeholder-[#71717a]"
                    />
                    <button 
                      onClick={() => {
                        setIsSearchOpen(false);
                        setSearchQuery('');
                      }} 
                      className="text-[#71717a] hover:text-[#e5e5e5] cursor-pointer"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ) : (
                  <button
                    id="search-button"
                    onClick={() => setIsSearchOpen(true)}
                    className="p-2 rounded-full text-[#a1a1aa] hover:bg-[#1a1a1a] hover:text-[#c5a059] transition-colors cursor-pointer"
                    title="Search Sarees"
                  >
                    <Search className="w-5 h-5" />
                  </button>
                )}
              </div>

              {/* Search Instant Results Dropdown */}
              {isSearchOpen && searchResults.length > 0 && (
                <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-[#121212] border border-[#262626] rounded-xl shadow-2xl z-50 p-2 overflow-hidden animate-in fade-in zoom-in-95">
                  <div className="text-[10px] font-medium text-[#c5a059] uppercase tracking-[0.2em] px-3 py-1.5 border-b border-[#262626]">
                    Found {searchResults.length} Handloom Sarees
                  </div>
                  <div className="divide-y divide-[#1f1f1f]">
                    {searchResults.map((s) => (
                      <div
                        key={s.id}
                        onClick={() => {
                          onSelectSaree(s);
                          setIsSearchOpen(false);
                          setSearchQuery('');
                        }}
                        className="flex items-center gap-3 p-2.5 hover:bg-[#1a1a1a] transition-colors cursor-pointer rounded-lg"
                      >
                        <img 
                          src={s.images[0]} 
                          alt={s.name} 
                          referrerPolicy="no-referrer"
                          className="w-12 h-16 object-cover rounded-md border border-[#262626]"
                        />
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-serif font-light text-white truncate">{s.name}</p>
                          <p className="text-[10px] text-[#c5a059] uppercase tracking-wider mt-0.5">{s.fabric} • {s.originRegion.split(',')[0]}</p>
                          <p className="text-xs font-mono text-[#a1a1aa] mt-0.5">{formatPrice(s.price, currency)}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Single Unified Dark & Light Display Setting Control */}
            {onToggleTheme && (
              <button
                id="navbar-desktop-display-toggle-btn"
                onClick={onToggleTheme}
                className="flex items-center gap-1.5 text-xs font-medium text-[#a1a1aa] hover:text-[#c5a059] bg-[#171717] hover:bg-[#202020] px-3 py-1.5 rounded-full border border-[#262626] transition-colors cursor-pointer group shadow-2xs"
                title={`Current Mode: ${theme === 'midnight' ? 'Midnight Dark' : 'Ivory Light'}. Click to switch theme.`}
                aria-label="Toggle dark and light display setting"
              >
                {theme === 'midnight' ? (
                  <>
                    <Moon className="w-3.5 h-3.5 text-[#c5a059] group-hover:-rotate-12 transition-transform" />
                    <span className="hidden sm:inline text-[11px] font-mono">Dark</span>
                  </>
                ) : (
                  <>
                    <Sun className="w-3.5 h-3.5 text-[#b45309] group-hover:rotate-45 transition-transform" />
                    <span className="hidden sm:inline text-[11px] font-mono">Light</span>
                  </>
                )}
              </button>
            )}

            {/* Currency Selector */}
            <div className="relative" ref={currencyRef}>
              <button
                id="currency-selector"
                onClick={() => setIsCurrencyDropdownOpen(!isCurrencyDropdownOpen)}
                className="flex items-center gap-1 text-xs font-medium text-[#a1a1aa] bg-[#171717] hover:bg-[#212121] hover:text-[#c5a059] px-2.5 py-1.5 rounded-full border border-[#262626] transition-colors"
              >
                <span>{currency}</span>
                <ChevronDown className="w-3 h-3 text-[#71717a]" />
              </button>

              {isCurrencyDropdownOpen && (
                <div className="absolute right-0 mt-2 w-28 bg-[#121212] border border-[#262626] rounded-lg shadow-xl py-1 z-50">
                  {(['INR', 'USD', 'EUR', 'GBP', 'AED'] as Currency[]).map((curr) => (
                    <button
                      key={curr}
                      onClick={() => {
                        onCurrencyChange(curr);
                        setIsCurrencyDropdownOpen(false);
                      }}
                      className={`w-full text-left px-3 py-1.5 text-xs font-medium transition-colors ${
                        currency === curr 
                          ? 'bg-[#c5a059] text-black font-bold' 
                          : 'text-[#a1a1aa] hover:bg-[#1a1a1a] hover:text-[#c5a059]'
                      }`}
                    >
                      {curr}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Wishlist Button */}
            <button
              id="wishlist-drawer-button"
              onClick={onOpenWishlist}
              className="p-2 rounded-full text-[#a1a1aa] hover:bg-[#1a1a1a] hover:text-[#c5a059] transition-colors relative"
              title="View Wishlist"
            >
              <Heart className="w-5 h-5" />
              {wishlistCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#c5a059] text-black text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center animate-in zoom-in">
                  {wishlistCount}
                </span>
              )}
            </button>

            {/* Shopping Bag Button */}
            <button
              id="cart-drawer-button"
              onClick={onOpenCart}
              className="flex items-center gap-2 bg-[#c5a059] hover:bg-[#d4b476] text-black px-4 py-2 rounded-full transition-all duration-200 shadow-md font-bold cursor-pointer"
              title="Shopping Bag"
            >
              <ShoppingBag className="w-4 h-4" />
              <span className="text-xs font-mono">{cartCount}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Navigation Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden border-t border-[#262626] bg-[#0d0d0d] px-4 pt-3 pb-5 space-y-3 animate-in slide-in-from-top-2">
          <div className="grid grid-cols-2 gap-2">
            <button 
              onClick={() => {
                onFilterCategory('all');
                setIsMobileMenuOpen(false);
                document.getElementById('collection-section')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="text-left px-3 py-2 text-xs uppercase tracking-wider font-medium text-[#a1a1aa] bg-[#171717] border border-[#262626] rounded-lg hover:text-[#c5a059]"
            >
              All Sarees
            </button>
            <button 
              onClick={() => {
                onFilterCategory('Kanjivaram Silk');
                setIsMobileMenuOpen(false);
                document.getElementById('collection-section')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="text-left px-3 py-2 text-xs uppercase tracking-wider font-medium text-[#a1a1aa] bg-[#171717] border border-[#262626] rounded-lg hover:text-[#c5a059]"
            >
              Kanjivaram Silk
            </button>
            <button 
              onClick={() => {
                onFilterCategory('Banarasi Silk');
                setIsMobileMenuOpen(false);
                document.getElementById('collection-section')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="text-left px-3 py-2 text-xs uppercase tracking-wider font-medium text-[#a1a1aa] bg-[#171717] border border-[#262626] rounded-lg hover:text-[#c5a059]"
            >
              Banarasi Zari
            </button>
            <button 
              onClick={() => {
                onFilterCategory('Organza');
                setIsMobileMenuOpen(false);
                document.getElementById('collection-section')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="text-left px-3 py-2 text-xs uppercase tracking-wider font-medium text-[#a1a1aa] bg-[#171717] border border-[#262626] rounded-lg hover:text-[#c5a059]"
            >
              Organza & Pastels
            </button>
          </div>

          <div className="flex flex-col sm:flex-row gap-2 pt-1">
            {onOpenTrousseauTrunk && (
              <button 
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  onOpenTrousseauTrunk();
                }}
                className="flex-1 flex items-center justify-center gap-1.5 py-2.5 px-3 bg-[#1c1810] border border-[#c5a059]/60 text-[#c5a059] rounded-lg text-xs font-bold uppercase tracking-wider"
              >
                <Gift className="w-3.5 h-3.5" />
                Bridal Trunk Builder
              </button>
            )}

            <button 
              onClick={() => {
                setIsMobileMenuOpen(false);
                document.getElementById('patrons-gallery-section')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="flex-1 flex items-center justify-center gap-1.5 py-2.5 px-3 bg-[#171717] border border-[#262626] text-[#a1a1aa] hover:text-white rounded-lg text-xs font-bold uppercase tracking-wider"
            >
              <Users className="w-3.5 h-3.5 text-[#c5a059]" />
              Real Brides
            </button>

            {onToggleTheme && (
              <button 
                onClick={() => {
                  onToggleTheme();
                }}
                className="flex-1 flex items-center justify-center gap-1.5 py-2.5 px-3 bg-[#171717] border border-[#262626] text-[#c5a059] rounded-lg text-xs font-bold uppercase tracking-wider cursor-pointer"
              >
                {theme === 'midnight' ? <Sun className="w-3.5 h-3.5" /> : <Moon className="w-3.5 h-3.5" />}
                {theme === 'midnight' ? 'Switch to Light' : 'Switch to Dark'}
              </button>
            )}
          </div>

          <div className="flex flex-col sm:flex-row gap-2 pt-1">
            <button 
              onClick={() => {
                setIsMobileMenuOpen(false);
                onOpenFinder();
              }}
              className="flex-1 flex items-center justify-center gap-1.5 py-2.5 px-3 bg-[#171717] border border-[#333333] text-[#c5a059] rounded-lg text-xs font-bold uppercase tracking-wider"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#c5a059]" />
              Saree Style Finder
            </button>

            <button 
              onClick={() => {
                setIsMobileMenuOpen(false);
                onOpenDrapeGuide();
              }}
              className="flex-1 flex items-center justify-center gap-1.5 py-2.5 px-3 bg-[#171717] text-[#a1a1aa] hover:text-white border border-[#262626] rounded-lg text-xs font-bold uppercase tracking-wider"
            >
              <BookOpen className="w-3.5 h-3.5 text-[#c5a059]" />
              Draping Guide
            </button>

            <button 
              id="mobile-track-order-btn"
              onClick={() => {
                setIsMobileMenuOpen(false);
                onOpenOrderTracking();
              }}
              className="flex-1 flex items-center justify-center gap-1.5 py-2.5 px-3 bg-[#c5a059] text-black rounded-lg text-xs font-bold uppercase tracking-wider hover:bg-[#d4b476] cursor-pointer"
            >
              <Truck className="w-3.5 h-3.5" />
              Track Order
            </button>
          </div>

          {/* Mobile Currency Selection */}
          <div className="flex items-center justify-between bg-[#141414] px-3 py-2 rounded-lg border border-[#262626] text-xs">
            <span className="text-[#71717a] uppercase tracking-wider text-[10px] font-mono">Currency</span>
            <div className="flex items-center gap-1">
              {(['INR', 'USD', 'EUR', 'GBP', 'AED'] as Currency[]).map((curr) => (
                <button
                  key={curr}
                  onClick={() => onCurrencyChange(curr)}
                  className={`px-2 py-1 rounded text-[11px] font-mono transition-colors cursor-pointer ${
                    currency === curr
                      ? 'bg-[#c5a059] text-black font-bold'
                      : 'text-[#a1a1aa] hover:text-white bg-[#1c1c1c]'
                  }`}
                >
                  {curr}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
