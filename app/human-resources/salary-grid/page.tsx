'use client';

import { useState } from 'react';
import { mockSalaryGrid } from '@/features/human-resources/mock/data';
import { formatCurrency } from '@/core/lib/utils';

export default function SalaryGridPage() {
  const [grid] = useState(mockSalaryGrid);

  const categories = [...new Set(grid.map((e) => e.category))].sort((a, b) => a - b);

  return (
    <div className="p-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-stone-900">Grille salariale</h1>
        <p className="mt-1 text-sm text-stone-500">
          Convention Commerce 2025
        </p>
      </div>

      <div className="overflow-hidden rounded-2xl bg-white">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-stone-100">
              <th className="px-4 py-3 text-left font-medium text-stone-500">Convention</th>
              <th className="px-4 py-3 text-center font-medium text-stone-500">Catégorie</th>
              <th className="px-4 py-3 text-center font-medium text-stone-500">Échelon</th>
              <th className="px-4 py-3 text-right font-medium text-stone-500">Salaire de base</th>
              <th className="px-4 py-3 text-left font-medium text-stone-500">Date d&apos;effet</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((cat) => {
              const entries = grid.filter((e) => e.category === cat);
              return entries.map((entry, idx) => (
                <tr key={entry.id} className="hover:bg-stone-50">
                  {idx === 0 && (
                    <td rowSpan={entries.length} className="px-4 py-3 text-stone-500">
                      {entry.convention}
                    </td>
                  )}
                  {idx === 0 && (
                    <td rowSpan={entries.length} className="px-4 py-3 text-center font-semibold">
                      {entry.category}
                    </td>
                  )}
                  <td className="px-4 py-3 text-center">{entry.echelon}</td>
                  <td className="px-4 py-3 text-right font-medium">{formatCurrency(entry.baseSalary)}</td>
                  <td className="px-4 py-3 text-stone-500">{entry.effectiveDate}</td>
                </tr>
              ));
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
