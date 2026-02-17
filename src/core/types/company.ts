import type { CompanySize, WorkTrackingMode } from './enums';

/** Miroir de CompanyModel — core/services/company côté backend. */
export interface Company {
  id: string;
  name: string;
  niu?: string;
  cnssNumber?: string;
  address?: string;
  city?: string;
  phone?: string;
  size: CompanySize;
  conventionCollective: string;
  conventionVersion: string;
  logoUrl?: string;
  itsEnabled: boolean;
  tolEnabled: boolean;
  tusEnabled: boolean;
  cnssPensionEnabled: boolean;
  cnssPfEnabled: boolean;
  cnssRpEnabled: boolean;
  tolAmountDowntown: number;
  tolAmountSuburban: number;
  tusRateDgid: number;
  tusRateCnss: number;
  cnssPensionEmployeeRate: number;
  cnssPensionEmployerRate: number;
  cnssPfRate: number;
  cnssRpRate: number;
  cnssPensionCeiling: number;
  cnssPfRpCeiling: number;
  seniorityRatePerYear: number;
  seniorityMinYears: number;
  seniorityCapRate: number;
  seniorityCapYears: number;
  senioritySeniorRate: number;
  senioritySeniorYears: number;
  itsAbatementRate: number;
  itsMinimumAnnual: number;
  salaryPaymentDay: number;
  workTrackingMode: WorkTrackingMode;
  monthlyWorkNorm: number;
  fiscalRemindersEnabled: boolean;
  salaryRemindersEnabled: boolean;
  createdAt: string;
  updatedAt: string;
}

/** DTO pour la mise à jour de l'entreprise. */
export interface UpdateCompanyInput {
  name?: string;
  niu?: string;
  cnssNumber?: string;
  address?: string;
  city?: string;
  phone?: string;
  size?: CompanySize;
  conventionCollective?: string;
  conventionVersion?: string;
  itsEnabled?: boolean;
  tolEnabled?: boolean;
  tusEnabled?: boolean;
  cnssPensionEnabled?: boolean;
  cnssPfEnabled?: boolean;
  cnssRpEnabled?: boolean;
  tolAmountDowntown?: number;
  tolAmountSuburban?: number;
  tusRateDgid?: number;
  tusRateCnss?: number;
  cnssPensionEmployeeRate?: number;
  cnssPensionEmployerRate?: number;
  cnssPfRate?: number;
  cnssRpRate?: number;
  cnssPensionCeiling?: number;
  cnssPfRpCeiling?: number;
  seniorityRatePerYear?: number;
  seniorityMinYears?: number;
  seniorityCapRate?: number;
  seniorityCapYears?: number;
  senioritySeniorRate?: number;
  senioritySeniorYears?: number;
  itsAbatementRate?: number;
  itsMinimumAnnual?: number;
  salaryPaymentDay?: number;
  workTrackingMode?: WorkTrackingMode;
  monthlyWorkNorm?: number;
  fiscalRemindersEnabled?: boolean;
  salaryRemindersEnabled?: boolean;
}
