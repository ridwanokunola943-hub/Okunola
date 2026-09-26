import React from 'react';
import { useApp } from '../context/AppContext';
import { Home, Search, Plus, MessageSquare, User as UserIcon } from 'lucide-react';

interface BottomNavProps {
  activeView: string;
  setActiveView: (view: string) => void;
  onOpenCreatePost: () => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({
  activeView,
  setActiveView,
  onOpenCreatePost
}) => {
  const { messages, currentUser } = useApp();

  // Count unread messages
  const unreadMessagesCount = messages.filter(
    (m) => m.recipientId === currentUser?.id && !m.read
  ).length || 2;

  return (
    <nav
      id="mobile-bottom-nav"
      className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#12141A]/95 backdrop-blur-md border-t border-[#232734] px-2 py-1.5"
    >
      <div className="flex items-center justify-around max-w-md mx-auto">
        {/* Home */}
        <button
          id="nav-home-btn"
          onClick={() => setActiveView('home')}
          className={`flex flex-col items-center gap-1 py-1 px-3 rounded-lg transition-colors ${
            activeView === 'home' ? 'text-[#F5A623]' : 'text-[#8E95A5] hover:text-[#F5F5F5]'
          }`}
        >
          <Home className="w-5 h-5" />
          <span className="text-[10px] font-medium">Home</span>
        </button>

        {/* Search */}
        <button
          id="nav-search-btn"
          onClick={() => setActiveView('discover')}
          className={`flex flex-col items-center gap-1 py-1 px-3 rounded-lg transition-colors ${
            activeView === 'discover' ? 'text-[#F5A623]' : 'text-[#8E95A5] hover:text-[#F5F5F5]'
          }`}
        >
          <Search className="w-5 h-5" />
          <span className="text-[10px] font-medium">Search</span>
        </button>

        {/* Center Raised Golden Post Button (Mockup Design!) */}
        <button
          id="nav-create-btn"
          onClick={onOpenCreatePost}
          className="flex flex-col items-center -mt-5 group"
          aria-label="Create Post"
        >
          <div className="w-12 h-12 rounded-full bg-[#F5A623] hover:bg-[#E59819] text-black shadow-lg shadow-[#F5A623]/25 flex items-center justify-center transition-transform active:scale-95">
            <Plus className="w-6 h-6 stroke-[2.5]" />
          </div>
          <span className="text-[10px] font-semibold text-[#F5A623] mt-0.5">Post</span>
        </button>

        {/* Messages */}
        <button
          id="nav-messages-btn"
          onClick={() => setActiveView('chat')}
          className={`relative flex flex-col items-center gap-1 py-1 px-3 rounded-lg transition-colors ${
            activeView === 'chat' ? 'text-[#F5A623]' : 'text-[#8E95A5] hover:text-[#F5F5F5]'
          }`}
        >
          <MessageSquare className="w-5 h-5" />
          {unreadMessagesCount > 0 && (
            <span className="absolute top-0.5 right-2 w-4 h-4 rounded-full bg-[#F5A623] text-black text-[9px] font-bold flex items-center justify-center shadow-xs">
              {unreadMessagesCount}
            </span>
          )}
          <span className="text-[10px] font-medium">Messages</span>
        </button>

        {/* Account */}
        <button
          id="nav-account-btn"
          onClick={() => setActiveView('profile')}
          className={`flex flex-col items-center gap-1 py-1 px-3 rounded-lg transition-colors ${
            activeView === 'profile' ? 'text-[#F5A623]' : 'text-[#8E95A5] hover:text-[#F5F5F5]'
          }`}
        >
          <UserIcon className="w-5 h-5" />
          <span className="text-[10px] font-medium">Account</span>
        </button>
      </div>
    </nav>
  );
};
