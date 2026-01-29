import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'
import DutyExchangeForm from './components/DutyExchangeForm'
import FilePreviewPage from './components/FilePreviewPage'
import DutyExchangeManagement from './components/DutyExchangeManagement'
import Menubar from './components/Menubar'
import Settings from './components/Settings'

function App() {
  useEffect(() => {
    // Check local storage or system preference on mount
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }
  }, []);
  return (
    <Router>
      <div className="app">
        <Menubar />
        <div className="main-content">
          <Routes>
            <Route path="/" element={<DutyExchangeManagement />} />
            <Route path="/form" element={<DutyExchangeForm />} />
            <Route path="/preview" element={<FilePreviewPage />} />
            <Route path="/Settings" element={<Settings />} />
          </Routes>
        </div>
      </div>
    </Router>
  )
}

export default App
