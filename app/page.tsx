'use client';

import Link from 'next/link';
import {
  Users,
  ShoppingCart,
  BarChart3,
  Wallet,
  FileText,
  Settings,
  ArrowRight,
  Clock,
  TrendingUp,
  type LucideIcon,
} from 'lucide-react';
import { MainNavbar } from '@/core/components/main-navbar';

interface AppModule {
  name: string;
  description: string;
  href: string;
  icon: LucideIcon;
  color: string;
  bgLight: string;
  available: boolean;
  stats?: string;
}

const modules: AppModule[] = [
  {
    name: 'Ressources Humaines',
    description: 'Employes, paie, bulletins, primes et gestion du personnel',
    href: '/human-resources',
    icon: Users,
    color: 'bg-teal-600',
    bgLight: 'bg-teal-50',
    available: true,
    stats: '4 employes',
  },
  {
    name: 'Comptabilite',
    description: 'Plan comptable, journaux, ecritures et rapprochements',
    href: '/accounting',
    icon: Wallet,
    color: 'bg-indigo-600',
    bgLight: 'bg-indigo-50',
    available: false,
  },
  {
    name: 'Ventes',
    description: 'Devis, factures, bons de commande et suivi clients',
    href: '/sales',
    icon: ShoppingCart,
    color: 'bg-sky-600',
    bgLight: 'bg-sky-50',
    available: false,
  },
  {
    name: 'Rapports',
    description: 'Tableaux de bord, statistiques et analyses',
    href: '/reports',
    icon: BarChart3,
    color: 'bg-amber-600',
    bgLight: 'bg-amber-50',
    available: false,
  },
  {
    name: 'Documents',
    description: 'Modeles, contrats, attestations et archivage',
    href: '/documents',
    icon: FileText,
    color: 'bg-rose-600',
    bgLight: 'bg-rose-50',
    available: false,
  },
  {
    name: 'Parametres',
    description: 'Entreprise, utilisateurs, configuration globale',
    href: '/settings',
    icon: Settings,
    color: 'bg-slate-600',
    bgLight: 'bg-slate-50',
    available: true,
  },
];

const recentActivity = [
  { text: 'Paie juin 2025 calculee', time: 'Il y a 2 jours', icon: TrendingUp },
  { text: 'Nouveau bulletin emis', time: 'Il y a 3 jours', icon: FileText },
  { text: 'Employe EMP004 ajoute', time: 'Il y a 1 semaine', icon: Users },
];

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <MainNavbar />

      <main className="flex-1">
        {/* Hero section */}
        <div className="border-b bg-card px-6 py-8">
          <div className="mx-auto max-w-6xl">
            <h1 className="text-2xl font-bold text-foreground text-balance">
              Bienvenue sur Amanzi
            </h1>
            <p className="mt-1.5 text-sm text-muted-foreground">
              Selectionnez une application pour commencer
            </p>
          </div>
        </div>

        <div className="mx-auto max-w-6xl px-6 py-8">
          <div className="flex flex-col gap-8 lg:flex-row">
            {/* App Grid */}
            <div className="flex-1">
              <h2 className="mb-4 text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">
                Applications
              </h2>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-3">
                {modules.map((mod) => {
                  const Icon = mod.icon;
                  const card = (
                    <div
                      className={`group relative flex flex-col gap-3 rounded-lg border bg-card p-5 transition-all ${
                        mod.available
                          ? 'cursor-pointer hover:shadow-md hover:border-accent/30'
                          : 'cursor-not-allowed opacity-50'
                      }`}
                    >
                      <div className="flex items-start justify-between">
                        <div className={`flex h-11 w-11 items-center justify-center rounded-lg ${mod.color}`}>
                          <Icon className="h-5 w-5 text-white" />
                        </div>
                        {!mod.available && (
                          <span className="rounded-full bg-muted px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
                            Bientot
                          </span>
                        )}
                      </div>
                      <div>
                        <h3 className="text-sm font-semibold text-foreground">
                          {mod.name}
                        </h3>
                        <p className="mt-0.5 text-xs leading-relaxed text-muted-foreground">
                          {mod.description}
                        </p>
                      </div>
                      {mod.available && mod.stats && (
                        <div className={`inline-flex w-fit items-center gap-1 rounded-md px-2 py-0.5 text-[10px] font-medium ${mod.bgLight} text-foreground/70`}>
                          {mod.stats}
                        </div>
                      )}
                      {mod.available && (
                        <div className="flex items-center gap-1 text-xs font-medium text-accent opacity-0 transition-opacity group-hover:opacity-100">
                          Ouvrir <ArrowRight className="h-3 w-3" />
                        </div>
                      )}
                    </div>
                  );

                  if (mod.available) {
                    return (
                      <Link key={mod.name} href={mod.href}>
                        {card}
                      </Link>
                    );
                  }
                  return <div key={mod.name}>{card}</div>;
                })}
              </div>
            </div>

            {/* Sidebar - Recent Activity */}
            <div className="w-full shrink-0 lg:w-72">
              <h2 className="mb-4 text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">
                Activite recente
              </h2>
              <div className="rounded-lg border bg-card">
                {recentActivity.map((item, i) => {
                  const Icon = item.icon;
                  return (
                    <div
                      key={i}
                      className={`flex items-start gap-3 px-4 py-3 ${
                        i < recentActivity.length - 1 ? 'border-b' : ''
                      }`}
                    >
                      <Icon className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" />
                      <div>
                        <p className="text-xs font-medium text-foreground">{item.text}</p>
                        <p className="mt-0.5 flex items-center gap-1 text-[10px] text-muted-foreground">
                          <Clock className="h-3 w-3" />
                          {item.time}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
