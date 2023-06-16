import Deck from "../classes/Deck"
import Card from "../classes/Card"
import { useState, useEffect } from 'react'
import axios from "axios"

import SimpleDeckView from "./SimpleDeckView"
import SuccessAndFailPopUp from "./SuccessAndFailPopUp"
import LoadingCircle from "./LoadingCircle"

interface AddCardsFromTextProps {
    user: any
    setUser: React.Dispatch<React.SetStateAction<any>>
    deck: Deck
}

const AddCardsFromText: React.FC<AddCardsFromTextProps> = ({user, setUser, deck}) => {
    const [inputValue, setInputValue] = useState<string>('')
    const [tokenCost, setTokenCost] = useState<number>(0)
    const [cards, setCards] = useState<string[][]>([])

    const [success, setSuccess] = useState<boolean>(false)
    const [fail, setFail] = useState<boolean>(false)
    const [message, setMessage] = useState<string>('')
    const [isLoading, setIsLoading] = useState<boolean>(false)

    const baseURL = process.env.REACT_APP_URL

    useEffect(()=>{

    }, [cards])
    const handleInputValueChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setTokenCost(Math.ceil(event.target.value.length / 30))
        setInputValue(event.target.value)
    }

    const handleSave = async () => {
        const cardArr = []
        for (let i = 0; i < cards.length ; i++){
            cardArr.push(new Card(cards[i][0], cards[i][1]))
        }
        const saveCards = cardArr.map(item=>{
            return {question: item.question, answer: item.answer, tries: item.tries, lastTry: item.lastTry}
        })
        const _id = user._id
        const name = deck.name
        try {
            const response = await axios.post(`${baseURL}api/add`, {"_id": _id, "name": name, "cards": saveCards})
            if (response.data.user){
                setUser(response.data.user)
                setSuccess(true)
                setMessage(`Saved ${deck.name} with ${saveCards.length} cards`)
            } else {
                setFail(true)
                setMessage(`Unable to save ${deck.name} to database, try again later`)
            }
        } catch (error){
            setFail(true)
            setMessage(`Unable to save ${deck.name} to database, try again later`)
            console.error(error)
        }
    }

    const handleGenerate = async () => {
        console.log('sending request')
        setIsLoading(true)
        const genCardsFromText = async () => {
            const _id = user._id
            const text = inputValue
            const cost = tokenCost
            const genCardsResponse = await axios.post(`${baseURL}api/cardsfromtextfunction`, {_id, text, cost})
            if (genCardsResponse.data.user){
                console.log(genCardsResponse.data.data)
                const cardRes = genCardsResponse.data.cards
                const tempCards = []

                for (let i = 0; i < cardRes.length; i++){
                    console.log(`Front: ${cardRes[i].question}, Back: ${cardRes[i].answer}`)
                    tempCards.push([cardRes[i].question, cardRes[i].answer])
                }
                setUser(genCardsResponse.data.user)
                setCards([...cards].concat([...tempCards]))
                setIsLoading(false)
                setInputValue('')
                setTokenCost(0)
            }
        }
        const response = await genCardsFromText()
        console.log('here is the res:')
        console.log(response)
    }

    return (
        <div className="add-cards-from-text-main">
            <SuccessAndFailPopUp success={success} setSuccess={setSuccess} fail={fail} setFail={setFail} name={deck.name} message={message} />
            {isLoading && (<LoadingCircle />)}
            <div className="add-cards-from-text-container">
                <h2 className="add-cards-from-text-h2">Generate Flash Cards from Text: {deck.name}</h2>
                <p>Paste your text below and click generate to make custom flashcards from the text</p>
                <textarea value={inputValue} onChange={handleInputValueChange}></textarea>
                <div>
                    <p>This request will cost {tokenCost} tokens, you have {user.ai_tokens} tokens remaining. Buy more <a>here</a></p>
                </div>
                <div className="add-cards-from-text-button-container">
                    <button className="add-cards-from-text-button" onClick={handleGenerate}>{cards.length === 0 ? 'Generate' : 'Add more'}</button>
                    <button className="add-cards-from-text-button">Back</button>
                    <button className="add-cards-from-text-button" onClick={()=>console.log(cards)}>See cards</button>
                </div>
            </div>
            {cards.length > 0 && (<div className="add-cards-from-text-deck-view">
                <h3>Cards in {deck.name}:</h3>
                <p>Add more cards above or save the deck below</p>
                <SimpleDeckView deck={cards} setDeck={setCards} />
                <button onClick={handleSave}>Save Deck</button>
            </div>)}
        </div>
    )
}

export default AddCardsFromText