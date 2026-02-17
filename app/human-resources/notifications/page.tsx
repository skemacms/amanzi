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
    <div className="p-8">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-stone-900">Notifications</h1>
          <p className="mt-1 text-sm text-stone-500">
            {unreadCount > 0 ? `${unreadCount} non lue(s)` : 'Toutes lues'}
          </p>
        </div>
        {unreadCount > 0 && (
          <button
            onClick={markAllAsRead}
            className="inline-flex items-center gap-2 rounded-xl bg-white px-4 py-2 text-sm font-medium text-stone-700 hover:bg-stone-100"
          >
            <CheckCheck className="h-4 w-4" />
            Tout marquer comme lu
          </button>
        )}
      </div>

      <div className="space-y-3">
        {notifications.map((notif) => (
          <div
            key={notif.id}
            className={`flex items-start gap-4 rounded-2xl bg-white p-5 transition-all ${
              !notif.isRead ? 'bg-teal-50/50' : ''
            }`}
          >
            <div className="mt-0.5 shrink-0">
              {notif.isRead ? (
                <Bell className="h-5 w-5 text-stone-400" />
              ) : (
                <Circle className="h-5 w-5 fill-teal-500 text-teal-500" />
              )}
            </div>
            <div className="flex-1">
              <div className="mb-1 flex items-center gap-2">
                <span className="rounded-md bg-stone-100 px-2 py-0.5 text-xs font-medium text-stone-500">
                  {NOTIFICATION_TYPE_LABELS[notif.type]}
                </span>
                <span className="text-xs text-stone-400">
                  {new Date(notif.createdAt).toLocaleDateString('fr-FR', {
                    day: '2-digit',
                    month: 'long',
                    year: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </span>
              </div>
              <h3 className="text-sm font-semibold">{notif.title}</h3>
              <p className="mt-0.5 text-sm text-stone-500">{notif.message}</p>
            </div>
            {!notif.isRead && (
              <button
                onClick={() => markAsRead(notif.id)}
                className="shrink-0 rounded-lg bg-stone-100 px-3 py-1.5 text-xs font-medium text-stone-600 hover:bg-stone-200"
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
