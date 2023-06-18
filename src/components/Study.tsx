import { useState, useEffect } from 'react'
import Deck from '../classes/Deck'
import Card from '../classes/Card'

import { useNavigate } from 'react-router-dom'

import ErrorPopup from './ErrorPopup'
import FlashCard from './FlashCard'


interface StudyProps {
    user: any
    setUser: React.Dispatch<React.SetStateAction<any>>
}

const Study: React.FC<StudyProps> = ({user, setUser}) => {

    const [deck, setDeck] = useState<Deck | undefined>(undefined)
    const [selectOption, setSelectOption] = useState<string>('')
    const [deckArr, setDeckArr] = useState(user.decks)
    const [isError, setIsError] = useState<boolean>(false)
    const [errorMessage, setErrorMessage] = useState<string>('')
    const [cards, setCards] = useState<Card[]>([])
    const [index, setIndex] = useState(0)

    const navigate = useNavigate()

    useEffect(()=> {
        if (deck !== undefined){
            let tempCards:Card[] = []
            for (let i = 0; i < deck.deck.length; i++){
                let newCard = new Card(deck.deck[i].question, deck.deck[i].answer, deck.deck[i].tries, deck.deck[i].lastTry)
                tempCards.push(newCard)
            }
            setCards(tempCards)
        }
    },[deck])

    const nextCard = () => {
        if (index >= cards.length - 1){
            //FINISHED DECK
            setIndex(0)
        } else {
            setIndex(index + 1)
        }
    }

    const handleStudy = () => {
        if (selectOption !== ''){
            let tempDeck: boolean | Deck = false
            for (let i = 0; i < deckArr.length; i++){
                if (deckArr[i].name == selectOption){
                    tempDeck = new Deck(deckArr[i].name, deckArr[i].cards)
                    break
                }
            }
            if (tempDeck !== false) {
                console.log('tdeck',tempDeck)
                setDeck(tempDeck)
            }
        } else {
            setErrorMessage(`Please select a deck to study`)
            setIsError(true)
        }
    }

    const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectOption(event.target.value)
    }

    return (
        <section id="study" className="study-main">
            {deck === undefined && (
                <div>
                    <ErrorPopup error={isError} setError={setIsError} errorMessage={errorMessage} setErrorMessage={setErrorMessage}/>
                    <h2>Select a Deck</h2>
                    <select value={selectOption} onChange={handleSelectChange}>
                        <option value={''}>Select a Deck</option>
                        {deckArr.map((item: Deck) => <option value={item.name} key={item.name + '-option'}>{item.name}</option>)}
                    </select>
                    <button onClick={handleStudy}>Study</button>
                    <button onClick={()=>navigate('/dashboard')}>Back</button>
                </div>
            )}
            {deck !== undefined && cards.length > 0 && (
                <div>
                    <h2>WE MADE IT: {deck.name}</h2>
                    <button onClick={()=>console.log(cards)}>Cards</button>
                    <FlashCard flashCard={cards[index]} nextCard={()=>nextCard()}/>
                </div>
            )}
        </section>
    )
}

export default Study