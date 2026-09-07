import React from 'react';
import { REGIONS_HERITAGE } from '../data/sareesData';
import { Award, ShieldCheck, HeartHandshake, Sparkles } from 'lucide-react';

interface HeritageSectionProps {
  onSelectRegion: (fabric: string) => void;
}

export const HeritageSection: React.FC<HeritageSectionProps> = ({ onSelectRegion }) => {
  return (
    <section className="py-16 sm:py-20 bg-[#0a0a0a] border-y border-[#262626] relative overflow-hidden">
      {/* Subtle background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#c5a059]/5 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-14">
          <div className="inline-flex items-center gap-2 bg-[#171717] text-[#c5a059] border border-[#333333] px-3.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-[0.25em]">
            <Sparkles className="w-3.5 h-3.5 text-[#c5a059]" />
            The Living Heritage
          </div>

          <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-light text-white tracking-wide">
            Preserving 2,000 Years of Indian Pit-Loom Art
          </h2>

          <p className="text-[#a1a1aa] text-xs sm:text-sm leading-relaxed font-light">
            Every saree in the Varnam guild is directly sourced from multi-generational weaver clusters. We eliminate middlemen to guarantee fair artisan wages and 100% genuine Silk Mark verification.
          </p>
        </div>

        {/* 6 Regional Clusters Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {REGIONS_HERITAGE.map((region) => (
            <div
              key={region.name}
              className="bg-[#0d0d0d] rounded-2xl border border-[#262626] hover:border-[#c5a059]/60 shadow-lg transition-all duration-300 flex flex-col justify-between group overflow-hidden"
            >
              {/* Region Visual Header */}
              {region.image && (
                <div className="relative h-44 w-full overflow-hidden bg-[#171717]">
                  <img
                    src={region.image}
                    alt={region.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 brightness-90 group-hover:brightness-100"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0d0d0d] via-transparent to-black/40" />

                  {/* Top Badges */}
                  <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                    <span className="text-xs bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/10 text-white font-medium flex items-center gap-1.5">
                      <span>{region.icon}</span>
                      <span className="text-[10px] uppercase tracking-wider text-[#c5a059]">{region.yearsTradition || 'Legacy Craft'}</span>
                    </span>

                    <span className="text-[9px] uppercase font-bold text-[#c5a059] bg-black/70 backdrop-blur-md px-2.5 py-1 rounded-full border border-[#c5a059]/40 tracking-widest">
                      Authentic Origin
                    </span>
                  </div>

                  {/* Bottom Image Overlay Tag */}
                  {region.mastery && (
                    <div className="absolute bottom-2 left-3">
                      <span className="text-[10px] text-white/90 bg-[#171717]/80 backdrop-blur-xs px-2 py-0.5 rounded border border-[#333333]">
                        {region.mastery}
                      </span>
                    </div>
                  )}
                </div>
              )}

              <div className="p-6 space-y-3 flex-1 flex flex-col justify-between">
                <div className="space-y-2">
                  <h3 className="font-serif text-lg font-medium text-white group-hover:text-[#c5a059] transition-colors">
                    {region.name}
                  </h3>

                  <p className="text-xs font-semibold text-[#c5a059] uppercase tracking-wider">
                    {region.specialty}
                  </p>

                  <p className="text-xs text-[#a1a1aa] leading-relaxed font-light">
                    {region.desc}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-[#1f1f1f] flex items-center justify-between">
                  <span className="text-[11px] font-medium text-[#4ade80] flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5" /> Silk Mark Certified
                  </span>

                  <button
                    onClick={() => {
                      const match = region.name.includes('Kanchi') ? 'Kanjivaram Silk' 
                        : region.name.includes('Varanasi') ? 'Banarasi Silk'
                        : region.name.includes('Chanderi') ? 'Chanderi'
                        : region.name.includes('Paithan') ? 'Paithani Silk'
                        : region.name.includes('Patan') ? 'Patola Silk'
                        : 'all';
                      onSelectRegion(match);
                      document.getElementById('collection-section')?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="text-xs font-bold uppercase tracking-wider text-[#c5a059] hover:text-[#d4b476] group-hover:underline cursor-pointer"
                  >
                    View Weaves →
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Guild Pledges */}
        <div className="mt-12 p-6 sm:p-8 bg-[#0d0d0d] rounded-3xl border border-[#262626] grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
          <div className="space-y-1">
            <div className="text-3xl font-light font-serif text-[#c5a059]">140+</div>
            <p className="text-xs font-semibold uppercase tracking-wider text-white">Direct Artisan Families</p>
            <p className="text-[11px] text-[#71717a] font-light">Supporting generational weavers in Tamil Nadu, UP & Gujarat</p>
          </div>
          <div className="space-y-1 border-t sm:border-t-0 sm:border-x border-[#262626] pt-4 sm:pt-0 sm:px-4">
            <div className="text-3xl font-light font-serif text-[#c5a059]">0%</div>
            <p className="text-xs font-semibold uppercase tracking-wider text-white">Synthetic Polyester</p>
            <p className="text-[11px] text-[#71717a] font-light">Burn-tested pure mulberry silk and genuine metallic zari</p>
          </div>
          <div className="space-y-1 border-t sm:border-t-0 border-[#262626] pt-4 sm:pt-0">
            <div className="text-3xl font-light font-serif text-[#c5a059]">12,000+</div>
            <p className="text-xs font-semibold uppercase tracking-wider text-white">Trousseaus Draped Globally</p>
            <p className="text-[11px] text-[#71717a] font-light">Trusted by brides across 35 countries</p>
          </div>
        </div>

      </div>
    </section>
  );
};
