export interface Saree {
  id: string;
  name: string;
  subtitle: string;
  originRegion: string;
  fabric: 'Kanjivaram Silk' | 'Banarasi Silk' | 'Organza' | 'Chanderi' | 'Tussar Silk' | 'Bandhani Georgette' | 'Paithani Silk' | 'Linen Handloom' | 'Chikankari' | 'Patola Silk' | 'Soft Silk';
  craft: 'Handloom Zari' | 'Kadhwa Weave' | 'Zardozi Embroidery' | 'Block Print' | 'Tie & Dye' | 'Meenakari' | 'Aari Work' | 'Double Ikat' | 'Gotapatti';
  occasion: 'Bridal & Wedding' | 'Festive & Puja' | 'Cocktail & Reception' | 'Office & Daily Elegance' | 'Heritage Collector';
  color: 'Crimson Red' | 'Royal Emerald' | 'Peacock Blue' | 'Mustard Haldi' | 'Pastel Mint' | 'Rose Gold Blush' | 'Regal Plum' | 'Ivory & Gold' | 'Sunset Rust' | 'Parrot Green';
  colorHex: string;
  price: number;
  originalPrice: number;
  rating: number;
  reviewsCount: number;
  badge?: 'Silk Mark Certified' | 'Bestseller' | 'Masterpiece' | 'Trending' | 'Handloom Heritage';
  images: string[];
  description: string;
  story: string;
  weaveDays: number;
  silkPurity: string;
  zariType: 'Pure Silver & Gold Zari' | 'Tested Metallic Zari' | 'Resham Antique Thread' | 'Antique Copper Zari';
  length: string; // e.g. "5.5 Meters Saree + 0.8 Meter Blouse Piece"
  care: string;
  blouseIncluded: boolean;
  inStock: boolean;
  featured?: boolean;
}

export interface BlouseOption {
  id: string;
  name: string;
  neckline: string;
  price: number;
  estimatedDays: number;
  image: string;
}

export interface CartItem {
  cartId: string;
  saree: Saree;
  quantity: number;
  blouseOption: BlouseOption;
  bustSize: string;
  fallPico: boolean;
  giftWrap: boolean;
  giftNote?: string;
  // Optional aliases kept for backward compatibility with cached localStorage items
  customBustSize?: string;
  includeFallPico?: boolean;
  giftWrapping?: boolean;
}

export interface Review {
  id: string;
  sareeId: string;
  userName: string;
  userCity: string;
  rating: number;
  date: string;
  title: string;
  comment: string;
  verified: boolean;
  helpfulCount: number;
  drapedFor: string;
}

export interface FilterState {
  search: string;
  fabric: string;
  occasion: string;
  craft: string;
  color: string;
  priceRange: [number, number];
  sortBy: 'featured' | 'price-low' | 'price-high' | 'rating' | 'newest';
}

export type Currency = 'INR' | 'USD' | 'EUR' | 'GBP' | 'AED';

export type TrackingStageStatus = 'completed' | 'current' | 'upcoming';

export interface TrackingStage {
  id: string;
  stepNumber: number;
  title: string;
  subtitle: string;
  status: TrackingStageStatus;
  timestamp?: string;
  location: string;
  artisanNote: string;
  iconName: 'loom' | 'handcraft' | 'tailor' | 'certificate' | 'shipping' | 'delivered';
  details: string[];
  image?: string;
}

export interface TrackedOrder {
  orderNumber: string;
  customerName: string;
  destinationCity: string;
  placedDate: string;
  estimatedDeliveryDate: string;
  sareeName: string;
  sareeImage: string;
  fabric: string;
  color: string;
  originCluster: string;
  artisanName: string;
  artisanExperience: string;
  blouseDetails: string;
  fallPicoIncluded: boolean;
  silkMarkId: string;
  courierPartner?: string;
  awbNumber?: string;
  currentStatusText: string;
  progressPercent: number;
  stages: TrackingStage[];
}

export type PaymentMethod = 'upi' | 'card' | 'netbanking' | 'emi' | 'cod' | 'stripe';

export interface ShippingAddress {
  fullName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  deliveryNotes?: string;
}

export interface PaymentGatewayConfig {
  stripeConfigured: boolean;
  razorpayConfigured: boolean;
  mode: 'live' | 'sandbox';
  supportedMethods: {
    id: PaymentMethod;
    name: string;
    description: string;
    icon: string;
    recommended?: boolean;
    popularInIndia?: boolean;
  }[];
}

export interface PaymentVerificationResult {
  success: boolean;
  orderNumber: string;
  transactionId: string;
  receiptNumber: string;
  paymentMethod: PaymentMethod;
  gateway: string;
  amountPaid: number;
  currency: Currency;
  timestamp: string;
  shippingAddress: ShippingAddress;
  items: CartItem[];
  paymentStatus: 'captured' | 'authorized' | 'settled';
}

export type ThemeMode = 'midnight' | 'ivory';

export interface TrousseauSlot {
  id: string;
  event: 'Muhurtham Wedding' | 'Sangeet & Cocktail' | 'Haldi & Mehendi' | 'Grand Reception' | 'Puja & Griha Pravesh';
  saree: Saree | null;
  recommendedFabric: string;
}

export interface PatronLook {
  id: string;
  brideName: string;
  occasion: string;
  location: string;
  image: string;
  quote: string;
  sareeId: string;
  pinX: number; // percentage 0-100
  pinY: number; // percentage 0-100
}
