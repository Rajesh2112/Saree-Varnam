import { Saree, BlouseOption, Review } from '../types';

export const BLOUSE_STITCHING_OPTIONS: BlouseOption[] = [
  {
    id: 'unstitched',
    name: 'Unstitched Running Fabric (Included)',
    neckline: 'Standard 80cm fabric attached with saree for your local tailor',
    price: 0,
    estimatedDays: 0,
    image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 'sweetheart-elbow',
    name: 'Royal Sweetheart Neck with Elbow Sleeves',
    neckline: 'Padded Princess Cut with delicate piping & concealed back zipper',
    price: 1850,
    estimatedDays: 4,
    image: 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 'boatneck-zardozi',
    name: 'Contemporary Boat Neck with Hand Zardozi Border',
    neckline: 'Clean high boat neckline with gold zardozi motif embellishments',
    price: 2450,
    estimatedDays: 5,
    image: 'https://images.unsplash.com/photo-1583391733975-081045952d76?auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 'sleeveless-backless',
    name: 'Minimalist Chic Sleeveless with Tasselled Dori Back',
    neckline: 'Deep round back with hand-crafted latkans and structured cups',
    price: 1650,
    estimatedDays: 3,
    image: 'https://images.unsplash.com/photo-1609357605129-26f69add5d6e?auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 'maggam-heavy-bridal',
    name: 'Grand Temple Maggam & Cutwork Hand Embroidery',
    neckline: 'Exquisite bridal handwork with pearl drops, kundan, and zardozi borders',
    price: 4200,
    estimatedDays: 7,
    image: 'https://images.unsplash.com/photo-1596783049554-0557973059b1?auto=format&fit=crop&w=400&q=80'
  }
];

export const SAREES_DATA: Saree[] = [
  {
    id: 'aaradhya-crimson-kalamkari',
    name: 'Aaradhya Crimson & Mustard Kalamkari Pure Silk Saree',
    subtitle: 'Raw mulberry silk with hand-painted birds & floral tree of life pallu',
    originRegion: 'Srikalahasti & Kanchipuram',
    fabric: 'Kanjivaram Silk',
    craft: 'Handloom Zari',
    occasion: 'Bridal & Wedding',
    color: 'Crimson Red',
    colorHex: '#540D1E',
    price: 34500,
    originalPrice: 42000,
    rating: 4.98,
    reviewsCount: 164,
    badge: 'Silk Mark Certified',
    featured: true,
    weaveDays: 35,
    silkPurity: '100% Pure Mulberry Silk (Govt Silk Mark Certified)',
    zariType: 'Pure Silver & Gold Zari',
    length: '5.5m Saree + 0.8m Contrast Mustard Blouse Piece',
    care: 'Strictly Dry Clean only. Store wrapped in pure unbleached muslin cloth with natural cedar balls.',
    blouseIncluded: true,
    inStock: true,
    images: [
      'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1000&q=85',
      'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=1000&q=85',
      'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=1000&q=85'
    ],
    description: 'A breathtaking handloom masterpiece uniting deep crimson-wine pure silk with an authentic pen Kalamkari pallu. Hand-painted tree of life motifs with singing birds and blooming lotuses, framed by rich antique zari and festive tassels.',
    story: 'Crafted through the combined heritage of Kanchipuram weavers and master Kalamkari artists. Each bird and petal is hand-drawn using bamboo reed pens and natural vegetable pigments over 35 intensive days.'
  },
  {
    id: 'meenakshi-temple-emerald-kanjivaram',
    name: 'Meenakshi Temple Border Emerald Kanchipuram Pure Silk Saree',
    subtitle: 'Ancestral Korvai weave with grand antique gold zari temple gopuram borders',
    originRegion: 'Kanchipuram, Tamil Nadu',
    fabric: 'Kanjivaram Silk',
    craft: 'Handloom Zari',
    occasion: 'Bridal & Wedding',
    color: 'Royal Emerald',
    colorHex: '#044A2B',
    price: 38500,
    originalPrice: 48000,
    rating: 4.96,
    reviewsCount: 142,
    badge: 'Masterpiece',
    featured: true,
    weaveDays: 32,
    silkPurity: '3-Ply Mulberry Silk with 100% Silk Mark Certification',
    zariType: 'Pure Silver & Gold Zari',
    length: '5.5m Saree + 0.85m Heavy Zari Brocade Blouse Piece',
    care: 'Dry clean only. Store with natural neem or cedar sachets.',
    blouseIncluded: true,
    inStock: true,
    images: [
      'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=1000&q=85',
      'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1000&q=85',
      'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=1000&q=85'
    ],
    description: 'A regal temple heirloom in deep bottle green. Showcases soaring temple tower (Gopuram) borders and dancing peacock motifs in authentic antique gold zari, with a grand heavy brocade pallu.',
    story: 'Handwoven in the temple town of Kanchipuram on ancestral wooden pit looms using pure mulberry silk yarn interlocked via the rare Korvai shuttle technique.'
  },
  {
    id: 'vaishali-lilac-teal-checks',
    name: 'Vaishali Pastel Lilac & Peacock Teal Checks Soft Silk Saree',
    subtitle: 'Contemporary lightweight soft silk with dual-tone checks & contrast temple selvedge',
    originRegion: 'Salem & Kanchipuram, Tamil Nadu',
    fabric: 'Soft Silk',
    craft: 'Handloom Zari',
    occasion: 'Festive & Puja',
    color: 'Regal Plum',
    colorHex: '#6B46C1',
    price: 18500,
    originalPrice: 23500,
    rating: 4.92,
    reviewsCount: 98,
    badge: 'Trending',
    featured: true,
    weaveDays: 16,
    silkPurity: 'Fine Mulberry Soft Silk (Featherlight Drape)',
    zariType: 'Tested Metallic Zari',
    length: '5.5m Saree + 0.8m Contrast Peacock Teal Blouse',
    care: 'Dry clean recommended. Iron on low silk setting with cloth barrier.',
    blouseIncluded: true,
    inStock: true,
    images: [
      'https://images.unsplash.com/photo-1583391733975-081045952d76?auto=format&fit=crop&w=1000&q=85',
      'https://images.unsplash.com/photo-1609357605129-26f69add5d6e?auto=format&fit=crop&w=1000&q=85',
      'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1000&q=85'
    ],
    description: 'Effortlessly modern and featherlight. Features micro gingham checks in lavender and turquoise blue with a sharp contrast teal temple border and hand-knotted playful pallu tassels.',
    story: 'Designed for the modern woman who desires the poise of heritage silk with the breezy weightlessness of a cocktail drape. Falls into crisp, fluid pleats effortlessly.'
  },
  {
    id: 'kashvi-ivory-onyx-tribal-tussar',
    name: 'Kashvi Ivory & Onyx Geometric Tribal Tussar Silk Saree',
    subtitle: 'Wild raw tussar silk featuring striking black tribal geometric motifs',
    originRegion: 'Bhagalpur & Bastar Ateliers',
    fabric: 'Tussar Silk',
    craft: 'Handloom Zari',
    occasion: 'Office & Daily Elegance',
    color: 'Ivory & Gold',
    colorHex: '#E5E5E0',
    price: 16800,
    originalPrice: 21000,
    rating: 4.89,
    reviewsCount: 86,
    badge: 'Handloom Heritage',
    featured: true,
    weaveDays: 18,
    silkPurity: '100% Wild Forest Kosa Tussar Silk',
    zariType: 'Resham Antique Thread',
    length: '5.5m Saree + 0.8m Jet Black Raw Silk Blouse Piece',
    care: 'Dry clean only. Steam press on reverse side.',
    blouseIncluded: true,
    inStock: true,
    images: [
      'https://images.unsplash.com/photo-1596783049554-0557973059b1?auto=format&fit=crop&w=1000&q=85',
      'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1000&q=85'
    ],
    description: 'Understated high fashion in natural organic tussar. Contrasting black diamond tribal geometric motifs, rhythmic linear borders, and chic onyx latkans on pure natural raw tussar silk.',
    story: 'Handspun by tribal weaver cooperatives from wild cocoon silkworms. Textured with an earthy golden sheen that grows softer and more luminous with every wear.'
  },
  {
    id: 'madhavi-parrot-green-heritage-checks',
    name: 'Madhavi Parrot Green Heritage Checked Kanchipuram Silk Saree',
    subtitle: 'Classic micro-checks with woven paisley buttas & contrast dark green brocade',
    originRegion: 'Kanchipuram, Tamil Nadu',
    fabric: 'Kanjivaram Silk',
    craft: 'Handloom Zari',
    occasion: 'Festive & Puja',
    color: 'Parrot Green',
    colorHex: '#558B2F',
    price: 27500,
    originalPrice: 34000,
    rating: 4.95,
    reviewsCount: 112,
    badge: 'Bestseller',
    featured: true,
    weaveDays: 24,
    silkPurity: 'Pure Mulberry Kanchipuram Handloom Silk',
    zariType: 'Pure Silver & Gold Zari',
    length: '5.5m Saree + 0.8m Deep Bottle Green Brocade Blouse',
    care: 'Dry clean only. Store wrapped in pure unbleached cotton.',
    blouseIncluded: true,
    inStock: true,
    images: [
      'https://images.unsplash.com/photo-1609357605129-26f69add5d6e?auto=format&fit=crop&w=1000&q=85',
      'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=1000&q=85'
    ],
    description: 'A beloved South Indian celebratory classic. Radiant parrot green with micro grid checks, scattered floral kalka paisleys, and an opulent dark green and gold zari brocade pallu.',
    story: 'A celebration of warmth and maternal grace, worn across festivals from Varalakshmi Puja to family weddings. The classic color contrast evokes lush temple groves.'
  },
  {
    id: 'vasundhara-plum-bandhani-georgette',
    name: 'Vasundhara Imperial Plum Bandhani Georgette Silk Saree',
    subtitle: 'Intricate hand-tied Rai Bandhej dots on pure flowing georgette with fringe tassels',
    originRegion: 'Bhuj & Jamnagar, Gujarat',
    fabric: 'Bandhani Georgette',
    craft: 'Tie & Dye',
    occasion: 'Festive & Puja',
    color: 'Regal Plum',
    colorHex: '#4A044E',
    price: 21500,
    originalPrice: 26800,
    rating: 4.93,
    reviewsCount: 77,
    badge: 'Bestseller',
    featured: false,
    weaveDays: 22,
    silkPurity: 'Pure 60g Natural Georgette Silk',
    zariType: 'Resham Antique Thread',
    length: '5.5m Saree + 0.8m Attached Silk Blouse',
    care: 'Roll-press dry clean only to preserve authentic tie-dye texture.',
    blouseIncluded: true,
    inStock: true,
    images: [
      'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=1000&q=85',
      'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1000&q=85'
    ],
    description: 'Thousands of micro-knots meticulously hand-pinched and tied by artisan women in Kutch. The deep royal plum color creates a dynamic starry effect, complemented by neat hand-knotted fringe tassels.',
    story: 'Carrying forward centuries of Kutchi tie-and-dye tradition. Drapes with fluid grace and liquid softness, moving effortlessly with every step.'
  },
  {
    id: 'nilambari-royal-indigo-magenta-chanderi',
    name: 'Nilambari Royal Indigo & Magenta Dual-Tone Chanderi Silk Saree',
    subtitle: 'Palace atelier dual-tone weave with pure gold & silver zari borders and tissue pallu',
    originRegion: 'Chanderi, Madhya Pradesh',
    fabric: 'Chanderi',
    craft: 'Handloom Zari',
    occasion: 'Cocktail & Reception',
    color: 'Peacock Blue',
    colorHex: '#1E1B4B',
    price: 24800,
    originalPrice: 31000,
    rating: 4.97,
    reviewsCount: 65,
    badge: 'Masterpiece',
    featured: true,
    weaveDays: 20,
    silkPurity: 'High-Twist Mulberry Silk with Fine Mercerized Cotton',
    zariType: 'Pure Silver & Gold Zari',
    length: '5.5m Saree + 0.8m Magenta Silk Blouse Piece',
    care: 'Gentle dry clean only. Wrap in muslin cloth.',
    blouseIncluded: true,
    inStock: true,
    images: [
      'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1000&q=85',
      'https://images.unsplash.com/photo-1609357605129-26f69add5d6e?auto=format&fit=crop&w=1000&q=85'
    ],
    description: 'An aristocratic courtly creation. Photographed in an Indian palace pavilion, the dual-tone warp and weft weave shifts color between royal indigo blue and imperial magenta with glistening gold and silver zari.',
    story: 'Woven for grand evening celebrations where candle and chandelier light reveal the hypnotic dual-tone luster of the fine Chanderi weave.'
  }
];

export const REVIEWS_DATA: Review[] = [
  {
    id: 'rev-1',
    sareeId: 'aaradhya-crimson-kalamkari',
    userName: 'Dr. Ananya Natarajan',
    userCity: 'Chennai, Tamil Nadu',
    rating: 5,
    date: '3 weeks ago',
    title: 'Pure Heirloom Grade - The Kalamkari birds are sublime!',
    comment: 'The weight and pure silk luster of this Kalamkari saree is phenomenal. The hand-painted birds on the mustard pallu look like museum art. The complimentary Fall and Pico hemming was finished with perfection!',
    verified: true,
    helpfulCount: 42,
    drapedFor: 'Sister Wedding'
  },
  {
    id: 'rev-2',
    sareeId: 'meenakshi-temple-emerald-kanjivaram',
    userName: 'Meera Kapur',
    userCity: 'Mumbai, Maharashtra',
    rating: 5,
    date: '1 month ago',
    title: 'Silk Mark certified tag gave full confidence',
    comment: 'Ordered from Varnam with slight hesitation regarding buying pure silk online, but the Silk Mark hologram authentication code checked out 100%. The temple gopuram zari border gleams with majestic antique luster.',
    verified: true,
    helpfulCount: 28,
    drapedFor: 'Reception Night'
  },
  {
    id: 'rev-3',
    sareeId: 'vaishali-lilac-teal-checks',
    userName: 'Sanyukta Sharma',
    userCity: 'New Delhi',
    rating: 5,
    date: '2 weeks ago',
    title: 'Featherlight soft silk with modern lilac gingham',
    comment: 'The biggest fear with silk sarees is stiffness, but this soft silk is ultra-refined and drapes with soft graceful pleats. The contrast teal temple border is so chic.',
    verified: true,
    helpfulCount: 35,
    drapedFor: 'Cocktail Sangeet'
  },
  {
    id: 'rev-4',
    sareeId: 'kashvi-ivory-onyx-tribal-tussar',
    userName: 'Priyanka Sen',
    userCity: 'Kolkata, West Bengal',
    rating: 5,
    date: '1 month ago',
    title: 'The geometric tribal weave is true artisan craftsmanship',
    comment: 'No loose threads! My mother who has collected handloom sarees for 40 years was stunned by the clean black geometric borders on pure raw tussar. Wore it with a high-neck sleeveless blouse.',
    verified: true,
    helpfulCount: 19,
    drapedFor: 'Cultural Gala'
  },
  {
    id: 'rev-5',
    sareeId: 'madhavi-parrot-green-heritage-checks',
    userName: 'Kavitha Sundaram',
    userCity: 'Bangalore, Karnataka',
    rating: 5,
    date: '3 weeks ago',
    title: 'Brought tears to my grandmother eyes - traditional perfection',
    comment: 'The parrot green and bottle green contrast is reminiscent of vintage Madras handlooms. The micro checks and antique gold zari pallu drape with royal elegance.',
    verified: true,
    helpfulCount: 24,
    drapedFor: 'Varalakshmi Vratam'
  }
];

export const DRAPING_GUIDE_STEPS = [
  {
    step: 1,
    title: 'The Foundation & Basic Tuck',
    subtitle: 'Anchor the saree securely at the right height',
    description: 'Start at the plain end of the saree. Hold it at your navel and tuck the top edge smoothly into your petticoat or shapewear, circling once counter-clockwise around your waist back to the starting point.',
    tip: 'Wear your event footwear (heels/flats) before tucking so the bottom hem grazes the floor perfectly (approx 0.5 inches above ground).',
    image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=600&q=80'
  },
  {
    step: 2,
    title: 'Pallu Length & Shoulder Pleats',
    subtitle: 'Measure the dramatic sweep over your left shoulder',
    description: 'Take the decorated pallu end and bring it loosely behind your back. Form crisp 4-5 inch accordian pleats or drape it open. Rest it over your left shoulder, leaving 3-4 feet falling behind your knee.',
    tip: 'Pin the pallu at the back of your shoulder seam—never right on top—to prevent the saree from dragging backwards during movement.',
    image: 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=600&q=80'
  },
  {
    step: 3,
    title: 'The Center Waist Pleats',
    subtitle: 'Create 6 to 8 uniform, cascading pleats',
    description: 'With the remaining fabric in the center, span your thumb and index finger to create 5-inch pleats. Fold back and forth until the fabric is gathered into 6-8 even pleats.',
    tip: 'Give all pleats a gentle downward pull and shake so they align in an even waterfall step rather than bunching together.',
    image: 'https://images.unsplash.com/photo-1583391733975-081045952d76?auto=format&fit=crop&w=600&q=80'
  },
  {
    step: 4,
    title: 'Tuck & Secure the Pleat Fan',
    subtitle: 'Lock the center pleats neatly into the waistband',
    description: 'Neatly align the top edge of all pleats together and tuck them straight into the waistband slightly to the left of your navel. Ensure all pleat bases are equal.',
    tip: 'Place a small safety pin horizontally on the inside through all pleats and the petticoat to prevent any unraveling while dancing.',
    image: 'https://images.unsplash.com/photo-1596783049554-0557973059b1?auto=format&fit=crop&w=600&q=80'
  },
  {
    step: 5,
    title: 'The Snug Chest Draping',
    subtitle: 'Wrap the torso drape smoothly across the bust',
    description: 'Pull the upper border of the saree across your chest snugly from the right side towards your left shoulder, creating neat diagonal fluting across your torso.',
    tip: 'For a slimming silhouette, keep the chest pleats slightly fanned out and pinned securely to your blouse.',
    image: 'https://images.unsplash.com/photo-1609357605129-26f69add5d6e?auto=format&fit=crop&w=600&q=80'
  },
  {
    step: 6,
    title: 'The Final Silhouette Check',
    subtitle: 'Adjust the fall, hemline, and jewelry styling',
    description: 'Check the bottom hemline in a full-length mirror. Adjust the fall of the pallu, fasten waist belt (kamarbandh) if desired, and step with confidence!',
    tip: 'Carry a couple of spare discreet golden safety pins in your evening clutch just in case.',
    image: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=600&q=80'
  }
];

export const REGIONS_HERITAGE = [
  {
    name: 'Kanchipuram, Tamil Nadu',
    specialty: 'Pure Mulberry Silk & Heavy Gold Korvai Zari',
    desc: 'Known as the Silk City of South India, famous for temple borders and 3-ply heavy silk that lasts generations.',
    icon: '🏛️',
    image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80',
    yearsTradition: '1,500+ Yrs',
    mastery: 'Korvai Interlock Weft'
  },
  {
    name: 'Srikalahasti & Andhra',
    specialty: 'Hand-Painted Pen Kalamkari on Mulberry Silk',
    desc: 'Ancient riverbank craft depicting mythological flora and birds using organic dyes and bamboo kalam pens.',
    icon: '🪷',
    image: 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=800&q=80',
    yearsTradition: '2,000+ Yrs',
    mastery: 'Organic Pen Kalamkari'
  },
  {
    name: 'Chanderi, Madhya Pradesh',
    specialty: 'Gossamer Silk-Cotton & Ashrafi Gold Weaves',
    desc: 'Delicate, breathable royal weaves favored by Scindia royalty for palace ceremonies.',
    icon: '✨',
    image: 'https://images.unsplash.com/photo-1583391733975-081045952d76?auto=format&fit=crop&w=800&q=80',
    yearsTradition: '700+ Yrs',
    mastery: 'Palace Dual-Tone Weave'
  },
  {
    name: 'Bhagalpur & Bastar',
    specialty: 'Wild Forest Raw Tussar Silk with Tribal Motifs',
    desc: 'Organic raw silk textured with earthy gold sheen and handwoven tribal geometric motifs.',
    icon: '💎',
    image: 'https://images.unsplash.com/photo-1596783049554-0557973059b1?auto=format&fit=crop&w=800&q=80',
    yearsTradition: '900+ Yrs',
    mastery: 'Geometric Tribal Weave'
  },
  {
    name: 'Kutch & Jamnagar, Gujarat',
    specialty: 'Hand-Tied Rai Bandhani on Pure Georgette',
    desc: 'Over 8,000 micro-knots pinched and tied by hand before immersion in imperial natural dyes.',
    icon: '🪡',
    image: 'https://images.unsplash.com/photo-1609357605129-26f69add5d6e?auto=format&fit=crop&w=800&q=80',
    yearsTradition: '800+ Yrs',
    mastery: 'Fine Micro Bandhej'
  }
];

export const CURRENCY_RATES: Record<string, { symbol: string; rate: number }> = {
  INR: { symbol: '₹', rate: 1 },
  USD: { symbol: '$', rate: 0.012 },
  EUR: { symbol: '€', rate: 0.011 },
  GBP: { symbol: '£', rate: 0.0094 },
  AED: { symbol: 'AED ', rate: 0.044 }
};

export const FABRIC_CATEGORIES = [
  'all',
  'Kanjivaram Silk',
  'Soft Silk',
  'Tussar Silk',
  'Bandhani Georgette',
  'Chanderi'
];

export const OCCASION_CATEGORIES = [
  'all',
  'Bridal & Wedding',
  'Festive & Puja',
  'Cocktail & Reception',
  'Office & Daily Elegance'
];

export const CRAFT_CATEGORIES = [
  'all',
  'Handloom Zari',
  'Tie & Dye',
  'Kalamkari Hand-Painted'
];

export const COLOR_PALETTES = [
  { label: 'All Colors', value: 'all', hex: '#888888' },
  { label: 'Crimson Red', value: 'Crimson Red', hex: '#540D1E' },
  { label: 'Royal Emerald', value: 'Royal Emerald', hex: '#044A2B' },
  { label: 'Parrot Green', value: 'Parrot Green', hex: '#558B2F' },
  { label: 'Regal Plum', value: 'Regal Plum', hex: '#6B46C1' },
  { label: 'Ivory & Gold', value: 'Ivory & Gold', hex: '#E5E5E0' },
  { label: 'Peacock Blue', value: 'Peacock Blue', hex: '#1E1B4B' }
];
