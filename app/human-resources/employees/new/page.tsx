'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  ArrowLeft,
  Save,
  Briefcase,
  FileText,
  User,
  Wallet,
  SlidersHorizontal,
  Settings,
  Clock,
  History,
  StickyNote,
  Activity,
  Plus,
  Trash2,
  ChevronRight,
} from 'lucide-react';
import { MaritalStatus, Zone, WorkTrackingMode, BenefitInKindType } from '@/core/types/enums';
import { useToast } from '@/core/stores/toast-store';

const inputClass =
  'w-full rounded-xs border bg-background px-3 py-2 text-sm outline-none transition-colors focus:border-accent focus:ring-1 focus:ring-accent/30';
const labelClass = 'mb-1.5 block text-xs font-medium text-muted-foreground';
const sectionCardClass = 'rounded-xs border bg-card p-5';
const sectionTitleClass = 'mb-4 text-[11px] font-semibold uppercase tracking-widest text-muted-foreground';

const SIDEBAR_TABS = [
  { id: 'travail', label: 'Travail', icon: Briefcase },
  { id: 'cv', label: 'CV', icon: FileText },
  { id: 'personnel', label: 'Personnel', icon: User },
  { id: 'paie', label: 'Paie', icon: Wallet },
  { id: 'ajustements', label: 'Ajustements de salaire', icon: SlidersHorizontal },
  { id: 'parametres', label: 'Parametres', icon: Settings },
] as const;

const RIGHT_TABS = [
  { id: 'historique', label: 'Historique', icon: History },
  { id: 'notes', label: 'Notes', icon: StickyNote },
  { id: 'activite', label: 'Activite', icon: Activity },
] as const;

type SidebarTab = (typeof SIDEBAR_TABS)[number]['id'];
type RightTab = (typeof RIGHT_TABS)[number]['id'];

const DAYS_OF_WEEK = [
  { key: 'lundi', label: 'Lundi' },
  { key: 'mardi', label: 'Mardi' },
  { key: 'mercredi', label: 'Mercredi' },
  { key: 'jeudi', label: 'Jeudi' },
  { key: 'vendredi', label: 'Vendredi' },
  { key: 'samedi', label: 'Samedi' },
  { key: 'dimanche', label: 'Dimanche' },
] as const;

export default function NewEmployeePage() {
  const { addToast } = useToast();
  const [activeTab, setActiveTab] = useState<SidebarTab>('travail');
  const [activeRightTab, setActiveRightTab] = useState<RightTab>('historique');
  const [scheduleMode, setScheduleMode] = useState<WorkTrackingMode>(WorkTrackingMode.DAYS);
  const [notes, setNotes] = useState<{ id: string; text: string; date: string }[]>([]);
  const [newNote, setNewNote] = useState('');

  const [form, setForm] = useState({
    // Travail
    employeeCode: '',
    hireDate: '',
    functionTitle: '',
    department: '',
    manager: '',
    category: '',
    echelon: '',
    conventionCollective: 'COMMERCE',
    cnssNumber: '',
    secuNumber: '',
    zone: Zone.DOWNTOWN,
    contractType: 'CDI',
    // CV
    education: '',
    experience: '',
    skills: '',
    languages: '',
    certifications: '',
    // Personnel
    firstName: '',
    lastName: '',
    birthDate: '',
    birthPlace: '',
    maritalStatus: MaritalStatus.SINGLE,
    childrenCount: 0,
    phone: '',
    email: '',
    address: '',
    city: '',
    emergencyContact: '',
    emergencyPhone: '',
    nationality: 'Congolaise',
    idNumber: '',
    // Paie
    baseSalary: 0,
    sursalaire: 0,
    bankName: '',
    bankCode: '',
    branchCode: '',
    accountNumber: '',
    ribKey: '',
    paymentMode: 'VIREMENT',
    // Ajustements
    adjustments: [] as { id: string; label: string; amount: number; date: string; type: 'augmentation' | 'reduction' }[],
    // Parametres - Schedule
    schedule: {
      lundi: { active: true, start: '08:00', end: '17:00', hours: 8 },
      mardi: { active: true, start: '08:00', end: '17:00', hours: 8 },
      mercredi: { active: true, start: '08:00', end: '17:00', hours: 8 },
      jeudi: { active: true, start: '08:00', end: '17:00', hours: 8 },
      vendredi: { active: true, start: '08:00', end: '16:00', hours: 7 },
      samedi: { active: false, start: '08:00', end: '12:00', hours: 0 },
      dimanche: { active: false, start: '', end: '', hours: 0 },
    } as Record<string, { active: boolean; start: string; end: string; hours: number }>,
    overtimeEnabled: false,
    remoteWorkEnabled: false,
    monthlyWorkNorm: 22,
  });

  const update = (field: string, value: string | number | boolean) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const updateSchedule = (day: string, field: string, value: string | boolean | number) => {
    setForm((prev) => ({
      ...prev,
      schedule: {
        ...prev.schedule,
        [day]: { ...prev.schedule[day], [field]: value },
      },
    }));
  };

  const addAdjustment = () => {
    const adj = {
      id: Date.now().toString(),
      label: '',
      amount: 0,
      date: new Date().toISOString().slice(0, 10),
      type: 'augmentation' as const,
    };
    setForm((prev) => ({ ...prev, adjustments: [...prev.adjustments, adj] }));
  };

  const removeAdjustment = (id: string) => {
    setForm((prev) => ({
      ...prev,
      adjustments: prev.adjustments.filter((a) => a.id !== id),
    }));
  };

  const updateAdjustment = (id: string, field: string, value: string | number) => {
    setForm((prev) => ({
      ...prev,
      adjustments: prev.adjustments.map((a) => (a.id === id ? { ...a, [field]: value } : a)),
    }));
  };

  const addNote = () => {
    if (!newNote.trim()) return;
    setNotes((prev) => [
      { id: Date.now().toString(), text: newNote.trim(), date: new Date().toISOString() },
      ...prev,
    ]);
    setNewNote('');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addToast({
      title: 'Employe cree',
      description: `${form.firstName} ${form.lastName} a ete ajoute avec succes.`,
      variant: 'success',
    });
  };

  return (
    <div className="flex h-[calc(100vh-7rem)] flex-col">
      {/* Top bar */}
      <div className="flex shrink-0 items-center justify-between border-b bg-card px-5 py-3">
        <div className="flex items-center gap-3">
          <Link
            href="/human-resources/employees"
            className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" />
            Employes
          </Link>
          <ChevronRight className="h-3.5 w-3.5 text-muted-foreground/50" />
          <span className="text-sm font-semibold text-foreground">Nouvel employe</span>
        </div>
        <button
          onClick={handleSubmit}
          className="inline-flex items-center gap-2 rounded-xs bg-accent px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-accent/90"
        >
          <Save className="h-4 w-4" />
          Enregistrer
        </button>
      </div>

      {/* Main layout: sidebar + center + right panel */}
      <div className="flex min-h-0 flex-1">
        {/* Left sidebar */}
        <nav className="flex w-56 shrink-0 flex-col gap-0.5 border-r bg-card px-2 py-3">
          {SIDEBAR_TABS.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2.5 rounded-xs px-3 py-2 text-sm transition-colors ${
                  isActive
                    ? 'bg-accent/10 font-medium text-accent'
                    : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                }`}
              >
                <Icon className="h-4 w-4 shrink-0" />
                <span className="truncate">{tab.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Center content */}
        <div className="flex-1 overflow-y-auto px-6 py-5">
          <form onSubmit={handleSubmit}>
            {/* ===== TRAVAIL ===== */}
            {activeTab === 'travail' && (
              <div className="space-y-5">
                <div className={sectionCardClass}>
                  <h2 className={sectionTitleClass}>Informations professionnelles</h2>
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                    <label className="block">
                      <span className={labelClass}>Code employe *</span>
                      <input
                        required
                        value={form.employeeCode}
                        onChange={(e) => update('employeeCode', e.target.value)}
                        className={inputClass}
                        placeholder="EMP-005"
                      />
                    </label>
                    <label className="block">
                      <span className={labelClass}>Date d{"'"}embauche *</span>
                      <input
                        required
                        type="date"
                        value={form.hireDate}
                        onChange={(e) => update('hireDate', e.target.value)}
                        className={inputClass}
                      />
                    </label>
                    <label className="block">
                      <span className={labelClass}>Type de contrat</span>
                      <select value={form.contractType} onChange={(e) => update('contractType', e.target.value)} className={inputClass}>
                        <option value="CDI">CDI</option>
                        <option value="CDD">CDD</option>
                        <option value="STAGE">Stage</option>
                        <option value="INTERIM">Interim</option>
                      </select>
                    </label>
                    <label className="block">
                      <span className={labelClass}>Fonction</span>
                      <input
                        value={form.functionTitle}
                        onChange={(e) => update('functionTitle', e.target.value)}
                        className={inputClass}
                        placeholder="Developpeur Senior"
                      />
                    </label>
                    <label className="block">
                      <span className={labelClass}>Departement</span>
                      <input
                        value={form.department}
                        onChange={(e) => update('department', e.target.value)}
                        className={inputClass}
                        placeholder="Informatique"
                      />
                    </label>
                    <label className="block">
                      <span className={labelClass}>Responsable</span>
                      <input
                        value={form.manager}
                        onChange={(e) => update('manager', e.target.value)}
                        className={inputClass}
                        placeholder="Nom du responsable"
                      />
                    </label>
                  </div>
                </div>

                <div className={sectionCardClass}>
                  <h2 className={sectionTitleClass}>Classification</h2>
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                    <label className="block">
                      <span className={labelClass}>Convention collective</span>
                      <input
                        value={form.conventionCollective}
                        onChange={(e) => update('conventionCollective', e.target.value)}
                        className={inputClass}
                      />
                    </label>
                    <label className="block">
                      <span className={labelClass}>Categorie</span>
                      <input value={form.category} onChange={(e) => update('category', e.target.value)} className={inputClass} placeholder="8" />
                    </label>
                    <label className="block">
                      <span className={labelClass}>Echelon</span>
                      <input value={form.echelon} onChange={(e) => update('echelon', e.target.value)} className={inputClass} placeholder="3" />
                    </label>
                    <label className="block">
                      <span className={labelClass}>N CNSS</span>
                      <input
                        value={form.cnssNumber}
                        onChange={(e) => update('cnssNumber', e.target.value)}
                        className={`${inputClass} font-mono`}
                        placeholder="CNSS-E005"
                      />
                    </label>
                    <label className="block">
                      <span className={labelClass}>N Securite sociale</span>
                      <input
                        value={form.secuNumber}
                        onChange={(e) => update('secuNumber', e.target.value)}
                        className={`${inputClass} font-mono`}
                        placeholder="SEC-005"
                      />
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
              </div>
            )}

            {/* ===== CV ===== */}
            {activeTab === 'cv' && (
              <div className="space-y-5">
                <div className={sectionCardClass}>
                  <h2 className={sectionTitleClass}>Formation</h2>
                  <textarea
                    rows={4}
                    value={form.education}
                    onChange={(e) => update('education', e.target.value)}
                    className={inputClass}
                    placeholder="Listez les diplomes et formations (un par ligne)..."
                  />
                </div>
                <div className={sectionCardClass}>
                  <h2 className={sectionTitleClass}>Experience professionnelle</h2>
                  <textarea
                    rows={4}
                    value={form.experience}
                    onChange={(e) => update('experience', e.target.value)}
                    className={inputClass}
                    placeholder="Decrivez les experiences professionnelles anterieures..."
                  />
                </div>
                <div className={sectionCardClass}>
                  <h2 className={sectionTitleClass}>Competences</h2>
                  <textarea
                    rows={3}
                    value={form.skills}
                    onChange={(e) => update('skills', e.target.value)}
                    className={inputClass}
                    placeholder="Listez les competences (separees par des virgules)..."
                  />
                </div>
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <div className={sectionCardClass}>
                    <h2 className={sectionTitleClass}>Langues</h2>
                    <textarea
                      rows={3}
                      value={form.languages}
                      onChange={(e) => update('languages', e.target.value)}
                      className={inputClass}
                      placeholder="Francais (natif), Anglais (intermediaire)..."
                    />
                  </div>
                  <div className={sectionCardClass}>
                    <h2 className={sectionTitleClass}>Certifications</h2>
                    <textarea
                      rows={3}
                      value={form.certifications}
                      onChange={(e) => update('certifications', e.target.value)}
                      className={inputClass}
                      placeholder="Listez les certifications obtenues..."
                    />
                  </div>
                </div>
              </div>
            )}

            {/* ===== PERSONNEL ===== */}
            {activeTab === 'personnel' && (
              <div className="space-y-5">
                <div className={sectionCardClass}>
                  <h2 className={sectionTitleClass}>Identite</h2>
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                    <label className="block">
                      <span className={labelClass}>Prenom *</span>
                      <input required value={form.firstName} onChange={(e) => update('firstName', e.target.value)} className={inputClass} />
                    </label>
                    <label className="block">
                      <span className={labelClass}>Nom *</span>
                      <input required value={form.lastName} onChange={(e) => update('lastName', e.target.value)} className={inputClass} />
                    </label>
                    <label className="block">
                      <span className={labelClass}>Nationalite</span>
                      <input value={form.nationality} onChange={(e) => update('nationality', e.target.value)} className={inputClass} />
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
                      <span className={labelClass}>N piece d{"'"}identite</span>
                      <input value={form.idNumber} onChange={(e) => update('idNumber', e.target.value)} className={`${inputClass} font-mono`} />
                    </label>
                  </div>
                </div>

                <div className={sectionCardClass}>
                  <h2 className={sectionTitleClass}>Situation familiale</h2>
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                    <label className="block">
                      <span className={labelClass}>Statut matrimonial</span>
                      <select value={form.maritalStatus} onChange={(e) => update('maritalStatus', e.target.value)} className={inputClass}>
                        <option value={MaritalStatus.SINGLE}>Celibataire</option>
                        <option value={MaritalStatus.MARRIED}>Marie(e)</option>
                        <option value={MaritalStatus.DIVORCED}>Divorce(e)</option>
                        <option value={MaritalStatus.WIDOWED}>Veuf/Veuve</option>
                      </select>
                    </label>
                    <label className="block">
                      <span className={labelClass}>Enfants a charge</span>
                      <input
                        type="number"
                        min={0}
                        value={form.childrenCount}
                        onChange={(e) => update('childrenCount', Number(e.target.value))}
                        className={inputClass}
                      />
                    </label>
                  </div>
                </div>

                <div className={sectionCardClass}>
                  <h2 className={sectionTitleClass}>Coordonnees</h2>
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                    <label className="block">
                      <span className={labelClass}>Telephone</span>
                      <input
                        value={form.phone}
                        onChange={(e) => update('phone', e.target.value)}
                        className={inputClass}
                        placeholder="+242 06 ..."
                      />
                    </label>
                    <label className="block">
                      <span className={labelClass}>Email</span>
                      <input
                        type="email"
                        value={form.email}
                        onChange={(e) => update('email', e.target.value)}
                        className={inputClass}
                        placeholder="prenom@entreprise.com"
                      />
                    </label>
                    <label className="block">
                      <span className={labelClass}>Ville</span>
                      <input value={form.city} onChange={(e) => update('city', e.target.value)} className={inputClass} placeholder="Brazzaville" />
                    </label>
                    <label className="block sm:col-span-3">
                      <span className={labelClass}>Adresse</span>
                      <input value={form.address} onChange={(e) => update('address', e.target.value)} className={inputClass} />
                    </label>
                  </div>
                </div>

                <div className={sectionCardClass}>
                  <h2 className={sectionTitleClass}>Contact d{"'"}urgence</h2>
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <label className="block">
                      <span className={labelClass}>Nom du contact</span>
                      <input value={form.emergencyContact} onChange={(e) => update('emergencyContact', e.target.value)} className={inputClass} />
                    </label>
                    <label className="block">
                      <span className={labelClass}>Telephone d{"'"}urgence</span>
                      <input value={form.emergencyPhone} onChange={(e) => update('emergencyPhone', e.target.value)} className={inputClass} />
                    </label>
                  </div>
                </div>
              </div>
            )}

            {/* ===== PAIE ===== */}
            {activeTab === 'paie' && (
              <div className="space-y-5">
                <div className={sectionCardClass}>
                  <h2 className={sectionTitleClass}>Remuneration</h2>
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <label className="block">
                      <span className={labelClass}>Salaire de base (FCFA) *</span>
                      <input
                        required
                        type="number"
                        min={0}
                        value={form.baseSalary}
                        onChange={(e) => update('baseSalary', Number(e.target.value))}
                        className={`${inputClass} font-mono`}
                      />
                    </label>
                    <label className="block">
                      <span className={labelClass}>Sursalaire (FCFA)</span>
                      <input
                        type="number"
                        min={0}
                        value={form.sursalaire}
                        onChange={(e) => update('sursalaire', Number(e.target.value))}
                        className={`${inputClass} font-mono`}
                      />
                    </label>
                    <label className="block">
                      <span className={labelClass}>Mode de paiement</span>
                      <select value={form.paymentMode} onChange={(e) => update('paymentMode', e.target.value)} className={inputClass}>
                        <option value="VIREMENT">Virement bancaire</option>
                        <option value="CHEQUE">Cheque</option>
                        <option value="ESPECES">Especes</option>
                        <option value="MOBILE">Mobile Money</option>
                      </select>
                    </label>
                  </div>
                </div>

                <div className={sectionCardClass}>
                  <h2 className={sectionTitleClass}>Coordonnees bancaires</h2>
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                    <label className="block">
                      <span className={labelClass}>Banque</span>
                      <input value={form.bankName} onChange={(e) => update('bankName', e.target.value)} className={inputClass} placeholder="LCB" />
                    </label>
                    <label className="block">
                      <span className={labelClass}>Code banque</span>
                      <input
                        value={form.bankCode}
                        onChange={(e) => update('bankCode', e.target.value)}
                        className={`${inputClass} font-mono`}
                        placeholder="10001"
                      />
                    </label>
                    <label className="block">
                      <span className={labelClass}>Code agence</span>
                      <input
                        value={form.branchCode}
                        onChange={(e) => update('branchCode', e.target.value)}
                        className={`${inputClass} font-mono`}
                        placeholder="00100"
                      />
                    </label>
                    <label className="block sm:col-span-2">
                      <span className={labelClass}>N compte</span>
                      <input
                        value={form.accountNumber}
                        onChange={(e) => update('accountNumber', e.target.value)}
                        className={`${inputClass} font-mono`}
                        placeholder="0012345678"
                      />
                    </label>
                    <label className="block">
                      <span className={labelClass}>Cle RIB</span>
                      <input
                        value={form.ribKey}
                        onChange={(e) => update('ribKey', e.target.value)}
                        className={`${inputClass} font-mono`}
                        placeholder="42"
                      />
                    </label>
                  </div>
                </div>
              </div>
            )}

            {/* ===== AJUSTEMENTS DE SALAIRE ===== */}
            {activeTab === 'ajustements' && (
              <div className="space-y-5">
                <div className={sectionCardClass}>
                  <div className="mb-4 flex items-center justify-between">
                    <h2 className={`${sectionTitleClass} mb-0`}>Historique des ajustements</h2>
                    <button
                      type="button"
                      onClick={addAdjustment}
                      className="inline-flex items-center gap-1.5 rounded-xs bg-accent px-3 py-1.5 text-xs font-medium text-white hover:bg-accent/90"
                    >
                      <Plus className="h-3.5 w-3.5" />
                      Ajouter
                    </button>
                  </div>

                  {form.adjustments.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-10 text-center">
                      <SlidersHorizontal className="mb-2 h-8 w-8 text-muted-foreground/30" />
                      <p className="text-sm text-muted-foreground">Aucun ajustement de salaire enregistre.</p>
                      <p className="mt-0.5 text-xs text-muted-foreground/70">
                        Cliquez sur Ajouter pour creer un ajustement.
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {form.adjustments.map((adj) => (
                        <div key={adj.id} className="flex items-start gap-3 rounded-xs border bg-background p-3">
                          <div className="grid flex-1 grid-cols-1 gap-3 sm:grid-cols-4">
                            <label className="block">
                              <span className={labelClass}>Type</span>
                              <select
                                value={adj.type}
                                onChange={(e) => updateAdjustment(adj.id, 'type', e.target.value)}
                                className={inputClass}
                              >
                                <option value="augmentation">Augmentation</option>
                                <option value="reduction">Reduction</option>
                              </select>
                            </label>
                            <label className="block">
                              <span className={labelClass}>Motif</span>
                              <input
                                value={adj.label}
                                onChange={(e) => updateAdjustment(adj.id, 'label', e.target.value)}
                                className={inputClass}
                                placeholder="Promotion, revision..."
                              />
                            </label>
                            <label className="block">
                              <span className={labelClass}>Montant (FCFA)</span>
                              <input
                                type="number"
                                value={adj.amount}
                                onChange={(e) => updateAdjustment(adj.id, 'amount', Number(e.target.value))}
                                className={`${inputClass} font-mono`}
                              />
                            </label>
                            <label className="block">
                              <span className={labelClass}>Date d{"'"}effet</span>
                              <input
                                type="date"
                                value={adj.date}
                                onChange={(e) => updateAdjustment(adj.id, 'date', e.target.value)}
                                className={inputClass}
                              />
                            </label>
                          </div>
                          <button
                            type="button"
                            onClick={() => removeAdjustment(adj.id)}
                            className="mt-6 rounded-xs p-1.5 text-muted-foreground hover:bg-red-50 hover:text-red-600"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* ===== PARAMETRES ===== */}
            {activeTab === 'parametres' && (
              <div className="space-y-5">
                {/* Schedule mode selector */}
                <div className={sectionCardClass}>
                  <h2 className={sectionTitleClass}>Mode de suivi du temps</h2>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setScheduleMode(WorkTrackingMode.DAYS)}
                      className={`rounded-xs px-4 py-2 text-sm font-medium transition-colors ${
                        scheduleMode === WorkTrackingMode.DAYS
                          ? 'bg-accent text-white'
                          : 'border bg-background text-muted-foreground hover:bg-muted'
                      }`}
                    >
                      <Clock className="mr-1.5 inline h-3.5 w-3.5" />
                      Par jour
                    </button>
                    <button
                      type="button"
                      onClick={() => setScheduleMode(WorkTrackingMode.HOURS)}
                      className={`rounded-xs px-4 py-2 text-sm font-medium transition-colors ${
                        scheduleMode === WorkTrackingMode.HOURS
                          ? 'bg-accent text-white'
                          : 'border bg-background text-muted-foreground hover:bg-muted'
                      }`}
                    >
                      <Clock className="mr-1.5 inline h-3.5 w-3.5" />
                      Par heure
                    </button>
                  </div>
                </div>

                {/* Schedule grid */}
                <div className={sectionCardClass}>
                  <h2 className={sectionTitleClass}>Horaires de travail</h2>
                  <div className="space-y-2">
                    {DAYS_OF_WEEK.map((day) => {
                      const s = form.schedule[day.key];
                      return (
                        <div key={day.key} className="flex items-center gap-3 rounded-xs bg-background px-3 py-2.5">
                          <label className="flex w-28 items-center gap-2">
                            <input
                              type="checkbox"
                              checked={s.active}
                              onChange={(e) => updateSchedule(day.key, 'active', e.target.checked)}
                              className="h-4 w-4 rounded-xs border-border accent-accent"
                            />
                            <span className={`text-sm ${s.active ? 'font-medium text-foreground' : 'text-muted-foreground'}`}>{day.label}</span>
                          </label>

                          {s.active ? (
                            scheduleMode === WorkTrackingMode.HOURS ? (
                              <div className="flex items-center gap-2">
                                <input
                                  type="time"
                                  value={s.start}
                                  onChange={(e) => updateSchedule(day.key, 'start', e.target.value)}
                                  className={`${inputClass} w-32`}
                                />
                                <span className="text-xs text-muted-foreground">a</span>
                                <input
                                  type="time"
                                  value={s.end}
                                  onChange={(e) => updateSchedule(day.key, 'end', e.target.value)}
                                  className={`${inputClass} w-32`}
                                />
                              </div>
                            ) : (
                              <div className="flex items-center gap-2">
                                <input
                                  type="number"
                                  min={0}
                                  max={24}
                                  value={s.hours}
                                  onChange={(e) => updateSchedule(day.key, 'hours', Number(e.target.value))}
                                  className={`${inputClass} w-20 font-mono`}
                                />
                                <span className="text-xs text-muted-foreground">heures</span>
                              </div>
                            )
                          ) : (
                            <span className="text-xs text-muted-foreground/50">Repos</span>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Options */}
                <div className={sectionCardClass}>
                  <h2 className={sectionTitleClass}>Options</h2>
                  <div className="space-y-3">
                    <label className="flex items-center gap-3 rounded-xs bg-background px-3 py-2.5">
                      <input
                        type="checkbox"
                        checked={form.overtimeEnabled}
                        onChange={(e) => update('overtimeEnabled', e.target.checked)}
                        className="h-4 w-4 rounded-xs border-border accent-accent"
                      />
                      <div>
                        <span className="text-sm font-medium text-foreground">Heures supplementaires</span>
                        <p className="text-xs text-muted-foreground">Autoriser le calcul des heures supplementaires</p>
                      </div>
                    </label>
                    <label className="flex items-center gap-3 rounded-xs bg-background px-3 py-2.5">
                      <input
                        type="checkbox"
                        checked={form.remoteWorkEnabled}
                        onChange={(e) => update('remoteWorkEnabled', e.target.checked)}
                        className="h-4 w-4 rounded-xs border-border accent-accent"
                      />
                      <div>
                        <span className="text-sm font-medium text-foreground">Teletravail</span>
                        <p className="text-xs text-muted-foreground">Autoriser le travail a distance</p>
                      </div>
                    </label>
                    <label className="block px-3 py-2">
                      <span className={labelClass}>Norme mensuelle (jours)</span>
                      <input
                        type="number"
                        min={1}
                        max={31}
                        value={form.monthlyWorkNorm}
                        onChange={(e) => update('monthlyWorkNorm', Number(e.target.value))}
                        className={`${inputClass} w-24 font-mono`}
                      />
                    </label>
                  </div>
                </div>
              </div>
            )}
          </form>
        </div>

        {/* Right panel */}
        <div className="flex w-72 shrink-0 flex-col border-l bg-card">
          {/* Right tabs */}
          <div className="flex shrink-0 border-b">
            {RIGHT_TABS.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeRightTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveRightTab(tab.id)}
                  className={`flex flex-1 items-center justify-center gap-1.5 py-2.5 text-xs font-medium transition-colors ${
                    isActive ? 'border-b-2 border-accent text-accent' : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  <Icon className="h-3.5 w-3.5" />
                  {tab.label}
                </button>
              );
            })}
          </div>

          {/* Right content */}
          <div className="flex-1 overflow-y-auto p-4">
            {activeRightTab === 'historique' && (
              <div className="space-y-3">
                <p className="text-xs font-medium uppercase tracking-widest text-muted-foreground">Historique de changements</p>
                <div className="flex flex-col items-center justify-center py-8 text-center">
                  <History className="mb-2 h-6 w-6 text-muted-foreground/30" />
                  <p className="text-xs text-muted-foreground">Aucun historique disponible.</p>
                  <p className="mt-0.5 text-[10px] text-muted-foreground/60">
                    Les modifications seront tracees apres la creation.
                  </p>
                </div>
              </div>
            )}

            {activeRightTab === 'notes' && (
              <div className="space-y-3">
                <p className="text-xs font-medium uppercase tracking-widest text-muted-foreground">Notes internes</p>
                <div className="flex gap-2">
                  <input
                    value={newNote}
                    onChange={(e) => setNewNote(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && addNote()}
                    placeholder="Ajouter une note..."
                    className={`${inputClass} text-xs`}
                  />
                  <button
                    type="button"
                    onClick={addNote}
                    className="shrink-0 rounded-xs bg-accent px-2.5 py-2 text-white hover:bg-accent/90"
                  >
                    <Plus className="h-3.5 w-3.5" />
                  </button>
                </div>
                {notes.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-6 text-center">
                    <StickyNote className="mb-2 h-6 w-6 text-muted-foreground/30" />
                    <p className="text-xs text-muted-foreground">Aucune note.</p>
                  </div>
                ) : (
                  <div className="space-y-2">
                    {notes.map((note) => (
                      <div key={note.id} className="rounded-xs border bg-background p-2.5">
                        <p className="text-xs text-foreground">{note.text}</p>
                        <p className="mt-1 text-[10px] text-muted-foreground">
                          {new Intl.DateTimeFormat('fr-FR', {
                            day: '2-digit',
                            month: '2-digit',
                            year: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit',
                          }).format(new Date(note.date))}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {activeRightTab === 'activite' && (
              <div className="space-y-3">
                <p className="text-xs font-medium uppercase tracking-widest text-muted-foreground">Activite recente</p>
                <div className="flex flex-col items-center justify-center py-8 text-center">
                  <Activity className="mb-2 h-6 w-6 text-muted-foreground/30" />
                  <p className="text-xs text-muted-foreground">Aucune activite enregistree.</p>
                  <p className="mt-0.5 text-[10px] text-muted-foreground/60">
                    Connexions, actions et evenements apparaitront ici.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
