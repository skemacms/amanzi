'use client';

import { useState } from 'react';
import { Plus, Pencil, Trash2 } from 'lucide-react';
import { mockPrimeDefinitions } from '@/features/human-resources/mock/data';
import type { PrimeDefinition } from '@/features/human-resources/types/prime-definition';

export default function PrimesPage() {
  const [primes] = useState<PrimeDefinition[]>(mockPrimeDefinitions);

  return (
    <div className="p-8">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-stone-900">Définitions de primes</h1>
          <p className="mt-1 text-sm text-stone-500">
            Gérer les primes disponibles pour les employés
          </p>
        </div>
        <button className="inline-flex items-center gap-2 rounded-xl bg-teal-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-teal-700">
          <Plus className="h-4 w-4" />
          Nouvelle prime
        </button>
      </div>

      <div className="overflow-hidden rounded-2xl bg-white">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-stone-100">
              <th className="px-4 py-3 text-left font-medium text-stone-500">Nom</th>
              <th className="px-4 py-3 text-center font-medium text-stone-500">Imposable</th>
              <th className="px-4 py-3 text-center font-medium text-stone-500">Statut</th>
              <th className="px-4 py-3 text-center font-medium text-stone-500">Ordre</th>
              <th className="px-4 py-3 text-right font-medium text-stone-500">Actions</th>
            </tr>
          </thead>
          <tbody>
            {primes.map((prime) => (
              <tr key={prime.id} className="hover:bg-stone-50">
                <td className="px-4 py-3 font-medium">{prime.name}</td>
                <td className="px-4 py-3 text-center">
                  <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${
                    prime.isTaxable ? 'bg-amber-50 text-amber-700' : 'bg-teal-50 text-teal-700'
                  }`}>
                    {prime.isTaxable ? 'Oui' : 'Non'}
                  </span>
                </td>
                <td className="px-4 py-3 text-center">
                  <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${
                    prime.isActive ? 'bg-teal-50 text-teal-700' : 'bg-stone-100 text-stone-400'
                  }`}>
                    {prime.isActive ? 'Active' : 'Inactive'}
                  </span>
                </td>
                <td className="px-4 py-3 text-center text-stone-500">{prime.sortOrder}</td>
                <td className="px-4 py-3 text-right">
                  <div className="inline-flex gap-1">
                    <button className="rounded-lg p-1.5 text-stone-400 hover:bg-stone-100 hover:text-stone-700" title="Modifier">
                      <Pencil className="h-3.5 w-3.5" />
                    </button>
                    <button className="rounded-lg p-1.5 text-stone-400 hover:bg-red-50 hover:text-red-600" title="Supprimer">
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
