'use client';

import { useState } from 'react';
import { Plus, Pencil, Trash2, Check, X, MapPin, Briefcase, Building2, Clock, Award, GraduationCap } from 'lucide-react';
import { useToast } from '@/core/stores/toast-store';

/* ───── Config section types ───── */
interface ConfigItem {
  id: string;
  name: string;
  description?: string;
  isActive: boolean;
}

interface WorkSchedule extends ConfigItem {
  type: 'day' | 'hour';
  hoursPerWeek?: number;
  daysPerWeek?: number;
  details: string;
}

/* ───── Mock data ───── */
const mockPostes: ConfigItem[] = [
  { id: 'p1', name: 'Developpeur Senior', description: 'Developpement logiciel, architecture', isActive: true },
  { id: 'p2', name: 'Comptable', description: 'Tenue des comptes, rapprochements', isActive: true },
  { id: 'p3', name: 'Directeur Commercial', description: 'Strategie commerciale, ventes', isActive: true },
  { id: 'p4', name: 'Stagiaire Developpeur', description: 'Assistance technique, apprentissage', isActive: true },
  { id: 'p5', name: 'Responsable RH', description: 'Gestion du personnel, recrutement', isActive: false },
];

const mockSites: ConfigItem[] = [
  { id: 's1', name: 'Siege - Brazzaville', description: '12, Avenue de la Paix', isActive: true },
  { id: 's2', name: 'Agence Pointe-Noire', description: '45, Rue du Port', isActive: true },
  { id: 's3', name: 'Bureau Dolisie', description: '8, Boulevard Central', isActive: false },
];

const mockDepartements: ConfigItem[] = [
  { id: 'd1', name: 'Technologie', description: 'Developpement et IT', isActive: true },
  { id: 'd2', name: 'Finance', description: 'Comptabilite et gestion financiere', isActive: true },
  { id: 'd3', name: 'Commercial', description: 'Ventes et marketing', isActive: true },
  { id: 'd4', name: 'Ressources Humaines', description: 'Personnel et administration', isActive: false },
];

const mockHoraires: WorkSchedule[] = [
  { id: 'h1', name: 'Standard Bureau', type: 'day', daysPerWeek: 5, hoursPerWeek: 40, details: 'Lun-Ven, 08h00-17h00 (1h pause)', isActive: true },
  { id: 'h2', name: 'Mi-temps', type: 'hour', hoursPerWeek: 20, details: 'Lun-Ven, 08h00-12h00', isActive: true },
  { id: 'h3', name: 'Terrain', type: 'day', daysPerWeek: 6, hoursPerWeek: 48, details: 'Lun-Sam, 07h30-16h30 (1h pause)', isActive: true },
];

const mockCompetences: ConfigItem[] = [
  { id: 'c1', name: 'Programmation', description: 'JavaScript, Python, SQL', isActive: true },
  { id: 'c2', name: 'Gestion de projet', description: 'Methodologies agile, planification', isActive: true },
  { id: 'c3', name: 'Comptabilite OHADA', description: 'Normes comptables OHADA', isActive: true },
  { id: 'c4', name: 'Negociation commerciale', description: 'Techniques de vente B2B', isActive: true },
];

const mockDiplomes: ConfigItem[] = [
  { id: 'dip1', name: 'Licence Informatique', description: 'BAC+3 en sciences informatiques', isActive: true },
  { id: 'dip2', name: 'Master Gestion', description: 'BAC+5 en gestion/finance', isActive: true },
  { id: 'dip3', name: 'BTS Comptabilite', description: 'BAC+2 en comptabilite', isActive: true },
  { id: 'dip4', name: 'MBA', description: 'Master of Business Administration', isActive: true },
];

/* ───── Config section tabs ───── */
const CONFIG_SECTIONS = [
  { id: 'postes', label: 'Postes', icon: Briefcase },
  { id: 'sites', label: 'Lieux de travail', icon: MapPin },
  { id: 'departements', label: 'Departements', icon: Building2 },
  { id: 'horaires', label: 'Horaires de travail', icon: Clock },
  { id: 'competences', label: 'Types de competences', icon: Award },
  { id: 'diplomes', label: 'Diplomes', icon: GraduationCap },
] as const;

type SectionId = (typeof CONFIG_SECTIONS)[number]['id'];

/* ───── Reusable config list component ───── */
function ConfigList({
  items,
  onToggle,
}: {
  items: ConfigItem[];
  onToggle: (id: string) => void;
}) {
  return (
    <div className="rounded-xs border bg-card">
      {items.map((item, i) => (
        <div
          key={item.id}
          className={`flex items-center gap-4 px-5 py-3.5 ${
            i < items.length - 1 ? 'border-b' : ''
          } ${!item.isActive ? 'opacity-50' : ''}`}
        >
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <h4 className="text-sm font-medium text-foreground">{item.name}</h4>
              {item.isActive ? (
                <span className="inline-flex items-center gap-0.5 rounded-xs bg-emerald-50 px-1.5 py-0.5 text-[10px] font-semibold text-emerald-700">
                  <Check className="h-2.5 w-2.5" /> Actif
                </span>
              ) : (
                <span className="inline-flex items-center gap-0.5 rounded-xs bg-muted px-1.5 py-0.5 text-[10px] font-semibold text-muted-foreground">
                  <X className="h-2.5 w-2.5" /> Inactif
                </span>
              )}
            </div>
            {item.description && (
              <p className="mt-0.5 text-xs text-muted-foreground">{item.description}</p>
            )}
          </div>
          <div className="flex items-center gap-1">
            <button className="rounded-xs p-1.5 text-muted-foreground hover:bg-muted hover:text-foreground" title="Modifier">
              <Pencil className="h-3.5 w-3.5" />
            </button>
            <button
              onClick={() => onToggle(item.id)}
              className="rounded-xs p-1.5 text-muted-foreground hover:bg-muted hover:text-foreground"
              title={item.isActive ? 'Desactiver' : 'Activer'}
            >
              {item.isActive ? <X className="h-3.5 w-3.5" /> : <Check className="h-3.5 w-3.5" />}
            </button>
            <button className="rounded-xs p-1.5 text-muted-foreground hover:bg-red-50 hover:text-red-600" title="Supprimer">
              <Trash2 className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

/* ───── Work schedule list ───── */
function ScheduleList({
  items,
  onToggle,
}: {
  items: WorkSchedule[];
  onToggle: (id: string) => void;
}) {
  return (
    <div className="rounded-xs border bg-card">
      {items.map((item, i) => (
        <div
          key={item.id}
          className={`flex items-center gap-4 px-5 py-3.5 ${
            i < items.length - 1 ? 'border-b' : ''
          } ${!item.isActive ? 'opacity-50' : ''}`}
        >
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <h4 className="text-sm font-medium text-foreground">{item.name}</h4>
              <span className="rounded-xs bg-accent/10 px-1.5 py-0.5 text-[10px] font-mono font-semibold text-accent">
                {item.type === 'day' ? 'Par jour' : 'Par heure'}
              </span>
              {item.isActive ? (
                <span className="inline-flex items-center gap-0.5 rounded-xs bg-emerald-50 px-1.5 py-0.5 text-[10px] font-semibold text-emerald-700">
                  <Check className="h-2.5 w-2.5" /> Actif
                </span>
              ) : (
                <span className="inline-flex items-center gap-0.5 rounded-xs bg-muted px-1.5 py-0.5 text-[10px] font-semibold text-muted-foreground">
                  <X className="h-2.5 w-2.5" /> Inactif
                </span>
              )}
            </div>
            <div className="mt-1 flex items-center gap-4 text-xs text-muted-foreground">
              <span>{item.details}</span>
              {item.hoursPerWeek && <span className="font-mono">{item.hoursPerWeek}h/sem</span>}
              {item.daysPerWeek && <span className="font-mono">{item.daysPerWeek}j/sem</span>}
            </div>
          </div>
          <div className="flex items-center gap-1">
            <button className="rounded-xs p-1.5 text-muted-foreground hover:bg-muted hover:text-foreground" title="Modifier">
              <Pencil className="h-3.5 w-3.5" />
            </button>
            <button
              onClick={() => onToggle(item.id)}
              className="rounded-xs p-1.5 text-muted-foreground hover:bg-muted hover:text-foreground"
              title={item.isActive ? 'Desactiver' : 'Activer'}
            >
              {item.isActive ? <X className="h-3.5 w-3.5" /> : <Check className="h-3.5 w-3.5" />}
            </button>
            <button className="rounded-xs p-1.5 text-muted-foreground hover:bg-red-50 hover:text-red-600" title="Supprimer">
              <Trash2 className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

/* ───── Main Page ───── */
export default function HrConfigPage() {
  const [activeSection, setActiveSection] = useState<SectionId>('postes');
  const { addToast } = useToast();

  const [postes, setPostes] = useState(mockPostes);
  const [sites, setSites] = useState(mockSites);
  const [departements, setDepartements] = useState(mockDepartements);
  const [horaires, setHoraires] = useState(mockHoraires);
  const [competences, setCompetences] = useState(mockCompetences);
  const [diplomes, setDiplomes] = useState(mockDiplomes);

  const toggle = <T extends ConfigItem>(setter: React.Dispatch<React.SetStateAction<T[]>>) =>
    (id: string) => {
      setter((prev) =>
        prev.map((item) =>
          item.id === id ? { ...item, isActive: !item.isActive } : item
        )
      );
      addToast({ title: 'Statut mis a jour', variant: 'success' });
    };

  const sectionMeta: Record<SectionId, { title: string; desc: string; count: number }> = {
    postes: { title: 'Postes', desc: 'Fonctions et intitules de poste dans l\'entreprise', count: postes.length },
    sites: { title: 'Lieux de travail', desc: 'Sites et agences de l\'entreprise', count: sites.length },
    departements: { title: 'Departements', desc: 'Organisation interne par service', count: departements.length },
    horaires: { title: 'Horaires de travail', desc: 'Modeles d\'horaires par jour ou par heure', count: horaires.length },
    competences: { title: 'Types de competences', desc: 'Competences liees aux postes', count: competences.length },
    diplomes: { title: 'Diplomes', desc: 'Niveaux de diplomes reconnus', count: diplomes.length },
  };

  const meta = sectionMeta[activeSection];

  return (
    <div className="px-6 py-6">
      <div className="mb-5">
        <h1 className="text-xl font-bold text-foreground">Configuration RH</h1>
        <p className="mt-0.5 text-sm text-muted-foreground">
          Postes, lieux de travail, departements, horaires, competences et diplomes
        </p>
      </div>

      <div className="flex gap-6">
        {/* Left: section tabs */}
        <div className="hidden w-52 shrink-0 md:block">
          <nav className="flex flex-col gap-0.5">
            {CONFIG_SECTIONS.map((section) => {
              const Icon = section.icon;
              const isActive = activeSection === section.id;
              const count = sectionMeta[section.id].count;
              return (
                <button
                  key={section.id}
                  onClick={() => setActiveSection(section.id)}
                  className={`flex items-center justify-between gap-2 rounded-xs px-3 py-2 text-left text-sm transition-colors ${
                    isActive
                      ? 'bg-accent/10 font-medium text-accent'
                      : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <Icon className="h-4 w-4" />
                    {section.label}
                  </div>
                  <span className={`font-mono text-[10px] font-semibold ${isActive ? 'text-accent' : 'text-muted-foreground'}`}>
                    {count}
                  </span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Right: content */}
        <div className="flex-1">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h2 className="text-base font-semibold text-foreground">{meta.title}</h2>
              <p className="text-xs text-muted-foreground">{meta.desc}</p>
            </div>
            <button className="inline-flex items-center gap-2 rounded-xs bg-accent px-3 py-2 text-xs font-medium text-white hover:bg-accent/90">
              <Plus className="h-3.5 w-3.5" />
              Ajouter
            </button>
          </div>

          {activeSection === 'postes' && <ConfigList items={postes} onToggle={toggle(setPostes)} />}
          {activeSection === 'sites' && <ConfigList items={sites} onToggle={toggle(setSites)} />}
          {activeSection === 'departements' && <ConfigList items={departements} onToggle={toggle(setDepartements)} />}
          {activeSection === 'horaires' && <ScheduleList items={horaires} onToggle={toggle(setHoraires)} />}
          {activeSection === 'competences' && <ConfigList items={competences} onToggle={toggle(setCompetences)} />}
          {activeSection === 'diplomes' && <ConfigList items={diplomes} onToggle={toggle(setDiplomes)} />}
        </div>
      </div>
    </div>
  );
}
