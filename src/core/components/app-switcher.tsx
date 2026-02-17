'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import {
  LayoutGrid,
  Users,
  ShoppingCart,
  BarChart3,
  Wallet,
  FileText,
  Settings,
  type LucideIcon,
} from 'lucide-react';

interface AppItem {
  name: string;
  href: string;
  icon: LucideIcon;
  color: string;
  available: boolean;
}

const apps: AppItem[] = [
  { name: 'Ressources Humaines', href: '/human-resources', icon: Users, color: 'bg-teal-600 text-white', available: true },
  { name: 'Comptabilite', href: '/accounting', icon: Wallet, color: 'bg-slate-600 text-white', available: false },
  { name: 'Ventes', href: '/sales', icon: ShoppingCart, color: 'bg-sky-600 text-white', available: false },
  { name: 'Rapports', href: '/reports', icon: BarChart3, color: 'bg-amber-600 text-white', available: false },
  { name: 'Documents', href: '/documents', icon: FileText, color: 'bg-indigo-600 text-white', available: false },
  { name: 'Entreprise', href: '/company', icon: Settings, color: 'bg-slate-500 text-white', available: true },
];

export function AppSwitcher() {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    if (open) document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [open]);

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen(!open)}
        className="flex h-7 w-7 items-center justify-center rounded-xs text-navbar-foreground/70 transition-colors hover:bg-navbar-foreground/10 hover:text-navbar-foreground"
        aria-label="Applications"
      >
        <LayoutGrid className="h-4 w-4" />
      </button>

      {open && (
        <div className="absolute left-0 top-full mt-1.5 w-64 rounded-xs border bg-card shadow-lg z-50">
          <div className="p-2.5">
            <p className="mb-2 px-1 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
              Applications
            </p>
            <div className="grid grid-cols-3 gap-0.5">
              {apps.map((app) => {
                const Icon = app.icon;
                const content = (
                  <div
                    className={`flex flex-col items-center gap-1.5 rounded-xs p-2.5 text-center transition-colors ${
                      app.available
                        ? 'cursor-pointer hover:bg-muted'
                        : 'cursor-not-allowed opacity-40'
                    }`}
                  >
                    <div className={`flex h-8 w-8 items-center justify-center rounded-xs ${app.color}`}>
                      <Icon className="h-3.5 w-3.5" />
                    </div>
                    <span className="text-[10px] font-medium leading-tight text-foreground">
                      {app.name}
                    </span>
                  </div>
                );

                if (app.available) {
                  return (
                    <Link key={app.name} href={app.href} onClick={() => setOpen(false)}>
                      {content}
                    </Link>
                  );
                }
                return <div key={app.name}>{content}</div>;
              })}
            </div>
          </div>
          <div className="border-t px-3 py-2">
            <Link
              href="/"
              onClick={() => setOpen(false)}
              className="block text-center text-[11px] font-medium text-accent hover:underline"
            >
              Voir toutes les applications
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
