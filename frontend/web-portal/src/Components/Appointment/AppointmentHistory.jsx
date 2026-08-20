import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import AppointmentCard from './AppointmentCard';

const AppointmentHistory = ({ appointments }) => {
  const [activeTab, setActiveTab] = useState('upcoming');

  const upcomingAppointments = appointments.filter(
    (app) => app.status === 'Approved' || app.status === 'Pending'
  );
  
  const pastAppointments = appointments.filter(
    (app) => app.status === 'Completed' || app.status === 'Cancelled'
  );

  const displayedAppointments =
    activeTab === 'upcoming' ? upcomingAppointments : pastAppointments;

  return (
    <div className="w-full mt-12 mb-20 max-w-4xl mx-auto px-4 md:px-0">
      <h3 className="text-xl font-bold text-gray-900 mb-6">Your Appointments</h3>
      
      {/* Tabs */}
      <div className="flex space-x-6 border-b border-gray-200 mb-6">
        <button
          onClick={() => setActiveTab('upcoming')}
          className={`pb-3 text-sm font-medium transition-colors relative ${
            activeTab === 'upcoming'
              ? 'text-green-600'
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          Upcoming
          {activeTab === 'upcoming' && (
            <motion.div
              layoutId="activeTab"
              className="absolute bottom-0 left-0 right-0 h-0.5 bg-green-500 rounded-t-full"
            />
          )}
        </button>
        <button
          onClick={() => setActiveTab('past')}
          className={`pb-3 text-sm font-medium transition-colors relative ${
            activeTab === 'past'
              ? 'text-green-600'
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          Past
          {activeTab === 'past' && (
            <motion.div
              layoutId="activeTab"
              className="absolute bottom-0 left-0 right-0 h-0.5 bg-green-500 rounded-t-full"
            />
          )}
        </button>
      </div>

      {/* Appointment List */}
      <div className="space-y-4">
        <AnimatePresence mode="popLayout">
          {displayedAppointments.length > 0 ? (
            displayedAppointments.map((appointment) => (
              <motion.div
                key={appointment.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.2 }}
              >
                <AppointmentCard appointment={appointment} />
              </motion.div>
            ))
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-10 text-gray-500"
            >
              No {activeTab} appointments found.
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default AppointmentHistory;
