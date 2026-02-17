'use client';

import { use } from 'react';
import Link from 'next/link';
import { ArrowLeft, Pencil, MapPin, Phone, Calendar, Briefcase } from 'lucide-react';
import { mockEmployees } from '@/features/human-resources/mock/data';
import { formatCurrency, formatDate } from '@/core/lib/utils';
import { ZONE_LABELS, MARITAL_STATUS_LABELS } from '@/core/types/enums';

export default function EmployeeDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const employee = mockEmployees.find((e) => e.id === id);

  if (!employee) {
    return (
      <div className="flex h-full items-center justify-center p-8">
        <p className="text-stone-400">Employé introuvable.</p>
      </div>
    );
  }

  return (
    <div className="p-8">
      {/* Navigation */}
      <Link href="/human-resources/employees" className="mb-6 inline-flex items-center gap-2 text-sm text-stone-400 hover:text-stone-700">
        <ArrowLeft className="h-4 w-4" />
        Retour à la liste
      </Link>

      {/* En-tête employé */}
      <div className="mb-8 flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-stone-900">
            {employee.lastName} {employee.firstName}
          </h1>
          <div className="mt-2 flex items-center gap-4 text-sm text-stone-500">
            <span className="font-mono">{employee.employeeCode}</span>
            {employee.functionTitle && (
              <span className="flex items-center gap-1">
                <Briefcase className="h-3.5 w-3.5" />
                {employee.functionTitle}
              </span>
            )}
            <span className="flex items-center gap-1">
              <MapPin className="h-3.5 w-3.5" />
              {ZONE_LABELS[employee.zone]}
            </span>
          </div>
        </div>
        <button className="inline-flex items-center gap-2 rounded-xl bg-white px-4 py-2 text-sm font-medium text-stone-700 transition-colors hover:bg-stone-100">
          <Pencil className="h-4 w-4" />
          Modifier
        </button>
      </div>

      {/* Grille d'informations */}
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
        {/* Informations personnelles */}
        <div className="rounded-2xl bg-white p-6">
          <h2 className="mb-4 text-[10px] font-semibold uppercase tracking-widest text-stone-400">
            Informations personnelles
          </h2>
          <dl className="space-y-3 text-sm">
            <div className="flex justify-between">
              <dt className="text-stone-500">Situation familiale</dt>
              <dd className="font-medium">{MARITAL_STATUS_LABELS[employee.maritalStatus]}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-stone-500">Enfants à charge</dt>
              <dd className="font-medium">{employee.childrenCount}</dd>
            </div>
            {employee.birthDate && (
              <div className="flex justify-between">
                <dt className="text-stone-500">Date de naissance</dt>
                <dd className="font-medium">{formatDate(employee.birthDate)}</dd>
              </div>
            )}
            {employee.birthPlace && (
              <div className="flex justify-between">
                <dt className="text-stone-500">Lieu de naissance</dt>
                <dd className="font-medium">{employee.birthPlace}</dd>
              </div>
            )}
            {employee.phone && (
              <div className="flex justify-between">
                <dt className="text-stone-500">Téléphone</dt>
                <dd className="flex items-center gap-1 font-medium">
                  <Phone className="h-3.5 w-3.5" />
                  {employee.phone}
                </dd>
              </div>
            )}
          </dl>
        </div>

        {/* Informations professionnelles */}
        <div className="rounded-2xl bg-white p-6">
          <h2 className="mb-4 text-[10px] font-semibold uppercase tracking-widest text-stone-400">
            Informations professionnelles
          </h2>
          <dl className="space-y-3 text-sm">
            <div className="flex justify-between">
              <dt className="text-stone-500">Date d&apos;embauche</dt>
              <dd className="flex items-center gap-1 font-medium">
                <Calendar className="h-3.5 w-3.5" />
                {formatDate(employee.hireDate)}
              </dd>
            </div>
            {employee.category && (
              <div className="flex justify-between">
                <dt className="text-stone-500">Catégorie</dt>
                <dd className="font-medium">{employee.category}</dd>
              </div>
            )}
            {employee.echelon && (
              <div className="flex justify-between">
                <dt className="text-stone-500">Échelon</dt>
                <dd className="font-medium">{employee.echelon}</dd>
              </div>
            )}
            {employee.cnssNumber && (
              <div className="flex justify-between">
                <dt className="text-stone-500">N° CNSS</dt>
                <dd className="font-mono font-medium">{employee.cnssNumber}</dd>
              </div>
            )}
          </dl>
        </div>

        {/* Rémunération */}
        <div className="rounded-2xl bg-white p-6">
          <h2 className="mb-4 text-[10px] font-semibold uppercase tracking-widest text-stone-400">
            Rémunération
          </h2>
          <dl className="space-y-3 text-sm">
            <div className="flex justify-between">
              <dt className="text-stone-500">Salaire de base</dt>
              <dd className="font-bold text-stone-900">{formatCurrency(employee.baseSalary)}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-stone-500">Sursalaire</dt>
              <dd className="font-medium">{formatCurrency(employee.sursalaire)}</dd>
            </div>
          </dl>
        </div>

        {/* Primes */}
        <div className="rounded-2xl bg-white p-6">
          <h2 className="mb-4 text-[10px] font-semibold uppercase tracking-widest text-stone-400">
            Primes assignées
          </h2>
          {employee.employeePrimes && employee.employeePrimes.length > 0 ? (
            <div className="space-y-2">
              {employee.employeePrimes.map((ep) => (
                <div key={ep.id} className="flex items-center justify-between rounded-xl bg-stone-50 px-3 py-2 text-sm">
                  <div>
                    <span className="font-medium">{ep.primeDefinition?.name ?? ep.primeDefinitionId}</span>
                    {ep.primeDefinition && (
                      <span className={`ml-2 rounded-full px-2 py-0.5 text-xs ${ep.primeDefinition.isTaxable ? 'bg-amber-50 text-amber-700' : 'bg-teal-50 text-teal-700'}`}>
                        {ep.primeDefinition.isTaxable ? 'Imposable' : 'Non imposable'}
                      </span>
                    )}
                  </div>
                  <span className="font-medium">{formatCurrency(ep.amount)}</span>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-stone-400">Aucune prime assignée.</p>
          )}
        </div>

        {/* Coordonnées bancaires */}
        {employee.bankName && (
          <div className="rounded-2xl bg-white p-6 lg:col-span-2">
            <h2 className="mb-4 text-[10px] font-semibold uppercase tracking-widest text-stone-400">
              Coordonnées bancaires
            </h2>
            <dl className="grid grid-cols-2 gap-3 text-sm sm:grid-cols-5">
              <div>
                <dt className="text-stone-500">Banque</dt>
                <dd className="font-medium">{employee.bankName}</dd>
              </div>
              <div>
                <dt className="text-stone-500">Code banque</dt>
                <dd className="font-mono font-medium">{employee.bankCode}</dd>
              </div>
              <div>
                <dt className="text-stone-500">Code agence</dt>
                <dd className="font-mono font-medium">{employee.branchCode}</dd>
              </div>
              <div>
                <dt className="text-stone-500">N° compte</dt>
                <dd className="font-mono font-medium">{employee.accountNumber}</dd>
              </div>
              <div>
                <dt className="text-stone-500">Clé RIB</dt>
                <dd className="font-mono font-medium">{employee.ribKey}</dd>
              </div>
            </dl>
          </div>
        )}
      </div>
    </div>
  );
}
