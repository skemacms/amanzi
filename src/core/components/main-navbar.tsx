'use client';

import Image from 'next/image';
import Link from 'next/link';
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
