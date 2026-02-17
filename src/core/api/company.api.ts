import type { Company, UpdateCompanyInput } from '../types/company';
import { mockCompany } from '@/features/human-resources/mock/data';

/** Récupère les informations de l'entreprise courante. */
export async function getCompany(): Promise<Company> {
  // TODO: connecter au backend GraphQL — query { company }
  return mockCompany;
}

/** Met à jour les informations de l'entreprise. */
export async function updateCompany(_input: UpdateCompanyInput): Promise<Company> {
  // TODO: connecter au backend GraphQL — mutation updateCompany
  return mockCompany;
}

/** Applique un preset de convention collective. */
export async function applyConventionPreset(
  _code: string,
  _version: string,
): Promise<Company> {
  // TODO: connecter au backend GraphQL — mutation applyConventionPreset
  return mockCompany;
}
