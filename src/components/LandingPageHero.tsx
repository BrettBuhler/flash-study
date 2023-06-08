import React from 'react'
import bookImage from '../images/book.jpg'

import '../styles/LandingPageHero.css'

const LandingPageHero: React.FC = () => {
    return (
        <div className="hero-container">
            <div className="hero-left">
                <h2 className="hero-title">Flash Study: Your go-to app for personalized flashcards, AI-generated learning, and progress tracking. Boost your learning potential with Flash Study.</h2>
                <p className="hero-description">Flash Study: Your go-to app for personalized flashcards, AI-generated learning, and progress tracking. Boost your learning potential with Flash Study.</p>
            </div>
            <div className="hero-right">
                <img className='hero-image' src={bookImage} alt="Image"/>
            </div>
        </div>
  )
}

export default LandingPageHero