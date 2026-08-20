import { API_BASE_URL } from '../../config';
import React, { useState, useEffect } from 'react';
import { Plus, Pencil, Trash2, X, Eye, Loader2, AlertCircle } from 'lucide-react';

const API_BASE = `${API_BASE_URL}/resources`;

const getToken = () => {
  try {
    const user = JSON.parse(localStorage.getItem('user'));
    return user?.token || null;
  } catch {
    return null;
  }
};

const SECTIONS = ['featured', 'article', 'video', 'download'];

const sectionTitles = {
  featured: 'Featured Resources',
  article: 'Latest Articles',
  video: 'Learn Through Videos',
  download: 'Quick Downloads',
};

// Initial form states
const emptyFeatured = { title: '', icon: '🐄', description: '', fullContent: '', buttonLabel: 'Read More', status: 'Active', order: 0 };
const emptyArticle = { title: '', excerpt: '', fullContent: '', imageUrl: '', status: 'Active', order: 0 };
const emptyVideo = { title: '', duration: '5 min', videoUrl: '', status: 'Active', order: 0 };
const emptyDownload = { title: '', fileUrl: '', status: 'Active', order: 0 };

export default function ResourcesManagement() {
  const [resources, setResources] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  
  const [activeTab, setActiveTab] = useState('featured');
  const [modal, setModal] = useState(null); // 'add' | 'edit' | 'delete' | 'view'
  const [selected, setSelected] = useState(null);
  const [form, setForm] = useState({});

  const fetchResources = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await fetch(`${API_BASE}/admin/all`, {
        headers: { Authorization: `Bearer ${getToken()}` },
      });
      if (!res.ok) throw new Error('Failed to load resources');
      const data = await res.json();
      setResources(data);
    } catch (err) {
      setError(err.message || 'Could not connect to server.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchResources();
  }, []);

  const getEmptyForm = (section) => {
    if (section === 'featured') return { ...emptyFeatured };
    if (section === 'article') return { ...emptyArticle };
    if (section === 'video') return { ...emptyVideo };
    return { ...emptyDownload };
  };

  const openAdd = () => {
    setForm(getEmptyForm(activeTab));
    setModal('add');
  };

  const openEdit = (item) => {
    setSelected(item);
    setForm({
      title: item.title || '',
      status: item.status || 'Active',
      order: item.order ?? 0,
      icon: item.icon || '',
      description: item.description || '',
      fullContent: item.fullContent || '',
      buttonLabel: item.buttonLabel || '',
      excerpt: item.excerpt || '',
      imageUrl: item.imageUrl || '',
      duration: item.duration || '',
      videoUrl: item.videoUrl || '',
      fileUrl: item.fileUrl || '',
    });
    setModal('edit');
  };

  const openDelete = (item) => { setSelected(item); setModal('delete'); };
  const openView = (item) => { setSelected(item); setModal('view'); };
  const closeModal = () => { setModal(null); setSelected(null); setError(''); };

  const handleAdd = async () => {
    if (!form.title.trim()) {
      setError('Title is required.');
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
        body: JSON.stringify({ ...form, section: activeTab, order: Number(form.order) || 0 }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Failed to create resource');
      setResources([data, ...resources]);
      closeModal();
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  const handleEdit = async () => {
    if (!form.title.trim()) {
      setError('Title is required.');
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
        body: JSON.stringify({ ...form, order: Number(form.order) || 0 }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Failed to update resource');
      setResources(resources.map((r) => (r._id === selected._id ? data : r)));
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
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || 'Failed to delete resource');
      }
      setResources(resources.filter((r) => r._id !== selected._id));
      closeModal();
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  const statusBadge = (status) => {
    return status === 'Active' ? (
      <span className="px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-700">Active</span>
    ) : (
      <span className="px-2 py-1 text-xs font-medium rounded-full bg-gray-100 text-gray-600">Inactive</span>
    );
  };

  const currentList = resources.filter(r => r.section === activeTab);
  const inputCls = "w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500";

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Resources</h2>
          <p className="text-sm text-gray-500 mt-1">Manage educational materials across different sections.</p>
        </div>
        <button onClick={openAdd} className="inline-flex items-center gap-2 bg-teal-600 hover:bg-teal-700 text-white px-4 py-2.5 rounded-xl text-sm font-semibold transition-colors shadow-sm">
          <Plus className="w-4 h-4" /> Add {activeTab === 'featured' ? 'Resource' : activeTab === 'article' ? 'Article' : activeTab === 'video' ? 'Video' : 'Download'}
        </button>
      </div>

      {error && !modal && (
        <div className="flex items-center gap-2 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm">
          <AlertCircle className="w-4 h-4 shrink-0" /><span>{error}</span>
        </div>
      )}

      {/* Tabs */}
      <div className="border-b border-gray-200 flex overflow-x-auto no-scrollbar">
        {SECTIONS.map((sec) => (
          <button
            key={sec}
            onClick={() => setActiveTab(sec)}
            className={`whitespace-nowrap px-5 py-3 text-sm font-medium border-b-2 transition-colors ${
              activeTab === sec
                ? 'border-teal-600 text-teal-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            {sectionTitles[sec]}
          </button>
        ))}
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 text-left text-gray-500 text-xs uppercase tracking-wide">
                <th className="px-6 py-3">Title</th>
                <th className="px-6 py-3 hidden sm:table-cell">Details</th>
                <th className="px-6 py-3 hidden lg:table-cell">Status</th>
                <th className="px-6 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {loading ? (
                <tr><td colSpan={4} className="px-6 py-12 text-center text-gray-400"><Loader2 className="w-6 h-6 animate-spin mx-auto mb-2" />Loading...</td></tr>
              ) : currentList.length === 0 ? (
                <tr><td colSpan={4} className="px-6 py-12 text-center text-gray-400">No items found in {sectionTitles[activeTab]}.</td></tr>
              ) : (
                currentList.map((item) => (
                  <tr key={item._id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 font-medium text-gray-900 max-w-[200px] truncate">{item.title}</td>
                    <td className="px-6 py-4 text-gray-500 hidden sm:table-cell max-w-[200px] truncate">
                      {activeTab === 'featured' && item.description}
                      {activeTab === 'article' && item.excerpt}
                      {activeTab === 'video' && item.duration}
                      {activeTab === 'download' && item.fileUrl}
                    </td>
                    <td className="px-6 py-4 hidden lg:table-cell">{statusBadge(item.status)}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-2">
                        <button onClick={() => openView(item)} className="p-1.5 rounded-lg text-gray-400 hover:text-blue-600 hover:bg-blue-50 transition-colors" title="View"><Eye className="w-4 h-4" /></button>
                        <button onClick={() => openEdit(item)} className="p-1.5 rounded-lg text-gray-400 hover:text-teal-600 hover:bg-teal-50 transition-colors" title="Edit"><Pencil className="w-4 h-4" /></button>
                        <button onClick={() => openDelete(item)} className="p-1.5 rounded-lg text-gray-400 hover:text-red-600 hover:bg-red-50 transition-colors" title="Delete"><Trash2 className="w-4 h-4" /></button>
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
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
            
            {/* VIEW MODAL */}
            {modal === 'view' && selected && (
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-bold text-gray-900">View Details</h3>
                  <button onClick={closeModal} className="text-gray-400 hover:text-gray-600"><X className="w-5 h-5" /></button>
                </div>
                <div className="space-y-4 text-sm">
                  <div><span className="font-semibold text-gray-500 uppercase text-xs block mb-1">Title</span>{selected.title}</div>
                  
                  {activeTab === 'featured' && (
                    <>
                      <div><span className="font-semibold text-gray-500 uppercase text-xs block mb-1">Icon</span><span className="text-2xl">{selected.icon}</span></div>
                      <div><span className="font-semibold text-gray-500 uppercase text-xs block mb-1">Description</span>{selected.description}</div>
                      <div><span className="font-semibold text-gray-500 uppercase text-xs block mb-1">Full Content</span>{selected.fullContent}</div>
                      <div><span className="font-semibold text-gray-500 uppercase text-xs block mb-1">Button Label</span>{selected.buttonLabel}</div>
                    </>
                  )}
                  {activeTab === 'article' && (
                    <>
                      <div><span className="font-semibold text-gray-500 uppercase text-xs block mb-1">Excerpt</span>{selected.excerpt}</div>
                      <div><span className="font-semibold text-gray-500 uppercase text-xs block mb-1">Full Content</span>{selected.fullContent}</div>
                      <div><span className="font-semibold text-gray-500 uppercase text-xs block mb-1">Image URL</span><a href={selected.imageUrl} target="_blank" rel="noreferrer" className="text-teal-600 break-all">{selected.imageUrl}</a></div>
                    </>
                  )}
                  {activeTab === 'video' && (
                    <>
                      <div><span className="font-semibold text-gray-500 uppercase text-xs block mb-1">Duration</span>{selected.duration}</div>
                      <div><span className="font-semibold text-gray-500 uppercase text-xs block mb-1">Video URL</span>{selected.videoUrl}</div>
                    </>
                  )}
                  {activeTab === 'download' && (
                    <div><span className="font-semibold text-gray-500 uppercase text-xs block mb-1">File URL</span><a href={selected.fileUrl} target="_blank" rel="noreferrer" className="text-teal-600 break-all">{selected.fileUrl}</a></div>
                  )}

                  <div className="grid grid-cols-2">
                    <div><span className="font-semibold text-gray-500 uppercase text-xs block mb-1">Status</span>{statusBadge(selected.status)}</div>
                    <div><span className="font-semibold text-gray-500 uppercase text-xs block mb-1">Order</span>{selected.order}</div>
                  </div>
                </div>
                <button onClick={closeModal} className="mt-6 w-full border border-gray-200 py-2.5 rounded-xl font-medium hover:bg-gray-50">Close</button>
              </div>
            )}

            {/* ADD / EDIT MODAL */}
            {(modal === 'add' || modal === 'edit') && (
              <div className="p-6">
                <div className="flex items-center justify-between mb-5">
                  <h3 className="text-lg font-bold text-gray-900">{modal === 'add' ? 'Add' : 'Edit'} {sectionTitles[activeTab]}</h3>
                  <button onClick={closeModal} className="text-gray-400"><X className="w-5 h-5" /></button>
                </div>
                
                {error && <div className="mb-4 bg-red-50 text-red-700 px-4 py-3 rounded-xl text-sm">{error}</div>}

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Title <span className="text-red-500">*</span></label>
                    <input value={form.title} onChange={e => setForm({...form, title: e.target.value})} className={inputCls} placeholder="Title" />
                  </div>

                  {activeTab === 'featured' && (
                    <>
                      <div><label className="block text-sm font-semibold mb-1">Icon (Emoji)</label><input value={form.icon} onChange={e => setForm({...form, icon: e.target.value})} className={inputCls} placeholder="🐄" /></div>
                      <div><label className="block text-sm font-semibold mb-1">Description</label><textarea rows="2" value={form.description} onChange={e => setForm({...form, description: e.target.value})} className={inputCls} placeholder="Short description for the card..." /></div>
                      <div><label className="block text-sm font-semibold mb-1">Full Content (Popup)</label><textarea rows="4" value={form.fullContent} onChange={e => setForm({...form, fullContent: e.target.value})} className={inputCls} placeholder="Detailed content shown when 'Read More' is clicked..." /></div>
                      <div><label className="block text-sm font-semibold mb-1">Button Label</label><input value={form.buttonLabel} onChange={e => setForm({...form, buttonLabel: e.target.value})} className={inputCls} placeholder="Read More" /></div>
                    </>
                  )}

                  {activeTab === 'article' && (
                    <>
                      <div><label className="block text-sm font-semibold mb-1">Excerpt</label><textarea rows="2" value={form.excerpt} onChange={e => setForm({...form, excerpt: e.target.value})} className={inputCls} placeholder="Brief summary..." /></div>
                      <div><label className="block text-sm font-semibold mb-1">Full Content (Popup)</label><textarea rows="4" value={form.fullContent} onChange={e => setForm({...form, fullContent: e.target.value})} className={inputCls} placeholder="Detailed article content..." /></div>
                      <div><label className="block text-sm font-semibold mb-1">Image URL</label><input value={form.imageUrl} onChange={e => setForm({...form, imageUrl: e.target.value})} className={inputCls} placeholder="https://..." /></div>
                    </>
                  )}

                  {activeTab === 'video' && (
                    <>
                      <div><label className="block text-sm font-semibold mb-1">Duration</label><input value={form.duration} onChange={e => setForm({...form, duration: e.target.value})} className={inputCls} placeholder="e.g. 5 min" /></div>
                      <div><label className="block text-sm font-semibold mb-1">Video URL (optional)</label><input value={form.videoUrl} onChange={e => setForm({...form, videoUrl: e.target.value})} className={inputCls} placeholder="https://..." /></div>
                    </>
                  )}

                  {activeTab === 'download' && (
                    <div><label className="block text-sm font-semibold mb-1">File URL</label><input value={form.fileUrl} onChange={e => setForm({...form, fileUrl: e.target.value})} className={inputCls} placeholder="/downloads/file.pdf" /></div>
                  )}

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold mb-1">Status</label>
                      <select value={form.status} onChange={e => setForm({...form, status: e.target.value})} className={`${inputCls} bg-white`}>
                        <option>Active</option>
                        <option>Inactive</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold mb-1">Order</label>
                      <input type="number" value={form.order} onChange={e => setForm({...form, order: e.target.value})} className={inputCls} />
                    </div>
                  </div>
                </div>

                <div className="flex gap-3 mt-6">
                  <button onClick={closeModal} className="flex-1 border py-2.5 rounded-xl font-medium hover:bg-gray-50">Cancel</button>
                  <button onClick={modal === 'add' ? handleAdd : handleEdit} disabled={saving} className="flex-1 bg-teal-600 text-white py-2.5 rounded-xl font-semibold hover:bg-teal-700 flex items-center justify-center gap-2">
                    {saving && <Loader2 className="w-4 h-4 animate-spin" />} Save
                  </button>
                </div>
              </div>
            )}

            {/* DELETE MODAL */}
            {modal === 'delete' && selected && (
              <div className="p-6">
                <h3 className="text-lg font-bold mb-2">Delete Resource</h3>
                {error && <div className="mb-4 bg-red-50 text-red-700 px-4 py-3 rounded-xl text-sm">{error}</div>}
                <p className="text-gray-600 text-sm">Are you sure you want to delete <strong>{selected.title}</strong>?</p>
                <div className="flex gap-3 mt-6">
                  <button onClick={closeModal} className="flex-1 border py-2.5 rounded-xl font-medium hover:bg-gray-50">Cancel</button>
                  <button onClick={handleDelete} disabled={saving} className="flex-1 bg-red-600 text-white py-2.5 rounded-xl font-semibold hover:bg-red-700 flex items-center justify-center gap-2">
                    {saving && <Loader2 className="w-4 h-4 animate-spin" />} Delete
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
