import React, { useState } from 'react';
import { Eye, X } from 'lucide-react';

const initialInquiries = [
  { id: 1, name: 'Sunil Perera', email: 'sunil@example.com', subject: 'Vaccination Schedule Inquiry', message: 'I would like to know the upcoming vaccination schedule for dairy cattle in the Haldummulla area.', date: '2026-07-14', read: false },
  { id: 2, name: 'Kamala Silva', email: 'kamala@example.com', subject: 'Emergency Treatment Request', message: 'My buffalo has been limping for two days. I would like to request an emergency veterinary visit as soon as possible.', date: '2026-07-13', read: true },
  { id: 3, name: 'Nimal Fernando', email: 'nimal@example.com', subject: 'Appointment Rescheduling', message: 'I had an appointment on July 12th but had to miss it due to a personal emergency. I would like to reschedule it.', date: '2026-07-12', read: true },
  { id: 4, name: 'Priya Mahendran', email: 'priya@example.com', subject: 'Farm Visit Request', message: 'I have 10 dairy cows and would like a veterinary officer to visit my farm for a general health checkup. Please let me know the procedure.', date: '2026-07-11', read: false },
  { id: 5, name: 'Rohan Jayawardena', email: 'rohan@example.com', subject: 'Inquiry About Online Services', message: 'I heard about the new online portal. Can you explain how to book appointments and what services are available online?', date: '2026-07-10', read: true },
];

export default function ContactInquiries() {
  const [inquiries, setInquiries] = useState(initialInquiries);
  const [selected, setSelected] = useState(null);

  const openView = (inq) => {
    setInquiries(prev => prev.map(i => i.id === inq.id ? { ...i, read: true } : i));
    setSelected({ ...inq, read: true });
  };
  const closeModal = () => setSelected(null);

  const unreadCount = inquiries.filter(i => !i.read).length;

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Contact Inquiries</h2>
        <p className="text-sm text-gray-500 mt-1">
          View and manage contact form submissions from the farming community.
          {unreadCount > 0 && <span className="ml-2 px-2 py-0.5 bg-orange-100 text-orange-700 text-xs font-semibold rounded-full">{unreadCount} unread</span>}
        </p>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
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
                <tr key={inq.id} className={`transition-colors hover:bg-gray-50 ${!inq.read ? 'bg-orange-50/50' : ''}`}>
                  <td className="px-6 py-4">
                    <span className={`font-medium ${!inq.read ? 'text-gray-900' : 'text-gray-600'}`}>{inq.name}</span>
                    {!inq.read && <span className="ml-2 inline-block w-2 h-2 rounded-full bg-orange-500"></span>}
                  </td>
                  <td className="px-6 py-4 text-gray-500 hidden sm:table-cell">{inq.email}</td>
                  <td className="px-6 py-4 text-gray-600 hidden md:table-cell max-w-xs truncate">{inq.subject}</td>
                  <td className="px-6 py-4 text-gray-500 hidden lg:table-cell">{inq.date}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-0.5 text-xs font-medium rounded-full ${inq.read ? 'bg-gray-100 text-gray-600' : 'bg-orange-100 text-orange-700'}`}>
                      {inq.read ? 'Read' : 'Unread'}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button onClick={() => openView(inq)} className="p-1.5 rounded-lg text-gray-400 hover:text-blue-600 hover:bg-blue-50 transition-colors" title="View"><Eye className="w-4 h-4" /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

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
                  <div><p className="text-xs text-gray-400 uppercase font-semibold">Date</p><p className="text-gray-600 mt-0.5">{selected.date}</p></div>
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
