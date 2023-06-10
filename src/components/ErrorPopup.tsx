import React from 'react'
import '../styles/ErrorPopup.css'

interface ErrorPopupProps {
  setError: React.Dispatch<React.SetStateAction<boolean>>
  error: boolean
  setErrorMessage: React.Dispatch<React.SetStateAction<string>>
  errorMessage: string
}

const ErrorPopup: React.FC<ErrorPopupProps> = ({ error, setError, errorMessage, setErrorMessage }) => {
  const handleOkClick = () => {
    setErrorMessage('')
    setError(false)
  }

  if (!error){
    return null
  }

  return (
    <div className="error-popup-container">
      <div className="error-popup">
        <div className="error-message">{errorMessage}</div>
        <button className="ok-button" onClick={handleOkClick}>
          OK
        </button>
      </div>
    </div>
  )
}

export default ErrorPopup
