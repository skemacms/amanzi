'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Save } from 'lucide-react';
import { MaritalStatus, Zone } from '@/core/types/enums';

const inputClass = 'w-full rounded-xl bg-stone-50 px-3 py-2 text-sm outline-none transition-shadow focus:ring-2 focus:ring-teal-600/20 focus:bg-white';
const labelClass = 'mb-1 block text-sm text-stone-500';

export default function NewEmployeePage() {
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
    console.log('Création employé :', form);
    alert('Employé créé (mock)');
  };

  const update = (field: string, value: string | number) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="p-8">
      <Link href="/human-resources/employees" className="mb-6 inline-flex items-center gap-2 text-sm text-stone-400 hover:text-stone-700">
        <ArrowLeft className="h-4 w-4" />
        Retour à la liste
      </Link>

      <h1 className="mb-8 text-2xl font-bold text-stone-900">Nouvel employé</h1>

      <form onSubmit={handleSubmit} className="grid max-w-4xl grid-cols-1 gap-5 lg:grid-cols-2">
        {/* Identité */}
        <div className="rounded-2xl bg-white p-6 lg:col-span-2">
          <h2 className="mb-4 text-[10px] font-semibold uppercase tracking-widest text-stone-400">Identité</h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <label className="block">
              <span className={labelClass}>Code employé *</span>
              <input required value={form.employeeCode} onChange={(e) => update('employeeCode', e.target.value)} className={inputClass} />
            </label>
            <label className="block">
              <span className={labelClass}>Prénom *</span>
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
                <option value={MaritalStatus.SINGLE}>Célibataire</option>
                <option value={MaritalStatus.MARRIED}>Marié(e)</option>
                <option value={MaritalStatus.DIVORCED}>Divorcé(e)</option>
                <option value={MaritalStatus.WIDOWED}>Veuf/Veuve</option>
              </select>
            </label>
            <label className="block">
              <span className={labelClass}>Enfants à charge</span>
              <input type="number" min={0} value={form.childrenCount} onChange={(e) => update('childrenCount', Number(e.target.value))} className={inputClass} />
            </label>
            <label className="block">
              <span className={labelClass}>Téléphone</span>
              <input value={form.phone} onChange={(e) => update('phone', e.target.value)} className={inputClass} />
            </label>
          </div>
        </div>

        {/* Professionnel */}
        <div className="rounded-2xl bg-white p-6 lg:col-span-2">
          <h2 className="mb-4 text-[10px] font-semibold uppercase tracking-widest text-stone-400">Professionnel</h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <label className="block">
              <span className={labelClass}>Date d&apos;embauche *</span>
              <input required type="date" value={form.hireDate} onChange={(e) => update('hireDate', e.target.value)} className={inputClass} />
            </label>
            <label className="block">
              <span className={labelClass}>Fonction</span>
              <input value={form.functionTitle} onChange={(e) => update('functionTitle', e.target.value)} className={inputClass} />
            </label>
            <label className="block">
              <span className={labelClass}>Catégorie</span>
              <input value={form.category} onChange={(e) => update('category', e.target.value)} className={inputClass} />
            </label>
            <label className="block">
              <span className={labelClass}>Échelon</span>
              <input value={form.echelon} onChange={(e) => update('echelon', e.target.value)} className={inputClass} />
            </label>
            <label className="block">
              <span className={labelClass}>N° CNSS</span>
              <input value={form.cnssNumber} onChange={(e) => update('cnssNumber', e.target.value)} className={inputClass} />
            </label>
            <label className="block">
              <span className={labelClass}>Zone</span>
              <select value={form.zone} onChange={(e) => update('zone', e.target.value)} className={inputClass}>
                <option value={Zone.DOWNTOWN}>Centre-ville</option>
                <option value={Zone.SUBURBAN}>Périphérie</option>
              </select>
            </label>
          </div>
        </div>

        {/* Rémunération */}
        <div className="rounded-2xl bg-white p-6 lg:col-span-2">
          <h2 className="mb-4 text-[10px] font-semibold uppercase tracking-widest text-stone-400">Rémunération</h2>
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

        {/* Bouton */}
        <div className="lg:col-span-2">
          <button type="submit" className="inline-flex items-center gap-2 rounded-xl bg-teal-600 px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-teal-700">
            <Save className="h-4 w-4" />
            Enregistrer
          </button>
        </div>
      </form>
    </div>
  );
}
