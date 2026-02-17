import type { SalaryGridEntry } from '../types/salary-grid';
import { mockSalaryGrid } from '../mock/data';

/** Liste la grille salariale de l'entreprise. */
export async function getSalaryGrid(): Promise<SalaryGridEntry[]> {
  // TODO: connecter au backend GraphQL — query { salaryGrid }
  return mockSalaryGrid;
}

/** Récupère une entrée par catégorie et échelon. */
export async function getSalaryGridEntry(
  _category: number,
  _echelon: number,
): Promise<SalaryGridEntry | null> {
  // TODO: connecter au backend GraphQL — query { salaryGridEntry(category, echelon) }
  return mockSalaryGrid.find((e) => e.category === _category && e.echelon === _echelon) ?? null;
}
