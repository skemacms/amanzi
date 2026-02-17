'use client';

import { use } from 'react';
import Link from 'next/link';
import { ArrowLeft, Calculator, CheckCircle2 } from 'lucide-react';
import { mockPayrollPeriods, mockAttendances } from '@/features/human-resources/mock/data';
import { PAYROLL_STATUS_LABELS, PayrollPeriodStatus } from '@/core/types/enums';
import { formatDate } from '@/core/lib/utils';

const MONTH_NAMES = [
  '', 'Janvier', 'Fevrier', 'Mars', 'Avril', 'Mai', 'Juin',
  'Juillet', 'Aout', 'Septembre', 'Octobre', 'Novembre', 'Decembre',
];

export default function PeriodDetailPage({ params }: { params: Promise<{ periodId: string }> }) {
  const { periodId } = use(params);
  const period = mockPayrollPeriods.find((p) => p.id === periodId);

  if (!period) {
    return (
      <div className="flex h-full items-center justify-center p-8">
        <p className="text-muted-foreground">Periode introuvable.</p>
      </div>
    );
  }

  const attendances = mockAttendances.filter((a) => a.payrollPeriodId === periodId);

  return (
    <div className="px-6 py-6">
      <Link href="/human-resources/payroll" className="mb-4 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
        <ArrowLeft className="h-4 w-4" />
        Retour aux periodes
      </Link>

      <div className="mb-6 flex items-start justify-between">
        <div>
          <h1 className="text-xl font-bold text-foreground">
            {MONTH_NAMES[period.month]} {period.year}
          </h1>
          <p className="mt-0.5 text-sm text-muted-foreground">
            {formatDate(period.startDate)} \u2014 {formatDate(period.endDate)}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <span className={`rounded-xs px-3 py-1 text-xs font-medium ${
            period.status === PayrollPeriodStatus.DRAFT ? 'bg-muted text-muted-foreground' :
            period.status === PayrollPeriodStatus.CALCULATED ? 'bg-sky-50 text-sky-700' :
            period.status === PayrollPeriodStatus.VALIDATED ? 'bg-emerald-50 text-emerald-700' :
            'bg-muted text-muted-foreground'
          }`}>
            {PAYROLL_STATUS_LABELS[period.status]}
          </span>
          {period.status === PayrollPeriodStatus.DRAFT && (
            <button className="inline-flex items-center gap-2 rounded-xs bg-accent px-4 py-2 text-sm font-medium text-white hover:bg-accent/90">
              <Calculator className="h-4 w-4" />
              Lancer le calcul
            </button>
          )}
          {period.status === PayrollPeriodStatus.CALCULATED && (
            <button className="inline-flex items-center gap-2 rounded-xs bg-emerald-600 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-700">
              <CheckCircle2 className="h-4 w-4" />
              Valider la paie
            </button>
          )}
        </div>
      </div>

      {/* Attendance table */}
      <div className="rounded-xs border bg-card">
        <div className="border-b px-5 py-3">
          <h2 className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">
            Presences ({attendances.length} employe(s))
          </h2>
        </div>
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b bg-muted/50">
              <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground">Code</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground">Employe</th>
              <th className="px-4 py-3 text-right text-xs font-medium text-muted-foreground">Jours travailles</th>
              <th className="px-4 py-3 text-right text-xs font-medium text-muted-foreground">Norme</th>
              <th className="px-4 py-3 text-right text-xs font-medium text-muted-foreground">Absences</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground">Motif absence</th>
            </tr>
          </thead>
          <tbody>
            {attendances.map((att) => (
              <tr key={att.id} className="border-b last:border-b-0 hover:bg-muted/30">
                <td className="px-4 py-3 font-mono text-xs text-muted-foreground">{att.employee?.employeeCode ?? '\u2014'}</td>
                <td className="px-4 py-3 font-medium text-foreground">
                  {att.employee ? `${att.employee.lastName} ${att.employee.firstName}` : att.employeeId}
                </td>
                <td className="px-4 py-3 text-right text-foreground">{att.workedValue}</td>
                <td className="px-4 py-3 text-right text-foreground">{att.normValue}</td>
                <td className="px-4 py-3 text-right">
                  {att.absenceDays > 0 ? (
                    <span className="font-medium text-red-600">{att.absenceDays}</span>
                  ) : (
                    <span className="text-muted-foreground">0</span>
                  )}
                </td>
                <td className="px-4 py-3 text-muted-foreground">{att.absenceReason ?? '\u2014'}</td>
              </tr>
            ))}
            {attendances.length === 0 && (
              <tr>
                <td colSpan={6} className="px-4 py-8 text-center text-muted-foreground">
                  Aucune presence enregistree pour cette periode.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
