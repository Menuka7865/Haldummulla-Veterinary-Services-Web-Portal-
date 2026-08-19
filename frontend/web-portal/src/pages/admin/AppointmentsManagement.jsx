import React, { useState } from 'react';
import { CheckCircle, XCircle, Eye, X } from 'lucide-react';

const initialAppointments = [
  { id: 1, farmer: 'Sunil Perera', phone: '0771234567', animal: 'Dairy Cow', service: 'General Health Checkup', date: '2026-07-18', time: '09:00 AM', status: 'Pending', notes: 'Cow showing signs of reduced milk production.' },
  { id: 2, farmer: 'Nimal Fernando', phone: '0769876543', animal: 'Goat (2 heads)', service: 'Vaccination Programs', date: '2026-07-19', time: '10:30 AM', status: 'Approved', notes: 'Annual vaccination for FMD.' },
  { id: 3, farmer: 'Kamala Silva', phone: '0752345678', animal: 'Buffalo', service: 'Emergency Care', date: '2026-07-20', time: '02:00 PM', status: 'Pending', notes: 'Animal has difficulty walking.' },
  { id: 4, farmer: 'Rohan Jayawardena', phone: '0713456789', animal: 'Poultry (15)', service: 'Emergency Care', date: '2026-07-21', time: '08:00 AM', status: 'Approved', notes: 'Several birds showing respiratory symptoms.' },
  { id: 5, farmer: 'Priya Mahendran', phone: '0784567890', animal: 'Dairy Cow', service: 'Vaccination Programs', date: '2026-07-22', time: '11:00 AM', status: 'Rejected', notes: 'Requested home visit.' },
];

const statusBadge = (status) => {
  const map = {
    Pending: 'bg-yellow-100 text-yellow-700',
    Approved: 'bg-green-100 text-green-700',
    Rejected: 'bg-red-100 text-red-700',
  };
  return <span className={`px-2.5 py-0.5 text-xs font-medium rounded-full ${map[status] || 'bg-gray-100 text-gray-600'}`}>{status}</span>;
};

export default function AppointmentsManagement() {
  const [appointments, setAppointments] = useState(initialAppointments);
  const [modal, setModal] = useState(null);
  const [selected, setSelected] = useState(null);

  const openView = (a) => { setSelected(a); setModal('view'); };
  const closeModal = () => { setModal(null); setSelected(null); };

  const handleApprove = (id) => {
    setAppointments(prev => prev.map(a => a.id === id ? { ...a, status: 'Approved' } : a));
    closeModal();
  };

  const handleReject = (id) => {
    setAppointments(prev => prev.map(a => a.id === id ? { ...a, status: 'Rejected' } : a));
    closeModal();
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Appointments</h2>
        <p className="text-sm text-gray-500 mt-1">Review and approve veterinary appointment requests from farmers.</p>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 text-left text-gray-500 text-xs uppercase tracking-wide">
                <th className="px-6 py-3">Farmer</th>
                <th className="px-6 py-3 hidden md:table-cell">Animal</th>
                <th className="px-6 py-3 hidden sm:table-cell">Date</th>
                <th className="px-6 py-3">Status</th>
                <th className="px-6 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {appointments.map((a) => (
                <tr key={a.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 font-medium text-gray-900">{a.farmer}</td>
                  <td className="px-6 py-4 text-gray-500 hidden md:table-cell">{a.animal}</td>
                  <td className="px-6 py-4 text-gray-500 hidden sm:table-cell">{a.date} <span className="text-gray-400">{a.time}</span></td>
                  <td className="px-6 py-4">{statusBadge(a.status)}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-2">
                      <button onClick={() => openView(a)} className="p-1.5 rounded-lg text-gray-400 hover:text-blue-600 hover:bg-blue-50 transition-colors" title="View"><Eye className="w-4 h-4" /></button>
                      {a.status === 'Pending' && (
                        <>
                          <button onClick={() => handleApprove(a.id)} className="p-1.5 rounded-lg text-gray-400 hover:text-green-600 hover:bg-green-50 transition-colors" title="Approve"><CheckCircle className="w-4 h-4" /></button>
                          <button onClick={() => handleReject(a.id)} className="p-1.5 rounded-lg text-gray-400 hover:text-red-600 hover:bg-red-50 transition-colors" title="Reject"><XCircle className="w-4 h-4" /></button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {modal === 'view' && selected && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md">
            <div className="p-6">
              <div className="flex items-center justify-between mb-5">
                <h3 className="text-lg font-bold text-gray-900">Appointment Details</h3>
                <button onClick={closeModal} className="text-gray-400 hover:text-gray-600"><X className="w-5 h-5" /></button>
              </div>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div><p className="text-xs text-gray-400 uppercase font-semibold">Farmer</p><p className="text-gray-900 font-medium mt-0.5">{selected.farmer}</p></div>
                  <div><p className="text-xs text-gray-400 uppercase font-semibold">Phone</p><p className="text-gray-600 mt-0.5">{selected.phone}</p></div>
                  <div><p className="text-xs text-gray-400 uppercase font-semibold">Animal</p><p className="text-gray-600 mt-0.5">{selected.animal}</p></div>
                  <div><p className="text-xs text-gray-400 uppercase font-semibold">Service</p><p className="text-gray-600 mt-0.5">{selected.service}</p></div>
                  <div><p className="text-xs text-gray-400 uppercase font-semibold">Date</p><p className="text-gray-600 mt-0.5">{selected.date}</p></div>
                  <div><p className="text-xs text-gray-400 uppercase font-semibold">Time</p><p className="text-gray-600 mt-0.5">{selected.time}</p></div>
                </div>
                <div><p className="text-xs text-gray-400 uppercase font-semibold">Status</p><div className="mt-1">{statusBadge(selected.status)}</div></div>
                <div><p className="text-xs text-gray-400 uppercase font-semibold">Notes</p><p className="text-gray-600 text-sm mt-0.5">{selected.notes}</p></div>
              </div>
              <div className="flex gap-3 mt-6">
                <button onClick={closeModal} className="flex-1 border border-gray-200 text-gray-700 py-2.5 rounded-xl text-sm font-medium hover:bg-gray-50 transition-colors">Close</button>
                {selected.status === 'Pending' && (
                  <>
                    <button onClick={() => handleReject(selected.id)} className="flex-1 bg-red-600 hover:bg-red-700 text-white py-2.5 rounded-xl text-sm font-semibold transition-colors">Reject</button>
                    <button onClick={() => handleApprove(selected.id)} className="flex-1 bg-green-600 hover:bg-green-700 text-white py-2.5 rounded-xl text-sm font-semibold transition-colors">Approve</button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
