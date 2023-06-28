import Deck from "../classes/Deck"
import Card from "../classes/Card"
import { useState, useEffect } from 'react'
import { useNavigate } from "react-router-dom"
import axios from "axios"

import SimpleDeckView from "./SimpleDeckView"
import SuccessAndFailPopUp from "./SuccessAndFailPopUp"
import LoadingCircle from "./LoadingCircle"

import '../styles/AddCardsFromText.css'

interface AddCardsFromTextProps {
    user: any
    setUser: React.Dispatch<React.SetStateAction<any>>
    deck: Deck
    isEdit?: boolean
}

const AddCardsFromText: React.FC<AddCardsFromTextProps> = ({user, setUser, deck, isEdit}) => {
    const [inputValue, setInputValue] = useState<string>('')
    const [tokenCost, setTokenCost] = useState<number>(0)
    const [cards, setCards] = useState<string[][]>([])

    const [success, setSuccess] = useState<boolean>(false)
    const [fail, setFail] = useState<boolean>(false)
    const [message, setMessage] = useState<string>('')
    const [isLoading, setIsLoading] = useState<boolean>(false)

    const baseURL = process.env.REACT_APP_URL
    const navigate = useNavigate()

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
        if (isEdit) {
            try {
                const response = await axios.put(`${process.env.REACT_APP_URL}api/addcards`, {"_id": _id, "name": name, "cards": saveCards})
                if (response.data.user){
                    setUser(response.data.user)
                    setMessage(`Added ${cards.length} cards to ${name}`)
                    setSuccess(true)
                } else {
                    setFail(true)
                    setMessage(`Unable to save ${deck.name} with updated cards`)
                }
              } catch (error) {
                  console.error(error)
                  setFail(true)
                  setMessage(`Unable to save ${deck.name} with updated cards`)
              }
        } else {
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
                <p className="add-cards-from-text-bottom-p">Paste your text below and click generate to make custom flashcards from the text</p>
                <textarea value={inputValue} onChange={handleInputValueChange} className="add-cards-from-text-textarea"></textarea>
                <div>
                    <p className="add-cards-from-text-bottom-p">This request will cost {tokenCost} tokens, you have {user.ai_tokens} tokens remaining. Buy more <a onClick={()=>navigate('/store')} className="store-link">here</a></p>
                </div>
                <div className="add-cards-from-text-button-container">
                    <button className="add-deck-button" onClick={handleGenerate}>{cards.length === 0 ? 'Generate' : 'Add more'}</button>
                    <button className="add-deck-button" onClick={()=>navigate('/add-deck')}>Back</button>
                </div>
                {cards.length > 0 && (<div className="add-cards-from-text-bottom-button-container">
                    <button className="add-deck-button add-cards-from-text-button" onClick={handleSave}>Save Deck</button>
                </div>)}
            </div>
            {cards.length > 0 && (<div className="add-cards-from-text-deck-view">
                <SimpleDeckView deck={cards} setDeck={setCards} />
            </div>)}
        </div>
    )
}

export default AddCardsFromText