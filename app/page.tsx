'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  Search, LayoutGrid, List, ArrowUpRight, Clock, Star,
  Users, Wallet, TrendingUp, CalendarDays, Activity,
  ChevronRight, Sparkles,
} from 'lucide-react';
import { MainNavbar } from '@/core/components/main-navbar';

interface AppModule {
  name: string;
  description: string;
  href: string;
  icon: string;
  available: boolean;
  stats?: string;
  category: string;
}

const modules: AppModule[] = [
  {
    name: 'Ressources Humaines',
    description: 'Employes, paie, bulletins, primes et gestion du personnel',
    href: '/human-resources',
    icon: '/icons/app-hr.jpg',
    available: true,
    stats: '4 employes',
    category: 'Gestion',
  },
  {
    name: 'Comptabilite',
    description: 'Plan comptable, journaux, ecritures et rapprochements',
    href: '/accounting',
    icon: '/icons/app-accounting.jpg',
    available: false,
    category: 'Finance',
  },
  {
    name: 'Ventes',
    description: 'Devis, factures, bons de commande et suivi clients',
    href: '/sales',
    icon: '/icons/app-sales.jpg',
    available: false,
    category: 'Commerce',
  },
  {
    name: 'CRM',
    description: 'Gestion des contacts, opportunites et pipeline commercial',
    href: '/crm',
    icon: '/icons/app-crm.jpg',
    available: false,
    category: 'Commerce',
  },
  {
    name: 'Inventaire',
    description: 'Stock, entrepots, mouvements et approvisionnement',
    href: '/inventory',
    icon: '/icons/app-inventory.jpg',
    available: false,
    category: 'Logistique',
  },
  {
    name: 'Rapports',
    description: 'Tableaux de bord, statistiques et analyses',
    href: '/reports',
    icon: '/icons/app-reports.jpg',
    available: false,
    category: 'Analyses',
  },
  {
    name: 'Projets',
    description: 'Planification, suivi des taches et gestion d\'equipes',
    href: '/projects',
    icon: '/icons/app-projects.jpg',
    available: false,
    category: 'Gestion',
  },
  {
    name: 'Documents',
    description: 'Modeles, contrats, attestations et archivage',
    href: '/documents',
    icon: '/icons/app-documents.jpg',
    available: false,
    category: 'Gestion',
  },
  {
    name: 'Entreprise',
    description: 'Identite, parametres fiscaux, securite et configuration',
    href: '/company',
    icon: '/icons/app-settings.jpg',
    available: true,
    category: 'Administration',
  },
];

const recentActivity = [
  { text: 'Paie de juin 2025 calculee', module: 'RH', time: 'Il y a 3 jours', href: '/human-resources/payroll' },
  { text: 'Cedric Banzouzi embauche', module: 'RH', time: 'Il y a 2 mois', href: '/human-resources/employees' },
  { text: 'Prime transport configuree', module: 'RH', time: 'Il y a 2 sem.', href: '/human-resources/bonuses' },
  { text: 'Convention Commerce 2025 activee', module: 'RH', time: 'Il y a 1 mois', href: '/human-resources/salary-grid' },
];

const quickStats = [
  { label: 'Employes actifs', value: '4', icon: Users, color: 'text-teal-600 bg-teal-50', href: '/human-resources/employees' },
  { label: 'Masse salariale', value: '1.6M', icon: Wallet, color: 'text-emerald-600 bg-emerald-50', href: '/human-resources/payroll' },
  { label: 'Taux de presence', value: '95.5%', icon: TrendingUp, color: 'text-sky-600 bg-sky-50', href: '/human-resources/analyses' },
  { label: 'Conges en cours', value: '0', icon: CalendarDays, color: 'text-amber-600 bg-amber-50', href: '/human-resources/conges' },
];

const shortcuts = [
  { label: 'Nouvel employe', href: '/human-resources/employees/new' },
  { label: 'Calculer la paie', href: '/human-resources/payroll' },
  { label: 'Voir les bulletins', href: '/human-resources/payslips' },
  { label: 'Gerer les primes', href: '/human-resources/bonuses' },
];

export default function Home() {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [search, setSearch] = useState('');

  const filtered = modules.filter((m) =>
    m.name.toLowerCase().includes(search.toLowerCase()) ||
    m.description.toLowerCase().includes(search.toLowerCase())
  );

  const now = new Date();
  const greeting = now.getHours() < 12 ? 'Bonjour' : now.getHours() < 18 ? 'Bon apres-midi' : 'Bonsoir';
  const dateStr = now.toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <MainNavbar />

      <main className="flex-1 px-6 py-6">
        <div className="mx-auto max-w-6xl">

          {/* Welcome banner */}
          <div className="mb-6 rounded-xs border bg-card p-5">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h1 className="text-lg font-bold text-foreground">
                  {greeting}, <span className="text-accent">Admin</span>
                </h1>
                <p className="mt-0.5 text-sm text-muted-foreground capitalize">{dateStr}</p>
              </div>
              <div className="flex items-center gap-2">
                {shortcuts.map((s) => (
                  <Link
                    key={s.label}
                    href={s.href}
                    className="hidden items-center gap-1 rounded-xs border bg-background px-3 py-1.5 text-[11px] font-medium text-foreground transition-colors hover:bg-muted hover:border-accent/30 lg:inline-flex"
                  >
                    <Sparkles className="h-3 w-3 text-accent" />
                    {s.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="mb-6 grid grid-cols-2 gap-3 lg:grid-cols-4">
            {quickStats.map((stat) => {
              const Icon = stat.icon;
              return (
                <Link key={stat.label} href={stat.href}>
                  <div className="group flex items-center gap-3 rounded-xs border bg-card p-4 transition-all hover:shadow-sm hover:border-accent/30">
                    <div className={`flex h-9 w-9 items-center justify-center rounded-xs ${stat.color}`}>
                      <Icon className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="font-mono text-xl font-bold text-foreground">{stat.value}</p>
                      <p className="text-[11px] text-muted-foreground">{stat.label}</p>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>

          {/* Main content: Apps + Sidebar */}
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-4">

            {/* Apps section - 3 cols */}
            <div className="lg:col-span-3">
              {/* Search + View Toggle */}
              <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div className="relative w-full max-w-sm">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <input
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Rechercher une application..."
                    className="w-full rounded-xs border bg-card py-2 pl-10 pr-4 text-sm text-foreground placeholder:text-muted-foreground outline-none transition-colors focus:border-accent"
                  />
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-[11px] text-muted-foreground">
                    {filtered.filter(m => m.available).length} active{filtered.filter(m => m.available).length > 1 ? 's' : ''} sur {filtered.length}
                  </span>
                  <div className="flex items-center rounded-xs border bg-card p-0.5">
                    <button
                      onClick={() => setViewMode('grid')}
                      className={`flex items-center gap-1.5 rounded-xs px-2.5 py-1.5 text-xs font-medium transition-colors ${
                        viewMode === 'grid'
                          ? 'bg-primary text-primary-foreground'
                          : 'text-muted-foreground hover:text-foreground'
                      }`}
                    >
                      <LayoutGrid className="h-3.5 w-3.5" />
                    </button>
                    <button
                      onClick={() => setViewMode('list')}
                      className={`flex items-center gap-1.5 rounded-xs px-2.5 py-1.5 text-xs font-medium transition-colors ${
                        viewMode === 'list'
                          ? 'bg-primary text-primary-foreground'
                          : 'text-muted-foreground hover:text-foreground'
                      }`}
                    >
                      <List className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Grid View */}
              {viewMode === 'grid' && (
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
                  {filtered.map((mod) => {
                    const inner = (
                      <div
                        className={`group flex h-[150px] w-full flex-col items-center justify-center gap-3 rounded-xs border bg-card p-4 transition-all ${
                          mod.available
                            ? 'hover:shadow-md hover:border-accent/30'
                            : 'opacity-40'
                        }`}
                      >
                        <div className="relative">
                          <Image
                            src={mod.icon}
                            alt={mod.name}
                            width={52}
                            height={52}
                            className="rounded-xs"
                          />
                          {mod.available && (
                            <div className="absolute -right-1 -top-1 h-2.5 w-2.5 rounded-full border-2 border-card bg-emerald-500" />
                          )}
                        </div>
                        <div className="text-center">
                          <span className="block text-xs font-semibold text-foreground font-mono leading-tight">
                            {mod.name}
                          </span>
                          {mod.stats && (
                            <span className="mt-1 block text-[10px] text-muted-foreground">{mod.stats}</span>
                          )}
                          {!mod.available && (
                            <span className="mt-1 block text-[9px] font-medium uppercase tracking-wider text-muted-foreground">Bientot</span>
                          )}
                        </div>
                      </div>
                    );

                    if (mod.available) {
                      return <Link key={mod.name} href={mod.href}>{inner}</Link>;
                    }
                    return <div key={mod.name} className="cursor-default">{inner}</div>;
                  })}
                </div>
              )}

              {/* List View */}
              {viewMode === 'list' && (
                <div className="rounded-xs border bg-card">
                  {filtered.map((mod, i) => {
                    const inner = (
                      <div
                        className={`group flex items-center gap-4 px-4 py-3 transition-colors ${
                          mod.available ? 'hover:bg-muted/50' : 'opacity-40'
                        } ${i < filtered.length - 1 ? 'border-b' : ''}`}
                      >
                        <Image
                          src={mod.icon}
                          alt={mod.name}
                          width={38}
                          height={38}
                          className="shrink-0 rounded-xs"
                        />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <h3 className="text-sm font-semibold text-foreground font-mono">{mod.name}</h3>
                            <span className="rounded-xs bg-muted px-1.5 py-0.5 text-[9px] font-medium uppercase tracking-wider text-muted-foreground">
                              {mod.category}
                            </span>
                            {mod.available && (
                              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                            )}
                          </div>
                          <p className="mt-0.5 text-xs text-muted-foreground truncate">{mod.description}</p>
                        </div>
                        {mod.stats && mod.available && (
                          <span className="hidden shrink-0 rounded-xs bg-muted px-2 py-1 text-[11px] font-medium font-mono text-muted-foreground sm:inline-block">
                            {mod.stats}
                          </span>
                        )}
                        {mod.available && (
                          <ChevronRight className="hidden h-4 w-4 text-muted-foreground group-hover:text-accent sm:block" />
                        )}
                        {!mod.available && (
                          <span className="shrink-0 rounded-xs bg-muted px-2 py-1 text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
                            Bientot
                          </span>
                        )}
                      </div>
                    );

                    if (mod.available) {
                      return <Link key={mod.name} href={mod.href}>{inner}</Link>;
                    }
                    return <div key={mod.name} className="cursor-default">{inner}</div>;
                  })}
                </div>
              )}

              {/* Empty state */}
              {filtered.length === 0 && (
                <div className="flex flex-col items-center justify-center rounded-xs border bg-card py-16">
                  <Search className="mb-3 h-8 w-8 text-muted-foreground/40" />
                  <p className="text-sm text-muted-foreground">
                    {'Aucune application pour "'}<span className="font-mono font-medium text-foreground">{search}</span>{'"'}
                  </p>
                </div>
              )}
            </div>

            {/* Sidebar - 1 col */}
            <div className="flex flex-col gap-4">

              {/* Favorites */}
              <div className="rounded-xs border bg-card p-4">
                <div className="mb-3 flex items-center gap-2">
                  <Star className="h-3.5 w-3.5 text-amber-500" />
                  <h2 className="text-xs font-semibold text-foreground">Favoris</h2>
                </div>
                <div className="flex flex-col gap-1">
                  {modules.filter(m => m.available).map((mod) => (
                    <Link
                      key={mod.name}
                      href={mod.href}
                      className="flex items-center gap-2.5 rounded-xs px-2 py-1.5 text-xs text-foreground transition-colors hover:bg-muted"
                    >
                      <Image src={mod.icon} alt={mod.name} width={20} height={20} className="rounded-xs" />
                      <span className="font-medium">{mod.name}</span>
                      <ArrowUpRight className="ml-auto h-3 w-3 text-muted-foreground" />
                    </Link>
                  ))}
                </div>
              </div>

              {/* Recent Activity */}
              <div className="rounded-xs border bg-card p-4">
                <div className="mb-3 flex items-center gap-2">
                  <Activity className="h-3.5 w-3.5 text-accent" />
                  <h2 className="text-xs font-semibold text-foreground">Activite recente</h2>
                </div>
                <div className="flex flex-col gap-2.5">
                  {recentActivity.map((item, i) => (
                    <Link key={i} href={item.href} className="group">
                      <div className="flex items-start gap-2.5">
                        <div className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                        <div className="min-w-0">
                          <p className="text-xs text-foreground group-hover:text-accent transition-colors">{item.text}</p>
                          <div className="mt-0.5 flex items-center gap-2">
                            <span className="rounded-xs bg-muted px-1.5 py-0.5 text-[9px] font-medium text-muted-foreground">{item.module}</span>
                            <span className="flex items-center gap-0.5 text-[10px] text-muted-foreground">
                              <Clock className="h-2.5 w-2.5" />
                              {item.time}
                            </span>
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>

              {/* System info */}
              <div className="rounded-xs border bg-card p-4">
                <h2 className="mb-3 text-xs font-semibold text-foreground">Systeme</h2>
                <div className="flex flex-col gap-2">
                  {[
                    { label: 'Version', value: '1.0.0' },
                    { label: 'Modules actifs', value: `${modules.filter(m => m.available).length}/${modules.length}` },
                    { label: 'Derniere MAJ', value: '17 fev. 2026' },
                    { label: 'Licence', value: 'Entreprise' },
                  ].map((info) => (
                    <div key={info.label} className="flex items-center justify-between">
                      <span className="text-[11px] text-muted-foreground">{info.label}</span>
                      <span className="font-mono text-[11px] font-medium text-foreground">{info.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
