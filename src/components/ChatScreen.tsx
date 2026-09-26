import React, { useState, useEffect, useRef } from 'react';
import { useApp } from '../context/AppContext';
import {
  Send,
  Phone,
  AlertTriangle,
  CheckCheck,
  ArrowLeft,
  CheckCircle2,
  MessageSquare
} from 'lucide-react';

interface ChatScreenProps {
  onOpenReport: (targetType: string, targetId: string, targetName: string) => void;
  onOpenProfile: (provider: any) => void;
}

export const ChatScreen: React.FC<ChatScreenProps> = ({
  onOpenReport,
  onOpenProfile
}) => {
  const {
    currentUser,
    providers,
    messages,
    sendMessage,
    activeChatRecipientId,
    setActiveChatRecipientId,
    markMessagesAsRead
  } = useApp();

  const [inputMessage, setInputMessage] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Preset quick questions for Malete
  const PRESET_QUESTIONS = [
    'Is home service available today?',
    'Can you come to Safari Hostel?',
    'How long does this take?'
  ];

  // Active provider
  const activeProvider = providers.find(
    (p) => p.id === activeChatRecipientId || p.ownerId === activeChatRecipientId
  );

  // Conversations list
  const conversations = providers
    .map((prov) => {
      const thread = messages.filter(
        (m) =>
          (m.senderId === currentUser?.id &&
            (m.recipientId === prov.id || m.recipientId === prov.ownerId)) ||
          ((m.senderId === prov.id || m.senderId === prov.ownerId) &&
            m.recipientId === currentUser?.id)
      );
      const lastMsg = thread[thread.length - 1];
      const unread = thread.filter(
        (m) => m.recipientId === currentUser?.id && !m.read
      ).length;
      return {
        provider: prov,
        lastMsg,
        unread,
        lastTime: lastMsg ? new Date(lastMsg.createdAt).getTime() : 0
      };
    })
    .filter((c) => c.lastMsg || c.provider.id === activeChatRecipientId)
    .sort((a, b) => b.lastTime - a.lastTime);

  // Active thread messages
  const activeMessages =
    activeChatRecipientId && currentUser
      ? messages.filter(
          (m) =>
            (m.senderId === currentUser.id &&
              (m.recipientId === activeChatRecipientId ||
                (activeProvider && m.recipientId === activeProvider.ownerId))) ||
            ((m.senderId === activeChatRecipientId ||
              (activeProvider && m.senderId === activeProvider.id)) &&
              m.recipientId === currentUser.id)
        )
      : [];

  useEffect(() => {
    if (activeChatRecipientId) {
      markMessagesAsRead(activeChatRecipientId);
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [activeChatRecipientId, activeMessages.length]);

  const handleSendMessage = (textToSend?: string) => {
    const text = (textToSend || inputMessage).trim();
    if (!text || !activeChatRecipientId) return;

    sendMessage(activeChatRecipientId, text);
    setInputMessage('');
  };

  return (
    <div
      id="bigridz-chat-screen"
      className="pb-20 pt-2 px-3 sm:px-4 max-w-5xl mx-auto h-[calc(100vh-120px)] flex flex-col"
    >
      <div className="bg-[#141416] border border-[#29292D] rounded-xl overflow-hidden shadow-xl flex-1 flex flex-col md:flex-row">
        {/* Conversations List (Sidebar on desktop) */}
        <div
          className={`w-full md:w-72 border-r border-[#29292D] flex flex-col bg-[#141416] ${
            activeChatRecipientId ? 'hidden md:flex' : 'flex'
          }`}
        >
          <div className="p-3 border-b border-[#29292D]">
            <h2 className="font-heading font-semibold text-sm text-[#F5F5F5]">
              Messages
            </h2>
          </div>

          <div className="flex-1 overflow-y-auto divide-y divide-[#29292D]/60">
            {conversations.length === 0 ? (
              <div className="p-6 text-center text-xs text-[#A1A1AA]">
                <MessageSquare className="w-8 h-8 mx-auto text-[#29292D] mb-2" />
                <p>No conversations yet.</p>
                <p className="mt-1 text-[11px]">Chat with any provider to ask questions or confirm details.</p>
              </div>
            ) : (
              conversations.map(({ provider, lastMsg, unread }) => {
                const isSelected = activeChatRecipientId === provider.id;
                return (
                  <button
                    key={provider.id}
                    onClick={() => setActiveChatRecipientId(provider.id)}
                    className={`w-full p-3 text-left flex items-start gap-3 transition-colors ${
                      isSelected
                        ? 'bg-[#19191C]'
                        : 'hover:bg-[#19191C]/60'
                    }`}
                  >
                    <img
                      src={provider.logoUrl}
                      alt={provider.businessName}
                      className="w-10 h-10 rounded-lg object-cover border border-[#29292D] shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <span className="font-medium text-xs text-[#F5F5F5] truncate">
                          {provider.businessName}
                        </span>
                        {lastMsg && (
                          <span className="text-[10px] text-[#A1A1AA]">
                            {new Date(lastMsg.createdAt).toLocaleTimeString([], {
                              hour: '2-digit',
                              minute: '2-digit'
                            })}
                          </span>
                        )}
                      </div>

                      <p className="text-xs text-[#A1A1AA] truncate mt-0.5">
                        {lastMsg ? lastMsg.text : 'Start chatting...'}
                      </p>
                    </div>

                    {unread > 0 && (
                      <span className="w-2 h-2 rounded-full bg-[#D99A24] shrink-0 mt-1" />
                    )}
                  </button>
                );
              })
            )}
          </div>
        </div>

        {/* Chat Conversation Area */}
        <div
          className={`flex-1 flex flex-col bg-[#0B0B0D] ${
            !activeChatRecipientId ? 'hidden md:flex' : 'flex'
          }`}
        >
          {activeProvider ? (
            <>
              {/* Top Chat Header */}
              <div className="p-3 border-b border-[#29292D] bg-[#141416] flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <button
                    onClick={() => setActiveChatRecipientId(null)}
                    className="md:hidden p-1 text-[#A1A1AA] hover:text-[#F5F5F5]"
                  >
                    <ArrowLeft className="w-4 h-4" />
                  </button>

                  <img
                    src={activeProvider.logoUrl}
                    alt={activeProvider.businessName}
                    className="w-8 h-8 rounded-md object-cover border border-[#29292D] cursor-pointer"
                    onClick={() => onOpenProfile(activeProvider)}
                  />

                  <div>
                    <div
                      className="flex items-center gap-1 cursor-pointer"
                      onClick={() => onOpenProfile(activeProvider)}
                    >
                      <h3 className="font-semibold text-xs text-[#F5F5F5]">
                        {activeProvider.businessName}
                      </h3>
                      {activeProvider.isVerified && (
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#D99A24]" />
                      )}
                    </div>
                    <span className="text-[10px] text-[#10B981] flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#10B981]" />
                      Active in Malete
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-1">
                  <a
                    href={`tel:${activeProvider.phone}`}
                    className="p-1.5 rounded-md hover:bg-[#19191C] text-[#A1A1AA] hover:text-[#F5F5F5]"
                    title="Call provider"
                  >
                    <Phone className="w-4 h-4" />
                  </a>

                  <button
                    onClick={() =>
                      onOpenReport('provider', activeProvider.id, activeProvider.businessName)
                    }
                    className="p-1.5 rounded-md hover:bg-[#19191C] text-[#A1A1AA] hover:text-rose-400"
                    title="Report provider"
                  >
                    <AlertTriangle className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Messages Feed */}
              <div className="flex-1 p-4 overflow-y-auto space-y-3">
                {activeMessages.length === 0 ? (
                  <div className="text-center py-10 space-y-2 text-xs text-[#A1A1AA]">
                    <p>No messages yet with {activeProvider.businessName}.</p>
                    <p className="text-[11px]">Ask about home service, prices, or availability.</p>
                  </div>
                ) : (
                  activeMessages.map((msg) => {
                    const isMe = msg.senderId === currentUser?.id;
                    return (
                      <div
                        key={msg.id}
                        className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}
                      >
                        <div
                          className={`max-w-[75%] p-3 rounded-lg text-xs leading-relaxed space-y-1 ${
                            isMe
                              ? 'bg-[#19191C] border border-[#29292D] text-[#F5F5F5]'
                              : 'bg-[#141416] border border-[#29292D] text-[#F5F5F5]'
                          }`}
                        >
                          <p>{msg.text}</p>
                          <div
                            className={`flex items-center gap-1 text-[10px] text-[#A1A1AA] ${
                              isMe ? 'justify-end' : 'justify-start'
                            }`}
                          >
                            <span>
                              {new Date(msg.createdAt).toLocaleTimeString([], {
                                hour: '2-digit',
                                minute: '2-digit'
                              })}
                            </span>
                            {isMe && <CheckCheck className="w-3 h-3 text-[#D99A24]" />}
                          </div>
                        </div>
                      </div>
                    );
                  })
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Preset Inquiry Chips */}
              <div className="px-3 py-1.5 border-t border-[#29292D]/60 flex items-center gap-1.5 overflow-x-auto scrollbar-none bg-[#0B0B0D]">
                {PRESET_QUESTIONS.map((q) => (
                  <button
                    key={q}
                    onClick={() => handleSendMessage(q)}
                    className="shrink-0 px-2 py-1 rounded-md bg-[#141416] border border-[#29292D] hover:border-[#3F3F46] text-[11px] text-[#A1A1AA] hover:text-[#F5F5F5] transition-colors"
                  >
                    {q}
                  </button>
                ))}
              </div>

              {/* Message Input Form */}
              <div className="p-3 border-t border-[#29292D] bg-[#141416]">
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleSendMessage();
                  }}
                  className="flex items-center gap-2"
                >
                  <input
                    type="text"
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    placeholder={`Message ${activeProvider.businessName}...`}
                    className="flex-1 h-10 px-3 rounded-lg bg-[#0B0B0D] border border-[#29292D] text-xs text-[#F5F5F5] focus:border-[#3F3F46]"
                  />

                  <button
                    type="submit"
                    disabled={!inputMessage.trim()}
                    className="h-10 px-4 rounded-lg bg-[#F5F5F5] text-[#0B0B0D] hover:bg-white text-xs font-semibold disabled:opacity-40 transition-opacity flex items-center justify-center gap-1.5"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">Send</span>
                  </button>
                </form>
              </div>
            </>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center p-6 text-center text-xs text-[#A1A1AA]">
              <MessageSquare className="w-10 h-10 text-[#29292D] mb-2" />
              <p className="text-sm font-semibold text-[#F5F5F5]">Select a conversation</p>
              <p className="mt-1 text-[11px]">Or browse providers and tap "Chat" to begin.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
