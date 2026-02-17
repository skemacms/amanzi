'use client';

import { useState, useRef, useEffect } from 'react';
import { Bell, MessageSquare, CheckSquare, AlertCircle, CheckCheck } from 'lucide-react';
import { useNotifications, type NotifCategory } from '@/core/stores/notification-store';

const tabs: { key: NotifCategory | 'all'; label: string; icon: typeof Bell }[] = [
  { key: 'all', label: 'Tout', icon: Bell },
  { key: 'alert', label: 'Alertes', icon: AlertCircle },
  { key: 'message', label: 'Messages', icon: MessageSquare },
  { key: 'task', label: 'Taches', icon: CheckSquare },
];

const categoryIcons: Record<NotifCategory, typeof Bell> = {
  alert: AlertCircle,
  message: MessageSquare,
  task: CheckSquare,
};

const categoryColors: Record<NotifCategory, string> = {
  alert: 'text-amber-500',
  message: 'text-sky-500',
  task: 'text-teal-500',
};

export function NotificationPanel() {
  const [open, setOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<NotifCategory | 'all'>('all');
  const ref = useRef<HTMLDivElement>(null);
  const { notifications, unreadCount, markAsRead, markAllAsRead } = useNotifications();

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    if (open) document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [open]);

  const filtered = activeTab === 'all'
    ? notifications
    : notifications.filter((n) => n.category === activeTab);

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen(!open)}
        className="relative flex h-8 w-8 items-center justify-center rounded-md text-navbar-foreground/70 transition-colors hover:bg-navbar-foreground/10 hover:text-navbar-foreground"
        aria-label="Notifications"
      >
        <Bell className="h-[18px] w-[18px]" />
        {unreadCount > 0 && (
          <span className="absolute -right-0.5 -top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-red-500 px-1 text-[10px] font-bold text-white">
            {unreadCount}
          </span>
        )}
      </button>

      {open && (
        <div className="absolute right-0 top-full mt-2 w-96 rounded-lg border bg-card shadow-xl z-50">
          {/* Header */}
          <div className="flex items-center justify-between border-b px-4 py-3">
            <h3 className="text-sm font-semibold text-foreground">Notifications</h3>
            {unreadCount > 0 && (
              <button
                onClick={markAllAsRead}
                className="flex items-center gap-1 text-xs font-medium text-accent hover:underline"
              >
                <CheckCheck className="h-3.5 w-3.5" />
                Tout marquer lu
              </button>
            )}
          </div>

          {/* Tabs */}
          <div className="flex border-b px-2">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key)}
                  className={`flex items-center gap-1 px-3 py-2 text-xs font-medium border-b-2 transition-colors ${
                    activeTab === tab.key
                      ? 'border-accent text-accent'
                      : 'border-transparent text-muted-foreground hover:text-foreground'
                  }`}
                >
                  <Icon className="h-3.5 w-3.5" />
                  {tab.label}
                </button>
              );
            })}
          </div>

          {/* List */}
          <div className="max-h-80 overflow-y-auto">
            {filtered.length === 0 ? (
              <div className="px-4 py-8 text-center text-sm text-muted-foreground">
                Aucune notification
              </div>
            ) : (
              filtered.map((notif) => {
                const Icon = categoryIcons[notif.category];
                return (
                  <button
                    key={notif.id}
                    onClick={() => markAsRead(notif.id)}
                    className={`flex w-full items-start gap-3 px-4 py-3 text-left transition-colors hover:bg-muted/50 ${
                      !notif.isRead ? 'bg-accent/5' : ''
                    }`}
                  >
                    <Icon className={`mt-0.5 h-4 w-4 shrink-0 ${categoryColors[notif.category]}`} />
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <span className={`text-xs font-semibold ${!notif.isRead ? 'text-foreground' : 'text-muted-foreground'}`}>
                          {notif.title}
                        </span>
                        {!notif.isRead && (
                          <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                        )}
                      </div>
                      <p className="mt-0.5 text-[11px] leading-relaxed text-muted-foreground line-clamp-2">
                        {notif.description}
                      </p>
                      <p className="mt-1 text-[10px] text-muted-foreground/60">
                        {new Date(notif.time).toLocaleDateString('fr-FR', {
                          day: '2-digit',
                          month: 'short',
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </p>
                    </div>
                  </button>
                );
              })
            )}
          </div>
        </div>
      )}
    </div>
  );
}
