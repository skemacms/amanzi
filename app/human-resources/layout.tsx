'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Users,
  CalendarDays,
  FileText,
  Award,
  Grid3x3,
  Bell,
  Settings,
  Home,
} from 'lucide-react';

const navItems = [
  { label: 'Employés', href: '/human-resources/employees', icon: Users },
  { label: 'Paie', href: '/human-resources/payroll', icon: CalendarDays },
  { label: 'Bulletins', href: '/human-resources/payslips', icon: FileText },
  { label: 'Primes', href: '/human-resources/bonuses', icon: Award },
  { label: 'Grille salariale', href: '/human-resources/salary-grid', icon: Grid3x3 },
  { label: 'Notifications', href: '/human-resources/notifications', icon: Bell },
  { label: 'Paramètres', href: '/human-resources/settings', icon: Settings },
];

export default function HumanResourcesLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="flex min-h-screen flex-col">
      {/* Barre principale — stone-900 */}
      <header className="bg-stone-900 text-white">
        <div className="flex h-11 items-center justify-between px-4">
          {/* Gauche : logo + nav modules */}
          <div className="flex items-center gap-5">
            <Link href="/" className="flex items-center gap-2 transition-opacity hover:opacity-80">
              <Image src="/logo.png" alt="Amanzi" width={24} height={24} />
              <span className="text-sm font-semibold tracking-tight">Amanzi</span>
            </Link>

            <nav className="flex items-center gap-1">
              <Link
                href="/"
                className="rounded px-2.5 py-1 text-xs font-medium text-stone-400 transition-colors hover:bg-stone-800 hover:text-white"
              >
                <Home className="h-3.5 w-3.5" />
              </Link>
              <span className="rounded bg-teal-600/20 px-2.5 py-1 text-xs font-medium text-teal-400">
                Ressources Humaines
              </span>
            </nav>
          </div>

          {/* Droite : actions */}
          <div className="flex items-center gap-3">
            <button className="rounded p-1.5 text-stone-400 transition-colors hover:bg-stone-800 hover:text-white">
              <Bell className="h-4 w-4" />
            </button>
            <div className="flex h-7 w-7 items-center justify-center rounded-full bg-teal-600 text-xs font-bold text-white">
              A
            </div>
          </div>
        </div>
      </header>

      {/* Sous-navigation — fond blanc, bordure basse */}
      <nav className="border-b bg-white">
        <div className="flex items-center gap-0.5 px-4">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href || pathname.startsWith(item.href + '/');
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-1.5 border-b-2 px-3 py-2.5 text-xs font-medium transition-colors ${
                  isActive
                    ? 'border-teal-600 bg-teal-50 text-teal-700'
                    : 'border-transparent text-stone-500 hover:bg-stone-50 hover:text-stone-700'
                }`}
              >
                <Icon className="h-3.5 w-3.5" />
                {item.label}
              </Link>
            );
          })}
        </div>
      </nav>

      {/* Contenu principal — 100% largeur */}
      <main className="flex-1 bg-stone-100">
        {children}
      </main>
    </div>
  );
}
