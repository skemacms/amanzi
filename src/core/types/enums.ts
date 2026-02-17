/** Enums miroir du backend — doivent rester synchronisés avec api/src/core/graphql/enums.ts */

export enum Zone {
  DOWNTOWN = 'DOWNTOWN',
  SUBURBAN = 'SUBURBAN',
}

export enum CompanySize {
  SMALL = 'SMALL',
  MEDIUM = 'MEDIUM',
  LARGE = 'LARGE',
}

export enum WorkTrackingMode {
  DAYS = 'DAYS',
  HOURS = 'HOURS',
}

export enum MaritalStatus {
  SINGLE = 'SINGLE',
  MARRIED = 'MARRIED',
  DIVORCED = 'DIVORCED',
  WIDOWED = 'WIDOWED',
}

export enum BenefitInKindType {
  HOUSING = 'HOUSING',
  DOMESTIC_STAFF = 'DOMESTIC_STAFF',
  SECURITY = 'SECURITY',
  WATER = 'WATER',
  ELECTRICITY = 'ELECTRICITY',
  GAS = 'GAS',
  PHONE = 'PHONE',
  CAR = 'CAR',
  FOOD = 'FOOD',
}

export enum PayrollPeriodStatus {
  DRAFT = 'DRAFT',
  CALCULATED = 'CALCULATED',
  VALIDATED = 'VALIDATED',
  CLOSED = 'CLOSED',
}

export enum NotificationType {
  FISCAL_REMINDER = 'FISCAL_REMINDER',
  SALARY_REMINDER = 'SALARY_REMINDER',
  PAYROLL_PROGRESS = 'PAYROLL_PROGRESS',
  PDF_READY = 'PDF_READY',
  SYSTEM_ALERT = 'SYSTEM_ALERT',
}

export enum PayslipLineSection {
  EARNINGS = 'EARNINGS',
  SOCIAL = 'SOCIAL',
  FISCAL = 'FISCAL',
  TUS = 'TUS',
  ALLOWANCES = 'ALLOWANCES',
  DEDUCTIONS = 'DEDUCTIONS',
}

export enum UserRole {
  ADMIN = 'ADMIN',
  MANAGER = 'MANAGER',
  USER = 'USER',
}

/** Labels d'affichage pour les enums. */
export const ZONE_LABELS: Record<Zone, string> = {
  [Zone.DOWNTOWN]: 'Centre-ville',
  [Zone.SUBURBAN]: 'Périphérie',
};

export const MARITAL_STATUS_LABELS: Record<MaritalStatus, string> = {
  [MaritalStatus.SINGLE]: 'Célibataire',
  [MaritalStatus.MARRIED]: 'Marié(e)',
  [MaritalStatus.DIVORCED]: 'Divorcé(e)',
  [MaritalStatus.WIDOWED]: 'Veuf/Veuve',
};

export const PAYROLL_STATUS_LABELS: Record<PayrollPeriodStatus, string> = {
  [PayrollPeriodStatus.DRAFT]: 'Brouillon',
  [PayrollPeriodStatus.CALCULATED]: 'Calculée',
  [PayrollPeriodStatus.VALIDATED]: 'Validée',
  [PayrollPeriodStatus.CLOSED]: 'Clôturée',
};

export const NOTIFICATION_TYPE_LABELS: Record<NotificationType, string> = {
  [NotificationType.FISCAL_REMINDER]: 'Rappel fiscal',
  [NotificationType.SALARY_REMINDER]: 'Rappel salaire',
  [NotificationType.PAYROLL_PROGRESS]: 'Progression paie',
  [NotificationType.PDF_READY]: 'PDF prêt',
  [NotificationType.SYSTEM_ALERT]: 'Alerte système',
};

export const COMPANY_SIZE_LABELS: Record<CompanySize, string> = {
  [CompanySize.SMALL]: 'Petite',
  [CompanySize.MEDIUM]: 'Moyenne',
  [CompanySize.LARGE]: 'Grande',
};

export const PAYSLIP_SECTION_LABELS: Record<PayslipLineSection, string> = {
  [PayslipLineSection.EARNINGS]: 'Gains',
  [PayslipLineSection.SOCIAL]: 'Cotisations sociales',
  [PayslipLineSection.FISCAL]: 'Impôts',
  [PayslipLineSection.TUS]: 'TUS',
  [PayslipLineSection.ALLOWANCES]: 'Indemnités',
  [PayslipLineSection.DEDUCTIONS]: 'Retenues',
};
