import Deck from "../classes/Deck"
import React, { useState, useEffect } from 'react'
import { useNavigate } from "react-router-dom"
import axios from 'axios'

import EditStatusPopup from "./EditStatusPopup"
import EditAddDeckManual from './EditAddDeckManual'
import EditSimpleDeckView from "./EditSimpleDeckView"

interface EditSelectedDeckProps {
    user: any
    setUser: React.Dispatch<React.SetStateAction<any>>
    deck: Deck
}

const EditSelectedDeck: React.FC<EditSelectedDeckProps> = ({user, setUser, deck}) => {
    const [route, setRoute] = useState(0)
    const [popup, setPopup] = useState(false)
    const [popupMessage, setPopupMessage] = useState('')
    const [success, setSuccess] = useState(true)
    const navigate = useNavigate()


    const handleClick = (n: number) => {
        setRoute(n)
    }

    const handleDelete = async ()  => {
        const _id = user._id
        const name = deck.name
        try {
            const response = await axios.delete('http://localhost:5000/api/deletedeck', {data: {_id, name}})
            if (response.data.user){
                setUser(response.data.user)
                setPopup(true)
                setPopupMessage(`${deck.name} deleted`)
                setSuccess(true)
            }
        } catch (error) {
            console.error(error)
        }
    }

    switch (route) {
        case 0:
            return (
                <div className="edit-selected-deck-0">
                    <h2 className="edit-selected-deck-h2">Edit: {deck.name}</h2>
                    <div className="edit-selected-deck-button-container">
                        <button className="edit-selected-deck-button" onClick={()=>handleClick(1)}>Add Cards Manually</button>
                        <button className="edit-selected-deck-button" onClick={()=>handleClick(2)}>Add Cards with AI</button>
                        <button className="edit-selected-deck-button" onClick={()=>handleClick(3)}>Add Cards from text</button>
                        <button className="edit-selected-deck-button" onClick={()=>handleClick(4)}>Merge Decks</button>
                        <button className="edit-selected-deck-button" onClick={()=>handleClick(5)}>Edit Cards</button>
                        <button className="edit-selected-deck-button" onClick={()=>handleClick(6)}>Delete Deck</button>
                        <button className="edit-selected-deck-button" onClick={()=>navigate('/dashboard')}>Dashboard</button>
                    </div>
                </div>
            )
        case 1:
            return (
                <div className="edit-selected-deck-1">
                    <EditAddDeckManual user={user} setUser={setUser} back={()=>handleClick(0)} deckName={deck.name}/>
                </div>
            )
        case 2:
            return (
                <div className="edit-selected-deck-2">
    
                </div>
            )
        case 3:
            return (
                <div className="edit-selected-deck-3">
    
                </div>
            )
        case 4:
            return (
                <div className="edit-selected-deck-4">
    
                </div>
            )
        case 5:

            const handleUpdateRequest = async () => {
              
            }

            return (
                <div className="edit-selected-deck-5">
                    <h2 className="edit-selected-deck-h2">Edit cards from {deck.name}</h2>
                    <EditSimpleDeckView user={user} setUser={setUser} deck={deck} setRoute={setRoute}/>
                </div>
            )
        case 6:
            return (
                <div className="edit-selected-deck-6">
                    <EditStatusPopup popup={popup} setPopup={setPopup} message={popupMessage} home={success}/>
                    <h2 className="edit-selected-deck-h2">Are you sure you want to Delete {deck.name}?</h2>
                    <button onClick={handleDelete}>Yes</button>
                    <button onClick={()=>handleClick(0)}>No</button>
                </div>
            )
        default:
            return (
                null
            )
    }
}

export default EditSelectedDeck