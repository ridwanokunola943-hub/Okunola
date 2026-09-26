import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { X, Image, Tag, DollarSign, Clock, Megaphone, Bell } from 'lucide-react';

interface CreatePostModalProps {
  onClose: () => void;
  onSuccess: () => void;
}

export const CreatePostModal: React.FC<CreatePostModalProps> = ({ onClose, onSuccess }) => {
  const { currentUser, providers, createPost, showToast, currentLocation } = useApp();

  const myProvider = providers.find(
    (p) => p.id === currentUser?.providerId || p.ownerId === currentUser?.id
  ) || providers[0];

  const [postType, setPostType] = useState<'update' | 'service' | 'promotion' | 'availability'>('update');
  const [content, setContent] = useState('');
  const [promotionTag, setPromotionTag] = useState('');
  const [price, setPrice] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  const POST_TYPES = [
    { id: 'update', label: 'General Update', icon: Megaphone, tag: 'Announcement' },
    { id: 'service', label: 'Service Feature', icon: Tag, tag: 'New Service' },
    { id: 'promotion', label: 'Special Promotion', icon: DollarSign, tag: 'Special Offer' },
    { id: 'availability', label: 'Availability Update', icon: Clock, tag: 'Slots Open' }
  ] as const;

  const SAMPLE_IMAGES = [
    'https://images.unsplash.com/photo-1585747860715-2ba37e788b70?w=600&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=600&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=600&auto=format&fit=crop&q=80'
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) {
      showToast('Please enter post content', 'warning');
      return;
    }

    const selectedTypeObj = POST_TYPES.find((t) => t.id === postType);
    const activeTag = promotionTag.trim() || selectedTypeObj?.tag;

    createPost({
      providerId: myProvider?.id || 'prov-custom',
      providerName: myProvider?.businessName || currentUser?.fullName || 'Local Provider',
      providerLogo: myProvider?.logoUrl || currentUser?.photoURL,
      content: content.trim(),
      promotionTag: activeTag,
      price: price ? Number(price) : undefined,
      imageUrl: imageUrl.trim() || undefined,
      location: currentLocation
    });

    onSuccess();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs animate-in zoom-in-95 duration-150">
      <div className="bg-[#141416] border border-[#29292D] rounded-xl w-full max-w-lg p-5 shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-[#29292D]">
          <div>
            <h3 className="font-heading font-semibold text-base text-[#F5F5F5]">
              Create Post
            </h3>
            <p className="text-xs text-[#A1A1AA]">
              Publish updates to students and residents in Malete
            </p>
          </div>
          <button onClick={onClose} className="p-1 text-[#A1A1AA] hover:text-[#F5F5F5]">
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Section 10: Options */}
        <div>
          <label className="text-[11px] font-semibold text-[#A1A1AA] uppercase tracking-wider block mb-1.5">
            Post Category
          </label>
          <div className="grid grid-cols-2 gap-2">
            {POST_TYPES.map((pt) => {
              const isSelected = postType === pt.id;
              const Icon = pt.icon;
              return (
                <button
                  key={pt.id}
                  type="button"
                  onClick={() => {
                    setPostType(pt.id);
                    setPromotionTag(pt.tag);
                  }}
                  className={`p-2.5 rounded-lg border text-left text-xs transition-colors flex items-center gap-2 ${
                    isSelected
                      ? 'bg-[#19191C] border-[#D99A24] text-[#D99A24]'
                      : 'bg-[#19191C] border-[#29292D] text-[#A1A1AA] hover:text-[#F5F5F5]'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5 shrink-0" />
                  <span className="truncate">{pt.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Post Form */}
        <form onSubmit={handleSubmit} className="space-y-3.5 text-xs">
          <div>
            <label className="text-[#A1A1AA] block mb-1">
              Post Content
            </label>
            <textarea
              required
              rows={3}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="What's happening? (e.g. Fresh jollof ready at hostel gate, or open slots for barbing this evening)"
              className="w-full p-3 rounded-lg bg-[#0B0B0D] border border-[#29292D] text-xs text-[#F5F5F5] focus:border-[#3F3F46]"
            />
          </div>

          {/* Price & Tag */}
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="text-[#A1A1AA] block mb-1">Badge Tag</label>
              <input
                type="text"
                value={promotionTag}
                onChange={(e) => setPromotionTag(e.target.value)}
                placeholder="e.g. Hostel Discount"
                className="w-full h-9 px-3 rounded-lg bg-[#0B0B0D] border border-[#29292D] text-xs text-[#F5F5F5] focus:border-[#3F3F46]"
              />
            </div>
            <div>
              <label className="text-[#A1A1AA] block mb-1">Price (Optional ₦)</label>
              <input
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="e.g. 2000"
                className="w-full h-9 px-3 rounded-lg bg-[#0B0B0D] border border-[#29292D] text-xs text-[#F5F5F5] focus:border-[#3F3F46]"
              />
            </div>
          </div>

          {/* Image Presets */}
          <div>
            <label className="text-[#A1A1AA] block mb-1.5">Attach Photo (Optional)</label>
            <div className="grid grid-cols-4 gap-2">
              {SAMPLE_IMAGES.map((img, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setImageUrl(imageUrl === img ? '' : img)}
                  className={`relative aspect-video rounded-lg overflow-hidden border transition-all ${
                    imageUrl === img ? 'border-[#D99A24] ring-1 ring-[#D99A24]' : 'border-[#29292D] opacity-60 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt="thumb" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
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
              className="px-5 py-2 rounded-lg bg-[#F5F5F5] hover:bg-white text-[#0B0B0D] text-xs font-semibold transition-colors"
            >
              Publish Post
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
