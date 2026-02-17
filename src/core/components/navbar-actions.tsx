'use client';

import { MessageSquare, CheckSquare } from 'lucide-react';
import { useNotifications } from '@/core/stores/notification-store';

export function MessageButton() {
  const { unreadByCategory } = useNotifications();
  const count = unreadByCategory.message;

  return (
    <button
      className="relative flex h-8 w-8 items-center justify-center rounded-md text-navbar-foreground/70 transition-colors hover:bg-navbar-foreground/10 hover:text-navbar-foreground"
      aria-label="Messages"
    >
      <MessageSquare className="h-[18px] w-[18px]" />
      {count > 0 && (
        <span className="absolute -right-0.5 -top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-sky-500 px-1 text-[10px] font-bold text-white">
          {count}
        </span>
      )}
    </button>
  );
}

export function TaskButton() {
  const { unreadByCategory } = useNotifications();
  const count = unreadByCategory.task;

  return (
    <button
      className="relative flex h-8 w-8 items-center justify-center rounded-md text-navbar-foreground/70 transition-colors hover:bg-navbar-foreground/10 hover:text-navbar-foreground"
      aria-label="Taches"
    >
      <CheckSquare className="h-[18px] w-[18px]" />
      {count > 0 && (
        <span className="absolute -right-0.5 -top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-teal-500 px-1 text-[10px] font-bold text-white">
          {count}
        </span>
      )}
    </button>
  );
}
