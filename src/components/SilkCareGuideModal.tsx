import React, { useState } from 'react';
import { 
  X, 
  Sparkles, 
  ShieldCheck, 
  Wind, 
  Sun, 
  Droplets, 
  AlertTriangle, 
  CheckCircle2, 
  XCircle, 
  Calendar, 
  Layers, 
  Shirt, 
  Feather, 
  HeartHandshake, 
  Copy, 
  Check, 
  FileText,
  ChevronRight,
  Flame,
  Archive
} from 'lucide-react';

interface SilkCareGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type CareTab = 'storage' | 'cleaning' | 'zari' | 'stains' | 'refolding' | 'dos-donts';

export const SilkCareGuideModal: React.FC<SilkCareGuideModalProps> = ({
  isOpen,
  onClose
}) => {
  if (!isOpen) return null;

  const [activeTab, setActiveTab] = useState<CareTab>('storage');
  const [selectedStain, setSelectedStain] = useState<string>('haldi');
  const [copied, setCopied] = useState(false);

  const handleCopySummary = () => {
    const text = `VARNAM HEIRLOOM SILK CARE MANIFESTO:
1. STORAGE: Wrap in 100% breathable unbleached muslin. Never use plastic covers. Use natural dried neem leaves.
2. REFOLDING: Change fold lines every 3 months to prevent silk yarn breakage.
3. ZARI PRESERVATION: Always fold metallic zari facing inwards. Protect from direct perfumes and moisture.
4. CLEANING: Strict professional dry cleaning only. Never soak or wring.
5. IRONING: Iron on reverse side on low silk setting with an organic cotton cloth barrier.`;
    navigator.clipboard?.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  const stainGuides: Record<string, { name: string; icon: string; severity: string; action: string; forbidden: string }> = {
    haldi: {
      name: 'Turmeric & Food Gravy (Haldi)',
      icon: '🍛',
      severity: 'High urgency — treat before oil sets',
      action: 'Immediately blot gently with an absorbent uncolored paper towel (never rub). Dust a light pinch of pure talcum powder or cornstarch to absorb oils. Leave for 15 minutes, brush off gently with soft bristle, and send to an experienced silk dry cleaner with specific notice.',
      forbidden: 'Never apply direct water, soap, or lime juice, which will permanently bind the yellow curcumin dye into silk protein fibers.'
    },
    oil: {
      name: 'Grease, Oil & Ghee',
      icon: '🧈',
      severity: 'Medium urgency',
      action: 'Sprinkle unscented talcum powder or baking soda immediately over the oil spot. Allow it to absorb grease for 30 minutes. Gently dust off with a soft cloth. Repeat if necessary. Petrol dry clean promptly.',
      forbidden: 'Do not rub vigorously or use warm water, which bakes the lipid molecules into the warp threads.'
    },
    sweat: {
      name: 'Perspiration & Underarm Marks',
      icon: '💧',
      severity: 'High urgency for zari areas',
      action: 'Air the saree in a shaded, well-ventilated room immediately after wearing for at least 12–24 hours before storing. If sweat stains the lining, spot wipe the lining only with a barely damp muslin cloth without touching the pure silk or zari.',
      forbidden: 'Never pack a damp or sweaty saree directly into the wardrobe; the acidity in perspiration oxidizes silver and corrodes pure silk protein.'
    },
    perfume: {
      name: 'Perfume, Attar & Deodorant Sprays',
      icon: '🌸',
      severity: 'Permanent chemical risk',
      action: 'Always apply your perfumes, attars, and body mists 10 minutes before wearing your saree. Allow skin to dry completely before draping. If misted accidentally, air dry under a fan.',
      forbidden: 'Never spray perfume or alcohol-based fragrances directly onto zari or silk. Alcohol strips metallic electroplating and causes black tarnishing.'
    },
    watermark: {
      name: 'Water Rings & Raindrops',
      icon: '🌧️',
      severity: 'Mild texture distortion',
      action: 'If caught in rain, gently pat with dry cotton towel. Hang flat on a padded hanger indoors under moderate fan breeze away from direct sunlight. Once completely dry, iron on lowest silk setting from the reverse with a pressing cloth.',
      forbidden: 'Never use a hot hairdryer on high heat or expose damp silk to harsh sunlight, which makes the mulberry threads brittle.'
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-in fade-in">
      <div 
        id="silk-care-guide-modal"
        className="relative bg-[#0d0d0d] rounded-3xl max-w-4xl w-full border border-[#262626] shadow-2xl overflow-hidden my-auto max-h-[92vh] flex flex-col"
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between px-5 sm:px-8 py-5 border-b border-[#262626] bg-[#0a0a0a] shrink-0">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-[#171717] text-[#c5a059] border border-[#262626] shadow-xs">
              <ShieldCheck className="w-5 h-5 text-[#c5a059]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-serif text-lg sm:text-xl font-light text-white tracking-wide">
                  Heirloom Silk & Zari Preservation Guide
                </h3>
                <span className="hidden sm:inline-block bg-[#c5a059]/20 text-[#c5a059] border border-[#c5a059]/40 text-[10px] font-mono font-bold px-2 py-0.5 rounded-full">
                  Weaver Guild Codex
                </span>
              </div>
              <p className="text-[11px] text-[#a1a1aa] font-light">
                Master artisan advice to preserve Kanjivarams, Banarasis, and Paithanis for generations
              </p>
            </div>
          </div>

          <button
            id="close-silk-care-modal-btn"
            onClick={onClose}
            className="p-2 rounded-full hover:bg-[#1a1a1a] text-[#a1a1aa] hover:text-white transition-colors cursor-pointer"
            aria-label="Close Silk Care Guide"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation Navigation Bar */}
        <div className="flex overflow-x-auto border-b border-[#262626] bg-[#0f0f0f] px-4 sm:px-8 shrink-0 no-scrollbar">
          {[
            { id: 'storage' as CareTab, label: 'Storage Codex', icon: Archive },
            { id: 'cleaning' as CareTab, label: 'Cleaning & Wash', icon: Droplets },
            { id: 'zari' as CareTab, label: 'Preserving Zari', icon: Sparkles },
            { id: 'stains' as CareTab, label: 'Stain First-Aid', icon: AlertTriangle },
            { id: 'refolding' as CareTab, label: 'Refolding Calendar', icon: Calendar },
            { id: 'dos-donts' as CareTab, label: "Do's & Don'ts", icon: CheckCircle2 },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-3.5 px-3.5 sm:px-4 text-xs font-medium uppercase tracking-wider flex items-center gap-2 border-b-2 whitespace-nowrap transition-all cursor-pointer ${
                  isActive
                    ? 'border-[#c5a059] text-[#c5a059] font-bold bg-[#141414]'
                    : 'border-transparent text-[#a1a1aa] hover:text-white hover:bg-[#121212]'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-[#c5a059]' : 'text-[#71717a]'}`} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Scrollable Content Body */}
        <div className="p-5 sm:p-8 overflow-y-auto space-y-6">

          {/* TAB 1: STORAGE CODEX */}
          {activeTab === 'storage' && (
            <div className="space-y-6 animate-in fade-in">
              <div className="bg-[#121212] rounded-2xl border border-[#262626] overflow-hidden">
                <div className="relative h-40 sm:h-48 w-full bg-[#171717]">
                  <img
                    src="https://images.unsplash.com/photo-1583391733975-081045952d76?auto=format&fit=crop&w=1200&q=80"
                    alt="Muslin Storage Wrap"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover brightness-75"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#121212] via-black/40 to-transparent flex flex-col justify-end p-5 sm:p-6">
                    <div className="flex items-center gap-2 text-[#c5a059]">
                      <Archive className="w-5 h-5" />
                      <h4 className="font-serif text-lg sm:text-xl font-medium text-white">
                        Golden Rules for Saree Wardrobe Storage
                      </h4>
                    </div>
                    <p className="text-xs text-[#d4d4d8] font-light leading-relaxed max-w-2xl mt-1">
                      Pure mulberry and Katan silks are living, natural protein fibers that require air circulation to retain their natural luster and tensile strength.
                    </p>
                  </div>
                </div>

                <div className="p-5 sm:p-6 pt-3 space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="p-4 bg-[#171717] rounded-xl border border-[#262626] space-y-2">
                      <span className="text-[10px] uppercase font-bold text-[#c5a059] tracking-wider block">
                        1. Muslin Wrap Only
                      </span>
                      <h5 className="font-serif text-sm text-white font-medium">Breathe in Pure Cotton</h5>
                      <p className="text-xs text-[#a1a1aa] font-light leading-relaxed">
                        Always wrap each saree individually in unbleached pure cotton muslin (mulmul) or an old washed white cotton dhoti. Muslin permits air passage while filtering out airborne dust and light moisture.
                      </p>
                    </div>

                    <div className="p-4 bg-[#171717] rounded-xl border border-[#262626] space-y-2">
                      <span className="text-[10px] uppercase font-bold text-[#f87171] tracking-wider block">
                        2. Never Use Plastic
                      </span>
                      <h5 className="font-serif text-sm text-white font-medium">Trap of Moisture & Heat</h5>
                      <p className="text-xs text-[#a1a1aa] font-light leading-relaxed">
                        Synthetic PVC zippered bags trap microscopic humidity, promoting fungal mildew and causing silver zari electroplating to tarnish into dull black oxides.
                      </p>
                    </div>

                    <div className="p-4 bg-[#171717] rounded-xl border border-[#262626] space-y-2">
                      <span className="text-[10px] uppercase font-bold text-[#4ade80] tracking-wider block">
                        3. Natural Botanicals
                      </span>
                      <h5 className="font-serif text-sm text-white font-medium">Neem & Cedar Defense</h5>
                      <p className="text-xs text-[#a1a1aa] font-light leading-relaxed">
                        Place dried organic neem leaves, whole cloves, or cedar wood blocks inside the wardrobe shelves. Never place synthetic chemical naphthalene or mothballs directly on the silk.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Hangers vs Stacking Guide */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-5 bg-[#121212] rounded-2xl border border-[#262626] space-y-2.5">
                  <div className="flex items-center gap-2 text-white">
                    <Layers className="w-4 h-4 text-[#c5a059]" />
                    <h5 className="font-serif text-sm font-semibold">Flat Horizontal Stacking (Recommended)</h5>
                  </div>
                  <p className="text-xs text-[#a1a1aa] font-light leading-relaxed">
                    Stack heavy bridal Kanjivarams and Banarasis horizontally on flat wooden shelves, with a maximum of 3–4 sarees per pile. Place the heaviest saree at the bottom and lighter silks on top to prevent excessive gravitational crease pressure.
                  </p>
                </div>

                <div className="p-5 bg-[#121212] rounded-2xl border border-[#262626] space-y-2.5">
                  <div className="flex items-center gap-2 text-white">
                    <Shirt className="w-4 h-4 text-[#c5a059]" />
                    <h5 className="font-serif text-sm font-semibold">Hanger Care (If Hanging)</h5>
                  </div>
                  <p className="text-xs text-[#a1a1aa] font-light leading-relaxed">
                    Never use thin wire or plain iron hangers, which rust and cut the shoulder crease. Use broad wooden hangers wrapped in cotton batting. Ensure heavy pallus do not drag and distort the warp alignment over time.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: CLEANING METHODS */}
          {activeTab === 'cleaning' && (
            <div className="space-y-6 animate-in fade-in">
              <div className="bg-[#121212] rounded-2xl border border-[#262626] overflow-hidden">
                <div className="relative h-40 sm:h-48 w-full bg-[#171717]">
                  <img
                    src="https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=1200&q=80"
                    alt="Master Cleaning Protocol"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover brightness-75"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#121212] via-black/40 to-transparent flex flex-col justify-end p-5 sm:p-6">
                    <div className="flex items-center gap-2 text-[#c5a059]">
                      <Droplets className="w-5 h-5" />
                      <h4 className="font-serif text-lg sm:text-xl font-medium text-white">
                        Master Cleaning & Laundering Protocols
                      </h4>
                    </div>
                    <p className="text-xs text-[#d4d4d8] font-light leading-relaxed max-w-2xl mt-1">
                      Handloom pure silks and genuine zari are dyed using delicate mordants and botanical pigments.
                    </p>
                  </div>
                </div>

                <div className="p-5 sm:p-6 pt-3 space-y-3">
                  <div className="p-4 bg-[#171717] rounded-xl border border-[#262626] flex items-start gap-3.5">
                    <div className="p-2 rounded-lg bg-[#14532d]/40 text-[#4ade80] border border-[#22c55e]/30 shrink-0">
                      <ShieldCheck className="w-4 h-4" />
                    </div>
                    <div className="space-y-1">
                      <h5 className="font-serif text-sm text-white font-medium">Professional Petrol Dry Clean (Mandatory for First 3–4 Wears)</h5>
                      <p className="text-xs text-[#a1a1aa] font-light leading-relaxed">
                        Entrust your saree only to specialized dry cleaners who use hydrocarbon or gentle petrol-based solvents. Always explicitly instruct them to avoid heavy industrial steam pressing directly on delicate gold zari surfaces.
                      </p>
                    </div>
                  </div>

                  <div className="p-4 bg-[#171717] rounded-xl border border-[#262626] flex items-start gap-3.5">
                    <div className="p-2 rounded-lg bg-[#1a1a1a] text-[#c5a059] border border-[#333333] shrink-0">
                      <Wind className="w-4 h-4" />
                    </div>
                    <div className="space-y-1">
                      <h5 className="font-serif text-sm text-white font-medium">Post-Event Airing Ritual</h5>
                      <p className="text-xs text-[#a1a1aa] font-light leading-relaxed">
                        Do not dry clean your saree after every single wear. Instead, air the saree indoors across a soft cotton sheet under a ceiling fan for 24 hours to evaporate body moisture. Dry clean only when visibly stained or every 3–4 occasions.
                      </p>
                    </div>
                  </div>

                  <div className="p-4 bg-[#171717] rounded-xl border border-[#262626] flex items-start gap-3.5">
                    <div className="p-2 rounded-lg bg-[#7f1d1d]/40 text-[#f87171] border border-[#ef4444]/30 shrink-0">
                      <Flame className="w-4 h-4" />
                    </div>
                    <div className="space-y-1">
                      <h5 className="font-serif text-sm text-white font-medium">Ironing & Steaming Precautions</h5>
                      <p className="text-xs text-[#a1a1aa] font-light leading-relaxed">
                        Always iron from the reverse side using the lowest Silk/Synthetic heat setting. Place a clean, unprinted white cotton cloth or butter paper between the iron base and the saree. Never spray water droplets while ironing, as they can cause watermarks.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: PRESERVING ZARI */}
          {activeTab === 'zari' && (
            <div className="space-y-6 animate-in fade-in">
              <div className="bg-[#121212] rounded-2xl border border-[#262626] overflow-hidden">
                <div className="relative h-40 sm:h-48 w-full bg-[#171717]">
                  <img
                    src="https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1200&q=80"
                    alt="Gold & Silver Zari Preservation"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover brightness-75"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#121212] via-black/40 to-transparent flex flex-col justify-end p-5 sm:p-6">
                    <div className="flex items-center gap-2 text-[#c5a059]">
                      <Sparkles className="w-5 h-5" />
                      <h4 className="font-serif text-lg sm:text-xl font-medium text-white">
                        Protecting Pure Gold & Silver Zari From Oxidation
                      </h4>
                    </div>
                    <p className="text-xs text-[#d4d4d8] font-light leading-relaxed max-w-2xl mt-1">
                      Authentic Kanjivaram and Banarasi sarees feature pure silver metallic thread electroplated with 24-karat gold.
                    </p>
                  </div>
                </div>

                <div className="p-5 sm:p-6 pt-3 space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 bg-[#171717] rounded-xl border border-[#262626] space-y-2">
                      <span className="text-[10px] uppercase font-bold text-[#c5a059] tracking-wider block">
                        Rule 1: Inward Folding
                      </span>
                      <h5 className="font-serif text-sm text-white font-medium">Fold Zari Inward Facing</h5>
                      <p className="text-xs text-[#a1a1aa] font-light leading-relaxed">
                        Always fold the saree so that the rich metallic zari border and pallu face the interior, with the plain body silk shielding it from external light, friction, and environmental air contact.
                      </p>
                    </div>

                    <div className="p-4 bg-[#171717] rounded-xl border border-[#262626] space-y-2">
                      <span className="text-[10px] uppercase font-bold text-[#c5a059] tracking-wider block">
                        Rule 2: Butter Paper Inlay
                      </span>
                      <h5 className="font-serif text-sm text-white font-medium">Acid-Free Tissue Barriers</h5>
                      <p className="text-xs text-[#a1a1aa] font-light leading-relaxed">
                        For heavy bridal pallus, insert a sheet of acid-free butter paper or sulfur-free tissue paper between the folds. This eliminates friction and stops microscopic thread snagging.
                      </p>
                    </div>

                    <div className="p-4 bg-[#171717] rounded-xl border border-[#262626] space-y-2">
                      <span className="text-[10px] uppercase font-bold text-[#f87171] tracking-wider block">
                        Rule 3: Perfume & Jewelry Caution
                      </span>
                      <h5 className="font-serif text-sm text-white font-medium">Zero Direct Chemical Contact</h5>
                      <p className="text-xs text-[#a1a1aa] font-light leading-relaxed">
                        Spray body mists, hairsprays, and perfumes before wearing your saree. Direct fragrance mist contains alcohol and synthetic fixatives that cause irreversible black oxidation spots on silver threads.
                      </p>
                    </div>

                    <div className="p-4 bg-[#171717] rounded-xl border border-[#262626] space-y-2">
                      <span className="text-[10px] uppercase font-bold text-[#4ade80] tracking-wider block">
                        Rule 4: Desiccant Humidity Control
                      </span>
                      <h5 className="font-serif text-sm text-white font-medium">Silica Gel Packets in Wardrobe</h5>
                      <p className="text-xs text-[#a1a1aa] font-light leading-relaxed">
                        Place food-grade silica gel pouches in the corners of your saree shelves (without letting them directly touch the silk) to soak up atmospheric humidity during monsoon seasons.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: STAIN RESCUE PROTOCOL */}
          {activeTab === 'stains' && (
            <div className="space-y-6 animate-in fade-in">
              <div className="bg-[#121212] rounded-2xl border border-[#262626] overflow-hidden">
                <div className="relative h-40 sm:h-48 w-full bg-[#171717]">
                  <img
                    src="https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=1200&q=80"
                    alt="Stain First Aid"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover brightness-75"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#121212] via-black/40 to-transparent flex flex-col justify-end p-5 sm:p-6">
                    <div className="flex items-center gap-2 text-[#c5a059]">
                      <AlertTriangle className="w-5 h-5" />
                      <h4 className="font-serif text-lg sm:text-xl font-medium text-white">
                        Emergency Saree Stain First-Aid Lookup
                      </h4>
                    </div>
                    <p className="text-xs text-[#d4d4d8] font-light leading-relaxed max-w-2xl mt-1">
                      Accidents happen at festive weddings and grand celebrations. Act calmly and follow these weaver-tested emergency steps immediately.
                    </p>
                  </div>
                </div>

                <div className="p-5 sm:p-6 pt-3 space-y-4">
                  {/* Stain Selector Buttons */}
                  <div className="flex flex-wrap gap-2">
                    {Object.entries(stainGuides).map(([key, item]) => (
                      <button
                        key={key}
                        onClick={() => setSelectedStain(key)}
                        className={`px-3 py-2 rounded-xl text-xs font-medium flex items-center gap-2 transition-all cursor-pointer border ${
                          selectedStain === key
                            ? 'bg-[#c5a059]/20 text-[#c5a059] border-[#c5a059] font-bold shadow-xs'
                            : 'bg-[#171717] text-[#a1a1aa] hover:text-white border-[#262626] hover:bg-[#212121]'
                        }`}
                      >
                        <span>{item.icon}</span>
                        <span>{item.name.split(' ')[0]}</span>
                      </button>
                    ))}
                  </div>

                  {/* Selected Stain First-Aid Card */}
                  {stainGuides[selectedStain] && (
                    <div className="p-5 bg-[#171717] rounded-2xl border border-[#262626] space-y-4 animate-in fade-in">
                      <div className="flex items-center justify-between border-b border-[#262626] pb-3">
                        <div className="flex items-center gap-2">
                          <span className="text-2xl">{stainGuides[selectedStain].icon}</span>
                          <div>
                            <h5 className="font-serif text-base text-white font-medium">
                              {stainGuides[selectedStain].name}
                            </h5>
                            <span className="text-[10px] font-mono text-[#c5a059]">
                              {stainGuides[selectedStain].severity}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-3">
                        <div className="p-3.5 bg-[#14532d]/20 border border-[#22c55e]/30 rounded-xl space-y-1">
                          <div className="flex items-center gap-1.5 text-[#4ade80] text-xs font-bold uppercase tracking-wider">
                            <CheckCircle2 className="w-3.5 h-3.5" /> What You SHOULD Do Immediately:
                          </div>
                          <p className="text-xs text-[#d4d4d8] font-light leading-relaxed">
                            {stainGuides[selectedStain].action}
                          </p>
                        </div>

                        <div className="p-3.5 bg-[#7f1d1d]/20 border border-[#ef4444]/30 rounded-xl space-y-1">
                          <div className="flex items-center gap-1.5 text-[#f87171] text-xs font-bold uppercase tracking-wider">
                            <XCircle className="w-3.5 h-3.5" /> What is STRICTLY FORBIDDEN:
                          </div>
                          <p className="text-xs text-[#fca5a5] font-light leading-relaxed">
                            {stainGuides[selectedStain].forbidden}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* TAB 5: REFOLDING CALENDAR */}
          {activeTab === 'refolding' && (
            <div className="space-y-6 animate-in fade-in">
              <div className="bg-[#121212] rounded-2xl border border-[#262626] overflow-hidden">
                <div className="relative h-40 sm:h-48 w-full bg-[#171717]">
                  <img
                    src="https://images.unsplash.com/photo-1596783049554-0557973059b1?auto=format&fit=crop&w=1200&q=80"
                    alt="Refolding Calendar"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover brightness-75"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#121212] via-black/40 to-transparent flex flex-col justify-end p-5 sm:p-6">
                    <div className="flex items-center gap-2 text-[#c5a059]">
                      <Calendar className="w-5 h-5" />
                      <h4 className="font-serif text-lg sm:text-xl font-medium text-white">
                        The 3-Month Crease Inversion Routine
                      </h4>
                    </div>
                    <p className="text-xs text-[#d4d4d8] font-light leading-relaxed max-w-2xl mt-1">
                      Silk fibers left folded along the exact same line for over 6 months will weaken along the creases.
                    </p>
                  </div>
                </div>

                <div className="p-5 sm:p-6 pt-3 space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
                    <div className="p-4 bg-[#171717] rounded-xl border border-[#262626] space-y-2">
                      <span className="text-[10px] uppercase font-mono font-bold text-[#c5a059] bg-[#1a1a1a] px-2 py-0.5 rounded border border-[#333333]">
                        Quarter 1 • Jan-Mar
                      </span>
                      <h5 className="font-serif text-sm text-white font-medium">Post-Winter Unfurl</h5>
                      <p className="text-xs text-[#a1a1aa] font-light leading-relaxed">
                        Unfold completely on a clean bedsheet. Gently shake out and re-fold along perpendicular lines to change crease pressure points.
                      </p>
                    </div>

                    <div className="p-4 bg-[#171717] rounded-xl border border-[#262626] space-y-2">
                      <span className="text-[10px] uppercase font-mono font-bold text-[#c5a059] bg-[#1a1a1a] px-2 py-0.5 rounded border border-[#333333]">
                        Quarter 2 • Apr-Jun
                      </span>
                      <h5 className="font-serif text-sm text-white font-medium">Pre-Monsoon Airing</h5>
                      <p className="text-xs text-[#a1a1aa] font-light leading-relaxed">
                        Air in a shaded room for 4 hours before the rainy season begins. Replace worn dried neem leaf sachets with fresh ones.
                      </p>
                    </div>

                    <div className="p-4 bg-[#171717] rounded-xl border border-[#262626] space-y-2">
                      <span className="text-[10px] uppercase font-mono font-bold text-[#c5a059] bg-[#1a1a1a] px-2 py-0.5 rounded border border-[#333333]">
                        Quarter 3 • Jul-Sep
                      </span>
                      <h5 className="font-serif text-sm text-white font-medium">Monsoon Humidity Check</h5>
                      <p className="text-xs text-[#a1a1aa] font-light leading-relaxed">
                        Inspect wardrobe shelves for dampness. Verify that silica desiccants are active and muslin wrappings remain crisp and dry.
                      </p>
                    </div>

                    <div className="p-4 bg-[#171717] rounded-xl border border-[#262626] space-y-2">
                      <span className="text-[10px] uppercase font-mono font-bold text-[#c5a059] bg-[#1a1a1a] px-2 py-0.5 rounded border border-[#333333]">
                        Quarter 4 • Oct-Dec
                      </span>
                      <h5 className="font-serif text-sm text-white font-medium">Festive Trousseau Prep</h5>
                      <p className="text-xs text-[#a1a1aa] font-light leading-relaxed">
                        Gentle reverse iron with low heat for wedding and Diwali draping. Inspect fall & pico stitching for edge longevity.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 6: DO'S & DON'TS QUICK CHECKLIST */}
          {activeTab === 'dos-donts' && (
            <div className="space-y-6 animate-in fade-in">
              <div className="bg-[#121212] rounded-2xl border border-[#262626] overflow-hidden mb-5">
                <div className="relative h-36 sm:h-44 w-full bg-[#171717]">
                  <img
                    src="https://images.unsplash.com/photo-1609357605129-26f69add5d6e?auto=format&fit=crop&w=1200&q=80"
                    alt="Dos and Donts Master Guidelines"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover brightness-75"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#121212] via-black/40 to-transparent flex flex-col justify-end p-5 sm:p-6">
                    <div className="flex items-center gap-2 text-[#c5a059]">
                      <CheckCircle2 className="w-5 h-5" />
                      <h4 className="font-serif text-lg sm:text-xl font-medium text-white">
                        Preservation Commandment Matrix
                      </h4>
                    </div>
                    <p className="text-xs text-[#d4d4d8] font-light leading-relaxed max-w-2xl mt-1">
                      Quick rules summary formulated with South Indian and Varanasi master weaver guilds.
                    </p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {/* DO's */}
                <div className="p-5 bg-[#121212] rounded-2xl border border-[#22c55e]/30 space-y-3">
                  <div className="flex items-center gap-2 text-[#4ade80]">
                    <CheckCircle2 className="w-5 h-5" />
                    <h4 className="font-serif text-base font-semibold text-white">
                      The Heirloom DO's
                    </h4>
                  </div>
                  <ul className="space-y-2.5 text-xs text-[#d4d4d8] font-light">
                    <li className="flex items-start gap-2">
                      <span className="text-[#4ade80] font-bold">✓</span>
                      <span>Wrap in breathable unbleached pure cotton muslin (mulmul) bags.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#4ade80] font-bold">✓</span>
                      <span>Fold zari inwards to shield precious metallic threads from friction.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#4ade80] font-bold">✓</span>
                      <span>Air in a shaded, well-ventilated room under a fan after each event.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#4ade80] font-bold">✓</span>
                      <span>Change the fold lines every 3 to 4 months to prevent crease snapping.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#4ade80] font-bold">✓</span>
                      <span>Use organic dried neem leaves or cedar blocks as natural insect repellents.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#4ade80] font-bold">✓</span>
                      <span>Always iron from the reverse side with a clean cotton pressing cloth.</span>
                    </li>
                  </ul>
                </div>

                {/* DON'TS */}
                <div className="p-5 bg-[#121212] rounded-2xl border border-[#ef4444]/30 space-y-3">
                  <div className="flex items-center gap-2 text-[#f87171]">
                    <XCircle className="w-5 h-5" />
                    <h4 className="font-serif text-base font-semibold text-white">
                      The Forbidden DON'TS
                    </h4>
                  </div>
                  <ul className="space-y-2.5 text-xs text-[#fca5a5] font-light">
                    <li className="flex items-start gap-2">
                      <span className="text-[#f87171] font-bold">✗</span>
                      <span>Never store in plastic or nylon zippered bags that trap humidity.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#f87171] font-bold">✗</span>
                      <span>Never spray perfumes, attars, or deodorants directly onto zari.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#f87171] font-bold">✗</span>
                      <span>Never dry in direct, harsh midday sunlight; it bleaches natural silk dyes.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#f87171] font-bold">✗</span>
                      <span>Never use corrosive chemical mothballs or naphthalene on silk fabrics.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#f87171] font-bold">✗</span>
                      <span>Never machine wash or wring pure silk sarees like ordinary garments.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#f87171] font-bold">✗</span>
                      <span>Never hang on rusty metal or thin wire hangers that cut shoulder warp.</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          )}

          {/* Bottom Quick-Action Bar */}
          <div className="p-4 bg-[#141414] rounded-2xl border border-[#262626] flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
            <div className="space-y-0.5">
              <p className="text-xs font-medium text-white flex items-center justify-center sm:justify-start gap-1.5">
                <FileText className="w-3.5 h-3.5 text-[#c5a059]" />
                Keep these tips handy in your wardrobe note
              </p>
              <p className="text-[11px] text-[#71717a] font-light">
                Copy our comprehensive silk care manifesto to your clipboard.
              </p>
            </div>

            <button
              onClick={handleCopySummary}
              className="px-4 py-2 bg-[#171717] hover:bg-[#212121] border border-[#333333] hover:border-[#c5a059] text-[#e5e5e5] text-xs font-semibold rounded-xl transition-colors cursor-pointer flex items-center gap-1.5 shrink-0"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-[#4ade80]" /> : <Copy className="w-3.5 h-3.5 text-[#c5a059]" />}
              <span>{copied ? 'Manifesto Copied!' : 'Copy Care Manifesto'}</span>
            </button>
          </div>

        </div>

        {/* Modal Footer */}
        <div className="p-4 sm:p-5 border-t border-[#262626] bg-[#0a0a0a] flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2 text-xs text-[#71717a] font-light">
            <Sparkles className="w-4 h-4 text-[#c5a059]" />
            <span>Passed down through 5 generations of Kanchipuram & Varanasi master weavers</span>
          </div>

          <button
            onClick={onClose}
            className="px-6 py-2.5 bg-[#c5a059] hover:bg-[#d4b476] text-black text-xs font-bold uppercase tracking-wider rounded-xl transition-all cursor-pointer shadow-xs"
          >
            Understood
          </button>
        </div>

      </div>
    </div>
  );
};
