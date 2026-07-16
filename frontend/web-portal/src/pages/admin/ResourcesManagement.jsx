import React, { useState } from 'react';
import { Plus, Pencil, Trash2, X, Eye } from 'lucide-react';

const initialResources = [
  { id: 1, title: 'Dairy Farming Best Practices', category: 'Dairy Farming', type: 'Guide', date: '2026-06-01' },
  { id: 2, title: 'Vaccination Schedules 2026', category: 'Vaccination & Prevention', type: 'PDF', date: '2026-05-15' },
  { id: 3, title: 'Common Animal Diseases & Symptoms', category: 'Animal Health', type: 'Article', date: '2026-04-20' },
  { id: 4, title: 'Farm Record Keeping Templates', category: 'Farm Management', type: 'Template', date: '2026-03-10' },
];

const emptyForm = { title: '', category: 'Dairy Farming', type: 'Guide', date: '' };
const categories = ['Dairy Farming', 'Livestock Management', 'Vaccination & Prevention', 'Animal Health', 'Farm Management', 'Government Programs'];
const types = ['Guide', 'PDF', 'Article', 'Template', 'Video'];

const typeBadge = (type) => {
  const map = {
    Guide: 'bg-teal-100 text-teal-700',
    PDF: 'bg-red-100 text-red-700',
    Article: 'bg-blue-100 text-blue-700',
    Template: 'bg-orange-100 text-orange-700',
    Video: 'bg-purple-100 text-purple-700',
  };
  return <span className={`px-2.5 py-0.5 text-xs font-medium rounded-full ${map[type] || 'bg-gray-100 text-gray-600'}`}>{type}</span>;
};

export default function ResourcesManagement() {
  const [resources, setResources] = useState(initialResources);
  const [modal, setModal] = useState(null);
  const [selected, setSelected] = useState(null);
  const [form, setForm] = useState(emptyForm);

  const openAdd = () => { setForm(emptyForm); setModal('add'); };
  const openEdit = (r) => { setSelected(r); setForm({ title: r.title, category: r.category, type: r.type, date: r.date }); setModal('edit'); };
  const openDelete = (r) => { setSelected(r); setModal('delete'); };
  const openView = (r) => { setSelected(r); setModal('view'); };
  const closeModal = () => { setModal(null); setSelected(null); };

  const handleAdd = () => {
    if (!form.title.trim()) return;
    setResources(prev => [{ id: Date.now(), ...form }, ...prev]);
    closeModal();
  };

  const handleEdit = () => {
    setResources(prev => prev.map(r => r.id === selected.id ? { ...r, ...form } : r));
    closeModal();
  };

  const handleDelete = () => {
    setResources(prev => prev.filter(r => r.id !== selected.id));
    closeModal();
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Resources</h2>
          <p className="text-sm text-gray-500 mt-1">Manage educational resources and downloadable materials.</p>
        </div>
        <button onClick={openAdd} className="inline-flex items-center gap-2 bg-teal-600 hover:bg-teal-700 text-white px-4 py-2.5 rounded-xl text-sm font-semibold transition-colors shadow-sm">
          <Plus className="w-4 h-4" /> Add Resource
        </button>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 text-left text-gray-500 text-xs uppercase tracking-wide">
                <th className="px-6 py-3">Title</th>
                <th className="px-6 py-3 hidden md:table-cell">Category</th>
                <th className="px-6 py-3 hidden sm:table-cell">Type</th>
                <th className="px-6 py-3 hidden lg:table-cell">Date</th>
                <th className="px-6 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {resources.map((r) => (
                <tr key={r.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 font-medium text-gray-900 max-w-xs">{r.title}</td>
                  <td className="px-6 py-4 text-gray-500 hidden md:table-cell">{r.category}</td>
                  <td className="px-6 py-4 hidden sm:table-cell">{typeBadge(r.type)}</td>
                  <td className="px-6 py-4 text-gray-500 hidden lg:table-cell">{r.date}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-2">
                      <button onClick={() => openView(r)} className="p-1.5 rounded-lg text-gray-400 hover:text-blue-600 hover:bg-blue-50 transition-colors" title="View"><Eye className="w-4 h-4" /></button>
                      <button onClick={() => openEdit(r)} className="p-1.5 rounded-lg text-gray-400 hover:text-teal-600 hover:bg-teal-50 transition-colors" title="Edit"><Pencil className="w-4 h-4" /></button>
                      <button onClick={() => openDelete(r)} className="p-1.5 rounded-lg text-gray-400 hover:text-red-600 hover:bg-red-50 transition-colors" title="Delete"><Trash2 className="w-4 h-4" /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {modal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg">
            {modal === 'view' && selected && (
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-bold text-gray-900">Resource Details</h3>
                  <button onClick={closeModal} className="text-gray-400 hover:text-gray-600"><X className="w-5 h-5" /></button>
                </div>
                <div className="space-y-3">
                  <div><p className="text-xs text-gray-400 uppercase font-semibold">Title</p><p className="text-gray-900 font-semibold mt-0.5">{selected.title}</p></div>
                  <div className="grid grid-cols-3 gap-4">
                    <div><p className="text-xs text-gray-400 uppercase font-semibold">Category</p><p className="text-gray-600 text-sm mt-0.5">{selected.category}</p></div>
                    <div><p className="text-xs text-gray-400 uppercase font-semibold">Type</p><div className="mt-0.5">{typeBadge(selected.type)}</div></div>
                    <div><p className="text-xs text-gray-400 uppercase font-semibold">Date</p><p className="text-gray-600 text-sm mt-0.5">{selected.date}</p></div>
                  </div>
                </div>
                <button onClick={closeModal} className="mt-5 w-full border border-gray-200 text-gray-700 py-2.5 rounded-xl text-sm font-medium hover:bg-gray-50 transition-colors">Close</button>
              </div>
            )}

            {(modal === 'add' || modal === 'edit') && (
              <div className="p-6">
                <div className="flex items-center justify-between mb-5">
                  <h3 className="text-lg font-bold text-gray-900">{modal === 'add' ? 'Add Resource' : 'Edit Resource'}</h3>
                  <button onClick={closeModal} className="text-gray-400 hover:text-gray-600"><X className="w-5 h-5" /></button>
                </div>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Title</label>
                    <input value={form.title} onChange={e => setForm({...form, title: e.target.value})} className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500" placeholder="Resource title" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1">Category</label>
                      <select value={form.category} onChange={e => setForm({...form, category: e.target.value})} className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 bg-white">
                        {categories.map(c => <option key={c}>{c}</option>)}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1">Type</label>
                      <select value={form.type} onChange={e => setForm({...form, type: e.target.value})} className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 bg-white">
                        {types.map(t => <option key={t}>{t}</option>)}
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Date</label>
                    <input type="date" value={form.date} onChange={e => setForm({...form, date: e.target.value})} className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500" />
                  </div>
                </div>
                <div className="flex gap-3 mt-6">
                  <button onClick={closeModal} className="flex-1 border border-gray-200 text-gray-700 py-2.5 rounded-xl text-sm font-medium hover:bg-gray-50 transition-colors">Cancel</button>
                  <button onClick={modal === 'add' ? handleAdd : handleEdit} className="flex-1 bg-teal-600 hover:bg-teal-700 text-white py-2.5 rounded-xl text-sm font-semibold transition-colors">
                    {modal === 'add' ? 'Add Resource' : 'Save Changes'}
                  </button>
                </div>
              </div>
            )}

            {modal === 'delete' && selected && (
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-bold text-gray-900">Delete Resource</h3>
                  <button onClick={closeModal} className="text-gray-400 hover:text-gray-600"><X className="w-5 h-5" /></button>
                </div>
                <p className="text-gray-600 text-sm">Are you sure you want to delete <strong>"{selected.title}"</strong>? This action cannot be undone.</p>
                <div className="flex gap-3 mt-6">
                  <button onClick={closeModal} className="flex-1 border border-gray-200 text-gray-700 py-2.5 rounded-xl text-sm font-medium hover:bg-gray-50 transition-colors">Cancel</button>
                  <button onClick={handleDelete} className="flex-1 bg-red-600 hover:bg-red-700 text-white py-2.5 rounded-xl text-sm font-semibold transition-colors">Delete</button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
