import React, { useState } from 'react'
import Header from './Header'
import flashCardImage from '../images/flash-card.png'
import '../styles/LandingPage.css'
import LandingPageHero from './LandingPageHero'
import FlashCard from './FlashCard'
import landingPageDeck from '../services/getLandingPageDeck'

const LandingPage = () => {
    const display = landingPageDeck
    const [deckIndex, setDeckIndex] = useState(0)


    const handleNextCard = () => {
        deckIndex < display.deck.length - 1 ? setDeckIndex(deckIndex + 1) : setDeckIndex(0)
    }

    return (
        <section className='landing-page-section'>
            <LandingPageHero />
            <FlashCard flashCard={display.deck[deckIndex]} nextCard={handleNextCard}/>
        </section>
    )
}

export default LandingPage