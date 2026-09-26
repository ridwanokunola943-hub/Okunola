import { Category, Provider, Service, Product, Post, Review, User, PlatformSetting } from '../types';

export const INITIAL_CATEGORIES: Category[] = [
  { id: 'cat-shops', name: 'Shops', slug: 'shops', icon: '🏪', description: 'Local retail, student provisions, groceries, electronics & stores', isActive: true, order: 1 },
  { id: 'cat-food', name: 'Food & Drink', slug: 'food-drink', icon: '🍲', description: 'Local bukateria, campus food vendors, restaurants, chops & drinks', isActive: true, order: 2 },
  { id: 'cat-services', name: 'Services', slug: 'services', icon: '🛠️', description: 'Repairs, laundry, barbers, cleaning, logistics & artisans', isActive: true, order: 3 },
  { id: 'cat-electronics', name: 'Electronics', slug: 'electronics', icon: '💻', description: 'Laptops, chargers, solar fans, power banks & repairs', isActive: true, order: 4 },
  { id: 'cat-fashion', name: 'Fashion', slug: 'fashion', icon: '👕', description: 'Tailoring, native wear, shoes, wigs & accessories', isActive: true, order: 5 },
  { id: 'cat-phones', name: 'Phone & Gadgets', slug: 'phone-gadgets', icon: '📱', description: 'Smartphones, screen repair, phone accessories & accessories', isActive: true, order: 6 },
  { id: 'cat-home', name: 'Home & Office', slug: 'home-office', icon: '🛋️', description: 'Hostel furniture, room decor, mattresses & cleaning supplies', isActive: true, order: 7 },
  { id: 'cat-other', name: 'More', slug: 'more', icon: '⋯', description: 'Campus tutors, project binding, printing & other services', isActive: true, order: 8 },
  { id: 'cat-barber', name: 'Barbers', slug: 'barbers', icon: '💈', description: 'Professional haircuts, beard grooming, fading & campus home cuts', isActive: true, order: 9 },
  { id: 'cat-laundry', name: 'Laundry', slug: 'laundry', icon: '🧺', description: 'Wash & fold, ironing, native attire care, pickup & delivery', isActive: true, order: 10 }
];

export const INITIAL_PROVIDERS: Provider[] = [
  {
    id: 'prov-mama-t',
    ownerId: 'user-mama-t',
    businessName: 'Mama T Fresh Foods',
    ownerName: 'Mrs. Tolani Adebisi',
    phone: '+234 810 555 7821',
    email: 'mamatfreshfoods@gmail.com',
    category: 'Food & Drink',
    description: 'Freshly cooked local and continental dishes. We serve quality food at affordable prices. Eat good, feel good! Fast delivery across Malete hostels & KWASU campus.',
    location: 'Malete, Kwara State',
    address: 'Near KWASU Main Gate, Campus Commercial Hub, Malete',
    distanceKm: 0.5,
    logoUrl: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=300&auto=format&fit=crop&q=80',
    coverUrl: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1000&auto=format&fit=crop&q=80',
    openingHours: 'Open • Closes 9:00 PM',
    isOpen: true,
    homeServiceAvailable: false,
    deliveryAvailable: true,
    status: 'approved',
    isVerified: true,
    rating: 4.8,
    reviewCount: 32,
    followerCount: 640,
    paymentInfo: 'Cash on Delivery or Transfer',
    photos: [
      'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1604382355076-af4b0eb60143?w=600&auto=format&fit=crop&q=80'
    ],
    createdAt: '2026-01-01T08:00:00Z'
  },
  {
    id: 'prov-abdul-tech',
    ownerId: 'user-abdul-tech',
    businessName: 'Abdul Tech',
    ownerName: 'Abdulrahman Yusuf',
    phone: '+234 814 223 9081',
    email: 'abdultech.repairs@gmail.com',
    category: 'Services',
    description: 'Phone, laptop and accessories repair. Fast and reliable service. We come to you or you can visit our shop at Tipper Garage.',
    location: 'Malete, Kwara State',
    address: 'Shop 8, Tipper Garage Complex, Malete',
    distanceKm: 2.1,
    logoUrl: 'https://images.unsplash.com/photo-1581092921461-eab62e97a780?w=300&auto=format&fit=crop&q=80',
    coverUrl: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=1000&auto=format&fit=crop&q=80',
    openingHours: 'Available Now',
    isOpen: true,
    homeServiceAvailable: true,
    deliveryAvailable: true,
    status: 'approved',
    isVerified: true,
    rating: 4.7,
    reviewCount: 18,
    followerCount: 310,
    paymentInfo: 'Transfer, Cash & POS',
    photos: [
      'https://images.unsplash.com/photo-1597740985671-2a8a3b80532e?w=600&auto=format&fit=crop&q=80'
    ],
    createdAt: '2026-01-04T09:00:00Z'
  },
  {
    id: 'prov-royal-chop',
    ownerId: 'user-royal-chop',
    businessName: 'Royal Chop',
    ownerName: 'Prince Kingsley',
    phone: '+234 816 889 0012',
    email: 'royalchop.malete@gmail.com',
    category: 'Food & Drink',
    description: 'Crispy chicken & chips, shawarma, hot pastries, meat pies, and freshly squeezed smoothies for students on the go.',
    location: 'Malete - Tipper Garage',
    address: 'Opposite Motor Park, Tipper Garage, Malete',
    distanceKm: 0.7,
    logoUrl: 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=300&auto=format&fit=crop&q=80',
    coverUrl: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=1000&auto=format&fit=crop&q=80',
    openingHours: 'Open • Closes 10:00 PM',
    isOpen: true,
    homeServiceAvailable: false,
    deliveryAvailable: true,
    status: 'approved',
    isVerified: true,
    rating: 4.6,
    reviewCount: 21,
    followerCount: 420,
    paymentInfo: 'Cash & Transfer',
    createdAt: '2026-01-10T12:00:00Z'
  },
  {
    id: 'prov-dees-snacks',
    ownerId: 'user-dees-snacks',
    businessName: "Dee's Snacks",
    ownerName: 'Deborah Bello',
    phone: '+234 803 771 2299',
    email: 'deessnacks@gmail.com',
    category: 'Food & Drink',
    description: 'Fresh warm doughnuts, egg rolls, small chops packs, and ice-cold soft drinks delivered to hostels.',
    location: 'Malete - Safari Area',
    address: 'Safari Junction Road, Malete',
    distanceKm: 1.2,
    logoUrl: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=300&auto=format&fit=crop&q=80',
    coverUrl: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=1000&auto=format&fit=crop&q=80',
    openingHours: 'Open • Closes 8:30 PM',
    isOpen: true,
    homeServiceAvailable: false,
    deliveryAvailable: true,
    status: 'approved',
    isVerified: true,
    rating: 4.5,
    reviewCount: 18,
    followerCount: 290,
    paymentInfo: 'Cash on drop or Transfer',
    createdAt: '2026-01-15T11:00:00Z'
  },
  {
    id: 'prov-jollof-more',
    ownerId: 'user-jollof-more',
    businessName: 'Jollof & More',
    ownerName: 'Oluwaseun Daniels',
    phone: '+234 812 443 6611',
    email: 'jollofandmore@gmail.com',
    category: 'Food & Drink',
    description: 'Signature firewood party Jollof, spicy peppered beef, fried fish, and refreshing drinks.',
    location: 'Malete - Mass Comm Village',
    address: 'Mass Comm Area, Malete',
    distanceKm: 1.4,
    logoUrl: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=300&auto=format&fit=crop&q=80',
    coverUrl: 'https://images.unsplash.com/photo-1512058564366-18510be2db19?w=1000&auto=format&fit=crop&q=80',
    openingHours: 'Open • Closes 9:30 PM',
    isOpen: true,
    homeServiceAvailable: false,
    deliveryAvailable: true,
    status: 'approved',
    isVerified: true,
    rating: 4.7,
    reviewCount: 25,
    followerCount: 380,
    paymentInfo: 'Transfer or Cash',
    createdAt: '2026-01-18T10:00:00Z'
  },
  {
    id: 'prov-bukka-express',
    ownerId: 'user-bukka-express',
    businessName: 'Bukka Express',
    ownerName: 'Alhaja Kuburat',
    phone: '+234 809 112 3344',
    email: 'bukkaexpress@gmail.com',
    category: 'Food & Drink',
    description: 'Hot Amala, Semo, Pounded Yam with Gbegiri & Ewedu, assorted meat, and spicy goat head.',
    location: 'Malete - Tipper Garage',
    address: 'Beside Central Mosque, Malete',
    distanceKm: 1.6,
    logoUrl: 'https://images.unsplash.com/photo-1604382355076-af4b0eb60143?w=300&auto=format&fit=crop&q=80',
    coverUrl: 'https://images.unsplash.com/photo-1604382355076-af4b0eb60143?w=1000&auto=format&fit=crop&q=80',
    openingHours: 'Open • Closes 8:00 PM',
    isOpen: true,
    homeServiceAvailable: false,
    deliveryAvailable: true,
    status: 'approved',
    isVerified: true,
    rating: 4.3,
    reviewCount: 12,
    followerCount: 210,
    paymentInfo: 'Cash & Transfer',
    createdAt: '2026-01-20T09:30:00Z'
  },
  {
    id: 'prov-blessing-stores',
    ownerId: 'user-blessing-stores',
    businessName: 'Blessing Stores',
    ownerName: 'Blessing Okafor',
    phone: '+234 810 998 1234',
    email: 'blessingstores@gmail.com',
    category: 'Shops',
    description: 'Supermarket and campus provisions store. Groceries, toiletries, snacks, noodles cartons, beverages, and hostel basics.',
    location: 'Malete - Tipper Garage',
    address: 'Plaza 2, Tipper Garage, Malete',
    distanceKm: 0.4,
    logoUrl: 'https://images.unsplash.com/photo-1578916171728-46686eac8d58?w=300&auto=format&fit=crop&q=80',
    coverUrl: 'https://images.unsplash.com/photo-1578916171728-46686eac8d58?w=1000&auto=format&fit=crop&q=80',
    openingHours: 'Open • Closes 9:00 PM',
    isOpen: true,
    homeServiceAvailable: false,
    deliveryAvailable: true,
    status: 'approved',
    isVerified: true,
    rating: 4.8,
    reviewCount: 29,
    followerCount: 450,
    paymentInfo: 'Cash, POS & Transfer',
    createdAt: '2026-01-08T09:00:00Z'
  },
  {
    id: 'prov-faith-graphics',
    ownerId: 'user-faith-graphics',
    businessName: 'Faith Graphics & Media',
    ownerName: 'Faith Oluwadare',
    phone: '+234 816 777 5543',
    email: 'faithgraphics@gmail.com',
    category: 'Services',
    description: 'Creative graphics design, business logos, flyers, banners, project formatting, and printing for campus students and brands.',
    location: 'Malete - Campus Walkway',
    address: 'Near KWASU Library Complex, Malete',
    distanceKm: 0.6,
    logoUrl: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?w=300&auto=format&fit=crop&q=80',
    coverUrl: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?w=1000&auto=format&fit=crop&q=80',
    openingHours: 'Available Now',
    isOpen: true,
    homeServiceAvailable: true,
    deliveryAvailable: true,
    status: 'approved',
    isVerified: true,
    rating: 4.9,
    reviewCount: 34,
    followerCount: 520,
    paymentInfo: 'Bank Transfer',
    createdAt: '2026-01-05T10:00:00Z'
  },
  {
    id: 'prov-john-poultry',
    ownerId: 'user-john-poultry',
    businessName: 'John Poultry Farm & Meat Hub',
    ownerName: 'John Ayodele',
    phone: '+234 805 332 1199',
    email: 'johnpoultry@gmail.com',
    category: 'Shops',
    description: 'Fresh dressed chicken, jumbo crates of eggs, turkey cuts, and live broilers delivered directly to hostels and bukaterias.',
    location: 'Malete - Apodu Road',
    address: 'Apodu Road, Malete',
    distanceKm: 2.4,
    logoUrl: 'https://images.unsplash.com/photo-1548550023-2bdb3c5beed7?w=300&auto=format&fit=crop&q=80',
    coverUrl: 'https://images.unsplash.com/photo-1548550023-2bdb3c5beed7?w=1000&auto=format&fit=crop&q=80',
    openingHours: 'Available for delivery today',
    isOpen: true,
    homeServiceAvailable: false,
    deliveryAvailable: true,
    status: 'approved',
    isVerified: true,
    rating: 4.7,
    reviewCount: 16,
    followerCount: 230,
    paymentInfo: 'Cash on drop or Transfer',
    createdAt: '2026-01-12T07:30:00Z'
  },
  {
    id: 'prov-1',
    ownerId: 'user-p1',
    businessName: 'Malete Executive Cuts',
    ownerName: 'Tunde Adebayo',
    phone: '+234 803 123 4567',
    email: 'maletecuts@gmail.com',
    category: 'Barbers',
    description: 'Premier grooming studio in Malete. Specializing in flawless fades, razor edge styling, texturizing, and VIP room-service haircuts directly to your hostel.',
    location: 'Malete - Tipper Garage',
    address: 'Suite 4, Harmony Plaza, Opposite Tipper Garage, Malete',
    distanceKm: 0.3,
    logoUrl: 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=300&auto=format&fit=crop&q=80',
    coverUrl: 'https://images.unsplash.com/photo-1585747860715-2ba37e788b70?w=1000&auto=format&fit=crop&q=80',
    openingHours: '8:00 AM - 9:00 PM (Mon - Sun)',
    isOpen: true,
    homeServiceAvailable: true,
    deliveryAvailable: false,
    status: 'approved',
    isVerified: true,
    rating: 4.9,
    reviewCount: 42,
    followerCount: 248,
    paymentInfo: 'Cash & Paystack Transfer accepted',
    photos: [
      'https://images.unsplash.com/photo-1622286342621-4bd786c2447c?w=600&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1599351431202-1e0f0137899a?w=600&auto=format&fit=crop&q=80'
    ],
    createdAt: '2026-01-10T10:00:00Z'
  },
  {
    id: 'prov-2',
    ownerId: 'user-p2',
    businessName: 'Iya Moria Authentic Buka',
    ownerName: 'Moriah Balogun',
    phone: '+234 814 987 6543',
    email: 'iyamoriafood@gmail.com',
    category: 'Food & Drinks',
    description: 'Hot, delicious local Nigerian meals cooked with passion. Famous for soft piping-hot Amala with Gbegiri & Ewedu, party Jollof rice, peppered goat meat, and fresh fish.',
    location: 'Malete - KWASU Gate',
    address: 'Near KWASU Main Gate, Campus Walkway, Malete',
    distanceKm: 0.5,
    logoUrl: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=300&auto=format&fit=crop&q=80',
    coverUrl: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1000&auto=format&fit=crop&q=80',
    openingHours: '7:30 AM - 8:30 PM (Mon - Sat)',
    isOpen: true,
    homeServiceAvailable: false,
    deliveryAvailable: true,
    status: 'approved',
    isVerified: true,
    rating: 4.8,
    reviewCount: 79,
    followerCount: 512,
    paymentInfo: 'Pay on Delivery / Bank Transfer',
    photos: [
      'https://images.unsplash.com/photo-1604382355076-af4b0eb60143?w=600&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=600&auto=format&fit=crop&q=80'
    ],
    createdAt: '2026-01-05T08:00:00Z'
  },
  {
    id: 'prov-3',
    ownerId: 'user-p3',
    businessName: 'CleanHive Hostel & Home Cleaners',
    ownerName: 'David Oladimeji',
    phone: '+234 802 334 5566',
    email: 'cleanhive.malete@gmail.com',
    category: 'House Cleaning',
    description: 'Professional room and apartment deep cleaners for students, lecturers, and residents in Malete. We bring top detergents, disinfectants, and modern cleaning equipment to sanitize your living space.',
    location: 'Malete - Safari Area',
    address: 'Behind Safari Lodge, Malete',
    distanceKm: 1.1,
    logoUrl: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=300&auto=format&fit=crop&q=80',
    coverUrl: 'https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?w=1000&auto=format&fit=crop&q=80',
    openingHours: '7:00 AM - 6:00 PM (Daily)',
    isOpen: true,
    homeServiceAvailable: true,
    deliveryAvailable: false,
    status: 'approved',
    isVerified: true,
    rating: 4.7,
    reviewCount: 31,
    followerCount: 164,
    paymentInfo: 'Cash upon satisfaction or Transfer',
    photos: [
      'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=600&auto=format&fit=crop&q=80'
    ],
    createdAt: '2026-01-15T11:00:00Z'
  },
  {
    id: 'prov-4',
    ownerId: 'user-p4',
    businessName: 'SparkleWash Express Laundry',
    ownerName: 'Fatima Ibrahim',
    phone: '+234 806 778 9900',
    email: 'sparklewash.malete@gmail.com',
    category: 'Laundry',
    description: 'Neat washing, crisp pressing, and gentle fabric care. Free hostel pickup and delivery for orders above ₦5,000. 24-hour express service available.',
    location: 'Malete - Tipper Garage',
    address: 'Tipper Garage Junction, Malete',
    distanceKm: 0.4,
    logoUrl: 'https://images.unsplash.com/photo-1545173168-9f1907e80789?w=300&auto=format&fit=crop&q=80',
    coverUrl: 'https://images.unsplash.com/photo-1517677208171-0bc6725a3e60?w=1000&auto=format&fit=crop&q=80',
    openingHours: '8:00 AM - 7:00 PM (Mon - Sat)',
    isOpen: true,
    homeServiceAvailable: true,
    deliveryAvailable: true,
    status: 'approved',
    isVerified: true,
    rating: 4.9,
    reviewCount: 56,
    followerCount: 320,
    paymentInfo: 'Cash, Transfer, Card',
    photos: [
      'https://images.unsplash.com/photo-1489274495757-95c7c837b101?w=600&auto=format&fit=crop&q=80'
    ],
    createdAt: '2026-01-08T09:00:00Z'
  },
  {
    id: 'prov-5',
    ownerId: 'user-p5',
    businessName: 'Chef Tolu Private Kitchen',
    ownerName: 'Tolulope Alabi',
    phone: '+234 813 555 4321',
    email: 'cheftolukitchen@gmail.com',
    category: 'Home Cooking',
    description: 'Talented culinary specialist available to cook pots of native soups, fried rice, pasta, or meal batches directly in your kitchen. We handle the hard cooking work so you enjoy home-cooked goodness.',
    location: 'Malete - Stadium Road',
    address: 'Stadium Road, Malete',
    distanceKm: 0.8,
    logoUrl: 'https://images.unsplash.com/photo-1577219491135-ce391730fb2c?w=300&auto=format&fit=crop&q=80',
    coverUrl: 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=1000&auto=format&fit=crop&q=80',
    openingHours: '9:00 AM - 8:00 PM (Daily)',
    isOpen: true,
    homeServiceAvailable: true,
    deliveryAvailable: true,
    status: 'approved',
    isVerified: true,
    rating: 4.8,
    reviewCount: 28,
    followerCount: 198,
    paymentInfo: 'Cash or Instant Transfer',
    photos: [
      'https://images.unsplash.com/photo-1498837167922-ddd27525d352?w=600&auto=format&fit=crop&q=80'
    ],
    createdAt: '2026-01-20T14:00:00Z'
  },
  {
    id: 'prov-6',
    ownerId: 'user-p6',
    businessName: 'Kwara Glam Hair & Wig Studio',
    ownerName: 'Blessing Okafor',
    phone: '+234 809 223 3445',
    email: 'kwaraglam@gmail.com',
    category: 'Hair & Beauty',
    description: 'Expert hair braiding, knotless box braids, wig installation, styling, revamping, and locs grooming. Relaxing salon environment with home visits available.',
    location: 'Malete - Campus Walkway',
    address: 'Shop 12, Student Union Commercial Hub, Malete',
    distanceKm: 0.6,
    logoUrl: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=300&auto=format&fit=crop&q=80',
    coverUrl: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=1000&auto=format&fit=crop&q=80',
    openingHours: '9:00 AM - 7:30 PM (Mon - Sat)',
    isOpen: true,
    homeServiceAvailable: true,
    deliveryAvailable: false,
    status: 'approved',
    isVerified: true,
    rating: 4.7,
    reviewCount: 38,
    followerCount: 275,
    paymentInfo: 'POS, Transfer, Cash',
    photos: [
      'https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388?w=600&auto=format&fit=crop&q=80'
    ],
    createdAt: '2026-01-12T12:00:00Z'
  },
  {
    id: 'prov-7',
    ownerId: 'user-p7',
    businessName: 'Malete Swift Dispatch & Errands',
    ownerName: 'Ridwan Lawal',
    phone: '+234 816 444 8899',
    email: 'maleteswift@gmail.com',
    category: 'Delivery & Errands',
    description: 'Fast, dependable motorbike delivery across Malete, KWASU campus, and highway locations. We deliver meals, groceries, documents, and run urgent errands.',
    location: 'Malete - Junction',
    address: 'Opposite Central Mosque, Malete Junction',
    distanceKm: 0.2,
    logoUrl: 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?w=300&auto=format&fit=crop&q=80',
    coverUrl: 'https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?w=1000&auto=format&fit=crop&q=80',
    openingHours: '7:00 AM - 10:00 PM (Daily)',
    isOpen: true,
    homeServiceAvailable: true,
    deliveryAvailable: true,
    status: 'approved',
    isVerified: true,
    rating: 4.9,
    reviewCount: 64,
    followerCount: 410,
    paymentInfo: 'Cash on drop or Transfer',
    createdAt: '2026-01-02T07:00:00Z'
  },
  {
    id: 'prov-8',
    ownerId: 'user-p8',
    businessName: 'SofaCare Malete Deep Extraction',
    ownerName: 'Babatunde Sanni',
    phone: '+234 807 888 1122',
    email: 'sofacaremalete@gmail.com',
    category: 'Sofa & Chair Cleaning',
    description: 'Restore dull, stained hostel couches and office chairs! We do wet foam extraction, fabric deodorization, and mattress cleaning right in your room.',
    location: 'Malete - Safari Area',
    address: 'Safari Complex, Malete',
    distanceKm: 1.2,
    logoUrl: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=300&auto=format&fit=crop&q=80',
    coverUrl: 'https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?w=1000&auto=format&fit=crop&q=80',
    openingHours: '8:00 AM - 6:00 PM (Daily)',
    isOpen: true,
    homeServiceAvailable: true,
    deliveryAvailable: false,
    status: 'approved',
    isVerified: true,
    rating: 4.6,
    reviewCount: 19,
    followerCount: 115,
    paymentInfo: 'Cash on inspection',
    createdAt: '2026-01-18T10:30:00Z'
  }
];

export const INITIAL_SERVICES: Service[] = [
  // Abdul Tech
  {
    id: 'srv-abdul-1',
    providerId: 'prov-abdul-tech',
    name: 'Phone Repair',
    description: 'Diagnosis and hardware/software repair for Android and iPhone smartphones.',
    price: 2500,
    pricingType: 'starting_from',
    duration: '45 mins',
    homeService: true,
    deliveryOption: true,
    bookingOption: true,
    category: 'Services'
  },
  {
    id: 'srv-abdul-2',
    providerId: 'prov-abdul-tech',
    name: 'Screen Replacement',
    description: 'Original and grade-A replacement screens for cracked or blacked out smartphone displays.',
    price: 5000,
    pricingType: 'starting_from',
    duration: '1 hour',
    homeService: true,
    deliveryOption: true,
    bookingOption: true,
    category: 'Services'
  },
  {
    id: 'srv-abdul-3',
    providerId: 'prov-abdul-tech',
    name: 'Battery Replacement',
    description: 'Durable, long-lasting replacement battery installation with warranty.',
    price: 3500,
    pricingType: 'starting_from',
    duration: '30 mins',
    homeService: true,
    deliveryOption: true,
    bookingOption: true,
    category: 'Services'
  },
  {
    id: 'srv-abdul-4',
    providerId: 'prov-abdul-tech',
    name: 'Software Fixes',
    description: 'Flashing, OS update, virus cleanup, charging port issues and unlocking.',
    price: 2000,
    pricingType: 'starting_from',
    duration: '40 mins',
    homeService: true,
    deliveryOption: true,
    bookingOption: true,
    category: 'Services'
  },

  // Malete Executive Cuts
  {
    id: 'srv-1',
    providerId: 'prov-1',
    name: 'Executive Low Cut',
    description: 'Clean scissor/clipper haircut with sharp hairline shaping and alcohol aftershave treatment.',
    price: 1500,
    pricingType: 'fixed',
    duration: '35 mins',
    homeService: false,
    deliveryOption: false,
    bookingOption: true,
    category: 'Barbers'
  },
  {
    id: 'srv-2',
    providerId: 'prov-1',
    name: 'Haircut + Full Beard Grooming & Dye',
    description: 'Haircut, hot towel treatment, beard sculpting, organic beard oil, and black enhancement dye.',
    price: 2500,
    pricingType: 'fixed',
    duration: '50 mins',
    homeService: false,
    deliveryOption: false,
    bookingOption: true,
    category: 'Barbers'
  },
  {
    id: 'srv-3',
    providerId: 'prov-1',
    name: 'VIP Come-To-Room Hostel Service',
    description: 'Barber brings sterilized portable clippers, lights, cape, and mirror directly to your hostel room.',
    price: 3500,
    pricingType: 'fixed',
    duration: '45 mins',
    homeService: true,
    deliveryOption: false,
    bookingOption: true,
    category: 'Barbers'
  },

  // CleanHive
  {
    id: 'srv-4',
    providerId: 'prov-3',
    name: 'Single Student Room Deep Clean',
    description: 'Thorough floor scrubbing, cobweb removal, wardrobe dusting, window cleaning, and room fragrance spray.',
    price: 4000,
    pricingType: 'fixed',
    duration: '2 hours',
    homeService: true,
    deliveryOption: false,
    bookingOption: true,
    category: 'House Cleaning'
  },
  {
    id: 'srv-5',
    providerId: 'prov-3',
    name: 'Self-Contain Apartment & Bathroom Scrub',
    description: 'Full bedroom, kitchen corner, toilet acid wash, tile descaling, and balcony clearing.',
    price: 7500,
    pricingType: 'fixed',
    duration: '3.5 hours',
    homeService: true,
    deliveryOption: false,
    bookingOption: true,
    category: 'House Cleaning'
  },

  // SparkleWash
  {
    id: 'srv-6',
    providerId: 'prov-4',
    name: 'Wash, Dry & Fold (Batch of 10 Clothes)',
    description: 'Machine/hand wash with color separation, fragrant fabric softener, and neat folding.',
    price: 3500,
    pricingType: 'starting_from',
    duration: '24 hours',
    homeService: true,
    deliveryOption: true,
    bookingOption: true,
    category: 'Laundry'
  },
  {
    id: 'srv-7',
    providerId: 'prov-4',
    name: 'Crisp Ironing & Starching (Senator / Native)',
    description: 'Professional industrial steam iron pressing and starching for 3 complete native sets.',
    price: 2500,
    pricingType: 'fixed',
    duration: '12 hours',
    homeService: true,
    deliveryOption: true,
    bookingOption: true,
    category: 'Laundry'
  },

  // Chef Tolu
  {
    id: 'srv-8',
    providerId: 'prov-5',
    name: 'Cook a 4-Litre Pot of Soup in Your Kitchen',
    description: 'Chef comes to your room or flat with cooking expertise to prepare Egusi, Efo Riro, or Ogbono soup.',
    price: 6000,
    pricingType: 'starting_from',
    duration: '2.5 hours',
    homeService: true,
    deliveryOption: false,
    bookingOption: true,
    category: 'Home Cooking'
  },
  {
    id: 'srv-9',
    providerId: 'prov-5',
    name: 'Hostel Party / Birthday Jollof Prep',
    description: 'Full event cooking for small gatherings (up to 15 guests). Customized recipe and delicious presentation.',
    price: 15000,
    pricingType: 'custom_quote',
    duration: '4 hours',
    homeService: true,
    deliveryOption: false,
    bookingOption: true,
    category: 'Home Cooking'
  },

  // SofaCare
  {
    id: 'srv-10',
    providerId: 'prov-8',
    name: '3-Seater Sofa Foam & Stain Extraction',
    description: 'Deep vacuum, anti-bacterial foam treatment, high-pressure rinse, and rapid moisture suction.',
    price: 8000,
    pricingType: 'starting_from',
    duration: '1.5 hours',
    homeService: true,
    deliveryOption: false,
    bookingOption: true,
    category: 'Sofa & Chair Cleaning'
  },

  // Kwara Glam
  {
    id: 'srv-11',
    providerId: 'prov-6',
    name: 'Knotless Box Braids (Mid-Back Length)',
    description: 'Pain-free knotless braids with dipped hot water finish and hair mousse shine.',
    price: 6500,
    pricingType: 'fixed',
    duration: '3.5 hours',
    homeService: true,
    deliveryOption: false,
    bookingOption: true,
    category: 'Hair & Beauty'
  },
  {
    id: 'srv-12',
    providerId: 'prov-6',
    name: 'Wig Wash, Treatment & Bone Straight Press',
    description: 'Complete wig washing, deep conditioning, and hot comb sleek straightening.',
    price: 4000,
    pricingType: 'fixed',
    duration: '24 hours',
    homeService: false,
    deliveryOption: true,
    bookingOption: true,
    category: 'Hair & Beauty'
  }
];

export const INITIAL_PRODUCTS: Product[] = [
  // Mama T Fresh Foods
  {
    id: 'prod-mama-t-1',
    providerId: 'prov-mama-t',
    name: 'Jollof Rice + Chicken',
    description: 'Hot smoky party jollof rice served with seasoned crispy fried chicken piece and fried dodo.',
    price: 1500,
    isAvailable: true,
    category: 'Food & Drink',
    imageUrl: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=500&auto=format&fit=crop&q=80',
    addOns: [
      { name: 'Extra Chicken Piece', price: 800 },
      { name: 'Fried Plantain (Dodo)', price: 300 },
      { name: 'Cold Soft Drink', price: 400 }
    ]
  },
  {
    id: 'prod-mama-t-2',
    providerId: 'prov-mama-t',
    name: 'Fried Rice + Chicken',
    description: 'Flavorful seasoned fried rice stir-fried with sweet corn, carrots, liver chunks, and fried chicken.',
    price: 1500,
    isAvailable: true,
    category: 'Food & Drink',
    imageUrl: 'https://images.unsplash.com/photo-1512058564366-18510be2db19?w=500&auto=format&fit=crop&q=80',
    addOns: [
      { name: 'Coleslaw', price: 300 },
      { name: 'Boiled Egg', price: 250 }
    ]
  },
  {
    id: 'prod-mama-t-3',
    providerId: 'prov-mama-t',
    name: 'White Rice + Stew',
    description: 'Steaming white rice served with rich, peppered buka tomato stew and choice of beef or fish.',
    price: 1200,
    isAvailable: true,
    category: 'Food & Drink',
    imageUrl: 'https://images.unsplash.com/photo-1596797038530-2c107229654b?w=500&auto=format&fit=crop&q=80',
    addOns: [
      { name: 'Fried Fish Piece', price: 600 },
      { name: 'Fried Plantain', price: 300 }
    ]
  },
  {
    id: 'prod-mama-t-4',
    providerId: 'prov-mama-t',
    name: 'Moi Moi (1 piece)',
    description: 'Traditional steamed bean pudding enriched with flaked fish, boiled egg, and authentic crayfish spices.',
    price: 300,
    isAvailable: true,
    category: 'Food & Drink',
    imageUrl: 'https://images.unsplash.com/photo-1604382355076-af4b0eb60143?w=500&auto=format&fit=crop&q=80'
  },

  {
    id: 'prod-1',
    providerId: 'prov-2',
    name: 'Party Jollof Rice + Crispy Fried Chicken',
    description: 'Smoky firewood-style Jollof rice served with golden fried chicken and fried plantain (dodo).',
    price: 2500,
    isAvailable: true,
    category: 'Food & Drinks',
    imageUrl: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=500&auto=format&fit=crop&q=80',
    addOns: [
      { name: 'Extra Fried Plantain (Dodo)', price: 400 },
      { name: 'Chilled Zobo Drink (50cl)', price: 500 },
      { name: 'Boiled Egg', price: 300 }
    ]
  },
  {
    id: 'prod-2',
    providerId: 'prov-2',
    name: 'Amala with Gbegiri, Ewedu & Goat Meat',
    description: 'Soft steaming hot Oyo-style Amala drenched in smooth gbegiri and ewedu soup with tender goat meat.',
    price: 2200,
    isAvailable: true,
    category: 'Food & Drinks',
    imageUrl: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=500&auto=format&fit=crop&q=80',
    addOns: [
      { name: 'Extra Goat Meat piece', price: 800 },
      { name: 'Extra Amala Wrap', price: 400 },
      { name: 'Cow Skin (Ponmo)', price: 400 }
    ]
  },
  {
    id: 'prod-3',
    providerId: 'prov-2',
    name: 'Fried Rice + Peppered Turkey',
    description: 'Aromatic seasoned fried rice loaded with diced carrots, peas, liver bits, and spicy peppered turkey.',
    price: 3200,
    isAvailable: true,
    category: 'Food & Drinks',
    imageUrl: 'https://images.unsplash.com/photo-1512058564366-18510be2db19?w=500&auto=format&fit=crop&q=80',
    addOns: [
      { name: 'Coleslaw Salad', price: 400 },
      { name: 'Cold Soft Drink (Coke/Fanta)', price: 450 }
    ]
  },
  {
    id: 'prod-4',
    providerId: 'prov-2',
    name: 'Pounded Yam + Egusi Soup & Assorted Meat',
    description: 'Smooth pounded yam accompanied by rich melon seed egusi soup enriched with stockfish and beef.',
    price: 2800,
    isAvailable: true,
    category: 'Food & Drinks',
    imageUrl: 'https://images.unsplash.com/photo-1604382355076-af4b0eb60143?w=500&auto=format&fit=crop&q=80',
    addOns: [
      { name: 'Extra Pounded Yam wrap', price: 500 },
      { name: 'Fried Fish piece', price: 900 }
    ]
  }
];

export const INITIAL_POSTS: Post[] = [
  {
    id: 'post-1',
    providerId: 'prov-1',
    providerName: 'Malete Executive Cuts',
    providerLogo: 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=300&auto=format&fit=crop&q=80',
    content: '🔥 WEEKEND ROOM-SERVICE SPECIAL: Exam week is here and you have no time to walk under the sun? Book a "Come To My Room" cut! Clean, sterilized blades, no stress. ₦3,000 all weekend for Tipper Garage and Safari hostels!',
    imageUrl: 'https://images.unsplash.com/photo-1599351431202-1e0f0137899a?w=800&auto=format&fit=crop&q=80',
    promotionTag: '🔥 WEEKEND OFFER',
    price: 3000,
    location: 'Malete - Tipper Garage',
    likesCount: 38,
    commentsCount: 9,
    createdAt: '2026-09-21T07:15:00Z'
  },
  {
    id: 'post-2',
    providerId: 'prov-2',
    providerName: 'Iya Moria Authentic Buka',
    providerLogo: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=300&auto=format&fit=crop&q=80',
    content: 'Fresh batch of spicy goat meat and steaming Amala is ready! Delivery riders are active on campus. Order right here on Bigridz Local for quick doorstep delivery to your hostel gate in under 25 mins.',
    imageUrl: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&auto=format&fit=crop&q=80',
    promotionTag: '🍲 FRESH LUNCH',
    price: 2200,
    location: 'Malete - KWASU Gate',
    likesCount: 52,
    commentsCount: 14,
    createdAt: '2026-09-21T06:40:00Z'
  },
  {
    id: 'post-3',
    providerId: 'prov-3',
    providerName: 'CleanHive Hostel & Home Cleaners',
    providerLogo: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=300&auto=format&fit=crop&q=80',
    content: 'Moving into a new apartment or need your current hostel room thoroughly bleached and scrubbed? We remove tough hard-water stains from tiles and leave your space smelling fresh. Book a session with us today!',
    imageUrl: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=800&auto=format&fit=crop&q=80',
    promotionTag: '✨ HOSTEL SPECIAL',
    price: 4000,
    location: 'Malete - Stadium Road',
    likesCount: 24,
    commentsCount: 5,
    createdAt: '2026-09-20T16:00:00Z'
  },
  {
    id: 'post-4',
    providerId: 'prov-4',
    providerName: 'SparkleWash Express Laundry',
    providerLogo: 'https://images.unsplash.com/photo-1545173168-9f1907e80789?w=300&auto=format&fit=crop&q=80',
    content: 'Don\'t let dirty laundry pile up while you study! Send us your clothes and get them washed, dried, ironed, and neatly packed within 24 hours. Free pickup available around Malete campus.',
    imageUrl: 'https://images.unsplash.com/photo-1517677208171-0bc6725a3e60?w=800&auto=format&fit=crop&q=80',
    promotionTag: '🧺 FAST PICKUP',
    price: 3500,
    location: 'Malete - Tipper Garage',
    likesCount: 41,
    commentsCount: 8,
    createdAt: '2026-09-20T11:20:00Z'
  }
];

export const INITIAL_REVIEWS: Review[] = [
  {
    id: 'rev-1',
    providerId: 'prov-1',
    customerId: 'user-c1',
    customerName: 'Kareem Ridwan',
    customerPhoto: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80',
    transactionId: 'bk-sample-1',
    rating: 5,
    comment: 'Tunde came to my hostel at Safari Road on time! His portable tools were super clean and the fade was top notch. 100% recommended.',
    isModerated: false,
    createdAt: '2026-09-18T14:30:00Z'
  },
  {
    id: 'rev-2',
    providerId: 'prov-2',
    customerId: 'user-c2',
    customerName: 'Zainab Bello',
    customerPhoto: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=200&auto=format&fit=crop&q=80',
    transactionId: 'ord-sample-2',
    rating: 5,
    comment: 'Best Amala in Malete by far. Hot, soft and the goat meat was so tender. Food arrived in less than 25 minutes through their rider.',
    isModerated: false,
    createdAt: '2026-09-19T13:10:00Z'
  },
  {
    id: 'rev-3',
    providerId: 'prov-3',
    customerId: 'user-c3',
    customerName: 'Samuel Ogundele',
    transactionId: 'bk-sample-3',
    rating: 4,
    comment: 'CleanHive scrubbed my room and bathroom before I moved in. The bathroom tiles looked brand new afterwards.',
    isModerated: false,
    createdAt: '2026-09-15T18:00:00Z'
  }
];

export const INITIAL_USER: User = {
  id: 'user-default',
  fullName: 'Adekunle',
  email: 'adekunle.malete@gmail.com',
  phone: '+234 810 123 4567',
  username: 'adekunle',
  location: 'Malete - Safari Area',
  accountType: 'admin',
  photoURL: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200&auto=format&fit=crop&q=80',
  emailVerified: true,
  phoneVerified: true,
  savedProviderIds: ['prov-mama-t', 'prov-abdul-tech', 'prov-1'],
  savedPostIds: ['post-1'],
  followingProviderIds: ['prov-mama-t', 'prov-abdul-tech'],
  createdAt: '2026-01-01T00:00:00Z'
};

export interface MaleteArea {
  id: string;
  name: string;
  shortName: string;
  category: 'Campus & Gates' | 'Hostel Zones & Lodges' | 'Commercial & Junctions' | 'Arterial & Residential' | 'Regional Links';
  landmark: string;
  popular?: boolean;
}

export const MALETE_AREA_GROUPS: {
  category: 'Campus & Gates' | 'Hostel Zones & Lodges' | 'Commercial & Junctions' | 'Arterial & Residential' | 'Regional Links';
  icon: string;
  areas: MaleteArea[];
}[] = [
  {
    category: 'Campus & Gates',
    icon: '🎓',
    areas: [
      { id: 'kwasu-main-campus', name: 'Malete - KWASU Main Campus', shortName: 'KWASU Main Campus', category: 'Campus & Gates', landmark: 'Senate Building, Central Library, LT Complex', popular: true },
      { id: 'kwasu-main-gate', name: 'Malete - KWASU Main Gate', shortName: 'KWASU Main Gate', category: 'Campus & Gates', landmark: 'University Main Entrance & Security Post', popular: true },
      { id: 'kwasu-second-gate', name: 'Malete - KWASU Second Gate / Back Gate', shortName: 'KWASU Back Gate', category: 'Campus & Gates', landmark: 'Agric Research Farm & Secondary Access Road' },
      { id: 'kwasu-convocation', name: 'Malete - Convocation Arena & Stadium', shortName: 'Convocation Arena', category: 'Campus & Gates', landmark: 'Sports Complex, University Arena & Pitch' },
      { id: 'kwasu-staff-quarters', name: 'Malete - Senior & Junior Staff Quarters', shortName: 'KWASU Staff Quarters', category: 'Campus & Gates', landmark: 'University Staff Residential Area' },
      { id: 'kwasu-mini-campus', name: 'Malete - Mini Campus / Old Site', shortName: 'Mini Campus (Old Site)', category: 'Campus & Gates', landmark: 'Pre-degree & Foundation Complex' },
      { id: 'kwasu-law-cails', name: 'Malete - Faculty of Law & CAILS Axis', shortName: 'Law / CAILS Axis', category: 'Campus & Gates', landmark: 'Near College of Humanities' }
    ]
  },
  {
    category: 'Commercial & Junctions',
    icon: '🏪',
    areas: [
      { id: 'tipper-garage', name: 'Malete - Tipper Garage', shortName: 'Tipper Garage', category: 'Commercial & Junctions', landmark: 'Main commercial center, campus buses, parks & plazas', popular: true },
      { id: 'tipper-junction', name: 'Malete - Tipper Garage Junction & Motor Park', shortName: 'Tipper Garage Junction', category: 'Commercial & Junctions', landmark: 'Inter-city bus terminal & retail corridor', popular: true },
      { id: 'safari-junction', name: 'Malete - Safari Junction', shortName: 'Safari Junction', category: 'Commercial & Junctions', landmark: 'Bustling T-junction with food stalls & POS kiosks', popular: true },
      { id: 'central-mosque', name: 'Malete - Central Mosque / Roundabout', shortName: 'Central Mosque / Roundabout', category: 'Commercial & Junctions', landmark: 'Malete Town Roundabout' },
      { id: 'kings-market', name: 'Malete - Malete King\'s Market (Oja Malete)', shortName: 'King\'s Market (Oja)', category: 'Commercial & Junctions', landmark: 'Fresh produce, foodstuffs & wholesale trade' },
      { id: 'palace-area', name: 'Malete - Oba\'s Palace / Baale Area', shortName: 'Oba\'s Palace Area', category: 'Commercial & Junctions', landmark: 'Traditional Palace & Community Square' },
      { id: 'general-hospital', name: 'Malete - General Hospital Road', shortName: 'General Hospital Road', category: 'Commercial & Junctions', landmark: 'Malete Comprehensive Health Centre Axis' },
      { id: 'stadium-road', name: 'Malete - Stadium Road', shortName: 'Stadium Road', category: 'Commercial & Junctions', landmark: 'Community football pitch & gym facilities' },
      { id: 'police-station', name: 'Malete - Police Station & Security Axis', shortName: 'Police Station Area', category: 'Commercial & Junctions', landmark: 'Malete Divisional Police Division' },
      { id: 'fuel-station', name: 'Malete - Total Energy & Fuel Station Axis', shortName: 'Total / Fuel Station Axis', category: 'Commercial & Junctions', landmark: 'Main highway fueling station & service shops' },
      { id: 'bank-axis', name: 'Malete - Microfinance Bank / ATM Hub', shortName: 'Bank & ATM Axis', category: 'Commercial & Junctions', landmark: 'Commercial banking & automated cash points' }
    ]
  },
  {
    category: 'Hostel Zones & Lodges',
    icon: '🏠',
    areas: [
      { id: 'safari-area', name: 'Malete - Safari Area', shortName: 'Safari Area', category: 'Hostel Zones & Lodges', landmark: 'Safari Hostels Phase 1 & 2, large student concentration', popular: true },
      { id: 'behind-safari', name: 'Malete - Behind Safari / Safari Extension', shortName: 'Behind Safari Extension', category: 'Hostel Zones & Lodges', landmark: 'Safari extension residential apartments & new lodges', popular: true },
      { id: 'mass-comm', name: 'Malete - Mass Comm Village / Area', shortName: 'Mass Comm Area', category: 'Hostel Zones & Lodges', landmark: 'Mass Comm hostels, restaurants & student hubs', popular: true },
      { id: 'camp-road', name: 'Malete - Camp Road / Camp Junction', shortName: 'Camp Road', category: 'Hostel Zones & Lodges', landmark: 'Camp student hostel community & grocery stores', popular: true },
      { id: 'better-by-far', name: 'Malete - Better By Far (BBF) Area', shortName: 'Better By Far (BBF)', category: 'Hostel Zones & Lodges', landmark: 'BBF student hostels & modern apartments', popular: true },
      { id: 'sunshine-area', name: 'Malete - Sunshine Area', shortName: 'Sunshine Area', category: 'Hostel Zones & Lodges', landmark: 'Sunshine Villa, Sunshine Hostels & nearby shops', popular: true },
      { id: 'diamond-hostel', name: 'Malete - Diamond Hostel Axis', shortName: 'Diamond Hostel Axis', category: 'Hostel Zones & Lodges', landmark: 'Diamond & Platinum student residences' },
      { id: 'harmony-hostel', name: 'Malete - Harmony Hostel Area', shortName: 'Harmony Hostel Area', category: 'Hostel Zones & Lodges', landmark: 'Harmony Villa & Harmony Plaza Hostels' },
      { id: 'royal-destiny', name: 'Malete - Royal Villa & Destiny Axis', shortName: 'Royal Villa & Destiny', category: 'Hostel Zones & Lodges', landmark: 'Destiny Lodge & Royal Villa student housing' },
      { id: 'prime-lodge', name: 'Malete - Prime Lodge & Villa Axis', shortName: 'Prime Lodge Axis', category: 'Hostel Zones & Lodges', landmark: 'Prime student accommodations' },
      { id: 'white-house', name: 'Malete - White House / Al-Hikmah Axis', shortName: 'White House Area', category: 'Hostel Zones & Lodges', landmark: 'White House student lodges' },
      { id: 'peace-grace', name: 'Malete - Peace Hostel & Grace Villa', shortName: 'Peace Hostel / Grace Villa', category: 'Hostel Zones & Lodges', landmark: 'Grace Villa student apartments' },
      { id: 'golden-executive', name: 'Malete - Golden Hostel & Executive Lodge', shortName: 'Golden & Executive Lodges', category: 'Hostel Zones & Lodges', landmark: 'Executive student self-contain apartments' },
      { id: 'unique-villa', name: 'Malete - Unique Villa & Super Lodge', shortName: 'Unique Villa', category: 'Hostel Zones & Lodges', landmark: 'Super lodge student clusters' },
      { id: 'legacy-marvelous', name: 'Malete - Legacy & Marvelous Villa', shortName: 'Legacy / Marvelous Villa', category: 'Hostel Zones & Lodges', landmark: 'Marvelous hostels cluster' },
      { id: 'success-shalom', name: 'Malete - Success Lodge & Shalom Area', shortName: 'Success Lodge & Shalom', category: 'Hostel Zones & Lodges', landmark: 'Shalom residential quarters' },
      { id: 'kings-queens', name: 'Malete - Kings & Queens Lodge Axis', shortName: 'Kings & Queens Lodges', category: 'Hostel Zones & Lodges', landmark: 'High-comfort student apartments' },
      { id: 'annex-ring-road', name: 'Malete - Annex Hostel Area & Ring Road', shortName: 'Annex & Ring Road Area', category: 'Hostel Zones & Lodges', landmark: 'Off-campus ring road hostels' },
      { id: 'silver-crown', name: 'Malete - Silver Lodge & Crown Axis', shortName: 'Silver & Crown Lodges', category: 'Hostel Zones & Lodges', landmark: 'Crown Villa student quarters' },
      { id: 'progress-winners', name: 'Malete - Progress & Winner\'s Lodge Area', shortName: 'Progress & Winner\'s Area', category: 'Hostel Zones & Lodges', landmark: 'Winner\'s corridor hostels' },
      { id: 'atlantic-ocean', name: 'Malete - Atlantic & Ocean View Axis', shortName: 'Atlantic Lodges Axis', category: 'Hostel Zones & Lodges', landmark: 'Atlantic student apartments' },
      { id: 'de-grace-praise', name: 'Malete - De-Grace & Praise Villa', shortName: 'De-Grace & Praise Villa', category: 'Hostel Zones & Lodges', landmark: 'Praise Villa student houses' }
    ]
  },
  {
    category: 'Arterial & Residential',
    icon: '🛣️',
    areas: [
      { id: 'apodu-road', name: 'Malete - Apodu Road / Apodu Junction', shortName: 'Apodu Road', category: 'Arterial & Residential', landmark: 'Apodu road corridor & connecting community' },
      { id: 'okoru-road', name: 'Malete - Okoru Road / Okoru Village', shortName: 'Okoru Road Axis', category: 'Arterial & Residential', landmark: 'Okoru farm and residential settlement' },
      { id: 'olooru-junction', name: 'Malete - Olooru Junction / Expressway Axis', shortName: 'Olooru Junction', category: 'Arterial & Residential', landmark: 'Expressway junction connecting Malete to Ilorin highway' },
      { id: 'eruku-area', name: 'Malete - Eruku Area / Eruku Village', shortName: 'Eruku Area', category: 'Arterial & Residential', landmark: 'Eruku community zone' },
      { id: 'eleja-area', name: 'Malete - Eleja Area / Eleja Junction', shortName: 'Eleja Junction', category: 'Arterial & Residential', landmark: 'Eleja residential & commercial stretch' },
      { id: 'kango-area', name: 'Malete - Kango Area / Kango Village', shortName: 'Kango Area', category: 'Arterial & Residential', landmark: 'Kango agricultural settlement' },
      { id: 'budo-osho', name: 'Malete - Budo-Osho Area', shortName: 'Budo-Osho Area', category: 'Arterial & Residential', landmark: 'Budo-Osho community' },
      { id: 'oyeleke-area', name: 'Malete - Oye / Oyeleke Community', shortName: 'Oyeleke Community', category: 'Arterial & Residential', landmark: 'Oyeleke traditional quarters' },
      { id: 'isale-malete', name: 'Malete - Isale Malete (Indigenous Town)', shortName: 'Isale Malete', category: 'Arterial & Residential', landmark: 'Malete native residential heart' },
      { id: 'oke-odo-malete', name: 'Malete - Oke-Odo Malete', shortName: 'Oke-Odo Malete', category: 'Arterial & Residential', landmark: 'Upper stream and valley community' },
      { id: 'gidan-kwara', name: 'Malete - Gidan-Kwara Axis', shortName: 'Gidan-Kwara Axis', category: 'Arterial & Residential', landmark: 'Northern residential extension' },
      { id: 'shao-moro-link', name: 'Malete - Shao / Moro Link Axis', shortName: 'Shao / Moro Link Road', category: 'Arterial & Residential', landmark: 'Link route towards Moro LGA headquarters' }
    ]
  },
  {
    category: 'Regional Links',
    icon: '📍',
    areas: [
      { id: 'ilorin-kwara', name: 'Ilorin - Kwara State (State Capital Link)', shortName: 'Ilorin (Kwara State)', category: 'Regional Links', landmark: 'Main transit route for deliveries and regional dispatch' },
      { id: 'offa-kwara', name: 'Offa - Kwara State (Southern Link)', shortName: 'Offa (Kwara State)', category: 'Regional Links', landmark: 'Southern Kwara commercial link' }
    ]
  }
];

// Flat array containing every single location in Malete
export const MALETE_LOCATIONS: string[] = MALETE_AREA_GROUPS.flatMap((group) =>
  group.areas.map((area) => area.name)
);

// Quick popular locations for instant chips
export const POPULAR_MALETE_LOCATIONS: string[] = [
  'Malete - Tipper Garage',
  'Malete - Safari Area',
  'Malete - KWASU Main Gate',
  'Malete - Mass Comm Village / Area',
  'Malete - Camp Road / Camp Junction',
  'Malete - Better By Far (BBF) Area',
  'Malete - Behind Safari / Safari Extension',
  'Malete - Sunshine Area'
];

export const INITIAL_SETTINGS: PlatformSetting = {
  platformName: 'Bigridz Local',
  tagline: 'Local Services & Business Discovery for Malete & Beyond',
  serviceFeePercent: 2.5,
  flatCommission: 150,
  locations: MALETE_LOCATIONS,
  emergencyContact: '+234 800 BIGRIDZ',
  supportEmail: 'support@bigridz.ng',
  maintenanceMode: false
};
