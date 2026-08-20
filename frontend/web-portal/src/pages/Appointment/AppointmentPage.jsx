import { API_BASE_URL } from '../../config';
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Navbar from '../../Components/Navbar';
import Footer from '../../Components/Footer';
import AppointmentForm from '../../Components/Appointment/AppointmentForm';
import AppointmentHistory from '../../Components/Appointment/AppointmentHistory';

const AppointmentPage = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch appointments on mount
  React.useEffect(() => {
    const fetchUserAppointments = async () => {
      try {
        const storedUser = localStorage.getItem('user');
        if (!storedUser) {
          setLoading(false);
          return;
        }

        const user = JSON.parse(storedUser);
        
        const response = await fetch(`${API_BASE_URL}/appointments`);
        if (response.ok) {
          const allAppointments = await response.json();
          // Filter by the logged-in user's name
          const userAppointments = allAppointments.filter(
            app => app.farmer.toLowerCase() === user.name.toLowerCase()
          );
          
          // Format date for history view
          const formattedAppointments = userAppointments.map(app => {
            let formattedDate = app.date;
            try {
              const [year, month, day] = app.date.split('-');
              if (year && month && day) {
                const localDate = new Date(year, month - 1, day);
                formattedDate = localDate.toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric',
                  year: 'numeric',
                });
              }
            } catch (e) {
              console.error('Date parsing error', e);
            }
            return {
              id: app._id,
              date: formattedDate,
              time: app.time,
              service: app.service,
              status: app.status
            };
          });

          setAppointments(formattedAppointments);
        }
      } catch (error) {
        console.error('Failed to fetch appointments:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserAppointments();
  }, []);

  const handleAddAppointment = (newApp) => {
    // Format date from YYYY-MM-DD to MMM DD, YYYY
    let formattedDate = newApp.date;
    try {
      if (newApp.date.includes('-')) {
        const [year, month, day] = newApp.date.split('-');
        const localDate = new Date(year, month - 1, day);
        
        formattedDate = localDate.toLocaleDateString('en-US', {
          month: 'short',
          day: 'numeric',
          year: 'numeric',
        });
      }
    } catch (e) {
      console.error('Date parsing error', e);
    }

    setAppointments([{ ...newApp, date: formattedDate }, ...appointments]);
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      transition={{ duration: 0.5 }}
      className="min-h-screen flex flex-col bg-[#F8FAF8]"
    >
      <Navbar />

      {/* Hero Section */}
      <section className="pt-10 pb-32 bg-gradient-to-b from-[#E6F4EA] to-[#F8FAF8] px-4 md:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Breadcrumb */}
          <div className="text-sm text-gray-500 mb-4">
            <span className="hover:text-gray-700 cursor-pointer">Home</span> / <span className="font-medium text-gray-900">Appointment</span>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Book an Appointment
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl">
            Schedule your veterinary visit easily and get timely care for your livestock.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <main className="flex-grow flex flex-col items-center">
        <AppointmentForm onAddAppointment={handleAddAppointment} />
        <AppointmentHistory appointments={appointments} />
      </main>

      <Footer />
    </motion.div>
  );
};

export default AppointmentPage;
