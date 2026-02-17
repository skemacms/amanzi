'use client';

import { use } from 'react';
import Link from 'next/link';
import { ArrowLeft, Calculator, CheckCircle2 } from 'lucide-react';
import { mockPayrollPeriods, mockAttendances } from '@/features/human-resources/mock/data';
import { PAYROLL_STATUS_LABELS, PayrollPeriodStatus } from '@/core/types/enums';
import { formatDate } from '@/core/lib/utils';
import { DataTable, type ColumnDef } from '@/core/components/ui/data-table';

const MONTH_NAMES = [
  '', 'Janvier', 'Fevrier', 'Mars', 'Avril', 'Mai', 'Juin',
  'Juillet', 'Aout', 'Septembre', 'Octobre', 'Novembre', 'Decembre',
];

type AttendanceRow = (typeof mockAttendances)[number];

const attendanceCols: ColumnDef<AttendanceRow>[] = [
  {
    id: 'code',
    header: 'Code',
    accessorFn: (row) => (
      <span className="font-mono text-xs text-muted-foreground">{row.employee?.employeeCode ?? '\u2014'}</span>
    ),
    rawValue: (row) => row.employee?.employeeCode ?? '',
    className: 'w-24',
  },
  {
    id: 'employee',
    header: 'Employe',
    accessorFn: (row) => (
      <span className="font-medium text-foreground">
        {row.employee ? `${row.employee.lastName} ${row.employee.firstName}` : row.employeeId}
      </span>
    ),
    rawValue: (row) =>
      row.employee ? `${row.employee.lastName} ${row.employee.firstName}` : row.employeeId,
  },
  {
    id: 'worked',
    header: 'Jours travailles',
    accessorFn: (row) => <span className="text-foreground">{row.workedValue}</span>,
    rawValue: (row) => row.workedValue,
    align: 'right',
  },
  {
    id: 'norm',
    header: 'Norme',
    accessorFn: (row) => <span className="text-foreground">{row.normValue}</span>,
    rawValue: (row) => row.normValue,
    align: 'right',
  },
  {
    id: 'absences',
    header: 'Absences',
    accessorFn: (row) =>
      row.absenceDays > 0 ? (
        <span className="font-medium text-red-600">{row.absenceDays}</span>
      ) : (
        <span className="text-muted-foreground">0</span>
      ),
    rawValue: (row) => row.absenceDays,
    align: 'right',
  },
  {
    id: 'absenceReason',
    header: 'Motif absence',
    accessorFn: (row) => <span className="text-muted-foreground">{row.absenceReason ?? '\u2014'}</span>,
    rawValue: (row) => row.absenceReason ?? '',
  },
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
            {formatDate(period.startDate)} {'\u2014'} {formatDate(period.endDate)}
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

      {/* Attendance DataTable */}
      <div>
        <h2 className="mb-3 text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">
          Presences ({attendances.length} employe(s))
        </h2>
        <DataTable
          data={attendances}
          columns={attendanceCols}
          getRowId={(row) => row.id}
          searchPlaceholder="Rechercher un employe..."
          emptyMessage="Aucune presence enregistree pour cette periode."
        />
      </div>
    </div>
  );
}
