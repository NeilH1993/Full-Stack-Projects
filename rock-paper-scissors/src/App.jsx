import { useState } from 'react'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import LoginPage from './components/LoginPage'
import ScorePage from './components/ScorePage'
import GamePage from './components/GamePage'
function App() {
  const [computer, setComputer] = useState([{
    name: "Computer",
    wins: 0,
    losses: 0
  }])
  
  const [users, setUsers] = useState([])


  return (
    <>
    <Routes>
      <Route path='/' element={<LoginPage users={users} setUsers={setUsers} computer={computer} setComputer={setComputer} />} />
      <Route path='/RPS/:name' element={<GamePage users={users} setUsers={setUsers} computer={computer} setComputer={setComputer} />} />
      <Route path='/RPS/Score/:name' element={<ScorePage users={users} computer={computer} setUsers={setUsers} />} />
    </Routes>
    </>
  )
}

export default App
