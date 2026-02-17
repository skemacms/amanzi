import type {
  PrimeDefinition,
  CreatePrimeDefinitionInput,
  UpdatePrimeDefinitionInput,
} from '../types/prime-definition';
import { mockPrimeDefinitions } from '../mock/data';

/** Liste toutes les définitions de primes. */
export async function getPrimeDefinitions(): Promise<PrimeDefinition[]> {
  // TODO: connecter au backend GraphQL — query { primeDefinitions }
  return mockPrimeDefinitions;
}

/** Récupère une définition de prime par son identifiant. */
export async function getPrimeDefinition(id: string): Promise<PrimeDefinition> {
  // TODO: connecter au backend GraphQL — query { primeDefinition(id) }
  const found = mockPrimeDefinitions.find((p) => p.id === id);
  if (!found) throw new Error(`Définition de prime ${id} introuvable`);
  return found;
}

/** Crée une nouvelle définition de prime. */
export async function createPrimeDefinition(_input: CreatePrimeDefinitionInput): Promise<PrimeDefinition> {
  // TODO: connecter au backend GraphQL — mutation createPrimeDefinition
  return { id: 'pd-new', name: _input.name, isTaxable: _input.isTaxable, isActive: true, sortOrder: _input.sortOrder ?? 0 };
}

/** Met à jour une définition de prime. */
export async function updatePrimeDefinition(_id: string, _input: UpdatePrimeDefinitionInput): Promise<PrimeDefinition> {
  // TODO: connecter au backend GraphQL — mutation updatePrimeDefinition
  return mockPrimeDefinitions[0];
}

/** Supprime une définition de prime. */
export async function removePrimeDefinition(_id: string): Promise<boolean> {
  // TODO: connecter au backend GraphQL — mutation removePrimeDefinition
  return true;
}
