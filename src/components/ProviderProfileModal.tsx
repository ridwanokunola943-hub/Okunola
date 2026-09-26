import React, { useState } from 'react';
import { Provider, Service, Product } from '../types';
import { useApp } from '../context/AppContext';
import {
  X,
  Star,
  MapPin,
  Clock,
  Phone,
  MessageSquare,
  Home,
  Truck,
  CheckCircle2,
  Heart,
  Share2,
  AlertTriangle,
  Plus
} from 'lucide-react';

interface ProviderProfileModalProps {
  provider: Provider;
  onClose: () => void;
  onOpenBooking: (service: Service, provider: Provider) => void;
  onOpenOrder: (provider: Provider) => void;
  onOpenReport: (targetType: string, targetId: string, targetName: string) => void;
}

export const ProviderProfileModal: React.FC<ProviderProfileModalProps> = ({
  provider,
  onClose,
  onOpenBooking,
  onOpenOrder,
  onOpenReport
}) => {
  const {
    isFollowing,
    toggleFollowProvider,
    isSavedProvider,
    toggleSaveProvider,
    services,
    products,
    posts,
    reviews,
    addReview,
    setActiveChatRecipientId,
    showToast,
    addToCart
  } = useApp();

  const [activeTab, setActiveTab] = useState<'services' | 'products' | 'posts' | 'reviews' | 'about'>(
    provider.category === 'Food & Drinks' || provider.category === 'Shops & Products' ? 'products' : 'services'
  );

  // Review form state
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [newRating, setNewRating] = useState(5);
  const [newComment, setNewComment] = useState('');

  const following = isFollowing(provider.id);
  const saved = isSavedProvider(provider.id);

  const providerServices = services.filter((s) => s.providerId === provider.id);
  const providerProducts = products.filter((p) => p.providerId === provider.id);
  const providerPosts = posts.filter((p) => p.providerId === provider.id);
  const providerReviews = reviews.filter((r) => r.providerId === provider.id);

  const isFoodOrShop = provider.category === 'Food & Drinks' || provider.category === 'Shops & Products';

  const handleShare = () => {
    if (navigator.share) {
      navigator
        .share({
          title: `${provider.businessName} on Bigridz Local`,
          text: `Check out ${provider.businessName} on Bigridz Local in Malete: ${provider.description}`,
          url: window.location.href
        })
        .catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      showToast('Link copied to clipboard!');
    }
  };

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) {
      showToast('Please write your review comment', 'warning');
      return;
    }
    const success = addReview({
      providerId: provider.id,
      rating: newRating,
      comment: newComment.trim()
    });
    if (success) {
      setNewComment('');
      setShowReviewForm(false);
    }
  };

  return (
    <div
      id="provider-profile-modal"
      className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-xs flex justify-center p-0 sm:p-4"
    >
      <div className="bg-[#0B0B0D] border border-[#29292D] w-full max-w-2xl min-h-screen sm:min-h-0 sm:rounded-xl sm:my-auto overflow-hidden shadow-2xl flex flex-col">
        {/* Cover Media */}
        <div className="relative h-44 sm:h-52 w-full bg-[#141416] shrink-0">
          <img
            src={provider.coverUrl}
            alt={provider.businessName}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B0D] via-transparent to-black/50" />

          {/* Top Actions */}
          <div className="absolute top-3 inset-x-3 flex items-center justify-between">
            <button
              onClick={onClose}
              className="p-2 rounded-lg bg-[#0B0B0D]/80 hover:bg-[#0B0B0D] text-[#F5F5F5] border border-[#29292D] transition-colors"
              aria-label="Close"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-1.5">
              <button
                onClick={() => toggleSaveProvider(provider.id)}
                className="p-2 rounded-lg bg-[#0B0B0D]/80 hover:bg-[#0B0B0D] text-[#F5F5F5] border border-[#29292D] transition-colors"
                title={saved ? 'Remove from saved' : 'Save business'}
              >
                <Heart className={`w-4 h-4 ${saved ? 'fill-rose-500 text-rose-500' : ''}`} />
              </button>
              <button
                onClick={handleShare}
                className="p-2 rounded-lg bg-[#0B0B0D]/80 hover:bg-[#0B0B0D] text-[#F5F5F5] border border-[#29292D] transition-colors"
                title="Share link"
              >
                <Share2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Profile Header Block */}
        <div className="px-4 pb-4 -mt-10 relative z-10 border-b border-[#29292D]">
          <div className="flex items-end justify-between gap-3">
            <img
              src={provider.logoUrl}
              alt={provider.businessName}
              className="w-18 h-18 rounded-xl object-cover border-2 border-[#0B0B0D] bg-[#141416] shadow-lg shrink-0"
            />
            {/* Action Buttons: Follow, Chat, Book/Order */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => toggleFollowProvider(provider.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors ${
                  following
                    ? 'bg-[#19191C] border-[#29292D] text-[#F5F5F5]'
                    : 'bg-[#141416] border-[#29292D] text-[#A1A1AA] hover:text-[#F5F5F5]'
                }`}
              >
                {following ? 'Following' : 'Follow'}
              </button>

              <button
                onClick={() => {
                  setActiveChatRecipientId(provider.id);
                  onClose();
                }}
                className="p-1.5 rounded-lg bg-[#141416] border border-[#29292D] text-[#F5F5F5] hover:bg-[#19191C] transition-colors"
                title="Message provider"
              >
                <MessageSquare className="w-4 h-4" />
              </button>

              {isFoodOrShop ? (
                <button
                  onClick={() => onOpenOrder(provider)}
                  className="px-3.5 py-1.5 rounded-lg bg-[#F5F5F5] text-[#0B0B0D] hover:bg-white text-xs font-semibold transition-colors"
                >
                  Order
                </button>
              ) : providerServices.length > 0 ? (
                <button
                  onClick={() => onOpenBooking(providerServices[0], provider)}
                  className="px-3.5 py-1.5 rounded-lg bg-[#D99A24] text-black hover:bg-[#c4891e] text-xs font-semibold transition-colors"
                >
                  Book Service
                </button>
              ) : null}
            </div>
          </div>

          {/* Name and Badges */}
          <div className="mt-3">
            <div className="flex items-center gap-1.5">
              <h2 className="font-heading font-bold text-lg sm:text-xl text-[#F5F5F5]">
                {provider.businessName}
              </h2>
              {provider.isVerified && (
                <CheckCircle2 className="w-4 h-4 text-[#D99A24] shrink-0" />
              )}
            </div>

            <p className="text-xs text-[#A1A1AA] mt-0.5">{provider.category} • Managed by {provider.ownerName}</p>

            {/* Metrics: Rating, Followers, Location */}
            <div className="flex flex-wrap items-center gap-3 mt-2 text-xs text-[#A1A1AA]">
              <div className="flex items-center gap-1 text-[#F5F5F5] font-semibold">
                <Star className="w-3.5 h-3.5 fill-[#D99A24] text-[#D99A24]" />
                <span>{provider.rating.toFixed(1)}</span>
                <span className="text-[#A1A1AA] font-normal">({provider.reviewCount} reviews)</span>
              </div>
              <span>•</span>
              <span>{provider.followerCount} followers</span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <MapPin className="w-3 h-3 text-[#D99A24]" />
                <span>{provider.location}</span>
              </span>
            </div>

            {/* Badges: Open, Home Service, Delivery */}
            <div className="flex flex-wrap gap-1.5 mt-2.5">
              <span
                className={`px-2 py-0.5 rounded text-[11px] font-medium border ${
                  provider.isOpen
                    ? 'bg-[#10B981]/10 text-[#10B981] border-[#10B981]/30'
                    : 'bg-[#19191C] text-[#A1A1AA] border-[#29292D]'
                }`}
              >
                {provider.isOpen ? 'Open Today' : 'Currently Closed'}
              </span>

              {provider.homeServiceAvailable && (
                <span className="px-2 py-0.5 rounded text-[11px] font-medium bg-[#19191C] text-[#F5F5F5] border border-[#29292D] flex items-center gap-1">
                  <Home className="w-3 h-3 text-[#D99A24]" />
                  <span>Hostel / Home Visits</span>
                </span>
              )}

              {provider.deliveryAvailable && (
                <span className="px-2 py-0.5 rounded text-[11px] font-medium bg-[#19191C] text-[#F5F5F5] border border-[#29292D] flex items-center gap-1">
                  <Truck className="w-3 h-3 text-cyan-400" />
                  <span>Delivery Available</span>
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Navigation Tabs (Section 12: Services | Posts | Reviews | About) */}
        <div className="flex border-b border-[#29292D] px-4 overflow-x-auto scrollbar-none">
          {providerServices.length > 0 && (
            <button
              onClick={() => setActiveTab('services')}
              className={`py-2.5 px-3 text-xs font-medium border-b-2 -mb-[1px] transition-colors ${
                activeTab === 'services'
                  ? 'border-[#F5F5F5] text-[#F5F5F5]'
                  : 'border-transparent text-[#A1A1AA] hover:text-[#F5F5F5]'
              }`}
            >
              Services ({providerServices.length})
            </button>
          )}

          {providerProducts.length > 0 && (
            <button
              onClick={() => setActiveTab('products')}
              className={`py-2.5 px-3 text-xs font-medium border-b-2 -mb-[1px] transition-colors ${
                activeTab === 'products'
                  ? 'border-[#F5F5F5] text-[#F5F5F5]'
                  : 'border-transparent text-[#A1A1AA] hover:text-[#F5F5F5]'
              }`}
            >
              Menu & Items ({providerProducts.length})
            </button>
          )}

          <button
            onClick={() => setActiveTab('posts')}
            className={`py-2.5 px-3 text-xs font-medium border-b-2 -mb-[1px] transition-colors ${
              activeTab === 'posts'
                ? 'border-[#F5F5F5] text-[#F5F5F5]'
                : 'border-transparent text-[#A1A1AA] hover:text-[#F5F5F5]'
            }`}
          >
            Posts ({providerPosts.length})
          </button>

          <button
            onClick={() => setActiveTab('reviews')}
            className={`py-2.5 px-3 text-xs font-medium border-b-2 -mb-[1px] transition-colors ${
              activeTab === 'reviews'
                ? 'border-[#F5F5F5] text-[#F5F5F5]'
                : 'border-transparent text-[#A1A1AA] hover:text-[#F5F5F5]'
            }`}
          >
            Reviews ({providerReviews.length})
          </button>

          <button
            onClick={() => setActiveTab('about')}
            className={`py-2.5 px-3 text-xs font-medium border-b-2 -mb-[1px] transition-colors ${
              activeTab === 'about'
                ? 'border-[#F5F5F5] text-[#F5F5F5]'
                : 'border-transparent text-[#A1A1AA] hover:text-[#F5F5F5]'
            }`}
          >
            About & Contact
          </button>
        </div>

        {/* Tab Contents */}
        <div className="p-4 flex-1 overflow-y-auto space-y-3">
          {/* SERVICES TAB */}
          {activeTab === 'services' && (
            <div className="space-y-2.5">
              {providerServices.map((service) => (
                <div
                  key={service.id}
                  className="p-3 rounded-lg bg-[#141416] border border-[#29292D] flex items-center justify-between gap-3"
                >
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <h4 className="font-semibold text-xs text-[#F5F5F5] truncate">
                        {service.name}
                      </h4>
                      {service.homeService && (
                        <span className="px-1.5 py-0.5 rounded text-[10px] bg-[#19191C] border border-[#29292D] text-[#D99A24]">
                          Home Visit
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-[#A1A1AA] line-clamp-1 mt-0.5">
                      {service.description}
                    </p>
                    <div className="flex items-center gap-3 mt-1 text-[11px] text-[#A1A1AA]">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {service.duration || '45 mins'}
                      </span>
                      <span>•</span>
                      <span className="text-[#F5F5F5] font-semibold">
                        ₦{service.price.toLocaleString()}
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={() => onOpenBooking(service, provider)}
                    className="px-3 py-1.5 rounded-md bg-[#D99A24] text-black text-xs font-semibold hover:bg-[#c4891e] transition-colors shrink-0"
                  >
                    Book Now
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* PRODUCTS / MENU TAB */}
          {activeTab === 'products' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {providerProducts.map((product) => (
                <div
                  key={product.id}
                  className="p-3 rounded-lg bg-[#141416] border border-[#29292D] flex gap-3"
                >
                  {product.imageUrl && (
                    <img
                      src={product.imageUrl}
                      alt={product.name}
                      className="w-16 h-16 rounded-md object-cover border border-[#29292D] shrink-0"
                    />
                  )}
                  <div className="min-w-0 flex-1 flex flex-col justify-between">
                    <div>
                      <h4 className="font-semibold text-xs text-[#F5F5F5] truncate">
                        {product.name}
                      </h4>
                      <p className="text-[11px] text-[#A1A1AA] line-clamp-1 mt-0.5">
                        {product.description}
                      </p>
                      <p className="text-xs font-semibold text-[#F5F5F5] mt-1">
                        ₦{product.price.toLocaleString()}
                      </p>
                    </div>

                    <button
                      onClick={() => {
                        addToCart(product, 1);
                        showToast(`Added ${product.name} to basket`);
                      }}
                      className="mt-2 py-1 px-2.5 rounded-md bg-[#19191C] hover:bg-[#222226] border border-[#29292D] text-xs font-medium text-[#F5F5F5] flex items-center justify-center gap-1"
                    >
                      <Plus className="w-3 h-3" />
                      <span>Add to Basket</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* POSTS TAB */}
          {activeTab === 'posts' && (
            <div className="space-y-3">
              {providerPosts.length === 0 ? (
                <p className="text-xs text-[#A1A1AA] text-center py-6">No recent posts yet.</p>
              ) : (
                providerPosts.map((post) => (
                  <div
                    key={post.id}
                    className="p-3.5 rounded-lg bg-[#141416] border border-[#29292D] space-y-2"
                  >
                    <div className="flex items-center justify-between text-xs text-[#A1A1AA]">
                      <span>{new Date(post.createdAt).toLocaleDateString()}</span>
                      {post.promotionTag && (
                        <span className="px-2 py-0.5 rounded text-[10px] bg-[#19191C] border border-[#29292D] text-[#D99A24]">
                          {post.promotionTag}
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-[#F5F5F5] leading-relaxed">{post.content}</p>
                    {post.imageUrl && (
                      <img
                        src={post.imageUrl}
                        alt="Post media"
                        className="w-full h-48 object-cover rounded-md border border-[#29292D]"
                      />
                    )}
                    {post.price && (
                      <p className="text-xs font-semibold text-[#D99A24]">
                        Price: ₦{post.price.toLocaleString()}
                      </p>
                    )}
                  </div>
                ))
              )}
            </div>
          )}

          {/* REVIEWS TAB */}
          {activeTab === 'reviews' && (
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 rounded-lg bg-[#141416] border border-[#29292D]">
                <div>
                  <div className="flex items-center gap-1.5 text-[#F5F5F5] font-semibold text-sm">
                    <Star className="w-4 h-4 fill-[#D99A24] text-[#D99A24]" />
                    <span>{provider.rating.toFixed(1)} out of 5</span>
                  </div>
                  <p className="text-xs text-[#A1A1AA] mt-0.5">
                    Based on {provider.reviewCount} customer reviews
                  </p>
                </div>
                <button
                  onClick={() => setShowReviewForm(!showReviewForm)}
                  className="px-3 py-1.5 rounded-md bg-[#19191C] border border-[#29292D] text-xs font-medium text-[#F5F5F5]"
                >
                  Write Review
                </button>
              </div>

              {/* Review Input Form */}
              {showReviewForm && (
                <form
                  onSubmit={handleSubmitReview}
                  className="p-3.5 rounded-lg bg-[#141416] border border-[#29292D] space-y-3"
                >
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-[#A1A1AA]">Rating:</span>
                    <div className="flex gap-1">
                      {[1, 2, 3, 4, 5].map((s) => (
                        <button
                          key={s}
                          type="button"
                          onClick={() => setNewRating(s)}
                          className="p-1"
                        >
                          <Star
                            className={`w-4 h-4 ${
                              s <= newRating
                                ? 'fill-[#D99A24] text-[#D99A24]'
                                : 'text-[#29292D]'
                            }`}
                          />
                        </button>
                      ))}
                    </div>
                  </div>

                  <textarea
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder="Share your experience with this provider in Malete..."
                    rows={3}
                    className="w-full p-2.5 rounded-md bg-[#0B0B0D] border border-[#29292D] text-xs text-[#F5F5F5] focus:border-[#3F3F46]"
                  />

                  <div className="flex justify-end gap-2">
                    <button
                      type="button"
                      onClick={() => setShowReviewForm(false)}
                      className="px-3 py-1 text-xs text-[#A1A1AA]"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-3 py-1.5 rounded-md bg-[#F5F5F5] text-[#0B0B0D] text-xs font-semibold"
                    >
                      Submit Review
                    </button>
                  </div>
                </form>
              )}

              {/* Review list */}
              {providerReviews.map((rev) => (
                <div
                  key={rev.id}
                  className="p-3 rounded-lg bg-[#141416] border border-[#29292D] space-y-1.5"
                >
                  <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-1.5 font-medium text-[#F5F5F5]">
                      <span>{rev.customerName}</span>
                      {rev.transactionId && (
                        <span className="text-[10px] text-[#10B981]">✓ Verified Booking</span>
                      )}
                    </div>
                    <span className="text-[11px] text-[#A1A1AA]">
                      {new Date(rev.createdAt).toLocaleDateString()}
                    </span>
                  </div>

                  <div className="flex gap-0.5">
                    {Array.from({ length: 5 }).map((_, idx) => (
                      <Star
                        key={idx}
                        className={`w-3 h-3 ${
                          idx < rev.rating
                            ? 'fill-[#D99A24] text-[#D99A24]'
                            : 'text-[#29292D]'
                        }`}
                      />
                    ))}
                  </div>

                  <p className="text-xs text-[#A1A1AA] leading-relaxed">{rev.comment}</p>
                </div>
              ))}
            </div>
          )}

          {/* ABOUT TAB */}
          {activeTab === 'about' && (
            <div className="space-y-3 text-xs text-[#A1A1AA]">
              <div className="p-3.5 rounded-lg bg-[#141416] border border-[#29292D] space-y-2">
                <h4 className="font-semibold text-xs text-[#F5F5F5]">Business Overview</h4>
                <p className="leading-relaxed">{provider.description}</p>
              </div>

              <div className="p-3.5 rounded-lg bg-[#141416] border border-[#29292D] space-y-2">
                <h4 className="font-semibold text-xs text-[#F5F5F5]">Location & Hours</h4>
                <div className="space-y-1.5">
                  <div className="flex items-start gap-2">
                    <MapPin className="w-3.5 h-3.5 text-[#D99A24] shrink-0 mt-0.5" />
                    <span>{provider.address || provider.location}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-3.5 h-3.5 text-[#A1A1AA] shrink-0" />
                    <span>{provider.openingHours}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="w-3.5 h-3.5 text-[#A1A1AA] shrink-0" />
                    <a href={`tel:${provider.phone}`} className="text-[#F5F5F5] hover:underline">
                      {provider.phone}
                    </a>
                  </div>
                </div>
              </div>

              {/* Report button */}
              <div className="pt-2 flex justify-end">
                <button
                  onClick={() => onOpenReport('provider', provider.id, provider.businessName)}
                  className="flex items-center gap-1.5 text-xs text-[#A1A1AA] hover:text-rose-400 transition-colors"
                >
                  <AlertTriangle className="w-3.5 h-3.5" />
                  <span>Report this business</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
