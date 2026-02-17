'use client';

import { useState } from 'react';
import {
  Users, CalendarDays, FileText, Award, TrendingUp, TrendingDown,
  ArrowUpRight, DollarSign, Clock, UserCheck, UserMinus, Briefcase, Activity,
} from 'lucide-react';
import Link from 'next/link';
import {
  AreaChart, Area, BarChart, Bar, LineChart, Line, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend,
} from 'recharts';

// -- Mock dashboard data --

const kpiCards = [
  { label: 'Employes actifs', value: '4', change: '+1', trend: 'up' as const, icon: Users, href: '/human-resources/employees', color: 'text-teal-600 bg-teal-50', sparkData: [3,3,3,3,4,4,4] },
  { label: 'Masse salariale', value: '1.6M', change: '+8.2%', trend: 'up' as const, icon: DollarSign, href: '/human-resources/payroll', color: 'text-emerald-600 bg-emerald-50', sparkData: [1.1,1.2,1.3,1.35,1.4,1.5,1.6] },
  { label: 'Cout moyen / employe', value: '400K', change: '-2.1%', trend: 'down' as const, icon: TrendingDown, href: '/human-resources/payslips', color: 'text-sky-600 bg-sky-50', sparkData: [420,415,410,408,405,402,400] },
  { label: 'Taux de presence', value: '95.5%', change: '+1.3%', trend: 'up' as const, icon: UserCheck, href: '/human-resources/payroll', color: 'text-indigo-600 bg-indigo-50', sparkData: [91,92,93,94,94.5,95,95.5] },
  { label: 'Primes versees', value: '125K', change: '+15K', trend: 'up' as const, icon: Award, href: '/human-resources/bonuses', color: 'text-amber-600 bg-amber-50', sparkData: [80,85,90,95,100,110,125] },
];

const payrollEvolution = [
  { month: 'Jan', brut: 1150, net: 980, charges: 170 },
  { month: 'Fev', brut: 1150, net: 980, charges: 170 },
  { month: 'Mar', brut: 1200, net: 1020, charges: 180 },
  { month: 'Avr', brut: 1250, net: 1060, charges: 190 },
  { month: 'Mai', brut: 1350, net: 1140, charges: 210 },
  { month: 'Jun', brut: 1600, net: 1340, charges: 260 },
  { month: 'Jul', brut: 1600, net: 1340, charges: 260 },
];

const salaryDistribution = [
  { range: '100-200K', count: 1, fill: '#94a3b8' },
  { range: '200-350K', count: 1, fill: '#64748b' },
  { range: '350-500K', count: 1, fill: '#475569' },
  { range: '500K+', count: 1, fill: '#1e293b' },
];

const departmentBreakdown = [
  { name: 'Tech', value: 2, color: '#017e84' },
  { name: 'Finance', value: 1, color: '#714B67' },
  { name: 'Commercial', value: 1, color: '#1e293b' },
];

const headcountTrend = [
  { month: 'Jan', actifs: 3, departs: 0, arrivees: 0 },
  { month: 'Fev', actifs: 3, departs: 0, arrivees: 0 },
  { month: 'Mar', actifs: 3, departs: 0, arrivees: 0 },
  { month: 'Avr', actifs: 3, departs: 0, arrivees: 0 },
  { month: 'Mai', actifs: 3, departs: 0, arrivees: 0 },
  { month: 'Jun', actifs: 4, departs: 0, arrivees: 1 },
  { month: 'Jul', actifs: 4, departs: 0, arrivees: 0 },
];

const costBreakdown = [
  { label: 'Salaires de base', value: 1_600_000, pct: 68.2 },
  { label: 'Sursalaires', value: 150_000, pct: 6.4 },
  { label: 'Primes imposables', value: 20_000, pct: 0.9 },
  { label: 'Primes non-imp.', value: 55_000, pct: 2.3 },
  { label: 'CNSS employeur', value: 155_000, pct: 6.6 },
  { label: 'ITS retenu', value: 26_950, pct: 1.1 },
  { label: 'Autres charges', value: 338_050, pct: 14.4 },
];

const recentActivity = [
  { text: 'Cedric Banzouzi a ete embauche', time: 'Il y a 2 mois', icon: UserCheck },
  { text: 'Paie de mai 2025 validee', time: 'Il y a 1 mois', icon: FileText },
  { text: 'Paie de juin 2025 calculee', time: 'Il y a 3 jours', icon: CalendarDays },
  { text: 'Absence de Marie-Claire (2j)', time: 'Il y a 5 jours', icon: UserMinus },
  { text: 'Prime transport ajoutee pour M-C', time: 'Il y a 2 sem.', icon: Award },
];

const chartTooltipStyle = {
  contentStyle: {
    background: '#1a1d21',
    border: 'none',
    borderRadius: '4px',
    fontSize: '11px',
    color: '#fff',
    padding: '8px 12px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
  },
  itemStyle: { color: '#d1d5db', fontSize: '11px' },
  labelStyle: { color: '#fff', fontWeight: 600, marginBottom: '4px', fontSize: '11px' },
};

function MiniSparkline({ data, color }: { data: number[]; color: string }) {
  const h = 28;
  const w = 80;
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;
  const points = data.map((v, i) => {
    const x = (i / (data.length - 1)) * w;
    const y = h - ((v - min) / range) * h;
    return `${x},${y}`;
  }).join(' ');

  return (
    <svg width={w} height={h} className="ml-auto shrink-0">
      <polyline
        fill="none"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        points={points}
      />
    </svg>
  );
}

function formatCFA(val: number) {
  if (val >= 1_000_000) return `${(val / 1_000_000).toFixed(1)}M`;
  if (val >= 1_000) return `${(val / 1_000).toFixed(0)}K`;
  return val.toString();
}

export default function HrDashboard() {
  const [period] = useState('Jul 2025');

  return (
    <div className="px-6 py-6">
      {/* Header */}
      <div className="mb-6 flex items-end justify-between">
        <div>
          <h1 className="text-xl font-bold text-foreground">Vue d{"'"}ensemble</h1>
          <p className="mt-0.5 text-sm text-muted-foreground">
            Tableau de bord RH &mdash; {period}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="flex items-center gap-1.5 rounded-xs bg-emerald-50 px-2.5 py-1 text-[11px] font-medium text-emerald-700">
            <Activity className="h-3 w-3" />
            Systeme operationnel
          </span>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="mb-6 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
        {kpiCards.map((kpi) => {
          const Icon = kpi.icon;
          const isUp = kpi.trend === 'up';
          return (
            <Link key={kpi.label} href={kpi.href}>
              <div className="group relative flex flex-col gap-3 rounded-xs border bg-card p-4 transition-all hover:shadow-md hover:border-accent/30">
                <div className="flex items-start justify-between">
                  <div className={`flex h-8 w-8 items-center justify-center rounded-xs ${kpi.color}`}>
                    <Icon className="h-4 w-4" />
                  </div>
                  <MiniSparkline data={kpi.sparkData} color={isUp ? '#059669' : '#dc2626'} />
                </div>
                <div>
                  <p className="font-mono text-2xl font-bold tracking-tight text-foreground">{kpi.value}</p>
                  <div className="mt-1 flex items-center gap-2">
                    <span className="text-[11px] text-muted-foreground">{kpi.label}</span>
                    <span className={`flex items-center gap-0.5 text-[10px] font-semibold ${isUp ? 'text-emerald-600' : 'text-red-500'}`}>
                      {isUp ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                      {kpi.change}
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          );
        })}
      </div>

      {/* Main charts row */}
      <div className="mb-6 grid grid-cols-1 gap-4 lg:grid-cols-3">
        {/* Payroll evolution - 2 cols */}
        <div className="rounded-xs border bg-card p-5 lg:col-span-2">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h2 className="text-sm font-semibold text-foreground">Evolution de la masse salariale</h2>
              <p className="text-[11px] text-muted-foreground">Brut, net et charges patronales (en milliers FCFA)</p>
            </div>
            <span className="rounded-xs bg-muted px-2 py-0.5 font-mono text-[10px] font-medium text-muted-foreground">
              YTD 2025
            </span>
          </div>
          <div className="h-[260px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={payrollEvolution} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="brutGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#1e293b" stopOpacity={0.15} />
                    <stop offset="100%" stopColor="#1e293b" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="netGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#017e84" stopOpacity={0.2} />
                    <stop offset="100%" stopColor="#017e84" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e5e9" vertical={false} />
                <XAxis dataKey="month" tick={{ fontSize: 10, fill: '#6b7280' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 10, fill: '#6b7280' }} axisLine={false} tickLine={false} tickFormatter={(v) => `${v}K`} />
                <Tooltip {...chartTooltipStyle} formatter={(value: number) => [`${value}K FCFA`]} />
                <Area type="monotone" dataKey="brut" stroke="#1e293b" strokeWidth={2} fill="url(#brutGrad)" name="Brut" />
                <Area type="monotone" dataKey="net" stroke="#017e84" strokeWidth={2} fill="url(#netGrad)" name="Net" />
                <Area type="monotone" dataKey="charges" stroke="#714B67" strokeWidth={1.5} fill="none" strokeDasharray="4 4" name="Charges" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Department breakdown */}
        <div className="rounded-xs border bg-card p-5">
          <h2 className="mb-1 text-sm font-semibold text-foreground">Repartition par departement</h2>
          <p className="mb-4 text-[11px] text-muted-foreground">Effectif par service</p>
          <div className="flex items-center justify-center">
            <div className="h-[180px] w-[180px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={departmentBreakdown}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={80}
                    paddingAngle={3}
                    dataKey="value"
                    stroke="none"
                  >
                    {departmentBreakdown.map((entry, i) => (
                      <Cell key={i} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip {...chartTooltipStyle} formatter={(value: number) => [`${value} employe(s)`]} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
          <div className="mt-3 flex flex-col gap-2">
            {departmentBreakdown.map((dept) => (
              <div key={dept.name} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="h-2.5 w-2.5 rounded-full" style={{ background: dept.color }} />
                  <span className="text-xs text-foreground">{dept.name}</span>
                </div>
                <span className="font-mono text-xs font-semibold text-foreground">{dept.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Second charts row */}
      <div className="mb-6 grid grid-cols-1 gap-4 lg:grid-cols-3">
        {/* Salary distribution */}
        <div className="rounded-xs border bg-card p-5">
          <h2 className="mb-1 text-sm font-semibold text-foreground">Distribution salariale</h2>
          <p className="mb-4 text-[11px] text-muted-foreground">Nombre d{"'"}employes par tranche</p>
          <div className="h-[200px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={salaryDistribution} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e5e9" vertical={false} />
                <XAxis dataKey="range" tick={{ fontSize: 9, fill: '#6b7280' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 10, fill: '#6b7280' }} axisLine={false} tickLine={false} allowDecimals={false} />
                <Tooltip {...chartTooltipStyle} formatter={(value: number) => [`${value} employe(s)`]} />
                <Bar dataKey="count" radius={[2, 2, 0, 0]} name="Employes">
                  {salaryDistribution.map((entry, i) => (
                    <Cell key={i} fill={entry.fill} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Headcount trend */}
        <div className="rounded-xs border bg-card p-5">
          <h2 className="mb-1 text-sm font-semibold text-foreground">Evolution des effectifs</h2>
          <p className="mb-4 text-[11px] text-muted-foreground">Actifs, arrivees et departs</p>
          <div className="h-[200px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={headcountTrend} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e5e9" vertical={false} />
                <XAxis dataKey="month" tick={{ fontSize: 10, fill: '#6b7280' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 10, fill: '#6b7280' }} axisLine={false} tickLine={false} allowDecimals={false} />
                <Tooltip {...chartTooltipStyle} />
                <Line type="monotone" dataKey="actifs" stroke="#1e293b" strokeWidth={2} dot={{ r: 3, fill: '#1e293b' }} name="Actifs" />
                <Line type="monotone" dataKey="arrivees" stroke="#017e84" strokeWidth={1.5} dot={{ r: 3, fill: '#017e84' }} name="Arrivees" />
                <Line type="monotone" dataKey="departs" stroke="#dc2626" strokeWidth={1.5} dot={{ r: 3, fill: '#dc2626' }} name="Departs" />
                <Legend iconType="circle" iconSize={6} wrapperStyle={{ fontSize: '10px', paddingTop: '8px' }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Cost breakdown table */}
        <div className="rounded-xs border bg-card p-5">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h2 className="text-sm font-semibold text-foreground">Decomposition des couts</h2>
              <p className="text-[11px] text-muted-foreground">Repartition mensuelle</p>
            </div>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </div>
          <div className="flex flex-col gap-2.5">
            {costBreakdown.map((item) => (
              <div key={item.label}>
                <div className="mb-1 flex items-center justify-between">
                  <span className="text-[11px] text-muted-foreground">{item.label}</span>
                  <span className="font-mono text-[11px] font-semibold text-foreground">{formatCFA(item.value)}</span>
                </div>
                <div className="h-1.5 w-full overflow-hidden rounded-full bg-muted">
                  <div
                    className="h-full rounded-full bg-foreground/70 transition-all"
                    style={{ width: `${item.pct}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom row: quick actions + activity feed */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        {/* Quick actions */}
        <div className="rounded-xs border bg-card p-5 lg:col-span-2">
          <h2 className="mb-4 text-sm font-semibold text-foreground">Actions rapides</h2>
          <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
            {[
              { label: 'Nouvel employe', href: '/human-resources/employees/new', icon: Users, desc: 'Ajouter un collaborateur' },
              { label: 'Calculer la paie', href: '/human-resources/payroll', icon: CalendarDays, desc: 'Lancer le calcul mensuel' },
              { label: 'Voir les bulletins', href: '/human-resources/payslips', icon: FileText, desc: 'Consulter les fiches de paie' },
              { label: 'Gerer les primes', href: '/human-resources/bonuses', icon: Award, desc: 'Configurer les definitions' },
              { label: 'Grille salariale', href: '/human-resources/salary-grid', icon: Briefcase, desc: 'Convention et echelons' },
              { label: 'Parametres RH', href: '/human-resources/settings', icon: Clock, desc: 'Configuration du module' },
            ].map((action) => {
              const Icon = action.icon;
              return (
                <Link key={action.label} href={action.href}>
                  <div className="flex items-center justify-between rounded-xs border bg-background p-3.5 transition-all hover:shadow-sm hover:border-accent/30">
                    <div className="flex items-center gap-3">
                      <div className="flex h-8 w-8 items-center justify-center rounded-xs bg-muted">
                        <Icon className="h-4 w-4 text-muted-foreground" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-foreground">{action.label}</p>
                        <p className="text-[10px] text-muted-foreground">{action.desc}</p>
                      </div>
                    </div>
                    <ArrowUpRight className="h-3.5 w-3.5 text-muted-foreground" />
                  </div>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Activity feed */}
        <div className="rounded-xs border bg-card p-5">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-sm font-semibold text-foreground">Activite recente</h2>
            <Link href="/human-resources/notifications" className="text-[11px] font-medium text-accent hover:underline">
              Tout voir
            </Link>
          </div>
          <div className="flex flex-col gap-3">
            {recentActivity.map((item, i) => {
              const Icon = item.icon;
              return (
                <div key={i} className="flex items-start gap-3">
                  <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-xs bg-muted">
                    <Icon className="h-3.5 w-3.5 text-muted-foreground" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs text-foreground leading-relaxed">{item.text}</p>
                    <p className="font-mono text-[10px] text-muted-foreground">{item.time}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
