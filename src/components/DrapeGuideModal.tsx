import React, { useState } from 'react';
import { X, BookOpen, Check, ArrowRight, ArrowLeft, Lightbulb, Sparkles } from 'lucide-react';
import { DRAPING_GUIDE_STEPS } from '../data/sareesData';

interface DrapeGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DrapeGuideModal: React.FC<DrapeGuideModalProps> = ({
  isOpen,
  onClose
}) => {
  const [activeStepIndex, setActiveStepIndex] = useState(0);
  const [selectedStyle, setSelectedStyle] = useState<'nivi' | 'bengali' | 'gujarati' | 'belted'>('nivi');

  if (!isOpen) return null;

  const currentStep = DRAPING_GUIDE_STEPS[activeStepIndex];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-in fade-in">
      <div 
        id="drape-guide-modal-container"
        className="relative bg-[#0d0d0d] rounded-3xl max-w-3xl w-full border border-[#262626] shadow-2xl overflow-hidden my-auto max-h-[92vh] flex flex-col"
      >
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#262626] bg-[#0a0a0a] shrink-0">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-[#171717] text-[#c5a059] border border-[#262626]">
              <BookOpen className="w-5 h-5 text-[#c5a059]" />
            </div>
            <div>
              <h3 className="font-serif text-lg font-light text-white tracking-wide">Saree Draping Masterclass</h3>
              <p className="text-[11px] text-[#71717a]">Step-by-step master guide for flawless 6-yard drapes</p>
            </div>
          </div>

          <button
            id="close-drape-guide-btn"
            onClick={onClose}
            className="p-2 rounded-full hover:bg-[#1a1a1a] text-[#a1a1aa] hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Drape Style Selector Tabs */}
        <div className="px-6 py-3 bg-[#121212] border-b border-[#262626] flex gap-2 overflow-x-auto shrink-0">
          {[
            { id: 'nivi', label: 'Classic Nivi Drape (Universal)' },
            { id: 'bengali', label: 'Royal Bengali Athpourey' },
            { id: 'gujarati', label: 'Gujarati Seedha Pallu' },
            { id: 'belted', label: 'Contemporary Belted Drape' }
          ].map((style) => (
            <button
              key={style.id}
              onClick={() => {
                setSelectedStyle(style.id as any);
                setActiveStepIndex(0);
              }}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                selectedStyle === style.id
                  ? 'bg-[#c5a059] text-black shadow-xs'
                  : 'bg-[#171717] text-[#a1a1aa] hover:text-white border border-[#262626]'
              }`}
            >
              {style.label}
            </button>
          ))}
        </div>

        {/* Modal Scroll Body */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6">
          
          {/* Step Progress Tracker */}
          <div className="grid grid-cols-6 gap-2">
            {DRAPING_GUIDE_STEPS.map((s, idx) => (
              <button
                key={s.step}
                onClick={() => setActiveStepIndex(idx)}
                className={`py-2 px-1 text-center rounded-xl border transition-all cursor-pointer ${
                  activeStepIndex === idx
                    ? 'bg-[#c5a059] text-black border-[#c5a059] font-bold shadow-xs'
                    : idx < activeStepIndex
                    ? 'bg-[#1a1a1a] text-[#4ade80] border-[#262626] font-medium'
                    : 'bg-[#121212] text-[#71717a] border-[#262626]'
                }`}
              >
                <span className="text-[10px] uppercase font-mono block">Step {s.step}</span>
              </button>
            ))}
          </div>

          {/* Active Step Card */}
          <div className="p-6 bg-[#121212] rounded-2xl border border-[#262626] space-y-4 animate-in fade-in">
            <div className="flex items-center justify-between border-b border-[#262626] pb-3">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#c5a059]">
                  Step {currentStep.step} of 6
                </span>
                <h4 className="font-serif text-xl sm:text-2xl font-light text-white mt-0.5">
                  {currentStep.title}
                </h4>
                <p className="text-xs text-[#a1a1aa] font-light mt-0.5">
                  {currentStep.subtitle}
                </p>
              </div>

              <div className="w-12 h-12 rounded-2xl bg-[#171717] border border-[#333333] text-[#c5a059] font-mono font-bold text-xl flex items-center justify-center shadow-sm">
                0{currentStep.step}
              </div>
            </div>

            {/* Step Visual & Description */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-center">
              {currentStep.image && (
                <div className="md:col-span-5 relative h-48 md:h-52 rounded-xl overflow-hidden border border-[#262626] bg-[#171717] group">
                  <img
                    src={currentStep.image}
                    alt={currentStep.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 brightness-95"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-2.5">
                    <span className="text-[10px] text-[#c5a059] font-medium tracking-wide">
                      Illustration • Step {currentStep.step}
                    </span>
                  </div>
                </div>
              )}

              <div className={`${currentStep.image ? 'md:col-span-7' : 'md:col-span-12'} space-y-3.5`}>
                <p className="text-sm text-[#e5e5e5] leading-relaxed font-light">
                  {currentStep.description}
                </p>

                {/* Stylist Pro Tip Box */}
                <div className="p-3.5 bg-[#171717] rounded-xl border border-[#262626] flex gap-3 items-start">
                  <div className="p-1 rounded bg-[#212121] text-[#c5a059] shrink-0 mt-0.5">
                    <Lightbulb className="w-4 h-4" />
                  </div>
                  <div className="space-y-0.5">
                    <span className="text-[10px] font-bold text-[#c5a059] uppercase tracking-wider block">
                      Artisan Stylist Secret:
                    </span>
                    <p className="text-xs text-[#a1a1aa] leading-relaxed font-light">
                      {currentStep.tip}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Golden Rules Checklist */}
          <div className="p-4 bg-[#121212] rounded-2xl border border-[#262626] space-y-2.5">
            <h5 className="text-xs font-bold uppercase tracking-[0.2em] text-[#e5e5e5] flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-[#c5a059]" />
              The 3 Golden Rules for Saree Longevity:
            </h5>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-xs text-[#a1a1aa]">
              <div className="p-2.5 bg-[#171717] rounded-lg border border-[#262626]">
                <strong className="text-white block font-medium">1. Shapewear Fit</strong>
                Ensure the drawstring is tied firmly at the natural waist before tucking.
              </div>
              <div className="p-2.5 bg-[#171717] rounded-lg border border-[#262626]">
                <strong className="text-white block font-medium">2. Horizontal Pinning</strong>
                Vertical pins tend to pull threads; horizontal pins lock cleanly without tearing zari.
              </div>
              <div className="p-2.5 bg-[#171717] rounded-lg border border-[#262626]">
                <strong className="text-white block font-medium">3. Muslin Storage</strong>
                Refold silk sarees every 4 months along different lines to preserve tensile strength.
              </div>
            </div>
          </div>

        </div>

        {/* Modal Navigation Footer */}
        <div className="p-4 sm:p-5 border-t border-[#262626] bg-[#0a0a0a] flex items-center justify-between shrink-0">
          <button
            onClick={() => setActiveStepIndex(Math.max(0, activeStepIndex - 1))}
            disabled={activeStepIndex === 0}
            className={`flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
              activeStepIndex === 0
                ? 'opacity-30 cursor-not-allowed text-[#71717a]'
                : 'bg-[#171717] text-[#c5a059] hover:bg-[#262626] border border-[#333333]'
            }`}
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Previous</span>
          </button>

          <span className="text-xs text-[#71717a] font-mono">
            {activeStepIndex + 1} / 6
          </span>

          {activeStepIndex < DRAPING_GUIDE_STEPS.length - 1 ? (
            <button
              onClick={() => setActiveStepIndex(activeStepIndex + 1)}
              className="flex items-center gap-1.5 px-5 py-2.5 bg-[#c5a059] hover:bg-[#d4b476] text-black rounded-xl text-xs font-bold uppercase tracking-wider transition-all shadow-xs cursor-pointer"
            >
              <span>Next Step</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              onClick={onClose}
              className="flex items-center gap-1.5 px-5 py-2.5 bg-[#14532d] hover:bg-[#15803d] text-[#4ade80] rounded-xl text-xs font-bold uppercase tracking-wider transition-all shadow-xs cursor-pointer border border-[#22c55e]/30"
            >
              <Check className="w-4 h-4" />
              <span>Ready to Drape!</span>
            </button>
          )}
        </div>

      </div>
    </div>
  );
};
