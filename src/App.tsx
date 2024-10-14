import React from 'react'
import './App.css'
import { Mood, Voice } from './compnents'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<p>home</p>} />
          <Route path="/mood" element={<Mood />} />
          <Route path="/voice" element={<Voice />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App
