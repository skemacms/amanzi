/** Miroir de SalaryGridModel côté backend. */
export interface SalaryGridEntry {
  id: string;
  convention: string;
  category: number;
  echelon: number;
  baseSalary: number;
  effectiveDate: string;
  createdAt: string;
}
