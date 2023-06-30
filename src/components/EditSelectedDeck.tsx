import Deck from "../classes/Deck"
import React, { useState } from 'react'
import { useNavigate } from "react-router-dom"
import axios from 'axios'

import EditStatusPopup from "./EditStatusPopup"
import EditAddDeckManual from './EditAddDeckManual'
import EditSimpleDeckView from "./EditSimpleDeckView"
import MergeDeck from "./MergeDecks"
import AddCardsFromAI from "./AddCardsFromAI"
import AddCardsFromText from "./AddCardsFromText"

import '../styles/EditSelectedDeck.css'

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
            const response = await axios.delete(`${process.env.REACT_APP_URL}api/deletedeck`, {data: {_id, name}})
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
                <div className="edit-selected-deck-option edit-selected-deck-0">
                    <div className="edit-selected-deck-container">
                        <h2 className="edit-selected-deck-h2">Edit: {deck.name}</h2>
                        <div className="edit-selected-deck-button-container">
                            <div className="edit-selected-deck-button-2nd-container">
                                <button className="add-deck-button" onClick={()=>handleClick(1)}>Add Cards Manually</button>
                                <button className="add-deck-button" onClick={()=>handleClick(2)}>Add Cards with AI</button>
                            </div>
                            <div className="edit-selected-deck-button-2nd-container">
                                <button className="add-deck-button" onClick={()=>handleClick(3)}>Add Cards from text</button>
                                <button className="add-deck-button" onClick={()=>handleClick(4)}>Merge Decks</button>
                            </div>
                            <div className="edit-selected-deck-button-2nd-container last-2nd">
                                <button className="add-deck-button" onClick={()=>handleClick(5)}>Edit Cards</button>
                                <button className="add-deck-button" onClick={()=>handleClick(6)}>Delete Deck</button>
                            </div>
                            <button className="edit-selected-deck-dashboard-button add-deck-button" onClick={()=>navigate('/dashboard')}>Dashboard</button>
                        </div>
                    </div>
                </div>
            )
        case 1:
            return (
                <div className="edit-selected-deck-option edit-selected-deck-1">
                    <EditAddDeckManual user={user} setUser={setUser} back={()=>handleClick(0)} deckName={deck.name}/>
                </div>
            )
        case 2:
            return (
                <div className="edit-selected-deck-option edit-selected-deck-2">
                    <AddCardsFromAI user={user} setUser={setUser} deck={deck} isEdit={true}/>
                </div>
            )
        case 3:
            return (
                <div className="edit-selected-deck-option edit-selected-deck-3">
                    <AddCardsFromText user={user} setUser={setUser} deck={deck} isEdit={true}/>
                </div>
            )
        case 4:
            return (
                <div className="edit-selected-deck-option edit-selected-deck-4">
                    <MergeDeck user={user} setUser={setUser} deck={deck} setRoute={setRoute}/>
                </div>
            )
        case 5:
            return (
                <div className="edit-selected-deck-option edit-selected-deck-5">
                    <h2 className="edit-selected-deck-h2">Edit cards from {deck.name}</h2>
                    <EditSimpleDeckView user={user} setUser={setUser} deck={deck} setRoute={setRoute}/>
                </div>
            )
        case 6:
            return (
                <div className="edit-selected-deck-option edit-selected-deck-6">
                    <div className="edit-selected-deck-item">
                        <EditStatusPopup popup={popup} setPopup={setPopup} message={popupMessage} home={success}/>
                        <h2 className="edit-selected-deck-h2">Are you sure you want to Delete {deck.name}?</h2>
                        <div className="edit-selected-deck-item-button-container">
                            <button onClick={handleDelete} className="add-deck-button">Yes</button>
                            <button onClick={()=>handleClick(0)} className="add-deck-button">No</button>
                        </div>
                    </div>
                </div>
            )
        default:
            return (
                null
            )
    }
}

export default EditSelectedDeck