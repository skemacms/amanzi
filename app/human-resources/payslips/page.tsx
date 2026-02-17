'use client';

import Link from 'next/link';
import { mockPayslips, mockEmployees } from '@/features/human-resources/mock/data';
import { formatCurrency } from '@/core/lib/utils';

export default function BulletinsPage() {
  const payslips = mockPayslips.map((ps) => ({
    ...ps,
    employee: mockEmployees.find((e) => e.id === ps.employeeId),
  }));

  return (
    <div className="p-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-stone-900">Bulletins de paie</h1>
        <p className="mt-1 text-sm text-stone-500">
          Consulter les bulletins émis par période
        </p>
      </div>

      <div className="overflow-hidden rounded-2xl bg-white">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-stone-100">
              <th className="px-4 py-3 text-left font-medium text-stone-500">Employé</th>
              <th className="px-4 py-3 text-right font-medium text-stone-500">Salaire de base</th>
              <th className="px-4 py-3 text-right font-medium text-stone-500">Brut imposable</th>
              <th className="px-4 py-3 text-right font-medium text-stone-500">Retenues salarié</th>
              <th className="px-4 py-3 text-right font-medium text-stone-500">Charges patronales</th>
              <th className="px-4 py-3 text-right font-medium text-stone-500">Net à payer</th>
            </tr>
          </thead>
          <tbody>
            {payslips.map((ps) => (
              <tr key={ps.id} className="hover:bg-stone-50">
                <td className="px-4 py-3">
                  <Link href={`/human-resources/payslips/${ps.id}`} className="font-medium text-teal-600 hover:underline">
                    {ps.employee ? `${ps.employee.lastName} ${ps.employee.firstName}` : ps.employeeId}
                  </Link>
                </td>
                <td className="px-4 py-3 text-right">{formatCurrency(ps.baseSalary)}</td>
                <td className="px-4 py-3 text-right">{formatCurrency(ps.grossTaxable)}</td>
                <td className="px-4 py-3 text-right text-red-600">{formatCurrency(ps.totalEmployeeDeductions)}</td>
                <td className="px-4 py-3 text-right text-amber-600">{formatCurrency(ps.totalEmployerCharges)}</td>
                <td className="px-4 py-3 text-right font-bold text-green-700">{formatCurrency(ps.netPay)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
