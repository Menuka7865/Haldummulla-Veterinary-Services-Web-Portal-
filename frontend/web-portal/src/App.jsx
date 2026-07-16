import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/home.jsx'
import Services from './pages/Services.jsx'
import AppointmentPage from './pages/Appointment/AppointmentPage.jsx'


function App() {
  return (
   <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/services" element={<Services/>}/>
        <Route path="/appointments" element={<AppointmentPage />} />

        
      </Routes>
    </Router>
  )
}

export default App
