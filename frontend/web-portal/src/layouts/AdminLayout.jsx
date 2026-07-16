import React from 'react';
import { Outlet } from 'react-router-dom';
import AdminSidebar from '../components/admin/AdminSidebar.jsx';

export default function AdminLayout() {
  return (
    <div className="min-h-screen bg-gray-50 flex">
      <AdminSidebar />
      {/* Main content - offset by sidebar width on desktop */}
      <main className="flex-1 md:ml-64 min-h-screen">
        {/* Top header bar */}
        <header className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between sticky top-0 z-20 shadow-sm">
          <div className="md:hidden w-10" /> {/* Spacer for mobile hamburger */}
          <h1 className="text-gray-800 font-semibold text-base hidden md:block">
            Haldummulla Veterinary Services — Admin
          </h1>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 bg-teal-50 border border-teal-100 rounded-full px-4 py-1.5">
              <div className="w-7 h-7 rounded-full bg-teal-600 flex items-center justify-center text-white text-xs font-bold">
                A
              </div>
              <span className="text-sm font-medium text-teal-800 hidden sm:block">Admin</span>
            </div>
          </div>
        </header>

        {/* Page content */}
        <div className="p-4 sm:p-6 lg:p-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
