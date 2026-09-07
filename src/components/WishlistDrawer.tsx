import React from 'react';
import { X, Heart, ShoppingBag, Trash2 } from 'lucide-react';
import { Saree, Currency } from '../types';
import { formatPrice } from '../utils/formatters';

interface WishlistDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  wishlist: Saree[];
  currency: Currency;
  onRemoveFromWishlist: (sareeId: string) => void;
  onMoveToBag: (saree: Saree) => void;
  onQuickView: (saree: Saree) => void;
}

export const WishlistDrawer: React.FC<WishlistDrawerProps> = ({
  isOpen,
  onClose,
  wishlist,
  currency,
  onRemoveFromWishlist,
  onMoveToBag,
  onQuickView
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/80 backdrop-blur-sm flex justify-end animate-in fade-in">
      <div 
        id="wishlist-drawer-panel"
        className="w-full max-w-md bg-[#0d0d0d] h-full shadow-2xl flex flex-col justify-between border-l border-[#262626] animate-in slide-in-from-right duration-300"
      >
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-[#262626] flex items-center justify-between bg-[#0a0a0a]">
          <div className="flex items-center gap-2">
            <Heart className="w-5 h-5 fill-[#c5a059] text-[#c5a059]" />
            <h3 className="font-serif text-lg font-light text-white tracking-wide">Saved Sarees</h3>
            <span className="bg-[#1a1a1a] text-[#c5a059] border border-[#333333] text-xs font-mono font-bold px-2 py-0.5 rounded-full">
              {wishlist.length}
            </span>
          </div>

          <button 
            id="close-wishlist-drawer"
            onClick={onClose}
            className="p-2 rounded-full hover:bg-[#1a1a1a] text-[#a1a1aa] hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* List */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4">
          {wishlist.length === 0 ? (
            <div className="py-16 text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-[#171717] border border-[#262626] flex items-center justify-center mx-auto text-[#c5a059]">
                <Heart className="w-8 h-8 opacity-60" />
              </div>
              <div>
                <p className="font-serif text-base font-light text-white">No saved sarees yet</p>
                <p className="text-xs text-[#71717a] mt-1 max-w-xs mx-auto">
                  Click the heart icon on any saree card to save it to your personal bridal or festive wishlist.
                </p>
              </div>
              <button
                onClick={onClose}
                className="px-5 py-2.5 bg-[#c5a059] text-black text-xs font-bold uppercase tracking-wider rounded-xl hover:bg-[#d4b476] cursor-pointer"
              >
                Discover Handloom Sarees
              </button>
            </div>
          ) : (
            wishlist.map((saree) => (
              <div 
                key={saree.id}
                className="p-3.5 bg-[#121212] rounded-2xl border border-[#262626] flex gap-3.5 relative group"
              >
                <img
                  src={saree.images[0]}
                  alt={saree.name}
                  referrerPolicy="no-referrer"
                  onClick={() => {
                    onClose();
                    onQuickView(saree);
                  }}
                  className="w-20 aspect-[3/4] object-cover rounded-xl border border-[#262626] shrink-0 cursor-pointer"
                />

                <div className="flex-1 min-w-0 space-y-1">
                  <div className="flex justify-between items-start">
                    <h4 
                      onClick={() => {
                        onClose();
                        onQuickView(saree);
                      }}
                      className="font-serif text-xs font-medium text-white line-clamp-1 pr-4 cursor-pointer hover:text-[#c5a059]"
                    >
                      {saree.name}
                    </h4>
                    <button
                      onClick={() => onRemoveFromWishlist(saree.id)}
                      className="text-[#71717a] hover:text-[#c5a059] transition-colors p-1"
                      title="Remove from Wishlist"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <p className="text-[10px] text-[#c5a059] uppercase tracking-wider">
                    {saree.fabric} • {saree.originRegion.split(',')[0]}
                  </p>

                  <p className="text-xs font-mono font-bold text-white">
                    {formatPrice(saree.price, currency)}
                  </p>

                  <div className="pt-2">
                    <button
                      onClick={() => {
                        onMoveToBag(saree);
                        onRemoveFromWishlist(saree.id);
                      }}
                      className="w-full py-1.5 px-3 bg-[#c5a059] hover:bg-[#d4b476] text-black text-xs font-bold uppercase tracking-wider rounded-lg flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <ShoppingBag className="w-3.5 h-3.5" />
                      <span>Move to Bag</span>
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {wishlist.length > 0 && (
          <div className="p-4 border-t border-[#262626] bg-[#0a0a0a]">
            <button
              onClick={() => {
                wishlist.forEach(s => onMoveToBag(s));
                onClose();
              }}
              className="w-full py-3 bg-[#171717] border border-[#c5a059] hover:bg-[#c5a059]/10 text-[#c5a059] text-xs font-bold uppercase tracking-wider rounded-xl transition-all cursor-pointer shadow-xs"
            >
              Move All ({wishlist.length}) Sarees to Bag
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
