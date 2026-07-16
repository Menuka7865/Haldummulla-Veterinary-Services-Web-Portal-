import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/home.jsx'
import Services from './pages/Services.jsx'
import Announcements from './pages/Announcements.jsx'
import Login from './pages/Login.jsx'
import Register from './pages/Register.jsx'


function App() {
  return (
   <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/services" element={<Services/>}/>
        <Route path="/announcements" element={<Announcements/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/register" element={<Register/>}/>

        
      </Routes>
    </Router>
  )
}

export default App
