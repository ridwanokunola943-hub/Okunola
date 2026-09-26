import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Briefcase,
  MapPin,
  Clock,
  Phone,
  Home,
  Truck,
  X,
  CheckCircle2
} from 'lucide-react';
import { MALETE_LOCATIONS, MALETE_AREA_GROUPS } from '../data/mockData';

interface ProviderApplicationModalProps {
  onClose: () => void;
  onSuccess: () => void;
}

export const ProviderApplicationModal: React.FC<ProviderApplicationModalProps> = ({
  onClose,
  onSuccess
}) => {
  const { currentUser, categories, applyForProvider, showToast } = useApp();

  const [businessName, setBusinessName] = useState('');
  const [ownerName, setOwnerName] = useState(currentUser?.fullName || '');
  const [phone, setPhone] = useState(currentUser?.phone || '');
  const [email, setEmail] = useState(currentUser?.email || '');
  const [category, setCategory] = useState(categories[0]?.name || 'Barbers');
  const [description, setDescription] = useState('');
  const [servicesOffered, setServicesOffered] = useState('');
  const [startingPrice, setStartingPrice] = useState('2000');
  const [location, setLocation] = useState('Malete - Tipper Garage');
  const [address, setAddress] = useState('Near Tipper Garage Junction, Malete');
  const [openingHours, setOpeningHours] = useState('8:00 AM - 8:00 PM (Daily)');
  const [homeServiceAvailable, setHomeServiceAvailable] = useState(true);
  const [deliveryAvailable, setDeliveryAvailable] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser) {
      showToast('Please login before registering as a provider', 'info');
      return;
    }
    if (!businessName.trim()) {
      showToast('Please provide your business or trade name', 'warning');
      return;
    }

    setIsSubmitting(true);
    applyForProvider({
      businessName: businessName.trim(),
      ownerName: ownerName.trim(),
      phone: phone.trim(),
      email: email.trim(),
      category,
      description:
        description.trim() ||
        `${businessName} provides reliable ${category} services across Malete.`,
      servicesOffered,
      prices: startingPrice,
      location,
      address,
      openingHours,
      homeServiceAvailable,
      deliveryAvailable,
      paymentInfo: 'Cash & Bank Transfer'
    } as any);

    setIsSubmitting(false);
    onSuccess();
  };

  return (
    <div
      id="provider-application-modal"
      className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-xs flex items-center justify-center p-4"
    >
      <div className="bg-[#141416] border border-[#29292D] rounded-xl w-full max-w-lg p-5 shadow-2xl relative space-y-4 max-h-[90vh] overflow-y-auto animate-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-[#29292D]">
          <div>
            <h2 className="font-heading font-semibold text-base text-[#F5F5F5]">
              Register as a Provider
            </h2>
            <p className="text-xs text-[#A1A1AA]">
              List your business or trade for residents & students in Malete
            </p>
          </div>
          <button onClick={onClose} className="p-1 text-[#A1A1AA] hover:text-[#F5F5F5]">
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-3.5 text-xs">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            <div>
              <label className="text-[#A1A1AA] block mb-1">Business / Brand Name</label>
              <input
                type="text"
                required
                value={businessName}
                onChange={(e) => setBusinessName(e.target.value)}
                placeholder="e.g. Sharp Edge Barbers"
                className="w-full h-9 px-3 rounded-lg bg-[#0B0B0D] border border-[#29292D] text-xs text-[#F5F5F5] focus:border-[#3F3F46]"
              />
            </div>

            <div>
              <label className="text-[#A1A1AA] block mb-1">Owner / Operator Name</label>
              <input
                type="text"
                required
                value={ownerName}
                onChange={(e) => setOwnerName(e.target.value)}
                placeholder="Full name"
                className="w-full h-9 px-3 rounded-lg bg-[#0B0B0D] border border-[#29292D] text-xs text-[#F5F5F5] focus:border-[#3F3F46]"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            <div>
              <label className="text-[#A1A1AA] block mb-1">Primary Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full h-9 px-2.5 rounded-lg bg-[#0B0B0D] border border-[#29292D] text-xs text-[#F5F5F5] focus:border-[#3F3F46]"
              >
                {categories.map((c) => (
                  <option key={c.id} value={c.name} className="bg-[#141416]">
                    {c.icon} {c.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-[#A1A1AA] block mb-1">Base Location in Malete</label>
              <select
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full h-9 px-2.5 rounded-lg bg-[#0B0B0D] border border-[#29292D] text-xs text-[#F5F5F5] focus:border-[#3F3F46]"
              >
                {MALETE_AREA_GROUPS.map((group) => (
                  <optgroup key={group.category} label={`${group.icon} ${group.category}`} className="bg-[#19191C] font-semibold text-[#D99A24]">
                    {group.areas.map((area) => (
                      <option key={area.id} value={area.name} className="bg-[#141416] text-[#F5F5F5] font-normal">
                        {area.shortName}
                      </option>
                    ))}
                  </optgroup>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            <div>
              <label className="text-[#A1A1AA] block mb-1">Phone Number (Calls/WhatsApp)</label>
              <input
                type="tel"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+234 810 000 0000"
                className="w-full h-9 px-3 rounded-lg bg-[#0B0B0D] border border-[#29292D] text-xs text-[#F5F5F5] focus:border-[#3F3F46]"
              />
            </div>

            <div>
              <label className="text-[#A1A1AA] block mb-1">Starting Price (₦)</label>
              <input
                type="number"
                value={startingPrice}
                onChange={(e) => setStartingPrice(e.target.value)}
                placeholder="2000"
                className="w-full h-9 px-3 rounded-lg bg-[#0B0B0D] border border-[#29292D] text-xs text-[#F5F5F5] focus:border-[#3F3F46]"
              />
            </div>
          </div>

          <div>
            <label className="text-[#A1A1AA] block mb-1">Physical Address or Landmark</label>
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="e.g. Near Safari Hostel Gate, Tipper Garage Junction"
              className="w-full h-9 px-3 rounded-lg bg-[#0B0B0D] border border-[#29292D] text-xs text-[#F5F5F5] focus:border-[#3F3F46]"
            />
          </div>

          <div>
            <label className="text-[#A1A1AA] block mb-1">Business Description</label>
            <textarea
              rows={2}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Tell customers what makes your service stand out in Malete..."
              className="w-full p-2.5 rounded-lg bg-[#0B0B0D] border border-[#29292D] text-xs text-[#F5F5F5] focus:border-[#3F3F46]"
            />
          </div>

          {/* Availability Toggles */}
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => setHomeServiceAvailable(!homeServiceAvailable)}
              className={`p-2.5 rounded-lg border text-left text-xs transition-colors flex items-center gap-2 ${
                homeServiceAvailable
                  ? 'bg-[#19191C] border-[#D99A24] text-[#D99A24]'
                  : 'bg-[#0B0B0D] border-[#29292D] text-[#A1A1AA]'
              }`}
            >
              <Home className="w-3.5 h-3.5" />
              <span>Available for Home Visits</span>
            </button>

            <button
              type="button"
              onClick={() => setDeliveryAvailable(!deliveryAvailable)}
              className={`p-2.5 rounded-lg border text-left text-xs transition-colors flex items-center gap-2 ${
                deliveryAvailable
                  ? 'bg-[#19191C] border-[#D99A24] text-[#D99A24]'
                  : 'bg-[#0B0B0D] border-[#29292D] text-[#A1A1AA]'
              }`}
            >
              <Truck className="w-3.5 h-3.5" />
              <span>Offer Campus Delivery</span>
            </button>
          </div>

          {/* Submit */}
          <div className="pt-2 flex items-center justify-end gap-2 border-t border-[#29292D]">
            <button
              type="button"
              onClick={onClose}
              className="px-3 py-2 text-xs text-[#A1A1AA] hover:text-[#F5F5F5]"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-5 py-2 rounded-lg bg-[#F5F5F5] hover:bg-white text-[#0B0B0D] text-xs font-semibold transition-colors flex items-center gap-1.5"
            >
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Submit Application</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
