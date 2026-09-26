export type AccountType = 'customer' | 'provider' | 'admin';
export type ProviderStatus = 'pending' | 'approved' | 'rejected' | 'suspended';
export type PricingType = 'fixed' | 'starting_from' | 'custom_quote';
export type OrderStatus = 'pending' | 'accepted' | 'preparing' | 'ready' | 'out_for_delivery' | 'completed' | 'rejected';
export type BookingStatus = 'requested' | 'accepted' | 'confirmed' | 'in_progress' | 'completed' | 'declined' | 'cancelled';
export type PaymentMethod = 'cash' | 'paystack_online';
export type PaymentStatus = 'pending' | 'paid' | 'refunded';

export interface User {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  username: string;
  location: string;
  hostelAddress?: string;
  accountType: AccountType;
  photoURL?: string;
  emailVerified: boolean;
  phoneVerified: boolean;
  providerId?: string;
  savedProviderIds?: string[];
  savedPostIds?: string[];
  followingProviderIds?: string[];
  createdAt: string;
  updatedAt?: string;
}

export interface Provider {
  id: string;
  ownerId: string;
  businessName: string;
  ownerName: string;
  phone: string;
  email: string;
  category: string;
  description: string;
  location: string;
  address: string;
  distanceKm: number;
  logoUrl: string;
  coverUrl: string;
  openingHours: string;
  isOpen: boolean;
  homeServiceAvailable: boolean;
  deliveryAvailable: boolean;
  status: ProviderStatus;
  isVerified: boolean;
  isFeatured?: boolean;
  rating: number;
  reviewCount: number;
  followerCount: number;
  paymentInfo?: string;
  photos?: string[];
  createdAt: string;
  updatedAt?: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  icon: string;
  description: string;
  isActive: boolean;
  order: number;
}

export interface Service {
  id: string;
  providerId: string;
  name: string;
  description: string;
  price: number;
  pricingType: PricingType;
  duration?: string;
  homeService: boolean;
  deliveryOption: boolean;
  bookingOption: boolean;
  category: string;
  imageUrl?: string;
}

export interface ProductAddOn {
  name: string;
  price: number;
}

export interface Product {
  id: string;
  providerId: string;
  name: string;
  description: string;
  price: number;
  imageUrl?: string;
  isAvailable: boolean;
  category: string;
  addOns?: ProductAddOn[];
}

export interface Post {
  id: string;
  providerId: string;
  providerName: string;
  providerLogo: string;
  content: string;
  imageUrl?: string;
  promotionTag?: string;
  price?: number;
  location: string;
  likesCount: number;
  commentsCount: number;
  isLiked?: boolean;
  createdAt: string;
}

export interface OrderItem {
  productId: string;
  name: string;
  price: number;
  quantity: number;
  notes?: string;
}

export interface Order {
  id: string;
  customerId: string;
  customerName: string;
  customerPhone: string;
  providerId: string;
  providerName: string;
  providerOwnerId?: string;
  items: OrderItem[];
  totalAmount: number;
  deliveryFee?: number;
  orderType: 'delivery' | 'pickup';
  deliveryAddress?: string;
  notes?: string;
  paymentMethod: PaymentMethod;
  paymentStatus: PaymentStatus;
  paymentRef: string;
  status: OrderStatus;
  rejectionReason?: string;
  createdAt: string;
  updatedAt?: string;
}

export interface Booking {
  id: string;
  customerId: string;
  customerName: string;
  customerPhone: string;
  providerId: string;
  providerName: string;
  providerOwnerId?: string;
  serviceId: string;
  serviceName: string;
  date: string;
  time: string;
  isHomeService: boolean;
  locationAddress?: string;
  notes?: string;
  specialInstructions?: string;
  price: number;
  paymentMethod: PaymentMethod;
  paymentStatus: PaymentStatus;
  paymentRef?: string;
  status: BookingStatus;
  declineReason?: string;
  createdAt: string;
  updatedAt?: string;
}

export interface Review {
  id: string;
  providerId: string;
  customerId: string;
  customerName: string;
  customerPhoto?: string;
  transactionId: string;
  rating: number;
  comment: string;
  photoUrl?: string;
  isModerated: boolean;
  createdAt: string;
}

export interface ChatMessage {
  id: string;
  conversationId: string;
  senderId: string;
  senderName: string;
  recipientId: string;
  text: string;
  imageUrl?: string;
  serviceRef?: { name: string; price: number };
  bookingRef?: { id: string; service: string };
  orderRef?: { id: string; total: number };
  read: boolean;
  createdAt: string;
}

export interface Conversation {
  id: string;
  participants: string[];
  providerId: string;
  providerName: string;
  providerLogo: string;
  customerId: string;
  customerName: string;
  lastMessage: string;
  lastMessageTime: string;
  unreadCount: number;
}

export interface NotificationItem {
  id: string;
  userId: string;
  title: string;
  body: string;
  type: 'order' | 'booking' | 'chat' | 'post' | 'system' | 'verification';
  read: boolean;
  link?: string;
  createdAt: string;
}

export interface ReportItem {
  id: string;
  reporterId: string;
  reporterName: string;
  targetType: 'provider' | 'customer' | 'post' | 'review' | 'message';
  targetId: string;
  targetName?: string;
  reason: string;
  details: string;
  status: 'open' | 'investigating' | 'resolved' | 'dismissed';
  createdAt: string;
}

export interface PlatformSetting {
  platformName: string;
  tagline: string;
  serviceFeePercent: number;
  flatCommission: number;
  commissionRate?: number;
  deliveryFeeBase?: number;
  locations: string[];
  emergencyContact: string;
  supportEmail: string;
  maintenanceMode: boolean;
}
