import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Provider, Post } from '../types';
import {
  Heart,
  MessageCircle,
  Share2,
  Bookmark,
  CheckCircle2,
  Plus,
  Send
} from 'lucide-react';

interface FeedScreenProps {
  onOpenProfile: (provider: Provider) => void;
  onOpenBooking: (service: any, provider: Provider) => void;
  onOpenOrder: (provider: Provider) => void;
  onOpenCreatePost: () => void;
}

export const FeedScreen: React.FC<FeedScreenProps> = ({
  onOpenProfile,
  onOpenBooking,
  onOpenOrder,
  onOpenCreatePost
}) => {
  const {
    posts,
    providers,
    services,
    likePost,
    toggleSavePost,
    isSavedPost,
    currentUser,
    showToast
  } = useApp();

  const [activeFeedTab, setActiveFeedTab] = useState<'nearby' | 'following' | 'all'>('nearby');
  const [commentInputs, setCommentInputs] = useState<{ [postId: string]: string }>({});
  const [activeCommentPostId, setActiveCommentPostId] = useState<string | null>(null);
  const [postComments, setPostComments] = useState<{
    [postId: string]: Array<{ user: string; text: string; time: string }>;
  }>({
    'post-1': [
      { user: 'Babatunde K.', text: 'Is this available for Safari hostel delivery?', time: '1h ago' },
      { user: 'Iya Moria Kitchen', text: 'Yes, just order with hostel delivery selected!', time: '45m ago' }
    ]
  });

  const handleShare = (post: Post) => {
    if (navigator.share) {
      navigator
        .share({
          title: `${post.providerName} on Bigridz Local`,
          text: post.content,
          url: window.location.href
        })
        .catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      showToast('Post link copied to clipboard!');
    }
  };

  const handleAddComment = (postId: string) => {
    const text = commentInputs[postId]?.trim();
    if (!text) return;
    if (!currentUser) {
      showToast('Please login to comment', 'info');
      return;
    }

    setPostComments((prev) => ({
      ...prev,
      [postId]: [
        ...(prev[postId] || []),
        { user: currentUser.fullName, text, time: 'Just now' }
      ]
    }));
    setCommentInputs((prev) => ({ ...prev, [postId]: '' }));
    showToast('Comment added');
  };

  // Filter posts
  const displayedPosts = posts.filter((post) => {
    if (activeFeedTab === 'following') {
      return currentUser?.followingProviderIds?.includes(post.providerId);
    }
    return true;
  });

  return (
    <div id="bigridz-feed-screen" className="pb-24 pt-3 px-4 max-w-2xl mx-auto space-y-4">
      {/* Top Header */}
      <div className="flex items-center justify-between gap-3">
        <div>
          <h1 className="font-heading font-bold text-xl text-[#F5F5F5]">
            Community Feed
          </h1>
          <p className="text-xs text-[#A1A1AA]">
            Live announcements & deals from Malete businesses
          </p>
        </div>

        <button
          onClick={onOpenCreatePost}
          className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-[#F5F5F5] text-[#0B0B0D] hover:bg-white text-xs font-semibold transition-colors shrink-0"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>New Post</span>
        </button>
      </div>

      {/* Feed Filter Tabs */}
      <div className="flex border-b border-[#29292D]">
        {(['nearby', 'following', 'all'] as const).map((tab) => {
          const isSelected = activeFeedTab === tab;
          const labels = { nearby: 'Nearby Malete', following: 'Following', all: 'All Posts' };
          return (
            <button
              key={tab}
              onClick={() => setActiveFeedTab(tab)}
              className={`py-2 px-4 text-xs font-medium border-b-2 -mb-[1px] transition-colors ${
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

      {/* Posts List */}
      <div className="space-y-4">
        {displayedPosts.length === 0 ? (
          <div className="p-8 rounded-xl bg-[#141416] border border-[#29292D] text-center text-xs text-[#A1A1AA]">
            <p>No posts to display in this feed view.</p>
          </div>
        ) : (
          displayedPosts.map((post) => {
            const prov = providers.find((p) => p.id === post.providerId);
            const saved = isSavedPost(post.id);
            const comments = postComments[post.id] || [];
            const isCommentsOpen = activeCommentPostId === post.id;

            return (
              <article
                key={post.id}
                className="rounded-xl bg-[#141416] border border-[#29292D] p-4 space-y-3"
              >
                {/* Provider Avatar, Name, Time, Verification */}
                <div className="flex items-start justify-between gap-3">
                  <div
                    className="flex items-center gap-2.5 cursor-pointer"
                    onClick={() => prov && onOpenProfile(prov)}
                  >
                    <img
                      src={post.providerLogo}
                      alt={post.providerName}
                      className="w-10 h-10 rounded-lg object-cover border border-[#29292D] shrink-0"
                    />
                    <div>
                      <div className="flex items-center gap-1">
                        <h3 className="font-semibold text-xs text-[#F5F5F5] hover:text-[#D99A24] transition-colors">
                          {post.providerName}
                        </h3>
                        {prov?.isVerified && (
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#D99A24] shrink-0" />
                        )}
                      </div>
                      <p className="text-[11px] text-[#A1A1AA]">
                        {new Date(post.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>

                  {post.promotionTag && (
                    <span className="px-2 py-0.5 rounded text-[10px] font-medium bg-[#19191C] border border-[#29292D] text-[#D99A24]">
                      {post.promotionTag}
                    </span>
                  )}
                </div>

                {/* Post Body */}
                <p className="text-xs sm:text-sm text-[#F5F5F5] leading-relaxed whitespace-pre-line">
                  {post.content}
                </p>

                {/* Service/Price Information Banner */}
                {post.price && (
                  <div className="flex items-center justify-between p-2.5 rounded-lg bg-[#19191C] border border-[#29292D] text-xs">
                    <span className="text-[#A1A1AA]">Price Offer</span>
                    <span className="font-semibold text-[#F5F5F5]">
                      ₦{post.price.toLocaleString()}
                    </span>
                  </div>
                )}

                {/* Post Image */}
                {post.imageUrl && (
                  <div className="rounded-lg overflow-hidden border border-[#29292D] bg-[#19191C]">
                    <img
                      src={post.imageUrl}
                      alt="Post visual"
                      className="w-full max-h-80 object-cover"
                      loading="lazy"
                    />
                  </div>
                )}

                {/* Actions: Like | Comment | Save | Share (Section 14) */}
                <div className="flex items-center justify-between pt-2 border-t border-[#29292D]/70 text-xs text-[#A1A1AA]">
                  <div className="flex items-center gap-4">
                    {/* Like */}
                    <button
                      onClick={() => likePost(post.id)}
                      className={`flex items-center gap-1.5 transition-colors ${
                        post.isLiked ? 'text-rose-500 font-semibold' : 'hover:text-rose-400'
                      }`}
                    >
                      <Heart className={`w-4 h-4 ${post.isLiked ? 'fill-rose-500' : ''}`} />
                      <span>{post.likesCount}</span>
                    </button>

                    {/* Comment */}
                    <button
                      onClick={() =>
                        setActiveCommentPostId(isCommentsOpen ? null : post.id)
                      }
                      className="flex items-center gap-1.5 hover:text-[#F5F5F5] transition-colors"
                    >
                      <MessageCircle className="w-4 h-4" />
                      <span>{comments.length}</span>
                    </button>

                    {/* Save */}
                    <button
                      onClick={() => toggleSavePost(post.id)}
                      className={`flex items-center gap-1.5 transition-colors ${
                        saved ? 'text-[#D99A24] font-semibold' : 'hover:text-[#F5F5F5]'
                      }`}
                      title={saved ? 'Remove from saved' : 'Save post'}
                    >
                      <Bookmark className={`w-4 h-4 ${saved ? 'fill-[#D99A24]' : ''}`} />
                      <span className="hidden sm:inline">Save</span>
                    </button>
                  </div>

                  <div className="flex items-center gap-2">
                    {/* Share */}
                    <button
                      onClick={() => handleShare(post)}
                      className="p-1.5 rounded-md hover:text-[#F5F5F5] transition-colors"
                      title="Share post"
                    >
                      <Share2 className="w-4 h-4" />
                    </button>

                    {/* Provider Profile shortcut */}
                    {prov && (
                      <button
                        onClick={() => onOpenProfile(prov)}
                        className="px-2.5 py-1 rounded-md bg-[#19191C] hover:bg-[#222226] border border-[#29292D] text-[11px] font-medium text-[#F5F5F5] transition-colors"
                      >
                        View Business
                      </button>
                    )}
                  </div>
                </div>

                {/* Comment Section (Collapsible) */}
                {isCommentsOpen && (
                  <div className="pt-3 border-t border-[#29292D] space-y-2.5">
                    {/* Comments List */}
                    {comments.length > 0 ? (
                      <div className="space-y-2">
                        {comments.map((c, i) => (
                          <div
                            key={i}
                            className="p-2 rounded-md bg-[#19191C] text-xs space-y-0.5"
                          >
                            <div className="flex items-center justify-between text-[#A1A1AA] text-[10px]">
                              <span className="font-semibold text-[#F5F5F5]">{c.user}</span>
                              <span>{c.time}</span>
                            </div>
                            <p className="text-[#F5F5F5]">{c.text}</p>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-[11px] text-[#A1A1AA]">No comments yet. Be the first!</p>
                    )}

                    {/* Add Comment Input */}
                    <div className="flex items-center gap-2 pt-1">
                      <input
                        type="text"
                        value={commentInputs[post.id] || ''}
                        onChange={(e) =>
                          setCommentInputs((prev) => ({
                            ...prev,
                            [post.id]: e.target.value
                          }))
                        }
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') handleAddComment(post.id);
                        }}
                        placeholder="Write a comment..."
                        className="flex-1 h-8 px-3 rounded-md bg-[#0B0B0D] border border-[#29292D] text-xs text-[#F5F5F5] focus:border-[#3F3F46]"
                      />
                      <button
                        onClick={() => handleAddComment(post.id)}
                        className="p-2 rounded-md bg-[#F5F5F5] text-[#0B0B0D] hover:bg-white"
                      >
                        <Send className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                )}
              </article>
            );
          })
        )}
      </div>
    </div>
  );
};
