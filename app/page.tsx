import Image from 'next/image';
import Link from 'next/link';
import {
  Users,
  ShoppingCart,
  BarChart3,
  Wallet,
  FileText,
  Settings,
  ArrowRight,
  type LucideIcon,
} from 'lucide-react';

interface AppModule {
  name: string;
  description: string;
  href: string;
  icon: LucideIcon;
  color: string;
  available: boolean;
}

const modules: AppModule[] = [
  {
    name: 'Ressources Humaines',
    description: 'Employés, paie, bulletins, primes',
    href: '/human-resources',
    icon: Users,
    color: 'bg-teal-600',
    available: true,
  },
  {
    name: 'Comptabilité',
    description: 'Plan comptable, journaux, écritures',
    href: '/accounting',
    icon: Wallet,
    color: 'bg-stone-600',
    available: false,
  },
  {
    name: 'Ventes',
    description: 'Devis, factures, clients',
    href: '/sales',
    icon: ShoppingCart,
    color: 'bg-teal-700',
    available: false,
  },
  {
    name: 'Rapports',
    description: 'Tableaux de bord, statistiques',
    href: '/reports',
    icon: BarChart3,
    color: 'bg-stone-500',
    available: false,
  },
  {
    name: 'Documents',
    description: 'Modèles, contrats, attestations',
    href: '/documents',
    icon: FileText,
    color: 'bg-teal-800',
    available: false,
  },
  {
    name: 'Paramètres',
    description: 'Entreprise, utilisateurs, configuration',
    href: '/settings',
    icon: Settings,
    color: 'bg-stone-700',
    available: false,
  },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-stone-100">
      {/* Navbar */}
      <header className="bg-stone-900 px-4">
        <div className="mx-auto flex h-11 max-w-6xl items-center justify-between">
          <div className="flex items-center gap-2">
            <Image src="/logo.png" alt="Amanzi" width={24} height={24} />
            <h1 className="text-sm font-semibold text-white tracking-tight">Amanzi</h1>
          </div>
          <p className="text-xs text-stone-400">
            Plateforme de gestion d&apos;entreprise
          </p>
        </div>
      </header>

      {/* Grille d'applications */}
      <main className="mx-auto max-w-6xl px-6 py-10">
        <h2 className="mb-8 text-[10px] font-semibold uppercase tracking-widest text-stone-400">
          Applications
        </h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {modules.map((mod) => {
            const Icon = mod.icon;
            const content = (
              <div
                className={`group relative flex flex-col gap-4 rounded-lg border bg-white p-5 transition-all ${
                  mod.available
                    ? 'cursor-pointer hover:shadow-md'
                    : 'cursor-not-allowed opacity-40'
                }`}
              >
                <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${mod.color}`}>
                  <Icon className="h-5 w-5 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-sm font-semibold text-stone-900">
                    {mod.name}
                  </h3>
                  <p className="mt-1 text-xs text-stone-500">
                    {mod.description}
                  </p>
                </div>
                {mod.available && (
                  <div className="flex items-center gap-1 text-xs font-medium text-teal-600 opacity-0 transition-opacity group-hover:opacity-100">
                    Ouvrir <ArrowRight className="h-3 w-3" />
                  </div>
                )}
                {!mod.available && (
                  <span className="absolute right-4 top-4 rounded-full bg-stone-100 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider text-stone-400">
                    Bientôt
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
            return <div key={mod.name}>{content}</div>;
          })}
        </div>
      </main>
    </div>
  );
}
