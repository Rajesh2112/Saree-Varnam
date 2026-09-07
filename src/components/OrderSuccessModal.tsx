import React from 'react';
import { CheckCircle2, PackageCheck, Truck, ShieldCheck, Download, X } from 'lucide-react';
import { CartItem, Currency } from '../types';
import { formatPrice } from '../utils/formatters';

interface OrderSuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  orderNumber: string;
  cartItems: CartItem[];
  currency: Currency;
  onContinueShopping: () => void;
  onTrackOrder: (orderNumber: string) => void;
  transactionId?: string;
  paymentMethod?: string;
  gateway?: string;
  recipientName?: string;
  destinationCity?: string;
}

export const OrderSuccessModal: React.FC<OrderSuccessModalProps> = ({
  isOpen,
  onClose,
  orderNumber,
  cartItems,
  currency,
  onContinueShopping,
  onTrackOrder,
  transactionId,
  paymentMethod = 'UPI',
  gateway = 'Atelier Vault Gateway',
  recipientName,
  destinationCity,
}) => {
  if (!isOpen) return null;

  const total = cartItems.reduce((sum, item) => {
    return sum + (item.saree.price + item.blouseOption.price + (item.giftWrap ? 250 : 0)) * item.quantity;
  }, 0);

  const handleDownloadInvoice = () => {
    const invoiceContent = `
========================================
     VARNAM HANDLOOM COUTURE ATELIER
         OFFICIAL TAX INVOICE
========================================
Order Reference: #${orderNumber}
Payment Gateway: ${gateway}
Transaction ID: ${transactionId || `TXN-${orderNumber}`}
Payment Method: ${paymentMethod.toUpperCase()}
Date: ${new Date().toLocaleDateString('en-IN', { dateStyle: 'full' })}
Recipient: ${recipientName || 'Valued Patron'}
Destination: ${destinationCity || 'India'}
Authentication: Silk Mark Certified Pure Silk
----------------------------------------
Items:
${cartItems.map((item, i) => `${i + 1}. ${item.saree.name} (${item.saree.fabric})\n   Qty: ${item.quantity} | Blouse: ${item.blouseOption.name} | Total: ${item.saree.price * item.quantity}`).join('\n')}
----------------------------------------
Grand Total: ${currency} ${total}
Payment Status: VERIFIED & CAPTURED (256-bit SSL)
========================================
Thank you for supporting handloom weaving families across Kanchipuram, Varanasi, Chanderi and Paithan.
`;
    const blob = new Blob([invoiceContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Invoice-${orderNumber}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-in fade-in">
      <div 
        id="order-success-modal-box"
        className="relative bg-[#0d0d0d] rounded-3xl max-w-lg w-full border border-[#262626] shadow-2xl overflow-hidden my-auto p-6 sm:p-8 space-y-5 animate-in zoom-in-95"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-[#a1a1aa] hover:bg-[#1a1a1a] hover:text-white rounded-full transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Top Success Badge */}
        <div className="text-center space-y-2">
          <div className="w-16 h-16 rounded-full bg-[#14532d]/40 border border-[#22c55e]/30 text-[#4ade80] flex items-center justify-center mx-auto shadow-sm">
            <CheckCircle2 className="w-10 h-10" />
          </div>

          <h3 className="font-serif text-2xl font-light text-white tracking-wide">
            Payment Verified & Order Placed!
          </h3>

          <p className="text-xs text-[#a1a1aa] font-light">
            Thank you for supporting our generational weavers. Your payment was captured and your order has been sent to our master tailors.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-2 pt-1">
            <div className="bg-[#171717] text-[#c5a059] px-3 py-1 rounded-full text-xs font-mono font-bold border border-[#333333]">
              Order: #{orderNumber}
            </div>
            {transactionId && (
              <div className="bg-[#171717] text-[#4ade80] px-3 py-1 rounded-full text-xs font-mono border border-[#22c55e]/30 flex items-center gap-1">
                <span>Txn: {transactionId}</span>
              </div>
            )}
          </div>
        </div>

        {/* Payment & Dispatch Information Box */}
        <div className="p-4 bg-[#121212] rounded-2xl border border-[#262626] space-y-3">
          <div className="flex items-center justify-between text-xs pb-2 border-b border-[#262626]">
            <span className="text-[#a1a1aa]">Gateway Status</span>
            <span className="text-[#4ade80] font-medium flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5" /> 256-bit Encrypted • Paid via {paymentMethod.toUpperCase()}
            </span>
          </div>

          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-[#1a1a1a] text-[#c5a059] border border-[#262626]">
              <PackageCheck className="w-4 h-4" />
            </div>
            <div>
              <p className="text-xs font-semibold text-white">Weaver Inspection & QC</p>
              <p className="text-[11px] text-[#71717a] font-light">Silk Mark hologram verification & Fall-Pico hemming</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-[#1a1a1a] text-[#c5a059] border border-[#262626]">
              <Truck className="w-4 h-4" />
            </div>
            <div>
              <p className="text-xs font-semibold text-white">Insured Express Dispatch</p>
              <p className="text-[11px] text-[#71717a] font-light">
                {destinationCity ? `Destination: ${destinationCity} • ` : ''}Estimated: 3-5 business days via DHL / BlueDart
              </p>
            </div>
          </div>
        </div>

        {/* Purchased Sarees Mini Summary */}
        <div className="space-y-2 max-h-40 overflow-y-auto pr-1">
          {cartItems.map((item) => {
            const isGift = Boolean(item.giftWrap);
            return (
              <div key={item.cartId} className="text-xs py-2 border-b border-[#1f1f1f] space-y-1">
                <div className="flex items-center justify-between">
                  <div className="truncate pr-2">
                    <span className="font-medium text-white">{item.saree.name}</span>
                    <span className="text-[#71717a] block text-[10px]">Qty: {item.quantity} • {item.blouseOption.name}</span>
                  </div>
                  <span className="font-mono font-bold text-[#c5a059] shrink-0">
                    {formatPrice((item.saree.price + item.blouseOption.price + (isGift ? 250 : 0)) * item.quantity, currency)}
                  </span>
                </div>
                {isGift && (
                  <div className="bg-[#171717] rounded-lg p-2 border border-[#c5a059]/30 text-[11px] text-[#e8c87c] font-light">
                    <span className="font-semibold text-xs text-[#c5a059]">🎁 Heritage Gift Box</span>
                    {item.giftNote && (
                      <p className="italic text-[10px] text-[#fef08a] mt-0.5 whitespace-pre-wrap">
                        "{item.giftNote}"
                      </p>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className="flex items-center justify-between font-bold text-sm text-white pt-2 border-t border-[#262626]">
          <span className="font-serif">Paid Total</span>
          <span className="font-mono text-[#c5a059] text-base">{formatPrice(total, currency)}</span>
        </div>

        {/* Buttons */}
        <div className="space-y-2.5">
          <button
            onClick={handleDownloadInvoice}
            className="w-full py-2.5 bg-[#171717] hover:bg-[#212121] text-[#c5a059] border border-[#c5a059]/40 rounded-xl font-medium uppercase tracking-[0.1em] text-xs transition-all cursor-pointer flex items-center justify-center gap-2"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download Official Tax Invoice</span>
          </button>

          <button
            id="track-new-order-btn"
            onClick={() => onTrackOrder(orderNumber)}
            className="w-full py-3.5 bg-[#c5a059] hover:bg-[#d4b476] text-black rounded-xl font-bold uppercase tracking-[0.15em] text-xs transition-all shadow-md cursor-pointer flex items-center justify-center gap-2"
          >
            <Truck className="w-4 h-4" />
            <span>Track Saree Journey (Loom to Doorstep)</span>
          </button>

          <button
            onClick={onContinueShopping}
            className="w-full py-3 bg-[#171717] hover:bg-[#212121] text-[#e5e5e5] border border-[#333333] rounded-xl font-semibold uppercase tracking-[0.15em] text-xs transition-all cursor-pointer"
          >
            Continue Saree Shopping
          </button>
        </div>

      </div>
    </div>
  );
};
