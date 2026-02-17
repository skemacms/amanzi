'use client';

import { useState } from 'react';
import { mockSalaryGrid } from '@/features/human-resources/mock/data';
import { formatCurrency } from '@/core/lib/utils';

export default function SalaryGridPage() {
  const [grid] = useState(mockSalaryGrid);

  const categories = [...new Set(grid.map((e) => e.category))].sort((a, b) => a - b);

  return (
    <div className="px-6 py-6">
      <div className="mb-5">
        <h1 className="text-xl font-bold text-foreground">Grille salariale</h1>
        <p className="mt-0.5 text-sm text-muted-foreground">
          Convention Commerce 2025
        </p>
      </div>

      <div className="overflow-hidden rounded-lg border bg-card">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b bg-muted/50">
              <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground">Convention</th>
              <th className="px-4 py-3 text-center text-xs font-medium text-muted-foreground">Categorie</th>
              <th className="px-4 py-3 text-center text-xs font-medium text-muted-foreground">Echelon</th>
              <th className="px-4 py-3 text-right text-xs font-medium text-muted-foreground">Salaire de base</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground">Date d{"'"}effet</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((cat) => {
              const entries = grid.filter((e) => e.category === cat);
              return entries.map((entry, idx) => (
                <tr key={entry.id} className="border-b last:border-b-0 hover:bg-muted/30">
                  {idx === 0 && (
                    <td rowSpan={entries.length} className="px-4 py-3 text-muted-foreground">
                      {entry.convention}
                    </td>
                  )}
                  {idx === 0 && (
                    <td rowSpan={entries.length} className="px-4 py-3 text-center font-semibold text-foreground">
                      {entry.category}
                    </td>
                  )}
                  <td className="px-4 py-3 text-center text-foreground">{entry.echelon}</td>
                  <td className="px-4 py-3 text-right font-mono font-medium text-foreground">{formatCurrency(entry.baseSalary)}</td>
                  <td className="px-4 py-3 text-muted-foreground">{entry.effectiveDate}</td>
                </tr>
              ));
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
