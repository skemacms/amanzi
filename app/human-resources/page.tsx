import { Users, CalendarDays, FileText, Award, Bell } from 'lucide-react';
import Link from 'next/link';

const stats = [
  { label: 'Employés actifs', value: '4', icon: Users, href: '/human-resources/employees', color: 'text-teal-700 bg-teal-50' },
  { label: 'Périodes de paie', value: '3', icon: CalendarDays, href: '/human-resources/payroll', color: 'text-stone-700 bg-stone-100' },
  { label: 'Bulletins émis', value: '2', icon: FileText, href: '/human-resources/payslips', color: 'text-teal-800 bg-teal-50' },
  { label: 'Définitions de primes', value: '4', icon: Award, href: '/human-resources/bonuses', color: 'text-stone-600 bg-stone-100' },
  { label: 'Notifications non lues', value: '2', icon: Bell, href: '/human-resources/notifications', color: 'text-teal-600 bg-teal-50' },
];

export default function HrDashboard() {
  return (
    <div className="px-6 py-5">
      <div className="mb-6">
        <h1 className="text-lg font-bold text-stone-900">Ressources Humaines</h1>
        <p className="mt-0.5 text-xs text-stone-500">
          Vue d&apos;ensemble du module RH
        </p>
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Link key={stat.label} href={stat.href}>
              <div className="flex items-center gap-3 rounded-lg border bg-white p-4 transition-all hover:shadow-md">
                <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${stat.color}`}>
                  <Icon className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-xl font-bold text-stone-900">{stat.value}</p>
                  <p className="text-[11px] text-stone-500">{stat.label}</p>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
