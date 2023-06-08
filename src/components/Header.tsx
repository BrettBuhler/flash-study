import React from 'react'
import '../styles/Header.css'

interface HeaderProps {
    title: string
    tagline: string
    imageUrl: string
}

const Header: React.FC<HeaderProps> = ({ title, tagline, imageUrl}) => {
    return (
        <header className="top-bar">
            <div className="container">
                <div className="left-section">
                    <h1 className="logo">Flash Study</h1>
                </div>
                <div className="right-section">
                    <button className="button">Sign Up</button>
                    <button className="button">Log In</button>
                </div>
            </div>
        </header>
    )
}

export default Header