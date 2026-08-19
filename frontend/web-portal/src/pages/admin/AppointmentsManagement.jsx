import React, { useState, useEffect } from 'react';
import { CheckCircle, XCircle, Eye, X, Trash2, RefreshCw } from 'lucide-react';

const API_BASE = 'http://localhost:5000/api/appointments';

const statusBadge = (status) => {
  const map = {
    Pending: 'bg-yellow-100 text-yellow-700',
    Approved: 'bg-green-100 text-green-700',
    Rejected: 'bg-red-100 text-red-700',
  };
  return <span className={`px-2.5 py-0.5 text-xs font-medium rounded-full ${map[status] || 'bg-gray-100 text-gray-600'}`}>{status}</span>;
};

export default function AppointmentsManagement() {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [modal, setModal] = useState(null);
  const [selected, setSelected] = useState(null);

  const fetchAppointments = async () => {
    try {
      setLoading(true);
      setError('');
      const res = await fetch(API_BASE);
      if (!res.ok) throw new Error('Failed to fetch appointments');
      const data = await res.json();
      setAppointments(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchAppointments(); }, []);

  const openView = (a) => { setSelected(a); setModal('view'); };
  const closeModal = () => { setModal(null); setSelected(null); };

  const updateStatus = async (id, status) => {
    try {
      const res = await fetch(`${API_BASE}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      });
      if (!res.ok) throw new Error('Failed to update status');
      const updated = await res.json();
      setAppointments(prev => prev.map(a => a._id === id ? updated : a));
      if (selected?._id === id) setSelected(updated);
      closeModal();
    } catch (err) {
      alert(err.message);
    }
  };

  const deleteAppointment = async (id) => {
    if (!window.confirm('Are you sure you want to delete this appointment?')) return;
    try {
      await fetch(`${API_BASE}/${id}`, { method: 'DELETE' });
      setAppointments(prev => prev.filter(a => a._id !== id));
      closeModal();
    } catch (err) {
      alert('Failed to delete appointment');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Appointments</h2>
          <p className="text-sm text-gray-500 mt-1">Review and approve veterinary appointment requests from farmers.</p>
        </div>
        <button
          onClick={fetchAppointments}
          className="flex items-center gap-2 px-4 py-2 text-sm bg-gray-100 hover:bg-gray-200 rounded-xl transition-colors"
          title="Refresh"
        >
          <RefreshCw className="w-4 h-4" />
          Refresh
        </button>
      </div>

      {/* Error state */}
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 rounded-xl p-4 text-sm">
          ⚠ {error} — Make sure the backend server is running.
        </div>
      )}

      {/* Loading state */}
      {loading ? (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-12 flex justify-center">
          <div className="w-8 h-8 border-4 border-teal-600 border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          {appointments.length === 0 ? (
            <p className="p-10 text-center text-gray-400">No appointments yet.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-gray-50 text-left text-gray-500 text-xs uppercase tracking-wide">
                    <th className="px-6 py-3">Farmer</th>
                    <th className="px-6 py-3 hidden md:table-cell">Animal</th>
                    <th className="px-6 py-3 hidden sm:table-cell">Date & Time</th>
                    <th className="px-6 py-3">Status</th>
                    <th className="px-6 py-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {appointments.map((a) => (
                    <tr key={a._id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 font-medium text-gray-900">{a.farmer}</td>
                      <td className="px-6 py-4 text-gray-500 hidden md:table-cell">{a.animal}</td>
                      <td className="px-6 py-4 text-gray-500 hidden sm:table-cell">{a.date} <span className="text-gray-400">{a.time}</span></td>
                      <td className="px-6 py-4">{statusBadge(a.status)}</td>
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-end gap-2">
                          <button onClick={() => openView(a)} className="p-1.5 rounded-lg text-gray-400 hover:text-blue-600 hover:bg-blue-50 transition-colors" title="View"><Eye className="w-4 h-4" /></button>
                          {a.status === 'Pending' && (
                            <>
                              <button onClick={() => updateStatus(a._id, 'Approved')} className="p-1.5 rounded-lg text-gray-400 hover:text-green-600 hover:bg-green-50 transition-colors" title="Approve"><CheckCircle className="w-4 h-4" /></button>
                              <button onClick={() => updateStatus(a._id, 'Rejected')} className="p-1.5 rounded-lg text-gray-400 hover:text-red-600 hover:bg-red-50 transition-colors" title="Reject"><XCircle className="w-4 h-4" /></button>
                            </>
                          )}
                          <button onClick={() => deleteAppointment(a._id)} className="p-1.5 rounded-lg text-gray-400 hover:text-red-600 hover:bg-red-50 transition-colors" title="Delete"><Trash2 className="w-4 h-4" /></button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {/* View Modal */}
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
                <div><p className="text-xs text-gray-400 uppercase font-semibold">Notes</p><p className="text-gray-600 text-sm mt-0.5">{selected.notes || 'None'}</p></div>
              </div>
              <div className="flex gap-3 mt-6">
                <button onClick={closeModal} className="flex-1 border border-gray-200 text-gray-700 py-2.5 rounded-xl text-sm font-medium hover:bg-gray-50 transition-colors">Close</button>
                {selected.status === 'Pending' && (
                  <>
                    <button onClick={() => updateStatus(selected._id, 'Rejected')} className="flex-1 bg-red-600 hover:bg-red-700 text-white py-2.5 rounded-xl text-sm font-semibold transition-colors">Reject</button>
                    <button onClick={() => updateStatus(selected._id, 'Approved')} className="flex-1 bg-green-600 hover:bg-green-700 text-white py-2.5 rounded-xl text-sm font-semibold transition-colors">Approve</button>
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
