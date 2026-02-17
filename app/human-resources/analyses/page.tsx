'use client';

import { useState } from 'react';
import { TrendingUp, TrendingDown, Users, DollarSign, Clock, UserCheck } from 'lucide-react';
import {
  AreaChart, Area, BarChart, Bar, LineChart, Line,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, Cell,
} from 'recharts';

const tooltipStyle = {
  contentStyle: { background: '#1a1d21', border: 'none', borderRadius: '4px', fontSize: '11px', color: '#fff', padding: '8px 12px' },
  itemStyle: { color: '#d1d5db', fontSize: '11px' },
  labelStyle: { color: '#fff', fontWeight: 600, marginBottom: '4px', fontSize: '11px' },
};

const turnoverData = [
  { month: 'Jan', arrivees: 0, departs: 0, taux: 0 },
  { month: 'Fev', arrivees: 0, departs: 0, taux: 0 },
  { month: 'Mar', arrivees: 0, departs: 1, taux: 25 },
  { month: 'Avr', arrivees: 1, departs: 0, taux: 0 },
  { month: 'Mai', arrivees: 0, departs: 0, taux: 0 },
  { month: 'Jun', arrivees: 1, departs: 0, taux: 0 },
  { month: 'Jul', arrivees: 0, departs: 0, taux: 0 },
];

const costPerDeptData = [
  { dept: 'Tech', cout: 750, fill: '#017e84' },
  { dept: 'Finance', cout: 375, fill: '#0d5c63' },
  { dept: 'Commercial', cout: 700, fill: '#1e293b' },
];

const absenteeismData = [
  { month: 'Jan', taux: 2.1 },
  { month: 'Fev', taux: 3.5 },
  { month: 'Mar', taux: 1.8 },
  { month: 'Avr', taux: 4.2 },
  { month: 'Mai', taux: 2.9 },
  { month: 'Jun', taux: 5.1 },
  { month: 'Jul', taux: 3.3 },
];

const kpis = [
  { label: 'Taux de rotation', value: '8.3%', change: '-2.1%', trend: 'down' as const, icon: Users, color: 'text-teal-600 bg-teal-50' },
  { label: 'Cout moyen recrutement', value: '85K', change: '+12K', trend: 'up' as const, icon: DollarSign, color: 'text-amber-600 bg-amber-50' },
  { label: 'Taux absenteisme', value: '3.3%', change: '+0.4%', trend: 'up' as const, icon: Clock, color: 'text-red-600 bg-red-50' },
  { label: 'Anciennete moyenne', value: '4.2 ans', change: '+0.3', trend: 'up' as const, icon: UserCheck, color: 'text-cyan-700 bg-cyan-50' },
];

export default function AnalysesPage() {
  const [period] = useState('2025');

  return (
    <div className="px-6 py-6">
      <div className="mb-5">
        <h1 className="text-xl font-bold text-foreground">Analyses RH</h1>
        <p className="mt-0.5 text-sm text-muted-foreground">Indicateurs de performance et tendances &mdash; {period}</p>
      </div>

      {/* KPIs */}
      <div className="mb-6 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {kpis.map((kpi) => {
          const Icon = kpi.icon;
          const isUp = kpi.trend === 'up';
          return (
            <div key={kpi.label} className="rounded-xs border bg-card p-4">
              <div className="flex items-center justify-between">
                <div className={`flex h-8 w-8 items-center justify-center rounded-xs ${kpi.color}`}>
                  <Icon className="h-4 w-4" />
                </div>
                <span className={`flex items-center gap-0.5 text-[10px] font-semibold ${isUp && kpi.label.includes('absenteisme') ? 'text-red-500' : isUp ? 'text-emerald-600' : 'text-emerald-600'}`}>
                  {isUp ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                  {kpi.change}
                </span>
              </div>
              <p className="mt-3 font-mono text-2xl font-bold text-foreground">{kpi.value}</p>
              <p className="mt-0.5 text-[11px] text-muted-foreground">{kpi.label}</p>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        {/* Turnover */}
        <div className="rounded-xs border bg-card p-5">
          <h2 className="mb-1 text-sm font-semibold text-foreground">Rotation du personnel</h2>
          <p className="mb-4 text-[11px] text-muted-foreground">Arrivees et departs par mois</p>
          <div className="h-[220px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={turnoverData} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e5e9" vertical={false} />
                <XAxis dataKey="month" tick={{ fontSize: 10, fill: '#6b7280' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 10, fill: '#6b7280' }} axisLine={false} tickLine={false} allowDecimals={false} />
                <Tooltip {...tooltipStyle} />
                <Bar dataKey="arrivees" fill="#017e84" radius={[2, 2, 0, 0]} name="Arrivees" />
                <Bar dataKey="departs" fill="#dc2626" radius={[2, 2, 0, 0]} name="Departs" />
                <Legend iconType="circle" iconSize={6} wrapperStyle={{ fontSize: '10px', paddingTop: '8px' }} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Cost per department */}
        <div className="rounded-xs border bg-card p-5">
          <h2 className="mb-1 text-sm font-semibold text-foreground">Cout par departement</h2>
          <p className="mb-4 text-[11px] text-muted-foreground">Masse salariale en milliers FCFA</p>
          <div className="h-[220px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={costPerDeptData} layout="vertical" margin={{ top: 4, right: 20, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e5e9" horizontal={false} />
                <XAxis type="number" tick={{ fontSize: 10, fill: '#6b7280' }} axisLine={false} tickLine={false} tickFormatter={(v) => `${v}K`} />
                <YAxis type="category" dataKey="dept" tick={{ fontSize: 11, fill: '#374151' }} axisLine={false} tickLine={false} width={70} />
                <Tooltip {...tooltipStyle} formatter={(value: number) => [`${value}K FCFA`]} />
                <Bar dataKey="cout" radius={[0, 2, 2, 0]} name="Cout">
                  {costPerDeptData.map((entry, i) => (
                    <Cell key={i} fill={entry.fill} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Absenteeism */}
        <div className="rounded-xs border bg-card p-5 lg:col-span-2">
          <h2 className="mb-1 text-sm font-semibold text-foreground">Taux d{"'"}absenteisme</h2>
          <p className="mb-4 text-[11px] text-muted-foreground">Pourcentage mensuel</p>
          <div className="h-[200px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={absenteeismData} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="absGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#dc2626" stopOpacity={0.15} />
                    <stop offset="100%" stopColor="#dc2626" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e5e9" vertical={false} />
                <XAxis dataKey="month" tick={{ fontSize: 10, fill: '#6b7280' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 10, fill: '#6b7280' }} axisLine={false} tickLine={false} tickFormatter={(v) => `${v}%`} />
                <Tooltip {...tooltipStyle} formatter={(value: number) => [`${value}%`]} />
                <Area type="monotone" dataKey="taux" stroke="#dc2626" strokeWidth={2} fill="url(#absGrad)" name="Taux" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
