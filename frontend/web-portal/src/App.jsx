import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/home.jsx'
import Services from './pages/Services.jsx'
import Resources from './pages/Resources.jsx'


function App() {
  return (
   <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/services" element={<Services/>}/>
        <Route path="/resources" element={<Resources/>}/>

        
      </Routes>
    </Router>
  )
}

export default App
