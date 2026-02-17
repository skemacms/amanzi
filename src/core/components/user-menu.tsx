'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { User, Settings, LogOut, ChevronDown, Building2, Shield } from 'lucide-react';

export function UserMenu() {
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
        className="flex items-center gap-2 rounded-md px-2 py-1 transition-colors hover:bg-navbar-foreground/10"
      >
        <div className="flex h-7 w-7 items-center justify-center rounded-full bg-accent text-xs font-bold text-white">
          A
        </div>
        <div className="hidden text-left md:block">
          <p className="text-xs font-medium text-navbar-foreground">Admin</p>
          <p className="text-[10px] text-navbar-foreground/60">Amanzi Technologies</p>
        </div>
        <ChevronDown className="hidden h-3.5 w-3.5 text-navbar-foreground/60 md:block" />
      </button>

      {open && (
        <div className="absolute right-0 top-full mt-2 w-56 rounded-lg border bg-card shadow-xl z-50">
          <div className="border-b px-4 py-3">
            <p className="text-sm font-semibold text-foreground">Admin</p>
            <p className="text-xs text-muted-foreground">admin@amanzi.tech</p>
          </div>
          <div className="py-1">
            <Link
              href="/settings"
              onClick={() => setOpen(false)}
              className="flex items-center gap-2.5 px-4 py-2 text-sm text-foreground transition-colors hover:bg-muted"
            >
              <User className="h-4 w-4 text-muted-foreground" />
              Mon profil
            </Link>
            <Link
              href="/settings"
              onClick={() => setOpen(false)}
              className="flex items-center gap-2.5 px-4 py-2 text-sm text-foreground transition-colors hover:bg-muted"
            >
              <Building2 className="h-4 w-4 text-muted-foreground" />
              Entreprise
            </Link>
            <Link
              href="/settings"
              onClick={() => setOpen(false)}
              className="flex items-center gap-2.5 px-4 py-2 text-sm text-foreground transition-colors hover:bg-muted"
            >
              <Settings className="h-4 w-4 text-muted-foreground" />
              Parametres
            </Link>
            <Link
              href="/settings"
              onClick={() => setOpen(false)}
              className="flex items-center gap-2.5 px-4 py-2 text-sm text-foreground transition-colors hover:bg-muted"
            >
              <Shield className="h-4 w-4 text-muted-foreground" />
              Securite
            </Link>
          </div>
          <div className="border-t py-1">
            <button className="flex w-full items-center gap-2.5 px-4 py-2 text-sm text-red-600 transition-colors hover:bg-red-50">
              <LogOut className="h-4 w-4" />
              Deconnexion
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
