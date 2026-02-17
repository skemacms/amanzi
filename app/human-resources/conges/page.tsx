'use client';

import { Plus, Calendar, Check, Clock, X, User } from 'lucide-react';

const mockLeaves = [
  { id: '1', employee: 'Jean-Baptiste Mouanda', type: 'Conge annuel', startDate: '2025-08-04', endDate: '2025-08-18', days: 10, status: 'approved' as const, requestDate: '2025-07-10' },
  { id: '2', employee: 'Marie-Claire Ngoma', type: 'Conge maladie', startDate: '2025-07-21', endDate: '2025-07-22', days: 2, status: 'approved' as const, requestDate: '2025-07-21' },
  { id: '3', employee: 'Patrick Makosso', type: 'Conge annuel', startDate: '2025-09-01', endDate: '2025-09-12', days: 8, status: 'pending' as const, requestDate: '2025-07-15' },
  { id: '4', employee: 'Cedric Banzouzi', type: 'Conge personnel', startDate: '2025-07-28', endDate: '2025-07-28', days: 1, status: 'pending' as const, requestDate: '2025-07-20' },
  { id: '5', employee: 'Marie-Claire Ngoma', type: 'Conge annuel', startDate: '2025-06-10', endDate: '2025-06-11', days: 2, status: 'rejected' as const, requestDate: '2025-06-01' },
];

const statusConfig = {
  approved: { label: 'Approuve', bg: 'bg-emerald-50 text-emerald-700', icon: Check },
  pending: { label: 'En attente', bg: 'bg-amber-50 text-amber-700', icon: Clock },
  rejected: { label: 'Refuse', bg: 'bg-red-50 text-red-700', icon: X },
};

const leaveTypes = ['Conge annuel', 'Conge maladie', 'Conge personnel', 'Conge maternite', 'Conge exceptionnel'];

export default function CongesPage() {
  return (
    <div className="px-6 py-6">
      <div className="mb-5 flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-foreground">Conges et absences</h1>
          <p className="mt-0.5 text-sm text-muted-foreground">
            Gestion des demandes de conge et absences
          </p>
        </div>
        <button className="inline-flex items-center gap-2 rounded-xs bg-accent px-4 py-2 text-sm font-medium text-white hover:bg-accent/90">
          <Plus className="h-4 w-4" />
          Nouvelle demande
        </button>
      </div>

      {/* Stats */}
      <div className="mb-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
        <div className="rounded-xs border bg-card p-4">
          <p className="font-mono text-2xl font-bold text-foreground">{mockLeaves.length}</p>
          <p className="text-xs text-muted-foreground">Total demandes</p>
        </div>
        <div className="rounded-xs border bg-card p-4">
          <p className="font-mono text-2xl font-bold text-amber-600">{mockLeaves.filter(l => l.status === 'pending').length}</p>
          <p className="text-xs text-muted-foreground">En attente</p>
        </div>
        <div className="rounded-xs border bg-card p-4">
          <p className="font-mono text-2xl font-bold text-emerald-600">{mockLeaves.filter(l => l.status === 'approved').length}</p>
          <p className="text-xs text-muted-foreground">Approuves</p>
        </div>
        <div className="rounded-xs border bg-card p-4">
          <p className="font-mono text-2xl font-bold text-foreground">{mockLeaves.reduce((a, l) => a + l.days, 0)}</p>
          <p className="text-xs text-muted-foreground">Jours total</p>
        </div>
      </div>

      {/* Leave type pills */}
      <div className="mb-4 flex flex-wrap gap-2">
        <span className="rounded-xs bg-accent/10 px-2.5 py-1 text-[11px] font-medium text-accent">Tous</span>
        {leaveTypes.map((type) => (
          <span key={type} className="rounded-xs border px-2.5 py-1 text-[11px] font-medium text-muted-foreground hover:bg-muted">
            {type}
          </span>
        ))}
      </div>

      {/* Leave requests */}
      <div className="rounded-xs border bg-card">
        {mockLeaves.map((leave, i) => {
          const config = statusConfig[leave.status];
          const StatusIcon = config.icon;
          return (
            <div key={leave.id} className={`flex items-center gap-4 px-5 py-4 ${i < mockLeaves.length - 1 ? 'border-b' : ''} hover:bg-muted/30 transition-colors`}>
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xs bg-muted">
                <Calendar className="h-5 w-5 text-muted-foreground" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <h3 className="text-sm font-semibold text-foreground">{leave.type}</h3>
                  <span className={`inline-flex items-center gap-1 rounded-xs px-2 py-0.5 text-[10px] font-semibold ${config.bg}`}>
                    <StatusIcon className="h-3 w-3" />
                    {config.label}
                  </span>
                </div>
                <div className="mt-0.5 flex items-center gap-3 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1"><User className="h-3 w-3" />{leave.employee}</span>
                  <span>Du {new Date(leave.startDate).toLocaleDateString('fr-FR')} au {new Date(leave.endDate).toLocaleDateString('fr-FR')}</span>
                  <span className="font-mono font-semibold">{leave.days}j</span>
                </div>
              </div>
              {leave.status === 'pending' && (
                <div className="flex gap-1">
                  <button className="rounded-xs bg-emerald-600 p-1.5 text-white hover:bg-emerald-700"><Check className="h-3.5 w-3.5" /></button>
                  <button className="rounded-xs bg-red-600 p-1.5 text-white hover:bg-red-700"><X className="h-3.5 w-3.5" /></button>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
