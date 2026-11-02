export const CURRENCY_RATES = {
  USD: { symbol: '$', rate: 1 },
  PKR: { symbol: 'Rs. ', rate: 280 },
  GBP: { symbol: '£', rate: 0.79 },
  AED: { symbol: 'AED ', rate: 3.67 }
};

export const CATEGORIES = [
  {
    id: 'all',
    name: 'All Collections',
    count: 14
  },
  {
    id: 'stitched',
    name: 'Stitched Pret',
    subtitle: 'Luxury ready-to-wear & formals',
    image: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?q=80&w=900&auto=format&fit=crop',
    count: 6
  },
  {
    id: 'unstitched',
    name: 'Unstitched Fabric',
    subtitle: 'Pure handloomed silks & organza',
    image: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=900&auto=format&fit=crop',
    count: 4
  },
  {
    id: 'babies',
    name: 'Babies & Kids',
    subtitle: 'Little princess heirloom festive',
    image: 'https://images.unsplash.com/photo-1518831959646-742c3a14ebf7?q=80&w=900&auto=format&fit=crop',
    count: 2
  },
  {
    id: 'luxury-formals',
    name: 'Festive Formals',
    subtitle: 'Handcrafted zardozi & pearls',
    image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?q=80&w=900&auto=format&fit=crop',
    count: 4
  },
  {
    id: 'ready-to-wear',
    name: 'Ready To Wear',
    subtitle: 'Chic everyday & festive pret',
    image: 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?q=80&w=900&auto=format&fit=crop',
    count: 5
  },
  {
    id: 'silk-coords',
    name: 'Silk & Co-ords',
    subtitle: 'Contemporary modern cuts',
    image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=900&auto=format&fit=crop',
    count: 3
  }
];

export const PRODUCTS = [
  {
    id: 1,
    title: 'Gul-e-Noor Embroidered Chiffon',
    category: 'luxury-formals',
    categoryLabel: 'Festive Formals',
    price: 185,
    originalPrice: 220,
    rating: 4.9,
    reviewsCount: 38,
    tag: 'Bestseller',
    tagColor: 'bg-[#4A0E17] text-[#FAF7F2]',
    images: [
      'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=1000&auto=format&fit=crop'
    ],
    fabric: 'Pure Chiffon & Handcrafted Organza',
    pieces: '3 Piece (Shirt, Slip & Dupatta)',
    colors: [
      { name: 'Blush Rose', hex: '#F2C6CE' },
      { name: 'Champagne Gold', hex: '#E6D3A3' },
      { name: 'Royal Ivory', hex: '#F9F6F0' }
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    description: 'An ethereal creation adorned with intricate threadwork, pearls, and iridescent sequins. Features hand-cut scalloped borders and pure crushed silk trousers.',
    isNew: true
  },
  {
    id: 2,
    title: 'Zahra Velvet Rose Couture',
    category: 'luxury-formals',
    categoryLabel: 'Luxury Formals',
    price: 240,
    originalPrice: 290,
    rating: 5.0,
    reviewsCount: 44,
    tag: 'Trending',
    tagColor: 'bg-[#C59B27] text-white',
    images: [
      'https://images.unsplash.com/photo-1610030469983-98e550d6193c?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?q=80&w=1000&auto=format&fit=crop'
    ],
    fabric: 'Micro Velvet 9000 & Zari Net',
    pieces: '3 Piece (Maxi Anarkali & Dupatta)',
    colors: [
      { name: 'Deep Crimson', hex: '#58111A' },
      { name: 'Midnight Emerald', hex: '#123524' }
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    description: 'A regal silhouette sculpted from rich micro velvet, embellished with authentic tilla work, dabka, and crystal accents on the neckline and sleeve cuffs.',
    isNew: false
  },
  {
    id: 3,
    title: 'Ayat Pastel Raw Silk Pret',
    category: 'ready-to-wear',
    categoryLabel: 'Ready To Wear',
    price: 135,
    originalPrice: 160,
    rating: 4.8,
    reviewsCount: 29,
    tag: 'New Season',
    tagColor: 'bg-[#2A2325] text-white',
    images: [
      'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1000&auto=format&fit=crop'
    ],
    fabric: '100% Pure Korean Raw Silk',
    pieces: '2 Piece (A-line Shirt & Straight Pants)',
    colors: [
      { name: 'Sage Mint', hex: '#B8CDBB' },
      { name: 'Powder Lilac', hex: '#D6C7E0' }
    ],
    sizes: ['XS', 'S', 'M', 'L'],
    description: 'Understated luxury for modern soirees. Minimalist cut embellished with delicate French knots and organza insert detailing at the hemline.',
    isNew: true
  },
  {
    id: 4,
    title: 'Mirha Modern Silk Co-ord Set',
    category: 'silk-coords',
    categoryLabel: 'Silk & Co-ords',
    price: 110,
    originalPrice: 130,
    rating: 4.9,
    reviewsCount: 52,
    tag: 'Hot Pick',
    tagColor: 'bg-[#C59B27] text-white',
    images: [
      'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?q=80&w=1000&auto=format&fit=crop'
    ],
    fabric: 'Satin Silk with Textured Weave',
    pieces: '2 Piece (Tunic & Flared Trousers)',
    colors: [
      { name: 'Dusty Peach', hex: '#E8B4A2' },
      { name: 'Onyx Noir', hex: '#1C1B1F' }
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    description: 'Effortlessly versatile contemporary co-ord set made from feather-light satin silk, designed for smart dining, brunch, and casual dinners.',
    isNew: false
  },
  {
    id: 5,
    title: 'Shehnai Festive Organza Angrakha',
    category: 'festive-26',
    categoryLabel: 'Summer Festive \'26',
    price: 215,
    originalPrice: 260,
    rating: 5.0,
    reviewsCount: 61,
    tag: 'Exclusive',
    tagColor: 'bg-[#4A0E17] text-white',
    images: [
      'https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1610030469983-98e550d6193c?q=80&w=1000&auto=format&fit=crop'
    ],
    fabric: 'Glass Organza with Cotton Silk Slip',
    pieces: '3 Piece (Angrakha, Trouser, Dupatta)',
    colors: [
      { name: 'Golden Apricot', hex: '#EBC49F' },
      { name: 'Pistachio Glow', hex: '#CFDFC3' }
    ],
    sizes: ['S', 'M', 'L'],
    description: 'Traditional royal flare reimagined with contemporary precision. Features gotta patti borders, mirror motifs, and signature handcrafted tassels.',
    isNew: true
  },
  {
    id: 6,
    title: 'Noor-e-Jahan Hand-Worked Kalidar',
    category: 'luxury-formals',
    categoryLabel: 'Luxury Formals',
    price: 275,
    originalPrice: 320,
    rating: 4.9,
    reviewsCount: 31,
    tag: 'Royal Edition',
    tagColor: 'bg-[#4A0E17] text-white',
    images: [
      'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1610030469983-98e550d6193c?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?q=80&w=1000&auto=format&fit=crop'
    ],
    fabric: 'Pure Net with Banarsi Jamawar Trouser',
    pieces: '3 Piece (Kalidar Gown, Dupatta & Pants)',
    colors: [
      { name: 'Ivory Frost', hex: '#FAF9F6' },
      { name: 'Soft Coral', hex: '#F08080' }
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    description: 'A 16-kali flowy gown featuring heavy handwork on the bodice, scalloped foil print organza dupatta, and pure silk lining.',
    isNew: false
  },
  {
    id: 7,
    title: 'Mah-e-Nau Printed Lawn Pret',
    category: 'ready-to-wear',
    categoryLabel: 'Ready To Wear',
    price: 89,
    originalPrice: 110,
    rating: 4.7,
    reviewsCount: 77,
    tag: 'Daily Luxury',
    tagColor: 'bg-[#2A2325] text-white',
    images: [
      'https://images.unsplash.com/photo-1496747611176-843222e1e57c?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?q=80&w=1000&auto=format&fit=crop'
    ],
    fabric: 'Supima Egyptian Cotton Lawn',
    pieces: '2 Piece (Embroidered Kurti & Culottes)',
    colors: [
      { name: 'Oatmeal Beige', hex: '#E6DEC9' },
      { name: 'Azure Sky', hex: '#87CEEB' }
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    description: 'Breathable, ultra-fine lawn with digital floral graphics, organza embroidered sleeve borders, and pearl button placket.',
    isNew: true
  },
  {
    id: 8,
    title: 'Seraphina Modern Cape & Slip Set',
    category: 'silk-coords',
    categoryLabel: 'Silk & Co-ords',
    price: 165,
    originalPrice: 195,
    rating: 5.0,
    reviewsCount: 19,
    tag: 'Runway Pick',
    tagColor: 'bg-[#C59B27] text-white',
    images: [
      'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?q=80&w=1000&auto=format&fit=crop'
    ],
    fabric: 'Silk Georgette & Crepe',
    pieces: '3 Piece (Floor-length Cape, Silk Slip, Trousers)',
    colors: [
      { name: 'Champagne Nude', hex: '#EED9C4' },
      { name: 'Midnight Plum', hex: '#482D42' }
    ],
    sizes: ['XS', 'S', 'M', 'L'],
    description: 'Dramatic flowing cape featuring hand-embroidered floral vines along the neckline and cuffs, paired with tailored cigarette pants.',
    isNew: true,
    stitchType: 'stitched'
  },
  {
    id: 9,
    title: 'Noor Little Princess Heirloom Angrakha',
    category: 'babies',
    categoryLabel: 'Babies & Kids Couture',
    stitchType: 'babies',
    price: 95,
    originalPrice: 120,
    rating: 5.0,
    reviewsCount: 22,
    tag: 'Little Princess',
    tagColor: 'bg-[#B76E79] text-white',
    images: [
      'https://images.unsplash.com/photo-1518831959646-742c3a14ebf7?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1622290291468-a28f7a7dc6a8?q=80&w=1000&auto=format&fit=crop'
    ],
    fabric: 'Pure Crinkle Chiffon with Hypoallergenic Soft Silk Lining',
    pieces: '2 Piece (Frock & Soft Pajama)',
    colors: [
      { name: 'Blush Pink', hex: '#FAD2E1' },
      { name: 'Butter Gold', hex: '#FFF1C5' }
    ],
    sizes: ['0-6M', '6-12M', '1-2Y', '2-4Y', '4-6Y'],
    description: 'Bespoke heirloom festive ensemble handcrafted for infants and toddlers. Soft feather-light seams and organic breathable silk lining for tender skin.',
    isNew: true
  },
  {
    id: 10,
    title: 'Inaya Royal Raw Silk Festive Frock',
    category: 'babies',
    categoryLabel: 'Babies & Kids Couture',
    stitchType: 'babies',
    price: 85,
    originalPrice: 110,
    rating: 4.9,
    reviewsCount: 31,
    tag: 'Babies Pret',
    tagColor: 'bg-[#C59B27] text-white',
    images: [
      'https://images.unsplash.com/photo-1622290291468-a28f7a7dc6a8?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1518831959646-742c3a14ebf7?q=80&w=1000&auto=format&fit=crop'
    ],
    fabric: 'Pure Korean Raw Silk with Soft Cotton Lining',
    pieces: '2 Piece (Flared Dress & Net Dupatta)',
    colors: [
      { name: 'Peach Sorbet', hex: '#FFD7BA' },
      { name: 'Mint Frost', hex: '#D8F3DC' }
    ],
    sizes: ['6-12M', '1-2Y', '2-4Y', '4-6Y'],
    description: 'Charming festive attire featuring handcrafted gota borders and subtle pearl tassels, tailored specifically for memorable family celebrations.',
    isNew: true
  }
];

export const TESTIMONIALS = [
  {
    id: 1,
    name: 'Ayla Tariq',
    role: 'Verified Buyer, London',
    rating: 5,
    comment: 'The craftsmanship of the Gul-e-Noor set blew me away! The organza falls gracefully and the hand-embroidery looks like high couture. Received countless compliments at my brother\'s wedding.',
    date: '2 weeks ago',
    outfit: 'Gul-e-Noor Chiffon'
  },
  {
    id: 2,
    name: 'Zara Hameed',
    role: 'Fashion Consultant, Dubai',
    rating: 5,
    comment: 'Laila Shamsi has completely elevated eastern pret wear. The fabric weight, fine stitching, and attention to seams are unmatched. Standard of international luxury fashion houses!',
    date: '1 month ago',
    outfit: 'Zahra Velvet Rose'
  },
  {
    id: 3,
    name: 'Mahnoor Khan',
    role: 'Verified Buyer, Lahore',
    rating: 5,
    comment: 'Ordered for an evening dinner and it arrived in 48 hours in gorgeous signature rose-gold packaging with a velvet dust bag. True to size and exquisite fabric quality.',
    date: '3 weeks ago',
    outfit: 'Ayat Raw Silk Pret'
  }
];

export const INSTAGRAM_POSTS = [
  {
    id: 1,
    image: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?q=80&w=800&auto=format&fit=crop',
    handle: '@fatima_elahi',
    likes: '2.4k'
  },
  {
    id: 2,
    image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?q=80&w=800&auto=format&fit=crop',
    handle: '@sara.vogue',
    likes: '4.8k'
  },
  {
    id: 3,
    image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=800&auto=format&fit=crop',
    handle: '@amna_stylist',
    likes: '3.1k'
  },
  {
    id: 4,
    image: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=800&auto=format&fit=crop',
    handle: '@noor_couture',
    likes: '5.2k'
  },
  {
    id: 5,
    image: 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?q=80&w=800&auto=format&fit=crop',
    handle: '@hira_lux',
    likes: '1.9k'
  },
  {
    id: 6,
    image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=800&auto=format&fit=crop',
    handle: '@zainab_style',
    likes: '3.9k'
  }
];
