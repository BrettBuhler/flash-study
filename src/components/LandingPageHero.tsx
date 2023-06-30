import React, { useState } from 'react'
import hTechImage from '../images/1368426.jpg'
import landingPageDeck from '../services/getLandingPageDeck'
import FlashCard from './FlashCard'

import '../styles/LandingPageHero.css'
import DisplayFlashCard from './DisplayFlashCard'
import TestCard from './TestCard'

const LandingPageHero: React.FC = () => {
    return (
        <div className="hero-container">
            <div className='hero-item-container'>
                <div className="hero-left">
                    <h2 className="hero-title">Flash Study: <div className='ignite'>Ignite</div> your learning potential with AI-powered study sessions</h2>
                    <p className="hero-description">Your go-to app for personalized flashcards, AI-generated learning, and progress tracking</p>
                </div>
                <div className="hero-right">
                    <TestCard />
                </div>
            </div>
        </div>
  )
}
//<DisplayFlashCard flashCard={display.deck[deckIndex]} nextCard={handleNextCard}/>
export default LandingPageHero