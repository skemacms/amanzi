'use client';

import type { ReactNode } from 'react';
import { ToastProvider } from '@/core/stores/toast-store';
import { NotificationProvider } from '@/core/stores/notification-store';
import { ToastContainer } from '@/core/components/toast-container';

export function Providers({ children }: { children: ReactNode }) {
  return (
    <ToastProvider>
      <NotificationProvider>
        {children}
        <ToastContainer />
      </NotificationProvider>
    </ToastProvider>
  );
}
