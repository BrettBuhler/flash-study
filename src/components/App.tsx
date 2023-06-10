import React, { useState } from 'react'
import LandingPage from './LandingPage'
import Dashboard from './Dashboard'
import { Routes, Route, RouteProps } from 'react-router-dom'

import '../styles/index.css'
import LogIn from './LogIn'
import SignUp from './SignUp'
import AddDeck from './AddDeck'


const App = () => {

  const [user, setUser] = useState({})

  const secret = process.env.REACT_APP_SECRET

  return (
    <div>
      <Routes>
        <Route path='/' Component={LandingPage} />
        <Route path='/dashboard'
          element = {
            <Dashboard user={user} setUser={setUser} />
          }
        />
        <Route path='/login'
          element = {
            <LogIn setUser={setUser}/>
          }
        />
        <Route path='/signup'
          element = {
            <SignUp setUser={setUser}/>
          }
        />
        <Route path='/add-deck'
          element = {
            <AddDeck user={user} setUser={setUser} />
          }
        />
      </Routes>
    </div>
  )
}

export default App
