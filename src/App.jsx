import './App.css'
import WebcamComponent from './Components/WebcamComponent'
import { useEffect, useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import CamPage from './Pages/CamPage'
import LogPage from './Pages/LogPage'

function App() {

  return (
    <Routes>

      <Route path='/' element={<LogPage />} />
      <Route path='/Cam' element={<CamPage />} />

    </Routes>
  )
}

export default App
