import React from 'react'
import {useState} from 'react'
import '../styles/FlashCard.css'

interface FlashCardProps {
  flashCard: {
    question: string;
    answer: string;
    tries: number[];
    easy: () => void;
    medium: () => void;
    hard: () => void;
  }
  nextCard: () => void
}

const FlashCard: React.FC<FlashCardProps> = ({ flashCard, nextCard }) => {
  const { question, answer, tries, easy, medium, hard } = flashCard;
  const [flipped, setFlipped] = useState(false);

  const flipCard = () => {
    setFlipped(true)
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
            console.error('handleDifficultyRatingError')
            break
    }
    nextCard()
    setFlipped(false)
  }

  return (
    <div className={`flash-card ${flipped ? 'flipped' : ''}`}>
      <div className="front">
        <h3>Question</h3>
        <p>{question}</p>
        <button className="flip-button" onClick={flipCard}>
          Flip
        </button>
      </div>
      <div className="back">
        <h3>Answer</h3>
        <p>{answer}</p>
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