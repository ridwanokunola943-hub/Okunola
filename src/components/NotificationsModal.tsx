import React from 'react';
import { useApp } from '../context/AppContext';
import { Bell, X, ShoppingBag, Calendar, MessageSquare } from 'lucide-react';

interface NotificationsModalProps {
  onClose: () => void;
  setActiveView: (view: string) => void;
}

export const NotificationsModal: React.FC<NotificationsModalProps> = ({
  onClose,
  setActiveView
}) => {
  const { notifications } = useApp();

  const getNotifIcon = (type: string) => {
    switch (type) {
      case 'order':
        return <ShoppingBag className="w-3.5 h-3.5 text-[#D99A24]" />;
      case 'booking':
        return <Calendar className="w-3.5 h-3.5 text-[#10B981]" />;
      case 'message':
        return <MessageSquare className="w-3.5 h-3.5 text-cyan-400" />;
      default:
        return <Bell className="w-3.5 h-3.5 text-[#A1A1AA]" />;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs animate-in zoom-in-95 duration-150">
      <div className="bg-[#141416] border border-[#29292D] rounded-xl w-full max-w-sm p-5 shadow-2xl space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-[#29292D]">
          <div className="flex items-center gap-2">
            <Bell className="w-4 h-4 text-[#D99A24]" />
            <h3 className="font-heading font-semibold text-sm text-[#F5F5F5]">
              Notifications
            </h3>
          </div>
          <button onClick={onClose} className="p-1 text-[#A1A1AA] hover:text-[#F5F5F5]">
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="space-y-2 max-h-80 overflow-y-auto pr-1">
          {notifications.length === 0 ? (
            <div className="py-8 text-center text-xs text-[#A1A1AA]">
              No new notifications.
            </div>
          ) : (
            notifications.map((n) => (
              <div
                key={n.id}
                className="p-3 rounded-lg bg-[#19191C] border border-[#29292D] flex items-start gap-2.5"
              >
                <div className="p-1.5 rounded-md bg-[#141416] border border-[#29292D] shrink-0 mt-0.5">
                  {getNotifIcon(n.type)}
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-medium text-xs text-[#F5F5F5]">{n.title}</h4>
                  <p className="text-xs text-[#A1A1AA] leading-relaxed mt-0.5">{n.body}</p>
                  <span className="text-[10px] text-[#A1A1AA]/70 block mt-1">
                    {new Date(n.createdAt).toLocaleTimeString([], {
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </span>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="pt-2 border-t border-[#29292D] flex justify-end">
          <button
            onClick={onClose}
            className="px-3 py-1.5 rounded-md bg-[#19191C] border border-[#29292D] text-xs text-[#F5F5F5] hover:border-[#3F3F46]"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
