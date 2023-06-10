import React, { useState } from 'react'
import axios from 'axios'
import ErrorPopup from './ErrorPopup'

interface LogInProps {
    setUser: React.Dispatch<React.SetStateAction<{}>>
}

const LogIn:React.FC<LogInProps> = ({setUser}) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loginError, setLoginError] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value)
  }

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value)
  }

  const handleLogin = async () => {
    try{
        const response = await axios.post('http://localhost:5000/api/login', {email: email, password: password})
        console.log(response.data)
        if (response.data.user){
            setUser(response.data.user)
            window.location.href = '/dashboard'
        } else {
            setLoginError(true)
            setErrorMessage('Invalid Email or Password')
            setEmail('')
            setPassword('')
        }
    } catch {
        setLoginError(true)
        setErrorMessage('Invalid Email or Password')
        setEmail('')
        setPassword('')
    }

  }

  return (
    <div className="login-container">
      <ErrorPopup error={loginError} setError={setLoginError} errorMessage={errorMessage} setErrorMessage={setErrorMessage}/>  
      <h2 className="login-title">Log In</h2>
      <form className="login-form">
        <label htmlFor="email" className="login-label">
          Email:
        </label>
        <input
          type="email"
          id="email"
          className="login-input"
          value={email}
          onChange={handleEmailChange}
        />
        <label htmlFor="password" className="login-label">
          Password:
        </label>
        <input
          type="password"
          id="password"
          className="login-input"
          value={password}
          onChange={handlePasswordChange}
        />
        <button type="button" className="login-button" onClick={handleLogin}>
          Log In
        </button>
      </form>
    </div>
  )
}

export default LogIn