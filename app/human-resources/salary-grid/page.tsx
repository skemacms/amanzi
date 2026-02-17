'use client';

import { mockSalaryGrid } from '@/features/human-resources/mock/data';
import { formatCurrency } from '@/core/lib/utils';
import { DataTable, type ColumnDef } from '@/core/components/ui/data-table';

type GridEntry = (typeof mockSalaryGrid)[number];

const categories = [...new Set(mockSalaryGrid.map((e) => e.category))].sort((a, b) => a - b);

const columns: ColumnDef<GridEntry>[] = [
  {
    id: 'convention',
    header: 'Convention',
    accessorFn: (row) => <span className="text-muted-foreground">{row.convention}</span>,
    rawValue: (row) => row.convention,
  },
  {
    id: 'category',
    header: 'Categorie',
    accessorFn: (row) => <span className="font-semibold text-foreground">{row.category}</span>,
    rawValue: (row) => String(row.category),
    align: 'center',
    filterOptions: categories.map((c) => ({ label: `Categorie ${c}`, value: String(c) })),
  },
  {
    id: 'echelon',
    header: 'Echelon',
    accessorFn: (row) => <span className="text-foreground">{row.echelon}</span>,
    rawValue: (row) => String(row.echelon),
    align: 'center',
  },
  {
    id: 'baseSalary',
    header: 'Salaire de base',
    accessorFn: (row) => <span className="font-mono font-medium text-foreground">{formatCurrency(row.baseSalary)}</span>,
    rawValue: (row) => row.baseSalary,
    align: 'right',
  },
  {
    id: 'effectiveDate',
    header: "Date d'effet",
    accessorFn: (row) => <span className="text-muted-foreground">{row.effectiveDate}</span>,
    rawValue: (row) => row.effectiveDate,
  },
];

export default function SalaryGridPage() {
  return (
    <div className="px-6 py-6">
      <div className="mb-5">
        <h1 className="text-xl font-bold text-foreground">Grille salariale</h1>
        <p className="mt-0.5 text-sm text-muted-foreground">Convention Commerce 2025</p>
      </div>

      <DataTable
        data={mockSalaryGrid}
        columns={columns}
        getRowId={(row) => row.id}
        searchPlaceholder="Rechercher dans la grille..."
        emptyMessage="Aucune entree dans la grille salariale."
        pageSizes={[15, 30, 50]}
      />
    </div>
  );
}
