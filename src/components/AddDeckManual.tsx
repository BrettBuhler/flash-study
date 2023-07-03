import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import TopBar from './TopBar'
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
}

const AddDeckManual: React.FC<AddDeckManualProps> = ({ user, setUser }) => {
    const [deckName, setDeckName] = useState('')
    const [inputValue, setInputValue] = useState('')
    const [frontValue, setFrontValue] = useState('')
    const [backValue, setBackValue] = useState('')
    const [tempDeck, setTempDeck] = useState<string[][]>([])
    const [nameError, setNameError] = useState(false)
    const [nameMessage, setNameMessage] = useState('')
    const [success, setSuccess] = useState(false)
    const [fail, setFail] = useState(false)
    const navigate = useNavigate()


    useEffect(()=> {
        if (Object.keys(user).length === 0){
            navigate('/dashboard')
        }
    },[])

    const handleCreateDeck = () => {
        let names = user.decks
        let triger = false
        names.map((x: Deck) => {
            if (x.name === inputValue){
                setNameError(true)
                setNameMessage(`A deck named ${inputValue} already exists, pick a different name.`)
                setInputValue('')
                triger = true
            }
        })
        if (!triger){
            setDeckName(inputValue)
            setInputValue('')
        }
    }

    const handleFrontChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setFrontValue(event.target.value)
    }

    const handleBackChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setBackValue(event.target.value)
    }

    const handleInputValueChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.target.value)
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
        try {
            const response = await axios.post(`${process.env.REACT_APP_URL}api/add`, {_id, name, cards})
            if (response.data.user){
                setUser(response.data.user)
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
            <TopBar user={user} setUser={setUser} />
            <SuccessAndFailPopUp setSuccess={setSuccess} success={success} fail={fail} setFail={setFail} name={deckName}/>
            <ErrorPopup setError={setNameError} error={nameError} errorMessage={nameMessage} setErrorMessage={setNameMessage}/>
            {deckName === '' && (
                <div className = 'deck-name-popup-background'>
                    <div className='deck-name-popup'>
                        <h3 className='deck-name-h3'>Please give the deck a name:</h3>
                        <div className='deck-name-popup-form'>
                            <input type='text' onChange={handleInputValueChange} value={inputValue}></input>
                            <div className='deck-name-popup-buttons'>
                                <button onClick={handleCreateDeck} className='add-deck-button'>Create Deck</button>
                                <button type='button' onClick={() => navigate('/dashboard')} className='add-deck-button'>Back</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            <div className='add-deck-manual-top'>
                <h2 className='add-deck-manual-h2'>Add cards to {`${deckName}`}</h2>
                <div className='add-deck-input-container'>
                    <div className='add-deck-input'>
                        <h3 className='add-deck-h3'>Front:</h3>
                        <textarea id='front-textarea' value={frontValue} onChange={handleFrontChange}></textarea>
                    </div>
                    <div className='add-deck-input'>
                        <h3 className='add-deck-h3'>Back:</h3>
                        <textarea id='back-textarea' value={backValue} onChange={handleBackChange}></textarea>
                    </div>
                    <div className='add-deck-input-buttons'>
                        <button className='add-deck-button' onClick={handleAdd}>Add</button>
                        <button className='add-deck-button' onClick={()=>navigate('/dashboard')}>Back</button>
                    </div>
                    {tempDeck.length > 0 && (<div className='add-deck-input-buttons'>
                        <button className='add-deck-button wide-button' onClick={handleCreateRequest}>Create Deck</button>
                    </div>)}
            </div>
            </div>
            <SimpleDeckView deck={tempDeck} setDeck={setTempDeck}/>
        </div>
    )
}

export default AddDeckManual