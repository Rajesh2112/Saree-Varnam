import React from 'react';
import { Filter, RotateCcw, Sparkles, Check } from 'lucide-react';
import { FilterState } from '../types';
import { 
  FABRIC_CATEGORIES, 
  OCCASION_CATEGORIES, 
  CRAFT_CATEGORIES, 
  COLOR_PALETTES 
} from '../data/sareesData';

interface SareeFiltersProps {
  filters: FilterState;
  onFilterChange: (filters: FilterState) => void;
  totalCount: number;
}

export const SareeFilters: React.FC<SareeFiltersProps> = ({
  filters,
  onFilterChange,
  totalCount
}) => {
  const handleReset = () => {
    onFilterChange({
      search: '',
      fabric: 'all',
      occasion: 'all',
      craft: 'all',
      color: 'all',
      priceRange: [0, 60000],
      sortBy: 'featured'
    });
  };

  const isFiltered = 
    filters.search !== '' ||
    filters.fabric !== 'all' ||
    filters.occasion !== 'all' ||
    filters.craft !== 'all' ||
    filters.color !== 'all' ||
    filters.priceRange[1] < 60000;

  return (
    <div className="bg-[#0d0d0d] p-5 sm:p-6 rounded-2xl border border-[#262626] space-y-6 shadow-xl sticky top-24">
      {/* Header & Reset */}
      <div className="flex items-center justify-between pb-4 border-b border-[#262626]">
        <div className="flex items-center gap-2 text-white">
          <Filter className="w-4 h-4 text-[#c5a059]" />
          <h3 className="font-serif text-sm font-semibold uppercase tracking-[0.2em]">Filter Sarees</h3>
          <span className="text-[10px] font-mono font-medium text-[#c5a059] bg-[#1a1a1a] px-2 py-0.5 rounded-full border border-[#333333]">
            {totalCount}
          </span>
        </div>

        {isFiltered && (
          <button
            onClick={handleReset}
            className="flex items-center gap-1 text-[11px] font-medium text-[#c5a059] hover:text-[#d4b476] transition-colors cursor-pointer uppercase tracking-wider"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Reset</span>
          </button>
        )}
      </div>

      {/* Fabric / Saree Cluster */}
      <div className="space-y-2.5">
        <label className="text-[10px] font-semibold uppercase tracking-[0.25em] text-[#a1a1aa] block">
          Fabric & Handloom
        </label>
        <div className="flex flex-wrap gap-1.5">
          {FABRIC_CATEGORIES.map((fabric) => {
            const isSelected = filters.fabric === fabric;
            return (
              <button
                key={fabric}
                onClick={() => onFilterChange({ ...filters, fabric })}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-150 cursor-pointer ${
                  isSelected
                    ? 'bg-[#c5a059] text-black font-bold shadow-xs'
                    : 'bg-[#141414] text-[#a1a1aa] hover:text-white hover:bg-[#1c1c1c] border border-[#262626]'
                }`}
              >
                {fabric === 'all' ? 'All Silks & Weaves' : fabric}
              </button>
            );
          })}
        </div>
      </div>

      {/* Occasion Filter */}
      <div className="space-y-2.5 pt-4 border-t border-[#1f1f1f]">
        <label className="text-[10px] font-semibold uppercase tracking-[0.25em] text-[#a1a1aa] block">
          Occasion & Celebration
        </label>
        <div className="flex flex-wrap gap-1.5">
          {OCCASION_CATEGORIES.map((occasion) => {
            const isSelected = filters.occasion === occasion;
            return (
              <button
                key={occasion}
                onClick={() => onFilterChange({ ...filters, occasion })}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-150 cursor-pointer ${
                  isSelected
                    ? 'bg-[#c5a059] text-black font-bold shadow-xs'
                    : 'bg-[#141414] text-[#a1a1aa] hover:text-white hover:bg-[#1c1c1c] border border-[#262626]'
                }`}
              >
                {occasion === 'all' ? 'All Occasions' : occasion}
              </button>
            );
          })}
        </div>
      </div>

      {/* Craft Technique */}
      <div className="space-y-2.5 pt-4 border-t border-[#1f1f1f]">
        <label className="text-[10px] font-semibold uppercase tracking-[0.25em] text-[#a1a1aa] block">
          Craft & Weave Technique
        </label>
        <div className="flex flex-wrap gap-1.5">
          {CRAFT_CATEGORIES.map((craft) => {
            const isSelected = filters.craft === craft;
            return (
              <button
                key={craft}
                onClick={() => onFilterChange({ ...filters, craft })}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-150 cursor-pointer ${
                  isSelected
                    ? 'bg-[#c5a059] text-black font-bold shadow-xs'
                    : 'bg-[#141414] text-[#a1a1aa] hover:text-white hover:bg-[#1c1c1c] border border-[#262626]'
                }`}
              >
                {craft === 'all' ? 'All Techniques' : craft}
              </button>
            );
          })}
        </div>
      </div>

      {/* Color Palette Swatches */}
      <div className="space-y-2.5 pt-4 border-t border-[#1f1f1f]">
        <div className="flex items-center justify-between">
          <label className="text-[10px] font-semibold uppercase tracking-[0.25em] text-[#a1a1aa]">
            Color Vibe
          </label>
          {filters.color !== 'all' && (
            <button
              onClick={() => onFilterChange({ ...filters, color: 'all' })}
              className="text-[10px] text-[#c5a059] hover:underline uppercase tracking-wider"
            >
              Clear
            </button>
          )}
        </div>

        <div className="grid grid-cols-5 gap-2">
          {COLOR_PALETTES.map((palette) => {
            const isSelected = filters.color === palette.value;
            return (
              <button
                key={palette.value}
                onClick={() => onFilterChange({ ...filters, color: isSelected ? 'all' : palette.value })}
                className={`flex flex-col items-center gap-1 p-1.5 rounded-xl border transition-all cursor-pointer ${
                  isSelected 
                    ? 'border-[#c5a059] bg-[#1a1a1a] shadow-xs' 
                    : 'border-[#262626] hover:border-[#3f3f46] bg-[#121212]'
                }`}
                title={palette.label}
              >
                <div 
                  className="w-5 h-5 rounded-full border border-black/30 shadow-xs flex items-center justify-center"
                  style={{ backgroundColor: palette.hex }}
                >
                  {isSelected && <Check className="w-3 h-3 text-white drop-shadow-md stroke-[3]" />}
                </div>
                <span className="text-[9px] text-[#a1a1aa] truncate max-w-full text-center">
                  {palette.label.split(' ')[0]}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Price Range Slider */}
      <div className="space-y-2.5 pt-4 border-t border-[#1f1f1f]">
        <div className="flex justify-between items-center text-xs">
          <span className="text-[10px] font-semibold uppercase tracking-[0.25em] text-[#a1a1aa]">Max Price:</span>
          <span className="font-mono font-bold text-[#c5a059]">
            ₹{filters.priceRange[1].toLocaleString('en-IN')}
          </span>
        </div>
        <input
          type="range"
          min="5000"
          max="60000"
          step="2500"
          value={filters.priceRange[1]}
          onChange={(e) => onFilterChange({
            ...filters,
            priceRange: [0, parseInt(e.target.value)]
          })}
          className="w-full h-1.5 bg-[#1f1f1f] rounded-lg appearance-none cursor-pointer accent-[#c5a059]"
        />
        <div className="flex justify-between text-[10px] text-[#71717a] font-mono">
          <span>₹5,000</span>
          <span>₹60,000+</span>
        </div>
      </div>
    </div>
  );
};
