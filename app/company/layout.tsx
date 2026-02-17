'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Building2,
  Shield,
  Globe,
  Database,
  FileText,
  History,
  MessageSquare,
  Activity,
} from 'lucide-react';
import { MainNavbar } from '@/core/components/main-navbar';
import { useState } from 'react';

const settingsNav = [
  { label: 'General', href: '/company', icon: Building2, exact: true },
  { label: 'Fiscal et social', href: '/company/fiscal', icon: FileText },
  { label: 'Securite', href: '/company/security', icon: Shield },
  { label: 'Langue et region', href: '/company/locale', icon: Globe },
  { label: 'Donnees', href: '/company/data', icon: Database },
];

const RIGHT_TABS = ['historique', 'notes', 'activite'] as const;
type RightTab = (typeof RIGHT_TABS)[number];

const mockHistory = [
  { action: 'Adresse modifiee', user: 'Admin', date: '15 Jul 2025, 14:30' },
  { action: 'NIU mis a jour', user: 'Admin', date: '10 Jul 2025, 09:12' },
  { action: 'Taux CNSS PF modifie', user: 'Admin', date: '01 Jul 2025, 16:45' },
  { action: 'Convention 2025 activee', user: 'Admin', date: '02 Jan 2025, 08:00' },
  { action: 'Entreprise creee', user: 'System', date: '01 Jan 2024, 00:00' },
];

const mockNotes = [
  { text: 'Verifier les taux CNSS avec le comptable avant fin Q3.', author: 'Admin', date: '12 Jul 2025' },
  { text: 'Convention commerce 2025 appliquee a tous les employes.', author: 'Admin', date: '05 Jan 2025' },
];

const mockActivities = [
  { text: 'Connexion admin', time: 'Il y a 2h' },
  { text: 'Modification parametres CNSS', time: 'Il y a 5h' },
  { text: 'Export des donnees fiscales', time: 'Il y a 1 jour' },
  { text: 'Mise a jour profil entreprise', time: 'Il y a 3 jours' },
];

export default function CompanyLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [rightTab, setRightTab] = useState<RightTab>('historique');

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <MainNavbar currentApp="Entreprise" />

      <div className="flex flex-1">
        {/* Left sidebar */}
        <aside className="hidden w-52 shrink-0 border-r bg-card md:block">
          <div className="px-4 py-5">
            <h2 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
              Entreprise
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

        {/* Main content */}
        <main className="flex-1 overflow-auto">
          {children}
        </main>

        {/* Right sidebar - activity/history */}
        <aside className="hidden w-72 shrink-0 border-l bg-card xl:block">
          <div className="flex border-b">
            {RIGHT_TABS.map((tab) => {
              const icons = { historique: History, notes: MessageSquare, activite: Activity };
              const Icon = icons[tab];
              return (
                <button
                  key={tab}
                  onClick={() => setRightTab(tab)}
                  className={`flex flex-1 items-center justify-center gap-1.5 py-3 text-xs font-medium capitalize transition-colors ${
                    rightTab === tab
                      ? 'border-b-2 border-accent text-accent'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  <Icon className="h-3.5 w-3.5" />
                  {tab}
                </button>
              );
            })}
          </div>

          <div className="p-4">
            {rightTab === 'historique' && (
              <div className="flex flex-col gap-3">
                {mockHistory.map((h, i) => (
                  <div key={i} className="flex flex-col gap-0.5 border-b pb-3 last:border-0">
                    <p className="text-xs font-medium text-foreground">{h.action}</p>
                    <p className="text-[10px] text-muted-foreground">Par {h.user} &mdash; {h.date}</p>
                  </div>
                ))}
              </div>
            )}

            {rightTab === 'notes' && (
              <div className="flex flex-col gap-3">
                {mockNotes.map((n, i) => (
                  <div key={i} className="rounded-xs border bg-background p-3">
                    <p className="text-xs text-foreground leading-relaxed">{n.text}</p>
                    <p className="mt-1.5 text-[10px] text-muted-foreground">{n.author} &mdash; {n.date}</p>
                  </div>
                ))}
              </div>
            )}

            {rightTab === 'activite' && (
              <div className="flex flex-col gap-3">
                {mockActivities.map((a, i) => (
                  <div key={i} className="flex items-start gap-2.5">
                    <div className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                    <div>
                      <p className="text-xs text-foreground">{a.text}</p>
                      <p className="font-mono text-[10px] text-muted-foreground">{a.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </aside>
      </div>
    </div>
  );
}
