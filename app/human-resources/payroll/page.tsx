'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Plus, Calculator, CheckCircle2, Clock } from 'lucide-react';
import { mockPayrollPeriods } from '@/features/human-resources/mock/data';
import { PAYROLL_STATUS_LABELS, PayrollPeriodStatus } from '@/core/types/enums';
import { formatDate } from '@/core/lib/utils';

const STATUS_COLORS: Record<PayrollPeriodStatus, string> = {
  [PayrollPeriodStatus.DRAFT]: 'bg-muted text-muted-foreground',
  [PayrollPeriodStatus.CALCULATED]: 'bg-sky-50 text-sky-700',
  [PayrollPeriodStatus.VALIDATED]: 'bg-emerald-50 text-emerald-700',
  [PayrollPeriodStatus.CLOSED]: 'bg-muted text-muted-foreground',
};

const MONTH_NAMES = [
  '', 'Janvier', 'Fevrier', 'Mars', 'Avril', 'Mai', 'Juin',
  'Juillet', 'Aout', 'Septembre', 'Octobre', 'Novembre', 'Decembre',
];

export default function PayrollPage() {
  const [periods] = useState(mockPayrollPeriods);

  return (
    <div className="px-6 py-6">
      <div className="mb-5 flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-foreground">Periodes de paie</h1>
          <p className="mt-0.5 text-sm text-muted-foreground">
            Gestion des periodes et calcul de la paie
          </p>
        </div>
        <button className="inline-flex items-center gap-2 rounded-md bg-accent px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-accent/90">
          <Plus className="h-4 w-4" />
          Nouvelle periode
        </button>
      </div>

      <div className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-3">
        {periods.map((period) => (
          <Link key={period.id} href={`/human-resources/payroll/${period.id}`}>
            <div className="rounded-lg border bg-card p-5 transition-all hover:shadow-md hover:border-accent/30">
              <div className="mb-3 flex items-center justify-between">
                <h3 className="text-base font-semibold text-foreground">
                  {MONTH_NAMES[period.month]} {period.year}
                </h3>
                <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${STATUS_COLORS[period.status]}`}>
                  {PAYROLL_STATUS_LABELS[period.status]}
                </span>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Clock className="h-3.5 w-3.5" />
                  <span>{formatDate(period.startDate)} \u2014 {formatDate(period.endDate)}</span>
                </div>
                {period.status === PayrollPeriodStatus.DRAFT && (
                  <div className="mt-3">
                    <span className="inline-flex items-center gap-1 rounded-md bg-sky-50 px-3 py-1.5 text-xs font-medium text-sky-700">
                      <Calculator className="h-3 w-3" />
                      Calculer
                    </span>
                  </div>
                )}
                {period.status === PayrollPeriodStatus.CALCULATED && (
                  <div className="mt-3">
                    <span className="inline-flex items-center gap-1 rounded-md bg-emerald-50 px-3 py-1.5 text-xs font-medium text-emerald-700">
                      <CheckCircle2 className="h-3 w-3" />
                      Valider
                    </span>
                  </div>
                )}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
