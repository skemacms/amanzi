'use client';

import {
  createContext,
  useCallback,
  useContext,
  useState,
  type ReactNode,
} from 'react';

export type NotifCategory = 'alert' | 'message' | 'task';

export interface AppNotification {
  id: string;
  category: NotifCategory;
  title: string;
  description: string;
  time: string;
  isRead: boolean;
}

interface NotificationContextValue {
  notifications: AppNotification[];
  unreadCount: number;
  unreadByCategory: Record<NotifCategory, number>;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
}

const NotificationContext = createContext<NotificationContextValue | null>(null);

const initialNotifications: AppNotification[] = [
  {
    id: 'gn1',
    category: 'alert',
    title: 'Paiement salaire dans 5 jours',
    description: 'Le paiement des salaires est prevu pour le 25 du mois.',
    time: '2025-07-20T08:00:00Z',
    isRead: false,
  },
  {
    id: 'gn2',
    category: 'alert',
    title: 'Echeance CNSS - 10 juillet',
    description: 'Deposer les declarations CNSS avant le 10 du mois.',
    time: '2025-07-05T08:00:00Z',
    isRead: false,
  },
  {
    id: 'gn3',
    category: 'message',
    title: 'Nouveau message de Marie-Claire',
    description: 'Demande de conge pour la semaine prochaine.',
    time: '2025-07-18T10:30:00Z',
    isRead: false,
  },
  {
    id: 'gn4',
    category: 'task',
    title: 'Valider la paie de juin 2025',
    description: 'Le calcul de la paie du mois de juin est termine.',
    time: '2025-06-28T14:00:00Z',
    isRead: false,
  },
  {
    id: 'gn5',
    category: 'task',
    title: 'Mettre a jour le dossier EMP003',
    description: 'Documents manquants pour Patrick Makosso.',
    time: '2025-07-15T09:00:00Z',
    isRead: true,
  },
  {
    id: 'gn6',
    category: 'message',
    title: 'Rappel reunion RH',
    description: 'Reunion prevue demain a 10h dans la salle de conference.',
    time: '2025-07-19T16:00:00Z',
    isRead: true,
  },
];

export function NotificationProvider({ children }: { children: ReactNode }) {
  const [notifications, setNotifications] = useState<AppNotification[]>(initialNotifications);

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  const unreadByCategory = notifications.reduce(
    (acc, n) => {
      if (!n.isRead) acc[n.category]++;
      return acc;
    },
    { alert: 0, message: 0, task: 0 } as Record<NotifCategory, number>,
  );

  const markAsRead = useCallback((id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, isRead: true } : n)),
    );
  }, []);

  const markAllAsRead = useCallback(() => {
    setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
  }, []);

  return (
    <NotificationContext.Provider
      value={{ notifications, unreadCount, unreadByCategory, markAsRead, markAllAsRead }}
    >
      {children}
    </NotificationContext.Provider>
  );
}

export function useNotifications() {
  const ctx = useContext(NotificationContext);
  if (!ctx) throw new Error('useNotifications must be used within NotificationProvider');
  return ctx;
}
