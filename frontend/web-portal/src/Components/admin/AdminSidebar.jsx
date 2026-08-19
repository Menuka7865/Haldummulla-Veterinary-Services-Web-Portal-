import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  Stethoscope,
  Megaphone,
  BookOpen,
  CalendarCheck,
  MessageSquare,
  Menu,
  X,
  LogOut,
  ChevronRight
} from 'lucide-react';

const navItems = [
  { label: 'Dashboard', icon: LayoutDashboard, path: '/admin' },
  { label: 'Services', icon: Stethoscope, path: '/admin/services' },
  { label: 'Announcements', icon: Megaphone, path: '/admin/announcements' },
  { label: 'Resources', icon: BookOpen, path: '/admin/resources' },
  { label: 'Appointments', icon: CalendarCheck, path: '/admin/appointments' },
  { label: 'Inquiries', icon: MessageSquare, path: '/admin/inquiries' },
];

export default function AdminSidebar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className="flex items-center gap-3 px-6 py-5 border-b border-teal-700">
        <div className="bg-white rounded-lg p-1.5">
          <Stethoscope className="w-6 h-6 text-teal-700" />
        </div>
        <div>
          <p className="text-white font-bold text-sm leading-tight">Haldummulla Vet</p>
          <p className="text-teal-300 text-xs">Admin Portal</p>
        </div>
      </div>

      {/* Nav Items */}
      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        {navItems.map(({ label, icon: Icon, path }) => (
          <NavLink
            key={path}
            to={path}
            end={path === '/admin'}
            onClick={() => setMobileOpen(false)}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 group ${
                isActive
                  ? 'bg-white text-teal-700 shadow-md'
                  : 'text-teal-100 hover:bg-teal-700 hover:text-white'
              }`
            }
          >
            <Icon className="w-5 h-5 shrink-0" />
            <span className="flex-1">{label}</span>
            <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-60 transition-opacity" />
          </NavLink>
        ))}
      </nav>

      {/* Footer */}
      <div className="px-3 py-4 border-t border-teal-700">
        <button
          onClick={() => navigate('/')}
          className="flex items-center gap-3 w-full px-4 py-2.5 rounded-xl text-teal-100 hover:bg-teal-700 hover:text-white text-sm font-medium transition-all duration-200"
        >
          <LogOut className="w-5 h-5 shrink-0" />
          <span>Back to Site</span>
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile toggle button */}
      <button
        className="fixed top-4 left-4 z-50 md:hidden bg-teal-700 text-white p-2 rounded-lg shadow-lg"
        onClick={() => setMobileOpen(!mobileOpen)}
        aria-label="Toggle menu"
      >
        {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
      </button>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 md:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Mobile sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full w-64 bg-teal-800 z-40 transform transition-transform duration-300 ease-in-out md:hidden ${
          mobileOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <SidebarContent />
      </aside>

      {/* Desktop sidebar */}
      <aside className="hidden md:flex flex-col w-64 bg-teal-800 min-h-screen fixed top-0 left-0 z-30">
        <SidebarContent />
      </aside>
    </>
  );
}
