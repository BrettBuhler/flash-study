import Card from '../classes/Card'
import Deck from '../classes/Deck'

interface FlashCard {
    question: string
    answer: string
}

const landingPageDeck: Card[] = []

const flashCards: FlashCard[] = [
    {
      question: "What is the capital of France?",
      answer: "Paris",
    },
    {
      question: "Who painted the Mona Lisa?",
      answer: "Leonardo da Vinci",
    },
    {
      question: "What is the largest planet in our solar system?",
      answer: "Jupiter",
    },
    {
      question: "What is the chemical symbol for gold?",
      answer: "Au",
    },
    {
      question: "What is the tallest mountain in the world?",
      answer: "Mount Everest",
    },
    {
      question: "Which country is known for the Great Barrier Reef?",
      answer: "Australia",
    },
    {
      question: "Who wrote the play Romeo and Juliet?",
      answer: "William Shakespeare",
    },
    {
      question: "What is the currency of Japan?",
      answer: "Japanese yen",
    },
    {
      question: "What is the largest ocean on Earth?",
      answer: "Pacific Ocean",
    },
    {
      question: "Who discovered gravity?",
      answer: "Isaac Newton",
    },
]

for (let i = 0; i < flashCards.length; i++){
    let newCard = new Card(flashCards[i].question, flashCards[i].answer)
    landingPageDeck.push(newCard)
}

const landingPageDeckObject = new Deck ('My Favorite Questions', landingPageDeck)

export default landingPageDeckObject