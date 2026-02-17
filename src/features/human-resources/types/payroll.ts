import type { PayrollPeriodStatus } from '@/core/types/enums';

/** Miroir de PayrollPeriodModel côté backend. */
export interface PayrollPeriod {
  id: string;
  companyId: string;
  month: number;
  year: number;
  startDate: string;
  endDate: string;
  paymentDate?: string;
  status: PayrollPeriodStatus;
  createdAt: string;
  closedAt?: string;
}

/** Infos employé embarquées dans une présence. */
export interface AttendanceEmployeeInfo {
  firstName: string;
  lastName: string;
  employeeCode: string;
}

/** Miroir de AttendanceModel côté backend. */
export interface Attendance {
  id: string;
  employeeId: string;
  payrollPeriodId: string;
  workedValue: number;
  normValue: number;
  absenceDays: number;
  absenceReason?: string;
  employee?: AttendanceEmployeeInfo;
}

/** Résultat unitaire du calcul de paie pour un employé. */
export interface PayrollResultItem {
  employeeId: string;
  grossTaxable: number;
  netPay: number;
  totalEmployeeDeductions: number;
  totalEmployerCharges: number;
}

/** Résultat global du calcul de paie. */
export interface PayrollResult {
  periodId: string;
  employeesProcessed: number;
  results: PayrollResultItem[];
}

/** DTO pour créer une période de paie. */
export interface CreatePayrollPeriodInput {
  month: number;
  year: number;
  startDate: string;
  endDate: string;
}

/** DTO pour enregistrer une présence. */
export interface SetAttendanceInput {
  employeeId: string;
  workedValue: number;
  normValue: number;
  absenceDays?: number;
  absenceReason?: string;
}
