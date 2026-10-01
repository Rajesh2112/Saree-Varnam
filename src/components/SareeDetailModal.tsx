import React, { useState, useRef } from 'react';
import { X, Heart, ShieldCheck, Star, Sparkles, Scissors, Gift, Check, Clock, Share2, Ruler, ZoomIn, Sun, Sunset, Moon, Palette } from 'lucide-react';
import { Saree, BlouseOption, Currency } from '../types';
import { BLOUSE_STITCHING_OPTIONS, REVIEWS_DATA } from '../data/sareesData';
import { formatPrice, calculateDiscount } from '../utils/formatters';

interface SareeDetailModalProps {
  saree: Saree | null;
  currency: Currency;
  isWishlisted: boolean;
  onClose: () => void;
  onToggleWishlist: (saree: Saree) => void;
  onAddToCartWithOptions: (saree: Saree, blouse: BlouseOption, bustSize: string, fallPico: boolean, giftWrap: boolean) => void;
  onBuyNow: (saree: Saree, blouse: BlouseOption, bustSize: string, fallPico: boolean, giftWrap: boolean) => void;
  onOpenDrapeGuide: () => void;
  onOpenSilkCare?: () => void;
}

export const SareeDetailModal: React.FC<SareeDetailModalProps> = ({
  saree,
  currency,
  isWishlisted,
  onClose,
  onToggleWishlist,
  onAddToCartWithOptions,
  onBuyNow,
  onOpenDrapeGuide,
  onOpenSilkCare
}) => {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [selectedBlouse, setSelectedBlouse] = useState<BlouseOption>(BLOUSE_STITCHING_OPTIONS[0]);
  const [selectedBustSize, setSelectedBustSize] = useState('36" (Medium)');
  const [includeFallPico, setIncludeFallPico] = useState(true);
  const [includeGiftWrap, setIncludeGiftWrap] = useState(false);
  const [activeTab, setActiveTab] = useState<'details' | 'artisan' | 'reviews'>('details');
  const [isCopied, setIsCopied] = useState(false);

  // Artisan Loupe Magnifier State
  const [isLoupeEnabled, setIsLoupeEnabled] = useState(false);
  const [isHoveringImage, setIsHoveringImage] = useState(false);
  const [loupeCoords, setLoupeCoords] = useState<{ x: number; y: number; pctX: number; pctY: number }>({ x: 0, y: 0, pctX: 50, pctY: 50 });
  const imageContainerRef = useRef<HTMLDivElement>(null);

  // Event Lighting Harmony State
  const [lightingMode, setLightingMode] = useState<'temple' | 'sunset' | 'reception'>('temple');

  // Blouse Contrast Harmonizer Swatches
  const contrastSwatches = [
    { name: 'Antique Gold Tissue', hex: '#ca8a04', harmonyScore: 98, note: 'Royal Zari Reflection' },
    { name: 'Sindoor Crimson', hex: '#881337', harmonyScore: 96, note: 'Vedic Bridal Contrast' },
    { name: 'Emerald Peacock', hex: '#065f46', harmonyScore: 94, note: 'Temple Garden Heritage' },
    { name: 'Royal Plum', hex: '#4c1d95', harmonyScore: 92, note: 'Twilight Reception' },
    { name: 'Raw Sandalwood Ivory', hex: '#e7e5e4', harmonyScore: 95, note: 'Dawn Puja Elegance' }
  ];
  const [selectedContrast, setSelectedContrast] = useState(contrastSwatches[0]);

  if (!saree) return null;

  const discount = calculateDiscount(saree.originalPrice, saree.price);
  const totalItemPrice = saree.price + selectedBlouse.price + (includeGiftWrap ? 250 : 0);

  const sareeReviews = REVIEWS_DATA.filter(r => r.sareeId === saree.id);

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!imageContainerRef.current) return;
    const rect = imageContainerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const pctX = Math.max(0, Math.min(100, (x / rect.width) * 100));
    const pctY = Math.max(0, Math.min(100, (y / rect.height) * 100));
    setLoupeCoords({ x, y, pctX, pctY });
  };

  // Dynamic CSS filter based on event lighting simulation
  const getLightingFilter = () => {
    switch (lightingMode) {
      case 'sunset':
        return 'sepia(0.22) saturate(1.25) brightness(1.04) hue-rotate(-8deg)';
      case 'reception':
        return 'contrast(1.16) brightness(0.96) saturate(1.12)';
      case 'temple':
      default:
        return 'brightness(1.03) contrast(1.02)';
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-sm flex items-center justify-center p-2 sm:p-4 md:p-6 animate-in fade-in duration-200">
      
      {/* Outer Modal Box */}
      <div 
        id="saree-detail-modal-container"
        className="relative bg-[#0d0d0d] rounded-3xl max-w-5xl w-full border border-[#262626] shadow-2xl overflow-hidden my-auto max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Sticky Header with Close Button */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#262626] bg-[#0a0a0a] sticky top-0 z-20">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-bold text-[#c5a059] uppercase tracking-[0.2em] bg-[#1a1a1a] px-3 py-1 rounded-full border border-[#333333]">
              {saree.fabric}
            </span>
            <span className="text-xs text-[#71717a] hidden sm:inline-block">
              {saree.originRegion}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleShare}
              className="p-2 rounded-full hover:bg-[#1a1a1a] text-[#a1a1aa] hover:text-[#c5a059] transition-colors"
              title="Share Saree Link"
            >
              {isCopied ? <span className="text-[10px] font-bold text-[#4ade80]">Copied!</span> : <Share2 className="w-4 h-4" />}
            </button>

            <button
              onClick={() => onToggleWishlist(saree)}
              className="p-2 rounded-full hover:bg-[#1a1a1a] text-[#a1a1aa] hover:text-[#c5a059] transition-colors"
              title={isWishlisted ? "In Wishlist" : "Add to Wishlist"}
            >
              <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-[#c5a059] text-[#c5a059]' : ''}`} />
            </button>

            <button
              id="close-saree-detail-modal"
              onClick={onClose}
              className="p-2 rounded-full hover:bg-[#1a1a1a] text-[#a1a1aa] hover:text-white transition-colors"
              title="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Scrollable Body */}
        <div className="overflow-y-auto p-4 sm:p-6 lg:p-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left: Multi-Angle Gallery & Interactive Studios */}
            <div className="lg:col-span-6 space-y-4">
              {/* Main Image Container with Optical Loupe & Lighting Simulation */}
              <div 
                ref={imageContainerRef}
                onMouseMove={handleMouseMove}
                onMouseEnter={() => setIsHoveringImage(true)}
                onMouseLeave={() => setIsHoveringImage(false)}
                className="relative aspect-[3/4] w-full rounded-2xl overflow-hidden bg-[#141414] border border-[#262626] shadow-inner select-none group cursor-crosshair"
              >
                <img
                  src={saree.images[selectedImageIndex] || saree.images[0]}
                  alt={saree.name}
                  referrerPolicy="no-referrer"
                  style={{ filter: getLightingFilter() }}
                  className="w-full h-full object-cover object-top transition-all duration-500"
                />

                {/* Optical Weave Loupe Lens */}
                {isLoupeEnabled && isHoveringImage && (
                  <div
                    style={{
                      left: `${loupeCoords.x}px`,
                      top: `${loupeCoords.y}px`,
                      backgroundImage: `url(${saree.images[selectedImageIndex] || saree.images[0]})`,
                      backgroundPosition: `${loupeCoords.pctX}% ${loupeCoords.pctY}%`,
                      backgroundSize: '280%',
                      transform: 'translate(-50%, -50%)',
                      filter: getLightingFilter()
                    }}
                    className="absolute w-40 h-40 rounded-full border-2 border-[#c5a059] shadow-2xl pointer-events-none z-30 overflow-hidden ring-4 ring-black/40"
                  >
                    {/* Reticle Crosshairs */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-40">
                      <div className="w-full h-[1px] bg-[#c5a059]/80" />
                      <div className="h-full w-[1px] bg-[#c5a059]/80 absolute" />
                    </div>
                    {/* Telemetry pill */}
                    <div className="absolute bottom-2 inset-x-0 mx-auto w-fit bg-black/85 text-[#c5a059] text-[8px] font-mono px-2 py-0.5 rounded-full uppercase tracking-wider border border-[#c5a059]/40">
                      2.8× Weave Loupe
                    </div>
                  </div>
                )}

                {/* Top Controls: Loupe Switch & Lighting Badge */}
                <div className="absolute top-3 inset-x-3 flex items-center justify-between pointer-events-auto z-20">
                  <div className="bg-[#0a0a0a]/80 backdrop-blur-md px-2.5 py-1 rounded-lg border border-[#333333] text-[10px] text-[#c5a059] font-medium flex items-center gap-1.5">
                    {lightingMode === 'temple' && <Sun className="w-3 h-3" />}
                    {lightingMode === 'sunset' && <Sunset className="w-3 h-3 text-[#f59e0b]" />}
                    {lightingMode === 'reception' && <Moon className="w-3 h-3 text-[#a855f7]" />}
                    <span className="capitalize">{lightingMode} Lighting</span>
                  </div>

                  <button
                    onClick={() => setIsLoupeEnabled(!isLoupeEnabled)}
                    className={`px-3 py-1.5 rounded-full text-[10px] uppercase font-bold tracking-[0.15em] flex items-center gap-1.5 transition-all shadow-md cursor-pointer ${
                      isLoupeEnabled
                        ? 'bg-white text-black ring-2 ring-white/20'
                        : 'bg-[#0a0a0a]/85 text-[#e5e5e5] hover:text-[#c5a059] border border-[#333333]'
                    }`}
                  >
                    <ZoomIn className="w-3.5 h-3.5" />
                    <span>{isLoupeEnabled ? 'Loupe On' : '2.8× Loupe'}</span>
                  </button>
                </div>

                    {/* Selected Contrast Blouse Live Swatch Inset */}
                    <div className="absolute bottom-3 right-3 z-20 flex items-center gap-2 bg-[#0a0a0a]/90 backdrop-blur-md px-2.5 py-1.5 rounded-xl border border-[#333333]">
                      <div 
                        className="w-5 h-5 rounded-full border border-white/40 shadow-inner shrink-0" 
                        style={{ backgroundColor: selectedContrast.hex }}
                      />
                      <div className="text-left">
                        <p className="text-[9px] text-[#71717a] uppercase tracking-wider">Contrast Blouse</p>
                        <p className="text-[10px] text-white font-medium truncate max-w-[100px]">{selectedContrast.name}</p>
                      </div>
                    </div>

                    {/* Silk Mark Badge Overlay */}
                    <div className="absolute bottom-3 left-3 bg-[#0a0a0a]/90 backdrop-blur-md text-[#4ade80] border border-[#22c55e]/40 text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-lg flex items-center gap-1.5 shadow-md z-20">
                      <ShieldCheck className="w-4 h-4 text-[#4ade80]" />
                      <span>Silk Mark 100% Pure Silk</span>
                    </div>
                  </div>

                  {/* Thumbnails */}
                  {saree.images.length > 1 && (
                    <div className="flex gap-3 overflow-x-auto pb-1">
                      {saree.images.map((img, idx) => (
                        <button
                          key={idx}
                          onClick={() => setSelectedImageIndex(idx)}
                          className={`relative w-20 aspect-[3/4] rounded-xl overflow-hidden border transition-all shrink-0 cursor-pointer ${
                            selectedImageIndex === idx
                              ? 'border-[#c5a059] ring-1 ring-[#c5a059]'
                              : 'border-[#262626] opacity-60 hover:opacity-100'
                          }`}
                        >
                          <img 
                            src={img} 
                            alt="" 
                            referrerPolicy="no-referrer"
                            className="w-full h-full object-cover" 
                          />
                        </button>
                      ))}
                    </div>
                  )}

              {/* Interactive Event Lighting & Contrast Blouse Harmonizer */}
              <div className="p-3.5 bg-[#121212] rounded-2xl border border-[#262626] space-y-3">
                
                {/* Event Lighting Simulation Modes */}
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#c5a059] flex items-center gap-1.5">
                    <Sun className="w-3 h-3" />
                    <span>Event Lighting Simulation</span>
                  </span>
                  <span className="text-[10px] text-[#71717a]">Simulate natural temple vs evening reception</span>
                </div>

                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: 'temple', label: 'Temple Daylight', icon: Sun, desc: 'True natural sheen' },
                    { id: 'sunset', label: 'Golden Hour Sunset', icon: Sunset, desc: '+25% Zari glow' },
                    { id: 'reception', label: 'Chandelier Evening', icon: Moon, desc: 'Opulent contrast' }
                  ].map((mode) => {
                    const Icon = mode.icon;
                    const isActive = lightingMode === mode.id;

                    return (
                      <button
                        key={mode.id}
                        type="button"
                        onClick={() => setLightingMode(mode.id as 'temple' | 'sunset' | 'reception')}
                        className={`p-2 rounded-xl border text-left transition-all cursor-pointer ${
                          isActive
                            ? 'bg-[#1a1710] border-[#c5a059] text-white shadow-xs'
                            : 'bg-[#171717] border-[#262626] text-[#a1a1aa] hover:text-white'
                        }`}
                      >
                        <div className="flex items-center gap-1.5 text-xs font-semibold">
                          <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-[#c5a059]' : 'text-[#71717a]'}`} />
                          <span className="truncate">{mode.label}</span>
                        </div>
                        <p className="text-[9px] text-[#71717a] mt-0.5 truncate">{mode.desc}</p>
                      </button>
                    );
                  })}
                </div>

                {/* Blouse Contrast Harmonizer Swatches */}
                <div className="pt-2 border-t border-[#1f1f1f] space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-white flex items-center gap-1.5">
                      <Palette className="w-3 h-3 text-[#c5a059]" />
                      <span>Artisan Contrast Blouse Harmonizer</span>
                    </span>
                    <span className="text-[10px] text-[#4ade80] font-mono">
                      {selectedContrast.harmonyScore}% Royal Harmony
                    </span>
                  </div>

                  <div className="flex items-center gap-2 overflow-x-auto pb-1">
                    {contrastSwatches.map((swatch) => (
                      <button
                        key={swatch.name}
                        onClick={() => setSelectedContrast(swatch)}
                        className={`flex items-center gap-2 px-2.5 py-1.5 rounded-xl border transition-all cursor-pointer shrink-0 ${
                          selectedContrast.name === swatch.name
                            ? 'bg-[#1a1710] border-[#c5a059] text-[#c5a059]'
                            : 'bg-[#171717] border-[#262626] text-[#a1a1aa] hover:text-white'
                        }`}
                      >
                        <div
                          className="w-3.5 h-3.5 rounded-full border border-white/30 shadow-xs shrink-0"
                          style={{ backgroundColor: swatch.hex }}
                        />
                        <span className="text-[10px] font-medium">{swatch.name}</span>
                      </button>
                    ))}
                  </div>
                  <p className="text-[10px] text-[#71717a] italic">
                    Tip: {selectedContrast.note} — handwoven pure silk contrast matches the temple pallu.
                  </p>
                </div>
              </div>

              {/* Draping Guide */}
              <div className="bg-[#121212] rounded-xl p-3.5 border border-[#262626] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h4 className="text-xs font-semibold text-[#e5e5e5] flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-[#c5a059]" />
                    Artisan Draping Secrets
                  </h4>
                  <p className="text-[11px] text-[#71717a]">
                    Explore 5 authentic regional drape styles and 6-step artisan pleating secrets
                  </p>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <button
                    type="button"
                    onClick={onOpenDrapeGuide}
                    className="px-4 py-2 bg-[#c5a059] text-black text-xs font-bold uppercase tracking-wider rounded-lg hover:bg-[#d4b476] flex items-center gap-1.5 cursor-pointer shadow-sm transition-all"
                  >
                    <span>View Drape Guide</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Right: Saree Specifications, Blouse Customizer & Add To Bag */}
            <div className="lg:col-span-6 space-y-6">
              
              {/* Title & Price */}
              <div>
                <h2 className="font-serif text-xl sm:text-2xl font-light text-white">
                  {saree.name}
                </h2>
                <p className="text-xs text-[#a1a1aa] mt-1 font-light">
                  {saree.subtitle}
                </p>

                <div className="flex items-center gap-3 mt-3">
                  <div className="flex items-center gap-1 bg-[#171717] px-2 py-1 rounded text-xs font-bold text-white border border-[#262626]">
                    <Star className="w-3.5 h-3.5 fill-[#c5a059] text-[#c5a059]" />
                    <span>{saree.rating}</span>
                  </div>
                  <span className="text-xs text-[#71717a]">({saree.reviewsCount} verified reviews)</span>
                  <span className="text-xs text-[#333333]">•</span>
                  <span className="text-xs font-medium text-[#4ade80] flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    {saree.weaveDays} Days on Traditional Loom
                  </span>
                </div>

                <div className="flex items-baseline gap-3 mt-4 pt-3 border-t border-[#262626]">
                  <span className="text-2xl font-mono font-medium text-white">
                    {formatPrice(totalItemPrice, currency)}
                  </span>
                  {saree.originalPrice > saree.price && (
                    <span className="text-sm font-mono text-[#71717a] line-through">
                      {formatPrice(saree.originalPrice, currency)}
                    </span>
                  )}
                  {discount > 0 && (
                    <span className="bg-[#1a1a1a] text-[#c5a059] border border-[#333333] text-xs font-mono font-bold px-2 py-0.5 rounded">
                      Save {discount}%
                    </span>
                  )}
                </div>
              </div>

              {/* Navigation Tabs (Details, Story, Reviews) */}
              <div className="flex border-b border-[#262626] gap-4 text-xs font-semibold uppercase tracking-wider">
                <button
                  onClick={() => setActiveTab('details')}
                  className={`pb-2 transition-all cursor-pointer ${
                    activeTab === 'details'
                      ? 'border-b-2 border-[#c5a059] text-[#c5a059]'
                      : 'text-[#71717a] hover:text-[#e5e5e5]'
                  }`}
                >
                  Saree Details
                </button>
                <button
                  onClick={() => setActiveTab('artisan')}
                  className={`pb-2 transition-all cursor-pointer ${
                    activeTab === 'artisan'
                      ? 'border-b-2 border-[#c5a059] text-[#c5a059]'
                      : 'text-[#71717a] hover:text-[#e5e5e5]'
                  }`}
                >
                  Weaving Story
                </button>
                <button
                  onClick={() => setActiveTab('reviews')}
                  className={`pb-2 transition-all cursor-pointer ${
                    activeTab === 'reviews'
                      ? 'border-b-2 border-[#c5a059] text-[#c5a059]'
                      : 'text-[#71717a] hover:text-[#e5e5e5]'
                  }`}
                >
                  Reviews ({sareeReviews.length})
                </button>
              </div>

              {/* Tab Content */}
              {activeTab === 'details' && (
                <div className="space-y-3 text-xs">
                  <div className="grid grid-cols-2 gap-2.5">
                    <div className="p-2.5 bg-[#121212] rounded-xl border border-[#262626]">
                      <span className="text-[#71717a] block text-[10px] uppercase tracking-wider font-medium">Silk Purity</span>
                      <span className="font-medium text-[#e5e5e5]">{saree.silkPurity}</span>
                    </div>
                    <div className="p-2.5 bg-[#121212] rounded-xl border border-[#262626]">
                      <span className="text-[#71717a] block text-[10px] uppercase tracking-wider font-medium">Zari Composition</span>
                      <span className="font-medium text-[#e5e5e5]">{saree.zariType}</span>
                    </div>
                    <div className="p-2.5 bg-[#121212] rounded-xl border border-[#262626]">
                      <span className="text-[#71717a] block text-[10px] uppercase tracking-wider font-medium">Dimensions</span>
                      <span className="font-medium text-[#e5e5e5]">{saree.length}</span>
                    </div>
                    <div className="p-2.5 bg-[#121212] rounded-xl border border-[#262626] flex flex-col justify-between">
                      <div>
                        <span className="text-[#71717a] block text-[10px] uppercase tracking-wider font-medium">Care Recommendation</span>
                        <span className="font-medium text-[#e5e5e5] text-xs">{saree.care}</span>
                      </div>
                      {onOpenSilkCare && (
                        <button
                          type="button"
                          onClick={onOpenSilkCare}
                          className="text-[10px] text-[#c5a059] hover:text-[#e8c87c] font-medium transition-colors text-left pt-1 flex items-center gap-1 cursor-pointer"
                        >
                          <span>Full Silk & Zari Care Codex</span>
                          <Sparkles className="w-2.5 h-2.5" />
                        </button>
                      )}
                    </div>
                  </div>
                  <p className="text-[#a1a1aa] leading-relaxed pt-1 font-light">{saree.description}</p>
                </div>
              )}

              {activeTab === 'artisan' && (
                <div className="p-4 bg-[#121212] rounded-xl border border-[#262626] space-y-2 text-xs text-[#a1a1aa]">
                  <h4 className="font-serif font-light text-white text-sm">Ancestral Loom Heritage</h4>
                  <p className="leading-relaxed font-light">{saree.story}</p>
                  <p className="text-[11px] text-[#c5a059] font-medium pt-1">
                    ✓ Fair wages verified • Zero synthetic adulteration • Preserving indigenous looms
                  </p>
                </div>
              )}

              {activeTab === 'reviews' && (
                <div className="space-y-3 max-h-48 overflow-y-auto pr-1">
                  {sareeReviews.length === 0 ? (
                    <div className="text-xs text-[#71717a] p-3 bg-[#121212] rounded-lg text-center border border-[#262626]">
                      No customer reviews yet. Be the first to drape this masterpiece!
                    </div>
                  ) : (
                    sareeReviews.map((rev) => (
                      <div key={rev.id} className="p-3 bg-[#121212] rounded-xl border border-[#262626] space-y-1">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-1.5">
                            <span className="font-medium text-white text-xs">{rev.userName}</span>
                            <span className="text-[9px] text-[#4ade80] bg-[#14532d]/40 border border-[#22c55e]/30 px-1.5 py-0.5 rounded font-mono">Verified Buyer</span>
                          </div>
                          <span className="text-[10px] text-[#71717a]">{rev.date}</span>
                        </div>
                        <p className="text-xs font-semibold text-[#c5a059]">{rev.title}</p>
                        <p className="text-xs text-[#a1a1aa] leading-relaxed font-light">{rev.comment}</p>
                        <p className="text-[10px] text-[#71717a]">Draped for: {rev.drapedFor} • {rev.userCity}</p>
                      </div>
                    ))
                  )}
                </div>
              )}

              {/* Blouse Stitching Studio Customizer */}
              <div className="space-y-3 pt-3 border-t border-[#262626]">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold uppercase tracking-wider text-white flex items-center gap-1.5">
                    <Scissors className="w-3.5 h-3.5 text-[#c5a059]" />
                    <span>Blouse Tailoring & Styling Studio</span>
                  </label>
                  <span className="text-[11px] text-[#71717a]">Custom fit to your measurements</span>
                </div>

                <div className="space-y-2">
                  {BLOUSE_STITCHING_OPTIONS.map((opt) => (
                    <div
                      key={opt.id}
                      onClick={() => setSelectedBlouse(opt)}
                      className={`p-3 rounded-xl border transition-all cursor-pointer flex items-center justify-between gap-3 ${
                        selectedBlouse.id === opt.id
                          ? 'border-[#c5a059] bg-[#171717] shadow-xs'
                          : 'border-[#262626] bg-[#121212] hover:bg-[#1a1a1a]'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                          selectedBlouse.id === opt.id ? 'border-[#c5a059] bg-[#c5a059]' : 'border-[#444444]'
                        }`}>
                          {selectedBlouse.id === opt.id && <div className="w-1.5 h-1.5 rounded-full bg-black" />}
                        </div>
                        <div>
                          <p className="text-xs font-medium text-white">{opt.name}</p>
                          <p className="text-[11px] text-[#71717a]">{opt.neckline}</p>
                        </div>
                      </div>

                      <div className="text-right shrink-0">
                        <span className="text-xs font-mono font-bold text-[#c5a059]">
                          {opt.price === 0 ? 'FREE' : `+${formatPrice(opt.price, currency)}`}
                        </span>
                        {opt.estimatedDays > 0 && (
                          <span className="block text-[10px] text-[#71717a]">+{opt.estimatedDays} days</span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Bust Size Selector if Stitched Blouse Chosen */}
                {selectedBlouse.id !== 'unstitched' && (
                  <div className="p-3 bg-[#121212] rounded-xl border border-[#262626] space-y-2 animate-in fade-in">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-semibold text-white flex items-center gap-1">
                        <Ruler className="w-3.5 h-3.5 text-[#c5a059]" />
                        Select Bust Size
                      </span>
                      <span className="text-[11px] text-[#71717a]">Includes 2-inch inner margin</span>
                    </div>
                    <div className="grid grid-cols-4 gap-2">
                      {['32" (XS)', '34" (Small)', '36" (Medium)', '38" (Large)', '40" (XL)', '42" (2XL)', '44" (3XL)', 'Custom'].map((size) => (
                        <button
                          key={size}
                          onClick={() => setSelectedBustSize(size)}
                          className={`py-1.5 text-xs font-medium rounded-lg border transition-all cursor-pointer ${
                            selectedBustSize === size
                              ? 'bg-[#c5a059] text-black border-[#c5a059] font-bold'
                              : 'bg-[#171717] text-[#a1a1aa] border-[#262626] hover:text-white hover:bg-[#1f1f1f]'
                          }`}
                        >
                          {size}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Complimentary Add-ons */}
              <div className="space-y-2 pt-2 border-t border-[#262626]">
                <label className="flex items-center justify-between p-2.5 bg-[#121212] rounded-xl border border-[#262626] cursor-pointer">
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={includeFallPico}
                      onChange={(e) => setIncludeFallPico(e.target.checked)}
                      className="accent-[#c5a059] w-4 h-4"
                    />
                    <div>
                      <span className="text-xs font-medium text-white block">Complimentary Fall & Pico Hemming</span>
                      <span className="text-[10px] text-[#71717a]">Ready-to-wear hem finishing on cotton border</span>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-[#4ade80]">FREE (₹0)</span>
                </label>

                <label className="flex items-center justify-between p-2.5 bg-[#121212] rounded-xl border border-[#262626] cursor-pointer">
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={includeGiftWrap}
                      onChange={(e) => setIncludeGiftWrap(e.target.checked)}
                      className="accent-[#c5a059] w-4 h-4"
                    />
                    <div className="flex items-center gap-1.5">
                      <Gift className="w-3.5 h-3.5 text-[#c5a059]" />
                      <div>
                        <span className="text-xs font-medium text-white block">Heritage Box & Wax-Sealed Greeting Card</span>
                        <span className="text-[10px] text-[#71717a]">Handmade unbleached box with golden ribbon</span>
                      </div>
                    </div>
                  </div>
                  <span className="text-xs font-mono font-bold text-[#c5a059]">+{formatPrice(250, currency)}</span>
                </label>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 pt-3">
                <button
                  id="modal-add-to-cart-btn"
                  onClick={() => {
                    onAddToCartWithOptions(saree, selectedBlouse, selectedBustSize, includeFallPico, includeGiftWrap);
                    onClose();
                  }}
                  className="flex-1 py-3.5 px-4 bg-[#141414] hover:bg-[#1f1f1f] border border-[#c5a059] text-[#c5a059] rounded-xl font-bold uppercase tracking-wider text-xs transition-all shadow-xs flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Check className="w-4 h-4" />
                  <span>Add to Bag ({formatPrice(totalItemPrice, currency)})</span>
                </button>

                <button
                  id="modal-buy-now-btn"
                  onClick={() => {
                    onBuyNow(saree, selectedBlouse, selectedBustSize, includeFallPico, includeGiftWrap);
                    onClose();
                  }}
                  className="flex-1 py-3.5 px-4 bg-[#c5a059] hover:bg-[#d4b476] text-black rounded-xl font-bold uppercase tracking-wider text-xs transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Instant Checkout</span>
                </button>
              </div>

            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
