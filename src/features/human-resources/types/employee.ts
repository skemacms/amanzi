import type { MaritalStatus, Zone } from '@/core/types/enums';

/** Miroir de BenefitInKindModel côté backend. */
export interface BenefitInKind {
  id: string;
  type: string;
  rate: number;
  baseAmount: number;
  calculatedAmount: number;
}

/** Miroir de PrimeDefinitionModel côté backend. */
export interface PrimeDefinition {
  id: string;
  name: string;
  isTaxable: boolean;
  isActive: boolean;
  sortOrder: number;
}

/** Miroir de EmployeePrimeModel côté backend. */
export interface EmployeePrime {
  id: string;
  employeeId: string;
  primeDefinitionId: string;
  amount: number;
  primeDefinition?: PrimeDefinition;
}

/** Miroir de EmployeeModel côté backend. */
export interface Employee {
  id: string;
  companyId: string;
  employeeCode: string;
  firstName: string;
  lastName: string;
  birthDate?: string;
  birthPlace?: string;
  maritalStatus: MaritalStatus;
  childrenCount: number;
  phone?: string;
  hireDate: string;
  terminationDate?: string;
  functionTitle?: string;
  category?: string;
  echelon?: string;
  conventionCollective?: string;
  secuNumber?: string;
  cnssNumber?: string;
  baseSalary: number;
  sursalaire: number;
  bankName?: string;
  bankCode?: string;
  branchCode?: string;
  accountNumber?: string;
  ribKey?: string;
  zone: Zone;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  employeePrimes?: EmployeePrime[];
  benefitsInKind?: BenefitInKind[];
}

/** DTO pour la création d'un employé. */
export interface CreateEmployeeInput {
  employeeCode: string;
  firstName: string;
  lastName: string;
  birthDate?: string;
  birthPlace?: string;
  maritalStatus?: MaritalStatus;
  childrenCount?: number;
  phone?: string;
  hireDate: string;
  terminationDate?: string;
  functionTitle?: string;
  category?: string;
  echelon?: string;
  conventionCollective?: string;
  secuNumber?: string;
  cnssNumber?: string;
  baseSalary: number;
  sursalaire?: number;
  bankName?: string;
  bankCode?: string;
  branchCode?: string;
  accountNumber?: string;
  ribKey?: string;
  zone?: Zone;
}

/** DTO pour la mise à jour d'un employé (tous les champs optionnels). */
export type UpdateEmployeeInput = Partial<CreateEmployeeInput>;

/** DTO pour définir une prime employé. */
export interface SetEmployeePrimeInput {
  primeDefinitionId: string;
  amount: number;
}
