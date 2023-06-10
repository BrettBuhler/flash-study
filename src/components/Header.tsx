import React from 'react'
import '../styles/Header.css'
import { useNavigate } from 'react-router-dom'

interface HeaderProps {
}

const Header: React.FC<HeaderProps> = ({}) => {

    const navigate = useNavigate()

    const handleLoginClick = () => {
        navigate('/login')
    }

    const handleSignupClick = () => {
        navigate('/signup')
    }

    return (
        <header className="top-bar">
            <div className="container">
                <div className="left-section">
                    <h1 className="logo">Flash Study</h1>
                </div>
                <div className="right-section">
                    <button className="button" onClick={handleSignupClick}>Sign Up</button>
                    <button className="button" onClick={handleLoginClick}>Log In</button>
                </div>
            </div>
        </header>
    )
}

export default Header