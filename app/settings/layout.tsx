'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Building2,
  User,
  Shield,
  Palette,
  Bell,
  Globe,
  Database,
} from 'lucide-react';
import { MainNavbar } from '@/core/components/main-navbar';

const settingsNav = [
  { label: 'General', href: '/settings', icon: Building2, exact: true },
  { label: 'Profil', href: '/settings/profile', icon: User },
  { label: 'Securite', href: '/settings/security', icon: Shield },
  { label: 'Notifications', href: '/settings/notifications', icon: Bell },
  { label: 'Apparence', href: '/settings/appearance', icon: Palette },
  { label: 'Langue et region', href: '/settings/locale', icon: Globe },
  { label: 'Donnees', href: '/settings/data', icon: Database },
];

export default function SettingsLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <MainNavbar currentApp="Parametres" />

      <div className="flex flex-1">
        {/* Sidebar navigation */}
        <aside className="hidden w-56 shrink-0 border-r bg-card md:block">
          <div className="px-4 py-5">
            <h2 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
              Parametres
            </h2>
          </div>
          <nav className="px-2 pb-4">
            {settingsNav.map((item) => {
              const Icon = item.icon;
              const isActive = item.exact
                ? pathname === item.href
                : pathname.startsWith(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-2.5 rounded-xs px-3 py-2 text-sm transition-colors ${
                    isActive
                      ? 'bg-accent/10 font-medium text-accent'
                      : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </aside>

        {/* Content */}
        <main className="flex-1 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
