'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Search, Command } from 'lucide-react';
import { AppSwitcher } from './app-switcher';
import { NotificationPanel } from './notification-panel';
import { MessageButton, TaskButton } from './navbar-actions';
import { UserMenu } from './user-menu';

interface MainNavbarProps {
  currentApp?: string;
}

export function MainNavbar({ currentApp }: MainNavbarProps) {
  return (
    <header className="border-b border-navbar-foreground/10 bg-navbar text-navbar-foreground">
      <div className="flex h-11 items-center justify-between px-3">
        {/* Left section: App Switcher first, then Logo + Name */}
        <div className="flex items-center gap-2">
          <AppSwitcher />

          <div className="mx-1 h-4 w-px bg-navbar-foreground/15" />

          <Link href="/" className="flex items-center gap-2 transition-opacity hover:opacity-80">
            <Image
              src="/logo.png"
              alt="Amanzi Platforms"
              width={22}
              height={22}
              className="rounded-xs"
            />
            <span className="text-[13px] font-semibold tracking-tight">Amanzi Platforms</span>
          </Link>

          {currentApp && (
            <>
              <div className="mx-1 h-4 w-px bg-navbar-foreground/15" />
              <span className="rounded-xs bg-accent/20 px-2 py-0.5 text-[11px] font-medium text-accent">
                {currentApp}
              </span>
            </>
          )}
        </div>

        {/* Center - Search */}
        <div className="hidden flex-1 justify-center px-6 md:flex">
          <div className="relative w-full max-w-sm">
            <Search className="absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-navbar-foreground/35" />
            <input
              type="text"
              placeholder="Rechercher..."
              className="w-full rounded-xs border border-navbar-foreground/10 bg-navbar-foreground/8 py-1.5 pl-8 pr-10 text-xs text-navbar-foreground placeholder:text-navbar-foreground/35 outline-none transition-all focus:border-navbar-foreground/20 focus:bg-navbar-foreground/12"
            />
            <div className="absolute right-2.5 top-1/2 flex -translate-y-1/2 items-center gap-0.5 text-navbar-foreground/30">
              <Command className="h-3 w-3" />
              <span className="text-[10px] font-medium">K</span>
            </div>
          </div>
        </div>

        {/* Right section */}
        <div className="flex items-center gap-0.5">
          <MessageButton />
          <TaskButton />
          <NotificationPanel />
          <div className="mx-1.5 h-4 w-px bg-navbar-foreground/15" />
          <UserMenu />
        </div>
      </div>
    </header>
  );
}
