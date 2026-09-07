import React, { useState } from 'react';
import { X, Sparkles, ArrowRight, RotateCcw, Check, Heart, ShoppingBag } from 'lucide-react';
import { Saree, Currency } from '../types';
import { SAREES_DATA } from '../data/sareesData';
import { formatPrice } from '../utils/formatters';

interface SareeFinderQuizProps {
  isOpen: boolean;
  onClose: () => void;
  currency: Currency;
  onSelectSaree: (saree: Saree) => void;
  onAddToCart: (saree: Saree) => void;
}

export const SareeFinderQuiz: React.FC<SareeFinderQuizProps> = ({
  isOpen,
  onClose,
  currency,
  onSelectSaree,
  onAddToCart
}) => {
  if (!isOpen) return null;

  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
  const [occasion, setOccasion] = useState<string>('');
  const [fabricFeel, setFabricFeel] = useState<string>('');
  const [colorVibe, setColorVibe] = useState<string>('');

  const handleReset = () => {
    setStep(1);
    setOccasion('');
    setFabricFeel('');
    setColorVibe('');
  };

  // Matching algorithm based on selections
  const getMatchedSarees = (): { saree: Saree; matchScore: number; reason: string }[] => {
    return SAREES_DATA.map((saree) => {
      let score = 70;
      let reasons: string[] = [];

      // Occasion matching
      if (occasion === 'wedding' && (saree.occasion === 'Bridal & Wedding' || saree.fabric === 'Kanjivaram Silk' || saree.fabric === 'Banarasi Silk')) {
        score += 15;
        reasons.push('Grand festive bridal grandeur');
      } else if (occasion === 'cocktail' && (saree.fabric === 'Organza' || saree.fabric === 'Chikankari' || saree.occasion === 'Cocktail & Reception')) {
        score += 15;
        reasons.push('Chic evening silhouette');
      } else if (occasion === 'festive' && (saree.occasion === 'Festive & Puja' || saree.fabric === 'Chanderi' || saree.fabric === 'Bandhani Georgette')) {
        score += 15;
        reasons.push('Vibrant traditional celebration');
      } else if (occasion === 'daily' && (saree.fabric === 'Linen Handloom' || saree.fabric === 'Tussar Silk' || saree.occasion === 'Office & Daily Elegance')) {
        score += 15;
        reasons.push('Lightweight comfort & all-day wear');
      }

      // Fabric feel matching
      if (fabricFeel === 'heavy-silk' && (saree.fabric === 'Kanjivaram Silk' || saree.fabric === 'Banarasi Silk' || saree.fabric === 'Paithani Silk')) {
        score += 10;
        reasons.push('Opulent structured drape');
      } else if (fabricFeel === 'featherlight' && (saree.fabric === 'Organza' || saree.fabric === 'Bandhani Georgette' || saree.fabric === 'Chikankari')) {
        score += 10;
        reasons.push('Weightless floaty grace');
      } else if (fabricFeel === 'breathable' && (saree.fabric === 'Chanderi' || saree.fabric === 'Linen Handloom' || saree.fabric === 'Tussar Silk')) {
        score += 10;
        reasons.push('Crisp cooling natural fibers');
      }

      // Color vibe matching
      if (colorVibe === 'jewel' && (saree.color === 'Crimson Red' || saree.color === 'Royal Emerald' || saree.color === 'Peacock Blue' || saree.color === 'Regal Plum')) {
        score += 5;
      } else if (colorVibe === 'pastels' && (saree.color === 'Pastel Mint' || saree.color === 'Rose Gold Blush' || saree.color === 'Ivory & Gold')) {
        score += 5;
      } else if (colorVibe === 'warm' && (saree.color === 'Mustard Haldi' || saree.color === 'Sunset Rust')) {
        score += 5;
      }

      const finalScore = Math.min(99, score);
      return {
        saree,
        matchScore: finalScore,
        reason: reasons[0] || 'Perfect balance of heritage weave & modern styling'
      };
    }).sort((a, b) => b.matchScore - a.matchScore).slice(0, 3);
  };

  const matchedResults = step === 4 ? getMatchedSarees() : [];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-in fade-in">
      <div 
        id="saree-finder-quiz-container"
        className="relative bg-[#0d0d0d] rounded-3xl max-w-2xl w-full border border-[#262626] shadow-2xl overflow-hidden my-auto"
      >
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#262626] bg-[#0a0a0a]">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-[#171717] text-[#c5a059] border border-[#262626]">
              <Sparkles className="w-4 h-4 text-[#c5a059]" />
            </div>
            <div>
              <h3 className="font-serif text-base sm:text-lg font-light text-white tracking-wide">Saree Style Finder Quiz</h3>
              <p className="text-[11px] text-[#71717a]">Discover your signature weave in 3 quick questions</p>
            </div>
          </div>

          <button
            id="close-saree-finder-btn"
            onClick={onClose}
            className="p-2 rounded-full hover:bg-[#1a1a1a] text-[#a1a1aa] hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-[#1a1a1a] h-1">
          <div 
            className="bg-[#c5a059] h-full transition-all duration-300"
            style={{ width: `${(step / 4) * 100}%` }}
          />
        </div>

        {/* Quiz Steps Content */}
        <div className="p-6 sm:p-8 space-y-6">
          
          {/* STEP 1: Occasion */}
          {step === 1 && (
            <div className="space-y-4 animate-in fade-in">
              <span className="text-[10px] font-bold text-[#c5a059] uppercase tracking-[0.25em]">Step 1 of 3</span>
              <h4 className="font-serif text-xl sm:text-2xl font-light text-white">
                Where will you be wearing this saree?
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                {[
                  { 
                    id: 'wedding', 
                    title: 'Grand Wedding / Muhurtham', 
                    desc: 'Opulent heirloom silks with temple borders & pure zari', 
                    emoji: '👑',
                    image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=400&q=80'
                  },
                  { 
                    id: 'festive', 
                    title: 'Festive Puja & Celebrations', 
                    desc: 'Vibrant auspicious tones with rich traditional motifs', 
                    emoji: '🪔',
                    image: 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=400&q=80'
                  },
                  { 
                    id: 'cocktail', 
                    title: 'Cocktail & Evening Reception', 
                    desc: 'Modern breezy pastels, zardozi work & chic drape', 
                    emoji: '🥂',
                    image: 'https://images.unsplash.com/photo-1583391733975-081045952d76?auto=format&fit=crop&w=400&q=80'
                  },
                  { 
                    id: 'daily', 
                    title: 'Daily Grace & Corporate', 
                    desc: 'Comfortable, breathable raw tussar, and soft silk', 
                    emoji: '🌿',
                    image: 'https://images.unsplash.com/photo-1609357605129-26f69add5d6e?auto=format&fit=crop&w=400&q=80'
                  }
                ].map((opt) => (
                  <button
                    key={opt.id}
                    onClick={() => {
                      setOccasion(opt.id);
                      setStep(2);
                    }}
                    className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer flex gap-3 items-center group overflow-hidden ${
                      occasion === opt.id
                        ? 'border-[#c5a059] bg-[#171717] shadow-sm'
                        : 'border-[#262626] bg-[#121212] hover:bg-[#1a1a1a] hover:border-[#333333]'
                    }`}
                  >
                    <div className="w-14 h-14 rounded-xl overflow-hidden shrink-0 border border-[#262626] relative bg-[#171717]">
                      <img
                        src={opt.image}
                        alt={opt.title}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-black/30 flex items-center justify-center text-base">
                        {opt.emoji}
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-serif text-sm font-medium text-white group-hover:text-[#c5a059] transition-colors">{opt.title}</p>
                      <p className="text-xs text-[#71717a] mt-0.5 font-light line-clamp-2">{opt.desc}</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* STEP 2: Fabric Silhouette */}
          {step === 2 && (
            <div className="space-y-4 animate-in fade-in">
              <span className="text-[10px] font-bold text-[#c5a059] uppercase tracking-[0.25em]">Step 2 of 3</span>
              <h4 className="font-serif text-xl sm:text-2xl font-light text-white">
                What drape texture & weight do you prefer?
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                {[
                  { 
                    id: 'heavy-silk', 
                    title: 'Heirloom Pure Silk', 
                    desc: 'Rich 3-ply weight with sculpted pleats that hold form all day', 
                    icon: '🏛️',
                    image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=400&q=80'
                  },
                  { 
                    id: 'featherlight', 
                    title: 'Weightless Bandhani Georgette', 
                    desc: 'Weightless floating drape that flows like water across the shoulder', 
                    icon: '🕊️',
                    image: 'https://images.unsplash.com/photo-1583391733975-081045952d76?auto=format&fit=crop&w=400&q=80'
                  },
                  { 
                    id: 'breathable', 
                    title: 'Crisp Dual-Tone Chanderi', 
                    desc: 'Cooling natural fibers that stay crisp in tropical weather', 
                    icon: '🍃',
                    image: 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=400&q=80'
                  }
                ].map((opt) => (
                  <button
                    key={opt.id}
                    onClick={() => {
                      setFabricFeel(opt.id);
                      setStep(3);
                    }}
                    className={`p-3 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between group overflow-hidden ${
                      fabricFeel === opt.id
                        ? 'border-[#c5a059] bg-[#171717] shadow-sm'
                        : 'border-[#262626] bg-[#121212] hover:bg-[#1a1a1a] hover:border-[#333333]'
                    }`}
                  >
                    <div className="w-full h-24 rounded-xl overflow-hidden mb-2.5 relative border border-[#262626] bg-[#171717]">
                      <img
                        src={opt.image}
                        alt={opt.title}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute top-2 left-2 bg-black/60 backdrop-blur-xs px-2 py-0.5 rounded-full text-xs">
                        {opt.icon}
                      </div>
                    </div>
                    <div>
                      <p className="font-serif text-sm font-medium text-white group-hover:text-[#c5a059] transition-colors">{opt.title}</p>
                      <p className="text-[11px] text-[#71717a] mt-1 font-light leading-relaxed">{opt.desc}</p>
                    </div>
                  </button>
                ))}
              </div>

              <div className="flex justify-between pt-2">
                <button
                  onClick={() => setStep(1)}
                  className="text-xs font-semibold text-[#a1a1aa] hover:text-[#c5a059] uppercase tracking-wider"
                >
                  ← Back to Occasion
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: Color Palette */}
          {step === 3 && (
            <div className="space-y-4 animate-in fade-in">
              <span className="text-[10px] font-bold text-[#c5a059] uppercase tracking-[0.25em]">Step 3 of 3</span>
              <h4 className="font-serif text-xl sm:text-2xl font-light text-white">
                Choose your color mood
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                {[
                  { id: 'jewel', title: 'Regal Jewel Tones', desc: 'Crimson Red, Emerald Green, Peacock Blue & Imperial Plum', hexes: ['#8B0000', '#046307', '#104E8B', '#4E1B3E'] },
                  { id: 'pastels', title: 'Ethereal Pastels & Blushes', desc: 'Sage Mint, Rose Gold Blush, Champagne & Soft Ivory', hexes: ['#98B8A6', '#E8B4B8', '#EAE6DF', '#F3E2CF'] },
                  { id: 'warm', title: 'Warm Sunshine & Rust', desc: 'Haldi Mustard Yellow, Terracotta Rust & Radiant Gold', hexes: ['#D49B24', '#C84B31', '#B8860B', '#F8E7B9'] }
                ].map((opt) => (
                  <button
                    key={opt.id}
                    onClick={() => {
                      setColorVibe(opt.id);
                      setStep(4);
                    }}
                    className={`p-4 rounded-2xl border text-left transition-all cursor-pointer ${
                      colorVibe === opt.id
                        ? 'border-[#c5a059] bg-[#171717] shadow-sm'
                        : 'border-[#262626] bg-[#121212] hover:bg-[#1a1a1a]'
                    }`}
                  >
                    <div className="flex gap-1.5 mb-3">
                      {opt.hexes.map((h, i) => (
                        <span key={i} className="w-5 h-5 rounded-full border border-black/30 shadow-2xs" style={{ backgroundColor: h }} />
                      ))}
                    </div>
                    <p className="font-serif text-sm font-medium text-white">{opt.title}</p>
                    <p className="text-xs text-[#71717a] mt-1 font-light">{opt.desc}</p>
                  </button>
                ))}
              </div>

              <div className="flex justify-between pt-2">
                <button
                  onClick={() => setStep(2)}
                  className="text-xs font-semibold text-[#a1a1aa] hover:text-[#c5a059] uppercase tracking-wider"
                >
                  ← Back to Fabric
                </button>
              </div>
            </div>
          )}

          {/* STEP 4: Matched Recommendations */}
          {step === 4 && (
            <div className="space-y-6 animate-in fade-in">
              <div className="text-center space-y-1">
                <span className="text-[10px] font-bold text-[#4ade80] bg-[#14532d]/40 border border-[#22c55e]/30 px-3 py-1 rounded-full uppercase tracking-[0.2em] inline-flex items-center gap-1">
                  <Check className="w-3.5 h-3.5" /> Perfect Match Curated
                </span>
                <h4 className="font-serif text-2xl font-light text-white mt-2">
                  Your Signature Saree Recommendations
                </h4>
                <p className="text-xs text-[#a1a1aa] font-light">
                  Handpicked based on your occasion, preferred weight, and aesthetic palette
                </p>
              </div>

              <div className="space-y-3.5">
                {matchedResults.map(({ saree, matchScore, reason }) => (
                  <div
                    key={saree.id}
                    className="p-4 bg-[#121212] rounded-2xl border border-[#262626] hover:border-[#c5a059]/60 flex flex-col sm:flex-row gap-4 items-center justify-between shadow-xs transition-all"
                  >
                    <div className="flex items-center gap-4 w-full sm:w-auto">
                      <img
                        src={saree.images[0]}
                        alt={saree.name}
                        referrerPolicy="no-referrer"
                        className="w-16 aspect-[3/4] object-cover rounded-xl border border-[#262626] shrink-0"
                      />
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="bg-[#14532d]/50 text-[#4ade80] border border-[#22c55e]/30 text-[10px] font-mono font-bold px-2 py-0.5 rounded-full">
                            {matchScore}% Match
                          </span>
                          <span className="text-[10px] text-[#c5a059] uppercase tracking-wider font-semibold">{saree.fabric}</span>
                        </div>
                        <h5 className="font-serif text-sm font-medium text-white mt-0.5">{saree.name}</h5>
                        <p className="text-[11px] text-[#71717a] mt-0.5 font-light italic">"{reason}"</p>
                        <p className="text-xs font-mono font-bold text-white mt-1">{formatPrice(saree.price, currency)}</p>
                      </div>
                    </div>

                    <div className="flex gap-2 w-full sm:w-auto shrink-0">
                      <button
                        onClick={() => {
                          onClose();
                          onSelectSaree(saree);
                        }}
                        className="flex-1 sm:flex-none px-4 py-2.5 bg-[#171717] hover:bg-[#212121] border border-[#333333] text-[#e5e5e5] rounded-xl text-xs font-medium uppercase tracking-wider transition-colors cursor-pointer"
                      >
                        View Details
                      </button>
                      <button
                        onClick={() => {
                          onAddToCart(saree);
                        }}
                        className="flex-1 sm:flex-none px-4 py-2.5 bg-[#c5a059] hover:bg-[#d4b476] text-black rounded-xl text-xs font-bold uppercase tracking-wider transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
                      >
                        <ShoppingBag className="w-3.5 h-3.5" />
                        <span>Add to Bag</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-[#262626]">
                <button
                  onClick={handleReset}
                  className="flex items-center gap-1 text-xs font-semibold text-[#a1a1aa] hover:text-[#c5a059] cursor-pointer uppercase tracking-wider"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>Retake Quiz</span>
                </button>

                <button
                  onClick={onClose}
                  className="text-xs font-bold text-[#c5a059] hover:underline cursor-pointer uppercase tracking-wider"
                >
                  Browse Full Catalog →
                </button>
              </div>
            </div>
          )}

        </div>

      </div>
    </div>
  );
};
