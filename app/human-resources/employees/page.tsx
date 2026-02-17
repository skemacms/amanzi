'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Plus, Search, MapPin, Download } from 'lucide-react';
import { mockEmployees } from '@/features/human-resources/mock/data';
import { formatCurrency } from '@/core/lib/utils';
import { ZONE_LABELS, MARITAL_STATUS_LABELS } from '@/core/types/enums';

export default function EmployeesPage() {
  const [search, setSearch] = useState('');

  const filtered = mockEmployees.filter((e) => {
    const term = search.toLowerCase();
    return (
      e.firstName.toLowerCase().includes(term) ||
      e.lastName.toLowerCase().includes(term) ||
      e.employeeCode.toLowerCase().includes(term) ||
      (e.functionTitle ?? '').toLowerCase().includes(term)
    );
  });

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
          <button className="inline-flex items-center gap-2 rounded-md border bg-card px-3 py-2 text-sm font-medium text-foreground transition-colors hover:bg-muted">
            <Download className="h-4 w-4" />
            Exporter
          </button>
          <Link
            href="/human-resources/employees/new"
            className="inline-flex items-center gap-2 rounded-md bg-accent px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-accent/90"
          >
            <Plus className="h-4 w-4" />
            Nouvel employe
          </Link>
        </div>
      </div>

      {/* Search */}
      <div className="relative mb-4">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <input
          type="text"
          placeholder="Rechercher par nom, code ou fonction..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full rounded-md border bg-card py-2 pl-10 pr-4 text-sm outline-none transition-colors focus:border-accent focus:ring-1 focus:ring-accent/30"
        />
      </div>

      {/* Table */}
      <div className="overflow-hidden rounded-lg border bg-card">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b bg-muted/50">
              <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground">Code</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground">Nom complet</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground">Fonction</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground">Situation</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground">Zone</th>
              <th className="px-4 py-3 text-right text-xs font-medium text-muted-foreground">Salaire de base</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((emp) => (
              <tr key={emp.id} className="border-b last:border-b-0 transition-colors hover:bg-muted/30">
                <td className="px-4 py-3">
                  <Link href={`/human-resources/employees/${emp.id}`} className="font-mono text-xs text-accent hover:underline">
                    {emp.employeeCode}
                  </Link>
                </td>
                <td className="px-4 py-3">
                  <Link href={`/human-resources/employees/${emp.id}`} className="font-medium text-foreground hover:underline">
                    {emp.lastName} {emp.firstName}
                  </Link>
                </td>
                <td className="px-4 py-3 text-muted-foreground">
                  {emp.functionTitle ?? '\u2014'}
                </td>
                <td className="px-4 py-3 text-muted-foreground">
                  {MARITAL_STATUS_LABELS[emp.maritalStatus]}
                </td>
                <td className="px-4 py-3">
                  <span className="inline-flex items-center gap-1 text-muted-foreground">
                    <MapPin className="h-3 w-3" />
                    {ZONE_LABELS[emp.zone]}
                  </span>
                </td>
                <td className="px-4 py-3 text-right font-medium font-mono text-foreground">
                  {formatCurrency(emp.baseSalary)}
                </td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr>
                <td colSpan={6} className="px-4 py-8 text-center text-muted-foreground">
                  Aucun employe trouve.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
