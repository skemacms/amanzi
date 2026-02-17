'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useRef, useEffect } from 'react';
import {
  Users,
  CalendarDays,
  FileText,
  Award,
  Grid3x3,
  Settings,
  LayoutDashboard,
  BarChart3,
  BadgeCheck,
  UserPlus,
  CalendarOff,
  FileSignature,
  ChevronDown,
  Banknote,
  GraduationCap,
} from 'lucide-react';
import { MainNavbar } from '@/core/components/main-navbar';

type NavItem = {
  label: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  exact?: boolean;
};

type NavGroup = {
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  children: NavItem[];
};

type NavEntry = NavItem | NavGroup;

function isGroup(entry: NavEntry): entry is NavGroup {
  return 'children' in entry;
}

const navigation: NavEntry[] = [
  { label: 'Vue d\'ensemble', href: '/human-resources', icon: LayoutDashboard, exact: true },
  { label: 'Employes', href: '/human-resources/employees', icon: Users },
  { label: 'Contrats', href: '/human-resources/contrats', icon: FileSignature },
  { label: 'Conges', href: '/human-resources/conges', icon: CalendarOff },
  {
    label: 'Remuneration',
    icon: Banknote,
    children: [
      { label: 'Paie', href: '/human-resources/payroll', icon: CalendarDays },
      { label: 'Bulletins', href: '/human-resources/payslips', icon: FileText },
      { label: 'Primes', href: '/human-resources/bonuses', icon: Award },
      { label: 'Grille salariale', href: '/human-resources/salary-grid', icon: Grid3x3 },
    ],
  },
  {
    label: 'Talent',
    icon: GraduationCap,
    children: [
      { label: 'Recrutements', href: '/human-resources/recrutements', icon: UserPlus },
      { label: 'Certifications', href: '/human-resources/certifications', icon: BadgeCheck },
    ],
  },
  { label: 'Analyses', href: '/human-resources/analyses', icon: BarChart3 },
  { label: 'Configuration', href: '/human-resources/settings', icon: Settings },
];

function isActiveLink(pathname: string, href: string, exact?: boolean) {
  return exact ? pathname === href : pathname === href || pathname.startsWith(href + '/');
}

function isGroupActive(pathname: string, group: NavGroup) {
  return group.children.some((c) => isActiveLink(pathname, c.href));
}

function DropdownMenu({ group, pathname }: { group: NavGroup; pathname: string }) {
  const [open, setOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const active = isGroupActive(pathname, group);
  const Icon = group.icon;

  useEffect(() => {
    if (!open) return;
    function handleClick(e: MouseEvent) {
      const target = e.target as Node;
      if (
        triggerRef.current?.contains(target) ||
        panelRef.current?.contains(target)
      ) return;
      setOpen(false);
    }
    // Use setTimeout to avoid catching the same click that opened the menu
    const timer = setTimeout(() => {
      document.addEventListener('click', handleClick);
    }, 0);
    return () => {
      clearTimeout(timer);
      document.removeEventListener('click', handleClick);
    };
  }, [open]);

  return (
    <div className="relative">
      <button
        ref={triggerRef}
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className={`relative flex shrink-0 items-center gap-1.5 px-3.5 py-3 text-xs font-medium transition-colors ${
          active ? 'text-accent' : 'text-muted-foreground hover:text-foreground'
        }`}
      >
        <Icon className="h-3.5 w-3.5" />
        {group.label}
        <ChevronDown className={`h-3 w-3 transition-transform ${open ? 'rotate-180' : ''}`} />
        {active && (
          <span className="absolute bottom-0 left-2 right-2 h-0.5 rounded-full bg-accent" />
        )}
      </button>

      {open && (
        <div
          ref={panelRef}
          className="absolute left-0 top-full z-50 mt-px min-w-[180px] rounded-xs border bg-card py-1 shadow-lg"
        >
          {group.children.map((child) => {
            const CIcon = child.icon;
            const childActive = isActiveLink(pathname, child.href);
            return (
              <Link
                key={child.href}
                href={child.href}
                onClick={() => setOpen(false)}
                className={`flex items-center gap-2.5 px-3.5 py-2 text-xs transition-colors ${
                  childActive
                    ? 'bg-accent/8 font-medium text-accent'
                    : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                }`}
              >
                <CIcon className="h-3.5 w-3.5" />
                {child.label}
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default function HumanResourcesLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <MainNavbar currentApp="Ressources Humaines" />

      <nav className="relative border-b bg-card">
        <div className="flex items-center gap-0 px-4">
          {navigation.map((entry, i) => {
            if (isGroup(entry)) {
              return <DropdownMenu key={i} group={entry} pathname={pathname} />;
            }

            const Icon = entry.icon;
            const active = isActiveLink(pathname, entry.href, entry.exact);
            return (
              <Link
                key={entry.href}
                href={entry.href}
                className={`relative flex shrink-0 items-center gap-1.5 px-3.5 py-3 text-xs font-medium transition-colors ${
                  active ? 'text-accent' : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                <Icon className="h-3.5 w-3.5" />
                {entry.label}
                {active && (
                  <span className="absolute bottom-0 left-2 right-2 h-0.5 rounded-full bg-accent" />
                )}
              </Link>
            );
          })}
        </div>
      </nav>

      <main className="flex-1">{children}</main>
    </div>
  );
}
