'use client';

import { useState } from 'react';
import { Plus, Pencil, Trash2 } from 'lucide-react';
import { mockPrimeDefinitions } from '@/features/human-resources/mock/data';
import type { PrimeDefinition } from '@/features/human-resources/types/prime-definition';
import { DataTable, type ColumnDef } from '@/core/components/ui/data-table';

const columns: ColumnDef<PrimeDefinition>[] = [
  {
    id: 'name',
    header: 'Nom',
    accessorFn: (row) => <span className="font-medium text-foreground">{row.name}</span>,
    rawValue: (row) => row.name,
  },
  {
    id: 'taxable',
    header: 'Imposable',
    accessorFn: (row) => (
      <span className={`rounded-xs px-2.5 py-0.5 text-[10px] font-medium ${
        row.isTaxable ? 'bg-amber-50 text-amber-700' : 'bg-teal-50 text-teal-700'
      }`}>
        {row.isTaxable ? 'Oui' : 'Non'}
      </span>
    ),
    rawValue: (row) => (row.isTaxable ? 'taxable' : 'non-taxable'),
    align: 'center',
    filterOptions: [
      { label: 'Imposable', value: 'taxable' },
      { label: 'Non imposable', value: 'non-taxable' },
    ],
  },
  {
    id: 'status',
    header: 'Statut',
    accessorFn: (row) => (
      <span className={`rounded-xs px-2.5 py-0.5 text-[10px] font-medium ${
        row.isActive ? 'bg-emerald-50 text-emerald-700' : 'bg-muted text-muted-foreground'
      }`}>
        {row.isActive ? 'Active' : 'Inactive'}
      </span>
    ),
    rawValue: (row) => (row.isActive ? 'active' : 'inactive'),
    align: 'center',
    filterOptions: [
      { label: 'Active', value: 'active' },
      { label: 'Inactive', value: 'inactive' },
    ],
  },
  {
    id: 'order',
    header: 'Ordre',
    accessorFn: (row) => <span className="text-muted-foreground">{row.sortOrder}</span>,
    rawValue: (row) => row.sortOrder,
    align: 'center',
  },
  {
    id: 'actions',
    header: 'Actions',
    accessorFn: () => (
      <div className="inline-flex gap-1">
        <button className="rounded-xs p-1.5 text-muted-foreground hover:bg-muted hover:text-foreground" title="Modifier">
          <Pencil className="h-3.5 w-3.5" />
        </button>
        <button className="rounded-xs p-1.5 text-muted-foreground hover:bg-red-50 hover:text-red-600" title="Supprimer">
          <Trash2 className="h-3.5 w-3.5" />
        </button>
      </div>
    ),
    align: 'right',
  },
];

export default function PrimesPage() {
  const [primes] = useState<PrimeDefinition[]>(mockPrimeDefinitions);

  return (
    <div className="px-6 py-6">
      <div className="mb-5 flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-foreground">Definitions de primes</h1>
          <p className="mt-0.5 text-sm text-muted-foreground">
            Gerer les primes disponibles pour les employes
          </p>
        </div>
        <button className="inline-flex items-center gap-2 rounded-xs bg-accent px-4 py-2 text-sm font-medium text-white hover:bg-accent/90">
          <Plus className="h-4 w-4" />
          Nouvelle prime
        </button>
      </div>

      <DataTable
        data={primes}
        columns={columns}
        getRowId={(row) => row.id}
        searchPlaceholder="Rechercher une prime..."
        emptyMessage="Aucune prime definie."
      />
    </div>
  );
}
