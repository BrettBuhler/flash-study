import React from 'react'
import { useNavigate } from 'react-router-dom'
import TopBar from './TopBar'


import '../styles/AddDeck.css'

interface AddDeckProps {
    setUser: React.Dispatch<React.SetStateAction<{}>>
    user: any
}


const AddDeck: React.FC<AddDeckProps> = ({ user, setUser }) => {
    const navigate = useNavigate()
    return (
        <div className='add-deck-main'>
            <TopBar user={user} setUser={setUser}/>
            <div className='add-deck-options'>
                <div className='add-deck-instructions'>Build a new Deck</div>
                <div className='add-deck-button-container'>
                    <button className='add-deck-button' onClick={()=>navigate('/add-deck/manual')}>Add Deck Manually</button>
                    <button className='add-deck-button' onClick={()=>navigate('/add-deck/text')}>Add Deck from Text</button>
                    <button className='add-deck-button' onClick={()=>navigate('/add-deck/ai')}>Add Deck from AI</button>
                </div>
                <div className='add-deck-button-container-dashboard'>
                    <button className='add-deck-button' onClick={()=>navigate('/dashboard')}>Return to Dashboard</button>
                </div>
            </div>
        </div>  
    )
}

export default AddDeck;