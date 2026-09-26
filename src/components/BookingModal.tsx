import React, { useState } from 'react';
import { Service, Provider } from '../types';
import { useApp } from '../context/AppContext';
import {
  X,
  Calendar as CalendarIcon,
  Clock,
  MapPin,
  Home,
  CheckCircle2,
  Star
} from 'lucide-react';

interface BookingModalProps {
  service: Service;
  provider: Provider;
  onClose: () => void;
  onSuccess: (bookingId: string) => void;
}

export const BookingModal: React.FC<BookingModalProps> = ({
  service,
  provider,
  onClose,
  onSuccess
}) => {
  const { currentUser, createBooking, showToast } = useApp();

  const [date, setDate] = useState<string>(() => {
    const today = new Date();
    today.setDate(today.getDate() + 1);
    return today.toISOString().split('T')[0];
  });
  const [time, setTime] = useState<string>('2:00 PM');
  const [isHomeService, setIsHomeService] = useState<boolean>(service.homeService);
  const [locationAddress, setLocationAddress] = useState<string>(
    currentUser?.location || 'Room 14, Safari Hostel, Malete'
  );
  const [notes, setNotes] = useState<string>('');
  const [paymentMethod, setPaymentMethod] = useState<'cash' | 'paystack_online'>('cash');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Time slots
  const TIME_SLOTS = [
    '9:00 AM',
    '10:30 AM',
    '12:00 PM',
    '1:30 PM',
    '2:00 PM',
    '3:30 PM',
    '4:00 PM',
    '5:30 PM'
  ];

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser) {
      showToast('Please login to confirm your booking', 'info');
      return;
    }
    if (isHomeService && !locationAddress.trim()) {
      showToast('Please provide your exact hostel address for home service', 'warning');
      return;
    }

    setIsSubmitting(true);
    try {
      const newBk = createBooking({
        providerId: provider.id,
        providerName: provider.businessName,
        serviceId: service.id,
        serviceName: service.name,
        date,
        time,
        isHomeService,
        locationAddress: isHomeService ? locationAddress : provider.address,
        notes,
        price: service.price,
        paymentMethod
      });

      setIsSubmitting(false);
      onSuccess(newBk.id);
    } catch {
      setIsSubmitting(false);
      showToast('Failed to create booking. Please try again.', 'error');
    }
  };

  return (
    <div
      id="booking-modal-backdrop"
      className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-xs flex items-center justify-center p-4"
    >
      <div className="bg-[#141416] border border-[#29292D] rounded-xl w-full max-w-md p-5 shadow-2xl relative space-y-4 max-h-[90vh] overflow-y-auto animate-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="flex items-start justify-between pb-3 border-b border-[#29292D]">
          <div>
            <h3 className="font-heading font-semibold text-base text-[#F5F5F5]">
              Book Service
            </h3>
            <p className="text-xs text-[#A1A1AA] mt-0.5">
              with {provider.businessName}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-md text-[#A1A1AA] hover:text-[#F5F5F5]"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Service Summary Card (Section 13) */}
        <div className="p-3.5 rounded-lg bg-[#19191C] border border-[#29292D] space-y-2">
          <div className="flex items-center justify-between">
            <h4 className="font-semibold text-sm text-[#F5F5F5]">{service.name}</h4>
            <span className="text-sm font-bold text-[#F5F5F5]">
              ₦{service.price.toLocaleString()}
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-2 text-xs text-[#A1A1AA]">
            <span className="flex items-center gap-1 text-[#F5F5F5]">
              <Star className="w-3 h-3 fill-[#D99A24] text-[#D99A24]" />
              {provider.rating.toFixed(1)}
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Clock className="w-3 h-3" />
              {service.duration || '45 mins'}
            </span>
            {service.homeService && (
              <>
                <span>•</span>
                <span className="text-[#D99A24] font-medium">Home service available</span>
              </>
            )}
          </div>

          <p className="text-xs text-[#A1A1AA] leading-relaxed pt-1 border-t border-[#29292D]/60">
            {service.description}
          </p>
        </div>

        {/* Booking Form */}
        <form onSubmit={handleBookingSubmit} className="space-y-3.5">
          {/* Service Location Type */}
          <div>
            <label className="block text-xs font-semibold text-[#A1A1AA] mb-1.5 uppercase tracking-wider">
              Service Location
            </label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setIsHomeService(true)}
                className={`p-2.5 rounded-lg border text-left text-xs transition-colors flex items-center gap-2 ${
                  isHomeService
                    ? 'bg-[#19191C] border-[#D99A24] text-[#D99A24]'
                    : 'bg-[#19191C] border-[#29292D] text-[#A1A1AA]'
                }`}
              >
                <Home className="w-3.5 h-3.5" />
                <span>Come to My Hostel</span>
              </button>

              <button
                type="button"
                onClick={() => setIsHomeService(false)}
                className={`p-2.5 rounded-lg border text-left text-xs transition-colors flex items-center gap-2 ${
                  !isHomeService
                    ? 'bg-[#19191C] border-[#D99A24] text-[#D99A24]'
                    : 'bg-[#19191C] border-[#29292D] text-[#A1A1AA]'
                }`}
              >
                <MapPin className="w-3.5 h-3.5" />
                <span>Visit Their Shop</span>
              </button>
            </div>
          </div>

          {/* Address input if home service */}
          {isHomeService ? (
            <div>
              <label className="block text-xs text-[#A1A1AA] mb-1">
                Your Hostel & Room Address in Malete
              </label>
              <input
                type="text"
                required
                value={locationAddress}
                onChange={(e) => setLocationAddress(e.target.value)}
                placeholder="e.g., Safari Hostel, Block C, Room 14"
                className="w-full h-10 px-3 rounded-lg bg-[#19191C] border border-[#29292D] text-xs text-[#F5F5F5] focus:border-[#3F3F46]"
              />
            </div>
          ) : (
            <div className="p-2.5 rounded-lg bg-[#19191C] border border-[#29292D] text-xs text-[#A1A1AA]">
              <span className="font-semibold text-[#F5F5F5]">Provider Location: </span>
              {provider.address || provider.location}
            </div>
          )}

          {/* Date Picker */}
          <div>
            <label className="block text-xs text-[#A1A1AA] mb-1">
              Select Date
            </label>
            <input
              type="date"
              required
              value={date}
              min={new Date().toISOString().split('T')[0]}
              onChange={(e) => setDate(e.target.value)}
              className="w-full h-10 px-3 rounded-lg bg-[#19191C] border border-[#29292D] text-xs text-[#F5F5F5] focus:border-[#3F3F46]"
            />
          </div>

          {/* Time Slot Chips */}
          <div>
            <label className="block text-xs text-[#A1A1AA] mb-1.5">
              Available Times
            </label>
            <div className="grid grid-cols-4 gap-1.5">
              {TIME_SLOTS.map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => setTime(t)}
                  className={`py-1.5 text-center text-xs rounded-md border transition-colors ${
                    time === t
                      ? 'bg-[#F5F5F5] text-[#0B0B0D] border-[#F5F5F5] font-semibold'
                      : 'bg-[#19191C] border-[#29292D] text-[#A1A1AA] hover:text-[#F5F5F5]'
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          {/* Notes */}
          <div>
            <label className="block text-xs text-[#A1A1AA] mb-1">
              Special Instructions (Optional)
            </label>
            <input
              type="text"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="e.g. Bring extra trimmer, call when at gate"
              className="w-full h-10 px-3 rounded-lg bg-[#19191C] border border-[#29292D] text-xs text-[#F5F5F5] focus:border-[#3F3F46]"
            />
          </div>

          {/* Payment Method */}
          <div>
            <label className="block text-xs text-[#A1A1AA] mb-1">
              Payment Choice
            </label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setPaymentMethod('cash')}
                className={`p-2 rounded-lg border text-xs text-center transition-colors ${
                  paymentMethod === 'cash'
                    ? 'bg-[#19191C] border-[#D99A24] text-[#D99A24] font-medium'
                    : 'bg-[#19191C] border-[#29292D] text-[#A1A1AA]'
                }`}
              >
                Pay on Service
              </button>
              <button
                type="button"
                onClick={() => setPaymentMethod('paystack_online')}
                className={`p-2 rounded-lg border text-xs text-center transition-colors ${
                  paymentMethod === 'paystack_online'
                    ? 'bg-[#19191C] border-[#D99A24] text-[#D99A24] font-medium'
                    : 'bg-[#19191C] border-[#29292D] text-[#A1A1AA]'
                }`}
              >
                Bank Transfer / Card
              </button>
            </div>
          </div>

          {/* Primary CTA (Section 13: One strong primary CTA) */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full h-11 rounded-lg bg-[#D99A24] hover:bg-[#c4891e] text-black font-semibold text-xs sm:text-sm transition-colors flex items-center justify-center gap-2"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>Confirm Booking • ₦{service.price.toLocaleString()}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
