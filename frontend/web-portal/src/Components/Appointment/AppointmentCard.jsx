import React from 'react';
import { MoreVertical } from 'lucide-react';
import StatusBadge from './StatusBadge';

const AppointmentCard = ({ appointment }) => {
  return (
    <div className="flex items-center justify-between p-4 bg-white border border-gray-100 rounded-xl shadow-sm hover:shadow-md transition-shadow">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 flex-1">
        <div>
          <p className="text-sm text-gray-500 mb-1">Date</p>
          <p className="font-medium text-gray-900">{appointment.date}</p>
        </div>
        <div>
          <p className="text-sm text-gray-500 mb-1">Time</p>
          <p className="font-medium text-gray-900">{appointment.time}</p>
        </div>
        <div>
          <p className="text-sm text-gray-500 mb-1">Service</p>
          <p className="font-medium text-gray-900">{appointment.service}</p>
        </div>
        <div>
          <p className="text-sm text-gray-500 mb-1">Status</p>
          <StatusBadge status={appointment.status} />
        </div>
      </div>
      <button className="p-2 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100 transition-colors ml-4">
        <MoreVertical className="w-5 h-5" />
      </button>
    </div>
  );
};

export default AppointmentCard;
