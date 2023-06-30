import { useState, useEffect } from 'react'
import FlashCard from './FlashCard'
import landingPageDeck from '../services/getLandingPageDeck'

const TestCard = ({}) => {
    const [cardHeight, setCardHeight] = useState<number | undefined>(undefined)
    const [windowWidth, setWindowWidth] = useState(window.innerWidth)
    const [deckIndex, setDeckIndex] = useState(0)

    const display = landingPageDeck

    const handleNextCard = () => {
        deckIndex < display.deck.length - 1 ? setDeckIndex(deckIndex + 1) : setDeckIndex(0)
    }

    useEffect(()=> {
        const handleResize = () => {
            setWindowWidth(window.innerWidth)
        }

        window.addEventListener('resize', handleResize)

        return () => {
            window.removeEventListener('resize', handleResize)
        }
    }, [])

    useEffect (()=>{
        setCardHeight(getTestCardHeight())
    }, [windowWidth])

    const getTestCardHeight = ():number => {
        const getNumFromPx = (str: string):number => {
            return parseInt(str.substring(0, str.length - 2))
        }

        const testCardElement = document.querySelector('.test-card-main')

        if (testCardElement) {
            const computedStyle = window.getComputedStyle(testCardElement)
            const cardWidth = getNumFromPx(computedStyle.getPropertyValue('width'))
            return Math.floor(cardWidth * 0.66)
        }
        return 200
    }

    return (
        <div className="test-card-main" style={{ maxWidth: '600px', maxHeight: '400px', height: `${cardHeight}px`, margin: '0 auto', width: '100%' }}>
            <FlashCard flashCard={display.deck[deckIndex]} nextCard={handleNextCard} />
        </div>
    )
}

export default TestCard