'use client';

import { useState } from 'react';
import { Save, Building2 } from 'lucide-react';
import { useToast } from '@/core/stores/toast-store';

export default function SettingsPage() {
  const { addToast } = useToast();
  const [form, setForm] = useState({
    companyName: 'Amanzi Technologies SARL',
    niu: '123456789',
    cnssNumber: 'CNSS-001234',
    address: '12, Avenue de la Paix',
    city: 'Brazzaville',
    phone: '+242 06 900 00 00',
    email: 'contact@amanzi.tech',
    website: 'www.amanzi.tech',
    currency: 'XAF',
    timezone: 'Africa/Brazzaville',
    fiscalYear: 'Janvier - Decembre',
    language: 'fr',
  });

  const handleSave = () => {
    addToast({
      title: 'Parametres sauvegardes',
      description: 'Les informations de l\'entreprise ont ete mises a jour.',
      variant: 'success',
    });
  };

  return (
    <div className="px-8 py-6">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-foreground">Informations generales</h1>
          <p className="mt-0.5 text-sm text-muted-foreground">
            Configuration de votre entreprise
          </p>
        </div>
        <button
          onClick={handleSave}
          className="inline-flex items-center gap-2 rounded-xs bg-accent px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-accent/90"
        >
          <Save className="h-4 w-4" />
          Enregistrer
        </button>
      </div>

      <div className="max-w-3xl space-y-6">
        {/* Company info card */}
        <div className="rounded-xs border bg-card p-6">
          <div className="mb-4 flex items-center gap-2">
            <Building2 className="h-4 w-4 text-muted-foreground" />
            <h2 className="text-sm font-semibold text-foreground">Identite de l{"'"}entreprise</h2>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1.5 block text-xs font-medium text-muted-foreground">
                Nom de l{"'"}entreprise
              </label>
              <input
                type="text"
                value={form.companyName}
                onChange={(e) => setForm({ ...form, companyName: e.target.value })}
                className="w-full rounded-xs border bg-background px-3 py-2 text-sm outline-none transition-colors focus:border-accent focus:ring-1 focus:ring-accent/30"
              />
            </div>
            <div>
              <label className="mb-1.5 block text-xs font-medium text-muted-foreground">
                NIU
              </label>
              <input
                type="text"
                value={form.niu}
                onChange={(e) => setForm({ ...form, niu: e.target.value })}
                className="w-full rounded-xs border bg-background px-3 py-2 text-sm font-mono outline-none transition-colors focus:border-accent focus:ring-1 focus:ring-accent/30"
              />
            </div>
            <div>
              <label className="mb-1.5 block text-xs font-medium text-muted-foreground">
                Numero CNSS
              </label>
              <input
                type="text"
                value={form.cnssNumber}
                onChange={(e) => setForm({ ...form, cnssNumber: e.target.value })}
                className="w-full rounded-xs border bg-background px-3 py-2 text-sm font-mono outline-none transition-colors focus:border-accent focus:ring-1 focus:ring-accent/30"
              />
            </div>
            <div>
              <label className="mb-1.5 block text-xs font-medium text-muted-foreground">
                Telephone
              </label>
              <input
                type="text"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                className="w-full rounded-xs border bg-background px-3 py-2 text-sm outline-none transition-colors focus:border-accent focus:ring-1 focus:ring-accent/30"
              />
            </div>
            <div className="sm:col-span-2">
              <label className="mb-1.5 block text-xs font-medium text-muted-foreground">
                Adresse
              </label>
              <input
                type="text"
                value={form.address}
                onChange={(e) => setForm({ ...form, address: e.target.value })}
                className="w-full rounded-xs border bg-background px-3 py-2 text-sm outline-none transition-colors focus:border-accent focus:ring-1 focus:ring-accent/30"
              />
            </div>
            <div>
              <label className="mb-1.5 block text-xs font-medium text-muted-foreground">
                Ville
              </label>
              <input
                type="text"
                value={form.city}
                onChange={(e) => setForm({ ...form, city: e.target.value })}
                className="w-full rounded-xs border bg-background px-3 py-2 text-sm outline-none transition-colors focus:border-accent focus:ring-1 focus:ring-accent/30"
              />
            </div>
            <div>
              <label className="mb-1.5 block text-xs font-medium text-muted-foreground">
                Email
              </label>
              <input
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full rounded-xs border bg-background px-3 py-2 text-sm outline-none transition-colors focus:border-accent focus:ring-1 focus:ring-accent/30"
              />
            </div>
          </div>
        </div>

        {/* Regional settings */}
        <div className="rounded-xs border bg-card p-6">
          <div className="mb-4 flex items-center gap-2">
            <Building2 className="h-4 w-4 text-muted-foreground" />
            <h2 className="text-sm font-semibold text-foreground">Parametres regionaux</h2>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1.5 block text-xs font-medium text-muted-foreground">
                Devise
              </label>
              <select
                value={form.currency}
                onChange={(e) => setForm({ ...form, currency: e.target.value })}
                className="w-full rounded-xs border bg-background px-3 py-2 text-sm outline-none transition-colors focus:border-accent focus:ring-1 focus:ring-accent/30"
              >
                <option value="XAF">FCFA (XAF)</option>
                <option value="XOF">FCFA (XOF)</option>
                <option value="USD">Dollar (USD)</option>
                <option value="EUR">Euro (EUR)</option>
              </select>
            </div>
            <div>
              <label className="mb-1.5 block text-xs font-medium text-muted-foreground">
                Fuseau horaire
              </label>
              <select
                value={form.timezone}
                onChange={(e) => setForm({ ...form, timezone: e.target.value })}
                className="w-full rounded-xs border bg-background px-3 py-2 text-sm outline-none transition-colors focus:border-accent focus:ring-1 focus:ring-accent/30"
              >
                <option value="Africa/Brazzaville">Africa/Brazzaville (UTC+1)</option>
                <option value="Africa/Lagos">Africa/Lagos (UTC+1)</option>
                <option value="Africa/Douala">Africa/Douala (UTC+1)</option>
              </select>
            </div>
            <div>
              <label className="mb-1.5 block text-xs font-medium text-muted-foreground">
                Exercice fiscal
              </label>
              <select
                value={form.fiscalYear}
                onChange={(e) => setForm({ ...form, fiscalYear: e.target.value })}
                className="w-full rounded-xs border bg-background px-3 py-2 text-sm outline-none transition-colors focus:border-accent focus:ring-1 focus:ring-accent/30"
              >
                <option>Janvier - Decembre</option>
                <option>Avril - Mars</option>
                <option>Juillet - Juin</option>
              </select>
            </div>
            <div>
              <label className="mb-1.5 block text-xs font-medium text-muted-foreground">
                Langue
              </label>
              <select
                value={form.language}
                onChange={(e) => setForm({ ...form, language: e.target.value })}
                className="w-full rounded-xs border bg-background px-3 py-2 text-sm outline-none transition-colors focus:border-accent focus:ring-1 focus:ring-accent/30"
              >
                <option value="fr">Francais</option>
                <option value="en">English</option>
              </select>
            </div>
          </div>
        </div>

        {/* Danger zone */}
        <div className="rounded-xs border border-red-200 bg-red-50/50 p-6">
          <h2 className="text-sm font-semibold text-red-700">Zone de danger</h2>
          <p className="mt-1 text-xs text-red-600/80">
            Actions irreversibles sur votre compte
          </p>
          <div className="mt-4 flex gap-3">
            <button className="rounded-xs border border-red-200 bg-card px-3 py-1.5 text-xs font-medium text-red-600 transition-colors hover:bg-red-50">
              Exporter les donnees
            </button>
            <button className="rounded-xs border border-red-300 bg-red-600 px-3 py-1.5 text-xs font-medium text-white transition-colors hover:bg-red-700">
              Supprimer le compte
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
