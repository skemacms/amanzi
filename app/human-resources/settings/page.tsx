'use client';

import { useState } from 'react';
import { Save } from 'lucide-react';
import { mockCompany } from '@/features/human-resources/mock/data';
import { formatCurrency } from '@/core/lib/utils';
import { COMPANY_SIZE_LABELS } from '@/core/types/enums';

export default function ParametresPage() {
  const [company] = useState(mockCompany);

  return (
    <div className="p-8">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-stone-900">Paramètres de l&apos;entreprise</h1>
          <p className="mt-1 text-sm text-stone-500">
            Configuration fiscale et sociale
          </p>
        </div>
        <button className="inline-flex items-center gap-2 rounded-xl bg-teal-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-teal-700">
          <Save className="h-4 w-4" />
          Enregistrer
        </button>
      </div>

      <div className="grid max-w-5xl grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Informations générales */}
        <div className="rounded-2xl bg-white p-6">
          <h2 className="mb-4 text-[10px] font-semibold uppercase tracking-widest text-stone-400">
            Informations générales
          </h2>
          <dl className="space-y-3 text-sm">
            <div className="flex justify-between">
              <dt className="text-stone-500">Nom</dt>
              <dd className="font-medium">{company.name}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-stone-500">NIU</dt>
              <dd className="font-mono font-medium">{company.niu ?? '—'}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-stone-500">N° CNSS</dt>
              <dd className="font-mono font-medium">{company.cnssNumber ?? '—'}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-stone-500">Taille</dt>
              <dd className="font-medium">{COMPANY_SIZE_LABELS[company.size]}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-stone-500">Convention</dt>
              <dd className="font-medium">{company.conventionCollective} ({company.conventionVersion})</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-stone-500">Mode de suivi</dt>
              <dd className="font-medium">{company.workTrackingMode === 'DAYS' ? 'Jours' : 'Heures'}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-stone-500">Norme mensuelle</dt>
              <dd className="font-medium">{company.monthlyWorkNorm} {company.workTrackingMode === 'DAYS' ? 'jours' : 'heures'}</dd>
            </div>
          </dl>
        </div>

        {/* CNSS */}
        <div className="rounded-2xl bg-white p-6">
          <h2 className="mb-4 text-[10px] font-semibold uppercase tracking-widest text-stone-400">
            CNSS
          </h2>
          <dl className="space-y-3 text-sm">
            <div className="flex justify-between">
              <dt className="text-stone-500">Pension salarié</dt>
              <dd className="font-medium">{company.cnssPensionEmployeeRate} %</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-stone-500">Pension employeur</dt>
              <dd className="font-medium">{company.cnssPensionEmployerRate} %</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-stone-500">PF employeur</dt>
              <dd className="font-medium">{company.cnssPfRate} %</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-stone-500">RP employeur</dt>
              <dd className="font-medium">{company.cnssRpRate} %</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-stone-500">Plafond pension</dt>
              <dd className="font-medium">{formatCurrency(company.cnssPensionCeiling)}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-stone-500">Plafond PF/RP</dt>
              <dd className="font-medium">{formatCurrency(company.cnssPfRpCeiling)}</dd>
            </div>
          </dl>
        </div>

        {/* ITS et TOL */}
        <div className="rounded-2xl bg-white p-6">
          <h2 className="mb-4 text-[10px] font-semibold uppercase tracking-widest text-stone-400">
            ITS / TOL
          </h2>
          <dl className="space-y-3 text-sm">
            <div className="flex justify-between">
              <dt className="text-stone-500">ITS activé</dt>
              <dd className="font-medium">{company.itsEnabled ? 'Oui' : 'Non'}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-stone-500">Abattement ITS</dt>
              <dd className="font-medium">{company.itsAbatementRate} %</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-stone-500">Minimum annuel ITS</dt>
              <dd className="font-medium">{formatCurrency(company.itsMinimumAnnual)}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-stone-500">TOL activé</dt>
              <dd className="font-medium">{company.tolEnabled ? 'Oui' : 'Non'}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-stone-500">TOL Centre-ville</dt>
              <dd className="font-medium">{formatCurrency(company.tolAmountDowntown)}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-stone-500">TOL Périphérie</dt>
              <dd className="font-medium">{formatCurrency(company.tolAmountSuburban)}</dd>
            </div>
          </dl>
        </div>

        {/* TUS */}
        <div className="rounded-2xl bg-white p-6">
          <h2 className="mb-4 text-[10px] font-semibold uppercase tracking-widest text-stone-400">
            TUS
          </h2>
          <dl className="space-y-3 text-sm">
            <div className="flex justify-between">
              <dt className="text-stone-500">TUS activé</dt>
              <dd className="font-medium">{company.tusEnabled ? 'Oui' : 'Non'}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-stone-500">Taux DGID</dt>
              <dd className="font-medium">{company.tusRateDgid} %</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-stone-500">Taux CNSS</dt>
              <dd className="font-medium">{company.tusRateCnss} %</dd>
            </div>
          </dl>
        </div>

        {/* Ancienneté */}
        <div className="rounded-2xl bg-white p-6 lg:col-span-2">
          <h2 className="mb-4 text-[10px] font-semibold uppercase tracking-widest text-stone-400">
            Ancienneté
          </h2>
          <dl className="grid grid-cols-2 gap-3 text-sm sm:grid-cols-4">
            <div>
              <dt className="text-stone-500">Taux par année</dt>
              <dd className="font-medium">{company.seniorityRatePerYear} %</dd>
            </div>
            <div>
              <dt className="text-stone-500">Années minimum</dt>
              <dd className="font-medium">{company.seniorityMinYears} ans</dd>
            </div>
            <div>
              <dt className="text-stone-500">Plafond taux</dt>
              <dd className="font-medium">{company.seniorityCapRate} %</dd>
            </div>
            <div>
              <dt className="text-stone-500">Plafond années</dt>
              <dd className="font-medium">{company.seniorityCapYears} ans</dd>
            </div>
            <div>
              <dt className="text-stone-500">Taux senior</dt>
              <dd className="font-medium">{company.senioritySeniorRate} %</dd>
            </div>
            <div>
              <dt className="text-stone-500">Années senior</dt>
              <dd className="font-medium">{company.senioritySeniorYears} ans</dd>
            </div>
          </dl>
        </div>

        {/* Rappels */}
        <div className="rounded-2xl bg-white p-6 lg:col-span-2">
          <h2 className="mb-4 text-[10px] font-semibold uppercase tracking-widest text-stone-400">
            Rappels automatiques
          </h2>
          <dl className="grid grid-cols-2 gap-3 text-sm sm:grid-cols-3">
            <div>
              <dt className="text-stone-500">Rappels fiscaux</dt>
              <dd className="font-medium">{company.fiscalRemindersEnabled ? 'Activés' : 'Désactivés'}</dd>
            </div>
            <div>
              <dt className="text-stone-500">Rappels salaire</dt>
              <dd className="font-medium">{company.salaryRemindersEnabled ? 'Activés' : 'Désactivés'}</dd>
            </div>
            <div>
              <dt className="text-stone-500">Jour de paiement</dt>
              <dd className="font-medium">{company.salaryPaymentDay} du mois</dd>
            </div>
          </dl>
        </div>
      </div>
    </div>
  );
}
