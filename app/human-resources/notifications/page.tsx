'use client';

import { useState } from 'react';
import { Bell, CheckCheck, Circle } from 'lucide-react';
import { mockNotifications } from '@/features/human-resources/mock/data';
import { NOTIFICATION_TYPE_LABELS } from '@/core/types/enums';
import type { Notification } from '@/features/human-resources/types/notification';

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<Notification[]>(mockNotifications);

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  const markAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, isRead: true } : n)),
    );
  };

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
  };

  return (
    <div className="px-6 py-6">
      <div className="mb-5 flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-foreground">Notifications</h1>
          <p className="mt-0.5 text-sm text-muted-foreground">
            {unreadCount > 0 ? `${unreadCount} non lue(s)` : 'Toutes lues'}
          </p>
        </div>
        {unreadCount > 0 && (
          <button
            onClick={markAllAsRead}
            className="inline-flex items-center gap-2 rounded-md border bg-card px-3 py-2 text-sm font-medium text-foreground hover:bg-muted"
          >
            <CheckCheck className="h-4 w-4" />
            Tout marquer comme lu
          </button>
        )}
      </div>

      <div className="space-y-2">
        {notifications.map((notif) => (
          <div
            key={notif.id}
            className={`flex items-start gap-4 rounded-lg border bg-card p-4 transition-all ${
              !notif.isRead ? 'border-accent/20 bg-accent/5' : ''
            }`}
          >
            <div className="mt-0.5 shrink-0">
              {notif.isRead ? (
                <Bell className="h-5 w-5 text-muted-foreground" />
              ) : (
                <Circle className="h-5 w-5 fill-accent text-accent" />
              )}
            </div>
            <div className="flex-1">
              <div className="mb-1 flex items-center gap-2">
                <span className="rounded-md bg-muted px-2 py-0.5 text-[10px] font-medium text-muted-foreground">
                  {NOTIFICATION_TYPE_LABELS[notif.type]}
                </span>
                <span className="text-xs text-muted-foreground">
                  {new Date(notif.createdAt).toLocaleDateString('fr-FR', {
                    day: '2-digit',
                    month: 'long',
                    year: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </span>
              </div>
              <h3 className="text-sm font-semibold text-foreground">{notif.title}</h3>
              <p className="mt-0.5 text-sm text-muted-foreground">{notif.message}</p>
            </div>
            {!notif.isRead && (
              <button
                onClick={() => markAsRead(notif.id)}
                className="shrink-0 rounded-md bg-muted px-3 py-1.5 text-xs font-medium text-foreground hover:bg-muted/80"
              >
                Marquer lu
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
