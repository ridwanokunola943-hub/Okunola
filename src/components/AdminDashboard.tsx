import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Shield,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  FolderTree,
  Star,
  Settings,
  Plus,
  Trash2,
  Users,
  Search,
  Sliders,
  Calendar,
  ShoppingBag,
  TrendingUp,
  Ban,
  Check,
  ArrowLeft,
  Filter
} from 'lucide-react';

interface AdminDashboardProps {
  onBackToHome: () => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ onBackToHome }) => {
  const {
    providers,
    categories,
    bookings,
    orders,
    reviews,
    reports,
    settings,
    approveProvider,
    rejectProvider,
    suspendProvider,
    toggleProviderVerification,
    toggleProviderFeatured,
    createCategory,
    deleteCategory,
    moderateReview,
    resolveReport,
    updatePlatformSettings
  } = useApp();

  const [activeTab, setActiveTab] = useState<
    'overview' | 'providers' | 'categories' | 'reports' | 'verification' | 'analytics' | 'settings'
  >('overview');
  const [providerSearch, setProviderSearch] = useState('');
  const [providerFilter, setProviderFilter] = useState<'all' | 'pending' | 'approved' | 'suspended'>('all');

  // Category form
  const [showAddCat, setShowAddCat] = useState(false);
  const [catName, setCatName] = useState('');
  const [catIcon, setCatIcon] = useState('🏷️');
  const [catDesc, setCatDesc] = useState('');

  // Settings form
  const [commissionRate, setCommissionRate] = useState(
    (settings.commissionRate ?? settings.serviceFeePercent ?? 5).toString()
  );
  const [deliveryFeeBase, setDeliveryFeeBase] = useState(
    (settings.deliveryFeeBase ?? 300).toString()
  );
  const [maintenanceMode, setMaintenanceMode] = useState(settings.maintenanceMode);

  // Filtered providers
  const filteredProviders = providers.filter((p) => {
    if (providerFilter === 'pending' && p.status !== 'pending') return false;
    if (providerFilter === 'approved' && p.status !== 'approved') return false;
    if (providerFilter === 'suspended' && p.status !== 'suspended') return false;

    if (!providerSearch.trim()) return true;
    const q = providerSearch.toLowerCase();
    return (
      p.businessName.toLowerCase().includes(q) ||
      p.ownerName.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q)
    );
  });

  const pendingProvidersCount = providers.filter((p) => p.status === 'pending').length;
  const unresolvedReportsCount = reports.filter((r) => r.status === 'open').length;

  const handleAddCategory = (e: React.FormEvent) => {
    e.preventDefault();
    if (!catName.trim()) return;
    createCategory({
      name: catName.trim(),
      icon: catIcon.trim() || '🏷️',
      description: catDesc.trim()
    });
    setCatName('');
    setShowAddCat(false);
  };

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    updatePlatformSettings({
      commissionRate: Number(commissionRate) || 5,
      deliveryFeeBase: Number(deliveryFeeBase) || 300,
      maintenanceMode
    });
  };

  return (
    <div id="bigridz-admin-console" className="pb-24 pt-3 px-4 max-w-6xl mx-auto space-y-4">
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
                Operations Center
              </h1>
              <span className="px-1.5 py-0.2 rounded text-[10px] bg-[#D99A24]/15 text-[#D99A24] border border-[#D99A24]/30 font-semibold">
                Admin
              </span>
            </div>
            <p className="text-xs text-[#A1A1AA]">Bigridz Local Platform Management • Malete</p>
          </div>
        </div>

        <button
          onClick={onBackToHome}
          className="text-xs text-[#A1A1AA] hover:text-[#F5F5F5] font-medium"
        >
          Exit to App
        </button>
      </div>

      {/* Navigation: Overview | Providers | Categories | Reports | Verification | Analytics | Settings */}
      <div className="flex border-b border-[#29292D] overflow-x-auto scrollbar-none">
        {(
          [
            'overview',
            'providers',
            'categories',
            'reports',
            'verification',
            'analytics',
            'settings'
          ] as const
        ).map((tab) => {
          const isSelected = activeTab === tab;
          const labels = {
            overview: 'Overview',
            providers: `Providers (${providers.length})`,
            categories: `Categories (${categories.length})`,
            reports: `Reports ${unresolvedReportsCount > 0 ? `(${unresolvedReportsCount})` : ''}`,
            verification: 'Verification',
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
          {/* Key metrics (Section 18: Total Providers | Pending Approvals | Total Bookings | Total Orders | Active Users | Reports) */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5">
            <div className="p-3 rounded-lg bg-[#141416] border border-[#29292D]">
              <span className="text-[11px] text-[#A1A1AA] block">Total Providers</span>
              <span className="text-xl font-bold text-[#F5F5F5]">{providers.length}</span>
            </div>

            <div className="p-3 rounded-lg bg-[#141416] border border-[#29292D]">
              <span className="text-[11px] text-[#A1A1AA] block">Pending Approvals</span>
              <span
                className={`text-xl font-bold ${
                  pendingProvidersCount > 0 ? 'text-[#D99A24]' : 'text-[#F5F5F5]'
                }`}
              >
                {pendingProvidersCount}
              </span>
            </div>

            <div className="p-3 rounded-lg bg-[#141416] border border-[#29292D]">
              <span className="text-[11px] text-[#A1A1AA] block">Total Bookings</span>
              <span className="text-xl font-bold text-[#F5F5F5]">{bookings.length}</span>
            </div>

            <div className="p-3 rounded-lg bg-[#141416] border border-[#29292D]">
              <span className="text-[11px] text-[#A1A1AA] block">Total Orders</span>
              <span className="text-xl font-bold text-[#F5F5F5]">{orders.length}</span>
            </div>

            <div className="p-3 rounded-lg bg-[#141416] border border-[#29292D]">
              <span className="text-[11px] text-[#A1A1AA] block">Active Users</span>
              <span className="text-xl font-bold text-[#F5F5F5]">148</span>
            </div>

            <div className="p-3 rounded-lg bg-[#141416] border border-[#29292D]">
              <span className="text-[11px] text-[#A1A1AA] block">Active Reports</span>
              <span
                className={`text-xl font-bold ${
                  unresolvedReportsCount > 0 ? 'text-rose-400' : 'text-[#F5F5F5]'
                }`}
              >
                {unresolvedReportsCount}
              </span>
            </div>
          </div>

          {/* Quick Action: Pending Approvals list if any */}
          {pendingProvidersCount > 0 && (
            <div className="p-4 rounded-xl bg-[#141416] border border-[#29292D] space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-xs text-[#F5F5F5] flex items-center gap-1.5">
                  <AlertTriangle className="w-3.5 h-3.5 text-[#D99A24]" />
                  <span>Providers Awaiting Approval ({pendingProvidersCount})</span>
                </h3>
                <button
                  onClick={() => {
                    setActiveTab('providers');
                    setProviderFilter('pending');
                  }}
                  className="text-xs text-[#D99A24] hover:underline"
                >
                  View all pending
                </button>
              </div>

              <div className="space-y-2">
                {providers
                  .filter((p) => p.status === 'pending')
                  .map((prov) => (
                    <div
                      key={prov.id}
                      className="p-3 rounded-lg bg-[#19191C] border border-[#29292D] flex items-center justify-between gap-3 text-xs"
                    >
                      <div>
                        <span className="font-semibold text-[#F5F5F5]">{prov.businessName}</span>
                        <p className="text-[11px] text-[#A1A1AA]">
                          {prov.category} • {prov.ownerName} • {prov.location}
                        </p>
                      </div>

                      <div className="flex gap-1.5">
                        <button
                          onClick={() => approveProvider(prov.id)}
                          className="px-2.5 py-1 rounded bg-[#10B981] text-black font-semibold text-xs hover:bg-[#0ea372]"
                        >
                          Approve
                        </button>
                        <button
                          onClick={() => rejectProvider(prov.id)}
                          className="px-2.5 py-1 rounded bg-[#19191C] border border-[#29292D] text-rose-400 text-xs hover:bg-rose-500/10"
                        >
                          Reject
                        </button>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          )}

          {/* Recent Platform Orders & Bookings Preview */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="p-3.5 rounded-xl bg-[#141416] border border-[#29292D] space-y-2.5">
              <h3 className="font-semibold text-xs text-[#F5F5F5] flex items-center justify-between">
                <span>Recent Bookings</span>
                <span className="text-[11px] text-[#A1A1AA]">{bookings.length} total</span>
              </h3>
              <div className="divide-y divide-[#29292D]/60 text-xs">
                {bookings.slice(0, 4).map((bk) => (
                  <div key={bk.id} className="py-2 flex justify-between items-center">
                    <div>
                      <p className="font-medium text-[#F5F5F5]">{bk.serviceName}</p>
                      <p className="text-[11px] text-[#A1A1AA]">{bk.providerName} • {bk.date}</p>
                    </div>
                    <span className="font-semibold text-[#F5F5F5]">₦{bk.price.toLocaleString()}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-[#141416] border border-[#29292D] space-y-2.5">
              <h3 className="font-semibold text-xs text-[#F5F5F5] flex items-center justify-between">
                <span>Recent Orders</span>
                <span className="text-[11px] text-[#A1A1AA]">{orders.length} total</span>
              </h3>
              <div className="divide-y divide-[#29292D]/60 text-xs">
                {orders.slice(0, 4).map((ord) => (
                  <div key={ord.id} className="py-2 flex justify-between items-center">
                    <div>
                      <p className="font-medium text-[#F5F5F5]">{ord.providerName}</p>
                      <p className="text-[11px] text-[#A1A1AA]">
                        {ord.items.length} item(s) • {new Date(ord.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                    <span className="font-semibold text-[#F5F5F5]">₦{ord.totalAmount.toLocaleString()}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* PROVIDERS TAB (Clean Rows, Actions: Approve | Reject | View | Feature | Suspend) */}
      {activeTab === 'providers' && (
        <div className="space-y-3">
          {/* Controls Bar */}
          <div className="flex flex-col sm:flex-row gap-2 justify-between">
            <div className="relative flex-1 max-w-sm">
              <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-[#A1A1AA]" />
              <input
                type="text"
                value={providerSearch}
                onChange={(e) => setProviderSearch(e.target.value)}
                placeholder="Search provider name, owner, category..."
                className="w-full h-9 pl-9 pr-3 rounded-lg bg-[#141416] border border-[#29292D] text-xs text-[#F5F5F5]"
              />
            </div>

            {/* Filter pills */}
            <div className="flex gap-1.5 overflow-x-auto">
              {(['all', 'pending', 'approved', 'suspended'] as const).map((st) => (
                <button
                  key={st}
                  onClick={() => setProviderFilter(st)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium border capitalize transition-colors ${
                    providerFilter === st
                      ? 'bg-[#F5F5F5] text-[#0B0B0D] border-[#F5F5F5]'
                      : 'bg-[#141416] border-[#29292D] text-[#A1A1AA] hover:text-[#F5F5F5]'
                  }`}
                >
                  {st}
                </button>
              ))}
            </div>
          </div>

          {/* Clean Providers Table */}
          <div className="bg-[#141416] border border-[#29292D] rounded-xl overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="border-b border-[#29292D] bg-[#19191C] text-[#A1A1AA]">
                <tr>
                  <th className="p-3 font-semibold">Business</th>
                  <th className="p-3 font-semibold">Category</th>
                  <th className="p-3 font-semibold">Status</th>
                  <th className="p-3 font-semibold">Rating</th>
                  <th className="p-3 font-semibold text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#29292D]/60 text-[#F5F5F5]">
                {filteredProviders.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="p-6 text-center text-xs text-[#A1A1AA]">
                      No providers match the filter.
                    </td>
                  </tr>
                ) : (
                  filteredProviders.map((prov) => (
                    <tr key={prov.id} className="hover:bg-[#19191C]/40 transition-colors">
                      <td className="p-3">
                        <div className="flex items-center gap-2.5">
                          <img
                            src={prov.logoUrl}
                            alt=""
                            className="w-8 h-8 rounded-md object-cover border border-[#29292D]"
                          />
                          <div>
                            <div className="flex items-center gap-1 font-semibold">
                              <span>{prov.businessName}</span>
                              {prov.isVerified && (
                                <CheckCircle2 className="w-3 h-3 text-[#D99A24]" />
                              )}
                              {prov.isFeatured && (
                                <span className="text-[10px] px-1 py-0.1 rounded bg-[#D99A24]/20 text-[#D99A24]">
                                  Featured
                                </span>
                              )}
                            </div>
                            <p className="text-[11px] text-[#A1A1AA]">{prov.ownerName} • {prov.location}</p>
                          </div>
                        </div>
                      </td>

                      <td className="p-3 text-[#A1A1AA]">{prov.category}</td>

                      <td className="p-3">
                        <span
                          className={`px-2 py-0.5 rounded text-[10px] font-medium border ${
                            prov.status === 'approved'
                              ? 'bg-[#10B981]/10 text-[#10B981] border-[#10B981]/30'
                              : prov.status === 'pending'
                              ? 'bg-[#D99A24]/10 text-[#D99A24] border-[#D99A24]/30'
                              : 'bg-rose-500/10 text-rose-400 border-rose-500/30'
                          }`}
                        >
                          {prov.status}
                        </span>
                      </td>

                      <td className="p-3">
                        <div className="flex items-center gap-1">
                          <Star className="w-3 h-3 fill-[#D99A24] text-[#D99A24]" />
                          <span>{prov.rating.toFixed(1)}</span>
                          <span className="text-[#A1A1AA] text-[11px]">({prov.reviewCount})</span>
                        </div>
                      </td>

                      <td className="p-3 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          {prov.status === 'pending' ? (
                            <>
                              <button
                                onClick={() => approveProvider(prov.id)}
                                className="px-2 py-1 rounded bg-[#10B981] text-black font-semibold text-[11px] hover:bg-[#0ea372]"
                              >
                                Approve
                              </button>
                              <button
                                onClick={() => rejectProvider(prov.id)}
                                className="px-2 py-1 rounded bg-[#19191C] border border-[#29292D] text-rose-400 text-[11px]"
                              >
                                Reject
                              </button>
                            </>
                          ) : (
                            <>
                              <button
                                onClick={() => toggleProviderVerification(prov.id)}
                                className={`px-2 py-1 rounded text-[11px] border transition-colors ${
                                  prov.isVerified
                                    ? 'bg-[#19191C] border-[#29292D] text-[#A1A1AA]'
                                    : 'bg-[#19191C] border-[#D99A24] text-[#D99A24]'
                                }`}
                              >
                                {prov.isVerified ? 'Unverify' : 'Verify'}
                              </button>

                              <button
                                onClick={() => toggleProviderFeatured(prov.id)}
                                className={`px-2 py-1 rounded text-[11px] border transition-colors ${
                                  prov.isFeatured
                                    ? 'bg-[#19191C] border-[#29292D] text-[#A1A1AA]'
                                    : 'bg-[#19191C] border-[#3F3F46] text-[#F5F5F5]'
                                }`}
                              >
                                {prov.isFeatured ? 'Unfeature' : 'Feature'}
                              </button>

                              {prov.status === 'suspended' ? (
                                <button
                                  onClick={() => approveProvider(prov.id)}
                                  className="px-2 py-1 rounded bg-[#10B981] text-black text-[11px]"
                                >
                                  Reinstate
                                </button>
                              ) : (
                                <button
                                  onClick={() => suspendProvider(prov.id)}
                                  className="px-2 py-1 rounded bg-[#19191C] border border-[#29292D] text-rose-400 text-[11px] hover:bg-rose-500/10"
                                >
                                  Suspend
                                </button>
                              )}
                            </>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* CATEGORIES TAB */}
      {activeTab === 'categories' && (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-xs text-[#F5F5F5]">Active Marketplace Categories</h3>
            <button
              onClick={() => setShowAddCat(!showAddCat)}
              className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-[#F5F5F5] text-[#0B0B0D] text-xs font-semibold"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Category</span>
            </button>
          </div>

          {/* Add Category Form */}
          {showAddCat && (
            <form onSubmit={handleAddCategory} className="p-3.5 rounded-xl bg-[#141416] border border-[#29292D] space-y-3">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                <div>
                  <label className="text-[11px] text-[#A1A1AA] block mb-1">Category Name</label>
                  <input
                    type="text"
                    required
                    value={catName}
                    onChange={(e) => setCatName(e.target.value)}
                    placeholder="e.g. Photography"
                    className="w-full h-8 px-2.5 rounded-md bg-[#0B0B0D] border border-[#29292D] text-xs text-[#F5F5F5]"
                  />
                </div>
                <div>
                  <label className="text-[11px] text-[#A1A1AA] block mb-1">Icon Emoji</label>
                  <input
                    type="text"
                    value={catIcon}
                    onChange={(e) => setCatIcon(e.target.value)}
                    placeholder="📸"
                    className="w-full h-8 px-2.5 rounded-md bg-[#0B0B0D] border border-[#29292D] text-xs text-[#F5F5F5]"
                  />
                </div>
                <div>
                  <label className="text-[11px] text-[#A1A1AA] block mb-1">Description</label>
                  <input
                    type="text"
                    value={catDesc}
                    onChange={(e) => setCatDesc(e.target.value)}
                    placeholder="Brief summary"
                    className="w-full h-8 px-2.5 rounded-md bg-[#0B0B0D] border border-[#29292D] text-xs text-[#F5F5F5]"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddCat(false)}
                  className="px-3 py-1 text-xs text-[#A1A1AA]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-3 py-1 rounded-md bg-[#F5F5F5] text-[#0B0B0D] text-xs font-semibold"
                >
                  Save Category
                </button>
              </div>
            </form>
          )}

          {/* Categories Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
            {categories.map((c) => (
              <div
                key={c.id}
                className="p-3 rounded-lg bg-[#141416] border border-[#29292D] flex items-center justify-between"
              >
                <div className="flex items-center gap-2.5">
                  <span className="text-xl">{c.icon}</span>
                  <div>
                    <h4 className="font-semibold text-xs text-[#F5F5F5]">{c.name}</h4>
                    <p className="text-[11px] text-[#A1A1AA]">
                      {providers.filter((p) => p.category === c.name).length} active providers
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => deleteCategory(c.id)}
                  className="p-1 text-[#A1A1AA] hover:text-rose-400 transition-colors"
                  title="Delete category"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* REPORTS TAB */}
      {activeTab === 'reports' && (
        <div className="space-y-3">
          <h3 className="font-semibold text-xs text-[#F5F5F5]">Community Flags & Dispute Reports</h3>
          {reports.length === 0 ? (
            <div className="p-8 rounded-xl bg-[#141416] border border-[#29292D] text-center text-xs text-[#A1A1AA]">
              No active reports in Malete.
            </div>
          ) : (
            <div className="space-y-2">
              {reports.map((rep) => (
                <div
                  key={rep.id}
                  className="p-3.5 rounded-lg bg-[#141416] border border-[#29292D] flex items-center justify-between gap-3 text-xs"
                >
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-[#F5F5F5]">{rep.targetName}</span>
                      <span className="text-[10px] px-1.5 py-0.2 rounded bg-[#19191C] border border-[#29292D] text-[#A1A1AA]">
                        {rep.targetType}
                      </span>
                    </div>
                    <p className="text-xs text-[#A1A1AA] mt-1">{rep.reason}</p>
                    <p className="text-[11px] text-[#A1A1AA]/80 mt-0.5">Reported by {rep.reporterName}</p>
                  </div>

                  <div className="flex items-center gap-2">
                    {rep.status === 'open' ? (
                      <button
                        onClick={() => resolveReport(rep.id, 'resolved')}
                        className="px-3 py-1.5 rounded-md bg-[#19191C] border border-[#29292D] text-xs text-[#10B981] hover:bg-[#10B981]/10 font-medium"
                      >
                        Mark Resolved
                      </button>
                    ) : (
                      <span className="text-xs text-[#10B981]">Resolved</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* VERIFICATION TAB */}
      {activeTab === 'verification' && (
        <div className="p-4 rounded-xl bg-[#141416] border border-[#29292D] space-y-3 text-xs">
          <h3 className="font-semibold text-xs text-[#F5F5F5]">Provider Verification Checklist</h3>
          <p className="text-[#A1A1AA] leading-relaxed">
            Verified badges on Bigridz Local confirm that the physical business location has been verified in Malete,
            valid Nigerian identification has been inspected, and phone number is confirmed active.
          </p>

          <div className="space-y-2 pt-2 border-t border-[#29292D]">
            {providers.map((prov) => (
              <div
                key={prov.id}
                className="p-2.5 rounded-lg bg-[#19191C] border border-[#29292D] flex items-center justify-between"
              >
                <div>
                  <span className="font-medium text-[#F5F5F5]">{prov.businessName}</span>
                  <p className="text-[11px] text-[#A1A1AA]">{prov.location} • {prov.phone}</p>
                </div>

                <button
                  onClick={() => toggleProviderVerification(prov.id)}
                  className={`px-3 py-1 rounded-md text-xs font-medium border transition-colors ${
                    prov.isVerified
                      ? 'bg-[#10B981]/10 border-[#10B981]/30 text-[#10B981]'
                      : 'bg-[#141416] border-[#29292D] text-[#A1A1AA]'
                  }`}
                >
                  {prov.isVerified ? '✓ Verified' : 'Grant Verification'}
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ANALYTICS TAB */}
      {activeTab === 'analytics' && (
        <div className="space-y-3">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
            <div className="p-3.5 rounded-lg bg-[#141416] border border-[#29292D]">
              <span className="text-[11px] text-[#A1A1AA]">GMV / Total Bookings Value</span>
              <span className="text-xl font-bold text-[#F5F5F5] block mt-1">
                ₦{bookings.reduce((sum, b) => sum + b.price, 0).toLocaleString()}
              </span>
            </div>

            <div className="p-3.5 rounded-lg bg-[#141416] border border-[#29292D]">
              <span className="text-[11px] text-[#A1A1AA]">GMV / Total Orders Value</span>
              <span className="text-xl font-bold text-[#F5F5F5] block mt-1">
                ₦{orders.reduce((sum, o) => sum + o.totalAmount, 0).toLocaleString()}
              </span>
            </div>

            <div className="p-3.5 rounded-lg bg-[#141416] border border-[#29292D]">
              <span className="text-[11px] text-[#A1A1AA]">Platform Fee Take (5%)</span>
              <span className="text-xl font-bold text-[#D99A24] block mt-1">
                ₦
                {Math.round(
                  (bookings.reduce((sum, b) => sum + b.price, 0) +
                    orders.reduce((sum, o) => sum + o.totalAmount, 0)) *
                    0.05
                ).toLocaleString()}
              </span>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-[#141416] border border-[#29292D] space-y-2 text-xs">
            <h4 className="font-semibold text-xs text-[#F5F5F5]">Top Categories in Malete</h4>
            <div className="space-y-1.5 text-[#A1A1AA]">
              <div className="flex justify-between">
                <span>Barbing & Hairdressing</span>
                <span className="text-[#F5F5F5] font-medium">38% of bookings</span>
              </div>
              <div className="flex justify-between">
                <span>Food & Campus Deliveries</span>
                <span className="text-[#F5F5F5] font-medium">32% of requests</span>
              </div>
              <div className="flex justify-between">
                <span>Hostel Cleaning & Laundry</span>
                <span className="text-[#F5F5F5] font-medium">18% of requests</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SETTINGS TAB */}
      {activeTab === 'settings' && (
        <form onSubmit={handleSaveSettings} className="p-4 rounded-xl bg-[#141416] border border-[#29292D] space-y-3.5 text-xs max-w-lg">
          <h3 className="font-semibold text-xs text-[#F5F5F5]">Platform Global Configuration</h3>

          <div>
            <label className="text-[#A1A1AA] block mb-1">Platform Commission Fee (%)</label>
            <input
              type="number"
              value={commissionRate}
              onChange={(e) => setCommissionRate(e.target.value)}
              className="w-full h-9 px-3 rounded-lg bg-[#0B0B0D] border border-[#29292D] text-xs text-[#F5F5F5]"
            />
          </div>

          <div>
            <label className="text-[#A1A1AA] block mb-1">Base Campus Delivery Fee (₦)</label>
            <input
              type="number"
              value={deliveryFeeBase}
              onChange={(e) => setDeliveryFeeBase(e.target.value)}
              className="w-full h-9 px-3 rounded-lg bg-[#0B0B0D] border border-[#29292D] text-xs text-[#F5F5F5]"
            />
          </div>

          <div className="flex items-center gap-2 pt-2">
            <input
              type="checkbox"
              id="maint-mode"
              checked={maintenanceMode}
              onChange={(e) => setMaintenanceMode(e.target.checked)}
              className="accent-[#D99A24]"
            />
            <label htmlFor="maint-mode" className="text-[#F5F5F5]">
              Enable Maintenance Mode
            </label>
          </div>

          <div className="pt-3 border-t border-[#29292D]">
            <button
              type="submit"
              className="px-4 py-2 rounded-lg bg-[#F5F5F5] text-[#0B0B0D] text-xs font-semibold hover:bg-white"
            >
              Save Configuration
            </button>
          </div>
        </form>
      )}
    </div>
  );
};
