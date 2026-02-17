'use client';

import Link from 'next/link';
import { Search, Droplets } from 'lucide-react';
import { AppSwitcher } from './app-switcher';
import { NotificationPanel } from './notification-panel';
import { MessageButton, TaskButton } from './navbar-actions';
import { UserMenu } from './user-menu';

interface MainNavbarProps {
  currentApp?: string;
}

export function MainNavbar({ currentApp }: MainNavbarProps) {
  return (
    <header className="bg-navbar text-navbar-foreground">
      <div className="flex h-12 items-center justify-between px-4">
        {/* Left section */}
        <div className="flex items-center gap-3">
          <Link href="/" className="flex items-center gap-2.5 transition-opacity hover:opacity-80">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-accent">
              <Droplets className="h-4 w-4 text-accent-foreground" />
            </div>
            <span className="text-sm font-semibold tracking-tight">Amanzi</span>
          </Link>

          <div className="mx-2 h-5 w-px bg-navbar-foreground/20" />

          <AppSwitcher />

          {currentApp && (
            <span className="rounded-md bg-accent/20 px-2.5 py-1 text-xs font-medium text-accent">
              {currentApp}
            </span>
          )}
        </div>

        {/* Center - Search */}
        <div className="hidden flex-1 justify-center px-8 md:flex">
          <div className="relative w-full max-w-md">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-navbar-foreground/40" />
            <input
              type="text"
              placeholder="Rechercher..."
              className="w-full rounded-md bg-navbar-foreground/10 py-1.5 pl-9 pr-4 text-sm text-navbar-foreground placeholder:text-navbar-foreground/40 outline-none transition-colors focus:bg-navbar-foreground/15"
            />
          </div>
        </div>

        {/* Right section */}
        <div className="flex items-center gap-1">
          <MessageButton />
          <TaskButton />
          <NotificationPanel />
          <div className="mx-1.5 h-5 w-px bg-navbar-foreground/20" />
          <UserMenu />
        </div>
      </div>
    </header>
  );
}
