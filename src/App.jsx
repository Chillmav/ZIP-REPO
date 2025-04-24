import './App.css'
import WebcamComponent from './Components/WebcamComponent'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import CamPage from './Pages/CamPage'
import LogPage from './Pages/LogPage'
import RankingPage from './Pages/RankingPage'
import { useState } from 'react'

function App() {
  const [data, setData] = useState([]);
  return (
    <Routes>

      <Route path='/' element={<LogPage />} />
      <Route path='/Cam' element={<CamPage setData={setData} />}/>
      <Route path='/Ranking' element={<RankingPage data={data} />}/>

    </Routes>
  )
}

export default App
