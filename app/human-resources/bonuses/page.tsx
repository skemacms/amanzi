'use client';

import { useState } from 'react';
import { Plus, Pencil, Trash2 } from 'lucide-react';
import { mockPrimeDefinitions } from '@/features/human-resources/mock/data';
import type { PrimeDefinition } from '@/features/human-resources/types/prime-definition';

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

      <div className="overflow-hidden rounded-xs border bg-card">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b bg-muted/50">
              <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground">Nom</th>
              <th className="px-4 py-3 text-center text-xs font-medium text-muted-foreground">Imposable</th>
              <th className="px-4 py-3 text-center text-xs font-medium text-muted-foreground">Statut</th>
              <th className="px-4 py-3 text-center text-xs font-medium text-muted-foreground">Ordre</th>
              <th className="px-4 py-3 text-right text-xs font-medium text-muted-foreground">Actions</th>
            </tr>
          </thead>
          <tbody>
            {primes.map((prime) => (
              <tr key={prime.id} className="border-b last:border-b-0 hover:bg-muted/30">
                <td className="px-4 py-3 font-medium text-foreground">{prime.name}</td>
                <td className="px-4 py-3 text-center">
                  <span className={`rounded-xs px-2.5 py-0.5 text-[10px] font-medium ${
                    prime.isTaxable ? 'bg-amber-50 text-amber-700' : 'bg-teal-50 text-teal-700'
                  }`}>
                    {prime.isTaxable ? 'Oui' : 'Non'}
                  </span>
                </td>
                <td className="px-4 py-3 text-center">
                  <span className={`rounded-xs px-2.5 py-0.5 text-[10px] font-medium ${
                    prime.isActive ? 'bg-emerald-50 text-emerald-700' : 'bg-muted text-muted-foreground'
                  }`}>
                    {prime.isActive ? 'Active' : 'Inactive'}
                  </span>
                </td>
                <td className="px-4 py-3 text-center text-muted-foreground">{prime.sortOrder}</td>
                <td className="px-4 py-3 text-right">
                  <div className="inline-flex gap-1">
                    <button className="rounded-xs p-1.5 text-muted-foreground hover:bg-muted hover:text-foreground" title="Modifier">
                      <Pencil className="h-3.5 w-3.5" />
                    </button>
                    <button className="rounded-xs p-1.5 text-muted-foreground hover:bg-red-50 hover:text-red-600" title="Supprimer">
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
