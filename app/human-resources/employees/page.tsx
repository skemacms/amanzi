'use client';

import Link from 'next/link';
import { Plus, Download, MapPin } from 'lucide-react';
import { mockEmployees } from '@/features/human-resources/mock/data';
import { formatCurrency } from '@/core/lib/utils';
import { ZONE_LABELS, MARITAL_STATUS_LABELS, Zone, MaritalStatus } from '@/core/types/enums';
import { DataTable, type ColumnDef } from '@/core/components/ui/data-table';
import type { Employee } from '@/features/human-resources/types/employee';

const columns: ColumnDef<Employee>[] = [
  {
    id: 'code',
    header: 'Code',
    accessorFn: (row) => (
      <Link href={`/human-resources/employees/${row.id}`} className="font-mono text-xs text-accent hover:underline">
        {row.employeeCode}
      </Link>
    ),
    rawValue: (row) => row.employeeCode,
    className: 'w-28',
  },
  {
    id: 'name',
    header: 'Nom complet',
    accessorFn: (row) => (
      <Link href={`/human-resources/employees/${row.id}`} className="font-medium text-foreground hover:underline">
        {row.lastName} {row.firstName}
      </Link>
    ),
    rawValue: (row) => `${row.lastName} ${row.firstName}`,
  },
  {
    id: 'function',
    header: 'Fonction',
    accessorFn: (row) => <span className="text-muted-foreground">{row.functionTitle ?? '\u2014'}</span>,
    rawValue: (row) => row.functionTitle ?? '',
  },
  {
    id: 'maritalStatus',
    header: 'Situation',
    accessorFn: (row) => <span className="text-muted-foreground">{MARITAL_STATUS_LABELS[row.maritalStatus]}</span>,
    rawValue: (row) => row.maritalStatus,
    filterOptions: Object.entries(MARITAL_STATUS_LABELS).map(([value, label]) => ({ value, label })),
  },
  {
    id: 'zone',
    header: 'Zone',
    accessorFn: (row) => (
      <span className="inline-flex items-center gap-1 text-muted-foreground">
        <MapPin className="h-3 w-3" />
        {ZONE_LABELS[row.zone]}
      </span>
    ),
    rawValue: (row) => row.zone,
    filterOptions: Object.entries(ZONE_LABELS).map(([value, label]) => ({ value, label })),
  },
  {
    id: 'salary',
    header: 'Salaire de base',
    accessorFn: (row) => (
      <span className="font-mono font-medium text-foreground">{formatCurrency(row.baseSalary)}</span>
    ),
    rawValue: (row) => row.baseSalary,
    align: 'right',
  },
  {
    id: 'children',
    header: 'Enfants',
    accessorFn: (row) => <span className="text-muted-foreground">{row.numberOfChildren}</span>,
    rawValue: (row) => row.numberOfChildren,
    align: 'center',
    defaultHidden: true,
  },
  {
    id: 'hireDate',
    header: "Date d'embauche",
    accessorFn: (row) => <span className="text-muted-foreground">{row.hireDate ?? '\u2014'}</span>,
    rawValue: (row) => row.hireDate ?? '',
    defaultHidden: true,
  },
];

export default function EmployeesPage() {
  return (
    <div className="px-6 py-6">
      {/* Header */}
      <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-xl font-bold text-foreground">Employes</h1>
          <p className="mt-0.5 text-sm text-muted-foreground">
            {mockEmployees.length} employe(s) actif(s)
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button className="inline-flex items-center gap-2 rounded-xs border bg-card px-3 py-2 text-sm font-medium text-foreground transition-colors hover:bg-muted">
            <Download className="h-4 w-4" />
            Exporter
          </button>
          <Link
            href="/human-resources/employees/new"
            className="inline-flex items-center gap-2 rounded-xs bg-accent px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-accent/90"
          >
            <Plus className="h-4 w-4" />
            Nouvel employe
          </Link>
        </div>
      </div>

      <DataTable
        data={mockEmployees}
        columns={columns}
        getRowId={(row) => row.id}
        searchPlaceholder="Rechercher par nom, code ou fonction..."
        emptyMessage="Aucun employe trouve."
      />
    </div>
  );
}
