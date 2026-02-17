import type {
  PayrollPeriod,
  Attendance,
  PayrollResult,
  CreatePayrollPeriodInput,
  SetAttendanceInput,
} from '../types/payroll';
import { mockPayrollPeriods, mockAttendances } from '../mock/data';

/** Liste toutes les périodes de paie. */
export async function getPayrollPeriods(): Promise<PayrollPeriod[]> {
  // TODO: connecter au backend GraphQL — query { payrollPeriods }
  return mockPayrollPeriods;
}

/** Crée une nouvelle période de paie. */
export async function createPayrollPeriod(_input: CreatePayrollPeriodInput): Promise<PayrollPeriod> {
  // TODO: connecter au backend GraphQL — mutation createPayrollPeriod
  return mockPayrollPeriods[2];
}

/** Enregistre ou met à jour une présence. */
export async function setAttendance(
  _periodId: string,
  _input: SetAttendanceInput,
): Promise<Attendance> {
  // TODO: connecter au backend GraphQL — mutation setAttendance
  return mockAttendances[0];
}

/** Récupère les présences d'une période. */
export async function getAttendances(_periodId: string): Promise<Attendance[]> {
  // TODO: connecter au backend GraphQL — query { attendances(periodId) }
  return mockAttendances;
}

/** Lance le calcul de paie pour une période. */
export async function calculatePayroll(_periodId: string): Promise<PayrollResult> {
  // TODO: connecter au backend GraphQL — mutation calculatePayroll
  return {
    periodId: _periodId,
    employeesProcessed: 4,
    results: [
      { employeeId: 'e1', grossTaxable: 545_000, netPay: 529_450, totalEmployeeDeductions: 45_550, totalEmployerCharges: 151_402 },
      { employeeId: 'e2', grossTaxable: 360_500, netPay: 362_880, totalEmployeeDeductions: 22_620, totalEmployerCharges: 100_153 },
    ],
  };
}

/** Valide une période de paie calculée. */
export async function validatePayroll(_periodId: string): Promise<PayrollPeriod> {
  // TODO: connecter au backend GraphQL — mutation validatePayroll
  return { ...mockPayrollPeriods[1], status: 'VALIDATED' as PayrollPeriod['status'] };
}
