import React, { useState, useEffect } from 'react'
import hTechImage from '../images/1368426.jpg'
import landingPageDeck from '../services/getLandingPageDeck'
import FlashCard from './FlashCard'

import '../styles/LandingPageHero.css'
import DisplayFlashCard from './DisplayFlashCard'
import TestCard from './TestCard'

const LandingPageHero: React.FC = () => {
    const [screenWidth, setScreenWidth] = useState(window.innerWidth)

    useEffect (()=>{
        const handleResize = () => {
            setScreenWidth(window.innerWidth)
        }

        window.addEventListener('resize', handleResize)
        return () => {
            window.removeEventListener('resize', handleResize)
        }
    },[])
    return (
        <div className="hero-container">
            <div className='hero-item-container'>
                <div className="hero-left">
                    <h2 className="hero-title">Flash Study: <div className='ignite'>Ignite</div> your learning potential with AI-powered study sessions</h2>
                    <p className="hero-description">Your go-to app for personalized flashcards, AI-generated learning, and progress tracking</p>
                </div>
                {screenWidth > 600 && (<div className="hero-right">
                    <TestCard />
                </div>)}
            </div>
        </div>
  )
}

export default LandingPageHero