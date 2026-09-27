import React, { useState } from 'react';
import { Heart, Eye, ShoppingBag, Star, Check } from 'lucide-react';
import { Saree, Currency } from '../types';
import { formatPrice, calculateDiscount } from '../utils/formatters';

interface SareeCardProps {
  saree: Saree;
  currency: Currency;
  isWishlisted: boolean;
  onToggleWishlist: (saree: Saree) => void;
  onQuickView: (saree: Saree) => void;
  onAddToCart: (saree: Saree) => void;
}

export const SareeCard: React.FC<SareeCardProps> = ({
  saree,
  currency,
  isWishlisted,
  onToggleWishlist,
  onQuickView,
  onAddToCart
}) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isAdded, setIsAdded] = useState(false);
  const discount = calculateDiscount(saree.originalPrice, saree.price);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    onAddToCart(saree);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 1800);
  };

  return (
    <div 
      id={`saree-card-${saree.id}`}
      onClick={() => onQuickView(saree)}
      className="group relative bg-[#0d0d0d] rounded-2xl border border-[#262626] hover:border-[#c5a059]/70 shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col overflow-hidden cursor-pointer"
    >
      {/* Top Image Container */}
      <div 
        className="relative aspect-[3/4] w-full overflow-hidden bg-[#141414]"
        onMouseEnter={() => saree.images.length > 1 && setCurrentImageIndex(1)}
        onMouseLeave={() => setCurrentImageIndex(0)}
      >
        <img
          src={saree.images[currentImageIndex] || saree.images[0]}
          alt={saree.name}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105 opacity-90 group-hover:opacity-100"
        />

        {/* Top Badges */}
        <div className="absolute top-2.5 left-2.5 flex flex-col gap-1 z-10">
          {saree.badge && (
            <span className={`text-[9px] font-bold px-2.5 py-0.5 rounded shadow-sm uppercase tracking-[0.2em] ${
              saree.badge === 'Silk Mark Certified'
                ? 'bg-[#0a0a0a]/90 text-[#4ade80] border border-[#22c55e]/40 backdrop-blur-xs'
                : saree.badge === 'Bestseller'
                ? 'bg-[#c5a059] text-black font-extrabold'
                : saree.badge === 'Masterpiece'
                ? 'bg-[#1a1a1a]/95 text-[#c5a059] border border-[#c5a059]/60 backdrop-blur-xs'
                : 'bg-[#1f1f1f] text-[#d4b476] border border-[#333333]'
            }`}>
              {saree.badge}
            </span>
          )}
          {discount > 0 && (
            <span className="bg-[#0a0a0a]/90 text-[#c5a059] border border-[#333333] text-[9px] font-mono font-bold px-1.5 py-0.5 rounded shadow-xs w-fit">
              {discount}% OFF
            </span>
          )}
        </div>

        {/* Wishlist Button */}
        <button
          id={`wishlist-btn-${saree.id}`}
          onClick={(e) => {
            e.stopPropagation();
            onToggleWishlist(saree);
          }}
          className="absolute top-2.5 right-2.5 p-2 rounded-full bg-[#0a0a0a]/80 hover:bg-[#1a1a1a] text-[#a1a1aa] hover:text-[#c5a059] border border-[#262626] shadow-sm transition-all z-10 cursor-pointer"
          title={isWishlisted ? "Remove from Wishlist" : "Add to Wishlist"}
        >
          <Heart className={`w-4 h-4 transition-colors ${isWishlisted ? 'fill-[#c5a059] text-[#c5a059]' : ''}`} />
        </button>

        {/* Hover Quick View Button */}
        <div className="absolute inset-x-3 bottom-3 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 hidden sm:flex gap-2 z-10">
          <button
            id={`quick-view-btn-${saree.id}`}
            onClick={(e) => {
              e.stopPropagation();
              onQuickView(saree);
            }}
            className="flex-1 flex items-center justify-center gap-1.5 py-2.5 px-3 bg-[#121212]/95 hover:bg-[#1a1a1a] text-[#e5e5e5] hover:text-[#c5a059] font-medium text-xs uppercase tracking-wider rounded-xl shadow-md border border-[#333333] backdrop-blur-xs transition-colors cursor-pointer"
          >
            <Eye className="w-3.5 h-3.5 text-[#c5a059]" />
            <span>Quick View</span>
          </button>
        </div>
      </div>

      {/* Saree Details */}
      <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
        <div>
          {/* Origin & Fabric */}
          <div className="flex items-center justify-between text-[10px] uppercase tracking-[0.2em] font-medium text-[#c5a059]">
            <span className="truncate">{saree.fabric}</span>
            <span className="text-[#71717a] truncate ml-1">{saree.originRegion.split(',')[0]}</span>
          </div>

          {/* Title */}
          <h3 className="font-serif text-sm sm:text-base font-light text-white line-clamp-1 group-hover:text-[#c5a059] transition-colors mt-1.5">
            {saree.name}
          </h3>

          {/* Subtitle / Key Weave feature */}
          <p className="text-xs text-[#71717a] line-clamp-1 mt-0.5 font-light">
            {saree.subtitle}
          </p>

          {/* Rating and Weave Days */}
          <div className="flex items-center gap-2 mt-2.5">
            <div className="flex items-center gap-1 text-[10px] font-medium text-[#e5e5e5] bg-[#171717] px-2 py-0.5 rounded border border-[#262626]">
              <Star className="w-3 h-3 fill-[#c5a059] text-[#c5a059]" />
              <span>{saree.rating}</span>
            </div>
            <span className="text-[10px] text-[#71717a]">({saree.reviewsCount} reviews)</span>
            <span className="text-[10px] text-[#333333]">•</span>
            <span className="text-[10px] text-[#71717a]">{saree.weaveDays} loom days</span>
          </div>
        </div>

        {/* Price & Action Row */}
        <div className="pt-3 border-t border-[#1f1f1f] flex items-center justify-between gap-2">
          <div>
            <div className="flex items-baseline gap-1.5">
              <span className="text-base sm:text-lg font-mono font-medium text-white">
                {formatPrice(saree.price, currency)}
              </span>
              {saree.originalPrice > saree.price && (
                <span className="text-xs font-mono text-[#71717a] line-through">
                  {formatPrice(saree.originalPrice, currency)}
                </span>
              )}
            </div>
            <span className="text-[10px] text-[#4ade80] font-medium block mt-0.5">
              Free Fall & Pico Hemming
            </span>
          </div>

          <button
            id={`add-to-bag-${saree.id}`}
            onClick={handleAddToCart}
            className={`flex items-center justify-center p-2.5 rounded-xl font-bold text-xs transition-all duration-200 cursor-pointer shadow-xs ${
              isAdded 
                ? 'bg-[#14532d] text-[#4ade80] border border-[#22c55e]/40'
                : 'bg-[#c5a059] hover:bg-[#d4b476] text-black'
            }`}
            title="Add to Shopping Bag"
          >
            {isAdded ? (
              <Check className="w-4 h-4" />
            ) : (
              <ShoppingBag className="w-4 h-4" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
