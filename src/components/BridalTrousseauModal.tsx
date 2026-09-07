import React, { useState, useMemo } from 'react';
import { X, Sparkles, Plus, Check, Trash2, ShoppingBag, Gift, ShieldCheck, Heart, ArrowRight } from 'lucide-react';
import { Saree, Currency, BlouseOption } from '../types';
import { SAREES_DATA, BLOUSE_STITCHING_OPTIONS } from '../data/sareesData';
import { formatPrice } from '../utils/formatters';

interface BridalTrousseauModalProps {
  isOpen: boolean;
  onClose: () => void;
  currency: Currency;
  onAddTrousseauToCart: (items: { saree: Saree; blouse: BlouseOption }[]) => void;
  onSelectSaree: (saree: Saree) => void;
}

interface TrousseauEventSlot {
  id: string;
  title: string;
  subtitle: string;
  iconTag: string;
  recommendedFabric: string;
  saree: Saree | null;
}

export const BridalTrousseauModal: React.FC<BridalTrousseauModalProps> = ({
  isOpen,
  onClose,
  currency,
  onAddTrousseauToCart,
  onSelectSaree
}) => {
  const [brideName, setBrideName] = useState('Devika & Rohan');
  const [isEditingName, setIsEditingName] = useState(false);
  const [activeSlotId, setActiveSlotId] = useState<string | null>(null);

  const initialSlots: TrousseauEventSlot[] = [
    {
      id: 'slot-muhurtham',
      title: '1. Muhurtham Wedding',
      subtitle: 'Sacred Vedic Mantapam',
      iconTag: 'Varmala',
      recommendedFabric: 'Kanjivaram Silk',
      saree: SAREES_DATA.find(s => s.id === 'kanjivaram-1') || null
    },
    {
      id: 'slot-sangeet',
      title: '2. Royal Sangeet & Cocktails',
      subtitle: 'Moonlit Festivities & Dance',
      iconTag: 'Sangeet',
      recommendedFabric: 'Organza / Tissue Silk',
      saree: SAREES_DATA.find(s => s.id === 'organza-1') || null
    },
    {
      id: 'slot-haldi',
      title: '3. Sunlit Haldi & Mehendi',
      subtitle: 'Auspicious Floral Rituals',
      iconTag: 'Haldi',
      recommendedFabric: 'Chanderi / Jamdani',
      saree: SAREES_DATA.find(s => s.id === 'chanderi-1') || null
    },
    {
      id: 'slot-reception',
      title: '4. Grand Reception Gala',
      subtitle: 'Opulent Evening Soirée',
      iconTag: 'Reception',
      recommendedFabric: 'Banarasi Kadhwa Zari',
      saree: SAREES_DATA.find(s => s.id === 'banarasi-1') || null
    },
    {
      id: 'slot-puja',
      title: '5. Griha Pravesh & Temple Puja',
      subtitle: 'Threshold Blessings',
      iconTag: 'Puja',
      recommendedFabric: 'Paithani / Tussar',
      saree: null
    }
  ];

  const [slots, setSlots] = useState<TrousseauEventSlot[]>(initialSlots);

  if (!isOpen) return null;

  const filledSlots = slots.filter(s => s.saree !== null);
  const totalOriginal = filledSlots.reduce((acc, s) => acc + (s.saree?.price || 0), 0);
  const trousseauDiscount = filledSlots.length >= 3 ? Math.round(totalOriginal * 0.15) : 0;
  const grandTotal = totalOriginal - trousseauDiscount;

  const handleRemoveFromSlot = (slotId: string) => {
    setSlots(slots.map(s => s.id === slotId ? { ...s, saree: null } : s));
  };

  const handleAssignSaree = (slotId: string, saree: Saree) => {
    setSlots(slots.map(s => s.id === slotId ? { ...s, saree } : s));
    setActiveSlotId(null);
  };

  const handleAddAllToCart = () => {
    const defaultBlouse = BLOUSE_STITCHING_OPTIONS[1]; // Royal Sweetheart Cut
    const items = filledSlots.map(slot => ({
      saree: slot.saree!,
      blouse: defaultBlouse
    }));
    onAddTrousseauToCart(items);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-5 animate-in fade-in duration-200">
      <div 
        className="relative bg-[#0d0d0d] rounded-3xl max-w-5xl w-full border border-[#c5a059]/40 shadow-2xl overflow-hidden my-auto max-h-[94vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Ornate Velvet & Brass Header */}
        <div className="px-6 py-5 border-b border-[#262626] bg-gradient-to-r from-[#171410] via-[#0d0d0d] to-[#171410] flex items-center justify-between sticky top-0 z-20">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-[10px] uppercase font-bold tracking-[0.25em] text-[#c5a059] bg-[#c5a059]/10 px-2.5 py-0.5 rounded-full border border-[#c5a059]/30">
                Atelier Heritage Service
              </span>
              <span className="text-xs text-[#a1a1aa]">• 5-Occasion Bridal Curation</span>
            </div>
            <div className="flex items-center gap-2">
              <h2 className="font-serif text-xl sm:text-2xl font-light text-white">
                The Royal Bridal Trousseau Trunk
              </h2>
              {isEditingName ? (
                <input
                  type="text"
                  value={brideName}
                  onChange={(e) => setBrideName(e.target.value)}
                  onBlur={() => setIsEditingName(false)}
                  autoFocus
                  className="bg-[#1f1f1f] text-xs text-[#c5a059] border border-[#c5a059] rounded px-2 py-0.5"
                />
              ) : (
                <button
                  onClick={() => setIsEditingName(true)}
                  className="text-xs text-[#c5a059] hover:underline font-serif italic cursor-pointer"
                  title="Click to personalize engraving name"
                >
                  [{brideName}]
                </button>
              )}
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-[#1a1a1a] text-[#a1a1aa] hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="overflow-y-auto p-4 sm:p-6 lg:p-8 space-y-6">
          
          {/* Trousseau Benefits Banner */}
          <div className="p-4 bg-gradient-to-r from-[#1a160f] to-[#121212] border border-[#c5a059]/30 rounded-2xl grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-[#c5a059]/20 border border-[#c5a059]/40 flex items-center justify-center text-[#c5a059] shrink-0">
                <Gift className="w-4 h-4" />
              </div>
              <div>
                <p className="text-xs font-bold text-white">15% Trousseau Privilege</p>
                <p className="text-[11px] text-[#a1a1aa]">Applied automatically on 3+ sarees</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-[#c5a059]/20 border border-[#c5a059]/40 flex items-center justify-center text-[#c5a059] shrink-0">
                <Sparkles className="w-4 h-4" />
              </div>
              <div>
                <p className="text-xs font-bold text-white">Complimentary Brass Trunk</p>
                <p className="text-[11px] text-[#a1a1aa]">Handmade velvet chest with brass nameplate</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-[#c5a059]/20 border border-[#c5a059]/40 flex items-center justify-center text-[#c5a059] shrink-0">
                <ShieldCheck className="w-4 h-4 text-[#4ade80]" />
              </div>
              <div>
                <p className="text-xs font-bold text-white">Silk Mark Authenticity</p>
                <p className="text-[11px] text-[#a1a1aa]">Govt certified 100% pure silk guarantees</p>
              </div>
            </div>
          </div>

          {/* Slots Visual Layout */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-[#c5a059] flex items-center gap-2">
                <span>Curated Wedding Occasions ({filledSlots.length}/5 Selected)</span>
              </h3>
              <span className="text-xs text-[#71717a]">
                Palette Balance: <strong className="text-[#4ade80]">98% Regal Harmony</strong>
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {slots.map((slot) => {
                const saree = slot.saree;

                return (
                  <div
                    key={slot.id}
                    className={`relative rounded-2xl border p-4 transition-all flex flex-col justify-between ${
                      saree
                        ? 'bg-[#121212] border-[#c5a059]/40 shadow-md'
                        : 'bg-[#0d0d0d]/80 border-dashed border-[#333333] hover:border-[#c5a059]/60'
                    }`}
                  >
                    {/* Slot Header */}
                    <div className="flex items-start justify-between gap-2 mb-3">
                      <div>
                        <span className="text-[10px] font-bold uppercase tracking-wider text-[#c5a059] bg-[#1a1a1a] px-2 py-0.5 rounded border border-[#333333]">
                          {slot.iconTag}
                        </span>
                        <h4 className="text-xs font-semibold text-white mt-1">{slot.title}</h4>
                        <p className="text-[10px] text-[#71717a]">{slot.subtitle}</p>
                      </div>

                      {saree && (
                        <button
                          onClick={() => handleRemoveFromSlot(slot.id)}
                          className="text-[#71717a] hover:text-[#ef4444] p-1 transition-colors"
                          title="Remove saree from slot"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>

                    {/* Content */}
                    {saree ? (
                      <div className="space-y-3">
                        <div className="flex gap-3">
                          <img
                            src={saree.images[0]}
                            alt={saree.name}
                            referrerPolicy="no-referrer"
                            className="w-16 h-20 object-cover object-top rounded-xl border border-[#262626] shrink-0"
                          />
                          <div className="flex-1 min-w-0">
                            <p className="text-xs font-serif font-light text-white line-clamp-1">{saree.name}</p>
                            <p className="text-[10px] text-[#c5a059]">{saree.fabric}</p>
                            <p className="text-xs font-mono font-medium text-[#e5e5e5] mt-1">
                              {formatPrice(saree.price, currency)}
                            </p>
                            <span className="inline-block mt-1 text-[9px] bg-[#1a1a1a] text-[#a1a1aa] px-1.5 py-0.5 rounded border border-[#262626]">
                              {saree.originRegion.split(',')[0]}
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 pt-2 border-t border-[#1f1f1f]">
                          <button
                            onClick={() => onSelectSaree(saree)}
                            className="text-[10px] text-[#c5a059] hover:underline font-medium"
                          >
                            Inspect Drape →
                          </button>
                          <span className="text-xs text-[#333333]">•</span>
                          <button
                            onClick={() => setActiveSlotId(slot.id)}
                            className="text-[10px] text-[#a1a1aa] hover:text-white"
                          >
                            Swap Drape
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="py-6 text-center space-y-2 flex flex-col items-center justify-center">
                        <p className="text-[11px] text-[#71717a]">Recommended: {slot.recommendedFabric}</p>
                        <button
                          onClick={() => setActiveSlotId(slot.id)}
                          className="px-4 py-2 bg-[#171717] hover:bg-[#212121] text-[#c5a059] border border-[#c5a059]/40 rounded-xl text-xs font-medium uppercase tracking-wider flex items-center gap-1.5 transition-all cursor-pointer"
                        >
                          <Plus className="w-3.5 h-3.5" />
                          <span>Select Saree</span>
                        </button>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Quick Picker Drawer when a slot is clicked */}
          {activeSlotId && (
            <div className="p-4 bg-[#141414] border border-[#c5a059] rounded-2xl space-y-3 animate-in fade-in">
              <div className="flex items-center justify-between">
                <p className="text-xs font-bold text-white uppercase tracking-wider">
                  Select Saree for {slots.find(s => s.id === activeSlotId)?.title}
                </p>
                <button onClick={() => setActiveSlotId(null)} className="text-xs text-[#71717a] hover:text-white">
                  Cancel
                </button>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-2 max-h-56 overflow-y-auto pr-1">
                {SAREES_DATA.map((s) => (
                  <div
                    key={s.id}
                    onClick={() => handleAssignSaree(activeSlotId, s)}
                    className="p-2 rounded-xl bg-[#1a1a1a] hover:bg-[#262626] border border-[#262626] hover:border-[#c5a059] cursor-pointer transition-all text-left"
                  >
                    <img
                      src={s.images[0]}
                      alt={s.name}
                      referrerPolicy="no-referrer"
                      className="w-full aspect-[3/4] object-cover rounded-lg mb-1.5"
                    />
                    <p className="text-[11px] font-serif text-white truncate">{s.name}</p>
                    <p className="text-[10px] text-[#c5a059]">{formatPrice(s.price, currency)}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Trousseau Summary & Checkout */}
          <div className="p-5 bg-[#121212] border border-[#262626] rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="space-y-1 text-center sm:text-left">
              <div className="flex items-center justify-center sm:justify-start gap-2">
                <span className="text-xs text-[#a1a1aa]">Trousseau Value:</span>
                <span className="text-sm font-mono text-[#71717a] line-through">
                  {formatPrice(totalOriginal, currency)}
                </span>
                <span className="text-lg font-mono font-bold text-[#c5a059]">
                  {formatPrice(grandTotal, currency)}
                </span>
                {trousseauDiscount > 0 && (
                  <span className="text-[10px] font-bold text-[#4ade80] bg-[#14532d]/40 border border-[#22c55e]/30 px-2 py-0.5 rounded">
                    Save {formatPrice(trousseauDiscount, currency)} (15% Off)
                  </span>
                )}
              </div>
              <p className="text-[11px] text-[#71717a]">
                Includes personalized brass plaque for <strong className="text-white">"{brideName}"</strong> + Free priority vault air express
              </p>
            </div>

            <button
              id="add-trousseau-to-cart-btn"
              onClick={handleAddAllToCart}
              disabled={filledSlots.length === 0}
              className="w-full sm:w-auto px-8 py-3.5 bg-[#c5a059] hover:bg-[#d4b476] disabled:opacity-50 text-black text-xs font-bold uppercase tracking-[0.15em] rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg cursor-pointer"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Add Complete Trousseau ({filledSlots.length} Sarees)</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
