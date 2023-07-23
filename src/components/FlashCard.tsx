import React from 'react'
import {useState} from 'react'
import '../styles/FlashCard.css'


type Card = {
  question: string
  answer: string
  tries?: number[]
  lastTry?: Date
  easy: () => void
  medium: () => void
  hard: () => void
}

interface FlashCardProps {
  flashCard: Card
  nextCard: () => void
}

const FlashCard: React.FC<FlashCardProps> = ({ flashCard, nextCard }) => {
  const [flipped, setFlipped] = useState(false)

  const flipCard = () => {
    setFlipped(true)
  }

  const handleDifficultyRating = (level: number) => {
    switch(level){
        case 0:
            flashCard.hard()
            break
        case 1:
            flashCard.medium()
            break
        case 2:
            flashCard.easy()
            break
        default:
            console.error('handleDifficultyRating(level): Error (Input must be 0, 1, or 2)')
            break
    }
    nextCard()
    setFlipped(false)
  }

  return (
    <div className={`flash-card ${flipped ? 'flipped' : ''}`}>
      <div className="front" style={{zIndex: flipped ? '0' : '1'}}>
        <h3 className='flash-card-h3 flash-item'>Question</h3>
        <textarea value={flashCard.question} className='flash-text-area' onChange={()=>null}>

        </textarea>
        <div className='difficulty-buttons flash-item'>
          <button className="add-deck-button flash-card-button" onClick={flipCard}>
              Flip
          </button>
        </div>
      </div>
      <div className="back" style={{zIndex: flipped ? '1' : '0'}}>
        <h3 className='flash-card-h3 flash-item'>Answer</h3>
        <textarea value={flashCard.answer} className={`flash-text-area${!flipped ? ' flipped-text-area' : ''}`} onChange={()=>null}>

        </textarea>
        <div className="difficulty-buttons flash-item">
          <button
            className='add-deck-button flash-card-button'
            onClick={() => handleDifficultyRating(2)}
          >
            Easy
          </button>
          <button
            className='add-deck-button flash-card-button'
            onClick={() => handleDifficultyRating(1)}
          >
            Medium
          </button>
          <button
            className='add-deck-button flash-card-button'
            onClick={() => handleDifficultyRating(0)}
          >
            Hard
          </button>
        </div>
      </div>
    </div>
  )
}

export default FlashCard