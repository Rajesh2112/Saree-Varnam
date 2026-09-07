import React, { useState } from 'react';
import { 
  X, 
  ShoppingBag, 
  Trash2, 
  Plus, 
  Minus, 
  ShieldCheck, 
  ArrowRight, 
  Sparkles, 
  Scissors, 
  Gift, 
  Tag, 
  PenLine, 
  Check, 
  Heart, 
  Eye, 
  EyeOff, 
  Crown 
} from 'lucide-react';
import { CartItem, Currency } from '../types';
import { formatPrice } from '../utils/formatters';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  currency: Currency;
  onUpdateQuantity: (cartId: string, quantity: number) => void;
  onRemoveItem: (cartId: string) => void;
  onCheckout: (promo?: string | null) => void;
  onToggleGiftWrap?: (cartId: string, giftWrap: boolean) => void;
  onUpdateGiftNote?: (cartId: string, giftNote: string) => void;
}

const GIFT_NOTE_PRESETS = [
  'Wishing you timeless grace and radiance on your special day!',
  'May this pure handloom weave bring blessings, joy, and celebration.',
  'To my beloved, with all my heart and eternal admiration.',
  'Happy Anniversary! Draping you in pure heritage silk.'
];

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cartItems,
  currency,
  onUpdateQuantity,
  onRemoveItem,
  onCheckout,
  onToggleGiftWrap,
  onUpdateGiftNote
}) => {
  if (!isOpen) return null;

  const [promoCode, setPromoCode] = useState('');
  const [appliedPromo, setAppliedPromo] = useState<string | null>(null);
  const [promoError, setPromoError] = useState<string | null>(null);
  const [previewCardCartId, setPreviewCardCartId] = useState<string | null>(null);

  // Local state map for gift notes to ensure smooth typing
  const [localNotes, setLocalNotes] = useState<Record<string, string>>(() => {
    const initial: Record<string, string> = {};
    cartItems.forEach((item) => {
      if (item.giftNote) initial[item.cartId] = item.giftNote;
    });
    return initial;
  });

  const isItemGiftWrapped = (item: CartItem) => Boolean(item.giftWrap);

  const subtotal = cartItems.reduce((acc, item) => {
    const isGift = isItemGiftWrapped(item);
    const itemUnitTotal = item.saree.price + item.blouseOption.price + (isGift ? 250 : 0);
    return acc + (itemUnitTotal * item.quantity);
  }, 0);

  const discountAmount = appliedPromo === 'UTSAV20' ? Math.round(subtotal * 0.2) : 0;
  const shipping = subtotal > 15000 || cartItems.length === 0 ? 0 : 500;
  const grandTotal = Math.max(0, subtotal - discountAmount + shipping);

  const handleApplyPromo = () => {
    if (promoCode.trim().toUpperCase() === 'UTSAV20') {
      setAppliedPromo('UTSAV20');
      setPromoError(null);
    } else {
      setPromoError('Invalid coupon. Use UTSAV20 for 20% off');
    }
  };

  const handleNoteChange = (cartId: string, text: string) => {
    if (text.length > 250) return;
    setLocalNotes((prev) => ({ ...prev, [cartId]: text }));
    if (onUpdateGiftNote) {
      onUpdateGiftNote(cartId, text);
    }
  };

  const handleApplyPreset = (cartId: string, preset: string) => {
    setLocalNotes((prev) => ({ ...prev, [cartId]: preset }));
    if (onUpdateGiftNote) {
      onUpdateGiftNote(cartId, preset);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/80 backdrop-blur-sm flex justify-end animate-in fade-in">
      <div 
        id="cart-drawer-panel"
        className="w-full max-w-lg bg-[#0d0d0d] h-full shadow-2xl flex flex-col justify-between border-l border-[#262626] animate-in slide-in-from-right duration-300"
      >
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-[#262626] flex items-center justify-between bg-[#0a0a0a] shrink-0">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-[#c5a059]" />
            <h3 className="font-serif text-lg font-light text-white tracking-wide">Shopping Bag</h3>
            <span className="bg-[#1a1a1a] text-[#c5a059] border border-[#333333] text-xs font-mono font-bold px-2 py-0.5 rounded-full">
              {cartItems.reduce((acc, item) => acc + item.quantity, 0)}
            </span>
          </div>

          <button 
            id="close-cart-drawer"
            onClick={onClose}
            className="p-2 rounded-full hover:bg-[#1a1a1a] text-[#a1a1aa] hover:text-white transition-colors cursor-pointer"
            aria-label="Close Shopping Bag"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Free Shipping Progress Indicator */}
        <div className="bg-[#121212] px-4 py-2.5 border-b border-[#262626] shrink-0">
          {subtotal >= 15000 ? (
            <p className="text-xs font-medium text-[#4ade80] flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              You unlocked Complimentary Atelier Express Shipping!
            </p>
          ) : (
            <div>
              <p className="text-xs text-[#a1a1aa]">
                Add <span className="font-mono font-bold text-[#c5a059]">{formatPrice(15000 - subtotal, currency)}</span> more for Free Worldwide Shipping
              </p>
              <div className="w-full bg-[#1f1f1f] h-1 rounded-full mt-1.5 overflow-hidden">
                <div 
                  className="bg-[#c5a059] h-full transition-all duration-300"
                  style={{ width: `${Math.min(100, (subtotal / 15000) * 100)}%` }}
                />
              </div>
            </div>
          )}
        </div>

        {/* Cart Item List */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4">
          {cartItems.length === 0 ? (
            <div className="py-16 text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-[#171717] border border-[#262626] flex items-center justify-center mx-auto text-[#c5a059]">
                <ShoppingBag className="w-8 h-8 opacity-60" />
              </div>
              <div>
                <p className="font-serif text-base font-light text-white">Your shopping bag is empty</p>
                <p className="text-xs text-[#71717a] mt-1 max-w-xs mx-auto">
                  Explore our pure Kanjivaram and Banarasi weaves to add pure grace to your wardrobe.
                </p>
              </div>
              <button
                onClick={onClose}
                className="px-5 py-2.5 bg-[#c5a059] text-black text-xs font-bold uppercase tracking-wider rounded-xl hover:bg-[#d4b476] cursor-pointer"
              >
                Discover Sarees
              </button>
            </div>
          ) : (
            cartItems.map((item) => {
              const isGift = isItemGiftWrapped(item);
              const itemTotal = (item.saree.price + item.blouseOption.price + (isGift ? 250 : 0)) * item.quantity;
              const currentNote = localNotes[item.cartId] ?? item.giftNote ?? '';
              const isPreviewingCard = previewCardCartId === item.cartId;

              return (
                <div 
                  key={item.cartId}
                  className={`p-4 bg-[#121212] rounded-2xl border transition-all space-y-3.5 relative group ${
                    isGift ? 'border-[#c5a059]/50 shadow-md bg-gradient-to-b from-[#141414] to-[#101010]' : 'border-[#262626]'
                  }`}
                >
                  <div className="flex gap-3.5">
                    <img
                      src={item.saree.images[0]}
                      alt={item.saree.name}
                      referrerPolicy="no-referrer"
                      className="w-20 aspect-[3/4] object-cover rounded-xl border border-[#262626] shrink-0 shadow-sm"
                    />

                    <div className="flex-1 min-w-0 space-y-1">
                      <div className="flex justify-between items-start">
                        <h4 className="font-serif text-xs sm:text-sm font-medium text-white line-clamp-1 pr-2">
                          {item.saree.name}
                        </h4>
                        <button
                          onClick={() => onRemoveItem(item.cartId)}
                          className="text-[#71717a] hover:text-[#f87171] transition-colors p-1"
                          title="Remove item"
                          aria-label={`Remove ${item.saree.name}`}
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <p className="text-[10px] text-[#c5a059] uppercase tracking-wider">
                        {item.saree.fabric} • {item.saree.originRegion.split(',')[0]}
                      </p>

                      {/* Blouse & Options Pills */}
                      <div className="space-y-0.5 pt-1 text-[11px] text-[#a1a1aa]">
                        <p className="flex items-center gap-1">
                          <Scissors className="w-3 h-3 text-[#c5a059]" />
                          <span>{item.blouseOption.name.split('(')[0]} ({item.bustSize || item.customBustSize || 'Standard'})</span>
                        </p>
                        {(item.fallPico ?? item.includeFallPico) && (
                          <span className="inline-block text-[9px] text-[#4ade80]">
                            ✓ Complimentary Fall & Pico Hemmed
                          </span>
                        )}
                      </div>

                      {/* Price & Quantity Adjuster */}
                      <div className="flex items-center justify-between pt-2">
                        <span className="font-mono text-xs font-bold text-white">
                          {formatPrice(itemTotal, currency)}
                        </span>

                        <div className="flex items-center border border-[#262626] rounded-lg bg-[#171717]">
                          <button
                            onClick={() => onUpdateQuantity(item.cartId, item.quantity - 1)}
                            className="p-1 text-[#a1a1aa] hover:text-white hover:bg-[#262626] rounded-l cursor-pointer"
                            aria-label="Decrease quantity"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="px-2.5 text-xs font-mono font-medium text-white">{item.quantity}</span>
                          <button
                            onClick={() => onUpdateQuantity(item.cartId, item.quantity + 1)}
                            className="p-1 text-[#a1a1aa] hover:text-white hover:bg-[#262626] rounded-r cursor-pointer"
                            aria-label="Increase quantity"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Gift Wrap Toggle Section */}
                  <div className="pt-2 border-t border-[#1f1f1f]">
                    <div className="flex items-center justify-between">
                      <label className="flex items-center gap-2 cursor-pointer select-none">
                        <input
                          type="checkbox"
                          checked={isGift}
                          onChange={(e) => {
                            if (onToggleGiftWrap) {
                              onToggleGiftWrap(item.cartId, e.target.checked);
                            }
                          }}
                          className="accent-[#c5a059] w-4 h-4 rounded cursor-pointer"
                        />
                        <div className="flex items-center gap-1.5">
                          <Gift className={`w-3.5 h-3.5 ${isGift ? 'text-[#c5a059]' : 'text-[#71717a]'}`} />
                          <span className={`text-xs font-medium ${isGift ? 'text-[#e5e5e5]' : 'text-[#a1a1aa]'}`}>
                            Heritage Gift Wrap & Wax Seal Card
                          </span>
                        </div>
                      </label>
                      <span className="text-[11px] font-mono font-medium text-[#c5a059]">
                        +{formatPrice(250, currency)}
                      </span>
                    </div>

                    {/* OPTIONAL PERSONALIZED GIFT NOTE TEXT AREA (Shown when Gift Wrap is active) */}
                    {isGift && (
                      <div className="mt-3 p-3.5 bg-[#171717] rounded-xl border border-[#c5a059]/30 space-y-2.5 animate-in fade-in slide-in-from-top-2 duration-200">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-1.5 text-white">
                            <PenLine className="w-3.5 h-3.5 text-[#c5a059]" />
                            <label 
                              htmlFor={`gift-note-${item.cartId}`}
                              className="text-xs font-medium font-serif tracking-wide text-[#e8c87c]"
                            >
                              Personalized Gift Note (Optional)
                            </label>
                          </div>

                          <div className="flex items-center gap-2">
                            <span className="text-[10px] font-mono text-[#71717a]">
                              {currentNote.length}/250
                            </span>
                            {currentNote.trim() && (
                              <button
                                type="button"
                                onClick={() => setPreviewCardCartId(isPreviewingCard ? null : item.cartId)}
                                className="text-[10px] text-[#c5a059] hover:text-[#e8c87c] flex items-center gap-1 cursor-pointer transition-colors"
                              >
                                {isPreviewingCard ? <EyeOff className="w-3 h-3" /> : <Eye className="w-3 h-3" />}
                                <span>{isPreviewingCard ? 'Hide Card' : 'Preview Card'}</span>
                              </button>
                            )}
                          </div>
                        </div>

                        <p className="text-[10px] text-[#a1a1aa] font-light leading-relaxed">
                          Our artisan scribe will handwrite this message in gold ink on unbleached, botanical seed paper sealed with royal lacquer.
                        </p>

                        {/* Preset Quick Inspiration Buttons */}
                        <div className="flex flex-wrap gap-1.5 pt-0.5">
                          {GIFT_NOTE_PRESETS.map((preset, idx) => (
                            <button
                              key={idx}
                              type="button"
                              onClick={() => handleApplyPreset(item.cartId, preset)}
                              className="text-[10px] px-2 py-1 bg-[#212121] hover:bg-[#2a2a2a] text-[#d4d4d8] hover:text-[#c5a059] border border-[#333333] hover:border-[#c5a059]/40 rounded-md transition-all cursor-pointer truncate max-w-[200px]"
                              title={preset}
                            >
                              {preset}
                            </button>
                          ))}
                        </div>

                        {/* Text Area */}
                        <div className="relative">
                          <textarea
                            id={`gift-note-${item.cartId}`}
                            rows={3}
                            maxLength={250}
                            value={currentNote}
                            onChange={(e) => handleNoteChange(item.cartId, e.target.value)}
                            placeholder="E.g., Dearest Ananya, May this Kanjivaram silk bring immense happiness and auspicious beginnings to your wedding! With love, Dev & Mira..."
                            className="w-full bg-[#111111] border border-[#333333] focus:border-[#c5a059] rounded-lg p-2.5 text-xs text-[#e5e5e5] placeholder-[#52525b] focus:outline-none transition-colors resize-none leading-relaxed"
                          />
                        </div>

                        {/* Simulated Wax-Sealed Parchment Card Live Preview */}
                        {isPreviewingCard && currentNote.trim() && (
                          <div className="p-3 bg-[#1c1917] border border-[#c5a059]/60 rounded-xl space-y-2 animate-in zoom-in-95 shadow-inner">
                            <div className="flex items-center justify-between text-[10px] border-b border-[#c5a059]/30 pb-1 text-[#c5a059]">
                              <span className="font-serif italic flex items-center gap-1">
                                <Crown className="w-3 h-3" /> Varnam Calligraphy Parchment Card
                              </span>
                              <span className="bg-[#c5a059]/20 px-1.5 py-0.5 rounded text-[9px] font-mono">
                                Wax-Sealed
                              </span>
                            </div>
                            <p className="font-serif italic text-xs text-[#fef08a] leading-relaxed px-1 whitespace-pre-wrap">
                              "{currentNote}"
                            </p>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer with Promo & Order Summary */}
        {cartItems.length > 0 && (
          <div className="p-4 sm:p-5 border-t border-[#262626] bg-[#0a0a0a] space-y-4 shrink-0">
            
            {/* Promo Code Input */}
            <div className="space-y-1">
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <Tag className="w-3.5 h-3.5 text-[#71717a] absolute left-3 top-2.5" />
                  <input
                    type="text"
                    placeholder="Coupon: UTSAV20"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    className="w-full bg-[#121212] border border-[#262626] rounded-xl pl-8 pr-3 py-1.5 text-xs uppercase font-mono text-[#e5e5e5] placeholder-[#71717a] focus:outline-none focus:border-[#c5a059]"
                  />
                </div>
                <button
                  onClick={handleApplyPromo}
                  className="px-3.5 py-1.5 bg-[#171717] hover:bg-[#262626] text-[#c5a059] text-xs font-bold uppercase tracking-wider rounded-xl border border-[#333333] transition-colors cursor-pointer"
                >
                  Apply
                </button>
              </div>

              {appliedPromo && (
                <p className="text-[11px] text-[#4ade80] flex items-center gap-1 pt-0.5">
                  ✓ 20% Festive discount code applied!
                </p>
              )}
              {promoError && (
                <p className="text-[11px] text-[#f87171]">{promoError}</p>
              )}
            </div>

            {/* Calculations Breakdown */}
            <div className="space-y-1.5 text-xs border-t border-[#1f1f1f] pt-3 text-[#a1a1aa]">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-mono text-white">{formatPrice(subtotal, currency)}</span>
              </div>
              {discountAmount > 0 && (
                <div className="flex justify-between text-[#4ade80]">
                  <span>Festive Discount (20%)</span>
                  <span className="font-mono">-{formatPrice(discountAmount, currency)}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Shipping</span>
                <span className="font-mono text-white">
                  {shipping === 0 ? <strong className="text-[#4ade80]">FREE</strong> : formatPrice(shipping, currency)}
                </span>
              </div>
              <div className="flex justify-between pt-2 border-t border-[#262626] font-bold text-sm text-white">
                <span className="font-serif">Grand Total</span>
                <span className="font-mono text-base text-[#c5a059]">{formatPrice(grandTotal, currency)}</span>
              </div>
            </div>

            {/* Checkout Button */}
            <button
              id="cart-checkout-button"
              onClick={() => onCheckout(appliedPromo)}
              className="w-full py-3.5 bg-[#c5a059] hover:bg-[#d4b476] text-black text-xs font-bold uppercase tracking-[0.15em] rounded-xl flex items-center justify-center gap-2 transition-all cursor-pointer shadow-lg"
            >
              <span>Proceed to Atelier Checkout</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <p className="text-[10px] text-center text-[#71717a] flex items-center justify-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-[#c5a059]" />
              256-bit Encrypted Checkout • Silk Mark Guarantee
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
