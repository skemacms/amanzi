import type { NotificationType } from '@/core/types/enums';

/** Miroir de NotificationModel côté backend. */
export interface Notification {
  id: string;
  companyId: string;
  userId?: string;
  type: NotificationType;
  title: string;
  message: string;
  isRead: boolean;
  scheduledAt?: string;
  sentAt?: string;
  createdAt: string;
}

/** Compteur de notifications non lues. */
export interface UnreadCount {
  count: number;
}

/** Résultat du marquage global comme lu. */
export interface MarkAllReadResult {
  success: boolean;
}
