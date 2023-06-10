import React, { useState } from 'react'
import axios from 'axios'
import ErrorPopup from './ErrorPopup'
import { useNavigate } from 'react-router-dom'

interface SignUpProps {
  setUser: React.Dispatch<React.SetStateAction<{}>>
}

const SignUp: React.FC<SignUpProps> = ({ setUser }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [signupError, setSignupError] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  const navigate = useNavigate()

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value)
  }

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value)
  }

  const handleConfirmPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setConfirmPassword(e.target.value)
  }

  const handleHome = () => {
    navigate('/')
  }

  const validateEmail = ():boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  const validatePassword = ():boolean => {
    const minLength = 8
    const containsUppercase = /[A-Z]/.test(password)
    const containsLowercase = /[a-z]/.test(password)
    const containsNumber = /[0-9]/.test(password)
    return (
        password.length >= minLength &&
        containsUppercase &&
        containsLowercase &&
        containsNumber
    )
  }
  const handleSignUp = async () => {
    if (password !== confirmPassword){
        setSignupError(true)
        setErrorMessage('Passwords do not match')
        return
    }
    if (!validateEmail()){
        setSignupError(true)
        setErrorMessage('Invalid Email')
        return
    }
    if (!validatePassword()){
        setSignupError(true)
        setErrorMessage('Passwords must contain an uppercase letter, a lowercase letter, and a number')
        return
    }
    try {
      //change to /api/register before sending build to production: http://localhost:5000/api/register
      const response = await axios.post('/api/register', {
        email: email,
        password: password,
      })
      console.log(response.data)
      if (response.data.user) {
        setUser(response.data.user)
        navigate('/dashboard')
      } else {
        setSignupError(true)
        setErrorMessage('Sorry, Email taken')
        setEmail('')
        setPassword('')
        setConfirmPassword('')
      }
    } catch {
      setSignupError(true);
      setErrorMessage('Error signing up')
      setEmail('')
      setPassword('')
      setConfirmPassword('')
    }
  };

  return (
    <div className="signup-container">
      <ErrorPopup
        error={signupError}
        setError={setSignupError}
        errorMessage={errorMessage}
        setErrorMessage={setErrorMessage}
      />
      <h2 className="signup-title">Sign Up</h2>
      <form className="signup-form">
        <label htmlFor="email" className="signup-label">
          Email:
        </label>
        <input
          type="email"
          id="email"
          className="signup-input"
          value={email}
          onChange={handleEmailChange}
        />
        <label htmlFor="password" className="signup-label">
          Password:
        </label>
        <input
          type="password"
          id="password"
          className="signup-input"
          value={password}
          onChange={handlePasswordChange}
        />
        <label htmlFor="confirmPassword" className="signup-label">
            Confirm Password:
        </label>
        <input
          type='password'
          id='confirmPassword'
          className='sign=up-input'
          value={confirmPassword}
          onChange={handleConfirmPasswordChange}
        >
        </input>
        <button type="button" className="signup-button" onClick={handleSignUp}>
          Sign Up
        </button>
        <button type="button" className="home-button" onClick={handleHome}>
            Home
        </button>
      </form>
    </div>
  )
}

export default SignUp