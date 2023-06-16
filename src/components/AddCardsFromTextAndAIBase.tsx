import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import ErrorPopup from './ErrorPopup'
import Deck from '../classes/Deck'
import AddCardsFromText from './AddCardsFromText'
import AddCardsFromAI from './AddCardsFromAI'

interface AddCardsFromTextAndAIBaseProps {
    user: any
    setUser: React.Dispatch<React.SetStateAction<any>>
    route: string
}

const AddCardsFromTextAndAIBase: React.FC<AddCardsFromTextAndAIBaseProps> = ({user, setUser, route}) => {
    const [deck, setDeck] = useState<Deck | undefined>(undefined)
    const [inputValue, setInputValue] = useState<string>('')
    const [nameError, setNameError] = useState<boolean>(false)
    const [nameMessage, setNameMessage] = useState<string>('')
    const navigate = useNavigate()

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
            const newDeck = new Deck(inputValue, [])
            setDeck(newDeck)
        }
    }

    const handleInputValueChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.target.value)
    }

    if (deck === undefined){
        return (<div>
            <ErrorPopup setError={setNameError} error={nameError} errorMessage={nameMessage} setErrorMessage={setNameMessage}/>
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
        </div>)
    }

    if (route === 'text'){
        return (
            <div>
                <AddCardsFromText user={user} setUser={setUser} deck={deck} />
            </div>
        )
    } else if (route ==='ai') {
        return (
            <div>
                <AddCardsFromAI user={user} setUser={setUser} deck={deck} />
            </div>
        )
    } else {
        return (
            <div>
                <p>default error</p>
            </div>
        )
    }
}

export default AddCardsFromTextAndAIBase