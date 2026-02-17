'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Plus, Calculator, CheckCircle2, Clock } from 'lucide-react';
import { mockPayrollPeriods } from '@/features/human-resources/mock/data';
import { PAYROLL_STATUS_LABELS, PayrollPeriodStatus } from '@/core/types/enums';
import { formatDate } from '@/core/lib/utils';

const STATUS_COLORS: Record<PayrollPeriodStatus, string> = {
  [PayrollPeriodStatus.DRAFT]: 'bg-stone-100 text-stone-600',
  [PayrollPeriodStatus.CALCULATED]: 'bg-teal-50 text-teal-700',
  [PayrollPeriodStatus.VALIDATED]: 'bg-green-50 text-green-700',
  [PayrollPeriodStatus.CLOSED]: 'bg-stone-200 text-stone-500',
};

const MONTH_NAMES = [
  '', 'Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin',
  'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre',
];

export default function PayrollPage() {
  const [periods] = useState(mockPayrollPeriods);

  return (
    <div className="p-8">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-stone-900">Périodes de paie</h1>
          <p className="mt-1 text-sm text-stone-500">
            Gestion des périodes et calcul de la paie
          </p>
        </div>
        <button className="inline-flex items-center gap-2 rounded-xl bg-teal-600 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-teal-700">
          <Plus className="h-4 w-4" />
          Nouvelle période
        </button>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
        {periods.map((period) => (
          <Link key={period.id} href={`/human-resources/payroll/${period.id}`}>
            <div className="rounded-2xl bg-white p-6 transition-all hover:shadow-lg hover:shadow-stone-200/50">
              <div className="mb-4 flex items-center justify-between">
                <h3 className="text-lg font-semibold">
                  {MONTH_NAMES[period.month]} {period.year}
                </h3>
                <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${STATUS_COLORS[period.status]}`}>
                  {PAYROLL_STATUS_LABELS[period.status]}
                </span>
              </div>
              <dl className="space-y-2 text-sm">
                <div className="flex items-center gap-2 text-stone-500">
                  <Clock className="h-3.5 w-3.5" />
                  <span>{formatDate(period.startDate)} — {formatDate(period.endDate)}</span>
                </div>
                {period.status === PayrollPeriodStatus.DRAFT && (
                  <div className="mt-3 flex gap-2">
                    <button className="inline-flex items-center gap-1 rounded-md bg-blue-50 px-3 py-1.5 text-xs font-medium text-blue-700 hover:bg-blue-100">
                      <Calculator className="h-3 w-3" />
                      Calculer
                    </button>
                  </div>
                )}
                {period.status === PayrollPeriodStatus.CALCULATED && (
                  <div className="mt-3 flex gap-2">
                    <button className="inline-flex items-center gap-1 rounded-md bg-green-50 px-3 py-1.5 text-xs font-medium text-green-700 hover:bg-green-100">
                      <CheckCircle2 className="h-3 w-3" />
                      Valider
                    </button>
                  </div>
                )}
              </dl>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
