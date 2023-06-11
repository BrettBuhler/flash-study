import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import TopBar from './TopBar'
import Deck from '../classes/Deck'
import ErrorPopup from './ErrorPopup'
import SimpleDeckView from './SimpleDeckView'
import '../styles/AddDeckManual.css'
import axios from 'axios'

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
    const navigate = useNavigate()


    useEffect(()=> {
        if (Object.keys(user).length === 0){
            navigate('/dashboard')
        }
    },[])

    const handleCreateDeck = () => {
        let names = user.decks
        names.map((x: Deck) => {
            if (x.name === inputValue){
                setNameError(true)
                setNameMessage(`A deck named ${deckName} already exists, pick a different name.`)
                setInputValue('')
                return
            }
        })
        setDeckName(inputValue)
        setInputValue('')
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

    return (
        <div className='add-deck-manual-main'>
            <TopBar user={user} setUser={setUser} />
            <ErrorPopup setError={setNameError} error={nameError} errorMessage={nameMessage} setErrorMessage={setNameMessage}/>
            {deckName === '' && (
                <div className = 'deck-name-popup-background'>
                    <div className='deck-name-popup'>
                        <h3 className='deck-name-h3'>Please give the deck a name:</h3>
                        <div className='deck-name-popup-form'>
                            <input type='text' onChange={handleInputValueChange} value={inputValue}></input>
                            <div className='deck-name-popup-buttons'>
                                <button onClick={handleCreateDeck} className='deck-name-popup-button'>Create Deck</button>
                                <button type='button' onClick={() => navigate('/dashboard')} className='deck-name-popup-button'>Back</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            <h2 className='add-deck-manual-h2'>Add cards to {`${deckName}`}</h2>
            <SimpleDeckView deck={tempDeck} setDeck={setTempDeck}/>
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
                    <button className='add-deck-input-button' onClick={()=>console.log(user.decks.length === 0)}>Create Deck</button>
                    <button className='add-deck-input-button' onClick={()=>navigate('/dashboard')}>Back</button>
                </div>
            </div>
        </div>
    )
}

export default AddDeckManual