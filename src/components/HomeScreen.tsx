import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { ProviderCard } from './ProviderCard';
import { Provider, Service, Post } from '../types';
import {
  Search,
  MapPin,
  ArrowRight,
  Home,
  CheckCircle2,
  Calendar,
  ShoppingBag,
  MessageCircle,
  Share2,
  Heart,
  Filter,
  Sparkles
} from 'lucide-react';

interface HomeScreenProps {
  onOpenProfile: (provider: Provider) => void;
  onOpenSearch: () => void;
  onOpenBooking: (service: Service, provider: Provider) => void;
  onOpenOrder: (provider: Provider) => void;
  setActiveView: (view: string) => void;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({
  onOpenProfile,
  onOpenSearch,
  onOpenBooking,
  onOpenOrder,
  setActiveView
}) => {
  const {
    currentLocation,
    categories,
    providers,
    services,
    posts,
    likePost,
    toggleSavePost,
    isSavedPost,
    setActiveChatRecipientId
  } = useApp();

  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [filterHomeService, setFilterHomeService] = useState<boolean>(false);
  const [filterOpenNow, setFilterOpenNow] = useState<boolean>(false);

  // Filter approved providers
  const approvedProviders = providers.filter((p) => p.status === 'approved');

  // Filter for the primary Nearby section
  const nearbyProviders = approvedProviders
    .filter((p) => {
      if (selectedCategory !== 'all' && p.category !== selectedCategory) return false;
      if (filterHomeService && !p.homeServiceAvailable) return false;
      if (filterOpenNow && !p.isOpen) return false;
      return true;
    })
    .sort((a, b) => a.distanceKm - b.distanceKm);

  // Popular providers (highest rating & review count)
  const popularProviders = [...approvedProviders]
    .sort((a, b) => b.rating * b.reviewCount - a.rating * a.reviewCount)
    .slice(0, 4);

  // Recent provider community posts
  const recentPosts = posts.slice(0, 3);

  // Top popular service categories
  const popularCategories = categories.filter((c) => c.isActive).slice(0, 8);

  return (
    <div id="bigridz-home-screen" className="pb-24 pt-2 max-w-6xl mx-auto px-4 space-y-6">
      {/* 1. TOP SEARCH BAR (From Mockup) */}
      <section className="pt-1">
        <div
          onClick={onOpenSearch}
          className="h-12 w-full px-4 rounded-xl bg-[#14161D] border border-[#262B38] hover:border-[#F5A623] flex items-center gap-3 text-[#8E95A5] cursor-pointer transition-colors shadow-xs"
        >
          <Search className="w-4 h-4 text-[#8E95A5] shrink-0" />
          <span className="text-xs sm:text-sm text-[#8E95A5] truncate">
            Search for shops, services or anything...
          </span>
        </div>
      </section>

      {/* 2. PROMO BANNER (Directly from Mockup!) */}
      <section className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#171922] via-[#1E222E] to-[#12141A] border border-[#2A2F3D] p-5 sm:p-7 shadow-lg">
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#F5A623]/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-md space-y-2">
          <span className="inline-block text-[11px] font-bold uppercase tracking-wider text-[#F5A623]">
            Community First
          </span>
          <h2 className="font-heading font-extrabold text-xl sm:text-2xl text-white leading-tight">
            Support Local Shop, Buy Local Grow Malete
          </h2>
          <p className="text-xs sm:text-sm text-[#A1A7B5] leading-relaxed">
            Shop from trusted local businesses, campus bukaterias, and student entrepreneurs near you.
          </p>
          <div className="pt-2">
            <button
              onClick={() => setActiveView('discover')}
              className="px-5 py-2.5 rounded-xl bg-[#F5A623] hover:bg-[#E59819] text-black font-bold text-xs sm:text-sm shadow-md shadow-[#F5A623]/20 transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              Explore Now
            </button>
          </div>
        </div>
      </section>

      {/* 3. CATEGORIES (8 Circular/Icon Grid directly matching Mockup!) */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="font-heading font-bold text-sm text-[#F5F5F5]">
            Categories
          </h3>
          <button
            onClick={() => setActiveView('discover')}
            className="text-xs text-[#F5A623] hover:underline font-medium"
          >
            See all
          </button>
        </div>

        <div className="grid grid-cols-4 sm:grid-cols-8 gap-3">
          {categories.slice(0, 8).map((cat) => {
            const isSelected = selectedCategory === cat.name;
            return (
              <button
                key={cat.id}
                onClick={() => {
                  setSelectedCategory(isSelected ? 'all' : cat.name);
                }}
                className="flex flex-col items-center gap-1.5 p-2 rounded-xl transition-all group"
              >
                <div
                  className={`w-14 h-14 rounded-2xl flex items-center justify-center text-2xl transition-all border ${
                    isSelected
                      ? 'bg-[#F5A623] text-black border-[#F5A623] shadow-md shadow-[#F5A623]/30 scale-105'
                      : 'bg-[#14161D] border-[#262B38] group-hover:border-[#F5A623] group-hover:bg-[#1A1D27]'
                  }`}
                >
                  {cat.icon}
                </div>
                <span className={`text-[11px] font-medium text-center line-clamp-1 ${
                  isSelected ? 'text-[#F5A623] font-bold' : 'text-[#D1D5DB] group-hover:text-white'
                }`}>
                  {cat.name}
                </span>
              </button>
            );
          })}
        </div>
      </section>

      {/* 4. NEARBY SHOPS (From Mockup: Mama T, Royal Chop, Dee's Snacks, Jollof & More) */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-heading font-bold text-base text-[#F5F5F5]">
              Nearby Shops
            </h3>
            <p className="text-xs text-[#8E95A5]">
              Local food vendors and stores around {currentLocation.replace('Malete - ', '')}
            </p>
          </div>
          <button
            onClick={() => setActiveView('discover')}
            className="text-xs text-[#F5A623] hover:underline font-semibold flex items-center gap-1"
          >
            <span>View all</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {nearbyProviders.slice(0, 6).map((provider) => (
            <ProviderCard
              key={provider.id}
              provider={provider}
              onOpenProfile={onOpenProfile}
              onBookNow={(p) => {
                const s = services.find((srv) => srv.providerId === p.id);
                if (s) onOpenBooking(s, p);
                else onOpenProfile(p);
              }}
              onOrderNow={onOpenOrder}
            />
          ))}
        </div>
      </section>

      {/* 5. POPULAR SERVICES (From Mockup: Abdul Tech, Malete Executive Cuts, etc.) */}
      <section className="space-y-3 pt-2">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-heading font-bold text-base text-[#F5F5F5]">
              Popular Services
            </h3>
            <p className="text-xs text-[#8E95A5]">
              Trusted phone technicians, barbers, laundry, and artisans
            </p>
          </div>
          <button
            onClick={() => setActiveView('discover')}
            className="text-xs text-[#F5A623] hover:underline font-semibold flex items-center gap-1"
          >
            <span>View all</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {approvedProviders
            .filter((p) => p.category === 'Services' || p.category === 'Barbers' || p.category === 'Laundry')
            .slice(0, 3)
            .map((provider) => (
              <ProviderCard
                key={provider.id}
                provider={provider}
                onOpenProfile={onOpenProfile}
                onBookNow={(p) => {
                  const s = services.find((srv) => srv.providerId === p.id);
                  if (s) onOpenBooking(s, p);
                  else onOpenProfile(p);
                }}
                onOrderNow={onOpenOrder}
              />
            ))}
        </div>
      </section>

      {/* 6. CALL TO ACTION BANNER (From Mockup footer) */}
      <section className="rounded-2xl bg-[#14161D] border border-[#262B38] p-6 text-center space-y-3">
        <h4 className="font-heading font-bold text-lg text-white">
          Shop Local. Support Local. Build Malete.
        </h4>
        <p className="text-xs text-[#8E95A5] max-w-md mx-auto">
          Are you a student vendor, technician, or artisan in Malete? Register your business today and get discovered by thousands of campus customers.
        </p>
        <div className="flex items-center justify-center gap-3 pt-1">
          <button
            onClick={() => setActiveView('apply-provider')}
            className="px-5 py-2 rounded-xl bg-[#F5A623] hover:bg-[#E59819] text-black font-bold text-xs transition-colors"
          >
            List Your Business Free
          </button>
          <button
            onClick={() => setActiveView('discover')}
            className="px-4 py-2 rounded-xl bg-[#1E222E] border border-[#262B38] hover:border-[#F5A623] text-white text-xs font-medium transition-colors"
          >
            Explore Directory
          </button>
        </div>
      </section>
    </div>
  );
};
