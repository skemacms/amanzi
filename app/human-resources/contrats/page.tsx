'use client';

import { Plus, FileText, Calendar, User, Check, Clock, AlertTriangle } from 'lucide-react';

const mockContracts = [
  { id: '1', employee: 'Jean-Baptiste Mouanda', type: 'CDI', startDate: '2020-02-01', endDate: null, position: 'Developpeur Senior', salary: 450_000, status: 'active' as const },
  { id: '2', employee: 'Marie-Claire Ngoma', type: 'CDD', startDate: '2022-09-15', endDate: '2025-09-14', position: 'Comptable', salary: 350_000, status: 'active' as const },
  { id: '3', employee: 'Patrick Makosso', type: 'CDI', startDate: '2018-04-10', endDate: null, position: 'Directeur Commercial', salary: 600_000, status: 'active' as const },
  { id: '4', employee: 'Cedric Banzouzi', type: 'Stage', startDate: '2024-06-01', endDate: '2025-06-01', position: 'Stagiaire Developpeur', salary: 200_000, status: 'expiring' as const },
];

const statusConfig = {
  active: { label: 'Actif', bg: 'bg-emerald-50 text-emerald-700', icon: Check },
  expiring: { label: 'Expire bientot', bg: 'bg-amber-50 text-amber-700', icon: Clock },
  expired: { label: 'Expire', bg: 'bg-red-50 text-red-700', icon: AlertTriangle },
};

const typeColors: Record<string, string> = {
  CDI: 'bg-teal-50 text-teal-700',
  CDD: 'bg-sky-50 text-sky-700',
  Stage: 'bg-amber-50 text-amber-700',
  Interim: 'bg-indigo-50 text-indigo-700',
};

function formatCurrency(val: number) {
  return new Intl.NumberFormat('fr-FR').format(val) + ' FCFA';
}

export default function ContratsPage() {
  return (
    <div className="px-6 py-6">
      <div className="mb-5 flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-foreground">Contrats</h1>
          <p className="mt-0.5 text-sm text-muted-foreground">
            Gestion des contrats de travail
          </p>
        </div>
        <button className="inline-flex items-center gap-2 rounded-xs bg-accent px-4 py-2 text-sm font-medium text-white hover:bg-accent/90">
          <Plus className="h-4 w-4" />
          Nouveau contrat
        </button>
      </div>

      {/* Stats */}
      <div className="mb-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
        <div className="rounded-xs border bg-card p-4">
          <p className="font-mono text-2xl font-bold text-foreground">{mockContracts.length}</p>
          <p className="text-xs text-muted-foreground">Total contrats</p>
        </div>
        <div className="rounded-xs border bg-card p-4">
          <p className="font-mono text-2xl font-bold text-emerald-600">{mockContracts.filter(c => c.status === 'active').length}</p>
          <p className="text-xs text-muted-foreground">Actifs</p>
        </div>
        <div className="rounded-xs border bg-card p-4">
          <p className="font-mono text-2xl font-bold text-foreground">{mockContracts.filter(c => c.type === 'CDI').length}</p>
          <p className="text-xs text-muted-foreground">CDI</p>
        </div>
        <div className="rounded-xs border bg-card p-4">
          <p className="font-mono text-2xl font-bold text-amber-600">{mockContracts.filter(c => c.status === 'expiring').length}</p>
          <p className="text-xs text-muted-foreground">Expirent bientot</p>
        </div>
      </div>

      {/* Contracts list */}
      <div className="rounded-xs border bg-card">
        {mockContracts.map((contract, i) => {
          const config = statusConfig[contract.status];
          const StatusIcon = config.icon;
          return (
            <div key={contract.id} className={`flex items-center gap-4 px-5 py-4 ${i < mockContracts.length - 1 ? 'border-b' : ''} hover:bg-muted/30 transition-colors`}>
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xs bg-accent/10">
                <FileText className="h-5 w-5 text-accent" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <h3 className="text-sm font-semibold text-foreground">{contract.position}</h3>
                  <span className={`rounded-xs px-2 py-0.5 text-[10px] font-bold ${typeColors[contract.type] ?? 'bg-muted text-muted-foreground'}`}>
                    {contract.type}
                  </span>
                  <span className={`inline-flex items-center gap-1 rounded-xs px-2 py-0.5 text-[10px] font-semibold ${config.bg}`}>
                    <StatusIcon className="h-3 w-3" />
                    {config.label}
                  </span>
                </div>
                <div className="mt-0.5 flex items-center gap-3 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1"><User className="h-3 w-3" />{contract.employee}</span>
                  <span className="flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    {new Date(contract.startDate).toLocaleDateString('fr-FR')}
                    {contract.endDate ? ` - ${new Date(contract.endDate).toLocaleDateString('fr-FR')}` : ' (indetermine)'}
                  </span>
                  <span className="font-mono font-semibold">{formatCurrency(contract.salary)}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
