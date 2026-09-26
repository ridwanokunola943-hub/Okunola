import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  X,
  Trash2,
  Plus,
  Minus,
  ShoppingBag,
  Truck,
  CheckCircle2
} from 'lucide-react';

interface CartAndCheckoutModalProps {
  onClose: () => void;
  onSuccessOrder: (orderId: string) => void;
}

export const CartAndCheckoutModal: React.FC<CartAndCheckoutModalProps> = ({
  onClose,
  onSuccessOrder
}) => {
  const {
    cart,
    updateCartQuantity,
    removeFromCart,
    clearCart,
    createOrder,
    currentUser,
    providers,
    showToast
  } = useApp();

  const [orderType, setOrderType] = useState<'delivery' | 'pickup'>('delivery');
  const [deliveryAddress, setDeliveryAddress] = useState<string>(
    currentUser?.location || 'Room 12, Safari Student Hostels, Malete'
  );
  const [notes, setNotes] = useState<string>('');
  const [paymentMethod, setPaymentMethod] = useState<'cash' | 'paystack_online'>('cash');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Subtotal
  const subtotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const deliveryFee = orderType === 'delivery' ? 300 : 0;
  const grandTotal = subtotal + deliveryFee;

  const primaryProviderId = cart[0]?.product.providerId;
  const provider = providers.find((p) => p.id === primaryProviderId);

  const handleCheckout = (e: React.FormEvent) => {
    e.preventDefault();
    if (cart.length === 0) return;
    if (!currentUser) {
      showToast('Please login to place your order', 'info');
      return;
    }
    if (orderType === 'delivery' && !deliveryAddress.trim()) {
      showToast('Please enter your delivery room/hostel address', 'warning');
      return;
    }

    setIsSubmitting(true);
    try {
      const orderItems = cart.map((item) => ({
        productId: item.product.id,
        name: item.product.name,
        price: item.product.price,
        quantity: item.quantity,
        notes: item.notes
      }));

      const newOrder = createOrder({
        providerId: provider?.id || primaryProviderId || 'prov-2',
        providerName: provider?.businessName || 'Malete Vendor',
        items: orderItems,
        totalAmount: grandTotal,
        deliveryFee,
        deliveryAddress: orderType === 'delivery' ? deliveryAddress : 'Pickup at Vendor Shop',
        notes,
        paymentMethod
      });

      clearCart();
      setIsSubmitting(false);
      onSuccessOrder(newOrder.id);
    } catch {
      setIsSubmitting(false);
      showToast('Failed to place order. Try again.', 'error');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs animate-in zoom-in-95 duration-150">
      <div className="bg-[#141416] border border-[#29292D] rounded-xl w-full max-w-md p-5 shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-[#29292D]">
          <div>
            <h3 className="font-heading font-semibold text-base text-[#F5F5F5]">
              Order Basket
            </h3>
            <p className="text-xs text-[#A1A1AA]">
              {provider ? `From ${provider.businessName}` : 'Malete marketplace order'}
            </p>
          </div>
          <button onClick={onClose} className="p-1 text-[#A1A1AA] hover:text-[#F5F5F5]">
            <X className="w-4 h-4" />
          </button>
        </div>

        {cart.length === 0 ? (
          <div className="py-10 text-center text-xs text-[#A1A1AA] space-y-2">
            <ShoppingBag className="w-8 h-8 mx-auto text-[#29292D]" />
            <p>Your basket is currently empty.</p>
            <button
              onClick={onClose}
              className="mt-2 px-3 py-1.5 rounded-lg bg-[#19191C] border border-[#29292D] text-[#F5F5F5]"
            >
              Browse Food & Items
            </button>
          </div>
        ) : (
          <form onSubmit={handleCheckout} className="space-y-3.5 text-xs">
            {/* Cart Items List */}
            <div className="divide-y divide-[#29292D]/60 max-h-48 overflow-y-auto">
              {cart.map((item) => (
                <div key={item.product.id} className="py-2.5 flex items-center justify-between gap-2">
                  <div className="min-w-0 flex-1">
                    <h4 className="font-medium text-xs text-[#F5F5F5] truncate">
                      {item.product.name}
                    </h4>
                    <span className="text-[11px] text-[#A1A1AA]">
                      ₦{item.product.price.toLocaleString()} each
                    </span>
                  </div>

                  {/* Quantity Controls */}
                  <div className="flex items-center gap-2">
                    <div className="flex items-center rounded-md bg-[#19191C] border border-[#29292D]">
                      <button
                        type="button"
                        onClick={() => updateCartQuantity(item.product.id, item.quantity - 1)}
                        className="p-1 text-[#A1A1AA] hover:text-[#F5F5F5]"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="px-2 text-xs font-semibold text-[#F5F5F5]">
                        {item.quantity}
                      </span>
                      <button
                        type="button"
                        onClick={() => updateCartQuantity(item.product.id, item.quantity + 1)}
                        className="p-1 text-[#A1A1AA] hover:text-[#F5F5F5]"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>

                    <button
                      type="button"
                      onClick={() => removeFromCart(item.product.id)}
                      className="p-1 text-[#A1A1AA] hover:text-rose-400"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Delivery Type */}
            <div>
              <label className="text-[11px] text-[#A1A1AA] font-semibold uppercase tracking-wider block mb-1.5">
                Delivery Option
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setOrderType('delivery')}
                  className={`p-2.5 rounded-lg border text-left text-xs transition-colors flex items-center gap-2 ${
                    orderType === 'delivery'
                      ? 'bg-[#19191C] border-[#D99A24] text-[#D99A24]'
                      : 'bg-[#19191C] border-[#29292D] text-[#A1A1AA]'
                  }`}
                >
                  <Truck className="w-3.5 h-3.5" />
                  <span>Hostel Delivery (+₦300)</span>
                </button>

                <button
                  type="button"
                  onClick={() => setOrderType('pickup')}
                  className={`p-2.5 rounded-lg border text-left text-xs transition-colors flex items-center gap-2 ${
                    orderType === 'pickup'
                      ? 'bg-[#19191C] border-[#D99A24] text-[#D99A24]'
                      : 'bg-[#19191C] border-[#29292D] text-[#A1A1AA]'
                  }`}
                >
                  <ShoppingBag className="w-3.5 h-3.5" />
                  <span>Self Pickup</span>
                </button>
              </div>
            </div>

            {orderType === 'delivery' && (
              <div>
                <label className="text-[#A1A1AA] block mb-1">
                  Delivery Address / Hostel & Room
                </label>
                <input
                  type="text"
                  required
                  value={deliveryAddress}
                  onChange={(e) => setDeliveryAddress(e.target.value)}
                  placeholder="e.g. Safari Hostel, Room 14"
                  className="w-full h-9 px-3 rounded-lg bg-[#0B0B0D] border border-[#29292D] text-xs text-[#F5F5F5] focus:border-[#3F3F46]"
                />
              </div>
            )}

            <div>
              <label className="text-[#A1A1AA] block mb-1">Order Notes (Optional)</label>
              <input
                type="text"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="e.g. Extra pepper sauce, knock quietly"
                className="w-full h-9 px-3 rounded-lg bg-[#0B0B0D] border border-[#29292D] text-xs text-[#F5F5F5] focus:border-[#3F3F46]"
              />
            </div>

            {/* Payment Choice */}
            <div>
              <label className="text-[#A1A1AA] block mb-1">Payment Method</label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setPaymentMethod('cash')}
                  className={`p-2 rounded-lg border text-xs text-center transition-colors ${
                    paymentMethod === 'cash'
                      ? 'bg-[#19191C] border-[#D99A24] text-[#D99A24] font-medium'
                      : 'bg-[#0B0B0D] border-[#29292D] text-[#A1A1AA]'
                  }`}
                >
                  Pay on Delivery
                </button>
                <button
                  type="button"
                  onClick={() => setPaymentMethod('paystack_online')}
                  className={`p-2 rounded-lg border text-xs text-center transition-colors ${
                    paymentMethod === 'paystack_online'
                      ? 'bg-[#19191C] border-[#D99A24] text-[#D99A24] font-medium'
                      : 'bg-[#0B0B0D] border-[#29292D] text-[#A1A1AA]'
                  }`}
                >
                  Transfer / Card
                </button>
              </div>
            </div>

            {/* Pricing Summary */}
            <div className="p-3 rounded-lg bg-[#19191C] border border-[#29292D] space-y-1.5 text-xs">
              <div className="flex justify-between text-[#A1A1AA]">
                <span>Items Subtotal</span>
                <span className="text-[#F5F5F5]">₦{subtotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-[#A1A1AA]">
                <span>Delivery Fee</span>
                <span className="text-[#F5F5F5]">
                  {deliveryFee > 0 ? `₦${deliveryFee.toLocaleString()}` : 'Free'}
                </span>
              </div>
              <div className="pt-1.5 border-t border-[#29292D] flex justify-between font-bold text-[#F5F5F5] text-sm">
                <span>Total Amount</span>
                <span>₦{grandTotal.toLocaleString()}</span>
              </div>
            </div>

            {/* Submit */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full h-11 rounded-lg bg-[#D99A24] hover:bg-[#c4891e] text-black font-semibold text-xs sm:text-sm transition-colors flex items-center justify-center gap-2"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>Place Order • ₦{grandTotal.toLocaleString()}</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
