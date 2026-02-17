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
    <div className="px-6 py-6">
      <div className="mb-5">
        <h1 className="text-xl font-bold text-foreground">Bulletins de paie</h1>
        <p className="mt-0.5 text-sm text-muted-foreground">
          Consulter les bulletins emis par periode
        </p>
      </div>

      <div className="overflow-hidden rounded-lg border bg-card">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b bg-muted/50">
              <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground">Employe</th>
              <th className="px-4 py-3 text-right text-xs font-medium text-muted-foreground">Salaire de base</th>
              <th className="px-4 py-3 text-right text-xs font-medium text-muted-foreground">Brut imposable</th>
              <th className="px-4 py-3 text-right text-xs font-medium text-muted-foreground">Retenues salarie</th>
              <th className="px-4 py-3 text-right text-xs font-medium text-muted-foreground">Charges patronales</th>
              <th className="px-4 py-3 text-right text-xs font-medium text-muted-foreground">Net a payer</th>
            </tr>
          </thead>
          <tbody>
            {payslips.map((ps) => (
              <tr key={ps.id} className="border-b last:border-b-0 hover:bg-muted/30">
                <td className="px-4 py-3">
                  <Link href={`/human-resources/payslips/${ps.id}`} className="font-medium text-accent hover:underline">
                    {ps.employee ? `${ps.employee.lastName} ${ps.employee.firstName}` : ps.employeeId}
                  </Link>
                </td>
                <td className="px-4 py-3 text-right font-mono text-foreground">{formatCurrency(ps.baseSalary)}</td>
                <td className="px-4 py-3 text-right font-mono text-foreground">{formatCurrency(ps.grossTaxable)}</td>
                <td className="px-4 py-3 text-right font-mono text-red-600">{formatCurrency(ps.totalEmployeeDeductions)}</td>
                <td className="px-4 py-3 text-right font-mono text-amber-600">{formatCurrency(ps.totalEmployerCharges)}</td>
                <td className="px-4 py-3 text-right font-mono font-bold text-emerald-700">{formatCurrency(ps.netPay)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
