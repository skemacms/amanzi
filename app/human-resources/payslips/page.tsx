'use client';

import Link from 'next/link';
import { mockPayslips, mockEmployees } from '@/features/human-resources/mock/data';
import { formatCurrency } from '@/core/lib/utils';
import { DataTable, type ColumnDef } from '@/core/components/ui/data-table';

type PayslipRow = (typeof mockPayslips)[number] & {
  employeeName: string;
};

const payslipRows: PayslipRow[] = mockPayslips.map((ps) => {
  const emp = mockEmployees.find((e) => e.id === ps.employeeId);
  return {
    ...ps,
    employeeName: emp ? `${emp.lastName} ${emp.firstName}` : ps.employeeId,
  };
});

const columns: ColumnDef<PayslipRow>[] = [
  {
    id: 'employee',
    header: 'Employe',
    accessorFn: (row) => (
      <Link href={`/human-resources/payslips/${row.id}`} className="font-medium text-accent hover:underline">
        {row.employeeName}
      </Link>
    ),
    rawValue: (row) => row.employeeName,
  },
  {
    id: 'baseSalary',
    header: 'Salaire de base',
    accessorFn: (row) => <span className="font-mono text-foreground">{formatCurrency(row.baseSalary)}</span>,
    rawValue: (row) => row.baseSalary,
    align: 'right',
  },
  {
    id: 'grossTaxable',
    header: 'Brut imposable',
    accessorFn: (row) => <span className="font-mono text-foreground">{formatCurrency(row.grossTaxable)}</span>,
    rawValue: (row) => row.grossTaxable,
    align: 'right',
  },
  {
    id: 'employeeDeductions',
    header: 'Retenues salarie',
    accessorFn: (row) => <span className="font-mono text-red-600">{formatCurrency(row.totalEmployeeDeductions)}</span>,
    rawValue: (row) => row.totalEmployeeDeductions,
    align: 'right',
  },
  {
    id: 'employerCharges',
    header: 'Charges patronales',
    accessorFn: (row) => <span className="font-mono text-amber-600">{formatCurrency(row.totalEmployerCharges)}</span>,
    rawValue: (row) => row.totalEmployerCharges,
    align: 'right',
  },
  {
    id: 'netPay',
    header: 'Net a payer',
    accessorFn: (row) => <span className="font-mono font-bold text-emerald-700">{formatCurrency(row.netPay)}</span>,
    rawValue: (row) => row.netPay,
    align: 'right',
  },
];

export default function BulletinsPage() {
  return (
    <div className="px-6 py-6">
      <div className="mb-5">
        <h1 className="text-xl font-bold text-foreground">Bulletins de paie</h1>
        <p className="mt-0.5 text-sm text-muted-foreground">
          Consulter les bulletins emis par periode
        </p>
      </div>

      <DataTable
        data={payslipRows}
        columns={columns}
        getRowId={(row) => row.id}
        searchPlaceholder="Rechercher un employe..."
        emptyMessage="Aucun bulletin de paie."
      />
    </div>
  );
}
