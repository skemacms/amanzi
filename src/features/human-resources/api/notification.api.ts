import type { Notification, UnreadCount, MarkAllReadResult } from '../types/notification';
import { mockNotifications } from '../mock/data';

/** Liste les notifications de l'utilisateur courant. */
export async function getNotifications(): Promise<Notification[]> {
  // TODO: connecter au backend GraphQL — query { notifications }
  return mockNotifications;
}

/** Compte les notifications non lues. */
export async function getUnreadNotificationCount(): Promise<UnreadCount> {
  // TODO: connecter au backend GraphQL — query { unreadNotificationCount }
  const count = mockNotifications.filter((n) => !n.isRead).length;
  return { count };
}

/** Marque une notification comme lue. */
export async function markNotificationAsRead(_id: string): Promise<Notification> {
  // TODO: connecter au backend GraphQL — mutation markNotificationAsRead
  const found = mockNotifications.find((n) => n.id === _id);
  if (!found) throw new Error(`Notification ${_id} introuvable`);
  return { ...found, isRead: true };
}

/** Marque toutes les notifications comme lues. */
export async function markAllNotificationsAsRead(): Promise<MarkAllReadResult> {
  // TODO: connecter au backend GraphQL — mutation markAllNotificationsAsRead
  return { success: true };
}
