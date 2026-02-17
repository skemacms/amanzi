'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
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
} from 'lucide-react';
import { MainNavbar } from '@/core/components/main-navbar';

const navItems = [
  { label: 'Vue d\'ensemble', href: '/human-resources', icon: LayoutDashboard, exact: true },
  { label: 'Employes', href: '/human-resources/employees', icon: Users },
  { label: 'Contrats', href: '/human-resources/contrats', icon: FileSignature },
  { label: 'Conges', href: '/human-resources/conges', icon: CalendarOff },
  { label: 'Paie', href: '/human-resources/payroll', icon: CalendarDays },
  { label: 'Bulletins', href: '/human-resources/payslips', icon: FileText },
  { label: 'Primes', href: '/human-resources/bonuses', icon: Award },
  { label: 'Grille salariale', href: '/human-resources/salary-grid', icon: Grid3x3 },
  { label: 'Recrutements', href: '/human-resources/recrutements', icon: UserPlus },
  { label: 'Certifications', href: '/human-resources/certifications', icon: BadgeCheck },
  { label: 'Analyses', href: '/human-resources/analyses', icon: BarChart3 },
  { label: 'Configuration', href: '/human-resources/settings', icon: Settings },
];

export default function HumanResourcesLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <MainNavbar currentApp="Ressources Humaines" />

      {/* Tab navigation */}
      <nav className="border-b bg-card">
        <div className="flex items-center gap-0 overflow-x-auto px-4">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = item.exact
              ? pathname === item.href
              : pathname === item.href || pathname.startsWith(item.href + '/');
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`relative flex shrink-0 items-center gap-1.5 px-4 py-3 text-xs font-medium transition-colors ${
                  isActive
                    ? 'text-accent'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                <Icon className="h-3.5 w-3.5" />
                {item.label}
                {isActive && (
                  <span className="absolute bottom-0 left-2 right-2 h-0.5 rounded-full bg-accent" />
                )}
              </Link>
            );
          })}
        </div>
      </nav>

      <main className="flex-1">
        {children}
      </main>
    </div>
  );
}
