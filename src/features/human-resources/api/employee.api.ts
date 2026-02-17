import type {
  Employee,
  EmployeePrime,
  CreateEmployeeInput,
  UpdateEmployeeInput,
  SetEmployeePrimeInput,
} from '../types/employee';
import { mockEmployees } from '../mock/data';

/** Liste tous les employés actifs de l'entreprise. */
export async function getEmployees(): Promise<Employee[]> {
  // TODO: connecter au backend GraphQL — query { employees }
  return mockEmployees;
}

/** Récupère un employé par son identifiant. */
export async function getEmployee(id: string): Promise<Employee> {
  // TODO: connecter au backend GraphQL — query { employee(id) }
  const found = mockEmployees.find((e) => e.id === id);
  if (!found) throw new Error(`Employé ${id} introuvable`);
  return found;
}

/** Crée un nouvel employé. */
export async function createEmployee(_input: CreateEmployeeInput): Promise<Employee> {
  // TODO: connecter au backend GraphQL — mutation createEmployee
  return mockEmployees[0];
}

/** Met à jour un employé existant. */
export async function updateEmployee(_id: string, _input: UpdateEmployeeInput): Promise<Employee> {
  // TODO: connecter au backend GraphQL — mutation updateEmployee
  return mockEmployees[0];
}

/** Désactive un employé. */
export async function deactivateEmployee(_id: string): Promise<Employee> {
  // TODO: connecter au backend GraphQL — mutation deactivateEmployee
  return { ...mockEmployees[0], isActive: false };
}

/** Récupère les primes d'un employé. */
export async function getEmployeePrimes(_employeeId: string): Promise<EmployeePrime[]> {
  // TODO: connecter au backend GraphQL — query { employeePrimes(employeeId) }
  return mockEmployees[0].employeePrimes ?? [];
}

/** Définit ou met à jour une prime pour un employé. */
export async function setEmployeePrime(
  _employeeId: string,
  _input: SetEmployeePrimeInput,
): Promise<EmployeePrime> {
  // TODO: connecter au backend GraphQL — mutation setEmployeePrime
  return { id: 'ep-new', employeeId: _employeeId, primeDefinitionId: _input.primeDefinitionId, amount: _input.amount };
}

/** Supprime une prime d'un employé. */
export async function removeEmployeePrime(
  _employeeId: string,
  _primeDefinitionId: string,
): Promise<boolean> {
  // TODO: connecter au backend GraphQL — mutation removeEmployeePrime
  return true;
}
