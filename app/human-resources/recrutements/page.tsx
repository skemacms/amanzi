'use client';

import { Plus, Users, Clock, CheckCircle, XCircle, Eye, Calendar } from 'lucide-react';

const mockOffers = [
  { id: '1', title: 'Developpeur Full-Stack', department: 'Technologie', site: 'Brazzaville', publishedDate: '2025-06-15', candidates: 12, status: 'open' as const, deadline: '2025-08-15' },
  { id: '2', title: 'Chef Comptable', department: 'Finance', site: 'Brazzaville', publishedDate: '2025-05-01', candidates: 8, status: 'interviewing' as const, deadline: '2025-07-31' },
  { id: '3', title: 'Commercial Terrain', department: 'Commercial', site: 'Pointe-Noire', publishedDate: '2025-04-10', candidates: 15, status: 'closed' as const, deadline: '2025-06-10' },
  { id: '4', title: 'Assistante Administrative', department: 'Ressources Humaines', site: 'Brazzaville', publishedDate: '2025-07-01', candidates: 3, status: 'draft' as const, deadline: '2025-09-01' },
];

const statusConfig = {
  draft: { label: 'Brouillon', bg: 'bg-muted text-muted-foreground', icon: Clock },
  open: { label: 'Ouverte', bg: 'bg-emerald-50 text-emerald-700', icon: CheckCircle },
  interviewing: { label: 'Entretiens', bg: 'bg-sky-50 text-sky-700', icon: Users },
  closed: { label: 'Fermee', bg: 'bg-red-50 text-red-700', icon: XCircle },
};

export default function RecrutementsPage() {
  return (
    <div className="px-6 py-6">
      <div className="mb-5 flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-foreground">Recrutements</h1>
          <p className="mt-0.5 text-sm text-muted-foreground">
            Offres d{"'"}emploi et suivi des candidatures
          </p>
        </div>
        <button className="inline-flex items-center gap-2 rounded-xs bg-accent px-4 py-2 text-sm font-medium text-white hover:bg-accent/90">
          <Plus className="h-4 w-4" />
          Nouvelle offre
        </button>
      </div>

      {/* Stats */}
      <div className="mb-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
        <div className="rounded-xs border bg-card p-4">
          <p className="font-mono text-2xl font-bold text-foreground">{mockOffers.length}</p>
          <p className="text-xs text-muted-foreground">Total offres</p>
        </div>
        <div className="rounded-xs border bg-card p-4">
          <p className="font-mono text-2xl font-bold text-emerald-600">{mockOffers.filter(o => o.status === 'open').length}</p>
          <p className="text-xs text-muted-foreground">Ouvertes</p>
        </div>
        <div className="rounded-xs border bg-card p-4">
          <p className="font-mono text-2xl font-bold text-sky-600">{mockOffers.filter(o => o.status === 'interviewing').length}</p>
          <p className="text-xs text-muted-foreground">En entretien</p>
        </div>
        <div className="rounded-xs border bg-card p-4">
          <p className="font-mono text-2xl font-bold text-foreground">{mockOffers.reduce((a, o) => a + o.candidates, 0)}</p>
          <p className="text-xs text-muted-foreground">Candidatures</p>
        </div>
      </div>

      {/* Offers */}
      <div className="rounded-xs border bg-card">
        {mockOffers.map((offer, i) => {
          const config = statusConfig[offer.status];
          const StatusIcon = config.icon;
          return (
            <div key={offer.id} className={`flex items-center gap-4 px-5 py-4 ${i < mockOffers.length - 1 ? 'border-b' : ''} hover:bg-muted/30 transition-colors`}>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <h3 className="text-sm font-semibold text-foreground">{offer.title}</h3>
                  <span className={`inline-flex items-center gap-1 rounded-xs px-2 py-0.5 text-[10px] font-semibold ${config.bg}`}>
                    <StatusIcon className="h-3 w-3" />
                    {config.label}
                  </span>
                </div>
                <div className="mt-1 flex items-center gap-3 text-xs text-muted-foreground">
                  <span>{offer.department}</span>
                  <span>{offer.site}</span>
                  <span className="flex items-center gap-1"><Calendar className="h-3 w-3" />Limite: {new Date(offer.deadline).toLocaleDateString('fr-FR')}</span>
                  <span className="flex items-center gap-1"><Users className="h-3 w-3" />{offer.candidates} candidats</span>
                </div>
              </div>
              <button className="flex items-center gap-1 rounded-xs border px-3 py-1.5 text-xs font-medium text-foreground hover:bg-muted">
                <Eye className="h-3.5 w-3.5" /> Voir
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
