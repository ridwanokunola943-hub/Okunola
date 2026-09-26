import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Service, Product } from '../types';
import {
  Briefcase,
  Calendar,
  ShoppingBag,
  Plus,
  Trash2,
  CheckCircle2,
  Clock,
  Home,
  Star,
  Settings,
  ArrowLeft,
  DollarSign,
  Eye,
  Megaphone
} from 'lucide-react';

interface ProviderDashboardProps {
  onBackToHome: () => void;
}

export const ProviderDashboard: React.FC<ProviderDashboardProps> = ({ onBackToHome }) => {
  const {
    currentUser,
    providers,
    services,
    products,
    orders,
    bookings,
    posts,
    createService,
    deleteService,
    createProduct,
    deleteProduct,
    updateOrderStatus,
    updateBookingStatus,
    createPost,
    showToast
  } = useApp();

  const [activeTab, setActiveTab] = useState<
    'overview' | 'bookings' | 'orders' | 'services' | 'products' | 'posts' | 'analytics' | 'settings'
  >('overview');

  // Find provider matching currentUser or fallback
  const myProvider =
    providers.find(
      (p) => p.id === currentUser?.providerId || p.ownerId === currentUser?.id
    ) || providers[0];

  const myServices = services.filter((s) => s.providerId === myProvider?.id);
  const myProducts = products.filter((p) => p.providerId === myProvider?.id);
  const myOrders = orders.filter((o) => o.providerId === myProvider?.id);
  const myBookings = bookings.filter((b) => b.providerId === myProvider?.id);
  const myPosts = posts.filter((p) => p.providerId === myProvider?.id);

  // Forms
  const [showAddService, setShowAddService] = useState(false);
  const [srvName, setSrvName] = useState('');
  const [srvDesc, setSrvDesc] = useState('');
  const [srvPrice, setSrvPrice] = useState('2500');
  const [srvHome, setSrvHome] = useState(true);

  const [showAddProduct, setShowAddProduct] = useState(false);
  const [prodName, setProdName] = useState('');
  const [prodDesc, setProdDesc] = useState('');
  const [prodPrice, setProdPrice] = useState('1800');

  const [showAddPost, setShowAddPost] = useState(false);
  const [postContent, setPostContent] = useState('');
  const [postTag, setPostTag] = useState('');

  // Metrics
  const pendingOrdersCount = myOrders.filter((o) => o.status === 'pending').length;
  const pendingBookingsCount = myBookings.filter((b) => b.status === 'requested').length;

  const totalRevenue =
    myOrders
      .filter((o) => o.status === 'completed')
      .reduce((sum, o) => sum + o.totalAmount, 0) +
    myBookings
      .filter((b) => b.status === 'completed')
      .reduce((sum, b) => sum + b.price, 0);

  const handleCreateService = (e: React.FormEvent) => {
    e.preventDefault();
    if (!srvName.trim()) return;
    createService({
      providerId: myProvider.id,
      name: srvName.trim(),
      description: srvDesc.trim(),
      price: Number(srvPrice) || 1000,
      homeService: srvHome
    });
    setSrvName('');
    setSrvDesc('');
    setShowAddService(false);
  };

  const handleCreateProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!prodName.trim()) return;
    createProduct({
      providerId: myProvider.id,
      name: prodName.trim(),
      description: prodDesc.trim(),
      price: Number(prodPrice) || 1000,
      isAvailable: true
    });
    setProdName('');
    setProdDesc('');
    setShowAddProduct(false);
  };

  const handleCreatePost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!postContent.trim()) return;
    createPost({
      providerId: myProvider.id,
      providerName: myProvider.businessName,
      providerLogo: myProvider.logoUrl,
      content: postContent.trim(),
      promotionTag: postTag.trim() || undefined,
      location: myProvider.location
    });
    setPostContent('');
    setShowAddPost(false);
  };

  return (
    <div id="bigridz-provider-dashboard" className="pb-24 pt-3 px-4 max-w-5xl mx-auto space-y-4">
      {/* Top Bar */}
      <div className="flex items-center justify-between gap-3 border-b border-[#29292D] pb-3">
        <div className="flex items-center gap-3">
          <button
            onClick={onBackToHome}
            className="p-1.5 rounded-md bg-[#141416] border border-[#29292D] text-[#A1A1AA] hover:text-[#F5F5F5] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-heading font-bold text-lg text-[#F5F5F5]">
                {myProvider.businessName}
              </h1>
              {myProvider.isVerified && (
                <CheckCircle2 className="w-3.5 h-3.5 text-[#D99A24]" />
              )}
            </div>
            <p className="text-xs text-[#A1A1AA]">
              {myProvider.category} • Malete Hub
            </p>
          </div>
        </div>

        <button
          onClick={onBackToHome}
          className="text-xs text-[#A1A1AA] hover:text-[#F5F5F5] font-medium"
        >
          Exit to App
        </button>
      </div>

      {/* Tabs Navigation (Section 17: Overview | Bookings | Orders | Services | Products | Posts | Analytics | Settings) */}
      <div className="flex border-b border-[#29292D] overflow-x-auto scrollbar-none">
        {(
          [
            'overview',
            'bookings',
            'orders',
            'services',
            'products',
            'posts',
            'analytics',
            'settings'
          ] as const
        ).map((tab) => {
          const isSelected = activeTab === tab;
          const labels = {
            overview: 'Overview',
            bookings: `Bookings ${pendingBookingsCount > 0 ? `(${pendingBookingsCount})` : ''}`,
            orders: `Orders ${pendingOrdersCount > 0 ? `(${pendingOrdersCount})` : ''}`,
            services: `Services (${myServices.length})`,
            products: `Products (${myProducts.length})`,
            posts: `Posts (${myPosts.length})`,
            analytics: 'Analytics',
            settings: 'Settings'
          };

          return (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`py-2 px-3 text-xs font-medium border-b-2 -mb-[1px] transition-colors whitespace-nowrap ${
                isSelected
                  ? 'border-[#F5F5F5] text-[#F5F5F5]'
                  : 'border-transparent text-[#A1A1AA] hover:text-[#F5F5F5]'
              }`}
            >
              {labels[tab]}
            </button>
          );
        })}
      </div>

      {/* OVERVIEW TAB */}
      {activeTab === 'overview' && (
        <div className="space-y-4">
          {/* Key Metrics: Today's revenue | New bookings | Pending orders | Profile views */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            <div className="p-3.5 rounded-lg bg-[#141416] border border-[#29292D]">
              <span className="text-[11px] text-[#A1A1AA] block">Total Revenue</span>
              <span className="text-xl font-bold text-[#F5F5F5] block mt-1">
                ₦{totalRevenue.toLocaleString()}
              </span>
            </div>

            <div className="p-3.5 rounded-lg bg-[#141416] border border-[#29292D]">
              <span className="text-[11px] text-[#A1A1AA] block">New Bookings</span>
              <span
                className={`text-xl font-bold block mt-1 ${
                  pendingBookingsCount > 0 ? 'text-[#D99A24]' : 'text-[#F5F5F5]'
                }`}
              >
                {pendingBookingsCount}
              </span>
            </div>

            <div className="p-3.5 rounded-lg bg-[#141416] border border-[#29292D]">
              <span className="text-[11px] text-[#A1A1AA] block">Pending Orders</span>
              <span
                className={`text-xl font-bold block mt-1 ${
                  pendingOrdersCount > 0 ? 'text-[#D99A24]' : 'text-[#F5F5F5]'
                }`}
              >
                {pendingOrdersCount}
              </span>
            </div>

            <div className="p-3.5 rounded-lg bg-[#141416] border border-[#29292D]">
              <span className="text-[11px] text-[#A1A1AA] block">Profile Views</span>
              <span className="text-xl font-bold text-[#F5F5F5] block mt-1">428</span>
            </div>
          </div>

          {/* Quick actions (Section 17: Add Service | Add Product | Create Post | Update Availability) */}
          <div className="p-3.5 rounded-xl bg-[#141416] border border-[#29292D] space-y-2">
            <h3 className="text-xs font-semibold text-[#A1A1AA] uppercase tracking-wider">
              Quick Actions
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              <button
                onClick={() => {
                  setActiveTab('services');
                  setShowAddService(true);
                }}
                className="p-2.5 rounded-lg bg-[#19191C] border border-[#29292D] text-xs text-left hover:border-[#3F3F46] text-[#F5F5F5] flex items-center gap-2"
              >
                <Plus className="w-3.5 h-3.5 text-[#D99A24]" />
                <span>Add Service</span>
              </button>

              <button
                onClick={() => {
                  setActiveTab('products');
                  setShowAddProduct(true);
                }}
                className="p-2.5 rounded-lg bg-[#19191C] border border-[#29292D] text-xs text-left hover:border-[#3F3F46] text-[#F5F5F5] flex items-center gap-2"
              >
                <Plus className="w-3.5 h-3.5 text-cyan-400" />
                <span>Add Product</span>
              </button>

              <button
                onClick={() => {
                  setActiveTab('posts');
                  setShowAddPost(true);
                }}
                className="p-2.5 rounded-lg bg-[#19191C] border border-[#29292D] text-xs text-left hover:border-[#3F3F46] text-[#F5F5F5] flex items-center gap-2"
              >
                <Megaphone className="w-3.5 h-3.5 text-amber-400" />
                <span>Create Post</span>
              </button>

              <button
                onClick={() => {
                  showToast(
                    myProvider.isOpen
                      ? 'Marked business as closed for today'
                      : 'Marked business as open'
                  );
                }}
                className="p-2.5 rounded-lg bg-[#19191C] border border-[#29292D] text-xs text-left hover:border-[#3F3F46] text-[#F5F5F5] flex items-center gap-2"
              >
                <Clock className="w-3.5 h-3.5 text-[#10B981]" />
                <span>Toggle Status ({myProvider.isOpen ? 'Open' : 'Closed'})</span>
              </button>
            </div>
          </div>

          {/* Pending items preview */}
          <div className="space-y-3">
            {pendingBookingsCount > 0 && (
              <div className="p-3.5 rounded-xl bg-[#141416] border border-[#29292D] space-y-2">
                <h4 className="font-semibold text-xs text-[#D99A24]">
                  Bookings Requiring Your Attention
                </h4>
                {myBookings
                  .filter((b) => b.status === 'requested')
                  .map((bk) => (
                    <div
                      key={bk.id}
                      className="p-3 rounded-lg bg-[#19191C] border border-[#29292D] flex items-center justify-between text-xs"
                    >
                      <div>
                        <span className="font-semibold text-[#F5F5F5]">{bk.serviceName}</span>
                        <p className="text-[11px] text-[#A1A1AA]">
                          {bk.date} at {bk.time} • {bk.isHomeService ? 'Hostel visit' : 'In-shop'}
                        </p>
                      </div>
                      <div className="flex gap-1.5">
                        <button
                          onClick={() => updateBookingStatus(bk.id, 'confirmed')}
                          className="px-2.5 py-1 rounded bg-[#10B981] text-black text-xs font-semibold"
                        >
                          Accept
                        </button>
                        <button
                          onClick={() => updateBookingStatus(bk.id, 'cancelled')}
                          className="px-2.5 py-1 rounded bg-[#141416] border border-[#29292D] text-rose-400 text-xs"
                        >
                          Decline
                        </button>
                      </div>
                    </div>
                  ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* BOOKINGS TAB */}
      {activeTab === 'bookings' && (
        <div className="space-y-3">
          <h3 className="font-semibold text-xs text-[#F5F5F5]">Customer Appointments & Bookings</h3>
          {myBookings.length === 0 ? (
            <div className="p-8 rounded-xl bg-[#141416] border border-[#29292D] text-center text-xs text-[#A1A1AA]">
              No bookings yet.
            </div>
          ) : (
            <div className="space-y-2">
              {myBookings.map((bk) => (
                <div
                  key={bk.id}
                  className="p-3.5 rounded-xl bg-[#141416] border border-[#29292D] space-y-2 text-xs"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-[#F5F5F5]">{bk.serviceName}</span>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-[#19191C] border border-[#29292D] text-[#A1A1AA]">
                      Status: {bk.status}
                    </span>
                  </div>

                  <div className="text-[11px] text-[#A1A1AA] space-y-0.5">
                    <p>Date: <strong className="text-[#F5F5F5]">{bk.date} at {bk.time}</strong></p>
                    <p>Type: {bk.isHomeService ? `Home Visit (${bk.locationAddress})` : 'At Your Shop'}</p>
                    <p>Price: <strong className="text-[#F5F5F5]">₦{bk.price.toLocaleString()}</strong></p>
                  </div>

                  <div className="pt-2 border-t border-[#29292D] flex items-center justify-end gap-2">
                    {bk.status === 'requested' && (
                      <button
                        onClick={() => updateBookingStatus(bk.id, 'confirmed')}
                        className="px-3 py-1 rounded bg-[#10B981] text-black font-semibold text-xs"
                      >
                        Confirm Booking
                      </button>
                    )}
                    {bk.status === 'confirmed' && (
                      <button
                        onClick={() => updateBookingStatus(bk.id, 'completed')}
                        className="px-3 py-1 rounded bg-[#F5F5F5] text-[#0B0B0D] font-semibold text-xs"
                      >
                        Mark Completed
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* ORDERS TAB */}
      {activeTab === 'orders' && (
        <div className="space-y-3">
          <h3 className="font-semibold text-xs text-[#F5F5F5]">Product & Food Orders</h3>
          {myOrders.length === 0 ? (
            <div className="p-8 rounded-xl bg-[#141416] border border-[#29292D] text-center text-xs text-[#A1A1AA]">
              No customer orders received yet.
            </div>
          ) : (
            <div className="space-y-2">
              {myOrders.map((ord) => (
                <div
                  key={ord.id}
                  className="p-3.5 rounded-xl bg-[#141416] border border-[#29292D] space-y-2 text-xs"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-[#F5F5F5]">Order #{ord.id.slice(-4)}</span>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-[#19191C] border border-[#29292D] text-[#A1A1AA]">
                      {ord.status}
                    </span>
                  </div>

                  <div className="text-[11px] text-[#A1A1AA]">
                    {ord.items.map((it, i) => (
                      <span key={i}>
                        {it.quantity}x {it.name}
                        {i < ord.items.length - 1 ? ', ' : ''}
                      </span>
                    ))}
                    <p className="mt-1">
                      Deliver to: <strong className="text-[#F5F5F5]">{ord.deliveryAddress}</strong>
                    </p>
                  </div>

                  <div className="pt-2 border-t border-[#29292D] flex items-center justify-between">
                    <span className="font-semibold text-[#F5F5F5]">₦{ord.totalAmount.toLocaleString()}</span>
                    <div className="flex gap-1.5">
                      {ord.status === 'pending' && (
                        <button
                          onClick={() => updateOrderStatus(ord.id, 'accepted')}
                          className="px-3 py-1 rounded bg-[#10B981] text-black font-semibold text-xs"
                        >
                          Accept Order
                        </button>
                      )}
                      {ord.status === 'accepted' && (
                        <button
                          onClick={() => updateOrderStatus(ord.id, 'out_for_delivery')}
                          className="px-3 py-1 rounded bg-blue-500 text-white font-semibold text-xs"
                        >
                          Out for Delivery
                        </button>
                      )}
                      {ord.status === 'out_for_delivery' && (
                        <button
                          onClick={() => updateOrderStatus(ord.id, 'completed')}
                          className="px-3 py-1 rounded bg-[#F5F5F5] text-[#0B0B0D] font-semibold text-xs"
                        >
                          Delivered
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* SERVICES TAB */}
      {activeTab === 'services' && (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-xs text-[#F5F5F5]">Service Catalog</h3>
            <button
              onClick={() => setShowAddService(!showAddService)}
              className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-[#F5F5F5] text-[#0B0B0D] text-xs font-semibold"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>New Service</span>
            </button>
          </div>

          {showAddService && (
            <form
              onSubmit={handleCreateService}
              className="p-3.5 rounded-xl bg-[#141416] border border-[#29292D] space-y-3 text-xs"
            >
              <div>
                <label className="text-[11px] text-[#A1A1AA] block mb-1">Service Title</label>
                <input
                  type="text"
                  required
                  value={srvName}
                  onChange={(e) => setSrvName(e.target.value)}
                  placeholder="e.g. Skin Fade Haircut"
                  className="w-full h-8 px-2.5 rounded-md bg-[#0B0B0D] border border-[#29292D] text-xs text-[#F5F5F5]"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-[11px] text-[#A1A1AA] block mb-1">Price (₦)</label>
                  <input
                    type="number"
                    required
                    value={srvPrice}
                    onChange={(e) => setSrvPrice(e.target.value)}
                    className="w-full h-8 px-2.5 rounded-md bg-[#0B0B0D] border border-[#29292D] text-xs text-[#F5F5F5]"
                  />
                </div>
                <div className="flex items-center gap-2 pt-5">
                  <input
                    type="checkbox"
                    id="srv-home"
                    checked={srvHome}
                    onChange={(e) => setSrvHome(e.target.checked)}
                    className="accent-[#D99A24]"
                  />
                  <label htmlFor="srv-home" className="text-xs text-[#F5F5F5]">
                    Available for Home Visit
                  </label>
                </div>
              </div>

              <div>
                <label className="text-[11px] text-[#A1A1AA] block mb-1">Description</label>
                <textarea
                  value={srvDesc}
                  onChange={(e) => setSrvDesc(e.target.value)}
                  placeholder="Details about what is included..."
                  rows={2}
                  className="w-full p-2 rounded-md bg-[#0B0B0D] border border-[#29292D] text-xs text-[#F5F5F5]"
                />
              </div>

              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddService(false)}
                  className="px-3 py-1 text-xs text-[#A1A1AA]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-3 py-1 rounded-md bg-[#F5F5F5] text-[#0B0B0D] text-xs font-semibold"
                >
                  Save Service
                </button>
              </div>
            </form>
          )}

          <div className="space-y-2">
            {myServices.map((srv) => (
              <div
                key={srv.id}
                className="p-3 rounded-lg bg-[#141416] border border-[#29292D] flex items-center justify-between"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-xs text-[#F5F5F5]">{srv.name}</span>
                    {srv.homeService && (
                      <span className="text-[10px] px-1.5 py-0.2 rounded bg-[#19191C] text-[#D99A24]">
                        Home Visit
                      </span>
                    )}
                  </div>
                  <span className="text-xs text-[#A1A1AA]">₦{srv.price.toLocaleString()}</span>
                </div>

                <button
                  onClick={() => deleteService(srv.id)}
                  className="p-1.5 text-[#A1A1AA] hover:text-rose-400 transition-colors"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* PRODUCTS TAB */}
      {activeTab === 'products' && (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-xs text-[#F5F5F5]">Food / Item Menu</h3>
            <button
              onClick={() => setShowAddProduct(!showAddProduct)}
              className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-[#F5F5F5] text-[#0B0B0D] text-xs font-semibold"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>New Product</span>
            </button>
          </div>

          {showAddProduct && (
            <form
              onSubmit={handleCreateProduct}
              className="p-3.5 rounded-xl bg-[#141416] border border-[#29292D] space-y-3 text-xs"
            >
              <div>
                <label className="text-[11px] text-[#A1A1AA] block mb-1">Product Name</label>
                <input
                  type="text"
                  required
                  value={prodName}
                  onChange={(e) => setProdName(e.target.value)}
                  placeholder="e.g. Jollof Rice + Turkey"
                  className="w-full h-8 px-2.5 rounded-md bg-[#0B0B0D] border border-[#29292D] text-xs text-[#F5F5F5]"
                />
              </div>

              <div>
                <label className="text-[11px] text-[#A1A1AA] block mb-1">Price (₦)</label>
                <input
                  type="number"
                  required
                  value={prodPrice}
                  onChange={(e) => setProdPrice(e.target.value)}
                  className="w-full h-8 px-2.5 rounded-md bg-[#0B0B0D] border border-[#29292D] text-xs text-[#F5F5F5]"
                />
              </div>

              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddProduct(false)}
                  className="px-3 py-1 text-xs text-[#A1A1AA]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-3 py-1 rounded-md bg-[#F5F5F5] text-[#0B0B0D] text-xs font-semibold"
                >
                  Save Product
                </button>
              </div>
            </form>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {myProducts.map((p) => (
              <div
                key={p.id}
                className="p-3 rounded-lg bg-[#141416] border border-[#29292D] flex items-center justify-between"
              >
                <div>
                  <h4 className="font-semibold text-xs text-[#F5F5F5]">{p.name}</h4>
                  <span className="text-xs text-[#A1A1AA]">₦{p.price.toLocaleString()}</span>
                </div>

                <button
                  onClick={() => deleteProduct(p.id)}
                  className="p-1.5 text-[#A1A1AA] hover:text-rose-400 transition-colors"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* POSTS TAB */}
      {activeTab === 'posts' && (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-xs text-[#F5F5F5]">Feed Announcements</h3>
            <button
              onClick={() => setShowAddPost(!showAddPost)}
              className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-[#F5F5F5] text-[#0B0B0D] text-xs font-semibold"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Create Post</span>
            </button>
          </div>

          {showAddPost && (
            <form
              onSubmit={handleCreatePost}
              className="p-3.5 rounded-xl bg-[#141416] border border-[#29292D] space-y-3 text-xs"
            >
              <div>
                <label className="text-[11px] text-[#A1A1AA] block mb-1">Post Content</label>
                <textarea
                  required
                  rows={3}
                  value={postContent}
                  onChange={(e) => setPostContent(e.target.value)}
                  placeholder="Share a flash sale, new menu arrival, or open slot..."
                  className="w-full p-2.5 rounded-md bg-[#0B0B0D] border border-[#29292D] text-xs text-[#F5F5F5]"
                />
              </div>

              <div>
                <label className="text-[11px] text-[#A1A1AA] block mb-1">Tag (Optional)</label>
                <input
                  type="text"
                  value={postTag}
                  onChange={(e) => setPostTag(e.target.value)}
                  placeholder="e.g. Flash Deal"
                  className="w-full h-8 px-2.5 rounded-md bg-[#0B0B0D] border border-[#29292D] text-xs text-[#F5F5F5]"
                />
              </div>

              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddPost(false)}
                  className="px-3 py-1 text-xs text-[#A1A1AA]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-3 py-1 rounded-md bg-[#F5F5F5] text-[#0B0B0D] text-xs font-semibold"
                >
                  Publish
                </button>
              </div>
            </form>
          )}

          <div className="space-y-2">
            {myPosts.map((post) => (
              <div
                key={post.id}
                className="p-3 rounded-lg bg-[#141416] border border-[#29292D] text-xs space-y-1"
              >
                <div className="flex items-center justify-between text-[#A1A1AA] text-[11px]">
                  <span>{new Date(post.createdAt).toLocaleDateString()}</span>
                  {post.promotionTag && (
                    <span className="px-1.5 py-0.2 rounded bg-[#19191C] text-[#D99A24]">
                      {post.promotionTag}
                    </span>
                  )}
                </div>
                <p className="text-[#F5F5F5]">{post.content}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ANALYTICS TAB */}
      {activeTab === 'analytics' && (
        <div className="p-4 rounded-xl bg-[#141416] border border-[#29292D] space-y-3 text-xs">
          <h3 className="font-semibold text-xs text-[#F5F5F5]">Business Performance</h3>
          <p className="text-[#A1A1AA]">
            You have served {myBookings.filter((b) => b.status === 'completed').length} completed bookings
            and {myOrders.filter((o) => o.status === 'completed').length} orders in Malete.
          </p>
          <div className="p-3 rounded-lg bg-[#19191C] border border-[#29292D]">
            <span className="text-[11px] text-[#A1A1AA]">Customer Satisfaction</span>
            <div className="flex items-center gap-1 mt-1 text-sm font-bold text-[#F5F5F5]">
              <Star className="w-4 h-4 fill-[#D99A24] text-[#D99A24]" />
              <span>{myProvider.rating.toFixed(1)} / 5.0</span>
            </div>
          </div>
        </div>
      )}

      {/* SETTINGS TAB */}
      {activeTab === 'settings' && (
        <div className="p-4 rounded-xl bg-[#141416] border border-[#29292D] space-y-3 text-xs max-w-lg">
          <h3 className="font-semibold text-xs text-[#F5F5F5]">Business Profile Settings</h3>
          <div className="space-y-1.5 text-[#A1A1AA]">
            <p>Business: <strong className="text-[#F5F5F5]">{myProvider.businessName}</strong></p>
            <p>Phone: <strong className="text-[#F5F5F5]">{myProvider.phone}</strong></p>
            <p>Operating Hours: <strong className="text-[#F5F5F5]">{myProvider.openingHours}</strong></p>
            <p>Location: <strong className="text-[#F5F5F5]">{myProvider.address || myProvider.location}</strong></p>
          </div>
        </div>
      )}
    </div>
  );
};
