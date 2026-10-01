import React, { useState } from 'react';
import { Sparkles, MapPin, Heart, ShoppingBag, Eye, X, Quote, ShieldCheck } from 'lucide-react';
import { PatronLook, Saree, Currency } from '../types';
import { PATRONS_DATA } from '../data/patronsData';
import { SAREES_DATA } from '../data/sareesData';
import { formatPrice } from '../utils/formatters';

interface PatronsGalleryProps {
  currency: Currency;
  onSelectSaree: (saree: Saree) => void;
  onQuickAddToCart: (saree: Saree) => void;
}

export const PatronsGallery: React.FC<PatronsGalleryProps> = ({
  currency,
  onSelectSaree,
  onQuickAddToCart
}) => {
  const [selectedOccasion, setSelectedOccasion] = useState<string>('all');
  const [activePatron, setActivePatron] = useState<PatronLook | null>(null);

  const filteredPatrons = selectedOccasion === 'all'
    ? PATRONS_DATA
    : PATRONS_DATA.filter(p => p.occasion.toLowerCase().includes(selectedOccasion.toLowerCase()));

  const occasions = [
    { id: 'all', label: 'All Celebrations' },
    { id: 'muhurtham', label: 'Muhurtham Weddings' },
    { id: 'sangeet', label: 'Sangeet & Cocktails' },
    { id: 'temple', label: 'Temple Drapes' }
  ];

  return (
    <section id="patrons-gallery-section" className="py-16 sm:py-24 bg-[#0a0a0a] border-b border-[#262626] relative overflow-hidden">
      {/* Background Ambience */}
      <div 
        className="absolute inset-0 opacity-10 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(#c5a059 0.5px, transparent 0.5px)',
          backgroundSize: '24px 24px'
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
          <div className="inline-flex items-center gap-2 bg-[#171717] border border-[#333333] text-[#c5a059] px-3.5 py-1 rounded-full text-[10px] uppercase font-bold tracking-[0.25em]">
            <Sparkles className="w-3 h-3 text-[#c5a059]" />
            <span>Patrons of Varnam • Real Brides & Celebrations</span>
          </div>
          
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-light text-white tracking-tight">
            Heirlooms in <span className="italic text-[#c5a059]">Motion</span> – Real Bridal Saree Moments
          </h2>
          
          <p className="text-xs sm:text-sm text-[#a1a1aa] font-light leading-relaxed">
            Witness how the sacred folds of Kanchi and Kashi come alive on authentic brides across palace mandapams and historic temple sanctums. Tap any pin to shop the look.
          </p>

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-4">
            {occasions.map((occ) => (
              <button
                key={occ.id}
                onClick={() => setSelectedOccasion(occ.id)}
                className={`px-4 py-1.5 rounded-full text-xs font-medium uppercase tracking-[0.15em] transition-all cursor-pointer ${
                  selectedOccasion === occ.id
                    ? 'bg-[#c5a059] text-black font-bold shadow-md'
                    : 'bg-[#141414] text-[#a1a1aa] border border-[#262626] hover:text-white hover:border-[#c5a059]/40'
                }`}
              >
                {occ.label}
              </button>
            ))}
          </div>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredPatrons.map((patron) => {
            const saree = SAREES_DATA.find(s => s.id === patron.sareeId);

            return (
              <div
                key={patron.id}
                className="group relative rounded-2xl overflow-hidden bg-[#121212] border border-[#262626] hover:border-[#c5a059]/50 transition-all duration-300 shadow-xl flex flex-col"
              >
                {/* Photo with Hotspot Pin */}
                <div className="relative aspect-[4/5] w-full overflow-hidden bg-[#171717]">
                  <img
                    src={patron.image}
                    alt={patron.brideName}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700 opacity-90 group-hover:opacity-100"
                  />

                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />

                  {/* Pulsating Hotspot Gold Pin */}
                  <div
                    style={{ left: `${patron.pinX}%`, top: `${patron.pinY}%` }}
                    className="absolute -translate-x-1/2 -translate-y-1/2 z-20"
                  >
                    <button
                      onClick={() => setActivePatron(patron)}
                      className="relative w-8 h-8 rounded-full bg-[#c5a059] text-black font-bold flex items-center justify-center shadow-lg hover:scale-110 transition-transform cursor-pointer group/pin"
                      title="Tap to view exact saree"
                    >
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#c5a059] opacity-75" />
                      <ShoppingBag className="w-3.5 h-3.5 relative z-10 text-black" />
                    </button>
                  </div>

                  {/* Location & Occasion Pill */}
                  <div className="absolute top-3 left-3 bg-[#0a0a0a]/80 backdrop-blur-md px-2.5 py-1 rounded-lg border border-[#333333] flex items-center gap-1.5 text-[10px] text-[#e5e5e5]">
                    <MapPin className="w-3 h-3 text-[#c5a059]" />
                    <span className="truncate max-w-[180px]">{patron.location}</span>
                  </div>

                  {/* Bottom Text in Image */}
                  <div className="absolute bottom-3 left-3 right-3 text-white space-y-1">
                    <p className="text-[10px] uppercase tracking-[0.2em] font-medium text-[#c5a059]">
                      {patron.occasion}
                    </p>
                    <h3 className="font-serif text-lg font-light text-white">
                      {patron.brideName}
                    </h3>
                  </div>
                </div>

                {/* Editorial Quote & Shop Trigger Bar */}
                <div className="p-4 bg-[#121212] flex-1 flex flex-col justify-between space-y-3">
                  <div className="flex items-start gap-2">
                    <Quote className="w-4 h-4 text-[#c5a059] shrink-0 mt-0.5 opacity-60" />
                    <p className="text-xs text-[#a1a1aa] italic font-light leading-relaxed">
                      "{patron.quote}"
                    </p>
                  </div>

                  {saree && (
                    <div className="pt-3 border-t border-[#1f1f1f] flex items-center justify-between">
                      <div className="min-w-0 pr-2">
                        <p className="text-[11px] font-serif font-light text-white truncate">{saree.name}</p>
                        <p className="text-xs font-mono font-medium text-[#c5a059]">{formatPrice(saree.price, currency)}</p>
                      </div>

                      <button
                        onClick={() => onSelectSaree(saree)}
                        className="px-3 py-1.5 bg-[#171717] hover:bg-[#262626] border border-[#333333] hover:border-[#c5a059] rounded-lg text-[10px] uppercase tracking-[0.15em] font-medium text-[#c5a059] transition-all cursor-pointer flex items-center gap-1 shrink-0"
                      >
                        <Eye className="w-3 h-3" />
                        <span>View</span>
                      </button>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Interactive Quick Shop Popover when Pin is Clicked */}
      {activePatron && (
        <div 
          className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in"
          onClick={() => setActivePatron(null)}
        >
          {(() => {
            const saree = SAREES_DATA.find(s => s.id === activePatron.sareeId);
            if (!saree) return null;

            return (
              <div
                className="bg-[#121212] border border-[#c5a059] rounded-2xl max-w-md w-full p-5 shadow-2xl relative space-y-4 animate-in zoom-in-95"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  onClick={() => setActivePatron(null)}
                  className="absolute top-3 right-3 p-1.5 rounded-full bg-[#1a1a1a] text-[#a1a1aa] hover:text-white"
                >
                  <X className="w-4 h-4" />
                </button>

                <div className="flex items-center gap-2">
                  <span className="text-[10px] uppercase font-bold tracking-[0.2em] text-[#c5a059] bg-[#1f1a10] border border-[#c5a059]/30 px-2 py-0.5 rounded">
                    Draped by {activePatron.brideName}
                  </span>
                </div>

                <div className="flex gap-4 items-center">
                  <img
                    src={saree.images[0]}
                    alt={saree.name}
                    referrerPolicy="no-referrer"
                    className="w-24 aspect-[3/4] object-cover rounded-xl border border-[#262626] shrink-0"
                  />
                  <div className="space-y-1 min-w-0">
                    <h4 className="font-serif text-base text-white">{saree.name}</h4>
                    <p className="text-[11px] text-[#c5a059]">{saree.fabric} • {saree.originRegion.split(',')[0]}</p>
                    <p className="text-sm font-mono font-bold text-white pt-1">{formatPrice(saree.price, currency)}</p>
                    <div className="flex items-center gap-1 text-[10px] text-[#4ade80]">
                      <ShieldCheck className="w-3 h-3" />
                      <span>Silk Mark Certified</span>
                    </div>
                  </div>
                </div>

                <p className="text-xs text-[#a1a1aa] italic bg-[#171717] p-3 rounded-xl border border-[#262626]">
                  "{activePatron.quote}"
                </p>

                <div className="flex gap-3 pt-2">
                  <button
                    onClick={() => {
                      onSelectSaree(saree);
                      setActivePatron(null);
                    }}
                    className="flex-1 py-2.5 bg-[#1f1f1f] hover:bg-[#292929] text-white text-xs font-semibold uppercase tracking-wider rounded-xl border border-[#333333] transition-all cursor-pointer"
                  >
                    Inspect Full Saree
                  </button>

                  <button
                    onClick={() => {
                      onQuickAddToCart(saree);
                      setActivePatron(null);
                    }}
                    className="flex-1 py-2.5 bg-[#c5a059] hover:bg-[#d4b476] text-black text-xs font-bold uppercase tracking-wider rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1.5 shadow-md"
                  >
                    <ShoppingBag className="w-3.5 h-3.5" />
                    <span>Add to Bag</span>
                  </button>
                </div>
              </div>
            );
          })()}
        </div>
      )}
    </section>
  );
};
