import React from 'react'
import LandingPage from './LandingPage'

const App = () => {

  const secret = process.env.REACT_APP_SECRET

  return (
    <LandingPage></LandingPage>
  )
}

export default App
