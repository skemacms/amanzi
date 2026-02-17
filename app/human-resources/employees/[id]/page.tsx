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
        <p className="text-muted-foreground">Employe introuvable.</p>
      </div>
    );
  }

  return (
    <div className="px-6 py-6">
      {/* Navigation */}
      <Link href="/human-resources/employees" className="mb-4 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
        <ArrowLeft className="h-4 w-4" />
        Retour a la liste
      </Link>

      {/* Header */}
      <div className="mb-6 flex items-start justify-between">
        <div>
          <h1 className="text-xl font-bold text-foreground">
            {employee.lastName} {employee.firstName}
          </h1>
          <div className="mt-1.5 flex items-center gap-4 text-sm text-muted-foreground">
            <span className="font-mono text-xs">{employee.employeeCode}</span>
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
        <button className="inline-flex items-center gap-2 rounded-md border bg-card px-3 py-2 text-sm font-medium text-foreground transition-colors hover:bg-muted">
          <Pencil className="h-4 w-4" />
          Modifier
        </button>
      </div>

      {/* Info grid */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        {/* Personal */}
        <div className="rounded-lg border bg-card p-5">
          <h2 className="mb-3 text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">
            Informations personnelles
          </h2>
          <dl className="space-y-2.5 text-sm">
            <div className="flex justify-between">
              <dt className="text-muted-foreground">Situation familiale</dt>
              <dd className="font-medium text-foreground">{MARITAL_STATUS_LABELS[employee.maritalStatus]}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-muted-foreground">Enfants a charge</dt>
              <dd className="font-medium text-foreground">{employee.childrenCount}</dd>
            </div>
            {employee.birthDate && (
              <div className="flex justify-between">
                <dt className="text-muted-foreground">Date de naissance</dt>
                <dd className="font-medium text-foreground">{formatDate(employee.birthDate)}</dd>
              </div>
            )}
            {employee.birthPlace && (
              <div className="flex justify-between">
                <dt className="text-muted-foreground">Lieu de naissance</dt>
                <dd className="font-medium text-foreground">{employee.birthPlace}</dd>
              </div>
            )}
            {employee.phone && (
              <div className="flex justify-between">
                <dt className="text-muted-foreground">Telephone</dt>
                <dd className="flex items-center gap-1 font-medium text-foreground">
                  <Phone className="h-3.5 w-3.5" />
                  {employee.phone}
                </dd>
              </div>
            )}
          </dl>
        </div>

        {/* Professional */}
        <div className="rounded-lg border bg-card p-5">
          <h2 className="mb-3 text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">
            Informations professionnelles
          </h2>
          <dl className="space-y-2.5 text-sm">
            <div className="flex justify-between">
              <dt className="text-muted-foreground">Date d{"'"}embauche</dt>
              <dd className="flex items-center gap-1 font-medium text-foreground">
                <Calendar className="h-3.5 w-3.5" />
                {formatDate(employee.hireDate)}
              </dd>
            </div>
            {employee.category && (
              <div className="flex justify-between">
                <dt className="text-muted-foreground">Categorie</dt>
                <dd className="font-medium text-foreground">{employee.category}</dd>
              </div>
            )}
            {employee.echelon && (
              <div className="flex justify-between">
                <dt className="text-muted-foreground">Echelon</dt>
                <dd className="font-medium text-foreground">{employee.echelon}</dd>
              </div>
            )}
            {employee.cnssNumber && (
              <div className="flex justify-between">
                <dt className="text-muted-foreground">N CNSS</dt>
                <dd className="font-mono font-medium text-foreground">{employee.cnssNumber}</dd>
              </div>
            )}
          </dl>
        </div>

        {/* Compensation */}
        <div className="rounded-lg border bg-card p-5">
          <h2 className="mb-3 text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">
            Remuneration
          </h2>
          <dl className="space-y-2.5 text-sm">
            <div className="flex justify-between">
              <dt className="text-muted-foreground">Salaire de base</dt>
              <dd className="font-bold text-foreground">{formatCurrency(employee.baseSalary)}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-muted-foreground">Sursalaire</dt>
              <dd className="font-medium text-foreground">{formatCurrency(employee.sursalaire)}</dd>
            </div>
          </dl>
        </div>

        {/* Primes */}
        <div className="rounded-lg border bg-card p-5">
          <h2 className="mb-3 text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">
            Primes assignees
          </h2>
          {employee.employeePrimes && employee.employeePrimes.length > 0 ? (
            <div className="space-y-2">
              {employee.employeePrimes.map((ep) => (
                <div key={ep.id} className="flex items-center justify-between rounded-md bg-muted px-3 py-2 text-sm">
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-foreground">{ep.primeDefinition?.name ?? ep.primeDefinitionId}</span>
                    {ep.primeDefinition && (
                      <span className={`rounded-full px-2 py-0.5 text-[10px] font-medium ${ep.primeDefinition.isTaxable ? 'bg-amber-50 text-amber-700' : 'bg-teal-50 text-teal-700'}`}>
                        {ep.primeDefinition.isTaxable ? 'Imposable' : 'Non imposable'}
                      </span>
                    )}
                  </div>
                  <span className="font-mono font-medium text-foreground">{formatCurrency(ep.amount)}</span>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-muted-foreground">Aucune prime assignee.</p>
          )}
        </div>

        {/* Bank details */}
        {employee.bankName && (
          <div className="rounded-lg border bg-card p-5 lg:col-span-2">
            <h2 className="mb-3 text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">
              Coordonnees bancaires
            </h2>
            <dl className="grid grid-cols-2 gap-3 text-sm sm:grid-cols-5">
              <div>
                <dt className="text-muted-foreground">Banque</dt>
                <dd className="font-medium text-foreground">{employee.bankName}</dd>
              </div>
              <div>
                <dt className="text-muted-foreground">Code banque</dt>
                <dd className="font-mono font-medium text-foreground">{employee.bankCode}</dd>
              </div>
              <div>
                <dt className="text-muted-foreground">Code agence</dt>
                <dd className="font-mono font-medium text-foreground">{employee.branchCode}</dd>
              </div>
              <div>
                <dt className="text-muted-foreground">N compte</dt>
                <dd className="font-mono font-medium text-foreground">{employee.accountNumber}</dd>
              </div>
              <div>
                <dt className="text-muted-foreground">Cle RIB</dt>
                <dd className="font-mono font-medium text-foreground">{employee.ribKey}</dd>
              </div>
            </dl>
          </div>
        )}
      </div>
    </div>
  );
}
