import React from 'react';
import { 
  Bell, 
  X, 
  CheckCheck, 
  Trash2, 
  ShieldCheck, 
  MessageSquare, 
  Calculator, 
  BookOpen, 
  Building2,
  Info
} from 'lucide-react';
import { AppNotification, AppLanguage } from '../types';

interface NotificationCenterProps {
  notifications: AppNotification[];
  isOpen: boolean;
  onClose: () => void;
  onMarkAllRead: () => void;
  onClearAll: () => void;
  onNotificationClick: (notif: AppNotification) => void;
  language: AppLanguage;
}

export const NotificationCenter: React.FC<NotificationCenterProps> = ({
  notifications,
  isOpen,
  onClose,
  onMarkAllRead,
  onClearAll,
  onNotificationClick,
  language,
}) => {
  if (!isOpen) return null;

  const unreadCount = notifications.filter((n) => !n.read).length;

  const getIcon = (type: AppNotification['type']) => {
    switch (type) {
      case 'chat':
        return <MessageSquare className="w-4 h-4 text-blue-500" />;
      case 'security':
        return <ShieldCheck className="w-4 h-4 text-emerald-500" />;
      case 'finance':
        return <Calculator className="w-4 h-4 text-amber-500" />;
      case 'diary':
        return <BookOpen className="w-4 h-4 text-purple-500" />;
      case 'bank':
        return <Building2 className="w-4 h-4 text-indigo-500" />;
      default:
        return <Info className="w-4 h-4 text-slate-500" />;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-end p-4 sm:p-6 bg-slate-900/40 backdrop-blur-xs animate-in fade-in">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl w-full max-w-sm shadow-2xl overflow-hidden mt-12 sm:mt-14 mr-0 sm:mr-4">
        
        {/* Header */}
        <div className="p-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-slate-50/70 dark:bg-slate-950/50">
          <div className="flex items-center gap-2">
            <Bell className="w-4.5 h-4.5 text-blue-600 dark:text-blue-400" />
            <h3 className="font-bold text-slate-900 dark:text-white text-sm">
              {language === 'bn' ? 'রিয়েল-টাইম নোটিফিকেশন' : 'Notifications'}
            </h3>
            {unreadCount > 0 && (
              <span className="px-2 py-0.2 rounded-full bg-blue-600 text-white text-[10px] font-extrabold">
                {unreadCount}
              </span>
            )}
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Quick Toolbar */}
        <div className="px-4 py-2 bg-slate-50/40 dark:bg-slate-900/80 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between text-[11px]">
          <button
            onClick={onMarkAllRead}
            className="text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1 font-semibold"
          >
            <CheckCheck className="w-3.5 h-3.5" />
            <span>{language === 'bn' ? 'সব পঠিত হিসেবে চিহ্নিত করুন' : 'Mark all as read'}</span>
          </button>
          <button
            onClick={onClearAll}
            className="text-slate-400 hover:text-rose-500 flex items-center gap-1"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>{language === 'bn' ? 'সব মুছুন' : 'Clear all'}</span>
          </button>
        </div>

        {/* Notifications List */}
        <div className="max-h-[60vh] overflow-y-auto divide-y divide-slate-100 dark:divide-slate-800/80">
          {notifications.length === 0 ? (
            <div className="p-8 text-center text-xs text-slate-400">
              {language === 'bn' ? 'কোনো নতুন নোটিফিকেশন নেই' : 'No notifications yet'}
            </div>
          ) : (
            notifications.map((notif) => (
              <div
                key={notif.id}
                onClick={() => onNotificationClick(notif)}
                className={`p-3.5 text-xs transition-colors cursor-pointer flex items-start gap-3 ${
                  notif.read
                    ? 'hover:bg-slate-50 dark:hover:bg-slate-800/50 opacity-75'
                    : 'bg-blue-50/40 dark:bg-blue-950/20 hover:bg-blue-50 dark:hover:bg-blue-950/40'
                }`}
              >
                <div className="p-2 rounded-xl bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700/80 shadow-xs shrink-0">
                  {getIcon(notif.type)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-1 mb-0.5">
                    <h4 className="font-bold text-slate-900 dark:text-white truncate">
                      {notif.title}
                    </h4>
                    <span className="text-[10px] text-slate-400 shrink-0">{notif.timestamp}</span>
                  </div>
                  <p className="text-slate-600 dark:text-slate-300 line-clamp-2 leading-relaxed text-[11px]">
                    {notif.message}
                  </p>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="p-2.5 border-t border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/50 text-center text-[10px] text-slate-400">
          {language === 'bn' ? 'রিয়েল-টাইম সিস্টেম নোটিফিকেশন সক্রিয়' : 'Real-time alert notifications active'}
        </div>
      </div>
    </div>
  );
};
