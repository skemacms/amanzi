'use client';

import { useState } from 'react';
import { Save } from 'lucide-react';
import { mockCompany } from '@/features/human-resources/mock/data';
import { formatCurrency } from '@/core/lib/utils';
import { COMPANY_SIZE_LABELS } from '@/core/types/enums';
import { useToast } from '@/core/stores/toast-store';

export default function ParametresPage() {
  const [company] = useState(mockCompany);
  const { addToast } = useToast();

  const handleSave = () => {
    addToast({
      title: 'Parametres sauvegardes',
      description: 'La configuration RH a ete mise a jour.',
      variant: 'success',
    });
  };

  return (
    <div className="px-6 py-6">
      <div className="mb-5 flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-foreground">Parametres de l{"'"}entreprise</h1>
          <p className="mt-0.5 text-sm text-muted-foreground">
            Configuration fiscale et sociale
          </p>
        </div>
        <button
          onClick={handleSave}
          className="inline-flex items-center gap-2 rounded-md bg-accent px-4 py-2 text-sm font-medium text-white hover:bg-accent/90"
        >
          <Save className="h-4 w-4" />
          Enregistrer
        </button>
      </div>

      <div className="grid max-w-5xl grid-cols-1 gap-4 lg:grid-cols-2">
        {/* General info */}
        <div className="rounded-lg border bg-card p-5">
          <h2 className="mb-3 text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">
            Informations generales
          </h2>
          <dl className="space-y-2.5 text-sm">
            <div className="flex justify-between">
              <dt className="text-muted-foreground">Nom</dt>
              <dd className="font-medium text-foreground">{company.name}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-muted-foreground">NIU</dt>
              <dd className="font-mono font-medium text-foreground">{company.niu ?? '\u2014'}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-muted-foreground">N CNSS</dt>
              <dd className="font-mono font-medium text-foreground">{company.cnssNumber ?? '\u2014'}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-muted-foreground">Taille</dt>
              <dd className="font-medium text-foreground">{COMPANY_SIZE_LABELS[company.size]}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-muted-foreground">Convention</dt>
              <dd className="font-medium text-foreground">{company.conventionCollective} ({company.conventionVersion})</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-muted-foreground">Mode de suivi</dt>
              <dd className="font-medium text-foreground">{company.workTrackingMode === 'DAYS' ? 'Jours' : 'Heures'}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-muted-foreground">Norme mensuelle</dt>
              <dd className="font-medium text-foreground">{company.monthlyWorkNorm} {company.workTrackingMode === 'DAYS' ? 'jours' : 'heures'}</dd>
            </div>
          </dl>
        </div>

        {/* CNSS */}
        <div className="rounded-lg border bg-card p-5">
          <h2 className="mb-3 text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">
            CNSS
          </h2>
          <dl className="space-y-2.5 text-sm">
            <div className="flex justify-between">
              <dt className="text-muted-foreground">Pension salarie</dt>
              <dd className="font-medium text-foreground">{company.cnssPensionEmployeeRate} %</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-muted-foreground">Pension employeur</dt>
              <dd className="font-medium text-foreground">{company.cnssPensionEmployerRate} %</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-muted-foreground">PF employeur</dt>
              <dd className="font-medium text-foreground">{company.cnssPfRate} %</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-muted-foreground">RP employeur</dt>
              <dd className="font-medium text-foreground">{company.cnssRpRate} %</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-muted-foreground">Plafond pension</dt>
              <dd className="font-mono font-medium text-foreground">{formatCurrency(company.cnssPensionCeiling)}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-muted-foreground">Plafond PF/RP</dt>
              <dd className="font-mono font-medium text-foreground">{formatCurrency(company.cnssPfRpCeiling)}</dd>
            </div>
          </dl>
        </div>

        {/* ITS/TOL */}
        <div className="rounded-lg border bg-card p-5">
          <h2 className="mb-3 text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">
            ITS / TOL
          </h2>
          <dl className="space-y-2.5 text-sm">
            <div className="flex justify-between">
              <dt className="text-muted-foreground">ITS active</dt>
              <dd className="font-medium text-foreground">{company.itsEnabled ? 'Oui' : 'Non'}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-muted-foreground">Abattement ITS</dt>
              <dd className="font-medium text-foreground">{company.itsAbatementRate} %</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-muted-foreground">Minimum annuel ITS</dt>
              <dd className="font-mono font-medium text-foreground">{formatCurrency(company.itsMinimumAnnual)}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-muted-foreground">TOL active</dt>
              <dd className="font-medium text-foreground">{company.tolEnabled ? 'Oui' : 'Non'}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-muted-foreground">TOL Centre-ville</dt>
              <dd className="font-mono font-medium text-foreground">{formatCurrency(company.tolAmountDowntown)}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-muted-foreground">TOL Peripherie</dt>
              <dd className="font-mono font-medium text-foreground">{formatCurrency(company.tolAmountSuburban)}</dd>
            </div>
          </dl>
        </div>

        {/* TUS */}
        <div className="rounded-lg border bg-card p-5">
          <h2 className="mb-3 text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">
            TUS
          </h2>
          <dl className="space-y-2.5 text-sm">
            <div className="flex justify-between">
              <dt className="text-muted-foreground">TUS active</dt>
              <dd className="font-medium text-foreground">{company.tusEnabled ? 'Oui' : 'Non'}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-muted-foreground">Taux DGID</dt>
              <dd className="font-medium text-foreground">{company.tusRateDgid} %</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-muted-foreground">Taux CNSS</dt>
              <dd className="font-medium text-foreground">{company.tusRateCnss} %</dd>
            </div>
          </dl>
        </div>

        {/* Seniority */}
        <div className="rounded-lg border bg-card p-5 lg:col-span-2">
          <h2 className="mb-3 text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">
            Anciennete
          </h2>
          <dl className="grid grid-cols-2 gap-3 text-sm sm:grid-cols-4">
            <div>
              <dt className="text-muted-foreground">Taux par annee</dt>
              <dd className="font-medium text-foreground">{company.seniorityRatePerYear} %</dd>
            </div>
            <div>
              <dt className="text-muted-foreground">Annees minimum</dt>
              <dd className="font-medium text-foreground">{company.seniorityMinYears} ans</dd>
            </div>
            <div>
              <dt className="text-muted-foreground">Plafond taux</dt>
              <dd className="font-medium text-foreground">{company.seniorityCapRate} %</dd>
            </div>
            <div>
              <dt className="text-muted-foreground">Plafond annees</dt>
              <dd className="font-medium text-foreground">{company.seniorityCapYears} ans</dd>
            </div>
            <div>
              <dt className="text-muted-foreground">Taux senior</dt>
              <dd className="font-medium text-foreground">{company.senioritySeniorRate} %</dd>
            </div>
            <div>
              <dt className="text-muted-foreground">Annees senior</dt>
              <dd className="font-medium text-foreground">{company.senioritySeniorYears} ans</dd>
            </div>
          </dl>
        </div>

        {/* Reminders */}
        <div className="rounded-lg border bg-card p-5 lg:col-span-2">
          <h2 className="mb-3 text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">
            Rappels automatiques
          </h2>
          <dl className="grid grid-cols-2 gap-3 text-sm sm:grid-cols-3">
            <div>
              <dt className="text-muted-foreground">Rappels fiscaux</dt>
              <dd className="font-medium text-foreground">{company.fiscalRemindersEnabled ? 'Actives' : 'Desactives'}</dd>
            </div>
            <div>
              <dt className="text-muted-foreground">Rappels salaire</dt>
              <dd className="font-medium text-foreground">{company.salaryRemindersEnabled ? 'Actives' : 'Desactives'}</dd>
            </div>
            <div>
              <dt className="text-muted-foreground">Jour de paiement</dt>
              <dd className="font-medium text-foreground">{company.salaryPaymentDay} du mois</dd>
            </div>
          </dl>
        </div>
      </div>
    </div>
  );
}
