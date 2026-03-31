import { useInfiniteQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchNotifications, markAsRead, markAllAsRead, deleteNotification } from '../services/notification-api';
import { toast } from 'sonner';

export function useNotifications() {
  return useInfiniteQuery({
    queryKey: ['notifications'],
    queryFn: ({ pageParam }) => fetchNotifications(pageParam),
    getNextPageParam: (lastPage) => lastPage.nextCursor,
    initialPageParam: null as string | null,
    staleTime: 30000, // 30 seconds
    gcTime: 300000, // 5 minutes
  });
}

export function useMarkAsRead() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: markAsRead,
    onMutate: async (notificationId) => {
      // Cancel outgoing refetches
      await queryClient.cancelQueries({ queryKey: ['notifications'] });

      // Snapshot previous value
      const previousData = queryClient.getQueryData(['notifications']);

      // Optimistically update
      queryClient.setQueryData(['notifications'], (old: any) => {
        if (!old) return old;

        return {
          ...old,
          pages: old.pages.map((page: any) => ({
            ...page,
            notifications: page.notifications.map((n: any) =>
              n.id === notificationId ? { ...n, isRead: true } : n
            ),
          })),
        };
      });

      return { previousData };
    },
    onError: (error, notificationId, context) => {
      // Rollback on error
      if (context?.previousData) {
        queryClient.setQueryData(['notifications'], context.previousData);
      }
      toast.error('읽음 처리에 실패했습니다.');
    },
    onSuccess: () => {
      toast.success('읽음 처리되었습니다.');
    },
  });
}

export function useMarkAllAsRead() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: markAllAsRead,
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: ['notifications'] });

      const previousData = queryClient.getQueryData(['notifications']);

      queryClient.setQueryData(['notifications'], (old: any) => {
        if (!old) return old;

        return {
          ...old,
          pages: old.pages.map((page: any) => ({
            ...page,
            notifications: page.notifications.map((n: any) => ({ ...n, isRead: true })),
          })),
        };
      });

      return { previousData };
    },
    onError: (error, variables, context) => {
      if (context?.previousData) {
        queryClient.setQueryData(['notifications'], context.previousData);
      }
      toast.error('전체 읽음 처리에 실패했습니다.');
    },
    onSuccess: () => {
      toast.success('모든 알림을 읽음 처리했습니다.');
    },
  });
}

export function useDeleteNotification() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteNotification,
    onMutate: async (notificationId) => {
      await queryClient.cancelQueries({ queryKey: ['notifications'] });

      const previousData = queryClient.getQueryData(['notifications']);

      queryClient.setQueryData(['notifications'], (old: any) => {
        if (!old) return old;

        return {
          ...old,
          pages: old.pages.map((page: any) => ({
            ...page,
            notifications: page.notifications.filter((n: any) => n.id !== notificationId),
          })),
        };
      });

      return { previousData };
    },
    onError: (error, notificationId, context) => {
      if (context?.previousData) {
        queryClient.setQueryData(['notifications'], context.previousData);
      }
      toast.error('알림 삭제에 실패했습니다.');
    },
    onSuccess: () => {
      toast.success('알림이 삭제되었습니다.');
    },
  });
}
