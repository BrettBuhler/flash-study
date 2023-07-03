import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Deck from '../classes/Deck'
import Card from '../classes/Card'
import axios from 'axios'

import ErrorPopup from './ErrorPopup'
import FlashCard from './FlashCard'
import TopBar from './TopBar'
import '../styles/Study.css'




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
    const [finished, setFinished] = useState(false)

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

    const shuffle = (cardArr: Card[]) => {
        return cardArr.sort((a, b) => {
            const aTriesSum = a.tries.reduce((sum, tries) => sum + tries, 0)
            const bTriesSum = b.tries.reduce((sum, tries) => sum + tries, 0)

            return bTriesSum - aTriesSum
        })
    }
    
    const nextCard = () => {
        if (index >= cards.length - 1){
            let shuffledCards = shuffle(cards)
            setIndex(0)
            setCards(shuffledCards)
            setFinished(true)
        } else {
            setIndex(index + 1)
        }
    }

    const handleStudy = () => {
        if (selectOption !== ''){
            let tempDeck: boolean | Deck = false
            for (let i = 0; i < deckArr.length; i++){
                if (deckArr[i].name === selectOption){
                    tempDeck = new Deck(deckArr[i].name, deckArr[i].cards)
                    break
                }
            }
            if (tempDeck !== false) {
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

    const handleFinished = async () => {
        try {
            const _id = user._id
            const name = deck !== undefined ? deck.name : ''
            const cardsToSend = cards.map(item => {
                return {question: item.question, answer: item.answer, tries: item.tries, lastTry: item.lastTry}
            })
            const response = await axios.put(`${process.env.REACT_APP_URL}api/updatedeck`, {_id: _id, name: name, cards: cardsToSend})

            if (response.data.user){
                setUser(response.data.user)
                navigate('/dashboard')
            } else {
                throw new Error('Unable to save session')
            }

        } catch (error) {
            let tempName: string = ''
            if (deck !== undefined){
                tempName = deck.name
            } else {
                tempName = 'deck'
            }
            console.error(error)
            setIsError(true)
            setErrorMessage(`Unable to update ${tempName} with study session`)
        }
    }

    return (
        <section id="study" className="study-main">
            <TopBar user={user} setUser={setUser}/>
            {deck === undefined && (
                <div className='study-select-main'>
                    <div className='study-select-title'>
                        Study
                    </div>
                    <div className='study-select-instructions'> 
                        Choose a deck to study. Flip the cards to reveal answers and rate them as easy, medium, or hard. Track your deck's mastery and improve your learning.
                    </div>
                    <div className='study-select-container'>
                        <ErrorPopup error={isError} setError={setIsError} errorMessage={errorMessage} setErrorMessage={setErrorMessage}/>
                        <h2 className='study-h2'>Select a Deck</h2>
                        <select value={selectOption} onChange={handleSelectChange} className='study-select'>
                            <option value={''} className='study-option'>Select a Deck</option>
                            {deckArr.map((item: Deck) => <option value={item.name} key={item.name + '-option'} className='study-option'>{item.name}</option>)}
                        </select>
                        <div className='study-button-container'>
                            <button onClick={handleStudy} className='study-button'>Study</button>
                            <button onClick={()=>navigate('/dashboard')} className='study-button'>Back</button>
                        </div>
                    </div>
                </div>
            )}
            {deck !== undefined && cards.length > 0 && (
                <div>
                    {finished && (<div className='finished-popup-background'>
                        <div className='finished-popup-main'>
                            <p className='finished-popup-p'>Congratulations, you finished studying {deck.name}! Study again or return to the dashboard. Remeber that the key to success is spaced repitition.</p>
                            <div className='finished-popup-button-container'>
                                <button className='add-deck-button wide-button finished-button' onClick={()=>setFinished(false)}>Study Again</button>
                                <button className='add-deck-button wide-button finished-button' onClick={handleFinished}>Dashboard</button>
                            </div>
                        </div>
                    </div>)}
                    <div className='flash-card-holder'>
                        <FlashCard flashCard={cards[index]} nextCard={()=>nextCard()}/>
                        <div className='finish-button-container'>
                            <button className='add-deck-button finish-button' onClick={handleFinished}>Finish</button>
                        </div>
                    </div>
                </div>
            )}
        </section>
    )
}

export default Study