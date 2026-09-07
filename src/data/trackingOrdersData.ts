import { TrackedOrder } from '../types';
import { SAREES_DATA } from './sareesData';

export const PREDEFINED_TRACKED_ORDERS: Record<string, TrackedOrder> = {
  'VRN-84920': {
    orderNumber: 'VRN-84920',
    customerName: 'Ananya Deshmukh',
    destinationCity: 'Mumbai, Maharashtra',
    placedDate: 'Aug 28, 2026',
    estimatedDeliveryDate: 'Sep 06, 2026',
    sareeName: 'Kanjivaram Korvai Temple Border Silk',
    sareeImage: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80',
    fabric: 'Kanjivaram Silk',
    color: 'Crimson Red & Antique Gold',
    originCluster: 'Kanchipuram, Tamil Nadu',
    artisanName: 'Master Weaver K. Sundaramurthy',
    artisanExperience: '3rd Generation Master Weaver (34 years on traditional pit-loom)',
    blouseDetails: 'Royal Sweetheart Neckline (Size 36)',
    fallPicoIncluded: true,
    silkMarkId: 'SM-TN-2026-88492',
    courierPartner: 'BlueDart Couture Express',
    awbNumber: 'BD-88492019-IN',
    currentStatusText: 'Stage 1 of 5: Warp Setting & Looming in Progress',
    progressPercent: 20,
    stages: [
      {
        id: 'looming',
        stepNumber: 1,
        title: 'Looming & Yarn Preparation',
        subtitle: 'Setting up pure mulberry silk threads on wooden pit-loom',
        status: 'current',
        timestamp: 'Aug 29, 2026 • 09:30 AM',
        location: 'Kanchipuram Guild Cluster #4, Tamil Nadu',
        artisanNote: 'Warp tension calibrated perfectly. Hand-interlocking three shuttles for pure Korvai solid red border with heavy gold zari base.',
        iconName: 'loom',
        image: 'https://images.unsplash.com/photo-1606744888344-498238f01777?auto=format&fit=crop&w=800&q=80',
        details: [
          '3-ply pure mulberry silk warp mounted on 60-year-old teakwood pit loom',
          'Natural rice-starch sizing applied to strengthen yarn during hand-weaving',
          '450 warp ends per inch aligned to ensure zero thread slippage'
        ]
      },
      {
        id: 'handcrafting',
        stepNumber: 2,
        title: 'Handcrafting & Zari Weaving',
        subtitle: 'Intricate temple border & Mayil (peacock) motifs shuttle weaving',
        status: 'upcoming',
        location: 'Kanchipuram Guild Cluster #4, Tamil Nadu',
        artisanNote: 'Will require approximately 18 days of hand-weaving by two master craftsmen working simultaneously.',
        iconName: 'handcraft',
        image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80',
        details: [
          'Pure silver electroplated gold zari threads (Tested 0.6% Silver Content)',
          'Petni interlocking technique for sharp, seamless pallu contrast transition',
          'Authentic hand-shuttle rhythm without mechanical jacquard motors'
        ]
      },
      {
        id: 'tailoring',
        stepNumber: 3,
        title: 'Atelier Blouse Tailoring & Hemming',
        subtitle: 'Custom Royal Sweetheart stitching & Fall-Pico hemming',
        status: 'upcoming',
        location: 'Varnam Bespoke Atelier, Chennai',
        artisanNote: 'Pattern cut by master master-darzi with 2-inch inner seam margin for future alterations.',
        iconName: 'tailor',
        image: 'https://images.unsplash.com/photo-1596783049554-0557973059b1?auto=format&fit=crop&w=800&q=80',
        details: [
          'Hand-finished cotton voil inner lining for maximum drape comfort',
          'Double-stitched fall with anti-fray hand-pico edging on pallu border',
          'Concealed brass side zipper and antique gold latkan tassels'
        ]
      },
      {
        id: 'certification',
        stepNumber: 4,
        title: 'Silk Mark Purity & Heritage Boxing',
        subtitle: 'Central Silk Board test inspection & gold-foil trousseau wrap',
        status: 'upcoming',
        location: 'Quality & Authentication Hub, Chennai',
        artisanNote: 'Burn test specimen filed and tamper-evident Silk Mark hologram sealed.',
        iconName: 'certificate',
        image: 'https://images.unsplash.com/photo-1583391733975-081045952d76?auto=format&fit=crop&w=800&q=80',
        details: [
          '100% natural mulberry silk laboratory burn-test verification',
          'Central Silk Board Hologram #SM-TN-2026-88492 affixed',
          'Wrapped in organic unbleached muslin cloth with natural neem leaf sachet'
        ]
      },
      {
        id: 'delivery',
        stepNumber: 5,
        title: 'Out for Express Delivery',
        subtitle: 'Insured transit to Mumbai doorstep',
        status: 'upcoming',
        location: 'Destination Hub, Mumbai',
        artisanNote: 'Temperature-controlled sealed courier box with signature on delivery.',
        iconName: 'shipping',
        image: 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=800&q=80',
        details: [
          'Insured up to full retail value against moisture and transit handling',
          'Real-time GPS tracking enabled via BlueDart Couture Courier',
          'Doorstep delivery with authentic handloom origin certificate'
        ]
      }
    ]
  },

  'VRN-39201': {
    orderNumber: 'VRN-39201',
    customerName: 'Radhika Sen',
    destinationCity: 'Kolkata, West Bengal',
    placedDate: 'Aug 24, 2026',
    estimatedDeliveryDate: 'Sep 02, 2026',
    sareeName: 'Varanasi Royal Kadhwa Weave Banarasi',
    sareeImage: 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=800&q=80',
    fabric: 'Banarasi Silk',
    color: 'Royal Emerald & Gold',
    originCluster: 'Varanasi (Kashi), Uttar Pradesh',
    artisanName: 'Ustad Mohammed Ansari',
    artisanExperience: 'Master Weaver of Madanpura Guild (42 years legacy)',
    blouseDetails: 'High Neck Regal Blouse (Size 34)',
    fallPicoIncluded: true,
    silkMarkId: 'SM-UP-2026-39201',
    courierPartner: 'DHL Express Luxury',
    awbNumber: 'DHL-3920108-IN',
    currentStatusText: 'Stage 2 of 5: Handcrafting & Kadhwa Meenakari Weave in Progress',
    progressPercent: 45,
    stages: [
      {
        id: 'looming',
        stepNumber: 1,
        title: 'Looming & Yarn Preparation',
        subtitle: 'Setting up pure Katan silk warp on handloom',
        status: 'completed',
        timestamp: 'Aug 24, 2026 • 11:15 AM',
        location: 'Madanpura Weaving Guild, Varanasi, UP',
        artisanNote: 'Pure organza-silk cross warp mounted. Deep emerald base dye completed using eco-safe heritage vats.',
        iconName: 'loom',
        image: 'https://images.unsplash.com/photo-1606744888344-498238f01777?auto=format&fit=crop&w=800&q=80',
        details: [
          'Pure Katan silk certified by Silk Board of India',
          'Warp tension locked and tested across 12-shaft wooden loom frame',
          'Yarn density verified at 120 threads per centimeter'
        ]
      },
      {
        id: 'handcrafting',
        stepNumber: 2,
        title: 'Handcrafting & Zari Weaving',
        subtitle: 'Kadhwa floating bootas & Meenakari floral jaal',
        status: 'current',
        timestamp: 'Aug 27, 2026 • 04:20 PM',
        location: 'Ansari Artisan Workshop, Varanasi, UP',
        artisanNote: 'Currently weaving the grand shikargah (royal hunt) pallu. Over 2,400 individual bootis individually knotted on the back without loose cut-threads.',
        iconName: 'handcraft',
        image: 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=800&q=80',
        details: [
          'Pure Kadhwa technique — zero loose floating threads at back of saree',
          'Dual-tone Meenakari in ruby red and gold resham accents',
          'Current progress: 4.2 of 5.5 meters meticulously completed'
        ]
      },
      {
        id: 'tailoring',
        stepNumber: 3,
        title: 'Atelier Blouse Tailoring & Hemming',
        subtitle: 'High Neck Regal Blouse with elbow sleeve zari border',
        status: 'upcoming',
        location: 'Varnam Bespoke Atelier, Varanasi',
        artisanNote: 'Fabric unloom scheduled for tomorrow morning for immediate tailoring.',
        iconName: 'tailor',
        image: 'https://images.unsplash.com/photo-1596783049554-0557973059b1?auto=format&fit=crop&w=800&q=80',
        details: [
          'High-neck silhouette with teardrop back keyhole & vintage potli buttons',
          'Zero-pucker edge hemming with matched emerald silk thread'
        ]
      },
      {
        id: 'certification',
        stepNumber: 4,
        title: 'Silk Mark Purity & Heritage Boxing',
        subtitle: 'Central Silk Board test inspection & gold-foil trousseau wrap',
        status: 'upcoming',
        location: 'Quality & Authentication Hub, Varanasi',
        artisanNote: 'Scheduled for QA burn test and Silk Mark seal on Aug 31.',
        iconName: 'certificate',
        image: 'https://images.unsplash.com/photo-1583391733975-081045952d76?auto=format&fit=crop&w=800&q=80',
        details: [
          'Hologram verification #SM-UP-2026-39201',
          'Certificate of Origin signed by Guild Master Ansari'
        ]
      },
      {
        id: 'delivery',
        stepNumber: 5,
        title: 'Out for Express Delivery',
        subtitle: 'Direct air courier to Kolkata',
        status: 'upcoming',
        location: 'Destination Hub, Kolkata',
        artisanNote: 'Guaranteed arrival before Sep 02 festive puja celebration.',
        iconName: 'shipping',
        image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80',
        details: [
          'DHL Express Air Priority Transit',
          'Dispatched in rigid velvet-lined trousseau heirloom keepsake case'
        ]
      }
    ]
  },

  'VRN-55104': {
    orderNumber: 'VRN-55104',
    customerName: 'Pooja Iyer',
    destinationCity: 'Bengaluru, Karnataka',
    placedDate: 'Aug 21, 2026',
    estimatedDeliveryDate: 'Today (Aug 30, 2026)',
    sareeName: 'Handwoven Patola Double Ikat Heritage Saree',
    sareeImage: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=800&q=80',
    fabric: 'Patola Silk',
    color: 'Crimson & Indigo Heritage Geometry',
    originCluster: 'Patan, Gujarat',
    artisanName: 'Salvi Guild Master Weavers',
    artisanExperience: 'National Award-Winning Double Ikat Artisans (7th Gen)',
    blouseDetails: 'Classic V-Neck Unstitched Piece with Fall-Pico Ready',
    fallPicoIncluded: true,
    silkMarkId: 'SM-GJ-2026-55104',
    courierPartner: 'BlueDart Couture Express',
    awbNumber: 'BD-5510499-BLR',
    currentStatusText: 'Stage 5 of 5: Out for Delivery with Courier Associate',
    progressPercent: 92,
    stages: [
      {
        id: 'looming',
        stepNumber: 1,
        title: 'Looming & Yarn Preparation',
        subtitle: 'Resist tied-and-dyed warp & weft natural vegetable dye alignment',
        status: 'completed',
        timestamp: 'Aug 21, 2026 • 09:00 AM',
        location: 'Salvi Patola Guild, Patan, Gujarat',
        artisanNote: 'Pure mulberry silk threads dyed in 8 traditional botanical shades. Exact calculation of cross-hatch warp intersection completed.',
        iconName: 'loom',
        image: 'https://images.unsplash.com/photo-1606744888344-498238f01777?auto=format&fit=crop&w=800&q=80',
        details: [
          'Double Ikat technique with warp and weft dyed before weaving',
          'Botanical dyes from pomegranate peel, madder root and indigo'
        ]
      },
      {
        id: 'handcrafting',
        stepNumber: 2,
        title: 'Handcrafting & Zari Weaving',
        subtitle: 'Microscopic alignment of elephant, parrot & jewel motifs',
        status: 'completed',
        timestamp: 'Aug 25, 2026 • 06:45 PM',
        location: 'Salvi Patola Guild, Patan, Gujarat',
        artisanNote: 'Completed with zero displacement in geometry. Reversible design looks identical on both sides.',
        iconName: 'handcraft',
        image: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=800&q=80',
        details: [
          'Each row required hand-tucking each knot with bamboo needle',
          'Saree finished with pure gold zari end-piece panel'
        ]
      },
      {
        id: 'tailoring',
        stepNumber: 3,
        title: 'Atelier Blouse Tailoring & Hemming',
        subtitle: 'Fall & Pico edging hand-hemmed with matching silk thread',
        status: 'completed',
        timestamp: 'Aug 28, 2026 • 02:30 PM',
        location: 'Varnam Finishing Atelier, Ahmedabad',
        artisanNote: 'Fall applied with invisible hemstitch. Edges smoothed and steamed.',
        iconName: 'tailor',
        image: 'https://images.unsplash.com/photo-1596783049554-0557973059b1?auto=format&fit=crop&w=800&q=80',
        details: [
          'Pre-washed pure cotton fall attached with 3-ply silk thread',
          'Zero-curl pico border finish along both saree edges'
        ]
      },
      {
        id: 'certification',
        stepNumber: 4,
        title: 'Silk Mark Purity & Heritage Boxing',
        subtitle: 'Central Silk Board certified with physical hologram seal',
        status: 'completed',
        timestamp: 'Aug 29, 2026 • 01:15 PM',
        location: 'Varnam Central Dispatch Atelier, Bengaluru Hub',
        artisanNote: 'Quality certified 100/100. Packed in heirloom gold-foiled trousseau casing.',
        iconName: 'certificate',
        image: 'https://images.unsplash.com/photo-1583391733975-081045952d76?auto=format&fit=crop&w=800&q=80',
        details: [
          'Silk Mark Hologram #SM-GJ-2026-55104 verified',
          'Certified organic muslin packaging with artisan provenance card'
        ]
      },
      {
        id: 'delivery',
        stepNumber: 5,
        title: 'Out for Express Delivery',
        subtitle: 'Out with delivery courier for doorstep delivery',
        status: 'current',
        timestamp: 'Today (Aug 30) • 08:30 AM',
        location: 'Bengaluru Indiranagar Delivery Hub',
        artisanNote: 'Courier associate Rajesh K. is en route with temperature-safe courier pouch. Estimated delivery window: 11:30 AM - 02:00 PM.',
        iconName: 'shipping',
        image: 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=800&q=80',
        details: [
          'Out for delivery via BlueDart Couture Express (AWB: BD-5510499-BLR)',
          'Recipient phone verification: OTP on delivery enabled',
          'Live Courier Contact: +91 98450 12390'
        ]
      }
    ]
  },

  'VRN-77312': {
    orderNumber: 'VRN-77312',
    customerName: 'Meera Nambiar',
    destinationCity: 'Chennai, Tamil Nadu',
    placedDate: 'Aug 18, 2026',
    estimatedDeliveryDate: 'Delivered on Aug 26, 2026',
    sareeName: 'Paithani Peacock Golden Zari Heirloom Saree',
    sareeImage: 'https://images.unsplash.com/photo-1609357605129-26f69add5d6e?auto=format&fit=crop&w=800&q=80',
    fabric: 'Paithani Silk',
    color: 'Royal Plum & Peacock Gold',
    originCluster: 'Paithan, Maharashtra',
    artisanName: 'Pandit Narayan Kshirsagar',
    artisanExperience: '5th Generation Paithan Master Weaver',
    blouseDetails: 'Princess Cut Embroidered Blouse (Size 38)',
    fallPicoIncluded: true,
    silkMarkId: 'SM-MH-2026-77312',
    courierPartner: 'BlueDart Couture Express',
    awbNumber: 'BD-7731200-MAA',
    currentStatusText: 'Order Delivered & Draped (Silk Mark Authenticated)',
    progressPercent: 100,
    stages: [
      {
        id: 'looming',
        stepNumber: 1,
        title: 'Looming & Yarn Preparation',
        subtitle: 'Fine filature silk yarn set up with tapestry weave reed',
        status: 'completed',
        timestamp: 'Aug 18, 2026 • 10:00 AM',
        location: 'Paithani Weaver Guild, Paithan, Maharashtra',
        artisanNote: 'High-twist pure mulberry yarn prepared with gold zari weft.',
        iconName: 'loom',
        image: 'https://images.unsplash.com/photo-1606744888344-498238f01777?auto=format&fit=crop&w=800&q=80',
        details: ['Tapestry weaving technique setup with interlocking shuttles']
      },
      {
        id: 'handcrafting',
        stepNumber: 2,
        title: 'Handcrafting & Zari Weaving',
        subtitle: 'Mor (peacock) & Asavali tapestry pallu handwoven',
        status: 'completed',
        timestamp: 'Aug 22, 2026 • 05:30 PM',
        location: 'Paithani Weaver Guild, Paithan, Maharashtra',
        artisanNote: 'Intricate 28-inch golden pallu with colorful resham peacocks completed flawlessly.',
        iconName: 'handcraft',
        image: 'https://images.unsplash.com/photo-1609357605129-26f69add5d6e?auto=format&fit=crop&w=800&q=80',
        details: ['Pure silver-gilt zari with multicolored enameling']
      },
      {
        id: 'tailoring',
        stepNumber: 3,
        title: 'Atelier Blouse Tailoring & Hemming',
        subtitle: 'Princess Cut Blouse with elbow zari sleeves completed',
        status: 'completed',
        timestamp: 'Aug 24, 2026 • 01:00 PM',
        location: 'Varnam Bespoke Atelier, Chennai',
        artisanNote: 'Precision tailored to Size 38 with padded cups and pure silk piping.',
        iconName: 'tailor',
        image: 'https://images.unsplash.com/photo-1596783049554-0557973059b1?auto=format&fit=crop&w=800&q=80',
        details: ['Custom fit verified against master mannequin measurements']
      },
      {
        id: 'certification',
        stepNumber: 4,
        title: 'Silk Mark Purity & Heritage Boxing',
        subtitle: 'Silk Mark certified and packed in royal gift casing',
        status: 'completed',
        timestamp: 'Aug 25, 2026 • 11:30 AM',
        location: 'Central QA Hub, Chennai',
        artisanNote: 'Silk Mark Hologram #SM-MH-2026-77312 sealed on the pallu tag.',
        iconName: 'certificate',
        image: 'https://images.unsplash.com/photo-1583391733975-081045952d76?auto=format&fit=crop&w=800&q=80',
        details: ['Passed 100% pure silk microscopic cross-section verification']
      },
      {
        id: 'delivery',
        stepNumber: 5,
        title: 'Delivered & Handed Over',
        subtitle: 'Delivered to recipient residence in Anna Nagar, Chennai',
        status: 'completed',
        timestamp: 'Aug 26, 2026 • 03:45 PM',
        location: 'Anna Nagar, Chennai, Tamil Nadu',
        artisanNote: 'Signed and received in perfect condition by customer Meera Nambiar.',
        iconName: 'delivered',
        image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80',
        details: [
          'Received with Silk Mark authenticity card and pure muslin bag',
          'Delivered via BlueDart Couture Express'
        ]
      }
    ]
  }
};

/**
 * Helper to dynamically generate a realistic tracked order for any arbitrary order number
 * (e.g. from newly placed checkout or custom input)
 */
export function getTrackedOrder(orderNumberInput: string): TrackedOrder {
  const cleanId = orderNumberInput.trim().toUpperCase().replace('#', '');
  
  if (PREDEFINED_TRACKED_ORDERS[cleanId]) {
    return PREDEFINED_TRACKED_ORDERS[cleanId];
  }

  // Select a deterministic saree from SAREES_DATA based on order number hash
  let hash = 0;
  for (let i = 0; i < cleanId.length; i++) {
    hash = (hash << 5) - hash + cleanId.charCodeAt(i);
    hash |= 0;
  }
  const positiveHash = Math.abs(hash);
  const saree = SAREES_DATA[positiveHash % SAREES_DATA.length];

  // Derive stage from hash (default to Stage 1 Looming or Stage 2 Handcrafting for new orders)
  const stageStep = (positiveHash % 4) + 1; // 1 to 4

  const stagesList = [
    {
      id: 'looming',
      stepNumber: 1,
      title: 'Looming & Yarn Preparation',
      subtitle: `Setting up pure ${saree.fabric} warp on master pit-loom`,
      status: (stageStep === 1 ? 'current' : stageStep > 1 ? 'completed' : 'upcoming') as any,
      timestamp: 'Aug 29, 2026 • 10:15 AM',
      location: `${saree.originRegion} Weaver Guild`,
      artisanNote: `Master weaver calibrating warp tension for ${saree.name}. Pure ${saree.zariType} threads prepared on wooden shuttles.`,
      iconName: 'loom' as const,
      image: 'https://images.unsplash.com/photo-1606744888344-498238f01777?auto=format&fit=crop&w=800&q=80',
      details: [
        `Pure silk threads certified for ${saree.silkPurity} purity`,
        'Natural organic sizing applied for tensile strength',
        `Warp set up for ${saree.length}`
      ]
    },
    {
      id: 'handcrafting',
      stepNumber: 2,
      title: 'Handcrafting & Zari Weaving',
      subtitle: `Intricate ${saree.craft} shuttle weaving in progress`,
      status: (stageStep === 2 ? 'current' : stageStep > 2 ? 'completed' : 'upcoming') as any,
      timestamp: stageStep >= 2 ? 'Aug 30, 2026 • 02:40 PM' : undefined,
      location: `${saree.originRegion} Artisan Workshop`,
      artisanNote: `Detailed ${saree.craft} motifs being woven shuttle by shuttle. Dedicated craftsmanship taking ~${saree.weaveDays} loom days.`,
      iconName: 'handcraft' as const,
      image: saree.images[0] || 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80',
      details: [
        `Master handloom pattern with ${saree.zariType}`,
        'Petni and Korvai interlocking technique without power looms',
        'Zero defect inspection performed every 50 centimeters'
      ]
    },
    {
      id: 'tailoring',
      stepNumber: 3,
      title: 'Atelier Blouse Tailoring & Hemming',
      subtitle: 'Custom designer neckline tailoring & Fall-Pico hemming',
      status: (stageStep === 3 ? 'current' : stageStep > 3 ? 'completed' : 'upcoming') as any,
      timestamp: stageStep >= 3 ? 'Sep 01, 2026 • 11:30 AM' : undefined,
      location: 'Varnam Bespoke Tailoring Atelier, Chennai',
      artisanNote: 'Master tailor hand-cutting matching unstitched blouse piece with pure cotton lining and reinforced seams.',
      iconName: 'tailor' as const,
      image: 'https://images.unsplash.com/photo-1596783049554-0557973059b1?auto=format&fit=crop&w=800&q=80',
      details: [
        'Custom stitched blouse according to ordered bust measurement',
        'Free fall & pico hemming completed with matched silk thread',
        'Anti-tarnish packaging for metallic borders'
      ]
    },
    {
      id: 'certification',
      stepNumber: 4,
      title: 'Silk Mark Purity & Heritage Boxing',
      subtitle: 'Silk Mark Hologram tagging & gold-foil trousseau wrap',
      status: (stageStep === 4 ? 'current' : stageStep > 4 ? 'completed' : 'upcoming') as any,
      timestamp: stageStep >= 4 ? 'Sep 02, 2026 • 04:00 PM' : undefined,
      location: 'Quality & Authentication Hub, Chennai',
      artisanNote: 'Central Silk Board burn-test verification completed. Hologram affixed to pallu tag.',
      iconName: 'certificate' as const,
      image: 'https://images.unsplash.com/photo-1583391733975-081045952d76?auto=format&fit=crop&w=800&q=80',
      details: [
        `Silk Mark Certificate #SM-${saree.originRegion.slice(0, 2).toUpperCase()}-2026-${positiveHash % 90000 + 10000}`,
        'Sealed in breathable unbleached muslin wrap',
        'Gold foil luxury keepsake trousseau gift box'
      ]
    },
    {
      id: 'delivery',
      stepNumber: 5,
      title: 'Out for Express Delivery',
      subtitle: 'Insured transit to customer address',
      status: (stageStep === 5 ? 'current' : 'upcoming') as any,
      location: 'Regional Express Courier Hub',
      artisanNote: 'Insured premium courier transit with climate-safe sealed packaging.',
      iconName: 'shipping' as const,
      image: 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=800&q=80',
      details: [
        'BlueDart Couture Express / DHL Air Priority',
        'Full value transit insurance and tamper-proof seal'
      ]
    }
  ];

  const currentStage = stagesList.find(s => s.status === 'current') || stagesList[0];

  return {
    orderNumber: cleanId.startsWith('VRN-') ? cleanId : `VRN-${cleanId}`,
    customerName: 'Valued Patron',
    destinationCity: 'India / Worldwide Express',
    placedDate: 'Aug 29, 2026',
    estimatedDeliveryDate: 'Sep 05, 2026',
    sareeName: saree.name,
    sareeImage: saree.images[0],
    fabric: saree.fabric,
    color: saree.color,
    originCluster: saree.originRegion,
    artisanName: 'Master Weaver Guild Artisan',
    artisanExperience: 'Generational Handloom Weaver (Over 25 years experience)',
    blouseDetails: 'Custom Bespoke Stitching + Free Fall & Pico Hemming',
    fallPicoIncluded: true,
    silkMarkId: `SM-${saree.originRegion.slice(0, 2).toUpperCase()}-2026-${positiveHash % 90000 + 10000}`,
    courierPartner: 'BlueDart Couture Express',
    awbNumber: `BD-${positiveHash % 900000 + 100000}-IN`,
    currentStatusText: `Stage ${currentStage.stepNumber} of 5: ${currentStage.title} in Progress`,
    progressPercent: stageStep === 1 ? 20 : stageStep === 2 ? 45 : stageStep === 3 ? 65 : stageStep === 4 ? 85 : 100,
    stages: stagesList
  };
}
