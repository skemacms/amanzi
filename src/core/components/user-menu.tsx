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
        className="flex items-center gap-2 rounded-xs px-1.5 py-1 transition-colors hover:bg-navbar-foreground/10"
      >
        <div className="flex h-6 w-6 items-center justify-center rounded-xs bg-accent text-[10px] font-bold text-white">
          A
        </div>
        <div className="hidden text-left md:block">
          <p className="text-[11px] font-medium leading-tight text-navbar-foreground">Admin</p>
          <p className="text-[9px] leading-tight text-navbar-foreground/50">Amanzi Technologies</p>
        </div>
        <ChevronDown className="hidden h-3 w-3 text-navbar-foreground/50 md:block" />
      </button>

      {open && (
        <div className="absolute right-0 top-full mt-1.5 w-52 rounded-xs border bg-card shadow-lg z-50">
          <div className="border-b px-3 py-2.5">
            <p className="text-xs font-semibold text-foreground">Admin</p>
            <p className="text-[11px] text-muted-foreground">admin@amanzi.tech</p>
          </div>
          <div className="py-0.5">
            <Link
              href="/company"
              onClick={() => setOpen(false)}
              className="flex items-center gap-2 px-3 py-1.5 text-xs text-foreground transition-colors hover:bg-muted"
            >
              <User className="h-3.5 w-3.5 text-muted-foreground" />
              Mon profil
            </Link>
            <Link
              href="/company"
              onClick={() => setOpen(false)}
              className="flex items-center gap-2 px-3 py-1.5 text-xs text-foreground transition-colors hover:bg-muted"
            >
              <Building2 className="h-3.5 w-3.5 text-muted-foreground" />
              Entreprise
            </Link>
            <Link
              href="/company"
              onClick={() => setOpen(false)}
              className="flex items-center gap-2 px-3 py-1.5 text-xs text-foreground transition-colors hover:bg-muted"
            >
              <Settings className="h-3.5 w-3.5 text-muted-foreground" />
              Parametres
            </Link>
            <Link
              href="/company/security"
              onClick={() => setOpen(false)}
              className="flex items-center gap-2 px-3 py-1.5 text-xs text-foreground transition-colors hover:bg-muted"
            >
              <Shield className="h-3.5 w-3.5 text-muted-foreground" />
              Securite
            </Link>
          </div>
          <div className="border-t py-0.5">
            <button className="flex w-full items-center gap-2 px-3 py-1.5 text-xs text-red-600 transition-colors hover:bg-red-50">
              <LogOut className="h-3.5 w-3.5" />
              Deconnexion
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
