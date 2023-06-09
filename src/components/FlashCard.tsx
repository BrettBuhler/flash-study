import React from 'react'
import {useState} from 'react'
import '../styles/FlashCard.css'


type Card = {
  question: string;
  answer: string;
  tries: number[];
  lastTry?: Date; // Optional property using "?"
  easy: () => void;
  medium: () => void;
  hard: () => void;
};

interface FlashCardProps {
  flashCard: Card
  nextCard: () => void
}

const FlashCard: React.FC<FlashCardProps> = ({ flashCard, nextCard }) => {
  const [flipped, setFlipped] = useState(false);

  const flipCard = () => {
    setFlipped(true)
    console.log(flashCard.lastTry)
  };

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
      <div className="front">
        <h3 className='flash-card-h3'>Question</h3>
        <p className='flash-card-p'>{flashCard.question}</p>
        <button className="flip-button" onClick={flipCard}>
          Flip
        </button>
      </div>
      <div className="back">
        <h3 className='flash-card-h3'>Answer</h3>
        <p className='flash-card-p'>{flashCard.answer}</p>
        <div className="difficulty-buttons">
          <button
            className='difficulty-button'
            onClick={() => handleDifficultyRating(2)}
          >
            Easy
          </button>
          <button
            className='difficulty-button'
            onClick={() => handleDifficultyRating(1)}
          >
            Medium
          </button>
          <button
            className='difficulty-button'
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