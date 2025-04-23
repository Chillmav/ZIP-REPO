import './App.css'
import WebcamComponent from './Components/WebcamComponent'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import CamPage from './Pages/CamPage'
import LogPage from './Pages/LogPage'
import RankingPage from './Pages/RankingPage'

function App() {

  return (
    <Routes>

      <Route path='/' element={<LogPage />} />
      <Route path='/Cam' element={<CamPage />} />
      <Route path='/Ranking' element={<RankingPage />} />

    </Routes>
  )
}

export default App
