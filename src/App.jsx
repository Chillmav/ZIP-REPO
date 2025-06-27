import WebcamComponent from './Components/WebcamComponent'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import CamPage from './Pages/CamPage'
import LogPage from './Pages/LogPage'
import RankingPage from './Pages/RankingPage'
import FixPage from './Pages/FixPage'
import { useState } from 'react'

function App() {

  const [data, setData] = useState([]);
  const [user, setUser] = useState([]);

  return (
    <Routes>

      <Route path='/' element={<LogPage setUser={setUser}/>} />
      <Route path='/Cam' element={<CamPage setData={setData} user = {user} setUser= {setUser} />}/>
      <Route path='/Fixing' element={<FixPage setUser = {setUser} user={user} setData={setData} />}/>
      <Route path='/Ranking' element={<RankingPage data={data} user={user} />}/>
      

    </Routes>
  )
}

export default App
