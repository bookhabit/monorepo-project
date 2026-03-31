import { atom } from 'jotai';
import { Notification } from '../types/notification';

// Real-time notifications from SSE
export const realtimeNotificationsAtom = atom<Notification[]>([]);

// Unread count
export const unreadCountAtom = atom((get) => {
  const notifications = get(realtimeNotificationsAtom);
  return notifications.filter((n) => !n.isRead).length;
});

// Add notification to real-time list
export const addNotificationAtom = atom(null, (get, set, notification: Notification) => {
  const current = get(realtimeNotificationsAtom);
  // Add to beginning of list
  set(realtimeNotificationsAtom, [notification, ...current]);
});

// Mark notification as read
export const markNotificationReadAtom = atom(null, (get, set, notificationId: string) => {
  const current = get(realtimeNotificationsAtom);
  set(
    realtimeNotificationsAtom,
    current.map((n) => (n.id === notificationId ? { ...n, isRead: true } : n))
  );
});

// Mark all as read
export const markAllReadAtom = atom(null, (get, set) => {
  const current = get(realtimeNotificationsAtom);
  set(
    realtimeNotificationsAtom,
    current.map((n) => ({ ...n, isRead: true }))
  );
});

// Delete notification
export const deleteNotificationAtom = atom(null, (get, set, notificationId: string) => {
  const current = get(realtimeNotificationsAtom);
  set(
    realtimeNotificationsAtom,
    current.filter((n) => n.id !== notificationId)
  );
});
