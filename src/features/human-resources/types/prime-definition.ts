/** Miroir de PrimeDefinitionModel côté backend. */
export interface PrimeDefinition {
  id: string;
  name: string;
  isTaxable: boolean;
  isActive: boolean;
  sortOrder: number;
}

/** DTO pour créer une définition de prime. */
export interface CreatePrimeDefinitionInput {
  name: string;
  isTaxable: boolean;
  sortOrder?: number;
}

/** DTO pour mettre à jour une définition de prime. */
export type UpdatePrimeDefinitionInput = Partial<CreatePrimeDefinitionInput>;
