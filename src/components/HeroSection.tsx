import React, { useState, useEffect } from 'react';
import { Sparkles, ShieldCheck, Truck, Scissors, ArrowRight, Award, Volume2, VolumeX, Eye, Gift } from 'lucide-react';
import { Currency } from '../types';
import { loomAudio } from '../utils/loomAudio';

interface HeroSectionProps {
  onExploreClick: () => void;
  onOpenFinder: () => void;
  onOpenDrapeGuide: () => void;
  onSelectCategory: (fabric: string) => void;
  onOpenTrousseauTrunk?: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onExploreClick,
  onOpenFinder,
  onOpenDrapeGuide,
  onSelectCategory,
  onOpenTrousseauTrunk
}) => {
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [heroViewMode, setHeroViewMode] = useState<'bride' | 'loom'>('bride');

  const handleToggleAudio = () => {
    const active = loomAudio.toggle();
    setIsAudioPlaying(active);
  };

  useEffect(() => {
    return () => {
      loomAudio.stop();
    };
  }, []);

  return (
    <section className="relative overflow-hidden bg-[#0a0a0a] py-12 lg:py-20 border-b border-[#262626]">
      {/* Delicate Radial Dot Matrix Pattern in Gold */}
      <div 
        className="absolute inset-0 opacity-20 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(#c5a059 0.5px, transparent 0.5px)',
          backgroundSize: '24px 24px'
        }}
      ></div>

      {/* Subtle vertical luxury glow divider */}
      <div className="absolute top-0 right-1/3 h-full w-[1px] bg-gradient-to-b from-transparent via-[#c5a059] to-transparent opacity-20 hidden lg:block"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* Left Editorial Content */}
          <div className="lg:col-span-7 space-y-7 text-center lg:text-left">
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2.5">
              <div className="inline-flex items-center gap-2 bg-[#171717] border border-[#333333] text-[#c5a059] px-4 py-1.5 rounded-full text-[11px] font-medium tracking-[0.3em] uppercase">
                <Sparkles className="w-3.5 h-3.5 text-[#c5a059]" />
                Collection No. 12 • Autumn Atelier 2026
              </div>

              {/* Ambient Loom Soundscape Toggle */}
              <button
                id="loom-soundscape-toggle"
                onClick={handleToggleAudio}
                className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-[10px] uppercase font-bold tracking-[0.2em] transition-all cursor-pointer border ${
                  isAudioPlaying
                    ? 'bg-[#c5a059]/20 text-[#c5a059] border-[#c5a059] shadow-sm'
                    : 'bg-[#141414] text-[#a1a1aa] hover:text-[#c5a059] border-[#333333]'
                }`}
                title="Toggle traditional handloom weaving soundscape (Web Audio API)"
              >
                {isAudioPlaying ? (
                  <>
                    <Volume2 className="w-3.5 h-3.5 text-[#c5a059] animate-pulse" />
                    <span>Loom Soundscape (Playing)</span>
                    <span className="flex items-end gap-0.5 h-3 ml-0.5">
                      <span className="w-0.5 h-full bg-[#c5a059] animate-bounce" style={{ animationDelay: '0ms' }} />
                      <span className="w-0.5 h-2/3 bg-[#c5a059] animate-bounce" style={{ animationDelay: '150ms' }} />
                      <span className="w-0.5 h-4/5 bg-[#c5a059] animate-bounce" style={{ animationDelay: '300ms' }} />
                    </span>
                  </>
                ) : (
                  <>
                    <VolumeX className="w-3.5 h-3.5 text-[#71717a]" />
                    <span>Listen to Loom (Audio)</span>
                  </>
                )}
              </button>
            </div>

            <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light text-white leading-[1.08] tracking-tight">
              The Art of <br className="hidden sm:inline" />
              <span className="italic text-[#c5a059]">the Drape</span>
            </h1>

            <p className="text-[#a1a1aa] text-base sm:text-lg max-w-2xl mx-auto lg:mx-0 leading-relaxed font-light">
              Hand-woven masterpieces from the sacred pit-looms of Kanchipuram, Varanasi, Patan, and Chanderi. Each thread tells a story of heritage, patience, and absolute grace.
            </p>

            {/* Primary Action Buttons */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3.5 pt-2">
              <button
                id="hero-explore-collection-btn"
                onClick={onExploreClick}
                className="flex items-center gap-2 bg-[#c5a059] hover:bg-[#d4b476] text-black px-7 py-3.5 rounded-xl text-[11px] uppercase tracking-[0.2em] font-bold transition-all duration-300 shadow-lg hover:shadow-[#c5a059]/20 transform hover:-translate-y-0.5 cursor-pointer"
              >
                <span>Explore Sarees</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                id="hero-style-finder-btn"
                onClick={onOpenFinder}
                className="flex items-center gap-2 bg-[#121212] hover:bg-[#1a1a1a] text-[#e5e5e5] hover:text-[#c5a059] border border-[#262626] hover:border-[#c5a059]/50 px-6 py-3.5 rounded-xl text-[11px] uppercase tracking-[0.2em] font-medium transition-all duration-300 cursor-pointer shadow-sm"
              >
                <Sparkles className="w-3.5 h-3.5 text-[#c5a059]" />
                <span>Saree Style Quiz</span>
              </button>
            </div>

            {/* Quick Category Jump Pills */}
            <div className="pt-6 border-t border-[#262626]">
              <p className="text-[10px] uppercase tracking-[0.3em] font-medium text-[#71717a] mb-3">
                Curated Loom Clusters:
              </p>
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2">
                {[
                  { label: 'Kanjivaram Silk', count: 'Pure 3-Ply' },
                  { label: 'Banarasi Silk', count: 'Kadhwa Zari' },
                  { label: 'Organza', count: 'Pastel Scallop' },
                  { label: 'Chanderi', count: 'Silk Cotton' },
                  { label: 'Paithani Silk', count: 'Peacock Pallu' }
                ].map((item) => (
                  <button
                    key={item.label}
                    onClick={() => {
                      onSelectCategory(item.label);
                      onExploreClick();
                    }}
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-[#121212] hover:bg-[#1c1c1c] border border-[#262626] hover:border-[#c5a059] text-xs font-medium text-[#e5e5e5] rounded-xl transition-all shadow-2xs cursor-pointer group"
                  >
                    <span className="text-xs group-hover:text-[#c5a059]">{item.label}</span>
                    <span className="text-[10px] text-[#71717a]">({item.count})</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right Hero Visual Card with Cinemagraphic Switch */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              {/* Outer Decorative Frame */}
              <div className="absolute -inset-2 bg-gradient-to-tr from-[#c5a059]/30 to-[#333333]/20 rounded-2xl filter blur-md"></div>
              
              <div className="relative bg-[#0d0d0d] p-3 rounded-2xl border border-[#262626] shadow-2xl overflow-hidden">
                <div className="relative aspect-[3/4] w-full rounded-xl overflow-hidden bg-[#171717]">
                  
                  {heroViewMode === 'bride' ? (
                    <img
                      src="https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=900&q=85"
                      alt="Handcrafted Heirloom Saree - Kanjivaram Bridal Silk"
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-700 opacity-95"
                    />
                  ) : (
                    /* Cinemagraphic Pit-Loom Artisan Visual */
                    <div className="w-full h-full relative overflow-hidden bg-black">
                      <img
                        src="https://images.unsplash.com/photo-1606744888344-498238f01777?auto=format&fit=crop&w=900&q=85"
                        alt="Master Handloom Weaver at Traditional Pit-Loom"
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover filter contrast-110 brightness-95"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/40" />
                      
                      {/* Floating Weft Shuttle Badge */}
                      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center pointer-events-none p-4 rounded-2xl bg-black/60 backdrop-blur-md border border-[#c5a059]/40">
                        <p className="text-[10px] text-[#c5a059] uppercase tracking-[0.25em] font-mono">Sacred Pit-Loom</p>
                        <p className="text-xs font-serif text-white mt-1">140 Weft Throws Per Inch</p>
                      </div>
                    </div>
                  )}
                  
                  {/* Top Overlay Badges & View Switcher */}
                  <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                    <div className="flex flex-col gap-1.5">
                      <span className="bg-[#0a0a0a]/90 backdrop-blur-md text-[#c5a059] text-[10px] font-bold uppercase tracking-[0.2em] px-3 py-1 rounded-md shadow-sm border border-[#c5a059]/40">
                        Heirloom Bridal Edition
                      </span>
                      <span className="bg-[#121212]/90 backdrop-blur-md text-[#e5e5e5] text-[10px] font-medium px-2.5 py-0.5 rounded-md shadow-sm flex items-center gap-1 w-fit border border-[#262626]">
                        <Award className="w-3 h-3 text-[#c5a059]" />
                        Silk Mark Certified
                      </span>
                    </div>

                    {/* View Switch Button */}
                    <button
                      onClick={() => setHeroViewMode(heroViewMode === 'bride' ? 'loom' : 'bride')}
                      className="bg-black/80 backdrop-blur-md hover:bg-[#1a1a1a] text-[#c5a059] border border-[#c5a059]/40 px-2.5 py-1 rounded-lg text-[10px] font-medium tracking-wider uppercase flex items-center gap-1 cursor-pointer transition-all shadow-md"
                    >
                      <Eye className="w-3 h-3" />
                      <span>{heroViewMode === 'bride' ? 'View Loom' : 'View Drape'}</span>
                    </button>
                  </div>

                  <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/90 to-transparent p-5 text-white">
                    <div className="w-8 h-[1px] bg-[#c5a059] mb-2"></div>
                    <p className="text-[10px] uppercase tracking-[0.3em] text-[#c5a059] font-medium">Masterpiece of the Week</p>
                    <h3 className="font-serif text-lg font-light text-white mt-0.5">Vaidarbhi Royal Crimson Kanjivaram</h3>
                    <p className="text-xs text-[#a1a1aa] mt-1 font-light">Handwoven with 3-ply mulberry silk & pure gold-dipped silver zari</p>
                  </div>
                </div>
              </div>

              {/* Floating Testimonial Pill */}
              <div className="absolute -bottom-4 -left-4 sm:-left-6 bg-[#121212] border border-[#262626] rounded-xl p-3.5 shadow-2xl flex items-center gap-3 max-w-xs animate-in fade-in slide-in-from-bottom-2">
                <div className="w-10 h-10 rounded-full bg-[#1c1c1c] flex items-center justify-center text-[#c5a059] font-bold text-xs shrink-0 border border-[#333333]">
                  4.9★
                </div>
                <div>
                  <p className="text-xs font-semibold text-white">12,000+ Draped Brides</p>
                  <p className="text-[11px] text-[#71717a] italic">"Draped like a dream at my Muhurtham!"</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 4 Feature Value Pillars */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-16 pt-8 border-t border-[#262626]">
          <div className="flex items-start gap-3 p-4 rounded-xl bg-[#0d0d0d] border border-[#262626] hover:border-[#333333] transition-colors">
            <div className="p-2 rounded-lg bg-[#171717] text-[#c5a059] border border-[#262626] shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-wider text-white">100% Pure Silk</h4>
              <p className="text-[11px] text-[#71717a] mt-0.5 font-light">Govt Silk Mark hologram on every piece</p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-4 rounded-xl bg-[#0d0d0d] border border-[#262626] hover:border-[#333333] transition-colors">
            <div className="p-2 rounded-lg bg-[#171717] text-[#c5a059] border border-[#262626] shrink-0">
              <Scissors className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-wider text-white">Fall & Pico Hemming</h4>
              <p className="text-[11px] text-[#71717a] mt-0.5 font-light">Complimentary artisan finishing</p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-4 rounded-xl bg-[#0d0d0d] border border-[#262626] hover:border-[#333333] transition-colors">
            <div className="p-2 rounded-lg bg-[#171717] text-[#c5a059] border border-[#262626] shrink-0">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-wider text-white">Direct Weavers</h4>
              <p className="text-[11px] text-[#71717a] mt-0.5 font-light">Supporting 140+ generational families</p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-4 rounded-xl bg-[#0d0d0d] border border-[#262626] hover:border-[#333333] transition-colors">
            <div className="p-2 rounded-lg bg-[#171717] text-[#c5a059] border border-[#262626] shrink-0">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-wider text-white">Insured Global</h4>
              <p className="text-[11px] text-[#71717a] mt-0.5 font-light">Atelier shipping to 35+ countries</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
