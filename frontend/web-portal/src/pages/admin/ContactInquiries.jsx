import React, { useState, useEffect } from 'react';
import { Eye, X, Trash2, RefreshCw } from 'lucide-react';

const API_BASE = 'http://localhost:5000/api/inquiries';

export default function ContactInquiries() {
  const [inquiries, setInquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selected, setSelected] = useState(null);

  const fetchInquiries = async () => {
    try {
      setLoading(true);
      setError('');
      const res = await fetch(API_BASE);
      if (!res.ok) throw new Error('Failed to fetch inquiries');
      const data = await res.json();
      setInquiries(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchInquiries(); }, []);

  const openView = async (inq) => {
    setSelected(inq);
    if (!inq.read) {
      try {
        const res = await fetch(`${API_BASE}/${inq._id}/read`, { method: 'PUT' });
        if (res.ok) {
          const updated = await res.json();
          setInquiries(prev => prev.map(i => i._id === inq._id ? updated : i));
          setSelected(updated);
        }
      } catch (err) {
        console.error('Failed to mark as read', err);
      }
    }
  };

  const closeModal = () => setSelected(null);

  const deleteInquiry = async (id) => {
    if (!window.confirm('Are you sure you want to delete this inquiry?')) return;
    try {
      await fetch(`${API_BASE}/${id}`, { method: 'DELETE' });
      setInquiries(prev => prev.filter(i => i._id !== id));
      closeModal();
    } catch (err) {
      alert('Failed to delete inquiry');
    }
  };

  const unreadCount = inquiries.filter(i => !i.read).length;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Contact Inquiries</h2>
          <p className="text-sm text-gray-500 mt-1">
            View and manage contact form submissions from the farming community.
            {unreadCount > 0 && <span className="ml-2 px-2 py-0.5 bg-orange-100 text-orange-700 text-xs font-semibold rounded-full">{unreadCount} unread</span>}
          </p>
        </div>
        <button
          onClick={fetchInquiries}
          className="flex items-center gap-2 px-4 py-2 text-sm bg-gray-100 hover:bg-gray-200 rounded-xl transition-colors"
          title="Refresh"
        >
          <RefreshCw className="w-4 h-4" />
          Refresh
        </button>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 rounded-xl p-4 text-sm">
          ⚠ {error} — Make sure the backend server is running.
        </div>
      )}

      {loading ? (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-12 flex justify-center">
          <div className="w-8 h-8 border-4 border-teal-600 border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          {inquiries.length === 0 ? (
            <p className="p-10 text-center text-gray-400">No inquiries yet.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-gray-50 text-left text-gray-500 text-xs uppercase tracking-wide">
                    <th className="px-6 py-3">Name</th>
                    <th className="px-6 py-3 hidden sm:table-cell">Email</th>
                    <th className="px-6 py-3 hidden md:table-cell">Subject</th>
                    <th className="px-6 py-3 hidden lg:table-cell">Date</th>
                    <th className="px-6 py-3">Status</th>
                    <th className="px-6 py-3 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {inquiries.map((inq) => (
                    <tr key={inq._id} className={`transition-colors hover:bg-gray-50 ${!inq.read ? 'bg-orange-50/50' : ''}`}>
                      <td className="px-6 py-4">
                        <span className={`font-medium ${!inq.read ? 'text-gray-900' : 'text-gray-600'}`}>{inq.name}</span>
                        {!inq.read && <span className="ml-2 inline-block w-2 h-2 rounded-full bg-orange-500"></span>}
                      </td>
                      <td className="px-6 py-4 text-gray-500 hidden sm:table-cell">{inq.email}</td>
                      <td className="px-6 py-4 text-gray-600 hidden md:table-cell max-w-xs truncate">{inq.subject}</td>
                      <td className="px-6 py-4 text-gray-500 hidden lg:table-cell">{new Date(inq.createdAt).toLocaleDateString()}</td>
                      <td className="px-6 py-4">
                        <span className={`px-2.5 py-0.5 text-xs font-medium rounded-full ${inq.read ? 'bg-gray-100 text-gray-600' : 'bg-orange-100 text-orange-700'}`}>
                          {inq.read ? 'Read' : 'Unread'}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button onClick={() => openView(inq)} className="p-1.5 rounded-lg text-gray-400 hover:text-blue-600 hover:bg-blue-50 transition-colors" title="View"><Eye className="w-4 h-4" /></button>
                          <button onClick={() => deleteInquiry(inq._id)} className="p-1.5 rounded-lg text-gray-400 hover:text-red-600 hover:bg-red-50 transition-colors" title="Delete"><Trash2 className="w-4 h-4" /></button>
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

      {selected && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg">
            <div className="p-6">
              <div className="flex items-center justify-between mb-5">
                <h3 className="text-lg font-bold text-gray-900">Inquiry Details</h3>
                <button onClick={closeModal} className="text-gray-400 hover:text-gray-600"><X className="w-5 h-5" /></button>
              </div>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div><p className="text-xs text-gray-400 uppercase font-semibold">Name</p><p className="text-gray-900 font-medium mt-0.5">{selected.name}</p></div>
                  <div><p className="text-xs text-gray-400 uppercase font-semibold">Date</p><p className="text-gray-600 mt-0.5">{new Date(selected.createdAt).toLocaleDateString()}</p></div>
                </div>
                <div><p className="text-xs text-gray-400 uppercase font-semibold">Email</p><p className="text-teal-600 mt-0.5"><a href={`mailto:${selected.email}`}>{selected.email}</a></p></div>
                <div><p className="text-xs text-gray-400 uppercase font-semibold">Subject</p><p className="text-gray-900 font-medium mt-0.5">{selected.subject}</p></div>
                <div>
                  <p className="text-xs text-gray-400 uppercase font-semibold">Message</p>
                  <div className="mt-1.5 bg-gray-50 rounded-xl p-4 text-sm text-gray-700 leading-relaxed">{selected.message}</div>
                </div>
              </div>
              <div className="flex gap-3 mt-6">
                <button onClick={closeModal} className="flex-1 border border-gray-200 text-gray-700 py-2.5 rounded-xl text-sm font-medium hover:bg-gray-50 transition-colors">Close</button>
                <a href={`mailto:${selected.email}?subject=Re: ${encodeURIComponent(selected.subject)}`} className="flex-1 bg-teal-600 hover:bg-teal-700 text-white py-2.5 rounded-xl text-sm font-semibold transition-colors text-center">
                  Reply via Email
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
