'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Search, LayoutGrid, List } from 'lucide-react';
import { MainNavbar } from '@/core/components/main-navbar';

interface AppModule {
  name: string;
  description: string;
  href: string;
  icon: string;
  available: boolean;
  stats?: string;
}

const modules: AppModule[] = [
  {
    name: 'Ressources Humaines',
    description: 'Employes, paie, bulletins, primes et gestion du personnel',
    href: '/human-resources',
    icon: '/icons/app-hr.jpg',
    available: true,
    stats: '4 employes',
  },
  {
    name: 'Comptabilite',
    description: 'Plan comptable, journaux, ecritures et rapprochements',
    href: '/accounting',
    icon: '/icons/app-accounting.jpg',
    available: false,
  },
  {
    name: 'Ventes',
    description: 'Devis, factures, bons de commande et suivi clients',
    href: '/sales',
    icon: '/icons/app-sales.jpg',
    available: false,
  },
  {
    name: 'CRM',
    description: 'Gestion des contacts, opportunites et pipeline commercial',
    href: '/crm',
    icon: '/icons/app-crm.jpg',
    available: false,
  },
  {
    name: 'Inventaire',
    description: 'Stock, entrepots, mouvements et approvisionnement',
    href: '/inventory',
    icon: '/icons/app-inventory.jpg',
    available: false,
  },
  {
    name: 'Rapports',
    description: 'Tableaux de bord, statistiques et analyses',
    href: '/reports',
    icon: '/icons/app-reports.jpg',
    available: false,
  },
  {
    name: 'Projets',
    description: 'Planification, suivi des taches et gestion d\'equipes',
    href: '/projects',
    icon: '/icons/app-projects.jpg',
    available: false,
  },
  {
    name: 'Documents',
    description: 'Modeles, contrats, attestations et archivage',
    href: '/documents',
    icon: '/icons/app-documents.jpg',
    available: false,
  },
  {
    name: 'Entreprise',
    description: 'Identite, parametres fiscaux, securite et configuration',
    href: '/company',
    icon: '/icons/app-settings.jpg',
    available: true,
  },
];

export default function Home() {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [search, setSearch] = useState('');

  const filtered = modules.filter((m) =>
    m.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <MainNavbar />

      <main className="flex-1 px-6 py-8">
        <div className="mx-auto max-w-5xl">
          {/* Search + View Toggle Bar */}
          <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="relative w-full max-w-md">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Rechercher une application..."
                className="w-full rounded-xs border bg-card py-2.5 pl-10 pr-4 text-sm text-foreground placeholder:text-muted-foreground outline-none transition-colors focus:border-accent"
              />
            </div>

            <div className="flex items-center rounded-xs border bg-card p-0.5">
              <button
                onClick={() => setViewMode('grid')}
                className={`flex items-center gap-1.5 rounded-xs px-3 py-1.5 text-xs font-medium transition-colors ${
                  viewMode === 'grid'
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                <LayoutGrid className="h-3.5 w-3.5" />
                <span className="hidden sm:inline">Grille</span>
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`flex items-center gap-1.5 rounded-xs px-3 py-1.5 text-xs font-medium transition-colors ${
                  viewMode === 'list'
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                <List className="h-3.5 w-3.5" />
                <span className="hidden sm:inline">Liste</span>
              </button>
            </div>
          </div>

          {/* Grid View */}
          {viewMode === 'grid' && (
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
              {filtered.map((mod) => {
                const content = (
                  <div
                    className={`group flex h-[140px] w-full flex-col items-center justify-center gap-3 rounded-xs border bg-card p-4 transition-all ${
                      mod.available
                        ? 'hover:shadow-md hover:border-primary/30'
                        : 'opacity-45'
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
                      {!mod.available && (
                        <div className="absolute -right-1.5 -top-1.5 h-2.5 w-2.5 rounded-full bg-muted-foreground/40" />
                      )}
                    </div>
                    <span className="text-center text-xs font-medium text-foreground font-mono leading-tight">
                      {mod.name}
                    </span>
                  </div>
                );

                if (mod.available) {
                  return (
                    <Link key={mod.name} href={mod.href}>
                      {content}
                    </Link>
                  );
                }
                return (
                  <div key={mod.name} className="cursor-default">
                    {content}
                  </div>
                );
              })}
            </div>
          )}

          {/* List View */}
          {viewMode === 'list' && (
            <div className="rounded-xs border bg-card">
              {filtered.map((mod, i) => {
                const content = (
                  <div
                    className={`group flex items-center gap-4 px-5 py-3.5 transition-colors ${
                      mod.available ? 'hover:bg-muted/50' : 'opacity-45'
                    } ${i < filtered.length - 1 ? 'border-b' : ''}`}
                  >
                    <Image
                      src={mod.icon}
                      alt={mod.name}
                      width={40}
                      height={40}
                      className="shrink-0 rounded-xs"
                    />
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm font-semibold text-foreground font-mono">
                        {mod.name}
                      </h3>
                      <p className="mt-0.5 text-xs text-muted-foreground truncate">
                        {mod.description}
                      </p>
                    </div>
                    {mod.stats && mod.available && (
                      <span className="hidden shrink-0 rounded-xs bg-muted px-2 py-1 text-[11px] font-medium font-mono text-muted-foreground sm:inline-block">
                        {mod.stats}
                      </span>
                    )}
                    {!mod.available && (
                      <span className="shrink-0 rounded-xs bg-muted px-2 py-1 text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
                        Bientot
                      </span>
                    )}
                  </div>
                );

                if (mod.available) {
                  return (
                    <Link key={mod.name} href={mod.href}>
                      {content}
                    </Link>
                  );
                }
                return (
                  <div key={mod.name} className="cursor-default">
                    {content}
                  </div>
                );
              })}
            </div>
          )}

          {/* Empty state */}
          {filtered.length === 0 && (
            <div className="flex flex-col items-center justify-center py-20">
              <p className="text-sm text-muted-foreground">
                {'Aucune application trouvee pour "'}<span className="font-mono font-medium text-foreground">{search}</span>{'"'}
              </p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
