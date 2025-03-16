import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import DigitalClock from './components/DigitalClock'
import Stopper from './components/Stopper'

function App() {

  return (
    <>
    <Routes>
      <Route path='/' element={<DigitalClock />} />
      <Route path='/stopper' element={<Stopper />} />
    </Routes>
    </>
  )
}

export default App
