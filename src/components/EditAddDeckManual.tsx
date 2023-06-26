import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Deck from '../classes/Deck'
import ErrorPopup from './ErrorPopup'
import SimpleDeckView from './SimpleDeckView'
import SuccessAndFailPopUp from './SuccessAndFailPopUp'
import '../styles/AddDeckManual.css'
import axios from 'axios'
import cardGen from '../services/cardGen'
import deckGen from '../services/deckGen'

interface AddDeckManualProps {
    user: any
    setUser: React.Dispatch<React.SetStateAction<{}>>
    back: (n: number) => void
    deckName: string
}

const AddDeckManual: React.FC<AddDeckManualProps> = ({ user, setUser, back, deckName}) => {
    const [frontValue, setFrontValue] = useState('')
    const [backValue, setBackValue] = useState('')
    const [tempDeck, setTempDeck] = useState<string[][]>([])
    const [nameError, setNameError] = useState(false)
    const [nameMessage, setNameMessage] = useState('')
    const [success, setSuccess] = useState(false)
    const [fail, setFail] = useState(false)
    const [successMessage, setSuccessMessage] = useState('')
    const navigate = useNavigate()


    useEffect(()=> {
        if (Object.keys(user).length === 0){
            navigate('/dashboard')
        }
    },[])

    const handleFrontChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setFrontValue(event.target.value)
    }

    const handleBackChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setBackValue(event.target.value)
    }


    const handleAdd = () => {
        if (frontValue === '' || backValue === ''){
            setNameMessage('Flash Cards cannot be empty')
            setNameError(true)
            return
        } else {
            const newCard = [frontValue, backValue]
            setTempDeck((prevDeck) => [...prevDeck, newCard])
            setFrontValue('')
            setBackValue('')
        }
    }

    const handleCreateRequest = async () => {
        let deckArray = []
        for (let i = 0; i < tempDeck.length; i++){
            deckArray.push(cardGen(tempDeck[i][0], tempDeck[i][1]))
        }
        let newDeck = deckGen(deckName, deckArray)
        const _id = user._id
        const name = newDeck.name
        const cards = newDeck.deck.map(item=>{
            return {
                question: item.question,
                answer: item.answer,
                tries: item.tries,
                lastTry: item.lastTry
            }
        })
        //Change to /api/addcards before production build: http://localhost:5000/api/addcards
        try {
            const response = await axios.put(`${process.env.REACT_APP_URL}api/addcards`, {_id, name, cards})
            if (response.data.user){
                setUser(response.data.user)
                setSuccessMessage(`Added ${cards.length} cards to ${name}`)
                setSuccess(true)
            } else {
                setFail(true)
            }
        } catch (error) {
            console.error(error)
            setFail(true)
        }
    }

    return (
        <div className='add-deck-manual-main'>
            <SuccessAndFailPopUp setSuccess={setSuccess} success={success} fail={fail} setFail={setFail} name={deckName} message={successMessage}/>
            <ErrorPopup setError={setNameError} error={nameError} errorMessage={nameMessage} setErrorMessage={setNameMessage}/>
            <div className='add-deck-manual-top'>
                <h2 className='add-deck-manual-h2'>Add cards to {`${deckName}`}</h2>
                <div className='add-deck-input-container'>
                    <div className='add-deck-input'>
                        <h3>Front</h3>
                        <textarea id='front-textarea' value={frontValue} onChange={handleFrontChange}></textarea>
                    </div>
                    <div className='add-deck-input'>
                        <h3>Back</h3>
                        <textarea id='back-textarea' value={backValue} onChange={handleBackChange}></textarea>
                    </div>
                    <div className='add-deck-input-buttons'>
                        <button className='add-deck-input-button' onClick={handleAdd}>Add</button>
                        <button className='add-deck-input-button' onClick={handleCreateRequest}>Update Deck</button>
                        <button className='add-deck-input-button' onClick={()=>back(0)}>Back</button>
                    </div>
                </div>
            </div>
            <SimpleDeckView deck={tempDeck} setDeck={setTempDeck}/>
        </div>
    )
}

export default AddDeckManual