import { Users, CalendarDays, FileText, Award, Bell, TrendingUp, ArrowUpRight } from 'lucide-react';
import Link from 'next/link';

const stats = [
  { label: 'Employes actifs', value: '4', icon: Users, href: '/human-resources/employees', color: 'text-teal-600 bg-teal-50' },
  { label: 'Periodes de paie', value: '3', icon: CalendarDays, href: '/human-resources/payroll', color: 'text-sky-600 bg-sky-50' },
  { label: 'Bulletins emis', value: '2', icon: FileText, href: '/human-resources/payslips', color: 'text-indigo-600 bg-indigo-50' },
  { label: 'Definitions de primes', value: '4', icon: Award, href: '/human-resources/bonuses', color: 'text-amber-600 bg-amber-50' },
  { label: 'Notifications non lues', value: '2', icon: Bell, href: '/human-resources/notifications', color: 'text-rose-600 bg-rose-50' },
];

const quickActions = [
  { label: 'Nouvel employe', href: '/human-resources/employees/new', icon: Users },
  { label: 'Nouvelle periode de paie', href: '/human-resources/payroll', icon: CalendarDays },
  { label: 'Voir les bulletins', href: '/human-resources/payslips', icon: FileText },
  { label: 'Parametres RH', href: '/human-resources/settings', icon: TrendingUp },
];

export default function HrDashboard() {
  return (
    <div className="px-6 py-6">
      <div className="mb-6">
        <h1 className="text-xl font-bold text-foreground">Vue d{"'"}ensemble</h1>
        <p className="mt-0.5 text-sm text-muted-foreground">
          Tableau de bord du module Ressources Humaines
        </p>
      </div>

      {/* Stats grid */}
      <div className="mb-8 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Link key={stat.label} href={stat.href}>
              <div className="flex items-center gap-3 rounded-xs border bg-card p-4 transition-all hover:shadow-md hover:border-accent/30">
                <div className={`flex h-10 w-10 items-center justify-center rounded-xs ${stat.color}`}>
                  <Icon className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                  <p className="text-[11px] text-muted-foreground">{stat.label}</p>
                </div>
              </div>
            </Link>
          );
        })}
      </div>

      {/* Quick actions */}
      <div>
        <h2 className="mb-3 text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">
          Actions rapides
        </h2>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {quickActions.map((action) => {
            const Icon = action.icon;
            return (
              <Link key={action.label} href={action.href}>
                <div className="flex items-center justify-between rounded-xs border bg-card p-4 transition-all hover:shadow-sm hover:border-accent/30">
                  <div className="flex items-center gap-3">
                    <Icon className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm font-medium text-foreground">{action.label}</span>
                  </div>
                  <ArrowUpRight className="h-4 w-4 text-muted-foreground" />
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
