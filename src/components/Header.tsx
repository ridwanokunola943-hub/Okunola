import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  MapPin,
  Search,
  ShoppingBag,
  Bell,
  Shield,
  Briefcase,
  ChevronDown,
  Compass,
  X,
  LogIn,
  Check
} from 'lucide-react';
import { MALETE_LOCATIONS, MALETE_AREA_GROUPS, POPULAR_MALETE_LOCATIONS } from '../data/mockData';

interface HeaderProps {
  onOpenSearch: () => void;
  onOpenCart: () => void;
  onOpenNotifications: () => void;
  onOpenAuth: () => void;
  activeView: string;
  setActiveView: (view: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenSearch,
  onOpenCart,
  onOpenNotifications,
  onOpenAuth,
  activeView,
  setActiveView
}) => {
  const {
    currentUser,
    currentLocation,
    setCurrentLocation,
    requestGeolocation,
    cart,
    notifications,
    showToast
  } = useApp();

  const [isLocationModalOpen, setIsLocationModalOpen] = useState(false);
  const [isLocating, setIsLocating] = useState(false);
  const [locationSearchQuery, setLocationSearchQuery] = useState('');
  const [locationCategoryFilter, setLocationCategoryFilter] = useState<'All' | string>('All');

  const unreadCount = notifications.filter((n) => !n.read).length;
  const cartItemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const handleUseGPS = async () => {
    setIsLocating(true);
    await requestGeolocation();
    setIsLocating(false);
    setIsLocationModalOpen(false);
  };

  return (
    <>
      <header id="bigridz-header" className="sticky top-0 z-40 bg-[#0B0B0D]/95 backdrop-blur-md border-b border-[#29292D] px-4 py-2.5">
        <div className="max-w-6xl mx-auto flex items-center justify-between gap-3">
          {/* Brand & Location */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setActiveView('home')}
              className="flex items-center gap-2.5 text-left transition-opacity hover:opacity-90"
            >
              <div className="w-8 h-8 rounded-lg bg-[#F5A623] flex items-center justify-center text-black font-bold text-sm shadow-xs">
                M
              </div>
              <div className="flex items-baseline gap-1">
                <span className="font-heading font-bold text-base tracking-tight text-[#F5F5F5]">
                  Malete<span className="text-[#F5A623]">Connect</span>
                </span>
              </div>
            </button>

            {/* Subtle Divider */}
            <div className="hidden sm:block w-[1px] h-4 bg-[#29292D]" />

            {/* Location selector */}
            <button
              id="location-selector-btn"
              onClick={() => setIsLocationModalOpen(true)}
              className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#141416] border border-[#29292D] hover:border-[#3F3F46] text-[#A1A1AA] hover:text-[#F5F5F5] text-xs transition-colors"
            >
              <MapPin className="w-3.5 h-3.5 text-[#D99A24] shrink-0" />
              <span className="truncate max-w-[120px] sm:max-w-[170px] text-[#F5F5F5]">
                {currentLocation.replace('Malete - ', '')}
              </span>
              <ChevronDown className="w-3 h-3 text-[#A1A1AA]" />
            </button>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1">
            <button
              onClick={() => setActiveView('home')}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
                activeView === 'home'
                  ? 'text-[#F5F5F5] bg-[#19191C]'
                  : 'text-[#A1A1AA] hover:text-[#F5F5F5]'
              }`}
            >
              Home
            </button>
            <button
              onClick={() => setActiveView('discover')}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
                activeView === 'discover'
                  ? 'text-[#F5F5F5] bg-[#19191C]'
                  : 'text-[#A1A1AA] hover:text-[#F5F5F5]'
              }`}
            >
              Discover
            </button>
            <button
              onClick={() => setActiveView('feed')}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
                activeView === 'feed'
                  ? 'text-[#F5F5F5] bg-[#19191C]'
                  : 'text-[#A1A1AA] hover:text-[#F5F5F5]'
              }`}
            >
              Community
            </button>
            <button
              onClick={() => setActiveView('chat')}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
                activeView === 'chat'
                  ? 'text-[#F5F5F5] bg-[#19191C]'
                  : 'text-[#A1A1AA] hover:text-[#F5F5F5]'
              }`}
            >
              Messages
            </button>
          </nav>

          {/* Actions: Search, Cart, Notifs, Admin, Profile */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            <button
              id="header-search-btn"
              onClick={onOpenSearch}
              className="p-2 rounded-lg bg-[#141416] border border-[#29292D] text-[#A1A1AA] hover:text-[#F5F5F5] hover:border-[#3F3F46] transition-colors"
              aria-label="Search"
              title="Search services"
            >
              <Search className="w-4 h-4" />
            </button>

            {/* Cart Button */}
            <button
              id="header-cart-btn"
              onClick={onOpenCart}
              className="relative p-2 rounded-lg bg-[#141416] border border-[#29292D] text-[#A1A1AA] hover:text-[#F5F5F5] hover:border-[#3F3F46] transition-colors"
              aria-label="Order Cart"
              title="Cart & Orders"
            >
              <ShoppingBag className="w-4 h-4" />
              {cartItemCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#D99A24] text-black text-[10px] font-bold flex items-center justify-center">
                  {cartItemCount}
                </span>
              )}
            </button>

            {/* Notifications */}
            <button
              id="header-notif-btn"
              onClick={onOpenNotifications}
              className="relative p-2 rounded-lg bg-[#141416] border border-[#29292D] text-[#A1A1AA] hover:text-[#F5F5F5] hover:border-[#3F3F46] transition-colors"
              aria-label="Notifications"
            >
              <Bell className="w-4 h-4" />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full bg-rose-500 text-white text-[9px] font-bold flex items-center justify-center">
                  {unreadCount}
                </span>
              )}
            </button>

            {/* Provider or Admin shortcuts */}
            {currentUser?.accountType === 'admin' ? (
              <button
                id="header-admin-toggle-btn"
                onClick={() => setActiveView(activeView === 'admin' ? 'home' : 'admin')}
                className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium border transition-colors ${
                  activeView === 'admin'
                    ? 'bg-[#F5F5F5] text-[#0B0B0D] border-[#F5F5F5]'
                    : 'bg-[#141416] border-[#29292D] text-[#A1A1AA] hover:text-[#F5F5F5]'
                }`}
                title="Admin Console"
              >
                <Shield className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Admin</span>
              </button>
            ) : currentUser?.accountType === 'provider' ? (
              <button
                id="header-provider-toggle-btn"
                onClick={() =>
                  setActiveView(activeView === 'provider-dashboard' ? 'home' : 'provider-dashboard')
                }
                className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium border transition-colors ${
                  activeView === 'provider-dashboard'
                    ? 'bg-[#F5F5F5] text-[#0B0B0D] border-[#F5F5F5]'
                    : 'bg-[#141416] border-[#29292D] text-[#A1A1AA] hover:text-[#F5F5F5]'
                }`}
                title="Provider Dashboard"
              >
                <Briefcase className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Hub</span>
              </button>
            ) : null}

            {/* User Profile / Login */}
            {currentUser ? (
              <button
                id="header-profile-btn"
                onClick={() => setActiveView('profile')}
                className="flex items-center gap-2 p-1 pl-1.5 pr-2 rounded-lg bg-[#141416] border border-[#29292D] hover:border-[#3F3F46] transition-colors"
              >
                {currentUser.photoURL ? (
                  <img
                    src={currentUser.photoURL}
                    alt={currentUser.fullName}
                    className="w-6 h-6 rounded-md object-cover"
                  />
                ) : (
                  <div className="w-6 h-6 rounded-md bg-[#29292D] flex items-center justify-center text-xs font-semibold text-[#F5F5F5]">
                    {currentUser.fullName.charAt(0)}
                  </div>
                )}
                <span className="text-xs font-medium text-[#F5F5F5] hidden sm:inline max-w-[85px] truncate">
                  {currentUser.fullName.split(' ')[0]}
                </span>
              </button>
            ) : (
              <button
                id="header-login-btn"
                onClick={onOpenAuth}
                className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-[#F5F5F5] text-[#0B0B0D] hover:bg-white text-xs font-medium transition-colors"
              >
                <LogIn className="w-3.5 h-3.5" />
                <span>Sign In</span>
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Location Modal */}
      {isLocationModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-xs animate-in zoom-in-95 duration-150">
          <div className="bg-[#141416] border border-[#29292D] rounded-2xl w-full max-w-lg p-5 shadow-2xl space-y-3.5 max-h-[90vh] flex flex-col">
            <div className="flex items-center justify-between pb-2.5 border-b border-[#29292D]">
              <div className="flex items-center gap-2">
                <div className="p-1.5 rounded-lg bg-[#D99A24]/10 text-[#D99A24]">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-heading font-semibold text-sm text-[#F5F5F5]">
                    Select Your Malete Location
                  </h3>
                  <p className="text-[11px] text-[#A1A1AA]">
                    Choose your hostel area or campus zone for localized delivery & accurate distance
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsLocationModalOpen(false)}
                className="p-1.5 rounded-lg text-[#A1A1AA] hover:text-[#F5F5F5] hover:bg-[#19191C]"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* GPS Auto-detect Button */}
            <div className="flex items-center gap-2">
              <button
                onClick={handleUseGPS}
                disabled={isLocating}
                className="flex-1 py-2 px-3 rounded-xl bg-[#19191C] border border-[#29292D] hover:border-[#3F3F46] text-xs text-[#F5F5F5] flex items-center justify-center gap-2 transition-colors"
              >
                <Compass className={`w-3.5 h-3.5 text-[#D99A24] ${isLocating ? 'animate-spin' : ''}`} />
                <span>{isLocating ? 'Acquiring Malete coordinates...' : 'Auto-detect via GPS'}</span>
              </button>
            </div>

            {/* Live Search Input */}
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-[#A1A1AA] absolute left-3 top-3" />
              <input
                type="text"
                value={locationSearchQuery}
                onChange={(e) => setLocationSearchQuery(e.target.value)}
                placeholder="Search by hostel name, area, gate or landmark (e.g. Safari, Tipper, Mass Comm)..."
                className="w-full h-9 pl-9 pr-8 rounded-xl bg-[#0B0B0D] border border-[#29292D] text-xs text-[#F5F5F5] placeholder-[#71717A] focus:border-[#3F3F46] outline-hidden"
              />
              {locationSearchQuery && (
                <button
                  onClick={() => setLocationSearchQuery('')}
                  className="absolute right-2.5 top-2.5 text-[#A1A1AA] hover:text-[#F5F5F5]"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Category Filter Pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar text-xs">
              {['All', 'Hostel Zones & Lodges', 'Campus & Gates', 'Commercial & Junctions', 'Arterial & Residential'].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setLocationCategoryFilter(cat)}
                  className={`px-2.5 py-1 rounded-lg text-[11px] font-medium whitespace-nowrap transition-colors ${
                    locationCategoryFilter === cat
                      ? 'bg-[#F5F5F5] text-[#0B0B0D]'
                      : 'bg-[#19191C] text-[#A1A1AA] hover:text-[#F5F5F5] border border-[#29292D]'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Malete Locations List */}
            <div className="space-y-3 overflow-y-auto flex-1 pr-1 max-h-72">
              {MALETE_AREA_GROUPS
                .filter((grp) => locationCategoryFilter === 'All' || grp.category === locationCategoryFilter)
                .map((grp) => {
                  const matchingAreas = grp.areas.filter((area) => {
                    if (!locationSearchQuery.trim()) return true;
                    const q = locationSearchQuery.toLowerCase();
                    return (
                      area.name.toLowerCase().includes(q) ||
                      area.shortName.toLowerCase().includes(q) ||
                      area.landmark.toLowerCase().includes(q)
                    );
                  });

                  if (matchingAreas.length === 0) return null;

                  return (
                    <div key={grp.category} className="space-y-1">
                      <div className="flex items-center gap-1.5 text-[11px] font-semibold text-[#D99A24] px-1 sticky top-0 bg-[#141416]/95 py-0.5 z-10 backdrop-blur-xs">
                        <span>{grp.icon}</span>
                        <span>{grp.category}</span>
                        <span className="text-[#A1A1AA] text-[10px] font-normal">
                          ({matchingAreas.length})
                        </span>
                      </div>
                      <div className="grid grid-cols-1 gap-1">
                        {matchingAreas.map((area) => {
                          const isSelected = currentLocation === area.name;
                          return (
                            <button
                              key={area.id}
                              onClick={() => {
                                setCurrentLocation(area.name);
                                setIsLocationModalOpen(false);
                                showToast(`Location updated: ${area.shortName}`);
                              }}
                              className={`w-full text-left px-3 py-2 rounded-xl text-xs flex items-center justify-between transition-all ${
                                isSelected
                                  ? 'bg-[#19191C] border border-[#D99A24]/40 text-[#F5F5F5]'
                                  : 'hover:bg-[#19191C]/70 text-[#A1A1AA] hover:text-[#F5F5F5]'
                              }`}
                            >
                              <div>
                                <div className="font-medium text-[#F5F5F5] flex items-center gap-1.5">
                                  <span>{area.shortName}</span>
                                  {area.popular && (
                                    <span className="text-[9px] px-1.5 py-0.2 rounded-sm bg-[#D99A24]/10 text-[#D99A24] font-normal">
                                      Hot
                                    </span>
                                  )}
                                </div>
                                <p className="text-[10px] text-[#71717A] mt-0.5 line-clamp-1">
                                  {area.landmark}
                                </p>
                              </div>
                              {isSelected && (
                                <div className="w-5 h-5 rounded-full bg-[#D99A24]/20 flex items-center justify-center shrink-0">
                                  <Check className="w-3 h-3 text-[#D99A24]" />
                                </div>
                              )}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
            </div>

            <div className="pt-2 border-t border-[#29292D] flex items-center justify-between text-xs">
              <span className="text-[11px] text-[#A1A1AA]">
                Current: <strong className="text-[#F5F5F5]">{currentLocation.replace('Malete - ', '')}</strong>
              </span>
              <button
                onClick={() => setIsLocationModalOpen(false)}
                className="px-3.5 py-1.5 rounded-lg bg-[#F5F5F5] text-[#0B0B0D] font-medium text-xs hover:bg-white transition-colors"
              >
                Confirm Location
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
