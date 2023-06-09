import Card from '../classes/Card'
import Deck from '../classes/Deck'

interface FlashCard {
    question: string
    answer: string
    tries: number[]
    lastTry: Date
}

const landingPageDeck: Card[] = []

const flashCards: FlashCard[] = [
    {
      question: "What is the capital of France?",
      answer: "Paris",
      tries: [0,0,0],
      lastTry: new Date()
    },
    {
      question: "Who painted the Mona Lisa?",
      answer: "Leonardo da Vinci",
      tries: [0,0,0],
      lastTry: new Date()
    },
    {
      question: "What is the largest planet in our solar system?",
      answer: "Jupiter",
      tries: [0,0,0],
      lastTry: new Date()
    },
    {
      question: "What is the chemical symbol for gold?",
      answer: "Au",
      tries: [0,0,0],
      lastTry: new Date()
    },
    {
      question: "What is the tallest mountain in the world?",
      answer: "Mount Everest",
      tries: [0,0,0],
      lastTry: new Date()
    },
    {
      question: "Which country is known for the Great Barrier Reef?",
      answer: "Australia",
      tries: [0,0,0],
      lastTry: new Date()
    },
    {
      question: "Who wrote the play Romeo and Juliet?",
      answer: "William Shakespeare",
      tries: [0,0,0],
      lastTry: new Date()
    },
    {
      question: "What is the currency of Japan?",
      answer: "Japanese yen",
      tries: [0,0,0],
      lastTry: new Date()
    },
    {
      question: "What is the largest ocean on Earth?",
      answer: "Pacific Ocean",
      tries: [0,0,0],
      lastTry: new Date()
    },
    {
      question: "Who discovered gravity?",
      answer: "Isaac Newton",
      tries: [0,0,0],
      lastTry: new Date()
    },
]

for (let i = 0; i < flashCards.length; i++){
    let newCard = new Card(flashCards[i].question, flashCards[i].answer, flashCards[i].tries, flashCards[i].lastTry)
    landingPageDeck.push(newCard)
}

const landingPageDeckObject = new Deck ('My Favorite Questions', landingPageDeck)

export default landingPageDeckObject