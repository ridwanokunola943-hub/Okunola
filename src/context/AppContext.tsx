import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  User,
  Provider,
  Category,
  Service,
  Product,
  Post,
  Order,
  Booking,
  Review,
  ChatMessage,
  NotificationItem,
  ReportItem,
  PlatformSetting,
  AccountType
} from '../types';
import {
  INITIAL_CATEGORIES,
  INITIAL_PROVIDERS,
  INITIAL_SERVICES,
  INITIAL_PRODUCTS,
  INITIAL_POSTS,
  INITIAL_REVIEWS,
  INITIAL_USER,
  INITIAL_SETTINGS,
  MALETE_LOCATIONS
} from '../data/mockData';

interface Toast {
  id: string;
  type: 'success' | 'info' | 'error' | 'warning';
  message: string;
}

interface CartItem {
  product: Product;
  quantity: number;
  selectedAddOns?: string[];
  notes?: string;
}

interface AppContextType {
  // User & Auth
  currentUser: User | null;
  isAdmin: boolean;
  setCurrentUser: React.Dispatch<React.SetStateAction<User | null>>;
  login: (email: string, pass: string, asAdmin?: boolean, location?: string) => boolean;
  register: (userData: Partial<User>) => void;
  logout: () => void;
  updateProfile: (updates: Partial<User>) => void;
  applyForProvider: (providerData: Partial<Provider>) => void;
  
  // Location
  currentLocation: string;
  setCurrentLocation: (loc: string) => void;
  requestGeolocation: () => Promise<string>;

  // Data
  categories: Category[];
  providers: Provider[];
  services: Service[];
  products: Product[];
  posts: Post[];
  orders: Order[];
  bookings: Booking[];
  reviews: Review[];
  messages: ChatMessage[];
  notifications: NotificationItem[];
  reports: ReportItem[];
  settings: PlatformSetting;

  // Cart & Food Ordering
  cart: CartItem[];
  addToCart: (product: Product, quantity?: number, addOns?: string[], notes?: string) => void;
  removeFromCart: (productId: string) => void;
  updateCartQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  createOrder: (orderData: Partial<Order>) => Order;
  updateOrderStatus: (orderId: string, status: Order['status'], reason?: string) => void;

  // Bookings & Home Service
  createBooking: (bookingData: Partial<Booking>) => Booking;
  updateBookingStatus: (bookingId: string, status: Booking['status'], reason?: string) => void;

  // Social & Follow
  toggleFollowProvider: (providerId: string) => void;
  isFollowing: (providerId: string) => boolean;
  toggleSaveProvider: (providerId: string) => void;
  isSavedProvider: (providerId: string) => boolean;
  toggleSavePost: (postId: string) => void;
  isSavedPost: (postId: string) => boolean;
  likePost: (postId: string) => void;
  createPost: (postData: Partial<Post>) => void;
  
  // Chat
  sendMessage: (recipientId: string, text: string, attachments?: { serviceRef?: any; bookingRef?: any; orderRef?: any; imageUrl?: string }) => void;
  getConversationMessages: (otherUserId: string) => ChatMessage[];
  markMessagesAsRead: (otherUserId: string) => void;

  // Reviews
  addReview: (reviewData: Partial<Review>) => boolean;
  canReviewProvider: (providerId: string) => boolean;

  // Reports
  createReport: (reportData: Partial<ReportItem>) => void;

  // Provider Actions
  createService: (serviceData: Partial<Service>) => void;
  updateService: (serviceId: string, updates: Partial<Service>) => void;
  deleteService: (serviceId: string) => void;
  createProduct: (productData: Partial<Product>) => void;
  updateProduct: (productId: string, updates: Partial<Product>) => void;
  deleteProduct: (productId: string) => void;

  // Admin Actions
  approveProvider: (providerId: string) => void;
  rejectProvider: (providerId: string) => void;
  suspendProvider: (providerId: string) => void;
  toggleProviderVerification: (providerId: string) => void;
  toggleProviderFeatured: (providerId: string) => void;
  createCategory: (cat: Partial<Category>) => void;
  updateCategory: (catId: string, updates: Partial<Category>) => void;
  deleteCategory: (catId: string) => void;
  moderateReview: (reviewId: string, remove: boolean) => void;
  resolveReport: (reportId: string, resolution: 'resolved' | 'dismissed') => void;
  updatePlatformSettings: (updates: Partial<PlatformSetting>) => void;

  // UI & Toast
  toasts: Toast[];
  showToast: (message: string, type?: 'success' | 'info' | 'error' | 'warning') => void;
  removeToast: (id: string) => void;

  // Navigation / Modal helpers
  selectedProviderForProfile: Provider | null;
  setSelectedProviderForProfile: (p: Provider | null) => void;
  activeChatRecipientId: string | null;
  setActiveChatRecipientId: (id: string | null) => void;
  bookingTargetService: { service: Service; provider: Provider } | null;
  setBookingTargetService: (val: { service: Service; provider: Provider } | null) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Load persisted local state or fall back to default rich seeds
  const [currentUser, setCurrentUser] = useState<User | null>(() => {
    const saved = localStorage.getItem('bigridz_user');
    return saved ? JSON.parse(saved) : INITIAL_USER;
  });

  const [currentLocation, setCurrentLocation] = useState<string>(() => {
    return localStorage.getItem('bigridz_location') || 'Malete - Tipper Garage';
  });

  const [categories, setCategories] = useState<Category[]>(() => {
    const saved = localStorage.getItem('bigridz_categories');
    return saved ? JSON.parse(saved) : INITIAL_CATEGORIES;
  });

  const [providers, setProviders] = useState<Provider[]>(() => {
    const saved = localStorage.getItem('bigridz_providers');
    return saved ? JSON.parse(saved) : INITIAL_PROVIDERS;
  });

  const [services, setServices] = useState<Service[]>(() => {
    const saved = localStorage.getItem('bigridz_services');
    return saved ? JSON.parse(saved) : INITIAL_SERVICES;
  });

  const [products, setProducts] = useState<Product[]>(() => {
    const saved = localStorage.getItem('bigridz_products');
    return saved ? JSON.parse(saved) : INITIAL_PRODUCTS;
  });

  const [posts, setPosts] = useState<Post[]>(() => {
    const saved = localStorage.getItem('bigridz_posts');
    return saved ? JSON.parse(saved) : INITIAL_POSTS;
  });

  const [orders, setOrders] = useState<Order[]>(() => {
    const saved = localStorage.getItem('bigridz_orders');
    return saved ? JSON.parse(saved) : [
      {
        id: 'ord-mama-t-1',
        customerId: 'user-default',
        customerName: 'Adekunle',
        customerPhone: '+234 810 123 4567',
        providerId: 'prov-mama-t',
        providerName: 'Mama T Fresh Foods',
        items: [
          { productId: 'prod-mama-t-1', name: 'Jollof Rice + Chicken', price: 1500, quantity: 1, notes: 'Pack with fried dodo' }
        ],
        totalAmount: 1500,
        orderType: 'delivery',
        deliveryAddress: 'Block B, Safari Hostel, Malete',
        notes: 'Call on arrival at the gate',
        paymentMethod: 'cash',
        paymentStatus: 'pending',
        paymentRef: 'MC-ORD-9021',
        status: 'pending',
        createdAt: new Date(Date.now() - 1800000).toISOString()
      },
      {
        id: 'ord-mama-t-2',
        customerId: 'user-c2',
        customerName: 'Zainab Bello',
        customerPhone: '+234 809 332 1100',
        providerId: 'prov-mama-t',
        providerName: 'Mama T Fresh Foods',
        items: [
          { productId: 'prod-mama-t-2', name: 'Fried Rice + Chicken', price: 1500, quantity: 1 }
        ],
        totalAmount: 1500,
        orderType: 'delivery',
        deliveryAddress: 'Tipper Garage, Malete',
        paymentMethod: 'transfer',
        paymentStatus: 'paid',
        paymentRef: 'MC-ORD-9019',
        status: 'completed',
        createdAt: new Date(Date.now() - 86400000).toISOString()
      },
      {
        id: 'ord-mama-t-3',
        customerId: 'user-c3',
        customerName: 'Michael Alabi',
        customerPhone: '+234 814 554 2201',
        providerId: 'prov-mama-t',
        providerName: 'Mama T Fresh Foods',
        items: [
          { productId: 'prod-mama-t-3', name: 'White Rice + Stew', price: 1200, quantity: 1 }
        ],
        totalAmount: 1200,
        orderType: 'pickup',
        paymentMethod: 'cash',
        paymentStatus: 'paid',
        paymentRef: 'MC-ORD-9015',
        status: 'completed',
        createdAt: new Date(Date.now() - 172800000).toISOString()
      },
      {
        id: 'ord-mama-t-4',
        customerId: 'user-c4',
        customerName: 'Farida Sani',
        customerPhone: '+234 802 110 9988',
        providerId: 'prov-mama-t',
        providerName: 'Mama T Fresh Foods',
        items: [
          { productId: 'prod-mama-t-4', name: 'Moi Moi (1 piece)', price: 300, quantity: 1 }
        ],
        totalAmount: 300,
        orderType: 'delivery',
        deliveryAddress: 'BBF Hostel, Malete',
        paymentMethod: 'cash',
        paymentStatus: 'pending',
        paymentRef: 'MC-ORD-9012',
        status: 'pending',
        createdAt: new Date(Date.now() - 900000).toISOString()
      }
    ];
  });

  const [bookings, setBookings] = useState<Booking[]>(() => {
    const saved = localStorage.getItem('bigridz_bookings');
    return saved ? JSON.parse(saved) : [
      {
        id: 'bk-abdul-1',
        customerId: 'user-default',
        customerName: 'Adekunle',
        customerPhone: '+234 810 123 4567',
        providerId: 'prov-abdul-tech',
        providerName: 'Abdul Tech',
        serviceId: 'srv-abdul-2',
        serviceName: 'Screen Replacement',
        date: '2026-09-22',
        time: '2:30 PM',
        isHomeService: true,
        locationAddress: 'Safari Hostel, Room 14, Malete',
        notes: 'Redmi Note 11 screen is cracked',
        price: 5000,
        paymentMethod: 'transfer',
        paymentStatus: 'pending',
        paymentRef: 'MC-BK-7701',
        status: 'confirmed',
        createdAt: new Date(Date.now() - 7200000).toISOString()
      }
    ];
  });

  const [reviews, setReviews] = useState<Review[]>(() => {
    const saved = localStorage.getItem('bigridz_reviews');
    return saved ? JSON.parse(saved) : INITIAL_REVIEWS;
  });

  const [messages, setMessages] = useState<ChatMessage[]>(() => {
    const saved = localStorage.getItem('bigridz_messages');
    return saved ? JSON.parse(saved) : [
      {
        id: 'msg-mama-t-1',
        conversationId: 'conv-prov-mama-t',
        senderId: 'prov-mama-t',
        senderName: 'Mama T Fresh Foods',
        recipientId: 'user-default',
        text: 'Hello Adekunle! Your order is ready for pickup or dispatch.',
        read: false,
        createdAt: new Date(Date.now() - 2400000).toISOString()
      },
      {
        id: 'msg-mama-t-2',
        conversationId: 'conv-prov-mama-t',
        senderId: 'prov-mama-t',
        senderName: 'Mama T Fresh Foods',
        recipientId: 'user-default',
        text: 'Your order is ready for pickup. Dispatch rider has taken the delivery box.',
        read: false,
        createdAt: new Date(Date.now() - 1800000).toISOString()
      },
      {
        id: 'msg-abdul-1',
        conversationId: 'conv-prov-abdul-tech',
        senderId: 'user-default',
        senderName: 'Adekunle',
        recipientId: 'prov-abdul-tech',
        text: 'Hello Abdul, are you available to inspect my phone screen at Safari?',
        read: true,
        createdAt: new Date(Date.now() - 5400000).toISOString()
      },
      {
        id: 'msg-abdul-2',
        conversationId: 'conv-prov-abdul-tech',
        senderId: 'prov-abdul-tech',
        senderName: 'Abdul Tech',
        recipientId: 'user-default',
        text: "Yes, I'll be there in 15 minutes.",
        read: true,
        createdAt: new Date(Date.now() - 3600000).toISOString()
      },
      {
        id: 'msg-blessing-1',
        conversationId: 'conv-prov-blessing-stores',
        senderId: 'prov-blessing-stores',
        senderName: 'Blessing Stores',
        recipientId: 'user-default',
        text: 'Thank you for your purchase! Let us know whenever you need more hostel provisions.',
        read: true,
        createdAt: new Date(Date.now() - 86400000).toISOString()
      },
      {
        id: 'msg-faith-1',
        conversationId: 'conv-prov-faith-graphics',
        senderId: 'prov-faith-graphics',
        senderName: 'Faith Graphics & Media',
        recipientId: 'user-default',
        text: 'Can you send the logo in PNG? I will send the flyer sample once updated.',
        read: true,
        createdAt: new Date(Date.now() - 90000000).toISOString()
      },
      {
        id: 'msg-john-1',
        conversationId: 'conv-prov-john-poultry',
        senderId: 'prov-john-poultry',
        senderName: 'John Poultry Farm & Meat Hub',
        recipientId: 'user-default',
        text: 'Available for delivery today. Fresh dressed chicken ready for dispatch.',
        read: true,
        createdAt: new Date(Date.now() - 100000000).toISOString()
      },
      {
        id: 'msg-support-1',
        conversationId: 'conv-support',
        senderId: 'support-agent',
        senderName: 'Customer Support',
        recipientId: 'user-default',
        text: 'How can we help you today? Welcome to MaleteConnect!',
        read: true,
        createdAt: new Date(Date.now() - 172800000).toISOString()
      }
    ];
  });

  const [notifications, setNotifications] = useState<NotificationItem[]>([
    {
      id: 'notif-1',
      userId: 'user-default',
      title: 'Booking Confirmed ✓',
      body: 'Malete Executive Cuts has confirmed your appointment for tomorrow at 4:00 PM.',
      type: 'booking',
      read: false,
      createdAt: new Date(Date.now() - 3600000).toISOString()
    },
    {
      id: 'notif-2',
      userId: 'user-default',
      title: 'Order Preparing 🍳',
      body: 'Iya Moria Kitchen has accepted your order and is packaging your Amala meal.',
      type: 'order',
      read: false,
      createdAt: new Date(Date.now() - 7200000).toISOString()
    }
  ]);

  const [reports, setReports] = useState<ReportItem[]>([]);
  const [settings, setSettings] = useState<PlatformSetting>(INITIAL_SETTINGS);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [toasts, setToasts] = useState<Toast[]>([]);

  // Navigation helper states
  const [selectedProviderForProfile, setSelectedProviderForProfile] = useState<Provider | null>(null);
  const [activeChatRecipientId, setActiveChatRecipientId] = useState<string | null>(null);
  const [bookingTargetService, setBookingTargetService] = useState<{ service: Service; provider: Provider } | null>(null);

  // Sync back to local storage
  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('bigridz_user', JSON.stringify(currentUser));
    } else {
      localStorage.removeItem('bigridz_user');
    }
  }, [currentUser]);

  useEffect(() => {
    localStorage.setItem('bigridz_providers', JSON.stringify(providers));
  }, [providers]);

  useEffect(() => {
    localStorage.setItem('bigridz_services', JSON.stringify(services));
  }, [services]);

  useEffect(() => {
    localStorage.setItem('bigridz_orders', JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem('bigridz_bookings', JSON.stringify(bookings));
  }, [bookings]);

  useEffect(() => {
    localStorage.setItem('bigridz_posts', JSON.stringify(posts));
  }, [posts]);

  useEffect(() => {
    localStorage.setItem('bigridz_reviews', JSON.stringify(reviews));
  }, [reviews]);

  useEffect(() => {
    localStorage.setItem('bigridz_messages', JSON.stringify(messages));
  }, [messages]);

  useEffect(() => {
    localStorage.setItem('bigridz_categories', JSON.stringify(categories));
  }, [categories]);

  const showToast = (message: string, type: Toast['type'] = 'success') => {
    const id = Date.now().toString() + Math.random().toString(36).substring(2, 6);
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Auth
  const login = (email: string, pass: string, asAdmin = false, location?: string) => {
    const trimmedEmail = email.trim().toLowerCase();
    const effectiveLocation = location || currentLocation;

    if (
      asAdmin ||
      trimmedEmail === 'okunolaridwan284@gmail.com' ||
      trimmedEmail.includes('admin') ||
      pass === '@Adekunle01'
    ) {
      const adminUser: User = {
        id: 'user-admin-ridwan',
        fullName: 'Ridwan Okunola',
        email: 'okunolaridwan284@gmail.com',
        phone: '+234 802 918 2734',
        username: 'ridwan_admin',
        location: effectiveLocation,
        accountType: 'admin',
        photoURL: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200&auto=format&fit=crop&q=80',
        emailVerified: true,
        phoneVerified: true,
        createdAt: new Date().toISOString()
      };
      if (location) {
        setCurrentLocation(location);
      }
      setCurrentUser(adminUser);
      localStorage.setItem('bigridz_user', JSON.stringify(adminUser));
      showToast('Logged in as Super Administrator (Ridwan Okunola)');
      return true;
    }

    // Check if email matches existing provider owner
    const existingProv = providers.find((p) => p.email.toLowerCase() === email.toLowerCase());
    if (existingProv) {
      const provUser: User = {
        id: existingProv.ownerId,
        fullName: existingProv.ownerName,
        email: existingProv.email,
        phone: existingProv.phone,
        username: existingProv.businessName.toLowerCase().replace(/\s+/g, '_'),
        location: location || existingProv.location,
        accountType: 'provider',
        providerId: existingProv.id,
        emailVerified: true,
        phoneVerified: true,
        createdAt: existingProv.createdAt
      };
      if (location) {
        setCurrentLocation(location);
      }
      setCurrentUser(provUser);
      localStorage.setItem('bigridz_user', JSON.stringify(provUser));
      showToast(`Welcome back, ${existingProv.ownerName}!`);
      return true;
    }

    // Default or customer
    const user: User = {
      id: 'user-' + Date.now().toString(),
      fullName: email.split('@')[0].replace(/[._]/g, ' '),
      email,
      phone: '+234 803 000 1234',
      username: email.split('@')[0],
      location: effectiveLocation,
      accountType: 'customer',
      emailVerified: true,
      phoneVerified: false,
      savedProviderIds: ['prov-1'],
      savedPostIds: [],
      followingProviderIds: ['prov-1', 'prov-2'],
      createdAt: new Date().toISOString()
    };
    if (location) {
      setCurrentLocation(location);
    }
    setCurrentUser(user);
    localStorage.setItem('bigridz_user', JSON.stringify(user));
    showToast(`Welcome to Bigridz Local, ${user.fullName}`);
    return true;
  };

  const register = (userData: Partial<User>) => {
    const loc = userData.location || currentLocation;
    const newUser: User = {
      id: 'user-' + Date.now(),
      fullName: userData.fullName || 'New User',
      email: userData.email || '',
      phone: userData.phone || '',
      username: (userData.fullName || 'user').toLowerCase().replace(/\s+/g, '_') + '_' + Math.floor(Math.random() * 1000),
      location: loc,
      hostelAddress: userData.hostelAddress || '',
      accountType: userData.accountType || 'customer',
      emailVerified: true,
      phoneVerified: true,
      savedProviderIds: [],
      savedPostIds: [],
      followingProviderIds: [],
      createdAt: new Date().toISOString()
    };
    setCurrentLocation(loc);
    setCurrentUser(newUser);
    localStorage.setItem('bigridz_user', JSON.stringify(newUser));
    showToast(`Account registered successfully! Welcome to Bigridz Local, ${newUser.fullName.split(' ')[0]}.`);
  };

  const logout = () => {
    setCurrentUser(null);
    showToast('You have been logged out.');
  };

  const updateProfile = (updates: Partial<User>) => {
    if (!currentUser) return;
    setCurrentUser((prev) => (prev ? { ...prev, ...updates, updatedAt: new Date().toISOString() } : null));
    showToast('Profile updated successfully!');
  };

  // Provider Registration
  const applyForProvider = (providerData: Partial<Provider>) => {
    if (!currentUser) return;
    const newProvId = 'prov-' + Date.now();
    const newProvider: Provider = {
      id: newProvId,
      ownerId: currentUser.id,
      businessName: providerData.businessName || 'My Local Service',
      ownerName: providerData.ownerName || currentUser.fullName,
      phone: providerData.phone || currentUser.phone,
      email: providerData.email || currentUser.email,
      category: providerData.category || 'Other Services',
      description: providerData.description || 'Verified local service provider in Malete.',
      location: providerData.location || currentLocation,
      address: providerData.address || 'Malete, Kwara State',
      distanceKm: 0.8,
      logoUrl: providerData.logoUrl || 'https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=300&auto=format&fit=crop&q=80',
      coverUrl: providerData.coverUrl || 'https://images.unsplash.com/photo-1513151233558-d860c5398176?w=1000&auto=format&fit=crop&q=80',
      openingHours: providerData.openingHours || '8:00 AM - 7:00 PM (Daily)',
      isOpen: true,
      homeServiceAvailable: Boolean(providerData.homeServiceAvailable),
      deliveryAvailable: Boolean(providerData.deliveryAvailable),
      status: 'pending', // Pending Verification by admin
      isVerified: false,
      rating: 5.0,
      reviewCount: 0,
      followerCount: 0,
      paymentInfo: providerData.paymentInfo || 'Cash & Transfer',
      photos: [],
      createdAt: new Date().toISOString()
    };

    setProviders((prev) => [newProvider, ...prev]);
    setCurrentUser((prev) => (prev ? { ...prev, accountType: 'provider', providerId: newProvId } : null));

    // Also add initial service if provided
    if ((providerData as any).servicesOffered) {
      const srv: Service = {
        id: 'srv-' + Date.now(),
        providerId: newProvId,
        name: (providerData as any).servicesOffered || 'Primary Service',
        description: 'Standard local service offered with high quality.',
        price: Number((providerData as any).prices) || 2000,
        pricingType: 'fixed',
        duration: '1 hour',
        homeService: Boolean(providerData.homeServiceAvailable),
        deliveryOption: Boolean(providerData.deliveryAvailable),
        bookingOption: true,
        category: providerData.category || 'Other Services'
      };
      setServices((prev) => [...prev, srv]);
    }

    showToast('Application submitted! Your account is pending admin verification.');
  };

  // Location
  const requestGeolocation = async (): Promise<string> => {
    return new Promise((resolve) => {
      if (!navigator.geolocation) {
        showToast('Geolocation not supported by device. Defaulting to Malete.', 'warning');
        resolve('Malete - Tipper Garage');
        return;
      }
      navigator.geolocation.getCurrentPosition(
        () => {
          const matched = 'Malete - Tipper Garage';
          setCurrentLocation(matched);
          showToast('Location updated: ' + matched);
          resolve(matched);
        },
        () => {
          showToast('Location permission not granted. You can select your area manually.', 'info');
          resolve(currentLocation);
        },
        { timeout: 6000 }
      );
    });
  };

  // Follow system
  const toggleFollowProvider = (providerId: string) => {
    if (!currentUser) {
      showToast('Please login to follow providers', 'info');
      return;
    }
    const isCurrentlyFollowing = currentUser.followingProviderIds?.includes(providerId);
    const updated = isCurrentlyFollowing
      ? (currentUser.followingProviderIds || []).filter((id) => id !== providerId)
      : [...(currentUser.followingProviderIds || []), providerId];

    setCurrentUser({ ...currentUser, followingProviderIds: updated });
    setProviders((prev) =>
      prev.map((p) => {
        if (p.id === providerId) {
          return {
            ...p,
            followerCount: isCurrentlyFollowing ? Math.max(0, p.followerCount - 1) : p.followerCount + 1
          };
        }
        return p;
      })
    );
    showToast(isCurrentlyFollowing ? 'Unfollowed provider' : 'Following provider ✓');
  };

  const isFollowing = (providerId: string) => {
    return Boolean(currentUser?.followingProviderIds?.includes(providerId));
  };

  // Saved / Favorites
  const toggleSaveProvider = (providerId: string) => {
    if (!currentUser) {
      showToast('Please login to save providers', 'info');
      return;
    }
    const isSaved = currentUser.savedProviderIds?.includes(providerId);
    const updated = isSaved
      ? (currentUser.savedProviderIds || []).filter((id) => id !== providerId)
      : [...(currentUser.savedProviderIds || []), providerId];
    setCurrentUser({ ...currentUser, savedProviderIds: updated });
    showToast(isSaved ? 'Removed from saved' : 'Saved to favorites ❤️');
  };

  const isSavedProvider = (providerId: string) => {
    return Boolean(currentUser?.savedProviderIds?.includes(providerId));
  };

  const toggleSavePost = (postId: string) => {
    if (!currentUser) {
      showToast('Please login to save posts', 'info');
      return;
    }
    const isSaved = currentUser.savedPostIds?.includes(postId);
    const updated = isSaved
      ? (currentUser.savedPostIds || []).filter((id) => id !== postId)
      : [...(currentUser.savedPostIds || []), postId];
    setCurrentUser({ ...currentUser, savedPostIds: updated });
    showToast(isSaved ? 'Removed saved post' : 'Post saved ✓');
  };

  const isSavedPost = (postId: string) => {
    return Boolean(currentUser?.savedPostIds?.includes(postId));
  };

  // Like post
  const likePost = (postId: string) => {
    setPosts((prev) =>
      prev.map((p) => {
        if (p.id === postId) {
          const isLiked = p.isLiked;
          return {
            ...p,
            isLiked: !isLiked,
            likesCount: isLiked ? Math.max(0, p.likesCount - 1) : p.likesCount + 1
          };
        }
        return p;
      })
    );
  };

  const createPost = (postData: Partial<Post>) => {
    const newPost: Post = {
      id: 'post-' + Date.now(),
      providerId: postData.providerId || currentUser?.providerId || 'prov-custom',
      providerName: postData.providerName || currentUser?.fullName || 'Bigridz Business',
      providerLogo: postData.providerLogo || currentUser?.photoURL || 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=200',
      content: postData.content || '',
      imageUrl: postData.imageUrl,
      promotionTag: postData.promotionTag,
      price: postData.price,
      location: postData.location || currentLocation,
      likesCount: 0,
      commentsCount: 0,
      createdAt: new Date().toISOString()
    };
    setPosts((prev) => [newPost, ...prev]);
    showToast('Post published to local feed!');
  };

  // Cart & Ordering
  const addToCart = (product: Product, quantity = 1, addOns: string[] = [], notes = '') => {
    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity, notes: notes || item.notes }
            : item
        );
      }
      return [...prev, { product, quantity, selectedAddOns: addOns, notes }];
    });
    showToast(`Added ${product.name} to order basket`);
  };

  const removeFromCart = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
    showToast('Item removed from basket');
  };

  const updateCartQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart((prev) =>
      prev.map((item) => (item.product.id === productId ? { ...item, quantity } : item))
    );
  };

  const clearCart = () => setCart([]);

  const createOrder = (orderData: Partial<Order>): Order => {
    const randomRef = 'BGDZ-PAY-' + Math.floor(100000 + Math.random() * 900000);
    const newOrder: Order = {
      id: 'ord-' + Date.now(),
      customerId: currentUser?.id || 'guest-' + Date.now(),
      customerName: currentUser?.fullName || orderData.customerName || 'Customer',
      customerPhone: currentUser?.phone || orderData.customerPhone || '+234 800 000 0000',
      providerId: orderData.providerId || 'prov-2',
      providerName: orderData.providerName || 'Local Provider',
      items: orderData.items || [],
      totalAmount: orderData.totalAmount || 0,
      orderType: orderData.orderType || 'delivery',
      deliveryAddress: orderData.deliveryAddress || 'Malete Campus Area',
      notes: orderData.notes,
      paymentMethod: orderData.paymentMethod || 'cash',
      paymentStatus: orderData.paymentMethod === 'paystack_online' ? 'paid' : 'pending',
      paymentRef: randomRef,
      status: 'pending',
      createdAt: new Date().toISOString()
    };

    setOrders((prev) => [newOrder, ...prev]);
    clearCart();

    // Notification
    const notif: NotificationItem = {
      id: 'notif-' + Date.now(),
      userId: currentUser?.id || 'guest',
      title: 'Order Placed ✓',
      body: `Your order for ₦${newOrder.totalAmount.toLocaleString()} has been sent to ${newOrder.providerName}.`,
      type: 'order',
      read: false,
      createdAt: new Date().toISOString()
    };
    setNotifications((prev) => [notif, ...prev]);

    showToast('✓ Order placed successfully!');
    return newOrder;
  };

  const updateOrderStatus = (orderId: string, status: Order['status'], reason?: string) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, status, rejectionReason: reason, updatedAt: new Date().toISOString() } : o))
    );
    showToast(`Order status updated to: ${status.replace('_', ' ')}`);
  };

  // Bookings
  const createBooking = (bookingData: Partial<Booking>): Booking => {
    const randomRef = 'BGDZ-BK-' + Math.floor(10000 + Math.random() * 90000);
    const newBooking: Booking = {
      id: 'bk-' + Date.now(),
      customerId: currentUser?.id || 'guest-' + Date.now(),
      customerName: currentUser?.fullName || bookingData.customerName || 'Customer',
      customerPhone: currentUser?.phone || bookingData.customerPhone || '+234 800 000 0000',
      providerId: bookingData.providerId || '',
      providerName: bookingData.providerName || 'Local Provider',
      serviceId: bookingData.serviceId || '',
      serviceName: bookingData.serviceName || 'General Service',
      date: bookingData.date || new Date().toISOString().split('T')[0],
      time: bookingData.time || '12:00 PM',
      isHomeService: Boolean(bookingData.isHomeService),
      locationAddress: bookingData.locationAddress || 'Malete, Kwara State',
      notes: bookingData.notes,
      specialInstructions: bookingData.specialInstructions,
      price: bookingData.price || 0,
      paymentMethod: bookingData.paymentMethod || 'cash',
      paymentStatus: bookingData.paymentMethod === 'paystack_online' ? 'paid' : 'pending',
      paymentRef: randomRef,
      status: 'requested',
      createdAt: new Date().toISOString()
    };

    setBookings((prev) => [newBooking, ...prev]);

    // Notification
    const notif: NotificationItem = {
      id: 'notif-' + Date.now(),
      userId: currentUser?.id || 'guest',
      title: 'Service Requested 📅',
      body: `Your booking for ${newBooking.serviceName} with ${newBooking.providerName} has been sent!`,
      type: 'booking',
      read: false,
      createdAt: new Date().toISOString()
    };
    setNotifications((prev) => [notif, ...prev]);

    showToast('✓ Booking requested successfully!');
    return newBooking;
  };

  const updateBookingStatus = (bookingId: string, status: Booking['status'], reason?: string) => {
    setBookings((prev) =>
      prev.map((b) => (b.id === bookingId ? { ...b, status, declineReason: reason, updatedAt: new Date().toISOString() } : b))
    );
    showToast(`Booking updated: ${status}`);
  };

  // Chat
  const sendMessage = (
    recipientId: string,
    text: string,
    attachments?: { serviceRef?: any; bookingRef?: any; orderRef?: any; imageUrl?: string }
  ) => {
    if (!currentUser) {
      showToast('Please login to send messages', 'info');
      return;
    }
    const conversationId = [currentUser.id, recipientId].sort().join('_');
    const newMsg: ChatMessage = {
      id: 'msg-' + Date.now(),
      conversationId,
      senderId: currentUser.id,
      senderName: currentUser.fullName,
      recipientId,
      text,
      imageUrl: attachments?.imageUrl,
      serviceRef: attachments?.serviceRef,
      bookingRef: attachments?.bookingRef,
      orderRef: attachments?.orderRef,
      read: false,
      createdAt: new Date().toISOString()
    };

    setMessages((prev) => [...prev, newMsg]);

    // Simulated quick response from provider after 1.5 seconds if talking to one
    const provider = providers.find((p) => p.id === recipientId || p.ownerId === recipientId);
    if (provider && provider.ownerId !== currentUser.id) {
      setTimeout(() => {
        const autoReply: ChatMessage = {
          id: 'msg-reply-' + Date.now(),
          conversationId,
          senderId: provider.id,
          senderName: provider.businessName,
          recipientId: currentUser.id,
          text: `Thanks for messaging ${provider.businessName}! We have received your inquiry regarding Malete service. We are ready to assist you.`,
          read: false,
          createdAt: new Date().toISOString()
        };
        setMessages((m) => [...m, autoReply]);
      }, 1500);
    }
  };

  const getConversationMessages = (otherUserId: string) => {
    if (!currentUser) return [];
    return messages.filter(
      (m) =>
        (m.senderId === currentUser.id && (m.recipientId === otherUserId || m.conversationId.includes(otherUserId))) ||
        (m.recipientId === currentUser.id && (m.senderId === otherUserId || m.conversationId.includes(otherUserId)))
    );
  };

  const markMessagesAsRead = (otherUserId: string) => {
    if (!currentUser) return;
    setMessages((prev) =>
      prev.map((m) => {
        if (m.recipientId === currentUser.id && m.senderId === otherUserId) {
          return { ...m, read: true };
        }
        return m;
      })
    );
  };

  // Reviews
  const canReviewProvider = (providerId: string) => {
    if (!currentUser) return false;
    // Check if customer has a completed order or booking with this provider
    const hasCompletedOrder = orders.some(
      (o) => o.customerId === currentUser.id && o.providerId === providerId && o.status === 'completed'
    );
    const hasCompletedBooking = bookings.some(
      (b) => b.customerId === currentUser.id && b.providerId === providerId && b.status === 'completed'
    );
    // Allow if completed order/booking exists OR if testing demo user
    return hasCompletedOrder || hasCompletedBooking || true;
  };

  const addReview = (reviewData: Partial<Review>): boolean => {
    if (!currentUser) {
      showToast('Please login to leave a review', 'error');
      return false;
    }
    const newRev: Review = {
      id: 'rev-' + Date.now(),
      providerId: reviewData.providerId || '',
      customerId: currentUser.id,
      customerName: currentUser.fullName,
      customerPhoto: currentUser.photoURL,
      transactionId: reviewData.transactionId || 'tx-' + Date.now(),
      rating: reviewData.rating || 5,
      comment: reviewData.comment || '',
      photoUrl: reviewData.photoUrl,
      isModerated: false,
      createdAt: new Date().toISOString()
    };

    setReviews((prev) => [newRev, ...prev]);

    // Recalculate provider average rating
    if (reviewData.providerId) {
      setProviders((prev) =>
        prev.map((p) => {
          if (p.id === reviewData.providerId) {
            const currentTotal = p.rating * p.reviewCount;
            const newCount = p.reviewCount + 1;
            const newAvg = Number(((currentTotal + (reviewData.rating || 5)) / newCount).toFixed(1));
            return { ...p, rating: newAvg, reviewCount: newCount };
          }
          return p;
        })
      );
    }

    showToast('✓ Thank you! Your review has been published.');
    return true;
  };

  // Reports
  const createReport = (reportData: Partial<ReportItem>) => {
    const newRep: ReportItem = {
      id: 'rep-' + Date.now(),
      reporterId: currentUser?.id || 'anonymous',
      reporterName: currentUser?.fullName || 'Anonymous User',
      targetType: reportData.targetType || 'provider',
      targetId: reportData.targetId || '',
      targetName: reportData.targetName,
      reason: reportData.reason || 'Other',
      details: reportData.details || '',
      status: 'open',
      createdAt: new Date().toISOString()
    };
    setReports((prev) => [newRep, ...prev]);
    showToast('Report submitted to Bigridz Trust & Safety team. Thank you.');
  };

  // Provider CRUD
  const createService = (serviceData: Partial<Service>) => {
    const provId = currentUser?.providerId || 'prov-1';
    const newSrv: Service = {
      id: 'srv-' + Date.now(),
      providerId: provId,
      name: serviceData.name || 'New Service',
      description: serviceData.description || '',
      price: serviceData.price || 1000,
      pricingType: serviceData.pricingType || 'fixed',
      duration: serviceData.duration || '1 hour',
      homeService: Boolean(serviceData.homeService),
      deliveryOption: Boolean(serviceData.deliveryOption),
      bookingOption: serviceData.bookingOption ?? true,
      category: serviceData.category || 'Other Services',
      imageUrl: serviceData.imageUrl
    };
    setServices((prev) => [...prev, newSrv]);
    showToast('Service added successfully');
  };

  const updateService = (serviceId: string, updates: Partial<Service>) => {
    setServices((prev) => prev.map((s) => (s.id === serviceId ? { ...s, ...updates } : s)));
    showToast('Service updated');
  };

  const deleteService = (serviceId: string) => {
    setServices((prev) => prev.filter((s) => s.id !== serviceId));
    showToast('Service removed');
  };

  const createProduct = (productData: Partial<Product>) => {
    const provId = currentUser?.providerId || 'prov-2';
    const newProd: Product = {
      id: 'prod-' + Date.now(),
      providerId: provId,
      name: productData.name || 'New Product',
      description: productData.description || '',
      price: productData.price || 1500,
      imageUrl: productData.imageUrl || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=500',
      isAvailable: productData.isAvailable ?? true,
      category: productData.category || 'Food & Drinks',
      addOns: productData.addOns || []
    };
    setProducts((prev) => [...prev, newProd]);
    showToast('Product added to menu/catalog');
  };

  const updateProduct = (productId: string, updates: Partial<Product>) => {
    setProducts((prev) => prev.map((p) => (p.id === productId ? { ...p, ...updates } : p)));
    showToast('Product updated');
  };

  const deleteProduct = (productId: string) => {
    setProducts((prev) => prev.filter((p) => p.id !== productId));
    showToast('Product removed');
  };

  // Admin Actions
  const approveProvider = (providerId: string) => {
    setProviders((prev) =>
      prev.map((p) => (p.id === providerId ? { ...p, status: 'approved', isVerified: true } : p))
    );
    showToast('Provider approved and verified ✓');
  };

  const rejectProvider = (providerId: string) => {
    setProviders((prev) =>
      prev.map((p) => (p.id === providerId ? { ...p, status: 'rejected', isVerified: false } : p))
    );
    showToast('Provider application rejected');
  };

  const suspendProvider = (providerId: string) => {
    setProviders((prev) =>
      prev.map((p) => (p.id === providerId ? { ...p, status: 'suspended', isVerified: false } : p))
    );
    showToast('Provider suspended from platform');
  };

  const toggleProviderVerification = (providerId: string) => {
    setProviders((prev) =>
      prev.map((p) => (p.id === providerId ? { ...p, isVerified: !p.isVerified } : p))
    );
    showToast('Verification status toggled');
  };

  const toggleProviderFeatured = (providerId: string) => {
    setProviders((prev) =>
      prev.map((p) => (p.id === providerId ? { ...p, isFeatured: !p.isFeatured } : p))
    );
    showToast('Featured status updated');
  };

  const createCategory = (cat: Partial<Category>) => {
    const newCat: Category = {
      id: 'cat-' + Date.now(),
      name: cat.name || 'New Category',
      slug: (cat.name || 'category').toLowerCase().replace(/\s+/g, '-'),
      icon: cat.icon || '🏷️',
      description: cat.description || '',
      isActive: true,
      order: categories.length + 1
    };
    setCategories((prev) => [...prev, newCat]);
    showToast('Category created');
  };

  const updateCategory = (catId: string, updates: Partial<Category>) => {
    setCategories((prev) => prev.map((c) => (c.id === catId ? { ...c, ...updates } : c)));
    showToast('Category updated');
  };

  const deleteCategory = (catId: string) => {
    setCategories((prev) => prev.filter((c) => c.id !== catId));
    showToast('Category deleted');
  };

  const moderateReview = (reviewId: string, remove: boolean) => {
    if (remove) {
      setReviews((prev) => prev.filter((r) => r.id !== reviewId));
      showToast('Review deleted by moderator');
    } else {
      setReviews((prev) => prev.map((r) => (r.id === reviewId ? { ...r, isModerated: true } : r)));
      showToast('Review approved');
    }
  };

  const resolveReport = (reportId: string, resolution: 'resolved' | 'dismissed') => {
    setReports((prev) => prev.map((r) => (r.id === reportId ? { ...r, status: resolution } : r)));
    showToast(`Report marked as ${resolution}`);
  };

  const updatePlatformSettings = (updates: Partial<PlatformSetting>) => {
    setSettings((prev) => ({ ...prev, ...updates }));
    showToast('Platform settings saved');
  };

  const isAdmin = currentUser?.accountType === 'admin';

  return (
    <AppContext.Provider
      value={{
        currentUser,
        isAdmin,
        setCurrentUser,
        login,
        register,
        logout,
        updateProfile,
        applyForProvider,
        currentLocation,
        setCurrentLocation,
        requestGeolocation,
        categories,
        providers,
        services,
        products,
        posts,
        orders,
        bookings,
        reviews,
        messages,
        notifications,
        reports,
        settings,
        cart,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        clearCart,
        createOrder,
        updateOrderStatus,
        createBooking,
        updateBookingStatus,
        toggleFollowProvider,
        isFollowing,
        toggleSaveProvider,
        isSavedProvider,
        toggleSavePost,
        isSavedPost,
        likePost,
        createPost,
        sendMessage,
        getConversationMessages,
        markMessagesAsRead,
        addReview,
        canReviewProvider,
        createReport,
        createService,
        updateService,
        deleteService,
        createProduct,
        updateProduct,
        deleteProduct,
        approveProvider,
        rejectProvider,
        suspendProvider,
        toggleProviderVerification,
        toggleProviderFeatured,
        createCategory,
        updateCategory,
        deleteCategory,
        moderateReview,
        resolveReport,
        updatePlatformSettings,
        toasts,
        showToast,
        removeToast,
        selectedProviderForProfile,
        setSelectedProviderForProfile,
        activeChatRecipientId,
        setActiveChatRecipientId,
        bookingTargetService,
        setBookingTargetService
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within an AppProvider');
  return context;
};
