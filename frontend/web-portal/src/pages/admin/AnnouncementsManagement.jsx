import { API_BASE_URL } from '../../config';
import React, { useState, useEffect } from 'react';
import { Plus, Pencil, Trash2, X, Eye, Loader2, AlertCircle } from 'lucide-react';

const API_BASE = `${API_BASE_URL}/announcements`;

const emptyForm = { title: '', date: '', status: 'Active', content: '', category: 'General' };

const CATEGORIES = [
  'General',
  'Vaccination Program',
  'Awareness Program',
  'Farmer Service',
  'Breeding Service',
];

const statusBadge = (status) => {
  const map = {
    Active: 'bg-green-100 text-green-700',
    Expired: 'bg-gray-100 text-gray-600',
  };
  return (
    <span className={`px-2.5 py-0.5 text-xs font-medium rounded-full ${map[status] || 'bg-gray-100 text-gray-600'}`}>
      {status}
    </span>
  );
};

// Get auth token from localStorage (login stores full user object under 'user')
const getToken = () => {
  try {
    const user = JSON.parse(localStorage.getItem('user'));
    return user?.token || null;
  } catch {
    return null;
  }
};

export default function AnnouncementsManagement() {
  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [modal, setModal] = useState(null);
  const [selected, setSelected] = useState(null);
  const [form, setForm] = useState(emptyForm);

  // Fetch all announcements (admin view — includes expired)
  const fetchAnnouncements = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await fetch(`${API_BASE}/admin/all`, {
        headers: { Authorization: `Bearer ${getToken()}` },
      });
      if (!res.ok) throw new Error('Failed to load announcements');
      const data = await res.json();
      setAnnouncements(data);
    } catch (err) {
      setError(err.message || 'Could not connect to server.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAnnouncements();
  }, []);

  const openAdd    = () => { setForm(emptyForm); setModal('add'); };
  const openEdit   = (a) => { setSelected(a); setForm({ title: a.title, date: a.date, status: a.status, content: a.content, category: a.category || 'General' }); setModal('edit'); };
  const openDelete = (a) => { setSelected(a); setModal('delete'); };
  const openView   = (a) => { setSelected(a); setModal('view'); };
  const closeModal = () => { setModal(null); setSelected(null); setError(''); };

  const handleAdd = async () => {
    if (!form.title.trim() || !form.date || !form.content.trim()) {
      setError('Title, date, and content are required.');
      return;
    }
    setSaving(true);
    setError('');
    try {
      const res = await fetch(API_BASE, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${getToken()}`,
        },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Failed to create');
      setAnnouncements((prev) => [data, ...prev]);
      closeModal();
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  const handleEdit = async () => {
    if (!form.title.trim() || !form.date || !form.content.trim()) {
      setError('Title, date, and content are required.');
      return;
    }
    setSaving(true);
    setError('');
    try {
      const res = await fetch(`${API_BASE}/${selected._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${getToken()}`,
        },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Failed to update');
      setAnnouncements((prev) => prev.map((a) => (a._id === selected._id ? data : a)));
      closeModal();
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    setSaving(true);
    setError('');
    try {
      const res = await fetch(`${API_BASE}/${selected._id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${getToken()}` },
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Failed to delete');
      setAnnouncements((prev) => prev.filter((a) => a._id !== selected._id));
      closeModal();
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Announcements</h2>
          <p className="text-sm text-gray-500 mt-1">Manage notices and announcements for the farming community.</p>
        </div>
        <button
          onClick={openAdd}
          className="inline-flex items-center gap-2 bg-teal-600 hover:bg-teal-700 text-white px-4 py-2.5 rounded-xl text-sm font-semibold transition-colors shadow-sm"
        >
          <Plus className="w-4 h-4" /> Add Announcement
        </button>
      </div>

      {/* Global error banner */}
      {error && !modal && (
        <div className="flex items-center gap-2 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 text-left text-gray-500 text-xs uppercase tracking-wide">
                <th className="px-6 py-3">Title</th>
                <th className="px-6 py-3 hidden sm:table-cell">Date</th>
                <th className="px-6 py-3 hidden md:table-cell">Category</th>
                <th className="px-6 py-3">Status</th>
                <th className="px-6 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {loading ? (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-gray-400">
                    <Loader2 className="w-6 h-6 animate-spin mx-auto mb-2" />
                    Loading announcements…
                  </td>
                </tr>
              ) : announcements.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-gray-400">
                    No announcements yet. Click "+ Add Announcement" to create one.
                  </td>
                </tr>
              ) : (
                announcements.map((a) => (
                  <tr key={a._id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 font-medium text-gray-900 max-w-xs">{a.title}</td>
                    <td className="px-6 py-4 text-gray-500 hidden sm:table-cell">{a.date}</td>
                    <td className="px-6 py-4 text-gray-500 hidden md:table-cell">{a.category}</td>
                    <td className="px-6 py-4">{statusBadge(a.status)}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-2">
                        <button onClick={() => openView(a)} className="p-1.5 rounded-lg text-gray-400 hover:text-blue-600 hover:bg-blue-50 transition-colors" title="View"><Eye className="w-4 h-4" /></button>
                        <button onClick={() => openEdit(a)} className="p-1.5 rounded-lg text-gray-400 hover:text-teal-600 hover:bg-teal-50 transition-colors" title="Edit"><Pencil className="w-4 h-4" /></button>
                        <button onClick={() => openDelete(a)} className="p-1.5 rounded-lg text-gray-400 hover:text-red-600 hover:bg-red-50 transition-colors" title="Delete"><Trash2 className="w-4 h-4" /></button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modals */}
      {modal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg">

            {/* View Modal */}
            {modal === 'view' && selected && (
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-bold text-gray-900">Announcement Details</h3>
                  <button onClick={closeModal} className="text-gray-400 hover:text-gray-600"><X className="w-5 h-5" /></button>
                </div>
                <div className="space-y-3">
                  <div><p className="text-xs text-gray-400 uppercase font-semibold">Title</p><p className="text-gray-900 font-semibold mt-0.5">{selected.title}</p></div>
                  <div className="flex gap-6">
                    <div><p className="text-xs text-gray-400 uppercase font-semibold">Date</p><p className="text-gray-600 mt-0.5">{selected.date}</p></div>
                    <div><p className="text-xs text-gray-400 uppercase font-semibold">Status</p><div className="mt-0.5">{statusBadge(selected.status)}</div></div>
                    <div><p className="text-xs text-gray-400 uppercase font-semibold">Category</p><p className="text-gray-600 mt-0.5">{selected.category}</p></div>
                  </div>
                  <div><p className="text-xs text-gray-400 uppercase font-semibold">Content</p><p className="text-gray-600 text-sm mt-0.5 leading-relaxed">{selected.content}</p></div>
                </div>
                <button onClick={closeModal} className="mt-5 w-full border border-gray-200 text-gray-700 py-2.5 rounded-xl text-sm font-medium hover:bg-gray-50 transition-colors">Close</button>
              </div>
            )}

            {/* Add / Edit Modal */}
            {(modal === 'add' || modal === 'edit') && (
              <div className="p-6">
                <div className="flex items-center justify-between mb-5">
                  <h3 className="text-lg font-bold text-gray-900">{modal === 'add' ? 'Add Announcement' : 'Edit Announcement'}</h3>
                  <button onClick={closeModal} className="text-gray-400 hover:text-gray-600"><X className="w-5 h-5" /></button>
                </div>

                {error && (
                  <div className="flex items-center gap-2 bg-red-50 border border-red-200 text-red-700 px-4 py-2.5 rounded-xl text-sm mb-4">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{error}</span>
                  </div>
                )}

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Title</label>
                    <input
                      value={form.title}
                      onChange={(e) => setForm({ ...form, title: e.target.value })}
                      className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                      placeholder="Announcement title"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1">Date</label>
                      <input
                        type="date"
                        value={form.date}
                        onChange={(e) => setForm({ ...form, date: e.target.value })}
                        className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1">Status</label>
                      <select
                        value={form.status}
                        onChange={(e) => setForm({ ...form, status: e.target.value })}
                        className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 bg-white"
                      >
                        <option>Active</option>
                        <option>Expired</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Category</label>
                    <select
                      value={form.category}
                      onChange={(e) => setForm({ ...form, category: e.target.value })}
                      className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 bg-white"
                    >
                      {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Content</label>
                    <textarea
                      rows="4"
                      value={form.content}
                      onChange={(e) => setForm({ ...form, content: e.target.value })}
                      className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 resize-none"
                      placeholder="Announcement details..."
                    />
                  </div>
                </div>
                <div className="flex gap-3 mt-6">
                  <button onClick={closeModal} className="flex-1 border border-gray-200 text-gray-700 py-2.5 rounded-xl text-sm font-medium hover:bg-gray-50 transition-colors">Cancel</button>
                  <button
                    onClick={modal === 'add' ? handleAdd : handleEdit}
                    disabled={saving}
                    className="flex-1 bg-teal-600 hover:bg-teal-700 disabled:opacity-60 text-white py-2.5 rounded-xl text-sm font-semibold transition-colors inline-flex items-center justify-center gap-2"
                  >
                    {saving && <Loader2 className="w-4 h-4 animate-spin" />}
                    {modal === 'add' ? 'Add Announcement' : 'Save Changes'}
                  </button>
                </div>
              </div>
            )}

            {/* Delete Modal */}
            {modal === 'delete' && selected && (
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-bold text-gray-900">Delete Announcement</h3>
                  <button onClick={closeModal} className="text-gray-400 hover:text-gray-600"><X className="w-5 h-5" /></button>
                </div>
                {error && (
                  <div className="flex items-center gap-2 bg-red-50 border border-red-200 text-red-700 px-4 py-2.5 rounded-xl text-sm mb-4">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{error}</span>
                  </div>
                )}
                <p className="text-gray-600 text-sm">Are you sure you want to delete <strong>"{selected.title}"</strong>? This action cannot be undone.</p>
                <div className="flex gap-3 mt-6">
                  <button onClick={closeModal} className="flex-1 border border-gray-200 text-gray-700 py-2.5 rounded-xl text-sm font-medium hover:bg-gray-50 transition-colors">Cancel</button>
                  <button
                    onClick={handleDelete}
                    disabled={saving}
                    className="flex-1 bg-red-600 hover:bg-red-700 disabled:opacity-60 text-white py-2.5 rounded-xl text-sm font-semibold transition-colors inline-flex items-center justify-center gap-2"
                  >
                    {saving && <Loader2 className="w-4 h-4 animate-spin" />}
                    Delete
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
