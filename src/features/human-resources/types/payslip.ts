import type { PayslipLineSection } from '@/core/types/enums';
import type { Employee } from './employee';
import type { PayrollPeriod } from './payroll';

/** Miroir de PayslipLineModel côté backend. */
export interface PayslipLine {
  id: string;
  section: PayslipLineSection;
  label: string;
  baseAmount?: number;
  rate?: number;
  gainAmount?: number;
  deductionAmount?: number;
  employerAmount?: number;
  sortOrder: number;
}

/** Miroir de PayslipModel côté backend. */
export interface Payslip {
  id: string;
  employeeId: string;
  payrollPeriodId: string;
  baseSalary: number;
  sursalaire: number;
  seniorityBonus: number;
  totalTaxablePrimes: number;
  totalNontaxablePrimes: number;
  benefitsInKindTotal: number;
  grossTaxable: number;
  grossTotal: number;
  workedValue?: number;
  normValue?: number;
  prorataRate?: number;
  cnssEmployee: number;
  cnssEmployerPension: number;
  cnssEmployerPf: number;
  cnssEmployerRp: number;
  itsAmount: number;
  itsTaxableBase: number;
  tolAmount: number;
  tusDgid: number;
  tusCnss: number;
  totalEmployeeDeductions: number;
  totalEmployerCharges: number;
  netPay: number;
  pdfUrl?: string;
  createdAt: string;
  employee?: Employee;
  payrollPeriod?: PayrollPeriod;
  lines?: PayslipLine[];
}
