import React from 'react'
import Header from './Header'
import flashCardImage from '../images/flash-card.png'
import '../styles/LandingPage.css'
import LandingPageHero from './LandingPageHero'

const LandingPage = () => {
    return (
        <section className='landing-page-section'>
            <Header title='Flash Study' tagline='Flash Study: Unleash Your Learning Potential with AI-Powered Flashcards!' imageUrl={flashCardImage}/>
            <LandingPageHero />
        </section>
    )
}

export default LandingPage