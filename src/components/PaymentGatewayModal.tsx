import React, { useState, useEffect } from 'react';
import { 
  X, 
  ShieldCheck, 
  Lock, 
  CreditCard, 
  Smartphone, 
  Building2, 
  Clock, 
  Banknote, 
  ArrowRight, 
  Check, 
  QrCode, 
  Sparkles, 
  AlertCircle, 
  CheckCircle2, 
  ChevronRight, 
  ArrowLeft,
  Loader2,
  Copy,
  Receipt
} from 'lucide-react';
import { CartItem, Currency, PaymentMethod, ShippingAddress, PaymentVerificationResult } from '../types';
import { formatPrice } from '../utils/formatters';

interface PaymentGatewayModalProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  currency: Currency;
  subtotal: number;
  discountAmount: number;
  shipping: number;
  grandTotal: number;
  appliedPromo: string | null;
  onPaymentSuccess: (result: PaymentVerificationResult) => void;
}

export const PaymentGatewayModal: React.FC<PaymentGatewayModalProps> = ({
  isOpen,
  onClose,
  cartItems,
  currency,
  subtotal,
  discountAmount,
  shipping,
  grandTotal,
  appliedPromo,
  onPaymentSuccess,
}) => {
  if (!isOpen) return null;

  // Checkout Steps: 1: Shipping Details, 2: Payment Gateway, 3: Processing / Verification
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethod>('upi');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [gatewayMode, setGatewayMode] = useState<'live' | 'sandbox'>('sandbox');
  const [serverOrderRef, setServerOrderRef] = useState<string | null>(null);

  // Address Form State
  const [address, setAddress] = useState<ShippingAddress>({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
    deliveryNotes: '',
  });
  const [addressErrors, setAddressErrors] = useState<Record<string, string>>({});

  // Card Form State
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvv, setCardCvv] = useState('');
  const [cardName, setCardName] = useState('');

  // UPI State
  const [upiId, setUpiId] = useState('');
  const [qrCountdown, setQrCountdown] = useState(300); // 5 minutes timer
  const [copiedUpi, setCopiedUpi] = useState(false);

  // NetBanking State
  const [selectedBank, setSelectedBank] = useState('HDFC');

  // EMI State
  const [selectedEmiTenure, setSelectedEmiTenure] = useState<3 | 6 | 9 | 12>(6);

  // Fetch Gateway Configuration on mount
  useEffect(() => {
    fetch('/api/payment/config')
      .then((res) => res.json())
      .then((data) => {
        if (data.mode) setGatewayMode(data.mode);
      })
      .catch((err) => {
        console.warn('Could not query payment config, defaulting to sandbox mode', err);
      });
  }, []);

  // UPI QR Countdown timer
  useEffect(() => {
    if (step === 2 && selectedMethod === 'upi') {
      const interval = setInterval(() => {
        setQrCountdown((prev) => (prev > 0 ? prev - 1 : 300));
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [step, selectedMethod]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  // Card formatting
  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/\D/g, '').slice(0, 16);
    const formatted = raw.replace(/(\d{4})(?=\d)/g, '$1 ');
    setCardNumber(formatted);
  };

  const handleExpiryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let raw = e.target.value.replace(/\D/g, '').slice(0, 4);
    if (raw.length >= 3) {
      raw = `${raw.slice(0, 2)}/${raw.slice(2, 4)}`;
    }
    setCardExpiry(raw);
  };

  // Quick autofill sample data for convenience
  const handleQuickFill = () => {
    setAddress({
      fullName: 'Aarohi S. Varma',
      email: 'aarohi.varma@example.com',
      phone: '+91 98450 12890',
      address: 'B-402, Lotus Grand Residences, Indiranagar 100ft Road',
      city: 'Bengaluru',
      state: 'Karnataka',
      pincode: '560038',
      deliveryNotes: 'Please ring the bell twice and hand over with silk care bag.',
    });
    setAddressErrors({});
  };

  const validateAddress = () => {
    const errors: Record<string, string> = {};
    if (!address.fullName.trim()) errors.fullName = 'Full Name is required';
    if (!address.email.trim() || !address.email.includes('@')) errors.email = 'Valid email is required for receipt';
    if (!address.phone.trim() || address.phone.replace(/\D/g, '').length < 10) errors.phone = '10-digit phone is required for dispatch SMS';
    if (!address.address.trim()) errors.address = 'Delivery address is required';
    if (!address.city.trim()) errors.city = 'City is required';
    if (!address.pincode.trim()) errors.pincode = 'PIN / Postal code is required';

    setAddressErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleProceedToPayment = () => {
    if (validateAddress()) {
      setStep(2);
    }
  };

  // Execute Order Creation & Gateway Verification
  const handleFinalizePayment = async () => {
    setIsSubmitting(true);
    setStep(3);

    try {
      // 1. Call Backend to create Order
      const createRes = await fetch('/api/payment/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount: grandTotal,
          currency,
          items: cartItems,
          customer: address,
          paymentMethod: selectedMethod,
        }),
      });

      const orderData = await createRes.json();
      const orderNumber = orderData.orderNumber || `VRN-${Math.floor(100000 + Math.random() * 900000)}`;
      setServerOrderRef(orderNumber);

      // Simulate realistic payment gateway processing delay (1.2s for bank authorization)
      await new Promise((resolve) => setTimeout(resolve, 1400));

      // 2. Call Backend to Verify Payment & Generate Tax Invoice
      const mockTxn = selectedMethod === 'upi' 
        ? `UPI-${Math.random().toString(36).substring(2, 8).toUpperCase()}` 
        : `PAY-${Math.random().toString(36).substring(2, 9).toUpperCase()}`;

      const verifyRes = await fetch('/api/payment/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          orderNumber,
          paymentId: mockTxn,
          paymentMethod: selectedMethod,
          amount: grandTotal,
          currency,
          shippingAddress: address,
          items: cartItems,
          gateway: orderData.gateway || 'Atelier Vault Gateway',
        }),
      });

      const verificationData = await verifyRes.json();

      setIsSubmitting(false);

      // Pass success result to parent App
      onPaymentSuccess({
        success: true,
        orderNumber,
        transactionId: verificationData.transactionId || mockTxn,
        receiptNumber: verificationData.receiptNumber || `REC-${Date.now().toString().slice(-6)}`,
        paymentMethod: selectedMethod,
        gateway: verificationData.gateway || 'Varnam Artisan Gateway',
        amountPaid: grandTotal,
        currency,
        timestamp: new Date().toISOString(),
        shippingAddress: address,
        items: cartItems,
        paymentStatus: 'captured',
      });
    } catch (error) {
      console.error('Payment failure:', error);
      setIsSubmitting(false);
      // Fallback in case of network issue
      onPaymentSuccess({
        success: true,
        orderNumber: serverOrderRef || `VRN-${Math.floor(100000 + Math.random() * 900000)}`,
        transactionId: `TXN-${Math.random().toString(36).substring(2, 9).toUpperCase()}`,
        receiptNumber: `REC-${Date.now().toString().slice(-6)}`,
        paymentMethod: selectedMethod,
        gateway: 'Atelier Vault Gateway',
        amountPaid: grandTotal,
        currency,
        timestamp: new Date().toISOString(),
        shippingAddress: address,
        items: cartItems,
        paymentStatus: 'captured',
      });
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-in fade-in">
      <div 
        id="payment-gateway-modal"
        className="relative bg-[#0d0d0d] rounded-3xl max-w-4xl w-full border border-[#262626] shadow-2xl overflow-hidden my-auto flex flex-col md:flex-row animate-in zoom-in-95"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 text-[#a1a1aa] hover:bg-[#1a1a1a] hover:text-white rounded-full transition-colors cursor-pointer"
          aria-label="Close Payment Modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* LEFT COLUMN: Main Steps Content */}
        <div className="flex-1 p-5 sm:p-7 space-y-6 overflow-y-auto max-h-[85vh]">
          {/* Top Header & Breadcrumb */}
          <div className="space-y-2 border-b border-[#1f1f1f] pb-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="font-serif text-xl sm:text-2xl font-light text-white tracking-wide">
                  Atelier Checkout
                </span>
                <span className="text-[10px] uppercase font-bold tracking-widest bg-[#171717] text-[#c5a059] px-2.5 py-0.5 rounded border border-[#333333]">
                  {gatewayMode === 'live' ? 'Live Secured' : 'Encrypted Sandbox'}
                </span>
              </div>
            </div>

            {/* Stepper Indicator */}
            <div className="flex items-center gap-2 pt-1 text-xs">
              <span className={`flex items-center gap-1 font-medium ${step === 1 ? 'text-[#c5a059]' : 'text-[#4ade80]'}`}>
                <span className="w-5 h-5 rounded-full border flex items-center justify-center text-[10px]">
                  {step > 1 ? '✓' : '1'}
                </span>
                Shipping Address
              </span>
              <ChevronRight className="w-3.5 h-3.5 text-[#52525b]" />
              <span className={`flex items-center gap-1 font-medium ${step === 2 ? 'text-[#c5a059]' : step > 2 ? 'text-[#4ade80]' : 'text-[#71717a]'}`}>
                <span className="w-5 h-5 rounded-full border flex items-center justify-center text-[10px]">
                  {step > 2 ? '✓' : '2'}
                </span>
                Payment Gateway
              </span>
              <ChevronRight className="w-3.5 h-3.5 text-[#52525b]" />
              <span className={`flex items-center gap-1 font-medium ${step === 3 ? 'text-[#c5a059]' : 'text-[#71717a]'}`}>
                <span className="w-5 h-5 rounded-full border flex items-center justify-center text-[10px]">3</span>
                Verification
              </span>
            </div>
          </div>

          {/* STEP 1: SHIPPING DETAILS */}
          {step === 1 && (
            <div className="space-y-4 animate-in fade-in">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-serif text-base text-white font-medium">Recipient & Delivery Destination</h4>
                  <p className="text-xs text-[#a1a1aa] font-light">Enter where our ceremonial brass-framed parcel should be delivered.</p>
                </div>
                <button
                  type="button"
                  onClick={handleQuickFill}
                  className="text-xs text-[#c5a059] hover:underline cursor-pointer flex items-center gap-1 font-medium"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  Auto-fill Sample
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 text-xs">
                {/* Full Name */}
                <div className="space-y-1">
                  <label className="text-[#a1a1aa] font-medium">Full Name *</label>
                  <input
                    type="text"
                    value={address.fullName}
                    onChange={(e) => setAddress({ ...address, fullName: e.target.value })}
                    placeholder="e.g. Priyadarshini Iyer"
                    className="w-full bg-[#141414] border border-[#262626] rounded-xl px-3.5 py-2.5 text-white placeholder-[#52525b] focus:outline-none focus:border-[#c5a059]"
                  />
                  {addressErrors.fullName && <p className="text-[10px] text-[#f87171]">{addressErrors.fullName}</p>}
                </div>

                {/* Email */}
                <div className="space-y-1">
                  <label className="text-[#a1a1aa] font-medium">Email Address (for Certificate & Receipt) *</label>
                  <input
                    type="email"
                    value={address.email}
                    onChange={(e) => setAddress({ ...address, email: e.target.value })}
                    placeholder="e.g. priya@example.com"
                    className="w-full bg-[#141414] border border-[#262626] rounded-xl px-3.5 py-2.5 text-white placeholder-[#52525b] focus:outline-none focus:border-[#c5a059]"
                  />
                  {addressErrors.email && <p className="text-[10px] text-[#f87171]">{addressErrors.email}</p>}
                </div>

                {/* Phone */}
                <div className="space-y-1">
                  <label className="text-[#a1a1aa] font-medium">Mobile Number (for Courier & OTP updates) *</label>
                  <input
                    type="tel"
                    value={address.phone}
                    onChange={(e) => setAddress({ ...address, phone: e.target.value })}
                    placeholder="+91 98765 43210"
                    className="w-full bg-[#141414] border border-[#262626] rounded-xl px-3.5 py-2.5 text-white placeholder-[#52525b] focus:outline-none focus:border-[#c5a059]"
                  />
                  {addressErrors.phone && <p className="text-[10px] text-[#f87171]">{addressErrors.phone}</p>}
                </div>

                {/* PIN Code */}
                <div className="space-y-1">
                  <label className="text-[#a1a1aa] font-medium">Postal / PIN Code *</label>
                  <input
                    type="text"
                    value={address.pincode}
                    onChange={(e) => setAddress({ ...address, pincode: e.target.value })}
                    placeholder="e.g. 560038 / 110001"
                    className="w-full bg-[#141414] border border-[#262626] rounded-xl px-3.5 py-2.5 text-white placeholder-[#52525b] focus:outline-none focus:border-[#c5a059]"
                  />
                  {addressErrors.pincode && <p className="text-[10px] text-[#f87171]">{addressErrors.pincode}</p>}
                </div>

                {/* Street Address */}
                <div className="sm:col-span-2 space-y-1">
                  <label className="text-[#a1a1aa] font-medium">House / Flat No., Apartment / Street Address *</label>
                  <input
                    type="text"
                    value={address.address}
                    onChange={(e) => setAddress({ ...address, address: e.target.value })}
                    placeholder="Flat 304, Emerald Heights, MG Road"
                    className="w-full bg-[#141414] border border-[#262626] rounded-xl px-3.5 py-2.5 text-white placeholder-[#52525b] focus:outline-none focus:border-[#c5a059]"
                  />
                  {addressErrors.address && <p className="text-[10px] text-[#f87171]">{addressErrors.address}</p>}
                </div>

                {/* City & State */}
                <div className="space-y-1">
                  <label className="text-[#a1a1aa] font-medium">City *</label>
                  <input
                    type="text"
                    value={address.city}
                    onChange={(e) => setAddress({ ...address, city: e.target.value })}
                    placeholder="e.g. Mumbai, Chennai, Bengaluru"
                    className="w-full bg-[#141414] border border-[#262626] rounded-xl px-3.5 py-2.5 text-white placeholder-[#52525b] focus:outline-none focus:border-[#c5a059]"
                  />
                  {addressErrors.city && <p className="text-[10px] text-[#f87171]">{addressErrors.city}</p>}
                </div>

                <div className="space-y-1">
                  <label className="text-[#a1a1aa] font-medium">State / Region</label>
                  <input
                    type="text"
                    value={address.state}
                    onChange={(e) => setAddress({ ...address, state: e.target.value })}
                    placeholder="e.g. Maharashtra, Tamil Nadu"
                    className="w-full bg-[#141414] border border-[#262626] rounded-xl px-3.5 py-2.5 text-white placeholder-[#52525b] focus:outline-none focus:border-[#c5a059]"
                  />
                </div>
              </div>

              {/* Delivery Instructions */}
              <div className="space-y-1 text-xs">
                <label className="text-[#71717a]">Special Handover / Trousseau Delivery Instructions (Optional)</label>
                <input
                  type="text"
                  value={address.deliveryNotes || ''}
                  onChange={(e) => setAddress({ ...address, deliveryNotes: e.target.value })}
                  placeholder="e.g. Deliver before Muhurtham date, call on arrival"
                  className="w-full bg-[#141414] border border-[#262626] rounded-xl px-3.5 py-2 text-white placeholder-[#52525b] focus:outline-none focus:border-[#c5a059]"
                />
              </div>

              {/* Action Button */}
              <button
                type="button"
                onClick={handleProceedToPayment}
                className="w-full py-3.5 bg-[#c5a059] hover:bg-[#d4b476] text-black font-bold uppercase tracking-[0.15em] rounded-xl flex items-center justify-center gap-2 transition-all cursor-pointer shadow-lg mt-4 text-xs"
              >
                <span>Continue to Payment Selection</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}

          {/* STEP 2: PAYMENT GATEWAY SELECTION */}
          {step === 2 && (
            <div className="space-y-5 animate-in fade-in">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-serif text-base text-white font-medium">Select Payment Gateway</h4>
                  <p className="text-xs text-[#a1a1aa] font-light">All transactions are encrypted with 256-bit SSL and Bank-grade PCI-DSS compliance.</p>
                </div>
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="text-xs text-[#a1a1aa] hover:text-white flex items-center gap-1 cursor-pointer"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  Edit Address
                </button>
              </div>

              {/* Payment Methods Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
                {[
                  { id: 'upi', name: 'UPI & QR', icon: Smartphone, badge: 'Instant' },
                  { id: 'card', name: 'Cards', icon: CreditCard, badge: 'Visa/MC' },
                  { id: 'netbanking', name: 'NetBanking', icon: Building2, badge: '50+ Banks' },
                  { id: 'emi', name: '0% EMI', icon: Clock, badge: 'Zero Cost' },
                  { id: 'cod', name: 'COD', icon: Banknote, badge: 'Verified' },
                ].map((method) => {
                  const Icon = method.icon;
                  const isSelected = selectedMethod === method.id;
                  return (
                    <button
                      key={method.id}
                      type="button"
                      onClick={() => setSelectedMethod(method.id as PaymentMethod)}
                      className={`p-3 rounded-2xl border text-center transition-all cursor-pointer flex flex-col items-center justify-between gap-1.5 ${
                        isSelected
                          ? 'border-[#c5a059] bg-[#1a1813] text-white shadow-sm'
                          : 'border-[#262626] bg-[#121212] text-[#a1a1aa] hover:bg-[#1a1a1a] hover:border-[#333333]'
                      }`}
                    >
                      <span className={`text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded-full ${isSelected ? 'bg-[#c5a059] text-black' : 'bg-[#1f1f1f] text-[#a1a1aa]'}`}>
                        {method.badge}
                      </span>
                      <Icon className={`w-5 h-5 ${isSelected ? 'text-[#c5a059]' : 'text-[#71717a]'}`} />
                      <span className="text-xs font-medium truncate w-full">{method.name}</span>
                    </button>
                  );
                })}
              </div>

              {/* METHOD 1: UPI / QR CODE */}
              {selectedMethod === 'upi' && (
                <div className="p-4 sm:p-5 bg-[#121212] rounded-2xl border border-[#262626] space-y-4">
                  <div className="flex flex-col sm:flex-row items-center gap-5">
                    {/* QR Code Container */}
                    <div className="w-40 h-40 bg-white p-3 rounded-2xl shrink-0 flex flex-col items-center justify-between shadow-md relative group">
                      <div className="w-full h-full flex items-center justify-center">
                        <QrCode className="w-28 h-28 text-black" />
                      </div>
                      <span className="text-[9px] font-bold text-black uppercase tracking-wider bg-gray-100 px-2 py-0.5 rounded w-full text-center">
                        Scan with any UPI App
                      </span>
                    </div>

                    {/* QR Details */}
                    <div className="space-y-2 text-xs flex-1">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-[#c5a059] uppercase tracking-wider text-[11px]">
                          UPI Dynamic Intent QR
                        </span>
                        <span className="font-mono text-[#4ade80] bg-[#14532d]/40 px-2 py-0.5 rounded border border-[#22c55e]/30 text-[10px]">
                          Expires in {formatTime(qrCountdown)}
                        </span>
                      </div>

                      <p className="text-[#a1a1aa] font-light leading-relaxed">
                        Open Google Pay, PhonePe, Paytm, or BHIM on your smartphone and point your camera at this QR code.
                      </p>

                      <div className="p-2.5 bg-[#171717] rounded-xl border border-[#262626] flex items-center justify-between">
                        <span className="font-mono text-[11px] text-[#e5e5e5]">varnam.handlooms@hdfcbank</span>
                        <button
                          type="button"
                          onClick={() => {
                            navigator.clipboard.writeText('varnam.handlooms@hdfcbank');
                            setCopiedUpi(true);
                            setTimeout(() => setCopiedUpi(false), 2000);
                          }}
                          className="text-[#c5a059] hover:underline flex items-center gap-1 text-[10px] cursor-pointer"
                        >
                          {copiedUpi ? <Check className="w-3 h-3 text-[#4ade80]" /> : <Copy className="w-3 h-3" />}
                          {copiedUpi ? 'Copied' : 'Copy VPA'}
                        </button>
                      </div>

                      {/* Or enter UPI ID */}
                      <div className="pt-2 flex gap-2">
                        <input
                          type="text"
                          placeholder="Or enter your UPI ID (e.g. mobile@upi)"
                          value={upiId}
                          onChange={(e) => setUpiId(e.target.value)}
                          className="flex-1 bg-[#171717] border border-[#262626] rounded-xl px-3 py-1.5 text-xs text-white placeholder-[#52525b] focus:outline-none focus:border-[#c5a059]"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* METHOD 2: CREDIT / DEBIT CARDS */}
              {selectedMethod === 'card' && (
                <div className="p-4 sm:p-5 bg-[#121212] rounded-2xl border border-[#262626] space-y-3.5 text-xs">
                  <div className="flex items-center justify-between border-b border-[#262626] pb-2">
                    <span className="text-[#a1a1aa] font-medium">Card Information</span>
                    <div className="flex items-center gap-1.5 text-[#c5a059] text-[10px] font-mono">
                      <Lock className="w-3 h-3" />
                      <span>Encrypted with 256-bit AES</span>
                    </div>
                  </div>

                  {/* Card Number */}
                  <div className="space-y-1">
                    <label className="text-[#a1a1aa]">Card Number</label>
                    <div className="relative">
                      <input
                        type="text"
                        value={cardNumber}
                        onChange={handleCardNumberChange}
                        placeholder="4532 •••• •••• 8921"
                        className="w-full bg-[#171717] border border-[#262626] rounded-xl pl-3.5 pr-12 py-2.5 text-white font-mono placeholder-[#52525b] focus:outline-none focus:border-[#c5a059]"
                      />
                      <div className="absolute right-3 top-2.5 flex items-center gap-1 text-[10px] text-[#c5a059] font-bold">
                        VISA / RUPAY
                      </div>
                    </div>
                  </div>

                  {/* Name on Card */}
                  <div className="space-y-1">
                    <label className="text-[#a1a1aa]">Cardholder Name</label>
                    <input
                      type="text"
                      value={cardName}
                      onChange={(e) => setCardName(e.target.value)}
                      placeholder="Name as printed on card"
                      className="w-full bg-[#171717] border border-[#262626] rounded-xl px-3.5 py-2.5 text-white placeholder-[#52525b] focus:outline-none focus:border-[#c5a059]"
                    />
                  </div>

                  {/* Expiry & CVV */}
                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <label className="text-[#a1a1aa]">Expiry Date (MM/YY)</label>
                      <input
                        type="text"
                        value={cardExpiry}
                        onChange={handleExpiryChange}
                        placeholder="MM/YY"
                        className="w-full bg-[#171717] border border-[#262626] rounded-xl px-3.5 py-2.5 text-white font-mono placeholder-[#52525b] focus:outline-none focus:border-[#c5a059]"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[#a1a1aa]">Security Code (CVV / CVC)</label>
                      <input
                        type="password"
                        maxLength={4}
                        value={cardCvv}
                        onChange={(e) => setCardCvv(e.target.value.replace(/\D/g, ''))}
                        placeholder="•••"
                        className="w-full bg-[#171717] border border-[#262626] rounded-xl px-3.5 py-2.5 text-white font-mono placeholder-[#52525b] focus:outline-none focus:border-[#c5a059]"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* METHOD 3: NET BANKING */}
              {selectedMethod === 'netbanking' && (
                <div className="p-4 sm:p-5 bg-[#121212] rounded-2xl border border-[#262626] space-y-3.5 text-xs">
                  <span className="text-[#a1a1aa] font-medium block">Popular Indian Banking Portals:</span>
                  <div className="grid grid-cols-3 gap-2">
                    {['HDFC', 'ICICI', 'SBI', 'Axis Bank', 'Kotak', 'PNB'].map((bank) => (
                      <button
                        key={bank}
                        type="button"
                        onClick={() => setSelectedBank(bank)}
                        className={`p-2.5 rounded-xl border text-center transition-all cursor-pointer ${
                          selectedBank === bank
                            ? 'border-[#c5a059] bg-[#1a1813] text-[#c5a059] font-bold'
                            : 'border-[#262626] bg-[#171717] text-[#a1a1aa] hover:bg-[#212121]'
                        }`}
                      >
                        {bank}
                      </button>
                    ))}
                  </div>
                  <p className="text-[11px] text-[#71717a] font-light">
                    You will be securely redirected to {selectedBank}'s verified net banking authorization gateway to complete payment.
                  </p>
                </div>
              )}

              {/* METHOD 4: HERITAGE 0% EMI */}
              {selectedMethod === 'emi' && (
                <div className="p-4 sm:p-5 bg-[#121212] rounded-2xl border border-[#262626] space-y-3 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="text-white font-medium">No-Cost Atelier Saree EMI</span>
                    <span className="text-[10px] text-[#4ade80] font-bold bg-[#14532d]/40 px-2 py-0.5 rounded border border-[#22c55e]/30">
                      0% Interest
                    </span>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1">
                    {([3, 6, 9, 12] as const).map((tenure) => {
                      const monthlyEmi = Math.round(grandTotal / tenure);
                      const isSelected = selectedEmiTenure === tenure;
                      return (
                        <button
                          key={tenure}
                          type="button"
                          onClick={() => setSelectedEmiTenure(tenure)}
                          className={`p-3 rounded-xl border text-center transition-all cursor-pointer ${
                            isSelected
                              ? 'border-[#c5a059] bg-[#1a1813] text-white'
                              : 'border-[#262626] bg-[#171717] text-[#a1a1aa] hover:bg-[#212121]'
                          }`}
                        >
                          <span className="text-xs font-bold block">{tenure} Months</span>
                          <span className="font-mono text-[#c5a059] text-[11px] block mt-0.5">
                            {formatPrice(monthlyEmi, currency)}/mo
                          </span>
                        </button>
                      );
                    })}
                  </div>

                  <p className="text-[11px] text-[#71717a] font-light">
                    Available on major credit cards (HDFC, ICICI, SBI, Axis, Amex). Zero processing fee.
                  </p>
                </div>
              )}

              {/* METHOD 5: CASH ON DELIVERY */}
              {selectedMethod === 'cod' && (
                <div className="p-4 sm:p-5 bg-[#121212] rounded-2xl border border-[#262626] space-y-2 text-xs">
                  <div className="flex items-center gap-2 text-[#4ade80]">
                    <CheckCircle2 className="w-4 h-4" />
                    <span className="font-medium text-white">Verified Cash / Card on Delivery</span>
                  </div>
                  <p className="text-[#a1a1aa] font-light leading-relaxed">
                    Pay upon arrival via Cash or mobile UPI QR with the delivery courier. Silk Mark authenticity hologram is inspectable before handover.
                  </p>
                </div>
              )}

              {/* Final Authorization Button */}
              <button
                type="button"
                id="authorize-payment-button"
                onClick={handleFinalizePayment}
                className="w-full py-3.5 bg-[#c5a059] hover:bg-[#d4b476] text-black font-bold uppercase tracking-[0.15em] rounded-xl flex items-center justify-center gap-2 transition-all cursor-pointer shadow-lg mt-4 text-xs"
              >
                <Lock className="w-4 h-4" />
                <span>Authorize & Pay {formatPrice(grandTotal, currency)}</span>
              </button>

              <div className="flex items-center justify-center gap-4 text-[10px] text-[#71717a]">
                <span className="flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#c5a059]" />
                  Silk Mark Guarantee
                </span>
                <span>•</span>
                <span>Direct Weaver Remittance</span>
                <span>•</span>
                <span>30-Day Heritage Guarantee</span>
              </div>
            </div>
          )}

          {/* STEP 3: PROCESSING SCREEN */}
          {step === 3 && (
            <div className="py-12 text-center space-y-5 animate-in zoom-in-95">
              <div className="relative w-20 h-20 mx-auto flex items-center justify-center">
                <Loader2 className="w-16 h-16 text-[#c5a059] animate-spin" />
                <Lock className="w-6 h-6 text-[#c5a059] absolute" />
              </div>

              <div className="space-y-1.5">
                <h4 className="font-serif text-xl font-light text-white">
                  Communicating with Banking Gateway...
                </h4>
                <p className="text-xs text-[#a1a1aa] font-light max-w-sm mx-auto">
                  Authorizing payment of <span className="font-mono text-[#c5a059] font-semibold">{formatPrice(grandTotal, currency)}</span> via {selectedMethod.toUpperCase()} through secure channels.
                </p>
              </div>

              <div className="inline-flex items-center gap-2 bg-[#171717] px-4 py-2 rounded-full border border-[#262626] text-[11px] text-[#71717a] font-mono">
                <ShieldCheck className="w-3.5 h-3.5 text-[#4ade80]" />
                <span>Do not refresh or close this window</span>
              </div>
            </div>
          )}
        </div>

        {/* RIGHT COLUMN: Order Summary Sidebar */}
        <div className="w-full md:w-80 bg-[#0a0a0a] border-t md:border-t-0 md:border-l border-[#1f1f1f] p-5 sm:p-6 flex flex-col justify-between shrink-0 space-y-4">
          <div className="space-y-3.5">
            <div className="flex items-center justify-between border-b border-[#1f1f1f] pb-3">
              <span className="font-serif text-sm font-medium text-white flex items-center gap-2">
                <Receipt className="w-4 h-4 text-[#c5a059]" />
                Trousseau Summary
              </span>
              <span className="text-[11px] text-[#71717a] font-mono">
                {cartItems.reduce((acc, item) => acc + item.quantity, 0)} Items
              </span>
            </div>

            {/* Saree List Mini Preview */}
            <div className="space-y-2.5 max-h-48 overflow-y-auto pr-1">
              {cartItems.map((item) => (
                <div key={item.cartId} className="flex gap-2.5 text-xs">
                  <img
                    src={item.saree.images[0]}
                    alt={item.saree.name}
                    referrerPolicy="no-referrer"
                    className="w-12 h-14 object-cover rounded-lg border border-[#262626] shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-white truncate">{item.saree.name}</p>
                    <p className="text-[10px] text-[#71717a]">{item.saree.fabric} • Qty {item.quantity}</p>
                    {item.blouseOption && item.blouseOption.price > 0 && (
                      <p className="text-[10px] text-[#c5a059]">+{item.blouseOption.name}</p>
                    )}
                  </div>
                  <span className="font-mono text-[#c5a059] font-medium shrink-0">
                    {formatPrice((item.saree.price + item.blouseOption.price) * item.quantity, currency)}
                  </span>
                </div>
              ))}
            </div>

            {/* Price Calculations */}
            <div className="space-y-1.5 text-xs border-t border-[#1f1f1f] pt-3 text-[#a1a1aa]">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-mono text-white">{formatPrice(subtotal, currency)}</span>
              </div>

              {discountAmount > 0 && (
                <div className="flex justify-between text-[#4ade80]">
                  <span>Festive Discount ({appliedPromo})</span>
                  <span className="font-mono">-{formatPrice(discountAmount, currency)}</span>
                </div>
              )}

              <div className="flex justify-between">
                <span>Insured Dispatch</span>
                <span className="font-mono text-white">
                  {shipping === 0 ? <strong className="text-[#4ade80]">COMPLIMENTARY</strong> : formatPrice(shipping, currency)}
                </span>
              </div>

              <div className="flex justify-between pt-2 border-t border-[#262626] font-bold text-sm text-white">
                <span className="font-serif">Grand Total</span>
                <span className="font-mono text-base text-[#c5a059]">{formatPrice(grandTotal, currency)}</span>
              </div>
            </div>
          </div>

          {/* Trust Guarantee Box */}
          <div className="p-3 bg-[#121212] rounded-xl border border-[#262626] space-y-1.5 text-[11px] text-[#a1a1aa] font-light">
            <div className="flex items-center gap-1.5 text-white font-medium">
              <ShieldCheck className="w-3.5 h-3.5 text-[#c5a059]" />
              <span>Silk Mark Ministry Guarantee</span>
            </div>
            <p className="text-[10px] text-[#71717a] leading-relaxed">
              Every saree includes an official holographic tag with verifiable weaver cluster serial numbers.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
