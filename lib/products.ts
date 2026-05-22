export interface ColorOption {
  name: string;
  hex: string;
  image: string;
  glowColor: string;
}

export interface Highlight {
  label: string;
  value: string;
  description: string;
}

export interface Review {
  name: string;
  rating: number;
  text: string;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  category: string;
  tagline: string;
  price: number;
  originalPrice: number;
  image: string;
  colors: ColorOption[];
  highlights: Highlight[];
  specs: Record<string, string>;
  reviews: Review[];
  overallRating: number;
  reviewCount: number;
}

export const products: Product[] = [
  {
    id: "01",
    slug: "airdopes-nirvana",
    name: "Airdopes Nirvana",
    category: "WIRELESS EARBUDS",
    tagline: "Silence the world. Power the sound.",
    price: 1999,
    originalPrice: 3999,
    image: "/products/product-airdopes.png",
    colors: [
      { name: "Quartz White", hex: "#FFFFFF", image: "/products/airdopes-white.png", glowColor: "rgba(180,180,200,0.25)" },
      { name: "Carbon Black", hex: "#1C1C1C", image: "/products/airdopes-black.png", glowColor: "rgba(255,45,45,0.30)" },
      { name: "Crimson Red", hex: "#FF2D2D", image: "/products/airdopes-red.png", glowColor: "rgba(255,45,45,0.45)" }
    ],
    highlights: [
      { label: "ANC ACTIVE", value: "32dB", description: "Hybrid Active Noise Cancellation shuts out ambient chaos." },
      { label: "PLAYBACK", value: "120 Hrs", description: "Monster battery life including the charging case." },
      { label: "LATENCY", value: "60ms", description: "BEAST Mode minimizes audio lag for perfect sync." },
      { label: "DRIVERS", value: "10mm", description: "Titanium-alloy drivers deliver deep, thumping bass." }
    ],
    specs: {
      "Driver Size": "10mm x 2 Titanium Drivers",
      "Battery Life": "Up to 120 Hours (with Case)",
      "Noise Cancellation": "32dB Hybrid ANC",
      "Connectivity": "Bluetooth v5.3 / Instant Wake & Pair",
      "Water Resistance": "IPX5 Sweat & Splash Shield",
      "Weight": "4.5g (per Earbud)",
      "Warranty": "1 Year Limited Brand Warranty"
    },
    reviews: [
      { name: "Aarav Mehta", rating: 5, text: "The ANC is surprisingly good at this price point. Deep bass signature that boAt is known for, absolute value for money." },
      { name: "Neha Sharma", rating: 4, text: "Amazing battery life. I charged it once last week and it's still running. Perfect fit for workouts." },
      { name: "Rohan Das", rating: 5, text: "Incredible design and build quality. The Quartz White looks extremely premium and pristine." }
    ],
    overallRating: 4.7,
    reviewCount: 2847
  },
  {
    id: "04",
    slug: "rockerz-headphones",
    name: "Rockerz Headphones",
    category: "WIRELESS HEADPHONES",
    tagline: "Bass that bruises. Comfort that stays.",
    price: 2999,
    originalPrice: 5999,
    image: "/products/product-rockerz.png",
    colors: [
      { name: "Pitch Black", hex: "#0E0E0E", image: "/products/rockerz-black.png", glowColor: "rgba(255,45,45,0.30)" },
      { name: "Desert Sand", hex: "#E3CBB3", image: "/products/rockerz-beige.png", glowColor: "rgba(220,190,150,0.25)" },
      { name: "Crimson Red", hex: "#C2272D", image: "/products/rockerz-red.png", glowColor: "rgba(194,39,45,0.40)" }
    ],
    highlights: [
      { label: "DRIVERS", value: "40mm", description: "Massive dynamic drivers tuned for ultimate high-impact bass." },
      { label: "PLAYBACK", value: "65 Hrs", description: "Endless audio playback with support for ASAP Charge." },
      { label: "FAST CHARGE", value: "10 Min", description: "Get up to 10 hours of massive bass on a quick 10-minute charge." },
      { label: "ERGONOMICS", value: "Soft Cushion", description: "Ultra-plush ear cups designed for extended studio listening." }
    ],
    specs: {
      "Driver Size": "40mm Dynamic Bass Drivers",
      "Battery Life": "Up to 65 Hours Playback",
      "ASAP Charge": "10 Mins = 10 Hours Playtime",
      "Connectivity": "Bluetooth v5.2 / Dual Pairing & Aux Mode",
      "Water Resistance": "IPX4 Sweat Resistance",
      "Weight": "210g Ultra-Lightweight",
      "Warranty": "1 Year Brand Warranty"
    },
    reviews: [
      { name: "Vikram Malhotra", rating: 5, text: "The bass is exceptionally deep and clean. Doesn't distort at high volumes. Extremely comfortable over ear cups." },
      { name: "Ananya Iyer", rating: 4.5, text: "Dual pairing works seamlessly. I switch between my MacBook and Phone without any manual reconnects." }
    ],
    overallRating: 4.6,
    reviewCount: 1943
  },
  {
    id: "02",
    slug: "stone-speakers",
    name: "Stone Speakers",
    category: "PORTABLE SPEAKERS",
    tagline: "Built loud. Made indestructible.",
    price: 4999,
    originalPrice: 9999,
    image: "/products/product-stone.png",
    colors: [
      { name: "Carbon Black", hex: "#1A1A1A", image: "/products/stone-black.png", glowColor: "rgba(255,45,45,0.30)" },
      { name: "Forest Green", hex: "#2E5A44", image: "/products/stone-green.png", glowColor: "rgba(40,180,99,0.25)" },
      { name: "Active Blue", hex: "#1B4F72", image: "/products/stone-blue.png", glowColor: "rgba(45,120,255,0.30)" }
    ],
    highlights: [
      { label: "POWER OUTPUT", value: "30W RMS", description: "Room-filling stereo output with deep passive radiators." },
      { label: "RUGGED SHIELD", value: "IPX7 Waterproof", description: "Submersible in water, built to survive accidental falls." },
      { label: "PLAYBACK", value: "12 Hrs", description: "Powerful continuous battery back-up to fuel your outdoor trips." },
      { label: "STEREO SYNC", value: "TWS Cast", description: "Broadcast audio to two Stone speakers simultaneously for double impact." }
    ],
    specs: {
      "Output Power": "30W RMS Stereo Sound",
      "Battery Life": "Up to 12 Hours continuous play",
      "Protection Class": "IPX7 Waterproof & Shockproof",
      "Connectivity": "Bluetooth v5.0 / Aux / Type-C charging",
      "Drivers": "Dual 2.25\" Full Range Drivers",
      "Weight": "850g Heavy-Duty Build",
      "Warranty": "1 Year Brand Warranty"
    },
    reviews: [
      { name: "Kabir Sen", rating: 5, text: "Absolute beast of a speaker! Took it to the beach, got covered in sand and wet, still sounded incredible." },
      { name: "Pooja Hegde", rating: 4, text: "The passive bass radiators on the sides shake. Amazing thumping sound output." }
    ],
    overallRating: 4.8,
    reviewCount: 3412
  },
  {
    id: "03",
    slug: "wave-smartwatch",
    name: "Wave Smartwatch",
    category: "SMARTWEARABLES",
    tagline: "Time, amplified. Health, trackable.",
    price: 2799,
    originalPrice: 5499,
    image: "/products/product-wave.png",
    colors: [
      { name: "Quartz White", hex: "#EDEDED", image: "/products/wave-white.png", glowColor: "rgba(180,180,200,0.25)" },
      { name: "Active Black", hex: "#121212", image: "/products/wave-black.png", glowColor: "rgba(255,45,45,0.30)" },
      { name: "Crimson Red", hex: "#A62B2B", image: "/products/wave-red.png", glowColor: "rgba(166,43,43,0.40)" }
    ],
    highlights: [
      { label: "DISPLAY", value: "1.85\" HD", description: "Ultra-bright display visible under direct blinding sunlight." },
      { label: "HEALTH ENGINE", value: "SpO2 & HR", description: "Continuous heart rate and blood oxygen monitoring." },
      { label: "BATTERY LIFE", value: "7 Days", description: "Stamina to track all your vitals without needing daily recharges." },
      { label: "MODES", value: "100+ Sports", description: "Dedicated tracking algorithms for every physical activity." }
    ],
    specs: {
      "Display Size": "1.85-inch HD Full Touch Display",
      "Battery Life": "Up to 7 Days (Regular usage)",
      "Sensors": "Heart Rate, SpO2, Pedometer, Sleep Trackers",
      "Water Resistance": "IP68 Dust & Splash Proof",
      "Material": "Premium Zinc Alloy Casing",
      "Connectivity": "Bluetooth BT v5.1 / boAt Crest App Support",
      "Warranty": "1 Year Limited Brand Warranty"
    },
    reviews: [
      { name: "Meera Nair", rating: 4.5, text: "Display is bright and snappy. Custom watch faces are beautiful. Crest app makes tracking simple." },
      { name: "Sumit Goel", rating: 5, text: "Great battery life, easily lasts 6-7 days. Strap material is high quality and skin-friendly." }
    ],
    overallRating: 4.5,
    reviewCount: 1422
  },
  {
    id: "05",
    slug: "soundbars-signature",
    name: "Soundbars Signature",
    category: "HOME AUDIO SYSTEMS",
    tagline: "Cinematic audio. Heavy bass impact.",
    price: 8999,
    originalPrice: 17999,
    image: "/products/cat-soundbars.png",
    colors: [
      { name: "Carbon Black", hex: "#0C0C0C", image: "/products/cat-soundbars.png", glowColor: "rgba(255,45,45,0.30)" }
    ],
    highlights: [
      { label: "TOTAL POWER", value: "120W RMS", description: "Explosive audio output with dedicated wireless subwoofer." },
      { label: "CHANNELS", value: "2.1 Surround", description: "Optimized driver separation creates clean horizontal soundstage." },
      { label: "EQ MODES", value: "4 Pre-Sets", description: "Dynamically adapt audio profile for Movie, Music, News, or 3D surround." },
      { label: "CONNECTIVITY", value: "HDMI ARC", description: "Plug and play with single remote control setup." }
    ],
    specs: {
      "Output Power": "120W RMS with Subwoofer",
      "Subwoofer Type": "6.5-inch Wired Deep Bass Subwoofer",
      "Drivers": "4 x 2.25\" Dynamic Soundbar Drivers",
      "Connectivity": "HDMI ARC, Optical, Bluetooth v5.0, USB, AUX",
      "EQ Sound Profiles": "Movies, Music, News, 3D Surround",
      "Dimensions": "800mm x 70mm x 60mm (Soundbar)",
      "Warranty": "1 Year Brand Warranty"
    },
    reviews: [
      { name: "Devansh Vora", rating: 5, text: "My living room feels like a dynamic theater now. Bass on the wireless subwoofer is deep and solid." },
      { name: "Kriti Sen", rating: 4, text: "Simple setup with HDMI ARC. One remote controls both TV and speaker perfectly. Outstanding value." }
    ],
    overallRating: 4.7,
    reviewCount: 948
  }
];
