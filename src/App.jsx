import WebcamComponent from './Components/WebcamComponent'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import CamPage from './Pages/CamPage'
import LogPage from './Pages/LogPage'
import RankingPage from './Pages/RankingPage'
import FixPage from './Pages/FixPage'
import { useState } from 'react'
import FilterPanel from './Components/FilterPanel'

function App() {
  const [data, setData] = useState([]);
  const [user, setUser] = useState([]);


  return (
    <div className="flex flex-col items-center justify-center gap-y-[50px] mt-[50px] relative">
      <div className="text-3xl text-[#2E2E2E]">
        Aplikacja wspomagająca dobór oprawek okularowych
      </div>

      <Routes>
        <Route path="/" element={<LogPage setUser={setUser} />} />
        <Route path="/Cam" element={<CamPage setData={setData} user={user} setUser={setUser} />} />
        <Route path="/Fixing" element={<FixPage setUser={setUser} user={user} setData={setData} />} />
        <Route path="/Ranking" element={<RankingPage data={data} user={user} />} />
      </Routes>

    </div>
  )
}

export default App

