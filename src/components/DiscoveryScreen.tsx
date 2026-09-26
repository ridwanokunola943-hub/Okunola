import React, { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { Provider, Service, Product, Post } from '../types';
import { ProviderCard } from './ProviderCard';
import { MALETE_AREA_GROUPS, POPULAR_MALETE_LOCATIONS } from '../data/mockData';
import {
  Search,
  Filter,
  X,
  Star,
  MapPin,
  Home,
  Truck,
  CheckCircle2,
  SlidersHorizontal,
  Calendar,
  ShoppingBag,
  Sparkles,
  ChevronDown
} from 'lucide-react';

interface DiscoveryScreenProps {
  onOpenProfile: (provider: Provider) => void;
  onOpenBooking: (service: Service, provider: Provider) => void;
  onOpenOrder: (provider: Provider) => void;
  initialQuery?: string;
}

export const DiscoveryScreen: React.FC<DiscoveryScreenProps> = ({
  onOpenProfile,
  onOpenBooking,
  onOpenOrder,
  initialQuery = ''
}) => {
  const { categories, providers, services, products, posts, currentLocation, setCurrentLocation } = useApp();

  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [selectedTypeTab, setSelectedTypeTab] = useState<'all' | 'shops' | 'services' | 'posts'>('all');
  const [selectedAreaFilter, setSelectedAreaFilter] = useState<string>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [filterHomeService, setFilterHomeService] = useState<boolean>(false);
  const [filterDelivery, setFilterDelivery] = useState<boolean>(false);
  const [filterOpenNow, setFilterOpenNow] = useState<boolean>(false);
  const [filterVerifiedOnly, setFilterVerifiedOnly] = useState<boolean>(false);
  const [minRating, setMinRating] = useState<number>(0);
  const [maxDistance, setMaxDistance] = useState<number>(10);
  const [showFiltersModal, setShowFiltersModal] = useState<boolean>(false);
  const [showLocationModal, setShowLocationModal] = useState<boolean>(false);

  // Popular searches
  const POPULAR_SEARCHES = [
    'Food',
    'Phone Repair',
    'Barbers',
    'Hostel Cleaning',
    'Snacks',
    'Mama T',
    'Abdul Tech'
  ];

  // Matched and sorted providers
  const matchedProviders = useMemo(() => {
    return providers
      .filter((p) => {
        if (p.status !== 'approved') return false;

        // Type filter: Shops vs Services vs All
        if (selectedTypeTab === 'shops') {
          const isShop = p.category === 'Shops' || p.category === 'Food & Drink' || p.category.toLowerCase().includes('shop') || p.category.toLowerCase().includes('food');
          if (!isShop) return false;
        } else if (selectedTypeTab === 'services') {
          const isShop = p.category === 'Shops' || p.category === 'Food & Drink';
          if (isShop) return false;
        }

        // Category filter
        if (selectedCategory !== 'all' && p.category !== selectedCategory) return false;

        // Location area filter
        if (selectedAreaFilter !== 'all') {
          const areaKeyword = selectedAreaFilter.replace('Malete - ', '').toLowerCase();
          const pLoc = (p.location + ' ' + (p.address || '')).toLowerCase();
          if (!pLoc.includes(areaKeyword)) {
            // If provider is in general Malete and distance is small, keep unless strict
            const isGeneral = p.location.includes('Malete, Kwara State') || p.location.includes('Tipper Garage');
            if (!isGeneral && !pLoc.includes(areaKeyword)) return false;
          }
        }

        if (filterHomeService && !p.homeServiceAvailable) return false;
        if (filterDelivery && !p.deliveryAvailable) return false;
        if (filterOpenNow && !p.isOpen) return false;
        if (filterVerifiedOnly && !p.isVerified) return false;
        if (p.rating < minRating) return false;
        if (p.distanceKm && p.distanceKm > maxDistance) return false;

        if (!searchQuery.trim()) return true;
        const q = searchQuery.toLowerCase();
        return (
          p.businessName.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.location.toLowerCase().includes(q)
        );
      })
      .sort((a, b) => (a.distanceKm || 0) - (b.distanceKm || 0));
  }, [
    providers,
    searchQuery,
    selectedTypeTab,
    selectedCategory,
    selectedAreaFilter,
    filterHomeService,
    filterDelivery,
    filterOpenNow,
    filterVerifiedOnly,
    minRating,
    maxDistance
  ]);

  // Filtered posts when "Posts" tab is selected
  const matchedPosts = useMemo(() => {
    return posts.filter((post) => {
      if (!searchQuery.trim()) return true;
      const q = searchQuery.toLowerCase();
      return (
        post.content.toLowerCase().includes(q) ||
        post.providerName.toLowerCase().includes(q) ||
        (post.promotionTag && post.promotionTag.toLowerCase().includes(q))
      );
    });
  }, [posts, searchQuery]);

  // Count active filters
  const activeFiltersCount = [
    selectedAreaFilter !== 'all',
    filterHomeService,
    filterDelivery,
    filterOpenNow,
    filterVerifiedOnly,
    minRating > 0,
    maxDistance < 10
  ].filter(Boolean).length;

  return (
    <div id="bigridz-discover-screen" className="pb-24 pt-3 max-w-6xl mx-auto px-4">
      {/* Search Header */}
      <div className="mb-3">
        <div className="flex items-center justify-between mb-2.5">
          <div>
            <h1 className="font-heading font-bold text-xl sm:text-2xl text-[#F5F5F5]">
              Search
            </h1>
            <p className="text-xs text-[#A1A1AA]">
              Find shops, services and updates in Malete
            </p>
          </div>

          {/* Location Area Pill */}
          <button
            onClick={() => setShowLocationModal(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#14161D] border border-[#2A2E3D] hover:border-[#F5A623] text-xs font-medium text-[#F5F5F5] transition-colors"
          >
            <MapPin className="w-3.5 h-3.5 text-[#F5A623]" />
            <span className="truncate max-w-[140px]">
              {selectedAreaFilter === 'all' ? 'All Malete' : selectedAreaFilter.replace('Malete - ', '')}
            </span>
            <ChevronDown className="w-3 h-3 text-[#A1A1AA]" />
          </button>
        </div>

        {/* Clean Search Input with Clear Button */}
        <div className="relative">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#A1A1AA]" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search for shops, services or anything..."
            className="w-full h-11 pl-10 pr-9 rounded-xl bg-[#14161D] border border-[#2A2E3D] focus:border-[#F5A623] text-xs sm:text-sm text-[#F5F5F5] placeholder-[#8E95A5] transition-colors"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-[#A1A1AA] hover:text-[#F5F5F5]"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Trending Suggestions */}
        {!searchQuery && (
          <div className="flex items-center gap-1.5 overflow-x-auto py-2 scrollbar-none text-xs">
            <span className="text-[11px] text-[#A1A1AA] shrink-0 font-medium">Popular:</span>
            {POPULAR_SEARCHES.map((term) => (
              <button
                key={term}
                onClick={() => setSearchQuery(term)}
                className="shrink-0 px-2.5 py-1 rounded-md bg-[#14161D] border border-[#2A2E3D] text-[#A1A1AA] hover:text-[#F5F5F5] text-[11px] transition-colors"
              >
                {term}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Primary Tab Switcher: [ All ] [ Shops ] [ Services ] [ Posts ] (Matching Mockup!) */}
      <div className="grid grid-cols-4 gap-1.5 p-1 rounded-xl bg-[#14161D] border border-[#2A2E3D] mb-4">
        {(
          [
            { id: 'all', label: 'All' },
            { id: 'shops', label: 'Shops' },
            { id: 'services', label: 'Services' },
            { id: 'posts', label: 'Posts' }
          ] as const
        ).map((tab) => {
          const isActive = selectedTypeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setSelectedTypeTab(tab.id)}
              className={`py-2 rounded-lg text-xs font-semibold transition-all text-center ${
                isActive
                  ? 'bg-[#F5A623] text-black shadow-xs font-bold'
                  : 'text-[#8E95A5] hover:text-[#F5F5F5] hover:bg-[#1E222D]'
              }`}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Popular Area Chips for instant filtering */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-3 mb-2 scrollbar-none">
        <button
          onClick={() => setSelectedAreaFilter('all')}
          className={`shrink-0 px-3 py-1 rounded-full text-[11px] font-medium border transition-colors ${
            selectedAreaFilter === 'all'
              ? 'bg-[#F5A623]/20 border-[#F5A623] text-[#F5A623]'
              : 'bg-[#14161D] border-[#2A2E3D] text-[#8E95A5] hover:text-[#F5F5F5]'
          }`}
        >
          All Locations
        </button>
        {POPULAR_MALETE_LOCATIONS.map((loc) => {
          const isSelected = selectedAreaFilter === loc;
          const label = loc.replace('Malete - ', '');
          return (
            <button
              key={loc}
              onClick={() => setSelectedAreaFilter(isSelected ? 'all' : loc)}
              className={`shrink-0 px-2.5 py-1 rounded-full text-[11px] font-medium border transition-colors ${
                isSelected
                  ? 'bg-[#F5A623]/20 border-[#F5A623] text-[#F5A623]'
                  : 'bg-[#14161D] border-[#2A2E3D] text-[#8E95A5] hover:text-[#F5F5F5]'
              }`}
            >
              {label}
            </button>
          );
        })}
      </div>

      {/* Results Header */}
      <div className="flex items-center justify-between text-xs text-[#8E95A5] mb-3">
        <span>
          Showing{' '}
          <strong className="text-[#F5F5F5] font-semibold">
            {selectedTypeTab === 'posts' ? matchedPosts.length : matchedProviders.length}
          </strong>{' '}
          {selectedTypeTab === 'posts' ? 'posts' : 'results'}
        </span>
        {activeFiltersCount > 0 && (
          <button
            onClick={() => {
              setSelectedAreaFilter('all');
              setFilterHomeService(false);
              setFilterDelivery(false);
              setFilterOpenNow(false);
              setFilterVerifiedOnly(false);
              setMinRating(0);
              setMaxDistance(10);
            }}
            className="text-xs text-[#F5A623] hover:underline"
          >
            Clear filters
          </button>
        )}
      </div>

      {/* Render Posts View */}
      {selectedTypeTab === 'posts' ? (
        matchedPosts.length === 0 ? (
          <div className="p-10 rounded-xl bg-[#14161D] border border-[#2A2E3D] text-center text-xs text-[#8E95A5] space-y-2">
            <p className="text-[#F5F5F5] font-medium text-sm">No community posts found</p>
            <p>Try searching for other words like "food", "laundry" or "hair".</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {matchedPosts.map((post) => (
              <div
                key={post.id}
                className="p-4 rounded-xl bg-[#14161D] border border-[#2A2E3D] hover:border-[#F5A623]/60 transition-colors space-y-3"
              >
                <div className="flex items-center gap-3">
                  <img
                    src={post.providerLogo || 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=100'}
                    alt={post.providerName}
                    className="w-10 h-10 rounded-full object-cover border border-[#2A2E3D]"
                  />
                  <div>
                    <h4 className="text-sm font-bold text-[#F5F5F5]">{post.providerName}</h4>
                    <p className="text-[11px] text-[#8E95A5] flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-[#F5A623]" />
                      {post.location}
                    </p>
                  </div>
                  {post.promotionTag && (
                    <span className="ml-auto text-[10px] font-bold px-2 py-0.5 rounded bg-[#F5A623]/20 text-[#F5A623] border border-[#F5A623]/30">
                      {post.promotionTag}
                    </span>
                  )}
                </div>
                <p className="text-xs text-[#D1D5DB] leading-relaxed">{post.content}</p>
                {post.imageUrl && (
                  <img
                    src={post.imageUrl}
                    alt="Post"
                    className="w-full h-44 object-cover rounded-lg"
                  />
                )}
                <div className="flex items-center justify-between pt-2 border-t border-[#2A2E3D] text-xs">
                  {post.price ? (
                    <span className="font-bold text-[#F5A623] text-sm">₦{post.price.toLocaleString()}</span>
                  ) : <span />}
                  <button
                    onClick={() => {
                      const prov = providers.find((p) => p.id === post.providerId);
                      if (prov) onOpenProfile(prov);
                    }}
                    className="px-3 py-1.5 rounded-lg bg-[#F5A623] hover:bg-[#E59819] text-black font-semibold text-xs transition-colors"
                  >
                    View Shop
                  </button>
                </div>
              </div>
            ))}
          </div>
        )
      ) : (
        /* Provider Cards Grid */
        matchedProviders.length === 0 ? (
          <div className="p-10 rounded-xl bg-[#14161D] border border-[#2A2E3D] text-center text-xs text-[#8E95A5] space-y-2">
            <p className="text-[#F5F5F5] font-medium text-sm">No shops or services found</p>
            <p>Try clearing your location filter or searching with different keywords.</p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('all');
                setSelectedAreaFilter('all');
                setSelectedTypeTab('all');
              }}
              className="mt-3 px-3 py-1.5 rounded-lg bg-[#1E222D] border border-[#2A2E3D] text-[#F5F5F5]"
            >
              Reset All
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
            {matchedProviders.map((prov) => (
              <ProviderCard
                key={prov.id}
                provider={prov}
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
        )
      )}

      {/* Location Area Picker Modal using MALETE_AREA_GROUPS */}
      {showLocationModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs">
          <div className="bg-[#14161D] border border-[#2A2E3D] rounded-2xl w-full max-w-md p-5 shadow-2xl space-y-4 max-h-[85vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-[#2A2E3D]">
              <div className="flex items-center gap-2">
                <MapPin className="w-5 h-5 text-[#F5A623]" />
                <h3 className="font-heading font-bold text-sm text-[#F5F5F5]">
                  Select Malete Area
                </h3>
              </div>
              <button
                onClick={() => setShowLocationModal(false)}
                className="p-1 text-[#8E95A5] hover:text-[#F5F5F5]"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <p className="text-xs text-[#8E95A5]">
              Filter businesses and services close to your hostel, campus gate, or landmark.
            </p>

            <button
              onClick={() => {
                setSelectedAreaFilter('all');
                setShowLocationModal(false);
              }}
              className={`w-full p-2.5 rounded-xl border text-left text-xs font-semibold transition-colors flex items-center justify-between ${
                selectedAreaFilter === 'all'
                  ? 'bg-[#F5A623]/20 border-[#F5A623] text-[#F5A623]'
                  : 'bg-[#191D26] border-[#2A2E3D] text-[#F5F5F5]'
              }`}
            >
              <span>🌍 All Locations across Malete</span>
              {selectedAreaFilter === 'all' && <CheckCircle2 className="w-4 h-4 text-[#F5A623]" />}
            </button>

            {/* Grouped Malete Areas */}
            <div className="space-y-3 pt-1">
              {MALETE_AREA_GROUPS.map((group) => (
                <div key={group.category} className="space-y-1.5">
                  <div className="text-[11px] font-bold uppercase tracking-wider text-[#8E95A5] flex items-center gap-1.5 px-1">
                    <span>{group.icon}</span>
                    <span>{group.category}</span>
                  </div>
                  <div className="grid grid-cols-1 gap-1">
                    {group.areas.map((area) => {
                      const isSelected = selectedAreaFilter === area.name;
                      return (
                        <button
                          key={area.id}
                          onClick={() => {
                            setSelectedAreaFilter(area.name);
                            setShowLocationModal(false);
                          }}
                          className={`p-2 rounded-lg border text-left text-xs transition-colors flex items-center justify-between ${
                            isSelected
                              ? 'bg-[#F5A623]/20 border-[#F5A623] text-[#F5A623] font-medium'
                              : 'bg-[#191D26] border-[#2A2E3D] text-[#D1D5DB] hover:text-[#F5F5F5] hover:bg-[#1E2330]'
                          }`}
                        >
                          <div>
                            <p className="font-medium">{area.shortName}</p>
                            <p className="text-[10px] text-[#8E95A5] truncate max-w-[280px]">
                              {area.landmark}
                            </p>
                          </div>
                          {isSelected && <CheckCircle2 className="w-4 h-4 text-[#F5A623] shrink-0" />}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

