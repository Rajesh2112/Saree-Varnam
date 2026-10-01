import React, { useState, useEffect } from 'react';
import { 
  X, 
  Search, 
  Truck, 
  Sparkles, 
  CheckCircle2, 
  Clock, 
  MapPin, 
  ShieldCheck, 
  Scissors, 
  FileCheck, 
  UserCheck, 
  ExternalLink, 
  Copy, 
  Check, 
  HelpCircle, 
  ChevronRight,
  Package,
  Layers,
  Award,
  PhoneCall,
  FileText
} from 'lucide-react';
import { TrackedOrder, TrackingStage } from '../types';
import { PREDEFINED_TRACKED_ORDERS, getTrackedOrder } from '../data/trackingOrdersData';
import { SAREES_DATA, BLOUSE_STITCHING_OPTIONS } from '../data/sareesData';
import { generateInvoicePDF } from '../utils/generateInvoicePDF';

interface OrderTrackingModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialOrderNumber?: string;
}

export const OrderTrackingModal: React.FC<OrderTrackingModalProps> = ({
  isOpen,
  onClose,
  initialOrderNumber = 'VRN-84920'
}) => {
  const [inputOrderNumber, setInputOrderNumber] = useState(initialOrderNumber || 'VRN-84920');
  const [trackedOrder, setTrackedOrder] = useState<TrackedOrder>(() => 
    getTrackedOrder(initialOrderNumber || 'VRN-84920')
  );
  const [selectedStageId, setSelectedStageId] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [isConciergeOpen, setIsConciergeOpen] = useState(false);

  useEffect(() => {
    if (initialOrderNumber) {
      setInputOrderNumber(initialOrderNumber);
      setTrackedOrder(getTrackedOrder(initialOrderNumber));
    }
  }, [initialOrderNumber]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputOrderNumber.trim()) {
      const order = getTrackedOrder(inputOrderNumber);
      setTrackedOrder(order);
    }
  };

  const handleSelectSample = (orderId: string) => {
    setInputOrderNumber(orderId);
    setTrackedOrder(getTrackedOrder(orderId));
  };

  const handleCopyTrackingLink = () => {
    navigator.clipboard?.writeText(window.location.origin + `?track=${trackedOrder.orderNumber}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  const handleDownloadInvoice = () => {
    if (!trackedOrder) return;
    const matchingSaree = SAREES_DATA.find(s => s.name.toLowerCase() === trackedOrder.sareeName.toLowerCase()) || SAREES_DATA[0];
    generateInvoicePDF({
      orderNumber: trackedOrder.orderNumber,
      cartItems: [
        {
          cartId: `tracked-${trackedOrder.orderNumber}`,
          saree: matchingSaree,
          blouseOption: BLOUSE_STITCHING_OPTIONS[1],
          bustSize: '36" (Medium)',
          fallPico: true,
          giftWrap: true,
          quantity: 1
        }
      ],
      currency: 'INR',
      total: matchingSaree.price + BLOUSE_STITCHING_OPTIONS[1].price + 250,
      transactionId: `TXN-${trackedOrder.orderNumber}`,
      paymentMethod: 'UPI / NetBanking',
      gateway: 'Atelier Vault Gateway',
      recipientName: 'Valued Patron',
      destinationCity: trackedOrder.destinationCity
    });
  };

  const getStageIcon = (iconName: TrackingStage['iconName'], status: string) => {
    const isCurrent = status === 'current';
    const isCompleted = status === 'completed';
    const colorClass = isCompleted 
      ? 'text-[#4ade80]' 
      : isCurrent 
      ? 'text-[#c5a059]' 
      : 'text-[#71717a]';

    switch (iconName) {
      case 'loom':
        return <Layers className={`w-5 h-5 ${colorClass}`} />;
      case 'handcraft':
        return <Sparkles className={`w-5 h-5 ${colorClass}`} />;
      case 'tailor':
        return <Scissors className={`w-5 h-5 ${colorClass}`} />;
      case 'certificate':
        return <ShieldCheck className={`w-5 h-5 ${colorClass}`} />;
      case 'shipping':
        return <Truck className={`w-5 h-5 ${colorClass}`} />;
      case 'delivered':
        return <CheckCircle2 className={`w-5 h-5 ${colorClass}`} />;
      default:
        return <Package className={`w-5 h-5 ${colorClass}`} />;
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-in fade-in">
      <div 
        id="order-tracking-modal-container"
        className="relative bg-[#0d0d0d] rounded-3xl max-w-4xl w-full border border-[#262626] shadow-2xl overflow-hidden my-auto max-h-[92vh] flex flex-col"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 sm:px-8 py-5 border-b border-[#262626] bg-[#0a0a0a] shrink-0">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-[#171717] text-[#c5a059] border border-[#262626] shadow-xs">
              <Truck className="w-5 h-5 text-[#c5a059]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-serif text-lg sm:text-xl font-light text-white tracking-wide">
                  Handloom Journey & Order Tracking
                </h3>
                <span className="hidden sm:inline-block bg-[#14532d]/40 text-[#4ade80] border border-[#22c55e]/30 text-[10px] font-mono font-bold px-2 py-0.5 rounded-full">
                  Live Pit-Loom Telemetry
                </span>
              </div>
              <p className="text-[11px] text-[#a1a1aa] font-light">
                Follow your heirloom weave from artisan warping to door presentation
              </p>
            </div>
          </div>

          <button
            id="close-order-tracking-btn"
            onClick={onClose}
            className="p-2 rounded-full hover:bg-[#1a1a1a] text-[#a1a1aa] hover:text-white transition-colors cursor-pointer"
            aria-label="Close Order Tracking"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scroll Body */}
        <div className="p-5 sm:p-8 overflow-y-auto space-y-6">
          
          {/* Order Search & Demo Sample Selection Bar */}
          <div className="bg-[#121212] p-4 sm:p-5 rounded-2xl border border-[#262626] space-y-3">
            <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-2.5">
              <div className="relative flex-1">
                <Search className="w-4 h-4 text-[#71717a] absolute left-3.5 top-3.5" />
                <input
                  id="order-tracking-input"
                  type="text"
                  placeholder="Enter Order ID (e.g., VRN-84920, VRN-39201)..."
                  value={inputOrderNumber}
                  onChange={(e) => setInputOrderNumber(e.target.value)}
                  className="w-full bg-[#171717] border border-[#262626] rounded-xl pl-10 pr-4 py-2.5 text-xs uppercase font-mono text-white placeholder-[#71717a] focus:outline-none focus:border-[#c5a059] tracking-wider"
                />
              </div>

              <button
                id="track-order-submit-btn"
                type="submit"
                className="px-6 py-2.5 bg-[#c5a059] hover:bg-[#d4b476] text-black text-xs font-bold uppercase tracking-wider rounded-xl transition-all cursor-pointer flex items-center justify-center gap-2 shadow-xs shrink-0"
              >
                <span>Track Saree</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </form>

            {/* Quick Demo Sample Order Chips */}
            <div className="flex flex-wrap items-center gap-2 pt-1 border-t border-[#1f1f1f] text-xs">
              <span className="text-[11px] text-[#71717a] font-medium flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-[#c5a059]" /> Sample Stages:
              </span>
              {[
                { id: 'VRN-84920', label: '1. Looming (Kanchi)' },
                { id: 'VRN-39201', label: '2. Handcrafting (Varanasi)' },
                { id: 'VRN-55104', label: '3. Out for Delivery' },
                { id: 'VRN-77312', label: '4. Delivered' }
              ].map((sample) => (
                <button
                  key={sample.id}
                  type="button"
                  onClick={() => handleSelectSample(sample.id)}
                  className={`px-2.5 py-1 rounded-lg text-[11px] font-mono transition-all cursor-pointer border ${
                    trackedOrder.orderNumber === sample.id
                      ? 'bg-[#c5a059]/20 text-[#c5a059] border-[#c5a059]/60 font-bold'
                      : 'bg-[#171717] text-[#a1a1aa] hover:text-white border-[#262626] hover:bg-[#212121]'
                  }`}
                >
                  {sample.label}
                </button>
              ))}
            </div>
          </div>

          {/* Saree & Artisan Overview Card */}
          <div className="bg-[#121212] p-5 sm:p-6 rounded-2xl border border-[#262626] space-y-5 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-60 h-60 bg-[#c5a059]/5 rounded-full blur-3xl pointer-events-none" />

            <div className="flex flex-col md:flex-row gap-5 items-start justify-between">
              
              {/* Saree & Customer Snapshot */}
              <div className="flex gap-4 items-center">
                <img
                  src={trackedOrder.sareeImage}
                  alt={trackedOrder.sareeName}
                  referrerPolicy="no-referrer"
                  className="w-20 sm:w-24 aspect-[3/4] object-cover rounded-xl border border-[#333333] shadow-md shrink-0"
                />

                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold text-[#c5a059] uppercase tracking-wider bg-[#1a1a1a] border border-[#333333] px-2 py-0.5 rounded">
                      {trackedOrder.fabric}
                    </span>
                    <span className="text-[10px] text-[#71717a] font-mono">
                      Order #{trackedOrder.orderNumber}
                    </span>
                  </div>

                  <h4 className="font-serif text-base sm:text-lg font-medium text-white line-clamp-1">
                    {trackedOrder.sareeName}
                  </h4>

                  <p className="text-xs text-[#a1a1aa] flex items-center gap-1.5 font-light">
                    <MapPin className="w-3.5 h-3.5 text-[#c5a059]" />
                    Origin: <strong className="text-white font-medium">{trackedOrder.originCluster}</strong>
                  </p>

                  <p className="text-xs text-[#71717a] font-light">
                    Destination: <span className="text-[#e5e5e5]">{trackedOrder.destinationCity}</span>
                  </p>

                  <div className="pt-1 flex flex-wrap items-center gap-2">
                    <span className="text-[10px] text-[#4ade80] bg-[#14532d]/40 border border-[#22c55e]/30 px-2 py-0.5 rounded flex items-center gap-1">
                      <ShieldCheck className="w-3 h-3" /> Silk Mark ID: {trackedOrder.silkMarkId}
                    </span>
                    <button
                      id="tracking-download-pdf-invoice-btn"
                      onClick={handleDownloadInvoice}
                      className="text-[10px] text-[#c5a059] bg-[#1a1710] hover:bg-[#251f15] border border-[#c5a059]/40 hover:border-[#c5a059] px-2.5 py-0.5 rounded flex items-center gap-1 transition-all cursor-pointer font-medium"
                      title="Download Official Varnam PDF Tax Invoice"
                    >
                      <FileText className="w-3 h-3 text-[#c5a059]" />
                      <span>Download PDF Invoice</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Master Weaver Recognition Box */}
              <div className="w-full md:w-72 p-3.5 bg-[#171717] rounded-xl border border-[#262626] space-y-2 shrink-0">
                <div className="flex items-center gap-2">
                  <UserCheck className="w-4 h-4 text-[#c5a059]" />
                  <span className="text-[10px] uppercase font-bold text-[#c5a059] tracking-wider">
                    Master Artisan in Charge
                  </span>
                </div>
                <div>
                  <p className="text-xs font-semibold text-white">{trackedOrder.artisanName}</p>
                  <p className="text-[11px] text-[#71717a] font-light mt-0.5 leading-snug">
                    {trackedOrder.artisanExperience}
                  </p>
                </div>
                <div className="pt-1.5 border-t border-[#262626] flex items-center justify-between text-[11px] text-[#a1a1aa]">
                  <span>Est. Handover:</span>
                  <strong className="text-white font-mono">{trackedOrder.estimatedDeliveryDate}</strong>
                </div>
              </div>

            </div>

            {/* Overall Progress Bar */}
            <div className="space-y-2 pt-2 border-t border-[#1f1f1f]">
              <div className="flex justify-between items-center text-xs">
                <span className="font-serif text-[#e5e5e5] font-light flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-[#c5a059]" />
                  {trackedOrder.currentStatusText}
                </span>
                <span className="font-mono font-bold text-[#c5a059]">
                  {trackedOrder.progressPercent}% Handcrafted
                </span>
              </div>

              <div className="w-full bg-[#1c1c1c] h-2 rounded-full overflow-hidden">
                <div 
                  className="bg-gradient-to-r from-[#c5a059] to-[#e8c87c] h-full transition-all duration-500 rounded-full"
                  style={{ width: `${trackedOrder.progressPercent}%` }}
                />
              </div>
            </div>

          </div>

          {/* Saree's Visual 5-Stage Journey Timeline */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="font-serif text-base sm:text-lg font-light text-white flex items-center gap-2">
                <Layers className="w-4 h-4 text-[#c5a059]" />
                Visual Handloom Milestone Timeline
              </h4>
              <span className="text-[11px] text-[#71717a] font-light">
                Click any stage to view artisan notes & inspection details
              </span>
            </div>

            {/* Timeline List */}
            <div className="space-y-3 relative before:absolute before:inset-0 before:left-6 before:top-4 before:bottom-4 before:w-0.5 before:bg-[#262626]">
              {trackedOrder.stages.map((stage, idx) => {
                const isCompleted = stage.status === 'completed';
                const isCurrent = stage.status === 'current';
                const isSelected = selectedStageId === stage.id || (!selectedStageId && isCurrent);

                return (
                  <div 
                    key={stage.id}
                    className={`relative flex flex-col sm:flex-row gap-4 p-4 rounded-2xl border transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-[#141414] border-[#c5a059] shadow-lg ring-1 ring-[#c5a059]/30'
                        : isCurrent
                        ? 'bg-[#121212] border-[#c5a059]/50 hover:bg-[#171717]'
                        : isCompleted
                        ? 'bg-[#0f0f0f] border-[#262626] hover:bg-[#141414]'
                        : 'bg-[#0a0a0a] border-[#1f1f1f] opacity-70 hover:opacity-100 hover:bg-[#121212]'
                    }`}
                    onClick={() => setSelectedStageId(selectedStageId === stage.id ? null : stage.id)}
                  >
                    
                    {/* Left Node & Step Indicator */}
                    <div className="flex items-center gap-3.5 z-10 shrink-0">
                      <div className={`w-12 h-12 rounded-2xl border flex items-center justify-center transition-all ${
                        isCompleted
                          ? 'bg-[#14532d]/40 border-[#22c55e]/40 shadow-sm'
                          : isCurrent
                          ? 'bg-[#c5a059]/20 border-[#c5a059] ring-4 ring-[#c5a059]/10 animate-pulse'
                          : 'bg-[#171717] border-[#262626]'
                      }`}>
                        {getStageIcon(stage.iconName, stage.status)}
                      </div>

                      <div className="sm:hidden flex-1">
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] uppercase font-bold text-[#c5a059]">
                            Milestone {stage.stepNumber}
                          </span>
                          <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-full uppercase ${
                            isCompleted ? 'bg-[#14532d] text-[#4ade80]' : isCurrent ? 'bg-[#c5a059] text-black' : 'bg-[#1f1f1f] text-[#71717a]'
                          }`}>
                            {stage.status}
                          </span>
                        </div>
                        <h5 className="font-serif text-sm font-medium text-white">{stage.title}</h5>
                      </div>
                    </div>

                    {/* Middle Content */}
                    <div className="flex-1 min-w-0 space-y-1.5">
                      <div className="hidden sm:flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] uppercase font-mono font-bold text-[#c5a059] bg-[#1a1a1a] px-2 py-0.5 rounded border border-[#333333]">
                            Stage {stage.stepNumber} of 5
                          </span>
                          <h5 className="font-serif text-sm font-medium text-white">{stage.title}</h5>
                        </div>

                        <span className={`text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider ${
                          isCompleted
                            ? 'bg-[#14532d]/50 text-[#4ade80] border border-[#22c55e]/30'
                            : isCurrent
                            ? 'bg-[#c5a059] text-black font-bold shadow-xs'
                            : 'bg-[#171717] text-[#71717a] border border-[#262626]'
                        }`}>
                          {stage.status === 'completed' ? '✓ Completed' : stage.status === 'current' ? '● In Progress' : 'Upcoming'}
                        </span>
                      </div>

                      <p className="text-xs text-[#a1a1aa] font-light">
                        {stage.subtitle}
                      </p>

                      <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-[11px] text-[#71717a] font-light pt-0.5">
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3 h-3 text-[#c5a059]" />
                          {stage.location}
                        </span>
                        {stage.timestamp && (
                          <span className="flex items-center gap-1 font-mono text-[#a1a1aa]">
                            <Clock className="w-3 h-3 text-[#c5a059]" />
                            {stage.timestamp}
                          </span>
                        )}
                      </div>

                      {/* Artisan Note Quote Box & Stage Imagery */}
                      <div className="flex flex-col sm:flex-row gap-3 mt-2">
                        {stage.image && (
                          <div className="relative w-full sm:w-28 h-24 sm:h-auto rounded-xl overflow-hidden border border-[#262626] shrink-0 group">
                            <img
                              src={stage.image}
                              alt={stage.title}
                              referrerPolicy="no-referrer"
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex items-end p-1.5">
                              <span className="text-[9px] text-[#c5a059] font-medium uppercase tracking-wider line-clamp-1">
                                {stage.id}
                              </span>
                            </div>
                          </div>
                        )}

                        <div className="flex-1 p-3 bg-[#171717] rounded-xl border border-[#262626] text-xs text-[#e5e5e5] font-light space-y-1">
                          <span className="text-[10px] font-bold text-[#c5a059] uppercase tracking-wider block">
                            Guild Log & Weaver Notes:
                          </span>
                          <p className="italic text-[#d4d4d8] leading-relaxed">
                            "{stage.artisanNote}"
                          </p>
                        </div>
                      </div>

                      {/* Expanded Technical Inspection Details */}
                      {isSelected && stage.details && stage.details.length > 0 && (
                        <div className="pt-2.5 mt-2.5 border-t border-[#262626] space-y-1.5 animate-in fade-in">
                          <span className="text-[10px] font-bold uppercase tracking-wider text-[#a1a1aa] block">
                            Craft & Inspection Checkpoints:
                          </span>
                          <ul className="space-y-1">
                            {stage.details.map((detail, dIdx) => (
                              <li key={dIdx} className="text-xs text-[#a1a1aa] flex items-start gap-2 font-light">
                                <span className="text-[#c5a059] font-bold mt-0.5">•</span>
                                <span>{detail}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>

                  </div>
                );
              })}
            </div>
          </div>

          {/* Courier Details (if shipped or delivered) */}
          {trackedOrder.courierPartner && (
            <div className="p-4 bg-[#121212] rounded-2xl border border-[#262626] flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-[#171717] text-[#c5a059] border border-[#262626]">
                  <Truck className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-white">
                    Insured Courier Partner: <span className="text-[#c5a059]">{trackedOrder.courierPartner}</span>
                  </p>
                  <p className="text-[11px] text-[#71717a] font-mono">
                    Airway Bill (AWB): {trackedOrder.awbNumber}
                  </p>
                </div>
              </div>

              <button
                onClick={handleCopyTrackingLink}
                className="px-4 py-2 bg-[#171717] hover:bg-[#212121] text-[#e5e5e5] border border-[#333333] rounded-xl text-xs font-medium flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-[#4ade80]" /> : <Copy className="w-3.5 h-3.5 text-[#c5a059]" />}
                <span>{copied ? 'Tracking Link Copied!' : 'Copy Tracking Link'}</span>
              </button>
            </div>
          )}

          {/* Weaver Concierge Callout */}
          <div className="p-4 bg-[#141414] rounded-2xl border border-[#262626] flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
            <div className="space-y-0.5">
              <p className="text-xs font-medium text-white flex items-center justify-center sm:justify-start gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-[#c5a059]" />
                Need customized bridal blouse sizing or delivery date rush?
              </p>
              <p className="text-[11px] text-[#71717a] font-light">
                Our Master Weaver Concierge is available 10 AM - 8 PM IST for direct atelier updates.
              </p>
            </div>

            <button
              onClick={() => setIsConciergeOpen(true)}
              className="px-4 py-2 bg-[#171717] hover:bg-[#212121] border border-[#c5a059]/40 hover:border-[#c5a059] text-[#c5a059] text-xs font-bold uppercase tracking-wider rounded-xl transition-colors cursor-pointer flex items-center gap-1.5 shrink-0"
            >
              <PhoneCall className="w-3.5 h-3.5" />
              <span>Contact Concierge</span>
            </button>
          </div>

        </div>

        {/* Modal Footer */}
        <div className="p-4 sm:p-5 border-t border-[#262626] bg-[#0a0a0a] flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2 text-xs text-[#71717a] font-light">
            <ShieldCheck className="w-4 h-4 text-[#4ade80]" />
            <span className="hidden sm:inline">Certified Authentic Handloom Weave • Silk Mark Guarantee</span>
            <span className="sm:hidden">Silk Mark Guaranteed</span>
          </div>

          <button
            onClick={onClose}
            className="px-6 py-2.5 bg-[#c5a059] hover:bg-[#d4b476] text-black text-xs font-bold uppercase tracking-wider rounded-xl transition-all cursor-pointer shadow-xs"
          >
            Done
          </button>
        </div>

      </div>

      {/* Weaver Concierge Dialog */}
      {isConciergeOpen && (
        <div className="fixed inset-0 z-60 bg-black/90 flex items-center justify-center p-4 animate-in fade-in">
          <div className="bg-[#121212] border border-[#262626] rounded-3xl max-w-md w-full p-6 space-y-4 shadow-2xl relative">
            <button
              onClick={() => setIsConciergeOpen(false)}
              className="absolute top-4 right-4 p-1.5 text-[#71717a] hover:text-white rounded-full"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="text-center space-y-1.5">
              <div className="w-12 h-12 rounded-full bg-[#171717] border border-[#c5a059]/40 text-[#c5a059] flex items-center justify-center mx-auto">
                <PhoneCall className="w-5 h-5" />
              </div>
              <h4 className="font-serif text-lg text-white">Weaver Guild Concierge</h4>
              <p className="text-xs text-[#a1a1aa] font-light">
                Direct hotline to master artisan cluster for Order #{trackedOrder.orderNumber}
              </p>
            </div>

            <div className="p-3.5 bg-[#171717] rounded-xl border border-[#262626] space-y-2 text-xs text-[#e5e5e5]">
              <div className="flex justify-between">
                <span className="text-[#71717a]">Dedicated Stylist:</span>
                <span className="font-medium text-white">Meenakshi Sundaram</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#71717a]">WhatsApp Support:</span>
                <span className="font-mono text-[#4ade80] font-bold">+91 98765 43210</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#71717a]">Atelier Hub:</span>
                <span>{trackedOrder.originCluster}</span>
              </div>
            </div>

            <p className="text-[11px] text-[#71717a] text-center font-light leading-relaxed">
              Message us anytime with your Order ID for real-time pit-loom video updates or blouse alteration adjustments.
            </p>

            <button
              onClick={() => setIsConciergeOpen(false)}
              className="w-full py-2.5 bg-[#c5a059] hover:bg-[#d4b476] text-black font-bold uppercase tracking-wider text-xs rounded-xl"
            >
              Close
            </button>
          </div>
        </div>
      )}

    </div>
  );
};
