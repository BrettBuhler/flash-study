import React, { useState } from 'react'
import LandingPage from './LandingPage'
import Dashboard from './Dashboard'
import { Routes, Route } from 'react-router-dom'

import '../styles/index.css'

import LogIn from './LogIn'
import SignUp from './SignUp'
import AddDeck from './AddDeck'
import AddDeckManual from './AddDeckManual'
import EditDecks from './EditDecks'
import AddCardsFromTextAndAIBase from './AddCardsFromTextAndAIBase'
import Study from './Study'


const App = () => {
  const [user, setUser] = useState({})

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
        <Route path='/add-deck/manual'
          element = {
            <AddDeckManual user={user} setUser={setUser} />
          }
        />
        <Route path='/add-deck/text'
          element = {
            <AddCardsFromTextAndAIBase user={user} setUser={setUser} route={'text'}/>
          }
        />
        <Route path='/add-deck/ai'
          element = {
            <AddCardsFromTextAndAIBase user={user} setUser={setUser} route={'ai'}/>
          }
        />
        <Route path='/edit-decks'
          element = {
              <EditDecks user={user} setUser={setUser}/>
          }
        />
        <Route path='/study'
          element = {
              <Study user={user} setUser={setUser}/>
          }
        />
        <Route path='/store'
          element = {
              <div>store</div>
          }
        />
        <Route path='/help'
          element = {
              <div>help</div>
          }
        />
        <Route path='/stats'
          element = {
              <div>stats</div>
          }
        />
      </Routes>
    </div>
  )
}

export default App
