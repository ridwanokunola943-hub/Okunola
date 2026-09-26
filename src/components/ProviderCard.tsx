import React from 'react';
import { Provider } from '../types';
import { useApp } from '../context/AppContext';
import {
  CheckCircle2,
  Star,
  MapPin,
  Home,
  Truck,
  Heart,
  MessageSquare
} from 'lucide-react';

interface ProviderCardProps {
  provider: Provider;
  onOpenProfile: (provider: Provider) => void;
  onBookNow?: (provider: Provider) => void;
  onOrderNow?: (provider: Provider) => void;
}

export const ProviderCard: React.FC<ProviderCardProps> = ({
  provider,
  onOpenProfile,
  onBookNow,
  onOrderNow
}) => {
  const {
    isSavedProvider,
    toggleSaveProvider,
    setActiveChatRecipientId,
    services,
    products
  } = useApp();

  const saved = isSavedProvider(provider.id);

  // Find lowest price for context
  const providerServices = services.filter((s) => s.providerId === provider.id);
  const providerProducts = products.filter((p) => p.providerId === provider.id);
  const lowestPrice =
    providerServices.length > 0
      ? Math.min(...providerServices.map((s) => s.price))
      : providerProducts.length > 0
      ? Math.min(...providerProducts.map((p) => p.price))
      : null;

  const isFoodOrShop = provider.category === 'Food & Drinks' || provider.category === 'Shops & Products';

  return (
    <div
      id={`provider-card-${provider.id}`}
      className="group bg-[#151720] hover:bg-[#1A1D27] border border-[#252937] hover:border-[#F5A623]/60 rounded-2xl overflow-hidden transition-all flex flex-col justify-between shadow-sm"
    >
      {/* Top Media Banner */}
      <div
        className="relative h-36 sm:h-40 w-full overflow-hidden cursor-pointer bg-[#12141C]"
        onClick={() => onOpenProfile(provider)}
      >
        <img
          src={provider.coverUrl || provider.logoUrl}
          alt={provider.businessName}
          className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-300"
          loading="lazy"
        />

        {/* Favorite & Status Badges */}
        <div className="absolute top-2.5 inset-x-2.5 flex items-center justify-between pointer-events-none">
          {/* Status Badge */}
          <span
            className={`px-2 py-0.5 rounded-full text-[11px] font-semibold backdrop-blur-md ${
              provider.isOpen
                ? 'bg-[#10B981]/20 text-[#10B981] border border-[#10B981]/40'
                : 'bg-[#12141C]/80 text-[#8E95A5] border border-[#262B38]'
            }`}
          >
            {provider.isOpen ? '• Open' : 'Closed'}
          </span>

          {/* Favorite button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              toggleSaveProvider(provider.id);
            }}
            className="pointer-events-auto p-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-white hover:text-rose-400 transition-colors"
            title={saved ? 'Remove from saved' : 'Save business'}
          >
            <Heart className={`w-3.5 h-3.5 ${saved ? 'fill-rose-500 text-rose-500' : ''}`} />
          </button>
        </div>

        {/* Home service tag */}
        <div className="absolute bottom-2 left-2.5 flex items-center gap-1.5 pointer-events-none">
          {provider.homeServiceAvailable && (
            <span className="px-2 py-0.5 rounded-md bg-black/75 backdrop-blur-xs text-white text-[10px] font-medium border border-white/10 flex items-center gap-1">
              <Home className="w-3 h-3 text-[#F5A623]" />
              <span>Home Service</span>
            </span>
          )}
          {provider.deliveryAvailable && (
            <span className="px-2 py-0.5 rounded-md bg-black/75 backdrop-blur-xs text-white text-[10px] font-medium border border-white/10 flex items-center gap-1">
              <Truck className="w-3 h-3 text-emerald-400" />
              <span>Delivery</span>
            </span>
          )}
        </div>
      </div>

      {/* Body Details */}
      <div className="p-3.5 flex-1 flex flex-col justify-between space-y-3">
        <div>
          {/* Header row: Logo, Name, Verification */}
          <div className="flex items-start gap-2.5">
            <img
              src={provider.logoUrl}
              alt={provider.businessName}
              className="w-10 h-10 rounded-xl object-cover border border-[#2B3040] shrink-0"
              onClick={() => onOpenProfile(provider)}
            />

            <div className="flex-1 min-w-0">
              <div
                className="flex items-center gap-1 cursor-pointer"
                onClick={() => onOpenProfile(provider)}
              >
                <h3 className="font-heading font-bold text-sm text-white truncate hover:text-[#F5A623] transition-colors">
                  {provider.businessName}
                </h3>
                {provider.isVerified && (
                  <span title="Verified Provider" className="inline-flex shrink-0">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#F5A623]" />
                  </span>
                )}
              </div>

              {/* Rating & Distance */}
              <div className="flex items-center gap-2 mt-0.5 text-xs text-[#8E95A5]">
                <div className="flex items-center gap-1 text-white font-medium">
                  <Star className="w-3 h-3 fill-[#F5A623] text-[#F5A623]" />
                  <span>{provider.rating.toFixed(1)}</span>
                  <span className="text-[#8E95A5] font-normal">({provider.reviewCount})</span>
                </div>
                <span>•</span>
                <span className="flex items-center gap-0.5 text-[#8E95A5]">
                  <MapPin className="w-3 h-3" />
                  <span>{provider.distanceKm ? `${provider.distanceKm} km` : 'Near you'}</span>
                </span>
              </div>
            </div>
          </div>

          {/* Description snippet */}
          <p className="mt-2 text-xs text-[#9DA4B3] line-clamp-2 leading-relaxed">
            {provider.description}
          </p>

          {/* Category & Pricing Tag */}
          <div className="mt-2.5 flex items-center justify-between text-xs pt-2 border-t border-[#262B38]">
            <span className="px-2 py-0.5 rounded-md bg-[#1C1F2B] text-[#9DA4B3] text-[11px] font-medium border border-[#2B3040]">
              {provider.category}
            </span>

            {lowestPrice !== null && (
              <span className="text-xs text-[#8E95A5]">
                From <strong className="text-white font-semibold">₦{lowestPrice.toLocaleString()}</strong>
              </span>
            )}
          </div>
        </div>

        {/* Actions row */}
        <div className="flex items-center gap-2 pt-1">
          <button
            onClick={() => onOpenProfile(provider)}
            className="flex-1 py-2 px-3 rounded-xl bg-[#1C1F2B] hover:bg-[#252A3A] border border-[#2B3040] text-xs font-semibold text-white transition-colors text-center"
          >
            View Details
          </button>

          {isFoodOrShop ? (
            <button
              onClick={() => (onOrderNow ? onOrderNow(provider) : onOpenProfile(provider))}
              className="py-2 px-3.5 rounded-xl bg-[#F5A623] hover:bg-[#E59819] text-black text-xs font-bold transition-colors shadow-xs"
            >
              Order Now
            </button>
          ) : (
            <button
              onClick={() => (onBookNow ? onBookNow(provider) : onOpenProfile(provider))}
              className="py-2 px-3.5 rounded-xl bg-[#F5A623] hover:bg-[#E59819] text-black text-xs font-bold transition-colors shadow-xs"
            >
              Book Service
            </button>
          )}

          <button
            onClick={() => setActiveChatRecipientId(provider.id)}
            className="p-2 rounded-xl bg-[#1C1F2B] hover:bg-[#252A3A] border border-[#2B3040] text-[#8E95A5] hover:text-white transition-colors"
            title="Chat with business"
          >
            <MessageSquare className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
