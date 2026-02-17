'use client';

import { use } from 'react';
import Link from 'next/link';
import { ArrowLeft, Download } from 'lucide-react';
import { mockPayslips, mockEmployees, mockPayrollPeriods } from '@/features/human-resources/mock/data';
import { formatCurrency } from '@/core/lib/utils';
import { PAYSLIP_SECTION_LABELS } from '@/core/types/enums';

const MONTH_NAMES = [
  '', 'Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin',
  'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre',
];

export default function PayslipDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const payslip = mockPayslips.find((p) => p.id === id);

  if (!payslip) {
    return (
      <div className="flex h-full items-center justify-center p-8">
        <p className="text-stone-400">Bulletin introuvable.</p>
      </div>
    );
  }

  const employee = mockEmployees.find((e) => e.id === payslip.employeeId);
  const period = mockPayrollPeriods.find((p) => p.id === payslip.payrollPeriodId);

  return (
    <div className="p-8">
      <Link href="/human-resources/payslips" className="mb-6 inline-flex items-center gap-2 text-sm text-stone-400 hover:text-stone-700">
        <ArrowLeft className="h-4 w-4" />
        Retour aux bulletins
      </Link>

      <div className="mb-8 flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-stone-900">
            Bulletin de paie — {employee ? `${employee.lastName} ${employee.firstName}` : payslip.employeeId}
          </h1>
          <p className="mt-1 text-sm text-stone-500">
            {period ? `${MONTH_NAMES[period.month]} ${period.year}` : payslip.payrollPeriodId}
          </p>
        </div>
        <button className="inline-flex items-center gap-2 rounded-xl bg-white px-4 py-2 text-sm font-medium text-stone-700 hover:bg-stone-100">
          <Download className="h-4 w-4" />
          Télécharger PDF
        </button>
      </div>

      {/* Récapitulatif */}
      <div className="mb-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
        <div className="rounded-2xl bg-white p-4">
          <p className="text-xs text-stone-500">Brut imposable</p>
          <p className="mt-1 text-lg font-bold">{formatCurrency(payslip.grossTaxable)}</p>
        </div>
        <div className="rounded-2xl bg-white p-4">
          <p className="text-xs text-stone-500">Retenues salarié</p>
          <p className="mt-1 text-lg font-bold text-red-600">{formatCurrency(payslip.totalEmployeeDeductions)}</p>
        </div>
        <div className="rounded-2xl bg-white p-4">
          <p className="text-xs text-stone-500">Charges patronales</p>
          <p className="mt-1 text-lg font-bold text-amber-600">{formatCurrency(payslip.totalEmployerCharges)}</p>
        </div>
        <div className="rounded-2xl bg-white p-4">
          <p className="text-xs text-stone-500">Net à payer</p>
          <p className="mt-1 text-lg font-bold text-green-700">{formatCurrency(payslip.netPay)}</p>
        </div>
      </div>

      {/* Détail par section */}
      <div className="rounded-2xl bg-white">
        <div className="px-6 py-4">
          <h2 className="text-[10px] font-semibold uppercase tracking-widest text-stone-400">
            Détail des lignes
          </h2>
        </div>
        {payslip.lines && payslip.lines.length > 0 ? (
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-stone-100">
                <th className="px-4 py-3 text-left font-medium text-stone-500">Section</th>
                <th className="px-4 py-3 text-left font-medium text-stone-500">Libellé</th>
                <th className="px-4 py-3 text-right font-medium text-stone-500">Base</th>
                <th className="px-4 py-3 text-right font-medium text-stone-500">Taux</th>
                <th className="px-4 py-3 text-right font-medium text-stone-500">Gain</th>
                <th className="px-4 py-3 text-right font-medium text-stone-500">Retenue</th>
              </tr>
            </thead>
            <tbody>
              {payslip.lines.map((line) => (
                <tr key={line.id} className="hover:bg-stone-50">
                  <td className="px-4 py-3">
                    <span className="rounded-md bg-stone-100 px-2 py-0.5 text-xs font-medium text-stone-600">
                      {PAYSLIP_SECTION_LABELS[line.section]}
                    </span>
                  </td>
                  <td className="px-4 py-3 font-medium">{line.label}</td>
                  <td className="px-4 py-3 text-right">{line.baseAmount ? formatCurrency(line.baseAmount) : '—'}</td>
                  <td className="px-4 py-3 text-right">{line.rate ? `${(line.rate * 100).toFixed(2)} %` : '—'}</td>
                  <td className="px-4 py-3 text-right text-green-700">{line.gainAmount ? formatCurrency(line.gainAmount) : '—'}</td>
                  <td className="px-4 py-3 text-right text-red-600">{line.deductionAmount ? formatCurrency(line.deductionAmount) : '—'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="px-6 py-8 text-center text-stone-400">
            Aucun détail de lignes disponible pour ce bulletin.
          </p>
        )}
      </div>
    </div>
  );
}
