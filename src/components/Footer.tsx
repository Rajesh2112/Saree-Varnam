import React, { useState } from 'react';
import { ShieldCheck, Sparkles, Send, Check, Phone, Clock, Moon, Sun } from 'lucide-react';
import { ThemeMode } from '../types';

interface FooterProps {
  onOpenDrapeGuide: () => void;
  onOpenFinder: () => void;
  onOpenOrderTracking: () => void;
  onOpenSilkCare: () => void;
  onSelectCategory: (fabric: string) => void;
  theme?: ThemeMode;
  onToggleTheme?: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onOpenDrapeGuide,
  onOpenFinder,
  onOpenOrderTracking,
  onOpenSilkCare,
  onSelectCategory,
  theme = 'midnight',
  onToggleTheme
}) => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setTimeout(() => {
        setEmail('');
      }, 3000);
    }
  };

  return (
    <footer className="bg-[#050505] text-[#e5e5e5] pt-16 pb-12 border-t border-[#262626]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Newsletter Callout Banner */}
        <div className="p-8 rounded-3xl bg-[#0d0d0d] border border-[#262626] mb-14 text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-6 shadow-2xl">
          <div className="space-y-1.5 max-w-md">
            <span className="text-[10px] font-bold text-[#c5a059] uppercase tracking-[0.25em] flex items-center gap-1.5 justify-center sm:justify-start">
              <Sparkles className="w-3.5 h-3.5" />
              Exclusive Guild Invitation
            </span>
            <h3 className="font-serif text-xl sm:text-2xl font-light text-white tracking-wide">
              Unlock 10% Off Your First Heritage Saree
            </h3>
            <p className="text-xs text-[#a1a1aa] font-light">
              Get early access to limited bridal drops, seasonal handloom exhibitions, and drape styling tips.
            </p>
          </div>

          <div className="w-full sm:w-auto">
            {subscribed ? (
              <div className="bg-[#14532d]/40 border border-[#22c55e]/30 text-[#4ade80] px-5 py-3 rounded-xl text-xs font-mono font-medium flex items-center gap-2">
                <Check className="w-4 h-4" />
                <span>Subscribed! Use code <strong>FIRST10</strong> for 10% off.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex gap-2 w-full max-w-md">
                <input
                  type="email"
                  placeholder="Enter your email address..."
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="bg-[#171717] border border-[#262626] rounded-xl px-4 py-3 text-xs text-white placeholder-[#71717a] focus:outline-none focus:border-[#c5a059] w-full sm:w-64"
                />
                <button
                  type="submit"
                  className="px-5 py-3 bg-[#c5a059] hover:bg-[#d4b476] text-black text-xs font-bold uppercase tracking-wider rounded-xl transition-colors shrink-0 flex items-center gap-1.5 cursor-pointer shadow-md"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Join</span>
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Main Footer Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 pb-12 border-b border-[#1f1f1f]">
          
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2">
              <span className="font-serif text-2xl font-light tracking-[0.25em] text-[#c5a059]">
                VARNAM
              </span>
              <span className="text-[10px] text-[#71717a] border border-[#262626] px-1.5 py-0.5 rounded font-mono uppercase">
                Est. 1984
              </span>
            </div>

            <p className="text-xs text-[#a1a1aa] leading-relaxed max-w-sm font-light">
              Celebrating six yards of India's richest handloom artistry. Certified pure silks from master weaver guilds across Kanchipuram, Varanasi, Chanderi, and Patan.
            </p>

            <div className="flex items-center gap-2 text-xs text-[#a1a1aa] pt-2">
              <ShieldCheck className="w-4 h-4 text-[#4ade80]" />
              <span>Silk Mark Certified Handloom Authenticity Guarantee</span>
            </div>

            <div className="flex items-center gap-3 pt-2 text-xs text-[#71717a]">
              <span className="flex items-center gap-1 font-mono">
                <Phone className="w-3.5 h-3.5 text-[#c5a059]" />
                +91 98765 43210
              </span>
              <span>•</span>
              <span className="flex items-center gap-1 font-mono">
                <Clock className="w-3.5 h-3.5 text-[#c5a059]" />
                10 AM - 8 PM IST
              </span>
            </div>
          </div>

          {/* Quick Categories */}
          <div className="space-y-3">
            <h4 className="font-serif text-xs font-semibold text-[#c5a059] uppercase tracking-[0.2em]">
              Heritage Weaves
            </h4>
            <ul className="space-y-2 text-xs text-[#a1a1aa] font-light">
              {['Kanjivaram Silk', 'Banarasi Silk', 'Organza', 'Chanderi', 'Paithani Silk', 'Patola Silk'].map((cat) => (
                <li key={cat}>
                  <button
                    onClick={() => {
                      onSelectCategory(cat);
                      document.getElementById('collection-section')?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="hover:text-[#c5a059] transition-colors cursor-pointer"
                  >
                    {cat}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Customer Care & Styling Services */}
          <div className="space-y-3">
            <h4 className="font-serif text-xs font-semibold text-[#c5a059] uppercase tracking-[0.2em]">
              Styling & Services
            </h4>
            <ul className="space-y-2 text-xs text-[#a1a1aa] font-light">
              <li>
                <button onClick={onOpenOrderTracking} className="text-[#c5a059] hover:text-[#e8c87c] font-medium transition-colors cursor-pointer flex items-center gap-1">
                  <span>Track Saree Journey</span>
                  <span className="text-[9px] bg-[#c5a059]/20 text-[#c5a059] border border-[#c5a059]/40 px-1.5 py-0.2 rounded font-mono">Live</span>
                </button>
              </li>
              <li>
                <button onClick={onOpenDrapeGuide} className="hover:text-[#c5a059] transition-colors cursor-pointer">
                  6-Step Drape Masterclass
                </button>
              </li>
              <li>
                <button onClick={onOpenFinder} className="hover:text-[#c5a059] transition-colors cursor-pointer">
                  Saree Style Matcher Quiz
                </button>
              </li>
              <li>
                <span className="text-[#71717a]">Custom Blouse Stitching Studio</span>
              </li>
              <li>
                <span className="text-[#71717a]">Complimentary Fall & Pico Hemming</span>
              </li>
              <li>
                <span className="text-[#71717a]">Bridal Trousseau Consultation</span>
              </li>
            </ul>
          </div>

          {/* Saree Care Guide */}
          <div className="space-y-3">
            <h4 className="font-serif text-xs font-semibold text-[#c5a059] uppercase tracking-[0.2em]">
              Pure Silk Care
            </h4>
            <div className="text-xs text-[#a1a1aa] space-y-2 leading-relaxed font-light">
              <p>• <strong className="text-white font-medium">Muslin Wrap:</strong> Never store pure silks in synthetic plastic.</p>
              <p>• <strong className="text-white font-medium">Zari Shield:</strong> Fold gold/silver threads inward.</p>
              <p>• <strong className="text-white font-medium">Dry Clean:</strong> Hydrocarbon petrol solvent wash only.</p>
            </div>
            
            <button
              id="footer-silk-care-btn"
              onClick={onOpenSilkCare}
              className="mt-2 w-full py-2.5 px-3 bg-[#171717] hover:bg-[#212121] text-[#c5a059] border border-[#c5a059]/40 hover:border-[#c5a059] rounded-xl text-xs font-medium transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Full Care & Zari Guide</span>
            </button>
          </div>

        </div>

        {/* SEO Keywords & Popular Handloom Searches Strip */}
        <div className="py-8 border-b border-[#1f1f1f] space-y-3">
          <h4 className="font-serif text-xs font-semibold text-[#c5a059] uppercase tracking-[0.2em] flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-[#c5a059]" />
            <span>Popular Saree Searches & Handloom Heritage Keywords</span>
          </h4>
          <div className="flex flex-wrap gap-2 text-[11px] text-[#8e8e93]">
            {[
              'Pure Kanjivaram Silk Sarees',
              'Banarasi Kadhwa Zari Sarees',
              'Bridal Wedding Sarees Online',
              'Silk Mark Certified Handloom Silk',
              'Lightweight Organza Pastel Sarees',
              'Chanderi Silk Cotton Drapes',
              'Paithani Peacock Pallu Sarees',
              'Temple Border Pattu Sarees',
              'Tussar Raw Silk Saree Collection',
              'Custom Blouse Stitching & Saree Hemming',
              'Designer Festive Party Wear Sarees',
              'Handwoven Traditional Bridal Trousseau',
              'Korvai Technique Pit-Loom Sarees',
              'Pure Gold Zari Heirloom Sarees'
            ].map((keyword) => (
              <span 
                key={keyword}
                className="bg-[#121212] hover:bg-[#1a1a1a] hover:text-[#c5a059] border border-[#262626] px-2.5 py-1 rounded-md transition-colors cursor-pointer"
              >
                {keyword}
              </span>
            ))}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-[#71717a] gap-4 border-t border-[#1f1f1f]">
          <p>© 2026 Varnam Handloom Guild. Handcrafted with reverence for Indian artisans.</p>
          
          <div className="flex flex-wrap items-center gap-4">
            {onToggleTheme && (
              <button
                id="footer-display-toggle-btn"
                onClick={onToggleTheme}
                className="flex items-center gap-1.5 text-[11px] text-[#a1a1aa] hover:text-[#c5a059] bg-[#171717] px-3 py-1 rounded-full border border-[#262626] transition-colors cursor-pointer"
                title={`Current Theme: ${theme === 'midnight' ? 'Midnight Dark' : 'Ivory Light'}. Click to switch.`}
              >
                {theme === 'midnight' ? (
                  <>
                    <Moon className="w-3 h-3 text-[#c5a059]" />
                    <span>Dark Display</span>
                  </>
                ) : (
                  <>
                    <Sun className="w-3 h-3 text-[#b45309]" />
                    <span>Light Display</span>
                  </>
                )}
              </button>
            )}

            <div className="flex gap-3">
              <span className="hover:text-[#a1a1aa] cursor-pointer">Privacy Policy</span>
              <span>•</span>
              <span className="hover:text-[#a1a1aa] cursor-pointer">Terms of Craft</span>
              <span>•</span>
              <span className="hover:text-[#a1a1aa] cursor-pointer">Silk Mark Verification</span>
            </div>
          </div>
        </div>

      </div>
    </footer>
  );
};
