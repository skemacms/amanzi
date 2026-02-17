'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Save } from 'lucide-react';
import { MaritalStatus, Zone } from '@/core/types/enums';
import { useToast } from '@/core/stores/toast-store';

const inputClass = 'w-full rounded-xs border bg-background px-3 py-2 text-sm outline-none transition-colors focus:border-accent focus:ring-1 focus:ring-accent/30';
const labelClass = 'mb-1.5 block text-xs font-medium text-muted-foreground';

export default function NewEmployeePage() {
  const { addToast } = useToast();
  const [form, setForm] = useState({
    employeeCode: '',
    firstName: '',
    lastName: '',
    birthDate: '',
    birthPlace: '',
    maritalStatus: MaritalStatus.SINGLE,
    childrenCount: 0,
    phone: '',
    hireDate: '',
    functionTitle: '',
    category: '',
    echelon: '',
    cnssNumber: '',
    baseSalary: 0,
    sursalaire: 0,
    zone: Zone.DOWNTOWN,
    bankName: '',
    bankCode: '',
    branchCode: '',
    accountNumber: '',
    ribKey: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addToast({
      title: 'Employe cree',
      description: `${form.firstName} ${form.lastName} a ete ajoute avec succes.`,
      variant: 'success',
    });
  };

  const update = (field: string, value: string | number) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="px-6 py-6">
      <Link href="/human-resources/employees" className="mb-4 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
        <ArrowLeft className="h-4 w-4" />
        Retour a la liste
      </Link>

      <h1 className="mb-6 text-xl font-bold text-foreground">Nouvel employe</h1>

      <form onSubmit={handleSubmit} className="grid max-w-4xl grid-cols-1 gap-4 lg:grid-cols-2">
        {/* Identity */}
        <div className="rounded-xs border bg-card p-5 lg:col-span-2">
          <h2 className="mb-3 text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">Identite</h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <label className="block">
              <span className={labelClass}>Code employe *</span>
              <input required value={form.employeeCode} onChange={(e) => update('employeeCode', e.target.value)} className={inputClass} />
            </label>
            <label className="block">
              <span className={labelClass}>Prenom *</span>
              <input required value={form.firstName} onChange={(e) => update('firstName', e.target.value)} className={inputClass} />
            </label>
            <label className="block">
              <span className={labelClass}>Nom *</span>
              <input required value={form.lastName} onChange={(e) => update('lastName', e.target.value)} className={inputClass} />
            </label>
            <label className="block">
              <span className={labelClass}>Date de naissance</span>
              <input type="date" value={form.birthDate} onChange={(e) => update('birthDate', e.target.value)} className={inputClass} />
            </label>
            <label className="block">
              <span className={labelClass}>Lieu de naissance</span>
              <input value={form.birthPlace} onChange={(e) => update('birthPlace', e.target.value)} className={inputClass} />
            </label>
            <label className="block">
              <span className={labelClass}>Situation familiale</span>
              <select value={form.maritalStatus} onChange={(e) => update('maritalStatus', e.target.value)} className={inputClass}>
                <option value={MaritalStatus.SINGLE}>Celibataire</option>
                <option value={MaritalStatus.MARRIED}>Marie(e)</option>
                <option value={MaritalStatus.DIVORCED}>Divorce(e)</option>
                <option value={MaritalStatus.WIDOWED}>Veuf/Veuve</option>
              </select>
            </label>
            <label className="block">
              <span className={labelClass}>Enfants a charge</span>
              <input type="number" min={0} value={form.childrenCount} onChange={(e) => update('childrenCount', Number(e.target.value))} className={inputClass} />
            </label>
            <label className="block">
              <span className={labelClass}>Telephone</span>
              <input value={form.phone} onChange={(e) => update('phone', e.target.value)} className={inputClass} />
            </label>
          </div>
        </div>

        {/* Professional */}
        <div className="rounded-xs border bg-card p-5 lg:col-span-2">
          <h2 className="mb-3 text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">Professionnel</h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <label className="block">
              <span className={labelClass}>Date d{"'"}embauche *</span>
              <input required type="date" value={form.hireDate} onChange={(e) => update('hireDate', e.target.value)} className={inputClass} />
            </label>
            <label className="block">
              <span className={labelClass}>Fonction</span>
              <input value={form.functionTitle} onChange={(e) => update('functionTitle', e.target.value)} className={inputClass} />
            </label>
            <label className="block">
              <span className={labelClass}>Categorie</span>
              <input value={form.category} onChange={(e) => update('category', e.target.value)} className={inputClass} />
            </label>
            <label className="block">
              <span className={labelClass}>Echelon</span>
              <input value={form.echelon} onChange={(e) => update('echelon', e.target.value)} className={inputClass} />
            </label>
            <label className="block">
              <span className={labelClass}>N CNSS</span>
              <input value={form.cnssNumber} onChange={(e) => update('cnssNumber', e.target.value)} className={inputClass} />
            </label>
            <label className="block">
              <span className={labelClass}>Zone</span>
              <select value={form.zone} onChange={(e) => update('zone', e.target.value)} className={inputClass}>
                <option value={Zone.DOWNTOWN}>Centre-ville</option>
                <option value={Zone.SUBURBAN}>Peripherie</option>
              </select>
            </label>
          </div>
        </div>

        {/* Compensation */}
        <div className="rounded-xs border bg-card p-5 lg:col-span-2">
          <h2 className="mb-3 text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">Remuneration</h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <label className="block">
              <span className={labelClass}>Salaire de base (FCFA) *</span>
              <input required type="number" min={0} value={form.baseSalary} onChange={(e) => update('baseSalary', Number(e.target.value))} className={inputClass} />
            </label>
            <label className="block">
              <span className={labelClass}>Sursalaire (FCFA)</span>
              <input type="number" min={0} value={form.sursalaire} onChange={(e) => update('sursalaire', Number(e.target.value))} className={inputClass} />
            </label>
          </div>
        </div>

        {/* Submit */}
        <div className="lg:col-span-2">
          <button type="submit" className="inline-flex items-center gap-2 rounded-xs bg-accent px-6 py-2 text-sm font-medium text-white transition-colors hover:bg-accent/90">
            <Save className="h-4 w-4" />
            Enregistrer
          </button>
        </div>
      </form>
    </div>
  );
}
