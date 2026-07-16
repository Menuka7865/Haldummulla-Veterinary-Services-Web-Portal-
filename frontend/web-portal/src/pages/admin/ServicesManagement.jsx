import React, { useState } from 'react';
import { Plus, Pencil, Trash2, X, Eye } from 'lucide-react';

const initialServices = [
  { id: 1, icon: '🩺', title: 'General Health Checkups', description: 'Comprehensive physical examinations and diagnostic checks.' },
  { id: 2, icon: '💉', title: 'Vaccination Programs', description: 'Routine immunization campaigns and vaccination schedules.' },
  { id: 3, icon: '🚨', title: 'Emergency Care', description: 'Urgent response and immediate medical treatment.' },
  { id: 4, icon: '💬', title: 'Online Consultations', description: 'Professional veterinary advice through virtual consultations.' },
  { id: 5, icon: '📚', title: 'Educational Resources', description: 'Guides, husbandry tips, and preventative care articles.' },
];

const emptyForm = { icon: '', title: '', description: '' };

export default function ServicesManagement() {
  const [services, setServices] = useState(initialServices);
  const [modal, setModal] = useState(null); // null | 'add' | 'edit' | 'delete' | 'view'
  const [selectedService, setSelectedService] = useState(null);
  const [form, setForm] = useState(emptyForm);

  const openAdd = () => { setForm(emptyForm); setModal('add'); };
  const openEdit = (svc) => { setSelectedService(svc); setForm({ icon: svc.icon, title: svc.title, description: svc.description }); setModal('edit'); };
  const openDelete = (svc) => { setSelectedService(svc); setModal('delete'); };
  const openView = (svc) => { setSelectedService(svc); setModal('view'); };
  const closeModal = () => { setModal(null); setSelectedService(null); };

  const handleAdd = () => {
    if (!form.title.trim()) return;
    setServices(prev => [...prev, { id: Date.now(), ...form }]);
    closeModal();
  };

  const handleEdit = () => {
    setServices(prev => prev.map(s => s.id === selectedService.id ? { ...s, ...form } : s));
    closeModal();
  };

  const handleDelete = () => {
    setServices(prev => prev.filter(s => s.id !== selectedService.id));
    closeModal();
  };

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

      {/* Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 text-left text-gray-500 text-xs uppercase tracking-wide">
                <th className="px-6 py-3">Icon</th>
                <th className="px-6 py-3">Title</th>
                <th className="px-6 py-3 hidden md:table-cell">Description</th>
                <th className="px-6 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {services.map((svc) => (
                <tr key={svc.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 text-2xl">{svc.icon}</td>
                  <td className="px-6 py-4 font-medium text-gray-900">{svc.title}</td>
                  <td className="px-6 py-4 text-gray-500 hidden md:table-cell max-w-xs truncate">{svc.description}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-2">
                      <button onClick={() => openView(svc)} className="p-1.5 rounded-lg text-gray-400 hover:text-blue-600 hover:bg-blue-50 transition-colors" title="View"><Eye className="w-4 h-4" /></button>
                      <button onClick={() => openEdit(svc)} className="p-1.5 rounded-lg text-gray-400 hover:text-teal-600 hover:bg-teal-50 transition-colors" title="Edit"><Pencil className="w-4 h-4" /></button>
                      <button onClick={() => openDelete(svc)} className="p-1.5 rounded-lg text-gray-400 hover:text-red-600 hover:bg-red-50 transition-colors" title="Delete"><Trash2 className="w-4 h-4" /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modals */}
      {modal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md">
            {/* View Modal */}
            {modal === 'view' && selectedService && (
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-bold text-gray-900">Service Details</h3>
                  <button onClick={closeModal} className="text-gray-400 hover:text-gray-600"><X className="w-5 h-5" /></button>
                </div>
                <div className="text-center py-4">
                  <div className="text-5xl mb-3">{selectedService.icon}</div>
                  <h4 className="text-xl font-bold text-gray-900">{selectedService.title}</h4>
                  <p className="text-gray-500 text-sm mt-3">{selectedService.description}</p>
                </div>
                <button onClick={closeModal} className="mt-4 w-full border border-gray-200 text-gray-700 py-2.5 rounded-xl text-sm font-medium hover:bg-gray-50 transition-colors">Close</button>
              </div>
            )}

            {/* Add / Edit Modal */}
            {(modal === 'add' || modal === 'edit') && (
              <div className="p-6">
                <div className="flex items-center justify-between mb-5">
                  <h3 className="text-lg font-bold text-gray-900">{modal === 'add' ? 'Add New Service' : 'Edit Service'}</h3>
                  <button onClick={closeModal} className="text-gray-400 hover:text-gray-600"><X className="w-5 h-5" /></button>
                </div>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Icon (Emoji)</label>
                    <input value={form.icon} onChange={e => setForm({...form, icon: e.target.value})} className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500" placeholder="e.g. 🩺" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Title</label>
                    <input value={form.title} onChange={e => setForm({...form, title: e.target.value})} className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500" placeholder="Service title" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Description</label>
                    <textarea rows="3" value={form.description} onChange={e => setForm({...form, description: e.target.value})} className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 resize-none" placeholder="Short description..." />
                  </div>
                </div>
                <div className="flex gap-3 mt-6">
                  <button onClick={closeModal} className="flex-1 border border-gray-200 text-gray-700 py-2.5 rounded-xl text-sm font-medium hover:bg-gray-50 transition-colors">Cancel</button>
                  <button onClick={modal === 'add' ? handleAdd : handleEdit} className="flex-1 bg-teal-600 hover:bg-teal-700 text-white py-2.5 rounded-xl text-sm font-semibold transition-colors">
                    {modal === 'add' ? 'Add Service' : 'Save Changes'}
                  </button>
                </div>
              </div>
            )}

            {/* Delete Modal */}
            {modal === 'delete' && selectedService && (
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-bold text-gray-900">Delete Service</h3>
                  <button onClick={closeModal} className="text-gray-400 hover:text-gray-600"><X className="w-5 h-5" /></button>
                </div>
                <p className="text-gray-600 text-sm">Are you sure you want to delete <strong>"{selectedService.title}"</strong>? This action cannot be undone.</p>
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
