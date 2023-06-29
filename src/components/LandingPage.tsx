import React, { useState } from 'react'
import Header from './Header'
import '../styles/LandingPage.css'
import LandingPageHero from './LandingPageHero'
import landingPageDeck from '../services/getLandingPageDeck'
import bgImg from '../images/1368426.jpg'

const LandingPage = () => {
    const display = landingPageDeck
    const [deckIndex, setDeckIndex] = useState(0)


    const handleNextCard = () => {
        deckIndex < display.deck.length - 1 ? setDeckIndex(deckIndex + 1) : setDeckIndex(0)
    }

    return (
        <section className='landing-page-section' style={{backgroundImage: `url(${bgImg})`, backgroundSize: 'cover', backgroundRepeat: 'no-repeat', backgroundPosition: 'center', width: '100%'}}>
            <div className='lp-top-spacer'></div>
            <Header />
            <LandingPageHero />
        </section>
    )
}

export default LandingPage