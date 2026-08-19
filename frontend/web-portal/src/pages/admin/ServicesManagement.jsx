import React, { useState, useEffect } from 'react';
import { Plus, Pencil, Trash2, X, Eye, Loader2, AlertCircle } from 'lucide-react';

const API_BASE = 'http://localhost:5000/api/services';

const CATEGORIES = [
  'Clinical Care',
  'Preventive Healthcare',
  'Emergency Response',
  'Livestock Development',
  'Tele-Veterinary Support',
  'Knowledge Hub',
  'Other',
];

const emptyForm = {
  icon: '',
  category: 'Clinical Care',
  title: '',
  description: '',
  fullOverview: '',
  keyPoints: '',        // stored as newline-separated string in the form, converted to array on submit
  targetAudience: '',
  location: '',
  actionText: 'Learn More',
  actionLink: '/contact',
  status: 'Active',
  order: 0,
};

const statusBadge = (status) => {
  const map = {
    Active: 'bg-green-100 text-green-700',
    Inactive: 'bg-gray-100 text-gray-600',
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

// Convert keyPoints array → newline-separated string for the textarea
const pointsToText = (arr) => (Array.isArray(arr) ? arr.join('\n') : '');
// Convert newline-separated string → cleaned array for the API
const textToPoints = (str) =>
  str
    .split('\n')
    .map((s) => s.trim())
    .filter(Boolean);

export default function ServicesManagement() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [modal, setModal] = useState(null); // null | 'add' | 'edit' | 'delete' | 'view'
  const [selected, setSelected] = useState(null);
  const [form, setForm] = useState(emptyForm);

  // ── Fetch all services (admin view — includes inactive) ───────────────────
  const fetchServices = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await fetch(`${API_BASE}/admin/all`, {
        headers: { Authorization: `Bearer ${getToken()}` },
      });
      if (!res.ok) throw new Error('Failed to load services');
      const data = await res.json();
      setServices(data);
    } catch (err) {
      setError(err.message || 'Could not connect to server.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  // ── Modal helpers ──────────────────────────────────────────────────────────
  const openAdd = () => { setForm(emptyForm); setModal('add'); };
  const openEdit = (svc) => {
    setSelected(svc);
    setForm({
      icon: svc.icon || '',
      category: svc.category || 'Clinical Care',
      title: svc.title || '',
      description: svc.description || '',
      fullOverview: svc.fullOverview || '',
      keyPoints: pointsToText(svc.keyPoints),
      targetAudience: svc.targetAudience || '',
      location: svc.location || '',
      actionText: svc.actionText || 'Learn More',
      actionLink: svc.actionLink || '/contact',
      status: svc.status || 'Active',
      order: svc.order ?? 0,
    });
    setModal('edit');
  };
  const openDelete = (svc) => { setSelected(svc); setModal('delete'); };
  const openView   = (svc) => { setSelected(svc); setModal('view'); };
  const closeModal = () => { setModal(null); setSelected(null); setError(''); };

  // Build the payload — converts keyPoints textarea back to array
  const buildPayload = () => ({
    ...form,
    keyPoints: textToPoints(form.keyPoints),
    order: Number(form.order) || 0,
  });

  // ── CRUD handlers ──────────────────────────────────────────────────────────
  const handleAdd = async () => {
    if (!form.title.trim() || !form.description.trim() || !form.category) {
      setError('Icon, Category, Title, and Description are required.');
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
        body: JSON.stringify(buildPayload()),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Failed to create service');
      setServices((prev) => [data, ...prev]);
      closeModal();
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  const handleEdit = async () => {
    if (!form.title.trim() || !form.description.trim() || !form.category) {
      setError('Icon, Category, Title, and Description are required.');
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
        body: JSON.stringify(buildPayload()),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Failed to update service');
      setServices((prev) => prev.map((s) => (s._id === selected._id ? data : s)));
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
      if (!res.ok) throw new Error(data.message || 'Failed to delete service');
      setServices((prev) => prev.filter((s) => s._id !== selected._id));
      closeModal();
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  // ── Shared input class ─────────────────────────────────────────────────────
  const inputCls = 'w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500';

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Services</h2>
          <p className="text-sm text-gray-500 mt-1">Manage veterinary services listed on the portal.</p>
        </div>
        <button
          onClick={openAdd}
          className="inline-flex items-center gap-2 bg-teal-600 hover:bg-teal-700 text-white px-4 py-2.5 rounded-xl text-sm font-semibold transition-colors shadow-sm"
        >
          <Plus className="w-4 h-4" /> Add Service
        </button>
      </div>

      {/* Global error banner (outside modal) */}
      {error && !modal && (
        <div className="flex items-center gap-2 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 text-left text-gray-500 text-xs uppercase tracking-wide">
                <th className="px-6 py-3">Icon</th>
                <th className="px-6 py-3">Title</th>
                <th className="px-6 py-3 hidden sm:table-cell">Category</th>
                <th className="px-6 py-3 hidden md:table-cell">Description</th>
                <th className="px-6 py-3">Status</th>
                <th className="px-6 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {loading ? (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-gray-400">
                    <Loader2 className="w-6 h-6 animate-spin mx-auto mb-2" />
                    Loading services…
                  </td>
                </tr>
              ) : services.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-gray-400">
                    No services yet. Click "+ Add Service" to create one.
                  </td>
                </tr>
              ) : (
                services.map((svc) => (
                  <tr key={svc._id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 text-2xl">{svc.icon || '🩺'}</td>
                    <td className="px-6 py-4 font-medium text-gray-900">{svc.title}</td>
                    <td className="px-6 py-4 text-gray-500 hidden sm:table-cell">{svc.category}</td>
                    <td className="px-6 py-4 text-gray-500 hidden md:table-cell max-w-xs truncate">{svc.description}</td>
                    <td className="px-6 py-4">{statusBadge(svc.status)}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-2">
                        <button onClick={() => openView(svc)} className="p-1.5 rounded-lg text-gray-400 hover:text-blue-600 hover:bg-blue-50 transition-colors" title="View"><Eye className="w-4 h-4" /></button>
                        <button onClick={() => openEdit(svc)} className="p-1.5 rounded-lg text-gray-400 hover:text-teal-600 hover:bg-teal-50 transition-colors" title="Edit"><Pencil className="w-4 h-4" /></button>
                        <button onClick={() => openDelete(svc)} className="p-1.5 rounded-lg text-gray-400 hover:text-red-600 hover:bg-red-50 transition-colors" title="Delete"><Trash2 className="w-4 h-4" /></button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* ── Modals ─────────────────────────────────────────────────────────── */}
      {modal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg max-h-[90vh] overflow-y-auto">

            {/* ── View Modal ── */}
            {modal === 'view' && selected && (
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-bold text-gray-900">Service Details</h3>
                  <button onClick={closeModal} className="text-gray-400 hover:text-gray-600"><X className="w-5 h-5" /></button>
                </div>
                <div className="space-y-3">
                  <div className="text-center py-2">
                    <div className="text-5xl mb-2">{selected.icon || '🩺'}</div>
                    <span className="inline-block text-xs font-semibold px-3 py-1 bg-teal-50 text-teal-700 rounded-full border border-teal-100 mb-2">{selected.category}</span>
                    <h4 className="text-xl font-bold text-gray-900">{selected.title}</h4>
                  </div>
                  <div><p className="text-xs text-gray-400 uppercase font-semibold">Description</p><p className="text-gray-600 text-sm mt-0.5">{selected.description}</p></div>
                  {selected.fullOverview && <div><p className="text-xs text-gray-400 uppercase font-semibold">Full Overview</p><p className="text-gray-600 text-sm mt-0.5 leading-relaxed">{selected.fullOverview}</p></div>}
                  {selected.keyPoints?.length > 0 && (
                    <div>
                      <p className="text-xs text-gray-400 uppercase font-semibold mb-1">Key Points</p>
                      <ul className="list-disc list-inside space-y-1">
                        {selected.keyPoints.map((pt, i) => <li key={i} className="text-sm text-gray-600">{pt}</li>)}
                      </ul>
                    </div>
                  )}
                  {selected.targetAudience && <div><p className="text-xs text-gray-400 uppercase font-semibold">Target Audience</p><p className="text-gray-600 text-sm mt-0.5">{selected.targetAudience}</p></div>}
                  {selected.location && <div><p className="text-xs text-gray-400 uppercase font-semibold">Location</p><p className="text-gray-600 text-sm mt-0.5">{selected.location}</p></div>}
                  <div className="flex gap-4">
                    <div><p className="text-xs text-gray-400 uppercase font-semibold">Status</p><div className="mt-0.5">{statusBadge(selected.status)}</div></div>
                    <div><p className="text-xs text-gray-400 uppercase font-semibold">Action Button</p><p className="text-gray-600 text-sm mt-0.5">{selected.actionText} → {selected.actionLink}</p></div>
                  </div>
                </div>
                <button onClick={closeModal} className="mt-5 w-full border border-gray-200 text-gray-700 py-2.5 rounded-xl text-sm font-medium hover:bg-gray-50 transition-colors">Close</button>
              </div>
            )}

            {/* ── Add / Edit Modal ── */}
            {(modal === 'add' || modal === 'edit') && (
              <div className="p-6">
                <div className="flex items-center justify-between mb-5">
                  <h3 className="text-lg font-bold text-gray-900">{modal === 'add' ? 'Add New Service' : 'Edit Service'}</h3>
                  <button onClick={closeModal} className="text-gray-400 hover:text-gray-600"><X className="w-5 h-5" /></button>
                </div>

                {error && (
                  <div className="flex items-center gap-2 bg-red-50 border border-red-200 text-red-700 px-4 py-2.5 rounded-xl text-sm mb-4">
                    <AlertCircle className="w-4 h-4 shrink-0" /><span>{error}</span>
                  </div>
                )}

                <div className="space-y-4">
                  {/* Row: Icon + Category */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1">Icon (Emoji)</label>
                      <input value={form.icon} onChange={(e) => setForm({ ...form, icon: e.target.value })} className={inputCls} placeholder="e.g. 🩺" />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1">Category <span className="text-red-500">*</span></label>
                      <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} className={`${inputCls} bg-white`}>
                        {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
                      </select>
                    </div>
                  </div>

                  {/* Title */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Title <span className="text-red-500">*</span></label>
                    <input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} className={inputCls} placeholder="Service title" />
                  </div>

                  {/* Description */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Short Description <span className="text-red-500">*</span></label>
                    <textarea rows="2" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} className={`${inputCls} resize-none`} placeholder="Brief overview shown on the service card…" />
                  </div>

                  {/* Full Overview */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Full Overview</label>
                    <textarea rows="3" value={form.fullOverview} onChange={(e) => setForm({ ...form, fullOverview: e.target.value })} className={`${inputCls} resize-none`} placeholder="Detailed description shown in the modal…" />
                  </div>

                  {/* Key Points */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Key Points <span className="text-gray-400 font-normal">(one per line)</span></label>
                    <textarea rows="4" value={form.keyPoints} onChange={(e) => setForm({ ...form, keyPoints: e.target.value })} className={`${inputCls} resize-none`} placeholder={"Routine health examinations\nGovernment-approved prescriptions\nOn-site visits available"} />
                  </div>

                  {/* Target Audience + Location */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1">Target Audience</label>
                      <input value={form.targetAudience} onChange={(e) => setForm({ ...form, targetAudience: e.target.value })} className={inputCls} placeholder="e.g. Dairy farmers…" />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1">Service Location</label>
                      <input value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} className={inputCls} placeholder="e.g. Vet Office & Field Visits" />
                    </div>
                  </div>

                  {/* Action Button */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1">Action Button Text</label>
                      <input value={form.actionText} onChange={(e) => setForm({ ...form, actionText: e.target.value })} className={inputCls} placeholder="e.g. Book Appointment" />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1">Action Button Link</label>
                      <input value={form.actionLink} onChange={(e) => setForm({ ...form, actionLink: e.target.value })} className={inputCls} placeholder="e.g. /appointments" />
                    </div>
                  </div>

                  {/* Status + Order */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1">Status</label>
                      <select value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })} className={`${inputCls} bg-white`}>
                        <option>Active</option>
                        <option>Inactive</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1">Display Order</label>
                      <input type="number" min="0" value={form.order} onChange={(e) => setForm({ ...form, order: e.target.value })} className={inputCls} placeholder="0" />
                    </div>
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
                    {modal === 'add' ? 'Add Service' : 'Save Changes'}
                  </button>
                </div>
              </div>
            )}

            {/* ── Delete Modal ── */}
            {modal === 'delete' && selected && (
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-bold text-gray-900">Delete Service</h3>
                  <button onClick={closeModal} className="text-gray-400 hover:text-gray-600"><X className="w-5 h-5" /></button>
                </div>
                {error && (
                  <div className="flex items-center gap-2 bg-red-50 border border-red-200 text-red-700 px-4 py-2.5 rounded-xl text-sm mb-4">
                    <AlertCircle className="w-4 h-4 shrink-0" /><span>{error}</span>
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
