import React, { useState } from 'react'
import hTechImage from '../images/1368426.jpg'
import landingPageDeck from '../services/getLandingPageDeck'
import FlashCard from './FlashCard'

import '../styles/LandingPageHero.css'
import DisplayFlashCard from './DisplayFlashCard'

const LandingPageHero: React.FC = () => {
    const display = landingPageDeck
    const [deckIndex, setDeckIndex] = useState(0)


    const handleNextCard = () => {
        deckIndex < display.deck.length - 1 ? setDeckIndex(deckIndex + 1) : setDeckIndex(0)
    }

    return (
        <div className="hero-container">
            <div className='hero-item-container'>
                <div className="hero-left">
                    <h2 className="hero-title">Flash Study: <div className='ignite'>Ignite</div> your learning potential with AI-powered study sessions</h2>
                    <p className="hero-description">Your go-to app for personalized flashcards, AI-generated learning, and progress tracking</p>
                </div>
                <div className="hero-right">
                    <DisplayFlashCard flashCard={display.deck[deckIndex]} nextCard={handleNextCard}/>
                </div>
            </div>
        </div>
  )
}

export default LandingPageHero