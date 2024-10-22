import React from 'react'
import './App.css'
import { Mood, Voice, GipnofobTap } from './pages'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Provider } from 'react-redux'
import { store } from './store/store'

function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <Router>
          <Routes>
            <Route path="/" element={<p>home</p>} />
            <Route path="/mood" element={<Mood />} />
            <Route path="/voice" element={<Voice />} />
            <Route path="/gipnofob" element={<GipnofobTap />} />
          </Routes>
        </Router>
      </Provider>
    </div>
  )
}

export default App
