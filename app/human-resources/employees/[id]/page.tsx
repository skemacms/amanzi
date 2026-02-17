'use client';

import { use, useState } from 'react';
import Link from 'next/link';
import {
  ArrowLeft,
  Pencil,
  Briefcase,
  FileText,
  User,
  Wallet,
  SlidersHorizontal,
  Settings,
  History,
  StickyNote,
  Activity,
  ChevronRight,
  MapPin,
  Phone,
  Calendar,
  Clock,
  Plus,
} from 'lucide-react';
import { mockEmployees } from '@/features/human-resources/mock/data';
import { formatCurrency, formatDate } from '@/core/lib/utils';
import { ZONE_LABELS, MARITAL_STATUS_LABELS, WorkTrackingMode } from '@/core/types/enums';

const sectionCardClass = 'rounded-xs border bg-card p-5';
const sectionTitleClass = 'mb-4 text-[11px] font-semibold uppercase tracking-widest text-muted-foreground';
const dtClass = 'text-sm text-muted-foreground';
const ddClass = 'text-sm font-medium text-foreground';

const SIDEBAR_TABS = [
  { id: 'personnel', label: 'Personnel', icon: User },
  { id: 'cv', label: 'CV', icon: FileText },
  { id: 'travail', label: 'Travail', icon: Briefcase },
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

const mockHistory = [
  { id: '1', action: 'Salaire de base modifie', detail: '400 000 -> 450 000 FCFA', date: '2024-06-15T10:30:00Z', user: 'Admin' },
  { id: '2', action: 'Prime Transport ajoutee', detail: '30 000 FCFA', date: '2024-03-01T08:00:00Z', user: 'Admin' },
  { id: '3', action: 'Employe cree', detail: 'Creation de la fiche', date: '2020-02-01T09:00:00Z', user: 'Systeme' },
];

const mockNotes = [
  { id: '1', text: 'Excellent element, promotion prevue pour Q3 2025.', date: '2025-05-20T14:00:00Z', author: 'Admin' },
  { id: '2', text: 'Formation React avancee completee.', date: '2025-03-10T09:00:00Z', author: 'Admin' },
];

const mockActivity = [
  { id: '1', type: 'connexion', label: 'Connexion au portail', date: '2025-07-15T08:30:00Z' },
  { id: '2', type: 'document', label: 'Bulletin de paie telecharge (Mai 2025)', date: '2025-06-28T16:00:00Z' },
  { id: '3', type: 'conge', label: 'Demande de conge soumise', date: '2025-06-20T10:00:00Z' },
];

export default function EmployeeDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const employee = mockEmployees.find((e) => e.id === id);
  const [activeTab, setActiveTab] = useState<SidebarTab>('personnel');
  const [activeRightTab, setActiveRightTab] = useState<RightTab>('historique');
  const [newNote, setNewNote] = useState('');
  const [notes, setNotes] = useState(mockNotes);

  const addNote = () => {
    if (!newNote.trim()) return;
    setNotes((prev) => [{ id: Date.now().toString(), text: newNote.trim(), date: new Date().toISOString(), author: 'Admin' }, ...prev]);
    setNewNote('');
  };

  if (!employee) {
    return (
      <div className="flex h-full items-center justify-center p-8">
        <p className="text-muted-foreground">Employe introuvable.</p>
      </div>
    );
  }

  const schedule = [
    { day: 'Lundi', active: true, start: '08:00', end: '17:00' },
    { day: 'Mardi', active: true, start: '08:00', end: '17:00' },
    { day: 'Mercredi', active: true, start: '08:00', end: '17:00' },
    { day: 'Jeudi', active: true, start: '08:00', end: '17:00' },
    { day: 'Vendredi', active: true, start: '08:00', end: '16:00' },
    { day: 'Samedi', active: false, start: '', end: '' },
    { day: 'Dimanche', active: false, start: '', end: '' },
  ];

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
          <span className="text-sm font-semibold text-foreground">
            {employee.lastName} {employee.firstName}
          </span>
          <span className="rounded-xs bg-muted px-2 py-0.5 font-mono text-[10px] font-medium text-muted-foreground">
            {employee.employeeCode}
          </span>
        </div>
        <button className="inline-flex items-center gap-2 rounded-xs border bg-card px-3 py-2 text-sm font-medium text-foreground transition-colors hover:bg-muted">
          <Pencil className="h-4 w-4" />
          Modifier
        </button>
      </div>

      {/* Main layout */}
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
          {/* TRAVAIL */}
          {activeTab === 'travail' && (
            <div className="space-y-5">
              <div className={sectionCardClass}>
                <h2 className={sectionTitleClass}>Informations professionnelles</h2>
                <dl className="grid grid-cols-1 gap-x-8 gap-y-3 sm:grid-cols-2">
                  <div className="flex justify-between">
                    <dt className={dtClass}>Fonction</dt>
                    <dd className={ddClass}>{employee.functionTitle || '---'}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className={dtClass}>Date d{"'"}embauche</dt>
                    <dd className="flex items-center gap-1 text-sm font-medium text-foreground">
                      <Calendar className="h-3.5 w-3.5" />
                      {formatDate(employee.hireDate)}
                    </dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className={dtClass}>Zone</dt>
                    <dd className="flex items-center gap-1 text-sm font-medium text-foreground">
                      <MapPin className="h-3.5 w-3.5" />
                      {ZONE_LABELS[employee.zone]}
                    </dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className={dtClass}>Statut</dt>
                    <dd>
                      <span className={`rounded-xs px-2 py-0.5 text-xs font-medium ${employee.isActive ? 'bg-emerald-50 text-emerald-700' : 'bg-red-50 text-red-700'}`}>
                        {employee.isActive ? 'Actif' : 'Inactif'}
                      </span>
                    </dd>
                  </div>
                </dl>
              </div>

              <div className={sectionCardClass}>
                <h2 className={sectionTitleClass}>Classification</h2>
                <dl className="grid grid-cols-1 gap-x-8 gap-y-3 sm:grid-cols-2">
                  <div className="flex justify-between">
                    <dt className={dtClass}>Convention</dt>
                    <dd className={ddClass}>{employee.conventionCollective || '---'}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className={dtClass}>Categorie</dt>
                    <dd className={ddClass}>{employee.category || '---'}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className={dtClass}>Echelon</dt>
                    <dd className={ddClass}>{employee.echelon || '---'}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className={dtClass}>N CNSS</dt>
                    <dd className="font-mono text-sm font-medium text-foreground">{employee.cnssNumber || '---'}</dd>
                  </div>
                </dl>
              </div>
            </div>
          )}

          {/* CV */}
          {activeTab === 'cv' && (
            <div className="space-y-5">
              <div className={sectionCardClass}>
                <h2 className={sectionTitleClass}>Formation</h2>
                <p className="text-sm text-muted-foreground">Aucune information de formation enregistree.</p>
              </div>
              <div className={sectionCardClass}>
                <h2 className={sectionTitleClass}>Experience professionnelle</h2>
                <p className="text-sm text-muted-foreground">Aucune experience anterieure enregistree.</p>
              </div>
              <div className={sectionCardClass}>
                <h2 className={sectionTitleClass}>Competences</h2>
                <p className="text-sm text-muted-foreground">Aucune competence enregistree.</p>
              </div>
            </div>
          )}

          {/* PERSONNEL */}
          {activeTab === 'personnel' && (
            <div className="space-y-5">
              <div className={sectionCardClass}>
                <h2 className={sectionTitleClass}>Identite</h2>
                <dl className="grid grid-cols-1 gap-x-8 gap-y-3 sm:grid-cols-2">
                  <div className="flex justify-between">
                    <dt className={dtClass}>Nom complet</dt>
                    <dd className={ddClass}>{employee.lastName} {employee.firstName}</dd>
                  </div>
                  {employee.birthDate && (
                    <div className="flex justify-between">
                      <dt className={dtClass}>Date de naissance</dt>
                      <dd className={ddClass}>{formatDate(employee.birthDate)}</dd>
                    </div>
                  )}
                  {employee.birthPlace && (
                    <div className="flex justify-between">
                      <dt className={dtClass}>Lieu de naissance</dt>
                      <dd className={ddClass}>{employee.birthPlace}</dd>
                    </div>
                  )}
                </dl>
              </div>

              <div className={sectionCardClass}>
                <h2 className={sectionTitleClass}>Situation familiale</h2>
                <dl className="grid grid-cols-1 gap-x-8 gap-y-3 sm:grid-cols-2">
                  <div className="flex justify-between">
                    <dt className={dtClass}>Statut matrimonial</dt>
                    <dd className={ddClass}>{MARITAL_STATUS_LABELS[employee.maritalStatus]}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className={dtClass}>Enfants a charge</dt>
                    <dd className={ddClass}>{employee.childrenCount}</dd>
                  </div>
                </dl>
              </div>

              <div className={sectionCardClass}>
                <h2 className={sectionTitleClass}>Coordonnees</h2>
                <dl className="grid grid-cols-1 gap-x-8 gap-y-3 sm:grid-cols-2">
                  {employee.phone && (
                    <div className="flex justify-between">
                      <dt className={dtClass}>Telephone</dt>
                      <dd className="flex items-center gap-1 text-sm font-medium text-foreground">
                        <Phone className="h-3.5 w-3.5" />
                        {employee.phone}
                      </dd>
                    </div>
                  )}
                </dl>
              </div>
            </div>
          )}

          {/* PAIE */}
          {activeTab === 'paie' && (
            <div className="space-y-5">
              <div className={sectionCardClass}>
                <h2 className={sectionTitleClass}>Remuneration</h2>
                <dl className="grid grid-cols-1 gap-x-8 gap-y-3 sm:grid-cols-2">
                  <div className="flex justify-between">
                    <dt className={dtClass}>Salaire de base</dt>
                    <dd className="font-mono text-sm font-bold text-foreground">{formatCurrency(employee.baseSalary)}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className={dtClass}>Sursalaire</dt>
                    <dd className="font-mono text-sm font-medium text-foreground">{formatCurrency(employee.sursalaire)}</dd>
                  </div>
                </dl>
              </div>

              {/* Primes */}
              <div className={sectionCardClass}>
                <h2 className={sectionTitleClass}>Primes assignees</h2>
                {employee.employeePrimes && employee.employeePrimes.length > 0 ? (
                  <div className="space-y-2">
                    {employee.employeePrimes.map((ep) => (
                      <div key={ep.id} className="flex items-center justify-between rounded-xs bg-background px-3 py-2 text-sm">
                        <div className="flex items-center gap-2">
                          <span className="font-medium text-foreground">{ep.primeDefinition?.name ?? ep.primeDefinitionId}</span>
                          {ep.primeDefinition && (
                            <span className={`rounded-xs px-2 py-0.5 text-[10px] font-medium ${ep.primeDefinition.isTaxable ? 'bg-amber-50 text-amber-700' : 'bg-teal-50 text-teal-700'}`}>
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

              {/* Bank */}
              {employee.bankName && (
                <div className={sectionCardClass}>
                  <h2 className={sectionTitleClass}>Coordonnees bancaires</h2>
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
          )}

          {/* AJUSTEMENTS */}
          {activeTab === 'ajustements' && (
            <div className="space-y-5">
              <div className={sectionCardClass}>
                <h2 className={sectionTitleClass}>Historique des ajustements</h2>
                <div className="flex flex-col items-center justify-center py-10 text-center">
                  <SlidersHorizontal className="mb-2 h-8 w-8 text-muted-foreground/30" />
                  <p className="text-sm text-muted-foreground">Aucun ajustement de salaire enregistre.</p>
                </div>
              </div>
            </div>
          )}

          {/* PARAMETRES */}
          {activeTab === 'parametres' && (
            <div className="space-y-5">
              <div className={sectionCardClass}>
                <h2 className={sectionTitleClass}>Horaires de travail</h2>
                <div className="space-y-2">
                  {schedule.map((s) => (
                    <div key={s.day} className="flex items-center gap-3 rounded-xs bg-background px-3 py-2.5">
                      <span className={`w-28 text-sm ${s.active ? 'font-medium text-foreground' : 'text-muted-foreground'}`}>
                        {s.day}
                      </span>
                      {s.active ? (
                        <div className="flex items-center gap-2 text-sm text-foreground">
                          <Clock className="h-3.5 w-3.5 text-muted-foreground" />
                          <span className="font-mono">{s.start}</span>
                          <span className="text-xs text-muted-foreground">a</span>
                          <span className="font-mono">{s.end}</span>
                        </div>
                      ) : (
                        <span className="text-xs text-muted-foreground/50">Repos</span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Right panel */}
        <div className="flex w-72 shrink-0 flex-col border-l bg-card">
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

          <div className="flex-1 overflow-y-auto p-4">
            {/* Historique */}
            {activeRightTab === 'historique' && (
              <div className="space-y-3">
                <p className="text-xs font-medium uppercase tracking-widest text-muted-foreground">Historique de changements</p>
                <div className="space-y-2">
                  {mockHistory.map((h) => (
                    <div key={h.id} className="rounded-xs border bg-background p-2.5">
                      <p className="text-xs font-medium text-foreground">{h.action}</p>
                      <p className="mt-0.5 font-mono text-[10px] text-muted-foreground">{h.detail}</p>
                      <div className="mt-1 flex items-center justify-between">
                        <span className="text-[10px] text-muted-foreground/60">
                          {new Intl.DateTimeFormat('fr-FR', { day: '2-digit', month: '2-digit', year: 'numeric' }).format(new Date(h.date))}
                        </span>
                        <span className="text-[10px] text-muted-foreground/60">{h.user}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Notes */}
            {activeRightTab === 'notes' && (
              <div className="space-y-3">
                <p className="text-xs font-medium uppercase tracking-widest text-muted-foreground">Notes internes</p>
                <div className="flex gap-2">
                  <input
                    value={newNote}
                    onChange={(e) => setNewNote(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && addNote()}
                    placeholder="Ajouter une note..."
                    className="w-full rounded-xs border bg-background px-3 py-2 text-xs outline-none transition-colors focus:border-accent focus:ring-1 focus:ring-accent/30"
                  />
                  <button
                    type="button"
                    onClick={addNote}
                    className="shrink-0 rounded-xs bg-accent px-2.5 py-2 text-white hover:bg-accent/90"
                  >
                    <Plus className="h-3.5 w-3.5" />
                  </button>
                </div>
                <div className="space-y-2">
                  {notes.map((note) => (
                    <div key={note.id} className="rounded-xs border bg-background p-2.5">
                      <p className="text-xs text-foreground">{note.text}</p>
                      <div className="mt-1 flex items-center justify-between">
                        <span className="text-[10px] text-muted-foreground/60">
                          {new Intl.DateTimeFormat('fr-FR', { day: '2-digit', month: '2-digit', year: 'numeric' }).format(new Date(note.date))}
                        </span>
                        <span className="text-[10px] text-muted-foreground/60">{note.author}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Activite */}
            {activeRightTab === 'activite' && (
              <div className="space-y-3">
                <p className="text-xs font-medium uppercase tracking-widest text-muted-foreground">Activite recente</p>
                <div className="space-y-2">
                  {mockActivity.map((a) => (
                    <div key={a.id} className="rounded-xs border bg-background p-2.5">
                      <p className="text-xs font-medium text-foreground">{a.label}</p>
                      <p className="mt-1 text-[10px] text-muted-foreground/60">
                        {new Intl.DateTimeFormat('fr-FR', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' }).format(new Date(a.date))}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
