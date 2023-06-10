import React from 'react'
import LandingPage from './LandingPage'
import Dashboard from './Dashboard'
import { Routes, Route } from 'react-router-dom'

import '../styles/index.css'


const App = () => {

  const secret = process.env.REACT_APP_SECRET

  return (
    <div>
      <Routes>
        <Route path='/' Component={LandingPage} />
        <Route path='/dashboard' Component={Dashboard} />
      </Routes>
    </div>
  )
}

export default App
