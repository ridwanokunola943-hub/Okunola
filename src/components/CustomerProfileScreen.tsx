import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Provider } from '../types';
import {
  User as UserIcon,
  Phone,
  Mail,
  MapPin,
  CheckCircle2,
  Calendar,
  ShoppingBag,
  Heart,
  Users,
  Settings,
  LogOut,
  Edit3,
  Shield,
  Briefcase
} from 'lucide-react';

interface CustomerProfileScreenProps {
  onOpenProfile: (provider: Provider) => void;
  setActiveView: (view: string) => void;
  onOpenAuth: () => void;
}

export const CustomerProfileScreen: React.FC<CustomerProfileScreenProps> = ({
  onOpenProfile,
  setActiveView,
  onOpenAuth
}) => {
  const {
    currentUser,
    logout,
    orders,
    bookings,
    providers,
    updateProfile,
    toggleSaveProvider,
    toggleFollowProvider
  } = useApp();

  const [activeTab, setActiveTab] = useState<'orders' | 'bookings' | 'saved' | 'following' | 'settings'>('orders');
  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState(currentUser?.fullName || '');
  const [editPhone, setEditPhone] = useState(currentUser?.phone || '');
  const [editLocation, setEditLocation] = useState(currentUser?.location || '');

  if (!currentUser) {
    return (
      <div className="pb-24 pt-12 px-4 max-w-md mx-auto text-center space-y-4">
        <div className="w-14 h-14 rounded-xl bg-[#141416] border border-[#29292D] text-[#A1A1AA] flex items-center justify-center mx-auto">
          <UserIcon className="w-6 h-6 text-[#F5F5F5]" />
        </div>
        <div>
          <h2 className="font-heading font-bold text-lg text-[#F5F5F5]">
            Sign in to Bigridz Local
          </h2>
          <p className="text-xs text-[#A1A1AA] mt-1">
            Track orders, appointments, saved businesses, and chats in Malete.
          </p>
        </div>
        <button
          onClick={onOpenAuth}
          className="w-full h-10 rounded-lg bg-[#F5F5F5] hover:bg-white text-[#0B0B0D] font-semibold text-xs transition-colors"
        >
          Sign In or Register
        </button>
      </div>
    );
  }

  // Filter user orders & bookings
  const userOrders = orders.filter((o) => o.customerId === currentUser.id);
  const userBookings = bookings.filter((b) => b.customerId === currentUser.id);
  const savedProviders = providers.filter((p) => currentUser.savedProviderIds?.includes(p.id));
  const followedProviders = providers.filter((p) => currentUser.followingProviderIds?.includes(p.id));

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile({
      fullName: editName.trim(),
      phone: editPhone.trim(),
      location: editLocation.trim()
    });
    setIsEditing(false);
  };

  const getOrderStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return <span className="px-2 py-0.5 rounded text-[10px] bg-[#19191C] border border-[#29292D] text-[#D99A24]">Pending Vendor</span>;
      case 'accepted':
      case 'preparing':
        return <span className="px-2 py-0.5 rounded text-[10px] bg-[#19191C] border border-[#29292D] text-cyan-400">Preparing</span>;
      case 'ready':
      case 'out_for_delivery':
        return <span className="px-2 py-0.5 rounded text-[10px] bg-[#19191C] border border-[#29292D] text-blue-400">Out for Delivery</span>;
      case 'completed':
        return <span className="px-2 py-0.5 rounded text-[10px] bg-[#19191C] border border-[#29292D] text-[#10B981]">Completed</span>;
      case 'rejected':
        return <span className="px-2 py-0.5 rounded text-[10px] bg-[#19191C] border border-[#29292D] text-rose-400">Declined</span>;
      default:
        return <span className="px-2 py-0.5 rounded text-[10px] bg-[#19191C] text-[#A1A1AA]">{status}</span>;
    }
  };

  const getBookingStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return <span className="px-2 py-0.5 rounded text-[10px] bg-[#19191C] border border-[#29292D] text-[#D99A24]">Awaiting Confirmation</span>;
      case 'confirmed':
        return <span className="px-2 py-0.5 rounded text-[10px] bg-[#19191C] border border-[#29292D] text-[#10B981]">Confirmed Visit</span>;
      case 'completed':
        return <span className="px-2 py-0.5 rounded text-[10px] bg-[#19191C] border border-[#29292D] text-[#10B981]">Completed</span>;
      case 'cancelled':
        return <span className="px-2 py-0.5 rounded text-[10px] bg-[#19191C] border border-[#29292D] text-rose-400">Cancelled</span>;
      default:
        return <span className="px-2 py-0.5 rounded text-[10px] bg-[#19191C] text-[#A1A1AA]">{status}</span>;
    }
  };

  return (
    <div id="customer-profile-screen" className="pb-24 pt-3 px-4 max-w-3xl mx-auto space-y-4">
      {/* Profile Header Block (Section 16) */}
      <div className="p-4 rounded-xl bg-[#141416] border border-[#29292D]">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            {currentUser.photoURL ? (
              <img
                src={currentUser.photoURL}
                alt={currentUser.fullName}
                className="w-14 h-14 rounded-xl object-cover border border-[#29292D]"
              />
            ) : (
              <div className="w-14 h-14 rounded-xl bg-[#19191C] border border-[#29292D] flex items-center justify-center text-lg font-bold text-[#F5F5F5]">
                {currentUser.fullName.charAt(0)}
              </div>
            )}

            <div>
              <div className="flex items-center gap-1.5">
                <h1 className="font-heading font-semibold text-base text-[#F5F5F5]">
                  {currentUser.fullName}
                </h1>
                {currentUser.accountType === 'admin' && (
                  <span className="px-1.5 py-0.2 rounded text-[10px] bg-[#F5F5F5] text-[#0B0B0D] font-bold">
                    Admin
                  </span>
                )}
              </div>
              <p className="text-xs text-[#A1A1AA]">@{currentUser.username || 'user'}</p>
              <div className="flex items-center gap-2 mt-1 text-xs text-[#A1A1AA]">
                <span className="flex items-center gap-1">
                  <MapPin className="w-3 h-3 text-[#D99A24]" />
                  <span>{currentUser.location}</span>
                </span>
                <span>•</span>
                <span>{followedProviders.length} Following</span>
              </div>
            </div>
          </div>

          <button
            onClick={() => setIsEditing(!isEditing)}
            className="p-2 rounded-lg bg-[#19191C] border border-[#29292D] hover:border-[#3F3F46] text-xs text-[#A1A1AA] hover:text-[#F5F5F5] transition-colors"
            title="Edit profile"
          >
            <Edit3 className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Edit profile inline form */}
        {isEditing && (
          <form onSubmit={handleSaveProfile} className="mt-4 pt-3 border-t border-[#29292D] space-y-3">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              <div>
                <label className="block text-[11px] text-[#A1A1AA] mb-1">Full Name</label>
                <input
                  type="text"
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  className="w-full h-8 px-2.5 rounded-md bg-[#0B0B0D] border border-[#29292D] text-xs text-[#F5F5F5]"
                />
              </div>
              <div>
                <label className="block text-[11px] text-[#A1A1AA] mb-1">Phone Number</label>
                <input
                  type="text"
                  value={editPhone}
                  onChange={(e) => setEditPhone(e.target.value)}
                  className="w-full h-8 px-2.5 rounded-md bg-[#0B0B0D] border border-[#29292D] text-xs text-[#F5F5F5]"
                />
              </div>
              <div>
                <label className="block text-[11px] text-[#A1A1AA] mb-1">Hostel / Location</label>
                <input
                  type="text"
                  value={editLocation}
                  onChange={(e) => setEditLocation(e.target.value)}
                  className="w-full h-8 px-2.5 rounded-md bg-[#0B0B0D] border border-[#29292D] text-xs text-[#F5F5F5]"
                />
              </div>
            </div>

            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="px-3 py-1 rounded-md text-xs text-[#A1A1AA]"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-3 py-1 rounded-md bg-[#F5F5F5] text-[#0B0B0D] text-xs font-semibold"
              >
                Save
              </button>
            </div>
          </form>
        )}
      </div>

      {/* Role Management Banners */}
      {currentUser.accountType === 'admin' ? (
        <div className="p-3 rounded-xl bg-[#141416] border border-[#29292D] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Shield className="w-4 h-4 text-[#D99A24]" />
            <div>
              <h4 className="text-xs font-semibold text-[#F5F5F5]">Platform Admin Console</h4>
              <p className="text-[11px] text-[#A1A1AA]">Manage providers, categories, and review reports</p>
            </div>
          </div>
          <button
            onClick={() => setActiveView('admin')}
            className="px-3 py-1.5 rounded-lg bg-[#F5F5F5] text-[#0B0B0D] text-xs font-semibold hover:bg-white transition-colors"
          >
            Open Admin
          </button>
        </div>
      ) : currentUser.accountType === 'provider' ? (
        <div className="p-3 rounded-xl bg-[#141416] border border-[#29292D] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Briefcase className="w-4 h-4 text-[#D99A24]" />
            <div>
              <h4 className="text-xs font-semibold text-[#F5F5F5]">Business Provider Hub</h4>
              <p className="text-[11px] text-[#A1A1AA]">Manage bookings, catalog items, and announcements</p>
            </div>
          </div>
          <button
            onClick={() => setActiveView('provider-dashboard')}
            className="px-3 py-1.5 rounded-lg bg-[#F5F5F5] text-[#0B0B0D] text-xs font-semibold hover:bg-white transition-colors"
          >
            Open Hub
          </button>
        </div>
      ) : (
        <div className="p-3 rounded-xl bg-[#141416] border border-[#29292D] flex items-center justify-between">
          <div>
            <h4 className="text-xs font-semibold text-[#F5F5F5]">Run a business in Malete?</h4>
            <p className="text-[11px] text-[#A1A1AA]">List your services or food shop to reach customers</p>
          </div>
          <button
            onClick={() => setActiveView('apply-provider')}
            className="px-3 py-1.5 rounded-lg bg-[#19191C] border border-[#29292D] hover:border-[#3F3F46] text-[#F5F5F5] text-xs font-medium transition-colors"
          >
            Become Provider
          </button>
        </div>
      )}

      {/* Segment Tabs (Section 16: Orders | Bookings | Saved | Following | Settings) */}
      <div className="flex border-b border-[#29292D] overflow-x-auto scrollbar-none">
        {(['orders', 'bookings', 'saved', 'following', 'settings'] as const).map((tab) => {
          const isSelected = activeTab === tab;
          const counts = {
            orders: userOrders.length,
            bookings: userBookings.length,
            saved: savedProviders.length,
            following: followedProviders.length,
            settings: 0
          };
          const labels = {
            orders: 'Orders',
            bookings: 'Bookings',
            saved: 'Saved',
            following: 'Following',
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
              {labels[tab]} {counts[tab] > 0 && `(${counts[tab]})`}
            </button>
          );
        })}
      </div>

      {/* Tab Panels */}
      <div className="space-y-3">
        {/* ORDERS */}
        {activeTab === 'orders' && (
          <div className="space-y-2.5">
            {userOrders.length === 0 ? (
              <div className="p-8 rounded-xl bg-[#141416] border border-[#29292D] text-center text-xs text-[#A1A1AA]">
                <ShoppingBag className="w-8 h-8 mx-auto text-[#29292D] mb-2" />
                <p>No food or product orders yet.</p>
              </div>
            ) : (
              userOrders.map((ord) => (
                <div
                  key={ord.id}
                  className="p-3.5 rounded-xl bg-[#141416] border border-[#29292D] space-y-2"
                >
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-[#F5F5F5]">{ord.providerName}</span>
                    {getOrderStatusBadge(ord.status)}
                  </div>

                  <div className="text-xs text-[#A1A1AA] space-y-1">
                    {ord.items.map((it, idx) => (
                      <div key={idx} className="flex justify-between">
                        <span>
                          {it.quantity}x {it.name}
                        </span>
                        <span className="text-[#F5F5F5]">₦{(it.price * it.quantity).toLocaleString()}</span>
                      </div>
                    ))}
                  </div>

                  <div className="pt-2 border-t border-[#29292D] flex items-center justify-between text-xs">
                    <span className="text-[#A1A1AA]">{new Date(ord.createdAt).toLocaleDateString()}</span>
                    <span className="font-semibold text-[#F5F5F5]">
                      Total: ₦{ord.totalAmount.toLocaleString()}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {/* BOOKINGS */}
        {activeTab === 'bookings' && (
          <div className="space-y-2.5">
            {userBookings.length === 0 ? (
              <div className="p-8 rounded-xl bg-[#141416] border border-[#29292D] text-center text-xs text-[#A1A1AA]">
                <Calendar className="w-8 h-8 mx-auto text-[#29292D] mb-2" />
                <p>No service appointments booked yet.</p>
              </div>
            ) : (
              userBookings.map((bk) => (
                <div
                  key={bk.id}
                  className="p-3.5 rounded-xl bg-[#141416] border border-[#29292D] space-y-2"
                >
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-[#F5F5F5]">{bk.serviceName}</span>
                    {getBookingStatusBadge(bk.status)}
                  </div>

                  <div className="text-xs text-[#A1A1AA] space-y-1">
                    <p>Provider: <strong className="text-[#F5F5F5]">{bk.providerName}</strong></p>
                    <p>Scheduled: <strong className="text-[#F5F5F5]">{bk.date} at {bk.time}</strong></p>
                    <p>Type: {bk.isHomeService ? 'Hostel / Room Visit' : 'In-Shop Appointment'}</p>
                    {bk.locationAddress && <p>Address: {bk.locationAddress}</p>}
                  </div>

                  <div className="pt-2 border-t border-[#29292D] flex items-center justify-between text-xs">
                    <span className="text-[#A1A1AA]">Price</span>
                    <span className="font-semibold text-[#F5F5F5]">
                      ₦{bk.price.toLocaleString()}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {/* SAVED */}
        {activeTab === 'saved' && (
          <div className="space-y-2.5">
            {savedProviders.length === 0 ? (
              <div className="p-8 rounded-xl bg-[#141416] border border-[#29292D] text-center text-xs text-[#A1A1AA]">
                <Heart className="w-8 h-8 mx-auto text-[#29292D] mb-2" />
                <p>No saved businesses yet.</p>
              </div>
            ) : (
              savedProviders.map((prov) => (
                <div
                  key={prov.id}
                  className="p-3 rounded-xl bg-[#141416] border border-[#29292D] flex items-center justify-between gap-3"
                >
                  <div
                    className="flex items-center gap-3 cursor-pointer min-w-0"
                    onClick={() => onOpenProfile(prov)}
                  >
                    <img
                      src={prov.logoUrl}
                      alt={prov.businessName}
                      className="w-10 h-10 rounded-lg object-cover border border-[#29292D]"
                    />
                    <div className="min-w-0">
                      <h4 className="font-medium text-xs text-[#F5F5F5] truncate">
                        {prov.businessName}
                      </h4>
                      <p className="text-[11px] text-[#A1A1AA]">{prov.category} • {prov.location}</p>
                    </div>
                  </div>

                  <button
                    onClick={() => toggleSaveProvider(prov.id)}
                    className="p-1.5 rounded-md hover:bg-[#19191C] text-rose-500"
                    title="Remove from saved"
                  >
                    <Heart className="w-4 h-4 fill-rose-500" />
                  </button>
                </div>
              ))
            )}
          </div>
        )}

        {/* FOLLOWING */}
        {activeTab === 'following' && (
          <div className="space-y-2.5">
            {followedProviders.length === 0 ? (
              <div className="p-8 rounded-xl bg-[#141416] border border-[#29292D] text-center text-xs text-[#A1A1AA]">
                <Users className="w-8 h-8 mx-auto text-[#29292D] mb-2" />
                <p>You haven't followed any providers yet.</p>
              </div>
            ) : (
              followedProviders.map((prov) => (
                <div
                  key={prov.id}
                  className="p-3 rounded-xl bg-[#141416] border border-[#29292D] flex items-center justify-between gap-3"
                >
                  <div
                    className="flex items-center gap-3 cursor-pointer min-w-0"
                    onClick={() => onOpenProfile(prov)}
                  >
                    <img
                      src={prov.logoUrl}
                      alt={prov.businessName}
                      className="w-10 h-10 rounded-lg object-cover border border-[#29292D]"
                    />
                    <div className="min-w-0">
                      <h4 className="font-medium text-xs text-[#F5F5F5] truncate">
                        {prov.businessName}
                      </h4>
                      <p className="text-[11px] text-[#A1A1AA]">{prov.category}</p>
                    </div>
                  </div>

                  <button
                    onClick={() => toggleFollowProvider(prov.id)}
                    className="px-3 py-1 rounded-md bg-[#19191C] border border-[#29292D] text-xs text-[#A1A1AA] hover:text-[#F5F5F5]"
                  >
                    Unfollow
                  </button>
                </div>
              ))
            )}
          </div>
        )}

        {/* SETTINGS */}
        {activeTab === 'settings' && (
          <div className="space-y-3">
            <div className="p-4 rounded-xl bg-[#141416] border border-[#29292D] space-y-3 text-xs">
              <h3 className="font-semibold text-xs text-[#F5F5F5]">Account Details</h3>
              <div className="space-y-1 text-[#A1A1AA]">
                <p>Email: <span className="text-[#F5F5F5]">{currentUser.email}</span></p>
                <p>Phone: <span className="text-[#F5F5F5]">{currentUser.phone || 'Not set'}</span></p>
                <p>Primary Location: <span className="text-[#F5F5F5]">{currentUser.location}</span></p>
              </div>

              <div className="pt-3 border-t border-[#29292D]">
                <button
                  onClick={logout}
                  className="flex items-center gap-2 text-rose-400 hover:text-rose-300 font-medium"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Sign Out of Bigridz</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
