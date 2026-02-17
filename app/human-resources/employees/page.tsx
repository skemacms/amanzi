'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Plus, Search, MapPin } from 'lucide-react';
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
    <div className="p-8">
      {/* En-tête */}
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-stone-900">Employés</h1>
          <p className="mt-1 text-sm text-stone-500">
            {mockEmployees.length} employé(s) actif(s)
          </p>
        </div>
        <Link
          href="/human-resources/employees/new"
          className="inline-flex items-center gap-2 rounded-xl bg-teal-600 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-teal-700"
        >
          <Plus className="h-4 w-4" />
          Nouvel employé
        </Link>
      </div>

      {/* Barre de recherche */}
      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-stone-400" />
        <input
          type="text"
          placeholder="Rechercher par nom, code ou fonction..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full rounded-xl bg-white py-2.5 pl-10 pr-4 text-sm outline-none transition-shadow focus:ring-2 focus:ring-teal-600/20"
        />
      </div>

      {/* Tableau */}
      <div className="overflow-hidden rounded-2xl bg-white">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-stone-100">
              <th className="px-4 py-3 text-left font-medium text-stone-500">Code</th>
              <th className="px-4 py-3 text-left font-medium text-stone-500">Nom complet</th>
              <th className="px-4 py-3 text-left font-medium text-stone-500">Fonction</th>
              <th className="px-4 py-3 text-left font-medium text-stone-500">Situation</th>
              <th className="px-4 py-3 text-left font-medium text-stone-500">Zone</th>
              <th className="px-4 py-3 text-right font-medium text-stone-500">Salaire de base</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((emp) => (
              <tr key={emp.id} className="transition-colors hover:bg-stone-50">
                <td className="px-4 py-3">
                  <Link href={`/human-resources/employees/${emp.id}`} className="font-mono text-xs text-teal-600 hover:underline">
                    {emp.employeeCode}
                  </Link>
                </td>
                <td className="px-4 py-3">
                  <Link href={`/human-resources/employees/${emp.id}`} className="font-medium text-stone-900 hover:underline">
                    {emp.lastName} {emp.firstName}
                  </Link>
                </td>
                <td className="px-4 py-3 text-stone-500">
                  {emp.functionTitle ?? '—'}
                </td>
                <td className="px-4 py-3 text-stone-500">
                  {MARITAL_STATUS_LABELS[emp.maritalStatus]}
                </td>
                <td className="px-4 py-3">
                  <span className="inline-flex items-center gap-1 text-stone-500">
                    <MapPin className="h-3 w-3" />
                    {ZONE_LABELS[emp.zone]}
                  </span>
                </td>
                <td className="px-4 py-3 text-right font-medium text-stone-900">
                  {formatCurrency(emp.baseSalary)}
                </td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr>
                <td colSpan={6} className="px-4 py-8 text-center text-stone-400">
                  Aucun employé trouvé.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
