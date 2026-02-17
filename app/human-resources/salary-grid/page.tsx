'use client';

import { useState } from 'react';
import { Check, X, Calendar, FileText, Plus } from 'lucide-react';
import { formatCurrency } from '@/core/lib/utils';

interface Convention {
  id: string;
  code: string;
  version: string;
  label: string;
  isActive: boolean;
  effectiveDate: string;
  categories: ConventionCategory[];
}

interface ConventionCategory {
  category: number;
  echelons: { echelon: number; baseSalary: number }[];
}

const mockConventions: Convention[] = [
  {
    id: 'conv-1',
    code: 'COMMERCE',
    version: '2025',
    label: 'Convention Collective du Commerce \u2014 Janvier 2025',
    isActive: true,
    effectiveDate: '2025-01-01',
    categories: [
      { category: 1, echelons: [{ echelon: 1, baseSalary: 100_000 }, { echelon: 2, baseSalary: 115_000 }] },
      { category: 2, echelons: [{ echelon: 1, baseSalary: 130_000 }] },
      { category: 3, echelons: [{ echelon: 1, baseSalary: 160_000 }] },
      { category: 4, echelons: [{ echelon: 1, baseSalary: 200_000 }] },
      { category: 5, echelons: [{ echelon: 1, baseSalary: 250_000 }] },
      { category: 6, echelons: [{ echelon: 1, baseSalary: 300_000 }, { echelon: 2, baseSalary: 350_000 }] },
      { category: 8, echelons: [{ echelon: 1, baseSalary: 400_000 }, { echelon: 3, baseSalary: 450_000 }] },
      { category: 10, echelons: [{ echelon: 1, baseSalary: 550_000 }] },
    ],
  },
  {
    id: 'conv-2',
    code: 'COMMERCE',
    version: '2023',
    label: 'Convention Collective du Commerce \u2014 Mars 2023',
    isActive: false,
    effectiveDate: '2023-03-01',
    categories: [
      { category: 1, echelons: [{ echelon: 1, baseSalary: 90_000 }, { echelon: 2, baseSalary: 105_000 }] },
      { category: 2, echelons: [{ echelon: 1, baseSalary: 120_000 }] },
      { category: 3, echelons: [{ echelon: 1, baseSalary: 145_000 }] },
      { category: 6, echelons: [{ echelon: 1, baseSalary: 280_000 }] },
    ],
  },
];

export default function SalaryGridPage() {
  const [selectedConv, setSelectedConv] = useState(mockConventions[0]);

  return (
    <div className="px-6 py-6">
      <div className="mb-5 flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-foreground">Grille salariale</h1>
          <p className="mt-0.5 text-sm text-muted-foreground">
            Conventions collectives et echelons
          </p>
        </div>
        <button className="inline-flex items-center gap-2 rounded-xs bg-accent px-4 py-2 text-sm font-medium text-white hover:bg-accent/90">
          <Plus className="h-4 w-4" />
          Nouvelle convention
        </button>
      </div>

      {/* Convention selector */}
      <div className="mb-6 flex flex-col gap-3">
        {mockConventions.map((conv) => (
          <button
            key={conv.id}
            onClick={() => setSelectedConv(conv)}
            className={`flex items-center gap-4 rounded-xs border p-4 text-left transition-all ${
              selectedConv.id === conv.id
                ? 'border-accent bg-accent/5 ring-1 ring-accent/20'
                : 'bg-card hover:border-muted-foreground/30'
            }`}
          >
            <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xs ${
              conv.isActive ? 'bg-emerald-50 text-emerald-600' : 'bg-muted text-muted-foreground'
            }`}>
              <FileText className="h-5 w-5" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-semibold text-foreground">{conv.label}</h3>
                {conv.isActive ? (
                  <span className="inline-flex items-center gap-1 rounded-xs bg-emerald-50 px-2 py-0.5 text-[10px] font-semibold text-emerald-700">
                    <Check className="h-3 w-3" /> Active
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 rounded-xs bg-muted px-2 py-0.5 text-[10px] font-semibold text-muted-foreground">
                    <X className="h-3 w-3" /> Inactive
                  </span>
                )}
              </div>
              <div className="mt-0.5 flex items-center gap-3 text-xs text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Calendar className="h-3 w-3" />
                  Effet: {new Date(conv.effectiveDate).toLocaleDateString('fr-FR', { day: '2-digit', month: 'long', year: 'numeric' })}
                </span>
                <span className="font-mono">{conv.code} v{conv.version}</span>
                <span>{conv.categories.length} categories</span>
              </div>
            </div>
          </button>
        ))}
      </div>

      {/* Selected convention detail */}
      <div className="rounded-xs border bg-card">
        <div className="border-b px-5 py-3">
          <h2 className="text-sm font-semibold text-foreground">{selectedConv.label}</h2>
          <p className="text-xs text-muted-foreground">
            {selectedConv.categories.reduce((acc, c) => acc + c.echelons.length, 0)} echelons au total
          </p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b bg-muted/50 text-left">
                <th className="px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Categorie</th>
                <th className="px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Echelon</th>
                <th className="px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground text-right">Salaire de base</th>
              </tr>
            </thead>
            <tbody>
              {selectedConv.categories.map((cat) =>
                cat.echelons.map((ech, i) => (
                  <tr key={`${cat.category}-${ech.echelon}`} className="border-b last:border-0 hover:bg-muted/30 transition-colors">
                    <td className="px-5 py-3">
                      {i === 0 ? (
                        <span className="inline-flex h-7 w-7 items-center justify-center rounded-xs bg-accent/10 font-mono text-xs font-bold text-accent">
                          {cat.category}
                        </span>
                      ) : null}
                    </td>
                    <td className="px-5 py-3 font-mono text-sm text-foreground">{ech.echelon}</td>
                    <td className="px-5 py-3 text-right font-mono text-sm font-semibold text-foreground">{formatCurrency(ech.baseSalary)}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
