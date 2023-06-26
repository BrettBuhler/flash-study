import React from 'react'
import bookImage from '../images/book.jpg'
import studyImage from '../images/StockSnap_FMJOIWUH4F.jpg'

import '../styles/LandingPageHero.css'

const LandingPageHero: React.FC = () => {
    return (
        <div className="hero-container" style={{background: `url(${studyImage})`, backgroundSize: 'cover', backgroundRepeat: 'no-repeat', backgroundPosition: 'center', width: '100%', height: '100vh'}}>
            <div>
                <div className="hero-left">
                    <h2 className="hero-title">Flash Study: Your go-to app for personalized flashcards, AI-generated learning, and progress tracking. Boost your learning potential with Flash Study.</h2>
                    <p className="hero-description">Flash Study: Your go-to app for personalized flashcards, AI-generated learning, and progress tracking. Boost your learning potential with Flash Study.</p>
                </div>
                <div className="hero-right">

                </div>
            </div>
        </div>
  )
}

export default LandingPageHero