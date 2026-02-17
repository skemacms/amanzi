'use client';

import { Award, Calendar, User, Check, Clock, AlertTriangle } from 'lucide-react';

const mockCertifications = [
  { id: '1', employee: 'Jean-Baptiste Mouanda', certification: 'AWS Solutions Architect', organisme: 'Amazon', obtainedDate: '2024-03-15', expiryDate: '2027-03-15', status: 'active' as const },
  { id: '2', employee: 'Jean-Baptiste Mouanda', certification: 'Scrum Master PSM I', organisme: 'Scrum.org', obtainedDate: '2023-06-10', expiryDate: null, status: 'active' as const },
  { id: '3', employee: 'Marie-Claire Ngoma', certification: 'OHADA Expert Comptable', organisme: 'OHADA', obtainedDate: '2022-12-01', expiryDate: '2025-12-01', status: 'expiring' as const },
  { id: '4', employee: 'Patrick Makosso', certification: 'Certification Vente B2B', organisme: 'HubSpot', obtainedDate: '2021-08-20', expiryDate: '2024-08-20', status: 'expired' as const },
];

const statusStyles = {
  active: { label: 'Active', bg: 'bg-emerald-50 text-emerald-700', icon: Check },
  expiring: { label: 'Expire bientot', bg: 'bg-amber-50 text-amber-700', icon: Clock },
  expired: { label: 'Expiree', bg: 'bg-red-50 text-red-700', icon: AlertTriangle },
};

export default function CertificationsPage() {
  return (
    <div className="px-6 py-6">
      <div className="mb-5 flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-foreground">Certifications</h1>
          <p className="mt-0.5 text-sm text-muted-foreground">
            Suivi des certifications et qualifications des employes
          </p>
        </div>
        <button className="inline-flex items-center gap-2 rounded-xs bg-accent px-4 py-2 text-sm font-medium text-white hover:bg-accent/90">
          <Award className="h-4 w-4" />
          Nouvelle certification
        </button>
      </div>

      {/* Stats */}
      <div className="mb-6 grid grid-cols-3 gap-3">
        <div className="rounded-xs border bg-card p-4">
          <p className="font-mono text-2xl font-bold text-foreground">{mockCertifications.filter(c => c.status === 'active').length}</p>
          <p className="text-xs text-muted-foreground">Actives</p>
        </div>
        <div className="rounded-xs border bg-card p-4">
          <p className="font-mono text-2xl font-bold text-amber-600">{mockCertifications.filter(c => c.status === 'expiring').length}</p>
          <p className="text-xs text-muted-foreground">Expirent bientot</p>
        </div>
        <div className="rounded-xs border bg-card p-4">
          <p className="font-mono text-2xl font-bold text-red-600">{mockCertifications.filter(c => c.status === 'expired').length}</p>
          <p className="text-xs text-muted-foreground">Expirees</p>
        </div>
      </div>

      {/* List */}
      <div className="rounded-xs border bg-card">
        {mockCertifications.map((cert, i) => {
          const style = statusStyles[cert.status];
          const StatusIcon = style.icon;
          return (
            <div key={cert.id} className={`flex items-center gap-4 px-5 py-4 ${i < mockCertifications.length - 1 ? 'border-b' : ''}`}>
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xs bg-accent/10">
                <Award className="h-5 w-5 text-accent" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-sm font-semibold text-foreground">{cert.certification}</h3>
                <div className="mt-0.5 flex items-center gap-3 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1"><User className="h-3 w-3" />{cert.employee}</span>
                  <span>{cert.organisme}</span>
                  <span className="flex items-center gap-1"><Calendar className="h-3 w-3" />{new Date(cert.obtainedDate).toLocaleDateString('fr-FR')}</span>
                </div>
              </div>
              <span className={`inline-flex items-center gap-1 rounded-xs px-2 py-1 text-[10px] font-semibold ${style.bg}`}>
                <StatusIcon className="h-3 w-3" />
                {style.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
