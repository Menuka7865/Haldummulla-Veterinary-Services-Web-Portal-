import { API_BASE_URL } from '../../config';
import React, { useState, useEffect } from 'react';
import { Stethoscope, CalendarCheck, MessageSquare, Megaphone, RefreshCw } from 'lucide-react';

const APIS = {
  announcements: `${API_BASE_URL}/announcements`,
  services:      `${API_BASE_URL}/services`,
  appointments:  `${API_BASE_URL}/appointments`,
  inquiries:     `${API_BASE_URL}/inquiries`,
};

const getToken = () => {
  try {
    const user = JSON.parse(localStorage.getItem('user'));
    return user?.token || null;
  } catch {
    return null;
  }
};

const statusBadge = (status) => {
  const map = {
    Pending:  'bg-yellow-100 text-yellow-700',
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
  const [stats, setStats] = useState({
    servicesTotal:       '—',
    appointmentsTotal:   '—',
    appointmentsPending: '—',
    inquiriesTotal:      '—',
    inquiriesUnread:     '—',
    announcementTotal:   '—',
    announcementActive:  '—',
  });
  const [loading, setLoading] = useState(true);

  const fetchAllStats = async () => {
    setLoading(true);
    try {
      const [servicesRes, appointmentsRes, inquiriesRes, announcementsRes] = await Promise.allSettled([
        fetch(APIS.services),
        fetch(APIS.appointments),
        fetch(APIS.inquiries),
        fetch(`${APIS.announcements}/admin/all`, {
          headers: { Authorization: `Bearer ${getToken()}` },
        }),
      ]);

      const newStats = { ...stats };

      if (servicesRes.status === 'fulfilled' && servicesRes.value.ok) {
        const data = await servicesRes.value.json();
        newStats.servicesTotal = data.length;
      }

      if (appointmentsRes.status === 'fulfilled' && appointmentsRes.value.ok) {
        const data = await appointmentsRes.value.json();
        newStats.appointmentsTotal   = data.length;
        newStats.appointmentsPending = data.filter(a => a.status === 'Pending').length;
      }

      if (inquiriesRes.status === 'fulfilled' && inquiriesRes.value.ok) {
        const data = await inquiriesRes.value.json();
        newStats.inquiriesTotal  = data.length;
        newStats.inquiriesUnread = data.filter(i => !i.read).length;
      }

      if (announcementsRes.status === 'fulfilled' && announcementsRes.value.ok) {
        const data = await announcementsRes.value.json();
        newStats.announcementTotal  = data.length;
        newStats.announcementActive = data.filter(a => a.status === 'Active').length;
      }

      setStats(newStats);
    } catch (err) {
      console.error('Failed to fetch dashboard stats', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllStats();
    // Auto-refresh every 60 seconds
    const interval = setInterval(fetchAllStats, 60000);
    return () => clearInterval(interval);
  }, []);

  const statCards = [
    {
      label:   'Total Services',
      value:   stats.servicesTotal,
      icon:    Stethoscope,
      iconBg:  'bg-teal-100',
      iconCls: 'text-teal-700',
      trend:   stats.servicesTotal === '—' ? 'Loading…' : `${stats.servicesTotal} registered`,
    },
    {
      label:   'Appointments',
      value:   stats.appointmentsTotal,
      icon:    CalendarCheck,
      iconBg:  'bg-blue-100',
      iconCls: 'text-blue-700',
      trend:   stats.appointmentsPending === '—' ? 'Loading…' : `${stats.appointmentsPending} pending approval`,
    },
    {
      label:   'Contact Inquiries',
      value:   stats.inquiriesTotal,
      icon:    MessageSquare,
      iconBg:  'bg-orange-100',
      iconCls: 'text-orange-700',
      trend:   stats.inquiriesUnread === '—' ? 'Loading…' : `${stats.inquiriesUnread} unread`,
    },
    {
      label:   'Announcements',
      value:   stats.announcementTotal,
      icon:    Megaphone,
      iconBg:  'bg-purple-100',
      iconCls: 'text-purple-700',
      trend:   stats.announcementActive === '—' ? 'Loading…' : `${stats.announcementActive} active`,
    },
  ];

  return (
    <div className="space-y-8">
      {/* Page Title */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Dashboard</h2>
          <p className="text-sm text-gray-500 mt-1">Welcome back! Here's a real-time overview of the portal activity.</p>
        </div>
        <button
          onClick={fetchAllStats}
          disabled={loading}
          className="flex items-center gap-2 px-4 py-2 text-sm bg-white border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors shadow-sm disabled:opacity-60"
          title="Refresh stats"
        >
          <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin text-teal-600' : 'text-gray-500'}`} />
          {loading ? 'Refreshing…' : 'Refresh'}
        </button>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
        {statCards.map(({ label, value, icon: Icon, iconBg, iconCls, trend }) => (
          <div
            key={label}
            className="rounded-2xl p-5 border border-gray-100 bg-white shadow-sm flex items-start gap-4"
          >
            <div className={`${iconBg} p-3 rounded-xl shrink-0`}>
              <Icon className={`w-6 h-6 ${iconCls}`} />
            </div>
            <div>
              <p className="text-3xl font-bold text-gray-900">
                {loading && value === '—' ? (
                  <span className="inline-block w-8 h-7 bg-gray-100 rounded animate-pulse"></span>
                ) : value}
              </p>
              <p className="text-sm font-medium text-gray-700 mt-0.5">{label}</p>
              <p className="text-xs text-gray-400 mt-1">{trend}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Announcements — live from DB */}
      <RecentAnnouncements />

      {/* Recent Appointments — live from DB */}
      <RecentAppointments />
    </div>
  );
}

/* ─── Recent Announcements widget ──────────────────────────────────────── */
function RecentAnnouncements() {
  const [items, setItems]     = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch(`${APIS.announcements}/admin/all`, {
          headers: { Authorization: `Bearer ${getToken()}` },
        });
        if (!res.ok) throw new Error();
        const data = await res.json();
        setItems(data.slice(0, 3));
      } catch {
        setItems([]);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const statusBadgeSmall = (status) => {
    const map = {
      Active:  'bg-green-100 text-green-700',
      Expired: 'bg-gray-100 text-gray-500',
    };
    return (
      <span className={`px-2 py-0.5 text-xs font-medium rounded-full ${map[status] || 'bg-gray-100 text-gray-500'}`}>
        {status}
      </span>
    );
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
        <h3 className="text-base font-semibold text-gray-900">Recent Announcements</h3>
        <a href="/admin/announcements" className="text-sm text-teal-600 hover:underline">View all →</a>
      </div>

      {loading ? (
        <div className="px-6 py-8 text-center text-sm text-gray-400">Loading…</div>
      ) : items.length === 0 ? (
        <div className="px-6 py-8 text-center text-sm text-gray-400">
          No announcements yet.{' '}
          <a href="/admin/announcements" className="text-teal-600 hover:underline">Create one →</a>
        </div>
      ) : (
        <ul className="divide-y divide-gray-50">
          {items.map((a) => (
            <li key={a._id} className="px-6 py-4 flex items-start justify-between gap-4 hover:bg-gray-50 transition-colors">
              <div className="min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">{a.title}</p>
                <p className="text-xs text-gray-400 mt-0.5">{a.date} · {a.category}</p>
              </div>
              <div className="shrink-0">{statusBadgeSmall(a.status)}</div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

/* ─── Recent Appointments widget ──────────────────────────────────────── */
function RecentAppointments() {
  const [items, setItems]     = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch(APIS.appointments);
        if (!res.ok) throw new Error();
        const data = await res.json();
        // Show the 5 most recent
        setItems(data.slice(0, 5));
      } catch {
        setItems([]);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const statusBadgeSmall = (status) => {
    const map = {
      Pending:  'bg-yellow-100 text-yellow-700',
      Approved: 'bg-green-100 text-green-700',
      Rejected: 'bg-red-100 text-red-700',
    };
    return (
      <span className={`px-2 py-0.5 text-xs font-medium rounded-full ${map[status] || 'bg-gray-100 text-gray-500'}`}>
        {status}
      </span>
    );
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
        <h3 className="text-base font-semibold text-gray-900">Recent Appointments</h3>
        <a href="/admin/appointments" className="text-sm text-teal-600 hover:underline">View all →</a>
      </div>

      {loading ? (
        <div className="px-6 py-8 text-center text-sm text-gray-400">Loading…</div>
      ) : items.length === 0 ? (
        <div className="px-6 py-8 text-center text-sm text-gray-400">
          No appointments yet.
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 text-left text-gray-500 text-xs uppercase tracking-wide">
                <th className="px-6 py-3">Farmer Name</th>
                <th className="px-6 py-3 hidden sm:table-cell">Animal</th>
                <th className="px-6 py-3 hidden md:table-cell">Service</th>
                <th className="px-6 py-3">Date</th>
                <th className="px-6 py-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {items.map((apt) => (
                <tr key={apt._id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-3 font-medium text-gray-900">{apt.farmer}</td>
                  <td className="px-6 py-3 text-gray-600 hidden sm:table-cell">{apt.animal}</td>
                  <td className="px-6 py-3 text-gray-600 hidden md:table-cell">{apt.service}</td>
                  <td className="px-6 py-3 text-gray-600">{apt.date}</td>
                  <td className="px-6 py-3">{statusBadgeSmall(apt.status)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
