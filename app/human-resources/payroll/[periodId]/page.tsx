'use client';

import { use } from 'react';
import Link from 'next/link';
import { ArrowLeft, Calculator, CheckCircle2 } from 'lucide-react';
import { mockPayrollPeriods, mockAttendances } from '@/features/human-resources/mock/data';
import { PAYROLL_STATUS_LABELS, PayrollPeriodStatus } from '@/core/types/enums';
import { formatDate } from '@/core/lib/utils';

const MONTH_NAMES = [
  '', 'Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin',
  'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre',
];

export default function PeriodDetailPage({ params }: { params: Promise<{ periodId: string }> }) {
  const { periodId } = use(params);
  const period = mockPayrollPeriods.find((p) => p.id === periodId);

  if (!period) {
    return (
      <div className="flex h-full items-center justify-center p-8">
        <p className="text-stone-400">Période introuvable.</p>
      </div>
    );
  }

  const attendances = mockAttendances.filter((a) => a.payrollPeriodId === periodId);

  return (
    <div className="p-8">
      <Link href="/human-resources/payroll" className="mb-6 inline-flex items-center gap-2 text-sm text-stone-400 hover:text-stone-700">
        <ArrowLeft className="h-4 w-4" />
        Retour aux périodes
      </Link>

      <div className="mb-8 flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-stone-900">
            {MONTH_NAMES[period.month]} {period.year}
          </h1>
          <p className="mt-1 text-sm text-stone-500">
            {formatDate(period.startDate)} — {formatDate(period.endDate)}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <span className={`rounded-full px-3 py-1 text-xs font-medium ${
            period.status === PayrollPeriodStatus.DRAFT ? 'bg-stone-100 text-stone-600' :
            period.status === PayrollPeriodStatus.CALCULATED ? 'bg-teal-50 text-teal-700' :
            period.status === PayrollPeriodStatus.VALIDATED ? 'bg-green-50 text-green-700' :
            'bg-stone-200 text-stone-500'
          }`}>
            {PAYROLL_STATUS_LABELS[period.status]}
          </span>
          {period.status === PayrollPeriodStatus.DRAFT && (
            <button className="inline-flex items-center gap-2 rounded-xl bg-teal-600 px-4 py-2 text-sm font-medium text-white hover:bg-teal-700">
              <Calculator className="h-4 w-4" />
              Lancer le calcul
            </button>
          )}
          {period.status === PayrollPeriodStatus.CALCULATED && (
            <button className="inline-flex items-center gap-2 rounded-xl bg-green-600 px-4 py-2 text-sm font-medium text-white hover:bg-green-700">
              <CheckCircle2 className="h-4 w-4" />
              Valider la paie
            </button>
          )}
        </div>
      </div>

      {/* Tableau des présences */}
      <div className="rounded-2xl bg-white">
        <div className="px-6 py-4">
          <h2 className="text-[10px] font-semibold uppercase tracking-widest text-stone-400">
            Présences ({attendances.length} employé(s))
          </h2>
        </div>
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-stone-100">
              <th className="px-4 py-3 text-left font-medium text-stone-500">Code</th>
              <th className="px-4 py-3 text-left font-medium text-stone-500">Employé</th>
              <th className="px-4 py-3 text-right font-medium text-stone-500">Jours travaillés</th>
              <th className="px-4 py-3 text-right font-medium text-stone-500">Norme</th>
              <th className="px-4 py-3 text-right font-medium text-stone-500">Absences</th>
              <th className="px-4 py-3 text-left font-medium text-stone-500">Motif absence</th>
            </tr>
          </thead>
          <tbody>
            {attendances.map((att) => (
              <tr key={att.id} className="hover:bg-stone-50">
                <td className="px-4 py-3 font-mono text-xs">{att.employee?.employeeCode ?? '—'}</td>
                <td className="px-4 py-3 font-medium">
                  {att.employee ? `${att.employee.lastName} ${att.employee.firstName}` : att.employeeId}
                </td>
                <td className="px-4 py-3 text-right">{att.workedValue}</td>
                <td className="px-4 py-3 text-right">{att.normValue}</td>
                <td className="px-4 py-3 text-right">
                  {att.absenceDays > 0 ? (
                    <span className="font-medium text-red-600">{att.absenceDays}</span>
                  ) : (
                    <span className="text-stone-400">0</span>
                  )}
                </td>
                <td className="px-4 py-3 text-stone-500">{att.absenceReason ?? '—'}</td>
              </tr>
            ))}
            {attendances.length === 0 && (
              <tr>
                <td colSpan={6} className="px-4 py-8 text-center text-stone-400">
                  Aucune présence enregistrée pour cette période.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
