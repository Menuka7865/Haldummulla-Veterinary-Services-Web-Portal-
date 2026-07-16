import React from 'react';
import { Stethoscope, CalendarCheck, MessageSquare, Megaphone, TrendingUp, Users } from 'lucide-react';

const stats = [
  {
    label: 'Total Services',
    value: 5,
    icon: Stethoscope,
    color: 'bg-teal-50 text-teal-700',
    iconBg: 'bg-teal-100',
    trend: '+1 this month',
  },
  {
    label: 'Appointments',
    value: 24,
    icon: CalendarCheck,
    color: 'bg-blue-50 text-blue-700',
    iconBg: 'bg-blue-100',
    trend: '8 pending approval',
  },
  {
    label: 'Contact Inquiries',
    value: 12,
    icon: MessageSquare,
    color: 'bg-orange-50 text-orange-700',
    iconBg: 'bg-orange-100',
    trend: '3 unread',
  },
  {
    label: 'Announcements',
    value: 7,
    icon: Megaphone,
    color: 'bg-purple-50 text-purple-700',
    iconBg: 'bg-purple-100',
    trend: '2 active',
  },
];

const recentAppointments = [
  { id: 1, farmer: 'Sunil Perera', animal: 'Dairy Cow', date: '2026-07-18', status: 'Pending' },
  { id: 2, farmer: 'Nimal Fernando', animal: 'Goat', date: '2026-07-19', status: 'Approved' },
  { id: 3, farmer: 'Kamala Silva', animal: 'Buffalo', date: '2026-07-20', status: 'Pending' },
  { id: 4, farmer: 'Rohan Jayawardena', animal: 'Poultry', date: '2026-07-21', status: 'Approved' },
];

const statusBadge = (status) => {
  const map = {
    Pending: 'bg-yellow-100 text-yellow-700',
    Approved: 'bg-green-100 text-green-700',
    Rejected: 'bg-red-100 text-red-700',
  };
  return (
    <span className={`px-2.5 py-0.5 text-xs font-medium rounded-full ${map[status] || 'bg-gray-100 text-gray-600'}`}>
      {status}
    </span>
  );
};

export default function Dashboard() {
  return (
    <div className="space-y-8">
      {/* Page Title */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Dashboard</h2>
        <p className="text-sm text-gray-500 mt-1">Welcome back! Here's a quick overview of the portal activity.</p>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
        {stats.map(({ label, value, icon: Icon, color, iconBg, trend }) => (
          <div key={label} className={`rounded-2xl p-5 border border-gray-100 bg-white shadow-sm flex items-start gap-4`}>
            <div className={`${iconBg} p-3 rounded-xl shrink-0`}>
              <Icon className={`w-6 h-6 ${color.split(' ')[1]}`} />
            </div>
            <div>
              <p className="text-3xl font-bold text-gray-900">{value}</p>
              <p className="text-sm font-medium text-gray-700 mt-0.5">{label}</p>
              <p className="text-xs text-gray-400 mt-1">{trend}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Appointments */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
          <h3 className="text-base font-semibold text-gray-900">Recent Appointments</h3>
          <a href="/admin/appointments" className="text-sm text-teal-600 hover:underline">View all →</a>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 text-left text-gray-500 text-xs uppercase tracking-wide">
                <th className="px-6 py-3">Farmer Name</th>
                <th className="px-6 py-3">Animal</th>
                <th className="px-6 py-3">Date</th>
                <th className="px-6 py-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {recentAppointments.map((apt) => (
                <tr key={apt.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-3 font-medium text-gray-900">{apt.farmer}</td>
                  <td className="px-6 py-3 text-gray-600">{apt.animal}</td>
                  <td className="px-6 py-3 text-gray-600">{apt.date}</td>
                  <td className="px-6 py-3">{statusBadge(apt.status)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
