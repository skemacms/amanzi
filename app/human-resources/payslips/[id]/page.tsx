'use client';

import { use } from 'react';
import Link from 'next/link';
import { ArrowLeft, Download } from 'lucide-react';
import { mockPayslips, mockEmployees, mockPayrollPeriods } from '@/features/human-resources/mock/data';
import { formatCurrency } from '@/core/lib/utils';
import { PAYSLIP_SECTION_LABELS } from '@/core/types/enums';

const MONTH_NAMES = [
  '', 'Janvier', 'Fevrier', 'Mars', 'Avril', 'Mai', 'Juin',
  'Juillet', 'Aout', 'Septembre', 'Octobre', 'Novembre', 'Decembre',
];

export default function PayslipDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const payslip = mockPayslips.find((p) => p.id === id);

  if (!payslip) {
    return (
      <div className="flex h-full items-center justify-center p-8">
        <p className="text-muted-foreground">Bulletin introuvable.</p>
      </div>
    );
  }

  const employee = mockEmployees.find((e) => e.id === payslip.employeeId);
  const period = mockPayrollPeriods.find((p) => p.id === payslip.payrollPeriodId);

  return (
    <div className="px-6 py-6">
      <Link href="/human-resources/payslips" className="mb-4 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
        <ArrowLeft className="h-4 w-4" />
        Retour aux bulletins
      </Link>

      <div className="mb-6 flex items-start justify-between">
        <div>
          <h1 className="text-xl font-bold text-foreground">
            Bulletin de paie \u2014 {employee ? `${employee.lastName} ${employee.firstName}` : payslip.employeeId}
          </h1>
          <p className="mt-0.5 text-sm text-muted-foreground">
            {period ? `${MONTH_NAMES[period.month]} ${period.year}` : payslip.payrollPeriodId}
          </p>
        </div>
        <button className="inline-flex items-center gap-2 rounded-xs border bg-card px-3 py-2 text-sm font-medium text-foreground transition-colors hover:bg-muted">
          <Download className="h-4 w-4" />
          Telecharger PDF
        </button>
      </div>

      {/* Summary cards */}
      <div className="mb-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
        <div className="rounded-xs border bg-card p-4">
          <p className="text-xs text-muted-foreground">Brut imposable</p>
          <p className="mt-1 text-lg font-bold text-foreground">{formatCurrency(payslip.grossTaxable)}</p>
        </div>
        <div className="rounded-xs border bg-card p-4">
          <p className="text-xs text-muted-foreground">Retenues salarie</p>
          <p className="mt-1 text-lg font-bold text-red-600">{formatCurrency(payslip.totalEmployeeDeductions)}</p>
        </div>
        <div className="rounded-xs border bg-card p-4">
          <p className="text-xs text-muted-foreground">Charges patronales</p>
          <p className="mt-1 text-lg font-bold text-amber-600">{formatCurrency(payslip.totalEmployerCharges)}</p>
        </div>
        <div className="rounded-xs border bg-card p-4">
          <p className="text-xs text-muted-foreground">Net a payer</p>
          <p className="mt-1 text-lg font-bold text-emerald-700">{formatCurrency(payslip.netPay)}</p>
        </div>
      </div>

      {/* Line details */}
      <div className="overflow-hidden rounded-xs border bg-card">
        <div className="border-b px-5 py-3">
          <h2 className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">
            Detail des lignes
          </h2>
        </div>
        {payslip.lines && payslip.lines.length > 0 ? (
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b bg-muted/50">
                <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground">Section</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground">Libelle</th>
                <th className="px-4 py-3 text-right text-xs font-medium text-muted-foreground">Base</th>
                <th className="px-4 py-3 text-right text-xs font-medium text-muted-foreground">Taux</th>
                <th className="px-4 py-3 text-right text-xs font-medium text-muted-foreground">Gain</th>
                <th className="px-4 py-3 text-right text-xs font-medium text-muted-foreground">Retenue</th>
              </tr>
            </thead>
            <tbody>
              {payslip.lines.map((line) => (
                <tr key={line.id} className="border-b last:border-b-0 hover:bg-muted/30">
                  <td className="px-4 py-3">
                    <span className="rounded-xs bg-muted px-2 py-0.5 text-[10px] font-medium text-muted-foreground">
                      {PAYSLIP_SECTION_LABELS[line.section]}
                    </span>
                  </td>
                  <td className="px-4 py-3 font-medium text-foreground">{line.label}</td>
                  <td className="px-4 py-3 text-right font-mono text-foreground">{line.baseAmount ? formatCurrency(line.baseAmount) : '\u2014'}</td>
                  <td className="px-4 py-3 text-right font-mono text-foreground">{line.rate ? `${(line.rate * 100).toFixed(2)} %` : '\u2014'}</td>
                  <td className="px-4 py-3 text-right font-mono text-emerald-700">{line.gainAmount ? formatCurrency(line.gainAmount) : '\u2014'}</td>
                  <td className="px-4 py-3 text-right font-mono text-red-600">{line.deductionAmount ? formatCurrency(line.deductionAmount) : '\u2014'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="px-6 py-8 text-center text-muted-foreground">
            Aucun detail de lignes disponible pour ce bulletin.
          </p>
        )}
      </div>
    </div>
  );
}
