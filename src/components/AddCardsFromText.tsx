import Deck from "../classes/Deck"
import Card from "../classes/Card"
import { useState } from 'react'
import { useNavigate } from "react-router-dom"
import axios from "axios"

import SimpleDeckView from "./SimpleDeckView"
import SuccessAndFailPopUp from "./SuccessAndFailPopUp"
import LoadingCircle from "./LoadingCircle"
import Loading from "./Loading"
import ErrorPopup from "./ErrorPopup";

import arrGen from "../services/arrGen"

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
    const [isError, setIsError] = useState<boolean>(false)
    const [message, setMessage] = useState<string>('')
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [progress, setProgress] = useState(0)

    const baseURL = process.env.REACT_APP_URL
    const navigate = useNavigate()

    const handleInputValueChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        const getCost = (str: string):number => {
            return arrGen(str).length * 1000
        }
        setTokenCost(getCost(event.target.value))
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
            if (user.ai_tokens < tokenCost){
                setMessage(`This request will cost ${tokenCost} tokens. Please visit the shop to buy more`)
                setIsError(true)
                setIsLoading(false)
                return null
              }
            const _id = user._id
            const text = inputValue
            const cost = tokenCost
            const textArr = arrGen(text)
            let tempCards = []
            for (let i = 0; i < textArr.length; i++) {
                console.log(`sending request ${i+1} of ${textArr.length}`)
                const genCardsResponse = await axios.post(`${baseURL}api/cardsfromtextfunction`, {_id: _id, text: textArr[i], cost: 1000})
                const cardRes = genCardsResponse.data.cards
                setProgress((i+1) / textArr.length)
                for (let j = 0; j < cardRes.length; j++){
                    tempCards.push([cardRes[j].question, cardRes[j].answer])
                }
                if (i === textArr.length - 1) {
                    setUser(genCardsResponse.data.user)
                }
            }
            setCards([...cards].concat([...tempCards]))
            setIsLoading(false)
            setInputValue('')
            setTokenCost(0)
            setProgress(0)
        }
        const response = await genCardsFromText()
    }

    return (
        <div className="add-cards-from-text-main">
            {isLoading && (<Loading progress={progress}/>)}
            {isLoading && (<LoadingCircle />)}
            <SuccessAndFailPopUp success={success} setSuccess={setSuccess} fail={fail} setFail={setFail} name={deck.name} message={message} />
            <ErrorPopup error={isError} setError={setIsError} errorMessage={message} setErrorMessage={setMessage}/>
            <div className="add-cards-from-text-container">
                <h2 className="add-cards-from-text-h2">Generate Flash Cards from Text: {deck.name}</h2>
                <p className="add-cards-from-text-bottom-p">Paste your text below and click generate to make custom flashcards from the text</p>
                <textarea value={inputValue} onChange={handleInputValueChange} className="add-cards-from-text-textarea"></textarea>
                <div>
                    <p className="add-cards-from-text-bottom-p">This request will cost {tokenCost} tokens, you have {user.ai_tokens} tokens remaining. Buy more <a onClick={()=>navigate('/store')} className="store-link">here</a></p>
                </div>
                <div className="add-cards-from-text-button-container">
                    <button className="add-deck-button" onClick={handleGenerate}>{cards.length === 0 ? 'Generate' : 'Add more'}</button>
                    <button className="add-deck-button" onClick={()=>navigate('/dashboard')}>Back</button>
                </div>
                {cards.length > 0 && (<div className="add-cards-from-text-bottom-button-container">
                    <button className="add-deck-button wide-button" onClick={handleSave}>Save Deck</button>
                </div>)}
            </div>
            {cards.length > 0 && (<div className="add-cards-from-text-deck-view">
                <SimpleDeckView deck={cards} setDeck={setCards} />
            </div>)}
        </div>
    )
}

export default AddCardsFromText