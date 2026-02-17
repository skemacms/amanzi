import type { Payslip } from '../types/payslip';
import { mockPayslips } from '../mock/data';

/** Liste les bulletins de paie d'une période. */
export async function getPayslipsByPeriod(_periodId: string): Promise<Payslip[]> {
  // TODO: connecter au backend GraphQL — query { payslipsByPeriod(periodId) }
  return mockPayslips;
}

/** Liste les bulletins de paie d'un employé. */
export async function getPayslipsByEmployee(_employeeId: string): Promise<Payslip[]> {
  // TODO: connecter au backend GraphQL — query { payslipsByEmployee(employeeId) }
  return mockPayslips.filter((p) => p.employeeId === _employeeId);
}

/** Récupère un bulletin de paie détaillé par son identifiant. */
export async function getPayslip(id: string): Promise<Payslip> {
  // TODO: connecter au backend GraphQL — query { payslip(id) }
  const found = mockPayslips.find((p) => p.id === id);
  if (!found) throw new Error(`Bulletin ${id} introuvable`);
  return found;
}
