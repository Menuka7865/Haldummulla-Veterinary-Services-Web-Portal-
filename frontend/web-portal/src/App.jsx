import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import Home from './pages/Home.jsx'
import Services from './pages/Services.jsx'
import Contact from './pages/Contact.jsx'
import AppointmentPage from './pages/Appointment/AppointmentPage.jsx'
import Resources from './pages/Resources.jsx'
import Announcements from './pages/Announcements.jsx'
import Login from './pages/Login.jsx'
import Register from './pages/Register.jsx'

// Admin
import AdminLayout from './layouts/AdminLayout.jsx'
import Dashboard from './pages/admin/Dashboard.jsx'
import ServicesManagement from './pages/admin/ServicesManagement.jsx'
import AnnouncementsManagement from './pages/admin/AnnouncementsManagement.jsx'
import ResourcesManagement from './pages/admin/ResourcesManagement.jsx'
import AppointmentsManagement from './pages/admin/AppointmentsManagement.jsx'
import ContactInquiries from './pages/admin/ContactInquiries.jsx'

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/services" element={<Services />} />
        <Route path="/appointments" element={<AppointmentPage />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/resources" element={<Resources />} />
        <Route path="/announcements" element={<Announcements />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Admin Routes */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="services" element={<ServicesManagement />} />
          <Route path="announcements" element={<AnnouncementsManagement />} />
          <Route path="resources" element={<ResourcesManagement />} />
          <Route path="appointments" element={<AppointmentsManagement />} />
          <Route path="inquiries" element={<ContactInquiries />} />
        </Route>
      </Routes>
    </Router>
  )
}

export default App